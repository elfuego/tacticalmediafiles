(function () {

    'use strict';

    /**
     * Data selecters and targets.
     */
    var $overlaySelector = $('[data-select-overlay]'),
        $overlay = $('[data-select-results]'),
        $closeSelector = $('[data-select-results-close]'),
        $topicLetterSelector = $('[data-select-results-letter]'),
        $topicsTarget = $('[data-select-results-topics]'),
        $body = $('body');


    /* Open overlay: data attribute corresponds with classname of overlay */
    $overlaySelector.on('click', function (ev) {
        ev.preventDefault();

        var over = $(this).data('select-overlay');
        $body.toggleClass('show-overlay');
        $overlay.find('.container').hide();
        $overlay.find('.' + over).show();
    });
    
    /* Select char in overlay and load its topics */
    $topicLetterSelector.on('click', function(ev) {
        ev.preventDefault();
        var letter = $(this).data('select-results-letter').toLowerCase();
        //console.log(letter);
        //var relativePath = $('meta[name="relative-path"]').attr('content');
        if (letter === 'a' || letter === 'c') {
            $topicsTarget.load('ajax/topics-a.html');
        } else {
            $topicsTarget.load('ajax/topics-b.html');
        }
    });

    /* Close overlay */
    $closeSelector.on('click', function (ev) {
        ev.preventDefault();
        $body.toggleClass('show-overlay');
    });
        
    /* Video player stuff */
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
