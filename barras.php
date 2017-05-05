<?php 

    if (!empty($_GET["var"]))
        $var = $_GET["var"];
    else
        $var = 1;

        if (!empty($_GET["uf"]))
            $uf = $_GET["uf"];
        else
            $uf = 0;


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

?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">

        <!-- BOOTSTRAP -->

        <!-- Bootstrap core CSS -->
        <link href="css/bootstrap.min.css" rel="stylesheet">

        <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
        <link href="css/ie10-viewport-bug-workaround.css" rel="stylesheet">

        <!-- Custom styles for this template -->
        <link href="css/navbar.css" rel="stylesheet">

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

        
        <!-- C3 JS -->
<!-- 
        <script src="https://d3js.org/d3.v3.min.js"></script> 
        <script src="js/c3.min.js"></script>
        <link href="css/c3.css" rel="stylesheet" type="text/css">
 -->    

        <!-- D3 QUEUE -->
        <script src="https://d3js.org/d3-queue.v3.min.js"></script>

        <!-- === CSS === -->
        <link href="css/main.css" rel="stylesheet">

        <style type="text/css">
            .axis path,
            .axis line {
                fill: none;
                stroke: black;
                shape-rendering: crispEdges;
            }
            .axis text {
                font-family: sans-serif;
                font-size: 11px;
            }

            rect {
                -moz-transition: all 0.3s;
                -webkit-transition: all 0.3s;
                -o-transition: all 0.3s;
                transition: all 0.3s;
                stroke: #CCC;
            }
            rect:hover{
                fill: yellow;
            }

            path {
                fill: none;
                stroke: black;
            }

            line {
                stroke: black;
            }

            div.tooltip {   
                position: absolute;         
                text-align: center;         
                width: 60px;                    
                height: 28px;                   
                padding: 2px;               
                font: 12px sans-serif;      
                background: lightsteelblue; 
                border: 0px;        
                border-radius: 8px;         
                pointer-events: none;           
            }
            
        </style>

        <title>Atlas Econômico da Cultura Brasileira</title>
    </head>

    <body>

        <div class="container">

            <!-- Static navbar -->
            <nav class="navbar">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        
                        <a class="navbar-brand" href="#"><img src="images/logo.png" class="logo"></a>
                    </div>

                    <div id="navbar" class="navbar-collapse collapse text-center">

                        <ul class="nav navbar-nav">
                  
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Eixo <span class="caret"></span></a>
                                
                                <ul class="dropdown-menu">
                                  
                                    <li class="active"><a href="#">Empreendimentos Culturais</a></li>
                                    <li><a href="#">Mercado de Trabalho</a></li>
                                    <li><a href="#">Investimento Público</a></li>
                                    <li><a href="#">Comércio Internacional</a></li>

                                </ul>
                            </li>
                        </ul>

                        <ul class="nav navbar-nav">
                  
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Variáveis <span class="caret"></span></a>
                                
                                <ul class="dropdown-menu">

                                    <li class="dropdown-header">Descritivo</li>
                                    <li class="active"><a href="#">Total de Empresas</a></li>
                                    <li><a href="#">Participação das Empresas Culturais no Total de Empresas</a></li>     
                                    <li><a href="#">Total de Empregadores</a></li>
                                    <li><a href="#">Taxas de Natalidade de Empresas</a></li>
                                    <li><a href="#">Taxa de Mortalidade das Empresas</a></li>
                                    <li><a href="#">Produtivdade do Trabalho das Empresas Culturais</a></li>

                                    <li role="separator" class="divider"></li>

                                    <li class="dropdown-header">Relacional</li>
                                    <li><a href="#">Receita Total das Empresas Culturais</a></li>
                                    <li><a href="#">Custo Total das Empresas Culturais</a></li>
                                    <li><a href="#">Razão entre Receita Total e Custo Total das Empresas Culturais</a></li>
                                    <li><a href="#">Quociente de Valor Adicionado e Receita por Empresa Cultura</a></li>
                                    <li><a href="#">Razão entre PIB Setorial e Receita Operacional Líquida das Empresas Culturais</a></li>

                                    <li role="separator" class="divider"></li>
                                    <li class="dropdown-header">Índice</li>
                                    <li><a href="#">Concentrações: Locacionais, Despesas, Receitas e Salariais.</a></li>

                                    <li role="separator" class="divider"></li>
                                </ul>
                            </li>
                        </ul>

                        <ul class="nav navbar-nav">
                      
                            <li class="dropdown">
                            
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Desagregação <span class="caret"></span></a>

                                <ul class="dropdown-menu">
                                    <li class="dropdown-header">Estados</li>
                                    <li class = "<?php echo ($uf == 0 ? "active" : "")?>"><a href="barras.php?uf=0">Todos</a></li>

                                    <li class = "<?php echo ($uf == 12 ? "active" : "")?>"><a href="barras.php?uf=12">Acre</a></li>
                                    <li class = "<?php echo ($uf == 27 ? "active" : "")?>"><a href="barras.php?uf=27">Alagoas</a></li>
                                    <li class = "<?php echo ($uf == 16 ? "active" : "")?>"><a href="barras.php?uf=16">Amapá</a></li>
                                    <li class = "<?php echo ($uf == 13 ? "active" : "")?>"><a href="barras.php?uf=13">Amazonas</a></li>
                                    <li class = "<?php echo ($uf == 29 ? "active" : "")?>"><a href="barras.php?uf=29">Bahia</a></li>
                                    <li class = "<?php echo ($uf == 23 ? "active" : "")?>"><a href="barras.php?uf=23">Ceará</a></li>
                                    <li class = "<?php echo ($uf == 53 ? "active" : "")?>"><a href="barras.php?uf=53">Distrito Federal</a></li>
                                    <li class = "<?php echo ($uf == 32 ? "active" : "")?>"><a href="barras.php?uf=32">Espírito Santo</a></li>
                                    <li class = "<?php echo ($uf == 52 ? "active" : "")?>"><a href="barras.php?uf=52">Goías</a></li>

                                    <li class = "<?php echo ($uf == 21 ? "active" : "")?>"><a href="barras.php?uf=21">Maranhão</a></li>
                                    <li class = "<?php echo ($uf == 51 ? "active" : "")?>"><a href="barras.php?uf=51">Mato Grosso</a></li>
                                    <li class = "<?php echo ($uf == 50 ? "active" : "")?>"><a href="barras.php?uf=50">Mato Grosso do Sul</a></li>
                                    <li class = "<?php echo ($uf == 31 ? "active" : "")?>"><a href="barras.php?uf=31">Minas Gerais</a></li>
                                    <li class = "<?php echo ($uf == 15 ? "active" : "")?>"><a href="barras.php?uf=15">Pará</a></li>
                                    <li class = "<?php echo ($uf == 25 ? "active" : "")?>"><a href="barras.php?uf=25">Paraíba</a></li>
                                    <li class = "<?php echo ($uf == 41 ? "active" : "")?>"><a href="barras.php?uf=41">Paraná</a></li>
                                    <li class = "<?php echo ($uf == 26 ? "active" : "")?>"><a href="barras.php?uf=26">Pernambuco</a></li>
                                    <li class = "<?php echo ($uf == 22 ? "active" : "")?>"><a href="barras.php?uf=22">Piauí</a></li>

                                    <li class = "<?php echo ($uf == 33 ? "active" : "")?>"><a href="barras.php?uf=33">Rio de Janeiro</a></li>
                                    <li class = "<?php echo ($uf == 24 ? "active" : "")?>"><a href="barras.php?uf=24">Rio Grande do Norte</a></li>
                                    <li class = "<?php echo ($uf == 43 ? "active" : "")?>"><a href="barras.php?uf=43">Rio Grande do Sul</a></li>
                                    <li class = "<?php echo ($uf == 11 ? "active" : "")?>"><a href="barras.php?uf=11">Rondônia</a></li>
                                    <li class = "<?php echo ($uf == 14 ? "active" : "")?>"><a href="barras.php?uf=14">Roraima</a></li>
                                    <li class = "<?php echo ($uf == 42 ? "active" : "")?>"><a href="barras.php?uf=42">Santa Catarina</a></li>
                                    <li class = "<?php echo ($uf == 35 ? "active" : "")?>"><a href="barras.php?uf=35">São Paulo</a></li>
                                    <li class = "<?php echo ($uf == 28 ? "active" : "")?>"><a href="barras.php?uf=28">Sergipe</a></li>
                                    <li class = "<?php echo ($uf == 17 ? "active" : "")?>"><a href="barras.php?uf=17">Tocantins</a></li>








                                    <li role="separator" class="divider"></li>
                                </ul>
                            </li>
                        </ul>
                    </div><!--/.nav-collapse -->
                </div><!--/.container-fluid -->
            </nav>      

            <!-- Main component for a primary marketing message or call to action -->
            <div class="jumbotron white">
                <div id="corpo" align="center"></div>

                <!-- download -->
                <a href=""><img src="images/icons/pdf.png" class="icon-download"></a>
                <a href=""><img src="images/icons/xls.png" class="icon-download"></a>
                <a href=""><img src="images/icons/csv.png" class="icon-download"></a>
            </div> 
        </div><!-- /container -->

        <!-- Bootstrap core JavaScript
        ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery.min.js"><\/script>')</script>
        <script src="js/bootstrap.min.js"></script>

         <script>
        // Barras JS //

        //variaveis configuracao query
        var vrv = <?php echo $var; ?>;
        var uf = <?php echo $uf; ?>;
        var atc = <?php echo $atc; ?>;
        var cad = <?php echo $cad; ?>;
        var prt = <?php echo $prt; ?>;

        var config = "?var="+vrv+"&uf="+uf+"&atc="+atc+"&cad="+cad+"&prt="+prt+"";
        // console.log(config);

        d3.queue()
          .defer(d3.json, "ajax_barras.php"+config)
          .await(analyze);

        function analyze(error, data) {
          if(error) { console.log(error); }

            var dados = {key: [], value: []};


            dados.key = d3.keys(data);
            dados.value = d3.values(data);

            dados.key = dados.key.map(Number);
            dados.value = dados.value.map(Number);;

            // console.log(dados);


                    //tamanho do grafico
                        var margin = {top: 20, right: 20, bottom: 30, left: 50},
                            width = 1200 - margin.left - margin.right,
                            height = 600 - margin.top - margin.bottom;

                    //valores maximos e minimos
                        var minValue = d3.min(dados.value);
                        var maxValue = d3.max(dados.value);

                        // console.log(minValue);
                        // console.log(maxValue);

                    //distribuicao de frequencias    
                        var quant = 9;
                        var range = maxValue - minValue; 
                        var amp = Math.round(range / quant);

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
                        // console.log(dom);

                    //ajuste do dominio
                        var i = 0; 
                        while(i<=9){
                            dom[i] = dom[i] - (dom[i] % 5);
                            i++;
                        }


                    //cor das barras
                        var color = d3.scaleThreshold()
                            .domain(dom)
                            .range(d3.schemeYlGn[9]);

                    // configura ranges
                        var x = d3.scaleBand()
                            .domain(d3.range(dados.value.length))
                            .range([0, width])
                            .padding(0.3);

                        var maxy = Math.round(maxValue + (range/2));
                        maxy = maxy - (maxy % 5);
                        // console.log(maxy)

                        var y = d3.scaleLinear()
                            .domain([0, maxy])
                            .range([height, 0]);
                        
                    //cria SVG
                        var svg = d3.select("#corpo").append("svg")
                            .attr("width", width + margin.left + margin.right)
                            .attr("height", height + margin.top + margin.bottom)
                          .append("g")
                            .attr("transform", 
                                  "translate(" + margin.left + "," + margin.top + ")");

                    //titulo
                    /*
                        svg.append("text")
                                .attr("x", (width / 2))             
                                .attr("y", 5 - (margin.top / 2))
                                .attr("text-anchor", "middle")  
                                .attr("font-family", "Lato")
                                .style("font-size", "16px")
                                .text(dict[uf].uf);
                    */

                    //gridlines in y axis function
                    
                        function make_y_gridlines() {       
                            return d3.axisLeft(y)
                                .ticks(1);
                        }
                    
                    //add the Y gridlines
                    
                        svg.append("g")    
                            .attr("class", "grid")
                            .style("opacity", 0.1)
                            .call(make_y_gridlines()
                                .tickSize(-width+10)
                                .tickSizeOuter(0)
                                .tickFormat("")
                            )
                    
                    //Cria barras
                        svg.selectAll("rect")
                           .data(dados.value, function(d) { return d; })
                           .enter().append("rect")
                           .attr("class", "bar")
                           .attr("x", function(d, i) {
                            return x(i);
                           })
                           .attr("y", function(d) {
                            return y(d);
                           })
                           .attr("width", x.bandwidth())
                           .attr("height", function(d) {
                            return height - y(d);
                           })
                           .attr("fill", function(d) {
                            return color(d);
                           });

                    //cria labels barras 
                        svg.selectAll("text")
                           .data(dados.value, function(d) { return d; })
                           .enter()
                           .append("text")  
                           .text(function(d) {
                            return d;
                           })
                           .attr("text-anchor", "middle")
                           .attr("x", function(d, i) {
                            return x(i) + x.bandwidth() / 2 ;
                           })
                           .attr("y", function(d) {
                            return  y(d)-5;
                           });

                    //formata labels eixo X
                        var xAxis = d3.axisBottom(x)
                            .tickFormat(function(d){ return dados.key[d];})
                            .tickSize(5)
                            .tickPadding(5); 

                    //adiciona eixo X
                        svg.append("g")
                           .attr("transform", "translate(0," + height + ")")
                           .call(xAxis);

                    //adiciona eixo Y
                        svg.append("g")
                           .call(d3.axisLeft(y));        
        }
        </script>

    </body>
</html>