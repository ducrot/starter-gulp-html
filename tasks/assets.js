/********************************************************************
 * Assets: Minify PNG, JPEG, GIF and SVG
 */

import gulp from 'gulp'
import plumber from 'gulp-plumber'
import imagemin from 'gulp-imagemin'
import imageminGifsicle from 'imagemin-gifsicle'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'
import imageminSvgo from 'imagemin-svgo';

import config from './config.js'
import {onError} from './misc.js'


function assets() {
  return gulp.src(config.assets.src)
    .pipe(plumber({errorHandler: onError}))
    .pipe(imagemin([
      // Lossless:
      imageminGifsicle({interlaced: true}),
      imageminSvgo({
        plugins: [
          {name: 'removeViewBox', active: false},
          {name: 'removeDimensions', active: true},
        ],
      }),
      // Lossy compression
      imageminMozjpeg({
        quality: 85,
        progressive: true
      }),
      imageminPngquant({
        quality: [0.8, 0.85]
      })
    ]))
    .pipe(gulp.dest(config.assets.dest));
}

export {assets}
