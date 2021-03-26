<?php

$newFile = "../userDir/style.css";

if($newFile){
    $style = file_get_contents($newFile);
    echo json_encode($style);
}else{
    header("HTTP/1.0 400 Bad Request");
}