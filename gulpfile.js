/********************************
 * Imports                      *
 ********************************/
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var cssnano = require('cssnano');
var del = require('del');
var googleWebFonts = require('gulp-google-webfonts');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var svgSprite = require('gulp-svg-sprite');
var uglify = require('gulp-uglify');


const server = browserSync.create();


/********************************
 * Paths                        *
 ********************************/
const paths = {
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/js/**/*.js',
        entry: 'src/js/_main.js',
        dest: 'dist/js/'
    },
    vendor: {
        src: [
            "node_modules/jquery/dist/jquery.slim.js",
            //"node_modules/popper.js/dist/umd/popper.js",
            "node_modules/bootstrap/js/dist/index.js",
            "node_modules/bootstrap/js/dist/util.js",
            //"node_modules/bootstrap/js/dist/alert.js",
            //"node_modules/bootstrap/js/dist/button.js",
            "node_modules/bootstrap/js/dist/carousel.js",
            "node_modules/bootstrap/js/dist/collapse.js",
            //"node_modules/bootstrap/js/dist/dropdown.js",
            //"node_modules/bootstrap/js/dist/modal.js",
            //"node_modules/bootstrap/js/dist/popover.js",
            //"node_modules/bootstrap/js/dist/scrollspy.js",
            //"node_modules/bootstrap/js/dist/tab.js",
            //"node_modules/bootstrap/js/dist/tooltip.js",
            "node_modules/jquery.mmenu/dist/jquery.mmenu.js",
            "node_modules/jquery.mmenu/dist/wrappers/bootstrap/jquery.mmenu.bootstrap4.js",
            "node_modules/magnific-popup/dist/jquery.magnific-popup.js",
            "node_modules/svg4everybody/dist/svg4everybody.js",
        ],
        dest: 'dist/js/'
    },
    html: {
        src: ['src/**/*.html'],
        dest: 'dist'
    },
    svgicons: {
        src: ['src/icons/*.svg'],
        dest: 'dist/'
    },
    fonts: {
        src: ['src/fonts.list'],
        dest: 'dist/fonts/'
    },
    assets: {
        src: ['src/assets/**'],
        dest: 'dist/assets/'
    },
};


/********************************
 * Main Tasks                   *
 ********************************/
gulp.task('styles', gulp.parallel(styles));
gulp.task('js', gulp.parallel(scripts, vendor));
gulp.task('svgicons', svgicons);
gulp.task('fonts', fonts);
gulp.task('assets', assets);
gulp.task('build', gulp.series(clean, svgicons, gulp.parallel(styles, scripts, vendor, html, fonts, assets)));

gulp.task('default', gulp.series(clean, svgicons, gulp.parallel(styles, scripts, vendor, html, fonts, assets), serve, watch));


/********************************
 * Gulp Tasks                   *
 ********************************/

var onError = function (err) {
    notify.onError({
        title   : 'Gulp',
        subtitle: 'Failure!',
        message : 'Error: <%= error.message %>',
        sound   : 'Beep'
    })(err);

    this.emit('end');
};

/**
 * Cleans the dist folder
 */
function clean() {
    return del('dist');
}

/**
 * CSS: Sass + Autoprefixer + Minify
 */
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer(),
            cssnano()
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(server.stream());
}

/**
 * JS: Babel + Minify
 */
function scripts() {
    return browserify({
            'entries': paths.scripts.entry,
            'debug': true,
            'transform': [
                babelify
            ]
        })
        .bundle()
        .pipe(plumber({errorHandler: onError}))
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({'loadMaps': true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scripts.dest));
}

/**
 * JS Vendor: Minify
 */
function vendor() {
    return gulp.src(paths.vendor.src)
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.vendor.dest));
}

/**
 * HTML: Copy
 */
function html() {
    return gulp.src(paths.html.src)
        .pipe(plumber({errorHandler: onError}))
        .pipe(gulp.dest(paths.html.dest));
}

/**
 * SVG Icons: Create sprites in icons.svg
 */
function svgicons() {
    return gulp.src(paths.svgicons.src)
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
        .pipe(gulp.dest(paths.svgicons.dest));
}

/**
 * Fonts: Local Google web fonts
 */
function fonts() {
    return gulp.src(paths.fonts.src)
        .pipe(plumber({errorHandler: onError}))
        .pipe(googleWebFonts())
        .pipe(gulp.dest(paths.fonts.dest));
}

/**
 * Assets: Minify PNG, JPEG, GIF and SVG
 */
function assets() {
    return gulp.src(paths.assets.src)
        .pipe(plumber({errorHandler: onError}))
        .pipe(imagemin())
        .pipe(gulp.dest(paths.assets.dest));
}


function reload(done) {
    server.reload();
    done();
}

function serve(done) {
    server.init({
        server: {
            baseDir: './dist'
        },
        browser: "google chrome"
    });
    done();
}

function watch() {
    gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.html.src, gulp.series(html, reload));
    gulp.watch(paths.svgicons.src, gulp.series(svgicons, reload));
    gulp.watch(paths.fonts.src, gulp.series(fonts, reload));
    gulp.watch(paths.assets.src, gulp.series(assets, reload));
}
