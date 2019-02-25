// dixon parallax /////////////////////////////////
// app.js
import Mouse from './mouse';
import Ball from './ball';

let myCanvas = document.getElementById('jelly');
let ctx = myCanvas.getContext('2d');
let position = new Mouse(myCanvas);
let balls = [];
// let j = 0;
let mouse = new Ball(0, 0, 30, 'green');

for(var i = 0; i < 50; i++) {
  balls.push[
    new Ball(
        200 + (100 * Math.cos(i * 2 * Math.PI / 50)),
        200 + (100 * Math.sin(i * 2 * Math.PI / 50))
        Math.random()*600,
        Math.random()*600
    )];
}
/*
function ConnectDots(balls) {
    ctx.beginPath();
    ctx.moveTo(balls[0].x, balls[0].y);
    balls.forEach(currentItem => {
      ctx.lineTo(ball.x, ball.y);
    });
    ctx.closePath();
    ctx.stroke();
} */

function ConnectDots(dots) {
    ctx.beginPath();
   
  for(var i = 0; jlen = dots.length; i <=jlen; ++i) {
    var p0 = dots[i + 0 >= jlen ? i + 0 - jlen : i + 0];
    var p1 = dots[i + 1 >= jlen ? i + 1 - jlen : i + 1];
    ctx.quadraticCurveTo(p0.x, p0.y, (p0.x + p1.x) * 0.5, (p0.y + p1.y) * 0.5);
  }
    
   ctx.closePath();
   ctx.stroke();
}


function Render() {
  window.requestAnimationFrame(Render);
 // console.log(position.x, position.y);
 // ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
 //  j++;
  ctx.clearRect(0, 0, 200, 200);
  // drawBall(position.x, position.y, 10);
  mouse.setPosition(position.x, position.y);
  mouse.draw(ctx);
    
  balls.forEach(ball => {
    // drawBall(ball.x/* + j*/, ball.y, 2);
    ball.think(position);
    ball.draw(ctx);
  });
  ConnectDots(balls);
}

Render();


/* myCanvas.onmousemove = (event) => {
  var rect = myCanvas.getBoundingClientRect();
   return {
       x: event.clientX - rect.left,
       y: event.clientY - rect.top
   }; 
}; 
 { x: Math.random() * 600,
    y: Math.random() * 600 }
drawBall(100, 100, 10);
*/

// mouse.js //////////////////////////////////////
export default class Mouse {
  constructor(canvas) {
    this.x = 0;
    this.y = 0;
    var rect = canvas.getBoundingClientRect();
      
    canvas.onmousemove = e => {
       this.x = e.clientX - rect.left;
       this.y = e.clientY - rect.top;
    }
  }
   
}


// ball.js /////////////////////////////////
export default class Ball {
   constructor(x, y, radius, color) {
     this.x = x || 0;
     this.y = y || 0;
       
     this.originalX = x || 0;
     this.originalY = y || 0;
       
     this.vx = 0;
     this.vy = 0;
     this.radius = radius || 2;
     this.color = color || '#ff6600';
     
     this.friction = 0.9;
     this.springFactor = 0.01;
   }
    
  setPosition(x, y) {
     this.x = x;
     this.y = y;
  }
    
  think(mouse) {
      
    let dx = this.x - mouse.x;
    let dy = thiis.y - mouse.y;
      
    dist = Math.sqrt(dx*dx + dy*dy);
    
    if(dist < 30) {
      let angle = Math.atan2(dy, dx);
      // to get vector:
      let tx = mouse.x + Math.cos(angle) * 30;
      let ty = mouse.y + Math.sin(angle) * 30;
      
      this.vx += tx - this.x;
      this.vy += ty - this.y;
    }
      
    // spring force:
    let dx1 = -(this.x - this.originalX);
    let dy1 = -(this.y - this.originalY);
      
    this.vx += dx1 * this.springFactor;
    this.vy += dy1 * this.springFactor;
      
    // friction:
    this.vx *= this.friction;
    this.vy *= this.friction;
      
    // actual speed
    this.x +=  this.vx;
    this.y += this.vy;
  }
    
  spring() {
    
  }
    
   draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
     }
   
   
}
