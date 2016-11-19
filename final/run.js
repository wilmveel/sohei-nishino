var request = require('request');
var fs = require('fs');
var byline = require('byline');

var xmlTransformer = require('./xml_transformer');
var xyTransformer = require('./xy_transformer');
var imageDownloadTransformer = require('./image_download_transformer');
var pixelTransformer = require('./pixel_transformer');
var dataErosionTransformer = require('./data_erosion_transformer')


var bbox_amsterdam = {
    n: 52.4078,
    e: 4.9722,
    s: 52.3391,
    w: 4.8421
};

var bbox_utrecht = {
    n: 52.1503,
    e: 5.2298,
    s: 52.0121,
    w: 4.9696
};


var scale = 10000;

var options = {
    bbox: bbox_utrecht,
    scale: scale
};

var query = '(way(' + options.bbox.s + ',' + options.bbox.w + ',' + options.bbox.n + ',' + options.bbox.e + ')["highway"~"primary"]);node(w);out;';


request
    .post('http://overpass-api.de/api/interpreter')
    .form({
        data: query
    })
    .pipe(byline())
    .pipe(xmlTransformer())
    .pipe(dataErosionTransformer(options))
    .pipe(xyTransformer(options))
    .pipe(imageDownloadTransformer(options))
    // .pipe(fs.createWriteStream('osm_high.xml'))
    .pipe(pixelTransformer(options));
