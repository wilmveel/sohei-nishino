var request = require('request');
var fs = require('fs');
var byline = require('byline');

var xmlTransformer = require('./xml_transformer');
var xyTransformer = require('./xy_transformer');
var imageDownloadTransformer = require('./image_download_transformer');
var pixelTransformer = require('./pixel_transformer');
var dataErosionTransformer = require('./data_erosion_transformer')


var bbox_amsterdam = {
    n: 52.3535,
    w: 4.8681,
    s: 52.3878,
    e: 4.9402
};

var bbox_utrecht = {
    n: 52.0119,
    w: 4.9126,
    s: 52.1501,
    e: 5.2868
};


var scale = 10000;

var options = {
    bbox: bbox_utrecht,
    scale: scale
};

var query = '(way(' + options.bbox.n + ',' + options.bbox.w + ',' + options.bbox.s + ',' + options.bbox.e + ')["highway"~"primary"]);node(w);out;';


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
