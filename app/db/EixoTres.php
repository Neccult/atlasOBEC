<?php

###	Classe que manipula as variáveis do Eixo 2 ###

require('config.db.php');

class EixoTres {

## Atributos ##

	protected static $table = 'Eixo_3';
	private static $conn;

 	//informações Eixo_3
	protected $id;
	public $Numero;
	public $idUF;
	public $idCadeia;
	public $idMecanismo;

	public $PessoaFisica;
	public $Modalidade;

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
	
	//informações Mecanismo
	public $MecanismoNome;


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

		$query = "SELECT MAX(Ano) AS Ano, Numero FROM `Eixo_3` WHERE (idUF = 11 or idUF = 0) AND idCadeia = 0 AND PessoaFisica is NULL  GROUP BY Numero";

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

		$query = "SELECT MAX(Ano) AS Ano FROM `Eixo_3` WHERE (idUF = 11 or idUF = 0) AND Numero = ? GROUP BY Numero";

        $stmt = mysqli_stmt_init(self::$conn);
        if (mysqli_stmt_prepare($stmt, $query)) {
            $stmt->bind_param(
                's',
                $var
            );
            $stmt->execute();
            $obj = self::fetch_results($stmt)[0];
        }
        
		$ano = $obj->Ano;

		return $ano;
	}

	/*-----------------------------------------------------------------------------
	Função: Find
	    função para buscar um conjunto de tupla no banco de dados
	Entrada: 
	    $var = número da váriavel 
	    $ufs = id do UF 
	    $cad = id do SCC 
	    $mec = id do mecanismo
	    $pf =  flag pessoa fisica
		$mod = flag modalidade
	    $anos = ano 
	Saída:
	    Um conjunto de instâncias da Classe EixoTres com seus devidos atributos
	-----------------------------------------------------------------------------*/
	public static function find($var, $ufs, $cad, $mec, $pf, $mod, $anos){

		self::connect();
        
        $stmt = mysqli_stmt_init(self::$conn);
        $params = [];
        
        $query = "SELECT * FROM ".self::$table." AS ex"
               ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
               ." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
               ." JOIN Mecanismo AS mec ON mec.idMecanismo = ex.idMecanismo AND mec.idMecanismo = ?"
               ." WHERE ex.Numero = ?"
               ." AND ex.Ano = ?";

        $params[] = $ufs;
        $params[] = $cad;
        $params[] = $mec;
        $params[] = $var;
        $params[] = $anos;
        
        if($pf != 99 && $pf != NULL) {
            $query .= " AND ex.PessoaFisica = ?";
            $params[] = $pf;
        } else {
            $query .= " AND ex.PessoaFisica IS NULL";
        }
            
        if(!is_null($mod)) {
            $query .= " AND ex.Modalidade = ".$mod;
            $params[] = $mod;
        } else {
            $query .= " AND ex.Modalidade IS NULL";
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
	    Todas instancia da Classe EixoTres com seus devidos atributos 
	-----------------------------------------------------------------------------*/
	public static function all(){
		self::connect();
			// $query = "SELECT * FROM ".self::$table." ORDER BY id";
			$query = "SELECT * FROM ".self::$table." AS ex"
						." JOIN UF AS uf ON uf.idUF = ex.idUF"
						." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia"
						." JOIN Mecanismo AS mec ON mec.idMecanismo = ex.idMecanismo"				
						." ORDER BY id";

			$result = mysqli_query(self::$conn, $query);
			$allObjects = array();

			while($obj = mysqli_fetch_object($result, 'EixoTres')){
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
	    $cad = id do SCC 
	    $mec = id da mecanismo
	    $anos = ano
	Saída:
	    Um conjunto de instâncias da Classe EixoTres com seus devidos atributos
	-----------------------------------------------------------------------------*/
	public static function getter_mapa($var, $cad, $mec, $mod, $pf, $anos){

		self::connect();
        
        $vars_com_cad_0 = array( 1, 3, 4, 6, 7, 8, 9,  11, 12, 13, 14, 15, 16, 17);
        $params = [];
        $allObjects = [];
        
        $stmt = mysqli_stmt_init(self::$conn);
        
        if($var == 17 || $var == 18 || $var == 19){
            $query = "SELECT * FROM " . self::$table . " AS ex"
                   . " JOIN UF AS uf ON uf.idUF =  ex.idUF"
                   . " JOIN Mecanismo AS mec ON mec.idMecanismo = ex.idMecanismo AND mec.idMecanismo = ?";
            
            $params[] = $mec;
            
            if ($anos > 0) {
                $query .= " AND ex.Ano = ?";
                $params[] = $anos;
            }
            
            if($var != 17) {
                $query .= " JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?";
                $params[] = $cad;
            }

            $query .=   " WHERE ex.Numero = ?";
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
            
            $stmt = mysqli_stmt_init(self::$conn);
            if (mysqli_stmt_prepare($stmt, $query)) {
                $stmt->bind_param($paramsStr, ...$params);
                
                $stmt->execute();
                $allObjects = self::fetch_results($stmt);
            }
            
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
        } else if($mec == 0 || ($cad != 0 && $mec != 0) || in_array($var, $vars_com_cad_0)){            
            $vars_com_cad_0 = array( 1, 3, 4, 6, 7, 8, 9,  11, 12, 13, 14, 15, 16);
            $cad = (is_null($cad)) ? '0' : $cad;
            $cad = ($cad == 'null') ? '0' : $cad;
            
            $query = "SELECT * FROM ".self::$table." AS ex"
                   ." JOIN UF AS uf ON uf.idUF = ex.idUF"
                   ." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
                   ." JOIN Mecanismo AS mec ON mec.idMecanismo = ex.idMecanismo AND mec.idMecanismo = ?"
                   ." WHERE ex.Numero = ?"
                   ." AND ex.Ano = ?";

            $params[] = $cad;
            $params[] = $mec;
            $params[] = $var;
            $params[] = $anos;
            
            if(!is_null($pf) && !is_null($mod)) {
                $query .= " AND ex.PessoaFisica = ?";
                $query .= " AND ex.Modalidade = ?";
                
                $params[] = $pf;
                $params[] = $mod;

            } else if(is_null($pf) && !is_null($mod)) {
                $query .= " AND ex.Modalidade = ?"
                       . " AND ex.PessoaFisica IS NULL";

                $params[] = $mod;
                
            } else if(!is_null($pf) && is_null($mod)) {
                $query .= " AND ex.PessoaFisica = ?";
                $query .= " AND ex.Modalidade IS NULL";

                $params[] = $pf;
                
            } else {
                $query .= " AND ex.PessoaFisica IS NULL";
                $query .= " AND ex.Modalidade IS NULL";
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
            
        } else {
            $query = "SELECT * FROM " . self::$table . " AS ex"
                   . " JOIN UF AS uf ON uf.idUF =  ex.idUF"
                   ." JOIN Mecanismo AS mec ON mec.idMecanismo = ex.idMecanismo AND mec.idMecanismo = ?"
                   . " WHERE ex.Numero = ?";
            
            $params[] = $mec;
            $params[] = $var;
            
            if ($anos > 0) {
                $params[] = $anos;
                $query .= " AND ex.Ano = ?";
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
	    $mec = id do Mecanismo
	    $pf = flag PessoaFisica
		$mod = flag Modalidade
	Saída:
	    Um conjunto de instâncias da Classe EixoTres com seus devidos atributos
	-----------------------------------------------------------------------------*/
	public static function getter_barras($var, $ufs, $cad, $mec, $pf, $mod, $ano = NULL, $uos){
		
		$vars_com_cad_0 = array( 1, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
		self::connect();
        $params = [];
        $allObjects = [];
        
        $stmt = mysqli_stmt_init(self::$conn);

        if($var == 18 || $var == 19){
            $query = "SELECT * FROM ".self::$table." AS ex"
                   ." WHERE ex.Numero = ? AND idMecanismo = ? AND idUF = ?";
            $params[] = $var;
            $params[] = $mec;
            $params[] = $ufs;
            
            if($uos == 0) {
                $query .=  " AND Ano > 0" ;
            } else {
                $query .=  " AND Ano = 0" ;
                $query .=  " AND idCadeia = ?";
                $params[] = $cad;
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
        } else if($var == 17){
            $query = "SELECT * FROM ".self::$table." AS ex"
                   ." JOIN UF AS uf ON uf.idUF =  ex.idUF AND uf.idUF = ?"
                   ." JOIN Mecanismo AS mec ON mec.idMecanismo =  ex.idMecanismo AND mec.idMecanismo = ?"
                   ." WHERE ex.Numero = ?";
            
            $params[] = $ufs;
            $params[] = $mec;
            $params[] = $var;

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
            
        } else if($mec == 0 || ($cad != 0 && $mec != 0) || in_array($var, $vars_com_cad_0)){
            
            if(is_null($ano) || $var < 15) {
                $cad = (is_null($cad)) ? 0 : $cad;
                $query = "SELECT * FROM " . self::$table . " AS ex"
                       . " JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                       . " JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
                       . " JOIN Mecanismo AS mec ON mec.idMecanismo = ex.idMecanismo AND mec.idMecanismo = ?"
                       . " WHERE ex.Numero = ?";
                
                
                if(!is_null($pf) && !is_null($mod)) {
                    $query .= " AND ex.PessoaFisica = ?"
                           . " AND ex.Modalidade = ?";
                    
                    if ($stmt->prepare($query)) {
                        $stmt->bind_param(
                            'ssssss',
                            $ufs,
                            $cad,
                            $mec,
                            $var,
                            $pf,
                            $mod
                        );
                    }
                } else if(is_null($pf) && !is_null($mod)) {
                    $query .= " AND ex.PessoaFisica IS NULL"
                           . " AND ex.Modalidade = ?";
                    
                    if ($stmt->prepare($query)) {
                        $stmt->bind_param(
                            'sssss',
                            $ufs,
                            $cad,
                            $mec,
                            $var,
                            $mod
                        );
                    }
                } else if(!is_null($pf) && is_null($mod)) {
                    $query .= " AND ex.PessoaFisica = ?"
                           . " AND ex.Modalidade IS NULL";
                    
                    if ($stmt->prepare($query)) {
                        $stmt->bind_param(
                            'sssss',
                            $ufs,
                            $cad,
                            $mec,
                            $var,
                            $pf
                        );
                    }
                } else {
                    $query .= " AND ex.PessoaFisica IS NULL"
                           . " AND ex.Modalidade IS NULL";
                    
                    if ($stmt->prepare($query)) {
                        $stmt->bind_param(
                            'ssss',
                            $ufs,
                            $cad,
                            $mec,
                            $var                            
                        );
                    }
                }                    
                $stmt->execute();
                $allObjects = self::fetch_results($stmt);
                
            } else {
                $query = "SELECT * FROM ".self::$table." AS ex"
                       ." JOIN UF AS uf ON uf.idUF =  ex.idUF AND uf.idUF = 0"
                       ." JOIN Cadeia AS cad ON cad.idCadeia =  ex.idCadeia AND cad.idCadeia = ?"
                       . " JOIN Mecanismo AS mec ON mec.idMecanismo = ex.idMecanismo AND mec.idMecanismo = ?"
                       ." WHERE ex.Numero = ?";
                
                if ($stmt->prepare($query)) {
                    $stmt->bind_param(
                        'sss',
                        $uos,
                        $mec,
                        $var
                    );
                }
                
                $stmt->execute();
                $allObjects = self::fetch_results($stmt);
            }
            
        } else {
            $query = "SELECT * FROM ".self::$table." AS ex"
                   ." JOIN UF AS uf ON uf.idUF =  ex.idUF AND uf.idUF = ".$ufs
                   ." JOIN Mecanismo AS mec ON mec.idMecanismo =  ex.idMecanismo AND mec.idMecanismo = ".$mec
                   ." WHERE ex.Numero = ".$var;
            
            if ($stmt->prepare($query)) {            
                $stmt->bind_param(
                    'sss',
                    $uos,
                    $mec,
                    $var
                );
            }
            
            $stmt->execute();
            $obj = self::fetch_results($stmt);
            
            while($obj){
                $allObjects[] = $obj;
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
	

	/*-----------------------------------------------------------------------------
	Função: Getter Region
	    função para obter um conjunto de tuplas para treemap region
	Entrada: 
	    $var = número da váriavel  
	    $cad = id do SCC 
	    $mec = id do Mecanismo
	    $pf = flag PessoaFisica
		$mod = flag Modalidade
	    $anos = ano 
	    $regiao = região do Brasil
	Saída:
	    Um conjunto de instâncias da Classe EixoTres com seus devidos atributos
	-----------------------------------------------------------------------------*/
	public static function getter_region($var, $cad, $mec, $pf, $mod, $anos, $regiao){

		self::connect();		
        $query = "SELECT * FROM ".self::$table." AS ex"
               ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.UFRegiao LIKE ?"
               ." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
               ." JOIN Mecanismo AS mec ON mec.idMecanismo = ex.idMecanismo AND mec.idMecanismo = ?"
               ." WHERE ex.Numero = ?";
        
        $query .= ($anos > 0) ? " AND ex.Ano = ?" : "";
        
        if(!is_null($pf) && !is_null($mod)) {
            $query .= " AND ex.PessoaFisica = ?";
            $query .= " AND ex.Modalidade = ?";
            
            if ($stmt->prepare($query)) {
                $stmt->bind_param(
                    'ssssss',
                    $regiao,
                    $cad,
                    $mec,
                    $var,
                    $pf,
                    $mod
                );
            }
        } else if(is_null($pf) && !is_null($mod)) {
            $query .= " AND ex.PessoaFisica IS NULL";
            $query .= " AND ex.Modalidade = ?";


            if ($stmt->prepare($query)) {
                $stmt->bind_param(
                    'sssss',
                    $regiao,
                    $cad,
                    $mec,
                    $var,
                    $mod
                );
            }
        } else if(!is_null($pf) && is_null($mod)) {
            $query .= " AND ex.PessoaFisica = ?";
            $query .= " AND ex.Modalidade IS NULL";

            if ($stmt->prepare($query)) {
                $stmt->bind_param(
                    'sssss',
                    $regiao,
                    $cad,
                    $mec,
                    $var,
                    $pf
                );
            }
        } else {
            $query .= " AND ex.PessoaFisica IS NULL";
            $query .= " AND ex.Modalidade IS NULL";
            
            if ($stmt->prepare($query)) {
                $stmt->bind_param(
                    'ssss',
                    $regiao,
                    $cad,
                    $mec,
                    $var                         
                );
            }                    
        }
        $stmt->execute();
        $allObjects = self::fetch_results($stmt);
        
		self::disconnect();
		
		return $allObjects;
	}

    public static function getter_donut($var, $ufs, $cad, $mec, $pf, $mod, $ano = NULL, $uos){
        self::connect();
        $query = $query = "SELECT * FROM " . self::$table . " AS ex"
            . " JOIN Mecanismo AS mec ON mec.idMecanismo = ex.idMecanismo AND mec.idMecanismo = ".$mec
            . " WHERE ex.Numero = " . $var;;


        if($var == 18 || $var == 19){
         $query = $query = "SELECT * FROM " . self::$table . " AS ex"
                . " WHERE ex.Numero = " . $var;
                $query .=  " AND idMecanismo = ".$mec ;
                $query .=  " AND Ano = 0" ;
                $query .=  " AND idUF = ".$ufs ;
                if(!($var == 19 && $mec == 1))
                    $query .=  " AND idCadeia > 0" ;
        }
        else
            $query .= ($ano > 0) ? " AND Ano = ".$ano : "" ;

        $result = mysqli_query(self::$conn, $query);
        $allObjects = array();


        while($obj = mysqli_fetch_object($result, 'EixoTres')){
            $allObjects[] = $obj;
        }

        self::disconnect();
        return $allObjects;
    }

}
