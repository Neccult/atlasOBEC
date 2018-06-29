var svg_treemap_region;
var root_region;
var treemap_region;
var cell_region;

function create_treemap_region(treemap_box, data){

    console.log(data)

    /* cria svg */
    svg_treemap_region = d3.select(treemap_box).append("svg");
    svg_treemap_region.attr('width', $(treemap_box).width());
    svg_treemap_region.attr('height', $(treemap_box).height());

    var vrv = parameters.var;
    var cad = parameters.cad;


    svg_treemap_region = d3.select("svg");
	width = svg_treemap_region.attr("width"),
    height = svg_treemap_region.attr("height");
    
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

    treemap_region = d3.treemap()
                    .tile(d3.treemapResquarify)
                    .size([width, height])
                    .round(true)
                    .paddingInner(1);

    var totais = brasil_setor;

    var attachColor = function(d){ return (d.depth == 3)? d.data.colorId = d.parent.parent.data.colorId : ''; };

    var tooltipInstance = tooltip.getInstance();

    root_region = d3.hierarchy(data)
				.eachBefore(function(d) {
					attachColor(d);
					d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
				})
				.sum(sumBySize)
				.sort(function(a, b) { return b.height - a.height || b.value - a.value; });

    treemap_region(root_region);
    
    var integerValue = 0;
    var percentValue = 0;
    
    cell_region = svg_treemap_region.selectAll("g")
				.data(root_region.leaves())
				.enter().append("g")
                .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })
                .style("cursor", "pointer");

    cell_region.append("rect")
        .attr("data-legend", function(d) { return ufId(d.data.name); })
        .attr("data-integer", function(d) { return d.data.size; })
        .attr("data-percent", function(d) { return d.data.size/root_region.value; })
        .attr("id", function(d) { return d.data.id; })
        .attr("width", function(d) { return d.x1 - d.x0; })
        .attr("height", function(d) { return d.y1 - d.y0; })
        .attr("fill", function(d){
            return color(d.data.colorId);
        });

    cell_region.append("clipPath")
        .attr("id", function(d) { return "clip-" + d.data.id; })
        .append("use")
        .attr("xlink:href", function(d) { return "#" + d.data.id; });


    cell_region
        .on("mouseover", function(d){
            loadTooltip(d, tooltipInstance)
        })
        .on("click", function(d) {
            treemapRegionClick(d, root_region);
        })
        .style("cursor", "pointer");

	var titleTextElement = cell_region.append("text")
		.text(function(d) {return d.data.name; })
		.attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
		.attr("class", "title")
		.attr("x", 10)
		.attr("y", 19)
		.attr("text-anchor", "start");

	var percentageTextElement = cell_region.append("text")
		.attr("text-anchor", "start")
		.attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
		.attr("class", "percentage");
                    
    percentageTextElement.append('tspan')
		.text(function(d) {
			if(parameters.eixo == 0){
                if(cad && vrv != 2) {
                    return formatDecimalLimit((d.data.size/root_region.value)*100, 2)+"%";
                }
                else if(vrv === 2) {
                    return formatDecimalLimit(d.data.size, 3) + '%';
                }
                else if(vrv == 9) {
                    return formatDecimalLimit((d.data.size/root_region.value)*100, 2)+"%";
				}
				else if(vrv == 1){
					return formatDecimalLimit((d.data.size/totais[parameters.ano])*100, 2) + '%';
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
        .data(root_region.leaves())
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

    formatTreemapText(treemap_box);

}

function update_treemap_region(treemap_box, data){
    var vrv = parameters.var;
    var cad = parameters.cad;


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

    var totais = brasil_setor;

    var attachColor = function(d){ return (d.depth == 3)? d.data.colorId = d.parent.parent.data.colorId : ''; };

    root_region = d3.hierarchy(data)
        .eachBefore(function(d) {
            attachColor(d);
            d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
        })
        .sum(sumBySize)
        .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

    treemap_region(root_region);

    cell_region.data(root_region.leaves())
        .transition().duration(500)
        .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; })

    cell_region.select("rect")
        .attr("width", function(d) { return d.x1 - d.x0; })
        .attr("height", function(d) { return d.y1 - d.y0; })

    var tooltipInstance = tooltip.getInstance();

    cell_region
        .on("mouseover", function(d){
            loadTooltip(d, tooltipInstance)
        })
        .on("click", function(d) {
            treemapRegionClick(d, root_region);
        })
        .on("mouseout", tooltipInstance.hideTooltip)
        .style("cursor", "pointer");



    var percentageTextElement = cell_region.select(".percentage").select('tspan')
        .style("opacity", 0)

    var titleTextElement = cell_region.select("text")
        .style("opacity", 0)



    setTimeout(function () {


        titleTextElement = cell_region.select("text")
            .text(function(d) {return d.data.name; })
            .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
            .attr("class", "title")
            .attr("x", 10)
            .attr("y", 19)
            .attr("text-anchor", "start")
            .style("opacity", 1);


        percentageTextElement
            .text(function(d) {
                if(parameters.eixo == 0){
                    if(cad && vrv != 2) {
                        return formatDecimalLimit((d.data.size/root_region.value)*100, 2)+"%";
                    }
                    else if(vrv === 2) {
                        return formatDecimalLimit(d.data.size, 3) + '%';
                    }
                    else if(vrv == 9) {
                        return formatDecimalLimit((d.data.size/root_region.value)*100, 2)+"%";
                    }
                    else if(vrv == 1){
                        return formatDecimalLimit((d.data.size/totais[parameters.ano])*100, 2) + '%';
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
            })
            .transition()
            .duration(800)
            .style("opacity", 1);

        formatTreemapText(treemap_box);



    }, 750);



    var isValueZero = true;
    svg_treemap_region.selectAll("g")
        .data(root_region.leaves())
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

        svg_treemap_region.select("g")
            .attr("class", "no-info")
            .select("text")
            .text("Não há dados sobre essa desagregação")
            .attr("x", width / 2)
            .attr("y", height / 2)
            .attr("text-anchor", "middle");
    }

    /*if(url['uf'] !== 0){
        destacaPais(url['uf'])
    }*/

    formatTreemapText(treemap_box);


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

function treemapRegionClick(d, root_region){
    updateWindowUrl('uf', ufId(d.data.name));
    updateIframe()
}

function treemapRegionMouseover(d){
    console.log("salve")
}

function loadTooltip(d, tooltipInstance){

    var intergerValue = 0;
    var percentValue = 0;

    var title_content = getDataVar(PT_BR, parameters.eixo, parameters.var).title;
    var title = title_content.replace("<span>", "");
    title = title.replace("<br>", "");
    title = title.replace("</span>", "");
    if(parameters.var === 2) {
        integerValue = d.data.size;
        tooltipInstance.showTooltip(d, [
            ["title", d.data.name],
            ["", formatTextVrv(d.data.size, parameters.eixo, parameters.var)]
        ]);
    }
    else if(parameters.var === 4 || parameters.var === 5 || parameters.var === 6 || parameters.var === 7 || parameters.var === 8) {
        if(cad !== 0) {

            integerValue = d.data.size;
            percentValue = d.data.size/root.value;
            tooltipInstance.showTooltip(d, [
                ["title", d.data.name],
                ["", formatTextVrv(d.data.size, parameters.eixo, parameters.var)],
                ["", formatDecimalLimit((d.data.size/root.value)*100, 2) + "%"],
            ]);
        }
        else {
            integerValue = d.data.size;
            percentValue = d.data.size/root.value;
            tooltipInstance.showTooltip(d, [
                ["title", d.data.name],
                ["", formatTextVrv(d.data.size, parameters.eixo, parameters.var)],
                ["", formatDecimalLimit(d.data.percentual*100, 2) + "%"],
            ]);
        }
    }
    else if(parameters.var == 1){
        tooltipInstance.showTooltip(d, [
            ["title", d.data.name],
            ["", formatTextVrv(d.data.size, parameters.eixo, parameters.var)],
            ["", formatDecimalLimit(d.data.size/brasil_setor[parameters.ano]*100, 2) + "%"]
        ]);
    }
    else{
        if(cad !== 0) {
            integerValue = d.data.size;
            percentValue = d.data.size/root.value;
            tooltipInstance.showTooltip(d, [
                ["title", d.data.name],
                ["", formatTextVrv(d.data.size, parameters.eixo, parameters.var)],
                ["", formatDecimalLimit((d.data.size/root.value)*100, 2) + "%"]
            ]);
        }
        else {
            integerValue = d.data.size;
            percentValue = d.data.size/root.value;
            tooltipInstance.showTooltip(d, [
                ["title", d.data.name],
                ["", formatTextVrv(d.data.size, parameters.eixo, parameters.var)],
                ["", formatDecimalLimit(d.data.percentual*100, 2) + "%"]
            ]);
        }
    }
}