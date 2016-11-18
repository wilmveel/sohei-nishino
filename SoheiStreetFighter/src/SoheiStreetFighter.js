var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var gm = require('gm');

var data = [
        {lat:0, lng:0, x:0,  y:0,   img:'images/image46.414382-10.013988.jpg'},
        {lat:1, lng:1, x:50, y:0,   img:'images/image52.108416-5.0890658.jpg'},
        {lat:2, lng:2, x:0,  y:100, img:'images/image52.109543-5.088110.jpg'},
        {lat:3, lng:3, x:50, y:100, img:'images/image46.414382-10.013988.jpg'}
    ];

app.use(bodyParser.json());

//http://stackoverflow.com/questions/17369842/tile-four-images-together-using-node-js-and-graphicsmagick
app.get('/city', function (req, res) {
    var x = gm();
    for(var i = 0; i < data.length; i++){
        x.in('-page', '+'+data[i].x+'+'+data[i].y)
        .in(data[i].img);
    }
    x.mosaic()  // Merges the images as a matrix
        .stream('jpg', function streamOut (err, stdout, stderr) {
                if (err) {return next(err)};
                res.set('Content-Type', 'image/jpeg');
                stdout.pipe(res); //pipe to response
        });
});

module.exports = app;