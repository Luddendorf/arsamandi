window.onload = function() {
var canvas = document.getElementById('myCan');
if(canvas.getContext) {
   /* var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.font = '50px Calibri';
    var myText = "Welcome to paradise!";
    ctx.fillText(myText, 50, 50, 400); */
    var ctx = canvas.getContext('2d');
    
    var newPortrait = document.getElementById('canvas__image');
    
    ctx.drawImage(newPortrait, 0, 0);
    
    
    
    
    
    
    var img = new Image();
    img.onload = function() {
        console.log('Now we can do it!');
        
        ctx.drawImage(img, 0, 0);
    
    // we add some text over image:    
    ctx.fillStyle = 'brown';
    ctx.font = 'Montserrat 50px';
    var myLegend = 'This is marked.';
    ctx.fillText(myLegend, 50, 250, 400);
    }
    img.src = 'img/portrait.jpg';
       
}
}

// Scaling images: ///////////////////////////////
window.onload = function() {
var canvas = document.getElementById('myCanvas');

if(canvas.getContext) {
   var ctx = canvas.getContext('2d');
    
   var myPicture = new Image();
   var myFrame = new Image();
   var pictureW = 412;
   var pictureH = 400; 
    
   myPicture.onload = function() {
     
    ctx.drawImage(myPicture, 50, 112, pictureW, pictureH, 40, 40, 210, 120);
    ctx.fillStyle = "green";
    ctx.font = "Montserrat 50px";
    var myMessage = "Here comes Freddy.";
    ctx.fillText(myMessage, 50, 250, 400);
       
    // adding frame to image: ////////////////////////////
    ctx.drawImage(document.getElementById('canvas__frame'), 0, 0, 300, 200);
   }
   myPicture.src = "img/portrait.jpg";
   myFrame.src = "img/frame.jpg";
    
    
   
}
}

// More complext drawing:
window.onload = function() {
   var canvas = document.getElementById('myCan');
   if(canvas.getContext) {
      var ctx = canvas.getContext('2d');
       
     ctx.scale(0.3, 0.3);
     ctx.save();
     
     ctx.fillStyle = "green";
     ctx.arc(120, 60, 50, 0, 2*Math.PI);
     ctx.fill();
     ctx.restore();
     
     ctx.rotate(33);
       
     ctx.save();
     // TRANSLATE 
     ctx.translate(50, 50);
       
     ctx.fillStyle = "yellow";
     ctx.globalAlpha = 0.5;
       
     ctx.beginPath();
     ctx.arc(320, 160, 70, 0, 2*Math.PI);
     ctx.fill();
       
     ctx.restore();
     
     ctx.beginPath();
     ctx.arc(220, 260, 70, 0, 2*Math.PI);
     ctx.fill();
       
     // Rotate:
     ctx.translate(50, 50);
     ctx.rotate(45 *  Math.PI / 180);
     ctx.fillStyle = "red";
     ctx.fillRect(220, 320, 200, 100);
       
     // Custom transform:
     ctx.restore();
     var bgcol = 0;
     ctx.fillStyle = "brown";
     for(var x = 0; x <= 10; x++) {
         
     bgcol = Math.floor(255/10*x);
     ctx.fillStyle = "rgb(" + bgcol + "," +bgcol + "," + bgcol + ")" ;
     ctx.fillRect(300, 200, 200, 100);
     
     ctx.setTransform(x, 0, 0, x, x);
     }
       
   }
}

<body>

  <img src="img/portrai.jpg" id="canvas__image">

  <canvas id="myCanvas" width="1000" height="1000"></canvas>
</body>
