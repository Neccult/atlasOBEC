function changeDownloadURL(url, eixo){
    newURL = $('#select-pdf input').attr("value").replace(/download.php?.*/, "download.php?"+ url);
    $('#select-pdf input').attr("value", newURL)
    vrv = parseInt(url.match(/var=[0-9]+/)[0].replace("var=", ''))
    ocp = url.match(/ocp=[0-9]+/)[0].replace("ocp=", '')

    diretorio = ''


    if(eixo == "comercio"){
        slc = url.match(/slc=[0-9]+/)[0].replace("slc=", '')
        switch(slc){
            case '0': diretorio = 'bens/'; break;
            case '1': diretorio = 'servicos/'; break;
        }
    }
    if(eixo == "mercado"){
        switch(ocp){
            case '0': diretorio = 'setorial/'; break;
            case '1': diretorio = 'atividades_relacionadas/'; break;
            case '2': diretorio = 'cultura/'; break;
            case '3': diretorio = "atividades_relacionadas/"; break;
        }
    
    }
    
    $.get('./data/csv_files.json', function(data){
        var name_url;
        console.log(diretorio)
        if(diretorio != '')
            dados = data[eixo][diretorio]
        else
            dados = data[eixo]
        name_url = dados.filter(function( obj ) {
            return obj.id == vrv;
        })[0].file_name;

        newURL = $('#select-csv input').attr("value").replace(/csv\/.*/, "csv/"+eixo+"/"+diretorio+name_url)
        $('#select-csv input').attr("value", newURL)
    })
}

function ajustaAnos(keys) {
	for(var i = 0; i < keys.length; i++) {
		keys[i] = keys[i+1];
    }
    keys.pop();
	return keys;
}

function getNomeUF(idUF){

    idUF = parseInt(idUF);

    switch(idUF){
        case 0: return "Brasil";
        case 11: return "Rondônia";
        case 12: return "Acre";
        case 13: return "Amazonas";
        case 14: return "Roraima";
        case 15: return "Pará";
        case 16: return "Amapá";
        case 17: return "Tocantins";
        case 21: return "Maranhão";
        case 22: return "Piauí";
        case 23: return "Ceará";
        case 24: return "Rio Grande do Norte";
        case 25: return "Paraíba";
        case 26: return "Pernambuco";
        case 27: return "Alagoas";
        case 28: return "Sergipe";
        case 29: return "Bahia";
        case 31: return "Minas Gerais";
        case 32: return "Espírito Santo";
        case 33: return "Rio de Janeiro";
        case 35: return "São Paulo";
        case 41: return "Paraná";
        case 42: return "Santa Catarina";
        case 43: return "Rio Grande do Sul";
        case 50: return "Mato Grosso do Sul";
        case 51: return "Mato Grosso";
        case 52: return "Goiás";
        case 54: return "Distrito Federal";
    }
}


function configInfoDataBoxMapa(eixo, vrv, dadosUF) {


    if(eixo == 0) {

    }
    else if(eixo == 1){


        if(url['var'] == 1)
            if(url['cad'] == 0 && url['ocp'] == 0 || (url['cad'] == 0 && url['ocp'] == 3))
                if(dadosUF != undefined){
                    setPercentValueData({percentual: dadosUF.percentual}, eixo, vrv);
                }
                    


    }
    else if(eixo == 2){

        if(vrv == 17){
            setPercentValueData ({percentual: 1}, eixo, vrv);
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

    if(eixo == 0) {

    }
    else if(eixo == 1){

        if(url['cad'] == 0 && url['ocp'] == 0 || (url['cad'] == 0 && url['ocp'] == 3)){
            setPercentValueData(dados, eixo, vrv);
        }

    }
    else if(eixo == 2){

        setIntegerValueData(dados, eixo, vrv);
        if(url['cad'] == 0){
            setPercentValueData(dados, eixo, vrv);
        }

    }
    else if(eixo == 3){



    }
}

function configInfoDataBoxTreemapSCC(eixo, vrv, valor,  percent, percent_uf, url, deg_cad, deg_ocp, chg) {

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

                if(deg == 0){
                    setPercentValueData({percentual: percent, taxa: 0}, eixo, vrv);
                }
                else{
                    setIntegerValueData({valor: valor, taxa: 0}, eixo, vrv);
                    setPercentValueData({percentual: parseFloat(percent_uf) , taxa: 0}, eixo, vrv);
                }
                // setIntegerValueData({valor: valor, taxa: 0}, eixo, vrv);
            }
        }
        else{
            if(url['deg'] == 0 || deg == 0){
                if(url['ocp'] != 3)
                    setPercentValueData({percentual: percent, taxa: 0}, eixo, vrv);

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
            setIntegerValueData({valor: valor, taxa: 0}, eixo, vrv);
            setPercentValueData({percentual: percent, taxa: 0}, eixo, vrv);

        }
        else
            if(url['uf'] != 0) {

                //setPercentValueData({percentual: 1, taxa: 0}, eixo, vrv);
            }




    }

}

function configInfoDataBoxTreemapSCCClick(eixo, vrv, d, root, deg, valor, percent, percent_uf) {
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
        // setIntegerValueData({valor: valor, taxa: 0}, eixo, vrv);
    }
}

function configInfoDataBoxBarras(eixo, vrv, dados, valor, cad) {

    if(eixo == 0){
        first_year = Number(dados.key[0]);
        index_ano = dados.key.indexOf(url['ano'])
         if(vrv == 3 || vrv == 9 ){
            if(url['uf'] != 0){
                dados.valor = dados.value[dados.key.indexOf(url['ano'])]/100;
            }
            else{
                dados.valor = dados.value[dados.key.indexOf(url['ano'])]/100;
            }
            setPercentValueData({percentual: 1, taxa: dados.taxa[url['ano']-2007]}, eixo, vrv);
            setIntegerValueData(dados, eixo, vrv);
        }
        else if(url['uf'] == 0 && url['cad'] == 0 && url['deg'] == 0 && vrv < 10){
            if(vrv !== 3){
                setPercentValueData({percentual: 1, taxa: dados.taxa[url['ano']-2007]}, eixo, vrv);
                dados.valor = dados.value[dados.key.indexOf(url['ano'])];
                setIntegerValueData(dados, eixo, vrv);
            }
            else{
                setPercentValueData({percentual: 1, taxa: dados.taxa[url['ano']-2007]}, eixo, vrv);
                if(url['uf'] == 0){
                    dados.valor = dados.value[dados.key.indexOf(url['ano'])]/100;

                }
                else{
                    dados.valor = dados.value[dados.key.indexOf(url['ano'])]/100;
                }
                setIntegerValueData(dados, eixo, vrv);
            }
        }
        else if(vrv > 9){
            if(ano != null) {
                dados.valor = dados.value[dados.key.indexOf(url['ano'])];

                if(url['uos'] == 0){
                    setIntegerValueData(dados, eixo, vrv);
                } else if(url['uos'] == 1){
                    setPercentValueData(dados, eixo, vrv);
                }

            }
        }
        else{
            dados.valor = dados.value[dados.key.indexOf(url['ano'])];
            setIntegerValueData(dados, eixo, vrv);
            if(url['cad'] == 0)
                setPercentValueData({percentual: dados.percentual[index_ano]}, eixo, vrv)
        }

    }
    else if(eixo == 1){
        // first_year = Number(dados.key[0]);
        index_ano = dados.key.indexOf(url['ano'])
        if(vrv > 11){
            if(ano != null) {
                dados.valor = dados.value[index_ano];
                if(url['uos'] == 0){
                    setIntegerValueData(dados, eixo, vrv);
                } else if(url['uos'] == 1){

                    setPercentValueData(dados, eixo, vrv);
                }

            }
        }
        else if(url['uf'] == 0 && (url['cad'] == 0 || url['ocp'] == 3)){
            ocp_real = 3
            if(url['ocp'] > 0){
                ocp_real = $(window.parent.document).find('.bread-select[data-id=ocp]').val()
            }
            if(ocp_real == 3)
                setPercentValueData({percentual:1 , taxa: dados.taxa[url['ano']-2007]}, eixo, vrv);
            dados.valor = dados.value[dados.key.indexOf(url['ano'])];

            if(url['var'] == 2 && url['ocp'] == 0)
                dados.valor = dados.value[dados.key.indexOf(url['ano'])]*100;

            setIntegerValueData(dados, eixo, vrv);

        }
        else {
            dados.valor = dados.value[dados.key.indexOf(url['ano'])];

            if(url['var'] == 2 && url['ocp'] == 0)
                dados.valor = dados.value[dados.key.indexOf(url['ano'])]*100;
            setIntegerValueData(dados, eixo, vrv);

        }

        setTerceiroValueData(eixo, vrv, dados.percentual[index_ano], url['cad']);  

    }
    else if(eixo == 2){


        indexAno = dados.key.indexOf(url['ano'])
        if(vrv == 15 || vrv == 16){
            if(url['uos'] == 0){
                dados.valor = dados.value[indexAno]
                setIntegerValueData(dados, eixo, vrv)
            }else{
                setPercentValueData({percentual: dados.value[indexAno], taxa: dados.taxa[indexAno]}, eixo, vrv)
            }
                
        }
        else if(vrv == 17){

        }
        else if(vrv == 10){
            if(url['mec'] == 0){
                dados.valor = dados.value[indexAno]
                setIntegerValueData(dados, eixo, vrv)
            }else{
                setPercentValueData({percentual: dados.value[indexAno], taxa: dados.taxa[indexAno]}, eixo, vrv)
            }
        }
        else if(vrv == 6 || vrv == 7 || vrv == 8 || vrv == 9 || vrv == 13){

            // VARIAVEIS QUE NAO  TEM TREEMAP!!!
            dados.valor = dados.value[indexAno];

            setIntegerValueData(dados, eixo, vrv);
            setPercentValueData({percentual: 1, taxa: dados.taxa[indexAno]}, eixo, vrv);

        }
        else{
            if(url['uf'] == 0){

                dados.valor = dados.value[indexAno];

                setIntegerValueData(dados, eixo, vrv);
                if(url['cad'] == 0){
                    setPercentValueData({percentual: 1, taxa: dados.taxa[indexAno]}, eixo, vrv);
                }
            }
            else{
                if(url['cad'] == 0){
                    dados.valor = dados.value[indexAno];
                    dados.percentual = dados.percentual[indexAno];
                   // console.log(dados)
                    setIntegerValueData(dados, eixo, vrv);
                    //setPercentValueData(dados, eixo, vrv);

                }
            }
        }
        
        
    }
    else if(eixo == 3){
        indexAno = dados.key.indexOf(url['ano'])

        var mundo = 0;
        var mundoRegex = $(window.parent.document).find("#view_box").attr("src").match(/mundo=[0-9]*/);
        if(mundoRegex != null)
            mundo = mundoRegex[0].match(/[0-9]/)[0];

        /*
        if((mundo == 1 && url['uf'] == 0 && url['cad'] == 0)){
            setPercentValueData({percentual: 1, taxa: dados.taxa[indexAno]}, eixo, vrv);
        }
        else if(mundo == 1 && url['uf'] == 0 && url['cad'] == 0){
            setPercentValueData({percentual: 1}, eixo, vrv);
        }
        else if(url['uf'] == 0 && url['prc'] == 0 && url['cad'] == 0){
            setPercentValueData({percentual: 1}, eixo, vrv);

        }*/
        
       if(url['var'] == 5 || url['var'] == 8){
            dados.valor = dados.value[dados.key.indexOf(url['ano'])];

            if(url['cad'] == 0){
                setIntegerValueData(dados, eixo, vrv);
            } else if(url['cad'] == 2){
                setPercentValueData(dados, eixo, vrv);
            } 
       }else{
            dados.valor = dados.value[indexAno];

            setIntegerValueData(dados, eixo, vrv);
            setPercentValueData({percentual : dados.percentual[indexAno]}, eixo, vrv);

       }

       setTerceiroValueData(eixo, vrv, valor, url['cad']);            

    }
}

