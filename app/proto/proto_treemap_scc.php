<?php 
	if (!empty($_GET["uf"]))
		$uf = $_GET["uf"];
	else
		$uf = 0;
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

			/*div.tooltip {   
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
			}*/

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
				<div id="corpo" align="center">
					<svg width="1000" height="600"></svg>
					<!-- <form>
					  <label><input type="radio" name="mode" value="sumBySize" checked> Size</label>
					  <label><input type="radio" name="mode" value="sumByCount"> Count</label>
					</form> -->
				</div>

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

			</body>
		</div><!-- /container -->

		<script>
		var textLeftPadding = 10; // initial padding top for text
		var textTopPadding = 15; // initial padding top for text
		var letterTopPadding = 20; // initial padding top for vertical letters
		var textTopSubPadding = 13; // padding top for subsequent word lines (line height)
		var textVerticalTopSubPadding = 12; // padding top for subsequent letters on vertical position words
		var textVerticalLeftSubPadding = 11; // padding left for subsequent letters on vertical position words

		// return node box width
		function nodeWidth(d){ return d.x1 - d.x0; }
		// return node box height
		function nodeHeight(d){ return d.y1 - d.y0; }

		// appends multiline text
		// REVISAR TEXT TO => THAT
		function genMultiLineText(that){
			var words = that.text().split(' ');
			var thisCell = that.append('g');

			that.select('text').remove();

			for (var i = 0; i < words.length; i++){
				if (i == 0) {
					thisCell.append('text')
					.attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
					.text(function(d) {
						//.split(/(?=[A-Z][^A-Z])/g)[0]
						return d.data.name.split(' ')[i];
					})
					.attr("y", textTopPadding + 5)
					.attr('x', function(d){
						return textLeftPadding;
					});
				} else {
					thisCell.append('text')
					.attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
					.text(function(d) { 
						return d.data.name.split(' ')[i]; 
					})
					.attr('x', textLeftPadding)
					.attr('y', function(d){
						return (textTopPadding + 5 + (i * textTopSubPadding) );
					});
				} 
			}
		}

		// appends svg element to body for testing width/height purposes then removes itself
		function appendTest(text){
			var placeholder = d3.select("body")
								.append("div")
								.attr("id", "testDiv")
								.append("svg")
								.append("g");

			for (var i = 0; i < text.length; i++){

				placeholder.append('text')
				.text(function(d) {
					return text[i]; 
				})
				.attr('x', function(d){
					return textLeftPadding;
				})
				.attr('y', function(d){
					return (textTopSubPadding + (i * textVerticalTopSubPadding) );
				});
			}

			var pNode = placeholder.node().parentNode;
			var bbox = placeholder.node().getBBox();

			d3.select(pNode.parentNode).remove();

		    return bbox;
		}

		// import colors.json file
		var colorJSON;
		d3.json('../data/colors.json', function(error, data) {
		  if (error) throw error;

		  colorJSON = data;
		})

		var svg = d3.select("svg"),
			width = +svg.attr("width"),
			height = +svg.attr("height");

		var fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); },
			format = d3.format(",d");

		// return matching color value
		var color = function(colorId){
			if(colorJSON.cadeias[colorId]){
				return colorJSON.cadeias[colorId].color;
			} else {
				console.log("Cor correspondente ao id: \"" + colorId +  "\" não encontrada no arquivo colors.json");
				return colorJSON.cadeias[0].color;
			}
		}

		var treemap = d3.treemap()
			.tile(d3.treemapResquarify)
			.size([width, height])
			.round(true)
			.paddingInner(1);

		var mouseOn = function(d) {
			var xPosition = d3.event.pageX + 5;
			var yPosition = d3.event.pageY + 5;

			d3.select(".tooltip")
				.style("left", xPosition + "px")
				.style("top", yPosition + "px");

			d3.select(".tooltip .heading")
				.text(d['data']['name']);

			d3.select(".tooltip .size")
				.text(d['data']['size']);

			d3.select(".tooltip").classed("hidden", false);
		};

		var mouseOut = function() {
			d3.select(".tooltip").classed("hidden", true);
		};

		d3.json("../data/scc.json", function(error, data) {
		  if (error) throw error;

		  var attachColor = function(d){ return (d.depth == 3)? d.data.colorId = d.parent.parent.data.colorId : ''; };

		  var root = d3.hierarchy(data)
			  .eachBefore(function(d) {
				attachColor(d);
				d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
			  })
			  .sum(sumBySize)
			  .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

		  treemap(root);

		  var cell = svg.selectAll("g")
			.data(root.leaves())
			.enter().append("g")
			  .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
			  .on("mousemove", mouseOn)
			  .on("mouseout", mouseOut);

		  cell.append("rect")
			  .attr("id", function(d) { return d.data.id; })
			  .attr("width", function(d) { return nodeWidth(d); })
			  .attr("height", function(d) { return d.y1 - d.y0; })
			  .attr("fill", function(d) { return color(d.data.colorId); });

		  cell.append("clipPath")
			  .attr("id", function(d) { return "clip-" + d.data.id; })
			.append("use")
			  .attr("xlink:href", function(d) { return "#" + d.data.id; });


		  cell.append("text")
				.attr("x", function(d) { return textLeftPadding; })
				.attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
				.attr("y", function(d, i) { return textTopPadding; })
				.attr("dy", ".35em")
				.attr("text-anchor", "start")
				//.style("opacity", 1)
				.text(function(d) {return d.data.name; });

			var g = d3.selectAll("svg g");

			g.each(function(d){
				var that = d3.select(this);
				var words = that.text().split(' ');
				var boxWidth = nodeWidth(d) - textLeftPadding;
				var boxHeight = nodeHeight(d) - textTopPadding;
				var name = d.data.name;
				var nodeText = d3.select(this).select('text').node();
				var thisCell;
				d.w = nodeText.getComputedTextLength();
				// if tests
				var nameLongerThanOneWord = words.length > 1;
				var wordWiderThanContainer = d.w > boxWidth;
				var oneWordName = words.length === 1;	

				// if name has more than one word calls genMultiLineText function
				if (nameLongerThanOneWord)
					return genMultiLineText(that);	

				if (oneWordName){

					// if horizontal word is bigger than the container box width
					if (wordWiderThanContainer){
						var testElement = appendTest(name);
						var verticalWordSmallerThanContainer = testElement.height < boxHeight;

						// if vertical word is smaller than container box height
						if (verticalWordSmallerThanContainer){
							thisCell = that.append('g')
										.attr("text-anchor", "start");

							// remove horizontal text from g element
							that.select('text').remove();

							// append letters on vertical position
							for (var i = 0; i < name.length; i++){
								thisCell.append('text')
								.attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
								.attr("text-anchor", "start")
								.text(function(d) {
									return name[i]; 
								})
								.attr('x', function(d){
									return i === 0? textLeftPadding : textVerticalLeftSubPadding;
								})
								.attr('y', function(d){
									return (letterTopPadding + (i * textVerticalTopSubPadding) );
								});
							}
						} else {
							// sets 0 opacity to text that doesnt fit neither horizontal or vertical
							that.select("text")
							.style("opacity", 0);
						}

					}

				}
			});

			   /*cell.append("text")
			  .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
			.selectAll("tspan")
			  .data(function(d) { console.log(d.x1); return d.data.name.split(/(?=[A-Z][^A-Z])/g); })
			.enter().append("tspan")
			  .attr("x", 4)
			  .attr("y", function(d, i) { return 13 + i * 10; })
			  .text(function(d) { return d; });
*/

		  /*cell.append("title")
			  .text(function(d) { return d.data.id + "\n" + format(d.value); });*/

/*
		  d3.selectAll("input")
			  .data([sumBySize, sumByCount], function(d) { return d ? d.name : this.value; })
			  .on("change", changed);

		  var timeout = d3.timeout(function() {
			d3.select("input[value=\"sumByCount\"]")
				.property("checked", true)
				.dispatch("change");
		  }, 2000);
		  function changed(sum) {
			timeout.stop();

			treemap(root.sum(sum));

			cell.transition()
				.duration(750)
				.attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
			  .select("rect")
				.attr("width", function(d) { return nodeWidth(d); })
				.attr("height", function(d) { return d.y1 - d.y0; });
		  }
*/
		});

		function sumByCount(d) {
		  return d.children ? 0 : 1;
		}

		function sumBySize(d) {
		  return d.size;
		}

		</script>

		



		<!-- Bootstrap core JavaScript
		================================================== -->
		<!-- Placed at the end of the document so the pages load faster -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="../js/vendor/jquery.min.js"><\/script>')</script>
		<script src="../js/bootstrap.min.js"></script>

	</body>
</html>