const fs = require('fs');

module.exports = {
    // matching pattern: ..._v#.#.#
    ChromeExtensionManifest: (config) =>
        new Promise((resolve, reject) => {
            const manifestDir = '/manifest.json';

            // get variables from config
            const dir = config.directory;

            // get file names and folders in directory
            fs.readdir(dir, (err, files) => {
                if (err) {
                    reject(error);
                    return;
                }

                // loop through fileNames to find matching pattern
                for (let name of files) {
                    /**
                     * Quick explanation of this regex:
                     * 1) $ at end means this must match at end of str
                     * 2) i as final character means case insensitive
                     * 3) _v at the beginning (exact match)
                     * 4) [0-9] is any # from 0-9
                     * 5) {1,3} step #4 must be present 1 - 3 times
                     * 6) \. match the period
                     * 7) paren wrap (...){2} means group happens twice
                     * 8) final [0-9]{1,3} is mentioned above
                     */
                    let re = /_v([0-9]{1,3}\.){2}[0-9]{1,3}$/i;
                    
                    // if name matches, return it and quit
                    if (name.match(re)) {
                        console.log('\tYES! ', name);
                        resolve(name + manifestDir);
                        break;
                    } else {
                        console.log('\t no  ', name)
                    }
                }

                reject('No files matched ChromeExtensionManifest' + 
                    ' pattern: _v#.#.#');
            });

            // don't put anything here -> readdir is async
        })
    
    // other rules?
}