<?php
include_once('../../common.php');

$seqService = $_GET["seqService"]; 

// print_r($_POST);
// echo $saleYn;
// exit();

// echo $seqService;

if (!empty($seqService)) {
  
  $sql_select = "
    SELECT * FROM services WHERE seqService = '$seqService'
  ";

  // echo $sql_select;

  $result = sql_fetch($sql_select);

  echo json_encode($result);

} else {
  echo json_encode(array('msg', 'failed'));
}
