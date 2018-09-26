const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
module.exports = merge(common, {
    mode: 'development',
    devServer: {
        contentBase: 'dist',
        index: 'energyAnalysis.html',
        compress: true,
        hot: true,
        host: '0.0.0.0',
        //host: 'localhost',
        port: 9000,
        proxy: {

            '/czxt/*': {
                // target: 'http://rap2api.taobao.org/app/mock/18550',
                // target: 'http://134.96.245.118:7001/',
                target: 'http://localhost:3000/',
                changeOrigin: true,
                secure: false
            }
        }
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});