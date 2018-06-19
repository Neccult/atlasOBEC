
parameters = {};

window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){
    parameters[key] = value;
})

parameters.eixo = indexEixo(parameters.eixo.replace(/#.*/, ''));
PT_BR = [];
COLORS = [];
URL_PARAM = $.param(parameters);
br_states = []
VIEWS = {
    "barras": function (barras_box, data){
        create_bars(barras_box, data)
    },
    "mapa": function (mapa_box, data){
        br_states = []

        d3.json("./data/br-min.json", function(states){
            br_states = states;
            create_mapa(mapa_box, data)
        })

    },
    "treemap_scc": function (treemap_box_scc, data){
        create_treemap_scc(treemap_box_scc, data)
    }
}

brasil_setor = []

//NÃO VÊ EM FUNÇÃO DA OCUPAÇÃO OU BENS
$.get("./db/json_ano_default.php?eixo="+getEixo(window.location.hash.substring(1)), function(data) {
    anos_default = JSON.parse(data);

    $('select[data-id=ano]').each(function(){
        selectOp = this;
        $(this.options).each(function(){
            $(this).remove();
        })
        dummy = anos_default[parameters.var];
        dummy.reverse().forEach(function(d){
            $(selectOp).append($('<option>', {
                value: d,
                text: d
            }))
        })
        $(this).val(parameters.ano);
    });
});

$.get('./db/total_setor.php?'+URL_PARAM, function(dado){
    brasil_setor = JSON.parse(dado)
})


$.when($.get('data/pt-br.json'), $.get('data/colors.json'), $.get('data/descricoes.json')).done(function(pt_br_JSON, colors_JSON, descricoes){
    PT_BR = pt_br_JSON[0];
    COLORS = colors_JSON[0];
    DESCRICOES = descricoes[0];
    

    updateDescription(DESCRICOES, parameters.eixo, parameters.var, 0);
    data_var = getDataVar(PT_BR, parameters.eixo, parameters.var);

    d3.json("./db/json_mapa.php?"+URL_PARAM, function(json){
        VIEWS[data_var.views.view_box1[0]].call(this, "#view_box", json);
    })

    d3.json("./db/json_barras.php?"+URL_PARAM, function(json){
        VIEWS[data_var.views.view_box2[0]].call(this, "#view_box_barras", json);
    });

    d3.json("./db/json_treemap_scc.php?"+URL_PARAM, function(json){
        VIEWS[data_var.views.view_box3[0]].call(this, "#view_box_scc", json);
    });

})

function indexEixo(eixo){
    switch(eixo){
        case 'empreendimentos':
            return 0;
        case 'mercado':
            return 1;
        case 'politicas':
            return 2;
        case 'comercio':
            return 3;
    }
}
