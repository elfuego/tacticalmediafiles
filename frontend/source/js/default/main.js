import OIPlayer from '../lib/oiplayer.js';

(function () {

    'use strict';

    /**
     * Data selectors and targets.
     */
    var overlaySelector = document.querySelectorAll('[data-select-overlay]'),
        overlay         = document.querySelector('[data-select-results]'),
        closeSelector   = document.querySelectorAll('[data-select-results-close]'),
        topicLetterSelector = document.querySelectorAll('[data-select-results-letter]'),
        topicsTarget    = document.querySelector('[data-select-results-topics-target]'),
        typeSelector    = document.querySelectorAll('[data-select-results-type]'),
        typeTarget      = document.querySelector('[data-select-results-type-target]'),
        filterTarget    = document.querySelector('[data-select-results-filter-target]'),
        viewTarget      = document.querySelectorAll('[data-select-view-target]'),
        switchTarget    = document.querySelector('[data-target-switch]'),
        body            = document.body;


    /* Open overlay: data attribute corresponds with classname of overlay */
    overlaySelector.forEach(function (el) {
        el.addEventListener('click', function (ev) {
            ev.preventDefault();

            var over = this.dataset.selectOverlay;
            body.classList.toggle('show-overlay');
            overlay.querySelectorAll('.container').forEach(function (c) { c.style.display = 'none'; });
            overlay.querySelector('.' + over).style.display = '';
        });
    });

    /* Select char in overlay and load its topics */
    topicLetterSelector.forEach(function (el) {
        el.addEventListener('click', function (ev) {
            ev.preventDefault();
            var contextRoot = document.querySelector('meta[name="context-root"]').getAttribute('content');
            var link = contextRoot + 'api/keywords.ol.jspx?letter=' +
                this.dataset.selectResultsLetter.toLowerCase();

            fetch(link)
                .then(function (r) {
                    if (!r.ok) throw new Error(r.status + ' : ' + r.statusText);
                    return r.text();
                })
                .then(function (html) { topicsTarget.innerHTML = html; })
                .catch(function (err) { console.error(err.message); });
        });
    });

    /* Filter content type */
    typeSelector.forEach(function (el) {
        el.addEventListener('click', function (ev) {
            ev.preventDefault();
            var type = this.dataset.selectResultsType.toLowerCase();
            body.classList.toggle('show-overlay');
            typeTarget.value = type;
            if (type === 'all') {
                filterTarget.textContent = 'all';
            } else if (type === 'person') {
                filterTarget.textContent = 'people';
            } else {
                filterTarget.textContent = type + 's';
            }
            document.getElementById('form').submit();
        });
    });

    /* Close overlay */
    closeSelector.forEach(function (el) {
        el.addEventListener('click', function (ev) {
            ev.preventDefault();
            body.classList.remove('show-overlay');
        });
    });

    document.addEventListener('keyup', function (ev) {
        if (ev.key === 'Escape') {
            body.classList.remove('show-overlay');
        }
    });

    /* List and grid (tiles) view */
    if (viewTarget.length > 0) {

        var showList = function () {
            body.classList.remove('view-tiles');
            body.classList.add('view-list');
            document.location = '#list';
        };
        var showTiles = function () {
            body.classList.remove('view-list');
            body.classList.add('view-tiles');
            document.location = '#tiles';
        };

        var loc = document.location.href;
        var fragIndex = loc.indexOf('#');
        if (fragIndex > 0) {
            var fragment = loc.substring(fragIndex + 1);
            if (fragment === 'tiles' && body.classList.contains('view-list')) {
                showTiles();
            } else {
                showList();
            }
        }

        /* Toggle list between list and grid view. */
        viewTarget.forEach(function (el) {
            el.addEventListener('click', function (ev) {
                ev.preventDefault();
                if (this.dataset.selectViewTarget === 'grid') {
                    showTiles();
                } else {
                    showList();
                }
            });
        });
    }

    // error page animation
    if (switchTarget) {
        setInterval(function () {
            var src = switchTarget.getAttribute('src');
            var num = 1;
            var mat = src.match(/\d+/g);
            if (mat && mat.length > 0) {
                num = parseInt(mat[mat.length - 1]);
            }
            // styles/images/video-1.gif
            src = src.substring(0, src.indexOf('.gif') - 1);
            num = (num > 3 ? 1 : num + 1);  // just 4 images
            switchTarget.setAttribute('src', src + num + '.gif');
        }, 3333);
    }

    /* Video player */
    var players = new Map();
    document.querySelectorAll('video, audio').forEach(function (el) {
        players.set(el, new OIPlayer(el, { controls: 'dark top' }));
    });

    var playBtn = document.querySelector('a.__play');
    if (playBtn) {
        playBtn.addEventListener('click', function (ev) {
            ev.preventDefault();
            var tmfMedia = document.querySelector('.oip_ea_id_tmf-player');
            if (tmfMedia) players.get(tmfMedia).play();
            this.style.display = 'none';
        });

        window.addEventListener('oiplayerplay', function () {
            playBtn.style.display = 'none';
        });
    }

})();
