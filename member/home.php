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
	<script type="text/javascript" src="/static/js/ui.js?v=20220114"></script>
	<script type="text/javascript" src="/static/js/ui/uiHeader.js?v=20220216"></script>

	<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" async></script>
	<script src="https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.6.7/firebase-analytics.js"></script>

	<script type="text/javascript" src="/static/js/controller/commonController.js?v=20220216"></script>
	<script type="text/javascript" src="/static/js/controller/coachController.js?v=2.5"></script>
	<script type="text/javascript" src="/static/js/controller/memberController.js?v=20220119"></script>
	<script type="text/javascript" src="/static/js/controller/permissionController.js"></script>
	<script type="text/javascript" src="/static/js/controller/smsController.js?v=2.5"></script>

	<script type="text/javascript" src="/static/js/popup/popupCamera.js"></script>
	<script type="text/javascript" src="/static/js/popup/popupLoginCoach.js?v=2.5"></script>
	<script type="text/javascript" src="/static/js/popup/popupMember.js?v=20211116"></script>
	<script type="text/javascript" src="/static/js/popup/popupSendSms.js?v=20220208"></script>
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
				remainDate	: Number("565"),
				expireDate	: "2023-09-29 00:00:00"
			},
			state : {
				sms 		: "750"
			},
			scheduler : {
				default		: "promise"
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
	<script type="text/javascript" src="/static/js/ui/uiProfile.js?v=20210707"></script>
	<script type="text/javascript" src="/static/js/controller/serviceController.js?v=20201020"></script>
	<script type="text/javascript" src="/static/js/controller/memberHistoryController.js"></script>
	<script type="text/javascript" src="/static/js/controller/memberCounselingController.js"></script>
	<script type="text/javascript" src="/static/js/component/componentMember.js"></script>
	<style type="text/css">

main .overview								{margin-top:30px}
main .overview .member						{margin-bottom:30px; padding:25px 30px; background-color:#f1f9ff; border-top:3px solid #004fec}
main .overview .member .top					{margin-bottom:30px; color:#646464}
main .overview .member .top b				{font-weight:500; color:#222}
main .overview .member .top div + div		{margin-top:2px}
main .overview .member .top .name			{margin:5px 0; line-height:1; font-size:28px; font-weight:normal; color:#444}
main .overview .member .top dl dt			{padding-right:25px; width:250px; border-right:1px solid #ccc; text-align:center}
main .overview .member .top dl dd			{padding-left:25px}
main .overview .member .bottom table		{background-color:white}
main .overview .member .bottom td.memo		{white-space:normal; text-align:justify !important}
main .overview .member .bottom table + table{margin-top:15px}
main .overview .member .bottom tr.focus		{background-color:rgba(55,183,114,0.15)}

main .board									{margin-top:40px; font-size:0}
main .board:after							{content:""; display:table; clear:both}
main .board > div							{margin-left:-20px; margin-right:-20px}
main .board > div > dl > dd					{vertical-align:top}
main .board .box							{padding:20px; font-size:1rem; box-sizing:border-box}
main .board .box h3							{margin-bottom:25px; padding-bottom:10px; border-bottom:2px solid #333}
main .board .box h3:before					{bottom:12px}
main .board .box h3 a						{position:relative; float:right; top:2px; font-size:1rem; font-weight:normal}
main .board .box table 						{table-layout:fixed}
main .board .box table td					{white-space:nowrap; text-overflow:ellipsis; overflow:hidden}
main .board .box table td em				{margin-right:0}
main .board .box table td a					{text-decoration:underline; font-size:12.5px}
main .board .box table td b					{font-weight:500}

main .board .continue						{background-color:#f0f0f0}
main .board .continue td					{padding:0; border:none; font-size:0; overflow:visible !important}
main .board .continue td div				{position:relative; width:calc(100% + 1px); height:30px; background-color:white; overflow:hidden}
main .board .continue td div .left			{position:absolute; left:0; top:0; width:50%; height:30px}
main .board .continue td div .right			{position:absolute; left:50%; top:0px; width:50%; height:30px}
main .board .continue td div .left:before	{content:""; position:absolute; left:-10%; top:-10px; width:120%; height:30px; background-color:white; border-radius:0 0 50% 50%; border:1px solid #bbb; border-top:0}
main .board .continue td div .left:after	{content:""; position:absolute; left:0; top:0; height:14px; border-left:1px solid #ccc}
main .board .continue td div .right:before	{content:""; position:absolute; left:-10%; top:7px; width:120%; height:30px; border-radius:50% 50% 0 0; border:1px solid #bbb; border-bottom:0}
main .board .continue td div .right:after	{content:""; position:absolute; right:0; top:0px; height:14px; border-right:1px solid #ccc}

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
	<!-- 사이드 메뉴 -->
	<aside class="ui-side ui-profile"></aside>

	<!-- 메인 -->
	<main>
		<!-- 메인 탭 메뉴 -->
		<div class="ui-tab block"></div>

		<!-- 회원 개요 -->
		<section class="overview" data-event="overview">
			<div class="member">
				<div class="top">
					<dl>
						<dt>
							<div class="name"><b data-msg="name"></b> 회원님</div>
							<div class="birthday"><var data-msg="birthday"></var></div>
						</dt>
						<dd>
							<div class="mobile"><b>T.</b> <var data-msg="mobile"></var></div>
							<div class="email"><b>E.</b> <var data-msg="email"></var></div>
							<div class="address"><b>A.</b> <var data-msg="address"></var></div>
						</dd>
					</dl>
				</div>
				<div class="bottom">
					<table class="ui-table sharp point fixed">
						<colgroup>
							<col width="15%"><col width="15%"><col width="15%"><col width="45%">
						</colgroup>
						<thead>
							<tr><td>관리 담당자</td><td>유입경로</td><td>추천회원</td><td>메모</td></tr>
						</thead>
						<tbody>
							<tr><td>-</td><td>-</td><td>-</td><td>-</td></tr>
						</tbody>
					</table>
				</div>
			</div>

			<div class="ui-state">
				<div>
					<dl>
						<dd>
							<div class="box">
								<h2><var data-msg="lastVisit">0</var>일</h2>
								<h4>마지막 방문 후 경과일수</h4>
							</div>
						</dd>
						<dd>
							<div class="box">
								<h2><var data-msg="lastMonthVisit">0</var>회</h2>
								<h4>최근 한달 동안 방문일수</h4>
							</div>
						</dd>
						<dd>
							<div class="box">
								<h2><var data-msg="useCount">0</var>회</h2>
								<h4>누적 방문횟수</h4>
							</div>
						</dd>
						<dd>
							<div class="box">
								<h2><var data-msg="paymentPrice">0</var>원</h2>
								<h4>누적 결제금액</h4>
							</div>
						</dd>
						<dd>
							<div class="box">
								<h2><var data-msg="refundPrice">0</var>원</h2>
								<h4>누적 환불금액</h4>
							</div>
						</dd>
					</dl>
				</div>
			</div>
		</section>

		<section class="board">
			<div class="wrap">
				<dl>
					<dd class="left">
						<!-- 최근 예약 수업 내역 -->
						<div class="box" data-event="reservationList">
							<h3 class="ui-sub-title">최근 예약 수업 내역<a href="/member/1584986/booking">자세히 보기</a></h3>
							<table class="ui-table">
								<colgroup>
									<col width="27.5%"><col width="27.5%"><col width="30%"><col width="15%">
								</colgroup>
								<thead>
									<tr><td>수업일시</td><td>예약일시</td><td>수업명</td><td>담당강사</td></tr>
								</thead>
								<tbody>
									<tr><td colspan="4">정보를 불러오는 중 입니다.</td></tr>
								</tbody>
							</table>
						</div>

						<!-- 유효 이용권 목록 -->
						<div class="box" data-event="passList">
							<h3 class="ui-sub-title">유효 이용권 목록<a href="/member/1584986/pass">자세히 보기</a></h3>
							<table class="ui-table">
								<colgroup>
									<col width="12.5%"><col width="30%"><col width="25%"><col width="15%"><col width="18.5%">
								</colgroup>
								<thead>
									<tr><td>구분</td><td>이용권명</td><td>만료날짜</td><td>잔여기간</td><td>잔여횟수</td></tr>
								</thead>
								<tbody>
									<tr><td colspan="5">정보를 불러오는 중 입니다.</td></tr>
								</tbody>
							</table>
						</div>
					</dd>

					<dd class="right">
						<!-- 최근 출석/결석 내역 -->
						<div class="box" data-event="entranceList">
							<h3 class="ui-sub-title">최근 출석/결석 내역<a href="/member/1584986/attendance">자세히 보기</a></h3>
							<table class="ui-table">
								<colgroup>
									<col width="35%"><col width="50%"><col width="16%">
								</colgroup>
								<thead>
									<tr><td>수업일시</td><td>이용권명</td><td>출결상태</td></tr>
								</thead>
								<tbody>
									<tr><td colspan="3">정보를 불러오는 중 입니다.</td></tr>
								</tbody>
							</table>
						</div>

						<!-- 최근 결제 내역 -->
						<div class="box" data-event="paymentList">
							<h3 class="ui-sub-title">최근 결제 내역<a href="/member/1584986/orderInfo?tab=4">자세히 보기</a></h3>
							<table class="ui-table">
								<colgroup>
									<col width="20%"><col width="20%"><col width="40%"><col width="21%">
								</colgroup>
								<thead>
									<tr><td>결제날짜</td><td>결제구분</td><td>이용권명</td><td>결제금액</td></tr>
								</thead>
								<tbody>
									<tr><td colspan="4">정보를 불러오는 중 입니다.</td></tr>
								</tbody>
							</table>
						</div>

						<!-- 최근 상담 내역 -->
						<div class="box" data-event="counselingList">
							<h3 class="ui-sub-title">최근 상담 내역<a onclick="javascript:location.href = '/member-counseling/index?seqMember=' + uiProfile.data.seqMember + '&isMember=true'">자세히 보기</a></h3>
							<table class="ui-table">
								<colgroup>
									<col width="30%"><col width="50%"><col width="21%">
								</colgroup>
								<thead>
									<tr><td class="date">상담일시</td><td>상담내용</td><td>상담수단</td></tr>
								</thead>
								<tbody>
									<tr><td colspan="3">정보를 불러오는 중 입니다.</td></tr>
								</tbody>
							</table>
						</div>
					</dd>
				</dl>
			</div>
		</section>
	</main>
</div>
</body>
<script type="text/javascript">
const seqMember = Number(window.location.href.split("?data=")[1]);
const recentEndDate = getCalendar();						// 검색 종료
const recentStartDate = getElapse(new Date(), 0, -1, 0);	// 검색 시작
const pageCount = 5;										// 표시 개수

function doReady() {
	componentMember.setMainTab(0);
	doPage.open();
}

const doPage = {
	container : undefined,
	data : {},
	permission : {},
	open : function() {
		this.container = document.querySelector("main");
		Promise.all([
			memberController.createForm(),
			permissionController.getList()
		]).then(([formData, permission]) => {
			this.data = {
				coachList : formData.coachList.map(item => {
					item.seqPartnerCoach = item.seq_partner_coach;
					item.coachName = item.coach_name;
					return item;
				}),
				inboundPathList : formData.inboundPathList
			};
			componentMember.data = this.data;
			this.permission = this.counselingList.permission = permission;
			this.render();
		}).catch(error => {
			console.log(error);
			uiError(error);
		});
	},
	render : function() {
		this.overview.open();
		this.reservationList.open();
		this.passList.open();
		this.entranceList.open();
		this.paymentList.open();
		this.counselingList.open();
	},
	getContinue : function(tr, max) {
		if(!max) max = pageCount;
		const isSuffix = (tr.length > max);
		tr = tr.slice(0, max);
		const suffix = `
				<tr class="continue">
					<td colspan="10">
						<div>
							<div class="left"></div>
							<div class="right"></div>
						</div>
					</td>
				</tr>
			`;
		return tr.join("") + ((isSuffix) ? suffix : "");
	},
	setError : function(error, container) {
		console.log(error);
		const tbody = container.querySelector("tbody");
		tbody.innerHTML = `<tr><td colspan="10">정보를 불러오는데 실패 하였습니다.</td></tr>`;
	},

	reservationList : {
		container : {},
		data : {},
		open : function() {
			this.container = document.querySelector("[data-event='reservationList']");
			memberHistoryController.booking.reservation(seqMember, 10).then(data => {
				this.data = data;
				this.render();
			}).catch(error => {
				doPage.setError(error, this.container);
			});
		},
		render : function() {
			const tbody = this.container.querySelector("tbody");
			const getValue = (item, name) => {
				const scheduleType = item.scheduleType.toLowerCase();
				if(scheduleType == "class") {
					return (item.classSchedule) ? item.classSchedule[name] : "";
				} else {
					if(name === 'seqPartnerCoach' && scheduleType === "appointment") {
						return item[name]? item[name] : "";
					}else return (item.passInfo) ? item.passInfo[name] : "";
				}
			};
			const tr = this.data.map(item => {
				const reserveDate = uiDate(item.regDt, "time");
				const lessonDate = uiDate(item.startDate, "time");
				const scheduleType = item.scheduleType.toLowerCase();
				const getScheduleName = () => {
					let name = item.scheduleName || "";
					name = name.split("_")[3] || "";
					name = name.split(" - ")[0] || "";
					return name;
				};
				const lessonName = (scheduleType == "class") ? item.scheduleName : (item.passInfo) ? item.passInfo.serviceName : getScheduleName();
				const coachName = componentMember.getCoachName(getValue(item, "seqPartnerCoach"));
				return `
					<tr>
						<td>${lessonDate}</td>					
						<td>${reserveDate}</td>				
						<td class="name">${lessonName}</td>	
						<td>${coachName}</td>					
					</tr>
				`;
			});
			const emptyTr = `<tr><td colspan="4">예약 수업 내역이 없습니다.</td></tr>`;
			tbody.innerHTML = (tr.length == 0) ? emptyTr : doPage.getContinue(tr, 5);
		}
	},

	entranceList : {
		container : {},
		data : {},
		open : function() {
			this.container = document.querySelector("[data-event='entranceList']");
			memberHistoryController.booking.entrance(seqMember, 10).then(data => {
				this.data = data;
				this.render();
			}).catch(error => {
				doPage.setError(error, this.container);
			});
		},
		render : function() {
			const tbody = this.container.querySelector("tbody");
			const tr = this.data.filter(item => {
				const scheduleType = String(item.scheduleType).toLowerCase();
				return (scheduleType == "class" || scheduleType == "appointment");
			}).map(item => {
				const scheduleType = item.scheduleType.toLowerCase();
				let oldPassName = (item.scheduleName || "").split("_");
				const passName = (item.passInfo) ? item.passInfo.serviceName : (oldPassName[3]) ? oldPassName[3].split(" - ")[0] : item.scheduleName;
				const stateName = (item.scheduleState) ? uiParameter.schedule.state[item.scheduleState] : "-";
				const stateColor = (item.scheduleState == "E") ? "green" : (item.scheduleState == "A") ? "red" : "";
				const lessDateTime = uiDate(item.startDate, "time");
				return `
					<tr>
						<td>${lessDateTime}</td>						
						<td class="name">${passName}</td>				
						<td class="${stateColor}">${stateName}</td>	
					</tr>
				`;
			});
			const emptyTr = `<tr><td colspan="3">예약 수업 내역이 없습니다.</td></tr>`;
			tbody.innerHTML = (tr.length == 0) ? emptyTr : doPage.getContinue(tr, 5);
		}
	},

	passList : {
		container : {},
		data : {},
		open : function() {
			this.container = document.querySelector("[data-event='passList']");
			memberController.passList(seqMember).then(data => {
				this.data = data.availableList;
				this.render();
			}).catch(error => {
				doPage.setError(error, this.container);
			});
		},
		render : function() {
			const tbody = this.container.querySelector("tbody");
			const tr = this.data.map(item => {
				const getUseNumber = function() {
					if(item.serviceKind == "P" || item.useNumber < 0) return "무제한";
					return item.remainNumber + "회";
				};
				const serviceColor = uiParameter.service.color[item.serviceType];
				return `
					<tr>
						<td><em class="bg ${serviceColor}">${uiParameter.service.name[item.serviceType].substr(0, 2)}</em></td>
						<td class="name">${componentMember.getPassName(item)}</td>
						<td>${uiDate(item.useEndDate)}</td>
						<td>${componentMember.getRemainDay(item)}일</td>
						<td>${getUseNumber()}</td>
					</tr>
				`;
			});
			const emptyTr = `<tr><td colspan="5">유효 이용권이 없습니다.</td></tr>`;
			tbody.innerHTML = (tr.length == 0) ? emptyTr : doPage.getContinue(tr, 10);
		}
	},

	paymentList : {
		container : {},
		data : {},
		open : function() {
			this.container = document.querySelector("[data-event='paymentList']");
			orderController.paymentInfoList(seqMember).then(data => {
				this.data = data.payments || [];
				this.render();
			}).catch(error => {
				doPage.setError(error, this.container);
			});
		},
		render : function() {
			const tbody = this.container.querySelector("tbody");
			const tr = this.data.filter(item => {
				return (item.useYn != "N");
			}).map(item => {
				const paymentKind = componentMember.getPaymentKind(item);
				return `
					<tr>
						<td>${uiDate(item.paymentDate)}</td>
						<td>${paymentKind}</td>
						<td class="name">${item.orderName || "-"}</td>
						<td>${getComma(item.paymentAmount)}원</td>
					</tr>
				`;
			});
			const emptyTr = `<tr><td colspan="4">최근 결재 내역이 없습니다.</td></tr>`;
			tbody.innerHTML = (tr.length == 0) ? emptyTr : doPage.getContinue(tr);
		}
	},

	counselingList : {
		container : {},
		permission : {},
		data : {},
		open : function() {
			this.container = document.querySelector("[data-event='counselingList']");
			memberCounselingController.selectMore({
				searchParamMap : {
					seqMemberCounseling	: "",
					fromDate			: recentStartDate,
					toDate				: recentEndDate,
					seqPartnerCoach		: "",
					searchWord			: "",
					memberPaymentStatus	: "",
					seqMember			: seqMember
				}
			}).then(data => {
				this.data = (data.data) ? data.data.memberCounselingList || [] : [];
				this.data = componentMember.permission.counselingList(this.permission, this.data);
				this.render();
			}).catch(error => {
				doPage.setError(error, this.container);
			});
		},
		render : function() {
			const tbody = this.container.querySelector("tbody");
			const tr = this.data.map(item => {
				return `
					<tr>
						<td>${uiDate(item.reg_dt, "time")}</td>
						<td class="memo">${item.memo}</td>
						<td>${item.counseling_means_value}</td>
					</tr>
				`;
			});
			const emptyTr = `<tr><td colspan="3">최근 상담 내역이 없습니다.</td></tr>`;
			tbody.innerHTML = (tr.length == 0) ? emptyTr : doPage.getContinue(tr);
		}
	},

	overview : {
		container : {},
		data : {},
		open : function() {
			this.container = document.querySelector("[data-event='overview']");
			Promise.all([
				commonController.memberInfo(seqMember, true),
				memberController.statistics(seqMember)
			]).then(([memberInfo, statistics]) => {
				this.data = {
					memberInfo : memberInfo,
					statistics : statistics
				}
				this.render();
			}).catch(error => {
				uiError(error);
			});
		},
		render : function() {
			const section = this.container;
      console.log(`==================`, this.data);
			const setMemberInfo = () => {
				const memberInfo = this.data.memberInfo;
				const statistics = this.data.statistics;

				const getBirthday = () => {
					return new Date(memberInfo.birthday).format("yyyy년 sm월 sd일") + " (만 " + getAge(memberInfo.birthday) + "세)";
				};

				section.putValue("name", memberInfo.memberName);
				section.putValue("birthday", getBirthday())
				section.putValue("mobile", memberInfo.mobile || "-");
				section.putValue("email", memberInfo.email || "미입력");
				section.putValue("address", ((memberInfo.address || "") + " " + (memberInfo.addressDetail || "")).trim() || "미입력");
				section.putValue("memo", memberInfo.memo || "-");

				const tbody = section.querySelector("tbody");
				tbody.innerHTML = `
					<tr>
						<td>${memberInfo.coachName || "-"}</td>					
						<td>${memberInfo.inboundPathName || "-"}</td>				
						<td>${memberInfo.recommendMemberName || "-"}</td>												
						<td>${memberInfo.memo || "-"}</td>							
					</tr>
				`;
			};
			const setStatistics = () => {
				const data = this.data.statistics;
				section.putValue("lastVisit", getComma((data.daysSinceLastVisit < 0) ? 0 : data.daysSinceLastVisit));
				section.putValue("lastMonthVisit", getComma(data.countOfVisitDaysInLastMonth));
				section.putValue("useCount", getComma(data.cumulativeUseCount));
				section.putValue("paymentPrice", getComma(data.cumulativePaymentPrice));
				section.putValue("refundPrice", getComma(data.cumulativeRefundPrice));
			};
			const setBranchMemoInfo = () => {
				const isGoto = (partnerInfo.partner.partnerType == "GOTO");
				if(!isGoto) return "";

				const seqPartnerBranch = partnerInfo.branch.id;
				let tr = (this.data.memberInfo.memberPartnerBranchMemoList || []).filter(item => {
					return (item.seqPartnerBranch != seqPartnerBranch);
				}).map(item => {
					return `
						<tr>
							<td>${item.branchName}</td>
							<td class="memo">${item.memo || "-"}</td>
							<td>${item.coachName}</td>
							<td>${uiDate(item.updateDate, "time")}</td>
						</tr>
					`;
				});
				tr = (tr.length) ? tr.join("") : `<tr><td colspan="4">작성된 메모가 없습니다.</td></tr>`;

				const table = section.querySelector("table");
				return table.parentNode.innerHTML += `
					<table class="ui-table sharp fixed">
						<colgroup>
							<col width="20%"><col width="35%"><col width="20%"><col width="25%">
						</colgroup>
						<thead>
							<tr><td>지점명</td><td>메모</td><td>마지막 수정자</td><td>마지막 수정일시</td></tr>
						</thead>
						<tbody>
							${tr}
						</tbody>
					</table>
				`;
			};
			setMemberInfo();
			setStatistics();
			setBranchMemoInfo();
		}
	},
}
</script>
</html>
</html>