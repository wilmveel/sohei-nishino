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

    var obj = JSON.parse(json);
    obj.x = obj.lat;
    obj.y = obj.lon;
    console.log(obj)

    console.log(opts)

    this.push(JSON.stringify(obj));

    callback();

};