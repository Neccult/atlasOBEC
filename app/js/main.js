var windowWidth = $(window).width();
var cont = 0;
var anos_default;
var colorJson;
var corEixo;

var textJSON = []
var colorJSON = []
var corEixo;

$.ajaxSetup({async: false});
$.get("./data/colors.json")
    .done(function(data){
        colorJSON = data
        corEixo = colorJSON['eixo'][getEixo(window.location.hash.substring(1))]['color'];
    });

$.get("./data/pt-br.json", function(data){
    textJSON = data
})


$.ajaxSetup({async: true});


/*-----------------------------------------------------------------------------
Função: controlVar
    redireciona a página para o resultado da variável escolhida.
Entrada:
    clickVar = variável escolhida
Saída:
    void
-----------------------------------------------------------------------------*/
function controlVar(clickVar){

    newHash = window.location.hash;

    var urlString = "";

    switch (newHash.substring(1)){
        case "empreendimentos": urlString = 'resultado.php?var='+clickVar+'&uf=0&deg=0&cad=0&ano=2014&eixo='+newHash.substring(1)+newHash;
            break;
        case "mercado":         urlString = 'resultado.php?var='+clickVar+'&uf=0&deg=0&subdeg=0&cad=0&ano=2014&ocp=0&slc=0&eixo='+newHash.substring(1)+newHash;
            break;
        case "politicas":       urlString = 'resultado.php?var='+clickVar+'&uf=0&deg=0&cad=0&ano=2014&mec=0&mod=0&pfj=0&eixo='+newHash.substring(1)+newHash;
            break;
        case "comercio":        urlString = 'resultado.php?var='+clickVar+'&uf=0&prc=0&typ=1&cad=0&ano=2014&mundo=0&slc=0&eixo='+newHash.substring(1)+newHash;
            break;
    }

    if(window.location.href.match("resultado.php") != null){
        var prefixo = parent.window.location.href.split("?")[0];
        var sufixo = parent.window.location.href.split("?")[1];

        var prefixoRes = window.location.href.split("?")[0];
        var novaUrlRes = prefixoRes + "?" + sufixo;

        window.location.href = novaUrlRes;

    }

    if(window.location.href.match("page.php") != null){

        var prefixo = window.location.href.split("?")[0];
        var sufixo = window.location.href.split("?")[1];

        $('iframe[id="resultado_view"]').attr('src', 'resultado.php?'+sufixo)

    }

}

function controlVarPage(clickVar){
    newHash = window.location.hash;

    var urlString = "";

    switch (newHash.substring(1)){
        case "empreendimentos": urlString = 'page.php?var=1&chg=0&uf=0&deg=0&cad=0&ano=2014&eixo='+newHash.substring(1)+newHash;
                                    break;
        case "mercado":         urlString = 'page.php?var=1&uf=0&chg=0&deg=0&subdeg=0&cad=0&ano=2014&ocp=0&slc=0&eixo='+newHash.substring(1)+newHash;
                                    break;
        case "politicas":       urlString = 'page.php?var=1&uf=0&deg=0&cad=0&ano=2014&mec=0&mod=0&pfj=0&eixo='+newHash.substring(1)+newHash;
                                     break;
        case "comercio":        urlString = 'page.php?var=1&uf=0&prc=0&typ=1&cad=0&ano=2014&mundo=0&slc=0&eixo='+newHash.substring(1)+newHash;
                                    break;
    }

    window.location.href = urlString;

    /* variáveis com valores default */
}

function getAnoDefault(eixo_atual){

    switch(eixo_atual){
        case 0: url['ano'] = d3.max(anos_default[url['var']]); break;
        case 1:

            if(url['var'] == 10 || url['var'] == 9 || url['var'] == 11){
                url['slc'] = 0
                url['ocp'] = 0
            }

            if(url['ocp'] == 3){
                index_ocp = 1
            }
            else{
                index_ocp = url['ocp']
            }
            url['ano'] = d3.max(anos_default[url['var']][index_ocp]);
            break;

        case 2:
            url['ano'] = d3.max(anos_default[url['var']]);
        
            break;
        case 3:
            if(url['var'] >= 11)
                url['slc'] = 0
            index = url['slc'] == 0 ? 1 : 0

            url['ano'] = d3.max(anos_default[url['var']][index]); break;
    }
}

/*-----------------------------------------------------------------------------
Função: defaultUrl
    atualiza url para valores default (menos a url['var'])
Entrada:
    void
Saída:
    void
-----------------------------------------------------------------------------*/
function defaultUrl(){
    url['uf'] = 0;
    url['chg'] = 0;
    url['cad'] = 0;
    url['ocp'] = 0;
    url['deg'] = 0;
    url['subdeg'] = 0;
    url['mec'] = 0;
    url['mod'] = 0;
    url['pfj'] = 0;
    url['uos'] = 0;
}

function updateIframe(url){

    if(window.location.pathname.match("page.php")){
        return;
    }

    //changeDownloadURL(newUrl + "&eixo=" +window.location.hash.substring(1) + window.location.hash, window.location.hash.substring(1));
    updateViews();

}

/*-----------------------------------------------------------------------------
Função: controlFilter
    controla relações entre os filtros
Entrada:
    selectvalue => valor do select
    selectid => id do select
Saída:
    void
-----------------------------------------------------------------------------*/
function controlFilter(selectvalue, selectid, valueDesag){

    var SCCSrc = $("#view_box_scc").attr("src");
    var BarraSrc = $("#view_box_barras").attr("src");
    if(BarraSrc != undefined && BarraSrc != "no-view.html") var setor = BarraSrc.match(/cad=([0-9]*)/)[1];
    else var setor = 0;
    if(SCCSrc != undefined && SCCSrc != 'no-view.html') {
        var ano = SCCSrc.match(/ano=([0-9]*)/)[1];
        var uf = SCCSrc.match(/uf=([0-9]*)/)[1];
    }
    else {
        var ano = 2015;
        var uf = 0;
    }
    /* se for PORTE x ATUAÇÃO */

    if(selectid==='var') {

        var save_ocp = url['ocp'];
        var save_mec = url['mec'];
        defaultUrl();
        url['mec'] = save_mec;
        url['ocp'] = save_ocp;
        controlAno($('.opt-select[data-id="ano"]'));
        controlAno($('.bread-select[data-id="ano"]'));
    }


    if(selectid==='cad') {
        var save_deg = url['deg'];
        var save_uf = url['uf'];
        //defaultUrl();
        url['deg'] = save_deg;
        url['uf'] = save_uf;
    }


    ///TODO
    if(window.location.hash === "#mercado" && selectid === 'deg') {
        url['subdeg'] = valueDesag;
    }


    if(selectid=='deg') {
        url[selectid] = selectvalue;
        if(selectvalue == 0) {
            url['ano'] = ano;
            url['uf'] = uf;
            url['cad'] = setor;
            url['prt'] = 0;
        }
        if(selectvalue >= 9 && selectvalue <= 12) {
            url['ano'] = ano;
            url['uf'] = uf;
            url['cad'] = setor;
            url['prt'] = selectvalue-8;
        }
        if(selectvalue >= 13 && selectvalue <= 14) {
            url['ano'] = ano;
            url['uf'] = uf;
            url['cad'] = setor;
            url['uos'] = selectvalue-13;
        }
    }
    else if(selectid=='cad') {
        if(selectvalue.match('ocp-','')){

            url['ocp'] = selectvalue.replace('ocp-','');
            url['cad'] = '0'; /* se for atuação, não há filtro por porte */
        }

        /* filtro porte */
        else{
            url['cad'] = selectvalue;
            url['ocp'] = '0';/* se for porte, não há filtro por atuação */
        }
    }
    else{
        url[selectid] = selectvalue;
    }



}

