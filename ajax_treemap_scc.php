<?php 
header('charset=utf-8');

require_once("EixoUm.php");

if (!empty($_GET["var"])) {

	$var = $_GET["var"];
	$uf = $_GET["uf"];

	$atc = $_GET["atc"];
	$prt = $_GET["prt"];
	$ano = $_GET["ano"];
}
else{
	$var = 1;
	$uf = 0;
	
	$atc = 0;
	$prt = 0;
	$ano = 2014;
}


$treemap = '{
 			  "name": "scc",
 			  	"children": [
			';

for ($cad=1; $cad <= 10; $cad++) { 

	$tupla = EixoUm::find($var, $uf, $atc, $cad, $prt, $ano);

	$treemap .= '
					{
					  "colorId": "'.$cad.'", 
					  "name": "'.$tupla->CadeiaNome.'",
					  "children": [
					    {
					      "name": "'.$tupla->CadeiaNome.'",
					      "children": [
					        {"name": "'.$tupla->CadeiaNome.'", 
							 "percentual": "'.$tupla->Percentual.'",
							 "taxa": "'.$tupla->Taxa.'", 
							 "size": "'.$tupla->Valor.'"}
					      ]
					    } 
					  ]
					}
				';

	$treemap .= ($cad != 10) ? ',' : '' ;

}

$treemap .= '
				]
			}
			';

echo $treemap;
//var_dump($mapa);
//echo json_encode($mapa, JSON_UNESCAPED_UNICODE);

?>