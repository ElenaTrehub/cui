<?php
//session_start();

//if($_SESSION["auth"] != true){
//header("HTTP/1.0 403 Forbidden");
//die;
//}

//$_POST = json_decode(file_get_contents("php://input"), true);

if(!is_dir('../userDir')) {
    mkdir('../userDir');
}

$newFile = "../userDir/style.css";
$newExampleFile = "../userDir/example.css";

$styleStr = file_get_contents($newExampleFile);
file_put_contents($newFile, '');
if($styleStr){
    file_put_contents($newFile, $styleStr);

}else{
    header("HTTP/1.0 400 Bad Request");
}
