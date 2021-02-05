import gulp from 'gulp';
import cache from 'gulp-cache';
import through2 from 'through2';
import imagemin from 'gulp-imagemin';
import config from '../config.js';

const task = () =>
  gulp
    .src([config.src.img + '/**/*.{jpg,png,jpeg,svg,gif}'])
    .pipe(config.production ? cache(imagemin({ interlaced: true })) : through2.obj())
    .pipe(gulp.dest(config.dest.img));

const buildImages = () => task();
const watch = () => () => {
  gulp.watch([config.src.img + '/**/*.{jpg,png,jpeg,svg,gif}'], buildImages);
};

module.exports.build = buildImages;
module.exports.watch = watch;
