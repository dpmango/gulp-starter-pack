var gulp          = require('gulp');
var rename        = require('gulp-rename');
var pug           = require('gulp-pug');
var postcss       = require('gulp-postcss');
var sourcemaps    = require('gulp-sourcemaps');
var autoprefixer  = require('autoprefixer');
var sugarss       = require('sugarss');
var precss        = require('precss');
var sorting       = require('postcss-sorting');
var cssnext       = require('postcss-cssnext');
var short         = require('postcss-short');
var svginline     = require('postcss-inline-svg');
var colorFunction = require("postcss-color-function");
var mqpacker      = require('css-mqpacker');
var pixrem        = require('pixrem');
var cssnano       = require('cssnano');
var sass          = require('gulp-sass');
var sassGlob      = require('gulp-sass-glob');
var useref        = require('gulp-useref');
var uglify        = require('gulp-uglify');
var gulpIf        = require('gulp-if');
var imagemin      = require('gulp-imagemin');
var cache         = require('gulp-cache');
var del           = require('del');
var runSequence   = require('run-sequence');
var browserSync   = require('browser-sync').create();

// default task
gulp.task('default', function (callback) {
  runSequence(['postcss', 'pug', 'browserSync'], 'watch',
    callback
  )
})

// watch
gulp.task('watch', function(){
  //gulp.watch('./src/sass/*.+(scss|sass)', ['sass']);
  gulp.watch('./src/pcss/**/*.+(sss|css)', ['postcss']);
  gulp.watch('./src/views/**/*.pug', ['pug']);
  gulp.watch('./src/*.html', browserSync.reload);
  gulp.watch('./src/js/**/*.js', browserSync.reload);
})

// build
gulp.task('build', function (callback) {
  runSequence(
    'clean:dist',
    'pug',
    'postcss',
    ['useref', 'images', 'fonts'],
    callback
  )
})

/////
// DEVELOPMENT TASKS
/////

var processors = [
    precss(),
    short(),
    colorFunction(),
    svginline(),
    autoprefixer({browsers: ['last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']}),
    sorting(),
    // mqpacker(),
    pixrem(),
    //cssnano(),
];

gulp.task('postcss', function() {
  return gulp.src('./src/pcss/style.sss')
      .pipe( sourcemaps.init() )
      .pipe( postcss(processors, { parser: sugarss }) )
      .pipe( sourcemaps.write('.') )
      .pipe(rename({ extname: '.css' }))
      .pipe( gulp.dest('./src/css') )
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('sass', function() {
  return gulp.src('./src/sass/style.+(scss|sass)')
      .pipe( sourcemaps.init() )
      .pipe( sass({ includePaths : ['./src/sass'] }) )
      .pipe( postcss(processors) )
      .pipe( sourcemaps.write('.') )
      .pipe( gulp.dest('./src/css') )
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('bootstrap', function() {
  return gulp.src('./src/sass/bootstrap.+(scss|sass)')
      .pipe( sourcemaps.init() )
      .pipe( sass({ includePaths : ['./src/sass'] }) )
      .pipe( postcss(processors) )
      .pipe( sourcemaps.write('.') )
      .pipe( gulp.dest('./src/css') )
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('pug', function buildHTML() {
  return gulp.src('./src/views/*.pug')
      .pipe(pug({
        pretty: true
      }))
      .pipe( gulp.dest('./src/') )
      .pipe(browserSync.reload({
        stream: true
      }));
});

/////
// OPTIMIZATION TASKS
/////

gulp.task('useref', function(){
  return gulp.src('./src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    //.pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('./src/images/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('./src/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
})

gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback)
})

// hot reload
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
})
