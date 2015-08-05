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
}

EnemyMissile.prototype.update = function(){
  this.position[0] += this.direction[0]*enemySpeed;
  this.position[1] -= this.direction[1]*enemySpeed;

  if (this.position[0]<0 ||this.position[1] > CANVAS_WIDTH || this.position[1]>CANVAS_HEIGHT-basesHeight){
      this.toDestroy = true;
      e = new Explosion(this.position);
      explosionsManager.add(e);
    }

  for (var i = 0;i<explosionsManager.explosions.length;i++){
    if (explosionsManager.explosions[i].contains(this.position)){
      this.toDestroy = true;
      e = new Explosion(this.position);
      explosionsManager.add(e);
    }
  }
}