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
<!-- <div id="tooltip" class="tooltip none">
	<p><strong class="heading"></strong></p>
	<p><span class="size"></span></p>
</div> -->

<script>

	var windowWidth = $(window).width();

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

	// appends multiline text// REVISAR TEXT TO => THAT
	function genMultiLineText(that){
		var words = that.text().split(' ');
		var thisCell = that.append('g');

		that.select('text').remove();

		for(var i=0; i<words.length; i++){
			if (i == 0) {
				thisCell.append('text')
					.attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
					.text(function(d) {
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

		var pNode = placeholder.node().parentNode
		var bbox = placeholder.node().getBBox();
		
		d3.select(pNode.parentNode).remove();

		return bbox;
	}

	/*==================*/
	/* ***  cores   *** */
	/*==================*/

	/* importa arquivo de cores */
	var colorJSON;
	d3.json('colors.json', function(error, data) {
		if(error) throw error;
		colorJSON = data;
	})

	var fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); },
		format = d3.format(",d");

	/* retorna cor do elemento */
	var color = function(colorId){
		if(colorJSON.cadeias[colorId]){
			return colorJSON.cadeias[colorId].color;
		}else{
			console.log("Cor correspondente ao id: \"" + colorId +  "\" não encontrada no arquivo colors.json");
			return colorJSON.cadeias[0].color;
		}
	}

	/*==================*/
	/* *** tooltips *** */
	/*==================*/

	/* mostrar */
	// var mouseOn = function(d) {

	// 	/* atualiza nome tooltip */
	// 	d3.select(".tooltip .heading")
	// 		.text(d['data']['name']);

	// 	d3.select(".tooltip .size")
	// 		.text(formatNumber(d['data']['size']));

	// 	/*== posição do gráfico na tela ==*/
	// 	var chartOffset = $('.chart').offset(), 
	// 		leftOffset = chartOffset.left,
	// 		leftOffsetEnd = leftOffset+$('.chart').width(),
	// 		topOffset = chartOffset.top;

	// 	/* tamanho do tooltip */
	// 	var tooltipWidth = $('.tooltip').width();

	// 	/*== posição do tooltip ==*/
	// 	var xPosition = d3.event.pageX-leftOffset+30;
	// 	var xPositionEnd = xPosition+tooltipWidth;
	// 	var yPosition = d3.event.pageY -topOffset+5;

	   
	// 	/* se a posição final do tooltip for além do final da tela */
	// 	if(xPositionEnd>leftOffsetEnd){
	// 		xPosition = xPosition - tooltipWidth - 30; /* altera a posição */
	// 	}

	// 	d3.select(".tooltip")
	// 		.style("left", xPosition + "px")
	// 		.style("top", yPosition + "px");

	// 	d3.select(".tooltip").classed("none", false);
	// };

	// /* esconder tooltip */
	// var mouseOut = function() {
	// 	d3.select(".tooltip").classed("none", true);
	// };

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
	var prt = <?php echo $prt; ?>;
	var ano = <?php echo $ano; ?>;
	var uf = <?php echo $uf; ?>;    

	var config = "?var="+vrv+"&uf="+uf+"&atc="+atc+"&prt="+prt+"&ano="+ano+"";

	d3.json("ajax_treemap_scc.php"+config, function(error, data) {
		if (error) throw error;

		var attachColor=function(d){
			return (d.depth==3)? d.data.colorId=d.parent.parent.data.colorId : ''; 
		};

		var root = d3.hierarchy(data)
					.eachBefore(function(d) {
						attachColor(d);
						d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
					})
					.sum(sumBySize)
					.sort(function(a, b) { return b.height - a.height || b.value - a.value; });

		treemap(root);

		
		var toolFun = tooltip();
		var tooltipEl = toolFun.addTooltip();

		var cell = svg.selectAll("g")
					.data(root.leaves())
					.enter().append("g")
					.attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
					//mouseover
					.on("mouseover", function(d){
						toolFun.showTooltip(d, tooltipEl, [
							["title", d['properties']['name']],
							["Valor", formatNumber(dict[d.id].valor)],
							["Percentual", formatDecimalLimit(dict[d.id].percentual, 2) + "%"],
							["Taxa", formatDecimalLimit(dict[d.id].valor, 2)],
						]);
					})
					.on("mouseout", toolFun.hideTooltip);

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

			var minMargin = 8;
			var offsetMargin = 5;
			var oneWordName = words.length === 1;

			// if multiple words text
			if (!oneWordName)
				return genMultiLineText(that);

			// if only one word

			// if tests
			var wordTallerThanContainer = (boxHeight - textHeight - textTopPadding) <= minMargin;
			var wordWiderThanContainer = (boxWidth - textWidth - textLeftPadding) <= minMargin;			

			// if horizontal word is NARROW than the container (box width - leftPadding)
			if(!wordWiderThanContainer){

				var isVerticalMarginAvailable = (boxHeight - textHeight) / 2 > minMargin;
				var wordOnVerticalEdge = boxHeight - textHeight - textTopPadding <= minMargin	;

				if (!isVerticalMarginAvailable)
					return that.select("text").style("opacity", 0);

				// if text still taller than container tries to fit it in for the last time
				if (wordOnVerticalEdge)
					that.select('text').attr('y', (boxHeight - textHeight) / 2 + minMargin);

			} else {
				// if horizontal word is BIGGER than the container break it into vertical letters

				// tries to horizontally fit word first
				that.select('text').attr('x', Math.ceil((boxWidth - textWidth) / 2));

				// test if is still wider
				var textStillWiderThanBox = boxWidth < d3.select(this).select('text').node().getBBox().width + minMargin;

				if (textStillWiderThanBox){
					var textMock = appendTest(name);
					var textMockWiderThanContainer = 10 > boxWidth; // 10 means max text width (only one letter per line)
					var textMockTallerThanContainer = textMock.height > boxHeight;

					// if textMock height is taller than boxHeight sets opacity to 0
					if (textMockTallerThanContainer)
						return that.select("text").style("opacity", 0);

					// if textMock width isn't wider than container box width
					if (!textMockWiderThanContainer){

						// remove horizontal text from g element
						that.select('text').remove();

						// append new text element
						var textElement = that.append('text')
									.attr("text-anchor", "middle")
									.attr('x', 0)
									.attr('dx', 0)
									.attr('y', textTopPadding + 2);

						// append letters on vertical position
						for (var i = 0; i < name.length; i++){

							textElement.append('tspan')
							.attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
							.attr("text-anchor", "middle")
							.text(function(d) {
								return name[i]; 
							})
							.attr('x', 0)
							.attr('dx', textLeftPadding + 4)
							.attr('dy', function(d){
								if (i != 0)
									return letterTopSubPadding + 2;
							});
						}

					}
					
				}

				// reavaluate/refresh variables and conditions value
				box = that.select('rect').node();
				boxWidth = box.getBBox().width;
				boxHeight = box.getBBox().height;
				boxText = d3.select(this).select('text').node();
				textWidth = boxText.getBBox().width;
				textHeight = boxText.getBBox().height;

				wordTallerThanContainer = (boxHeight - textHeight) / 2 <= minMargin;
				wordWiderThanContainer = (boxWidth - textWidth) / 2 <= minMargin;

				// if text still taller or wider than container tries to fit it in for the last time
				if (wordTallerThanContainer)
					that.select('text').attr('y', (boxHeight - textHeight) / 2 + offsetMargin);

				wordTallerThanContainer = boxHeight - textHeight <= minMargin;
				wordWiderThanContainer = boxWidth - textWidth <= minMargin;

				// if didn't fit sets opacity to 0
				if (wordWiderThanContainer || wordTallerThanContainer)
					that.select("text").style("opacity", 0);
			}
		});


	});

	function sumByCount(d) {
		return d.children ? 0 : 1;
	}

	function sumBySize(d) {
		return d.size;
	}

	// função apenas para debug
	function debug(value, match, args){
		if(value === match){
			args.unshift(value);
			console.log.apply(console, args);
		}
	}
</script>