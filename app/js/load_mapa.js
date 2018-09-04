var data_mapa = [];

function create_mapa(mapa_box, mapa){

    var windowWidth = width_box(mapa_box);
    var legendaWidth = width_box(mapa_box);
    var shapeWidth = 30;
    var corpo = mapa_box

    var svg_mapa = d3.select(corpo)
                    .append("svg")
                    .attr("width", width_box(mapa_box))
                    .attr("height", height_box(mapa_box));

    var projection = d3.geoMercator()
                        .rotate([4.4, 0])
                        .scale(250)
                        .translate([windowWidth / 1.5, height_box(mapa_box) / 1.2]);

    var path = d3.geoPath()
                .projection(projection);

    var config = URL_PARAM;
    var dict = {};
    var info = [];

    Object.keys(mapa).forEach(function(key) {
        info.push(mapa[key]);
        if(parameters.eixo == 2 && parameters.var == 17)
            return dict[mapa[key].id] = {id:mapa[key].id, SouN:mapa[key].SouN, uf:mapa[key].uf, valor:mapa[key].valor, ano:mapa[key].ano, percentual:mapa[key].percentual, taxa:mapa[key].taxa};
        else
            return dict[mapa[key].id] = {id:mapa[key].id, uf:mapa[key].uf, valor:mapa[key].valor, ano:mapa[key].ano, percentual:mapa[key].percentual, taxa:mapa[key].taxa};
    });

    //carrega estados JSON
    var states = topojson.feature(br_states, br_states.objects.states);
    projection.fitExtent([[0,0],[windowWidth, height_box(mapa_box)*0.8]], states)//.fitSize([width, height-100], states)

    //exclui linha de cabeçario do OBJ
    info.splice(0,1);
    info.splice(27,28);
    delete dict[0];

    //valores maximos e minimos
    var minValue = d3.min(info, function(d) {return d.valor; });
    var maxValue = d3.max(info, function(d) {return d.valor; });

    var color = d3.scaleLinear()
        .domain([minValue, maxValue])
        .range([COLORS.cadeias[parameters.cad].gradient['2'], COLORS.cadeias[parameters.cad].gradient['6']])


    if(parameters.eixo == 2 && parameters.var == 17){

        var arrayAnos = ["2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018" ];

        $(window.document).find('select[data-id=ano]').each(function(){
            selectOp = this;
            $(this.options).each(function(){
                $(this).remove();
            })
            dummy = arrayAnos.slice(0);
            dummy.reverse().forEach(function(d){
                $(selectOp).append($('<option>', {
                    value: d,
                    text: d
                }))
            })

            $(this).val(url['ano']);
        });

        var soma = 0;

        Object.keys(dict).forEach(function(key,index) {
            soma += dict[key].valor
        })

        // if(parameters.uf == 0)
        //     setIntegerValueData({valor: soma},parameters.eixo, parameters.var);

    }


    //concatena propriedades
    svg_mapa.append("g")
            .attr("class", "states")
            .selectAll("path")
            .data(states.features)
            .enter()
            .append("path")
            .attr("data-legend",function(d) { return d.id; })
            .style('fill', function(d){

                if(parameters.eixo == 2 && parameters.var == 17){

                    if(dict[d.id].SouN == 0){
                    // return  COLORS.binario['0'].color;
                    return  corEixo[2];
                    }
                    else{
                        // return COLORS.binario['1'].color;
                        return  corEixo[1];

                    }
                }
                else{
                    if(d.id == parameters.uf){
                        return corEixo[1];
                    }
                    if(color(dict[d.id]) == undefined)
                        return color(dict);
                    else
                        return color((dict[d.id].valor))
                }
            })
            .attr("d", path)
            .attr("stroke-linecap", "round")
            .on("mouseover", function(d){

                loadTooltip_mapa(d, dict, parameters.eixo, parameters.var);
            })
            .on("mouseout", tooltipInstance.hideTooltip)
            .on("click", function(d) {

                if(window.innerWidth <= 1199)
                    return;
                mapaClick(svg_mapa, dict, d)
                // destacaPais(svg_mapa, parameters.uf);

            })
            .style("cursor", "pointer");
    
        if(parameters.eixo == 2 && parameters.var == 17){
            legendaBinario();
        }
        else{
            escalaMapa();
        }

        function legendaBinario(){
        var sim_color = corEixo[1];

        var nao_color = corEixo[2];

        var sim_barra = svg_mapa.attr("width")*0.8;
        var nao_barra = svg_mapa.attr("width")*0.8;

        var x_barra = 350*0.85;
        var y_barra = 350*0.85;
        var height_barra = 350*0.04;
        var width_barra = width_box(mapa_box)*0.1;
        var prefix = ""
        var fontColor = "#aaa"

        if(y_barra + height_barra + $(mapa_box+" svg").offset().top > 350){
            y_barra = 350 - 23 - $(mapa_box+" svg").offset().top - height_barra;
        }

        svg_mapa.append("g")
            .append("rect")
            .attr("x", sim_barra)
            .attr("y", y_barra-height_barra*1.4)
            .attr("height", height_barra)
            .attr("width", width_barra)
            .attr("rx", height_box(mapa_box)/150)
            .attr("ry", height_box(mapa_box)/150)
            .style("fill", sim_color)
            .style("stroke-width", 1)
            .style("stroke", fontColor);

        svg_mapa.append("g")
            .append("rect")
            .attr("x", nao_barra)
            .attr("y", y_barra)
            .attr("height", height_barra)
            .attr("width", width_barra)
            .attr("rx", height_box(mapa_box)/150)
            .attr("ry", height_box(mapa_box)/150)
            .style("fill", nao_color)
            .style("stroke-width", 1)
            .style("stroke", fontColor);

        svg_mapa.append("text")
            .attr("x", sim_barra+width_barra*1.2)
            .attr("y", y_barra-height_barra/2)
            .attr("fill", fontColor)
            .text("Possui");


        svg_mapa.append("text")
            .attr("x", nao_barra+width_barra*1.2)
            .attr("y", y_barra+height_barra/5*4)
            .attr("fill", fontColor)
            .text("Não Possui");

    }


    function escalaMapa(){
        var low_color = color(minValue);
        var high_color = color(maxValue);

        var x_barra = svg_mapa.attr("width")*0.3;

        var y_barra = svg_mapa.attr("height")*0.85;
        var max_barra = maxValue;
        var min_barra = minValue;
        var height_barra = svg_mapa.attr("height")*0.03;
        var width_barra = width_box(mapa_box)*0.4;
        var fontColor = "#aaa";

        if(y_barra + height_barra > svg_mapa.attr("height")){
            y_barra = svg_mapa.attr("height") - 23 - height_barra;
        }

        var gradient = svg_mapa.append("defs")
                        .append("linearGradient")
                        .attr("id", "grad")
                        .attr("x1", "0%")
                        .attr("y1", "100%")
                        .attr("x2", "90%")
                        .attr("y2", "100%")

        gradient.append("stop")
                .attr("class", "begin")
                .attr("offset", "0%")
                .style("stop-color", low_color)
                .style("stop-opacity", 1);

        gradient.append("stop")
                .attr("class", "end")
                .attr("offset", "90%")
                .style("stop-color", high_color)
                .style("stop-opacity", 1);

        var svg_legenda = svg_mapa.append("g")
                .attr("class", "legenda")
                .append("rect")
                .attr("x", x_barra)
                .attr("y", y_barra)
                .attr("height", height_barra)
                .attr("width", width_barra)
                .attr("rx", height_box(mapa_box)/150)
                .attr("ry", height_box(mapa_box)/150)
                .style("fill", "url(#grad)")
                .style("stroke-width", 1)
                .style("stroke", fontColor);

        var lines =  svg_mapa.selectAll("line")
                .data([min_barra, String((parseFloat(min_barra)+parseFloat(max_barra))/2), max_barra])
                .enter()
                .append("line")
                .attr("class", "lines-legenda").attr("x1", function(d,i){
                    var position = x_barra+i*width_barra/2;
                    if(d3.select("#legenda"+i).size() == 0){
                        var texto = svg_mapa.append("text")
                    } else {
                        var texto = d3.select("#legenda"+i)
                    }
                        texto.attr("id", "legenda"+i)
                            .attr("class", "text-legenda")
                            .attr("x", position)
                            .attr("y", y_barra+height_barra +12)
                            .attr("fill", fontColor);

                    formatBarTextMap(d, parameters.eixo, parameters.var, texto)

                    return position;
                })
                .attr("x2", function(d,i){return x_barra+i*width_barra/2})
                .attr("y1", y_barra-2)
                .attr("y2", y_barra+height_barra+2)
                .style("stroke", fontColor)
                .style("stroke-width", 1);
    }

    // configInfoDataBoxMapa(parameters.eixo, parameters.var, dict[parameters.uf]);

    updateData('mapa', dict[parameters.uf], dict);
    data_mapa = mapa;
    
}