function controlAno(select){

    if(window.location.hash==="#empreendimentos"){
        if(url['var'] > 3 && url['var'] != 12 && url['var'] != 10){
            $(select).find('option[value="2016"]').remove();
        }
        else {
            if($(select).find('option[value="2016"]').length == 0) {
                $(select).prepend("<option value='2016'>2016</option>");
            }
        }

    }
    else {

        if(url['ocp'] == 0) {
            var query = location.search.slice(1);
            var partes = query.split('&');
            var data = {};
            partes.forEach(function (parte) {
                var chaveValor = parte.split('=');
                var chave = chaveValor[0];
                var valor = chaveValor[1];
                data[chave] = valor;
            });
            if (data['var'] >= 8 && data['var'] <= 11) {
                $(select).find('option[value="2015"]').remove();
                $(select).find('option[value="2016"]').remove();
            }
        }
        else {
            $(select).find('option[value="2010"]').remove();
            $(select).find('option[value="2016"]').remove();
        }
    }
}


/*-----------------------------------------------------------------------------
Função: getEixo
   Dicionário para o eixo, recebe o nome string e retorna o id int
Entrada:
    eixo => string do eixo
Saída:
    eixo_id => int
-----------------------------------------------------------------------------*/
function getEixo(eixo){

    if(eixo == 'empreendimentos') {
        return 0;
    }
    else if(eixo == 'mercado') {
        return 1;
    }
    else if(eixo == 'politicas') {
        return 2;
    }
    else if(eixo == 'comercio') {
        return 3;
    }
    else return 0;
}

/*-----------------------------------------------------------------------------
Função: loadResult
   carrega página de resultado e filtros;
Entrada:
    void
Saída:
    void
-----------------------------------------------------------------------------*/
function loadResult(){

    var eixoUrl = window.location.hash.substring(1);

    /* ajusta nome da página */
    $(this).attr("title", pageTitle+" | Atlas Econômico da Cultura Brasileira");

    ///TODO ESTÁ FUNCIONANDO?
    /* fade in no resultado */
    $('.fadeInPage').addClass('done');
    $('.fadeIn').addClass('done');

    /* set selects com os valores da url */
    $(".bread-select").each(function(){

        if(!($(this).attr('data-id') == 'eixo')){
            var selectId = $(this).attr('data-id'),
                selectValue = url[selectId];

            if(selectId=='prt' && selectValue=='0' && url['atc']!='0'){
                /* valor atuação */
                $(this).val('atc-'+url['atc']);
            }

            if(selectId=='cad' && selectValue=='0' && url['ocp']!='0'){

                /* valor atuação */
                //$(this).val('ocp-'+url['ocp']);
            }

            // if(selectId=='prt') controlAtc(this,1);
            // if(selectId=='atc') controlAtc(this,0);
            // if(selectId=='mec') controlMec(this);
            if(selectId=='ano') controlAno(this)
        }
    });

    $("#containerDownload button").css("background-color", colorJSON['eixo'][getEixo(eixoUrl)]['color'][3])
    $(".number").css("color", colorJSON['eixo'][getEixo(eixoUrl)]['color'][4])
    if(windowWidth > 1199){
        $(".rotulo-bread").css("background-color",colorJSON['eixo'][getEixo(eixoUrl)]['color'][5]);
    }

    removeVar('mercado', 3);

}

function updateColorButtons(slc){
    $("#btn-opt").find("button.opt").css("background-color", corEixo[3]);
    $("#btn-opt").find("button.opt").css("opacity", "0.8");
    $("#btn-opt").find("button.opt.active").css("opacity", "1");
    $("#btn-opt").find("button.opt.active").css("background-color", corEixo[2])

}

function removeVar(eixo, vrv){

    var eixoUrl = window.location.hash.substring(1);

    //Feito para remover a variável 3 do eixo mercado;
    $(".bread-select-var").find('option').each(function(){
        var breadVal = $(this).val();

        if(eixoUrl == eixo && breadVal == vrv){
            $(this).remove();
        }
    });

}
/*-----------------------------------------------------------------------------
Função: loadMobile
    arruma as ordens das visualizações para mobile (1199px);
Entrada:
    void
Saída:
    void
-----------------------------------------------------------------------------*/

function loadMobile(){

    $(function() {
        $(".bread-select[data-id='eixo']").val(window.location.hash.substring(1));
    });

    // $( ".bread-parent" ).remove();


    $('#containerDesc').css("height", "auto");
    $('#containerDesc').css("top", "0");
    $('#containerDados').css("height", "500px");
    $('#containerTree').css("height", "500px");
    $('#containerTree').css("top", "0");
    $('#containerDownload').css("display", "block");
    $('#containerDownload').css("top", "0");
    $('#containerDownload').find("row").css("padding-left", "0");


    div1 = $('#containerMapa');
    div2 = $('#containerDesc');

    tdiv1 = div1.clone();
    tdiv2 = div2.clone();

    if(!div2.is(':empty')){
        div1.replaceWith(tdiv2);
        div2.replaceWith(tdiv1);

        tdiv1.addClass("replaced");
    }

    div1 = $('#containerBarra');
    div2 = $('#containerMapa');

    tdiv1 = div1.clone();
    tdiv2 = div2.clone();

    if(!div2.is(':empty')){
        div1.replaceWith(tdiv2);
        div2.replaceWith(tdiv1);

        tdiv1.addClass("replaced");
    }

    $('.bread-eixo[data-id=eixo]').val(window.location.hash.substring(1))


}

