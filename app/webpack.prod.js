const webpack= require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CompressionPlugin = require('compression-webpack-plugin');


module.exports = merge(common, {
    mode: 'production',
    optimization: {
        concatenateModules: true
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /es/),
        new CompressionPlugin()
    ],
    resolve: {
        alias: {moment: `moment/moment.js`}
    },
    target: 'web'
});
