/********************************************************************
 * Run tasks
 */

import gulp from 'gulp'

import {clean} from './misc.js'
import {svgicons} from './svgicons.js'
import {styles} from './styles.js'
import {scripts} from './webpack.js'
import {html} from './html.js'
import {fonts} from './fonts.js'
import {assets} from './assets.js'
import {favicons} from './favicons.js'
import {server} from './server.js'


export const dev = gulp.series(clean, svgicons/* , fonts */, gulp.parallel(styles, html, assets, favicons), server)
export const build = gulp.series(clean, svgicons/* , fonts */, gulp.parallel(styles, scripts, html, assets, favicons))

export default dev
