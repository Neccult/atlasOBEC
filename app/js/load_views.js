
parameters = {};


tooltipInstance = tooltip.getInstance();

//Guarda informações que serão usadas localmente por cada views. ex: uos
views_parameters = {
    "#view_box": {},
    "#view_box_barras": {},
    "#view_box_scc": {}
};
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){
    parameters[key] = value;
})

parameters.eixo = indexEixo(parameters.eixo.replace(/#.*/, ''));
PT_BR = [];
COLORS = [];
URL_PARAM = $.param(parameters);
br_states = []
anos_default = []
data_var_ant = []
view_box1_ant = ''

VIEWS = {
    "barras": function (box, data, update){
        if(parseInt(parameters.deg) && !(parameters.eixo == 1 && (parameters.var == 4 || parameters.var == 5 || parameters.var == 6))){
            if(update){
                update_bars_stacked(box, data);
            }
            else {
                $(box+" svg").remove()
                create_bars_stacked(box, data);
            }
        }
        else{
            if(update){
                update_bars(box, data);
            }
            else {
                $(box+" svg").remove()
                create_bars(box, data);
            }
        }


    },
    "mapa": function (box, data, update){

        if(update){
            update_mapa(box, data)
        } else {

            br_states = []
            d3.json("./data/br-min.json", function(states){
                br_states = states;
                    $(box+" svg").remove()
                    create_mapa(box, data);
            })
        }
        

    },
    "treemap_scc": function (box, data, update){
        if(update){
            update_treemap_scc(box, data)
        } else {
            $(box+" svg").remove()
            create_treemap_scc(box, data);
        }
    },
    "treemap_region": function (box, data, update){
        if(update){
            update_treemap_region(box, data)
        } else {
            $(box+" svg").remove()
            create_treemap_region(box, data);
        }
    },
    "linhas": function (box, data, update){
        if(update){
            update_linhas(box, data)
        } else {
            $(box+" svg").remove()
            create_linhas(box, data);
        }
    }
}

brasil_setor = []

$.get('./db/total_setor.php?'+URL_PARAM, function(dado){
    brasil_setor = JSON.parse(dado)
})

initTitleBox();
updateTitleBox();

//NÃO VÊ EM FUNÇÃO DA OCUPAÇÃO OU BENS
$.ajaxSetup({async: false});
$.get("./db/json_ano_default.php?eixo="+getEixo(window.location.hash.substring(1)), function(data) {
    anos_default = JSON.parse(data);

    $('select[data-id=ano]').each(function(){
        selectOp = this;
        $(this.options).each(function(){
            $(this).remove();
        })
        if(parameters.eixo == 1){
            if(parameters.ocp > 0){
                var ocp = 1
            } else {
                var ocp = 0;
            }
            dummy = anos_default[parameters.var][ocp]
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
$.ajaxSetup({async: true});

switch(parameters.eixo){
    case 0:
        if(parameters.var >= 10){
            views_parameters["#view_box"].uos = '0'
            views_parameters["#view_box_barras"].uos = '1'
            views_parameters["#view_box_scc"].uos = '0'
        } else {
            views_parameters["#view_box"].uos = '0'
            views_parameters["#view_box_barras"].uos = '0'
            views_parameters["#view_box_scc"].uos = '0'
        }
        if(parameters.var >= 10 || parameters.var == 2 || parameters.var == 3){
            $(".content-btn-mapa").css("display", "none");
        } else {
            $(".content-btn-mapa").css("display", "block");
        }
        break;
    case 1:
        if(parameters.var > 11){
            views_parameters["#view_box"].uos = '0'
            views_parameters["#view_box_barras"].uos = '1'
            views_parameters["#view_box_scc"].uos = '0'
        } else {
            views_parameters["#view_box"].uos = '0'
            views_parameters["#view_box_barras"].uos = '0'
            views_parameters["#view_box_scc"].uos = '0'
        }

        if(parameters.var != 1){
            $(".content-btn-mapa").css("display", "none");
        } else {
            $(".content-btn-mapa").css("display", "block");
        }
}
    



$.when($.get('data/pt-br.json'), $.get('data/colors.json'), $.get('data/descricoes.json')).done(function(pt_br_JSON, colors_JSON, descricoes){
    PT_BR = pt_br_JSON[0];
    COLORS = colors_JSON[0];
    DESCRICOES = descricoes[0];

    updateDescription(DESCRICOES, parameters.eixo, parameters.var, 0);
    data_var = getDataVar(PT_BR, parameters.eixo, parameters.var);

    // console.log(data_var.views)
        
    var view_box1 = data_var.views.view_box1[parameters.chg]
    var view_box2 = data_var.views.view_box2[0]
    var view_box3 = data_var.views.view_box3[0]

    d3.json("./db/json_"+view_box1+".php?"+URL_PARAM+"&uos="+views_parameters["#view_box"].uos, function(json){
        VIEWS[view_box1].call(this, "#view_box", json);
    })

    d3.json("./db/json_"+view_box2+".php?"+URL_PARAM+"&uos="+views_parameters["#view_box_barras"].uos, function(json){
        VIEWS[view_box2].call(this, "#view_box_barras", json);
    });

    d3.json("./db/json_"+view_box3+".php?"+URL_PARAM+"&uos="+views_parameters["#view_box_scc"].uos, function(json){
        VIEWS[view_box3].call(this, "#view_box_scc", json);
    });

    // $.get("./db/json_"+view_box3+".php?"+URL_PARAM+"&uos="+views_parameters["#view_box_scc"].uos, function (data) {
    //     console.log(data)
    // })
})

function updateParameters(){

    data_var_ant = getDataVar(PT_BR, parameters.eixo, parameters.var);
    view_box1_ant = data_var_ant.views.view_box1[parameters.chg];

    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){
        parameters[key] = value;
    })
    
    parameters.eixo = indexEixo(parameters.eixo.replace(/#.*/, ''));

    URL_PARAM = $.param(parameters);


}

function updateSelectAnos(){

    $('select[data-id=ano]').each(function(){
        selectOp = this;
        $(this.options).each(function(){
            $(this).remove();
        })
        if(parameters.eixo == 1){
            if(parameters.ocp > 0){
                var ocp = 1
            } else {
                var ocp = 0;
            }
            dummy = anos_default[parameters.var][ocp]
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
    
}

function loadViews(){

    switch(parameters.eixo){
        case 0:
            if(parameters.var >= 10){
                views_parameters["#view_box"].uos = '0'
                views_parameters["#view_box_barras"].uos = '1'
                views_parameters["#view_box_scc"].uos = '0'
            } else {
                views_parameters["#view_box"].uos = '0'
                views_parameters["#view_box_barras"].uos = '0'
                views_parameters["#view_box_scc"].uos = '0'
            }

            if(parameters.var >= 10 || parameters.var == 2 || parameters.var == 3){
                $(".content-btn-mapa").css("display", "none");
            } else {
                $(".content-btn-mapa").css("display", "block");
            }
            break;
        case 1:
            if(parameters.var > 11){
                views_parameters["#view_box"].uos = '0'
                views_parameters["#view_box_barras"].uos = '1'
                views_parameters["#view_box_scc"].uos = '0'
            } else {
                views_parameters["#view_box"].uos = '0'
                views_parameters["#view_box_barras"].uos = '0'
                views_parameters["#view_box_scc"].uos = '0'
            }


            if(parameters.var != 1){
                $(".content-btn-mapa").css("display", "none");
            } else {
                $(".content-btn-mapa").css("display", "block");
            }
    }

    data_var = getDataVar(PT_BR, parameters.eixo, parameters.var);
    
    updateDescription(DESCRICOES, parameters.eixo, parameters.var, 0);
    
    var view_box1 = data_var.views.view_box1[parameters.chg]
    var view_box2 = data_var.views.view_box2[0]
    var view_box3 = data_var.views.view_box3[0]

    var UPDATE_1 = (view_box1 == view_box1_ant);
    var UPDATE_2 = (view_box2 == data_var_ant.views.view_box2[0]);
    var UPDATE_3 = (view_box3 == data_var_ant.views.view_box3[0]);

    
    d3.json("./db/json_"+view_box1+".php?"+URL_PARAM+"&uos="+views_parameters["#view_box"].uos, function(json){
        VIEWS[view_box1].call(this, "#view_box", json, UPDATE_1);
    })

    d3.json("./db/json_"+view_box2+".php?"+URL_PARAM+"&uos="+views_parameters["#view_box_barras"].uos, function(json){
        VIEWS[view_box2].call(this, "#view_box_barras", json, UPDATE_2);
    })

    d3.json("./db/json_"+view_box3+".php?"+URL_PARAM+"&uos="+views_parameters["#view_box_scc"].uos, function(json){
        VIEWS[view_box3].call(this, "#view_box_scc", json, UPDATE_3);
    })
}

function updateViews(){

    updateParameters();
    updateSelectAnos();
    loadViews();

}

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
