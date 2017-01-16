'use strict';

import config from '../config/default';

import gulp from 'gulp';

export default () => {

    gulp.src(config.paths.source + '/fonts/**/*', { buffer: false } )
        .pipe(gulp.dest(config.paths.test + '/' + config.paths.assets.fonts));

}

