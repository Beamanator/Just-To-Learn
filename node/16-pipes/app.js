var http = require('http');
var fs = require('fs');

// create server
var server = http.createServer(function(request, response) {
    console.log('request was made: ' + request.url);
    
    // status 200 is 'ok'
    response.writeHead(200, {'Content-Type': 'text/plain'});
    
    var myReadStream = fs.createReadStream(__dirname + '/slipsum.txt',
        'utf8');
    
    // res is a writeable stream, so pipe file to res
    myReadStream.pipe(response);
});

server.listen(3000, '127.0.0.1');
console.log('listening on port 3000');