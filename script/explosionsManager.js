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
  canvas.fillStyle = "black";
  canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  for (var i = 0;i< this.explosions.length;i++){
    this.explosions[i].draw();
  }
}

ExplosionsManager.prototype.add = function(missile){
  this.explosions.push(explosions);
}