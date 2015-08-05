var radiusGrowth = 0.6;
var maxRadius = 40;

function Explosion(position){
  this.toDestroy = false;
  this.position = [position[0],position[1]];
  this.radius = 0;
  this.growing = true
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
  canvas.fillStyle = 'white';
  canvas.fill();
}

Explosion.prototype.contains = function(missilePosition){
  var l = Math.abs(missilePosition[0] - this.position[0])*Math.abs(missilePosition[0] - this.position[0]) + Math.abs(missilePosition[1] - this.position[1])*Math.abs(missilePosition[1] - this.position[1]);
  return Math.sqrt(l) < this.radius;
}