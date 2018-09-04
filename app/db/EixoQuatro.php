<?php

###	Classe que manipula as variáveis do Eixo 2 ###

require('config.db.php');

class EixoQuatro {

## Atributos ##

	protected static $table = 'Eixo_4';
	private static $conn;

 	//informações Eixo_4
	protected $id;
	public $Numero;
	public $idCadeia;
	public $idParceiro;
    public $idUF;
	public $idTipo;

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
	
	//informações Parceiro
	public $ParceiroNome;

	//informações Tipo
	public $TipoNome;


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

		$query = "SELECT DISTINCT Ano, Numero, Consumo FROM `Eixo_4` WHERE `idUF` = 0 and (Consumo = 0 OR Consumo = 1)";
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

		$query = "SELECT MAX(Ano) AS Ano FROM `Eixo_4` WHERE `idUF` = 0 AND Numero = ? GROUP BY Numero";
		$result = mysqli_query(self::$conn, $query);

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
	    $parc = id do Parceiro 
	    $cad = id do SCC 
	    $tipo = id do Tipo
	    $anos = ano 
	Saída:
	    Um conjunto de instâncias da Classe EixoQuatro com seus devidos atributos
	-----------------------------------------------------------------------------*/
	public static function find($var, $parc, $uf, $tipo, $anos, $slc){

		self::connect();
        $params = [];
        $stmt = mysqli_stmt_init(self::$conn);
        
        $query = "SELECT * FROM ".self::$table." AS ex"
               ." JOIN Parceiro AS parc ON parc.idParceiro = ex.idParceiro AND parc.idParceiro = ?"
               ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
               ." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia"
               ." JOIN Tipo AS tipo ON tipo.idTipo = ex.idTipo AND tipo.idTipo = ?"
               ." WHERE ex.Numero = ?"
               ." AND ex.Ano = ?";
        
		$params[] = $parc;
        $params[] = $uf;
        $params[] = $tipo;
        $params[] = $var;
        $params[] = $anos;
        
        if($slc == 0)
            $query .= " AND ex.Consumo = 1";
        else{
            $query .= " AND ex.Consumo = 0";
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
        
        return $allObjects;
	}

	/*-----------------------------------------------------------------------------
	Função: All
	    função para buscar todas tupla no banco de dados
	Entrada: 
	    void
	Saída:
	    Todas instancia da Classe EixoQuatro com seus devidos atributos 
	-----------------------------------------------------------------------------*/
	public static function all(){
		self::connect();
			// $query = "SELECT * FROM ".self::$table." ORDER BY id";
			$query = "SELECT * FROM ".self::$table." AS ex"
						." JOIN Parceiro AS parc ON parc.idParceiro = ex.idParceiro"
						." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia"
						." JOIN Tipo AS tipo ON tipo.idTipo = ex.idTipo"				
						." ORDER BY id";

        $query .= " AND ex.Consumo = 1";
			$result = mysqli_query(self::$conn, $query);
			$allObjects = array();

			while($obj = mysqli_fetch_object($result, 'EixoQuatro')){
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
	    $tipo = id da Tipo
	    $anos = ano
	Saída:
	    Um conjunto de instâncias da Classe EixoQuatro com seus devidos atributos
	-----------------------------------------------------------------------------*/
	public static function getter_mapa($var, $cad, $tipo, $anos, $parceiro, $uf, $mundo, $slc){

		self::connect();
        $stmt = mysqli_stmt_init(self::$conn);
        $params = [];
		if($mundo == 0){
			$query = "SELECT * FROM ".self::$table." AS ex"
				." JOIN Parceiro AS parc ON parc.idParceiro = ex.idParceiro"
                ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                ." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
				." JOIN Tipo AS tipo ON tipo.idTipo = ex.idTipo AND tipo.idTipo = ?"
				." WHERE ex.Numero = ?";

            $params[] = $uf;
            $params[] = $cad;
            $params[] = $tipo;
            $params[] = $var;
            
            if ($anos > 0) {
                $query .= " AND ex.Ano = ?";
                $params[] = $anos;
            }
            
            if ($slc == 0) {
                $query .= " AND ex.Consumo = 1";
            } else {
                $query .= " AND ex.Consumo = 0";
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
			$query = "SELECT * FROM ".self::$table." AS ex"
				." JOIN Parceiro AS parc ON parc.idParceiro = ex.idParceiro AND parc.idParceiro = ?"
				." JOIN UF AS uf ON uf.idUF = ex.idUF"
                ." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
				." JOIN Tipo AS tipo ON tipo.idTipo = ex.idTipo AND tipo.idTipo = ?"
				." WHERE ex.Numero = ?";

            $params[] = $parceiro;
            $params[] = $cad;
            $params[] = $tipo;
            $params[] = $var;
            
            if ($anos > 0) {
                $query .= " AND ex.Ano = ?";
                $params[] = $anos;
            }

            if ($slc == 0) {
                $query .= " AND ex.Consumo = 1";
            } else {
                $query .= " AND ex.Consumo = 0";
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


        }

		self::disconnect();
		
		return $allObjects;
	}

	/*-----------------------------------------------------------------------------
	Função: Getter Barras
	    função para obter um conjunto de tuplas para o barras
	Entrada: 
	    $var = número da váriavel 
	    $parc = id do Parceiro 
	    $cad = id do SCC 
	    $tipo = id do Tipo
	Saída:
	    Um conjunto de instâncias da Classe EixoQuatro com seus devidos atributos
	-----------------------------------------------------------------------------*/
	public static function getter_barras($var, $parc, $cad, $tipo, $uf, $mundo, $slc, $uos){

		self::connect();
        $stmt = mysqli_stmt_init(self::$conn);
        $params = [];
        
        $query = "SELECT * FROM ".self::$table." AS ex"
                ." JOIN Parceiro AS parc ON parc.idParceiro = ex.idParceiro AND parc.idParceiro = ?"
                ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                ." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
                ." JOIN Tipo AS tipo ON tipo.idTipo = ex.idTipo AND tipo.idTipo = ?"
               ." WHERE ex.Numero = ?";

        $params[] = $parc;
        $params[] = $uf;
        
        //variáveis de IHH e C4
        if($var == 5 || $var == 8){
            $params[] = $uos;
        } else {
            $params[] = $cad;
        }
        $params[] = $tipo;
        $params[] = $var;
        
        if($slc == 0) {
			$query .= " AND ex.Consumo = 1";
        } else {
			$query .= " AND ex.Consumo = 0";
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
	Função: Getter Region
	    função para obter um conjunto de tuplas para treemap region
	Entrada: 
	    $var = número da váriavel  
	    $cad = id do SCC 
	    $tipo = id do Tipo
	    $anos = ano 
	Saída:
	    Um conjunto de instâncias da Classe EixoQuatro com seus devidos atributos
	-----------------------------------------------------------------------------*/
	public static function getter_region($var, $cad, $tipo, $anos, $parc){

		self::connect();
        $stmt = mysqli_stmt_init(self::$conn);
        
        $query = "SELECT * FROM ".self::$table." AS ex"
               ." JOIN Parceiro AS parc ON parc.idParceiro = ex.idParceiro AND parc.ParceiroNome LIKE ?"
               ." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
               ." JOIN Tipo AS tipo ON tipo.idTipo = ex.idTipo AND tipo.idTipo = ?"
               ." WHERE ex.Numero = ?";
        
        $query .= ($anos > 0) ? " AND ex.Ano = ?" : "" ;
        
        if ($anos > 0) {
            if ($stmt->prepare($query)) {
                $stmt->bind_param(
                    'sssss',
                    $parc,
                    $cad,
                    $tipo,
                    $var,
                    $anos
                );
            }
        } else {
            if ($stmt->prepare($query)) {
                $stmt->bind_param(
                    'ssss',
                    $parc,
                    $cad,
                    $tipo,
                    $var
                );      
            }
        }            
        $stmt->execute();
        $allObjects = self::fetch_results($stmt);
        
		self::disconnect();
		return $allObjects;
	}

	public static function getter_donut($var, $cad, $ano, $cons, $uf, $parc){
		$cons = $cons == 0 ? 1: 0;
		self::connect();
        $stmt = mysqli_stmt_init(self::$conn);
        
        $query = "SELECT ex.Valor, ex.idTipo FROM ".self::$table." AS ex"
               ." JOIN Parceiro AS parc ON parc.idParceiro = ex.idParceiro AND parc.idParceiro = ?"
               ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
               ." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
               ." WHERE ex.Numero = ".$var." AND (ex.idTipo = 2 OR ex.idTipo = 1) AND ex.Consumo = ?";

        $query .= ($ano > 0) ? " AND ex.Ano = ?" : "" ;
        
        if ($ano > 0) {
            if ($stmt->prepare($query)) {
                $stmt->bind_param(
                    'sssss',
                    $parc,
                    $uf,
                    $cad,
                    $cons,
                    $ano
                );
            }
        } else {
            if ($stmt->prepare($query)) {
                $stmt->bind_param(
                    'ssss',
                    $parc,
                    $uf,
                    $cad,
                    $cons
                );
            }
        }            
        $stmt->execute();
        $allObjects = self::fetch_results($stmt);
        
		self::disconnect();
		return $allObjects;
	}

}
