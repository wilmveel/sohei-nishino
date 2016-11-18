var express = require('express');
var app = express();

var bodyParser = require('body-parser');
//var gm = require('gm');

var data = {
    locations: [
        {lat:0, lng:0, heading:0, pitch:0},
        {lat:1, lng:1, heading:0, pitch:0},
        {lat:2, lng:2, heading:0, pitch:0},
        {lat:3, lng:3, heading:0, pitch:0},
    ]
}

app.use(bodyParser.json());

app.get('/city', function (req, res) {
//do stuff
    res.send('Hello World');
});

module.exports = app;