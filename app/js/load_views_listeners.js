
parameters = {};

window.parent.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value){
    parameters[key] = value;
})

parameters.eixo = indexEixo(parameters.eixo.replace(/#.*/, ''));

URL_PARAM = $.param(parameters);

data_var = getDataVar(PT_BR, parameters.eixo, parameters.var);

$.getScript('js/'+data_var.views.view_box1[0]+'.js');
$.getScript('js/'+data_var.views.view_box2[0]+'.js');
$.getScript('js/'+data_var.views.view_box3[0]+'.js');
