'use strict';

var gulp      = require('gulp');
var less      = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var browserSync = require('browser-sync');

gulp.task('less', function () {
    gulp.src('./source/less/*.less')
        .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(autoprefixer({
                browsers: ['last 2 versions']
            }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/styles/css'))

        .pipe(browserSync.reload({stream: true}));
});


