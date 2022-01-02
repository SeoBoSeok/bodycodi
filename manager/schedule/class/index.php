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

	<!-- 콘텐츠 -->
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
					<p style="padding-left:160px">※ 스케줄러 메뉴 진입 시 기본 표시 스케줄러 선택</p>
				</span>
			</p>
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
					<tbody data-function="sortCoachList">
						<tr data-function="sortable">
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
		<h2><custom-before-state>예약</custom-before-state> > <custom-change-state>출석</custom-change-state></h2>
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
					<fieldset  id="ticketClassScheduleSeatField" class="hidden">
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
		<h2><custom-before-state>예약</custom-before-state> > <custom-change-state>출석</custom-change-state></h2>
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



<div data-template>
	<style type="text/css">
		.popup .box .pop_btn button:disabled{
			background-color:#ccc !important;
		}
	</style>
	<div class="popup context_menu" data-end-schedule="false">
		<div class="title">이용 상태 변경</div>
		<ul class="functions">
			<!--<li data-function="info_class">예약 또는 예약목록 보기</li>-->
			<li data-function="detail_class">예약 또는 예약목록 보기</li>
			<li data-function="modify_class">수업 수정</li>
			<li data-function="수업 정보 보기">수업 정보</li>
			<li data-function="cancel_class">수업 취소</li>
		</ul>
		<a href="#" class="close">닫기</a>
	</div>

	<div class="popup context_menu" data-end-schedule="true">
		<div class="title">수업 관리</div>
		<ul class="functions">
			<li data-function="end_schedule_detail_class">참석현황과 회원추가</li>
			
			<li data-function="수업 정보 보기">수업 정보</li>
		</ul>
	</div>


	<!-- 수업 클릭 시(수업 종료 이전) -->
	<div class="popup pop_white info_class_before">
		<div class="box" style="width:640px !important">
			<h2><span class="select_day"><custom-schedule-date-time>2017년 3월 13일 10:00</custom-schedule-date-time></span><custom-class-name>필록싱 수업 회원 추가하기</custom-class-name></h2>
			<form name="classScheduleForm" id="classScheduleForm">
				<div class="pop_con">
					<div class="box_input">
						<div class="search">
							<fieldset>
								<legend>회원 검색</legend>
								<p class="btn_plus">
									<input name="member_name" placeholder="이름 또는 휴대전화번호" type="text">
									<button type="button" class="icon small search_d" data-function="searchMember">검색</button>
								</p>
								<button type="button" class="btn blue" data-function="save" id="btnSaveSchedule">예약하기</button>
								<button type="button" class="btn gray" data-function="wait" id="btnWaitSchedule">예약대기</button>
							</fieldset>
						</div>
						<div id="search_container" class="search_result" data-design="searchMemberContainer" style="display: none;">
							<ul id="memberListResult" data-grid="searchMemberResult"></ul>
						</div>
					</div>


					<div class="box_input" data-template="productUsage" style="display: none;">
						<fieldset>
							<legend>이용권 선택</legend>
							<p class="btn_plus">
								<select name="productUsage" title="이용권 선택" style="width: 388px"></select>
							</p>
						</fieldset>
						<fieldset  id="classScheduleSeatField" class="hidden">
							<legend>좌석 선택</legend>
							<p class="btn_plus">
								<select id="classScheduleSeatNo" title="좌석 선택" style="width: 50%"></select>
							</p>
						</fieldset>
					</div>

					<h3 style="margin-bottom:0">수업 예약자 목록</h3>
					<div class="state_box">
						<p class="after_change">
							참석회원 수: <strong class="c_green text_space"><custom-data-attendant>6명</custom-data-attendant></strong>
							출석: <strong class="c_green text_space"><custom-data-reserve-attendant>6명</custom-data-reserve-attendant></strong>
							예약결석: <strong class="c_red text_space"><custom-data-absent>6명</custom-data-absent></strong>
							
						</p>
					</div>
					<div class="table_area booker" style="max-height: 410px;">
						<table>
							<thead>
								<tr>
									<th style="width: 8%">
										<input id="bookingUserListAll" type="checkbox" name="seqSchedule" value="">
										<label for="bookingUserListAll">&nbsp;</label>
									</th>
									<th style="width: 12.5%">이름</th>
									<th style="width: 22.5%">휴대폰번호</th>
									<th style="width: 30%">예약 일시</th>
									<th style="width: 15%" id="thCalsScheduleMemberStatus" id="thCalsScheduleMemberStatus" colspan="1">상태</th>
									<th style="width: 8%" id="thClasScheduleMemberSeatNo">좌석</th>
									<th style="width: 17.5%">비고</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td><input id="booking_user_list_01" type="radio"><label for="booking_user_list_01">&nbsp;</label></td>
									<td><a href="#">김이박</a></td>
									<td>010-4185-4154</td>
									<td>2017-03-21 08:40</td>
									<td>출석</td>
									<td>출석</td>
									<td>네이버 예약</td>
								</tr>
								<tr>
									<td><input id="booking_user_list_02" type="radio"><label for="booking_user_list_02">&nbsp;</label></td>
									<td><a href="#">김이박</a></td>
									<td>010-4185-4154</td>
									<td>2017-03-21 08:40</td>
									<td>결석</td>
									<td>출석</td>
									<td>네이버 예약</td>
								</tr>
								<tr>
									<td><input id="booking_user_list_05" type="radio"><label for="booking_user_list_05">&nbsp;</label></td>
									<td><a href="#">김이박</a></td>
									<td>010-4185-4154</td>
									<td>2017-03-21 08:40</td>
									<td>
										<div class="c_red">예약취소</div>
									</td>
									<td>네이버 예약</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div style="margin-top:10px">
						<p>※ 대기 회원은 예약이나 취소 상태로만 전환이 가능하고 출석이나 결석처리 할 수 없습니다.	</p>
						<p>선택된 인원 : <span data-msg="memberCount">0</span>명</p>
					</div>
				</div>
			</form>

			<div class="pop_btn">
				<button type="button" class="btn gray" data-function="changeState" data-value="C">내역취소</button>
				<button type="button" class="btn blue" data-function="changeState" data-value="R">예약처리</button>
				<button type="button" class="btn red" data-function="changeState" data-value="A">결석처리</button>
				<button type="button" class="btn green" data-function="changeState" data-value="E">출석처리</button>
				<button type="button" class="btn gray" data-function="close">확인</button>
			</div>

			<a href="#" class="close" data-function="close">팝업 닫기</a>
		</div>
	</div>


	<!-- 수업 클릭 시(수업 종료 이후) -->
	<div class="popup pop_white info_class_after">
		<div class="box" style="width:640px !important">
			<h2><span class="select_day"><custom-schedule-date-time>2017년 3월 13일 10:00</custom-schedule-date-time></span><custom-class-name>필록싱 수업 회원 추가하기</custom-class-name></h2>
			<div class="pop_con">
				<h3>출석한 회원 추가하기</h3>
				<div class="box_input">
					<div class="search">
						<fieldset>
							<legend>회원 검색</legend>
							<p class="btn_plus" style="position:relative; width:184px;">
								<input value="" name="member_name" placeholder="이름 또는 휴대전화번호" type="text" style="padding-right:30px;">
								<button type="button" class="icon small search_d" style="right:4px" data-function="searchMember">검색</button>
							</p>
							<button type="button" class="btn green block_btn" data-function="insertPastSchedule" data-value="E">출석하기</button>
							<button type="button" class="btn red block_btn" data-function="insertPastSchedule" data-value="A">결석하기</button>
						</fieldset>
					</div>
					<div id="search_container" class="search_result" data-design="searchMemberContainer" style="display: none;">
						<ul id="memberListResult" data-grid="searchMemberResult">
							<li>
								<input id="select_01" type="checkbox">
								<label for="select_01"><strong>김민정</strong><span>010-0000-1234</span></label>
							</li>
							<li>
								<input id="select_02" type="checkbox">
								<label for="select_02"><strong>배정남</strong><span>010-0000-1234</span></label>
							</li>
						</ul>
					</div>


					<div class="box_input" data-template="productUsage" style="display: none;">
						<fieldset>
							<legend>이용권 선택</legend>
							<p class="btn_plus">
								<select name="productUsage" title="이용권 선택" style="width: 388px"></select>
							</p>
						</fieldset>
						<fieldset  id="completeClassScheduleSeatField" class="hidden">
							<legend>좌석 선택</legend>
							<p class="btn_plus">
								<select id="completeClassScheduleSeatNo" title="좌석 선택" style="width: 50%"></select>
							</p>
						</fieldset>
					</div>


					<div class="pop_txt_list">
						<ul style="margin-top:0px;" class="c_red">
							<li>출석회원 또는 결석회원을 추가하면 해당 회원은 출석, 결석 여부에 따라 이용권 이용 횟수도 설정에 따라 적용됩니다.</li>
						</ul>
					</div>
					<div class="search">
						<fieldset>
							<legend>참석한 회원 수</legend>
							<p class="btn_plus" style="width:150px;">
								<input name="attendantCnt" placeholder="인원 수" type="number" style="margin:0 0 0 0;">
							</p>
							<button type="button" class="btn dark block_btn" data-function="insertGroupClassSchedule">수업완료</button>
						</fieldset>
					</div>

					<div class="pop_txt_list" data-msg="complete-status">
						<ul style="margin-top:0px;" class="c_red">
							<li>현재는 수업완료 상태가 아닙니다.</li>
							<li>수업 완료를 선택하지 않으면 그룹수업 이용권 진행에 대한 수당 정산이 추가되지 않습니다.</li>
						</ul>
					</div>
				</div>

				<h3>수업 예약자 목록</h3>
				<div class="state_box">
					<p class="after_change">
						참석회원 수: <strong class="c_green text_space"><custom-data-attendant>6명</custom-data-attendant></strong>
						출석: <strong class="c_green text_space"><custom-data-reserve-attendant>6명</custom-data-reserve-attendant></strong>
						예약결석: <strong class="c_red text_space"><custom-data-absent>6명</custom-data-absent></strong>
						
					</p>
				</div>

				<div class="table_area booker">
					<table>
						<thead>
							<tr>
								<th style="width: 8%">
									<input id="afterBookingUserListAll" type="checkbox" name="seqSchedule" value="">
									<label for="afterBookingUserListAll">&nbsp;</label>
								</th>
								<th style="width: 12.5%">이름</th>
								<th style="width: 22.5%">휴대폰번호</th>
								<th style="width: 30%">예약 일시</th>
								<th style="width: 15%" id="thCalsScheduleMemberStatus" colspan="1">상태</th>
								<th style="width: 8%" id="thClasScheduleMemberSeatNo">좌석</th>
								<th style="width: 17.5%">비고</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><input id="booking_user_list_01" type="radio"><label for="booking_user_list_01">&nbsp;</label></td>
								<td><a href="#">김이박</a></td>
								<td>010-4185-4154</td>
								<td>2017-03-21 08:40</td>
								<td>출석</td>
								<td>네이버 예약</td>
							</tr>
							<tr>
								<td><input id="booking_user_list_02" type="radio"><label for="booking_user_list_02">&nbsp;</label></td>
								<td><a href="#">김이박</a></td>
								<td>010-4185-4154</td>
								<td>2017-03-21 08:40</td>
								<td>결석</td>
								<td>네이버 예약</td>
							</tr>
							<tr>
								<td><input id="booking_user_list_03" type="radio"><label for="booking_user_list_03">&nbsp;</label></td>
								<td><a href="#">김이박</a></td>
								<td>010-4185-4154</td>
								<td>2017-03-21 08:40</td>
								<td>
									<div class="c_red">예약취소</div>
								</td>
								<td>네이버 예약</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div style="margin-top:10px">선택된 인원 : <span data-msg="memberCount">0</span>명</div>
			</div>

			<div class="pop_btn">
				<button type="button" class="btn gray" data-function="changeState" data-value="C">내역취소</button>
				<button type="button" class="btn red align_right" data-function="changeState" data-value="A">결석처리</button>
				<button type="button" class="btn green align_right" data-function="changeState" data-value="E">출석처리</button>
				<button type="button" class="btn gray" data-function="close">확인</button>
			</div>

			<a href="#" class="close" data-function="close">팝업 닫기</a>
		</div>
	</div>
