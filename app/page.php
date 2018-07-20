<!DOCTYPE html>
<html style="overflow: hidden">
<head>
    <?php include 'head.php';?>
</head>
<body>


<div class="section " id="section1">
    <?php
    /* GETS! */
    $uf         =   isset($_GET["uf"])    ?   $_GET["uf"]   :   0;	   /*== uf ==*/
    $chg         =   isset($_GET["chg"])    ?   $_GET["chg"]   :   0;	   /*== VIEW ==*/
    $ano        =   isset($_GET["ano"])   ?   $_GET["ano"]  :   2014;	   /*== ano ==*/
    $cad        =   isset($_GET["cad"])   ?   $_GET["cad"]  :   0;	   /*== ocupacao ==*/
    $var        =   isset($_GET["var"])   ?   $_GET["var"]  :   "";	   /*== variavel ==*/
    $ocp        =   isset($_GET["ocp"])   ?   $_GET["ocp"]  :   0;	   /*== ocupacao ==*/
    $eixo       =   isset($_GET["eixo"])  ?   $_GET["eixo"] :   "empreendimento";	   /*== eixo ==*/
    $slc        =   isset($_GET["slc"])   ?   $_GET["slc"]  :   0;	   /*== Visualização ==*/
    $deg        =   isset($_GET["deg"])   ?   $_GET["deg"]  :   0;	   /*== Desagregação ==*/
    $mec        =   isset($_GET["mec"])   ?   $_GET["mec"]  :   0;	   /*== Mecanismo ==*/
    $mod        =   isset($_GET["mod"])   ?   $_GET["mod"]  :   0;	   /*== Modalidade ==*/
    $deg        =   isset($_GET["deg"])   ?   $_GET["deg"]  :   0;	   /*== Desagregação ==*/
    $subdeg     =   isset($_GET["subdeg"])   ?   $_GET["subdeg"]  :   0;	   /*== Subesagregação ==*/
    $mod        =   isset($_GET["mod"])   ?   $_GET["mod"]  :   0;	   /*== Modalidade ==*/
    $pfj        =   isset($_GET["pfj"])   ?   $_GET["pfj"]  :   0;	   /*== Tipo de pessoa ==*/
    $uos        =   isset($_GET["uos"])   ?   $_GET["uos"]  :   0;	   /*== UF ou Setor ==*/
    $prc        =   isset($_GET["prc"])   ?   $_GET["prc"]  :   0;	   /*== Parceiro ==*/
    $typ        =   isset($_GET["typ"])   ?   $_GET["typ"]  :   1;	   /*== Tipo de atividade ==*/
    ?>

    <?php if(isset($_GET["var"])):?>

        <?php
        /* informações JSON */
        $json = file_get_contents('data/pt-br.json');
        $json_text = json_decode($json, true);
        ?>

        <!-- se existem informações desta variável -->
        <section id="resultado">
            <iframe id="resultado_view" src="resultado.php" style="border: none; width: 100%; height: 100%; "></iframe>
        </section>

    <?php endif;?>

</div>
<!---/* url atual para o js */-->
<script type="text/javascript">
    var url = {
        var:"<?php echo $var; ?>",
        cad:"<?php echo $cad; ?>",
        ocp:"<?php echo $ocp; ?>",
        ano:"<?php echo $ano; ?>",
        uos:"<?php echo $uos; ?>",
        uf:"<?php echo $uf; ?>",
        deg:"<?php echo $deg; ?>"
    };

    <?php if ($eixo == "empreendimentos") {?>
    url['chg'] = "<?php echo $chg; ?>";
    <?php } ?>

    <?php if ($eixo == "mercado") {?>
    url['slc'] = "<?php echo $slc; ?>";
    url['deg'] = "<?php echo $deg; ?>";
    url['subdeg'] = "<?php echo $subdeg; ?>";

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
    var pageTitle = "<?php if(isset($text)) echo strip_tags($text['title'])?>";
</script>

<script src="js/d3/d3.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript">

    /// MENU MOBILE!

    function hamburguer_click() {
        var iframe = document.getElementById('resultado_view');
        var innerDoc = (iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;
        if($(innerDoc).find("#mySidebar").attr("aberto") == 1){
            w3_close();
        }
        else{
            w3_open();
        }
    }

    $("#view-boxes").on('click', function(){
        var iframe = document.getElementById('resultado_view');
        var innerDoc = (iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;
        if($(innerDoc).find("#mySidebar").attr("aberto", 1)){
            w3_close();
        }
    });

    function w3_open() {
        var iframe = document.getElementById('resultado_view');
        var innerDoc = (iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;
        $(innerDoc).find("#mySidebar").css("display", "block");
        $(innerDoc).find("#mySidebar").css("top", window.pageYOffset+49);
        $(innerDoc).find("#mySidebar").attr("aberto", 1);
    }
    function w3_close() {
        var iframe = document.getElementById('resultado_view');
        var innerDoc = (iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;
        $(innerDoc).find("#mySidebar").css("display", "none");
        $(innerDoc).find("#mySidebar").attr("aberto", 0);
    }
</script>

</body>
</html>
