<?php

###	Classe que manipula as variáveis do Eixo 2 ###

class EixoQuatro {

## Atributos ##

	protected static $table = 'Eixo_4';
	private static $conn;

 	//informações Eixo_4
	protected $id;
	public $Numero;
	public $idCadeia;
	public $idParceiro;
	public $idTipo;

	public $Ano;
	public $Valor;
	public $Percentual;
	public $Taxa;

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
		define('DB_NOME', 'Atlas');
		define('DB_USUARIO', 'root');
		define('DB_SENHA', 'root');
		// define('DB_HOST', 'localhost');
		define('DB_HOST', '143.54.231.143');

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
	public static function find($var, $parc, $cad, $tipo, $anos){

		self::connect();

			$query = "SELECT * FROM ".self::$table." AS ex"
					." JOIN Parceiro AS parc ON parc.idParceiro = ex.idParceiro AND parc.idParceiro = ".$parc
					." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ".$cad
					." JOIN Tipo AS tipo ON tipo.idTipo = ex.idTipo AND tipo.idTipo = ".$tipo
					." WHERE ex.Numero = ".$var
					." AND ex.Ano = ".$anos;

			$result = mysqli_query(self::$conn, $query);
			$obj = mysqli_fetch_object($result, 'EixoQuatro');

		self::disconnect();

		return ($obj == false) ? NULL : $obj;
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
	public static function getter_mapa($var, $cad, $tipo, $anos){

		self::connect();		
			$query = "SELECT * FROM ".self::$table." AS ex"
					." JOIN Parceiro AS parc ON parc.idParceiro = ex.idParceiro"
					." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ".$cad
					." JOIN Tipo AS tipo ON tipo.idTipo = ex.idTipo AND tipo.idTipo = ".$tipo
					." WHERE ex.Numero = ".$var;

				$query .= ($anos > 0) ? " AND ex.Ano = ".$anos : "" ;

			$result = mysqli_query(self::$conn, $query);
			$allObjects = array();

			while($obj = mysqli_fetch_object($result, 'EixoQuatro')){
				$allObjects[] = $obj;
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
	public static function getter_barras($var, $parc, $cad, $tipo){

		self::connect();		
			$query = "SELECT * FROM ".self::$table." AS ex"
					." JOIN Parceiro AS parc ON parc.idParceiro = ex.idParceiro AND parc.idParceiro = ".$parc
					." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ".$cad
					." JOIN Tipo AS tipo ON tipo.idTipo = ex.idTipo AND tipo.idTipo = ".$tipo
					." WHERE ex.Numero = ".$var;

			$result = mysqli_query(self::$conn, $query);
			$allObjects = array();

			while($obj = mysqli_fetch_object($result, 'EixoQuatro')){
				$allObjects[] = $obj;
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
	public static function getter_region($var, $cad, $tipo, $anos){

		self::connect();		
			$query = "SELECT * FROM ".self::$table." AS ex"
					." JOIN Parceiro AS parc ON parc.idParceiro = ex.idParceiro"
					." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ".$cad
					." JOIN Tipo AS tipo ON tipo.idTipo = ex.idTipo AND tipo.idTipo = ".$tipo
					." WHERE ex.Numero = ".$var;

				$query .= ($anos > 0) ? " AND Ano = ".$anos : "" ;

			$result = mysqli_query(self::$conn, $query);
			$allObjects = array();

			while($obj = mysqli_fetch_object($result, 'EixoQuatro')){
				$allObjects[] = $obj;
			}

		self::disconnect();
		
		return $allObjects;
	}

}

?>