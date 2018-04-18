var path = require('path');
var webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.ProvidePlugin({
           $: "jquery",
           jQuery: "jquery"
	   	})
	],
    module: {
        rules: [
          { test: /\.js$/, exclude: [/node_modules/, /public/], loader: "babel-loader" },
          { test: /\.css$/, exclude: [/node_modules/, /public/], loader: "style-loader!css-loader" }
        ]
      }
};