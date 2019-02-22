window.onload = function() {
var canvas = document.getElementById('myCan');
if(canvas.getContext) {
   
  }
}

// Grid system:
const count = 5;
const points = [];

for(let x = 0; x < count; x++) {
  for(let y = 0; y < count; y++) {
      const u = count <= 1 ? 0.5 : { x / (count - 1)};
      const v = count <= 1 ? 0.5 : { y / (count -1)};
      points.push([ u, v ]);
  }
  
}

const sketch = () => {
   const createGrid = () => {
     const points = [];
     const count = 5;
     for(let x = 0; x < count; x++) {
       for(let y = 0; y < count; y++) {
         const u = count <= 1 ? 0.5 : x / (count - 1);
         const v = count <= 1 ? 0.5 : y / (count - 1);
         points.push([ u, v ]);
       }
     }
     return points;
   };
    
 const points = createGrid();
    
 return({ context, width, height }) => {
  context.fillStyle = 'white';
  context.fillRect(0, 0, width, height);
     
  points.forEach(([ u, v ]) => {
     const x = u * width;
     const y = v * height;
      
     context.beginPath();
     context.arc(x, y, 100, 0, Math.PI * 2, false);
     context.strokeStyle = "black";
     context.lineWidth = 40;
     context.stroke();
  });
 };
};


/* load-asset - a utility to load images and other assets with async/await
point-in-polygon - test if 2D point is within a polygon
nice-color-palettes - a collection of 1000 beautiful color palettes
gl-matrix - 2D and 3D vector & matrix math utilities
poisson-disk-sampling - can be used for 2D and 3D object placements
delaunay-triangulate - 2D and 3D triangulation
simplify-path - simplify a 2D polyline path
chaikin-smooth - smooth a 2D polyline path
earcut - fast 2D and 3D polygon triangulation
voronoi-diagram - for 2D and 3D voronoi diagrams
svg-mesh-3d - convert SVG path string to a 3D mesh
eases - a set of common easing functions
bezier-easing - create cubic bezier curve functions
glsl-noise - noise functions as a GLSL module (used with glslify)
glsl-hsl2rgb - HSL to RGB function as a GLSL module (used with glslify)

npm install canvas-sketch-util */


const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');

const margin = 500;

