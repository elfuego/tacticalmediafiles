'use strict';

import config      from '../config/default'; 

import gulp        from 'gulp';
import concat      from 'gulp-concat';
import uglify      from 'gulp-uglify';
import sourcemaps  from 'gulp-sourcemaps';

export default () => {

    gulp.src([
            config.paths.source + '/js/lib/**/*',     // all: js, min.js and min.js.map
            config.paths.source + '/js/default/**/*.js'
        ])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.test + '/' + config.paths.assets.js));

}
