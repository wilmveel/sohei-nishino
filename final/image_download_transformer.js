var Transform = require('stream').Transform;
var inherits = require('util').inherits;
var https = require('https');
var fs = require('fs');

module.exports = encoder;

function encoder(options) {
    if (!(this instanceof encoder))
        return new encoder(options);

    if (!options) options = {};
    options.objectMode = true;
    Transform.call(this, options);
}

inherits(encoder, Transform);

encoder.prototype._transform = function _transform(streamobj, encoding, callback) {

    var obj = JSON.parse(streamobj);
    var self = this;

    try {
        var options = {
            host: "maps.googleapis.com",
            port: 443,
            path: '/maps/api/streetview?size=50x100&location=' + obj.lon + ',' + obj.lat + '&heading=' + '150' + '&pitch=-10.0&key=AIzaSyDi_lcmV9GQWGgPrqLQS31hmjpNATGhets',
            method: 'GET'
        };

        console.log(options.path);

        https.get(options, function (res) {
            var imagedata = new Buffer(0);

            res.on('data', function (chunk) {
                imagedata = Buffer.concat([imagedata, chunk]);
            });

            res.on('end', function () {
                obj.img = imagedata.toString("base64");
                self.push(JSON.stringify(obj));
                callback();
            });
        }).on('error', function (e) {
            console.error(e);
        });

    } catch (err) {
        return callback(err);
    }

};
