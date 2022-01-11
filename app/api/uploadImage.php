<?php
//session_start();

//if($_SESSION["auth"] != true){
    //header("HTTP/1.0 403 Forbidden");
    //die;
//}

if(file_exists($_FILES["image"]["tmp_name"]) && is_uploaded_file($_FILES["image"]["tmp_name"])){

    //$fileExt = explode("/", $_FILES["image"]["type"])[1];
    $fileExt = $_FILES["image"]["name"];
    $fileName = $fileExt;

    if(!is_dir("../userDir/images/")){
        mkdir("../userDir/images/");
    }

    if(!file_exists("../userDir/images/" . $fileName)){
        move_uploaded_file($_FILES["image"]["tmp_name"], "../userDir/images/" . $fileName);
    }


    $response = json_encode($fileName);
    echo $response;
}