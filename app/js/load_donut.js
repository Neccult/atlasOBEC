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
        .attr("soma", function(d) {  return getSoma(data, d.data.tipo);})
        .style("fill", function(d) { return color_donut(d.data.tipo); })
        .style("stroke", "none")
        .style("cursor", "pointer")
        .each(function(d) { this._current = d; });

    donut = g;

    d3.selectAll(".arc")
        .on("click", function(d) {
            clickDonut(d);
        })
        .on("mouseover", function(d){
            d3.select(this).attr("transform", "scale(1.01)")

            if(parameters.eixo == 2 && parameters.var == 17){
                if(d.data.tipo == "Não"){
                    tooltipInstance.showTooltip(d.data, [
                        ["title", "Não Possui"]
                    ]);
                }
                else{
                    tooltipInstance.showTooltip(d.data, [
                        ["title", "Possui"],
                        ["", formatTextVrv(d.data.total, 2, parameters.var)]
                    ]);
                }
            }
            else if(parameters.eixo == 2 && parameters.var >= 18){
                tooltipInstance.showTooltip(d.data, [
                    ["title", d.data.tipo],
                    ["", formatTextVrv(d.data.valor, 2, parameters.var)],
                    ["", percentFormat(d.data.percent).replace(".",",")]
                ]);
            }
            else{
                tooltipInstance.showTooltip(d.data, [
                    ["title", d.data.tipo],
                    ["", formatTextVrv(d.data.valor, 3, parameters.var)],
                    ["", percentFormat(d.data.percent).replace(".",",")]
                ]);
            }


        })
        .on("mouseout", function(d){
            d3.select(this).attr("transform", "scale(1)")
            tooltipInstance.hideTooltip()
        })
}

function update_donut(donut_box, data){
    var height = $(donut_box).height();
    var width = $(donut_box).width();

    var radius = Math.min(width, height) / 2;

    var pie = d3.pie()
                .sort(function(a, b) {
                    return a.index-b.index;
                })
                .value(function(d) { return d.valor; })(data)

    var svg = d3.select(donut_box).select("svg g");
    
    var teste = svg.selectAll(".arc").data(pie)
    
    teste.exit().remove()

    teste.enter().append("g").attr("class", "arc").append("path")

    
    svg.selectAll(".arc")
     .select("path")
     .transition()
     .duration(400)
     .attrTween("d", arcTween)
     .attr("soma", function(d) { return getSoma(data, d.data.tipo);})
     .style("fill", function(d) { return color_donut(d.data.tipo); })
     .style("stroke", "none")
     .style("cursor", "pointer")
     
    
    d3.selectAll(".arc")
        .on("click", function(d) {
            clickDonut(d);
        })
        .on("mouseover", function(d){
            d3.select(this).attr("transform", "scale(1.01)")


            if(parameters.eixo == 2 && parameters.var == 17){
                if(d.data.tipo == "Não"){
                    tooltipInstance.showTooltip(d.data, [
                        ["title", "Não Possui"],
                        ["", percentFormat(d.data.percent).replace(".",",")]

                    ]);
                }
                else{
                    tooltipInstance.showTooltip(d.data, [
                        ["title", "Possui"],
                        ["", percentFormat(d.data.percent).replace(".",",")]

                    ]);
                }

            }
            else if(parameters.eixo == 2 && parameters.var >= 18){
                tooltipInstance.showTooltip(d.data, [
                    ["title", d.data.tipo],
                    ["", formatTextVrv(d.data.valor, 2, parameters.var)],
                    ["", percentFormat(d.data.percent).replace(".",",")]


                ]);

            }
            else{
                tooltipInstance.showTooltip(d.data, [
                    ["title", d.data.tipo],
                    ["", formatTextVrv(d.data.valor, 3, parameters.var)],
                    ["", percentFormat(d.data.percent).replace(".",",")]
                ]);
            }


        })
        .on("mouseout", function(d){
            d3.select(this).attr("transform", "scale(1)")
            tooltipInstance.hideTooltip()
        })

    // if(parameters.eixo == 2 && (parameters.var == 18 || parameters.var == 19)){
    //     var soma = 0;
    //     var acumuladoSetor;
    //
    //     Object.keys(data).forEach(function (key) {
    //         soma += data[key].valor;
    //         if(cad == data[key].cad)
    //             acumuladoSetor = data[key].valor;
    //     })
    //
    //     if(parameters.cad == 0)
    //         acumuladoSetor = soma;
    //
    //
    //     setPercentValueData({valor: formatTextVrv(acumuladoSetor,parameters.eixo, parameters.var)} , parameters.eixo, parameters.var)
    //
    // }

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
    
    if(tipo == "Sim"){
        return corEixo[1];
    }
    else if(tipo == "Não"){
        return corEixo[2];
    }
    
    if(parameters.cad == 0){
        if(tipo == "Exportação"){
            return corEixo[1]
        }
        else if(tipo == "Importação"){
            return corEixo[3];
        }
    } else {
        if(tipo == "Exportação"){
            return COLORS['cadeias'][parameters.cad].gradient[6];
        }
        else if(tipo == "Importação"){
            return COLORS['cadeias'][parameters.cad].gradient[3];
        }
    }

    return COLORS['cadeias'][getCadId(tipo)].color;
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

function clickDonut(d) {
    if(parameters.eixo == 2 && (parameters.var == 18 || parameters.var == 19)) {
        $('.bread-select[data-id="cad"]').val(d.data.cad);
        updateWindowUrl('cad', d.data.cad);
        updateIframe();
    }
}