function update_mapa(mapa_box, mapa){

    var svg_mapa = d3.select(mapa_box+">svg")
    d3.json("./data/br-min.json", function(data){
        br_states = data;
    })
    var corEixo = window.COLORS['eixo'][parameters.eixo].color;
    
	var dict = {};
    var info = [];

    Object.keys(mapa).forEach(function(key) {
        info.push(mapa[key]);
        if(parameters.eixo == 2 && parameters.var == 17)
		    return dict[mapa[key].id] = {id:mapa[key].id, SouN:mapa[key].SouN, uf:mapa[key].uf, valor:mapa[key].valor, ano:mapa[key].ano, percentual:mapa[key].percentual, taxa:mapa[key].taxa};
		else
            return dict[mapa[key].id] = {id:mapa[key].id, uf:mapa[key].uf, valor:mapa[key].valor, ano:mapa[key].ano, percentual:mapa[key].percentual, taxa:mapa[key].taxa};

	});
    var projection = d3.geoMercator()
                        .rotate([4.4, 0])
                        .scale(250)
                        .translate([windowWidth / 1.5, height_box(mapa_box) / 1.2]);



    var states = topojson.feature(br_states, br_states.objects.states);
    projection.fitExtent([[0,0],[width_box(mapa_box), height_box(mapa_box)*0.8]], states)//.fitSize([width, height-100], states)
	info.splice(0,1);
	info.splice(27,28);
    delete dict[0];
    
    var minValue = d3.min(info, function(d) {return d.valor; });
	var maxValue = d3.max(info, function(d) {return d.valor; });

	//coloração do mapa
	var color = d3.scaleLinear()
        .domain([minValue, maxValue])
        .range([COLORS.cadeias[parameters.cad].gradient['2'], COLORS.cadeias[parameters.cad].gradient['6']])

    svg_mapa.select("g")
        .selectAll("path").data(states.features)
        .attr("data-legend",function(d) { return d.id; })
        .style('fill', function(d){
            if(parameters.eixo == 2 && parameters.var == 17){

                if(dict[d.id].SouN == 0){
                    // return  COLORS.binario['0'].color;
                    return  corEixo[2];
                }
                else{
                    // return COLORS.binario['1'].color;
                    return  corEixo[1];

                }
            }
            else if(parameters.uf == d.id){
                return corEixo[1];
            }
            else{
                if(color(dict[d.id]) == undefined) {
                    return color(dict);
                }
                else {
                    return color((dict[d.id].valor))
                }
            }
        })
        .style("cursor", "pointer")
        .on("mouseover", function(d){
            loadTooltip_mapa(d, dict, parameters.eixo, parameters.var);
        });

    var low_color = color(minValue);
    var high_color = color(maxValue);

    var x_barra = svg_mapa.attr("width")*0.3;
        
    var y_barra = svg_mapa.attr("height")*0.85;
    var max_barra = maxValue;
    var min_barra = minValue;
    var height_barra = svg_mapa.attr("height")*0.03;
    var width_barra = width_box(mapa_box)*0.4;
    var fontColor = "#aaa";

    gradient = svg_mapa.select("#grad");

    gradient.select("stop.begin")
    .style("stop-color", low_color);

    gradient.select("stop.end")
        .style("stop-color", high_color);

    
    var svg_legenda = d3.select("g.legenda rect");

    svg_legenda.attr("x", x_barra)
                .attr("y", y_barra)
                .attr("height", height_barra)
                .attr("width", width_barra)
                .attr("rx", height_box(mapa_box)/150)
                .attr("ry", height_box(mapa_box)/150)
                .style("fill", "url(#grad)")
                .style("stroke-width", 1)
                .style("stroke", fontColor);
    
    var lines = d3.selectAll(".lines-legenda")
            .data([min_barra, String((parseFloat(min_barra)+parseFloat(max_barra))/2), max_barra])

    lines.attr("x1", function(d,i){
            var position = x_barra+i*width_barra/2;
            if(d3.select("#legenda"+i).size() == 0){
                var texto = svg_mapa.append("text")
            } else {
                var texto = d3.select("#legenda"+i)
            }
                texto.attr("id", "legenda"+i)
                    .attr("class", "text-legenda")
                    .attr("x", position)
                    .attr("y", y_barra+height_barra +12)
                    .attr("fill", fontColor);

            formatBarTextMap(d, parameters.eixo, parameters.var, texto)

            return position;
        })
        .attr("x2", function(d,i){return x_barra+i*width_barra/2})
        .attr("y1", y_barra-2)
        .attr("y2", y_barra+height_barra+2)
        .style("stroke", fontColor)
        .style("stroke-width", 1)

    // destacaPais(svg_mapa, parameters.uf);

    // configInfoDataBoxMapa(parameters.eixo, parameters.var, dict[parameters.uf]);

    updateData('mapa', dict[parameters.uf], dict);

}

