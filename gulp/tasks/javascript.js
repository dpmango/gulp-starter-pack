var gulp = require('gulp');
var path = require('path');
var util = require('gulp-util');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglifyJs = require('gulp-uglify');
var babel = require('gulp-babel');
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var config = require('../config');

// TODO - move to webpack.config.js
var webpackConfig = {
  mode: config.production ? 'production' : 'development',
  // output: {
  //   // libraryTarget: 'umd',
  //   // umdNamedDefine: true,
  // },
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            options: 'jQuery',
          },
          {
            loader: 'expose-loader',
            options: '$',
          },
        ],
      },
    ],
  },
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     $: 'jquery',
  //     jQuery: 'jquery',
  //     'window.jQuery': 'jquery',
  //   }),
  // ],
};

gulp.task('javascript:vendor', function() {
  return (
    gulp
      .src([config.src.js + '/vendor.js'])
      .pipe(plumber({ errorHandler: config.errorHandler }))
      .pipe(webpackStream(webpackConfig))
      .pipe(concat('vendor.js'))
      // .pipe(config.production ? uglifyJs() : util.noop())
      .pipe(gulp.dest(config.dest.js))
  );
});

gulp.task('javascript:app', function() {
  return gulp
    .src([
      config.src.js + '/app.js',
      config.src.js + '/modules/**/*.js',
      config.src.components + '/**/*.js',
    ])
    .pipe(plumber({ errorHandler: config.errorHandler }))
    .pipe(concat('app.js'))
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(config.production ? uglifyJs() : util.noop())
    .pipe(gulp.dest(config.dest.js));
});

gulp.task('javascript', ['javascript:vendor', 'javascript:app']);

gulp.task('javascript:watch', function() {
  gulp.watch([config.src.js + '/vendor.js'], ['javascript:vendor']);
  gulp.watch(
    [
      config.src.js + '/app.js',
      config.src.js + '/modules/**/*.js',
      config.src.components + '/**/*.js',
    ],
    ['javascript:app']
  );
});
