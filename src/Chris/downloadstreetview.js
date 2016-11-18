var https = require('https')
  , fs = require('fs')
  , options

var options = {
  host: "maps.googleapis.com",
  port: 443,
  path: '/maps/api/streetview?size=50x100&location=46.414382,10.013988&heading=151.78&pitch=-10.0&key=AIzaSyDi_lcmV9GQWGgPrqLQS31hmjpNATGhets',
  method: 'GET'
};

var request = https.get(options, function(res){
    var imagedata = ''
    res.setEncoding('binary')

    res.on('data', function(chunk){
        imagedata += chunk
    })

    res.on('end', function(){
        fs.writeFile('images/image1.jpg', imagedata, 'binary', function(err){
            if (err) throw err
            console.log('File saved.')
        })
    })

})
