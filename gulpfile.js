var gulp = require('gulp')
var sftp = require('gulp-sftp')

gulp.task('deploy', function () {
  return gulp.src('dist/**')
  .pipe(sftp({
    host: '139.224.128.69',
    auth: 'nginxAdmin',
    remotePath: '/home/nginx/www/ydkf/inmanage'
  }))
})

gulp.task('diff', function () {
  return gulp.src('dist_diff/**')
  .pipe(sftp({
    host: '139.224.128.69',
    user: 'nginx',
    auth: 'nginxAdmin',
    remotePath: '/home/nginx/www/ydkf/inmanage'
  }))
})
