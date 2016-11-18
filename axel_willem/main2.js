var osmread = require('osm-read');

var b;

var nodes = {}
var counter = 0;

var parser = osmread.parse({
    filePath: './osm.xml',
    endDocument: function () {
        console.log('document end');
        var fs = require('fs')
            , out = fs.createWriteStream(__dirname + '/text.png')

        stream.on('data', function (chunk) {
            out.write(chunk);
        });

        stream.on('end', function () {
            console.log('saved png');
        });
    },
    bounds: function (bounds) {
        //console.log('bounds: ' + JSON.stringify(bounds))
        b = bounds

    },
    node: function (node) {
        nodes[node.id] = node;
    },
    way: function (way) {
        way.nodeRefs.forEach(function(id){
            //console.log('lala: ' + id);
            var node = nodes[id];
            //console.log('bounds: ', b.minlat, b.minlon, b.maxlat, b.minlat);
            //console.log('node: ' + JSON.stringify(node.lat) + " " + JSON.stringify(node.lon));


            var x = (node.lat - b.minlat)*100000;
            var y = (node.lon - b.minlon)*100000;
            counter++;
            //console.log('XY', x, y)
            node.x = x;
            node.y = y;
            console.log(node);
            console.log("counter: " + counter);
        })
        //console.log('way: ' + JSON.stringify(way));

    },
    //relation: function (relation) {
    //    console.log('relation: ' + JSON.stringify(relation));
    //},
    //error: function (msg) {
    //    console.log('error: ' + msg);
    //}
});
