var https = require('https');
var fs = require('fs');

var locations = require('./locations.json');

locations.forEach(getPicture);

function getPicture(obj) {
    var options = {
        host: "maps.googleapis.com",
        port: 443,
        path: '/maps/api/streetview?size=50x100&location=' + obj.long + ',' + obj.lat + '&heading=' + obj.heading + '&pitch=-10.0&key=AIzaSyDi_lcmV9GQWGgPrqLQS31hmjpNATGhets',
        method: 'GET'
    };

    var request = https.get(options, function (res) {
        var imagedata = '';
        res.setEncoding('binary');

        res.on('data', function (chunk) {
            imagedata += chunk
        });

        res.on('end', function () {
            fs.writeFile('images/image' + obj.long + '-' + obj.lat + '.jpg', imagedata, 'binary', function (err) {
                if (err) {
                    throw err
                }
                console.log('File saved: image' + obj.long + '-' + obj.lat + '.jpg');
            });
        });
    });
}
