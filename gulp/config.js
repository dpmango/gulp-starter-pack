var util = require('gulp-util');

var production = util.env.production || util.env.prod || false;
var destPath = 'dist';

var config = {
  env       : 'development',
  production: production,

  src: {
    root         : 'src',
    templates    : 'src/pug',
    templatesData: 'src/pug/data',
    pagelist     : 'src/index.yaml',
    sass         : 'src/sass',
    sassGen      : 'src/sass/generated',
    js           : 'src/js',
    img          : 'src/img',
    svg          : 'src/img/svg',
    icons        : 'src/icons',
    iconsPng     : 'src/icons',
    iconsSvg     : 'src/icons',
    iconsFont    : 'src/icons',
    fonts        : 'src/fonts',
    vendor       : 'src/vendor',
    php          : 'src/php',
    json         : 'src/json'
  },
  dest: {
    root  : destPath,
    html  : destPath,
    css   : destPath + '/css',
    js    : destPath + '/js',
    img   : destPath + '/img',
    fonts : destPath + '/fonts',
    vendor: destPath + '/vendor',
    php   : destPath + '/php',
    json  : destPath + '/json'
  },

  setEnv: function(env) {
    if (typeof env !== 'string') return;
    this.env = env;
    this.production = env === 'production';
    process.env.NODE_ENV = env;
  },

  logEnv: function() {
    util.log(
      'Environment:',
      util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
    );
  },

  errorHandler: require('./util/errors')
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;
