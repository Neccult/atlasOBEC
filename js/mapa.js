// Mapa JS //
/*=== tamanho do mapa ===*/
var windowWidth = window.parent.outerWidth;
var legendaWidth = window.parent.outerWidth;
	width = $('.chart').width();
	height = width/1.2;

var shapeWidth = 30;

    corpo = '#corpo'

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

	var svg = d3.select(corpo).append("svg")
	        	.attr("width", width)
		        .attr("height", height);
    // console.log(d3.select(corpo));
	/* configura projeção */
	var projection = d3.geoMercator()
		//.center([-50, -30])
		.rotate([4.4, 0])
		.scale(400)
		.translate([width/2, height/1.2]);

	var legendTransform = "translate(565,350)";
	var shapeWidth = 80;
}
else if(windowWidth>=1550) {
    /* cria svg */
     var height = 350;
    var svg = d3.select(corpo).append("svg")
        .attr("width", width)
        .attr("height", height);

    /* configura projeção */
    var projection = d3.geoMercator()
        //.center([-50, -28])
        .rotate([4.4, 0])
        .scale(400)
        .translate([width/2, height/1.2]);

    var legendTransform = "translate(565,350)";
    var shapeWidth = 80;
}
else if(windowWidth>=1280) {
    /* cria svg */
     var height = 350;
    var svg = d3.select(corpo).append("svg")
        .attr("width", width)
        .attr("height", height*1.5);

    /* configura projeção */
    var projection = d3.geoMercator()
       // .center([-50, -20])
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
     var svg = d3.select(corpo).append("svg")
         .attr("width", width)
         .attr("height", height*1.5);

     /* configura projeção */
     var projection = d3.geoMercator()
        // .center([-50, -20])
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
     var height = 350;
	//cria svg
	var svg = d3.select(corpo).append("svg")
		.attr("width", width)
		.attr("height", height);

	//configura projeção
	var projection = d3.geoMercator()
		//.center([-40, -32])
		.rotate([4.4, 0])
		.scale(400)
		.translate([width / 2, height / 1.2]);

	 var fonteTransform = "translate("+(width-360)+","+(height-80)+")";
	 var valoresTransform = "translate(70,"+(height-80)+")";
	var translateX = width-150;
	var legendTransform = "translate("+translateX+",110)";
}
else if(windowWidth>=800){
     var height = 350;
     //cria svg
     var svg = d3.select(corpo).append("svg")
         .attr("width", width)
         .attr("height", height);

     //configura projeção
     var projection = d3.geoMercator()
         //.center([-40, -28])
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

     var height = 350;

	//cria svg
	var svg = d3.select(corpo).append("svg")
		.attr("width", width)
		.attr("height", height);

	//configura projeção
	var projection = d3.geoMercator()
		//.center([-40, -28])
		.rotate([4.4, 0])
		.scale(400)
		.translate([width / 2, height / 1.2]);

     var fonteTransform = "translate("+(width-320)+","+(height-30)+")";
     var valoresTransform = "translate(120,"+(height-30)+")";
	var legendTransform = "translate(500,110)";
}
 /**** tablet portrait! ****/
 else if(windowWidth>=620){

     var height = 350;

     //cria svg
     var svg = d3.select(corpo).append("svg")
         .attr("width", width)
         .attr("height", height);

     //configura projeção
     var projection = d3.geoMercator()
         //.center([-40, -27])
         .rotate([4.4, 0])
         .scale(400)
         .translate([width / 2, height / 1.2]);

     var fonteTransform = "translate("+(width-260)+","+(height-20)+")";
     var valoresTransform = "translate(120,"+(height-20)+")";
     var legendTransform = "translate(500,110)";
 }
 /**** tablet portrait! ****/
 else if(windowWidth>=100){

     var height = 350;

     //cria svg
     var svg = d3.select(corpo).append("svg")
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

	var height = 350;
	var shapeWidth = 20;

	//cria svg
	var svg = d3.select(corpo).append("svg")
		.attr("width", width)
		.attr("height", height);

	//configura projeção
	var projection = d3.geoMercator()
		//.center([-50, -28])
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

var config = "?var="+vrv+"&atc="+atc+"&cad="+cad+"&prt="+prt+"&ocp="+ocp+"&mec="+mec+"&typ="+typ+"&prc="+prc+"&pfj="+pfj+"&mod="+mod+"&ano="+ano+"&eixo="+eixo+"&mundo="+mundo+"&slc="+slc;

$.get("./db/json_mapa.php"+config, function(data) {
    
});
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

        info.push(mapa[key]);
		return dict[mapa[key].id] = {id:mapa[key].id, uf:mapa[key].uf, valor:mapa[key].valor, ano:mapa[key].ano, percentual:mapa[key].percentual, taxa:mapa[key].taxa};

	});


	//carrega estados JSON
	var states = topojson.feature(br_states, br_states.objects.states);
    projection.fitExtent([[0,0],[width, 350*0.8]], states)//.fitSize([width, height-100], states)

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


   // console.log(dict)


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

		    loadTooltip(d, eixo, vrv)
		})
		.on("mouseout", tooltipInstance.hideTooltip)
		.on("click", function(d) {
			var newBarraSrc = $(window.parent.document).find("#view_box_barras").attr("src").replace(/uf=[0-9]*/, "uf="+d.id);
            newBarraSrc = newBarraSrc.replace(/ano=[0-9]*/, "ano="+url['ano']);
            var newSCCSrc = $(window.parent.document).find("#view_box_scc").attr("src").replace(/uf=[0-9]*/, "uf="+d.id);
            newSCCSrc = newSCCSrc.replace(/cad=[0-9]*/, "cad="+url['cad']);
			$(window.parent.document).find("#view_box_barras").attr("src", newBarraSrc);
            $(window.parent.document).find("#view_box_scc").attr("src", newSCCSrc);
            $(window.parent.document).find("select[data-id='uf']").val(d.id);
            destacaPais(d.id);

            setIntegerValueData(dict[d.id], eixo, vrv);
            setPercentValueData(dict[d.id], eixo, vrv);

            setStateTitle(d['properties']['name']);

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
    

/********* LEGENDA DO MAPA *********/


var low_color = color(minValue);
var high_color = color(maxValue);

var x_barra = svg.attr("width")*0.3;

var y_barra = 350*0.85;
var max_barra = maxValue;
var min_barra = minValue;
var height_barra = 350*0.03;
var width_barra = width*0.4;
var prefix = ""
var fontColor = "#aaa"

if(y_barra + height_barra + $("svg").offset().top > 350){
    y_barra = 350 - 23 - $("svg").offset().top - height_barra;
}


gradient = svg.append("defs")
                    .append("linearGradient")
                    .attr("id", "grad")
                    .attr("x1", "0%")
                    .attr("y1", "100%")
                    .attr("x2", "90%")
                    .attr("y2", "100%")

    gradient.append("stop")
            .attr("offset", "0%")
            .style("stop-color", low_color)
            .style("stop-opacity", 1);

    gradient.append("stop")
            .attr("offset", "90%")
            .style("stop-color", high_color)
            .style("stop-opacity", 1);

    svg.append("g")
       .append("rect")
       .attr("x", x_barra)
       .attr("y", y_barra)
       .attr("height", height_barra)
       .attr("width", width_barra)
       .attr("rx", height/150)
       .attr("ry", height/150)
       .style("fill", "url(#grad)")
       .style("stroke-width", 1)
       .style("stroke", fontColor);

    svg.selectAll("line")
       .data([min_barra, String((parseFloat(min_barra)+parseFloat(max_barra))/2), max_barra])
       .enter()
       .append("line")
       .attr("x1", function(d,i){
           var position = x_barra+i*width_barra/2;

           texto = svg.append("text")
                        .attr("id", "legenda"+i)
                        .attr("x", position)
                        .attr("y", y_barra+height_barra +12)
                        .attr("fill", fontColor);

            formatBarTextMap(d, eixo, vrv, texto)

           return position;
        })
       .attr("x2", function(d,i){return x_barra+i*width_barra/2})
       .attr("y1", y_barra-2)
       .attr("y2", y_barra+height_barra+2)
       .style("stroke", fontColor)
       .style("stroke-width", 1)
/************************ */



	$(window.parent.document).find('.value-info-title').html(textJSON.var[eixo][vrv-1].mapa_valores);
    $(window.parent.document).find('.font-title').html("Fonte(s): "+textJSON.var[eixo][vrv-1].fontes);

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
        setIntegerValueData(dict[url['uf']], eixo, vrv);
	}


	if(url['cad'] != 0 && url['uf'] != 0) {
        setIntegerValueData(dict[url['uf']], eixo, vrv);
        setPercentValueData(dict[url['uf']], eixo, vrv);
	}

    if(url['uf'] == 0) $(window.parent.document).find(".state-title").first().html("Brasil");
    $(window.parent.document).find(".integer-value").first().find(".description-number").html(textJSON.var[eixo][vrv-1].desc_int);
    $(window.parent.document).find(".percent-value").first().find(".description-number").html(textJSON.var[eixo][vrv-1].desc_percent);


    function loadTooltip(d, eixo, vrv){

        if(eixo == 0) {
            if(vrv === 2) {
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor, eixo, vrv)]
                ]);
            }
            else if(vrv === 3) {
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor, eixo, vrv)],
                ]);
            }
            else if(vrv === 9) {
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor, eixo, vrv)]
                ]);

            }
            else if(vrv === 4 || vrv === 5 || vrv === 6 || vrv === 7 || vrv === 8) {
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor, eixo, vrv)],
                    ["", formatDecimalLimit(dict[d.id].percentual*100, 2) + "%"],
                ]);

            }
            else {
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor, eixo, vrv)],
                    ["", formatDecimalLimit(dict[d.id].percentual*100, 2) + "%"],
                    ["", formatDecimalLimit(dict[d.id].taxa, 2)],
                ]);
            }
        }
        else if(eixo == 1){

            //tooltips com os 3 valores na interface (valor, percentual e taxa)
            if(vrv === 1  || vrv === 5 || vrv === 7 || vrv === 8){
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor, eixo, vrv)],
                    ["", formatTextTaxaVrv(dict[d.id].percentual, eixo, vrv)],
                    ["", formatTextTaxaVrv(dict[d.id].taxa, eixo, vrv)],

                ]);
            }
            ///Tooltips com só o valor na interface
            else if(vrv === 2 || vrv === 9){
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor, eixo, vrv)]
                ]);
            }
            //tooltips com 2 valores na interface (valor e taxa)
            else if(vrv === 6 || vrv === 4 ){
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor, eixo, vrv)],
                    ["", formatTextTaxaVrv(dict[d.id].taxa, eixo, vrv)],

                ]);
            }
            else if(vrv === 10 || vrv === 11) {
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor, eixo, vrv)],
                    ["", formatTextTaxaVrv(dict[d.id].taxa, eixo, vrv)],
                ]);
            }
        }
        else if(eixo == 2){

            //tooltips com os 3 valores na interface (valor, percentual e taxa)
            if(vrv === 1  || vrv === 2 || vrv === 3 || vrv === 4 ||  vrv === 5 || vrv === 6 || vrv === 7 || vrv === 8 || vrv === 9 || vrv === 11 || vrv === 12 || vrv === 13){
                console.log(dict[d.id])
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor, eixo, vrv)],
                    ["", formatTextTaxaVrv(dict[d.id].percentual, eixo, vrv)],

                ]);

            }
            else if(vrv === 14){
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor, eixo, vrv)],
                ]);

            }

        }
        else if(eixo == 3){
            //tooltips com os 3 valores na interface (valor, percentual e taxa)
            if(vrv === 1){
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor, eixo, vrv)],
                    ["", formatTextTaxaVrv(dict[d.id].percentual, eixo, vrv)],
                ]);
            }
            else if(vrv === 99){
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor, eixo, vrv)],
                ]);

            }

        }
    }
    
};


