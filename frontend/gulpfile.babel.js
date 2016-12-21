'use strict';

import config from './config/default';

import gulp   from 'gulp';
//import notify from 'gulp-notify';


// Task: Browser Sync

import taskBrowserSync from './tasks/browser-sync';
gulp.task('browser-sync', taskBrowserSync);


// Task: Clean build

import taskClean from './tasks/clean';
gulp.task('clean', taskClean);


// Task: HTML with pug

import taskHTML from './tasks/pug';
gulp.task('html', taskHTML);


// Task: Styles

import taskStyles from './tasks/less';
gulp.task('styles', taskStyles);


// Task: Assets

import taskFonts from './tasks/fonts';
gulp.task('fonts', taskFonts);

import taskFavicon from './tasks/favicon';
gulp.task('favicon', taskFavicon);

import taskIcons from './tasks/icons';
gulp.task('icons', taskIcons);

import taskImages from './tasks/images';
gulp.task('images', taskImages);

gulp.task('assets', ['favicon', 'fonts', 'images']);


//
// Task: JavaScript (compiles ES6 to ES5)
//

import taskJS from './tasks/js';
gulp.task('js', taskJS);

// js lint and beautifier tasks

import taskJSLint from './tasks/js-lint';
gulp.task('js-lint', taskJSLint);

import taskJSPretty from './tasks/js-prettify';
gulp.task('js-prettify', taskJSPretty);


//
// Default: Watch
//

gulp.task('default', ['clean'], () => {
    gulp.start(['develop']);
});


// All watch tasks for development

gulp.task('html-watch', ['html'], taskBrowserSync.reload);
gulp.task('js-watch', ['js-lint', 'js'], taskBrowserSync.reload);
gulp.task('styles-watch', ['styles'], taskBrowserSync.reload);


// Task 'develop' runs all tasks, starts a watch for each directory and starts browser sync.

gulp.task('develop', ['html', 'styles', 'js', 'assets'], () => {

    gulp.watch([config.paths.source + '/pug/**/*.pug'],     ['html-watch']);
    gulp.watch([config.paths.source + '/less/**/*.less'],   ['styles-watch']);
    gulp.watch([config.paths.source + '/js/**/*.js'],       ['js-watch']);
    //gulp.watch(config.paths.build, ['html-watch']);

    gulp.start('browser-sync');
});
