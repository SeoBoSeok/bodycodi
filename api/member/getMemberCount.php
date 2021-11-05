<?php
// {
//   bpayMemberDtoList: null,
//   totalMemberCount: 30,
//   readyMemberCount: 0,
//   approvedMemberCount: 30
// }

$data = array(
  "bpayMemberDtoList" => null,
  "totalMemberCount" => 30,
  "readyMemberCount" => 0,
  "approvedMemberCount" => 30
);

$return = array();

$return["status"] = 200;
$return["data"] = $data;

echo json_encode($return);

?>
