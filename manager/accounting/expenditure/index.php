
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
	<script type="text/javascript" src="/static/js/controller/accountingController.js"></script>
	<script type="text/javascript" src="/static/js/controller/expenditureController.js"></script>
	<script type="text/javascript" src="/static/js/component/componentPublicOrderPayment.js?v=20210115"></script>
	<script type="text/javascript" src="/static/js/common/jquery/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="/static/js/common/excel/exceljs.min.js"></script>
	<script type="text/javascript" src="/static/js/common/excel/FileSaver.min.js"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/jquery/jquery.dataTables.css">
	<link type="text/css" rel="stylesheet" href="/static/css/uiList.css?v=20210120">
	<style type="text/css">
main									{padding:40px; height:auto}
main section + section 					{margin-top:40px}
main .list tbody td:nth-child(11)		{background-color: rgba(55,183,114,0.1); color:#37b772}
main .list tbody td:nth-child(12)		{background-color: rgba(255,87,34,0.1); color:#ff5722}
main .list tbody button:disabled		{opacity:0.33}
	</style>
</head>
<body>
<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="회계관리">
	<div class="right">
		
			<a href="/summary/sales">이용권 매출조회</a>
			<a href="/manager/accounting/sales/salesList/productPublic">일반 상품 매출조회</a>
		
		
			<a href="/manager/expenditure/index">지출등록</a>
		
		
			<a class="focus" href="/manager/accounting/expenditure">지출조회</a>
		
	</div>
</nav>

<!-- 콘텐츠 -->
<div class="contents">
	<main>
		<!-- 검색 -->
		<section data-id="search">
			<form name="search" method="post" autocomplete="off" onsubmit="return false">
				<div class="ui-search">
					<div class="date">
						<input name="fromDate" type="calendar" value="today">
						<span>부터</span>
						<input name="toDate" type="calendar" value="today">
						<span>까지</span>
						<div class="quick">
							<ul>
								<li><a>당해</a></li>
								<li><a>당월</a></li>
								<li><a>전월</a></li>
								<li><a>오늘</a></li>
								<li><a>어제</a></li>
								<li><a>1주</a></li>
								<li><a>2주</a></li>
							</ul>
						</div>
					</div>
					<div class="condition">
						<select class="ui-select" name="expenditure">
							<option value="">지출 분류 선택</option>
						</select>
						<select class="ui-select" name="employee">
							<option value="">담당자 선택</option>
						</select>
						<select class="ui-select" name="paymentType">
							<option value="">결제 수단 선택</option>
							<option value="">결제 수단 선택</option>
							<option value="card">카드</option>
							<option value="bankTransfer">이체</option>
							<option value="cash">현금</option>
						</select>
						<button class="ui-button blue" type="button" data-event="search">조회</button>
					</div>
				</div>
			</form>
		</section>

		<!-- 개요 -->
		<section data-id="summary">
			<div class="ui-state">
				<div>
					<dl>
						<dd class="blue"><div><h2><var data-msg="paymentTotal">0</var>원</h2><h4>총 지출금액</h4></div></dd>
						<dd class="red"><div><h2><var data-msg="receivableAmount">0</var>원 / <var data-msg="receivableCount"></var>건</h2><h4>미지급 잔액</h4></div></dd>
						<dd><div><h2><var data-msg="expenditureAmount">0</var>원</h2><h4>매입지출 합계</h4></div></dd>
						<dd><div><h2><var data-msg="etcAmount">0</var>원</h2><h4>기타지출 합계</h4></div></dd>
						<dd><div><h2><var data-msg="paymentCard">0</var>원</h2><h4>카드 합계</h4></div></dd>
						<dd><div><h2><var data-msg="paymentTransfer">0</var>원</h2><h4>이체 합계</h4></div></dd>
						<dd><div><h2><var data-msg="paymentCash">0</var>원</h2><h4>현금 합계</h4></div></dd>
					</dl>
				</div>
			</div>
		</section>

		<!-- 목록 -->
		<section class="list" data-id="list"></section>
	</main>
</div>
</body>
<script type="text/javascript">
function doReady() {
	const isPermission = ("true" == "true");
	if(!isPermission) {
		window.location.href = "/home";
		return;
	}
	doPage.open();
}

const doPage = {
	container : undefined,
	data : {},
	open : function() {
		accountingController.expenditure.form().then(data => {
			this.data = {
				coachList : data.coachList || [],
				functionList : data.functionList || []
			};
			this.render();
			this.update();
		}).catch(error => {
			console.log(error);
			alert("데이터를 처리 중 오류가 발생하였습니다.");
		});
	},
	update : function() {
		const form = document.querySelector("main [data-id='search']");
		const data = {
			fromDate : form.getValue("fromDate"),
			toDate : form.getValue("toDate"),
			expenditure : form.getValue("expenditure"),
			employee : form.getValue("employee"),
			paymentType : form.getValue("paymentType")
		};
		if(getPeriod(data.fromDate, data.toDate) < 0) {
			alert("종료 날짜를 시작 날짜 보다 크게 설정해 주세요.");
			return;
		}
		accountingController.expenditure.search(data).then(data => {
			this.data.expenditureList = data.expenditureList || [];
			this.data.searchInfo = data.searchInfo || {};
			this.data.summaryInfo = data.summaryInfo || {};
			this.render(true);
		}).catch(error => {
			console.log(error);
			alert("데이터를 처리 중 오류가 발생하였습니다.");
		});
	},
	render : function(isUpdate) {
		this.container = document.querySelector("main");
		const self = this.event.self = this;
		const setSearch = () => {
			const section = this.container.querySelector("[data-id='search']");
			const setCoachList = () => {
				const select = section.querySelector("[name='employee']");
				const option = this.data.coachList.map(item => {
					return `<option value="${item.SEQ_PAYMENT_EMPLOYEE}">${item.COACH_NAME}</option>`;
				});
				select.innerHTML = `
					<option value="">담당자 선택</option>
					<option value="">담당자 선택</option>
					${option.join("")}
				`;
			};
			const setFunctionList = () => {
				const select = section.querySelector("[name='expenditure']");
				const option = this.data.functionList.map(item => {
					return `<option value="${item.SEQ_EXPENDITURE_FUNCTION}">${item.EXPENDITURE_NAME}</option>`;
				});
				select.innerHTML = `
					<option value="">지출 분류 선택</option>
					<option value="">지출 분류 선택</option>
					${option.join("")}
				`;
			};
			const setButton = () => {
				const button = section.querySelector("[data-event='search']");
				button.onclick = () => {
					this.update();
				};
			};
			setCoachList();
			setFunctionList();
			setButton();
			uiSearch("오늘");

		};
		const setSummary = () => {
			const section = this.container.querySelector("[data-id='summary']");
			const paymentInfo = this.data.summaryInfo.paymentInfo;
			const productInfo = this.data.summaryInfo.productInfo;
			section.putValue("paymentTotal", getComma(paymentInfo.TOTAL || 0));
			section.putValue("receivableCount", getComma(productInfo.COUNT || 0));
			section.putValue("receivableAmount", getComma(productInfo.REMAIN_RECEIVABLES || 0));

			section.putValue("expenditureAmount", getComma(productInfo.EXPENDITURE || 0));
			section.putValue("etcAmount", getComma(productInfo.ETC || 0));

			section.putValue("paymentCard", getComma(paymentInfo.CARD || 0));
			section.putValue("paymentTransfer", getComma(paymentInfo.BANK_TRANSFER || 0));
			section.putValue("paymentCash", getComma(paymentInfo.CASH + paymentInfo.CASH_RECEIPTS || 0));
		};
		const setList = () => {
			const section = this.container.querySelector("[data-id='list']");
			section.innerHTML = this.template();
			uiTable(section);
			uiEvent(section, {
				click : {
					remove : function() {self.event.remove(this)},
					receivable : function() {self.event.receivable(this)}
				}
			});
		};
		if(isUpdate) {
			setSummary();
			setList();
		} else {
			setSearch();
		}
	},
	event : {
		remove : function(object) {
			if(!confirm("정말로 삭제하시겠습니까?")) return;
			const tr = object.parentNode.parentNode;
			const seqPartnerReceivables = Number(tr.getAttribute("data-seq-receivable"));
			accountingController.expenditure.product.public.remove({
				seqPartnerReceivables : seqPartnerReceivables
			}).then(data => {
				alert("삭제되었습니다.");
				this.self.update();
			}).catch(error => {
				console.log(error);
				alert("삭제에 실패하였습니다.");
			});
		},
		receivable : function(object) {
			const tr = object.parentNode.parentNode;
			const seqPartnerPayment = Number(tr.getAttribute("data-seq-payment"));
			const data = this.self.data.expenditureList.filter(item => {
				return (item.SEQ_PARTNER_PAYMENT == seqPartnerPayment);
			})[0];
			componentPublicOrderPayment.popup.receivable.open(data.SEQ_PARTNER_PAYMENT, () => {
				this.self.update();
			});
		}
	},
	template : function() {
		const tr = this.data.expenditureList.sort((a, b) => {
			a = new Date(a.REG_DT).getTime();
			b = new Date(b.REG_DT).getTime();
			return (a == b) ? 0 : (a < b) ? 1 : -1;
		}).map(item => {
			const paymentType = (item.FIRST_PAYMENT_CARD) ? "card" : (item.BANK_TRANSFER) ? "transfer" : (item.CASH) ? "cash" : "";
			const paymentDate = (item.PAYMENT_DT) ? uiDate(new Date(item.PAYMENT_DT).format("yyyy-mm-ddThh:MM:ss"), "time") : uiDate(item.REG_DT, "time");
			const getMemo = () => {
				const memo = uiSafeValue(item.COMMENT);
				return (memo) ? `<a>보기<div><span>${memo}</span></div></a>` : `-`;
			};
			const getPaymentKind = () => {
				return (item.FIRST_YN == "N") ? `<span class="red">미수금</span>` : `<span class="green">결제</span>`;
			};
			const getPaymentType = () => {
				const detailList = [];
				const receipt = item.PROOF_OF_EXPENDITURE_NAME;
				if(item.FIRST_PAYMENT_CARD) detailList.push("카드");
				if(item.BANK_TRANSFER) detailList.push("이체");
				if(item.CASH) detailList.push("현금");
				const length = detailList.length;
				if(length == 0) return "-";
				if(length == 1) return detailList[0];
				return `<span title="${detailList.join(", ")}">${detailList[0]} 외 ${(length - 1)}건</span>`;
			};
			const getPaymentAmount = (isSummary) => {
				const summaryList = [];
				const paymentAmount = (item.FIRST_PAYMENT_CARD || 0) + (item.BANK_TRANSFER || 0) + (item.CASH || 0);
				if(isSummary) {
					if(item.FIRST_PAYMENT_CARD) summaryList.push("카드 : " + getComma(item.FIRST_PAYMENT_CARD) + "원");
					if(item.BANK_TRANSFER) summaryList.push("이체 : " + getComma(item.BANK_TRANSFER) + "원");
					if(item.CASH) summaryList.push("현금 : " + getComma(item.CASH) + "원");
					return `<span title="${summaryList.join("\n")}">${getComma(paymentAmount)}원</span>`;
				} else {
					return paymentAmount;
				}
			};
			const getReceivable = () => {
				const isReceivable = (item.FIRST_YN == "N");
				const paymentAmount = getPaymentAmount() * -1;
				const receivableAmount = item.RECEIVABLES;
				const amount = (isReceivable) ? receivableAmount : receivableAmount;
				return (isReceivable) ?
					`${getComma(paymentAmount)}원<br>(잔액 : ${getComma(receivableAmount)}원)` :
					`${getComma(receivableAmount)}원`;
			};
			const getStock = () => {
				if(item.PRESENT_STOCK === undefined) return "-";
				return getComma(item.PRESENT_STOCK);
			};
			const getButton = () => {
				const disabled = (item.RECEIVABLES) ? "" : "disabled";
				return `
					<button class="ui-button small white" data-event="receivable" ${disabled}>미수금 결제</button>
					<button class="ui-button small white" data-event="remove">삭제</button>
				`;
			};
			const expenditureTypeColor = (item.SEQ_EXPENDITURE_FUNCTION) ? "" : "blue";

			return `
				<tr data-seq-payment="${item.SEQ_PARTNER_PAYMENT}" data-seq-receivable="${item.SEQ_PARTNER_RECEIVABLES}">
					<td class="branchDisplay">${item.BRANCH_NAME || "-"}</td>
					<td>${item.SEQ_PARTNER_PAYMENT}</td>
					<td>${paymentDate}</td>
					<td>${item.CUSTOMER_NAME || "-"}</td>
					<td class="${expenditureTypeColor}">${item.EXPENDITURE_NAME || "-"}</td>
					<td>${item.PRODUCT_NAME || "-"}</td>
					<td>${item.PRODUCT_SIZE || "-"}</td>

					<td>${getComma(item.PRODUCT_COUNT || 0)}</td>					
					<td class="amount">${getComma(item.TOTAL_AMOUNT || 0)}원</td>	
					<td>${getPaymentKind()}</td>									
					<td>${getPaymentType()}</td>									
					<td class="amount">${getPaymentAmount(true)}</td>				
					<td class="amount">${getReceivable()}</td>						

					<td>${getStock()}</td>
					<td>${item.COACH_NAME || "-"}</td>
					<td class="memo tip">${getMemo()}</td>
					<td>${getButton()}</td>
				</tr>
			`;
		});
		const searchInfo = this.data.searchInfo;
		const exportFileName = `지출조회_${searchInfo.fromDate}부터_${searchInfo.toDate}까지`;
		return `
			<table class="ui-data-table dark even" data-table-length="10" data-table-dom="fltp" data-table-export="true" data-table-ordering="true" data-table-export-title="지출조회" data-table-export-filename="${exportFileName}">
				<thead>
					<td class="branchDisplay">지점명</td>
					<td>주문번호</td><td>지출일시</td><td>거래처</td><td>지출분류</td><td>지출명</td><td>규격</td>
					<td>수량</td><td>정가</td><td>결제분류</td><td>결제수단</td><td>지출금액</td><td>미수금액</td>
					<td>매입 후 재고량</td><td>결제 담당자</td><td>메모</td><td>기타</td>
				</thead>
				<tbody>${tr.join("")}</tbody>
			</table>
		`;
	}
};

</script>
</html>
</html>
