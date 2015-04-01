var Random = require("random-js");
//1a2s6d9e2d

var random = new Random(Random.engines.mt19937().seed(28964656552145));

var Random = {
  float(min, max) {
    return Math.random() * (max - min) + min;
  },
  int(min, max) {
    return random.integer(min, max);
    //return Math.floor(Math.random() * (max - min + 1) + min)
  },
  choice(array){
    return array[ this.int( 0, array.length - 1 ) ];
  }
}


module.exports = Random;
