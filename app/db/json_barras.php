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
	$var    =   $_GET["var"];
	$uf     =   isset($_GET["uf"])    ?   $_GET["uf"]   :   0;

	$cad    =   isset($_GET["cad"])   ?   $_GET["cad"]  :   0; 
    $ocp    =   isset($_GET["ocp"])   ?   $_GET["ocp"]  :   0;
    $mec    =   isset($_GET["mec"])   ?   $_GET["mec"]  :   0;	   /*== mecanismo ==*/
    $mod    =   isset($_GET["mod"])   ?   $_GET["mod"]  :   0;	   /*== modalidade ==*/
    $pfj    =   isset($_GET["pfj"])   ?   $_GET["pfj"]  :   0;	   /*== pessoa fisica/juridica ==*/
    $uos    =   isset($_GET["uos"])   ?   $_GET["uos"]  :   0;	   /*== UF ou Setores ==*/
    $prc    =   isset($_GET["prc"])   ?   $_GET["prc"]  :   0;	   /*== Parceiro ==*/
    $slc    =   isset($_GET["slc"])   ?   $_GET["slc"]  :   0;	   /*== Parceiro ==*/
    $typ    =   isset($_GET["typ"])   ?   $_GET["typ"]  :   0;	   /*== Tipo de atividade ==*/
    $ano    =   isset($_GET["ano"])   ?   $_GET["ano"]  :NULL;	   /*== Ano ==*/
    $deg    =   isset($_GET["deg"])   ?   $_GET["deg"]  :   0;
    $subdeg =   isset($_GET["subdeg"])   ?   $_GET["subdeg"]  :   0;

    $mundo  =   isset($_GET['mundo']) ?   $_GET['mundo']:   0;
    $eixo   =   isset($_GET['eixo'])  ?   $_GET['eixo'] :   0;
}
else{
	$var = 1;
	$uf = 0;
	$mundo = 0;
	$cad = 0;
    $ocp = 0;
    $slc = 0;
    $mec = 0;
    $mod = 0;
    $pjj = 0;
    $uos = 0;
    $typ = 0;
    $prc = 0;
    $deg = 0;
    $subdeg = 0;
    $ano = NULL;
	$eixo = 0;
}

