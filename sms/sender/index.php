
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
main .ui-table td button:disabled	{opacity:0.33}
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

		<!-- 목록 -->
		<section data-id="senderList">
			<table class="ui-table dark even fixed">
				<thead>
					<tr>
						<td>신청일시</td><td>발신자명</td><td>발신번호</td><td>인증여부</td><td>기타</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="empty" colspan="5">데이터를 불러오는 중 입니다.</td>
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
		smsController.sender.list().then(data => {
			this.data = data || [];
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
		this.container = document.querySelector("main");
		const self = this.event.self = this;
		const section = this.container.querySelector("[data-id='senderList']");
		section.innerHTML = this.template();
		uiEvent(section, {
			click : {
				verify : function() {self.event.verify()},
				remove : function() {self.event.remove(this)}
			}
		});
		uiTable(section);
		const dataTable = $(section.querySelector("table")).DataTable();
		dataTable.on("init", () => {
			const div = section.querySelector(".dataTables_filter");
			if(!div) return;
			const button = document.createElement("button");
			button.className = "ui-button green";
			button.innerHTML = "발신자 등록";
			button.addEventListener("click", function(){self.event.create()});
			div.appendChild(button);
		});
	},
	event : {
		create : function() {
			this.self.popup.open();
		},
		remove : function(object) {
			if(!confirm("정말로 삭제하시겠습니까?")) return;
			const seqSmsSender = Number(object.getAttribute("data-sequence"));
			const data = this.self.data.filter(item => {
				return (item.seq_sms_sender == seqSmsSender);
			})[0];
			smsController.sender.remove({
				seqSmsSender : seqSmsSender,
				handleKey : data.handle_key,
				phone : data.phone
			}).then(data => {
				alert("삭제되었습니다.");
				this.self.update();
			}).catch(error => {
				console.log(error);
				alert("처리 중 오류가 발생하였습니다.");
			});
		},
		verify : function() {
			alert("02-2676-6060으로 전화해 주세요.");
		}
	},
	template : function() {
		const tr = this.data.sort((a, b) => {
			a = new Date(a.reg_dt).getTime();
			b = new Date(b.reg_dt).getTime();
			return (a == b) ? 0 : (a < b) ? 1 : -1;
		}).map(item => {
			const verifyName = (item.verify_yn == "Y") ? "인증" : "미인증";
			const verifyColor = (item.verify_yn == "Y") ? "green" : "red";
			const registerDate = uiDate(new Date(item.reg_dt).format("yyyy-mm-ddThh:MM"), "time");
			const disabled = (item.verify_yn == "Y") ? "disabled" : "";
			return `
				<tr>
					<td>${registerDate}</td>
					<td>${item.sender_name || "-"}</td>
					<td>${item.phone || "-"}</td>
					<td class="${verifyColor}">${verifyName}</td>
					<td>
						<button class="ui-button small white" data-event="verify" ${disabled}>인증</button>
						<button class="ui-button small white" data-sequence="${item.seq_sms_sender}" data-event="remove">삭제</button>
					</td>
				</tr>
			`;
		});
		return `
			<table class="ui-data-table dark even fixed">
				<thead>
					<tr>
						<td>신청일시</td><td>발신자명</td><td>발신번호</td><td>인증여부</td><td>기타</td>
					</tr>
				</thead>
				<tbody>
					${tr.join("")}
				</tbody>
			</table>
		`;
	},
	popup : {
		popup : undefined,
		open : function() {
			if(this.popup) return;
			this.render();
		},
		close : function(isUpdate) {
			this.popup = undefined;
			uiPopup();
			if(isUpdate) doPage.update();
		},
		submit : function() {
			const senderName = this.popup.getValue("senderName");
			const senderNumber = this.popup.getValue("senderNumber");
			if(!senderName) {
				alert("발시자명을 입력해 주세요.");
				return;
			}
			if(!senderNumber || (!isPhone(senderNumber) && !isMobile(senderNumber))) {
				alert("발신번호를 확인해 주세요.");
				return;
			}
			smsController.sender.create({
				seqSmsSender : "",
				senderName : senderName,
				phone : senderNumber,
				handleKey : ""
			}).then(data => {
				if(data.code == "ok") {
					alert("등록되었습니다.");
					this.close(true);
				} else if(data.code == "AlreadyExists") {
					alert("이미 등록된 번호입니다.");
				}
			}).catch(error => {
				console.log(error);
				alert("처리 중 오류가 발생하였습니다.");
			});
		},
		render : function() {
			const self = this.event.self = this;
			this.popup = uiPopup({
				template : this.template(),
				event : {
					click : {
						close : function() {self.close()},
						submit : function() {self.submit()}
					},
					change : {
						number : function() {self.event.changeNumber(this)}
					}
				}
			});
			uiInput(this.popup);
		},
		event : {
			changeNumber : function(object) {
				object.value = getPhoneNumber(object.value);
			}
		},
		template : function() {
			return `
				<div class="tiny" style="max-width:420px">
					<div class="top">
						<h2>
							발신자 등록
							<a data-event="close"></a>
						</h2>
					</div>
					<div class="middle ui-form">
						<form autocomplete="off">
							<table>
								<tr>
									<th>발신자명</th>
									<td><input name="senderName" maxlength="16" tabIndex></td>
								</tr>
								<tr>
									<th>발신번호</th>
									<td><input class="wide" name="senderNumber" maxlength="13" data-event="number" tabIndex></td>
								</tr>
							</table>
						</form>
					</div>
					<div class="bottom">
						<button class="ui-button gray" data-event="close">취소</button>
						<button class="ui-button" data-event="submit">등록</button>
					</div>
				</div>
			`;
		}
	}
};

</script>
</html>
</html>
