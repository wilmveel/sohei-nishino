var express = require('express');
var app = express();

var api = require('./index').streetviewApi

app.use('/api', api);

app.listen(3000, function () {
    console.log('User API listening on port 3000!');
});

