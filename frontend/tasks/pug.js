'use strict';

var fs          = require('fs');
var gulp        = require('gulp');
var pug         = require('gulp-pug');

var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var fileReadJSON = function(path) {
    try {
        var buf = fs.readFileSync(path);
        return JSON.parse(buf);
    } catch (ex) {
        console.log(ex);
        return null;
    }
};

var config = fileReadJSON('./config/default.json');
if (config === null) {
    console.log('Error reading config!');
    return;
}
//console.log('PUG config: ', config);

gulp.task('pug', function() {
  gulp.src('./source/pug/*.pug')
    .pipe(pug({
        pretty: true,
        data: { config: config }
    }))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.reload({stream: true}));
});

