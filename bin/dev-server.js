require('./check-versions')()
const ip = require('ip')
const opn = require('opn')
const path = require('path')
const http = require('http')
const chalk = require('chalk')
const request = require('request')
const express = require('express')
const webpack = require('webpack')
const socket = require('socket.io')
const settings = require('../config/settings').dev
const webpackConfig = require('../config/webpack.dev')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(settings.env.NODE_ENV)
}

const port = process.env.PORT || settings.port
const openBrowser = !!settings.openBrowser
const app = express()
const httpServer = http.Server(app)
const io = socket(httpServer)
const compiler = webpack(webpackConfig)

io.on('connection', socket => {
  socket.on('log', info => {
    console.log(info)
  })
})

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

app.use('/inmanage', (req, res) => {
  const url = `https://flame.zaixy.cn/inmanage${req.url}`
  console.log(chalk.green(`[PROXY]: `) + url)
  req.pipe(request(url)).pipe(res)
})

app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)

app.use(hotMiddleware)

const staticPath = path.posix.join(settings.publicPath, settings.assets.subDir)
app.use(staticPath, express.static('./public'))

const uri = `http://${ip.address()}:${port}`

devMiddleware.waitUntilValid(() => console.log(chalk.green(`> Listening at ${uri} \n`)))

module.exports = httpServer.listen(port, err => {
  if (err) {
    console.log(chalk.red(err))
    return
  }
  if (openBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
