<?php

// [
//   {"end_date":"2021-10-25 23:00","off_day":"","seq_coach":"14597","close_day":"0","start_date":"2021-10-25 09:00"},
//   {"end_date":"2021-10-25 20:00","off_day":"","seq_coach":"14510","close_day":"0","start_date":"2021-10-25 10:00"},
//   {"end_date":"2021-10-25 13:00","off_day":"","seq_coach":"17045","close_day":"0","start_date":"2021-10-25 10:00"},
//   {"end_date":"2021-10-25 19:00","off_day":"","seq_coach":"17045","close_day":"0","start_date":"2021-10-25 14:00"},
//   {"end_date":"2021-10-25 21:00","off_day":"","seq_coach":"17192","close_day":"0","start_date":"2021-10-25 10:00"},
// ]

$data = array();

array_push($data, array(
  "end_date" => "2021-12-19 23:00",
  "off_day" => "",
  "seq_coach" => "21697",
  "close_day" => "0",
  "start_date" => "2021-12-19 09:00",
));
array_push($data, array(
  "end_date" => "2021-12-19 20:00",
  "off_day" => "",
  "seq_coach" => "9806",
  "close_day" => "0",
  "start_date" => "2021-12-19 09:00",
));
array_push($data, array(
  "end_date" => "2021-12-19 19:00",
  "off_day" => "",
  "seq_coach" => "9817",
  "close_day" => "0",
  "start_date" => "2021-12-19 21:00",
));

$return = array();

$return["status"] = 200;
$return["data"] = $data;

echo json_encode($return);

?>