/*-----------------------------------------------------------------------------
Função: getEixo
   Dicionário para o eixo, recebe o nome string e retorna o id int
Entrada:
    eixo => string do eixo
Saída:
    eixo_id => int
-----------------------------------------------------------------------------*/
function getEixo(eixo){

    if(eixo == 'empreendimentos') {
        return 0;
    }
    else if(eixo == 'mercado') {
        return 1;
    }
    else if(eixo == 'politicas') {
        return 2;
    }
    else if(eixo == 'comercio') {
        return 3;
    }
    else return 0;
}

var url_anos_default = "./db/json_ano_default.php?eixo="+getEixo(window.location.hash.substring(1));

PT_BR = [];
COLORS = [];
DESCRICOES = [];
anos_default = [];

var load_objects = $.when($.get('data/pt-br.json'), 
                    $.get('data/colors.json'), 
                    $.get('data/descricoes.json'), 
                    $.get(url_anos_default));
load_objects.done(
    function(pt_br_JSON, colors_JSON, descricoes, data_anos){
    PT_BR = pt_br_JSON[0];
    COLORS = colors_JSON[0];
    DESCRICOES = descricoes[0];
    anos_default = JSON.parse(data_anos[0]);
    
});