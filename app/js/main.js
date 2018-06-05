var windowWidth = $(window).width();
var cont = 0;
var anos_default;

var textJSON = []
var colorJSON = []

$.get("./data/pt-br.json", function(data){
    textJSON = data
})

$.get("./data/colors.json", function(data){
    colorJSON = data
})

//$.ajaxSetup({async: false});
$.get("./db/json_ano_default.php?eixo="+getEixo(window.location.hash.substring(1)), function(data) {
    anos_default = JSON.parse(data);
});


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
    $('iframe[id="resultado_view"]').attr('src', 'resultado.php?var='+clickVar+'&view=mapa&uf=0&prt=0&atc=0&cad=0&ocp=0&eixo='+newHash.substring(1)+newHash);
}

function controlVarPage(clickVar){
    newHash = window.location.hash;

    var urlString = "";

    switch (newHash.substring(1)){
        case "empreendimentos": urlString = 'page.php?var=1&uf=0&deg=0&cad=0&ano=2014&eixo='+newHash.substring(1)+newHash;
                                    break;
        case "mercado":         urlString = 'page.php?var=1&uf=0&deg=0&subdeg=0&cad=0&ano=2014&ocp=0&slc=0&eixo='+newHash.substring(1)+newHash;
                                    break;
        case "politicas":       urlString = 'page.php?var=1&uf=0&deg=0&cad=0&ano=2014&mec=0&mod=0&pfj=0&eixo='+newHash.substring(1)+newHash;
                                     break;
        case "comercio":        urlString = 'page.php?var=1&uf=0&prc=0&typ=0&cad=0&ano=2014&slc=0&eixo='+newHash.substring(1)+newHash;
                                    break;
    }

    window.location.href = urlString;

    /* variáveis com valores default */
}

