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
    obj.x = Math.round((obj.lon - opts.bbox.w) * opts.scale);
    obj.y = Math.round((obj.lat - opts.bbox.n) * opts.scale);

    this.push(JSON.stringify(obj));

    callback();

};