$('#loading').fadeOut('fast');
var chartHeight = $('.chart').height();
var chartWidth = $('.chart').width()+25;

/*==== Linhas JS ====*/
var config = "?var=" + vrv + "&deg=" + deg + "&uf=" + uf + "&atc=" + atc + "&slc=" + slc + "&cad=" + cad + "&uos=" + uos + "&ano=" + ano + "&prt=" + prt + "&ocp=" + ocp + "&sex=" + sex + "&fax=" + fax + "&esc=" + esc + "&cor=" + cor + "&typ=" + typ + "&prc=" + prc + "&frm=" + frm + "&prv=" + prv + "&snd=" + snd + "&mec=" + mec + "&mod=" + mod + "&pfj=" + pfj + "&eixo=" + eixo;

// var info = [];
var dados = {key: [], value: []};

// import colors.json file
var colorJSON;
var textJSON;
var colors = [];

var corEixo = window.parent.colorJSON['eixo'][eixo].color;


d3.json('data/colors.json', function (error, data) {
    if (error) throw error;
    colorJSON = data;

    // import pt-br.json file for get the title
    d3.json('data/pt-br.json', function (error, data) {
        if (error) throw error;

        textJSON = data;


        d3.queue()
            .defer(d3.json, "./db/json_linhas.php" + config)
            .await(analyze);
    });

});

$.get("./db/json_linhas.php"+config, function(data) {
    // console.log(data)
});


function getRegexDesag(desag){


    switch (desag){
        case 1:
            return /prt=[0-9]*/;
        case 2:
            return /sex=[0-9]*/;
        case 3:
            return /fax=[0-9]*/;
        case 4:
            return /esc=[0-9]*/;
        case 5:
            return /cor=[0-9]*/;
        case 6:
            return /frm=[0-9]*/;
        case 7:
            return /prv=[0-9]*/;
        case 8:
            return /snd=[0-9]*/;
    }

}

function getDesagId(deg, nome){
    switch(deg){
        case 1:
            switch (nome) {
                case "Micro":
                    return 1;
                case "Pequeno":
                    return 2;
                case "Médio":
                    return 3;
                case "Grande":
                    return 4;
            }
            break;

        case 2:
            switch (nome) {
                case "Feminino":
                    return 2;
                case "Masculino":
                    return 1;
            }
            break;

        case 3:
            switch (nome) {
                case "10 a 17":
                    return 1;
                case "18 a 29":
                    return 2;
                case "30 a 49":
                    return 3;
                case "50 a 64":
                    return 4;
                case "65 ou mais":
                    return 5;
                case "Não classificado":
                    return 6;
            }
            break;

        case 4:
            switch (nome) {
                case "Sem instrução":
                    return 1;
                case "Fundamental incompleto":
                    return 2;
                case "Fundamental completo":
                    return 3;
                case "Médio completo":
                    return 4;
                case "Superior incompleto":
                    return 5;
                case "Superior completo":
                    return 6;
                case "Não determinado":
                    return 7;
            }
            break;

        case 5:

            switch (nome) {
                case "Indígena":
                    return 1;
                case "Branca":
                    return 2 ;
                case "Preta":
                    return 3 ;
                case "Amarela":
                    return 4;
                case "Parda":
                    return 5;
            }
            break;

        case 6:
            switch (nome) {
                case "Formal":
                    return 2;
                case "Informal":
                    return 1;
            }
            break;
        case 7:
            switch (nome) {
                case "Contribuinte":
                    return 2;
                case "Não contribuinte":
                    return 1;
            }
            break;
        case 8:
            switch (nome) {
                case "Membro":
                    return 2;
                case "Não membro":
                    return 1;
            }
            break;

    }
}

