var fs = require('fs');

// sync = fully read file before moving on. There is an async version
// var readme = fs.readFileSync('readme.txt', 'utf8');

// fs.writeFileSync('writeMe.txt', readme + ' now');

fs.readFile('readMe.txt', 'utf8', function(err, data) {
    console.log(data);

    fs.writeFile('writeMe.txt', data + ' aww yeah.\n');
});