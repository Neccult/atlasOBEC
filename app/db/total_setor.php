<?php
    $var    =   isset($_GET["var"])   ?   $_GET["var"]  :   0;
    $eixo   =   isset($_GET["eixo"])  ?   $_GET["eixo"] :   0;
    $cad    =   isset($_GET["cad"])   ?   $_GET["cad"]  :   0;
    $deg    =   isset($_GET["deg"])   ?   $_GET["deg"]  :   0;

    if($deg != 0){
        $deg = $deg - 8;
    }

    $json = array();
    if($eixo == 0){
        require_once("EixoUm.php");
        $vars = array(1,4,5,6,7,8);

        if(in_array($var, $vars)){
            foreach(EixoUm::getMaxValueSetor($var, $cad, $deg) as $result){
                $json[$result->Ano] = $result->Valor;
            }
        }
        
    }

    echo json_encode($json);

?>