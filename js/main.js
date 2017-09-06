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
	window.location.href = 'page.php?var='+clickVar+'&view=mapa&uf=0&prt=0&atc=0&cad=0&ano=2014&eixo='+newHash.substring(1)+newHash;
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
	window.location.href = 'page.php?'+newUrl+"&eixo="+window.location.hash.substring(1)+window.location.hash;
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

	}else{
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
Função: controlAtc
   restringe filtro de atuação ==> comércio apenas para os setores 4 - 5 - 9 - todos
Entrada: 
    select => objeto do select
    isPrt => boolean é ou não select de porte  
Saída:
    void
-----------------------------------------------------------------------------*/
function controlAtc(select,isPrt){

	if(url['cad']!=4 && url['cad']!=5 && url['cad']!=9 && url['cad']!=0){
		
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
	$('html, body').scrollTop($("#resultado").offset().top); 

	/* fade in no resultado */
	$('.fadeInPage').addClass('done');
	$('.fadeIn').addClass('done');


	/*  se não existe setor selecionado,
		não é possível escolher porte x atuação 
		(exceto no treemap por setores)
										*/
	if(url['cad']==0 && url['view']!='treemap_scc'){
		$('#select-prt').find('select').attr('disabled','disabled'); /* desabilita select */
		$('#select-atc').find('select').attr('disabled','disabled'); /* desabilita select */
		$('#select-prt').append('<p class=\"error\">Selecione um setor para habilitar este filtro. </p>'); /* mensagem de select desabilitado */
		$('#select-atc').append('<p class=\"error\">Selecione um setor para habilitar este filtro. </p>'); /* mensagem de select desabilitado */
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

		if(selectId=='prt') controlAtc(this,1);
		if(selectId=='atc') controlAtc(this,0);

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
	if(windowWidth<768)	menuView = 'menumobile.php?'+newHash;

	$("#menuvariaveis").load(menuView, function(){
		if(url['var']!=='' && pageTitle!==''){
			loadResult();		
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