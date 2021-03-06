const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// this is a node module
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

        // support lazy loading:
        chunkFilename: '[id].js',
        
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
            },
            {
                // pngs, jpg, jpeg, gif
                test: /\.(png|jpe?g|gif)$/,
                
                // 'url-loader' pkg can convert images into base64 to inline css
                // -> if above specified file type, just copies file and adds link in css
                // 'file-loader' pkg copies file and gives link to it
                // add config to query params
                // limit = under this size (in bytes), files are converted and in-lined
                // name = otherwise, where files are put (name = filename, ext = extension)
                loader: 'url-loader?limit=8000&name=images/[name].[ext]'
            }
            // can add more rules for fonts, as an example
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + '/src/index.html',
            filename: 'index.html',
            inject: 'body'
        })
    ]
};