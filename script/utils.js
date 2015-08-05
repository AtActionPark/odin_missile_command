function Normalize(vector){
  var l = Math.sqrt(vector[0]*vector[0] + vector[1]*vector[1]);
  vector[0] /= l;
  vector[1] /= l;
  return vector;
}