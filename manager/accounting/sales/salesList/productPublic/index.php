
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
	<script type="text/javascript" src="/static/js/controller/partnerController.js"></script>
	<script type="text/javascript" src="/static/js/controller/accountingController.js"></script>
	<script type="text/javascript" src="/static/js/popup/popupPublicOrderPayment.js?v=20210115"></script>
	<script type="text/javascript" src="/static/js/common/jquery/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="/static/js/common/excel/exceljs.min.js"></script>
	<script type="text/javascript" src="/static/js/common/excel/FileSaver.min.js"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/jquery/jquery.dataTables.css">
	<link type="text/css" rel="stylesheet" href="/static/css/uiList.css?v=20210120">

	<style type="text/css">
main									{padding:40px; height:auto}
main section:first-child + section 		{margin-top:40px}
main .ui-search select.wide				{width:200px; max-width:200px}
main .summary dd						{padding:0 10px; vertical-align:top}
main .summary div + div					{margin:25px -10px 0 -10px}
main .summary tfoot						{border-top:4px double #ccc}
main .list tbody tr.remove				{background-color:rgba(255,87,34,0.15)}
main .list tbody button:disabled		{opacity:0.33}
	</style>
</head>
<body>
<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="회계관리">
	<div class="right">
		
			<a href="/summary/sales">이용권 매출조회</a>
			<a class="focus" href="/manager/accounting/sales/salesList/productPublic">일반 상품 매출조회</a>
		
		
			<a href="/manager/expenditure/index">지출등록</a>
		
		
			<a href="/manager/accounting/expenditure">지출조회</a>
		
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
						<select class="ui-select wide" name="seqPartnerProductPublic">
							<option value="">상품명 선택</option>
							<option value="">상품명 선택</option>
						</select>
						<select class="ui-select" name="orderType">
							<option value="">결제 분류 선택</option>
							<option value="">결제 분류 선택</option>
							<option value="card">결제</option>
							<option value="refundCard">카드취소</option>
							<option value="refundCashBank">이체/현금 환불</option>
						</select>
						<select class="ui-select" name="seqPartnerCoach">
							<option value="">담당자 선택</option>
							<option value="">담당자 선택</option>
						</select>
						<select class="ui-select" name="paymentType">
							<option value="">결제 수단 선택</option>
							<option value="">결제 수단 선택</option>
							<option value="firstPaymentCard">카드</option>
							<option value="bankTransfer">이체</option>
							<option value="cash">현금</option>
						</select>
						<button class="ui-button blue" type="button" data-event="search">조회</button>
					</div>
				</div>
			</form>
		</section>

		<!-- 개요 -->
		<section class="summary" data-id="summary">
			<h2 class="ui-title">일반 상품 매출내역 요약</h2>
			<div class="ui-state">
				<div>
					<dl>
						<dd class="blue"><div><h2><var data-msg="sumSalesAmount">0</var>원</h2><h4>판매금액</h4></div></dd>
						<dd><div><h2><var data-msg="sumPaymentAmount">0</var>원</h2><h4>결제금액</h4></div></dd>
						<dd><div><h2><var data-msg="sumRefundAmount">0</var>원</h2><h4>환불금액</h4></div></dd>
						<dd class="red"><div><h2><var data-msg="sumReceivableAmount">0</var>원</h2><h4>미수금액</h4></div></dd>
					</dl>
				</div>
			</div>
			<div data-id="detail"></div>
		</section>

		<!-- 목록 -->
		<section class="list">
			<h2 class="ui-title">일반 상품 매출내역 목록</h2>
			<div data-id="list">
				<table class="ui-data-table dark even" data-table-ordering="true" data-table-export="true" data-table-export-title="일반 상품 판매내역" data-table-export-filename="일반 상품 판매내역">
					<thead>
						<tr>
							<td class="branchDisplay">지점명</td>
							<td>결제번호</td>
							<td>결제일시</td><td>회원정보</td><td>판매상품</td>
							<td>결제분류</td>
							<td>단가</td><td>수량</td><td>정가</td>
							<td>할인금액</td><td>결제금액</td><td>미수금액</td>
							<td>판매 후 재고량</td>
							<td>결제 담당자</td><td>메모</td><td>기타</td>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</section>
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
		const self = this.event.self = this;
		accountingController.product.public.search().then(data => {
			this.data = {
				searchInfo : data.searchInfo || {},
				orderList : data.orderList || [],
				productList : data.productList || [],
				coachList : data.coachList || [],
			};
			this.event.setSummaryInfo();
			this.render();
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	update : function() {
		const section = this.container.querySelector("[data-id='search']");
		const data = {
			seqPartnerProductPublic : section.getValue("seqPartnerProductPublic"),
			seqPartnerCoach : section.getValue("seqPartnerCoach"),
			paymentType : section.getValue("paymentType"),
			orderType : section.getValue("orderType"),
			fromDate : section.getValue("fromDate"),
			toDate : section.getValue("toDate")
		};
		if(getPeriod(data.fromDate, data.toDate) < 0) {
			alert("종료 날짜를 시작 날짜 보다 크게 설정해 주세요.");
			return;
		}
		accountingController.product.public.search(data).then(data => {
			this.data.orderList = data.orderList || [];
			this.event.setSummaryInfo();
			this.render(true);
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	render : function(isUpdate) {
		const container = this.container = document.querySelector("main");
		const setSearch = () => {
			const section = container.querySelector("[data-id='search']");
			const setProductList = () => {
				const select = section.querySelector("[name='seqPartnerProductPublic']");
				const option = this.data.productList.map(item => {
					return `<option value="${item.seq_partner_product_public}">${item.product_name}</option>`;
				});
				select.innerHTML += option.join("");
			};
			const setCoachList = () => {
				const select = section.querySelector("[name='seqPartnerCoach']");
				const option = this.data.coachList.map(item => {
					return `<option value="${item.seq_partner_coach}">${item.coach_name}</option>`;
				});
				select.innerHTML += option.join("");
			};
			const setButton = () => {
				const button = section.querySelector("[data-event='search']");
				button.onclick = () => {
					this.update();
				};
			};
			setProductList();
			setCoachList();
			setButton();
			uiSearch("오늘");
		};
		const setSummary = () => {
			const section = container.querySelector("[data-id='summary']");

			const data = this.data.summaryInfo;
			section.putValue("sumSalesAmount", getComma(data.sumSalesAmount));
			section.putValue("sumPaymentAmount", getComma(data.sumPaymentAmount));
			section.putValue("sumRefundAmount", getComma(data.sumRefundAmount));
			section.putValue("sumReceivableAmount", getComma(data.sumReceivableAmount));
			return;

			const paymentInfo = this.data.summaryInfo.payment;
			const refundInfo = this.data.summaryInfo.refund;
			const div = container.querySelector("[data-id='detail']");
			div.innerHTML = `
				<dl>
					<dd>
						<table class="ui-table dark sum">
							<thead>
								<tr><td>분류</td><td>건수</td><td>금액</td></tr>
							</thead>
							<tbody>
								<tr><td>카드</td><td>${getComma(paymentInfo.card.count)}건</td><td>${getComma(paymentInfo.card.amount)}원</td></tr>
								<tr><td>이체</td><td>${getComma(paymentInfo.transfer.count)}건</td><td>${getComma(paymentInfo.transfer.amount)}원</td></tr>
								<tr><td>현금</td><td>${getComma(paymentInfo.cash.count)}건</td><td>${getComma(paymentInfo.cash.amount)}원</td></tr>
							</tbody>
							<tfoot>
								<tr><td>결제 합계</td><td>${getComma(paymentInfo.sumCount)}건</td><td>${getComma(paymentInfo.sumAmount)}원</td></tr>
							</tfoot>
						</table>
					</dd>
					<dd>
						<table class="ui-table dark sum">
							<thead>
								<tr><td>분류</td><td>건수</td><td>금액</td></tr>
							</thead>
							<tbody>
								<tr><td>카드 취소</td><td>${getComma(refundInfo.card.count)}건</td><td>${getComma(refundInfo.card.amount)}원</td></tr>
								<tr><td>이체 환불</td><td>${getComma(refundInfo.transfer.count)}건</td><td>${getComma(refundInfo.transfer.amount)}원</td></tr>
								<tr><td>현금 환불</td><td>${getComma(refundInfo.cash.count)}건</td><td>${getComma(refundInfo.cash.amount)}원</td></tr>
							</tbody>
							<tfoot>
								<tr><td>환불 합계</td><td>${getComma(refundInfo.sumCount)}건</td><td>${getComma(refundInfo.sumAmount)}원</td></tr>
							</tfoot>
						</table>
					</dd>
				</dl>
			`;
		};
		const setList = () => {
			const section = container.querySelector("[data-id='list']");
			const tr = this.data.orderList.map(item => {
				const isRemove = (item.DELETE_YN == "Y");
				const isRefund = (item.PAYMENT_GUBUN == "REFUND");
				const paymentDate = uiDate(item.PAYMENT_DT, "time");
				const memberName = item.NAME || "-";
				const memberMobile = item.MOBILE || "-";
				const seqPartnerPayment = item.SEQ_PARTNER_PAYMENT;
				const productName = item.PRODUCT_NAME;
				const unitPrice = getComma(item.PRODUCT_COST);
				const unitCount = getComma(Math.abs(item.PRODUCT_COUNT));
				const price = getComma(Math.abs(item.PRODUCT_COST * item.PRODUCT_COUNT));
				const orderType = (isRemove) ? "삭제" : (isRefund) ? "환불" : "결제";
				const orderTypeColor = (isRefund || isRemove) ? "red" : "green";
				const discountAmount = getComma(item.DISCOUNT_AMOUNT);
				const paymentAmount = getComma(item.PAY_PRICE * ((isRefund) ? -1 : 1));
				const receivableAmount = (isRefund) ? 0 : getComma(item.RECEIVABLES);
				const remainCount = getComma(Math.abs(item.PRESENT_STOCK));
				const coachName = item.COACH_NAME;
				const getDetailInfo = (itemList, nameList) => {
					const detailList = [];
					itemList.forEach((name, index) => {
						const amount = item[name];
						const title = nameList[index];
						if(amount)
							detailList.push(`${title} : ${getComma(amount)}원`);
					});
					return detailList.join("\n");
				};
				const getPaymentAmount = () => {
					return getDetailInfo(["FIRST_PAYMENT_CARD", "BANK_TRANSFER", "CASH"], ["카드", "이체", "현금"]);
				};
				const getDiscountAmount = () => {
					return getDetailInfo(["CUSTOM_DISCOUNT", "USING_POINTS"], ["할인", "마일리지"]);
				};
				const getMemo = () => {
					const memo = uiSafeValue(item.COMMENT);
					return (memo) ? `<a>보기<div><span>${memo}</span></div></a>` : ``;
				};
				const getButton = () => {
					const isDisabled = (isRefund || isRemove) ? "disabled" : "";
					return `
						<button class="ui-button small white" data-event="update" ${isDisabled}>수정</button>
						<button class="ui-button small white" data-event="refund" ${isDisabled}>환불</button>
					`;
				};
				const paymentAmountColor = (isRefund) ? "red" : "green";
				const className = (isRemove) ? "remove" : "";

				return `
					<tr class="${className}" data-sequence="${item.SEQ_PARTNER_PAYMENT}">
						<td class="branchDisplay">${item.BRANCH_NAME || "-"}</td>
						<td>${seqPartnerPayment}</td>							
						<td>${paymentDate}</td>								
						<td>													
							<a class="underline" href="/member/${item.SEQ_MEMBER}/home">
								${memberName}
							</a>
						</td>
						<td>${memberMobile}</td>								
						<td>${productName}</td>								
						<td class="${orderTypeColor}">${orderType}</td>		
						<td>${unitPrice}원</td>								
						<td>${unitCount}개</td>								
						<td class="currency">${price}원</td>					
						<td class="currency"><a title="${getDiscountAmount()}">${discountAmount}원</a></td>			
						<td class="currency ${paymentAmountColor}"><a title="${getPaymentAmount()}">${paymentAmount}원</a></td>		
						<td class="currency red">${receivableAmount}원</td>	
						<td>${remainCount}개</td>								
						<td>${coachName}</td>									
						<td class="memo tip">${getMemo()}</td>					
						<td>${getButton()}</td>								
					</tr>
				`;
			});
			section.innerHTML = `
				<table class="ui-data-table dark even sum" data-table-ordering="true" data-table-export="true" data-table-export-title="일반 상품 판매내역" data-table-export-filename="일반 상품 판매내역">
					<thead>
						<tr>
							<td class="branchDisplay">지점명</td><td>결제번호</td><td>결제일시</td><td>회원명</td><td>연락처</td><td>판매상품</td>
							<td>결제분류</td>
							<td>단가</td><td>수량</td><td>정가</td>
							<td>할인금액</td><td>결제금액</td><td>미수금액</td>
							<td>판매 후 재고량</td>
							<td>결제 담당자</td><td>메모</td><td>기타</td>
						</tr>
					</thead>
					<tbody>
						${tr.join("")}
					</tbody>
				</table>
			`;
			const self = this;
			uiEvent(section, {
				click : {
					refund : function() {self.event.refund(this)},
					update : function() {self.event.update(this)}
				}
			});
			uiTable(section);
		};

		if(!isUpdate) setSearch();
		setSummary();
		setList();
	},
	event : {
		refund : function(object) {
			const seqPartnerPayment = Number(object.parentNode.parentNode.getAttribute("data-sequence"));
			const orderInfo = this.getOrderInfo(seqPartnerPayment);
			const seqMember = orderInfo.SEQ_MEMBER;
			const seqPartnerProductPublic = orderInfo.SEQ_PARTNER_PRODUCT_PUBLIC;
			popupPublicOrderRefund.open(seqMember, seqPartnerProductPublic, seqPartnerPayment, () => {
				this.self.update();
			});
		},
		update : function(object) {
			const seqPartnerPayment = Number(object.parentNode.parentNode.getAttribute("data-sequence"));
			const orderInfo = this.getOrderInfo(seqPartnerPayment);
			const seqMember = orderInfo.SEQ_MEMBER;
			const seqPartnerProductPublic = orderInfo.SEQ_PARTNER_PRODUCT_PUBLIC;
			popupPublicOrderPayment.open(seqMember, seqPartnerProductPublic, seqPartnerPayment, () => {
				this.self.update();
			});
		},
		getOrderInfo : function(seqPartnerPayment) {
			return this.self.data.orderList.filter(item => {
				return (item.SEQ_PARTNER_PAYMENT == seqPartnerPayment);
			})[0];
		},
		setSummaryInfo : function() {
			const orderList = this.self.data.orderList.map(item => {
				const paymentDate = new Date(item.PAYMENT_DT);
				const registerDate = new Date(item.REG_DT);
				paymentDate.setHours(registerDate.getHours());
				paymentDate.setMinutes(registerDate.getMinutes());
				item.PAYMENT_DT = paymentDate.format("yyyy-mm-ddThh:MM:ss");
				return item;
			});
			orderList.sort((a, b) => {
				a = new Date(a.PAYMENT_DT).getTime();
				b = new Date(b.PAYMENT_DT).getTime();
				return (a == b) ? 0 : (a < b) ? 1 : -1;
			});

			const summaryInfo = {
				sumPaymentAmount : 0,
				sumReceivableAmount : 0,
				sumRefundAmount : 0,
				sumSalesAmount : 0,
				payment : {
					sumAmount : 0, sumCount : 0,
					card : {amount : 0, count : 0},
					transfer : {amount : 0, count : 0},
					cash : {amount : 0, count : 0}
				},
				refund : {
					sumAmount : 0, sumCount : 0,
					card : {amount : 0, count : 0},
					transfer : {amount : 0, count : 0},
					cash : {amount : 0, count : 0}
				}
			};
			orderList.forEach(item => {
				if(item.DELETE_YN != "Y") {
					const isRefund = (item.PAYMENT_GUBUN == "REFUND");
					const paymentTypeList = ["FIRST_PAYMENT_CARD", "BANK_TRANSFER", "CASH"];
					const paymentNameList = ["card", "transfer", "cash"];
					const orderType = (isRefund) ? "refund" : "payment";
					if(item.TOTAL_RECEIVABLES) summaryInfo.sumReceivableAmount += item.TOTAL_RECEIVABLES;
					paymentTypeList.forEach((name, index) => {
						const paymentAmount = item[name];
						const paymentType = paymentNameList[index];
						if(paymentAmount) {
							summaryInfo[orderType][paymentType].count++;
							summaryInfo[orderType][paymentType].amount += paymentAmount;
							summaryInfo[orderType].sumAmount += paymentAmount;
							summaryInfo[orderType].sumCount++;
						}
					});
				}
			});

			summaryInfo.sumPaymentAmount = summaryInfo.payment.sumAmount;
			summaryInfo.sumRefundAmount = summaryInfo.refund.sumAmount;
			summaryInfo.sumSalesAmount = summaryInfo.sumPaymentAmount - summaryInfo.sumRefundAmount;

			this.self.data.orderList = orderList;
			this.self.data.summaryInfo = summaryInfo
		}
	}
};
</script>
</html>
</html>
