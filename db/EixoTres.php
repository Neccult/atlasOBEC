<?php

###	Classe que manipula as variáveis do Eixo 2 ###

define('DB_NOME', 'Atlas');
define('DB_USUARIO', 'root');
define('DB_SENHA', 'root');
// define('DB_HOST', 'localhost');
define('DB_HOST', '143.54.231.143');
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

			$query = "SELECT * FROM ".self::$table." AS ex"
					." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ".$ufs
					." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ".$cad
					." JOIN Mecanismo AS mec ON mec.idMecanismo = ex.idMecanismo AND mec.idMecanismo = ".$mec
					." WHERE ex.Numero = ".$var;

            if(!is_null($pf)) {
			    $query .= " AND ex.PessoaFisica = ".$pf;
            }
            if(!is_null($mod)) {
			    $query .= " AND ex.Modalidade = ".$mod;
            }
            $query .= " AND ex.Ano = ".$anos;

			$result = mysqli_query(self::$conn, $query);
			$obj = mysqli_fetch_object($result, 'EixoTres');

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
	public static function getter_mapa($var, $cad, $mec, $pf, $anos){

		self::connect();		
			$query = "SELECT * FROM ".self::$table." AS ex"
					." JOIN UF AS uf ON uf.idUF = ex.idUF"
					." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ".$cad
					." JOIN Mecanismo AS mec ON mec.idMecanismo = ex.idMecanismo AND mec.idMecanismo = ".$mec
					." WHERE ex.Numero = ".$var;
            if(!is_null($pf)) {
                $query .= " AND ex.PessoaFisica = ".$pf;
            }
				$query .= ($anos > 0) ? " AND ex.Ano = ".$anos : "" ;

			$result = mysqli_query(self::$conn, $query);
			$allObjects = array();

			while($obj = mysqli_fetch_object($result, 'EixoTres')){
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
	    $ufs = id do UF 
	    $cad = id do SCC 
	    $mec = id do Mecanismo
	    $pf = flag PessoaFisica
		$mod = flag Modalidade
	Saída:
	    Um conjunto de instâncias da Classe EixoTres com seus devidos atributos
	-----------------------------------------------------------------------------*/
	public static function getter_barras($var, $ufs, $cad, $mec, $pf, $mod, $ano = NULL, $uos){

		self::connect();		
			if(is_null($ano) || $var < 14) {
                $query = "SELECT * FROM " . self::$table . " AS ex"
                    . " JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = " . $ufs
                    . " JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = " . $cad
                    . " JOIN Mecanismo AS mec ON mec.idMecanismo = ex.idMecanismo AND mec.idMecanismo = " . $mec
                    . " WHERE ex.Numero = " . $var;

                if (!is_null($pf)) {
                    $query .= " AND ex.PessoaFisica = " . $pf;
                }
                if (!is_null($mod)) {
                    $query .= " AND ex.Modalidade = " . $mod;
                }
            }
            else if($uos == 0) {
                $query = "SELECT * FROM " . self::$table . " AS ex"
                    . " JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF"
                    . " JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = " . $cad
                    . " JOIN Mecanismo AS mec ON mec.idMecanismo = ex.idMecanismo AND mec.idMecanismo = " . $mec
                    . " WHERE ex.Numero = " . $var
                    . " AND ex.Ano = ".$ano;

                if (!is_null($pf)) {
                    $query .= " AND ex.PessoaFisica = " . $pf;
                }
                if (!is_null($mod)) {
                    $query .= " AND ex.Modalidade = " . $mod;
                }
            }
            else if($uos == 1) {
                $query = "SELECT * FROM " . self::$table . " AS ex"
                    . " JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = " . $ufs
                    . " JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia"
                    . " JOIN Mecanismo AS mec ON mec.idMecanismo = ex.idMecanismo AND mec.idMecanismo = " . $mec
                    . " WHERE ex.Numero = " . $var
                    . " AND ex.Ano = ".$ano;

                if (!is_null($pf)) {
                    $query .= " AND ex.PessoaFisica = " . $pf;
                }
                if (!is_null($mod)) {
                    $query .= " AND ex.Modalidade = " . $mod;
                }
            }

			$result = mysqli_query(self::$conn, $query);
			$allObjects = array();

			while($obj = mysqli_fetch_object($result, 'EixoTres')){
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
					." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.UFRegiao LIKE '".$regiao."'"
					." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ".$cad
					." JOIN Mecanismo AS mec ON mec.idMecanismo = ex.idMecanismo AND mec.idMecanismo = ".$mec
					." WHERE ex.Numero = ".$var;
			if(!is_null($pf)) {
                $query .= " AND ex.PessoaFisica = " . $pf;
            }
            if(!is_null($mod)) {
                $query .= " AND ex.Modalidade = ".$mod;
            }

				$query .= ($anos > 0) ? " AND Ano = ".$anos : "" ;

			$result = mysqli_query(self::$conn, $query);
			$allObjects = array();

			while($obj = mysqli_fetch_object($result, 'EixoTres')){
				$allObjects[] = $obj;
			}

		self::disconnect();
		
		return $allObjects;
	}

}

?>