function mapPronome(string, array_pron, array_new_pron){
    array_pron.forEach(function(d, i){
        string = string.replace(array_pron[i], array_new_pron[i])
    })
    return string
}

function descDesag(desc, deg){
    var tipo_deg = $(".bread-select[data-id=deg]").first().find("option:selected").text();

    switch(deg)
    {
        case '1':
            desc = desc.replace("[deg]", "DE EMPRESAS DE PORTE "+tipo_deg); break;
        case '2':
            if(url['var']==6){
                desc = desc.replace("[deg]", "DO SEXO "+tipo_deg); break;
            }
            else{
                desc = desc.replace("[deg]", "DO SEXO "+tipo_deg); break;
            }
        case '3':
            desc = desc.replace("[deg]", "COM IDADE ENTRE "+tipo_deg+" ANOS"); break;
        case '4':
            if(url['var'] == 6){

                if(tipo_deg == "Sem Instrução")
                    desc = desc.replace("[deg]", "QUE NÃO POSSUEM INSTRUÇÃO")
                else
                    desc = desc.replace("[deg]", "QUE POSSUEM ESCOLARIDADE DE NÍVEL "+tipo_deg); break;
            }
            else{
                if(tipo_deg == "Sem Instrução")
                    desc = desc.replace("[deg]", "E QUE NÃO POSSUEM INSTRUÇÃO")
                else
                    desc = desc.replace("[deg]", "E QUE POSSUEM ESCOLARIDADE DE NÍVEL "+tipo_deg); break;
            }



        case '5':

            if(url['var'] == 6){
                switch(tipo_deg){
                    case "Indígena":
                        tipo_deg = "DECLARADOS INDÍGENAS"; break;
                    case "Branca":
                        tipo_deg = "DECLARADOS BRANCOS"; break;
                    case "Preta":
                        tipo_deg = "DECLARADOS PRETOS"; break;
                    case "Amarela":
                        tipo_deg = "DECLARADOS AMARELOS"; break;
                    case "Parda":
                        tipo_deg = "DECLARADOS PARDOS"; break;
                }
            }
            else{
                switch(tipo_deg){
                    case "Indígena":
                        tipo_deg = "DOS DECLARADOS INDÍGENAS"; break;
                    case "Branca":
                        tipo_deg = "DOS DECLARADOS BRANCOS"; break;
                    case "Preta":
                        tipo_deg = "DOS DECLARADOS PRETOS"; break;
                    case "Amarela":
                        tipo_deg = "DOS DECLARADOS AMARELOS"; break;
                    case "Parda":
                        tipo_deg = "DOS DECLARADOS PARDOS"; break;
                }
            }

            desc = desc.replace("[deg]", tipo_deg); break;
        case '6':
            if(tipo_deg == "Formal"){
                desc = desc.replace("[deg]", "COM FORMALIDADE"); break;
            } else {
                desc = desc.replace("[deg]", "SEM FORMALIDADE"); break;
            }
        case '7':
            if(tipo_deg == "Contribuinte"){
                desc = desc.replace("[deg]", "COM PREVIDÊNCIA"); break;
            }
            else{
                desc = desc.replace("[deg]", "SEM PREVIDÊNCIA");
            }
        case '8':
            if(tipo_deg == "Membro"){
                desc = desc.replace("[deg]", "COM SINDICATO"); break;
            }
            else{
                desc = desc.replace("[deg]", "SEM SINDICADO");
            }
        default:
            desc = desc.replace("[deg]", "")
    }
    return desc;
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

/*
* Função para ajustar o nome do estado em questão
* Parâmetros: String com o nome do estado
 */


function setStateTitle(stateTitle){
    docState = $(".state-title").html(stateTitle);
    setMaxFontSize(docState)
}

function setPrcTitle(prcTitle){
    docState = $(".prc-title").html(prcTitle);
    setMaxFontSize(docState)
}

function updateTitleClickSCC(){
    scc_click = $('.bread-select[data-id=cad] option:selected').text()

    if(scc_click.match(/Todos/) != null){
        scc_click = "NOS SETORES CULTURAIS E CRIATIVOS"
    } else {
        scc_click = "NO SETOR "+scc_click.toUpperCase()
    }
    title = $("#containerBarra").find(".view-title").text()
    $("#containerBarra").find(".view-title").text(title.replace(/NO SETOR .+|NOS SETORES CULTURAIS E CRIATIVOS/, scc_click))

}

function updateTitleClickMapa(uf_click){

    uf_anterior = $('.bread-select[data-id=uf] option:selected').text()

    replace_uf = getPrepos(uf_anterior) + ' ' + uf_anterior.toUpperCase()
    title = $("#containerTree").find(".view-title").text();
    
    $("#containerTree").find(".view-title").text(title.replace(replace_uf, getPrepos(uf_click)+' '+uf_click.toUpperCase()))

    title = $("#containerBarra").find(".view-title").text()
    $("#containerBarra").find(".view-title").text(title.replace(replace_uf, getPrepos(uf_click)+' '+uf_click.toUpperCase()))

}

function initTitleBox(index1, index2, index3){
    var data_var = getDataVar(PT_BR, parameters.eixo, parameters.var)
    if(parameters.slc == 1 && parameters.var > 11 && parameters.eixo == 1){
        $("#containerMapa").find(".view-title").text("SÉRIE HISTÓRICA POR ATIVIDADES RELACIONADAS");
        $("#containerBarra").find(".view-title").text("SÉRIE HISTÓRICA POR ATIVIDADES CULTURAIS");
    } else {
        $("#containerMapa").find(".view-title").text(data_var.views.view_box1[index1].title);
        $("#containerBarra").find(".view-title").text(data_var.views.view_box2[index2].title);
    }
    $("#containerTree").find(".view-title").text(data_var.views.view_box3[index3].title);
}

function updateTitleBox(){
    title_scc = $("#containerTree").find(".view-title").text();
    
    title_barras =  $("#containerBarra").find(".view-title").text();

    cad = $('.bread-select[data-id=cad] option:selected').text()

    if(cad == ''){
        cad = $('.bread-select[data-id=ocp] option:selected').text()
        cad = "";
    } else {
        if(cad.match(/Todos/) != null){
            cad = "NOS SETORES CULTURAIS E CRIATIVOS"
        } else {
            cad = "NO SETOR "+cad.toUpperCase();
        }
    }

    uf = getNomeUF(url['uf']);

    if(title_scc != undefined)
        $("#containerTree").find(".view-title").text(title_scc.replace("[uf]", getPrepos(uf)+' '+uf.toUpperCase()).replace("[cad]", cad));

    if(title_barras != undefined){
        if(parameters.slc == 1 && parameters.var > 11 && parameters.eixo == 1){
            $("#containerBarra").find(".view-title").text("SÉRIE HISTÓRICA POR ATIVIDADES CULTURAIS");
        } else {
            $("#containerBarra").find(".view-title").text(title_barras.replace("[uf]", getPrepos(uf)+' '+uf.toUpperCase()).replace("[cad]", cad));
        }
    }
        
}

function updateDescription(descricoes, eixo, vrv, slc){
    desc_var = getDataVar(descricoes, eixo, vrv)

    key = ''
    cad = $('.bread-select[data-id=cad]').first().val()
    cad_text = $('.bread-select[data-id=cad] option:selected').first().text()

    ocp = $('.bread-select[data-id=ocp]').first().val()
    ocp_text = $('.bread-select[data-id=ocp] option:selected').first().text()



    uf = $('.bread-select[data-id=uf]').first().val()
    uf_text = $('.bread-select[data-id=uf] option:selected').first().text()

    desag = $('.bread-select[data-id=deg]').first().val()
    desag_text = $('.bread-select[data-id=deg] option:selected').first().text()

    mec = $('.bread-select[data-id=mec]').first().val()
    mec_text = $('.bread-select[data-id=mec] option:selected').first().text()

    pfj = $('.bread-select[data-id=pfj]').first().val()
    pfj_text = $('.bread-select[data-id=pfj] option:selected').first().text()

    mod = $('.bread-select[data-id=mod]').first().val()
    mod_text = $('.bread-select[data-id=mod] option:selected').first().text()

    typ = $('.bread-select[data-id=typ]').first().val()
    if(eixo != 3){

        if(uf > 0){
            key += 'u'
        }
        if(cad > 0){
            key += 's'
        } else if( ocp > 0 && ocp != 3){
            key += 's'
        }

        if(desag > 0){
            key += 'd'
        } else if(mec > 0){
            key += 'm'
        } else if(mod > 0){
            key += 'n'
        } else if(pfj > 0){
            key += 'p'
        }

    }
    else {
        switch(typ){
            case '1': key = 'e'; break;
            case '2': key = 'i'; break;
            case '3': key = 's'; break;
            case '4': key = 'c'; break;
        }
    }

    switch(eixo){
        case 0:
            var desc_int = ''
            var desc_perc = ''
            var desc_terc = ''

            nomeestado = getPrepos(uf_text)+' '+uf_text
            nomeporte = "DE "+desag_text;
            nomeano = $('.bread-select[data-id=ano]').first().val()
            anoanterior = parseInt(nomeano)-1
            anoanterior = anoanterior.toString()
            if("primeira" in desc_var){
                desc_var.primeira.forEach(function(d){
                    if(key in d){
                        desc_int = d[key]; return;
                    }
                })
            }
            if("segunda" in desc_var){
                desc_var.segunda.forEach(function(d){
                    if(key in d){
                        desc_perc = d[key]; return;
                    }
                })
            }
            if("terceira" in desc_var){
                desc_var.terceira.forEach(function(d){
                    if(key in d){
                        desc_terc = d[key]; return;
                    }
                })
            }
            mapPronome(uf_text, ["DE", "DA", "DO"], ["EM", "NA", "NO"])
            desc_int = desc_int.replace('[uf]', nomeestado).replace('[cad]', cad_text)
                .replace('[deg]', nomeporte).replace('[ano]', "DO ANO "+anoanterior+' AO '+nomeano).replace('{uf}', nomeestado);
            desc_perc = desc_perc.replace('[uf]', nomeestado).replace('[cad]', cad_text).replace('[deg]', nomeporte).replace('{uf}', nomeestado);
            desc_terc = desc_terc.replace('[uf]', nomeestado).replace('[cad]', cad_text).replace('[deg]', nomeporte).replace('{uf}', nomeestado);

            $('.integer-value').find('.description-number').first().text(desc_int)
            $('.percent-value').find('.box-dado').first().find('.description-number').text(desc_perc)
            $('.percent-value').find('.setor-value').first().find('.description-number').text(desc_terc)

            break;
        case 1:
            var desc_int = ''
            var desc_perc = ''
            var desc_terc = ''
            if(slc > 0){
                slc = 1;
                if(ocp == 1){
                    cad_text = "EM ATIVIDADES RELACIONADAS À CULTURA"
                } else if(ocp == 2) {
                    cad_text = "EM ATIVIDADES CULTURAIS"
                }
            }
            nomeestado = getPrepos(uf_text)+' '+uf_text
            var deg = $(".bread-select[data-id=deg]").first().find("option:selected").parent().attr("value");

            if("primeira" in desc_var.ocp[slc]){
                desc_var.ocp[slc].primeira.forEach(function(d){
                    if(key in d){
                        desc_int = d[key]; return;
                    }
                })
            }
            if("segunda" in desc_var.ocp[slc]){
                desc_var.ocp[slc].segunda.forEach(function(d){
                    if(key in d){
                        desc_perc = d[key]; return;
                    }
                })
            }
            if("terceira" in desc_var.ocp[slc]){
                desc_var.ocp[slc].terceira.forEach(function(d){
                    if(key in d){
                        desc_terc = d[key]; return;
                    }
                })
            }

            desc_int = descDesag(desc_int, deg)
            desc_perc = descDesag(desc_perc, deg)
            desc_terc = descDesag(desc_terc, deg)
            desc_int = desc_int.replace('[uf]', nomeestado).replace('[cad]', cad_text)
            desc_perc = desc_perc.replace('[uf]', nomeestado).replace('[cad]', cad_text)
            desc_terc = desc_terc.replace('[uf]', nomeestado).replace('[cad]', cad_text)


            $('.integer-value').find('.description-number').first().text(desc_int)
            $('.percent-value').find('.box-dado').first().find('.description-number').text(desc_perc)
            $('.percent-value').find('.setor-value').first().find('.description-number').text(desc_terc)
            break;
        case 2:
            var desc_int = ''
            var desc_perc = ''
            var desc_terc = ''

            nomeano = $('.bread-select[data-id=ano]').first().val()
            nomeestado = mapPronome(getPrepos(uf_text), ["DE", "DO", "DA"], ["EM", "NO", "NA"])+' '+uf_text
            if("primeira" in desc_var.slc[slc]){
                desc_var.slc[slc].primeira.forEach(function(d){
                    if(key in d){
                        desc_int = d[key]; return;
                    }
                })
            }
            if("segunda" in desc_var.slc[slc]){
                desc_var.slc[slc].segunda.forEach(function(d){
                    if(key in d){
                        desc_perc = d[key]; return;
                    }
                })
            }
            if("terceira" in desc_var.slc[slc]){
                desc_var.slc[slc].terceira.forEach(function(d){
                    if(key in d){
                        desc_terc = d[key]; return;
                    }
                })
            }

            desc_int = desc_int.replace('[uf]', nomeestado).replace('[cad]', cad_text)
                .replace('[pfj]', pfj_text).replace('[mod]', mod_text)
                .replace('{uf}', nomeestado).replace('[mec]', "VIA "+mec_text).replace("{cad}", cad_text)
                .replace('[ano]', "NO ANO DE " + nomeano);
            desc_perc = desc_perc.replace('[uf]', nomeestado).replace('[cad]', cad_text)
                .replace('[uf]', nomeestado).replace('[cad]', cad_text)
                .replace('[pfj]', pfj_text).replace('[mod]', mod_text)
                .replace('{uf}', nomeestado).replace('[mec]', "VIA "+mec_text).replace("{cad}", cad_text)

            $('.integer-value').find('.description-number').first().text(desc_int)
            $('.percent-value').find('.box-dado').first().find('.description-number').text(desc_perc)
            $('.percent-value').find('.setor-value').first().find('.description-number').text(desc_terc)
            break;
        case 3:
            var desc_int = ''
            var desc_perc = ''
            var desc_terc = ''

            prc_text = $('.bread-select[data-id=prc] option:selected').first().text()
            if(key == 'i'){
                nomeestado = mapPronome(getPrepos(uf_text), ['DE', 'DA', 'DO'], ['', 'A', 'O'])+' '+uf_text
                nomeprc = getPrepos(prc_text)+' '+prc_text;
            }
            if(key == 'e'){
                nomeestado = getPrepos(uf_text)+' '+uf_text;
                nomeprc = mapPronome(getPrepos(prc_text), ['DE', 'DA', 'DO'], ['', 'A', 'O'])+' '+prc_text
            }
            if(key == 'c'){
                if(url['var'] == 13){
                    nomeestado = mapPronome(getPrepos(uf_text), ['DE', 'DA', 'DO'], ['', 'A', 'O'])+' '+uf_text
                }
                else{
                    nomeestado = mapPronome(getPrepos(uf_text), ['DE', 'DA', 'DO'], ['', 'A', 'O'])+' '+uf_text
                }
                nomeprc = mapPronome(getPrepos(prc_text), ['DE', 'DA', 'DO'], ['', 'A', 'O'])+' '+prc_text
            }
            if(cad > 0){
                if(url['var'] == 13){
                    nomecad = "PELO SETOR "+cad_text;
                }
                else{
                    nomecad = "NO SETOR "+cad_text;
                }

            } else {
                if(url['var'] == 13){
                    nomecad = "PELOS SETORES CULTURAIS E CRIATIVOS"
                }
                else{
                    nomecad = "NOS SETORES CULTURAIS E CRIATIVOS"
                }

            }
            if("primeira" in desc_var.slc[slc]){
                desc_var.slc[slc].primeira.forEach(function(d){
                    if(key in d){
                        desc_int = d[key]; return;
                    }
                })
            }
            if("segunda" in desc_var.slc[slc]){
                desc_var.slc[slc].segunda.forEach(function(d){
                    if(key in d){
                        desc_perc = d[key]; return;
                    }
                })
            }
            if("terceira" in desc_var.slc[slc]){
                desc_var.slc[slc].terceira.forEach(function(d){
                    if(key in d){
                        desc_terc = d[key]; return;
                    }
                })
            }

            desc_int = desc_int.replace('[uf]', nomeestado).replace('[cad]', nomecad).replace('[prc]', nomeprc)
            desc_perc = desc_perc.replace('[uf]', nomeestado).replace('[cad]', nomecad).replace('[prc]', nomeprc)
            desc_terc = desc_terc.replace('[uf]', nomeestado).replace('[cad]', nomecad).replace('[prc]', nomeprc)

            $('.integer-value').find('.description-number').first().text(desc_int)
            $('.percent-value').find('.box-dado').first().find('.description-number').text(desc_perc)
            $('.percent-value').find('.setor-value').first().find('.description-number').text(desc_terc)
            break;
    }
}
