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
    d3.json("./data/br-min.json", function(br_states){
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
    
            if(parameters.uf == 0)
                setIntegerValueData({valor: soma},parameters.eixo, parameters.var);
    
        }
    
        var tooltipInstance = tooltip.getInstance();
        
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
                        if(color(dict[d.id]) == undefined)
                            return color(dict);
                        else
                            return color((dict[d.id].valor))
                    }
                })
                .attr("d", path)
    
        if(parameters.eixo == 2 && parameters.var == 17){
            legendaBinario();
        }
        else{
            escalaMapa();
        }    
    })
    

}