</div>


<!-- <div class="section" style="height: calc(100% - 122px); position: relative;"> -->
<script src="/dhx/dhtmlxscheduler.js" type="text/javascript" charset="utf-8"></script>
<script src="/dhx/ext/dhtmlxscheduler_multisection.js" type="text/javascript" charset="utf-8"></script>




<link rel="stylesheet" href="/dhx/dhtmlxscheduler.css?v=20210701" type="text/css">
<link rel="stylesheet" href="/resources/css/ui.css" type="text/css">
<link rel="stylesheet" href="/resources/css/ui-schedule.css?v=20210729" type="text/css" />





 <!-- autocomplete 때문에 추가 없으몀 오류남  -->

	

<script src="/dhx/ext/dhtmlxscheduler_limit.js" type="text/javascript" charset="utf-8"></script>
<script src='/dhx/ext/dhtmlxscheduler_timeline.js' type="text/javascript" charset="utf-8"></script>
<script src="/dhx/ext/dhtmlxscheduler_units.js" type="text/javascript" charset="utf-8"></script>
<script src="/dhx/ext/dhtmlxscheduler_multiselect.js" type="text/javascript" charset="utf-8"></script>
<script src="/dhx/ext/dhtmlxscheduler_tooltip.js"></script>
<script src="/dhx/ext/dhtmlxmenu.js"></script>


