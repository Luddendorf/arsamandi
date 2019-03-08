// fragment.glsl /////////////////////////////
uniform float time;
uniform float progress;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform vec2 pixels;
uniform vec2 uvRate1;
uniform vec2 acce1;

varying vec2 vUv;
varying vec2 vUv1;
varying vec4 vPosition;

void main() {
    vec2 uv = glFragCoord.xy/pixels.xy;
    
    float p = fract(progress);
    
    float p1 = p - 1.0;
    // to make distortions:
    
    vec2 position = step(0.0, p) * uv + step(0.0, -p) * (1.0 - uv);
    
    float dx1 = p * 0.8;
    
    float vert = abs(p * 0.3);
    
    dx1 -= step(0.2 - vert, position.x / 2.0) * 0.3 * p;
    dx1 -= step(0.4 - vert, position.x / 2.0) * 0.3 * p;
    dx1 += step(0.6 - vert, position.x / 2.0) * 0.3 * p;
    dx1 += step(0.8 - vert, position.x / 2.0) * 0.3 * p;
    
    // TEXTURE 1 : ////////////////////////////////////////////////////////////
    vec4 tex1 = texture2D(texture1, vec2(vUv1.x + dx1, vUv1.y));
    
    
    // float bounds = step(0.0, p) * uv + step(0.0, -p) * (1.0, -uv);
    float bounds = step(0.0, 1.0 - (uv.x/2.0 + p)) * step(0.0, uv.x/2 + p);
    
   // gl_FragColor = vec4(uv, 0.0, 1.0);
   vec4 fcolor = tex1 * bounds;
    
    
   // WE MAKE SECOND TEXTURE: //////////////////////////////////////////
   float dx2 = p1*0.8;
    
   float vert1 = abs(p1*0.3);
    
   dx2 -= step(0.2 - vert1, position.x / 2.0) * 0.3 * p1;
   dx2 -= step(0.4 - vert1, position.x / 2.0) * 0.3 * p1;
   dx2 += step(0.6 - vert1, position.x / 2.0) * 0.3 * p1;
   dx2 += step(0.8 - vert1, position.x / 2.0) * 0.3 * p1;
   
   // we replace p1 with dx2! :
   vec4 tex2 = texture2D(texture2, vec2(vUv1.x + dx2, vUv1.y));
  
   
   float bounds1 = step(0.0, 1.0 - (uv.x/2.0 + p1)) * step(0.0, uv.x/2 + p1);
  
   
   fcolor += tex2*bounds1;
   
    
   gl_FragColor = fcolor;
    
}



// app.js ////////////////////////////////////
import * as THREE from 'three';
import { TimelineMax } from 'gsap';
var OrbitControls = require('three-orbit-controls')(THREE);
import fragment from './fragment.glsl';
import vertex from './vertex.glsl';

let gallery = [
  THREE.ImageUtils.loadTexture('img/1.jpg'),  
  THREE.ImageUtils.loadTexture('img/2.jpg'),
  THREE.ImageUtils.loadTexture('img/3.jpg'),
  THREE.ImageUtils.loadTexture('img/4.jpg')
];

let camera, pos, controls, scene, renderer, geometry, geometry1, material, plane, tex1, tex2;
let destination = { x: 0, y: 0 };
let textures = [];

function init() {
    
scene = new THREE.Scene();  

renderer = new THREE.WebGLRenderer();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

var container = document.getElementById('container');
container.appendChild(renderer.domElement);

camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.001, 100
);

camera.position.set( 0, 0, 1);



material = new THREE.ShaderMaterial({ 

 side: THREE.DoubleSide,
 uniforms: {
   time: { type: 'f', value: 0 },
   pixels: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
   accel: { type: 'v2', value: new THREE.Vector2(0.5, 2) },
   progress: { type: 'f', value: 0 },
   uvRate1: { value: new THREE.Vector2(1, 1) },
   texture1: { value: THREE.ImageUtils.loadTexture('img/1.jpg') },
   texture2: { value: THREE.ImageUtils.loadTexture('img/2.jpg') },
       
   },
    
   vertexShader: vertext,
   fragmentShader: fragment
});

   plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1, 1), material);
   scene.add(plane);

   resize();

}

 window.addEventListener('resize', resize);

function resize() {
    
  var w = window.innerWidth;
    
  
}
