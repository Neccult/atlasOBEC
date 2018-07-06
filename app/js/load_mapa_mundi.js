function create_mapa_mundi(mapa_box, gdpData){
    gdpAux = {}; 
    var eixo = parameters.eixo;
    var vrv  = parameters.var;
    var cad = parameters.cad;
    for(var data in gdpData){
        if(gdpData[data].id != 0) gdpAux[unconvertCode(gdpData[data].id)] = gdpData[data].valor;
    }

    var maxValue = Math.max.apply(null, $.map(gdpAux, function(value, index) {
        return [value];
    }));

    var minValue = Math.min.apply(null, $.map(gdpAux, function(value, index) {
            return [value];
        }));

    minValue = minValue-(minValue*0.4);
    //distribuicao de frequencias
    var quant = 9;
    var range = maxValue - minValue;
    var amp = minValue < 1 && minValue > -1 ? range / quant : Math.round(range / quant);

    //domino de valores para as cores do mapa
    var dom = [
        (minValue+(amp/4)),
        (minValue+amp),
        (minValue+(2*amp)),
        (minValue+(3*amp)),
        (minValue+(4*amp)),
        (minValue+(5*amp)),
        (minValue+(6*amp)),
        (minValue+(7*amp)),
        (minValue+(8*amp))
    ];

    //ajuste do dominio
    var i = 0;
    if(amp > 1){
        while(i<=9){
            dom[i] = dom[i] - (dom[i] % 5);
            i++;
        }
    }

    var arrayColors;
    $(function(){
        gdpAux["0"] = minValue;
        
        arrayColors = $.map(COLORS["cadeias"][cad]["gradient"], function(value, index) {
            return [value];
        });
        
        $(mapa_box).vectorMap({
            map: 'continents_mill',
            backgroundColor:  "#fff",
            series: {
                regions: [{
                    values: gdpAux,
                    scale: arrayColors,
                }]
            },
            onRegionTipShow: function(e, el, code){
                el.html("")
                el.html(el.html()+ '<strong>'+gdpData[convertCode(code)].prc+'</strong>')
                el.html(el.html()+'<br>'+formatTextVrv(gdpData[convertCode(code)].valor, eixo, vrv));
                // el.html(el.html()+'<br>'+formatTextVrv(gdpData[convertCode(code)].valor, vrv, eixo))
                //el.html(el.html()+'<br>Taxa: '+formatDecimalLimit(gdpData[convertCode(code)].taxa+''), 2);
                // el.html(el.html()+'<br>'+formatTextTaxaVrv(gdpData[convertCode(code)].percentual, eixo, vrv));
            },
            onRegionClick: function(e, el, code){
                
                if(window.innerWidth <= 1199)
                    return;

                var newBarraSrc = $("#view_box_scc").attr("src").replace(/prc=[0-9]*/, "prc="+convertCode(el));
                newBarraSrc = newBarraSrc.replace(/ano=[0-9]*/, "ano="+url['ano']);

                var newDonutSrc = $("#view_box_barras").attr("src").replace(/prc=[0-9]*/, "prc="+convertCode(el));
                newDonutSrc = newDonutSrc.replace(/ano=[0-9]*/, "ano="+url['ano']);

                $("#view_box_scc").attr("src", newBarraSrc);
                $("#view_box_barras").attr("src", newDonutSrc);

                setIntegerValueData(gdpData[convertCode(el)], eixo, vrv);

                if(cad == 0){
                    setPercentValueData(gdpData[convertCode(el)], eixo, vrv);
                }

                if(parameters.var == 1  || parameters.var == 13){

                    if(gdpData[0].valor == 0)
                        valor = 0
                    else
                        valor = gdpData[convertCode(el)].valor/gdpData[0].valor;

                    setPercentValueData({percentual: valor}, eixo, vrv);
                }

                setPrcTitle(gdpData[convertCode(el)].prc)

                $("select[data-id='prc']").val(convertCode(el));
                updateWindowUrl('prc', convertCode(el))
                destacaPrc(el, mapa_box)
            }
        })

        /*dom.forEach(function(dominio, i) {
            if(i == 0) {
                $(mapa_box).append("<div style='position: relative; display: block; float:left; width: 150px; font-size: 10px; color: white;'><div style='margin-right: 5px; display: inline-block; width: 15px; height: 15px; background-color: "+arrayColors[i]+"'></div>Menor que: "+dom[i].toFixed(4)+"</div>");
            }
            else if(i == 8) {
                $(mapa_box).append("<div style='position: relative; display: block; float:left; width: 150px; font-size: 10px; color: white;'><div style='margin-right: 5px; display: inline-block; width: 15px; height: 15px; background-color: "+arrayColors[i]+"'></div>Maior que: "+dom[i].toFixed(4)+"</div>");
            }
            else {
                $(mapa_box).append("<div style='position: relative; display: block; float:left; width: 150px; font-size: 10px; color: white;'><div style='margin-right: 5px; display: inline-block; width: 15px; height: 15px; background-color: "+arrayColors[i]+"'></div>Entre: "+dom[i-1].toFixed(4)+" e "+dom[i].toFixed(4)+"</div>");
            }
                $(mapa_box).children().first().css("margin-bottom", "35px");
        });*/

        destacaPrc(unconvertCode(parseInt(parameters.prc)), mapa_box);
        if(gdpData[0].valor == 0)
            valor = 0
        else
            valor = gdpData[parameters.prc].valor/gdpData[0].valor;
        
        setPercentValueData({percentual: valor}, eixo, vrv);

    });


}

function update_mapa_mundi(mapa_box, gdpData){
    gdpAux = {};
    for(data in gdpData){
        if(gdpData[data].id != 0) gdpAux[unconvertCode(gdpData[data].id)] = gdpData[data].valor;
    }

    var maxValue = Math.max.apply(null, $.map(gdpAux, function(value, index) {
                        return [value];
                    }));

    var minValue = Math.min.apply(null, $.map(gdpAux, function(value, index) {
                        return [value];
                    }));

    minValue = minValue-(minValue*0.4);
}

function convertCode(code) {
    switch(code) {
        case "AF":
            return 1;
        case "NA":
            return 2;
        case "SA":
            return 3;
        case "AS":
            return 4;
        case "EU":
            return 5;
        case "OC":
            return 6;
    }
}
function unconvertCode(code) {
    switch(code) {
        case 1:
            return "AF";
        case 2:
            return "NA";
        case 3:
            return "SA";
        case 4:
            return "AS";
        case 5:
            return "EU";
        case 6:
            return "OC";
    }
}
function destacaPrc(prcID, box) {
    var corEixo = COLORS['eixo'][parameters.eixo].color;
    console.log($(box).find("path"))
    $(box).find("path").each(function() {
        if($(this).attr("data-code") == prcID) {
            if($(this).attr("class") !== "destacado jvectormap-region jvectormap-element") {
                $(this).attr("class", "destacado jvectormap-region jvectormap-element");
                $(this).attr("data-color", '#000');
                $(this).css("fill", '#000');
                $(this).animate({"opacity": "1"}, "fast");
            }
        }
        else {
            $(this).attr("class", "jvectormap-region jvectormap-element");
            if($(this).attr("data-color") != undefined) $(this).css("fill", '#000');
            $(this).animate({"opacity": "0.7"}, "fast");
        }
    });
}