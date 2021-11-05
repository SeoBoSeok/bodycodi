<?php
// [
//  {"seqPartner":0,"seqPartnerBranch":0,"openTime":"08:00","closeTime":"22:00"}
// ]

$data = array(
  "seqPartner" => 0,
  "seqPartnerBranch" => 21697,
  "openTime" => "08:00",
  "closeTime" => "22:00",
);

$return = array();

$return["status"] = 200;
$return["data"] = $data;

echo json_encode($return);

?>