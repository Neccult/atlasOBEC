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
foreach (EixoUm::getter_mapa($var, $atc, $cad, $prt, $ano) as $tupla) {

/*
	$mapa[$tupla->idUF] = [

		'id' => (int) $tupla->idUF,
		'uf' => $tupla->UFNome,
		'valor' => (double) $tupla->Valor
	];
*/

	
	$id = $tupla->idUF;
	$mapa[$id]['id'] = (int) $tupla->idUF;
	$mapa[$id]['uf'] = $tupla->UFNome;
	$mapa[$id]['valor'] = (double) $tupla->Valor;
	$mapa[$id]['percentual'] = (double) $tupla->Percentual;
	$mapa[$id]['taxa'] = (double) $tupla->Taxa;


}

//var_dump($mapa);
// echo json_encode($mapa, JSON_UNESCAPED_UNICODE);
echo json_encode($mapa);

?>