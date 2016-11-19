var Transform = require('stream').Transform;
var inherits = require('util').inherits;

module.exports = encoder;
var opts
function encoder(options) {
    if ( ! (this instanceof encoder))
        return new encoder(options);

    opts = options || {};

    options.objectMode = true;
    Transform.call(this, options);
}

inherits(encoder, Transform);

encoder.prototype._transform = function _transform(json, encoding, callback) {

    var bbox = opts.bbox;

    var obj = JSON.parse(json);
    var h = Math.round((opts.bbox.n - opts.bbox.s) * opts.scale);
    var w = Math.round((opts.bbox.e - opts.bbox.w) * opts.scale);
    obj.x = Math.round((obj.lon - opts.bbox.w) * opts.scale);
    obj.y = h- Math.round((obj.lat - opts.bbox.s) * opts.scale);

    console.log(obj);

    this.push(JSON.stringify(obj));

    callback();

};