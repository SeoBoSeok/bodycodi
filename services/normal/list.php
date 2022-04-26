<?php

include_once('../../common.php');

$sql = " SELECT * FROM services ";
$result = sql_query($sql);

// print_r($result);

$response = array();

for($i = 0; $row=sql_fetch_array($result); $i++) {
  $response[$i] = $row;
  $response[$i]["place"] = array(
    'seqPartnerSpace' => 2116,
    'seqPartner' => 774,
    'spaceNumber' => 100,
    'useYn' => "Y"
  );
  // $response[$i]["place"] = array(
  //   'seqPartnerSpace' => 2116,
  //   'seqPartner' => 774,
  //   'spaceNumber' => 100,
  //   'useYn' => "Y"
  // )
}

echo json_encode($response);
// echo json_encode(json_decode(file_get_contents('list.json'), true));