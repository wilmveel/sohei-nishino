var Transform = require('stream').Transform;
var inherits = require('util').inherits;
module.exports = encoder;
var opts
function encoder(options) {
    if (!(this instanceof encoder))         return new encoder(options);
    opts = options || {};
    options.objectMode = true;
    Transform.call(this, options);
}
inherits(encoder, Transform);
encoder.prototype._transform = function _transform(json, encoding, callback) {
    if (Math.random() < 0.5)
        this.push(json);
    callback();
};  
