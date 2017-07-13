<!DOCTYPE html>
<html>
<head>
<title>Export d3js/SVG as SVG/PDF</title>

<!-- Use CDN'd libraries: Jquery, d3js, BootStrap, google-code-prettify -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
<script src="http://d3js.org/d3.v2.js"></script>
<link href="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.1.1/css/bootstrap-combined.min.css" rel="stylesheet">
<script src="http://netdna.bootstrapcdn.com/twitter-bootstrap/2.1.1/js/bootstrap.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/prettify/188.0.0/prettify.js"></script>

<!-- couldn't find a CDN'd version of vkBeautify, so include it locally -->
<script src="js/vkbeautify.js"></script>

<!-- couldn't find a CDN'd version of Google-Code-Prettify's CSS file, so include it inline.
     Original version is here: http://google-code-prettify.googlecode.com/svn/trunk/src/prettify.css -->
<style>
.pln{color:#000}@media screen{.str{color:#080}.kwd{color:#008}.com{color:#800}.typ{color:#606}.lit{color:#066}.pun,.opn,.clo{color:#660}.tag{color:#008}.atn{color:#606}.atv{color:#080}.dec,.var{color:#606}.fun{color:red}}@media print,projection{.str{color:#060}.kwd{color:#006;font-weight:bold}.com{color:#600;font-style:italic}.typ{color:#404;font-weight:bold}.lit{color:#044}.pun,.opn,.clo{color:#440}.tag{color:#006;font-weight:bold}.atn{color:#404}.atv{color:#060}}pre.prettyprint{padding:2px;border:1px solid #888}ol.linenums{margin-top:0;margin-bottom:0}li.L0,li.L1,li.L2,li.L3,li.L5,li.L6,li.L7,li.L8{list-style-type:none}li.L1,li.L3,li.L5,li.L7,li.L9{background:#eee}
</style>


<!-- Put a black border around the d3js drawing area -->
<style>
div.chart {
	width: 360px;
	height: 180px;
	border: 1px solid black;
}
</style>

</head>

<body>

<div class="container">


<!-- ########### The Drawing Section ####### -->
<div class="row">
	<div class="span12">

		<h2>d3js drawing</h2>

		<button id="randomize" class="btn btn-info">Randomize positions &amp; colors</button>

		<!-- This will be the d3js drawing element -->
		<div class='chart' id='ex1'></div>
	</div>
</div>


<!-- ########### The Export Section ####### -->
<div class="row">
	<div class="span12">
		<h2>Export Drawing</h2>

		<br/>
		<!-- 
		<button class="btn btn-success" id="save_as_svg" value="">
			Save as SVG</button> 
		-->
		<button class="btn btn-success" id="save_as_pdf" value="">
			Save as PDF</button>
		<button class="btn btn-success" id="save_as_png" value="">
			Save as PNG</button>
		<br>
		<br>
		SVG Code:<br>
		<pre class="prettyprint lang-xml" id="svg_code">
		</pre>
	</div>
</div>


<!-- Hidden <FORM> to submit the SVG data to the server, which will convert it to SVG/PDF/PNG downloadable file.
     The form is populated and submitted by the JavaScript below. -->
<form id="svgform" method="post" action="cgi/download.pl">
 <input type="hidden" id="output_format" name="output_format" value="">
 <input type="hidden" id="data" name="data" value="">
</form>


</div> <!--container, end of Bootstrap-->

<script type="text/javascript">

/*
   Utility function: populates the <FORM> with the SVG data
   and the requested output format, and submits the form.
*/
function submit_download_form(output_format)
{
	// Get the d3js SVG element
	var tmp = document.getElementById("ex1");
	var svg = tmp.getElementsByTagName("svg")[0];
	// Extract the data as SVG text string
	var svg_xml = (new XMLSerializer).serializeToString(svg);

	// Submit the <FORM> to the server.
	// The result will be an attachment file to download.
	var form = document.getElementById("svgform");
	form['output_format'].value = output_format;
	form['data'].value = svg_xml ;
	form.submit();
}

/*
d3js Example code, based on the "Three Little Circles" tutorial:
http://mbostock.github.com/d3/tutorial/circle.html
*/
function create_d3js_drawing()
{
	var data = [32, 57, 112],
		dataEnter = data.concat(293),
		dataExit = data.slice(0, 2),
		w = 360,
		h = 180,
		x = d3.scale.ordinal().domain([57, 32, 112]).rangePoints([0, w], 1),
		y = d3.scale.ordinal().domain(data).rangePoints([0, h], 2);

	var svg = d3.select("#ex1").append("svg")
		.attr("width", w)
		.attr("height", h);

	svg.selectAll(".little")
		.data(data)
		.enter().append("circle")
		.attr("class", "little")
		.attr("cx", x)
		.attr("cy", y)
		.attr("r", 12);

	d3.select("#randomize").on("click", function() {
		svg.selectAll(".little")
			.transition()
			.duration(750)
			.attr("cx", function() { return Math.random() * w; })
			.attr("cy", function() { return Math.random() * h; })
			.attr("fill", function() { return '#'+Math.floor(Math.random()*16777215).toString(16); });
		/* Random Hex Color in Javascript, from: http://paulirish.com/2009/random-hex-color-code-snippets/ */

		// Show the new SVG code
		show_svg_code();
		});
}

function show_svg_code()
{
	// Get the d3js SVG element
	var tmp  = document.getElementById("ex1");
	var svg = tmp.getElementsByTagName("svg")[0];

	// Extract the data as SVG text string
	var svg_xml = (new XMLSerializer).serializeToString(svg);

	//Optional: prettify the XML with proper indentations
	svg_xml = vkbeautify.xml(svg_xml);

	// Set the content of the <pre> element with the XML
	$("#svg_code").text(svg_xml);

	//Optional: Use Google-Code-Prettifier to add colors.
	prettyPrint();
}

/*
    One-time initialization
*/
$(document).ready(function() {
	create_d3js_drawing();

	// on first visit, randomize the positions & colors
	randomize.click();

	// Attached actions to the buttons
	$("#show_svg_code").click(function() { show_svg_code(); });

	$("#save_as_svg").click(function() { submit_download_form("svg"); });

	$("#save_as_pdf").click(function() { submit_download_form("pdf"); });

	$("#save_as_png").click(function() { submit_download_form("png"); });
});
</script>

</body>
</html>
