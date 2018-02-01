// Mapa JS //
/*=== tamanho do mapa ===*/
var windowWidth = window.parent.outerWidth;
var legendaWidth = window.parent.outerWidth;
	width = $('.chart').width();
	height = width/1.2;

var shapeWidth = 30;


var fonteTransform = "translate("+(width-120)+","+(height-10)+")";
var valoresTransform = "translate(10,"+(height-10)+")";

function destacaPais(ufId) {
	$("path").each(function() {
        if($(this).attr("data-legend") == ufId) {
            if($(this).attr("class") !== "destacado") {
                $(this).attr("class", "destacado");
                $(this).attr("data-color", $(this).css("fill"));
                $(this).css("fill", "#6DBFC9");
                $(this).animate({"opacity": "1"}, "fast");
            }
        }
        else {
            $(this).attr("class", "");
            if($(this).attr("data-color") != undefined) $(this).css("fill", $(this).attr("data-color"));
            $(this).animate({"opacity": "0.7"}, "fast");
        }
	});
}

 /**** desktop! ****/
 if(windowWidth>=1700){
  
	/* cria svg */
	var svg = d3.select("#corpo").append("svg")
		.attr("width", width)
		.attr("height", height);
   
	/* configura projeção */
	var projection = d3.geoMercator()
		.center([-50, -28])
		.rotate([4.4, 0])               
		.scale(455)
		.translate([width/2, height/1.2]);  

	var legendTransform = "translate(565,350)";
	var shapeWidth = 80;
}
else if(windowWidth>=1550) {
    /* cria svg */
    var svg = d3.select("#corpo").append("svg")
        .attr("width", width)
        .attr("height", height);

    /* configura projeção */
    var projection = d3.geoMercator()
        .center([-50, -28])
        .rotate([4.4, 0])
        .scale(400)
        .translate([width/2, height/1.2]);

    var legendTransform = "translate(565,350)";
    var shapeWidth = 80;
}
else if(windowWidth>=1280) {
    /* cria svg */
    var svg = d3.select("#corpo").append("svg")
        .attr("width", width)
        .attr("height", height*1.5);

    /* configura projeção */
    var projection = d3.geoMercator()
        .center([-50, -20])
        .rotate([4.4, 0])
        .scale(380)
        .translate([width/2, height/1.2]);
     var fonteTransform = "translate("+(width-60)+","+(height+30)+")";
     var valoresTransform = "translate(10,"+(height+30)+")";
    var legendTransform = "translate(565,350)";
    var shapeWidth = 80;
}
 else if(windowWidth>=1200) {
     /* cria svg */
     var svg = d3.select("#corpo").append("svg")
         .attr("width", width)
         .attr("height", height*1.5);

     /* configura projeção */
     var projection = d3.geoMercator()
         .center([-50, -20])
         .rotate([4.4, 0])
         .scale(350)
         .translate([width/2, height/1.2]);

     var fonteTransform = "translate("+(width-60)+","+(height+30)+")";
     var valoresTransform = "translate(10,"+(height+30)+")";
     var legendTransform = "translate(565,350)";
     var shapeWidth = 80;
 }
/**** tablet landscape! ****/
else if(windowWidth>=1000){
     var height = width/2.5;
	//cria svg
	var svg = d3.select("#corpo").append("svg")
		.attr("width", width)
		.attr("height", height);
   
	//configura projeção
	var projection = d3.geoMercator()
		.center([-40, -32])
		.rotate([4.4, 0])               
		.scale(400)                     
		.translate([width / 2, height / 1.2]);

	 var fonteTransform = "translate("+(width-360)+","+(height-80)+")";
	 var valoresTransform = "translate(70,"+(height-80)+")";
	var translateX = width-150;
	var legendTransform = "translate("+translateX+",110)";
}
else if(windowWidth>=800){
     var height = width/2.2;
     //cria svg
     var svg = d3.select("#corpo").append("svg")
         .attr("width", width)
         .attr("height", height);

     //configura projeção
     var projection = d3.geoMercator()
         .center([-40, -28])
         .rotate([4.4, 0])
         .scale(400)
         .translate([width / 2, height / 1.2]);

     var fonteTransform = "translate("+(width-300)+","+(height-20)+")";
     var valoresTransform = "translate(70,"+(height-20)+")";
     var translateX = width-150;
     var legendTransform = "translate("+translateX+",110)";
 }
