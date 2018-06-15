

if(parameters != undefined){
    parameters = {};
    
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){
        parameters[key] = value;
    })

    parameters.eixo = indexEixo(parameters.eixo.replace(/#.*/, ''));

    URL_PARAM = $.param(parameters);
    UPDATE_VIEWS = {
        "barras": function (barras_box, data){
            update_bars(barras_box, data)
        },

        "treemap_scc": function (treemap_scc_box, data){
            update_treemap_scc(treemap_scc_box, data)
        }
    }
    data_var = getDataVar(PT_BR, parameters.eixo, parameters.var);

    VIEWS[data_var.views.view_box1[0]] = "view_box";

    // $.getScript('js/'+data_var.views.view_box1[0]+'.js');

    d3.json("./db/json_barras.php?"+URL_PARAM, function(json){
        UPDATE_VIEWS[data_var.views.view_box2[0]].call(this, "#view_box_barras", json);
    })

    d3.json("./db/json_treemap_scc.php?"+URL_PARAM, function(json){
        UPDATE_VIEWS[data_var.views.view_box3[0]].call(this, "#view_box_scc", json);
    })

    
    // $.getScript('js/'+data_var.views.view_box3[0]+'.js');
}
