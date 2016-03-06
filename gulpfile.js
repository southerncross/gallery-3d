var path = require('path')
var gulp = require('gulp')
var runSequence = require('run-sequence')
var gutil = require('gulp-util')
var webpack = require('webpack')
var del = require('del')
var merge = require('merge-stream')

var PATH = {
  SRC: path.join(__dirname, './src'),
  ROOT: [
    path.join(__dirname, './index.js'),
    path.join(__dirname, './package.json')
  ],
  PUBLIC: path.join(__dirname, './src/server/public'),
  DIST: path.join(__dirname, './dist')
}

gulp.task('clean', function() {
  return del(path.join(PATH.DIST, './**/*'))
})

gulp.task('build:client', function(callback) {
  webpack(require('./webpack.prod.config'), function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err)
    }
    gutil.log('[webpack]', stats.toString({ colors: true }))
    callback()
  })
})

gulp.task('build:server', function(callback) {
  callback()
})

gulp.task('build:copy', function() {
  var src = gulp.src(path.join(PATH.SRC, './server/**/*'))
    .pipe(gulp.dest(path.join(PATH.DIST, './src')))

  var root = gulp.src(PATH.ROOT)
    .pipe(gulp.dest(paths.dist))

  return merge(src, root)
})

gulp.task('build', function(callback) {
  runSequence(
    'build:clean',
    ['build:client', 'build:server'],
    'build:copy'
  )
})
