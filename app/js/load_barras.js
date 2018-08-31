function create_bars(barras_box, data){

    var chartWidth = width_box(barras_box);
    var chartHeight = height_box(barras_box);
    var minBarHeight = 6;

    var uos = views_parameters[barras_box].uos;
    var corEixo = COLORS['eixo'][parameters.eixo].color;

    var dados = {key: [], value: [], percentual: [], taxa: [], percentual_setor: []};

    if(parameters.var == 3 && parameters.eixo == 0){
        delete data['2007'];
    }

    Object.keys(data).forEach(function (key) {

        dados.percentual_setor.push(data[key].valor/brasil_setor[key])
        dados.key.push(data[key].ano);
        dados.value.push(data[key].valor);

        if (parameters.var == 2  || parameters.var == 9) dados.percentual.push(0);
        else dados.percentual.push(data[key].percentual);

        if (parameters.var == 2) {
            dados.taxa.push(0);
        }
        else {
            dados.taxa.push(data[key].taxa);
        }
    });

    dados.key = d3.keys(data);

    var margin = {top: 20, right: 20, bottom: 30, left: 45},
        width = chartWidth - margin.left - margin.right,
        height = chartHeight - margin.top - margin.bottom;

    var x = d3.scaleBand()
        .domain(dados.key)
        .rangeRound([0, width])
        .padding(0.1);

    var y = d3.scaleLinear()
        .domain(d3.extent(dados.value))
        .rangeRound([height, 0], .002);

    y.domain(d3.extent(dados.value, function (d) {
        return d;
    })).nice();

    var formatYAxis = function (d) {
        return formatBarsYAxis(d, dados);
    }();

    var grid_lines = d3.axisLeft(y)
        .scale(y)
        .ticks(4)
        .tickSize(-width + 10)
        .tickSizeOuter(0)
        .tickFormat("")

    var valueTop = margin.top + 5;

    var svg_barras = d3.select(barras_box).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("type", "simples")
        .append("g")
        .attr("transform",
            "translate(" + (margin.left+5) + "," + valueTop + ")");

    svg_barras.append("g")
        .attr("class", "grid")
        .style("opacity", 0.1)
        .call(grid_lines);

    var rect = svg_barras.selectAll("rect")
        .data(dados.value)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("data-legend", function(d, i, obj) { return dados.key[i]; })
        .attr("data-color", function(d, i, obj) {
            return getBarDataColor(d, i, uos, dados);
        })
        .attr("data-value", function(d) {
            return d; 
        })
        .attr("x", function (d, i) {
            return x(dados.key[i]);
        })
        .attr("y", function (d) {
            return getBarY(y, d, dados, height, minBarHeight);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return getBarHeight(y, d, dados, height, minBarHeight);
        })
        .on("click", function(d, i, obj) {
            clickBarras(barras_box, dados, uos, i)
        })
        .on("mouseover", function (d, i, obj) {
            loadTooltip_barras(d, dados.key[i], parameters.eixo, parameters.var)
        })
        .on("mouseout", tooltipInstance.hideTooltip)
        .style("cursor", "pointer");

    var xAxis = d3.axisBottom(x)
        .tickFormat(function (d, i) {
            return dados.key[i];
        })
        .tickSize(5)
        .tickPadding(5);

    var yAxis = d3.axisLeft()
        .scale(y)
        .tickFormat(formatYAxis);

    svg_barras.append("g").attr("class", "eixo-x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg_barras.append("g").attr("class", "eixo-y")
        .attr("transform", "translate(0, 0)")
        .call(yAxis);

    destacarBarra(barras_box, parameters.ano, uos);

    var valor = $(barras_box+' svg').find('rect[data-legend="'+parameters.ano+'"]').attr("data-value");


    if(parameters.eixo == 2 && parameters.var >= 18){
        var soma = getBarSoma(dados);
        updateData('barras', dados, soma, 1);
    }
    else if(parameters.eixo == 2 && parameters.var == 17){

    }
    else{
        updateData('barras', dados, valor, uos);
    }

}

function update_bars(barras_box, data){

    var svg_barras = d3.select(barras_box+" svg");

    if(svg_barras.attr("type") == "stacked"){
        svg_barras.remove()
        create_bars(barras_box, data);
        return;
    }
    var svg_barras = d3.select(barras_box+" svg g");
    var chartWidth = width_box(barras_box);
    var chartHeight = height_box(barras_box);
    var minBarHeight = 5;

    var uos = views_parameters[barras_box].uos;
    var dados = {key: [], value: [], percentual: [], taxa: [], percentual_setor: []};

    var margin = {top: 20, right: 20, bottom: 30, left: 45};

    var width = chartWidth - margin.left - margin.right;
    var height = chartHeight - margin.top - margin.bottom;

    if(parameters.var == 3 && parameters.eixo == 0){
        delete data['2007'];
    }

    Object.keys(data).forEach(function (key) {
        dados.percentual_setor.push(data[key].valor/brasil_setor[key])
        
        dados.key.push(data[key].ano);

        dados.value.push(data[key].valor);
        
        if ( parameters.var === 2  || parameters.var === 9) dados.percentual.push(0);
        else dados.percentual.push(data[key].percentual);

        if ( parameters.var === 2) {
            dados.taxa.push(0);
        }
        else {
            dados.taxa.push(data[key].taxa);
        }
    });


    dados.key = d3.keys(data);

    var formatYAxis = function (d) {
        return formatBarsYAxis(d, dados);
    }();



    var x = d3.scaleBand()
                .domain(dados.key)
                .rangeRound([0, width])
                .padding(0.1);

    var y = d3.scaleLinear()
            .domain(d3.extent(dados.value))
            .rangeRound([height, 0], .002);
    
    y.domain(d3.extent(dados.value, function (d) {
        return d;
    })).nice();



    var rect = svg_barras.selectAll("rect")
                         .data(dados.value) 
    
    rect.exit().remove()

    rect.enter().append("rect").attr("x", function(d, i){
        return x(dados.key[i]);
    })
    


    var rect = svg_barras.selectAll("rect")

    rect.attr("data-legend", function(d, i, obj) { return dados.key[i]; })
        .attr("data-value", function(d) {   return d; })
        .attr("x", function (d, i) {
            return x(dados.key[i]);
        })
        .attr("y", function (d) {
            return getBarY(y, d, dados, height, minBarHeight);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return getBarHeight(y, d, dados, height, minBarHeight);
        })
        .attr("data-color", function(d, i, obj) {
            return getBarDataColor(d, i, uos, dados);
        })
        .on("click", function(d, i, obj) {
            clickBarras(barras_box, dados, uos, i)
        })
        .on("mouseover", function (d, i, obj) {
            loadTooltip_barras(d, dados.key[i], parameters.eixo, parameters.var)
        })
        .on("mouseout", tooltipInstance.hideTooltip);

    var xAxis = d3.axisBottom(x)
                    .tickFormat(function (d, i) {
                        return dados.key[i];
                    })
                    .tickSize(5)
                    .tickPadding(5);

    var yAxis = d3.axisLeft()
                .scale(y)
                .tickFormat(formatYAxis);




    d3.select(barras_box+" g.eixo-x")
        .transition()
        .duration(400)
        .call(xAxis);

    d3.select(barras_box+" g.eixo-y")
        .transition()
        .duration(400)
        .call(yAxis);




    destacarBarra(barras_box, parameters.ano, uos);

    var valor = $(barras_box+' svg').find('rect[data-legend="'+parameters.ano+'"]').attr("data-value");


    if(parameters.eixo == 2 && parameters.var >= 18){
        var soma = getBarSoma(dados);
        updateData('barras', dados, soma, 1);
    }
    else if(parameters.eixo == 2 && parameters.var == 17){

    }
    else{
        updateData('barras', dados, valor, uos);
    }

}
var maxDecimalAxis = 0;

function getBarSoma(dados) {
    var soma = 0;
    dados.value.forEach(function(key){
        soma += key;
    })
    return soma;
}

function getBarHeight(y, d, dados, height, minBarHeight) {

    var barHeight = y(d);

    // TEM VALOR NEGATIVO
    var zeroPosition = d3.min(dados.value) < 0 ? y(0) : height;
    var isValueZero = y(d) == zeroPosition;

    if (isValueZero){
        return minBarHeight;
    }

    barHeight = Math.abs(height - barHeight);

    // BARRA PEQUENA
    if (barHeight <= minBarHeight){
        return Math.abs(5);
    }

    return  Math.abs(y(d) - zeroPosition);

}

function getBarY(y, d, dados, height, minBarHeight) {

    var barHeight = y(d);
    var zeroPosition = d3.min(dados.value) < 0 ? y(0) : false;
    var isValueNegative = d < 0;

    // TEM VALOR NEGATIVO
    if (isValueNegative) {

        // NÚMERO NEGATIVO
        if (isValueNegative)
            return zeroPosition;
        // S barra for muito pequena
        if (barHeight == zeroPosition)
            return zeroPosition - 5;

        return y(0);
    }

    barHeight = Math.abs(height - barHeight);

    // BARRA PEQUENA
    if (barHeight <= minBarHeight){
        return height - 5;
    }
    return y(d);

}

function getBarDataColor(d, i, uos, dados) {
    if(parameters.eixo == 3 && (parameters.var == 5 || parameters.var == 8)) {
        return barColor(0);
    }
    else {
        return barColor(parameters.cad, i, uos, dados);
    }
}

function clickBarras(barras_box, dados, uos, i) {

    if(window.innerWidth <= 1199)
        return;

    if(parameters.eixo == 1 && parameters.var == 6 && uos == 1)
        return;

    $("select[data-id='ano']").val(dados.key[i]);
    updateWindowUrl('ano', dados.key[i])

    destacarBarra(barras_box, dados.key[i], uos);
    var valor = $(barras_box+' svg').find('rect[data-legend="'+dados.key[i]+'"]').attr("data-value");

    updateIframe();

}

function getSoma(barraId) {
    var soma = 0;
    $("rect").each(function() {
        if($(this).attr("data-legend") == barraId) {
            if($(this).attr("data-value") != "NaN") soma+=parseFloat($(this).attr("data-value"));
        }
    });
    return soma;
}

function destacarBarra(barras_box, barraId, uos) {

    d3.select(barras_box).selectAll("rect").each(function() {

        var destacado = false;

        if(parameters.eixo == 1 && parameters.var == 6 && uos == 1){


            if (parameters.ocp == 0 && parameters.deg == 0){
                    destacado = ((getCadABVId($(this).attr("data-legend")) == parameters.cad) ? true : false);
            }
            else if (parameters.ocp == 0 && parameters.deg != 0) {
                    destacado = ((getSubdegId(parameters.deg, $(this).attr("data-legend")) == parameters.cad) ? true : false);
            }
            else if(parameters.ocp != 0 && parameters.deg == 0){
                    destacado = ((getOcpId($(this).attr("data-legend")) == parameters.cad) ? true : false);
            }
            else if(parameters.ocp != 0 && parameters.deg != 0){
                    destacado = ((getSubdegId(parameters.deg, $(this).attr("data-legend")) == parameters.subdeg) ? true : false);
            }

            if(destacado) {
                if($(this).attr("class") !== "destacado") {
                    $(this).attr("class", "destacado");
                    $(this).attr("data-color", $(this).css("fill"));
                    $(this).css("fill", $(this).attr("data-color"));
                    $(this).css("opacity", "1");
                    $(this).css("stroke-width", "2");
                }
            }
            else {
                $(this).attr("class", "");
                $(this).css("fill", $(this).attr("data-color"));
                $(this).css("opacity", "0.65");
            }
        }
        else {

            destacado = (($(this).attr("data-legend") == barraId) ? true : false);
            
            if(destacado) {
                if($(this).attr("class") !== "destacado") {
                    $(this).attr("class", "destacado");
                    $(this).attr("data-color", $(this).css("fill"));
                    $(this).css("fill", corEixo[1]);
                    $(this).css("opacity", "1");
                    $(this).css("stroke-width", "1");
                    $(this).css("stroke", "#555");
                }
            }
            else {
                $(this).attr("class", "");
                $(this).css("fill", $(this).attr("data-color"));
                $(this).css("opacity", "0.65");
                $(this).css("stroke", "none");
            }
        }
    });
}

function formatBarsYAxis(d, dados) {
    var higherZeroOcur = maxDecimalAxis;
    var dadosCounter = 0;
    var minFraction = 3;

    var formatInit = d3.format(".2f");
    var format3dc = d3.format(".3f");


    var formatDefault = function (d) {
        return removeDecimalZeroes(formatInit(d));
    };

    var formatGreatNumber = function (d) {

        var value = d;
        var c = 0;
        var sufixos = ['', 'K', 'M', 'B', 'T'];

        if(value >= 1000){
            while(value.toString().indexOf('.') == -1 && value.toString().length >= 4){

                c++;
                value = value / 1000;

            }
        }

        if(parameters.eixo == 0 && parameters.var == 8){
            if(c > 0){
                c--;
            }
        }
        return (value+sufixos[c])
    };

    var formatFraction = function (d) {


        if(isIHHorC4var()){
            return d;
        }

        if(d/0.01 >= 1){
            var dec_point = 2;
        } else if (d/0.001 >= 1){
            var dec_point = 3;
        } else if (d/0.0001 >= 1){
            var dec_point = 4;
        } else if (d/0.00001 >= 1){
            var dec_point = 5;
        } else if (d/0.000001 >= 1){
            var dec_point = 6;
        } else if (d/0.0000001 >= 1){
            var dec_point = 7;
        } else if (d/0.00000001 >= 1){
            var dec_point = 8;
        } else if (d/0.000000001 >= 1){
            var dec_point = 9;
        }

        // if(parameters.eixo == 1 && parameters.var == 2) d = d/10;

        var sufixo = getDataVar(PT_BR, parameters.eixo, parameters.var).sufixo_valor;

        d = normalizeValue(d, sufixo);
        d = +d.toFixed(dec_point);
        var value = d;
        
        var c = 0;
        var sufixos = ['', 'm', 'u', 'n', 'p'];

        while(value <= 1/1000){
            c++;
            value *= 1000;
            if(c >= 4) break;
        }

        value = Math.ceil(value * 1000)/1000;
        
        return (value+sufixos[c]+sufixo)
    };

    var maxValue = d3.max(dados.value);
    var minValue = d3.min(dados.value);

    var preFormat = d3.format('.2f');
    var preFormatted = removeDecimalZeroes(preFormat(maxValue));
    var preFormattedMin = removeDecimalZeroes(preFormat(minValue));
    var isSmall = preFormatted < 1 && preFormatted > -1;


    // has decimal
    if (isSmall){
        return formatFraction;
    }

    var preFormattedIntLength = Math.round(preFormatted).toString().length;

    if (preFormattedIntLength > 0){
        return formatGreatNumber;
    }
}

function loadTooltip_barras(d, key, eixo, vrv, dados){

    if(eixo === 0){
        tooltipInstance.showTooltip(d, [
            ["title", key],
            ["", formatTextVrv(d, eixo, vrv)]
        ]);
   }
   else if(eixo === 1){

        tooltipInstance.showTooltip(d, [
            ["title", key],
            ["", formatTextVrv(d, eixo, vrv)]
        ]);

   }
   else if(eixo === 2){
       if(vrv == 1 || vrv == 2 || vrv == 3 || vrv == 4 ||   vrv == 5 || vrv == 6 || vrv == 7 || vrv == 8 || vrv == 9 || vrv == 10 || vrv == 11 || vrv == 12 || vrv == 13 || vrv == 14 || vrv == 15 || vrv == 16 || vrv == 18 || vrv == 19){
           tooltipInstance.showTooltip(d, [
               ["title", key],
               ["", formatTextVrv(d, eixo, vrv)]
           ]);
       }
       else if(vrv == 17){
           tooltipInstance.showTooltip(d, [
               ["title", key],
               ["", formatTextVrv(d, eixo, vrv)],
           ]);
       }
   }
   else if(eixo == 3){
        tooltipInstance.showTooltip(d, [
            ["title", key],
            ["", formatTextVrv(d, eixo, vrv)]
        ]);
   }

}

function barColor(colorId, i, uos, dados) {

    if (parameters.eixo == 1 && parameters.var == 6 && uos == 1){
        if(parameters.ocp != 0){

            if(parameters.deg == 0){
                return COLORS.ocupacoes[i+1].color;
            }
            else{
                return COLORS.deg[parameters.deg].subdeg[getSubdegName(parameters.deg, (i+1).toString())]
            }

        }
        else{

            if(parameters.deg == 0){
                return COLORS.cadeias[i+1].color;
            }
            else{
                return COLORS.deg[parameters.deg].subdeg[getSubdegName(parameters.deg, (i+1).toString())]
            }
    
        }
    }

    else if (parameters.eixo == 2 && (parameters.var == 18 || parameters.var == 19)){
        return COLORS.cadeias[colorId].color;
    }

    else if (COLORS.cadeias[colorId]) {
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
    } 
    else {
        return COLORS.cadeias[0].color;
    }
}