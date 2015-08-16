function CitiesManager(){
  this.cities = [];
  this.cities.push(new City([(CANVAS_WIDTH/2 - cannonSize - cannonSize/2)/3 ,CANVAS_HEIGHT-basesHeight-citySize/2]));
  this.cities.push(new City([2*(CANVAS_WIDTH/2 - cannonSize - cannonSize/2)/3 ,CANVAS_HEIGHT-basesHeight-citySize/2]));
  this.cities.push(new City([3*(CANVAS_WIDTH/2 - cannonSize - cannonSize/2)/3 ,CANVAS_HEIGHT-basesHeight-citySize/2]));

  this.cities.push(new City([CANVAS_WIDTH/2 - cannonSize/2+ (CANVAS_WIDTH/2 - cannonSize - cannonSize/2)/3,CANVAS_HEIGHT-basesHeight-citySize/2]));
  this.cities.push(new City([CANVAS_WIDTH/2- cannonSize/2+ 2*(CANVAS_WIDTH/2 - cannonSize - cannonSize/2)/3 ,CANVAS_HEIGHT-basesHeight-citySize/2]));
  this.cities.push(new City([CANVAS_WIDTH/2- cannonSize/2+3*(CANVAS_WIDTH/2 - cannonSize - cannonSize/2)/3 ,CANVAS_HEIGHT-basesHeight-citySize/2]));
}

CitiesManager.prototype.update = function(){
  for (var i = 0;i< this.cities.length;i++){
    this.cities[i].update();
  }
  this.cities  = this.cities.filter(function(e){return e.toDestroy == false});
}

CitiesManager.prototype.draw = function(){
  for (var i = 0;i< this.cities.length;i++){
    this.cities[i].draw();
  }
}
var citySize = 20;

function City(position){
  this.toDestroy = false;
  this.position = position;
}

City.prototype.draw = function(){
  drawRect(this.position[0]-citySize/2,this.position[1]-citySize/2,citySize,citySize,'lightBlue');
}

City.prototype.update = function(){
   if (this.toDestroy)
    return;
  for (var i = 0;i<explosionsManager.explosions.length;i++){
    if (explosionsManager.explosions[i].contains(this.position)){
      this.toDestroy = true;
    }
  }
}
var enemySpeed = 0.5;

function EnemyMissile(initialPosition,destination){
  this.initialPosition = initialPosition;
  this.position = [this.initialPosition[0],this.initialPosition[1]];
  this.direction = [0,0];
  this.destination = destination;
  this.toDestroy = false;
  this.setDirection();
}

EnemyMissile.prototype.setDirection = function(){
  this.direction[0] = this.destination[0] - this.initialPosition[0];
  this.direction[1] = this.initialPosition[1] - this.destination[1] ;
  this.direction = Normalize(this.direction);
}

EnemyMissile.prototype.destinationReached = function(){
  return this.position[0]>this.destination[0]-5 && this.position[0]<this.destination[0]+5 && this.position[1]>this.destination[1]-5 && this.position[1]<this.destination[1]+5
}

EnemyMissile.prototype.draw = function(){
  canvas.lineWidth = 2.0; 
  canvas.strokeStyle = "red";
  canvas.beginPath();
  canvas.moveTo(this.initialPosition[0],this.initialPosition[1]);
  canvas.lineTo(this.position[0],this.position[1]);
  canvas.stroke();
  drawRect(this.position[0]-1, this.position[1]-1,2,2,'white');
}

EnemyMissile.prototype.update = function(){
  this.position[0] += this.direction[0]*enemySpeed;
  this.position[1] -= this.direction[1]*enemySpeed;

  if (this.position[0]<0 ||this.position[1] > CANVAS_WIDTH || this.position[1]>CANVAS_HEIGHT-basesHeight){
      this.toDestroy = true;
      e = new Explosion(this.position);
      e.color = 'red';
      explosionsManager.add(e);
    }

  for (var i = 0;i<explosionsManager.explosions.length;i++){
    if (explosionsManager.explosions[i].contains(this.position)){
      this.toDestroy = true;
      e = new Explosion(this.position);
      explosionsManager.add(e);
      score++;
    }
  }
}
var radiusGrowth = 0.6;
var maxRadius = 40;

function Explosion(position){
  this.toDestroy = false;
  this.position = [position[0],position[1]];
  this.radius = 0;
  this.growing = true;
  this.color = 'white';
}

Explosion.prototype.update = function(){
  if (this.growing && this.radius<maxRadius)
    this.radius+=radiusGrowth;
  else{
    this.growing = false;
    this.radius-=radiusGrowth;
  }

  if (this.radius < 0)
    this.toDestroy = true;
}

