<!DOCTYPE html>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" type="text/css" href="../css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="../css/gov.css">
<link rel="stylesheet" type="text/css" href="../css/main.css">
<link rel="stylesheet" type="text/css" href="../css/jquery-jvectormap-2.0.3.css">

<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src="../js/dependencias/jquery-jvectormap-2.0.3.min.js"></script>
<script src="../js/continents-mill.js"></script>

<!-- Fav Icons -->
<link rel="icon" type="image/x-icon" href="../css/icon.png" />
<link rel="shortcut icon" type="image/x-icon"  href="../css/icon.png" />

<title>Atlas Econômico da Cultura Brasileira</title>
<script language="javascript">
    function convertCode(code) {
        switch(code) {
            case "AF":
                return 1;
            case "NA":
                return 2;
            case "SA":
                return 3;
            case "AS":
                return 4;
            case "EU":
                return 5;
            case "OC":
                return 6;
        }
    }
    //variaveis configuracao query
    var vrv = 1;
    var atc = 0;
    var cad = 0;
    var ocp = 0;
    var prt = 0;
    var mec = 0;
    var mod = 0;
    var pfj = 0;
    var typ = 0;
    var prc = 0;
    var ano = 2014;
    var eixo = 3;
    var config = "?var="+vrv+"&atc="+atc+"&cad="+cad+"&prt="+prt+"&ocp="+ocp+"&mec="+mec+"&typ="+typ+"&prc="+prc+"&pfj="+pfj+"&ano="+ano+"&eixo="+eixo;
    var gdpData;
    $.get("../db/json_mapa.php"+config, function(data) {
        gdpData = JSON.parse(data);
    });
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
                console.log(gdpData[convertCode(code)].valor);
                el.html(el.html()+'<br>Valor: '+gdpData[convertCode(code)].valor+'');
                el.html(el.html()+'<br>Taxa: '+gdpData[convertCode(code)].taxa+'');
                el.html(el.html()+'<br>Percentual: '+gdpData[convertCode(code)].percentual+'');
            }
        });
    });
</script>
<div id="map123" style="width: 720px; height: 400px"></div>
