<?php

ini_set('display_errors',1);
ini_set('display_startup_erros',1);
error_reporting(E_ALL);
/*-----------------------------------------------------------------------------
Função: Treemap SCC
    função para gerar um JSON para o Gráfico Treemap SCC
Entrada: 
    $_GET = Parâmetros para consulta EixoUm::find
Saída:
    Dados formatados para o JSON SCC
-----------------------------------------------------------------------------*/

header('charset=utf-8');

if (!empty($_GET["var"])) {

	$var = $_GET["var"];
	$uf = $_GET["uf"];

	$atc = $_GET["atc"];
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
    $mod    =   isset($_GET["mod"])   ?   $_GET["mod"]  :   99;	   /*== modalidade ==*/
    $pfj    =   isset($_GET["pfj"])   ?   $_GET["pfj"]  :   99;	   /*== pessoa fisica/juridica ==*/
    $slc    =   isset($_GET["slc"])   ?   $_GET["slc"]  :   0;	   /*== visualizacao ==*/
    $prc    =   isset($_GET["prc"])   ?   $_GET["prc"]  :   0;	   /*== Parceiro ==*/
    $typ    =   isset($_GET["typ"])   ?   $_GET["typ"]  :   1;	   /*== Tipo de atividade ==*/
    $desag    =   isset($_GET["deg"])   ?   $_GET["deg"]  :   0;
    $ano    = $_GET["ano"];
    $eixo   = $_GET['eixo'];
}
else{
	$var = 1;
	$uf = 0;
	
	$atc = 0;
	$prt = 0;
	$ocp = 0;
    $sex = 0;
    $fax = 0;
    $esc = 0;
    $cor = 0;
    $frm = 0;
    $mec = 0;
    $mod = 0;
    $prf = 0;
    $pfj = 0;
    $slc = 0;
    $prv = 0;
    $snd = 0;
    $typ = 1;
    $prc = 0;
	$ano = 2014;
	$eixo = 0;
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
    }
}

function getNameOcupacao($id){
    switch($id){
        case 0: return "Todos";
        case 1: return "Atividades e Relacionadas";
        case 2: return "Cultura";
        
    }
}

function getnameUF($id){
    switch($id){
        case 0: return "Todos";
        case 11: return "Rondônia";
        case 12: return "Acre";
        case 13: return "Amazonas";
        case 14: return "Roraima";
        case 15: return "Pará";
        case 16: return "Amapá";
        case 17: return "Tocantins";
        case 21: return "Maranhão";
        case 22: return "Piauí";
        case 23: return "Ceará";
        case 24: return "Rio Grande do Norte";
        case 25: return "Paraíba";
        case 26: return "Pernambuco";
        case 27: return "Alagoas";
        case 28: return "Sergipe";
        case 29: return "Bahia";
        case 31: return "Minas Gerais";
        case 32: return "Espírito Santo";
        case 33: return "Rio de Janeiro";
        case 35: return "São Paulo";
        case 41: return "Paraná";
        case 42: return "Santa Catarina";
        case 43: return "Rio Grande do Sul";
        case 50: return "Mato Grosso do Sul";
        case 52: return "Mato Grosso";
        case 53: return "Goiás";
        case 54: return "Distrito Federal";
    }
}

function getNamePorte($id) {
    switch ($id) {
        case 1:
            return "Micro";
        case 2:
            return "Pequeno";
        case 3:
            return "Médio";
        case 4:
            return "Grande";
    }
}

function getNameSexo($id) {
    switch ($id) {
        case 0:
            return "Masculino";
        case 1:
            return "Feminino";
    }
}

function getNameIdade($id) {
    switch ($id) {
        case 1:
            return "10 a 17";
        case 2:
            return "18 a 29";
        case 3:
            return "30 a 49";
        case 4:
            return "50 a 64";
        case 5:
            return "65 ou mais";
        case 6:
            return "Não classificado";
    }
}

