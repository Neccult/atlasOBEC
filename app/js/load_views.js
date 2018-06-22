
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
    },
    "treemap_region": function (box, data){
        create_treemap_region(box, data)
    },
    "linhas": function (linhas_box, data){
        create_linhas(linhas_box, data)
    }
}

brasil_setor = []

$.get('./db/total_setor.php?'+URL_PARAM, function(dado){
    brasil_setor = JSON.parse(dado)
})

//NÃO VÊ EM FUNÇÃO DA OCUPAÇÃO OU BENS
$.get("./db/json_ano_default.php?eixo="+getEixo(window.location.hash.substring(1)), function(data) {
    anos_default = JSON.parse(data);

    $('select[data-id=ano]').each(function(){
        selectOp = this;
        $(this.options).each(function(){
            $(this).remove();
        })
        if(parameters.eixo == 1){
            dummy = anos_default[parameters.var][parameters.ocp]
        } else {
            dummy = anos_default[parameters.var];
        }
        dummy.reverse().forEach(function(d){
            $(selectOp).append($('<option>', {
                value: d,
                text: d
            }))
        })
        $(this).val(parameters.ano);
    });
});


switch(parameters.eixo){
    case 0:
        if(parameters.var >= 10){
            uos_1 = '0'
            uos_2 = '1'
            uos_3 = '0'
        } else {
            uos_1 = '0'
            uos_2 = '0'
            uos_3 = '0'
        }
        break;
    case 1:
        if(parameters.var > 11){
            uos_1 = '0'
            uos_2 = '1'
            uos_3 = '0'
        } else {
            uos_1 = '0'
            uos_2 = '0'
            uos_3 = '0'
        }
}
    



$.when($.get('data/pt-br.json'), $.get('data/colors.json'), $.get('data/descricoes.json')).done(function(pt_br_JSON, colors_JSON, descricoes){
    PT_BR = pt_br_JSON[0];
    COLORS = colors_JSON[0];
    DESCRICOES = descricoes[0];
    

    updateDescription(DESCRICOES, parameters.eixo, parameters.var, 0);
    data_var = getDataVar(PT_BR, parameters.eixo, parameters.var);
        
    var view_box1 = data_var.views.view_box1[parameters.chg]
    var view_box2 = data_var.views.view_box2[0]
    var view_box3 = data_var.views.view_box3[0]

    d3.json("./db/json_"+view_box1+".php?"+URL_PARAM+"&uos="+uos_1, function(json){
        VIEWS[view_box1].call(this, "#view_box", json);
    })

    d3.json("./db/json_"+view_box2+".php?"+URL_PARAM+"&uos="+uos_2, function(json){
        VIEWS[view_box2].call(this, "#view_box_barras", json);
    });


    d3.json("./db/json_"+view_box3+".php?"+URL_PARAM+"&uos="+uos_3, function(json){
        VIEWS[view_box3].call(this, "#view_box_scc", json);
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
