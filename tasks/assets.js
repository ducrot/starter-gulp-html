/********************************************************************
 * Assets: Minify PNG, JPEG, GIF and SVG
 */

import gulp from 'gulp'
import plumber from 'gulp-plumber'
import imagemin from 'gulp-imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'

import config from './config'
import { onError } from './misc'


function assets() {
    return gulp.src(config.assets.src)
        .pipe(plumber({errorHandler: onError}))
        .pipe(imagemin([
            // Lossless:
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: false},
                    {removeDimensions: true}
                ]
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

export { assets }
