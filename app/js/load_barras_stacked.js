
function create_bars_stacked(barras_box, data){

    var chartWidth = width_box(barras_box);
    var chartHeight = height_box(barras_box);
    var minBarHeight = 5;

    var corEixo = COLORS['eixo'][parameters.eixo].color;

    var dados = {key: [], value: [], percentual: [], taxa: [], percentual_setor: []};

    if(parameters.var == 3 && parameters.eixo == 0){
        delete data['2007'];
    }

    var desag = selectDesag()
    var anos = [];

    if((parameters.var == 6 || parameters.var == 4) && parameters.eixo == 1){
        aux = []
        selectDesag();
        Object.keys(data).forEach(function (key) {
            soma = 0;
            cont = 0;
            Object.keys(data[key]).forEach(function (chave) {

                if(chave != "year" && cont == desag){
                    obj = {};
                    valor = data[key][chave];

                }
                cont++;
            });
            aux.push({year: data[key].year, Média: valor})
        });
        data = aux;
    }

    Object.keys(data).forEach(function (key) {
       anos.push(data[key].year);
    });


    var margin = {top: 20, right: 20, bottom: 30, left: 55},
        width = chartWidth - margin.left - margin.right,
        height = chartHeight - margin.top - margin.bottom;

    var svg_barras = d3.select(barras_box)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("type", "stacked")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    /* Data in strings like it would be if imported from a csv */

    var parse = d3.timeParse("%Y");

    var dados = desagregacao_names().map(function (fruit) {
        return data.map(function (d) {
            return {x: parse(d.year), y: +d[fruit]};
        });
    });

    var keys = [];

    for (var key in data[0]) {
        if(key != "year"){
            keys.push(key)
        }
    }

    // Transpose the data into layers
    var dataset = d3.stack().keys(keys)(data);
    var max_value = -1;
    dataset[dataset.length-1].forEach(function(d){
        max_value = Math.max(d[1], max_value);
    })

    // Set x, y and colors
    var x_eixo1 = d3.scaleBand()
                  .domain(anos)
                  .range([0, width])
                  .padding(0.05)


    var y_eixo1 = d3.scaleLinear()
                    .domain([0, max_value])
                    .rangeRound([height, 0]);


    var cor;
    if(parameters.cad == 0){
        cor = corEixo[1];
    }
    else{
        cor = COLORS.cadeias[parameters.cad].color
    }

    var cor2 = COLORS.cadeias[parameters.cad].gradient['2'];

    var colors = d3.scaleLinear()
        .domain([0, dados.length])
        .range([cor, cor2])

    

    // Define and draw axes
    var yAxis_eixo1 = d3.axisLeft()
        .scale(y_eixo1)
        .ticks(8)
        .tickFormat(formatYAxisStacked)
        .tickSize(5)
        .tickPadding(10);

    var xAxis_eixo1 = d3.axisBottom(x_eixo1)
        .scale(x_eixo1)
        .tickSize(5)

    svg_barras.append("g")
        .attr("class", "y axis")
        .call(yAxis_eixo1);

    svg_barras.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis_eixo1);

    // Create groups for each series, rects for each segment
    // svg_barras.selectAll(".y.axis line")
    //     .style("opacity", "0.1");

    var groups = svg_barras.selectAll("g.cost")
        .data(dataset)
        .enter().append("g")
        .attr("class", "cost")
        .attr("subdeg", function(d) {return d.key})
        .style("fill", function (d, i) {
            return colors(i);
        });

    var rect = groups.selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter()
        .append("rect")
        .attr("data-legend", function(d) {  return d.data.year; })
        .attr("data-value", function(d) { return Math.abs(d[0] - d[1])})
        .attr("x", function (d) {
            return x_eixo1(d.data.year);
        })
        .attr("y", function (d) {
            return y_eixo1(d[1]);
        })
        .attr("height", function (d) {
            return Math.abs(y_eixo1(d[0])-y_eixo1(d[1]));
        })
        .attr("width", x_eixo1.bandwidth())
        .style("cursor", "pointer")
        .on("mouseover", function (d, i, obj) {
            var name = $(this).parent().attr("subdeg");
            loadTooltipStacked(d, obj,  i, parameters.eixo, parameters.var, tooltipInstance, name);
        })
        .on("mouseout", tooltipInstance.hideTooltip)
        .on("click", function(d, i, obj) {

            var newSubdeg = getSubdegId(parameters.deg, $(this).parent().attr("subdeg"));
            updateWindowUrl('subdeg', newSubdeg)
            $(".bread-select[data-id=deg]").find("optgroup[value="+parameters.deg+"]").find("option[value="+(newSubdeg)+"]").prop('selected', true);

            clickBarraStacked(barras_box, d, i, obj, anos, colors);
            updateIframe();
            // configInfoDataBoxBarrasStackedClick(getSelectedValueStacked(barras_box), getSomaStacked());
        });


    if((parameters.var == 6 || parameters.var == 4) && parameters.eixo == 1)
        desagregacao = 1
    else
        desagregacao = $(".bread-select[data-id=deg]").val();

    var selectedValue = parseFloat(getSelectedValueStacked(barras_box));
    var soma = getSomaStacked();

    updateData('barras_stacked', dados, selectedValue, soma);
    destacaBarraStacked(barras_box, anos, colors)

}