<script src='/dhx/ext/dhtmlxscheduler_minical.js' type="text/javascript" charset="utf-8"></script>


<script src="/dhx/locale/locale_ko.js" type="text/javascript" charset="utf-8"></script>

<script src="/resources/js/manager/common/dhtmlSchedulerUtil.js"></script>
<script src="/resources/js/scheduler/class/scheduleList.js?v=20210802"></script>
<script src="/resources/js/scheduler/class/schedulePopup.js?v=20210604"></script>
<script src="/resources/js/scheduler/class/contextMenu.js?v=20210128"></script>
<script src="/resources/js/scheduler/class/classReservationPopup.js?v=20211122"></script>
<script src="/resources/js/scheduler/class/classCompletePopup.js?v=20210128"></script>
<script src="/resources/js/scheduler/class/ticketPopup.js?v=20210604"></script>
<script src="/resources/js/scheduler/class/addClassPopup.js?v=20210817"></script>
<script src="/resources/js/scheduler/class/changeStatePopup.js?v=20210303"></script>

<script src="/resources/js/controller/naverController.js"></script>
<script src="/resources/js/scheduler/class/cancelClassPopup.js?v=20210113"></script>
<script src="/resources/js/scheduler/class/coachList.js"></script>
<script src="/resources/js/scheduler/settingScheduler.js?v=20211008"></script>
<script src="/resources/js/scheduler/class/Multi.js"></script>
<script src="/resources/js/controller/scheduleController.js"></script>
<script src="/resources/js/controller/permissionController.js"></script>
<script src="/resources/js/popup/classSchedulePopup.js?v=20210128"></script>
<script src="/resources/js/popup/classScheduleOpenBulkPopup.js?v=20210720"></script>
<script src="/resources/js/popup/classScheduleCancelBulkPopup.js?v=20210720"></script>
<script src="/resources/js/controller/classScheduleController.js?v=20210720"></script>
<script src="/resources/js/controller/productUsageController.js"></script>
<script src="/resources/js/scheduler/class/modifyCoachPopup.js?v=20210802"></script>
<script src="/resources/js/scheduler/class/batchCancelPopup.js?v=20210802"></script>
<script src="/resources/js/scheduler/class/copySchedulePopup.js?v=20210826"></script>

