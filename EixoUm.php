<?php

###	Classe que manipula as variáveis do Eixo I ###

class EixoUm {

## Atributos

	protected static $table = 'Eixo_1';
	private static $conn;

 	//campos da tabelas
	protected $pk = 'id';
	public $Numero;
	public $idUF;
	public $idAtuacao;
	public $idCadeia;
	public $idPorte;
	public $Ano;
	public $Valor;
	public $Percentual;

## Metodos

	//função de conexão com o banco de dados
	public static function connect(){
		define('DB_NOME', 'Atlas');
		define('DB_USUARIO', 'root');
		define('DB_SENHA', 'root');
		define('DB_HOST', 'localhost');

		$conexao = mysqli_connect(DB_HOST, DB_USUARIO, DB_SENHA, DB_NOME);

		if (mysqli_connect_errno())
		{
			echo "Failed to connect to MySQL: " . mysqli_connect_error();
		}

		self::$conn = $conexao;

	}

	//função para desconectar
	public static function disconnect(){
		mysqli_close(self::$conn);
	}

	//função para buscar uma tupla
	public static function find($var, $ufs, $atc, $cad, $prt, $anos){

		self::connect();

			$query = "SELECT * FROM ".self::$table
					." WHERE Numero = ".$var
					." AND idUF = ".$ufs
					." AND idAtuacao = ".$atc
					." AND idCadeia = ".$cad
					." AND idPorte = ".$prt
					." AND Ano = ".$anos;

			$result = mysqli_query(self::$conn, $query);
			$obj = mysqli_fetch_object($result, 'EixoUm');

		self::disconnect();

		return ($obj == false) ? NULL : $obj;
	}

	//função para buscar todas tuplas
	public static function all(){
		self::connect();
		$query = "SELECT * FROM ".self::$table." ORDER BY id";
		$result = mysqli_query(self::$conn, $query);
		$allObjects = array();
		while($obj = mysqli_fetch_object($result, 'EixoUm')){
			$allObjects[] = $obj;
		}
		self::disconnect();
		return $allObjects;
	}

	//função teste
	//função para buscar uma tupla com join
	public static function teste($id){

		self::connect();

			$query = "SELECT * FROM ".self::$table. "AS ex"
					."JOIN Porte as por ON por.id = ex.idPorte"
					." WHERE ex.id = ".$id;

			$result = mysqli_query(self::$conn, $query);
			$obj = mysqli_fetch_object($result, 'EixoUm');

		self::disconnect();

		return ($obj == false) ? NULL : $obj;
	}
}

// echo "teste!";

?>