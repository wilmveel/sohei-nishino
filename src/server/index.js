var express = require('express');
var app = express();

var fs = require('fs');

var port = 3000;

var file = fs.readFileSync('./images/sanfrancisco_-s-.jpg');

var Canvas = require('canvas');
var Image = Canvas.Image;
var canvas = new Canvas(2000, 2000);
var ctx = canvas.getContext('2d');

var img = new Image;
img.src = file;

ctx.font = '30px Impact';
ctx.rotate(.1);
ctx.fillText("Awesome!", 50, 100);

var te = ctx.measureText('Awesome!');
ctx.strokeStyle = 'rgba(0,0,0,0.5)';
ctx.beginPath();
ctx.lineTo(50, 102);
ctx.lineTo(50 + te.width, 102);
ctx.stroke();

ctx.drawImage(img, 100, 100, img.width / 4, img.height / 4);


app.get('/' ,function(req, res) {
    res.send('<img src="' + canvas.toDataURL() + '" />');
    // res.send('Hello World!');
    // res.send(file);
});

app.listen(port, function() {
    console.log('server is listening at port: ' + port);
});
