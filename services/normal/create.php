<?php
include_once('../../common.php');

$data = json_decode(file_get_contents('php://input'), true);
// var_dump($data);

// $data_class = new stdClass;
// $data_class = json_decode(file_get_contents('php://input'));
// var_dump($data_class);
// echo ($data_class->saleYn)."\r\n";

$optionType = $data["optionType"]; 
$saleYn = $data["saleYn"];
$seqPlace = $data["seqPlace"] ? $data["seqPlace"] : 0;
$seqServiceGenre = $data["seqServiceGenre"];
$serviceDesc = $data["serviceDesc"];
$serviceKind = $data["serviceKind"];
$serviceName = $data["serviceName"];
$serviceTime = $data["serviceTime"];
$serviceType = $data["serviceType"];

if (true) {
  $sql = "
    INSERT INTO services 
    set optionType = '$optionType',
    saleYn = '$saleYn',
    seqPlace = '$seqPlace',
    seqServiceGenre = $seqServiceGenre,
    serviceDesc = '$serviceDesc',
    serviceKind = '$serviceKind',
    serviceName = '$serviceName',
    serviceTime = '$serviceTime',
    serviceType = '$serviceType' ;
  ";

  sql_query($sql);

  $service_id = sql_insert_id();

  if ($service_id) {
    $sql_select = "
      SELECT * FROM services WHERE seqService = '$service_id'
    ";

    $result = sql_fetch($sql_select);

    echo json_encode($result);

  } else {
    echo json_encode(array('msg', 'failed'));
  }

}