function getNameUF($id){
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

function getNameOCP($slc) {
    switch ($slc) {
        case 1:
            return "Relacionadas";
        case 2:
            return "Culturais";
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

function getNameDesag($deg, $tupla) {
    switch ($deg) {
        case 1:
            return getNamePorte($tupla->idPorte);
        case 2:
            return getNameSexo($tupla->Sexo);
        case 3:
            return getNameIdade($tupla->idIdade);
        case 4:
            return getNameEscolaridade($tupla->idEscolaridade);
        case 5:
            return getNameEtinia($tupla->idEtinia);
        case 6:
            return getNameFormalidade($tupla->Formalidade);
        case 7:
            return getNamePrev($tupla->Previdencia);
        case 8:
            return getNameSindical($tupla->Sindical);
    }
}

function getNamePorte($id) {
    switch ($id) {
        case 1:
            return "Micro";
        case 2:
            return "Pequena";
        case 3:
            return "Média";
        case 4:
            return "Grande";
    }
}

function getNameSexo($id) {
    switch ($id) {
        case 0:
            return "Feminino";
        case 1:
            return "Masculino";
        case 2:
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
            return "Sem Instrução";
        case 2:
            return "Fundamental Incompleto";
        case 3:
            return "Fundamental Completo";
        case 4:
            return "Médio Completo";
        case 5:
            return "Superior Incompleto";
        case 6:
            return "Superior Completo";
        case 7:
            return "Não Determinado";
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
        case 1:
            return "Formal";
        case 2:
            return "Informal";

    }
}

function getNamePrev($id) {
    switch ($id) {
        case 1:
            return "Contribuinte";
        case 2:
            return "Não contribuinte";

    }
}

function getNameSindical($id) {
    switch ($id) {
        case 1:
            return "Membro";
        case 2:
            return "Não membro";

    }
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

$barras = array();
if($eixo == 0) {
    require_once("EixoUm.php");
    foreach (EixoUm::getter_barras($var, $uf, $cad, $deg, $uos) as $tupla) {

        // $barras[$tupla->Ano] = $tupla->Valor;

        $id = $tupla->Ano;
        $barras[$id]['uf'] = $tupla->UFNome;
        $barras[$id]['ano'] = (int) $tupla->Ano;
        $barras[$id]['valor'] = (double) $tupla->Valor;
        $barras[$id]['percentual'] = (double) $tupla->Percentual;
        $barras[$id]['taxa'] = (double) $tupla->Taxa;

    }
}
else if($eixo == 1 && $var > 11) {
    require_once("EixoDois.php");

    foreach (EixoDois::getter_barras($var, $uf, $cad, $ocp, $uos, $slc, $deg, $subdeg, $ano) as $tupla) {
        // $barras[$tupla->Ano] = $tupla->Valor;


        if($deg == 0 || $var == 4 || $var == 5 || $var == 6) {
            if($var == 6 && $uos == 1 && $deg == 0 && $ocp == 0){
                $id = sigla_cadeia(getNameCadeia($tupla->idCadeia));
                
                $barras[$id]['uf'] = getNameUF($tupla->idUF);
                $barras[$id]['ano'] = (int) $tupla->Ano;
                $barras[$id]['valor'] = (double) $tupla->Valor;
                $barras[$id]['percentual'] = (double) $tupla->Percentual;
                $barras[$id]['taxa'] = (double) $tupla->Taxa;
            }
            else if($var == 6 && $uos == 1 && $deg == 0 && $ocp != 0){
                $id = getNameOCP($tupla->idOcupacao);
                $barras[$id]['uf'] = getNameUF($tupla->idUF);
                $barras[$id]['ano'] = (int) $tupla->Ano;
                $barras[$id]['valor'] = (double) $tupla->Valor;
                $barras[$id]['percentual'] = (double) $tupla->Percentual;
                $barras[$id]['taxa'] = (double) $tupla->Taxa;
            }
            else if($var == 6 && $uos == 1 && $deg != 0){
                $id = getNameDesag($deg, $tupla);
                $barras[$id]['uf'] = getNameUF($tupla->idUF);
                $barras[$id]['ano'] = (int) $tupla->Ano;
                $barras[$id]['valor'] = (double) $tupla->Valor;
                $barras[$id]['percentual'] = (double) $tupla->Percentual;
                $barras[$id]['taxa'] = (double) $tupla->Taxa;
            }
            else{

                $id = $tupla->Ano;
                $barras[$id]['ano'] = (int) $tupla->Ano;
                $barras[$id]['valor'] = (double) $tupla->Valor;
                $barras[$id]['percentual'] = (double) $tupla->Percentual;
                $barras[$id]['taxa'] = (double) $tupla->Taxa;
            }



        }
        else if($ocp == 3 && $deg != 0) {

            $id = $tupla->Ano;
            if($slc == 1) {
                if($id == 2011) {
                    $id = 2010;
                }
                if($id == 2012) {
                    $id = 2011;
                }
                if($id == 2013) {
                    $id = 2012;
                }
                if($id == 2014) {
                    $id = 2013;
                }
                if($id == 2015) {
                    $id = 2014;
                }
            }

            $nomeDesag = getNameDesag($deg, $tupla);

            $barras[intval($id-2007)]['year'] = (string)$tupla->Ano;
            if(!isset($barras[intval($id-2007)][$nomeDesag]))
                $barras[intval($id-2007)][$nomeDesag] = 0;

            $barras[intval($id-2007)][$nomeDesag] += (double)$tupla->Valor;
        }
        else{

            $id = $tupla->Ano;
            if($slc == 1) {
                if($id == 2011) {
                    $id = 2010;
                }
                if($id == 2012) {
                    $id = 2011;
                }
                if($id == 2013) {
                    $id = 2012;
                }
                if($id == 2014) {
                    $id = 2013;
                }
                if($id == 2015) {
                    $id = 2014;
                }
            }

            if($cad == 0 && $ocp == 0){
                $nomeDesag = getNameDesag($deg, $tupla);

                $barras[intval($id-2007)]['year'] = (string)$tupla->Ano;
                if(!isset($barras[intval($id-2007)][$nomeDesag])) {
                    $barras[intval($id - 2007)][$nomeDesag] = 0;
                }
                else{
                    $barras[intval($id-2007)][$nomeDesag] += (double)$tupla->Valor;
                }
            }
            else{
                $nomeDesag = getNameDesag($deg, $tupla);

                $barras[intval($id-2007)]['year'] = (string)$tupla->Ano;
                $barras[intval($id - 2007)][$nomeDesag] = 0;
                $barras[intval($id-2007)][$nomeDesag] = (double)$tupla->Valor;
            }


        }
    }
}
else if($eixo == 1) {
    require_once("EixoDois.php");

    foreach (EixoDois::getter_barras($var, $uf, $cad, $ocp, $uos, $slc, $deg, $subdeg, $ano) as $tupla) {
        // $barras[$tupla->Ano] = $tupla->Valor;


        if($deg == 0 || $var == 4 || $var == 5 || $var == 6) {
            if($var == 6 && $uos == 1 && $deg == 0 && $ocp == 0){
                $id = sigla_cadeia(getNameCadeia($tupla->idCadeia));

                $barras[$id]['uf'] = getNameUF($tupla->idUF);
                $barras[$id]['ano'] = (int) $tupla->Ano;
                $barras[$id]['valor'] = (double) $tupla->Valor;
                $barras[$id]['percentual'] = (double) $tupla->Percentual;
                $barras[$id]['taxa'] = (double) $tupla->Taxa;
            }
            else if($var == 6 && $uos == 1 && $deg == 0 && $ocp != 0){
                $id = getNameOCP($tupla->idOcupacao);
                $barras[$id]['uf'] = getNameUF($tupla->idUF);
                $barras[$id]['ano'] = (int) $tupla->Ano;
                $barras[$id]['valor'] = (double) $tupla->Valor;
                $barras[$id]['percentual'] = (double) $tupla->Percentual;
                $barras[$id]['taxa'] = (double) $tupla->Taxa;
            }
            else if($var == 6 && $uos == 1 && $deg != 0){
                $id = getNameDesag($deg, $tupla);
                $barras[$id]['uf'] = getNameUF($tupla->idUF);
                $barras[$id]['ano'] = (int) $tupla->Ano;
                $barras[$id]['valor'] = (double) $tupla->Valor;
                $barras[$id]['percentual'] = (double) $tupla->Percentual;
                $barras[$id]['taxa'] = (double) $tupla->Taxa;
            }
            else{

                $id = $tupla->Ano;
                $barras[$id]['ano'] = (int) $tupla->Ano;
                $barras[$id]['valor'] = (double) $tupla->Valor;
                $barras[$id]['percentual'] = (double) $tupla->Percentual;
                $barras[$id]['taxa'] = (double) $tupla->Taxa;
            }



        }
        else if($ocp == 3 && $deg != 0) {

            $id = $tupla->Ano;
            if($slc == 1) {
                if($id == 2011) {
                    $id = 2010;
                }
                if($id == 2012) {
                    $id = 2011;
                }
                if($id == 2013) {
                    $id = 2012;
                }
                if($id == 2014) {
                    $id = 2013;
                }
                if($id == 2015) {
                    $id = 2014;
                }
            }

            $nomeDesag = getNameDesag($deg, $tupla);

            $barras[intval($id-2007)]['year'] = (string)$tupla->Ano;
            if(!isset($barras[intval($id-2007)][$nomeDesag]))
                $barras[intval($id-2007)][$nomeDesag] = 0;

            $barras[intval($id-2007)][$nomeDesag] += (double)$tupla->Valor;
        }
        else{

            $id = $tupla->Ano;
            if($slc == 1) {
                if($id == 2011) {
                    $id = 2010;
                }
                if($id == 2012) {
                    $id = 2011;
                }
                if($id == 2013) {
                    $id = 2012;
                }
                if($id == 2014) {
                    $id = 2013;
                }
                if($id == 2015) {
                    $id = 2014;
                }
            }

            if($cad == 0 && $ocp == 0){
                $nomeDesag = getNameDesag($deg, $tupla);

                $barras[intval($id-2007)]['year'] = (string)$tupla->Ano;
                if(!isset($barras[intval($id-2007)][$nomeDesag])) {
                    $barras[intval($id - 2007)][$nomeDesag] = 0;
                }
                else{
                    $barras[intval($id-2007)][$nomeDesag] += (double)$tupla->Valor;
                }
            }
            else{
                $nomeDesag = getNameDesag($deg, $tupla);

                $barras[intval($id-2007)]['year'] = (string)$tupla->Ano;
                $barras[intval($id - 2007)][$nomeDesag] = 0;
                $barras[intval($id-2007)][$nomeDesag] = (double)$tupla->Valor;
            }


        }
    }
}
else if($eixo == 2) {
    require_once("EixoTres.php");
        foreach (EixoTres::getter_barras($var, $uf, $cad, $mec, $pfj, $mod, $ano, $uos) as $tupla) {

            if ($var < 15) {
                if($var == 10){
                    $id = $tupla->Ano;
                    $barras[$id]['ano'] = (int)$tupla->Ano;
                    $barras[$id]['valor'] = (double)$tupla->Valor;
                    $barras[$id]['percentual'] = (double)$tupla->Percentual;
                    $barras[$id]['taxa'] = (double)$tupla->Taxa;
                }
                else{
                    $id = $tupla->Ano;
                    $barras[$id]['uf'] = $tupla->UFNome;
                    $barras[$id]['ano'] = (int)$tupla->Ano;
                    $barras[$id]['valor'] = (double)$tupla->Valor;
                    $barras[$id]['percentual'] = (double)$tupla->Percentual;
                    $barras[$id]['taxa'] = (double)$tupla->Taxa;
                }

            }
            else if(($var == 18 || $var == 19)) {
                if($uos == 1){
                    $id = sigla_cadeia(getNameCadeia($tupla->idCadeia));
                    $barras[$id]['uf'] = $tupla->UFNome;
                    $barras[$id]['ano'] = (int) $tupla->Ano;
                    $barras[$id]['valor'] = (double) $tupla->Valor;
                    $barras[$id]['percentual'] = (double) $tupla->Percentual;
                    $barras[$id]['taxa'] = (double) $tupla->Taxa;
                }
                else{
                    $id = $tupla->Ano;
                    $barras[$id]['ano'] = (int)$tupla->Ano;
                    $barras[$id]['valor'] = (double)$tupla->Valor;
                    $barras[$id]['percentual'] = (double)$tupla->Percentual;
                    $barras[$id]['taxa'] = (double)$tupla->Taxa;
                    $barras[$id]['uos'] = (int)$uos;
                }


            }
            else {
                    $id = $tupla->Ano;
                    $barras[$id]['ano'] = (int)$tupla->Ano;
                    $barras[$id]['valor'] = (double)$tupla->Valor;
                    $barras[$id]['percentual'] = (double)$tupla->Percentual;
                    $barras[$id]['taxa'] = (double)$tupla->Taxa;
                    $barras[$id]['uos'] = (int)$uos;
                }
        }

}
else if($eixo == 3) {
    require_once("EixoQuatro.php");
    foreach (EixoQuatro::getter_barras($var, $prc, $cad, $typ, $uf, $mundo, $slc, $uos) as $tupla) {

        
        $id = $tupla->Ano;
        $barras[$id]['uf'] = $tupla->UFNome;
        $barras[$id]['prc'] = $tupla->ParceiroNome;
        $barras[$id]['ano'] = (int) $tupla->Ano;

        $barras[$id]['valor'] = (double) $tupla->Valor;
        $barras[$id]['percentual'] = (double) $tupla->Percentual;
        $barras[$id]['taxa'] = (double) $tupla->Taxa;

    }

}

echo json_encode($barras);

?>