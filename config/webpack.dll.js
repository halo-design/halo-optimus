const path = require('path')
const webpack = require('webpack')
const vendor = require('./vendor-core')
const resolve = dir => path.join(__dirname, '..', dir)

module.exports = {
  entry: {
    vendor: vendor
  },
  output: {
    path: resolve('public'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      path: resolve('public/[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
}