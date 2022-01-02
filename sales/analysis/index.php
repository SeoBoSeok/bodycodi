
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
	<script type="text/javascript" src="/static/js/ui/uiDateSelector.js"></script>
	<script type="text/javascript" src="/static/js/controller/salesController.js"></script>
	<script type="text/javascript" src="/static/js/common/chart/chart.min.js"></script>
	<script type="text/javascript" src="/static/js/common/chart/chartjs-plugin-labels.js"></script>
	<script type="text/javascript" src="/static/js/common/chart/chartjs-plugin-colorschemes.js"></script>
	<style type="text/css">
main												{letter-spacing:0}
main div + section									{margin-bottom:40px}
main section .ui-note								{margin-bottom:20px}

.analysisList										{}
.analysisList table tr > th							{font-weight:400}
.analysisList table tr > *							{min-width:50px}
.analysisList table > thead > tr > *				{border:1px solid #ccc !important}
.analysisList table > tbody > tr > td				{text-align:right}

.analysisInfo										{}
.analysisInfo > dl									{width:100%; font-size:0; table-layout:auto}
.analysisInfo > dl > dt								{padding-right:20px}
.analysisInfo > dl > dd								{position:relative; min-width:400px}

.analysisInfo .diagram								{min-width:1000px; padding:20px 10px 0 0; border:1px solid #ccc}
.analysisInfo .diagram li							{position:relative; display:inline-block; vertical-align:top; width:100%; box-sizing:border-box}
.analysisInfo .diagram li div						{box-sizing:border-box}
.analysisInfo .diagram > ul > li					{width:20%}

.analysisInfo .diagram .box							{position:relative; height:70px; background-color:white; color:#333 !important; z-index:2}
.analysisInfo .diagram .box button					{padding-bottom:1px; font-size:11px}
.analysisInfo .diagram .box.empty					{background-color:transparent}
.analysisInfo .diagram .box dl						{padding:10px; width:100%; height:100%; border:1px solid #ccc; font-size:15px; line-height:1.3; table-layout:auto; box-sizing:border-box}
.analysisInfo .diagram .box dl dt					{text-align:left}
.analysisInfo .diagram .box dl dt span				{display:block; font-size:12px; color:#444}
.analysisInfo .diagram .box dl dd					{text-align:center}
.analysisInfo .diagram .box dl dt + dd				{text-align:right}
.analysisInfo .diagram .box dl dd span				{padding-bottom:2px; border-bottom:2px solid #004fec; font-size:17px; font-weight:500}
.analysisInfo .diagram .box.green dl dd span		{border-bottom-color:#37b772}

.analysisInfo .diagram .box.line dl					{padding-left:12px}
.analysisInfo .diagram .box.line dd:after			{content:""; position:absolute; left:0; top:0; width:4px; height:100%; background-color:#004fec; z-index:4}
.analysisInfo .diagram .box.line.green dd:after		{background-color:#37b772}

.analysisInfo .diagram .box.double dl				{border-width:2px}
.analysisInfo .diagram .box.double.blue dl			{border-color:#004fec}
.analysisInfo .diagram .box.double.purple	dl		{border-color:#7a52cc}

.analysisInfo .diagram .box.dash:before				{content:""; position:absolute; right:-42px; top:50%; margin-top:-2px; width:42px; height:4px; background-color:#ccc; z-index:2}
.analysisInfo .diagram .box.arrow:after				{content:""; position:absolute; right:-42px; top:50%; margin-top:-8px; width:0; height:0; border-top:8px solid transparent; border-bottom:8px solid transparent; border-left:8px solid #ccc; z-index:2}
.analysisInfo .diagram .box.dash.arrow:before		{right:-40px; width:40px}

.analysisInfo .diagram .top							{height:20px; line-height:20px; text-align:center; font-size:18px; font-weight:500}
.analysisInfo .diagram .middle						{margin:15px 10px 0 10px; padding:10px}
.analysisInfo .diagram .middle.group				{background-color:#f0f0f0; border:1px dashed #ccc}
.analysisInfo .diagram .middle li + li				{margin-top:20px}
.analysisInfo .diagram .bottom						{margin:10px; padding:10px}

.analysisInfo .diagram .a-to-c						{position:absolute; left:50%; bottom:-57px; width:200%; height:120px; border-bottom:4px solid #ccc; border-left:4px solid #ccc}
.analysisInfo .diagram .a-to-b						{position:absolute; left:100%; bottom:50%; width:calc(50% + 42px); height:140px; border-bottom:4px solid #ccc; border-right:4px solid #ccc}
.analysisInfo .diagram .a-to-b:after				{content:""; position:absolute; right:-10px; top:-4px; width:0; height:0; border-left:8px solid transparent; border-right:8px solid transparent; border-bottom:8px solid #ccc; z-index:2}

.analysisInfo .chart 								{position:absolute; left:0; top:0; width:100%; height:100%; background-color:white; border:1px solid #ccc; font-size:1rem; box-sizing:border-box}
.analysisInfo .chart .ui-tab div					{border:none !important; border-bottom:1px solid #ccc !important}
.analysisInfo .chart .ui-tab li + li 				{border-left:1px solid #ccc !important}
.analysisInfo .chart .ui-tab input:checked + div	{border-bottom:none !important}
.analysisInfo .chart .tab							{position:absolute; left:20px; top:57px; right:20px; bottom:20px}
.analysisInfo .chart .tab canvas					{position:absolute; left:0; top:0; width:100%; height:100%}
.analysisInfo .chart .tab.empty:before				{content:"표시할 내용이 없습니다."; position:absolute; left:50%; top:50%; white-space:nowrap; font-size:19px; color:#ccc; transform:translate(-50%, -50%)}

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
		<div class="ui-date">
			<div id="ui-date-selector" class="ui-date-selector" data-type="month" data-event="doPage.update"></div>
		</div>

		<section class="analysisInfo" data-id="analysisInfo">
			<h2 class="ui-title">신규 고객 영업성과 분석</h2>
			<p class="ui-note">
				센터에 문의 단계부터 회원전환까지의 단계별 성과를 추적합니다. (재등록/기존회원에 대한 매출은 포함하지 않습니다.)
			</p>
			<dl>
				<dt>
					<div class="diagram" data-id="diagram">
						<ul>
							<li>
								<div class="top"></div>
								<div class="middle">
									<ul>
										<li>
											<div class="a-to-c"></div>
											<div class="box dash green line">
												<dl>
													<dt>
														전화+온라인<br>문의
														<!--<button class="ui-button small green">유입채널분석</button>-->
													</dt>
													<dd><span><var data-msg="onlineInbound">0</var>명</span></dd>
												</dl>
											</div>
										</li>
										<li>
											<div class="box empty"></div>
										</li>
										<li>
											<div class="a-to-b"></div>
											<div class="box green line">
												<dl>
													<dt>이탈고객<br>세일즈</dt>
													<dd><span><var data-msg="contactCount">0</var>건</span></dd>
												</dl>
											</div>
										</li>
									</ul>
								</div>
							</li>
							<li>
								<div class="top"></div>
								<div class="middle">
									<ul>
										<li>
											<div class="box dash green line">
												<dl>
													<dt>방문예약</dt>
													<dd><span><var data-msg="onlineReserve">0</var>명</span></dd>
												</dl>
											</div>
										</li>
										<li>
											<div class="box empty dash arrow"></div>
										</li>
									</ul>
								</div>
							</li>
							<li>
								<div class="top">대면상담</div>
								<div class="middle group">
									<ul>
										<li>
											<div class="box dash arrow blue line">
												<dl>
													<dt>예약방문</dt>
													<dd><span><var data-msg="onlineReserveVisit">0</var>명</span></dd>
												</dl>
											</div>
										</li>
										<li>
											<div class="box dash arrow blue line">
												<dl>
													<dt>전화+온라인<br>문의 후 방문</dt>
													<dd><span><var data-msg="onlineWalkinVisit">0</var>명</span></dd>
												</dl>
											</div>
										</li>
										<li>
											<div class="box dash arrow blue line">
												<dl>
													<dt>
														워크인 방문
														<span>(즉시결제포함)</span>
														<!--<button class="ui-button small blue">유입채널보기</button>-->
													</dt>
													<dd class="right"><span><var data-msg="walkinVisit">0</var>명</span></dd>
												</dl>
											</div>
										</li>
										<li>
											<div class="box dash arrow blue line">
												<dl>
													<dt>지인추천</dt>
													<dd><span><var data-msg="recommendVisit">0</var>명</span></dd>
												</dl>
											</div>
										</li>
									</ul>
								</div>
								<div class="bottom">
									<div class="box dash arrow double blue">
										<dl>
											<dd><var data-msg="">0</var>원</dd>
										</dl>
									</div>
								</div>
							</li>
							<li>
								<div class="top">결제성사</div>
								<div class="middle group">
									<ul>
										<li>
											<div class="box double purple">
												<dl>
													<dd>
														<var data-msg="onlineReserveVisitPaymentCount">0</var>건
														(<var data-msg="onlineReservePaymentAverage">0</var>%)<br>
														<var data-msg="onlineReservePayment">0</var>원
													</dd>
												</dl>
											</div>
										</li>
										<li>
											<div class="box double purple">
												<dl>
													<dd>
														<var data-msg="onlineWalkinVisitPaymentCount">0</var>건
														(<var data-msg="onlineWalkinPaymentAverage">0</var>%)<br>
														<var data-msg="onlineWalkinPayment">0</var>원
													</dd>
												</dl>
											</div>
										</li>
										<li>
											<div class="box double purple">
												<dl>
													<dd>
														<var data-msg="visitPaymentCount">0</var>건
														(<var data-msg="visitPaymentAverage">0</var>%)<br>
														<var data-msg="visitPayment">0</var>원
													</dd>
												</dl>
											</div>
										</li>
										<li>
											<div class="box double purple">
												<dl>
													<dd>
														<var data-msg="recommendPaymentCount">0</var>건
														(<var data-msg="recommendPaymentAverage">0</var>%)<br>
														<var data-msg="recommendPayment">0</var>원
													</dd>
												</dl>
											</div>
										</li>
									</ul>
								</div>
								<div class="bottom">
									<div class="box double purple">
										<dl>
											<dd>
												<var data-msg="paymentCount">0</var>건
												(<var data-msg="totalPaymentAverage">0</var>%)<br>
												<var data-msg="totalAmount">0</var>명
											</dd>
										</dl>
									</div>
								</div>
							</li>
							<li>
								<div class="top">지난달</div>
								<div class="middle group">
									<ul>
										<li>
											<div class="box">
												<dl>
													<dd>
														<var data-msg="prevOnlineReserveVisitPaymentCount">0</var>건<br>
														<var data-msg="prevOnlineReservePayment">0</var>원
													</dd>
												</dl>
											</div>
										</li>
										<li>
											<div class="box">
												<dl>
													<dd>
														<var data-msg="prevOnlineWalkinVisitPaymentCount">0</var>건<br>
														<var data-msg="prevOnlineWalkinPayment">0</var>원
													</dd>
												</dl>
											</div>
										</li>
										<li>
											<div class="box">
												<dl>
													<dd>
														<var data-msg="prevVisitPaymentCount">0</var>건<br>
														<var data-msg="prevVisitPayment">0</var>원
													</dd>
												</dl>
											</div>
										</li>
										<li>
											<div class="box">
												<dl>
													<dd>
														<var data-msg="prevRecommendPaymentCount">0</var>건<br>
														<var data-msg="prevRecommendPayment">0</var>원
													</dd>
												</dl>
											</div>
										</li>
									</ul>
								</div>
								<div class="bottom">
									<div class="box">
										<dl>
											<dd>
												<var data-msg="prevPaymentCount">0</var>건<br>
												<var data-msg="prevTotalAmount">0</var>원
											</dd>
										</dl>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</dt>
				<dd>
					<div class="chart">
						<div class="ui-tab">
							<ul>
								<li><label><input name="chartTab" type="radio" value="1" data-event="chartTab" checked><div>신규 문의 유입 채널</div></label></li>
								<li><label><input name="chartTab" type="radio" value="2" data-event="chartTab"><div>워크인 방문 유입 채널</div></label></li>
							</ul>
						</div>
						<div class="tab tab-1 focus" data-id="onlineInboundChart">
							<canvas></canvas>
						</div>
						<div class="tab tab-2" data-id="visitInboundChart">
							<canvas></canvas>
						</div>
					</div>
				</dd>
			</dl>
		</section>

		<section class="analysisList" data-id="analysisList">
			<h2 class="ui-title">담당자별 신규 영업성과 분석</h2>
			<p class="ui-note">
				신규고객 세일즈 관리에 지정된 담당자의 단계별 성과를 추적합니다. (매출/결제금액은 세일즈 담당자로 집계되며, 결제 시 선택한 결제 담당자와 무관합니다.)
			</p>
			<div class="ui-table-box scroll inside">
				<div>
					<div>
						<table class="ui-table dark even">
							<thead>
								<tr>
									<th rowspan="2">담당자</th>
									<td colspan="5">신규 영업 활동 분석</td>
									<td colspan="3">신규 영업 성과 분석</th>
									<td colspan="4">TI / 온라인</th>
									<td colspan="3">워크인</th>
									<td colspan="3">지인추천</th>
								</tr>
								<tr>
									<td>온라인 상담</td>
									<td>전화 상담</td>
									<td>대면 상담</td>
									<td>신규 결제</td>
									<td>대면-마감</td>
									<td>결제+미수</td>
									<td>결제</td>
									<td>미수</td>
									<td>온라인+전화</td>
									<td>예약방문</td>
									<td>결제</td>
									<td>매출</td>
									<td>워크인</td>
									<td>결제</td>
									<td>매출</td>
									<td>지인추천</td>
									<td>결제</td>
									<td>매출</td>
								</tr>
							</thead>
							<tbody>
								<tr><td class="empty" colspan="20">데이터를 불러오는 중 입니다.</td></tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
	</main>
</div>
</body>
<script type="text/javascript">

function doReady() {
	doPage.open();
}

const doPage = {
	container : undefined,
	data : {},
	open : function(data) {
		salesController.analysis.search(data).then(data => {
			this.data = data;
			this.render();
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는 중 실패하였습니다.");
		});
	},
	update : function(data) {
		const date = new Date(data.date);
		doPage.open({
			searchYear : date.getFullYear(),
			searchMonth : date.getMonth() + 1
		});
	},
	render : function() {
		this.container = document.querySelector("main");
		const setList = () => {
			const section = this.container.querySelector("[data-id='analysisList']");
			const tbody = section.querySelector("tbody");
			const tr = this.data.analysisList.map(item => {
				const getVisitCount = () => {
					return item.telReserveVisit + item.telWalkinVisit + item.onlineReserveVisit + item.onlineWalkinVisit
						+ item.visitReserveVisit + item.visitWalkinVisit + item.recommendReserveVisit + item.recommendWalkinVisit;
				};
				const getPaymentCount = () => {
					return item.telReservePaymentCount + item.telWalkinPaymentCount + item.onlineReservePaymentCount + item.onlineWalkinPaymentCount
						+ item.visitReservePaymentCount + item.visitWalkinPaymentCount + item.recommendReservePaymentCount + item.recommendWalkinPaymentCount;
				};
				const getVisitPaymentAverage = () => {
					const visitCount = getVisitCount();
					const paymentCount = getPaymentCount();
					return Math.round((visitCount > 0) ? paymentCount / visitCount * 100 : 0);
				};
				const getTotalAmount = () => {
					return item.onlineReserveTotalAmount + item.onlineWalkinTotalAmount + item.telReserveTotalAmount + item.telWalkinTotalAmount
						+ item.visitReserveTotalAmount + item.visitWalkinTotalAmount + item.recommendReserveTotalAmount + item.recommendWalkinTotalAmount;
				};
				const getTotalPayments = () => {
					return item.onlineReserveTotalPayments + item.onlineWalkinTotalPayments + item.telReserveTotalPayments + item.telWalkinTotalPayments
						+ item.visitReserveTotalPayments + item.visitWalkinTotalPayments + item.recommendReserveTotalPayments + item.recommendWalkinTotalPayments;
				};
				const getTotalReceivables = () => {
					return item.onlineReserveReceivables + item.onlineWalkinReceivables + item.telReserveReceivables + item.telWalkinReceivables
						+ item.visitReserveReceivables + item.visitWalkinReceivables + item.recommendReserveReceivables + item.recommendWalkinReceivables;
				};
				const getOnlineTelInbound = () => {
					return item.onlineInboundCount + item.telInboundCount;
				};
				const getOnlineTelVisit = () => {
					return item.onlineReserveVisit + item.onlineWalkinVisit + item.telReserveVisit + item.telWalkinVisit;
				};
				const getOnlineTelPaymentCount = () => {
					return item.onlineReservePaymentCount + item.onlineWalkinPaymentCount + item.telReservePaymentCount + item.telWalkinPaymentCount;
				};
				const getOnlineTelTotalAmount = () => {
					return item.onlineReserveTotalAmount + item.onlineWalkinTotalAmount + item.telReserveTotalAmount + item.telWalkinTotalAmount;
				};
				const getOnlineTelTotalPayments = () => {
					return item.onlineReserveTotalPayments + item.onlineWalkinTotalPayments + item.telReserveTotalPayments + item.telWalkinTotalPayments;
				};
				const getOnlineTelVisitPaymentAverage = () => {
					const onlineTelVisit = getOnlineTelVisit();
					const onlineTelPaymentCount = getOnlineTelPaymentCount();
					return Math.round((onlineTelVisit > 0) ? onlineTelPaymentCount / onlineTelVisit * 100 : 0);
				};
				const getVisitVisitCount = () => {
					return item.visitReserveVisit + item.visitWalkinVisit;
				};
				const getVisitPaymentCount = () => {
					return item.visitReservePaymentCount + item.visitWalkinPaymentCount;
				};
				const getVisitTotalAmount = () => {
					return item.visitReserveTotalAmount + item.visitWalkinTotalAmount;
				};
				const getVisitTotalPayments = () => {
					return item.visitReserveTotalPayments + item.visitWalkinTotalPayments;
				};
				const getVisitVisitPaymentAverage = () => {
					const visitVisitCount = getVisitVisitCount();
					const visitPaymentCount = getVisitPaymentCount();
					return Math.round((visitVisitCount > 0) ? visitPaymentCount / visitVisitCount * 100 : 0);
				};
				const getRecommendVisitCount = () => {
					return item.recommendReserveVisit + item.recommendWalkinVisit;
				};
				const getRecommendPaymentCount = () => {
					return item.recommendReservePaymentCount + item.recommendWalkinPaymentCount;
				};
				const getRecommendTotalAmount = () => {
					return item.recommendReserveTotalAmount + item.recommendWalkinTotalAmount;
				};
				const getRecommendTotalPayments = () => {
					return item.recommendReserveTotalPayments + item.recommendWalkinTotalPayments;
				};
				const getRecommendVisitPaymentAverage = () => {
					const recommendVisitCount = getRecommendVisitCount();
					const recommendPaymentCount = getRecommendPaymentCount();
					return Math.round((recommendVisitCount > 0) ? recommendPaymentCount / recommendVisitCount * 100 : 0);
				};
				return `
					<tr>
						<th>${item.coachName}</th>
						<td>${item.onlineInboundCount}건</td>
						<td>${item.telInboundCount}건</td>
						<td>${getVisitCount()}건</td>
						<td>${getPaymentCount()}건</td>
						<td>${getVisitPaymentAverage()}%</td>
						<td>${getComma(getTotalAmount())}원</td>
						<td class="green">${getComma(getTotalPayments())}원</td>
						<td class="red">${getComma(getTotalReceivables())}원</td>
						<td>${getOnlineTelInbound()}건</td>
						<td>${getOnlineTelVisit()}건</td>
						<td>${getOnlineTelPaymentCount()}건 (${getOnlineTelVisitPaymentAverage()}%)</td>
						<td class="green">${getComma(getOnlineTelTotalAmount())}원</td>
						<td>${getVisitVisitCount()}건</td>
						<td>${getVisitPaymentCount()}건 (${getVisitVisitPaymentAverage()}%)</td>
						<td class="green">${getComma(getVisitTotalAmount())}원</td>
						<td>${getRecommendVisitCount()}건</td>
						<td>${getRecommendPaymentCount()}건 (${getRecommendVisitPaymentAverage()}%)</td>
						<td class="green">${getComma(getRecommendTotalAmount())}원</td>
					</tr>
				`;
			});
			tbody.innerHTML = (tr.length == 0) ? `<tr><td class="empty" colspan="20">데이터가 없습니다.</td></tr>` : tr.join("");
		};
		const setInfo = () => {
			const section = this.container.querySelector("[data-id='analysisInfo']");
			const analysisInfo = this.data.analysisInfo;
			for(let name in analysisInfo)
				section.putValue(name, getComma(analysisInfo[name]));
		};
		const setChart = () => {
			const defaultOption = {
				cutoutPercentage : 60,
				responsive : true,
				maintainAspectRatio : false,
				animation : false,
				layout : {
					padding : 40,
				},
				legend : {
					display : true
				},
				plugins: {
					labels: {
						render : "value",
						showZero : true,
						fontColor : "#fff",
						render : function(item) {
							if(item.value == -1) return "";
							return `${item.label}\n${item.percentage}%`;
						},
					},
					colorschemes : {
						scheme : "office.BlueWarm6"
					}
				}
			};
			const chartList = ["onlineInbound", "visitInbound"];
			chartList.forEach(item => {
				const data = this.data[item + "List"];
				const div = this.container.querySelector("[data-id='" + item + "Chart']");
				const canvas = div.querySelector("canvas")
				const cloneNode = canvas.cloneNode(true);
				canvas.parentNode.replaceChild(cloneNode, canvas);
				const ctx = cloneNode.getContext("2d");
				const labelList = data.map(item => item.attrValue);
				const dataList = data.map(item => item.inboundPathCount);
				if(dataList.length == 0) {
					div.classList.add("empty");
				} else {
					div.classList.remove("empty");
					new Chart(ctx, {
						type : "pie",
						data : {
							labels : labelList,
							datasets : [{
								data : dataList,
							}]
						},
						options : defaultOption
					});
				}
			});
		};
		setList();
		setInfo();
		setChart();
		uiTab(this.container);
	}
};
</script>
</html>

</html>
