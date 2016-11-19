var request = require('request');
var fs = require('fs')
var byline = require('byline')

var xmlTransformer = require('./xml_transformer');
var xyTransformer = require('./xy_transformer');

var bbox = {
    n: 52.0109,
    w: 4.9507,
    s: 52.1510,
    e: 5.2484
};

var options = {
    bbox: bbox
};

var query = '(way(52.0109,4.9507,52.1510,5.2484)[highway=primary]);node(w);out;';



request
    .post('http://overpass-api.de/api/interpreter')
    .form({
        data: query
    })
    .pipe(byline())
    .pipe(xmlTransformer())
    .pipe(xyTransformer(options))
    .pipe(fs.createWriteStream('osm_high.xml'));