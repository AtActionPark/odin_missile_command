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