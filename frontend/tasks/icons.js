'use strict';

var gulp = require('gulp');

var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var runTimestamp = Math.round(Date.now()/1000);

gulp.task('icons', function () {
    return gulp.src( './source/icons/**' )
        .pipe(iconfontCss({
            fontName: 'icon-webfont',
            path: 'source/less/core/_icons.less',
            targetPath: '../../../source/less/core/icons.less',
            fontPath: '../icons/'
        }))
        .pipe(iconfont({
            fontName: 'icon-webfont',
            prependUnicode: true,
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
            normalize: true
            //timestamp: runTimestamp
        }))
        .pipe(gulp.dest('./public/styles/icons'));
});
