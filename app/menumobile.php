<?php
    if(isset($_GET['empreendimentos'])) {
        ?>
        <div class="row">
            <div class="col-md-12">
                <select class="opt-select" data-id="eixo">
                    <option value='empreendimentos' selected>Empreendimentos Culturais</option>
                    <option value='mercado'>Mercado de Trabalho</option>
                    <option value='politicas'>Políticas Públicas</option>
                    <option value='comercio'>Comércio Internacional</option>
                </select>
            </div>
        </div>
        <script>
            $(function() {
                $(".opt-select[data-id='eixo']").val("empreendimentos");
            });
        </script>
        <?php
    }
    else  if(isset($_GET['mercado'])) {
        ?>
        <div class="row">
            <div class="col-md-12">
                <select class="opt-select" data-id="eixo">
                    <option value='empreendimentos'>Empreendimentos Culturais</option>
                    <option value='mercado' selected>Mercado de Trabalho</option>
                    <option value='politicas'>Políticas Públicas</option>
                    <option value='comercio'>Comércio Internacional</option>
                </select>
            </div>
        </div>
        <script>
            $(function() {
                $(".opt-select[data-id='eixo']").val("mercado");
            });
        </script>
        <?php
    }
    else  if(isset($_GET['politicas'])) {
        ?>
        <div class="row">
            <div class="col-md-12">
                <select class="opt-select" data-id="eixo">
                    <option value='empreendimentos'>Empreendimentos Culturais</option>
                    <option value='mercado'>Mercado de Trabalho</option>
                    <option value='politicas' selected>Políticas Públicas</option>
                    <option value='comercio'>Comércio Internacional</option>
                </select>
            </div>
        </div>
        <script>
            $(function() {
                $(".opt-select[data-id='eixo']").val("politicas");
            });
        </script>
        <?php
    }
    else  if(isset($_GET['comercio'])) {
        ?>
        <div class="row">
            <div class="col-md-12">
                <select class="opt-select" data-id="eixo">
                    <option value='empreendimentos'>Empreendimentos Culturais</option>
                    <option value='mercado'>Mercado de Trabalho</option>
                    <option value='politicas'>Políticas Públicas</option>
                    <option value='comercio' selected>Comércio Internacional</option>
                </select>
            </div>
        </div>
        <script>
            $(function() {
                $(".opt-select[data-id='eixo']").val("comercio");
            });
        </script>
        <?php
    }
?>