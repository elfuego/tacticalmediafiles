'use strict';

const path = require('path');
const PugPlugin = require('pug-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    // Insert your PUG templates here
    index: './source/pug/index.pug',
    article: './source/pug/article.pug',
    list: './source/pug/list.pug',
    video: './source/pug/video.pug',
    videos: './source/pug/videos.pug',
    collection: './source/pug/collection.pug',
    picture: './source/pug/picture.pug',
    person: './source/pug/person.pug',
    error: './source/pug/error.pug',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'styles/js/[name].js',
    clean: true,
    //     publicPath: '/',
  },
  mode: 'development',
  plugins: [
    new PugPlugin({
      // pretty: 'auto',
      //☝🏽 Format HTML (only in dev mode)
      data: { config: require('./config/default.json') },
      css: {
        filename: 'styles/css/[name].css'
      },
    }),
    new CopyPlugin({
      patterns: [
        { from: 'source/fonts', to: 'styles/fonts' },
        { from: 'source/icons', to: 'styles/icons' },
        { from: 'source/images', to: 'styles/images' },
      ],
    }),
  ],
  module: {
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
      {
        // To use images on pug files:
        test: /\.(png|gif|jpg|jpeg|ico|svg)/,
        type: 'asset/resource',
        generator: {
          filename: 'styles/images/[name][ext]'
        }
      },
      {
        // To use fonts on pug files:
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'styles/fonts/[name][ext][query]'
        }
      }
    ],
  },
  resolve: {
    alias: {
      'styles/images': path.resolve(__dirname, 'source/images'),
      'styles/fonts': path.resolve(__dirname, 'source/fonts'),
      'styles/icons': path.resolve(__dirname, 'source/icons'),
    },
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    open: { app: { name: 'Google Chrome' } },
    watchFiles: ['source/**/*.{pug,less,js}'],
  },
  stats: 'errors-only'
  //☝🏽 For a cleaner dev-server run
};
