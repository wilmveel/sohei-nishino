var Transform = require('stream').Transform;
var inherits = require('util').inherits;
var https = require('https')
  , fs = require('fs')

module.exports = encoder;

function encoder(options) {
    if ( ! (this instanceof encoder))
        return new encoder(options);

    if (! options) options = {};
    options.objectMode = true;
    Transform.call(this, options);
}

inherits(encoder, Transform);

encoder.prototype._transform = function _transform(streamobj, encoding, callback) {

    obj = JSON.parse(streamobj);

    try {
      var options = {
        host: "maps.googleapis.com",
        port: 443,
        path: '/maps/api/streetview?size=50x100&location=' + obj.long + ',' + obj.lat +'&heading=' + obj.heading + '&pitch=-10.0&key=AIzaSyDi_lcmV9GQWGgPrqLQS31hmjpNATGhets',
        method: 'GET'
      };

      var request = https.get(options, function(res){
          var imagedata = ''
          res.setEncoding('binary')

          res.on('data', function(chunk){
              imagedata += chunk
          })

          res.on('end', function(){
              obj.img = new Buffer(imagedata).toString("base64");
              console.log("image added to json");
              console.log(obj);
          })
      });
    } catch(err) {
      return callback(err);
    }

    this.push(obj);
    callback();
};
