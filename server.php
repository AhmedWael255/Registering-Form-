<?php

$err = "";
$letters = "ذضصثقفغإعهخحجدطكمنتاألبيسشئءؤرلاىآةوزظ ";
$letters = preg_split("//u", $letters, -1, PREG_SPLIT_NO_EMPTY);



if(
	isset($_POST["name"])&&
	isset($_POST["email"])&&
	isset($_POST["phone"])&&
	isset($_POST["collage"])&&
	isset($_POST["university"])){


	checkName();
	checkPhone();
	checkMail();
	checkUniversity();
	checkCollage();

	if($err != ""){
		echo $err;
		exit;
	}
	else{
		$conn = mysqli_connect('localhost','root','','opening');

		$query="INSERT INTO user (name,  email,  phone, collage, university ) values ('$name','$email','$phone','$collage','$university')"	;
		$result = $conn->query($query);

		if($result){ echo "success"; }
		else{ echo "fail"; }
	}
}


function test_input($data) {
	$data = trim($data);
	$data = stripslashes($data);
	$data = htmlspecialchars($data);
	return $data;
}

function checkName(){
	global $err, $name;
	if (empty($_POST["name"])) {
		$err .= "1";
	} else {
		$name = test_input($_POST["name"]);
		// check if name only contains letters and whitespace
		if (!checkArabic($name) && !preg_match("/^[a-zA-Z ]*$/",$name)) {
			$err .= "1";
		}
	}
}

function checkPhone(){
	global $err, $phone;
	if(empty($_POST["phone"])) {
		$err .= "2";
	} else {
		$phone = test_input($_POST["phone"]);
		if(!ctype_digit($_POST["phone"]) || strlen($phone)!= 11){
			$err .= "2";	
		}
	}
}

function checkMail(){
	global $err, $email;
	if (empty($_POST["email"])) {
		$err .= "3";
	} else {
		$email = test_input($_POST["email"]);
		// check if e-mail address is well-formed
		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$err .= "3";
		}
	}
}

function checkUniversity(){
	global $err, $university;
	if(empty($_POST["university"])) {
		$err .= "4";
	} else {
		$university = test_input($_POST["university"]);
		// check if name only contains letters and whitespace
		if (!checkArabic($university) && !preg_match("/^[a-zA-Z ]*$/",$university)) {
			$err .= "4";
		}
	}
}

function checkCollage(){
	global $err, $collage;
	if (empty($_POST["collage"])) {
		$err .= "5";
	} else {
		$collage = test_input($_POST["collage"]);
		// check if name only contains letters and whitespace
		if (!checkArabic($collage) && !preg_match("/^[a-zA-Z ]*$/",$collage)) {
			$err .= "5";
		}
	}
}


function checkArabic($text){

	$temp = preg_split("//u", $text, -1, PREG_SPLIT_NO_EMPTY);
	for($i=0; $i < count($temp); ++$i){
		if(!ArabicLitter($temp[$i])){
			return false;
		}
	}
	return true;
}

function ArabicLitter($l){
	global $letters;
	return (in_array($l, $letters));
}

?>