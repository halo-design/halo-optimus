const ip = require('ip')
const ora = require('ora')
const opn = require('opn')
const path = require('path')
const http = require('http')
const chalk = require('chalk')
const express = require('express')
const webpack = require('webpack')
const socket = require('socket.io')
const check = require('./check-versions')
const proxyMiddleware = require('http-proxy-middleware')
const settings = require('../config/settings').dev
const webpackConfig = require('../config/webpack.dev')

settings.checkVersions && check()

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(settings.env.NODE_ENV)
}

const port = process.env.PORT || settings.port
const openBrowser = !!settings.openBrowser
const app = express()
let httpServer = app

if (settings.remoteLog) {
  console.log(chalk.green('Opening remote logging service...\n'))
  httpServer = http.Server(app)
  const io = socket(httpServer)
  io.on('connection', socket => {
    socket.on('log', info => {
      console.log(info)
    })
    socket.on('log:success', info => {
      console.log(chalk.green(info))
    })
    socket.on('log:error', info => {
      console.log(chalk.red(info))
    })
    socket.on('log:warn', info => {
      console.log(chalk.yellow(info))
    })
  })
}

const compiler = webpack(webpackConfig)
const spinner = ora('building for development...')
spinner.start()

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: settings.publicPath,
  quiet: true,
  stats: {
    colors: true
  }
})

const hotMiddleware = require('webpack-hot-middleware')(compiler)

compiler.plugin('compilation', compilation => {
  compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
})

app.use('/inmanage', proxyMiddleware({
  target: 'https://flameapp.cn',
  changeOrigin: true
}))

app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)

app.use(hotMiddleware)

const staticPath = path.posix.join(settings.publicPath, settings.assets.subDir)
app.use(staticPath, express.static('./public'))

const uri = `http://${ip.address()}:${port}`

devMiddleware.waitUntilValid(() => {
  spinner.stop()
  console.log(chalk.green(`> Listening at ${uri} \n`))
})

module.exports = httpServer.listen(port, err => {
  if (err) {
    console.log(chalk.red(err))
    return
  }
  if (openBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
