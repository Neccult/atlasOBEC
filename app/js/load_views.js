parameters = {}

window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){
    parameters[key] = value;
})

parameters.eixo = parameters.eixo.replace(/#.*/, '')

PT_BR = []
COLORS = []
URL_PARAM = $.param(parameters);

$.when($.get('data/pt-br.json'), $.get('data/colors.json')).done(function(pt_br_JSON, colors_JSON){
    PT_BR = pt_br_JSON[0]
    COLORS = colors_JSON[0]
    data_var = getDataVar(PT_BR, parameters.eixo, parameters.var)

    $.getScript('js/'+data_var.views.view_box1[0]+'.js')
    $.getScript('js/'+data_var.views.view_box2[0]+'.js')
    $.getScript('js/'+data_var.views.view_box3[0]+'.js')
    
})
