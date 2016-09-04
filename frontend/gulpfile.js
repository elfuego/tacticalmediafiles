var gulp      = require('gulp');

var requireDir  = require('require-dir');
var dir = requireDir('./tasks', {recurse: true});

var browserSync = require('browser-sync');
var reload      = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./public"
        },
        watchOptions: {
            ignoreInitial: true,
            ignored: '*.txt'
        },
        files: [
            "public/**/*.*"
        ],
        reloadDelay: 1500,
        reloadDebounce: 1000
    });
});

gulp.task('js-watch', ['js-lint', 'js'], reload);
gulp.task('less-watch', ['less'], reload);
gulp.task('pug-watch', ['pug'], reload);
gulp.task('images-watch', ['images'], reload);

gulp.task('develop', ['favicon', 'fonts', 'icons', 'images', 'pug', 'less', 'js-lint', 'js'], function () {
    gulp.watch("pug/**/*.pug", {cwd:'./source'}, ['pug-watch']);
    gulp.watch("images/**/*", {cwd:'./source'}, ['images-watch']);
    gulp.watch("less/**/*.less", {cwd:'./source'}, ['less-watch']);
    gulp.watch("js/default/**/*.js", {cwd:'./source'}, ['js-watch']);  // only watches our js, not lib

    gulp.start('browser-sync');
});

gulp.task('default', ['clean'], function () {
    gulp.start('develop');
});
