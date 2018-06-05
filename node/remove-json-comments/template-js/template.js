/**
 * This file should be placed wherever easiest for you.
 * For me, this was up 1 directory from manifest.json files that
 *  I had added comments to, just to keep myself organized.
 */
const FileCleaner = require(
    '<path to index.js>'
);

// find folder trailing w/ ChromeExtensionManifest pattern in current directory
FileCleaner.getFileNameViaRule('ChromeExtensionManifest', {
    directory: '<path to dir which holds extensions>'
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