/********************************************************************
 * Favicon: Favicons generator
 */

import gulp from 'gulp'
import plumber from 'gulp-plumber'
import faviconsGenerator from 'gulp-favicons'
import sharp from 'sharp'

import config from './config.js'
import {onError} from './misc.js'


function favicons() {
  if (config.favicons.src) {
    warmupSharp();
    return gulp.src(config.favicons.src)
      .pipe(plumber({errorHandler: onError}))
      .pipe(faviconsGenerator(config.favicons.config))
      .pipe(gulp.dest(config.favicons.dest));
  } else {
    return new Promise(function (resolve, reject) {
      resolve();
    });
  }
}

/**
 * Workaround for libxml bug on macOS
 * Intermittent Error: Input file has corrupt header: glib: SVG has no elements
 * Apparently the error is only thrown on the first run of the library,
 * regardless of if it fails. So ignoring any first error with a throwaway operation
 * like this seems to make all subsequent run nicely.
 * https://github.com/lovell/sharp/issues/1593#issuecomment-491171982
 * @returns {*}
 */
function warmupSharp() {
  return sharp(
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" /></svg>`,
      'utf-8'
    )
  )
    .metadata()
    .then(() => sharp, () => sharp);
}

export {favicons}
