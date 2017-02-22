var canvi = document.getElementById("myCanvas");
canvi.style.background = "black";
var c = canvi.getContext("2d");
canvi.height = window.innerHeight;
canvi.width = window.innerWidth;

var scene = "mainMenu";

window.addEventListener("touchstart", function(e){
  e.preventDefault();
});

window.addEventListener("touchmove", function(e){
  e.preventDefault();
});

var interval = window.setInterval(mainLoop, 17);

function mainMenu(){//the main loop of the main menu
  c.fillStyle = "#FFFFFF";
  c.font = "20px sans";
  c.fillText(canvi.width/2,100,"Bounce");
}

function mainLoop(){
  c.fillStyle = "#000000";
  c.fillRect(0,0,canvi.width,canvi.height);
  //c.fillStyle = "#FFFFFF";
  //c.fillRect(20,20,50,50);
  switch(scene){
    case "mainMenu":
      mainMenu();
      break;
  }
}
