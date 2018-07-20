<?php

###	Classe que manipula as variáveis do Eixo 2 ###

require('config.db.php');

class EixoDois {

## Atributos ##

    protected static $table = 'Eixo_2';
    private static $conn;

    //informações Eixo_2
    protected $id;
    public $Numero;
    public $idUF;
    public $idCadeia;
    public $idPorte;
    public $idOcupacao;
    public $idEscolaridade;
    public $idEtinia;
    public $idIdade;

    public $Formalidade;
    public $Previdencia;
    public $Sindical;
    public $Sexo;

    public $Ano;
    public $Valor;
    public $Percentual;
    public $Taxa;

    //informações UF
    public $UFNome;
    public $UFRegiao;
    public $UFSigla;

    //informações Cadeia
    public $CadeiaNome;

    //informações Porte
    public $PorteNome;

    //informações Ocupação
    public $OcupacaoNome;

    //informações Escolaridade
    public $EscolaridadeNome;

    //informações Etinia
    public $EtiniaNome;

    //informações Idade
    public $IdadeNome;

## Metodos ##

    /*-----------------------------------------------------------------------------
    Função: Connect
        função para estabelecer conexão do objeto com o banco de dados
    Entrada:
        void
    Saída:
        Positivo = Retorna PDO de conexão com o banco de dados
        Negativo = Erro de conexão
    -----------------------------------------------------------------------------*/
    public static function connect(){

        $conexao = mysqli_connect(DB_HOST, DB_USUARIO, DB_SENHA, DB_NOME);

        if (mysqli_connect_errno())
        {
            echo "Failed to connect to MySQL: " . mysqli_connect_error();
        }

        self::$conn = $conexao;
        mysqli_query($conexao, 'SET NAMES utf8');
    }

    /*-----------------------------------------------------------------------------
    Função: Disconnect
        função para desconectar o objeto do banco de dados
    Entrada:
        void
    Saída:
        valor de retorno do mysql_close()
    -----------------------------------------------------------------------------*/
    public static function disconnect(){
        mysqli_close(self::$conn);
    }

    /*-----------------------------------------------------------------------------
	Função: getter_most_recent_year
	    função para buscar o ano mais recente no banco de dados para todas as variáveis
	Saída:
	    Array com os resultados da busca
	-----------------------------------------------------------------------------*/
    public static function getter_most_recent_year(){
        self::connect();

        $query = "SELECT DISTINCT Ano, Numero, idOcupacao FROM `Eixo_2` WHERE `idUF` = 0 and (idOcupacao = 0 OR idOcupacao = 1)";
        
        $stmt = mysqli_stmt_init(self::$conn);
        mysqli_stmt_prepare($stmt, $query);        
        $stmt->execute();
        
        $allObjects = array();
        $allObjects = self::fetch_results($stmt);
		self::disconnect();
        
        return $allObjects;
    }

	public static function getAnoDefault($var){
		self::connect();

		$query = "SELECT MAX(Ano) AS Ano FROM `Eixo_2` WHERE (idUF = 11 or idUF = 0) AND Numero = ? GROUP BY Numero";

        $stmt = mysqli_stmt_init(self::$conn);
        if (mysqli_stmt_prepare($stmt, $query)) {
            $stmt->bind_param(
                's',
                $var
            );
            $stmt->execute();
            $obj = self::fetch_results($stmt)[0];
        }

		self::disconnect();

		$ano = $obj->Ano;

		return $ano;
	}
    
    /**
     * fetch_results - para funcionar com prepared statements
     * @param mixed $stmt
     * @return array
     */
    public static function fetch_results($stmt) {
        $result_array = [];
        $result_object = $stmt->get_result();
        $keys = $result_object->fetch_fields();
        
        while ($row = $result_object->fetch_object()) {
            $result_array[] = $row;
        }
        return $result_array;
    }
    
