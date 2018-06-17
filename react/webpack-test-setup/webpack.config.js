// default node module
const path = require('path');
const autoprefixer = require('autoprefixer');

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
    },

    // resolve extensions - be aware of certain extensions
    resolve: {
        // if no extension is found, try these extensions
        extensions: ['.js', '.jsx']
    },

    // file loaders
    module: {
        rules: [
            {
                // test if a given file fulfils certain criteria
                // -> filename, often checks extension
                test: /\.js$/,

                // 3rd-party plugin that does something additional to files
                // babel is de-facto standard for transpiling javascript
                // 'babel-loader' pkg provides hook for webpack, but
                // 'babel-core' pkg is library for transpiling
                // 'babel-preset-react' & 'babel-preset-env' pkgs are needed as well
                // see '.babelrc' for babel config
                loader: 'babel-loader',

                // exclude certain patterns (like node_modules)
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,

                // to set up loader with config, use 'use'
                // 'css-loader' pkg tell webpack what to do with .css imports
                // 'style-loader' pkg extracts css code from files & injects at top of html file
                use: [
                    // note: must go in this order - goes from bottom to top!
                    // -> we need css loader before style loader
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            // tell css-loader we run 1 loader before this
                            importLoaders: 1,
                            // enable css modules
                            modules: true,
                            // local identifier of css class names
                            // local = module / component name
                            localIdentName: '[name]__[local]__[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                autoprefixer({
                                    browsers: [
                                        // also seen in .babelrc
                                        "> 1%",
                                        "last 2 versions"
                                    ]
                                })
                            ]
                        }
                    }
                ]
            }
        ]
    }
};