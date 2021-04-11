/********************************************************************
 * Fonts: Local Google web fonts
 */

import gulp from 'gulp'
import plumber from 'gulp-plumber'
import googleWebFonts from 'gulp-google-webfonts'

import config from './config'
import {onError} from './misc'


function fonts() {
  if (config.fonts.src) {
    return gulp.src(config.fonts.src)
      .pipe(plumber({errorHandler: onError}))
      .pipe(googleWebFonts())
      .pipe(gulp.dest(config.fonts.dest));
  } else {
    return new Promise(function (resolve, reject) {
      resolve();
    });
  }
}

export {fonts}
