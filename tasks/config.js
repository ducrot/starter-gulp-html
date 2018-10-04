/********************************************************************
 * Project wide configuration
 */

const config = {
    build: {
        src: 'src',
        dest: 'dist'
    },
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/js/**/*.js',
        entry: './js/_main.js',
        dest: 'js/'
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
}

export default config