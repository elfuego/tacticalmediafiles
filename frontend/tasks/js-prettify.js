'use strict';

import config from '../config/default';

import gulp     from 'gulp';

// jsbeautifier options are at: https://github.com/beautify-web/js-beautify 
import prettify from 'gulp-jsbeautifier';


export default() => {
    gulp.src([config.paths.source + '/js/default/*.js'])
        .pipe(prettify({config:'./config/jsbeautify.json'}))
        .pipe(prettify.reporter())
        .pipe(gulp.dest(config.paths.source + '/js/default/'));
}

