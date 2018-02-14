var windowWidth = $(window).width();

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
	$('iframe[id="resultado_view"]').attr('src', 'resultado.php?var='+clickVar+'&view=mapa&uf=0&prt=0&atc=0&cad=0&ocp=0&ano=2014&eixo='+newHash.substring(1)+newHash);
    if($('iframe[id="view_box"]').length > 0) $('iframe[id="view_box"]').attr('src', url['view']+'_box.php?var='+clickVar+'&view=mapa&uf=0&prt=0&atc=0&cad=0&ocp=0&ano=2014&eixo='+newHash.substring(1)+newHash);
    if($('iframe[id="view_box_barras"]').length > 0) $('iframe[id="view_box_barras"]').attr('src', 'barras_box.php?var='+clickVar+'&view=mapa&uf=0&prt=0&atc=0&cad=0&ocp=0&ano=2014&eixo='+newHash.substring(1)+newHash);
    if($('iframe[id="view_box_scc"]').length > 0) $('iframe[id="view_box_scc"]').attr('src', 'treemap_scc_box.php?var='+clickVar+'&view=mapa&uf=0&prt=0&atc=0&cad=0&ocp=0&ano=2014&eixo='+newHash.substring(1)+newHash);
    /* variáveis com valores default */
}

function controlVarPage(clickVar){
    newHash = window.location.hash;
    window.location.href = 'page.php?var='+clickVar+'&view=mapa&uf=0&prt=0&atc=0&cad=0&ocp=0&ano=2014&eixo='+newHash.substring(1)+newHash;
    /* variáveis com valores default */
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
    url['deg'] = 0;
    url['pfj'] = 0;
    url['uos'] = 0;
	url['ano'] = 2014;
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
        $('iframe[id="view_box"]').attr('src', url['view']+'_box.php?'+newUrl+'&eixo='+window.location.hash.substring(1)+window.location.hash);
    }
    if($('iframe[id="view_box_barras"]').length != 0) {
        $('iframe[id="view_box_barras"]').attr('src', 'barras_box.php?'+newUrl+'&eixo='+window.location.hash.substring(1)+window.location.hash);
    }
    if($('iframe[id="view_box_scc"]').length != 0) {
        $('iframe[id="view_box_scc"]').attr('src', 'treemap_scc_box.php?'+newUrl+'&eixo='+window.location.hash.substring(1)+window.location.hash);
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
    if($('iframe[id="view_box"]').length != 0) {
        if(url['var'] > 9){
            $('iframe[id="view_box"]').attr('src', 'line_scc_box.php?'+newUrl+'&eixo='+window.location.hash.substring(1)+window.location.hash);
        } else{
            $('iframe[id="view_box"]').attr('src', url['view']+'_box.php?'+newUrl+'&eixo='+window.location.hash.substring(1)+window.location.hash);
        }

    }
    if($('iframe[id="view_box_barras"]').length != 0) {
        $('iframe[id="view_box_barras"]').attr('src', 'barras_box.php?'+newUrl+'&eixo='+window.location.hash.substring(1)+window.location.hash);
    }
    if($('iframe[id="view_box_scc"]').length != 0) {
        if(url['var'] == 3){
            $('iframe[id="view_box_scc"]').attr('src', 'line_scc_box.php?'+newUrl+'&eixo='+window.location.hash.substring(1)+window.location.hash);
        } else if  (url['var'] > 9){
            newUrl = newUrl.replace(/uos=[0-9]*/, "uos=1");
            newUrl = newUrl.replace(/ano=[0-9]*/, "ano=");
            $('iframe[id="view_box_scc"]').attr('src', 'barras_box.php?'+newUrl+'&eixo='+window.location.hash.substring(1)+window.location.hash);
            $('iframe[id="view_box_scc"]').parent().find(".view-title").html("SÉRIE HISTÓRICA POR SETOR");
            $('iframe[id="view_box_barras"]').parent().find(".view-title").html("SÉRIE HISTÓRICA POR UF");
        } else {
            $('iframe[id="view_box_scc"]').attr('src', 'treemap_scc_box.php?'+newUrl+'&eixo='+window.location.hash.substring(1)+window.location.hash);
        }

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
function controlFilter(selectvalue, selectid){
    var SCCSrc = $("#view_box_scc").attr("src");
    var BarraSrc = $("#view_box_barras").attr("src");
    if(BarraSrc != undefined) var setor = BarraSrc.match(/cad=([0-9]*)/)[1];
    else var setor = 0;
    if(SCCSrc != undefined) {
        var ano = SCCSrc.match(/ano=([0-9]*)/)[1];
        var uf = SCCSrc.match(/uf=([0-9]*)/)[1];
    }
    else {
        var ano = 2014;
        var uf = 0;
    }
	/* se for PORTE x ATUAÇÃO */
    if(selectid==='var') {
        defaultUrl();
    }
    if(window.location.hash === "#mercado") {
		if(selectid==='deg' && selectvalue==='0') {
            url['prt'] = 0;
            url['sex'] = 0;
            url['esc'] = 0;
            url['frm'] = 0;
            url['snd'] = 0;
            url['cor'] = 0;
            url['prv'] = 0;
            url['fax'] = 0;
		}
        if(selectid==='deg' && selectvalue==='1') {
            url['prt'] = 1;
            url['sex'] = 0;
            url['esc'] = 0;
            url['frm'] = 0;
            url['snd'] = 0;
            url['cor'] = 0;
            url['prv'] = 0;
            url['fax'] = 0;
        }
        if(selectid==='deg' && selectvalue==='2') {
            url['prt'] = 0;
            url['sex'] = 1;
            url['esc'] = 0;
            url['frm'] = 0;
            url['snd'] = 0;
            url['cor'] = 0;
            url['prv'] = 0;
            url['fax'] = 0;
        }
        if(selectid==='deg' && selectvalue==='3') {
            url['prt'] = 0;
            url['sex'] = 0;
            url['esc'] = 0;
            url['frm'] = 0;
            url['snd'] = 0;
            url['cor'] = 0;
            url['prv'] = 0;
            url['fax'] = 1;
        }
        if(selectid==='deg' && selectvalue==='4') {
            url['prt'] = 0;
            url['sex'] = 0;
            url['esc'] = 1;
            url['frm'] = 0;
            url['snd'] = 0;
            url['cor'] = 0;
            url['prv'] = 0;
            url['fax'] = 0;
        }
        if(selectid==='deg' && selectvalue==='5') {
            url['prt'] = 0;
            url['sex'] = 0;
            url['esc'] = 0;
            url['frm'] = 0;
            url['snd'] = 0;
            url['cor'] = 1;
            url['prv'] = 0;
            url['fax'] = 0;
        }
        if(selectid==='deg' && selectvalue==='6') {
            url['prt'] = 0;
            url['sex'] = 0;
            url['esc'] = 0;
            url['frm'] = 1;
            url['snd'] = 0;
            url['cor'] = 0;
            url['prv'] = 0;
            url['fax'] = 0;
        }
        if(selectid==='deg' && selectvalue==='7') {
            url['prt'] = 0;
            url['sex'] = 0;
            url['esc'] = 0;
            url['frm'] = 0;
            url['snd'] = 0;
            url['cor'] = 0;
            url['prv'] = 1;
            url['fax'] = 0;
        }
        if(selectid==='deg' && selectvalue==='8') {
            url['prt'] = 0;
            url['sex'] = 0;
            url['esc'] = 0;
            url['frm'] = 0;
            url['snd'] = 1;
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

	/*  se não há setor cadastrado,
		não  é permitido filtro por porte X atuacao
		(exceto treemap por setores)

	if(url['cad']==0 && url['view']!='treemap_scc'){
		url['atc'] = 0;
		url['prt'] = 0;
	}
*/
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
        if(url['var'] > 3){
            $(select).find('option[value="2015"]').remove();
            $(select).find('option[value="2016"]').remove();
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
	/* ajusta nome da página */
	$(this).attr("title", pageTitle+" | Atlas Econômico da Cultura Brasileira");
	$('.menu-select').val(url['var']); /* atualiza select versao mobile */

	/* move scroll para o gráfico */	
	if($("div.container").length != 0)$('html, body').scrollTop($("div.container").offset().top);

	/* fade in no resultado */
	$('.fadeInPage').addClass('done');
	$('.fadeIn').addClass('done');

	/*  se não existe setor selecionado,
		não é possível escolher porte x atuação 
		(exceto no treemap por setores)
										*/
	if(window.location.hash.substring(1) == "empreendimentos") {
        var SCCSrc = $("#view_box_scc").attr("src");
        if(SCCSrc != undefined) {
            var setor = SCCSrc.match(/cad=([0-9]*)/)[1];
        }
        else {
            var setor = 0;
        }
        if(url['var'] > 3) {
            $(window.parent.document).find('.select-deg').find('select').find('option[value="9"]').remove();
            $(window.parent.document).find('.select-deg').find('select').find('option[value="10"]').remove();
            $(window.parent.document).find('.select-deg').find('select').find('option[value="11"]').remove();
            $(window.parent.document).find('.select-deg').find('select').find('option[value="12"]').remove();
        }
        else {
            if($(window.parent.document).find("select[data-id='deg']").find("option[value='9']").length == 0) $(window.parent.document).find("select[data-id='deg']").append("<option value='9'>PORTE MICRO</option>");
            if($(window.parent.document).find("select[data-id='deg']").find("option[value='10']").length == 0) $(window.parent.document).find("select[data-id='deg']").append("<option value='10'>PORTE PEQUENO</option>");
            if($(window.parent.document).find("select[data-id='deg']").find("option[value='11']").length == 0) $(window.parent.document).find("select[data-id='deg']").append("<option value='11'>PORTE MÉDIO</option>");
            if($(window.parent.document).find("select[data-id='deg']").find("option[value='12']").length == 0) $(window.parent.document).find("select[data-id='deg']").append("<option value='12'>PORTE GRANDE</option>");
        }
		if(url['cad']==0 && url['view']!='treemap_scc'){
            $('.select-prt').find('select').attr('disabled','disabled'); /* desabilita select */
            $('#select-atc').find('select').attr('disabled','disabled'); /* desabilita select */
            $('#select-atc').append('<p class=\"error\">Selecione um setor para habilitar este filtro. </p>'); /* mensagem de select desabilitado */
        }
    }


    if(window.location.hash.substring(1) == "mercado") {
		if((url['ocp']==0 && url['view']!='treemap_scc') || (url['slc'] == 0)){
            $('.select-cor').find('select').attr('disabled','disabled'); /* desabilita select */
            $('.select-frm').find('select').attr('disabled','disabled'); /* desabilita select */
            $('.select-prv').find('select').attr('disabled','disabled'); /* desabilita select */
            $('.select-snd').find('select').attr('disabled','disabled'); /* desabilita select */
            $('.select-cor').append('<p class=\"error\">Selecione uma ocupação para habilitar este filtro. </p>'); /* mensagem de select desabilitado */
            $('.select-frm').append('<p class=\"error\">Selecione uma ocupação para habilitar este filtro. </p>'); /* mensagem de select desabilitado */
            $('.select-prv').append('<p class=\"error\">Selecione uma ocupação para habilitar este filtro. </p>');
            $('.select-snd').append('<p class=\"error\">Selecione uma ocupação para habilitar este filtro. </p>'); /* mensagem de select desabilitado */
        }

        if(url['cad'] == 0 && url['ocp']==0 && url['view']!='treemap_scc') {
            $('.select-sex').find('select').attr('disabled','disabled'); /* desabilita select */
            $('.select-fax').find('select').attr('disabled','disabled'); /* desabilita select */
            $('.select-esc').find('select').attr('disabled','disabled'); /* desabilita select */
            $('.select-prt').find('select').attr('disabled','disabled'); /* desabilita select */
            $('.select-sex').append('<p class=\"error\">Selecione um setor para habilitar este filtro. </p>'); /* mensagem de select desabilitado */
            $('.select-fax').append('<p class=\"error\">Selecione um setor para habilitar este filtro. </p>'); /* mensagem de select desabilitado */
            $('.select-esc').append('<p class=\"error\">Selecione um setor para habilitar este filtro. </p>'); /* mensagem de select desabilitado */
            $('.select-prt').append('<p class=\"error\">Selecione um setor para habilitar este filtro. </p>'); /* mensagem de select desabilitado */
        }

        if((url['ocp']!=0 && url['view']!='treemap_scc') || (url['slc'] == 1)){
            $('.select-sex').find('select').attr('disabled','disabled'); /* desabilita select */
            $('.select-prt').find('select').attr('disabled','disabled'); /* desabilita select */
            $('.select-sex').append('<p class=\"error\">Selecione um setor para habilitar este filtro. </p>'); /* mensagem de select desabilitado */
            $('.select-prt').append('<p class=\"error\">Selecione um setor para habilitar este filtro. </p>'); /* mensagem de select desabilitado */
        }

        if(url['view'] == "barras" && url['cad'] == 0 && url['slc'] == 0) {
            $('.select-deg').find('select').attr('disabled','disabled'); /* desabilita select */
        }
    }

	/* set selects com os valores da url */
	$(".opt-select").each(function(){
		
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

	});

    $(".bread-select").each(function(){

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

    });

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
	newHash = window.location.hash.substring(1);
	var menuView = 'menudesktop.php?'+newHash+'=1';
	if(windowWidth<850)	menuView = 'menumobile.php?'+newHash+'=1';

	if($("#menuvariaveis").length != 0) {
	    $("#menuvariaveis").load(menuView, function(){
            if(url['var']!=='' && pageTitle!==''){
                loadResult();
                changeDescVar();
            }
        });
    }
    else {
        if(url['var']!=='' && pageTitle!==''){
            loadResult();
            changeDescVar();
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
    var textJSON;
    d3.json('data/pt-br.json', function(error, data) {
        if(error) throw error;

        textJSON = data;

		if(url['cad'] === "0") {
			if(url['var'] === "1" && url['view'] === "treemap_scc") $("span[data-id='setor']").html("de cada setor");
			else $("span[data-id='setor']").html("dos Setores Culturais Criativos");
		}
		else {
            $("span[data-id='setor']").html("do setor "+textJSON.select.cad[url['cad']].name);
		}

        if(url['view'] !== "mapa" && url['view'] !== "treemap_region") {
			if(url['uf'] === "0") {
                //$("span[data-id='uf']").html("no Brasil");
            }
            else {
                $("span[data-id='uf']").html("na UF "+getUf(textJSON.select.uf));
            }
        }

        if(url['var'] === "9") {
            if(url['uf'] === "0") {
                $("span[data-id='uf']").html("Brasil");
            }
            else {
                $("span[data-id='uf']").html(getUf(textJSON.select.uf));
            }
		}

        if(url['prt'] !== "0") {
            $("span[data-id='porte']").html(textJSON.select.prt[url['prt']].name);
		}

        if(url['atc'] !== "0") {
            $("span[data-id='atuacao']").html("de "+textJSON.select.atc[url['atc']].name);
        }

        if(url['view'] !== "barras") $("span[data-id='ano']").html("em "+url['ano']);

		if(url['uos'] === "0") {
            $("span[data-id='mode-view']").html("por estado");
		}
		else {
            $("span[data-id='mode-view']").html("por setor");
		}

		if(url['var'] === "1") {
			if(url['view'] === "barras") $("span[data-id='hide-barra']").html("");
		}

		if(url['view'] === "treemap_region" || url['view'] === "treemap_scc") $("span[data-id='hide-barra']").html("");

        if(url['var'] === "9") {
            if(url['view'] === "barras") $("span[data-id='show-barra']").css("display", "block");
        }

    });
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function open_related_links() {
    document.getElementById("LinksDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

/*====== 
	documento carregando
======*/
$(window).bind("load", function() {

	loadPage(); /* controla menu e fade */

	bodyDark(dark);/* alto contraste */

});

function expandMenu(a) {
    $(a).animate({width: "200px", margin: "5px"}, "fast");
    $('.eixo-ativo').animate({width: "160px", margin: "15px"}, "fast");
}

function expandMenuEixoAtivo(a) {
    $(a).animate({width: "200px", margin: "0px"}, "fast");
}

function minimizeMenu(a) {
    $(a).animate({width: "160px", margin: "15px"}, "fast");
}

function expandMenuVariaveis(a) {
    $('.eixo-ativo').animate({width: "200px", margin: "0px"}, "fast");
}

function updateUrl() {
    $('.bread-select').each(function() {
        url[$(this).attr('data-id')] = $(this).val();
    });
}

function switchToSetores() {
    $(".view-title[data-id='scc&ocp']").html("SETORES");
    $("#title-view-scc").empty();
    $("#title-view-scc").append("<span class=\"scc\" data-id=\"0\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: #071342\"></i> Todos<br></span>\n" +
        "                                <span class=\"scc\" data-id=\"1\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: #87A8CA\"></i> Arquitetura e Design<br></span>\n" +
        "                                <span class=\"scc\" data-id=\"2\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: #077DDD\"></i> Artes Cênicas e Espetáculos<br></span>\n" +
        "                                <span class=\"scc\" data-id=\"3\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: #0F4B67\"></i> Audiovisual<br></span>\n" +
        "                                <span class=\"scc\" data-id=\"4\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: #8178AF\"></i> Cultura Digital<br></span>\n" +
        "                                <span class=\"scc\" data-id=\"5\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: #F6D5AB\"></i> Editorial<br></span>\n" +
        "                                <span class=\"scc\" data-id=\"6\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: #EC8A91\"></i> Educação e Criação em Artes<br></span>\n" +
        "                                <span class=\"scc\" data-id=\"7\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: #AD5468\"></i> Entretenimento<br></span>\n" +
        "                                <span class=\"scc\" data-id=\"8\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: #6A474D\"></i> Música<br></span>\n" +
        "                                <span class=\"scc\" data-id=\"9\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: #E96B00\"></i> Patrimônio<br></span>\n" +
        "                                <span class=\"scc\" data-id=\"10\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: #B2510F\"></i> Publicidade<br></span>");
    $(".bread-select[data-id='ocp']").empty();
    $(".bread-select[data-id='ocp']").append("<option value=\"0\">Todos</option><option value=\"1\">Arquitetura e Design</option><option value=\"2\">Artes Cênicas e Espetáculos</option><option value=\"3\">Audiovisual</option><option value=\"4\">Cultura Digital</option><option value=\"5\">Editorial</option><option value=\"6\">Educação e Criação em Artes</option><option value=\"7\">Entretenimento</option><option value=\"8\">Música</option><option value=\"9\">Patrimônio</option><option value=\"10\">Publicidade</option>");
    $(".bread-select[data-id='ocp']").attr("data-id", "cad");
}

function switchToOcupations() {
    $(".view-title[data-id='scc&ocp']").html("OCUPAÇÕES");
    $("#title-view-scc").empty();
    $("#title-view-scc").append("<span class=\"ocp\" data-id=\"1\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: #87A8CA\"></i> Atividades Relacionadas<br></span>");
    $("#title-view-scc").append("<span class=\"ocp\" data-id=\"2\"><i style=\"display: inline-block; width: 10px; height: 10px; background-color: #077DDD\"></i> Cultura<br></span>");
    $(".bread-select[data-id='cad']").empty();
    $(".bread-select[data-id='cad']").append("<option value='1'>Atividades Relacionadas</option>");
    $(".bread-select[data-id='cad']").append("<option value='2'>Cultura</option>");
    $(".bread-select[data-id='cad']").attr("data-id", "ocp");
}

/*====== 
	documento pronto
======*/
$(document).ready(function(){
    // TODO Verificar se ainda necessário (Novo design não vai ter a principio)
    //$("#desc-item").html("Passe o mouse por cima de algum filtro para obter informações.");
	//$(".opt").mouseenter(function() {
		//$("#desc-item").html($(this).attr("data-desc"));
	//});

    //$(".opt").mouseleave(function() {
        //$("#desc-item").html("Passe o mouse por cima de algum filtro para obter informações.");
    //});
	$(window).on('hashchange', function() {
        loadPage();
        window.location.href = window.location.pathname+window.location.hash;
        scrollTo(0, 0);
	});
	/* se a janela for redimensionada */
	$(window).resize(function() {
		//controlPageWidth();
	});

	/*=== selecionar variável ===*/

	$(document).on('click', ".scc", function(){
        if(url['var'] < 10){
            var setor = $(this).attr('data-id');
            var newSCCSrc = $("#view_box_scc").attr("src").replace(/cad=[0-9]*/, "cad="+setor);
            var change = newSCCSrc.match(/uf=([0-9]*)/);
            var newBarrasSrc = $("#view_box_barras").attr("src").replace(/cad=[0-9]*/, "cad="+setor);
            var newSrc = $("#view_box").attr("src").replace(/cad=[0-9]*/, "cad="+setor);
            newSrc = newSrc.replace(/uf=[0-9]*/, "uf="+change[1]);
            if(setor == 0) {
                newSCCSrc = newSCCSrc.replace(/prt=[0-9]*/, "prt=0");
                newBarrasSrc = newBarrasSrc.replace(/prt=[0-9]*/, "prt=0");
                newSrc = newSrc.replace(/prt=[0-9]*/, "prt=0");
            }
            $("#view_box").attr("src", newSrc);
            $("#view_box_barras").attr("src", newBarrasSrc);
            $("#view_box_scc").attr("src", newSCCSrc);

            enableDesag(getEixo(window.location.hash.substring(1)), url['var'], setor, false);

            d3.json('data/pt-br.json', function(error, data) {
                if (error) throw error;

                textJSON = data;
                $(".cad-title").first().html(textJSON.select.cad[setor].name);

            });

            $(".bread-select[data-id='cad']").val($(this).attr("data-id"));
        }
    });

    $(document).on('click', ".ocp", function(){
        var ocupacao = $(this).attr('data-id');
        var newSCCSrc = $("#view_box_scc").attr("src").replace(/ocp=[0-9]*/, "ocp="+ocupacao);
        var change = newSCCSrc.match(/uf=([0-9]*)/);
        var newBarrasSrc = $("#view_box_barras").attr("src").replace(/ocp=[0-9]*/, "ocp="+ocupacao);
        var newSrc = $("#view_box").attr("src").replace(/ocp=[0-9]*/, "ocp="+ocupacao);
        newSrc = newSrc.replace(/uf=[0-9]*/, "uf="+change[1]);
        if(ocupacao == 0) {
            newSCCSrc = newSCCSrc.replace(/prt=[0-9]*/, "prt=0");
            newBarrasSrc = newBarrasSrc.replace(/prt=[0-9]*/, "prt=0");
            newSrc = newSrc.replace(/prt=[0-9]*/, "prt=0");
        }
        $("#view_box").attr("src", newSrc);
        $("#view_box_barras").attr("src", newBarrasSrc);
        $("#view_box_scc").attr("src", newSCCSrc);

        enableDesag(getEixo(window.location.hash.substring(1)), url['var'], ocupacao, false);

        d3.json('data/pt-br.json', function(error, data) {
            if (error) throw error;

            textJSON = data;
            $(".cad-title").first().html(textJSON.select.ocp[ocupacao-1].name);

        });

        $(".bread-select[data-id='ocp']").val($(this).attr("data-id"));
    });

	$(document).on('click', ".var-click", function(){
        defaultUrl(); /* valores de filtros default */
		controlVar($(this).attr('href'));

	});
    if(url['var'] === "") controlVarPage(1);
    if(url['var']) controlVar(url['var']);

    /* mobile! */
	$(document).on('change', ".menu-select", function(){
		controlVar(this.value);

	});	

	/* velocidade scroll */
	$(document).on('click','a[href*="#"]:not([href="#"])',function(){
    	smoothScroll(this); 
    });

	/*=== resultado ===*/

	/* alterar tipo de visualização */
	$(document).on('click', "button.opt.view", function(){
		if($(this).attr("id") !== "setor" && $(this).attr("id") !== "ocupacao") {
            updateUrl();
            url['view'] = $(this).attr('id'); /* muda visualização */
            updateIframe(url); /* atualiza gráfico */
        }
        else {
            updateUrl();
		    if($(this).attr("id") === "setor") {
                switchToSetores();
		        url['slc'] = 0;
                url['deg'] = 0;
                url['ocp'] = 0;
                controlFilter('0', 'deg');
                url['ocp'] = 0;
            }
		    else {
                d3.json('data/pt-br.json', function(error, data) {
                    if (error) throw error;

                    textJSON = data;
                    $(".cad-title").first().html(textJSON.select.ocp[0].name);

                });
		        switchToOcupations();
		        url['slc'] = 1;
                url['deg'] = 0;
                url['cad'] = 0;
                url['ocp'] = 1;
                controlFilter('0', 'deg');
                url['cad'] = 0;
                url['ocp'] = 1;
            }
            updateIframe(url); /* altera gráfico */
        }
	});

	/* alterar janela filtro */
	$(document).on('click', ".opt.select", function(){
		openFilter($(this));

	});

	/* escolher novo filtro */
	$(document).on('change', ".opt-select", function(){
		if($(this).attr("data-id") !== "eixo") {
            updateUrl();
		    controlFilter($(this).val(), $(this).attr('data-id'));
            /* controla relações entre filtros */
            updateIframe(url);            
            $(".bread-select[data-id="+$(this).attr('data-id')+"]").val($(this).val());
            /* altera gráfico */
            if($(this).attr('data-id') == 'var'){
                updateMenuSetor($(this).val())
            }
        }
        else {
		    parent.window.location = "page.php#"+$(this).val();
        }
	});

    $(document).on('change', ".bread-select", function(e){
        if($(this).attr("data-id") !== "eixo") {
            updateUrl();
            controlFilter($(this).val(), $(this).attr('data-id'));
            /* controla relações entre filtros */
            updateIframe(url);
            if($(this).attr('data-id') =='var'){
                $('.bread-select[data-id=uf]').val(0);
                $('.bread-select[data-id=cad]').val(0);
                $(window.document).find(".cad-title").first().html($('.bread-select[data-id=cad] option:selected').text());
                updateMenuSetor($(this).val());
            }
            if($(this).attr("data-id") == "uf") {
                $(window.document).find(".state-title").first().html(this.options[e.target.selectedIndex].text);
            }
            if($(this).attr("data-id") === "cad") {
                $(window.document).find(".cad-title").first().html(this.options[e.target.selectedIndex].text);
            }
            if($(this).attr("data-id") === "ocp") {
                $(window.document).find(".cad-title").first().html(this.options[e.target.selectedIndex].text);
            }

            $(".opt-select[data-id="+$(this).attr('data-id')+"]").val($(this).val());

            /* altera gráfico */
        }
        else {
            parent.window.location = "page.php#"+$(this).val();
        }

    });

    $(document).on('change', ".bread-eixo", function(){
        parent.window.location = "page.php#"+$(this).val();
    });

	/* download doc */
	$(document).on('click', '.button-control-down', function(){

		var downloadUrl = $(this).siblings('.url-input').val();
		window.open(downloadUrl, '_blank');

	});


	//////////////////// SCRIPT PARA O MENUDESKTOP /////////////////////
	$(document).on('mouseenter', '.eixo-inativo', function() {
        expandMenu(this);
    });
    $(document).on('mouseleave', '.eixo-inativo', function() {
        minimizeMenu(this);
    });
    $("#menuvariaveis").on('mouseleave', function() {
        expandMenuVariaveis(this);
    });
    $(document).on('mouseenter', '.eixo-ativo', function() {
        expandMenuEixoAtivo(this);
    });
    ///////////////////////////////////////////////////////////////////

    updateIframe(url);
});