var Transform = require('stream').Transform;
var inherits = require('util').inherits;

module.exports = encoder;

function encoder(options) {
    if ( ! (this instanceof encoder))
        return new encoder(options);

    if (! options) options = {};
    options.objectMode = true;
    Transform.call(this, options);
}

inherits(encoder, Transform);

encoder.prototype._transform = function _transform(line, encoding, callback) {

    var REGEX = /<node id="(.*)" lat="(.*)" lon="(.*)"\/>/

    var match = line.toString().match(REGEX);
    if(match){
        var obj = {
            id : match[1],
            lat : match[2],
            lon : match[3]
        };
        this.push(JSON.stringify(obj));
    }

    callback();

};