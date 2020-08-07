const Path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const NodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const Uglify = require('uglifyjs-webpack-plugin');

const configuration = {
    devtool: false,
    entry: Path.resolve('./src/lib/index.js'),
    externals: [NodeExternals()],
    mode: 'production',
    module: {
        rules: [
            {
                exclude: /(node_modules|bower_components)/,
                test: /\.jsx|.js?$/,
                use: ['babel-loader'],
            },
            {
                exclude: /(node_modules|bower_components)/,
                test: /\.css/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    keep_classnames: true,
                    keep_fnames: true,
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                },
                sourceMap: false,
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    output: {
        path: Path.resolve('./dist'),
        filename: 'bundle.js',
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
            chunkFilename: 'bundle.css',
        }),
        new Uglify()
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
    },
    watch: true,
    watchOptions: {
        ignored: /(node_modules|bower_components)/,
    },
};

module.exports = configuration;
