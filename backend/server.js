var express = require("express"),
  app = express(),
  route = require("./route"),
  port = 4000;

app.use(route);

app.listen(port, function () {
  console.log("Server is up and running on port: " + port);
});