<script src="/static/js/controller/serviceController.js?v=20210413"></script>
<script src="/static/js/popup/popupSchedulePrinting.js?v=20210226"></script>
<script src="/static/js/common/html2canvas/html2canvas.min.js"></script>
<script src="/static/js/common/pdf/jspdf.min.js"></script>


<script src="/resources/js/resultData.js?v=20210604"></script>
  <script type="text/javascript">
      $(document).ready(function () {
          window.asd = $('.SlectBox').SumoSelect({ csvDispCount: 3, selectAll:false, captionFormatAllSelected: "Yeah, OK, so everything." });
          window.Search = $('.search-box').SumoSelect({ csvDispCount: 3, search: true, searchText:'Enter here.' });
          window.sb = $('.SlectBox-grp-src').SumoSelect({ csvDispCount: 3, search: true, searchText:'Enter here.', selectAll:false });
          window.searchSelAll = $('.search-box-sel-all').SumoSelect({ csvDispCount: 3, selectAll:false, search: true, searchText:'Enter here.', okCancelInMulti:true });
          window.searchSelAll = $('.search-box-open-up').SumoSelect({ csvDispCount: 3, selectAll:false, search: false, searchText:'Enter here.', up:true });

          window.groups_eg_g = $('.groups_eg_g').SumoSelect({selectAll:false, search:true });


          $('.SlectBox').on('sumo:opened', function(o) {
              console.log("dropdown opened", o)
          });

      });
