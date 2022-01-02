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


<script src="/resources/js/scheduler/settingScheduler.js?v=20210512"></script>
<script src="/resources/js/controller/classScheduleController.js?v=20210128"></script>
<script src="/resources/js/controller/permissionController.js"></script>
<script src="/resources/js/controller/naverController.js"></script>
<script src="/static/js/controller/serviceController.js?v=20210413"></script>

<script src="/resources/js/common.js"></script>

<link type="text/css" rel="stylesheet" href="/resources/css/ui.css" />
<link type="text/css" rel="stylesheet" href="/resources/css/ui-schedule.css?v=20210122" />
<style type="text/css">
main														{min-width:1600px; overflow-x:auto !important}

main														{position:relative; display:table; width:100%; border-bottom:1px solid #ccc; font-size:14px; color:#646464; table-layout:fixed}
section														{display:table-cell; padding:30px 25px; min-height:100%; border-right:1px solid #ccc; opacity:0; transition:opacity 0.3s; box-sizing:border-box}
section + section											{border:none}
section.focus												{opacity:1}

section form 												{display:none}
section.focus form,
section:first-child form									{display:block}

main > div													{position:absolute; left:66.66%; margin-left:-150px; top:50%; margin-top:-15px; text-align:center; width:300px; height:30px; font-size:25px; color:#666}
main > section.focus + div									{display:none}

.step1														{width:33.33%; opacity:1}
.step1 .top													{position:relative; padding-left:12px}
.step1 .top a												{position:absolute; padding:5px 10px; right:0px; bottom:-28px}
.step1 .top h4												{line-height:20px; color:#444}
.step1 .middle												{position:relative; margin:30px 0}
.step1 .bottom button										{float:right; width:300px}

.step2														{position:relative; padding:0}
.step2 form > .top											{display:table; width:100%; table-layout:fixed}
.step2 form > .top section									{width:50%}

.step2 form > .bottom										{padding:30px 25px 30px 0; border-top:1px solid #ccc}
.step2 form > .bottom button								{float:right; width:300px}
.step2 form > .bottom:after									{content:""; display:table; clear:both}

.step2 .right > div											{display:none}
.step2 .right > div.focus									{display:block}

</style>



<!-- 로컬 네비게이션 바 (2.0) -->
<nav class="ui-nav" data-index="스케줄러">
	<div class="right">
		<a href="/manager/schedule/promise">개인레슨 스케줄</a>
		<a href="/manager/schedule/class">그룹수업 스케줄</a>
		<a class="focus" href="/manager/schedule/lesson">그룹수업 관리</a>
		<a href="/manager/reservation/index">예약내역</a>
	</div>
</nav>



<!-- 콘텐츠 메인 시작 -->
<div style="position:absolute; left:0; top:158px; right:0; bottom:0; overflow:auto">
	<main class="ui-schedule ui-style" style="height:100%">
		<!-- STEP 1. 왼쪽 구역 -->
		<section id="step1" class="step1 ui-list ui-checkbox">
			<form onsubmit="return false">
				<div class="top">
					<label>
						<input name="lesson" type="checkbox" value="" onchange="doLessonCount(this)">
						<span></span>
						<h4>전체 그룹 수업(<span id="lessonCount">0</span>)</h4>
					</label>
					<a onclick="doLesson('register')">+ 신규 수업 생성</a>
				</div>
				<div class="middle">
					<ul id="lessonList">
						<li>목록을 가져오는 중 입니다. 잠시만 기다려 주세요.</li>
					</ul>
				</div>
				<div class="bottom">
					<button class="red" type="button" onclick="doLessonList('delete')">선택한 수업 일괄 삭제하기</button>
				</div>
			</form>
		</section>

		<!-- STEP 2. 가운데 구역 -->
		<section id="step2" class="step2"></section>

		<div>수업을 선택해 주세요.</div>
	</main>
</div>

<div class="template">
	<template id="template">
		<form onsubmit="return false">
			<div class="top">
				<section class="left focus">
					<table>
						<colgroup><col/><col/></colgroup>
						<thead>
							<tr>
								<td colspan="2">
									<h5><span>__title__</span><a onclick="doLesson('close')"></a></h5>
								</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th>수업이름</th>
								<td>
									<input name="lessonName" type="text" maxlength="32">
								</td>
							</tr>
							<tr>
								<th>참석 가능한 이용권</th>
								<td>
									<button class="__buttonColor__" type="button" onclick="doLessonDetail('open', this, 1)">__ticketButton__</button>
								</td>
							</tr>
							<tr>
								<th>이용권 차감횟수</th>
								<td class="unit">
									<input name="amount" type="integer" value="1" min="0"><span>회</span>
								</td>
							</tr>
							<tr>
								<th>수업 소요 시간</th>
								<td class="unit">
									<input name="lessonTime" type="integer" min="0"><span>분</span>
								</td>
							</tr>
							<tr>
								<th>수업 정원 인원</th>
								<td class="unit">
									<input name="lessonMaximumNo" type="integer" min="0" onchange="doLessonDetail('sync')"><span>명</span>
								</td>
							</tr>
							<tr>
								<th>대기가능 인원</th>
								<td class="unit">
									<input name="waitableLimitNo" type="integer" min="0"><span>명</span>
								</td>
							</tr>
							<tr>
								<th></th>
								<td>
									<p class="note">예약 대기 인원을 설정하면 예약이 꽉 찼을 때 대기 신청을 받을 수 있고 예약 대기회원들은 빈자리가 생기면 실시간으로 알람을 받을 수 있습니다.</p>
								</td>
							</tr>
							<tr class="ui-image-list">
								<th>수업이미지 선택</th>
								<td><dl>__imageList__</dl></td>
							</tr>
							<tr>
								<th></th>
								<td>
									<p class="note">회원이 그룹수업 예약시, 수업이 진행되는 룸(장소)의 도면 이미지나 사진을 확인 할 수 있습니다. 회원은 어플에서 등록된 이미지를 보고 수업 내 특정 자리를 선택해서 예약할 수 있습니다.</p>
								</td>
							</tr>
							<tr>
								<td colspan="2"><hr></td>
							</tr>
							<tr>
								<th>수업 정산</th>
								<td>
									<button id="step2-button-2" class="__buttonColor__" type="button" onclick="doLessonDetail('open', this, 2)">__payButton__</button>
								</td>
							</tr>
							<tr>
								<th>자리 예약 기능</th>
								<td>
									<button class="__buttonColor__" type="button" onclick="doLessonDetail('open', this, 3)">__seatButton__</button>
								</td>
							</tr>
							<tr class="naverButton">
								<th class="naver"><img src="/resources/img/icon/icon_naver.png" /> 예약</th>
								<td>
									<button id="naverButton" class="__buttonColor__" type="button" onclick="doLessonDetail('open', this, 4)">__naverButton__</button>
									<a href="/partner/naver">네이버 예약 서비스 기본 설정 바로가기</a>
								</td>
							</tr>
						</tbody>
					</table>
				</section>

				<!-- STEP 3. 오른쪽 구역 -->
				<section id="step3" class="right">
					<!-- STEP 3-1. 참석 가능한 이용권 -->
					<div id="step3-1" class="ui-list ui-checkbox">
						<table>
							<colgroup><col/><col/></colgroup>
							<thead>
								<tr>
									<td colspan="2">
										<h5>참여 가능한 이용권<a onclick="doLessonDetail('cancel')"></a></h5>
										<label>
											<input name="seqPartnerService" type="checkbox" value="" onchange="doLessonCount(this)">
											<span></span>
											<div>전체 선택<span>(복수 선택 가능)</span></div>
										</label>
										<label style="margin-left:35px">
											<input name="removedServiceYn" type="checkbox" onchange="doLessonServiceList(this)">
											<span></span>
											중지된 이용권 포함
										</label>
										<div class="state">총 <var id="ticket-count">__ticketCount__</var>개의 수업을 선택하였습니다.</div>
									</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td colspan="2">
										<ul id="lessonServiceList" style="max-height:350px">__ticketList__</ul>
									</td>
								</tr>
							</tbody>
							<tfoot>
								<tr>
									<td colspan="2">
										<button class="blue" type="button" onclick="doLessonDetail('save')">저장하기</button>
									</td>
								</tr>
							</tfoot>
						</table>
					</div>

					<!-- STEP 3-2. 수업 정산 설정하기 -->
					<div id="step3-2">
						<table>
							<colgroup><col/><col/></colgroup>
							<thead>
								<tr>
									<td colspan="2">
										<h5>수업 정산<a onclick="doLessonDetail('cancel')"></a></h5>
									</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th>수업 참석자 기준</th>
									<td>
										<select name="attendanceType" onchange="doSelect(this)">
											<option value="">수업 참석자 기준을 선택해 주세요.</option>
											__typeList__
										</select>
									</td>
								</tr>
								<tr class="ui-radio">
									<th>0명 참석시 정산 여부</th>
									<td>
										<label><input name="zeroAttendanceYn" type="radio" value="Y" onchange="doLessonPay('auto')"><span></span>정산</label>
										<label><input name="zeroAttendanceYn" type="radio" value="N" onchange="doLessonPay('auto')"><span></span>미정산</label>
									</td>
								</tr>
								<tr id="ui-payment" class="ui-payment">
									<th>구간 별 수당</th>
									<td>
										<ul>
											__payList__
											<li><button class="white" type="button" onclick="doLessonPay('insert', this)">+ 구간 추가</button></li>
										</ul>
									</td>
								</tr>
							</tbody>
							<tfoot class="">
								<tr>
									<td colspan="2">
										<button class="blue" type="button" onclick="doLessonDetail('save')">저장하기</button>
									</td>
								</tr>
							</tfoot>
						</table>
					</div>

					<!-- STEP 3-3. 자리 예약 설정하기 -->
					<div id="step3-3">
						<table>
							<colgroup><col/><col/></colgroup>
							<thead>
								<tr>
									<td colspan="2">
										<h5>자리 예약 기능<a onclick="doLessonDetail('cancel')"></a></h5>
									</td>
								</tr>
							</thead>
							<tbody>
								<tr class="ui-switch">
									<th>자리 예약 기능</th>
									<td>
										<label><input name="isSeat" type="checkbox" onchange="doLessonActive(this)"><span></span><span>미사용</span><span>사용</span></label>
									</td>
								</tr>
								<tr>
									<th>룸 예약 자리 수</th>
									<td class="unit">
										<input name="totalSeat" type="integer" min="0" disabled><span>자리</span>
									</td>
								</tr>
								<tr>
									<th></th>
									<td>
										<p class="note">등록한 자리는 1번부터 개수에 맞게 표기되며,<br>회원 예약 시 이미 예약된 자리와 예약 가능한 자리가 구분됩니다.</p>
									</td>
								</tr>
							</tbody>
							<tfoot>
								<tr>
									<td colspan="2">
										<button class="blue" type="button" onclick="doLessonDetail('save')">저장하기</button>
									</td>
								</tr>
							</tfoot>
						</table>
					</div>

					<!-- STEP 3-4. 네이버 예약 설정하기 -->
					<div id="step3-4">
						<table>
							<colgroup><col/><col/></colgroup>
							<thead>
								<td colspan="2">
									<h5 class="naver"><img src="/resources/img/icon/icon_naver.png" /> 예약 기능<a onclick="doLessonDetail('cancel')"></a></h5>
								</td>
							</thead>
							<tbody>
								<tr class="ui-switch">
									<th>네이버 예약 기능</th>
									<td class="naver">
										<input type="hidden" name="seqPartnerLessonNaver" >
										<label><input name="bookingYn" type="checkbox"><span></span><span>미사용</span><span>사용</span></label>
										<a href=""></a>
									</td>
								</tr>
								<tr>
									<th></th>
									<td>
										<p class="note">
											네이버 예약 기능을 활성화 하면, 해당 그룹수업은 센터의 네이버 예약 페이지에서 "예약상품"으로 노출 됩니다.<br>
											해당 그룹수업을 스케줄에 등록하면 기존 이용권을 보유한 회원과 동시에 네이버 예약 기능을 통해 네이버 사용자가 해당 수업을 객 단위로 결제하고 예약할 수 있습니다.
										</p>
									</td>
								</tr>
								<tr>
									<th>수업 이름</th>
									<td>
										<input name="naverLessonName" type="text" maxlength="25">
									</td>
								</tr>
								<tr>
									<th>수업 회당 정상가</th>
									<td class="unit">
										<input name="normalPrice" type="integer" min="0" onchange="doLessonNaver(this)"><span>원</span>
									</td>
								</tr>
								<tr>
									<th>수업 회당 할인가</th>
									<td class="unit freeYn ui-checkbox">
										<input name="price" type="integer" min="0" onchange="doLessonNaver(this)">
										<span>
											원
											<label>
												<input name="freeYn" type="checkbox" value="Y" onchange="doLessonNaverFreeYn(this)"><span></span>무료
											</label>
										</span>
										<div class="ratio"><span id="naverPriceRatio"></span></div>
									</td>
								</tr>
								<tr>
									<th></th>
									<td>
										<p class="note">
											네이버 예약을 통해 결제하는 경우 "수업 회당 할인가"로 적용되어 판매됩니다. (정가와 할인율도 노출 됩니다)
										</p>
									</td>
								</tr>
								<!--
								<tr>
									<th>수업 노출 시간</th>
									<td>
										<select name="openHoursAgo" value="" onchange="doSelect(this)">
											<option class="dummy" value="">수업 노출 시간 선택</option>
											<option value="48">48시간 전</option>
											<option value="36">36시간 전</option>
											<option value="24">24시간 전</option>
											<option value="12">12시간 전</option>
											<option value="6">6시간 전</option>
											<option value="3">3시간 전</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>네이버 모집 인원</th>
									<td class="unit">
										<input name="stock" type="number"><span>명</span>
									</td>
								</tr>
								-->
								<tr class="ui-upload">
									<th>네이버 등록 이미지</th>
									<td>
										<label><input name="naverImageList" type="file" accept="image/*" onchange="doLessonNaverImage('add', this)"><span>900px × 900px 이미지 사용 권장</span><button class="black" type="button">찾기</button></label>
										<div class="ui-attachment">
											<dl></dl>
										</div>
									</td>
								</tr>
								<tr>
									<th></th>
									<td>
										<p class="note">
											네이버에서 해당 수업을 예약할때 보여지는 이미지입니다 . 등록된 이미지는 네이버를 통해 많은 주변 잠재고객들에게 노출 될 수 있으니 신중하게 등록하시기 바랍니다.
										</p>
									</td>
								</tr>
								<tr>
									<th class="two">네이버 예약수업<br>공지사항</th>
									<td>
										<textarea name="description" maxlength="200" placeholder="수업 공지에는 해당 예약상품(수업)에 대한 이용방법과 이용안내, 입장방법, 유의사항, 변경 및 취소 안내를 반드시 작성해야 합니다. (최소 20자 이상 최대 200자 이하)"></textarea>
										<p class="note" style="margin-top:10px">
											예시)<br>
											1. 수업일 경우 : 예약시간 5분 전까지 센터 입구 데스크에서 "네이버로 예약" 내역을 보여주시면 수업에 참석하실 수 있도록 안내해 드리겠습니다. (예약 후 수업 당일 변경 및 취소는 불가능합니다.)
											<br><br>
											2. 상담일 경우 : 센터 입구 데스크에서 "네이버로 상담 예약"했다고 말씀해 주시면 자세한 상담을 도와드리겠습니다. (예약 후 방문 상담 당일 변경 및 취소는 불가능합니다.)
										</p>
									</td>
								</tr>
							</tbody>
							<tfoot>
								<tr>
									<td colspan="2">
										<button class="blue" type="button" onclick="doLessonDetail('save')">저장하기</button>
									</td>
								</tr>
							</tfoot>
						</table>
					</div>
				</section>
			</div>
			<div class="bottom">
				<button class="blue" type="button" onclick="doLessonDetail('submit')">전체 저장하기</button>
			</div>
		</form>
	</template>

	<template id="template-lessonList">
		<li>
			<label>
				<input name="lesson" type="checkbox" value="__seqPartnerLesson__">
				<span></span>
				__lessonName__ / __lessonTime__분 / __reservationLimitNo__명
			</label>
			<button class="green" type="button" onclick="doLesson('modify', '__seqPartnerLesson__')">수정하기</button>
		</li>
	</template>

	<template id="template-ticketList">
		<li class="__state__">
			<label>
				<input name="seqPartnerService" type="checkbox" value="__seqService__" data-state="__state__" onchange="doLessonCount(this)">
				<span></span>
				__serviceName__
			</label>
			__serviceState__
			__serviceSequence__
		</li>
	</template>

	<template id="template-payList">
		<li>
			<dl>
				<dd class="person"><input type="integer" min="0" value="__minimumAttendance__" disabled></dd>
				<dd>명 부터</dd>
				<dd class="person"><input type="integer" min="0" value="__maximumAttendance__" onchange="doLessonPay('auto')"></dd>
				<dd>명 까지</dd>
				<dd class="currency"><input type="integer" min="0" value="__lessonCost__" onchange="doLessonPay('auto')"></dd>
				<dd>원</dd>
				<dd><a onclick="doLessonPay('delete', this)">삭제</a></dd>
			</dl>
		</li>
	</template>

	<template id="template-imageList">
		<dd>
			<label>
				<input name="seqPartnerSeatImage" type="checkbox" value="__seqPartnerSeatImage__" onclick="doLessonImage('check', this)">
				<div><img src="__imageUrl__"/></div>
			</label>
		</dd>
	</template>

	<template id="template-naverImageList">
		<dd>
			<div>
				<img src="__imageUrl__" data-order="__imageOrder__" data-sequence="__seqPartnerLessonNaverImage__" />
				<a onclick="doLessonNaverImage('del', this)"></a>
			</div>
		</dd>
	</template>
</div>

<script type="text/javascript">
let permissionData = {};
let naverState = true;


function doReady() {
    PermissionController.get("", function(data) {
        permissionData = data;
		naverController.getInfo().then(data => {
			naverState = (!data.info || !data.info.naverBusinessId) ? false : true;
			Promise.all([doLessonList("data"), doLessonType("data")])
				.then(() => {
					doLessonType("render");
					doLessonList("render");
				}).catch((error) => {
					alert("오류가 발생하였습니다.\n그룹수업 정보를 가져오는데 실패하였습니다.");
					console.log(error);
				});
		});
    });
}



/* ******** 레슨 목록 ******* */

function doLessonList(command) {
	switch(command){
		case "data" :
            return ClassScheduleController.lessonList(function(data) {
                doLessonList.data = data;
			});

		case "render" :
			const template = document.getElementById("template-lessonList").innerHTML;
			const data = doLessonList.data;
			let lessonList = "";
            data.forEach(function(item) {
                lessonList += uiTemplate(template, item);
			});
			if(data.length == 0) lessonList = "<li>등록된 그룹 수업이 없습니다.</li>";
            document.getElementById("lessonList").innerHTML = lessonList;
            document.getElementById("lessonCount").innerHTML = data.length;
			break;

        case "delete" :
            doLesson("close");

            let deleteList = [];
            document.querySelectorAll("[name=lesson]:checked").forEach(function(item) {
                deleteList.push(item.value);
            });

            if(deleteList.length == 0) {
            	alert("선택된 수업이 없습니다.");
            	return;
			}

			if(!confirm("선택하신 수업을 리스트에서 삭제하시겠습니까?")) return;
			ClassScheduleController.lessonDelete(deleteList, function() {
				doLessonList("data").then(function(){
					doLessonList("render");
				});
			}).catch(error => {
				alert("오류가 발생하였습니다.");
				console.log(error);
			});
			/*
        	uiConfirm({
        		contents	: "선택하신 수업을 리스트에서 삭제하시겠습니까?",
        		color		: "red",
        		callback	: function() {
                    return ClassScheduleController.lessonDelete(deleteList, function() {
                        doLessonList("data").then(function(){
                            doLessonList("render");
                        });
                    }).catch(error => {
                    	alert("오류가 발생하였습니다.");
                    	console.log(error);
					});
				}
			});
			*/
            break;
	}
}



/* ******** 레슨 만들기 ******* */

function doLesson(command, id) {
	switch(command) {
		case "register" :
            Promise.all([doLessonImage("data"), doLessonTicket("data"), isNaverSupport("data")]).then(function() {
                doLesson.prepareData = {
                    title			: "그룹 수업 생성",
                    payList			: doLessonPay("render"),
                    imageList		: doLessonImage("render"),
                    ticketList		: doLessonTicket("render"),
                    ticketCount		: 0,
                    lessonCount		: 0,
                    buttonColor		: "black",
                    ticketButton	: "설정하기",
                    payButton		: "설정하기",
                    seatButton		: "설정하기",
                    naverButton		: "설정하기"
                };
                doLesson.data = {};
				doLesson.mode = "";
				doLesson.isNaver = isNaverSupport();
				doLessonNaverImage.data = [];
				doLesson("render");
			}).catch(error => {
				alert("오류가 발생하였습니다.");
				console.log(error);
			});
			break;

		case "modify" :
            Promise.all([doLessonImage("data"), doLessonTicket("data"), isNaverSupport("data"), doLesson("data", id)]).then(function() {
            	const data = doLesson.data;
                doLessonNaverImage.data = (data.naver && data.naver.imageList) ? data.naver.imageList : [];

				const ticketCount = data["serviceList"].length;
				const payList = data["cost"].costList;
				if(data["seat"]) data["seat"].isSeat = "Y";
				const isSeat = (data["seat"] && data["seat"].isSeat == "Y") ? "사용" : "미사용";
				const isNaver = (data.naver && data.naver.bookingYn == "Y") ? "사용" : "미사용";

				doLesson.prepareData = {
					title 			: "그룹 수업 수정",
					payList			: doLessonPay("render", payList),
					imageList		: doLessonImage("render"),
                    ticketList		: doLessonTicket("render"),
                    ticketCount		: ticketCount,
					lessonCount		: 0,
					buttonColor		: "green",
					ticketButton	: "설정완료 : " + ticketCount + "개 선택",
					payButton		: "설정완료 : " + payList.length + "개 설정",
					seatButton		: "설정완료 : " + isSeat,
					naverButton		: "설정완료 : " + isNaver
				};
				doLesson.data = data;
                doLesson.mode = "update";
				doLesson.isNaver = isNaverSupport();
				doLesson("render");

                doLessonActive(document.querySelector("main [name='isSeat']"));
				doLessonNaver(document.querySelector("main [name='price']"));
                doLessonNaverImage("update");
			}).catch(error => {
				alert("오류가 발생하였습니다.");
				console.log(error);
			});
			break;

		case "data" :
            return ClassScheduleController.lessonDetail(id, function(data) {
//            	console.log(data);
                doLesson.data = data;
				doLessonDetail.naverButton = false;
            });

		case "render" :
			console.log("Called");
            var prepareData = doLesson.prepareData;
            var data = doLesson.data;
			const template = document.getElementById("template").innerHTML;
			const container = document.getElementById("step2");
			container.innerHTML = uiTemplate(template, prepareData);
            pushForm(container, data);
			uiInput(container);

            const button = document.getElementById("naverButton");
           	button.disabled = (doLesson.isNaver) ? false : true;
           	button.className = (doLesson.isNaver) ? (doLesson.mode == "update") ? "green" : "black" : "gray";

          	if(!naverState) {
				setNaverButton("/partner/naver", "<u>네이버 예약 서비스 기본 설정 바로가기</u>");
			} else if(!doLesson.isNaver) {
				setNaverButton("", "기능이 비활성화되었습니다. 고객센터에 문의해 주세요.");
			}
            container.className = "step2 focus";
            doLessonDetail.self = {};
			break;

        case "close" :
            document.getElementById("step2").classList.remove("focus");
            break;
	}
}



/* ******** 레슨 상세 ******* */

function doLessonDetail(command, object, index) {
	const self = (doLessonDetail.self) ? doLessonDetail.self : {};
    const isSerialize = function(array, min, max) {
        for(let i = 0; i < array.length; i++) {
            let start = array[i].minimumAttendance;
            let end = array[i].maximumAttendance;
            if(i == 0 && start != min) return false;
            if(array[i + 1]) {
                let nextStart = array[i + 1].minimumAttendance;
                if(end + 1 != nextStart) return false;
            } else {
                if(end != max) return false;
            }
        }
        return true;
    }

	switch(command) {
		case "open" :
			if(index > 1) {
				var formData = popForm(document.getElementById("step2"));
                var checkList = ["lessonMaximumNo"];
				if(!doLessonDetail("check", formData, checkList, false)) {
					alert("수업 정원 인원란을 입력해 주세요.");
					return;
				}
				doLessonDetail("sync");
			}

			if(index == 2) {
				if(doLesson.mode == "update") {
					if(permissionData.permissionSchedule.readClassCoachPay != true) {
						alert("수업 정산 조회 권한이 없습니다.");
						return;
					}
				}

                var input = document.querySelectorAll("[name=zeroAttendanceYn]");
                var value = document.querySelector("[name=lessonMaximumNo]").value;
                if(value == "0") {
                    input[0].checked = true;
                    document.getElementById("ui-payment").querySelector("input").value = 0;
                }
                input.forEach(function(item, index) {
                    item.disabled = (Number(value) == 0) ? true : false;
                });
			}

			//네이버 권한 체크 추가.
			if (index == 4) {
				if(permissionData.permissionSchedule.naverSchedule != true) {
					alert("네이버 예약 설정 권한이 없습니다.");
					return;
				}
			}

			var div = document.getElementById("step3-" + index);

            const oldIndex = self.index;
            const isFocus = (index == oldIndex) ? true : false;
			if(oldIndex) doLessonDetail("cancel");

			if(!isFocus) {
				div.parentNode.classList.add("focus");
				div.classList.add("focus");
                const node = div.children[0];
                const cloneNode = node.cloneNode(true);

				doLessonDetail.self = {
					parentNode : div,
					node : node,
					cloneNode : cloneNode,
					index : index,
					button : object
				};
			}
		break;

		case "close" :
            self.parentNode.classList.remove("focus");
            self.parentNode.parentNode.classList.remove("focus");
            doLessonDetail.self = {};
			break;

		case "cancel" :
			var node = self.node;
			var cloneNode = self.cloneNode;
			node.parentNode.replaceChild(cloneNode, node);
			uiInput(cloneNode);
			doLessonDetail("close");
			break;

		case "save" :
			switch(self.index) {
				case 1 :
					// 참석 가능한 이용권
					let checkList = [];
					document.querySelectorAll("[name='seqPartnerService']:checked").forEach(function(item) {
						if(item.value) checkList.push(item.value);
					});
					var count = checkList.length;
					self.button.innerHTML = (count == 0) ? "설정하기" : "설정완료 : " + count + "개 선택";
					self.button.className = (count == 0) ? "black" : "green";
					break;

				case 2 :
					// 수업 정산
					const isContinue = doLessonPay("check");
					if(!isContinue) return;
                    var count = doLessonPay("list").length;
                    self.button.innerHTML = "설정완료 : " + count + "개 설정";
                    self.button.className = "green";
					break;

				case 3 :
					// 자리 예약 기능
					var isChecked = (document.querySelector("[name='isSeat']").checked) ? true : false;
					if(isChecked) {
						let seat = document.querySelector("[name='totalSeat']").value;
						let seatMax = document.querySelector("[name='lessonMaximumNo']").value;
						if(seat == "") {
							alert("룸 예약 자리 수를 입력해 주세요.");
							return;
						} else if(Number(seat) < Number(seatMax)) {
							alert("룸 예약 자리 수는 수업 정원 인원 보다 작을 수 없습니다.");
							return;
						}
					}
                    self.button.innerHTML = "설정완료 : " + ((isChecked) ? "사용" : "미사용");
                    self.button.className = "green";
					doLessonDetail.step3 = true;
					break;

				case 4 :
					// 네이버 예약 기능
                    var isChecked = (document.querySelector("[name='bookingYn']").checked) ? true : false;
                    var submitData = doLessonDetail("data");
                    if(!doLessonDetail("check", submitData, ["naver"], true)) return;
                    self.button.innerHTML = "설정완료 : " + ((isChecked) ? "사용" : "미사용");
                    self.button.className = "green";
                    doLessonDetail.naverButton = true;
					break;
			}

            doLessonDetail("close");
            break;

		case "check" :
            let error = "";
            var submitData = arguments[1];
            var checkList = arguments[2];
            var isAlert = arguments[3];

			for(let name of checkList) {
                var value = submitData[name];
				var isEmpty = (value == "" || value == undefined) ? true : false;
                var isZero = (value == 0 || (Array.isArray(value) && value.length == 0)) ? true : false;

				switch(name) {
					case "lessonName"			: if(isEmpty) error = "수업 이름을 입력해 주세요."; break;
					case "serviceList"			: if(isZero) error = "참석 가능한 이용권을 선택해 주세요."; break;
					case "amount"				: if(isEmpty) error = "이용권 차감횟수를 입력해 주세요."; break;
					case "lessonTime"			: if(isEmpty) error = "수업 소요 시간을 입력해 주세요."; break;
                    case "lessonMaximumNo"		: if(isEmpty) error = "수업 정원 인원을 입력해 주세요."; break;
					case "seqPartnerSeatImage"	: if(isEmpty) error = "수업 이미지를 선택해 주세요."; break;
					case "attendanceType"		: if(isEmpty) error = "수업 참석자 기준을 입력해 주세요."; break;
					case "zeroAttendanceYn"		: if(isEmpty) error = "0명 참석시 정산 여부를 입력해 주세요."; break;
					case "cost"					:
                        const costCheckList = ["attendanceType", "zeroAttendanceYn", "costList"];
                        for(let name of costCheckList) {
                            var value = submitData.cost[name];
                            var isEmpty = (!value) ? true : false;
                            switch(name) {
                                case "attendanceType"		: if(isEmpty) error = "수업 정산에서 수업 참석자 기준을 입력해 주세요."; break;
                                case "zeroAttendanceYn"		: if(isEmpty) error = "수업 정산에서 0명 참석시 정산 여부를 입력해 주세요."; break;
								case "costList"				:
                                    if(value.length == 0) error = "수업 정산에서 구간 별 수당을 입력해 주세요.";
                                    var min = (submitData.cost.zeroAttendanceYn == "Y") ? 0 : 1;
                                    var max = Number(submitData.lessonMaximumNo);
                                    if(!isSerialize(value, min, max)) error = "수업 정산 버튼을 클릭해 구간 별 수당을 확인해 주세요.";
                                    break;
                            }
                            if(error) break;
                        }
						break;

					case "naver"				:
//						const naverCheckList = ["naverLessonName", "normalPrice", "price", "openHoursAgo", "stock", "imageList"];
						const naverCheckList = ["naverLessonName", "normalPrice", "price", "imageList", "description"];
						for(let name of naverCheckList) {
							var value = submitData.naver[name];
							var isEmpty = (value == "") ? true : false;
							switch (name) {
								case "naverLessonName"	: if(isEmpty) error = "네이버 예약 수업 이름을 입력해 주세요."; break;
                                case "normalPrice"		: if(isEmpty) error = "네이버 예약 수업 회당 정상가를 입력해 주세요."; break;
                                case "price"			: if(isEmpty) error = "네이버 예약 수업 회당 할인가를 입력해 주세요."; break;
                                case "openHoursAgo"		: if(isEmpty) error = "네이버 예약 수업 노출 시간을 선택해 주세요."; break;
                                case "stock"			:
									var max = Number(submitData.lessonMaximumNo);
                                	if(isEmpty) error = "네이버 예약 모집 인원을 입력해 주세요.";
                                	else if(Number(value) < 1) error = "네이버 예약 모집 인원을 0명 이상으로 입력해 주세요.";
                                	else if(Number(value) > max) error = "네이버 예약 모집 인원을 수업 정원 인원(" + max + "명)에 맞게 설정해 주세요.";
                                	break;
                                case "description"		: if(value.length < 20) error = "네이버 예약 예약수업 공지사항을\n최소 20자 이상 입력해 주세요."; break;
								case "imageList"		: if(value.length == 0) error = "네이버 예약 등록 이미지를 업로드해 주세요."; break;
                            }
                            if(error) break;
						}
						break;

					case "naverStock"			:
						var maxStock = submitData.lessonMaximumNo;
						var stock = submitData.naver.stock;
						if(!maxStock) return;
						if(Number(stock) > Number(maxStock)) error = "네이버 예약 모집 인원을 수업 정원 인원(" + maxStock + "명)에 맞게 설정해 주세요.";
						break;
                }

                if(error) {
                	if(isAlert) alert(error);
                	return false;
				}
			}
			return true;

		case "data" :
			// 폼 데이터를 자동으로 만든다. (직관적이지 못해 다음부터는 사용하지 않을 예정)
            var formData = popForm(document.getElementById("step2"));
            formData["costList"] = doLessonPay("list");

            if(formData["seqPartnerSeatImage"]) {
                const input = document.querySelector("[name='seqPartnerSeatImage']:checked");
                formData["seqPartnerSeatImage"] = (input) ? input.value : "";
            }

            if(!formData["waitableLimitNo"]) {
                document.querySelector("[name='waitableLimitNo']").value = formData["waitableLimitNo"] = 0;
            }

            // 폼 데이터를 제출 데이터 포맷으로 수정한다.
            var submitData = {
                lessonName				: formData["lessonName"],
                lessonTime				: formData["lessonTime"],
                lessonMaximumNo			: formData["lessonMaximumNo"],
                reservationLimitNo		: formData["lessonMaximumNo"],
                waitableLimitNo			: formData["waitableLimitNo"],
                amount					: formData["amount"],
                seat : {
                    totalSeat			: formData["totalSeat"]
                },
                image : {
                    seqPartnerSeatImage	: formData["seqPartnerSeatImage"]
                },
                cost : {
                    attendanceType		: formData["attendanceType"],
                    zeroAttendanceYn	: formData["zeroAttendanceYn"],
                    costList			: formData["costList"]
                },
                serviceList 			: formData["seqPartnerService"],
                naver					: {
					seqPartnerLessonNaver : formData["seqPartnerLessonNaver"],
                    bookingYn			: formData["bookingYn"],
                    naverLessonName		: formData.naverLessonName,
                    freeYn				: formData.freeYn,
                    normalPrice			: formData.normalPrice,
                    price				: formData.price,
//					openHoursAgo		: 0,
//					stock				: 0,
                    description			: formData.description,
                    imageList			: doLessonNaverImage("list")
                }
            };

            if(formData["isSeat"] == "N") delete submitData.seat;
            if(!formData["seqPartnerSeatImage"]) delete submitData.image;

            const serviceList = [];
            formData.seqPartnerService.forEach(function(item) {
                if(item) serviceList.push({seqPartnerService : item});
            });
            submitData.serviceList = serviceList;
			return submitData;

		case "submit" :
			if(doLessonDetail.self.node) doLessonDetail("cancel");

			var submitData = doLessonDetail("data");
            var checkList = ["lessonName", "serviceList", "amount", "lessonTime", "lessonMaximumNo", "cost", "naverStock"];
            if(!doLessonDetail("check", submitData, checkList, true)) return;
            doLesson("close");

			let id = doLesson.data.seqPartnerLesson;

			// 등록 수정할 것 없이 전달하지 않음
			if(doLessonDetail.naverButton != true) {
				delete submitData.naver;
			}

//			console.log(submitData);

            ClassScheduleController.lessonSubmit(submitData, id, function(data) {
                alert("저장되었습니다.");
                doLessonList("data").then(function() {
                    doLessonList("render");
                });
            }).catch(function(error) {
            	alert("수업이 저장되지 않았습니다.");
			});
			break;

		case "sync" :
			var value = document.querySelector("[name='lessonMaximumNo']").value;
			var isSeat = (document.querySelector("[name='isSeat']:checked"));

			var list = doLessonPay("list");
			if(list.length > 0) {
				var endValue = list[list.length - 1].maximumAttendance;
				if(value != endValue) {
					var button = document.getElementById("step2-button-2");
					button.innerHTML = "설정하기";
					button.className = "black";
				}
			}
			/*
				var name = document.querySelector("[name='naverLessonName']").value;
				var stock = document.querySelector("[name='stock']").value;
				if(name) {
					if(Number(value) < Number(stock)) {
						var button = document.getElementById("naverButton");
						button.innerHTML = "설정하기";
						button.className = "black";
					}
				}
			*/
            break;
    }
}



/* ******** 구간 별 수당 ******* */

function doLessonPay(command, object) {
	if(command != "render") {
	    var max = Number(document.querySelector("[name='lessonMaximumNo']").value);
	    var input = document.getElementById("ui-payment").getElementsByTagName("input");
        var isPreset  = function() {
            const node = document.querySelector("[name='zeroAttendanceYn']:checked");
            return (node) ? node.value : false;
        }
	}

    switch(command) {
        case "insert" :
            var ul = object.parentNode.parentNode;
            var li = ul.getElementsByTagName("li");
            var clone = li[li.length - 2].cloneNode(true);
            var input = clone.getElementsByTagName("input");
            var end = Number(input[1].value);
            var isEnd = (input[1].value) ? true : false;
            var start = Number(end) + 1;

            for(let i = 0; i < input.length; i++)
                input[i].value = input[i].className = "";

			var error = "";
			if(start > max) error = "수업 정원 인원을 초과할 수 없습니다.";
			else if(!isPreset()) error = "미참석 시 정산 여부를 먼저 선택해 주세요.";
			else if(!isEnd) error = "입력하지 않은 구간이 있습니다.";
			if(error) {
				alert(error);
				return;
			}

			if(end < start) input[0].value = start;
			if(start == max) input[1].value = start;
			if(end == max) return;
			uiInput(clone);
            ul.insertBefore(clone, li[li.length - 1]);
            break;

        case "delete" :
            var li = object.parentNode.parentNode.parentNode;
            li.parentNode.removeChild(li);
            doLessonPay("auto");
            break;

		case "check" :
            var value1 = document.querySelector("[name='attendanceType']").value;
            var value2 = isPreset();
            var value3  = (input[input.length - 2].value == max) ? true : false;

            var error = "";
            if(!value1) error = "수업 참석자 기준를 선택해 주세요.";
            else if(!value2) error = "미참석 시 정산 여부를 선택해 주세요.";
            else if(!value3) error = "입력하신 수업 정원 인원(" + max + "명)에 맞게 구간 별 수당을 설정해 주세요.";

			if(!error) {
	            var value4 = doLessonPay("list", true).length;
    	    	if(value4 == 0) error = "구간 별 수당을 확인해 주세요.";
			}

            if(error) alert(error);
            return (error) ? false : true;

        case "list" :
            var array = [];
            var isError = false;

            for(let i = 0; i < input.length; i += 3){
                var start = input[i].value;
                var end = input[i + 1].value;
                var amount = input[i + 2].value;
                var isCorrect = (Number(start) <= Number(end)) ? true : false;

                if(object) {
					input[i].className = (start != "") ? "" : "error";
					input[i + 1].className = (end != "" && isCorrect) ? "" : "error";
					input[i + 2].className = (amount != "") ? "" : "error";
				}
                if(start != "" && end != "" && amount != "" && isCorrect)
                    array.push({minimumAttendance : Number(start), maximumAttendance : Number(end), lessonCost : Number(amount)});
                else {
                    isError = true;
                    break;
                }
            }
            return (isError) ? [] : array;

		case "render" :
			if(!object) object = [{minimumAttendance : "", maximumAttendance : "", lessonCost : ""}];
            const template = document.getElementById("template-payList").innerHTML;
            var li = "";
            object.forEach(function(item) {
                li += uiTemplate(template, item);
            });
            return li;

		case "auto" :
            const preset = isPreset();
            input[0].value = (preset == "Y") ?  0 : 1;
            if(!max) return;

			for(let i = 0; i < input.length; i += 3) {
				let start = Number(input[i].value);
				let end = Number(input[i + 1].value);
				let isEnd = (input[i + 1].value) ? true : false;
				if(!isEnd) break;

                if(start > max) start = max;
                if(end > max) end = max;
                if(start > end) end = start;
                let nextStart = end + 1;
                if(nextStart > max) nextStart = max;

                input[i].value = start;
                input[i + 1].value = end;
                if(input[i + 3]) {
                	input[i + 3].value = nextStart;
					if(end == max) {
						for(let j = i + 3; j < input.length; j += 3) {
							const li = input[j].parentNode.parentNode.parentNode;
							li.parentNode.removeChild(li);
						}
					}
				}
			}
			break;
	}
}



/* ******** 입력 활성화 설정 ******* */

function doLessonActive(object){
    const isDisable = (object.checked) ? false : true;
    let ul = object;
    for(let i = 0; i < 10; i++){
        ul = ul.parentNode;
        if(ul.tagName.toLowerCase() == "table") break;
    }
    const array = ["input", "select", "textarea"];
    for(let i = 0; i < array.length; i++) {
        const node = ul.getElementsByTagName(array[i]);
        for(let j = 0; j < node.length; j++) {
            if(node[j].type != "checkbox") {
                node[j].disabled = (isDisable) ? true : false;
                if(isDisable) node[j].value = "";
            }
        }
    }
}



/* ******** 레슨 선택 시 카운팅 ******* */

function doLessonCount(object) {
	const isRemoved = (document.querySelector("[name='removedServiceYn']:checked"));
    const name = object.name;
    let node = document.getElementsByName(name);
    if(!object.value){
        const value = object.checked;
        for(let i = 1; i < node.length; i++) {
        	const state = node[i].getAttribute("data-state");
			if(!value || isRemoved || (!isRemoved && state != "removed")) {
          	  node[i].checked = value;
			}
		}
    }
    let count = 0;
    for(let i = 1; i < node.length; i++) {
    	const li = node[i].parentNode.parentNode;
		if(node[i].checked) {
			li.classList.add("focus");
		} else {
			li.classList.remove("focus");
		}
        if(node[i].checked) count++;
    }
	node = node[0].parentNode.parentNode.getElementsByTagName("var")[0];
	if(node) node.innerHTML = count;
    return count;
}



function doLessonServiceList(object) {
	const ul = document.getElementById("lessonServiceList");
	if(ul) ul.className = (object.checked) ? "removed" : "";
}



/* ******** 레슨 이미지 ******* */

function doLessonImage(command, object) {
	switch(command) {
        case "data" :
            return ClassScheduleController.imageList(function(data) {
                doLessonImage.data = data;
            });

		case "render" :
            const template = document.getElementById("template-imageList").innerHTML;
            const data = doLessonImage.data;
            let imageList = "";

            if(data.length == 0)
                imageList = "<dd style='white-space:nowrap'>센터에 등록된 룸 이미지가 없습니다.</dd>";
			else {
				for(let i = 0; i < 5; i++) {
					if(data[i]) {
						imageList += uiTemplate(template, data[i]);
					} else {
						imageList += "<dd></dd>";
					}
				}
			}
            return imageList;

		case "check" :
			const node = document.getElementsByName("seqPartnerSeatImage");
			node.forEach(function(item) {
				if(item != object) item.checked = false;
			});
			break;
	}
}



/* ******** 네이버 활성화 여부 ******* */

function isNaverSupport(command) {
	if(command == "data") {
		return naverController.getInfo().then(data => {
			isNaverSupport.status = (data && data.info && data.info.naverUseYn == "Y") ? true : false;
		});
	}
	return isNaverSupport.status;
}

function setNaverButton(href, text) {
	const button = document.getElementById("naverButton");
	button.classList.add("disabled");
	button.style.display = "none";
	const a = button.parentNode.querySelector("a");
	if(!href) a.removeAttribute("href");
	else a.setAttribute("href", href);
	a.innerHTML =  text;

}



/* ******** 레슨 이미지 ******* */

function doLessonNaverImage(command, object) {
    switch(command) {
        case "update" :
            var template = document.getElementById("template-naverImageList").innerHTML;
            var data = doLessonNaverImage.data || [];
            var imageList = "";
            if(data.length > 0) {
				for(let i = 0; i < 3; i++) {
					if(data[i]) {
						data[i].imageOrder = i;
						imageList += uiTemplate(template, data[i]);
					} else {
						imageList += "<dd></dd>";
					}
				}
			}
            var dl = document.querySelector("#step3-4 dl");
            dl.innerHTML = imageList;
            break;

		case "list" :
			var nodeList = document.querySelectorAll("#step3-4 dl img");
			var imageList = [];
			nodeList.forEach((item, index) => {
                imageList.push({
					seqPartnerLessonNaverImage : item.getAttribute("data-sequence") || 0,
                    imageUrl	: item.getAttribute("src"),
                    imageOrder	: index
                });
			});
			return imageList;

		case "add" :
			var length = document.querySelectorAll("#step3-4 dl img").length;
			if(length > 2) {
				object.value = "";
				alert("이미지는 최대 3개까지 업로드 할 수 있습니다.");
				return;
			}

            var formData = new FormData();
            formData.append("imageFile", object.files[0]);
            if(!doLessonNaverImage.data) doLessonNaverImage.data = [];

            naverController.imageUpload(formData).then(data => {
                data = JSON.parse(data);
                doLessonNaverImage.data.push({
                	imageUrl : data.imageUrl,
                	imageOrder : "",
                    seqPartnerLessonNaverImage : ""
                	});
                doLessonNaverImage("update");
				object.value = "";
            }).catch(error => {
                console.log(error);
                alert("파일 업로드 중 오류가 발생하였습니다.");
				object.value = "";
			});
			break;

		case "del" :
            var data = doLessonNaverImage.data;
            var imageOrder = Number(object.getAttribute("data-order"));
            for(var i = 0; i < data.length; i++)
            	if(data[i].imageOrder == imageOrder) break;
            if(i < data.length) data.splice(i, 1);
            doLessonNaverImage("update");
			break;
    }
}



/* ******** 레슨 이용권 ******* */

function doLessonTicket(command) {
    switch(command) {
        case "data" :
			return serviceController.normal.list({serviceType : "CLASS"}, true).then(data => {
				doLessonTicket.data = data;
			});
//          return ClassScheduleController.serviceList(function(data) {
//              doLessonTicket.data = data;
//           });

        case "render" :
            const template = document.getElementById("template-ticketList").innerHTML;
			let maxLength = 1;
			const groupList = {
				saleList : [],
				pauseList : [],
				removeList : [],
			};
			const dataList = doLessonTicket.data || [];
			dataList.forEach(item => {
				const seqService = String(item.seqService || 0);
				const length = seqService.length;
				if(length > maxLength)
					maxLength = length;
				if(item.displayYn == "N")
					groupList.removeList.push(item);
				else if(item.saleYn == "N")
					groupList.pauseList.push(item);
				else
					groupList.saleList.push(item);
			});
			const li = [];
			for(let name in groupList) {
				const dataList = groupList[name];
				dataList.forEach(item => {
					const dayLimit = (item.dayLimit < 0) ? "무제한" : item.dayLimit + "회";
					const weekLimit = (item.weekLimit < 0) ? "무제한" : item.weekLimit + "회";
					const stateColor = (item.displayYn == "N") ? "red" : (item.saleYn == "N") ? "red" : "green";
					const stateName = (item.displayYn == "N") ? "삭제" : (item.saleYn == "N") ? "삭제" : "판매";
					item.serviceLimit = `일일 : ${dayLimit}, 주간 : ${weekLimit}`;
					item.serviceState = `<span class="state ${stateColor}">${stateName}</span>`;
					item.serviceSequence = `<span class="sequence">#${item.seqService.zf(maxLength)}</span>`;
					item.state = (item.displayYn == "N" || item.saleYn == "N") ? "removed" : "";
					li.push(uiTemplate(template, item));
				});
			}
			return li.join("");
    }
}



/* ******** 레슨 수업 참석자 기준 ******* */

function doLessonType(command) {
    switch(command) {
        case "data" :
            return ClassScheduleController.attendanceList(function(data) {
                doLessonType.data = data;
            });

        case "render" :
            let typeList = doLessonType.data.map(function(item) {
                return `<option value="${item.value}">${item.title}</option>`;
            });
            typeList = typeList.join("");
            const template = document.getElementById("template");
            template.innerHTML = uiTemplate(template.innerHTML, {typeList : typeList});
            return ;
    }
}



function doLessonNaver(object) {
	let div = document.getElementById("step3-4");
	const normalPrice = getNumber(div.querySelector("[name='normalPrice']").value);
	const price = getNumber(div.querySelector("[name='price']").value);

	div = document.getElementById("naverPriceRatio");
    if(!normalPrice || !price || normalPrice == price) {
		div.innerHTML = "";
		return;
	}
	const ratio = 100 - parseInt(price * 100 / normalPrice);
	if(ratio > 0)
		div.innerHTML = "(정가대비 " + ratio + "% 할인)";
}



function doLessonNaverFreeYn(object) {
	const input = document.getElementsByName("price")[0];
	if(!input.value) input.value = 0;
	input.disabled = (object.checked) ? true : false;
}



function doSelect(object) {
	object.querySelectorAll("option").forEach(item => {
		item.removeAttribute("selected");
	});
	object.options[object.selectedIndex].setAttribute("selected", "");
}
	</script>
<!-- 콘텐츠 메인 종료 -->





	</div>