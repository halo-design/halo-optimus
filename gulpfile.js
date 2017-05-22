const fs = require('fs')
const ip = require('ip')
const opn = require('opn')
const pug = require('pug')
const gulp = require('gulp')
const path = require('path')
const chalk = require('chalk')
const sftp = require('gulp-sftp')
const express = require('express')
const tools = require('./bin/analyzing-tools')

gulp.task('upload', () => 
  gulp.src('dist/**')
  .pipe(sftp({
    host: '139.224.128.69',
    auth: 'nginxAdmin',
    remotePath: '/home/nginx/www/ydkf/inmanage/tmp'
  }))
)

gulp.task('upload-diff', () => 
  gulp.src('dist_diff/**')
  .pipe(sftp({
    host: '139.224.128.69',
    user: 'nginx',
    auth: 'nginxAdmin',
    remotePath: '/home/nginx/www/ydkf/inmanage/tmp'
  }))
)

gulp.task('snapshot', () => {
  tools.getSnapshots('dist', 'data/snapshots')
})

gulp.task('dist-different', () => {
  tools.distDiffer('data/compare.json', 'dist_diff')
})

gulp.task('compare', () => {
  let shotArr = []
  const relPath = 'data/snapshots'
  tools.readDir(path.resolve(), relPath, (curPath, filename, cb) => {
    shotArr.push(filename.split('.')[0] * 1)
  })
  shotArr = shotArr.sort((a, b) => b - a)

  if (shotArr.length > 1) {
    tools.compare({
      source: `${relPath}/${shotArr[1]}.json`,
      target: `${relPath}/${shotArr[0]}.json`,
      compArr: ['css', 'js', 'images', 'fonts', 'static'],
      logPath: 'data',
      callback: data => tools.distDiffer(data, 'dist_diff')
    })
  } else {
    console.log(chalk.red('Can not be compared!'))
  }
})

gulp.task('server-report', () => {
  const server = express()
  const rootPath = path.resolve()
  const layout = fs.readFileSync('./static/report.html', 'utf8')
  const viewFn = pug.compileFile('./static/report.pug')
  const Data = tools.readJSON(path.join(rootPath, 'data/compare.json'))
  tools.deleteEmptyProperty(Data)
  const reportView = viewFn(Data)
  const finalReport = layout.replace('<div id="app"></div>', reportView)

  const uri = `http://${ip.address()}:5000`
  server.use('/static', express.static(path.join(rootPath, 'static')))
  server.get('*', (req, res) => {
    res.send(finalReport)
  })
  server.listen(5000, error => {
    if (error) {
      throw error
    }
    console.log(chalk.green(`Server is running at ${uri}`))
    opn(uri)
  })
})

gulp.task('compare-report', ['compare', 'server-report'])