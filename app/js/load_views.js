
var parameters = {
    'eixo':$('.bread-select[data-id=eixo]').prop('selectedIndex'),
    'var': $('.bread-select[data-id=var]').val(),
    'uf' : $('.bread-select[data-id=uf').val(),
    'ano': $('.bread-select[data-id=ano]').val(),
    'cad': $('.bread-select[data-id=cad]').val(),
    'prt': 0,
    'deg': 0,
    'sub_deg': 0,
    'ocp': 0
}

GLOBAL_DATA = {
    'box1': [],
    'box2': [],
    'box3': []
}

PT_BR = []
COLORS = []
URL_PARAM = $.param(parameters);

switch(parameters.eixo){
    case 0:
        parameters.prt = $('.bread-select[data-id=deg]').val() 
        break;
    case 1: 
        if($(".bread-select[data-id=deg]").find('option:selected').parent().attr("value") != undefined){
            parameters.deg = $(".bread-select[data-id=deg]").find('option:selected').parent().attr("value")
            parameters.sub_deg = $(".bread-select[data-id=deg]").val()
        } else {
            parameters.deg = $(".bread-select[data-id=deg]").val()
        }
        parameters.ocp = $('.bread-select[data-id=ocp]').val()
        break;
    case 2: 
        break;
    case 3: 
        break;
}


$.when($.get('data/pt-br.json'), $.get('data/colors.json')).done(function(pt_br_JSON, colors_JSON){
    PT_BR = pt_br_JSON[0]
    COLORS = colors_JSON[0]
    
    $.getScript('js/teste_global_var.js')
    $.getScript('js/teste_global_var.js')
    $.getScript('js/teste_global_var.js')
    
})
