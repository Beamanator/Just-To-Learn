// for creating servers
var http = require('http');

// whenever a request is sent to the server, this function will fire
var server = http.createServer(function(request, response) {
    console.log('Request was made: ' + request.url);
    response.writeHead(200, {'Content-Type': 'text/plain'});

    response.end('Hey yo!');
});

// this ip is localhost
server.listen(3000, '127.0.0.1');
console.log('yo dawgs, now listening to port 3000');