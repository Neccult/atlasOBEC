<!DOCTYPE html>
<html>
	<head>
		<?php include 'head.php';?>
	</head>
	<body>

		<!--===== barra do governo =====-->
		<?php include 'barra_gov.php'; ?>


		<!--=== menu variaveis ===-->
		<section id="menuSection"> 
			<article>
				<div class="container">
					
					<div class="menu-circles">
						<div class="content text-center">



							<!--==== jquery load menu ===-->
							<div id="menuvariaveis"></div>

						</div>			
					</div>

				</div>
			</article>
		</section>

		<!--=== resultados -> gráfico! ===-->
		<?php if(isset($_GET["var"])):?>
		
			<?php

				/* GETS! */
				$uf = $_GET["uf"];	   /*== uf ==*/
				$ano = $_GET["ano"];   /*== ano ==*/
				$prt = $_GET["prt"];   /*== porte ==*/
				$atc = $_GET["atc"];   /*== atuação ==*/
				$cad = $_GET["cad"];   /*== setor/cadeia ==*/
				$var = $_GET["var"];   /*== variável selecionada ==*/
				$view = $_GET['view']; /*== modo de visualização ==*/
                $eixo = $_GET['eixo']; /*== modo de visualização ==*/


				/* informações JSON */
				$json = file_get_contents('data/pt-br.json');
				$json_text = json_decode($json, true);

				if($eixo == "empreendimentos") {
				    $text = $json_text['var'][0][$_GET["var"]-1]; /*== informações da variável ==*/
                }
                else if($eixo == "mercado") {
                    $text = $json_text['var'][1][$_GET["var"]-1]; /*== informações da variável ==*/
                }
                else if($eixo == "politicas") {
                    $text = $json_text['var'][2][$_GET["var"]-1]; /*== informações da variável ==*/
                }
                else if($eixo == "comercio") {
                    $text = $json_text['var'][3][$_GET["var"]-1]; /*== informações da variável ==*/
                }
				$select = $json_text['select'];			   /*== informação dos selects ==*/

				/*
					busca a view do gráfico, 
					se esta não existir busca a 
					primeira declarada no json
				*/	
				if(!isset($text[$view])) $view = $text['type'][0]['id']; 	

				$descView = $json_text[$view];			   /*== descrição da visualização ==*/
			?>

			<!-- se existem informações desta variável -->
			<?php if(!empty($text)):?>
				<section id="resultado">
						
					<?php include 'resultado.php';?>

				</section>
			<?php endif;?>
		
		<?php endif;?>

		<!--=== navegação ===-->
		<section class="menu-bottom">
			<div class="container">
				<div class="row">
					<div class="col-xs-3">
						<div class="menu-content" id="item1">

							<a href="#empreendimentos" class="link">
								<div class="square-icon"></div>
								<div class="text">
									<p>EMPRENDIMENTOS<br/>CULTURAIS</p>
								</div>
							</a>

						</div>
					</div>
					<div class="col-xs-3">
						<div class="menu-content" id="item2">

							<a href="#mercado" class="link">
								<div class="square-icon"></div>
								<div class="text">
									<p>MERCADO<br/>DE TRABALHO</p>
								</div>
							</a>

						</div>
					</div>
					<div class="col-xs-3">
						<div class="menu-content" id="item3">

							<a href="#politicas" class="link">
								<div class="square-icon"></div>
								<div class="text">
									<p>POLÍTICAS<br/>PÚBLICAS</p>
								</div>
							</a>

						</div>
					</div>
					<div class="col-xs-3">
						<div class="menu-content" id="item4">

							<a href="#comercio" class="link">
								<div class="square-icon"></div>
								<div class="text">
									<p>COMÉRCIO<br/>INTERNACIONAL</p>
								</div>
							</a>
							
						</div>
					</div>
				</div>
				<!--<div class="row">
					<div class="col-xs-12">
						<div class="text-center">
							<a href="index.php" class="home button">Home</a>
						</div>
					</div>
				</div>-->
			</div>
		</section>

		<!-- se existem informações desta variável -->
		<?php if(!empty($text)):?>
			<?php include 'footer.php'; ?>
		<?php endif;?>

		<!---/* url atual para o js */-->
		<script type="text/javascript">
			var url = {
				view:"<?php echo $view; ?>", 
				var:"<?php echo $var; ?>", 
				prt:"<?php echo $prt; ?>", 
				atc:"<?php echo $atc; ?>", 
				cad:"<?php echo $cad; ?>", 
				ano:"<?php echo $ano; ?>",
				uf:"<?php echo $uf; ?>"
			};
			var pageTitle = "<?php echo strip_tags($text['title'])?>";
		</script>

		<script type="text/javascript" defer="defer" src="//barra.brasil.gov.br/barra.js"></script>
		<script type="text/javascript" src="js/bootstrap.min.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
		<script type="text/javascript" src="js/contraste.js"></script>

	</body>
</html>
