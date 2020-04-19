var express = require('express'),
router = express.Router(),
fs = require('fs'),
urlParse = require('url-parse'),
path = require('path');

var config = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../config.json')));

config.conn.forEach(function (element){
    var url = urlParse(element.url);
    router.get(url.pathname,function (req,res){
        res.status(200).json( { response: element.timeout});
    });
    
});

module.exports = router;
