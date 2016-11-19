var Transform = require('stream').Transform;
var inherits = require('util').inherits;
var parse = require('xml2js').parseString;
module.exports = encoder;

function encoder(options) {
    if ( ! (this instanceof encoder))
        return new encoder(options);

    if (! options) options = {};
    options.objectMode = true;
    Transform.call(this, options);
}

inherits(encoder, Transform);

encoder.prototype._transform = function _transform(xml, encoding, callback) {

        parse(xml, function(err, data){
            if(err){
                return callback(err)
            }
            this.push(data)
            callback()
        }.bind(this));




};