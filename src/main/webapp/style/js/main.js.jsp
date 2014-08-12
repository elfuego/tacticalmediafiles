/*<%@taglib uri="http://www.mmbase.org/mmbase-taglib-2.0" prefix="mm"
%><jsp:directive.page session="false" />
*///<mm:content type="text/javascript" 
                expires="0" 
                postprocessor="none" 
                language="${param.locale}"><os:cache time="3600"><mm:escape escape="javascript-compress">

/*
  Main javascript, uses jquery
  @author: Andre van Toly
  @version: 0.1
*/

$(document).ready(function() {
    
    /* Init oiplayer only when there is video or audio tag */
    if ($('video').length || $('audio').length) {
        $('.main-column').oiplayer({
            'server' : '<mm:url page="/" absolute="true" />',
            'jar' : '/oiplayer/plugins/cortado-ovt-stripped-0.6.0.jar',
            'flash' : '/oiplayer/plugins/flowplayer-3.2.7.swf',
            'controls' : 'top'
        });
        initPlayStats();
    }
    
});
//</mm:escape></mm:content>

