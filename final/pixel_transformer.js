var Transform = require('stream').Transform;
var inherits = require('util').inherits;

var gm = require('gm');
var fs = require('fs');

var canvas;

module.exports = encoder;

function encoder(options) {
    if (!(this instanceof encoder))
        return new encoder(options);

    if (!options) options = {};

    console.log('options: ', options);

    var h = Math.round((options.bbox.s - options.bbox.n) * options.scale);
    var w = Math.round((options.bbox.e - options.bbox.w) * options.scale);

    console.log('hw', h,w);

    canvas = gm(w, h, "#FFFFFF").stroke("#000000");

    Transform.call(this, options);
}

inherits(encoder, Transform);

encoder.prototype._transform = function _transform(json, encoding, callback) {

    var obj = JSON.parse(json);

    var file = new Buffer(obj.img, 'base64');
    var lompeZooi = './lomp/' + obj.lat + '-' + obj.lon + '.jpg';

    fs.writeFileSync(lompeZooi, file);

    if(obj.x && obj.y){
        canvas.in('-page', '+' + obj.x + '+' + obj.y).in(lompeZooi);
        canvas.mosaic(); // Merges the images as a matrix
    }

    callback();
};


encoder.prototype._flush = function (cb) {
    yolo();
    canvas
        .write(__dirname + '/yolo.jpg', function (error) {
            console.log("Finished saving", error);
        });

    yolo();
    cb();
};

function yolo() {
    console.log('YOLO');
}