function configInfoDataBoxBarrasClick(eixo, vrv, dados, i, valor) {

    if(eixo == 0) {
        if (vrv == 3) {
            dados.valor = dados.value[i] / 100;
            setIntegerValueData(dados, eixo, vrv);
        }
        else if (vrv == 1) {
            dados.valor = dados.value[i];
            setIntegerValueData(dados, eixo, vrv);
            if(url['cad'] == 0)
                setPercentValueData({percentual: dados.percentual[i], taxa: dados.taxa[i]}, eixo, vrv)
        }
        else if (vrv == 2) {
            if(url['uf'] == 0){
                dados.valor = dados.value[i];
                setIntegerValueData(dados, eixo, vrv);
            }
            else if(url['uf'] !== 0){
                dados.valor = dados.value[i];
                setIntegerValueData(dados, eixo, vrv);
                //setPercentValueData({percentual: dados.percentual[i], taxa: dados.taxa[i]}, eixo, vrv);
            }
        }
        else if (vrv == 9) {
            dados.valor = dados.value[i]/100;
            setIntegerValueData(dados, eixo, vrv);
        }
        else if (vrv >= 4 && vrv <= 8) {
            dados.valor = dados.value[i];
            setIntegerValueData(dados, eixo, vrv);
            if(url['cad'] == 0)
                setPercentValueData({percentual: dados.percentual[i]}, eixo, vrv);
        }
        else if (vrv > 9) {
            dados.valor = dados.value[i];
            if(url["uos"] == 0){
                setIntegerValueData(dados, eixo, vrv);
            }
            else if(url["uos"] == 1){
                setPercentValueData(dados, eixo, vrv);
            }
        }


    }
    else if(eixo == 1){

        if(vrv >= 12){
            dados.valor = dados.value[i];
            if(url["uos"] == 0){
                setIntegerValueData(dados, eixo, vrv);
            } else if(url["uos"] == 1){
                setPercentValueData({valor: dados.value[i]}, eixo, vrv);
            }
        }
        else{

            dados.valor = dados.value[i]

            if(url['var'] == 2)
                if(url['ocp'] == 0)
                    dados.valor = dados.value[i]*100;


            setIntegerValueData(dados, eixo, vrv);
            
            setTerceiroValueData(eixo, vrv, dados.percentual[i], url['cad']);  
            //setPercentValueData({percentual: dados.percentual[i]}, eixo, vrv);
        }
    }
    else if(eixo == 2){

        if(vrv === 1 || vrv === 2 || vrv === 3 || vrv === 4 || vrv == 5 || vrv == 6 || vrv === 7 || vrv === 8 || vrv === 9 || vrv === 11 || vrv === 12 || vrv === 13 || vrv === 14 || vrv === 18 || vrv === 19){
            dados.valor = dados.value[i];
            setIntegerValueData(dados, eixo, vrv);
        }
        else if(vrv === 17){
            dados.valor = dados.value[i];
            setIntegerValueData(dados, eixo, vrv);
        }
        else if(vrv === 15 || vrv === 16){
            dados.valor = dados.value[i];
            if(url["uos"] == 0){
                setIntegerValueData(dados, eixo, vrv);
            } else if(url["uos"] == 1){
                setPercentValueData({percentual: dados.value[i]}, eixo, vrv);
            }
        }
        else if(vrv === 10){
            dados.valor = dados.value[i];
            if(url["mec"] == 0){
                setIntegerValueData(dados, eixo, vrv);
            } else if(url["mec"] == 1){
                setPercentValueData({percentual: dados.value[i]}, eixo, vrv);
            }
        }


    }
    else if(eixo == 3){
        if(url['var'] == 5 || url['var'] == 8){
            dados.valor = dados.value[i];

            if(url['cad'] == 0){
                setIntegerValueData(dados, eixo, vrv);
            } else if(url['cad'] == 2){
                setPercentValueData(dados, eixo, vrv);
            }
       }else{
            dados.valor = dados.value[i];

            setIntegerValueData(dados, eixo, vrv);
            setPercentValueData({percentual : dados.percentual[i]}, eixo, vrv);

       }

    }
}

function configInfoDataBoxBarrasStacked(eixo, vrv, d, soma, deg) {
    if(eixo == 1) {
        if(d.y == "NaN") {
            d.y = 0;
        }
        setIntegerValueData({valor: d.y}, eixo, vrv);
        if(url['cad'] == 0 && url['ocp'] == 0 || url['ocp'] == 3 && url['cad'] == 0)
            setPercentValueData({percentual: parseFloat(d.y)/soma}, eixo, vrv);
    }
}

function configInfoDataBoxBarrasStackedClick(eixo, vrv, d, soma, deg) {
    if(eixo == 1) {
        if(d.y == "NaN") {
            d.y = 0;
        }
        setIntegerValueData({valor: d.y}, eixo, vrv);
        setPercentValueData({percentual: parseFloat(d.y)/soma}, eixo, vrv);
    }
}


Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


function appendPorts(iframe){
	if(iframe) {
		if($(window.parent.document).find("select[data-id='deg']").find("option[value='9']").length == 0) {
            $(window.parent.document).find("select[data-id='deg']").append("<option value='9'>PORTE MICRO</option>");
            $(window.parent.document).find("select[data-id='deg']").append("<option value='10'>PORTE PEQUENO</option>");
            $(window.parent.document).find("select[data-id='deg']").append("<option value='11'>PORTE MÉDIO</option>");
            $(window.parent.document).find("select[data-id='deg']").append("<option value='12'>PORTE GRANDE</option>");
        }
    }
    else {
        if($("select[data-id='deg']").find("option[value='9']").length == 0) {
            $("select[data-id='deg']").append("<option value='9'>PORTE MICRO</option>");
            $("select[data-id='deg']").append("<option value='10'>PORTE PEQUENO</option>");
            $("select[data-id='deg']").append("<option value='11'>PORTE MÉDIO</option>");
            $("select[data-id='deg']").append("<option value='12'>PORTE GRANDE</option>");
        }
	}
}
/*
* Põe as desagregações no select das desagregações referentes aos setores do eixo 2.
*/
function appendDesags(iframe, ocp){

    $.get("./data/select-deg.json", function(data){
        if(ocp == true)
            desag_groups = data.control.mercado.ocupacional;
        else
            desag_groups = data.control.mercado.setorial;

        if(iframe) select = $(window.parent.document).find("select[data-id='deg']")
        else select = $("select[data-id='deg']")

        desag_groups.forEach(function(option){
            group = data.data[option];
            if(select.find("optgroup[value='"+group.value+"']").length == 0) {
                select.append("<optgroup value='"+group.value+"' label='"+group.name+"'></option>");
            }
            group.desags.forEach(function(deg){
                if(select.find("optgroup[value='"+group.value+"']").find("option[value="+deg.value+"]").length == 0) {
                    select.find("optgroup[value='"+group.value+"']").append("<option value='"+deg.value+"'>"+deg.name+"</option>");
                }
            })
                
        })
    })
}
function removePorts(iframe){
	if(iframe) {
		if($(window.parent.document).find("select[data-id='deg']").find("option[value='9']").length != 0) {
            $(window.parent.document).find("select[data-id='deg']").find("option[value='9']").remove();
            $(window.parent.document).find("select[data-id='deg']").find("option[value='10']").remove();
            $(window.parent.document).find("select[data-id='deg']").find("option[value='11']").remove();
            $(window.parent.document).find("select[data-id='deg']").find("option[value='13']").remove();
        }
    }
    else {
        if($("select[data-id='deg']").find("option[value='9']").length != 0) {
            $("select[data-id='deg']").find("option[value='9']").remove();
            $("select[data-id='deg']").find("option[value='10']").remove();
            $("select[data-id='deg']").find("option[value='11']").remove();
            $("select[data-id='deg']").find("option[value='12']").remove();
        }
	}
}
function removeDesags(iframe, ocp){
    $.get("./data/select-deg.json", function(data){
        if(ocp == true)
            desag_groups = data.control.mercado.ocupacional;
        else
            desag_groups = data.control.mercado.setorial;

        if(iframe) select = $(window.parent.document).find("select[data-id='deg']")
        else select = $("select[data-id='deg']")
        
        desag_groups.forEach(function(option){
            group = data.data[option];
            if(select.find("optgroup[value='"+group.value+"']").length != 0) {
                group.desags.forEach(function(deg){
                    if(select.find("option[value="+deg.value+"]").length != 0) {
                        select.find("option[value="+deg.value+"]").remove();
                    }
                })

                select.find("optgroup[value='"+group.value+"']").remove()              
                
            }
        })
    })
}
function appendMecenatoDesags(iframe){
    if(iframe) {
        if($(window.parent.document).find("select[data-id='deg']").find("option[value='15']").length == 0) {
            $(window.parent.document).find("select[data-id='deg']").append("<option value='15'>MECENATO ESTADUAL</option>");
            $(window.parent.document).find("select[data-id='deg']").append("<option value='16'>EDITAIS ESTADUAIS</option>");
        }
    }
    else{
        if($(window.parent.document).find("option[value='15']").length == 0) {
            $("select[data-id='deg']").append("<option value='15'>MECENATO ESTADUAL</option>");
            $("select[data-id='deg']").append("<option value='16'>EDITAIS ESTADUAIS</option>");
        }
    }
}
function removeMecenatoDesags(iframe){
    if(iframe) {
        if($(window.parent.document).find("select[data-id='deg']").find("option[value='15']").length == 0) {
            $(window.parent.document).find("select[data-id='deg']").find("option[value='15']").remove();
            $(window.parent.document).find("select[data-id='deg']").find("option[value='16']").remove();
            $(window.parent.document).find("select[data-id='deg']").find("option[value='17']").remove();
        }
    }
    else{
        if($(window.parent.document).find("option[value='15']").length == 0) {
            $("select[data-id='deg']").find("option[value='15']").remove();
            $("select[data-id='deg']").find("option[value='16']").remove();
            $("select[data-id='deg']").find("option[value='17']").remove();
        }
    }
}