/*-----------------------------------------------------------------------------
Função: loadPage
    controla tipo de menu (desk/mobile); chama função para carregar os resultados;
Entrada:
    void
Saída:
    void
-----------------------------------------------------------------------------*/
function loadPage(){

    var eixoUrl = window.location.hash.substring(1)

    var menuView = 'menudesktop.php?'+eixoUrl+'=1';

    if(windowWidth<1199){
        menuView = 'menumobile.php?'+eixoUrl+'=1';
        $('#section0').css("display", "none")
        loadMobile();
    }
    else{
        $("#menuvariaveis").css("display", "none")
    }

    /// TODO REVER ESSE TRECHO
    if($("#menuvariaveis").length != 0) {
        $("#menuvariaveis").load(menuView, function(){
            if(url['var']!=='' && pageTitle!==''){
                loadResult();
            }
        });
    }
    else {
        if(url['var']!=='' && pageTitle!==''){
            loadResult();
        }
    }
}

/*-----------------------------------------------------------------------------
Função: controlPageWidth
    controla se largura da tela foi alterada: recarrega a página se for preciso, para que os gráficos não fiquem com o tamanho errado.
Entrada:
    void
Saída:
    void
-----------------------------------------------------------------------------*/
function controlPageWidth(){
    var newWidth = $(window).width();

    /*  só redimensionar o gráfico
        se a largura for alterada! */
    if(newWidth!=windowWidth){

        windowWidth = newWidth;
        var wait;
        clearTimeout(wait);
        wait = setTimeout(location.reload(), 100); /* reload pg! */
    }
}

/*-----------------------------------------------------------------------------
Função: smoothScroll
    controla velocidade do scroll
Entrada:
    void
Saída:
    void
-----------------------------------------------------------------------------*/

///TODO ESSA FUNCAO É NECESSÁRIA?
function smoothScroll(link){
    if (location.pathname.replace(/^\//,'') == link.pathname.replace(/^\//,'') && location.hostname == link.hostname) {
        var target = $(link.hash);
        target = target.length ? target : $('[name=' + link.hash.slice(1) +']');

        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 500);
            return false;
        }
    }
}

function getUf(textJSON) {
    var uf_length = textJSON.length;
    var i;
    for(i = 0; i < uf_length; i++) {
        if(textJSON[i].value === url['uf']) {
            return textJSON[i].name;
        }
    }
}

function changeDescVar() {
    // import pt-br.json file for get the title
    var eixoUrl = getEixo(window.location.hash.substring(1))
    var variavel = textJSON.var[eixoUrl].filter(function(o){ return o.id == url['var']})[0]

    $('.value-info-title').html(variavel.mapa_valores);

    if(url['var'] == 19){
        if(url['mec'] == 0){
            $(".desc-var").html("Quantidade de empresas habilitadas a receber o cartão Vale-Cultura como forma de pagamento por produtos e serviços culturais.");

        }
        else{
            $(".desc-var").html("Quantidade de trabalhadores beneficiados com o Vale-Cultura.");
        }
    }
    else if(url['var'] == 18){
        if(url['mec'] == 0){
            $(".desc-var").html("Valor do consumo com o cartão Vale-Cultura segundo a Unidade Federativa da empresa Recebedora onde o cartão foi utilizado.");

        }
        else{
            $(".desc-var").html("Valor do consumo com o cartão Vale-Cultura, segundo a Unidade Federativa do Trabalhador beneficiado.");
        }
    }
    else{
        $(".desc-var").html(variavel.desc_var_mapa);
    }
}

function cleanDesagsUrl() {
    //url['slc'] = 0;
    //url['ocp'] = 0;
    url['subdeg'] = 0;
    url['pfj'] = 0;
    url['deg'] = 0;
    url['mod'] = 0;
    url['mec'] = 0;
    url['uos'] = 0;
}

function updateWindowUrl(id, valor){

    var replace = id+"=[0-9]*";
    var re = new RegExp(replace,"");

    var urlString = window.location.href.replace(re, id+"="+valor);
    window.history.pushState(null, null, urlString);

    var urlString = parent.window.location.href.replace(re, id+"="+valor);
    parent.window.history.pushState(null, null, urlString);
}

function updateActiveBreadcrumbs(eixo, vrv){
    if(eixo == 0){
        return;
    }
    else if(eixo == 1){
        return;
    }
    else if(eixo == 2){

        switch (vrv){
            case 1:
                hideBreadcrumb('pfj')
                hideBreadcrumb('mod')
                break;
            case 3:
                hideBreadcrumb('pfj')
                break;
            case 4:
                hideBreadcrumb('mod')
                hideBreadcrumb('mec')
                break;
            case 5:
                hideBreadcrumb('pfj')
                hideBreadcrumb('mod')
                hideBreadcrumb('mec')
                break;
            case 7:
                hideBreadcrumb('pfj')
                hideBreadcrumb('mod')
                hideBreadcrumb('mec')
                break;
            case 8:
                hideBreadcrumb('mod')
                hideBreadcrumb('pfj')
                break;
            case 9:
                hideBreadcrumb('pfj')
                hideBreadcrumb('mod')
                break;
            case 10:
                hideBreadcrumb('mod')
                hideBreadcrumb('mec')
                hideBreadcrumb('pfj')
                break;
            case 11:
                hideBreadcrumb('mod')
                hideBreadcrumb('mec')
                hideBreadcrumb('pfj')
                break;
            case 12:
                hideBreadcrumb('pfj')
                hideBreadcrumb('mod')
                hideBreadcrumb('mec')
                break;
            case 13:
                hideBreadcrumb('pfj')
                hideBreadcrumb('mod')
                hideBreadcrumb('mec')
                break;
            case 14:
                hideBreadcrumb('pfj')
                hideBreadcrumb('mod')
                hideBreadcrumb('mec')
                break;
            case 15:
                hideBreadcrumb('pfj')
                hideBreadcrumb('mod')
                break;
            case 16:
                hideBreadcrumb('pfj')
                hideBreadcrumb('mod')
                break;
            case 17:
                hideBreadcrumb('pfj')
                hideBreadcrumb('mod')
                break;
            case 18:
                hideBreadcrumb('pfj')
                hideBreadcrumb('mod')
                hideBreadcrumb('mec')
                break;
            case 19:
                hideBreadcrumb('pfj')
                hideBreadcrumb('mod')
                hideBreadcrumb('mec')
                break;

        }

    }
}

