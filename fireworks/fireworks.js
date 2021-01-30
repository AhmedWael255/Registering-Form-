'use strict';
function rand(a, b) {
	return a + Math.random() * (b - a);
}
var canvascheck = (document.createElement("canvas").getContext)? true : false;
var Canvas, ctx, smallBalls, counter, vx, vy, start, balls, loop, fontSize;
var h, Py, gravity = 0.2;

function calculateH(distance , fV){
	var temp=0;
	temp = (2  * gravity * distance + fV**2) / (2 * gravity );
	return temp;
}
function Vup(topPoint){
	var temp = 0;
	temp = Math.sqrt(2 * gravity * topPoint);
	return temp;
}


if(!canvascheck){
	showForm();
}
else{

	Canvas = document.getElementById('myCanvas');

	Canvas.width = window.innerWidth;
	Canvas.height = window.innerHeight;
	Canvas.style.position = "absolute";
	Canvas.style.top = 0;
	Canvas.style.left = 0;
	Canvas.style.zIndex = -1;
	fontSize = setFontSize();


	ctx = Canvas.getContext('2d');

	smallBalls = [];
	balls = [];
	vx = -Math.sqrt(2 * 2 + rand(-500, 100));

	start = {
		x: Canvas.width / 2,
		y: Canvas.height + 10
	};

	Py = Math.abs(start.y - Canvas.height/2);
	h = calculateH(Py, 1);
	var temp = Vup(h);
	vy = 0 - temp;
	
	counter = 0;
	loop = setInterval(fire, 20);
}


function Ball(x, y, r, vx, vy, color) {
		this.x = x;
		this.y = y;
		this.r = r;
		this.vx = vx;
		this.vy = vy;
		this.color = color;
		this.update = function() {
			this.x += this.vx;
			this.y += this.vy;
			this.vy += 0.2;
		};
		this.lifeTime = 0;
		this.endTime = parseInt(rand(15, 30));
	}
function fire(){

	ctx.fillStyle = 'rgba(5, 33, 54, 0.3)';
	ctx.fillRect(0, 0, Canvas.width, Canvas.height);
	vx = rand(-4, 4);

	if (counter < 75) {
		var color = "rgb(" + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + "," + parseInt(Math.random() * 255) + ")";
		var ball = new Ball(start.x, start.y, rand(1.5, 3), vx, vy, color);
		balls.push(ball);
		counter++;
	}



	for (var i = 0; i < balls.length; i++) {

		if (balls[i].vy >= 0) {
			ctx.fillRect(0, 0, Canvas.width, Canvas.height);
			generateSmallBalls(balls[i].x, balls[i].y, balls[i].color);
			balls.splice(i--, 1);
		} else {
			ctx.beginPath();
			ctx.arc(balls[i].x, balls[i].y, balls[i].r, 0, 2 * Math.PI);
			ctx.fillStyle = balls[i].color;
			ctx.strokeStyle = balls[i].color;
			ctx.fill();
			ctx.stroke();

			balls[i].update();
		}

	}

	for (var i = 0; i < smallBalls.length; i++) {
		ctx.beginPath();
		ctx.arc(smallBalls[i].x, smallBalls[i].y, smallBalls[i].r, 0, 2 * Math.PI);
		ctx.fillStyle = smallBalls[i].color;
		ctx.strokeStyle = smallBalls[i].color;
		ctx.fill();
		ctx.stroke();

		smallBalls[i].update();
		smallBalls[i].lifeTime++;
		if (smallBalls[i].lifeTime == smallBalls[i].endTime) {
			smallBalls.splice(i--, 1);
		}
	}
	if (balls.length == 0 && smallBalls.length == 0) {
		clearInterval(loop);
		counter = 0.01;
		loop = setInterval(write, 50);
	}
}
function write(){
	ctx.fillStyle = 'rgba(5, 33, 54, '+ counter +')';
	counter += 0.03;
	ctx.fillRect(0, 0, Canvas.width, Canvas.height);
	ctx.font = fontSize + "px 'Lobster', cursive";
	ctx.fillStyle = "rgba(255, 215, 0," + counter + ")";
	if(counter >= 1.5){
		clearInterval(loop);
		document.getElementById('fireworks').style.display = "none";
		showForm();
	}
	ctx.textAlign = "center";
	ctx.fillText("Eng Break'18 Opening Ceremony", Canvas.width / 2, Canvas.height / 2);	
}

var vxSmall, vySmall, Color;

function generateSmallBalls(x, y, color) {
	for (var i = 0; i < 75; ++i) {
		vxSmall = rand(-5, 5);
		vySmall = rand(-5, 5);
		var smallBall = new Ball(x, y, rand(0.5, 1), vxSmall, vySmall, color);
		smallBalls.push(smallBall);
	}
}

window.onresize = function() {
	if(canvascheck){
		Canvas.width = window.innerWidth;
		Canvas.height = window.innerHeight;
		start = {
			x: Canvas.width / 2,
			y: Canvas.height + 10
		};
		fontSize = setFontSize();
	}
}

function setFontSize() {
	if(Canvas.width >= 1200){
		return 80;
	}
	if(Canvas.width >= 900){
		return 70;
	}
	if(Canvas.width >= 800){
		return 60;
	}
	if(Canvas.width >= 700){
		return 50;
	}
	if(Canvas.width >= 600){
		return 40;
	}
	if(Canvas.width >= 500){
		return 35;
	}
	if(Canvas.width >= 400){
		return 30;
	}
	if(Canvas.width >= 300){
		return 20;
	}
	return 15;
}

function showForm(){
	var all = document.getElementById('all');
	var count = 100;
	all.style.transform = "translateY(" + count +"vh)";
	all.style.display = "block";
	var int = setInterval(function(){
		all.style.transform = "translateY(" + count-- +"vh)";
		if(count <= 0){
			all.style.transform = "translateY(0)";
			clearInterval(int);
			setTimeout(continue1, 500);
		}
	}, 20);
}