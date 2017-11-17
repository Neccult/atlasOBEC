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
	$('iframe').attr('src', 'resultado.php?var='+clickVar+'&view=mapa&uf=0&prt=0&atc=0&cad=0&ocp=0&ano=2014&eixo='+newHash.substring(1)+newHash);
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
    url['prv'] = 0;
    url['mec'] = 0;
    url['mod'] = 0;
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
	
	/* se for PORTE x ATUAÇÃO */
    console.log(selectvalue);
	if(selectid=='prt'){
		/* filtro atuação */
		if(selectvalue.match('atc-','')){
			url['atc'] = selectvalue.replace('atc-','');
			url['prt'] = '0'; /* se for atuação, não há filtro por porte */
            console.log(url);
		}

		/* filtro porte */
		else{
			url['prt'] = selectvalue;
			url['atc'] = '0';/* se for porte, não há filtro por atuação */
			console.log(url);
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
									*/
	if(url['cad']==0 && url['view']!='treemap_scc'){
		url['atc'] = 0;
		url['prt'] = 0;
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


/*-----------------------------------------------------------------------------
Função: getEixo
   Dicionário para o eixo, recebe o nome string e retorna o id int
Entrada:
    eixo => string do eixo
Saída:
    eixo_id => int
-----------------------------------------------------------------------------*/
function getEixo(eixo){

    if(eixo == 'empreendedimentos') {
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
	$('html, body').scrollTop($("div.container").offset().top);

	/* fade in no resultado */
	$('.fadeInPage').addClass('done');
	$('.fadeIn').addClass('done');


	/*  se não existe setor selecionado,
		não é possível escolher porte x atuação 
		(exceto no treemap por setores)
										*/
	if(window.location.hash.substring(1) == "empreendimentos") {
		if(url['cad']==0 && url['view']!='treemap_scc'){
            $('.select-prt').find('select').attr('disabled','disabled'); /* desabilita select */
            $('#select-atc').find('select').attr('disabled','disabled'); /* desabilita select */
            $('.select-prt').append('<p class=\"error\">Selecione um setor para habilitar este filtro. </p>'); /* mensagem de select desabilitado */
            $('#select-atc').append('<p class=\"error\">Selecione um setor para habilitar este filtro. </p>'); /* mensagem de select desabilitado */
        }
    }


    if(window.location.hash.substring(1) == "mercado") {
		if((url['ocp']==0 && url['view']!='treemap_scc') || (url['slc'] == 0)){
            $('#select-cor').find('select').attr('disabled','disabled'); /* desabilita select */
            $('#select-frm').find('select').attr('disabled','disabled'); /* desabilita select */
            $('#select-prv').find('select').attr('disabled','disabled'); /* desabilita select */
            $('#select-snd').find('select').attr('disabled','disabled'); /* desabilita select */
            $('#select-cor').append('<p class=\"error\">Selecione uma ocupação para habilitar este filtro. </p>'); /* mensagem de select desabilitado */
            $('#select-frm').append('<p class=\"error\">Selecione uma ocupação para habilitar este filtro. </p>'); /* mensagem de select desabilitado */
            $('#select-prv').append('<p class=\"error\">Selecione uma ocupação para habilitar este filtro. </p>');
            $('#select-snd').append('<p class=\"error\">Selecione uma ocupação para habilitar este filtro. </p>'); /* mensagem de select desabilitado */
        }
        if((url['ocp']!=0 && url['view']!='treemap_scc') || (url['slc'] == 1)){
            $('#select-sex').find('select').attr('disabled','disabled'); /* desabilita select */
            $('#select-prt').find('select').attr('disabled','disabled'); /* desabilita select */
            $('#select-sex').append('<p class=\"error\">Selecione um setor para habilitar este filtro. </p>'); /* mensagem de select desabilitado */
            $('#select-prt').append('<p class=\"error\">Selecione um setor para habilitar este filtro. </p>'); /* mensagem de select desabilitado */
        }
    }

	/* set selects com os valores da url */
	$(".opt-select").each(function(){
		
		var selectId = $(this).attr('data-id'),
			selectValue = url[selectId];

		/* atualiza valor select */
		$(this).val(selectValue);	
		console.log(url);
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
	if(windowWidth<800)	menuView = 'menumobile.php?'+newHash+'=1';

	$("#menuvariaveis").load(menuView, function(){
		if(url['var']!=='' && pageTitle!==''){
			loadResult();
            changeDescVar();
		}
	});
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
	console.log($("span").find("[data-id='setor']"));
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

        if(url['view'] !== "barras") $("span[data-id='ano']").html("em "+ano);

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

	console.log('loaded!');

});

/*====== 
	documento pronto
======*/
$(document).ready(function(){
	$(window).on('hashchange', function() {
        loadPage();
        window.location.href = window.location.pathname+window.location.hash;
        scrollTo(0, 0);
	});
	/* se a janela for redimensionada */
	$(window).resize(function() {
		controlPageWidth();
	});

	/*=== selecionar variável ===*/
	$(document).on('click', ".var-click", function(){
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
	$(document).on('click', ".opt.view", function(){
	
		defaultUrl();/* valores de filtros default */
		url['view'] =  $(this).attr('id');/* muda visualização */
		changeChart(url);/* atualiza gráfico */

	});

	/* alterar janela filtro */
	$(document).on('click', ".opt.select", function(){
		openFilter($(this));
	});

	/* escolher novo filtro */
	$(document).on('change', ".opt-select", function(){
		
		controlFilter($(this).val(),$(this).attr('data-id')); /* controla relações entre filtros */
		changeChart(url); /* altera gráfico */
		
	});

	/* download doc */
	$(document).on('click', '.button-control-down', function(){

		var downloadUrl = $(this).siblings('.url-input').val();
		window.open(downloadUrl, '_blank');

	});

});