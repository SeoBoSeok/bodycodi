
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
	<script type="text/javascript" src="/static/js/common/jquery/jquery.dataTables.min.js"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/jquery/jquery.dataTables.css">
	<style type="text/css">
main section + section			{margin-top:40px}
main table						{margin-top:5px; text-align:center}
main table a:hover				{text-decoration:underline}
main table p					{display:inline-block}
main table p i					{font-style:normal}
main table p *					{vertical-align:top !important}
main table tbody td:last-child	{text-align:left}
main .btn						{display:inline-block; margin:0 8px 0 0; padding:0 5px; min-width:85px; line-height:22px; text-align:center; font-size:12px; font-weight:400; color:rgba(255,255,255,0.9); cursor:default}
main .btn.red					{background-color:#ff5722}
main .btn.blue					{background-color:#004fec}
main .btn.green					{background-color:#37b772}
main .c_red						{color:#ff5722}
main .c_blue					{color:#004fec}
main .c_green					{color:#37b772}
	</style>
</head>
<body>



<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="센터관리">
	<div class="right">
		<a href="/sms/send">SMS/알림톡</a>
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
	<script type="text/javascript">
		(function() {
			const pathname = window.location.pathname;
			const a = document.querySelector(".ui-nav").querySelectorAll("a");
			a.forEach(item => {
				if(pathname == item.getAttribute("href"))
					item.classList.add("focus");
			});
		})();
	</script>
</nav>


<!-- 콘텐츠 -->
<div class="contents">
	<main>
		<section data-id="search">
			<form autocomplete="off">
				<input name="category" type="hidden" value="member">
				<div class="ui-search">
					<div class="date">
						<input name="fromDate" type="calendar" value="today">
						<span>부터</span>
						<input name="toDate" type="calendar" value="today">
						<span>까지</span>
						<div class="quick">
							<ul>
								<li><a>당월</a></li>
								<li><a>전월</a></li>
								<li><a>오늘</a></li>
								<li><a>어제</a></li>
								<li><a>1주</a></li>
							</ul>
						</div>
						<button class="ui-button blue" type="button" data-event="search">조회</button>
					</div>
				</div>
			</form>
		</section>
		<section>
			<div class="ui-tab" data-id="tabList">
				<ul>
					<li><label><input name="tab" type="radio" value="member" data-event="tab" checked><div>회원</div></label></li>
					<li><label><input name="tab" type="radio" value="GROUP" data-event="tab"><div>수업 관리</div></label></li>
					<li><label><input name="tab" type="radio" value="SERVICE" data-event="tab"><div>이용권 관리와 상품</div></label></li>
					<li><label><input name="tab" type="radio" value="booking" data-event="tab"><div>예약과 출석 결석</div></label></li>
				</ul>
			</div>
			<div data-id="historyList">
				<table class="ui-table dark even">
					<colgroup>
						<col width="10%"/>
						<col width="10%"/>
						<col width="10%"/>
						<col width="10%"/>
						<col width="60%"/>
					</colgroup>
					<thead>
						<tr>
							<td>날짜</td>
							<td>시간</td>
							<td>사용자</td>
							<td>카테고리</td>
							<td>이용내역</td>
						</tr>
					</thead>
					<tbody>
						<tr><td class="empty" colspan="5">데이터를 가져오는 중 입니다.</td></tr>
					</tbody>
				</table>
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
	container : {},
	data : {},
	open : function() {
		partnerController.history.search().then(data => {
			this.data = {
				historyList : data.historyList || [],
				searchInfo : data.searchInfo || {}
			};
			this.render();
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	update : function() {
		const data = {
			category : this.container.querySelector("[name='category']").value,
			fromDate : this.container.querySelector("[name='fromDate']").value,
			toDate : this.container.querySelector("[name='toDate']").value
		};
		if(!data.fromDate || !data.toDate || (getPeriod(data.fromDate, data.toDate) < 0)) {
			alert("종료 날짜를 시작 날짜 보다 크게 설정해 주세요.");
			return;
		}
		const period = getPeriod(data.fromDate, data.toDate);
		if(period > 31) {
			alert("검색 기간은 최대 한 달까지만 가능합니다.");
			return;
		}
		partnerController.history.search(data).then(data => {
			this.data = {
				historyList : (data.historyList || []).reverse(),
				searchInfo : data.searchInfo || {}
			};
			this.render(true);
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	render : function(isUpdate) {
		this.container = document.querySelector("main");
		const self = this;
		const setSearch = () => {
			const section = this.container.querySelector("[data-id='search']");
			const button = section.querySelector("[data-event='search']");
			button.addEventListener("click", () => {
				self.update();
			});
			uiSearch("오늘");

			const tabList = this.container.querySelectorAll("[data-event='tab']");
			const category = this.data.searchInfo.category || "member";
			tabList.forEach(item => {
				item.checked = (item.value == category);
				item.addEventListener("change", function() {
					self.container.putValue("category", this.value);
					self.update();
				});
			});
		};
		const setList = () => {
			const div = this.container.querySelector("[data-id='historyList']");
			div.innerHTML = this.template();
			const a = div.querySelectorAll("td a");
			a.forEach(item => {
				const href = item.getAttribute("href");
				if(href.indexOf("/manager/member/memberInfo/") > -1) {
					const seqMember = href.substr(href.lastIndexOf("/") + 1);
					item.setAttribute("href", "/member/" + seqMember + "/home");
				}
			});
			uiTable(div);
		};
		if(!isUpdate) setSearch();
		setList();
	},
	template : function() {
		const tr = this.data.historyList.map(item => {
			const dateTime = new Date(item.reg_dt);
			const date = dateTime.format("yyyy-mm-dd");
			const time = dateTime.format("hh:MM:ss");
			const getCategory = () => {
				switch(item.category) {
					case "ticket" : return "이용권";
					case "payment" : return "결제";
					case "member" : return "회원";
					case "SERVICE" : return "서비스";
					case "GROUP" : return "그룹수업";
					case "PRODUCT" : return "상품";
					case "booking" : return "예약";
					case "appointment" : return "PT 이용";
					case "class" : return "GX 이용";
				}
				return "-";
			};
			return `
				<tr>
					<td>${date}</td>
					<td>${time}</td>
					<td>${item.action_name || "-"}</td>
					<td>${getCategory()}</td>
					<td>${item.action_message || "-"}
				</tr>
			`;
		});
		return `
			<table class="ui-data-table dark even" data-table-length="20" data-table-dom="fltp" data-table-ordering="true" data-id="historyList">
				<colgroup>
					<col width="10%"/>
					<col width="10%"/>
					<col width="10%"/>
					<col width="10%"/>
					<col width="60%"/>
				</colgroup>
				<thead>
					<tr>
						<td>날짜</td>
						<td>시간</td>
						<td>사용자</td>
						<td>카테고리</td>
						<td>이용내역</td>
					</tr>
				</thead>
				<tbody>
					${tr.join("")}
				</tbody>
			</table>
		`;
	}
}
</script>
</html>
</html>
