var Random = require('./random-helper');
var Rectangle = require('./rectangle');
var Node = require('./node');

class Generator{
  constructor(x, y, w, h, maxLevel = 5){

    this.maxLevel = maxLevel;

    //The initial container, with walls
    this.rootContainer = new Rectangle(x + 1, y + 1, w - 2, h - 2);

    this.rows = h;
    this.cols = w;

    this.map = [];

    //fill all the tiles with walls
    for(let h = 0; h < this.rows; h++ ){
      for(let w = 0; w < this.cols; w++ ){
        let index = this.cols * h + w;
        this.map[index] = 1;
      }
    }

    //the tree
    this.tree = this.devide(this.rootContainer, 0);

    //get the leafs containers
    this.rooms = this.tree.getLeafs();

    //create the rooms
    this.createRooms();

    //connecte all the rooms
    this.connectRooms(this.tree);

  }
  randomSplit(container){
    var r1, r2;

    var splitVertical = Random.int(0, 1);

    if(container.w > container.h && container.h / container.h >= 0.05){
      splitVertical = true;
    } else if(container.h > container.w && container.w / container.h >= 0.05){
      splitVertical = false;
    }

    if (splitVertical) {
      // Vertical
      var w = Random.int(container.w * 0.3, container.w * 0.6);
      r1 = new Rectangle(container.x, container.y, w, container.h);
      r2 = new Rectangle(container.x + w, container.y, container.w - w, container.h);

    } else {
      //Horizontal
      var h = Random.int(container.h * 0.3, container.h * 0.6);
      r1 = new Rectangle(container.x, container.y, container.w, h);
      r2 = new Rectangle(container.x, container.y + h, container.w, container.h - h);

    }

    return [r1, r2]
  }
  //devide the container in 2 parts recursively
  devide(container, level){
    var root = new Node(container);

    if(level < this.maxLevel){
      var sr = this.randomSplit(container);
      root.A = this.devide(sr[0], level+1);
      root.B = this.devide(sr[1], level+1);
    }

    return root;
  }
  //create the rooms inside the containers
  createRooms(){

    for(let i = 0; i < this.rooms.length; i++ ){

      //random choose the size of the rooms
      var w = Random.int(this.rooms[i].w * 0.5, this.rooms[i].w * 0.9);
      var h = Random.int(this.rooms[i].h * 0.5, this.rooms[i].h * 0.9);
      var x = Random.int(this.rooms[i].x, (this.rooms[i].x + this.rooms[i].w) - w);
      var y = Random.int(this.rooms[i].y, (this.rooms[i].y + this.rooms[i].h) - h);

      //create the room in the tile map
      for(let hi = y; hi < y + h; hi++ ){
        for(let wi = x; wi < x + w; wi++ ){
          let index = this.cols * hi + wi;
          this.map[index] = 0;
        }
      }

    }

  }

  //create the halls
  connectRooms(node){
    //stop if the node doesn't have siblings
    if(node.A == null || node.B == null) return false;

    //get the center of the first container
    var x1 = node.A.leaf.getCenterX() >> 0;
    var y1 = node.A.leaf.getCenterY() >> 0;

    //debug for mark the center of the container
    // let index = this.cols * y1 + x1;
    // this.map[index] = 1;

    //get the center of the second container
    var x2 = node.B.leaf.getCenterX() >> 0;
    var y2 = node.B.leaf.getCenterY() >> 0;

    //debug for mark the center of the container
    // let index2 = this.cols * y2 + x2;
    // this.map[index2] = 1;

    //create the vertical hall in the tile map
    for(let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++ ){
      let index = this.cols * Math.max(y1, y2) + x;
      this.map[index] = 0;
    }

    //create the horizontal hall in the tile map
    for(let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++ ){
      let index = this.cols * y + Math.max(x1, x2);
      this.map[index] = 0;
    }

    //create rooms recursively
    this.connectRooms(node.A);
    this.connectRooms(node.B);

  }
}

module.exports = Generator;
