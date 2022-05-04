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
$file = "../userDir/example.js";


if ($_POST['section'] && $_POST['js']) {

    $sectionJs = $_POST['js'];

    $startIndex = stripos( file_get_contents($file), '/*'.$_POST['section'].'-start');
    $startEndIndex = stripos( file_get_contents($file), '/*'.$_POST['section'].'-end');

    $endIndex = $startEndIndex + 2 + strlen($_POST['section']) + 6;

    $length = $endIndex - $startIndex;

    $newJs = substr(file_get_contents($file), 0, $startIndex). '/*'.$_POST['section'].'-start*/'. $sectionJs. '/*'.$_POST['section'].'-end*/'. substr(file_get_contents($file), $endIndex);


    if (file_get_contents($file)) {
        file_put_contents($file, '');
    }

    file_put_contents($file, $newJs);


} else {
    header("HTTP/1.0 400 Bad Request");
}

