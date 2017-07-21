var dark = getCookie('dark');

/*-----------------------------------------------------------------------------
Função: createCookie
    cria um cookie
Entrada: 
    name => nome do cookie
    value => valor do cookie
    days => tempo de duração do cookie
Saída:
    void
-----------------------------------------------------------------------------*/
var createCookie = function(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

/*-----------------------------------------------------------------------------
Função: getCookie
    busca valor de um cookie
Entrada: 
    c_name => nome do cookie
Saída:
    encontrou cookie : retorna valor
    não encontrou : retorna em branco
-----------------------------------------------------------------------------*/
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

/*-----------------------------------------------------------------------------
Função: bodyDark
    altera cores do layout - alto contraste ou normal
Entrada: 
    active => boolean : quando true, adiciona alto contraste; falso, volta ao layout normal
Saída:
    void
-----------------------------------------------------------------------------*/
function bodyDark(active){

	if(active==1){
		$('body').addClass('contraste');
	}else{
		$('body').removeClass('contraste');
	}
}

$(document).on('click', "#contraste", function(){
	
	var darkValue = getCookie("dark");

	if(darkValue==0){
		createCookie('dark',1,'30');
		darkValue=1;
	}else if(darkValue==1){
		createCookie('dark',0,'30');
		darkValue=0;
	}
	bodyDark(darkValue);
});