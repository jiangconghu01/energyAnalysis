const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = merge(common, {
    mode: 'production',
    plugins: [
        // new UglifyJSPlugin(),
        new MiniCssExtractPlugin({
            // filename: '[name].style.[contenthash:5].css'
            filename: '[name].style.css'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.style\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
            canPrint: true
        })
    ]
});
