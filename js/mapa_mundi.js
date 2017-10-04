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


var config = "?var="+vrv+"&atc="+atc+"&cad="+cad+"&prt="+prt+"&ocp="+ocp+"&mec="+mec+"&typ="+typ+"&prc="+prc+"&pfj="+pfj+"&ano="+ano+"&eixo="+eixo;
var gdpData;
$.get("./db/json_mapa.php"+config, function(data) {
    gdpData = JSON.parse(data);
    gdpAux = [];
    gdpData.forEach(function(data) {
        gdpAux[unconvertCode(data.id)] = data.valor;
    });

    $(function(){
        console.log(gdpAux);
        $('#corpo-mundi').vectorMap({
            map: 'continents_mill',
            backgroundColor:  "#FFFFFF",
            series: {
                regions: [{
                    values: gdpAux,
                    scale: ['#C8EEFF', '#0071A4'],
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
    });
});