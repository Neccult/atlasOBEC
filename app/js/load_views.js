
parameters = {};

window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){
    parameters[key] = value;
})

parameters.eixo = indexEixo(parameters.eixo.replace(/#.*/, ''));
PT_BR = [];
COLORS = [];
URL_PARAM = $.param(parameters);
VIEWS = {
    "barras": function (barras_box, data){
        create_bars(barras_box, data)
    },
    "mapa": function (mapa_box, data){
        create_mapa(mapa_box, data)
    },
    "treemap_scc": function (treemap_box_scc, data){
        create_treemap_scc(treemap_box_scc, data)
    }
}

brasil_setor = []
$.get('./db/total_setor.php?'+URL_PARAM, function(dado){
    brasil_setor = JSON.parse(dado)
})

$.when($.get('data/pt-br.json'), $.get('data/colors.json')).done(function(pt_br_JSON, colors_JSON){
    PT_BR = pt_br_JSON[0];
    COLORS = colors_JSON[0];

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
