var osmread = require('osm-read');

var Canvas = require('canvas')
    , Image = Canvas.Image
    , canvas = new Canvas(1000, 1000)
    , ctx = canvas.getContext('2d');

var b;

var nodes = {}

var parser = osmread.parse({
    filePath: './osm.xml',
    endDocument: function () {
        console.log('document end');
        var fs = require('fs')
            , out = fs.createWriteStream(__dirname + '/text.png')
            , stream = canvas.pngStream();

        stream.on('data', function (chunk) {
            out.write(chunk);
        });

        stream.on('end', function () {
            console.log('saved png');
        });
    },
    bounds: function (bounds) {
        console.log('bounds: ' + JSON.stringify(bounds))
        b = bounds

    },
    node: function (node) {
        nodes[node.id] = node;
    },
    way: function (way) {
        way.nodeRefs.forEach(function(id){
            console.log('lala: ' + id);
            var node = nodes[id];
            console.log('bounds: ', b.minlat, b.minlon, b.maxlat, b.minlat);
            console.log('node: ' + JSON.stringify(node.lat) + " " + JSON.stringify(node.lon));


            var x = node.lat - b.minlat;
            var y = node.lon - b.minlon;

            console.log('XY', x, y)
            ctx.beginPath();
            ctx.lineTo(100000 * x, 100000 * y);
            ctx.lineTo(100000 * x + .5, 100000 * y + .5);
            ctx.stroke();
        })
        console.log('way: ' + JSON.stringify(way));

    },
    //relation: function (relation) {
    //    console.log('relation: ' + JSON.stringify(relation));
    //},
    //error: function (msg) {
    //    console.log('error: ' + msg);
    //}
});

