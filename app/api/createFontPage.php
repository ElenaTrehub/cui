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
$newFile = "../userDir/fontStyle.css";
file_put_contents($newFile, '');
if($_POST["styleObj"]){

    if(file_get_contents($newFile)){
        file_put_contents($newFile, '');
    }
    $style = '.h1{font-size:'.$_POST["styleObj"]['h1Size'].';}.h2{font-size:'.$_POST["styleObj"]['h2Size'].';}.h3{font-size:'.$_POST["styleObj"]['h3Size'].';}.h4{font-size:'.$_POST["styleObj"]['h4Size'].';}
    .textSize{font-size:'.$_POST["styleObj"]['textSize'].';}.linkSize{font-size:'.$_POST["styleObj"]['linkSize'].';}.bigSize{font-size:'.$_POST["styleObj"]['bigSize'].';}';


    file_put_contents($newFile, $style);
}else{
    header("HTTP/1.0 400 Bad Request");
}