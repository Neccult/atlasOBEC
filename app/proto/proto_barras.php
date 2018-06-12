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

		<!-- TopoJSON -->
		<script src="https://d3js.org/topojson.v2.min.js"></script>

		<!-- D3 JS v4 --> 
		<script src="js/d3/d3.min.js"></script>
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
		<link href="../css/proto.css" rel="stylesheet">

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
									<li><a href="#">Quociente de Value Adicionado e Receita por Empresa Cultura</a></li>
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

		<script>
		// Barras JS //

		//variaveis configuracao query
        var vrv = <?php echo $var; ?>;
        var uf = <?php echo $uf; ?>;
        var atc = <?php echo $atc; ?>;
        var cad = <?php echo $cad; ?>;
        var prt = <?php echo $prt; ?>;

        var config = "?var="+vrv+"&uf="+uf+"&atc="+atc+"&cad="+cad+"&prt="+prt+"";

		 // import colors.json file
		var colorJSON;
		d3.json('../data/colors.json', function(error, data) {
		  if (error) throw error;

		  colorJSON = data;
		});

			// return matching color value
		var color = function(colorId){
			if(colorJSON.cadeias[colorId]){
				return colorJSON.cadeias[colorId].color;
			} else {
				console.log("Cor correspondente ao id: \"" + colorId +  "\" não encontrada no arquivo colors.json");
				return colorJSON.cadeias[0].color;
			}
		}

        
        // console.log(config);

        d3.queue()
          .defer(d3.json, "./db/json_barras.php"+config)
          .await(analyze);

        function analyze(error, data) {
          if(error) { console.log(error); }

            var dados = {key: [], value: []};


            dados.key = d3.keys(data);
            dados.value = d3.values(data);

            dados.key = dados.key.map(Number);
            dados.value = dados.value.map(Number);;
				
			//info.push(dict[uf].a2006, dict[uf].a2007, dict[uf].a2008, dict[uf].a2009, dict[uf].a2010, dict[uf].a2011, dict[uf].a2012, dict[uf].a2013, dict[uf].a2014);

			// console.log(dados);

			//tamanho do grafico
				var margin = {top: 20, right: 20, bottom: 30, left: 50},
					width = 1200 - margin.left - margin.right,
					height = 600 - margin.top - margin.bottom;

				var minBarHeight = 5;
				var topLabelHeight = 17;

			// var dataset = {key: [1, 2, 3, 4, 5], value: [10,20,30,40,50]};

			//valores maximos e minimos
				var minValue = d3.min(dados.value);
				var maxValue = d3.max(dados.value);

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
				var i = 0; 
				while(i < 9){
					if (minValue > 1)
						dom[i] = dom[i] - (dom[i] % 5);
					i++;
				}

			// creates cadeia's color range array from color.json file
			var colorsRange = [];             
			$.each(colorJSON.cadeias[cad].gradient, function(i, rgb){
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
					.text(dados.key.uf);

				d3.select(".tooltip .size")
					.text(numberFormat(d));

				d3.select(".tooltip").classed("hidden", false);
			};

			var mouseOut = function() {
				d3.select(".tooltip").classed("hidden", true);
			};

			//cor das barras
				//coloração do mapa
				/*var color = d3.scaleThreshold()
				  .domain(dom)
				  .range(colorsRange);*/

				  
			// configura ranges
				/*var x = d3.scaleBand()
					.domain(d3.range(dados.value.length))
					.range([0, width])
					.padding(0.3);*/


				//var maxy = Math.round(maxValue + (range / 6));
				
				var minDisplayValue = minValue > 0? minValue - (minValue / 10) : 0;
				
				/*var y = d3.scaleLinear()
					.domain([minDisplayValue, maxy])
					.range([height, 0]);*/


			var x = d3.scaleBand()
						.domain(d3.range(dados.value.length))
						.rangeRound([0, width])
						.padding(0.1);
			

				//d3.range(dados.value.length)
			/*var y = d3.scaleLinear()
					.domain(d3.extent(dados.value))
					.range([height, 0]);*/

			var y = d3.scaleLinear()
					.domain(d3.extent(dados.value))
					.rangeRound([height, 0], .002);

			y.domain(d3.extent(dados.value, function(d) {
		        //return d < 1 && d > - 1? d - .02 : d + .02;
		        var isMinValueNegative = y(0) !== false;
		        var isNegativeBarTooHigh = y(d) + 5 >= height;
		        var isPositiveBarTooHigh = y(d) <= minBarHeight;

				if (isMinValueNegative){

					if (isNegativeBarTooHigh)
						return d - 0.05;

					/*if (isPositiveBarTooHigh)
						return d;*/
				}

		        return d;
		    })).nice();


		    var numberFormat = d3.format(".2f");
		    var removeZeroFormat = function(num){
		    	var numSplit = num.split(".");

		    	if (parseInt(numSplit[1]) === 0)
		    		num = Math.round(num);;

		    	return num;
		    };


		    var formatLabel = d3.format(".4s");
				
			//cria SVG
				var svg = d3.select("#corpo").append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
				  .append("g")
					.attr("transform", 
						  "translate(" + margin.left + "," + margin.top + ")");

			//titulo
				/*svg.append("text")
						.attr("x", (width / 2))             
						.attr("y", 5 - (margin.top / 2))
						.attr("text-anchor", "middle")  
						.attr("font-family", "Lato")
						.style("font-size", "16px")
						.text(function(d){
							return dados.key;
						});*/

			//gridlines in y axis function
				function make_y_gridlines() {     
					return d3.axisLeft(y)
						.scale(y)
						.ticks(4)
				}
			
			//add the Y gridlines
				svg.append("g")
					.attr("class", "grid")
					.style("opacity", 0.1)
					.call(make_y_gridlines()
						.tickSize(-width +10)
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
				   		var graphBottom = height;
				   		var barPosition = Math.abs(y(d));
				   		//var barHeight = Math.abs(y(d) - y(0)) < height? Math.abs(y(d) - y(0)) : height - y(d);
				   		var barHeight = height - y(d);
				   		var zeroPosition = d3.min(dados.value) < 0? y(0) : false;
				   		var isMinValueNegative = zeroPosition !== false;
				   		var isValueNegative = d < 0;
				   		var isBarTooSmall = barHeight < minBarHeight;
				   		var zeroPositionExists = zeroPosition < height;
				   		var isValueZero = d === 0;
				   		var isYAxisZero = y(d) <= 5;


				   		// TEM VALOR NEGATIVO
				   		if (isMinValueNegative) {

				   			// NÚMERO NEGATIVO
					   		if(isValueNegative)
					   			return zeroPosition;

					   		// NÚMERO 0
					   		if(isValueZero)
					   			return zeroPosition - 5;
					   		
					   		// BARRA MUITO PEQUENA
					   		/*if (isBarTooSmall)
				   				return barPosition - 5;*/

				   			// SE RESULTADO DE y(d) FOR ZERO (0)
				   			if (isYAxisZero)
					   			return 0;

					   		return zeroPosition - y(d);
					   	}
					   	console.log(d, isBarTooSmall);

					   	// BARRA MUITO PEQUENA
					   	if (isBarTooSmall){
				   			return barPosition;
					   	}

						return barPosition;
				   })
				   .attr("width", x.bandwidth())
				   .attr("height", function(d) {
				   		var minValue = d3.min(dados.value);
				   		var maxValue = d3.max(dados.value);
				   		var zeroPosition = d3.min(dados.value) < 0? y(0) : false;
				   		var minValueIsNegative = minValue < 0;
				   		var isValueSmallerThanMax = d < maxValue + .1;
				   		var isRangeTooHigh = maxValue - minValue > maxValue / 2; 
				   		var isMinValueNegative = zeroPosition !== false;
				   		var isValueNegative = d < 0;
				   		var isValueZero = d === 0;
				   		var isYAxisZero = y(d) <= 5;
				   		var barHeight = height - y(d);
				   		//var barHeight = Math.abs(y(d) - y(0)) < height? Math.abs(y(d) - y(0)) : height - y(d);


				   		// TEM VALOR NEGATIVO
				   		if (isMinValueNegative){

				   			// NÚMERO NEGATIVO
					   		if (isValueNegative){
					   			if (barHeight < minBarHeight || isValueZero)
					   				return minBarHeight;

					   			return Math.abs(y(d)) - zeroPosition; 
					   		}

					   		// NÚMERO POSITIVO
					   		if (barHeight < minBarHeight || isValueZero){
				   				return minBarHeight;
					   		}

					   		if (isYAxisZero)
					   			return Math.abs(y(0));

					   		return Math.abs(height - (height - y(d)));
					   	}

				   		if (barHeight < minBarHeight)
				   			return minBarHeight;

				   		return barHeight;
				   })
				   .attr("fill", function(d) {
					return color(cad);
				   })
				   .on("mouseover", mouseOn)
			  		.on("mouseout", mouseOut);

			//cria labels barras 
				svg.selectAll("text g")
				   .data(dados.value, function(d) { return d; })
				   .enter()
				   .append("text")
				   .attr("class", "barTopValue")    
				   .text(function(d) {
				   		if (d3.min(dados.value) > 1)
							return removeZeroFormat(numberFormat(d));

						return d;
				   })
				   .attr("text-anchor", "middle")
				   .attr("x", function(d, i) {
					return x(i) + x.bandwidth() / 2 ;
				   })
				   .attr("y", function(d) {
				   		var zeroPosition = d3.min(dados.value) < 0? y(0) : false;
				   		var isMinValueNegative = zeroPosition !== false;
				   		var isValueNegative = d < 0;
				   		var isValuePositiveOrZero = d >= 0;
				   		var areValuesHigh = Math.abs(y(d) - y(0)) > height;
				   		var zeroPosition = y(0);
				   		var zeroPositionExists = zeroPosition < height;
				   		var isBarSmallerThanMinimum = Math.abs(zeroPosition - y(d)) <= 5;
				   		var barHeight = height - y(d);
				   		var isValueZero = d === 0;
				   		var isYAxisZero = y(d) <= 5;

				   		// TEM VALOR NEGATIVO
				   		if (isMinValueNegative){

				   			// VALOR NEGATIVO
				   			if (isValueNegative)
				   				return y(d) + topLabelHeight;

				   			// BARRA MUITO PEQUENA
				   			if (barHeight <= minBarHeight || isValueZero){
					   			return y(d) - minBarHeight - 4;
					   		}

					   		console.log(d, y(d));
					   		// SE RESULTADO DE y(d) FOR ZERO (0)
					   		if (isYAxisZero)
					   			return -5;

				   			return zeroPosition - y(d) - 5;
				   		}

				   		// BARRA MUITO PEQUENA
				   		if (barHeight <= minBarHeight/* || isValueZero*/){
				   			return y(d) - minBarHeight - 4;
				   		}

				   		
				   		if(areValuesHigh)
				   			isBarSmallerThanMinimum = minBarHeight - (height - Math.abs(y(d))) >= 0;

						if (isBarSmallerThanMinimum && isValuePositiveOrZero)
							return (areValuesHigh? y(d) : zeroPosition) - minBarHeight - 5;

						return y(d) - 5;		
				   });

			//formata labels eixo X
				var xAxis = d3.axisBottom(x)
					.tickFormat(function(d){ return dados.key[d];})
					.tickSize(5)
					.tickPadding(5);

				var yAxis = d3.axisLeft()
							.scale(y)
							.tickFormat(formatLabel);

			//adiciona eixo X
				svg.append("g")
				   .attr("transform", "translate(0," + height + ")")
				   .call(xAxis);

			//adiciona eixo Y
				svg.append("g")
					.attr("transform", "translate(0, 0)")
				   .call(yAxis);

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