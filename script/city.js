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