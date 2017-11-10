<?php
    if(isset($_GET['empreendimentos'])) {
        ?>
        <div class="row">
            <div class="col-md-12">
                <p class="title">Empreendimentos Culturais</p>

            </div>
        </div>
        <?php
    }
    else  if(isset($_GET['mercado'])) {
        ?>
        <div class="row">
            <div class="col-md-12">
                <p class="title">Mercado de Trabalho</p>

            </div>
        </div>
        <?php
    }
    else  if(isset($_GET['politicas'])) {
        ?>
        <div class="row">
            <div class="col-md-12">
                <p class="title">Políticas Públicas</p>

            </div>
        </div>
        <?php
    }
    else  if(isset($_GET['comercio'])) {
        ?>
        <div class="row">
            <div class="col-md-12">
                <p class="title">Comércio Internacional</p>

            </div>
        </div>
        <?php
    }
?>