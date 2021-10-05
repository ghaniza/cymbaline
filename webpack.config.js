const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: process.env.NODE_ENV,
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    entry: {
        index: './src/index.ts',
        'index.min': './src/index.ts',
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'cymbaline',
        umdNamedDefine: true,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    devtool: 'source-map',
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    target: 'node',
}
