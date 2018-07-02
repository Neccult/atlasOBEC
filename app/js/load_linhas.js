var coordsAxisX = [];
var coordsAxisY = [];
var anos = [];
var keys = [];

var parseTime = d3.timeParse("%Y");

var margin = {top: 20, right: 25, bottom: 40, left: 45},
    width,
    height;

var x, y;




function create_linhas(linhas_box, data){

    var valueline = d3.line()
        .x(function(d) { return x(d.ano); })
        .y(function(d) { return y(d.valor); });


    getDivSize(linhas_box);
    getBoxXY();

    // console.log(data)

    Object.keys(data).forEach(function (key) {
        anos.push(data[key].ano);
    });

    Object.keys(data[0]).forEach(function (key) {
        if(key != "ano")
            keys.push(key);
    });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin

    var svg = d3.select(linhas_box).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Get the data

    // format the data
    data.forEach(function(d) {
        $.each( d, function( i, deg ) {
            if(i == "ano"){
                d[i] = parseTime(d[i]);
            }
            else{
                d[i] = +d[i]
            }
        })

    });

    var dados = [];
    var valoresBrutos = [];

    $.each(keys, function(i, deg) {

        var valores = [];
        var obj = {};

        Object.keys(data).forEach(function (key) {

            obj['ano'] = data[key]['ano'];
            obj['deg'] = deg;
            obj['valor'] = data[key][deg];
            valoresBrutos.push(data[key][deg]);
            valores.push({'ano': data[key]['ano'], 'deg': deg, 'valor': data[key][deg]})
        });

        dados.push(valores)

    });

    // console.log(dados)


    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.ano; }));

    var tooltipInstance = tooltip.getInstance();

    var min = getMin(valoresBrutos);
    var max = getMax(valoresBrutos)

    if(!(parameters.eixo == 0 && parameters.var > 9 || parameters.eixo == 1 && parameters.var == 6)){
        if(min >= 0)
            min = 0;
    }

    y.domain([min, max]);



    svg.selectAll("path.line")
        .data(dados)
        .enter().append("path")
        .attr("class", "line")
        .attr("scc", function(d){
            d[0].deg;
        })
        .style("opacity",  function(d){
            if(url['cad'] != 0 ){
                if(getCadId(d[0].deg) == url['cad'])
                    return 1;
                else return 0.2;
            }
            else
                return 1;})
        .style("stroke-width", function(d){return 2;})
        .style("stroke", function(d){
            return colorLinhas(d[0].deg)
        })
        .attr("d", valueline);


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
        .on("mouseover", function (d) {
            mousemoveLinhas(d, (this), data, tooltipInstance);

            if(url['cad'] == 0){
                d3.select(this).style("opacity", 1)
            }
        })
        .on("click", function (data) {

            if(window.parent.innerWidth <= 800)
                return;

            if(!(parameters.eixo == 0 && parameters.var >= 10 ||
                    parameters.eixo == 1 && parameters.var > 11 ||
                    parameters.eixo == 2 && (parameters.var == 15 || parameters.var == 16 || parameters.var == 10)))

                clickLinhas(data, (this));
        })
        .on("mouseout", function () {
            tooltipInstance.hideTooltip();

            if(url['cad'] == 0){
                d3.selectAll("path").style("opacity", 1)
            }
        })

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



}

