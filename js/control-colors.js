/*-----------------------------------------------------------------------------
Função: controlColor
    Controla as cores das páginas dependendo do eixo selecionado.
Saída:
    void
-----------------------------------------------------------------------------*/
function controlColor() {
    newHash = window.location.hash.substring(1);
    head = $("head");
    switch(newHash) {
        case "mercado":
            head.append('<link rel="stylesheet" type="text/css" href="css/mercado.css">');
            break;
        case "politicas":
            head.append('<link rel="stylesheet" type="text/css" href="css/politicas.css">');
            break;
        case "comercio":
            head.append('<link rel="stylesheet" type="text/css" href="css/comercio.css">');
            break;
        default:
            break;
    }
}

$(function() {
    controlColor();
});