function hideBreadcrumb(id) {
    $(".bread-select[data-id='"+id+"']").parent().parent().css("display","none");
}

/*======
	DOCUMENTO CARREGADO
======*/
$(window).bind("load", function() {

    loadPage(); /* controla menu e fade */

});

function updateUrl() {
    var eixo_atual = getEixo(window.location.hash.substring(1))

    $('.bread-select').each(function() {

        if(eixo_atual == 2 && url['var'] == 18 && $(this).attr('data-id') == 'mec')
            return;

        if($(this).attr('data-id') == "deg" && eixo_atual == 1)
            url[$(this).attr('data-id')] = $(this).find("option:selected").parent().val();
        else
            url[$(this).attr('data-id')] = $(this).val();
    });
}

function updateLegendByDeg(deg){

    if(deg == 0 || parameters.eixo == 0){

        if(url['ocp'] == 0){

            if(parameters.eixo == 2 && parameters.var == 10){

                $(".view-title-leg[data-id='scc&ocp']").html("");

                var legendArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                var html = "";

                legendArray.forEach( function(id) {
                    html += "<span class=\"scc\" data-id="+id+"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+colorJSON.cadeias[id]['color']+"\"></i> "+colorJSON.cadeias[id]['name']+"<br></span>\n";
                } );
            }
            else{

                $(".view-title-leg[data-id='scc&ocp']").html("SETORES");

                var legendArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
                var html = "";

                legendArray.forEach( function(id) {
                    html += "<span class=\"scc\" data-id="+id+"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+colorJSON.cadeias[id]['color']+"\"></i> "+colorJSON.cadeias[id]['name']+"<br></span>\n";
                } );
            }


            $("#title-view-leg-scc").html(html);

            var cads = getCadsByMenu();

            updateBreadcrumbSetores(cads);
        }
        else{
            switchToOcupations();
        }

    }
    else if(deg > 0){

        switch (deg){
            case 1: $(".view-title-leg[data-id='scc&ocp']").html("PORTE"); break;
            case 2: $(".view-title-leg[data-id='scc&ocp']").html("SEXO"); break;
            case 3: $(".view-title-leg[data-id='scc&ocp']").html("IDADE"); break;
            case 4: $(".view-title-leg[data-id='scc&ocp']").html("ESCOLARIDADE"); break;
            case 5: $(".view-title-leg[data-id='scc&ocp']").html("COR"); break;
            case 6: $(".view-title-leg[data-id='scc&ocp']").html("FORMALIDADE"); break;
            case 7: $(".view-title-leg[data-id='scc&ocp']").html("PREVIDÊNCIA"); break;
            case 8: $(".view-title-leg[data-id='scc&ocp']").html("SINDICATO"); break;
        }

        var legendArray = colorJSON.deg[deg]['subdeg'];
        var html = "";

        if(deg == 2 || deg == 6 || deg == 7 || deg == 8){
            var cont = 1;
            for (var nome in legendArray) {
                html += "<span class=\"deg\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+corEixo[cont]+"\"></i>"+nome+"<br></span>\n";
                cont++;
            }
        }
        else{
            for (var nome in legendArray) {
                html += "<span class=\"deg\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+legendArray[nome]+"\"></i>"+nome+"<br></span>\n";
            }
        }

        $("#title-view-leg-scc").html(html)
    }

}

function getCadsByMenu(){
    var cads = [];[];
    $("#title-view-leg-scc").find(".scc").each(function(){
        cad = {id: $(this).attr("data-id"), nome: $(this).text()}
        cads.push(cad)
    })

    return cads;
}

function getCadsByMenuDonut(){
    var cads = [];

    $("#title-view-leg-scc-donut").find(".scc").each(function(){
        cad = {id: $(this).attr("data-id"), nome: $(this).text()}
        cads.push(cad)
    });

    return cads;
}

function getCadsByMenu(){
    var cads = [];[];
    $("#title-view-leg-scc").find(".scc").each(function(){
        cad = {id: $(this).attr("data-id"), nome: $(this).text()}
        cads.push(cad)
    })

    return cads;
}

function switchToSetores() {

    $(".view-title-leg[data-id='scc&ocp']").html("SETORES");
    $("#title-view-leg-scc").empty();

    var eixo = getEixo(window.location.hash.substring(1));
    var cads = updateMenuLegenda(eixo, url['var']);


    updateBreadcrumbSetores(cads);
}

