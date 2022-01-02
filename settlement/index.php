
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
	<script type="text/javascript" src="/static/js/controller/settlementController.js"></script>
	<script type="text/javascript" src="/static/js/ui/uiDateSelector.js"></script>
	<script type="text/javascript" src="/static/js/common/jquery/jquery.dataTables.min.js"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/jquery/jquery.dataTables.css">
	<style type="text/css">
body									{display:block}
main									{position:relative; padding:40px 0; height:100%; overflow:auto}
main section							{padding:0 40px}

.overview								{position:sticky; position:-webkit-sticky; left:0}
.overview > div + div					{margin-top:40px}
.overview .top							{position:relative; text-align:center}
.overview .top > select					{position:absolute; right:0; top:0; width:150px}


.overview .ui-state						{margin-top:40px}
.overview .ui-state dd > div			{padding:15px}
.overview .ui-state h2					{font-size:17px}
.overview .ui-state h2 div				{font-size:1rem; font-weight:normal}
.overview .ui-table b					{font-weight:500}

.list									{margin-top:45px}
.list .ui-table thead tr > *			{padding:8px}
.list .ui-table td:nth-child(1),
.list .ui-table td:nth-child(2)			{text-align:center}
.list .ui-table td button[disabled]		{opacity:0.3}
	</style>
</head>
<body>
<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="인사관리">
	<div class="right">
		<a href="/coach">임직원 관리</a>
		
			<a href="/coach/payroll/setting">급여설정</a>
		
		
			<a class="focus" href="/settlement">급여정산</a>
		
	</div>
</nav>

