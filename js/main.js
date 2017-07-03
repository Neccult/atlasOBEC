/*======
	controla se deve ter animação dos círculos
======*/
function controlAnimation(){
	/*### escolheu variável ###*/
	if(url['var']!=='' && pageTitle!==''){

		$('.fadeInPage').addClass('done');
		$('.fadeIn').addClass('done');

		$('html, body').scrollTop($("#resultado").offset().top); /* move scroll para o gráfico */		
	}else{
		$("#animacao").load('animacaomenu.php');
	}
}

/*======
	controla tipo de menu círculos (desk, mobile)
======*/
function controlMenu(firstload){
	
	var windowWidth = $(window).width();

	if(windowWidth>767){
		$("#menuvariaveis").load('menudesktop.php', function(){
			if(firstload) controlAnimation();
		});			
	}else{
		$("#menuvariaveis").load('menumobile.php', function(){
			if(firstload) controlAnimation();
			$('.menu-select').val(url['var']);
		});
	}
}

/*======
	redireciona ao resultado,
	ao selecionar variável no menu
======*/
function controlVar(clickVar){
	window.location.href = 'page.php?var='+clickVar+'&view=mapa&uf=0&prt=0&atc=0&cad=0&ano=2014';
	/* variáveis com valores default */
}

/*======
	monta url com filtros selecionados
======*/
function createUrl(url){

	var newUrl = "",
		count = 0,
		size = Object.keys(url).length;

	$.each(url, function(key,value){

		newUrl = newUrl+key+"="+value;
				
		if((++count)!=size) newUrl = newUrl+"&";
	});

	return newUrl;
}

/*====== 
	documento carregando
======*/
$(window).bind("load", function() { 

	controlMenu(1); /* controla menu círculos! */

	bodyDark(dark);/* alto contraste */

	console.log('loaded!');

});

/*====== 
	documento pronto
======*/
$(document).ready(function(){

	/***************************************************/
	/******************** menu círculos ****************/
	/***************************************************/

	var windowWidth = $(window).width();

	/* se a janela for redimensionada */
	$(window).resize(function() {

		var wait;
		clearTimeout(wait);
			wait = setTimeout(controlMenu(), 100); /* controla menu círculos! */
			
		var newWidth = $(window).width();

		/*  só redimensionar o gráfico
			se a largura for alterada! */
		if(newWidth!=windowWidth){

			windowWidth = newWidth;
			var wait2;
			clearTimeout(wait2);
			wait2 = setTimeout(location.reload(), 100); /* reload pg! */
		}
	});

	/*=== selecionar variável circulo ===*/
	$(document).on('click', ".var-click", function(){
		controlVar($(this).attr('href'));				
	});	
	/* mobile! */
	$(document).on('change', ".menu-select", function(){
		controlVar(this.value);				
	});	


	/***************************************************/
	/******************** resultado ********************/
	/***************************************************/

	/* ajusta nome da página */
	if(url['var']!=='' && pageTitle!==''){
		$(this).attr("title", pageTitle+" | Atlas Econômico da Cultura Brasileira");
	}

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

	/* restringe filtro de atuação ==> comércio */
	function controlAtc(select,isPrt){

		if(url['cad']!=4 && url['cad']!=5 && url['cad']!=9 && url['cad']!=0){
			
			if(isPrt) $(select).find('option[value="atc-1"]').remove();
			else $(select).find('option[value="1"]').remove();
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

		if(selectId=='prt') controlAtc(this,1);
		if(selectId=='atc') controlAtc(this,0);

	});

	/* alterar tipo de visualização */
	$(document).on('click', ".opt.view", function(){
	
		url['view'] =  $(this).attr('id');
		
		/* muda view, filtros valores default */
		url['uf'] = 0;
		url['cad'] = 0;
		url['prt'] = 0;
		url['atc'] = 0;
		url['ano'] = 2014;

		var newUrl = createUrl(url);
		window.location.href = 'page.php?'+newUrl;

	});

	/* alterar janela filtro */
	$(document).on('click', ".opt.select", function(){

		/* altera button active */
		$('.opt.select').removeClass('active');
		$(this).addClass('active');

		/* altera visualização filtro */
		$('.select-group').addClass('hide');
		$('.select-group#select-'+$(this).attr('id')).removeClass('hide');
	});

	/* escolher novo filtro */
	$(document).on('change', ".opt-select", function(){
		
		var selectid = $(this).attr('data-id'),
			selectvalue = $(this).val();


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

		var newUrl = createUrl(url);
		window.location.href = 'page.php?'+newUrl;
				
	});

	/* velocidade scroll */
	$(function() {
	    $('a[href*="#"]:not([href="#"])').click(function(){

	        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
	            var target = $(this.hash);
	            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

	            if (target.length) {
	                $('html, body').animate({
	                    scrollTop: target.offset().top
	                }, 500);
	                return false;
	            }
	        }
	    });
	});

});