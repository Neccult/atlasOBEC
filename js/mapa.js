// Mapa JS

//tamanho do mapa
  var width = 800,
      height = 600;

//cria svg
  var svg = d3.select("#corpo").append("svg")
    .attr("width", width)
    .attr("height", height);

//configura projeção
  var projection = d3.geoMercator()
    .center([-40, -30])             
    .rotate([4.4, 0])               
    .scale(750)                     
    .translate([width / 2, height / 1.2]);  

  var path = d3.geoPath()
    .projection(projection);


//pre-load arquivos
  d3.queue()
    .defer(d3.json, "br-min.json")
    .defer(d3.csv, "total.csv")
    .await(ready);

//leitura
  function ready(error, br_states, data) {

    if (error) return console.error(error);

//carrega estados JSON
    var states = topojson.feature(br_states, br_states.objects.states);


      
//Carrega dados CSV

    var total = d3.csvFormat(data, ["ID", "UF", "2014"]);

//parse to array
    var dict = {};

    var info = d3.csvParseRows(total, function(d, i) {
      return dict[d[0]] = {id:d[0], uf:d[1], valor:+d[2]}
    });

//valores maximos e minimos
    var minValue = d3.min(info, function(d) {return d.valor; })
    var maxValue = d3.max(info, function(d) {return d.valor; })

//faixa de valores para as cores do mapa
    var dom = [(minValue+100), (minValue*5), (minValue*11),(minValue*19), (minValue*23), (minValue*47), (minValue*59), (minValue*71), (maxValue+100)]

//coloração do mapa
    // var color = d3.scaleLinear()
    var color = d3.scaleThreshold()
      .domain(dom)
      // .domain([minValue, maxValue])
      .range(d3.schemeYlGn[9]);
              
//concatena propriedades
    svg.append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(states.features)
      .enter()
      .append("path")
      // .style('fill', function(d){return color(d.properties.name.replace(/\s+/g, '').length);})

      .style('fill', function(d){return color(dict[d.id].valor);})

      .attr("d", path)
      
//mouseover
    .on("mouseover", function(d) {
      var xPosition = d3.mouse(this)[0];
      var yPosition = d3.mouse(this)[1] - 30;
      svg.append("text")
        .attr("id", "tooltip")
        .attr("x", xPosition)
        .attr("y", yPosition)
        .attr("text-anchor", "middle")
        .attr("font-family", "Lato")
        .attr("font-size", "14px")
        .attr("font-weight", "bold")
        .attr("fill", "black")
        .text(d.properties.name+" = "+dict[d.id].valor);


      d3.select(this)
        .style("fill", "yellow")
        .style("stroke-width", "2px");
    })

//mouseout
    .on("mouseout", function(d) {
      d3.select("#tooltip").remove();
      d3.select(this)
        .transition()
        .duration(250)
        .style('fill', function(d){return color(dict[d.id].valor);})
        .style("stroke-width", "1px")
    });

//Legenda
    var legend_svg = d3.select("svg");

    legend_svg.append("g")
      .attr("class", "legendLinear")
      .attr("transform", "translate(600,300)");

    var legendLinear = d3.legendColor()
      .title("Total de Empresas")
      //.labels(["Menos de 4", "Entre 4 e 5", "Entre 5 e 7", "Entre 7 e 8", "Entre 8 e 10", "Entre 10 e 11", "Entre 11 e 12", "Entre 12 e 13", "Entre 13 e 17"])
      .shapeWidth(80)
      .shapePadding(5)
      .orient('vertical')
      .scale(color);

    legend_svg.select(".legendLinear")
      .call(legendLinear);



  };

