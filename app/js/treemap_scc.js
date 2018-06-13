var treemap_scc_box = '#'+VIEWS["treemap_scc"];

/* cria svg */
if($(treemap_scc_box).find("svg").length == 0){
    var svg = d3.select(treemap_scc_box).append("svg");
} else {
    d3.select(treemap_scc_box).select("svg").remove()

    var svg = d3.select(treemap_scc_box).append("svg");
}

svg.attr('width', $(treemap_scc_box).width());
svg.attr('height', $(treemap_scc_box).height());

if(window.parent.innerWidth >= 1199 && window.parent.innerWidth <= 1600){
    svg.attr('height', 324);
}

    
var eixo = parameters.eixo
var vrv  = parameters.var
var cad  = parameters.cad
var slc  = 0

//svg.attr('height','230');

var fonteTransform = "translate("+(width_box(treemap_scc_box)-120)+","+(height_box(treemap_scc_box)+140)+")";
var valoresTransform = "translate(10,"+(height_box(treemap_scc_box)+140)+")";

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

function getSoma(regiaoId) {
    var soma = 0;
    $("rect").each(function() {
        if($(this).attr("data-legend") == regiaoId) {
            if($(this).attr("data-value") != "NaN") soma+=parseFloat($(this).attr("data-value"));
        }
    });
    return soma;
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




// import pt-br.json file for get the title
var textJSON;
textJSON = PT_BR;



var colorJSON;
colorJSON = COLORS;

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
	.size([width_box(treemap_scc_box), height_box(treemap_scc_box)-50])
	.round(true)
    .paddingInner(1);

var config = URL_PARAM

// $.get("./db/json_treemap_scc.php?"+config, function(data) {
    
//      console.log(data);
// });

d3.json("./db/json_treemap_scc.php?"+config, function(error, data) {
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

    if(d3.select(treemap_scc_box).select("svg").select("g").size() == 0){
        var cell = svg.selectAll("g")
				.data(root.leaves())
				.enter().append("g")
				.attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
    } else {
        var cell = svg.selectAll("g")
                    .data(root.leaves())
                    .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })

   }
		cell.on("mouseover", function(d){
                var title_content = getDataVar(textJSON, eixo, vrv).title;
                var title = title_content.replace("<span>", "");
                title = title.replace("<br>", "");
                title = title.replace("</span>", "");

                loadTooltip(d, eixo , vrv);

            })
            .on("mouseout", tooltipInstance.hideTooltip)
            .on("click", function(d) {

                if(window.parent.innerWidth <= 1199)
                    return;

                if(url['ocp'] == 0) {
                                            
                    destacaSetor(d.data.colorId);

                    cad_percent = $('svg').find('rect[data-legend="'+d.data.colorId+'"]').attr("data-percent");
                    cad_valor = $('svg').find('rect[data-legend="'+d.data.colorId+'"]').attr("data-value");
                    cad_percent_uf = ($('svg').find('rect[data-legend="'+d.data.colorId+'"]').attr("data-percent-uf"))
                    percent_deg = 0


                    if(deg !=0){
                        // cad_percent_uf = (d.data.size/d.parent.parent.parent.value)
                        cad_percent_uf = (d.data.size/d.parent.parent.value)
                        percent_deg = (d.data.size/d.parent.parent.parent.value)
                        $(".bread-select[data-id=deg]").find("optgroup[value="+deg+"]").find("option[value="+(d.data.desagreg)+"]").prop('selected', true)//.val(obj+1)
                        $(".bread-select[data-id=cad]").val(d.data.colorId)
                        updateWindowUrl('cad', d.data.colorId)
                        updateWindowUrl('deg', deg)
                        updateWindowUrl('subdeg', d.data.desagreg)

                    }
                    else{
                        $(".bread-select[data-id=cad]").val(d.data.colorId)
                        updateWindowUrl('cad', d.data.colorId)

                    }

                    configInfoDataBoxTreemapSCCClick(eixo, vrv, d, root, deg, cad_valor, cad_percent, cad_percent_uf, percent_deg);
                    if(deg  == 0)
                        $(".cad-title").first().html(d.data.name);
                    // else $(".cad-title").first().html(d.parent.data.name+" - "+d.data.name);
                    else
                        $(".cad-title").first().html(d.parent.data.name);

                }
                else {
                    
                    $("select[data-id='ocp']").val(d.data.colorId);
                    updateWindowUrl('ocp', d.data.colorId);
                    updateWindowUrl('cad', 0);

                    enableDesag(eixo, vrv, d.data.colorId, true, slc, url);
                    destacaSetor(d.data.colorId);

                    cad_valor = d.data.size;

                    if(deg == 0){
                        cad_percent_uf = $('svg').find('rect[data-legend="'+d.data.colorId+'"]').attr("data-percent-uf");
                        cad_percent = $('svg').find('rect[data-legend="'+d.data.colorId+'"]').attr("data-percent")
                    }
                    else{
                        $(".bread-select[data-id=deg]").find("optgroup[value="+deg+"]").find("option[value="+(d.data.desagreg)+"]").prop('selected', true)//.val(obj+1)

                        updateWindowUrl('deg', deg)
                        updateWindowUrl('subdeg', d.data.desagreg)

                        cad_percent = d.data.percentual;
                        cad_percent_uf = getSoma(d.data.colorId);
                    }

                    configInfoDataBoxTreemapSCCOcupation(eixo, vrv, d, root, deg, cad_valor, cad_percent, cad_percent_uf );
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
                        //["", formatTextTaxaVrv((d.data.size / root.value), eixo, vrv)],

                    ]);
                }
                else if (url['uf'] == 0) {
                    tooltipInstance.showTooltip(d, [
                        ["title", d.data.name],
                        ["", formatTextVrv(d.data.size*100, eixo, vrv)],
                        //["", formatTextTaxaVrv((d.data.size / root.value), eixo, vrv)],

                    ]);
                }
            }

            else{
                if (url['uf'] != 0) {

                    tooltipInstance.showTooltip(d, [
                        ["title", d.data.name],
                        ["", formatTextVrv(d.data.size, eixo, vrv)],
                        ["", formatTextTaxaVrv((d.data.size / root.value), eixo, vrv)],
                        //["", formatTextTaxaVrv(d.data.percentual, eixo, vrv)],
                    ]);
                }
                else if (url['uf'] == 0) {

                    tooltipInstance.showTooltip(d, [
                        ["title", d.data.name],
                        ["", formatTextVrv(d.data.size, eixo, vrv)],
                        //["", formatTextTaxaVrv((d.data.size / root.value), eixo, vrv)],
                    ]);
                }
            }
        }

        else if(eixo === 1) {


            if(vrv === 2){
                tooltipInstance.showTooltip(d, [
                    ["title", d.data.name],
                    ["", formatTextVrv(d.data.size*100, eixo, vrv)],
                    ["", formatTextTaxaVrv((d.data.size / root.value), eixo, vrv)],

                ]);
            }
            else if(uf == 0){
                if(deg !== 0) {
                    tooltipInstance.showTooltip(d, [
                        ["title", d.data.name],
                        ["", formatTextVrv(d.data.size, eixo, vrv)],
                        //["", formatDecimalLimit((d.data.size/d.parent.value)*100, 2) + "%"],
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


        else if(eixo === 2){
            if(url['uf'] == 0 || url['var'] == 3){
                tooltipInstance.showTooltip(d, [
                    ["title", d.data.name],
                    ["", formatTextVrv(d.data.size, eixo, vrv)],
                    //["", formatTextTaxaVrv((d.data.size/root.value), eixo, vrv)],

                ]);
            }
            else{
                tooltipInstance.showTooltip(d, [
                    ["title", d.data.name],
                    ["", formatTextVrv(d.data.size, eixo, vrv)],
                    ["", formatTextTaxaVrv((d.data.size/root.value), eixo, vrv)],
                    //["", formatTextTaxaVrv(d.data.percentual, eixo, vrv)],

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
            console.log(cell.selectAll("rect").size())
		    cell.append("rect")
                .attr("data-legend", function(d) { return d.data.colorId; })
                .attr("data-value", function(d) { return (d.value); })
                .attr("data-percent", function(d) { return (d.data.size/root.value); })
                .attr("data-percent-uf", function(d) {  return (d.data.size/root.value); })
                .attr("id", function(d) { return d.data.id; })
                .attr("width", function(d) { return nodeWidth(d); })
                .attr("height", function(d) { return d.y1 - d.y0; })
                .attr("fill", function(d) { return color(d.data.colorId)[8-d.data.desagreg]; });
        }
        else {

            cell.append("rect")
                .attr("data-legend", function(d) { return d.data.colorId; })
                .attr("data-value", function(d) {  return (d.value); })
                .attr("data-percent", function(d) { return (d.parent.value/root.value); })
                .attr("data-percent-uf", function(d) { return (d.data.size/root.value); })
                .attr("data-deg", function(d) { return (d.parent.value); })
                .attr("id-subdeg", function(d) { return d.data.desagreg})
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
    else if(eixo == 2) {

        cell.append("rect")
            .attr("data-legend", function(d) { return d.data.colorId; })
            .attr("data-valor", function(d) { return d.value; })
            .attr("data-valor", function(d) { return d.value; })
            .attr("data-percent-uf", function(d) { return d.data.percentual; })
            .attr("data-percent", function(d) { return d.data.size/root.value; })
            .attr("id", function(d) { return d.data.id; })
            .attr("width", function(d) { return nodeWidth(d); })
            .attr("height", function(d) { return d.y1 - d.y0; })
            .attr("fill", function(d) { return color(d.data.colorId); });
	}
	else {

        if(cell.selectAll("rect").size() == 0){
            var rect_cell = cell.append("rect");
        } else {
            var rect_cell = cell.selectAll("rect");
            rect_cell.exit().remove()
        }
        rect_cell.attr("data-legend", function(d) { return d.data.colorId; })
            .attr("data-value", function(d) { return d.data.percentual; })
            .attr("data-percent", function(d) { return d.data.size/root.value; })
            .attr("id", function(d) { return d.data.id; })
            .attr("width", function(d) { return nodeWidth(d); })
            .attr("height", function(d) { return d.y1 - d.y0; })
            .attr("fill", function(d) { return color(d.data.colorId); });
	}
/*
	cell.append("clipPath")
		.attr("id", function(d) { return "clip-" + d.data.id; })
		.append("use")
		.attr("xlink:href", function(d) { return "#" + d.data.id; });
*/
	
	// new svg margin top value
	var svgMarginTop = 15;
	// cria título
	svg.append("text").append("tspan")
		.data(root.leaves())
		.attr("x", (width_box(treemap_scc_box) / 2))             
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

	if(d3.select(treemap_scc_box).selectAll("text.percentage").size() == 0) {

        var percentageTextElement = cell.append("text")
            .attr("text-anchor", "start")
            .attr("clip-path", function (d) {
                return "url(#clip-" + d.data.id + ")";
            })
            .attr("class", "percentage");


        percentageTextElement.append('tspan')
            .text(function (d) {
                if (eixo == 0) {
                    if (uf) {
                        return formatDecimalLimit((d.data.size / root.value) * 100, 2) + "%";
                    } else if (vrv == 2 || vrv === 9) {
                        if (uf === 0) {
                            return formatDecimalLimit((d.data.size / root.value) * 100, 2) + "%";
                        }
                        else {
                            return ((100 * d.data.size)).toFixed(2) + "%";
                        }
                    } else {
                        return formatDecimalLimit((d.data.size / root.value) * 100, 2) + '%';
                    }
                }
                else if (eixo == 1) {


                    if (deg !== 0) return formatDecimalLimit((d.data.size / root.value) * 100, 2) + "%";
                    else return formatDecimalLimit((d.data.size / root.value) * 100, 2) + "%";
                }
                else if (eixo === 2) {
                    return formatDecimalLimit((d.data.size / root.value) * 100, 2) + "%";
                }
                else if (eixo === 3) {
                    return formatDecimalLimit((d.data.size / root.value) * 100, 2) + "%";
                }
            })
            .attr("display", function (d, i) {
                // se porcentagem for muito pequena e só mostrar 0%, opacity é 0
                if (vrv !== 2) return parseFloat(formatDecimalLimit((d.data.size / root.value) * 100, 2).replace(",", ".")) === 0 ? "none" : "block";
            })
            .attr("font-size", function (d) {
                var nWidth = nodeWidth(d);
                var nodePercentage = Math.round(100 * nWidth / width_box(treemap_scc_box));

                var fontOrdinalSize = d3.scaleThreshold()
                    .domain([12, 25, 30, 40])
                    .range([8, 12, 16, 20]);

                var fontSize = fontOrdinalSize(nodePercentage);

                return fontSize;
            });

    }

	formatTreemapText(treemap_scc_box);

   /*=== controla texto ===*/
	var g = d3.selectAll(treemap_scc_box +" svg g");
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
	
	d3.selectAll('#testDiv').remove();

	// testa e mostra mensagem de valor zerado/indisponível
	var isValueZero = true;
	d3.selectAll(treemap_scc_box+">svg>g")
	.data(root.leaves())
	.attr("display", function(d){
		var size = parseFloat(d.data.size);
		var isSizeZero = size === 0 || size === null || size === undefined;
		if (!isSizeZero && isValueZero)
			isValueZero = false;
	});

	// testa se o valor de size é zero
	if (isValueZero) {
		d3.selectAll(treemap_scc_box+">svg>g")
		.attr("display", "none");

		d3.select(treemap_scc_box+">svg")
			.append("g")
			.attr("class", "no-info")
			.append("text")
			.text("Não há dados sobre essa desagregação")
			.attr("x", d3.select("#corpo>svg").attr("width") / 2)
			.attr("y", d3.select("#corpo>svg").attr("height") / 2)
			.attr("text-anchor", "middle");
	}


    if(eixo == 0){
        
        configInfoDataBoxTreemapSCC(eixo,
            vrv,
            $(treemap_scc_box+' svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-value"),
            $(treemap_scc_box+' svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-percent"),
            $(treemap_scc_box+' svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-percent-uf"),
            url,
            $(treemap_scc_box+' svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-deg"),
            $(treemap_scc_box+' svg').find('rect[data-legend="'+url['ocp']+'"]').attr("data-deg"));
    }
    else if(eixo == 1) {
        if(deg == 1 && subdeg !== 0) {
            svg.selectAll(".swatch").on('mouseover', function(d, i) {
                tooltipInstance.showTooltip(d, [
                    [colorJSON.cadeias[i+1].color, "Micro"],
                    [colorJSON.cadeias[i+1].gradient["6"], "Pequena"],
                    [colorJSON.cadeias[i+1].gradient["5"], "Média"],
                    [colorJSON.cadeias[i+1].gradient["4"], "Grande"]
                ]);
            }).on("mouseout", tooltipInstance.hideTooltip);
        }
        if(deg == 2 && subdeg !== 0) {
            svg.selectAll(".swatch").on('mouseover', function(d, i) {
                tooltipInstance.showTooltip(d, [
                    [colorJSON.cadeias[i+1].color, "Masculino"],
                    [colorJSON.cadeias[i+1].gradient["6"], "Feminino"]
                ]);
            }).on("mouseout", tooltipInstance.hideTooltip);
        }
        if(deg == 3 && subdeg !== 0) {
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
        if(deg == 4 && subdeg !== 0) {
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
        if(deg >= 6 && subdeg !== 0) {
            svg.selectAll(".swatch").on('mouseover', function(d, i) {
                tooltipInstance.showTooltip(d, [
                    [colorJSON.cadeias[i+1].color, "Não"],
                    [colorJSON.cadeias[i+1].gradient["6"], "Sim"]
                ]);
            }).on("mouseout", tooltipInstance.hideTooltip);
        }

        var data_percent_uf = 0;

        if(url['deg'] == 0){
            data_percent_uf =  $(treemap_scc_box+' svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-percent-uf")
        }
        else{
            data_percent_uf = getSoma(url['cad']);
        }

        var cad = 0;



        if(url['ocp'] == 0)
            cad = url['cad'];
        else
        if(url['var'] == 1 || url['var'] == 7)
            cad = parseInt(url['ocp']);
        else
            cad = parseInt(url['cad']);


        configInfoDataBoxTreemapSCC(eixo,
            vrv,
            $(treemap_scc_box+' svg').find('rect[data-legend="'+cad+'"]').attr("data-value"),
            $(treemap_scc_box+' svg').find('rect[data-legend="'+cad+'"]').attr("data-percent"),
            $(treemap_scc_box+' svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-percent-uf"),
            url,
            $(treemap_scc_box+' svg').find('rect[data-legend="'+url['cad']+'"][id-subdeg="'+$(".bread-select[data-id=deg]").val()+'"]').attr("data-percent-uf"),
            $(treemap_scc_box+' svg').find('rect[data-legend="'+cad+'"]').attr("data-deg"));
    }
    else if(eixo == 2){

        configInfoDataBoxTreemapSCC(eixo,
            vrv,
            $(treemap_scc_box+' svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-valor"),
            $(treemap_scc_box+' svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-percent"),
            $(treemap_scc_box+' svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-percent-uf"),
            url,
            $(treemap_scc_box+' svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-deg"),
            $(treemap_scc_box+' svg').find('rect[data-legend="'+url['ocp']+'"]').attr("data-deg"));
    }
	else if(eixo == 3){
        configInfoDataBoxTreemapSCC(eixo,
            vrv,
            $(treemap_scc_box+' svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-valor"),
            $(treemap_scc_box+' svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-percent"),
            $(treemap_scc_box+' svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-percent-uf"),
            url,
            $(treemap_scc_box+' svg').find('rect[data-legend="'+url['cad']+'"]').attr("data-percent"),
            $(treemap_scc_box+' svg').find('rect[data-legend="'+url['ocp']+'"]').attr("data-deg"));
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