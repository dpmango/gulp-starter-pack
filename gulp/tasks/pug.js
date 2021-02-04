/* eslint-disable camelcase */
/* eslint-disable indent */
import gulp from 'gulp';
import pug from 'gulp-pug';
import prettify from 'gulp-jsbeautifier';
import plumber from 'gulp-plumber';
import changed from 'gulp-changed';
import gulpif from 'gulp-if';
import frontMatter from 'gulp-front-matter';
import config from '../config';

const prettifyOptions = {
  editorconfig: true,
  indent_size: 2,
  brace_style: 'expand',
  indent_with_tabs: false,
  indent_inner_html: true,
  preserve_newlines: true,
  end_with_newline: true,
  wrap_line_length: 120,
  max_reserve_newlines: 50,
  wrap_attributes_indent_size: 1,
  unformatted: ['use'],
  inline: [],
};

const renderHtml = (onlyChanged) =>
  gulp
    .src([config.src.templates + '/[^_]*.pug'])
    .pipe(plumber({ errorHandler: config.errorHandler }))
    .pipe(gulpif(onlyChanged, changed(config.dest.html, { extension: '.html' })))
    .pipe(frontMatter({ property: 'data' }))
    .pipe(pug({ pretty: true }))
    .pipe(config.production ? prettify(prettifyOptions) : util.noop())
    .pipe(gulp.dest(config.dest.html));

const buildPug = () => renderHtml();
const watch = () => () => {
  gulp.watch([config.src.templates + '/**/[^_]*.pug'], buildPug);

  gulp.watch([config.src.templates + '/**/_*.pug', config.src.components + '/**/*.pug'], buildPug);
};

module.exports.build = buildPug;
module.exports.watch = watch;
