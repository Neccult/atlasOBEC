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

	if (!empty($_GET["prt"]))
		$prt = $_GET["prt"];
	else
		$prt = 0;

	if (!empty($_GET["ano"]))
		$ano = $_GET["ano"];
	else
		$ano = 2014;

	if (!empty($_GET["cad"]))
		$cad = $_GET["cad"];
	else
		$cad = 0;

	if (!empty($_GET["view"]))
		$view = $_GET["view"];
	else
		$view = "mapa";

	if (!empty($_GET["type"]))
		$type = $_GET["type"];
	else
		$type = "pdf";
?>

<!DOCTYPE html>
<html>
	<head>
		<?php include 'head.php';?>

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
		<script src="js/functions.js"></script>

		<script type="text/javascript" src="js/bootstrap.min.js"></script>
		<script type="text/javascript" src="js/main.js"></script>
		<script type="text/javascript" src="js/contraste.js"></script>
	</head>
	<body>

		<img src="images/loading.gif" class="down-loading"/>

		<div class="chart" style="width: 637px; height: 346px; opacity: 0">
			<div id="corpo" class="<?php echo $view === 'mapa'? 'mapa' : ''; ?>"></div>
		</div>

		<script type="text/javascript">

			//variaveis configuracao query
			var vrv = <?php echo $var; ?>;
			var atc = <?php echo $atc; ?>;
			var cad = <?php echo $cad; ?>;
			var prt = <?php echo $prt; ?>;
			var ano = <?php echo $ano; ?>;
			var uf = <?php echo $uf; ?>;
			var view = '<?php echo $view; ?>';
			var type = '<?php echo $type; ?>';

			var url = {
				view: "<?php echo $view; ?>", 
				var: "<?php echo $var; ?>", 
				prt: "<?php echo $prt; ?>", 
				atc: "<?php echo $atc; ?>", 
				cad: "<?php echo $cad; ?>", 
				ano: "<?php echo $ano; ?>",
				uf: "<?php echo $uf; ?>",
				type: "<?php echo $type; ?>"
			};

			var pageTitle = "<?php echo strip_tags($text['title'])?>";
		</script>

		<script src="js/<?php echo $view; ?>.js"></script>

		<!--<div class="container" style="margin-top: 100px;">
			<div class="row">
				<div class="col-lg-12">
					<h2>Export </h2>
					<br/>
					<button class="btn btn-success" id="save_as_pdf" value="">Save as PDF</button>
					<button class="btn btn-success" id="save_as_png" value="">Save as PNG</button>
					<br>
				</div>
			</div>	
		</div>-->

		<form id="svgform" method="post" action="cgi/download.pl">
			 <input type="hidden" id="output_format" name="output_format" value="">
			 <input type="hidden" id="data" name="data" value="">
		</form>

		<script type="text/javascript">
			function submit_download_form(output_format)
			{
				// Get the d3js SVG element
				var tmp = document.getElementById("corpo");
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

			$(document).ready(function(){
				setTimeout(function(){
					if(view === 'mapa'){
						d3.select('.legendLinear')
						.attr('transform', 'translate(400, 220)');
					}
					submit_download_form(type);		
					}, 50);		 

				setTimeout("window.close()", 2000);

				// $("#save_as_pdf").click(function() { submit_download_form("pdf"); });
				// $("#save_as_png").click(function() { submit_download_form("png"); });
				
			});		
		</script>
	</body>
</html>