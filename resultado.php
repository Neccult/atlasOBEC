<head>
    <?php include 'head.php';?>
</head>
<!--=== resultados -> gráfico! ===-->
<?php if(isset($_GET["var"])):?>

<?php
/* GETS! */
$uf     =   isset($_GET["uf"])    ?   $_GET["uf"]   :   0;	   /*== uf ==*/
$ano    =   isset($_GET["ano"])   ?   $_GET["ano"]  :   2014;	   /*== ano ==*/
$prt    =   isset($_GET["prt"])   ?   $_GET["prt"]  :   0;	   /*== porte ==*/
$atc    =   isset($_GET["atc"])   ?   $_GET["atc"]  :   0;	   /*== atuacao ==*/
$cad    =   isset($_GET["cad"])   ?   $_GET["cad"]  :   0;	   /*== ocupacao ==*/
$var    =   isset($_GET["var"])   ?   $_GET["var"]  :   0;	   /*== variavel ==*/
$ocp    =   isset($_GET["ocp"])   ?   $_GET["ocp"]  :   0;	   /*== ocupacao ==*/
$view   =   isset($_GET["view"])  ?   $_GET["view"] :   "mapa";	   /*== visualizacao ==*/
$eixo   =   isset($_GET["eixo"])  ?   $_GET["eixo"] :   "empreendimento";	   /*== eixo ==*/
$sex    =   isset($_GET["sex"])   ?   $_GET["sex"]  :   0;	   /*== sexo ==*/
$fax    =   isset($_GET["fax"])   ?   $_GET["fax"]  :   0;	   /*== faixa etaria ==*/
$esc    =   isset($_GET["esc"])   ?   $_GET["esc"]  :   0;	   /*== escolaridade ==*/
$cor    =   isset($_GET["cor"])   ?   $_GET["cor"]  :   0;	   /*== cor e raça ==*/
$frm    =   isset($_GET["frm"])   ?   $_GET["frm"]  :   0;	   /*== formalidade ==*/
$prv    =   isset($_GET["prv"])   ?   $_GET["prv"]  :   0;	   /*== previdencia ==*/
$snd    =   isset($_GET["snd"])   ?   $_GET["snd"]  :   0;	   /*== sindical ==*/
$slc    =   isset($_GET["slc"])   ?   $_GET["slc"]  :   0;	   /*== Visualização ==*/
$mec    =   isset($_GET["mec"])   ?   $_GET["mec"]  :   0;	   /*== Mecanismo ==*/
$mod    =   isset($_GET["mod"])   ?   $_GET["mod"]  :   0;	   /*== Modalidade ==*/
$pfj    =   isset($_GET["pfj"])   ?   $_GET["pfj"]  :   0;	   /*== Tipo de pessoa ==*/
$uos    =   isset($_GET["uos"])   ?   $_GET["uos"]  :   0;	   /*== UF ou Setor ==*/
$prc    =   isset($_GET["prc"])   ?   $_GET["prc"]  :   0;	   /*== Parceiro ==*/
$typ    =   isset($_GET["typ"])   ?   $_GET["typ"]  :   0;	   /*== Tipo de atividade ==*/

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
-
$descView = $json_text[$view];			   /*== descrição da visualização ==*/
?>
<?php endif; ?>
<div id="menuvariaveis"></div>
<article class="results-article fadeInPage">
	<div class="results-content">
		<div class="container">
            <!--==== jquery load menu ===-->
			<div class="row">

				<div class="col-md-3 col-xs-12">
					<div class="desc-chart text-center">

						<!--=== título variável ===-->
						<div class="title"><?php echo $text['title'];?></div>
						<div class="separator white"></div>
					
						<!-- logo atlas -->
                        <div class="text text-justify" id="desc-var">
                            <?php
                                if($view === "mapa") {
                                    echo $text['desc_var_mapa'];
                                }
                                if($view === "treemap_scc") {
                                    echo $text['desc_var_treemap_scc'];
                                }
                                if($view === "treemap_region") {
                                    echo $text['desc_var_treemap_region'];
                                }
                                if($view === "barras") {
                                    echo $text['desc_var_barras'];
                                }
                            ?>
                        </div>

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
                    <div id="title-view">
                        <span  data-desc="<?= $descView ?>" class="opt active">Variável:</span>
                        <select class="opt-select" data-id="var">
                            <?php
                            foreach ($json_text['var'][0] as $variavel) {
                                echo "<option value='".$variavel['id']."'>".$variavel['title'];
                            }
                            ?>
                        </select>
                        <br>
                        <div><?php if(isset($text[$view])) foreach($text[$view] as $key => $value):?>
                                <?php if($value['name'] !== "Atuação"): ?>
                                    <div id="option-title-view" <?php if($value['name'] === "Porte") echo "class='select-prt'"; ?>>
                                    <span  data-desc="<?= $descView ?>" class="opt view active"><?= $value['name'] ?>:</span>
                                    <select class="opt-select" data-id="<?php echo $value['id']?>">

                                        <!--=== select group porte ===-->
                                        <?php if($value['id']=='prt'):?>
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

                                    </select>
                                </div>

                                <?php endif;?>
                            <?php endforeach;?>
                        </div>
                    </div>
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
                                <button data-desc="<?= $descView ?>" class="opt view <?php if($value['id']==$view) echo 'active';?>" id="<?php echo $value['id'];?>"><?php echo $value['name'];?></button>
                            </div>

                        <?php endforeach;?>

                    </div>

                    <br>
                    <div class="row">

                        <!--=== descrição do tipo de gráfico atual ===-->
                        <p id="desc-item" class="text-justify"><br/><br/></p>

                    </div>
					<span class="contexto">

						<div class="row contexto">
							<div class="col-md-12 opt-title text-center">DOWNLOAD</div>
							<div class="col-xs-4 col-btn"><button class="opt select" id="pdf">PDF</button></div>
							<div class="col-xs-4 col-btn"><button class="opt select" id="csv">ODS</button></div>
							<div class="col-xs-4 col-btn"><button class="opt select" id="img">IMG</button></div>
						</div>

						<div class="row">

							<?php

								/* cria links download */

								$basicUrl = 'http://'.$_SERVER['HTTP_HOST'].dirname($_SERVER['PHP_SELF']);
								$downloadUrl = $basicUrl.'/download.php?var='.$var.'&view='.$view.'&uf='.$uf.'&prt='.$prt.'&sex='.$sex.'&pfj='.$pfj.'&mod='.$mod.'&prv='.$prv.'&frm='.$frm.'&esc='.$esc.'&cor='.$cor.'&fax='.$fax.'&slc='.$slc.'&snd='.$snd.'&ocp='.$ocp.'&mec='.$mec.'&atc='.$atc.'&typ='.$typ.'&prc='.$prc.'&cad='.$cad.'&ano='.$ano.'&eixo='.$eixo;

								/* csv */
								switch($var) {
                                    case 1:
                                        $name_url = "total_empresas";
                                        break;
                                    case 2:
                                        $name_url = "peso_empresas";
                                        break;
                                    case 3:
                                        $name_url = "natalidade_e_mortalidade";
                                        break;
                                    case 4:
                                        $name_url = "receita_total";
                                        break;
                                    case 5:
                                        $name_url = "receita_liquida";
                                        break;
                                    case 6:
                                        $name_url = "custo";
                                        break;
                                    case 7:
                                        $name_url = "lucro";
                                        break;
                                    case 8:
                                        $name_url = "valor_adicionado";
                                        break;
                                    case 9:
                                        $name_url = "va_pib";
                                        break;
                                    case 10:
                                        $name_url = "ihh_empresas";
                                        break;
                                    case 11:
                                        $name_url = "ihh_valor_adicionado";
                                        break;
                                    case 12:
                                        $name_url = "C4_empresas";
                                        break;
                                    case 13:
                                        $name_url = "C4_valor_adicionado";
                                        break;
                                    default:
                                        $name_url = "total_empresas";
                                }
								$csvUrl = $basicUrl.'/data/csv/'.$name_url.'.ods';

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
<!---/* url atual para o js */-->
<script type="text/javascript">
    var url = {
        view:"<?php echo $view; ?>",
        var:"<?php echo $var; ?>",
        prt:"<?php echo $prt; ?>",
        atc:"<?php echo $atc; ?>",
        cad:"<?php echo $cad; ?>",
        ocp:"<?php echo $ocp; ?>",
        ano:"<?php echo $ano; ?>",
        uos:"<?php echo $uos; ?>",
        uf:"<?php echo $uf; ?>"
    };
    <?php if ($eixo == "mercado" && $view != "mapa") {?>
    url['sex'] = "<?php echo $sex; ?>";
    url['fax'] = "<?php echo $fax; ?>";
    url['esc'] = "<?php echo $esc; ?>";
    url['cor'] = "<?php echo $cor; ?>";
    url['frm'] = "<?php echo $frm; ?>";
    url['prv'] = "<?php echo $prv; ?>";
    url['snd'] = "<?php echo $snd; ?>";
    <?php } ?>

    <?php if ($eixo == "mercado" && $view == "treemap_scc") {?>
    url['slc'] = "<?php echo $slc; ?>";
    <?php } ?>

    <?php if ($eixo == "politicas") {?>
    url['mec'] = "<?php echo $mec; ?>";
    url['mod'] = "<?php echo $mod; ?>";
    url['pfj'] = "<?php echo $pfj; ?>";
    url['uos'] = "<?php echo $uos; ?>";
    <?php } ?>

    <?php if ($eixo == "comercio") {?>
    url['typ'] = "<?php echo $typ; ?>";
    url['prc'] = "<?php echo $prc; ?>";
    <?php } ?>
    console.log(url);
    var pageTitle = "<?php echo strip_tags($text['title'])?>";
</script>
<script type="text/javascript" defer="defer" src="//barra.brasil.gov.br/barra.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/contraste.js"></script>
<div id="loading">
</div>
<script>
    $(document).ready(function() {
        setTimeout(function() {
            $('#loading').fadeToggle('fast');
        }, 200);
    });
</script>