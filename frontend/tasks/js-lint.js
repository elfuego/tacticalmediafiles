'use strict';

import config from '../config/default';

import gulp     from 'gulp';
import notify   from 'gulp-notify';
import lint     from 'gulp-jshint';
import stylish  from 'jshint-stylish';

export default () => {

	gulp.src([config.paths.source + '/js/default/**/*.js'])
        .pipe(lint())
        .pipe(lint.reporter(stylish))
        .pipe(lint.reporter('fail'))
        .on('error', notify.onError( (err) => {
                return { icon: false, title: 'JS LINT ERROR', message: err.message };
            }));

}