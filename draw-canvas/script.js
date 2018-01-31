
  
  class tile {
      constructor(x, y, w, h) {
          this.x = x;
          this.y = y;
          this.w = w;
          this.h = h;
      }
  }

  function draw() {
    const W = 50;
    const H = 50;
    
    var canvas = document.getElementById('a');
    var x = 10;
    var y = 10;
    for(let i = 0; i < 6; i ++){
        x = 10;
        for(let j = 0; j < 6; j++){
            var tile1 = new tile(x, y, W, H)
     
            var ctx = canvas.getContext('2d');
            var rectangle = new Path2D();
            rectangle.rect(tile1.x, tile1.y, tile1.w, tile1.h);
            ctx.stroke(rectangle);
            
            x = x + W;

        }
        debugger
        y = y + H;
      
    }
  /*    let tile1 = new tile(10, 10, W, H);
      var canvas = document.getElementById('a');
      var ctx = canvas.getContext('2d');
      var rectangle = new Path2D();
      rectangle.rect(tile1.x, tile1.y, tile1.w, tile1.h);
      ctx.stroke(rectangle); */
  }
  draw();