function updateMenuLegenda(eixo, vrv){

    var cads = [];
    if(eixo == 0 && vrv > 9){
        $(".view-title-leg[data-id='scc&ocp']").html("");

        cads = [
            {id: 0, nome: " Todos"}
        ]

        $("#title-view-leg-scc").html("" +
            "        <span data-id=\"1\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+corEixo[1]+"\"></i> Setor<br></span>\n" +
            "        <span data-id=\"2\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+corEixo[2]+"\"></i> UF<br></span>");

    }
    else if(eixo == 1 && (vrv == 3 || vrv == 4)){

        $(".view-title-leg[data-id='scc&ocp']").html("SETORES");

        var legendArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var html = "";

        legendArray.forEach( function(id) {
            html += "<span class=\"scc\" data-id="+id+"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+colorJSON.cadeias[id]['color']+"\"></i> "+colorJSON.cadeias[id]['name']+"<br></span>\n";
        } );

        $("#title-view-leg-scc").html(html);

        cads = getCadsByMenu();
    }
    else if(eixo == 1 && vrv > 11){
        cads = [
            {id: 0, nome: " Todos"}
        ]
        $(".view-title-leg[data-id='scc&ocp']").html("");

        $("#title-view-leg-scc").html("" +
            "        <span data-id=\"1\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+corEixo[1]+"\"></i> Setor<br></span>\n" +
            "        <span data-id=\"2\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+corEixo[2]+"\"></i> UF<br></span>");
    }
    else if(eixo == 2 && vrv == 2){

        ///TODO ESSA VARIAVEL EXISTE???

        var legendArray = [0, 2, 3, 5, 8, 11];
        var html = "";

        legendArray.forEach( function(id) {
            html += "<span class=\"scc\" data-id="+id+"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+colorJSON.cadeias[id]['color']+"\"></i> "+colorJSON.cadeias[id]['name']+"<br></span>\n";
        } );

        $("#title-view-leg-scc").html(html);

        cads = getCadsByMenu();
    }
    else if(eixo == 2 && vrv == 18){


        $("#menu-view-donut").find(".view-title-leg-donut[data-id='scc&ocp']").html("");

        var legendArray = [0, 2, 3, 4, 5, 6, 8, 9, 11];
        var html = "";


        legendArray.forEach( function(id) {
            html += "<span class=\"scc\" data-id="+id+"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+colorJSON.cadeias[id]['color']+"\"></i> "+colorJSON.cadeias[id]['name']+"<br></span>\n";
        });

        $("#menu-view-donut").find("#title-view-leg-scc-donut").html(html);

        cads = getCadsByMenuDonut();
    }
    else if(eixo == 2 && vrv == 19){

        $("#menu-view-donut").find(".view-title-leg-donut[data-id='scc&ocp']").html("");

        var legendArray = [0, 2, 3, 5, 8, 11];
        var html = "";

        legendArray.forEach( function(id) {
            html += "<span class=\"scc\" data-id="+id+"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+colorJSON.cadeias[id]['color']+"\"></i> "+colorJSON.cadeias[id]['name']+"<br></span>\n";
        });

        $("#menu-view-donut").find("#title-view-leg-scc-donut").html(html);

        cads = getCadsByMenuDonut();

    }
    else if(eixo == 2 && (vrv == 15 || vrv == 16)){
        cads =
            [
                {id: 0, nome: " Todos"}
            ]
        $(".view-title-leg[data-id='scc&ocp']").html("");

        $("#title-view-leg-scc").html("" +
            "        <span data-id=\"1\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+corEixo[1]+"\"></i> Setor<br></span>\n" +
            "        <span data-id=\"2\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+corEixo[2]+"\"></i> UF<br></span>");
    }
    else if(eixo == 2 && (vrv == 10)){
        cads =
            [
                {id: 0, nome: " Todos"}
            ]

        $(".view-title-leg[data-id='scc&ocp']").html("");

        $("#title-view-leg-scc").html("" +
            "        <span data-id=\"1\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+corEixo[1]+"\"></i>  DESPESA MINC / RECEITA EXECUTIVO<br></span>\n" +
            "        <span data-id=\"2\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+corEixo[2]+"\"></i> FINANCIAMENTO ESTATAL / RECEITA EXECUTIVO<br></span>");

        console.log("aqui")
    }
    else if(eixo == 2 && (vrv == 17)){
        cads =
            [
                {id: 0, nome: " Todos"}
            ]
        $("#menu-view-donut").find(".view-title-leg-donut[data-id='scc&ocp']").html("");

        $("#menu-view-donut").find("#title-view-leg-scc-donut").html("" +
            "        <span data-id=\"1\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+corEixo[1]+"\"></i>  Possui <br></span>\n" +
            "        <span data-id=\"2\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+corEixo[2]+"\"></i> Não Possui <br></span>");

    }
    else if(eixo == 3 && (vrv >= 1 && vrv != 5 && vrv != 8 && vrv <= 10 || vrv == 12)){
        cads =
            [
                {id: 0, nome: " Todos"},
                {id: 1, nome: " Arquitetura e Design"},
                {id: 2, nome: " Artes Cênicas e Espetáculos"},
                {id: 3, nome: " Audiovisual"},
                {id: 4, nome: " Cultura Digital"},
                {id: 5, nome: " Editorial"},
                {id: 6, nome: " Educação e Criação em Artes"},
                {id: 7, nome: " Entretenimento"},
                {id: 8, nome: " Música"},
                {id: 9, nome: " Patrimônio"}
            ]
        $(".view-title-leg[data-id='scc&ocp']").html("");

        $("#title-view-leg-scc").append("" +
            "        <span data-id=\"1\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+corEixo[1]+"\"></i> Exportação<br></span>\n" +
            "        <span data-id=\"2\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+corEixo[3]+"\"></i> Importação<br></span>");


    }
    else{

        var legendArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        if(eixo != 3){
            legendArray.push(10)
        }

        var html = "";

        legendArray.forEach( function(id) {
            html += "<span class=\"scc\" data-id="+id+"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+colorJSON.cadeias[id]['color']+"\"></i> "+colorJSON.cadeias[id]['name']+"<br></span>\n";
        } );

        $("#title-view-leg-scc").html(html);

        cads = getCadsByMenu();
    }

    return cads;

}

function switchToOcupations() {

    $(".view-title-leg[data-id='scc&ocp']").html("OCUPAÇÕES");

    var legendArray = [1, 2];
    var html = "";

    legendArray.forEach( function(id) {
        html += "<span class=\"ocp\" data-id="+id+"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+colorJSON.ocupacoes[id]['color']+"\"></i> "+colorJSON.ocupacoes[id]['name']+"<br></span>\n";
    } );

    $("#title-view-leg-scc").html(html);

    $(".bread-select[data-id='cad']").empty();

    if(!(url['var'] == 4 || url['var'] == 5 || url['var'] == 6)){
        $(".bread-select[data-id='cad']").append("<option value='3'>Todos</option>");
    }
    $(".bread-select[data-id='cad']").append("<option value='1'>Atividades Relacionadas</option>");
    $(".bread-select[data-id='cad']").append("<option value='2'>Cultura</option>");
    $(".bread-select[data-id='cad']").attr("data-id", "ocp");
}

function updateSelectsByUrl(){

    var eixo = parent.window.location.hash.substring(1)
    var urlString = parent.window.location.href;
    var parametrosUrl = urlString.split("?")[1].split("#")[0].split("&");
    var parametros = [];

    var obj = {};
    parametrosUrl.forEach( function(i) {
        obj[i.split("=")[0]] = i.split("=")[1];
    } );

    if ( obj.hasOwnProperty('slc') ) {
        url['slc'] = obj['slc'];
    }

    if ( obj.hasOwnProperty('ocp') ) {
        url['ocp'] = obj['ocp'];
    }

    if ( obj.hasOwnProperty('subdeg') ) {
        url['subdeg'] = obj['subdeg'];
    }

    $(".bread-select").each(function(){

        if(eixo == "mercado" && $(this).attr("data-id") == 'deg'){
            $(this).find("optgroup[value="+obj['deg']+"]").find("option[value="+obj['subdeg']+"]").prop('selected', true);
            url['deg'] = obj['deg'];
        }
        else{
            $(this).val(obj[$(this).attr("data-id")]);
            url[$(this).attr("data-id")] = $(this).val();
        }
    })


}

function updateSelectsByVar(){


    if(parameters.eixo == 2 && parameters.var == 18){
        array_cad = []
    }

}

