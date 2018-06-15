/*
var descricoes = []

var tooltipInstance = tooltip.getInstance();
if(eixo != 1 || deg == 0 || (eixo == 1 && (vrv == 4 || vrv == 5 || vrv == 6 ))) {    
    
    //Variaveis/Objetos
    var dict = {};

    // var info = [];
    var dados = {key: [], value: []};


    // import colors.json file
    var config = URL_PARAM
    var brasil_setor = []
    
    $.get('./db/total_setor.php' + "?var=" + vrv+"&cad="+cad+"&eixo="+eixo, function(dado){
        brasil_setor = JSON.parse(dado)
    })

     /*$.get('./db/json_barras.php?' + config, function(dado){
          console.log(dado)
     })*/
   //var corEixo = COLORS['eixo'][eixo].color;

        // import pt-br.json file for get the title

/*    d3.queue()
        .defer(d3.json, "./db/json_barras.php?" + config)
        .await(analyze);

    // return matching color value
    var color = function (colorId) {
        if (COLORS.cadeias[colorId]) {
            if(colorId){
                return COLORS.cadeias[colorId].color;

            }
            else{
                return corEixo[2];
            }
        } else {
            return COLORS.cadeias[0].color;
        }
    }
*/
    function analyze(error, data) {
        alert("oi")
        $('#loading').fadeOut('fast');
        if (error) {
            console.log(error);
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
        // updateAnoDefault(dados.key[dados.key.length-1]);
        //
        dados.key = d3.keys(data);
        //if(eixo == 0 && vrv == 3) dados.key = ajustaAnos(dados.key);
        //tamanho do grafico
        // AQUI automatizar map center
        var margin = {top: 20, right: 20, bottom: 30, left: 35},
            width = chartWidth - margin.left - margin.right,
            height = chartHeight - margin.top - margin.bottom;
        

        
        /*==================*/
        /* *** gráfico! *** */
        /*==================*/

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

        var maxDecimalAxis = 0;

        $.each(dados.value, function (i, d) {
            maxDecimalAxis = countValidDecimalDigits(d) > maxDecimalAxis ? countValidDecimalDigits(d) : maxDecimalAxis;
        });

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

        function make_y_gridlines() {
            return d3.axisLeft(y)
                    .scale(y)
                    .ticks(4);
        }

        // cria SVG

        var valueTop = margin.top + 5;
        if($(barras_box).find("svg").length == 0){
            var svg_barras = d3.select(barras_box).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + (margin.left+5) + "," + valueTop + ")");

            svg_barras.append("g")
                      .attr("class", "grid")
                      .style("opacity", 0.1)
    

        }
        
        svg_barras = d3.select(barras_box+">svg>g")
        
        //add the Y gridlines
        d3.select("g .grid").call(make_y_gridlines()
            .tickSize(-width + 10)
            .tickSizeOuter(0)
            .tickFormat("")
        );

        /*
        *  O trecho a seguir insere os anos contidos na visualização
        *  no select dos anos a fim de não criar visualizações impossíveis.
        */

        if(!((eixo == 2 && (vrv == 17) ) || (eixo == 1 && vrv == 6 && uos == 1))){
            $('select[data-id=ano]').each(function(){
                selectOp = this;
                $(this.options).each(function(){
                    $(this).remove();
                })
                dummy = dados.key.slice(0);
                dummy.reverse().forEach(function(d){
                    $(selectOp).append($('<option>', {
                        value: d,
                        text: d
                    }))
                })
                $(this).val(url['ano']);
            });
        }

        //Cria barras

        if(d3.select(barras_box).select("svg").select("g").selectAll("rect").size()!= 0){
            var rect = d3.select(barras_box)
                         .select("svg")
                         .select("g")
                         .selectAll("rect")
                         .data(dados.value)

            rect.exit().remove()

            rect.enter().append("rect").attr("x", function(d, i){
                return x(dados.key[i]);
            })
            
            rect = d3.select(barras_box)
                    .select("svg")
                    .select("g")
                    .selectAll("rect")

            rect
            .attr("data-legend", function(d, i, obj) { return dados.key[i]; })
            .attr("data-value", function(d) {   return d; })
            .attr("data-color", '')
            .attr("x", function (d, i) {
                return x(dados.key[i]);
            }).attr("y", function (d) {
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
                if (barHeight <= minBarHeight)
                    return height - minBarHeight;

                return y(d);
            })
            .attr("width", x.bandwidth())
            .attr("height", function (d) {

                var barHeight = y(d);

                // TEM VALOR NEGATIVO
                var zeroPosition = d3.min(dados.value) < 0 ? y(0) : height;
                var isValueZero = y(d) === zeroPosition;
                if (isValueZero)
                    return minBarHeight;
                if (barHeight < minBarHeight)
                    return minBarHeight;

                return  Math.abs(y(d) - zeroPosition);

            }).attr("fill", function (d,i ) {
                if((eixo == 1 && vrv == 6 && uos == 1) || (eixo == 2 && (vrv == 18 || vrv == 19) && uos == 1)){
                    if(deg == 0)
                        return color(dados.key[i])
                    else
                        return color(cad)
                }
                else if(eixo == 3 && (vrv == 5 || vrv == 8)){
                    return color(0);
                }
                else{
                    return color(cad);
                }
            })
        } else {

        
        var rect = svg_barras.selectAll("rect")
            .data(dados.value)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("data-legend", function(d, i, obj) { return dados.key[i]; })
            .attr("data-value", function(d) {   return d; })
            .attr("x", function (d, i) {
                return x(dados.key[i]);
            })
            .attr("y", function (d) {
                var barPosition = y(d);
                var zeroPosition = d3.min(dados.value) < 0 ? y(0) : false;
                var isMinValueNegative = zeroPosition !== false;
                var isValueNegative = d < 0;

                // TEM VALOR NEGATIVO
                if (isMinValueNegative) {

                    // NÚMERO NEGATIVO
                    if (isValueNegative)
                        return zeroPosition;

                    // S barra for muito pequena
                    if (barPosition == zeroPosition)
                        return zeroPosition - 5;

                    return y(d);
                }

                barPosition = Math.abs(height - barPosition);

                // BARRA PEQUENA
                if (barPosition <= minBarHeight)
                    return height - minBarHeight;

                return barPosition;
            })
            .attr("width", x.bandwidth())
            .attr("height", function (d) {
                var isValueZero = d === 0;
                var barHeight = y(d);

                // TEM VALOR NEGATIVO
                var zeroPosition = d3.min(dados.value) < 0 ? y(0) : false;

                if (isValueZero)
                    return minBarHeight;
                if (barHeight < minBarHeight)
                    return minBarHeight;

                return Math.abs(y(d) - zeroPosition);


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
        }    //mouseover
            rect.on("mouseover", function (d, i, obj) {
                var title_content = getDataVar(PT_BR, eixo, vrv).title;
                var title = title_content.replace("<span>", "");
                title = title.replace("<br>", "");
                title = title.replace("</span>", "");

                var valorTooltip = formatTextVrv(dados.value[i], eixo, vrv);
                var taxaTooltip = formatTextTaxaVrv(dados.taxa[i], eixo, vrv);

                if (eixo === 0 || eixo === 1 || eixo === 2 || eixo === 3){
                    loadTooltip(d, i, eixo, vrv)
                }

            })
            .on("mouseout", tooltipInstance.hideTooltip)
            .on("click", function(d, i, obj) {

                if(window.innerWidth <= 1199)
                    return;

                if(eixo == 1 && vrv == 6 && uos == 1)
                    return;
               
                $("select[data-id='ano']").val(dados.key[i]);
                updateWindowUrl('ano', dados.key[i])


                destacaBarra(dados.key[i]);
                var valor = $(barras_box+' svg').find('rect[data-legend="'+dados.key[i]+'"]').attr("data-value");


                configInfoDataBoxBarrasClick(eixo, vrv, dados, i, valor);

            })
            .style("cursor", "pointer");
        
        //cria labels barras
        if (withLabels) {
           svg_barras.selectAll("text g")
                .data(dados.value, function (d) {
                    return d;
                })
                .enter()
                .append("text")
                .attr("class", "barTopValue")
                .text(function (d) {
                    return formatNumber(d);
                })
                .attr("text-anchor", "middle")
                .attr("x", function (d, i) {
                    return x(dados.key[i]) + x.bandwidth() / 2;
                })
                .attr("y", function (d) {
                    var minValue = y.domain()[0];
                    var maxValue = y.domain()[1];
                    var zeroPosition = y(0);
                    var isMinValueNegative = minValue < 0;
                    var isValueNegative = d < 0;
                    var barHeight = y(d);
                    var isValueZero = d === 0;
                    var isYAxisZero = y(d) <= 5;

                    // TEM VALOR NEGATIVO
                    if (isMinValueNegative) {

                        // VALOR NEGATIVO
                        if (isValueNegative) {
                            barHeight = y(d) - zeroPosition;
                            return y(d) + minBarHeight + 6;
                        }

                        // BARRA MUITO PEQUENA
                        if (barHeight <= minBarHeight || isValueZero) {
                            return y(d) - minBarHeight - 4;
                        }

                        // SE RESULTADO DE y(d) FOR ZERO (0)
                        if (isYAxisZero)
                            return -5;

                        return y(d) - 5;

                    }

                    return y(d) - 5;
                });
        }

        //formata labels eixo X
        var xAxis = d3.axisBottom(x)
            .tickFormat(function (d, i) {
                return dados.key[i];
            })
            .tickSize(5)
            .tickPadding(5);

        var yAxis = d3.axisLeft()
            .scale(y)
            .tickFormat(formatYAxis);

        
        //adiciona eixo X
        if($(".eixo-x").length == 0){
            svg_barras.append("g").attr("class", "eixo-x")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        } else {
            d3.select(".eixo-x")
            .transition()
            .duration(400)
            .call(xAxis);
        }

        //adiciona eixo Y
        if($(".eixo-y").length == 0){
            svg_barras.append("g").attr("class", "eixo-y")
            .attr("transform", "translate(0, 0)")
            .call(yAxis);
        } else {
            d3.select(".eixo-y")
            .transition()
            .duration(400)
            .call(yAxis);
        }
       
        // testa e mostra mensagem de valor zerado/indisponível
        var isValueZero = dados.value.reduce(function (sum, val) {
            return sum + val;
        }, 0) === 0;
        var isTaxaZero = dados.taxa.reduce(function (sum, val) {
            return sum + val;
        }, 0) === 0;
        var isPercentageZero = dados.percentual.reduce(function (sum, val) {
            return sum + val;
        }, 0) === 0;
        if (isValueZero && isTaxaZero && isPercentageZero) {
            d3.selectAll(barras_box+">svg>g>*")
                .filter(function (d) {
                    // não aplica display none no título
                    var clss = d3.select(this).attr("class");
                    return !/title/g.test(clss);
                })
                .attr("display", "none");

            d3.select(barras_box+">svg")
                .append("g")
                .attr("class", "no-info")
                .append("text")
                .text("Não há dados sobre essa desagregação")
                .attr("x", d3.select(barras_box+">svg").attr("width") / 2)
                .attr("y", d3.select(barras_box+">svg").attr("height") / 2)
                .attr("text-anchor", "middle");
        }

        destacaBarra(url['ano']);

        var valor = $(barras_box+' svg').find('rect[data-legend="'+url['ano']+'"]').attr("data-value");

        if(!(eixo == 1 && vrv == 6 && uos == 1) && !(eixo == 2 && (vrv == 18 || vrv == 19) && uos == 1)){
            configInfoDataBoxBarras(eixo, vrv, dados, valor);         
        }

        if(eixo == 2 && (vrv == 18 || vrv == 19))
            updateDescription(descricoes, eixo, vrv, mec);
        else if(eixo == 3)
            updateDescription(descricoes, eixo, vrv, mundo);
        else
            updateDescription(descricoes, eixo, vrv, ocp);

        if(url['slc'] == 1){
            updateDataDesc()
        }



        if(vrv >= 11 && eixo == 1){
            updateDataDescUoS(ocp);
        }

        function loadTooltip(d, i, eixo, vrv){
            if(eixo === 0){
                 if(vrv === 3){
                    tooltipInstance.showTooltip(d, [
                        ["title", dados.key[i]],
                        ["", formatTextVrv(dados.value[i], eixo, vrv)],
                    ]);
                }
                else if(vrv === 9){

                     tooltipInstance.showTooltip(d, [
                         ["title", dados.key[i]],
                         ["", formatTextVrv(dados.value[i]*100, eixo, vrv)],
                         //    ["", formatTextTaxaVrv(dados.taxa[i], eixo, vrv)],
                     ]);
                }
                else{
                    tooltipInstance.showTooltip(d, [
                        ["title", dados.key[i]],
                        ["", formatTextVrv(dados.value[i], eixo, vrv)],
                    ]);
                }

            }
            else if(eixo === 1){
                if (vrv === 9) {
                    tooltipInstance.showTooltip(d, [
                        ["title", dados.key[i]],
                        ["", formatTextVrv(dados.value[i], eixo, vrv)],
                    ]);
                }
                else if(vrv === 2){

                    if(url['ocp'] == 0){
                        tooltipInstance.showTooltip(d, [
                            ["title", dados.key[i]],
                            ["", formatTextVrv(dados.value[i]*10000, eixo, vrv)],
                        ]);
                    }
                    else{

                        tooltipInstance.showTooltip(d, [
                            ["title", dados.key[i]],
                            ["", formatTextVrv(dados.value[i]*100, eixo, vrv)],
                        ]);
                    }

                }
                else if (vrv === 1 || (vrv >= 4 && vrv <= 8) || vrv === 11 || vrv === 10 || vrv >= 12) {
                    tooltipInstance.showTooltip(d, [
                        ["title", dados.key[i]],
                        ["", formatTextVrv(dados.value[i], eixo, vrv)],
                        // ["", formatTextTaxaVrv(dados.taxa[i], eixo, vrv)],
                    ]);
                }
            }
            else if(eixo === 2){
                if(vrv === 1 || vrv === 2 || vrv === 3 || vrv === 4 ||   vrv === 5 || vrv === 6 || vrv === 7 || vrv === 8 || vrv === 9 || vrv == 10 || vrv === 11 || vrv === 12 || vrv === 13 || vrv === 14 || vrv === 15 || vrv === 16 || vrv === 18 || vrv === 19){
                    tooltipInstance.showTooltip(d, [
                        ["title", dados.key[i]],
                        ["", formatTextVrv(dados.value[i], eixo, vrv)],
                        // ["", formatTextTaxaVrv(dados.taxa[i], eixo, vrv)],
                    ]);
                }
                else if(vrv === 17){
                    tooltipInstance.showTooltip(d, [
                        ["title", dados.key[i]],
                        ["", formatTextVrv(dados.value[i], eixo, vrv)],
                    ]);
                }
            }
            else if(eixo === 3){
                    tooltipInstance.showTooltip(d, [
                        ["title", dados.key[i]],
                        ["", formatTextVrv(dados.value[i], eixo, vrv)],
                        // ["", formatTextTaxaVrv(dados.taxa[i], eixo, vrv)],
                    ]);
            }

        }



    }

/*
}
//BARRA 2
else {

    // import colors.json file
    var COLORS;
    var PT_BR;

    var config = "?var=" + vrv + "&uf=" + uf + "&cad=" + cad + "&uos=" + uos + "&ano=" + ano + "&ocp=" + ocp + "&typ=" + typ + "&prc=" + prc + "&slc=" + slc + "&mec=" + mec + "&mod=" + mod + "&pfj=" + pfj + "&eixo=" + eixo + "&deg=" + deg +  "&subdeg=" + subdeg + "&ano=" + ano;

    d3.json('data/colors.json', function (error, data) {
        if (error) throw error;
        COLORS = data;

        // import pt-br.json file for get the title
        d3.json('data/pt-br.json', function (error, data) {
            if (error) throw error;

            PT_BR = data;
           //  $.get("./db/json_barras.php" + config, function(data){
           //        console.log(data)
           // })
            d3.queue()
                .defer(d3.json, "./db/json_barras.php" + config)
                .await(analyze_eixo1);
        });

    });
    // return matching color value
    
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

        // console.log(deg)
        // console.log(subdeg)

        if(deg == 1 && subdeg != 0) {

            var array_names = [];
            PT_BR.select.prt.forEach(function(d, i) {
                if(i) {
                    array_names.push(d.name_bar);
                }
            });

        }
        if(deg == 4 && subdeg  != 0) {
            var array_names = [];
            PT_BR.select.esc.forEach(function(d, i) {
                if(i) {
                    array_names.push(d.name);
                }
            });

        }
        if(deg == 3 && subdeg  != 0) {
            var array_names = [];
            PT_BR.select.fax.forEach(function(d, i) {
                if(i) {
                    if(!(slc == 1 && d.name == "Não classificado")) array_names.push(d.name);
                }
            });
        }
        if(deg == 2 && subdeg  != 0) {
            var array_names = [];
            PT_BR.select.sex.forEach(function(d, i) {
                if(i) {
                    array_names.push(d.name);
                }
            });
            // console.log(array_names)

        }
        if(deg == 6 && subdeg  != 0) {
            var array_names = [];
            PT_BR.select.frm.forEach(function(d, i) {
                if(i) {
                    array_names.push(d.name);
                }
            });
        }
        if(deg == 8 && subdeg  != 0) {
            var array_names = [];
            PT_BR.select.snd.forEach(function(d, i) {
                if(i) {
                    array_names.push(d.name);
                }
            });
        }
        if(deg == 7 && subdeg  != 0) {
            var array_names = [];
            PT_BR.select.prv.forEach(function(d, i) {
                if(i) {
                    array_names.push(d.name);
                }
            });
        }
        if(deg == 5 && subdeg  != 0) {
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
        return subdeg;
    }

    function analyze_eixo1(error, data) {
        $('#loading').fadeOut('fast');
        if (error) {
            console.log(error);
        }

        var desag = selectDesag()

        if((vrv == 6 || vrv == 4) && eixo == 1){
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


        setTimeout(function () {
        }, 500);

        var margin = {top: 20, right: 20, bottom: 30, left: 35},
            width = chartWidth - margin.left - margin.right,
            height = chartHeight - margin.top - margin.bottom;

        var svg_barras = d3.select(barras_box)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        /* Data in strings like it would be if imported from a csv */
/*
        var parse = d3.time.format("%Y").parse;
        var dados = desagregacao_names().map(function (fruit) {
            return data.map(function (d) {
                return {x: parse(d.year), y: +d[fruit]};
            });
        });

        // Transpose the data into layers
        var dataset = d3.layout.stack()(dados);

        

        // Set x, y and colors
        var x_eixo1 = d3.scale.ordinal()
            .domain(dataset[0].map(function (d) {
                return d.x;
            }))
            .rangeRoundBands([10, width - 10]);

        var y_eixo1 = d3.scale.linear()
            .domain([0, d3.max(dataset, function (d) {
                return d3.max(d, function (d) {
                    return d.y0 + d.y;
                });
            })])
            .range([height, 0]);

        var colors = d3.scale.linear()
                    .domain([0, dados.length])
                    .range([COLORS.cadeias[cad].color, COLORS.cadeias[cad].gradient['2']])
                    
        // Define and draw axes
        var yAxis_eixo1 = d3.svg.axis()
            .scale(y_eixo1)
            .orient("left")
            .ticks(10)
            .tickSize(-width, 0, 0)
            .tickFormat(function (d) {
                return formatGreatNumbers(d, '')
            });

        var xAxis_eixo1 = d3.svg.axis()
            .scale(x_eixo1)
            .orient("bottom")
            .tickFormat(d3.time.format("%Y"));

        svg_barras.append("g")
            .attr("class", "y axis")
            .call(yAxis_eixo1);

        svg_barras.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis_eixo1);



        // Create groups for each series, rects for each segment
        var groups = svg_barras.selectAll("g.cost")
            .data(dataset)
            .enter().append("g")
            .attr("class", "cost")
            .style("fill", function (d, i) {
                return colors(i);
            });

        var rect = groups.selectAll("rect")
            .data(function (d) {
                return d;
            })
            .enter()
            .append("rect")
            .attr("data-legend", function(d) { return d.x; })
            .attr("data-value", function(d) { return d.y; })
            .attr("x", function (d) {
                return x_eixo1(d.x);
            })
            .attr("y", function (d) {
                return y_eixo1(d.y0 + d.y);
            })
            .attr("height", function (d) {
                return y_eixo1(d.y0) - y_eixo1(d.y0 + d.y);
            })
            .attr("width", x_eixo1.rangeBand())
            .on("mouseover", function (d, i, obj) {
                loadTooltip(d, obj,  i, eixo, vrv);
            })
            .on("mouseout", tooltipInstance.hideTooltip)
            .on("click", function(d, i, obj) {
                if(window.innerWidth <= 800)
                    return;

                if(d.x.getFullYear() != url['ano']) {
                    url['ano'] = d.x.getFullYear();

                    updateWindowUrl('ano', d.x.getFullYear())
                    destacaBarra(d.x, true);
                }

                $(window.document).find(".bread-select[data-id=deg]").find("optgroup[value="+deg+"]").find("option[value="+(obj+1)+"]").prop('selected', true)//.val(obj+1)
                updateWindowUrl('deg', deg);
                updateWindowUrl('subdeg', obj+1)
                configInfoDataBoxBarrasStackedClick(eixo, vrv, d, getSoma(d.x), deg);
            })
            .style("cursor", "pointer");
        if((vrv == 6 || vrv == 4) && eixo == 1)
            desagregacao = 1
        else
            desagregacao = $(".bread-select[data-id=deg]").val();
        dado_anos = dataset[desagregacao-1]
        dado = dado_anos.filter(function(obj){
            return obj.x.getFullYear() == url['ano']
        })[0]
        
        configInfoDataBoxBarrasStacked(eixo, vrv, dado, getSoma(dado.x), deg);
        
        
        $(barras_box).find('svg').attr('height',$(barras_box).height() + 350);
        
        // Prep the tooltip bits, initial display is hidden
        var tooltip = svg_barras.append("g")
            .attr("class", "tooltip")
            .style("display", "none");

        tooltip.append("rect")
            .attr("width", 30)
            .attr("height", 20)
            .attr("fill", "white")
            .style("opacity", 0.5);

        tooltip.append("text")
            .attr("x", 15)
            .attr("dy", "1.2em")
            .style("text-anchor", "middle")
            .attr("font-size", "12px")
            .attr("font-weight", "bold");

        if(slc == 0) {
            destacaBarra(dataset[0][url['ano']-2007].x, true);
        }
        else {
            if(url['ano'] < 2011) destacaBarra(dataset[0][url['ano']-2007].x, true);
            else destacaBarra(dataset[0][url['ano']-2008].x, true);
        }
        if(eixo == 0){
            setStateTitle(function(){if(data[dados.key[0]].uf == "Todos") return "Brasil"; else return data[dados.key[0]].uf});
        }
        if(eixo == 2 && (vrv == 18 || vrv == 19))
            updateDescription(descricoes, eixo, vrv, mec);
        else if(eixo == 3)
            updateDescription(descricoes, eixo, vrv, mundo);
        else
            updateDescription(descricoes, eixo, vrv, ocp);

    }

    function loadTooltip(d, obj, i, eixo, vrv){


        if(eixo === 1){
            if (vrv === 9) {
                tooltipInstance.showTooltip(d, [
                    ["title", desagregacao_names()[obj]],
                    ["", formatTextVrv(d.y, eixo, vrv)]
                ]);
            }
            else if(vrv === 2){

                if(url['ocp'] == 0){
                    tooltipInstance.showTooltip(d, [
                        ["title", desagregacao_names()[obj]],
                        ["", formatTextVrv(d.y*100, eixo, vrv)]
                    ]);
                }
                else{
                    tooltipInstance.showTooltip(d, [
                        ["title", desagregacao_names()[obj]],
                        ["", formatTextVrv(d.y*100, eixo, vrv)]
                    ]);
                }
            }
            else if (vrv === 1 || (vrv >= 4 && vrv <= 8) || vrv === 11 || vrv === 10 || vrv >= 12) {
                tooltipInstance.showTooltip(d, [
                    ["title", desagregacao_names()[obj]],
                    ["", formatTextVrv(d.y, eixo, vrv)]
                ]);
            }
        }


    }

}
*/
