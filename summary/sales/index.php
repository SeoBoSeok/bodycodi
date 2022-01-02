
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
	<script type="text/javascript" src="/static/js/component/componentMember.js?v=20211118"></script>
	<script type="text/javascript" src="/static/js/component/componentOrderHistory.js?v=20211108"></script>
	<script type="text/javascript" src="/static/js/popup/popupMemberPass.js"></script>
	<script type="text/javascript" src="/static/js/controller/reportController.js?v=20201111"></script>
	<script type="text/javascript" src="/static/js/controller/ticketController.js"></script>
	<script type="text/javascript" src="/static/js/controller/scheduleController.js"></script>
	<script type="text/javascript" src="/static/js/controller/serviceController.js?v=20210413"></script>
	<script type="text/javascript" src="/static/js/common/jquery/jquery.dataTables.min.js"></script>
	<!--
	<script type="text/javascript" src="/static/js/common/excel/xlsx.mini.min.js"></script>
	-->
	<script type="text/javascript" src="/static/js/common/excel/exceljs.min.js"></script>
	<script type="text/javascript" src="/static/js/common/excel/FileSaver.min.js"></script>

	<link type="text/css" rel="stylesheet" href="/static/css/jquery/jquery.dataTables.css" />
	<link type="text/css" rel="stylesheet" href="/static/css/memberInfo.css?v=20210329" />
	<style type="text/css">
main .ui-date					{margin-bottom:40px}

main .ui-search					{margin:25px 0 40px}
main .ui-search .staff-list		{margin:10px 0 15px 0}
main .ui-search table			{background-color:white}
main .ui-search table tr > *	{padding:8px !important}
main .ui-search input,
main .ui-search select			{margin:0; margin-right:5px}
main .ui-search button			{margin:0}
main .ui-search input			{max-width:200px}

main .orderBox					{margin-top:20px}
	</style>
</head>
<body>
<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="회계관리">
	<div class="right">
		
			<a class="focus" href="/summary/sales">이용권 매출조회</a>
			<a href="/manager/accounting/sales/salesList/productPublic">일반 상품 매출조회</a>
		
		
			<a href="/manager/expenditure/index">지출등록</a>
		
		
			<a href="/manager/accounting/expenditure">지출조회</a>
		
	</div>
</nav>

