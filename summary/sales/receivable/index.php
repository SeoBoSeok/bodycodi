
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
	<script type="text/javascript" src="/static/js/component/componentMember.js"></script>
	<script type="text/javascript" src="/static/js/controller/reportController.js?v=20201111"></script>
	<script type="text/javascript" src="/static/js/controller/serviceController.js?v=20210413"></script>
	<script type="text/javascript" src="/static/js/common/jquery/jquery.dataTables.min.js"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/jquery/jquery.dataTables.css" />
	<link type="text/css" rel="stylesheet" href="/static/css/memberInfo.css" />
	<script type="text/javascript" src="/static/js/common/excel/exceljs.min.js"></script>
	<script type="text/javascript" src="/static/js/common/excel/FileSaver.min.js"></script>
	<style type="text/css"></style>
</head>
<body>
<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="회계관리">
	<div class="right">
		
			<a class="focus" href="/view/accounting/salesReport.jsp">이용권 매출조회</a>
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
				<li><label><a href="/summary/sales/receivable"><input name="mainTab" type="radio" value="receivable" checked><div>누적 미수내역 보고</div></a></label></li>
			</ul>
		</div>

		<!-- 누적 미수금 개요 -->
		<section>
			<h2 class="ui-title">누적 미수금 개요</h2>
			<div class="ui-state">
				<div>
					<dl>
						<dd><div><h2><var data-msg="sumReceivableAmount">0</var>원</h2><h4>누적 미수금 금액</h4></div></dd>
						<dd></dd>
						<dd></dd>
						<dd></dd>
					</dl>
				</div>
			</div>
		</section>

		<!-- 누적 미수금 내역 -->
		<section>
			<h2 class="ui-title">누적 미수금 내역</h2>
			<div class="ui-table-box scroll inside">
				<div class="orderList" data-id="orderList">
					<table class="ui-table dark even">
						<thead>
							<tr>
								<td class="branchDisplay">지점명</td>
								<td>판매번호</td><td>판매일시</td><td>판매회원</td><td>연락처</td><td>판매상태</td><td>판매상품</td>
								<td>이용권 상태</td><td>이용권 내역</td><td>정가</td><td>차감금액</td><td>판매가</td>
								<td>결제금액</td><td>미수금</td><td>판매담당</td><td>판매메모</td><td>기타</td>
							</tr>
						</thead>
						<tbody>
							<tr><td colspan="18">정보를 불러오는 중 입니다.</td></tr>
						</tbody>
					</table>
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
	open : function() {
		Promise.all([
			reportController.sales.receivableList(),
			commonController.branch.list(),
			commonController.coachList()
		]).then(([receivableInfo, branchList, coachList]) => {
			const orderList = (receivableInfo.orderList || []).sort(function(a, b) {
				const dateA = new Date(a.orderDate).getTime();
				const dateB = new Date(b.orderDate).getTime();
				const sequence = (a.seqOrderInfo == b.seqOrderInfo) ? 0 : (a.seqOrderInfo < b.seqOrderInfo) ? 1 : -1;
				return (dateA == dateB) ? sequence : (dateA < dateB) ? 1 : -1;
			});
			componentMember.setPassList(orderList);
			this.data = {
				sumReceivableAmount : receivableInfo.sumReceivables || 0,
				orderList : orderList || [],
				branchList : branchList || [],
				coachList : coachList || []
			};
			componentMember.data = this.data;
			this.render();
		}).catch(error => {
			uiError(error);
		});
	},
	render : function() {
		const container = this.container = document.querySelector("[data-id='orderList']");
		document.putValue("sumReceivableAmount", getComma(this.data.sumReceivableAmount));
		container.innerHTML = this.template();
		const self = this.event.self = this;
		uiEvent(container, {
			click : {
				receivable : function() {
					self.event.receivable(this);
				}
			}
		});
		uiTable(container);
	},
	event : {
		receivable : function(object) {
			const seqMember = Number(object.getAttribute("data-seq-member"));
			const seqOrderInfo = Number(object.getAttribute("data-seq-order"));
			const orderType = object.getAttribute("data-type");
			uiHistory.store();
			const url = `/member/${seqMember}/order/${seqOrderInfo}/receivable?orderType=${orderType}`;
			window.location.href = url;
		}
	},
	template : function() {
		const orderList = this.data.orderList;
		let tr = orderList.map(item => {
			const orderDate = componentMember.getDate(item.orderDate, true);
			const orderDateTime = componentMember.getDate(item.orderDatetime || item.orderCompletedDatetime);
			const orderState = componentMember.getOrderState(item);
			const coachName = componentMember.getCoachName(item.seqPartnerCoach);
			const getMemo = () => {
				const memo = item.memo;
				if(!memo) return "-";
				return `<a class="underline" title="${uiSafeValue(memo)}">보기</a>`;
			};
			const orderType = (item.orderType || "").toLowerCase();
			return `
			<tr>
				<td class="branchDisplay">${componentMember.getBranchName(item)}</td>							
				<td>${item.seqOrderInfo}</td>																	
				<td>${orderDate}</td>																			
				<td>${componentMember.getMemberInfo(item, "name")}</td>										
				<td>${componentMember.getMemberInfo(item, "mobile")}</td>										
				<td>${orderState}</td>																			
				<td class="name">${item.orderName}</td>														
				<td class="multiple">${componentMember.getPassList(item, "passState")}</td>					
				<td class="name multiple">${componentMember.getPassList(item, "name")}</td>					
				<td class="currency multiple">${componentMember.getPassList(item, "price")}</td>										
				<td class="currency multiple">${componentMember.getPassList(item, "sumDiscountAmount")}</td>	
				<td class="currency multiple">${componentMember.getPassList(item, "salePrice")}</td>			
				<td class="currency multiple green">${componentMember.getPassList(item, "paymentAmount")}</td>	
				<td class="currency multiple">${componentMember.getPassList(item, "receivables")}</td>			
				<td>${coachName}</td>																			
				<td>${getMemo()}</td>																			
				<td>																							
					<button class="ui-button medium green" type="button" data-seq-member="${item.seqMember}" data-seq-order="${item.seqOrderInfo}" data-type="" data-event="receivable">미수금 결제</button>
				</td>
			</tr>
		`;
		});
		const tableType = (tr.length == 0) ? "ui-table" : "ui-data-table";
		tr = (tr.length == 0) ? `<tr><td class="empty" colspan="17">결제 정보가 없습니다.</td></tr>` : tr.join("");
		return `
		<table class="${tableType} dark even" data-table-ordering="true" data-table-export="true" data-table-export-title="전체 미수금 내역" data-table-export-filename="전체 미수금 내역" data-table-length="20" data-table-dom="fltp">
			<thead>
				<tr>
					<td class="branchDisplay">지점명</td><td>판매번호</td><td>판매일시</td><td>판매회원</td><td>연락처</td><td>판매상태</td><td>판매상품</td>
					<td>이용권 상태</td><td>이용권 내역</td><td>정가</td><td>차감금액</td><td>판매가</td>
					<td>결제금액</td><td>미수금</td><td>판매담당</td><td>판매메모</td><td>기타</td>
				</tr>
			</thead>
			<tbody>${tr}</tbody>
		</table>
	`;
	}
};
</script>
</html>

</html>
