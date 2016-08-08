'use strict';

var gulp = require('gulp');
// jsbeautifier options are at: https://github.com/beautify-web/js-beautify 
var prettify = require('gulp-jsbeautifier');

gulp.task('js-prettify', function () {
    gulp.src(['./source/js/default/**/*.js'])
        .pipe(prettify({config:'./config/jsbeautify.json'}))
        .pipe(prettify.reporter())
        .pipe(gulp.dest('./public/styles/js/'));

});

