// format value number
var formatNumber = function(value, decimalLimit){
	var decimalLimit = decimalLimit || 8;
	var minimumIntDigitsNumberToCapDecValues = 3;

	var intFormat = function(d){
		var tempFormat = d3.format(",.2f");
		return tempFormat(d);
	}

	var fracFormat = function(d){
		var tempFormat = d3.format("."+decimalLimit+"f");
		return tempFormat(d);
	}

	var numberMagnitude = function(value){
		var arrValue = value.toString();
		var intValue = arrValue.split(".")[0];
		var intTwoDigitOrMore = intValue.replace("-", "").slice(0,3).length > minimumIntDigitsNumberToCapDecValues-1;
		return intTwoDigitOrMore? true : false;
	}

	var niceNumbers = function(value){
		var dot = ".";
		var comma = ",";
		var isMagnitudeHigh = numberMagnitude(value);
		var format;
		var commaMatch = /,/g;

		if(isMagnitudeHigh)
			format = intFormat(value);
		else
			format = fracFormat(value);

		var zeroesFilter = removeDecimalZeroes(format);
		var valueSplit = zeroesFilter.split(dot);
		var finalReturn;

		if (valueSplit.length > 1){
			var intSplit = valueSplit[0].replace(commaMatch, dot);
			var decSplit = valueSplit[1];
			var splitArray = [intSplit,  decSplit];
			finalReturn = splitArray.join(comma);
		} else {
			finalReturn = zeroesFilter.replace(commaMatch, dot);
		}

		return finalReturn;
	};

	return niceNumbers(value);
}

// remove decimal if only zeroes
var removeDecimalZeroes = function(value){
	var decValue = value.split(".")[1];
	return parseInt(decValue) === 0? value.split(".")[0] : value;
}

// recursive function return number of digits until non zero fraction number
var countValidDecimalDigits = function(value, acum) {
	var acum = acum || 0;
	var digitString = typeof value !== 'string' && typeof value !== 'undefined'? (value).toString() : value;

	// break condition
	if(!value)
		return acum;

	// if has dot (first iteration)
	if (digitString.match(/\./g))
		digitString = digitString.split(".")[1];

	var isZero = parseInt(digitString[0])	 === 0? 1: 0;
	var newValue = isZero? digitString.substring(1) : "";
	var newAcum = acum + isZero;

	return countValidDecimalDigits(newValue, newAcum);
};

// format decimal numbers with X limit digits after leading zeroes
var formatDecimalLimit = function(value, limit){
	var limit = limit || 3;
	var intValue = parseInt(value.toString().split(".")[0]);
	var validDecimal = countValidDecimalDigits(value);
	var fracLeadingZeroes = intValue === 0? validDecimal : 0;
	return formatNumber(value, fracLeadingZeroes + limit);
};


var tooltip = function(){

	function createTooltip(){
		d3.select('#corpo > #tooltip').remove();

		return d3.select('#corpo')
			.append('div')
			.attr('id', 'tooltip')
			.attr('class', 'tooltip none');
	}; 

	function createElements(d, toolt, arr) {
		arr.forEach(function(el, i){

			var clss = el[0];
			var val = el[1];

			var elType = function(val){
				switch(clss.toLowerCase()){
					case 'title':
						return 'strong';
						break;
					default:
						return'span';
				}
			}();

			var p = toolt
				.append('p');

			var element = p
				.append(elType);

			element
				.attr('class', clss.toLowerCase())
				.text(clss === 'title'? val : clss +" = "+ val);
		});
	};

	function showTooltip(d, toolt, arr) {
		// remove all elements inside tooltip
		toolt.text('');
		// create all elements passed via array: arr
		createElements(d, toolt, arr);

		// graph position on screen
		var chartOffset = $('.chart').offset(), 
			leftOffset = chartOffset.left,
			leftOffsetEnd = leftOffset+$('.chart').width(),
			topOffset = chartOffset.top;

		// tooltip dimensions
		var tooltipWidth = $('.tooltip').width();

		/*== posição do tooltip ==*/
		var xPosition = d3.event.pageX-leftOffset+30;
		var xPositionEnd = xPosition+tooltipWidth;
		var yPosition = d3.event.pageY -topOffset+5;

		// if tooltips final position is outside screen boundries
		if(xPositionEnd>leftOffsetEnd){
			xPosition = xPosition - tooltipWidth - 30; /* altera a posição */
		}

		// sets tooltips new position
		d3.select(".tooltip")
			.style("left", xPosition + "px")
			.style("top", yPosition + "px");

		// shows tooltip
		d3.select(".tooltip").classed("none", false);
	};

	function hideTooltip() {
		d3.select(".tooltip").classed("none", true);
	};

	return {
		addTooltip: createTooltip,
		showTooltip: showTooltip,
		hideTooltip: hideTooltip
	};
}

// creates and format tooltip
// var mouseOn = function(d, toolt, arr) {

// 	toolt.text('');


// 	arr.forEach(function(el, i){

// 		var clss = el[0];
// 		var val = el[1];

// 		var elType = function(val){
// 			switch(clss.toLowerCase()){
// 				case 'title':
// 					return 'strong';
// 					break;
// 				default:
// 					return'span';
// 			}
// 		}();

// 		var p = toolt
// 			.append('p');

// 		var element = p
// 			.append(elType);

// 		element
// 			.attr('class', clss.toLowerCase())
// 			.text(clss === 'title'? val : clss +" = "+ val);

// 		// console.log(clss, val);
// 	});

// 	/* atualiza nome tooltip */
// /*	d3.select(".tooltip .heading")
// 		.text(d['properties']['name']);

// 	d3.select(".tooltip .size")
// 		.text(formatNumber(dict[d.id].valor));
// */
// 	/*== posição do gráfico na tela ==*/
// 	var chartOffset = $('.chart').offset(), 
// 		leftOffset = chartOffset.left,
// 		leftOffsetEnd = leftOffset+$('.chart').width(),
// 		topOffset = chartOffset.top;

// 	/* tamanho do tooltip */
// 	var tooltipWidth = $('.tooltip').width();

// 	/*== posição do tooltip ==*/
// 	var xPosition = d3.event.pageX-leftOffset+30;
// 	var xPositionEnd = xPosition+tooltipWidth;
// 	var yPosition = d3.event.pageY -topOffset+5;

   
// 	/* se a posição final do tooltip for além do final da tela */
// 	if(xPositionEnd>leftOffsetEnd){
// 		xPosition = xPosition - tooltipWidth - 30; /* altera a posição */
// 	}

// 	d3.select(".tooltip")
// 		.style("left", xPosition + "px")
// 		.style("top", yPosition + "px");

// 	d3.select(".tooltip").classed("none", false);

// };

// var mouseOut = function() {
// 	d3.select(".tooltip").classed("none", true);
// };