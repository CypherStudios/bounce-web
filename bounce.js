var indicator = document.getElementById("working");
indicator.style.background = "red";
indicator.textContent = "WORKING!!"
var canvi = document.getElementById("myCanvas");
canvi.height = window.innerHeight;
canvi.width = window.innerWidth;
var c = canvi.getContext("2d");

var speed=10;
var currentScreen = "play";
var touchList = [];
var ballRadius=10;
var ballX=canvi.width/2;
var ballY=canvi.height/2;
var ballDeltaX=6;
var ballDeltaY=2;
var keys = [];

var player1 = {
  score: 0,
  y: 0,
};

var player2 = {
  score: 0,
  y: 0,
};

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

function mainMenu(){//the main loop of the main menu
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
  c.fillRect(50, player1.y-50, 10, 100);
  c.fillText(player1.score, 60, 60);
  c.fillRect(canvi.width-50, player2.y-50, 10, 100);
  c.fillText(player2.score, canvi.width/2, 60);
  if(touchList.length>0){
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
  else
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
 
    if(ballX+ballDeltaX>canvi.width-60){
      if(ballY+ballDeltaY<player2.y+50+ballRadius&&ballY+ballDeltaY>player2.y-50-ballRadius){
        //ballDeltaX *= -1.01;
        
        ballDeltaY=(player2.y-ballY)/-5;
        speed*=-1.2
        ballDeltaX=speed-Math.abs(ballDeltaY)
      }
      else{
        ballX=canvi.width/2;
        player1.score++;
        ballDeltaX = 6*(ballDeltaX/Math.abs(ballDeltaX));
      }
    }
    if(ballX + ballDeltaX < 70){
      if(ballY+ballDeltaY<player1.y+50+ballRadius&&ballY+ballDeltaY>player1.y-50-ballRadius){
        //ballDeltaX *= -1.01;
        ballDeltaY=(player1.y-ballY)/-5;
        speed*=-1.01
        ballDeltaX=speed-Math.abs(ballDeltaY)
      }
      else{
        ballX=canvi.width/2;
        player2.score++;
        ballDeltaX = 6*(ballDeltaX/Math.abs(ballDeltaX));
      }
    }
    if(ballY + ballDeltaY > canvi.height || ballY + ballDeltaY < 0) {
        ballDeltaY = -ballDeltaY;
    }
ballX+=ballDeltaX;
ballY+=ballDeltaY;
}

function mainLoop(){
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
  }
}
