var express = require('express');
var app = express();

var port = 3000;

var Canvas = require('canvas');
var Image = Canvas.Image;
var canvas = new Canvas(200, 200);
var ctx = canvas.getContext('2d');

ctx.font = '30px Impact';
ctx.rotate(.1);
ctx.fillText("Awesome!", 50, 100);

var te = ctx.measureText('Awesome!');
ctx.strokeStyle = 'rgba(0,0,0,0.5)';
ctx.beginPath();
ctx.lineTo(50, 102);
ctx.lineTo(50 + te.width, 102);
ctx.stroke();

app.get('/' ,function(req, res) {
    res.send('<img src="' + canvas.toDataURL() + '" />')
});

app.listen(port, function() {
    console.log('server is listening at port: ' + port);
});
