# Plataforma Atlas da Cultura OBEC/UFRGS
Documentação referente ao banco de dados da plataforma

## Diagrama Entidade Relacional Eixo I:

![Diagrama Entidade Relacional Eixo I](https://github.com/dlazarosps/atlasOBEC/blob/master/data/docs/eixo1-DER.png)

1 -||---<- n

## Estrutura das tuplas do Eixo I:
	(ID, Num, UF, Atuacao, Cadeia, Porte, Ano, Valor, Percentual, Taxa)
	D = identificador único autoincremento (chave primária)

	Num = número da variável (Ex: Variável 1 V1 -> Num =  1)

	UF = número identificador do estado (chave estrangeira, EX: Acre -> UF = 12 [Padrão IBGE])

	Atuacao = número identificador da atuação (chave estrangeira, EX: Comércio -> Atuacao = 1)

	Cadeia = número identificador da Cadeia (chave estrangeira, EX: Artes -> Cadeia = 2)

	Porte = número identificador do Porte (chave estrangeira, EX: Média -> Porte = 3)

	Ano = ano referente(EX:  ano de 2014 -> Ano = 2014)

	Valor = quantidade/valor da variável (quantidade numérica em ponto flutuante de precisão dupla)

	Percentual =  DOUBLE  referente ao percentual do Valor *

	Taxa =  DOUBLE referente a taxa de variação do Valor / Ano *

	* não obrigatório

## Exemplo de Dados Eixo I:

![Tabela Eixo I](https://github.com/dlazarosps/atlasOBEC/blob/master/data/docs/table-eixo1.png)

Por definição o valor “0” (zero) foi usado para identificar chaves primárias com a semântica de total/conjunto

## Exemplo de Consultas Eixo I:

-Variável 1 - Total de Empresas (V1)
-Consulta:
	-“Total de empresas no Acre no ano de 2007”
	-SQL:
		SELECT * 
		FROM Eixo_1
		WHERE (Num = 1 AND UF = 12) 
		AND  (Atuacao = 0 AND Cadeia = 0 AND Porte = 0)
		AND Ano = 2007
	-Tupla:
		(1, 1, 12, 0, 0, 0, 2007, 144) 
Observaçao:
	A combinação numérica dos campos Atuação, Cadeia, Porte determinam as possíveis desagregações de cada variável sendo “0, 0, 0” o valor default para valor total de uma variável em determinado ano.

## Exemplo de Inserções de Novos Dados:

As inserções de dados na plataforma são feitas através de queries conforme o modelo abaixo:

-SQL:
	INSERT INTO Atlas.Eixo_1
	(Numero, idUF, idAtuacao, idCadeia, idPorte, Ano, Valor, Percentual Taxa)
	VALUES
	(Variável, Estado, Atc, Setor, Prt, Ano, Quantidade, Razão, Variação);

-Tupla:
	Variável = número da variável
	Estado = id do estado
	Atc = id da atuação
	Setor = id do setor
	Prt = id do porte
	Ano = ano referente ao valor
	Quantidade = valor da tupla
	Razão = percentual referente a quantidade
	Variação = taxa de variação referente a quantidade

-Restrições
	Por convenção adotada na plataforma quando idAtuacao é diferente de zero obrigatoriamente o idPorte é igual a zero, a recíproca é verdadeira;

-Exemplificando:
	-Inserção
		“Dados da V4 no ano de 2012 com atuação = comércio e setor = editoração” 
	-SQL
		INSERT INTO Atlas.Eixo_1 (Numero,idUF,idAtuacao,idCadeia,idPorte,Ano,Valor,Percentual,Taxa) VALUES 
		(4,11,2,5,0,2012,28759.1280821903,1.960864E-4,-0.0488666615),
		(4,12,2,5,0,2012,5905.3402937429,4.0264E-5,0.1569521063),
		(4,13,2,5,0,2012,118745.374706979,8.096334E-4,-0.0645844694),
		(4,14,2,5,0,2012,7465.3601159014,5.09006E-5,-0.0201827354),
		(4,15,2,5,0,2012,172206.305811525,0.0011741424,-0.0789746695),
		(4,16,2,5,0,2012,0.0,0.0,-1.0),
		(4,17,2,5,0,2012,19190.4103197052,1.308447E-4,-0.1616312914),
		(4,21,2,5,0,2012,42190.2077063299,2.876626E-4,0.0202316136),
		(4,22,2,5,0,2012,27254.073796512,1.858246E-4,0.1100854223),
		(4,23,2,5,0,2012,264719.361399045,0.0018049178,-0.0084422192),
		(4,24,2,5,0,2012,67526.4806701795,4.604112E-4,-0.2296290682),
		(4,25,2,5,0,2012,75150.5631609206,5.123939E-4,-0.1648028437),
		(4,26,2,5,0,2012,327197.053375922,0.0022309051,-0.3852485616),
		(4,27,2,5,0,2012,42440.7830435737,2.893711E-4,-0.0268375581),
		(4,28,2,5,0,2012,52320.4631273884,3.56733E-4,-0.0474544398),
		(4,29,2,5,0,2012,217396.644208412,0.0014822606,-0.2361040614),
		(4,31,2,5,0,2012,1202644.99462099,0.0081999115,-0.0045281238),
		(4,32,2,5,0,2012,334745.637892308,0.0022823731,-0.0225799259),
		(4,33,2,5,0,2012,2603452.10653247,0.0177509382,-0.0762524165),
		(4,35,2,5,0,2012,1.15189916600184E7,0.0785391475,-0.0448445811),
		(4,41,2,5,0,2012,1516685.89446996,0.010341115,0.2135479107),
		(4,42,2,5,0,2012,469616.650098594,0.0032019549,-0.0746148679),
		(4,43,2,5,0,2012,1252040.13353862,0.008536699,-0.1098147588),
		(4,50,2,5,0,2012,86958.5865484459,5.929037E-4,0.0027049535),
		(4,51,2,5,0,2012,32675.177814329,2.227869E-4,-0.1104919096),
		(4,52,2,5,0,2012,178426.34473636,0.0012165521,-0.1455579282),
		(4,53,2,5,0,2012,609413.415215906,0.0041551215,-0.0745132902),
		(4,0,2,5,0,2012,2.12741181513047E7,0.1450518546,-0.0498197883);

##Observações numéricas importantes Eixo I:

-Quantidade de observações (registros/tuplas) no banco de dados da -Variável 1 (V1) = ~ 20.000
-Para cada combinação possível de desagregações há 224 registros (observações) no banco de dados relacional
-Quantidade de Observações estimadas para o Eixo I =

-Quantidade de variáveis * Quantidade de estados * Quantidade Atuação * Quantidade Cadeia *  Quantidade Porte * Faixa de Anos
(análise combinatória | combinações possíveis)

-14 * 28 * 3 * 11 * 5 * 8   = ~517.440 Observações (SE todas combinações fossem possíveis)

-Para uma Variável 
	-SCC x Porte = 1 * 28 * 11 * 5 * 8 =  12320
	-SCC x Atuacao = 1 * 28 * 11 * 5 * 8 =  7392
	-Totais = 1 * 28 * 8 =  224
-Para cada Variável = 12320 + 7392 + 224 = 19936
-Todas Variáveis do Eixo I = 279104
-Devido a restrição de não poder combinar Atuações com Portes livremente o total de registros do Eixo I cai aproximadamente pela metade.

##Diagrama Entidade Relacional Eixo II:

![Diagrama Entidade Relacional Eixo II](https://github.com/dlazarosps/atlasOBEC/blob/master/data/docs/eixo2-DER.png)

1 -||---<- n

##Estrutura das tuplas do Eixo II:

(ID, Num, UF, Cadeia, Porte, Ocupacao, Escolaridade, Etinia, Idade, Formalidade, Previdencia, Sindical, Sexo, Ano, Valor, Percentual, Taxa)

ID = identificador único autoincremento (chave primária)

Num = número da variável 
(Ex: Variável 1 V1 -> Num =  1)

UF = número identificador do estado 
(chave estrangeira, EX: Acre -> UF = 12 [Padrão IBGE])

Cadeia = número identificador da Cadeia 
(chave estrangeira, EX: Artes -> Cadeia = 2)

Porte = número identificador do Porte 
(chave estrangeira, EX: Média -> Porte = 3)

Ocupação = número identificador do tipo de ocupação 
(chave estrangeira, EX: Setorial -> Ocupacao = 0)

Escolaridade = número identificador da Escolaridade 
(chave estrangeira, EX: Fundamental Completo -> Escolaridade = 3)

Etinia = número identificador da Etinia 
(chave estrangeira, EX: Indígena -> Etinia = 1)

Idade = número identificador da Escolaridade 
(chave estrangeira, EX: Fundamental Completo -> Escolaridade = 3)

Formalidade = Valor binário 
(TRUE = sim, FALSE = não, NULL = não se aplica)

Previdencia = Valor binário, contribuição previdenciária 
(TRUE = sim, FALSE = não, NULL = não se aplica)

Sindical = Valor binário, contribuição sindical 
(TRUE = sim, FALSE = não, NULL = não se aplica)

Sexo = Valor binário,
(TRUE = Masculino, FALSE = feminino, NULL = não se aplica)

Ano = ano referente
(EX:  ano de 2014 -> Ano = 2014)

Valor = quantidade/valor da variável 
	(quantidade numérica em ponto flutuante de precisão dupla)

Percentual =  DOUBLE  referente ao percentual do Valor *

Taxa =  DOUBLE referente a taxa de variação do Valor / Ano *

* não obrigatório

##Exemplo de Dados Eixo II:

![Tabela Eixo II](https://github.com/dlazarosps/atlasOBEC/blob/master/data/docs/table-eixo2.png)

Por definição o valor “0” (zero) foi usado para identificar chaves primárias com a semântica de total/conjunto
EXCETO na ocupação cuja semântica de total é o id 3

##Diagrama Entidade Relacional Eixo III:

![Diagrama Entidade Relacional Eixo III](https://github.com/dlazarosps/atlasOBEC/blob/master/data/docs/eixo3-DER.png)

1 -||---<- n

##Estrutura das tuplas do Eixo III:

(ID, Num, UF, Mecanismo, Cadeia, PessoaFisica, Modalidade, Ano, Valor, Percentual, Taxa)

ID = identificador único autoincremento (chave primária)

Num = número da variável 
(Ex: Variável 1 V1 -> Num =  1)

UF = número identificador do estado 
(chave estrangeira, EX: Acre -> UF = 12 [Padrão IBGE])

Mecanismo = número identificador do Mecanismo
(chave estrangeira, EX: Mecenato -> Mecanismo = 2)

Cadeia = número identificador da Cadeia 
(chave estrangeira, EX: Artes -> Cadeia = 2)

PessoaFisica = Valor binário, Pessoa Física ou Pessoa Jurídica
(TRUE = PF , FALSE = PJ, NULL = não se aplica)

Modalidade = Valor binário,
(TRUE = Direto, FALSE = Indireto, NULL = não se aplica)

Ano = ano referente
(EX:  ano de 2014 -> Ano = 2014)

Valor = quantidade/valor da variável 
	(quantidade numérica em ponto flutuante de precisão dupla)

Percentual =  DOUBLE  referente ao percentual do Valor *

Taxa =  DOUBLE referente a taxa de variação do Valor / Ano *

* não obrigatório

##Exemplo de Dados Eixo III:

![Tabela Eixo II](https://github.com/dlazarosps/atlasOBEC/blob/master/data/docs/table-eixo3.png)

Por definição o valor “0” (zero) foi usado para identificar chaves primárias com a semântica de total/conjunto
NO CASO dos mecanismos há dois conjuntos excludentes 
FNC U MECENATO e FUNDO CULTURA U OUTROS
TODOS (“0”) se aplica somente ao total de cada conjunto excludente