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

		$query = "SELECT MAX(Ano) AS Ano, Numero, idOcupacao FROM `Eixo_2` WHERE `idUF` = 0 AND `idPorte` = 0 AND `idEscolaridade` = 0 AND `idEtinia` = 0 AND `idIdade` = 0 AND `Formalidade` = 0 AND `Previdencia` = 0 AND `Sindical` = 0 AND `Sexo` is NULL GROUP BY Numero, idOcupacao";
        $result = mysqli_query(self::$conn, $query);
        		
		self::disconnect();

        $allObjects = array();

        while($obj = mysqli_fetch_object($result, 'EixoDois')){
            $allObjects[] = $obj;
        }

		return $allObjects;
    }
    
    public static function getAnoDefault($var){
		self::connect();

		$query = "SELECT MAX(Ano) AS Ano FROM `Eixo_2` WHERE `idUF` = 0 AND Numero = ".$var." GROUP BY Numero";
		$result = mysqli_query(self::$conn, $query);
		
		self::disconnect();

		$obj = mysqli_fetch_object($result, 'EixoDois');
		
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
	public static function find($var, $ufs, $cad, $prt, $ocp, $esc, $etn, $idd, $form, $prev, $sind, $sexos, $anos){

		self::connect();
        $stmt = mysqli_stmt_init(self::$conn);
        
        if($ocp != 0) {
            if($esc != 0) {
                $query = "SELECT * FROM " . self::$table . " AS ex"
                       . " JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                       . " JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                       . " JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                       . " JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade != 0"
                       . " JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                       . " JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                       . " WHERE ex.Numero = ?"
                       . " AND ex.Formalidade = ?"
                        . " AND ex.Previdencia = ?"
                       . " AND ex.Sindical = ?"
                       . " AND ex.Sexo IS NULL"
                       . " AND ex.Ano = ?";
                
                if (mysqli_stmt_prepare($stmt, $query)) {
                    $stmt->bind_param(
                        'ssssssssss',
                        $ufs,
                        $prt,
                        $ocp,
                        $etn,
                        $idd,
                        $var,
                        $form,
                        $prev,
                        $sind,
                        $anos
                    );
                }
                    
            } else if($idd != 0) {
                $query = "SELECT * FROM ".self::$table." AS ex"
                       ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                       ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                       ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                       ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                       ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                       ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade != 0"
                       ." WHERE ex.Numero = ?"
                       ." AND ex.Formalidade = ?"
                       ." AND ex.Previdencia = ?"
                       ." AND ex.Sindical = ?"
                       ." AND ex.Sexo IS NULL"
                       ." AND ex.Ano = ?";

                if (mysqli_stmt_prepare($stmt, $query)) {
                    $stmt->bind_param(
                        'ssssssssss',
                        $ufs,
                        $prt,
                        $ocp,
                        $esc,
                        $etn,
                        $var,
                        $form,
                        $prev,
                        $sind,
                        $anos
                    );
                }
                
            } else if($form != 0) {
                $query = "SELECT * FROM ".self::$table." AS ex"
                       ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                       ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                       ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                       ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                       ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                       ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                       ." WHERE ex.Numero = ?"
                       ." AND ex.Formalidade != 0"
                       ." AND ex.Previdencia = ?"
                       ." AND ex.Sindical = ?"
                       ." AND ex.Sexo IS NULL"
                       ." AND ex.Ano = ?";

                if (mysqli_stmt_prepare($stmt, $query)) {
                    $stmt->bind_param(
                        'ssssssssss',
                        $ufs,
                        $prt,
                        $ocp,
                        $esc,
                        $etn,
                        $idd,
                        $var,
                        $prev,
                        $sind,
                        $anos
                    );
                }
            } else if($sind != 0) {
                $query = "SELECT * FROM ".self::$table." AS ex"
                       ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                       ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                       ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                       ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                       ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                       ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                       ." WHERE ex.Numero = ?"
                       ." AND ex.Formalidade = ?"
                       ." AND ex.Previdencia = ?"
                       ." AND ex.Sindical != 0"
                       ." AND ex.Sexo IS NULL"
                       ." AND ex.Ano = ?";

                if (mysqli_stmt_prepare($stmt, $query)) {
                    $stmt->bind_param(
                        'ssssssssss',
                        $ufs,
                        $prt,
                        $ocp,
                        $esc,
                        $etn,
                        $idd,
                        $var,
                        $form,
                        $prev,
                        $anos
                    );
                }
            } else if($prev != 0) {
                $query = "SELECT * FROM ".self::$table." AS ex"
                       ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                       ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                       ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                       ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                       ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                       ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                       ." WHERE ex.Numero = ?"
                       ." AND ex.Formalidade = ?"
                       ." AND ex.Previdencia != 0"
                       ." AND ex.Sindical = ?"
                       ." AND ex.Sexo IS NULL"
                       ." AND ex.Ano = ?";

                if (mysqli_stmt_prepare($stmt, $query)) {
                    $stmt->bind_param(
                        'ssssssssss',
                        $ufs,
                        $prt,
                        $ocp,
                        $esc,
                        $etn,
                        $idd,
                        $var,
                        $form,
                        $sind,
                        $anos
                    );
                }
            } else if($etn != 0) {
                $query = "SELECT * FROM ".self::$table." AS ex"
                       ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                       ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                       ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                       ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                       ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia != 0"
                       ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                       ." WHERE ex.Numero = ?"
                       ." AND ex.Formalidade = ?"
                       ." AND ex.Previdencia = ?"
                       ." AND ex.Sindical = ?"
                       ." AND ex.Sexo IS NULL"
                       ." AND ex.Ano = ?";

                if (mysqli_stmt_prepare($stmt, $query)) {
                    $stmt->bind_param(
                        'ssssssssss',
                        $ufs,
                        $prt,
                        $ocp,
                        $esc,
                        $idd,
                        $var,
                        $form,
                        $prev,
                        $sind,
                        $anos
                    );
                }
            } else {
                $query = "SELECT * FROM ".self::$table." AS ex"
                       ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                       ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                       ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                       ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                       ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                       ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                       ." WHERE ex.Numero = ?"
                       ." AND ex.Formalidade = ?"
                       ." AND ex.Previdencia = ?"
                       ." AND ex.Sindical = "
                       ." AND ex.Sexo IS NULL"
                       ." AND ex.Ano = ?";

                if (mysqli_stmt_prepare($stmt, $query)) {
                    $stmt->bind_param(
                        'sssssssssss',
                        $ufs,
                        $prt,
                        $ocp,
                        $esc,
                        $etn,
                        $idd,
                        $var,
                        $form,
                        $prev,
                        $sind,
                        $anos
                    );
                }
            }
        } else {
            if(!is_null($sexos)) {
                $query = "SELECT * FROM " . self::$table . " AS ex"
                       . " JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                       . " JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
                       . " JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                       . " JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                       . " JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                       . " JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                       . " JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                       . " WHERE ex.Numero = ?"
                       . " AND ex.Formalidade = ?"
                       . " AND ex.Previdencia = ?"
                       . " AND ex.Sindical = ?"
                       . " AND ex.Sexo IS NOT NULL"
                       . " AND ex.Ano = ?";
                
                if (mysqli_stmt_prepare($stmt, $query)) {
                    $stmt->bind_param(
                        'ssssssssssss',
                        $ufs,
                        $cad,
                        $prt,
                        $ocp,
                        $esc,
                        $etn,
                        $idd,
                        $var,
                        $form,
                        $prev,
                        $sind,
                        $anos
                    );
                }
            } else if($prt != 0) {
                $query = "SELECT * FROM " . self::$table . " AS ex"
                       . " JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                       . " JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte != 0"
                       . " JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
                       . " JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                       . " JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                       . " JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                       . " JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                       . " WHERE ex.Numero = ?"
                       . " AND ex.Formalidade = ?"
                        . " AND ex.Previdencia = ?"
                       . " AND ex.Sindical = ?"
                       . " AND ex.Sexo IS NULL"
                        . " AND ex.Ano = ?";
                
                if (mysqli_stmt_prepare($stmt, $query)) {
                    $stmt->bind_param(
                        'sssssssssss',
                        $ufs,
                        $cad,
                        $ocp,
                        $esc,
                        $etn,
                        $idd,
                        $var,
                        $form,
                        $prev,
                        $sind,
                        $anos
                    );
                }               
            }
            else if($esc != 0) {
                $query = "SELECT * FROM " . self::$table . " AS ex"
                       . " JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                       . " JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                       . " JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
                       . " JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                       . " JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade != 0"
                       . " JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                       . " JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                       . " WHERE ex.Numero = ?"
                       . " AND ex.Formalidade = ?"
                       . " AND ex.Previdencia = ?"
                       . " AND ex.Sindical = ?"
                       . " AND ex.Sexo IS NULL"
                       . " AND ex.Ano = ?";
                if (mysqli_stmt_prepare($stmt, $query)) {
                    $stmt->bind_param(
                        'sssssssssss',
                        $ufs,
                        $prt,
                        $cad,
                        $ocp,
                        $etn,
                        $idd,
                        $var,
                        $form,
                        $prev,
                        $sind,
                        $anos
                    );
                }               
                
            } else if($idd != 0) {
                $query = "SELECT * FROM ".self::$table." AS ex"
                       ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                       ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                       . " JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
                       ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                       ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                       ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                       ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade != 0"
                       ." WHERE ex.Numero = ?"
                       ." AND ex.Formalidade = ?"
                       ." AND ex.Previdencia = ?"
                       ." AND ex.Sindical = ?"
                       ." AND ex.Sexo IS NULL"
                       ." AND ex.Ano = ?";
                if (mysqli_stmt_prepare($stmt, $query)) {
                    $stmt->bind_param(
                        'sssssssssss',
                        $ufs,
                        $cad,
                        $prt,
                        $ocp,
                        $esc,
                        $etn,
                        $var,
                        $form,
                        $prev,
                        $sind,
                        $anos
                    );
                }                
            } else {
                $query = "SELECT * FROM " . self::$table . " AS ex"
                       . " JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                       . " JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
                       . " JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                       . " JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                       . " JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                       . " JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                       . " JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                       . " WHERE ex.Numero = ?"
                       . " AND ex.Formalidade = ?"
                       . " AND ex.Previdencia = ?"
                        . " AND ex.Sindical = ?"
                       . " AND ex.Sexo IS NULL"
                        . " AND ex.Ano = ?";
                if (mysqli_stmt_prepare($stmt, $query)) {
                    $stmt->bind_param(
                        'ssssssssssss',
                        $ufs,
                        $cad,
                        $prt,
                        $ocp,
                        $esc,
                        $etn,
                        $idd,
                        $var,
                        $form,
                        $prev,
                        $sind,
                        $anos
                    );
                }                
            }
        }
        
        $stmt->execute();
        $allObjects = self::fetch_results($stmt);        

        self::disconnect();

		return $allObjects;
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
        $query = "SELECT * FROM ".self::$table." AS ex"
               ." JOIN UF AS uf ON uf.idUF = ex.idUF"
               ." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
               ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = 0"
               ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
               ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = 0"
               ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = 0"
               ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = 0"
               ." WHERE ex.Numero = ?"
               ." AND ex.Sexo IS NULL";
        
        $stmt = mysqli_stmt_init(self::$conn);
        $query .= ($anos > 0) ? " AND ex.Ano = ?" : "";
        if (mysqli_stmt_prepare($stmt, $query)) {
            if ($anos > 0) {
                $stmt->bind_param(
                    'ssss',
                    $cad,
                    $ocp,
                    $var,
                    $anos
                );
                
            } else {
                $stmt->bind_param(
                    'ssss',
                    $cad,
                    $ocp,
                    $var
                );
            }
        }
        $stmt->execute();
        $allObjects = self::fetch_results($stmt);
        
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
	public static function getter_barras($var, $ufs, $cad, $prt, $ocp, $esc, $etn, $idd, $form, $prev, $sind, $sexos, $uos, $slc){
		self::connect();
        $stmt = mysqli_stmt_init(self::$conn);
        if($slc == 0) {
            if($uos == 0) {
                if($ocp != 0) {
                    $query = "SELECT * FROM ".self::$table." AS ex"
                           ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
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

                    if (mysqli_stmt_prepare($stmt, $query)) {
                        $stmt->bind_param(
                            'sssssssssss',
                            $ufs,
                            $prt,
                            $ocp,
                            $esc,
                            $etn,
                            $idd,
                            $var,
                            $form,
                            $prev,
                            $sind,
                            $sexos
                        );
                    }
                } else {
                    if(!is_null($sexos)) {
                        $query = "SELECT * FROM ".self::$table." AS ex"
                               ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
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
                               ." AND ex.Sexo IS NOT NULL";
                        
                        if (mysqli_stmt_prepare($stmt, $query)) {
                            $stmt->bind_param(
                                'sssssssssss',
                                $ufs,
                                $cad,
                                $prt,
                                $ocp,
                                $esc,
                                $etn,
                                $idd,
                                $var,
                                $form,
                                $prev,
                                $sind
                            );
                        }
                        
                    } else if($prt != 0) {
                        $query = "SELECT * FROM ".self::$table." AS ex"
                               ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                               ." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
                               ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte != 0"
                               ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                               ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                               ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                               ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                               ." WHERE ex.Numero = ?"
                               ." AND ex.Formalidade = ?"
                               ." AND ex.Previdencia = ?"
                               ." AND ex.Sindical = ?"
                               ." AND ex.Sexo IS NULL";
                        
                        if (mysqli_stmt_prepare($stmt, $query)) {
                            $stmt->bind_param(
                                'ssssssssss',
                                $ufs,
                                $cad,
                                $ocp,
                                $esc,
                                $etn,
                                $idd,
                                $var,
                                $form,
                                $prev,
                                $sind
                            );
                        }
                        
                    } else if($esc != 0) {
                        $query = "SELECT * FROM ".self::$table." AS ex"
                               ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ".$ufs
                               ." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ".$cad
                               ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ".$prt
                               ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ".$ocp
                               ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade != 0"
                               ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ".$etn
                               ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ".$idd
                               ." WHERE ex.Numero = ".$var
                               ." AND ex.Formalidade = ".$form
                               ." AND ex.Previdencia = ".$prev
                               ." AND ex.Sindical = ".$sind
                               ." AND ex.Sexo IS NULL";

                        if (mysqli_stmt_prepare($stmt, $query)) {
                            $stmt->bind_param(
                                'ssssssssss',
                                $ufs,
                                $cad,
                                $prt,
                                $ocp,
                                $etn,
                                $idd,
                                $var,
                                $form,
                                $prev,
                                $sind
                            );
                        }
                        
                    } else if($idd != 0) {
                        $query = "SELECT * FROM ".self::$table." AS ex"
                               ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                               ." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = ?"
                               ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                               ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                               ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                               ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                               ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade != 0"
                               ." WHERE ex.Numero = ?"
                               ." AND ex.Formalidade = ?"
                               ." AND ex.Previdencia = ?"
                               ." AND ex.Sindical = ?"
                               ." AND ex.Sexo IS NULL";
                        if (mysqli_stmt_prepare($stmt, $query)) {
                            $stmt->bind_param(
                                'ssssssssss',
                                $ufs,
                                $cad,
                                $prt,
                                $ocp,
                                $esc,
                                $etn,
                                $var,
                                $form,
                                $prev,
                                $sind
                            );
                        }                        
                    } else {
                        $query = "SELECT * FROM ".self::$table." AS ex"
                               ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
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
                        
                        if (mysqli_stmt_prepare($stmt, $query)) {
                            $stmt->bind_param(
                                'sssssssssss',
                                $ufs,
                                $cad,
                                $prt,
                                $ocp,
                                $esc,
                                $etn,
                                $idd,
                                $var,
                                $form,
                                $prev,
                                $sind
                            );
                        }                        
                    }
                }
            } else {
                $query = "SELECT * FROM ".self::$table." AS ex"
                       ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                       ." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = 1"
                       ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                       ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                       ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                       ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                       ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                       ." WHERE ex.Numero = ?"
                       ." AND ex.Formalidade = ?"
                       ." AND ex.Previdencia = ?"
                       ." AND ex.Sindical = ?";

                if (mysqli_stmt_prepare($stmt, $query)) {
                    $stmt->bind_param(
                        'ssssssssss',
                        $ufs,
                        $prt,
                        $ocp,
                        $esc,
                        $etn,
                        $idd,
                        $var,
                        $form,
                        $prev,
                        $sind
                    );
                }
            }
        } else {
            if($uos == 0) {
                if($esc != 0) {
                    $query = "SELECT * FROM ".self::$table." AS ex"
                           ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                           ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                           ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                           ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade != 0"
                           ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                           ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                           ." WHERE ex.Numero = ?"
                           ." AND ex.Formalidade = ?"
                           ." AND ex.Previdencia = ?"
                           ." AND ex.Sindical = ?"
                           ." AND ex.Sexo IS NULL";

                    if (mysqli_stmt_prepare($stmt, $query)) {
                        $stmt->bind_param(
                            'sssssssss',
                            $ufs,
                            $prt,
                            $ocp,
                            $etn,
                            $idd,
                            $var,
                            $form,
                            $prev,
                            $sind
                        );
                    }
                    
                } else if($idd != 0) {
                    $query = "SELECT * FROM ".self::$table." AS ex"
                           ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                           ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                           ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                           ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                           ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                           ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade != 0"
                           ." WHERE ex.Numero = ?"
                           ." AND ex.Formalidade = ?"
                           ." AND ex.Previdencia = ?"
                           ." AND ex.Sindical = ?"
                           ." AND ex.Sexo IS NULL";

                    if (mysqli_stmt_prepare($stmt, $query)) {
                        $stmt->bind_param(
                            'sssssssss',
                            $ufs,
                            $prt,
                            $ocp,
                            $esc,
                            $etn,
                            $var,
                            $form,
                            $prev,
                            $sind
                        );
                    }
                    
                } else if($form != 0) {
                    $query = "SELECT * FROM ".self::$table." AS ex"
                           ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                           ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                           ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                           ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                           ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                           ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                           ." WHERE ex.Numero = ?"
                           ." AND ex.Formalidade != 0"
                           ." AND ex.Previdencia = ?"
                           ." AND ex.Sindical = ?"
                           ." AND ex.Sexo IS NULL";

                    if (mysqli_stmt_prepare($stmt, $query)) {
                        $stmt->bind_param(
                            'sssssssss',
                            $ufs,
                            $prt,
                            $ocp,
                            $esc,
                            $etn,
                            $idd,
                            $var,
                            $prev,
                            $sind
                        );
                    }
                    
                } else if($sind != 0) {
                    $query = "SELECT * FROM ".self::$table." AS ex"
                           ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                           ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                           ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                           ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                           ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                           ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                           ." WHERE ex.Numero = ?"
                           ." AND ex.Formalidade = ?"
                           ." AND ex.Previdencia = ?"
                           ." AND ex.Sindical != 0"
                           ." AND ex.Sexo IS NULL";

                    if (mysqli_stmt_prepare($stmt, $query)) {
                        $stmt->bind_param(
                            'sssssssss',
                            $ufs,
                            $prt,
                            $ocp,
                            $esc,
                            $etn,
                            $idd,
                            $var,
                            $form,
                            $prev
                        );
                    }
                    
                } else if($prev != 0) {
                    $query = "SELECT * FROM ".self::$table." AS ex"
                           ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                           ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                           ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                           ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                           ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                           ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                           ." WHERE ex.Numero = ?"
                           ." AND ex.Formalidade = ?"
                           ." AND ex.Previdencia != 0"
                           ." AND ex.Sindical = ?"
                           ." AND ex.Sexo IS NULL";

                    if (mysqli_stmt_prepare($stmt, $query)) {
                        $stmt->bind_param(
                            'sssssssss',
                            $ufs,
                            $prt,
                            $ocp,
                            $esc,
                            $etn,
                            $idd,
                            $var,
                            $form,
                            $sind
                        );
                    }
                    
                } else if($etn != 0) {
                    $query = "SELECT * FROM ".self::$table." AS ex"
                           ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                           ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                           ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                           ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                           ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia != 0"
                           ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                           ." WHERE ex.Numero = ?"
                           ." AND ex.Formalidade = ?"
                           ." AND ex.Previdencia = ?"
                           ." AND ex.Sindical = ?"
                           ." AND ex.Sexo IS NULL";
                    if (mysqli_stmt_prepare($stmt, $query)) {
                        $stmt->bind_param(
                            'sssssssss',
                            $ufs,
                            $prt,
                            $ocp,
                            $esc,
                            $idd,
                            $var,
                            $form,
                            $prev,
                            $sind
                        );
                    }
                    
                } else {
                    $query = "SELECT * FROM ".self::$table." AS ex"
                           ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
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
                }
                
                if (mysqli_stmt_prepare($stmt, $query)) {
                    $stmt->bind_param(
                        'ssssssssss',
                        $ufs,
                        $prt,
                        $ocp,
                        $esc,
                        $etn,
                        $idd,
                        $var,
                        $form,
                        $prev,
                        $sind
                    );
                }
            } else {
                $query = "SELECT * FROM ".self::$table." AS ex"
                       ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.idUF = ?"
                       ." JOIN Cadeia AS cad ON cad.idCadeia = ex.idCadeia AND cad.idCadeia = 1"
                       ." JOIN Porte AS prt ON prt.idPorte = ex.idPorte AND prt.idPorte = ?"
                       ." JOIN Ocupacao AS ocp ON ocp.idOcupacao = ex.idOcupacao AND ocp.idOcupacao = ?"
                       ." JOIN Escolaridade AS esc ON esc.idEscolaridade = ex.idEscolaridade AND esc.idEscolaridade = ?"
                       ." JOIN Etinia AS etn ON etn.idEtinia = ex.idEtinia AND etn.idEtinia = ?"
                       ." JOIN Idade AS idd ON idd.idIdade = ex.idIdade AND idd.idIdade = ?"
                       ." WHERE ex.Numero = ?"
                       ." AND ex.Formalidade = ?"
                       ." AND ex.Previdencia = ?"
                       ." AND ex.Sindical = ?";
                if (mysqli_stmt_prepare($stmt, $query)) {
                    $stmt->bind_param(
                        'ssssssssss',
                        $ufs,
                        $prt,
                        $ocp,
                        $esc,
                        $etn,
                        $idd,
                        $var,
                        $form,
                        $prev,
                        $sind
                    );
                }
            }
        }
        $stmt->execute();
        $allObjects = self::fetch_results($stmt);
        
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
	public static function getter_region($var, $cad, $prt, $ocp, $esc, $etn, $idd, $form, $prev, $sind, $sexos, $anos, $regiao){
        
		self::connect();
        $stmt = mysqli_stmt_init(self::$conn);
        
        if(is_null($sexos)) {
            if($ocp != 0) {
                $query = "SELECT * FROM ".self::$table." AS ex"
                       ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.UFRegiao LIKE ?"
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
                
                if (mysqli_stmt_prepare($stmt, $query)) {
                    if ($anos > 0) {
                        $stmt->bind_param(
                            'sssssssssss',
                            $regiao,
                            $prt,
                            $ocp,
                            $esc,
                            $etn,
                            $idd,
                            $var,
                            $form,
                            $prev,
                            $sind,
                            $anos
                        );
                        
                    } else {
                        $stmt->bind_param(
                            'ssssssssss',
                            $regiao,
                            $prt,
                            $ocp,
                            $esc,
                            $etn,
                            $idd,
                            $var,
                            $form,
                            $prev,
                            $sind
                        );
                    }
                }
            } else {
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
                       ." AND ex.Sindical = ?"
                       ." AND ex.Sexo IS NULL";
                
                if (mysqli_stmt_prepare($stmt, $query)) {
                    if ($anos > 0) {
                        $stmt->bind_param(
                            'ssssssssssss',
                            $regiao,
                            $cad,
                            $prt,
                            $ocp,
                            $esc,
                            $etn,
                            $idd,
                            $var,
                            $form,
                            $prev,
                            $sind,
                            $anos
                        );
                        
                    } else {
                        $stmt->bind_param(
                            'sssssssssss',
                            $regiao,
                            $cad,
                            $prt,
                            $ocp,
                            $esc,
                            $etn,
                            $idd,
                            $var,
                            $form,
                            $prev,
                            $sind
                        );
                    }
                }
            }
        } else {
            if($ocp != 0) {
                $query = "SELECT * FROM ".self::$table." AS ex"
                       ." JOIN UF AS uf ON uf.idUF = ex.idUF AND uf.UFRegiao LIKE ?"
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
                    
                if (mysqli_stmt_prepare($stmt, $query)) {
                    if ($anos > 0) {
                        $stmt->bind_param(
                            'ssssssssssss',
                            $regiao,
                            $prt,
                            $ocp,
                            $esc,
                            $etn,
                            $idd,
                            $var,
                            $form,
                            $prev,
                            $sind,
                            $sexos,
                            $anos
                        );
                            
                    } else {
                        $stmt->bind_param(
                            'ssssssssssss',
                            $regiao,
                            $cad,
                            $prt,
                            $ocp,
                            $esc,
                            $etn,
                            $idd,
                            $var,
                            $form,
                            $prev,
                            $sind,
                            $sexos
                        );
                    }
                }
            } else {
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
                       ." AND ex.Sindical = ?"
                       ." AND ex.Sexo = ?";
                    
                if (mysqli_stmt_prepare($stmt, $query)) {
                    if ($anos > 0) {
                        $stmt->bind_param(
                            'sssssssssssss',
                            $regiao,
                            $cad,
                            $prt,
                            $ocp,
                            $esc,
                            $etn,
                            $idd,
                            $var,
                            $form,
                            $prev,
                            $sind,
                            $sexos,
                            $anos
                        );
                            
                    } else {
                        $stmt->bind_param(
                            'sssssssssssss',
                            $regiao,
                            $cad,
                            $prt,
                            $ocp,
                            $esc,
                            $etn,
                            $idd,
                            $var,
                            $form,
                            $prev,
                            $sind,
                            $sexos
                        );
                    }
                }
            }
        }
        $stmt->execute();
        $allObjects = self::fetch_results($stmt);
        
        self::disconnect();
        
        return $allObjects;
    }
    
    public static function getter_linhas($var, $uf, $cad, $ocp, $desag){

        self::connect();
        $query = "SELECT * FROM ".self::$table." WHERE Numero =".$var." AND idUF = ".$uf;

        if($ocp == 0){
            $query .= " AND idOcupacao = 0 AND idCadeia =".$cad;
        } else {
            $query .= " AND idOcupacao =".$ocp;
        }
        if($desag == 2){
            $query .= " AND Sexo IS NOT NULL";
        } else {
            $query .= " AND Sexo IS NULL";
        }
        switch($desag){
            case 1:
                $query .= " AND idPorte > 0";
                break;
            case 3:
                $query .= " AND idIdade > 0"; 
                break;
            case 4: 
                $query .= " AND idEscolaridade > 0";
                break;
            case 5:
                $query .= " AND idEtinia > 0"; 
                break;
            case 6: 
                $query .= " AND Formalidade > 0";
                break;
            case 7:
                $query .= " AND Previdencia > 0"; 
                break;
            case 8:
                $query .= " AND Sindical > 0"; 
                break;
        }

        $result = mysqli_query(self::$conn, $query);
        
        $allObjects = array();

        while($obj = mysqli_fetch_object($result, 'EixoDois')){
            $allObjects[] = $obj;
        }

        self::disconnect();
        
        return $allObjects;
    }

}