function updateUrlDesag(deg, id){
    switch(deg){
        case 1:
            url['prt'] = id;
            return 'prt'
        case 2:
            url['sex'] = id;
            return 'sex'
        case 3:
            url['fax'] = id;
            return 'fax'
        case 4:
            url['esc'] = id;
            return 'esc'
        case 5:
            url['cor'] = id;
            return 'cor'
        case 6:
            url['frm'] = id;
            return 'frm'
        case 7:
            url['prv'] = id;
            return 'prv'
        case 8:
            url['snd'] = id;
            return 'snd'
    }
}

function analyze(error, data) {

    //console.log(colorJSON)

    $('#loading').fadeOut('fast');

    if (error) {
        console.log(error)
    }

    var dados = [];
    var anos = [];

    Object.keys(data).forEach(function (key) {
        dados.push(data[key]);
        anos.push(key);

    });

    var keys = [];
    // console.log(dados)
    Object.keys(dados[0]).forEach(function (key) {
        if(key != "ano")
            keys.push(key);
    });






    //tamanho do grafico
    // AQUI automatizar map center
    var margin = {top: 20, right: 25, bottom: 40, left: 45},
        width = chartWidth - margin.left - margin.right,
        height = chartHeight - margin.top - margin.bottom;

    // parse the date / time
    var parseTime = d3.timeParse("%Y");

// set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var valueline = d3.line()
        .x(function(d) { return x(d.ano); })
        .y(function(d) { return y(d.valor); });



    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("#corpo").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    // Get the data


    // format the data
    dados.forEach(function(d) {

        $.each( d, function( i, deg ) {

            if(i == "ano"){
                d[i] = parseTime(d[i]);
            }
            else{
                d[i] = +d[i]
            }

        })

    });


    var data = [];
    var valoresBrutos = [];

    $.each( keys, function( i, deg ) {

        var valores = [];
        var obj = {};

        Object.keys(dados).forEach(function (key) {

            obj['ano'] = dados[key]['ano'];
            obj['deg'] = deg;
            obj['valor'] = dados[key][deg];
            valoresBrutos.push(dados[key][deg]);
            valores.push({'ano': dados[key]['ano'], 'deg': deg, 'valor': dados[key][deg]})
        });

        data.push(valores)

    });



    // Scale the range of the data
    x.domain(d3.extent(dados, function(d) { return d.ano; }));

    var tooltipInstance = tooltip.getInstance();


    var min = d3.min(valoresBrutos, function(d) {
        return Math.min(d); });

    var max = d3.max(valoresBrutos, function(d) {
        return Math.max(d); });

    if(!(eixo == 0 && vrv > 9 || eixo == 1 && vrv == 6)){
        if(min >= 0)
            min = 0;
    }


    y.domain([min, max]);


    Object.keys(data).forEach(function (i) {

        scc = data[i][0].deg;

        svg.append("path")
            .data([data[i]])
            .attr("class", "line")
            .attr("scc", scc)
            .style("opacity",  function(d){
                if(url['cad'] != 0 ){
                    if(getCadId(scc) == url['cad'])
                        return 1;
                    else return 0.2;
                }
                else
                    return 1;})
            .style("stroke-width", function(d){return 2;})
            .style("stroke", color(scc))
            .attr("d", valueline);
        // d3.selectAll("path").style("opacity", function(d, i){if(deg == i+1 || deg == 0) return 1; else return 0.3})
    });


    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .attr("class", "x");

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y))
        .attr("class", "y");

    svg.selectAll("path")
        .on("mouseover", function (dados) {
            mousemove(dados, (this));

            if(url['cad'] == 0){
                //d3.selectAll("path").style("opacity",  0.3)
                d3.select(this).style("opacity", 1)
            }
        })
        .on("click", function (dados) {

            if(window.parent.innerWidth <= 800)
                return;

            if(!(eixo == 0 && vrv >= 10 ||
                 eixo == 1 && vrv > 11 ||
                 eixo == 2 && (vrv == 15 || vrv == 16 || vrv == 10)))

                click(dados, (this));
        })
        .on("mouseout", function () {
            tooltipInstance.hideTooltip();

            if(url['cad'] == 0){
                d3.selectAll("path").style("opacity", 1)
            }
        })

    var coordsAxisX = [];
    var coordsAxisY = [];

    d3.selectAll('.x g').each(function (d, index) {
        transform = d3.select(this).attr('transform')
        transform = transform.replace('translate(', '');

        x = parseFloat(transform.split(',')[0]);
        y = parseFloat(transform.split(',')[1].replace(')', ''));
        coordsAxisX.push({'ano': anos[index], 'x': x, 'y': y})
    })
    d3.selectAll('.y g').each(function (d, index) {
        transform = d3.select(this).attr('transform')
        transform = transform.replace('translate(', '');

        x = parseFloat(transform.split(',')[0]);
        y = parseFloat(transform.split(',')[1].replace(')', ''));
        coordsAxisY.push({'ano': anos[index], 'x': x, 'y': y})
    })

    function mousemove(d, path) {

        if(!($(path).hasClass("domain")) ){
            var scc = ($(path).attr("scc"));

            var ano = 2007;

            for (var i = 1; i < coordsAxisX.length; i++) {


                calc1 = (Number(coordsAxisX[i - 1].x) + Number(coordsAxisX[i].x)) / 2;
                if(i <= coordsAxisX.length - 2)
                    calc2 = (Number(coordsAxisX[i].x) + Number(coordsAxisX[i + 1].x)) / 2;
                else
                    calc2 = coordsAxisX[i].x;


                if (d3.mouse(d3.event.currentTarget)[0] >= calc1 && d3.mouse(d3.event.currentTarget)[0] <= calc2) {
                    ano = anos[i];
                    break;
                }

            }

            var valor = 2;


            Object.keys(dados).forEach(function (key) {
                if(dados[key].ano.getFullYear() == ano)
                    valor = dados[key][scc];
            })



            if(eixo == 0){
                if(vrv == 3){
                    valor =  formatNumber(valor*100, 2).toString().replace(".", "");
                    tooltipInstance.showTooltip(d, [
                        ["title", scc],
                        ["", valor+"%"]
                    ])
                }
                else if(vrv == 9){
                    valor =  formatNumber(valor*100, 6).toString().replace(".", "");
                    tooltipInstance.showTooltip(d, [
                        ["title", scc],
                        ["", valor+"%"]
                    ])
                }

            }
            else if(eixo == 1){
                valor =  formatNumber(valor, 2).toString().replace(".", "");

                if(vrv == 4){
                    tooltipInstance.showTooltip(d, [
                        ["title", scc],
                        ["R$ ", valor]
                    ])
                }
                else{
                    tooltipInstance.showTooltip(d, [
                        ["title", scc],
                        ["", valor]
                    ])
                }
            }
            else{
                valor =  formatNumber(valor, 2).toString().replace(".", "");
                tooltipInstance.showTooltip(d, [
                    ["title", scc],
                    ["", valor]
                ])
            }

        }


    }
    function click(d, path) {


        if(!($(path).hasClass("domain")) ) {

            if(eixo == 1 && (vrv == 4 || vrv == 5) && deg != 0){
                desagId = (getDesagId(deg, $(path).attr("scc")));
                desagName = updateUrlDesag(deg, desagId)

                // var newMapaSrc = $(window.parent.document).find("#view_box").attr("src").replace(replace, desagName+"=" +desagId);
                var newMapaSrc = $(window.parent.document).find("#view_box").attr("src").replace(getRegexDesag(deg), desagName+"=" +desagId);

                var newBarraSrc = $(window.parent.document).find("#view_box_barras").attr("src").replace(getRegexDesag(deg), desagName+"=" +desagId);

                $(window.parent.document).find("#view_box").attr("src", newMapaSrc);
                $(window.parent.document).find("#view_box_barras").attr("src", newBarraSrc);

                $(window.parent.document).find(".bread-select[data-id=deg]").find("optgroup[value="+deg+"]").find("option[value="+(desagId)+"]").prop('selected', true)


            }
            else{
                cadId = getCadId($(path).attr("scc"));

                url['cad'] = cadId;

                var newMapaSrc = $(window.parent.document).find("#view_box").attr("src").replace(/cad=[0-9]*/, "cad=" +cadId);
                newMapaSrc = newMapaSrc.replace(/uf=[0-9]*/, "uf=" + url['uf']);

                var newBarraSrc = $(window.parent.document).find("#view_box_barras").attr("src").replace(/cad=[0-9]*/, "cad=" + cadId);
                newBarraSrc = newBarraSrc.replace(/ano=[0-9]*/, "ano=" + url['ano']);

                $(window.parent.document).find("#view_box").attr("src", newMapaSrc);
                $(window.parent.document).find("#view_box_barras").attr("src", newBarraSrc);
                $(window.parent.document).find("select[data-id='cad']").val(cadId);

            }

            destacaSetor($(path).attr("scc"));

        }
    }


    function color(deg){
        colors = {

            "Relacionadas": "#87A8CA",
            "Culturais": "#077DDD",

            "Despesa Minc / Receita executivo": "#071342",
            "Financiamento Estatal / Receita executivo": "rgb(109, 191, 201)",

            "ValorTransacionado": "#077DDD",
            "Importação": "#8178AF",
            "Exportação": "#EC8A91",
            "SaldoComercial": "#E96B00",

            "1": "#071342",
            "2": "rgb(109, 191, 201)",
            "3": "#071342",
            "4": "rgb(109, 191, 201)",
            "5": "#071342",
            "6": "rgb(109, 191, 201)",
            "7": "#8178AF",
            "8": "#EC8A91",

            "Branca": "#EC8A91",
            "Parda": "rgb(109, 191, 201)",
            "Preta": "black",
            "Amarela": "yellow",
            "Indígena": "green",

            "Micro": "rgb(109, 191, 201)",
            "Médio": "black",
            "Grande": "yellow",
            "Pequeno": "green",

            "Sem instrução": "#071342",
            "Fundamental incompleto": "#077DDD",
            "Fundamental completo": "#8178AF",
            "Médio completo": "#EC8A91",
            "Superior incompleto": "#E96B00",
            "Superior completo": "rgb(109, 191, 201)",
            "Não determinado": "red",


            "10 a 17": "#071342",
            "18 a 29": "#077DDD",
            "30 a 49": "#8178AF",
            "50 a 64": "#EC8A91",
            "65 ou mais": "rgb(109, 191, 201)",
            "Não classificado": "red",

            "Masculino": "#071342",
            "Feminino": "#E96B00",



        }

        if(deg == 'UF' || deg == 'Formal' || deg == 'Contribuinte' || deg == 'Sim' || deg == 'Membro' || deg == 'Masculino'){
            return (corEixo[1])
        }
        if(deg == 'Setor' || deg == 'Informal' || deg == 'Não contribuinte' || deg == 'Não' || deg == 'Não membro' || deg == 'Feminino'){
            return (corEixo[2])
        }

        Object.keys(colorJSON.cadeias).forEach(function (i, key) {
            colors[colorJSON.cadeias[i].name] = colorJSON.cadeias[i].color;
        });
        return colors[deg];

    }

    function getCadId(cadName){
        switch(cadName){
            case "Arquitetura e Design": return 1;
            case "Artes Cênicas e Espetáculos": return 2;
            case "Audiovisual": return 3;
            case "Cultura Digital": return 4;
            case "Editorial": return 5;
            case "Educação e Criação em Artes": return 6;
            case "Entretenimento": return 7;
            case "Música": return 8;
            case "Patrimônio": return 9;
            case "Publicidade":  return 10;
        }
    }

    function destacaSetor(cadName){

        $( "path" ).each(function( index ) {
            if($( this ).attr("scc") == cadName)
                $( this ).css("opacity", "1")
            else
                $( this ).css("opacity", "0.2")
        });
    }

}



