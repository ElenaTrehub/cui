<?php
//session_start();

//if($_SESSION["auth"] != true){
//header("HTTP/1.0 403 Forbidden");
//die;
//}

$_POST = json_decode(file_get_contents("php://input"), true);

if(!is_dir('../userDir')) {
    mkdir('../userDir');
}

$newFile = "../userDir/style.css";
$newExampleFile = "../userDir/example.css";
file_put_contents($newFile, '');
file_put_contents($newExampleFile, '');
if($_POST["css"]){
    file_put_contents($newFile, $_POST["css"]);
    file_put_contents($newExampleFile, $_POST["css"]);
}else{
    header("HTTP/1.0 400 Bad Request");
}