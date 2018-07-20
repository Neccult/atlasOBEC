<?php 
	if (!empty($_GET["ano"]))
		$ano = $_GET["ano"];
	else
		$ano = "2014";

	if (!empty($_GET["cad"]))
		$cadeia = $_GET["cad"];
	else
		$cadeia = 0;

?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">

		<!-- BOOTSTRAP -->

		<!-- Bootstrap core CSS -->
		<link href="../css/bootstrap.min.css" rel="stylesheet">

		<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
		<link href="../css/ie10-viewport-bug-workaround.css" rel="stylesheet">

		<!-- Custom styles for this template -->
		<link href="../css/navbar.css" rel="stylesheet">

		<!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
		<!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
		<script src="../js/dependencias/ie-emulation-modes-warning.js"></script>

		<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
		  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
		  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->

		<!-- D3 JS -->
		<script src="js/d3/d3.min.js"></script>
		<script src="https://d3js.org/topojson.v2.min.js"></script>
		<script src="https://d3js.org/d3-queue.v3.min.js"></script>
		<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>

		<!-- D3 Legend -->
		<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-legend/2.21.0/d3-legend.min.js"></script>

		<!--===== css ====-->
		<link href="../css/proto.css" rel="stylesheet">

		<style type="text/css">
			.states{
			  fill: gray;
			  stroke: rgb(225, 225, 227);
			  stroke-linejoin: round;
			}
			.legend {
				padding: 24px 0 0 24px;
			}

			.tooltip {
			  position: absolute;         
				text-align: center;         
				width: 120px;                    
				height: 50px;                   
				padding: 2px;               
				font: 12px sans-serif;      
				background: lightsteelblue; 
				border: 0px;        
				border-radius: 8px;         
				pointer-events: none;
				opacity: 1
			}

			.tooltip.hidden {
			  display: none;
			}

			.tooltip p {
			  margin: 0;
			  font-family: sans-serif;
			  font-size: 16px;
			  line-height: 20px;
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
						
						<a class="navbar-brand" href="#"><img src="../images/logo.png" class="logo"></a>
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
				<a href=""><img src="../images/icons/pdf.png" class="icon-download"></a>
				<a href=""><img src="../images/icons/xls.png" class="icon-download"></a>
				<a href=""><img src="../images/icons/csv.png" class="icon-download"></a>
			</div> 

			<!-- tooltip showed when hovering node -->
			<div id="tooltip" class="tooltip hidden">
			  <p><strong class="heading"></strong></p>
			  <p><span class="size"></span></p>
			</div>
		</div><!-- /container -->

		<!-- <script src="js/mapa.js"></script> -->

		

		<script type="text/javascript">
		// cadeia passada por get
		var cadeia = <?php echo $cadeia; ?>;

			// Mapa JS //
			//tamanho do mapa
			  var width = 800,
				  height = 600;

			//cria svg
			  var svg = d3.select("#corpo").append("svg")
				.attr("width", width)
				.attr("height", height);

			//configura projeção
			  var projection = d3.geoMercator()
				.center([-40, -30])             
				.rotate([4.4, 0])               
				.scale(750)                     
				.translate([width / 2, height / 1.2]);  

			  var path = d3.geoPath()
				.projection(projection);

			 // import colors.json file
			var colorJSON;
			d3.json('../data/colors.json', function(error, data) {
			  if (error) throw error;

			  colorJSON = data;
			});

			//pre-load arquivos
			  d3.queue()
				.defer(d3.json, "../data/br-min.json")
				.defer(d3.csv, "../data/total.csv")
				.await(ready);

			//leitura
			  function ready(error, br_states, data) {

				if (error) return console.error(error);

			//carrega estados JSON
				var states = topojson.feature(br_states, br_states.objects.states);

			//carrega dados CSV
				var ano = <?php echo $ano; ?>;
				var total = d3.csvFormat(data, ["ID", "UF", "a"+ano]);

			//parse CSV para array
				var dict = {};

				var info = d3.csvParseRows(total, function(d, i) {
				  return dict[d[0]] = {id:d[0], uf:d[1], valor:+d[2]}
				});

			//exclui linha de cabeçario do OBJ
				info.splice(0,1);
				info.splice(27,28);
				delete dict["ID"];
				delete dict[0];
				// console.log(dict);

			//valores maximos e minimos
				var minValue = d3.min(info, function(d) {return d.valor; });
				var maxValue = d3.max(info, function(d) {return d.valor; });

			//distribuicao de frequencias    
				var quant = 9;
				var range = maxValue - minValue;

				// ERRO MAPA AQUI
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
				while(i < 9){
					if (minValue > 1)
						dom[i] = dom[i] - (dom[i] % 5);
					i++;
				}

			// creates cadeia's color range array from color.json file
			var colorsRange = [];             
			$.each(colorJSON.cadeias[cadeia].gradient, function(i, rgb){
				if (i > 1)
					colorsRange.push(rgb);
			});


			var mouseOn = function(d) {
				var xPosition = d3.event.pageX + 5;
				var yPosition = d3.event.pageY + 5;

				d3.select(".tooltip")
					.style("left", xPosition + "px")
					.style("top", yPosition + "px");

				d3.select(".tooltip .heading")
					.text(d['properties']['name']);

				// ERRO MAPA AQUI
				d3.select(".tooltip .size")
					.text(dict[d.id].valor);

				d3.select(".tooltip").classed("hidden", false);
			};

			var mouseOut = function() {
				d3.select(".tooltip").classed("hidden", true);
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
				  // ERRO MAPA AQUI
				  .style('fill', function(d){return color(dict[d.id].valor);})
				  .attr("d", path)
				  
			//mouseover
				.on("mouseover", mouseOn)
			  	.on("mouseout", mouseOut);

			//legenda
				var legend_svg = d3.select("svg");

				legend_svg.append("g")
				  .attr("class", "legendLinear")
				  .attr("transform", "translate(600,300)");

				var numbersShown = minValue <= 1? ".3f" : ".0f";

				var legendLinear = d3.legendColor()
				  .title("Total de Empresas "+ano)
				  .labelFormat(d3.format(numbersShown))
				  // .labels(legend)
				  .labels( 
				  //substitui legenda em ingles
					function({ i, genLength, generatedLabels }){
					  if (i === 0 ){
						return generatedLabels[i]
						  .replace('NaN to', 'Menor que')
					  } 
					  else if (i === genLength - 1) {
						return "Maior que "+dom[8]
					  } 
					  else  {
						return "Entre "+generatedLabels[i]
						  .replace('to', 'e')
					  }
					  return generatedLabels[i]
					}
					)
				  .shapeWidth(80)
				  .shapePadding(5)
				  .orient('vertical')
				  .scale(color);

				legend_svg.select(".legendLinear")
				  .call(legendLinear);

			  };
		</script>

		<!-- Bootstrap core JavaScript
		================================================== -->
		<!-- Placed at the end of the document so the pages load faster -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="../js/vendor/jquery.min.js"><\/script>')</script>
		<script src="../js/bootstrap.min.js"></script>

	</body>
</html>