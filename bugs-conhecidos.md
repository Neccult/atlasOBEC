	# Bugs conhecidos
	Arquivo com uma listagem de bugs conhecidos para patches futuros

	## barras.php

	- barra quando pequena precisa ter sua posição Y compensada, está ocorrendo conflito com barras "naturalmente" pequenas que ao terem sua posição Y compensadas ficam flutuando acima da sua posição
	<br><br>*Exemplos*

	1. /page.php?view=barras&var=1&prt=0&atc=0&cad=3&ano=2014&uf=29
	2. /page.php?view=barras&var=1&prt=0&atc=0&cad=3&ano=2014&uf=41
	3. /page.php?view=barras&var=1&prt=0&atc=0&cad=4&ano=2014&uf=23
	4. /page.php?view=barras&var=1&prt=0&atc=0&cad=4&ano=2014&uf=15
	5. /page.php?view=barras&var=1&prt=0&atc=0&cad=4&ano=2014&uf=33
	6. /page.php?view=barras&var=1&prt=0&atc=0&cad=5&ano=2014&uf=29