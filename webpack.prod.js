var webpack = require('webpack');
var path = require('path');
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  entry: [
    './app/app.js'
  ],
  output: {
    path: path.join(__dirname, '/dist/assets'),
    filename: 'bundle.js',
    publicPath: ASSET_PATH,
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'app'),
      }
    ]
  }
};
