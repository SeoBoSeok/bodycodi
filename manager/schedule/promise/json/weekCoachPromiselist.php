<?php

// [
//   {"end_date":"2021-10-29 19:20:00",
//     "serviceKind":"N",
//     "usePeriod":"1",
//     "seqPassInfo":"1338491",
//     "color":"#d65664",
//     "usePeriodType":"M",
//     "seq_schedule":"28000036",
//     "memo":"",
//     "memberName":"김반석",
//     "serviceName":"PT (30분)",
//     "seq_member":"954664",
//     "useNumber":"5000",
//     "section_id":"17471",
//     "seqProduct":"1338491",
//     "id":"1635384697959",
//     "text":"김반석_예약_010-8299-1948_PT (30분) - PT (30분)",
//     "now_state":"A",
//     "memberMobile":"010-8299-1948",
//     "start_date":"2021-10-29 19:00:00"
//   },
//   {"end_date":"2021-10-29 19:50:00","serviceKind":"P","usePeriod":"3","seqPassInfo":"1408478","color":"#d65664","usePeriodType":"M","seq_schedule":"28000062","memo":"","memberName":"이민일","serviceName":"PT (필라테스)","seq_member":"1477051","useNumber":"-1","section_id":"9806","seqProduct":"1408478","id":"1635384698003","text":"이민일_예약_090-0000-0002_PT (필라테스) - PT (필라테스)","now_state":"A","memberMobile":"090-0000-0002","start_date":"2021-10-29 19:00:00"},
//   {"end_date":"2021-10-29 18:50:00","serviceKind":"P","usePeriod":"3","seqPassInfo":"1412162","color":"#d65664","usePeriodType":"M","seq_schedule":"28000057","memo":"","memberName":"이민이","serviceName":"PT (필라테스)","seq_member":"1477053","useNumber":"-1","section_id":"20000","seqProduct":"1412162","id":"1635384697992","text":"이민이_예약_521-0123-1234_PT (필라테스) - PT (필라테스)","now_state":"A","memberMobile":"521-0123-1234","start_date":"2021-10-29 18:00:00"},
//   {"end_date":"2021-10-29 18:50:00","serviceKind":"P","usePeriod":"3","seqPassInfo":"1408478","color":"#d65664","usePeriodType":"M","seq_schedule":"28000079","memo":"","memberName":"이민일","serviceName":"PT (필라테스)","seq_member":"1477051","useNumber":"-1","section_id":"9817","seqProduct":"1408478","id":"1635384698009","text":"이민일_예약_090-0000-0002_PT (필라테스) - PT (필라테스)","now_state":"A","memberMobile":"090-0000-0002","start_date":"2021-10-29 18:00:00"},
//   {"end_date":"2021-10-29 17:50:00","color":"#d65664","seq_schedule":"28000044","memo":"","memberName":"수수  ","passName":"상담예약","seq_member":"954665","section_id":"9806","seqProduct":"-100","id":"1635384697969","text":"수수  _예약_0100-7701-7165_상담예약","now_state":"A","memberMobile":"0100-7701-7165","start_date":"2021-10-29 17:00:00"},
//   {"end_date":"2021-10-29 17:50:00","color":"#d65664","seq_schedule":"28000047","memo":"","memberName":"수수  ","passName":"상담예약","seq_member":"954665","section_id":"9816","seqProduct":"-100","id":"1635384697974","text":"수수  _예약_0100-7701-7165_상담예약","now_state":"A","memberMobile":"0100-7701-7165","start_date":"2021-10-29 17:00:00"},
//   {"end_date":"2021-10-29 17:50:00","serviceKind":"P","usePeriod":"3","seqPassInfo":"1408478","color":"#d65664","usePeriodType":"M","seq_schedule":"28000055","memo":"","memberName":"이민일","serviceName":"PT (필라테스)","seq_member":"1477051","useNumber":"-1","section_id":"20000","seqProduct":"1408478","id":"1635384697988","text":"이민일_예약_090-0000-0002_PT (필라테스) - PT (필라테스)","now_state":"A","memberMobile":"090-0000-0002","start_date":"2021-10-29 17:00:00"},
//   {"end_date":"2021-10-29 17:50:00","serviceKind":"P","usePeriod":"92","seqPassInfo":"1372667","color":"#d65664","usePeriodType":"D","seq_schedule":"28015860","memo":"","memberName":"김근희","serviceName":"PT (필라테스)","seq_member":"954663","useNumber":"-1","section_id":"9817","seqProduct":"1372667","id":"1635408200699","text":"김근희_예약_0100-8622-9149_PT (필라테스) - PT (필라테스)","now_state":"A","memberMobile":"0100-8622-9149","start_date":"2021-10-29 17:00:00"},
//   {"end_date":"2021-10-29 17:20:00","serviceKind":"P","usePeriod":"3","seqPassInfo":"1408478","color":"#d65664","usePeriodType":"M","seq_schedule":"28000091","memo":"","memberName":"이민일","serviceName":"PT (필라테스)","seq_member":"1477051","useNumber":"-1","section_id":"17471","seqProduct":"1408478","id":"1635384698028","text":"이민일_예약_090-0000-0002_PT (필라테스) - PT (필라테스)","now_state":"A","memberMobile":"090-0000-0002","start_date":"2021-10-29 16:30:00"},
//   {"end_date":"2021-10-29 16:30:00","serviceKind":"N","usePeriod":"10","seqPassInfo":"1502496","color":"#d65664","usePeriodType":"M","seq_schedule":"27038136","memberName":"이해은","serviceName":"골프 30분 ","seq_member":"1488379","useNumber":"20","section_id":"17122","seqProduct":"1502496","id":"1633507399585","text":"이해은_예약_010-5923-2998_골프 30분  - 골프 30분 ","now_state":"A","memberMobile":"010-5923-2998","start_date":"2021-10-29 16:00:00"},
//   {"end_date":"2021-10-29 16:50:00","serviceKind":"P","usePeriod":"92","seqPassInfo":"1372667","color":"#d65664","usePeriodType":"D","seq_schedule":"28000040","memo":"","memberName":"김근희","serviceName":"PT (필라테스)","seq_member":"954663","useNumber":"-1","section_id":"9806","seqProduct":"1372667","id":"1635384697965","text":"김근희_예약_0100-8622-9149_PT (필라테스) - PT (필라테스)","now_state":"A","memberMobile":"0100-8622-9149","start_date":"2021-10-29 16:00:00"},
//   {"end_date":"2021-10-29 16:50:00","serviceKind":"P","usePeriod":"92","seqPassInfo":"1372667","color":"#d65664","usePeriodType":"D","seq_schedule":"28015847","memo":"","memberName":"김근희","serviceName":"PT (필라테스)","seq_member":"954663","useNumber":"-1","section_id":"9816","seqProduct":"1372667","id":"1635408200695","text":"김근희_예약_0100-8622-9149_PT (필라테스) - PT (필라테스)","now_state":"A","memberMobile":"0100-8622-9149","start_date":"2021-10-29 16:00:00"},
//   {"end_date":"2021-10-29 19:00:00","color":"#626262","seq_schedule":"27953649","memo":"외부 강습","passName":"OT상품","seq_member":"0","section_id":"21610","noMemberMobile":"","seqProduct":"-999","id":"1635297486267","text":"기타스케줄_외부 강습","noMemberName":"","now_state":"B","start_date":"2021-10-29 16:00:00"},
//   {"end_date":"2021-10-29 19:00:00","color":"#626262","seq_schedule":"27953964","memo":"외부 강습","passName":"OT상품","seq_member":"0","section_id":"21611","noMemberMobile":"","seqProduct":"-999","id":"1635298007983","text":"기타스케줄_외부 강습","noMemberName":"","now_state":"B","start_date":"2021-10-29 16:00:00"},
//   {"end_date":"2021-10-29 15:20:00","serviceKind":"N","usePeriod":"1","seqPassInfo":"1338491","color":"#d65664","usePeriodType":"M","seq_schedule":"28015866","memo":"","memberName":"김반석","serviceName":"PT (30분)","seq_member":"954664","useNumber":"5000","section_id":"9806","seqProduct":"1338491","id":"1635408200726","text":"김반석_예약_010-8299-1948_PT (30분) - PT (30분)","now_state":"A","memberMobile":"010-8299-1948","start_date":"2021-10-29 15:00:00"},
// ]

$data = array();

array_push($data, array(
  "end_date" => "2021-10-29 19:20:00",
  "serviceKind" => "N",
  "usePeriod" => "1",
  "seqPassInfo" => "1338491",
  "color" => "#d65664",
  "usePeriodType" => "M",
  "seq_schedule" => "28000036",
  "memo" => "1111",
  "memberName" => "김반석",
  "serviceName" => "PT (30분)",
  "seq_member" => "954664",
  "useNumber" => "5000",
  "section_id" => "17471",
  "seqProduct" => "1338491",
  "id" => "1635384697959",
  "text" => "김반석_예약_010-8299-1948_PT (30분) - PT (30분)",
  "now_state" => "A",
  "memberMobile" => "010-8299-1948",
  "start_date" => "2021-10-29 19:00:00",
));

$return = array();

$return["status"] = 200;
$return["data"] = $data;

echo json_encode($return);

?>