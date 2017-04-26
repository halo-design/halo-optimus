const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const assetsPath = require('./assets-path')
const settings = require('./settings').build
const assets = settings.assets
const baseWebpackConfig = require('./webpack.base')

const webpackConfig = merge(baseWebpackConfig, {
  devtool: settings.sourceMap ? '#source-map' : false,
  output: {
    path: assets.root,
    publicPath: settings.publicPath,
    filename: assetsPath(`${assets.jsDir}/[name].[${settings.jsHashType}].js`),
    chunkFilename: assetsPath(`${assets.jsDir}/[id].[name].[${settings.jsHashType}].js`)
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': settings.env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: assetsPath(`${assets.cssDir}/[name].[${settings.cssHashType}].css`),
      allChunks : true
    }),
    new OptimizeCSSPlugin(),
    new HtmlWebpackPlugin({
      filename: assetsPath(assets.htmlFileName),
      template: settings.htmlTemplate,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names : ['vendor', 'manifest']
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../public'),
      to: assets.subDir,
      ignore: ['.*']
    }])
  ]
})

if (settings.gzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(`\\.(${settings.gzipExtensions.join('|')})$`),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (settings.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
