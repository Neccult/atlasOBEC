<head>
    <?php include 'head.php';?>

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="css/ie10-viewport-bug-workaround.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="js/ie-emulation-modes-warning.js"></script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->



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

    foreach($json_text['var'][3] as $key=>$vrbs){
        if($vrbs['id'] == $_GET["var"]){
            $vrb = $key;
            break;
        }
    }

    if($eixo == "empreendimentos") {
        $text = $json_text['var'][0][$key]; /*== informações da variável ==*/
    }
    else if($eixo == "mercado") {
        $text = $json_text['var'][1][$key]; /*== informações da variável ==*/
    }
    else if($eixo == "politicas") {
        $text = $json_text['var'][2][$key]; /*== informações da variável ==*/
    }
    else if($eixo == "comercio") {
        foreach($json_text['var'][3] as $key=>$vrbs){
            if($vrbs['id'] == $_GET["var"]){
                $vrb = $key;
                break;
            }
        }
        $text = $json_text['var'][3][$key]; /*== informações da variável ==*/
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
            <?php

            if (!empty($_GET["var"]))
                $var = $_GET["var"];
            else
                $var = 1;

            if (!empty($_GET["uf"]))
                $uf = $_GET["uf"];
            else
                $uf = 0;

            if (!empty($_GET["atc"]))
                $atc = $_GET["atc"];
            else
                $atc = 0;

            if (!empty($_GET["cad"]))
                $cad = $_GET["cad"];
            else
                $cad = 0;

            if (!empty($_GET["prt"]))
                $prt = $_GET["prt"];
            else
                $prt = 0;

            if (!empty($_GET["ocp"]))
                $ocp = $_GET["ocp"];
            else
                $ocp = 0;

            if (!empty($_GET["sex"]))
                $sex = $_GET["sex"];
            else
                $sex = 0;

            if (!empty($_GET["fax"]))
                $fax = $_GET["fax"];
            else
                $fax = 0;

            if (!empty($_GET["esc"]))
                $esc = $_GET["esc"];
            else
                $esc = 0;

            if (!empty($_GET["cor"]))
                $cor = $_GET["cor"];
            else
                $cor = 0;

            if (!empty($_GET["frm"]))
                $frm = $_GET["frm"];
            else
                $frm = 0;

            if (!empty($_GET["deg"]))
                $deg = $_GET["deg"];
            else
                $deg = 0;

            if (!empty($_GET["slc"]))
                $slc = $_GET["slc"];
            else
                $slc = 0;

            if (!empty($_GET["prv"]))
                $prv = $_GET["prv"];
            else
                $prv = 0;

            if (!empty($_GET["snd"]))
                $snd = $_GET["snd"];
            else
                $snd = 0;

            if (!empty($_GET["mec"]))
                $mec = $_GET["mec"];
            else
                $mec = 0;

            if (!empty($_GET["mod"]))
                $mod = $_GET["mod"];
            else
                $mod = 0;

            if (!empty($_GET["pfj"]))
                $pfj = $_GET["pfj"];
            else
                $pfj = 0;

            if (!empty($_GET["uos"]))
                $uos = $_GET["uos"];
            else
                $uos = 0;

            if (!empty($_GET["typ"]))
                $typ = $_GET["typ"];
            else
                $typ = 0;

            if (!empty($_GET["prc"]))
                $prc = $_GET["prc"];
            else
                $prc = 0;

            if (!empty($_GET["ano"]))
                $ano = $_GET["ano"];
            else
                $ano = NULL;

            if (!empty($_GET["mundo"]))
                $mundo = $_GET["mundo"];
            else
                $mundo = 0;
            ?>

            <!-- D3 JS v4 -->
            <?php
            if($eixo == "mercado" && $deg != 0  && $var != 4 && $var != 5 && $var != 6) {
                echo '<script src="https://d3js.org/d3.v3.min.js"></script>';
                ?>
                <style type="text/css">
                    svg {
                        font: 10px sans-serif !important;
                        shape-rendering: crispEdges !important;
                    }

                    .axis path,
                    .axis line {
                        fill: none !important;
                        stroke: #000 !important;
                    }

                    .x path.domain {
                        stroke: none !important;
                    }

                    .y path.domain {
                        stroke: #ddd !important;
                    }

                    .y .tick line {
                        stroke: #ddd !important;
                    }
                </style>
                <?php
            }
            else {
                echo '<script src="js/d3/d3.min.js" charset="utf-8"></script>';
            }
            ?>

            <!-- TopoJSON -->
            <script src="https://d3js.org/topojson.v2.min.js"></script>

            <script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/d3-legend/2.21.0/d3-legend.min.js"></script>

            <!-- D3 QUEUE -->
            <script src="https://d3js.org/d3-queue.v3.min.js"></script>

            <!-- Utilidades -->
            <script src="js/functions.js"></script>
            <script src="js/descricoes.js"></script>

            <div id="corpo"></div>

            <script type="text/javascript">
                //variaveis configuracao query
                var vrv = <?php echo $var; ?>;
                var atc = <?php echo $atc; ?>;
                var cad = <?php echo $cad; ?>;
                var prt = <?php echo $prt; ?>;
                var ocp = <?php echo $ocp; ?>;
                var sex = <?php echo $sex; ?>;
                var fax = <?php echo $fax; ?>;
                var esc = <?php echo $esc; ?>;
                var cor = <?php echo $cor; ?>;
                var frm = <?php echo $frm; ?>;
                var prv = <?php echo $prv; ?>;
                var snd = <?php echo $snd; ?>;
                var mec = <?php echo $mec; ?>;
                var mod = <?php echo $mod; ?>;
                var pfj = <?php echo $pfj; ?>;
                var uos = <?php echo $uos; ?>;
                var typ = <?php echo $typ; ?>;
                var prc = <?php echo $prc; ?>;
                var deg = <?php echo $deg; ?>;
                var slc = <?php echo $slc; ?>;
                var ano = <?php if($ano == NULL) echo "null"; else echo $ano; ?>;
                var uf = <?php echo $uf; ?>;
                var mundo = <?php echo $mundo; ?>;
                var eixo;
                switch(window.location.hash.substring(1)) {
                    case "empreendimentos":
                        eixo = 0;
                        break;
                    case "mercado":
                        eixo = 1;
                        break;
                    case "politicas":
                        eixo = 2;
                        break;
                    case "comercio":
                        eixo = 3;
                        break;
                    default:
                        eixo = 0;
                }
            </script>

            <script src="js/barras.js"></script>
        </div>
    </div>
</div>
<div id="loading"></div>
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
    url['uos'] = "<?php echo $uos; ?>";
    url['deg'] = "<?php echo $deg; ?>";
    <?php } ?>

    <?php if ($eixo == "mercado" && $view == "barras") {?>
    url['slc'] = "<?php echo $slc; ?>";
    url['uos'] = "<?php echo $uos; ?>";
    url['deg'] = "<?php echo $deg; ?>";
    <?php } ?>

    <?php if ($eixo == "mercado" && $view == "mapa") {?>
    url['slc'] = "<?php echo $slc; ?>";
    url['uos'] = "<?php echo $uos; ?>";
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
<script type="text/javascript" src="js/contraste.js"></script>
