var gulp     = require('gulp');
var cache    = require('gulp-cache');
var util     = require('gulp-util');
var imagemin = require('gulp-imagemin');
var config   = require('../config.js');


gulp.task('images', function(){
  return gulp
    .src([
      config.src.img + '/**/*.{jpg,png,jpeg,svg,gif}',
      '!' + config.src.img + '/svgo/**/*.*'
    ])
    .pipe(config.production ? cache(imagemin({interlaced: true})) : util.noop())
    .pipe(gulp.dest(config.dest.img))
});

gulp.task('images:watch', function() {
  gulp.watch(config.src.img + '/**/*.{jpg,png,jpeg,svg,gif}', ['images']);
});
