<?php 
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
    $slc    =   isset($_GET["slc"])   ?   $_GET["slc"]  :   0;	   /*== visualizacao ==*/
	$ano = $_GET["ano"];
    $eixo = $_GET['eixo'];
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
    $slc = 0;
    $prv = 0;
    $snd = 0;
	$ano = 2014;
	$eixo = 0;
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
    if($slc == 0) {
        for ($cad=1; $cad <= 10; $cad++) {

            $tupla = EixoDois::find($var, $uf, $cad, $prt, $ocp, $esc, $cor, $fax, $frm, $prv, $snd, $sex, $ano);

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

            $treemap .= ($cad != 10) ? ',' : '' ;
        }
    }
    else {
        for ($ocp=1; $ocp <= 3; $ocp++) {
            $tupla = EixoDois::find($var, $uf, 0, $prt, $ocp, $esc, $cor, $fax, $frm, $prv, $snd, $sex, $ano);

            $treemap .= '
                {
                  "colorId": "'.$ocp.'", 
                  "name": "'.$tupla->OcupacaoNome.'",
                  "children": [
                    {
                      "name": "'.$tupla->OcupacaoNome.'",
                      "children": [
                        {"name": "'.$tupla->OcupacaoNome.'",
                         "estado": "'.$tupla->UFNome.'",  
                         "percentual": "'.$tupla->Percentual.'",
                         "taxa": "'.$tupla->Taxa.'", 
                         "size": "'.$tupla->Valor.'"}
                      ]
                    } 
                  ]
                }
            ';

            $treemap .= ($ocp != 3) ? ',' : '' ;
        }
    }
}
else if($eixo == 2) {
    require_once("EixoTres.php");
    for ($cad=1; $cad <= 10; $cad++) {

        $tupla = EixoTres::find($var, $uf, $atc, $cad, $prt, $ano);

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

        $treemap .= ($cad != 10) ? ',' : '' ;

    }
}
if($eixo == 3) {
    require_once("EixoQuatro.php");
    for ($cad=1; $cad <= 10; $cad++) {

        $tupla = EixoQuatro::find($var, $uf, $atc, $cad, $prt, $ano);

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

        $treemap .= ($cad != 10) ? ',' : '' ;

    }
}

$treemap .= '
				]
			}
			';

echo $treemap;

?>