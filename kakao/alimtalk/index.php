
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
	<script type="text/javascript" src="/static/js/controller/kakaoController.js"></script>
	<script type="text/javascript" src="/static/js/common/jquery/jquery.dataTables.min.js"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/jquery/jquery.dataTables.css">
	<style type="text/css">
main section.hidden									{display:none}
main section .middle .ui-note						{margin-top:10px; padding:25px; border:1px dashed #ccc; text-align:center; font-size:17px; color:#bbb}

main section .bottom								{margin-top:25px}
main section .bottom button							{display:block; margin:0 auto; width:135px}

.profile .ui-form									{padding:25px; border:1px solid #ccc}
.profile .ui-form > button							{display:block; margin:25px auto 0 auto; width:135px}
.profile .ui-form table input						{max-width:200px; text-align:left}
.profile .ui-form .ui-input-search input			{width:400px !important; max-width:400px !important}

.ui-grid											{margin:-10px -10px 0 -10px; text-align:left; font-size:0}
.ui-grid > ul > li									{position:relative; display:inline-block; vertical-align:top; margin:10px; padding:20px 25px; width:calc(20% - 20px); min-width:280px; border:1px solid #ccc; cursor:pointer; box-sizing:border-box}
.ui-grid > ul > li.empty							{height:90px; background-color:#f0f0f0; border:1px dashed #ccc; line-height:90px; text-align:center; font-size:17px; color:#999}
.ui-grid > ul > li.empty a							{position:absolute; left:0; top:0; right:0; bottom:0}
.ui-grid .function									{position:absolute; left:0; top:0; width:100%; height:100%; background-color:rgba(0,0,0,0.66); text-align:center; visibility:hidden; opacity:0; transition:visibility 0.2s, opacity 0.2s}
.ui-grid li:hover .function							{visibility:visible; opacity:1}
.ui-grid .function ul								{position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); white-space:nowrap; text-align:center}
.ui-grid .function ul li							{display:inline-block; vertical-align:middle}
.ui-grid .function ul li button						{width:60px; height:25px; line-height:23px; box-shadow:inset 0 0 1px rgba(0,0,0,0.33)}
.ui-grid .function ul li + li						{margin-left:8px}

.popupAlimtalk										{max-width:870px}
.popupAlimtalk.info									{max-width:530px}
.popupAlimtalk .ui-form table tr > th p				{display:inline-block; margin-top:8px; line-height:1.4}

.popupAlimtalk .preview								{position:relative; margin-top:5px; padding:0 15px; width:350px; background-color:white; border-top-left-radius:15px; border-top-right-radius:15px; border:1px solid #ccc; box-sizing:border-box}
.popupAlimtalk .preview .title						{position:relative; height:35px; line-height:35px; text-align:center}
.popupAlimtalk .preview .title:before				{content:""; position:absolute; left:50%; margin-left:-40px; top:50%; margin-top:-2.5px; width:80px; height:5px; border-radius:5px; border:1px solid #ccc}
.popupAlimtalk .preview .contents					{padding:10px; min-height:250px; max-height:350px; background-color:#acc8dd; border-top-left-radius:5px; border-top-right-radius:5px; overflow-y:auto; box-sizing:border-box}

.popupAlimtalk .balloon								{background-color:white}
.popupAlimtalk .balloon + .balloon					{margin-top:10px}
.popupAlimtalk .balloon .subject					{height:35px; background-color:#fee800; line-height:35px; text-align:center}
.popupAlimtalk .balloon .subject.reject				{background-color:#ff5722; color:white}
.popupAlimtalk .balloon .message					{padding:15px; white-space:normal; line-height:1.5; text-align:justify}
.popupAlimtalk .balloon .message.empty:before		{content:"입력된 내용이 없습니다."; display:block; text-align:center; color:#bbb}
.popupAlimtalk .balloon .date						{margin-top:-10px; padding:0 15px 8px 15px; text-align:right; color:#999}

.popupAlimtalk .template input						{width:250px !important; max-width:250px !important; text-align:left !important}
.popupAlimtalk .template dl							{margin-top:10px}
.popupAlimtalk .template dl dt						{position:relative; vertical-align:top; height:100%}
.popupAlimtalk .template dl dd						{vertical-align:top; padding-left:20px; width:355px}
.popupAlimtalk .template dl dd .preview				{margin-top:0}
.popupAlimtalk .template dl dt > textarea			{position:absolute; left:0; top:0; right:0; bottom:0}
.popupAlimtalk .template dl dt > div				{position:absolute; left:0; top:0; right:0; bottom:0; padding:10px; background-color:#f0f0f0; border:1px solid #ccc; box-sizing:border-box; overflow-y:auto}
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

		<!-- 플러스친구 -->
		<section class="profile" data-id="profile">
			<h2 class="ui-title">플러스친구</h2>
			<div></div>
		</section>

		<!-- 자동발송 템플릿 -->
		<section class="hidden" data-id="autoTemplateList">
			<h2 class="ui-title">자동발송 템플릿</h2>
			<div></div>
		</section>

		<!-- 일반발송 템플릿 -->
		<section class="hidden" data-id="userTemplateList">
			<h2 class="ui-title">일반발송 템플릿</h2>
			<div></div>
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
		kakaoController.alimtalk.info().then(data => {
			this.data = data || {};
			this.render()
		}).catch(error => {
			uiError(error);
		})
	},
	render : function() {
		this.container = document.querySelector("main");
		this.profileInfo.open(this);
		this.templateList.open(this, "user");
		this.templateList.open(this, "auto");
	},
	profileInfo : {
		container : undefined,
		mode : "create",
		data : {},
		open : function(context) {
			this.data = context.data;
			this.mode = (this.data.senderInfo) ? "update" : "create";
			if(this.mode == "create") {
				kakaoController.alimtalk.profile.category().then(data => {
					this.data.categoryList = data || [];
					this.render();
				}).catch(error => {
					alert((error.status == 409) ? error.responseText : "처리 중 오류가 발생하였습니다");
				});
			} else {
				this.render();
			}
		},
		render : function() {
			const section = this.container = document.querySelector("main [data-id='profile']");
			const div = section.querySelector("div");
			const self = this.event.self = this;
			div.innerHTML = this.template();
			uiEvent(div, {
				click : {
					submit : function() {self.event.submit()},
					authorize : function() {self.event.authorize()},
					remove : function() {self.event.remove()},
				},
				change : {
					plusId : function() {self.event.plusId(this)}
				}
			});
		},
		event : {
			check : function(data) {
				for(let name in data) {
					const value = data[name];
					const isEmpty = (!value);
					let error = "";
					switch(name) {
						case "plusid"		: if(isEmpty || value == "@") error = "플러스친구 아이디를 입력해 주세요."; break;
						case "phonenumber"	: if(isEmpty) error = "핸드폰 번호를 입력해 주세요."; break;
						case "categorycode"	: if(isEmpty) error = "카테고리를 선택해 주세요."; break;
						case "authnum"		: if(isEmpty) error = "인증번호를 입력해 주세요."; break;
					}
					if(error) {
						alert(error);
						const input = this.self.container.querySelector("[name='" + name + "']");
						if(input) input.focus();
						return false;
					}
				}
				return true;
			},
			submit : function() {
				const data = {
					plusid : this.self.container.getValue("plusid"),
					phonenumber : this.self.container.getValue("phonenumber"),
					categorycode : this.self.container.getValue("categorycode"),
					authnum : this.self.container.getValue("authnum")
				};
				if(!this.check(data)) return;
				kakaoController.alimtalk.profile.create(data).then(data => {
					if(data.code == 0) {
						alert("등록되었습니다.");
						window.location.reload(true);
					} else {
						alert(data.message);
					}
				}).catch(error => {
					alert((error.status == 409) ? error.responseText : "처리 중 오류가 발생하였습니다");
				});
			},
			authorize : function() {
				const data = {
					plusid : this.self.container.getValue("plusid"),
					phonenumber : this.self.container.getValue("phonenumber"),
				};
				if(!this.check(data)) return;
				kakaoController.alimtalk.profile.authorize(data).then(() => {
					alert("인증번호를 발송했습니다.");
				}).catch(error => {
					alert((error.status == 409) ? error.responseText : "처리 중 오류가 발생하였습니다");
				});
			},
			remove : function() {
				alert("02-2676-6060으로 연락해 주세요.");
			},
			plusId : function(object) {
				object.value =  "@" + object.value.replace(/@/g, "").trim();
			}
		},
		template : function() {
			if(this.mode == "update") {
				const senderInfo = this.data.senderInfo;
				const getState = () => {
					switch(senderInfo.profile.profileStat) {
						case "A" : return `<span class="green">정상</span>`;
						case "C" : return `<span class="red">비정상</span>`;
						case "B" : return `<span class="red">정지</span>`;
						case "E" : return `<span class="red">삭제중</span>`;
						case "D" : return `<span class="red">삭제</span>`;
					}
				};
				return `
					<div class="ui-grid">
						<ul>
							<li>
								<h4>${senderInfo.profile.name}</h4>
								<h5>${getState()}</h5>
								<div class="function">
									<ul>
										<li><button class="ui-button medium red" data-event="remove">삭제</button></li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
				`;
			} else {
				const getCategoryList = () => {
					const option = this.data.categoryList.map(item => {
						return `<option value="${item.code}">${item.name}</option>`;
					});
					return option.join("");
				};
				return `
					<div class="ui-form">
						<table>
							<tr>
								<th>플러스친구 아이디</th>
								<td>
									<input name="plusid" value="@" maxlength="32" data-event="plusId">
								</td>
							</tr>
							<tr>
								<th>핸드폰 번호</th>
								<td>
									<label class="ui-input-search">
										<input name="phonenumber" maxlength="32" placeholder="카카오채널 관리자에 등록된 핸드폰 번호">
										<button class="ui-button" data-event="authorize">인증번호요청</button>
									</label>
								</td>
							</tr>
							<tr>
								<th>카테고리</th>
								<td>
									<select class="ui-select" name="categorycode">
										<option value="">카테고리 선택</option>
										<option value="">카테고리 선택</option>
										${getCategoryList()}
									</select>
								</td>
							</tr>
							<tr>
								<th>인증번호</th>
								<td>
									<input name="authnum">
								</td>
							</tr>
						</table>
						<button class="ui-button blue" data-event="submit">등록</button>
					</div>
				`;
			}
		}
	},
	templateList : {
		container : undefined,
		data : {},
		open : function(context, mode) {
			this.data = context.data;
			this.mode = mode;
			if(!this.data.senderInfo) return;
			this.render();
		},
		render : function() {
			const section = this.container = document.querySelector("main [data-id='" + this.mode + "TemplateList']");
			const div = section.querySelector("div");
			section.classList.remove("hidden");
			div.innerHTML = this.template();
			const self = this.event.self = this;
			uiEvent(div, {
				click : {
					info : function() {self.event.info(this)},
					create : function() {self.event.create(this)},
					update : function() {self.event.update(this)},
					remove : function() {self.event.remove(this)},
					inspect : function() {self.event.inspect(this)},
					reject : function() {self.event.reject(this)},
				}
			});
		},
		event : {
			reject : function(object) {
				const sequence = this.getSequence(object);
				popupKakaoAlimtalk.info.open(this.self, sequence, true);
			},
			inspect : function(object) {
				const sequence = this.getSequence(object);
				if(!confirm("검수요청을 하시겠습니까?")) return;
				kakaoController.alimtalk.template.inspect(sequence).then(() => {
					alert("검수요청 되었습니다.");
					window.location.reload(true);
				}).catch(error => {
					alert("처리 중 오류가 발생하였습니다.");
				});
			},
			create : function(object) {
				const type = object.getAttribute("data-type");
				popupKakaoAlimtalk.template.open(this.self, 0, type);
			},
			update : function(object) {
				const sequence = this.getSequence(object);
				popupKakaoAlimtalk.template.open(this.self, sequence);
			},
			remove : function(object) {
				const div = object.parentNode.parentNode.parentNode;
				const seqKakaoAlimTalkTemplate = Number(div.getAttribute("data-sequence"));
				const type = div.getAttribute("data-type");
				const message = (type == "auto") ?
					'자동발송 템플릿을 삭제하면 더 이상 해당 템플릿을 SMS 자동문자발송 페이지에서 적용할 수 없습니다. 새로운 템플릿 등록까지는 4~5일 검수과정을 거쳐 승인된 이후 사용하실 수 있습니다. 정말로 이 템플릿을 삭제하시겠습니까?' :
					'일반발송 템플릿을 삭제하면 회원관리에서 알림톡 전송 시, 더 이상 해당 템플릿을 선택할 수 없습니다. 새로운 템플릿 등록까지는 4~5일 검수과정을 거쳐 승인된 이후 사용하실 수 있습니다. 정말로 이 템플릿을 삭제하시겠습니까?';
				if(!confirm(message)) return;
				kakaoController.alimtalk.template.remove({
					seqKakaoAlimTalkTemplate : seqKakaoAlimTalkTemplate
				}).then(() => {
					alert("삭제되었습니다.");
					window.location.reload(true);
				}).catch(error => {
					alert("처리 중 오류가 발생하였습니다.");
				});
			},
			info : function(object) {
				const sequence = this.getSequence(object);
				popupKakaoAlimtalk.info.open(this.self, sequence, false);
			},
			getSequence : function(object) {
				return Number(object.parentNode.parentNode.parentNode.getAttribute("data-sequence"));
			}
		},
		template : function() {
			const dataList = this.data[this.mode + "TemplateList"];
			const li = dataList.map(item => {
				const templateName = item.template.templtName;
				const templateStatus = item.template.status;
				const inspectStatus = item.template.inspStatus;
				const getStatus = () => {
					switch(inspectStatus) {
						case "REG" : return `<span class="blue">등록(검수대기)</span>`;
						case "REQ" : return `<span class="blue">심사요청(검수중)</span>`;
						case "APR" : return `<span class="green">승인</span>`;
						case "REJ" : return `<span class="red">반려</span>`;
					}
					return "알수없음";
				};
				const getButton = () => {
					const li = [];
					if(inspectStatus == "REJ")
						li.push(`<li><button class="ui-button medium red" data-event="reject">반려사유</button></li>`);
					if(inspectStatus != "APR" && inspectStatus != "REQ" && inspectStatus != "REJ")
						li.push(`<li><button class="ui-button medium blue" data-event="inspect">검수요청</button></li>`);
					if(templateStatus == "R" && (inspectStatus == "REG" || inspectStatus == "REJ"))
						li.push(`<li><button class="ui-button medium green" data-event="update">수정</button></li>`);
					li.push(`<li><button class="ui-button medium blue" data-event="info">보기</button></li>`);
					li.push(`<li><button class="ui-button medium red" data-event="remove">삭제</button></li>`);
					return li.join("");
				};
				return `
					<li>
						<h4>${templateName}</h4>
						<h5>${getStatus()}</h5>
						<div class="function" data-sequence="${item.seqKakaoAlimTalkTemplate}">
							<ul>
								${getButton()}
							</ul>
						</div>
					</li>
				`;
			});
			return `
				<div class="ui-grid">
					<ul>
						<li class="empty"><a data-type="${this.mode}" data-event="create">새로운 템플릿 등록</a></li>
						${li.join("")}
					</ul>
				</div>
			`;
		}
	}
};



const popupKakaoAlimtalk = {
	info : {
		popup : undefined,
		mode : "",
		data : {},
		open : function(context, seqKakaoAlimTalkTemplate, isReject) {
			if(this.popup) return;
			kakaoController.alimtalk.template.info(seqKakaoAlimTalkTemplate).then(data => {
				this.mode = (isReject) ? "reject" : "info";
				this.data = context.data;
				this.data.templateInfo = data;
				this.render();
			}).catch(error => {
				console.log(error);
				alert("데이터를 불러오는 중 오류가 발생하였습니다.");
			});
		},
		close : function() {
			this.popup = undefined;
			uiPopup();
		},
		render: function() {
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
			const isReject = (this.mode == "reject");
			const title = (isReject) ? `반려 사유 보기` : `템플릿 보기`;
			const senderName = this.data.senderInfo.profile.name;
			const templateInfo = this.data.templateInfo.template;
			const templateName = templateInfo.templtName;
			const templateContents = templateInfo.templtContent.replace(/(\n|\r\n)/g, "<br>");
			const getCommentList = () => {
				const div = templateInfo.comments.map(item => {
					const message = item.commentContent.replace(/(\\)/g, "<br>");
					return `
						<div class="balloon">
							<div class="subject reject">알림톡 검수 담당자</div>
							<div class="message">
								${message}
							</div>
							<div class="date">
								${uiDate(item.cdate, "time")}
							</div>
						</div>
					`;
				});
				return div.join("");
			};
			const getPreview = () => {
				return `
					<div class="preview">
						<div class="title"></div>
						<div class="contents">
							<div class="balloon">
								<div class="subject">알림톡 도착</div>
								<div class="message">
									${templateContents}
								</div>
							</div>
						</div>
					</div>
				`
			};
			const getContents = () => {
				return (isReject) ? `
					<tr>
						<th>검수 및 문의 내역</th>
						<td>
							<dl>
								<dt>
									<div>
										${getCommentList()}
									</div>
								</dt>
								<dd>${getPreview()}</dd>
							</div>
						</td>
					</tr>
				` : `
					<tr>
						<th>알림톡 내용</th>
						<td>${getPreview()}</td>
					</tr>
				`;
			};
			return `
				<div class="popupAlimtalk ${this.mode}">
					<div class="top">
						<h2>
							${title}
							<a data-event="close"></a>
						</h2>
					</div>
					<div class="middle template ui-form">
						<table>
							<tr>
								<th>플러스친구 ID</th>
								<td>${senderName}</td>
							</tr>
							<tr>
								<th>템플릿 이름</th>
								<td>${templateName}</td>
							</tr>
							${getContents()}
						</table>
					</div>
					<div class="bottom">
						<button class="ui-button gray" data-event="close">닫기</button>
					</div>
				</div>
			`;
		}
	},
	template : {
		popup : undefined,
		mode : "create",
		data : {},
		open : function(context, seqKakaoAlimTalkTemplate, type) {
			if(this.popup) return;
			this.data = context.data;
			this.mode = (seqKakaoAlimTalkTemplate) ? "update" : "create";
			this.data.templateInfo = {};
			this.data.templateInfo.prefix = "#{회원명}회원님 안녕하세요.";
			this.data.templateInfo.suffix = "-#{업체명}-";
			this.data.templateInfo.type = (type) ? type.toUpperCase() : null;
			if(this.mode == "update") {
				kakaoController.alimtalk.template.info(seqKakaoAlimTalkTemplate).then(data => {
					this.data.templateInfo = Object.assign(data, this.data.templateInfo);
					this.render();
				}).catch(error => {
					console.log(error);
					alert("데이터를 불러오는 중 오류가 발생하였습니다.");
				});
			} else {
				this.render();
			}
		},
		close : function() {
			this.popup = undefined;
			uiPopup();
		},
		check : function(data) {
			for(let name in data) {
				const value = data[name];
				const isEmpty = (!value);
				let error = "", focus = "";
				switch(name) {
					case "tplName"		: if(isEmpty) error = "템플릿 이름을 입력해 주세요."; focus = "name"; break;
					case "tplContent"	: if(isEmpty) error = "템플릿 내용을 입력해 주세요."; focus = "contents"; break;
				}
				if(error) {
					alert(error);
					const input = this.popup.querySelector("[name='" + focus + "']");
					if(input) input.focus();
					return false;
				}
			}
			return true;
		},
		submit : function() {
			const mode = this.mode;
			const templateInfo = this.data.templateInfo;
			const templateName = this.popup.getValue("name").trim();
			const templateContents = this.popup.getValue("contents");
			const prefix = (this.popup.getValue("prefix") == "Y") ? templateInfo.prefix : null;
			const suffix = (this.popup.getValue("suffix") == "Y") ? templateInfo.suffix : null;
			if(mode == "create") {
				const data = {
					tplName : templateName,
					tplContent : templateInfo.contents,
					content : templateContents,
					prefix : prefix,
					suffix : suffix,
					type : templateInfo.type
				};
				if(!this.check(data)) return;
				kakaoController.alimtalk.template.create(data).then(data => {
					console.log(data);
					alert("등록되었습니다.");
					window.location.reload(true);
				}).catch(error => {
					alert("처리 중 오류가 발생하였습니다.");
				});
			} else {
				const data = {
					seqKakaoAlimTalkTemplate : templateInfo.seqKakaoAlimTalkTemplate,
					tplCode : templateInfo.templtCode,
					tplName :templateName,
					tplContent : templateInfo.contents,
					content : templateContents,
					prefix : prefix,
					suffix : suffix
				};
				if(!this.check(data)) return;
				kakaoController.alimtalk.template.update(data).then(data => {
					console.log(data);
					alert("수정되었습니다.");
					window.location.reload(true);
				}).catch(error => {
					alert("처리 중 오류가 발생하였습니다.");
				});
			}
		},
		render : function() {
			console.log(this.data);
			const self = this.event.self = this;
			this.popup = uiPopup({
				template : this.template(),
				event : {
					click : {
						close : function() {self.close()},
						submit : function() {self.submit()}
					},
					change : {
						preview : function() {self.event.updatePreview()}
					},
					keyup : {
						preview : function() {self.event.updatePreview()}
					}
				}
			});
			if(this.mode == "update") this.prepare();
		},
		prepare : function() {
			const templateInfo = this.data.templateInfo;
			this.popup.putValue("name", templateInfo.templtName || "-");
			if(templateInfo.prefix)
				this.popup.putValue("prefix", "Y");
			if(templateInfo.suffix)
				this.popup.putValue("suffix", "Y");
			this.popup.putValue("contents", templateInfo.content);
			this.event.updatePreview();
		},
		event : {
			updatePreview : function() {
				const popup = this.self.popup;
				const templateInfo = this.self.data.templateInfo;
				const div = popup.querySelector("[data-id='message']");
				const contents = popup.getValue("contents");
				const prefix = (popup.getValue("prefix") == "Y") ? templateInfo.prefix + "\n" : "";
				const suffix = (popup.getValue("suffix") == "Y") ? "\n" + templateInfo.suffix : "";
				templateInfo.contents = prefix + contents + suffix;
				div.innerHTML = templateInfo.contents.replace(/(\n|\r\n)/g, "<br>");
				if(templateInfo.contents)
					div.classList.remove("empty");
				else
					div.classList.addd("empty");
			}
		},
		template : function() {
			const buttonColor = (this.mode == "update") ? "green" : "";
			const buttonName = (this.mode == "update") ? "수정" : "등록";
			const senderName = this.data.senderInfo.profile.name;
			return `
				<div class="popupAlimtalk">
					<div class="top">
						<h2>
							템플릿 ${buttonName}
							<a data-event="close"></a>
						</h2>
					</div>
					<div class="middle template ui-form">
						<form autocomplete="off">
							<table>
								<tr>
									<th>플러스친구 ID</th>
									<td>${senderName}</td>
								</tr>
								<tr>
									<th>템플릿 이름</th>
									<td><input name="name" maxlength="32" placeholder="템플릿 이름 입력"></td>
								</tr>
								<tr>
									<th>알림톡 내용</th>
									<td>
										<div class="top">
											<label class="ui-input-checkbox">
												<input name="prefix" type="checkbox" data-event="preview">
												<span></span>
												머리말
											</label>
											<label class="ui-input-checkbox">
												<input name="suffix" type="checkbox" data-event="preview">
												<span></span>
												꼬리말
											</label>
										</div>
										<div class="middle">
											<dl>
												<dt>
													<textarea class="ui-textarea" name="contents" placeholder="여기에 내용을 입력해 주세요." data-event="preview"></textarea>
												</dt>
												<dd>
													<div class="preview">
														<div class="title"></div>
														<div class="contents">
															<div class="balloon">
																<div class="subject">알림톡 도착</div>
																<div class="message empty" data-id="message"></div>
															</div>
														</div>
													</div>
												</dd>
											</dl>
										</div>
									</td>
								</tr>
							</table>
						</form>
					</div>
					<div class="bottom">
						<button class="ui-button gray" data-event="close">취소</button>
						<button class="ui-button ${buttonColor}" data-event="submit">${buttonName}</button>
					</div>
				</div>
			`;
		}
	}
};
</script>
</html>
</html>
