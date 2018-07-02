function create_mapa_mundi(mapa_box, data){

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