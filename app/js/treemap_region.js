var windowWidth = $(window).width(); /* dimensão da tela */

/* cria svg */
var svg = d3.select("#corpo").append("svg");
/*=== dimensões do gráfico ===*/
if(windowWidth>768){
	$('#corpo').find('svg').attr('width',$('.chart').width());
	$('#corpo').find('svg').attr('height',($('.chart').height()/1.5));
    $('#corpo').find('svg').css('padding-bottom',"30px");
}
else{
	$('#corpo').find('svg').attr('width',$('.chart').width()-20);
	$('#corpo').find('svg').attr('height',$('.chart').height()/1.5);
}

svg = d3.select("svg");
	width = svg.attr("width"),
	height = svg.attr("height");


var fonteTransform = "translate("+(width-120)+","+(height+100)+")";
var valoresTransform = "translate(10,"+(height+100)+")";

var textLeftPadding = 10; // initial padding left for text
var textTopPadding = 15; // initial padding top for text

var letterTopPadding = 20; // initial padding top for vertical letters

var textTopSubPadding = 13; // padding top for subsequent word lines (line height)

var letterTopSubPadding = 7; // padding top for subsequent letters on vertical position words
var letterLeftSubPadding = 10; // padding left for subsequent letters on vertical position words


function ufId(uf) {
	switch(uf) {
		case "RO":
			return 11;
        case "AC":
            return 12;
        case "AM":
            return 13;
        case "RR":
            return 14;
        case "PA":
            return 15;
        case "AP":
            return 16;
        case "TO":
            return 17;
        case "MA":
            return 21;
        case "PI":
            return 22;
        case "CE":
            return 23;
        case "RN":
            return 24;
        case "PB":
            return 25;
        case "PE":
            return 26;
        case "AL":
            return 27;
        case "SE":
            return 28;
        case "BA":
            return 29;
        case "MG":
            return 31;
        case "ES":
            return 32;
        case "RJ":
            return 33;
        case "SP":
            return 35;
        case "PR":
            return 41;
        case "SC":
            return 42;
        case "RS":
            return 43;
        case "MS":
            return 50;
        case "MT":
            return 51;
        case "GO":
            return 52;
        case "DF":
            return 53;
	}
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

// import pt-br.json file for get the title
var textJSON;
d3.json('data/pt-br.json', function(error, data) {
    if(error) throw error;

    textJSON = data;
});

var fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); },
	color = d3.scaleOrdinal(d3.schemeCategory20.map(fader)),
	format = d3.format(",d");

