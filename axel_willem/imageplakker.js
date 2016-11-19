var Transform = require('stream').Transform;
var inherits = require('util').inherits;
var fs = require('fs');
var gm = require('gm');


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
        var file = new Buffer(obj.img, 'base64');
        // var file = {lat:1, lng:1, x:50, y:0,   img:'./images/image52.108416-5.0890658.jpg'};

        console.log(obj.img);

        var x = gm();
        x.in('-page', '+' + obj.x + '+' + obj.y).in(file);
        x.mosaic()  // Merges the images as a matrix
            .stream('png', function streamOut (err, stdout, stderr) {
                if (err) {
                    return next(err)
                }
                var write = fs.createWriteStream('./result.png');

                stdout.pipe(write); //pipe to response
            });

        callback();

    } catch(err) {
        return callback(err);
    }

};

module.exports = encoder;
