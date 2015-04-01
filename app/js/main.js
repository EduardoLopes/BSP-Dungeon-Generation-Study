var Generator = require('./generator');

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = 320;
canvas.height = 320;
var TILE_SIZE = 8;

var nodes = new Generator(0,0,canvas.width / TILE_SIZE >> 0, canvas.height / TILE_SIZE >> 0, 5)
var a = 0;

function drawTree(node){

  ctx.fillStyle = '#181818';
  a = 0;
  for(let h = 0; h < node.rows; h++ ){
    for(let w = 0; w < node.cols; w++ ){
      let index = node.cols * h + w;
      let y = index / node.cols >> 0;
      let x = (index - y * node.cols);
      if(node.map[index] == 1){
        ctx.fillRect( x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
      a++;
    }
  }

  for (var i =  0; i < node.rooms.length; i++) {

    ctx.strokeStyle = 'hsla('+a * 32+', 50%, 80%, 1)';
    ctx.fillStyle = 'hsla('+a * 32+', 50%, 50%, 0.2)';
    ctx.beginPath();
    //ctx.rect( node.rooms[i].x * TILE_SIZE, node.rooms[i].y * TILE_SIZE, node.rooms[i].w* TILE_SIZE, node.rooms[i].h* TILE_SIZE );
    // ctx.fillRect( (node.rooms[i].x * TILE_SIZE), (node.rooms[i].y * TILE_SIZE), node.rooms[i].w * TILE_SIZE, node.rooms[i].h * TILE_SIZE);
    // ctx.stroke();

    // ctx.fillStyle = '#181818';
    // ctx.fillText(node.rooms[i].x, node.rooms[i].x * TILE_SIZE, node.rooms[i].y * TILE_SIZE);

    a++;

  };

}
ctx.fillStyle = '#fff';
ctx.fillRect(0,0,canvas.width, canvas.height);
drawTree(nodes);


function update(){
  ctx.fillStyle = '#fff';
  ctx.fillRect(0,0,canvas.width, canvas.height);
  var nodes = new Generator(0,0,canvas.width / TILE_SIZE >> 0, canvas.height / TILE_SIZE >> 0, 5)
  a = 0;
  drawTree(nodes);
  //requestAnimationFrame(update);
}

//requestAnimationFrame(update);

canvas.onclick = update;
