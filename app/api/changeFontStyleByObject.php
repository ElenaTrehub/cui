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
$file = "../userDir/fontStyle.css";

if($_POST['fontStyle']){
    $style = '.mainHeading{font-family:"'.$_POST['fontStyle']['mainHeadingFont'].'";
  font-size:'.$_POST["fontStyle"]['mainHeadingSize'].';}.secondHeading{font-family:"'.$_POST["fontStyle"]['secondHeadingFont'].
        '";font-size:'.$_POST["fontStyle"]['secondHeadingSize'].';}.textFont{font-family:"'.$_POST["fontStyle"]['textFont'].
        '";font-size:'.$_POST["fontStyle"]['textSize'].';}.menuFont{font-family:"'.$_POST["fontStyle"]['menuFont'].
        '";font-size:'.$_POST["fontStyle"]['menuSize'].';}';
    if(file_get_contents($file)){
        file_put_contents($file, '');
    }

    file_put_contents($file, $style);



}else{
    header("HTTP/1.0 400 Bad Request");
}
