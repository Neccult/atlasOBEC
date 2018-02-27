<!DOCTYPE html>
<html>
<meta charset="utf-8">
<head>
    <style>
        path {
            fill: none;
            stroke-width:2;
            stroke: #000;
        }
        svg {
            font: 10px sans-serif;
            overflow:hidden;
        }
    </style>
</head>
<body>
<div id="graph"></div>
<script src="js/d3/d3.min.js"></script>
<script src="http://d3js.org/topojson.v1.min.js"></script> <!--  need add this to read topojson format -->

<script>

    var width = 960,  <!-- your svg size  -->
        height = 500;

    var projection = d3.geo.mercator()     <!-- Proyection type -->
        .scale((1 << 22) / 2 / Math.PI)
        .translate([width / 2, height / 2]);

    var center = projection([-1.79636106388265,46.7740619963089]); <!-- center of proyection -->

    var path = d3.geo.path().projection(projection);

    var zoom = d3.behavior.zoom()               <!-- add zoom function :)  -->
        .scale(projection.scale() * 2 * Math.PI)
        .scaleExtent([1 << 22, 1 << 28])
        .translate([width - center[0], height - center[1]])
        .on("zoom", zoomed);

    var svg = d3.select("body").append("svg")   <!-- create svg -->
        .attr("width", width)
        .attr("height", height);

    var vector = svg;

    d3.json("../data/world-continents.geo.json", function(error, us) {     <!-- ajax data  -->

        svg.call(zoom);
        var plane = topojson.feature(us, us.objects.collection);  <!-- read data -->

        var b, s, t;                           <!--  found center and box limits -->
        projection.scale(1).translate([0, 0]);
        var b = path.bounds(plane);
        console.log(path);
        var s = .9 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
        var t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
        projection.scale(s).translate(t);

        vector= svg.selectAll("path")
            .data(plane.features)
            .enter()
            .append("path")
            .attr("class", "county")
            .attr("d", path);
        console.log(vector);

    });

    function zoomed() {
    projection
        .scale(zoom.scale() / 2 / Math.PI)
        .translate(zoom.translate());
        vector.attr("d", path);
    }

</script>
</body>
</html>