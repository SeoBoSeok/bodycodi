<?php

$data = array();

array_push($data, array(
  "seqCoachSchedule" => "0",
  "seqPartner" => "0",
  "seqPartnerBranch" => "0",
  "seqCoach" => "0",
  "weekIdx" => "0",
  "closeDay" => "0",
));

$return = array();

$return["status"] = 200;
$return["data"] = $data;

echo json_encode(array(
  "seqCoachSchedule" => 0,
  "seqPartner" => 0,
  "seqPartnerBranch" => 0,
  "seqCoach" => 0,
  "weekIdx" => 0,
  "closeDay" => "0",
  "offCount" => 0
));

?>