/********************************************************************
 * SVG Icons: Create sprites in icons.svg
 */

import gulp from 'gulp'
import plumber from 'gulp-plumber'
import svgSprite from 'gulp-svg-sprite'

import config from './config'
import { onError } from './misc'


function svgicons() {
    return gulp.src(config.svgicons.src)
        .pipe(plumber({errorHandler: onError}))
        .pipe(svgSprite({
            svg: {
                namespaceClassnames: false
            },
            mode: {
                symbol: {
                    inline: true,
                    sprite: 'icons.svg',
                    dest: '.'
                }
            }
        }))
        .pipe(gulp.dest(config.svgicons.dest));
}

export { svgicons }