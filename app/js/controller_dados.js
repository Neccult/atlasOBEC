
/*  --- LISTENERS --- */

function configInfoDataBoxMapa(dados, dict) {

    if(parameters.eixo == 0) {

        if((parameters.cad == 0 && parameters.uf != 0 && parameters.deg == 0) ){
            setPercentValueData(dados.percentual)
        }

        if(parameters.var == 1 && dados != undefined && parameters.deg != 0){
            var total = 0;

            for(i in dict){
                total += dict[i].valor;
            }

            setTerceiroValueData(dados.valor/total)
        }
        else{
            $(".setor-value").css("display", "none")
        }



    }
    else if(parameters.eixo == 1){

        if(parameters.cad == 0 && parameters.uf != 0 && parameters.deg == 0 && (parameters.ocp == 0 || parameters.ocp == 3)){
            setPercentValueData(dados.percentual)
        }

        var total = 0;
        for(i in dict){
            total += dict[i].valor;
        }

        if(parameters.deg == 0 && (parameters.cad == 0 && parameters.uf != 0 && parameters.deg == 0 && (parameters.ocp == 0 || parameters.ocp == 3))){
            setTerceiroValueData(dados.valor/total);
        }


    }
    else if(parameters.eixo == 2){


        if(parameters.cad == 0 && parameters.uf != 0 && parameters.var < 18){
            setPercentValueData(dados.percentual);
        }

    }
    else if(parameters.eixo == 3){

    }
}

function configInfoDataBoxTreemapRegion(dados) {

    if(parameters.eixo == 0 || parameters.eixo == 1) {
        setPercentValueData(dados)
    }
}

function configInfoDataBoxTreemapSCC(dados) {


    if(parameters.eixo == 0){

        if(parameters.cad == 0){
            if(parameters.uf == 0){
                setPercentValueData(1)
            }
        }
        else{
            setPercentValueData(dados.percent)
        }

        if(parameters.deg == 0){
            setTerceiroValueData(dados.valor/brasil_setor[parameters.ano])
        }

    }
    if(parameters.eixo == 1){

        if(((parameters.cad == 0 && parameters.ocp == 0)|| parameters.ocp == 3)  && parameters.deg == 0){

            if(parameters.uf == 0 ){
                setPercentValueData(1)
            }
        }
        else{

            if(parameters.ocp > 0 && parameters.deg != 0){
                // setPercentValueData(dados.percent)
            }
            else if(parameters.cad != 0){
                if(parameters.deg == 0){
                    setPercentValueData(dados.percent)
                }

            }

            if(parameters.deg != 0 && parameters.cad != 0){
                setTerceiroValueData(dados.percent_uf)
            }
        }

    }
    if(parameters.eixo == 2){


        if(parameters.cad == 0 && parameters.uf == 0){
            setPercentValueData(1)
        }

        else if(parameters.cad != 0) {

            setPercentValueData(dados.percent);



        }

    }

}

function configInfoDataBoxBarras(dados, valor, uos) {

    var index_ano = dados.key.indexOf(parameters.ano);

    if(parameters.eixo == 0){

        if(parameters.var == 9){
            valor *= 100;
            setIntegerValueData(valor)

        }
        else if(parameters.var >= 10){
            if(uos == 1){
                setPercentValueData(valor)
            }
            else if(uos == 0){
                setIntegerValueData(valor)
            }
        }
        else{
            setIntegerValueData(valor)
            if(parameters.cad == 0 && parameters.deg > 0 && parameters.uf > 0){
                console.log(valor/total_deg[parameters.ano])
                setPercentValueData(valor/total_deg[parameters.ano])
            }
        }


    }
    else if(parameters.eixo == 1){


        if(parameters.var == 6){
            if(uos == 0){
                setIntegerValueData(valor)

            }
        }
        else if(parameters.var >= 12){
            if(uos == 1){
                setPercentValueData(valor)
            }
            else if(uos == 0){
                setIntegerValueData(valor)
            }
        }
        else{
           setIntegerValueData(valor)

       }

    }
    else if(parameters.eixo == 2){

        if(parameters.var == 10 || parameters.var == 15 || parameters.var == 16){
            if(uos == 1){
                setPercentValueData(valor)
            }
            else if(uos == 0){
                setIntegerValueData(valor)
            }
        }
        else if(parameters.var >= 18 && uos == 1){

            setPercentValueData(valor)
        }
        else{
            setIntegerValueData(valor)

        }



    }
    else if(parameters.eixo == 3){
        var mundo = parameters.mundo;


        if(parameters.var == 5 || parameters.var == 8){
            dados.valor = dados.value[index_ano];

            if(uos == 0){
                setIntegerValueData(dados.valor);
            }
            else if(uos == 2){
                setPercentValueData(dados.valor);
            }
        }
        else if(parameters.var == 1 || parameters.var == 13){

            dados.valor = dados.value[index_ano];
            
            setIntegerValueData(dados.valor);
            if(mundo == 1)
                setPercentValueData(dados.percentual[index_ano]);


        }
        else{
            dados.valor = dados.value[index_ano];

            setIntegerValueData(dados.valor);
            setPercentValueData(dados.percentual[index_ano]);

        }

        setTerceiroValueData(valor, uos);

    }

}