function mapaClick(svg_mapa, dict, d){
    // updateTitleClickMapa(dict[d.id].uf)
    parameters.uf = d.id;

    $(".bread-select[data-id='uf']").val(d.id);
    url['uf'] = d.id;

    updateWindowUrl('uf', d.id);



    if(parameters.eixo == 2 && parameters.var == 17) {
        // configInfoDataBoxMapaClick(parameters.eixo, parameters.var, dict[d.id]);
    }

    if(parameters.deg == 0) {
        // configInfoDataBoxMapaClick(parameters.eixo, parameters.var, dict[d.id]);
    }

    setStateTitle(d['properties']['name']);

    updateIframe()

}

function destacaPais(svg_mapa, ufId) {

    svg_mapa.selectAll("path").each(function() {
        if($(this).attr("data-legend") == parameters.uf) {
            if($(this).attr("class") !== "destacado") {
                $(this).attr("class", "destacado");
                $(this).attr("data-color", $(this).css("fill"));
                $(this).css("fill", corEixo[1]);
                $(this).animate({"opacity": "1"}, "fast");
            }
        }
        else {
            $(this).attr("class", "");
            $(this).css("fill", $(this).attr("data-color"));
            $(this).animate({"opacity": "0.7"}, "fast");
        }

    });

}