function updateBreadUF(eixo, vrv){
    switch(eixo){
        case 0: 

            $('.bread-select[data-id=uf]').prop("disabled", false);
            $('.bread-select[data-id=cad]').prop("disabled", false);
            $('.bread-select[data-id=deg]').prop("disabled", false);

            if(vrv >= 4){
                $('.bread-select[data-id=deg]').prop("disabled", true);
            }
            if(vrv > 9){
                $('.bread-select[data-id=uf]').prop("disabled", true);
                $('.bread-select[data-id=cad]').prop("disabled", true);
            }
            break;
        case 1:
                $('.bread-select[data-id=uf]').prop("disabled", false);
                $('.bread-select[data-id=cad]').prop("disabled", false);
                $('.bread-select[data-id=deg]').prop("disabled", false);
            if(vrv > 12){
                $('.bread-select[data-id=uf]').prop("disabled", true);
                $('.bread-select[data-id=cad]').prop("disabled", true);

            } else if(vrv == 2){
                //$('.bread-select[data-id=deg]').prop("disabled", true);
            }
            break;
        case 2:
            $('.bread-select[data-id=uf]').prop("disabled", false);
            $('.bread-select[data-id=cad]').prop("disabled", false);
            
            if(vrv == 15 || vrv == 16 || vrv == 10){
                $('.bread-select[data-id=uf]').prop("disabled", true);
                $('.bread-select[data-id=cad]').prop("disabled", true);

            }
            break;
        case 3:
            $('.bread-select[data-id=uf]').prop("disabled", false);
            $('.bread-select[data-id=prc]').prop("disabled", false);
            $('.bread-select[data-id=prc]').prop("disabled", false);
            $('.bread-select[data-id=cad]').prop("disabled", false);
            if(vrv >= 5 && vrv <= 10){
                $('.bread-select[data-id=uf]').prop("disabled", true);
                $('.bread-select[data-id=prc]').prop("disabled", true);
                $('.bread-select[data-id=cad]').prop("disabled", true);
                $('.bread-select[data-id=prc]').prop("disabled", true);

            }else if(vrv == 11 || vrv == 12 || vrv == 14){
                $('.bread-select[data-id=prc]').prop("disabled", true);
                $('.bread-select[data-id=prc]').prop("disabled", true);
                $('.bread-select[data-id=cad]').prop("disabled", true);
            }
            break;
    }
}

function updateSelectTipo(options){
    names = {"1": "Exportação", "2": "Importação", "3": "Saldo Comercial", "4": "Valor Transacionado"};
    for(var key in names){
        if($("select[data-id=typ]").find("option[value='"+key+"']").length != 0)
            $("select[data-id='typ']").find("option[value='"+key+"']").remove()
    }
    
    options.forEach(function(d){
        if($("select[data-id=typ]").find("option[value='"+d+"']").length == 0)
                $("select[data-id='typ']").append("<option value='"+d+"'>"+names[d]+"</option>");
    })
}

function updateTipo(vrv){
    switch(vrv){
        case '2':
            updateSelectTipo(["1", "2"])
            break;
        case '3':
            updateSelectTipo(["1", "2", "4"])
            break;
        case '11':
            updateSelectTipo(["1", "2"])
            break;
        case '12':
            updateSelectTipo(["1", "2"])
            break;
        case '14':
            updateSelectTipo(["1"])
            break;
        default: 
            updateSelectTipo(["1", "2", "3", "4"])
            break;
    }


}

function updateMecanismo(url, vrv){
    $("select[data-id='mec'] > option").each(function() {
        $(this).remove();
    });
/*
    $("select[data-id='cad'] > option").each(function() {
        $(this).remove();
    });*/
    if(url['var'] != 17){
        $("select[data-id='mec']").append("<option value='0'>Todos</option>");

        $("select[data-id='mec']").parent().css('display', 'block')

        if(vrv == 1 ||  vrv == 8 || vrv == 9 || vrv == 15 || vrv == 16){
            $("select[data-id='mec']").append("<option value='1'>FNC</option>");
            $("select[data-id='mec']").append("<option value='2'>Mecenato</option>");
        }

        else if(vrv == 17){
            $("select[data-id='mec']").append("<option value='1'>Editais Estaduais</option>");
            $("select[data-id='mec']").append("<option value='2'>Mecenato</option>");
        }

        else if(vrv == 3){
            $("select[data-id='mec']").append("<option value='3'>Fundo Cultural</option>");
            $("select[data-id='mec']").append("<option value='4'>Outros</option>");
        }
        else {
            $("select[data-id='mec']").parent().css('display', 'none')
        }

    } 
    else{

        $("select[data-id='mec']").append("<option value='0'>Mecenato Estadual</option>");
        $("select[data-id='mec']").append("<option value='1'>Editais Estaduais</option>");
    }


    // alert(url['mec'])
    // $("select[data-id='mec']").val(url['mec'])
}

function updateBreadcrumbSetores(cads){
    $(".bread-select[data-id='cad'] > option").each(function() {
        $(this).remove();
    });

    for (var i = 0; i < cads.length; i++) {
        $(".bread-select[data-id='cad']").append("<option value="+cads[i].id+">"+cads[i].nome+"</option>");
    }

}

function updateDefaultMec(vrv){


    if(vrv == 11 || vrv == 7|| vrv == 12 || vrv == 13 || vrv == 14) {
        url['mec'] = 2;


        $("select[data-id='mec'] > option").each(function () {
            $(this).remove();
        });

        $("select[data-id='mec']").append("<option value='2'>Mecenato</option>");
    }
}

function updateModalidade(url, vrv){

    $("select[data-id='mod'] > option").each(function() {
        if(this.text != "Todos"){
            $(this).remove();
        }
    });

    if(vrv == 3){
        $("select[data-id='mod']").parent().css('display', 'block')

        $("select[data-id='mod']").append("<option value='1'>Direto</option>");
        $("select[data-id='mod']").append("<option value='2'>Indireto</option>");
    }
    else{
        $("select[data-id='mod']").parent().css('display', 'none')
    }

    // $("select[data-id='mod']").val(url['mod'])

}

function updatePfj(url, vrv){

    $("select[data-id='pfj'] > option").each(function() {
            $(this).remove();
    });

    $("select[data-id='pfj']").append("<option value='0'>Todos</option>");

    if(vrv == 4){
        $("select[data-id='pfj']").parent().css('display', 'block')

        $("select[data-id='pfj']").append("<option value='1'>Pessoa Física</option>");
        $("select[data-id='pfj']").append("<option value='2'>Pessoa Jurídica</option>");
    }
    else{
        $("select[data-id='pfj']").parent().css('display', 'none')
    }

    // $("select[data-id='pfj']").val(url['pfj'])

}

function enableDesag(eixo, vrv, setor, iframe, slc, url){

	if(eixo == 0){
		switch(parseInt(vrv)){
			case 1:
			case 2:
			case 3: appendPorts(iframe); break;
			default: removePorts(iframe); break;
		}
	}
	else if(eixo == 1) {
        if(slc == 0) {
            removeDesags(iframe, true)
            removeDesags(iframe, true);
            switch(parseInt(vrv)){
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7: appendDesags(iframe, false); break;     //false = setorial, true = ocupacional
                //default: removeDesags(iframe, false); break;
            }
        }
        else {
            removeDesags(iframe, true)
            removeDesags(iframe, false);
            switch(parseInt(vrv)){
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7: appendDesags(iframe, true); break;
               // default: removeDesags(iframe, true); break;
            }
        }

    }
    else if(eixo == 2) {

        updateMecanismo(url, vrv);
        updateModalidade(url, vrv);
        updatePfj(url, vrv);

	    /*switch(parseInt(vrv)){
            case 2: removeMecenatoDesags(iframe, vrv); break;
            case 15: removePorts(iframe); appendMecenatoDesags(iframe); break;
            default: removeMecenatoDesags(iframe); break;
        }*/
    }

}

function getDataVar(json, eixo, vrv){
    return json.var[eixo].filter(function( obj ) {
        return obj.id == vrv;
    })[0];
}

function getPrepos(uf){
    uf = uf.toUpperCase()
    prepos = {
        "BRASIL": "DO",
        "ACRE":"DO",
        "ALAGOAS":"DE",
        "AMAPÁ":"DO",
        "AMAZONAS":"DO",
        "BAHIA":"DA",
        "CEARÁ":"DO",
        "DISTRITO FEDERAL":"DO",
        "ESPÍRITO SANTO":"DO",
        "GOIÁS":"DE",
        "MARANHÃO":"DO",
        "MATO GROSSO":"DE",
        "MATO GROSSO DO SUL":"DE",
        "MINAS GERAIS":"DE",
        "PARÁ":"DO",
        "PARAÍBA":"DA",
        "PARANÁ":"DO",
        "PERNAMBUCO":"DE",
        "PIAUÍ":"DO",
        "RIO DE JANEIRO":"DO",
        "RIO GRANDE DO NORTE":"DO",
        "RIO GRANDE DO SUL":"DO",
        "RONDÔNIA":"DE",
        "RORAIMA":"DE",
        "SANTA CATARINA":"DE",
        "SÃO PAULO":"DE",
        "SERGIPE":"DE",
        "TOCANTINS": "DO",
        "EUROPA": "DA",
        "MUNDO": "DO",
        "ÁFRICA": "DA",
        "AMÉRICA DO SUL": "DA",
        "AMÉRICA DO NORTE": "DA",
        "OCEANIA": "DA",
        "ÁSIA": "DA"   
    }

    return prepos[uf];
}

function updateDescPercentComercio(desc, vrv, nomeestado){
    prepos = {
        "ACRE":"DO",
        "ALAGOAS":"DE",
        "AMAPÁ":"DO",
        "AMAZONAS":"DO",
        "BAHIA":"DA",
        "CEARÁ":"DO",
        "DISTRITO FEDERAL":"DO",
        "ESPÍRITO SANTO":"DO",
        "GOIÁS":"DE",
        "MARANHÃO":"DO",
        "MATO GROSSO":"DE",
        "MATO GROSSO DO SUL":"DE",
        "MINAS GERAIS":"DE",
        "PARÁ":"DO",
        "PARAÍBA":"DA",
        "PARANÁ":"DO",
        "PERNAMBUCO":"DE",
        "PIAUÍ":"DO",
        "RIO DE JANEIRO":"DO",
        "RIO GRANDE DO NORTE":"DO",
        "RIO GRANDE DO SUL":"DO",
        "RONDÔNIA":"DE",
        "RORAIMA":"DE",
        "SANTA CATARINA":"DE",
        "SÃO PAULO":"DE",
        "SERGIPE":"DE",
        "TOCANTINS": "DO"        
    }
    nomeestado = nomeestado.toUpperCase()

    typ = $(window.parent.document).find(".opt-select[data-id=typ] option:selected").text();
    
    if(vrv == 1){
        switch(typ){
            case 'Exportação': 
                typ = "EXPORTADO";
                if(prepos[nomeestado]){
                    nomeestado = prepos[nomeestado] + ' ' +nomeestado
                }
                else{
                    nomeestado = "DO BRASIL"
                }
                nomeestado = nomeestado.replace("DE", "POR");
                nomeestado = nomeestado.replace("DO", "PELO");
                nomeestado = nomeestado.replace("DA", "PELA");
                return desc.replace('{}', nomeestado).replace('<>', typ);
            case 'Importação': 
                typ = "IMPORTADO";
                nomeestado = "PARA "+nomeestado;
                return desc.replace('{}', nomeestado).replace('<>', typ);
            case 'Saldo Comercial': 
                return ''
            case 'Valor Transacionado': 
                prc = $(window.parent.document).find(".opt-select[data-id=prc] option:selected").text();
                cad = $(window.parent.document).find(".bread-select[data-id=cad] option:selected").text();
                typ = "TRANSACIONADO";
                if(cad == "TODOS" || " TODOS"){
                    cad = "PELOS SETORES CULTURAIS E CRIATIVOS"
                } else {
                    cad = "PELO SETOR DE" + cad;
                }
                return desc.replace('{}', nomeestado).replace('<>', typ).replace('[]', prc).replace('()', cad);
        }
    } 
    else if(vrv == 13){
        switch(typ){
            case 'Exportação': 
                typ = "EXPORTADOS";
                if(prepos[nomeestado]){
                    nomeestado = prepos[nomeestado] + ' ' +nomeestado
                }
                else{
                    nomeestado = "DO BRASIL"
                }
                nomeestado = nomeestado.replace("DE", "POR");
                nomeestado = nomeestado.replace("DO", "PELO");
                nomeestado = nomeestado.replace("DA", "PELA");
                return desc.replace('{}', nomeestado).replace('<>', typ);
            case 'Importação': 
                typ = "IMPORTADOS";
                nomeestado = "PARA "+nomeestado;
                return desc.replace('{}', nomeestado).replace('<>', typ);
            case 'Saldo Comercial': 
                return ''
            case 'Valor Transacionado': 
                prc = $(window.parent.document).find(".opt-select[data-id=prc] option:selected").text();
                cad = $(window.parent.document).find(".bread-select[data-id=cad] option:selected").text();
                typ = "TRANSACIONADO";
                if(cad == "TODOS" || " TODOS"){
                    cad = "PELOS SETORES CULTURAIS E CRIATIVOS"
                } else {
                    cad = "PELO SETOR DE" + cad;
                }
                return desc.replace('{}', nomeestado).replace('<>', typ).replace('[]', prc).replace('()', cad);
        }
    }
}
function mapPronome(string, array_pron, array_new_pron){

    array_pron.forEach(function(d, i){
        string = string.replace(array_pron[i], array_new_pron[i])
    })
    return string
}

