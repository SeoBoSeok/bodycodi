
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
				remainDate	: Number("552"),
				expireDate	: "2023-09-29 00:00:00"
			},
			state : {
				sms 		: "749"
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
	<script type="text/javascript" src="/static/js/ui/uiProfile.js?v=20210719"></script>
	<script type="text/javascript" src="/static/js/controller/serviceController.js"></script>
	<script type="text/javascript" src="/static/js/component/componentMember.js"></script>
	<script type="text/javascript" src="/static/js/component/componentOrder.js"></script>
	<style type="text/css">

main .ui-path									{margin-bottom:25px}
main .ui-title									{margin-bottom:15px}
.ui-list-box > div > dl > dd > div				{height:410px}

main .ui-title + .ui-note						{margin:15px 0}

main .filter									{position:relative; margin:0 0 15px 0; padding:10px 15px; height:35px; background-color:#f0f0f0; line-height:35px}
main .filter > div								{display:inline-block; vertical-align:top}
main .filter ul									{white-space:nowrap}
main .filter li									{display:inline-block; transition:visibility 0.4s, opacity 0.4s}
main .filter li + li							{margin-left:15px}
main .filter li + li 							{position:relative; padding-left:18px}
main .filter li + li:before						{content:""; position:absolute; left:0; top:50%; margin-top:-9px; height:18px; border-left:1px solid #ccc}
main .filter li .group							{margin-left:20px; padding:8px 10px; background-color:#f0f0f0}
main .filter li label + label					{margin-left:15px !important}

main .filter .left								{float:left}
main .filter .right								{position:absolute; right:15px; transition:visibility 0.4s, opacity 0.4s}
main .filter .right button						{width:135px}
main .filter .right div							{position:relative}
main .filter .right div a						{display:none; position:absolute; right:0; top:0; width:30px; height:35px; background:url(/static/img/icon/icon_close_black.png) no-repeat center center / 10px; opacity:0.33}
main .filter .right div a:hover					{opacity:1}
main .filter .right div input					{width:200px; max-width:200px; text-align:center; box-sizing:border-box}
main .filter .right div.focus a					{display:block}
main .filter .right div.focus input				{padding-right:35px}



section .bottom									{margin-top:35px; text-align:center; font-size:0}
section .bottom button							{margin:0 5px; width:150px}
.ui-side + main									{min-height:100%}
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

	
		
		
		
			<main>
				<!-- 상단 경로 탭 -->
				<div class="ui-path">
					<div class="left">
						<ul>
							<li><a href="/member/1484302/orderInfo">판매내역</a></li>
							<li class="focus"><a href="/member/1484302/sell/pass">판매</a></li>
						</ul>
					</div>
				</div>

				<!-- 이용권 판매 -->
				<section class="ui-list-box" data-id="selectList">
					<h2 class="ui-title">이용권 판매</h2>
					
					<div class="filter" data-id="filter">
						<div class="left">
							<ul>
								<li>
									<label class="ui-input-radio"><input name="filter" type="radio" data-event="filter" value="" checked><span></span>전체</label>
								</li>
								<li>
									<label class="ui-input-radio"><input name="filter" type="radio" data-category="serviceCategory" data-event="filter" value="PACKAGE"><span></span>패키지</label>
									<label class="ui-input-radio"><input name="filter" type="radio" data-category="serviceType" data-event="filter" value="APPOINTMENT"><span></span>개인레슨</label>
									<label class="ui-input-radio"><input name="filter" type="radio" data-category="serviceType" data-event="filter" value="CLASS"><span></span>그룹수업</label>
									<label class="ui-input-radio"><input name="filter" type="radio" data-category="serviceType" data-event="filter" value="PLACE"><span></span>시설이용</label>
									<label class="ui-input-radio"><input name="filter" type="radio" data-category="serviceType" data-event="filter" value="OPTION"><span></span>옵션</label>
								</li>
								<li>
									<label class="ui-input-checkbox">
										<input name="emptyYn" type="checkbox" data-event="filter" checked>
										<span></span>
										이용권 상품이 없는 이용권 종류 제외
									</label>
								</li>
							</ul>
						</div>
						<div class="right">
							<div>
								<input name="searchWord" type="text" placeholder="검색어 입력 (최소 2자 이상)" autocomplete="off" data-event="word">
								<a data-event="reset"></a>
							</div>
						</div>
					</div>
					<div class="top">
						<dl>
							<dd>
								<h4 class="ui-sub-title">이용권 종류 선택</h4>
								<div class="step1 ui-list next">
									<ul data-id="serviceList"></ul>
								</div>
							</dd>
							<dd>
								<h4 class="ui-sub-title">이용권 상품 선택</h4>
								<div class="step2 ui-list">
									<ul data-id="pricingList"></ul>
								</div>
							</dd>
						</dl>
					</div>
					<div class="bottom">
						<button class="ui-button gray" data-event="submit">선택</button>
					</div>
				</section>
			</main>
		
	
</div>
</body>
<script type="text/javascript">
const seqOrderInfo = Number("2013672");		// 주문 번호
let urlParams = new URLSearchParams(location.search); 
const seqMember = urlParams.get('id');			// 회원 번호
const orderType = "";					// 판매 방식
const crossType = "";					// 교체 방식
const serviceCategory = "";		// 서비스 구분
const seqPassInfo = "";				// 이전 이용권 번호

function doReady() {
	componentOrder.beforeOrderInfo.open(null, (beforeOrderInfo) => {
		componentOrderPass.open(beforeOrderInfo);
	});
}

const componentOrderPass = {
	container : undefined,
	data : {
		orderType : "",
		crossType : "",
		serviceCategory : "",
		seqService : 0,
		seqPricing : 0,
		beforePrice : 0,
		serviceList : [],
		pricingList : [],
		filter : {
			serviceType : [],
			serviceKind : [],
			searchWord : "",
			emptyYn : "Y"
		}
	},
	open : function(beforeOrderInfo) {
		this.data.orderType = orderType;
		this.data.crossType = crossType;
		this.data.beforeOrderInfo = beforeOrderInfo;

		// 이전 이용권 정보가 있을 경우
		if(beforeOrderInfo) {
			const passInfo = (beforeOrderInfo.passes && beforeOrderInfo.passes[0]) ? beforeOrderInfo.passes[0] : {};
			const serviceCategory = (passInfo.seqPackage) ? "PACKAGE" : "NORMAL";
			const seqService = (serviceCategory == "PACKAGE") ? passInfo.seqPackage : passInfo.seqService;
			const seqPricing = 0;
			if(orderType == "upgrade") {
				this.data.serviceCategory = serviceCategory;
				this.data.seqService = seqService;
			}
			this.data.seqPricing = seqPricing;
			this.data.beforeSeqPricing = passInfo.seqPricing || 0;
			this.data.beforePrice = beforeOrderInfo.amount;
			this.data.beforeSeqPricing = passInfo.seqPricing || 0;

			// 미수금이 있는 경우 미수금 결제 팝업을 연다.
			let receivables = 0;
			(beforeOrderInfo.passes || []).map(item => {
				receivables += item.receivables;
			});
			if((orderType == "upgrade" || orderType == "cross") && receivables) {
				this.checkReceivablePopup.open({
					seqOrderInfo : (beforeOrderInfo.pricing) ? beforeOrderInfo.pricing.seqOrderInfo : beforeOrderInfo.passes[0].seqOrderInfo,
					receivables : receivables,
					orderType : orderType
				});
			}
		}

		Promise.all([
			serviceController.normal.list(),			// 단일 서비스 목록
			serviceController.package.list(),			// 패키지 서비스 목록
			pricingController.list(),					// 가격정책 목록
			commonController.branch.type.list()			// 브랜치 타입 목록
		]).then(([serviceList, packageServiceList, pricingList, branchTypeList]) => {
			if(!serviceList) serviceList = [];
			if(!packageServiceList) packageServiceList = [];
			if(!pricingList) pricingList = [];
			if(!branchTypeList) branchTypeList = [];

			// 단일 서비스와 패키지 서비스를 하나의 서비스 목록으로 합친다.
			this.data.serviceList = this.filter(packageServiceList.map(item => {
				item.serviceCategory = item.serviceType = "PACKAGE";
				return item;
			}).concat(serviceList.map(item => {
				item.serviceCategory = "NORMAL";
				return item;
			})).filter(item => {
				// 판매 중인 서비스만 표시한다.
				return (item.saleYn == "Y");
			}));

			// 가격정책 목록을 만든다.
			this.data.pricingList = this.filter(pricingList.map(item => {
				const serviceCategory = item.serviceCategory;
				const seqService = item.seqService;
				const serviceInfo = this.data.serviceList.filter(item => {
					return (item.serviceCategory == serviceCategory && (item.seqService == seqService || item.seqPackage == seqService));
				})[0];
				if(serviceInfo) item.serviceInfo = serviceInfo;
				return item;
			}).filter(item => {
				// 판매 중인 가격정책만 표시하며, 삭제된 서비스의 가격정책은 제외 시킨다.
				return (item.saleYn == "Y" && item.serviceInfo);
			}));

			this.data.serviceList.forEach(serviceInfo => {
				const pricingList = this.data.pricingList.filter(item => {
					return (item.serviceCategory == serviceInfo.serviceCategory &&
						(item.seqService == serviceInfo.seqService || item.seqService == serviceInfo.seqPackage));
				});
				serviceInfo.pricingList = pricingList || [];
			});

			const branchTypeInfo = {};
			branchTypeList.forEach(item => {
				branchTypeInfo[item.seqPartnerBranchType] = item.name;
			});
			this.data.branchTypeInfo = branchTypeInfo;
			this.render();
		}).catch(error => {
			uiError(error);
		});
	},
	filter : function(data) {
		const orderList = {
			PACKAGE : [],
			APPOINTMENT :[],
			CLASS : [],
			PLACE : [],
			OPTION : []
		};
		data.forEach(item => {
			const serviceType = item.serviceType || (item.serviceInfo && item.serviceInfo.serviceType);
			if(serviceType)
				orderList[serviceType].push(item);
		});
		let orderData = [];
		for(const item in orderList)
			orderData = orderData.concat(orderList[item]);
		return orderData;
	},
	render : function() {
		this.container = document.querySelector("[data-id='selectList']");
		const self = this.event.self = this;
		const setFilter = () => {
			const main = document.querySelector("main");

			const updateFilter = () => {
				const getCheckList = (name) => {
					const nodeList = this.container.querySelectorAll("[name='filter'][data-category='" + name + "']:checked");
					return Array.from(nodeList).map(item => {
						return item.value;
					});
				};
				const searchWord = this.container.getValue("searchWord").trim();
				const serviceTypeList = getCheckList("serviceType");
				this.data.filter = {
//					serviceCategory : getCheckList("serviceCategory")[0] || "",
					serviceCategory : (serviceTypeList.length) ? "NORMAL" : getCheckList("serviceCategory")[0] || "",
					serviceType : serviceTypeList,
					serviceKind : getCheckList("serviceKind"),
					emptyYn : this.container.getValue("emptyYn"),
					searchWord : (searchWord.length > 1) ? searchWord : "",
				};
				this.serviceList.update();
				this.pricingList.update();
			};

			const setCheckBox = () => {
				const container = this.container.querySelector("[data-id='filter']");
				if(!container) return;
				const nodeList = container.querySelectorAll("[data-event='filter']");
				const j = nodeList.length - 1;
				nodeList.forEach((item, index) => {
					const setCheck = function(start, end, value) {
						for(let i = start; i < end; i++)
							nodeList[i].checked = value;
					};
					if(item.name == "filter") {
						item.addEventListener("change", function() {
							/*
							// 서비스 타입에 맞게 변경
							if(0 < index && index < 5) {
								nodeList[5].checked = true;
								nodeList[6].checked = false;
							}
							// '패키지 서비스'가 체크된 경우 단일 서비스 관련 체크 취소
							if(nodeList[6].checked) {
								setCheck(1, 6, false);
							}
							// '전체'가 체크된 경우 나머지 체크 전부 취소
							if(index == 0 && item.checked) {
								setCheck(1, j, false);
							} else {
								let count = 0;
								for(let i = 1; i < j; i++)
									if(nodeList[i].checked) count++;
								if(index > 0 && item.checked)
									nodeList[0].checked = false;
								if(count == 0 || count == j - 1) {
									nodeList[0].checked = true;
									setCheck(1, j, false);
								}
							}
							*/
							updateFilter();
						});
					} else if(item.name == "emptyYn") {
						item.addEventListener("change", () => {
							updateFilter();
							self.data.seqService = self.data.seqPricing = 0;
							this.event.update();
						});
					}
				});
			};

			const setSearchWord = () => {
				const input = main.querySelector("[name='searchWord']");
				if(!input) return;

				const span = input.parentNode;
				const a = span.querySelector("a");
				const refresh = () => {
					this.serviceList.update();
					this.pricingList.update();
				};
				uiEvent(span.parentNode, {
					click : {
						reset : function() {
							span.className = "search";
							input.value = "";
							updateFilter();
						}
					},
					input : {
						word : function() {
							const value = this.value.trim();
							span.className = (value) ? "search focus" : "focus";
							updateFilter();
						}
					}
				});
			};

			setCheckBox();
			setSearchWord();
		};
		uiEvent(this.container, {
			click : {
				submit : function() {
					self.event.submit();
				}
			}
		});
		this.serviceList.open(this);
		this.pricingList.open(this);
		setFilter();
	},
	event : {
		update : function() {
			const button = this.self.container.querySelector("[data-event='submit']");
			const seqPricing = this.self.data.seqPricing;
			const buttonColor = (seqPricing) ? "blue" : "gray";
			if(seqPricing) button.disabled = false;
			button.className = "ui-button " + buttonColor;
		},
		submit : function() {
			const seqPricing = this.self.data.seqPricing;
			if(!seqPricing) {
				alert("가격정책을 선택해 주세요.");
				return;
			}
			let url = `/member/sell/payment?seqMember=${seqMember}&seqOrderInfo=${seqOrderInfo}&seqPricing=${seqPricing}`;
			switch(orderType) {
				case "upgrade" : url += `&orderType=upgrade&seqPassInfo=${seqPassInfo}&serviceCategory=${serviceCategory}`; break;
				case "cross" : url += `&orderType=cross&crossType=${crossType}&seqPassInfo=${seqPassInfo}`; break;
			}
			window.location.href = url;
		}
	},

	/* ******** 서비스 목록 ******** */
	serviceList : {
		container : undefined,
		data : {},
		open : function(context) {
			this.container = document.querySelector("[data-id='serviceList']");
			this.data = context.data;
			this.render();
		},
		update : function() {
			this.data.serviceCategory = "";
			this.data.seqService = 0;
			this.render();
		},
		filter : function(data) {
			const orderType = this.data.orderType;
			const crossType = this.data.crossType;

			const filter = this.data.filter || {};

			data = data.filter(item => {
				if(filter.emptyYn == "Y" && !item.pricingList.length) return false;
				if(filter.serviceCategory &&
						filter.serviceCategory != item.serviceCategory.toUpperCase()) return false;
				if(item.serviceCategory == "NORMAL") {
					if(filter.serviceType.length > 0) {
						if(filter.serviceType.indexOf(item.serviceType) == -1) return false;
					}
					if(filter.serviceKind.length > 0) {
						if(filter.serviceKind.indexOf(item.serviceKind) == -1) return false;
					}
				}
				return true;
			});

			if(orderType == "cross" && crossType == "period") {
				data = data.filter(item => {
					let result = true;
					const isPackage = (item.serviceCategory == "PACKAGE");
					if(isPackage) {
						return false;
						const serviceList = item.packageServiceList || [];
						serviceList.forEach(item => {
							const serviceInfo = item.serviceInfo || {};
							if(serviceInfo.serviceKind != "P")
								result = false;
						});
					} else {
						if(item.serviceKind != "P")
							result = false;
					}
					return result;
				});
			}

			const input = document.querySelector("main [name='searchWord']");
			if(input) {
				const searchWord = filter.searchWord;
				if(searchWord.length > 1) {
					data = data.filter(item => {
						let result = false;
						const serviceName = item.serviceName || item.packageName || "";
						if(serviceName.indexOf(searchWord) > -1) return true;
						if(item.packageServiceList && item.packageServiceList.some(item => {
							const serviceName = (item.serviceInfo && item.serviceInfo.serviceName) ? item.serviceInfo.serviceName : "";
							return (serviceName.indexOf(searchWord) > -1);
						})) return true;
						return false;
					});
				}
			}
			return data;
		},
		render : function() {
			const serviceList = this.data.serviceList;
			const li = this.filter(serviceList).map(item => {
				return this.template(item);
			});
			this.container.innerHTML = li.join("");
			const self = this.event.self = this;
			uiEvent(this.container, {
				click : {
					focus : function() {
						self.event.focus(this);
					}
				}
			});

			// 서비스가 명시된 경우 해당 서비스를 포커스 시킨다.
			const serviceCategory = this.data.serviceCategory.toLowerCase();
			const seqService = this.data.seqService;
			if(serviceCategory && seqService) {
				const li = this.container.querySelector("[data-category='" + serviceCategory + "'][data-sequence='" + seqService + "']");
				if(li) {
					li.classList.add("focus");
					const top = li.offsetTop - (li.offsetHeight / 2);
					this.container.parentNode.scrollTop = (top < 0) ? 0 : top;
				}
			}

			// 업그레이드의 경우 서비스 선택이 불가능하다.
			if(this.data.orderType == "upgrade")
				this.container.classList.add("disabled");
		},
		event : {
			focus : function(object) {
				const container = this.self.container;
				if(container.classList.contains("disabled")) return;
				object = object.parentNode;
				const data = this.self.data;
				const li = container.querySelectorAll("li");
				li.forEach(item => {
					if(item == object) {
						item.classList.toggle("focus");
						if(item.classList.contains("focus")) {
							const serviceCategory = object.getAttribute("data-category").toUpperCase();
							const seqService = Number(object.getAttribute("data-sequence"));
							data.serviceCategory = serviceCategory;
							data.seqService = seqService;
						} else {
							data.serviceCategory = "";
							data.seqService = data.seqPricing = 0;
							componentOrderPass.pricingList.container.innerHTML = "";
						}
						componentOrderPass.pricingList.update();
					} else {
						item.classList.remove("focus");
					}
				});
				componentOrderPass.event.update();
			}
		},
		template : function(item, isDisable) {
			const isPackage = (item.serviceCategory == "PACKAGE");
			const serviceType = (isPackage) ? "package" : item.serviceType.toLowerCase();
			const serviceCategory = (isPackage) ? "package" : "normal";
			const seqService = (isPackage) ? item.seqPackage : item.seqService;
			const serviceColor = uiParameter.service.color[item.serviceType];
			const searchWord = this.data.filter.searchWord || "";

			const getSummary = function() {
				if(isPackage) {
					const summary = item.packageServiceList.map(item => {
						const serviceInfo = item.serviceInfo || {};
						return item.serviceInfo.serviceName;
					});
					return summary.join(" + ");
				} else {
					const summary = [];
					summary.push(uiParameter.service.kind[item.serviceKind]);
					summary.push(uiParameter.service.name[item.serviceType]);
					if(item.serviceGenre)
						summary.push(item.serviceGenre.serviceGenreName);
					if(item.serviceTime)
						summary.push(item.serviceTime + "분");
					if(item.place)
						summary.push(item.place.spaceName);
					return summary.join(" / ");
				}
			};
			const getName = function() {
				let name = (isPackage) ? '<em class="bg red">PKG</em>' + item.packageName : item.serviceName;
				if(searchWord) {
					name = name.replaceAll(searchWord, "<i class='red'>" + searchWord + "</i>");
				}
				return name;
			};

			return `
			<li data-category="${serviceCategory}" data-sequence="${seqService}">
				<a data-event="focus">
					<div class="bg ${serviceColor}"></div>
					<h4>${getName()}</h4>
					<span>${getSummary()}</span>
				</a>
			</li>
		`;
		}
	},

	/* ******** 가격정책 목록 ******** */
	pricingList : {
		container : undefined,
		data : {},
		open : function(context) {
			if(context) {
				this.container = document.querySelector("[data-id='pricingList']");
				this.data = context.data;
			}
			this.render();
		},
		update : function() {
			this.data.seqPricing = 0;
			this.render();
		},
		filter : function(data) {
			const orderType = this.data.orderType;
			const crossType = this.data.crossType;
			const filter = this.data.filter || {};

			if(orderType == "cross" && crossType == "period") {
				data = data.filter(item => {
					if(item.serviceCategory == "PACKAGE") return false;
					let result = true;
					const detailList = item.details || [];
					detailList.forEach(item => {
						const serviceInfo = item.serviceInfo || {};
						if(serviceInfo.serviceKind != "P")
							result = false;
					});
					return result;
				});
			}

			const seqService = this.data.seqService;
			if(seqService) {
				const serviceCategory = this.data.serviceCategory;
				data = data.filter(item => {
					return (item.serviceCategory == serviceCategory && item.seqService == seqService);
				});
			}

			data = data.filter(item => {
				if(filter.serviceCategory &&
					filter.serviceCategory != item.serviceCategory.toUpperCase()) {
						return false;
				}
				if(item.serviceCategory == "NORMAL") {
					if(filter.serviceType.length > 0) {
						if(filter.serviceType.indexOf(item.serviceInfo.serviceType) == -1) return false;
					}
					if(filter.serviceKind.length > 0) {
						if(filter.serviceKind.indexOf(item.serviceInfo.serviceKind) == -1) return false;
					}
				}
				return true;
			});


			const input = document.querySelector("main [name='searchWord']");
			if(input) {
				const searchWord = filter.searchWord;
				if(searchWord.length > 1) {
					data = data.filter(item => {
						let result = false;
						const pricingName = item.pricingName || "";
						if(pricingName.indexOf(searchWord) > -1) return true;
						if(item.details.some(item => {
							const serviceName = (item.serviceInfo && item.serviceInfo.serviceName) ? item.serviceInfo.serviceName : "";
							return (serviceName.indexOf(searchWord) > -1);
						})) return true;
						return false;
					});
				}
			}
			return data;
		},
		render : function() {
			const pricingList = this.data.pricingList;
			const li = this.filter(pricingList).map(item => {
				return this.template(item);
			});
			this.container.innerHTML = li.join("");
			const self = this.event.self = this;
			uiEvent(this.container, {
				click : {
					focus : function() {
						self.event.focus(this);
					}
				}
			});
		},
		event : {
			focus : function(object) {
				object = object.parentNode;
				if(object.classList.contains("disabled")) return;
				const container = this.self.container;
				const data = this.self.data;
				const li = container.querySelectorAll("li");
				li.forEach(item => {
					if(item == object) {
						item.classList.toggle("focus");
						const seqPricing = item.classList.contains("focus") ?
								Number(object.getAttribute("data-sequence")) : 0;
						data.seqPricing = seqPricing;
					} else {
						item.classList.remove("focus");
					}
				});
				componentOrderPass.event.update();
			}
		},
		template : function(item) {
			const serviceCategory = item.serviceCategory;
			const isPackage = (serviceCategory == "PACKAGE");
			const serviceColor = uiParameter.service.color[item.serviceInfo.serviceType];
			const serviceType = (isPackage) ? "" : item.serviceInfo.serviceType;

			const orderType = this.data.orderType;
			const crossType = this.data.crossType;
			const beforePrice = this.data.beforePrice;
			const searchWord = this.data.filter.searchWord || "";
			const isBranch = (partnerInfo.partner.branchUseYn == "Y");
			const branchTypeInfo = this.data.branchTypeInfo;

			const data = this.data;

			const getActive = () => {
				if(orderType == "upgrade") {
					if(beforePrice >= item.price) return "disabled";
				} else if(orderType == "cross") {
					if(beforePrice > item.price) return "disabled";
				}
				if(item.seqPricing == data.beforeSeqPricing) return "disabled";
				return "";
			};

			const getFiltering = function(value) {
				if(!searchWord) return value;
				return value.replaceAll(searchWord, "<i class='red'>" + searchWord + "</i>");
			};

			const getName = function() {
				const pricingName = ((isPackage) ? '<em class="bg red">PKG</em>' : '') + item.pricingName;
				return getFiltering(pricingName);
			};

			const getBranchTypeInfo = function(data) {
				if(!isBranch) return "";
				if(isPackage) {
					let isBranchType = false;
					data.forEach(item => {
						const serviceType = (item.serviceInfo) ? item.serviceInfo.serviceType : "";
						if(serviceType == "CLASS" || serviceType == "PLACE") isBranchType = true;
					});
					if(!isBranchType) return "";
				} else {
					if(!(serviceType == "CLASS" || serviceType == "PLACE")) return "";
				}
				const nameList = [];
				data.forEach(item => {
					const branchTypeList = item.branchTypes || [];
					branchTypeList.forEach(item => {
						const name = branchTypeInfo[item.seqPartnerBranchType];
						if(name && nameList.indexOf(name) == -1)
							nameList.push(name);
					});
				});
				const length = nameList.length;
				let text = "";
				if(length < 1) {
					text = "소속지점";
				} else if(length < 3) {
					text = nameList.join(", ");
				} else {
					text = nameList[0] + ", " + nameList[1] + " 외 " + (length - 2) + "건";
				}
				return `<i class='blue'>${text}</i> / `;
			};

			const getSummary = () => {
				const detailList = item.details || [];
				const saleYn = (item.saleYn == "Y") ? "<i class=''>판매 중</i>" : "<i class='red'>판매 중지</i>";
				const taxFreeYn = (item.taxFreeYn == "Y") ? "비과세" : "과세";
				let price = getComma(item.price) + "원";
				if(orderType == "upgrade" || orderType == "cross") {
					if(beforePrice < item.price) {
						const subPrice = getComma(item.price - beforePrice);
						price += "<var>(추가 : " + subPrice + "원)</var>";
					}
				}
				const branchInfo = getBranchTypeInfo(detailList);
				if(isPackage) {
					const nameList = item.serviceInfo.packageServiceList.map(item => {
						return getFiltering(item.serviceInfo.serviceName);
					});
					return `${branchInfo} ${taxFreeYn} / ${price} / ${nameList.join(" + ")}`;
				} else {
					const item = detailList[0] || {};
					const usePeriod = item.usePeriod + ((item.usePeriodType == "M") ? "개월" : "일");
					let useNumber = item.useNumber;
					useNumber = (useNumber < 0) ? "무제한" : useNumber + "회";
					const dayLimit = (item.dayLimit < 0) ? "무제한" : item.dayLimit || "-" + "회";
					const weekLimit = (item.weekLimit < 0) ? "무제한" : item.weekLimit || "-" + "회";
					const limitInfo = "일일 : " + dayLimit + " · " + "주간 : " + weekLimit;
					return `${branchInfo} ${taxFreeYn} / ${price} / ${usePeriod} / ${useNumber} / ${limitInfo}`;
				}
			};

			return `
				<li class="${getActive()}" data-sequence="${item.seqPricing}">
					<a data-event="focus">
						<div class="bg ${serviceColor}"></div>
						<h4>${getName()}</h4>
						<span>${getSummary()}</span>
					</a>
				</li>
			`;
		}
	},

	/* ******** 미수금 결제 여부 팝업 ******** */
	checkReceivablePopup : {
		popup : undefined,
		data : {},
		open : function(data) {
			if(this.popup) return;
			this.data = data;
			this.render();
		},
		close : function() {
			this.popup = undefined;
			uiPopup();
		},
		render : function() {
			const self = this;
			this.popup = uiPopup({
				template : this.template(),
				event : {
					click : {
						close : function() {
							self.close();
						},
						receivable : function() {
							orderController.orderInfo.info(seqMember, self.data.seqOrderInfo).then(data => {
								uiHistory.store();
								window.location.href = "/member/" + seqMember + "/order/" + data.seqOrderInfo + "/receivable?orderType=" + data.orderType.toLowerCase();
							}).catch(error => {
								uiError(error);
							});
						}
					}
				}
			});
		},
		template : function() {
			return `
				<div class="tiny">
					<div class="top">
						<h2>미수금 처리<a data-event="close"></a></h2>
					</div>
					<div class="middle">
						해당 이용권에 미수금이 있습니다.
						먼저 이용권의 미수금을 결제 후 이용권의 업그레이드 또는 교체를 진행해 주세요.
						<p class="ui-note red">
							잔여 미수금 : ${getComma(this.data.receivables)}원
						</p>
					</div>
					<div class="bottom">
						<button class="ui-button gray" data-event="close">건너뛰기</button>
						<button class="ui-button red" data-event="receivable">미수금 결제</button>
					</div>
				</div>
			`;
		}
	},
};
</script>
</html>

</html>