<!-- 콘텐츠 -->
<div class="contents">
	<!-- 메인 -->
	<main>
		<!-- 메인 탭 메뉴 -->
		<div class="ui-tab block">
			<ul>
				<li><label><a href="/summary/sales?type=day"><input name="mainTab" type="radio" value="day"><div>일일 매출 보고</div></a></label></li>
				<li><label><a href="/summary/sales?type=week"><input name="mainTab" type="radio" value="week"><div>주간 매출 보고</div></a></label></li>
				<li><label><a href="/summary/sales?type=month"><input name="mainTab" type="radio" value="month"><div>월간 매출 보고</div></a></label></li>
				<li><label><a href="/summary/sales/receivable"><input name="mainTab" type="radio" value="receivable"><div>누적 미수내역 보고</div></a></label></li>
			</ul>
		</div>

		<!-- 날짜 선택 -->
		<div class="ui-date">
			<div id="ui-date-selector" class="ui-date-selector" data-type="day" data-date="" data-ready="true" data-event="doUpdate"></div>
		</div>

		<!-- 매출 및 영업 현황 요약 -->
		<section data-id="summary">
			<h2 class="ui-title">일일 매출 및 영업 현황 요약</h2>
			<div class="ui-state">
				<div>
					<dl>
						<dd><div><h2>0원<span>0건 / 0명</span></h2><h3>결제금액</h3></div></dd>
						<dd><div><h2>0원<span>0건 / 0명</span></h2><h3>신규등록</h3></div></dd>
						<dd><div><h2>0원<span>0건 / 0명</span></h2><h3>재등록</h3></div></dd>
						<dd><div><h2>0원<span>0건 / 0명</span></h2><h3>양도 수수료</h3></div></dd>
						<dd><div><h2>0원<span>0건 / 0명</span></h2><h3>환불</h3></div></dd>
					</dl>
				</div>
			</div>
		</section>

		<!-- 매출 내역 검색 -->
		<section data-id="search">
			<h2 class="ui-title">일일 매출 내역 검색</h2>
			<form name="search" autocomplete="off">
				<div class="ui-search">
					<input name="fromDate" type="hidden" value="">
					<input name="toDate" type="hidden" value="">
					<div data-id="search-staff">
						<table class="ui-table dark">
							<colgroup><col><col width="10%"></colgroup>
							<thead>
								<tr><th></th><td class="branchDisplay">지점명</td><td>담당자</td><td>결제금액</td><td>신규</td><td>재등록</td><td>환불</td></tr>
							</thead>
							<tbody>
								<tr><td class="empty" colspan="7">검색 결과가 없습니다.</td></tr>
							</tbody>
						</table>
					</div>
					<div class="filter">
						<div class="left">
							<select class="ui-select" name="orderType">
								<option value="">판매분류</option>
								<option value="">전체</option>
								<option value="PASS">이용권 판매</option>
								<option value="UPGRADE">업그레이드</option>
								<option value="CROSS">교체</option>
								<option value="TRANSFER">양도</option>
							</select>
							<select class="ui-select" name="orderClassification">
								<option value="">신규/재등록</option>
								<option value="">전체</option>
								<option value="NEW">신규</option>
								<option value="INUSE">재등록</option>
							</select>
							<select class="ui-select" name="paymentType">
								<option value="">결제수단</option>
								<option value="">전체</option>
								<option value="CASH">현금</option>
								<option value="CARD">카드</option>
								<option value="TRANSFER">이체</option>
							</select>
						</div>
						<div class="right">
							<input class="ui-input-search" type="search" name="orderName" placeholder="판매/환불 내역 검색">
							<input class="ui-input-search" type="search" name="memberName" placeholder="구매/환불 회원 검색">
							<button class="ui-button blue" type="button" data-event="submit">검색</button>
						</div>
					</div>
				</div>
			</form>
		</section>

		<!-- 매출 내역 통계 -->
		<section>
			<h2 class="ui-title">일일 매출 내역 통계</h2>
			<div class="ui-state" data-id="order-summary">
				<div>
					<dl>
						<dd><div><h2><var data-msg="sumSaleAmount">0</var>원</h2><h3>판매금액</h3><h4>판매일 기준, 이용권 상품의 판매가 합계</h4></div></dd>
						<dd><div><h2><var data-msg="sumPaymentAmount">0</var>원</h2><h3>결제금액</h3><h4>결제일 기준, 이용권 결제금액과 미수금 결제금액 합계</h4></div></dd>
						<dd><div><h2><var data-msg="sumRefundPaymentAmount">0</var>원</h2><h3>환불 재결제 금액</h3><h4>환불 시, 카드취소 후 재결제한 금액 합계</h4></div></dd>
						<dd><div><h2><var data-msg="sumRefundAmount">0</var>원</h2><h3>환불지급액</h3><h4>현금환불과 카드취소 금액 합계</h4></div></dd>
						<dd><div><h2><var data-msg="sumDepositAmount">0</var>원</h2><h3>수익금액</h3><h4>결제금액 + 환불 재결제 금액 – 환불지급액</h4></div></dd>
					</dl>
				</div>
			</div>
			<div class="orderBox report" data-id="orderBox">
				<!-- 왼쪽 : 판매 목록 -->
				<div class="left">
					<div class="orderList">
						<div class="ui-tab">
							<ul>
								<li><label><input name="subTab" type="radio" value="combineList" data-event="tab" checked><div>결제/환불 통합내역</div></label></li>
								<li><label><input name="subTab" type="radio" value="orderList" data-event="tab"><div>이용권 별 판매내역</div></label></li>
								<li><label><input name="subTab" type="radio" value="refundList" data-event="tab"><div>이용권 별 환불내역</div></label></li>
								<li><label><input name="subTab" type="radio" value="paymentList" data-event="tab"><div>결제내역</div></label></li>
							</ul>
						</div>

						<!-- 결제/환불 통합내역 -->
						<div class="tab tab-1 focus">
							<p class="ui-note blue" style="position:relative; padding-left:80px">
								<span class="left">
									판매내역을 클릭하면 판매한 이용권에 대한 업그레이드, 교체, 양도, 환불, 미수금 결제를 진행할 수 있습니다.
								</span>
								<span class="right">
									<label class="ui-input-checkbox"><input type="checkbox" data-event="canceledYn" checked><span></span>취소 제외</label>
									<!--<label class="ui-input-checkbox"><input type="checkbox" data-event="expiredYn"><span></span>만료 제외</label>-->
									<label class="ui-input-checkbox"><input type="checkbox" data-event="receivableYn"><span></span>미수금 내역만 보기</label>
								</span>
							</p>
							<div class="ui-table-box scroll inside">
								<div data-id="combineList">
									<p class="ui-note center">결제/환불 통합내역을 불러오는 중 입니다.</p>
								</div>
							</div>
						</div>

						<!-- 이용권 별 판매내역 -->
						<div class="tab tab-2">
							<p class="ui-note blue">
								<span class="left">판매내역을 클릭하면 판매한 회원권을 업그레이드, 교체, 양도, 환불, 미수금 결제를 진행할 수 있습니다.</span>
								<span class="right">
									<label class="ui-input-checkbox"><input type="checkbox" data-event="canceledYn" checked><span></span>취소 제외</label>
									<label class="ui-input-checkbox"><input type="checkbox" data-event="expiredYn"><span></span>만료 제외</label>
									<label class="ui-input-checkbox"><input type="checkbox" data-event="receivableYn"><span></span>미수금 내역만 보기</label>
								</span>
							</p>
							<div class="ui-table-box scroll inside">
								<div data-event="orderList">
									<p class="ui-note center">이용권 별 판매내역을 불러오는 중 입니다.</p>
								</div>
							</div>
						</div>

						<!-- 이용권 별 환불내역 -->
						<div class="tab tab-3">
							<p class="ui-note blue">
								<span class="right">
									<label class="ui-input-checkbox"><input type="checkbox" data-event="canceledYn" checked><span></span>취소 제외</label>
								</span>
							</p>
							<div class="ui-table-box scroll inside">
								<div data-event="refundList">
									<p class="ui-note center">이용권 별 환불내역을 불러오는 중 입니다.</p>
								</div>
							</div>
						</div>

						<!-- 결제내역 -->
						<div class="tab tab-4">
							<p class="ui-note blue">
								<span class="right">
									<label class="ui-input-checkbox"><input type="checkbox" data-event="canceledYn" checked><span></span>취소 제외</label>
								</span>
							</p>
							<div class="ui-table-box scroll inside">
								<div data-event="paymentList">
									<p class="ui-note center">결제내역을 불러오는 중 입니다.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 오른쪽 : 판매 상세 -->
				<div class="right">
					<div class="orderInfo">
						<div class="title">
							판매 상세 정보
							<a data-event="close"></a>
						</div>
						<div class="contents" data-id="orderInfo"></div>
					</div>
				</div>
			</div>
		</section>
	</main>
