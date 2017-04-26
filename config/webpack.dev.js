const ip = require('ip')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const settings = require('./settings').dev
const baseWebpackConfig = require('./webpack.base')

const port = process.env.PORT || settings.port

Object.keys(baseWebpackConfig.entry).forEach(name => {
  baseWebpackConfig.entry[name] = ['./bin/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  devtool: '#cheap-module-eval-source-map',
  output: {
    publicPath: `http://${ip.address()}:${port}${settings.publicPath}`
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': settings.env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: settings.htmlTemplate,
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
