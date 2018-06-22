function create_treemap_region(treemap_box, data){
    var width = $(treemap_box).width(); /* dimensão da tela */
    var height = $(treemap_box).height();
    /* cria svg */
    var svg_treemap_region = d3.select(treemap_box).append("svg");

    var vrv = parameters.var;
    var cad = parameters.cad;
    /*=== dimensões do gráfico ===*/
    if(width>768){
        svg_treemap_region.attr('width',width);
        svg_treemap_region.attr('height', height/1.5);
        svg_treemap_region.style('padding-bottom',"30px");
    }
    else{
        svg_treemap_region.attr('width', width-20);
        svg_treemap_region.attr('height', height);
    }

    svg_treemap_region = d3.select("svg");
	width = svg_treemap_region.attr("width"),
    height = svg_treemap_region.attr("height");
    
    var fonteTransform = "translate("+(width-120)+","+(height+100)+")";
    var valoresTransform = "translate(10,"+(height+100)+")";

    var textLeftPadding = 10; // initial padding left for text
    var textTopPadding = 15; // initial padding top for text

    var letterTopPadding = 20; // initial padding top for vertical letters

    var textTopSubPadding = 13; // padding top for subsequent word lines (line height)

    var letterTopSubPadding = 7; // padding top for subsequent letters on vertical position words
    var letterLeftSubPadding = 10; // padding left for subsequent letters on vertical position words

    var fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); },
	color = d3.scaleOrdinal(d3.schemeCategory20.map(fader)),
	format = d3.format(",d");

    var color = function(colorId){
        if(parameters.eixo == 3) {
            if(COLORS.parceiros[colorId]){
                return COLORS.parceiros[colorId].color;
            }else{
                return COLORS.parceiros[0].color;
            }
        }
        else {
            if(COLORS.regioes[colorId]){
                return COLORS.regioes[colorId].color;
            }else{
                return COLORS.regioes[0].color;
            }
        }
    }

    var treemap = d3.treemap()
                    .tile(d3.treemapResquarify)
                    .size([width, height])
                    .round(true)
                    .paddingInner(1);

    var totais = brasil_setor;

    var attachColor = function(d){ return (d.depth == 3)? d.data.colorId = d.parent.parent.data.colorId : ''; };

	var root = d3.hierarchy(data)
				.eachBefore(function(d) {
					attachColor(d);
					d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
				})
				.sum(sumBySize)
				.sort(function(a, b) { return b.height - a.height || b.value - a.value; });

    treemap(root);
    
    var integerValue = 0;
    var percentValue = 0;
    
    var cell = svg_treemap_region.selectAll("g")
				.data(root.leaves())
				.enter().append("g")
                .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
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
			if(parameters.eixo == 0){
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
			else if(parameters.eixo == 2){
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
        
    var isValueZero = true;
	svg_treemap_region.selectAll("g")
        .data(root.leaves())
        .attr("display", function(d){
            var size = parseFloat(d.data.size);
            var isSizeZero = size === 0 || size === null || size === undefined;
            if (!isSizeZero && isValueZero)
                isValueZero = false;
        });

	// testa se o valor de size é zero
	if (isValueZero) {
		svg_treemap_region.selectAll("g")
		.attr("display", "none");

		svg_treemap_region.append("g")
			.attr("class", "no-info")
			.append("text")
			.text("Não há dados sobre essa desagregação")
			.attr("x", width / 2)
			.attr("y", height / 2)
			.attr("text-anchor", "middle");
	}

	/*if(url['uf'] !== 0){
        destacaPais(url['uf'])
    }*/

}

function update_treemap_region(treemap_box, data){
    var width = $(treemap_box).width(); /* dimensão da tela */
    var height = $(treemap_box).height();

    var fader = function(color) { return d3.interpolateRgb(color, "#fff")(0.2); },
	color = d3.scaleOrdinal(d3.schemeCategory20.map(fader)),
	format = d3.format(",d");

    var color = function(colorId){
        if(parameters.eixo == 3) {
            if(COLORS.parceiros[colorId]){
                return COLORS.parceiros[colorId].color;
            }else{
                return COLORS.parceiros[0].color;
            }
        }
        else {
            if(COLORS.regioes[colorId]){
                return COLORS.regioes[colorId].color;
            }else{
                return COLORS.regioes[0].color;
            }
        }
    }

    var treemap = d3.treemap()
                    .tile(d3.treemapResquarify)
                    .size([width, height])
                    .round(true)
                    .paddingInner(1);

    var totais = brasil_setor;

    var attachColor = function(d){ return (d.depth == 3)? d.data.colorId = d.parent.parent.data.colorId : ''; };

	var root = d3.hierarchy(data)
				.eachBefore(function(d) {
					attachColor(d);
					d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
				})
				.sum(sumBySize)
				.sort(function(a, b) { return b.height - a.height || b.value - a.value; });

    treemap(root);

    var svg_treemap_region = d3.select(treemap_box+" svg");

    var cell = svg_treemap_region.selectAll("g")
                                .data(root.leaves())
                                .append("g");

    cell.exit().remove();
    
    cell.enter().append("g")
                .attr("x", function(d, i){
                    return x(dados.key[i]);
                }).append("g")
                .style("cursor", "pointer")
                .attr("transform", function(d) { 
                    return "translate(" + d.x0 + "," + d.y0 + ")"; 
                })
                .append("rect")
    
    cell = svg_treemap_region.selectAll("g")
                            .data(root.leaves())
                            .attr("transform", function(d) { 
                                return "translate(" + d.x0 + "," + d.y0 + ")"; 
                            });

    cell.attr("data-legend", function(d) {
            return ufId(d.data.name); 
        })
        .attr("data-integer", function(d) { 
            return d.data.size; 
        })
        .attr("data-percent", function(d) { 
            return d.data.size/root.value; 
        })
        .attr("id", function(d) { 
            return d.data.id; 
        })
        .attr("width", function(d) { 
            return d.x1 - d.x0; 
        })
        .attr("height", function(d) {
            return d.y1 - d.y0; 
        })
        .attr("fill", function(d){
            return color(d.data.colorId);
        });

}

function nodeWidth(d){ return d.x1 - d.x0; }

// return node box height
function nodeHeight(d){ return d.y1 - d.y0; }

function formatValor(valor) {
	if(parseInt(valor)/1000 < 1000) {
		return (parseInt(valor)/1000).toFixed(0)+"k";
	}
	else if(parseInt(valor)/1000000 < 1000) {
        return (parseInt(valor)/1000000).toFixed(0)+"M";
	}
}

function sumBySize(d) {
	return d.size;
}

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