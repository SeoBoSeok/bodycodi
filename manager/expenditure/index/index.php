
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
	<link type="text/css" rel="stylesheet" href="/static/css/jquery/jquery.dataTables.css">
	<link type="text/css" rel="stylesheet" href="/static/css/uiList.css?v=20210120">
	<style type="text/css">
main > .middle .left li a							{background:white url("/static/img/icon/icon_next_black.png") no-repeat right 8px center / 8px}
main > .middle .left li button						{right:25px}
main > .middle .right								{background-color:#ccc}
main > .middle .right .orderPayment					{display:none; background-color:white}
main > .middle .right.focus .orderList				{display:none}
main > .middle .right.focus .orderPayment			{display:block}
.orderList tbody td:nth-child(9)					{background-color: rgba(55,183,114,0.1); color:#37b772}
.orderList tbody td:nth-child(10)					{background-color: rgba(255,87,34,0.1); color:#ff5722}
	</style>
</head>
<body>
<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="회계관리">
	<div class="right">
		
			<a href="/summary/sales">이용권 매출조회</a>
			<a href="/manager/accounting/sales/salesList/productPublic">일반 상품 매출조회</a>
		
		
			<a class="focus" href="/manager/expenditure/index">지출등록</a>
		
		
			<a href="/manager/accounting/expenditure">지출조회</a>
		
	</div>
</nav>

<!-- 콘텐츠 -->
<div class="contents">
	<main>
		<div class="top" data-id="search">
			<div class="left">
				<div class="keyword">
					<input name="keyword" type="text" placeholder="검색어 입력 (최소 2자 이상)" autocomplete="off" data-event="keyword">
					<a data-event="reset"></a>
				</div>
			</div>
			<div class="right"></div>
		</div>
		<div class="middle">
			<div class="left" data-id="expenditureList">
				<div class="top">
					지출 분류 목록
				</div>
				<div class="middle">
					<ul></ul>
				</div>
				<div class="bottom">
					<button data-event="create"><span></span>새로운 지출 분류 등록</button>
				</div>
			</div>
			<div class="right">
				<div class="orderList" data-id="orderList">
					<table class="ui-table dark even">
						<thead>
							<tr>
								<td class="branchDisplay">지점명</td><td>주문번호</td><td>지출일시</td><td>거래처</td><td>지출분류</td><td>지출명</td><td>규격</td>
								<td>수량</td><td>정가</td><td>지출금액</td><td>미수금액</td>
								<td>매입 후 재고량</td><td>결제 담당자</td><td>메모</td><td>기타</td>
							</tr>
						</thead>
						<tbody>
							<tr><td class="empty" colspan="14">데이터를 가져오는 중 입니다.</td></tr>
						</tbody>
					</table>
				</div>
				<div class="orderPayment" data-id="orderPayment"></div>
			</div>
		</div>
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
	open : function() {
		this.render();
	},
	render : function(isUpdate) {
		this.expenditureList.open(isUpdate);
		this.orderList.open();
	},
	expenditureList : {
		data : {
			defaultExpenditureList : [{
				SEQ_EXPENDITURE_FUNCTION : 0,
				EXPENDITURE_NAME : "매입지출"
			}, {
				SEQ_EXPENDITURE_FUNCTION : 2,
				EXPENDITURE_NAME : "일반지출"
			}],
			search : {
				keyword : ""
			}
		},
		open : function(isUpdate) {
			expenditureController.list().then(data => {
				this.data.expenditureList = (data) ? this.data.defaultExpenditureList.concat(data) : this.data.defaultExpenditureList;
				this.render(isUpdate);
			}).catch(error => {
				console.log(error);
				alert("데이터를 가져오는 중 오류가 발생하였습니다.");
			});
		},
		update : function() {
			this.render(true);
		},
		filter : function(data) {
			const keyword = this.data.search.keyword;
			if(!keyword) return data;
			return data.filter(item => {
				return (item.EXPENDITURE_NAME.indexOf(keyword) > -1);
			});
		},
		render : function(isUpdate) {
			this.container = document.querySelector("[data-id='expenditureList']");
			const self = this.event.self = this;

			const setSearch = () => {
				const div = document.querySelector("[data-id='search']");
				const input = div.querySelector("[name='keyword']");
				uiEvent(div, {
					click : {
						reset : function() {
							const input = this.parentNode.querySelector("input");
							input.value = "";
							input.parentNode.classList.remove("focus");
							self.data.search.keyword = "";
							self.update();
						}
					},
					input : {
						keyword : function() {
							const value = this.value.trim();
							if(value)
								input.parentNode.classList.add("focus");
							else
								input.parentNode.classList.remove("focus");
							self.data.search.keyword = (value.length < 2) ? "" : value;
							self.update();
						}
					}
				});
			};
			const setList = () => {
				const keyword = this.data.search.keyword;
				const ul = this.container.querySelector("ul");
				const li = this.filter(this.data.expenditureList).map(item => {
					const seqExpenditureFunction = item.SEQ_EXPENDITURE_FUNCTION;
					let expenditureName = item.EXPENDITURE_NAME || "";
					const button = (seqExpenditureFunction < 3) ? `` : `<button class="ui-button medium white" data-event="update">수정</button>`;
					if(keyword && expenditureName.indexOf(keyword) > -1)
						expenditureName = expenditureName.replaceAll(keyword, `<i class="red">${keyword}</i>`);
					return `
						<li data-sequence="${seqExpenditureFunction}">
							<a data-event="focus">
								${expenditureName}
							</a>
							${button}
						</li>
					`;
				});
				ul.innerHTML = li.join("");
				uiEvent(ul, {
					click : {
						focus : function() {self.event.changeFocus(this)},
						update : function() {self.event.updateExpenditure(this)},
					}
				});
				if(!isUpdate) {
					uiEvent(this.container, {
						click : {
							create : function() {self.event.createExpenditure()},
						}
					});
				}
			};
			if(!isUpdate)
				setSearch();
			setList();
		},
		event : {
			createExpenditure : function() {
				this.self.popup.open(this.self);
			},
			updateExpenditure : function(object) {
				const seqExpenditureFunction = Number(object.parentNode.getAttribute("data-sequence"));
				this.self.popup.open(this.self, seqExpenditureFunction);
			},
			changeFocus : function(object) {
				const container = this.self.container;
				const a = container.querySelectorAll("a");
				a.forEach(item => {
					if(item != object)
						item.className = "";
				});
				const isFocus = (object.classList.toggle("focus"));
				const seqExpenditureFunction = (isFocus) ? Number(object.parentNode.getAttribute("data-sequence")) : -1;
				this.changePayment(seqExpenditureFunction);
			},
			changePayment : function(seqExpenditureFunction) {
				const div = document.querySelector("[data-id='orderPayment']");
				if(seqExpenditureFunction < 0) {
					this.self.data.seqExpenditureFunction = undefined;
					div.parentNode.classList.remove("focus");
				} else {
					this.self.data.seqExpenditureFunction = seqExpenditureFunction;
					div.parentNode.classList.add("focus");
					componentPublicOrderPayment.open(div, 0, seqExpenditureFunction, () => {
						const container = this.self.container;
						const a = this.self.container.querySelector("a.focus");
						this.changeFocus(a);
						doPage.orderList.update();
					});
				}
			}

		},
		popup : {
			popup : undefined,
			mode : "create",
			data : {},
			open : function(context, seqExpenditureFunction) {
				if(this.popup) return;
				this.mode = (seqExpenditureFunction) ? "update" : "create";
				this.data = context.data;
				this.data.expenditureInfo = this.data.expenditureList.filter(item => {
					return (item.SEQ_EXPENDITURE_FUNCTION == seqExpenditureFunction);
				})[0];
				this.render();
			},
			close : function(isUpdate) {
				this.popup = undefined;
				uiPopup();
				if(isUpdate)
					doPage.expenditureList.open();
			},
			submit : function() {
				const expenditureName = this.popup.getValue("expenditureName").trim();
				if(!expenditureName) {
					alert("지출 분류명을 입력해 주세요.");
					return;
				}
				if(this.mode == "create") {
					expenditureController.create({
						expenditureName : expenditureName
					}).then(data => {
						alert("등록되었습니다.");
						this.close(true);
					}).catch(error => {
						console.log(error);
						alert("등록에 실패하였습니다.");
					});
				} else {
					expenditureController.update({
						editExpenditureName : expenditureName,
						seqExpenditure : this.data.expenditureInfo.SEQ_EXPENDITURE_FUNCTION
					}).then(data => {
						alert("수정되었습니다.");
						this.close(true);
					}).catch(error => {
						console.log(error);
						alert("수정에 실패하였습니다.");
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
							submit : function() {self.submit()}
						}
					}
				});
				if(this.mode == "update")
					this.popup.putValue("expenditureName", this.data.expenditureInfo.EXPENDITURE_NAME);
			},
			template : function() {
				const buttonName = (this.mode == "create") ? "등록" : "수정";
				const buttonColor = (this.mode == "create") ? "" : "green";
				return `
					<style type="text/css">
						.popupExpenditure				{max-width:420px}
						.popupExpenditure .middle input	{width:100% !important; max-width:100% !important}
					</style>
					<div class="popupExpenditure">
						<div class="top">
							<h2>
								지출 분류 ${buttonName}
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle ui-form">
							<table>
								<tr>
									<th>분류명</th>
									<td><input name="expenditureName" maxlength="32"></td>
								</tr>
							</table>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">취소</button>
							<button class="ui-button ${buttonColor}" data-event="submit">${buttonName}</button>
						</div>
					</div>
				`;
			}
		}
	},
	orderList : {
		container : undefined,
		open : function() {
			const today = getCalendar();
			accountingController.expenditure.search({fromDate : today, toDate : today}).then(data => {
				this.data = data.expenditureList || [];
				this.render();
			}).catch(error => {
				console.log(error);
				alert("데이터를 가져오는 중 오류가 발생하였습니다.");
			});
		},
		update : function() {
			this.open();
		},
		render : function() {
			this.container = document.querySelector("[data-id='orderList']");
			const self = this;
			const tbody = this.container.querySelector("tbody");
			tbody.innerHTML = this.template();
			uiEvent(tbody, {
				click : {
					remove : function() {
						if(!confirm("정말로 삭제하시겠습니까?")) return;
						const seqPartnerReceivables = Number(this.getAttribute("data-sequence"));
						accountingController.expenditure.product.public.remove({
							seqPartnerReceivables : seqPartnerReceivables
						}).then(data => {
							alert("삭제되었습니다.");
							self.update();
						}).catch(error => {
							console.log(error);
							alert("삭제에 실패하였습니다.");
						});
					}
				}
			});
		},
		template : function() {
			const tr = this.data.sort((a, b) => {
				a = new Date(a.REG_DT).getTime();
				b = new Date(b.REG_DT).getTime();
				return (a == b) ? 0 : (a < b) ? 1 : -1;
			}).map(item => {
				const paymentDate = uiDate(item.REG_DT, "time");
				const paymentAmount = (item.FIRST_PAYMENT_CARD || 0) + (item.BANK_TRANSFER || 0) + (item.CASH || 0);
				const getMemo = () => {
					const memo = uiSafeValue(item.COMMENT);
					return (memo) ? `<a>보기<div><span>${memo}</span></div></a>` : `-`;
				};
				const getStock = () => {
					if(item.PRESENT_STOCK === undefined) return "-";
					return getComma(item.PRESENT_STOCK);
				};
				return `
					<tr>
						<td class="branchDisplay">${item.BRANCH_NAME || "-"}</td>
						<td>${item.SEQ_PARTNER_PAYMENT}</td>
						<td>${paymentDate}</td>
						<td>${item.CUSTOMER_NAME || "-"}</td>
						<td>${item.EXPENDITURE_NAME || "-"}</td>
						<td>${item.PRODUCT_NAME || "-"}</td>
						<td>${item.PRODUCT_SIZE || "-"}</td>

						<td>${getComma(item.PRODUCT_COUNT || 0)}</td>
						<td class="amount">${getComma(item.TOTAL_AMOUNT || 0)}원</td>
						<td class="amount">${getComma(paymentAmount)}원</td>
						<td class="amount">${getComma(item.RECEIVABLES)}</td>

						<td>${getStock()}</td>
						<td>${item.COACH_NAME || "-"}</td>
						<td class="memo tip">${getMemo()}</td>
						<td><button class="ui-button small white" data-sequence="${item.SEQ_PARTNER_RECEIVABLES}" data-event="remove">삭제</button></td>
					</tr>
				`;
			});
			return (tr.length == 0) ? `<tr><td class="empty" colspan="14">금일 결제내역이 없습니다.</td></tr>` : tr.join("");
		}
	},
};
</script>
</html>
</html>
