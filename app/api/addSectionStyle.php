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
$file = "../userDir/style.css";


if ($_POST['css']) {

    $sectionCss = $_POST['css'];

    $newCss = file_get_contents($file).$sectionCss;


    if (file_get_contents($file)) {
        file_put_contents($file, '');
    }

    file_put_contents($file, $newCss);


} else {
    header("HTTP/1.0 400 Bad Request");
}
