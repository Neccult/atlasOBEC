<?php 
header('charset=utf-8');

require_once("EixoUm.php");

if (!empty($_GET["var"])) {

	$var = $_GET["var"];
	$atc = $_GET["atc"];
	$cad = $_GET["cad"];
	$prt = $_GET["prt"];
	$ano = $_GET["ano"];
}
else{
	$var = 1;
	$atc = 0;
	$cad = 0;
	$prt = 0;
	$ano = 2014;
}


$mapa = array();
foreach (EixoUm::getter($var, $atc, $cad, $prt, $ano) as $tupla) {
	
	$mapa[$tupla->idUF] = [

		'id' => (int) $tupla->idUF,
		'uf' => $tupla->UFNome,
		'valor' => (double) $tupla->Valor
	];

}

//var_dump($mapa);
echo json_encode($mapa, JSON_UNESCAPED_UNICODE);

?>