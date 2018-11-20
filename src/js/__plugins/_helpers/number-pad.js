// Add padding to numbers (a.k.a format by mask 00)
Number.prototype.pad = function(size) {
  var s = String(this);
  while (s.length < (size || 2)) {s = "0" + s;}
  return s;
}

// use
// var myNuber = 4
// (muNumber).pad(2) // output - 04
