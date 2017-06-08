var webpack = require('webpack');
var path = require('path');
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  devtool: "eval-source-map", //enables debugging
  entry: [
    './app/app.js'
  ],
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: "bundle.js",
    publicPath: ASSET_PATH,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'app'),
        exclude: [/node_modules/, /bundled/],
      }
    ]
  }
};
