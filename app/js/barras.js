/* tamanho container */
var chartWidth = $('.chart').width();
var chartHeight = $('.chart').height();
var minBarHeight = 5;
var withLabels = false;
d3.json('./data/descricoes.json', function (error, desc){
    if (error) throw error;
    descricoes = desc;
})
function getSoma(barraId) {
    var soma = 0;
    $("rect").each(function() {
        if($(this).attr("data-legend") == barraId) {
            if($(this).attr("data-value") != "NaN") soma+=parseFloat($(this).attr("data-value"));
        }
    });
    return soma;
}

var corEixo = window.parent.colorJSON['eixo'][eixo].color;

updateTitleClickSCC()
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function destacaBarra(barraId, stacked = false) {
    i = 0;
    $("rect").each(function() {

        if(stacked) {

            var rgb = hexToRgb(corEixo[1].split("#")[1]);
            r = rgb.r;
            g = rgb.g;
            b = rgb.b;

            if($(this).attr("data-legend") == barraId) {
                if($(this).attr("class") !== "destacado") {
                    $(this).attr("class", "destacado");
                    $(this).attr("data-color", $(this).css("fill"));
                    $(this).css("fill", function(d){ return'rgb('+(r+i*15)+','+(g+i*15)+','+(b+i*15)+')'});
                    $(this).animate({"opacity": "1"}, "fast");
                    i++;
                }
            }
            else {
                $(this).attr("class", "");
                if($(this).attr("data-color") != undefined) $(this).css("fill", $(this).attr("data-color"));
                $(this).animate({"opacity": "0.7"}, "fast");
            }

        }
        else {
            if($(this).attr("data-legend") == barraId) {
                if($(this).attr("class") !== "destacado") {
                    $(this).attr("class", "destacado");
                    $(this).attr("data-color", $(this).css("fill"));
                    $(this).css("fill", corEixo[1]);
                    $(this).animate({"opacity": "1"}, "fast");
                }
            }
            else {
                $(this).attr("class", "");
                if($(this).attr("data-color") != undefined) $(this).css("fill", $(this).attr("data-color"));
                $(this).animate({"opacity": "0.7"}, "fast");
            }
        }
    });
}
var descricoes = []


