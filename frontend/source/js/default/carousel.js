(function () {

    'use strict';

    var $slickSlider = $('.slider'),
        $featuredItems = $("[data-slider-featured]");

    if ($slickSlider.length) {

        $featuredItems.slick({
            slidesToShow: 1,
            cssEase: 'ease-out',
            speed: 350,
            arrows: true,
            dots: true,
            accessibility: true,
            autoplay: true,
            autoplaySpeed: 10000,
            pauseOnFocus: true,
            pauseOnHover: true,
            pauseOnDotsHover: true,
            prevArrow: '<button type="button" class="slick-prev"></button>',
            nextArrow: '<button type="button" class="slick-next"></button>',
            mobileFirst: true
        });
    }

})();
