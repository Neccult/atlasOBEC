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
<div id="corpo" class="fadeIn"><svg></svg></div>

<!--================ TOOLTIP! ===============-->
<div id="tooltip" class="tooltip none">
	<p><strong class="heading"></strong></p>
	<p><span class="size"></span></p>
</div>

<script>

	var windowWidth = $(window).width(); /* dimensão da tela */

	/*=== dimensões do gráfico ===*/        
	if(windowWidth>350){
		$('#corpo').find('svg').attr('width',$('.chart').width());
		$('#corpo').find('svg').attr('height',$('.chart').width()/2);
	}
	else{
		$('#corpo').find('svg').attr('width',$('.chart').width()-50);
		$('#corpo').find('svg').attr('height',$('.chart').width());
	}

	var svg = d3.select("svg"),
		width = +svg.attr("width"),
		height = +svg.attr("height");


	var textLeftPadding = 10; // initial padding left for text
	var textTopPadding = 15; // initial padding top for text

	var letterTopPadding = 20; // initial padding top for vertical letters

	var textTopSubPadding = 13; // padding top for subsequent word lines (line height)

	var letterTopSubPadding = 7; // padding top for subsequent letters on vertical position words
	var letterLeftSubPadding = 10; // padding left for subsequent letters on vertical position words

	// return node box width
	function nodeWidth(d){ return d.x1 - d.x0; }

	// return node box height
	function nodeHeight(d){ return d.y1 - d.y0; }

	// appends multiline text // REVISAR TEXT TO => THAT
	function genMultiLineText(that){
		var words = that.text().split(' ');
		var thisCell = that.append('g');

		that.select('text').remove();

		for (var i = 0; i < words.length; i++){
			if (i == 0) {
				thisCell.append('text')
				.attr("clip-path", function(d){ 
					return "url(#clip-" + d.data.id + ")"; 
				})
				.text(function(d){
					return d.data.name.split(' ')[i];
				})
				.attr("y", textTopPadding + 5)
				.attr('x', function(d){
					return textLeftPadding;
				});
			}else{
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
							.append("g")
							.append("text")
							.attr('x', textLeftPadding);

		for (var i = 0; i < text.length; i++){

			placeholder.append('tspan')
			.text(function(d) {
				return text[i]; 
			})
			/*.attr('x', function(d){
				return textLeftPadding;
			})*/
			.attr('y', function(d){
				return textTopSubPadding + (i * letterTopSubPadding);
			});
		}


		/*placeholder.append('text')
			.attr("x", function(d) { return textLeftPadding; })
			.attr("y", function(d, i) { return textTopPadding; })
			.attr("dy", ".35em")
			.attr("text-anchor", "start")
			.text(function(d) {return text; });*/


		var pNode = placeholder.node().parentNode
		var bbox = placeholder.node().getBBox();
		
		d3.select(pNode.parentNode).remove();

		return bbox;
	}


	/*==================*/
	/* ***  cores   *** */
	/*==================*/
	
	/* importa o arquivo de cores */
	var colorJSON;
	d3.json('colors.json', function(error, data) {
		if (error) throw error;
		colorJSON = data;
	})

	var fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); },
		color = d3.scaleOrdinal(d3.schemeCategory20.map(fader)),
		format = d3.format(",d");


	/* retorna cor do elemento */
	var color = function(colorId){
		if(colorJSON.regioes[colorId]){
			return colorJSON.regioes[colorId].color;
		}else{
			console.log("Cor correspondente ao id: \"" + colorId +  "\" não encontrada no arquivo colors.json");
			return colorJSON.regioes[0].color;
		}
	}   

	/*==================*/
	/* *** tooltips *** */
	/*==================*/

	/* mostrar */
	var mouseOn = function(d) {

		/* atualiza nome tooltip */
		d3.select(".tooltip .heading")
			.text(d['data']['estado']);

		d3.select(".tooltip .size")
			.text(formatNumber(d['data']['size']));

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

	/* remover tooltip */
	var mouseOut = function() {
		d3.select(".tooltip").classed("none", true);
	};

	/*==================*/
	/* ***  treemap *** */
	/*==================*/

	var treemap = d3.treemap()
		.tile(d3.treemapResquarify)
		.size([width, height])
		.round(true)
		.paddingInner(1);

	//variaveis configuracao query
	var vrv = <?php echo $var; ?>;
	var atc = <?php echo $atc; ?>;
	var cad = <?php echo $cad; ?>;
	var prt = <?php echo $prt; ?>;
	var ano = <?php echo $ano; ?>;

	var config = "?var="+vrv+"&atc="+atc+"&cad="+cad+"&prt="+prt+"&ano="+ano+"";

	/* cria treemap */
	d3.json("ajax_treemap_region.php"+config, function(error, data) {
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
			.attr("width", function(d) { return d.x1 - d.x0; })
			.attr("height", function(d) { return d.y1 - d.y0; })
			.attr("fill", function(d){

				return color(d.data.colorId);
			});

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


		/*=== controla texto ===*/
		var g = d3.selectAll("#corpo svg g");
		g.each(function(d){
			var that = d3.select(this);
			var words = that.text().split(' ');
			var name = d.data.name;

			var box = that.select('rect').node();
			var boxWidth = box.getBBox().width;
			var boxHeight = box.getBBox().height;

			var boxText = d3.select(this).select('text').node();
			var textWidth = boxText.getBBox().width;
			var textHeight = boxText.getBBox().height;

			d.w = textWidth;

			// if tests
			var minHorizontalMargin = 7;
			var wordWiderThanContainer = (boxWidth - textWidth) / 2 <= minHorizontalMargin;
			var oneWordName = words.length === 1;

			// if multiple words text
			if (!oneWordName){
				return genMultiLineText(that);
			} else {

				var wordTallerThanContainer = (boxHeight - textHeight - textTopPadding) <= minHorizontalMargin;
				var wordWiderThanContainer = (boxWidth - textWidth - textLeftPadding) <= minHorizontalMargin;

				// if horizontal word is not bigger than the container (box width - leftPadding)
				if(!wordWiderThanContainer){

					var wordOnEdge = boxHeight - textHeight - 7 <= 7;

					// if text still taller or wider than container tries to fit it in for the last time
					if (wordOnEdge)
						that.select('text').attr('y', (boxHeight - textHeight));

					wordTallerThanContainer = (boxHeight - textHeight) / 2 <= 3;
					wordWiderThanContainer = (boxWidth - textWidth) / 2 <= 4;

					// if didn't fit sets opacity to 0
					if (wordWiderThanContainer || wordTallerThanContainer)
						that.select("text").style("opacity", 0);

				} else {

					//debug(name, 'PI', [boxWidth, textWidth, wordWiderThanContainer])

					// if horizontal word is  bigger than the container (box width - leftPadding)

					var testText = appendTest(name);
					var verticalTextWiderThanContainer = testText.width > boxWidth - textLeftPadding;
					var verticalTextTallerThanContainer = testText.height > boxHeight - testText.height - textTopPadding;


					// if vertical word is wider than container box height
					if (verticalTextWiderThanContainer || verticalTextTallerThanContainer){

						// remove horizontal text from g element
						that.select('text').remove();

						debug(name, 'RN', [boxWidth, testText.width, textLeftPadding + (boxWidth - testText.width) / 2]);
						debug(name, 'PI', [boxWidth, testText.width, textLeftPadding + (boxWidth - testText.width) / 2]);

						// append new text element
						var textElement = that.append('text')
									.attr("text-anchor", "middle")
									.attr('x', (boxWidth - textWidth) / 2)
									.attr('y', textTopPadding + 2);

						// append letters on vertical position
						for (var i = 0; i < name.length; i++){

							textElement.append('tspan')
							.attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
							.attr("text-anchor", "middle")
							.text(function(d) {
								return name[i]; 
							})
							.attr('x', textLeftPadding + (boxWidth - testText.width) / 2)
							.attr('dy', function(d){
								if (i != 0)
									return i * letterTopSubPadding + 4;
							});
						}
					}

					// reavaluate/refresh variables and conditions value
					box = that.select('rect').node();
					boxWidth = box.getBBox().width;
					boxHeight = box.getBBox().height;
					boxText = d3.select(this).select('text').node();
					textWidth = boxText.getBBox().width;
					textHeight = boxText.getBBox().height;

					wordTallerThanContainer = (boxHeight - textHeight) / 2 <= minHorizontalMargin;
					wordWiderThanContainer = (boxWidth - textWidth) / 2 <= minHorizontalMargin;

					// if text still taller or wider than container tries to fit it in for the last time
					if (wordTallerThanContainer || wordWiderThanContainer){
						console.log(name);
						if(wordTallerThanContainer)
							that.select('text').attr('y', (boxHeight - textHeight) / 2 + 9);

						that.selectAll('tspan').each(function(el, i){
							if(i > 0)
								this.setAttribute('dy', letterTopSubPadding + 3);

							if(wordWiderThanContainer)
								this.setAttribute('x', (boxWidth - textWidth) / 2 + 5);
						});
					}

					wordTallerThanContainer = (boxHeight - textHeight) / 2 <= 3;
					wordWiderThanContainer = (boxWidth - textWidth) / 2 <= 4;

					// if didn't fit sets opacity to 0
					if (wordWiderThanContainer || wordTallerThanContainer)
						that.select("text").style("opacity", 0);

				}

			}

		});


		/*=== controla texto ===*/
		/*var g = d3.selectAll("#corpo svg g");
		g.each(function(d){
			var that = d3.select(this);
			var box = that.node();
			var words = that.text().split(' ');

			// var boxWidth = nodeWidth(d);
			// var boxHeight = nodeHeight(d);

			var boxWidth = box.getBBox().width;
			var boxHeight = box.getBBox().height;

			var boxText = d3.select(this).select('text').node();
			var textWidth = boxText.getBBox().width;
			var textHeight = boxText.getBBox().height;

			var name = d.data.name;
			var thisCell;

			d.w = textWidth;

			// if tests
			var wordWiderThanContainer = d.w > boxWidth - textLeftPadding;
			var oneWordName = words.length === 1;
			var wordPaddingWrong = d.w > textWidth - textLeftPadding;
			
			//debug(d.data.name, 'RN', [d.w, boxWidth, wordWiderThanContainer]);
		   // console.log(d.data.name, d.w, boxWidth, wordWiderThanContainer);

			// if name has more than one word calls genMultiLineText function
			if (!oneWordName)
				return genMultiLineText(that);
			else {

				// AQUI RESOLVER ISSO

				// if horizontal word is bigger than the container box width
				if (wordWiderThanContainer){

					var testText = appendTest(name);
					var verticalWordNarrowThanContainer = testText.width < boxWidth - textLeftPadding;
					var verticalWordSmallerThanContainer = testText.height > boxHeight + textTopPadding;


					// if vertical word is narrow than container box height
					if (verticalWordNarrowThanContainer){

						thisCell = that.append('text')
									.attr("text-anchor", "start");

						// remove horizontal text from g element
						that.select('text').remove();


						// append letters on vertical position
						for (var i = 0; i < name.length; i++){
							thisCell.append('tspan')
							.attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
							.attr("text-anchor", "start")
							.text(function(d) {
								return name[i]; 
							})
							.attr('x', function(d){
								var minusValue = 4;

								// if container is too small to use normal padding values
								//if ( (this.getBBox().width + 2) >= (that.node().getBBox().width / 2)){
									return (i === 0)? textLeftPadding - minusValue : textVerticalLeftSubPadding - minusValue;
								/*}else{
									return (i === 0)? textLeftPadding : textVerticalLeftSubPadding;
								}*//*

							})
							.attr('y', function(d){

								// se palavra quebrada ainda é mais alta que o container + textTopPadding
								if(boxHeight < testText.height + textTopPadding){
									var topPad = ((boxHeight - textHeight) / 2 + 2);

									if (i == 0)
										return topPad + 2;
									else
										return topPad + i * textVerticalTopSubPadding;

								} else {

									if (i == 0)
										return textTopPadding;
									else
										return (letterTopPadding + (i * textVerticalTopSubPadding) );

								}
							});
						}

					}

					/*else if (verticalWordNarrowThanContainer && !verticalWordSmallerThanContainer){
						 return (letterTopPadding + (i * textVerticalTopSubPadding) );
					}*//*


					else{
						
						// sets 0 opacity to text that doesnt fit neither horizontal or vertical
						that.select("text").style("opacity", 0);
					}

				} else{

					var textHeight = boxText.getBBox().height;
					var boxInfo = box.getBBox();

					// if vertical padding is wrong
				   // debug(d.data.name, 'MT', [boxHeight, boxInfo, textHeight]) : "";
				
					// if container is too small to use the normal padding values
					if (wordPaddingWrong){
						that.select('text')
							.attr('x', function(d){
								return textLeftPadding - 3;
							});
					}
				}
			}


		});*/


	});

	function sumByCount(d) {
		return d.children ? 0 : 1;
	}

	function sumBySize(d) {
		return d.size;
	}


	// função apenas para debug
	function debug(value, match, args){
		if(value === match.toUpperCase()){
			args.unshift(value);
			console.log.apply(console, args);
		}
	}
</script>