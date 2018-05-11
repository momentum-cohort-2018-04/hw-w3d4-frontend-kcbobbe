console.log("hi");

class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.screen = canvas.getContext("2d");
        this.player = new Player(this);
    }
    draw(){
        this.screen.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.screen.strokeStyle="#FF0000";
        this.screen.lineWidth = 10;
        this.screen.strokeRect(150,150,200,200);
        this.player.draw();
    }

    tick(){
        this.update();
        this.draw();
        console.log("tick")
        requestAnimationFrame(this.tick.bind(this));
    }
    update(){
        this.player.update();
    }
}

class Player{
    constructor(game){
        this.game = game;
        this.screen = game.screen;
        this.keyboarder = new Keyboarder();
        this.location={x:230,y:230, size:40}
    }
    draw(){
        this.screen.fillStyle="#FFFF00";
        var size = this.location.size;
        var leftX=this.location.x
        var leftY=this.location.y
        this.screen.fillRect(leftX,leftY,size,size);
    }
    update(){
        if(this.keyboarder.isDown(Keyboarder.KEYS.LEFT) && this.location.x>155){
            this.location.x -=1;

        }
        else if(this.keyboarder.isDown(Keyboarder.KEYS.RIGHT)&& this.location.x<305){
            this.location.x += 1;
        }
        else if (this.keyboarder.isDown(Keyboarder.KEYS.DOWN)&& this.location.y<305){
            this.location.y += 1;
        }
        else if (this.keyboarder.isDown(Keyboarder.KEYS.UP)&& this.location.y>155){
            this.location.y -= 1;
        }


    }
}

class Keyboarder {
    constructor () {
      this.keyState = {}
      
      window.addEventListener('keydown', function(e) {
        this.keyState[e.keyCode] = true
      }.bind(this))
      
      window.addEventListener('keyup', function(e) {
        this.keyState[e.keyCode] = false
      }.bind(this))
    }
    
    isDown (keyCode) {
      return this.keyState[keyCode] === true
    }
    
    on (keyCode, callback) {
      window.addEventListener('keydown', function (e) {
        if (e.keyCode === keyCode) {
          callback()
        }
      })
    }                      
  }
  
  Keyboarder.KEYS = { LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40, S: 83 };


  var canvas = document.getElementById("myCanvas");

  //window.addEventListener('load', function(){
var game = new Game(canvas);
game.tick()

// var canvas= document.getElementById("myCanvas");
// var screen = canvas.getContext("2d");

// var ctx=canvas.getContext("2d");
// ctx.fillStyle="FF0000";
// ctx.strokeRect(250,250,200,200);

