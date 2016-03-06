var path = require('path')
var gulp = require('gulp')
var runSequence = require('run-sequence')
var gutil = require('gulp-util')
var webpack = require('webpack')
var del = require('del')
var babel = require("gulp-babel")

var PATH = {
  SRC: path.join(__dirname, './src'),
  DIST: path.join(__dirname, './dist')
}

gulp.task('build:clean', function() {
  return del(path.join(PATH.DIST, './**/*'))
})

gulp.task('build:client:compile', function(callback) {
  webpack(require('./webpack.prod.config'), function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack', err)
    }
    gutil.log('[webpack]', stats.toString({ colors: true }))
    callback()
  })
})

gulp.task('build:client:copy', function() {
  return gulp.src(path.join(PATH.SRC, './server/public/**/*'))
  .pipe(gulp.dest(path.join(PATH.DIST, './public')))
})

gulp.task('build:client', function(callback) {
  runSequence(
    'build:client:compile',
    'build:client:copy',
    callback
  )
})

gulp.task('build:server', function() {
  return gulp.src([
    path.join(PATH.SRC, './server/**/*.js'),
    '!' + path.join(PATH.SRC, './server/public/**/*'),
    '!' + path.join(PATH.SRC, './server/index.dev.js')
  ])
  .pipe(babel())
  .pipe(gulp.dest(PATH.DIST))
})

gulp.task('build:copy-others', function() {
  return gulp.src(path.join(PATH.SRC, './package.json'))
  .pipe(gulp.dest(PATH.DIST))
})

gulp.task('build', function(callback) {
  runSequence(
    'build:clean',
    ['build:client', 'build:server'],
    'build:copy-others',
    callback
  )
})
