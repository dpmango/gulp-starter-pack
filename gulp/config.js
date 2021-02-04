import util from 'gulp-util';
import errorHandler from './util/errors';

const production =
  util.env.production || util.env.prod || util.env._.indexOf('build') !== -1 || false;
const destPath = 'dist';

const config = {
  env: 'development',
  production: production,

  src: {
    root: 'src',
    templates: 'src/pug',
    components: 'src/components',
    pagelist: 'src/index.yaml',
    sass: 'src/sass',
    sassGen: 'src/sass/generated',
    js: 'src/js',
    img: 'src/img',
    svg: 'src/img/svg',
    icons: 'src/icons',
    iconsPng: 'src/icons/png',
    iconsSvgMono: 'src/icons/svg-mono',
    iconsSvgColor: 'src/icons/svg-colors',
    iconsFont: 'src/icons',
    fonts: 'src/fonts',
    video: 'src/video',
    php: 'src/php',
    json: 'src/json',
  },
  dest: {
    root: destPath,
    html: destPath,
    css: destPath + '/css',
    js: destPath + '/js',
    img: destPath + '/img',
    fonts: destPath + '/fonts',
    video: destPath + '/video',
    php: destPath + '/php',
    json: destPath + '/json',
  },

  setEnv: function (env) {
    if (typeof env !== 'string') return;
    this.env = env;
    this.production = env === 'production';
    process.env.NODE_ENV = env;
  },

  logEnv: function () {
    util.log('Environment:', util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' '));
  },

  errorHandler: errorHandler,
};

config.setEnv(production ? 'production' : 'development');

export default config;
