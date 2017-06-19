<?php 

	if (!empty($_GET["var"]))
		$var = $_GET["var"];
	else
		$var = 1;

	if (!empty($_GET["uf"]))
		$uf = $_GET["uf"];
	else
		$uf = 0;

	if (!empty($_GET["atc"]))
		$atc = $_GET["atc"];
	else
		$atc = 0;

	if (!empty($_GET["cad"]))
		$cad = $_GET["cad"];
	else
		$cad = 0;

	if (!empty($_GET["prt"]))
		$prt = $_GET["prt"];
	else
		$prt = 0;

?>
<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<link href="css/ie10-viewport-bug-workaround.css" rel="stylesheet">

<!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
<!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
<script src="js/ie-emulation-modes-warning.js"></script>

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->

<!-- TopoJSON -->
<script src="https://d3js.org/topojson.v2.min.js"></script>

<!-- D3 JS v4 --> 
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3-legend/2.21.0/d3-legend.min.js"></script> 

<!-- D3 QUEUE -->
<script src="https://d3js.org/d3-queue.v3.min.js"></script>

<div id="corpo"></div>

<!--================ TOOLTIP! ===============-->
<div id="tooltip" class="tooltip none">
    <p><strong class="heading"></strong></p>
</div>

<script>
	
	/*==== Barras JS ====*/
	/* tamanho container */
	var chartWidth = $('.chart').width();
	var chartHeight = chartWidth/2;

	//Variaveis/Objetos
	var dict = {};
	
	// var info = [];
	var dados = {key: [], value: []};
	
	//variaveis configuracao query
	var vrv = <?php echo $var; ?>;
	var atc = <?php echo $atc; ?>;
	var cad = <?php echo $cad; ?>;
	var prt = <?php echo $prt; ?>;
	var uf = <?php echo $uf; ?>;

	// import colors.json file
	var colorJSON;
	d3.json('colors.json', function(error, data) {
		if (error) throw error;
		colorJSON = data;
	});

	// return matching color value
	var color = function(colorId){
	
		if(colorJSON.cadeias[colorId]){
			return colorJSON.cadeias[colorId].color;
		}else{
			console.log("Cor correspondente ao id: \"" + colorId +  "\" não encontrada no arquivo colors.json");
			return colorJSON.cadeias[0].color;
		}
	}

	var config = "?var="+vrv+"&uf="+uf+"&atc="+atc+"&cad="+cad+"&prt="+prt+"";
   
	d3.queue()
		.defer(d3.json, "ajax_barras.php"+config)
		.await(analyze);

	function analyze(error, data) {
		
		if(error){ 
			console.log(error); 
		}

		var dados = {key: [], value: []};

		dados.key = d3.keys(data);
		dados.value = d3.values(data);
		dados.key = dados.key.map(Number);
		dados.value = dados.value.map(Number);;

		// console.log(dados);

		//tamanho do grafico
		var margin = {top: 20, right: 20, bottom: 30, left: 50},
			width = chartWidth - margin.left - margin.right,
			height = chartHeight - margin.top - margin.bottom;

		var minBarHeight = 5;
		var topLabelHeight = 17;

		//valores maximos e minimos
		var minValue = d3.min(dados.value);
		var maxValue = d3.max(dados.value);

		//distribuicao de frequencias    
		var quant = 9;
		var range = maxValue - minValue; 
		var amp = minValue <= 1 ? range / quant : Math.round(range / quant);

		//domino de valores para as cores do mapa
		var dom = [
					(minValue+(amp/4)), 
					(minValue+amp), 
					(minValue+(2*amp)), 
					(minValue+(3*amp)), 
					(minValue+(4*amp)), 
					(minValue+(5*amp)), 
					(minValue+(6*amp)), 
					(minValue+(7*amp)), 
					(minValue+(8*amp))
				  ];
		// console.log(dom);
		//ajuste do dominio
		var i = 0; 

		while(i < 9){
			if (minValue > 1)
				dom[i] = dom[i] - (dom[i] % 5);
			i++;
		}

		// creates cadeia's color range array from color.json file
		var colorsRange = [];             
		$.each(colorJSON.cadeias[cad].gradient, function(i, rgb){
			if (i > 1)
				colorsRange.push(rgb);
		});

		/*==================*/
		/* *** tooltips *** */
		/*==================*/

		/* mostrar */
		var mouseOn = function(d) {

			/*== posição do gráfico na tela ==*/
			var chartOffset = $('.chart').offset(), 
				leftOffset = chartOffset.left,
				topOffset = chartOffset.top;

			/*== posição do tooltip ==*/
			var xPosition = d3.event.pageX-leftOffset+30;
			var yPosition = d3.event.pageY -topOffset+5;

			/* ajusta posição */
			d3.select(".tooltip")
				.style("left", xPosition + "px")
				.style("top", yPosition + "px");

			d3.select(".tooltip .heading")
				.text(d);

			d3.select(".tooltip .size")
				.text(numberFormat(d));

			d3.select(".tooltip").classed("none", false);
		};

		/* esconder */
		var mouseOut = function() {
			d3.select(".tooltip").classed("none", true);
		};            

		/*==================*/
		/* *** gráfico! *** */
		/*==================*/

		var minDisplayValue = minValue > 0? minValue - (minValue / 10) : 0;

		var x = d3.scaleBand()
						.domain(d3.range(dados.value.length))
						.rangeRound([0, width])
						.padding(0.1);

		var y = d3.scaleLinear()
				.domain(d3.extent(dados.value))
				.rangeRound([height, 0], .002);

		y.domain(d3.extent(dados.value, function(d) {
				
			var isMinValueNegative = y(0) !== false;
			var isNegativeBarTooHigh = y(d) + 5 >= height;
			var isPositiveBarTooHigh = y(d) <= minBarHeight;

			if (isMinValueNegative){
				if (isNegativeBarTooHigh) return d - 0.05;
			}
			return d;
		})).nice();
				   
		var numberFormat = d3.format(".2f");

		var removeZeroFormat = function(num){
			var numSplit = num.split(".");

			if (parseInt(numSplit[1]) === 0)
				num = Math.round(num);;

			return num;
		};

		var     formatDefault = function(d) { return numberFormat(d); }
				formatThousands = function(d) { return numberFormat(d / 1e3) + "K"; },
				formatMillions = function(d) { return numberFormat(d / 1e6) + "M"; };

		var formatYAxis = function(){
			var maxValue = ''+d3.max(dados.value);
			var minValue = ''+d3.min(dados.value);

			var preFormat = d3.format('.2f');
			var preFormatted = preFormat(maxValue);
			//var preFormattedNum= preFormatted.split(".").join("");
			var preFormattedLength = preFormatted.split(".").join("").length;
			var preFormattedIntLength = preFormatted.split(".")[0].length;


			// Valores pequeno (1,1)
			if (minValue < 1 && minValue > 1){

			}

			if(preFormattedIntLength <= 6 && preFormattedIntLength > 3)
				return formatThousands;
			else if (preFormattedIntLength <=9 && preFormattedIntLength > 6)
				return formatMillions;
			else
				return formatDefault;
		}();

		var rightFormat = function(d){
			var tempFormat = d3.format(",.2f");
			return tempFormat(d);
		}

		var numberMagnitude = function(value){
			var value = value || 0;
			var arrValue = ""+value;
			var intValue = arrValue.split(".")[0];

			var hundred = intValue.slice(0,3);
			var thousand = intValue.slice(3,6);
			var million = intValue.slice(6,9);

			return !!hundred? (!!thousand? (!!million? 'million': 'thousand'): 'hundred'): 'hundred';
		}


		var niceNumbers = function(value){
			var intSeparator = ".";
			var decSeparator = ",";
			var arrValue = ""+value;
			var intValue = arrValue.split(".")[0];
			var valueSeparatorFixed = arrValue.replace(".", ",");
			var magnitude = numberMagnitude(intValue);

			var temp = rightFormat(value);

			if(magnitude === "million" || magnitude === "thousand")
				temp = temp.split(".")[0];
			else if(magnitude === "fractional")
				temp = temp.split(".")[1];

			console.log(temp);

			var match = /,/g;

			//temp = temp.match(match);
			temp = temp.replace(match, ".");

			console.log(temp);

			return temp;
		};


		// cria SVG
		var svg = d3.select("#corpo").append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", 
						  "translate(" + margin.left + "," + margin.top + ")");

		function make_y_gridlines() {     
			return d3.axisLeft(y)
				.scale(y)
				.ticks(4)
		}
	
		//add the Y gridlines
		svg.append("g")
			.attr("class", "grid")
			.style("opacity", 0.1)
			.call(make_y_gridlines()
				.tickSize(-width +10)
				.tickSizeOuter(0)
				.tickFormat("")
			)
					
		//Cria barras
		svg.selectAll("rect")
				   .data(dados.value, function(d) { return d; })
				   .enter().append("rect")
				   .attr("class", "bar")
				   .attr("x", function(d, i) {
						return x(i);
				   })
				   .attr("y", function(d) {
						var graphBottom = height;
						var barPosition = Math.abs(y(d));
						//var barHeight = Math.abs(y(d) - y(0)) < height? Math.abs(y(d) - y(0)) : height - y(d);
						var barHeight = height - y(d);
						var zeroPosition = d3.min(dados.value) < 0? y(0) : false;
						var isMinValueNegative = zeroPosition !== false;
						var isValueNegative = d < 0;
						var isBarTooSmall = barHeight < minBarHeight;
						var zeroPositionExists = zeroPosition < height;
						var isValueZero = d === 0;
						var isYAxisZero = y(d) <= 5;


						// TEM VALOR NEGATIVO
						if (isMinValueNegative) {

							// NÚMERO NEGATIVO
							if(isValueNegative)
								return zeroPosition;

							// NÚMERO 0
							if(isValueZero)
								return zeroPosition - 5;
							
							// BARRA MUITO PEQUENA
							/*if (isBarTooSmall)
								return barPosition - 5;*/

							// SE RESULTADO DE y(d) FOR ZERO (0)
							if (isYAxisZero)
								return 0;

							return zeroPosition - y(d);
						}

						// BARRA MUITO PEQUENA
						if (isBarTooSmall){
							return barPosition;
						}

						return barPosition;
					})
				   .attr("width", x.bandwidth())
				   .attr("height", function(d) {
						var minValue = d3.min(dados.value);
						var maxValue = d3.max(dados.value);
						var zeroPosition = d3.min(dados.value) < 0? y(0) : false;
						var minValueIsNegative = minValue < 0;
						var isValueSmallerThanMax = d < maxValue + .1;
						var isRangeTooHigh = maxValue - minValue > maxValue / 2; 
						var isMinValueNegative = zeroPosition !== false;
						var isValueNegative = d < 0;
						var isValueZero = d === 0;
						var isYAxisZero = y(d) <= 5;
						var barHeight = height - y(d);
						//var barHeight = Math.abs(y(d) - y(0)) < height? Math.abs(y(d) - y(0)) : height - y(d);


						// TEM VALOR NEGATIVO
						if (isMinValueNegative){

							// NÚMERO NEGATIVO
							if (isValueNegative){
								if (barHeight < minBarHeight || isValueZero)
									return minBarHeight;

								return Math.abs(y(d)) - zeroPosition; 
							}

							// NÚMERO POSITIVO
							if (barHeight < minBarHeight || isValueZero){
								return minBarHeight;
							}

							if (isYAxisZero)
								return Math.abs(y(0));

							return Math.abs(height - (height - y(d)));
						}

						if (barHeight < minBarHeight)
							return minBarHeight;

						return barHeight;
				   })
				   .attr("fill", function(d) {
					return color(cad);
				   })
				   .on("mouseover", mouseOn)
					.on("mouseout", mouseOut);

			//cria labels barras 
				svg.selectAll("text g")
				   .data(dados.value, function(d) { return d; })
				   .enter()
				   .append("text")
				   .attr("class", "barTopValue")    
				   .text(function(d) {
						return niceNumbers(d);
				   })
				   .attr("text-anchor", "middle")
				   .attr("x", function(d, i) {
					return x(i) + x.bandwidth() / 2 ;
				   })
				   .attr("y", function(d) {
						var zeroPosition = d3.min(dados.value) < 0? y(0) : false;
						var isMinValueNegative = zeroPosition !== false;
						var isValueNegative = d < 0;
						var isValuePositiveOrZero = d >= 0;
						var areValuesHigh = Math.abs(y(d) - y(0)) > height;
						var zeroPosition = y(0);
						var zeroPositionExists = zeroPosition < height;
						var isBarSmallerThanMinimum = Math.abs(zeroPosition - y(d)) <= 5;
						var barHeight = height - y(d);
						var isValueZero = d === 0;
						var isYAxisZero = y(d) <= 5;

						// TEM VALOR NEGATIVO
						if (isMinValueNegative){

							// VALOR NEGATIVO
							if (isValueNegative)
								return y(d) + topLabelHeight;

							// BARRA MUITO PEQUENA
							if (barHeight <= minBarHeight || isValueZero){
								return y(d) - minBarHeight - 4;
							}

							// SE RESULTADO DE y(d) FOR ZERO (0)
							if (isYAxisZero)
								return -5;

							return zeroPosition - y(d) - 5;
						}

						// BARRA MUITO PEQUENA
						//if (barHeight <= minBarHeight/* || isValueZero*/){
						//  return y(d) - minBarHeight - 4;
						//}

						
						if(areValuesHigh)
							isBarSmallerThanMinimum = minBarHeight - (height - Math.abs(y(d))) >= 0;

						if (isBarSmallerThanMinimum && isValuePositiveOrZero)
							return (areValuesHigh? y(d) : zeroPosition) - minBarHeight - 5;

						return y(d) - 5;        
				   });

			//formata labels eixo X
				var xAxis = d3.axisBottom(x)
					.tickFormat(function(d){ return dados.key[d];})
					.tickSize(5)
					.tickPadding(5);

				var yAxis = d3.axisLeft()
							.scale(y)
							.tickFormat(formatYAxis);

			//adiciona eixo X
				svg.append("g")
				   .attr("transform", "translate(0," + height + ")")
				   .call(xAxis);

			//adiciona eixo Y
				svg.append("g")
					.attr("transform", "translate(0, 0)")
				   .call(yAxis);

		};
</script>