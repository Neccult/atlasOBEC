<?php

###	Classe que manipula as variáveis do Eixo I ###

require('config.db.php');

class EixoUm {

## Atributos ##

	protected static $table = 'Eixo_1';
	private static $conn;

 	//informações Eixo_1
	protected $id;
	public $Numero;
	public $idUF;
	public $idCadeia;
	public $idPorte;
	public $Ano;
	public $Valor;
	public $Percentual;
    public $percentual_scc;
    public $percentual_region;
	public $Taxa;

	//informações UF
	public $UFNome;
	public $UFRegiao;
	public $UFSigla;

	//informações Atuação
	public $AtuacaoNome;

	//informações Cadeia
	public $CadeiaNome;
	
	//informações Porte
	public $PorteNome;


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
	Função: getter_most_recent_year
	    função para buscar o ano mais recente no banco de dados para todas as variáveis
	Saída:
	    Array com os resultados da busca
	-----------------------------------------------------------------------------*/
	public static function getter_most_recent_year(){
		self::connect();
        
		$query = "SELECT DISTINCT Ano, Numero FROM `Eixo_1` WHERE `idUF` = 0";
        
        $stmt = mysqli_stmt_init(self::$conn);
        mysqli_stmt_prepare($stmt, $query);        
        $stmt->execute();
        
        $allObjects = array();
        $allObjects = self::fetch_results($stmt);
		self::disconnect();
        
		return $allObjects;
	}

