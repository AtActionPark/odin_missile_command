var canvasElement = $("<canvas></canvas>");
var canvas;
var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = 500;
var fps = 60;

var missilesManager = new MissilesManager();
var explosionsManager = new ExplosionsManager();

function setUpCanvas(){
  canvasElement = $("<canvas class='canvasNew' onclick = 'fireMissile()' width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");
  canvas = canvasElement.get(0).getContext("2d");
  canvasElement.appendTo('body');
  canvas.fillStyle = "black";
  canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function draw(){
  canvas.fillStyle = "black";
  canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  missilesManager.draw();
  //explosionsManager.draw();
}

function update(){
  missilesManager.update();
  explosionsManager.update();
}

function gameLoop(){
  update();
  draw();
  setTimeout(gameLoop,1000/fps);
}

function fireMissile(event){
  event = event || window.event;
  var x = event.pageX;
  var y = event.pageY;
  var m = new Missile([x,y]);
  missilesManager.add(m);
}

$(document).ready(function(){
  setUpCanvas();
  gameLoop();
});

