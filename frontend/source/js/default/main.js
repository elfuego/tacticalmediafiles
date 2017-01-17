(function () {

    'use strict';

    /**
     * Does something...
     */
    var $overlaySelector = $('[data-select-overlay]'),
        $closeSelector = $('[data-select-results-close]'),
        $overlay = $('[data-select-results]'),
        $body = $('body');

    /* Close overlay */
    $closeSelector.on('click', function (ev) {
        ev.preventDefault();
        $body.toggleClass('show-overlay');
    });

    /* Open overlay: data attribute corresponds with classname of overlay */
    $overlaySelector.on('click', function (ev) {
        ev.preventDefault();

        var over = $(this).data('select-overlay');
        $body.toggleClass('show-overlay');
        $overlay.find('.container').hide();
        $overlay.find('.' + over).show();
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
