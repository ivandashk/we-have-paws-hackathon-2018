var path = require('path');
var webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './src/preview-only-demo.js',
    output: {
        path: path.resolve(__dirname, './../public/preview-only-demo'),
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
            { test: /\.css$/, exclude: [/node_modules/, /public/], loader: "style-loader!css-loader" },
			{
				test: /\.svg$/,
				loader: "url-loader?limit=10000&mimetype=image/svg",
			},
            {
                test: /\.jsx$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /public/], 
				query:
				  {
					presets:['react']
				  }
            },
        ]
      }
};