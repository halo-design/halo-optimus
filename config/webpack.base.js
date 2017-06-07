const os = require('os')
const path = require('path')
const webpack = require('webpack')
const cssnano = require('cssnano')
const HappyPack = require('happypack')
const vendor = require('./vendor-core')
const styleLoader = require('./style-loader')
const assetsPath = require('./assets-path')
// const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const resolve = dir => path.join(__dirname, '..', dir)

module.exports = {
  entry: {
    app: './src/entry/index.js',
    vendor: vendor
  },
  output: {
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      // 自定义路径别名
      ASSET: resolve('src/assets'),
      COMPONENT: resolve('src/components'),
      CONSTANT: resolve('src/constants'),
      CORE: resolve('src/core'),
      STORE: resolve('src/store'),
      GLOBAL: resolve('src/globals'),
      IMAGE: resolve('src/assets/images'),
      LAYOUT: resolve('src/layouts'),
      MIDDLEWARE: resolve('src/middleware'),
      REDUCER: resolve('src/reducers'),
      STYLE: resolve('src/assets/styles'),
      UTIL: resolve('src/utils'),
      VIEW: resolve('src/views')
    }
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('src'), resolve('test')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    }, {
      test: /\.(js|jsx)$/,
      loader: 'happypack/loader?id=happybabel',
      include: [resolve('src'), resolve('test')]
    }, {
      test: /\.css$/,
      use: styleLoader()
    }, {
      test: /\.less$/,
      use: styleLoader('less-loader')
    }, {
      test: /\.(scss|sass)$/,
      use: styleLoader('sass-loader')
    }, {
      test: /\.(stylus|styl)$/,
      use: styleLoader('stylus-loader')
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 8192,
        name: assetsPath('images/[name].[hash:7].[ext]')
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 8192,
        name: assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }]
  },
  plugins: [
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader'],
      threadPool: happyThreadPool
    }),
    // new AddAssetHtmlPlugin({
    //   filepath: require.resolve('../public/vendor.dll.js'),
    //   includeSourcemap: false,
    //   hash: true
    // }),
    // new webpack.DllReferencePlugin({
    //   context: path.join(__dirname),
    //   manifest: require('../public/vendor-manifest.json')
    // }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          cssnano({
            autoprefixer: {
              add: true,
              remove: true,
              browsers: ['last 2 versions']
            },
            discardComments: {
              removeAll: true
            },
            discardUnused: false,
            mergeIdents: false,
            reduceIdents: false,
            safe: true,
            sourcemap: true
          })
        ]
      }
    })
  ]
}
