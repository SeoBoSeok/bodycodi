
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
				remainDate	: Number("558"),
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
	<script type="text/javascript" src="/static/js/controller/serviceController.js?v=2.5"></script>
	<script type="text/javascript" src="/static/js/component/componentProductList.js?v=20211201"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/ui.ext.css?v=2.53" />
	<link type="text/css" rel="stylesheet" href="/static/css/product.css" />
	<style type="text/css"></style>
</head>
<body>
	<!-- 사이드 메뉴 -->
	


<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="센터관리">
	<div class="right">
		<a class="focus" href="/services">현장 판매 이용권</a>
		<a href="/b-pay/service">b.pay 이용권</a>
	</div>
</nav>

<aside class="ui-side">
	<div class="menu">
		<h4>현장 판매 이용권</h4>
		<ul>
			<li><a href="/services">판매 이용권<span>(구 판매 서비스)</span></a></li>
			<li><a href="/services/remove">판매 중지 이용권<span>(구 삭제 서비스)</span></a></li>
			<li><a href="/coupon/discount">현장 판매 프로모션<span>(구 할인권)</span></a></li>
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


	<!-- 메인 -->
	<main>
		<section class="productList">
			<div class="top">
				<div class="title" data-id="title">
					<div class="left">
						
							<h2>판매 이용권</h2>
						
						
					</div>
					<div class="right">
						<button class="ui-button outline blue" data-category="package" data-event="create" data-permission="permissionProduct/registProduct">패키지 상품 만들기</button>
						<div class="ui-drop-button">
							<button class="ui-button blue" data-event="create" data-permission="permissionProduct/registProduct">이용권 상품 만들기</button>
							<div class="menu">
								<ul>
									<!--<li><a data-category="package" data-event="create">패지키 이용권</a></li>-->
									<li><a href="/services/create/?serviceType=appointment" data-type="appointment" data-event="create">개인레슨 이용권</a></li>
									<li><a data-type="class" data-event="create">그룹수업 이용권</a></li>
									<li><a data-type="place" data-event="create">시설 이용권</a></li>
									<li><a data-type="option" data-event="create">옵션 이용권</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="ui-filter" data-id="filter">
					<div>
						<h4>필터</h4>
						<ul>
							<li>
								<label class="ui-input-checkbox"><input name="filter" type="checkbox" data-event="filter" value="" checked><span></span>전체</label>
							</li>
							<li>
								<label class="ui-input-checkbox"><input name="filter" type="checkbox" data-category="serviceKind" data-event="filter" value="P"><span></span>기간제</label>
								<label class="ui-input-checkbox"><input name="filter" type="checkbox" data-category="serviceKind" data-event="filter" value="N"><span></span>횟수제</label>
							</li>
							<li>
								<label class="ui-input-checkbox"><input name="filter" type="checkbox" data-category="serviceType" data-event="filter" value="APPOINTMENT"><span></span>개인레슨</label>
								<label class="ui-input-checkbox"><input name="filter" type="checkbox" data-category="serviceType" data-event="filter" value="CLASS"><span></span>그룹수업</label>
								<label class="ui-input-checkbox"><input name="filter" type="checkbox" data-category="serviceType" data-event="filter" value="PLACE"><span></span>시설이용</label>
								<label class="ui-input-checkbox"><input name="filter" type="checkbox" data-category="serviceType" data-event="filter" value="OPTION"><span></span>옵션</label>
							</li>
							<li>
								<label class="ui-input-checkbox"><input name="filter" type="checkbox" data-category="serviceCategory" data-event="filter" value="NORMAL"><span></span>단일 이용권</label>
								<label class="ui-input-checkbox"><input name="filter" type="checkbox" data-category="serviceCategory" data-event="filter" value="PACKAGE"><span></span>패키지 이용권</label>
							</li>
						</ul>
					</div>
					<div>
						<h4 style="visibility:hidden">필터</h4>
						<ul>
							<li>
								<label class="ui-input-checkbox">
									<input name="emptyYn" type="checkbox" data-event="display" checked>
									<span></span>
									이용권 상품이 없는 이용권 종류 제외
								</label>
							</li>
						</ul>
					</div>
					<div class="sort">
						<h4>정렬</h4>
						<ul>
							<li>
								<label><input name="sortType" type="radio" data-event="display" value="name" checked><span></span><span>이름순</span></label>
								<label><input name="sortType" type="radio" data-event="display" value="date"><span></span><span>등록순</span></label>
								<!--<label><input name="sortType" type="radio" data-event="sort" value="price"><span></span><span>가격순</span></label>-->
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="middle">
				<div class="left">
					<div class="ui-filter-search" data-id="search">
						<input name="searchWord" type="text" maxlength="20" placeholder="이용권 검색 (최소 2자 이상)" autocomplete="off" data-event="searchWord">
						<a data-event="reset"></a>
						<!--<button data-event="submit"></button>-->
					</div>
					<div class="serviceList" data-id="serviceList"></div>
				</div>
				<div class="right">
					<div class="pricingList" data-id="pricingList"></div>
				</div>
			</div>
		</section>
	</main>
</body>
<script type="text/javascript">
function doReady() {
	componentProductList.open("");
}
</script>
</html>
</html>
