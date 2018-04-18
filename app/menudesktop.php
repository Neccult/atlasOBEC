<!--=== lista de variáveis ===-->
<?php
$empreendimentosClass = (isset($_GET['empreendimentos'])) ? 'ativo' : '';
$mercadoClass = (isset($_GET['mercado'])) ? 'ativo' : '';
$politicasClass = (isset($_GET['politicas'])) ? 'ativo' : '';
$comercioClass = (isset($_GET['comercio'])) ? 'ativo' : '';
?>
    <ul class="menu-painel">
	<li class="empreendimentos <?php echo $empreendimentosClass; ?>">
            <a href="page.php#empreendimentos">
		Empreendimentos culturais
	    </a>
	</li>
	<li class="mercado <?php echo $mercadoClass; ?>">
	    <a href="page.php#mercado">
		Mercado de trabalho
	    </a>
	</li>   
	<li class="politica <?php echo $politicasClass; ?>">
	    <a href="page.php#politicas">
		Pol&iacute;ticas p&uacute;blicas
	    </a>
	</li>
	<li class="comercio <?php echo $comercioClass; ?>">
	    <a href="page.php#comercio">
		Com&eacute;rcio internacional
	    </a>
	</li>
</ul>
