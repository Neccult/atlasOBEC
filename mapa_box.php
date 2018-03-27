<head>
    <?php include 'head.php';?>

</head>

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

<div class="container-chart">
    <div class="content">
        <div class="chart">
            <!-- controla filtros disponíveis -->
            <?php
                include 'mapa.php';
            ?>
        </div>
    </div>
</div>
<!--<div id="loading"></div>-->
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
        deg:"<?php echo $deg; ?>",
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
    url['deg'] = "<?php echo $deg; ?>";
    <?php } ?>

    <?php if ($eixo == "mercado" && $view == "barras") {?>
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
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/contraste.js"></script>
