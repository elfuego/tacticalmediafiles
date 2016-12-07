'use strict';

import config from '../config/default';

import gulp        from 'gulp';
import iconfont    from 'gulp-iconfont';
import iconfontCss from 'gulp-iconfont-css';

//var runTimestamp = Math.round(Date.now()/1000);

export default() => {
    return gulp.src(config.paths.source + '/icons/**')
        .pipe(iconfontCss({
            fontName: 'icon-webfont',
            path: 'source/less/core/_icons.less',
            targetPath: '../../../' + config.paths.source + '/less/core/icons.less',
            fontPath: '../icons/'
        }))
        .pipe(iconfont({
            fontName: 'icon-webfont',
            prependUnicode: true,
            formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
            normalize: true
            //timestamp: runTimestamp
        }))
        .pipe(gulp.dest(config.paths.build + '/' + config.paths.assets.icons));

}
