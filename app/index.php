<!DOCTYPE html>
<html>
	<head>
		<?php include 'head.php';?>
	</head>
	<body class="home">
		<div id="fullpage">
			<div class="section " id="section0">
				<!--===== barra do governo =====-->
				<?php include 'barra_gov.php'; ?>
				<!-- logo -->
				<div class="row">
				    <div>
				        <div class="welcome text-center col-lg-12 col-md-12 col-sm-12 col-xs-12">
				            <p>Bem-vindo ao</p>
				            <img class="img_atlas" src="images/Atlas.png">
				        </div>
				    </div>
				</div>
				<!-- bottom para explorar -->
				<div class="explorar text-center col-lg-2 col-lg-offset-5 col-md-offset-5 col-sm-6 col-sm-offset-3 col-xs-offset-3">
					<a id="explorar" href="index.php#2" >explore</a>
				</div>
			</div>

			<div class="section " id="section1">
				<div class="content">
					<div class="desc-title text-center">
						<p>O Atlas é uma ferramenta de pesquisa, disponibilização e visualização de dados da <br/>cultura na economia brasileira.  Ela permite que você:</p>
					</div>
					<div class="separator_2"></div>
					<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding: 0;">
						<div class="icons-list col-lg-3 col-lg-offset-0 col-md-3 col-ms-offset-20 col-sm-8 col-sm-offset-2 col-xs-8 col-xs-offset-2">
							<a href="page.php#empreendimentos"><img class="img_icons" src="images/Icone_01.png"></a>
						</div>
						<div class="icons-list col-lg-3 col-lg-offset-0 col-md-3 col-ms-offset-20 col-sm-8 col-sm-offset-2 col-xs-8 col-xs-offset-2">
							<a href="page.php#mercado"><img class="img_icons" src="images/Icone_02.png"></a>
						</div>
						<div class="icons-list col-lg-3 col-lg-offset-0 col-md-3 col-ms-offset-20 col-sm-8 col-sm-offset-2 col-xs-8 col-xs-offset-2">
							<a href="page.php#politicas"><img class="img_icons" src="images/Icone_03.png"></a>
						</div>
						<div class="icons-list col-lg-3 col-lg-offset-0 col-md-3 col-ms-offset-20 col-sm-8 col-sm-offset-2 col-xs-8 col-xs-offset-2">
							<a href="page.php#comercio"><img class="img_icons" src="images/Icone_04.png"></a>
						</div>
						<div class="text-atlas col-lg-11 col-md-12 col-sm-12 col-xs-12" id="background_2">
							<div class="title-question col-lg-11 col-lg-offset-1 col-md-11 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-11 col-xs-offset-1">
								<p class="col-lg-5 col-md-5 col-sm-12 col-xs-12"  style="padding: 0;">Por que construir um Atlas da Economia da Cultura no Brasil?</p>
							</div>
							<div class="separator_3 col-lg-6 col-md-6 col-sm-12 col-xs-12"></div>
							<div class="question col-lg-11 col-lg-offset-1 col-md-11 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-11 col-xs-offset-1">
								<p class="col-lg-5 col-md-5 col-sm-12 col-xs-12" style="padding: 0 10px 0 0;">Para mapear e sistematizar um vasto conjunto de informações relacionadas ao panorama econômico e produtivo da cultura no Brasil. Combinando acessibilidade e fundamentação acadêmica, o Atlas Econômico da Cultura Brasileira apresenta e discute dados, indicadores e estatísticas culturais, impulsionando o debate sobre o papel da cultura na economia brasileira.</p>
							</div>
							<div class="title-question col-lg-11 col-lg-offset-1 col-md-11 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-11 col-xs-offset-1">
								<p class="col-lg-5 col-md-5 col-sm-12 col-xs-12"  style="padding: 0;">Por que dividir o Atlas em quatro eixos?</p>
							</div>
							<div class="separator_3 col-lg-7 col-md-7 col-sm-12 col-xs-12"></div>
							<div class="question col-lg-11 col-lg-offset-1 col-md-11 col-md-offset-1 col-sm-11 col-sm-offset-1 col-xs-11 col-xs-offset-1">
								<p class="col-lg-6 col-md-6 col-sm-12 col-xs-12" style="padding: 0;">Porque o processo da economia criativa e da cultura no território brasileiro deve ser estudado a partir de diversas dimensões e eixos de indicadores. A organização em torno de eixos busca facilitar a identificação de gargalos e potenciais tendo em vista a formulação de políticas públicas mais consistentes e adequadas às necessidades do país.</p>
							</div>
						</div>
						<div class="logo_fim text-center col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding: 0;">
							<img class="img_logofim" src="images/atlas_dark.png">
						</div>
					</div>
				</div>
			</div>
		</div>





		<div class="footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
			<?php include 'footer.php'; ?>
		</div>
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

			$(document).on('click', '#explorar', function(){
				var local = location.hash;
				if(local == "#2")
					location.reload();
			});

			$(document).ready(function(){

				/* se a janela for redimensionada */
				$(window).resize(function() {
					videoHeight();
				});
			});



			$(document).ready(function() {
				$('#fullpage').fullpage({
					'verticalCentered': false,
					'css3': false,
					'navigation': false,
					'hybrid': false,
					'offsetSections': true,
					'autoScrolling': false,
					'fitToSection': false,
				});
			});


		</script>
	</body>
</html>
