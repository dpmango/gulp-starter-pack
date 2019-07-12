import gulp from 'gulp';
import consolidate from 'gulp-consolidate';
import config from '../../config';
import 'require-yaml';

const task = () => {
  delete require.cache[require.resolve('../../../' + config.src.pagelist)];
  const pages = require('../../../' + config.src.pagelist);
  return gulp
    .src(__dirname + '/index.html')
    .pipe(
      consolidate('lodash', {
        pages: pages,
      })
    )
    .pipe(gulp.dest(config.dest.html));
};

const buildIndexPage = () => task();
const watch = () => () => {
  gulp.watch(config.src.pagelist, buildIndexPage);
};

module.exports.build = buildIndexPage;
module.exports.watch = watch;
