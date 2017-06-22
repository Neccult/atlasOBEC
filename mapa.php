<?php 
    
    if (!empty($_GET["var"]))
        $var = $_GET["var"];
    else
        $var = 1;

    if (!empty($_GET["atc"]))
        $atc = $_GET["atc"];
    else
        $atc = 0;

    if (!empty($_GET["cad"]))
        $cad = $_GET["cad"];
    else
        $cad = 0;

    if (!empty($_GET["prt"]))
        $prt = $_GET["prt"];
    else
        $prt = 0;

    if (!empty($_GET["ano"]))
        $ano = $_GET["ano"];
    else
        $ano = 2014;
?>

<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<link href="css/ie10-viewport-bug-workaround.css" rel="stylesheet">

<!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
<!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
<script src="js/ie-emulation-modes-warning.js"></script>

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->

<!-- TopoJSON -->
<script src="https://d3js.org/topojson.v2.min.js"></script>

<!-- D3 JS v4 --> 
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-legend/2.21.0/d3-legend.min.js"></script>

<!-- D3 QUEUE -->
<script src="https://d3js.org/d3-queue.v3.min.js"></script>

<!-- Utilidades -->
<script src="js/functions.js"></script>

<!--================== SVG! =================-->
<div id="corpo" class="mapa fadeIn"></div>

<!--================ TOOLTIP! ===============-->
<div id="tooltip" class="tooltip none">
    <p><strong class="heading"></strong></p>
    <p><span class="size"></span></p>
</div>