<!-- 콘텐츠 -->
<div class="contents">
	<main>
		<!-- 센터 매출 개요 -->
		<section class="overview">
			<div class="top">
				<div class="ui-date-selector" data-date="2022-01-01" data-partner="true" data-event="doUpdate"></div>
			</div>
			<div class="middle">
				<table class="ui-table point sharp fixed">
					<thead>
					<tr>
						<td>확정 급여<br>합계</td>
						<td>기본급<br>합계</td>
						<td>개인 매출<br>커미션 합계</td>
						<td>팀 매출<br>커미션 합계</td>
						<td>센터 매출<br>커미션 합계</td>
						<td>개인 수당<br>합계</td>
						<td>그룹 수당<br>합계</td>
						<td>공제금액<br>합계</td>
						<td>조정금액 합계</td>
					</tr>
					</thead>
					<tbody data-event="overview">
					<tr>
						<td>0원</td>
						<td>5,800,000원</td>
						<td>0원</td>
						<td>0원</td>
						<td>0원</td>
						<td>0원</td>
						<td>0원</td>
						<td>125,400원</td>
						<td>0원</td>
					</tr>
					</tbody>
				</table>
			</div>
			
		</section>

		<!-- 임직원 목록 -->
		<section class="list">
			<div class="ui-table-box">
				<div>
					<div>
						<table class="ui-table dark even sum right" data-table-length="10" data-table-dom="tp">
							<thead>
							<tr>
								<td rowspan="2">지점</td>
								<td rowspan="2">임직원</td>
								<td class="em" rowspan="2">총 월 급여</td>
								<td rowspan="2">기본급</td>
								<td colspan="2">개인 매출 커미션</td>
								<td colspan="2">팀 매출 커미션</td>
								<td colspan="2">센터 매출 커미션</td>
								<td colspan="2">개인 수당</td>
								<td rowspan="2">그룹 수당</td>
								<td rowspan="2">조정금액</td>
								<td rowspan="2">공제금액</td>
								<td rowspan="2">차인지급액</td>
								<td rowspan="2">확정상태</td>
								<td colspan="2" rowspan="2">급여내역</td>
							</tr>
							<tr>
								<td>신규</td>
								<td>재결제</td>
								<td>신규</td>
								<td>재결제</td>
								<td>신규</td>
								<td>재결제</td>
								<td>신규</td>
								<td>재결제</td>
							</tr>
							</thead>
							<tbody>
							
								<tr>
									<td>-</td>
									<td>이석훈</td>
									<td class="em">1,500,000원</td>
									<td>1,500,000원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>49,500원</td>
									<td>1,450,500원</td>
									<td class="center green">미확정</td>
									<td class="center">
										<button class="ui-button small white" data-type="current" data-sequence="9806"
												data-event="detail">실시간 급여내역 조회
										</button>
									</td>
									<td class="center">
										<button class="ui-button small white" data-type="confirm" data-sequence="9806"
												data-event="detail">확정 급여내역 보기
										</button>
									</td>
								</tr>
							
								<tr>
									<td>-</td>
									<td>기본관리자</td>
									<td class="em">800,000원</td>
									<td>800,000원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>26,400원</td>
									<td>773,600원</td>
									<td class="center green">미확정</td>
									<td class="center">
										<button class="ui-button small white" data-type="current" data-sequence="9807"
												data-event="detail">실시간 급여내역 조회
										</button>
									</td>
									<td class="center">
										<button class="ui-button small white" data-type="confirm" data-sequence="9807"
												data-event="detail">확정 급여내역 보기
										</button>
									</td>
								</tr>
							
								<tr>
									<td>-</td>
									<td>홍준선</td>
									<td class="em">1,500,000원</td>
									<td>1,500,000원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>49,500원</td>
									<td>1,450,500원</td>
									<td class="center green">미확정</td>
									<td class="center">
										<button class="ui-button small white" data-type="current" data-sequence="9816"
												data-event="detail">실시간 급여내역 조회
										</button>
									</td>
									<td class="center">
										<button class="ui-button small white" data-type="confirm" data-sequence="9816"
												data-event="detail">확정 급여내역 보기
										</button>
									</td>
								</tr>
							
								<tr>
									<td>-</td>
									<td>김반석</td>
									<td class="em">0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td class="center green">미확정</td>
									<td class="center">
										<button class="ui-button small white" data-type="current" data-sequence="9817"
												data-event="detail">실시간 급여내역 조회
										</button>
									</td>
									<td class="center">
										<button class="ui-button small white" data-type="confirm" data-sequence="9817"
												data-event="detail">확정 급여내역 보기
										</button>
									</td>
								</tr>
							
								<tr>
									<td>-</td>
									<td>민윤정</td>
									<td class="em">0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td class="center green">미확정</td>
									<td class="center">
										<button class="ui-button small white" data-type="current" data-sequence="14597"
												data-event="detail">실시간 급여내역 조회
										</button>
									</td>
									<td class="center">
										<button class="ui-button small white" data-type="confirm" data-sequence="14597"
												data-event="detail">확정 급여내역 보기
										</button>
									</td>
								</tr>
							
								<tr>
									<td>-</td>
									<td>강동원</td>
									<td class="em">0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td class="center green">미확정</td>
									<td class="center">
										<button class="ui-button small white" data-type="current" data-sequence="17122"
												data-event="detail">실시간 급여내역 조회
										</button>
									</td>
									<td class="center">
										<button class="ui-button small white" data-type="confirm" data-sequence="17122"
												data-event="detail">확정 급여내역 보기
										</button>
									</td>
								</tr>
							
								<tr>
									<td>-</td>
									<td>이민주</td>
									<td class="em">0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td class="center green">미확정</td>
									<td class="center">
										<button class="ui-button small white" data-type="current" data-sequence="17471"
												data-event="detail">실시간 급여내역 조회
										</button>
									</td>
									<td class="center">
										<button class="ui-button small white" data-type="confirm" data-sequence="17471"
												data-event="detail">확정 급여내역 보기
										</button>
									</td>
								</tr>
							
								<tr>
									<td>-</td>
									<td>전상훈 </td>
									<td class="em">0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td class="center green">미확정</td>
									<td class="center">
										<button class="ui-button small white" data-type="current" data-sequence="18935"
												data-event="detail">실시간 급여내역 조회
										</button>
									</td>
									<td class="center">
										<button class="ui-button small white" data-type="confirm" data-sequence="18935"
												data-event="detail">확정 급여내역 보기
										</button>
									</td>
								</tr>
							
								<tr>
									<td>-</td>
									<td>박동훈</td>
									<td class="em">0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td class="center green">미확정</td>
									<td class="center">
										<button class="ui-button small white" data-type="current" data-sequence="19677"
												data-event="detail">실시간 급여내역 조회
										</button>
									</td>
									<td class="center">
										<button class="ui-button small white" data-type="confirm" data-sequence="19677"
												data-event="detail">확정 급여내역 보기
										</button>
									</td>
								</tr>
							
								<tr>
									<td>-</td>
									<td>골프 프로</td>
									<td class="em">0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td class="center green">미확정</td>
									<td class="center">
										<button class="ui-button small white" data-type="current" data-sequence="20000"
												data-event="detail">실시간 급여내역 조회
										</button>
									</td>
									<td class="center">
										<button class="ui-button small white" data-type="confirm" data-sequence="20000"
												data-event="detail">확정 급여내역 보기
										</button>
									</td>
								</tr>
							
								<tr>
									<td>-</td>
									<td>블리스포인트 프로</td>
									<td class="em">2,000,000원</td>
									<td>2,000,000원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>2,000,000원</td>
									<td class="center green">미확정</td>
									<td class="center">
										<button class="ui-button small white" data-type="current" data-sequence="20962"
												data-event="detail">실시간 급여내역 조회
										</button>
									</td>
									<td class="center">
										<button class="ui-button small white" data-type="confirm" data-sequence="20962"
												data-event="detail">확정 급여내역 보기
										</button>
									</td>
								</tr>
							
								<tr>
									<td>-</td>
									<td>노동기 Instructor</td>
									<td class="em">0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td>0원</td>
									<td class="center green">미확정</td>
									<td class="center">
										<button class="ui-button small white" data-type="current" data-sequence="21768"
												data-event="detail">실시간 급여내역 조회
										</button>
									</td>
									<td class="center">
										<button class="ui-button small white" data-type="confirm" data-sequence="21768"
												data-event="detail">확정 급여내역 보기
										</button>
									</td>
								</tr>
							
							</tbody>
							<tfoot>
							<tr>
								<td colspan="2">합계</td>
								<td class="em">5,800,000원</td>
								<td>5,800,000원</td>
								<td>0원</td>
								<td>0원</td>
								<td>0원</td>
								<td>0원</td>
								<td>0원</td>
								<td>0원</td>
								<td>0원</td>
								<td>0원</td>
								<td>0원</td>
								<td>0원</td>
								<td>125,400원</td>
								<td>5,674,600원</td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		</section>
	</main>
