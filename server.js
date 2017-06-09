require('dotenv').config();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ASSET_PATH = process.env.ASSET_PATH || '/';
const ENV = process.env.ENVIRONMENT || 'dev';

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname));

app.use(webpackDevMiddleware(webpack(config(ENV)), {
  hot: process.env.ENVIRONMENT === 'dev' ? true : false,
  filename: 'bundle.js',
  publicPath: ASSET_PATH,
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

const server = app.listen(process.env.HOST_PORT, 'localhost', function() {
   const host = server.address().address;
    const port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
