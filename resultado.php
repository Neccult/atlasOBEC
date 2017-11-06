<article class="results-article fadeInPage">
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
                        <br>
                        <br>
                        <div class="text text-justify" id="desc-var"><?php echo $text['desc_var'];?></div>

					</div>				
				</div>
				
				<!-- gráfico -->
				<div class="col-md-7 col-xs-12">
                    <?php
                        foreach($text['inativos'][$view] as $filter){
                            $_GET[$filter]=0;
                        }
                        if($view!='treemap_scc' && (($cad!=5 && $cad!=1 && $cad!=8 && $cad!=0) && $atc==1)){
                            $_GET['atc']=0;
                        }
                    ?>
                    <div id="title-view">
                        Variável:
                        <select class="opt-select" data-id="var">
                        <?php
                            foreach ($json_text['var'][0] as $variavel) {
                                echo "<option value='".$variavel['id']."'>".$variavel['title'];
                            }
                        ?>
                        </select>
                        <br>
                        <div><?php if(isset($text[$view])) foreach($text[$view] as $key => $value):?>
                            <div id="option-title-view">
                                <?= $value['name'] ?>:
                                <select class="opt-select" data-id="<?php echo $value['id']?>">

                                    <!--=== select group porte ===-->
                                    <?php if($value['id']=='prt'):?>
                                    <optgroup label="Porte">
                                        <?php endif;?>
                                        <!--=== select group Setor ===-->
                                        <?php if($eixo == "mercado" && $value['id']=='cad' && ($var < 8 || $var > 11)):?>
                                        <optgroup label="Setor">
                                            <?php endif;?>

                                            <!-- opções! -->
                                            <?php foreach($select[$value['id']] as $option):?>
                                                <?php if($eixo !="politicas" && $option['name'] != "Outros") { ?>
                                                    <option value="<?php echo $option['value']?>"><?php echo $option['name']?></option>
                                                <?php } else if($eixo == "politicas") { ?>
                                                    <option value="<?php echo $option['value']?>"><?php echo $option['name']?></option>
                                                <?php } ?>
                                            <?php endforeach;?>

                                            <!--=== select group Setor ===-->
                                            <?php if($eixo == "mercado" && $value['id']=='cad' && ($var < 8 || $var > 11)):?>
                                        </optgroup>

                                        <optgroup label="Ocupação">

                                            <?php foreach($select['ocp'] as $option):?>

                                                <option value="ocp-<?php echo $option['value']?>"><?php echo $option['name']?></option>

                                            <?php endforeach;?>

                                        </optgroup>
                                    <?php endif;?>
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
                            </div>

                        <?php endforeach;?>
                        </div>
                    </div>
					<div class="container-chart">
						<div class="content">
							<div class="chart">
								<!-- controla filtros disponíveis -->
								<?php
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
					<span class="contexto">
						<div class="row">

							<?php
								if(isset($text[$view])) $buttons = sizeof($text[$view]);

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
							<?php if(isset($text[$view])) foreach($text[$view] as $key => $value):?>

								<div class="<?php echo $col;?> col-btn">
									<button class="opt select <?php if($key==0) echo 'active'?>" id="<?php echo $value['id']?>"><?php echo $value['name']?></button>
								</div>

							<?php endforeach;?>

						</div>

						<div class="row">

							<?php if(isset($text[$view])) foreach($text[$view] as $key=>$value):?>

								<div class="select-group <?php if($key!=0) echo 'hide'?>" id="select-<?php echo $value['id']?>">

									<select class="opt-select" data-id="<?php echo $value['id']?>">

										<!--=== select group porte ===-->
										<?php if($value['id']=='prt'):?>
											<optgroup label="Porte">
										<?php endif;?>
                                        <!--=== select group Setor ===-->
                                        <?php if($eixo == "mercado" && $value['id']=='cad' && ($var < 8 || $var > 11)):?>
                                                <optgroup label="Setor">
										<?php endif;?>

										<!-- opções! -->
										<?php foreach($select[$value['id']] as $option):?>
                                            <?php if($eixo !="politicas" && $option['name'] != "Outros") { ?>
											    <option value="<?php echo $option['value']?>"><?php echo $option['name']?></option>
                                            <?php } else if($eixo == "politicas") { ?>
                                                <option value="<?php echo $option['value']?>"><?php echo $option['name']?></option>
                                            <?php } ?>
										<?php endforeach;?>

                                        <!--=== select group Setor ===-->
                                        <?php if($eixo == "mercado" && $value['id']=='cad' && ($var < 8 || $var > 11)):?>
                                                    </optgroup>

                                                    <optgroup label="Ocupação">

                                                    <?php foreach($select['ocp'] as $option):?>

                                                        <option value="ocp-<?php echo $option['value']?>"><?php echo $option['name']?></option>

                                                    <?php endforeach;?>

                                                    </optgroup>
                                            <?php endif;?>
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
					
					</span>
					<span class="contexto">

						<div class="row contexto">
							<div class="col-md-12 opt-title text-center">DOWNLOAD</div>
							<div class="col-xs-4 col-btn"><button class="opt select" id="pdf">PDF</button></div>
							<div class="col-xs-4 col-btn"><button class="opt select" id="csv">CSV</button></div>
							<div class="col-xs-4 col-btn"><button class="opt select" id="img">IMG</button></div>
						</div>

						<div class="row">
							
							<?php

								/* cria links download */

								$basicUrl = 'http://'.$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']);
								$downloadUrl = $basicUrl.'/download.php?var='.$var.'&view='.$view.'&uf='.$uf.'&prt='.$prt.'&sex='.$sex.'&pfj='.$pfj.'&mod='.$mod.'&prv='.$prv.'&frm='.$frm.'&esc='.$esc.'&cor='.$cor.'&fax='.$fax.'&slc='.$slc.'&snd='.$snd.'&ocp='.$ocp.'&mec='.$mec.'&atc='.$atc.'&typ='.$typ.'&prc='.$prc.'&cad='.$cad.'&ano='.$ano.'&eixo='.$eixo;

								/* csv */
								$csvUrl = $basicUrl.'/data/csv/ATLAS_EixoI_V_'.$var.'.csv'

							?>
							
							<div class="select-group hide" id="select-pdf">					
								<input type="text" onClick="this.select();" class="input-control url-input" value="<?php echo $downloadUrl.'&type=pdf#'.$eixo?>" readonly/><button class="button-control-down"></button>
							</div>
							<div class="select-group hide" id="select-csv">					
								<input type="text" onClick="this.select();" class="input-control url-input" value="<?php echo $csvUrl?>" readonly/><button class="button-control-down"></button>
							</div>
							<div class="select-group hide" id="select-img">					
								<input type="text" onClick="this.select();" class="input-control url-input" value="<?php echo $downloadUrl.'&type=png#'.$eixo?>" readonly/><button class="button-control-down"></button>
							</div>
							
						</div>
					</span>

					<div class="row">

						<br/><br/>
						<p class="text-center">
							<a href="#menuSection" class="scroll-link"><img src="images/arrowUp.png" alt="Voltar ao menu"/></a>
						</p>

					</div>

				</div>
			</div>
		</div>
	</div>
</article>