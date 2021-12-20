<?php

// [
//   {
//     "end_date":"2021-10-25 12:50",
//     "off_day":"",
//     "off_time":"",
//     "seq_coach":"9817",
//     "coach_text":"(그룹수업) 리포머 5:1_8명",
//     "seq_temp":"C_4289546",
//     "text":"리포머 5:1 / 김반석_8명",
//     "start_date":"2021-10-25 12:00"
//   },
//   {"end_date":"2021-10-25 13:50","off_day":"","off_time":"","seq_coach":"9817","coach_text":"(그룹수업) 필라테스 고급 그룹레슨_4명","seq_temp":"C_4289570","text":"필라테스 고급 그룹레슨 / 김반석_4명","start_date":"2021-10-25 13:00"},
//   {"end_date":"2021-10-25 19:50","off_day":"","off_time":"","seq_coach":"9817","coach_text":"(그룹수업) 필라테스 L2그룹레슨_4명","seq_temp":"C_4289583","text":"필라테스 L2그룹레슨 / 김반석_4명","start_date":"2021-10-25 19:00"},
//   {"end_date":"2021-10-25 21:50","off_day":"","off_time":"","seq_coach":"9816","coach_text":"(그룹수업) 필라테스 고급 그룹레슨_4명","seq_temp":"C_4300871","text":"필라테스 고급 그룹레슨 / 홍준선_4명","start_date":"2021-10-25 21:00"},
//   {"end_date":"2021-10-25 13:50","off_day":"","off_time":"","seq_coach":"9816","coach_text":"(그룹수업) 필라테스 L2그룹레슨_4명","seq_temp":"C_4301258","text":"필라테스 L2그룹레슨 / 홍준선_4명","start_date":"2021-10-25 13:00"},
//   {"end_date":"2021-10-25 19:50","off_day":"","off_time":"","seq_coach":"9817","coach_text":"(그룹수업) 필라테스 L2그룹레슨_4명","seq_temp":"C_4301311","text":"필라테스 L2그룹레슨 / 김반석_4명","start_date":"2021-10-25 19:00"},
//   {"end_date":"2021-10-25 20:50","off_day":"","off_time":"","seq_coach":"17471","coach_text":"(그룹수업) 필라테스 고급 그룹레슨_4명","seq_temp":"C_4301335","text":"필라테스 고급 그룹레슨 / 이민주_4명","start_date":"2021-10-25 20:00"},
//   {"end_date":"2021-10-25 21:50","off_day":"","off_time":"","seq_coach":"9816","coach_text":"(그룹수업) 리포머 5:1_8명","seq_temp":"C_4301359","text":"리포머 5:1 / 홍준선_8명","start_date":"2021-10-25 21:00"},
//   {"end_date":"2021-10-25 16:50","off_day":"","off_time":"","seq_coach":"20031","coach_text":"대기 테스트_1명","seq_temp":"C_4339640","text":"대기 테스트 / 전라원_1명","start_date":"2021-10-25 16:00"},
//   {"end_date":"2021-10-25 11:00","off_day":"","off_time":"","seq_coach":"17122","coach_text":"(그룹수업) 캐딜락_6명","seq_temp":"C_4378272","text":"캐딜락 / 강동원_6명","start_date":"2021-10-25 09:00"},
//   {"end_date":"2021-10-25 19:50","off_day":"","off_time":"","seq_coach":"9806","coach_text":"(그룹수업) 그룹레슨_4명","seq_temp":"C_4414310","text":"그룹레슨 / 이석훈_4명","start_date":"2021-10-25 19:00"},
//   {"end_date":"2021-10-25 20:50","off_day":"","off_time":"","seq_coach":"9816","coach_text":"(그룹수업) 그룹레슨_4명","seq_temp":"C_4414311","text":"그룹레슨 / 홍준선_4명","start_date":"2021-10-25 20:00"},
// ]

$data = array();

array_push($data, array(
  "end_date" => "2021-12-17 12:50",
  "off_day" => "",
  "off_time" => "",
  "seq_coach" => "9807",
  "coach_text" => "(그룹수업) 리포머 5:1_8명",
  "seq_temp" => "C_4289546",
  "text" => "리포머 5:1 / 김반석_8명",
  "start_date" => "2021-12-17 12:00",
));

$return = array();

$return["status"] = 200;
$return["data"] = $data;

echo json_encode($return);

?>