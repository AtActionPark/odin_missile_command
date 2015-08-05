var canvasElement = $("<canvas></canvas>");
var canvas;
var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = 500;
var fps = 60;
var basesHeight = 20;
var cannonSize = 35;

var missilesManager = new MissilesManager();
var explosionsManager = new ExplosionsManager();
var enemyMissilesManager = new MissilesManager();



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
  enemyMissilesManager.draw();
  explosionsManager.draw();
  drawMisc();
}

function update(){
  missilesManager.update();
  enemyMissilesManager.update();
  explosionsManager.update();
}

function gameLoop(){
  update();
  draw();
}

function fireMissile(event){
  event = event || window.event;
  var x = event.pageX;
  var y = event.pageY;
  var m = new Missile([x,y]);
  missilesManager.add(m);
}

function drawMisc(){
  drawBases();
  drawCannons();
}

function drawBases(){
  canvas.beginPath();
  canvas.moveTo(0,CANVAS_HEIGHT);
  canvas.lineTo(CANVAS_WIDTH,CANVAS_HEIGHT);
  canvas.lineTo(CANVAS_WIDTH,CANVAS_HEIGHT-basesHeight);
  canvas.lineTo(0,CANVAS_HEIGHT-basesHeight);
  canvas.closePath();
  canvas.fillStyle = 'yellow';
  canvas.fill();
}

function drawCannons(){
  drawRect(0,CANVAS_HEIGHT-cannonSize,cannonSize,cannonSize,'yellow');
  drawRect(CANVAS_WIDTH/2-cannonSize/2,CANVAS_HEIGHT-cannonSize,cannonSize,cannonSize,'yellow');
  drawRect(CANVAS_WIDTH-cannonSize,CANVAS_HEIGHT-cannonSize,cannonSize,cannonSize,'yellow');
}


$(document).ready(function(){
  setUpCanvas();
  setInterval(gameLoop,1000/fps);
  setInterval(function(){enemyMissilesManager.addRandom()},1000);
});

