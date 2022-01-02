
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
	<style type="text/css">
.ui-tip-over					{position:relative; overflow:visible}
.ui-tip-over a					{}
.ui-tip-over div				{position:absolute; left:50%; top:100%; margin-top:-5px; width:100%; text-align:center; visibility:hidden; opacity:0; transform:translate(-50%, -50%); transition:visibility 0.1s, opacity 0.1s}
.ui-tip-over a:hover div		{visibility:visible; opacity:1}
.ui-tip-over div img			{width:100%}
.ui-tip-over div span			{position:relative; display:inline-block; padding:10px; max-width:100%; background-color:white; border:1px solid #ccc; white-space:normal; line-height:1.5; text-align:left; font-size:13px}
.ui-tip-over div span:before	{content:""; position:absolute; right:-7px; top:50%; margin-top:-6px; width:12px; height:12px; background-color:rgba(255,250,230,1); border-right:1px solid #ffcd56; border-top:1px solid #ffcd56; transform:rotate(45deg)}

.sendList table					{line-height:1.5}
.sendList table a				{display:inline-block}
.sendList .memo					{min-width:300px !important}
.sendList .memo p				{white-space:normal}
/*
.sendList .memo p				{display:-webkit-box; -webkit-box-orient:vertical; max-height:2.8em; white-space:normal; -webkit-line-clamp:2; overflow:hidden}
 */
.sendList .image img			{display:inline-block; vertical-align:middle; max-width:50px; max-height:50px; box-shadow:inset 0 0 1px rgba(0,0,0,0.2); object-fit:cover; box-sizing:border-box}

	</style>
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
							<ul>
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
						<select class="ui-select" name="msgType">
							<option value="">발송타입 선택</option>
							<option value="">발송타입 선택</option>
							<option value="SMS">SMS</option>
							<option value="LMS">LMS</option>
							<option value="MMS">MMS</option>
							<option value="AT">알림톡</option>
						</select>
						<select class="ui-select" name="smsState">
							<option value="">전송상태 선택</option>
							<option value="">전송상태 선택</option>
							<option>발송완료</option>
							<option>전송중</option>
							<option>전송실패</option>
						</select>
						<select class="ui-select" name="keywordType">
							<option value="">검색조건</option>
							<option value="">검색조건</option>
							<option value="receiverName">회원명</option>
							<option value="membershipNo">회원번호</option>
							<option value="receiverMobile">수신번호</option>
							<option value="msg">발송내용</option>
						</select>
						<input name="keyword" placeholder="검색어 입력">
						<button class="ui-button blue" type="button" data-event="search">조회</button>
					</div>
				</div>
			</form>
		</section>

		<!-- 목록 -->
		<section class="sendList" data-id="list" style="margin-top:40px">
			<table class="ui-table dark even">
				<thead>
					<tr>
						<td>등록일시</td><td>발송일시</td><td>발송자</td><td>발송번호</td><td>수신자</td><td>발송종류</td>
						<td>발송내용</td><td>첨부 이미지</td><td>발송건수</td><td>성공건수</td><td>발송상태</td>
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
		smsController.send.list().then(data => {
			this.data = data || [];
			this.render();
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	update : function() {
		const data = {
			startDate : this.container.getValue("startDate"),
			endDate : this.container.getValue("endDate"),
			msgType : this.container.getValue("msgType"),
			smsState : this.container.getValue("smsState"),
			keywordType : this.container.getValue("keywordType"),
			keyword : this.container.getValue("keyword")
		};
		if(getPeriod(data.startDate, data.endDate) < 0) {
			alert("종료 날짜를 시작 날짜 보다 크게 설정해 주세요.");
			return;
		}
		smsController.send.list(data).then(data => {
			this.data = data || [];
			this.render(true);
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는데 실패하였습니다.");
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
			uiEvent(section, {
				click : {
					zoom : function() {
						const img = this.querySelector("img");
						self.popup.zoom.open(img.getAttribute("src"));
					},
					detail : function() {
						const seqSmsHistory = Number(this.getAttribute("data-sequence"));
						self.popup.detail.open(self, seqSmsHistory);
					}
				}
			});
			uiTable(section);
			popupSmsCharge.event.createButton(section);
		};
		if(!isUpdate)
			setSearch();
		setList();
	},
	template : function() {
		const tr = this.data.map(item => {
			const getType = () => {
				return (item.msgType == "AT") ? "알림톡" : item.msgType || "-";
			};
			const getImage = () => {
				return (item.img) ? `<a data-event="zoom"><img src="${item.img}"/></a>` : "-";
			};
			const message = uiSafeValue(item.msg || "");
			const statusName = (item.sendStatus == "DONE") ? "발송완료" : "발송중";
			const statusColor = (item.sendStatus == "DONE") ? "green" : "red";
			const receiversInfo = (item.receiversInfo || "").replace("null", "미입력").replace("(", "<br>(");
			return `
				<tr data-event="drop">
					<td>${uiObjectDate(item, "regDt")}</td>			
					<td>${uiObjectDate(item, "lastSendDt")}</td>		
					<td>${item.senderName}</td>						
					<td>${item.senderTel}</td>							
					<td>${receiversInfo}</td>							
					<td>${getType()}</td>								
					<td class="memo">									
						<p title="${message}">${message}</p>
					</td>
					<td class="image">${getImage()}</td>				
					<td>${item.sendCnt}</td>							
					<td>${item.successCnt}</td>						
					<td class="${statusColor}">${statusName}</td>		
					<td>												
						<button class="ui-button small white" data-sequence="${item.seqSmsHistory}" data-event="detail">상세</button>
					</td>
				</tr>
			`;
		});
		return `
			<table class="ui-data-table dark even">
				<thead>
					<tr>
						<td>동록일시</td><td>발송일시</td><td>발송자</td><td>발송번호</td><td>수신자</td><td>발송종류</td>
						<td>발송내용</td><td>첨부 이미지</td><td>발송건수</td><td>성공건수</td><td>발송상태</td><td>기타</td>
					</tr>
				</thead>
				<tbody>
					${tr.join("")}
				</tbody>
			</table>
		`;
	},
	popup : {
		zoom : {
			popup : undefined,
			data : "",
			open : function(src) {
				if(this.popup) return;
				this.data = src;
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
							close : function() {self.close()}
						}
					}
				});
			},
			template : function() {
				return `
					<div class="tiny">
						<div class="top">
							<h2>
								첨부 이미지 보기
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle" style="max-height:400px; overflow:auto">
							<img src="${this.data}" style="display:block; margin:0 auto; width:100%" />
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">닫기</button>
						</div>
					</div>
				`;
			}
		},
		detail : {
			popup : undefined,
			data : {},
			open : function(context, seqSmsHistory) {
				if(this.popup) return;
				smsController.getReceiver(seqSmsHistory).then(data => {
					this.data.sendInfo = context.data.filter(item => {
						return (item.seqSmsHistory == seqSmsHistory);
					})[0];
					this.data.receiverList = data || [];
					this.render();
				}).catch(error => {
					console.log(error);
					alert("데이터를 가져오는데 실패하였습니다.");
				});
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
							close : function() {self.close()}
						}
					}
				});
			},
			template : function() {
				const getDate = (value) => {
					if(!value) return "-";
					return uiDate(new Date(value).format("yyyy-mm-ddThh:MM"), "time");
				};
				const tr = this.data.receiverList.map(item => {
					const registerDate = getDate(item.regDt);
					const reserveDate = getDate(item.reserveDateTime);
					const state = item.smsState;
					const isSuccess = (state == "발송완료" || state == "인증성공" || state == "성공");
					const sendDate = (isSuccess) ? getDate(item.sendDateTime) : "-";
					const stateName = (isSuccess) ? "성공" : (state == "전송중" || state == null) ? "전송중" : "실패";
					const stateColor = (isSuccess) ? "green" : "red";
					const errorMessage = (isSuccess || state == "전송중" || state == null) ? "-" : state;
					return `
						<tr>
							<td>${registerDate}</td><td>${reserveDate}</td>
							<td>${item.receiverName}</td><td>${item.receiverMobile}</td>
							<td>${sendDate}</td><td class="${stateColor}">${stateName}</td><td>${errorMessage}</td>
						</tr>
					`;
				});
				return `
					<style type="text/css">
						.popupDetail 						{max-width:1024px}
						.popupDetail .middle				{max-height:500px; overflow-y:auto}
						.popupDetail .middle h4				{font-size:15px}
						.popupDetail .middle li + li		{margin-top:25px}
						.popupDetail .ui-table				{line-height:1.35; text-align:center}
						.popupDetail .ui-table tr > *		{padding:8px}
					</style>
					<div class="popupDetail">
						<div class="top">
							<h2>
								SMS 상세 내역
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle">
							<table class="ui-table dark even">
								<thead>
									<tr>
										<td>등록일시</td><td>예약일시</td>
										<td>회원명</td><td>휴대폰번호</td>
										<td>발송일시</td><td>발송결과</td><td>사유</td>
									</tr>
								</thead>
								<tbody>
									${tr.join("")}
								</tbody>
							</table>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">닫기</button>
						</div>
					</div>
				`;
			}
		}
	}
};

</script>
</html>
</html>
