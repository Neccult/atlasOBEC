
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
if(!('slc' in parameters)){
    parameters['slc'] = 0
}
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
        if(parseInt(parameters.deg) && !(parameters.eixo == 1 && (parameters.var == 4 || parameters.var == 5 || parameters.var == 6)) && !(parameters.eixo == 0)){
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
        var mapa_mundi = parameters.eixo == 3 && parameters.mundo == 0;
        
        if(update){
            if(mapa_mundi){
                update_mapa_mundi(box, data);
            } else {
                update_mapa(box, data)
            }            
        } else {
            if(mapa_mundi){
                $(box+" svg").remove()
                create_mapa_mundi(box, data);
            } else {
                br_states = []
                d3.json("./data/br-min.json", function(states){
                    br_states = states;
                        $(box+" svg").remove()
                        create_mapa(box, data);
                })
            } 
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
    },
    "donut" : function (box, data, update){
        if(update){
            update_donut(box, data)
        } else {
            $(box+" svg").remove()
            create_donut(box, data);
        }
    }
}

brasil_setor = []
total_deg    = []


$.get('./db/total_desag.php?'+URL_PARAM, function(dado){
    total_deg = JSON.parse(dado);
})

var url_anos_default = "./db/json_ano_default.php?eixo="+getEixo(window.location.hash.substring(1));

virtualParameters();

$.when($.get('data/pt-br.json'), 
       $.get('data/colors.json'), 
       $.get('data/descricoes.json'), 
       $.get(url_anos_default))
    .done(function(pt_br_JSON, colors_JSON, descricoes, data_anos){
        PT_BR = pt_br_JSON[0];
        COLORS = colors_JSON[0];
        DESCRICOES = descricoes[0];
        anos_default = JSON.parse(data_anos[0]);
        
        updateSelectAnos(); 
        
        updateDescription(DESCRICOES, parameters.eixo, parameters.var, parameters.slc);
        data_var = getDataVar(PT_BR, parameters.eixo, parameters.var);

        var view_box1 = data_var.views.view_box1[index_view_box1].id
        var view_box2 = data_var.views.view_box2[0].id
        var view_box3 = data_var.views.view_box3[0].id


        initTitleBox(index_view_box1, 0, 0);
        updateTitleBox();

        if(parameters.eixo == 3){
            if(view_box1 == "mapa-mundi"){
                view_box1 = "mapa";
            }
        }


        $.get('./db/total_setor.php?'+URL_PARAM, function(dado){
            brasil_setor = JSON.parse(dado); 

            if(view_box1 == ""){
                $("#view_box svg").remove()
            } else {
                d3.json("./db/json_" + view_box1 + ".php?" + URL_PARAM + "&uos=" + views_parameters["#view_box"].uos, function (json) {
                    VIEWS[view_box1].call(this, "#view_box", json);
                })    
            }
            if(view_box2 == ""){
                $("#view_box_barras svg").remove()
            } else {
                d3.json("./db/json_" + view_box2 + ".php?" + URL_PARAM + "&uos=" + views_parameters["#view_box_barras"].uos, function (json) {
                    VIEWS[view_box2].call(this, "#view_box_barras", json);
                })
            }
            
            if(view_box3 == ""){
                $("#view_box_scc svg").remove()
            } else {
                d3.json("./db/json_" + view_box3 + ".php?" + URL_PARAM + "&uos=" + views_parameters["#view_box_scc"].uos, function (json) {
                    VIEWS[view_box3].call(this, "#view_box_scc", json);
                })
            }

        })
        

    })

function updateParameters(){

    data_var_ant = getDataVar(PT_BR, parameters.eixo, parameters.var);
    
    if(parameters.eixo == 3){
        index_view_box1 = parameters.mundo;
    } else {
        if(parameters.chg == undefined){
            index_view_box1 = 0;
        } else {
            index_view_box1 = parameters.chg;
        }
    }

    view_box1_ant = data_var_ant.views.view_box1[index_view_box1].id;

    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){
        parameters[key] = value;
    })


    if(!('slc' in parameters)){
        parameters['slc'] = 0
    }
    
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
            dummy = anos_default[parameters.var][parameters.slc]
        }
        else if(parameters.eixo == 2) {
            if(parameters.var >= 18){

                zeroIndex = anos_default[parameters.var].indexOf(0);
                if(zeroIndex != -1){
                    anos_default[parameters.var].splice(zeroIndex, 1);
                }
            }
            dummy = anos_default[parameters.var]
        }
        else if(parameters.eixo == 3){
            dummy = anos_default[parameters.var][parameters.slc == 0 ? 1 : 0]
        }
        else {
            dummy = anos_default[parameters.var];
        }

        dummy.reverse().forEach(function(d){
            if(d != 0){
                $(selectOp).append($('<option>', {
                    value: d,
                    text: d
                }))
            }
            
        })
        $(this).val(parameters.ano);
    });
    
}

