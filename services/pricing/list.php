<?php

include_once('../../common.php');

$sql = " SELECT * FROM service_price ";
$result = sql_query($sql);

// print_r($result);

$response = array();

for($i = 0; $row=sql_fetch_array($result); $i++) {
  $response[$i] = $row;
  // $response[$i]["place"] = array(
  //   'seqPartnerSpace' => 2116,
  //   'seqPartner' => 774,
  //   'spaceNumber' => 100,
  //   'useYn' => "Y"
  // )
  $sql_for_details = " SELECT * FROM service_details WHERE seqService = '{$row['seqService']}' ";
  $sql_details_result = sql_fetch_array(sql_query($sql_for_details));

  $sql_for_serviceInfo = " SELECT * FROM services WHERE seqService = '{$row['seqService']}' ";
  $sql_serviceInfo = sql_fetch($sql_for_serviceInfo);

  if (count($sql_details_result)) {
    $sql_details_result['serviceInfo'] = $sql_serviceInfo;
    $response[$i]['details'] = array($sql_details_result);
  } else {
    $response[$i]['details'] = array();
  }

}

echo json_encode($response);
// echo json_encode(json_decode(file_get_contents('list.json'), true));

// echo json_encode(json_decode(file_get_contents('list.json'), true));