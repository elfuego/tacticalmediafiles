'use strict';

import config from '../config/default';

import gulp         from 'gulp';
import less         from 'gulp-less';
import sourcemaps   from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';

export default () => {

    return gulp.src(config.paths.source + '/less/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.paths.test + '/' + config.paths.assets.css));

}