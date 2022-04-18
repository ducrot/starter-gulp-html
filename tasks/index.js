/********************************************************************
 * Run tasks
 */

import gulp from 'gulp'

import {clean} from './misc'
import {svgicons} from './svgicons'
import {styles} from './styles'
import {scripts} from './webpack'
import {html} from './html'
import {fonts} from './fonts'
import {assets} from './assets'
import {favicons} from './favicons'
import {server} from './server'


export const dev = gulp.series(clean, svgicons, fonts, gulp.parallel(styles, html, assets, favicons), server)
export const build = gulp.series(clean, svgicons, fonts, gulp.parallel(styles, scripts, html, assets, favicons))

export default dev
