var mapping = {"comercio":4,"politicas":3,"mercado":2,"empreendimentos":1};
var cor_selected = "rgb(109, 191, 201)";
var cor_background = "#e7e7e7";
var id = d3.select(".eixo-ativo").attr("id");
var duration_trans = 350;

d3.select("#eixo"+mapping[id]).style("background-color", cor_selected);

d3.selectAll(".eixo-inativo")
    .on("mouseover", function(){
        id_aux = d3.select(this).attr("id");
        fade_out(mapping[id]);
        fade_in(mapping[id_aux])
    })
    .on("mouseout", function(){
        id_aux = d3.select(this).attr("id");
        fade_out(mapping[id_aux])
        fade_in(mapping[id]);
    });

d3.selectAll(".eixo-barra")
    .on("click", function(){
        d3.selectAll(".eixo-barra")
        .transition()
        .style("background-color", cor_background)
        .duration(duration_trans);

        d3.select(this)
        .transition()
        .style("background-color", cor_selected)
        .duration(duration_trans);
    })
    .on("mouseover", function(){
        d3.selectAll(".eixo-barra")
        .transition()
        .style("background-color", cor_background)
        .duration(duration_trans);
        d3.select(this)
        .transition()
        .style("background-color", cor_selected)
        .duration(duration_trans);
    })
    .on("mouseout", function(){
        d3.select(this)
        .transition()
        .style("background-color", cor_background)
        .duration(duration_trans);
        fade_in(mapping[id]);
    })

function fade_out(id){
    d3.select("#eixo"+id)
        .transition()
        .style("background-color", cor_background)
        .duration(duration_trans);
}
function fade_in(id){
    d3.select("#eixo"+id)
        .transition()
        .style("background-color", cor_selected)
        .duration(duration_trans);
}