/* retorna cor do elemento */
var color = function(colorId){
	if(eixo == 3) {
        if(colorJSON.parceiros[colorId]){
            return colorJSON.parceiros[colorId].color;
        }else{
            return colorJSON.parceiros[0].color;
        }
	}
    else {
		if(colorJSON.regioes[colorId]){
            return colorJSON.regioes[colorId].color;
        }else{
            return colorJSON.regioes[0].color;
        }
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
    var config = "?var="+vrv+"&atc="+atc+"&uos=0&cad="+cad+"&prt="+prt+"&ocp="+ocp+"&sex="+sex+"&fax="+fax+"&esc="+esc+"&cor="+cor+"&frm="+frm+"&prv="+prv+"&snd="+snd+"&ano="+ano+"&eixo="+eixo;
}
else {
	var config = "?var="+vrv+"&atc="+atc+"&cad="+cad+"&prt="+prt+"&typ="+typ+"&prc="+prc+"&ocp="+ocp+"&mec="+mec+"&mod="+mod+"&pfj="+pfj+"&ano="+ano+"&eixo="+eixo;
}

var totais = []
$.get('./db/total_setor.php' + "?var=" + vrv+"&cad="+cad+"&eixo="+eixo+"&prt="+prt, function(dado){
	totais = JSON.parse(dado)
})

d3.json("./db/json_treemap_region.php"+config, function(error, data) {
    $('#loading').fadeOut('fast');
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

    function destacaPais(ufId) {
        svg.selectAll("rect").each(function(d) {
            if($(this).attr("data-legend") == ufId) {
                if($(this).attr("class") !== "destacado-scc") {
                    $(this).attr("class", "destacado-scc");
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

	var tooltipInstance = tooltip.getInstance();
	var integerValue = 0;
	var percentValue = 0;
	var cell = svg.selectAll("g")
				.data(root.leaves())
				.enter().append("g")
					.attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
					.on("mouseover", function(d){
                        var title_content = getDataVar(textJSON, eixo, vrv).title;
                        var title = title_content.replace("<span>", "");
                        title = title.replace("<br>", "");
                        title = title.replace("</span>", "");
						if(vrv === 2) {
                            integerValue = d.data.size;
							tooltipInstance.showTooltip(d, [
                                ["title", d.data.name],
                                ["", formatTextVrv(d.data.size, eixo, vrv)]
                            ]);
                        }
                        else if(vrv === 4 || vrv === 5 || vrv === 6 || vrv === 7 || vrv === 8) {
                            if(cad !== 0) {

                                integerValue = d.data.size;
                                percentValue = d.data.size/root.value;
                            	tooltipInstance.showTooltip(d, [
                                    ["title", d.data.name],
	                                ["", formatTextVrv(d.data.size, eixo, vrv)],
                                    ["", formatDecimalLimit((d.data.size/root.value)*100, 2) + "%"],
                                ]);
                            }
                            else {
                                integerValue = d.data.size;
                                percentValue = d.data.size/root.value;
                                tooltipInstance.showTooltip(d, [
                                    ["title", d.data.name],
	                                ["", formatTextVrv(d.data.size, eixo, vrv)],
                                    ["", formatDecimalLimit(d.data.percentual*100, 2) + "%"],
                                ]);
							}
						}
						else if(vrv == 1){
							tooltipInstance.showTooltip(d, [
								["title", d.data.name],
								["", formatTextVrv(d.data.size, eixo, vrv)],
								["", formatDecimalLimit(d.data.size/totais[ano]*100, 2) + "%"]
							]);
						}
                        else{
                            if(cad !== 0) {
                                integerValue = d.data.size;
                                percentValue = d.data.size/root.value;
                            	tooltipInstance.showTooltip(d, [
                                    ["title", d.data.name],
	                                ["", formatTextVrv(d.data.size, eixo, vrv)],
                                    ["", formatDecimalLimit((d.data.size/root.value)*100, 2) + "%"]
                                ]);
                            }
                            else {
                                integerValue = d.data.size;
                                percentValue = d.data.size/root.value;
                                tooltipInstance.showTooltip(d, [
                                    ["title", d.data.name],
	                                ["", formatTextVrv(d.data.size, eixo, vrv)],
                                    ["", formatDecimalLimit(d.data.percentual*100, 2) + "%"]
                                ]);
							}
						}
					})
					.on("mouseout", tooltipInstance.hideTooltip)
					.on("click", function(d) {

                        if(window.parent.innerWidth <= 800)
                            return;

						var newBarraSrc = $(window.parent.document).find("#view_box_barras").attr("src").replace(/uf=[0-9]*/, "uf="+ufId(d.data.name));
                        newBarraSrc = newBarraSrc.replace(/ano=[0-9]*/, "ano="+url['ano']);
                        var newSCCSrc = $(window.parent.document).find("#view_box_scc").attr("src").replace(/uf=[0-9]*/, "uf="+ufId(d.data.name));
                        newSCCSrc = newSCCSrc.replace(/cad=[0-9]*/, "cad="+url['cad']);
                        var newMAPASrc = $(window.parent.document).find("#view_box").attr("src").replace(/uf=[0-9]*/, "uf="+ufId(d.data.name));
						newMAPASrc = newMAPASrc.replace(/cad=[0-9]*/, "cad="+url['cad']);
						$(window.parent.document).find('.bread-select[data-id=uf]').val(ufId(d.data.name))
						
						$(window.parent.document).find("#view_box_barras").attr("src", newBarraSrc);
						$(window.parent.document).find("#view_box_scc").attr("src", newSCCSrc);
						$(window.parent.document).find("#view_box").attr("src", newMAPASrc);
						destacaPais(ufId(d.data.name));
						//setIntegerValueData({valor: integerValue}, eixo, vrv);
						// if(url['cad'] == 0)
						// 	setPercentValueData({percentual: percentValue}, eixo, vrv);
						setStateTitle(d.data.estado);


                    })
					.style("cursor", "pointer");

	cell.append("rect")
		.attr("data-legend", function(d) { return ufId(d.data.name); })
        .attr("data-integer", function(d) { return d.data.size; })
        .attr("data-percent", function(d) { return d.data.size/root.value; })
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
		.text(function(d) {
			if(eixo == 0){
                if(cad && vrv != 2) {
                    return formatDecimalLimit((d.data.size/root.value)*100, 2)+"%";
                }
                else if(vrv === 2) {
                    return formatDecimalLimit(d.data.size, 3) + '%';
                }
                else if(vrv == 9) {
                    return formatDecimalLimit((d.data.size/root.value)*100, 2)+"%";
				}
				else if(vrv == 1){
					return formatDecimalLimit((d.data.size/totais[ano])*100, 2) + '%';
				}
                else {
                    return formatDecimalLimit(d.data.percentual*100, 2) + '%';
                }
			}
			else if(eixo == 2){
                if(vrv === 7) {
                    return formatDecimalLimit(d.data.size, 3);
                }
			}

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
	$('#corpo').find('svg').attr('height',$('#corpo').find('svg').height()+100);

	// new svg margin top value
	var svgMarginTop = 35;
	// cria título


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

	//$('#corpo').find('svg').attr('height',$('.chart').height() + 70);

	// creates cadeia's color range array from color.json file
	var colors = { domain: [], range: [] };
	if(eixo == 3) {
        $.each(colorJSON.parceiros, function(i, parceiro){
            if (i>0) {
                colors.domain.push(parceiro.name);
                colors.range.push(parceiro.color);
            }
        });
    }
    else {
		$.each(colorJSON.regioes, function(i, regiao){
            if (i>0) {
                colors.domain.push(regiao.name);
                colors.range.push(regiao.color);
            }
        });
    }

	//  legends
	var ordinal = d3.scaleOrdinal()
	.domain(colors.domain)
	.range(colors.range);

	svg.append("g")
		.attr("class", "legendOrdinal")
		.attr("transform", "translate(1," + (265) + ")");

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

    if(url['uf'] == 0) $(window.parent.document).find(".state-title").first().html("Brasil");

	if(url['uf'] !== 0){
        destacaPais(url['uf'])
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
