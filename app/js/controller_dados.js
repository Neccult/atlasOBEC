function configInfoDataBoxMapa(eixo, vrv, dadosUF) {

    deg = $('.bread-select[data-id=deg]').first().val()
    if(eixo == 0) {

    }
    else if(eixo == 1){

        if(url['var'] == 1)
            if(url['cad'] == 0 && url['ocp'] == 0 || (url['cad'] == 0 && url['ocp'] == 3))
                if(dadosUF != undefined){
                    if(deg == 0)
                        setPercentValueData({percentual: dadosUF.percentual}, eixo, vrv);
                }



    }
    else if(eixo == 2){

        if(vrv == 17 && url['uf'] > 0){
            setIntegerValueData({valor: dadosUF.valor}, eixo, vrv);
            return
        }



        if(url['cad'] == 0){

            if(dadosUF != undefined)
                setPercentValueData({percentual: dadosUF.percentual}, eixo, vrv);

        }

    }
    else if(eixo == 3){



    }
}

function configInfoDataBoxMapaClick(eixo, vrv, dados) {
    deg = $('.bread-select[data-id=deg]').first().val()
    if(eixo == 0) {

    }
    else if(eixo == 1){

        if(url['cad'] == 0 && url['ocp'] == 0 || (url['cad'] == 0 && url['ocp'] == 3)){
            if(deg == 0)
                setPercentValueData(dados, eixo, vrv);
        }

    }
    else if(eixo == 2){


        setIntegerValueData(dados, eixo, vrv);
        if(url['cad'] == 0 && (vrv < 18)){
            setPercentValueData(dados, eixo, vrv);
        }

    }
    else if(eixo == 3){



    }
}

function configInfoDataBoxTreemapSCC(eixo, vrv, valor,  percent, percent_uf, url, deg_cad, deg_ocp) {

    if(eixo == 0){

        if(url['cad'] != 0){
            if (vrv == 1 || vrv == 3 || vrv == 4 || vrv == 5 || vrv == 6 || vrv == 7 || vrv == 8 ||vrv == 9) {
                setPercentValueData({percentual: percent}, eixo, vrv);
            }
            else{
                setPercentValueData({percentual: percent_uf}, eixo, vrv);
            }
        }
    }
    if(eixo == 1){

        if(url['ocp'] == 0){

            if(url['cad'] != 0) {
                destacaSetor(url['cad']);

                if(parameters.deg == 0){
                    setPercentValueData({percentual: percent, taxa: 0}, eixo, vrv);
                }
                else{

                    setIntegerValueData({valor: valor, taxa: 0}, eixo, vrv);
                    //setPercentValueData({percentual: parseFloat(percent_uf) , taxa: 0}, eixo, vrv);
                    setTerceiroValueData(eixo, vrv, deg_cad, url['cad']);

                }
                // setIntegerValueData({valor: valor, taxa: 0}, eixo, vrv);
            }
        }
        else{

            if(url['deg'] == 0 || parameters.deg == 0){
                if(url['ocp'] != 3){
                    setPercentValueData({percentual: percent, taxa: 0}, eixo, vrv);
                }
            }
        }


    }
    if(eixo == 2){
        // if(url['cad'] != 0) {
        //
        //     if(chg == 1) {
        //         destacaSetor(url['cad']);
        //         return;
        //     }
        //
        //     if(uf == 0 && deg == 0){
        //         setPercentValueData({percentual: percent_uf, taxa: 0}, eixo, vrv);
        //     }
        //     else if(deg != 0 && uf == 0) {
        //         setIntegerValueData({valor: deg_cad, taxa: 0}, eixo, vrv);
        //         setPercentValueData({percentual: percent_uf, taxa: 0}, eixo, vrv);
        //     }
        //
        //     destacaSetor(url['cad']);
        // }
        //
        // if(url['ocp'] != 0) {
        //     if(chg == 1) {
        //         destacaSetor(url['ocp']);
        //         return;
        //     }
        //     if(uf == 0 && deg == 0){
        //         setPercentValueData({percentual: percent, taxa: 0}, eixo, vrv);
        //     }
        //     else if(deg != 0 && uf == 0) {
        //         setIntegerValueData({valor: deg_ocp, taxa: 0}, eixo, vrv);
        //         setPercentValueData({percentual: percent, taxa: 0}, eixo, vrv);
        //     }
        //
        //     destacaSetor(url['ocp']);
        // }

        if(url['cad'] != 0) {

            destacaSetor(url['cad']);
            // setIntegerValueData({valor: valor, taxa: 0}, eixo, vrv);
            setPercentValueData({percentual: percent, taxa: 0}, eixo, vrv);

        }
        else
        if(url['uf'] != 0) {

            //setPercentValueData({percentual: 1, taxa: 0}, eixo, vrv);
        }




    }

}

