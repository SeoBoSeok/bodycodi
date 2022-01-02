
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>BODY CODI - 바디코디</title>

	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="icon" href="/favicon.ico">
	<link type="text/css" rel="stylesheet" href="/static/css/common.css?v=20211110">
	<link type="text/css" rel="stylesheet" href="/static/css/ui.css?v=20211220">
	<link type="text/css" rel="stylesheet" href="/static/css/popup/popupHeader.css?v=20211116">
	<!--
	<link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css">
	-->

	<script type="text/javascript" src="/static/js/common/jquery/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="/static/js/common/jquery/jquery.blockUI.js"></script>
    <script type="text/javascript" src="/static/js/common/socketio/socket.io.1.7.3.js"></script>
	<script type="text/javascript" src="/static/js/common/printer_core.js"></script>
	<script type="text/javascript" src="/static/js/common/bootstrap/moment.js"></script>
	<script type="text/javascript" src="/static/js/common/bootstrap/moment-with-locales.min.js"></script>
	<script type="text/javascript" src="/static/js/common/barcode_core.js"></script>
	<script type="text/javascript" src="/static/js/common.js?v=2.5"></script>
	<script type="text/javascript" src="/static/js/ui.js?v=20211013"></script>
	<script type="text/javascript" src="/static/js/ui/uiHeader.js?v=20211222"></script>

	<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" async></script>
	<script src="https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.6.7/firebase-analytics.js"></script>

	<script type="text/javascript" src="/static/js/controller/commonController.js?v=20211108"></script>
	<script type="text/javascript" src="/static/js/controller/coachController.js?v=2.5"></script>
	<script type="text/javascript" src="/static/js/controller/memberController.js?v=2.5"></script>
	<script type="text/javascript" src="/static/js/controller/permissionController.js"></script>
	<script type="text/javascript" src="/static/js/controller/smsController.js?v=2.5"></script>

	<script type="text/javascript" src="/static/js/popup/popupCamera.js"></script>
	<script type="text/javascript" src="/static/js/popup/popupLoginCoach.js?v=2.5"></script>
	<script type="text/javascript" src="/static/js/popup/popupMember.js?v=20211116"></script>
	<script type="text/javascript" src="/static/js/popup/popupSendSms.js?v=2.5"></script>
	<script type="text/javascript" src="/static/js/popup/popupTodo.js"></script>
	<script type="text/javascript" src="/static/js/sitemap.js?v=2.5"></script>

	<style type="text/css">
		
			.branchDisplay 							{display:none !important}
		</style>
	<script type="text/javascript">
		const partnerId = Number("774");
		const branchId = Number("0");
		const printerCore = new PrinterCore();
		const socketAddress = {
			https	: "https://crm.bodycodi.com:8043",
			http	: "http://52.78.149.182:8081/"
		};

		const partnerInfo = {
			partner : {
				id			: Number("774"),
				name		: "바디코디",
				branchUseYn	: "N",
				headquartersYn : "N",
				partnerType : "",
				isHeadquarter : ("N" == "Y" && !(Number("0")))
			},
			branch : {
				id			: Number("0"),
				name        : ""
			},
			employee : {
				id			: Number("9807"),
				name		: "기본관리자",
				thumbnail	: "https://d27pagl1acwik5.cloudfront.net/upload/coach/774/2020/09/03/20200903151541",
				typeCode	: "-1",
				sex 		: "",
			},
			licence : {
				isPayment	: "Y",
				remainDate	: Number("635"),
				expireDate	: "2023-09-29 00:00:00"
			},
			state : {
				sms 		: "758"
			},
			scheduler : {
				default		: "class"
			},
			permission : {
				member : {
					create : ("true" == "true") ? true : false,
					update : ("true" == "true") ? true : false,
					remove : ("true" == "true") ? true : false,
					sms : ("true" == "true") ? true : false,
					locker : ("true" == "true") ? true : false,
					point : ("true" == "true") ? true : false,
				},
				payment : {
					payment : ("true" == "true") ? true : false,
					cross : ("true" == "true") ? true : false,
				},
				permissionPayment : {
				},
				permissionMember : {
					accessCommunityPage : "true",
				},
				permissionSchedule : {
				},
				permissionAccounting : {
					readSales : "true",
					readExpenditure : "true",
					readAccount : "false",
					registExpenditure : "true",
					accessAccounting : "true",
					configStaffPay : "true",
					readStaffPay : "true"
				},
				permissionStatistics : {
					sales : "true",
					member : "true",
					appointment : "true",
					classes : "true"
				},
				permissionProduct : {
				}
			}
		};

		window.addEventListener("DOMContentLoaded", function(){
			uiHeader();
		}, true);
	</script>
</head>



<html>
<head>
	<script type="text/javascript" src="/static/js/controller/memberProspectiveController.js"></script>
	<script type="text/javascript" src="/static/js/component/componentMember.js"></script>
	<script type="text/javascript" src="/static/js/common/jquery/jquery.dataTables.min.js"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/jquery/jquery.dataTables.css">
	<style type="text/css">
body													{display:block}

