<?php
/**
 * Created by PhpStorm.
 * User: suporte
 * Date: 15/06/2018
 * Time: 10:25
 */

?>

<div class="bread-container">

    <div class="bread-caixa">
        <div class="opcao">
            <span class="rotulo-bread opt view">Eixo</span>
            <select class="bread-select bread-select-eixo" data-id="eixo">
                <?php
                foreach ($json_text['select']['eixo'] as $bread_eixo) {
                    if($bread_eixo['value'] === $eixo){
                        echo "<option value='". $bread_eixo['value'] ."' selected>" . $bread_eixo['name'] . "</option>";
                    }
                    else{
                        echo "<option value='" . $bread_eixo['value'] . "'>" . $bread_eixo['name'] . "</option>";
                    }
                }
                ?>
            </select>
        </div>
        <div class="bread-separator">/</div>
    </div>

    <div class="bread-caixa">

        <div class="opcao">
            <span class="rotulo-bread opt view">Variável</span>
            <select class="bread-select bread-select-var" data-id="var">
                <?php
                foreach ($json_text['var'][$eixo_num] as $variavel) {
                    echo "<option value='" . $variavel['id'] . "'>" . $variavel['title'] . "</option>";
                }
                ?>
            </select>
        </div>
    </div>

    <?php if($eixo == 'comercio') {?>

        <div class="bread-caixa">
            <div class="bread-separator">/</div>

            <div class="opcao">
                <span class="rotulo-bread opt view active">Parceiro</span>

                <select class="bread-select" id="bread-select-prc" data-id="prc">
                    <?php
                    foreach ($json_text['select']['prc'] as $option) {
                        echo "<option value='" . $option['value'] . "'>" . $option['name'] . "</option>";
                    }
                    ?>
                </select>

            </div>
        </div>

    <?php } ?>

    <div class="bread-caixa">
        <div class="bread-separator">/</div>

        <div class="opcao">
            <span class="rotulo-bread opt view">UF</span>

            <select class="bread-select bread-uf" data-id="uf">
                <?php
                foreach ($json_text['select']['uf'] as $bread_uf) {
                    echo "<option value='" . $bread_uf['value'] . "'>" . $bread_uf['name'] . "</option>";
                }
                ?>
            </select>

        </div>
    </div>

    <div class="bread-caixa">
        <div class="bread-separator">/</div>

        <div class="opcao">
            <span class="rotulo-bread opt view">Ano</span>

            <select class="bread-select" data-id="ano">
                <?php
                foreach ($json_text['select']['ano'] as $option) {
                    echo "<option value='" . $option['value'] . "'>" . $option['name'] . "</option>";
                }
                ?>
            </select>

        </div>
    </div>

    <div class="bread-caixa">
        <div class="bread-separator">/</div>

        <div class="opcao">
            <span class="rotulo-bread opt view">Setor</span>

            <select class="bread-select" id="bread-select-cad" data-id="cad">
                <?php
                foreach ($json_text['select']['cad'] as $bread_cad) {
                    echo "<option value='" . $bread_cad['value'] . "'>" . $bread_cad['name'] . "</option>";
                }
                ?>
            </select>

        </div>
    </div>

    <?php if($eixo == 'empreendimentos'){?>

        <div class="bread-caixa">
            <div class="bread-separator">/</div>

            <div class="opcao">
                <span class="rotulo-bread opt view">Desagregação</span>
                <select class="bread-select" id="bread-select-deg   " data-id="deg">
                    <option value="0">Escolher</option>

                    <?php foreach ($select['deg'] as $option): ?>

                        <?php if($option['value'] >= 9 && $option['value'] <= 12):?>
                            <option value="<?php echo $option['value'] ?>"><?php echo $option['name'] ?></option>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </select>

            </div>
        </div>

    <?php } ?>

    <?php if($eixo == 'mercado'){?>

        <div class="bread-caixa">
            <div class="bread-separator">/</div>

            <div class="opcao">
                <span class="rotulo-bread opt view">Desagregação</span>
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
            </div>
        </div>


    <?php } ?>

    <?php if($eixo == 'politicas'){?>

        <div class="bread-caixa">
            <div class="bread-separator">/</div>

            <div class="opcao">
                <span class="rotulo-bread opt view ">Mecanismo</span>
                <select class="bread-select" id="bread-select-mec" data-id="mec">
                    <option value="0">Todos</option>

                    <?php foreach ($select['mec'] as $option): ?>

                        <?php if($option['value'] >= 1 && $option['value'] <= 2):?>
                            <option value="<?php echo $option['value'] ?>"><?php echo $option['name'] ?></option>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </select>
            </div>
        </div>

        <div class="bread-caixa">
            <div class="bread-separator">/</div>

            <div class="opcao">
                <span class="rotulo-bread opt view active ">Modalidade</span>
                <select class="bread-select" id="bread-select-mod" data-id="mod">
                    <option value="0">Todos</option>

                    <?php foreach ($select['mod'] as $option): ?>

                        <?php if($option['value'] >= 1 && $option['value'] <= 2):?>
                            <option value="<?php echo $option['value'] ?>"><?php echo $option['name'] ?></option>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </select>
            </div>
        </div>

        <div class="bread-caixa">
            <div class="bread-separator">/</div>

            <div class="opcao">
                <span class="rotulo-bread opt view active ">Pessoa</span>
                <select class="bread-select" id="bread-select-mec" data-id="pfj">
                    <option value="0">Todos</option>

                    <?php foreach ($select['pfj'] as $option): ?>

                        <?php if($option['value'] >= 1 && $option['value'] <= 2):?>
                            <option value="<?php echo $option['value'] ?>"><?php echo $option['name'] ?></option>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </select>
            </div>
        </div>

    <?php } ?>

    <?php if($eixo == 'comercio'){?>

        <div class="bread-caixa">
            <div class="bread-separator">/</div>

            <div class="opcao">
                <span class="rotulo-bread opt view ">Tipo</span>
                <select class="bread-select" id="bread-select-typ" data-id="typ">

                    <?php foreach ($select['typ'] as $option): ?>

                        <?php if($option['value'] >= 1 && $option['value'] <= 4):?>
                            <option value="<?php echo $option['value'] ?>"><?php echo $option['name'] ?></option>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </select>
            </div>
        </div>

    <?php } ?>

</div>

