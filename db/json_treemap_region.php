<?php
/*-----------------------------------------------------------------------------
Função: Treemap Region
    função para gerar um JSON para o Gráfico Treemap Region
Entrada: 
    $_GET = Parâmetros para consulta EixoUm::getter_region
Saída:
    Dados formatados para o JSON region
-----------------------------------------------------------------------------*/

header('charset=utf-8');


if (!empty($_GET["var"])) {

	$var = $_GET["var"];

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
    $prc    =   isset($_GET["prc"])   ?   $_GET["prc"]  :   0;	   /*== Parceiro ==*/
    $typ    =   isset($_GET["typ"])   ?   $_GET["typ"]  :   0;	   /*== Tipo de atividade ==*/
	$ano = $_GET["ano"];
    $eixo = $_GET['eixo'];
}
else{
	$var = 1;
	
	$atc = 0;
	$cad = 0;
	$prt = 0;
	$ocp = 0;
    $sex = 0;
    $fax = 0;
    $esc = 0;
    $cor = 0;
    $frm = 0;
    $mec = 0;
    $mod = 0;
    $pfj = 0;
    $prv = 0;
    $typ = 0;
    $prc = 0;
    $snd = 0;
	$ano = 2014;
	$eixo = 0;
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

if($eixo == 0) {
    require_once("EixoUm.php");
    $treemap = '{
 			  "name": "region",
 			  	"children": [
			';


    $regiao = "Sul";
    $treemap .= '
                        {
                          "colorId": 5,
                          "name": "' . $regiao . '",
                          "children": [
                            {
                              "name": "' . $regiao . '",
                              "children": [
                ';
    foreach (EixoUm::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
        $treemap .= '{"name": "' . $tupla->UFSigla . '", 
                                              "estado": "' . $tupla->UFNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

    $treemap .= '	        
                              ]
                            } 
                          ]
                        },
                ';


    $regiao = "Sudeste";
    $treemap .= '
                        {
                          "colorId": 4,
                          "name": "' . $regiao . '",
                          "children": [
                            {
                              "name": "' . $regiao . '",
                              "children": [
                ';
    foreach (EixoUm::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
        $treemap .= '{"name": "' . $tupla->UFSigla . '", 
                                              "estado": "' . $tupla->UFNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

    $treemap .= '	        
                              ]
                            } 
                          ]
                        },
                ';

    $regiao = "Centro-Oeste";
    $treemap .= '
                        {
                          "colorId": 1,
                          "name": "' . $regiao . '",
                          "children": [
                            {
                              "name": "' . $regiao . '",
                              "children": [
                ';
    foreach (EixoUm::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
        $treemap .= '{"name": "' . $tupla->UFSigla . '", 
                                              "estado": "' . $tupla->UFNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

    $treemap .= '	        
                              ]
                            } 
                          ]
                        },
                ';

    $regiao = "Nordeste";
    $treemap .= '
                        {
                          "colorId": 2,
                          "name": "' . $regiao . '",
                          "children": [
                            {
                              "name": "' . $regiao . '",
                              "children": [
                ';
    foreach (EixoUm::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
        $treemap .= '{"name": "' . $tupla->UFSigla . '", 
                                              "estado": "' . $tupla->UFNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

    $treemap .= '	        
                              ]
                            } 
                          ]
                        },
                ';

    $regiao = "Norte";
    $treemap .= '
                        {
                          "colorId": 3,
                          "name": "' . $regiao . '",
                          "children": [
                            {
                              "name": "' . $regiao . '",
                              "children": [
                ';
    foreach (EixoUm::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
        $treemap .= '{"name": "' . $tupla->UFSigla . '", 
                                              "estado": "' . $tupla->UFNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

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
}
else if($eixo == 1) {
    require_once("EixoDois.php");
    $treemap = '{
 			  "name": "region",
 			  	"children": [
			';


    $regiao = "Sul";
    $treemap .= '
                        {
                          "colorId": 5,
                          "name": "' . $regiao . '",
                          "children": [
                            {
                              "name": "' . $regiao . '",
                              "children": [
                ';
    foreach (EixoDois::getter_region($var, $cad, $prt, $ocp, $esc, $cor, $fax, $frm, $prv, $snd, $sex, $ano, $regiao) as $tupla) {
        $treemap .= '{"name": "' . $tupla->UFSigla . '", 
                                              "estado": "' . $tupla->UFNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

    $treemap .= '	        
                              ]
                            } 
                          ]
                        },
                ';


    $regiao = "Sudeste";
    $treemap .= '
                        {
                          "colorId": 4,
                          "name": "' . $regiao . '",
                          "children": [
                            {
                              "name": "' . $regiao . '",
                              "children": [
                ';
    foreach (EixoDois::getter_region($var, $cad, $prt, $ocp, $esc, $cor, $fax, $frm, $prv, $snd, $sex, $ano, $regiao) as $tupla) {
        $treemap .= '{"name": "' . $tupla->UFSigla . '", 
                                              "estado": "' . $tupla->UFNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

    $treemap .= '	        
                              ]
                            } 
                          ]
                        },
                ';

    $regiao = "Centro-Oeste";
    $treemap .= '
                        {
                          "colorId": 1,
                          "name": "' . $regiao . '",
                          "children": [
                            {
                              "name": "' . $regiao . '",
                              "children": [
                ';
    foreach (EixoDois::getter_region($var, $cad, $prt, $ocp, $esc, $cor, $fax, $frm, $prv, $snd, $sex, $ano, $regiao) as $tupla) {
        $treemap .= '{"name": "' . $tupla->UFSigla . '", 
                                              "estado": "' . $tupla->UFNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

    $treemap .= '	        
                              ]
                            } 
                          ]
                        },
                ';

    $regiao = "Nordeste";
    $treemap .= '
                        {
                          "colorId": 2,
                          "name": "' . $regiao . '",
                          "children": [
                            {
                              "name": "' . $regiao . '",
                              "children": [
                ';
    foreach (EixoDois::getter_region($var, $cad, $prt, $ocp, $esc, $cor, $fax, $frm, $prv, $snd, $sex, $ano, $regiao) as $tupla) {
        $treemap .= '{"name": "' . $tupla->UFSigla . '", 
                                              "estado": "' . $tupla->UFNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

    $treemap .= '	        
                              ]
                            } 
                          ]
                        },
                ';

    $regiao = "Norte";
    $treemap .= '
                        {
                          "colorId": 3,
                          "name": "' . $regiao . '",
                          "children": [
                            {
                              "name": "' . $regiao . '",
                              "children": [
                ';
    foreach (EixoDois::getter_region($var, $cad, $prt, $ocp, $esc, $cor, $fax, $frm, $prv, $snd, $sex, $ano, $regiao) as $tupla) {
        $treemap .= '{"name": "' . $tupla->UFSigla . '", 
                                              "estado": "' . $tupla->UFNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

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
}
else if($eixo == 2) {
    require_once("EixoTres.php");
    $treemap = '{
 			  "name": "region",
 			  	"children": [
			';


    $regiao = "Sul";
    $treemap .= '
                        {
                          "colorId": 5,
                          "name": "' . $regiao . '",
                          "children": [
                            {
                              "name": "' . $regiao . '",
                              "children": [
                ';
    foreach (EixoTres::getter_region($var, $cad, $mec, $pfj, $mod, $ano, $regiao) as $tupla) {
        $treemap .= '{"name": "' . $tupla->UFSigla . '", 
                                              "estado": "' . $tupla->UFNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

    $treemap .= '	        
                              ]
                            } 
                          ]
                        },
                ';


    $regiao = "Sudeste";
    $treemap .= '
                        {
                          "colorId": 4,
                          "name": "' . $regiao . '",
                          "children": [
                            {
                              "name": "' . $regiao . '",
                              "children": [
                ';
    foreach (EixoTres::getter_region($var, $cad, $mec, $pfj, $mod, $ano, $regiao) as $tupla) {
        $treemap .= '{"name": "' . $tupla->UFSigla . '", 
                                              "estado": "' . $tupla->UFNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

    $treemap .= '	        
                              ]
                            } 
                          ]
                        },
                ';

    $regiao = "Centro-Oeste";
    $treemap .= '
                        {
                          "colorId": 1,
                          "name": "' . $regiao . '",
                          "children": [
                            {
                              "name": "' . $regiao . '",
                              "children": [
                ';
    foreach (EixoTres::getter_region($var, $cad, $mec, $pfj, $mod, $ano, $regiao) as $tupla) {
        $treemap .= '{"name": "' . $tupla->UFSigla . '", 
                                              "estado": "' . $tupla->UFNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

    $treemap .= '	        
                              ]
                            } 
                          ]
                        },
                ';

    $regiao = "Nordeste";
    $treemap .= '
                        {
                          "colorId": 2,
                          "name": "' . $regiao . '",
                          "children": [
                            {
                              "name": "' . $regiao . '",
                              "children": [
                ';
    foreach (EixoTres::getter_region($var, $cad, $mec, $pfj, $mod, $ano, $regiao) as $tupla) {
        $treemap .= '{"name": "' . $tupla->UFSigla . '", 
                                              "estado": "' . $tupla->UFNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

    $treemap .= '	        
                              ]
                            } 
                          ]
                        },
                ';

    $regiao = "Norte";
    $treemap .= '
                        {
                          "colorId": 3,
                          "name": "' . $regiao . '",
                          "children": [
                            {
                              "name": "' . $regiao . '",
                              "children": [
                ';
    foreach (EixoTres::getter_region($var, $cad, $mec, $pfj, $mod, $ano, $regiao) as $tupla) {
        $treemap .= '{"name": "' . $tupla->UFSigla . '", 
                                              "estado": "' . $tupla->UFNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

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
}
else if($eixo == 3) {
    require_once("EixoQuatro.php");
    $treemap = '{
 			  "name": "region",
 			  	"children": [
			';


    $prc = "África";
    $treemap .= '
                        {
                          "colorId": 1,
                          "name": "' . $prc . '",
                          "children": [
                            {
                              "name": "' . $prc . '",
                              "children": [
                ';
    foreach (EixoQuatro::getter_region($var, $cad, $typ, $ano, $prc) as $tupla) {
        $treemap .= '{"name": "' . $tupla->ParceiroSigla . '", 
                                              "estado": "' . $tupla->ParceiroNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

    $treemap .= '	        
                              ]
                            } 
                          ]
                        },
                ';


    $prc = "América do Norte";
    $treemap .= '
                        {
                          "colorId": 2,
                          "name": "' . $prc . '",
                          "children": [
                            {
                              "name": "' . $prc . '",
                              "children": [
                ';
    foreach (EixoQuatro::getter_region($var, $cad, $typ, $ano, $prc) as $tupla) {
        $treemap .= '{"name": "' . $tupla->ParceiroSigla . '", 
                                              "estado": "' . $tupla->ParceiroNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

    $treemap .= '	        
                              ]
                            } 
                          ]
                        },
                ';

    $prc = "América do Sul";
    $treemap .= '
                        {
                          "colorId": 3,
                          "name": "' . $prc . '",
                          "children": [
                            {
                              "name": "' . $prc . '",
                              "children": [
                ';
    foreach (EixoQuatro::getter_region($var, $cad, $typ, $ano, $prc) as $tupla) {
        $treemap .= '{"name": "' . $tupla->ParceiroSigla . '", 
                                              "estado": "' . $tupla->ParceiroNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

    $treemap .= '	        
                              ]
                            } 
                          ]
                        },
                ';

    $prc = "Ásia";
    $treemap .= '
                        {
                          "colorId": 4,
                          "name": "' . $prc . '",
                          "children": [
                            {
                              "name": "' . $prc . '",
                              "children": [
                ';
    foreach (EixoQuatro::getter_region($var, $cad, $typ, $ano, $prc) as $tupla) {
        $treemap .= '{"name": "' . $tupla->ParceiroSigla . '", 
                                              "estado": "' . $tupla->ParceiroNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

    $treemap .= '	        
                              ]
                            } 
                          ]
                        },
                ';

    $prc = "Europa";
    $treemap .= '
                        {
                          "colorId": 5,
                          "name": "' . $prc . '",
                          "children": [
                            {
                              "name": "' . $prc . '",
                              "children": [
                ';
    foreach (EixoQuatro::getter_region($var, $cad, $typ, $ano, $prc) as $tupla) {
        $treemap .= '{"name": "' . $tupla->ParceiroSigla . '", 
                                              "estado": "' . $tupla->ParceiroNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

    $treemap .= '	        
                              ]
                            } 
                          ]
                        },
                ';

    $prc = "Oceania";
    $treemap .= '
                        {
                          "colorId": 6,
                          "name": "' . $prc . '",
                          "children": [
                            {
                              "name": "' . $prc . '",
                              "children": [
                ';
    foreach (EixoQuatro::getter_region($var, $cad, $typ, $ano, $prc) as $tupla) {
        $treemap .= '{"name": "' . $tupla->ParceiroSigla . '", 
                                              "estado": "' . $tupla->ParceiroNome . '",
                                              "percentual": "' . $tupla->Percentual . '",
                                              "taxa": "' . $tupla->Taxa . '", 
                                              "size": "' . $tupla->Valor . '"},';
    }

    $size = strlen($treemap);
    $treemap = substr($treemap, 0, $size - 1);

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
}

?>