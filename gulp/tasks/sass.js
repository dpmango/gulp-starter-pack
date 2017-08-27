var gulp         = require('gulp');
var util         = require('gulp-util');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var short        = require('postcss-short');
var svginline    = require('postcss-inline-svg');
var sorting      = require('postcss-sorting');
var pseudoel     = require('postcss-pseudoelements');
var flexbugs     = require('postcss-flexbugs-fixes');
var cssnano      = require('cssnano');
var plumber      = require('gulp-plumber');
var config       = require('../config');

// PostCSS Processors
var processors = [
  short(),
  svginline(),
  autoprefixer({
    browsers: ['last 10 versions'],
    remove: true, // remove outdated prefixes?
    // cascade: false
  }),
  sorting(),
  pseudoel(),
  flexbugs()
];

var cssNanoParams = {
  autoprefixer: false,
  reduceIdents: {
    keyframes: false
  },
  discardUnused: {
    keyframes: false
  }
}

// Sass task
gulp.task('sass', function() {
  return gulp
    .src(config.src.sass + '/*.{sass,scss}')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: config.production ? 'compact' : 'expanded', // nested, expanded, compact, compressed
        precision: 5,
        includePaths : [config.src.sass]
    }))
    .on('error', config.errorHandler)
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(config.production ? postcss([cssnano(cssNanoParams)]) : util.noop())
    .pipe(plumber({
      errorHandler: config.errorHandler
    }))
    .pipe(gulp.dest(config.dest.css))
});

gulp.task('sass:watch', function() {
  gulp.watch(config.src.sass + '/**/*.{sass,scss}', ['sass']);
});
