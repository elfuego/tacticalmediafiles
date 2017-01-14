(function () {

    'use strict';

    /**
     * Does something...
     */
    var $topicSelector = $('[data-select-topics]'),
        $collectionSelector = $('[data-select-collections]'),
        $closeSelector = $('[data-select-results-close]'),
        $overlay = $('[data-select-results]'),
        $body = $('body');

    $closeSelector.on('click', function (ev) {
        ev.preventDefault();
        $body.toggleClass('show-overlay');
    });

    $topicSelector.on('click', function (ev) {
        ev.preventDefault();

        $body.toggleClass('show-overlay');
        $overlay.find('.collections').hide();
        $overlay.find('.topics').show();
    });

    $collectionSelector.on('click', function (ev) {
        ev.preventDefault();

        $body.toggleClass('show-overlay');
        $overlay.find('.collections').show();
        $overlay.find('.topics').hide();
    });

    $('body').oiplayer({
        controls: 'light top',
        log: 'error'
    });   // on all video and audio tags in body

})();
