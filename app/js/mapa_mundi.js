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
function destacaPrc(prcID) {
    $("path").each(function() {
        if($(this).attr("data-code") == prcID) {
            if($(this).attr("class") !== "destacado jvectormap-region jvectormap-element") {
                $(this).attr("class", "destacado jvectormap-region jvectormap-element");
                $(this).attr("data-color", $(this).css("fill"));
                $(this).css("fill", "#6DBFC9");
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
// import colors.json file
var colorJSON;

d3.json('data/colors.json', function(error, data) {
    if(error) throw error;

    var colorJSON = data;

    var config = "?var="+vrv+"&uf="+uf+"&atc="+atc+"&cad="+cad+"&prt="+prt+"&ocp="+ocp+"&mec="+mec+"&typ="+typ+"&prc="+prc+"&pfj="+pfj+"&ano="+ano+"&eixo="+eixo+"&slc="+slc;
    var gdpData;
    $.get("./db/json_mapa.php"+config, function(data) {
        gdpData = JSON.parse(data);
        gdpAux = {};
        for(var data in gdpData){
            if(gdpData[data].id != 0) gdpAux[unconvertCode(gdpData[data].id)] = gdpData[data].valor;
        }



        // gdpData.forEach(function(data) {
        //     if(data.id != 0) gdpAux[unconvertCode(data.id)] = data.valor;
        // });

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
            arrayColors = $.map(colorJSON["cadeias"][cad]["gradient"], function(value, index) {
                return [value];
            });

            $('#corpo-mundi').vectorMap({
                map: 'continents_mill',
                backgroundColor:  "#f0f0f0",
                series: {
                    regions: [{
                        values: gdpAux,
                        scale: arrayColors,
                    }]
                },
                onRegionTipShow: function(e, el, code){
                    el.html("")
                    el.html(el.html()+ '<strong>'+gdpData[convertCode(code)].prc+'</strong>')
                    // el.html(el.html()+'<br>'+formatTextVrv(gdpData[convertCode(code)].valor, vrv, eixo))
                    el.html(el.html()+'<br>'+formatTextVrv(gdpData[convertCode(code)].valor, eixo, vrv));
                    //el.html(el.html()+'<br>Taxa: '+formatDecimalLimit(gdpData[convertCode(code)].taxa+''), 2);
                    // el.html(el.html()+'<br>'+formatTextTaxaVrv(gdpData[convertCode(code)].percentual, eixo, vrv));
                },
                onRegionClick: function(e, el, code){

                    if(window.parent.innerWidth <= 1199)
                        return;

                    var newBarraSrc = $(window.parent.document).find("#view_box_scc").attr("src").replace(/prc=[0-9]*/, "prc="+convertCode(el));
                    newBarraSrc = newBarraSrc.replace(/ano=[0-9]*/, "ano="+url['ano']);
                    var newDonutSrc = $(window.parent.document).find("#view_box_barras").attr("src").replace(/prc=[0-9]*/, "prc="+convertCode(el));
                    newDonutSrc = newDonutSrc.replace(/ano=[0-9]*/, "ano="+url['ano']);
                    $(window.parent.document).find("#view_box_scc").attr("src", newBarraSrc);
                    $(window.parent.document).find("#view_box_barras").attr("src", newDonutSrc);

                    setIntegerValueData(gdpData[convertCode(el)], eixo, vrv);

                    if(cad == 0){
                        setPercentValueData(gdpData[convertCode(el)], eixo, vrv);
                    }

                    if(url['var'] == 1  || url['var'] == 13){

                        if(gdpData[0].valor == 0)
                            valor = 0
                        else
                            valor = gdpData[convertCode(el)].valor/gdpData[0].valor;

                        setPercentValueData({percentual: valor}, eixo, vrv);
                    }

                    setPrcTitle(gdpData[convertCode(el)].prc)

                    $(window.parent.document).find("select[data-id='prc']").val(convertCode(el));
                    destacaPrc(el)
                }
            })



            dom.forEach(function(dominio, i) {
                if(i == 0) $("#corpo-mundi").append("<div style='position: relative; display: block; float:left; width: 150px; font-size: 10px; color: white;'><div style='margin-right: 5px; display: inline-block; width: 15px; height: 15px; background-color: "+arrayColors[i]+"'></div>Menor que: "+dom[i].toFixed(4)+"</div>");
                else if(i == 8) $("#corpo-mundi").append("<div style='position: relative; display: block; float:left; width: 150px; font-size: 10px; color: white;'><div style='margin-right: 5px; display: inline-block; width: 15px; height: 15px; background-color: "+arrayColors[i]+"'></div>Maior que: "+dom[i].toFixed(4)+"</div>");
                else $("#corpo-mundi").append("<div style='position: relative; display: block; float:left; width: 150px; font-size: 10px; color: white;'><div style='margin-right: 5px; display: inline-block; width: 15px; height: 15px; background-color: "+arrayColors[i]+"'></div>Entre: "+dom[i-1].toFixed(4)+" e "+dom[i].toFixed(4)+"</div>");
                $("#corpo-mundi").children().first().css("margin-bottom", "35px");
            });
            
            //setPercentValueData({percentual: 1}, eixo, vrv);
            //if(url['prc'] != 0 ){
            destacaPrc(unconvertCode(parseInt(url['prc'])));


            if(gdpData[0].valor == 0)
                valor = 0
            else
                valor = gdpData[url['prc']].valor/gdpData[0].valor;

            setPercentValueData({percentual: valor}, eixo, vrv);

            //}



        });


    });
});





