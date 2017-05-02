<?php 
require_once("EixoUm.php");

// $teste = EixoUm::find(1, 12, 0, 0, 0, 2007);
// $teste = EixoUm::all();
// $teste = EixoUm::teste(1, 0, 0, 0, 2007);
// $teste = EixoUm::getter_uf_anos(1, 0, 0, 0, 0);

/*foreach (EixoUm::all() as $tupla) {

	echo '<hr />';
		echo 'UF: '.$tupla->idUF.'<br/>';
		echo 'Ano: '.$tupla->Ano.'<br/>';
		echo 'Valor: '.$tupla->Valor.'<br/>';
	echo '<hr />';
}*/

if (!empty($_GET["uf"]))
        $uf = $_GET["uf"];
    else
        $uf = 0;

$teste = array();
foreach (EixoUm::getter_uf_anos(1, $uf, 0, 0, 0) as $tupla) {
	$teste[$tupla->Ano] = $tupla->Valor;
}

// var_dump($teste);
echo json_encode($teste);

?>