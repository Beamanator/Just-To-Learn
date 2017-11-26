var http = require('http');
var fs = require('fs');

// this read stream splits data up in chucks, then passes the data to
// variable myReadStream
var myReadStream = fs.createReadStream(__dirname + '/slipsum.txt', 'utf8');

// set up event emitter listener
myReadStream.on('data', function(chunk) {
    // chunk of data from buffer
    console.log('===== new chunk received: =====');
    console.log(chunk);
});

// if there's much more data in txt file, there will be multiple chunks
// so listener will be called multiple times