/*$.get("./db/json_donut.php"+config, function(data) {
});*/
var config = "?var=" + vrv + "&uf=" + uf + "&atc=" + atc + "&slc=" + slc + "&cad=" + cad + "&uos=" + uos + "&ano=" + ano + "&prt=" + prt + "&ocp=" + ocp + "&sex=" + sex + "&fax=" + fax + "&esc=" + esc + "&cor=" + cor + "&typ=" + typ + "&prc=" + prc + "&frm=" + frm + "&mec=" + mec + "&mod=" + mod + "&pfj=" + pfj + "&eixo=" + eixo + "&mundo=" +mundo;
var tooltipInstance = tooltip.getInstance();
$.get("./db/json_donut.php"+config, ready);

function ready(json){
    $('#corpo').attr("class", $('#corpo').attr("class")+ " done")
    $('#loading').fadeOut('fast');
    var data = JSON.parse(json);
    getPercent(data);
    height = 220;
    width = $('#corpo').width() - 40;

    radius = Math.min(width, height) / 2;
    var arc = d3.arc()
        .outerRadius(radius - radius/18)   //valor raio círculo de fora
        .innerRadius(radius - radius/2.5);  //valor raio círculo de dentro

    var pie = d3.pie()
        .value(function(d) { return d.valor; })(data);

    var svg = d3.select("#corpo").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie)
        .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.tipo); })
        .style("stroke", "none");

    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".40em")
        .attr("dx", -radius/6)
        .text(function(d) { return percentFormat(d.data.percent) })
        .style("font-family", "arial")
        .style("fill", "#fff")
        .style("font-size", radius/10)

        d3.selectAll(".arc")
        .on("mouseover", function(d){
            d3.select(this).attr("transform", "scale(1.01)")

            tooltipInstance.showTooltip(d.data, [
                ["title", d.data.tipo],
                ["", formatTextVrv(d.data.valor, 3, vrv)],
                ["", percentFormat(d.data.percent)]
            ]);
            
        })
        .on("mouseout", function(d){
            d3.select(this).attr("transform", "scale(1)")
            tooltipInstance.hideTooltip()
        })
}



function color(tipo){
    colors = {
        "Exportação": "#071342",
        "Importação": "rgb(109, 191, 201)"
    }
    return colors[tipo];
}

function getPercent(data){
    sum_values = 0;
    data.forEach(function(d){
        sum_values += d.valor;
    })
    data.forEach(function(d){
        d.percent = d.valor/sum_values
    })
}
function percentFormat(number){
    return (number*100).toFixed(2) + "%";
}