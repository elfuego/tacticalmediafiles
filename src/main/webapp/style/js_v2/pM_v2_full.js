

function movieObj(){	
	
	this.width = "320";
	this.height = "240";
	this.size = 'small';
	
	
	this.formSize = 'big';

	this.selectedForm = '';
	this.formVisibBigXpos = offsetL+294;
	this.formVisibBigYpos = offsetT+450;
	this.formHidBigXpos =   offsetL+294;
	this.formHidBigYpos =  offsetT+730;
	
	this.hidSpos =  Array(offsetL+1050,offsetT+420);
	this.hidBpos =  Array(offsetL+284,offsetT+725);
	
	this.formVisibSmallXpos = offsetL+765;
	this.formVisibSmallYpos = offsetT+430;
	this.formHidSmallXpos =offsetL+1050;
	this.formHidSmallYpos =  offsetT+430; 
	
	
this.getTimeOf = getlengthOf;
this.counter = countTime;


// video methode
this.changesmall = changeSmall;
// this.changebig = changeBig;
// this.changefull = changeFull;
this.fullja = Fullja;
// this.fullnee = Fullnee;
// this.changesize =changeSize;
 this.replaceelement = replaceElement;

// forms methode
this.formhidplace =formHidPlace;
this.formvisibleplace = formVisiblePlace;
this.sendforwardform = sendForwardForm;
this.embeddedform = embeddedForm;
// this.moveelement = moveElement;
// this.formchangesize = formChangeSize;
this.playit = PlayIt;
this.stopit = StopIt;
}

function Fullja(){

}
function Fullnee(){
// alert('kjhgfd');
getSty('L_dekker').zIndex = 3;
getSty('fullscreenmessage').left = (-400)+'px';
getSty('fullscreenmessage').visibility= 'hidden';
				var anObj=document.movie1;
		//		anObj.Play();
// this.playit();

if(this.size =="small"){	
			this.changesmall();
		
				}else{
				
				this.changebig();

				}


	setTimeout(function(){anObj.Play();},1200);	
				getSty('L_dekker').zIndex = 1;
				anObj.Play();
				// videoObj.playit();
} 



function changeSize(size){
if(size == 's'){ this.changesmall()}else{ this.changebig()}; 
if(size == 'b'){ this.changebig()}

} 

function	changeSmall(){
			this.formSize = 'big';
			var anObj=document.movie1;
				this.stopit();
							//  change the place and the size of the FORMS when the video became small		
				anObj.width = 480; 
				anObj.height = 360;
				this.size = 'small';
				this.playit();	
						this.playit();					
}



function getlengthOf(){			//		change the timestamp to 00:00:00 Movtij
	var Ob=document.movie1;
	var Movtijd=Ob.GetDuration() 
		var	Sec =Math.floor(Movtijd/600);
		if (Sec >= 3600){
			h= Math.floor(Sec/3600);
			if (h<=9){h = "0"+h;}
		}else
			{ h= "00";}
		var Sec_h = Sec-(h*3600);
		var	minn= Math.floor(Sec_h/60);
		Sec = Sec - ((h*3600)+(minn*60));
		if (Sec <= 9){Sec ="0"+Sec;};

	//	 minn=((minn < 1) ? "00" : Math.floor(minn));
		if (minn <= 9){minn ="0"+minn;};
//		var tijd="["+h+":"+minn+":"+Sec+"]";
		var tijd=" "+h+":"+minn+":"+Sec+" ";
		document.getElementById('uren').innerHTML =tijd;
		// return tijd;
}


function gettijdOf(){ 
		Ob=document.movie1;
		var tijd=document.movie1.GetDuration();
		 document.getElementById("uren").innerHTML=tijd;
		 alert(tijd);
}

	var smilTime="";								//  -------  dit wordt voor fullscreen  changeFull() gebruikt
