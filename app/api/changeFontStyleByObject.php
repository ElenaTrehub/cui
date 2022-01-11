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
$file = "../userDir/fontStyle.css";

if($_POST['styleObj']){
    $style = '.h1{font-family:"'.$_POST['styleObj']['h1Type'].'"; font-size:'.$_POST["styleObj"]['h1Size'].';}
    .h2{font-family:"'.$_POST['styleObj']['h2Type'].'"; font-size:'.$_POST["styleObj"]['h2Size'].';}
    .h3{font-family:"'.$_POST['styleObj']['h3Type'].'"; font-size:'.$_POST["styleObj"]['h3Size'].';}
    .h4{font-family:"'.$_POST['styleObj']['h4Type'].'"; font-size:'.$_POST["styleObj"]['h4Size'].';}
    .textSize{font-family:"'.$_POST['styleObj']['textType'].'"; font-size:'.$_POST["styleObj"]['textSize'].';}
    .linkSize{font-family:"'.$_POST['styleObj']['linkType'].'"; font-size:'.$_POST["styleObj"]['linkSize'].';}
    .bigSize{font-family:"'.$_POST['styleObj']['bigType'].'"; font-size:'.$_POST["styleObj"]['bigSize'].';}';


    if(file_get_contents($file)){
        file_put_contents($file, '');
    }

    file_put_contents($file, $style);



}else{
    header("HTTP/1.0 400 Bad Request");
}
