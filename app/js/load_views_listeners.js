

if(parameters != undefined){
    parameters = {};
    console.log(window.location.href)
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){
        parameters[key] = value;
    })

    parameters.eixo = indexEixo(parameters.eixo.replace(/#.*/, ''));

    URL_PARAM = $.param(parameters);

    data_var = getDataVar(PT_BR, parameters.eixo, parameters.var);

    VIEWS[data_var.views.view_box1[0]] = "view_box";
    VIEWS[data_var.views.view_box2[0]] = "view_box_barras";
    VIEWS[data_var.views.view_box3[0]] = "view_box_scc";

    $.getScript('js/'+data_var.views.view_box1[0]+'.js');
    $.getScript('js/'+data_var.views.view_box2[0]+'.js');
    $.getScript('js/'+data_var.views.view_box3[0]+'.js');

}
