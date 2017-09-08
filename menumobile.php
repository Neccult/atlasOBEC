<?php
    if(isset($_GET['empreendimentos'])) {
        ?>
        <div class="row">
            <div class="col-md-12">


                <a href="index.php<?php if(isset($dark)) echo "?dark=1";?>" class="img-link"><div class="logo-min"></div></a>

                <p class="title">Empreendimentos Culturais</p>

            </div>
        </div>
        <select class="menu-select">
            <option value="2">Peso das Empresas</option>
            <option value="1">Total de Empresas</option>
            <option value="3">Natalidade e Mortalidade</option>
            <option value="6">Custo</option>
            <option value="7">Lucro</option>
            <option value="5">Receita Líquida</option>
            <option value="4">Receita Total</option>
            <option value="8">Valor Adicionado (VA)</option>
            <option value="9">VA PIB</option>
            <option value="11">IHH VA</option>
            <option value="10">IHH Empresas</option>
            <option value="13">C4 VA</option>
            <option value="12">C4 Empresas</option>
        </select>
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
        <select class="menu-select">
            <option value="1">Total de Trabalhadores</option>
            <option value="2">Participação no Emprego</option>
            <option value="3">Horas Trabalhadas</option>
            <option value="4">Remuneração média</option>
            <option value="5">Remuneração / Hora Trabalhada</option>
            <option value="6">Jornada de Trabalho</option>
            <option value="7">Massa Salarial</option>
            <option value="8">Valor Adicionado (VA)</option>
            <option value="9">Massa Salarial / VA</option>
            <option value="10">Ocupação / VA</option>
            <option value="11">Custo / Salários</option>
            <option value="12">Concentração do Emprego</option>
            <option value="13">Concentração da Massa Salarial</option>
            <option value="14">IHH de Número de Trabalhadores</option>
            <option value="15">IHH da Massa de Rendimentos</option>
        </select>
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
        <select class="menu-select">
            <option value="1">Financiamento Público Total</option>
            <option value="2">Financiamento do Vale-Cultura</option>
            <option value="3">Financiamento do Fundo Cultural BNDES</option>
            <option value="4">Valor total de incentivos privados</option>
            <option value="5">Valor total de incentivos via empresas públicas</option>
            <option value="6">Despesa FNC / Mecenato</option>
            <option value="7">Recursos Privados / Incentivo Fiscal</option>
            <option value="8">Financiamento Público no VA</option>
            <option value="9">Total Bruto na Massa Salarial</option>
            <option value="10">Despesa em Cultura nas Contas Públicas</option>
            <option value="11">Total das propostas de projetos</option>
            <option value="12">Total dos projetos aprovados</option>
            <option value="13">Tempo médio de aprovação</option>
            <option value="14">Total Solicitado/ Efetivo Aprovado</option>
            <option value="15">Índice Razão para Concentração Regional dos Incentivadores</option>
            <option value="16">IHH para Concentração Regional dos Projetos Fomentados</option>
        </select>
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
        <select class="menu-select">
            <option value="1">Valor Absoluto</option>
            <option value="2">Participação no PIB</option>
            <option value="3">Relação com o Comércio Global</option>
            <option value="4">Relação com o Comércio Exterior Brasileiro</option>
            <option value="5">Relação com o VA da Cultura</option>
            <option value="6">Relação com a Massa Salarial</option>
            <option value="7">Relação com Investimento Público em Cultura</option>
            <option value="8">Razão de Concentração (C2) do Valor Absoluto</option>
            <option value="9">Relação com o Comércio Exterior Cultural Brasileiro</option>
            <option value="10">Razão de Concentração (C4) do Valor Absoluto</option>
            <option value="11">IHH do Valor Absoluto</option>
            <option value="12">IVCR do VA</option>
        </select>
        <?php
    }
?>