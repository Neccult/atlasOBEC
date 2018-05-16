
<?php

$uf     =   isset($_GET["uf"])    ?   $_GET["uf"]   :   0;	   /*== uf ==*/
$prt    =   isset($_GET["prt"])   ?   $_GET["prt"]  :   0;	   /*== porte ==*/
$atc    =   isset($_GET["atc"])   ?   $_GET["atc"]  :   0;	   /*== atuacao ==*/
$cad    =   isset($_GET["cad"])   ?   $_GET["cad"]  :   0;	   /*== ocupacao ==*/
$var    =   isset($_GET["var"])   ?   $_GET["var"]  :   0;	   /*== variavel ==*/
$ocp    =   isset($_GET["ocp"])   ?   $_GET["ocp"]  :   1;	   /*== ocupacao ==*/
$view   =   isset($_GET["view"])  ?   $_GET["view"] :   "mapa";	   /*== visualizacao ==*/
$eixo   =   isset($_GET["eixo"])  ?   $_GET["eixo"] :   "empreendimentos";	   /*== eixo ==*/
$sex    =   isset($_GET["sex"])   ?   $_GET["sex"]  :   0;	   /*== sexo ==*/
$fax    =   isset($_GET["fax"])   ?   $_GET["fax"]  :   0;	   /*== faixa etaria ==*/
$esc    =   isset($_GET["esc"])   ?   $_GET["esc"]  :   0;	   /*== escolaridade ==*/
$cor    =   isset($_GET["cor"])   ?   $_GET["cor"]  :   0;	   /*== cor e raça ==*/
$frm    =   isset($_GET["frm"])   ?   $_GET["frm"]  :   0;	   /*== formalidade ==*/
$prv    =   isset($_GET["prv"])   ?   $_GET["prv"]  :   0;	   /*== previdencia ==*/
$snd    =   isset($_GET["snd"])   ?   $_GET["snd"]  :   0;	   /*== sindical ==*/
$slc    =   isset($_GET["slc"])   ?   $_GET["slc"]  :   0;	   /*== Visualização ==*/
$deg    =   isset($_GET["deg"])   ?   $_GET["deg"]  :   0;	   /*== Desagregação ==*/
$mec    =   isset($_GET["mec"])   ?   $_GET["mec"]  :   0;	   /*== Mecanismo ==*/
$mod    =   isset($_GET["mod"])   ?   $_GET["mod"]  :   0;	   /*== Modalidade ==*/
$pfj    =   isset($_GET["pfj"])   ?   $_GET["pfj"]  :   0;	   /*== Tipo de pessoa ==*/
$uos    =   isset($_GET["uos"])   ?   $_GET["uos"]  :   0;	   /*== UF ou Setor ==*/
$prc    =   isset($_GET["prc"])   ?   $_GET["prc"]  :   0;	   /*== Parceiro ==*/
$typ    =   isset($_GET["typ"])   ?   $_GET["typ"]  :   1;	   /*== Tipo de atividade ==*/

/* informações JSON */
$json = file_get_contents('data/pt-br.json');
$json_text = json_decode($json, true);

$select = $json_text['select'];			   /*== informação dos selects ==*/
/*
    busca a view do gráfico,
    se esta não existir busca a
    primeira declarada no json
*/
$eixo_num = 0;

if(isset($_GET['empreendimentos'])) {
    $eixo_num = 0;
}
else  if(isset($_GET['mercado'])) {
    $eixo_num = 1;

}

else  if(isset($_GET['politicas'])) {
    $eixo_num = 2;

}
else  if(isset($_GET['comercio'])) {
    $eixo_num = 3;

}

switch($eixo) {
    case "empreendimento":
        $eixo_num = 0;
        break;
    case "mercado":
        $eixo_num = 1;
        break;
    case "politicas":
        $eixo_num = 2;
        break;
    case "comercio":
        $eixo_num = 3;
}

