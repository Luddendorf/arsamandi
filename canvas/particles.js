<canvas id="paper" width="500" height="500">
  Get chrome...
</canvas>

window.onload = function() {

 var canvas = document.getElementById('paper'),
     c = canvas.getContext('2d'),
     TWO_PI = Math.PI * 2;
 
 c.fillStyle = 'black';
 c.fillRect(0, 0, canvas.width, canvas.height);
 
 c.fillStyle = 'red';
 c.fillRect(20, 20, 50, 50);
 
 c.strokeStyle = 'white';
 c.lineWidth = 10;
 c.strokeRect(20, 20, 50, 50);
 
 c.strokeStyle = '#ccc';
 c.lineWidth = 5;
 
 c.beginPath();
 c.moveTo(100, 100);
 c.lineTo(150, 200);
 c.lineTo(200, 200);
 c.lineTo(200, 250);
 c.lineTo(100, 250);
 c.closePath();
 c.stroke();
 c.fill();
 
 c.fillStyle = 'white';
 c.font = '20px Helvetica';
 c.fillText('Hello', 300, 200);
 
 c.beginPath();
 c.moveTo(200, 340);
 c.arc(200, 300, 50, Math.PI / 2, Math.PI, false);
 c.fill();
 
 vas posX = 0,
     posY = 200;
 
 setInterval(function() {
   
   posX += 4;
   
   if(posX > 200) {
     
     posY += 3;
     posX = 200;
   }
   
   c.fillStyle = 'rgba(0, 0, 0, 0.05)';
   c.fillRect(0, 0, canvas.width, canvas.height);
   
   c.fillStyle = 'white';
   c.beginPath();
   c.arc(posX, posY, 50, 0, TWO_PI, false);
   c.fill();
   
   
    
 }, 30);
};

// MOTION OF PARTICLES:

window.onload = function() {
 
 var canvas = document.createElement("canvas"),
          c = canvas.getContext('2d'),
  particles = {},
  particleIndex = 0,
  particleNum = 3;
          
     canvas.width = 400;
     canvas.height = 400;
     
    document.body.appendChild(canvas);
    
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.widthh, canvas.height);
    
    var posX = 20,
        posY = canvas.height / 2,
        vx = 5,
        vy = -10,
        gravity = 1;
        
    setInterval(function() {
      c.fillStyle = 'rgba(0, 0, 0, 0.2)';
      c.fillRect(0, 0, canvas.width, canvas.height);
      posX += vx;
      posY += vy;
      
      if(posY > 300) {
        vy *= -0.5;
        vx *= 0.5;
        posY = 300;
      }
      
      vy += gravity;
      
      c.fillStyle = 'white';
      c.fillRect(posX, posY, 10, 10);
      
      
    }, 30);
 
 
   function Particle() {
     
     this.x = canvas.width / 2;
     this.y = canvas.height / 2;
     this.vx = Math.random() * 10 - 5;
     this.vy = Math.random() * 10 - 5;
     this.gravity = 0.3;
     particleIndex++;
     particles[particleIndex] = this;
     this.id = particleIndex;
     this.life = 0;
     this.maxLife = Math.random() * 30 + 50;
     this.color ='hsl(' + parseInt(Math.random() * 360, 10) + 
       + ", 100%, 50%, 0.2";
   }
   
   Particle.prototype.draw = function() {
     
     this.x += this.vx;
     this.y += this.vy;
     
     if(Math.random() < 0.1) {
       this.vx = Math.random() * 10 - 5;
       this.vy = Math.random() * 10 - 5;
     }
     
     // this.vy += this.gravity;
     this.life++;
     
     if(this.life >= this.maxLife) {
        delete particles[this.id];
     }
     
     c.fillStyle = this.color;
     c.fillRect(this.x, this.y, 10, 10);
   };
   
   setInterval(function() {
   
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    
     for(var i = 0; i < particleNum; i++) {
     
       new Particle();
     }
    
    c.globalCompositeOperation = 'lighter';
    for(var i in particles) {
      particles[i].draw();
    }
   }, 30);
};
