	public static function getMaxValueSetor($var, $cad, $deg){
		self::connect();
        $params = [];
        
		$query = "SELECT MAX(Valor) as Valor, Ano FROM ".self::$table
						." WHERE Numero = ?"
						." AND idCadeia = ?"
						." AND idPorte = ?"
						." AND idUF = 0 GROUP BY Ano";

        $params[] = $var;
        $params[] = $cad;
        $params[] = $deg;

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
    
    public static function getTotalSumPrt($var, $uf){
        self::connect();
        $params = [];
        
        $query = "SELECT Valor, Ano FROM `Eixo_1` WHERE Numero = ? and idUF = ? and idPorte = 0 and idCadeia = 0";

        $params[] = $var;
        $params[] = $uf;

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
    
	public static function getAnoDefault($var){
		self::connect();

		$query = "SELECT MAX(Ano) AS Ano FROM `Eixo_1` WHERE `idUF` = 0 AND Numero = ? GROUP BY Numero";
        
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
    
	/*-----------------------------------------------------------------------------
	Função: Find
	    função para buscar um conjunto de tupla no banco de dados
	Entrada: 
	    $var = número da váriavel 
	    $ufs = id do UF 
	    $atc = id da atuação
	    $cad = id do SCC 
	    $prt = id do porte
	    $anos = ano 
	Saída:
	    Um conjunto de instâncias da Classe EixoUm com seus devidos atributos
	-----------------------------------------------------------------------------*/
	public static function find($var, $ufs, $cad, $deg, $anos){

		self::connect();

		if($deg > 0){
            $deg = $deg - 8;
        }


        $query = "SELECT * FROM ".self::$table." AS ex"
               ." JOIN UF AS uf ON uf.idUF =  ex.idUF AND uf.idUF = ?"
               ." JOIN Atuacao AS atc ON atc.idAtuacao =  ex.idAtuacao AND atc.idAtuacao = 0"
               ." JOIN Cadeia AS cad ON cad.idCadeia =  ex.idCadeia AND cad.idCadeia = ?"
               ." JOIN Porte AS prt ON prt.idPorte =  ex.idPorte AND prt.idPorte = ?"
               ." WHERE ex.Numero = ?"
               ." AND ex.Ano = ?";


        $stmt = mysqli_stmt_init(self::$conn);
        if (mysqli_stmt_prepare($stmt, $query)) {
            $stmt->bind_param(
                'sssss',
                $ufs,
                $cad,
                $deg,
                $var,
                $anos
            );
            $stmt->execute();
            $obj = self::fetch_results($stmt)[0];
        }
        
		self::disconnect();

        return ($obj == false) ? NULL : $obj;
	}

	/*-----------------------------------------------------------------------------
	Função: All
	    função para buscar todas tupla no banco de dados
	Entrada: 
	    void
	Saída:
	    Todas instancia da Classe EixoUm com seus devidos atributos 
	-----------------------------------------------------------------------------*/
	public static function all(){
		self::connect();
			// $query = "SELECT * FROM ".self::$table." ORDER BY id";
			$query = "SELECT * FROM ".self::$table." AS ex"
						." JOIN UF AS uf ON uf.idUF =  ex.idUF" 
						." JOIN Atuacao AS atc ON atc.idAtuacao =  ex.idAtuacao"
						." JOIN Cadeia AS cad ON cad.idCadeia =  ex.idCadeia"
						." JOIN Porte AS prt ON prt.idPorte =  ex.idPorte"
						." ORDER BY id";

			$result = mysqli_query(self::$conn, $query);
			$allObjects = array();

			while($obj = mysqli_fetch_object($result, 'EixoUm')){
				$allObjects[] = $obj;
			}

		self::disconnect();
		
		return $allObjects;
	}

	/*-----------------------------------------------------------------------------
	Função: Getter Mapa
	    função para obter um conjunto de tuplas para o mapa
	Entrada: 
	    $var = número da váriavel 
	    $atc = id da atuação
	    $cad = id do SCC 
	    $prt = id do porte
	    $anos = ano 
	Saída:
	    Um conjunto de instâncias da Classe EixoUm com seus devidos atributos
	-----------------------------------------------------------------------------*/
	public static function getter_mapa($var, $cad, $deg, $anos){

		self::connect();

        if($deg > 0){
            $deg = $deg - 8;
        }

        $stmt = mysqli_stmt_init(self::$conn);
        if($deg == 0 || $cad != 0 || $var == 1 || $var == 3 || $var == 2) {
            
            $query = "SELECT * FROM " . self::$table . " AS ex"
                   . " JOIN UF AS uf ON uf.idUF =  ex.idUF" 
                   . " JOIN Atuacao AS atc ON atc.idAtuacao =  ex.idAtuacao AND atc.idAtuacao = 0"
                   . " JOIN Cadeia AS cad ON cad.idCadeia =  ex.idCadeia AND cad.idCadeia = ?"
                   . " JOIN Porte AS prt ON prt.idPorte =  ex.idPorte AND prt.idPorte = ?"
                   . " WHERE ex.Numero = ?";
            
            $query .= ($anos > 0) ? " AND ex.Ano = ?" : "";
            if ($stmt->prepare($query)) {
                if ($anos > 0) {
                    $stmt->bind_param(
                        'ssss',
                        $cad,
                        $deg,
                        $var,
                        $anos
                    );
                    
                } else {
                    $stmt->bind_param(
                        'ssss',
                        $cad,
                        $deg,
                        $var
                    );
                }
                $stmt->execute();
                $allObjects = self::fetch_results($stmt);
            }
            
        } else {
            $query = "SELECT * FROM " . self::$table . " AS ex"
                   . " JOIN UF AS uf ON uf.idUF =  ex.idUF"
                   . " JOIN Atuacao AS atc ON atc.idAtuacao =  ex.idAtuacao AND atc.idAtuacao = 0"
                   . " JOIN Porte AS prt ON prt.idPorte =  ex.idPorte AND prt.idPorte = ?"
                   . " WHERE ex.Numero = ?";
            
            $query .= ($anos > 0) ? " AND ex.Ano = ?" : "";
            if ($stmt->prepare($query)) {                
                if ($anos > 0) {
                    $stmt->bind_param(
                        'sss',
                        $deg,
                        $var,
                        $anos
                    );
                    
                } else {
                    $stmt->bind_param(
                        'ss',
                        $deg,
                        $var
                    );
                }
            }
            
            $stmt->execute();
            $allObjects = self::fetch_results($stmt);

            $result_aux = array();
            $value_aux = array();
            $percent_aux = array();
            foreach ($allObjects as $data) {
                if(!isset($value_aux[$data->idUF])) $value_aux[$data->idUF] = 0;
                if(!isset($percent_aux[$data->idUF])) $percent_aux[$data->idUF] = 0;
                $value_aux[$data->idUF] += $data->Valor;
                $percent_aux[$data->idUF] += $data->Percentual;
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
	    $deg = id do porte
	Saída:
	    Um conjunto de instâncias da Classe EixoUm com seus devidos atributos
	-----------------------------------------------------------------------------*/
	public static function getter_barras($var, $ufs, $cad, $deg, $uos){

	    if($deg > 0){
	        $deg = $deg - 8;
        }


		self::connect();
        if(($deg == 0 || $cad != 0) || $var == 1 || $var == 3 || $var == 2) {

            $idCadeia = ($uos == 0) ? $cad : 1;
            
            $query = "SELECT * FROM ".self::$table." AS ex"
                   ." JOIN UF AS uf ON uf.idUF =  ex.idUF AND uf.idUF = ?"
                   ." JOIN Cadeia AS cad ON cad.idCadeia =  ex.idCadeia AND cad.idCadeia = ".$idCadeia
                   ." JOIN Porte AS prt ON prt.idPorte =  ex.idPorte AND prt.idPorte = ?"
                   ." WHERE ex.Numero = ?";
            
            $stmt = mysqli_stmt_init(self::$conn);
            if ($stmt->prepare($query)) {
                $stmt->bind_param(
                    'sss',
                    $ufs,
                    $deg,
                    $var
                );
                $stmt->execute();
                $allObjects = self::fetch_results($stmt);
            }

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

    public static function getter_linhas($var, $ufs, $cad, $deg, $uos){

        if($deg > 0){
            $deg = $deg - 8;
        }

        self::connect();
        if($var == 3 || $var == 9) {

            $query = "SELECT * FROM ".self::$table." AS ex"
                ." JOIN UF AS uf ON uf.idUF =  ex.idUF AND uf.idUF = ?"
                ." JOIN Cadeia AS cad ON cad.idCadeia =  ex.idCadeia AND cad.idCadeia > 0"
                ." JOIN Porte AS prt ON prt.idPorte =  ex.idPorte AND prt.idPorte = ?"
                ." WHERE ex.Numero = ?";

            $stmt = mysqli_stmt_init(self::$conn);
            if ($stmt->prepare($query)) {
                $stmt->bind_param(
                    'sss',
                    $ufs,
                    $deg,
                    $var
                );
                $stmt->execute();
                $allObjects = self::fetch_results($stmt);
            }


        }
        else if($var >= 10){

            $query = "SELECT * FROM ".self::$table." AS ex"
                ." JOIN UF AS uf ON uf.idUF =  ex.idUF AND uf.idUF = ?"
                ." JOIN Cadeia AS cad ON cad.idCadeia =  ex.idCadeia AND cad.idCadeia = ?"
                ." WHERE ex.Numero = ?";


            $stmt = mysqli_stmt_init(self::$conn);
            if ($stmt->prepare($query)) {
                $stmt->bind_param(
                    'sss',
                    $ufs,
                    $uos,
                    $var
                );
                $stmt->execute();
                $allObjects = self::fetch_results($stmt);
            }
        }

        self::disconnect();

        return $allObjects;
    }

	/*-----------------------------------------------------------------------------
	Função: Getter Region
	    função para obter um conjunto de tuplas para treemap region
	Entrada: 
	    $var = número da váriavel 
	    $atc = id da atuação
	    $cad = id do SCC 
	    $prt = id do porte
	    $anos = ano 
	    $regiao = região do Brasil
	Saída:
	    Um conjunto de instâncias da Classe EixoUm com seus devidos atributos
	-----------------------------------------------------------------------------*/
	public static function getter_region($var, $cad, $deg, $anos, $regiao){

        self::connect();
        
		if($deg > 0){
            $deg = $deg - 8;
        }
        
        if($deg == 0 || $cad != 0 || $var == 1 || $var == 3|| $var == 2) {
                
            $query = "SELECT * FROM " . self::$table . " AS ex"
                   . " JOIN UF AS uf ON uf.idUF =  ex.idUF AND uf.UFRegiao LIKE ?"
                   . " JOIN Cadeia AS cad ON cad.idCadeia =  ex.idCadeia AND cad.idCadeia = ?"
                    ." JOIN Atuacao AS atc ON atc.idAtuacao =  ex.idAtuacao AND atc.idAtuacao = 0"
                    . " JOIN Porte AS prt ON prt.idPorte =  ex.idPorte AND prt.idPorte = ?"
                   . " WHERE ex.Numero = ?";

            $stmt = mysqli_stmt_init(self::$conn);
            $query .= ($anos > 0) ? " AND ex.Ano = ?" : "";

            if ($stmt->prepare($query)) {
                if ($anos > 0) {
                    $stmt->bind_param(
                        'sssss',
                        $regiao,
                        $cad,
                        $deg,
                        $var,
                        $anos
                    );
                    
                } else {
                    $stmt->bind_param(
                        'ssss',
                        $regiao,
                        $cad,
                        $deg,
                        $var
                    );
                }
            }

            $stmt->execute();
            $allObjects = self::fetch_results($stmt);

        } else {
            $stmt = mysqli_stmt_init(self::$conn);

            $query = "SELECT * FROM " . self::$table . " AS ex"
                   . " JOIN UF AS uf ON uf.idUF =  ex.idUF AND uf.UFRegiao LIKE ?"
                   . " JOIN Porte AS prt ON prt.idPorte =  ex.idPorte AND prt.idPorte = ?"
                   . " WHERE ex.Numero = ?";
            
            $query .= ($anos > 0) ? " AND ex.Ano = ?" : "";

            if ($stmt->prepare($query)) {
                if ($anos > 0) {
                    $stmt->bind_param(
                        'ssss',
                        $regiao,
                        $deg,
                        $var,
                        $anos
                    );
                    
                } else {
                    $stmt->bind_param(
                        'sss',
                        $regiao,
                        $deg,
                        $var
                    );
                }
            }

            $stmt->execute();
            $allObjects = self::fetch_results($stmt);
            
           
            
            /***********************/
            
            // $query = "SELECT * FROM " . self::$table . " AS ex"
            //        . " JOIN UF AS uf ON uf.idUF =  ex.idUF AND uf.UFRegiao LIKE '" . $regiao . "'"
            //        . " JOIN Atuacao AS atc ON atc.idAtuacao =  ex.idAtuacao AND atc.idAtuacao = " . $atc
            //        . " JOIN Porte AS prt ON prt.idPorte =  ex.idPorte AND prt.idPorte = " . $prt
            //        . " WHERE ex.Numero = " . $var;

            // $query .= ($anos > 0) ? " AND ex.Ano = " . $anos : "";

            // $result = mysqli_query(self::$conn, $query);
            // $allObjects = array();

            // while($obj = mysqli_fetch_object($result, 'EixoUm')){
            //     $allObjects[] = $obj;
            // }
            // $result_aux = array();
            // $value_aux = array();
            // $percent_aux = array();
            // foreach ($allObjects as $data) {
            //     if(!isset($value_aux[$data->idUF])) $value_aux[$data->idUF] = 0;
            //     if(!isset($percent_aux[$data->idUF])) $percent_aux[$data->idUF] = 0;
            //     $value_aux[$data->idUF] += $data->Valor;
            //     $percent_aux[$data->idUF] += $data->Percentual;
            //     $result_aux[$data->idUF] = $data;
            //     $result_aux[$data->idUF]->Valor = $value_aux[$data->idUF];
            //     $result_aux[$data->idUF]->Percentual = $percent_aux[$data->idUF];
            // }
            // $allObjects = $result_aux;
        }

		self::disconnect();

        return $allObjects;
	}

}
