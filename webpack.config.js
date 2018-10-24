const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    devServer: {
        contentBase: './web-dist',
        historyApiFallback: true,
        hot: true,  // Enabling HMR
        port: 3300
    },
    entry: './web-src/ts/index.ts',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
        mainFields: ['browser', 'main', 'module']
    },
    output: {
        path: path.resolve(__dirname, 'web-dist'),
        publicPath: '/',
        filename: '[name].[hash].js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true
                    }
                }
            },
            {
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'raw-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['web-dist']),
        new HtmlWebpackPlugin({
            template: './web-src/index.html'
        }),
        // NamedModulesPlugin: The relative path of the module to be displayed when HMR is enabled.
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};