
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
.note .ui-note											{padding:20px; line-height:1.4; font-size:13.25px}
.note .ui-note ul li									{position:relative; padding-left:12px}
.note .ui-note ul li:before								{content:""; position:absolute; left:2px; top:10px; margin-top:-2px; width:4px; height:4px; background-color:#333; border-radius:100%}
.note .ui-note ul li.blue:before						{background-color:#004fec}
.note .ui-note ul li + li								{margin-top:5px}

.templateList											{margin:-15px -15px 0 -15px}
.templateList > ul										{text-align:left; font-size:0}
.templateList > ul > li									{display:inline-block; vertical-align:top; padding:15px; width:20%; min-width:320px; box-sizing:border-box}

.template												{line-height:35px; font-size:13px}
.template .ui-input-switch input + span					{height:19px; background-color:white; border-radius:19px}
.template .ui-input-switch input + span:after			{width:15px; height:15px}
.template .ui-input-switch input:checked + span:after	{left:22px}
.template dl dt											{width:75px; padding-right:10px}
.template dl dd select									{width:100%; max-width:100%}
.template dl dd select.time								{width:65px; margin-right:5px}

.template .top											{}
.template .top dt										{width:auto}
.template .top dd										{text-align:right}
.template .top .ui-note									{margin-top:5px}

.template .middle										{position:relative; margin:15px 0; padding:10px 15px 15px 15px; height:390px; border:1px solid #ccc; box-sizing:border-box}
.template .middle textarea								{height:150px}
.template .middle button								{position:absolute; left:15px; bottom:15px; right:15px; width:calc(100% - 30px)}

.template .middle li + li								{margin-top:10px}
.template .middle .info									{margin-bottom:10px; height:20px; line-height:20px}
.template .middle .info .left							{float:left}
.template .middle .info .right							{float:right}
.template .middle .contents > div						{display:none}
.template .middle .contents > div:first-child textarea	{margin-top:10px; height:104px}
.template .middle .contents.sms > div:last-child,
.template .middle .contents.alimTalk > div:first-child	{display:block}

.template .bottom										{line-height:1.3}
.template .bottom li + li								{margin-top:5px}
.template .bottom dd									{color:#004fec}

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

		<section class="note">
			<h2 class="ui-title">자동문자 발송 설정 방법 안내</h2>
			<div class="ui-note blue">
				<ul>
					<li>상황별 자동발송 기능을 사용하기 위해서는 'SMS 발송' 또는 '카카오 알림톡 발송 + SMS 발송'을 선택해야 합니다.<br>(카카오 알림톡으로 발송할 때는 SMS 발송은 반드시 함께 '사용'으로 선택되어 있어야 하며, 카카오톡 전송 실패 시 자동으로 SMS로 전송됩니다.)</li>
					<li>SMS 발송은 상황별로 해당 예문을 수정 후 제목 옆 버튼을 사용으로 변경하시고 수정 버튼을 누르시면 되고, 알림톡 발송은 사전에 승인된 템플릿을 선택 후 수정 버튼을 선택해서 저장해야 합니다.</li>
					<li>SMS 발송 시, 회원이름/번호와 같은 회원데이터에 따라 변경되는 부분은 하단의 예시를 보시고 해당되는 곳의 파란색 글자를 클릭하시면 문자 발송 시 해당 데이터로 변경되어 발송됩니다.</li>
					<li>알림톡 발송 시, 최대 한글로 1,000자까지 가능하며, 이용요금은 충전된 잔여 건수에서 1건(1회 발송 당) 차감됩니다.</li>
					<li>단문 문자발송(SMS) 글자수는 90바이트로 한글 45자, 영문 90자까지 가능하며 이용요금은 충전된 잔여 건수에서 1건(1회 발송 당) 차감됩니다.</li>
					<li>장문 문자발송(LMS) 글자수는 2,000바이트로 한글 1,000자, 영문 2,000자까지 가능하며 이용요금은 충전된 잔여 건수에서 3건(1회 발송 당) 차감됩니다.</li>
					<li>이미지가 첨부된 문자발송(MMS) 글자수는 2,000바이트로 한글 1,000자, 영문 2,000자까지 이미지를 첨부하여 발송 가능하며 이용요금은 충전된 잔여 건수에서 6건(1회 발송 당) 차감됩니다.</li>
					<li class="blue">발송(설정)하시려는 문자의 길이(바이트)를 반드시 확인하시고 설정해 주세요.<br>(문자의 길이(바이트)는 회원데이터의 내용에 따라 달라질수 있습니다.)</li>
				</ul>
			</div>
		</section>
		<section>
			<h2 class="ui-title">자동문자 발송 템플렛 설정</h2>
			<div class="templateList" data-id="templateList"></div>
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
		Promise.all([
			smsController.auto.list(),
			smsController.sender.list(),
			kakaoController.alimtalk.template.list()
		]).then(([smsList, senderList, alimTalkList]) => {
			this.data = {
				smsList : smsList || [],
				senderList : senderList || [],
				alimTalkList : (alimTalkList || []).filter(item => {
					return (item.template && item.template.inspStatus == "APR");
				})
			};
			this.render();
		}).catch(error => {
			uiError(error);
		});
	},
	update : function() {
		this.open();
	},
	render : function() {
		this.container = document.querySelector("main");
		const self = this.event.self = this;

		const section = this.container.querySelector("[data-id='templateList']");
		section.innerHTML = this.template();
		uiEvent(section, {
			keyup : {
				contents : function() {self.event.updateMessageInfo(this);}
			},
			change : {
				contents : function() {self.event.updateMessageInfo(this);},
				template : function() {self.event.updateTemplate(this);},
				alimTalk : function() {self.event.updateAlimTalk(this);},
			},
			click : {
				update : function() {self.event.update(this)}
			}
		});

		const form = section.querySelectorAll("form");
		this.data.smsList.forEach((item, index) => {
			const sendTime = (item.send_time || "").split(":");
			const template = this.event.getTemplate(item.seq_kakao_alim_talk_template);
			form[index].putValue("useYn", item.use_yn);
			form[index].putValue("useAlimTalkYn", item.use_kakao_alim_talk);
			form[index].putValue("contents", item.contents);
			form[index].putValue("seqSmsSender", item.seq_sms_sender);
			form[index].putValue("sendTarget", item.send_target);
			form[index].putValue("sendTimeHour", sendTime[0]);
			form[index].putValue("sendTimeMinute", sendTime[1]);
			form[index].putValue("seqKakaoAlimTalkTemplate", (template) ? item.seq_kakao_alim_talk_template : "");
			form[index].putValue("template", template);
			this.event.updateMessageInfo(form[index]);
			this.event.updateAlimTalk(form[index]);
		});
	},
	event : {
		check : function(form, data) {
		 	const isSms = (data.useYn == "Y");
		 	const isAlimTalk = (data.useKakaoAlimTalk == "Y");
			for(let name in data) {
				const value = data[name];
				const isEmpty = (!value);
				let error = "";
				switch(name) {
					case "useYn"		: if(isAlimTalk && !isSms) error = "카카오 알림톡을 사용하시려면, SMS를 사용 상태로 변경해 주세요."; break;
					case "contents"		: if(isSms && !isAlimTalk && isEmpty) error = "SMS 내용을 입력해 주세요."; break;
					case "seqSmsSender"	: if(isSms && isEmpty) error = "발신번호를 선택해 주세요."; break;
					case "seqKakaoAlimTalkTemplate" : if(isAlimTalk && isEmpty) error = "알림톡 템플릿을 선택해 주세요."; break;
				}
				if(error) {
					alert(error);
					const input = form.querySelector("[name='" + name + "']");
					if(input) input.focus();
					return false;
				}
			}
			return true;
		},
		update : function(object) {
			const seqSmsAutoSend = Number(object.getAttribute("data-sequence"));
			for(let i = 0; i < 5; i++) {
				if(object.tagName.toLowerCase() == "form") break;
				object = object.parentNode;
			}
			const form = object;
			const data = {
				seqSmsAutoSend : seqSmsAutoSend,
				useYn : form.getValue("useYn"),
				useKakaoAlimTalk : form.getValue("useAlimTalkYn"),
				seqKakaoAlimTalkTemplate : form.getValue("seqKakaoAlimTalkTemplate"),
				contents : form.getValue("contents"),
				seqSmsSender : form.getValue("seqSmsSender", true),
				sendTime : (form.getValue("sendTimeHour") || "00") + ":" + (form.getValue("sendTimeMinute") || "00"),
				sendTarget : (form.getValue("sendTarget") == "Y") ? "E" : null,
			};
			if(!this.check(form, data)) return;
			smsController.auto.update(data).then(data => {
				alert("수정되었습니다.");
				this.self.update();
			}).catch(error => {
				console.log(error);
				alert("처리 중 오류가 발생하였습니다.");
			});
		},
		getTemplate : function(seqKakaoAlimTalkTemplate) {
			if(!seqKakaoAlimTalkTemplate) return "";
			const data = this.self.data.alimTalkList.filter(item => {
				return (item.seqKakaoAlimTalkTemplate == seqKakaoAlimTalkTemplate);
			})[0];
			return (data && data.template) ? data.template.templtContent : "";
		},
		updateMessageInfo : function(form) {
			if(form.tagName.toLowerCase() != "form")
				form = form.parentNode;
			const contents = form.getValue("contents");
			const smsType = this.getMessageType(contents);
			const smsByte = this.getMessageByte(contents);
			form.putValue("smsType", smsType);
			form.putValue("smsByte", smsByte);
		},
		getMessageType : function(value) {
			const byte = this.getMessageByte(value);
			return (byte <= 90) ? "SMS" : "LMS";
		},
		getMessageByte : function(value) {
			return (function(s, b, i, c) {
				for (b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 2 : c >> 7 ? 2 : 1) ;
				return b
			})(value);
		},
		updateAlimTalk : function(form) {
			if(form.tagName.toLowerCase() != "form") {
				for(let i = 0; i < 10; i++) {
					if(form.tagName.toLowerCase() == "form") break;
					form = form.parentNode;
				}
			}
			const isAlimTalk = (form.getValue("useAlimTalkYn") == "Y");
			const div = form.querySelector("[data-id='contents']");
			div.className = "contents " + ((isAlimTalk) ? "alimTalk" : "sms");
		},
		updateTemplate : function(object) {
			const form = object.parentNode.parentNode.parentNode;
			const seqKakaoAlimTalkTemplate = form.getValue("seqKakaoAlimTalkTemplate", true);
			const template = this.getTemplate(seqKakaoAlimTalkTemplate);
			form.putValue("template", template);
		}
	},
	template : function() {
		const li = this.data.smsList.map(item => {
			const sendRoute = item.send_route;
			const getAlimTalkList = () => {
				const option = this.data.alimTalkList.map(item => {
					return `<option value="${item.seqKakaoAlimTalkTemplate}">${item.templtName}</option>`;
				});
				return option.join("");
			};
			const getTimeList = (max) => {
				const option = [];
				for(let i = 0; i < max; i++) {
					const value = i.zf(2);
					option.push(`<option value="${value}">${value}</option>`);
				}
				return option.join("");
			};
			const getSenderList = () => {
				const option = this.data.senderList.map(item => {
					return `<option value="${item.seq_sms_sender}">${item.phone}</option>`;
				});
				return option.join("");
			};
			const getSendTime = () => {
				if(sendRoute == "PAYMENT") return "";
				return `
					<li class="time">
						<dl>
							<dt>발송시간</dt>
							<dd>
								<select class="ui-select time" name="sendTimeHour">
									<option value="">시</option>
									${getTimeList(24)}
								</select>
								:
								<select class="ui-select time" name="sendTimeMinute">
									<option value="">분</option>
									${getTimeList(60)}
								</select>
							</dd>
						</dl>
					</li>
				`;
			};
			const getSendTarget = () => {
				if(sendRoute != "BIRTHDAY") return "";
				return `
					<li class="target">
						<dl>
							<dt>발송대상</dt>
							<dd>
								<label class="ui-input-checkbox">
									<input name="sendTarget" type="checkbox" value="E">
									<span></span>
									이용중인 회원
								</label>
							</dd>
						</dl>
					</li>
				`;
			};
			const getGuideTag = () => {
				switch(sendRoute) {
					case "PAYMENT" :
						return `
							<li><dl><dt>회원이름</dt><dd>[#MbName#]</dd></dl></li>
							<li><dl><dt>이용권명</dt><dd>[#productName#]</dd></dl></li>
							<li><dl><dt>결제금액</dt><dd>[#PayPrice#]</dd></dl></li>
							<li><dl><dt>결제일시</dt><dd>[#Date#]</dd></dl></li>
						`;
					case "BIRTHDAY" :
						return `
							<li><dl><dt>회원이름</dt><dd>[#MbName#]</dd></dl></li>
						`;
					default :
						return `
							<li><dl><dt>회원이름</dt><dd>[#MbName#]</dd></dl></li>
							<li><dl><dt>이용권명</dt><dd>[#productName#]</dd></dl></li>
							<li><dl><dt>만료일시</dt><dd>[#Date#]</dd></dl></li>
						`;
				}
			};
			return `
				<li class="template">
					<form name="${item.seq_sms_auto_send}" autocomplete="off">
						<div class="top">
							<h4>${item.sms_name}</h4>
							<div class="ui-note">
								<dl>
									<dt>
										<label class="ui-input-switch">
											<input name="useYn" type="checkbox">
											<span></span>
											<span>SMS 미사용</span>
											<span>SMS 사용</span>
										</label>
									</dt>
									<dd>
										<label class="ui-input-switch">
											<input name="useAlimTalkYn" type="checkbox" data-event="alimTalk">
											<span></span>
											<span>알림톡 미사용</span>
											<span>알림톡 사용</span>
										</label>
									</dd>
								</dl>
							</div>
						</div>
						<div class="middle">
							<ul>
								<li>
									<div class="info">
										<div class="left">
											<var data-msg="smsType">LMS</var>
										</div>
										<div class="right">
											예상 <var data-msg="smsByte">0</var> 바이트
										</div>
									</div>
									<div class="contents" data-id="contents">
										<div>
											<dl>
												<dt>템플릿</dt>
												<dd>
													<select class="ui-select" name="seqKakaoAlimTalkTemplate" data-event="template">
														<option value="">알림톡 템플릿 선택</option>
														<option value="">알림톡 템플릿 선택</option>
														${getAlimTalkList()}
													</select>
												</dd>
											</dl>
											<textarea class="ui-textarea" name="template" disabled></textarea>
										</div>
										<div>
											<textarea class="ui-textarea" name="contents" data-event="contents"></textarea>
										</div>
									</div>
								</li>
								<li class="sender">
									<dl>
										<dt>발신번호</dt>
										<dd>
											<select class="ui-select" name="seqSmsSender">
												<option value="">발신번호 선택</option>
												<option value="">발신번호 선택</option>
												${getSenderList()}
											</select>
										</dd>
									</dl>
								</li>
								${getSendTime()}
								${getSendTarget()}
								<li>
									<button class="ui-button green" type="button" data-sequence="${item.seq_sms_auto_send}" data-event="update">수정</button>
								</li>
							</ul>
						</div>
						<div class="bottom">
							<ul class="ui-note">
								${getGuideTag()}
							</ul>
						</div>
					</form>
				</li>
			`;
		});
		return "<ul>" + li.join("") + "</ul>";
	}
};

</script>
</html>
</html>