function update_bars_stacked(barras_box, data){

    var svg_barras = d3.select(barras_box)
        .select("svg");

    if(svg_barras.attr("type") == "simples"){
        svg_barras.remove();
        create_bars_stacked(barras_box, data);
        return;
    }

    var chartWidth = width_box(barras_box);
    var chartHeight = height_box(barras_box);
    var minBarHeight = 5;
    var maxDecimalAxis = 0;
    var corEixo = COLORS['eixo'][parameters.eixo].color;

    var color = function (colorId) {

        if (COLORS.cadeias[colorId]) {
            if(colorId){
                if(colorId == 0){
                    return corEixo[1]
                }
                else{
                    return COLORS.cadeias[colorId].color;
                }
            }
            else{
                return corEixo[2];
            }
        } else {
            return COLORS.cadeias[0].color;
        }
    }

    var anos = [];

    Object.keys(data).forEach(function (key) {
        anos.push(data[key].year);
    });

    var dados = {key: [], value: [], percentual: [], taxa: [], percentual_setor: []};

    if(parameters.var == 3 && parameters.eixo == 0){
        delete data['2007'];
    }

    var margin = {top: 20, right: 20, bottom: 30, left: 55},
        width = chartWidth - margin.left - margin.right,
        height = chartHeight - margin.top - margin.bottom;

    /* Data in strings like it would be if imported from a csv */

    var parse = d3.timeParse("%Y");

    var dados = desagregacao_names().map(function (fruit) {
        return data.map(function (d) {
            return {x: parse(d.year), y: +d[fruit]};
        });
    });


    var keys = [];

    for (var key in data[0]) {
        if(key != "year"){
            keys.push(key)
        }
    }

    // Transpose the data into layers
    var dataset = d3.stack().keys(keys)(data);

    var max_value = -1;
    dataset[dataset.length-1].forEach(function(d){
        max_value = Math.max(d[1], max_value);
    })

    // Set x, y and colors
    var x_eixo1 = d3.scaleBand()
        .domain(anos)
        .range([0, width])
        .padding(0.05)

    var y_eixo1 = d3.scaleLinear()
        .domain([0, max_value])
        .rangeRound([height, 0]);

    var cor;

    if(parameters.cad == 0){
        cor = corEixo[1];
    }
    else{
        cor = COLORS.cadeias[parameters.cad].color
    }

    var cor2 = COLORS.cadeias[parameters.cad].gradient['2'];

    var colors = d3.scaleLinear()
        .domain([0, dados.length])
        .range([cor, cor2])

    // Define and draw axes
    var yAxis_eixo1 = d3.axisLeft()
        .scale(y_eixo1)
        .ticks(8)
        .tickFormat(formatYAxisStacked)
        .tickSize(5)
        .tickPadding(10);

    var xAxis_eixo1 = d3.axisBottom(x_eixo1)
        .scale(x_eixo1)
        .tickSize(5)

    svg_barras.select(".y.axis")
        .transition().duration(500)
        .call(yAxis_eixo1);

    svg_barras.select(".x.axis")
        .transition().duration(500)
        .call(xAxis_eixo1);

    var groups = svg_barras.select("g").selectAll(".cost")
        .data(dataset)
        .attr("subdeg", function(d) {return d.key})
        .style("fill", function (d, i) {
            return colors(i);
        })

    groups.exit().remove();

    var newR = groups.enter()
                .append("g")
                .attr("class", "cost")
                .attr("subdeg", function(d) {return d.key})
                .style("fill", function (d, i) {
                    return colors(i);
                })

    newR.selectAll("rect")
        .data(function (d) { return d; })
        .enter()
        .append("rect")
        .attr("data-legend", function(d) { return d.data.year; })
        .attr("data-value", function(d) { return Math.abs(d[0] - d[1]); })
        .attr("x", function (d) { return x_eixo1(d.data.year); })
        .attr("y", function (d) { return y_eixo1(d[1]); })
        .attr("height", function (d) { return Math.abs(y_eixo1(d[0]) - y_eixo1(d[1])); })
        .attr("width", x_eixo1.bandwidth())
        .on("mouseover", function (d, i, obj) {
            var name = $(this).parent().attr("subdeg");
            loadTooltipStacked(d, obj,  i, parameters.eixo, parameters.var, tooltipInstance, name);
        })
        .on("mouseout", tooltipInstance.hideTooltip)
        .on("click", function(d, i, obj) {
            var newSubdeg = getSubdegId(parameters.deg, $(this).parent().attr("subdeg"));
            updateWindowUrl('subdeg', newSubdeg)
            $(".bread-select[data-id=deg]").find("optgroup[value="+parameters.deg+"]").find("option[value="+(newSubdeg)+"]").prop('selected', true);

            clickBarraStacked(barras_box, d, i, obj, anos, colors);
            updateIframe();
        });

    var rect = groups.selectAll("rect");

    rect.data(function (d) { return d; })
        .attr("data-legend", function(d) { return d.data.year; })
        .attr("data-value", function(d) { return Math.abs(d[0] - d[1]); })
        .attr("x", function (d) { return x_eixo1(d.data.year); })
        .attr("y", function (d) { return y_eixo1(d[1]); })
        .attr("height", function (d) { return Math.abs(y_eixo1(d[0]) - y_eixo1(d[1])); })
        .attr("width", x_eixo1.bandwidth())
        .style("cursor", "pointer");

    var selectedValue = parseFloat(getSelectedValueStacked(barras_box));
    var soma = getSomaStacked();

    updateData('barras_stacked', dados, selectedValue, soma);
    destacaBarraStacked(barras_box, anos, colors)
}

