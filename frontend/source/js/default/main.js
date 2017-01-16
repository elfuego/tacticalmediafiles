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

    
    // video player stuff
    $('body').oiplayer({
        controls: 'dark top',
        log: 'error',
        show: false
    });

    $('a.__play').click(function(ev) {
        ev.preventDefault();
        $.fn.oiplayer('start', 'tmf-player');
        $(this).fadeOut('fast');
    });

    $('.oiplayer').bind('oiplayerplay', function(ev, player) {
        //console.log("I started playing: " + $(player.el).attr('id'));
        $('a.__play').fadeOut('fast');
    });

})();
