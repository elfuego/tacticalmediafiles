(function () {
    
    'use strict';

    //console.log('Checking if jQuery works: your document is ' + $(document).height() + ' pixels in height.');
    console.log('Javascript?!');

    /**
     * Does something...
     */
    var $topicSelector = $('[data-select-topics]'),
    	$collectionSelector = $('[data-select-collections]'),
        $closeSelector = $('[data-select-results-close]'),
        $overlay = $('[data-select-results]'),
        $body = $('body');

        $closeSelector.on('click', function(ev){
            ev.preventDefault();
            console.log('close');
            $body.toggleClass('show-overlay');
        });
        console.log('$closeSelector: ' + $closeSelector.length);

    	$topicSelector.on('click', function(ev){
			ev.preventDefault();
    		console.log('topics');
            
            $body.toggleClass('show-overlay');
            // get relative path from meta-tag
            //var relativePath = $('meta[name="relative-path"]').attr('content'); 
            //$searchResults.load(relativePath + 'content/ajax-navigation-search-results.html');
            //$searchInput.focus();
    	});
    	
    	$collectionSelector.on('click', function(ev){
			ev.preventDefault();
    		console.log('collections');
    	});

})();
