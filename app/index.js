var fs = require("fs"),
  async = require("async"),
  request = require("request"),
  path = require("path");

var config = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../config.json"))
); //fetching config.
var functionArray = [];
config.conn.forEach(function (element) {
  function namedFunction(arg, callback) {
    var options = {
      url: element.url,
      method: "GET",
    };
    if (typeof arg === "function") {
      // for first function in waterfall first argument will be callback function.
      callback = arg;
      arg = {};
    }
    request(options, function (err, response, body) {
      // fetching response from backend
      if (err) {
        return callback(err);
      }
      if (response.statusCode !== 200) {
        return callback(response.statusMessage);
      }
      arg[element.url.toString()] = body;

      return callback(null, arg);
    });
  }

  functionArray.push(namedFunction);
});

async.waterfall(functionArray, function (err, result) {
  // Executing each API cal in waterfall model.
  if (err) {
    console.log(err);
  } else {
    Object.keys(result).forEach(function (key) {
      console.log(result[key]);
    });
  }
});
