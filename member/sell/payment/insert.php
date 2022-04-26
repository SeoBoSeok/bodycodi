<?php
include_once('../../../common.php');
ini_set('display_errors', 1);
ini_set('error_reporting', E_ALL);

$data = json_decode(file_get_contents('php://input'), true);
// print_r($data);

$orderType = $data['orderType'];
$orderClassification = $data['orderClassification'];
$seqPartnerCoach = $data['seqPartnerCoach'];
$orderDate = $data['orderDate'];
$orderDatetime = $data['orderDatetime'];
$memo = $data['memo'];
$rewardPoint = $data['rewardPoint'];
$pricing = json_encode($data['pricing'][0]);
$seqOrderInfo = $data['seqOrderInfo'];

$sql_insert = " INSERT into orders
                set orderType = '$orderType',
                orderClassification = '$orderClassification',
                seqPartnerCoach = '$seqPartnerCoach',
                orderDate = '$orderDate',
                orderDatetime = '$orderDatetime',
                memo = '$memo',
                rewardPoint = '$rewardPoint',
                pricing = '$pricing',
                seqOrderInfo = '$seqOrderInfo'
";
// echo $sql_insert;
// exit();
sql_query($sql_insert);
$seqOrderPayment = sql_insert_id();

$paymentAmount = "";
$approvalNumber = "";
$cashReceiptYn = "";
$paymentType = "";
$cashReceiptType = "";
$cashReceiptNumber = "";
$installmentPeriod = "";
$cardCode = "";
$cardNumber = "";
$depositorName = "";
$seqBankAccount = "";

for($i = 0; $i < count($data['payments']); $i++) {
  $paymentAmount = $data['payments'][$i]['paymentAmount'];
  $approvalNumber = $data['payments'][$i]['approvalNumber'];
  $paymentType = $data['payments'][$i]['paymentType'];

  $cashReceiptType = (isset($data['payments'][$i]['cashReceiptType'])) ? $data['payments'][$i]['cashReceiptType'] : "";
  $cashReceiptNumber = (isset($data['payments'][$i]['cashReceiptNumber'])) ? $data['payments'][$i]['cashReceiptNumber'] : "";
  
  $installmentPeriod = (isset($data['payments'][$i]['installmentPeriod'])) ? $data['payments'][$i]['installmentPeriod'] : "";
  $cardCode = (isset($data['payments'][$i]['cardCode'])) ? $data['payments'][$i]['cardCode'] : "";
  $cardNumber = (isset($data['payments'][$i]['cardNumber'])) ? $data['payments'][$i]['cardNumber'] : "";
  
  $depositorName = (isset($data['payments'][$i]['depositorName'])) ? $data['payments'][$i]['depositorName'] : "";
  $seqBankAccount = (isset($data['payments'][$i]['seqBankAccount'])) ? $data['payments'][$i]['seqBankAccount'] : "";

  $cashReceiptYn = (isset($data['payments'][$i]['cashReceiptYn'])) ? $data['payments'][$i]['cashReceiptYn'] : "";

  $sql_payment_insert = " INSERT into payments
                          set seqOrderPayment = '$seqOrderPayment',
                          paymentAmount = '$paymentAmount',
                          approvalNumber = '$approvalNumber',
                          cashReceiptYn = '$cashReceiptYn',
                          cashReceiptType = '$cashReceiptType',
                          cashReceiptNumber = '$cashReceiptNumber',
                          seqBankAccount = '$seqBankAccount',
                          paymentType = '$paymentType',
                          installmentPeriod = '$installmentPeriod',
                          cardCode = '$cardCode',
                          cardNumber = '$cardNumber',
                          depositorName = '$depositorName'
  ";

  // echo $sql_payment_insert;

  sql_query($sql_payment_insert);

}