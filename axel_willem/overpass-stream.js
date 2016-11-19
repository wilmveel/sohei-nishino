var request = require('request');
var fs = require('fs')

var parse = require('./xmltransformer')

var query = '(way(52.0109,4.9507,52.1510,5.2484)[highway=primary]);node(w);out;';

request.post('http://overpass-api.de/api/interpreter').form({
    data: query
})
    .pipe(parse())
    .pipe(fs.createWriteStream('osm_high.xml'));