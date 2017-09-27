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

if(eixo == 1) {
    var config = "?var="+vrv+"&atc="+atc+"&cad="+cad+"&prt="+prt+"&ocp="+ocp+"&sex="+sex+"&fax="+fax+"&esc="+esc+"&cor="+cor+"&frm="+frm+"&prv="+prv+"&snd="+snd+"&ano="+ano+"&eixo="+eixo;
}
else {
	var config = "?var="+vrv+"&atc="+atc+"&cad="+cad+"&prt="+prt+"&ocp="+ocp+"&mec="+mec+"&mod="+mod+"&pfj="+pfj+"&ano="+ano+"&eixo="+eixo;
}

d3.json("./db/json_treemap_region.php"+config, function(error, data) {
	console.log(data);
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
		.text(function(d) {return d.data.name; })
		.attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
		.attr("class", "title")
		.attr("x", 10)
		.attr("y", 19)
		.attr("text-anchor", "start");
			
	var percentageTextElement = cell.append("text")
		.attr("text-anchor", "start")
		.attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
		.attr("class", "percentage");

	percentageTextElement.append('tspan')
		.text(function(d) { return formatDecimalLimit(d.data.percentual*100, 2) + '%'; })
		.attr("display", function(d, i) {			
			// se porcentagem for muito pequena e só mostrar 0%, opacity é 0
			return parseFloat(formatDecimalLimit(d.data.percentual*100, 2).replace(",", ".")) === 0? "none" : "block";
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

	/*=== move nódulos pra baixo pra caber o título ===*/
	var g = d3.selectAll("#corpo svg g");

	formatTreemapText();

	g.each(function(d){
		var that = d3.select(this);
		var words = that.text().split(' ');
		var name = d.data.name;

		// creates a top margin for title positioning
		var transformValues = that.attr("transform").split("(")[1].replace(/\)/g, "").split(",");
		var xVal = parseFloat(transformValues[0]),
			yVal = parseFloat(transformValues[1]);	

		that.attr("transform", "translate(" + xVal + "," + (yVal + svgMarginTop) + ")");
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

	// testa e mostra mensagem de valor zerado/indisponível
	var isValueZero = true;
	d3.selectAll("#corpo>svg>g")
	.data(root.leaves())
	.attr("display", function(d){
		var size = parseFloat(d.data.size);
		var isSizeZero = size === 0 || size === null || size === undefined;		
		if (!isSizeZero && isValueZero)
			isValueZero = false;
	});

	// testa se o valor de size é zero
	if (isValueZero) {
		d3.selectAll("#corpo>svg>g")
		.attr("display", "none");

		d3.select("#corpo>svg")
			.append("g")
			.attr("class", "no-info")
			.append("text")
			.text("Não há dados sobre essa desagregação")
			.attr("x", d3.select("#corpo>svg").attr("width") / 2)
			.attr("y", d3.select("#corpo>svg").attr("height") / 2)
			.attr("text-anchor", "middle");
	}

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