	/*-----------------------------------------------------------------------------
	Função: All
	    função para buscar todas tupla no banco de dados
	Entrada: 
	    void
	Saída:
	    Todas instancia da Classe EixoDois com seus devidos atributos 
	-----------------------------------------------------------------------------*/
	public static function all(){
		self::connect();
			// $query = "SELECT * FROM ".self::$table." ORDER BY id";
			$query = "SELECT * FROM ".self::$table." AS ex"
						." JOIN UF AS uf ON uf.idUF = ex.idUF"
						." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia"
						." JOIN Porte AS prt ON prt.idPorte = ex.idPorte"
						." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao"
						." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade"
						." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia"
						." JOIN Idade AS idd ON idd.idIdade = ex.idIdade"
						." ORDER BY id";

			$result = mysqli_query(self::$conn, $query);
			$allObjects = array();

			while($obj = mysqli_fetch_object($result, 'EixoDois')){
				$allObjects[] = $obj;
			}

		self::disconnect();
		
		return $allObjects;
	}

    /*-----------------------------------------------------------------------------
    Função: Find
        função para buscar um conjunto de tupla no banco de dados
    Entrada:
        $var = número da váriavel
        $ufs = id do UF
        $cad = id do SCC
        $prt = id do porte
        $ocp = id da ocupação
        $esc = id da escolaridade
        $etn = id do etinia
        $idd = id da idade
        $form = flag formalidade
        $prev = flag previdencia
        $sind = flag sindical
        $sexo = flag sexos
        $anos = ano
    Saída:
        Um conjunto de instâncias da Classe EixoDois com seus devidos atributos

    -----------------------------------------------------------------------------*/
    public static function find($var, $uf, $ocp, $desag, $anos){

        self::connect();
        $params = [];
        $query = "SELECT * FROM ".self::$table." WHERE Numero =? AND idUF = ?";

        $params[] = $var;
        $params[] = $uf;
        
        $stmt = mysqli_stmt_init(self::$conn);

        if($ocp == 0){
            $query .= " AND idCadeia > 0";
            $query .= " AND idOcupacao = 0";
        } else {
            $query .= " AND (idOcupacao = 1 OR idOcupacao = 2)";
        }
        if($desag == 2){
            $query .= " AND Sexo IS NOT NULL";
        } else {
            $query .= " AND Sexo IS NULL";
        }
        $query .= self::concatDeg($desag, 1, "idPorte");
        $query .= self::concatDeg($desag, 3, "idIdade");
        $query .= self::concatDeg($desag, 4, "idEscolaridade");
        $query .= self::concatDeg($desag, 5, "idEtinia");
        $query .= self::concatDeg($desag, 6, "Formalidade");
        $query .= self::concatDeg($desag, 7, "Previdencia");
        $query .= self::concatDeg($desag, 8, "Sindical");

        if ($anos > 0) {
            $query .= " AND Ano = ?";
            $params[] = $anos;
        }
        
        if($ocp == 0) {
            $query .= " ORDER BY `Eixo_2`.`idCadeia` ASC";
        } else {
            $query .= " ORDER BY `Eixo_2`.`idOcupacao` ASC";
        }

        $paramsStr = '';
        foreach ($params as $param) {
            $paramsStr .= 's';
        }
        $allObjects = [];
        
        $stmt = mysqli_stmt_init(self::$conn);
        if (mysqli_stmt_prepare($stmt, $query)) {
            $stmt->bind_param($paramsStr, ...$params);
            
            $stmt->execute();
            $allObjects = self::fetch_results($stmt);
        }

        self::disconnect();
        
        return $allObjects;
    }

