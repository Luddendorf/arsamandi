/* body {
    
  scroll-snap-type: mandatory;
  scrill-behavior: smooth; */
    
 .section {
    height: 100vh;
    width: 100%;
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
 /*  scroll-snap-coordinate: 0% 0%; */
}


// npm install gsap 
// 
import NormalizeWheel from './lib/normwheel.js';
import { TimelineMax } from 'gsap';

// or, better: 
import { TweenLite } from 'gsap';

let currentScroll = 0;
// let timeline = new TimelineMax();
let timeline = new TweenLite();


document.addEventListener('wheel', function(event) {
    
  event.preventDefault();
    
  let norm = NormalizeWheel(event);
    
  currentScroll += norm.spinY*10;
    
  timeline.to('.scroll-container', 0.5, {
      y: currentScroll,
      overflow: 5
  });
   
});
