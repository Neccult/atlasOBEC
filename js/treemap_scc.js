var windowWidth = $(window).width();

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
/* ***  treemap *** */
/*==================*/
var treemap = d3.treemap()
	.tile(d3.treemapResquarify)
	.size([width, height])
	.round(true)
	.paddingInner(1); 

var config = "?var="+vrv+"&uf="+uf+"&atc="+atc+"&prt="+prt+"&ano="+ano+"";

d3.json("./db/json_treemap_scc.php"+config, function(error, data) {
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

	// creates cadeia's color range array from color.json file
	var colors = { domain: [], range: [] };             
	$.each(colorJSON.cadeias, function(i, cadeia){
		if (i>0) {
			colors.domain.push(cadeia.name);
			colors.range.push(cadeia.color);
		}
	});

	var colorsRange = d3.scaleOrdinal()
	.domain(colors.domain)
	.range(colors.range);

	/*==========================*/
	/* *** nodes & tooltips *** */
	/*==========================*/
	var tooltipInstance = tooltip.getInstance();

	var cell = svg.selectAll("g")
				.data(root.leaves())
				.enter().append("g")
				.attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
				//mouseover
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
		.attr("width", function(d) { return nodeWidth(d); })
		.attr("height", function(d) { return d.y1 - d.y0; })
		.attr("fill", function(d) { return color(d.data.colorId); });

	cell.append("clipPath")
		.attr("id", function(d) { return "clip-" + d.data.id; })
		.append("use")
		.attr("xlink:href", function(d) { return "#" + d.data.id; });

	// aumenta o tamanho do gráfico pra caber o título
	$('#corpo').find('svg').attr('height',$('.chart').width()/2+50);
	
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
		.text(function(d){ return d.data.estado; });

	cell.append("text")
		.attr("x", function(d) { return textLeftPadding; })
		.attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
		.attr("y", function(d, i) { return textTopPadding; })
		.attr("dy", ".35em")
		.attr("text-anchor", "start")
		.append("tspan")
		.text(function(d) {return formatDecimalLimit(d.data.percentual * 100, 2) + "%"; })
		.attr('fill', "#fff");

   /*=== controla texto ===*/
	var g = d3.selectAll("#corpo svg g");
	g.each(function(d){
		var that = d3.select(this);
		var minMargin = 6;
		var minVerticalMargin = 2;

		// creates a top margin for title positioning
		var transformValues = that.attr("transform").split("(")[1].replace(/\)/g, "").split(",");
		var xVal = parseFloat(transformValues[0]),
			yVal = parseFloat(transformValues[1]);	

		that.attr("transform", "translate(" + xVal + "," + (yVal + svgMarginTop) + ")");
		
		var box = that.select('rect').node();
		var boxWidth = box.getBBox().width;
		var boxHeight = box.getBBox().height;

		var boxText = d3.select(this).select('text').node();
		var textWidth = boxText.getBBox().width;
		var textHeight = boxText.getBBox().height;

		var isTextWider = (boxWidth - textWidth) / 2 < minMargin;
		var isTextTaller = (boxHeight - textHeight) / 2 < minMargin;

		if (isTextWider) {
			that.select("text tspan")
				.attr("font-size", 8)
				.attr("dx", (boxWidth - textWidth) / 2 - minMargin);
		}

		if ((boxHeight - textHeight) / 2 < minMargin) {
			that.select("text tspan")
				.attr("font-size", 8)
				.attr("dy", (boxWidth - textWidth) / 2 - minVerticalMargin);
		}
	});

	/*g.each(function(d){
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
*/

	// aumenta a altura do svg pra caber a legenda
	$('#corpo').find('svg').attr('height',$('.chart').height() + 63);	

	// legenda 
	var legLeftRange = [0, 4];
	var legMiddleRange = [4, 8];
	var legRightRange = [8, 10];

	var legendPartOne = { domain: colors.domain.slice(legLeftRange[0], legLeftRange[1]), range: colors.range.slice(legLeftRange[0], legLeftRange[1])};
	var legendPartTwo = { domain: colors.domain.slice(legMiddleRange[0], legMiddleRange[1]), range: colors.range.slice(legMiddleRange[0], legMiddleRange[1]) };
	var legendPartThree = { domain: colors.domain.slice(legRightRange[0], legRightRange[1]), range: colors.range.slice(legRightRange[0], legRightRange[1]) };
	
	// left legends
	var ordinal = d3.scaleOrdinal()
		.domain(legendPartOne.domain)
		.range(legendPartOne.range);

	svg.append("g")
		.attr("class", "legendOrdinalLeft")
		.attr("transform", "translate(1," + (height + 15 + svgMarginTop) + ")");

	var legendOrdinalLeft = d3.legendColor()
		.cells(legendPartOne.domain)
		.scale(ordinal);

	svg.select(".legendOrdinalLeft")
		.call(legendOrdinalLeft);

	var ajuste = windowWidth>480 ? 30 : 0,
		centerLeg = width/3 + ajuste,
		rightLeg = centerLeg*2;

	// middle legends
	var ordinal = d3.scaleOrdinal()
		.domain(legendPartTwo.domain)
		.range(legendPartTwo.range);

	svg.append("g")
		.attr("class", "legendOrdinalMiddle")
		.attr("transform", "translate("+centerLeg+"," + (height + 15 + svgMarginTop) + ")");

	var legendOrdinalMiddle = d3.legendColor()
		.cells(legendPartTwo.domain)
		.scale(ordinal);

	svg.select(".legendOrdinalMiddle")
		.call(legendOrdinalMiddle);

	// right legends
	var ordinal = d3.scaleOrdinal()
		.domain(legendPartThree.domain)
		.range(legendPartThree.range);

	svg.append("g")
		.attr("class", "legendOrdinalRight")
		.attr("transform", "translate("+rightLeg+"," + (height + 15 + svgMarginTop) + ")");

	var legendOrdinalRight = d3.legendColor()
		.cells(legendPartThree.domain)
		.scale(ordinal);

	svg.select(".legendOrdinalRight")
		.call(legendOrdinalRight);

	d3.selectAll('#testDiv').remove();
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