function getSelectedValueStacked(barras_box){

    var value;
    // console.log(getSubdegId(parameters.deg, $(this).attr("subdeg")) )
    d3.select(barras_box).selectAll(".cost").each(function() {

        if(getSubdegId(parameters.deg, $(this).attr("subdeg")) == parameters.subdeg) {

            d3.select(this).selectAll("rect").each(function() {

                if($(this).attr("data-legend") == parameters.ano){
                    value = $(this).attr("data-value");
                }

            });
        }
    });


    return value;

}

function clickBarraStacked(barras_box, d, i, obj, anos, colors){

    var indexAno = anos.indexOf(d.data.year);
    updateWindowUrl('ano', d.data.year);
    $('bread-select[ano]').val(d.data.year);

}

function getSomaStacked() {

    var soma = 0;

    $("rect").each(function() {

        if($(this).attr("data-legend") == parameters.ano){
            if($(this).attr("data-value") != "NaN"){
                soma += parseFloat($(this).attr("data-value"));
            }
        };

    });
    return soma;
}

function destacaBarraStacked(barras_box, anos, colors) {

    var indexAno = anos.indexOf(parameters.ano);

    $(".cost").each(function(i){
        $(this).find("rect").each(function(k){
            $(this).css("fill", colors(i));
        })
    })

    $(".cost").each(function(i){
        $(this).find("rect").each(function(k){
            if(indexAno == k) {
                $(this).css("opacity", 1);
                $(this).css("stroke", "#555");
                $(this).css("stroke-width", '1');
                $(this).css("fill", colors(i))
                if(getSubdegId(parameters.deg, $(this).parent().attr("subdeg")) == parameters.subdeg){
                    $(this).css('fill', corEixo[2]);
                }
                else{
                    $(this).css("fill", colors(i))
                }
            }
            else{
                $(this).css("opacity", 0.6);
                $(this).css("stroke", "none")
            }
        })
    })

    
    
}

