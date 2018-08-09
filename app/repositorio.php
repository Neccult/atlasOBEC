<!DOCTYPE html>
<html style="overflow: hidden">
<head>
    <?php include 'head.php';?>
    <link rel="stylesheet" type="text/css" href="css/repositorio.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>


<div class="section " id="section1">
    <article class="repo-article">
        <div class="repo-content">
            <div class="repo-container">
                <div class="repo-container-boxes">
                    <div class="menu">
                        <form class="w3-container w3-card-4">
                            <h1>Setor</h1>
                            <p>
                            <div class="btn-todos-nenhum">
                                <div style="border-right: 1px black solid" id="todos">Todos</div>
                                <div style="border-left: 1px black solid" id="nenhum">Nenhum</div>
                            </div>

                            </p>
                            <p>
                                <input name="tag" class="check" type="checkbox" checked="checked" >
                                <label>Arquitetura e Design</label>
                            </p>
                            <p>
                                <input name="tag"  class="check" type="checkbox" checked="checked">
                                <label>Artes Cênicas e Espetáculos</label>
                            </p>
                            <p>
                                <input name="tag"  class="check" type="checkbox" checked="checked">
                                <label>Audiovisual</label>
                            </p>
                            <p>
                                <input name="tag"  class="check" type="checkbox" checked="checked">
                                <label>Cultura Digital</label>
                            </p>
                            <p>
                                <input name="tag"  class="check" type="checkbox" checked="checked">
                                <label>Editorial</label>
                            </p>
                            <p>
                                <input name="tag"  class="check" type="checkbox" checked="checked">
                                <label>Educação e Criação em Artes</label>
                            </p>
                            <p>
                                <input name="tag"  class="check" type="checkbox" checked="checked">
                                <label>Entreterimento</label>
                            </p>
                            <p>
                                <input name="tag"  class="check" type="checkbox" checked="checked">
                                <label>Música</label>
                            </p>
                            <p>
                                <input name="tag"  class="check" type="checkbox" checked="checked">
                                <label>Patrimônio</label>
                            </p>
                            <p>
                                <input name="tag"  class="check" type="checkbox" checked="checked">
                                <label>Publicidade</label>
                            </p>

                        </form>
                    </div>

                    <div style="width: 10px; height: auto; border-radius: 10px; background-color: #5B5B5F"></div>

                    <div class="content">

                        <div class="filtro">
                            <div class="search-container">
                                    <input type="text" placeholder="Procurar.." name="search">
                                    <button type="submit"><i class="fa fa-search"></i></button>
                            </div>
                            <div class="search-badge">

                            </div>
                            <div class="badges">
                            </div>
                        </div>

                        <div class="results">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>

</div>
<!---/* url atual para o js */-->
<script type="text/javascript">


    var badgesArray = [];
    var artigos = loadArticlesJSON();

    function loadArticlesJSON() {

        var artigos;

        $.ajaxSetup({async: false});
        $.get('./data/repositorio.json', function(dado){
            artigos =  dado.data
        })
        $.ajaxSetup({async: true});

        return artigos;
    }

    function loadArticle(nome, tags, url){
        $(".results").append("" +
            "<div class=\"card-result\" url="+url+">\n" +
            "   <div class=\"media-card\">\n" +
            "       <div class=\"previa-card\"></div>\n" +
            "   </div>\n" +
            "   <div class=\"info-card\">\n" +
            "       <div class=\"title-card\">"+nome+"</div>\n" +
            "       <div class=\"tags-card\">"+tags+"</div>\n" +
            "   </div>\n" +
            "</div>\n")


    }



    function loadTag(nome){
        badgesArray.push(nome);
        $('.badges').append('<div class="filtro-badge">'+nome+'</div>')
    }

    function loadSearch(texto){
        $('.search-badge').find('div').remove();
        $('.search-badge').append('<div id="search-badge">'+texto+'</div>')

        $('#search-badge').on('click', function () {
            $(this).remove();
            $('.search-container input').val('')
            filterArticles()
        })

    }

    function flushArticles(){
        $('.card-result').each(function () {
            $(this).remove();
        })
    }

    function filterArticles(){

        var filtro = ($('.search-container input').val())

        flushArticles();

        var filtered = [];

        artigos.forEach(function(artigo){

            var nome = artigo.nome;
            var tags = "";
            var selecionado = false;

            if(filtro == ''){

                artigo.tags.forEach(function(tag){

                    if(!selecionado && badgesArray.includes(tag) || tag == "Todos"){
                        filtered.push(artigo);
                        selecionado = true;
                    }
                })

            }
            else{

                if(nome.toUpperCase().indexOf(filtro.toUpperCase()) != -1){
                    artigo.tags.forEach(function(tag){

                        if(!selecionado && badgesArray.includes(tag)  || tag == "Todos"){
                            filtered.push(artigo);
                            selecionado = true;
                        }

                    })
                }

            }


        })

        filtered.forEach(function (artigo) {

            var tags = "";

            artigo.tags.forEach(function(lolo){
                tags += lolo+ "\n"
            })
            loadArticle(artigo.nome, tags, artigo.arquivo)
        })

        $('.card-result').on('click', function(){
            var url = window.location.href.replace('repositorio.php', 'artigos/'+$(this).attr('url'))
            window.open(
                url,
                '_blank' // <- This is what makes it open in a new window.
            );
        })



    }

    $('.menu input[name="tag"]').on('change', function(){

        $(this).val();
        checkFilters();

    })

    $('#nenhum').on("click", function(){
        $('.menu input[name="tag"]').each(function(){
            $(this).prop('checked', false)
        })

        $('.filtro-badge').each(function () {
            $(this).remove();
        })

        checkFilters();

    })

    $('#todos').on("click", function(){
        $('.menu input[name="tag"]').each(function(){
            $(this).prop('checked', true)
        })

        $('.filtro-badge').each(function () {
            $(this).remove();
        })

        badgesArray = [];
        checkFilters();
    })


    function checkFilters(){

        $('.filtro-badge').each(function () {
            $(this).remove();
        })

        badgesArray = [];

        $('.menu input[name="tag"]:checked').each(function(){
            loadTag($(this).parent().find('label').text())

        })

        $('.filtro-badge').on('click', function () {

            var nome = $(this).text();

            $('.menu input[name="tag"]:checked').each(function(){
                var input = $(this);

                if(nome == $(this).parent().find('label').text()){
                    $(this).prop('checked',false);
                    return;
                }

            })

            checkFilters();
        })

        filterArticles()
    }

    $('.search-container input').bind("enterKey",function(e){
        loadSearch($(this).val())
        filterArticles()
    });

    $('.search-container input').keyup(function(e){
        if(e.keyCode == 13)
        {
            $(this).trigger("enterKey");
        }
    });


    checkFilters();
    filterArticles();

</script>

<script src="js/d3/d3.min.js"></script>

</body>
</html>
