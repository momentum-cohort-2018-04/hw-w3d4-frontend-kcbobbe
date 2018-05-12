console.log("hi");
var count=0;
class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.screen = canvas.getContext("2d");
        this.player = new Player(this);
        this.coin = new Coin(this);
        this.badCoin = new BadCoin(this);
//collision
        this.bodies = [];
        this.bodies = this.bodies.concat(this.player);
        this.bodies = this.bodies.concat(this.coin);
        // var self = this;
       
    }
    draw(){
        this.screen.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.screen.strokeStyle="#FF0000";
        this.screen.lineWidth = 10;
        this.screen.strokeRect(150,150,200,200);
        // for (var i = 0; i < this.bodies.length; i++) {
        //     (this.bodies[i]).draw();
        // }
        this.player.draw();
        this.coin.draw();
        this.badCoin.draw();
        
    }

    tick(){
        this.update();
        this.draw();
        
        requestAnimationFrame(this.tick.bind(this));
    }
    update(){
        this.player.update();
        // this.coin.update();
        //new
        if (colliding(this.coin.location, this.player.location)){
            console.log(this.coin.location);
            console.log(this.player.location);
            // var counter=document.getElementById("counter");
            // var count="0";
            // counter.innerText=count;
           
            counter=document.getElementById("counter");
            count= count+1;
            counter.innerText=count;
            console.log(count)
            this.coin.update();
            
        }

        if (colliding(this.badCoin.location, this.player.location)){
            console.log(this.badCoin.location);
            console.log(this.player.location);
            // var counter=document.getElementById("counter");
            // var count="0";
            // counter.innerText=count;
           
            counter=document.getElementById("counter");
            count= count-1;
            counter.innerText=count;
            console.log(count)
            this.badCoin.update();
            
        }

        // var notCollidingWithAnything = function(b1) {
        //      return this.bodies.filter(function(b2) {return colliding(b1, b2);}).length === 0;

        //  };
        //      this.bodies = this.bodies.filter(notCollidingWithAnything);
        //      for (var i = 0; i < this.bodies.length; i++) {
        //      this.bodies[i].update();
    }
    
    addBody(body){
        this.bodies.push(body);
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

class Coin {
    constructor (game) {
        this.game = game;
        this.screen = game.screen;
        // this.location={x:230,y:230, size:40}
        this.location={x: (Math.floor(Math.random()*155)+155),y:((Math.floor(Math.random()*155))+155)}
        // this.leftX=(Math.floor(Math.random()*155))+155;
        // this.leftY=(Math.floor(Math.random()*155))+155;
    }
    draw(){
        this.screen.fillStyle="#FFDD00";
        var size = 20;

        // var leftX=(200);
        // var leftY=(200);
        // var leftX=(Math.floor(Math.random()*300));
        // var leftY=(Math.floor(Math.random()*300));
        //this.screen.fillRect(this.leftX,this.leftY,size,size);
        this.screen.fillRect(this.location.x,this.location.y,size,size);

    }
    update(){
        this.location.x=(Math.floor(Math.random()*155))+155;
        this.location.y=(Math.floor(Math.random()*155))+155;
    }
}


class BadCoin {
    constructor (game) {
        this.game = game;
        this.screen = game.screen;
        // this.location={x:230,y:230, size:40}
        this.location={x: (Math.floor(Math.random()*155)+155),y:((Math.floor(Math.random()*155))+155)}
        // this.leftX=(Math.floor(Math.random()*155))+155;
        // this.leftY=(Math.floor(Math.random()*155))+155;
    }
    draw(){
        this.screen.fillStyle="#FF0000";
        var size = 20;

        // var leftX=(200);
        // var leftY=(200);
        // var leftX=(Math.floor(Math.random()*300));
        // var leftY=(Math.floor(Math.random()*300));
        //this.screen.fillRect(this.leftX,this.leftY,size,size);
        this.screen.fillRect(this.location.x,this.location.y,size,size);

    }
    update(){
        this.location.x=(Math.floor(Math.random()*155))+155;
        this.location.y=(Math.floor(Math.random()*155))+155;
    }
}

function colliding(b1, b2) {
    // constructor(b1, b2) {

        var b1centerX= b1.x+(10)
        var b1centerY= b1.y+(10)
    
        var b2centerX= b2.x+(b2.size/2)
        var b2centerY= b2.y+(b2.size/2)
    
        return !( b1 === b2 ||
            b1centerX + 10 < b2centerX - b2.size / 2 ||
            b1centerY + 10 < b2centerY - b2.size / 2 ||
            b1centerX - 10 > b2centerX + b2.size / 2 ||
            b1centerY - 10 > b2centerY + b2.size / 2
        );
    
        // return !( b1 === b2 ||
        //     b1.leftX + b1.size / 2 < b2.leftX - b2.size / 2 ||
        //     b1.leftY + b1.size / 2 < b2.leftY - b2.size / 2 ||
        //     b1.leftX - b1.size / 2 > b2.leftX + b2.size / 2 ||
        //     b1.leftY - b1.size / 2 > b2.leftY + b2.size / 2
        // );
    }
// }

// function addOne() {
//     count=0
//     if (colliding(b1, b2)){
//         counter=getElementById("counter");
//         count+=count;
//         counter.innerText=count;
//         console.log(count)

//     }
// }

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

