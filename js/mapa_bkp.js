// Mapa JS

var width = 800,
height = 600;

var color = d3.scaleThreshold()
.domain([4, 5, 7, 8, 10, 11, 12, 13, 17, 18])
    // .domain(d3.range(3, 25))
    .range(d3.schemeYlGn[9]);

    var svg = d3.select("#corpo").append("svg")
    .attr("width", width)
    .attr("height", height);

    var projection = d3.geoMercator()
    .center([-40, -30])             
    .rotate([4.4, 0])               
    .scale(750)                     
    .translate([width / 2, height / 1.2]);  

    var path = d3.geoPath()
    .projection(projection);

    d3.queue()
    .defer(d3.json, "br-min.json")
    .await(ready);

    function ready(error, br_states) {

      if (error) return console.error(error);

      var states = topojson.feature(br_states, br_states.objects.states);

      svg.append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(states.features)
      .enter()
      .append("path")
      .style('fill', function(d){return color(d.properties.name.replace(/\s+/g, '').length);})
      .attr("d", path)

      .on("mouseover", function(d) {
        var xPosition = d3.mouse(this)[0];
        var yPosition = d3.mouse(this)[1] - 30;

        svg.append("text")
        .attr("id", "tooltip")
        .attr("x", xPosition)
        .attr("y", yPosition)
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .text(d.properties.name);

        d3.select(this)
        .style("fill", "yellow")
        .style("stroke-width", "2px");
      })

      .on("mouseout", function(d) {
        d3.select("#tooltip").remove();
        d3.select(this)
        .transition()
        .duration(250)
        .style("fill", function(d) {return color(d.properties.name.replace(/\s+/g, '').length); 
      })
        .style("stroke-width", "1px")
      });

    };


    var svg = d3.select("svg");

    svg.append("g")
    .attr("class", "legendLinear")
    .attr("transform", "translate(600,300)");

    var legendLinear = d3.legendColor()
    .title("Quantidades de letras")
    .labels(["Menos de 4", "Entre 4 e 5", "Entre 5 e 7", "Entre 7 e 8", "Entre 8 e 10", "Entre 10 e 11", "Entre 11 e 12", "Entre 12 e 13", "Entre 13 e 17"])
    .shapeWidth(80)
    .shapePadding(5)
    .orient('vertical')
    .scale(color);

    svg.select(".legendLinear")
    .call(legendLinear);