/**** tablet portrait! ****/
else if(windowWidth>=700){

	var height = width/2;

	//cria svg
	var svg = d3.select("#corpo").append("svg")
		.attr("width", width)
		.attr("height", height);
   
	//configura projeção
	var projection = d3.geoMercator()
		.center([-40, -28])
		.rotate([4.4, 0])               
		.scale(400)                     
		.translate([width / 2, height / 1.2]);

     var fonteTransform = "translate("+(width-320)+","+(height-30)+")";
     var valoresTransform = "translate(120,"+(height-30)+")";
	var legendTransform = "translate(500,110)";
}
 /**** tablet portrait! ****/
 else if(windowWidth>=620){

     var height = width/1.8;

     //cria svg
     var svg = d3.select("#corpo").append("svg")
         .attr("width", width)
         .attr("height", height);

     //configura projeção
     var projection = d3.geoMercator()
         .center([-40, -27])
         .rotate([4.4, 0])
         .scale(400)
         .translate([width / 2, height / 1.2]);

     var fonteTransform = "translate("+(width-260)+","+(height-20)+")";
     var valoresTransform = "translate(120,"+(height-20)+")";
     var legendTransform = "translate(500,110)";
 }
 /**** tablet portrait! ****/
 else if(windowWidth>=100){

     var height = 290;

     //cria svg
     var svg = d3.select("#corpo").append("svg")
         .attr("width", width)
         .attr("height", height);

     //configura projeção
     var projection = d3.geoMercator()
         .center([-46, -28])
         .rotate([4.4, 0])
         .scale(300)
         .translate([width / 2, height / 1.2]);

     var fonteTransform = "translate("+(width-90)+","+(height-20)+")";
     var valoresTransform = "translate(120,"+(height-20)+")";
     var legendTransform = "translate(500,110)";
 }
