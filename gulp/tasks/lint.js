var gulp        = require('gulp');
var htmlhint    = require('gulp-htmlhint');
var sassLint    = require('gulp-sass-lint')
var eslint      = require('gulp-eslint');
var config      = require('../config');

gulp.task('lint:js', function() {
  return gulp.src([config.dest.js + '/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint:html', function() {
  return gulp.src(config.dest.html + "/*.html")
    .pipe(htmlhint('.htmlhintrc'))
    .pipe(htmlhint.failReporter());
});

gulp.task('lint:sass', function() {
  return gulp.src(config.src.sass + '/*.{sass,scss}')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('lint', [
    'lint:js',
    'lint:sass',
    'lint:html'
]);
