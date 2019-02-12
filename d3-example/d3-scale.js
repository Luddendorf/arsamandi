var sqrtScale = d3.scaleSqrt()
  .domain([0, 100])
  .range([0, 30]);


sqrtScale(0); // 0

sqrtScale(50);  // 21.21

sqrtScale(100); // 30

var myTimeGraph = d3.scaleTime()
     .domain([new Date(2016, 0, 1),
              new Date(2017, 0, 1)])
     .range([0, 1000]);

myTimeGraph(new Date(2016, 0, 1));  // 0

myTimeGraph(new Date(2016, 6, 1)); // 350.00

myTimeGraph(new Date(2017, 0, 1)); // 1000



var sqrtScale = d3.scaleSqrt()
  .domain([0, 100])
  .range([0, 30]);


sqrtScale(0); // 0

sqrtScale(50);  // 21.21

sqrtScale(100); // 30

var myTimeGraph = d3.scaleTime()
     .domain([new Date(2016, 0, 1),
              new Date(2017, 0, 1)])
     .range([0, 1000]);

myTimeGraph(new Date(2016, 0, 1));  // 0

myTimeGraph(new Date(2016, 6, 1)); // 350.00

myTimeGraph(new Date(2017, 0, 1)); // 1000


// scaleSequential:

var myRainbowGraph = d3.scaleSequential()
     .domain([0, 100])
     .interpolator(d3.interpolateRainbow);

myRainbowGraph(0); // 'rgb(110, 64, 170)';
myRainbowGraph(50); // 'rgb(175, 240, 91)';
myRainbowGraph(100); // 'rgb(110, 64, 170)';

d3.scaleSequential()
  .domain(fruits)
  .interpolator(d3.interpotateRainbow);


var linearScale = d3.scaleLinear()
     .domain([0, 10])
     .range([0, 100]);

linearScale.invert(50); // 5

linearScale.invert(100); // 10

var myScaleQuantize = d3.scaleQuantize()
    .domain([0, 100])
    .range(['violet', 'blue', 'green', 'yellow']);

myScaleQuantize(10); // violet

myScaleQuantize(30); // blue

myScaleQuantize(90); // yellow



var myScaleThreshold = d3.scaleThreshold()
      .domain([0, 50, 100])
      .range(['#ccc', 'lightblue', 'orange', '#ccc']);

myScaleThreshold(-10); // #ccc
myScaleThreshold(20); // lightblue
myScaleThreshold(70); // orange


// timeScale(): //////////////////////
var start = new Date(2015, 0, 1);
var end = new Date(2015, 2, 1);

range = [0, 300];

var dates = [
  new Date(2015, 0, 10),
  new Date(2015, 0, 20),
  new Date(2015, 0, 31),
  new Date(2015, 1, 8),
  new Date(2015, 1, 16)
];

var time = d3.timeScale().domain([start, end])
                         .rangeRound(range);

for(var i = 0; i < dates.length; i++) {
    dates[i] = time(dates[i]);
}

// OMG particles! : //////////////////////////

/* <script src="//d3js.org/d3.v3.min.js"></script> */

var width = Math.max(960, innerWidth),
    height = Math.max(500, innerHeight);

var i = 0;

var svg = d3.select("body").append("svg").attr("width", width)
                                         .attr("height", height);

svg.append("rect").attr("width", width)
                  .attr("height", height)
 .on("ontouchstart" in document ? "touchmove" : "mousemove", particle);

function particle() {
    
   var m = d3.mouse(this);
    
   svg.insert("circle", "rect")
    .attr("cx", m[0])
    .attr("cy", m[1])
    .attr("r", 1e-6)
    .style("stroke", d3.hsl((i = (i + 1) % 360), 1, 0.5))
    .style("stroke-opacity", 1)
  .transition()
     .duration(2000)
     .ease(Math.sqrt)
     .attr("r", 100)
     .style("stroke-opacity", 1e-6)
     .remove();
    
 d3.event.preventDefault();
}

// Simple line and circle: 
var width = 400,
    height = 400;

var svg = d3.select("body").append("svg");

svg.attr("height", height)
   .attr("width", width);

svg.append("line").attr("x1", 20).attr("y1", 30)
                  .attr("x2", 220).attr("y2", 230)
                  .style("stroke", "blue")
                  .style("stroke-width", "3");


// circle:
svg.append("circle").attr("cx", 100).attr("cy", 100)
                    .attr("r", 50);

// rect:
svg.append("rect").style("fill", "none")
                  .style("stroke", "red")
                  .style("stroke-width", "3")
                  .attr("x", 30)
                  .attr("y", 20)
                  .attr("width", 100)
                  .attr("height", 100)
                  .attr("rx", 5);

// polygon:
svg.append("polygon").style("fill", "none")
                     .style("stroke", "green")
                     .style("stroke-width", "3")
                     .attr("points", "50, 250 150,50 250, 250");
                     
                     
d3.axisTop()
d3.axisRight()
d3.axisBottom()
d3.axisLeft()

var prices = [80, 100, 120];

var mainWidth = 500, mainHeight = 300;

var svg = d3.select("svg").attr("width", mainWidth)
                          .attr("height", mainHeight);

var xScale = d3.scaleLinear()
         .domain([0, d3.max(prices)])
         .range([0, mainWidth]);

var yScale = d3.scaleLinear()
         .domain([0, d3.max(prices)])
         .range([0, mainWidth]);

var x_axis = d3.axisBottom().scale(xScale);

var y_axis = d3.axisLeft().scale(yScale);

svg.append("g").attr("transform", "translate(50, 10)")
               .call(y_axis);

var xAsisTranslate = mainHeight - 20;

svg.append("g").attr("transform", "translate(50, " + xAxisTranslate + ")")
               .call(x_axis);