function loadTooltipStacked(d, obj, i, eixo, vrv, tooltipInstance, name) {

    if (eixo == 1) {
        if (vrv == 9) {
            tooltipInstance.showTooltip(d, [
                ["title", name],
                ["", formatTextVrv(d.y, eixo, vrv)]
            ]);
        }
        else if (vrv == 2) {

            tooltipInstance.showTooltip(d, [
                ["title", name],
                ["", formatTextVrv(Math.abs(d[1] - d[0]), eixo, vrv)]
            ]);
        
        }
        else if (vrv == 1 || (vrv >= 4 && vrv <= 8) || vrv == 11 || vrv == 10 || vrv >= 12) {
            tooltipInstance.showTooltip(d, [
                ["title", name],
                ["", formatTextVrv(d[1] - d[0], eixo, vrv)]
            ]);
        }
    }
}

function color_eixo1() {
    if(ocp == 0) {
        if (COLORS.cadeias[cad]) {
            if(prt != 0) return [COLORS.cadeias[cad].color, COLORS.cadeias[cad].gradient["6"], COLORS.cadeias[cad].gradient["5"], COLORS.cadeias[cad].gradient["4"]];
            if(fax != 0) return [COLORS.cadeias[cad].color, COLORS.cadeias[cad].gradient["6"], COLORS.cadeias[cad].gradient["5"], COLORS.cadeias[cad].gradient["4"], COLORS.cadeias[cad].gradient["3"], COLORS.cadeias[cad].gradient["2"]];
            if(esc != 0) return [COLORS.cadeias[cad].color, COLORS.cadeias[cad].gradient["6"], COLORS.cadeias[cad].gradient["5"], COLORS.cadeias[cad].gradient["4"], COLORS.cadeias[cad].gradient["3"], COLORS.cadeias[cad].gradient["2"], COLORS.cadeias[cad].gradient["1"]];
            if(sex != 0) return [COLORS.cadeias[cad].color, COLORS.cadeias[cad].gradient["6"]];
        } else {
            return COLORS.cadeias[0].color;
        }
    }
    else {
        if (COLORS.ocupacoes[ocp - 1]) {
            if(fax != 0) return [COLORS.ocupacoes[ocp].color, COLORS.ocupacoes[ocp].gradient["6"], COLORS.ocupacoes[ocp].gradient["5"], COLORS.ocupacoes[ocp].gradient["4"], COLORS.ocupacoes[ocp].gradient["3"], COLORS.ocupacoes[ocp].gradient["2"]];
            if(esc != 0) return [COLORS.ocupacoes[ocp].color, COLORS.ocupacoes[ocp].gradient["6"], COLORS.ocupacoes[ocp].gradient["5"], COLORS.ocupacoes[ocp].gradient["4"], COLORS.ocupacoes[ocp].gradient["3"], COLORS.ocupacoes[ocp].gradient["2"], COLORS.ocupacoes[ocp].gradient["1"]];
            if(frm != 0) return [COLORS.ocupacoes[ocp].color, COLORS.ocupacoes[ocp].gradient["6"]];
            if(snd != 0) return [COLORS.ocupacoes[ocp].color, COLORS.ocupacoes[ocp].gradient["6"]];
            if(prv != 0) return [COLORS.ocupacoes[ocp].color, COLORS.ocupacoes[ocp].gradient["6"]];
            if(cor != 0) return [COLORS.ocupacoes[ocp].color, COLORS.ocupacoes[ocp].gradient["6"], COLORS.ocupacoes[ocp].gradient["5"], COLORS.ocupacoes[ocp].gradient["4"], COLORS.ocupacoes[ocp].gradient["3"]];
        } else {
            return COLORS.ocupacoes[0].color;
        }
    }
}