function getNameEscolaridade($id) {
    switch ($id) {
        case 1:
            return "Sem instrução";
        case 2:
            return "Fundamental incompleto";
        case 3:
            return "Fundamental completo";
        case 4:
            return "Médio completo";
        case 5:
            return "Superior incompleto";
        case 6:
            return "Superior completo";
        case 7:
            return "Não determinado";
    }
}


function getNameEtinia($id) {
    switch ($id) {
        case 1:
            return "Indígena";
        case 2:
            return "Branca";
        case 3:
            return "Preta";
        case 4:
            return "Amarela";
        case 5:
            return "Parda";
    }
}

function getNameFormalidade($id) {
    switch ($id) {
        case 2:
            return "Sim";
        case 1:
            return "Não";

    }
}

function getNamePrev($id) {
    switch ($id) {
        case 2:
            return "Sim";
        case 1:
            return "Não";

    }
}

function getNameSindical($id) {
    switch ($id) {
        case 2:
            return "Sim";
        case 1:
            return "Não";

    }
}


//Trata o sexo
switch($sex) {
    case "0":
        $sex = NULL;
        break;
    case "1":
        $sex = 1;
        break;
    case "2":
        $sex = 0;
        break;
    default:
        $sex = NULL;
}

//Trata a modalidade
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


