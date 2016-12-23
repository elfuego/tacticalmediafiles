'use strict';

import config from '../config/default';

import gulp from 'gulp';

export default() => {
    
    gulp.src([
            config.paths.source + '/images/apple-touch-icon.png',
            config.paths.source + '/images/favicon*'
        ], { buffer: false } )
        .pipe(gulp.dest( config.paths.build + '/' ));

}
