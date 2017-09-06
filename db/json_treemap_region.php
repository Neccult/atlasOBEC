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

require_once("EixoUm.php");

if (!empty($_GET["var"])) {

	$var = $_GET["var"];

	$atc = $_GET["atc"];
	$cad = $_GET["cad"];
	$prt = $_GET["prt"];
	$ano = $_GET["ano"];
    $eixo = $_GET['eixo'];
}
else{
	$var = 1;
	
	$atc = 0;
	$cad = 0;
	$prt = 0;
	$ano = 2014;
	$eixo = 0;
}


if($eixo == 0) {
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
    foreach (EixoDois::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
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
    foreach (EixoDois::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
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
    foreach (EixoDois::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
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
    foreach (EixoDois::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
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
    foreach (EixoDois::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
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
    foreach (EixoTres::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
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
    foreach (EixoTres::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
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
    foreach (EixoTres::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
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
    foreach (EixoTres::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
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
    foreach (EixoTres::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
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
    foreach (EixoQuatro::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
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
    foreach (EixoQuatro::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
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
    foreach (EixoQuatro::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
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
    foreach (EixoQuatro::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
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
    foreach (EixoQuatro::getter_region($var, $atc, $cad, $prt, $ano, $regiao) as $tupla) {
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

?>