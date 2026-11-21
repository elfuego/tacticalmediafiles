import OIPlayer from '../lib/oiplayer';
import './carousel';

(function () {

    'use strict';

    const overlaySelector = document.querySelectorAll('[data-select-overlay]');
    const overlay = document.querySelector('[data-select-results]');
    const closeSelector = document.querySelectorAll('[data-select-results-close]');
    const topicLetterSelector = document.querySelectorAll('[data-select-results-letter]');
    const topicsTarget = document.querySelector('[data-select-results-topics-target]');
    const typeSelector = document.querySelectorAll('[data-select-results-type]');
    const typeTarget = document.querySelector('[data-select-results-type-target]');
    const filterTarget = document.querySelector('[data-select-results-filter-target]');
    const viewTarget = document.querySelectorAll('[data-select-view-target]');
    const switchTarget = document.querySelector('[data-target-switch]');
    const body = document.body;

    /* Open overlay: data attribute corresponds with classname of overlay */
    overlaySelector.forEach(function (el) {
        el.addEventListener('click', function (ev) {
            ev.preventDefault();
            if (!overlay) return;
            const over = el.dataset.selectOverlay;
            body.classList.toggle('show-overlay');
            overlay.querySelectorAll('.container').forEach(c => { c.style.display = 'none'; });
            const target = overlay.querySelector('.' + over);
            if (target) target.style.display = '';
        });
    });

    /* Select char in overlay and load its topics */
    topicLetterSelector.forEach(function (el) {
        el.addEventListener('click', function (ev) {
            ev.preventDefault();
            if (!topicsTarget) return;
            const contextRoot = document.querySelector('meta[name="context-root"]')?.getAttribute('content') || '';
            const link = contextRoot + 'api/keywords.ol.jspx?letter=' + el.dataset.selectResultsLetter.toLowerCase();
            fetch(link)
                .then(res => {
                    if (!res.ok) throw new Error(res.status + ' : ' + res.statusText);
                    return res.text();
                })
                .then(html => { topicsTarget.innerHTML = html; })
                .catch(err => console.error(err));
        });
    });

    /* Filter content type */
    typeSelector.forEach(function (el) {
        el.addEventListener('click', function (ev) {
            ev.preventDefault();
            const type = el.dataset.selectResultsType.toLowerCase();
            body.classList.remove('show-overlay');
            if (typeTarget) typeTarget.value = type;
            if (filterTarget) {
                if (type === 'all') {
                    filterTarget.textContent = 'all';
                } else if (type === 'person') {
                    filterTarget.textContent = 'people';
                } else {
                    filterTarget.textContent = type + 's';
                }
            }
            const form = document.querySelector('#form');
            if (form) form.submit();
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

        const showList = function () {
            body.classList.remove('view-tiles');
            body.classList.add('view-list');
            document.location = '#list';
        };
        const showTiles = function () {
            body.classList.remove('view-list');
            body.classList.add('view-tiles');
            document.location = '#tiles';
        };

        const loc = document.location.href;
        const fragIndex = loc.indexOf('#');
        if (fragIndex > 0) {
            const fragment = loc.substring(fragIndex + 1);
            if (fragment === 'tiles' && body.classList.contains('view-list')) {
                showTiles();
            } else {
                showList();
            }
        }

        viewTarget.forEach(function (el) {
            el.addEventListener('click', function (ev) {
                ev.preventDefault();
                const kind = el.dataset.selectViewTarget;
                if (kind === 'grid') {
                    showTiles();
                } else {
                    showList();
                }
            });
        });
    }

    /* Error page animation */
    if (switchTarget) {
        setInterval(function () {
            let src = switchTarget.getAttribute('src');
            let num = 1;
            const mat = src.match(/\d+/g);
            if (mat && mat.length > 0) {
                num = parseInt(mat[mat.length - 1]);
            }
            src = src.substring(0, src.indexOf('.gif') - 1);
            num = (num > 3 ? 1 : num + 1);
            switchTarget.setAttribute('src', src + num + '.gif');
        }, 3333);
    }

    /* Video player */
    const players = new Map();
    document.querySelectorAll('video, audio').forEach(function (el) {
        players.set(el, new OIPlayer(el, { controls: 'dark top' }));
    });

    const playBtn = document.querySelector('a.__play');
    if (playBtn) {
        playBtn.addEventListener('click', function (ev) {
            ev.preventDefault();
            const videoEl = document.querySelector('video, audio');
            if (videoEl) {
                players.get(videoEl).play();
            }
            playBtn.style.display = 'none';
        });
        document.querySelectorAll('video, audio').forEach(function (el) {
            el.addEventListener('play', function () {
                playBtn.style.display = 'none';
            });
        });
    }
})();
