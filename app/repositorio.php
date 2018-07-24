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
                            <h2>Setor</h2>
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

                    <div class="content">

                        <div class="filtro">
                            <div class="search-container">
                                <form action="/action_page.php">
                                    <input type="text" placeholder="Procurar.." name="search">
                                    <button type="submit"><i class="fa fa-search"></i></button>
                                </form>
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

    function loadArticle(nome, tags){
        $(".results").append("" +
            "<div class=\"card-result\">\n" +
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

    function flushArticles(){
        $('.card-result').each(function () {
            $(this).remove();
        })
    }


    function filterArticles(){

        flushArticles();

        var filtered = [];

        artigos.forEach(function(artigo){

            var nome = artigo.nome;
            var tags = "";
            var selecionado = false;

            artigo.tags.forEach(function(tag){

                if(badgesArray.includes(tag)){
                    console.log("oi")
                    filtered.push(artigo);
                }

            })


        })

        filtered.forEach(function (artigo) {

            var tags = "";

            artigo.tags.forEach(function(lolo){
                tags += lolo+ "\n"
            })
            loadArticle(artigo.nome, tags)
        })


    }

    $('.menu input[name="tag"]').on('change', function(){

        $(this).val();
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


    checkFilters();
    filterArticles();

</script>

<script src="js/d3/d3.min.js"></script>

</body>
</html>