function descIntBySelectedParameters(desc, ocp, uf, cad, deg){
    nome_uf = getNomeUF(uf)
    desc_uf = getPrepos(nome_uf)+" "+nome_uf;
    if(deg == 0)
        var deg_nome = "ESCOLHER"
    else
        var deg_nome = $(window.parent.document).find(".bread-select[data-id=deg]").first().find("option:selected").parent().text();
    var tipo_deg = $(window.parent.document).find(".bread-select[data-id=deg]").first().find("option:selected").text();
    if(ocp == 0)
        var cad_nome = $(window.parent.document).find(".bread-select[data-id=cad]").find("option:selected").text()
    else
        var cad_nome = $(window.parent.document).find(".bread-select[data-id=ocp]").find("option:selected").text()
    if(ocp == 0){
        if(cad == 0)
            desc = desc.replace("[cad]", "DOS SETORES CULTURAIS E CRIATIVOS")
        desc = desc.replace("[ocp]", "TRABALHADORES")
    } else {
        desc = desc.replace("[cad]","[name_ocp]")
        if(ocp == 3)
            desc = desc.replace("[name_ocp]", "EM ATIVIDADES CULTURAIS E CRIATIVAS")
        desc = desc.replace("[ocp]", "OCUPADOS")
    }
    if(cad == 0 || ocp == 3){
        return desc.replace("[cad]", "DOS SETORES CULTURAIS E CRIATIVOS")
                    .replace("[name_ocp]", "NA OCUPAÇÃO "+cad_nome)
                    .replace("[uf]", desc_uf)
                    .replace("[deg]", "")
    } else {
        if(deg != 0){
            desc_uf = mapPronome(desc_uf, ["DE", "DA", "DO"], ["EM", "NA", "NO"])
            switch(deg){
                case '1':
                    desc = desc.replace("[deg]", "DE EMPRESAS DE PORTE "+tipo_deg); break;
                case '2':
                    desc = desc.replace("[deg]", "DO SEXO "+tipo_deg); break;
                case '3':
                    desc = desc.replace("[deg]", "DE IDADE ENTRE "+tipo_deg); break;
                case '4':
                    desc = desc.replace("[deg]", "DE ESCOLARIDADE "+tipo_deg); break;
                case '5': 
                    desc = desc.replace("[deg]", "DE ETINIA "+tipo_deg); break; 
                case '6': 
                    tipo_deg = mapPronome(tipo_deg, ["Sim", "Não"], ["COM", "SEM"] )
                    desc = desc.replace("[deg]", tipo_deg+" FORMALIDADE"); break;
                case '7': 
                    tipo_deg = mapPronome(tipo_deg, ["Sim", "Não"], ["COM", "SEM"] )
                    desc = desc.replace("[deg]", tipo_deg+" PREVIDÊNCIA"); break;
                case '8': 
                    tipo_deg = mapPronome(tipo_deg, ["Sim", "Não"], ["COM", "SEM"] )
                    desc = desc.replace("[deg]", tipo_deg+" SINDICATO"); break;
            }
            return desc.replace("[cad]", "DO SETOR "+cad_nome)
                       .replace("[name_ocp]", "NA OCUPAÇÃO "+cad_nome)
                       .replace("[uf]", desc_uf)
        } else {
            desc_uf = mapPronome(desc_uf, ["DE", "DA", "DO"], ["EM", "NA", "NO"])
            desc = desc.replace("[deg]", "")
            return desc.replace("[name_ocp]", "NA OCUPAÇÃO "+cad_nome)
                       .replace("[cad]", "DO SETOR "+cad_nome)
                       .replace("[uf]", desc_uf)
        }
    }
}

function updateDescMercado(desc, vrv, ocp){
    if(ocp == 0)
        var cad = $(window.parent.document).find(".bread-select[data-id=cad]").val()
    else
        var cad = $(window.parent.document).find(".bread-select[data-id=ocp]").val()
    if($(window.parent.document).find(".bread-select[data-id=deg]").first().val() == 0)
        var deg = 0
    else
        var deg = $(window.parent.document).find(".bread-select[data-id=deg]").first().find("option:selected").parent().attr("value");
    var uf = $(window.parent.document).find(".bread-select[data-id=uf]").val()
    var cad_text = $(window.parent.document).find(".bread-select[data-id=cad] option:selected").text();
    
    description = descIntBySelectedParameters(desc, ocp, uf, cad, deg)


    $(window.parent.document).find(".integer-value").first().find(".description-number").first().html(description)
    //$(window.parent.document).find(".percent-value").first().find(".description-number").first().html(description)
            
}

function updateDescComercio(desc, vrv, nomeestado){
    prepos = {
        "ACRE":"DO",
        "ALAGOAS":"DE",
        "AMAPÁ":"DO",
        "AMAZONAS":"DO",
        "BAHIA":"DA",
        "CEARÁ":"DO",
        "DISTRITO FEDERAL":"DO",
        "ESPÍRITO SANTO":"DO",
        "GOIÁS":"DE",
        "MARANHÃO":"DO",
        "MATO GROSSO":"DE",
        "MATO GROSSO DO SUL":"DE",
        "MINAS GERAIS":"DE",
        "PARÁ":"DO",
        "PARAÍBA":"DA",
        "PARANÁ":"DO",
        "PERNAMBUCO":"DE",
        "PIAUÍ":"DO",
        "RIO DE JANEIRO":"DO",
        "RIO GRANDE DO NORTE":"DO",
        "RIO GRANDE DO SUL":"DO",
        "RONDÔNIA":"DE",
        "RORAIMA":"DE",
        "SANTA CATARINA":"DE",
        "SÃO PAULO":"DE",
        "SERGIPE":"DE",
        "TOCANTINS": "DO",
        "EUROPA": "DA",
        "MUNDO": "DO",
        "ÁFRICA": "DA",
        "AMÉRICA DO SUL": "DA",
        "AMÉRICA DO NORTE": "DA",
        "OCEANIA": "DA",
        "ÁSIA": "DA"
        
    }
    nomeestado = $(window.parent.document).find(".bread-select[data-id=uf] option:selected").text();
    nomeestado = nomeestado.toUpperCase()
    
    if(prepos[nomeestado]){
        nomeestado = prepos[nomeestado] + ' ' +nomeestado
    }
    else{
        nomeestado = "DO BRASIL"
    }
    prc = $(window.parent.document).find(".opt-select[data-id=prc] option:selected").text();
    typ = $(window.parent.document).find(".opt-select[data-id=typ] option:selected").text();
    cad = $(window.parent.document).find(".bread-select[data-id=cad] option:selected").text();
    
    prc = prc.toUpperCase()

    if(prepos[prc]){
        prc = prepos[prc] + ' ' + prc
    }
    if(cad.toUpperCase() == "TODOS" || cad.toUpperCase() == " TODOS"){
        if(vrv == 14)
            cad = "DOS SETORES CULTURAIS E CRIATIVOS";
        else
            cad = "PELOS SETORES CULTURAIS E CRIATIVOS";
    } else {
        if(vrv != 14)
            cad = "PELO SETOR DE "+ cad;
        else
            cad = "DO SETOR DE "+cad;
    }
    switch(typ){
        case 'Exportação': 
            if(vrv >= 1 && vrv <= 3)
                typ = "VALOR EXPORTADO"
            else if(vrv == 11 || vrv == 12 || vrv == 14){
                typ = "DAS EXPORTAÇÕES"
            } else if(vrv == 13){
                typ = "EXPORTADOS"
            }
            $(window.parent.document).find(".state-title").first().text(nomeestado)
            $(window.parent.document).find(".prc-title").first().text("PARA "+prc.split(" ")[1])
            break;
        case 'Importação': 
            if(vrv >= 1 && vrv <= 3)
                typ = "VALOR IMPORTADO"
            else if(vrv == 11 || vrv == 12 || vrv == 14){
                typ = "DAS IMPORTAÇÕES"
            }else if(vrv == 13){
                typ = "IMPORTADOS"
            }

            $(window.parent.document).find(".state-title").first().text(prc)
            $(window.parent.document).find(".prc-title").first().text("PARA "+nomeestado.split(" ")[1])
            break;
        case 'Saldo Comercial': 
            if(vrv >= 1 && vrv <= 3)
                typ = "SALDO COMERCIAL"
            else if(vrv == 13){
                typ = "DE SALDO COMERCIAL"
            }
            $(window.parent.document).find(".state-title").first().text("ENTRE "+nomeestado.split(" ")[1])
            $(window.parent.document).find(".prc-title").first().text("E "+prc.split(" ")[1])
            break;
        case 'Valor Transacionado':
            if(vrv >= 1 && vrv <= 3)
                typ = "VALOR TRANSACIONADO" 
            else if(vrv == 13){
                typ = "DE VALOR TRANSACIONADO"
            }
            $(window.parent.document).find(".state-title").first().text("ENTRE "+ nomeestado.split(" ")[1])
            $(window.parent.document).find(".prc-title").first().text("E "+prc.split(" ")[1])
            break;
    }
    if(vrv <= 3 || vrv >= 13)
        $(window.parent.document).find(".integer-value").first().find(".description-number").first().css("font-size", "0.5vw")
    else
        $(window.parent.document).find(".integer-value").first().find(".description-number").first().css("font-size", "14px")
    if(desc != undefined)
        return desc.replace('{}', nomeestado).replace('<>', typ).replace('[]', prc.split(" ")[1]).replace('()', cad);
    else
        return
}
function setTerceiroValueData(eixo, vrv, value, cad){
    if(eixo == 1){
        uf = $(window.parent.document).find(".bread-select[data-id=uf]").val();
        ocp = $(window.parent.document).find(".bread-select[data-id=ocp]").val() == undefined ? 0 : $(window.parent.document).find(".bread-select[data-id=ocp]").val()
        if(vrv == 1 && (cad > 0 || ocp != 0 && ocp != 3) && uf > 0){
           $(window.parent.document).find(".setor-value").first().find(".number").first().text(formatDecimalLimit(value*100, 2)+'%');
           $(window.parent.document).find(".setor-value").first().css("display", "flex");

           doc = $(window.parent.document).find(".setor-value").first().find(".number").first();
           setMaxFontSize(doc);
        } 
        else{
            $(window.parent.document).find(".setor-value").first().css("display", "none");
        }
    }
    else if(eixo == 3){
        if(vrv == 5 || vrv == 8){
            if(cad == 1){
                $(window.parent.document).find(".state-title").first().css("display", "none");
                $(window.parent.document).find(".prc-title").first().css("display", "none");
                $(window.parent.document).find(".prc-title").first().css("display", "none");
                desc = $(window.parent.document).find(".percent-value").first().find(".description-number").first().text();
                $(window.parent.document).find(".setor-value").first().find(".number").first().text(formatDecimalLimit(value, 2));
                $(window.parent.document).find(".setor-value").first().find(".description-number").first().text(desc.replace("UF", "SETOR"));
                $(window.parent.document).find(".setor-value").first().css("display", "block");
                doc = $(window.parent.document).find(".setor-value").first().find(".number").first();
                setMaxFontSize(doc);
            }
        } else {
            $(window.parent.document).find(".setor-value").first().css("display", "none");
            $(window.parent.document).find(".state-title").first().css("display", "block");
            $(window.parent.document).find(".prc-title").first().css("display", "block");
        }    
    }
    
}
/*
* Função para atribuir o valor do dado inteiro para a variável em questão
* Parâmetros: valores, eixo e variável
 */
