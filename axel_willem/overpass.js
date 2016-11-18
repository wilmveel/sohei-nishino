var overpass = require('query-overpass');

overpass('[out:json];node(52.0109,4.9507,52.151,5.2484);out;', function(err, data){
    console.log(err, data)
});