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

$newFile = '';

if($_POST["name"]){
    $name = $_POST["name"];

    $newFile = "../userDir/{$name}";
    if($_POST["content"]){
        file_put_contents($newFile, $_POST["content"]);
    }
    else{
        header("HTTP/1.0 400 Bad Request");
    }

}
else{
    header("HTTP/1.0 400 Bad Request");
}


