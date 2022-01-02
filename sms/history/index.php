
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
	<script type="text/javascript" src="/static/js/common/jquery/jquery.dataTables.min.js"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/jquery/jquery.dataTables.css">
	<style type="text/css"></style>
</head>
<body>



<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="센터관리">
	<div class="right">
		<a class="focus" href="/sms/send">SMS/알림톡</a>
		<a href="/partner/naver">네이버 연동</a>
		<a href="/partner/keepfit">키핏 연동</a>
		<a href="/partner/operation">센터 설정</a>
		<a href="/manager/group">그룹 관리</a>
		<a href="/locker">락커 관리</a>
		<a href="/product/public">일반 상품 관리</a>
		<a href="/reservationsetting/setting/appointment">예약정책</a>
		<a href="/partner/use">입장 내역</a>
		<a href="/manager/history/index">히스토리</a>
	</div>
</nav>

<div class="contents">
	<main>
		

<!-- 로컬 네비게이션 바 -->
<div class="ui-tab block" data-id="tab">
	<ul>
		<li><a href="/sms/send">SMS 발송내역</a></li>
		<li><a href="/sms/charge">SMS 충전내역</a></li>
		<li><a href="/sms/auto">SMS 자동 문자발송</a></li>
		<li><a href="/sms/sender">SMS 발신번호 등록</a></li>
		<li><a href="/sms/history">SMS 이용내역</a></li>
		<li><a href="/kakao/alimtalk">알림톡</a></li>
	</ul>
	<script type="text/javascript">
		(function() {
			const pathname = window.location.pathname;
			const a = document.querySelector(".ui-tab").querySelectorAll("a");
			a.forEach(item => {
				if(pathname == item.getAttribute("href"))
					item.classList.add("focus");
			});
		})();
	</script>
</div>

		<!-- 검색 -->
		<section data-id="search">
			<form name="search" action="" method="post" autocomplete="off" onsubmit="return false">
				<div class="ui-search">
					<div class="date">
						<input name="startDate" type="calendar" value="today">
						<span>부터</span>
						<input name="endDate" type="calendar" value="today">
						<span>까지</span>
						<div class="quick">
							<ul style="margin-right:0">
								<li><a>당월</a></li>
								<li><a>전월</a></li>
								<li><a>오늘</a></li>
								<li><a>어제</a></li>
								<li><a>1주</a></li>
								<li><a>2주</a></li>
							</ul>
						</div>
						<select class="ui-select" name="act" style="margin-left:8px; width:150px">
							<option value="">내역구분 선택</option>
							<option value="">내역구분 선택</option>
							<option value="DEDUCT">문자발송</option>
							<option value="CHARGE">문자충전</option>
							<option value="REFUND">문자 미수신건 환불</option>
						</select>
						<button class="ui-button blue" type="button" data-event="search">조회</button>
					</div>
				</div>
			</form>
		</section>

		<!-- 목록 -->
		<section class="sendList" data-id="list" style="margin-top:40px">
			<table class="ui-table dark even fixed">
				<thead>
					<tr>
						<td>사용일시</td><td>내역 구분</td><td>변동건수</td><td>남은건수</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="empty" colspan="11">데이터를 불러오는 중 입니다.</td>
					</tr>
				</tbody>
			</table>
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
		smsController.history.list().then(data => {
			this.data = data || [];
			this.render();
		}).catch(error => {
			console.log(error);
			alert("데이터를 불러오는 중 실패하였습니다.");
		});
	},
	update : function() {
		const data = {
			startDate : this.container.getValue("startDate").replace(/-/g, "."),
			endDate : this.container.getValue("endDate").replace(/-/g, "."),
			act : this.container.getValue("act")
		};
		if(getPeriod(data.startDate, data.endDate) < 0) {
			alert("종료 날짜를 시작 날짜 보다 크게 설정해 주세요.");
			return;
		}
		smsController.history.list(data).then(data => {
			this.data = data || [];
			this.render(true);
		}).catch(error => {
			console.log(error);
			alert("데이터를 불러오는 중 실패하였습니다.");
		});
	},
	render : function(isUpdate) {
		this.container = document.querySelector("main");
		const setSearch = () => {
			const section = this.container.querySelector("[data-id='search']");
			const button = section.querySelector("[data-event='search']");
			button.onclick = () => {
				this.update();
			};
			uiSearch("오늘");
		};
		const setList = () => {
			const section = this.container.querySelector("[data-id='list']");
			const self = this;
			section.innerHTML = this.template();
			uiTable(section);
		};
		if(!isUpdate) setSearch();
		setList();
	},
	template : function() {
		const tr = this.data.map(item => {
			const getStatus = () => {
				switch(item.act) {
					case "DEDUCT" : return "문자발송";
					case "CHARGE" : return "문자충전";
					case "REFUND" : return "문자 미수신건 환불";
				}
				return "-";
			};
			const getChangeCount = () => {
				const count = getComma(item.useCnt);
				const sign = (item.act == "DEDUCT") ? "-" : "+";
				const color = (item.act == "DEDUCT") ? "red" : "green";
				return `<span class="${color}">${sign}${count}건</span>`;
			};
			return `
				<tr>
					<td>${uiObjectDate(item, "regDt")}</td>			
					<td>${getStatus()}</td>							
					<td>${getChangeCount()}</td>						
					<td>${getComma(item.remainCnt)}건</td>				
				</tr>
			`;
		});
		return `
			<table class="ui-data-table dark even fixed">
				<thead>
					<tr>
						<td>사용일시</td><td>내역구분</td><td>변동건수</td><td>남은건수</td>
					</tr>
				</thead>
				<tbody>
					${tr.join("")}
				</tbody>
			</table>
		`;
	}
};

</script>
</html>
</html>
