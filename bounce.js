var canvi = document.getElementById("myCanvas");
var c = canvi.getContext("2d");
var interval = window.setinterval(mainLoop, 17);

window.addEventListener("touchstart", function(e){
  e.preventDefault();
});

window.addEventListener("touchmove", function(e){
  e.preventDefault();
});

function mainLoop(){
  c.fillStyle = "#000000";
  c.fillRect(0,0,500,500);
  c.fillStyle = "#FFFFFF";
  c.fillRect(20,20,5,50);
}
