<?php
header('charset=utf-8');

require_once("EixoUm.php");

if (!empty($_GET["var"])) {

	$var = $_GET["var"];
	$uf = $_GET["uf"];

	$atc = $_GET["atc"];
	$cad = $_GET["cad"];
	$prt = $_GET["prt"];
    $ocp = $_GET["ocp"];

	$anos = $_GET["ano"];
}
else{
	$var = 1;
	$uf = 0;
	
	$atc = 0;
	$cad = 0;
	$prt = 0;
	$ocp = 0;

	$anos = 2014;
}


$teste = EixoUm::all();
var_dump($teste);

// $con = mysqli_connect("143.54.231.143","root","root","Atlas", "3306");

// // Check connection
// if (mysqli_connect_errno())
//   {
//   echo "Failed to connect to MySQL: " . mysqli_connect_error();
//   }



?>