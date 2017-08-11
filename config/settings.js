const path = require('path')

module.exports = {
  build: {
    env: {
      NODE_ENV: '"production"'
    },
    lint: false,
    assets: {
      root: path.join(__dirname, '../dist'),
      subDir: '',
      htmlFileName: 'index.html',
      cssDir: 'css',
      jsDir: 'js'
    },
    jsHashType: 'chunkhash:8',
    cssHashType: 'contenthash:8',
    publicPath: '/halo/',
    sourceMap: false,
    gzip: false,
    gzipExtensions: ['js', 'css'],
    distServerPort: 3030,
    distServerPath: 'dist',
    bundleAnalyzerReport: process.env.npm_config_report,
    checkVersions: true
  },
  dev: {
    env: {
      NODE_ENV: '"development"'
    },
    lint: true,
    port: 8080,
    openBrowser: true,
    assets: {
      subDir: ''
    },
    publicPath: '/',
    checkVersions: true,
    remoteLog: process.env.npm_config_log,
    proxyTable: {
      '/inmanage': {
        target: 'https://flameapp.cn',
        changeOrigin: true
      }
    },
  },
  test: {
    env: {
      NODE_ENV: '"testing"'
    },
    lint: false
  }
}
