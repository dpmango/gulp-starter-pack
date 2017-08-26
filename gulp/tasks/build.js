var gulp        = require('gulp');
var runSequence = require('run-sequence');
var config      = require('../config');

// set build evnironment first and perform build() function
gulp.task('build:production', function(callback) {
  config.setEnv('production');
  config.logEnv();
  build(callback);
});

gulp.task('build:development', function(callback) {
  config.setEnv('development');
  config.logEnv();
  build(callback);
});

function build(callback) {
  runSequence(
    'clean:dist',
    'sass',
    'pug',
    'javascript',
    'images',
    'sprite:svg',
    'sprite:png',
    'copy',
    'list-pages',
    callback
  );
}
