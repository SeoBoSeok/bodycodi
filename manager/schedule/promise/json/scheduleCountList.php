<?php
// scheduleCountList?startDate=2021-10-25&endDate=2021-11-01&seqCoach=
// [{"cnt":"52","state":"A"},{"cnt":"7","state":"B"},{"cnt":"9","state":"C"},{"cnt":"70","state":"E"}]

$_startData = $_GET["startDate"];
$_endDate = $_GET["endDate"];
$_seqCoach = $_GET["seqCoach"];

$data = array();

array_push($data, array(
  "cnt" => "52",
  "state" => "A",
));
array_push($data, array(
  "cnt" => "7",
  "state" => "B",
));
array_push($data, array(
  "cnt" => "9",
  "state" => "C",
));
array_push($data, array(
  "cnt" => "70",
  "state" => "E",
));

$return = array();

$return["status"] = 200;
$return["data"] = $data;

echo json_encode($return);


