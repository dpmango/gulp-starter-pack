import gulp from 'gulp';
import plumber from 'gulp-plumber';
import svgmin from 'gulp-svgmin';
import svgStore from 'gulp-svgstore';
import rename from 'gulp-rename';
import cheerio from 'cheerio';
import gCheerio from 'gulp-cheerio';
import through2 from 'through2';
import consolidate from 'gulp-consolidate';
import config from '../../config';

// monocolor icons controlled with color/fill in css
const spriteSvgMono = () =>
  gulp
    .src(config.src.iconsSvgMono + '/**/*.svg')
    .pipe(
      plumber({
        errorHandler: config.errorHandler,
      })
    )
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
        plugins: [
          {
            removeDesc: true,
          },
          {
            cleanupIDs: true,
          },
          {
            removeViewBox: false,
          },
          {
            mergePaths: false,
          },
        ],
      })
    )
    .pipe(rename({ prefix: 'ico-mono-' }))
    .pipe(svgStore({ inlineSvg: false }))
    .pipe(
      through2.obj(function (file, encoding, cb) {
        var $ = cheerio.load(file.contents.toString(), { xmlMode: true });
        var data = $('svg > symbol')
          .map(function () {
            var $this = $(this);
            var size = $this.attr('viewBox').split(' ').splice(2);
            var name = $this.attr('id');
            var ratio = size[0] / size[1]; // symbol width / symbol height
            var fill = $this.find('[fill]:not([fill="currentColor"])').attr('fill');
            var stroke = $this.find('[stroke]').attr('stroke');
            return {
              name: name,
              ratio: +ratio.toFixed(2),
              fill: fill || 'initial',
              stroke: stroke || 'initial',
            };
          })
          .get();
        this.push(file);
        gulp
          .src(__dirname + '/_sprite-svg-mono.scss')
          .pipe(
            consolidate('lodash', {
              symbols: data,
            })
          )
          .pipe(gulp.dest(config.src.sassGen));
        cb();
      })
    )
    .pipe(
      gCheerio({
        run: function ($, file) {
          $('[fill]:not([fill="currentColor"])').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
          $('[opacity]').removeAttr('opacity');
          $('[fill-opacity]').removeAttr('fill-opacity');
        },
        parserOptions: { xmlMode: true },
      })
    )
    .pipe(rename({ basename: 'sprite-mono' }))
    .pipe(gulp.dest(config.dest.img));

// preserve colors on icons
const spriteSvgColor = () =>
  gulp
    .src(config.src.iconsSvgColor + '/**/*.svg')
    .pipe(
      plumber({
        errorHandler: config.errorHandler,
      })
    )
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
        plugins: [
          {
            removeDesc: true,
          },
          {
            cleanupIDs: true,
          },
          {
            removeViewBox: false,
          },
          {
            mergePaths: false,
          },
          {
            removeDimensions: false,
          },
          {
            removeAttrs: false,
          },
        ],
      })
    )
    .pipe(rename({ prefix: 'ico-color-' }))
    .pipe(svgStore({ inlineSvg: false }))
    .pipe(
      through2.obj(function (file, encoding, cb) {
        var $ = cheerio.load(file.contents.toString(), { xmlMode: true });
        var data = $('svg > symbol')
          .map(function () {
            var $this = $(this);
            var size = $this.attr('viewBox').split(' ').splice(2);
            var name = $this.attr('id');
            var ratio = size[0] / size[1]; // symbol width / symbol height
            return {
              name: name,
              ratio: +ratio.toFixed(2),
            };
          })
          .get();
        this.push(file);
        gulp
          .src(__dirname + '/_sprite-svg-color.scss')
          .pipe(
            consolidate('lodash', {
              symbols: data,
            })
          )
          .pipe(gulp.dest(config.src.sassGen));
        cb();
      })
    )
    .pipe(rename({ basename: 'sprite-color' }))
    .pipe(gulp.dest(config.dest.img));

const buildSprites = () => gulp.parallel(spriteSvgMono, spriteSvgColor);

const watch = () => () => {
  gulp.watch(config.src.iconsSvgMono + '/**/*.svg', spriteSvgMono);
  gulp.watch(config.src.iconsSvgColor + '/**/*.svg', spriteSvgColor);
};

module.exports.build = buildSprites;
module.exports.watch = watch;
