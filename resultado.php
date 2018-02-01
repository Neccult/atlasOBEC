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
$ocp    =   isset($_GET["ocp"])   ?   $_GET["ocp"]  :   1;	   /*== ocupacao ==*/
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
$deg    =   isset($_GET["deg"])   ?   $_GET["deg"]  :   0;	   /*== Desagregação ==*/
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
$eixo_num = 0;
switch($eixo) {
    case "empreendimento":
        $eixo_num = 0;
        break;
    case "mercado":
        $eixo_num = 1;
        break;
    case "politicas":
        $eixo_num = 2;
        break;
    case "comercio":
        $eixo_num = 3;
}

if(!isset($text[$view])) $view = $text['type'][0]['id'];
$descView = $json_text[$view];			   /*== descrição da visualização ==*/
?>
<?php endif; ?>
<article class="results-article fadeInPage">
	<div class="results-content">
		<div class="container">
            <div class="col-md-12 col-xs-12">
                <div class="desc-chart text-center">

                    <!--=== título variável ===-->
                    <div class="title"><?php echo $text['title'];?></div>

                    <!--<div class="text text-justify" id="desc-var">
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
                    </div>-->

                </div>
            </div>
            <!--==== jquery load menu ===-->
			<div class="row" id="view-boxes">
				<!-- gráfico -->
				<div class="col-md-4 col-xs-12" style="height: 452px">
                    <div class="view-title">
                        MAPA DO BRASIL
                        <i class="plus"></i>
                    </div>
                    <?php
                        if($view =='mapa' && $cad === 0) {
                            $prt = 0;
                        }
                        if($view == 'barras' && $eixo == "mercado" && $slc == 1 && $ocp == 0) {
                            $_GET['ocp']=1;
                        }
                        if($view == 'barras' && $eixo == "mercado" && $slc == 0) {
                            $_GET['ocp']=0;
                        }
                        //TODO VER O QUE ESSA FUNÇÃO FAZ DE DIFERENÇA
                        /*
                        foreach($text['inativos'][$view] as $filter){
                            $_GET[$filter]=0;
                        }*/
                        if($view!='treemap_scc' && (($cad!=5 && $cad!=1 && $cad!=8 && $cad!=0) && $atc==1)){
                            $_GET['atc']=0;
                        }
                        if($view == 'barras' || $view == 'treemap_scc') {
                            $view = 'mapa';
                        }
                    ?>
                    <?php if(isset($text['mapa'])) { ?>
                        <iframe id="view_box" src="<?php echo $view; ?>_box.php" style="border: none; width: 100%; height: 350px;" scrolling="no"></iframe>
                    <?php } else { ?>
                        <iframe id="view_box" src="<?php echo $view; ?>_box.php" style="display: none; border: none; width: 100%; height: 350px;" scrolling="no"></iframe>
                        Variável não possui este tipo de visualização
                    <?php } ?>
                    <!--=== views gráfico ===-->
                    <div class="content-btn-mapa">
                    <?php foreach($text['type'] as $key => $value):?>
                        <?php if($value['id'] === "mapa" || $value['id'] == "treemap_region"): ?>
                        <div class="btn-mapa">
                            <button data-desc="<?= $json_text[$value['id']] ?>" class="opt view <?php if($value['id']==$view) echo 'active';?>" id="<?php echo $value['id'];?>"><?php echo $value['name'];?></button>
                        </div>
                        <?php endif; ?>
                    <?php endforeach;?>
                    </div>
				</div>

                <!--=============== DADOS! ================-->

                <div class="col-md-4 col-xs-12" style="height: 246px;">
                    <div class="view-title">
                        DADOS
                    </div>
                    <div class="state-title">
                        BRASIL
                    </div>
                    <div class="data-values">
                        <div class="integer-value">
                            <span class="number"></span>
                            <span class="description-number"></span>
                        </div>
                        <div class="percent-value">
                            <span class="number"></span>
                            <span class="description-number"></span>
                        </div>
                    </div>
                </div>

                <!--============= opções gráfico! ============-->
				<div class="col-md-4 col-xs-12 opts-result" style="height: 246px;">
                    <div id="menu-view">
                        <div class="view-title">
                            MENU
                        </div>
                        <div id="title-view">
                            <?php
                            if($eixo == "mercado") {
                            ?>
                                <div style="margin-bottom: 10px;" class="col-xs-6 col-btn">
                                <button data-desc="<?= $json_text['deg_setor'] ?>" class="opt view <?php if($slc == 0) echo 'active';?>" id="setor">Setor</button>
                                </div>
                                <div style="margin-bottom: 10px;" class="col-xs-6 col-btn">
                                    <button data-desc="<?= $json_text['deg_ocupacao'] ?>" class="opt view <?php if($slc == 1) echo 'active';?>" id="ocupacao">Ocupação</button>
                                </div>
                                <br>
                                <span data-desc="<?= $json_text['var_desc'] ?>" class="opt active">Variável:</span>
                                <select class="opt-select" data-id="var">
                                    <?php
                                    foreach ($json_text['var'][$eixo_num] as $variavel) {
                                        echo "<option value='" . $variavel['id'] . "'>" . $variavel['title'];
                                    }
                                    ?>
                                </select>
                                <br>
                                <div id="option-title-view" <?php echo "class='select-ano'"; ?>>
                                    <span class="opt view active">Ano:</span>
                                    <select class="opt-select" data-id="ano">
                                        <?php
                                        foreach ($json_text['select']['ano'] as $option) {
                                            echo "<option value='" . $option['value'] . "'>" . $option['name'] . "</option>";
                                        }
                                        ?>
                                    </select>
                                </div>
                                <div>
                                    <?php
                                        if($slc == 0) {
                                    ?>
                                        <div id="option-title-view" <?php echo "class='select-deg'"; ?>>
                                            <span data-desc="<?= $json_text['deg'] ?>" class="opt view active">Desagregação:</span>
                                            <select class="opt-select" data-id="deg">
                                                <!-- opções! -->
                                                <?php foreach ($select['deg'] as $option): ?>
                                                    <?php if($option['value'] <= 4):?>
                                                        <option value="<?php echo $option['value'] ?>"><?php echo $option['name'] ?></option>
                                                    <?php endif; ?>
                                                <?php endforeach; ?>
                                            </select>
                                        </div>
                                    <?php
                                        } else {
                                    ?>
                                        <div id="option-title-view" <?php echo "class='select-deg'"; ?>>
                                            <span data-desc="<?= $json_text['deg'] ?>" class="opt view active">Desagregação:</span>
                                            <select class="opt-select" data-id="deg">
                                                <!-- opções! -->
                                                <?php foreach ($select['deg'] as $option): ?>
                                                    <?php if($option['value'] >= 3 || $option['value'] == 0):?>
                                                        <option value="<?php echo $option['value'] ?>"><?php echo $option['name'] ?></option>
                                                    <?php endif; ?>
                                                <?php endforeach; ?>
                                            </select>
                                        </div>
                                    <?php
                                        }
                                    ?>
                                </div>
                            <?php
                                } else {
                            ?>
                            <span data-desc="<?= $json_text['var_desc'] ?>" class="opt active">Variável:</span>
                            <select class="opt-select" data-id="var">
                                <?php
                                foreach ($json_text['var'][$eixo_num] as $variavel) {
                                    echo "<option value='" . $variavel['id'] . "'>" . $variavel['title'] . "</option>";
                                }
                                ?>
                            </select>
                            <br>
                            <div id="option-title-view" <?php echo "class='select-ano'"; ?>>
                                <span class="opt view active">Ano:</span>
                                <select class="opt-select" data-id="ano">
                                    <?php
                                        foreach ($json_text['select']['ano'] as $option) {
                                            echo "<option value='" . $option['value'] . "'>" . $option['name'] . "</option>";
                                        }
                                    ?>
                                </select>
                            </div>
                            <div id="option-title-view" <?php echo "class='select-deg'"; ?>>
                                <span data-desc="<?= $json_text['deg'] ?>" class="opt view active">Desagregação:</span>
                                <select class="opt-select" data-id="deg">
                                    <!-- opções! -->
                                    <?php foreach ($select['deg'] as $option): ?>
                                        <?php if($option['value'] == 0 || ($option['value'] >= 9 && $option['value'] <= 12)):?>
                                            <option value="<?php echo $option['value'] ?>"><?php echo $option['name'] ?></option>

                                        <?php endif; ?>
                                        <?php if($var >= 10): ?>
                                            <?php if($option['value'] == 13 || ($option['value'] == 14)):?>
                                                <option value="<?php echo $option['value'] ?>"><?php echo $option['name'] ?></option>
                                            <?php endif; ?>
                                        <?php endif; ?>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        <?php
                            }
                        ?>
                        </div>
                    </div>
                    <?php if($var < 10){ ?>
                        <div id="menu-view">
                            <div class="view-title">
                                SETORES
                            </div>
                            <div id="title-view-scc">
                                <span class="scc" data-id="0"><i style="display: inline-block; width: 10px; height: 10px; background-color: #071342"></i> Todos<br></span>
                                <span class="scc" data-id="1"><i style="display: inline-block; width: 10px; height: 10px; background-color: #87A8CA"></i> Arquitetura e Design<br></span>
                                <span class="scc" data-id="2"><i style="display: inline-block; width: 10px; height: 10px; background-color: #077DDD"></i> Artes Cênicas e Espetáculos<br></span>
                                <span class="scc" data-id="3"><i style="display: inline-block; width: 10px; height: 10px; background-color: #0F4B67"></i> Audiovisual<br></span>
                                <span class="scc" data-id="4"><i style="display: inline-block; width: 10px; height: 10px; background-color: #8178AF"></i> Cultura Digital<br></span>
                                <span class="scc" data-id="5"><i style="display: inline-block; width: 10px; height: 10px; background-color: #F6D5AB"></i> Editorial<br></span>
                                <span class="scc" data-id="6"><i style="display: inline-block; width: 10px; height: 10px; background-color: #EC8A91"></i> Educação e Criação em Artes<br></span>
                                <span class="scc" data-id="7"><i style="display: inline-block; width: 10px; height: 10px; background-color: #AD5468"></i> Entretenimento<br></span>
                                <span class="scc" data-id="8"><i style="display: inline-block; width: 10px; height: 10px; background-color: #6A474D"></i> Música<br></span>
                                <span class="scc" data-id="9"><i style="display: inline-block; width: 10px; height: 10px; background-color: #E96B00"></i> Patrimônio<br></span>
                                <span class="scc" data-id="10"><i style="display: inline-block; width: 10px; height: 10px; background-color: #B2510F"></i> Publicidade<br></span>
                            </div>
                        </div>
                    <?php } ?>
				</div>
                <div class="col-md-4 col-xs-12" style="height: 330px;">
                    <div class="view-title">
                        SÉRIE HISTÓRICA
                        <i class="plus"></i>
                    </div>
                    <?php if(isset($text['barras'])) { ?>
                        <iframe id="view_box_barras" src="barras_box.php" style="border: none; width: 100%; height: 275px;" scrolling="no"></iframe>
                    <?php } else { ?>
                        <iframe id="view_box_barras" src="barras_box.php" style="display: none; border: none; width: 100%; height: 275px;" scrolling="no"></iframe>
                        Variável não possui este tipo de visualização
                    <?php } ?>
                </div>
                <div class="col-md-4 col-xs-12" style="height: 330px;">
                    <div class="view-title">
                        <div style="float: left; width: 90%;">TREEMAP - SETORES CULTURAIS CRIATIVOS</div>
                        <i class="plus"></i>
                    </div>
                    <?php if(isset($text['treemap_scc'])) { ?>
                        <iframe id="view_box_scc" src="treemap_scc_box.php" style="border: none; width: 100%; height: 270px;" scrolling="no"></iframe>
                    <?php } else { ?>
                        <iframe id="view_box_scc" src="treemap_scc_box.php" style="display: none; border: none; width: 100%; height: 270px;" scrolling="no"></iframe>
                        Variável não possui este tipo de visualização
                    <?php } ?>
                </div>
                <div id="descricao" class="col-md-4 col-xs-12" style="height: 125px; overflow: auto; top: -140px;">
                    <div class="view-title">
                        DESCRIÇÃO
                    </div>
                    <div class="desc-var">
                        <?=$text['desc_var_mapa'];?>
                    </div>
                </div>
                <script>
                    function result_mobile() {
                        if($(window).width() < 1200) {
                            $("#descricao").css("top", "0px");
                            $(".col-md-4").css('height', 'auto');
                        }
                    }
                    setTimeout(result_mobile(), 500);
                </script>
                <span class="contexto">
                    <!--<div class="row contexto">
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

                    </div>-->
                </span>
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
        deg:"<?php echo $deg; ?>",
        uos:"<?php echo $uos; ?>",
        uf:"<?php echo $uf; ?>"
    };
    <?php if ($eixo == "mercado") {?>
    url['sex'] = "<?php echo $sex; ?>";
    url['fax'] = "<?php echo $fax; ?>";
    url['esc'] = "<?php echo $esc; ?>";
    url['cor'] = "<?php echo $cor; ?>";
    url['frm'] = "<?php echo $frm; ?>";
    url['prv'] = "<?php echo $prv; ?>";
    url['snd'] = "<?php echo $snd; ?>";
    <?php } ?>

    <?php if ($eixo == "mercado") {?>
    url['slc'] = "<?php echo $slc; ?>";
    url['deg'] = "<?php echo $deg; ?>";
    <?php } ?>

    <?php if ($eixo == "mercado") {?>
    url['slc'] = "<?php echo $slc; ?>";
    url['deg'] = "<?php echo $deg; ?>";
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
    var pageTitle = "<?php echo strip_tags($text['title'])?>";
</script>

<script src="https://d3js.org/d3.v4.min.js"></script>
<script type="text/javascript" defer="defer" src="//barra.brasil.gov.br/barra.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/functions.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/contraste.js"></script>
<script>
    $(document).ready(function() {

    });
</script>