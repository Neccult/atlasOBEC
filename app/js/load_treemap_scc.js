var treemap;
var root;
var cell;
var svg;

function create_treemap_scc(treemap_scc_box, data){


    svg = d3.select(treemap_scc_box).append("svg");

    svg.attr('width', $(treemap_scc_box).width());
    svg.attr('height', $(treemap_scc_box).height());

    treemap = d3.treemap()
        .tile(d3.treemapResquarify)
        .size([$(treemap_scc_box).width(), $(treemap_scc_box).height()-50])
        .round(true)
        .paddingInner(1);

    var attachColor = function(d){
        return (d.depth == 3) ? d.data.colorId = d.parent.parent.data.colorId : '';
    };

    root = d3.hierarchy(data)
        .eachBefore(function(d) {
            attachColor(d);
            d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
        })
        .sum(sumBySize)
        .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

    treemap(root);

    var colors = {domain: [], range: []};

    $.each(COLORS.cadeias, function (i, cadeia) {
        if (i > 0) {
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

    cell = svg.selectAll("g")
        .data(root.leaves())
        .enter().append("g")
        .attr("transform", function(d) { return "translate(" + d.x0 + "," + d.y0 + ")"; });

    cell.on("mouseover", function(d){
        loadTooltipSCC(d, parameters.eixo , parameters.var, tooltipInstance);
    })
        .on("mouseout", tooltipInstance.hideTooltip)
        .on("click", function(d) {

            if(window.parent.innerWidth <= 1199)
                return;

            treemapClick(treemap_scc_box, d, root);
        })
        .style("cursor", "pointer");


    var rect = cell.append("rect")
        .attr("id", function(d) { return d.data.id; })
        .attr("data-legend", function(d) { return d.data.colorId; })
        .attr("width", function(d) { return nodeWidth(d); })
        .attr("height", function(d) { return d.y1 - d.y0; })
        .attr("fill", function(d) { return color(d.data.colorId); })

    if(parameters.eixo == 0) {

        rect
            .attr("data-value", function(d) { return (d.value); })
            .attr("data-percent", function(d) { return (d.data.size/root.value); })
            .attr("data-percent-uf", function(d) {  return (d.data.size/root.value); })
    }
    else if(parameters.eixo == 1) {
        if(parameters.deg == 0) {
            rect
                .attr("data-value", function(d) { return (d.value); })
                .attr("data-percent", function(d) { return (d.data.size/root.value); })
                .attr("data-percent-uf", function(d) {  return (d.data.size/root.value); })
        }
        else {
            rect
                .attr("data-value", function(d) {  return (d.value); })
                .attr("data-percent", function(d) { return (d.parent.value/root.value); })
                .attr("data-percent-uf", function(d) { return (d.data.size/root.value); })
                .attr("data-deg", function(d) { return (d.parent.value); })
                .attr("id-subdeg", function(d) { return d.data.desagreg})
        }
    }
    else if(parameters.eixo == 2) {
        rect
            .attr("data-valor", function(d) { return d.value; })
            .attr("data-percent-uf", function(d) { return d.data.percentual; })
            .attr("data-percent", function(d) { return d.data.size/root.value; })
    }
    else if(parameters.eixo == 3) {
        rect
            .attr("data-value", function(d) { return (d.data.size/root.value); })
            .attr("data-percent", function(d) { return (d.data.percentual); })
    }


    var titleTextElement = cell.append("text")
        .text(function(d) {return d.data.name; })
        .attr("class", "title")
        .attr("x", 10)
        .attr("y", 19)
        .attr("text-anchor", "start");

    var svgMarginTop = 15;

    var percentageTextElement = cell.append("text")
        .attr("text-anchor", "start")
        .attr("class", "percentage");

    percentageTextElement.append('tspan')
        .text(function (d) {

            var divisao = d.data.size / root.value;
            if (uf) {
                return formatDecimalLimit((divisao) * 100, 2) + "%";
            } 
            else if (parameters.var == 2 || parameters.var === 9) {
                if (uf === 0) {
                    return formatDecimalLimit((divisao) * 100, 2) + "%";
                }
                else {
                    return ((100 * d.data.size)).toFixed(2) + "%";
                }
            } 
            else {
                return formatDecimalLimit((divisao) * 100, 2) + '%';
            }
        })
        .attr("display", function (d, i) {
            // se porcentagem for muito pequena e só mostrar 0%, opacity é 0
            if (parameters.var !== 2) {
                return parseFloat(formatDecimalLimit((d.data.size / root.value) * 100, 2).replace(",", ".")) === 0 ? "none" : "block";
            }
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

    formatTreemapText(treemap_scc_box);

    /*=== controla texto ===*/
    var g = d3.selectAll(treemap_scc_box +" svg g");

    g.each(function(d) {
        var that = d3.select(this);

        // creates a top margin for title positioning
        var transformValues = that.attr("transform").split("(")[1].replace(/\)/g, "").split(",");
        var xVal = parseFloat(transformValues[0]),
            yVal = parseFloat(transformValues[1]);

        that.attr("transform", "translate(" + xVal + "," + (yVal + svgMarginTop) + ")");

    });

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
            .attr("no-data", 1)
            .append("g")
            .attr("class", "no-info")
            .append("text")
            .text("Não há dados sobre essa desagregação")
            .attr("x", svg.attr("width")/2)
            .attr("y", svg.attr("height")/2)
            .attr("text-anchor", "middle");
    }

    //NÃO TEM RETÂNGULO COM DATA-LEGEND = 0, PENSAR COMO FAZER
    var data_value = $(treemap_scc_box+' svg').find('rect[data-legend="'+parameters.cad+'"]').attr("data-value");
    var data_percent = $(treemap_scc_box+' svg').find('rect[data-legend="'+parameters.cad+'"]').attr("data-percent");
    var data_percent_uf = $(treemap_scc_box+' svg').find('rect[data-legend="'+parameters.cad+'"]').attr("data-percent-uf");
    var data_deg =  $(treemap_scc_box+' svg').find('rect[data-legend="'+parameters.cad+'"]').attr("data-deg");
    
    if(parameters.eixo == 1 && parameters.ocp != 0){
        data_percent = $(treemap_scc_box+' svg').find('rect[data-legend="'+parameters.ocp+'"]').attr("data-percent")
        data_deg = $(treemap_scc_box+' svg').find('rect[data-legend="'+parameters.ocp+'"]').attr("data-deg");
    }

    if(parameters.cad == 0){
        var total = 0;

        $(treemap_scc_box).find('svg').find('rect').each(function(){
            total += parseFloat($(this).attr("data-value"));
        })

        data_value = total;
    }

    var dados = {valor: data_value, percent: data_percent, percent_uf: data_percent_uf, deg: data_deg};

    destacaTreemap(treemap_scc_box, parameters.cad);
    updateData('treemap_scc', dados);
}

function update_treemap_scc(treemap_scc_box, data){


    if(svg.attr("no-data") == 1) {
        svg.remove()
        create_treemap_scc(treemap_scc_box, data);
        return;
    }
    svg.attr('width', $(treemap_scc_box).width());
    svg.attr('height', $(treemap_scc_box).height());

    var eixo = parameters.eixo;
    var transition_time = 200;

    var attachColor=function(d){
        return (d.depth==3)? d.data.colorId=d.parent.parent.data.colorId : '';
    };

    root = d3.hierarchy(data)
        .eachBefore(function(d) {
            attachColor(d);
            d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
        })
        .sum(sumBySize)
        .sort(function(a, b) { return b.height - a.height || b.value - a.value; });

    treemap(root);

    // creates cadeia's color range array from color.json file

    var colors = {domain: [], range: []};

    $.each(COLORS.cadeias, function (i, cadeia) {
        if (i > 0) {
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

    var svgMarginTop = 15;


    var percentageTextElement = cell.select("text")
        .attr("clip-path", function (d) {
            return "url(#clip-" + d.data.id + ")";
        })

    percentageTextElement.select('tspan')
        .text(function (d) {

            var divisao = d.data.size / root.value;
            if (uf) {
                return formatDecimalLimit((divisao) * 100, 2) + "%";
            }
            else if (parameters.var == 2 || parameters.var === 9) {
                if (uf === 0) {
                    return formatDecimalLimit((divisao) * 100, 2) + "%";
                }
                else {
                    return ((100 * d.data.size)).toFixed(2) + "%";
                }
            } else {
                return formatDecimalLimit((divisao) * 100, 2) + '%';
            }
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

    var percentageTextElement = cell.select(".percentage").style("opacity", 0)

    var titleTextElement = cell.select("text").style("opacity", 0)

    if(parameters.eixo == 0 || parameters.eixo == 2){
        cell.data(root.leaves())
            .transition().duration(transition_time)
            .attr("transform", function(d) { return "translate(" + d.x0 + "," + (d.y0+svgMarginTop)  + ")"; })
            .select("rect")
            .attr("data-legend", function(d) { return d.data.colorId; })
            .attr("data-value", function(d) { return (d.value); })
            .attr("data-percent", function(d) { return (d.data.size/root.value); })
            .attr("data-percent-uf", function(d) {  return (d.data.size/root.value); })
            .attr("id", function(d) { return d.data.id; })
            .attr("width", function(d) { return d.x1 - d.x0; })
            .attr("height", function(d) { return d.y1 - d.y0; })
            .attr("fill", function(d) { return color(d.data.colorId); })
    }
    else if(parameters.eixo == 1){

        var rect = svg.selectAll("g")
            .data(root.leaves())

        rect.exit().remove()

        var newR = rect.enter().append("g")
            .attr("transform", function(d) { return "translate(" + d.x0 + "," + (d.y0+svgMarginTop)  + ")"; })

        newR
            .append("rect")
            .style("opacity","0")
            .attr("data-legend", function(d) { return d.data.colorId; })
            .attr("data-value", function(d) { return (d.value); })
            .attr("data-percent", function(d) { return (d.data.size/root.value); })
            .attr("data-percent-uf", function(d) {  return (d.data.size/root.value); })
            .attr("id", function(d) { return d.data.id; })
            .attr("width", function(d) { return nodeWidth(d); })
            .attr("height", function(d) { return d.y1 - d.y0; })
            .attr("fill", function(d) { return color(d.data.colorId)})
            .attr("cursor", "pointer")
            .transition().duration(transition_time)
            .style("opacity","1");

        tooltipInstance = tooltip.getInstance();

        newR.on("mouseover", function(d){
                loadTooltipSCC(d, parameters.eixo , parameters.var, tooltipInstance);
            })
            .on("mouseout", tooltipInstance.hideTooltip)
            .on("click", function(d) {
                if(window.parent.innerWidth <= 1199)
                    return;
                treemapClick(treemap_scc_box, d, root);
            })

        newR
            .append("text")
            .text(function(d) {return d.data.name; })
            .attr("class", "title")
            .attr("x", 10)
            .attr("y", 19)
            .attr("text-anchor", "start")
            .style("opacity","0")

        newR
            .append("text")
            .attr("text-anchor", "start")
            .attr("class", "percentage")
            .append('tspan')
            .text(function (d) {
                var divisao = d.data.size / root.value;
                if (uf) {
                    return formatDecimalLimit((divisao) * 100, 2) + "%";
                } 
                else if (parameters.var == 2 || parameters.var == 9) {
                    if (uf === 0) {
                        return formatDecimalLimit((divisao) * 100, 2) + "%";
                    }
                    else {
                        return ((100 * d.data.size)).toFixed(2) + "%";
                    }
                } 
                else {
                    return formatDecimalLimit((divisao) * 100, 2) + '%';
                }
            })
            .attr("display", function (d, i) {
                // se porcentagem for muito pequena e só mostrar 0%, opacity é 0
                if (parameters.var !== 2) {
                    return parseFloat(formatDecimalLimit((d.data.size / root.value) * 100, 2).replace(",", ".")) === 0 ? "none" : "block";
                }
            })
            .attr("font-size", function (d) {
                var nWidth = nodeWidth(d);
                var nodePercentage = Math.round(100 * nWidth / width_box(treemap_scc_box));

                var fontOrdinalSize = d3.scaleThreshold()
                    .domain([12, 25, 30, 40])
                    .range([8, 12, 16, 20]);

                var fontSize = fontOrdinalSize(nodePercentage);

                return fontSize;
            })
            .style("opacity","0")

        rect
            .transition().duration(transition_time)
            .attr("transform", function(d) { return "translate(" + d.x0 + "," + (d.y0+svgMarginTop)  + ")"; })
            .select("rect")
            .attr("data-legend", function(d) { return d.data.colorId; })
            .attr("data-value", function(d) { return (d.value); })
            .attr("data-percent", function(d) { return (d.data.size/root.value); })
            .attr("data-percent-uf", function(d) {  return (d.data.size/root.value); })
            .attr("width", function(d) { return nodeWidth(d); })
            .attr("height", function(d) { return d.y1 - d.y0; })
            .attr("id", function(d) { return d.data.id; })
            .attr("fill", function(d) { return color(d.data.colorId)});

        cell = rect
    }

    if(parameters.cad != 0){
        var data_value = data.children[parameters.cad-1].children[0].children[0].size;
        var data_percent = data.children[parameters.cad-1].children[0].children[0].size/root.value;
        var data_percent_uf = data.children[parameters.cad-1].children[0].children[0].size/root.value;
        
        var dados = {valor: data_value, percent: data_percent, percent_uf: data_percent_uf};
        updateData('treemap_scc', dados);
    }
    setTimeout(function () {

        if(svg.attr("no-data") == 1){
            return;
        }

        var rects = svg.selectAll("g");

        rects.select("text").text(function(d) {return d.data.name; })
            .attr("display", "block")
            .attr("clip-path", function(d) { return "url(#clip-" + d.data.id + ")"; })
            .transition()
            .duration(transition_time - 300)
            .style("opacity", 1);

        rects.select(".percentage")
            .text(function (d) {

                var divisao = d.data.size / root.value;
                if (parameters.uf) {
                    return formatDecimalLimit((divisao) * 100, 2) + "%";
                } else if (parameters.var == 2 || parameters.var === 9) {
                    if (parameters.uf === 0) {
                        return formatDecimalLimit((divisao) * 100, 2) + "%";
                    }
                    else {
                        return ((100 * d.data.size)).toFixed(2) + "%";
                    }
                } else {
                    return formatDecimalLimit((divisao) * 100, 2) + '%';
                }
            })
            .style("font-size", function (d) {
                var nWidth = nodeWidth(d);
                var nodePercentage = Math.round(100 * nWidth / width_box(treemap_scc_box));

                var fontOrdinalSize = d3.scaleThreshold()
                    .domain([12, 25, 30, 40])
                    .range([8, 12, 16, 20]);

                var fontSize = fontOrdinalSize(nodePercentage);

                return fontSize;
            })
            .transition()
            .duration(transition_time+200)
            .style("opacity", 1);

        formatTreemapText(treemap_scc_box);

        var data_value = $(treemap_scc_box+' svg').find('rect[data-legend="'+parameters.cad+'"]').attr("data-value");
        var data_percent = $(treemap_scc_box+' svg').find('rect[data-legend="'+parameters.cad+'"]').attr("data-percent")
        var data_percent_uf = $(treemap_scc_box+' svg').find('rect[data-legend="'+parameters.cad+'"]').attr("data-percent-uf");
        var data_deg = $(treemap_scc_box+' svg').find('rect[data-legend="'+parameters.cad+'"]').attr("data-deg");

        // console.log("Valores (depois): ", data_value, data_percent, data_percent_uf, data_deg);
        
        if(parameters.eixo == 1 && parameters.deg != 0){
            $(treemap_scc_box+' svg').find('rect[data-legend="'+parameters.cad+'"]').each(function(){
                if($(this).attr("id").match(getSubdegName(parameters.deg, parameters.subdeg))){
                    data_percent_uf = $(this).attr("data-percent-uf");
                }
            });
        }

        if(parameters.eixo == 1 && parameters.ocp != 0){
            data_percent = $(treemap_scc_box+' svg').find('rect[data-legend="'+parameters.ocp+'"]').attr("data-percent");
            data_deg = $(treemap_scc_box+' svg').find('rect[data-legend="'+parameters.ocp+'"]').attr("data-deg");
        }

        var dados = {valor: data_value, percent: data_percent, percent_uf: data_percent_uf, deg: data_deg};

        updateData('treemap_scc', dados);

        destacaTreemap(treemap_scc_box, parameters.cad);
    }, 500);

    // testa e mostra mensagem de valor zerado/indisponível
    var isValueZero = true;

    d3.selectAll(treemap_scc_box+">svg>g")
        .data(root.leaves())
        .attr("display", function(d){
            var size = parseFloat(d.data.size);
            var isSizeZero = size === 0 || size === null || size === undefined;
            if (!isSizeZero && isValueZero)
                isValueZero = false;
        })

    // testa se o valor de size é zero
    if (isValueZero) {
        d3.selectAll(treemap_scc_box+">svg>g")
            .attr("display", "none");

        d3.select(treemap_scc_box+">svg")
            .attr("no-data", 1)
            .append("g")
            .attr("class", "no-info")
            .append("text")
            .text("Não há dados sobre essa desagregação")
            .attr("x", svg.attr("width") / 2)
            .attr("y", svg.attr("height") / 2)
            .attr("text-anchor", "middle");
    }
}

function destacaTreemap(treemap_scc_box, cadId) {

    $(treemap_scc_box).find("rect").each(function() {

        $(this).css('fill', color($(this).attr("data-legend")));

        if(cadId == 0){
            $(this).animate({"opacity": "1"}, "fast");
            $(this).css("stroke", "none");
        }
        else if($(this).attr("data-legend") == cadId) {
            $(this).attr("class", "destacado-scc");
            $(this).animate({"opacity": "1"}, "fast");
            $(this).css("stroke", "#555");
            $(this).css("stroke-width", "2");

            if(parameters.eixo == 1 && $(this).attr("id-subdeg") == parameters.subdeg){
                $(this).css('fill', corEixo[2]);
            }
            else{
                $(this).css('fill', color(cadId));
            }
        }
        else {
            $(this).attr("class", "");
            $(this).css("stroke", "none");
            $(this).animate({"opacity": "0.7"}, "fast");
        }
    });
}

function getSomaScc(regiaoId) {
    var soma = 0;
    $("rect").each(function() {
        if($(this).attr("data-legend") == regiaoId) {
            if($(this).attr("data-value") != "NaN") soma+=parseFloat($(this).attr("data-value"));
        }
    });
    return soma;
}

// return node box width
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

function loadTooltipSCC(d, eixo, vrv, tooltipInstance){
    
    if(eixo == 0) {
        tooltipInstance.showTooltip(d, [
            ["title", d.data.name],
            ["", formatTextVrv(d.data.size, eixo, vrv)]
        ]);
                
    }
    else if(eixo == 1) {
        tooltipInstance.showTooltip(d, [
            ["title", d.data.name],
            ["", formatTextVrv(d.data.size, eixo, vrv)]
        ]);
    }

    else if(eixo == 2){
        if(url['uf'] == 0 || url['var'] == 3){
            tooltipInstance.showTooltip(d, [
                ["title", d.data.name],
                ["", formatTextVrv(d.data.size, eixo, vrv)]
            ]);
        }
        else{
            tooltipInstance.showTooltip(d, [
                ["title", d.data.name],
                ["", formatTextVrv(d.data.size, eixo, vrv)],
                ["", formatTextTaxaVrv((d.data.size/root.value), eixo, vrv)]

            ]);
        }

    }

    else if(eixo == 3){
        if (url['uf'] != 0 && (vrv == 1 || vrv == 2)){
            tooltipInstance.showTooltip(d, [
                ["title", d.data.name],
                ["", formatTextVrv(d.data.size, eixo, vrv)],
                ["", formatTextTaxaVrv((d.data.size/root.value), eixo, vrv)],
                ["", formatTextTaxaVrv(d.data.percentual, eixo, vrv)],

            ]);
        }
        else if (url['uf'] == 0 && (vrv == 1 || vrv == 2)){
            tooltipInstance.showTooltip(d, [
                ["title", d.data.name],
                ["", formatTextVrv(d.data.size, eixo, vrv)],
                ["", formatTextTaxaVrv((d.data.size/root.value), eixo, vrv)],

            ]);
        }
        else if(vrv == 99 && url['uf'] == 0){
            tooltipInstance.showTooltip(d, [
                ["title", d.data.name],
                ["", formatTextVrv(d.data.size, eixo, vrv)],
                ["", formatTextTaxaVrv((d.data.size/root.value), eixo, vrv)],

            ]);
        }
    }
}

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

/* retorna cor do elemento */
function color(colorId){

    if(parameters.eixo == 1) {

        if(COLORS.cadeias[colorId]){
            COLORS.cadeias[colorId].gradient["7"] = COLORS.cadeias[colorId].color;
            return COLORS.cadeias[colorId].color;
        }
        else{
            return COLORS.cadeias[0].gradient;
        }
    }
    else {
        if(COLORS.cadeias[colorId]){
            return COLORS.cadeias[colorId].color;
        }
        else{
            return COLORS.cadeias[0].color;
        }
    }
}

function treemapClick(treemap_scc_box, d, root){

    if(parameters.ocp == 0 || parameters.ocp == null) {
        cad_percent = $('svg').find('rect[data-legend="'+d.data.colorId+'"]').attr("data-percent");
        cad_valor = $('svg').find('rect[data-legend="'+d.data.colorId+'"]').attr("data-value");
        cad_percent_uf = ($('svg').find('rect[data-legend="'+d.data.colorId+'"]').attr("data-percent-uf"))

        percent_deg = 0;

        if(parameters.deg !=0){
            cad_percent_uf = (d.data.size/d.parent.parent.value)
            percent_deg = (d.data.size/d.parent.parent.parent.value)

            $(".bread-select[data-id=deg]").find("optgroup[value="+parameters.deg+"]").find("option[value="+(d.data.desagreg)+"]").prop('selected', true);
            $(".bread-select[data-id=cad]").val(d.data.colorId);

            updateWindowUrl('cad', d.data.colorId)
            updateWindowUrl('deg', parameters.deg)
            updateWindowUrl('subdeg', d.data.desagreg)
        }
        else{
            $(".bread-select[data-id=cad]").val(d.data.colorId)
            updateWindowUrl('cad', d.data.colorId)
        }

    }
    else {
        $("select[data-id='ocp']").val(d.data.colorId);
        updateWindowUrl('ocp', d.data.colorId);
        updateWindowUrl('cad', 0);

        enableDesag(parameters.eixo, parameters.var, d.data.colorId, true, parameters.slc, url);

        cad_valor = d.data.size;

        if(parameters.deg == 0){
            cad_percent_uf = $('svg').find('rect[data-legend="'+d.data.colorId+'"]').attr("data-percent-uf");
            cad_percent = $('svg').find('rect[data-legend="'+d.data.colorId+'"]').attr("data-percent")
        }
        else{
            $(".bread-select[data-id=deg]").find("optgroup[value="+parameters.deg+"]").find("option[value="+(d.data.desagreg)+"]").prop('selected', true);

            updateWindowUrl('deg', parameters.deg)
            updateWindowUrl('subdeg', d.data.desagreg)

            cad_percent = d.data.percentual;
            cad_percent_uf = getSomaScc(d.data.colorId);
        }
    }
    updateIframe();
}