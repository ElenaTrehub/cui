<?php
//session_start();

//if($_SESSION["auth"] != true){
//header("HTTP/1.0 403 Forbidden");
//die;
//}

if(!is_dir('../userDir')) {
    mkdir('../userDir');
}
$_POST = json_decode(file_get_contents("php://input"), true);
//echo $_POST;
$newFile = "../userDir/main.js";
file_put_contents($newFile, '');
if($_POST["js"]){
    file_put_contents($newFile, $_POST["js"]);
}else{
    header("HTTP/1.0 400 Bad Request");
}
