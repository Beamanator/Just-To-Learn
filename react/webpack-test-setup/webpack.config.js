// default node module
const path = require('path');

module.exports = {
    // define sourcemaps webpack should generate (if any).
    //  cheap-module-eval-source-map is quite nice.
    devtool: 'cheap-module-eval-source-map',

    // define where journey begins for webpack. analyze dependencies
    //  of the file
    entry: './src/index.js',

    output: {
        // where should assets be stored
        path: path.resolve(__dirname, 'dist'),
        
        // convention is bundle.js (only affects javascript)
        filename: 'bundle.js',

        // root folder - for webpack to know where files should be put
        publicPath: ''
    }
};