class Rectangle{
  constructor(x, y, w, h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  getHalfDimentionX(){
    return this.w / 2;
  }
  getHalfDimentionY(){
    return this.h / 2;
  }
  getCenterX(){
    return this.x + (this.w / 2);
  }
  getCenterY(){
    return this.y + (this.h / 2);
  }
}

module.exports = Rectangle;
