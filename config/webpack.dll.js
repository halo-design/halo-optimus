const path = require('path')
const webpack = require('webpack')
const resolve = dir => path.join(__dirname, '..', dir)

module.exports = {
  entry: {
    vendor: [
      // core
      'react',
      'redux',
      'react-dom',
      'react-redux',
      'redux-thunk',
      'react-router',
      'redux-actions',
      'redux-persist',
      'react-router-dom',
      'react-transition-group/CSSTransitionGroup',
      // plugins
      'qs',
      'md5',
      'nprogress'
    ]
  },
  output: {
    path: resolve('vendor'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false,
      sourceMap: false
    }),
    new webpack.DllPlugin({
      path: resolve('vendor/[name]-manifest.json'),
      name: '[name]_library'
    })
  ]
}