main													{position:absolute; left:0; top:0; padding:0; width:100%; height:100%}
main .container											{}
main .container section									{position:absolute; top:0; height:100%; overflow:auto}
main .container section + section						{margin-top:0}
main .container > .left									{left:0; right:580px; border-right:1px dashed #ccc}
main .container > .left .top							{padding:40px 40px 0 40px}
main .container > .left .middle							{position:relative; padding:0 40px 40px 40px}
main .container > .left .middle > div					{display:table; width:100%; padding-right:40px}

main .container > .right								{right:0; width:580px}
main .container > .right form							{padding:40px}



main .ui-search											{margin:15px 0}
main .ui-search .ui-select + .ui-select					{margin-left:0}

main .ui-table.drop > tbody > tr:nth-child(odd):hover	{outline:1px solid #004fec; background-color:white /*background-color:rgba(33,150,243,0.15) !important*/}
main .ui-table.drop > tbody > tr:nth-child(odd).focus	{outline:1px solid #004fec; background-color:rgba(33,150,243,0.15) !important/*background-color:#004fec !important; color:white !important*/}
main .dataTables_wrapper								{margin-top:0}
main .dataTables_wrapper .dataTables_paginate			{padding-bottom:20px}
main .dataTables_wrapper .dataTable						{margin-top:15px}


main .container > .left .gray							{color:#ccc}
main .container > .left .darkgray						{color:#999}

main .container > .left									{}
main .container > .left .top							{margin-bottom:15px}
main .container > .left .top .action					{text-align:right; font-size:0}
main .container > .left .top .action button				{width:125px; font-size:13px}
main .container > .left .top .action .left				{float:left}

main .container > .left .middle							{/*display:table; width:100%; padding-right:40px; padding-left:0.5px; overflow-x:auto*/}
main .container > .left .middle .ui-tip					{display:inline-block}
main .container > .left .middle .ui-table th			{width:20px; font-size:0}
main .container > .left .middle .ui-table th label		{position:relative; display:inline-block; vertical-align:middle; padding:0; width:20px; height:20px; overflow:hidden}
main .container > .left .middle table + h4				{margin-top:25px}
main .container > .left .middle table tr.bg-yellow		{background-color:rgba(255,205,86,0.175) !important /*background-color:#f2f2f2*/}
main .container > .left .middle table tr.bg-red			{background-color:rgba(255,87,34,0.125) !important /*background-color:#e8e8e8*/}
main .container > .left .middle table tr.bg-green		{background-color:rgba(55,183,114,0.15) !important /*background-color:#f2f2f2*/}
main .container > .left .middle table tr.bg-gray		{background-color:#f2f2f2 !important}
main .container > .left .middle table tr.bg-darkgray	{background-color:#e2e2e2 !important}


main .right form button									{vertical-align:top; width:75px}
main .right form input,
main .right form select									{max-width:200px; text-align:center}
main .right form textarea								{margin-top:10px; width:100%}
main .right form select.small							{margin-left:8px; max-width:85px; text-align-last:center}
main .right form input.name								{margin-right:10px; width:135px}
main .right form input + label,
main .right form select + button						{margin-left:8px}
main .right form .ui-input-radio + .ui-input-radio		{margin-left:16px}

main .right form > ul > li + li							{margin-top:30px}

main .right form li h4									{margin-bottom:10px; font-size:16px}
main .right form li h5									{margin:2px 0 8px 0; font-size:14px; color:inherit}
main .right form li > div + div							{margin-top:10px}
main .right form li hr									{margin:30px 0 25px 0; border-bottom:1px dashed #ccc}
main .right form dl dd									{vertical-align:top}
main .right form dl dd:first-child						{padding-right:5px}
main .right form dl dd:last-child						{padding-left:5px}
main .right form dl dd select							{margin:0; width:100%; max-width:100%; min-width:100%}
main .right form dl dd label,
main .right form dl dd button							{width:100%}
main .right form dl dd button[disabled]					{opacity:0.4}
main .right form dl dd input							{width:100%; max-width:100%}
main .right form dl dd select + label					{margin-top:10px}

main .right form .create,
main .right form .update								{display:none}
main .right form.create .create,
main .right form.update .update							{display:block}
main .right form li button.hidden						{display:none}

main .right form li.submit								{text-align:center}
main .right form li.submit div							{margin:0}
main .right form li.submit button						{width:125px}

main .right form .action								{margin-left:-5px; margin-right:-5px}
main .right form .action dd								{padding:0 5px}
main .right form .action dd button						{width:100%}
main .right form .action dd button + button				{margin:0}
main .right form .action label							{position:relative; overflow:hidden}
main .right form .action label input					{position:absolute; left:-9999px; width:0; height:0; visibility:hidden}
main .right form .action label div						{padding:0 10px; line-height:35px; border:1px solid #ccc; text-align:center; box-sizing:border-box}
main .right form .action label input:checked + div		{background-color:#42485a; border-color:#42485a; color:white}
/*
main .right form .ui-title								{margin-bottom:5px}
main .action.fix										{position:sticky; position:-webkit-sticky; top:0; padding:15px 0; background-color:rgba(255,255,255,0.85); z-index:2}
*/
main .right form .list									{text-align:left; font-size:0}
main .right form .list h4								{margin-bottom:5px}
main .right form .list li								{display:inline-block; vertical-align:top; padding:5px; width:25%; min-width:100px; font-size:13.5px; box-sizing:border-box}
	</style>
</head>
<body>



<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="고객관리">
	<div class="right">
		<a href="/member">회원 검색</a>
		<a href="/member-counseling/index">회원 관리</a>
		<a href="/sales/member-prospective">잠재고객 관리</a>
		<a href="/member/notice/getNotice">커뮤니티 관리</a>
		<a href="/sales/analysis">세일즈 성과 분석</a>
	</div>
	<script type="text/javascript">
		(function() {
			const pathname = window.location.pathname;
			const search = window.location.search;
			const a = document.querySelector(".ui-nav").querySelectorAll("a");
			let isFound = false;
			a.forEach(item => {
				if(pathname == item.getAttribute("href")) {
					if(search.indexOf("isMember") == -1) {
						isFound = true;
						item.classList.add("focus");
					}
				}
			});
			if(!isFound) {
				a[0].classList.add("focus");
			}
		})();
	</script>
</nav>


<!-- 콘텐츠 -->
<div class="contents">
	<!-- 메인 -->
	<main>
		<div class="container">
			<section class="left">
				<div class="top">
					<h2 class="ui-title">잠재고객 목록</h2>
					<p class="ui-note blue">
						전화/온라인 문의한 고객의 정보나 방문한 고객의 정보를 쉽게 기록하고,<br>
						체계적으로 잠재고객관리와 상담 스케줄을 관리할 수 있습니다.
						<span style="float:right; margin-top:-0.75em; text-align:right">
							<span class="yellow">■</span> 1회 연락 ·
							<span class="red">■</span> 2회 이상 연락
						</span>
					</p>
					<div class="ui-search">
						<form onsubmit="return false" autocomplete="off" data-event="filter">
							<div class="date">
								<input name="fromDate" type="calendar" value="">
								<span>부터</span>
								<input name="toDate" type="calendar" value="">
								<span>까지</span>
								<div class="quick">
									<ul>
										<li><a>이번달</a></li>
										<li><a>지난달</a></li>
										<li><a>이번주</a></li>
										<li><a>지난주</a></li>
										<li><a>오늘</a></li>
										<li><a>어제</a></li>
									</ul>
								</div>
							</div>
							<div>
								<select class="ui-select" name="seqPartnerCoach">
									<option value="">담당자 선택</option>
									<option value="">전체</option>
								</select>
								<select class="ui-select" name="possibility">
									<option value="">가능성 선택</option>
									<option value="">전체</option>
									<option value="20">매우 낮음</option>
									<option value="40">낮음</option>
									<option value="60">보통</option>
									<option value="80">높음</option>
									<option value="100">매우 높음</option>
								</select>
								<select class="ui-select" name="isPayment">
									<option value="">결제 구분</option>
									<option value="">전체</option>
									<option value="Y">결제</option>
									<option value="N">미결제</option>
								</select>
								<select class="ui-select" name="contactCount">
									<option value="">연락 횟수</option>
									<option value="">전체</option>
									<option value="0">0회</option>
									<option value="1">1회</option>
									<option value="2">2회</option>
									<option value="3">3회 이상</option>
								</select>
								<button class="ui-button blue" data-event="search">조회</button>
							</div>
						</form>
					</div>
					<div class="action fix">
						<div class="left">
							<button class="ui-button red" data-event="remove">일괄 삭제</button>
						</div>
						<div class="right">
							<button class="ui-button green" data-value="multiple" data-event="sendSms">일괄 문자발송</button>
							<button class="ui-button white" data-value="multiple" data-event="recordSms">일괄 문자기록</button>
							<button class="ui-button white" data-value="multiple" data-event="recordTel">일괄 전화연락</button>
							<button class="ui-button white" data-value="multiple" data-event="assignManager">일괄 담당자 지정</button>
						</div>
					</div>
				</div>
				<div class="middle" data-event="prospectiveList">
					<div>
						<table class="ui-table">
							<thead>
								<tr>
									<th></th><td>구분</td><td>등록일시</td><td>담당자</td>
									<td>고객 정보</td><td>유입 정보</td><td>방문 정보</td>
									<td>마케팅 정보</td><td>결제 정보</td><td>가능성</td>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td class="empty" colspan="10">정보를 불러오는 중 입니다.</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</section>
			<section class="right">
				<form class="create" onsubmit="return false" autocomplete="off" data-event="memberInfo">
					<h2 class="ui-title">잠재고객 정보<var data-msg="memberName"></var></h2>
					<ul>
						<li class="create action fix">
							<dl>
								<dd><button class="ui-button white" data-value="updateReserve" data-event="reset">신규등록</button></dd>
								<dd></dd>
								<dd></dd>
								<dd><button class="ui-button blue" data-event="update">등록</button></dd>
							</dl>
						</li>
						<li class="update action fix" data-event="command" style="margin-top:0">
							<dl>
								<dd><button class="ui-button blue" data-event="reset">신규등록</button></dd>
								<dd></dd>
								<dd>
									<button class="ui-button white hidden" data-event="pass">이용권 판매</button>
									<button class="ui-button white hidden" data-event="member">회원 전환</button>
								</dd>
								<dd><button class="ui-button green" data-event="update">수정</button></dd>
							</dl>
						</li>
						<li style="margin-top:20px">
							<h4>주요 정보</h4>
							<div class="ui-input-phone">
								<input name="mobile" type="number" maxlength="3" data-event="search" value="010" tabIndex>
								<span>-</span>
								<input name="mobile" type="number" maxlength="4" data-event="search" tabIndex>
								<span>-</span>
								<input name="mobile" type="number" maxlength="4" data-event="search" tabIndex>
							</div>
							<textarea class="ui-textarea" name="memo" maxlength="1000" placeholder="상담 내용을 입력해 주세요."></textarea>
						</li>
						<li>
							<h4>유입 상태</h4>
							<div class="list">
								<ul>
									<li><label class="ui-input-radio"><input name="inboundState" type="radio" value="TEL" data-event="inboundState"><span></span>전화</label></li>
									<li><label class="ui-input-radio"><input name="inboundState" type="radio" value="VISIT" data-event="inboundState"><span></span>방문</label></li>
									<li><label class="ui-input-radio"><input name="inboundState" type="radio" value="ONLINE" data-event="inboundState"><span></span>온라인</label></li>
									<li><label class="ui-input-radio"><input name="inboundState" type="radio" value="RECOMMEND" data-event="inboundState"><span></span>지인추천</label></li>
								</ul>
							</div>
						</li>
						<li>
							<h4>유입 경로</h4>
							<div class="list">
								<ul data-event="inboundPathList">
									<li><label class="ui-input-radio"><input name="inboundPathAttr" type="radio" value="6"><span></span>전단지</label></li>
									<li><label class="ui-input-radio"><input name="inboundPathAttr" type="radio" value="7"><span></span>간판</label></li>
									<li><label class="ui-input-radio"><input name="inboundPathAttr" type="radio" value="8"><span></span>현수막</label></li>
									<li><label class="ui-input-radio"><input name="inboundPathAttr" type="radio" value="39"><span></span>드레그인</label></li>
									<li><label class="ui-input-radio"><input name="inboundPathAttr" type="radio" value="9"><span></span>회원추천</label></li>
									<li><label class="ui-input-radio"><input name="inboundPathAttr" type="radio" value="10"><span></span>지인추천</label></li>
									<li><label class="ui-input-radio"><input name="inboundPathAttr" type="radio" value="13"><span></span>블로그</label></li>
									<li><label class="ui-input-radio"><input name="inboundPathAttr" type="radio" value="11"><span></span>페이스북</label></li>
									<li><label class="ui-input-radio"><input name="inboundPathAttr" type="radio" value="12"><span></span>인스타그램</label></li>
									<li><label class="ui-input-radio"><input name="inboundPathAttr" type="radio" value="40"><span></span>홈페이지</label></li>
									<li><label class="ui-input-radio"><input name="inboundPathAttr" type="radio" value="41"><span></span>온라인배너</label></li>
									<li><label class="ui-input-radio"><input name="inboundPathAttr" type="radio" value="14"><span></span>인터넷 검색</label></li>
									<li><label class="ui-input-radio"><input name="inboundPathAttr" type="radio" value="42"><span></span>키워드 광고</label></li>
									<li><label class="ui-input-radio"><input name="inboundPathAttr" type="radio" value="15"><span></span>기업제휴</label></li>
									<li><label class="ui-input-radio"><input name="inboundPathAttr" type="radio" value="16"><span></span>재등록</label></li>
									<li><label class="ui-input-radio"><input name="inboundPathAttr" type="radio" value="17"><span></span>기타</label></li>
								</ul>
							</div>
						</li>
						<li>
							<h4>기본 정보</h4>
							<div>
								<input class="name" name="name" placeholder="이름">
								<label class="ui-input-radio">
									<input type="radio" name="sex" value="M"><span></span>남성
								</label>
								<label class="ui-input-radio">
									<input type="radio" name="sex" value="F"><span></span>여성
								</label>
							</div>
							<div class="ui-input-date">
								<input class="year" name="birthday" type="number" min="1900" max="2100" maxlength="4" placeholder="년도" data-event="computeAge" tabIndex>
								<span>년</span>
								<input class="month" name="birthday" type="number" min="1" max="12" maxlength="2" placeholder="월" data-event="computeAge" tabIndex>
								<span>월</span>
								<input class="day" name="birthday" type="number" min="1" max="31" maxlength="2" placeholder="일" data-event="computeAge" tabIndex>
								<span>일</span>
								<span style="margin-right:5px">만</span>
								<input name="age" type="number" min="0" max="200" maxlength="3" placeholder="나이" data-event="computeAge" style="width:75px !important">
								<span>세</span>
							</div>
							<div>
								<dl>
									<dd><input name="address" type="text" placeholder="주소를 입력해 주세요"></dd>
									<dd><input name="email" type="text" placeholder="이메일 주소를 입력해 주세요"></dd>
								</dl>
							</div>
						</li>
						<li>
							<dl>
								<dd>
									<h4>등록자</h4>
									<select class="ui-select" name="seqRegister">
										<option value="">등록자 선택</option>
									</select>
									<label class="ui-input-checkbox">
										<input name="reconfirmYn" type="checkbox">
										<span></span>
										재확인 필요
									</label>
								</dd>
								<dd>
									<h4>담당자</h4>
									<select class="ui-select" name="seqManager">
										<option value="">담당자 선택</option>
									</select>
								</dd>
							</dl>
						</li>
						<li>
							<h4>등록 목적</h4>
							<div class="list">
								<ul data-event="purposeList"></ul>
							</div>
							<div>
								<textarea class="ui-textarea" name="purposeMemo" maxlength="1000" placeholder="등록 목적을 입력해 주세요."></textarea>
							</div>
						</li>
						<li>
							<h4>등록 가능성</h4>
							<div>
								<label class="ui-input-radio"><input name="possibility" type="radio" value=""><span></span>미선택</label>
								<label class="ui-input-radio"><input name="possibility" type="radio" value="20"><span></span>매우 낮음</label>
								<label class="ui-input-radio"><input name="possibility" type="radio" value="40"><span></span>낮음</label>
								<label class="ui-input-radio"><input name="possibility" type="radio" value="60"><span></span>보통</label>
								<label class="ui-input-radio"><input name="possibility" type="radio" value="80"><span></span>높음</label>
								<label class="ui-input-radio"><input name="possibility" type="radio" value="100"><span></span>매우 높음</label>
							</div>
						</li>
						<li class="create">
							<hr>
							<h4>방문 예약</h4>
							<div>
								<input name="reserveDate" type="calendar" value="" placeholder="방문날짜">
								<select class="ui-select small" name="reserveHour">
									<option value="">시</option>
									
										
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
								시
								<select class="ui-select small" name="reserveMinute">
									<option value="">분</option>
									
										
										<option value="00">00</option>
									
										
										<option value="10">10</option>
									
										
										<option value="20">20</option>
									
										
										<option value="30">30</option>
									
										
										<option value="40">40</option>
									
										
										<option value="50">50</option>
									
										
										<option value="60">60</option>
									
								</select>
								분
							</div>
						</li>
						<li class="update">
							<hr>
							<h4>마케팅 활동</h4>
							<div class="action">
								<dl>
									<dd><button class="ui-button white" data-value="single" data-event="sendSms">문자발송</button></dd>
									<dd><button class="ui-button white" data-value="single" data-event="recordSms">문자기록</button></dd>
									<dd><button class="ui-button white" data-value="single" data-event="recordTel">전화연락</button></dd>
									<dd><button class="ui-button white" data-value="single" data-event="visitCenter">센터방문</button></dd>
								</dl>
							</div>
						</li>
						<li class="update">
							<h4>방문 예약 상태</h4>
							<div>
								<input name="updateReserveDate" type="calendar" value="">
								<select class="ui-select small" name="updateReserveHour">
									<option value="">시</option>
									
										
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
								시
								<select class="ui-select small" name="updateReserveMinute">
									<option value="">분</option>
									
										
										<option value="00">00</option>
									
										
										<option value="10">10</option>
									
										
										<option value="20">20</option>
									
										
										<option value="30">30</option>
									
										
										<option value="40">40</option>
									
										
										<option value="50">50</option>
									
								</select>
								분
							</div>
							<div class="action update visit">
								<dl>
									<dd><button class="ui-button white" data-value="updateReserve" data-event="reserve">예약 변경</button></dd>
									<dd><button class="ui-button white" data-value="visit" data-event="reserve">예약 방문</button></dd>
									<dd><button class="ui-button white" data-value="noVisit" data-event="reserve">예약 미방문</button></dd>
									<dd><button class="ui-button white" data-value="reserve" data-event="reserve">예약</button></dd>
								</dl>
							</div>
						</li>
						<li class="submit">
							<div class="create">
								<button class="ui-button blue" data-event="update">등록</button>
							</div>
							<div class="update">
								<button class="ui-button green" data-event="update">수정</button>
							</div>
						</li>
					</ul>
				</form>
			</section>
		</div>
	</main>
</div>
</body>
<script type="text/javascript">
function doReady() {
	uiSearch("이번달");
	uiTab();
	doPage.open();
}

const doPage = {
	container : undefined,
	seqMemberProspective : 0,
	data : {},
	open : function() {
		this.container = document.querySelector("main");
		Promise.all([
			memberProspectiveController.list(),
			commonController.coachList()
		]).then(([data, coachList]) => {
			this.data = {
				prospectiveList : data.salesList || [],
				purposeList : data.registPurposes || [],
				inboundPathList : data.inboundPaths || [],
				coachList : coachList || [],
				memberInfo : {}
			};
			componentMember.data = this.data;
			this.render();
		}).catch(error => {
			uiError(error);
		});
	},
	update : function(seqMemberProspective, isMultiple) {
		const self = this;

		const setUpdate = (updateData) => {
			const div = this.container.querySelector("[data-event='prospectiveList']");
			const seqMemberProspective = updateData.seqMemberProspective;
			const data = this.data.prospectiveList;
			const j = data.length;
			for(var i = 0; i < j; i++)
				if(data[i].seqMemberProspective == seqMemberProspective) break;
			const isUpdate = (i < j);

			if(isUpdate) {
				data[i] = updateData;
				const table = document.createElement("table");
				table.innerHTML = "<tbody>" + this.template.prospectiveList([updateData], true) + "</tbody>";
				const newTr = table.querySelectorAll("tr[data-sequence]");
				const oldTr = div.querySelectorAll("tr[data-sequence='" + seqMemberProspective + "']");
				oldTr[0].innerHTML = newTr[0].innerHTML;
				oldTr[1].innerHTML = newTr[1].innerHTML;
				oldTr[0].className = (oldTr[0].classList.contains("focus") ? "focus " : "") + this.template.getLineColor(updateData);
				const button = oldTr[1].querySelectorAll("[data-event='update']");
				button.forEach(item => {
					item.onclick = function() {self.event.recordUpdate(this)};
				});
				if(!isMultiple) this.event.memberInfo.preset(updateData);
			} else {
				data.unshift(updateData);
				this.render(true);
			}
		};

		if(Array.isArray(seqMemberProspective)) {
			seqMemberProspective.forEach(item => {
				this.update(item, true);
			});
		} else {
			seqMemberProspective = (seqMemberProspective) ? seqMemberProspective : this.seqMemberProspective;
			if(seqMemberProspective) {
				memberProspectiveController.info(seqMemberProspective).then(data => {
					setUpdate(data);
				}).catch(error => {
					console.log(error);
				});
			}
		}
		this.container.querySelector("[name='seqMemberProspective']").checked = false;
	},
	render : function(isUpdate) {
		const self = this.event.self = this.event.memberInfo.self = this.template.self = this.popup.parent = this;
		this.popup.assignManager.self = this.popup.contact.self = this.popup;

		const setEvent = () => {
			const div = this.container.querySelector(".left");
			uiEvent(div, {
				click : {
					search : function() {
						self.event.search();
					},
					remove : function() {
						self.event.remove();
					},
					sendSms : function() {
						self.event.sendSms(true);
					},
					recordSms : function() {
						self.event.recordSms(true);
					},
					recordTel : function() {
						self.event.recordTel(true);
					},
					assignManager : function() {
						self.event.assignManager();
					}
				}
			});
		};

		const setCoachList = () => {
			const select = this.container.querySelectorAll("[name='seqPartnerCoach'], [name='seqRegister'], [name='seqManager']");
			select.forEach((item, index) => {
				const option = this.data.coachList.map(item => {
					return `<option value="${item.seqPartnerCoach}">${item.coachName}</option>`;
				});
				item.innerHTML += option.join("");
			});
		};

		const setInboundPathList = () => {
			const ul = this.container.querySelector("[data-event='inboundPathList']");
			const label = this.data.inboundPathList.map(item => {
				return `
					<li>
						<label class="ui-input-radio">
							<input name="inboundPathAttr" type="radio" value="${item.seqAttrValue}">
							<span></span>
							${item.attrValue}
						</label>
					</li>
				`;
			});
			ul.innerHTML = label.join("");
		};

		const setPurposeList = () => {
			const ul = this.container.querySelector("[data-event='purposeList']");
			const label = this.data.purposeList.map(item => {
				return `
					<li>
						<label class="ui-input-checkbox">
							<input name="seqPurpose" type="checkbox" value="${item.seqAttrValue}">
							<span></span>
							${item.attrValue}
						</label>
					</li>
				`;
			});
			ul.innerHTML = label.join("");
		};

		const setProspectiveList = () => {
			const div = this.container.querySelector("[data-event='prospectiveList']");
			div.innerHTML = this.template.prospectiveList(this.data.prospectiveList);
			uiTip(div);
			uiTable(div);

			const table = div.querySelector("table");
			const tr = table.querySelectorAll("tbody tr");
			const isDataTable = table.classList.contains("ui-data-table");

			if(isDataTable) {
				const dataTable = $(table).DataTable();
				dataTable.on("draw", function() {
					self.event.memberInfo.reset();
					const tr = div.querySelectorAll("table.drop > tbody > tr:nth-child(odd)");
					tr.forEach(item => {
						item.onclick = function(event) {
							event = event || window.event;
							const tagName =	event.target.tagName.toLowerCase();
							if(!(tagName == "td")) return;
							self.event.memberInfo.open(this);
						};
					});
					const input = div.querySelectorAll("th input");
					input.forEach(item => {
						item.checked = false;
						item.onchange = function() {
							self.event.changeCheck(this);
						};
					});
					const button = div.querySelectorAll("[data-event='update']");
					button.forEach(item => {
						item.onclick = function() {self.event.recordUpdate(this)};
					});
				});
			}
		};

		const setMemberInfo = () => {
			const div = this.container.querySelector("[data-event='memberInfo']");

			uiEvent(div, {
				click : {
					update : function() {
						if(partnerInfo.partner.isHeadquarter) {
							alert("선택된 지점이 없습니다.");
							return;
						}
						self.event.memberInfo.update();
					},
					reset : function() {
						self.event.memberInfo.reset();
						// window.scrollTo(0, 0);
						const body = document.querySelector("body");
						body.scrollTop = body.parentNode.scrollTop = 0;
						div.querySelectorAll("[name='mobile']")[1].focus();
					},
					member : function() {
						self.event.memberInfo.member();
					},
					pass : function() {
						self.event.memberInfo.pass();
					},
					reserve : function() {
						self.event.memberInfo.changeVisitReserve(this);
					},
					sendSms : function() {
						self.event.sendSms(false);
					},
					recordSms : function() {
						self.event.recordSms(false);
					},
					recordTel : function() {
						self.event.recordTel(false);
					},
					visitCenter : function() {
						self.event.memberInfo.visitCenter();
					}
				},
				change : {
					search : function() {
						self.event.memberInfo.search();
					},
					inboundState : function() {
						self.event.memberInfo.changeInboundState();
					},
					computeAge : function() {
						self.event.memberInfo.computeAge(this);
					}
				}
			});
		};

		if(!isUpdate) {
			setEvent();
			setCoachList();
			setInboundPathList();
			setPurposeList();
			setMemberInfo();
		}
		setProspectiveList();
	},
	event : {
		memberInfo : {
			open : function(object) {
				this.reset(object);
				const isFocus = object.classList.contains("focus");

				if(isFocus) {
					const seqMemberProspective = Number(object.getAttribute("data-sequence"));
					this.self.seqMemberProspective = seqMemberProspective;
					const data = this.self.data.prospectiveList.filter(item => {
						return (item.seqMemberProspective == seqMemberProspective);
					})[0];
					if(data) {
						this.self.data.memberInfo = data;
						this.preset(data);
					}
				}
			},
			reset : function(object) {
				const div = this.self.container.querySelector("[data-event='prospectiveList']");
				const tr = Array.from(div.querySelectorAll(".ui-table.drop > tbody > tr"));
				for(let i = 0; i < tr.length; i += 2) {
					if(tr[i] != object) {
						if(tr[i]) tr[i].classList.remove("focus");
						if(tr[i + 1]) tr[i + 1].classList.remove("focus");
					}
				}
				this.self.data.memberInfo = {};
				const seqPartnerCoach = partnerInfo.employee.id;
				const form = this.self.container.querySelector("[data-event='memberInfo']");
				form.className = "create";
				form.parentNode.scrollTop = 0;
				uiForm.reset(form);
				form.putValue("memberName", "");
				form.putValue("seqPartnerCoach", seqPartnerCoach);
				form.putValue("seqRegister", seqPartnerCoach);
				form.putValue("seqManager", seqPartnerCoach);

				this.self.seqMemberProspective = 0;
			},
			preset : function(data) {
				const form = this.self.container.querySelector("[data-event='memberInfo']");
				form.className = "update";

				form.putValue("memberName", " : " + data.name);
				form.putValue("seqMemberProspective", data.seqMemberProspective);
				form.putValue("seqMember", data.seqMember);
				form.putValue("mobileNumber", data.mobile);

				this.self.seqMemberProspective = data.seqMemberProspective;

				if(data.mobile) {
					const mobile = data.mobile.split("-");
					form.querySelectorAll("[name='mobile']").forEach((item, index) => {
						item.value = mobile[index];
					});
				}
				if(data.birthday) {
					const birthday = (data.birthday.year) ? [data.birthday.year, data.birthday.month, data.birthday.day] : data.birthday.split("-");
					form.querySelectorAll("[name='birthday']").forEach((item, index) => {
						item.value = Number(birthday[index]);
					});
					form.putValue("age", getAge(new Date(birthday)));
				}

				form.putValue("name", data.name);
				form.putValue("sex", data.sex);
				form.putValue("address", data.address);
				form.putValue("email", (data.email == "@") ? "" : data.email);
				form.putValue("memo", data.memo);

				form.putValue("seqRegister", data.seqRegister);
				form.putValue("seqManager", data.seqManager);
				form.putValue("reconfirmYn", data.reconfirmYn);

				form.putValue("inboundState", data.inboundState);
				form.putValue("inboundPathAttr", data.inboundPathAttr);

				if(data.memberProspectiveRegistPurposes) {
					data.memberProspectiveRegistPurposes.forEach(item => {
						form.putValue("seqPurpose", item.value);
					});
				}

				form.putValue("possibility", data.possibility);
				if(data.memberProspectiveRegistPurposeEtc)
					form.putValue("purposeMemo", data.memberProspectiveRegistPurposeEtc.description);

				const visitReserve = data.memberProspectiveVisitReserve;
				const visitButton = form.querySelectorAll("[data-event='reserve']");
				visitButton.forEach((item, index) => {
					item.disabled = (index < 3);
				});

				if(visitReserve) {
					let date = visitReserve.reserveDate;
					let time = visitReserve.startTime;
					const hour = time.split(":")[0];
					const minute = time.split(":")[1];

					form.putValue("reserveDate", date);
					form.putValue("reserveHour", hour);
					form.putValue("reserveMinute", minute);

					const state = visitReserve.state;
					if(state == "RESERVE") {
						form.putValue("updateReserveDate", date);
						form.putValue("updateReserveHour", hour);
						form.putValue("updateReserveMinute", minute);
						visitButton.forEach((item, index) => {
							item.disabled = (index == 3);
						});
					}
				}

				const seqMember = data.seqMember || 0;
				const memberButton = form.querySelector("li.update button[data-event='member']");
				const passButton = form.querySelector("li.update button[data-event='pass']");

				memberButton.className = passButton.className = "ui-button white hidden";
				if(seqMember) passButton.className = "ui-button white";
				else memberButton.className = "ui-button white";
				uiForm.update(form);
			},
			update : function() {
				const memberInfo = this.self.data.memberInfo;
				const mode = (memberInfo.seqMemberProspective) ? "update" : "create";
				const form = this.self.container.querySelector("[data-event='memberInfo']");
				const getPurposeList = () => {
					const value = form.getValue("seqPurpose");
					return value.map(item => {
						return {
							seqMemberProspective : memberInfo.seqMemberProspective,
							value : item
						};
					});
				};
				const data = {
					seqMemberProspective : memberInfo.seqMemberProspective,
					seqMember : memberInfo.seqMember,
					mobile : this.getMobile(),
					inboundState : form.getValue("inboundState"),
					inboundPathAttr : form.getValue("inboundPathAttr"),
					name : form.getValue("name"),
					sex : form.getValue("sex") || "M",
					birthday : this.getBirthday(),
					email : form.getValue("email"),
					address : form.getValue("address"),
					reconfirmYn : "N",
					seqRegister : form.getValue("seqRegister"),
					seqManager : form.getValue("seqManager"),
					reconfirmYn : form.getValue("reconfirmYn"),
					memo : form.getValue("memo"),
					possibility : form.getValue("possibility"),
					memberProspectiveRegistPurposes : getPurposeList(),
					memberProspectiveRegistPurposeEtc : {
						seqMemberProspective : memberInfo.seqMemberProspective,
						seqMemberProspectiveRegistPurposeEtc : memberInfo.seqRegistPurposeEtc,
						description : form.getValue("purposeMemo")
					}
				};

				const checkValidate = (data) => {
					for(let name in data) {
						let error = "";
						const value = data[name];
						switch(name) {
							case "name"			: if(!value) error = "회원명을 입력해 주세요."; break;
							case "inboundState"	: if(!value) error = "유입상태를 선택해 주세요."; break;
							case "mobile"		:
								if(!value) error = "휴대폰 번호를 입력해 주세요.";
//								else if(!isMobile(value)) error = "휴대폰 번호를 확인해 주세요.";
								break;
							case "email"		: if(value && !isMail(value)) error = "이메일 주소 확인해 주세요.";
						}
						if(error) {
							alert(error);
							const input = this.self.container.querySelector("[name='" + name + "']");
							if(input) input.focus();
							return false;
						}
					}
					return true;
				};
				if(!checkValidate(data)) return;

				const reserveDate = form.getValue((mode == "create") ? "reserveDate" : "updateReserveDate");
				const reserveHour = form.getValue((mode == "create") ? "reserveHour" : "updateReserveHour");
				const reserveMinute = form.getValue((mode == "create") ? "reserveMinute" : "updateReserveMinute");
				const reserveTime = reserveHour + ":" + reserveMinute;
				const isReserve = (isDate(reserveDate + " " + reserveTime));
				if(isReserve) {
					if(reserveHour === "" || reserveMinute === "") {
						alert("방문 예약 시간을 확인해 주세요.");
						return;
					}
				}
				memberProspectiveController.update(data).then(data => {
					const seqMemberProspective = data.seqMemberProspective;
					if(mode == "create") {
						if(isReserve) {
							this.submitVisitReserve({
								seqMemberProspective : seqMemberProspective,
								seqMemberProspectiveVisitReserve : "",
								reserveDate : reserveDate,
								startTime : reserveTime,
								endTime : reserveTime,
								state : "RESERVE",
								inboundState : data.inboundState
							}, () => {
								this.self.update(seqMemberProspective);
								alert("저장 되었습니다.");
							});
							return;
						}
					}
					this.self.update(seqMemberProspective);
					alert(((mode == "create") ? "저장" : "수정") + "되었습니다.");
				}).catch(error => {
					uiError(error);
				});
			},
			search : function() {
				const memberInfo = this.self.data.memberInfo;
				if(memberInfo.seqMember) return;

				const mobile = this.getMobile();
				if(!mobile) return;
				// if(!isMobile(mobile)) return;
				memberProspectiveController.searchByMobile(mobile).then(data => {
					if(data) {
						alert("같은 휴대폰번호로 등록된 회원정보(잠재고객정보)를 불러옵니다.");
						this.self.data.memberInfo = data;
						this.preset(data);
					}
				}).catch(error => {
					console.log(error);
				});
			},
			submitVisitReserve : function(data, callback) {
				memberProspectiveController.visitReserve(data).then(item => {
					// seqMemberProspectiveVisitReserve 업데이트가 필요하다.
					// this.self.data.memberInfo.memberProspectiveVisitReserve = memberProspectiveVisitReserve;
					if(callback) callback();
				}).catch(error => {
					uiError(error);
				});
			},
			changeVisitReserve : function(object) {
				const self = this.self;
				let state = object.getAttribute("data-value");
				const data = this.self.data.memberInfo;
				const seqMemberProspective = data.seqMemberProspective;
				const seqMemberProspectiveVisitReserve = (data.memberProspectiveVisitReserve) ? data.memberProspectiveVisitReserve.seqMemberProspectiveVisitReserve : "";

				if(state == "reserve" || state == "updateReserve"){
					const form = this.self.container.querySelector("[data-event='memberInfo']");
					const reserveDate = form.getValue("updateReserveDate");
					const reserveHour = form.getValue("updateReserveHour");
					const reserveMinute = form.getValue("updateReserveMinute");
					const reserveTime = reserveHour + ":" + reserveMinute;
					if(reserveHour === "" || reserveMinute === "") {
						alert("방문 예약 시간을 확인해 주세요.");
						return;
					};
					const data = {
						seqMemberProspective : seqMemberProspective,
						seqMemberProspectiveVisitReserve : (state == "reserve") ? "" : seqMemberProspectiveVisitReserve,
						reserveDate : reserveDate,
						startTime : reserveTime,
						endTime : reserveTime,
						state : "RESERVE"
					};

					if(isDate(reserveDate + " " + reserveTime)) {
						this.submitVisitReserve(data, function() {
							self.update();
							if(state == "reserve")
								alert("방문 예약 되었습니다.");
							else
								alert("예약 변경 되었습니다.");
						});
					} else {
						alert("예약 날짜를 다시 한 번 확인해 주세요.");
					}
				} else {
					state = (state == "visit") ? "visit" : "novisit";
					const prefix = (state == "visit") ? "방문" : "미방문";
					if(!confirm(prefix + " 처리하시겠습니까?")) return;
					/*
					console.log(`
						state : ${state},
						seqMemberProspective : ${seqMemberProspective},
						seqMemberProspectiveVisitReserve : ${seqMemberProspectiveVisitReserve}
					`);
					*/
					memberProspectiveController.changeVisitReserveState(state, "", seqMemberProspective, seqMemberProspectiveVisitReserve).then(item => {
						this.self.update();
						alert(prefix + " 처리되었습니다.");
					}).catch(error => {
						uiError(error);
					});
				}
			},
			getMultiInput : function(name, isEmpty) {
				const form = this.self.container.querySelector("[data-event='memberInfo']");
				let array = [];
				let error = false;
				form.querySelectorAll("[name='" + name + "']").forEach((item, index) => {
					let value = item.value.trim();
					if(value) {
						if(name == "birthday" && index > 0) value = value.zf(2);
					} else {
						if(name == "birthday" && index > 0) value = "01";
						else error = true;
					}
					array.push(value);
				});
				return (!error) ? array.join("-") : "";
			},
			getMobile : function(isEmpty) {
				return this.getMultiInput("mobile", isEmpty);
			},
			getBirthday : function(isEmpty) {
				return this.getMultiInput("birthday", isEmpty);
			},
			changeInboundState : function() {
				const form = this.self.container.querySelector("[data-event='memberInfo']");
				const seqMemberProspective = this.self.seqMemberProspective;
				const inboundState = form.getValue("inboundState");
				if(!seqMemberProspective) return;

				memberProspectiveController.changeInboundState(seqMemberProspective, inboundState).then(data => {
					this.self.update();
				}).catch(error => {
					uiError(error);
				});
			},
			computeAge : function(object) {
				const form = this.self.container.querySelector("[data-event='memberInfo']");
				const input = form.querySelectorAll("[name='birthday']");
				const name = object.name;
				const value = object.value.trim();
				const today = new Date();
				if(name == "age") {
					let year = today.getFullYear();
					const month = (input[1].value) ? input[1].value : 1;
					const day = (input[2].value) ? input[2].value : 1;
					year = (value) ? year - Number(value) : year;
					const isPass = (Number((today.getMonth() + 1) + "" + today.getDate().zf(2)) > Number(month.zf(2) + "" + day.zf(2)));
					if(!isPass) year--;
					input[0].value = (value) ? year : "";
					input[1].value = (value) ? month : "";
					input[2].value = (value) ? day : "";
				} else {
					const birthday = this.getBirthday();
					let year = input[0].value;
					let age = "";
					if(year) {
						year = (year) ? Number(year) : today.getFullYear();
						const date = (birthday) ? new Date(birthday) : new Date(year, 0, 1);
						age = getAge(date);
					}
					form.putValue("age", age);
				}
			},
			visitCenter : function() {
				if(confirm("방문처리 하시겠습니까?")) {
					const seqMemberProspective = this.self.seqMemberProspective;
					memberProspectiveController.visitCenter(seqMemberProspective).then(data => {
						this.self.update();
					}).catch(error => {
						uiError(error);
					});
				}
			},
			member : function() {
				const form = this.self.container.querySelector("[data-event='memberInfo']");
				const memberInfo = this.self.data.memberInfo;
				popupRegisterMember.open(0, {
					seqMemberProspective : memberInfo.seqMemberProspective,
					name : form.getValue("name"),
					sex : form.getValue("sex") || "M",
					mobile : this.getMobile(),
					seqPartnerCoach : form.getValue("seqManager"),
					inboundPathAttr : form.getValue("inboundPathAttr"),
					address : form.getValue("address"),
					email : form.getValue("email"),
					birthday : this.getBirthday()
				}, true);
			},
			pass : function() {
				const memberInfo = this.self.data.memberInfo;
				const seqMember = memberInfo.seqMember;
				const seqMemberProspective = memberInfo.seqMemberProspective;
				const seqMemberProspectiveVisitReserve = (memberInfo.memberProspectiveVisitReserve) ? memberInfo.memberProspectiveVisitReserve.seqMemberProspectiveVisitReserve : 0;
				if(!seqMember) return;

				const state = (seqMemberProspectiveVisitReserve) ? "visit" : "walkin";
				const type = (seqMemberProspectiveVisitReserve) ? "" : "once";

				memberProspectiveController.changeVisitReserveState(state, type, seqMemberProspective, seqMemberProspectiveVisitReserve).then(item => {
					window.location.href = "/member/" + seqMember + "/sell/pass";
				}).catch(error => {
					uiError(error);
				});
			}
		},
		recordUpdate : function(object) {
			const type = object.getAttribute("data-type");
			const seqMemberProspective = object.getAttribute("data-seqMemberProspective");
			const seqMemberProspectiveContact = object.getAttribute("data-seqMemberProspectiveContact");
			const memberList = this.self.event.getMemberList(false);
			this.self.popup.contact.open(type, memberList, seqMemberProspective, seqMemberProspectiveContact);
		},
		changeCheck : function(object) {
			const div = this.self.container.querySelector("[data-event='prospectiveList']")
			const inputList = div.querySelectorAll("th input");
			const checked = object.checked;
			if(!object.value) {
				inputList.forEach(item => {
					item.checked = checked;
				});
			} else {
				const checkList = div.querySelectorAll("tbody th input");
				const checkedList = div.querySelectorAll("tbody th input:checked");
				inputList[0].checked =  (checkList.length == checkedList.length);
			}
		},
		getMemberList : function(isMultiple) {
			const div = this.self.container.querySelector("[data-event='prospectiveList']")
			const memberList = (isMultiple) ? Array.from(div.querySelectorAll("tbody th input:checked")).map(item => {
				return item.value;
			}) : [this.self.seqMemberProspective];
			if(memberList.length == 0)
				alert("선택된 잠재고객이 없습니다.");
			return memberList;
		},
		search : function() {
			const form = this.self.container.querySelector("[data-event='filter']");
			const data = {
				seqManager : form.getValue("seqPartnerCoach"),
				fromDate : form.getValue("fromDate"),
				toDate : form.getValue("toDate"),
				possibility : form.getValue("possibility"),
				isPayment : form.getValue("isPayment"),
				contactCount : form.getValue("contactCount")
			};

			if(!(data.fromDate && data.toDate)) {
				alert("시작 날짜와 종료 날짜를 선택해 주세요.");
				return;
			}
			if(getPeriod(data.fromDate, data.toDate) < 0) {
				alert("종료 날짜를 시작 날짜 보다 크게 설정해 주세요.");
				return;
			}

			memberProspectiveController.list(data).then(data => {
				this.self.data.prospectiveList = data.salesList;
				this.self.event.memberInfo.reset();
				this.self.render(true);
			});
		},
		sendSms : function(isMultiple) {
			const memberList = this.getMemberList(isMultiple);
			if(memberList.length == 0) return;
			const senderList = [];
			const seqPartner = partnerInfo.partner.id;
			const seqPartnerCoach = partnerInfo.employee.id;
			memberList.forEach(item => {
				const seqMemberProspective = item;
				const data = this.self.data.prospectiveList.filter(item => {
					return (item.seqMemberProspective == seqMemberProspective);
				})[0];
				if(data) {
					senderList.push({
						memberName : data.name,
						membershipNo: "",
						receiveNumber: data.mobile,
						reservationYn : "N",
						sendRoute : "MEMBER",
						seqMember : data.seqMember || "",
						seqPartner : seqPartner,
						regId : seqPartnerCoach,
						updateId : seqPartnerCoach
					});
				}
			});

			const self = this.self;
			popupSmsSend.open({
				isManager : true,
				smsMemberList : senderList
			}, function(data) {
				const historyList = memberList.map(item => {
					return {
						seqMemberProspective : item,
						contact : "SMS",
						message : data.message,
						seqContactManager : data.seqPartnerCoach
					};
				});
				memberProspectiveController.contact.create(historyList).then(data => {
					self.update(memberList);
				}).catch(error => {
					uiError(error);
				});
			})
		},
		recordSms : function(isMultiple) {
			const memberList = this.getMemberList(isMultiple);
			if(memberList.length == 0) return;
			this.self.popup.contact.open("SMS", memberList);
		},
		recordTel : function(isMultiple) {
			const memberList = this.getMemberList(isMultiple);
			if(memberList.length == 0) return;
			this.self.popup.contact.open("TEL", memberList);
		},
		assignManager : function(object) {
			const memberList = this.getMemberList(true);
			if(memberList.length == 0) return;
			this.self.popup.assignManager.open(memberList);
		},
		remove : function() {
			const checkList = this.getMemberList(true);
			if(checkList.length == 0) return;
			if(confirm("일괄 삭제하시겠습니까?")) {
				memberProspectiveController.remove(checkList).then(data => {
					this.search();
				}).catch(error => {
					uiError(error);
				});
			};
		},
	},
	template : {
		getState : {
			inbound : {
				VISIT : "방문",
				TEL : "전화",
				ONLINE : "온라인",
				RECOMMEND : "지인추천"
			},
			visitReserve : {
				RESERVE : "방문 예약",
				VISIT : "예약 후 방문",
				NO_VISIT : "예약 후 미방문",
				WALKIN_VISIT : "센터 방문"
			},
			historyType : {
				SMS : "문자연락",
				TEL : "전화연락",
				VISIT : "방문상담",
				RESERVE : "방문 예약",
				RESERVE_MODIFY : "방문 예약",
				RESERVE_VISIT : "방문",
				RESERVE_NO_VISIT : "방문",
				WALKIN_VISIT : "방문",
				MANAGER_ASSIGNMENT : "담당자 변경",
				INBOUND_STATE_MODIFY : "유입정보 변경",
				INBOUND : "유입정보 변경"
			}
		},
		getDate : function(date, time, isBreak) {
			if(time) {
				const dateTime = new Date(date.year, date.month - 1, date.day, time.hour, time.minute);
				date = dateTime.format("yyyy.sm.sd (sw)");
				time = dateTime.format("ap sh:MM");
				return `${date} ${(isBreak) ? '<br>' : ''} ${time}`;
			} else {
				return uiDate(new Date(date.year, date.month - 1, date.day));
			}
		},
		getDateTime : function(dateTime, isTime, isBreak) {
			if(!dateTime) dateTime = "";
			if(dateTime.indexOf("T") > -1) {
				dateTime += "+09:00";
			}
			const date = new Date(dateTime).format("yyyy.sm.sd (sw)");
			if(!isTime) return date;
			const time = new Date(dateTime).format("ap sh:MM");
			return `${date} ${(isBreak) ? '<br>' : ''} ${time}`;
		},
		getDateInfo : function(item) {
			const dateTime = (item.contactDatetime) ? item.contactDatetime : item.regDt;
			item.date = uiDate(dateTime, "time");
			item.time = new Date(dateTime).getTime();
			return item;
		},
		getInboundPath : function(seqAttrValue) {
			const data = this.self.data.inboundPathList.filter(item => {
				return (item.seqAttrValue == seqAttrValue);
			})[0];
			return (data) ? data.attrValue : "기타";
		},
		getCoachName : function(seqPartnerCoach) {
			const data = this.self.data.coachList.filter(item => {
				return (item.seqPartnerCoach == seqPartnerCoach);
			})[0];
			return (data) ? data.coachName : "-";
		},
		getPossibility : function(value) {
			return {
				0 : "없음",
				20 : "매우 낮음",
				40 : "낮음",
				60 : "보통",
				80 : "높음",
				100 : "매우 높음"
			}[value];
		},
		getLineColor : function(item) {
			const contactList = item.memberProspectiveContacts;
			if(!contactList) return "";
			const count = contactList.length;
			if(count == 0) return "";
			if(count == 1) return "bg-yellow";
			return "bg-red";
		},
		prospectiveList : function(data, isUpdate) {
			let tr = data.map(item => {
				const getDateInfo = () => {
					return this.getDateTime(item.regDt, true, true);
				};
				const getMemberInfo = () => {
					const summary = [];
					let name = item.name;
					summary.push(name);
					if(item.sex) summary.push((item.sex == "M") ? "남성" : "여성");
					if(item.birthday) {
						const birthday = (typeof item.birthday == "object") ? new Date(item.birthday.year, item.birthday.month, item.birthday.day) : new Date(item.birthday);
						const age = getAge(birthday);
						if(age) summary.push(age + "세");
					}
					return summary.join(" / ") + "<br>" + item.mobile;
				};
				const getInboundInfo = () => {
					const summary = [];
					if(item.inboundState) summary.push(this.getState.inbound[item.inboundState]);
					if(item.inboundPathAttr) summary.push("(" + this.getInboundPath(item.inboundPathAttr) + ")");
					return (summary.length == 0) ? "-" : summary.join("<br>");
				};
				const getVisitInfo = () => {
					const object = item.memberProspectiveVisitReserve;
					if(!object) return "-";
					const state = (object.state) ? this.getState.visitReserve[object.state] : "";
					const date = this.getDateTime(object.reserveDate + "T" + object.startTime, true);
					return (state) ? state + "<br>" + date : date;
				};
				const getMarketingInfo = () => {
					const array = item.memberProspectiveContacts;
					if(!array || array.length == 0) return "-";
					const length = array.length - 1;
					const type = this.getState.historyType[array[0].contact];
					const getDate = (item) => {
						return (item.contactDatetime) ?
							this.getDateTime(item.contactDatetime, true) :
							this.getDateTime(item.regDt, true)
					};

					const date = getDate(array[length]);

					const message = array.map((item, index) => {
						const type = this.getState.historyType[item.contact];
						const date = getDate(item);
						return type + " : " + date;
					});
					const suffix = (length > 0) ? " 외 " + length + "건" : "";
					const name = type + suffix;
					return `${name}<br>${date}`;
					return `
						<div class="ui-tip none" data-tip-color="blue" data-tip="${message.join("<br>")}">
							${name}<br>${date}
						</div>
					`;

				};

				const getPaymentInfo = () => {
					const data = item.memberProspectivePayment;
					if(!data) return "-";
					const date = this.getDateTime(data.regDt, true);
					const message = `결제상품 : ${data.productName}<br>결제금액 : ${getComma(data.totalPayments)}<br>결제담당자 : ${data.coachName}`;
					return `결제완료<br>${date}`;
					return `
						<div class="ui-tip none" data-tip-color="gray" data-tip="${message}">
							${결제완료}<br>${date}
						</div>
					`;
				};

				const getPossibilityInfo = () => {
					/*
					const summary = [];
					const contactList = item.memberProspectiveContacts;
					const possibility = item.possibility;
					if(contactList && contactList.length > 0)
						summary.push(contactList.length + "회");
					if(possibility) summary.push("(" + this.getPossibility(possibility) + ")");
					return (summary.length == 0) ? "-" : summary.join("<br>");
				 	*/
					return this.getPossibility(item.possibility) || "-";
				};

				const getDetailList = (command) => {
					let dataList = [];
					let title = "";
					if(command == "marketing") {
						title = "마케팅 내역";
						const data = item.memberProspectiveContacts || [];
						dataList = item.memberProspectiveContacts.map(item => {
							item.type = (item.contact) ? this.getState.historyType[item.contact] : "-";
							item.content = item.message;
							item.coachName = this.getCoachName(item.seqContactManager);
							item.button = `<button class="ui-button small white" data-type="${item.contact}" data-seqMemberProspective="${item.seqMemberProspective}" data-seqMemberProspectiveContact="${item.seqMemberProspectiveContact}" data-event="update">수정</button>`;
							return this.getDateInfo(item);
						});
					} else if(command == "history") {
						title = "활동 내역";
						const data = item.memberProspectiveHistories || [];
						dataList = item.memberProspectiveHistories.map(item => {
							if(item.oldType) item.type = item.oldType;
							else item.oldType = item.type;
							item.type = (item.type) ? this.getState.historyType[item.type] : "-";
							item.coachName = this.getCoachName(item.regId);
							return this.getDateInfo(item);
						});
					} else if(command == "payment") {
						title = "결제 정보";
						const data = item.memberProspectivePayment;
						if(data) {
							dataList.push(this.getDateInfo({
								type : "결제",
								coachName : data.CoachName || data.coachName,
								content : data.productName + " / " + getComma(data.totalPayments) + "원",
								regDt : data.regDt
							}));
						}
					}

					if(command == "payment" && dataList.length == 0) return "";

					let tr = dataList.map(item => {
						return `
							<tr>
								<td>${item.date}</td>
								<td>${item.type}</td>
								<td>${item.coachName}</td>
								<td class="memo">${item.content}</td>
								<td>${item.button || ""}</td>
							</tr>
						`;
					});
					tr = (tr.length == 0) ? `<tr><td colspan="5">현재 내역이 없습니다.</td></tr>` : tr.join("");

					return `
						<h4 class="ui-sub-title">${title}</h4>
						<table class="ui-table">
							<colgroup><col width="22.5%"><col width="15%"><col width="15%"><col width="40%"><col width="7.5%"></colgroup>
							<thead>
								<tr><td>일시</td><td>종류</td><td>담당자</td><td>내용</td><td>기타</td></tr>
							</thead>
							<tbody>
								${tr}
							</tbody>
						</table>
					`;
				};

				const memberType = (item.seqMember) ? `<span class="green">회원</span>` : `<span class="red">잠재</span>`;
				if(item.reconfirmYn == "Y") name = `<em class="bg green">재확인</em>${name}`;

				const getManagerName = () => {
					const summary = [];
					if(item.managerName) summary.push(item.managerName);
					if(item.reconfirmYn == "Y") summary.push(`<span class="red">(재확인)</span>`);
					return (summary.length == 0) ? "-" : summary.join("<br>");
				};

				return `
					<tr class="${this.getLineColor(item)}" data-sequence="${item.seqMemberProspective}">
						<th>
							<label class="ui-input-checkbox">
								<input name="seqMemberProspective" type="checkbox" value="${item.seqMemberProspective}">
								<span></span>
							</label>
						</th>
						<td>${memberType}</td>
						<td>${getDateInfo()}</td>
						<td>${getManagerName()}</td>
						<td>${getMemberInfo()}</td>
						<td>${getInboundInfo()}</td>
						<td>${getVisitInfo()}</td>
						<td>${getMarketingInfo()}</td>
						<td>${getPaymentInfo()}</td>
						<td>${getPossibilityInfo()}</td>
					</tr>
					<tr data-sequence="${item.seqMemberProspective}">
						<td colspan="10">
							<div class="box">
								${getDetailList("marketing")}
								${getDetailList("history")}
								${getDetailList("payment")}
							</div>
						</td>
					</tr>
				`;
			});

			if(isUpdate) return tr.join("");

			const className = (tr.length == 0) ? "ui-table" : "ui-data-table";
			tr = (tr.length == 0) ? `<tr><td class="empty" colspan="10">검색 결과가 없습니다.</td></tr>` : tr.join("");
			return `
				<table class="${className} drop" data-table-dom="rift">
					<thead>
						<tr>
							<th>
								<label class="ui-input-checkbox">
									<input name="seqMemberProspective" type="checkbox" value="">
									<span></span>
								</label>
							</th>
							<td>구분</td>
							<td>등록일시</td>
							<td>담당자</td>
							<td>고객 정보</td>
							<td>유입 정보</td>
							<td>방문 정보</td>
							<td>마케팅 정보</td>
							<td>결제 정보</td>
							<td>가능성</td>
						</tr>
					</thead>
					<tbody>${tr}</tbody>
				</table>
			`;
		}
	},
	popup : {
		assignManager : {
			popup : undefined,
			data : {
				memberList : []
			},
			open : function(memberList) {
				if(this.popup) return;
				this.data.memberList = memberList;
				this.render();
			},
			close : function() {
				this.popup = undefined;
				uiPopup();
			},
			submit : function() {
				const select = this.popup.querySelector("[name='seqPartnerCoach']");
				const seqPartnerCoach = select.value;
				const coachName = select.options[select.selectedIndex].innerHTML;
				if(!seqPartnerCoach) {
					alert("담당자를 선택해 주세요.");
				}
				const data = this.data.memberList.map(item => {
					return {
						seqMemberProspective : item,
						seqManager : seqPartnerCoach,
						coachName : coachName
					}
				});
				memberProspectiveController.assignManager(data).then(() => {
					memberProspectiveController.createHistory(data.map(item => {
						return {
							seqMemberProspective : item.seqMemberProspective,
							type : "MANAGER_ASSIGNMENT",
							content : "담당자 지정 : " + item.coachName
						};
					})).then(() => {
						this.self.parent.update(this.data.memberList);
					});
				}).catch(error => {
					uiError(error);
				}).finally(() => {
					this.close();
				});
			},
			render : function() {
				const self = this;
				this.popup = uiPopup({
					template : this.template(),
					event : {
						click : {
							close : function() {self.close()},
							submit : function() {self.submit()}
						}
					}
				});
				componentMember.setCoachList(this.popup);
			},
			template : function() {
				return `
					<div class="popup micro">
						<div class="top">
							<h2>담당자 지정<a data-event="close"></a></h2>
						</div>
						<div class="middle">
							<select class="ui-select" name="seqPartnerCoach">
								<option value="">담당자 선택</option>
							</select>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">취소</button>
							<button class="ui-button" data-event="submit">저장</button>
						</div>
					</div>
				`;
			}
		},
		contact : {
			popup : undefined,
			mode : "create",
			data : {
				memberList : [],
				contactType : "",
				seqMemberProspective : "",
				seqMemberProspectiveContact : "",
				contactInfo : {}
			},
			open : function(contactType, memberList, seqMemberProspective, seqMemberProspectiveContact) {
				if(this.popup) return;
				this.mode = (seqMemberProspective && seqMemberProspectiveContact) ? "update" : "create";
				this.data = {
					memberList : memberList,
					contactType : contactType,
					seqMemberProspective : seqMemberProspective || "",
					seqMemberProspectiveContact : seqMemberProspectiveContact || "",
				};
				if(this.mode == "update") {
					memberProspectiveController.contact.info(seqMemberProspective, seqMemberProspectiveContact).then(data => {
						this.data.contactInfo = data.contact;
						this.render();
					}).catch(error => {
						uiError(error);
					});
				} else {
					this.render();
				}
			},
			close : function() {
				this.popup = undefined;
				uiPopup();
			},
			remove : function() {
				memberProspectiveController.contact.remove(this.data.seqMemberProspective, this.data.seqMemberProspectiveContact).then(data => {
					alert("삭제되었습니다.");
					this.refresh();
					this.close();
				}).catch(error => {
					uiError(error);
				});
			},
			refresh : function() {
				const isMultiple = (this.data.memberList.length > 1);
				this.self.parent.update(this.data.memberList);
//				if(isMultiple) this.self.parent.update(this.data.memberList);
//				else this.self.parent.update(this.data.seqMemberProspective);
			},
			submit : function() {
				const seqMemberProspectiveContact = this.data.seqMemberProspectiveContact;
				const contact = this.data.contactType;
				const message = this.popup.getValue("message");
				const date = this.popup.getValue("date");
				const time = this.popup.getValue("hour").zf(2) + ":" + this.popup.getValue("minute").zf(2) + ":00";
				const dateTime = date + "T" + time;
				const seqPartnerCoach = this.popup.getValue("seqPartnerCoach");
				if(!message) {
					alert("내용을 입력해 주세요.");
					return;
				}
				if(!seqPartnerCoach) {
					alert("담당자를 선택해 주세요.");
					return;
				}
				const data = this.data.memberList.map(item => {
					return {
						seqMemberProspective : item,
						seqMemberProspectiveContact : "",
						contact : contact,
						message : message,
						contactDatetime : dateTime,
						seqContactManager : seqPartnerCoach
					};
				});
				const isMultiple = (this.data.memberList.length > 1);
				if(this.mode == "create") {
					memberProspectiveController.contact.create(data).then(data => {
						alert("저장되었습니다.");
						this.refresh();
						this.close();
					}).catch(error => {
						uiError(error);
					});
				} else {
					const data = {
						memberProspectiveContact : {
							seqMemberProspectiveContact : seqMemberProspectiveContact,
							message : message
						}
					};
					memberProspectiveController.contact.update(data).then(data => {
						alert("수정되었습니다.");
						this.refresh();
						this.close();
					}).catch(error => {
						uiError(error);
					});
				}
			},
			render : function() {
				const self = this;
				this.popup = uiPopup({
					template : this.template(),
					event : {
						click : {
							close : function() {self.close()},
							remove : function() {self.remove()},
							submit : function() {self.submit()}
						}
					}
				});

				const hour = new Date().getHours();
				let minute = Math.round(new Date().getMinutes() / 5) * 5;
				if(minute > 59) minute = 55;
				this.popup.putValue("hour", hour);
				this.popup.putValue("minute", minute);
				uiCalendar(this.popup);
				componentMember.setCoachList(this.popup);

				if(this.mode == "update") this.prepare();
			},
			prepare : function() {
				const data = this.data.contactInfo;
				let dateTime = data.contactDatetime || "";
				if(dateTime.indexOf("T") > -1) dateTime += "+09:00";
				dateTime = new Date(dateTime);
				const date = dateTime.format("yyyy-mm-dd");
				const hour = dateTime.getHours();
				const minute = parseInt(dateTime.getMinutes() / 5) * 5;
				this.popup.putValue("date", date);
				this.popup.putValue("hour", hour);
				this.popup.putValue("minute", minute);
				this.popup.putValue("seqPartnerCoach", data.seqContactManager);
				this.popup.putValue("message", data.message);
			},
			template : function() {
				const contactType = (this.data.contactType == "TEL") ? "전화" : "문자";
				const getHour = () => {
					const option = [];
					for(let i = 0; i < 24; i++)
						option.push(`<option value="${i}">${i.zf(2)}</option>`);
					return option.join("");
				};
				const getMinute = () => {
					const option = [];
					for(let i = 0; i < 60; i+= 5)
						option.push(`<option value="${i}">${i.zf(2)}</option>`);
					return option.join("");
				};
				const getButton = () => {
					if(this.mode == "update") {
						return `
							<button class="ui-button gray" data-event="close">취소</button>
							<!--<button class="ui-button red" data-event="remove">삭제</button>-->
							<button class="ui-button green" data-event="submit">수정</button>
						`;
					} else {
						return `
							<button class="ui-button gray" data-event="close">취소</button>
							<button class="ui-button" data-event="submit">저장</button>
						`;
					}
				};
				const isDisable = (this.mode == "update") ? "disabled" : "";
				return `
					<div class="popup tiny" style="max-width:540px">
						<div class="top">
							<h2>${contactType}기록<a data-event="close"></a></h2>
						</div>
						<div class="middle ui-form">
							<table>
								<tr class="date">
									<th>${contactType}일시</th>
									<td>
										<input name="date" type="calendar" value="today" ${isDisable}>
										<select class="ui-select date" name="hour" ${isDisable}>
											<option value="">시</option>
											${getHour()}
										</select>
										시
										<select class="ui-select date" name="minute" ${isDisable}>
											<option value="">분</option>
											${getMinute()}
										</select>
										분
									</td>
								</tr>
								<tr>
									<th>담당자 선택</th>
									<td>
										<select class="ui-select" name="seqPartnerCoach" ${isDisable}>
											<option value="">담당자 선택</option>
										</select>
									</td>
								</tr>
								<tr>
									<th>${contactType}내용</th>
									<td>
										<textarea class="ui-textarea" name="message" maxlength="1000"></textarea>
									</td>
								</tr>
							</table>
						</div>
						<div class="bottom">
							${getButton()}
						</div>
					</div>
				`;
			}
		}
	}
};
 </script>
</html>

</html>
