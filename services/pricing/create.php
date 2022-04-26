<?php
include_once('../../common.php');

$data = json_decode(file_get_contents('php://input'), true);

// $data_class = new stdClass;
// $data_class = json_decode(file_get_contents('php://input'), true);
// echo ($data_class->normalPrice)."\r\n";

// [coach and space list]
// seqPartnerBranch: 0
// seqPartnerCoaches: [17122]
// seqPartnerSpace: 1980

$normalPrice = $data['normalPrice'];
$price = $data['price'];
$pricingName = $data['pricingName'];
$saleYn = $data['saleYn'];
$seqService = $data['seqService'];
$serviceCategory = $data['serviceCategory'];
$taxFreeYn = $data['taxFreeYn'];

$sql = "
  INSERT INTO service_price 
  set normalPrice = '$normalPrice',
  price = '$price',
  pricingName = '$pricingName',
  saleYn = '$saleYn',
  seqService = '$seqService',
  serviceCategory = '$serviceCategory',
  taxFreeYn = '$taxFreeYn'
";

sql_query($sql);

$service_id = sql_insert_id();

// echo $service_id;

$cancelNumber = $data['details'][0]['cancelNumber'];
$dayLimit = $data['details'][0]['dayLimit'];
$defaultBranchYn = $data['details'][0]['defaultBranchYn'];
$forceCancelNumber = $data['details'][0]['forceCancelNumber'];
$maxBookingNumber = $data['details'][0]['maxBookingNumber'];
$pauseNumber = $data['details'][0]['pauseNumber'];
$pausePeriod = $data['details'][0]['pausePeriod'];
$price = $data['details'][0]['price'];
$seqPackage = $data['details'][0]['seqPackage'];
$seqSalesClassification = $data['details'][0]['seqSalesClassification'];
$seqService = $data['details'][0]['seqService'];
$useNumber = $data['details'][0]['useNumber'];
$usePeriod = $data['details'][0]['usePeriod'];
$usePeriodType = $data['details'][0]['usePeriodType'];
$weekLimit = $data['details'][0]['weekLimit'];


$sql_details = "
  INSERT INTO service_details 
    set cancelNumber = '$cancelNumber',
    dayLimit = '$dayLimit',
    defaultBranchYn = '$defaultBranchYn',
    forceCancelNumber = '$forceCancelNumber',
    maxBookingNumber = '$maxBookingNumber',
    pauseNumber = '$pauseNumber',
    pausePeriod = '$pausePeriod',
    price = '$price',
    seqPackage = '$seqPackage',
    seqSalesClassification = '$seqSalesClassification',
    seqService = '$seqService',
    useNumber = '$useNumber',
    usePeriod = '$usePeriod',
    usePeriodType = '$usePeriodType',
    weekLimit = '$weekLimit'
";

sql_query($sql_details);

$service_details_id = sql_insert_id();


// 고정 값
// branchTypes: []
// branches: []
// coachAndSpaceList: [{seqPartnerBranch: 0, seqPartnerCoaches: [17122], seqPartnerSpace: 1980}]

// exit();



