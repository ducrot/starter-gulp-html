/********************************************************************
 * Assets: Minify PNG, JPEG, GIF and SVG
 */

import gulp from 'gulp'
import plumber from 'gulp-plumber'
import imagemin from 'gulp-imagemin'

import config from './config'
import { onError } from './misc'


function assets() {
    return gulp.src(config.assets.src)
        .pipe(plumber({errorHandler: onError}))
        .pipe(imagemin())
        .pipe(gulp.dest(config.assets.dest));
}

export { assets }