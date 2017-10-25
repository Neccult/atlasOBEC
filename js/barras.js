	/*==== Barras JS ====*/

	/* tamanho container */
	var chartWidth = $('.chart').width();
	var chartHeight = chartWidth/2;
	var minBarHeight = 5;
	var withLabels = false;

	//Variaveis/Objetos
	var dict = {};

	// var info = [];
	var dados = {key: [], value: []};

	// import colors.json file
	var colorJSON;
    var textJSON;
	d3.json('data/colors.json', function(error, data) {
		if (error) throw error;
		colorJSON = data;


		// import pt-br.json file for get the title
        d3.json('data/pt-br.json', function(error, data) {
            if(error) throw error;

            textJSON = data;
            var config = "?var="+vrv+"&uf="+uf+"&atc="+atc+"&cad="+cad+"&uos="+uos+"&ano="+ano+"&prt="+prt+"&ocp="+ocp+"&sex="+sex+"&fax="+fax+"&esc="+esc+"&cor="+cor+"&typ="+typ+"&prc="+prc+"&frm="+frm+"&prv="+prv+"&snd="+snd+"&mec="+mec+"&mod="+mod+"&pfj="+pfj+"&eixo="+eixo;

            $.get("./db/json_barras.php"+config, function(data) {
                console.log(data);
            });

            d3.queue()
                .defer(d3.json, "./db/json_barras.php"+config)
                .await(analyze);
        });

    });
    // return matching color value
    var color = function(colorId){

        if(colorJSON.cadeias[colorId]){
            return colorJSON.cadeias[colorId].color;
        } else{
            console.log("Cor correspondente ao id: \"" + colorId +  "\" não encontrada no arquivo colors.json");
            return colorJSON.cadeias[0].color;
        }
    }
	function analyze(error, data) {
		
		if(error){ 
			console.log(error); 
		}

		var dados = {key: [], value: [], percentual: [], taxa: []};

		Object.keys(data).forEach(function(key) {
			if((vrv === 3) && data[key].ano === 2007) return;
			dados.key.push(data[key].ano);
			if(vrv === 2 || vrv === 3) dados.value.push(100*data[key].valor);
			else dados.value.push(data[key].valor);
			if(vrv === 1 || vrv === 2 || vrv === 4 || vrv === 5 || vrv === 6 || vrv === 7 || vrv === 9 || vrv === 8) dados.percentual.push(0);
			else dados.percentual.push(data[key].percentual);
			if(vrv === 2) dados.taxa.push(0);
            else dados.taxa.push(data[key].taxa);
		});	

		dados.key = d3.keys(data);

		//tamanho do grafico
		// AQUI automatizar map center
		var margin = {top: 20, right: 20, bottom: 30, left: 55},
			width = chartWidth - margin.left - margin.right,
			height = chartHeight - margin.top - margin.bottom;

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
			return d;
		})).nice();

		var maxDecimalAxis = 0;
		$.each(dados.value, function(i, d){
			maxDecimalAxis = countValidDecimalDigits(d) > maxDecimalAxis? countValidDecimalDigits(d): maxDecimalAxis;			
		});

		var formatYAxis = function(d){
			var higherZeroOcur = maxDecimalAxis;
			var dadosCounter = 0;
			var minFraction = 3;

			var formatInit = d3.format(".2f");
			var formatDefault = function(d) { return removeDecimalZeroes(formatInit(d)); };
			var formatThousands = function(d) { return removeDecimalZeroes(formatInit(d / 1e3)) + "K"; };
			var formatMillions = function(d) { return removeDecimalZeroes(formatInit(d / 1e6)) + "M"; };
			var formatFraction = function(d) {
				var decimalDigitsCount = axisCountValidDecimalDigits(dados.value[dadosCounter]);
				var decimalDigits;

				// test decimal number and sets decimal digits that will be visible
				// if there are a number like 0,005 it will add + 1 to the counter so it will show something like = 0,0052
				decimalDigits = minFraction + higherZeroOcur;
				
				var format = d3.format("."+decimalDigits+"f");
				dadosCounter++;
				return (format(d)).replace(".", ",");
			};

			var axisCountValidDecimalDigits = function(value, acum) {
				var acum = acum || 0;
				var digitString = typeof value !== 'string' && typeof value !== 'undefined'? (value).toString() : value;
				
				// break condition
				if(!value){
					if (acum > higherZeroOcur)
						higherZeroOcur = acum;

					return higherZeroOcur;
				}

				// if has dot (first iteration)
				if (digitString.match(/\./g))
					digitString = digitString.split(".")[1];

				var isZero = parseInt(digitString[0]) === 0? 1: 0;
				var newValue = isZero? digitString.substring(1) : "";
				var newAcum = acum + isZero;

				return axisCountValidDecimalDigits(newValue, newAcum);
			};

			var maxValue = d3.max(dados.value);
			var minValue = d3.min(dados.value);

			var preFormat = d3.format('.2f');
			var preFormatted = removeDecimalZeroes(preFormat(maxValue));
			var preFormattedMin = removeDecimalZeroes(preFormat(minValue));
			var isSmall = preFormatted < 1 && preFormatted > -1;

			// has decimal
			if(isSmall)
				return formatFraction;

			var preFormattedIntLength = Math.round(preFormatted).toString().length;
			if (preFormattedIntLength <= 3)
				return formatDefault;
			else if (preFormattedIntLength <= 6)
				return formatThousands;
			else if (preFormattedIntLength <= 9)
				return formatMillions;
		}();

		// cria SVG

		var valueTop = margin.top+5;
		var svg = d3.select("#corpo").append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", 
						  "translate(" + margin.left + "," + valueTop + ")");

		function make_y_gridlines() {     
			return d3.axisLeft(y)
				.scale(y)
				.ticks(4);
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

		var tooltipInstance = tooltip.getInstance();
					
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
				var barHeight = y(d);
				var zeroPosition = d3.min(dados.value) < 0? y(0) : false;
				var isMinValueNegative = zeroPosition !== false;
				var isValueNegative = d < 0;
				var zeroPositionExists = zeroPosition < height;
				var isValueZero = d === 0;
				var isMaxValue = d3.max(dados.value) == d;

				// TEM VALOR NEGATIVO
				if (isMinValueNegative){

					// NÚMERO NEGATIVO
					if(isValueNegative)
						return zeroPosition;

					// S barra for muito pequena
					if(barHeight == zeroPosition)
						return zeroPosition - 5;
					
					return y(d);
				}

				barHeight = Math.abs(height - barHeight);

				// BARRA MUITO PEQUENA
				if (barHeight <= 3)
					//return barHeight < 5? height - (5 - barHeight) : (barPosition - barHeight) - 1 ;
					return height - (minBarHeight - barHeight);

				// BARRA PEQUENA
				if (barHeight <= minBarHeight)
					return height - minBarHeight;

				return barPosition;
			})
		   .attr("width", x.bandwidth())
		   .attr("height", function(d) {
				var minValue = y.domain()[0];
				var maxValue = y.domain()[1];
				var zeroPosition = y(0);
				var isMinValueNegative = minValue < 0;
				var isValueNegative = d < 0;
				var isValueZero = d === 0;
				var barHeight = y(d);

				// TEM VALOR NEGATIVO
				if (isMinValueNegative){
					var zeroPosition = d3.min(dados.value) < 0? y(0) : false;

					// NÚMERO NEGATIVO
					if (isValueNegative){
						barHeight = y(d) - zeroPosition;

						if (barHeight < minBarHeight || isValueZero)
							return minBarHeight;

						return Math.abs(y(d)) - zeroPosition; 
					}

					// NÚMERO POSITIVO
					if (isValueZero)
						return minBarHeight;

					return Math.abs(y(d) - zeroPosition);
				}

				barHeight = height - barHeight;

				if (barHeight < minBarHeight)
					return minBarHeight;

				return barHeight;
		   })
		   .attr("fill", function(d) {
			return color(cad);
		   })
		   //mouseover
		   .on("mouseover", function(d,i,obj){			   
				if(vrv === 2 || vrv === 3) {
					tooltipInstance.showTooltip(d, [
                        ["title", dados.key[i]],
                        ["Valor", formatNumber(dados.value[i])+"%"],
                        ["Percentual", formatDecimalLimit(dados.percentual[i]*100, 2) + "%"],
                        ["Taxa", formatDecimalLimit(dados.taxa[i], 2)],
                    ]);
                }
                else {
                    tooltipInstance.showTooltip(d, [
                        ["title", dados.key[i]],
                        ["Valor", formatNumber(dados.value[i])],
                        ["Percentual", formatDecimalLimit(dados.percentual[i]*100, 2) + "%"],
                        ["Taxa", formatDecimalLimit(dados.taxa[i], 2)],
                    ]);
				}
			})
			.on("mouseout", tooltipInstance.hideTooltip);
		console.log(data);
		// cria título do gráfico
		if(data[dados.key[0]].uos == undefined) {
			svg.append("text")
                .attr("x", (width / 2))
                .attr("y", 0 - 9)
                .attr("text-anchor", "middle")
                .attr("class","barras-title")
                .text(function() {
                	if(data[dados.key[0]].uf === "Todos") {
                		if(atc == 0) return "Brasil - Setor: "+textJSON.select.cad[cad].name+" - Porte: "+textJSON.select.prt[prt].name;
                        else return "UF: "+ data[dados.key[0]].uf+" - Setor: "+textJSON.select.cad[cad].name+" - Atuacão: "+textJSON.select.atc[atc].name;
                    }
                    else {
                        if(atc == 0) return data[dados.key[0]].uf+" - Setor: "+textJSON.select.cad[cad].name+" - Porte: "+textJSON.select.prt[prt].name;
                        else return "UF: "+ data[dados.key[0]].uf+" - Setor: "+textJSON.select.cad[cad].name+" - Atuacão: "+textJSON.select.atc[atc].name;
                    }
                });
        }
        else if(data[dados.key[0]].uos != 2) {
            svg.append("text")
                .attr("x", (width / 2))
                .attr("y", 0 - 9)
                .attr("text-anchor", "middle")
                .attr("class","barras-title")
                .text(data[dados.key[0]].ano);
		}
		else {
            svg.append("text")
                .attr("x", (width / 2))
                .attr("y", 0 - 9)
                .attr("text-anchor", "middle")
                .attr("class","barras-title")
                .text(data[dados.key[0]].uf);
		}
			

		//cria labels barras
		if(withLabels){
			svg.selectAll("text g")
			   .data(dados.value, function(d) { return d; })
			   .enter()
			   .append("text")
			   .attr("class", "barTopValue")    
			   .text(function(d) {
					return formatNumber(d);
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
				return x(i) + x.bandwidth() / 2 ;
			   })
			   .attr("y", function(d) {
					var minValue = y.domain()[0];
					var maxValue = y.domain()[1];
					var zeroPosition = y(0);
					var isMinValueNegative = minValue < 0;
					var isValueNegative = d < 0;
					var barHeight = y(d);
					var isValueZero = d === 0;
					var isYAxisZero = y(d) <= 5;

					// TEM VALOR NEGATIVO
					if (isMinValueNegative){

						// VALOR NEGATIVO
						if (isValueNegative){
							barHeight = y(d) - zeroPosition;
							return y(d) + minBarHeight + 6;
						}

						// BARRA MUITO PEQUENA
						if (barHeight <= minBarHeight || isValueZero){
							return y(d) - minBarHeight - 4;
						}

						// SE RESULTADO DE y(d) FOR ZERO (0)
						if (isYAxisZero)
							return -5;

						return y(d) - 5;

					}

					return y(d) - 5;        
			   });
		}
		
		//formata labels eixo X
		var xAxis = d3.axisBottom(x)
			.tickFormat(function(d){ if(vrv === 3) return dados.key[d+1]; else return dados.key[d];})
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

		// center #corpo>svg>g element conditionally to Y axis label number width
		var centerCanvas = function(){
			var svg = d3.selectAll("#corpo>svg>g");
			var g = d3.selectAll("#corpo svg g g:last-child g");
			// max width that can fit in without centring
			var maxNormalWidth = 45;
			var currentMaxWidth = 0;

			g.each(function(d){
				var that = d3.select(this).select('text').node();
				var labelWidth = that.getBBox().width;
				
				if (labelWidth > currentMaxWidth)
					currentMaxWidth = labelWidth;
			});

			if (currentMaxWidth > maxNormalWidth)
				svg.attr("transform", "translate(" + Math.round(margin.left +  (currentMaxWidth - maxNormalWidth)) + "," + margin.top + ")");
		}();

		// testa e mostra mensagem de valor zerado/indisponível
		var isValueZero = dados.value.reduce(function(sum, val){ return sum + val; }, 0) === 0;
		var isTaxaZero = dados.taxa.reduce(function(sum, val){ return sum + val; }, 0) === 0;
		var isPercentageZero = dados.percentual.reduce(function(sum, val){ return sum + val; }, 0) === 0;
		if (isValueZero && isTaxaZero && isPercentageZero) {		
			d3.selectAll("#corpo>svg>g>*")
				.filter(function(d){
					// não aplica display none no título
					var clss = d3.select(this).attr("class");					
					return !/title/g.test(clss);					
				})
				.attr("display", "none");
			
			d3.select("#corpo>svg")
				.append("g")
				.attr("class", "no-info")
				.append("text")
				.text("Não há dados sobre essa desagregação")
				.attr("x", d3.select("#corpo>svg").attr("width") / 2)
				.attr("y", d3.select("#corpo>svg").attr("height") / 2)
				.attr("text-anchor", "middle");
		}
	};