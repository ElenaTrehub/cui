<?php

$dir = "../settings/fonts/";

if($dir){
    $files = scandir($dir);
    $names=[];
    foreach ($files as $file){
        if($file != '.' && $file != '..'){
            $names[] = $file;
        }

    }

    echo json_encode($names);
}else{
    header("HTTP/1.0 400 Bad Request");
}