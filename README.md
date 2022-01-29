README
------

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ducrot/starter-gulp-html)

## Toolchain for rapid HTML/CSS development

This toolchain will do:

- Compile SCSS to CSS with Autoprefixer, Minify with nanocss and Sourcemap.
- Considers browserslist in package.json.
- JavaScript transpiler with Babel.
- Webpack module bundler for JavaScript.
- Create SVG sprites from SVG icons.
- Self-Hosted Google fonts.
- Powered by Gulp and Browsersync.


## Quick start

```bash
# Clone the repo
git clone git@github.com:ducrot/starter-gulp-html.git my-project

# Change directory
cd !$

# Install the dependencies with yarn
yarn install

# Start with Browsersync
yarn run dev

# Production build
yarn run build
```


## Fonts

Define Google web fonts in `src/fonts.list`.

Doc: [gulp-google-webfonts](https://www.npmjs.com/package/gulp-google-webfonts)


## Font Awesome

Font Awesome 5 is used. Define icons in `src/js/fontawesome.js` and see:
[SVG JavaScript Core](https://fontawesome.com/how-to-use/on-the-web/advanced/svg-javascript-core) .


## Custom icons

Save custom icons as SVG to `src/icons`.

Use in HTML:

```
<svg class="icon"><use xlink:href="icons.svg#acme"></use></svg>
```

[SVG for Everybody](https://jonathantneal.github.io/svg4everybody/) is used as Polyfill for old browser support.


## Deployment

Deployment ist done via [Surf](https://github.com/TYPO3/Surf).

### Install

Edit paramaters in `.surf/live.php`.

```bash
composer install
```

### Usage

```bash
# Info
./vendor/bin/surf describe live

# Dry-run
./vendor/bin/surf simulate live

# Go!
./vendor/bin/surf deploy  live

# Rollback deployment
./vendor/bin/surf rollback live
```


## Credits

- The ACME logo was created by [Acme Logos - Professional Placeholder Logos](http://acmelogos.com/).
- Components page is based on [juzraai/bootstrap4-test-page](https://github.com/juzraai/bootstrap4-test-page)


## License

[MIT License](LICENSE)