var data_barra = [];

function create_bars(barras_box, data){

    data_barra = data;

    var chartWidth = width_box(barras_box);
    var chartHeight = height_box(barras_box);
    var minBarHeight = 5;

    var eixo = parameters.eixo
    var vrv  = parameters.var
    var cad  = parameters.cad
    var deg  = parameters.deg
    var prt = 0
    var ocp = 0
    var uos = views_parameters[barras_box].uos;

    var corEixo = COLORS['eixo'][eixo].color;

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

    var dados = {key: [], value: [], percentual: [], taxa: [], percentual_setor: []};

        // console.log(data)

        if(vrv == 3 && eixo == 0){
            delete data['2007'];
        }

    Object.keys(data).forEach(function (key) {
        dados.percentual_setor.push(data[key].valor/brasil_setor[key])
        
        dados.key.push(data[key].ano);

        if (( vrv === 3 ) && eixo ==0) dados.value.push(100 * data[key].valor);
        else dados.value.push(data[key].valor);
        
        if ( vrv === 2  || vrv === 9) dados.percentual.push(0);
        else dados.percentual.push(data[key].percentual);

        if (vrv === 2) {
            dados.taxa.push(0);
        }
        else {
            dados.taxa.push(data[key].taxa);
        }
    });

    dados.key = d3.keys(data);

    // AQUI automatizar map center
    var margin = {top: 20, right: 20, bottom: 30, left: 35},
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
            
        var higherZeroOcur = maxDecimalAxis;
        var dadosCounter = 0;
        var minFraction = 3;
    
        var formatInit = d3.format(".2f");
        var format3dc = d3.format(".3f");

        var formatDefault = function (d) {
            return removeDecimalZeroes(formatInit(d));
        };
        var formatThousands = function (d) {
            if(d == 0)
                return 0;
    
            if(eixo == 0 && vrv == 8)
                return removeDecimalZeroes(formatInit(d / 1e3)) + "M";
    
            return removeDecimalZeroes(formatInit(d / 1e3)) + "K";
        };
        var formatMillions = function (d) {
            if(d == 0)
                return 0;
    
            if(eixo == 0 && vrv == 8)
                return removeDecimalZeroes(formatInit(d / 1e6)) + "B";
    
            return removeDecimalZeroes(formatInit(d / 1e6)) + "M";
        };
    
        var formatBillions = function (d) {
            if(d == 0)
                return 0;
            return removeDecimalZeroes(formatInit(d / 1e9)) + "B";
        };
    
        function formatNano(d) {
            
            return removeDecimalZeroes(formatInit(d * 1e9)) + "n";
        };
    
        function formatMicro(d) {
            return removeDecimalZeroes(formatInit(d * 1e6)) + "µ";
        };
    
        function formatMili(d) {
            return removeDecimalZeroes(formatInit(d * 1e3)) + "m";
        };
    
        function formatPercent(d) {
            if (eixo == 0 && vrv == 9) {
                if (uf == 0)
                    return removeDecimalZeroes(formatInit(d * 1e2)) + "%";
                else{
                    return format3dc(d*1e2) + "%";
                }
            }
            return removeDecimalZeroes(formatInit(d * 1e4)) + "%";
    
        };
    
        var formatFraction = function (d) {
            var decimalDigitsCount = axisCountValidDecimalDigits(dados.value[dadosCounter]);
            var decimalDigits;
    
    
            // test decimal number and sets decimal digits that will be visible
            // if there are a number like 0,005 it will add + 1 to the counter so it will show something like = 0,0052
            decimalDigits = minFraction + higherZeroOcur;
    
            // console.log("valor: "+Math.abs(d)+" - decimal digits: "+(decimalDigits))
    
    
            var format = d3.format("." + decimalDigits + "f");
            // console.log(format(d))
            dadosCounter++;
    
            if(d == 0)
                return d;
    
    
            if(eixo == 0 && vrv == 9){
                if(uf == 0){
                    return formatPercent(d).replace(".", ",");
                }
                else if(cad != 0 && uf != 0){
                    return formatPercent(d).replace(".", ",");
    
                }
    
            }
    
            if(Math.abs(d) < 1/1e7){
                return formatNano(d).replace(".", ",");
            }
            else if(Math.abs(d) < 1/1e4){
                return formatMicro(d).replace(".", ",");
            }
    
            // else if(Math.abs(d) < 1/1e1){
            //     return formatMili(d).replace(".", ",");
            // }
            return (format(d)).replace(".", ",");
        };
    
        var axisCountValidDecimalDigits = function (value, acum) {
            var acum = acum || 0;
            var digitString = typeof value !== 'string' && typeof value !== 'undefined' ? (value).toString() : value;
    
            // break condition
            if (!value) {
                if (acum > higherZeroOcur)
                    higherZeroOcur = acum;
    
                return higherZeroOcur;
            }
    
            // if has dot (first iteration)
            if (digitString.match(/\./g))
                digitString = digitString.split(".")[1];
    
            var isZero = parseInt(digitString[0]) === 0 ? 1 : 0;
            var newValue = isZero ? digitString.substring(1) : "";
            var newAcum = acum + isZero;
    
            return axisCountValidDecimalDigits(newValue, newAcum);
        };
    
        var maxValue = d3.max(dados.value);
        var minValue = d3.min(dados.value);
    
        var preFormat = d3.format('.2f');
        var preFormatted = removeDecimalZeroes(preFormat(maxValue));
        var preFormattedMin = removeDecimalZeroes(preFormat(minValue));
        var isSmall = preFormatted < 1 && preFormatted > -1;
    
        // has decimal
        if (isSmall)
            return formatFraction;
    
        var preFormattedIntLength = Math.round(preFormatted).toString().length;
    
        if (preFormattedIntLength <= 3)
            return formatDefault;
        else if (preFormattedIntLength <= 6)
            return formatThousands;
        else if (preFormattedIntLength <= 9)
            return formatMillions;
        else if (preFormattedIntLength <= 12)
            return formatBillions;
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
                if((parameters.eixo == 1 && parameters.var == 6 && uos == 1)){


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
                            return color(dados.key[i])
                        }
                        else{
                            return COLORS.deg[parameters.deg].subdeg[getSubdegName(parameters.deg, (i+1).toString())]
                        }
                    }

                }
                else if((parameters.eixo == 2 && (parameters.var == 18 || parameters.var == 19) && uos == 1)){

                    if(parameters.deg == 0){
                        return color(dados.key[i])
                    }
                    else{
                        return color(cad)
                    }

                }
                else if(parameters.eixo == 3 && (parameters.var == 5 || parameters.var == 8)) {
                    return color(0);
                }
                else {
                    return color(cad);
                }
            })
            .attr("data-value", function(d) {   return d; })
            .attr("x", function (d, i) {
                return x(dados.key[i]);
            })
            .attr("y", function (d) {
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
                    return y(d) - minBarHeight;
                }
                    
                return y(d);
            })
            .attr("width", x.bandwidth())
            .attr("height", function (d) {
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
                    return Math.abs(y(d) + minBarHeight + 2 - zeroPosition);
                }


                return  Math.abs(y(d) - zeroPosition);
            })
            .attr("fill", function (d,i ) {
                if((eixo == 1 && vrv == 6 && uos == 1) || (eixo == 2 && (vrv == 18 || vrv == 19) && uos == 1)){
                    if(deg == 0)
                        return color(dados.key[i])
                    else
                        return color(cad)
                }
                else if(eixo == 3 && (vrv == 5 || vrv == 8)) {
                    return color(0);
                }
                else {
                    return color(cad);
                }
            })
            .attr("opacity", 0.8)
            .on("click", function(d, i, obj) {
                if(window.innerWidth <= 1199)
                    return;

                if(eixo == 1 && vrv == 6 && uos == 1)
                    return;

                $("select[data-id='ano']").val(dados.key[i]);
                updateWindowUrl('ano', dados.key[i])

                destacarBarra(barras_box, dados.key[i]);
                var valor = $(barras_box+' svg').find('rect[data-legend="'+dados.key[i]+'"]').attr("data-value");

                // configInfoDataBoxBarrasClick(dados, i, valor);

                updateIframe();

            })
            .on("mouseover", function (d, i, obj) {
                var title_content = getDataVar(textJSON, eixo, vrv).title;
                var title = title_content.replace("<span>", "");
                title = title.replace("<br>", "");
                title = title.replace("</span>", "");

                var valorTooltip = formatTextVrv(dados.value[i], eixo, vrv);
                var taxaTooltip = formatTextTaxaVrv(dados.taxa[i], eixo, vrv);

                if (eixo === 0 || eixo === 1 || eixo === 2 || eixo === 3){
                    loadTooltip_barras(d, dados.key[i], eixo, vrv)
                }

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


        destacarBarra(barras_box, parameters.ano);

        var valor = $(barras_box+' svg').find('rect[data-legend="'+parameters.ano+'"]').attr("data-value");
        data_barra = data;

        updateData('barras', dados, valor, uos);

        if(parameters.eixo == 2 && parameters.var >= 18){

            var soma = 0;
            dados.value.forEach(function(key){
                soma += key;
            })

            updateData('barras', dados, soma, 1);

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

    var eixo = parameters.eixo
    var vrv  = parameters.var
    var cad  = parameters.cad
    var deg  = parameters.deg
    var prt = 0
    var ocp = 0
    var uos = views_parameters[barras_box].uos;
    var dados = {key: [], value: [], percentual: [], taxa: [], percentual_setor: []};

    var margin = {top: 20, right: 20, bottom: 30, left: 35};
    var width = chartWidth - margin.left - margin.right;
    var height = chartHeight - margin.top - margin.bottom;

    if(vrv == 3 && eixo == 0){
        delete data['2007'];
    }

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

    Object.keys(data).forEach(function (key) {
        dados.percentual_setor.push(data[key].valor/brasil_setor[key])
        
        dados.key.push(data[key].ano);

        if (( vrv === 3 ) && eixo ==0) dados.value.push(100 * data[key].valor);
        else dados.value.push(data[key].valor);
        
        if ( vrv === 2  || vrv === 9) dados.percentual.push(0);
        else dados.percentual.push(data[key].percentual);

        if (vrv === 2) {
            dados.taxa.push(0);
        }
        else {
            dados.taxa.push(data[key].taxa);
        }
    });
    // updateAnoDefault(dados.key[dados.key.length-1]);
    //
    dados.key = d3.keys(data);

    var formatYAxis = function (d) {
            
        var higherZeroOcur = maxDecimalAxis;
        var dadosCounter = 0;
        var minFraction = 3;
    
        var formatInit = d3.format(".2f");
        var format3dc = d3.format(".3f");



        var formatDefault = function (d) {
            return removeDecimalZeroes(formatInit(d));
        };
        var formatThousands = function (d) {
            if(d == 0)
                return 0;
    
            if(eixo == 0 && vrv == 8)
                return removeDecimalZeroes(formatInit(d / 1e3)) + "M";
    
            return removeDecimalZeroes(formatInit(d / 1e3)) + "K";
        };
        var formatMillions = function (d) {
            if(d == 0)
                return 0;
    
            if(eixo == 0 && vrv == 8)
                return removeDecimalZeroes(formatInit(d / 1e6)) + "B";
    
            return removeDecimalZeroes(formatInit(d / 1e6)) + "M";
        };
    
        var formatBillions = function (d) {
            if(d == 0)
                return 0;
            return removeDecimalZeroes(formatInit(d / 1e9)) + "B";
        };
    
        function formatNano(d) {
            
            return removeDecimalZeroes(formatInit(d * 1e9)) + "n";
        };
    
        function formatMicro(d) {
            return removeDecimalZeroes(formatInit(d * 1e6)) + "µ";
        };
    
        function formatMili(d) {
            return removeDecimalZeroes(formatInit(d * 1e3)) + "m";
        };
    
        function formatPercent(d) {
            if (eixo == 0 && vrv == 9) {
                if (uf == 0)
                    return removeDecimalZeroes(formatInit(d * 1e2)) + "%";
                else{
                    return format3dc(d*1e2) + "%";
    
                }
    
            }
    
            return removeDecimalZeroes(formatInit(d * 1e4)) + "%";
    
        };
    
        var formatFraction = function (d) {
            var decimalDigitsCount = axisCountValidDecimalDigits(dados.value[dadosCounter]);
            var decimalDigits;
    
    
            // test decimal number and sets decimal digits that will be visible
            // if there are a number like 0,005 it will add + 1 to the counter so it will show something like = 0,0052
            decimalDigits = minFraction + higherZeroOcur;
    
            // console.log("valor: "+Math.abs(d)+" - decimal digits: "+(decimalDigits))
    
    
            var format = d3.format("." + decimalDigits + "f");
            // console.log(format(d))
            dadosCounter++;
    
            if(d == 0)
                return d;
    
    
            if(eixo == 0 && vrv == 9){
                if(uf == 0){
                    return formatPercent(d).replace(".", ",");
                }
                else if(cad != 0 && uf != 0){
                    return formatPercent(d).replace(".", ",");
    
                }
    
            }
    
            if(Math.abs(d) < 1/1e7){
                return formatNano(d).replace(".", ",");
            }
            else if(Math.abs(d) < 1/1e4){
                return formatMicro(d).replace(".", ",");
            }
    
            // else if(Math.abs(d) < 1/1e1){
            //     return formatMili(d).replace(".", ",");
            // }
            return (format(d)).replace(".", ",");
        };
    
        var axisCountValidDecimalDigits = function (value, acum) {
            var acum = acum || 0;
            var digitString = typeof value !== 'string' && typeof value !== 'undefined' ? (value).toString() : value;
    
            // break condition
            if (!value) {
                if (acum > higherZeroOcur)
                    higherZeroOcur = acum;
    
                return higherZeroOcur;
            }
    
            // if has dot (first iteration)
            if (digitString.match(/\./g))
                digitString = digitString.split(".")[1];
    
            var isZero = parseInt(digitString[0]) === 0 ? 1 : 0;
            var newValue = isZero ? digitString.substring(1) : "";
            var newAcum = acum + isZero;
    
            return axisCountValidDecimalDigits(newValue, newAcum);
        };
    
        var maxValue = d3.max(dados.value);
        var minValue = d3.min(dados.value);
    
        var preFormat = d3.format('.2f');
        var preFormatted = removeDecimalZeroes(preFormat(maxValue));
        var preFormattedMin = removeDecimalZeroes(preFormat(minValue));
        var isSmall = preFormatted < 1 && preFormatted > -1;
    
        // has decimal
        if (isSmall)
            return formatFraction;
    
        var preFormattedIntLength = Math.round(preFormatted).toString().length;
    
        if (preFormattedIntLength <= 3)
            return formatDefault;
        else if (preFormattedIntLength <= 6)
            return formatThousands;
        else if (preFormattedIntLength <= 9)
            return formatMillions;
        else if (preFormattedIntLength <= 12)
            return formatBillions;
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
                return y(d) - minBarHeight;
            }
                
            return y(d);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
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
                return Math.abs(y(d) + minBarHeight + 2 - zeroPosition);
            }


            return  Math.abs(y(d) - zeroPosition);
        })
        .attr("data-color", function(d, i, obj) {
            if((parameters.eixo == 1 && parameters.var == 6 && uos == 1)){
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
                        return color(dados.key[i])
                    }
                    else{
                        return COLORS.deg[parameters.deg].subdeg[getSubdegName(parameters.deg, (i+1).toString())]
                    }
                }

            }
            else if((parameters.eixo == 2 && (parameters.var == 18 || parameters.var == 19) && parameters.uos == 1)){
                if(parameters.deg == 0){
                    return color(dados.key[i])
                }
                else{
                    return color(cad)
                }
            }
            else if(parameters.eixo == 3 && (parameters.var == 5 || parameters.var == 8)) {
                return color(0);
            }
            else {
                return color(cad);
            }
        })
        .attr("fill", function (d,i ) {
            if((eixo == 1 && vrv == 6 && uos == 1) || (eixo == 2 && (vrv == 18 || vrv == 19) && uos == 1)){
                if(deg == 0)
                    return color(dados.key[i])
                else
                    return color(cad)
            }
            else if(eixo == 3 && (vrv == 5 || vrv == 8)) {
                return color(0);
            }
            else {
                return color(cad);
            }
        })
        .attr("opacity", 0.8)
        .on("click", function(d, i, obj) {
            if(window.innerWidth <= 1199)
                return;

            if(eixo == 1 && vrv == 6 && uos == 1)
                return;
                
            $("select[data-id='ano']").val(dados.key[i]);
            updateWindowUrl('ano', dados.key[i])

            destacarBarra(barras_box, dados.key[i]);
            var valor = $(barras_box+' svg').find('rect[data-legend="'+dados.key[i]+'"]').attr("data-value");

            // configInfoDataBoxBarrasClick(dados, i, valor);
            
            updateIframe();

        });

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

    destacarBarra(barras_box, parameters.ano);

    var valor = $(barras_box+' svg').find('rect[data-legend="'+parameters.ano+'"]').attr("data-value");

    updateData('barras', dados, valor, uos);

    if(parameters.eixo == 2 && parameters.var >= 18){

        var soma = 0;
        dados.value.forEach(function(key){
            soma += key;
        })

        updateData('barras', dados, soma, 1);

    }

}


