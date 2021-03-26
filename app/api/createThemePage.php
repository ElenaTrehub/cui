<?php
session_start();

//if($_SESSION["auth"] != true){
//header("HTTP/1.0 403 Forbidden");
//die;
//}

$_POST = json_decode(file_get_contents("php://input"), true);

if(!is_dir('../userDir')) {
    mkdir('../userDir');
}
$newFile = "../userDir/theme.css";

if($_POST["name"]){
    $style = file_get_contents('../themes/'.$_POST["name"].'.css');
    if(file_get_contents($newFile)){
        file_put_contents($newFile, '');
    }
    file_put_contents($newFile, $style);
}else{
    header("HTTP/1.0 400 Bad Request");
}