function configInfoDataBoxTreemapSCCClick(eixo, vrv, d, root, deg, valor, percent, percent_uf, data_cad) {

    if(eixo == 0) {
        if(vrv == 2 && url['uf'] == 0){
            //setIntegerValueData({valor: d.data.size*100}, eixo, vrv);
        }
        else if(vrv == 2 && url['uf'] != 0){
            //setIntegerValueData({valor: d.data.size}, eixo, vrv);
        }
        else if(vrv == 4 && url['uf'] == 0){
            setIntegerValueData({valor: d.data.size}, eixo, vrv);
        }

        else if(vrv == 9 && url['uf'] == 0){
            setIntegerValueData({valor: d.data.size}, eixo, vrv);
        }

        if (vrv == 1 || vrv == 3 || vrv == 4 || vrv == 5 || vrv == 6 || vrv == 7 || vrv == 8 ||vrv == 9) {
            setPercentValueData({percentual: percent}, eixo, vrv);
        }

    }
    else if(eixo == 1) {

        if(deg == 0){
            setIntegerValueData({valor: d.value}, eixo, vrv);
            setPercentValueData({percentual: d.data.size / root.value}, eixo, vrv);
        }
        else{
            setIntegerValueData({valor: d.value}, eixo, vrv);
            setPercentValueData({percentual: percent_uf}, eixo, vrv);
            setTerceiroValueData(eixo, vrv, data_cad, url['cad']);
        }
    }
    else if(eixo === 2){
        setIntegerValueData({valor: d.value}, eixo, vrv);
        setPercentValueData({percentual: d.data.size / root.value}, eixo, vrv);
    }
}

function configInfoDataBoxTreemapSCCOcupation(eixo, vrv, d, root, deg, valor, percent, percent_uf) {
    if(eixo == 1) {
        destacaSetor(d.data.colorId);


        if(url['deg'] == 0 || deg == 0){
            setIntegerValueData({valor: valor, taxa: 0}, eixo, vrv);
            setPercentValueData({percentual: percent, taxa: 0}, eixo, vrv);
        }
        else{
            setIntegerValueData({valor: valor, taxa: 0}, eixo, vrv);
            setPercentValueData({percentual:  percent , taxa: 0}, eixo, vrv);
        }
        setIntegerValueData({valor: valor, taxa: 0}, eixo, vrv);
    }
}

