var windowWidth = $(window).width(); /* dimensão da tela */

/* cria svg */
var svg = d3.select("#corpo").append("svg");

/*=== dimensões do gráfico ===*/        
if(windowWidth>768){
	$('#corpo').find('svg').attr('width',$('.chart').width());
	$('#corpo').find('svg').attr('height',$('.chart').width()/2);
}
else{
	$('#corpo').find('svg').attr('width',$('.chart').width()-20);
	$('#corpo').find('svg').attr('height',$('.chart').width());
}

svg = d3.select("svg"),
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
	var thisCell = that.append('g').append('text').attr("clip-path", function(d){ return "url(#clip-" + d.data.id + ")"; });

	that.select('text').remove();

	for (var i = 0; i < words.length; i++){
		if (i == 0) {
			thisCell.append('tspan')
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
			thisCell.append('tspan')
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
						.attr('x', 0);

	for (var i = 0; i < text.length; i++){

		placeholder.append('tspan')
		.text(function(d) {
			return text[i]; 
		})
		.attr('x', 0)
		.attr('dx', textLeftPadding)
		.attr('y', function(d){
			return textTopSubPadding + (i * letterTopSubPadding + (i!==0? 2 : 0));
		});
	}

	var pNode = placeholder.node().parentNode;
	var bbox = placeholder.node().getBBox();
	
	d3.select(pNode.parentNode).remove();

	return bbox;
}


/*==================*/
/* ***  cores   *** */
/*==================*/

/* importa o arquivo de cores */
var colorJSON;
d3.json('data/colors.json', function(error, data) {
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
/* ***  treemap *** */
/*==================*/

var treemap = d3.treemap()
	.tile(d3.treemapResquarify)
	.size([width, height])
	.round(true)
	.paddingInner(1);

var config = "?var="+vrv+"&atc="+atc+"&cad="+cad+"&prt="+prt+"&ano="+ano+"";

/* cria treemap */
d3.json("./db/json_treemap_region.php"+config, function(error, data) {
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

	var tooltipInstance = tooltip.getInstance();

	var cell = svg.selectAll("g")
					.data(root.leaves())
					.enter().append("g")
						.attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
						.on("mouseover", function(d){
							tooltipInstance.showTooltip(d, [
								["title", d.data.name],
								["Valor", formatNumber(d.data.size)],
								["Percentual", formatDecimalLimit(d.data.percentual*100, 2) + "%"],
								["Taxa", formatDecimalLimit(d.data.taxa, 2)],
							]);
						})
						.on("mouseout", tooltipInstance.hideTooltip);

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

	var titleTextElement = cell.append("text")
		.attr("text-anchor", "start")
		.attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
		.attr("class", "title");
		
	titleTextElement.append('tspan')
		.text(function(d) {return d.data.name; })
		.attr("x", 0)
		.attr("dx", function(d) { return textLeftPadding; })
		.attr("dy", 0).attr("y", function(d, i) { return textTopPadding; })
		.attr("dy", ".35em");
	
	var percentageTextElement = cell.append("text")
		.attr("text-anchor", "start")
		.attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
		.attr("class", "percentage");

	percentageTextElement.append('tspan')
		.text(function(d) { return formatNumber(d.data.percentual*100, 2) + '%'; })
		.attr("x", 0)
		.attr("dx", function(d) {
			var nWidth = nodeWidth(d);
			var nTextPosition = nodeWidth(d) - 40;

			var nodePercentage = Math.round(100 * nWidth / width);

			var fontOrdinalSize = d3.scaleThreshold()
				.domain([12, 25, 30, 40])
				.range([8, 12, 16, 20]);

			var fontSize = fontOrdinalSize(nodePercentage);

			if (fontSize < 12) {
				minusValue = 28;
			} else if (fontSize < 16 && fontSize >= 12){
				minusValue = 46;
			} else if (fontSize < 20 && fontSize >= 16){
				minusValue = 58;
			} else if (fontSize >= 20){
				minusValue = 75;
			}

			// test space left to use and sets {minusValue} to decrement position accordingly
			// if (nTextPosition <= 30)
			// 	minusValue = 25;
			// else if(nTextPosition <= 100)
			// 	minusValue = 40;
			// else if(nTextPosition <= 150)
			// 	minusValue = 50;
			// else
			// 	minusValue = 75;			
			
			return nodeWidth(d) - minusValue;
		})
		.attr("dy", 0).attr("y", function(d, i) {
			var minusValue = nodeHeight(d) - 20 <= nodeHeight(d) / 2? nodeHeight(d) / 2 - 12 : 10;
			return nodeHeight(d) - minusValue;
		})
		.attr("opacity", function(d, i) {
			// se porcentagem for muito pequena e só mostrar 0%, opacity é 0
			return parseFloat(formatNumber(d.data.percentual*100, 2).replace(",", ".")) === 0? 0 : 1;
		})
		.attr("font-size", function(d) {
			var nWidth = nodeWidth(d);
			var nodePercentage = Math.round(100 * nWidth / width);

			var fontOrdinalSize = d3.scaleThreshold()
				.domain([12, 25, 30, 40])
				.range([8, 12, 16, 20]);

			var fontSize = fontOrdinalSize(nodePercentage);
			
			return fontSize;	
		});

		// aumenta o tamanho do gráfico pra caber o título
	$('#corpo').find('svg').attr('height',$('.chart').height()+30);
	
	// new svg margin top value
	var svgMarginTop = 35;
	// cria título
	svg.append("text").append("tspan")
		.data(root.leaves())
		.attr("x", (width / 2))
		.attr("y", 20)
		.attr("font-size", 20)
		.attr("text-anchor", "middle")
		.attr("class","treemap-title")
		.text(function(d){ return "Brasil" });

	// AQUI - refatorar função pra deixar de remover todo text, deixando de remover também a porcentagem.
	// AQUI - reposicionar horizontalmente apenas quando necessário
	/*=== controla texto ===*/
	var g = d3.selectAll("#corpo svg g");
	g.each(function(d){
		var that = d3.select(this);
		var words = that.text().split(' ');
		var name = d.data.name;

		// creates a top margin for title positioning
		var transformValues = that.attr("transform").split("(")[1].replace(/\)/g, "").split(",");
		var xVal = parseFloat(transformValues[0]),
			yVal = parseFloat(transformValues[1]);	

		that.attr("transform", "translate(" + xVal + "," + (yVal + svgMarginTop) + ")");

		var box = that.select('rect').node();
		var boxWidth = box.getBBox().width;
		var boxHeight = box.getBBox().height;

		var boxText = d3.select(this).select('text.title').node();
		var textWidth = boxText.getBBox().width;
		var textHeight = boxText.getBBox().height;
		d.w = textWidth;

		var minMargin = 6;
		var minVerticalMargin = 4;
		var offsetXMargin = 5;
		var offsetYMargin = 8;

		// if only one word

		// if tests
		var wordTallerThanContainer = (boxHeight - textHeight - textTopPadding) <= minMargin;
		var wordWiderThanContainer = (boxWidth - textWidth - textLeftPadding) <= minMargin;

		// debug(name, 'MS', [boxWidth, textWidth, ((boxWidth - textWidth - textLeftPadding) / 2) <= minMargin])

		// if horizontal word is NARROW than the container (box width - leftPadding)
		if(!wordWiderThanContainer){
			var isVerticalMarginAvailable = (boxHeight - textHeight) / 2> minVerticalMargin;
			var wordOnVerticalEdge = boxHeight - textHeight - textTopPadding <= minVerticalMargin;

			if (!isVerticalMarginAvailable){
				that.select("text.title").style("opacity", 0);
				that.select("text.percentage").style("opacity", 0);
			}

			// if text still taller than container tries to fit it in for the last time
			if (wordOnVerticalEdge){
				that.select('text.title tspan').attr('y', (boxHeight - textHeight) / 2 + minMargin);
				that.select('text.percentage tspan').attr('y', (boxHeight - textHeight) / 2 + minMargin + 3.5);
			}

		} else {
			// if horizontal word is BIGGER than the container break it into vertical letters
			// var textStillWiderThanBox = boxWidth < d3.select(this).select('text.title').node().getBBox().width + minMargin;
			var textStillWiderThanBox;

			// tries to horizontally fit word first
			// if(textStillWiderThanBox)
				that.select('text.title').attr('x', Math.ceil((boxWidth - textWidth) / 2));		
				that.select('text.percentage tspan').attr('dx', Math.ceil((boxWidth - that.select('text.percentage').node().getBBox().width) / 2));		

			// test if is still wider
			textStillWiderThanBox = (boxWidth - d3.select(this).select('text.title').node().getBBox().width - textLeftPadding) / 2 <= minMargin;
			
			if (textStillWiderThanBox){
				
				var textMock = appendTest(name);
				var textMockWiderThanContainer = 10 > boxWidth; // 10 means max text width (only one letter per line)
				var textMockTallerThanContainer = textMock.height > boxHeight;

				// if textMock height is taller than boxHeight sets opacity to 0
				if (textMockTallerThanContainer){
					that.select("text.percentage").style("opacity", 0);
					return that.select("text.title").style("opacity", 0);
				}

				// if textMock width isn't wider than container box width
				if (!textMockWiderThanContainer){

					// remove horizontal text from g element
					that.select('text.title').remove();

					// append new text element
					var textElement = that.append('text')
								.attr("text-anchor", "middle")
								.attr("class", "title")
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
						.attr('dx', function(d){
							var sum = Math.floor((boxWidth - textMock.width) / 2 + minMargin);

							if (textMock.width + sum - minMargin > boxWidth)
								sum = Math.floor((boxWidth - textMock.width) / 2);							

							return sum;
						})
						.attr('dy', function(d){
							if (i != 0)
								return letterTopSubPadding + 2;
							else
								return 0;
						});
					}

				}
				
			}

			// reavaluate/refresh variables and conditions values			
			boxText = d3.select(this).select('text.title').node();
			textWidth = boxText.getBBox().width;
			textHeight = boxText.getBBox().height;

			wordTallerThanContainer = (boxHeight - textHeight) / 2 <= minMargin;
			wordWiderThanContainer = (boxWidth - textWidth) / 2 <= minMargin;

			// if text still wider than container tries to fit it in for the last time
			if (wordWiderThanContainer){
				// if text element has tspan children
				if (d3.select(this).select('text.title tspan').node()){
					d3.select(this).selectAll('text.title tspan').each(function(i, el){
						d3.select(this).attr('x', 0);
						d3.select(this).attr('dx', function(d) {
							var sum = Math.ceil((boxWidth - textWidth) / 2) + minMargin;
							
							if (textWidth + sum > boxWidth) 
								sum = Math.ceil((boxWidth - textWidth) / 2 + 5);

							return sum;
						});
					});
				} else{
					that.select('text.title').attr('x', Math.ceil((boxWidth - textWidth) / 2));
				}
			}

			// if text still taller than container tries to fit it in for the last time
			if (wordTallerThanContainer)
				that.select('text.title').attr('y', (boxHeight - textHeight) / 2 + offsetYMargin);

			wordTallerThanContainer = boxHeight - textHeight <= minMargin;
			wordWiderThanContainer = boxWidth - textWidth <= minMargin;

			// if didn't fit sets opacity to 0
			if (wordWiderThanContainer || wordTallerThanContainer){
				that.select("text.title").style("opacity", 0);
				that.select("text.percentage").style("opacity", 0);
			}
		}

		// test if only percentage text element has a limit margin of 2 pixels, if not hides percentage and uf title
		var percentageWider = (boxWidth - that.select('text.percentage').node().getBBox().width) / 2 < 2;
		if(percentageWider){			
			that.select("text.percentage").style("opacity", 0);
			that.select("text.title").style("opacity", 0);
		}

		// test if percentage and title interpolate
		var bothTaller = (boxWidth - d3.select(this).select('text.title').node().getBBox().width - d3.select(this).select('text.percentage').node().getBBox().width) / 2 < minMargin;
		var bothWider = (boxHeight - d3.select(this).select('text.title').node().getBBox().height - d3.select(this).select('text.percentage').node().getBBox().height) / 2 <= minVerticalMargin;

		// if both title and percentage togheter are taller and wider than container but only title isnt
		/*if (!wordWiderThanContainer && bothTaller && bothWider){
			that.select("text.title").style("opacity", 0);
		} else*/
		if (bothTaller && bothWider){
			if (!percentageWider) {
				return that.select("text.title").style("opacity", 0);
			}
			// if both title and percentage are wider and taller, opacity 0 on both
			that.select("text.title").style("opacity", 0);
			that.select("text.percentage").style("opacity", 0);
		} 
	});

	// aumenta a altura do svg pra caber a legenda
	var mobileSubtitle = windowWidth<480 ? 1 : 0,
		subtitleHeight = mobileSubtitle ? 70 : 35;

	$('#corpo').find('svg').attr('height',$('.chart').height() + subtitleHeight);

	// creates cadeia's color range array from color.json file
	var colors = { domain: [], range: [] };             
	$.each(colorJSON.regioes, function(i, regiao){		
		if (i>0) {
			colors.domain.push(regiao.name);
			colors.range.push(regiao.color);
		}
	});

	//  legends
	var ordinal = d3.scaleOrdinal()
	.domain(colors.domain)
	.range(colors.range);

	svg.append("g")
		.attr("class", "legendOrdinal")
		.attr("transform", "translate(1," + (height + 20 + svgMarginTop) + ")");

	var legendOrdinal = d3.legendColor()
		.cells(colors.domain)
		//.orient('horizontal')
		.labelAlign("start")
		.scale(ordinal);

	svg.select(".legendOrdinal")
		.call(legendOrdinal);

	// reposiciona elementos da legenda
	var legendElements = d3.selectAll('.legendOrdinal g');
	var cont = 0;

	legendElements.each(function(d, i){
		var that = d3.select(this);
		var space = mobileSubtitle ? width/3 : width/5;
		var tWidth;

		if(i===1 || mobileSubtitle && i===3){
			tWidth = 0;
			cont = 1;
		}
		else
			tWidth = (cont - 1) * (space + 5);

		if (i>0) {
			
			if(mobileSubtitle && i>2) var translateY = 25;
			else var translateY = 0;
					
			that.attr('transform', function(){
				return "translate("+ tWidth +","+translateY+")";
			});	
		}
		
		cont ++;
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
	if(value === match.toUpperCase()){
		args.unshift(value);
		console.log.apply(console, args);
	}
}