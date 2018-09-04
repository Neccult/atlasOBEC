<?php 
/*-----------------------------------------------------------------------------
Função: Mapa
    função para gerar um JSON para o Gráfico Mapa
Entrada: 
    $_GET = Parâmetros para consulta EixoUm::getter_mapa
Saída:
    Dados formatados para o JSON Mapa
-----------------------------------------------------------------------------*/

header('charset=utf-8');
if (!empty($_GET["var"])) {

	$var = $_GET["var"];
	$cad = isset($_GET["cad"])  ? $_GET["cad"]  :   0;
	$deg = isset($_GET["deg"])  ? $_GET["deg"]  :   0;
    $ocp = isset($_GET["ocp"])  ? $_GET["ocp"]  :   0;
    $mod = isset($_GET['mod'])  ?   $_GET['mod']  :   0; 
    $mec = isset($_GET["mec"])  ?   $_GET["mec"]    : 0;
    $pfj =   isset($_GET["pfj"])   ?   $_GET["pfj"]  :   0;	   /*== pessoa fisica/juridica ==*/
    $prc =   isset($_GET["prc"])   ?   $_GET["prc"]  :   0;	   /*== Parceiro ==*/
    $uf  =   isset($_GET["uf"])   ?   $_GET["uf"]  :   0;	   /*== Parceiro ==*/
    $typ =   isset($_GET["typ"])   ?   $_GET["typ"]  :   1;	   /*== Tipo de atividade ==*/
    $subdeg    =   isset($_GET["subdeg"])   ?   $_GET["subdeg"]  :   1;	   /*== Subdesagregação ==*/
	$ano = $_GET["ano"];
    $eixo = $_GET['eixo'];
    $mundo =    isset($_GET['mundo']) ?   $_GET['mundo']:   0;
    $slc = isset($_GET['slc']) ?   $_GET['slc']:   0;
}
else{
	$var = 1;
	$cad = 0;
	$pfj = 0;
	$ocp = 0;
    $mec = 0;
    $typ = 1;
    $prc = 0;
	$ano = 2014;
    $eixo = 0;
    $slc = 0;
    $mod = 0;
    $deg = 0;
    $subdeg = 0;
    $mundo = 0;
}


//Trata a pessoa fisica/juridica
switch($pfj) {
    case "0":
        $pfj = NULL;
        break;
    case "1":
        $pfj = 1;
        break;
    case "2":
        $pfj = 0;
        break;
    default:
        $pfj = NULL;
}

switch($mod) {
    case "0":
        $mod = NULL;
        break;
    case "1":
        $mod = 1;
        break;
    case "2":
        $mod = 0;
        break;
    default:
        $mod = NULL;
}

$mapa = array();
if($eixo == 0) {
    require_once("EixoUm.php");
	foreach (EixoUm::getter_mapa($var, $cad, $deg, $ano) as $tupla) {

        $id = $tupla->idUF;
        $mapa[$id]['id'] = (int) $tupla->idUF;
        $mapa[$id]['uf'] = $tupla->UFNome;
        $mapa[$id]['valor'] = (double) $tupla->Valor;
        $mapa[$id]['ano'] = (double) $tupla->Ano;
        $mapa[$id]['percentual'] = (double) $tupla->Percentual;
        $mapa[$id]['taxa'] = (double) $tupla->Taxa;


    }
}
else if($eixo == 1) {
    require_once("EixoDois.php");
    foreach (EixoDois::getter_mapa($var, $cad, $ocp, $ano) as $tupla) {

        $id = $tupla->idUF;
        $mapa[$id]['id'] = (int) $tupla->idUF;
        $mapa[$id]['uf'] = $tupla->UFNome;
        $mapa[$id]['ano'] = (double) $tupla->Ano;
        $mapa[$id]['valor'] = (double) $tupla->Valor;
        $mapa[$id]['percentual'] = (double) $tupla->Percentual;
        $mapa[$id]['taxa'] = (double) $tupla->Taxa;

    }
}
else if($eixo == 2) {
    require_once("EixoTres.php");
    foreach (EixoTres::getter_mapa($var, $cad, $mec, $mod, $pfj, $ano) as $tupla) {

        if($var == 17){
            $id = $tupla->idUF;
            $mapa[$id]['id'] = (int)$tupla->idUF;
            $mapa[$id]['uf'] = $tupla->UFNome;
            $mapa[$id]['ano'] = (double)$tupla->Ano;
            $mapa[$id]['SouN'] = (int)$tupla->idCadeia;
            $mapa[$id]['valor'] = (double)$tupla->Valor;
            $mapa[$id]['percentual'] = (double)$tupla->Percentual;
            $mapa[$id]['taxa'] = (double)$tupla->Taxa;
        }
        else{
            $id = $tupla->idUF;
            $mapa[$id]['id'] = (int)$tupla->idUF;
            $mapa[$id]['uf'] = $tupla->UFNome;
            $mapa[$id]['ano'] = (double)$tupla->Ano;
            $mapa[$id]['valor'] = (double)$tupla->Valor;
            $mapa[$id]['percentual'] = (double)$tupla->Percentual;
            $mapa[$id]['taxa'] = (double)$tupla->Taxa;
        }



    }
}
else if($eixo == 3) {
    require_once("EixoQuatro.php");
    
    $mapa = new stdClass();
    
    foreach (EixoQuatro::getter_mapa($var, $cad, $typ, $ano, $prc, $uf, $mundo, $slc) as $tupla) {
        
        if($mundo == 0){
            $id = $tupla->idParceiro;
            $mapa->$id = [];

            $mapa->$id['id'] = (int) $tupla->idParceiro;
            $mapa->$id['prc'] = $tupla->ParceiroNome;
            $mapa->$id['uf'] = $tupla->UFNome;
            
            $mapa->$id['valor'] = (double) $tupla->Valor;
            $mapa->$id['percentual'] = (double) $tupla->Percentual;
            $mapa->$id['taxa'] = (double) $tupla->Taxa;
        }
        else{
            if($tupla->idUF != 99){
                $id = $tupla->idUF;
                $mapa->$id = [];

                $mapa->$id['id'] = (int) $tupla->idUF;
                $mapa->$id['uf'] = $tupla->UFNome;
                $mapa->$id['prc'] = $tupla->ParceiroNome;
                $mapa->$id['ano'] = (double) $tupla->Ano;

                $mapa->$id['valor'] = (double) $tupla->Valor;
                $mapa->$id['percentual'] = (double) $tupla->Percentual;
                $mapa->$id['taxa'] = (double) $tupla->Taxa;

            }
            
        }
    }
    

}

echo json_encode($mapa);

?>
