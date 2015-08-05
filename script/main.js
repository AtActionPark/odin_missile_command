var canvasElement = $("<canvas></canvas>");
var canvas;

function setUpCanvas(){
  canvasElement = $("<canvas width='500' height='500'></canvas>");
  canvas = canvasElement.get(0).getContext("2d");
  canvasElement.appendTo('body');
  canvas.fillStyle = "white";
  canvas.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
}