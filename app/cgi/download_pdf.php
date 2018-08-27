<?php 
    $file_type = $_POST['output_format'];
    $svg_box1  = $_POST['data'];
    $svg_box2  = $_POST['data_barras'];
    $svg_box3  = $_POST['data_scc'];

    $xmls = array();
    array_push($xmls, simplexml_load_string($svg_box1));
    array_push($xmls, simplexml_load_string($svg_box2));
    array_push($xmls, simplexml_load_string($svg_box3));

    $temp_nm1 = tempnam(sys_get_temp_dir(), 'svg');
    $temp_nm2 = tempnam(sys_get_temp_dir(), 'svg');
    $temp_nm3 = tempnam(sys_get_temp_dir(), 'svg');
    

    $temp_f1 = fopen($temp_nm1, 'w+') or die($php_errormsg);
    $temp_f2 = fopen($temp_nm2, 'w+') or die($php_errormsg);
    $temp_f3 = fopen($temp_nm3, 'w+') or die($php_errormsg);
    
    fwrite($temp_f1, $svg_box1);
    fwrite($temp_f2, $svg_box2);
    fwrite($temp_f3, $svg_box3);
    
    shell_exec('python svg.py '.$temp_nm1.' '.$temp_nm2.' '.$temp_nm3.' '.$xmls[0]['width'].' '.$xmls[1]['width'].' '.$xmls[2]['width']);
    
    fclose($temp_f1) or die($php_errormsg);
    fclose($temp_f2) or die($php_errormsg);
    fclose($temp_f3) or die($php_errormsg); 

    $file = '/tmp/visualizacoes.pdf';

    if (file_exists($file)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="'.basename($file).'"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file));
        readfile($file);
        exit;
    }

?>