?>
        <div class="w3-sidebar w3-bar-block w3-dark-grey w3-animate-left" aberto="0" style="display:none" id="mySidebar">
            <button class="fechar w3-bar-item w3-button w3-large" onclick="w3_close()">Fechar &times;</button>


            <div class="rotulo-bread w3-bar-item">Eixo</div>

            <select class="w3-bar-item bread-select" data-id="eixo">
                <?php
                foreach ($json_text['select']['eixo'] as $bread_eixo) {

                    echo "<option value='" . $bread_eixo['value'] . "'>" . $bread_eixo['name'] . "</option>";

                }
                ?>
            </select>

            <div class="rotulo-bread w3-bar-item">Variável</div>


            <select class="w3-bar-item bread-select bread-select-var" data-id="var">
                <?php
                foreach ($json_text['var'][$eixo_num] as $variavel) {
                    echo "<option value='" . $variavel['id'] . "'>" . $variavel['title'] . "</option>";
                }
                ?>
            </select>


            <?php if($eixo_num == 3) {?>

                <div class="rotulo-bread w3-bar-item">Parceiro</div>

            <select class="bread-select" id="bread-select-prc" data-id="prc">
                <?php
                foreach ($json_text['select']['prc'] as $option) {
                    echo "<option value='" . $option['value'] . "'>" . $option['name'] . "</option>";
                }
                ?>
            </select>


            <?php } ?>

            <div class="rotulo-bread w3-bar-item">UF</div>


            <select class="bread-select bread-uf" data-id="uf">
                <?php
                foreach ($json_text['select']['uf'] as $bread_uf) {
                    echo "<option value='" . $bread_uf['value'] . "'>" . $bread_uf['name'] . "</option>";
                }
                ?>
            </select>

            <div class="rotulo-bread w3-bar-item">Ano</div>


            <select class="bread-select" data-id="ano">
                <?php
                foreach ($json_text['select']['ano'] as $option) {
                    echo "<option value='" . $option['value'] . "'>" . $option['name'] . "</option>";
                }
                ?>
            </select>

            <div class="rotulo-bread w3-bar-item">Setor</div>

            <select class="bread-select" id="bread-select-cad" data-id="cad">
                <?php
                foreach ($json_text['select']['cad'] as $bread_cad) {
                    echo "<option value='" . $bread_cad['value'] . "'>" . $bread_cad['name'] . "</option>";
                }
                ?>
            </select>

            <?php if($eixo_num == 0){?>

            <div class="rotulo-bread w3-bar-item">Desagregação</div>

            <select class="bread-select" id="bread-select-deg   " data-id="deg">
                <option value="0">Escolher</option>

                <?php foreach ($select['deg'] as $option): ?>

                    <?php if($option['value'] >= 9 && $option['value'] <= 12):?>
                        <option value="<?php echo $option['value'] ?>"><?php echo $option['name'] ?></option>
                    <?php endif; ?>
                <?php endforeach; ?>
            </select>

            <?php } ?>

            <?php if($eixo_num == 1){?>

            <div class="rotulo-bread w3-bar-item">Desagregação</div>


            <select class="bread-select" id="bread-select-deg" data-id="deg">
                <option value="0">Escolher</option>

                <?php foreach ($select['deg'] as $option): ?>
                    <?php if($option['value'] >= 1 && $option['value'] <= 4):?>
                        <optgroup value="<?php echo $option['value'] ?>" label="<?php echo $option['name'] ?>">
                            <?php foreach ($option['desags'] as $key=>$desag): ?>
                                <option value="<?php echo $key+1 ?>"><?php echo $desag ?></option>
                            <?php endforeach; ?>
                        </optgroup>
                    <?php endif; ?>
                <?php endforeach; ?>
            </select>

            <?php } ?>

            <?php if($eixo_num == 2){?>

                <div class="rotulo-bread w3-bar-item">Mecanismo</div>


                <select class="bread-select" id="bread-select-mec" data-id="mec">
                        <option value="0">Todos</option>

                        <?php foreach ($select['mec'] as $option): ?>

                            <?php if($option['value'] >= 1 && $option['value'] <= 2):?>
                                <option value="<?php echo $option['value'] ?>"><?php echo $option['name'] ?></option>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </select>

                <div class="rotulo-bread w3-bar-item">Modalidade</div>

                <select class="bread-select" id="bread-select-mod" data-id="mod">
                        <option value="0">Todos</option>

                        <?php foreach ($select['mod'] as $option): ?>

                            <?php if($option['value'] >= 1 && $option['value'] <= 2):?>
                                <option value="<?php echo $option['value'] ?>"><?php echo $option['name'] ?></option>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </select>

                <div class="rotulo-bread w3-bar-item">Pessoa</div>

                <select class="bread-select" id="bread-select-mec" data-id="pfj">
                        <option value="0">Todos</option>

                        <?php foreach ($select['pfj'] as $option): ?>

                            <?php if($option['value'] >= 1 && $option['value'] <= 2):?>
                                <option value="<?php echo $option['value'] ?>"><?php echo $option['name'] ?></option>
                            <?php endif; ?>
                        <?php endforeach; ?>
                    </select>

            <?php } ?>

            <?php if($eixo_num == 3){?>

                <div class="rotulo-bread w3-bar-item">Tipo</div>


                <select class="bread-select" id="bread-select-typ" data-id="typ">

                <?php foreach ($select['typ'] as $option): ?>

                    <?php if($option['value'] >= 1 && $option['value'] <= 4):?>
                        <option value="<?php echo $option['value'] ?>"><?php echo $option['name'] ?></option>
                    <?php endif; ?>
                <?php endforeach; ?>
            </select>

            <?php } ?>

        </div>



        <div class="header" id="barra-menu">
             <button class="w3-button w3-white w3-xxlarge" onclick="hamburguer_click()">&#9776; </button><span class="menu-title">Menu</span>
        </div>

        <div id="menu-mob-eixo" style="display: none">
            <div class="eixo-mob" id="empreendimentos"><img id="empreendimentos" src="./images/empreendimentos-icon.png"></div>
            <div class="eixo-mob" id="mercado"><img id="mercado" src="./images/mercado-icon.png"></div>
            <div class="eixo-mob" id="politicas"><img id="politicas" src="./images/politicas-icon.png"></div>
            <div class="eixo-mob" id="comercio"><img id="comercio" src="./images/comercio-icon.png"></div>
        </div>

        <script>

            $(function() {
                $(".bread-select[data-id='eixo']").val(window.location.hash.substring(1));
            });

            $('#containerDesc').css("height", "auto");
            $('#containerDesc').css("top", "0");
            $('#containerDados').css("height", "500px");
            $('#containerTree').css("height", "500px");
            $('#containerTree').css("top", "0");
            $('#containerDownload').css("display", "block");
            $('#containerDownload').css("top", "0");
            $('#containerDownload').find("row").css("padding-left", "0");

            div1 = $('#containerMapa');
            div2 = $('#containerDesc');

            tdiv1 = div1.clone();
            tdiv2 = div2.clone();

            if(!div2.is(':empty')){
                div1.replaceWith(tdiv2);
                div2.replaceWith(tdiv1);

                tdiv1.addClass("replaced");
            }

            div1 = $('#containerBarra');
            div2 = $('#containerMapa');

            tdiv1 = div1.clone();
            tdiv2 = div2.clone();

            if(!div2.is(':empty')){
                div1.replaceWith(tdiv2);
                div2.replaceWith(tdiv1);

                tdiv1.addClass("replaced");
            }

            function hamburguer_click() {

                if($("#mySidebar").attr("aberto") == 1){
                    w3_close();

                }
                else{
                    w3_open();
                }

            }

            $("#view-boxes").on('click', function(){
                if($("#mySidebar").attr("aberto") == 1)
                    w3_close();
                });


            function w3_open() {

                document.getElementById("mySidebar").style.display = "block";
                $("#mySidebar").attr("aberto", 1);

            }
            function w3_close() {
                document.getElementById("mySidebar").style.display = "none";
                $("#mySidebar").attr("aberto", 0);

            }

            if(window.parent.innerWidth <= 1199)
                $("#barra-menu").css("display", "none");

            window.parent.onscroll = function() {myFunction()};



            var menu = document.getElementById("barra-menu");
            var sticky = menu.offsetTop;

            function myFunction() {

                // console.log(window.parent.pageYOffset)
                if (window.parent.pageYOffset  >= window.parent.document.getElementById("section0").offsetHeight) {
                    // $("#barra-menu").css("top", window.parent.pageYOffset - $(window.parent).height())
                   // menu.classList.add("sticky");
                } else {
                    //menu.classList.remove("sticky");
                }
            }

            $(document).on('click', ".eixo-mob", function(e){
                parent.window.location = "page.php#"+$(this).attr("id");
            });



        </script>
