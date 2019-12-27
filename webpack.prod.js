/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  stats: 'normal',
  plugins: [
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|jsx|css|html|svg|jpg)$/,
      compressionOptions: { level: 11 },
      threshold: 10240,
      minRatio: 1,
      deleteOriginalAssets: false
    }),
    new MinifyPlugin()
  ]
});
