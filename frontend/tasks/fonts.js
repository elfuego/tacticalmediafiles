'use strict';

var gulp      = require('gulp');

gulp.task('fonts', function () {
    gulp.src('./source/fonts/**/*', { buffer: false } )
        .pipe(gulp.dest('./public/styles/fonts'));
});