function configInfoDataBoxBarrasStacked(dados, valor, soma) {

    if(parameters.eixo == 1) {
        if(valor == "NaN") {
            valor = 0;
        }

        setIntegerValueData(valor);
        setPercentValueData(valor/soma);
    }
}


/*  --- SETTERS --- */

function setIntegerValueData(value) {
    var description = PT_BR

    var result = getDataVar(description, parameters.eixo, parameters.var);
    sufixo = result.sufixo_valor;
    prefixo = result.prefixo_valor;
    valor = value;

    var literal = formatDecimalLimit(valor, 2);

    if(parameters.eixo == 1 && parameters.var == 2){
        literal = formatDecimalLimit(valor*100, 4);
    }
    else if(parameters.eixo == 1 && parameters.var == 9){
        literal = formatDecimalLimit(valor, 4);
    }

    estado = $(".state-title").first().text()

    $(".integer-value").first().find(".number").first().html(prefixo+literal+sufixo);
    var doc =  $(".integer-value").first().find(".number").first();

    $('.font-title').html("Fonte(s): "+result.fontes);
    setMaxFontSize(doc);

}

function setPercentValueData(valor) {

    if(valor == "NaN"){
        valor = 0;
    }

    var percentual = formatDecimalLimit(valor*100, 2) + "%";

    if(parameters.eixo == 0){

        if(parameters.var == 2 || parameters.var == 3 || parameters.var == 9){
            percentual = "";
        }
        else if(parameters.var >= 10){
            percentual = formatDecimalLimit(valor, 2);
        }

        $(".percent-value").first().find(".number").first().html(percentual);
        var doc =  $(".percent-value").first().find(".number").first();
        setMaxFontSize(doc);
    }
    else if(parameters.eixo == 1){
        if(parameters.var > 11 ){
            percentual = formatDecimalLimit(valor, 2)
        }
        else if(parameters.var == 2 || parameters.var == 11 || parameters.var == 10 ||  parameters.var == 9  || parameters.var == 4 || parameters.var == 5 || parameters.var == 6 || parameters.var == 8){
            percentual = "";
        }            
        
        $(".percent-value").first().find(".number").first().html(percentual);
        var doc =  $(".percent-value").first().find(".number").first();
        setMaxFontSize(doc);
    }
    else if(parameters.eixo == 2){

        if(parameters.var == 6 || parameters.var == 7 || parameters.var == 8 || parameters.var == 9|| parameters.var == 13 || parameters.var == 14 || parameters.var == 17){
            percentual = "";
        }
        else if(parameters.var == 15 || parameters.var == 16){
            percentual = formatDecimalLimit(valor, 2);
        }
        else if(parameters.var == 18){
            percentual = "R$ " + formatDecimalLimit(valor, 2);
        }
        else if(parameters.var == 19){
            percentual = formatDecimalLimit(valor, 2);
        }
        else if(parameters.var == 10){
            percentual = formatDecimalLimit(valor, 2)+'%';
        }
        else{
            percentual = formatDecimalLimit(valor*100, 2)+"%"
        }

        $(".percent-value").first().find(".number").first().html(percentual);
        var doc =  $(".percent-value").first().find(".number").first();
        setMaxFontSize(doc);
    }
    else if(parameters.eixo == 3){
        if(parameters.var == 1 || parameters.var == 13){
            percentual = formatDecimalLimit(valor*100, 2)+"%";
        }
        else if(parameters.var == 5 || parameters.var == 8){
            percentual = formatDecimalLimit(valor, 2);
        }
        else{
            percentual = "";
        }

        $(".percent-value").first().find(".number").first().html(percentual);
        var doc =  $(".percent-value").first().find(".number").first();
        setMaxFontSize(doc);
    }
}

