<?php 
    if (!empty($_GET["ano"]))
        $ano = $_GET["ano"];
    else
        $ano = "2014";
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
            }
            rect:hover{
                fill: orange;
            }

            path {
                fill: none;
                stroke: black
            }

            line {
                stroke: black;
            }
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
                            
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Periodicidade <span class="caret"></span></a>

                                <ul class="dropdown-menu">
                                    <li class="dropdown-header">Ano</li>
                                    <li class = "<?php echo ($ano == "2006" ? "active" : "")?>"><a href="index.php?ano=2006">2006</a></li>
                                    <li class = "<?php echo ($ano == "2007" ? "active" : "")?>"><a href="index.php?ano=2007">2007</a></li>
                                    <li class = "<?php echo ($ano == "2008" ? "active" : "")?>"><a href="index.php?ano=2008">2008</a></li>
                                    <li class = "<?php echo ($ano == "2009" ? "active" : "")?>"><a href="index.php?ano=2009">2009</a></li>
                                    <li class = "<?php echo ($ano == "2010" ? "active" : "")?>"><a href="index.php?ano=2010">2010</a></li>
                                    <li class = "<?php echo ($ano == "2011" ? "active" : "")?>"><a href="index.php?ano=2011">2011</a></li>
                                    <li class = "<?php echo ($ano == "2012" ? "active" : "")?>"><a href="index.php?ano=2012">2012</a></li>
                                    <li class = "<?php echo ($ano == "2013" ? "active" : "")?>"><a href="index.php?ano=2013">2013</a></li>
                                    <li class = "<?php echo ($ano == "2014" ? "active" : "")?>"><a href="index.php?ano=2014">2014</a></li>

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

        <script>

        var dict = {};
        var info = [];
        var dados = {key: [], value: []};
        var uf = 0;

        // get the data
            d3.csv("total.csv", function(error, data) {
              if (error) throw error;

              // format the data
              data.forEach(function(d) {
                d.id = +d.ID;
              });
            
                var total = d3.csvFormat(data, ["ID", "UF", "a2006", "a2007", "a2008", "a2009", "a2010", "a2011", "a2012", "a2013", "a2014"]);

                //parse CSV para array
                var parse = d3.csvParseRows(total, function(d, i) {
                  return dict[d[0]] = {id:d[0], uf:d[1], a2006:+d[2], a2007:+d[3], a2008:+d[4], a2009:+d[5], a2010:+d[6], a2011:+d[7], a2012:+d[8], a2013:+d[9], a2014:+d[10]}
                });
            
                info.push(dict[uf].a2006, dict[uf].a2007, dict[uf].a2008, dict[uf].a2009, dict[uf].a2010, dict[uf].a2011, dict[uf].a2012, dict[uf].a2013, dict[uf].a2014);


                dados = {key: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014], value: info};


                console.log(dados);
                console.log(dados.value.length);

                console.log(d3.max(dados.value));

                // console.log(info);

                // set the dimensions and margins of the graph
                var margin = {top: 20, right: 20, bottom: 30, left: 40},
                    width = 1200 - margin.left - margin.right,
                    height = 600 - margin.top - margin.bottom;

                // var dataset = {key: [1, 2, 3, 4, 5], value: [10,20,30,40,50]};

                //valores maximos e minimos
                    var minValue = d3.min(info);
                    var maxValue = d3.max(info);

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

                //ajuste do dominio
                    var i = 0; 
                    while(i<=9){
                        dom[i] = dom[i] - (dom[i] % 5);
                        i++;
                    }

                // set the ranges
                var x = d3.scaleBand()
                    .domain(d3.range(dados.value.length))
                    .range([0, width])
                    .padding(0.2);

                var y = d3.scaleLinear()
                    .domain([0, d3.max(dados.value)])
                    .range([height, 0]);

                
                var color = d3.scaleThreshold()
                    .domain(dom)
                    .range(d3.schemeYlGn[9]);
                
                          
                var svg = d3.select("#corpo").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                    .attr("transform", 
                          "translate(" + margin.left + "," + margin.top + ")");

                //Create bars
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
                    // return "rgb(0, 0, " + (d * 10) + ")";
                    return color(d);
                   })

                   // add the x Axis
                   svg.append("g")
                       .attr("transform", "translate(0," + height + ")")
                       .call(d3.axisBottom(x));

                   // add the y Axis
                   svg.append("g")
                       .call(d3.axisLeft(y));

            });

        

        </script>

        



        <!-- Bootstrap core JavaScript
        ================================================== -->
        <!-- Placed at the end of the document so the pages load faster -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery.min.js"><\/script>')</script>
        <script src="js/bootstrap.min.js"></script>

    </body>
</html>