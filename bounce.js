var canvi = document.getElementById("myCanvas");
canvi.height = window.innerHeight;
canvi.width = window.innerWidth;
var c = canvi.getContext("2d");


var currentScreen = "play";
var touchList = [];

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

var interval = window.setInterval(mainLoop, 17);

function mainMenu(){//the main loop of the main menu
  c.fillStyle = "#FFFFFF";
  c.font = "20px sans";
  c.fillText(canvi.width/2,100,"Bounce");
}

function play(){
  c.fillStyle = "#FFFFFF";
  c.fillRect(50, player1.y-30, 10, 60);
  c.fillRect(canvi.width-50, player2.y-30, 10, 60);
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
  player1.y = leftTotal/leftCount;
  player2.y = rightTotal/rightCount;
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
