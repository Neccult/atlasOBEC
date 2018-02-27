function ajustaAnos(keys) {
	for(var i = 0; i < keys.length; i++) {
		keys[i] = keys[i+1];
    }
	return keys;
}

function configInfoDataBoxTreemapSCCClick(eixo, vrv, d, root, deg) {
    if(eixo == 0) {
        if(vrv == 2 && url['uf'] == 0){
            setIntegerValueData({valor: d.data.size*100}, eixo, vrv);
        }
        else if(vrv == 2 && url['uf'] != 0){
            setIntegerValueData({valor: d.data.size}, eixo, vrv);
        }
        else if(vrv == 4 && url['uf'] == 0){
            setIntegerValueData({valor: d.data.size}, eixo, vrv);
        }

        else if(vrv == 9 && url['uf'] == 0){
            setIntegerValueData({valor: d.data.size}, eixo, vrv);
        }

        if ((vrv == 1 || vrv == 4 || vrv == 5 || vrv == 6 || vrv == 7 || vrv == 8) && url['uf'] == 0) {
            setPercentValueData({percentual: d.data.size / root.value}, eixo, vrv);
        }
    }
    else if(eixo == 1) {
        if(vrv == 2 && url['uf'] == 0){
            //talvez tenha que mudar aqui pra ficar * 100 ou * 10
            setIntegerValueData({valor: d.data.size}, eixo, vrv);
        }
        else if(vrv == 2 && url['uf'] != 0){
            setIntegerValueData({valor: d.data.size}, eixo, vrv);
        }
        else if(vrv == 4 && url['uf'] == 0){
            setIntegerValueData({valor: d.data.size}, eixo, vrv);
        }

        else if(vrv == 9 && url['uf'] == 0){
            setIntegerValueData({valor: d.data.size}, eixo, vrv);
        }

        if(deg == 0) {
            setPercentValueData({percentual: d.data.size / root.value}, eixo, vrv);
        }
        else {
            setIntegerValueData({valor: d.data.size}, eixo, vrv);
            setPercentValueData({percentual: d.data.size / d.parent.value}, eixo, vrv);
        }
    }
}

function configInfoDataBoxBarrasStackedClick(eixo, vrv, d, soma, deg) {
    if(eixo == 1) {
        if(d.y == "NaN") {
            d.y = 0;
        }
        setIntegerValueData({valor: d.y}, eixo, vrv);
        setPercentValueData({percentual: parseFloat(d.y)/soma}, eixo, vrv);
    }
}

function configInfoDataBoxTreemapSCC(eixo, vrv, cad_data, ocp_data, url, deg_cad, deg_ocp, chg) {
    if(url['cad'] != 0) {
        if(chg == 1) {
            destacaSetor(url['cad']);
            return;
        }
        if(uf == 0 && deg == 0){
            setPercentValueData({percentual: cad_data, taxa: 0}, eixo, vrv);
        }
        else if(deg != 0 && uf == 0) {
            setIntegerValueData({valor: deg_cad, taxa: 0}, eixo, vrv);
            setPercentValueData({percentual: cad_data, taxa: 0}, eixo, vrv);
        }

        destacaSetor(url['cad']);
    }
    if(url['ocp'] != 0) {
        if(chg == 1) {
            destacaSetor(url['ocp']);
            return;
        }
        if(uf == 0 && deg == 0){
            setPercentValueData({percentual: ocp_data, taxa: 0}, eixo, vrv);
        }
        else if(deg != 0 && uf == 0) {
            setIntegerValueData({valor: deg_ocp, taxa: 0}, eixo, vrv);
            setPercentValueData({percentual: ocp_data, taxa: 0}, eixo, vrv);
        }

        destacaSetor(url['ocp']);
    }
}

function configInfoDataBoxTreemapSCCOcupation(eixo, vrv, d, root) {
    if(eixo == 1) {
        if(deg == 0) {
            setPercentValueData({percentual: d.data.size / root.value}, eixo, vrv);
        }
        else {
            setIntegerValueData({valor: d.data.size}, eixo, vrv);
            setPercentValueData({percentual: d.data.size / d.parent.value}, eixo, vrv);
        }
    }
}

function configInfoDataBoxBarrasClick(eixo, vrv, dados, i) {
    if(eixo == 0) {
        if (vrv == 3) {
            dados.valor = dados.value[i] / 100;
            setIntegerValueData(dados, eixo, vrv);
        } else if (vrv == 1) {
            dados.valor = dados.value[i];
            setIntegerValueData(dados, eixo, vrv);

        }
        else if ((vrv == 2) && url['uf'] == 0) {
            dados.valor = dados.value[i];
            setIntegerValueData(dados, eixo, vrv);

        } else if ((vrv == 2) && url['uf'] !== 0) {
            dados.valor = dados.value[i] / 100;
            setIntegerValueData(dados, eixo, vrv);
            setPercentValueData({percentual: dados.percentual[i], taxa: dados.taxa[i]}, eixo, vrv);
        }

        else if (vrv == 9) {
            if(url['uf'] != 0)
                dados.valor = dados.value[i] / 100
            else{
                dados.valor = dados.value[i];
                setIntegerValueData(dados, eixo, vrv);
            }
        }
        else if (vrv >= 4 && vrv <= 8) {
            dados.valor = dados.value[i];
            setIntegerValueData(dados, eixo, vrv);
        }
        else if (vrv > 9) {
            dados.valor = dados.value[i];
            if(url["uos"] == 0){
                setIntegerValueData(dados, eixo, vrv);
            } else if(url["uos"] == 1){
                setPercentValueData(dados, eixo, vrv);
            }
        }
    }
    else if(eixo == 1){
        if(vrv == 10){
            dados.valor = dados.value[i]
            setIntegerValueData(dados, eixo, vrv);
            setPercentValueData(dados, eixo, vrv);

        }
        else if (vrv > 11) {
            dados.valor = dados.value[i];
            if(url["uos"] == 0){
                setIntegerValueData(dados, eixo, vrv);
            } else if(url["uos"] == 1){
                setPercentValueData(dados, eixo, vrv);
            }
        }
        else {
            dados.valor = dados.value[i];
			setIntegerValueData(dados, eixo, vrv);
		}
    }
}