    /*-----------------------------------------------------------------------------
    Função: Getter Mapa
        função para obter um conjunto de tuplas para o mapa
    Entrada:
        $var = número da váriavel
        $cad = id do SCC
        $ocp = id da ocupação
        $anos = ano
    Saída:
        Um conjunto de instâncias da Classe EixoDois com seus devidos atributos
    -----------------------------------------------------------------------------*/
    public static function getter_mapa($var, $cad, $ocp, $anos){

        self::connect();
        $stmt = mysqli_stmt_init(self::$conn);
        $params = [];
        
        if($ocp == 3){
            $query = "SELECT * FROM ".self::$table." AS ex"
                ." JOIN UF AS uf ON uf.idUF = ex.idUF"
                ." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
                ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = 0"
                ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao != 0"
                ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = 0"
                ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = 0"
                ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = 0"
                ." WHERE ex.Numero = ?"
                ." AND Sindical = 0"
                ." AND Previdencia = 0"
                ." AND Formalidade = 0"
                ." AND ex.Sexo IS NULL";

            $params[] = $cad;
            $params[] = $var;

            
        } else {
            $query = "SELECT * FROM ".self::$table." AS ex"
                ." JOIN UF AS uf ON uf.idUF = ex.idUF"
                ." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
                ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = 0"
                ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = 0"
                ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = 0"
                ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = 0"

                   
                ." WHERE ex.Numero = ?"
                ." AND Sindical = 0"
                ." AND Previdencia = 0"
                ." AND Formalidade = 0"
                ." AND ex.Sexo IS NULL";
        };

        $params = [];
        $params[] = $cad;
        if($ocp != 3){
            $params[] = $ocp;
        }
        $params[] = $var;
        if ($anos > 0) {
            $query .= " AND ex.Ano = ?";
            $params[] = $anos;
        }
            
        $paramsStr = '';
        foreach ($params as $param) {
            $paramsStr .= 's';
        }
        $allObjects = [];
        
        $stmt2 = mysqli_stmt_init(self::$conn);
        if (mysqli_stmt_prepare($stmt2, $query)) {
            $stmt2->bind_param($paramsStr, ...$params);
            
            $stmt2->execute();
            $allObjects = self::fetch_results($stmt2);
        }
        
        if($ocp == 3){
            $params = [];
            $query_max_ocp1 = "SELECT MAX(Valor) as Valor FROM ".self::$table
                            ." WHERE idOcupacao=1"
                            ." AND Numero =?"
                            ." AND Ano=?"
                            ." AND idUF = 0"
                            ." GROUP BY Ano";
           
            $params[] = $var;
            $params[] = $anos;

            $paramsStr = '';
            foreach ($params as $param) {
                $paramsStr .= 's';
            }
            
            $stmt3 = mysqli_stmt_init(self::$conn);
            if (mysqli_stmt_prepare($stmt3, $query_max_ocp1)) {
                $stmt3->bind_param($paramsStr, ...$params);
                
                $stmt3->execute();
                $obj1 = self::fetch_results($stmt3)[0];
            }

            
            $query_max_ocp2 = "SELECT MAX(Valor) as Valor FROM ".self::$table
                            ." WHERE idOcupacao=2"
                            ." AND Numero =?"
                            ." AND Ano=?"
                            ." AND idUF = 0"
                            ." GROUP BY Ano";

//            echo $query;

            
            $stmt4 = mysqli_stmt_init(self::$conn);
            if (mysqli_stmt_prepare($stmt4, $query_max_ocp2)) {
                $stmt4->bind_param($paramsStr, ...$params);
                
                $stmt4->execute();
                $obj2 = self::fetch_results($stmt4)[0];
            }            
            $brasil_total = $obj1->Valor + $obj2->Valor;
            
            $result_aux = array();
            $value_aux = array();
            $percent_aux = array();
            foreach ($allObjects as $data) {
                if(!isset($value_aux[$data->idUF])) $value_aux[$data->idUF] = 0;
                if(!isset($percent_aux[$data->idUF])) $percent_aux[$data->idUF] = 0;
                $value_aux[$data->idUF] += $data->Valor;
                $percent_aux[$data->idUF] += $data->Valor/$brasil_total;
                $result_aux[$data->idUF] = $data;
                $result_aux[$data->idUF]->Valor = $value_aux[$data->idUF];
                $result_aux[$data->idUF]->Percentual = $percent_aux[$data->idUF];
            }
            $allObjects = $result_aux;
        }


        self::disconnect();

        return $allObjects;
    }