function update_linhas(linhas_box, data){

    var valueline = d3.line()
        .x(function(d) { return x(d.ano); })
        .y(function(d) { return y(d.valor); });

    getBoxXY();

    coordsAxisX = [];
    coordsAxisY = [];

    var svg_linhas = d3.select(linhas_box).select("svg")
        .select("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


    data.forEach(function(d) {

        $.each( d, function( i, deg ) {
            if(i == "ano"){
                d[i] = parseTime(d[i]);
            }
            else{
                d[i] = +d[i]
            }
        })

    });

    var dados = [];
    var valoresBrutos = [];

    $.each( keys, function( i, deg ) {

        var valores = [];
        var obj = {};

        Object.keys(data).forEach(function (key) {

            obj['ano'] = data[key]['ano'];
            obj['deg'] = deg;
            obj['valor'] = data[key][deg];
            valoresBrutos.push(data[key][deg]);
            valores.push({'ano': data[key]['ano'], 'deg': deg, 'valor': data[key][deg]})
        });

        dados.push(valores)

    });

    var tooltipInstance = tooltip.getInstance();

    var min = getMin(valoresBrutos);
    var max = getMax(valoresBrutos);

    if(!(parameters.eixo == 0 && parameters.var > 9 || parameters.eixo == 1 && parameters.var == 6)){
        if(min >= 0)
            min = 0;
    }

    x.domain(d3.extent(data, function(d) { return d.ano; }));
    y.domain([min, max]);

    // var paths = svg_linhas.selectAll("path")
    //     .data(dados)
    //     .transition().duration(800)
    //     .attr("d", valueline)
    //
    //

    var paths = svg_linhas.selectAll("path.line")
        .data(dados).attr("d", valueline);

    paths.exit().remove();

    paths
        .enter().append("path")
        .attr("class", "line")
        .attr("scc", function(d){
            d[0].deg;
        })
        .style("opacity",  function(d){
            if(url['cad'] != 0 ){
                if(getCadId(d[0].deg) == url['cad'])
                    return 1;
                else return 0.2;
            }
            else
                return 1;})
        .style("stroke-width", function(d){return 2;})
        .style("stroke", function(d){
            return colorLinhas(d[0].deg)
        }).attr("d", valueline);



    // Add the Y Axis
    svg_linhas.select(".y")
        .transition().duration(800)
        .call(d3.axisLeft(y))

    svg_linhas.selectAll("path.line")
        .on("mouseover", function (d) {
            mousemoveLinhas(d, (this), data, tooltipInstance);

            if(url['cad'] == 0){
                d3.select(this).style("opacity", 1)
            }
        })
        .on("click", function (data) {

            if(window.parent.innerWidth <= 800)
                return;

            if(!(parameters.eixo == 0 && parameters.var >= 10 ||
                    parameters.eixo == 1 && parameters.var > 11 ||
                    parameters.eixo == 2 && (parameters.var == 15 || parameters.var == 16 || parameters.var == 10)))

                clickLinhas(data, (this));
        })
        .on("mouseout", function () {
            tooltipInstance.hideTooltip();

            if(url['cad'] == 0){
                d3.selectAll("path").style("opacity", 1)
            }
        })

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

    // $( "path" ).each(function( index ) {
    //     if($( this ).attr("scc") == cadName)
    //         $( this ).css("opacity", "1")
    //     else
    //         $( this ).css("opacity", "0.2")
    // });
}

function clickLinhas(d, path) {


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

            updateWindowUrl('deg', deg)
            updateWindowUrl('subdeg', desagId)

        }
        else{
            var cadId = getCadId($(path).attr("scc"));

            url['cad'] = cadId;

            var newMapaSrc = $(window.parent.document).find("#view_box").attr("src").replace(/cad=[0-9]*/, "cad=" +cadId);
            newMapaSrc = newMapaSrc.replace(/uf=[0-9]*/, "uf=" + url['uf']);

            var newBarraSrc = $(window.parent.document).find("#view_box_barras").attr("src").replace(/cad=[0-9]*/, "cad=" + cadId);
            newBarraSrc = newBarraSrc.replace(/ano=[0-9]*/, "ano=" + url['ano']);

            $(window.parent.document).find("#view_box").attr("src", newMapaSrc);
            $(window.parent.document).find("#view_box_barras").attr("src", newBarraSrc);
            $(window.parent.document).find("select[data-id='cad']").val(cadId);

            updateWindowUrl('cad', cadId)
        }

        destacaSetor($(path).attr("scc"));

    }
}

function mousemoveLinhas(d, path, data, tooltipInstance) {

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


        Object.keys(d).forEach(function (key) {
            if(d[key].ano.getFullYear() == ano)
                valor = data[key][scc];
        })



        if(parameters.eixo == 0){
            if(parameters.var == 3){
                valor =  formatNumber(valor*100, 2).toString().replace(".", "");
                tooltipInstance.showTooltip(d, [
                    ["title", scc],
                    ["", valor+"%"]
                ])
            }
            else if(parameters.var == 9){
                valor =  formatNumber(valor*100, 6).toString().replace(".", "");
                tooltipInstance.showTooltip(d, [
                    ["title", scc],
                    ["", valor+"%"]
                ])
            }

        }
        else if(parameters.eixo == 1){
            valor =  formatNumber(valor, 2).toString().replace(".", "");

            if(parameters.var == 4){
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

function colorLinhas(deg){
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

function getDivSize(linhas_box) {
    width = $(linhas_box).width() - margin.left - margin.right;
    height = $(linhas_box).height() - margin.top - margin.bottom;
}

function getBoxXY() {
    x = d3.scaleTime().range([0, width]);
    y = d3.scaleLinear().range([height, 0]);
}

function getMin(valores) {
    return d3.min (valores, function(d) {
        return Math.min(d);
    }
)};

function getMax(valores) {
    return d3.max (valores, function(d) {
            return Math.max(d);
        }
)};


