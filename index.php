<!DOCTYPE html>
<html>
	<head>
		<?php include 'head.php';?>
	</head>
	<body class="home">

		<!--===== barra do governo =====-->
		<?php include 'barra_gov.php'; ?>

		<section id="startContent">
			<article>
				<div class="container-fluid">

					<div class="row">

						<!--=== logo! ===-->
						<div class="col-lg-4 col-md-5 col-xs-12">
							
							<div class="row">
								<div class="col-xs-8 col-xs-offset-2 col-xxs-10 col-xxs-offset-1">
									<div class="home-info control-height">
										<div class="content">

											<div class="desc-title text-center">
												Atlas Econômico<br/>
												da Cultura Brasileira
											</div>
											<div class="separator"></div>

											<div class="desc">

                                                <p style="text-transform: uppercase;">
                                                    O Atlas Econômico da Cultura Brasileira apresenta o impacto dos Setores Culturais e Criativos (SCC) sobre a evolução da economia brasileira.
                                                </p>

                                                <p style="text-transform: uppercase;">
                                                    Tal informação está disponível para todas as unidades federativas e para dez Setores Culturais e Criativos. São eles: Arquitetura e Design, Artes Cênicas e Espetáculos, Audiovisual, Cultural Digital, Editorial, Educação e Criação em Artes, Entretenimento, Música, Patrimônio, e Publicidade.
                                                </p>

                                                <p style="text-transform: uppercase;">
                                                    Os dados estão organizados em quatro eixos temáticos: Empreendimentos Culturais, Mercado de trabalho, Políticas Públicas e Comércio Internacional.
                                                </p>
											</div>
										</div>
									</div>
								</div>
							</div>

						</div>

						<!--=== links ===-->
						<div class="col-lg-7 col-md-6 col-xs-10 col-xs-12 col-md-offset-0 col-xs-offset-1">

							<div class="row menu-home">
								
								<a href="page.php#empreendimentos" class="img-link">
									<div class="col-sm-3 menu-col">
										<div class="menu-item control-height">

											<div class="video">
											    <video autoplay class="thevideo" loop preload="none">
											    	<source src="images/video1.mp4" type="video/mp4">
											    	<source src="images/video1.webm" type="video/webm">
											   		Navegador não compatível.
											    </video>

											</div>

											<div class="menu-content" id="item1">

												<div class="text-wrapper">
													<div class="square-icon"></div>
													<div class="text"><p>EMPRENDIMENTOS<br/> CULTURAIS</p></div>	
												</div>

											</div>
										</div>
									</div>
								</a>

								<a href="#" class="img-link">
									<div class="col-sm-3 menu-col">
										<div class="menu-item control-height">
											<div class="menu-content" id="item2">

												<div class="text-wrapper">
													<div class="square-icon"></div>
													<div class="text"><p>MERCADO<br/>DE TRABALHO</p></div>
												</div>

												<p class="soon">EM DEZEMBRO 2017</p>

											</div>
										</div>
									</div>
								</a>

								<a href="#" class="img-link">
									<div class="col-sm-3 menu-col">
										<div class="menu-item control-height">
											<div class="menu-content" id="item3">

												<div class="text-wrapper">
													<div class="square-icon"></div>
													<div class="text"><p>POLÍTICAS<br/>PÚBLICAS</p></div>
												</div>

												<p class="soon">EM JANEIRO 2018</p>

											</div>
										</div>
									</div>
								</a>

								<a href="#" class="img-link">
									<div class="col-sm-3 menu-col">
										<div class="menu-item control-height">
											<div class="menu-content" id="item4">

												<div class="text-wrapper">
													<div class="square-icon"></div>
													<div class="text"><p>COMÉRCIO<br/>INTERNACIONAL</p></div>
												</div>

												<p class="soon">EM FEVEREIRO 2018</p>
												
											</div>
										</div>
									</div>
								</a>

							</div>
						</div>

						<!--=== neccult ===-->
						<div class="col-md-1 col-xs-1 col-xxs-12">
							<div class="row">
								<div class="neccult-info control-height">
									<div class="content">
										<a href="http://obec.ufrgs.br/neccult/" target="_blank">
											<img src="images/neccult.png" class="logo-neccult hidden-xxs" alt="Neccult"/>
											<img src="images/neccult_mobile.png" class="logo-neccult show-xxs" alt="Neccult"/>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</article>
		</section>
		
		<script type="text/javascript" defer="defer" src="//barra.brasil.gov.br/barra.js"></script>
		<script type="text/javascript" src="js/bootstrap.min.js"></script>
		<script type="text/javascript" src="js/contraste.js"></script>
		
		<script type="text/javascript">
			
			function controlHeight(){

				var windowHeight = $(window).height(),
					headerHeight = $('.barra-gov').height(),
					contentHeight = windowHeight - headerHeight;

				$('.control-height').css('max-height',contentHeight);
			}

			/* ajusta o tamanho do vídeo, 
				para seguir da altura do container */
			function videoHeight(){
				$('.menu-item').find('.video').each(function(index){
					var parentHeight = $(this).parents('.menu-item').height();
					$(this).height(parentHeight);
				});
			}

			/* quando a janela é carregada */
			$(window).bind("load", function() {

				controlHeight();

				videoHeight();

				bodyDark(dark);/* alto contraste */

			});

			$(document).ready(function(){				

				/* se a janela for redimensionada */
				$(window).resize(function() {
					videoHeight();
				});
			});
		</script>
	</body>
</html>