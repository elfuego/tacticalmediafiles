'use strict';

import config from '../config/default';

import gulp from 'gulp';

export default() => {
    
    gulp.src([
            config.paths.source + '/images/favicon.*', 
            config.paths.source + '/images/apple-touch-icon-precomposed.png'
        ], { buffer: false } )
        .pipe(gulp.dest( config.paths.build + '/' ));

}
