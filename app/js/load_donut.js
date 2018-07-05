var donut;
var arc;
function create_donut(donut_box, data){
    var height = $(donut_box).height();
    var width = $(donut_box).width();

    var radius = Math.min(width, height) / 2;

    arc = d3.arc()
        .outerRadius(radius - radius/18)   //valor raio círculo de fora
        .innerRadius(radius - radius/2.5);  //valor raio círculo de dentro

    var pie = d3.pie()
        .sort(function(a, b) {
            return a.index-b.index;
        })
        .value(function(d) { return d.valor; })(data)
        

    var svg = d3.select(donut_box).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie)
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .attr("soma", function(d) { return getSoma(data, d.data.tipo);})
        .style("fill", function(d) { return color_donut(d.data.tipo); })
        .style("stroke", "none")
        .each(function(d) { this._current = d; });

    donut = g;
}

function update_donut(donut_box, data){
    var height = $(donut_box).height();
    var width = $(donut_box).width();

    var radius = Math.min(width, height) / 2;

      //valor raio círculo de dentro

    var pie = d3.pie()
                .sort(function(a, b) {
                    return a.index-b.index;
                })
                .value(function(d) { return d.valor; })(data)

    var svg = d3.select(donut_box).select("svg g");

    donut.data(pie)
    
    donut.enter()
         .append("g")
         .attr("class", "arc");

    donut.exit().remove()

    donut.select("path")
     .transition()
     .duration(400)
     .attrTween("d", arcTween)
     .attr("soma", function(d) { return getSoma(data, d.data.tipo);})
     .style("fill", function(d) { return color_donut(d.data.tipo); })
     .style("stroke", "none");

}

function arcTween(a) {
    var i = d3.interpolate(this._current, a);
    this._current = i(0);
    return function(t) {
      return arc(i(t));
    };
}
  

function color_donut(tipo){

    var eixo = parameters.eixo;

    var corEixo = COLORS['eixo'][eixo].color;

    if(tipo == "Sim" || tipo == "Exportação"){
        return corEixo[1];
    }
    else if(tipo == "Não"){
        return corEixo[2];
    }
    else if(tipo == "Importação"){
        return corEixo[3];
    }

    return colorJSON['cadeias'][tipo].color;
}

function getPercent(data){
    sum_values = 0;
    data.forEach(function(d){
        sum_values += d.valor;
    })
    data.forEach(function(d){
        d.percent = d.valor/sum_values
    })
}

function getSoma(data, tipo){
    var sum_values = 0;
    data.forEach(function(d){
        // console.log(d)
        sum_values += d.valor;
    })
    data.forEach(function(d){
        d.percent = d.valor/sum_values
    })
}

function percentFormat(number){
    return (number*100).toFixed(2) + "%";
}

function indexTipos(tipo){
    switch(tipo){
        case "Exportação": return 1;
        case "Importação": return 2;
    }
}