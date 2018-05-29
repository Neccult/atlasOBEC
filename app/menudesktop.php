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


<script>

    $("#menuvariaveis").css("display", "none")


</script>

