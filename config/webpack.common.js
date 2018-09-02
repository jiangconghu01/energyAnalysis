const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    // context: path.resolve(__dirname, '../src'), // webpack查找相对路径文件时候会以该路径为基础路径
    entry: {
        // jquery: 'jquery',
        echarts: 'echarts',
        axios: 'axios',
        vue: 'vue',
        // index: './src/index.js',
        // filetree: './src/filetree.js',
        energyAnalysis: ['babel-polyfill', './src/eneryAnalysis.js'],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
        // publicPath: '/'  //生产环境对应的路径前缀
    },
    resolve: {
        extensions: [
            '.js', '.vue', '.json'
        ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                // lib1: {
                //     chunks: 'all',
                //     name: 'jquery',
                //     enforce: true
                // },
                echarts: {
                    chunks: 'all',
                    name: 'echarts',
                    test: /[\\/]node_modules[\\/]echarts[\\/]/,
                    enforce: true
                },
                vue: {
                    chunks: 'all',
                    name: 'vue',
                    test: /[\\/]node_modules[\\/]vue[\\/]/,
                    enforce: true
                },
                axios: {
                    chunks: 'all',
                    name: 'axios',
                    test: /[\\/]node_modules[\\/]axios[\\/]/,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(['../dist']),
        // new HtmlWebpackPlugin({
        //     title: 'index',
        //     filename: 'index.html',
        //     template: 'src/template/template.html',
        //     // chunks: ['index'],
        //     chunk: ['vue', 'echarts', 'axios', 'index'],
        //     excludeChunks: ['energyAnalysis'],
        //     minify: {
        //         collapseWhitespace: false
        //     },
        //     hash: true
        // }),
        // new HtmlWebpackPlugin({
        //     title: 'filetree',
        //     filename: 'filetree.html',
        //     template: 'src/template/filetree.html',
        //     // chunks: ['filetree'],
        //     chunk: ['vue', 'echarts', 'axios', 'filetree'],
        //     // excludeChunks: ['index'],
        //     minify: {
        //         collapseWhitespace: false
        //     },
        //     hash: true
        // }),
        new HtmlWebpackPlugin({
            title: 'energyAnalysis',
            filename: 'energyAnalysis.html',
            template: 'src/template/energyAnalysis.html',
            // chunks: ['filetree'],
            chunk: ['vue', 'echarts', 'axios', 'energyAnalysis'],
            // excludeChunks: ['index'],
            minify: {
                collapseWhitespace: false
            },
            hash: true
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.vue$/,
                // use: {
                loader: 'vue-loader',
                options: {
                    // cssModules: {
                    //     // localIdentName: '[path][name]---[local]---[hash:base64:5]',
                    //     localIdentName: '[name]--33[hash:base64:5]',
                    //     camelCase: true
                    // },
                    // extractCSS: true,
                    // loaders: isDev ? {
                    //     css: ['vue-style-loader', 'css-loader', 'postcss-loader'],
                    //     scss: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
                    // } : {
                    //     css: ExtractTextPlugin.extract({use: ['css-loader'],
                    //         fallback: 'vue-style-loader'}),
                    //     scss: ExtractTextPlugin.extract({use: ['css-loader', 'sass-loader'],
                    //         fallback: 'vue-style-loader'})
                    // },
                    // postcss: [
                    //     require('autoprefixer')({
                    //         // browsers: ['last 2 versions']
                    //         browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8']
                    //     })
                    // ]
                }
                // }
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ['transform-runtime']
                    }
                }
            },

            {
                test: /\.scss$/,
                use: [ isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            // localIdentName: '[path][name]-[local]-[hash:base64:5]'
                            localIdentName: '[name]-[local]-[hash:base64:8]'
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            // modules: true,
                            // // localIdentName: '[local]_[hash:base64:5]'
                            // localIdentName: '[local]--test'
                        }
                    },
                    'postcss-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
};
