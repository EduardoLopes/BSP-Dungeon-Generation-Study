var Rectangle = require('./rectangle');

class Node extends Rectangle{
  constructor(leaf){

    this.A = null;
    this.B = null;
    this.leaf = leaf;
    this.sibling = null;
    this.corridor = null;
    this.parent = null;
    
  }
  getLeafs(){
    if (this.A === null && this.B === null){
      return [this.leaf]
    }else{
      return [].concat(this.A.getLeafs(), this.B.getLeafs())
    }
  }
}



module.exports = Node;
