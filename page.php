<!DOCTYPE html>
<html>
	<head>
		<?php include 'head.php';?>
	</head>
	<body>

		<!--=== menu variaveis ===-->
		<section id="menuSection"> 
			<article>
				<div class="container-fluid">
					
					<div class="row">
						<div class="col-md-12">
							<div class="menu-circles">
								<div class="content text-center">

									<a href="index.php" class="img-link"><img src="images/logo_min.png" class="logo-min" alt="Logo Atlas"></a>

									<p class="title">Empreendimentos Culturais</p>

									<!--==== jquery load menu ===-->
									<div id="menuvariaveis"></div>

								</div>
							</div>			
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


				/* informações JSON */
				$json = file_get_contents('text/pt-br.json');
				$json_text = json_decode($json, true);

				$text = $json_text['var'][$_GET["var"]-1]; /*== informações da variável ==*/
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

							<a href="#" class="link">
								<div class="square-icon"></div>
								<div class="text">
									<p>EMPRENDIMENTOS<br/>CULTURAIS</p>
								</div>
							</a>

						</div>
					</div>
					<div class="col-xs-3">
						<div class="menu-content" id="item2">

							<a href="#" class="link">
								<div class="square-icon"></div>
								<div class="text">
									<p>MERCADO<br/>DE TRABALHO</p>
								</div>
							</a>

						</div>
					</div>
					<div class="col-xs-3">
						<div class="menu-content" id="item3">

							<a href="#" class="link">
								<div class="square-icon"></div>
								<div class="text">
									<p>POLÍTICAS<br/>PÚBLICAS</p>
								</div>
							</a>

						</div>
					</div>
					<div class="col-xs-3">
						<div class="menu-content" id="item4">

							<a href="#" class="link">
								<div class="square-icon"></div>
								<div class="text">
									<p>COMÉRCIO<br/>INTERNACIONAL</p>
								</div>
							</a>
							
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12">
						<div class="text-center">
							<a href="index.php" class="home button">Home</a>
						</div>
					</div>
				</div>
			</div>
		</section>

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

		
		<script src="js/bootstrap.min.js" type="text/javascript"></script>
		<script type="text/javascript" src="js/main.js"></script>

	</body>
</html>