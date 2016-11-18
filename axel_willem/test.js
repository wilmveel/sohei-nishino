var Canvas = require('canvas')
    , Image = Canvas.Image
    , canvas = new Canvas(200, 200)
    , ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.lineTo(50, 102);
ctx.lineTo(50, 200);
ctx.stroke();

ctx.beginPath();
ctx.lineTo(60, 102);
ctx.lineTo(60, 200);
ctx.stroke();

var fs = require('fs')
    , out = fs.createWriteStream(__dirname + '/text.png')
    , stream = canvas.pngStream();

stream.on('data', function(chunk){
    out.write(chunk);
});

stream.on('end', function(){
    console.log('saved png');
});