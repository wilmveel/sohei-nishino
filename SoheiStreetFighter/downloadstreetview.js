var https = require('https')
  , fs = require('fs')

var locations = [
  {
  	"long": "46.414382",
  	"lat": "10.013988",
  	"heading": "151.78"
  }, {
  	"long": "52.109543",
  	"lat": "5.088110",
  	"heading": "151.78"
  }, {
  	"long": "52.108416",
  	"lat": "5.0890658",
  	"heading": "151.78"
  }
];

locations.forEach(getPicture)

function getPicture(obj){
  var options = {
    host: "maps.googleapis.com",
    port: 443,
    path: '/maps/api/streetview?size=50x100&location=' + obj.long + ',' + obj.lat +'&heading=' + obj.heading + '&pitch=-10.0&key=AIzaSyDi_lcmV9GQWGgPrqLQS31hmjpNATGhets',
    method: 'GET'
  };

  var request = https.get(options, function(res){
      var imagedata = ''
      res.setEncoding('binary')

      res.on('data', function(chunk){
          imagedata += chunk
      })

      res.on('end', function(){
          fs.writeFile('images/image' + obj.long + '-' + obj.lat + '.jpg', imagedata, 'binary', function(err){
              if (err) throw err
              console.log('File saved: image' + obj.long + '-' + obj.lat + '.jpg')
          })
      })
  });
}