function configInfoDataBoxBarras(dados, valor, uos) {
    var index_ano = dados.key.indexOf(parameters.ano);


    if(parameters.eixo == 0){

        first_year = Number(dados.key[0]);
        if(parameters.var == 3 || parameters.var == 9 ){

            if(parameters.uf != 0){
                dados.valor = dados.value[index_ano]/100;
            }
            else{
                dados.valor = dados.value[index_ano]/100;
            }
            setPercentValueData({percentual: 1, taxa: dados.taxa[index_ano]});


            setIntegerValueData(dados);
        }
        else if(parameters.uf == 0 && parameters.cad == 0 && parameters.deg == 0 && parameters.var < 10){
            if(parameters.var !== 3){
                setPercentValueData({percentual: 1, taxa: dados.taxa[index_ano]});
                dados.valor = dados.value[dados.key.indexOf(parameters.ano)];

                setIntegerValueData(dados);
            }
            else{
                setPercentValueData({percentual: 1, taxa: dados.taxa[index_ano]});
                if(parameters.uf == 0){
                    dados.valor = dados.value[index_ano]/100;
                }
                else{
                    dados.valor = dados.value[index_ano]/100;
                }
                setIntegerValueData(dados);
            }
        }
        else if(parameters.var > 9){
            if(parameters.ano != null) {
                dados.valor = dados.value[index_ano];

                if(parameters.uos == 0){
                    setIntegerValueData(dados);
                } else if(parameters.uos == 1){
                    setPercentValueData(dados);
                }

            }
        }
        else{
            dados.valor = dados.value[index_ano];

            setIntegerValueData(dados);
            if(parameters.cad == 0)
                setPercentValueData({percentual: dados.percentual[index_ano]})
        }
        setTerceiroValueData(dados.percentual_setor[index_ano]);

    }
    else if(parameters.eixo == 1){

        if(parameters.var > 11){
            if(parameters.ano != null) {
                dados.valor = dados.value[index_ano];
                if(parameters.slc == 0){
                    if(parameters.uos == 0){
                        setIntegerValueData(dados);
                    }
                    else if(parameters.uos == 1){
                        setPercentValueData(dados);
                    }
                }
                else{
                    if(parameters.ocp == 1){
                        setIntegerValueData(dados);
                    }
                    else if(parameters.ocp == 2){
                        setPercentValueData(dados);
                    }
                }


            }
        }
        else if(parameters.uf == 0 && (parameters.cad == 0 || parameters.ocp == 3)){
            ocp_real = 3;

            if(parameters.ocp > 0){
                ocp_real = $('.bread-select[data-id=ocp]').val()
            }
            if(ocp_real == 3){
                setPercentValueData({percentual:1 , taxa: dados.taxa[index_ano]});
            }
            dados.valor = dados.value[index_ano];

            if(parameters.var == 2 && parameters.ocp == 0){
                dados.valor = dados.value[index_ano]*100;
            }

            setIntegerValueData(dados);

        }
        else {
            dados.valor = dados.value[index_ano];

            if(parameters.var == 2 && parameters.ocp == 0){
                dados.valor = dados.value[index_ano]*100;
            }

            setIntegerValueData(dados);
        }

        setTerceiroValueData(dados.percentual[index_ano]);

    }
    else if(parameters.eixo == 2){

        if(parameters.var == 15 || parameters.var == 16){
            if(uos == 0){
                dados.valor = dados.value[index_ano]
                setIntegerValueData(dados, eixo, vrv)
            }else{
                setPercentValueData({percentual: dados.value[index_ano], taxa: dados.taxa[index_ano]}, eixo, vrv)
            }

        }
        else if(parameters.var == 17){

        }
        else if(parameters.var == 19 && parameters.mec == 1){

            var soma = 0;

            for(var key in dados.value){
                if(key != "remove")
                    soma += dados.value[key];
            }

            dados.valor = dados.value[index_ano]

            setIntegerValueData(dados, eixo, vrv)
            setPercentValueData({valor: formatTextVrv(soma, eixo, vrv)}, eixo, vrv)


        }
        else if(parameters.var == 10){
            if(url['mec'] == 0){
                dados.valor = dados.value[index_ano]
                setIntegerValueData(dados, eixo, vrv)
            }else{
                setPercentValueData({percentual: dados.value[index_ano], taxa: dados.taxa[index_ano]}, eixo, vrv)
            }
        }
        else if(parameters.var == 6 || parameters.var == 7 || parameters.var == 8 || parameters.var == 9 || parameters.var == 13){

            // VARIAVEIS QUE NAO  TEM TREEMAP!!!
            dados.valor = dados.value[index_ano];

            setIntegerValueData(dados, eixo, vrv);
            setPercentValueData({percentual: 1, taxa: dados.taxa[index_ano]}, eixo, vrv);

        }
        else{
            if(parameters.uf == 0){

                dados.valor = dados.value[index_ano];

                setIntegerValueData(dados);
                if(parameters.cad == 0){
                    setPercentValueData({percentual: 1, taxa: dados.taxa[index_ano]});
                }
            }
            else{
                    dados.valor = dados.value[index_ano];
                    dados.percentual = dados.percentual[index_ano];

                    setIntegerValueData(dados);
            }
        }


    }
    else if(parameters.eixo == 3){
        var mundo = parameters.mundo;

        if(parameters.var == 5 || parameters.var == 8){
            dados.valor = dados.value[index_ano];

            if(parameters.uos == 0){
                setIntegerValueData(dados);
            }
            else if(parameters.uos == 2){
                setPercentValueData(dados);
            }
        }
        else if(parameters.var == 1 || parameters.var == 13){

            dados.valor = dados.value[index_ano];
            dados.percentual = dados.percentual[index_ano];

            setIntegerValueData(dados);
            if(mundo == 1)
                setPercentValueData({percentual: dados.percentual});


        }
        else{
            dados.valor = dados.value[index_ano];

            setIntegerValueData(dados);
            setPercentValueData({percentual : dados.percentual[index_ano]});

        }

        setTerceiroValueData(valor, uos);

    }
}

