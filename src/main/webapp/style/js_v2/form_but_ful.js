

 
function _formForwardButtons(){
		var tarGeheel = getRef('geheelVideo');
		var tarFragment = getRef('fragmentVideo');

	tarGeheel.onmouseover= function(){this.style.background = imgOn ;tarFragment.style.background = imgOff;}
	tarGeheel.onmouseout= function(){
		if (selected == 'geheelvideo'){
			this.style.background = imgOn }
		else{
		 tarFragment.style.background = imgOn; this.style.background = imgOff;}
		}
	tarGeheel.onclick= function(){
			selected = 'geheelvideo'; 
	_writeForwardMail();
		}
	tarFragment.onmouseover= function(){this.style.background = imgOn;tarGeheel.style.background = imgOff;}
	tarFragment.onmouseout= function(){

		if (selected == 'fragmentvideo'){
		this.style.background = imgOn}
		else{
		this.style.background = imgOff; tarGeheel.style.background = imgOn ; }
		}		
	tarFragment.onclick= function(){
			selected = 'fragmentvideo'; 
	_writeForwardMail();
		}
}

 
function _formEmbedButtons(){

		var tarGeheel = getRef('geheelVideoEmbed');
		var tarFragment = getRef('fragmentVideoEmbed');
		tarGeheel.onmouseover= function(){this.style.background = imgOn ;tarFragment.style.background = imgOff;}
	tarGeheel.onmouseout= function(){
		if (selectedEmbed == 'geheelvideoEmbed'){	
		this.style.background = imgOn;
		}else{
		 tarFragment.style.background = imgOn; this.style.background = imgOff;}
														}
	tarGeheel.onclick= function(){
		selectedEmbed = 'geheelvideoEmbed'; 
		_writeEmbed();
		}


	tarFragment.onmouseover= function(){this.style.background = imgOn;tarGeheel.style.background = imgOff;}
	tarFragment.onmouseout= function(){

		if (selectedEmbed == 'fragmentvideoEmbed'){
		this.style.background = imgOn}
		else{
		this.style.background = imgOff; tarGeheel.style.background = imgOn ; }	
									}
									
	tarFragment.onclick= function(){
		selectedEmbed = 'fragmentvideoEmbed'; 
		_writeEmbed();
									}
}
//   --------   Read prameters from locationbar  ----------
function gup( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}
//   ----------

function _writeForwardMail(){

	var targetArea = getRef('message').value;
		targetArea ='';
	var url = 'http://www.tacticalmediafiles.net/newsite/video.jsp?';
	var movieid = 'objectnumber='+gup('objectnumber');
//	alert(url+ movieid )
	if (selected == 'geheelvideo'){
		var urlString = url+ movieid ;	
	//	getRef('movieid').value = urlString ; // movvieid en fragmentsid worden apart in het formulier hidden veld opgenomen <input type="hidden" name="movieid" value="<mm:write referid="movieid"/>
		getRef('videofragmentsid').value = '' ;
	}else{ 
	if(selected == 'fragmentvideo'){
		if(currentAnker != null){
			var videofragmentsid = "&videofragmentsid="+ currentAnker;
			var fragName = "&fragName='"+eval(currentAnker)[0]+"'";
			var frag_in  = '&frag_in='+eval(currentAnker)[1];
			var frag_out  = '&frag_out='+eval(currentAnker)[2];
			var urlString = url+ movieid + videofragmentsid ; 
			getRef('videofragmentsid').value = currentAnker ;
//			getRef('movieid').value = '' ;
		}else{
		getRef('message').value ="Let op! er is geen fragment actief."   
		}
		}
	}

// alert(urlString);
}


function _sendForwardMail(){
var mail = checkEmail(getRef('ontvangeremailadres').value);
if( mail == true){
getRef('forwardform').submit();
getSty('bevestigverzendig').display = "block";
// getSty('bevestigverzendig').zIndex = 10;
setTimeout(function(){getSty('bevestigverzendig').display = "none";},1800);
// setTimeout(function(){videoObj.sendforwardform();},1600);
setTimeout(function(){videoObj.sendforwardform();},1600);
}else{alert('geef het e-mail adres.')}
}

