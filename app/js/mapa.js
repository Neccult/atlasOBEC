// Mapa JS //
/*=== tamanho do mapa ===*/
var mapa_box = '#'+VIEWS["mapa"];

console.log(width_box(mapa_box))

var windowWidth = width_box(mapa_box);
var legendaWidth = width_box(mapa_box);

var shapeWidth = 30;

var corpo = mapa_box


function destacaPais(ufId) {
    console.log(svg_mapa.selectAll("path"))
	svg_mapa.selectAll("path").each(function() {
        if($(this).attr("data-legend") == ufId) {
            if($(this).attr("class") !== "destacado") {
                $(this).attr("class", "destacado");
                $(this).attr("data-color", $(this).css("fill"));
                $(this).css("fill", corEixo);
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

//cria svg
var svg_mapa = d3.select(corpo).append("svg")
    .attr("width", width_box(mapa_box))
    .attr("height", height_box(mapa_box));

//configura projeção
var projection = d3.geoMercator()
    .rotate([4.4, 0])
    .scale(250)
    .translate([width_box(mapa_box) / 1.5, height_box(mapa_box) / 1.2]);

var path = d3.geoPath()
	.projection(projection);

// import colors.json file
var colorJSON = COLORS;

var corEixo = window.colorJSON['eixo'][parameters.eixo].color;

// import pt-br.json file for get the title
var textJSON = PT_BR;

var config = URL_PARAM;
/*$.get('./db/json_mapa.php?' + config, function(dado){
    console.log(config)
    console.log(dado)
})*/
//pre-load arquivos

d3.queue()
	.defer(d3.json, "./data/br-min.json")
	.defer(d3.json, "./db/json_mapa.php?"+config)
	.await(ready);

//leitura
function ready(error, br_states, mapa){

    $('#loading').fadeOut('fast');
	if (error) return console.error(error);
    
    //if(parameters.var != 17)


	//variaveis informacao
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
    console.log(width_box(mapa_box))
	var states = topojson.feature(br_states, br_states.objects.states);
    projection.fitExtent([[0,0],[width_box(mapa_box), height_box(mapa_box)*0.8]], states)//.fitSize([width, height-100], states)

	//exclui linha de cabeçario do OBJ
	info.splice(0,1);
	info.splice(27,28);
	delete dict[0];

	//valores maximos e minimos
	var minValue = d3.min(info, function(d) {return d.valor; });
	var maxValue = d3.max(info, function(d) {return d.valor; });

	//distribuicao de frequencias
	var quant = 10;
	var range = maxValue - minValue;
	var amp = minValue < 1 && minValue > -1 ? range / quant : Math.round(range / quant);
    var dom = []
    //domino de valores para as cores do mapa
    for(var j = 1; j < quant; j++){
        dom.push((minValue + amp*j))
    }
	/*var dom = [
				(minValue+(amp/4)),
				(minValue+amp),
				(minValue+(2*amp)),
				(minValue+(3*amp)),
				(minValue+(4*amp))
			];

	//ajuste do dominio
	var i = 0;
	if(amp > 1){
		while(i<=quant){
			dom[i] = dom[i] - (dom[i] % quant);
			i++;
		}
    }*/

	// creates cadeia's color range array from color.json file
	var colorsRange = [];

	if(colorJSON.cadeias[parameters.cad] != undefined){
        colorMax = colorJSON.cadeias[parameters.cad].gradient['6']
        baseLightness = d3.hsl(colorMax).l
        newHSL = d3.hsl(colorMax)
        for(var j = 1; j < quant ; j++){
            newHSL.l = baseLightness + (quant-j)*(1-baseLightness)/quant; 
            colorsRange.push(d3.hsl(newHSL));
        }
    }
	//coloração do mapa
	var color = d3.scaleLinear()
        .domain([minValue, maxValue])
        .range([colorJSON.cadeias[parameters.cad].gradient['2'], colorJSON.cadeias[parameters.cad].gradient['6']])


	//para funcionar var 17parameters.eixo 3

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

        if(parameters.uf == 0)
            setIntegerValueData({valor: soma},parameters.eixo, parameters.var);

    }

   // console.log(colorJSON)
   //  console.log(colorJSON.binario['0'].color)

    var tooltipInstance = tooltip.getInstance();
    //retira tag <span> do title
    var title_content = getDataVar(textJSON,parameters.eixo, parameters.var).title;
    var title = title_content.replace("<span>", "");
    title = title.replace("<br>", "");
    title = title.replace("</span>", "");
	//concatena propriedades
	svg_mapa.append("g")
		.attr("class", "states")
        .selectAll("path")
		.data(states.features)
		.enter()
		.append("path")
		.attr("data-legend",function(d) { return d.id; })
		// .style('fill', function(d){return color(d.properties.name.replace(/\s+/g, '').length);})
		.style('fill', function(d){

            if(parameters.eixo == 2 && parameters.var == 17){

                if(dict[d.id].SouN == 0){
                   return  colorJSON.binario['0'].color;
                }
                else{
                    return colorJSON.binario['1'].color;
                }
            }
            else{
                if(color(dict[d.id]) == undefined)
                    return color(dict);
                else
                    return color((dict[d.id].valor))
            }
        })


		.attr("d", path)

		//mouseover
		.on("mouseover", function(d){

		    loadTooltip(d,parameters.eixo, parameters.var)
		})
		.on("mouseout", tooltipInstance.hideTooltip)
		.on("click", function(d) {


            if(window.innerWidth <= 1199)
                return;
            
			updateTitleClickMapa(dict[d.id].uf)
            parameters.uf = d.id;
            if(parameters.eixo == 0 && parameters.var == 9)
            
            $(window.document).find("select[data-id='uf']").val(d.id);
            destacaPais(d.id);
            //setIntegerValueData(dict[d.id], parameters.eixo, parameters.var);
           // if(url['cad'] == 0)
                //setPercentValueData(dict[d.id], parameters.eixo, parameters.var);

            if(parameters.eixo == 2 && parameters.var == 17)
                configInfoDataBoxMapaClick(parameters.eixo, parameters.var, dict[d.id]);

            if(parameters.deg == 0)
                configInfoDataBoxMapaClick(parameters.eixo, parameters.var, dict[d.id]);

            setStateTitle(d['properties']['name']);
            

        })
		.style("cursor", "pointer");

    

    if(parameters.eixo == 2 && parameters.var == 17){
        legendaBinario();
    }
    else{
        escalaMapa();
    }

/********* LEGENDA DO MAPA *********/

function escalaMapa(){
    var low_color = color(minValue);
    var high_color = color(maxValue);

    var x_barra = svg_mapa.attr("width")*0.3;

    var y_barra = svg_mapa.attr("height")*0.85;
    var max_barra = maxValue;
    var min_barra = minValue;
    var height_barra = svg_mapa.attr("height")*0.03;
    var width_barra = width_box(mapa_box)*0.4;
    var prefix = ""
    var fontColor = "#aaa"

    if(y_barra + height_barra > svg_mapa.attr("height")){
        y_barra = svg_mapa.attr("height") - 23 - height_barra;
    }

    gradient = svg_mapa.append("defs")
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

    svg_mapa.append("g")
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

    svg_mapa.selectAll("line")
        .data([min_barra, String((parseFloat(min_barra)+parseFloat(max_barra))/2), max_barra])
        .enter()
        .append("line")
        .attr("x1", function(d,i){
            var position = x_barra+i*width_barra/2;

            texto = svg_mapa.append("text")
                .attr("id", "legenda"+i)
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
}

function legendaBinario(){
        var sim_color = colorJSON.binario['1'].color;
        var nao_color = colorJSON.binario['0'].color;

        var sim_barra = svg_mapa.attr("width")*0.8;
        var nao_barra = svg_mapa.attr("width")*0.8;

        var x_barra = 350*0.85;
        var y_barra = 350*0.85;
        var height_barra = 350*0.03;
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


/************************ */



	$(window.document).find('.value-info-title').html(getDataVar(textJSON, parameters.eixo, parameters.var).mapa_valores);
    $(window.document).find('.font-title').html("Fonte(s): "+getDataVar(textJSON, parameters.eixo, parameters.var).fontes);
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
                return textJSON.select.cad[parameters.cad].name;
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

    if(parameters.uf != 0){
        destacaPais(parameters.uf);
    }


    configInfoDataBoxMapa(parameters.eixo, parameters.var, dict[parameters.uf]);


    if(parameters.eixo == 0 || parameters.eixo == 1|| parameters.eixo == 2){

    }
    else{
        if(parameters.uf != 0) {
            if(parameters.deg == 0){
                setPercentValueData(dict[parameters.uf], parameters.eixo, parameters.var);
                setIntegerValueData(dict[parameters.uf], parameters.eixo, parameters.var);
            }
        }


        if(url['cad'] != 0 && parameters.uf != 0) {

            if(parameters.deg == 0){
                setIntegerValueData(dict[parameters.uf], parameters.eixo, parameters.var);
                setPercentValueData(dict[parameters.uf], parameters.eixo, parameters.var);
            }
                
        }
    }


    if(parameters.uf == 0 && parameters.eixo != 3) $(window.document).find(".state-title").first().html("Brasil");

    if(dict[parameters.uf])
        estadoAtual = dict[parameters.uf].uf
    else
        estadoAtual = "BRASIL"



    /*if(parameters.eixo != 3 && parameters.eixo != 1 && parameters.eixo != 2){
        $(window.document).find(".integer-value").first().find(".description-number").first().html(updateDescPercent(parameters.eixo, "integer", getDataVar(textJSON, parameters.eixo, parameters.var).desc_int, estadoAtual));
        $(window.document).find(".percent-value").first().find(".description-number").first().html(updateDescPercent(parameters.eixo, "percent", getDataVar(textJSON, parameters.eixo, parameters.var).desc_percent, estadoAtual));
    }*/

    function loadTooltip(d){
        if(parameters.eixo == 0) {
            if(parameters.var === 1){

                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor, parameters.eixo, parameters.var)],
                    //    ["", formatDecimalLimit(dict[d.id].taxa, 2)],
                ]);
            }
            else if(parameters.var === 2) {
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor, parameters.eixo, parameters.var)]
                ] );
            }
            else if(parameters.var === 3) {

                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor*100, parameters.eixo, parameters.var)],
                ]);
            }
            else if(parameters.var === 9) {

                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor*100, parameters.eixo, parameters.var)]
                ]);

            }
            else if(parameters.var === 4 || parameters.var === 5 || parameters.var === 6 || parameters.var === 7 || parameters.var === 8) {
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor, parameters.eixo, parameters.var)],
                 //   ["", formatDecimalLimit(dict[d.id].percentual*100, 2) + "%"],
                ]);

            }
            else {
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor, parameters.eixo, parameters.var)],
                    ["", formatDecimalLimit(dict[d.id].percentual*100, 2) + "%"],
                //    ["", formatDecimalLimit(dict[d.id].taxa, 2)],
                ]);
            }
        }
        else if(parameters.eixo == 1){

            //tooltips com os 3 valores na interface (valor, percentual e taxa)
            if(parameters.var === 1  || parameters.var === 5 || parameters.var === 7 || parameters.var === 8){
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor, parameters.eixo, parameters.var)],
                    // ["", formatTextTaxaparameters.var(dict[d.id].percentual, parameters.eixo, parameters.var)],

                ]);
            }
            ///Tooltips com só o valor na interface
            else if(parameters.var === 2){
                if(url['ocp'] == 0){
                    tooltipInstance.showTooltip(d, [
                        ["title", d['properties']['name']],
                        ["", formatTextVrv(dict[d.id].valor*10000,parameters.eixo, parameters.var)]
                    ], mapa_box);
                }
                else{
                    tooltipInstance.showTooltip(d, [
                        ["title", d['properties']['name']],
                        ["", formatTextVrv(dict[d.id].valor*100,parameters.eixo, parameters.var)]
                    ]);
                }

            }
            else if(parameters.var === 9 || parameters.var === 6 || parameters.var === 4){
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor,parameters.eixo, parameters.var)]
                ]);
            }
            else if(parameters.var === 10 || parameters.var === 11) {
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor,parameters.eixo, parameters.var)],
                //    ["", formatTextTaxaparameters.var(dict[d.id].taxa,parameters.eixo, parameters.var)],
                ]);
            }
        }
        else if(parameters.eixo == 2){

            //tooltips com os 3 valores na interface (valor, percentual e taxa)
            if(parameters.var === 1  || parameters.var === 2 || parameters.var === 3 || parameters.var === 4 ||  parameters.var === 5 || parameters.var === 6 || parameters.var === 7 || parameters.var === 8 || parameters.var === 9 || parameters.var === 11 || parameters.var === 12 || parameters.var === 13 || parameters.var == 18 || parameters.var == 19){
                // console.log(dict[d.id])
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor,parameters.eixo, parameters.var)],
                //    ["", formatTextTaxaparameters.var(dict[d.id].percentual,parameters.eixo, parameters.var)],
                ], mapa_box);
            }
            else if(parameters.var === 14){
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor,parameters.eixo, parameters.var)],
                ]);
            }
            else if(parameters.var === 17){

                var SouN = "";
                var valor = "";


                if(dict[d.id].SouN == 0){
                    SouN = "Não Possui";
                    valor =  "";
                }
                else{
                    SouN = "Possui";
                    if(dict[d.id].valor > 0)
                        valor = formatTextVrv(dict[d.id].valor,parameters.eixo, parameters.var) ;
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
        else if(parameters.eixo == 3){
            //tooltips com os 3 valores na interface (valor, percentual e taxa)
            if(parameters.var === 1 || parameters.var === 2){
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor,parameters.eixo, parameters.var)],
                //    ["", formatTextTaxaparameters.var(dict[d.id].percentual,parameters.eixo, parameters.var)],
                ]);
            }
            else if(parameters.var === 99){
                tooltipInstance.showTooltip(d, [
                    ["title", d['properties']['name']],
                    ["", formatTextVrv(dict[d.id].valor,parameters.eixo, parameters.var)],
                ]);

            }

        }
    }
    
};


