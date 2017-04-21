var indicator = document.getElementById("working");
indicator.style.background = "red";
indicator.textContent = "WORKING!!"
var canvi = document.getElementById("myCanvas");
canvi.height = window.innerHeight;
canvi.width = window.innerWidth;
var c = canvi.getContext("2d");
var speed=8;
var speedMult=1;
var ballAngle = 45;
var currentScreen = "play";
var touchList = [];
var ballRadius=10;
var ballX=canvi.width/2;
var ballY=canvi.height/2;
var ballDeltaY=speed*Math.sin(ballAngle*(Math.PI/180));
var ballDeltaX=speed*Math.cos(ballAngle*(Math.PI/180));
var keys = [];
var currentSpeed;
var player1 = {
  score: 0,
  y: 0,
  paddleLength: 100,
};

var player2 = {
  score: 0,
  y: 0,
  paddleLength: 100,
};

var bomb = {
	x: 0,
	y: 0,
	active: false,
	size: 0,
	xVel: 0,
	yVel: 0,
	exploded: 0,
	explosionTime: 0
}

var paddlePiece = function(x,y,xVel,yVel, rotationSpeed){
	this.x = x;
	this.y = y;
	this.xVel = xVel;
	this.yVel = yVel;
	this.rotSpd = rotationSpeed;
	this.angle = angle;
}
paddlePiece.prototype.draw = function(){
	c.setTransform(1,0,0,1,0,0);
	
	c.fillStyle = "white";
	c.fillRect(-5,-5,10,10);
	c.rotate(this.angle);
	c.translate(this.x, this.y);
	c.setTransform(1,0,0,1,0,0);
	
	this.angle += this.rotSpeed;
	this.x += this.xVel;
	this.y += this.yVel;
	if(this.y < 0 || this.y > canvi.height){
		this.yVel *= -1;
	}
}
var projectiles = [];

window.addEventListener("touchstart", function(e){
  touchList = e.touches;
  e.preventDefault();
});

window.addEventListener("touchmove", function(e){
  touchList = e.touches;
  e.preventDefault();
});

window.addEventListener("touchend", function(e){
  touchList = e.touches;
  e.preventDefault();
});

window.addEventListener("keydown", function(e){
  keys[e.keyCode] = true;
  e.preventDefault();
});

window.addEventListener("keyup", function(e){
  keys[e.keyCode] = false;
  e.preventDefault();
});

window.addEventListener("resize", function(e){
  canvi.height = window.innerHeight;
  canvi.width = window.innerWidth;
});

var interval = window.setInterval(mainLoop, 17);

function mainMenu(){//the main loop of the main menu - MAIN MENU HAS NOT BEEN ADDED YET
  c.fillStyle = "#FFFFFF";
  c.font = "20px sans";
  c.fillText(canvi.width/2,100,"Bounce");
}

