var url = 'http://api.openstreetmap.org/api/0.6/map?bbox=5.11189,52.08705,5.11312,52.08815';

var http = require('http');
var fs = require('fs');

var download = function(url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(cb);  // close() is async, call cb after close completes.
        });
    }).on('error', function(err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) cb(err.message);
    });
    };

download(url, 'lala.xml', function(e,t){
    console.log(e,t)
})