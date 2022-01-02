
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
	<script type="text/javascript" src="/static/js/controller/placeController.js?v=20210729"></script>
	<script type="text/javascript" src="/static/js/controller/partnerController.js"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/partnerSetting.css">
	<style type="text/css">

.ui-image-box:before					{content:"이미지 업로드\A(900픽셀 × 900픽셀 권장)"}

.lessonInfo .ui-image-box-list			{margin-top:10px}

.openInfo .box							{padding:15px; border:1px solid #ccc}
.openInfo > ul > li						{margin-top:35px}
.openInfo .week ul						{line-height:35px}
.openInfo .week ul li > span			{margin-right:35px; font-weight:500}

.openInfo .holiday dl					{width:100%}
.openInfo .holiday dl dt				{width:330px; border:1px solid #ccc}
.openInfo .holiday dl dt + dd			{width:15px}
.openInfo .holiday dl dd + dd			{padding:15px; vertical-align:top; border:1px solid #ccc}
.openInfo .holiday dl dt table td a		{width:30px; height:30px; line-height:30px}

.openInfo .holiday dl dd h4				{margin-bottom:10px; padding:0 0 8px 0; font-size:15px; border:none; border-bottom:1px solid #ccc}
.openInfo .holiday dl dd h4:before		{display:none}
.openInfo .holiday dl dd > div			{margin-left:-4px; margin-right:-4px}

.openInfo .holiday ul					{line-height:1; text-align:left}
.openInfo .holiday li					{position:relative; display:inline-block; margin:4px; padding:10px 30px 10px 10px; border:1px solid #ccc}
.openInfo .holiday li a					{position:absolute; right:8px; top:50%; margin-top:-0.45em; width:1em; height:1em; background:url(/static/img/icon/icon_close_black.png) no-repeat center center / 10px; opacity:0.25}
.openInfo .holiday li a:hover			{opacity:0.5}

.ui-info input							{max-width:100px}
.ui-info input.name						{max-width:175px}
.ui-info input.wide						{width:250px; max-width:250px}
.ui-info select							{max-width:135px}

.ui-info .add							{padding:10px 0}
.ui-info .add *							{margin:0 5px 0 0;}
.ui-info .add button					{vertical-align:top; width:100px}

.ui-info .list							{margin:5px -5px 0 -5px; text-align:left}
.ui-info .list li						{display:inline-block; vertical-align:top; margin:5px; padding:10px 12px 10px 10px; background-color:#f0f0f0}
.ui-info .list li.empty					{display:block; margin-top:10px; padding:5px 20px; line-height:35px}
.ui-info .list li button				{display:inline-block; vertical-align:top; margin:7.5px 0 7.5px 5px; width:20px; height:20px; background:#ff5722 url(/static/img/icon/icon_minus_white.png) no-repeat center center / 20px; border-radius:100%; border:none}
.ui-info .list li button.disabled,
.ui-info .list li button:disabled		{background-color:#ccc}
.ui-info .list li.hidden				{display:none}

.ui-info .list.block					{margin-top:10px}
.ui-info .list.block li					{display:block}
.ui-info .list.block li + li			{margin-top:10px}
.ui-info .list.block li input + input	{margin-left:5px}

.ui-info dl								{width:auto}
.ui-info dl dt							{width:150px}
.ui-info dl dd select					{width:250px; max-width:250px; text-align:left; text-align-last:left}


.ui-info .del							{height:35px; line-height:35px}
.ui-info .del .left						{float:left}
.ui-info .del .right					{float:right}
.ui-info .del .right select				{max-width:250px}
.ui-info .del .right button				{vertical-align:top; width:125px}
	</style>
</head>
<body>



<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="센터관리">
	<div class="right">
		<a href="/sms/send">SMS/알림톡</a>
		<a href="/partner/naver">네이버 연동</a>
		<a href="/partner/keepfit">키핏 연동</a>
		<a class="focus" href="/partner/operation">센터 설정</a>
		<a href="/manager/group">그룹 관리</a>
		<a href="/locker">락커 관리</a>
		<a href="/product/public">일반 상품 관리</a>
		<a href="/reservationsetting/setting/appointment">예약정책</a>
		<a href="/partner/use">입장 내역</a>
		<a href="/manager/history/index">히스토리</a>
	</div>
</nav>

<aside class="ui-side">
	<div class="menu">
		<h4>센터 설정</h4>
		<ul>
			<li><a href="/partner/operation">운영 관리</a></li>
			<li><a href="/partner/checkin">입장 관리</a></li>
			
			<li><a href="/partner/info">센터 정보</a></li>
			<li><a href="/b-pay/policy">b.pay 정책관리</a></li>
			
			<li><a href="/partner/license">라이선스</a></li>
			<li><a href="/partner/customer">거래처 관리</a></li>
		</ul>
	</div>

	<script type="text/javascript">
		(function() {
			const pathname = window.location.pathname;
			const a = document.querySelector(".ui-side").querySelectorAll("a");
			a.forEach(item => {
				if(pathname == item.getAttribute("href"))
					item.parentNode.classList.add("focus");
			});
		})();
	</script>
</aside>

<main class="ui-form">
	<!-- 입장관리 터치스크린 화면 설정 -->
	<section>
		<h2 class="ui-title">입장관리 터치스크린 화면 설정</h2>
		<table>
			<tr>
				<th>입장체커 문구 설정</th>
				<td>
					<ul>
						<li><input class="name" type="text" name="entranceCheckerMainText" maxlength="18" placeholder="메인 인사말 (최대 18자)"></li>
						<li><input class="name" type="text" name="entranceCheckerSubText" maxlength="30" placeholder="보조 인사말 (최대 30자)"></li>
					</ul>
				</td>
			</tr>
			<tr>
				<th>입장체커 이미지 설정</th>
				<td>
					<form class="ui-image-box empty" name="checkerImage" action="" method="post" enctype="multipart/form-data">
						<img src="">
						<input name="checkerImg" type="file" data-type="checker" accept="image/png,image/jpg,image/jpeg" data-event="uploadImage">
						<a></a>
					</form>
				</td>
			</tr>
		</table>
	</section>

	<!-- 그룹 수업 이미지 등록 -->
	<section class="lessonInfo" data-id="lessonInfo">
		<h2 class="ui-title">그룹 수업 이미지 등록</h2>
		<p class="ui-note blue">
			회원이 그룹수업 예약시, 수업이 진행되는 룸(장소)의 도면 이미지나 사진을 확인 할 수 있습니다.<br>
			회원은 어플에서 등록된 이미지를 보고 수업 내 특정 자리를 선택해서 예약할 수 있습니다.<br>
			이미지는 최대 5개까지 등록 가능합니다.
		</p>
		<div class="ui-image-box-list">
			<ul>
				
					<li>
						<form class="ui-image-box empty" name="seatImageList" action="" method="post" enctype="multipart/form-data">
							<img src="">
							<input name="seatImg" type="file" data-type="seat" accept="image/png,image/jpg,image/jpeg" data-event="uploadImage">
							<a></a>
						</form>
					</li>
				
					<li>
						<form class="ui-image-box empty" name="seatImageList" action="" method="post" enctype="multipart/form-data">
							<img src="">
							<input name="seatImg" type="file" data-type="seat" accept="image/png,image/jpg,image/jpeg" data-event="uploadImage">
							<a></a>
						</form>
					</li>
				
					<li>
						<form class="ui-image-box empty" name="seatImageList" action="" method="post" enctype="multipart/form-data">
							<img src="">
							<input name="seatImg" type="file" data-type="seat" accept="image/png,image/jpg,image/jpeg" data-event="uploadImage">
							<a></a>
						</form>
					</li>
				
					<li>
						<form class="ui-image-box empty" name="seatImageList" action="" method="post" enctype="multipart/form-data">
							<img src="">
							<input name="seatImg" type="file" data-type="seat" accept="image/png,image/jpg,image/jpeg" data-event="uploadImage">
							<a></a>
						</form>
					</li>
				
					<li>
						<form class="ui-image-box empty" name="seatImageList" action="" method="post" enctype="multipart/form-data">
							<img src="">
							<input name="seatImg" type="file" data-type="seat" accept="image/png,image/jpg,image/jpeg" data-event="uploadImage">
							<a></a>
						</form>
					</li>
				
			</ul>
		</div>
	</section>

	<!-- 센터 운영 시간과 휴일 설정 -->
	<section class="openInfo" data-id="openInfo">
		<h2 class="ui-title">센터 운영 시간과 휴일 설정</h2>
		<p class="ui-note blue">
			센터의 운영시간에 따라 스케줄러의 시간대가 노출되며, 회원용 앱에서 회원들이 운영 정보를 확인 할 수 있습니다.
		</p>
		<ul>
			<li class="week">
				<h4 class="ui-sub-title none">운영 시간 설정</h4>
				<div class="box" data-id="week"></div>
			</li>
			<li class="holiday" data-permission="permissionOperation/holiday">
				<h4 class="ui-sub-title none">휴일 설정</h4>
				<div class="box" data-id="holiday">
					<dl>
						<dt>
							<div>
								<input name="holiday" type="calendar" non-popup multiple>
							</div>
						</dt>
						<dd></dd>
						<dd>
							<h4 class="ui-sub-title">지정된 휴일 <var class="red" data-msg="count">0</var>일</h4>
							<div>
								<ul></ul>
							</div>
						</dd>
					</dl>
				</div>
			</li>
		</ul>
	</section>

	<!-- 장소 정보 설정 -->
	<section class="spaceInfo ui-info" data-id="spaceInfo">
		<h2 class="ui-title">장소 정보 설정</h2>
		<p class="ui-note blue">
			센터 내에 PT룸, GX룸, 골프연습장, 스쿼시룸 등 장소를 추가해주세요.<br>
			각 장소마다 서비스를 등록하고 회원들의 예약 시스템을 설정하거나 관리를 할 수 있습니다.
		</p>
		<div class="add">
			<input class="name" name="spaceName" maxlength="16" placeholder="장소 이름">
			<input type="integer" name="spaceNumber" min="0" max="10000" placeholder="인원">
			<button class="ui-button" data-event="add" data-permission="permissionOperation/addSpace">장소 추가</button>
		</div>
		<div class="list">
			<ul></ul>
		</div>
		<div class="del ui-note red">
			<div class="left">
				<em class="bg red">주의</em> 장소를 삭제할 경우 스케줄러에서 해당 장소의 스케줄을 제어할 수 없습니다.
			</div>
			<div class="right">
				<select class="ui-select" name="removedSpaceList">
					<option>복구 장소 선택</option>
				</select>
				<button class="ui-button green" data-event="recover" data-permission="permissionOperation/addSpace">장소 복구</button>
			</div>
		</div>
	</section>

	<!-- 판매 분류 설정 -->
	<section class="ui-info" data-id="salesClassificationInfo">
		<h2 class="ui-title">판매 분류 설정</h2>
		<div class="add">
			<input class="name" name="salesClassificationName" maxlength="16" placeholder="판매분류 이름">
			<button class="ui-button" data-event="add">분류 추가</button>
		</div>
		<div class="list">
			<ul></ul>
		</div>
	</section>

	<!-- 계좌번호 설정 -->
	<section class="ui-info" data-id="bankAccountInfo">
		<h2 class="ui-title">계좌번호 설정</h2>
		<div class="add">
			<select class="ui-select" name="bankCode">
				<option value="">은행 선택</option>
			</select>
			<input class="name" type="account" name="accountNumber" maxlength="32" placeholder="입금 계좌번호">
			<input name="accountHolder" maxlength="8" placeholder="예금주">
			<button class="ui-button" data-event="add">계좌 추가</button>
		</div>
		<div class="list block">
			<ul></ul>
		</div>
	</section>

	<!-- 계좌번호 선택 -->
	<section class="ui-info" data-id="bankAccountSetting">
		<h2 class="ui-title">이용료 납부 및 b.pay 계좌번호 정보</h2>
		<ul>
			<li>
				<dl>
					<dt>이용료 납부 계좌번호</dt>
					<dd>
						<!--
						<select class="ui-select" name="bankAccountFee" required>
							<option value="">계좌번호 선택</option>
						</select>
						-->
						<input class="wide" name="bankAccountFee" placeholder="계좌번호 미설정" readonly>
					</dd>
				</dl>
			</li>
			<li>
				<dl>
					<dt>b.pay 정산 계좌번호</dt>
					<dd>
						<input class="wide" name="bankAccountBpay" placeholder="계좌번호 미설정" readonly>
						<!--
						<select class="ui-select" name="bankAccountBpay" readonly required>
							<option value="">계좌번호 선택</option>
						</select>
						-->
					</dd>
				</dl>
			</li>
		</ul>
	</section>

	<!-- 마일리지 포인트 적립 설정 -->
	<section>
		<h2 class="ui-title">마일리지 포인트 적립 설정</h2>
		<p class="ui-note blue">
			상품 결제 시 결제 금액에 따라 회원에게 포인트를 적립할 수 있으며, 적립된 포인트는 상품 결제 시 사용할 수 있습니다.
		</p>
			상품 결제 시 결제금액의
			<input name="mileage" type="number" min="0" max="100" value="0" data-event="mileage" data-permission="permissionOperation/mileage">% 를
			마일리지 포인트로 적립합니다.
	</section>

	<!-- 만기 예정 회원 검색 설정 -->
	<section class="expireInfo">
		<h2 class="ui-title">만기 예정 회원 검색 설정</h2>
		<ul>
			<li>
				만기
				<input name="usageExpired3" type="integer" min="0" max="90" value="3">
				일 전
			</li>
			<li>
				만기
				<input name="usageExpired7" type="integer" min="0" max="90" value="7">
				일 전
			</li>
		</ul>
	</section>

	<!-- 변경 내용 저장 -->
	<section>
		<button class="ui-button green" data-event="submit">변경 내용 저장</button>
	</section>
</main>
</body>
<script type="text/javascript">
function doReady() {
	doPage.open();
}

const doPage = {
	container : undefined,
	data : {},
	permission : {},
	open : function() {
		Promise.all([
			partnerController.operation.info(),
			commonController.bankList(),
			placeController.list(true),
			permissionController.getList(),
		]).then(([data, bankList, placeList, permission]) => {
			this.data = {
				operationInfo : data.operationInfo || {},
				holidayList : data.holidayList || [],
				openTimeList : data.openTimeList || [],
				spaceList : (data.spaceList || []).map(item => {
					item.space_useYn = "Y";
					return item;
				}),
				seatImageList : data.seatImageList || [],
				salesClassificationList : data.salesClassificationList || [],
				bankAccountList : data.bankAccountList || [],
				bankList : bankList || [],
				placeList : placeList || []
			};
			this.data.bankList = bankList || [];
			this.permission = uiPermission.data = permission;
			this.render();
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	render : function() {
		const container = this.container = document.querySelector("main");
		const self = this.event.self = this;
		const setOpenInfo = () => {
			const section = container.querySelector("[data-id='openInfo']");
			const setWeek = () => {
				const div = section.querySelector("[data-id='week']");
				const weekList = ["월", "화", "수", "목", "금", "토", "일"];
				const getOption = (max) => {
					const option = [];
					for(let i = 0; i < max; i++) {
						const value = i.zf(2);
						option.push(`<option value="${value}">${value}</option>`);
					}
					return option.join("");
				};
				const li = weekList.map((item, index) => {
					let week = index + 1;
					if(week == 7) week = 0;
					const weekColor = (week == 0) ? "red" : (week == 6) ? "blue" : "";
					return `
						<li>
							<span class="weekName ${weekColor}">${item} : </span>
							<label class="ui-input-radio">
								<input name="week_${week}" type="radio" value="N">
								<span></span>
								휴무
							</label>
							<label class="ui-input-radio more">
								<input name="week_${week}" type="radio" value="Y" checked>
								<span></span>
								영업
								<span>
									시작
									<select class="ui-select time">
										<option>시</option>
										${getOption(24)}
									</select>
									:
									<select class="ui-select time">
										<option>분</option>
										${getOption(60)}
									</select>
									부터
									<select class="ui-select time">
										<option>시</option>
										${getOption(25)}
									</select>
									:
									<select class="ui-select time">
										<option>분</option>
										${getOption(60)}
									</select>
									까지
								</span>
							</label>
						</li>
					`;
				});
				div.innerHTML = `<ul>${li.join("")}</ul>`;
			};
			const setHoliday = () => {
				const div = section.querySelector("[data-id='holiday']");
				const input = div.querySelector("input");
				const holidayList = this.data.holidayList.map(item => {
					return item.holiday_date;
				});
				const calendar = this.data.calendar = uiCalendar(div);
				calendar.value = holidayList;
				calendar.callback = (value) => {
					self.event.updateHoliday(div, value);
				};
				calendar.update();
			};
			setWeek();
			setHoliday();
		};
		const setEvent = (ul, dataList, setList) => {
			uiEvent(ul, {
				click : {
					remove : function() {
						const index = Number(this.parentNode.getAttribute("data-index"));
						const seqPartnerSpace = Number(this.getAttribute("data-sequence"));

						if(seqPartnerSpace) {
							// 기존 장소는 삭제 전 스케줄 체크
							if(!confirm("정말로 삭제하시겠습니까?\n(삭제된 내용은 변경 내용을 저장하기 전까지 반영되지 않습니다.)")) return;
							placeController.checkRemove(seqPartnerSpace).then(data => {
								if(data.classScheduleCount > 0) {
									alert("현재 시간 이후 삭제할 장소에 그룹수업 스케줄 " + data.classScheduleCount + "건이 있습니다.\n해당 스케줄을 삭제 후 다시 시도해 주세요.");
									return;
								} else {
									dataList[index].space_useYn = "N";
									setList();
								}
							}).catch(error => {
								console.log(error);
								alert("처리 중 오류가 발생하였습니다.");
							});
						} else {
							// 새로 등록한 장소는 바로 삭제
							dataList.splice(index, 1);
							setList();
						}
						return;
					}
				},
				change : {
					update : function() {
						const index = Number(this.parentNode.getAttribute("data-index"));
						let value = this.value.trim();
						if(this.type == "number") value = Number(value);
						const name = this.name;
						if(this.type == "number" && isNaN(value))
							this.value = dataList[index][name];
						else
							dataList[index][name] = value;
					}
				}
			});
		};
		const setSpaceInfo = () => {
			const section = container.querySelector("[data-id='spaceInfo']");
			const addButton = section.querySelector("[data-event='add']");
			const recoverButton = section.querySelector("[data-event='recover']");
			const dataList = this.data.spaceList;
			const setList = () => {
				const ul = section.querySelector("ul");
				const li = dataList.map((item, index) => {
					const isHidden = (item.space_useYn == "N") ? "hidden" : "";
					return `
						<li class="${isHidden}" data-index="${index}">
							<input class="name" name="space_name" type="text" maxlength="16" value="${item.space_name}" placeholder="장소 이름" data-event="update">
							<input name="space_number" type="integer" min="0" max="10000" value="${item.space_number}" placeholder="인원" data-event="update">명
							<button class="remove" data-sequence="${item.seq_partner_space || 0}" data-event="remove"></button>
						</li>
					`;
				});
				ul.innerHTML = (li.length == 0) ? `<li class="empty">등록된 장소가 없습니다.</li>` : li.join("");
				uiInput(ul);
				setEvent(ul, dataList, setList);
			};
			const setRemovedList = () => {
				const select = section.querySelector("[name='removedSpaceList']");
				select.innerHTML += this.data.placeList.filter(item => {
					return (item.useYn == "N");
				}).map(item => {
					return `<option value="${item.seqPartnerSpace}">${item.spaceName}</option>`;
				});
			};
			const setButton = () => {
				addButton.onclick = () => {
					const spaceName = section.getValue("spaceName").trim();
					const spaceNumber = section.getValue("spaceNumber");
					if(spaceName === "") {
						alert("장소 이름을 입력해 주세요.");
						return;
					}
					if(spaceNumber === "") {
						alert("장소 인원을 입력해 주세요.");
						return;
					}
					dataList.push({
						space_name : spaceName,
						space_number : Number(spaceNumber)
					});
					const nodeList = addButton.parentNode.querySelectorAll("input, select");
					nodeList.forEach(item => {item.value = "";});
					setList();
				};
				recoverButton.onclick = () => {
					const seqPartnerPlace = Number(section.getValue("removedSpaceList"));
					if(!seqPartnerPlace) {
						alert("복구 장소를 선택해 주세요.");
						return;
					}
					placeController.recover(seqPartnerPlace).then(data => {
						alert("복구되었습니다.");
						window.location.reload(true);
					}).catch(error => {
						console.log(error);
						uiError(error);
					});
				};
			};
			setList();
			setButton();
			setRemovedList();
		};
		const setSalesClassificationInfo = () => {
			const section = container.querySelector("[data-id='salesClassificationInfo']");
			const button = section.querySelector("[data-event='add']");
			const dataList = this.data.salesClassificationList;
			const setList = () => {
				const ul = section.querySelector("ul");
				const li = dataList.map((item, index) => {
					return `
						<li data-index="${index}">
							<input class="name" name="salesClassificationName" type="text" maxlength="16" value="${item.salesClassificationName}" placeholder="판매분류 이름" data-event="update">
							<button class="remove" data-event="remove"></button>
						</li>
					`;
				});
				ul.innerHTML = (li.length == 0) ? `<li class="empty">등록된 판매분류가 없습니다.</li>` : li.join("");
				setEvent(ul, dataList, setList);
			};
			const setButton = () => {
				button.onclick = () => {
					const name = section.getValue("salesClassificationName").trim();
					if(name === "") {
						alert("판매분류 이름을 입력해 주세요.");
						return;
					}
					dataList.push({
						salesClassificationName : name,
					});
					const nodeList = button.parentNode.querySelectorAll("input, select");
					nodeList.forEach(item => {item.value = "";});
					setList();
				};
			};
			setList();
			setButton();
		};
		const setBankAccountSetting = () => {
			const section = container.querySelector("[data-id='bankAccountSetting']");
			/*
				const selectList = section.querySelectorAll("select");
				const getOptionList = (flagName) => {
					return this.data.bankAccountList.map(item => {
						const bankCode = item.bankCode || "";
						const bankName = (this.data.bankList.filter(item => (item.value == bankCode))[0] || {}).title || "-";
						const value = bankCode + "," + item.accountNumber;
						const label = `(${bankName}) ${item.accountNumber || ""}`;
						const selected = (item[flagName]) ? "selected" : "";
						return `<option value="${value}" ${selected}>${label}</option>`;
					});
				};
			*/

			const getAccountInfo = (flagName) => {
				const accountInfo = this.data.bankAccountList.filter(item => {
					return (item[flagName]);
				})[0];
				if(accountInfo) {
					const bankCode = accountInfo.bankCode || "";
					const bankName = (this.data.bankList.filter(item => (item.value == bankCode))[0] || {}).title || "-";
					return `(${bankName}) ${accountInfo.accountNumber || ""}`;
				}
				return "";
			};

			const inputList = section.querySelectorAll("input");
			inputList.forEach((item, index) => {
				const flagName = (index == 1) ? "bpayFlag" : "feeFlag";
				item.value = getAccountInfo(flagName);
				/*
				item.innerHTML = `
					<option value="">계좌번호 선택</option>
					<option value="">계좌번호 선택</option>
					${getOptionList(flagName)}
				`;
				item.onchange = () => {
					this.data.bankAccountList.forEach(item => {
						item[flagName] = null;
					});
					if(item.value) {
						const value = item.value.split(",");
						const bankAccountInfo = this.data.bankAccountList.filter(item => {
							return (item.accountNumber == value[1] && item.bankCode == value[0]);
						})[0] || {};
						bankAccountInfo[flagName] = 1;
					}
				};
				*/
			});
		};
		const setBankAccountInfo = () => {
			const section = container.querySelector("[data-id='bankAccountInfo']");
			const button = section.querySelector("[data-event='add']");
			const dataList = this.data.bankAccountList;
			const getBankList = (bankCode) => {
				const option = this.data.bankList.map(item => {
					const selected = (item.value == bankCode) ? "selected" : "";
					return `<option value="${item.value}" ${selected}>${item.title}</option>`;
				});
				return option.join("");
			};
			const setBankList = () => {
				const select = section.querySelector("[name='bankCode']");
				select.innerHTML = `
					<option value="">은행 선택</option>
					${getBankList()}
				`;
			};
			const setList = () => {
				const ul = section.querySelector("ul");
				const li = dataList.map((item, index) => {
					return `
						<li data-index="${index}" >
							<select class="ui-select" name="bankCode" value="${item.bankCode}" data-event="update">
								<option value="">은행 선택</option>
								${getBankList(item.bankCode)}
							</select>
							<input class="name" type="account" name="accountNumber" maxlength="32" value="${item.accountNumber}" placeholder="입금 계좌번호" data-event="update">
							<input name="accountHolder" maxlength="8" value="${item.accountHolder}" placeholder="예금주" data-event="update">
							<button class="remove" data-event="remove"></button>
						</li>
					`;
				});
				ul.innerHTML = (li.length == 0) ? `<li class="empty">등록된 입금 계좌번호가 없습니다.</li>` : li.join("");
				uiInput(ul);
				setEvent(ul, dataList, setList);
				setBankAccountSetting();
			};
			const setButton = () => {
				button.onclick = () => {
					const bankCode = section.getValue("bankCode");
					const accountNumber = section.getValue("accountNumber").trim();
					const accountHolder = section.getValue("accountHolder").trim();
					if(bankCode === "" || accountNumber === "" || accountHolder === "") {
						alert("입금 정보를 모두 입력해 주세요.");
						return;
					}
					dataList.push({
						bankCode : bankCode,
						accountNumber : accountNumber,
						accountHolder : accountHolder,
						bpayFlag : null,
						feeFlag : null
					});
					const nodeList = button.parentNode.querySelectorAll("input, select");
					nodeList.forEach(item => {item.value = "";});
					setList();
				};
			};
			setList();
			setButton();
			setBankList();
		};
		const setMileage = () => {
			const input = container.querySelector("[data-event='mileage']");
			input.addEventListener("change", function() {
				self.event.changeMileage(this);
			});
		};
		const setSubmitButton = () => {
			const button = container.querySelector("[data-event='submit']");
			button.addEventListener("click", () => {
				this.event.submit();
			});
		};
		uiImageUpload(container, 400, partnerController.operation.imageUpload);
		setOpenInfo();
		setSpaceInfo();
		setSalesClassificationInfo();
		setBankAccountInfo();
		setMileage();
		setSubmitButton();
		this.prepare();
		uiPermission(container);
	},
	prepare : function() {
		const container = this.container;
		const operationInfo = this.data.operationInfo;
		const setOperationInfo = () => {
			container.putValue("entranceCheckerMainText", operationInfo.entranceCheckerMainText);
			container.putValue("entranceCheckerSubText", operationInfo.entranceCheckerSubText);
			container.putValue("mileage", operationInfo.mileage);
			container.putValue("usageExpired3", operationInfo.usageExpired3);
			container.putValue("usageExpired7", operationInfo.usageExpired7);
		};
		const setImageInfo = () => {
			let input = null;
			input = container.querySelector("[name='checkerImg']");
			this.event.setImage(input, operationInfo.entranceCheckerImage);
			input = container.querySelectorAll("[name='seatImg']");
			this.data.seatImageList.forEach((item, index) => {
				this.event.setImage(input[index], item.imageUrl, item.seqPartnerSeatImage);
			});
		};
		const setOpenInfo = () => {
			const section = container.querySelector("[data-id='openInfo']");
			const div = section.querySelector("[data-id='week']");
			const li = div.querySelectorAll("li");
			this.data.openTimeList.forEach(item => {
				const week = item.week;
				const index = (week == 0) ? 6 : week - 1;
				const startTime = (item.start_time || "").split(":");
				const endTime = (item.end_time || "").split(":");

				div.putValue(`week_${week}`, item.open_yn);
				const select = li[index].querySelectorAll("select");
				select[0].value = startTime[0] || "00";
				select[1].value = startTime[1] || "23";
				select[2].value = endTime[0] || "00";
				select[3].value = endTime[1] || "59";
			});
		};
		setImageInfo();
		setOperationInfo();
		setOpenInfo();
	},
	event : {
		submit : function() {
			const operationInfo = this.self.data.operationInfo;
			const openTimeList = this.self.data.openTimeList;
			const container = this.self.container;
			const getCheckerImage = () => {
				const form = container.querySelector("[name='checkerImage']");
				const img = form.querySelector("img");
				const source = img.getAttribute("data-source");
				return source;
			};
			const getSeatImageList = () => {
				const section = container.querySelector("[data-id='lessonInfo']");
				const imgList = [];
				section.querySelectorAll("img").forEach(item => {
					const source = item.getAttribute("data-source");
					const sequence = Number(item.getAttribute("data-sequence"));
					if(source) {
						imgList.push({
							imageUrl : source,
							seqPartnerSeatImage : (sequence) ? sequence : null
						});
					}
				});
				return imgList;
			};
			const getHolidayList = () => {
				return this.self.data.calendar.value;
			};
			const getBankAccountList = () => {
				return this.self.data.bankAccountList.map(item => {
					return {
						seqBankAccount : item.seqBankAccount || 0,
						accountHolder : item.accountHolder,
						accountNumber : item.accountNumber,
						bankCode : item.bankCode,
						bpayFlag : item.bpayFlag || null,
						feeFlag : item.feeFlag || null
					};
				});
			};
			const getWeekState = (index) => {
				return container.getValue("week_" + index);
			};
			const getWeekList = (index) => {
				const section = container.querySelector("[data-id='openInfo']");
				const selectList = section.querySelectorAll("select");
				const resultList = [];
				for(let i = index; i < selectList.length; i += 4) {
					const value = selectList[i].value;
					resultList.push(value);
				}
				return resultList;
			};
			const getDataList = (dataName, itemName) => {
				return this.self.data[dataName].map(item => {
					return item[itemName] || 0;
				});
			};
			const data = {
				seqMemberSearchSetting : operationInfo.seqMemberSearchSetting,
				// 입장관리 터치스크린 화면 설정
				entranceCheckerImage : getCheckerImage(),
				entranceCheckerMainText : container.getValue("entranceCheckerMainText"),
				entranceCheckerSubText : container.getValue("entranceCheckerSubText"),
				// 그룹 수업 이미지 등록
				seatImages : getSeatImageList(),
				// 센터 운영 시간과 휴일 설정
				seqPartnerHoliday : 0,
				seqPartnerOpenTime : openTimeList.length,
				onOff0 : getWeekState(0),
				onOff1 : getWeekState(1),
				onOff2 : getWeekState(2),
				onOff3 : getWeekState(3),
				onOff4 : getWeekState(4),
				onOff5 : getWeekState(5),
				onOff6 : getWeekState(6),
				startHour : getWeekList(0),
				startMin : getWeekList(1),
				endHour : getWeekList(2),
				endMin : getWeekList(3),
				holidayDateStr : getHolidayList(),
				// 장소 정보 설정
				seqPartnerSpace : getDataList("spaceList", "seq_partner_space"),
				spaceName : getDataList("spaceList", "space_name"),
				spaceNumber : getDataList("spaceList", "space_number"),
				spaceUseYn : getDataList("spaceList", "space_useYn"),
				// 판매 분류 설정
				seqSalesClassification : getDataList("salesClassificationList", "seqSalesClassification"),
				salesClassificationName : getDataList("salesClassificationList", "salesClassificationName"),
				// 입금 계좌번호 설정
				bankAccounts : getBankAccountList(),
				// 마일리지 포인트 적립 설정
				mileage : container.getValue("mileage", true),
				// 만기 예정 회원 검색 설정
				usageExpired3 : container.getValue("usageExpired3", true),
				usageExpired7 : container.getValue("usageExpired7", true)
			};
			if(!this.check(data)) return;
			partnerController.operation.update(data).then(data => {
				console.log(data);
				alert("저장되었습니다.");
				window.location.reload(true);
			}).catch(error => {
				console.log(error);
				alert("저장에 실패하였습니다.");
			});
		},
		check : function(data) {
			const checkOpenInfo = () => {
				const weekList = ["월","화","수","목","금","토","일"];
				const errorList = [];
				for(let i = 0; i < 7; i++) {
					const startTime = Number(data.startHour[i] + data.startMin[i]);
					const endTime = Number(data.endHour[i] + data.endMin[i]);
					if(startTime > endTime)
						errorList.push(weekList[i] + "요일");
				}
				if(errorList.length) {
					const section = this.self.container.querySelector("[data-id='openInfo']");
					section.scrollIntoView();
					alert(errorList.join(", ") + " 영업 시간을 확인해 주세요.");
					return false;
				}
				return true;
			};
			if(!checkOpenInfo()) return;
			return true;
		},
		updateHoliday : function(container, value) {
			const calendar = this.self.data.calendar;
			container.querySelector("[data-msg='count']").innerHTML = value.length;
			const ul = container.querySelector("ul");
			const li = value.map(item => {
				return `<li>${uiDate(item)}<a data-date="${item}"></a></li>`;
			});
			ul.innerHTML = li.join("");
			const a = ul.querySelectorAll("a").forEach(item => {
				item.addEventListener("click", function() {
					calendar.remove(this.getAttribute("data-date"));
				});
			});
		},
		setImage : function(input, source, sequence) {
			const container = this.self.container;
			const form = input.parentNode;
			const img = form.querySelector("img");
			if(source) {
				form.classList.remove("empty");
				img.src = source;
				img.setAttribute("data-source", source);
				img.setAttribute("data-sequence", sequence);
			} else {
				form.classList.add("empty");
				img.src = "";
				img.setAttribute("data-source", "");
				img.setAttribute("data-sequence", "");
			}
		},
		changeMileage : function(object) {
			object.value = parseInt(getNumber(object.value) * 100) / 100;
		}
	},
};
</script>
</html>
</html>
