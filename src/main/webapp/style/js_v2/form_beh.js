

function sendForwardForm(){
		this.stopit();		
		this.formhidplace('formembed'); formembedStatus = 'hide';			
		this.selectedForm ='sendforward';
//		selected = 'fragmentvideo' ;
		if(sendforwardStatus == 'hide'){sendforwardStatus = 'show'; this.formvisibleplace('sendforward');			
		    	document.getElementById('imgForward').src='images/' + doorstuurImg2 ;  
				document.getElementById('imgEmbed').src='images/' + embedImg1 ;
//				fadeout('R_holder'); if(this.size == "small"){fadeout('L_inleiding');}
			_writeForwardMail(); 
		}
		else{sendforwardStatus = 'hide';this.formhidplace('sendforward');
		document.getElementById('imgForward').src='images/' + doorstuurImg1 ;
		document.getElementById('message').value ='your message here'; document.getElementById('ontvangeremailadres').value ='e-mail adres receiver';
		document.getElementById('verzendernaam').value ='your name';
		document.getElementById('bevestigverzendig').style.zIndex = 2;

		this.playit();	
		
		}
}

function embeddedForm(){
		this.stopit();
		this.formhidplace('sendforward'); sendforwardStatus = 'hide' ;			
		this.selectedForm ='formembed';
//		selectedEmbed = 'fragmentvideoEmbed'; // select already the fragment of video  Embed

	var anObj=document.movie1;
				
							//  change the place and the size of the FORMS when the video became small		
	//			anObj.width = 380; 
		//		anObj.height = 260;

		if( formembedStatus == 'hide'){formembedStatus = 'show'; this.formvisibleplace('formembed');_writeEmbed();
			zz=	document.getElementById('imgEmbed').src='images/' + embedImg2 ;document.getElementById('imgForward').src='images/' + doorstuurImg1 ;
		
				
		}
		else{formembedStatus = 'hide'; this.formhidplace('formembed');
			document.getElementById('imgEmbed').src='images/' + embedImg1 ;
			this.playit();

		}		
}

function formVisiblePlace(eleID){

		if (this.formSize == 'small' ){
		//	moveElement(eleID, this.formVisibSmallXpos, this.formVisibSmallYpos, 10);
//	getSty(eleID).visibility = "visible";
	getSty(eleID).display = "block";
		}			
	if (this.formSize == 'big' ){
		//	moveElement(eleID, this.formVisibBigXpos, this.formVisibBigYpos, 10);
//	getSty(eleID).visibility = "visible";
	getSty(eleID).display = "block";
		}
}

function formHidPlace(eleID){		
		if (this.formSize == 'small' ){
		// moveElement(eleID, this.formHidSmallXpos, this.formHidSmallYpos, 10);
//	getSty(eleID).visibility = "hidden";
	getSty(eleID).display = "none";
		}			
		if (this.formSize == 'big' ){
		//moveElement(eleID, this.formHidBigXpos, this.formHidBigYpos, 10);
//	getSty(eleID).visibility = "hidden";
	getSty(eleID).display = "none";
		}
}

// var formsSizeSmall = Array(senW,senH,senbgW,senvideoL,senvideoT,sensubL,sensubT,textereaClass)
   var formsSizebig = Array(450,160,450,6,215,226,23,387,28,'form_textareabig');
 var formsSizeSmall = Array(242,215,242,10,221,10,73,174,78,'form_textareasmall');


function formChangeSize_____(){

		if(this.formSize == 'big'){
		getSty('sendforward').width =formsSizebig[0] +'px';
		getSty('sendforward').height =formsSizebig[1]+'px';		
		getSty('forwardbgtitel').width =formsSizebig[2] +'px';		
		getSty('forwardtekstvelden').left =formsSizebig[3] +'px';
		getSty('forwardtekstvelden').width =formsSizebig[4] +'px';		
		getSty('forwardvideo').left =formsSizebig[5] +'px';
		getSty('forwardvideo').top =formsSizebig[6] +'px';
		getRef('message').className ='form_textareabig'; 	
		getSty('forwardsubmit').left =formsSizebig[7] +'px';
		getSty('forwardsubmit').top =formsSizebig[8] +'px';		
		getSty('formembed').width =450 +'px';
		getSty('formembed').height =135 +'px';
		getSty('embeddedbgtitel').width =450 +'px';
		getSty('embeddedvideo').left =288 +'px';
		getSty('embeddedvideo').top =22 +'px';		
		getRef('embedtextarea').className ='embedtextareabig'; 		
		getSty('embeddedsubmit').width =156 +'px';
		getSty('embeddedsubmit').left =288 +'px';
		getSty('embeddedsubmit').top =78 +'px';		
		}
		else{	
		getSty('sendforward').width =formsSizeSmall[0] +'px';
		getSty('sendforward').height =formsSizeSmall[1]+'px';		
		getSty('forwardbgtitel').width =formsSizeSmall[2] +'px';		
		getSty('forwardtekstvelden').left =formsSizeSmall[3] +'px';
		getSty('forwardtekstvelden').width =formsSizeSmall[4] +'px';		
		getSty('forwardvideo').left =formsSizeSmall[5] +'px';
		getSty('forwardvideo').top =formsSizeSmall[6] +'px';
		getRef('message').className ='form_textareasmall'; 
		getSty('forwardsubmit').left =formsSizeSmall[7] +'px';
		getSty('forwardsubmit').top =formsSizeSmall[8] +'px';		
		getSty('formembed').width =242 +'px';
		getSty('formembed').height =191 +'px';
		getSty('embeddedbgtitel').width =242 +'px';
		getSty('embeddedvideo').left =10 +'px';
		getSty('embeddedvideo').top =23 +'px';		
		getRef('embedtextarea').className ='embedtextareasmall'; 		
		getSty('embeddedsubmit').width =59 +'px';
		getSty('embeddedsubmit').height =46 +'px';
		getSty('embeddedsubmit').left =173 +'px';
		getSty('embeddedsubmit').top =28 +'px';
		
		}
		
}

// put the forms in the hidden position ...  triggered from change size buttons
function replaceElement(){
	var forms = Array('sendforward','formembed');

	for(var i=0 ; i<forms.length;i++){
		if(this.formSize == 'small'){
			getSty(forms[i]).left =this.hidSpos[0];
			getSty(forms[i]).top =this.hidSpos[1];
			}else{
			getSty(forms[i]).left =this.hidBpos[0];
			getSty(forms[i]).top =this.hidBpos[1];
		}

// getRef("boordsize").innerHTML="top of small form = "+ this.hidSpos[1] ;
	}
}

function checkEmail(email) {

var str = new String(email);
var isOK = true;
rExp = /[!\"£$%\^&*()-+=<>,\'#?\\|Â`\/\[\]]/
if( rExp.test(str) )
isOK = false;
if( str.indexOf('.') == -1 || str.indexOf('@') == -1 )
isOK = false;
if( str.slice(str.lastIndexOf('.')+1,str.length).length < 2 )
isOK = false;
if( str.slice(0,str.indexOf('@')).length < 1 )
isOK = false;
if( str.slice(str.indexOf('@')+1,str.lastIndexOf('.')).length < 1 )
isOK = false;

// if( !isOK ) alert( "Invalid email address" );

return isOK;
}