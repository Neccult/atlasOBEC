// Mapa JS //
/*=== tamanho do mapa ===*/
var windowWidth = $(window).width(),
	width = $('.chart').width();
	height = width/1.4;

var shapeWidth = 30;

 /**** desktop! ****/
if(windowWidth>=1200){
  
	/* cria svg */
	var svg = d3.select("#corpo").append("svg")
		.attr("width", width)
		.attr("height", height);
   
	/* configura projeção */
	var projection = d3.geoMercator()
		.center([-40, -30])             
		.rotate([4.4, 0])               
		.scale(550)                     
		.translate([width/2, height/1.2]);  

	var legendTransform = "translate(365,220)";
	var shapeWidth = 80;
}
/**** tablet landscape! ****/
else if(windowWidth>=992){  

	//cria svg
	var svg = d3.select("#corpo").append("svg")
		.attr("width", width)
		.attr("height", height);
   
	//configura projeção
	var projection = d3.geoMercator()
		.center([-40, -30])             
		.rotate([4.4, 0])               
		.scale(400)                     
		.translate([width / 2, height / 1.2]);

	var translateX = width-150;
	var legendTransform = "translate("+translateX+",110)";
}
/**** tablet portrait! ****/
else if(windowWidth>=768){  

	var height = width/2;

	//cria svg
	var svg = d3.select("#corpo").append("svg")
		.attr("width", width)
		.attr("height", height);
   
	//configura projeção
	var projection = d3.geoMercator()
		.center([-40, -30])             
		.rotate([4.4, 0])               
		.scale(400)                     
		.translate([width / 2, height / 1.2]);

	var legendTransform = "translate(500,110)";
}
/**** mobile! ****/
else{  

	var height = 200;
	var shapeWidth = 20;

	//cria svg
	var svg = d3.select("#corpo").append("svg")
		.attr("width", width)
		.attr("height", height);
   
	//configura projeção
	var projection = d3.geoMercator()
		.center([-50, -28])             
		.rotate([4.4, 0])               
		.scale(250)                     
		.translate([width / 1.5, height / 1.2]);

	var legendTransform = "translate(0,10)";
}

var path = d3.geoPath()
	.projection(projection);

// import colors.json file
var colorJSON;
d3.json('data/colors.json', function(error, data) {
  if(error) throw error;

  colorJSON = data;
});

// import pt-br.json file for get the title
var textJSON;
d3.json('data/pt-br.json', function(error, data) {
  if(error) throw error;

  textJSON = data;
});

var config = "?var="+vrv+"&atc="+atc+"&cad="+cad+"&prt="+prt+"&ocp="+ocp+"&mec="+mec+"&pfj="+pfj+"&ano="+ano+"&eixo="+eixo;
// console.log(config);

//pre-load arquivos
d3.queue()
	.defer(d3.json, "./data/br-min.json")
	.defer(d3.json, "./db/json_mapa.php"+config)
	.await(ready);

//leitura
function ready(error, br_states, mapa){
	if (error) return console.error(error);

	//variaveis informacao
	var dict = {};
	var info = [];

	Object.keys(mapa).forEach(function(key) {

		// console.log(key, mapa[key]);
		info.push(mapa[key]);
		return dict[mapa[key].id] = {id:mapa[key].id, uf:mapa[key].uf, valor:mapa[key].valor, percentual:mapa[key].percentual, taxa:mapa[key].taxa};

	});

	//carrega estados JSON
	var states = topojson.feature(br_states, br_states.objects.states);


	//exclui linha de cabeçario do OBJ
	info.splice(0,1);
	info.splice(27,28);
	delete dict[0];

	//valores maximos e minimos
	var minValue = d3.min(info, function(d) {return d.valor; });
	var maxValue = d3.max(info, function(d) {return d.valor; });

	//distribuicao de frequencias    
	var quant = 9;
	var range = maxValue - minValue; 
	var amp = minValue < 1 && minValue > -1 ? range / quant : Math.round(range / quant);

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
	if(amp > 1){
		while(i<=9){
			dom[i] = dom[i] - (dom[i] % 5);
			i++;
		}
	} 
			
	// creates cadeia's color range array from color.json file
	var colorsRange = [];             
	$.each(colorJSON.cadeias[cad].gradient, function(i, rgb){
		if(i > 1)
			colorsRange.push(rgb);
	});

	//coloração do mapa
	var color = d3.scaleThreshold()
		.domain(dom)
		.range(colorsRange);

	var tooltipInstance = tooltip.getInstance();

	//concatena propriedades
	svg.append("g")
		.attr("class", "states")
		.selectAll("path")
		.data(states.features)
		.enter()
		.append("path")
		// .style('fill', function(d){return color(d.properties.name.replace(/\s+/g, '').length);})
		.style('fill', function(d){return color(dict[d.id].valor);})
		.attr("d", path)
			  
		//mouseover
		.on("mouseover", function(d){
			tooltipInstance.showTooltip(d, [
				["title", d['properties']['name']],
				["Valor", formatNumber(dict[d.id].valor)],
				["Percentual", formatDecimalLimit(dict[d.id].percentual*100, 2) + "%"],
				["Taxa", formatDecimalLimit(dict[d.id].taxa, 2)],
			]);
		})
		.on("mouseout", tooltipInstance.hideTooltip);

	//legenda
	var legend_svg = d3.select("#corpo svg");

	legend_svg.append("g")
		.attr("class", "legendLinear")
		.attr("transform", legendTransform);

	//retira tag <span> do title
	var title_content = textJSON.var[eixo][vrv-1].title;
	var title = title_content.replace("<span>", "");
    var title = title.replace("<br>", "");
	var title = title.replace("</span>", "");

	var legendLinear = d3.legendColor()
		.title(title+" "+ano)
		.labelFormat(d3.format(".0f"))
		.shapeWidth(shapeWidth)
		.shapePadding(5)
		.orient('vertical')
		.scale(color);

	legend_svg.select(".legendLinear").call(legendLinear);

	var legendLabels = $('.legendCells').find('.cell').children('.label');

	$(legendLabels).each(function(i){

		if (i === 0 ){
			$(this).text('Menor que ' + formatDecimalLimit(dom[i]));
		} 
		else if (i === legendLabels.length - 1) {
			$(this).text("Maior que "+formatDecimalLimit(dom[i-1]));
		} 
		else{
			$(this).text("Entre " + formatDecimalLimit(dom[i-1]) + " e " + formatDecimalLimit(dom[i]));
		}
	});
};