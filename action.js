'use strict';

var currentSlide = 0;
var nextSlide;
var numberOfSlides = document.getElementsByClassName('slide').length;
var animationSpeed = 2000;
var slidesContainer = document.getElementsByClassName('slides')[0].children;
var arabic = /^[\u0621-\u06FF 1-9]*$/;
var interval;

function continue1(){
	interval = setInterval(function() {
		var old = slidesContainer[currentSlide];
		nextSlide = currentSlide+1;
		if(nextSlide == numberOfSlides){
			nextSlide = 0;
		}
		currentSlide = nextSlide;
		var New = slidesContainer[nextSlide];
		getReady(old,New);
		$(New).css({'margin-left': '-100%'});
		$(New).animate({'margin-left': '0%'}, animationSpeed);
	}, 7000);
}

function getReady(old, New){
	$('.slide').css('z-index', -2);
	old.style.zIndex = -1;
	New.style.zIndex = 0;
}
$(document).ready(function(){

	//click the register link
	$('#register').click(function(e){
		e.preventDefault();
		$('html,body').animate({scrollTop: $(this.hash).offset().top} ,1000);   //this.hash return the href value for the (this) element
	});

	//animation for slides	
});


function getNextSlide(){
	clearInterval(interval);
	var old = slidesContainer[currentSlide];
	nextSlide = currentSlide+1;
	if(nextSlide == numberOfSlides){
		nextSlide = 0;
	}
	currentSlide = nextSlide;

	var New = slidesContainer[nextSlide];
	getReady(old,New);
	$(New).css({'margin-left': '100%'});
	$(New).animate({'margin-left': '0%'}, animationSpeed);
	continue1();
}


function getPrevSlide(){
	clearInterval(interval);
	var old = slidesContainer[currentSlide];
	nextSlide = currentSlide-1;
	if(nextSlide == -1){
		nextSlide = numberOfSlides-1;
	}
	currentSlide = nextSlide;
	
	var New = slidesContainer[nextSlide];
	getReady(old,New);
	$(New).css({'margin-left': '-100%'});
	$(New).animate({'margin-left': '0%'}, animationSpeed);
	continue1();
}



function scrollToTop(){
	$('html,body').animate({scrollTop: 0} ,1000);
}

//validation for name
function validateName(){
	var arabic = /^[\u0621-\u06FF ]{1,}$/;
	var english = /^[a-zA-Z ]{1,}$/;

	var name = $('input[name="name"]').val();
	if(arabic.test(name) || english.test(name)){
		$('#error-message-1').css("display" , "none");
		return true;
	}
	else{
		$('#error-message-1').css("display" , "inline");
		return false;
	}
}

function validateNumber(){
	var phoneExp = /^01[0-9]{9}$/;
	var phone = $('input[name="phone"]').val();
	if(phoneExp.test(phone)){
		$('#error-message-2').css("display" , "none");
		return true;
	}
	else{
		$('#error-message-2').css("display" , "inline");
		return false;
	}
}

function validateEmail(){
	var mailExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	var email = $('input[name="email"]').val();
	if(mailExp.test(email)){
		$('#error-message-3').css("display","none");	
	 	return true;
	} else{
		$('#error-message-3').css("display", "inline");	
	 	return false;
	}
}

function validateUni(){
	var arabic = /^[\u0621-\u06FF 1-9]{1,}$/;
	var english = /^[a-zA-Z 1-9]{1,}$/;

	var uni = $('input[name="university"]').val();
	
	if(arabic.test(uni) || english.test(uni)){
		$('#error-message-4').css("display" , "none");
		return true;
	}

	else{
		$('#error-message-4').css("display" , "inline");
		return false;
	}
}

function validateFaculty(){
	var arabic = /^[\u0621-\u06FF 1-9]{1,}$/;
	var english = /^[a-zA-Z 1-9]{1,}$/;

	var faculty = $('input[name="collage"]').val();
	
	if(arabic.test(faculty) || english.test(faculty)){
		$('#error-message-5').css("display" , "none");
		return true;
	}

	else{
		$('#error-message-5').css("display" , "inline");
		return false;
	}
}


function validateForm(){
	if(!validateName() || !validateNumber() || !validateEmail() || !validateUni() || !validateFaculty()){
		return false;
	}
	itWorks();
	return false;
}