var gulp        = require('gulp');
var pug         = require('gulp-pug');
var plumber     = require('gulp-plumber');
var changed     = require('gulp-changed');
var gulpif      = require('gulp-if');
var frontMatter = require('gulp-front-matter');
var config      = require('../config');

function renderHtml(onlyChanged) {
  return gulp
    .src([config.src.templates + '/[^_]*.pug'])
    .pipe(plumber({ errorHandler: config.errorHandler }))
    .pipe(gulpif(onlyChanged, changed(config.dest.html, { extension: '.html' })))
    .pipe(frontMatter({ property: 'data' }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(config.dest.html));
}

gulp.task('pug', function() {
  return renderHtml();
});

gulp.task('pug:changed', function() {
  return renderHtml(true);
});

gulp.task('pug:watch', function() {
  gulp.watch([config.src.templates + '/**/_*.pug'], ['pug']);
  gulp.watch([config.src.templates + '/**/[^_]*.pug'], ['pug:changed']);
});
