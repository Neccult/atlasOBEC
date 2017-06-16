<!--===== */\/* EIXO I *\/\* =====-->

<svg class="circlesMenu">
	
	<filter id="shadow" width="200%" height="200%">
		<feOffset result="offOut" in="SourceGraphic" dx="2" dy="2" />
		<feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.16 0 0 0 0 0 0.16 0 0 0 0 0 0.16 0 0 0 0 0 1 0" />
		<feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="3" />
		<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
	</filter>

	<!--=== grupo 1 ===-->
	<circle href="2" class="circles" id="circle" r="50" cx="55"  cy="319" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="2" class="circles" id="circle-text1" y="319" fill="#FFF"><tspan x="20" font-size="13px">Peso das</tspan><tspan x="21" font-size="12px" dy="1em">Empresas</tspan></text>

	<circle href="3" class="circles" id="circle2" r="80" cx="175" cy="340" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="3" class="circles" id="circle2-text1"	y="340" fill="#FFF" font-size="18px"><tspan x="112">Natalidade e</tspan><tspan x="110" dy="1em">Mortalidade</tspan></text>

	<circle href="1" class="circles" id="circle3" r="65" cx="105" cy="240" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="1" class="circles" id="circle3-text1" y="240" fill="#FFF" font-size="16px"><tspan x="71">Total de</tspan><tspan x="65" dy="1em">Empresas</tspan></text>

	<!--=== grupo 2 ===-->
	<circle href="5" class="circles" id="circle4" r="65" cx="415" cy="230" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="5" class="circles" id="circle4-text1" y="220" fill="#FFF" font-size="20px"><tspan x="384">Receita</tspan><tspan x="366" dy="1em" font-size="24px">Líquida</tspan></text>

	<circle href="7" class="circles" id="circle5" r="65" cx="525" cy="290" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="7" class="circles" id="circle5-text1" x="495"  y="298" fill="#FFF" font-size="22px">Lucro</text>

	<circle href="4" class="circles" id="circle6" r="80" cx="420" cy="340" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="4" class="circles" id="circle6-text1" y="340" fill="#FFF" font-size="24px"><tspan x="375">Receita</tspan><tspan x="375" dy="1em" font-size="30px">Total</tspan></text>

	<!--<circle href="var7" class="circles" id="circle7"  r="65" cx="545" cy="390" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="var7" class="circles" id="circle7-text1"    x="488"  y="395" fill="#FFF" font-size="14px">Produtividade</text>-->
	
	<circle href="6" class="circles" id="circle8" r="50" cx="335" cy="290" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="6" class="circles" id="circle8-text1" x="295"  y="300" fill="#FFF" font-size="24px">Custo</text>

	<!--=== grupo 3 ===-->
	<circle href="9" class="circles" id="circle9" r="50" cx="785" cy="382" fill="#c4c431" filter="url(#shadow)"/>
	<text   href="9" class="circles" id="circle9-text1" y="380" fill="#FFF" font-size="18px"><tspan x="760">VA</tspan><tspan x="785" dy="1em">PIB</tspan></text>

	<circle href="8" class="circles" id="circle10" r="80" cx="715" cy="280" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="8" class="circles" id="circle10-text1" y="275" fill="#FFF"><tspan x="655" font-size="12px">Valor</tspan><tspan x="655" font-size="20px" dy="1em">Adicionado</tspan><tspan x="745" font-size="14px" dy="1em">(VA)</tspan></text>

	<!--=== grupo 4 ===-->
	<circle href="12" class="circles" id="circle11" r="65" cx="1050" cy="300" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="12" class="circles" id="circle11-text1" y="300" fill="#FFF" font-size="14px"><tspan x="1030">C4</tspan><tspan x="1030" dy="1em">Empresas</tspan></text>

	<circle href="11" class="circles" id="circle12" r="50" cx="905" cy="300" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="11" class="circles" id="circle12-text1" y="300" fill="#FFF" font-size="20px"><tspan x="875">IHH</tspan><tspan x="900" dy="1em">VA</tspan></text>

	<circle href="13" class="circles" id="circle13" r="65" cx="980" cy="360" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="13" class="circles" id="circle13-text1" y="360" fill="#FFF" font-size="24px"><tspan x="950">C4</tspan><tspan x="980" dy="1em">VA</tspan></text>

	<circle href="10" class="circles" id="circle14" r="65" cx="975" cy="240" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="10" class="circles" id="circle14-text1" y="235" fill="#FFF" font-size="18px"><tspan x="935">IHH</tspan><tspan x="935" dy="1em">Empresas</tspan></text>


	<g id="animacao"></g><!-- load animação svg -->

<svg>

<!---/*
	============
	!!!!!!! Não identar tags tspan dentro do text, não funciona o dy em tablets/notebooks da Apple!!!!!!
	============
*/-->