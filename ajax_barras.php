<?php 
require_once("EixoUm.php");

if (!empty($_GET["var"])) {

	$var = $_GET["var"];
	$uf = $_GET["uf"];
	$atc = $_GET["atc"];
	$cad = $_GET["cad"];
	$prt = $_GET["prt"];
}
else{
	$var = 1;
	$uf = 0;
	$atc = 0;
	$cad = 0;
	$prt = 0;
}


$barras = array();
foreach (EixoUm::getter_uf_anos($var, $uf, $atc, $cad, $prt) as $tupla) {
	$barras[$tupla->Ano] = $tupla->Valor;
}


echo json_encode($barras);

?>