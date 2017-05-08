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


$treemap = '{
 			  "name": "region",
 			  	"children": [
			';


$regiao = "Sul";
$treemap .= '
					{
					  "name": "'.$regiao.'",
					  "children": [
					    {
					      "name": "'.$regiao.'",
					      "children": [
			';
						foreach (EixoUm::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
							$treemap .= '{"name": "'.$tupla->UFSigla.'", "size": "'.$tupla->Valor.'"},';
						}

						$size = strlen($treemap);
						$treemap = substr($treemap,0, $size-1);

$treemap .= '	        
					      ]
					    } 
					  ]
					},
			';


$regiao = "Sudeste";
$treemap .= '
					{
					  "name": "'.$regiao.'",
					  "children": [
					    {
					      "name": "'.$regiao.'",
					      "children": [
			';
						foreach (EixoUm::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
							$treemap .= '{"name": "'.$tupla->UFSigla.'", "size": "'.$tupla->Valor.'"},';
						}

						$size = strlen($treemap);
						$treemap = substr($treemap,0, $size-1);

$treemap .= '	        
					      ]
					    } 
					  ]
					},
			';

$regiao = "Centro-Oeste";
$treemap .= '
					{
					  "name": "'.$regiao.'",
					  "children": [
					    {
					      "name": "'.$regiao.'",
					      "children": [
			';
						foreach (EixoUm::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
							$treemap .= '{"name": "'.$tupla->UFSigla.'", "size": "'.$tupla->Valor.'"},';
						}

						$size = strlen($treemap);
						$treemap = substr($treemap,0, $size-1);

$treemap .= '	        
					      ]
					    } 
					  ]
					},
			';

$regiao = "Nordeste";
$treemap .= '
					{
					  "name": "'.$regiao.'",
					  "children": [
					    {
					      "name": "'.$regiao.'",
					      "children": [
			';
						foreach (EixoUm::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
							$treemap .= '{"name": "'.$tupla->UFSigla.'", "size": "'.$tupla->Valor.'"},';
						}

						$size = strlen($treemap);
						$treemap = substr($treemap,0, $size-1);

$treemap .= '	        
					      ]
					    } 
					  ]
					},
			';

$regiao = "Norte";
$treemap .= '
					{
					  "name": "'.$regiao.'",
					  "children": [
					    {
					      "name": "'.$regiao.'",
					      "children": [
			';
						foreach (EixoUm::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
							$treemap .= '{"name": "'.$tupla->UFSigla.'", "size": "'.$tupla->Valor.'"},';
						}

						$size = strlen($treemap);
						$treemap = substr($treemap,0, $size-1);

$treemap .= '	        
					      ]
					    } 
					  ]
					}
			';

$treemap .= '
				]
			}
			';

echo $treemap;


// $teste = EixoUm::getter_region($var, $atc, $cad, $prt, $ano, "Sul");
// var_dump($teste);
//echo json_encode($mapa, JSON_UNESCAPED_UNICODE);

?>