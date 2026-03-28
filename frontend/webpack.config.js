
'use strict';

const path    = require('path');
const webpack = require('webpack');
const PugPlugin  = require('pug-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const jqueryPath = path.resolve(__dirname, 'source/js/lib/jquery-4.0.0.min.js');

module.exports = (env, argv) => {
  const isProd = argv && argv.mode === 'production';

  return {
    mode: isProd ? 'production' : 'development',

    entry: {
      index:      './source/pug/index.pug',
      list:       './source/pug/list.pug',
      video:      './source/pug/video.pug',
      videos:     './source/pug/videos.pug',
      article:    './source/pug/article.pug',
      collection: './source/pug/collection.pug',
      picture:    './source/pug/picture.pug',
      person:     './source/pug/person.pug',
      error:      './source/pug/error.pug',
    },

    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'styles/js/[name].js',
      clean: true,
    },

    plugins: [
      new PugPlugin({
        data: { config: require('./config/default.json') },
        css: {
          filename: 'styles/css/[name].css',
        },
      }),
      // Make $ and jQuery available as globals for legacy jQuery plugins
      new webpack.ProvidePlugin({
        $:      jqueryPath,
        jQuery: jqueryPath,
      }),
      // Copy static assets — fonts and icons are only referenced from CSS (url:false),
      // images are also needed for CSS url() references (e.g. oiplayer)
      new CopyPlugin({
        patterns: [
          { from: 'source/fonts',  to: 'styles/fonts' },
          { from: 'source/icons',  to: 'styles/icons' },
          { from: 'source/images', to: 'styles/images' },
        ],
      }),
    ],

    module: {
      // Skip re-parsing pre-minified library files
      noParse: /\.min\.js$/,
      rules: [
        {
          test: /\.less$/,
          use: [
            // url:false — CSS font/image URLs are output-relative paths designed
            // for the old Gulp layout; CopyPlugin places them in the right spots
            { loader: 'css-loader', options: { url: false } },
            'less-loader',
          ],
        },
        {
          test: /\.js$/,
          exclude: [/node_modules/, /\.min\.js$/],
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { targets: 'last 2 versions' }]],
            },
          },
        },
        // Images referenced from Pug templates (via styles/images alias)
        {
          test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
          type: 'asset/resource',
          generator: {
            filename: 'styles/images/[name][ext]',
          },
        },
      ],
    },

    // Map output-style asset paths used in Pug templates back to source directories
    resolve: {
      alias: {
        'styles/images': path.resolve(__dirname, 'source/images'),
        'styles/fonts':  path.resolve(__dirname, 'source/fonts'),
        'styles/icons':  path.resolve(__dirname, 'source/icons'),
      },
    },

    devtool: isProd ? false : 'source-map',

    devServer: {
      static: {
        directory: path.resolve(__dirname, 'public'),
      },
      watchFiles: ['source/**/*.{pug,less,js}'],
      open: {
        app: { name: 'google chrome' },
      },
      port: 8081,
    },
  };
};
