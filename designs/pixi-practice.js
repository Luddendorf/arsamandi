// npm install pixi.js /////////////////

// app.js ///////////////////////////////
import * as PIXI from 'pixi.js';
import Particle from './Particle';

class ParticleText {
  constructor() {

    this.app = new PIXI.Application(window.innerWidth, window.innerHeight, {
      autoresize: true
    });
    document.body.appendChild(this.app.view);

     this.particleSize = 10;

    this.particles = [];
    this.mouse;
    this.addObjects();
  }

  addObjects() {
    PIXI.loader.add('bunny', 'bunny.png').load((loader, resources) => {

      // This creates a texture from a 'bunny.png' image:
/*     this.bunny = new PIXI.Sprite(resources.bunny.texture);

     this.bunny.texture.frame = new PIXI.Rectangle(132, 132, 132, 132);
   
     // Setup position of the bunny:
     this.bunny.x = this.app.renderer.width / 2;
     this.bunny.y = this.app.renderer.height / 2;
   
     // Rotate around the center:
     this.bunny.anchor.x = 0.5;
     this.bunny.anchor.y = 0.5;
   
     // Add bunny to the scene we are building:
     this.app.stage.addChild(this.bunny); */
     

     for(var i = 0; i < 50; i += 1) {
       for(var j = 0; j < 50; j += 1) {
        // i, j, size:
        let p = new Particle(i * this.particleSize, j * this.particleSize,
          resources.bunny.texture, this.particleSize);
        this.particles.push(p);


        this.app.stage.addChild(p.sprite);
       }
     }
   
    console.log(this.particles);

     this.animate();
     // Listen for frame updates:
    });
  }

  animate() {
      this.app.ticker.add(() => {
        
        this.mouse = this.app.renderer.plugins.intercation.mouse.global;

        this.particles.forEach(p => {
          p.update(this.mouse);
        })
      // this.bunny.rotation += 0.01;
    });
  
  }
}

let myParticleText = new ParticleText();



// Particle.js  ///////////////////////////////////////////////////////
export default class Particle {

  constructor(x, y, texture, size) {
    this.x = x;
    this.y = y;

    this.sprite = new PIXI.Sprite(new PIXI.Texture(texture));

    this.sprite.texture.frame = new PIXI.Rectangle(x, y, size, size);

    this.sprite.x = x;
    this.sprite.y = y;

    this.speedX = 0;
    this.speedY = 0;

    this.radius = 100;

    this.dirX = Math.random() - 0.5;
    this.dirY = Math.random() - 0.5;
  }

  update(mouse) {

    let distanceX = mouse.x - this.sprite.x;
    let distanceY = mouse.y - this.sprite.y;

    let distance = Math.sqrt(distanceX**2 + distanceY**2);

    let normalX = distanceX/distance;
    let normalY = distanceY/distance;

    // this.sprite.x += this.dirX;
    // this.sprite.y += this.dirY;

    if(distance < this.radius) {
     this.sprite.x += this.dirX;
     this.sprite.y += this.dirY;
    }
   }
}
