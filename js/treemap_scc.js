var windowWidth = $(window).width();

/* cria svg */
var svg = d3.select("#corpo").append("svg");

svg.attr('width',$('.chart').width());
svg.attr('height',230);

svg = d3.select("svg"),
	width = +svg.attr("width"),
	height = +svg.attr("height");

svg.attr('height','230');

var fonteTransform = "translate("+(width-120)+","+(height+140)+")";
var valoresTransform = "translate(10,"+(height+140)+")";

var textLeftPadding = 10; // initial padding left for text
var textTopPadding = 15; // initial padding top for text

var letterTopPadding = 20; // initial padding top for vertical letters

var textTopSubPadding = 13; // padding top for subsequent word lines (line height)

var letterTopSubPadding = 7; // padding top for subsequent letters on vertical position words
var letterLeftSubPadding = 10; // padding left for subsequent letters on vertical position words

function destacaSetor(cadId) {
    $("rect").each(function() {
        if($(this).attr("data-legend") == cadId) {
            $(this).attr("class", "destacado-scc");
            $(this).animate({"opacity": "1"}, "fast");
        }
        else {
            $(this).attr("class", "");
            $(this).animate({"opacity": "0.7"}, "fast");
        }
    });
}

function formatValor(valor) {
    if(parseInt(valor)/1000 < 1000) {
        return (parseInt(valor)/1000).toFixed(0)+"k";
    }
    else if(parseInt(valor)/1000000 < 1000) {
        return (parseInt(valor)/1000000).toFixed(0)+"M";
    }
}

// return node box width
function nodeWidth(d){ return d.x1 - d.x0; }

// return node box height
function nodeHeight(d){ return d.y1 - d.y0; }

/*==================*/
/* ***  cores   *** */
/*==================*/

/* importa arquivo de cores */
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

var fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); },
	format = d3.format(",d");

/* retorna cor do elemento */
var color = function(colorId){
	if(eixo == 1) {
		if(colorJSON.cadeias[colorId]){
            colorJSON.cadeias[colorId].gradient["7"] = colorJSON.cadeias[colorId].color;
            return colorJSON.cadeias[colorId].gradient;
        }else{
            return colorJSON.cadeias[0].gradient;
        }
    }
    else {
        if(colorJSON.cadeias[colorId]){
            return colorJSON.cadeias[colorId].color;
        }else{
            return colorJSON.cadeias[0].color;
        }
	}
}

/*==================*/
/* ***  treemap *** */
/*==================*/
var treemap = d3.treemap()
	.tile(d3.treemapResquarify)
	.size([width, height-50])
	.round(true)
    .paddingInner(1);

var config = "?var="+vrv+"&uf="+uf+"&atc="+atc+"&prt="+prt+"&ocp="+ocp+"&sex="+sex+"&typ="+typ+"&prc="+prc+"&slc="+slc+"&fax="+fax+"&esc="+esc+"&cor="+cor+"&frm="+frm+"&prv="+prv+"&snd="+snd+"&mec="+mec+"&mod="+mod+"&ano="+ano+"&eixo="+eixo;


$.get("./db/json_treemap_scc.php"+config, function(data) {
    // console.log(data);
});

