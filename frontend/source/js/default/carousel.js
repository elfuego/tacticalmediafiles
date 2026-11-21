(function () {

    'use strict';

    const slider = document.querySelector('[data-slider-featured]');
    if (!slider) return;

    const items = Array.from(slider.querySelectorAll('.slider-item'));
    if (items.length < 2) return;

    let current = 0;
    let timer = null;

    const goTo = function (index) {
        items[current].classList.remove('is-active');
        dots[current].classList.remove('slick-active');
        current = (index + items.length) % items.length;
        items[current].classList.add('is-active');
        dots[current].classList.add('slick-active');
    };

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    const startAutoplay = () => {
        clearInterval(timer);
        timer = setInterval(next, 10000);
    };
    const stopAutoplay = () => clearInterval(timer);

    /* Prev/next arrow buttons */
    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'slick-prev';
    prevBtn.setAttribute('aria-label', 'Previous slide');

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'slick-next';
    nextBtn.setAttribute('aria-label', 'Next slide');

    /* Dot indicators */
    const dotsEl = document.createElement('ul');
    dotsEl.className = 'slick-dots';
    const dots = items.map(function (_, i) {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = String(i + 1);
        btn.addEventListener('click', function () {
            stopAutoplay();
            goTo(i);
            startAutoplay();
        });
        li.appendChild(btn);
        dotsEl.appendChild(li);
        return li;
    });

    slider.appendChild(prevBtn);
    slider.appendChild(nextBtn);
    slider.appendChild(dotsEl);

    prevBtn.addEventListener('click', function () { stopAutoplay(); prev(); startAutoplay(); });
    nextBtn.addEventListener('click', function () { stopAutoplay(); next(); startAutoplay(); });

    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    slider.addEventListener('focusin', stopAutoplay);
    slider.addEventListener('focusout', startAutoplay);

    goTo(0);
    startAutoplay();

})();
