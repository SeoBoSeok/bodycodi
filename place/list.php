<?php

$string = file_get_contents("./list.json");
$data = json_decode($string, true);

echo json_encode($data);