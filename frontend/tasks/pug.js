'use strict';

import config       from '../config/default'

import gulp         from 'gulp';
import notify       from 'gulp-notify';
import pug          from 'gulp-pug';

export default () => {

    return gulp.src([config.paths.source + '/pug/**/*.pug',
            '!' + config.paths.source + '/pug/layout/*',
            '!' + config.paths.source + '/pug/modules/*'])
        .pipe(pug({
            pretty: true,
            data: { config: config }
        }))
        .on('error', notify.onError(function(error){
            
            let filename = error.filename || error.path;
                filename = filename.replace(/^.*\/(.+?)$/,'$1');
            let title = 'PUG ERROR ON LINE '+error.line+' IN: '+filename;
            let message = error.msg || error.message;

            return { icon: 'Icon.png', title: title, message: message };

        }))
        .pipe(gulp.dest(config.paths.test));
        
}
