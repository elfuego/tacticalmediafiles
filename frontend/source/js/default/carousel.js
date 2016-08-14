(function () {

    'use strict';

    var $slickSlider = $('.slider'),
    	$featuredItems = $("[data-slider-featured]");
    
	if ($slickSlider.length) {
		
		console.log('slider!');

		/* 'Crude' way to resize slick slider (cause don't know how to handle flex and slick).
		 * If solution found delete this, see for example: 
		 *   https://github.com/kenwheeler/slick/issues/982
		 *
		 */
		/*function sizeSlick(){
		    var width = $(window).width();
			$('.slider').width(width);
		}   
	    $(window).resize(function() {
	    	sizeSlick();
		});
		sizeSlick();*/
	    
	    $featuredItems.slick({
	        slidesToShow: 1,
	        cssEase: 'ease-out',
	        speed: 350,
	        arrows: true,
	        dots: true,
	        accessibility: true,
	        autoplay: true,
	        autoplaySpeed: 5000,
	        pauseOnFocus: true,
	        pauseOnHover: true,
	        pauseOnDotsHover: true,
	        prevArrow: '<button type="button" class="slick-prev"></button>',
	        nextArrow: '<button type="button" class="slick-next"></button>',
	        mobileFirst: true
	    });
	}


})();
