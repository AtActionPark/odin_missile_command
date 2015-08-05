function Normalize(vector){
  var l = Math.sqrt(vector[0]*vector[0] + vector[1]*vector[1]);
  vector[0] /= l;
  vector[1] /= l;
  return vector;
}

function drawRect(x,y, width,height,color){
  canvas.beginPath();
  canvas.moveTo(x,y);
  canvas.lineTo(x+width,y);
  canvas.lineTo(x+width,y+height);
  canvas.lineTo(x,y+height);
  canvas.closePath();
  canvas.fillStyle = color;
  canvas.fill();
}