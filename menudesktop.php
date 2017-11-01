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
                <ul class="var-list green1">
                    <span href="4" class="var-click"><li>Receita total</li></span>
                    <span href="5" class="var-click"><li>Receita Líquida</li></span>
                    <span href="7" class="var-click"><li>Lucro</li></span>
                    <span href="6" class="var-click"><li>Custo</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green1">
                    <span href="9" class="var-click"><li>VA/PIB</li></span>
                    <span href="8" class="var-click"><li>Valor Adicionado (VA)</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green1">
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
        ?>
        <div class="row">
            <div class="col-md-12">


                <a href="index.php<?php if(isset($dark)) echo "?dark=1";?>" class="img-link"><div class="logo-min"></div></a>

                <p class="title">Mercado de Trabalho</p>

            </div>
        </div>
        <div class="row var-list-line">

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green1">
                    <span href="1" class="var-click"><li>Total de Trabalhadores</li></span>
                    <span href="2" class="var-click"><li>Participação no Emprego</li></span>
                    <span href="3" class="var-click"><li>Horas Trabalhadas</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green2">
                    <span href="4" class="var-click"><li>Remuneração média</li></span>
                    <span href="5" class="var-click"><li>Remuneração / Hora Trabalhada</li></span>
                    <span href="6" class="var-click"><li>Jornada de Trabalho</li></span>
                    <span href="7" class="var-click"><li>Massa Salarial</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green3">
                    <span href="8" class="var-click"><li>Valor Adicionado (VA)</li></span>
                    <span href="9" class="var-click"><li>Massa Salarial / VA</li></span>
                    <span href="10" class="var-click"><li>Ocupação / VA</li></span>
                    <span href="11" class="var-click"><li>Custo / Salários</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green4">
                    <span href="12" class="var-click"><li>Concentração do Emprego</li></span>
                    <span href="13" class="var-click"><li>Concentração da Massa Salarial</li></span>
                    <span href="14" class="var-click"><li>IHH de Número de Trabalhadores</li></span>
                    <span href="15" class="var-click"><li>IHH da Massa de Rendimentos</li></span>
                </ul>
            </div>

        </div>
        <?php
    }
    else  if(isset($_GET['politicas'])) {
        ?>
        <div class="row">
            <div class="col-md-12">


                <a href="index.php<?php if(isset($dark)) echo "?dark=1";?>" class="img-link"><div class="logo-min"></div></a>

                <p class="title">Políticas Públicas</p>

            </div>
        </div>
        <div class="row var-list-line">

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green1">
                    <span href="1" class="var-click"><li>Financiamento Público Total</li></span>
                    <span href="2" class="var-click"><li>Financiamento do Vale-Cultura</li></span>
                    <span href="3" class="var-click"><li>Financiamento do Fundo Cultural BNDES</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green2">
                    <span href="4" class="var-click"><li>Valor total de incentivos privados</li></span>
                    <span href="5" class="var-click"><li>Valor total de incentivos via empresas públicas</li></span>
                    <span href="6" class="var-click"><li>Despesa FNC / Mecenato</li></span>
                    <span href="7" class="var-click"><li>Recursos Privados / Incentivo Fiscal</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green3">
                    <span href="8" class="var-click"><li>Financiamento Público no VA</li></span>
                    <span href="9" class="var-click"><li>Total Bruto na Massa Salarial</li></span>
                    <span href="10" class="var-click"><li>Despesa em Cultura nas Contas Públicas</li></span>
                    <span href="11" class="var-click"><li>Total das propostas de projetos</li></span>
                    <span href="12" class="var-click"><li>Total dos projetos aprovados</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green4">
                    <span href="13" class="var-click"><li>Tempo médio de aprovação</li></span>
                    <span href="14" class="var-click"><li>Total Solicitado/ Efetivo Aprovado</li></span>
                    <span href="15" class="var-click"><li>Índice Razão para Concentração Regional dos Incentivadores</li></span>
                    <span href="16" class="var-click"><li>IHH para Concentração Regional dos Projetos Fomentados</li></span>
                </ul>
            </div>

        </div>
        <?php
    }
    else  if(isset($_GET['comercio'])) {
        ?>
        <div class="row">
            <div class="col-md-12">


                <a href="index.php<?php if(isset($dark)) echo "?dark=1";?>" class="img-link"><div class="logo-min"></div></a>

                <p class="title">Comércio Internacional</p>

            </div>
        </div>
        <div class="row var-list-line">

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green1">
                    <span href="1" class="var-click"><li>Valor Absoluto</li></span>
                    <span href="2" class="var-click"><li>Participação no PIB</li></span>
                    <span href="3" class="var-click"><li>Relação com o Comércio Global</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green2">
                    <span href="4" class="var-click"><li>Relação com o Comércio Exterior Brasileiro</li></span>
                    <span href="5" class="var-click"><li>Relação com o VA da Cultura</li></span>
                    <span href="6" class="var-click"><li>Relação com a Massa Salarial</li></span>
                    <span href="7" class="var-click"><li>Relação com Investimento Público em Cultura</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green3">
                    <span href="9" class="var-click"><li>Razão de Concentração (C2) do Valor Absoluto</li></span>
                    <span href="8" class="var-click"><li>Relação com o Comércio Exterior Cultural Brasileiro</li></span>
                </ul>
            </div>

            <div class="col-md-3 col-sm-6">
                <ul class="var-list green4">
                    <span href="10" class="var-click"><li>Razão de Concentração (C4) do Valor Absoluto</li></span>
                    <span href="11" class="var-click"><li>IHH do Valor Absoluto</li></span>
                    <span href="12" class="var-click"><li>IVCR do VA</li></span>
                </ul>
            </div>

        </div>
        <?php
    }
?>