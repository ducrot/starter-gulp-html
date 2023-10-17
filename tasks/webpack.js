/********************************************************************
 * Webpack
 */

import path from 'path'
import { fileURLToPath } from 'url'
import webpack from 'webpack'
import process from 'process'
import appConfig from './config.js'

const IS_DEV = (process.env.NODE_ENV === 'dev');
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let config = {

  mode: IS_DEV ? 'development' : 'production',
  devtool: IS_DEV ? 'inline-source-map' : 'source-map',

  entry: {
    main: appConfig.scripts.entry,
  },
  output: {
    filename: appConfig.scripts.dest + '[name].js',
    path: path.resolve(__dirname, appConfig.build.dest)
  },
  context: path.resolve(__dirname, appConfig.build.src),

  optimization: {
    // Move node_modules imports to vendor.js
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      },
    },
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],

  resolve: {
    extensions: ['.js'],
    alias: {
      'jquery': 'jquery/dist/jquery.slim.js',
    }
  },
}


function scripts() {
  return new Promise(resolve => webpack(config, (err, stats) => {
    if (err) console.log('Webpack', err)
    console.log(stats.toString({ /* stats options */}))
    resolve()
  }))
}

export {config, scripts}
