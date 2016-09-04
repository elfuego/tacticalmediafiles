'use strict';

var gulp      = require('gulp');

gulp.task('favicon', function () {
    gulp.src([
    		'source/images/favicon.*', 
    		'source/images/apple-touch-icon-precomposed.png'
    	], { buffer: false } )
        .pipe(gulp.dest( 'public/' ));

});
