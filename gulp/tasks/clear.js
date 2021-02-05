import del from 'del';
import config from '../config';

// Clean dist folder
// keep images present as it might be time consuming
const build = () => {
  return del([
    config.dest.root + '/**/*',
    '!' + config.dest.root + '/img',
    '!' + config.dest.root + '/img/**/*',
  ]);
};

module.exports.build = build;
