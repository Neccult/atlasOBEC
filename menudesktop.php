<!--=== lista de variáveis ===-->

<?php
    if(isset($_GET['empreendimentos'])) {
        ?>
        <div class="">
            <div class="">
                <p class="title">Empreendimentos Culturais</p>

            </div>
        </div>

        <?php
    }
    else  if(isset($_GET['mercado'])) {
        ?>
        <div class="">
            <div class="">
                <p class="title">Mercado de Trabalho</p>

            </div>
        </div>

        <?php
    }
    else  if(isset($_GET['politicas'])) {
        ?>
        <div class="">
            <div class="">
                <p class="title">Políticas Públicas</p>

            </div>
        </div>

        <?php
    }
    else  if(isset($_GET['comercio'])) {
        ?>
        <div class="">
            <div class="">
                <p class="title">Comércio Internacional</p>

            </div>
        </div>

        <?php
    }
?>