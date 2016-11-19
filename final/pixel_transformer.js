var Transform = require('stream').Transform;
var inherits = require('util').inherits;

var gm = require('gm');

var canvas;

module.exports = encoder;

function encoder(options) {
    if (!(this instanceof encoder))
        return new encoder(options);

    if (!options) options = {};

    console.log('options: ', options)

    var h = Math.round((options.bbox.s - options.bbox.n) * options.scale);
    var w = Math.round((options.bbox.e - options.bbox.w) * options.scale);

    console.log('hw', h,w);

    canvas = gm(h, w, "#FFFFFF").stroke("#000000")

    Transform.call(this, options);
}

inherits(encoder, Transform);

encoder.prototype._transform = function _transform(json, encoding, callback) {

    var obj = JSON.parse(json);

    if(obj.x && obj.y){
        canvas.drawCircle(obj.x, obj.y, obj.x+1, obj.y +1);
    }

    callback();
};


encoder.prototype._flush = function (cb) {
    console.log('JOLO')
    var fs = require('fs');

    canvas
        .write(__dirname + '/jolo.jpg', function (error) {
            console.log("Finished saving", error);
        });

    console.log('JOLO');
    cb();
};