    /*-----------------------------------------------------------------------------
    Função: Getter Barras
        função para obter um conjunto de tuplas para o barras
    Entrada:
        $var = número da váriavel
        $ufs = id do UF
        $cad = id do SCC
        $prt = id do porte
        $ocp = id da ocupação
        $esc = id da escolaridade
        $etn = id do etinia
        $idd = id da idade
        $form = flag formalidade
        $prev = flag previdencia
        $sind = flag sindical
        $sexo = flag sexos
    Saída:
        Um conjunto de instâncias da Classe EixoDois com seus devidos atributos
    -----------------------------------------------------------------------------*/
    public static function getter_barras($var, $uf, $cad, $ocp, $uos, $slc, $desag, $subdeg, $ano){
        self::connect();
        $query = "SELECT * FROM ".self::$table." WHERE Numero =? AND idUF = ?";

        $params = [];
        $params[] = $var;
        $params[] = $uf;
        
        if($ocp == 0){
            if($var > 11) {
                $query .= " AND idCadeia = ?";
                $params[] = $uos;
            }  else if($desag != 0 && $cad == 0) {
                $query .= " AND idCadeia != 0";
            } else {
                if($uos == 1 && $var == 6 && $desag == 0) {
                    $query .= " AND idCadeia != 0";
                } else {
                    $query .= " AND idCadeia = ?";
                    $params[] = $cad;
                }
            }
            $query .= " AND idOcupacao = 0";
        }
        else if($var == 6 && $ocp != 0) {
            $query .= " AND (idOcupacao = 1 OR idOcupacao = 2)";
        } else if($ocp == 1){
            $query .= " AND idOcupacao = 1";
        } else if($ocp == 2){
            $query .= " AND idOcupacao = 2";
        } else if($ocp == 3){
            //Os índices IHH e C4 da ocupação são definidos pelo uos
            if($var > 11){
                if($uos == 0){
                    $query .= " AND idOcupacao = 1";
                } else {
                    $query .= " AND idOcupacao = 2";
                }
                
            } else {
                $query .= " AND (idOcupacao = 1 OR idOcupacao = 2)";
            }            
        }
        
        $var_single_deg = array(4, 5);
        
        if(in_array($var, $var_single_deg) || ($var == 6 && $uos == 0)){
            if($desag == 2 && $subdeg >= 0) {
                $query .= " AND Sexo = ?";
                $params[] = $subdeg;
            } else {
                $query .= " AND Sexo is NULL";
            }

            $query .= " AND idPorte = ?";
            $query .= " AND idIdade = ?";
            $query .= " AND idEscolaridade = ?";
            $query .= " AND idEtinia = ?";
            $query .= " AND Formalidade = ?";
            $query .= " AND Previdencia = ?";
            $query .= " AND Sindical = ?";
            
            $params[] = self::concatValueDeg($desag, 1, $subdeg);
            $params[] = self::concatValueDeg($desag, 3, $subdeg);
            $params[] = self::concatValueDeg($desag, 4, $subdeg);
            $params[] = self::concatValueDeg($desag, 5, $subdeg);
            $params[] = self::concatValueDeg($desag, 6, $subdeg);
            $params[] = self::concatValueDeg($desag, 7, $subdeg);
            $params[] = self::concatValueDeg($desag, 8, $subdeg);

        }
        else {
            if($desag == 2) {
                $query .= " AND (Sexo = 1 OR Sexo = 0)";
            } else {
                $query .= " AND Sexo IS NULL";
            }
            
            $query .= self::concatDeg($desag, 1, "idPorte");
            $query .= self::concatDeg($desag, 3, "idIdade");
            $query .= self::concatDeg($desag, 4, "idEscolaridade");
            $query .= self::concatDeg($desag, 5, "idEtinia");
            $query .= self::concatDeg($desag, 6, "Formalidade");
            $query .= self::concatDeg($desag, 7, "Previdencia");
            $query .= self::concatDeg($desag, 8, "Sindical");
        }
        
        if($uos == 1 && $var == 6){
            $query .= " AND Ano = ?";
            $params[] = $ano;
        }

        $paramsStr = '';
        foreach ($params as $param) {
            $paramsStr .= 's';
        }
        
        $stmt = mysqli_stmt_init(self::$conn);
        if (mysqli_stmt_prepare($stmt, $query)) {
            $stmt->bind_param($paramsStr, ...$params);
            
            $stmt->execute();
            $allObjects = self::fetch_results($stmt);
        }
        
        if($ocp == 3 && $desag == 0 && !(($var == 4 || $var == 5) && $uos == 1)
            || ($ocp == 0 && $desag == 0 && $cad == 0 && $uos != 1)
            || (($var == 4 || $var == 5) && $ocp == 3 && $desag != 0)){

            $result_aux = array();
            $value_aux = array();
            $percent_aux = array();
            foreach ($allObjects as $data) {
                if(!isset($value_aux[$data->Ano])) $value_aux[$data->Ano] = 0;
                if(!isset($percent_aux[$data->Ano])) $percent_aux[$data->Ano] = 0;
                $value_aux[$data->Ano] += $data->Valor;
                $percent_aux[$data->Ano] += $data->Percentual;
                $result_aux[$data->Ano] = $data;
                $result_aux[$data->Ano]->Valor = $value_aux[$data->Ano];
                $result_aux[$data->Ano]->Percentual = $percent_aux[$data->Ano];
            }
            $allObjects = $result_aux;
        }
        self::disconnect();

        return $allObjects;
    }


