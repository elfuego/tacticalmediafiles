(function () {
    
    'use strict';

    //console.log('Checking if jQuery works: your document is ' + $(document).height() + ' pixels in height.');
    //console.log('Javascript?!');

    /**
     * Does something...
     */
    var $topicSelector = $('[data-select-topics]'),
    	$collectionSelector = $('[data-select-collections]');

    	$topicSelector.on('click', function(ev){
			ev.preventDefault();
    		console.log('topics');
    	});
    	
    	$collectionSelector.on('click', function(ev){
			ev.preventDefault();
    		console.log('collections');
    	});

})();
