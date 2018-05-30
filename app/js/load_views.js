
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

function get_url_view(view, parameters){
    var url = 'db/json_'+view+'.php?';
    url += $.param(parameters);

    return url;
}

var view_box1 = 'mapa';
var view_box2 = 'barras';
var view_box3 = 'treemap_scc';

var url_box1 = get_url_view('barras', parameters);
var url_box2 = get_url_view('mapa', parameters);
var url_box3 = get_url_view('treemap_scc', parameters);

$.when($.get('data/pt-br.json'), $.get('data/colors.json')).done(function(pt_br_JSON, colors_JSON){
    PT_BR = pt_br_JSON[0]
    COLORS = colors_JSON[0]
    
    $.when($.get(url_box1), $.get(url_box2), $.get(url_box3)).done(function(data_1, data_2, data_3){
        GLOBAL_DATA.box1 = data_1[0]
        GLOBAL_DATA.box2 = data_2[0]
        GLOBAL_DATA.box3 = data_3[0]


        $.getScript('js/teste_global_var.js')
        $.getScript('js/teste_global_var.js')
        $.getScript('js/teste_global_var.js')
    })
    


})
