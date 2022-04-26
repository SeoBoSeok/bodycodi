<?php
include_once('../../../common.php');

// $seqOrderInfo = $_GET['seqOrderInfo'];

// $sql = " SELECT * FROM orders WHERE seqOrderInfo = '$seqOrderInfo' ";
// echo $sql;
// $result = sql_fetch($sql);

// echo json_encode($result);

echo json_encode(json_decode(file_get_contents('result.json'), true));