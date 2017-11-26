// Next tutorial (20): https://www.youtube.com/watch?v=kQ1j0rEI7EI
var http = require('http');
var fs = require('fs');

// create server
var server = http.createServer(function(request, response) {
    console.log('request was made: ' + request.url);

    // set up basic routes
    if (request.url === '/home' || request.url === '/') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/index.html').pipe(response);
        // response.pipe()  
    } else if (request.url === '/contact') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/contact.html').pipe(response);
    } else if (request.url === '/api/ninjas') {
        var ninjas = [{
            name: 'ryu', age: 29
        }, {
            name: 'yoshi', age: 32
        }];

        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end( JSON.stringify(ninjas) );
    } else {
        response.writeHead(404, {'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/404.html').pipe(response);
    }

});

server.listen(3000, '127.0.0.1');
console.log('listening on port 3000');