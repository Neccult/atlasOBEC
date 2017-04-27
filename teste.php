<?php 
require_once("EixoUm.php");

// $teste = EixoUm::find(1, 12, 0, 0, 0, 2007);
// $teste = EixoUm::all();

/*foreach (EixoUm::all() as $tupla) {

	echo '<hr />';
		echo 'UF: '.$tupla->idUF.'<br/>';
		echo 'Ano: '.$tupla->Ano.'<br/>';
		echo 'Valor: '.$tupla->Valor.'<br/>';
	echo '<hr />';
}*/

// $teste = EixoUm::teste(1, 0, 0, 0, 2007);


foreach (EixoUm::getter_uf_anos(1, 0, 0, 0, 0, 2014) as $tupla) {

	echo '<hr />';
		echo 'UF: '.$tupla->idUF.'<br/>';
		echo 'Ano: '.$tupla->Ano.'<br/>';
		echo 'Valor: '.$tupla->Valor.'<br/>';
	echo '<hr />';
}

// var_dump($teste);

?>