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
            $obj->mainHeadingFont = substr(trim($str[1]), 1, strlen(trim($str[1]))-1);
            $obj->mainHeadingSize = trim($str[2]);
        }

        else if($i === 1){
            $obj->secondHeadingFont = substr(trim($str[1]), 1, strlen(trim($str[1]))-1);
            $obj->secondHeadingSize = trim($str[2]);
        }
        else if($i === 2){
            $obj->textFont = substr(trim($str[1]), 1, strlen(trim($str[1]))-1);
            $obj->textSize = trim($str[2]);
        }
        else{
            $obj->menuFont = substr(trim($str[1]), 1, strlen(trim($str[1]))-1);
            $obj->menuSize = trim($str[2]);
        }


    }

    echo json_encode($obj);
}else{
    header("HTTP/1.0 400 Bad Request");
}