function play(){
	c.fillStyle = "#FFFFFF";
	c.font = "20px sans";
	c.beginPath();
	c.arc(ballX,ballY,ballRadius,0,2*Math.PI);
	c.closePath();
	c.fillStyle="white";
	c.fill();
	c.fillRect(50, player1.y-player1.paddleLength/2, 10, player1.paddleLength);
	c.fillText(player1.score, 60, 60);
	c.fillRect(canvi.width-50, player2.y-player2.paddleLength/2, 10, player2.paddleLength);
	c.fillText(player2.score, canvi.width/2, 60);
	for(var i = 0; i < projectiles.length; i++){
		projectiles[i].draw();
		if(projectiles[i].x < 0 || projectiles[i].x > canvi.width){
			projectiles.splice(i,1);
			i--;
		}
	}
	
	if(bomb.exploded > 0){
		var d = new Date();
		if(Math.round(d.getMilliseconds()%10) < 5){
			c.setTransform(1,0,0,1,0,3);
		}
		else{
			c.setTransform(1,0,0,1,0,-3);
		}
		bomb.explosionTime += 1;
		if(bomb.explosionTime > 20){
			bomb.exploded = 0;
			bomb.explosionTime = 0;
		}
		
	}
	else
	{
		c.setTransform(1,0,0,1,0,0);
	}
	
	if(bomb.active == false&&Math.round(Math.random()*100) == 0){
		bomb.active = true;
		bomb.x = canvi.width/2;
		bomb.y = canvi.height/2;
		bomb.xVel = 10*(Math.round(Math.random())-0.5);
		bomb.yVel = Math.round(Math.random()*10)-5;
		bomb.exploded = 0;
	}
	if(bomb.active == true){
		if(bomb.size < 20){
			bomb.size += 2;
		}
		bomb.x += bomb.xVel;
		bomb.y += bomb.yVel;
		c.beginPath();
		c.arc(bomb.x,bomb.y,bomb.size,0,2*Math.PI);
		c.closePath();
		c.strokeStyle="white";
		c.stroke();
		if(bomb.x > canvi.width||bomb.x < 0){
			bomb.active = false;
		}
		if(bomb.y < 0 || bomb.y > canvi.height){
			bomb.yVel *= -1;
		}
		if(bomb.x > canvi.width-50 && bomb.y > player2.y-player2.paddleLength/2 && bomb.y < player2.y+player2.paddleLength/2){
			bomb.exploded = 2;
			bomb.active = false;
			player2.paddleLength -= 10;
			projectiles[projectiles.length+1] = new paddlePiece(player2.y+player2.paddleLength/2+5, canvi.width-45,-5,-5,5);
		}
		if(bomb.x < 50 && bomb.y > player1.y-player1.paddleLength/2 && bomb.y < player1.y+player1.paddleLength/2){
			bomb.exploded = 1;
			bomb.active = false;
			player1.paddleLength -= 10;
			projectiles[projectiles.length+1] = new paddlePiece(player1.y+player1.paddleLength/2+5, 55,5,-5,5);
		}
	}
  
  if(touchList.length>0){//touch control
	  var leftTotal = 0;
	  var rightTotal = 0;
	  var leftCount = 0;
	  var rightCount = 0;
	  for(var i = 0; i < touchList.length; i++){
		if(touchList[i].clientX < canvi.width/2){
		  leftTotal += touchList[i].clientY;
		  leftCount++;
		}else{
		  rightTotal += touchList[i].clientY;
		  rightCount++;
		}
	  }
	  player1.y = leftCount>0?leftTotal/leftCount:player1.y;
	  player2.y = rightCount>0?rightTotal/rightCount:player2.y;
	}
	else//keyboard control
	{
		if(keys[38]&&player2.y>0){
			player2.y -= 10;
		}else if(keys[40]&&player2.y<canvi.height){
			player2.y += 10;
		}
		if(keys[87]&&player1.y>0){
			player1.y -= 10;
		}else if(keys[83]&&player1.y<canvi.height){
			player1.y += 10;
		}
	}
 
    if(ballX+ballDeltaX>canvi.width-60){//bouncing off of player2's paddle
		if(ballY+ballDeltaY<player2.y+player2.paddleLength/2+ballRadius&&ballY+ballDeltaY>player2.y-player2.paddleLength/2-ballRadius){
			speed *= speedMult;
			speedMult+=0.005;
			ballAngle=-(player2.y-ballY)
                        ballDeltaY=speed*Math.sin(ballAngle*(Math.PI/180));
			ballDeltaX=speed*Math.cos(ballAngle*(Math.PI/180));
			ballDeltaX *= -1;
		}
		else{//scoring for player1
			ballX=canvi.width/2;
			player1.score++;
			speed = 8;
			ballAngle = 135;
			ballDeltaY=speed*Math.sin(ballAngle*(Math.PI/180));
			ballDeltaX=speed*Math.cos(ballAngle*(Math.PI/180));
		}
    }
    if(ballX + ballDeltaX < 70){//bouncing off of player1's paddle
		if(ballY+ballDeltaY<player1.y+player1.paddleLength/2+ballRadius&&ballY+ballDeltaY>player1.y-player1.paddleLength/2-ballRadius){
			speed *= speedMult;
			speedMult += 0.005;
			ballAngle=-(player1.y-ballY)
			ballDeltaY=speed*Math.sin(ballAngle*(Math.PI/180));
			ballDeltaX=speed*Math.cos(ballAngle*(Math.PI/180));//the thing with pi converts the angle (in degrees) to radians for the function			
			//ballDeltaX *= -1;
		}
		else{//scoring for player2
			ballX=canvi.width/2;
			player2.score++;
			speed = 8;
			ballAngle = 45;
			ballDeltaY=speed*Math.sin(ballAngle*(Math.PI/180));
			ballDeltaX=speed*Math.cos(ballAngle*(Math.PI/180));
		}
    }
    if(ballY + ballDeltaY > canvi.height || ballY + ballDeltaY < 0) {//bouncing off of the top and bottom
        ballDeltaY = -ballDeltaY;
    }
	ballX+=ballDeltaX;//move the ball by its velocity vector
	ballY+=ballDeltaY;
	
	//WINNING BY SCORE
	if(player1.score >= 21){
		currentScreen = "2lost";
	}
	if(player2.score >= 21){
		currentScreen = "1lost";
	}
	
	//WINNING BY EXPLOSIONS
	if(player1.paddleLength <= 0){
		currentScreen = "1lost";
	}
	if(player2.paddleLength <= 0){
		currentScreen = "2lost";
	}
}

function lost(player){
	c.fillStyle = "#FFFFFF";
	c.font = "60px sans";
	c.fillText("PLAYER "+player+" LOST! Congrats to player "+((player)%2+1)+"!", 100,100);
}

function mainLoop(){
	currentSpeed=ballDeltaX+ballDeltaY;
	c.fillStyle = "#000000";
	c.fillRect(0,0,canvi.width,canvi.height);
	//c.fillStyle = "#FFFFFF";
	//c.fillRect(20,20,50,50);
	switch(currentScreen){
		case "mainMenu":
			mainMenu();
			break;
		case "play":
			play();
			break;
		case "1lost":
			lost(1);
			break;
		case "2lost":
			lost(2);
			break;
  }
}