</div>
</body>
<script type="text/javascript">

	var date = "2022-01-01";

	function doReady() {
		uiEvent(document, {
			click: {
				detail: function () {
					doDetail(this);
				}
			}
		});
	}

	function doUpdate(data) {
		uiBlock();
		console.log(data);
		const date = data.date;
		window.location.href = "/settlement?date=" + date;
	}

	function doDetail(object) {
		const type = object.getAttribute("data-type");				// current(실시간) | confirm(확정)
		const sequence = object.getAttribute("data-sequence");		// seqMember
		window.location.href = "/settlement/coach/" + sequence + "/" + type + "?date=" + date;
	}

	/*
	const doPage = {
		container : undefined,
		data : {
			settlementList : []
		},
		open : function() {
			const searchData = {
			};
			const seqPartner = partnerInfo.partner.id;
			Promise.all([
	//			settlementController.list(searchData),
			]).then(([settlementList]) => {
				this.data = {
					settlementList : settlementList
				};
				this.render();
			}).catch(error => {
				uiError(error);
			});
		},
		update : function(value) {
			console.log(value);
		},
		render : function() {
			const data = this.data;
			const self = this.event.self = this.template.self = this;
			this.container = document.querySelector("main");
			const setOverview = () => {
				uiConsole("1. OVERVIEW");
				const table = this.container.querySelector("[data-event='overview']");
			};
			const setState = () => {
				uiConsole("2. STATE");
				const dl = this.container.querySelector("[data-event='state']");
				const varList = dl.querySelectorAll("var");
			};
			const setList = () => {
				uiConsole("3. LIST");
				const table = this.container.querySelector("[data-event='list']");
				const tbody = table.querySelector("tbody");
				const tfoot = table.querySelector("tfoot");
	//			tbody.innerHTML = this.template.getListBody();
	//			tfoot.innerHTML = this.template.getListFoot();
			};
			setOverview();
			setState();
			setList();
		},
		event : {
		},
		template : {
			getOverview : function(item) {
			},
			getListBody : function(item) {
			},
			getListFoot : function(item) {
				const summary = [];
				// 합계 배열을 만든 후 더한다.
			}
		}
	};
	 */
</script>
</html>
</html>