function _writeEmbed(){
	var targetArea = getRef('embedtextarea').value;
		targetArea ='';
	var url = 'http://www.tacticalmediafiles.net/newsite/tmfembed.jsp?';
	var movieid = 'objectnumber='+gup('objectnumber');

	if (selectedEmbed == 'geheelvideoEmbed'){
		var urlString = '<iframe src="'+url+ movieid +'" id="frame1" scrolling=no width="430" height="398" frameborder="0"></iframe>';	
		getRef('embedtextarea').value = urlString ;
	}else{
		if(currentAnker != null){
			var videofragmentsid = "&videofragmentsid="+ currentAnker;
			var fragName = "&fragName='"+eval(currentAnker)[0]+"'";
			var frag_in  = '&frag_in='+eval(currentAnker)[1];
			var frag_out  = '&frag_out='+eval(currentAnker)[2];
			var urlString = '<iframe src="'+url+ movieid + videofragmentsid + fragName + frag_in + frag_out +'" id="frame1" scrolling=no width="430" height="398" frameborder="0"></iframe>';	
		
			getRef('embedtextarea').value = urlString ;
		}else{
		getRef('embedtextarea').value ="sorry, er is geen fragment geselecteerd."   
		}
	}
}

//     --------   select embedded code function
function selText(){
	getRef('embedtextarea').select()
}
//   ----------------      ------------------


function runMovie(){	
	var Ob=document.movie1;
//	runTime=Ob.GetTime();	
// if(Ob){alert("loaded")}else{ runMovie();};
//	if( Ob.GetTime() >= 350){
	if( Ob.GetPluginStatus() == "Complete"){
				var fragmenttrue = gup('videofragmentsid');
				if( fragmenttrue != ''){
//				getSty('playerboord').visibility = "visible";
//					getSty('playerboord').zIndex = 12;
//					getSty('playerboord').left = 285+'px';
					setTimeout(function(){getStatus()},80);					
					videoObj.getTimeOf();					
				    }else{
					videoObj.changesmall();
			
//						getSty('playerboord').zIndex = 2;
//						getSty('playerboord').left = -400+'px';
//						getSty('playerboord').visibility = "hidden";
	//					getSty('movie_titel').visibility = "visible";
		//				videoObj.getTimeOf();
		//				countTime();
						videoObj.counter();
				}				
		return false;
		}
		setTimeout('runMovie()',100);
}
	
function getStatus(){ 	//		  get the download status of the video	
	var anObj=document.movie1;	 
	anObj.Stop();

getSty('player').visibility = "hidden";
		var startTime = eval(gup('videofragmentsid'))[1];
		settijdTo(startTime);  // deze pakt fragment start time vanaf videofragmentsid
		var programmaTitel = getRef('movie_titel').innerHTML;
		getRef('playerboord').innerHTML ="<table width=450 height=335 border=0 cellpadding=0 cellspacing=0><tr>  <td width=12 height=12><img src='images/ul.jpg' width=12 height=12 border=0 /></td><td></td><td width=12><img src='images/ur.jpg' width=12 height=12 border=0></td></tr><tr><td></td>   <td valign=middle ><div align=center class='tekstg'><div class='heading2red' style='width:400px;'><b>" + eval(gup('videofragmentsid'))[0] +"</b></div><br><br>is een fragment van programma <br><br><div class='heading2red' style='width:300px;'>" + programmaTitel + "</div><br><br><a href='#' onclick='goOn();'><img src='images/button_play23.jpg' border=0> </a></div></td><td></td></tr><tr><td height='12'><img src='images/dl.jpg' width='12' height='12' border='0' /></td><td></td><td><img src='images/dr.jpg' width='12' height='12' border='0' /></td></tr>    </table>" ;
		getSty('playerboord').visibility = "visible";
		anObj.Stop();
}
//		-----------    goOn() is het play knopje wanneer player wordt geopend met het klikken op een link komen we eerst aan een fragment  ----------
function goOn(){
	var anObj=document.movie1;
//	getSty('L_dekker').zIndex =1;
	getSty('playerboord').zIndex = 2;
	getSty('playerboord').left = -400+'px';
	getSty('playerboord').visibility = "hidden";
	getSty('player').visibility = "visible";
	getSty('movie_titel').visibility = "visible";
setTimeout(function(){videoObj.changesmall();},500);
countTime();
}


function fadein(){
 	for(var i=0;i < arguments.length ; i++){
	changeOpac(100,arguments[i]);
	var anObj=document.movie1;
	}
}
function fadeout(){
 	for(var i=0;i < arguments.length ; i++){
	changeOpac(50,arguments[i]);
	var anObj=document.movie1;
	}
}
function hidLayer(){
 	for(var i=0;i < arguments.length ; i++){
	getSty(arguments[i]).visibility = "hidden";
	}
}
function showLayer(){
 
for(var i=0;i < arguments.length ; i++){
	getSty(arguments[i]).visibility = "visible";
	}
}


