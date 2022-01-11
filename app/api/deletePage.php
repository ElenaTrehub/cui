<?php
//session_start();

//if($_SESSION["auth"] != true){
//header("HTTP/1.0 403 Forbidden");
//die;
//}
$_POST = json_decode(file_get_contents("php://input"), true);

if($_POST["name"]){
    $name = $_POST["name"];

    $deleteFile = "../userDir/{$name}";
    if($deleteFile){
        unlink($deleteFile);
    }
}
else{
    header("HTTP/1.0 400 Bad Request");
}



