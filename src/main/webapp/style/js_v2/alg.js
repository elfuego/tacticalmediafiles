


// -----  array_v2_m.js  ----  variables  -----------

var in_Punt= Array();
var out_Punt= Array();
var length_Punt= Array();


// -- passToOther()
var	old_anker = null ;
var currentAnker = null;

// -----  form_beh.js


var sendforwardStatus = 'hide';
var formembedStatus = 'hide';


// ----  form_but_ful.js

var imgOn = 'url("images/video_fragment_777_aan.jpg")';
var imgOff = 'url("images/video_fragment_444.jpg")';
var selected = 'geheelvideo' ; // workings of the buttons 'Geheel video' or 'Fragment' is depend on this variable
var selectedEmbed = 'geheelvideoEmbed';


// -- runMovie()
var runTime;




var isDOM = (document.getElementById ? true : false);
var isIE4 = ((document.all && !isDOM) ? true : false);
var isNS4 = (document.layers ? true : false);
var isDyn = (isDOM || isIE4 || isNS4);
function getRef(id)

{
 if (isDOM) return document.getElementById(id);
 if (isIE4) return document.all[id];
 if (isNS4) return document.layers[id];
}
function getSty(id)

{

 // return (isNS4 ? getRef(id) : getRef(id).style);
 if(isNS4) {return getRef(id) }else{return  getRef(id).style}
// if(isNS4) {return document.getElementById(id) }else{return  document.getElementById(id).style}
}




// the active erea which the player used
var activeEreaW =1010;
var activeEreaH =820;
var	offsetL = 0;
var	offsetT = 0;
var halfWscreen = 0;
function checkSize(){

// self.resizeTo(screen.width,screen.height); //THIS LINE RESIZES THE WINDOW BASED ON CURRENT SCREEN DIMS
// self.resizeTo(1023,740); //THIS LINE RESIZES THE WINDOW BASED ON CURRENT SCREEN DIMS

	var marge = 50;
	var innerH = actualPageHeight();
		innerW = actualPageWidth();
	var screenW = screen.availWidth;	
	offsetL = Math.floor((innerW - activeEreaW)/2);
	offsetT = ((innerH <800) ? 0 : Math.floor((innerH - activeEreaH)/3));
	var mar = (screenW-1023)/2; 
// setTimeout(function(){self.moveTo(mar,0)},800);
 halfWscreen = innerW/2; 
//  getRef("boordsize").innerHTML = "innerW = "+innerW + "<br>innerH = " + innerH+ "<br><br>offsetL = " +offsetL+"<br>offsetT = "+offsetT;

 layout();
}



//  ---   function layout is used only for fullscreen, to keep all layers together

// var layersLayout = new Array("movie_titel","L_dekker","L_inleiding","movie_Bschrijving","player","controller","R_holder","sendforward","formembed","dekkerright","dekkerbottom","playerboord");

var layersLayout = new Array("sendforward","formembed");

	function layout(){
// alert(offsetT + " offsetL = " + offsetL);
		for (var i=0; i< layersLayout.length; i++){
//		
			var obj = document.getElementById(layersLayout[i]).style;
			
			var objleft =  parseInt(obj.left);
			var objtop =  parseInt(obj.top);		
		//		obj.left = objleft+offsetL;
		//		obj.top = objtop+offsetT;
				obj.left = objleft+ halfWscreen +'px';
				obj.top = objtop+'px';
//alert(layersLayout[i] + " objleft = " + obj.left + " objtop = " + objtop );
			
			}
	// getRef("boordsize").innerHTML="objleft= "+  objleft +"<br>objtop= "+ objtop ;

}


	function actualPageHeight() {
		if (window.innerHeight != null)
			return window.innerHeight;
		if (document.body.clientHeight != null)
			return document.body.clientHeight;
		return(null);
}
	function actualPageWidth() {
		if (window.innerWidth != null)
			return window.innerWidth;
		if (document.body.clientWidth != null)
			return document.body.clientWidth;
		return(null);
}


//change the opacity for different browsers
function changeOpac(opacity, id) {
	var object = document.getElementById(id).style; 
//	var object = document.getElementsByName(id).style; 
	object.opacity = (opacity / 100);
	object.MozOpacity = (opacity / 100);
	object.KhtmlOpacity = (opacity / 100);
//	object.filter = "alpha(opacity=" + opacity + ")";
}







