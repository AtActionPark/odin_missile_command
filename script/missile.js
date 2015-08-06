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