<!--=== lista de variáveis ===-->

<?php
    if(isset($_GET['empreendimentos'])) {
        ?>
        <div class="">
            <div class="" style="width: 750px; margin: auto;">
                <img src="./images/empreendimentos-icon-ativo.png" width="180" style="margin-right: 5px; margin-top: 25px">
                <a href="page.php#mercado"><img src="./images/mercado-icon.png" width="180" style="margin-right: 5px;"></a>
                <a href="page.php#politicas"><img src="./images/politicas-icon.png" width="180" style="margin-right: 5px;"></a>
                <a href="page.php#comercio"><img src="./images/comercio-icon.png" width="180" style="margin-right: 5px;"></a>
            </div>
        </div>

        <?php
    }
    else  if(isset($_GET['mercado'])) {
        ?>
        <div class="">
            <div class="" style="width: 750px; margin: auto;">
                <a href="page.php#empreendimentos"><img src="./images/empreendimentos-icon.png" width="180" style="margin-right: 5px;"></a>
                <img src="./images/mercado-icon-ativo.png" width="180" style="margin-right: 5px; margin-top: 25px">
                <a href="page.php#politicas"><img src="./images/politicas-icon.png" width="180" style="margin-right: 5px;"></a>
                <a href="page.php#comercio"><img src="./images/comercio-icon.png" width="180" style="margin-right: 5px;"></a>

            </div>
        </div>

        <?php
    }
    else  if(isset($_GET['politicas'])) {
        ?>
        <div class="">
            <div class="" style="width: 750px; margin: auto;">
                <a href="page.php#empreendimentos"><img src="./images/empreendimentos-icon.png" width="180" style="margin-right: 5px;"></a>
                <a href="page.php#mercado"><img src="./images/mercado-icon.png" width="180" style="margin-right: 5px;"></a>
                <img src="./images/politicas-icon-ativo.png" width="180" style="margin-right: 5px; margin-top: 25px">
                <a href="page.php#comercio"><img src="./images/comercio-icon.png" width="180" style="margin-right: 5px;"></a>

            </div>
        </div>

        <?php
    }
    else  if(isset($_GET['comercio'])) {
        ?>
        <div class="">
            <div class="" style="width: 750px; margin: auto;">
                <a href="page.php#empreendimentos"><img src="./images/empreendimentos-icon.png" width="180" style="margin-right: 5px;"></a>
                <a href="page.php#mercado"><img src="./images/mercado-icon.png" width="180" style="margin-right: 5px;"></a>
                <a href="page.php#politicas"><img src="./images/politicas-icon.png" width="180" style="margin-right: 5px;"></a>
                <img src="./images/comercio-icon-ativo.png" width="180" style="margin-right: 5px; margin-top: 25px">

            </div>
        </div>

        <?php
    }
?>