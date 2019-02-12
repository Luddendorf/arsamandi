
var fruits = ['Banana', 'Orange', 'Apple'];

d3.selectAll('li').data(fruits).text(function(d) { return d; });

// Enter Update Exit:

d3.select('ul').selectAll('li').data(fruits).enter().append('li');
d3.select('ul').selectAll('li').data(fruits).text(function(d) {
    return d;
});
d3.select('ul').selectAll('li').data(fruits).exit().remove();

var fruits = [{name: 'Banana', price: 100},
              {name: 'Orange', price: 200},
              {name: 'Lemon', price: 300}];
// Enter
d3.select('div.diagram').selectAll('div').data(fruits).enter()
    .append('div').attr('class', 'item')
    .append('div').attr('class', 'data')
    .append('span');

// Update:
d3.select('div.diagram').selectAll('div.item').data(fruits)
  .select('div').style('width', function(d) { return (d.price * 3) + 'px'; })
  .select('span').text(function(d) { return d.price; });

// Exit:
d3.select('div.diagram').selectAll('div.item').data('fruits').exit().remove();

var numbers = [3, 8, 21, 13, 1, 2, 5];

d3.max(numbers); // 21

d3.min(numbers); // 1

d3.extent(numbers); // 1,21

d3.sum(numbers); // 53

d3.median(numbers); // 5

d3.mean(numbers); // 7.57142

d3.quantile(data.sort(d3.ascending), 0.25)); // 2.5

numbers.sort(d3.ascending); // 1,2,3,5,8,13,21

numbers.sort(d3.descending); // 21,13,8,5,3,2,1

d3.bisect(numbers.sort(d3.ascending), 11); // 5


// sorting data: //////////////////////////
d3.select("div.diagram").selectAll("div.item")
  .filter(function (d, i) {
    if(company && company !== 'All')
       return !(d.company == company);
    else
       return false;
})
  .classed("unselected", true);

// sorting of data using comparators:

var fruits = [{name: 'Banana', price: 100, country: 'Egypt'},
              {name: 'Orange', price: 80, country: 'Turkey'},
              {name: 'Lemon', price: 60, country: 'Greece'}];

function showGraph(fruits, comparator) {
    
 d3.select('div.diagram').selectAll('div.item').data(fruits).enter()
   .append('div').attr('class', 'item')
   .append('span');
    
 d3.select('div.diagram').selectAll('div.item').data(fruits)
   .attr('class', 'item').style('width', function(d) { return (d.price * 6) + 'px'; })
   .select('span').text(function(d) { return d.name; });
    
 d3.select('div.diagram').selectAll('div.item').data(fruits).exit().remove();
    
  if(comparator) {
      d3.select("div.diagram").selectAll("div.item").sort(comparator);
  }
}

var compareByName = function(a, b) {
    return a.name < b.name ? -1 : 1;
};

var compareByPrice = function(a, b) {
    return a.price < b.price ? -1 : 1;
};

var compareByCountry = function(a, b) {
    return a.country < b.country ? -1 : 1;  
};

function sort() {
   var comparator = document.getElementById("select").value;
    
   switch(comparator) {
       case "compareByCountry" :
         comparator = compareByCountry;
         break;
       case "compareByName" :
         comparator = compareByName;
         break;
       case "compareByPrice" :
         comparator = compareByPrice;
         break;
   }
    
  showGraph(fruits, comparator);
}

showGraph(fruits);


myScale.domain([0, 100])
       .range([0, 800]);

var linearScale = d3.scaleLinear()
      .domain([0, 10])
      .range([0, 600]);

linearScale(0);
linearScale(5);
linearScale(10);




// bar chart:
var prices = [80, 100, 56, 120, 180, 30, 40, 120, 160];

var prices = [1, 2, 3, 4, 5, 6];

var svgWidth = 500;
var svgHeight = 300;
var barPadding = 5;

var barWidth = (svgWidth / prices.length);

var svg - d3.select('svg')
           .attr('width', svgWidth)
           .attr('height', svgHeight);

var yScal = d3.scaleLinear()
            .domain([0, d3.max(prices)])
            .range([0, svgHeight]);

var barChart = svg.selectAll("rect")
      .data(prices)
      .enter()
      .append("rect")
      .attr("y", function(d) {
         // return svgHeight - d
         return svgHeight - yScale(d)
      })
      .attr("height", function(d) {
         // return d;
         return yScale(d)
      })
      .attr("width", barWidth - barPadding)
      .attr("transform", function(d, i) {
        var translate = [barWidth * i, 0];
        return "translate(" + translate + ")";
      });

var text = svg.selectAll("text")
    .data(prices)
    .enter()
    .append("text")
    .text(function(d) {
        return d;
    })
    .attr("y", function(d, i) {
        return svgHeight - d - 2;
    })
    .attr("x", function(d, i) {
        return barWidth * i;
    })
    .attr("fill", "#A64C38");





