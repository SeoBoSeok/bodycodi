<?php
include_once('../../../../common.php');

$fromDate = $_GET['fromDate'];
$toDate = $_GET['toDate'];
$seqPartnerCoaches = $_GET['seqPartnerCoaches'];
$orderType = $_GET['orderType'];
$orderClassification = $_GET['orderClassification'];
$paymentType = $_GET['paymentType'];
$orderName = $_GET['orderName'];
$memberName = $_GET['memberName'];

echo json_decode(json_encode('{
  "rows": [
    
  ],
  "orderInfos": {
    
  }
}'), true);