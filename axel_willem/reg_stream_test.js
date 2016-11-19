var util = require('util')

var input = require('fs').createReadStream('./reg_stream_test.txt', {encoding:'utf-8'})


var parser = {
    "regex": "^([\\S]+) ([\\S]+) ([\\S]+)"
    , "labels": ["A label", "B label", "C label"]
    , "delimiter": "\r\n|\n",
    "stringifyOutput" :true

}

var RegexStream = require('regex-stream')
var regexStream = new RegexStream(parser)

// pipe data from input file to the regexStream parser to stdout
input
    .pipe(regexStream)
    .pipe(process.stdout)

