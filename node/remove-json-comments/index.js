const fs = require('fs');

// delete '//' comment from line. Note: don't delete '//' from string.
// ex:  DO   remove: '          // this is nice comment'
// ex: DON'T remove: '   "matches": "http://google.com"'
deleteComments = text => {
    // first, split text into array, based on char " (double quotes)
    let textArr = text.split('"');

    // next, get the first and last elements of the array
    // (comments may be here)
    let lastIndex = textArr.length - 1;
    let firstElem = textArr[0],
        lastElem = textArr[lastIndex];

    // next, search for a '//' in the first element
    let firstElemSlashesIndex = firstElem.indexOf('//');

    // if there's a valid index, remove that part from firstElem
    if (firstElemSlashesIndex !== -1) {
        return firstElem.substr(0, firstElemSlashesIndex);
    }

    // next, search for a '//' in the last element
    let lastElemSlashesIndex = lastElem.indexOf('//');

    // if there's a valid index, remove that part from the lastElem
    if (lastElemSlashesIndex !== -1) {
        textArr[lastIndex] = lastElem.substr(0, lastElemSlashesIndex);
    }

    // return text after it's joined back together.
    return textArr.join('"')
}

cleanFile = (fileName) => new Promise((resolve, reject) => {
    if (!fileName) {
        reject('[cleanFile] not passed proper fileName');
        return;
    }

    fs.readFile(fileName, 'utf8', function(err, data) {
        // handle error
        if (err) {
            reject(err);
            return;
        }
        
        if (data === undefined)
            reject('No data returned from file ' + fileName);

        // split data by line of text
        const cleanData = data.split('\n')
            .map( line => {
                // check if line contains comment characters '//'!
                if (line.indexOf('//') !== -1) {
                    return deleteComments(line);
                }
                
                // no '//' chars, so just return line w/ no changes
                else {
                    return line;
                }
            });
            
        resolve({
            fileName: fileName,
            contents: cleanData.join('\n')
        });
    });
})

// return promise that resolves after complete
writeCleanFile = (fileName, data) =>
    new Promise((resolve, reject) => {
        fs.writeFile(fileName, data, (err) => {
            // pass error up chain
            if (err) {
                reject(err);
                return;
            }
            
            // just in case caller wants to know if successful
            resolve(true);
        });
    });

getFileNameViaRule = (rule, config) => {
    const fileNameSearch = require('./js/fileNameSearch');

    switch(rule) {
        case 'ChromeExtensionManifest':
            // Note: async
            return fileNameSearch.ChromeExtensionManifest(config);

        default:
            console.log(`Error: fileName search rule <${rule}>` +
                ' not found.');
            return null;
    }
}

module.exports = {
    cleanFile: cleanFile,
    writeCleanFile: writeCleanFile,
    getFileNameViaRule: getFileNameViaRule
};