var path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
          { test: /\.js$/, exclude: [/node_modules/, /public/], loader: "babel-loader" },
          { test: /\.css$/, exclude: [/node_modules/, /public/], loader: "style-loader!css-loader" }
        ]
      }
};