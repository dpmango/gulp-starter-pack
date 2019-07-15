import gulp from 'gulp';
import config from '../config';

const copyRootfiles = () => gulp.src(config.src.root + '/*.*').pipe(gulp.dest(config.dest.root));

const copyFonts = () =>
  gulp.src(config.src.fonts + '/*.{woff,woff2,ttf,eot,svg}').pipe(gulp.dest(config.dest.fonts));

const copyVideo = () => gulp.src(config.src.video + '/*.*').pipe(gulp.dest(config.dest.video));

const copyPhp = () => gulp.src(config.src.php + '/*.*').pipe(gulp.dest(config.dest.php));

const copyJson = () => gulp.src(config.src.json + '/*.*').pipe(gulp.dest(config.dest.json));

const copyTask = () => gulp.parallel(copyRootfiles, copyFonts, copyVideo, copyPhp, copyJson);

const watch = () => () => {
  gulp.watch(config.src.root + '/*.*', copyRootfiles);
  gulp.watch(config.src.fonts + '/*.{woff,woff2,ttf,eot,svg}', copyFonts);
  gulp.watch(config.src.video + '/*.*', copyVideo);
  gulp.watch(config.src.php + '/*.*', copyPhp);
  gulp.watch(config.src.json + '/*.*', copyJson);
};

module.exports.build = copyTask;
module.exports.watch = watch;