/**** mobile! ****/
else{  

	var height = 290;
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

var config = "?var="+vrv+"&atc="+atc+"&cad="+cad+"&prt="+prt+"&ocp="+ocp+"&mec="+mec+"&typ="+typ+"&prc="+prc+"&pfj="+pfj+"&ano="+ano+"&eixo="+eixo;
// console.log(config);

//pre-load arquivos
d3.queue()
	.defer(d3.json, "./data/br-min.json")
	.defer(d3.json, "./db/json_mapa.php"+config)
	.await(ready);

//leitura
function ready(error, br_states, mapa){
    $('#loading').fadeOut('fast');
	if (error) return console.error(error);

	//variaveis informacao
	var dict = {};
	var info = [];

	Object.keys(mapa).forEach(function(key) {

		// console.log(key, mapa[key]);
		info.push(mapa[key]);
		return dict[mapa[key].id] = {id:mapa[key].id, uf:mapa[key].uf, valor:mapa[key].valor, ano:mapa[key].ano, percentual:mapa[key].percentual, taxa:mapa[key].taxa};

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
	var quant = 5;
	var range = maxValue - minValue; 
	var amp = minValue < 1 && minValue > -1 ? range / quant : Math.round(range / quant);

	//domino de valores para as cores do mapa
	var dom = [
				(minValue+(amp/4)),
				(minValue+amp),
				(minValue+(2*amp)),
				(minValue+(3*amp)),
				(minValue+(4*amp))
			];

	//ajuste do dominio
	var i = 0;
	if(amp > 1){
		while(i<=5){
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
    //retira tag <span> do title
    var title_content = textJSON.var[eixo][vrv-1].title;
    var title = title_content.replace("<span>", "");
    title = title.replace("<br>", "");
    title = title.replace("</span>", "");
	//concatena propriedades
	svg.append("g")
		.attr("class", "states")
		.selectAll("path")
		.data(states.features)
		.enter()
		.append("path")
		.attr("data-legend",function(d) { return d.id; })
		// .style('fill', function(d){return color(d.properties.name.replace(/\s+/g, '').length);})
		.style('fill', function(d){return color(dict[d.id].valor);})
		.attr("d", path)
			  
		//mouseover
		.on("mouseover", function(d){
			if(vrv === 2 || vrv === 3 || vrv === 9) {
				tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatDecimalLimit(100*dict[d.id].valor, 2)+"%"],
                ]);
            }
            else if(vrv === 4 || vrv === 5 || vrv === 6 || vrv === 7 || vrv === 8) {
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatDecimalLimit(dict[d.id].valor, 2)],
                    ["", formatDecimalLimit(dict[d.id].percentual*100, 2) + "%"],
                ]);

			}
            else {
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatDecimalLimit(dict[d.id].valor, 2)],
                    ["", formatDecimalLimit(dict[d.id].percentual*100, 2) + "%"],
                    ["", formatDecimalLimit(dict[d.id].taxa, 2)],
                ]);
			}
		})
		.on("mouseout", tooltipInstance.hideTooltip)
		.on("click", function(d) {
			var newBarraSrc = $(window.parent.document).find("#view_box_barras").attr("src").replace(/uf=[0-9]*/, "uf="+d.id);
            newBarraSrc = newBarraSrc.replace(/ano=[0-9]*/, "ano="+url['ano']);
            var newSCCSrc = $(window.parent.document).find("#view_box_scc").attr("src").replace(/uf=[0-9]*/, "uf="+d.id);
            newSCCSrc = newSCCSrc.replace(/cad=[0-9]*/, "cad="+url['cad']);
			$(window.parent.document).find("#view_box_barras").attr("src", newBarraSrc);
            $(window.parent.document).find("#view_box_scc").attr("src", newSCCSrc);
            destacaPais(d.id);
            setIntegerValueData(dict[d.id], eixo, vrv);
            setPercentValueData(dict[d.id], eixo, vrv);
            $(window.parent.document).find(".state-title").first().html(d['properties']['name']);
		})
		.style("cursor", "pointer");

	//legenda
	var legend_svg = d3.select("#corpo svg");

	legend_svg.append("g")
		.attr("class", "legendLinear")
		.attr("transform", legendTransform);

	var title_aux;
	if(atc == 0) title_aux = title+" - "+textJSON.select.prt[prt].name;
	if(atc != 0) title_aux = title+" - "+textJSON.select.atc[atc].name;

	var legendLinear = d3.legendColor()
		.title(title_aux+" - "+ano)
		.labelFormat(d3.format(".0f"))
		.shapeWidth(shapeWidth)
		.shapePadding(5)
		.orient('vertical')
		.scale(color);

    var legendLinear1 = d3.legendColor()
        .title(function(d) {
        	if(cad === 0) {
        		return "Setores Culturais Criativos";
            }
            else {
                return textJSON.select.cad[cad].name;
			}
        })
        .labelFormat(d3.format(".0f"))
        .shapeWidth(shapeWidth)
        .shapePadding(10)
        .orient('vertical')
        .scale(color);


    legend_svg.append("g")
        .attr("class", "fonte")
        .attr("transform", fonteTransform)
		.append("text").text("Fonte(s): "+textJSON.var[eixo][vrv-1].fontes);

    legend_svg.append("g")
        .attr("class", "valores")
        .attr("transform", valoresTransform)
        .append("text").text(textJSON.var[eixo][vrv-1].mapa_valores);
    /*if(legendaWidth > 768) {
        legend_svg.select(".legendLinear").call(legendLinear);
        legend_svg.select(".legendCells").call(legendLinear1);

        var legendLabels = $('.legendCells').find('.cell').children('.label');

        $('.legendCells').find('.cell').each(function (i) {
            $(this).attr("transform", "translate(0, " + (20 * (i) + 10) + ")");
        });

        $(legendLabels).each(function (i) {
            if (i === 0) {
                $(this).text('Menor que ' + formatDecimalLimit(dom[i]));
            }
            else if (i === legendLabels.length - 1) {
                $(this).text("Maior que " + formatDecimalLimit(dom[i - 1]));
            }
            else {
                $(this).text("Entre " + formatDecimalLimit(dom[i - 1]) + " e " + formatDecimalLimit(dom[i]));
            }
        });
    }
    else {
    	var count = 0;
    	d3.select(".legendLinear").append("text").text(title_aux+" - "+ano)
            .style("font-size","9px")
            .style("font-weight", "600");
    	d3.select(".legendLinear").append("text").text(function(d) {
            if(cad === 0) {
                return "Setores Culturais Criativos";
            }
            else {
                return textJSON.select.cad[cad].name;
            }
        }).attr("transform", "translate(0, 10)")
            .style("font-size","8px")
            .style("font-weight", "600");
    	var ufs_legend = [];
    	$.each(dict, function(index, value) {
			ufs_legend.push({'uf': this.uf, 'valor': this.valor});
		});
        ufs_legend.sort(function(a,b) {
            return a.uf < b.uf ? -1 : a.uf > b.uf ? 1 : 0;
        });
    	ufs_legend.forEach(function(d) {
            d3.select(".legendLinear").append("text")
                .attr("class","legend")
                .attr("transform","translate(0,0)")
                .style("font-size","7px")
                .text(d.uf+": "+d.valor)
                .attr("transform", "translate(0, " + (10 * (count) + 20) + ")");
            count++;
		});
	}*/
    if(url['uf'] != 0) {
    	destacaPais(url['uf']);
    	setPercentValueData(dict[url['uf']], eixo, vrv);
	}

	if(url['cad'] != 0 && url['uf'] != 0) {
        setIntegerValueData(dict[url['uf']], eixo, vrv);
        setPercentValueData(dict[url['uf']], eixo, vrv);
	}

    if(url['uf'] == 0) $(window.parent.document).find(".state-title").first().html("Brasil");
    $(window.parent.document).find(".integer-value").first().find(".description-number").html(textJSON.var[eixo][vrv-1].desc_int);
    $(window.parent.document).find(".percent-value").first().find(".description-number").html(textJSON.var[eixo][vrv-1].desc_percent);
};
