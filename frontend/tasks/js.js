'use strict';

var gulp    = require('gulp');
var concat 	= require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('js', function () {
     gulp.src([
        './source/js/lib/**/*',     // all: js, min.js and min.js.map
        './source/js/default/**/*.js'
        ])
    	.pipe(concat('main.js'))
    	.pipe(uglify())
        .pipe(gulp.dest('./public/styles/js'));
});