Explosion.prototype.draw = function(){
  canvas.beginPath();
  canvas.arc(this.position[0],this.position[1], this.radius, 0, 2 * Math.PI, false);
  canvas.fillStyle = this.color;
  canvas.fill();
}

Explosion.prototype.contains = function(missilePosition){
  var l = Math.abs(missilePosition[0] - this.position[0])*Math.abs(missilePosition[0] - this.position[0]) + Math.abs(missilePosition[1] - this.position[1])*Math.abs(missilePosition[1] - this.position[1]);
  return Math.sqrt(l) < this.radius;
}

function ExplosionsManager(){
  this.explosions = [];
}

ExplosionsManager.prototype.update = function(){
  for (var i = 0;i< this.explosions.length;i++){
    this.explosions[i].update();
  }
  this.explosions  = this.explosions.filter(function(e){return e.toDestroy == false});
}

ExplosionsManager.prototype.draw = function(){
  for (var i = 0;i< this.explosions.length;i++){
    this.explosions[i].draw();
  }
}

ExplosionsManager.prototype.add = function(explosion){
  this.explosions.push(explosion);
}
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


var speed = 8;

function Missile(destination){
  this.destination = destination;
  this.toDestroy = false;
  this.initialPosition = this.getClosestBasePosition();
  this.position = [this.initialPosition[0],this.initialPosition[1]];
  this.direction = [0,0];
  this.setDirection();
}

Missile.prototype.setDirection = function(){
  this.direction[0] = this.destination[0] - this.initialPosition[0];
  this.direction[1] = this.initialPosition[1] - this.destination[1] ;
  this.direction = Normalize(this.direction);
}

Missile.prototype.destinationReached = function(){
  return this.position[0]>this.destination[0]-5 && this.position[0]<this.destination[0]+5 && this.position[1]>this.destination[1]-5 && this.position[1]<this.destination[1]+5;
}

Missile.prototype.draw = function(){
  canvas.lineWidth = 1.0; 
  canvas.strokeStyle = "blue";
  canvas.beginPath();
  canvas.moveTo(this.initialPosition[0],this.initialPosition[1]);
  canvas.lineTo(this.position[0],this.position[1]);
  canvas.stroke();
  drawRect(this.position[0]-1, this.position[1]-1,2,2,'white');
}

Missile.prototype.update = function(){
   if (this.toDestroy)
    return;
  this.position[0] += this.direction[0]*speed;
  this.position[1] -= this.direction[1]*speed;
  if(this.destinationReached() || this.position[0]<0){
    this.toDestroy = true;
    e = new Explosion(this.position);
    explosionsManager.add(e);
  }
}

Missile.prototype.getClosestBasePosition = function(){
  if(this.destination[0]<CANVAS_WIDTH/3)
    return [cannonSize/2,CANVAS_HEIGHT-cannonSize];
  else if (this.destination[0]<2*CANVAS_WIDTH/3)
    return [CANVAS_WIDTH/2,CANVAS_HEIGHT-cannonSize];
  else
    return [CANVAS_WIDTH-cannonSize/2,CANVAS_HEIGHT-cannonSize];
}
function MissilesManager(){
  this.missiles = [];
}

MissilesManager.prototype.update = function(){
  for (var i = 0;i< this.missiles.length;i++){
    this.missiles[i].update();
  }
  this.missiles  = this.missiles.filter(function(e){return e.toDestroy == false});
}

MissilesManager.prototype.draw = function(){
  for (var i = 0;i< this.missiles.length;i++){
    this.missiles[i].draw();
  }
}

MissilesManager.prototype.add = function(missile){
  this.missiles.push(missile);
}

MissilesManager.prototype.addRandom = function(){
  var posX = Math.random()*CANVAS_WIDTH;
  var destinationX = Math.random()*CANVAS_WIDTH;
  var m = new EnemyMissile([posX,0],[destinationX,CANVAS_HEIGHT]);

  this.add(m);
}
function Normalize(vector){
  var l = Math.sqrt(vector[0]*vector[0] + vector[1]*vector[1]);
  vector[0] /= l;
  vector[1] /= l;
  return vector;
}

function drawRect(x,y, width,height,color){
  canvas.beginPath();
  canvas.moveTo(x,y);
  canvas.lineTo(x+width,y);
  canvas.lineTo(x+width,y+height);
  canvas.lineTo(x,y+height);
  canvas.closePath();
  canvas.fillStyle = color;
  canvas.fill();
}