<?php 
	
	if (!empty($_GET["var"]))
		$var = $_GET["var"];
	else
		$var = 1;

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

    if (!empty($_GET["esc"]))
        $esc = $_GET["esc"];
    else
        $esc = 0;

    if (!empty($_GET["mec"]))
        $mec = $_GET["mec"];
    else
        $mec = 0;

    if (!empty($_GET["uos"]))
        $uos = $_GET["uos"];
    else
        $uos = 0;

    if (!empty($_GET["mod"]))
        $mod = $_GET["mod"];
    else
        $mod = 0;

    if (!empty($_GET["pfj"]))
        $pfj = $_GET["pfj"];
    else
        $pfj = 0;

    if (!empty($_GET["typ"]))
        $typ = $_GET["typ"];
    else
        $typ = 0;
    
    if (!empty($_GET["sex"]))
        $sex = $_GET["sex"];
    else
        $sex = 0;
    
    if (!empty($_GET["fax"]))
        $fax = $_GET["fax"];
    else
        $fax = 0;

    if (!empty($_GET["cor"]))
        $cor = $_GET["cor"];
    else
        $cor = 0;

    if (!empty($_GET["frm"]))
        $frm = $_GET["frm"];
    else
        $frm = 0;
    
    if (!empty($_GET["prc"]))
        $prc = $_GET["prc"];
    else
        $prc = 0;

    if (!empty($_GET["uf"]))
        $uf = $_GET["uf"];
    else
        $uf = 0;

	if (!empty($_GET["ano"]))
		$ano = $_GET["ano"];
	else
		$ano = 2014;
    if (!empty($_GET["mundo"]))
        $mundo = $_GET["mundo"];
    else
        $mundo = 0;
    
    if (!empty($_GET["slc"]))
        $slc = $_GET["slc"];
    else
        $slc = 0;
?>
<link rel="stylesheet" type="text/css" href="css/main.css">
<script src="js/d3/d3.min.js"></script>

<script src="js/jquery-2.2.0.min.js"></script>
<!-- D3 QUEUE -->
<script src="https://d3js.org/d3-queue.v3.min.js"></script>
<!-- Utilidades -->
<script src="js/functions.js"></script>
<div class="container-chart">
    <div class="content">
        <div class="chart">
            <div id="corpo" class="fadeIn">
            </div>        
        </div>
    </div>
</div>

<script type="text/javascript">

	//variaveis configuracao query
	var vrv = <?php echo $var; ?>;
	var atc = <?php echo $atc; ?>;
	var cad = <?php echo $cad; ?>;
    var ocp = <?php echo $ocp; ?>;
	var prt = <?php echo $prt; ?>;
    var mec = <?php echo $mec; ?>;
    var mod = <?php echo $mod; ?>;
    var pfj = <?php echo $pfj; ?>;
    var typ = <?php echo $typ; ?>;
    var prc = <?php echo $prc; ?>;
    var ano = <?php echo $ano; ?>;
    var uf = <?php echo $uf; ?>;
    var slc = <?php echo $slc; ?>;
    var uos = <?php echo $uos; ?>;
    var cor = <?php echo $cor; ?>;
    var esc = <?php echo $esc; ?>;
    var frm = <?php echo $frm; ?>;
    var sex = <?php echo $sex; ?>;
    var fax = <?php echo $fax; ?>;
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

<script src="js/donut.js"></script>

