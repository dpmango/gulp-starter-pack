var gulp        = require('gulp');
var plumber     = require('gulp-plumber');
var svgSprite   = require('gulp-svg-sprites');
var svgmin      = require('gulp-svgmin');
var cheerio     = require('gulp-cheerio');
var svgStore    = require('gulp-svgstore');
var rename      = require('gulp-rename');
var replace     = require('gulp-replace');
var config      = require('../../config');

gulp.task('sprite:svg', function () {
	return gulp.src(config.src.iconsSvg + '/*.svg')
    .pipe(plumber({
        errorHandler: config.errorHandler
    }))
		// minify svg
		.pipe(svgmin({
			js2svg: {
				pretty: true
			},
      plugins: [{
          removeDesc: true
      }, {
          cleanupIDs: true
      }, {
          mergePaths: false
      }]
		}))
    .pipe(rename({ prefix: 'icon-' }))
    // .pipe(svgStore({ inlineSvg: false }))
		// remove all fill and style declarations in out shapes
    .pipe(cheerio({
      run: function($, file) {
          $('[fill]:not([fill="currentColor"])').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
      },
      parserOptions: { xmlMode: true }
    }))
		// cheerio plugin create unnecessary string '>', so replace it.
		.pipe(replace('&gt;', '>'))
		// build svg sprite
    .pipe(svgSprite({
    	mode: {
    		symbol: {
    			sprite: "../sprite.svg",
    			render: {
    				scss: {
    					dest: config.src.sassGen + '/_sprite.scss',
    					template: __dirname + '/_sprite-svg.scss'
    				}
    			}
    		}
    	}
    }))
    .pipe(rename({ basename: 'sprite' }))
		.pipe(gulp.dest(config.dest.img));
});

gulp.task('sprite:svg:watch', function() {
  gulp.watch(config.src.iconsSvg + '/*.svg', ['sprite:svg']);
});
