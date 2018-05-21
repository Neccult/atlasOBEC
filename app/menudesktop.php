<!--=== lista de variáveis ===-->

<?php
    if(isset($_GET['empreendimentos'])) {
        ?>
        <div class="" style="">
            <div class="" style="width: 850px; height: 180px; margin: auto;">
                <img id="empreendimentos" src="./images/empreendimentos-icon.png" class="eixo-ativo">
                <a href="page.php#mercado"><img id="mercado" src="./images/mercado-icon.png" class="eixo-inativo"></a>
                <a href="page.php#politicas"><img id="politicas" src="./images/politicas-icon.png" class="eixo-inativo"></a>
                <a href="page.php#comercio"><img id="comercio" src="./images/comercio-icon.png" class="eixo-inativo"></a>
            </div>
        </div>

        <?php
    }
    else  if(isset($_GET['mercado'])) {
        ?>
        <div class="">
            <div class="" style="width: 850px; height: 180px; margin: auto;">
                <a href="page.php#empreendimentos"><img id="empreendimentos" src="./images/empreendimentos-icon.png" class="eixo-inativo"></a>
                <img id="mercado" src="./images/mercado-icon.png" class="eixo-ativo">
                <a href="page.php#politicas"><img id="politicas" src="./images/politicas-icon.png" class="eixo-inativo"></a>
                <a href="page.php#comercio"><img id="comercio" src="./images/comercio-icon.png" class="eixo-inativo"></a>

            </div>
        </div>

        <?php
    }
    else  if(isset($_GET['politicas'])) {
        ?>
        <div class="">
            <div class="" style="width: 850px; height: 180px; margin: auto;">
                <a href="page.php#empreendimentos"><img id="empreendimentos" src="./images/empreendimentos-icon.png" class="eixo-inativo"></a>
                <a href="page.php#mercado"><img id="mercado" src="./images/mercado-icon.png" class="eixo-inativo"></a>
                <img id="politicas" src="./images/politicas-icon.png" class="eixo-ativo">
                <a href="page.php#comercio"><img id="comercio" src="./images/comercio-icon.png" class="eixo-inativo"></a>

            </div>
        </div>

        <?php
    }
    else  if(isset($_GET['comercio'])) {
        ?>
        <div class="">
            <div class="" style="width: 850px; height: 180px; margin: auto;">
                <a href="page.php#empreendimentos"><img id="empreendimentos" src="./images/empreendimentos-icon.png" class="eixo-inativo"></a>
                <a href="page.php#mercado"><img id="mercado" src="./images/mercado-icon.png" class="eixo-inativo"></a>
                <a href="page.php#politicas"><img id="politicas" src="./images/politicas-icon.png" class="eixo-inativo"></a>
                <img id="comercio" src="./images/comercio-icon.png" class="eixo-ativo">

            </div>
            
        </div>

        <?php
    }
?>

<div id="barra-slide">
    <a href="page.php#empreendimentos"><div id="eixo1" class="eixo-barra"></div></a>
    <a href="page.php#mercado"><div id="eixo2" class="eixo-barra" ></div></a>
    <a href="page.php#politicas"><div id="eixo3" class="eixo-barra"></div></a>
    <a href="page.php#comercio"><div id="eixo4" class="eixo-barra"></div></a>
</div>

<script src="js/barra_slide.js" type='text/javascript'></script>

<script>
    if(window.parent.innerWidth >= 1200 && window.parent.innerWidth <= 1599){
        $('#containerDesc').css("top", "-210");
        $('#containerDownload').css("top", "-200");
        $('#containerTree').css("top", "-210");

        $('.results-content').find('.container').css("width", "75%");
        $('.results-content').find('.container').css("margin", "auto");


        $('#containerDownload').css("display", "block");
        $('#containerDownload').find("row").css("padding-left", "0");

        $('#view-boxes').css("padding-left", "2%");
        $('#view-boxes').css("padding-right", "2%");

        $('.data-values').css("flex-direction", "row");
        $('.percent-value').css("height", "auto");

        $('#view_box_scc').css("height", "80%");
        $('#view_box_scc').css("width", "75%");

        $('#containerTree #menu-view').css("width", "20%");
        $('#containerTree #menu-view').css("height", "80%");

        $('#title-view-leg-scc').css("height", "80%");
        $('#title-view-leg-scc').css("height", "80%");

        $('.results-content').find(".container").css('width','100%')

        $("#containerDados").removeClass("col-md-5")
        $("#containerDados").addClass("col-md-6")

        $("#containerMapa").removeClass("col-md-5")
        $("#containerMapa").addClass("col-md-6")

        $("#containerBarra").removeClass("col-md-5")
        $("#containerBarra").addClass("col-md-6")

        $("#containerDesc").removeClass("col-md-5")
        $("#containerDesc").addClass("col-md-6")

        $("#containerTree").removeClass("col-md-10")
        $("#containerTree").addClass("col-md-12")

        $("#containerDownload").removeClass("col-md-10")
        $("#containerDownload").addClass("col-md-12")

    }

</script>

