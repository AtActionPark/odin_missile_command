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
  canvas.fillStyle = "black";
  canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  for (var i = 0;i< this.missiles.length;i++){
    this.missiles[i].draw();
  }
}

MissilesManager.prototype.add = function(missile){
  this.missiles.push(missile);
}