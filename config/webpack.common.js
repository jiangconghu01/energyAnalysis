const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    target: 'web',
    // context: path.resolve(__dirname, '../src'), // webpack查找相对路径文件时候会以该路径为基础路径
    entry: {

        energyAnalysis: ['babel-polyfill', './src/eneryAnalysis.js'],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
    },
    resolve: {
        extensions: [
            '.js', '.vue', '.json'
        ],
        // alias: {
        //     'vue$': 'vue/dist/vue.esm.js'
        // }
    },
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'echarts': 'echarts',
        'axios': 'axios'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
                // echarts: {
                //     chunks: 'all',
                //     name: 'echarts',
                //     test: /[\\/]node_modules[\\/]echarts[\\/]/,
                //     enforce: true
                // },
                // vue: {
                //     chunks: 'all',
                //     name: 'vue',
                //     test: /[\\/]node_modules[\\/]vue[\\/]/,
                //     enforce: true
                // },
                // axios: {
                //     chunks: 'all',
                //     name: 'axios',
                //     test: /[\\/]node_modules[\\/]axios[\\/]/,
                //     enforce: true
                // },
                // vuex: {
                //     chunks: 'all',
                //     name: 'vuex,
                //     test: /[\\/]node_modules[\\/]vuex[\\/]/,
                //     enforce: true
                // }
            }
        },
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`
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
                test: /\.(vue|js|jsx)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                enforce: 'pre',
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    preserveWhitepace: true,
                    extractCSS: !isDev,
                    cssModules: {
                        localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
                        camelCase: true
                    },
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
                        plugins: ['transform-runtime', 'transform-object-rest-spread']
                    }
                }
            },

            {
                test: /\.scss$/,
                use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            // localIdentName: '[path][name]-[local]-[hash:base64:5]'
                            localIdentName: '[name]-[local]-[hash:base64:8]'
                        }
                    },
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                path.resolve(__dirname, '../src/css/energyanalysis.scss')
                            ]
                        }

                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    'postcss-loader',
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 1024,
                            name: 'resources/[path][name].[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 1024,
                            name: 'resources/[path][name].[hash:8].[ext]'
                        }
                    }

                ]
            }
        ]
    }
};
