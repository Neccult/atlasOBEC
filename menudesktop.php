<!--=== lista de variáveis ===-->

<?php
    if(isset($_GET['empreendimentos'])) {
        ?>
        <div class="row">
            <div class="col-md-12">


                <a href="index.php<?php if(isset($dark)) echo "?dark=1";?>" class="img-link"><div class="logo-min"></div></a>

                <p class="title">Empreendimentos Culturais</p>

            </div>
        </div>
        <div class="row var-list-line">

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green1">
                    <span href="1" class="var-click"><li>Total de Empresas</li></span>
                    <span href="2" class="var-click"><li>Peso das Empresas</li></span>
                    <span href="3" class="var-click"><li>Natalidade e<br/> Mortalidade</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green2">
                    <span href="4" class="var-click"><li>Receita total</li></span>
                    <span href="5" class="var-click"><li>Receita Líquida</li></span>
                    <span href="7" class="var-click"><li>Lucro</li></span>
                    <span href="6" class="var-click"><li>Custo</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green3">
                    <span href="9" class="var-click"><li>VA/PIB</li></span>
                    <span href="8" class="var-click"><li>Valor Adicionado (VA)</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green4">
                    <span href="12" class="var-click"><li>C4 Empresas</li></span>
                    <span href="11" class="var-click"><li>IHH/VA</li></span>
                    <span href="10" class="var-click"><li>IHH Empresas</li></span>
                    <span href="13" class="var-click"><li>C4/VA</li></span>
                </ul>
            </div>

        </div>
        <?php
    }
    else  if(isset($_GET['mercado'])) {
        ?><div class="row">
        <div class="col-md-12">


            <a href="index.php<?php if(isset($dark)) echo "?dark=1";?>" class="img-link"><div class="logo-min"></div></a>

            <p class="title">Mercado de Trabalho</p>

        </div>
        </div>
        <div class="row var-list-line">

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green1">
                    <span href="1" class="var-click"><li>Total de Trabalhadores</li></span>
                    <span href="2" class="var-click"><li>Participação da Cultura no Emprego</li></span>
                    <span href="3" class="var-click"><li>Horas trabalhadas na cultura</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green2">
                    <span href="4" class="var-click"><li>Remuneração média</li></span>
                    <span href="5" class="var-click"><li>Remuneração x Hora Trabalhada</li></span>
                    <span href="6" class="var-click"><li>Jornada de Trabalho</li></span>
                    <span href="7" class="var-click"><li>Massa Salarial Cultural</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green3">
                    <span href="9" class="var-click"><li>Valor Adicionado por Trabalhador</li></span>
                    <span href="8" class="var-click"><li>Massa Salarial x Valor Adicioando</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green4">
                    <span href="12" class="var-click"><li>Variação na Ocupação x Variação do Valor Adicionado</li></span>
                    <span href="11" class="var-click"><li>Custo Total x Salários Pagos</li></span>
                    <span href="10" class="var-click"><li>Concentração do Emprego Cultural</li></span>
                    <span href="13" class="var-click"><li>Concentração da Massa Salarial</li></span>
                    <span href="13" class="var-click"><li>IHH de Número de Trabalhadores</li></span>
                    <span href="13" class="var-click"><li>IHH da Massa de Rendimentos</li></span>
                </ul>
            </div>

        </div>
        <?php
    }
    else  if(isset($_GET['politicas'])) {
        ?><div class="row">
        <div class="col-md-12">


            <a href="index.php<?php if(isset($dark)) echo "?dark=1";?>" class="img-link"><div class="logo-min"></div></a>

            <p class="title">Políticas Públicas</p>

        </div>
        </div>
        <div class="row var-list-line">

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green1">
                    <span href="1" class="var-click"><li>Total de Trabalhadores</li></span>
                    <span href="2" class="var-click"><li>Participação da Cultura no Emprego</li></span>
                    <span href="3" class="var-click"><li>Horas trabalhadas na cultura</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green2">
                    <span href="4" class="var-click"><li>Remuneração média</li></span>
                    <span href="5" class="var-click"><li>Remuneração x Hora Trabalhada</li></span>
                    <span href="6" class="var-click"><li>Jornada de Trabalho</li></span>
                    <span href="7" class="var-click"><li>Massa Salarial Cultural</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green3">
                    <span href="9" class="var-click"><li>Valor Adicionado por Trabalhador</li></span>
                    <span href="8" class="var-click"><li>Massa Salarial x Valor Adicioando</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green4">
                    <span href="12" class="var-click"><li>Variação na Ocupação x Variação do Valor Adicionado</li></span>
                    <span href="11" class="var-click"><li>Custo Total x Salários Pagos</li></span>
                    <span href="10" class="var-click"><li>Concentração do Emprego Cultural</li></span>
                    <span href="13" class="var-click"><li>Concentração da Massa Salarial</li></span>
                    <span href="13" class="var-click"><li>IHH de Número de Trabalhadores</li></span>
                    <span href="13" class="var-click"><li>IHH da Massa de Rendimentos</li></span>
                </ul>
            </div>

        </div>
        <?php
    }
    else  if(isset($_GET['comercio'])) {
        ?><div class="row">
        <div class="col-md-12">


            <a href="index.php<?php if(isset($dark)) echo "?dark=1";?>" class="img-link"><div class="logo-min"></div></a>

            <p class="title">Comércio Internacional</p>

        </div>
        </div>
        <div class="row var-list-line">

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green1">
                    <span href="1" class="var-click"><li>Total de Trabalhadores</li></span>
                    <span href="2" class="var-click"><li>Participação da Cultura no Emprego</li></span>
                    <span href="3" class="var-click"><li>Horas trabalhadas na cultura</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green2">
                    <span href="4" class="var-click"><li>Remuneração média</li></span>
                    <span href="5" class="var-click"><li>Remuneração x Hora Trabalhada</li></span>
                    <span href="6" class="var-click"><li>Jornada de Trabalho</li></span>
                    <span href="7" class="var-click"><li>Massa Salarial Cultural</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green3">
                    <span href="9" class="var-click"><li>Valor Adicionado por Trabalhador</li></span>
                    <span href="8" class="var-click"><li>Massa Salarial x Valor Adicioando</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green4">
                    <span href="12" class="var-click"><li>Variação na Ocupação x Variação do Valor Adicionado</li></span>
                    <span href="11" class="var-click"><li>Custo Total x Salários Pagos</li></span>
                    <span href="10" class="var-click"><li>Concentração do Emprego Cultural</li></span>
                    <span href="13" class="var-click"><li>Concentração da Massa Salarial</li></span>
                    <span href="13" class="var-click"><li>IHH de Número de Trabalhadores</li></span>
                    <span href="13" class="var-click"><li>IHH da Massa de Rendimentos</li></span>
                </ul>
            </div>

        </div>
        <?php
    }
?>