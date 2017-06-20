const path = require('path')

module.exports = {
  build: {
    env: {
      NODE_ENV: '"production"'
    },
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
    bundleAnalyzerReport: process.env.BUNDLE_REPORT,
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
    remoteLog: process.env.REMOTE_LOG
  }
}