function desagregacao_names() {

    if(parameters.deg == 1 && parameters.subdeg != 0) {

        var array_names = [];
        PT_BR.select.prt.forEach(function(d, i) {
            if(i) {
                array_names.push(d.name_bar);
            }
        });

    }
    if(parameters.deg == 4 && parameters.subdeg  != 0) {
        var array_names = [];
        PT_BR.select.esc.forEach(function(d, i) {
            if(i) {
                array_names.push(d.name);
            }
        });

    }
    if(parameters.deg == 3 && parameters.subdeg  != 0) {
        var array_names = [];
        PT_BR.select.fax.forEach(function(d, i) {
            if(i) {
                if(!(parameters.slc == 1 && d.name == "Não classificado")) array_names.push(d.name);
            }
        });
    }
    if(parameters.deg == 2 && parameters.subdeg  != 0) {
        var array_names = [];
        PT_BR.select.sex.forEach(function(d, i) {
            if(i) {
                array_names.push(d.name);
            }
        });

    }
    if(parameters.deg == 6 && parameters.subdeg  != 0) {
        var array_names = [];
        PT_BR.select.frm.forEach(function(d, i) {
            if(i) {
                array_names.push(d.name);
            }
        });
    }
    if(parameters.deg == 8 && parameters.subdeg  != 0) {
        var array_names = [];
        PT_BR.select.snd.forEach(function(d, i) {
            if(i) {
                array_names.push(d.name);
            }
        });
    }
    if(parameters.deg == 7 && parameters.subdeg  != 0) {
        var array_names = [];
        PT_BR.select.prv.forEach(function(d, i) {
            if(i) {
                array_names.push(d.name);
            }
        });
    }
    if(parameters.deg == 5 && parameters.subdeg  != 0) {
        var array_names = [];
        PT_BR.select.cor.forEach(function(d, i) {
            if(i) {
                array_names.push(d.name);
            }
        });
    }
    return array_names;
}

function selectDesag(){
    return parameters.subdeg;
}

var formatYAxisStacked = function (d) {

    if(d == 0) return 0;

    function kFormatter(num) { 
        var arraySymbols = ['K', 'M', 'G', 'T'];
        var cont = 0;

        while(num > 999){
            num = num/1000;
            cont++; 
        }

        return num+arraySymbols[cont-1];
    }

    function mFormatter(num) {
        var arraySymbols = ['m', 'u', 'n', 'p'];
        var cont = 0;

        while(num < 0.01){
            num = Math.ceil(num*1000000)/1000;
            cont++;
        }
        
        return num+arraySymbols[cont-1];
    }

    if(d > 999){
        return kFormatter(d);
    }
    else if(d < 0.01){
        return mFormatter(d);
    }

    return d;
}