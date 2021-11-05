<?php
include_once('../../../common.php');

define('_SUB_', true);
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

include_once(G5_THEME_PATH.'/head.php');
?>

<script src="<?php echo G5_URL; ?>/resources/js/popup/coachPwdConfirmPopup.js"></script>
<script src="<?php echo G5_URL; ?>/resources/js/controller/loginController.js"></script>

<!-- 버전 2.0 -->
<style type="text/css">

.branchDisplay 							{display:none !important}


html									{position:relative; margin:0 auto !important; background-color:#f0f0f0; min-width:1280px; max-width:1920px}
body									{height:auto; /*min-width:1600px*/}
var, time								{font-style:normal}

#using									{position:relative}
#contents								{display:table; margin-top:0; padding-top:0; width:100%; height:calc(100% - 160px)}
.page_top								{display:none !important}

.bar_area								{position:sticky; position:-webkit-sticky; top:0; padding:5px 50px}
.bar_area.fix_sc						{position:sticky; position:-webkit-sticky; z-index:4}
.bar_area								{height:45px; line-height:34px}
.bar_area .fl a							{vertical-align:initial}
.bar_area .fr.nav ul					{margin-top:-6px}
.bar_area .fr.nav ul li a				{height:46px; line-height:46px}
.bar_area .fr.nav ul li a.active		{background-color:#004fec}

.ui-popup								{font-size:13px; color:#333}
.ui-popup em							{position:relative; display:inline-block; vertical-align:middle; top:0; margin-right:0.5em; padding:0px 5px; background-color:#42485a; border-radius:1px; line-height:1.65; font-size:11px; font-weight:300; font-style:normal; color:white}
.ui-popup em.white						{border:1px solid #ccc; font-weight:400}

.ui-popup > div							{line-height:1.5}
.ui-popup > div > div > div				{opacity:1 !important; transform:none !important}

.ui-popup input[type=text],
.ui-popup input[type=number],
.ui-popup select						{height:36px !important; border-color:#ccc}

.ui-popup .tab							{flex:auto; bottom:auto}
.ui-popup table tbody tr > th,
.ui-popup table tbody tr > td			{height:auto; text-align:inherit; background-color:white; border:none !important}
.ui-popup table tbody tr > td input		{width:100%; text-align:inherit}
.ui-popup .thumbnail					{display:table-row; margin:0; padding:0; border:none; border-radius:0; transition:none}

.ui-popup dl							{display:table; width:100%; margin-bottom:0}
.ui-popup dl dt,
.ui-popup dl dd							{display:table-cell; font-weight:normal}

.ui-block.focus							{z-index:9999}

.ui-popup img,
.ui-input-radio *,
.ui-input-search *,
.ui-input-checkbox *					{box-sizing:initial}
.ui-input-search input					{width:350px !important; max-width:350px !important}
.ui-input-search button					{box-sizing:border-box}

.ui-side + div							{margin-left:275px; height:100%; border-left:1px solid #ccc}
.ui-side + div > div					{max-width:100%; margin:0 10px}

.btn									{height:35px; line-height:33px; font-size:12.5px}
.btn + .btn,
select + .btn							{margin-left:5px}
button.btn								{height:34px; line-height:32px}
.btn.white								{background-color:white; border:1px solid #ccc; color:#333}

@media(min-width:1920px) {
html									{outline:1px solid #ddd}
}
</style>
<!-- 팝업위치 -->
<div data-popup-location="팝업 위치"></div>
<!-- 팝업위치 -->
<div id="contents">
		
    <script>
      $(document).ready(function() {
        if(typeof daum !== 'undefined' && $('input[name=zipCode]') ){
          $('#btnAddressSearch').show();
        }else if ( typeof daum === 'undefined' ) {
          $('#btnAddressSearch').hide();
        }
      });
    </script>
    
    <div class="popup pop_white schedule_setting">
      <div class="box">
        <h2>스케줄 설정</h2>
        <div class="pop_con">
          <!-- 라디오 버튼 탭 -->
          
          
          <!-- //라디오 버튼 탭 -->
          <p>
            <span class="label" style="width:160px">디폴트 스케줄러</span>
            <span>
              <input type="radio" name="defaultScheduler" value="promise" id="schedule_setting_trainer" class="type_01">
              <label for="schedule_setting_trainer">개인레슨 스케줄</label>
              <input type="radio" name="defaultScheduler" value="class" id="schedule_setting_group" class="type_02">
              <label for="schedule_setting_group">그룹수업 스케줄</label>
              </span></p><p style="padding-left:160px">※ 스케줄러 메뉴 진입 시 기본 표시 스케줄러 선택</p>
            
          <p></p>
          <fieldset>
            <p>
              <span class="label">수업시간</span>
              <span class="time">
                <select name="startTimeHour">
                  
                    
                    <option value="00">00</option>
                  
                    
                    <option value="01">01</option>
                  
                    
                    <option value="02">02</option>
                  
                    
                    <option value="03">03</option>
                  
                    
                    <option value="04">04</option>
                  
                    
                    <option value="05">05</option>
                  
                    
                    <option value="06">06</option>
                  
                    
                    <option value="07">07</option>
                  
                    
                    <option value="08">08</option>
                  
                    
                    <option value="09">09</option>
                  
                    
                    <option value="10">10</option>
                  
                    
                    <option value="11">11</option>
                  
                    
                    <option value="12">12</option>
                  
                    
                    <option value="13">13</option>
                  
                    
                    <option value="14">14</option>
                  
                    
                    <option value="15">15</option>
                  
                    
                    <option value="16">16</option>
                  
                    
                    <option value="17">17</option>
                  
                    
                    <option value="18">18</option>
                  
                    
                    <option value="19">19</option>
                  
                    
                    <option value="20">20</option>
                  
                    
                    <option value="21">21</option>
                  
                    
                    <option value="22">22</option>
                  
                    
                    <option value="23">23</option>
                  
                    
                    <option value="24">24</option>
                  
                </select>
                <span>시</span>
                <select name="startTimeMinute">
                  <option value="00">00</option>
                  <option value="30">30</option>
                </select>
                <i>-</i>
                <select name="endTimeHour">
                  
                    
                    <option value="00">00</option>
                  
                    
                    <option value="01">01</option>
                  
                    
                    <option value="02">02</option>
                  
                    
                    <option value="03">03</option>
                  
                    
                    <option value="04">04</option>
                  
                    
                    <option value="05">05</option>
                  
                    
                    <option value="06">06</option>
                  
                    
                    <option value="07">07</option>
                  
                    
                    <option value="08">08</option>
                  
                    
                    <option value="09">09</option>
                  
                    
                    <option value="10">10</option>
                  
                    
                    <option value="11">11</option>
                  
                    
                    <option value="12">12</option>
                  
                    
                    <option value="13">13</option>
                  
                    
                    <option value="14">14</option>
                  
                    
                    <option value="15">15</option>
                  
                    
                    <option value="16">16</option>
                  
                    
                    <option value="17">17</option>
                  
                    
                    <option value="18">18</option>
                  
                    
                    <option value="19">19</option>
                  
                    
                    <option value="20">20</option>
                  
                    
                    <option value="21">21</option>
                  
                    
                    <option value="22">22</option>
                  
                    
                    <option value="23">23</option>
                  
                    
                    <option value="24">24</option>
                  
                </select>
                <span>시</span>
                <select name="endTimeMinute">
                  <option value="00">00</option>
                  <option value="30">30</option>
                </select>
              </span>
            </p>
    
            <p>
              <span class="label">수업 장소 기본 설정</span>
              <select name="defaultGroupSpace">
                <option value="">GX룸 1</option>
                <option value="">요가 룸</option>
              </select>
            </p>
            <!--
            <p>
              <span class="label">스케줄러 세로 크기</span>
              <select name="schedulerVerticalSize">
                <option value="1" selected>기본</option>
                <option value="2">2배</option>
                <option value="3">3배</option>
              </select>
            </p>
            <p>
              <span class="label"><span style="display:block; line-height:1.3">개인레슨 스케줄러<br>강사 표시 개수</span></span>
              <select name="schedulerCoachCount">
                <option value="7" selected>7명</option>
                <option value="6">6명</option>
                <option value="5">5명</option>
                <option value="4">4명</option>
                <option value="3">3명</option>
                <option value="2">2명</option>
                <option value="1">1명</option>
              </select>
            </p>
            -->
          </fieldset>
    
          <p class="tit">개인레슨 이용권 강사 배정</p>
    
          <div class="table_area">
            <table>
              <thead>
                <tr>
                  <th style="width: 12%">순서</th>
                  <th style="width: 15%">이름</th>
                  <th>직급명칭</th>
                  <th style="width: 15%">순서바꾸기</th>
                </tr>
              </thead>
              <tbody data-function="sortCoachList" class="ui-sortable" style="">
                <tr data-function="sortable" class="ui-sortable-handle" style="">
                  <td>1</td>
                  <td><a href="#">김이박</a></td>
                  <td>강사</td>
                  <td>
                    <button value="up">위로</button>
                    <button value="down">아래로</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
    
        </div>
        <!-- 라디오 탭 -->
        <div class="pop_btn">
          <button type="button" class="btn gray" data-function="close">취소</button>
          <button type="button" class="btn blue" data-function="save">저장</button>
        </div>
    
        <a href="#" class="close" data-function="close">팝업 닫기</a>
      </div>
    </div>
    
    
    <!-- 이용권 사용내역 팝업(박진주) -->
    <div class="popup pop_white info_class_service">
      <div class="box">
        <h2 data-msg="title">그룹수업이용권 사용내역</h2>
        <div class="pop_con">
          <div class="table_area height_add" data-dynamic-grid="scheduleData">
            <table>
              <thead>
                <tr>
                  <th style="width: 8%"><input id="booking_user_list_all" type="checkbox"><label for="booking_user_list_all">&nbsp;</label></th>
                  <th style="width: 30%; text-align:left;">이용 또는 예약 일시</th>
                  <th style="width: 15%; text-align:left;">상태</th>
                  <th style="width: 47%; text-align:left;">수업이름</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input id="booking_user_list_01" type="checkbox"><label for="booking_user_list_01">&nbsp;</label></td>
                  <td style="text-align:left;">2017-03-21 08:40</td>
                  <td style="text-align:left;" class="c_blue">출석</td>
                  <td style="text-align:left;">1:1 PT 이용권 사용내역</td>
                </tr>
                <tr>
                  <td><input id="booking_user_list_02" type="checkbox"><label for="booking_user_list_02">&nbsp;</label></td>
                  <td style="text-align:left;">2017-03-21 08:40</td>
                  <td style="text-align:left;" class="c_red">결석(차감)</td>
                  <td style="text-align:left;">아쉬탕카 요가</td>
                </tr>
                <tr>
                  <td><input id="booking_user_list_03" type="checkbox"><label for="booking_user_list_03">&nbsp;</label></td>
                  <td style="text-align:left;">2017-03-21 08:40</td>
                  <td style="text-align:left;" class="c_green">예약</td>
                  <td style="text-align:left;">1:1 PT</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    
        <div class="pop_btn" data-dynamic-grid="functionBtn">
          <button type="button" class="btn gray" data-function="changeState" value="C">예약취소</button>
          <button type="button" class="btn red" data-function="changeState" value="A">결석처리</button>
          <button type="button" class="btn blue" data-function="changeState" value="E">출석처리</button>
          <button type="button" class="btn blue" data-function="close">확인</button>
        </div>
    
        <a href="#" class="close" data-function="close">팝업 닫기</a>
      </div>
    </div>
    
    
    
    <div class="popup pop_white state_change" style="z-index: 1050">
      <div class="box">
        <h2><custom-before-state>예약</custom-before-state> &gt; <custom-change-state>출석</custom-change-state></h2>
        <div class="pop_con">
          <div class="state_box">
            <p class="tit">
              <custom-start-end-period>2017년 03월 29일 오전10:00~오전10:50</custom-start-end-period>
              <span><custom-member-name>홍길동</custom-member-name> 회원님의 <strong class="c_blue pop_card_tit"><custom-appointment-info>1:1PT 60분</custom-appointment-info></strong>
              <custom-before-state>예약</custom-before-state>을 <strong class="c_blue"><custom-change-state>출석</custom-change-state></strong>하시겠습니까?</span>
            </p>
            <p class="after_change">
              <custom-change-state>출석</custom-change-state>처리 시 이용권 남은 횟수가 <strong class="c_red"><custom-change-usage>1회 차감</custom-change-usage></strong>합니다.
            </p>
            <div class="ticket_state">
              <p><custom-product-name>이용권 이름</custom-product-name>의 남은 횟수가 아래와 같이 변경됩니다.</p>
              <div class="fl">
                <span>현재</span>
                <strong><custom-now-ticket-number>5회</custom-now-ticket-number></strong>
              </div>
              <div class="fr">
                <span>변경 후</span>
                <strong><custom-change-ticket-number>4회</custom-change-ticket-number></strong>
              </div>
            </div>
            <div class="ticket_state">
              <fieldset id="ticketClassScheduleSeatField" class="hidden">
                좌석 선택
                <legend>좌석 선택</legend>
                <p class="btn_plus">
                  <select id="ticketClassScheduleSeatNo" title="좌석 선택" style="width: 50%"></select>
                </p>
              </fieldset>
            </div>
          </div>
    
        </div>
        <!-- 라디오 탭 -->
        <div class="pop_btn">
          <button type="button" class="btn gray" data-function="close">취소</button>
          <button type="button" class="btn blue" data-function="updateSchedule"><custom-change-state>출석</custom-change-state> 처리</button>
        </div>
    
        <a href="#" class="close" data-function="close">팝업 닫기</a>
      </div>
    </div>
    
    
    <div class="popup pop_white" data-template="개인레슨서비스 강사변경">
      <div class="box">
        <h2 data-msg="title">개인레슨서비스 강사변경</h2>
        <div class="pop_con">
          <form action="" id="addClassScheduleForm">
            <fieldset>
              <legend>수업 기간 등록</legend>
              <p>
                <span class="label">현재 강사</span>
                <span data-msg="현재 강사"></span>
              </p>
    
              <p class="pop_set_cost">
                <span class="label">변경 강사</span>
                <select name="seqPartnerCoach" title="변경 강사">
                  <option value="">김헬스</option>
                </select>
              </p>
            </fieldset>
          </form>
        </div>
        <!-- 라디오 탭 -->
        <div class="pop_btn">
          <button type="button" class="btn gray" data-function="close">닫기</button>
          <button type="button" class="btn blue" data-function="changeAppointmentCoach">강사 변경</button>
        </div>
    
        <a href="#" class="close" data-function="close">팝업 닫기</a>
      </div>
    </div>
    
    
    
    
    <div class="popup pop_white state_change_naver" style="z-index: 1050">
      <div class="box">
        <h2><custom-before-state>예약</custom-before-state> &gt; <custom-change-state>출석</custom-change-state></h2>
        <div class="pop_con">
          <div class="state_box">
            <p class="tit">
              <custom-start-end-period>2017년 03월 29일 오전10:00~오전10:50</custom-start-end-period>
              <span><custom-member-name>홍길동</custom-member-name> 회원님의 <strong class="c_blue pop_card_tit"><custom-appointment-info>1:1PT 60분</custom-appointment-info></strong>
              <custom-before-state>예약</custom-before-state>을 <strong class="c_blue"><custom-change-state>출석</custom-change-state></strong>하시겠습니까?</span>
            </p>
          </div>
        </div>
        <!-- 라디오 탭 -->
        <div class="pop_btn">
          <button type="button" class="btn gray" data-function="close">취소</button>
          <button type="button" class="btn blue" data-function="updateSchedule"><custom-change-state>출석</custom-change-state> 처리</button>
        </div>
    
        <a href="#" class="close" data-function="close">팝업 닫기</a>
      </div>
    </div>
    
    
    <div class="popup pop_white input_schedule" data-template="input_schedule">
      <div class="box" style="width: 650px !important;">
        <h2>개인레슨 이용권 <span data-msg="todo">예약하기</span></h2>
        <div class="pop_con">
          <div class="tab_area pop_tab">
            <ul>
              <li><button type="button" class="active" data-design="reservationTab" data-value="reservation"><span data-msg="todo">예약하기</span></button></li>
              <li><button type="button" data-design="reservationTab" data-value="etc">기타 스케줄 등록하기</button></li>
            </ul>
          </div>
    
          <form name="scheduleForm" id="scheduleForm" class="form-horizontal" method="post">
            <input type="hidden" name="seq_schedule" id="seq_schedule" value="">
            <input type="hidden" name="event_state" id="event_state" value="">
            <input type="hidden" name="schedule_mode" id="schedule_mode" value="unit">
            <input type="hidden" name="input_mode" id="input_mode" value="insert">
            <input type="hidden" name="product_init_id" id="product_init_id" value="">
            <input type="hidden" name="employee_id" id="employee_id" value="">
            <input type="hidden" name="event_id" id="event_id" value="">
            <input type="hidden" name="mobile" id="mobile" value="">
            <input type="hidden" name="member_id" id="member_id" value="">
            <input type="hidden" name="coach_id" id="coach_id" value="">
            <input type="hidden" name="coach_name" id="coach_name" value="">
            <input type="hidden" name="product_id" id="product_id" value="">
            <input type="hidden" name="product_pass_id" id="product_pass_id" value="">
            <input type="hidden" name="payment_id" id="payment_id" value="">
            <input type="hidden" name="now_state" id="now_state" value="">
            <input type="hidden" name="before_start_date" id="before_start_date">
            <!--등록된 예약 업데이트시에 Block 상태변경이 일어나면 기존 정보를 임시저장   -->
            <!-- <input type="hidden" name="before_state" id="before_state" value="" />
            <input type="hidden" name="before_productList_id" id="before_productList_id" value="" />
            <input type="hidden" name="before_employee_id" id="before_employee_id" value="" />
            <input type="hidden" name="before_member_id" id="before_member_id" value="" />
            <input type="hidden" name="before_product_id" id="before_product_id" value="" />
            <input type="hidden" name="before_product_pass_id" id="before_product_pass_id" value="" />
            <input type="hidden" name="before_employee_name" id="before_employee_name" value="" />
            <input type="hidden" name="before_member_name" id="before_member_name" value="" />
            <input type="hidden" name="before_mobile" id="before_mobile" value="" /> -->
    
          <!-- 탭 영역 - 새로운 예약 -->
          <div class="pop_tab_01">
            <!-- 라디오 버튼 탭 -->
            <input type="radio" name="membership" checked="checked" value="member" id="design_for_join_meber" class="type_01">
            <label for="design_for_join_meber">등록 회원 <span data-msg="todo">예약하기</span></label>
            <input type="radio" name="membership" value="nonmember" id="design_for_no_member" class="type_02">
            <label for="design_for_no_member">미등록 회원 <span data-msg="todo">예약하기</span></label>
            <!-- //라디오 버튼 탭 -->
    
            <!-- 라디오 버튼 탭 내용 -->
            <div class="box_input">
              <div class="search">
                <fieldset>
                  <legend>회원 검색</legend>
                  <p>
                    <input value="" placeholder="이름 또는 휴대전화번호" type="text" id="member_name" name="member_name" title="회원명">
                    <button type="button" class="icon small search_d" data-function="searchMember">검색</button>
                  </p>
                </fieldset>
              </div>
    
              <div class="search_result" style="display:none;">
                <ul id="memberListResult">
                  <li><a href="#"><strong>김민정</strong><span>010-0000-0000</span></a></li>
                  <li><a href="#"><strong>김민호</strong><span>010-0000-0000</span></a></li>
                </ul>
              </div>
            </div>
            <div class="box_input no_memeber">
              <fieldset>
                <legend>미등록회원 정보</legend>
                <p>
                  <input placeholder="이름" type="text" name="nonmember_name" id="nonmember_name" title="이름">
                  <input placeholder="휴대폰 번호" type="text" name="nonmember_mobile" id="nonmember_mobile" title="휴대폰">
                </p>
              </fieldset>
            </div>
            <!-- //라디오 버튼 탭 내용 -->
    
            <fieldset>
              <legend>새로운 예약</legend>
              <p>
                <span class="label">담당자</span>
                <span data-coach-name=""></span>
              </p>
              <p>
                <span class="label productList">예약할 이용권</span>
                <select id="productList" name="productList" title="상품">
                  <option value="-100" attr-product-pass="0" attr-payment="0" attr-pass-name="상담예약" data-class-time="50">상담예약</option>
                  <option value="-999" attr-product-pass="-999" attr-payment="0" attr-pass-name="OT상품" data-class-time="50">OT상품</option>
                </select>
              </p>
              <p class="time">
                <span class="label">시간</span>
                <!-- 달력 입력
                <span class="date_set">
                  <input class="calendar hasDatepicker" id="dp1494489909869" type="text">
                </span>
                -->
                <span>
                  <span class="c_blue" data-event-date=""></span>
                </span>
                <select name="event_stime_hour" title="시작시간">
                  
                    
                    <option value="00">00</option>
                  
                    
                    <option value="01">01</option>
                  
                    
                    <option value="02">02</option>
                  
                    
                    <option value="03">03</option>
                  
                    
                    <option value="04">04</option>
                  
                    
                    <option value="05">05</option>
                  
                    
                    <option value="06">06</option>
                  
                    
                    <option value="07">07</option>
                  
                    
                    <option value="08">08</option>
                  
                    
                    <option value="09">09</option>
                  
                    
                    <option value="10">10</option>
                  
                    
                    <option value="11">11</option>
                  
                    
                    <option value="12">12</option>
                  
                    
                    <option value="13">13</option>
                  
                    
                    <option value="14">14</option>
                  
                    
                    <option value="15">15</option>
                  
                    
                    <option value="16">16</option>
                  
                    
                    <option value="17">17</option>
                  
                    
                    <option value="18">18</option>
                  
                    
                    <option value="19">19</option>
                  
                    
                    <option value="20">20</option>
                  
                    
                    <option value="21">21</option>
                  
                    
                    <option value="22">22</option>
                  
                    
                    <option value="23">23</option>
                  
                </select>
                <i>:</i>
                <select name="event_stime_minute" title="시작시간">
                  <option>00</option>
                  <option>05</option>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                  <option>25</option>
                  <option>30</option>
                  <option>35</option>
                  <option>40</option>
                  <option>45</option>
                  <option>50</option>
                  <option>55</option>
                </select>
                <span>
                  <i></i>
                </span>
                <select name="event_etime_hour" title="종료시간">
                  
                    
                    <option value="00">00</option>
                  
                    
                    <option value="01">01</option>
                  
                    
                    <option value="02">02</option>
                  
                    
                    <option value="03">03</option>
                  
                    
                    <option value="04">04</option>
                  
                    
                    <option value="05">05</option>
                  
                    
                    <option value="06">06</option>
                  
                    
                    <option value="07">07</option>
                  
                    
                    <option value="08">08</option>
                  
                    
                    <option value="09">09</option>
                  
                    
                    <option value="10">10</option>
                  
                    
                    <option value="11">11</option>
                  
                    
                    <option value="12">12</option>
                  
                    
                    <option value="13">13</option>
                  
                    
                    <option value="14">14</option>
                  
                    
                    <option value="15">15</option>
                  
                    
                    <option value="16">16</option>
                  
                    
                    <option value="17">17</option>
                  
                    
                    <option value="18">18</option>
                  
                    
                    <option value="19">19</option>
                  
                    
                    <option value="20">20</option>
                  
                    
                    <option value="21">21</option>
                  
                    
                    <option value="22">22</option>
                  
                    
                    <option value="23">23</option>
                  
                </select>
                <i>:</i>
                <select name="event_etime_minute" title="종료시간">
                  <option>00</option>
                  <option>05</option>
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                  <option>25</option>
                  <option>30</option>
                  <option>35</option>
                  <option>40</option>
                  <option>45</option>
                  <option>50</option>
                  <option>55</option>
                </select>
                <span class="c_red" data-id="note" style="display:none; margin-left:115px; line-height:1.5">※ 시간대 변경은 권한이 필요합니다.</span>
              </p>
              <p>
                <label for="event_memo">개인레슨 이용권 메모</label>
                <textarea id="event_memo" name="event_memo">신규 스케줄</textarea>
              </p>
            </fieldset>
          </div>
          <!-- //탭 영역 - 새로운 예약 -->
    
          <!-- 탭 영역 - 기타 스케줄 추가 -->
          <div class="pop_tab_02" style="display: none;">
            <fieldset>
              <legend>새로운 예약</legend>
              <p>
                <span class="label">담당자</span>
                <span data-coach-name=""></span>
              </p>
              <p class="time">
                <span class="label">시간</span>
                <span>
                  <span class="c_blue" data-event-date=""></span>
                </span>
                <select name="event_stime_hour">
                  
                    
                    <option value="00">00</option>
                  
                    
                    <option value="01">01</option>
                  
                    
                    <option value="02">02</option>
                  
                    
                    <option value="03">03</option>
                  
                    
                    <option value="04">04</option>
                  
                    
                    <option value="05">05</option>
                  
                    
                    <option value="06">06</option>
                  
                    
                    <option value="07">07</option>
                  
                    
                    <option value="08">08</option>
                  
                    
                    <option value="09">09</option>
                  
                    
                    <option value="10">10</option>
                  
                    
                    <option value="11">11</option>
                  
                    
                    <option value="12">12</option>
                  
                    
                    <option value="13">13</option>
                  
                    
                    <option value="14">14</option>
                  
                    
                    <option value="15">15</option>
                  
                    
                    <option value="16">16</option>
                  
                    
                    <option value="17">17</option>
                  
                    
                    <option value="18">18</option>
                  
                    
                    <option value="19">19</option>
                  
                    
                    <option value="20">20</option>
                  
                    
                    <option value="21">21</option>
                  
                    
                    <option value="22">22</option>
                  
                    
                    <option value="23">23</option>
                  
                </select>
                <i>:</i>
                <select name="event_stime_minute">
                  
                    
                    <option value="00">00</option>
                  
                    
                    <option value="05">05</option>
                  
                    
                    <option value="10">10</option>
                  
                    
                    <option value="15">15</option>
                  
                    
                    <option value="20">20</option>
                  
                    
                    <option value="25">25</option>
                  
                    
                    <option value="30">30</option>
                  
                    
                    <option value="35">35</option>
                  
                    
                    <option value="40">40</option>
                  
                    
                    <option value="45">45</option>
                  
                    
                    <option value="50">50</option>
                  
                    
                    <option value="55">55</option>
                  
                </select>
                <span>
                  <i></i>
                </span>
                <select name="event_etime_hour">
                  
                    
                    <option value="00">00</option>
                  
                    
                    <option value="01">01</option>
                  
                    
                    <option value="02">02</option>
                  
                    
                    <option value="03">03</option>
                  
                    
                    <option value="04">04</option>
                  
                    
                    <option value="05">05</option>
                  
                    
                    <option value="06">06</option>
                  
                    
                    <option value="07">07</option>
                  
                    
                    <option value="08">08</option>
                  
                    
                    <option value="09">09</option>
                  
                    
                    <option value="10">10</option>
                  
                    
                    <option value="11">11</option>
                  
                    
                    <option value="12">12</option>
                  
                    
                    <option value="13">13</option>
                  
                    
                    <option value="14">14</option>
                  
                    
                    <option value="15">15</option>
                  
                    
                    <option value="16">16</option>
                  
                    
                    <option value="17">17</option>
                  
                    
                    <option value="18">18</option>
                  
                    
                    <option value="19">19</option>
                  
                    
                    <option value="20">20</option>
                  
                    
                    <option value="21">21</option>
                  
                    
                    <option value="22">22</option>
                  
                    
                    <option value="23">23</option>
                  
                </select>
                <i>:</i>
                <select name="event_etime_minute">
                  
                    
                    <option value="00">00</option>
                  
                    
                    <option value="05">05</option>
                  
                    
                    <option value="10">10</option>
                  
                    
                    <option value="15">15</option>
                  
                    
                    <option value="20">20</option>
                  
                    
                    <option value="25">25</option>
                  
                    
                    <option value="30">30</option>
                  
                    
                    <option value="35">35</option>
                  
                    
                    <option value="40">40</option>
                  
                    
                    <option value="45">45</option>
                  
                    
                    <option value="50">50</option>
                  
                    
                    <option value="55">55</option>
                  
                </select>
              </p>
              <p>
                <label for="event_memo">기타 스케줄 메모</label>
                <textarea id="event_memo" name="event_memo">기타 스케줄</textarea>
              </p>
            </fieldset>
          </div>
          <!-- //탭 영역 - 기타 스케줄 추가 -->
          </form>
    
        </div>
        <!-- 라디오 탭 -->
        <div class="pop_btn">
          <button type="button" class="btn gray" data-function="close">취소</button>
          <button type="button" class="btn blue" data-function="changeScheduleState" data-value="R" id="btnSave">예약하기</button>
          <button type="button" class="btn green" data-function="changeScheduleState" data-value="E">출석처리</button>
          <button type="button" class="btn red" data-function="changeScheduleState" data-value="A">결석처리</button>
          <button type="button" class="btn red" data-function="changeScheduleState" data-value="C">삭제처리</button>
        </div>
    
        <a href="#" class="close" data-function="close">팝업 닫기</a>
      </div>
    </div>
    
    
    
    <div data-template="">
      <div class="popup context_menu">
        <div class="title">이용상태변경</div>
        <ul class="functions">
          <!-- <li data-function="R">예약</li> -->
          <li data-function="E">출석 상태로 변경</li>
          <li data-function="A">결석 상태로 변경</li>
          <li data-function="C">취소 상태로 변경</li>
          <li data-function="pass">회원 이용권 관리</li>
          <li data-function="modify_schedule">예약 내역 수정</li>
          <li data-function="sendSms">SMS 보내기</li>
        </ul>
      </div>
    </div>
    
    
    
    <div class="popup pop_white change_confirm">
      <div class="box">
        <div class="pop_con">
          <div class="pop_caution">
            <span class="tit c_red">예약변경 주의!</span>
            <strong class="c_blue">김찬호</strong>님 예약을 정말로 변경하시겠습니까?<br> 예약시간 또는 담당자 변경 전에 반드시 회원과 상의해서 동의가 있어야 합니다. 예약이 변경되면 변경한 시간에는 새로운 예약을 할 수 있습니다.
          </div>
        </div>
        <div class="pop_btn">
          <button type="button" class="btn gray">취소</button>
          <button type="button" class="btn blue">네, 회원과 협의했습니다.</button>
        </div>
    
        <a href="#" class="close">팝업 닫기</a>
      </div>
    </div>
    
    
    <script src="/dhx/dhtmlxscheduler.js" type="text/javascript" charset="utf-8"></script>
    <script src="/dhx/ext/dhtmlxscheduler_multisection.js" type="text/javascript" charset="utf-8"></script>
    
    <link rel="stylesheet" href="/dhx/dhtmlxscheduler.css?v=20210701" type="text/css">
    
    <script src="/dhx/ext/dhtmlxscheduler_limit.js" type="text/javascript" charset="utf-8"></script>
    <script src="/dhx/ext/dhtmlxscheduler_timeline.js" type="text/javascript" charset="utf-8"></script>
    <script src="/dhx/ext/dhtmlxscheduler_units.js" type="text/javascript" charset="utf-8"></script>
    <script src="/dhx/ext/dhtmlxscheduler_multiselect.js" type="text/javascript" charset="utf-8"></script>
    <script src="/dhx/ext/dhtmlxscheduler_tooltip.js"></script>
    <script src="/dhx/ext/dhtmlxmenu.js"></script>
    
    
    
    <script src="/js/html2canvas.js"></script>
    
    
    <script src="/dhx/ext/dhtmlxscheduler_minical.js" type="text/javascript" charset="utf-8"></script>
    
    
    <script src="/dhx/locale/locale_ko.js" type="text/javascript" charset="utf-8"></script>
    
    
    <script src="/js/scheduler/promise/scheduleList.js?v=20211007" type="text/javascript" charset="utf-8"></script>
    <script src="/js/scheduler/promise/schedulePopup.js?v=20210617" type="text/javascript" charset="utf-8"></script>
    <script src="/js/scheduler/promise/contextMenu.js?v=20200916" type="text/javascript" charset="utf-8"></script>
    <script src="/js/scheduler/promise/contextPopup.js?v=20210604" type="text/javascript" charset="utf-8"></script>
    <script src="/js/scheduler/settingScheduler.js?v=20211008" type="text/javascript" charset="utf-8"></script>
    <script src="/resources/js/controller/appointmentTypeScheduleController.js"></script>
    <script src="/resources/js/controller/permissionController.js"></script>
    <script src="/resources/js/controller/memberController.js"></script>
    <script src="/resources/js/controller/smsController.js"></script>
    <script src="/resources/js/popup/smsSendPopup.js"></script>
    <script src="/resources/js/popup/smsSendAdvertiseGuidePopup.js"></script>
    <script src="/resources/js/resultData.js?v=20210604"></script>
    
    <!-- dhtmlx css -->
    <style media="screen">
      .red_section {
        background-color: red;
        opacity: 0.25;
        filter: alpha(opacity = 25);
      }
    
      .yellow_section {
        background-color: #ffa749;
        opacity: 0.25;
        filter: alpha(opacity = 25);
      }
    
      .green_section {
        background-color: #12be00;
        opacity: 0.25;
        filter: alpha(opacity = 25);
      }
    
      .offday_section {
        background-color: #f7d6d7;
        opacity: 0.5;
        filter: alpha(opacity = 50);
      }
    
      .blue_section {
        background-color: #2babf5;
        opacity: 0.27;
        filter: alpha(opacity = 27);
      }
    
      .pink_section {
        background-color: #6a36a5;
        opacity: 0.30;
        filter: alpha(opacity = 30);
      }
    
      .dark_blue_section {
        background-color: #2ca5a9;
        opacity: 0.40;
        filter: alpha(opacity = 40);
      }
    
      .dots_section {
        background-image: url(data/imgs/dots.png);
      }
    
      .fat_lines_section {
        background-image: url(data/imgs/fat_lines.png);
      }
    
      .medium_lines_section {
        background-image: url(data/imgs/medium_lines.png);
      }
    
      .small_lines_section {
        background-image: url(data/imgs/small_lines.png);
      }
    
      .dhx_cal_event {
        z-index: 1;
        cursor: pointer;
      }
      .highlighted_timespan {
        background-color: #87cefa;
        opacity:0.5;
        filter:alpha(opacity=50);
        cursor: pointer;
        z-index: 0;
      }
    
      .dhx_cal_event.multisection div{
        background-color: inherit;
      }
    
      .section_1{
        background-color: #49A223;
      }
      .section_2{
        background-color: #e29e2e;
      }
      .section_3{
        background-color: #c53b64;
      }
      .section_4{
        background-color: #6e7dc5;
      }
    
      .ui-datepicker{ font-size: 12px; width: 250px; }
    
      .context_menu {
        position: absolute;
        z-index: 15;
        font-weight: bold;
        background-color: #fff;
        border: 1px solid #bdbdbd;
        cursor: default;
        border-radius: 10px;
          overflow: hidden;
          min-width: 150px;
          text-align: center;
      }
    
      .context_menu .title {
        font-size: 16px;
        padding: 10px;
        background-color: #6e6e6e;
          color: #FFF;
      }
    
      .context_menu ul.functions {
        font-size: 13px;
      }
    
      .context_menu ul.functions li {
        padding: 10px;
        border-bottom: 1px solid #e3e3e3;
        color: #6e6e6e;
      }
    
      .context_menu ul.functions li:hover {
        background-color: #eee;
      }
    
      .dhx_cal_container									{width:100%; height:100%}
    
      .dhx_cal_navline									{/*font-family:"Noto Sans KR"*/}
      .dhx_cal_navline div								{position:static; display:inline-block; top:0}
      .dhx_cal_navline .ui-datepicker-header				{position:relative; display:block; text-align:center}
    
      .dhx_cal_navline .left								{position:absolute; left:50px; top:14px; font-size:0}
      .dhx_cal_navline .left select						{width:125px; min-width:125px}
      .dhx_cal_navline .left select,
      .dhx_cal_navline .left button						{margin-left:10px}
      .dhx_cal_navline .left button.config				{margin:0; margin-right:10px; width:40px; height:34px; background:white url(/static/img/icon/icon_view_gray.png) no-repeat center center / 20px; border:1px solid #ccc}
    
      .dhx_cal_navline .left .tab div						{position:relative; display:inline-block; vertical-align:top; left:auto !important; top:auto; font-family:inherit}
      .dhx_cal_navline .left .tab .dhx_cal_tab 			{position:relative; left:0; top:0; display:inline-block; vertical-align:top; width:75px; height:34px; background-color:white; border-radius:0; border:1px solid #004fec; line-height:34px; font-weight:normal !important; color:#004fec; text-shadow:none; box-sizing:border-box !important}
      .dhx_cal_navline .left .tab .dhx_cal_tab.active 	{background-color:#004fec; border-color:#004fec; font-weight:normal !important; color:white}
    
      .dhx_cal_navline .left .calendar					{position:relative; margin-left:10px; width:40px; height:34px}
      .dhx_cal_navline .left .calendar > div				{position:absolute; left:0; top:34px !important; font-size:16px}
      .dhx_cal_navline .left .calendar > button			{position:relative; margin:0; width:100%; height:100%; background:white url(/static/img/icon/icon_print_calendar_gray.png) no-repeat center 50%; border:1px solid #ccc; font-size:0; overflow:hidden}
    
      .dhx_cal_navline .center							{}
    
      .dhx_cal_navline .right								{position:absolute; right:17px; top:14px}
      .dhx_cal_navline .right .calendar					{margin-left:15px; border:1px solid #ccc; font-size:0}
      .dhx_cal_navline .right .calendar div				{height:32px; background-color:white; border-radius:0; border:none; line-height:32px; color:#333}
      .dhx_cal_navline .right .calendar div + div			{border-left:1px solid #ccc}
    
      .dhx_cal_navline .right .state						{font-size:13px}
      .dhx_cal_navline .right .state ul li				{float:left; line-height:34px}
      .dhx_cal_navline .right .state ul li + li			{margin-left:20px}
      .dhx_cal_navline .right .state ul li span			{margin-left:4px; font-size:18px}
      .dhx_cal_navline .right .state ul li.c_01 span		{color:#5f52a0}
      .dhx_cal_navline .right .state ul li.c_02 span		{color:#8c85b0}
      .dhx_cal_navline .right .state ul li.c_03 span		{color:#d65664}
      .dhx_cal_navline .right .state ul li.c_04 span		{color:#f47119}
      .dhx_cal_navline .right .state ul li.c_05			{position:relative; padding-right:30px}
      .dhx_cal_navline .right .state ul li.c_05:before	{content:""; position:absolute; top:0; right:0; bottom:0; margin:auto 0; width:20px; height:20px; background-color:#f7d6d7; border:1px solid #ccc}
    
      input[type="radio"]:checked:disabled + label:before	{filter: grayscale(100%)}
    </style>
    
    <!-- 로컬 네비게이션 바 (2.0) -->
    <nav class="ui-nav" data-index="스케줄러">
      <div class="right">
        <a class="focus" href="/manager/schedule/promise">개인레슨 스케줄</a>
        <a href="/manager/schedule/class">그룹수업 스케줄</a>
        <a href="/manager/schedule/lesson">그룹수업 관리</a>
        <a href="/manager/reservation/index">예약내역</a>
      </div>
    <div class="quick">
          <a class="home" href="/home"></a>
          <a class="back" href="javascript:uiHistory.back()" data-event="uiHistoryBack"></a>
          <a class="refresh" href="javascript:window.location.reload(true)"></a>
        </div></nav>
    
    <div class="scheduler_area" style="height: 1240px;">
      <div id="scheduler_here" class="dhx_cal_container size10 dhx_scheduler_unit" style="">
        <div class="dhx_cal_navline" style="width: 1782px; height: 59px; left: 0px; top: 0px;">
          <div class="left">
            <button class="config" data-function="configScheduler"></button>
            <div class="tab">
              <div class="dhx_cal_tab" name="week_tab" style="right: auto; left: 75px;">주</div>
              <div class="dhx_cal_tab dhx_cal_tab_standalone active" name="unit_tab" style="right: auto; left: 211px;">일</div>
            </div>
            <div class="calendar">
              <button id="btn_calendar"></button>
              <div id="navi_calendar" class="hasDatepicker" style="top: 48px; left: 0px; display: none;"><div class="ui-datepicker-inline ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" style="display: block;"><div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all"><a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="이전달"><span class="ui-icon ui-icon-circle-triangle-w">이전달</span></a><a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="다음달"><span class="ui-icon ui-icon-circle-triangle-e">다음달</span></a><div class="ui-datepicker-title"><span class="ui-datepicker-year">2021</span>년&nbsp;<span class="ui-datepicker-month">10월</span></div></div><table class="ui-datepicker-calendar"><thead><tr><th scope="col" class="ui-datepicker-week-end"><span title="일요일">일</span></th><th scope="col"><span title="월요일">월</span></th><th scope="col"><span title="화요일">화</span></th><th scope="col"><span title="수요일">수</span></th><th scope="col"><span title="목요일">목</span></th><th scope="col"><span title="금요일">금</span></th><th scope="col" class="ui-datepicker-week-end"><span title="토요일">토</span></th></tr></thead><tbody><tr><td class=" ui-datepicker-week-end ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">1</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">2</a></td></tr><tr><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">3</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">4</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">5</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">6</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">7</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">8</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">9</a></td></tr><tr><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">10</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">11</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">12</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">13</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">14</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">15</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">16</a></td></tr><tr><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">17</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">18</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">19</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">20</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">21</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">22</a></td><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">23</a></td></tr><tr><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">24</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">25</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">26</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">27</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">28</a></td><td class=" " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">29</a></td><td class=" ui-datepicker-week-end ui-datepicker-days-cell-over  ui-datepicker-current-day ui-datepicker-today" data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default ui-state-highlight ui-state-active ui-state-hover" href="#">30</a></td></tr><tr><td class=" ui-datepicker-week-end " data-handler="selectDay" data-event="click" data-month="9" data-year="2021"><a class="ui-state-default" href="#">31</a></td><td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td><td class=" ui-datepicker-week-end ui-datepicker-other-month ui-datepicker-unselectable ui-state-disabled">&nbsp;</td></tr></tbody></table></div></div>
            </div>
            <!--
            <select name="seqOffice" data-event="changeOffice">
              <option class="">지점 선택</option>
              <option class="0" selected>본점</option>
            </select>
            -->
            <select id="coachList" name="coachList"><option value="">강사 선택</option><option value="21697">바른샘</option><option value="21696">하나골프 강사</option><option value="9806">이석훈</option><option value="20000">골프 프로</option><option value="17471">이민주</option><option value="9817">김반석</option><option value="9816">홍준선</option><option value="18429">필라테스 전문가</option><option value="19677">박동훈</option><option value="21611">DG 강사 </option><option value="17192">문동규 강사</option><option value="21610">알파 강사</option><option value="21413">고종익</option><option value="21457">티나 강사 (테스트)</option><option value="21409">청담 강사 (테스트)</option><option value="20697">나인원 강사 (테스트)</option><option value="21160">윤지영</option><option value="20031">전라원</option><option value="17122">강동원</option><option value="19704">정찬복</option><option value="21047">정두리</option><option value="21364">이행행</option><option value="20962">블리스포인트 프로</option><option value="20749">찐우</option><option value="20590">테니스 강사 (테스트)</option><option value="20587">황의천(부스터)</option><option value="19610">점장리동무</option><option value="9807">기본관리자</option><option value="18935">전상훈 </option><option value="19624">소피아</option><option value="13508">장유진 강사 (테스트)</option><option value="18685">홍상혁</option><option value="17045">이민주(테스트)</option><option value="17422">조시영</option><option value="14510">요가 강사 (테스트)</option><option value="14597">민윤정</option></select>
            <button class="btn white" data-function="settingScheduler">스케줄 설정</button>
          </div>
          <div class="center">
            <div class="dhx_cal_date date_left">2021년 10월 30일 토요일</div>
          </div>
          <div class="right">
            <div class="state">
              <ul id="schedule_state"><li class="c_01"> 예약 <span>0</span> </li><li class="c_02"> 출석 <span>0</span> </li><li class="c_03"> 결석 <span>0</span> </li><li class="c_04"> 취소 <span>0</span> </li><li class="c_05"> 휴일 </li></ul>
            </div>
            <div class="calendar">
              <div class="dhx_cal_prev_button"></div>
              <div class="dhx_cal_today_button">오늘</div>
              <div class="dhx_cal_next_button"></div>
            </div>
          </div>
        </div>
        <div class="scheduler">
          <div class="dhx_cal_header" style="width: 1714px; height: 20px; left: 50px; top: 60px;"><div class="dhx_scale_bar" style="width: 243px; height: 18px; left: 0px; top: 0px;">바른샘</div><div class="dhx_scale_bar" style="width: 244px; height: 18px; left: 244px; top: 0px;">하나골프 강사</div><div class="dhx_scale_bar" style="width: 244px; height: 18px; left: 489px; top: 0px;">이석훈</div><div class="dhx_scale_bar" style="width: 244px; height: 18px; left: 734px; top: 0px;">골프 프로</div><div class="dhx_scale_bar" style="width: 244px; height: 18px; left: 979px; top: 0px;">이민주</div><div class="dhx_scale_bar" style="width: 244px; height: 18px; left: 1224px; top: 0px;">김반석</div><div class="dhx_scale_bar" style="width: 244px; height: 18px; left: 1469px; top: 0px;">홍준선<div class="dhx_cal_next_button" style="left: auto; right: 0px; top: 2px; position: absolute;">&nbsp;</div></div></div>
          <div class="dhx_multi_day" style="visibility: hidden; width: 1782px; height: 0px; left: 0px; top: 81px;"><div class="dhx_multi_day_icon" style="visibility: hidden; width: 50px; height: 0px; left: 0px; top: 81px;"></div></div><div class="dhx_cal_data" style="width: 1782px; height: 159px; left: 0px; top: 81px;"><div class="dhx_scale_holder_now " style="width: 243px; height: 616px; left: 51px; top: 0px;"><div class="dhx_marked_timespan green_section" style="top: 88px; height: 440px; line-height: 440px;"></div><div class="dhx_marked_timespan highlighted_timespan" style="top: 154px; height: 44px; line-height: 44px;"></div></div><div class="dhx_scale_holder_now " style="width: 244px; height: 616px; left: 295px; top: 0px;"><div class="dhx_marked_timespan green_section" style="top: 88px; height: 440px; line-height: 440px;"></div><div class="dhx_marked_timespan highlighted_timespan" style="top: 154px; height: 44px; line-height: 44px;"></div></div><div class="dhx_scale_holder_now " style="width: 244px; height: 616px; left: 540px; top: 0px;"><div class="dhx_marked_timespan highlighted_timespan" style="top: 154px; height: 44px; line-height: 44px;"></div></div><div class="dhx_scale_holder_now " style="width: 244px; height: 616px; left: 785px; top: 0px;"><div event_id="C_4414347" class="dhx_cal_event" style="position:absolute; top:220px; left:1px; width:240px; height:40px;"><div class="dhx_event_move dhx_header" style=" width:238px;background:#3aab32;">&nbsp;</div><div class="dhx_event_move dhx_title" style="background:#3aab32;"><div class="center">13:00 - 13:30</div></div><div class="dhx_body" style=" width:230px; height:11px;background:#3aab32;">골프 타석 30분 / 골프 프로 / 2명</div><div class="dhx_event_resize dhx_footer" style=" width:236px;background:#3aab32;"></div></div><div event_id="C_4443462" class="dhx_cal_event" style="position:absolute; top:264px; left:1px; width:240px; height:40px;"><div class="dhx_event_move dhx_header" style=" width:238px;background:#3aab32;">&nbsp;</div><div class="dhx_event_move dhx_title" style="background:#3aab32;"><div class="center">14:00 - 14:30</div></div><div class="dhx_body" style=" width:230px; height:11px;background:#3aab32;">골프 타석 30분 / 골프 프로 / 1명</div><div class="dhx_event_resize dhx_footer" style=" width:236px;background:#3aab32;"></div></div><div class="dhx_marked_timespan highlighted_timespan" style="top: 154px; height: 44px; line-height: 44px;"></div></div><div class="dhx_scale_holder_now " style="width: 244px; height: 616px; left: 1030px; top: 0px;"><div class="dhx_marked_timespan highlighted_timespan" style="top: 154px; height: 44px; line-height: 44px;"></div></div><div class="dhx_scale_holder_now " style="width: 244px; height: 616px; left: 1275px; top: 0px;"><div class="dhx_marked_timespan green_section" style="top: 88px; height: 484px; line-height: 484px;"></div><div class="dhx_marked_timespan highlighted_timespan" style="top: 154px; height: 44px; line-height: 44px;"></div></div><div class="dhx_scale_holder_now " style="width: 244px; height: 616px; left: 1520px; top: 0px;"><div event_id="C_4414346" class="dhx_cal_event" style="position:absolute; top:44px; left:1px; width:240px; height:168.66666666666666px;"><div class="dhx_event_move dhx_header" style=" width:238px;background:#3aab32;">&nbsp;</div><div class="dhx_event_move dhx_title" style="background:#3aab32;"><div class="center">09:00 - 12:50</div></div><div class="dhx_body" style=" width:230px; height:139.66666666666666px;background:#3aab32;">주말 특강 / 홍준선 / 4명</div><div class="dhx_event_resize dhx_footer" style=" width:236px;background:#3aab32;"></div></div><div class="dhx_marked_timespan highlighted_timespan" style="top: 154px; height: 44px; line-height: 44px;"></div></div><div class="dhx_scale_holder_now"><div class="dhx_scale_hour" style="height: 44px; width: 50px;">08:00</div><div class="dhx_scale_hour" style="height: 44px; width: 50px;">09:00</div><div class="dhx_scale_hour" style="height: 44px; width: 50px;">10:00</div><div class="dhx_scale_hour" style="height: 44px; width: 50px;">11:00</div><div class="dhx_scale_hour" style="height: 44px; width: 50px;">12:00</div><div class="dhx_scale_hour" style="height: 44px; width: 50px;">13:00</div><div class="dhx_scale_hour" style="height: 44px; width: 50px;">14:00</div><div class="dhx_scale_hour" style="height: 44px; width: 50px;">15:00</div><div class="dhx_scale_hour" style="height: 44px; width: 50px;">16:00</div><div class="dhx_scale_hour" style="height: 44px; width: 50px;">17:00</div><div class="dhx_scale_hour" style="height: 44px; width: 50px;">18:00</div><div class="dhx_scale_hour" style="height: 44px; width: 50px;">19:00</div><div class="dhx_scale_hour" style="height: 44px; width: 50px;">20:00</div><div class="dhx_scale_hour" style="height: 44px; width: 50px;">21:00</div></div></div>
        </div>
      </div>
    
      <div class="modal fade bs-example-modal-sm" id="menuModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content" style="margin-top: 200px;">
            <div class="modal-header text-center">
              <h4 class="modal-title">서비스 메뉴를 선택 하세요.</h4>
            </div>
            <div class="modal-body">
              <button type="button" style="width:100%;margin-bottom:10px;" id="btnAddTrainer">예약상태 변경</button>
              <button type="button" style="width:100%;" id="btnAddTrainer">개인레슨 이용권 예약정보 수정</button>
            </div>
            <div class="modal-footer">
              <!-- <button type="button" class="btn btn-primary" id="btnAddTrainer">선택된 강사 추가</button> -->
              <button type="button" class="btn btn-default" id="btnClose" data-dismiss="modal">닫기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <script type="text/javascript">
    
    $(document).ready(function() {
      const setSchedulerHeight = function() {
        const scheduler = document.querySelector(".scheduler_area");
        const screen = document.documentElement.clientHeight || document.body.clientHeight;
        let header = document.querySelector(".ui-header");
        header = (header) ? header.offsetHeight : 0;
        let nav = document.querySelector(".ui-nav");
        nav = (nav) ? nav.offsetHeight : 0;
        scheduler.style.height = (screen - header - nav) + "px";
      };
      window.addEventListener("resize", setSchedulerHeight);
      setSchedulerHeight();
    
    
      jQuery('#scheduler_here').show();
    
      schedulePopup.setCoach();
    
      //schedulePopup.setProduct();
    
      schedulePopup.setEvent();
    
      schedulePopup.setPopupBtn();
    
    
      // 권한 셋팅
      PermissionController.get('', function(returnData) {
        loginCoachData.permission = returnData;
      });
    
      // 현재 로그인한 강사 셋팅
      loginCoachData.seqPartnerCoach = '9807';
    
    
      scheduleList.init();
    
      var seqCoachParam = '';
      if (seqCoachParam !== '') {
        $('#coachList').val(seqCoachParam);
        $('#coachList').trigger('change');
    
        var lessonDate = '';
        if (lessonDate !== '') {
          pickDate(lessonDate);
        }
      }
    
    
      $("#navi_calendar").filter(function(){
        var $this = $(this),
          $btn =$("#btn_calendar"),
          $pos = $btn.position(),
            $left = $pos.left,
            $top = parseInt($btn.outerHeight(true) + 14);
    
        $(this).css({top: $top,left: $left}).hide()
    
        $btn.click(function(){
            $("#navi_calendar").toggle();
        });
      });
    
      $('#navi_calendar').datepicker({
            dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
            dateFormat: 'yy.mm.dd',
            inline: true,
            firstDay: 0,
            onSelect: function(rtnDate){
              pickDate(rtnDate);
        }
      });
    });
    
    
    let loginCoachData = {
      permission : {},
      seqPartnerCoach : {}
    };
    
    
    var pickDate = function(rtnDate) {
      var formatFuncYYMMDD = scheduler.date.date_to_str("%Y-%m-%d");
      var formatFuncStrToDate = scheduler.date.str_to_date("%Y-%m-%d %H:%i:%s");
      var selDate = formatFuncStrToDate(rtnDate);
    
      scheduler.deleteMarkedTimespan();
      scheduleList.getWeekCoachScheduleList(selDate);
      scheduleList.getWeekCoachPromiseScheduleList(selDate);
      scheduleList.getWeekClassList(selDate);
    
      var formatFuncYY = scheduler.date.date_to_str("%Y");
      var formatFuncMM = scheduler.date.date_to_str("%m");
      var formatFuncDD = scheduler.date.date_to_str("%d");
    
      var year = formatFuncYY(selDate);
      var month = formatFuncMM(selDate);
      var day = formatFuncDD(selDate);
    
      //전달 계산
      var date = new Date(selDate);
      var firstDayOfMonth = new Date( date.getFullYear(), date.getMonth() , 1 );
      var lastMonth = new Date ( firstDayOfMonth.setDate( firstDayOfMonth.getDate() - 1 ) );
      var cal_month =formatFuncMM(lastMonth);
      console.log("##############cal_month" + formatFuncMM(lastMonth));
    
      year = formatFuncYY(lastMonth);
    
      var seqCoach = "";
      var searchSDate = "";
      var searchEDate = "";
      if($("#schedule_mode").val() == "week") {
        searchSDate = formatFuncYYMMDD(scheduler.date.week_start(selDate));
        searchEDate = formatFuncYYMMDD(scheduler.date.add(searchSDate, 7, 'day'));
        seqCoach = $("#coachList").val();
    
        scheduler.updateView(new Date(year,cal_month,day), "week");
      } else if ($("#schedule_mode").val() == "unit") {
        searchSDate = formatFuncYYMMDD(selDate);
        nextDate = scheduler.date.add(new Date(selDate), 1, 'day');
        searchEDate = formatFuncYYMMDD(nextDate);
        seqCoach = "";
    
        scheduler.updateView(new Date(year,cal_month,day), "unit");
      }
    
      schedulePopup.setScheduleStatCount(searchSDate, searchEDate, seqCoach);
      scheduler.setCurrentView();
    
      $("#navi_calendar").hide();
    };
    
    //############################ common ##################################
    String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/gi, "");
    };
    
    
    $.fn.clearForm = function() {
      return this.each(function() {
        const type = this.type, tag = this.tagName.toLowerCase();
        if (tag === 'form'){
          return $(':input',this).clearForm();
        }
        if (type === 'text' || type === 'password' || type === 'hidden' || type === 'number' || tag === 'textarea'){
          this.value = '';
        }else if (type === 'checkbox' || type === 'radio'){
          this.checked = false;
        }else if (tag === 'select'){
          this.selectedIndex = -1;
        }
      });
    };
    
    </script>
    
    
  </div>
<?php
include_once(G5_THEME_PATH.'/tail.php');