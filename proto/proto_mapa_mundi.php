<!DOCTYPE html>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="../css/gov.css">
<link rel="stylesheet" type="text/css" href="../css/main.css">
<link rel="stylesheet" type="text/css" href="../css/jquery-jvectormap-2.0.3.css">

<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src="../js/jquery-jvectormap-2.0.3.min.js"></script>
<script src="../js/continents-mill.js"></script>

<!-- Fav Icons -->
<link rel="icon" type="image/x-icon" href="../css/icon.png" />
<link rel="shortcut icon" type="image/x-icon"  href="../css/icon.png" />

<title>Atlas Econômico da Cultura Brasileira</title>
<script language="javascript">
    var gdpData = [];
    gdpData["AF"] = 400;
    gdpData["NA"] = 1000;
    gdpData["SA"] = 900;
    gdpData["AS"] = 200;
    gdpData["OC"] = 100;
    gdpData["EU"] = 300;
    $(function(){
        $('#map123').vectorMap({
            map: 'continents_mill',
            series: {
                regions: [{
                    values: gdpData,
                    scale: ['#C8EEFF', '#0071A4'],
                    normalizeFunction: 'polynomial'
                }]
            },
            onRegionTipShow: function(e, el, code){
                console.log(code);
                el.html(el.html()+' (GDP - '+gdpData[code]+')');
            }
        });
    });
</script>
<div id="map123" style="width: 720px; height: 400px"></div>
<canvas width="960" height="500"></canvas>

<div class="col-md-7 col-xs-12">
    <div class="container-chart">
        <div class="content">
            <div class="chart">
            </div>
        </div>
    </div>
</div>

<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="https://unpkg.com/topojson-client@3"></script>
<script>

var context = d3.select("canvas").node().getContext("2d"),
    path = d3.geoPath(d3.geoOrthographic(), context);

d3.json("https://unpkg.com/world-atlas@1/world/110m.json", function(error, world) {
  if (error) throw error;

  context.beginPath();
  path(topojson.mesh("us"));
  context.stroke();
});

</script>