$treemap = '{
 			  "name": "scc",
 			  	"children": [
			';

if($eixo == 0) {
    require_once("EixoUm.php");
    for ($cad=1; $cad <= 10; $cad++) {

        $tupla = EixoUm::find($var, $uf, $atc, $cad, $prt, $ano);
        $treemap .= '
                {
                  "colorId": "' . $cad . '", 
                  "name": "' . $tupla->CadeiaNome . '",
                  "children": [
                    {
                      "name": "' . $tupla->CadeiaNome . '",
                      "children": [
                        {"name": "' . $tupla->CadeiaNome . '",
                         "estado": "' . $tupla->UFNome . '",  
                         "percentual": "' . $tupla->Percentual . '",
                         "taxa": "' . $tupla->Taxa . '", 
                         "size": "' . $tupla->Valor . '"}
                      ]
                    } 
                  ]
                }
            ';

        $treemap .= ($cad != 10) ? ',' : '';
    }
}
else if($eixo == 1) {
    require_once("EixoDois.php");
    if($ocp == 0){
        $cad_atual = 0;
        foreach(EixoDois::find($var, $uf, $ocp, $desag, $ano) as $tupla){
            $index = 1;
            if($cad_atual != $tupla->idCadeia){
                if($tupla->idCadeia != 1){
                    $treemap .= '   ]
                            }
                        ]
                    },';
                }
                $treemap .= '
                {
                    "colorId": "' . $tupla->idCadeia. '", 
                    "name": "' . getNameCadeia($tupla->idCadeia) . '",
                    "children": [
                        {
                        "name": "' . getNameCadeia($tupla->idCadeia) . '",
                        "children": [';
                    if($prt != 0) {
                        $treemap .= '{"name": "' . getNamePorte($tupla->idPorte) . '",';
                        $index = $tupla->idPorte;
                    }
                    else if($esc != 0){
                        $treemap .= '{"name": "' . getNameEscolaridade($tupla->idEscolaridade) . '",';
                        $index = $tupla->idEscolaridade;
                    }
                    else if($fax != 0) {
                        $treemap .= '{"name": "' . getNameIdade($tupla->idIdade) . '",';
                        $index = $tupla->idIdade;
                    }
                    else if($sex != NULL) {
                        if($tupla->Sexo == 1) {
                            $treemap .= '{"name": "Masculino",';
                            $index = 1;
                        }
                        if($tupla->Sexo == 0) {
                            $treemap .= '{"name": "Feminino",';
                            $index = 2;
                        }
                        
                    }
                    else $treemap .= '{"name": "' . getNameCadeia($tupla->idCadeia) . '",'; 
                    $treemap .= '"estado": "' . getNameUF($tupla->idUF) . '",  
                    "percentual": "' . $tupla->Percentual . '",
                    "taxa": "' . $tupla->Taxa . '", 
                    "desagreg": "' . ($index) . '", 
                    "size": "' . $tupla->Valor . '"}';     
            } else{
                $treemap .=  ',';   //adiciona vírgula
                if($prt != 0) {
                    $treemap .= '{"name": "' . getNamePorte($tupla->idPorte) . '",';
                    $index = $tupla->idPorte;
                }
                else if($esc != 0){
                    $treemap .= '{"name": "' . getNameEscolaridade($tupla->idEscolaridade) . '",';
                    $index = $tupla->idEscolaridade;
                }
                else if($fax != 0) {
                    $treemap .= '{"name": "' . getNameIdade($tupla->idIdade) . '",';
                    $index = $tupla->idIdade;
                }
                else if($sex != NULL) {
                    if($tupla->Sexo == 1) {
                        $treemap .= '{"name": "Masculino",';
                        $index = 1;
                    }
                    if($tupla->Sexo == 0) {
                        $treemap .= '{"name": "Feminino",';
                        $index = 2;
                    }
                }
                else $treemap .= '{"name": "' . getNameCadeia($tupla->idCadeia) . '",'; 
                $treemap .= '"estado": "' . getNameUF($tupla->idUF) . '",  
                "percentual": "' . $tupla->Percentual . '",
                "taxa": "' . $tupla->Taxa . '", 
                "desagreg": "' . $index . '", 
                "size": "' . $tupla->Valor . '"}';   
            }

            $cad_atual = $tupla->idCadeia;
        
        }
        $treemap .= '           ]
                            }
                        ]
                    }
                ';
    }
    else {
        $ocp_atual = 0;
        foreach(EixoDois::find($var, $uf, $ocp, $desag, $ano) as $tupla){
            $index = 1;
            if($ocp_atual != $tupla->idOcupacao){
                if($tupla->idOcupacao != 1){
                    $treemap .= '   ]
                            }
                        ]
                    },';
                }
                $treemap .= '
                {
                    "colorId": "' . $tupla->idOcupacao. '", 
                    "name": "' . getNameOcupacao($tupla->idOcupacao) . '",
                    "children": [
                        {
                        "name": "' . getNameOcupacao($tupla->idOcupacao) . '",
                        "children": [';
                    if($prt != 0) {
                        $treemap .= '{"name": "' . getNamePorte($tupla->idPorte) . '",';
                        $index = $tupla->idPorte;
                    }
                    else if($esc != 0){
                        $treemap .= '{"name": "' . getNameEscolaridade($tupla->idEscolaridade) . '",';
                        $index = $tupla->idEscolaridade;
                    }
                    else if($fax != 0) {
                        $treemap .= '{"name": "' . getNameIdade($tupla->idIdade) . '",';
                        $index = $tupla->idIdade;
                    }
                    else if($cor != 0){
                        $treemap .= '{"name": "' . getNameEtinia($tupla->idEtinia) . '",';
                        $index = $tupla->idEtinia; 
                    }
                    else if($prv != 0) {
                        $treemap .= '{"name": "' . getNamePrev($tupla->Previdencia) . '",';
                        $index = $tupla->Previdencia; 
                    }
                    else if($snd != 0) {
                        $treemap .= '{"name": "' . getNameSindical($tupla->Sindical) . '",';
                        $index = $tupla->Sindical;
                    }
                    else if($frm != 0) {
                        $treemap .= '{"name": "' . getNameFormalidade($tupla->Formalidade) . '",';
                        $index = $tupla->Formalidade;
                    }
                    else $treemap .= '{"name": "' . getNameOcupacao($tupla->idOcupacao) . '",'; 
                    $treemap .= '"estado": "' . getNameUF($tupla->idUF) . '",  
                    "percentual": "' . $tupla->Percentual . '",
                    "taxa": "' . $tupla->Taxa . '", 
                    "desagreg": "' . ($index) . '", 
                    "size": "' . $tupla->Valor . '"}';     
            } else{
                $treemap .=  ',';   //adiciona vírgula
                if($prt != 0) {
                    $treemap .= '{"name": "' . getNamePorte($tupla->idPorte) . '",';
                    $index = $tupla->idPorte;
                }
                else if($esc != 0){
                    $treemap .= '{"name": "' . getNameEscolaridade($tupla->idEscolaridade) . '",';
                    $index = $tupla->idEscolaridade;
                }
                else if($fax != 0) {
                    $treemap .= '{"name": "' . getNameIdade($tupla->idIdade) . '",';
                    $index = $tupla->idIdade;
                }
                else if($cor != 0){
                    $treemap .= '{"name": "' . getNameEtinia($tupla->idEtinia) . '",';
                    $index = $tupla->idEtinia; 
                }
                else if($prv != 0) {
                    $treemap .= '{"name": "' . getNamePrev($tupla->Previdencia) . '",';
                    $index = $tupla->Previdencia; 
                }
                else if($snd != 0) {
                    $treemap .= '{"name": "' . getNameSindical($tupla->Sindical) . '",';
                    $index = $tupla->Sindical;
                }
                else if($frm != 0) {
                    $treemap .= '{"name": "' . getNameFormalidade($tupla->Formalidade) . '",';
                    $index = $tupla->Formalidade;
                }
                else $treemap .= '{"name": "' . getNameOcupacao($tupla->idOcupacao) . '",'; 
                $treemap .= '"estado": "' . getNameUF($tupla->idUF) . '",  
                "percentual": "' . $tupla->Percentual . '",
                "taxa": "' . $tupla->Taxa . '", 
                "desagreg": "' . $index . '", 
                "size": "' . $tupla->Valor . '"}';   


            }

        
            $ocp_atual = $tupla->idOcupacao;
        }
        $treemap .= '           ]
                            }
                        ]
                    }
                ';
    }
        
}
else if($eixo == 2) {
    require_once("EixoTres.php");

    if($var == 2){
        $array_cad = array(2,3,5,8,11);
    }
    else{
        $array_cad = array(1,2,3,4,5,6,7,8,9,10);
    }
    foreach($array_cad as $cad) {
        $tupla = EixoTres::find($var, $uf, $cad, $mec, $pfj, $mod, $ano);

        $treemap .= '
					{
					  "colorId": "'.$cad.'", 
					  "name": "'.$tupla->CadeiaNome.'",
					  "children": [
					    {
					      "name": "'.$tupla->CadeiaNome.'",
					      "children": [
					        {"name": "'.$tupla->CadeiaNome.'",
					         "estado": "'.$tupla->UFNome.'",  
							 "percentual": "'.$tupla->Percentual.'",
							 "taxa": "'.$tupla->Taxa.'", 
							 "size": "'.$tupla->Valor.'"}
					      ]
					    } 
					  ]
					}
				';

        $treemap .= ($cad != $array_cad[count($array_cad)-1]) ? ',' : '' ;

    }
}
if($eixo == 3) {
    require_once("EixoQuatro.php");
    $result = EixoQuatro::find($var, $prc, $uf, $typ, $ano, $slc);
    foreach($result as $tupla){
        if($tupla->idCadeia != '0'){
            $treemap .= '
					{
					  "colorId": "'.$tupla->idCadeia.'", 
					  "name": "'.$tupla->CadeiaNome.'",
					  "children": [
					    {
					      "name": "'.$tupla->CadeiaNome.'",
					      "children": [
					        {"name": "'.$tupla->CadeiaNome.'",
					         "parceiro": "'.$tupla->ParceiroNome.'",  
					         "estado": "'.$tupla->UFNome.'",  
							 "percentual": "'.$tupla->Percentual.'",
							 "taxa": "'.$tupla->Taxa.'", 
							 "size": "'.$tupla->Valor.'"}
					      ]
					    } 
					  ]
					}
				';

        $treemap .= ($tupla->idCadeia != count($result)-1) ? ',' : '' ;
    
        }
    }
    
}

$treemap .= '
				]
			}
			';

echo $treemap;

?>