function updateOptView(container, btn){

    if(container == "init"){

        $(".btn-mapa button.opt.view").each(function(){


            if(parameters.chg){
                if($(this).attr("id") == "mapa"){

                    $(this).css("opacity", "1")
                    if(parameters.eixo == 0)
                        $(this).css("background-color", corEixo[1]);
                    else
                        $(this).css("background-color", corEixo[2]);

                }
                else{
                    $(this).css("opacity", "0.8")
                    if(parameters.eixo == 0)
                        $(this).css("background-color", corEixo[2]);
                    else
                        $(this).css("background-color", corEixo[1]);
                }
            }
            else{
                if($(this).attr("id") == "treemap_region"){
                    $(this).css("opacity", "1")
                    if(parameters.eixo == 0)
                        $(this).css("background-color", corEixo[1]);
                    else
                        $(this).css("background-color", corEixo[2]);
                }
                else{
                    $(this).css("opacity", "0.8")
                    if(parameters.eixo == 0)
                        $(this).css("background-color", corEixo[1]);
                    else
                        $(this).css("background-color", corEixo[2]);
                }
            };

        });

        $(".btn-opt button.opt.view").each(function(){

            if(parameters.eixo == 2){
                if(url['var'] == 18 || url['var'] == 19){
                    $(this).css("display","block")

                }
                else{
                    $(this).css("display","none")

                }
            }

            if(parameters.eixo == 1){
                if(parameters.ocp != '0'){

                    switchToOcupations();
                    $(window.document).find(".bread-select[data-id=ocp]").parent().find("span").text("Ocupação")

                    if($(this).attr("id") == "setor"){
                        $(this).css("opacity", "0.8")
                        if(parameters.eixo == 0)
                            $(this).css("background-color", corEixo[1]);
                        else
                            $(this).css("background-color", corEixo[1]);
                    }
                    else{
                        $(this).css("opacity", "1")
                        if(parameters.eixo == 0)
                            $(this).css("background-color", corEixo[2]);
                        else
                            $(this).css("background-color", corEixo[2]);
                    }
                }
                else{

                    switchToSetores();
                    $(window.document).find(".bread-select[data-id=cad]").parent().find("span").text("Setor")

                    if($(this).attr("id") == "ocupacao"){
                        $(this).css("opacity", "1")
                        if(parameters.eixo == 0)
                            $(this).css("background-color", corEixo[1]);
                        else
                            $(this).css("background-color", corEixo[1]);
                    }
                    else {
                        $(this).css("opacity", "1")
                        if (parameters.eixo == 0)
                            $(this).css("background-color", corEixo[1]);
                        else
                            $(this).css("background-color", corEixo[2]);
                    }
                }
            }
            else if(parameters.eixo == 2){
                changeDescVar();

                if(parameters.mec == 0){
                    if($(this).attr("id") == "recebedora"){
                        $(this).css("opacity", "1")
                        $(this).css("background-color", corEixo[1]);
                    }
                    else{
                        $(this).css("opacity", "0.8")
                        $(this).css("background-color", corEixo[2]);
                    }
                }
                else{
                    if($(this).attr("id") == "recebedora"){
                        $(this).css("opacity", "0.8")
                        $(this).css("background-color", corEixo[2]);
                    }
                    else{
                        $(this).css("opacity", "1")
                        $(this).css("background-color", corEixo[1]);
                    }
                }

            }


            if(parameters.eixo == 3){
                if(parameters.slc == 1){
                    if($(this).attr("id") == "bens"){
                        $(this).css("opacity", "0.8")
                        $(this).css("background-color", corEixo[3]);
                    }
                    else{
                        $(this).css("opacity", "1")
                        $(this).css("background-color", corEixo[2]);
                    }
                }
                else{
                    if($(this).attr("id") == "bens"){
                        $(this).css("opacity", "1")
                        $(this).css("background-color", corEixo[2]);
                    }
                    else{
                        $(this).css("opacity", "0.8")
                        $(this).css("background-color", corEixo[3]);
                    }
                }

            }

        });
    }
    else{

        if(container == "content-btn-mapa "){
            $(".btn-mapa button.opt.view").each(function(){
                if($(btn).attr("id") == $(this).attr("id")){
                    $(this).css("opacity", "1");
                    if(parameters.eixo == 0)
                        $(this).css("background-color", corEixo[1]);
                    else
                        $(this).css("background-color", corEixo[2]);
                }
                else{
                    $(this).css("opacity", "0.8")
                    if(parameters.eixo == 0)
                        $(this).css("background-color", corEixo[2]);
                    else
                        $(this).css("background-color", corEixo[1]);

                }
            });
        }
        else{
            if(container == "btn-opt"){
                $("#btn-opt button.opt.view").each(function(){
                    if($(btn).attr("id") == $(this).attr("id")){
                        $(this).css("opacity", "1");
                        if(parameters.eixo == 0 || parameters.eixo == 2)
                            $(this).css("background-color", corEixo[1]);
                        else if(parameters.eixo == 3)
                            $(this).css("background-color", corEixo[2]);

                        else
                            $(this).css("background-color", corEixo[2]);
                    }
                    else{
                        $(this).css("opacity", "0.8")
                        if(parameters.eixo == 0 || parameters.eixo == 2)
                            $(this).css("background-color", corEixo[2]);
                        else if(parameters.eixo == 3)
                            $(this).css("background-color", corEixo[3]);
                        else
                            $(this).css("background-color", corEixo[1]);

                    }
                });
            }
        }


    }





}


/*======
	documento pronto
======*/


