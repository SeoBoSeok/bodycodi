<?php
include_once("../common.php");

// 요청이 들어음
// 누가 요청했는지
// id => DB에 검색
// 정보를 확인
// 로그인 페이지로 보내고

// 마이페이지로 보내달

/// 메인페이지
// 메뉴
// 컨텐츠
// footer

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
$_member_id = $_GET['data'];

$sql_member = " SELECT * FROM g5_member WHERE mb_no = '$_member_id' ";

$result_member = sql_query($sql_member);

for($i=0; $m_data=sql_fetch_array($result_member); $i++) {

  $_member_info = $m_data;
  // service list
  $_service_list = array();
  
  $sql_service = " SELECT * FROM service_list ";
  
  $result_service = sql_query($sql_service);
  for($i=0; $row=sql_fetch_array($result_service); $i++) {
    array_push($_service_list, $row);
  }
  
  $_member_info["serviceList"] = ($_service_list);
  // print_r(json_encode($_member_info));
  // print_r($result_service)
  $_member_info["seqMember"] = $m_data["mb_no"];
  $_member_info["memberName"] = $m_data["mb_name"];
  $_member_info["sex"] = "M";
  $_member_info["birthday"] = $m_data["mb_birth"];
  $_member_info["age"] = 1;
  $_member_info["mobile"] = $m_data["mb_hp"];
  $_member_info["point"] = 44560;
  $_member_info["membershipNo"] = $m_data["membershipNo"];
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
  $_member_info["address"] = "경기도 가평군 가평읍 광장로22번길 27-9 (골드빌A)";  
  
  array_push($_result["data"], $_member_info);

}


echo (json_encode($_member_info));

// echo json_encode(json_decode(file_get_contents("search.json"), true));

// https://crm.bodycodi.com/member/1584986/summary (좌측 개인 Profile)
// https://crm.bodycodi.com/member/1584986/booking/reservation?count=10 (최근 예약 수업 내역)
// https://crm.bodycodi.com/member/1584986/pass/list (유효 이용권 목록)
// https://crm.bodycodi.com/member/1584986/booking/entrance?count=10 (최근 출석/결설 내역)
// https://crm.bodycodi.com/member/1584986/paymentInfo/list (최근 결제 내역)

// echo json_encode(json_decode(file_get_contents("summary.json", true)));
?>