function virtualParameters(){
    switch(parameters.eixo){
        case 0:
            index_view_box1 = parameters.chg;
            if(parameters.var >= 10){
                views_parameters["#view_box"].uos = '0';
                views_parameters["#view_box_barras"].uos = '1';
                views_parameters["#view_box_scc"].uos = '0';
            } else {
                views_parameters["#view_box"].uos = '0';
                views_parameters["#view_box_barras"].uos = '0';
                views_parameters["#view_box_scc"].uos = '0';
            }

            if(parameters.var >= 10 || parameters.var == 2 || parameters.var == 3){
                $(".content-btn-mapa").css("display", "none");
            } else {
                $(".content-btn-mapa").css("display", "block");
            }
            break;
        case 1:
            index_view_box1 = parameters.chg;
            if(parameters.var > 11){
                views_parameters["#view_box"].uos = '0'
                views_parameters["#view_box_barras"].uos = '1'
                views_parameters["#view_box_scc"].uos = '0'
            }
            else if(parameters.var == 6){
                views_parameters["#view_box"].uos = '0'
                views_parameters["#view_box_barras"].uos = '0'
                views_parameters["#view_box_scc"].uos = '1'
            }
            else {
                views_parameters["#view_box"].uos = '0'
                views_parameters["#view_box_barras"].uos = '0'
                views_parameters["#view_box_scc"].uos = '0'
            }

            if(parameters.var != 1){
                $(".content-btn-mapa").css("display", "none");
            } else {
                $(".content-btn-mapa").css("display", "block");
            }
            break;
        case 2:
            index_view_box1 = 0;
            if(parameters.var == 15 || parameters.var == 16){
                views_parameters["#view_box"].uos = '0'
                views_parameters["#view_box_barras"].uos = '1'
                views_parameters["#view_box_scc"].uos = '0'
            }
            else if(parameters.var == 10){
                views_parameters["#view_box"].uos = '1'
                views_parameters["#view_box_barras"].uos = '0'
                views_parameters["#view_box_scc"].uos = '0'
            }
            else{
                views_parameters["#view_box"].uos = '0'
                views_parameters["#view_box_barras"].uos = '0'
                views_parameters["#view_box_scc"].uos = '0'
            }
            break;
        case 3:
            index_view_box1 = parameters.mundo;
            if(parameters.var == 5 || parameters.var == 8){
                views_parameters["#view_box"].uos = '1';
                views_parameters["#view_box_barras"].uos = '0';
                views_parameters["#view_box_scc"].uos = '2';
            } else {
                views_parameters["#view_box"].uos = '0';
                views_parameters["#view_box_barras"].uos = '0';
                views_parameters["#view_box_scc"].uos = '0';    
            }

            if(parameters.var == 5 || parameters.var == 8 || parameters.var == 11 || parameters.var == 12 || parameters.var == 14){
                $(".content-btn-mapa").css("display", "none");
            } else {
                $(".content-btn-mapa").css("display", "block");
            }
            break;
    }
}

function loadViews(){
    if(parameters.eixo == 0 && parameters.cad == 0 && parameters.uf != 0 && parameters.deg != 0){
        $.ajaxSetup({async: false});
        $.get('./db/total_desag.php?'+URL_PARAM, function(dado){
            total_deg = JSON.parse(dado);
        })
        $.ajaxSetup({async: true});
    }
    

    virtualParameters();

    data_var = getDataVar(PT_BR, parameters.eixo, parameters.var);
    
    updateDescription(DESCRICOES, parameters.eixo, parameters.var, parameters.slc);
    
    var view_box1 = data_var.views.view_box1[index_view_box1].id
    var view_box2 = data_var.views.view_box2[0].id
    var view_box3 = data_var.views.view_box3[0].id
    
    initTitleBox(index_view_box1, 0, 0);
    updateTitleBox();

    var UPDATE_1 = (view_box1 == view_box1_ant);
    var UPDATE_2 = (view_box2 == data_var_ant.views.view_box2[0].id);
    var UPDATE_3 = (view_box3 == data_var_ant.views.view_box3[0].id);
    
    if(parameters.eixo == 3){
        if(!UPDATE_1 && view_box1_ant == "mapa-mundi"){
            $(".jvectormap-container").remove();
        }
        if(view_box1 == "mapa-mundi"){
            view_box1 = "mapa";
        }
    }
    
    $.get('./db/total_setor.php?'+URL_PARAM, function(dado) {
        brasil_setor = JSON.parse(dado);
       
        if(view_box1 == ""){
            $("#view_box svg").remove()
        } else {
            d3.json("./db/json_" + view_box1 + ".php?" + URL_PARAM + "&uos=" + views_parameters["#view_box"].uos, function (json) {
                VIEWS[view_box1].call(this, "#view_box", json, UPDATE_1);
            })    
        }
        if(view_box2 == ""){
            $("#view_box_barras svg").remove()
        } else {
            d3.json("./db/json_" + view_box2 + ".php?" + URL_PARAM + "&uos=" + views_parameters["#view_box_barras"].uos, function (json) {
                VIEWS[view_box2].call(this, "#view_box_barras", json, UPDATE_2);
            })
        }
        
        if(view_box3 == ""){
            $("#view_box_scc svg").remove()
        } else {
            d3.json("./db/json_" + view_box3 + ".php?" + URL_PARAM + "&uos=" + views_parameters["#view_box_scc"].uos, function (json) {
                VIEWS[view_box3].call(this, "#view_box_scc", json, UPDATE_3);
            })
        }


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