$(document).ready(function(){

    /* ATUALIZA OS IFRAMES QUANDO A JANELA FOR REDIMENSIONADA */
    $(window).resize(function() {
        controlPageWidth();
    });


    /*=== selecionar variável ===*/

    $(document).on('click', ".scc", function(){



        var eixo = parameters.eixo

        if((eixo == 0 && url['var'] < 10) || (eixo == 1 && url['var'] < 12) || (eixo == 2 && url['var'] >= 18) || eixo == 3 ){

            var setor = $(this).attr('data-id');

            if(setor != parameters.cad) {

                if(eixo == 2 && parameters.var == 19 && parameters.mec == 1)
                    return;


                url['cad'] = setor;
                parameters.cad = url['cad']

                if (setor == 0 && parameters.var > 7) {
                    url['subdeg'] = 0;
                    parameters.subdeg = url['subdeg']
                }

                $(".bread-select[data-id='cad']").val($(this).attr("data-id"));
                updateWindowUrl('cad', setor)
                updateIframe(url);
            }
        }
        else if(eixo == 2 && parameters.var < 15){
            var setor = $(this).attr('data-id');

            if(setor != parameters.cad) {

                url['cad'] = setor;
                parameters.cad = setor;

                $(".bread-select[data-id='cad']").val($(this).attr("data-id"));
                updateWindowUrl('cad', url['cad'])
                updateWindowUrl('uf', url['uf'])
                updateIframe(url);
            }
        }

    });

    $(document).on('click', ".ocp", function(){



        var eixo = parameters.eixo

        if(eixo == 1 && url['var'] < 12){

            var ocp = $(this).attr('data-id');

            if(ocp != parameters.ocp){
                url['ocp'] = ocp;
                parameters.ocp = url['ocp']
                $(".bread-select[data-id='cad']").val($(this).attr("data-id"));

                updateWindowUrl('ocp', ocp)
                updateIframe(url);
            }


        }

    });

    $(document).on('click', ".deg", function(){


        parameters.subdeg = getSubdegId(parameters.deg, $(this).text());


        updateWindowUrl('subdeg', parameters.subdeg)


        $(".bread-select[data-id=deg]").find("optgroup[value="+parameters.deg+"]").find("option[value="+parameters.subdeg+"]").prop('selected', true)
        updateIframe();


    });


    if(url['var'] === "" && window.location.pathname.match("page.php")){
        controlVarPage(url['var']);
    }

    if(url['var']) {
        if(window.location.pathname.match("resultado.php")){
            updateActiveBreadcrumbs(getEixo(window.location.hash.split("#")[1]), parseInt(url['var']));
        }
        controlVar(url['var']);
    }

    /*=== resultado ===*/

    /* alterar tipo de visualização */
    $(document).on('click', "button.opt.view", function(){

        ///TODO REFATORAR

        var id = $(this).attr("id");
        var texto = $(this).html();

        updateOptView($(this).parent().parent().attr("class"), $(this))


        if(id == "treemap_region" || id == "mapa" || id == "mundo") {
            updateUrl();

            if(parameters.eixo == 3){

                if(id == "mapa") url['mundo'] = 1;
                else if(id == "mundo") url['mundo'] = 0;

                updateWindowUrl('mundo', url['mundo']);

            } else {

                if(id === "treemap_region") url['chg'] = '1';
                else if(id === "mapa") url['chg'] = '0';

                updateWindowUrl('chg', url['chg'])
            }
            
            updateIframe(url); /* atualiza gráfico */


        }
        else {
            updateUrl();
            if(parameters.eixo == 3){
                var botao = PT_BR.dados_botoes[id];

                url['slc'] = botao.slc;
                var index_ano = botao.slc == 0 ? 1 : 0;
                url['ano'] = d3.max(anos_default[parameters.var][index_ano]);

                $(this).addClass("active");
                $('#'+botao.complement).removeClass("active");

                updateWindowUrl('slc', url['slc']);
                updateWindowUrl('ano', url['ano']);

                updateIframe(url);
            }
            else if(parameters.eixo == 2){

                var botao = PT_BR.dados_botoes[id];

                url['mec'] = botao.mec;
                updateWindowUrl('mec', url['mec'])

                updateOptView($(this).parent().parent().attr("class"), $(this))

                changeDescVar();

                updateIframe(url);
            }
            else {
                if(id === "setor") {
                    $(window.document).find(".bread-select[data-id=ocp]").parent().find("span").text("Setor")
                    $(window.document).find(".bread-select[data-id=ocp]").attr('data-id', 'cad');

                    enableDesag(getEixo(window.location.hash.substring(1)), url['var'], url['cad'], false, 0, url);
                    switchToSetores();

                    url['slc'] = 0;
                    url['deg'] = 0;
                    url['ocp'] = 0;

                    controlFilter('0', 'deg');
                    $(this).addClass("active");
                    $('#ocupacao').removeClass("active");

                    url['ano'] = d3.max(anos_default[url['var']][0]);

                    updateWindowUrl('slc', url['slc'])
                    updateWindowUrl('deg', url['deg'])
                    updateWindowUrl('ocp', url['ocp'])
                    updateWindowUrl('ano', url['ano'])

                }
                else {
                    enableDesag(getEixo(window.location.hash.substring(1)), url['var'], url['cad'], false, 1, url);

                    updateDataDescUoS();

                    switchToOcupations();
                    url['slc'] = 1;
                    url['deg'] = 0;
                    url['cad'] = 0;

                    if(url['var'] == 4 || url['var']  == 5 || url['var']  == 6)
                        url['ocp'] = 1;
                    else
                        url['ocp'] = 3;
                    controlFilter('0', 'deg');
                    url['cad'] = 0;

                    url['ano'] = d3.max(anos_default[url['var']][1]);

                    updateWindowUrl('slc', url['slc'])
                    updateWindowUrl('deg', url['deg'])
                    updateWindowUrl('ocp', url['ocp'])
                    updateWindowUrl('ano', url['ano'])
                    updateWindowUrl('cad', url['cad'])

                    $(this).addClass("active");
                    $('#setor').removeClass("active");

                    //troca o nome do select de setor
                    $(window.document).find(".bread-select[data-id=ocp]").parent().find("span").text("Ocupação")
                }
            updateIframe(url); /* altera gráfico */
        }
    }

    });

    $(document).on('change', ".bread-select", function(e){

        var dataId = $(this).attr("data-id");
        var dataVal = $(this).val();

        if(dataId !== "eixo") {
            updateUrl();

            // var eixo_atual = $('.bread-eixo[data-id="eixo"]').prop('selectedIndex');
            var eixo_atual = getEixo(window.location.hash.substring(1));

            if( $(".bread-select[data-id=deg]").find('option:selected').parent().attr("value") != undefined){
                url['deg'] =  $(".bread-select[data-id=deg]").find('option:selected').parent().attr("value")
            }
            else{
                url['deg'] = $(".bread-select[data-id=deg]").val()
            }

            if(dataId === "typ"){
                if($(this).val() == 3 && (url['var'] == 1 || url['var'] == 13) )
                    $(window.document).find(".percent-value").find(".box-dado").first().css("display", "none")
                else
                    $(window.document).find(".percent-value").find(".box-dado").first().css("display", "block")
            }

            if(dataId === "prc"){
                updateWindowUrl('prc', dataVal);
                $(window.document).find(".prc-title").first().html(this.options[e.target.selectedIndex].text);
                // updateDataDesc(url['var'], $(this).attr("data-id"), this.options[e.target.selectedIndex].text)
            }

            if(dataId ==='var'){

                updateOptView()

                $('.percent-value').find(".box-dado").find('.number').first().text("")
                cleanDesagsUrl();
                getAnoDefault(eixo_atual);


                if(url['ocp'] == 0){
                    switchToSetores();
                    $('#setor').addClass("active");
                    $('#ocupacao').removeClass("active");
                }
                else{
                    switchToOcupations();
                }


                if(url['ocp'] > 0)
                    enableDesag(getEixo(window.location.hash.substring(1)), $(this).val(), url['cad'], false, 1, url);
                else
                    enableDesag(getEixo(window.location.hash.substring(1)), $(this).val(), url['cad'], false, 0, url);

                $('.bread-select[data-id=uf]').val(0);
                $('.bread-select[data-id=cad]').val(0);
                $('.bread-select[data-id=deg]').val(0);

                url['uf'] = 0;
                url['cad'] = 0;
                url['mod'] = 0;
                url['deg'] = 0;
                url['subdeg'] = 0;
                url['pfj'] = 0;



                updateWindowUrl('uf', url['uf']);
                updateWindowUrl('cad', url['cad']);
                updateWindowUrl('deg', url['deg']);
                updateWindowUrl('subdeg', url['subdeg']);
                updateWindowUrl('ano', url['ano']);
                updateWindowUrl('var', url['var']);
                updateWindowUrl('mod', url['mod']);
                updateWindowUrl('pfj', url['pfj']);

                if(eixo_atual == 0 || eixo_atual == 1){
                    updateWindowUrl('chg', 0);
                }

                $(window.document).find(".cad-title").first().html($('.bread-select[data-id=cad] option:selected').text());
                $(window.document).find(".title[data-id='var-title']").first().html($('.bread-select[data-id=var] option:selected').text());

                updateMenuSetor(getEixo(window.location.hash.substring(1)), $(this).val());
                updateBreadUF(eixo_atual, url['var']);

                if(eixo_atual == 0){
                    $('#mapa').addClass("active");
                    $('#treemap_region').removeClass("active");
                    $('.bread-select[data-id=deg]').val(0);

                }
                if(eixo_atual == 1){

                    if(url['ocp'] > 0){
                        updateDefaultOcupation()
                    }
                    updateOcupacoes($(this).val());
                }

                if(eixo_atual == 2){
                    updateOptView('init')
                    updateDefaultMec(url['var']);
                    if(url['var'] != 17){
                        $(".value-info-title").text("")
                    }

                    if(url['var'] == 18 || url['var'] == 19){
                        $("#btn-opt").find(".col-btn").css("display", "block")
                    }
                    else{
                        $("#btn-opt").find(".col-btn").css("display", "none")
                    }

                }

                if(eixo_atual == 3){
                    if(url['var'] == 1 || url['var'] == 13 || url['var'] == 5 || url['var'] == 8)
                        $(window.document).find(".percent-value").find(".box-dado").first().css("display", "block")
                    updateServicos(url['var']);
                    updateTipo(url['var']);
                    url['typ'] = 1;
                    url['slc'] = 0;

                    updateWindowUrl('typ', url['typ'])
                    updateWindowUrl('slc', url['slc'])

                    $('#bens').addClass("active");
                    $('#servicos').removeClass("active");

                    updateColorButtons(url['slc'])

                    $(".opt-select[data-id='typ']").val(1);
                    $('.bread-select[data-id=typ]').val(1);
                    if((url['var'] >= 5 && url['var'] <= 12) || url['var'] == 14){
                        $('.bread-select[data-id=prc]').val(0);
                        url['prc'] = 0;
                        updateWindowUrl('prc', url['prc'])

                    }
                    $(window.document).find(".prc-title").first().html($(".bread-select[data-id='prc'] option:selected").text());

                }

                changeDescVar();


            }


            if(dataId === 'deg') {

                if(eixo_atual == 1){
                    if($(this).find('option:selected').parent().attr("value") != undefined){
                        deg_value =  $(this).find('option:selected').parent().attr("value")
                    }
                    else{
                        deg_value = $(this).val()


                    }
                    controlFilter(deg_value, $(this).attr('data-id'), $(this).val());


                    if(url['var'] == 4 || url['var'] == 5 || url['var'] == 6){
                        updateLegendByDeg(deg_value)
                    }

                    updateWindowUrl('deg', deg_value);
                    updateWindowUrl('subdeg', $(this).val());

                    url['deg'] = deg_value;
                    url['subdeg'] = $(this).val();

                }
                else{
                    controlFilter($(this).val(), $(this).attr('data-id'), 1);
                }

            }


            if(dataId === "uf"){
                updateWindowUrl('uf', dataVal);

                $(window.document).find(".state-title").first().html(this.options[e.target.selectedIndex].text);
                updateDataDesc(url['var'], $(this).attr("data-id"), this.options[e.target.selectedIndex].text)

            }

            if(dataId === "cad") {
                url['cad'] = ($(this).val())
            }

            if(dataId === "mod") {
                url['mod'] = ($(this).val())
                url['mec'] = 0;
                updateWindowUrl('mec', 0)
                $(".bread-select[data-id=mec]").val(0);

            }

            if(dataId === "mec") {
                url['mec'] = ($(this).val())
                url['mod'] = 0;
                updateWindowUrl('mod', 0)
                $(".bread-select[data-id=mod]").val(0);

            }

            if(dataId === "ocp") {
                $(window.document).find(".cad-title").first().html(this.options[e.target.selectedIndex].text);
            }

            if(!(eixo_atual == 1 && dataId == 'deg')){
                updateWindowUrl(dataId, dataVal);
            }

            updateIframe(url);
        }
        else{
            parent.window.location = "page.php#"+$(this).val();
        }
    });


    /* download doc */
    $(document).on('click', '.button-control-down', function(){

        var downloadUrl = $(this).siblings('.url-input').val();
        window.open(downloadUrl, '_blank');

    });

    defaultUrl();
    updateSelectsByUrl();



    if(window.location.pathname.match("resultado")){
        changeDescVar();
        updateMenuSetor(getEixo(window.location.hash.substring(1)), url['var']);
        updateOptView("init");
        updateBreadUF(getEixo(window.location.hash.substring(1)), url['var'])
        updateMecanismo(url, url['var'])
        updateSelectsByVar();
        if(url['ocp'] > 0){
            enableDesag(getEixo(window.location.hash.substring(1)), parameters.var, parameters.cad, false, 1, url);
        }
        else{
            enableDesag(getEixo(window.location.hash.substring(1)), parameters.var, parameters.cad, false, 0, url);
        }

        updateLegendByDeg(parameters.deg)
        updateMenuLegenda(getEixo(window.location.hash.substring(1)), url['var']);

        if(parameters.eixo == 2 && (parameters.var >= 18)){
            updateBreadcrumbSetores(getCadsByMenuDonut());
        }

    }

});