function loadTooltip_mapa(d, dict, eixo, vrv){

    if(eixo == 0) {

        var valorTooltip = dict[d.id].valor;
 
        tooltipInstance.showTooltip(d, [
            ["title", d['properties']['name']],
            ["", formatTextVrv(valorTooltip, eixo, vrv)]
        ]);

    }
    else if(eixo == 1){

        var valorTooltip = dict[d.id].valor;

        tooltipInstance.showTooltip(d, [
            ["title", d['properties']['name']],
            ["", formatTextVrv(valorTooltip, eixo, vrv)]
        ]);

    }
    else if(eixo == 2){

        //tooltips com os 3 valores na interface (valor, percentual e taxa)
        if(vrv == 1  || vrv == 2 || vrv == 3 || vrv == 4 ||  vrv == 5 || vrv == 6 || vrv == 7 || vrv == 8 || vrv == 9 || vrv == 11 || vrv == 12 || vrv == 13 || vrv == 14 || vrv == 18 ){
            tooltipInstance.showTooltip(d, [
                ["title", d['properties']['name']],
                ["", formatTextVrv(dict[d.id].valor, eixo, vrv)],
            //    ["", formatTextTaxaVrv(dict[d.id].percentual, eixo, vrv)],
            ]);
        }
        else if(parameters.var == 19){
            if(parameters.mec == 0){
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor, eixo, vrv) + " recebedoras"],
                ]);
            }
            else{
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor, eixo, vrv) + " trabalhadores"],
                ]);
            }
        }
        else if(parameters.var == 18){
            if(parameters.mec == 0){

            }
            else{

            }
        }
        else if(vrv == 17){

            var SouN = "";
            var valor = "";


            if(dict[d.id].SouN == 0){
                SouN = "Não Possui";
                valor =  "";
            }
            else{
                SouN = "Possui";
                if(dict[d.id].valor > 0)
                    valor = formatTextVrv(dict[d.id].valor, eixo, vrv) ;
                else
                    valor = "Indisponível."

            }

            if(dict[d.id].SouN == 1){
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", SouN],
                    ["", valor],
                ]);
            }
            else{
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", SouN],
                ]);
            }



        }

    }
    else if(eixo == 3){
        //tooltips com os 3 valores na interface (valor, percentual e taxa)
        if(vrv == 1 || vrv == 2){
            tooltipInstance.showTooltip(d, [
                ["title", d['properties']['name']],
                ["", formatTextVrv(dict[d.id].valor, eixo, vrv)],
            //    ["", formatTextTaxaVrv(dict[d.id].percentual, eixo, vrv)],
            ]);
        }
        else if(vrv == 99){
            tooltipInstance.showTooltip(d, [
                ["title", d['properties']['name']],
                ["", formatTextVrv(dict[d.id].valor, eixo, vrv)],
            ]);

        }

    }
}

