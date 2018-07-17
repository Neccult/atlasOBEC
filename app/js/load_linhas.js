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

    keys = [];

    getDivSize(linhas_box);
    getBoxXY();

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

    var svg_linhas = d3.select(linhas_box).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("deg", parameters.deg)
        .attr("ocp", parameters.ocp)
        .attr("var", parameters.var)
        .style("opacity", "0.1")
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")


    d3.select(linhas_box).select("svg").style("opacity", "0.1")
    d3.select(linhas_box).select("svg").transition().duration(500).style("opacity", "1");

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

    var valueline = d3.line()
        .x(function(d) { return x(d.ano); })
        .y(function(d) { return y(d.valor); });


    svg_linhas.selectAll("path.line")
        .data(dados)
        .enter().append("path")
        .attr("fill", "none")
        .attr("class", "line")
        .attr("scc", function(d){
            return d[0].deg;
        })
        .style("opacity",  function(d){

            if(parameters.eixo == 1 && (parameters.var == 4 || parameters.var == 5 || parameters.var == 6) && parameters.deg != 0){

                var urlDegName = getSubdegName(parameters.deg, parameters.subdeg)

                if(d[0].deg == urlDegName){
                    return 1
                }
                else{
                    return 0.3
                }


                return 1;
            }
            else if(parameters.cad != 0 ){
                if(getCadId(d[0].deg) == parameters.cad){
                    return 1;
                }
                else {
                    return 0.3;
                }
            }
            else
                return 1;})
        .style("stroke-width", function(d){return 2;})
        .style("stroke", function(d){
            return colorLinhas(d[0].deg)
        })
        .attr("d", valueline)
        .on("mouseover", function (d) {
            mousemoveLinhas(d, dados, (this), tooltipInstance);
        })
        .on("click", function (dados) {
            if(window.parent.innerWidth <= 800)
                return;

            if(!(parameters.eixo == 0 && parameters.var >= 10 ||
                    parameters.eixo == 1 && parameters.var > 11 ||
                    parameters.eixo == 2 && (parameters.var == 15 || parameters.var == 16 || parameters.var == 10))){
                clickLinhas(dados, (this));
            }
        })
        .on("mouseout", function () {
            tooltipInstance.hideTooltip();
        });


    // Add the X Axis
    svg_linhas.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .attr("class", "x");

    // Add the Y Axis
    svg_linhas.append("g")
        .call(d3.axisLeft(y))
        .attr("class", "y");



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

    var svg_linhas = d3.select(linhas_box).select("svg");

    if((svg_linhas.attr("deg") != parameters.deg) || (svg_linhas.attr("ocp") != parameters.ocp) || (svg_linhas.attr("var") != parameters.var)){
        svg_linhas.transition().duration(500).style("opacity", "0.1")

        setTimeout(function () {
            svg_linhas.remove();
            create_linhas(linhas_box, data);
        }, 500)

        return;
    }


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

    //TODO EXIT E ENTER DO LINHAS PARA DEGS DIFERENTES
    var paths = svg_linhas.selectAll("path")
        .data(dados)
        .transition().duration(800)
        .attr("d", valueline)

    // Add the Y Axis
    svg_linhas.select(".y")
        .transition().duration(800)
        .call(d3.axisLeft(y))


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

    destacaSetor();
}



function getCadId(cadName){
    switch(cadName){
        case "Todos": return 0;
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
        case "Outros":  return 11;
    }
}

function destacaSetor(cadName){

    d3.selectAll("path.line").style("opacity", function(d){

        if(parameters.eixo == 1 && (parameters.var == 4 || parameters.var == 5 || parameters.var == 6) && parameters.deg != 0){

            var urlDegName = getSubdegName(parameters.deg, parameters.subdeg)


            if(d[0].deg == urlDegName){
                return 1
            }
            else{
                return 0.3
            }
        }
        else if(parameters.cad == 0){
            return 1
        }
        else if(parameters.cad == getCadId(d[0].deg)){
            return 1
        }
        else{
            return 0.3;
        }
    })
}

function clickLinhas(d, path) {


    if(!($(path).hasClass("domain")) ) {

        if(parameters.eixo == 1 && (parameters.var == 4 || parameters.var == 5) && parameters.deg != 0){


            $(".bread-select[data-id=deg]").find("optgroup[value="+parameters.deg+"]").find("option[value="+getSubdegId(parameters.deg, $(path).attr("scc"))+"]").prop('selected', true)//.val(obj+1)
            updateWindowUrl('subdeg', getSubdegId(parameters.deg, $(path).attr("scc")))
            updateIframe();

        }
        else{
            var cadId = getCadId($(path).attr("scc"));

            url['cad'] = cadId;
            parameters.cad = cadId;

            $(".bread-select[data-id='cad']").val(cadId);

            updateWindowUrl('cad', cadId)
            updateIframe();
        }

        destacaSetor($(path).attr("scc"));

    }
}

function mousemoveLinhas(d, data,  path, tooltipInstance) {

    if(!($(path).hasClass("domain")) ){
        var scc = ($(path).attr("scc"));

        var ano = 2007;

        for (var i = 1; i < coordsAxisX.length; i++) {


            var calc1 = (Number(coordsAxisX[i - 1].x) + Number(coordsAxisX[i].x)) / 2;
            var calc2;

            if(i <= coordsAxisX.length - 2)
                calc2 = (Number(coordsAxisX[i].x) + Number(coordsAxisX[i + 1].x)) / 2;
            else
                calc2 = coordsAxisX[i].x;


            if (d3.mouse(d3.event.currentTarget)[0] >= calc1 && d3.mouse(d3.event.currentTarget)[0] <= calc2) {
                ano = anos[i];
                break;
            }

        }


        var valor;
        var indexAno = anos.indexOf(ano);

        if(parameters.eixo == 0 && parameters.var == 3){
            if(indexAno == 10){
                valor = 0;
            }
            else{
                valor = d[anos.indexOf(ano)].valor;
            }
        }
        else{
            valor = d[anos.indexOf(ano)].valor;
        }


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
            else if(parameters.var >= 12){
                valor =  formatNumber(valor, 2).toString().replace(".", "");
                tooltipInstance.showTooltip(d, [
                    ["title", scc],
                    ["", valor]
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
        else if(parameters.eixo == 2){
            valor =  formatNumber(valor, 2).toString().replace(".", "");

            if(parameters.var == 7){
                tooltipInstance.showTooltip(d, [
                    ["title", scc],
                    ["", valor+"%"]
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

    if(deg == 'Despesa Minc / Receita executivo'){
        return (corEixo[1])
    }

    if(deg == 'Financiamento Estatal / Receita executivo'){
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