function getAnoDefault(eixo_atual){
    switch(eixo_atual){
        case 0: url['ano'] = anos_default[url['var']][0]; break;
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
            url['ano'] = anos_default[url['var']][index_ocp]; break;

        case 2:
            if(url['var'] != 17)
                url['ano'] = anos_default[url['var']][0];
            else
                url['ano'] = 2017
            break;
        case 3:
            if(url['var'] >= 11)
                url['slc'] = 0
            index = url['slc'] == 0 ? 1 : 0

            url['ano'] = anos_default[url['var']][index]; break;
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
    url['view'] = 'mapa';
    url['uf'] = 0;
    url['cad'] = 0;
    url['prt'] = 0;
    url['atc'] = 0;
    url['ocp'] = 0;
    url['fax'] = 0;
    url['cor'] = 0;
    url['frm'] = 0;
    url['snd'] = 0;
    url['sex'] = 0;
    url['prv'] = 0;
    url['deg'] = 0;
    url['mec'] = 0;
    url['mod'] = 0;
    url['pfj'] = 0;
    url['uos'] = 0;
}

/*-----------------------------------------------------------------------------
Função: changeChart
    redireciona a página de acordo com os parametros da url
Entrada:
    url = objeto com os parâmetros e seus valores
Saída:
    void
-----------------------------------------------------------------------------*/
function changeChart(url){

    var newUrl = "",
        count = 0,
        size = Object.keys(url).length;
    $.each(url, function(key,value){

        newUrl = newUrl+key+"="+value;

        if((++count)!=size) newUrl = newUrl+"&";
    });
    window.location.href = 'resultado.php?'+newUrl+"&eixo="+window.location.hash.substring(1)+window.location.hash;
    if($('iframe[id="view_box"]').length != 0) {
        $('iframe[id="view_box"]').attr('src', url['view']+'.php?'+newUrl+'&eixo='+window.location.hash.substring(1)+window.location.hash);
    }
    if($('iframe[id="view_box_barras"]').length != 0) {
        $('iframe[id="view_box_barras"]').attr('src', url['view']+'.php?'+newUrl+'&eixo='+window.location.hash.substring(1)+window.location.hash);
    }
    if($('iframe[id="view_box_scc"]').length != 0) {
        $('iframe[id="view_box_scc"]').attr('src', 'treemap_scc.php?'+newUrl+'&eixo='+window.location.hash.substring(1)+window.location.hash);
    }
}

function updateIframe(url){

    var newUrl = "",
        count = 0,
        size = Object.keys(url).length;
    $.each(url, function(key,value){

        newUrl = newUrl+key+"="+value;

        if((++count)!=size) newUrl = newUrl+"&";
    });

    var eixoAtual = getEixo(window.location.hash.substring(1));

    ///BOX DO MAPA
    if($('iframe[id="view_box"]').length != 0) {
        if(eixoAtual == 0){
            if(url['var'] > 9){

                $('iframe[id="view_box"]').parent().find(".content-btn-mapa").css("display", "none")


                newUrl = newUrl.replace(/uos=[0-9]*/, "uos=0");
                $('iframe[id="view_box"]').attr('src', 'barras.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                $('iframe[id="view_box"]').parent().find(".view-title").html("SÉRIE HISTÓRICA POR UF");
            }
            else{

                if(url['view'] == 'mapa'){
                    $('iframe[id="view_box"]').parent().find(".view-title").html("MAPA DO BRASIL");

                }
                else if(url['view'] == 'treemap_region'){
                    $('iframe[id="view_box"]').parent().find(".view-title").html("TREEMAP UFs");

                }

                if( url['var'] == 3 || url['var'] == 2 || url['var'] == 9){
                    $('iframe[id="view_box"]').parent().find(".content-btn-mapa").css("display", "none")
                } else{
                    $('iframe[id="view_box"]').parent().find(".content-btn-mapa").css("display", "block")

                }
                $('iframe[id="view_box"]').attr('src', url['view']+'.php?'+newUrl+'&eixo='+window.location.hash.substring(1)+window.location.hash);
            }
        }
        else if(eixoAtual == 1) {
            $('iframe[id="view_box"]').parent().find(".content-btn-mapa").css("display", "none")
            if (url['var'] > 11) {
                if(url['slc'] == 0) {

                    newUrl = newUrl.replace(/uos=[0-9]*/, "uos=0");
                    $('iframe[id="view_box"]').attr('src', 'barras.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                    $('iframe[id="view_box"]').parent().find(".view-title").html("SÉRIE HISTÓRICA POR UF");
                }
                else{
                    newUrl = newUrl.replace(/uos=[0-9]*/, "uos=0");
                    newUrl = newUrl.replace(/ocp=[0-9]*/, "ocp=1");
                    $('iframe[id="view_box"]').attr('src', 'barras.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                    $('iframe[id="view_box"]').parent().find(".view-title").html("SÉRIE HISTÓRICA POR ATIVIDADES RELACIONADAS");
                }
            } else {
                $('iframe[id="view_box"]').attr('src', url['view'] + '.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                $('iframe[id="view_box"]').parent().find(".view-title").html("MAPA DO BRASIL");
            }
        }
        else if(eixoAtual == 2){
            $('iframe[id="view_box"]').parent().find(".content-btn-mapa").css("display", "none")

            if(url['var'] == 17 || url['var'] == 18 ||  url['var'] == 19){
                $('iframe[id="view_box"]').attr('src', url['view']+'.php?'+newUrl+'&eixo='+window.location.hash.substring(1)+window.location.hash);
                $('iframe[id="view_box"]').parent().find(".view-title").html("MAPA DO BRASIL");
            }
            else if(url['var'] == 16){
                newUrl = newUrl.replace(/uos=[0-9]/, "uos=0");
                $('iframe[id="view_box"]').attr('src', 'barras.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                $('iframe[id="view_box"]').parent().find(".view-title").html("SÉRIE ÍNDICE HERFINDAHL-HIRSCHMAN PARA CONCENTRAÇÃO DOS PROJETOS FOMENTADOS POR UF");

            }
            else if(url['var'] == 15){
                newUrl = newUrl.replace(/uos=[0-9]/, "uos=0");
                $('iframe[id="view_box"]').attr('src', 'barras.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                $('iframe[id="view_box"]').parent().find(".view-title").html("SÉRIE HISTÓRICA POR UF");

            }
            else if (url['var'] > 14 || url['var'] == 10) {
                newUrl = newUrl.replace(/mec=[0-9]/, "mec=0");
                $('iframe[id="view_box"]').attr('src', 'barras.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                $('iframe[id="view_box"]').parent().find(".view-title").html("SÉRIE HISTÓRICA FINANCIAMENTO ESTATAL / RECEITA EXECUTIVO");
            }
            else{
                $('iframe[id="view_box"]').attr('src', url['view']+'.php?'+newUrl+'&eixo='+window.location.hash.substring(1)+window.location.hash);
                $('iframe[id="view_box"]').parent().find(".view-title").html("MAPA DO BRASIL");
            }


        }
        else if(eixoAtual == 3){

            //$('iframe[id="view_box"]').parent().find(".content-btn-mapa").css("display", "none")
            $('#mapa').html("MUNDO");
            $('#treemap_region').html("BRASIL");
            //alert(url['view'])

            if(url['mundo'] == null || url['mundo'] == 0){
                $('iframe[id="view_box"]').parent().find(".view-title").html("MAPA MUNDI");
                //$(".state-title").html("MUNDO");

            }
            else{
                $('iframe[id="view_box"]').parent().find(".view-title").html("MAPA DO BRASIL");
                //$(".state-title").html("BRASIL");

            }

            if(url['var'] == 5 || url['var'] == 8){
                newUrl = newUrl.replace(/cad=[0-9]*/, "cad=1");
                $('iframe[id="view_box"]').attr('src', 'barras.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);

                $('iframe[id="view_box"]').parent().find(".content-btn-mapa").css("display", "none")
                if(url['var'] == 8)
                    $('iframe[id="view_box"]').parent().find(".view-title").html("IHH VALOR ABSOLUTO POR SETORES");
                else if(url['var'] == 5)
                    $('iframe[id="view_box"]').parent().find(".view-title").html("C4 VALOR ABSOLUTO POR SETORES");

            }
            else if(url['var'] > 5 && url['var'] < 13 || url['var'] == 14 ){

                $('iframe[id="view_box"]').parent().find(".content-btn-mapa").css("display", "none")
                //$('iframe[id="view_box"]').attr('src', 'line_scc.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                $('iframe[id="view_box"]').attr('src', 'no-view.html');

            }
            else{

                $('iframe[id="view_box"]').parent().find(".content-btn-mapa").css("display", "block")
                $('iframe[id="view_box"]').attr('src', url['view']+'.php?'+newUrl+'&eixo='+window.location.hash.substring(1)+window.location.hash);

            }

        }
    }

    ///BOX DO BARRAS
    if ($('iframe[id="view_box_barras"]').length != 0) {
        $('iframe[id="view_box_barras"]').attr('src', 'barras.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);

        if(eixoAtual == 0) {
            $('iframe[id="view_box_barras"]').parent().find(".view-title").html("SÉRIE HISTÓRICA [uf] [cad]");
            if (url['var'] > 9) {
                newUrl = newUrl.replace(/uos=[0-9]*/, "uos=1");
                $('iframe[id="view_box_barras"]').attr('src', 'barras.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                $('iframe[id="view_box_barras"]').parent().find(".view-title").html("SÉRIE HISTÓRICA POR SETOR");
            }
        }
        else if(eixoAtual == 1) {
            $('iframe[id="view_box_barras"]').parent().find(".view-title").html("SÉRIE HISTÓRICA [uf] [cad]");
            if (url['var'] > 11) {
                if(url['slc'] == 0) {
                    newUrl = newUrl.replace(/uos=[0-9]*/, "uos=1");
                    $('iframe[id="view_box_barras"]').attr('src', 'barras.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                    $('iframe[id="view_box_barras"]').parent().find(".view-title").html("SÉRIE HISTÓRICA POR SETOR");
                }
                else {
                    newUrl = newUrl.replace(/uos=[0-9]*/, "uos=1");
                    newUrl = newUrl.replace(/ocp=[0-9]*/, "ocp=2");
                    $('iframe[id="view_box_barras"]').attr('src', 'barras.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                    $('iframe[id="view_box_barras"]').parent().find(".view-title").html("SÉRIE HISTÓRICA POR ATIVIDADES CULTURAIS");
                }
            }
        }
        else if(eixoAtual == 2){
            $('iframe[id="view_box_barras"]').parent().find(".view-title").html("SÉRIE HISTÓRICA [uf] [cad]");

            if (url ['var'] == 15) {
                newUrl = newUrl.replace(/uos=[0-9]/, "uos=1");
                $('iframe[id="view_box_barras"]').attr('src', 'barras.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                $('iframe[id="view_box_barras"]').parent().find(".view-title").html("SÉRIE HISTÓRICA POR SETOR");

            }
            else if(url['var'] == 16){
                newUrl = newUrl.replace(/uos=[0-9]/, "uos=1");
                $('iframe[id="view_box_barras"]').attr('src', 'barras.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                $('iframe[id="view_box_barras"]').parent().find(".view-title").html("SÉRIE ÍNDICE HERFINDAHL-HIRSCHMAN PARA CONCENTRAÇÃO DOS PROJETOS FOMENTADOS POR SETOR");

            }
            else if(url['var'] == 17){
                $('iframe[id="view_box_barras"]').parent().find(".view-title").html("PROPORÇÃO DE ESTADOS QUE POSSUEM MECENATO ESTADUAL");
                $('iframe[id="view_box_barras"]').attr('src', 'donut.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
            }
            else if (url['var'] ==  18) {
                $('iframe[id="view_box_barras"]').parent().find(".view-title").html("PROPORÇÃO ACUMULADA POR SETOR");
                $('iframe[id="view_box_barras"]').attr('src', 'donut.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
            }
            else if (url['var'] ==  19) {
                if(url['mec'] == 0){
                    $('iframe[id="view_box_barras"]').parent().find(".view-title").html("PROPORÇÃO ACUMULADA POR SETOR");
                    $('iframe[id="view_box_barras"]').attr('src', 'donut.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                }
                else if(url['mec'] == 1){
                    $('iframe[id="view_box_barras"]').parent().find(".view-title").html("");
                    $('iframe[id="view_box_barras"]').attr('src', 'no-view.html');
                }

            }
            else if(url['var'] == 10){
                newUrl = newUrl.replace(/mec=[0-9]/, "mec=1");
                $('iframe[id="view_box_barras"]').attr('src', 'barras.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                $('iframe[id="view_box_barras"]').parent().find(".view-title").html("SÉRIE HISTÓRICA DESPESA MINC / RECEITA EXECUTIVO");

            }
        }
        else if( eixoAtual == 3){
            $('iframe[id="view_box_barras"]').parent().find(".view-title").html("SÉRIE HISTÓRICA [uf] [cad]");

            if(url['var'] >= 1 && url['var'] != 5 && url['var'] != 8 && url['var'] <= 10 || url['var'] == 12){
                $('iframe[id="view_box_barras"]').css('display', 'block')
                $('iframe[id="view_box_barras"]').attr('src', 'donut.php?' + newUrl + '&eixo=' +  window.location.hash.substring(1) + window.location.hash)
                $('iframe[id="view_box_barras"]').parent().find(".view-title").html("PROPORÇÃO EXPORTAÇÃO-IMPORTAÇÃO");
            }

            else if(url['var'] == 5 || url['var'] == 8){
                newUrl = newUrl.replace(/cad=[0-9]*/, "cad=0");
                $('iframe[id="view_box_barras"]').attr('src', 'barras.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                if(url['var'] == 8)
                    $('iframe[id="view_box_barras"]').parent().find(".view-title").html("IHH VALOR ABSOLUTO POR PARCEIROS");
                else if(url['var'] == 5)
                    $('iframe[id="view_box_barras"]').parent().find(".view-title").html("C2 VALOR ABSOLUTO POR PARCEIROS");
            }

        }

    }

    /// BOX DO GRAFICO SCC

    if ($('iframe[id="view_box_scc"]').length != 0) {
        $('iframe[id="view_box_scc"]').attr('src', 'treemap_scc.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);

        if(eixoAtual == 0) {

            if (url['var'] == 3) {
                $('iframe[id="view_box_scc"]').attr('src', 'linhas.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                $('iframe[id="view_box_scc"]').parent().find(".view-title").html("GRÁFICO DE LINHAS");
            }
            else if (url['var'] > 9) {


                $('iframe[id="view_box_scc"]').attr('src', 'linhas.php?'+newUrl+'&eixo='+window.location.hash.substring(1)+window.location.hash);
                $('iframe[id="view_box_scc"]').parent().find(".content-btn-mapa").css("display", "none")
                $('iframe[id="view_box_scc"]').parent().find(".view-title").html("GRÁFICO DE LINHAS");


            }
            else if (url['var'] == 9){
                $('iframe[id="view_box_scc"]').attr('src', 'linhas.php?'+newUrl+'&eixo='+window.location.hash.substring(1)+window.location.hash);
                $('iframe[id="view_box_scc"]').parent().find(".view-title").html("GRÁFICO DE LINHAS")
            }
            else {
                $('iframe[id="view_box_scc"]').attr('src', 'treemap_scc.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);

                if(url['uf'] == 0)
                    $('iframe[id="view_box_scc"]').parent().find(".view-title").html("TREEMAP - SETORES CULTURAIS CRIATIVOS [uf] ");
                else
                    $('iframe[id="view_box_scc"]').parent().find(".view-title").html("TREEMAP - SETORES CULTURAIS CRIATIVOS [uf] ");

            }
        }
        else if(eixoAtual == 1) {

            if (url['var'] > 11) {
                if(url['slc'] == 0) {

                    newUrl = newUrl.replace(/ocp=[0-9]*/, "ocp=0");
                    newUrl = newUrl.replace(/uos=[0-9]*/, "uos=1");

                    $('iframe[id="view_box_scc"]').attr('src', 'linhas.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                    $('iframe[id="view_box_scc"]').parent().find(".view-title").html("GRÁFICO DE LINHAS");
                }
                else {
                    newUrl = newUrl.replace(/uos=[0-9]*/, "uos=1");
                    newUrl = newUrl.replace(/ocp=[0-9]*/, "ocp=3");
                    $('iframe[id="view_box_scc"]').attr('src', 'linhas.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                    $('iframe[id="view_box_scc"]').parent().find(".view-title").html("GRÁFICO DE LINHAS");
                }
            }
            else if(url['var'] == 11 ||  url['var'] == 10 || url['var'] == 9 || url['var'] == 8){
                $('iframe[id="view_box_scc"]').attr('src', 'linhas.php?'+newUrl+'&eixo='+window.location.hash.substring(1)+window.location.hash);
                $('iframe[id="view_box_scc"]').parent().find(".view-title").html("GRÁFICO DE LINHAS")
            }
            else if(url['var'] == 6){

                newUrl = newUrl.replace(/uos=[0-9]*/, "uos=1");
                $('iframe[id="view_box_scc"]').attr('src', 'barras.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                $('iframe[id="view_box_scc"]').parent().find(".view-title").html("SÉRIE POR SETOR");

                // $('iframe[id="view_box_scc"]').attr('src', 'linhas.php?'+newUrl+'&eixo='+window.locat    ion.hash.substring(1)+window.location.hash);
                // $('iframe[id="view_box_scc"]').parent().find(".view-title").html("GRÁFICO DE LINHAS")
            }
            else if(url['var'] == 4 || url['var'] == 5 ){

                newUrl = newUrl.replace(/uos=[0-9]*/, "uos=1");
                $('iframe[id="view_box_scc"]').attr('src', 'linhas.php?'+newUrl+'&eixo='+window.location.hash.substring(1)+window.location.hash);
                $('iframe[id="view_box_scc"]').parent().find(".view-title").html("GRÁFICO DE LINHAS")

            }
            else {
                $('iframe[id="view_box_scc"]').attr('src', 'treemap_scc.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                $('iframe[id="view_box_scc"]').parent().find(".view-title").html("TREEMAP - SETORES CULTURAIS CRIATIVOS [uf] ");
                if(url['uf'] == 0){
                    if(url['ocp'] == 0){
                        $('iframe[id="view_box_scc"]').parent().find(".view-title").html("TREEMAP - SETORES CULTURAIS CRIATIVOS [uf] ");
                    }
                    else{
                        $('iframe[id="view_box_scc"]').parent().find(".view-title").html("TREEMAP - OCUPAÇÕES CULTURAIS E CRIATIVAS  [uf] ");
                    }

                }
                else{
                    if(url['ocp'] == 0){
                        $('iframe[id="view_box_scc"]').parent().find(".view-title").html("TREEMAP - SETORES CULTURAIS CRIATIVOS [uf] ");
                    }
                    else{
                        $('iframe[id="view_box_scc"]').parent().find(".view-title").html("TREEMAP - OCUPAÇÕES CULTURAIS E CRIATIVAS  [uf] ");
                    }
                }
            }
        }
        else if(eixoAtual == 2){
            if(url['var'] == 6 || url['var'] == 8 || url['var'] == 9 || url['var'] == 7 || url['var'] == 13 || url['var'] == 14){
                $('iframe[id="view_box_scc"]').attr('src', 'linhas.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                $('iframe[id="view_box_scc"]').parent().find(".view-title").html("GRÁFICO DE LINHAS");
            }
            else if(url['var'] ==  17){
                $('iframe[id="view_box_scc"]').attr('src', 'barras.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                $('iframe[id="view_box_scc"]').parent().find(".view-title").html("SÉRIE HISTÓRICA [uf] [cad]");
            }

            else if (url['var'] == 15 || url['var'] == 16 ) {
                $('iframe[id="view_box_scc"]').attr('src', 'linhas.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                $('iframe[id="view_box_scc"]').parent().find(".view-title").html("GRÁFICO DE LINHAS");
            }
            else if (url['var'] == 18 || url['var'] == 19 ) {
                newUrl = newUrl.replace(/uos=[0-9]*/, "uos=0");
                $('iframe[id="view_box_scc"]').attr('src', 'barras.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                $('iframe[id="view_box_scc"]').parent().find(".view-title").html("SÉRIE HISTÓRICA [uf] [cad]");
            }
            else if(url['var'] == 10){
                $('iframe[id="view_box_scc"]').attr('src', 'linhas.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                $('iframe[id="view_box_scc"]').parent().find(".view-title").html("GRÁFICO DE LINHAS");
            }
            else{
                $('iframe[id="view_box_scc"]').css('display', 'block')
                $('iframe[id="view_box_scc"]').attr('src', 'treemap_scc.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                $('iframe[id="view_box_scc"]').parent().find(".view-title").html("TREEMAP - SETORES CULTURAIS CRIATIVOS [uf] ");
            }

        }
        else if(eixoAtual == 3){

            if(url['var'] == 5 || url['var'] == 8){
                newUrl = newUrl.replace(/cad=[0-9]*/, "cad=2");
                $('iframe[id="view_box_scc"]').attr('src', 'barras.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);
                if(url['var'] == 8){
                    $('iframe[id="view_box_scc"]').parent().find(".view-title").html("IHH VALOR ABSOLUTO POR UF");
                }
                else if(url['var'] == 5){
                    $('iframe[id="view_box_scc"]').parent().find(".view-title").html("C4 VALOR ABSOLUTO POR UF");
                }
            }

            else if(url['var'] >= 1 && url['var'] != 5 && url['var'] != 8 && url['var'] <= 10 || url['var'] == 12 ){
                $('iframe[id="view_box_scc"]').parent().find(".view-title").html("SÉRIE HISTÓRICA [uf] [cad]");
                $('iframe[id="view_box_scc"]').attr('src', 'barras.php?' + newUrl + '&eixo=' + window.location.hash.substring(1) + window.location.hash);


            }
            else if(url['var'] == 14){
                $('iframe[id="view_box_scc"]').attr('src', 'no-view.html');
            }

        }
        changeDownloadURL(newUrl + "&eixo=" +window.location.hash.substring(1) + window.location.hash, window.location.hash.substring(1));

        updateTitleBox();
    }
}

/*-----------------------------------------------------------------------------
Função: openFilter
    abre ou fecha o filtro que foi clicado
Entrada:
    filter => filtro que foi clicado
Saída:
    void
-----------------------------------------------------------------------------*/
function openFilter(filter){
    var contexto = $(filter).parents('.contexto'),
        active = $(filter).hasClass('active');

    /* remove classe active dos botões */
    $(contexto).find('.opt.select').removeClass('active');

    /* esconde todos os blocos */
    $(contexto).find('.select-group').addClass('hide');

    /* se está abrindo outro */
    if(!active){
        $(contexto).find(filter).addClass('active');
        $(contexto).find('.select-group#select-'+$(filter).attr('id')).removeClass('hide');
    }
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



    if(window.location.hash === "#mercado" && selectid === 'deg') {
        if(selectvalue==='0') {
            url['prt'] = 0;
            url['sex'] = 0;
            url['esc'] = 0;
            url['frm'] = 0;
            url['snd'] = 0;
            url['cor'] = 0;
            url['prv'] = 0;
            url['fax'] = 0;
        }
        if(selectvalue==='1') {
            url['prt'] = valueDesag;
            url['sex'] = 0;
            url['esc'] = 0;
            url['frm'] = 0;
            url['snd'] = 0;
            url['cor'] = 0;
            url['prv'] = 0;
            url['fax'] = 0;
        }
        if(selectvalue==='2') {
            url['prt'] = 0;
            url['sex'] = valueDesag;
            url['esc'] = 0;
            url['frm'] = 0;
            url['snd'] = 0;
            url['cor'] = 0;
            url['prv'] = 0;
            url['fax'] = 0;
        }
        if(selectvalue==='3') {
            url['prt'] = 0;
            url['sex'] = 0;
            url['esc'] = 0;
            url['frm'] = 0;
            url['snd'] = 0;
            url['cor'] = 0;
            url['prv'] = 0;
            url['fax'] = valueDesag;
        }
        if(selectvalue==='4') {
            url['prt'] = 0;
            url['sex'] = 0;
            url['esc'] = valueDesag;
            url['frm'] = 0;
            url['snd'] = 0;
            url['cor'] = 0;
            url['prv'] = 0;
            url['fax'] = 0;
        }
        if(selectvalue==='5') {
            url['prt'] = 0;
            url['sex'] = 0;
            url['esc'] = 0;
            url['frm'] = 0;
            url['snd'] = 0;
            url['cor'] = valueDesag;
            url['prv'] = 0;
            url['fax'] = 0;
        }
        if(selectvalue==='6') {
            url['prt'] = 0;
            url['sex'] = 0;
            url['esc'] = 0;
            url['frm'] = valueDesag;
            url['snd'] = 0;
            url['cor'] = 0;
            url['prv'] = 0;
            url['fax'] = 0;
        }
        if(selectvalue==='7') {
            url['prt'] = 0;
            url['sex'] = 0;
            url['esc'] = 0;
            url['frm'] = 0;
            url['snd'] = 0;
            url['cor'] = 0;
            url['prv'] = valueDesag;
            url['fax'] = 0;
        }
        if(selectvalue==='8') {
            url['prt'] = 0;
            url['sex'] = 0;
            url['esc'] = 0;
            url['frm'] = 0;
            url['snd'] = valueDesag;
            url['cor'] = 0;
            url['prv'] = 0;
            url['fax'] = 0;
        }
    }

    if(selectid=='prt'){
        /* filtro atuação */
        if(selectvalue.match('atc-','')){
            url['atc'] = selectvalue.replace('atc-','');
            url['prt'] = '0'; /* se for atuação, não há filtro por porte */
        }

        /* filtro porte */
        else{
            url['prt'] = selectvalue;
            url['atc'] = '0';/* se for porte, não há filtro por atuação */
        }

    }
    else if(selectid=='deg') {
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

/*-----------------------------------------------------------------------------
Função: controlMec
   restringe filtro de mecanismo ==> variaveis 1 - 8 - 9 do eixo 2 possuem apenas FNC e Mecenato, variavel 3 possui fundo cultura e outros
Entrada:
    select => objeto do select
Saída:
    void
-----------------------------------------------------------------------------*/
function controlMec(select){

    if(url['var'] == 1 || url['var'] == 8 || url['var'] == 9){
        $(select).find('option[value="3"]').remove();
        $(select).find('option[value="4"]').remove();
    }
    if(url['var'] == 3) {
        $(select).find('option[value="1"]').remove();
        $(select).find('option[value="2"]').remove();
    }
}

/*-----------------------------------------------------------------------------
Função: controlAtc
   restringe filtro de atuação ==> comércio apenas para os setores 4 - 5 - 9 - todos
Entrada:
    select => objeto do select
    isPrt => boolean é ou não select de porte
Saída:
    void
-----------------------------------------------------------------------------*/
function controlAtc(select,isPrt){

    if(url['cad']!=1 && url['cad']!=5 && url['cad']!=8 && url['cad']!=0){

        if(isPrt) $(select).find('option[value="atc-1"]').remove();
        else $(select).find('option[value="1"]').remove();
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

            /* atualiza valor select */
            $(this).val(selectValue);
            /* select porte default */
            if(selectId=='prt' && selectValue=='0' && url['atc']!='0'){

                /* valor atuação */
                $(this).val('atc-'+url['atc']);
            }

            if(selectId=='cad' && selectValue=='0' && url['ocp']!='0'){

                /* valor atuação */
                $(this).val('ocp-'+url['ocp']);
            }

            if(selectId=='prt') controlAtc(this,1);
            if(selectId=='atc') controlAtc(this,0);
            if(selectId=='mec') controlMec(this);
            if(selectId=='ano') controlAno(this)
        }
    });

    removeVar('mercado', 3);

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

    $( ".bread-parent" ).remove();

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

    $(".desc-var").html(variavel.desc_var_mapa);
}

function cleanDesagsUrl() {
    //url['slc'] = 0;
    url['fax'] = 0;
    //url['ocp'] = 0;
    url['sex'] = 0;
    url['esc'] = 0;
    url['frm'] = 0;
    url['snd'] = 0;
    url['cad'] = 0;
    url['pfj'] = 0;
    url['deg'] = 0;
    url['mod'] = 0;
    url['mec'] = 0;
    url['prt'] = 0;
    url['cor'] = 0;
    url['prv'] = 0;
    url['uos'] = 0;
}

function updateWindowUrl(id, valor){

    var replace = id+"=[0-9]*";
    var re = new RegExp(replace,"");

    var urlString = parent.window.location.href.replace(re, id+"="+valor);
    parent.window.history.pushState(null, null, urlString)
}

/*======
	DOCUMENTO CARREGADO
======*/
$(window).bind("load", function() {

    loadPage(); /* controla menu e fade */

    bodyDark(dark);/* alto contraste */

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

    if(deg == 0){
        if(url['ocp'] == 0){
            $(".view-title-leg[data-id='scc&ocp']").html("SETORES");

            var legendArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            var html = "";

            legendArray.forEach( function(id) {
                html += "<span class=\"scc\" data-id="+id+"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+colorJSON.cadeias[id]['color']+"\"></i> "+colorJSON.cadeias[id]['name']+"<br></span>\n";
            } );

            $("#title-view-leg-scc").html(html);

            /// TODO TRANSFORMAR PRA UMA FUNÇÃO?
            var cads = getCadsByMenu();

            updateBreadcrumbSetores(cads);
        }
        else{
            switchToOcupations();
        }

    }
    else if(deg > 0){

        console.log(deg)

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

        for (var nome in legendArray) {
            console.log(nome)
            html += "<span class=\"scc\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+legendArray[nome]+"\"></i> "+nome+"<br></span>\n";
        }

        $("#title-view-leg-scc").html(html)
    }

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
    var cads = [];

    if(eixo == 0 && url['var'] > 9){
        $(".view-title-leg[data-id='scc&ocp']").html("");

        cads = [
            {id: 0, nome: " Todos"}
        ]

        $("#title-view-leg-scc").html("" +
            "        <span data-id=\"1\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: rgb(7, 19, 66)\"></i> Setor<br></span>\n" +
            "        <span data-id=\"2\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: rgb(109, 191, 201)\"></i> UF<br></span>");

    }
    else if(eixo == 1 && (url['var'] == 3 || url['var'] == 4)){

        $(".view-title-leg[data-id='scc&ocp']").html("SETORES");

        var legendArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var html = "";

        legendArray.forEach( function(id) {
            html += "<span class=\"scc\" data-id="+id+"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+colorJSON.cadeias[id]['color']+"\"></i> "+colorJSON.cadeias[id]['name']+"<br></span>\n";
        } );

        $("#title-view-leg-scc").html(html);

        cads = getCadsByMenu();
    }
    else if(eixo == 1 && url['var'] > 11){
        cads = [
            {id: 0, nome: " Todos"}
        ]
        $(".view-title-leg[data-id='scc&ocp']").html("");

        $("#title-view-leg-scc").html("" +
            "        <span data-id=\"1\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: rgb(7, 19, 66)\"></i> Setor<br></span>\n" +
            "        <span data-id=\"2\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: rgb(109, 191, 201)\"></i> UF<br></span>");
    }
    else if(eixo == 2 && url['var'] == 2){

        ///TODO ESSA VARIAVEL EXISTE???

        var legendArray = [0, 2, 3, 5, 8, 11];
        var html = "";

        legendArray.forEach( function(id) {
            html += "<span class=\"scc\" data-id="+id+"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+colorJSON.cadeias[id]['color']+"\"></i> "+colorJSON.cadeias[id]['name']+"<br></span>\n";
        } );

        $("#title-view-leg-scc").html(html);

        cads = getCadsByMenu();
    }
    else if(eixo == 2 && url['var'] == 18){

        $("#menu-view-donut").find(".view-title-leg-donut[data-id='scc&ocp']").html("");

        var legendArray = [0, 2, 3, 4, 5, 6, 8, 9, 11];
        var html = "";

        legendArray.forEach( function(id) {
            html += "<span class=\"scc\" data-id="+id+"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+colorJSON.cadeias[id]['color']+"\"></i> "+colorJSON.cadeias[id]['name']+"<br></span>\n";
        });

        $("#menu-view-donut").find("#title-view-leg-scc-donut").html(html);

        cads = getCadsByMenuDonut();
    }
    else if(eixo == 2 && url['var'] == 19){

        $("#menu-view-donut").find(".view-title-leg-donut[data-id='scc&ocp']").html("");

        var legendArray = [0, 2, 3, 5, 8, 11];
        var html = "";

        legendArray.forEach( function(id) {
            html += "<span class=\"scc\" data-id="+id+"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+colorJSON.cadeias[id]['color']+"\"></i> "+colorJSON.cadeias[id]['name']+"<br></span>\n";
        });

        $("#menu-view-donut").find("#title-view-leg-scc-donut").html(html);

        cads = getCadsByMenuDonut();

    }
    else if(eixo == 2 && (url['var'] == 15 || url['var'] == 16)){
        cads =
            [
                {id: 0, nome: " Todos"}
            ]
        $(".view-title-leg[data-id='scc&ocp']").html("");

        $("#title-view-leg-scc").html("" +
            "        <span data-id=\"1\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: rgb(7, 19, 66)\"></i> Setor<br></span>\n" +
            "        <span data-id=\"2\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: rgb(109, 191, 201)\"></i> UF<br></span>");
    }
    else if(eixo == 2 && (url['var'] == 10)){
        cads =
            [
                {id: 0, nome: " Todos"}
            ]

        $(".view-title-leg[data-id='scc&ocp']").html("");

        $("#title-view-leg-scc").html("" +
            "        <span data-id=\"1\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: rgb(7, 19, 66)\"></i>  DESPESA MINC / RECEITA EXECUTIVO<br></span>\n" +
            "        <span data-id=\"2\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: rgb(109, 191, 201)\"></i> FINANCIAMENTO ESTATAL / RECEITA EXECUTIVO<br></span>");
    }
    else if(eixo == 2 && (url['var'] == 17)){
        cads =
            [
                {id: 0, nome: " Todos"}
            ]
        $("#menu-view-donut").find(".view-title-leg-donut[data-id='scc&ocp']").html("");

        $("#menu-view-donut").find("#title-view-leg-scc-donut").html("" +
            "        <span data-id=\"1\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: rgb(7, 125, 221)\"></i>  Possui <br></span>\n" +
            "        <span data-id=\"2\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: rgb(217, 213, 222)\"></i> Não Possui <br></span>");

    }
    else if(eixo == 3 && (url['var'] >= 1 && url['var'] != 5 && url['var'] != 8 && url['var'] <= 10 || url['var'] == 12)){
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
            "        <span data-id=\"1\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: rgb(7, 19, 66)\"></i> Exportação<br></span>\n" +
            "        <span data-id=\"2\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: rgb(109, 191, 201)\"></i> Importação<br></span>");


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

    updateBreadcrumbSetores(cads);
}

function switchToOcupations() {

    $(".view-title-leg[data-id='scc&ocp']").html("OCUPAÇÕES");

    var legendArray = [1, 2];
    var html = "";

    legendArray.forEach( function(id) {
        html += "<span class=\"scc\" data-id="+id+"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: "+colorJSON.ocupacoes[id]['color']+"\"></i> "+colorJSON.ocupacoes[id]['name']+"<br></span>\n";
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

/*======
	documento pronto
======*/


$(document).ready(function(){

    ///TODO ESTÁ FUNCIONANDO?
    $(window).on('hashchange', function() {
        // loadPage();
        window.location.href = window.location.pathname+window.location.hash;
        scrollTo(0, 0);
    });

    /* ATUALIZA OS IFRAMES QUANDO A JANELA FOR REDIMENSIONADA */
    $(window).resize(function() {
        controlPageWidth();
    });


    /*=== selecionar variável ===*/

    $(document).on('click', ".scc", function(){

        var eixoAtual = getEixo(window.location.hash.substring(1));

        if((eixoAtual == 0 && url['var'] < 10) || (eixoAtual == 1 && url['var'] < 12) || (eixoAtual == 2 && url['var'] >= 18) || eixoAtual == 3 ){
            var setor = $(this).attr('data-id');


            if(setor != url['cad']) {


                if(eixoAtual == 2 && url['var'] == 19 && url['mec'] == 1)
                    return;

                var newSCCSrc = $("#view_box_scc").attr("src");
                var change = newSCCSrc.match(/uf=([0-9]*)/);

                url['cad'] = setor;
                url['uf'] = change[1];
                if (setor == 0 && url['var'] > 7) {
                    url['prt'] = 0;
                    url['deg'] = 0;
                    url['sex'] = 0;
                    url['frm'] = 0;
                    url['snd'] = 0;
                    url['prv'] = 0;
                    url['fax'] = 0;
                    url['esc'] = 0;
                    url['cor'] = 0;
                }
                $(".bread-select[data-id='cad']").val($(this).attr("data-id"));
                updateIframe(url);

            }
        }
        else if(eixo == 2 && url['var'] < 15){
            var setor = $(this).attr('data-id');

            if(setor != url['cad']) {

                var newSCCSrc = $("#view_box_scc").attr("src");
                var changeUF = newSCCSrc.match(/uf=([0-9]*)/);
                url['cad'] = setor;
                url['uf'] = changeUF[1];

                $(".bread-select[data-id='cad']").val($(this).attr("data-id"));
                updateIframe(url);
            }
        }

    });

    if(url['var'] === "" && window.location.pathname.match("page.php")){
        controlVarPage(1);
    }

    if(url['var']) {
        controlVar(url['var']);
    }

    /*=== resultado ===*/

    /* alterar tipo de visualização */
    $(document).on('click', "button.opt.view", function(){


        ///TODO REFATORAR

        var id = $(this).attr("id");
        var texto = $(this).html();

        if(id == "treemap_region" || id == "mapa") {
            if(texto == "BRASIL" || texto == "MUNDO"){

                url['view'] = "mapa"; /* muda visualização */

                if(texto == "BRASIL"){
                    url['mundo'] = 1;
                    url['uf'] = 0;

                    $("select[data-id='uf']").val(0);

                    if(id === "treemap_region") {
                        $(this).addClass("active");
                        $('#mapa').removeClass("active");
                    }
                    else if(id === "mapa") {
                        $(this).addClass("active");
                        $('#treemap_region').removeClass("active");
                    }
                }
                else{
                    url['mundo'] = 0;
                    url['prc'] = 0;

                    $("select[data-id='prc']").val(0);

                    if(id === "treemap_region") {
                        $(this).addClass("active");
                        $('#mapa').removeClass("active");
                    }
                    else if(id === "mapa") {
                        $(this).addClass("active");
                        $('#treemap_region').removeClass("active");
                    }
                }
                updateUrl();
                updateIframe(url);
            }
            else{
                updateUrl();

                url['view'] = $(this).attr('id'); /* muda visualização */

                updateIframe(url); /* atualiza gráfico */

                if(id === "treemap_region") {
                    $(this).addClass("active");
                    $('#mapa').removeClass("active");
                }
                else if(id === "mapa") {
                    $(this).addClass("active");
                    $('#treemap_region').removeClass("active");
                }
            }

        }
        else if(id == "bens" || id == "servicos"){
            updateUrl();
            if(id === "bens") {
                url['slc'] = 0;
                $(this).addClass("active");
                $('#servicos').removeClass("active");
                url['ano'] = anos_default[url['var']][1]

            }
            else {
                if(url['ano'] < 2014)
                    url['ano'] = 2014;
                url['slc'] = 1;
                $(this).addClass("active");
                $('#bens').removeClass("active");
                url['ano'] = anos_default[url['var']][0]
            }
            updateIframe(url); /* altera gráfico */
        }
        else if(id == "recebedora" || id == "trabalhador"){

            if(id === "recebedora") {

                if(url['mec'] != 0){

                    if(url['var'] == 19){
                        $("#menu-view-donut").css("display", "block")

                        var cads = getCadsByMenuDonut();
                        updateBreadcrumbSetores(cads)
                    }

                    updateUrl();
                    url['mec'] = 0;
                    $(this).addClass("active");
                    $('#trabalhador').removeClass("active");
                    updateIframe(url); /* altera gráfico */

                }
            }
            else {
                if(url['mec'] != 1){

                    if(url['var'] == 19){
                        $("#menu-view-donut").css("display", "none")
                        updateBreadcrumbSetores([{id: 0, nome: "Todos"}])
                    }

                    updateUrl();
                    url['mec'] = 1;
                    $(this).addClass("active");
                    $('#recebedora').removeClass("active");
                    updateIframe(url); /* altera gráfico */
                }
            }
        }
        else {
            updateUrl();
            if(id === "setor") {
                enableDesag(getEixo(window.location.hash.substring(1)), url['var'], url['cad'], false, 0, url);
                switchToSetores();

                url['slc'] = 0;
                url['deg'] = 0;
                url['ocp'] = 0;
                controlFilter('0', 'deg');
                $(this).addClass("active");
                $('#ocupacao').removeClass("active");

                url['ano'] = anos_default[url['var']][0];

                $(window.document).find(".bread-select[data-id=cad]").parent().find("span").text("Setor")
            }
            else {
                enableDesag(getEixo(window.location.hash.substring(1)), url['var'], url['cad'], false, 1, url);
                d3.json('data/pt-br.json', function(error, data) {
                    if (error) throw error;

                    textJSON = data;
                    $(".cad-title").first().html(textJSON.select.ocp[0].name);

                    updateDataDescUoS();
                });
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
                $(this).addClass("active");
                $('#setor').removeClass("active");

                url['ano'] = anos_default[url['var']][1];
                //troca o nome do select de setor
                $(window.document).find(".bread-select[data-id=ocp]").parent().find("span").text("Ocupação")
            }
            updateIframe(url); /* altera gráfico */
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
                document.getElementById('view_box').contentWindow.location.reload(true);
                $(window.document).find(".prc-title").first().html(this.options[e.target.selectedIndex].text);
                // updateDataDesc(url['var'], $(this).attr("data-id"), this.options[e.target.selectedIndex].text)
            }

            if(dataId ==='var'){



                $('.percent-value').find(".box-dado").find('.number').first().text("")
                changeDescVar();
                cleanDesagsUrl();
                getAnoDefault(eixo_atual);
                $('#recebedora').addClass("active");
                $('#trabalhador').removeClass("active");

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


                $(window.document).find(".cad-title").first().html($('.bread-select[data-id=cad] option:selected').text());
                $(window.document).find(".title[data-id='var-title']").first().html($('.bread-select[data-id=var] option:selected').text());



                updateMenuSetor(getEixo(window.location.hash.substring(1)), $(this).val());
                updateBreadUF(eixo_atual, url['var']);

                if(eixo_atual == 0){
                    $('#mapa').addClass("active");
                    $('#treemap_region').removeClass("active");
                    $('.bread-select[data-id=deg]').val(0);

                    $('.opt-select[data-id=deg]').val(0);
                }
                if(eixo_atual == 1){
                    if(url['ocp'] > 0){
                        updateDefaultOcupation()
                    }
                    updateOcupacoes($(this).val());
                }

                if(eixo_atual == 2){
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

                    $(".opt-select[data-id='typ']").val(1);
                    $('.bread-select[data-id=typ]').val(1);
                    if((url['var'] >= 5 && url['var'] <= 12) || url['var'] == 14){
                        $('.bread-select[data-id=prc]').val(0);
                        $(".opt-select[data-id='prc']").val(0)
                        url['prc'] = 0
                    }
                    $(window.document).find(".prc-title").first().html($(".bread-select[data-id='prc'] option:selected").text());

                }

                changeDescVar();
                // window.location.href = window.location.pathname+window.location.hash;/cad=[0-9]*/, "cad=1"


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

                    if(url['var'] == 4 || url['var'] == 5)
                        updateLegendByDeg(url['deg'])
                }
                else{
                    controlFilter($(this).val(), $(this).attr('data-id'), 1);
                }

                $(window.document).find(".cad-title").first().html($('.bread-select[data-id=cad] option:selected').text());
                document.getElementById('view_box_barras').contentWindow.location.reload(true);
            }

            if(dataId === "uf"){
                document.getElementById('view_box').contentWindow.location.reload(true);

                $(window.document).find(".state-title").first().html(this.options[e.target.selectedIndex].text);
                updateDataDesc(url['var'], $(this).attr("data-id"), this.options[e.target.selectedIndex].text)
            }

            if(dataId === "cad") {

                //if(getEixo(window.location.hash.substring(1)) == 1) cleanDesagsUrl();
                $(window.document).find(".cad-title").first().html(this.options[e.target.selectedIndex].text);

                url['cad'] = ($(this).val())
                /*if(eixo_atual == 2 && (vrv == 18 || vrv == 19)){
                    updateTitleBox(SETORES)
                }*/

            }

            if(dataId === "ocp") {
                $(window.document).find(".cad-title").first().html(this.options[e.target.selectedIndex].text);
            }

            updateIframe(url);
            updateWindowUrl(dataId, dataVal);


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


    updateIframe(url);

});