<script>
                        
    // Mapa JS //
    /*=== tamanho do mapa ===*/
    var windowWidth = $(window).width(),
        width = $('.chart').width();
        height = width/1.4;

    var shapeWidth = 30;

     /**** desktop! ****/
    if(windowWidth>=1200){
      
        /* cria svg */
        var svg = d3.select("#corpo").append("svg")
            .attr("width", width)
            .attr("height", height);
       
        /* configura projeção */
        var projection = d3.geoMercator()
            .center([-40, -30])             
            .rotate([4.4, 0])               
            .scale(550)                     
            .translate([width/2, height/1.2]);  

        var legendTransform = "translate(400,220)";
        var shapeWidth = 80;
    }
    /**** tablet landscape! ****/
    else if(windowWidth>=992){  

        //cria svg
        var svg = d3.select("#corpo").append("svg")
            .attr("width", width)
            .attr("height", height);
       
        //configura projeção
        var projection = d3.geoMercator()
            .center([-40, -30])             
            .rotate([4.4, 0])               
            .scale(400)                     
            .translate([width / 2, height / 1.2]);

        var translateX = width-150;
        var legendTransform = "translate("+translateX+",110)";
    }
    /**** tablet portrait! ****/
    else if(windowWidth>=768){  

        var height = width/2;

        //cria svg
        var svg = d3.select("#corpo").append("svg")
            .attr("width", width)
            .attr("height", height);
       
        //configura projeção
        var projection = d3.geoMercator()
            .center([-40, -30])             
            .rotate([4.4, 0])               
            .scale(400)                     
            .translate([width / 2, height / 1.2]);

        var legendTransform = "translate(500,110)";
    }
    /**** mobile! ****/
    else{  

        var height = 200;
        var shapeWidth = 20;

        //cria svg
        var svg = d3.select("#corpo").append("svg")
            .attr("width", width)
            .attr("height", height);
       
        //configura projeção
        var projection = d3.geoMercator()
            .center([-50, -28])             
            .rotate([4.4, 0])               
            .scale(250)                     
            .translate([width / 1.5, height / 1.2]);

        var legendTransform = "translate(0,10)";
    }

    var path = d3.geoPath()
        .projection(projection);
    
    // import colors.json file
    var colorJSON;
    d3.json('colors.json', function(error, data) {
      if(error) throw error;

      colorJSON = data;
    });

    //variaveis configuracao query
    var vrv = <?php echo $var; ?>;
    var atc = <?php echo $atc; ?>;
    var cad = <?php echo $cad; ?>;
    var prt = <?php echo $prt; ?>;
    var ano = <?php echo $ano; ?>;

    var config = "?var="+vrv+"&atc="+atc+"&cad="+cad+"&prt="+prt+"&ano="+ano+"";
    // console.log(config);

    //pre-load arquivos
    d3.queue()
        .defer(d3.json, "br-min.json")
        .defer(d3.json, "ajax_mapa.php"+config)
        .await(ready);

    //leitura
    function ready(error, br_states, mapa){

        if (error) return console.error(error);

        //variaveis informacao
        var dict = {};
        var info = [];

        Object.keys(mapa).forEach(function(key) {

            // console.log(key, mapa[key]);
            info.push(mapa[key]);
            return dict[mapa[key].id] = {id:mapa[key].id, uf:mapa[key].uf, valor:mapa[key].valor};

        });

        //carrega estados JSON
        var states = topojson.feature(br_states, br_states.objects.states);


        //exclui linha de cabeçario do OBJ
        info.splice(0,1);
        info.splice(27,28);
        delete dict[0];
        // console.log(dict);
        // console.log(info);

        //valores maximos e minimos
        var minValue = d3.min(info, function(d) {return d.valor; });
        var maxValue = d3.max(info, function(d) {return d.valor; });

        //distribuicao de frequencias    
        var quant = 9;
        var range = maxValue - minValue; 
        var amp = minValue <= 1 ? range / quant : Math.round(range / quant);


        //domino de valores para as cores do mapa
        var dom = [
                    (minValue+(amp/4)), 
                    (minValue+amp), 
                    (minValue+(2*amp)), 
                    (minValue+(3*amp)), 
                    (minValue+(4*amp)), 
                    (minValue+(5*amp)), 
                    (minValue+(6*amp)), 
                    (minValue+(7*amp)), 
                    (minValue+(8*amp))
                  ];

        //ajuste do dominio
        var i = 0; 
        while(i<=9){
            dom[i] = dom[i] - (dom[i] % 5);
            i++;
        }
                
        // creates cadeia's color range array from color.json file
        var colorsRange = [];             
        $.each(colorJSON.cadeias[cad].gradient, function(i, rgb){
            if(i > 1)
                colorsRange.push(rgb);
        });

        var mouseOn = function(d) {

            /* atualiza nome tooltip */
            d3.select(".tooltip .heading")
                .text(d['properties']['name']);

            d3.select(".tooltip .size")
                .text(formatNumber(dict[d.id].valor));

            /*== posição do gráfico na tela ==*/
            var chartOffset = $('.chart').offset(), 
                leftOffset = chartOffset.left,
                leftOffsetEnd = leftOffset+$('.chart').width(),
                topOffset = chartOffset.top;

            /* tamanho do tooltip */
            var tooltipWidth = $('.tooltip').width();

            /*== posição do tooltip ==*/
            var xPosition = d3.event.pageX-leftOffset+30;
            var xPositionEnd = xPosition+tooltipWidth;
            var yPosition = d3.event.pageY -topOffset+5;

           
            /* se a posição final do tooltip for além do final da tela */
            if(xPositionEnd>leftOffsetEnd){
                xPosition = xPosition - tooltipWidth - 30; /* altera a posição */
            }

            d3.select(".tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px");

            d3.select(".tooltip").classed("none", false);

        };

        var mouseOut = function() {
            d3.select(".tooltip").classed("none", true);
        };

        //coloração do mapa
        var color = d3.scaleThreshold()
            .domain(dom)
            .range(colorsRange);

        //concatena propriedades
        svg.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(states.features)
            .enter()
            .append("path")
            // .style('fill', function(d){return color(d.properties.name.replace(/\s+/g, '').length);})
            .style('fill', function(d){return color(dict[d.id].valor);})
            .attr("d", path)
                  
            //mouseover
            .on("mouseover", mouseOn)
            .on("mouseout", mouseOut);

        //legenda
        var legend_svg = d3.select("#corpo svg");

        legend_svg.append("g")
            .attr("class", "legendLinear")
            .attr("transform", legendTransform);

        var legendLinear = d3.legendColor()
            .title("Total de Empresas "+ano)
            .labelFormat(d3.format(".0f"))
            .shapeWidth(shapeWidth)
            .shapePadding(5)
            .orient('vertical')
            .scale(color);

            console.log(color);

        legend_svg.select(".legendLinear").call(legendLinear);

        var legendLabels = $('.legendCells').find('.cell').children('.label');

        $(legendLabels).each(function(i){

            if (i === 0 ){
                var newText = $(this).text().replace('NaN to', 'Menor que');
                $(this).text(newText);
            } 
            else if (i === legendLabels.length - 1) {
                $(this).text("Maior que "+dom[7]);
            } 
            else{
                var newText = "Entre "+ $(this).text().replace('to', 'e');
                $(this).text(newText);
            }
        });
    };
</script>