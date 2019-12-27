/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    port: 3005,
    compress: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: {
      disableDotRule: true
    }
  }
});