var maxDecimalAxis = 0;

function getSoma(barraId) {
    var soma = 0;
    $("rect").each(function() {
        if($(this).attr("data-legend") == barraId) {
            if($(this).attr("data-value") != "NaN") soma+=parseFloat($(this).attr("data-value"));
        }
    });
    return soma;
}

function destacarBarra(barras_box, barraId) {

    d3.select(barras_box).selectAll("rect").each(function() {


    if($(this).attr("data-legend") == barraId) {
        if($(this).attr("class") !== "destacado") {
            $(this).attr("class", "destacado");
            $(this).attr("data-color", $(this).css("fill"));
            $(this).css("fill", corEixo[1]);
            $(this).css("opacity", "1");
        }
    }
    else {
        $(this).attr("class", "");
        $(this).css("fill", $(this).attr("data-color"));
        $(this).css("opacity", "0.7");
    }
    });
}

function loadTooltip_barras(d, key, eixo, vrv, dados){


    if(eixo === 0){
        if(vrv === 3){
           tooltipInstance.showTooltip(d, [
               ["title", key],
               ["", formatTextVrv(d, eixo, vrv)],
           ]);
       }
       else if(vrv === 9){

            tooltipInstance.showTooltip(d, [
                ["title", key],
                ["", formatTextVrv(d*100, eixo, vrv)],
                //    ["", formatTextTaxaVrv(dados.taxa[i], eixo, vrv)],
            ]);
       }
       else{
           tooltipInstance.showTooltip(d, [
               ["title", key],
               ["", formatTextVrv(d, eixo, vrv)],
           ]);
       }

   }
   else if(eixo === 1){

       if (vrv == 9) {
           tooltipInstance.showTooltip(d, [
               ["title", key],
               ["", formatTextVrv(d, eixo, vrv)],
           ]);
       }
       else if(vrv == 2){

           if(parameters.ocp == 0){
               tooltipInstance.showTooltip(d, [
                   ["title", key],
                   ["", formatTextVrv(d*10000, eixo, vrv)],
               ]);
           }
           else{

               tooltipInstance.showTooltip(d, [
                   ["title", key],
                   ["", formatTextVrv(d*100, eixo, vrv)],
               ]);
           }

       }
       else if (vrv == 1 || (vrv >= 4 && vrv <= 8) || vrv == 11 || vrv == 10 || vrv >= 12) {
           tooltipInstance.showTooltip(d, [
               ["title", key],
               ["", formatTextVrv(d, eixo, vrv)],
               // ["", formatTextTaxaVrv(dados.taxa[i], eixo, vrv)],
           ]);
       }
   }
   else if(eixo === 2){
       if(vrv == 1 || vrv == 2 || vrv == 3 || vrv == 4 ||   vrv == 5 || vrv == 6 || vrv == 7 || vrv == 8 || vrv == 9 || vrv == 10 || vrv == 11 || vrv == 12 || vrv == 13 || vrv == 14 || vrv == 15 || vrv == 16 || vrv == 18 || vrv == 19){
           tooltipInstance.showTooltip(d, [
               ["title", key],
               ["", formatTextVrv(d, eixo, vrv)],
               // ["", formatTextTaxaVrv(dados.taxa[i], eixo, vrv)],
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
               ["", formatTextVrv(d, eixo, vrv)],
               // ["", formatTextTaxaVrv(dados.taxa[i], eixo, vrv)],
           ]);
   }

}