function setIntegerValueData(value, eixo, vrv) {

	$.get("./data/pt-br.json", function(description) {

        // console.log(value)

        var result = getDataVar(description, eixo, vrv);
	    sufixo = result.sufixo_valor;
		prefixo = result.prefixo_valor;
		valor = value.valor;
		switch(eixo) {
			case 0:
				if(vrv == 3) {
					valor = valor*100;
				}else if(vrv == 9 && value.uf == null) {
					valor = valor*100;
				}
				break;
			case 1:
			    if(sufixo == '%')
                    valor *= 100;
                break;
        }

        var literal = formatDecimalLimit(valor, 2);

        if(eixo == 0 && url['var'] == 3){
            literal = formatDecimalLimit(valor, 2);
        }
        if(eixo == 0 && url['var'] == 9){
            valor = valor*100;


            literal = formatDecimalLimit(valor, 2);
        }
        if(eixo == 0 && url['var'] > 9){
            literal = formatDecimalLimit(valor, 5);
        }
        if(eixo == 1 && url['var'] == 2){
            literal = formatDecimalLimit(valor, 4);
        }
        if(eixo == 1 && url['var'] == 9){
            literal = formatDecimalLimit(valor, 4);
        }
        else if(eixo == 3)
            literal = formatDecimalLimit(valor, 6);

        // console.log(value)

        estado = $(window.parent.document).find(".state-title").first().text()
        if(eixo == 1){
            if(vrv == 1){
                $(window.parent.document).find(".setor-value").first().find(".description-number").first().text()
            }
            if(vrv <= 11)
                updateDescMercado(result.desc_int, vrv, url['ocp']);
        }
        if(eixo == 3){
            $(window.parent.document).find(".integer-value").first().find(".description-number").first().html(updateDescComercio(result.desc_int, vrv, estado))
            $(window.parent.document).find(".percent-value").first().find(".description-number").first().html(updateDescPercentComercio(result.desc_percent, vrv, estado))
            desc = $(window.parent.document).find(".percent-value").first().find(".description-number").first().text()
            $(window.parent.document).find(".setor-value").first().find(".description-number").first().text(desc.replace("VALOR ABSOLUTO POR UF", "VALOR ABSOLUTO POR SETOR"));
        }

        $(window.parent.document).find(".integer-value").first().find(".number").first().html(prefixo+literal+sufixo);
        var doc =  $(window.parent.document).find(".integer-value").first().find(".number").first();

        $(window.parent.document).find('.font-title').html("Fonte(s): "+result.fontes);
        setMaxFontSize(doc);
	});
}

/*
* Função para atualizar a descrição do percentual em função do estado selecionado
*/

function descByUF(eixo, tipo, desc, nomeestado, tag){
    prepos = {
        "ACRE":"DO",
        "ALAGOAS":"DE",
        "AMAPÁ":"DO",
        "AMAZONAS":"DO",
        "BAHIA":"DA",
        "CEARÁ":"DO",
        "DISTRITO FEDERAL":"DO",
        "ESPÍRITO SANTO":"DO",
        "GOIÁS":"DE",
        "MARANHÃO":"DO",
        "MATO GROSSO":"DE",
        "MATO GROSSO DO SUL":"DE",
        "MINAS GERAIS":"DE",
        "PARÁ":"DO",
        "PARAÍBA":"DA",
        "PARANÁ":"DO",
        "PERNAMBUCO":"DE",
        "PIAUÍ":"DO",
        "RIO DE JANEIRO":"DO",
        "RIO GRANDE DO NORTE":"DO",
        "RIO GRANDE DO SUL":"DO",
        "RONDÔNIA":"DE",
        "RORAIMA":"DE",
        "SANTA CATARINA":"DE",
        "SÃO PAULO":"DE",
        "SERGIPE":"DE",
        "TOCANTINS": "DO"
    }
    nomeestado = getNomeUF($(window.parent.document).find(".bread-select[data-id=uf]").val())
    console.log(nomeestado)
    if(nomeestado != undefined)
        nomeestado = nomeestado.toUpperCase()

    if(eixo == 0){
        if(url['var'] == 3 || url['var'] == 9){
            if(prepos[nomeestado]){
                nomeestado = prepos[nomeestado] + ' ' +nomeestado
            }
            else{
                nomeestado = "DO BRASIL"
            }
        }
        else if(url['var'] == 4){
            if(tipo == "integer"){
                if(prepos[nomeestado]){
                    nomeestado = prepos[nomeestado] + ' ' +nomeestado
                }
                else{
                    nomeestado = "DO BRASIL"
                }
            }
            else if(tipo == "percent" ){
                if(prepos[nomeestado] && url['cad'] != 0){
                    nomeestado = prepos[nomeestado] + ' ' +nomeestado
                }
                else{
                    nomeestado = "DO BRASIL"
                }
            }

        }
        else{
            if(url['var'] == 1 && url['prt'] == 0){
                if(url['cad'] == 0)
                    nomeestado = "DO BRASIL"
                else
                    nomeestado = prepos[nomeestado] + ' ' +nomeestado
            }else if(prepos[nomeestado]){
                nomeestado = prepos[nomeestado] + ' ' +nomeestado
            }
            else{
                nomeestado = "DO BRASIL"
            }

        }
    }
    else if(eixo == 1){
        if(url['var'] == 7){
            if(tipo == "percent" ){
                if(prepos[nomeestado]){
                    nomeestado = prepos[nomeestado] + ' ' +nomeestado
                }
                else{
                    nomeestado = "DO BRASIL"
                }
            }
        }
        else if(url['var'] == 1){
            if(tipo == "percent" ){
                console.log(prepos[nomeestado])
                if(prepos[nomeestado] != undefined && url['cad'] != 0){

                    nomeestado = prepos[nomeestado] + ' ' +nomeestado

                }
                else{
                    nomeestado = "DO BRASIL"
                }
            }
        }
    }
    if(eixo == 2){
        if(url['var'] == 8 || url['var'] == 9) {

            if(prepos[nomeestado] && url['uf'] != 0){

                if(tag == '{}')
                    nomeestado = ""
                else
                    nomeestado = prepos[nomeestado] + ' ' +nomeestado


            }
            else{
                if(tag == '{}')
                    nomeestado = "NO BRASIL"
                else
                    nomeestado = "DO BRASIL"
            }
        }
        else if(url['var'] == 99 ) {
            if(prepos[nomeestado]){
                nomeestado = prepos[nomeestado] + ' ' +nomeestado
            }
            else{
                nomeestado = "DO BRASIL"
            }
        }
        else if(url['var'] == 3 || url['var'] == 2){
            if(tipo == "integer"){
                if(prepos[nomeestado]){
                    nomeestado = prepos[nomeestado] + ' ' +nomeestado
                }
                else{
                    nomeestado = "DO BRASIL"
                }
            }
            else if(tipo == "percent" ){
                if(prepos[nomeestado] && url['cad'] != 0){
                    nomeestado = prepos[nomeestado] + ' ' +nomeestado
                }
                else{
                    nomeestado = "DO BRASIL"
                }
            }

        }
        else{
            if(prepos[nomeestado]){
                nomeestado = prepos[nomeestado] + ' ' +nomeestado
            }
            else{
                nomeestado = "DO BRASIL"
            }
        }
    }

    if(desc != undefined)
        return desc.replace(tag, nomeestado);
    else
        return
}

function descByMEC(eixo, desc){
    mecs = {
        1: "FNC",
        2: "MECENATO",
        3: "FUNDO CULTURAL",
        4: "DEMAIS LINHAS DE CRÉDITO",
    }

    str = "VIA "

    if(mecs[url['mec']]){
        if(desc.includes(str))
            nome = mecs[url['mec']];
        else
            nome = str + mecs[url['mec']];
    }
    else {
        if(url['var'] == 8 || url['var'] == 9){
            nome = str + "PRONAC";
        }
        else
            nome = "";
    }


    if(desc != undefined)
        return desc.replace('[]', nome);
    else
        return
}

function descByPFJ(eixo, desc){
    pessoas = {
        1: "PESSOAS FÍSICAS",
        2: "PESSOAS JURÍDICAS",
    }

    str = "DE "


    if(pessoas[url['pfj']]){
        if(desc.includes(str))
            nome = str + pessoas[url['pfj']];
        else
            nome = str + pessoas[url['pfj']];
    }
    else {
        nome = ""
    }


    if(desc != undefined){
        if(url['var'] == 4){
            if(nome == ""){
                nome = "DA ESFERA PRIVADA";
            }
            return desc.replace('pfj DA ESFERA PRIVADA', nome);

        }
        else
            return desc.replace('pfj', nome);
    }


    else
        return
}

function descByMOD(eixo, desc){
    mods = {
        1: "MODALIDADE DIRETA",
        2: "MODALIDADE INDIRETA",
    }

    str = "POR "


    if(mods[url['mod']]) {
        nome = str + mods[url['mod']];
    }
    else {
        nome = ""
    }

    if(desc != undefined)
        return desc.replace('()', nome);
    else
        return
}

