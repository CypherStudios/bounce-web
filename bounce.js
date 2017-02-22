var canvi = document.getElementById("myCanvas");
canvi.style.background = "white";
var c = canvi.getContext("2d");
canvi.height = window.innerHeight;
canvi.width = window.innerWidth;

window.addEventListener("touchstart", function(e){
  e.preventDefault();
});

window.addEventListener("touchmove", function(e){
  e.preventDefault();
});

var interval = window.setInterval(mainLoop, 17);

function mainLoop(){
  c.fillStyle = "#000000";
  c.fillRect(0,0,canvi.width,canvi.height);
  c.fillStyle = "#FFFFFF";
  c.fillRect(20,20,50,50);
}
