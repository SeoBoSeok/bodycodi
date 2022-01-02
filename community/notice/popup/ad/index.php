
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
	<script type="text/javascript" src="/static/js/component/componentPopupAd.js"></script>
	<script type="text/javascript" src="/static/js/controller/noticeController.js"></script>
	<script type="text/javascript" src="/static/js/ui/uiCustomTable.js"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/notice.ext.css" />
	<link type="text/css" rel="stylesheet" href="/static/css/ui.ext.css" />
</head>
<body>
	<!-- 사이드 메뉴 -->
	


<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="고객관리">
	<div class="right">
		<a href="/member">회원 검색</a>
		<a href="/member-counseling/index">회원 관리</a>
		<a href="/sales/member-prospective">잠재고객 관리</a>
		<a class="focus" href="/community/notice">커뮤니티 관리</a>
		<a href="/sales/analysis">세일즈 성과 분석</a>
	</div>
</nav>

<!-- 사이드 메뉴 -->
<aside class="ui-side">
	<div class="menu">
		<h4>커뮤니티 관리</h4>
		<ul>
			<li><a href="/community/notice">공지사항</a></li>
			<li><a href="/community/notice/banner">배너공지</a></li>
			<li><a href="/community/notice/popup/ad">이미지 팝업</a></li>
			<li><a href="/community/board/member/app">회원앱 커뮤니티</a></li>
			<li><a href="/community/qna">문의사항 관리</a></li>
			
		</ul>
	</div>

	<script type="text/javascript">
		(function() {
			const pathname = window.location.pathname;
			const a = document.querySelector(".ui-side").querySelectorAll("a");
			a.forEach(item => {
				const href = item.getAttribute("href");
				if(pathname == href || pathname.indexOf(href) > -1 || pathname == href + "Reg")
					item.parentNode.classList.add("focus");
			});
		})();
	</script>
</aside>


	<!-- 메인 -->
	<main>
		<section class="noticeList" data-id="popupAdList">
			<div class="top">
				<div class="title">
					<div class="left">
						<h2>이미지 팝업</h2>
					</div>
					<div class="right">
						<button class="ui-button blue" data-event="create">이미지 팝업 등록</button>
					</div>
				</div>
			</div>
			<div class="middle">
				<div class="ui-table-box">
					<div class="filter" data-id="filter">
						<dl>
							<dt>
								<select class="ui-select" name="sortType" data-event="sortType"required>
									<option value="">정렬 선택</option>
									<!--<option value="index">순서 순</option>-->
									<option value="createDate" selected>등록일 순</option>
									<option value="subject">제목 순</option>
									<option value="startDate">시작일 순</option>
									<option value="endDate">종료일 순</option>
								</select>
							</dt>
							<dd>
								<select class="ui-select narrow" name="searchType" required>
									<option value="">검색 구분</option>
									<option value="subject" selected>제목</option>
									<option value="author">등록자</option>
								</select>
								<label class="search">
									<input name="searchWord" type="text" placeholder="검색" data-event="searchWord">
									<button type="button" data-event="search"></button>
								</label>
							</dd>
						</dl>
					</div>
					<div data-id="list">
						<table class="ui-table" data-id="ui-table">
							<thead>
								<tr>
									<td>번호</td>
									<td>공지문구</td>
									<td>등록자</td>
									<td>시작/종료일</td>
									<td>등록일</td>
									<td>공개여부</td>
									<td>내용수정</td>
								</tr>
							</thead>
							<tbody>
								<tr class="empty"><td colspan="8">데이터를 가져오는 중 입니다.</td></tr>
							</tbody>
						</table>
						<nav></nav>
					</div>
				</div>
			</div>
		</section>
	</main>
</body>
<script type="text/javascript">
function doReady() {
	componentPopupAd.list.open();
}
</script>
</html>
</html>
