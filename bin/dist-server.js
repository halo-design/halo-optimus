const ip = require('ip')
const opn = require('opn')
const path = require('path')
const chalk = require('chalk')
const express = require('express')
const tools = require('./analyze-tools')
const settings = require('../config/settings')
const devices = require('../config/devices-list')
const proxyMiddleware = require('http-proxy-middleware')
const proxyTable = settings.dev.proxyTable

const app = express()
const port = settings.build.distServerPort
const publicPath = settings.build.publicPath
const distServerPath = settings.build.distServerPath
const uri = `http://${ip.address()}:${port}${publicPath}`

app.use(publicPath, express.static(path.join(__dirname, '..', distServerPath)))

app.listen(port, error => {
  if (error) {
    throw error
  }
  console.log(chalk.green(`Server is running at ${uri}`))  
  process.env.npm_config_opn && opn(uri)
  process.env.npm_config_shot && tools.screenshot(uri, devices, 600)
})

Object.keys(proxyTable).forEach(context => {
  const options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

app.use(require('connect-livereload')())