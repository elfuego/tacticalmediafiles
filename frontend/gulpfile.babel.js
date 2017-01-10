'use strict';

import config from './config/default';

import gulp   from 'gulp';
import browserSync from 'browser-sync';
//import notify from 'gulp-notify';



// Task: Browser Sync

// import taskBrowserSync from './tasks/browser-sync';
// gulp.task('browser-sync', taskBrowserSync);


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

gulp.task('html-watch', ['html'], browserSync.reload);
gulp.task('js-watch', ['js-lint', 'js'], browserSync.reload);
gulp.task('styles-watch', ['styles']);
gulp.task('assets-watch', ['assets'], browserSync.reload);


// Task 'develop' runs all tasks, starts a watch for each directory and starts browser sync.

gulp.task('develop', ['html', 'styles', 'js', 'assets'], () => {

    browserSync.init({
        server: {
            baseDir: config.paths.test
        },
        watchOptions: {
            ignoreInitial: true,
            ignored: '*.txt'
        },
        files: [
             config.paths.test + "/**/*.*"
        ],
        browser: "google chrome"
        // reloadDelay: 250,
        // reloadDebounce: 500
    });

    gulp.watch([config.paths.source + '/pug/**/*.pug'],     ['html-watch']);
    gulp.watch([config.paths.source + '/less/**/*.less'],   ['styles-watch']);
    gulp.watch([config.paths.source + '/js/**/*.js'],       ['js-watch']);
    gulp.watch([config.paths.source + '/fonts/**/*', 
                config.paths.source + '/images/**/*'],      ['assets-watch']);

    // gulp.start('browser-sync');
});
