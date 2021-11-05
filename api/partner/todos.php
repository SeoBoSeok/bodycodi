<?php

// [
//   {
//     "seqTodo":1444,
//     "seqPartnerCoach":9807,
//     "startAt":"2021-02-01T09:00:00+09:00",
//     "endAt":"2021-12-31T09:00:00+09:00",
//     "message":"출근 (바디코디 프로그램 로그인)",
//     "comment":"",
//     "isCompleted":true
//   },
//   {"seqTodo":2601,"seqPartnerCoach":9807,"startAt":"2021-06-01T09:00:00+09:00","endAt":"2021-12-31T09:00:00+09:00","message":"12시 오전 수업 용품 정리/청소","comment":"","isCompleted":true},
//   {"seqTodo":2737,"seqPartnerCoach":9807,"startAt":"2021-06-21T09:00:00+09:00","endAt":"2021-12-31T09:00:00+09:00","message":"17시 저녁 수업 준비","comment":"","isCompleted":true},
//   {"seqTodo":2738,"seqPartnerCoach":9807,"startAt":"2021-06-21T09:00:00+09:00","endAt":"2021-12-31T09:00:00+09:00","message":"22시 센터 마감 (청소, 소등, 모든 전원 off)","comment":"","isCompleted":true}
// ]

$data = array();

array_push($data, array(
  "seqTodo" => 1444,
  "seqPartnerCoach" => 9807,
  "startAt" => "2021-02-01T09:00:00+09:00",
  "endAt" => "2021-12-31T09:00:00+09:00",
  "message" => "출근 (바디코디 프로그램 로그인)",
  "comment" => "",
  "isCompleted" => true
));
array_push($data, array(
  "seqTodo" => 1444,
  "seqPartnerCoach" => 9807,
  "startAt" => "2021-02-01T09:00:00+09:00",
  "endAt" => "2021-12-31T09:00:00+09:00",
  "message" => "출근 (바디코디 프로그램 로그인)",
  "comment" => "",
  "isCompleted" => true
));
array_push($data, array(
  "seqTodo" => 1444,
  "seqPartnerCoach" => 9807,
  "startAt" => "2021-02-01T09:00:00+09:00",
  "endAt" => "2021-12-31T09:00:00+09:00",
  "message" => "출근 (바디코디 프로그램 로그인)",
  "comment" => "",
  "isCompleted" => true
));
array_push($data, array(
  "seqTodo" => 1444,
  "seqPartnerCoach" => 9807,
  "startAt" => "2021-02-01T09:00:00+09:00",
  "endAt" => "2021-12-31T09:00:00+09:00",
  "message" => "출근 (바디코디 프로그램 로그인)",
  "comment" => "",
  "isCompleted" => true
));

$return = array();

$return["status"] = 200;
$return["data"] = $data;

echo json_encode($return);