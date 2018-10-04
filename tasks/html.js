/********************************************************************
 * HTML: Copy
 */

import gulp from 'gulp'
import plumber from 'gulp-plumber'
import config from './config'
import { onError } from './misc'


function html() {
    return gulp.src(config.html.src)
        .pipe(plumber({errorHandler: onError}))
        .pipe(gulp.dest(config.html.dest));
}

export { html }