<?php
// [
//   {
//     "label":"바른샘",
//     "key":"21697"
//   },
//   {"label":"하나골프 강사","key":"21696"},
//   {"label":"이석훈","key":"9806"},
//   {"label":"골프 프로","key":"20000"},
//   {"label":"이민주","key":"17471"},
//   {"label":"김반석","key":"9817"}
// ]

$data = array();

array_push($data, array(
  "label" => "바른샘",
  "key" => 21697,
));
array_push($data, array(
  "label" => "이석훈",
  "key" => 9806,
));
array_push($data, array(
  "label" => "이민주",
  "key" => 9817,
));

$return = array();

$return["status"] = 200;
$return["data"] = $data;

echo json_encode($return);

?>