function setTerceiroValueData(value, uos){

    if(parameters.eixo == 0){

        array_variaveis = [1, 4, 5, 6, 7, 8]

        if(array_variaveis.includes(parseInt(parameters.var)) && parameters.uf > 0 && ( parameters.deg > 0 || parameters.cad > 0)){

            $(".setor-value").first().find(".number").first().text(formatDecimalLimit(value*100, 2)+'%');
            $(".setor-value").first().css("display", "flex");

            doc = $(".setor-value").first().find(".number").first();
            setMaxFontSize(doc);
        }
        else{

            $(".setor-value").first().css("display", "none");
        }
    }
    else if(parameters.eixo == 1){
        ocp = $(".bread-select[data-id=ocp]").val() == undefined ? 0 : $(".bread-select[data-id=ocp]").val()
        if(parameters.var == 1 && (parameters.cad > 0 || parameters.ocp != 0 && parameters.ocp != 3) && parameters.uf > 0){
            $(".setor-value").first().find(".number").first().text(formatDecimalLimit(value*100, 2)+'%');
            $(".setor-value").first().css("display", "flex");

            doc = $(".setor-value").first().find(".number").first();
            setMaxFontSize(doc);
        }
        else{
            $(".setor-value").first().css("display", "none");
        }
    }
    else if(parameters.eixo == 3){
        if(parameters.var == 5 || parameters.var == 8){
            if(uos == 1){
                $(".state-title").first().css("display", "none");
                $(".prc-title").first().css("display", "none");
                $(".prc-title").first().css("display", "none");
                desc = $(".percent-value").first().find(".description-number").first().text();
                $(".setor-value").first().find(".number").first().text(formatDecimalLimit(value, 2));
                $(".setor-value").first().find(".description-number").first().text(desc.replace("UF", "SETOR"));
                $(".setor-value").first().css("display", "block");
                doc = $(".setor-value").first().find(".number").first();
                setMaxFontSize(doc);
            }
        } else {
            $(".setor-value").first().css("display", "none");
            $(".state-title").first().css("display", "block");
            $(".prc-title").first().css("display", "block");
        }
    }

}



function updateData(view, dados, valor, uos){

    var eixo = parameters.eixo;
    var vrv = parameters.var;

    var vrvViews = PT_BR.var[eixo].filter(filterByID)[0].views;

    var data = {}


    function filterByID(item) {
        if (item.id == vrv) {
            return item;
        }
    }

    if(view == "mapa"){
        configInfoDataBoxMapa(dados, valor);
    }
    else if(view == "barras"){
        if(!(parameters.eixo == 1 && parameters.var == 6 && parameters.uos == 1) && !(parameters.eixo == 2 && (parameters.var == 18 || parameters.var == 19) && parameters.uos == 1)){
            configInfoDataBoxBarras(dados, valor, uos);
        }
    }
    else if(view == "treemap_scc" ){
        configInfoDataBoxTreemapSCC(dados)
    }
    else if(view == "treemap_region" ){
        configInfoDataBoxTreemapRegion(dados)
    }
    else if(view == "barras_stacked"){
        var soma = uos
        configInfoDataBoxBarrasStacked(dados, valor, soma);

    }





    // if(getNomeUF(parameters.uf) == getSelectedData_Bars().uf){
    //      data['bars'] = getSelectedData_Bars()
    // }
    //
    // data['map'] = getSelectedData_Map();

}