</script>
<!-- dhtmlx css -->
<style media="screen">
	html, body {
		margin: 0px;
		padding: 0px;
		height: 100%;
		/*overflow: hidden;*/
	}

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
		text-shadow: 0 0 1px #000;
	}

	.dhx_cal_event.openYn_n .dhx_title{
		background-color: #555555 !important;
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


	.ui-menu { display: none !important; }

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
	.context_menu .close { text-indent: -9999px; font-size: 0; }
	.context_menu .close::before { content: ""; width: 100%; background:url(/resources/img/icon/ico_obj_del.png); position: absolute; top: 5px; right: 10px; }
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


	.product_usage_info {
		text-decoration: underline;
	}
	.product_usage_info:hover~[data-template="product_usage_info"] {
		display: inline-block;
	}
	.product_usage_info .icon_safe_checkin {
		display:inline-block; vertical-align:text-top; margin-right:2px; width:14px; height:15px; background:url(/static/img/icon/icon_safe_check_small_blue.png) no-repeat center center / 100%;
	}
	[data-template="product_usage_info"] {
		display: none;
		position: absolute;
		top : 0;
		padding: 5px;
		border: 1px solid black;
		border-radius: 3px;
		background-color: #ddd;
		margin-left: 5px;
	}
	[data-template="product_usage_info"] span {
		display: inline-block;
		width: max-content;
	}


	.dhx_cal_container									{width:100%; height:100%}

	.dhx_cal_navline									{/*font-family:"Noto Sans KR"*/}
	.dhx_cal_navline div								{position:static; display:inline-block; top:0}
	.dhx_cal_navline .btn								{min-width:85px; height:34px; line-height:34px}
	.dhx_cal_navline .ui-datepicker-header				{position:relative; display:block; text-align:center}

	.dhx_cal_navline .left								{position:absolute; left:50px; top:14px; font-size:0}
	.dhx_cal_navline .left select						{width:125px}
	.dhx_cal_navline .left select,
	.dhx_cal_navline .left button						{margin-left:10px}
	.dhx_cal_navline .left button.config				{margin:0; margin-right:10px; width:40px; height:34px; background:white url(/static/img/icon/icon_view_gray.png) no-repeat center center / 20px; border:1px solid #ccc}

	.dhx_cal_navline .left .calendar					{position:relative; width:38px; height:32px; border:1px solid #ccc; font-size:0}
	.dhx_cal_navline .left .calendar > div				{position:absolute; left:0; top:34px !important; font-size:16px}
	.dhx_cal_navline .left .calendar > button			{position:relative; margin:0; width:100%; height:100%; background:white url(/static/img/icon/icon_print_calendar_gray.png) no-repeat center 50%}

	.dhx_cal_navline .left .print						{position:relative; margin-right:10px; width:38px; height:32px; border:1px solid #ccc; font-size:0; overflow:hidden}
	.dhx_cal_navline .left .print > button				{position:absolute; margin:0; left:0; top:0; width:100%; height:100%; background:white url(/static/img/icon/icon_print_gray.png) no-repeat center center / 50%}

	.dhx_cal_navline .left .naver						{position:absolute; left:100%; margin-left:15px; top:50%; margin-top:-10px; line-height:20px; font-size:11.5px}
	.dhx_cal_navline .left .naver img					{margin-top:-2px; border-radius:1px; border:1px solid #ccc}

	.dhx_cal_navline .center							{}

	.dhx_cal_navline .right								{position:absolute; right:17px; top:14px}
	.dhx_cal_navline .right .calendar					{margin-left:12px; border:1px solid #ccc; font-size:0}
	.dhx_cal_navline .right .calendar div				{width:40px; height:32px; background-color:white; border-radius:0; border:none; line-height:32px; color:#333}
	.dhx_cal_navline .right .calendar div + div			{border-left:1px solid #ccc}
	.dhx_cal_navline .right .calendar div:first-child + div	{width:75px}

	.dhx_cal_navline .dropButton				{position:relative; margin:0 5px; width:125px; line-height:34px; text-align:center; font-size:13px}
	.dhx_cal_navline .dropButton .name			{display:block; padding:0 28px 0 10px; height:34px; background:url(/static/img/icon/icon_down_black.png) no-repeat right 10px top 50%; border:1px solid #ccc; box-sizing:border-box; cursor:pointer}
	.dhx_cal_navline .dropButton .menu			{display:none; position:absolute; left:0; top:100%; margin-top:-1px; width:100%; background-color:white; border:1px solid #ccc; box-sizing:border-box}
	.dhx_cal_navline .dropButton:hover .menu	{display:block}
	.dhx_cal_navline .dropButton ul				{display:block; text-align:center}
	.dhx_cal_navline .dropButton ul li			{display:block; padding:0 10px}
	.dhx_cal_navline .dropButton ul li:hover	{background-color:#004fec; color:white}
	.dhx_cal_navline .dropButton ul li + li		{border-top:1px solid #ccc}
	.dhx_cal_navline .dropButton ul li a		{display:block; color:inherit}
</style>



<!-- 로컬 네비게이션 바 (2.0) -->
<nav class="ui-nav" data-index="스케줄러">
	<div class="right">
		<a href="/manager/schedule/promise">개인레슨 스케줄</a>
		<a class="focus" href="/manager/schedule/class">그룹수업 스케줄</a>
		<a href="/manager/schedule/lesson">그룹수업 관리</a>
		<a href="/manager/reservation/index">예약내역</a>
	</div>
</nav>

<div class="scheduler_area">
	<div id="scheduler_here" class="dhx_cal_container" style="display:none">
		<div class="dhx_cal_navline">
			<div class="left">
				<button class="config" data-function="configScheduler"></button>
				<div class="print">
					<button data-action="스케줄 출력"></button>
				</div>
				<div class="calendar">
					<button id="btn_calendar"></button>
					<div id="navi_calendar"></div>
				</div>
				<!--
				<select name="seqOffice" data-event="changeOffice">
					<option class="">지점 선택</option>
					<option class="0" selected>본점</option>
				</select>
				-->
				<select id="placeList" name="placeList" title="수업">
					<option value="0">전체</option>
				</select>
				<button class="btn white" data-function="settingScheduler">스케줄 설정</button>
				<div class="naver">
					<img src="/resources/img/icon/icon_naver_initial.png"/> 네이버 연동
				</div>
			</div>

			<div class="center">
				<div class="dhx_cal_date"></div>
			</div>

			<div class="right">
				<div class="state">
					<ul id="schedule_state"></ul>
				</div>
				<div class="button">
					<div class="dropButton">
						<div class="name">일괄 변경/취소</div>
						<div class="menu">
							<ul>
								<li><a data-action="강사 일괄 변경 팝업 열기">강사 일괄 변경</a></li>
								<li><a data-action="수업 공개 팝업 열기">수업 공개 설정</a></li>
								
									<li><a data-action="수업 삭제 팝업 열기">수업 일괄 취소</a></li>
								
							</ul>
						</div>
					</div>
					<button class="btn white" data-function="copySchedule">주간 스케줄 복사</button>
				</div>
				<div class="calendar">
					<div class="dhx_cal_prev_button"></div>
					<div class="dhx_cal_today_button"></div>
					<div class="dhx_cal_next_button"></div>
				</div>
			</div>
		</div>

		<div class="scheduler">
			<div class="dhx_cal_header"></div>
			<div class="dhx_cal_data"></div>
		</div>
	</div>


	<!-- Layer Popup -->
	<div class="popup member_add" id="addModal">
		<div class="box">
			<h2>회원 예약하기</h2>
			<div class="pop_con">
				<!-- 회원 검색 -->
				<div class="search">
					<form name="scheduleForm" id="scheduleForm" method="post">
						<input type="hidden" name="schedule_mode" id="schedule_mode" value="week"/>
						<input type="hidden" name="schedule_id" id="schedule_id" value=""/>
						<input type="hidden" name="schedule_sdate" id="schedule_sdate" value=""/>
						<input type="hidden" name="schedule_edate" id="schedule_edate" value=""/>
						<input type="hidden" name="class_id" id="class_id" value=""/>
						<input type="hidden" name="class_name" id="class_name" value=""/>
						<input type="hidden" name="class_memo" id="class_memo" value=""/>
						<input type="hidden" name="coach_id" id="coach_id" value=""/>
						<input type="hidden" name="place_id" id="place_id" value=""/>
						<fieldset>
							<legend>회원 검색</legend>
							<p id="member_container">
								<input type="text" value="" name="member_name" id="member_name" title="회원명"
									   placeholder="회원명으로 검색하세요">
							</p>
						</fieldset>
					</form>
				</div>
				<!-- //회원 검색 -->

				<!-- 회원 검색 결과 -->
				<div class="grid_list latest" id="search_container">
					<ul id="search_memberlist">

					</ul>
				</div>
			</div>

			<div class="pop_btn">
				<button type="button" class="btn dark" id="btnMemberSave">선택회원 등록</button>
			</div>

			<a href="#" class="close">팝업 닫기</a>
		</div>
	</div>
	<!-- //회원 추가 팝업 -->

	<div class="popup member_add" id="modModal">
		<div class="box">
			<h2>예약자 목록 보기</h2>
			<div class="pop_con">
				<!-- 회원 검색 -->
				<div class="search">
					<form name="scheduleModForm" id="scheduleModForm" method="post">
						<input type="hidden" name="mod_schedule_mode" id="mod_schedule_mode" value="week"/>
						<input type="hidden" name="mod_schedule_id" id="mod_schedule_id" value=""/>
						<input type="hidden" name="mod_schedule_sdate" id="mod_schedule_sdate" value=""/>
						<input type="hidden" name="mod_schedule_edate" id="mod_schedule_edate" value=""/>
						<input type="hidden" name="mod_class_id" id="mod_class_id" value=""/>
						<input type="hidden" name="mod_class_name" id="mod_class_name" value=""/>
						<input type="hidden" name="mod_lesson_name" id="mod_lesson_name" value=""/>
						<input type="hidden" name="mod_class_memo" id="mod_class_memo" value=""/>
						<input type="hidden" name="mod_coach_id" id="mod_coach_id" value=""/>
						<input type="hidden" name="mod_place_id" id="mod_place_id" value=""/>
						<fieldset>
							<legend>회원 검색</legend>
							<p>
								<label for="event_state">예약상태</label>
								<select id="event_state" name="event_state" title="예약상태">
									<option value="E">출석</option>
									<option value="A">결석</option>
									<option value="C">취소</option>
								</select>
							</p>
							<!--  <p id="mod_member_container">
							   <input type="text" value="" name="mod_member_name" id="mod_member_name" title="회원명">
							 </p> -->
						</fieldset>
					</form>
				</div>
				<!-- //회원 검색 -->

				<!-- 회원 검색 결과 -->
				<div class="grid_list latest" id="mod_search_memberlist">
					<!-- <ul id="mod_search_memberlist"  >

					</ul> -->
				</div>
			</div>

			<div class="pop_btn">
				<button type="button" class="btn dark" id="btnMemberStateSave">상태 변경</button>
			</div>

			<a href="#" class="close">팝업 닫기</a>
		</div>
	</div>


	<div class="modal fade bs-example-modal-sm" id="addMenuModal" tabindex="-1" role="dialog">
		<div class="modal-dialog" role="document">
			<div class="modal-content" style="margin-top: 200px;">
				<div class="modal-header text-center">
					<h4 class="modal-title">서비스 메뉴를 선택 하세요.</h4>
				</div>
				<div class="modal-body">
					<button type="button" style="width:100%;margin-bottom:10px;" id="btnAddTrainer">전체 예약 인원 보기</button>

					<button type="button" style="width:100%;" id="btnAddTrainer">회원 검색하여 수업 예약하기</button>
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
var searchInfo = {
	seqPlace : Number(""),
	lessonDate : "",
	defaultSeqPlace : Number("2034")
};

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

	schedulePopup.setPopupBtn();


	// 권한 셋팅
	PermissionController.get('', function(returnData) {
		loginCoachData.permission = returnData;
	});

	// 현재 로그인한 강사 셋팅
	loginCoachData.seqPartnerCoach = '9807';

	scheduleList.init(searchInfo.defaultSeqPlace);

	$("#navi_calendar").filter(function(){
		var $this = $(this),
			$btn =$("#btn_calendar"),
			$pos = $btn.position(),
    		$left = $pos.left,
    		$top = parseInt($btn.outerHeight(true) + 14);

		$(this).css({top: $top,left: $left}).hide();

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

	/*
	$(".calendar").filter(function(){
	    $(this).datepicker({
	    	yearSuffix: "년",
	        monthNames: ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
	        dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
	        dateFormat: 'yy-mm-dd',
	        firstDay: 1,
	        defaultDate:new Date()
	    });
	});
	 */

    $(document).on('click', '[data-action="강사 일괄 변경 팝업 열기"]', function() {
        const seqPartnerSpaces = [];
        seqPartnerSpaces.push($('#placeList').val());
        modifyCoachPopup.open(scheduler.getState().min_date,
            scheduler.date.add(scheduler.getState().max_date, -1, 'day'), seqPartnerSpaces);
    });

	$(document).on('click', '[data-action="수업 공개 팝업 열기"]', function() {
		const seqPartnerSpaces = [];
		seqPartnerSpaces.push($('#placeList').val());
		classScheduleOpenBulkPopup.open(scheduler.getState().min_date,
				scheduler.date.add(scheduler.getState().max_date, -1, 'day'), seqPartnerSpaces);
	});

	$(document).on('click', '[data-action="구 수업 삭제 팝업 열기"]', function() {
		const seqPartnerSpaces = [];
		seqPartnerSpaces.push($('#placeList').val());
		classScheduleCancelBulkPopup.open(scheduler.getState().min_date,
				scheduler.date.add(scheduler.getState().max_date, -1, 'day'), seqPartnerSpaces);
	});

	$(document).on('click', '[data-action="수업 삭제 팝업 열기"]', function() {
		const seqPartnerSpace = $('#placeList').val();
		batchCancelPopup.open(scheduler.getState().min_date,
				scheduler.date.add(scheduler.getState().max_date, -1, 'day'), seqPartnerSpace);
	});

	$(document).on('click', '[data-action="스케줄 출력"]', function() {
		const seqPartnerSpace = Number(document.getElementById("placeList").value);
		popupSchedulePrinting.open(scheduler, seqPartnerSpace);
	});
});


let loginCoachData = {
	permission : {},
	seqPartnerCoach : {}
};


var pickDate = function(rtnDate) {
	var formatFuncStrToDate = scheduler.date.str_to_date("%Y-%m-%d %H:%i:%s");
	var selDate = formatFuncStrToDate(rtnDate);

  	if($("#schedule_mode").val() == "week"){

  		const seqPlace = $("#placeList").val();
		scheduleList.getWeekClassList(selDate, seqPlace);
		const formatFuncYY = scheduler.date.date_to_str("%Y");
		const formatFuncMM = scheduler.date.date_to_str("%m");
		const formatFuncDD = scheduler.date.date_to_str("%d");

		let year = formatFuncYY(selDate);
		let day = formatFuncDD(selDate);

		let date = new Date(selDate);

		const firstDayOfMonth = new Date( date.getFullYear(), date.getMonth() , 1 );
		const lastMonth = new Date ( firstDayOfMonth.setDate( firstDayOfMonth.getDate() - 1 ) );
		if(lastMonth.getFullYear() !== Number.parseInt(year)){
			year = 	lastMonth.getFullYear().toString();
		}
		const cal_month =formatFuncMM(lastMonth);

    	scheduler.updateView(new Date(year,cal_month,day), "week");
		scheduler.setCurrentView();
  	}

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