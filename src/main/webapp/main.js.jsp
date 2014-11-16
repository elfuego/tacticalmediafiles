/*<%@taglib uri="http://www.mmbase.org/mmbase-taglib-2.0" prefix="mm"
%><jsp:directive.page session="false" />
*///<mm:content type="text/javascript" expires="1800" postprocessor="none"><mm:escape escape="javascript-compress">

/*
  Main javascript, uses jquery
  @author: Andre van Toly
  @version: 0.1
*/
$(document).ready(function() {
    
    // empty search box in top navigation when cursor enters
    $('#SearchNav').focus(function(ev){
    	if ($('#SearchNav').val() == 'SEARCH') {
			$('#SearchNav').val('');
    	}
    });
    
    if ($('#searchbuttongo').length) {	// only on home?
		$('#searchbuttongo').click(function(){
			$('#searchform').submit();
		});
	}
    
    /* Init oiplayer only when there is video or audio tag */
    if ($('video').length || $('audio').length) {
        $('.VideoPlayer').oiplayer({
            'server' : '<mm:url page="/" absolute="true" />',
            'jar' : '/oiplayer/plugins/cortado-ovt-stripped-0.6.0.jar',
            'flash' : '/oiplayer/plugins/flowplayer-3.2.7.swf',
            'controls' : 'top'
        });
    }
    
    if ($('#videothumbs').length || $('#homethumbs').length) {
        var loadVideoThumbs = function(move){
            var offset = parseInt($('#thumb1').attr('data-offset'));
            offset = offset + parseInt(-move);
            if (offset < 0) {
                var x = Math.floor(((Math.random() * 120) + 1) / 4);
                offset = x;
            }
            // animate
            $( "#videothumbscontainer" ).animate({
                    left: (move < 0 ? "-=300" : "+=300")
                }, 1000, function() {
                    // Animation complete.
                    console.log("let's load");
                    $('#videothumbs').load("${mm:link('/api/video-thumbs.jspx')}?offset=" + offset);
                });
            $( "#homethumbscontainer" ).animate({
                    left: (move < 0 ? "-=240" : "+=240")
                }, 1000, function() {
                    // Animation complete.
                    console.log("let's load");
                    $('#homethumbs').load("${mm:link('/api/home-thumbs.jspx')}?offset=" + offset);
                });
        };
    
        $('.moveprev').click(function(ev){
            ev.preventDefault();
            loadVideoThumbs('-2');
        });
        $('.movenext').click(function(ev){
            ev.preventDefault();
            loadVideoThumbs('2');
        });
    }
    
});
//</mm:escape></mm:content>
