var fs = require('fs');

// delete a file
// fs.unlink('writeMe.txt');

// synchronous make directory
fs.mkdirSync('mkdir-and-delete');

// synchronous remove directory
fs.rmdirSync('mkdir-and-delete');

// async
fs.mkdir('stuff', function() {
    fs.readFile('readme.txt', 'utf8', function(err, data) {
        fs.writeFile('./stuff/writeme.txt', data);
    });
});

// can't do this if directory isn't empty
// fs.rmdir('stuff');

// set timeout b/c dir was created async
setTimeout(function() {
    fs.unlink('./stuff/writeme.txt', function() {
        fs.rmdir('stuff');
    });
}, 2000);