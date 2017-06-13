var webpack = require('webpack');
var copyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  entry: [
    './app/app.js'
  ],
  output: {
    path: path.join(__dirname, './bundled'),
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
    }),
    copyWebpackPlugin([
      {from: path.join(__dirname, './index.html'), to: path.join(__dirname, './bundled/index.html')},
      {from: path.join(__dirname, './styles/footer.css'), to: path.join(__dirname, './bundled/styles/footer.css')},
      {from: path.join(__dirname, './node_modules/bootstrap/dist/css/bootstrap.min.css'), to: path.join(__dirname, './bundled/node_modules/bootstrap/dist/css/bootstrap.min.css')},
      {from: path.join(__dirname, './node_modules/bootstrap/dist/js/bootstrap.min.js'), to: path.join(__dirname, './bundled/node_modules/bootstrap/dist/js/bootstrap.min.js')}
    ])
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
