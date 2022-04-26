<?php
include_once('../../../../common.php');

$fromDate = $_GET['fromDate'];
$toDate = $_GET['toDate'];

// echo $fromDate;
// echo $toDate;

// {
//   "summary": {
//     "sumSalePrice": 0,
//     "sumPaymentAmount": 0,
//     "sumRefundPaymentAmount": 0,
//     "sumReceivables": 0,
//     "sumRefundAmount": 0,
//     "count": {
//       "NEW": {
//         "sumAmount": 0,
//         "memberCount": 0,
//         "orderCount": 0
//       },
//       "PAYMENT": {
//         "sumAmount": 0,
//         "memberCount": 0,
//         "orderCount": 0
//       },
//       "INUSE": {
//         "sumAmount": 0,
//         "memberCount": 0,
//         "orderCount": 0
//       },
//       "TRANSFER": {
//         "sumAmount": 0,
//         "memberCount": 0,
//         "orderCount": 0
//       },
//       "REFUND": {
//         "sumAmount": 0,
//         "memberCount": 0,
//         "orderCount": 0
//       }
//     }
//   },
//   "coachList": []
// }

echo json_encode(json_decode(file_get_contents('data.json'), true));