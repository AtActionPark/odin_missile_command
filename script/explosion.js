function Explosion(position){
  this.toDestroy = false;
  this.position = [position[0],position[1]];
  this.radius = 0;
  this.growing = true
}

Explosion.prototype.update = function(){
  if (this.growing && this.radius<50)
    this.radius++;
  else{
    this.growing = false;
    this.radius--;
  }

  if (this.radius < 0)
    this.toDestroy = true;

}

Explosion.prototype.draw = function(){
  canvas.beginPath();
  canvas.arc(this.position[0],this.position[1], this.radius, 0, 2 * Math.PI, false);
  canvas.fillStyle = 'white';
  canvas.fill();
}