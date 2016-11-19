var express = require('express');
var app = express();

var port = 3000;

var api = require('./index').streetviewApi;

app.use('/api', api);

app.listen(port, function () {
    console.log('User API listening on port: ' + port);
});
