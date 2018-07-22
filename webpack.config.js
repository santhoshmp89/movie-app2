const HtmlWekpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        path: __dirname + "/dist",
        filename: 'bundle.js'
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node-modules/
            }
        ]
    },
    plugins: [
        new HtmlWekpackPlugin({template: './index.html'})
    ]
};