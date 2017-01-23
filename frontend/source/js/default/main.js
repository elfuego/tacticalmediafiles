(function () {

    'use strict';

    /**
     * Data selecters and targets.
     */
    var $overlaySelector = $('[data-select-overlay]'),
        $overlay = $('[data-select-results]'),
        $closeSelector = $('[data-select-results-close]'),
        $topicLetterSelector = $('[data-select-results-letter]'),
        $topicsTarget = $('[data-select-results-topics-target]'),
        $typeSelector = $('[data-select-results-type]'),
        $typeTarget = $('[data-select-results-type-target]'),
        $filterTarget = $('[data-select-results-filter-target]'),
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
        var link = $('meta[name="context-root"]').attr('content') +
                    'api/keywords.ol.jspx?letter=' +
                    $(this).data('select-results-letter').toLowerCase();
        //console.log('link: ' + link);
        $topicsTarget.load(link, function(res, status, xhr) {
            if (status === "error") {
                console.error( xhr.status + " : " + xhr.statusText);
            }
        });
    });

    /* Filter content type */
    $typeSelector.on('click', function(ev){
        ev.preventDefault();
        var type = $(this).data('select-results-type').toLowerCase();
        $body.toggleClass('show-overlay');
        $typeTarget.val(type);
        if (type === 'all') {
            $filterTarget.text('all');
        } else if (type === 'person') {
            $filterTarget.text('people');
        } else {
            $filterTarget.text(type + 's');
        }
        $('#form').submit();
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
        $.fn.oiplayer('start', 'oip_ea_id_tmf-player');
        $(this).fadeOut('fast');
    });

    $('.oiplayer').bind('oiplayerplay', function(ev, player) {
        //console.log("I started playing: " + $(player.el).attr('id'));
        $('a.__play').fadeOut('fast');
    });

})();
