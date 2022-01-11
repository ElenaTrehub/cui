<?php

//session_start();

//if($_SESSION["auth"] != true){
//header("HTTP/1.0 403 Forbidden");
//die;
//}

$_POST = json_decode(file_get_contents("php://input"), true);

if (!is_dir('../userDir')) {
    mkdir('../userDir');
}
$file = "../userDir/main.js";


if ($_POST['js']) {

    $sectionJs = $_POST['js'];

    //$startIndex = stripos( file_get_contents($file), '/*'.$_POST['section'].'-end');

    //$endIndex = $startEndIndex + 2 + strlen($_POST['section']) + 6;


    $newJs = substr(file_get_contents($file), 0, -5). $sectionJs. substr(file_get_contents($file), -5,5);
    //$newJs = file_get_contents($file).$sectionJs;


    if (file_get_contents($file)) {
        file_put_contents($file, '');
    }

    file_put_contents($file, $newJs);


} else {
    header("HTTP/1.0 400 Bad Request");
}


