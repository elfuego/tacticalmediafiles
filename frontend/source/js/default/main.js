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
        $viewTarget = $('[data-select-view-target]'),
        $switchTarget = $('[data-target-switch]'),
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
    $topicLetterSelector.on('click', function (ev) {
        ev.preventDefault();
        var link = $('meta[name="context-root"]').attr('content') +
            'api/keywords.ol.jspx?letter=' +
            $(this).data('select-results-letter').toLowerCase();

        $topicsTarget.load(link, function (res, status, xhr) {
            if (status === "error") {
                console.error(xhr.status + " : " + xhr.statusText);
            }
        });
    });

    /* Filter content type */
    $typeSelector.on('click', function (ev) {
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
        $body.removeClass('show-overlay');
    });

    $(document).keyup(function(ev) {
        if (ev.keyCode === 27) {
            $body.removeClass('show-overlay');
        }
    });

    /* List and grid (tiles) view */
    if ($viewTarget.length > 0) {

        var showList = function () {
            $body.removeClass('view-tiles').addClass('view-list');
            document.location = '#list';
        };
        var showTiles = function () {
            $body.removeClass('view-list').addClass('view-tiles');
            document.location = '#tiles';
        };

        var loc = document.location.href;
        var fragIndex = loc.indexOf('#');
        if (fragIndex > 0) {
            var fragment = loc.substring(fragIndex + 1);
            if (fragment === 'tiles' && $body.hasClass('view-list')) {
                showTiles();
            } else {
                showList();
            }
        }

        /* Toggle list between list and grid view. */
        $viewTarget.on('click', function (ev) {
            ev.preventDefault();
            var kind = $(this).data('select-view-target');
            if (kind === 'grid') {
                showTiles();
            } else {
                showList();
            }
        });
    }

    // error page animation
    if ($switchTarget.length) {
        var interval = setInterval(function(){
            var src = $switchTarget.attr('src');
            var num = 1;
            var mat = src.match(/\d+/g);
            if (mat.length > 0) {
                num = parseInt( mat[(mat.length - 1)] );
            }
            // styles/images/video-1.gif
            src = src.substr(0, src.indexOf('.gif') - 1);
            num = (num > 3 ? 1 : num + 1);  // just 4 images
            $switchTarget.attr('src', src + num + '.gif');
        }, 3333);
    }

    /* Video player stuff */
    $('body').oiplayer({
        controls: 'dark top',
        log: 'error',
        show: false
    });

    $('a.__play').click(function (ev) {
        ev.preventDefault();
        $.fn.oiplayer('start', 'oip_ea_id_tmf-player');
        $(this).fadeOut('fast');
    });

    $('.oiplayer').bind('oiplayerplay', function (ev, player) {
        $('a.__play').fadeOut('fast');
    });

})();
