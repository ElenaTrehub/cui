<?php

$file = "../settings/fontStyle.css";

if($file){
    $content = file_get_contents($file);

    $obj = new \stdClass();
    $array = explode('}', $content);

    for ($i=0; $i<=count($array); $i++){
        //$end = strpos('{', $array);
        //$field = substr($item, 1, $end);
        $str = explode(':', $array[$i]);

        if($i === 0){
            $obj->mainHeadingFont = substr(trim($str[1]), 1, strlen(trim($str[1]))-15);
            $obj->mainHeadingSize = substr(trim($str[2]), 0, strlen(trim($str[2]))-1);
        }

        else if($i === 1){
            $obj->secondHeadingFont = substr(trim($str[1]), 1, strlen(trim($str[1]))-15);
            $obj->secondHeadingSize = substr(trim($str[2]), 0, strlen(trim($str[2]))-1);
        }
        else if($i === 2){
            $obj->textFont = substr(trim($str[1]), 1, strlen(trim($str[1]))-15);
            $obj->textSize = substr(trim($str[2]), 0, strlen(trim($str[2]))-1);
        }
        else if($i === 3){
            $obj->menuFont = substr(trim($str[1]), 1, strlen(trim($str[1]))-15);
            $obj->menuSize = substr(trim($str[2]), 0, strlen(trim($str[2]))-1);
        }


    }

    echo json_encode($obj);
}else{
    header("HTTP/1.0 400 Bad Request");
}