var windowWidth = $(window).width(); /* dimensão da tela */

/* cria svg */
var svg = d3.select("#corpo").append("svg");

/*=== dimensões do gráfico ===*/        
if(windowWidth>350){
	$('#corpo').find('svg').attr('width',$('.chart').width());
	$('#corpo').find('svg').attr('height',$('.chart').width()/2);
}
else{
	$('#corpo').find('svg').attr('width',$('.chart').width()-50);
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
			return textTopSubPadding + (i * letterTopSubPadding + (i!==0? 2 : 0));
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

		var minMargin = 6;
		var offsetXMargin = 5;
		var offsetYMargin = 8;
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
						.attr('dx', textLeftPadding)
						.attr('dy', function(d){
							if (i != 0)
								return letterTopSubPadding + 2;
							else
								return 0;
						});
					}

				}
				
			}

			// reavaluate/refresh variables and conditions value
			boxText = d3.select(this).select('text').node();
			textWidth = boxText.getBBox().width;
			textHeight = boxText.getBBox().height;

			wordTallerThanContainer = (boxHeight - textHeight) / 2 <= minMargin;
			wordWiderThanContainer = (boxWidth - textWidth) / 2 <= minMargin;

			// if text still wider than container tries to fit it in for the last time
			if (wordWiderThanContainer)
				// if text element has tspan children
				if (that.select('tspan')){
					that.selectAll('tspan').each(function(i, el){
						d3.select(this).attr('dx', Math.ceil((boxWidth - textWidth) / 2 + offsetXMargin));
					});
				} else
					that.select('text').attr('x', Math.ceil((boxWidth - textWidth) / 2));

			// if text still taller than container tries to fit it in for the last time
			if (wordTallerThanContainer)
				that.select('text').attr('y', (boxHeight - textHeight) / 2 + offsetYMargin);

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
	if(value === match.toUpperCase()){
		args.unshift(value);
		console.log.apply(console, args);
	}
}