    /*-----------------------------------------------------------------------------
    Função: Getter Region
        função para obter um conjunto de tuplas para treemap region
    Entrada:
        $var = número da váriavel
        $cad = id do SCC
        $prt = id do porte
        $ocp = id da ocupação
        $esc = id da escolaridade
        $etn = id do etinia
        $idd = id da idade
        $form = flag formalidade
        $prev = flag previdencia
        $sind = flag sindical
        $sexo = flag sexos
        $anos = ano
        $regiao = região do Brasil
    Saída:
        Um conjunto de instâncias da Classe EixoDois com seus devidos atributos
    -----------------------------------------------------------------------------*/
    public static function getter_region($var, $cad, $ocp, $anos, $deg, $subdeg, $regiao){

        self::connect();
        $params = [];
        if(is_null($subdeg)) {
            if($ocp != 0) {
                $query = "SELECT * FROM ".self::$table." AS ex"
                    ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.UFRegiao LIKE '?'"
                    ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                    ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                    ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                    ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                    ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                    ." WHERE ex.Numero = ?"
                    ." AND ex.Formalidade = ?"
                    ." AND ex.Previdencia = ?"
                    ." AND ex.Sindical = ?"
                    ." AND ex.Sexo IS NULL";
                
                $params[] = $regiao;
                $params[] = self::concatValueDeg($deg, 1, $subdeg);
                $params[] = $ocp;
                $params[] = self::concatValueDeg($deg, 3, $subdeg);
                $params[] = self::concatValueDeg($deg, 4, $subdeg);
                $params[] = self::concatValueDeg($deg, 5, $subdeg);
                $params[] = $var;
                $params[] = self::concatValueDeg($deg, 6, $subdeg);
                $params[] = self::concatValueDeg($deg, 7, $subdeg);
                $params[] = self::concatValueDeg($deg, 8, $subdeg);
                
            }
            else {
                $query = "SELECT * FROM ".self::$table." AS ex"
                       ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.UFRegiao LIKE '?'"
                       ." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
                       ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                       ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                       ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                       ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                       ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                       ." WHERE ex.Numero = ?"
                       ." AND ex.Formalidade = ?"
                       ." AND ex.Previdencia = ?"
                       ." AND ex.Sindical = ?"
                       ." AND ex.Sexo IS NULL";

                $params[] = $regiao;
                $params[] = $cad;
                $params[] = self::concatValueDeg($deg, 1, $subdeg);
                $params[] = $ocp;
                $params[] = self::concatValueDeg($deg, 3, $subdeg);
                $params[] = self::concatValueDeg($deg, 4, $subdeg);
                $params[] = self::concatValueDeg($deg, 5, $subdeg);
                $params[] = $var;
                $params[] = self::concatValueDeg($deg, 6, $subdeg);
                $params[] = self::concatValueDeg($deg, 7, $subdeg);
                $params[] = self::concatValueDeg($deg, 8, $subdeg);
            }
        }
        else {
            if($ocp != 0) {
                $query = "SELECT * FROM ".self::$table." AS ex"
                       ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.UFRegiao LIKE '?'"
                       ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                       ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                       ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                       ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                       ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                       ." WHERE ex.Numero = ?"
                       ." AND ex.Formalidade = ?"
                       ." AND ex.Previdencia = ?"
                       ." AND ex.Sindical = ?"
                       ." AND ex.Sexo = ?";

                $params[] = $regiao;
                $params[] = $prt;
                $params[] = $ocp;
                $params[] = $esc;
                $params[] = $etn;
                $params[] = $idd;
                $params[] = $var;
                $params[] = $form;
                $params[] = $prev;
                $params[] = $sind;
                $params[] = $sexos;
            }
            else {

                $query = "SELECT * FROM ".self::$table." AS ex"
                       ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.UFRegiao LIKE ?"
                       ." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
                       ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                       ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                       ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                       ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                       ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                       ." WHERE ex.Numero = ?"
                       ." AND ex.Formalidade = ?"
                       ." AND ex.Previdencia = ?"
                       ." AND ex.Sindical = ?";


                if(self::concatValueDegSexo($deg, 2, $subdeg) == "IS NULL"){
                    $query .= " AND ex.Sexo IS NULL";
                }
                else{
                    $query .= " AND ex.Sexo = ?";
                };


                $params[] = $regiao;
                $params[] = $cad;
                $params[] = self::concatValueDeg($deg, 1, $subdeg);
                $params[] = $ocp;
                $params[] = self::concatValueDeg($deg, 3, $subdeg);
                $params[] = self::concatValueDeg($deg, 4, $subdeg);
                $params[] = self::concatValueDeg($deg, 5, $subdeg);
                $params[] = $var;
                $params[] = self::concatValueDeg($deg, 6, $subdeg);
                $params[] = self::concatValueDeg($deg, 7, $subdeg);
                $params[] = self::concatValueDeg($deg, 8, $subdeg);
                if(self::concatValueDegSexo($deg, 2, $subdeg) != "IS NULL"){
                    $params[] = self::concatValueDegSexo($deg, 2, $subdeg);
                };

            }
        }

        if($anos > 0){
            $query .= " AND ex.Ano = ?";
            $params[] = $anos;
        }


        $paramsStr = '';
        foreach ($params as $param) {
            $paramsStr .= 's';
        }
        
        $stmt = mysqli_stmt_init(self::$conn);
        if (mysqli_stmt_prepare($stmt, $query)) {
            $stmt->bind_param($paramsStr, ...$params);
            
            $stmt->execute();
            $allObjects = self::fetch_results($stmt);
        }
        
        self::disconnect();

        return $allObjects;
    }

