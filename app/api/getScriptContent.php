<?php
$newFile = "../userDir/main.js";

if($newFile){
    $script = file_get_contents($newFile);
    echo json_encode($script);
}else{
    header("HTTP/1.0 400 Bad Request");
}