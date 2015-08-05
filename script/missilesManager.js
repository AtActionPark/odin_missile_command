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