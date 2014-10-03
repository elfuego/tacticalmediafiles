/*<%@taglib uri="http://www.mmbase.org/mmbase-taglib-2.0" prefix="mm"
%><jsp:directive.page session="false" />
*///<mm:content type="text/javascript" expires="0" postprocessor="none"><mm:escape escape="javascript-compress">

/*
  Main javascript, uses jquery
  @author: Andre van Toly
  @version: 0.1
*/

var offset = 0;
$(document).ready(function() {
    
    /* Init oiplayer only when there is video or audio tag */
    if ($('video').length || $('audio').length) {
        /* $('.main-column').oiplayer({
            'server' : '<mm:url page="/" absolute="true" />',
            'jar' : '/oiplayer/plugins/cortado-ovt-stripped-0.6.0.jar',
            'flash' : '/oiplayer/plugins/flowplayer-3.2.7.swf',
            'controls' : 'top'
        }); */
    }
    
    if ($('#videothumbs').length || $('#homethumbs').length) {
        var loadVideoThumbs = function(move){
            offset = offset + parseInt(move);
            if (offset < 0) {
                var x = Math.floor(((Math.random() * 120) + 1) / 4);
                offset = x;
            }
            $('#videothumbs').load("${mm:link('/api/video-thumbs.jspx')}?offset=" + offset);
            $('#homethumbs').load("${mm:link('/api/home-thumbs.jspx')}?offset=" + offset);
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
