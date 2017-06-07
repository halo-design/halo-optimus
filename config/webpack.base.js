const os = require('os')
const path = require('path')
const webpack = require('webpack')
const cssnano = require('cssnano')
const HappyPack = require('happypack')
const settings = require('./settings')
const styleLoader = require('./style-loader')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

const isProduction = process.env.NODE_ENV === 'production'
const env = isProduction ? 'build' : 'dev'
const assetsPath = curPath => path.posix.join(settings[env].assets.subDir, curPath)
const resolve = dir => path.join(__dirname, '..', dir)
const publicPath = dir => settings[env].publicPath + dir
const assetConfig = (filename, hash) => ({
  filepath: require.resolve(filename),
  outputPath: 'js',
  publicPath: publicPath('js'),
  includeSourcemap: false,
  hash: hash || false
})

module.exports = {
  entry: {
    app: './src/core/main.js',
    vendor: [
      'antd/lib/button',
      'antd/lib/checkbox',
      'antd/lib/col',
      'antd/lib/date-picker',
      'antd/lib/form',
      'antd/lib/icon',
      'antd/lib/input',
      'antd/lib/message',
      'antd/lib/modal',
      'antd/lib/notification',
      'antd/lib/radio',
      'antd/lib/row',
      'antd/lib/select',
      'antd/lib/slider',
      'antd/lib/spin',
      'antd/lib/table',
      'antd/lib/tree',
      'antd/lib/tree-select',
      'antd/lib/popconfirm'
    ]
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
    new AddAssetHtmlPlugin([
      assetConfig('../vendor/es5-shim.min.js'), 
      assetConfig('../vendor/es6-shim.min.js'),
      assetConfig('../vendor/fetch.min.js'), 
      assetConfig('../vendor/vendor.dll.js', true)
    ]),
    new webpack.DllReferencePlugin({
      context: path.join(__dirname),
      manifest: require('../vendor/vendor-manifest.json')
    }),
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
