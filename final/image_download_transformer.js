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

    var size = '20x20';

    try {
        var options = {
            host: "maps.googleapis.com",
            port: 443,
            path: '/maps/api/streetview?size=' + size + '&location=' + obj.lat + ',' + obj.lon + '&heading=' + '150' + '&pitch=-10.0&key=AIzaSyDi_lcmV9GQWGgPrqLQS31hmjpNATGhets',
            method: 'GET'
        };

        console.log(options.path);

        var imageName = './images/image' + obj.lat + '-' + obj.lon + '-' +  size +'.jpg';
        try {
            fs.accessSync(imageName, fs.F_OK);
            var cachedFile = fs.readFileSync(imageName);
            obj.img = cachedFile.toString('base64');
            console.log('image\n', obj.img, '\n\n');
            self.push(JSON.stringify(obj));
            callback();
        } catch (e) {
            https.get(options, function (res) {
                var imagedata = new Buffer(0);

                res.on('data', function (chunk) {
                    imagedata = Buffer.concat([imagedata, chunk]);
                });

                res.on('end', function () {
                    fs.writeFileSync(imageName, imagedata);
                    obj.img = imagedata.toString("base64");
                    self.push(JSON.stringify(obj));
                    callback();
                });
            }).on('error', function (e) {
                console.error(e);
            });
        }

    } catch (err) {
        return callback(err);
    }

};