function descByCAD(eixo, desc, tag){
    prepos = {
        1: "DE",
        2: "DE",
        3: "",
        4: "DE",
        5: "",
        6: "DE",
        7: "DE",
        8: "DE",
        9: "DE",
        10: "DE",
    }


    cads = {
        1: "ARQUITETURA E DESIGN",
        2: "ARTES CÊNICAS E ESPETÁCULOS",
        3: "AUDIOVISUAL",
        4: "CULTURA DIGITAL",
        5: "EDITORIAL",
        6: "EDUCAÇÃO E CRIAÇÃO EM ARTES",
        7: "ENTRETERIMENTO",
        8: "MÚSICA",
        9: "PATRIMÔNIO",
        10: "PUBLICIDADE",
    }

    str = "do setor"

    if(cads[url['cad']]) {
        if(eixo == 2 && (url['var'] == 8 || url['var'] == 9 || url['var'] == 1)){
            if(tag == '[CAD]' || url['var'] == 1)
                nome = "PARA O SETOR " + prepos[url['cad']] + " " + cads[url['cad']];
            else
                nome = "PELO SETOR " + prepos[url['cad']] + " " + cads[url['cad']];
        }
        else if(eixo == 2 && (url['var'] == 4)){
            nome = "PARA O SETOR " + prepos[url['cad']] + " " + cads[url['cad']];

        }
        else
            nome = str + " " + prepos[url['cad']] + " " + cads[url['cad']];

    }
    else {
        if(eixo == 2 && (url['var'] == 5 || url['var'] == 1 ||  url['var'] == 4 ||  url['var'] == 9 || url['var'] == 11 || url['var'] == 12 || url['var'] == 13 || url['var'] == 14))
            nome = "";
        else if(eixo == 2 && (url['var'] == 8 || url['var'] == 9))
            if(tag == '[CAD]')
                nome = ""
            else
                nome = "PELOS SETORES CULTURAIS E CRIATIVOS"
        else
            nome = "Culturais e Criativos";
    }

    if(desc != undefined)
        return desc.replace(tag, nome);
    else
        return
}

function descByPRT(eixo, desc){
    portes = {
        1: "PORTE MICRO",
        2: "PORTE PEQUENO",
        3: "PORTE MÉDIO",
        4: "PORTE GRANDE",
    }

    str = "DE"

    if(portes[url['prt']] && url['uf'] != 0) {
        nome = str + " " + portes[url['prt']];
    }
    else {
        nome = ""
    }

    if(desc != undefined)
        return desc.replace('[prt]', nome);
    else
        return
}

function descByANO(eixo, desc){

    str = "do ano de "+(parseInt(url['ano'])-1)+" para "+url['ano']

    if(url['ano']) {
        nome = str;
    }
    else {
        nome = ""
    }

    if(desc != undefined)
        return desc.replace('[ano]', nome);
    else
        return
}

function updateDescPercent(eixo, tipo, desc, nomeestado){

    // {} - uf dinamica
    // [] - mecacnismo dinamico
    // () - modalidade dinamica
    // 'pfj - pessoa
    // [cad] - cad
    // [prt] - prt
    // [ano] - ano

    ocp = $(window.parent.document).find("iframe#view_box_barras").attr("src").match(/ocp=[0-9]/)[0].split("=")[1]

    if(desc == undefined){
        return ;
    }
    if(desc.includes('{}')){
        desc =  descByUF(eixo, tipo, desc, nomeestado, '{}')
    }
    if(desc.includes('[uf]')){
        desc =  descByUF(eixo, tipo, desc, nomeestado, '[uf]')
    }
    if(desc.includes('[]')){
        desc =  descByMEC(eixo, desc)
    }
    if(desc.includes('()')){
        desc =  descByMOD(eixo, desc)
    }
    if(desc.includes('pfj')){
        desc =  descByPFJ(eixo, desc)
    }

    if(desc.includes('[cad]')){
        if(ocp == 0)
            desc =  descByCAD(eixo, desc, '[cad]')
        else
            desc = desc.replace("[cad]", "EM ATIVIDADES CULTURAIS E CRIATIVAS")
    }
    if(desc.includes('[CAD]')){
        if(ocp == 0)
            desc =  descByCAD(eixo, desc, '[CAD]')
        else
            desc = desc.replace("[cad]", "EM ATIVIDADES CULTURAIS E CRIATIVAS")
    }

    if(desc.includes('[prt]')){
        desc =  descByPRT(eixo, desc)
    }

    if(desc.includes('[ano]')){
        desc =  descByANO(eixo, desc)
    }
    if(desc.includes('[ocp]')){
        if(ocp > 0)
            desc = desc.replace("[ocp]", "OCUPADOS")
        else
            desc = desc.replace("[ocp]", "TRABALHADORES")
    }

    if(desc.includes('[setores]')){
        if(ocp == 0)
            desc = desc.replace("[setores]", "DOS SETORES CULTURAIS E CRIATIVOS")
        else
            desc = desc.replace("[setores]", "EM ATIVIDADES CULTURAIS E CRIATIVAS")
    }


    return desc;

}

/*
* Função ajusta o tamanho da fonte para a maior possível dentro de um Div.
* Parâmetro: div que contém o texto.
 */
function setMaxFontSize(doc){

    if(doc == null){
        return
    }
    var tamanhoMaximo = 40;
    
    var tamanho = tamanhoMaximo;

    var tamanhoDiv = $(doc).width();
    var texto = $(doc).html();

    if(texto == null){
        return
    }
    // else{
    //     texto = texto.toUpperCase();
    // }

    $(doc).css('font-size', tamanho+'px');

    var font = $(doc).css("font-weight")+" "+$(doc).css("font-size")+" "+ $(doc).css("font-family");

    var letterSpacing = parseFloat($(doc).css("letter-spacing").replace("px", ""));

    var tamanhoString = getTextWidth(texto.toUpperCase(), font) + (texto.length) * letterSpacing;

    $(doc).html("");

    // console.log("tamanhoString: "+tamanhoString+"/ tamanhoDiv: "+tamanhoDiv)

    while(tamanhoString > tamanhoDiv){

        tamanho--;
        $(doc).css('font-size', tamanho+'px');

        font = $(doc).css("font-weight")+" "+$(doc).css("font-size")+" "+ $(doc).css("font-family");

        tamanhoString  = getTextWidth(texto.toUpperCase(), font) + texto.length * letterSpacing;

    }
   // console.log("tamanhoString: "+tamanhoString+"/ tamanhoDiv: "+tamanhoDiv)
    $(doc).html(texto);
    return;

}

function getTextWidth(text, font) {
    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");
    ctx.font = font;
    return ctx.measureText(text).width;
}

/*
* Função para ajustar o nome do cad em questão
* Parâmetros: String com o nome do estado
 */


/*
* Função para ajustar o nome do estado em questão
* Parâmetros: String com o nome do estado
 */


function setStateTitle(stateTitle){
    docState = $(window.parent.document).find(".state-title").html(stateTitle);
    setMaxFontSize(docState)
}

function setPrcTitle(prcTitle){
    docState = $(window.parent.document).find(".prc-title").html(prcTitle);
    setMaxFontSize(docState)
}

/*
* Função para atribuir o valor certo para o dado percentual da variavel em questão
*
* Parâmetros: valores, eixo e variável
 */
function setPercentValueData(value, eixo, vrv) {

    if(value.percentual == "NaN"){
        value.percentual = 0;
    }

    if(eixo == 0){
        if(vrv == 2 || vrv == 3 || vrv == 9) {
            $(window.parent.document).find(".percent-value").first().find(".number").first().html("");
        }
        else if(vrv < 9) {
            if(value.uf == null) {
                $(window.parent.document).find(".percent-value").first().find(".number").first().html(formatDecimalLimit(value.percentual*100, 2)+"%");
            }else {
                $(window.parent.document).find(".percent-value").first().find(".number").first().html(formatDecimalLimit(value.percentual*100, 2)+"%");
            }
        }
        else if(vrv >= 10 && vrv <= 13){
            $(window.parent.document).find(".percent-value").first().find(".number").first().html(formatDecimalLimit(value.valor, 4));
        }

        var doc =  $(window.parent.document).find(".percent-value").first().find(".number").first();
        setMaxFontSize(doc);
    }
    else if(eixo == 1){

        if(vrv > 11 ){
            $(window.parent.document).find(".percent-value").first().find(".number").first().html(formatDecimalLimit(value.valor, 2))
            
        }
        else if(vrv === 2 || vrv === 11 || vrv === 10 ||  vrv === 9  || vrv === 4 || vrv === 5 || vrv === 6 || vrv === 8){
           $(window.parent.document).find(".percent-value").first().find(".number").first().html("");
        }
        else{
            $(window.parent.document).find(".percent-value").first().find(".number").first().html(formatDecimalLimit(value.percentual*100, 2)+"%");
            
        }
        var doc =  $(window.parent.document).find(".percent-value").first().find(".number").first();
        setMaxFontSize(doc);
    }
    else if(eixo == 2){


        if(vrv == 6 || vrv == 7 || vrv == 8 || vrv == 9|| vrv == 13 || vrv == 14 || vrv == 17){
            $(window.parent.document).find(".percent-value").first().find(".number").first().html("");
        }
        else if(vrv == 15 || vrv == 16){

            $(window.parent.document).find(".percent-value").first().find(".number").first().html(formatDecimalLimit(value.percentual, 2));

        }
        else if(vrv == 18 || vrv == 19){

            $(window.parent.document).find(".percent-value").first().find(".number").first().html(value.valor);

        }
        else if(vrv == 10){
            $(window.parent.document).find(".percent-value").first().find(".number").first().html(formatDecimalLimit(value.percentual, 2)+'%');

        }
        else{
            $(window.parent.document).find(".percent-value").first().find(".number").first().html(formatDecimalLimit(value.percentual*100, 2)+"%");
        }


        var doc =  $(window.parent.document).find(".percent-value").first().find(".number").first();
        setMaxFontSize(doc);
    }
    else if(eixo == 3){
        if(vrv == 1 || vrv == 13)
            $(window.parent.document).find(".percent-value").first().find(".number").first().html(formatDecimalLimit(value.percentual*100, 2)+"%");
        else if(vrv == 5 || vrv == 8){
            $(window.parent.document).find(".percent-value").first().find(".number").first().html(formatDecimalLimit(value.valor, 2))
        } else{
            $(window.parent.document).find(".percent-value").first().find(".number").first().html("");           
        }
        var doc =  $(window.parent.document).find(".percent-value").first().find(".number").first();
        
        setMaxFontSize(doc);
    }

}

/*
* Função que mexe no texto da barra de legenda do mapa.
* Centraliza, muda o tamanho da fonte e formata o texto.
*/
function formatBarTextMap(value, eixo, vrv, obj){
	var font_size = 9
	$.get("./data/pt-br.json", function(description) {

		sufixo = getDataVar(description, eixo, vrv).sufixo_valor;
		prefixo = getDataVar(description, eixo, vrv).prefixo_valor;
		valor = value;
		switch(eixo) {
			case 0:
				if(vrv == 3) {
					valor = valor*100;
				}
				break;
			case 1:
			    if(vrv == 2){
			        valor *= 100;
                }
				break;

		}

		if(sufixo == 'h')
			sufixo = '';

		obj.text(formatGreatNumbers(valor, prefixo)+sufixo).style('font-size', font_size);

		width_text =  Math.floor((obj.text()).length*font_size*0.7);
		obj.attr("x", obj.attr("x")-Math.floor(width_text/2));
	});
}

function formatTextVrv(value, eixo, vrv){
    $.ajaxSetup({async: false});
    var string;
    $.get("./data/pt-br.json")
        .done(function(d){
            variavel = d.var[eixo].filter(function(o){ return o.id == vrv})[0]
            sufixo = variavel.sufixo_valor;
            prefixo = variavel.prefixo_valor;
            valor = value;
            /*switch(eixo) {
                case 0:
                    break;
                case 1:
                    if(vrv === 2){
                        valor *= 100;
                    }
                    break;

            }*/
            if(eixo == 1 && url['var'] == 2)
                string = prefixo+formatDecimalLimit(valor, 4)+sufixo;
            else if(eixo == 1 && url['var'] == 9)
                string = prefixo+formatDecimalLimit(valor, 4)+sufixo;
            else if(eixo == 0 && url['var'] > 9)
                string = prefixo+formatDecimalLimit(valor, 4)+sufixo;
            else
                string = prefixo+formatDecimalLimit(valor, 2)+sufixo;

        });
    $.ajaxSetup({async: true});
    return string;
}

