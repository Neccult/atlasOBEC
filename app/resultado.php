<head>
    <?php include 'head.php';?>

</head>
<!--=== resultados -> gráfico! ===-->
<?php if(isset($_GET["var"])):?>

<?php
/* GETS! */
function getAnoDefault($eixo, $var){
    switch($eixo){
        case "empreendimentos":
            require_once('db/EixoUm.php');
            return EixoUm::getAnoDefault($var);
        case "mercado":
            require_once('db/EixoDois.php');
            return EixoDois::getAnoDefault($var);
        case "politicas":
            require_once('db/EixoTres.php');
            return EixoTres::getAnoDefault($var);
        case "comercio":
            require_once('db/EixoQuatro.php');
            return EixoQuatro::getAnoDefault($var);            
    }
}
$uf     =   isset($_GET["uf"])    ?   $_GET["uf"]   :   0;	   /*== uf ==*/
$prt    =   isset($_GET["prt"])   ?   $_GET["prt"]  :   0;	   /*== porte ==*/
$atc    =   isset($_GET["atc"])   ?   $_GET["atc"]  :   0;	   /*== atuacao ==*/
$cad    =   isset($_GET["cad"])   ?   $_GET["cad"]  :   0;	   /*== ocupacao ==*/
$var    =   isset($_GET["var"])   ?   $_GET["var"]  :   0;	   /*== variavel ==*/
$ocp    =   isset($_GET["ocp"])   ?   $_GET["ocp"]  :   1;	   /*== ocupacao ==*/
$view   =   isset($_GET["view"])  ?   $_GET["view"] :   "mapa";	   /*== visualizacao ==*/
$eixo   =   isset($_GET["eixo"])  ?   $_GET["eixo"] :   "empreendimentos";	   /*== eixo ==*/
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
$typ    =   isset($_GET["typ"])   ?   $_GET["typ"]  :   1;	   /*== Tipo de atividade ==*/
$ano    =   isset($_GET["ano"])   ?   $_GET["ano"]  :   getAnoDefault($eixo, $var);	   /*== ano ==*/
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

            <div id="menuvariaveis" ></div>



            <!--=== BREADCRUMBS ===-->

            <!--=== BREADCRUMBS ===-->

            <div class="bread-parent">

                <div class="bread-container">

                    <div class="bread-caixa" style="display: none">
                        <div class="opcao">
                            <span class="rotulo-bread opt view">Eixo</span>
                            <select class="bread-select-eixo bread-eixo" data-id="eixo">
                                <?php
                                foreach ($json_text['select']['eixo'] as $bread_eixo) {
                                    if($bread_eixo['value'] === $eixo){
                                        echo "<option value='". $bread_eixo['value'] ."' selected>" . $bread_eixo['name'] . "</option>";
                                    }
                                    else{
                                        echo "<option value='" . $bread_eixo['value'] . "'>" . $bread_eixo['name'] . "</option>";
                                    }
                                }
                                ?>
                            </select>
                        </div>
                        <div class="bread-separator">/</div>
                    </div>

                    <div class="bread-caixa">

                        <div class="opcao">
                            <span class="rotulo-bread opt view">Variável</span>
                            <select class="bread-select bread-select-var" data-id="var">
                                <?php
                                foreach ($json_text['var'][$eixo_num] as $variavel) {
                                    echo "<option value='" . $variavel['id'] . "'>" . $variavel['title'] . "</option>";
                                }
                                ?>
                            </select>
                        </div>
                    </div>

                    <?php if($eixo == 'comercio') {?>

                        <div class="bread-caixa">
                            <div class="bread-separator">/</div>

                            <div class="opcao">
                                <span class="rotulo-bread opt view active">Parceiro</span>

                                <select class="bread-select" id="bread-select-prc" data-id="prc">
                                    <?php
                                    foreach ($json_text['select']['prc'] as $option) {
                                        echo "<option value='" . $option['value'] . "'>" . $option['name'] . "</option>";
                                    }
                                    ?>
                                </select>

                            </div>
                        </div>

                    <?php } ?>

                    <div class="bread-caixa">
                        <div class="bread-separator">/</div>

                        <div class="opcao">
                            <span class="rotulo-bread opt view">UF</span>

                            <select class="bread-select bread-uf" data-id="uf">
                                <?php
                                foreach ($json_text['select']['uf'] as $bread_uf) {
                                    echo "<option value='" . $bread_uf['value'] . "'>" . $bread_uf['name'] . "</option>";
                                }
                                ?>
                            </select>

                        </div>
                    </div>

                    <div class="bread-caixa">
                        <div class="bread-separator">/</div>

                        <div class="opcao">
                            <span class="rotulo-bread opt view">Ano</span>

                            <select class="bread-select" data-id="ano">
                                <?php
                                foreach ($json_text['select']['ano'] as $option) {
                                    echo "<option value='" . $option['value'] . "'>" . $option['name'] . "</option>";
                                }
                                ?>
                            </select>

                        </div>
                    </div>

                    <div class="bread-caixa">
                        <div class="bread-separator">/</div>

                        <div class="opcao">
                            <span class="rotulo-bread opt view">Setor</span>

                            <select class="bread-select" id="bread-select-cad" data-id="cad">
                                <?php
                                foreach ($json_text['select']['cad'] as $bread_cad) {
                                    echo "<option value='" . $bread_cad['value'] . "'>" . $bread_cad['name'] . "</option>";
                                }
                                ?>
                            </select>

                        </div>
                    </div>

                    <?php if($eixo == 'empreendimentos'){?>

                        <div class="bread-caixa">
                            <div class="bread-separator">/</div>

                            <div class="opcao">
                                <span class="rotulo-bread opt view">Desagregação</span>
                                <select class="bread-select" id="bread-select-deg   " data-id="deg">
                                    <option value="0">Escolher</option>

                                    <?php foreach ($select['deg'] as $option): ?>

                                        <?php if($option['value'] >= 9 && $option['value'] <= 12):?>
                                            <option value="<?php echo $option['value'] ?>"><?php echo $option['name'] ?></option>
                                        <?php endif; ?>
                                    <?php endforeach; ?>
                                </select>

                            </div>
                        </div>

                    <?php } ?>

                    <?php if($eixo == 'mercado'){?>

                        <div class="bread-caixa">
                            <div class="bread-separator">/</div>

                            <div class="opcao">
                                <span class="rotulo-bread opt view">Desagregação</span>
                                <select class="bread-select" id="bread-select-deg" data-id="deg">
                                    <option value="0">Escolher</option>

                                    <?php foreach ($select['deg'] as $option): ?>
                                        <?php if($option['value'] >= 1 && $option['value'] <= 4):?>
                                            <optgroup value="<?php echo $option['value'] ?>" label="<?php echo $option['name'] ?>">
                                                <?php foreach ($option['desags'] as $key=>$desag): ?>
                                                    <option value="<?php echo $key+1 ?>"><?php echo $desag ?></option>
                                                <?php endforeach; ?>
                                            </optgroup>
                                        <?php endif; ?>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>


                    <?php } ?>

                    <?php if($eixo == 'politicas'){?>

                        <div class="bread-caixa">
                            <div class="bread-separator">/</div>

                            <div class="opcao">
                                <span class="rotulo-bread opt view ">Mecanismo</span>
                                <select class="bread-select" id="bread-select-mec" data-id="mec">
                                    <option value="0">Todos</option>

                                    <?php foreach ($select['mec'] as $option): ?>

                                        <?php if($option['value'] >= 1 && $option['value'] <= 2):?>
                                            <option value="<?php echo $option['value'] ?>"><?php echo $option['name'] ?></option>
                                        <?php endif; ?>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>

                        <div class="bread-caixa" style="display: none";>
                            <div class="bread-separator">/</div>

                            <div class="opcao">
                                <span class="rotulo-bread opt view active ">Modalidade</span>
                                <select class="bread-select" id="bread-select-mod" data-id="mod">
                                    <option value="0">Todos</option>

                                    <?php foreach ($select['mod'] as $option): ?>

                                        <?php if($option['value'] >= 1 && $option['value'] <= 2):?>
                                            <option value="<?php echo $option['value'] ?>"><?php echo $option['name'] ?></option>
                                        <?php endif; ?>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>

                        <div class="bread-caixa" style="display: none";>
                            <div class="bread-separator">/</div>

                            <div class="opcao">
                                <span class="rotulo-bread opt view active ">Pessoa</span>
                                <select class="bread-select" id="bread-select-mec" data-id="pfj">
                                    <option value="0">Todos</option>

                                    <?php foreach ($select['pfj'] as $option): ?>

                                        <?php if($option['value'] >= 1 && $option['value'] <= 2):?>
                                            <option value="<?php echo $option['value'] ?>"><?php echo $option['name'] ?></option>
                                        <?php endif; ?>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>

                    <?php } ?>

                    <?php if($eixo == 'comercio'){?>

                        <div class="bread-caixa">
                            <div class="bread-separator">/</div>

                            <div class="opcao">
                                <span class="rotulo-bread opt view ">Tipo</span>
                                <select class="bread-select" id="bread-select-typ" data-id="typ">

                                    <?php foreach ($select['typ'] as $option): ?>

                                        <?php if($option['value'] >= 1 && $option['value'] <= 4):?>
                                            <option value="<?php echo $option['value'] ?>"><?php echo $option['name'] ?></option>
                                        <?php endif; ?>
                                    <?php endforeach; ?>
                                </select>
                            </div>
                        </div>

                    <?php } ?>

                </div>

            </div>


            <div class="nome-var col-md-12 col-xs-12">
                <div class="desc-chart text-center">

                    <!--=== título variável ===-->
                    <div class="title" data-id="var-title"><?php echo $text['title'];?></div>

                </div>
            </div>

            <!--==== jquery load menu ===-->
            <div class="container-boxes">
                <div id="view-boxes">
                    <!-- MAPA -->
                    <div id='containerMapa' class="col-md-6 col-sm-12" style="height: 452px">
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
                        <iframe id="view_box" src="<?php if($view != "") echo $view; else echo "mapa"; ?>_box.php" style="border: none; width: 100%; height: 350px;" scrolling="no"></iframe>
                        <!--=== views gráfico ===-->
                        <div class="content-btn-mapa ">
                        <?php foreach($text['type'] as $key => $value):?>
                            <?php if($value['id'] === "mapa" || $value['id'] == "treemap_region"): ?>
                            <div class="btn-mapa col-xs-6">
                                <button data-desc="<?= $json_text[$value['id']] ?>" class="opt view <?php if($value['id']==$view) echo 'active';?>" id="<?php echo $value['id'];?>"><?php echo $value['name'];?></button>
                            </div>
                            <?php endif; ?>
                        <?php endforeach;?>
                        </div>
                    </div>
                    <!--=============== DADOS! ================-->
                    <div id='containerDados' class="col-md-6 col-s-12 iframe-dados" style="height: 330px;">
                        <div class="view-title">
                            DADOS
                        </div>

                        <div id="btn-opt" class="btn-opt" style=" margin-top: 10px; margin-bottom: 10px;">
                            <?php
                            if($eixo == "mercado") {
                                ?>
                                <div style="margin-bottom: 10px;" class="col-xs-6 col-btn">
                                    <button data-desc="<?= $json_text['deg_setor'] ?>" class="opt view <?php if($slc == 0) echo 'active';?>" id="setor">Setor</button>
                                </div>
                                <div style="margin-bottom: 10px;" class="col-xs-6 col-btn">
                                    <button data-desc="<?= $json_text['deg_ocupacao'] ?>" class="opt view <?php if($slc == 1) echo 'active';?>" id="ocupacao">Ocupação</button>
                                </div>
                            <?php } ?>
                            <?php
                            if($eixo == "politicas") {
                                ?>
                                <div style="margin-bottom: 10px; display: none" class="col-xs-6 col-btn">
                                    <button  class="opt view <?php if($mec == 0) echo 'active';?>" id="recebedora">Recebedor</button>
                                </div>
                                <div style="margin-bottom: 10px; display: none" class="col-xs-6 col-btn">
                                    <button  class="opt view <?php if($mec == 1) echo 'active';?>" id="trabalhador">Trabalhador</button>
                                </div>
                            <?php } ?>
                            <?php if($eixo == "comercio") { ?>
                                <div style="margin-bottom: 10px;" class="col-xs-6 col-btn">
                                    <button class="opt view active" id="bens">Bens</button>
                                </div>
                                <div style="margin-bottom: 10px;" class="col-xs-6 col-btn">
                                    <button class="opt view " id="servicos">Serviços</button>
                                </div>
                            <?php } ?>
                        </div>


                        <br>
                        <br>

                        <?php if($eixo != "comercio") { ?>
                            <div class="state-title" style="display: none">
                                BRASIL
                            </div>
                        <?php  }?>
                        <div class="cad-title" style="display:none">
                            TODOS SETORES
                        </div>
                        <div class="data-values" style="display:flex">
                            <div class="container-flex integer-flex">
                                <div class="integer-value" style="padding-left: 15px;">
                                    <span class="number"></span>
                                    <span class="description-number"></span>
                                </div>
                            </div>
                            <div class ="container-flex">
                                <div class="percent-value percent-flex">

                                    <div class="box-dado">
                                        <span class="number">100%</span>
                                        <span class="description-number" ></span>
                                    </div>

                                    <div class="box-dado" style="display:none">
                                        <span class="number">100%</span>
                                        <span class="description-number" ></span>
                                    </div>

                                    <div class="box-dado" style="display:none">
                                        <span class="number">100%</span>
                                        <span class="description-number" ></span>
                                    </div>
                                    <div class ="setor-value" style="display:none;">
                                        <span class="number"></span>
                                        <span class="description-number"></span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="value-info-title">

                        </div>
                        <div class="font-title">
                            FONTE(S): RAIS
                        </div>
                    </div>
                    <!--============= opções gráfico! ============-->
                    <div id='containerOpts' class="col-md-12 col-sm-12 opts-result" style="display: none; height: 330px; ">
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
                                    <div class="omitir">
                                        <span data-desc="<?= $json_text['var_desc'] ?>" class="opt active">Variável:</span>
                                        <select class="opt-select" data-id="var">
                                            <?php
                                            foreach ($json_text['var'][$eixo_num] as $variavel) {
                                                echo "<option value='" . $variavel['id'] . "'>" . $variavel['title'];
                                            }
                                            ?>
                                        </select>
                                    </div>
                                    <br>
                                    <div class="omitir">
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

                                <?php if($eixo == "comercio") { ?>
                                    <div style="margin-bottom: 10px;" class="col-xs-6 col-btn">
                                        <button class="opt view active" id="bens">Bens</button>
                                    </div>
                                    <div style="margin-bottom: 10px;" class="col-xs-6 col-btn">
                                        <button class="opt view " id="servicos">Serviços</button>
                                    </div>
                                <?php } ?>


                                <div class = "omitir" id="option-title-view "  <?php echo $json_text['var_desc'] ?>>
                                    <span class="opt view omitir">Variável:</span>
                                    <select class="opt-select" data-id="var">
                                        <?php
                                        foreach ($json_text['var'][$eixo_num] as $variavel) {
                                            echo "<option value='" . $variavel['id'] . "'>" . $variavel['title'] . "</option>";
                                        }
                                        ?>
                                    </select>
                                </div>


                                <div class = "omitir" id="option-title-view "  <?php echo "class='select-ano'"; ?>>
                                    <span class="opt view omitir">Ano:</span>
                                    <select class="opt-select" data-id="ano">
                                        <?php
                                            foreach ($json_text['select']['ano'] as $option) {
                                                echo "<option value='" . $option['value'] . "'>" . $option['name'] . "</option>";
                                            }
                                        ?>
                                    </select>
                                </div>

                                <?php if($eixo == 'politicas') {?>
                                    <div id="option-title-view" <?php echo "class='select-mec'"; ?>>
                                        <span class="opt view active">Mecanismo :</span>
                                        <select class="opt-select" data-id="mec">
                                            <?php
                                            foreach ($json_text['select']['mec'] as $option) {
                                                echo "<option value='" . $option['value'] . "'>" . $option['name'] . "</option>";
                                            }
                                            ?>
                                        </select>
                                    </div>

                                    <div id="option-title-view" <?php echo "class='select-mod' style='display: none'" ; ?>>
                                        <span class="opt view active">Modalidade :</span>
                                        <select class="opt-select" data-id="mod">
                                            <?php
                                            foreach ($json_text['select']['mod'] as $option) {
                                                echo "<option value='" . $option['value'] . "'>" . $option['name'] . "</option>";
                                            }
                                            ?>
                                        </select>
                                    </div>

                                    <div id="option-title-view" <?php echo "class='select-pfj' style='display: none'"; ?>>
                                        <span class="opt view active">Tipo de Pessoa :</span>
                                        <select class="opt-select" data-id="pfj">
                                            <?php
                                            foreach ($json_text['select']['pfj'] as $option) {
                                                echo "<option value='" . $option['value'] . "'>" . $option['name'] . "</option>";
                                            }
                                            ?>
                                        </select>
                                    </div>

                                <?php } ?>

                                <?php if($eixo == 'comercio') {?>
                                    <div id="option-title-viewss" <?php echo "class='select-typ'"; ?>>
                                        <span class="opt view active">Tipo :</span>
                                        <select class="opt-select" data-id="typ">
                                            <?php
                                            foreach ($json_text['select']['typ'] as $option) {
                                                if($option['value'] == "1"){
                                                    echo "<option value='". $option['value'] ."' selected>" . $option['name'] . "</option>";
                                                }
                                                else {
                                                    echo "<option value='" . $option['value'] . "'>" . $option['name'] . "</option>";
                                                }
                                            }
                                            ?>
                                        </select>
                                    </div>

                                    <div id="option-title-view" <?php echo "class='select-prc'" ; ?>>
                                        <span class="opt view active">Parceiro :</span>
                                        <select class="opt-select" data-id="prc">
                                            <?php
                                            foreach ($json_text['select']['prc'] as $option) {
                                                echo "<option value='" . $option['value'] . "'>" . $option['name'] . "</option>";
                                            }
                                            ?>
                                        </select>
                                    </div>


                                <?php } ?>

                                <?php if($eixo == 'empreendimentos') {?>

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
                                <?php } ?>



                                    <?php
                                }
                            ?>
                            </div>
                        </div>
                        <?php if($var < 10){ ?>
                            <div id="menu-view">
                                <div class="view-title" data-id="scc&ocp">
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
                    <!--=============== BARRAS! ================-->
                    <div id='containerBarra' class="col-md-6 col-sm-12" style="height: 330px;">
                        <div class="view-title">
                            SÉRIE HISTÓRICA [uf] [cad]
                            <i class="plus"></i>
                        </div>
                        <?php if ($eixo == "comercio") {?>
                            <iframe id="view_box_barras" src="barras_box.php" style="border: none; width: 65%; height: 90%; float: left;" scrolling="no"></iframe>
                            <div id="menu-view" style=" height: 90%; width: 30%; float: right;">
                                <div class="view-title-leg" data-id="scc&ocp">
                                </div>
                                <div id="title-view-leg-scc" style="">
                                    <span data-id="1"><i style="display: inline-block; width: 10px; height: 10px; background-color: rgb(0, 63, 51)"></i> Exportação<br></span>
                                    <span data-id="2"><i style="display: inline-block; width: 10px; height: 10px; background-color:  rgb(90, 138, 113)"></i> Importação<br></span>
                                </div>
                            </div>
                        <?php } else if ($eixo == "politicas"){?>
                            <iframe id="view_box_barras" src="barras_box.php" style="border: none; width: 100%; height: 275px;" scrolling="no"></iframe>

                            <div id="menu-view-donut" style=" height: 80%; padding-top: 5%; width: 30%; float: right; display: none;">
                                <div class="view-title-leg-donut" data-id="scc&ocp">
                                </div>
                                <div id="title-view-leg-scc-donut" style="">
                                </div>
                            </div>

                        <?php } else { ?>
                            <iframe id="view_box_barras" src="barras_box.php" style="border: none; width: 100%; height: 265px;" scrolling="no"></iframe>

                        <?php } ?>

                    </div>
                    <!--=============== DESCRICAO! ================-->
                    <div id='containerDesc' id="descricao" class="col-md-6 col-s-12" style="height: 210px; top: -225px; overflow: auto;">
                        <div class="view-title">
                            DESCRIÇÃO DA VARIÁVEL
                        </div>
                        <div class="desc-var">
                            <?=$text['desc_var_mapa'];?>
                        </div>
                    </div>
                    <!--=============== TREEMAP! ================-->
                    <div id='containerTree' class="col-md-12 col-sm-12"  style="height: 452px; top: -210px">
                        <div class="view-title">
                            <div style="float: left; width: 90%;">TREEMAP - SETORES CULTURAIS CRIATIVOS</div>
                            <i class="plus"></i>
                        </div>
                        <?php if ($eixo != "comercio") {?>
                            <iframe id="view_box_scc" src="treemap_scc_box.php" scrolling="no"></iframe>
                            <div id="menu-view" >
                                <div class="view-title-leg" data-id="scc&ocp">
                                    SETORES
                                </div>
                                <div id="title-view-leg-scc">
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
                                    <?php if($eixo != 'comercio') { ?>  <span class="scc" data-id="10"><i style="display: inline-block; width: 10px; height: 10px; background-color: #B2510F"></i> Publicidade<br></span>
                                    <?php } ?>
                                </div>
                            </div>
                        <?php } else {?>
                            <iframe id="view_box_scc" src="treemap_scc_box.php" style="border: none; width: 100%; height: 90%; float: left;" scrolling="no"></iframe>
                        <?php } ?>

                    </div>
                </div>
            </div>

            <div class="row">

                <script>
                    function result_mobile() {
                        if($(window).width() < 1200) {
                            $("#descricao").css("top", "0px");
                            $(".col-md-4").css('height', 'auto');
                        }
                        if($(window).width() < 850) {
                            $(".bread-parent").hide();
                        }
                    }
                    setTimeout(result_mobile(), 500);
                </script>
                <span class="col-md-4 col-xs-12 contexto" style="top:-220px"></span>

                <span id="containerDownload" class="col-md-4 col-xs-10 contexto" style="top:-220px">
                    <div class="row">
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
                                $name_url = "variacao_total_empresas";
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
    url['slc'] = "<?php echo $slc; ?>";
    <?php } ?>
    var pageTitle = "<?php echo strip_tags($text['title'])?>";


</script>

<script src="js/d3/d3.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/functions.js"></script>
<script type="text/javascript" src="js/descricoes.js"></script>
<script type="text/javascript" src="js/contraste.js"></script>
<script type="text/javascript" src="js/main.js"></script>

<script>
    $(document).ready(function() {
    });
</script>