/* tamanho container */
var chartWidth = $('.chart').width()+25;


//console.log($(document))

if((eixo == 0 && vrv != 3) || (eixo == 1 && vrv > 11)){
    //$('.chart').css("padding-top","10%");
    var chartHeight = $('.chart').height();
}else{
    var chartHeight = 254;
}
//console.log($(window.parent.document).find('#view_box_scc'))




/*==== Barras JS ====*/
var config = "?var=" + vrv + "&uf=" + uf + "&atc=" + atc + "&slc=" + slc + "&cad=" + cad + "&uos=" + uos + "&ano=" + ano + "&prt=" + prt + "&ocp=" + ocp + "&sex=" + sex + "&fax=" + fax + "&esc=" + esc + "&cor=" + cor + "&typ=" + typ + "&prc=" + prc + "&frm=" + frm + "&prv=" + prv + "&snd=" + snd + "&mec=" + mec + "&mod=" + mod + "&pfj=" + pfj + "&eixo=" + eixo;
            jQuery.get("./db/json_lines.php"+config, function(data) {
               // console.log(data);
            });
    // var info = [];
    var dados = {key: [], value: []};

    // import colors.json file
    var colorJSON;
    var textJSON;
    d3.json('data/colors.json', function (error, data) {
        if (error) throw error;
        colorJSON = data;


        // import pt-br.json file for get the title
        d3.json('data/pt-br.json', function (error, data) {
            if (error) throw error;

            textJSON = data;

            var config = "?var=" + vrv + "&uf=" + uf + "&atc=" + atc + "&slc=" + slc + "&cad=" + cad + "&uos=" + uos + "&ano=" + ano + "&prt=" + prt + "&ocp=" + ocp + "&sex=" + sex + "&fax=" + fax + "&esc=" + esc + "&cor=" + cor + "&typ=" + typ + "&prc=" + prc + "&frm=" + frm + "&prv=" + prv + "&snd=" + snd + "&mec=" + mec + "&mod=" + mod + "&pfj=" + pfj + "&eixo=" + eixo;

            d3.queue()
                .defer(d3.json, "./db/json_lines.php" + config)
                .await(analyze);
        });

    });


    function analyze(error, data) {
        $('#loading').fadeOut('fast');
        if (error) {
            console.log(error);
        }

        var dados = [];

        Object.keys(data).forEach(function (key) {
            dados.push(data[key]);
        });

        //tamanho do grafico
        // AQUI automatizar map center
        var margin = {top: 20, right: 20, bottom: 30, left: 25},
            width = chartWidth - margin.left - margin.right,
            height = chartHeight - margin.top - margin.bottom;


        /*==================*/
        /* *** gráfico! *** */
        /*==================*/


        if (eixo == 0 || eixo == 1) {


            //var x = d3.time.scale()
                //.range([0, width]);

            var formatAno = function (x) {
                return x*1;
            }

            var formatY = function (x) {
                return x;
            }

            var x = d3.scaleTime()
                .range([0, width]);

            var y = d3.scaleLinear()
                .range([height, 0]);

            var color = function (colorId) {
                //console.log(colorId)
                var colorReturn = "#000000";
                if(eixo == 0) {
                    if(url['var'] == 3){
                        Object.values(colorJSON.cadeias).forEach(function(cor){
                            if(cor.name == colorId){
                                colorReturn = cor.color;
                            }
                        })
                    } else if(url['var'] > 9){
                        if(colorId == "UF"){
                            colorReturn = "#071342";
                        } else if(colorId == "Setor"){
                            colorReturn = "rgb(109, 191, 201)";
                        }
                    }
                }
                else if(eixo == 1){
                    if(url['var'] > 11){
                        if(colorId == "UF"){
                            colorReturn = "#071342";
                        } else if(colorId == "Setor"){
                            colorReturn = "rgb(109, 191, 201)";
                        }
                    }
                    else{
                        Object.values(colorJSON.cadeias).forEach(function(cor){
                            if(cor.name == colorId){
                                colorReturn = cor.color;
                            }
                        })
                    }

                }
                return colorReturn;
            }


            var xAxis = d3.axisBottom()
                .tickFormat(formatAno)
                .scale(x);

            var yAxis = d3.axisLeft()
                .tickFormat(formatY)
                .scale(y);

            var coordenadas = []

            var maxContadorAno = dados.length-1;
            var contadorAno = 0;
            var indiceSCC = 0;

            var chaves = []

            Object.keys(dados[0]).forEach(function (key) {
                if(key != "ano"){
                   chaves.push(key)
                }
            })


            var area = d3.area()
                .x(function(d) {
                    var dict = {ano: d.data.ano, y0: y(d[1]), y1: y(d[0]), scc: chaves[indiceSCC]}
                    if(contadorAno < maxContadorAno){
                        contadorAno++
                    } else{
                        indiceSCC++
                        contadorAno = 0
                    }
                    coordenadas.push(dict);
                    return  x(d.data.ano); })
                .y0(function(d) {   //console.log(d.data.ano+" (): "+ y(d[0])+" - "+y(d[1])) ;
                    return y(d[0]); })
                .y1(function(d) {
                    return y(d[1]); });




            var stack = d3.stack()

            // cria SVG

            var svg = d3.select("#corpo").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .attr("id", "group");

            var maxDateVal = d3.max(dados, function(d){
                var vals = d3.keys(d).map(function(key){   return key != "ano" ? d[key] : 0 });
                return d3.sum(vals);
            });


            x.domain(d3.extent(dados, function(d) { return d.ano; }));
            y.domain([0  , maxDateVal]);


            var colums = [];
            Object.keys(data[Object.keys(data)[0]]).forEach(function (key) {
                return colums.push(key);
            });


            var keys = colums;
            keys.shift();

            stack.keys(keys);
            stack.order(d3.stackOrderNone);
            stack.offset(d3.stackOffsetNone);

            var browser = svg.selectAll(".browser")
                .data(stack(dados))
                .enter().append("g")
                .attr("class", "browser")
                .attr('fill-opacity', 0.5);

            var sccAtual = "";


            browser.append("path")
                .attr("class", "area")
                .attr('scc', function(d) {  return sccAtual = (d.key);  })
                .attr('d', area)
                .style("fill", function(d) { return color(d.key); })
                .style("stroke", "none");

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);

            var tooltipInstance = tooltip.getInstance();

            svg.selectAll(".area")
                .on("mousemove", function(dados){
                    if(eixo == 0 || eixo == 1) {
                        mousemove(dados, (this));
                    }
                })
                .on("mouseout", function(){
                    tooltipInstance.hideTooltip();
                    d3.selectAll(".indicador").remove();
                })

            var arrayX = [];
            var arrayY = [];

            var y0 = 0;

            d3.selectAll('.x g').each(function(){
                transform = d3.select(this).attr('transform')
                transform = transform.replace('translate(', '');
                x = transform.split(',')[0];
                y = transform.split(',')[1].replace(')', '');
                arrayX.push(x);
                arrayY.push(y);
            })



            d3.selectAll('g .x').each(function(){
                transform = d3.select(this).attr('transform')
                transform = transform.replace('translate(', '');
                y = transform.split(',')[1].replace(')', '');
                y0 = parseInt(y)
            })

            function mouseover(d, patch){
                return
            }

            function mouseout(){
                d3.selectAll(".indicador").remove()
                return;
            }

            function mousemove(d, path) {

                var scc = ($(path).attr("scc"));

                if(eixo == 1 && (vrv == 10)){

                    ///ESSE IF É PARA QUANDO O GRAFICO DE AREA FICA ESTRANHO POR TER AREAS NEGATIVAS!!!

                    tooltipInstance.showTooltip(d, [
                        ["title", scc]
                        ])
                }
                else{

                    ///ESSE IF É PARA QUANDO O GRAFICO DE AREA FICA CONFORME ESPERADO!!!

                    position = 0;
                    var ano = 2007;
                    var variacao = 0;

                    var xAno = 0;
                    var y1Ano = 0;
                    var y2Ano = 0;

                    for(var i = 1; i < arrayX.length; i++){

                        calc1 = (Number(arrayX[i-1]) +  Number(arrayX[i]))/2
                        calc2 = (Number(arrayX[i]) +  Number(arrayX[i+1]))/2

                        if(d3.mouse(d3.event.currentTarget)[0] >= calc1 && d3.mouse(d3.event.currentTarget)[0] <= calc2 || d3.mouse(d3.event.currentTarget)[0] == Number(arrayX[i-1])){
                            ano = (position = i) + 2007;
                            xAno  = (Number(arrayX[i]))
                            break;

                        } else if(d3.mouse(d3.event.currentTarget)[0] >= (Number(arrayX[arrayX.length-1]) +  Number(arrayX[arrayX.length-2]))/2){
                            ano = (position = arrayX.length-1) + 2007;
                            xAno  = (Number(arrayX[arrayX.length-1]))
                            break;
                        }

                    }

                    Object.keys(dados).forEach(function (index) {
                        if(dados[index].ano == ano){
                            variacao = formatTextVrv(dados[index][scc], eixo, vrv);
                        }
                    })

                    coordenadas.forEach(function (valor) {
                        if(valor.ano == ano && valor.scc == scc.toString()){
                            y1Ano = valor.y0;
                            y2Ano = valor.y1;
                        }
                    })

                    d3.selectAll(".indicador").remove()

                    var line = svg.append("line")
                        .attr("class", "indicador")
                        .attr("x1", xAno)
                        .attr("y1", y1Ano)
                        .attr("x2", xAno)
                        .attr("y2", y2Ano)
                        .attr("stroke-width", 1)
                        .style("fill", "#ffe41e");

                    var triangle1 = svg.append("polygon")
                        .attr("class", "indicador")
                        .attr("points", (xAno-5)+","+y1Ano+" "+(xAno)+","+(y1Ano+5)+" "+(xAno+5)+","+(y1Ano))
                        .style("fill", "#000000");

                    var triangle2 = svg.append("polygon")
                        .attr("class", "indicador")
                        .attr("points", (xAno-5)+","+y2Ano+" "+(xAno)+","+(y2Ano-5)+" "+(xAno+5)+","+(y2Ano))
                        .style("fill", "#000000");

                    tooltipInstance.showTooltipLines(d, [
                        ["title", scc],
                        ["", variacao],
                        ["", ano.toString()],
                    ], xAno, y1Ano, y2Ano)
                }

            }
        }

    }