function formatTextTaxaVrv(value, eixo, vrv){
    var string;
    prefixo = "";
    sufixo = "%";
    valor = value*100;

    switch(eixo) {
        case 0:
            if(vrv == 2) {
                // valor = valor/100;
            }
            break;
        /*case 1:
            if(vrv == 9){
                valor *= 100;
            }
            break;*/

    }

    string = prefixo+formatDecimalLimit(valor, 2)+sufixo;
    return string;
}


/*
* Formata uma string de valor de variável. Põe prefixo, sufixo e 2 casas decimais.
*/
function formatStringVrv(value, eixo, vrv){
    $.ajaxSetup({async: false})
    var string;
    $.get("./data/pt-br.json", function(d) {
        getDataVar(d, eixo, vrv)
        sufixo = getDataVar(d, eixo, vrv).sufixo_valor;
        prefixo = getDataVar(d, eixo, vrv).prefixo_valor;
        valor = value;
        switch(eixo) {
            case 0:
                if(vrv == 3) {
                    valor = valor*100;
                }
                break;
            case 1:
                if(vrv == 2){
                    valor *= 100;
                }
                else if(vrv == 9){
                    valor *= 100;
                }
                break;

        }
        string = prefixo+formatDecimalLimit(valor, 2)+sufixo;
    });
    $.ajaxSetup({async: true});

    return string;
    //alert(string);
}

/*
* Essa função tira ou coloca o botão 'Ocupações' em função
* da variável selecionada e considerando apenas o EIXO 2
*/
function updateOcupacoes(vrv){
	switch(vrv){
		case '8':
		case '9':
		case '10':
		case '11': $('#ocupacao').css('display', 'none'); break;
		default: $('#ocupacao').css('display', 'inline');
	}
}

function updateServicos(vrv){
    
    switch(vrv){
		case '11':
		case '12':
		case '13':
		case '14': $('#servicos').css('display', 'none'); break;
		default: $('#servicos').css('display', 'inline');
	}
}


function updateDataDesc(vrv, uos, valor){

    $(".integer-value").first().find(".description-number").children("span").each(function () {

        if($(this).attr("data-id") == "uf" && uos == "uf"){
            $(this).text(valor)
        }
        else if($(this).attr("data-id") == "setor" && uos == "setor"){
            $(this).text(valor)
        }
    });
}

/*
* Essa função atualiza a descricao dos valores dados
*/
function updateDataDescUoS(){

	if($(window.parent.document).find(".integer-value").first().find(".description-number").html() != null){
        var desc_int = $(window.parent.document).find(".integer-value").first().find(".description-number").html().replace("POR UF", "POR ATIVIDADES RELACIONADAS");
        var desc_perc = $(window.parent.document).find(".percent-value").first().find(".description-number").html().replace("POR SETOR", "POR ATIVIDADES CULTURAIS");

        $(window.parent.document).find(".integer-value").first().find(".description-number").html(desc_int);
        $(window.parent.document).find(".percent-value").first().find(".description-number").html(desc_perc);
	}

}

/*
* Essa função tira ou coloca o menu dos setores em função
* do eixo e da variável selecionada
*/
function updateMenuSetor(eixo, vrv){
	if(eixo == 0){
		if(vrv > 9){
			d3.selectAll('#menu-view').filter(function(d, i){
				return i;
			}).style("display", "none");

			var sel = document.getElementById("bread-select-cad");
			for(i = 1; i <  sel.options.length; i++){
                sel.options[i].style.display = "none"
			}
		}
		else{
			d3.selectAll('#menu-view').filter(function(d, i){
				return i;
			}).style("display", "inline");

            var sel = document.getElementById("bread-select-cad");
            for(i = 1; i <  sel.options.length; i++){
                sel.options[i].style.display = "block"
            }
		}
	}
	else if (eixo == 1){
		if(vrv > 11){
            d3.selectAll('#menu-view').filter(function(d, i){
                return i;
            }).style("display", "none");
		} else{
            d3.selectAll('#menu-view').filter(function(d, i){
                return i;
            }).style("display", "inline");
		}
	}
	else if (eixo == 2){

	    if(vrv == 15 || vrv == 16 || vrv == 10 || vrv == 17){
            d3.selectAll('#menu-view').filter(function(d, i){
                return i;
            }).style("display", "none");
        }
        else{
            d3.selectAll('#menu-view').filter(function(d, i){
                return i;
            }).style("display", "inline");
        }
    }
    else if (eixo == 3){

	    if(vrv >= 1 && vrv <= 8 || vrv == 12){
            d3.selectAll('#menu-view').filter(function(d, i){
                return i;
            }).style("display", "none");
            d3.select("#view_box_scc").style("width", "100%");
        }
        else{
            d3.select("#view_box_scc").style("width", "80%");
            d3.selectAll('#menu-view').filter(function(d, i){
                return i;
            }).style("display", "inline");
        }
    }

}



/*
* Função para retornar um valor na casa dos milhões ou bilhões num formato encurtado
* PARÂMETROS:
* 	value: número a ser formatado
* 	prefix: caso haja um prefixo na representação do valor. ex: "R$"
*/
function formatGreatNumbers(value, prefix){
	exp_milhao = 6;
	exp_bilhao = 9;

	point = String(value).indexOf(".");

	if(point > exp_milhao && point <= exp_bilhao || point == -1 && String(value).length > exp_milhao && String(value).length <= exp_bilhao){
		value = value / Math.pow(10, exp_milhao);
		return prefix+formatDecimalLimit(value, 2) + "M";
	}
	else if(point > exp_bilhao || point == -1 && String(value).length > exp_bilhao){
		value = value / Math.pow(10, exp_bilhao);
		return prefix+formatDecimalLimit(value, 2) + "B";
	}

	return prefix+formatDecimalLimit(value, 2);
}

/*-----------------------------------------------------------------------------
	Função: formatNumber
		executa sequencialmente funções para formatar valor pra notação comum brasileira
	Entrada:
		{number} value | ex.: 200,300.123456
		{int} decimalLimit | ex.: 2
	Saída:
		{string} ex.: "200.300,12"
-----------------------------------------------------------------------------*/
var formatNumber = function(value, decimalLimit){
	var decimalLimit = decimalLimit || 10;
	var minimumIntDigitsNumberToCapDecValues = 3;

	var intFormat = function(d){
		var tempFormat = d3.format(",.2f");
		return tempFormat(d);
	}

	var fracFormat = function(d){

		var tempFormat = d3.format(",."+decimalLimit+"f");

        return tempFormat(d);
        
	}

/*-----------------------------------------------------------------------------
	Função: numberMagnitude
		calcula magnitude da parte inteira do valor passado levando em consideração a variável {minimumIntDigitsNumberToCapDecValues}
	Entrada:
		{number} value | ex.: 200,300.12345
	Saída:
		{boolean} ex.: true || false
-----------------------------------------------------------------------------*/
	var numberMagnitude = function(value){
		var arrValue = value.toString();
		var intValue = arrValue.split(".")[0];
		var intTwoDigitOrMore = intValue.replace("-", "").slice(0,3).length > minimumIntDigitsNumberToCapDecValues-1;
		return intTwoDigitOrMore? true : false;
	}

/*-----------------------------------------------------------------------------
	Função: niceNumbers
		transforma valor passado do padrão americano para o comum brasileiro com ponto (.) para separar magnitudes inteiras e vírgula (,) para separar decimais
	Entrada:
		{number} value | ex.: 200,300.12345
	Saída:
		{string} ex.: "200.300,123"
-----------------------------------------------------------------------------*/
	var niceNumbers = function(value){
		var dot = ".";
		var comma = ",";
		var isMagnitudeHigh = numberMagnitude(value);
		var format;
		var commaMatch = /,/g;

		if(isMagnitudeHigh)
			format = intFormat(value);
		else
			format = fracFormat(value);

		var zeroesFilter = removeDecimalZeroes(format);
		var valueSplit = zeroesFilter.split(dot);
		var finalReturn;

		if (valueSplit.length > 1){
			var intSplit = valueSplit[0].replace(commaMatch, dot);
			var decSplit = valueSplit[1];
			var splitArray = [intSplit,  decSplit];
			finalReturn = splitArray.join(comma);
		} else {
			finalReturn = zeroesFilter.replace(commaMatch, dot);
		}

		return finalReturn;
	};

	return niceNumbers(value);
}

/*-----------------------------------------------------------------------------
	Função: removeDecimalZeroes
		remove zeros decimais inúteis
	Entrada:
		{number} value | ex.: 200,300.000
	Saída:
		{number} ex.: 200.300
-----------------------------------------------------------------------------*/
var removeDecimalZeroes = function(value){
	var decValue = value.split(".")[1];
	return parseInt(decValue) === 0 && decValue.indexOf('e') == -1? value.split(".")[0] : value;
}

/*-----------------------------------------------------------------------------
	Função: countValidDecimalDigits
		recursivamente conta quantidade de números decimais válidos após zeros iniciais
	Entrada:
		{number} value | ex.: 200,300.00026
	Saída:
		{number} ex.: 3
-----------------------------------------------------------------------------*/
var countValidDecimalDigits = function(value, acum) {
	var acum = acum || 0;
	var digitString = typeof value !== 'string' && typeof value !== 'undefined'? (value).toString() : value;

	// break condition
	if(!value)
		return acum;

	// if has dot (first iteration)
	if (digitString.match(/\./g))
		digitString = digitString.split(".")[1];

	var isZero = parseInt(digitString[0]) === 0? 1: 0;
	var newValue = isZero? digitString.substring(1) : "";
	var newAcum = acum + isZero;

	return countValidDecimalDigits(newValue, newAcum);
};

/*-----------------------------------------------------------------------------
	Função: formatDecimalLimit
		calcula quantidade de casas válidas após zeros iniciais e chama formatNumber com esses parâmetros
	Entrada:
		{number} value | ex.: 200,300.00026
		{int} decimalLimit | ex.: 2
	Saída:
		{string} ex.: "200.300,00026"
-----------------------------------------------------------------------------*/
var formatDecimalLimit = function(value, limit){
    if(value == undefined)
        return;
	var limit = limit || 3;
	var intValue = parseInt(value.toString().split(".")[0]);
	var validDecimal = countValidDecimalDigits(value);
	var fracLeadingZeroes = intValue === 0? validDecimal : 0;
	return formatNumber(value, fracLeadingZeroes + limit);
};

