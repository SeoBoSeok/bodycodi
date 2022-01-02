<?php

$string = file_get_contents("./index.json");
$data = json_decode($string, true);

echo json_encode($data);