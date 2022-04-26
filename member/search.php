<?php
include_once("../common.php");

// init
$_result = array(
  "draw" => 1,
  "recordsTotal" => 2191,
  "recordsFiltered" => 78,
  "length" => 25,
  "data" => array(),
  "error" => false
);

// get member info
$_member_info = "";

$sql_member = " SELECT * FROM g5_member ";

$result_member = sql_query($sql_member);

for($i=0; $m_data=sql_fetch_array($result_member); $i++) {

  $_member_info = $m_data;
  // service list
  $_service_list = array();
  
  $sql_service = " SELECT * FROM service_list WHERE seqMember = '{$member['mb_id']}' ";
  // echo $sql_service;
  
  $result_service = sql_query($sql_service);
  for($i=0; $row=sql_fetch_array($result_service); $i++) {
    array_push($_service_list, $row);
  }
  
  $_member_info["serviceList"] = ($_service_list);
  // print_r(json_encode($_member_info));
  // print_r($result_service)
  $_member_info["seqMember"] = $m_data["mb_no"];
  $_member_info["name"] = $m_data["mb_name"];
  $_member_info["sex"] = "M";
  $_member_info["birthday"] = "2021-09-11T01:00:00+09:00";
  $_member_info["age"] = 1;
  $_member_info["mobile"] = $result["mb_hp"];
  $_member_info["point"] = 44560;
  $_member_info["membershipNo"] = "9804";
  $_member_info["firstPaymentDate"] = "2021-09-11T00:00:00+09:00";
  $_member_info["latestPaymentDate"] = "2022-03-03T00:00:00+09:00";
  $_member_info["endDate"] = "2024-11-19T00:00:00+09:00";
  $_member_info["remaining"] = 276;
  $_member_info["visitDate"] = "2022-02-26T16:00:00+09:00";
  $_member_info["visitCount"] = 16;
  $_member_info["smsAgreeYn"] = "Y";
  $_member_info["seqPartnerCoach"] = 0;
  $_member_info["coachName"] = null;
  $_member_info["groupNames"] = null;
  $_member_info["branchName"] = null;
  $_member_info["safeCheckinFlag"] = null;
  $_member_info["lockerList"] = [];  
  
  array_push($_result["data"], $_member_info);

}


echo (json_encode($_result));

// echo json_encode(json_decode(file_get_contents("search.json"), true));