function configInfoDataBoxBarras(eixo, vrv, dados) {
    if(eixo == 0){
        if(url['uf'] == 0) {
            if(vrv == 1 && cad != 0) {
                dados.valor = dados.value[url['ano']-2007];
                setIntegerValueData(dados, eixo, vrv);
            }
            else if(vrv == 3) {
                dados.valor = dados.value[url['ano']-2008]/100;
                setIntegerValueData(dados, eixo, vrv);
                setPercentValueData({percentual: 1, taxa: dados.taxa[url['ano']-2007]}, eixo, vrv);
            }
            else if((vrv == 4 || vrv == 5 || vrv == 6 || vrv == 7 || vrv == 8) && url['cad'] == 0) {
                dados.valor = dados.value[url['ano']-2007];
                setIntegerValueData(dados, eixo, vrv);
                setPercentValueData({percentual: 1, taxa: dados.taxa[url['ano']-2007]}, eixo, vrv);
            }
            else if((vrv == 4 || vrv == 5 || vrv == 6 || vrv == 7 || vrv == 8) && url['cad'] !== 0) {
                dados.valor = dados.value[url['ano']-2007];
                setIntegerValueData(dados, eixo, vrv);
            }
            else if(vrv > 9){
                if(ano != null) {
                    dados.valor = dados.value[url['ano']-2007];
                    if(url['uos'] == 0){
                        setIntegerValueData(dados, eixo, vrv);
                    } else if(url['uos'] == 1){
                        setPercentValueData(dados, eixo, vrv);
                    }

                }
            }
            else if(url['cad'] == 0){
                dados.valor = dados.value[url['ano']-2007];
                setIntegerValueData(dados, eixo, vrv);
                setPercentValueData({percentual: 1, taxa: dados.taxa[url['ano']-2007]}, eixo, vrv);

            }
            else {
                dados.valor = dados.value[url['ano']-2007];
                setIntegerValueData(dados, eixo, vrv);
                setPercentValueData({percentual: 1, taxa: dados.taxa[url['ano']-2007]}, eixo, vrv);
            }
        }
    }
    else if(eixo == 1){
        first_year = Number(dados.key[0]);
        if(vrv > 11){
            if(ano != null) {
                if(url['slc'] == 1) {
                    if(url['ano'] > 2011) {
                        dados.valor = dados.value[url['ano']-2008];
                    }
                    else {
                        dados.valor = dados.value[url['ano']-2007];
                    }
                }
                else {
                    dados.valor = dados.value[url['ano']-first_year];
                }
                if(url['uos'] == 0){
                    setIntegerValueData(dados, eixo, vrv);
                } else if(url['uos'] == 1){
                    setPercentValueData(dados, eixo, vrv);
                }

            }
        } else if(vrv == 5 || vrv == 10) {
            dados.valor = dados.value[url['ano'] - first_year]
            setIntegerValueData(dados, eixo, vrv);
        } else{
            if(url['uf'] == 0 && (url['cad'] == 0 && url['ocp'] == 0))
                setPercentValueData({percentual: 1, taxa: dados.taxa[url['ano']-2007]}, eixo, vrv);
            
            dados.valor = dados.value[url['ano']- first_year];
            setIntegerValueData(dados, eixo, vrv);
        }
    }
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


function appendPorts(iframe){
	if(iframe) {
		if($(window.parent.document).find("select[data-id='deg']").find("option[value='9']").length == 0) {
            $(window.parent.document).find("select[data-id='deg']").append("<option value='9'>PORTE MICRO</option>");
            $(window.parent.document).find("select[data-id='deg']").append("<option value='10'>PORTE PEQUENO</option>");
            $(window.parent.document).find("select[data-id='deg']").append("<option value='11'>PORTE MÉDIO</option>");
            $(window.parent.document).find("select[data-id='deg']").append("<option value='12'>PORTE GRANDE</option>");
        }
    }
    else {
        if($("select[data-id='deg']").find("option[value='9']").length == 0) {
            $("select[data-id='deg']").append("<option value='9'>PORTE MICRO</option>");
            $("select[data-id='deg']").append("<option value='10'>PORTE PEQUENO</option>");
            $("select[data-id='deg']").append("<option value='11'>PORTE MÉDIO</option>");
            $("select[data-id='deg']").append("<option value='12'>PORTE GRANDE</option>");
        }
	}
}
function appendSectorDesags(iframe){
    if(iframe) {
        if($(window.parent.document).find("select[data-id='deg']").find("option[value='1']").length == 0) {
            $(window.parent.document).find("select[data-id='deg']").append("<option value='1'>POR PORTE</option>");
            $(window.parent.document).find("select[data-id='deg']").append("<option value='2'>POR SEXO</option>");
            $(window.parent.document).find("select[data-id='deg']").append("<option value='3'>POR IDADE</option>");
            $(window.parent.document).find("select[data-id='deg']").append("<option value='4'>POR ESCOLARIDADE</option>");
        }
    }
    else {
        if($("select[data-id='deg']").find("option[value='1']").length == 0) {
            $("select[data-id='deg']").append("<option value='1'>POR PORTE</option>");
            $("select[data-id='deg']").append("<option value='2'>POR SEXO</option>");
            $("select[data-id='deg']").append("<option value='3'>POR IDADE</option>");
            $("select[data-id='deg']").append("<option value='4'>POR ESCOLARIDADE</option>");
        }
    }
}
function appendOcupationDesags(iframe){
    if(iframe) {
        if($(window.parent.document).find("select[data-id='deg']").find("option[value='3']").length == 0) {
            $(window.parent.document).find("select[data-id='deg']").append("<option value='3'>POR IDADE</option>");
            $(window.parent.document).find("select[data-id='deg']").append("<option value='4'>POR ESCOLARIDADE</option>");
            $(window.parent.document).find("select[data-id='deg']").append("<option value='5'>POR COR</option>");
            $(window.parent.document).find("select[data-id='deg']").append("<option value='6'>POR FORMALIDADE</option>");
            $(window.parent.document).find("select[data-id='deg']").append("<option value='7'>POR PREVIDÊNCIA</option>");
            $(window.parent.document).find("select[data-id='deg']").append("<option value='8'>POR SINDICATO</option>");
        }
    }
    else {
        if($("select[data-id='deg']").find("option[value='3']").length == 0) {
            $("select[data-id='deg']").append("<option value='3'>POR IDADE</option>");
            $("select[data-id='deg']").append("<option value='4'>POR ESCOLARIDADE</option>");
            $("select[data-id='deg']").append("<option value='5'>POR COR</option>");
            $("select[data-id='deg']").append("<option value='6'>POR FORMALIDADE</option>");
            $("select[data-id='deg']").append("<option value='7'>POR PREVIDÊNCIA</option>");
            $("select[data-id='deg']").append("<option value='8'>POR SINDICATO</option>");
        }
    }
}
function removePorts(iframe){
	if(iframe) {
		if($(window.parent.document).find("select[data-id='deg']").find("option[value='9']").length != 0) {
            $(window.parent.document).find("select[data-id='deg']").find("option[value='9']").remove();
            $(window.parent.document).find("select[data-id='deg']").find("option[value='10']").remove();
            $(window.parent.document).find("select[data-id='deg']").find("option[value='11']").remove();
            $(window.parent.document).find("select[data-id='deg']").find("option[value='13']").remove();
        }
    }
    else {
        if($("select[data-id='deg']").find("option[value='9']").length != 0) {
            $("select[data-id='deg']").find("option[value='9']").remove();
            $("select[data-id='deg']").find("option[value='10']").remove();
            $("select[data-id='deg']").find("option[value='11']").remove();
            $("select[data-id='deg']").find("option[value='12']").remove();
        }
	}
}
function removeSectorDesags(iframe){
    if(iframe) {
        if($(window.parent.document).find("select[data-id='deg']").find("option[value='1']").length != 0) {
            $(window.parent.document).find("select[data-id='deg']").find("option[value='1']").remove();
            $(window.parent.document).find("select[data-id='deg']").find("option[value='2']").remove();
            $(window.parent.document).find("select[data-id='deg']").find("option[value='3']").remove();
            $(window.parent.document).find("select[data-id='deg']").find("option[value='4']").remove();
        }
    }
    else {
        if($("select[data-id='deg']").find("option[value='1']").length != 0) {
            $("select[data-id='deg']").find("option[value='1']").remove();
            $("select[data-id='deg']").find("option[value='2']").remove();
            $("select[data-id='deg']").find("option[value='3']").remove();
            $("select[data-id='deg']").find("option[value='4']").remove();
        }
    }
}
function removeOcupationDesags(iframe){
    if(iframe) {
        if($(window.parent.document).find("select[data-id='deg']").find("option[value='5']").length != 0) {
            $(window.parent.document).find("select[data-id='deg']").find("option[value='3']").remove();
            $(window.parent.document).find("select[data-id='deg']").find("option[value='4']").remove();
            $(window.parent.document).find("select[data-id='deg']").find("option[value='5']").remove();
            $(window.parent.document).find("select[data-id='deg']").find("option[value='6']").remove();
            $(window.parent.document).find("select[data-id='deg']").find("option[value='7']").remove();
            $(window.parent.document).find("select[data-id='deg']").find("option[value='8']").remove();
        }
    }
    else {
        if($("select[data-id='deg']").find("option[value='5']").length != 0) {
            $("select[data-id='deg']").find("option[value='3']").remove();
            $("select[data-id='deg']").find("option[value='4']").remove();
            $("select[data-id='deg']").find("option[value='5']").remove();
            $("select[data-id='deg']").find("option[value='6']").remove();
            $("select[data-id='deg']").find("option[value='7']").remove();
            $("select[data-id='deg']").find("option[value='8']").remove();
        }
    }
}
function enableDesag(eixo, vrv, setor, iframe, slc){

	if(eixo == 0){
		switch(parseInt(vrv)){
			case 1:
			case 2:
			case 3: appendPorts(iframe); break;
			default: removePorts(iframe); break;
		}
	}
	else if(eixo == 1) {
        if(slc == 0) {

            removeOcupationDesags(iframe);
            switch(parseInt(vrv)){
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7: appendSectorDesags(iframe); break;
                default: removeSectorDesags(iframe); break;
            }
        }
        else {
            removeSectorDesags(iframe);
            switch(parseInt(vrv)){
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7: appendOcupationDesags(iframe); break;
                default: removeOcupationDesags(iframe); break;
            }
        }

        if(setor == 0) {

            removeSectorDesags();
        }
    }

}
function setIntegerValueData(value, eixo, vrv) {

	$.get("./data/pt-br.json", function(description) {
		sufixo = description.var[eixo][vrv-1].sufixo_valor;
		prefixo = description.var[eixo][vrv-1].prefixo_valor;
		valor = value.valor;
		switch(eixo) {
			case 0:
				if(vrv == 3) {
					valor = valor*100;
				}else if(vrv == 9 && value.uf == null) {
					valor = valor*100;
				}
				break;
			case 1:
			    if(sufixo == '%')
			        valor *= 100;
		}

		$(window.parent.document).find(".integer-value").first().find(".number").first().html(prefixo+formatDecimalLimit(valor, 2)+sufixo).css("font-size", setIntegerValueFontSize(formatDecimalLimit(valor, 2).toString().length));
			
	});
}

function setIntegerValueFontSize(length){
   
    ww = (window.innerWidth- parseInt($(window.parent.document).find(".iframe-dados").css('padding-left').replace("px", "")))*0.475;
   
	one = ww/(length*(length-1)/length);
    size = one;
    if(size > 42)
        size = 42

	return size+"px";
}

function setStateTitle(stateTitle){
	len = stateTitle.length
	ww = window.innerWidth - parseInt($(window.parent.document).find(".iframe-dados").css('padding-left').replace("px", ""))*2;
	size = Math.round(1.2*ww/len);
	if(size > 30)
		size = 30;
	$(window.parent.document).find(".state-title").css('font-size', size).first().html(stateTitle);
}

function setPercentValueData(value, eixo, vrv) {
    if(eixo == 0){
        if(vrv == 2) {
            $(window.parent.document).find(".percent-value").first().find(".number").first().html("");
            return;
        }
        if(vrv == 3) {
            $(window.parent.document).find(".percent-value").first().find(".number").first().html("");
            return;
        }
        if(vrv < 9) {
            if(value.uf == null) {
                $(window.parent.document).find(".percent-value").first().find(".number").first().html(formatDecimalLimit(value.percentual*100, 2)+"%").css("font-size", setIntegerValueFontSize("100%".toString().length));
                return;
            }
            $(window.parent.document).find(".percent-value").first().find(".number").first().html(formatDecimalLimit(value.percentual*100, 2)+"%").css("font-size", setIntegerValueFontSize("100%".toString().length));
            return;
        }

        if(vrv == 9){
            $(window.parent.document).find(".percent-value").first().find(".number").first().html("");
            return;
        }

        if(vrv >= 10 && vrv <= 13){
            $(window.parent.document).find(".percent-value").first().find(".number").first().html(formatDecimalLimit(value.valor, 2)).css("font-size", setIntegerValueFontSize((formatDecimalLimit(value.valor, 2)).toString().length));
            return;
        }
    }
    else if(eixo == 1){

        if(vrv > 11 ){
            $(window.parent.document).find(".percent-value").first().find(".number").first().html(formatDecimalLimit(value.valor, 2)).css("font-size", setIntegerValueFontSize((formatDecimalLimit(value.valor, 2)).toString().length));
            return;
        }
        else if(vrv == 2 || vrv == 11 || vrv == 10 ||  vrv == 9  || vrv == 4 || vrv == 5 || vrv == 6){
           $(window.parent.document).find(".percent-value").first().find(".number").first().html("");
        }
        else{
            $(window.parent.document).find(".percent-value").first().find(".number").first().html(formatDecimalLimit(value.percentual*100, 2)+"%").css("font-size", setIntegerValueFontSize((formatDecimalLimit(value.percentual*100, 2)+"%").toString().length));
        }
    }

}

/*
* Função que mexe no texto da barra de legenda do mapa.
* Centraliza, muda o tamanho da fonte e formata o texto.
*/
function formatBarTextMap(value, eixo, vrv, obj){	
	var font_size = 9
	$.get("./data/pt-br.json", function(description) {
		
		sufixo = description.var[eixo][vrv-1].sufixo_valor;
		prefixo = description.var[eixo][vrv-1].prefixo_valor;
		valor = value;
		switch(eixo) {
			case 0:
				if(vrv == 3) {
					valor = valor*100;
				}
				break;					
			case 1:
			    if(vrv == 2){
			        valor *= 100;
                }
				else if(vrv == 9){
					valor *= 100;
				}
				break;
					
		}

		if(sufixo == 'h')
			sufixo = '';

		obj.text(formatGreatNumbers(valor, prefixo)+sufixo).style('font-size', font_size);

		width_text =  Math.floor((obj.text()).length*font_size*0.7);
		obj.attr("x", obj.attr("x")-Math.floor(width_text/2));
	});
	
}

/*
* Essa função tira ou coloca o botão 'Ocupações' em função
* da variável selecionada e considerando apenas o EIXO 2
*/
function updateOcupacoes(vrv){
	switch(vrv){
		case '8':
		case '9':
		case '10':
		case '11': $('#ocupacao').css('display', 'none'); break;
		default: $('#ocupacao').css('display', 'inline');
	}
}


/*
* Essa função atualiza a descricao dos valores dados
*/

function updateDataDesc(){
	if($(window.parent.document).find(".integer-value").first().find(".description-number").html() != null){
        var desc_int = $(window.parent.document).find(".integer-value").first().find(".description-number").html().replace("POR UF", "POR ATIVIDADES RELACIONADAS");
        var desc_perc = $(window.parent.document).find(".percent-value").first().find(".description-number").html().replace("POR SETOR", "POR ATIVIDADES CULTURAIS");

        $(window.parent.document).find(".integer-value").first().find(".description-number").html(desc_int);
        $(window.parent.document).find(".percent-value").first().find(".description-number").html(desc_perc);
	}

}

/*
* Essa função tira ou coloca o menu dos setores em função
* do eixo e da variável selecionada
*/
function updateMenuSetor(eixo, vrv){
	if(eixo == 0){
		if(vrv > 9){
			d3.selectAll('#menu-view').filter(function(d, i){
				return i;
			}).style("display", "none");

			var sel = document.getElementById("bread-select-cad");
			for(i = 1; i <  sel.options.length; i++){
                sel.options[i].style.display = "none"
			}
		}
		else{
			d3.selectAll('#menu-view').filter(function(d, i){
				return i;
			}).style("display", "inline");

            var sel = document.getElementById("bread-select-cad");
            for(i = 1; i <  sel.options.length; i++){
                sel.options[i].style.display = "block"
            }
		}
	} else if (eixo == 1){
		if(vrv > 11){
            d3.selectAll('#menu-view').filter(function(d, i){
                return i;
            }).style("display", "none");
		} else{
            d3.selectAll('#menu-view').filter(function(d, i){
                return i;
            }).style("display", "inline");
		}
	}
	
}

/*
* Função para retornar um valor na casa dos milhões ou bilhões num formato encurtado
* PARÂMETROS:
* 	value: número a ser formatado
* 	prefix: caso haja um prefixo na representação do valor. ex: "R$"
*/
function formatGreatNumbers(value, prefix){
	exp_milhao = 6;
	exp_bilhao = 9;

	point = String(value).indexOf(".");

	if(point > exp_milhao && point <= exp_bilhao || point == -1 && String(value).length > exp_milhao){
		value = value / Math.pow(10, exp_milhao);
		return prefix+formatDecimalLimit(value, 2) + "M";
	}
	else if(point > exp_bilhao || point == -1 && String(value).length > exp_bilhao){
		value = value / Math.pow(10, exp_bilhao);
		return prefix+formatDecimalLimit(value, 2) + "B";
	}
	
	return prefix+formatDecimalLimit(value, 2);
}

/*-----------------------------------------------------------------------------
	Função: formatNumber
		executa sequencialmente funções para formatar valor pra notação comum brasileira
	Entrada: 
		{number} value | ex.: 200,300.123456
		{int} decimalLimit | ex.: 2
	Saída:
		{string} ex.: "200.300,12"
-----------------------------------------------------------------------------*/
var formatNumber = function(value, decimalLimit){
	var decimalLimit = decimalLimit || 8;
	var minimumIntDigitsNumberToCapDecValues = 3;

	var intFormat = function(d){
		var tempFormat = d3.format(",.2f");
		return tempFormat(d);
	}

	var fracFormat = function(d){
		var tempFormat = d3.format("."+decimalLimit+"f");
		return tempFormat(d);
	}

/*-----------------------------------------------------------------------------
	Função: numberMagnitude
		calcula magnitude da parte inteira do valor passado levando em consideração a variável {minimumIntDigitsNumberToCapDecValues}
	Entrada: 
		{number} value | ex.: 200,300.12345
	Saída:
		{boolean} ex.: true || false
-----------------------------------------------------------------------------*/
	var numberMagnitude = function(value){
		var arrValue = value.toString();
		var intValue = arrValue.split(".")[0];
		var intTwoDigitOrMore = intValue.replace("-", "").slice(0,3).length > minimumIntDigitsNumberToCapDecValues-1;
		return intTwoDigitOrMore? true : false;
	}

/*-----------------------------------------------------------------------------
	Função: niceNumbers
		transforma valor passado do padrão americano para o comum brasileiro com ponto (.) para separar magnitudes inteiras e vírgula (,) para separar decimais
	Entrada: 
		{number} value | ex.: 200,300.12345
	Saída:
		{string} ex.: "200.300,123"
-----------------------------------------------------------------------------*/
	var niceNumbers = function(value){
		var dot = ".";
		var comma = ",";
		var isMagnitudeHigh = numberMagnitude(value);
		var format;
		var commaMatch = /,/g;

		if(isMagnitudeHigh)
			format = intFormat(value);
		else
			format = fracFormat(value);

		var zeroesFilter = removeDecimalZeroes(format);
		var valueSplit = zeroesFilter.split(dot);
		var finalReturn;

		if (valueSplit.length > 1){
			var intSplit = valueSplit[0].replace(commaMatch, dot);
			var decSplit = valueSplit[1];
			var splitArray = [intSplit,  decSplit];
			finalReturn = splitArray.join(comma);
		} else {
			finalReturn = zeroesFilter.replace(commaMatch, dot);
		}

		return finalReturn;
	};

	return niceNumbers(value);
}

/*-----------------------------------------------------------------------------
	Função: removeDecimalZeroes
		remove zeros decimais inúteis
	Entrada: 
		{number} value | ex.: 200,300.000
	Saída:
		{number} ex.: 200.300
-----------------------------------------------------------------------------*/
var removeDecimalZeroes = function(value){
	var decValue = value.split(".")[1];
	return parseInt(decValue) === 0? value.split(".")[0] : value;
}

/*-----------------------------------------------------------------------------
	Função: countValidDecimalDigits
		recursivamente conta quantidade de números decimais válidos após zeros iniciais
	Entrada: 
		{number} value | ex.: 200,300.00026
	Saída:
		{number} ex.: 3
-----------------------------------------------------------------------------*/
var countValidDecimalDigits = function(value, acum) {
	var acum = acum || 0;
	var digitString = typeof value !== 'string' && typeof value !== 'undefined'? (value).toString() : value;

	// break condition
	if(!value)
		return acum;

	// if has dot (first iteration)
	if (digitString.match(/\./g))
		digitString = digitString.split(".")[1];

	var isZero = parseInt(digitString[0]) === 0? 1: 0;
	var newValue = isZero? digitString.substring(1) : "";
	var newAcum = acum + isZero;

	return countValidDecimalDigits(newValue, newAcum);
};

/*-----------------------------------------------------------------------------
	Função: formatDecimalLimit
		calcula quantidade de casas válidas após zeros iniciais e chama formatNumber com esses parâmetros
	Entrada: 
		{number} value | ex.: 200,300.00026
		{int} decimalLimit | ex.: 2
	Saída:
		{string} ex.: "200.300,00026"
-----------------------------------------------------------------------------*/
var formatDecimalLimit = function(value, limit){
	var limit = limit || 3;
	var intValue = parseInt(value.toString().split(".")[0]);
	var validDecimal = countValidDecimalDigits(value);
	var fracLeadingZeroes = intValue === 0? validDecimal : 0;
	return formatNumber(value, fracLeadingZeroes + limit);
};

/*-----------------------------------------------------------------------------
	Função: tooltip
		função singleton (retorna sempre a mesma instância) do objeto tooltip 
	Entrada: 
		N/A
	Saída:
		{object}
-----------------------------------------------------------------------------*/
var tooltip = (function(){

	var instance;

	/*-----------------------------------------------------------------------------
		Função: create
			cria elemento #tooltip no html
		Entrada: 
			N/A
		Saída:
			Renderiza objeto no DOM
	-----------------------------------------------------------------------------*/
	function create(){
		var tp;

		if (!tp){
			d3.select('#corpo > #tooltip').remove();

			tp = d3.select('#corpo')
				.append('div')
				.attr('id', 'tooltip')
				.attr('class', 'tooltip none');		
		}

		/*-----------------------------------------------------------------------------
			Função: returnTooltip
				retorna instância
			Entrada: 
				N/A
			Saída:
				{object}
		-----------------------------------------------------------------------------*/
		function returnTooltip(){ return tp; }

		/*-----------------------------------------------------------------------------
			Função: createElements
				cria elementos e dá append deles dentro da tooltip
			Entrada: 
				{object} d: objeto dado pelo D3 que contém dados
				{array} arr: array com valores dos elementos a serem criados ex.: [ ["title", "Título teste"], ["Valor", 1234]]
			Saída:
				Dá append dos elementos no elemento Tooltip
		-----------------------------------------------------------------------------*/
		function createElements(d, arr) {
			var valSeparator = "";
			
			arr.forEach(function(el, i){
				var clss = el[0];
				var val = el[1];

				var undoValFormat = [val.split(',')[0].replace('.', ','), val.split(',')[1]];
				var ifVal = undoValFormat.join('.');
				ifVal = parseFloat(ifVal.replace(/[%-\+]/g, ''));

				if (ifVal !== 0){

					var elType = function(val){
						if(clss.indexOf('#') === -1) {
							switch(clss.toLowerCase()){
                                case 'title':
                                    return 'strong';
                                    break;
                                case 'color':
                                    return 'i';
                                    break;
                                default:
                                    return'span';
                            }
                        }
                        else {
							return "i";
						}
					}();

					var p = tp
						.append('p');

					var element = p
						.append(elType);

                    if(clss.indexOf('#') !== -1) {
                        element
                            .attr('class', 'color')
                            .attr("style", "background-color: "+clss);
                            p.append('span')
								.attr('class', 'span-color')
								.text(function() {
								return val;
                            });
                    }
                    else {
                    	element
                            .attr('class', clss.toLowerCase())
                            .text(function() {
                                if(clss === 'title') {
                                    return val;
                                }
                                if(clss === 'color') {
                                    return val;
                                }
                                else {
                                    return clss + valSeparator + val;
                                }
                            });
                    }

				}
			});
		};

		/*-----------------------------------------------------------------------------
			Função: showTooltip
				renderiza elementos dentro da tooltip e posiciona eles de acordo com a posição do mouse.event
			Entrada: 
				{object} d: objeto dado pelo D3 que contém dados
				{array} arr: array com valores dos elementos a serem criados ex.: [ ["title", "Título teste"], ["Valor", 1234]]
			Saída:
				Renderiza elementos dentro do elemento #tooltip
		-----------------------------------------------------------------------------*/
		function showTooltip(d, arr) {
			// remove all elements inside tooltip
			tp.text('');
			// create all elements passed via array: arr
			createElements(d, arr);

			// graph position on screen
			var chartOffset = $('.chart').offset(), 
				leftOffset = chartOffset.left,
				leftOffsetEnd = leftOffset+$('.chart').width(),
				topOffset = chartOffset.top,
				bottomOffset = topOffset + $('.chart').height();
			// tooltip dimensions
			var tooltipWidth = $('.tooltip').width();
            console.log(leftOffset)
			/*== posição do tooltip ==*/
			var xPosition = d3.event.pageX-leftOffset+30;
			var xPositionEnd = xPosition+tooltipWidth;
			var yPosition = d3.event.pageY -topOffset+5;

			// if tooltips final position is outside screen boundries
			if(xPositionEnd>leftOffsetEnd){
				xPosition = xPosition - tooltipWidth - 30; /* altera a posição */
			}

			if(yPosition + $('.tooltip').height() > bottomOffset){
				yPosition = bottomOffset - $('.tooltip').height();// - 30;
			}

			// sets tooltips new position
			d3.select(".tooltip")
				.style("left", xPosition + "px")
				.style("top", yPosition + "px");

			// shows tooltip
			d3.select(".tooltip").classed("none", false);
		};

        function showTooltipLines(d, arr,x, y1, y2) {
            // remove all elements inside tooltip
            tp.text('');
            // create all elements passed via array: arr
            createElements(d, arr);

            // graph position on screen
            var chartOffset = $('.chart').offset(),
                leftOffset = chartOffset.left,
                leftOffsetEnd = leftOffset+$('.chart').width(),
                topOffset = chartOffset.top,
                bottomOffset = topOffset + $('.chart').height();
            // tooltip dimensions
            var tooltipWidth = $('.tooltip').width();

            /*== posição do tooltip ==*/
            var xPosition = x + tooltipWidth + 10;
            var xPositionEnd = xPosition+ tooltipWidth*2 + 10;
            var yPosition = y1 - (y1-y2)/2;

            // if tooltips final position is outside screen boundries
            if(xPositionEnd>leftOffsetEnd){
                xPosition = xPosition - tooltipWidth*2; /* altera a posição */
            }
            if(xPosition < 0){
                xPosition = x+tooltipWidth/4 + 8;
                if(xPosition + tooltipWidth > leftOffsetEnd){
                    xPosition = leftOffsetEnd - tooltipWidth
                }
            }
            if(yPosition + $('.tooltip').height() > bottomOffset){
                yPosition = bottomOffset - $('.tooltip').height();// - 30;
            }

            // sets tooltips new position
            d3.select(".tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px");

            // shows tooltip
            d3.select(".tooltip").classed("none", false);
        };



		/*-----------------------------------------------------------------------------
			Função: hideTooltip
				esconde o element tooltip
			Entrada: 
				N/A
			Saída:
				N/A
		-----------------------------------------------------------------------------*/
		function hideTooltip() {
			d3.select(".tooltip").classed("none", true);
		};

		// API do objeto tooltip
		return {
			tpElement: returnTooltip,
            showTooltip: showTooltip,
            showTooltipLines: showTooltipLines,
			hideTooltip: hideTooltip
		};
	};

	// api do objeto singleton
	return {
		getInstance: function(){
			if (instance)
				return instance;

			instance = create();

			return instance;
		}
	};
})();

// função apenas para debug
function debug(value, match, args){
	if(value === match.toUpperCase()){
		args.unshift(value);
		console.log.apply(console, args);
	}
}

/*-----------------------------------------------------------------------------
	Função: formatTreemapText
		função formata texto interno nos nódulos do treemap
	Entrada: 
		N/A
	Saída:
		manipula elementos na página/DOM
-----------------------------------------------------------------------------*/
var formatTreemapText = function() {
	var g = d3.selectAll("#corpo svg g");
	g.each(function(d){
		var acceptableMargin = { horizontal:6, vertical: 6, betweenText: 10 };
		var minMargin = { horizontal:1, vertical: 2, betweenText: 4 };

		var that = d3.select(this);	
		var box = that.select('rect').node();	
		box = {
			self: box,
			width: box.getBBox().width,
			height: box.getBBox().height
		}
	
		var title = d3.select(this).select('text.title');
		title = {
			self: title,
			width: title.node().getBBox().width,
			height: title.node().getBBox().height
		}

		var percentage = d3.select(this).select('text.percentage');
		percentage = {
			self: percentage,
			width: percentage.node().getBBox().width,
			height: percentage.node().getBBox().height
		}
	
		percentage.self
			.attr("x", box.width - acceptableMargin.horizontal)	
			.attr("y", box.height - acceptableMargin.vertical)	
			.attr("text-anchor", "end");

		var calc = {
			title: {
				width: box.width - title.width - acceptableMargin.horizontal,
				height: box.height - title.height - acceptableMargin.vertical
			},
			percentage: {
				width: box.width - percentage.width - acceptableMargin.horizontal,
				height: box.height - percentage.height - acceptableMargin.vertical
			}
		}
		var doesTitleFit = calc.title.width > acceptableMargin.horizontal*2 && calc.title.width > 0 && calc.title.height > acceptableMargin.vertical*2 && calc.title.height > 0;
		var doesPercentageFit = calc.percentage.width > acceptableMargin.horizontal*2 && calc.percentage.width > 0 && calc.percentage.height > acceptableMargin.vertical*2 && calc.percentage.height > 0;
		var doBothFit = doesTitleFit && doesPercentageFit;

		// first try
		if (!doBothFit) {

			// second try with smaller margin
			calc = {
				title: {
					width: box.width - title.width - minMargin.horizontal,
					height: box.height - title.height - minMargin.vertical
				},
				percentage: {
					width: box.width - percentage.width - minMargin.vertical,
					height: box.height - percentage.height - minMargin.vertical
				}
			}

			// var isBoxHeightSmall = box.height - title.height - percentage.height - minMargin.betweenText < minMargin.vertical*2;
			// var isBoxWidthSmall = box.width - title.width - percentage.width - minMargin.betweenText < minMargin.horizontal*2;
			// var areBothSmall = isBoxHeightSmall && isBoxWidthSmall;

			var doBothFitVertically = box.height - title.height - percentage.height - minMargin.betweenText > minMargin.vertical*2 && box.height - title.height - percentage.height - minMargin.betweenText > 0;
			var doBothFitHorizontally = box.width - title.width - percentage.width - acceptableMargin.betweenText > minMargin.horizontal*2 && box.width - title.width - percentage.width - minMargin.betweenText > 0;

			doesTitleFit = calc.title.width > minMargin.horizontal*2 && calc.title.width > 0 && calc.title.height > minMargin.vertical*2 && calc.title.height > 0;
			doesPercentageFit = calc.percentage.width > minMargin.horizontal*2 && calc.percentage.width > 0 && calc.percentage.height > minMargin.vertical*2 && calc.percentage.height > 0;
			doBothFit = doesTitleFit && doesPercentageFit;
		
			// se title não couber
			if (!doesTitleFit)
				title.self.attr("display", "none");
			
			// se porcentagem não couber esconde title e porcentagem
			if (!doesPercentageFit){
				title.self.attr("display", "none");
				percentage.self.attr("display", "none");
			}

			// se apenas porcentagem couber esconder title
			if (doesPercentageFit && !(doBothFitHorizontally || doBothFitVertically))
				title.self.attr("display", "none");

			// se os dois não couberem esconde os dois
			if (!doBothFit && !(doBothFitHorizontally || doBothFitVertically)) {
				title.self.attr("display", "none");
				percentage.self.attr("display", "none");
			}

			// se os dois (cabem verticalmente, !horizontalmente, espaço vertical disponível < margem vertical) && (!cabem verticalmente, horizontalmente, espaço horizontal disponível < margem horizontal)
			var isBoxSmallForText = ((doBothFitVertically
									&& !doBothFitHorizontally)
									|| box.height - title.height - percentage.height < minMargin.vertical*2)
									|| ((!doBothFitVertically
										&& doBothFitHorizontally)
										&& box.width - title.width - percentage.width < minMargin.horizontal*2);

			var doTitleHorizontalMarginExist = (box.width - title.width - percentage.width - minMargin.betweenText) / 2 >= minMargin.horizontal*2 + 2;
			var doTitleVerticalMarginExist = (box.height - title.height - minMargin.vertical) / 2 >= acceptableMargin.vertical*2;
			
			// se espaço horizontal || vertical - tamanho horizontal || vertical do percentagem < margem vertical || horizontal
			var isBoxSmallForPercentage = box.height - percentage.height < minMargin.vertical*2
										|| box.width - percentage.width < (minMargin.horizontal+2)*2;

			if (isBoxSmallForText || ((!doTitleHorizontalMarginExist || !doTitleVerticalMarginExist) && !doBothFitVertically)){
				title.self
					.attr("x", minMargin.horizontal + 4)
					.attr("y", minMargin.vertical + 11);
			}

			if (isBoxSmallForPercentage){
				percentage.self.attr("x", box.width - minMargin.horizontal - 2);
			}
		}
	});
}