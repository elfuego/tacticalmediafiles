

function whichOne(){ 	//	from the slider to the list of spekers or subjects 
 if(!ankers)return false;
	for (var i=0; i< ankers.length;i++){	
	in_Punt[i] = eval(ankers[i])[1];
	out_Punt[i] = eval(ankers[i])[2];
	length_Punt[i] = (out_Punt[i] - in_Punt[i]);
	}
}

function fragDuration(Movtijd){			//		change the timestamp of the fragments to 00:00:00 	
		var	Sec = Movtijd/600;
		Sec=Math.floor(Sec)
		var	minn= Math.floor(Sec/60)
		h= Sec/3600
		if(minn < -1){ minn="00"+ Math.floor(minn)}
		else{				
			if(minn < 10){ minn="0"+ Math.floor(minn)}
			else{ Math.floor(minn)}
			}		
		Sec=Sec-(minn*60)
		Sec=((Sec < 10) ? ":0" : ":")+Sec		
		tijd="["+minn+Sec+"]";

		return tijd;
}

		
function passToOther(cur_Time){ //		the time-controller from the video to change the color of anchor links 
		for (var i=0; i< ankers.length; i++){
			if (cur_Time >= in_Punt[i] && cur_Time <= out_Punt[i]){
				currentAnker = ankers[i];
				if (old_anker != ankers[i]){	
				changeClass('list_Deelnemers');
				var bb = i.toString();
				var hh= document.getElementById(bb);	
				writeLinksAnkers(ankers[i]);   //	--    voor tacticalmedia
  				old_anker = ankers[i];
				hh.className = "linkr";
    			}	
			}
		}
}
						
function writeAnkers(){ 	//			Read and write a list of deelnemers
	var container = document.getElementById("list_Deelnemers");

		for (var i=ankers.length-1; i >= 0;i--){
			var x = container.insertRow(0);
			var y = x.insertCell(0);
			var z = x.insertCell(1);
				y.className="liout";
				y.vAlign="top";
				z.vAlign="top";
			var splits = " | ";
			var arr = eval (ankers[i]);

		y.innerHTML =fragDuration(length_Punt[i]);
		z.innerHTML ='<a href="#" id="' + i + '" class="linkg">' + eval(ankers[i])[0] + ' </a>';					
 		eventHandler();	
		}	
}

function eventHandler(){
	var container = document.getElementById("list_Deelnemers");	//	ul id's 
	var	oA = container.getElementsByTagName("a");	
		for (var i=0; i< oA.length;i++){	
			oA[i].onclick= function(){
					changeClass('list_Deelnemers');
					var anker =eval(this.getAttribute('id'));
					this.className = "linkr";
					settijdTo(eval(ankers[anker.toString()])[1]);
					var alLinks = "alleLinks";
		setTimeout("M_changeVisible('"+alLinks+"')",300);
					return false;
									}
			oA[i].onmouseover= function(){
					var anker =eval(this.getAttribute('id'));
					this.className = "linkr";
									}						
			oA[i].onmouseout= function(){
					var anker =eval(this.getAttribute('id'));
					if(currentAnker != "ank"+(anker+1)){this.className = "linkg"};					
									}										
				} 
}

function changeClass(tar){   //  ------    change de class van de active link-fragment
	var container = document.getElementById(tar);
	var oA = container.getElementsByTagName("a");
		for (var i=0; i< oA.length;i++){
		oA[i].className = "linkg";
		}
}

function writeLinksAnkers(ank){	//	write the related links to spekers or subjects in links box

	var ankerName = eval(ank);
	var contain = document.getElementById('linkIntern');
	contain.innerHTML = "";
	var str = "";
		
//   ---------      persoon   --------------		
	if (ankerName[3] != ""){
	str +="<h5>person</h5>";
	var persoons=ankerName[3].split(",");
	var part_num=0;
		while (part_num < persoons.length) { 
			for(var a=0; a <1;a++){
				if(part_num == 0 || part_num==2 || part_num == 4){
					var pers =  persoons[part_num] ;	
					var ll =persoons[part_num+1];
				str +=  "<a href='#' onclick =\"InsertedLink('" + ll + "','person'); return false;\">" + persoons[part_num] +  "</a><br>"	;
				}
			}
		part_num+=1;
		}
	}

//   ---------      artikel   --------------

	if (ankerName[4] != ""){
		str +="<h5>article</h5>";

		var artikel=ankerName[4].split(",");

		var part_num=0;
			while (part_num < artikel.length) {
 
				for(var a=0; a <1;a++){
						if(part_num == 0 || part_num==2 || part_num == 4){
							var pers =  artikel[part_num] ;	

							var bb =artikel[part_num+1];
						str +=  "<a href='#' onclick =\"InsertedLink('" + bb + "','article'); return false;\">" + artikel[part_num] +  "</a><br>"	;
						}
				}
			part_num+=1;
			}
	}

//   ---------      link   --------------

	if (ankerName[5] != ""){
		str +="<h5>extern</h5>";
		var link=ankerName[5].split(",");
		var part_num=0;
			while (part_num < link.length) { 
				for(var a=0; a <1;a++){
						if(part_num == 0 || part_num==2 || part_num == 4){
							var pers =  link[part_num] ;	
							var cc =link[part_num+1];
						str +=  "<a href='#' onclick =\"InsertedLink('" + cc + "','extern'); return false;\">" + link[part_num] +  "</a><br>"	;
// alert(typeof persoons[part_num+1]);   value="'+mov+'">	
						}
				}
			part_num+=1;
			}
			contain.innerHTML=str + "<br>";
	}
	else{if(str == ""){  str ="<span class='linkr'>geen links bij dit fragment.</span> "  };  contain.innerHTML=str + "<br>";    }

}

function InsertedLink(L,name){

	var obj = document.getElementById('player').style;
	var objleft =  parseInt(obj.left);
	var objtop =  parseInt(obj.top);
	var interneUrl=L;
	var newVenster = name;
	newVnster=window.open(interneUrl,name,'toolbar=no,location=no,menubar=no,scrollbars=yes,resizable=yes,width=970,height=600,top='+objtop+',left='+objleft+''); 
	setTimeout('newVnster.focus()',500);return false;
}


function M_changeVisible(ob) {	//	take care of behavior of link and movie list groep
	var alleLinks = document.getElementById("alleLinks").style.display ="none";	
	var obj = document.getElementById(ob).style.display ="block";

}




