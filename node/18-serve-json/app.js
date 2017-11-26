var http = require('http');
var fs = require('fs');

// create server
var server = http.createServer(function(request, response) {
    console.log('request was made: ' + request.url);
    
    // status 200 is 'ok'
    response.writeHead(200, {'Content-Type': 'application/json'});
    
    var myObj = {
        name: 'Bob',
        job: 'Ninja',
        age: 29
    };

    response.end(JSON.stringify(myObj));

});

server.listen(3000, '127.0.0.1');
console.log('listening on port 3000');