function configInfoDataBoxBarrasClick(eixo, vrv, dados, i, valor) {

    if(parameters.eixo == 0) {
        if (parameters.var == 3) {
            dados.valor = dados.value[i] / 100;
            setIntegerValueData(dados, eixo, vrv);
        }
        else if (parameters.var == 1) {
            dados.valor = dados.value[i];
            setIntegerValueData(dados, eixo, vrv);
            if(parameters.cad == 0)
                setPercentValueData({percentual: dados.percentual[i], taxa: dados.taxa[i]}, eixo, vrv)
        }
        else if (parameters.var == 2) {
            if(parameters.uf == 0){
                dados.valor = dados.value[i];
                setIntegerValueData(dados, eixo, vrv);
            }
            else if(parameters.uf != 0){
                dados.valor = dados.value[i];
                setIntegerValueData(dados, eixo, vrv);
                //setPercentValueData({percentual: dados.percentual[i], taxa: dados.taxa[i]}, eixo, vrv);
            }
        }
        else if (parameters.var == 9) {
            dados.valor = dados.value[i]/100;
            setIntegerValueData(dados, eixo, vrv);
        }
        else if (parameters.var >= 4 && parameters.var <= 8) {
            dados.valor = dados.value[i];
            setIntegerValueData(dados, eixo, vrv);
            if(parameters.cad == 0)
                setPercentValueData({percentual: dados.percentual[i]}, eixo, vrv);
        }
        else if (parameters.var > 9) {
            dados.valor = dados.value[i];
            if(parameters.uos == 0){
                setIntegerValueData(dados, eixo, vrv);
            }
            else if(parameters.uos == 1){
                setPercentValueData(dados, eixo, vrv);
            }
        }

        setTerceiroValueData(parameters.eixo, parameters.var, dados.percentual_setor[i], parameters.cad);


    }
    else if(eixo == 1){

        if(vrv >= 12){
            dados.valor = dados.value[i];
            if(parameters.uos == 0){
                setIntegerValueData(dados, eixo, vrv);
            } else if(parameters.uos == 1){
                setPercentValueData({valor: dados.value[i]}, eixo, vrv);
            }
        }
        else{

            dados.valor = dados.value[i]

            if(url['var'] == 2)
                if(url['ocp'] == 0)
                    dados.valor = dados.value[i]*100;


            setIntegerValueData(dados, eixo, vrv);

            //setTerceiroValueData(eixo, vrv, dados.percentual[i], url['cad']);
            //setPercentValueData({percentual: dados.percentual[i]}, eixo, vrv);
        }
    }
    else if(eixo == 2){

        if(vrv == 1 || vrv == 2 || vrv == 3 || vrv == 4 || vrv == 5 || vrv == 6 || vrv == 7 || vrv == 8 || vrv == 9 || vrv == 11 || vrv == 12 || vrv == 13 || vrv == 14 || vrv == 18 || vrv == 19){
            dados.valor = dados.value[i];
            setIntegerValueData(dados, eixo, vrv);
        }
        else if(vrv == 17){
            dados.valor = dados.value[i];
            setIntegerValueData(dados, eixo, vrv);
        }
        else if(vrv == 15 || vrv == 16){
            dados.valor = dados.value[i];
            if(parameters.uos == 0){
                setIntegerValueData(dados, eixo, vrv);
            } else if(parameters.uos == 1){
                setPercentValueData({percentual: dados.value[i]}, eixo, vrv);
            }
        }
        else if(vrv == 10){
            dados.valor = dados.value[i];
            if(url["mec"] == 0){
                setIntegerValueData(dados, eixo, vrv);
            } else if(url["mec"] == 1){
                setPercentValueData({percentual: dados.value[i]}, eixo, vrv);
            }
        }


    }
    else if(eixo == 3){
        if(parameters.var == 5 || parameters.var == 8){
            dados.valor = dados.value[i];

            if(parameters.cad == 0){
                setIntegerValueData(dados, eixo, vrv);
            } else if(url['cad'] == 2){
                setPercentValueData(dados, eixo, vrv);
            }
        }
        else if(parameters.cad == 1 || parameters.var == 13){
        }
        else{
            dados.valor = dados.value[i];

            setIntegerValueData(dados, eixo, vrv);
            setPercentValueData({percentual : dados.percentual[i]}, eixo, vrv);

        }

    }
}

function configInfoDataBoxBarrasStacked(valor, soma) {

    if(parameters.eixo == 1) {
        if(valor == "NaN") {
            valor = 0;
        }

        setIntegerValueData({valor: valor});
        setPercentValueData({percentual: valor/soma});
    }
}

function configInfoDataBoxBarrasStackedClick(valor, soma) {
    if(parameters.eixo == 1) {
        if(valor == "NaN") {
            valor = 0;
        }
        setIntegerValueData({valor: valor});
        setPercentValueData({percentual: valor/soma});
    }
}

function updateData(view){

    var eixo = parameters.eixo;
    var vrv = parameters.var;

    var vrvViews = PT_BR.var[eixo].filter(filterByID)[0].views;

    var data = {}


    function filterByID(item) {
        if (item.id == vrv) {
            return item;
        }
    }

    console.log(view)

   // if(getNomeUF(parameters.uf) == getSelectedData_Bars().uf){
   //      data['bars'] = getSelectedData_Bars()
   // }
   //
   // data['map'] = getSelectedData_Map();

}


function getSelectedData_Map(){

    return data_mapa[parameters.uf];

}

function getSelectedData_Bars(){

    return data_barra[parameters.ano];

}