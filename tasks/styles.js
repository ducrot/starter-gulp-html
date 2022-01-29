/********************************************************************
 * CSS: Sass + Autoprefixer + Minify
 */

import gulp from 'gulp'
import plumber from 'gulp-plumber'
import sourcemaps from 'gulp-sourcemaps'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

import config from './config'
import {onError} from './misc'
import {stream} from './server'


function styles() {
  return gulp.src(config.styles.src)
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      cssnano()
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(stream());
}

export {styles}
