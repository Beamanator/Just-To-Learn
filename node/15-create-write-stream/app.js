var http = require('http');
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/slipsum.txt', 'utf8');
var myWriteStream = fs.createWriteStream(__dirname + '/writeme.txt');

// listener called every time a chunk is received
myReadStream.on('data', function(chunk) {
    console.log('new chunk received');

    myWriteStream.write(chunk);
});