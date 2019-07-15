import gulp from 'gulp';
import pug from 'gulp-pug';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import gulpif from 'gulp-if';
import frontMatter from 'gulp-front-matter';
import config from '../config';

const renderHtml = onlyChanged =>
  gulp
    .src([config.src.templates + '/[^_]*.pug'])
    .pipe(plumber({ errorHandler: config.errorHandler }))
    .pipe(gulpif(onlyChanged, changed(config.dest.html, { extension: '.html' })))
    .pipe(frontMatter({ property: 'data' }))
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(config.dest.html));

const buildPug = () => renderHtml();
const watch = () => () => {
  gulp.watch([config.src.templates + '/**/[^_]*.pug'], buildPug);

  gulp.watch([config.src.templates + '/**/_*.pug', config.src.components + '/**/*.pug'], buildPug);
};

module.exports.build = buildPug;
module.exports.watch = watch;