/*-----------------------------------------------------------------------------
	Função: tooltip
		função singleton (retorna sempre a mesma instância) do objeto tooltip
	Entrada:
		N/A
	Saída:
		{object}
-----------------------------------------------------------------------------*/
var tooltip = (function(){

	var instance;

	/*-----------------------------------------------------------------------------
		Função: create
			cria elemento #tooltip no html
		Entrada:
			N/A
		Saída:
			Renderiza objeto no DOM
	-----------------------------------------------------------------------------*/
	function create(){
		var tp;

		if (!tp){
			d3.select('#corpo > #tooltip').remove();

			tp = d3.select('#corpo')
				.append('div')
				.attr('id', 'tooltip')
				.attr('class', 'tooltip none');
		}

		/*-----------------------------------------------------------------------------
			Função: returnTooltip
				retorna instância
			Entrada:
				N/A
			Saída:
				{object}
		-----------------------------------------------------------------------------*/
		function returnTooltip(){ return tp; }

		/*-----------------------------------------------------------------------------
			Função: createElements
				cria elementos e dá append deles dentro da tooltip
			Entrada:
				{object} d: objeto dado pelo D3 que contém dados
				{array} arr: array com valores dos elementos a serem criados ex.: [ ["title", "Título teste"], ["Valor", 1234]]
			Saída:
				Dá append dos elementos no elemento Tooltip
		-----------------------------------------------------------------------------*/
		function createElements(d, arr) {
			var valSeparator = "";

			arr.forEach(function(el, i){
				var clss = el[0];
				var val = el[1];

				var undoValFormat = [val.split(',')[0].replace('.', ','), val.split(',')[1]];
				var ifVal = undoValFormat.join('.');
				ifVal = parseFloat(ifVal.replace(/[%-\+]/g, ''));


					var elType = function(val){
						if(clss.indexOf('#') === -1) {
							switch(clss.toLowerCase()){
                                case 'title':
                                    return 'strong';
                                    break;
                                case 'color':
                                    return 'i';
                                    break;
                                default:
                                    return'span';
                            }
                        }
                        else {
							return "i";
						}
					}();

					var p = tp
						.append('p');

					var element = p
						.append(elType);

                    if(clss.indexOf('#') !== -1) {
                        element
                            .attr('class', 'color')
                            .attr("style", "background-color: "+clss);
                            p.append('span')
								.attr('class', 'span-color')
								.text(function() {
								return val;
                            });
                    }
                    else {
                    	element
                            .attr('class', clss.toLowerCase())
                            .text(function() {
                                if(clss === 'title') {
                                    return val;
                                }
                                if(clss === 'color') {
                                    return val;
                                }
                                else {
                                    return clss + valSeparator + val;
                                }
                            });

				}
			});
		};

		/*-----------------------------------------------------------------------------
			Função: showTooltip
				renderiza elementos dentro da tooltip e posiciona eles de acordo com a posição do mouse.event
			Entrada:
				{object} d: objeto dado pelo D3 que contém dados
				{array} arr: array com valores dos elementos a serem criados ex.: [ ["title", "Título teste"], ["Valor", 1234]]
			Saída:
				Renderiza elementos dentro do elemento #tooltip
		-----------------------------------------------------------------------------*/
		function showTooltip(d, arr) {

			// remove all elements inside tooltip
			tp.text('');
			// create all elements passed via array: arr
			createElements(d, arr);
			// graph position on screen
			var chartOffset = $('.chart').offset(),
				leftOffset = chartOffset.left,
				leftOffsetEnd = leftOffset+$('.chart').width(),
				topOffset = chartOffset.top,
				bottomOffset = topOffset + $('.chart').height();
			// tooltip dimensions
			var tooltipWidth = $('.tooltip').width();
			/*== posição do tooltip ==*/
			var xPosition = d3.event.pageX-leftOffset+30;
			var xPositionEnd = xPosition+tooltipWidth;
			var yPosition = d3.event.pageY -topOffset+5;

			// if tooltips final position is outside screen boundries
			if(xPositionEnd>leftOffsetEnd){
				xPosition = xPosition - tooltipWidth - 30; /* altera a posição */
			}

			if(yPosition + $('.tooltip').height() > bottomOffset){
				yPosition = bottomOffset - $('.tooltip').height();// - 30;
			}

			// sets tooltips new position
			d3.select(".tooltip")
				.style("left", xPosition + "px")
				.style("top", yPosition + "px");

			// shows tooltip
			d3.select(".tooltip").classed("none", false);
		};

        function showTooltipLines(d, arr,x, y1, y2) {
            // remove all elements inside tooltip
            tp.text('');
            // create all elements passed via array: arr
            createElements(d, arr);

            // graph position on screen
            var chartOffset = $('.chart').offset(),
                leftOffset = chartOffset.left,
                leftOffsetEnd = leftOffset+$('.chart').width(),
                topOffset = chartOffset.top,
                bottomOffset = topOffset + $('.chart').height();
            // tooltip dimensions
            var tooltipWidth = $('.tooltip').width();

            /*== posição do tooltip ==*/
            var xPosition = x + tooltipWidth + 10;
            var xPositionEnd = xPosition+ tooltipWidth*2 + 10;
            var yPosition = y1 - (y1-y2)/2;

            // if tooltips final position is outside screen boundries
            if(xPositionEnd>leftOffsetEnd){
                xPosition = xPosition - tooltipWidth*2; /* altera a posição */
            }
            if(xPosition < 0){
                xPosition = x+tooltipWidth/4 + 8;
                if(xPosition + tooltipWidth > leftOffsetEnd){
                    xPosition = leftOffsetEnd - tooltipWidth
                }
            }
            if(yPosition + $('.tooltip').height() > bottomOffset){
                yPosition = bottomOffset - $('.tooltip').height();// - 30;
            }

            // sets tooltips new position
            d3.select(".tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px");

            // shows tooltip
            d3.select(".tooltip").classed("none", false);
        };



		/*-----------------------------------------------------------------------------
			Função: hideTooltip
				esconde o element tooltip
			Entrada:
				N/A
			Saída:
				N/A
		-----------------------------------------------------------------------------*/
		function hideTooltip() {
			d3.select(".tooltip").classed("none", true);
		};

		// API do objeto tooltip
		return {
			tpElement: returnTooltip,
            showTooltip: showTooltip,
            showTooltipLines: showTooltipLines,
			hideTooltip: hideTooltip
		};
	};

	// api do objeto singleton
	return {
		getInstance: function(){
			if (instance)
				return instance;

			instance = create();

			return instance;
		}
	};
})();

// função apenas para debug
function debug(value, match, args){
	if(value === match.toUpperCase()){
		args.unshift(value);
		console.log.apply(console, args);
	}
}

/*-----------------------------------------------------------------------------
	Função: formatTreemapText
		função formata texto interno nos nódulos do treemap
	Entrada:
		N/A
	Saída:
		manipula elementos na página/DOM
-----------------------------------------------------------------------------*/
var formatTreemapText = function() {
	var g = d3.selectAll("#corpo svg g");
	g.each(function(d){
		var acceptableMargin = { horizontal:6, vertical: 6, betweenText: 10 };
		var minMargin = { horizontal:1, vertical: 2, betweenText: 4 };

		var that = d3.select(this);
		var box = that.select('rect').node();
		box = {
			self: box,
			width: box.getBBox().width,
			height: box.getBBox().height
		}

		var title = d3.select(this).select('text.title');
		title = {
			self: title,
			width: title.node().getBBox().width,
			height: title.node().getBBox().height
		}

		var percentage = d3.select(this).select('text.percentage');
		percentage = {
			self: percentage,
			width: percentage.node().getBBox().width,
			height: percentage.node().getBBox().height
		}

		percentage.self
			.attr("x", box.width - acceptableMargin.horizontal)
			.attr("y", box.height - acceptableMargin.vertical)
			.attr("text-anchor", "end");

		var calc = {
			title: {
				width: box.width - title.width - acceptableMargin.horizontal,
				height: box.height - title.height - acceptableMargin.vertical
			},
			percentage: {
				width: box.width - percentage.width - acceptableMargin.horizontal,
				height: box.height - percentage.height - acceptableMargin.vertical
			}
		}
		var doesTitleFit = calc.title.width > acceptableMargin.horizontal*2 && calc.title.width > 0 && calc.title.height > acceptableMargin.vertical*2 && calc.title.height > 0;
		var doesPercentageFit = calc.percentage.width > acceptableMargin.horizontal*2 && calc.percentage.width > 0 && calc.percentage.height > acceptableMargin.vertical*2 && calc.percentage.height > 0;
		var doBothFit = doesTitleFit && doesPercentageFit;

		// first try
		if (!doBothFit) {

			// second try with smaller margin
			calc = {
				title: {
					width: box.width - title.width - minMargin.horizontal,
					height: box.height - title.height - minMargin.vertical
				},
				percentage: {
					width: box.width - percentage.width - minMargin.vertical,
					height: box.height - percentage.height - minMargin.vertical
				}
			}

			// var isBoxHeightSmall = box.height - title.height - percentage.height - minMargin.betweenText < minMargin.vertical*2;
			// var isBoxWidthSmall = box.width - title.width - percentage.width - minMargin.betweenText < minMargin.horizontal*2;
			// var areBothSmall = isBoxHeightSmall && isBoxWidthSmall;

			var doBothFitVertically = box.height - title.height - percentage.height - minMargin.betweenText > minMargin.vertical*2 && box.height - title.height - percentage.height - minMargin.betweenText > 0;
			var doBothFitHorizontally = box.width - title.width - percentage.width - acceptableMargin.betweenText > minMargin.horizontal*2 && box.width - title.width - percentage.width - minMargin.betweenText > 0;

			doesTitleFit = calc.title.width > minMargin.horizontal*2 && calc.title.width > 0 && calc.title.height > minMargin.vertical*2 && calc.title.height > 0;
			doesPercentageFit = calc.percentage.width > minMargin.horizontal*2 && calc.percentage.width > 0 && calc.percentage.height > minMargin.vertical*2 && calc.percentage.height > 0;
			doBothFit = doesTitleFit && doesPercentageFit;

			// se title não couber
			if (!doesTitleFit)
				title.self.attr("display", "none");

			// se porcentagem não couber esconde title e porcentagem
			if (!doesPercentageFit){
				title.self.attr("display", "none");
				percentage.self.attr("display", "none");
			}

			// se apenas porcentagem couber esconder title
			if (doesPercentageFit && !(doBothFitHorizontally || doBothFitVertically))
				title.self.attr("display", "none");

			// se os dois não couberem esconde os dois
			if (!doBothFit && !(doBothFitHorizontally || doBothFitVertically)) {
				title.self.attr("display", "none");
				percentage.self.attr("display", "none");
			}

			// se os dois (cabem verticalmente, !horizontalmente, espaço vertical disponível < margem vertical) && (!cabem verticalmente, horizontalmente, espaço horizontal disponível < margem horizontal)
			var isBoxSmallForText = ((doBothFitVertically
									&& !doBothFitHorizontally)
									|| box.height - title.height - percentage.height < minMargin.vertical*2)
									|| ((!doBothFitVertically
										&& doBothFitHorizontally)
										&& box.width - title.width - percentage.width < minMargin.horizontal*2);

			var doTitleHorizontalMarginExist = (box.width - title.width - percentage.width - minMargin.betweenText) / 2 >= minMargin.horizontal*2 + 2;
			var doTitleVerticalMarginExist = (box.height - title.height - minMargin.vertical) / 2 >= acceptableMargin.vertical*2;

			// se espaço horizontal || vertical - tamanho horizontal || vertical do percentagem < margem vertical || horizontal
			var isBoxSmallForPercentage = box.height - percentage.height < minMargin.vertical*2
										|| box.width - percentage.width < (minMargin.horizontal+2)*2;

			if (isBoxSmallForText || ((!doTitleHorizontalMarginExist || !doTitleVerticalMarginExist) && !doBothFitVertically)){
				title.self
					.attr("x", minMargin.horizontal + 4)
					.attr("y", minMargin.vertical + 11);
			}

			if (isBoxSmallForPercentage){
				percentage.self.attr("x", box.width - minMargin.horizontal - 2);
			}
		}
	});
}
