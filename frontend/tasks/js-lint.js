'use strict';

var gulp = require('gulp');
var notify = require('gulp-notify');
var lint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('js-lint', function () {
	gulp.src(['./source/js/default/**/*.js'])
        .pipe(lint())
        .pipe(lint.reporter(stylish))
        .pipe(lint.reporter('fail'))
        .on('error', notify.onError( (err) => {
                return { icon: false, title: 'JS LINT ERROR', message: err.message };
            }));

});
