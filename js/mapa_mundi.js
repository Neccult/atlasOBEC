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

// import colors.json file
var colorJSON;
d3.json('data/colors.json', function(error, data) {
    if(error) throw error;

    colorJSON = data;
});

var config = "?var="+vrv+"&atc="+atc+"&cad="+cad+"&prt="+prt+"&ocp="+ocp+"&mec="+mec+"&typ="+typ+"&prc="+prc+"&pfj="+pfj+"&ano="+ano+"&eixo="+eixo;
var gdpData;
$.get("./db/json_mapa.php"+config, function(data) {
    gdpData = JSON.parse(data);
    gdpAux = {};
    gdpData.forEach(function(data) {
        if(data.id != 0) gdpAux[unconvertCode(data.id)] = data.valor;
    });
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

    console.log(dom);

    var arrayColors;
    $(function(){
        console.log(gdpAux);
        gdpAux["0"] = minValue;
        arrayColors = $.map(colorJSON["cadeias"][cad]["gradient"], function(value, index) {
            return [value];
        });
        $('#corpo-mundi').vectorMap({
            map: 'continents_mill',
            backgroundColor:  "#FFFFFF",
            series: {
                regions: [{
                    values: gdpAux,
                    scale: arrayColors,
                    normalizeFunction: 'polynomial'
                }]
            },
            onRegionTipShow: function(e, el, code){
                console.log(gdpData[convertCode(code)].valor);
                el.html(el.html()+'<br>Valor: '+gdpData[convertCode(code)].valor+'');
                el.html(el.html()+'<br>Taxa: '+gdpData[convertCode(code)].taxa+'');
                el.html(el.html()+'<br>Percentual: '+gdpData[convertCode(code)].percentual+'');
            }
        });
        dom.forEach(function(dominio, i) {
            console.log(arrayColors);
            if(i == 0) $("#corpo-mundi").append("<div style='position: relative; display: block; float:left; width: 150px; font-size: 10px; color: white;'><div style='margin-right: 5px; display: inline-block; width: 15px; height: 15px; background-color: "+arrayColors[i]+"'></div>Menor que: "+dom[i].toFixed(4)+"</div>");
            else if(i == 8) $("#corpo-mundi").append("<div style='position: relative; display: block; float:left; width: 150px; font-size: 10px; color: white;'><div style='margin-right: 5px; display: inline-block; width: 15px; height: 15px; background-color: "+arrayColors[i]+"'></div>Maior que: "+dom[i].toFixed(4)+"</div>");
            else $("#corpo-mundi").append("<div style='position: relative; display: block; float:left; width: 150px; font-size: 10px; color: white;'><div style='margin-right: 5px; display: inline-block; width: 15px; height: 15px; background-color: "+arrayColors[i]+"'></div>Entre: "+dom[i-1].toFixed(4)+" e "+dom[i].toFixed(4)+"</div>");
            $("#corpo-mundi").children().first().css("margin-bottom", "35px");
        });
    });
});