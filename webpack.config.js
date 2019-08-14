const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    path.join(__dirname, '/node_modules/regenerator-runtime/runtime.js'),
    path.join(__dirname, '/frontend/app/index.js'),
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './dist'),
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './frontend/app/index.html',
      filename: './index.html',
    }),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, './frontend/app/favicon/favicon.ico'), to: path.join(__dirname, './dist/favicon.ico') },
      { from: path.join(__dirname, './frontend/releaseNotes'), to: path.join(__dirname, './dist/releaseNotes') },
    ]),
  ],
};
