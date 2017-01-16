'use strict';

import config from '../config/default';

import gulp from 'gulp';
import del  from 'del';

export default () => {

    return gulp.task('clean', function (callback) {
        del(config.paths.test + '/*', callback);
    });
}


