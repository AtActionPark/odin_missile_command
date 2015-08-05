var speed = 8;

function Missile(destination){
  this.initialPosition = [250,500];
  this.position = [this.initialPosition[0],this.initialPosition[1]];
  this.direction = [0,0];
  this.destination = destination;
  this.toDestroy = false;
  this.setDirection();
}

Missile.prototype.setDirection = function(){
  this.direction[0] = this.destination[0] - this.initialPosition[0];
  this.direction[1] = this.initialPosition[1] - this.destination[1] ;
  this.direction = Normalize(this.direction);
}

Missile.prototype.destinationReached = function(){
  return this.position[0]>this.destination[0]-5 && this.position[0]<this.destination[0]+5 && this.position[1]>this.destination[1]-5 && this.position[1]<this.destination[1]+5
}




Missile.prototype.draw = function(){
  canvas.lineWidth = 1.0; 
  canvas.strokeStyle = "blue";
  canvas.beginPath();
  canvas.moveTo(this.initialPosition[0],this.initialPosition[1]);
  canvas.lineTo(this.position[0],this.position[1]);
  canvas.stroke();
}

Missile.prototype.update = function(){
   if (this.toDestroy)
    return;
  this.position[0] += this.direction[0]*speed;
  this.position[1] -= this.direction[1]*speed;
  if(this.destinationReached()){
    this.toDestroy = true;
    e = new Explosion(this.position);
    explosionsManager.add(e);
  }
}