'use strict';
var webpack = require('webpack');
module.exports = {
    entry: './index.js',
    target: 'web',
    output: {
        path: __dirname + '/dist',
        filename: 'rfc-3986.min.js',
        library: [
            'window'
        ]
    },
    module: {
        loaders: [
            { test: require.resolve('./index'), loader: 'expose?isUri' }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};