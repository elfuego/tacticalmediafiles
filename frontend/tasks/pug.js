'use strict';

import config from '../config/default'

import gulp        from 'gulp';
import pug         from 'gulp-pug';

export default () => {
    return gulp.src(config.paths.source + '/pug/*.pug')
        .pipe(pug({
            pretty: true,
            data: { config: config }
        }))
        .pipe(gulp.dest(config.paths.test));
}
