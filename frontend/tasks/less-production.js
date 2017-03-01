'use strict';

import config from '../config/default';

import gulp         from 'gulp';
import notify       from 'gulp-notify';
import less         from 'gulp-less';
import cleanCSS     from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';

export default () => {

    return gulp.src(config.paths.source + '/less/*.less')
        .pipe(less())
        .on('error', notify.onError( (error) => {
            return { icon: 'Icon.png', title: 'LESS ERROR ON LINE ' + error.line, message: error.message };
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.paths.test + '/' + config.paths.assets.css));
}