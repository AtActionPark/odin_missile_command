var canvasElement = $("<canvas></canvas>");
var canvas;
var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = 500;
var fps = 60;
var basesHeight = 20;
var cannonSize = 35;
var gameOver = false;
var missilesInterval = 1000;

var missilesManager = new MissilesManager();
var explosionsManager = new ExplosionsManager();
var enemyMissilesManager = new MissilesManager();
var citiesManager = new CitiesManager();
var score = 0;



function setUpCanvas(){
  canvasElement = $("<canvas class='canvas' onclick = 'fireMissile()' width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");
  canvas = canvasElement.get(0).getContext("2d");
  canvasElement.appendTo('.container');
  canvas.fillStyle = "black";
  canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}

function draw(){
  canvas.fillStyle = "black";
  canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  missilesManager.draw();
  enemyMissilesManager.draw();
  explosionsManager.draw();
  citiesManager.draw();
  drawMisc();
  if(gameOver){
    canvas.fillStyle = "white";
    canvas.font = "bold 40px Arial";
    canvas.fillText("Game Over", CANVAS_WIDTH/2 -100 , CANVAS_HEIGHT/2-50);
    canvas.font = "bold 20px Arial";
    canvas.fillText("Press space to restart", CANVAS_WIDTH/2 -100 , CANVAS_HEIGHT/2);
  }
}

function update(){
  if (!gameOver){
    missilesManager.update();
    enemyMissilesManager.update();
    explosionsManager.update();
    citiesManager.update();
    checkGameOver();
  }
}

function gameLoop(){
  update();
  draw();
  setTimeout(gameLoop,1000/fps);
}

function fireMissile(event){
  var rect = canvasElement[0].getBoundingClientRect();
  event = event || window.event;
  var x = event.pageX  - rect.left;
  var y = event.pageY - rect.top;
  var m = new Missile([x,y]);
  missilesManager.add(m);
}

function drawMisc(){
  drawBases();
  drawCannons();
  drawScore();
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

function drawScore(){
  canvas.fillStyle = "white";
  canvas.font = "bold 20px Arial";
  canvas.fillText("Score : " + score, 10 , 20);
}

function checkGameOver(){
  if( citiesManager.cities.length == 0)
    gameOver = true;
}

function restart(){
  gameOver = false;
  missilesManager = new MissilesManager();
  explosionsManager = new ExplosionsManager();
  enemyMissilesManager = new MissilesManager();
  citiesManager = new CitiesManager();
  score = 0;
  missilesInterval = 1000;
  enemySpeed=0.5;
}

function fireEnemyMissiles(){
  enemyMissilesManager.addRandom();
  upDifficulty();
  setTimeout(fireEnemyMissiles,missilesInterval);
}

function upDifficulty(){
  if (missilesInterval>100)
    missilesInterval-=5;
  if(enemySpeed < 10)
    enemySpeed+=0.03;
}


$(document).ready(function(){
  setUpCanvas();
  setTimeout(gameLoop,1000/fps);
  setTimeout(fireEnemyMissiles,0);
  $(document).keydown(function(event){
      if (event.which == 32 && gameOver)
        restart();
    });
});

