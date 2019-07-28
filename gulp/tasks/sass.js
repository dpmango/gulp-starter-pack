import gulp from 'gulp';
import util from 'gulp-util';
import sass from 'gulp-sass';
import globImporter from 'node-sass-glob-importer';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import objfit from 'postcss-object-fit-images';
import short from 'postcss-short';
import svginline from 'postcss-inline-svg';
import sorting from 'postcss-sorting';
import pseudoel from 'postcss-pseudoelements';
import flexbugs from 'postcss-flexbugs-fixes';
import animations from 'postcss-animation';
import easings from 'postcss-easings';
import cssnano from 'cssnano';
import plumber from 'gulp-plumber';
import config from '../config';

// PostCSS Processors
// short - shorthands -- https://github.com/jonathantneal/postcss-short
// svginline - work with svg -- https://github.com/TrySound/postcss-inline-svg
// animations - get animate.css keframes -- https://github.com/zhouwenbin/postcss-animation
// sorting - keeps rules in order -- https://github.com/hudochenkov/postcss-sorting
// pseudoel - adds semicollumns -- https://github.com/axa-ch/postcss-pseudoelements
// flexbugs - fix flex issues -- https://github.com/luisrudge/postcss-flexbugs-fixes
// easings - gets easings.net -- https://github.com/postcss/postcss-easings

const processors = [
  short(),
  svginline(),
  animations(),
  easings(),
  autoprefixer({
    remove: true, // remove outdated prefixes?
    // cascade: false
  }),
  sorting(),
  objfit(),
  pseudoel(),
  flexbugs(),
];

const cssNanoParams = {
  autoprefixer: false,
  reduceIdents: {
    keyframes: false,
  },
  discardUnused: {
    keyframes: false,
  },
};

// Sass task
const task = () =>
  gulp
    .src(config.src.sass + '/*.{sass,scss}')
    .pipe(config.production ? util.noop() : sourcemaps.init())
    .pipe(
      plumber({
        errorHandler: config.errorHandler,
      })
    )
    .pipe(
      sass({
        importer: globImporter(),
        outputStyle: config.production ? 'compact' : 'expanded', // nested, expanded, compact, compressed
        precision: 5,
        includePaths: ['node_modules', config.src.sass],
      })
    )
    .on('error', config.errorHandler)
    .pipe(postcss(processors))
    .pipe(config.production ? util.noop() : sourcemaps.write('.'))
    .pipe(config.production ? postcss([cssnano(cssNanoParams)]) : util.noop())
    .pipe(gulp.dest(config.dest.css));

const buildSass = () => task();
const watch = () => () => {
  gulp.watch(
    [config.src.sass + '/**/*.{sass,scss}', config.src.components + '/**/*.{sass,scss}'],
    buildSass
  );
};

module.exports.build = buildSass;
module.exports.watch = watch;