var tooltipInstance = tooltip.getInstance();
if(eixo != 1 || deg == 0 || (eixo == 1 && (vrv == 4 || vrv == 5 || vrv == 6 ))) {    /*==== Barras JS ====*/
    
    //Variaveis/Objetos
    var dict = {};

    // var info = [];
    var dados = {key: [], value: []};



    // import colors.json file
    var colorJSON;
    var textJSON;
    var config = "?var=" + vrv + "&uf=" + uf + "&atc=" + atc + "&slc=" + slc + "&cad=" + cad + "&uos=" + uos + "&ano=" + ano + "&prt=" + prt + "&ocp=" + ocp + "&sex=" + sex + "&fax=" + fax + "&esc=" + esc + "&cor=" + cor + "&typ=" + typ + "&prc=" + prc + "&frm=" + frm + "&prv=" + prv + "&snd=" + snd + "&mec=" + mec + "&mod=" + mod + "&pfj=" + pfj + "&eixo=" + eixo + "&mundo=" +mundo + "&deg=" +deg + "&ano=" +ano;
    var brasil_setor = []
    
    $.get('./db/total_setor.php' + "?var=" + vrv+"&cad="+cad+"&eixo="+eixo+"&prt="+prt, function(dado){
        brasil_setor = JSON.parse(dado)
    })
    /*
     $.get('./db/json_barras.php' + config, function(dado){
         // console.log(dado)
     })*/
   
    d3.json('data/colors.json', function (error, data) {
        if (error) throw error;
        colorJSON = data;


        // import pt-br.json file for get the title
        d3.json('data/pt-br.json', function (error, data) {
            if (error) throw error;
            textJSON = data;
            d3.queue()
                .defer(d3.json, "./db/json_barras.php" + config)
                .await(analyze);
        });

    });
    // return matching color value
    var color = function (colorId) {
        if (colorJSON.cadeias[colorId]) {
            if(colorId){
                return colorJSON.cadeias[colorId].color;

            }
            else{
                return corEixo[2];
            }
        } else {
            return colorJSON.cadeias[0].color;
        }
    }

    function analyze(error, data) {
        $('#loading').fadeOut('fast');
        if (error) {
            console.log(error);
        }

        var dados = {key: [], value: [], percentual: [], taxa: [], percentual_setor: []};

        Object.keys(data).forEach(function (key) {
            dados.percentual_setor.push(data[key].valor/brasil_setor[key])
            if ((vrv === 3) && data[key].ano === 2007) {
            } else {
                dados.key.push(data[key].ano);
            }

            if (( vrv === 3 ) && eixo ==0) dados.value.push(100 * data[key].valor);
            else dados.value.push(data[key].valor);

            if ( vrv === 2  || vrv === 9) dados.percentual.push(0);
            else dados.percentual.push(data[key].percentual);

            if (vrv === 2) dados.taxa.push(0);
            else dados.taxa.push(data[key].taxa);
        });

        // updateAnoDefault(dados.key[dados.key.length-1]);
        //
        dados.key = d3.keys(data);
        if(eixo == 0 && vrv == 3) dados.key = ajustaAnos(dados.key);
        //tamanho do grafico
        // AQUI automatizar map center
        var margin = {top: 20, right: 20, bottom: 30, left: 35},
            width = chartWidth - margin.left - margin.right,
            height = chartHeight - margin.top - margin.bottom;

        dados.value.push(0);
        // if(eixo === 0 && (vrv >= 10 && vrv <= 13)) dados.value.push(1);
        //valores maximos e minimos
        var minValue = d3.min(dados.value);
        var maxValue = d3.max(dados.value);
        // if(eixo === 0 && (vrv >= 10 && vrv <= 13)) dados.value.push(1);

        // console.log(maxValue)

        //distribuicao de frequencias
        var quant = 9;
        var range = maxValue - minValue;
        var amp = minValue <= 1 ? range / quant : Math.round(range / quant);

        //domino de valores para as cores do mapa
        var dom = [
            (minValue + (amp / 4)),
            (minValue + amp),
            (minValue + (2 * amp)),
            (minValue + (3 * amp)),
            (minValue + (4 * amp)),
            (minValue + (5 * amp)),
            (minValue + (6 * amp)),
            (minValue + (7 * amp)),
            (minValue + (8 * amp))
        ];
        //ajuste do dominio
        var i = 0;

        while (i < 9) {
            if (minValue > 1)
                dom[i] = dom[i] - (dom[i] % 5);
            i++;
        }

        // creates cadeia's color range array from color.json file
        var colorsRange = [];
        $.each(colorJSON.cadeias[cad].gradient, function (i, rgb) {
            if (i > 1)
                colorsRange.push(rgb);
        });
        /*==================*/
        /* *** gráfico! *** */
        /*==================*/


        // console.log(dados)

        var minDisplayValue = minValue > 0 ? minValue - (minValue / 10) : 0;

        if(eixo == 0 & (vrv >= 10 && vrv <= 13)) {
            var tamanho = dados.value.length;
        }
        else if(eixo == 0 && (vrv == 3)) {
            var tamanho = dados.value.length - 1;
        }
        else {
            var tamanho = dados.value.length;
        }
        var x = d3.scaleBand()
            .domain(d3.range(tamanho - 1))
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

        // if(eixo == 0 & (vrv >= 10 && vrv <= 13)) dados.value.pop();
        dados.value.pop();

        if(vrv === 3 && eixo == 0) {
            dados.value.splice(0,1);

        }
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

        // cria SVG

        var valueTop = margin.top + 5;
        var svg = d3.select("#corpo").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + (margin.left+5) + "," + valueTop + ")");

        function make_y_gridlines() {
            return d3.axisLeft(y)
                .scale(y)
                .ticks(4);
        }

        //add the Y gridlines
        svg.append("g")
            .attr("class", "grid")
            .style("opacity", 0.1)
            .call(make_y_gridlines()
                .tickSize(-width + 10)
                .tickSizeOuter(0)
                .tickFormat("")
            );

        /*
        *  O trecho a seguir insere os anos contidos na visualização
        *  no select dos anos a fim de não criar visualizações impossíveis.
        */

        if(!((eixo == 2 && (vrv == 17) ) || (eixo == 1 && vrv == 6 && uos == 1))){
            $(window.parent.document).find('select[data-id=ano]').each(function(){
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

        // console.log(dados)

        //Cria barras
        svg.selectAll("rect")
            .data(dados.value, function (d) {
                return d;
            })
            .enter().append("rect")
            .attr("class", "bar")
            .attr("data-legend", function(d, i, obj) { return dados.key[i]; })
            .attr("data-value", function(d) {   return d; })
            .attr("x", function (d, i) {
                return x(i);
            })
            .attr("y", function (d) {
                var graphBottom = height;
                var barPosition = Math.abs(y(d));
                var barHeight = y(d);
                var zeroPosition = d3.min(dados.value) < 0 ? y(0) : false;
                var isMinValueNegative = zeroPosition !== false;
                var isValueNegative = d < 0;
                var zeroPositionExists = zeroPosition < height;
                var isValueZero = d === 0;
                var isMaxValue = d3.max(dados.value) == d;

                // TEM VALOR NEGATIVO
                if (isMinValueNegative) {

                    // NÚMERO NEGATIVO
                    if (isValueNegative)
                        return zeroPosition;

                    // S barra for muito pequena
                    if (barHeight == zeroPosition)
                        return zeroPosition - 5;

                    return y(d);
                }

                barHeight = Math.abs(height - barHeight);

                // BARRA MUITO PEQUENA
               // if (barHeight <= 3)
                //return barHeight < 5? height - (5 - barHeight) : (barPosition - barHeight) - 1 ;
                   // return height - (minBarHeight - barHeight);

                // BARRA PEQUENA
                if (barHeight <= minBarHeight)
                    return height - minBarHeight;

                return barPosition;
            })
            .attr("width", x.bandwidth())
            .attr("height", function (d) {
                var minValue = y.domain()[0];
                var maxValue = y.domain()[1];
                var zeroPosition = y(0);
                var isMinValueNegative = minValue < 0;
                var isValueNegative = d < 0;
                var isValueZero = d === 0;
                var barHeight = y(d);

                // TEM VALOR NEGATIVO
                if (isMinValueNegative) {
                    var zeroPosition = d3.min(dados.value) < 0 ? y(0) : false;

                    // NÚMERO NEGATIVO
                    if (isValueNegative) {
                        barHeight = y(d) - zeroPosition;

                        if (barHeight < minBarHeight || isValueZero)
                            return minBarHeight;

                        return Math.abs(y(d)) - zeroPosition;
                    }

                    // NÚMERO POSITIVO
                    if (isValueZero)
                        return minBarHeight;

                    return Math.abs(y(d) - zeroPosition);
                }

                barHeight = height - barHeight;

                if (barHeight < minBarHeight)
                    return minBarHeight;

                return barHeight;
            })
            .attr("fill", function (d,i ) {
                if((eixo == 1 && vrv == 6 && uos == 1) || (eixo == 2 && (vrv == 18 || vrv == 19) && uos == 1)){
                    if(deg == 0)
                        return color(dados.key[i])
                    else
                        return color(cad)
                }
                else if(eixo == 3 && (vrv == 5 || vrv == 8))
                    return color(0);
                else
                    return color(cad);
            })
            //mouseover
            .on("mouseover", function (d, i, obj) {
                var title_content = getDataVar(textJSON, eixo, vrv).title;
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

                if(window.parent.innerWidth <= 1199)
                    return;

                if(eixo == 1 && vrv == 6 && uos == 1)
                    return




                if((eixo == 1 && url['var'] > 11) ||
                    (eixo == 0 && url['var'] > 9) ||
                    eixo == 2 && (url['var'] == 15 || url['var'] == 16)){
                    if(eixo == 1 && url['slc'] == 1){
                        if(url['ocp'] == 1) {
                            var newSCCSrc = $(window.parent.document).find("#view_box_barras").attr("src").replace(/ano=[0-9]*/, "ano=" + dados.key[i]);
                            $(window.parent.document).find("#view_box_barras").attr("src", newSCCSrc);
                        }
                        else {
                            var newSCCSrc = $(window.parent.document).find("#view_box").attr("src").replace(/ano=[0-9]*/, "ano=" + dados.key[i]);
                            $(window.parent.document).find("#view_box").attr("src", newSCCSrc);
                        }
                    }
                    else {
                        if(url['uos'] == 0) {
                            var newSCCSrc = $(window.parent.document).find("#view_box_barras").attr("src").replace(/ano=[0-9]*/, "ano=" + dados.key[i]);
                            newSCCSrc = newSCCSrc.replace(/cad=[0-9]*/, "cad=" + url['cad']);
                            $(window.parent.document).find("#view_box_barras").attr("src", newSCCSrc);
                        }
                        else {
                            var newSCCSrc = $(window.parent.document).find("#view_box").attr("src").replace(/ano=[0-9]*/, "ano=" + dados.key[i]);
                            newSCCSrc = newSCCSrc.replace(/cad=[0-9]*/, "cad=" + url['cad']);
                            $(window.parent.document).find("#view_box").attr("src", newSCCSrc);
                        }
                    }
                }
                else {

                    var newMapaSrc = $(window.parent.document).find("#view_box").attr("src").replace(/ano=[0-9]*/, "ano="+dados.key[i]);
                    newMapaSrc = newMapaSrc.replace(/uf=[0-9]*/, "uf="+url['uf']);
                    newMapaSrc = newMapaSrc.replace(/prc=[0-9]*/, "prc=" + url['prc']);

                    if (eixo == 2 && url['var'] == 10) {
                        if (url['mec'] == 0) {
                            var newSCCSrc = $(window.parent.document).find("#view_box_barras").attr("src").replace(/ano=[0-9]*/, "ano=" + dados.key[i]);
                            newSCCSrc = newSCCSrc.replace(/cad=[0-9]*/, "cad=" + url['cad']);
                            $(window.parent.document).find("#view_box_barras").attr("src", newSCCSrc);
                        }
                        else {
                            var newSCCSrc = $(window.parent.document).find("#view_box").attr("src").replace(/ano=[0-9]*/, "ano=" + dados.key[i]);
                            newSCCSrc = newSCCSrc.replace(/cad=[0-9]*/, "cad=" + url['cad']);
                            $(window.parent.document).find("#view_box").attr("src", newSCCSrc);
                        }
                    }
                    else if (eixo == 2 && url['var'] == 17) {
                        var newBarraSrc = $(window.parent.document).find("#view_box_barras").attr("src");
                        newBarraSrc = newBarraSrc.replace(/ano=[0-9]*/, "ano=" + url['ano']);
                        $(window.parent.document).find("#view_box_barras").attr("src", newBarraSrc);

                    }
                    else if (eixo == 2 && (url['var'] == 18 || url['var'] == 19)) {
                        var newDonutSrc = $(window.parent.document).find("#view_box_barras").attr("src");
                        newDonutSrc = newDonutSrc.replace(/ano=[0-9]*/, "ano=" + url['ano']);
                        $(window.parent.document).find("#view_box_barras").attr("src", newDonutSrc);

                    }
                    else if (eixo == 3 && (url['var'] == 5 || url['var'] == 8)) {
                        var newSCCSrc = $(window.parent.document).find("#view_box_scc").attr("src").replace(/ano=[0-9]*/, "ano=" + dados.key[i]);
                        $(window.parent.document).find("#view_box_scc").attr("src", newSCCSrc);
                        newSCCSrc = $(window.parent.document).find("#view_box_barras").attr("src").replace(/ano=[0-9]*/, "ano=" + dados.key[i]);
                        $(window.parent.document).find("#view_box_barras").attr("src", newSCCSrc);
                        newMapaSrc = $(window.parent.document).find("#view_box").attr("src").replace(/ano=[0-9]*/, "ano=" + dados.key[i]);


                    }
                    else if (eixo == 3 && (url['var'] >= 1 && url['var'] != 5 && url['var'] != 8 && url['var'] <= 10 || url['var'] == 12)) {
                        var newSCCSrc = $(window.parent.document).find("#view_box_barras").attr("src").replace(/ano=[0-9]*/, "ano=" + dados.key[i]);
                        newSCCSrc = $(window.parent.document).find("#view_box_barras").attr("src").replace(/ano=[0-9]*/, "ano=" + dados.key[i]);
                        $(window.parent.document).find("#view_box_barras").attr("src", newSCCSrc);
                    }
                    else {
                        if (url['uos'] == 1) {
                            var newSCCSrc = $(window.parent.document).find("#view_box_barras").attr("src").replace(/ano=[0-9]*/, "ano=" + dados.key[i]);
                            newSCCSrc = newSCCSrc.replace(/cad=[0-9]*/, "cad=" + url['cad']);
                            $(window.parent.document).find("#view_box_barras").attr("src", newSCCSrc);
                        }
                        else {
                            var newSCCSrc = $(window.parent.document).find("#view_box_scc").attr("src").replace(/ano=[0-9]*/, "ano=" + dados.key[i]);
                            newSCCSrc = newSCCSrc.replace(/cad=[0-9]*/, "cad=" + url['cad']);
                            $(window.parent.document).find("#view_box_scc").attr("src", newSCCSrc);
                        }
                    }
                }




                $(window.parent.document).find("#view_box").attr("src", newMapaSrc);
                $(window.parent.document).find("select[data-id='ano']").val(dados.key[i]);


                destacaBarra(dados.key[i]);
                var valor = $('svg').find('rect[data-legend="'+dados.key[i]+'"]').attr("data-value");


                configInfoDataBoxBarrasClick(eixo, vrv, dados, i, valor);

            })
            .style("cursor", "pointer");
        // cria título do gráfico
        if (data[dados.key[0]].uos == undefined) {
            svg.append("text")
                .attr("x", (width / 2))
                .attr("y", 0 - 9)
                .attr("text-anchor", "middle")
                .attr("class", "barras-title")
                .text("");
        }
        else if (data[dados.key[0]].uos != 2) {
            svg.append("text")
                .attr("x", (width / 2))
                .attr("y", 0 - 9)
                .attr("text-anchor", "middle")
                .attr("class", "barras-title")
                .text("");
        }
        else {
            svg.append("text")
                .attr("x", (width / 2))
                .attr("y", 0 - 9)
                .attr("text-anchor", "middle")
                .attr("class", "barras-title")
                .text("");
        }


        //cria labels barras
        if (withLabels) {
            svg.selectAll("text g")
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
                    return x(i) + x.bandwidth() / 2;
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
            .tickFormat(function (d) {
                if (eixo == 0 && vrv === 3) return dados.key[d]; else return dados.key[d];
            })
            .tickSize(5)
            .tickPadding(5);

        var yAxis = d3.axisLeft()
            .scale(y)
            .tickFormat(formatYAxis);

        //adiciona eixo X
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        //adiciona eixo Y
        svg.append("g")
            .attr("transform", "translate(0, 0)")
            .call(yAxis);

        // center #corpo>svg>g element conditionally to Y axis label number width
        var centerCanvas = function () {
            var svg = d3.selectAll("#corpo>svg>g");
            var g = d3.selectAll("#corpo svg g g:last-child g");
            // max width that can fit in without centring
            var maxNormalWidth = 45;
            var currentMaxWidth = 0;

            g.each(function (d) {
                var that = d3.select(this).select('text').node();
                var labelWidth = that.getBBox().width;

                if (labelWidth > currentMaxWidth)
                    currentMaxWidth = labelWidth;
            });

            if (currentMaxWidth > maxNormalWidth)
                svg.attr("transform", "translate(" + Math.round(margin.left + (currentMaxWidth - maxNormalWidth)) + "," + margin.top + ")");
        }();

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
            d3.selectAll("#corpo>svg>g>*")
                .filter(function (d) {
                    // não aplica display none no título
                    var clss = d3.select(this).attr("class");
                    return !/title/g.test(clss);
                })
                .attr("display", "none");

            d3.select("#corpo>svg")
                .append("g")
                .attr("class", "no-info")
                .append("text")
                .text("Não há dados sobre essa desagregação")
                .attr("x", d3.select("#corpo>svg").attr("width") / 2)
                .attr("y", d3.select("#corpo>svg").attr("height") / 2)
                .attr("text-anchor", "middle");
        }

        destacaBarra(url['ano']);

        var valor = $('svg').find('rect[data-legend="'+url['ano']+'"]').attr("data-value");
        


        if(!(eixo == 1 && vrv == 6 && uos == 1) && !(eixo == 2 && (vrv == 18 || vrv == 19) && uos == 1))
            configInfoDataBoxBarras(eixo, vrv, dados, valor);         

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


}
//BARRA 2
else {

    // import colors.json file
    var colorJSON;
    var textJSON;

    var config = "?var=" + vrv + "&uf=" + uf + "&atc=" + atc + "&cad=" + cad + "&uos=" + uos + "&ano=" + ano + "&prt=" + prt + "&ocp=" + ocp + "&sex=" + sex + "&fax=" + fax + "&esc=" + esc + "&cor=" + cor + "&typ=" + typ + "&prc=" + prc + "&slc=" + slc + "&frm=" + frm + "&prv=" + prv + "&snd=" + snd + "&mec=" + mec + "&mod=" + mod + "&pfj=" + pfj + "&eixo=" + eixo + "&deg=" + deg + "&ano=" + ano;

    d3.json('data/colors.json', function (error, data) {
        if (error) throw error;
        colorJSON = data;

        // import pt-br.json file for get the title
        d3.json('data/pt-br.json', function (error, data) {
            if (error) throw error;

            textJSON = data;
            // $.get("./db/json_barras.php" + config, function(data){
            //       console.log(data)
           // })
            d3.queue()
                .defer(d3.json, "./db/json_barras.php" + config)
                .await(analyze_eixo1);
        });

    });
    // return matching color value
    
    function color_eixo1() {
        if(ocp == 0) {
            if (colorJSON.cadeias[cad]) {
                if(prt != 0) return [colorJSON.cadeias[cad].color, colorJSON.cadeias[cad].gradient["6"], colorJSON.cadeias[cad].gradient["5"], colorJSON.cadeias[cad].gradient["4"]];
                if(fax != 0) return [colorJSON.cadeias[cad].color, colorJSON.cadeias[cad].gradient["6"], colorJSON.cadeias[cad].gradient["5"], colorJSON.cadeias[cad].gradient["4"], colorJSON.cadeias[cad].gradient["3"], colorJSON.cadeias[cad].gradient["2"]];
                if(esc != 0) return [colorJSON.cadeias[cad].color, colorJSON.cadeias[cad].gradient["6"], colorJSON.cadeias[cad].gradient["5"], colorJSON.cadeias[cad].gradient["4"], colorJSON.cadeias[cad].gradient["3"], colorJSON.cadeias[cad].gradient["2"], colorJSON.cadeias[cad].gradient["1"]];
                if(sex != 0) return [colorJSON.cadeias[cad].color, colorJSON.cadeias[cad].gradient["6"]];
            } else {
                return colorJSON.cadeias[0].color;
            }
        }
        else {
            if (colorJSON.ocupacoes[ocp - 1]) {
                if(fax != 0) return [colorJSON.ocupacoes[ocp].color, colorJSON.ocupacoes[ocp].gradient["6"], colorJSON.ocupacoes[ocp].gradient["5"], colorJSON.ocupacoes[ocp].gradient["4"], colorJSON.ocupacoes[ocp].gradient["3"], colorJSON.ocupacoes[ocp].gradient["2"]];
                if(esc != 0) return [colorJSON.ocupacoes[ocp].color, colorJSON.ocupacoes[ocp].gradient["6"], colorJSON.ocupacoes[ocp].gradient["5"], colorJSON.ocupacoes[ocp].gradient["4"], colorJSON.ocupacoes[ocp].gradient["3"], colorJSON.ocupacoes[ocp].gradient["2"], colorJSON.ocupacoes[ocp].gradient["1"]];
                if(frm != 0) return [colorJSON.ocupacoes[ocp].color, colorJSON.ocupacoes[ocp].gradient["6"]];
                if(snd != 0) return [colorJSON.ocupacoes[ocp].color, colorJSON.ocupacoes[ocp].gradient["6"]];
                if(prv != 0) return [colorJSON.ocupacoes[ocp].color, colorJSON.ocupacoes[ocp].gradient["6"]];
                if(cor != 0) return [colorJSON.ocupacoes[ocp].color, colorJSON.ocupacoes[ocp].gradient["6"], colorJSON.ocupacoes[ocp].gradient["5"], colorJSON.ocupacoes[ocp].gradient["4"], colorJSON.ocupacoes[ocp].gradient["3"]];
            } else {
                return colorJSON.ocupacoes[0].color;
            }
        }
    }

    function desagregacao_names() {

        if(prt != 0) {

            var array_names = [];
            textJSON.select.prt.forEach(function(d, i) {
                if(i) {
                    array_names.push(d.name_bar);
                }
            });

        }
        if(esc != 0) {
            var array_names = [];
            textJSON.select.esc.forEach(function(d, i) {
                if(i) {
                    array_names.push(d.name);
                }
            });

        }
        if(fax != 0) {
            var array_names = [];
            textJSON.select.fax.forEach(function(d, i) {
                if(i) {
                    if(!(slc == 1 && d.name == "Não classificado")) array_names.push(d.name);
                }
            });
        }
        if(sex != 0) {
            var array_names = [];
            textJSON.select.sex.forEach(function(d, i) {
                if(i) {
                    array_names.push(d.name);
                }
            });
            // console.log(array_names)

        }
        if(frm != 0) {
            var array_names = [];
            textJSON.select.frm.forEach(function(d, i) {
                if(i) {
                    array_names.push(d.name);
                }
            });
        }
        if(snd != 0) {
            var array_names = [];
            textJSON.select.snd.forEach(function(d, i) {
                if(i) {
                    array_names.push(d.name);
                }
            });
        }
        if(prv != 0) {
            var array_names = [];
            textJSON.select.prv.forEach(function(d, i) {
                if(i) {
                    array_names.push(d.name);
                }
            });
        }
        if(cor != 0) {
            var array_names = [];
            textJSON.select.cor.forEach(function(d, i) {
                if(i) {
                    array_names.push(d.name);
                }
            });
        }
        return array_names;
    }

    function selectDesag(){
        switch(deg){
            case 1: return prt;
            case 2: return sex;
            case 3: return fax;
            case 4: return esc;
            case 5: return cor;
            case 6: return frm;
            case 7: return prv;
            case 8: return snd;
        }
    }

    function analyze_eixo1(error, data) {
        $('#loading').fadeOut('fast');
        if (error) {
            console.log(error);
        }

        desag = selectDesag()
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

        var svg = d3.select("#corpo")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        /* Data in strings like it would be if imported from a csv */

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

        var corInicial;
        var corFinal;

        if(cad == 0){
            corInicial = corEixo[2];
            corFinal = "#f0f0f0";
        }
        else{
            corInicial = colorJSON.cadeias[cad].color;
            corFinal = colorJSON.cadeias[cad].gradient['2'];
        }
        var colors = d3.scale.linear()
                    .domain([0, dados.length])
                    .range([corInicial, corFinal])
                    
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

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis_eixo1);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis_eixo1);



        // Create groups for each series, rects for each segment
        var groups = svg.selectAll("g.cost")
            .data(dataset)
            .enter().append("g")
            .attr("class", "cost")
            .style("fill", function (d, i) {
                console.log(colors(i))
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
                tooltipInstance.showTooltip(d, [
                    ["title", desagregacao_names()[obj]],
                    ["", formatDecimalLimit(d.y, 2)]
                ]);
            })
            .on("mouseout", tooltipInstance.hideTooltip)
            .on("click", function(d, i, obj) {

                if(window.parent.innerWidth <= 800)
                    return;

                if(d.x.getFullYear() != url['ano']) {
                    url['ano'] = d.x.getFullYear();
                    var newMapaSrc = $(window.parent.document).find("#view_box").attr("src").replace(/ano=[0-9]*/, "ano=" + d.x.getFullYear());
                    newMapaSrc = newMapaSrc.replace(/uf=[0-9]*/, "uf=" + url['uf']);

                    var newSCCSrc = $(window.parent.document).find("#view_box_scc").attr("src").replace(/ano=[0-9]*/, "ano=" + d.x.getFullYear());
                    newSCCSrc = newSCCSrc.replace(/cad=[0-9]*/, "cad=" + url['cad']+"&chg=1").replace(/ocp=[0-9]/, "ocp="+ocp);



                    $(window.parent.document).find("#view_box").attr("src", newMapaSrc);
                    $(window.parent.document).find("#view_box_scc").attr("src", newSCCSrc);
                    $(window.parent.document).find("select[data-id='ano']").val(d.x.getFullYear());
                    destacaBarra(d.x, true);
                }
                if (slc == 0) $(window.parent.document).find(".cad-title").first().html(textJSON.select.cad[url['cad']].name + " - " + desagregacao_names()[obj]);
                else $(window.parent.document).find(".cad-title").first().html(textJSON.select.ocp[url['ocp'] - 1].name + " - " + desagregacao_names()[obj]);
                $(window.parent.document).find(".bread-select[data-id=deg]").find("optgroup[value="+deg+"]").find("option[value="+(obj+1)+"]").prop('selected', true)//.val(obj+1)
                configInfoDataBoxBarrasStackedClick(eixo, vrv, d, getSoma(d.x), deg);
            })
            .style("cursor", "pointer");
        if((vrv == 6 || vrv == 4) && eixo == 1)
            desagregacao = 1
        else
            desagregacao = $(window.parent.document).find(".bread-select[data-id=deg]").val();
        dado_anos = dataset[desagregacao-1]
        dado = dado_anos.filter(function(obj){
            return obj.x.getFullYear() == url['ano']
        })[0]
        
        configInfoDataBoxBarrasStacked(eixo, vrv, dado, getSoma(dado.x), deg);
        
        
        $('corpo').find('svg').attr('height',$('.chart').height() + 350);

        // Draw legend
        /*var legend = svg.selectAll(".legend")
            .data(colors)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) {
                if(i%3 == 0) {
                    return "translate("+ (-780+(i%3)*150) +","+ (425+((i/3)*30)) + ")";
                }
                else {
                    return "translate("+ (-780+(i%3)*150) +","+ (425+(Math.floor(i/3))*30) + ")";
                }
            });

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function (d, i) {
                return colors.slice().reverse()[i];
            });

        legend.append("text")
            .attr("x", width + 5)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "start")
            .text(function (d, i) {
                return desagregacao_names()[(desagregacao_names().length-1)-i];
            });*/


        // Prep the tooltip bits, initial display is hidden
        var tooltip = svg.append("g")
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
        if(eixo == 0) setStateTitle(function(){if(data[dados.key[0]].uf == "Todos") return "Brasil"; else return data[dados.key[0]].uf});
        // console.log(eixo)
        // console.log(dados)
        if(eixo == 2 && (vrv == 18 || vrv == 19))
            updateDescription(descricoes, eixo, vrv, mec);
        else if(eixo == 3)
            updateDescription(descricoes, eixo, vrv, mundo);
        else
            updateDescription(descricoes, eixo, vrv, ocp);
        // console.log(dataset)

    }

}
