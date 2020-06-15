/********************************************************************
 * Start dev server
 */

import gulp    from 'gulp'
import browserSync from 'browser-sync'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

import appConfig from './config'
import { config as webpackConfig } from './webpack'
import { svgicons } from './svgicons'
import { styles } from './styles'
import { html } from './html'
import { fonts } from './fonts'
import { assets } from './assets'
import { favicons } from "./favicons";

const browser = browserSync.create()
const bundler = webpack(webpackConfig)


function server() {

    let config = {
        server: appConfig.build.dest,
        open: true,
        middleware: [
            webpackDevMiddleware(bundler, {
                writeToDisk: true
            })
        ],
        browser: "google chrome",
        // Workaround for: Failed to execute 'removeChild' on 'Node'
        // Exception browser-sync-client.js?v=2.24.7:9 in combination with mmenu
        notify: false,
    }

    browser.init(config)

    gulp.watch(appConfig.scripts.src, reload)
    gulp.watch(appConfig.styles.src, styles)
    gulp.watch(appConfig.html.src, gulp.series(html, reload))
    gulp.watch(appConfig.svgicons.src, gulp.series(svgicons, reload))
    gulp.watch(appConfig.fonts.src, gulp.series(fonts, reload))
    gulp.watch(appConfig.assets.src, gulp.series(assets, reload))
    gulp.watch(appConfig.favicons.src, gulp.series(favicons, reload))
}


function reload(done) {
    browser.reload();
    done();
}


function stream() {
    return browser.stream()
}

export { server, reload, stream }