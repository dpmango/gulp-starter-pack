import del from 'del';
import util from 'gulp-util';
// import cache from 'gulp-cache';
import config from '../config';

// Clean dist folder
// keep images present as it might be time consuming
const build = () => {
  return del([
    config.dest.root + '/**/*',
    '!' + config.dest.root + '/images',
    '!' + config.dest.root + '/images/**/*',
  ]).then(paths => util.log('Deleted:', util.colors.magenta(paths.join('\n'))));
};

// Clear gulp cache
// gulp.task('cache:clear', function(callback) {
//   return cache.clearAll(callback);
// });

module.exports.build = build;
