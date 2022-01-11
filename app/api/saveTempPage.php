<?php
//session_start();

//if($_SESSION["auth"] != true){
    //header("HTTP/1.0 403 Forbidden");
    //die;
//}
$_POST = json_decode(file_get_contents("php://input"), true);
//echo $_POST;
//unset($_COOKIE['lk']);
//setcookie('lk', null, -1);
if(!is_dir('../userDir')) {
    mkdir('../userDir');
}

$newFile = '';

if($_POST["name"]){
    $name = lcfirst($_POST["name"]);

    $newFile = "../userDir/{$name}.html";
    file_put_contents($newFile, '');
}
else{
    header("HTTP/1.0 400 Bad Request");
}

if($_POST["html"]){
//    if(file_get_contents($newFile)){
//        file_put_contents($newFile, '');
//    }
    file_put_contents($newFile, $_POST["html"]);
}else{
    header("HTTP/1.0 400 Bad Request");
}