</div>
</body>
<script type="text/javascript">

function doReady() {
	const mainTab = document.querySelector("[name='mainTab'][value='day']");
	if(mainTab) mainTab.checked = true;
}

function doUpdate(object) {
	const fromDate = object.startDate;
	const toDate = object.endDate;

	const form = document.querySelector("main [data-id='search'] form");
	form.putValue("fromDate", fromDate);
	form.putValue("toDate", toDate);

	if(object.isReady) {
		doPage.open(fromDate, toDate);
	} else {
		location.href = "/summary/sales?type=day&fromDate=" + fromDate + "&toDate=" + toDate;
	}
}

const doPage = {
	container : undefined,
	data : {
		summary : {},
		search : {
			data : {},
			coachList : []
		}
	},
	open : function(fromDate, toDate) {
		Promise.all([
			reportController.sales.summary(fromDate, toDate),
		]).then(([summaryInfo]) => {
			this.data = {
				summary : summaryInfo.summary || {},
				search : {
					coachList : summaryInfo.coachList || []
				},
			};
			this.render();
		}).catch(error => {
			console.log(error);
			alert("매출 개요를 가져오는데 실패하였습니다.");
		});
	},
	render : function() {
		this.summary.open(this);
		this.search.open(this);
	},
	summary : {
		container : undefined,
		data : {},
		open : function(context) {
			try {
				this.data = context.data.summary;
				this.render();
			} catch(error) {
				console.log(error);
			}
		},
		render : function() {
			this.container = document.querySelector("[data-id='summary']");
			this.container.innerHTML = this.template();
		},
		template : function() {
			const summary = this.data;
			const data = {
				sumSaleAmount : getComma(summary.sumPaymentAmount),
				sumReceivableAmount : getComma(summary.sumReceivables),
				sumPaymentAmount : getComma(summary.sumPaymentAmount - summary.sumReceivables),
				sumRefundAmount : getComma(summary.sumRefundAmount),
				sumDepositAmount : getComma(summary.sumPaymentAmount - summary.sumReceivables - summary.sumRefundAmount)
			};
			const array = ["payment", "new", "inuse", "transfer", "refund"];
			array.forEach(item => {
				const name = item.toUpperCase();
				const info = summary.count[name] || {};
				data[item] = `
					${getComma(info.sumAmount || 0)}원
					<span>${getComma(info.orderCount || 0)}건 / ${getComma(info.memberCount || 0)}명</span>
				`;
			});

			return `
				<h2 class="ui-title">일일 매출 및 영업 현황 요약</h2>
				<div class="ui-state">
					<div>
						<dl>
							<dd><div><h2>${data.payment}</h2><h3>결제금액</h3></div></dd>
							<dd><div><h2>${data.new}</h2><h3>신규등록</h3></div></dd>
							<dd><div><h2>${data.inuse}</h2><h3>재등록</h3></div></dd>
							<dd><div><h2>${data.transfer}</h2><h3>양도 수수료</h3></div></dd>
							<dd><div><h2>${data.refund}</h2><h3>환불</h3></div></dd>
						</dl>
					</div>
				</div>
			`;
		}
	},
	search : {
		container : undefined,
		data : {},
		open : function(context) {
			try {
				this.data = context.data || {};
				this.render();
				this.submit(true);
			} catch(error) {
				console.log(error);
			}
		},
		submit : function(isRender) {
			this.container = document.querySelector("main [data-id='search']");

			const form = this.container;
			const coachList = [];
			form.querySelectorAll("tbody [name='seqPartnerCoach']:checked").forEach(item => {
				if(item.value) coachList.push(item.value);
			});
			const searchData = this.data.search.data = {
				fromDate : form.getValue("fromDate"),
				toDate : form.getValue("toDate"),
				seqPartnerCoaches : coachList.join(","),
				orderType : form.getValue("orderType"),
				orderClassification : form.getValue("orderClassification"),
				paymentType : form.getValue("paymentType"),
				orderName : form.getValue("orderName"),
				memberName : form.getValue("memberName")
			};

			const data = componentOrderHistory.data;
			data.combineList = data.orderList = data.refundList = data.paymentList = undefined;
			data.search = this.data.search;
			reportController.sales.summaryInfo(searchData).then(summaryInfo => {
				data.orderSummary = summaryInfo || {};
				componentOrderHistory.setSummary();
			}).catch(error => {
				console.log(error);
				alert("세부 매출 내역 통계를 가져오는데 실패하였습니다.");
			});
			if(isRender)
				componentOrderHistory.open();
			else
				componentOrderHistory.update();
		},
		render : function(isUpdate) {
			if(!isUpdate) {
				this.container = document.querySelector("main [data-id='search']");
				const form = this.container.querySelector("form");
				uiForm.reset(form);
				const self = this;
				uiEvent(this.container, {
					click : {
						submit : function() {
							self.submit();
						}
					}
				});
			}
			const div = this.container.querySelector("[data-id='search-staff']");
			div.innerHTML = this.template();
			uiTable(div);
		},
		template : function() {
			const coachList = this.data.search.coachList;
			let tr = coachList.map(item => {
				const data = {};
				const array = ["payment", "new", "inuse", "refund"];
				array.forEach(name => {
					const info = item.count[name.toUpperCase()] || {};
					data[name] = `${getComma(info.sumAmount || 0)}원 / ${getComma(info.orderCount || 0)}건`;
				});
				const branchName = (item.branch) ? componentMember.getBranchName(item) : "본사";
				return `
					<tr>
						<th>
							<label class="ui-input-checkbox">
								<input type="checkbox" name="seqPartnerCoach" value="${item.seqPartnerCoach}">
								<span></span>
							</label>
						</th>
						<td class="branchDisplay">${branchName}</td>
						<td>${item.coachName || "-"}</td>
						<td>${data.payment}</td>
						<td>${data.new}</td>
						<td>${data.inuse}</td>
						<td>${data.refund}</td>
					</tr>
				`;
			});

			tr = (tr.length == 0) ? `<tr><td class="empty" colspan="7">검색 결과가 없습니다.</td></tr>` : tr.join("");
			return `
				<table class="ui-table dark checkbox">
					<colgroup><col><col width="10%"></colgroup>
					<thead>
						<tr>
							<th>
								<label class="ui-input-checkbox">
									<input type="checkbox" name="seqPartnerCoach" value="">
									<span></span>
								</label>
							</th>
							<td class="branchDisplay">지점명</td>
							<td>담당자</td><td>결제금액</td><td>신규</td><td>재등록</td><td>환불</td>
						</tr>
					</thead>
					<tbody>
						${tr}
					</tbody>
				</table>
			`;
		}
	}
};
</script>
</html>


</html>
