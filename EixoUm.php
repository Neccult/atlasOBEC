<?php

###	Classe que manipula as variáveis do Eixo I ###

class EixoUm {

## Atributos

	protected static $table = 'Eixo_1';
	private static $conn;

 	//informações Eixo_1
	protected $id;
	public $Numero;
	public $idUF;
	public $idAtuacao;
	public $idCadeia;
	public $idPorte;
	public $Ano;
	public $Valor;
	public $Percentual;

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


## Metodos

	//função de conexão com o banco de dados
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

	//função para desconectar
	public static function disconnect(){
		mysqli_close(self::$conn);
	}

	//função para buscar uma tupla
	public static function find($var, $ufs, $atc, $cad, $prt, $anos){

		self::connect();

			$query = "SELECT * FROM ".self::$table." AS ex"
					." JOIN UF AS uf ON uf.idUF =  ex.idUF AND uf.idUF = ".$ufs
					." JOIN Atuacao AS atc ON atc.idAtuacao =  ex.idAtuacao AND atc.idAtuacao = ".$atc
					." JOIN Cadeia AS cad ON cad.idCadeia =  ex.idCadeia AND cad.idCadeia = ".$cad
					." JOIN Porte AS prt ON prt.idPorte =  ex.idPorte AND prt.idPorte = ".$prt
					." WHERE Numero = ".$var
					." AND Ano = ".$anos;

			$result = mysqli_query(self::$conn, $query);
			$obj = mysqli_fetch_object($result, 'EixoUm');

		self::disconnect();

		return ($obj == false) ? NULL : $obj;
	}

	//função para buscar todas tuplas
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

	//função para pegar conjunto de tuplas para o mapa
	public static function getter_mapa($var, $atc, $cad, $prt, $anos){

		self::connect();		
			$query = "SELECT * FROM ".self::$table." AS ex"
					." JOIN UF AS uf ON uf.idUF =  ex.idUF"
					." JOIN Atuacao AS atc ON atc.idAtuacao =  ex.idAtuacao AND atc.idAtuacao = ".$atc
					." JOIN Cadeia AS cad ON cad.idCadeia =  ex.idCadeia AND cad.idCadeia = ".$cad
					." JOIN Porte AS prt ON prt.idPorte =  ex.idPorte AND prt.idPorte = ".$prt
					." WHERE ex.Numero = ".$var;

				$query .= ($anos > 0) ? " AND ex.Ano = ".$anos : "" ;

			$result = mysqli_query(self::$conn, $query);
			$allObjects = array();

			while($obj = mysqli_fetch_object($result, 'EixoUm')){
				$allObjects[] = $obj;
			}

		self::disconnect();
		
		return $allObjects;
	}

	//função para pegar conjunto de tuplas para as barras
	public static function getter_barras($var, $ufs, $atc, $cad, $prt){

		self::connect();		
			$query = "SELECT * FROM ".self::$table." AS ex"
					." JOIN UF AS uf ON uf.idUF =  ex.idUF AND uf.idUF = ".$ufs
					." JOIN Atuacao AS atc ON atc.idAtuacao =  ex.idAtuacao AND atc.idAtuacao = ".$atc
					." JOIN Cadeia AS cad ON cad.idCadeia =  ex.idCadeia AND cad.idCadeia = ".$cad
					." JOIN Porte AS prt ON prt.idPorte =  ex.idPorte AND prt.idPorte = ".$prt
					." WHERE Numero = ".$var;

			$result = mysqli_query(self::$conn, $query);
			$allObjects = array();

			while($obj = mysqli_fetch_object($result, 'EixoUm')){
				$allObjects[] = $obj;
			}

		self::disconnect();
		
		return $allObjects;
	}
	

	//função para pegar conjunto de tuplas para o mapa
	public static function getter_region($var, $atc, $cad, $prt, $anos, $regiao){

		self::connect();		
			$query = "SELECT * FROM ".self::$table." AS ex"
					." JOIN UF AS uf ON uf.idUF =  ex.idUF AND uf.UFRegiao LIKE '".$regiao."'"
					." JOIN Atuacao AS atc ON atc.idAtuacao =  ex.idAtuacao AND atc.idAtuacao = ".$atc
					." JOIN Cadeia AS cad ON cad.idCadeia =  ex.idCadeia AND cad.idCadeia = ".$cad
					." JOIN Porte AS prt ON prt.idPorte =  ex.idPorte AND prt.idPorte = ".$prt
					." WHERE Numero = ".$var;

				$query .= ($anos > 0) ? " AND Ano = ".$anos : "" ;

			$result = mysqli_query(self::$conn, $query);
			$allObjects = array();

			while($obj = mysqli_fetch_object($result, 'EixoUm')){
				$allObjects[] = $obj;
			}

		self::disconnect();
		
		return $allObjects;
	}

}

// echo "teste!";

?>