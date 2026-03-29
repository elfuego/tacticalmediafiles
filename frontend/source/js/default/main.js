import OIPlayer from '../lib/oiplayer.js';

(function () {

    'use strict';

    var overlaySelector     = document.querySelectorAll('[data-select-overlay]'),
        overlay             = document.querySelector('[data-select-results]'),
        overlayContainers   = overlay ? overlay.querySelectorAll('.container') : [],
        closeSelector       = document.querySelectorAll('[data-select-results-close]'),
        topicLetterSelector = document.querySelectorAll('[data-select-results-letter]'),
        topicsTarget        = document.querySelector('[data-select-results-topics-target]'),
        typeSelector        = document.querySelectorAll('[data-select-results-type]'),
        typeTarget          = document.querySelector('[data-select-results-type-target]'),
        filterTarget        = document.querySelector('[data-select-results-filter-target]'),
        viewTarget          = document.querySelectorAll('[data-select-view-target]'),
        switchTarget        = document.querySelector('[data-target-switch]'),
        filterForm          = document.getElementById('form'),
        contextRoot         = document.querySelector('meta[name="context-root"]') &&
                              document.querySelector('meta[name="context-root"]').getAttribute('content'),
        body                = document.body;


    overlaySelector.forEach(function (el) {
        el.addEventListener('click', function (ev) {
            ev.preventDefault();
            var over = this.dataset.selectOverlay;
            body.classList.toggle('show-overlay');
            overlayContainers.forEach(function (c) { c.style.display = 'none'; });
            overlay.querySelector('.' + over).style.display = '';
        });
    });

    topicLetterSelector.forEach(function (el) {
        el.addEventListener('click', function (ev) {
            ev.preventDefault();
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
            filterForm.submit();
        });
    });

    closeSelector.forEach(function (el) {
        el.addEventListener('click', function (ev) {
            ev.preventDefault();
            body.classList.remove('show-overlay');
        });
    });

    document.addEventListener('keyup', function (ev) {
        if (ev.key === 'Escape' && body.classList.contains('show-overlay')) {
            body.classList.remove('show-overlay');
        }
    });

    /* List / grid (tiles) view toggle */
    if (viewTarget.length > 0) {

        var setView = function (mode) {
            body.classList.remove(mode === 'list' ? 'view-tiles' : 'view-list');
            body.classList.add('view-' + mode);
            document.location = '#' + mode;
        };

        var loc = document.location.href;
        var fragIndex = loc.indexOf('#');
        if (fragIndex > 0) {
            var fragment = loc.substring(fragIndex + 1);
            setView(fragment === 'tiles' && body.classList.contains('view-list') ? 'tiles' : 'list');
        }

        viewTarget.forEach(function (el) {
            el.addEventListener('click', function (ev) {
                ev.preventDefault();
                setView(this.dataset.selectViewTarget === 'grid' ? 'tiles' : 'list');
            });
        });
    }

    // Cycle through 4 animated GIFs on the error page (images are named video-1.gif … video-4.gif)
    if (switchTarget) {
        setInterval(function () {
            var src = switchTarget.getAttribute('src');
            var mat = src.match(/\d+/g);
            var num = mat && mat.length > 0 ? parseInt(mat[mat.length - 1]) : 1;
            src = src.substring(0, src.indexOf('.gif') - 1);
            num = (num > 3 ? 1 : num + 1);
            switchTarget.setAttribute('src', src + num + '.gif');
        }, 3333);
    }

    /* Video player */
    var players = new Map();
    document.querySelectorAll('video, audio').forEach(function (el) {
        players.set(el, new OIPlayer(el, { controls: 'dark top' }));
    });

    var tmfMedia = document.querySelector('.oip_ea_id_tmf-player');
    var playBtn  = document.querySelector('a.__play');
    if (playBtn) {
        playBtn.addEventListener('click', function (ev) {
            ev.preventDefault();
            if (tmfMedia) players.get(tmfMedia).play();
            this.style.display = 'none';
        });

        window.addEventListener('oiplayerplay', function () {
            playBtn.style.display = 'none';
        });
    }

})();
