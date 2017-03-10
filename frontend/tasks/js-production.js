'use strict';

import config      from '../config/default'; 

import gulp        from 'gulp';
import babel       from 'gulp-babel';
import concat      from 'gulp-concat';
import notify      from 'gulp-notify';
import uglify      from 'gulp-uglify';

export default () => {

    gulp.src([
            config.paths.source + '/js/lib/**/*',     // all: js, min.js and min.js.map
            config.paths.source + '/js/default/**/*.js'
        ])
        .pipe(babel({
            presets: ['es2015']
        }))
        .on('error', notify.onError(function (error) {
                var title = 'JS ERROR ON LINE ' + error.loc.line;
                var message = error.message.replace(/(.\.js:)( .)/,"$1\n$2");

                return { icon: 'Icon.png', title: title, message: message };
            })
        )
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.test + '/' + config.paths.assets.js));

}
