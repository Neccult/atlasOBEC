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

    $atc    =   0;
    $cad    =   isset($_GET["cad"])   ?   $_GET["cad"]  :   0;
    $deg    =   isset($_GET["deg"])   ?   $_GET["deg"]  :   0;
    $ocp    =   isset($_GET["ocp"])   ?   $_GET["ocp"]  :   0;
    $mec    =   isset($_GET["mec"])   ?   $_GET["mec"]  :   0;	   /*== mecanismo ==*/
    $mod    =   isset($_GET["mod"])   ?   $_GET["mod"]  :   0;	   /*== modalidade ==*/
    $pfj    =   isset($_GET["pfj"])   ?   $_GET["pfj"]  :   0;	   /*== pessoa fisica/juridica ==*/
    $prc    =   isset($_GET["prc"])   ?   $_GET["prc"]  :   0;	   /*== Parceiro ==*/
    $typ    =   isset($_GET["typ"])   ?   $_GET["typ"]  :   0;	   /*== Tipo de atividade ==*/
    $subdeg =   isset($_GET["subdeg"])   ?   $_GET["subdeg"]  :   0;	   /*== Subdesagregação ==*/
    $ano    = $_GET["ano"];
    $eixo   = $_GET['eixo'];
}
else{
	$var = 1;
	
	$cad = 0;
	$ocp = 0;
    $mec = 0;
    $mod = 0;
    $pfj = 0;
    $typ = 0;
    $prc = 0;
	$ano = 2014;
	$eixo = 0;
}

//Trata o sexo
if($deg == 2){
    switch($subdeg) {
        case "0":
            $subdeg = NULL;
            break;
        case "1":
            $subdeg = 1;
            break;
        case "2":
            $subdeg = 0;
            break;
        default:
            $subdeg = NULL;
    }
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
    foreach (EixoUm::getter_region($var, $cad, $deg, $ano, $regiao) as $tupla) {
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
    foreach (EixoUm::getter_region($var, $cad, $deg, $ano, $regiao) as $tupla) {
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
    foreach (EixoUm::getter_region($var, $cad, $deg, $ano, $regiao) as $tupla) {
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
    foreach (EixoUm::getter_region($var, $cad, $deg, $ano, $regiao) as $tupla) {
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
    foreach (EixoUm::getter_region($var, $cad, $deg, $ano, $regiao) as $tupla) {
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
    foreach (EixoDois::getter_region($var, $cad, $ocp, $ano, $deg, $subdeg, $regiao) as $tupla) {
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
    foreach (EixoDois::getter_region($var, $cad, $ocp, $ano, $deg, $subdeg, $regiao) as $tupla) {
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
    foreach (EixoDois::getter_region($var, $cad, $ocp, $ano, $deg, $subdeg, $regiao) as $tupla) {
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
    foreach (EixoDois::getter_region($var, $cad, $ocp, $ano, $deg, $subdeg, $regiao) as $tupla) {
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
    foreach (EixoDois::getter_region($var, $cad, $ocp, $ano, $deg, $subdeg, $regiao) as $tupla) {
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