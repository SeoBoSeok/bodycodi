
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
	<script type="text/javascript" src="/static/js/controller/qnaController.js"></script>
	<script type="text/javascript" src="/static/js/ui/uiCustomTable.js"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/ui.ext.css" />
	<style type="text/css">
main section .top								{margin-bottom:40px}
.ui-table-box .ui-table td:nth-child(2),
.ui-table-box .ui-table td:nth-child(3)			{text-align:left}
.ui-table-box .ui-table tbody td:nth-child(3)	{font-weight:500; color:#333}
.ui-table-box .ui-table tbody td:nth-child(3),
.ui-table-box .ui-table tbody td:nth-child(5)	{font-size:15px}


	</style>
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
		<section class="qnaList" data-id="qnaList">
			<div class="top">
				<h2>문의사항 관리</h2>
			</div>
			<div class="middle">
				<div class="ui-search-box" data-id="search">
					<form onsubmit="return false" autocomplete="off">
						<div class="date">
							<dl>
								<dt>기간</dt>
								<dd class="period">
									<ul>
										<li><input name="startDate" type="calendar"></li>
										<li>-</li>
										<li><input name="endDate" type="calendar"></li>
									</ul>
								</dd>
								<dd class="quick">
									<ul>
										<li><a>오늘</a></li>
										<li><a>어제</a></li>
										<li><a>1주</a></li>
										<li><a>당월</a></li>
										<li><a>전월</a></li>
									</ul>
								</dd>
							</dl>
						</div>
						<div class="condition">
							<dl>
								<dt>답변강사</dt>
								<dd>
									<select class="ui-select" name="seqPartnerCoach" required>
										<option value="">답변강사 선택</option>
										<option value="">전체</option>
									</select>
								</dd>
								<dt>회원검색</dt>
								<dd>
									<dl>
										<dt>
											<input name="keyword" type="text" maxlength="16" placeholder="이름, 전화번호">
										</dt>
										<dd>
											<button class="ui-button blue" type="button" data-event="search">검색</button>
										</dd>
									</dl>
								</dd>
							</dl>
						</div>
					</form>
				</div>
				<div class="ui-table-box">
					<div data-id="list">
						<table class="ui-table">
							<thead>
								<tr>
									<td>번호</td>
									<td>지점</td>
									<td>제목</td>
									<td>상태</td>
									<td>회원명</td>
									<td>등록일시</td>
									<td>답변</td>
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
	doPage.open();
}

const doPage = {
	container : undefined,
	open : function() {
		Promise.all([
			commonController.coachList(),
		]).then(([coachList]) => {
			this.data = {
				qnaList : [],
				coachList : coachList || [],
				table : undefined
			};
			this.render();
		}).catch(error => {
			uiError(error);
		});
	},
	render : function() {
		this.container = document.querySelector("[data-id='qnaList']");
		const self = this.event.self = this;

		// 검색 필드 내 담당강사 셋팅
		const setCoachList = () => {
			const select = this.container.querySelector("[name='seqPartnerCoach']");
			const option = this.data.coachList.map(item => {
				return `<option value="${item.seqPartnerCoach}">${item.coachName}</option>`;
			});
			select.innerHTML += option.join("");
		};

		// 이벤트 셋팅
		const setEvent = () => {
			uiEvent(this.container, {
				click : {
					search : function() {
						self.event.search();
					},
					update : function() {
						const id = this.getAttribute("data-id");
						window.location.href = "/community/qna/" + id + "/detail";
					}
				}
			});
			uiSearch("당월");
		};
		setCoachList();
		setEvent();
		this.event.search();
	},
	event : {
		search : function() {
			const self = this.self;
			const container = self.container;
			const div = container.querySelector("[data-id='list']");
			const table = self.data.table = new uiCustomTable();
			table.open({
				container : div,
				filter : {
					startDate : container.getValue("startDate"),
					endDate : container.getValue("endDate"),
					seqPartnerCoach : container.getValue("seqPartnerCoach", true),
					keyword : container.getValue("keyword").trim()
				},
				event : {
					click : {
						detail : function() {
							self.event.detail(this);
						},
					},
				},
				template : self.template,
				controller : qnaController.list
			});
		},
		detail : function(object) {
			const id = object.getAttribute("data-id");
			window.location.href = "/community/qna/" + id + "/detail";
		}
	},
	template : function(item) {
		const getState = () => {
			return (item.answerCompleteYn == "Y") ?
				`<em class="state bg green">답변완료</em>` :
				`<em class="state">답변대기</em>`;
		};
		return `
			<tr>
				<td>${item.index}</td>
				<td>${item.partnerBranchName || item.partnerName}</td>
				<td class="name">${(item.uploadName || "-")}</td>
				<td>${getState()}</td>
				<td>${item.memberName || "-"}</td>
				<td>${uiDate(item.regDt, "break")}</td>
				<td><button class="update" data-id="${item.uploadId}" data-event="detail">답변하기</button></td>
			</tr>
		`;
	}
};
</script>
</html>
</html>
