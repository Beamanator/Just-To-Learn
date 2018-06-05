const FileCleaner = require(
    '../../Github/Just-To-Learn/node/remove-json-comments/index'
);

// find folder trailing w/ ChromeExtensionManifest pattern in current directory
FileCleaner.getFileNameViaRule('ChromeExtensionManifest', {
    directory: './'
})
.then(fileName => {
    // get cleaned file
    return FileCleaner.cleanFile(fileName)
})
.then(data => {
    const fileName = data.fileName,
        contents = data.contents;

    // write cleaned file back in its original place
    FileCleaner.writeCleanFile(fileName, contents);
})
.catch(console.log);