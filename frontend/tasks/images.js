'use strict';

var gulp      = require('gulp');

gulp.task('images', function () {
    gulp.src([
            '!./source/images/favicon.*', 
            '!./source/images/apple-touch-icon-precomposed.png', 
            './source/images/**/*'
            ], { buffer: false } )
        .pipe(gulp.dest( './public/styles/images' ));
});

