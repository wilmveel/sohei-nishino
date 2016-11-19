var Transform = require('stream').Transform;
var inherits = require('util').inherits;
var https = require('https');
var fs = require('fs');
var Canvas = require('canvas');

function encoder(options) {
    if ( ! (this instanceof encoder))
        return new encoder(options);

    if (! options) options = {};
    options.objectMode = true;
    Transform.call(this, options);
}

inherits(encoder, Transform);

encoder.prototype._transform = function _transform(obj, encoding, callback) {

    try {
        var file = 'data:image/png;base64,' + obj.img;

        console.log(file);
        // var Image = Canvas.Image;
        // var canvas = new Canvas(2000, 2000);
        // var ctx = canvas.getContext('2d');

        // var img = new Image;
        // img.src = file;

        // ctx.font = '30px Impact';
        // ctx.rotate(.1);
        // ctx.fillText("Awesome!", 50, 100);
        //
        // var te = ctx.measureText('Awesome!');
        // ctx.strokeStyle = 'rgba(0,0,0,0.5)';
        // ctx.beginPath();
        // ctx.lineTo(50, 102);
        // ctx.lineTo(50 + te.width, 102);
        // ctx.stroke();

        // ctx.drawImage(img, 100, 100, img.width / 4, img.height / 4);

        callback();

    } catch(err) {
        return callback(err);
    }

};

module.exports = encoder;
