var mapa_mundi;

function create_mapa_mundi(mapa_box, gdpData){
    gdpAux = {}; 
    var eixo = parameters.eixo;
    var vrv  = parameters.var;
    var cad = parameters.cad;
    
    for(var data in gdpData){
        if(gdpData[data].id != 0) gdpAux[unconvertCode(gdpData[data].id)] = gdpData[data].valor;
    }

    var minValue = Math.min.apply(null, $.map(gdpAux, function(value, index) {
        return [value];
    }));

    var arrayColors;
    $(function(){
        gdpAux["0"] = minValue;
        
        arrayColors = $.map(COLORS["cadeias"][cad]["gradient"], function(value, index) {
            return [value];
        });
        
        mapa_mundi = new jvm.Map({
            map: 'continents_mill',
            backgroundColor:  "#fff",
            container: $(mapa_box),
            series: {
                regions: [{
                    values: gdpAux,
                    scale: arrayColors
                }]
            },
            onRegionTipShow: function(e, el, code){
                el.html("")
                el.html(el.html()+ '<strong>'+gdpData[convertCode(code)].prc+'</strong>')
                el.html(el.html()+'<br>'+formatTextVrv(gdpData[convertCode(code)].valor, eixo, vrv));
            },
            onRegionClick: function(e, el, code){
                
                if(window.innerWidth <= 1199)
                    return;

                url['prc'] = convertCode(el);

                if(cad == 0){
                    setPercentValueData(gdpData[convertCode(el)]);
                }

                if(parameters.var == 1  || parameters.var == 13){

                    if(gdpData[0].valor == 0)
                        valor = 0
                    else
                        valor = gdpData[convertCode(el)].valor/gdpData[0].valor;

                    setPercentValueData(valor);
                }

                setPrcTitle(gdpData[convertCode(el)].prc)

                $("select[data-id='prc']").val(convertCode(el));
                updateWindowUrl('prc', convertCode(el))
                destacaPrc(el, mapa_box)

                updateIframe()
            }
        })
        destacaPrc(unconvertCode(parseInt(parameters.prc)), mapa_box);
        if(gdpData[0].valor == 0)
            valor = 0
        else
            valor = gdpData[parameters.prc].valor/gdpData[0].valor;
        
        setPercentValueData(valor);

    });


}

function update_mapa_mundi(mapa_box, gdpData){
    mapa_mundi.remove()
    create_mapa_mundi(mapa_box, gdpData)
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

    $(box).find("path").each(function() {
        if($(this).attr("data-code") == prcID) {
            if($(this).attr("class") !== "destacado jvectormap-region jvectormap-element") {
                $(this).attr("class", "destacado jvectormap-region jvectormap-element");
                $(this).attr("data-color", $(this).css("fill"));
                $(this).css("fill", corEixo[2]);
                $(this).animate({"opacity": "1"}, "fast");
            }
        }
        else {
            $(this).attr("class", "jvectormap-region jvectormap-element");
            if($(this).attr("data-color") != undefined) $(this).css("fill", $(this).attr("data-color"));
            $(this).animate({"opacity": "0.7"}, "fast");
        }
    });
}