<?php
// $path = "./entrance-member.json";
// $temp_files = scandir($path);
$string = file_get_contents("./entrance-member.json");
$data = json_decode($string, true);

array_push($data, array(
  "verify_yn" => "Y",
  "handle_key" => "",
  "reg_dt" => 1598995846000,
  "phone" => "010-6711-8282"
));

$return = array();

$return["status"] = 200;
$return["senderList"] = $data;

echo json_encode($data);