<!--===== */\/* EIXO I *\/\* =====-->

<svg class="circlesMenu">
	
	<filter id="shadow" width="200%" height="200%">
		<feOffset result="offOut" in="SourceGraphic" dx="2" dy="2" />
		<feColorMatrix result="matrixOut" in="offOut" type="matrix" values="0.16 0 0 0 0 0 0.16 0 0 0 0 0 0.16 0 0 0 0 0 1 0" />
		<feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="3" />
		<feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
	</filter>

	<!--=== grupo 1 ===-->
	<circle href="2" class="circles" id="circle" r="30" cx="55" cy="319" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="2" class="circles" id="circle-text1" y="319" fill="#FFF"><tspan x="34" font-size="9px">Peso das</tspan><tspan x="34" font-size="8px" dy="1em">Empresas</tspan></text>

	<circle href="3" class="circles" id="circle2" r="45" cx="125" cy="335" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="3" class="circles" id="circle2-text1" y="335" fill="#FFF" font-size="10px"><tspan x="90">Natalidade e</tspan><tspan x="90" dy="1em">Mortalidade</tspan></text>

	<circle href="1" class="circles" id="circle3" r="40" cx="95" cy="270" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="1" class="circles" id="circle3-text1" y="270" fill="#FFF" font-size="12px"><tspan x="65">Total de</tspan><tspan x="65" dy="1em">Empresas</tspan></text>

	<!--=== grupo 2 ===-->
	<circle href="5" class="circles" id="circle4" r="40" cx="270" cy="265" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="5" class="circles" id="circle4-text1" y="260" fill="#FFF" font-size="12px"><tspan x="250">Receita</tspan><tspan x="240" dy="1em" font-size="14px">Líquida</tspan></text>

	<circle href="7" class="circles" id="circle5" r="40" cx="325" cy="310" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="7" class="circles" id="circle5-text1" x="300" y="312" fill="#FFF" font-size="16px">Lucro</text>

	<circle href="4" class="circles" id="circle6" r="45" cx="260" cy="340" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="4" class="circles" id="circle6-text1" y="338" fill="#FFF" font-size="12px"><tspan x="237">Receita</tspan><tspan x="237" dy="1em" font-size="16px">Total</tspan></text>

	<!--<circle href="var7" class="circles" id="circle7"  r="40" cx="335" cy="370" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="var7" class="circles" id="circle7-text1"    x="298"  y="373" fill="#FFF" font-size="9px">Produtividade</text>-->

	<circle href="6" class="circles" id="circle8"  r="30" cx="215" cy="300" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="6" class="circles" id="circle8-text1" x="190" y="307" fill="#FFF" font-size="15px">Custo</text>

	<!--=== grupo 3 ===-->
	<circle href="9" class="circles" id="circle9"  r="30" cx="455" cy="352" fill="#c4c431" filter="url(#shadow)"/>
	<text   href="9" class="circles" id="circle9-text1" y="352" fill="#FFF" font-size="12px"><tspan x="440">VA</tspan><tspan x="455" dy="1em">PIB</tspan></text>

	<circle href="8" class="circles" id="circle10" r="45" cx="430" cy="290" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="8" class="circles" id="circle10-text1" y="285" fill="#FFF"><tspan x="392" font-size="9px">Valor</tspan><tspan x="392" font-size="12px" dy="1em">Adicionado</tspan><tspan x="445" font-size="10px" dy="1em">(VA)</tspan></text>

	<!--=== grupo 4 ===-->
	<circle href="12" class="circles" id="circle11" r="40" cx="650" cy="300" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="12" class="circles" id="circle11-text1" y="295" fill="#FFF" font-size="10px"><tspan x="635">C4</tspan><tspan x="635" dy="1em">Empresas</tspan></text>

	<circle href="11" class="circles" id="circle12" r="30" cx="550" cy="300" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="11" class="circles" id="circle12-text1" y="300" fill="#FFF" font-size="12px"><tspan x="533">IHH</tspan><tspan x="548" dy="1em">VA</tspan></text>

	<circle href="13" class="circles" id="circle13" r="40" cx="600" cy="330" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="13" class="circles" id="circle13-text1" y="330" fill="#FFF" font-size="18px"><tspan x="580">C4</tspan><tspan x="595" dy="1em">VA</tspan></text>

	<circle href="10" class="circles" id="circle14" r="40" cx="600" cy="260" fill="#c4c431" filter="url(#shadow)"/>
	<text 	href="10" class="circles" id="circle14-text1" y="255" fill="#FFF" font-size="12px"><tspan x="570">IHH</tspan><tspan x="570" dy="1em">Empresas</tspan></text>


	<g id="animacao"></g><!-- load animação svg -->

<svg>
<!---/*
	============
	!!!!!!! Não identar tags tspan dentro do text, não funciona o dy em tablets/notebooks da Apple!!!!!!
	============
*/-->