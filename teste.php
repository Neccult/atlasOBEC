<?php 
require_once("EixoUm.php");

//$teste = EixoUm::find(1, 12, 0, 0, 0, 2007);
// $teste = EixoUm::all();
// var_dump($teste);

/*foreach (EixoUm::all() as $tupla) {

	echo '<hr />';
		echo 'UF: '.$tupla->idUF.'<br/>';
		echo 'Ano: '.$tupla->Ano.'<br/>';
		echo 'Valor: '.$tupla->Valor.'<br/>';
	echo '<hr />';
}*/

$teste = EixoUm::teste(1);

var_dump($teste);


?>