    public static function getter_value_max($var, $ocp, $ano){
        self::connect();
        $query = "SELECT MAX(Valor) FROM ".self::$table."  WHERE Numero = ".$var." AND idOcupacao = ".$ocp." Group by Ano";
    }

    public static function getter_linhas($var, $uf, $cad, $ocp, $uos, $slc, $desag, $subdeg){
        $params = [];
        
        self::connect();

        $query = "SELECT * FROM ".self::$table." WHERE Numero = ? AND idUF = ?";
        $params[] = $var;
        $params[] = $uf;

        if($ocp == 0){

            if($desag != 0 && $cad == 0) {
                $query .= " AND idCadeia != 0";
            }
            else {
                if($uos == 1 && $var == 6) {
                    $query .= " AND idCadeia != 0";
                }
                else {
                    $query .= " AND idCadeia = ?";
                    $params[] = $cad;
                }
            }
            $query .= " AND idOcupacao = 0";
        }
        else if($ocp == 1){
            $query .= " AND idOcupacao = 1";
        }
        else if($ocp == 2){
            $query .= " AND idOcupacao = 2";
        }
        else if($ocp == 3){
            $query .= " AND (idOcupacao = 1 OR idOcupacao = 2)";
        }
                    
        $query .= self::concatDeg($desag, 1, "idPorte");
        $query .= self::concatDeg($desag, 3, "idIdade");
        $query .= self::concatDeg($desag, 4, "idEscolaridade");
        $query .= self::concatDeg($desag, 5, "idEtinia");
        $query .= self::concatDeg($desag, 6, "Formalidade");
        $query .= self::concatDeg($desag, 7, "Previdencia");
        $query .= self::concatDeg($desag, 8, "Sindical");

        $paramsStr = '';
        foreach ($params as $param) {
            $paramsStr .= 's';
        }
        
        $stmt = mysqli_stmt_init(self::$conn);
        if (mysqli_stmt_prepare($stmt, $query)) {
            $stmt->bind_param($paramsStr, ...$params);
            
            $stmt->execute();
            $allObjects = self::fetch_results($stmt);
        }
        
        self::disconnect();

        return $allObjects;

    }

    private static function concatDeg($deg, $idDeg, $texto){
        if($deg == $idDeg){
            return " AND ".$texto." > 0";
        } else{
            return " AND ".$texto." = 0";
        }
    }

    private static function concatValueDeg($deg, $idDeg, $subdeg){
        if($deg == $idDeg){
            return $subdeg;
        } else{
            return 0;
        }
    }

    private static function concatValueDegSexo($deg, $idDeg, $subdeg){
        if($deg == $idDeg){
            return $subdeg;
        } else{
            return "IS NULL";
        }
    }


}

