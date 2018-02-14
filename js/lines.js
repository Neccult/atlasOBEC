/* tamanho container */
var chartWidth = $('.chart').width()+25;
var chartHeight = 254;
var minBarHeight = 5;
var withLabels = false;


var fonteTransform = "translate(" + (chartWidth - 120) + "," + (chartHeight - 10) + ")";
var valoresTransform = "translate(10," + (chartHeight - 10) + ")";


var tooltipInstance = tooltip.getInstance();
if(eixo != 1 || deg == 0) {    /*==== Barras JS ====*/

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
        //  console.log(data);

        Object.keys(data).forEach(function (key) {
            dados.push(data[key]);
        });


        //console.log(dados);

        //tamanho do grafico
        // AQUI automatizar map center
        var margin = {top: 20, right: 20, bottom: 30, left: 25},
            width = chartWidth - margin.left - margin.right,
            height = chartHeight - margin.top - margin.bottom;


        //distribuicao de frequencias

        //domino de valores para as cores do mapa

        // creates cadeia's color range array from color.json file
       /* var colorsRange = [];
        $.each(colorJSON.cadeias[cad].gradient, function (i, rgb) {
            if (i > 1)
                colorsRange.push(rgb);
        });*/


        /*==================*/
        /* *** gráfico! *** */
        /*==================*/



        if (eixo == 0) {

            //var x = d3.time.scale()
                //.range([0, width]);

            var formatAno = function (x) {
                return x*1;
            }

            var formatY = function (x) {
                return x*10+"%";
            }

            var x = d3.scaleTime()
                .range([0, width]);

            var y = d3.scaleLinear()
                .range([height, 0]);

            //  var color = d3.scaleOrdinal(d3.schemeCategory20);
            var color = function (colorId) {
                //console.log(colorId)
                var colorReturn = "#000000";
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
                return colorReturn;
            }


            var xAxis = d3.axisBottom()
                .tickFormat(formatAno)
                .scale(x);

            var yAxis = d3.axisLeft()
                .tickFormat(formatY)
                .scale(y);

            var area = d3.area()
                .x(function(d) {
                    return  x(d.data.ano); })
                .y0(function(d) { return y(d[0]); })
                .y1(function(d) {return y(d[1]); });



            var stack = d3.stack()

            // cria SVG

            var svg = d3.select("#corpo").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var maxDateVal = d3.max(dados, function(d){
                var vals = d3.keys(d).map(function(key){   return key != "ano" ? d[key] : 0 });
                return d3.sum(vals);
            });


            x.domain(d3.extent(dados, function(d) { return d.ano; }));
            y.domain([0  , maxDateVal]);
            //y.domain(d3.extent(maxDateV))


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



            browser.append("path")
                .attr("class", "area")
                .attr('d', area)
                .attr('scc', function(d) { return (d.key); })
                .style("fill", function(d) { return color(d.key); })
                .style("stroke", "none");

            /*browser.append('text')
                .datum(function(d) { return d; })
                .attr('transform', function(d) {  return 'translate(' + x(d[9].data.ano) + ',' + y(d[9][1]) + ')'; })
                .attr('x', -6)
                .attr('dy', '.35em')
                .style("text-anchor", "start")
                .text(function(d) { return d.key; })
                .attr('fill-opacity', 1);
*/


            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis);

            var tooltipInstance = tooltip.getInstance();

            svg.selectAll("path ")
                .data(dados)
                .on("mouseover", function(d){
                    if(eixo == 0) {
                        var scc = ($(this).attr("scc"));
                        tooltipInstance.showTooltip(d, [
                            ["title", scc]
                        ]);

                        }
                })
                .on("mouseout", tooltipInstance.hideTooltip)

        }
    }
}
