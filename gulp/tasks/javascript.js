var gulp        = require('gulp');
var util        = require('gulp-util');
var plumber     = require('gulp-plumber');
var concat      = require('gulp-concat');
var uglifyJs    = require('gulp-uglify');
var config      = require('../config');

gulp.task('javascript:vendor', function() {
  return gulp.src([
      config.src.js + '/vendor/**/*.js'
     ])
    .pipe(config.production ? uglifyJs() : util.noop())
    .pipe(plumber({ errorHandler: config.errorHandler }))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(config.dest.js));
});

gulp.task('javascript:app', function() {
  return gulp.src([
      config.src.js + '/*.js'
     ])
    .pipe(config.production ? uglifyJs() : util.noop())
    .pipe(plumber({ errorHandler: config.errorHandler }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(config.dest.js));
});

gulp.task('javascript', [
  'javascript:vendor',
  'javascript:app'
]);

gulp.task('javascript:watch', function() {
  gulp.watch(config.src.js + '/vendor/**/*.js', ['javascript:vendor']);
  gulp.watch(config.src.js + '/*.js', ['javascript:app']);
});
