const Path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const Uglify = require('uglifyjs-webpack-plugin');

const configuration = {
    devtool: false,
    entry: Path.resolve('./src/Candlestick.jsx'),
    mode: 'production',
    module: {
        rules: [
            {
                exclude: /(node_modules)/,
                test: /\.css/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    }
                ],
            },
            {
                exclude: /(node_modules)/,
                test: /\.jsx|.js?$/,
                use: ['babel-loader'],
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    output: {
        path: Path.resolve('./dist'),
        filename: 'candlestick.js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'candlestick.css',
            chunkFilename: 'candlestick.css',
        }),
        new Uglify()
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
    },
    watch: false,
    watchOptions: {
        ignored: /(node_modules)/,
    },
};

module.exports = configuration;
