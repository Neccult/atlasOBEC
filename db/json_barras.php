<?php
/*-----------------------------------------------------------------------------
Função: Barras
    função para gerar um JSON para o Gráfico Barras
Entrada: 
    $_GET = Parâmetros para consulta EixoUm::getter_barras
Saída:
    Dados formatados para o JSON barras
-----------------------------------------------------------------------------*/

header('charset=utf-8');


if (!empty($_GET["var"])) {

	$var = $_GET["var"];
	$uf = $_GET["uf"];

	$atc = $_GET["atc"];
	$cad = $_GET["cad"];
	$prt = $_GET["prt"];
    $ocp = $_GET["ocp"];
    $sex    =   isset($_GET["sex"])   ?   $_GET["sex"]  :   0;	   /*== sexo ==*/
    $fax    =   isset($_GET["fax"])   ?   $_GET["fax"]  :   0;	   /*== faixa etaria ==*/
    $esc    =   isset($_GET["esc"])   ?   $_GET["esc"]  :   0;	   /*== escolaridade ==*/
    $cor    =   isset($_GET["cor"])   ?   $_GET["cor"]  :   0;	   /*== cor e raça ==*/
    $frm    =   isset($_GET["frm"])   ?   $_GET["frm"]  :   0;	   /*== formalidade ==*/
    $prv    =   isset($_GET["prv"])   ?   $_GET["prv"]  :   0;	   /*== previdencia ==*/
    $snd    =   isset($_GET["snd"])   ?   $_GET["snd"]  :   0;	   /*== sindical ==*/
    $eixo = $_GET['eixo'];
}
else{
	$var = 1;
	$uf = 0;
	
	$atc = 0;
	$cad = 0;
	$prt = 0;
    $ocp = 0;
    $sex = 0;
    $fax = 0;
    $esc = 0;
    $cor = 0;
    $frm = 0;
    $prv = 0;
    $snd = 0;
	$eixo = 0;
}


$barras = array();
if($eixo == 0) {
    require_once("EixoUm.php");
    foreach (EixoUm::getter_barras($var, $uf, $atc, $cad, $prt) as $tupla) {

        // $barras[$tupla->Ano] = $tupla->Valor;

        $id = $tupla->Ano;
        $barras[$id]['uf'] = $tupla->UFNome;
        $barras[$id]['ano'] = (int) $tupla->Ano;
        $barras[$id]['valor'] = (double) $tupla->Valor;
        $barras[$id]['percentual'] = (double) $tupla->Percentual;
        $barras[$id]['taxa'] = (double) $tupla->Taxa;

    }
}
else if($eixo == 1) {
    require_once("EixoDois.php");
    foreach (EixoDois::getter_barras($var, $uf, $cad, $prt, $ocp, $esc, $cor, $fax, $frm, $prv, $snd, $sex) as $tupla) {

        // $barras[$tupla->Ano] = $tupla->Valor;

        $id = $tupla->Ano;
        $barras[$id]['uf'] = $tupla->UFNome;
        $barras[$id]['ano'] = (int) $tupla->Ano;
        $barras[$id]['valor'] = (double) $tupla->Valor;
        $barras[$id]['percentual'] = (double) $tupla->Percentual;
        $barras[$id]['taxa'] = (double) $tupla->Taxa;

    }
}
else if($eixo == 2) {
    require_once("EixoTres.php");
    foreach (EixoTres::getter_barras($var, $uf, $atc, $cad, $prt) as $tupla) {

        // $barras[$tupla->Ano] = $tupla->Valor;

        $id = $tupla->Ano;
        $barras[$id]['uf'] = $tupla->UFNome;
        $barras[$id]['ano'] = (int) $tupla->Ano;
        $barras[$id]['valor'] = (double) $tupla->Valor;
        $barras[$id]['percentual'] = (double) $tupla->Percentual;
        $barras[$id]['taxa'] = (double) $tupla->Taxa;

    }
}
else if($eixo == 3) {
    require_once("EixoQuatro.php");
    foreach (EixoQuatro::getter_barras($var, $uf, $atc, $cad, $prt) as $tupla) {

        // $barras[$tupla->Ano] = $tupla->Valor;

        $id = $tupla->Ano;
        $barras[$id]['uf'] = $tupla->UFNome;
        $barras[$id]['ano'] = (int) $tupla->Ano;
        $barras[$id]['valor'] = (double) $tupla->Valor;
        $barras[$id]['percentual'] = (double) $tupla->Percentual;
        $barras[$id]['taxa'] = (double) $tupla->Taxa;

    }
}

echo json_encode($barras);

?>