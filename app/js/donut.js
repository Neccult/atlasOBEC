/*$.get("./db/json_donut.php"+config, function(data) {
});*/
var config = "?var=" + vrv + "&uf=" + uf + "&atc=" + atc + "&slc=" + slc + "&cad=" + cad + "&uos=" + uos + "&ano=" + ano + "&prt=" + prt + "&ocp=" + ocp + "&sex=" + sex + "&fax=" + fax + "&esc=" + esc + "&cor=" + cor + "&typ=" + typ + "&prc=" + prc + "&frm=" + frm + "&mec=" + mec + "&mod=" + mod + "&pfj=" + pfj + "&eixo=" + eixo + "&mundo=" +mundo;
var tooltipInstance = tooltip.getInstance();

$.get("./db/json_donut.php"+config, function(data){
    // console.log(data)
});

var corEixo = window.parent.colorJSON['eixo'][eixo].color;
var colorJSON = window.parent.colorJSON;

$.get("./db/json_donut.php"+config, ready);

function ready(json){
    $('#corpo').attr("class", $('#corpo').attr("class")+ " done")
    $('#loading').fadeOut('fast');
    var data = JSON.parse(json);
    getPercent(data);

    height = $('#corpo').height();
    width = $('#corpo').width();

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
        .attr("soma", function(d) { return getSoma(data, d.data.tipo);})
        .style("fill", function(d) { return color(d.data.tipo); })
        .style("stroke", "none");

    /*g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".40em")
        .attr("dx", -radius/6)
        .text(function(d) { 
            if(vrv == 3 && eixo == 3 && d.data.valor != 0){
                return formatTextVrv(d.data.valor, 3, vrv);
            }
            if(eixo == 2 && vrv >= 18)
                return;
            if(d.data.percent != 0) 
                return percentFormat(d.data.percent) 
            })
        .style("font-family", "arial")
        .style("fill", "#fff")
        .style("font-size", radius/10)*/

        d3.selectAll(".arc")
        .on("mouseover", function(d){
            d3.select(this).attr("transform", "scale(1.01)")


            if(eixo == 2 && vrv == 17){
                if(d.data.tipo == "Não"){
                    tooltipInstance.showTooltip(d.data, [
                        ["title", "Não Possui"]
                    ]);
                }
                else{
                    tooltipInstance.showTooltip(d.data, [
                        ["title", "Possui"],
                        ["", formatTextVrv(d.data.total, 2, vrv)]
                    ]);
                }

            }
            if(eixo == 2 && vrv >= 18){
                tooltipInstance.showTooltip(d.data, [
                    ["title", d.data.tipo],
                    ["", formatTextVrv(d.data.valor, 2, vrv)],
                    ["", percentFormat(d.data.percent)]


                ]);

            }
            else{
                tooltipInstance.showTooltip(d.data, [
                    ["title", d.data.tipo],
                    ["", formatTextVrv(d.data.valor, 3, vrv)],
                    ["", percentFormat(d.data.percent)]
                ]);
            }

            
        })
        .on("mouseout", function(d){
            d3.select(this).attr("transform", "scale(1)")
            tooltipInstance.hideTooltip()
        })
        .on("click", function(d){

            if(window.parent.innerWidth <= 1199)
                return;

            if(eixo == 2 && vrv >= 18){

                cadClick = d.data.cad;

                return;

                if(cadClick != cad){

                    console.log(cad)

                    srcMapa = $(parent.document).find("iframe#view_box").first().attr("src");
                    srcMapa = srcMapa.replace(/cad=[0-9]/, "cad="+cadClick);
                    $(parent.document).find("iframe#view_box").first().attr("src", srcMapa);

                    srcBarras = $(parent.document).find("iframe#view_box_scc").first().attr("src");
                    srcBarras = srcBarras.replace(/cad=[0-9]/, "cad="+cadClick);
                    $(parent.document).find("iframe#view_box_scc").first().attr("src", srcBarras)


                    cad = cadClick

                    $("#bread-select-cad").val(2)

                }


            }
            else  if(eixo == 3){
                tipo = d.data.tipo
                $(parent.document).find(".opt-select[data-id=typ]").first().val(indexTipos(tipo))

                srcMapa = $(parent.document).find("iframe#view_box").first().attr("src");
                srcMapa = srcMapa.replace(/typ=[0-9]/, "typ="+indexTipos(tipo));
                $(parent.document).find("iframe#view_box").first().attr("src", srcMapa)

                if(eixo == 3 && (vrv >= 1 && vrv != 5 && vrv != 8 && vrv <= 10 || vrv == 12)){
                    srcBarras = $(parent.document).find("iframe#view_box_scc").first().attr("src");
                    srcBarras = srcBarras.replace(/typ=[0-9]/, "typ="+indexTipos(tipo));
                    $(parent.document).find("iframe#view_box_scc").first().attr("src", srcBarras)
                }
                else{
                    srcBarras = $(parent.document).find("iframe#view_box_barras").first().attr("src");
                    srcBarras = srcBarras.replace(/typ=[0-9]/, "typ="+indexTipos(tipo));
                    $(parent.document).find("iframe#view_box_barras").first().attr("src", srcBarras)
                }
            }




        })



    if(eixo == 2 && (vrv == 18 || vrv == 19)){
        var soma = 0;
        var acumuladoSetor;

        Object.keys(data).forEach(function (key) {
            soma += data[key].valor;
            if(cad == data[key].cad)
                acumuladoSetor = data[key].valor;
        })

        if(cad == 0)
            acumuladoSetor = soma;


        setPercentValueData({valor: formatTextVrv(acumuladoSetor,eixo, vrv)} , eixo, vrv)

    }



}



function color(tipo){

    if(tipo == "Sim" || tipo == "Exportação"){
        return corEixo[1];
    }
    else if(tipo == "Não"){
        return corEixo[2];
    }
    else if(tipo == "Importação"){
        return corEixo[3];
    }

    return colorJSON['cadeias'][tipo].color;
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

function getSoma(data, tipo){
    sum_values = 0;
    data.forEach(function(d){
        // console.log(d)
        sum_values += d.valor;
    })
    data.forEach(function(d){
        d.percent = d.valor/sum_values
    })
}

function percentFormat(number){
    return (number*100).toFixed(2) + "%";
}

function indexTipos(tipo){
    switch(tipo){
        case "Exportação": return 1;
        case "Importação": return 2;
    }
}