d3.json("./db/json_treemap_scc.php"+config, function(error, data) {
    $('#loading').fadeOut('fast');
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
	if(slc == 0) {
        var colors = {domain: [], range: []};
        $.each(colorJSON.cadeias, function (i, cadeia) {
            if (i > 0) {
                colors.domain.push(cadeia.name);
                colors.range.push(cadeia.color);
            }
        });
    }
    else {
        var colors = {domain: [], range: []};
        $.each(colorJSON.ocupacoes, function (i, ocupacao) {
            if (i > 0) {
                colors.domain.push(ocupacao.name);
                colors.range.push(ocupacao.color);
            }
        });
	}


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
                    var title_content = textJSON.var[eixo][vrv-1].title;
                    var title = title_content.replace("<span>", "");
                    title = title.replace("<br>", "");
                    title = title.replace("</span>", "");

                    if(eixo === 1){

                        if(uf == 0){
                            if(deg !== 0) {
                                tooltipInstance.showTooltip(d, [
                                    ["title", d.data.name],
                                    ["", formatTextVrv(d.data.size, eixo, vrv)],
                                    ["", formatDecimalLimit((d.data.size/d.parent.value)*100, 2) + "%"],
                                ]);
                            }
                            else {
                                tooltipInstance.showTooltip(d, [
                                    ["title", d.data.name],
                                    ["", formatTextVrv(d.data.size, eixo, vrv)],
                                    ["", formatDecimalLimit((d.data.size/root.value)*100, 2) + "%"],

                                ]);

                            }
                        }
                        else{
                            if(deg !== 0) {
                                tooltipInstance.showTooltip(d, [
                                    ["title", d.data.name],
                                    ["", formatTextVrv(d.data.size, eixo, vrv)],
                                    ["", formatDecimalLimit((d.data.size/d.parent.value)*100, 2) + "%"],
                                    ["", formatTextTaxaVrv(d.data.percentual, eixo, vrv)],
                                ]);
                            }
                            else {
                                tooltipInstance.showTooltip(d, [
                                    ["title", d.data.name],
                                    ["", formatTextVrv(d.data.size, eixo, vrv)],
                                    ["", formatDecimalLimit((d.data.size/root.value)*100, 2) + "%"],
                                    ["", formatTextTaxaVrv(d.data.percentual, eixo, vrv)],

                                ]);

                            }
                        }

					}
					else if(eixo === 0 || eixo === 2 || eixo === 3){
					    loadTooltip(d, eixo , vrv);
                    }
				})
				.on("mouseout", tooltipInstance.hideTooltip)
				.on("click", function(d) {
                    
				    if(url['ocp'] == 0) {
                        var newMapaSrc = $(window.parent.document).find("#view_box").attr("src").replace(/cad=[0-9]*/, "cad=" + d.data.colorId);
                        newMapaSrc = newMapaSrc.replace(/uf=[0-9]*/, "uf=" + url['uf']);
                        newMapaSrc = newMapaSrc.replace(/prc=[0-9]*/, "prc=" + url['prc']);
                        var newBarraSrc = $(window.parent.document).find("#view_box_barras").attr("src").replace(/cad=[0-9]*/, "cad=" + d.data.colorId);
                        newBarraSrc = newBarraSrc.replace(/ano=[0-9]*/, "ano=" + url['ano']);
                        $(window.parent.document).find("#view_box").attr("src", newMapaSrc);
                        $(window.parent.document).find("#view_box_barras").attr("src", newBarraSrc);
                        $(window.parent.document).find("select[data-id='cad']").val(d.data.colorId);
                        enableDesag(eixo, vrv, d.data.colorId, true, slc, url);
                        destacaSetor(d.data.colorId);

                        cad_valor = $('svg').find('rect[data-legend="'+d.data.colorId+'"]').attr("data-value");
                        cad_percent = $('svg').find('rect[data-legend="'+d.data.colorId+'"]').attr("data-percent");


                        configInfoDataBoxTreemapSCCClick(eixo, vrv, d, root, deg, cad_valor, cad_percent);
                        if(deg  == 0) $(window.parent.document).find(".cad-title").first().html(d.data.name);
                        // else $(window.parent.document).find(".cad-title").first().html(d.parent.data.name+" - "+d.data.name);
                        else $(window.parent.document).find(".cad-title").first().html(d.parent.data.name);
				    }
                    else {

                        var newMapaSrc = $(window.parent.document).find("#view_box").attr("src").replace(/ocp=[0-9]*/, "ocp=" + d.data.colorId);
                        newMapaSrc = newMapaSrc.replace(/uf=[0-9]*/, "uf=" + url['uf']);
                        var newBarraSrc = $(window.parent.document).find("#view_box_barras").attr("src").replace(/ocp=[0-9]*/, "ocp=" + d.data.colorId);
                        newBarraSrc = newBarraSrc.replace(/ano=[0-9]*/, "ano=" + url['ano']);
                        $(window.parent.document).find("#view_box").attr("src", newMapaSrc);
                        $(window.parent.document).find("#view_box_barras").attr("src", newBarraSrc);
                        $(window.parent.document).find("select[data-id='ocp']").val(d.data.colorId);
                        enableDesag(eixo, vrv, d.data.colorId, true, slc, url);
                        destacaSetor(d.data.colorId);
                        
                        configInfoDataBoxTreemapSCCOcupation(eixo, vrv, d, root, deg);
                        //console.log(d);
                        // if(d.parent.data.name.match("Atividades")) $(window.parent.document).find(".cad-title").first().html("Atividades Relacioandas - "+d.data.name);
                        // else if(d.parent.data.name.match("Cultura")) $(window.parent.document).find(".cad-title").first().html("Cultura - "+d.data.name);
                    }
				})
		        .style("cursor", "pointer");

	function loadTooltip(d, eixo, vrv){

        if(eixo === 0) {
            if(vrv === 2 || vrv === 9){
                if (url['uf'] != 0) {
                    tooltipInstance.showTooltip(d, [
                        ["title", d.data.name],
                        ["", formatTextVrv(d.data.size, eixo, vrv)],
                        ["", formatTextTaxaVrv((d.data.size / root.value), eixo, vrv)],

                    ]);
                }
                else if (url['uf'] == 0) {
                    tooltipInstance.showTooltip(d, [
                        ["title", d.data.name],
                        ["", formatTextVrv(d.data.size*100, eixo, vrv)],
                        ["", formatTextTaxaVrv((d.data.size / root.value), eixo, vrv)],

                    ]);
                }
            }

            else{
                if (url['uf'] != 0) {

                    tooltipInstance.showTooltip(d, [
                        ["title", d.data.name],
                        ["", formatTextVrv(d.data.size, eixo, vrv)],
                        ["", formatTextTaxaVrv((d.data.size / root.value), eixo, vrv)],
                        ["", formatTextTaxaVrv(d.data.percentual, eixo, vrv)],
                    ]);
                }
                else if (url['uf'] == 0) {

                    tooltipInstance.showTooltip(d, [
                        ["title", d.data.name],
                        ["", formatTextVrv(d.data.size, eixo, vrv)],
                        ["", formatTextTaxaVrv((d.data.size / root.value), eixo, vrv)],
                    ]);
                }
            }
        }


        else if(eixo === 2){
            if(url['uf'] == 0 || url['var'] == 3){
                tooltipInstance.showTooltip(d, [
                    ["title", d.data.name],
                    ["", formatTextVrv(d.data.size, eixo, vrv)],
                    ["", formatTextTaxaVrv((d.data.size/root.value), eixo, vrv)],

                ]);
            }
            else{
                tooltipInstance.showTooltip(d, [
                    ["title", d.data.name],
                    ["", formatTextVrv(d.data.size, eixo, vrv)],
                    ["", formatTextTaxaVrv((d.data.size/root.value), eixo, vrv)],
                    ["", formatTextTaxaVrv(d.data.percentual, eixo, vrv)],

                ]);
            }

        }

        else if(eixo === 3){
            if (url['uf'] != 0 && (vrv === 1 || vrv === 2)){
                tooltipInstance.showTooltip(d, [
                    ["title", d.data.name],
                    ["", formatTextVrv(d.data.size, eixo, vrv)],
                    ["", formatTextTaxaVrv((d.data.size/root.value), eixo, vrv)],
                    ["", formatTextTaxaVrv(d.data.percentual, eixo, vrv)],

                ]);
            }
            else if (url['uf'] == 0 && (vrv === 1 || vrv === 2)){
                tooltipInstance.showTooltip(d, [
                    ["title", d.data.name],
                    ["", formatTextVrv(d.data.size, eixo, vrv)],
                    ["", formatTextTaxaVrv((d.data.size/root.value), eixo, vrv)],

                ]);
            }
            else if(vrv === 99 && url['uf'] == 0){
                tooltipInstance.showTooltip(d, [
                    ["title", d.data.name],
                    ["", formatTextVrv(d.data.size, eixo, vrv)],
                    ["", formatTextTaxaVrv((d.data.size/root.value), eixo, vrv)],

                ]);
            }
        }

    }

	if(eixo == 1) {
		if(deg == 0) {
		    cell.append("rect")
                .attr("data-legend", function(d) { return d.data.colorId; })
                .attr("data-value", function(d) { return (d.data.size/root.value); })
                .attr("id", function(d) { return d.data.id; })
                .attr("width", function(d) { return nodeWidth(d); })
                .attr("height", function(d) { return d.y1 - d.y0; })
                .attr("fill", function(d) { return color(d.data.colorId)[8-d.data.desagreg]; });
        }
        else {
            cell.append("rect")
                .attr("data-legend", function(d) { return d.data.colorId; })
                .attr("data-value", function(d) { return (d.parent.value/root.value); })
                .attr("data-deg", function(d) { return (d.parent.value); })
                .attr("id", function(d) { return d.data.id; })
                .attr("width", function(d) { return nodeWidth(d); })
                .attr("height", function(d) { return d.y1 - d.y0; })
                .attr("fill", function(d) { return color(d.data.colorId)[8-d.data.desagreg]; });
        }
    }
    else if(eixo == 3){
        cell.append("rect")
            .attr("data-legend", function(d) { return d.data.colorId; })
            .attr("data-value", function(d) { return (d.data.size/root.value); })
            .attr("data-percent", function(d) { return (d.data.percentual); })
            .attr("id", function(d) { return d.data.id; })
            .attr("width", function(d) { return nodeWidth(d); })
            .attr("height", function(d) { return d.y1 - d.y0; })
            .attr("fill", function(d) { return color(d.data.colorId); });
    }
    else {
        cell.append("rect")
            .attr("data-legend", function(d) {  return d.data.colorId; })
            .attr("data-value", function(d) { return d.data.percentual; })
            .attr("data-percent", function(d) { return d.data.size/root.value; })
            .attr("id", function(d) { return d.data.id; })
            .attr("width", function(d) { return nodeWidth(d); })
            .attr("height", function(d) { return d.y1 - d.y0; })
            .attr("fill", function(d) { return color(d.data.colorId); });
	}

	cell.append("clipPath")
		.attr("id", function(d) { return "clip-" + d.data.id; })
		.append("use")
		.attr("xlink:href", function(d) { return "#" + d.data.id; });

	
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
		.text("");

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
		.text(function(d) {
			if(eixo == 0) {
				if(uf) {
				    return formatDecimalLimit((d.data.size/root.value)*100,2)+"%";
                } else if(vrv == 2 || vrv === 9) {
				    if(uf === 0) {
				        return formatDecimalLimit((d.data.size/root.value)*100,2)+"%";
                    }
                    else {
                        return ((100*d.data.size)).toFixed(2)+"%";
                    }
				} else {
				    return formatDecimalLimit((d.data.size/root.value)*100,2) + '%';
                }
            }
            else if(eixo == 1) {
                if(deg !== 0) return formatDecimalLimit((d.data.size/d.parent.value)*100,2)+"%";
                else return formatDecimalLimit((d.data.size/root.value)*100,2)+"%";
			}
            else if(eixo === 2){
                return formatDecimalLimit((d.data.size/root.value)*100,2)+"%";
            }
            else if(eixo === 3){
                return formatDecimalLimit((d.data.size/root.value)*100,2)+"%";
            }
		})
		.attr("display", function(d, i) {			
			// se porcentagem for muito pequena e só mostrar 0%, opacity é 0
			if(vrv !== 2) return parseFloat(formatDecimalLimit((d.data.size/root.value)*100, 2).replace(",", ".")) === 0? "none" : "block";
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

	formatTreemapText();

   /*=== controla texto ===*/
	var g = d3.selectAll("#corpo svg g");
	g.each(function(d){
		var that = d3.select(this);

		// creates a top margin for title positioning
		var transformValues = that.attr("transform").split("(")[1].replace(/\)/g, "").split(",");
		var xVal = parseFloat(transformValues[0]),
			yVal = parseFloat(transformValues[1]);	

		that.attr("transform", "translate(" + xVal + "," + (yVal + svgMarginTop) + ")");
		
    });
    
	

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

	/*svg.append("g")
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
*/
	d3.selectAll('#testDiv').remove();

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

	if(eixo === 1) {
        if(prt !== 0) {
        	svg.selectAll(".swatch").on('mouseover', function(d, i) {
                tooltipInstance.showTooltip(d, [
                    [colorJSON.cadeias[i+1].color, "Micro"],
                    [colorJSON.cadeias[i+1].gradient["6"], "Pequena"],
                    [colorJSON.cadeias[i+1].gradient["5"], "Média"],
                    [colorJSON.cadeias[i+1].gradient["4"], "Grande"]
                ]);
            }).on("mouseout", tooltipInstance.hideTooltip);
        }
        if(sex !== 0) {
            svg.selectAll(".swatch").on('mouseover', function(d, i) {
                tooltipInstance.showTooltip(d, [
                    [colorJSON.cadeias[i+1].color, "Masculino"],
                    [colorJSON.cadeias[i+1].gradient["6"], "Feminino"]
                ]);
            }).on("mouseout", tooltipInstance.hideTooltip);
        }
        if(fax !== 0) {
            svg.selectAll(".swatch").on('mouseover', function(d, i) {
                tooltipInstance.showTooltip(d, [
                    [colorJSON.cadeias[i+1].color, "10 a 17"],
                    [colorJSON.cadeias[i+1].gradient["6"], "18 a 29"],
                    [colorJSON.cadeias[i+1].gradient["5"], "30 a 49"],
                    [colorJSON.cadeias[i+1].gradient["4"], "50 a 64"],
                    [colorJSON.cadeias[i+1].gradient["3"], "65 ou mais"],
                    [colorJSON.cadeias[i+1].gradient["2"], "Não classificado"]
                ]);
            }).on("mouseout", tooltipInstance.hideTooltip);
        }
        if(esc !== 0) {
            svg.selectAll(".swatch").on('mouseover', function(d, i) {
                tooltipInstance.showTooltip(d, [
                    [colorJSON.cadeias[i+1].color, "Sem Instrução"],
                    [colorJSON.cadeias[i+1].gradient["6"], "Fundamental Incompleto"],
                    [colorJSON.cadeias[i+1].gradient["5"], "Fundamental Completo"],
                    [colorJSON.cadeias[i+1].gradient["4"], "Médio Completo"],
                    [colorJSON.cadeias[i+1].gradient["3"], "Superior Inompleto"],
                    [colorJSON.cadeias[i+1].gradient["2"], "Superior Completo"],
                    [colorJSON.cadeias[i+1].gradient["1"], "Não determinado"]
                ]);
            }).on("mouseout", tooltipInstance.hideTooltip);;
        }
        if(frm !== 0 || snd !== 0 || prv !== 0) {
            svg.selectAll(".swatch").on('mouseover', function(d, i) {
                tooltipInstance.showTooltip(d, [
                    [colorJSON.cadeias[i+1].color, "Não"],
                    [colorJSON.cadeias[i+1].gradient["6"], "Sim"]
                ]);
            }).on("mouseout", tooltipInstance.hideTooltip);
        }
	}
    else if(eixo === 0){
        
        configInfoDataBoxTreemapSCC(eixo,
            vrv,
            $('svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-value"),
            $('svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-percent"),
            url,
            $('svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-deg"),
            $('svg').find('rect[data-legend="'+url['ocp']+'"]').attr("data-deg"),
            chg);
    }

	else if(eixo == 3){
        configInfoDataBoxTreemapSCC(eixo,
            vrv,
            $('svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-value"),
            $('svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-percent"),
            url,
            $('svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-percent"),
            $('svg').find('rect[data-legend="'+url['ocp']+'"]').attr("data-deg"),
            chg);
    }
    else{
        configInfoDataBoxTreemapSCC(eixo,
            vrv,
            $('svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-value"),
            $('svg').find('rect[data-legend="'+url['ocp']+'"]').attr("data-value"),
            url,
            $('svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-deg"),
            $('svg').find('rect[data-legend="'+url['ocp']+'"]').attr("data-deg"),
            chg);
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
	if(value === match){
		args.unshift(value);
		console.log.apply(console, args);
	}
}