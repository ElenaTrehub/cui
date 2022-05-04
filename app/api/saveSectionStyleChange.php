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
$file = "../userDir/example.css";


if ($_POST['section'] && $_POST['css']) {

    $sectionCss = $_POST['css'];

    $startIndex = stripos( file_get_contents($file), '/*'.$_POST['section'].'-start');
    $startEndIndex = stripos( file_get_contents($file), '/*'.$_POST['section'].'-end');

    $endIndex = $startEndIndex + 2 + strlen($_POST['section']) + 6;

    $length = $endIndex - $startIndex;

    $newCss = substr(file_get_contents($file), 0, $startIndex). $sectionCss. substr(file_get_contents($file), $endIndex);


    if (file_get_contents($file)) {
        file_put_contents($file, '');
    }

    file_put_contents($file, $newCss);


} else {
    header("HTTP/1.0 400 Bad Request");
}
