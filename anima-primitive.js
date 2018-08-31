(function() {

var el = document.getElementById('box');

el.onclick = function() {
  
  this.style.backgroundColor = 'yellow';
};

var buttons = document.getElementsByTagName('button');

for(var i = 0, len = buttons.length; i < len; i++) {
   
   buttons[i].onclick = function() {
     
      if(this.id === 'day') {
         document.body.className = 'day';
      } else if (this.id === 'night'){
        document.body.className = 'night';
      }
   };
};
})();

.night {
  color: white;
  backgroundd-color: black;
}

.day {
  color: black;
  backgroundd-color: white;
}

// moving circle:

#contentContainer {
  width:550px;
  height: 350px;
  border: 15px green solid;
  overflow: hidden;
  background-color: #ccc;
  cursor: pointer;
}

#thing {
 width: 75px;
 height: 75px;
 background-color: rgb(255, 207, 0);
 border-radius: 50%;
 border: 15px rgb(255, 199, 0) solid;

  transform: translate3d(50px, 50px, 0);

  transition: transform 0.3s cubic-bezier(0, 0.64, 0.52, 0.24);
}

// script
  var theThing = document.querySelector('#thing');

  var container = document.querySelector('#contentContainer');

 container.addEventListener('click', getClickPosition, false);

  function getClickPosition(e) {
    
    var parentPosition(e) = getPosition(container);
    
    var xPosition = e.clientX - parentPosition.x - (theThing.offsetWidth / 2);
    var yPosition = e.clientY - parentPosition.y - (theThing.offsetHeight / 2);
    
    var translate3dValue = "translate3d(" + xPosition + "px," + 
          yPosition + "px, 0);"
    
    theThing.style.transform = translate3dValue;
  }

 function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
   
   while(element) {
     xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
     yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
     
     element.offsetParent;
   }
   
   return {
    x: xPosition;
    y: yPosition;
   }
     
      
   }
 }

 // moving elements
 window.onload = function() {
  
   var ltpc = document.getElementById('ltpcanvas');
   var context = ltpc.getContext('2d');
   
   var radius = 50;
   var x = 50;
   var y = 50;
   
   var scalex = 2;
   var scaley = 2;
   var changex = 75;
   var changey = 75;
   
   var skewx = 0;
   
   var skewy = 0;
   
   context.arc(x, y, radius, 0, 2*Math.PI, false);
   
   context.transform(scalex, skewx, skewy, scaley, changex, changey);
   
   context.arc(x, y, radius, 0, 2*Math.PI, false);
   
   context.fill();
   
 }
 
 <canvas id="paper" width="500" height="500">
       
 </canvas>

// some js:

window.onload = function() {
   
  var canvas = document.getElementById('paper'),
      
    context = canvas.getContext('2d');
  
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  context.fillStyle = "red";
  context.fillRect(20, 20, 50, 50);
  
  c.strokeStyle = "white";
  c.lineWidth = 10;
  c.strokeRect(20, 20, 50, 50);
  
  
  c.strokeStyle = "blue";
  c.lineWidth = 5;
  
  c.beginPath();
  c.moveTo(100, 100);
  
  c.lineTo(150, 200);
  c.lineTo(200, 200);
  c.lineTo(200, 250);
  c.lineTo(100, 250);
  c.closePath();
  c.stroke;
  
  c.fill();
  
  c.fillStyle = "white";
  c.font = "50px Helvetica";
  c.fillText("Hello", 300, 200);
  
  
  c.beginPath();
 // c.moveTo(200, 340);
  c.arc(200, 300, 50, 0, Math.PI * 2, false);
  c.fill();
  
  var posX = 0,
      posY = 200;
  
  setInterval(function()  {
    
    posX += 4;
    
    if(posX > 200) {
      posY += 3;
      posX = 200;
    }
    
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    c.fillStyle = 'white';
    c.beginPath();
    c.arc(posX, posY, 50, 0, Math.PI *2, false);
    c.fill();
    
  }, 30);
};

motion // index.html

window.onload = function() {
  
  var canvas = document.createElement('canvas'),
      c = canvas.getContext('2d'),
      particles = {},
      particleIndex = 0,
      particleNum = 10;
  
  canvas.width = 400;
  canvas.height = 400;
  
  document.body.appendChild(canvas);
  
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  
  var posX = canvas.width / 2,
      posY = canvas.height / 2,
      vx = 5,
      vy = -10,
      gravity = 1;
  
  setInterval(function(){
    
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    
    posX += vx;
    posY += vy;
    
   // vx *= 0.94;
   // vy *= 0.94;
    
    if(posY > 300) {
      vy *= -1;
      vx *= -0.5;
      posY = 300; 
    }
    
    vy += gravity;
    
    c.fillStyle = 'white';
    c.fillRect(posX, posY, 10, 10);
    
  }, 30);
  
};


// particle


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
  this.maxLife = Math.random() * 30 + 10;
}
 
 Particle.prototype.draw = function() {
   this.x += this.vx;
   this.y += this.vy;
   
   if(Math.random() < 0.1) {
     this.vx = Math.random() * 10 - 5;
   }
   
// this.vy += this.gravity;
   
   this.life++;
   
   if(this.life >= this.maxLife) {
      
     delete particles[this.id];
   }
   
   c.fillStyle = 'rbga(255, 255, 255, 0.5)';
   c.fillRect(this.x, this.y, 10, 10);
 };



setInterval(function() {
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height);
  
  for (var i = 0; i < particleNum; i++) {
  
  new Particle();
  }
  
  for (var i in particles) {
    
    particles[i].draw();
  }
  
}, 30);











