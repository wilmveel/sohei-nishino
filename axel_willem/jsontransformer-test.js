//var request = require('request');
var fs = require('fs')

//var parse = require('./xmltransformer')
var parsejson = require('./jsontransformer');

//var query = '(way(52.0109,4.9507,52.1510,5.2484)[highway=primary]);node(w);out;';

// request.get('http://localhost').form({
//     data: query
// })
    fs.createReadStream('test.json')
    .pipe(parsejson());
    //.pipe(fs.createWriteStream('osm_high.xml'));
