
if(parameters != undefined){
    var data_var_ant = getDataVar(PT_BR, parameters.eixo, parameters.var);
    var view_box1_ant = data_var_ant.views.view_box1[parameters.chg];

    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){
        parameters[key] = value;
    })

    

    parameters.eixo = indexEixo(parameters.eixo.replace(/#.*/, ''));

    URL_PARAM = $.param(parameters);
    UPDATE_VIEWS = {
        "barras": function (box, data, update){
            if(update){
                update_bars(box, data);
            } else {
                $(box+" svg").remove()
                create_bars(box, data);
            }                
        },
        "mapa": function (box, data, update){
            if(update){
                update_mapa(box, data)
            } else {
                $(box+" svg").remove()
                create_mapa(box, data);
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
        }
    }

    if(parameters.eixo == 0){
        if(parameters.var >= 10){
            uos_1 = '0'
            uos_2 = '1'
            uos_3 = '0'
        } else {
            uos_1 = '0'
            uos_2 = '0'
            uos_3 = '0'
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
    
    d3.json("./db/json_"+view_box1+".php?"+URL_PARAM+"&uos="+uos_1, function(json){
        UPDATE_VIEWS[view_box1].call(this, "#view_box", json, UPDATE_1);
    })

    d3.json("./db/json_"+view_box2+".php?"+URL_PARAM+"&uos="+uos_2, function(json){
        UPDATE_VIEWS[view_box2].call(this, "#view_box_barras", json, UPDATE_2);
    })

    d3.json("./db/json_"+view_box3+".php?"+URL_PARAM+"&uos="+uos_3, function(json){
        UPDATE_VIEWS[view_box3].call(this, "#view_box_scc", json, UPDATE_3);
    })


}
