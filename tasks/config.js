/********************************************************************
 * Project wide configuration
 */

const config = {
  build: {
    src: '../src',
    dest: '../dist/'
  },
  styles: {
    src: '../src/scss/**/*.scss',
    dest: '../dist/css/'
  },
  scripts: {
    src: '../src/js/**/*.js',
    entry: './js/_main.js',
    dest: 'js/'
  },
  html: {
    src: ['../src/**/*.html'],
    dest: '../dist'
  },
  svgicons: {
    src: ['../src/icons/*.svg'],
    dest: '../dist/'
  },
  fonts: {
    src: ['../src/fonts.list'],
    dest: '../dist/fonts/'
  },
  assets: {
    src: ['../src/assets/**'],
    dest: '../dist/assets/'
  },
  favicons: {
    src: ['../src/assets/favicon.svg'],
    dest: '../dist/favicons/',

    config: {
      path: "favicons/",
      appName: 'My App',                          // Your application's name. `string`
      appShortName: 'App',                        // Your application's short_name. `string`. Optional. If not set, appName will be used
      appDescription: 'This is my application',   // Your application's description. `string`
      developerName: 'Christian Ducrot',          // Your (or your developer's) name. `string`
      developerURL: 'https://ducrot.de/',     // Your (or your developer's) URL. `string`
      dir: "auto",                                // Primary text direction for name, short_name, and description
      lang: "de-DE",                              // Primary language for name and short_name
      background: "#fff",                         // Background colour for flattened icons. `string`
      theme_color: "#fff",                        // Theme color user for example in Android's task switcher. `string`
      appleStatusBarStyle: "black-translucent",   // Style for Apple status bar: "black-translucent", "default", "black". `string`
      display: "standalone",                      // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
      orientation: "any",                         // Default orientation: "any", "natural", "portrait" or "landscape". `string`
      scope: "/",                                 // set of URLs that the browser considers within your app
      start_url: "/",                             // Start URL when launching the application from a device. `string`
      version: "1.0",                             // Your application's version string. `string`
      logging: false,                             // Print logs to console? `boolean`
      pixel_art: false,                           // Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode.
      loadManifestWithCredentials: false,         // Browsers don't send cookies when fetching a manifest, enable this to fix that. `boolean`
      icons: {
        // Platform Options:
        // - offset - offset in percentage
        // - background:
        //   * false - use default
        //   * true - force use default, e.g. set background for Android icons
        //   * color - set background for the specified icons
        //   * mask - apply mask in order to create circle icon (applied by default for firefox). `boolean`
        //   * overlayGlow - apply glow effect after mask has been applied (applied by default for firefox). `boolean`
        //   * overlayShadow - apply drop shadow after mask has been applied .`boolean`
        //
        android: true,              // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        appleIcon: true,            // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        appleStartup: false,        // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        favicons: true,             // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        windows: true,              // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
        yandex: false               // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }`
      },
      // Write favicon header imports to file
      html: "index.html",
      pipeHTML: true,
      replace: true
    }
  }
}

export default config
