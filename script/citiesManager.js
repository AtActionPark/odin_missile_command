function CitiesManager(){
  this.cities = [];
  this.cities.push(new City([(CANVAS_WIDTH/2 - cannonSize - cannonSize/2)/3 ,CANVAS_HEIGHT-basesHeight-citySize/2]));
  this.cities.push(new City([2*(CANVAS_WIDTH/2 - cannonSize - cannonSize/2)/3 ,CANVAS_HEIGHT-basesHeight-citySize/2]));
  this.cities.push(new City([3*(CANVAS_WIDTH/2 - cannonSize - cannonSize/2)/3 ,CANVAS_HEIGHT-basesHeight-citySize/2]));

  this.cities.push(new City([CANVAS_WIDTH/2 - cannonSize/2+ (CANVAS_WIDTH/2 - cannonSize - cannonSize/2)/3,CANVAS_HEIGHT-basesHeight-citySize/2]));
  this.cities.push(new City([CANVAS_WIDTH/2- cannonSize/2+ 2*(CANVAS_WIDTH/2 - cannonSize - cannonSize/2)/3 ,CANVAS_HEIGHT-basesHeight-citySize/2]));
  this.cities.push(new City([CANVAS_WIDTH/2- cannonSize/2+3*(CANVAS_WIDTH/2 - cannonSize - cannonSize/2)/3 ,CANVAS_HEIGHT-basesHeight-citySize/2]));
}

CitiesManager.prototype.update = function(){
  for (var i = 0;i< this.cities.length;i++){
    this.cities[i].update();
  }
  this.cities  = this.cities.filter(function(e){return e.toDestroy == false});
}

CitiesManager.prototype.draw = function(){
  for (var i = 0;i< this.cities.length;i++){
    this.cities[i].draw();
  }
}