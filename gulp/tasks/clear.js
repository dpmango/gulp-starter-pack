import del from 'del';
import util from 'gulp-util';
import config from '../config';

// Clean dist folder
// keep images present as it might be time consuming
const build = () => {
  return del([
    config.dest.root + '/**/*',
    '!' + config.dest.root + '/images',
    '!' + config.dest.root + '/images/**/*',
  ]);
  // .then(paths => util.log('Deleted:', util.colors.magenta(paths.join('\n'))));
};

module.exports.build = build;
