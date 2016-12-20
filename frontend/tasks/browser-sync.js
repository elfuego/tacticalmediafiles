'use strict';

import config from '../config/default';

import browserSync from 'browser-sync';

export default () => {

    browserSync.init({
        server: {
            baseDir: config.paths.test
        },
        watchOptions: {
            ignoreInitial: true,
            ignored: '*.txt'
        },
        files: [
            config.paths.test + "/**/*.*"
        ],
        browser: "google chrome"
        //reloadDelay: 500,
        //reloadDebounce: 1000
    });

}