function countTime(){			//		change the timestamp to 00:00:00 	
var Secfull=0;
		var Ob=document.movie1;
		var	Movtijd=Ob.GetTime(); 
		var	Sec=Math.floor(Movtijd/600);
//		if(Sec < 10){Secfull=1 }else{ Secfull=Sec-4};
		var	minn= Math.floor(Sec/60);
//		var minfull = Math.floor(Secfull/60); 		//  -------  dit wordt voor fullscreen  changeFull() gebruikt
//			if (minfull <= 9){minfull ="0"+minfull;};  //  -------  dit wordt voor fullscreen  changeFull() gebruikt
			
//		if(Secfull >= 60 ){Secfull=Secfull-(minfull*60) };	
			
			
			Secfull=((Secfull < 10) ? ":0" : ":")+Secfull;
	var	h= "00:";
		
	//	minn=((minn < 1) ? "00" :minn);
		if(minn >= 60 && minn <= 119) {h = "01:";
									minn = Math.floor(minn - 60);
									Sec = Sec - 3600;
									}
		if(minn >= 120 && minn <= 179) {h = "02:";
									minn = Math.floor(minn - 120);
									Sec = Sec - 7200;
									}
		if(minn >= 180 && minn <= 239) {h = " 03:";
									minn = Math.floor(minn - 180);
									Sec = Sec - 10800;
									}							
		if (minn <= 9){minn ="0"+minn;};															
	//	if(minn < 10 && minn > 1) {minn= "0"+ Math.floor(minn)};
		var	Sec=Sec-(minn*60)
			Sec=((Sec < 10) ? ":0" : ":")+Sec		
		var	runtime= h + minn+Sec;
		
//		smilTime = minfull + Secfull;			//  -------  dit wordt voor fullscreen  changeFull() gebruikt mmm:sss
//		document.getElementById('boordcounter').innerHTML =runtime;
		passToOther(Movtijd); //	it use for interaction between the video slider and anchor links 
		clock = setTimeout('countTime()',1000);
}

function settijdTo(star){
		var Ob=document.movie1;
		videoObj.stopit();
	//a =eval(star);  alert("strat time = "+a+" en eind time = "+eind);
		Ob.SetTime(star); 
		videoObj.playit();
}



//  ------------ mouseover grootte or chenge size Buttonaction -------------
var d = 0;
var w = 0;
var t = 0;
var x = 64;
var q = 8;
var ex_actief = '';

function delayIt(){

		clearTimeout(w);
		d=setTimeout('closeIt()',800);	
}

function openIt(){
	var myReference  =document.getElementById('L_size');
	if (d != 0 ){ clearTimeout(d);}
	if(x>=104){ clearTimeout(w); return false;}
	 x=x+q;

	if( myReference.clip ) { myReference.clip.left = x;} else {
		if( myReference.style ) { myReference.style.clip = 'rect(0 '+ x +' 15 0)'; } 
		else {
			window.alert('Nothing works in this browser'); return; } 
			}
 w=setTimeout('openIt()',20);

}

function closeIt(){
	clearTimeout(d);
	clearTimeout(w);
	 x= 56;
	var myReference  =document.getElementById('L_size');
		if( myReference.clip ) { myReference.clip.left = x;} else {
		if( myReference.style ) { myReference.style.clip = 'rect(0 '+ x +' 15 0)'; } 
		else {
			window.alert('Nothing works in this browser'); return; } 
			}
}
// -----------      -------------



function inIt(){
	checkSize();

	videoObj = new movieObj();
	whichOne();
 	writeAnkers();
 	eventHandler();
//	_formForwardButtons();
//	_formEmbedButtons();
//	M_changeVisible('alleMovies');	//		tactical
 	setTimeout(function(){runMovie()},1200);

//	var x = window.screenX = 1 ;
//	var y = window.screenY = 1;
}

function PlayIt(){var anObj=document.movie1;anObj.Play();
			//		if(sendforwardStatus != 'hide' || formembedStatus != 'hide'){ 
			//		this.formvisibleplace(this.selectedForm);this.stopit();}else{anObj.Play();}	
}

function StopIt() {var anObj=document.movie1;anObj.Stop();}

function close_window() {window.close();}






