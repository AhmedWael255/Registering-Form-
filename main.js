'use strict';

function itWorks(){
	var name = document.getElementsByName('name')[0].value;
	var email=document.getElementsByName('email')[0].value;
	var collage=document.getElementsByName('collage')[0].value;
	var phone=document.getElementsByName('phone')[0].value;
	var university=document.getElementsByName('university')[0].value;

	var param="name="+name+"&email="+email+"&phone="+phone+"&university="+university+"&collage="+collage;
	var xmlhttp;
	if(window.XMLHttpRequest){
		xmlhttp=new XMLHttpRequest();
	}
	else if (window.ActiveXObject) { 
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function(){
		if(this.readyState==4&&this.status==200){
			endCheck(this.responseText);
		}
	};
	xmlhttp.open("POST","server.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(param);

	return false;
}

function hideResult(){
	document.getElementById('result_con').style.display = "none";
}

function showResult(text){
	document.getElementById('result_con').style.display = "block";
	document.getElementById('result').innerHTML = text;
}

function endCheck(result){
	var all = document.getElementsByClassName('error-msg-img');
	for(var i=0; i<all.length; ++i){
		all[i].style.display = "none";
	}

	if(result == "success"){
		showResult("Thank You.");
	}
	else if(result == "fail"){
		showResult("Some thing went wrong!\n please try again.");
	}
	else{
		for(var i=0; i<result.length; ++i){
			document.getElementById('error-message-' + result[i]).style.display = "inline";
		}
	}
	return false;
}
