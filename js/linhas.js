$('#loading').fadeOut('fast');
var chartHeight = $('.chart').height();
var chartWidth = $('.chart').width()+25;

/*==== Linhas JS ====*/
var config = "?var=" + vrv + "&deg=" + deg + "&uf=" + uf + "&atc=" + atc + "&slc=" + slc + "&cad=" + cad + "&uos=" + uos + "&ano=" + ano + "&prt=" + prt + "&ocp=" + ocp + "&sex=" + sex + "&fax=" + fax + "&esc=" + esc + "&cor=" + cor + "&typ=" + typ + "&prc=" + prc + "&frm=" + frm + "&prv=" + prv + "&snd=" + snd + "&mec=" + mec + "&mod=" + mod + "&pfj=" + pfj + "&eixo=" + eixo;

// var info = [];
var dados = {key: [], value: []};

// import colors.json file
var colorJSON;
var textJSON;
var colors = [];
d3.json('data/colors.json', function (error, data) {
    if (error) throw error;
    colorJSON = data;

    // import pt-br.json file for get the title
    d3.json('data/pt-br.json', function (error, data) {
        if (error) throw error;

        textJSON = data;

        var config = "?var=" + vrv + "&deg=" + deg + "&uf=" + uf + "&atc=" + atc + "&slc=" + slc + "&cad=" + cad + "&uos=" + uos + "&ano=" + ano + "&prt=" + prt + "&ocp=" + ocp + "&sex=" + sex + "&fax=" + fax + "&esc=" + esc + "&cor=" + cor + "&typ=" + typ + "&prc=" + prc + "&frm=" + frm + "&prv=" + prv + "&snd=" + snd + "&mec=" + mec + "&mod=" + mod + "&pfj=" + pfj + "&eixo=" + eixo;

        d3.queue()
            .defer(d3.json, "./db/json_linhas.php" + config)
            .await(analyze);
    });

});

$.get("./db/json_linhas.php"+config, function(data) {
     console.log(data);
});

function analyze(error, data) {

    // console.log(data)

    //console.log(colorJSON)

    $('#loading').fadeOut('fast');

    if (error) {
        console.log(error)
    }

    var dados = [];

    Object.keys(data).forEach(function (key) {
        dados.push(data[key]);
    });

    var keys = [];

    Object.keys(dados[0]).forEach(function (key) {
        if(key != "ano"){
            keys.push(key)
        }
    });






    //tamanho do grafico
    // AQUI automatizar map center
    var margin = {top: 20, right: 20, bottom: 40, left: 25},
        width = chartWidth - margin.left - margin.right,
        height = chartHeight - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse("%Y");

// set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var valueline = d3.line()
        .x(function(d) { return x(d.ano); })
        .y(function(d) { return y(d.valor); });



    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#corpo").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


        // Get the data


        // format the data
        dados.forEach(function(d) {

            $.each( d, function( i, deg ) {

                if(i == "ano"){
                    d[i] = parseTime(d[i]);
                }
                else{
                    d[i] = +d[i]
                }

            })

        });


        var data = [];
        var valoresBrutos = [];

        $.each( keys, function( i, deg ) {

            var valores = [];
            var obj = {};

            Object.keys(dados).forEach(function (key) {

                obj['ano'] = dados[key]['ano'];
                obj['deg'] = deg;
                obj['valor'] = dados[key][deg];
                valoresBrutos.push(dados[key][deg]);
                valores.push({'ano': dados[key]['ano'], 'deg': deg, 'valor': dados[key][deg]})
            });


            data.push(valores)

        });



        // Scale the range of the data
        x.domain(d3.extent(dados, function(d) { return d.ano; }));

        var tooltipInstance = tooltip.getInstance();


        var min = d3.min(valoresBrutos, function(d) {
           return Math.min(d); });

        var max = d3.max(valoresBrutos, function(d) {
            return Math.max(d); });

        y.domain([min, max]);


        Object.keys(data).forEach(function (i) {

            scc = data[i][0].deg;

            svg.append("path")
                .data([data[i]])
                .attr("class", "line")
                .attr("scc", scc)
                .style("stroke-width", function(){return 2;})
                .style("stroke", color(scc))
                .attr("d", valueline);

        });


        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

        svg.selectAll("path")
            .on("mouseover", function (dados) {
                mousemove(dados, (this));
                d3.selectAll("path").style("opacity", 0.3)
                d3.select(this).style("opacity", 1)
            })
            .on("mouseout", function () {
                tooltipInstance.hideTooltip();
                d3.selectAll("path").style("opacity", 1)
            })


        function mousemove(d, path) {

            if(!($(path).hasClass("domain")) ){
                var scc = ($(path).attr("scc"));

                tooltipInstance.showTooltip(d, [
                    ["title", scc]
                ])
            }


        }



        ///LEGENDA


        var fontColor = "#000"

        $.each( keys, function( i, deg ) {

            tamanhoVetor = keys.length;

            var height = 10;
            var width = 10;

            var widthTexto = 20;

            var OffsetX = 90;

            var tamanhoX = width + widthTexto;

            var posX = chartWidth - OffsetX - tamanhoX*i;
            var posY =  chartHeight*0.88;

            svg.append("g")
                .append("rect")
                .attr("x", posX)
                .attr("y", posY)
                .attr("height", height)
                .attr("width", width)
                .style("fill", color(deg))
                .style("stroke-width", 1)
                .style("stroke", color(deg))
                .attr("scc", deg);

            svg.selectAll("rect")
                .on("mouseover", function (dados) {
                    tooltipInstance.showTooltip(dados, [
                        ["title", $(this).attr("scc")]
                    ])
                })
                .on("mouseout", function () {
                    tooltipInstance.hideTooltip();
                })


            svg.append("text")
                .attr("x", posX + widthTexto)
                .attr("y", posY + 8)
                .attr("fill", fontColor)
                //.text(deg);

        });



    function color(deg){
        colors = {
            "Setor": "#071342",
            "UF": "rgb(109, 191, 201)",
            "Relacionadas": "#071342",
            "Culturais": "rgb(109, 191, 201)",
            "Despesa Minc / Receita executivo": "#071342",
            "Financiamento Estatal / Receita executivo": "rgb(109, 191, 201)",

            "ValorTransacionado": "#077DDD",
            "Importação": "#8178AF",
            "Exportação": "#EC8A91",
            "SaldoComercial": "#E96B00",

            "1": "#071342",
            "2": "rgb(109, 191, 201)",
            "3": "#071342",
            "4": "rgb(109, 191, 201)",
            "5": "#071342",
            "6": "rgb(109, 191, 201)",
            "7": "#8178AF",
            "8": "#EC8A91",

        }


        Object.keys(colorJSON.cadeias).forEach(function (i, key) {
            colors[colorJSON.cadeias[i].name] = colorJSON.cadeias[i].color;
        });

        return colors[deg];

    }




}



