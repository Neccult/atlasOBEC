<?php
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
    $mec    =   isset($_GET["mec"])   ?   $_GET["mec"]  :   0;	   /*== mecanismo ==*/
    $mod    =   isset($_GET["mod"])   ?   $_GET["mod"]  :   0;	   /*== modalidade ==*/
    $pfj    =   isset($_GET["pfj"])   ?   $_GET["pfj"]  :   0;	   /*== pessoa fisica/juridica ==*/
    $uos    =   isset($_GET["uos"])   ?   $_GET["uos"]  :   0;	   /*== UF ou Setores ==*/
    $prc    =   isset($_GET["prc"])   ?   $_GET["prc"]  :   0;	   /*== Parceiro ==*/
    $slc    =   isset($_GET["slc"])   ?   $_GET["slc"]  :   0;	   /*== Parceiro ==*/
    $typ    =   isset($_GET["typ"])   ?   $_GET["typ"]  :   0;	   /*== Tipo de atividade ==*/
    $ano    =   isset($_GET["ano"])   ?   $_GET["ano"]  :NULL;	   /*== Ano ==*/
    $mundo  =   isset($_GET['mundo']) ?   $_GET['mundo']:   0;
    $eixo = $_GET['eixo'];
}
else{
	$var = 1;
	$uf = 0;
	$mundo = 0;
	$atc = 0;
	$cad = 0;
	$prt = 0;
    $ocp = 0;
    $sex = 0;
    $fax = 0;
    $esc = 0;
    $slc = 0;
    $cor = 0;
    $mec = 0;
    $mod = 0;
    $pjj = 0;
    $frm = 0;
    $prv = 0;
    $uos = 0;
    $typ = 0;
    $prc = 0;
    $ano = NULL;
    $snd = 0;
	$eixo = 0;
}

function map_tipo($tipo){
    switch($tipo){
        case 1: return "Exportação";
        case 2: return "Importação";
    }
}

function sigla_cadeia($cadeia) {
    switch($cadeia) {
        case "Arquitetura e Design":
            return "Arq e D";
        case "Publicidade":
            return "Publ.";
        case "Patrimônio":
            return $cadeia;
        case "Música":
            return $cadeia;
        case "Entretenimento":
            return "Entret.";
        case "Educação e Criação em Artes":
            return "Edu. Art.";
        case "Editorial":
            return "Edit.";
        case "Cultura Digital":
            return "Cult. Dig.";
        case "Audiovisual":
            return "Audio";
        case "Artes Cênicas e Espetáculos":
            return "Artes";
        case "Outros":
            return $cadeia;
    }
}
function getNameCadeia($id){
    switch($id){
        case 0: return "Todos";
        case 1: return "Arquitetura e Design";
        case 2: return "Artes Cênicas e Espetáculos";
        case 3: return "Audiovisual";
        case 4: return "Cultura Digital";
        case 5: return "Editorial";
        case 6: return "Educação e Criação em Artes";
        case 7: return "Entretenimento";
        case 8: return "Música";
        case 9: return "Patrimônio";
        case 10: return "Publicidade";
        case 11: return "Outros";
    }
}

function binario($tipo){

    if($tipo == 0)
        return "Não";
    else
        return "Sim";
}
$tipos = array();

if($eixo == 2 && $var == 17){

    $aux = array();

    require_once("EixoTres.php");

    foreach (EixoTres::getter_donut($var, $uf, $cad, $mec, $pfj, $mod, $ano, $uos) as $tupla) {


        $valor = array();
        $valor['tipo'] = binario($tupla->idCadeia);
        $valor['valor'] = (float) $tupla->Valor;
        $valor['uf'] = (int) $tupla->idUF;
        array_push($aux, $valor);
    }

    $contSim = 0;
    $contNao = 0;
    $total = 0;

    foreach ($aux as $valor){
        if($valor['tipo'] == 'Sim'){
            if($valor['uf'] == 0)
                $total = $valor['valor'];
        $contSim++;
        }
        else if($valor['tipo'] == 'Não'){
            $contNao++;
        }
    }

    $contSim--;

    $valor = array();
    $valor['tipo'] = 'Sim';
    $valor['valor'] = $contSim;
    $valor['total'] = $total;
    array_push($tipos, $valor);
    $valor['tipo'] = 'Não';
    $valor['valor'] = $contNao;
    array_push($tipos, $valor);


}
if($eixo == 2 && $var >= 18){

    $aux = array();

    require_once("EixoTres.php");

    foreach (EixoTres::getter_donut($var, $uf, $cad, $mec, $pfj, $mod, $ano, $uos) as $tupla) {


        $valor = array();
        $valor['tipo'] = sigla_cadeia(getNameCadeia($tupla->idCadeia));
        $valor['valor'] = (float) $tupla->Valor;
        $valor['uf'] = (int) $tupla->idUF;
        $valor['cad'] = (int) $tupla->idCadeia;
        array_push($tipos, $valor);

    }

}

if($eixo == 3){
    require_once("EixoQuatro.php");
    foreach (EixoQuatro::getter_donut($var, $cad, $ano, $slc, $uf, $prc) as $tupla) {

        // $barras[$tupla->Ano] = $tupla->Valor;
        $valor = array();
        $valor['tipo'] = map_tipo($tupla->idTipo);
        $valor['valor'] = (float) $tupla->Valor;
        array_push($tipos, $valor);
    }
}


echo json_encode($tipos);
?>