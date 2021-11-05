<?php

$result = json_decode(
  '{
    "permissionSchedule": {
      "cancelAppointment":true,
      "readClassCoachPay":true,
      "modifyClassPast":false,
      "changeAppointmentScheduleState":true,
      "modifyAppointmentTime":true,
      "reserveAppointmentOtherCoach":true,
      "cancelClass":true,
      "addPastAppointmentScheduleState":true,
      "naverSchedule":true,
      "updateClassGoingAhead":false,
      "addClass":true},
      "permissionAccounting": {
        "readExpenditure":true,
        "configStaffPay":true,
        "readStaffPay":true,
        "accessAccounting":true,
        "readSales":true,
        "readAccount":false,
        "registExpenditure":true},
        "permissionMember": {
          "passOptionChange":true,
          "accessCommunityPage":true,
          "batchExtension":true,
          "readOtherCoachCounseling":true,
          "pauseUsage":true,
          "excelDownload":true,
          "del":true,
          "locker":true,
          "updateCounseling":true,
          "autoSms":true,
          "sendSms":true,
          "updateUsage":true,
          "transferUsage":true,
          "regist":true
        },
        "permissionStatistics": {
          "classes":true,
          "member":true,
          "appointment":true,
          "sales":true
        },
        "permissionProduct": {
          "registPublicProduct":true,
          "accessProductPage":true,
          "updateDiscountCoupon":true,
          "registDiscountCoupon":true,
          "registProduct":true,
          "modifyProduct":true,
          "registUsage":true,
          "modifyUsage":true
        },
        "permissionPayment": {
          "customSales":true,
          "changePaymentDate":true,
          "updateRefund":true,
          "updatePayment":true,
          "upgradePayment":true,
          "updatePricePolicyInSales":true,
          "changeSalesClassification":true,
          "exchangePassInfo":true,
          "receivables":true,
          "payment":true,
          "deletePayment":true,
          "customEarnMileage":true,
          "customDiscountPrice":true,
          "refund":true
        },
        "permissionOperation": {
          "reservationSetting":true,
          "holiday":true,
          "addSpace":true,
          "mileage":true}
        }
  '
);

// print_r($result);

echo json_encode($result);