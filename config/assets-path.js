const path = require('path')
const settings = require('./settings')

const isProduction = process.env.NODE_ENV === 'production'
const assetsSubDir = settings[isProduction ? 'build' : 'dev'].assets.subDir

module.exports = curPath => path.posix.join(assetsSubDir, curPath)