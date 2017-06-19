<article class="results-article">
	<div class="results-content">
		<div class="container">
			<div class="row">

				<div class="col-md-3 col-xs-12">
					<div class="desc-chart text-center">

						<!--=== título variável ===-->
						<div class="title"><?php echo $text['title'];?></div>
						<div class="separator white"></div>
						<div class="text text-justify"><?php echo $text['desc'];?></div>
					
						<!-- logo atlas -->
						<a href="index.php"><img src="images/logo_white.png" class="logo-desc" alt="Logo Atlas"/></a>

					</div>				
				</div>
				
				<!-- gráfico -->
				<div class="col-md-7 col-xs-12">
					<div class="container-chart">
						<div class="content">
							<div class="chart">								

								<!-- controla filtros disponíveis -->
								<?php

									foreach($text['inativos'][$view] as $filter){
										$_GET[$filter]=0;
									}
									if(($cad!=4 && $cad!=5 && $cad!=9) && $atc==1){
										$_GET['atc']=0;	
									}

								?>
								<!--
									inclui a view do gráfico, 
									se esta não existir busca a 
									primeira declarada no json
								-->	
								<?php

									if(!isset($text[$view])) $view = $text['type'][0]['id']; 								
									include $view.'.php';
								?>

							</div>	
						</div>
					</div>
				</div>


				<!--============= opções gráfico! ============-->
				<div class="col-md-2 col-xs-12 opts-result">
					

					<!--=== tipo de gráfico ===-->
					<div class="row">

						<?php
							$buttons = sizeof($text['type']);

							/*  quebra de colunas de acordo com
								número de opções */
							if($buttons==1){
								$col = "col-xs-12";
							}elseif($buttons==3){
								$col = "col-xs-4";
							}else{
								$col = "col-xs-6";
							}
						?>

						<!--=== views gráfico ===-->
						<?php foreach($text['type'] as $key => $value):?>
						
							<div class="<?php echo $col;?> col-btn">
								<button class="opt view <?php if($value['id']==$view) echo 'active';?>" id="<?php echo $value['id'];?>"><?php echo $value['name'];?></button>
							</div>
						
						<?php endforeach;?>					

					</div>

					<div class="separator white"></div>

					<div class="row">

						<!--=== descrição do tipo de gráfico atual ===-->
						<p class="text-justify"><?php echo $descView; ?><br/><br/></p>
						
					</div>


					<!--=============  filtros! =================-->
					<div class="row">

						<?php
							$buttons = sizeof($text[$view]);

							/*	quebra de colunas de acordo com
								número de opções */

							if($buttons==1){
								$col = "col-xs-12";
							}elseif($buttons==3){
								$col = "col-xs-4";
							}else{
								$col = "col-xs-6";
							}
						?>

						<!--=== botões com os filtros do gráfico ===-->
						<?php foreach($text[$view] as $key => $value):?>

							<div class="<?php echo $col;?> col-btn">
								<button class="opt select <?php if($key==0) echo 'active'?>" id="<?php echo $value['id']?>"><?php echo $value['name']?></button>
							</div>

						<?php endforeach;?>				
			
					</div>

					<div class="row">

						<?php foreach($text[$view] as $key=>$value):?>		

							<div class="select-group <?php if($key!=0) echo 'hide'?>" id="select-<?php echo $value['id']?>">					
								
								<select class="opt-select" data-id="<?php echo $value['id']?>">
									
									<!--=== select group porte ===-->
									<?php if($value['id']=='prt'):?>
										<optgroup label="Porte">
									<?php endif;?>

									<!-- opções! -->
									<?php foreach($select[$value['id']] as $option):?>
										<option value="<?php echo $option['value']?>"><?php echo $option['name']?></option>
									<?php endforeach;?>		

									<!--=== select group atuação ===-->
									<?php if($value['id']=='prt'):?>
										
										</optgroup>

										<optgroup label="Atuação">
											
										<?php foreach($select['atc'] as $option):?>
									
											<option value="atc-<?php echo $option['value']?>"><?php echo $option['name']?></option>

										<?php endforeach;?>		

										</optgroup>	
									<?php endif;?>

								</select>	

								<p class="text-justify"><?php echo $json_text[$value['id']]?><br/><br/></p>

							</div>	

						<?php endforeach;?>							
					</div>

					<div class="row">
						<div class="col-md-12 opt-title text-center">DOWNLOAD</div>
						<div class="col-xs-4 col-btn"><button class="opt">PDF</button></div>
						<div class="col-xs-4 col-btn"><button class="opt">CSV</button></div>
						<div class="col-xs-4 col-btn"><button class="opt">IMG</button></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</article>