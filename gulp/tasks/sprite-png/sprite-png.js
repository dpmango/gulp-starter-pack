import gulp from 'gulp';
import plumber from 'gulp-plumber';
import spritesmith from 'gulp.spritesmith';
import buffer from 'vinyl-buffer';
import imagemin from 'gulp-imagemin';
import merge from 'merge-stream';
import config from '../../config';

const task = () => {
  const spriteData = gulp
    .src(config.src.iconsPng + '/*.png')
    .pipe(
      plumber({
        errorHandler: config.errorHandler,
      })
    )
    .pipe(
      spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite-png.scss',
        imgPath: '../img/sprite.png',
        retinaSrcFilter: config.src.iconsPng + '/*@2x.png',
        retinaImgName: 'sprite@2x.png',
        retinaImgPath: '../img/sprite@2x.png',
        padding: 10,
        algorithm: 'binary-tree',
        cssTemplate: __dirname + '/sprite.template.mustache',
      })
    );
  const imgStream = spriteData.img
    .pipe(buffer())
    .pipe(
      imagemin({
        optimizationLevel: 3,
      })
    )
    .pipe(gulp.dest(config.dest.img));
  const styleStream = spriteData.css.pipe(gulp.dest(config.src.sassGen));

  return merge(imgStream, styleStream);
};

const buildPngSprite = () => task();
const watch = () => () => {
  gulp.watch([config.src.iconsPng + '/*.png'], buildPngSprite);
};

module.exports.build = buildPngSprite;
module.exports.watch = watch;
