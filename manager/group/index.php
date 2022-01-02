
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
	<link type="text/css" rel="stylesheet" href="/static/css/uiList.css?v=20210120">
	<style type="text/css">
main > .middle .left					{width:400px; overflow:visible}
main > .middle .right					{left:425px}

main .groupList							{line-height:1.3}
main .groupList li a					{padding:12px 10px 12px 75px !important}
main .groupList li a.focus				{background-color:rgba(33,150,243,0.15) !important; outline:1px solid #004fec; color:inherit !important}
main .groupList li a img				{position:absolute; left:10px; top:12px; width:50px; height:50px; background-color:#f0f0f0; border-radius:100%; border:1px solid #ccc; object-fit:cover}
main .groupList li a h4					{padding-right:85px; font-size:16px}
main .groupList li a h5					{margin-top:2px; padding-right:85px; font-size:13.5px}
main .groupList li a p					{margin-top:5px; padding:8px 10px; background-color:#f0f0f0; line-height:1.4}
main .groupList li span					{position:absolute; top:18px; right:51px; padding:0 5px 1px 5px; background-color:white; border:1px solid #ccc; line-height:19px; text-align:center; font-size:12px}
main .groupList li button				{margin-top:0 !important; top:18px !important}
main > .middle .right.empty:after		{content:"선택된 그룹이 없습니다."}

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
		<div class="top" data-id="search">
			<div class="left">
				<select class="ui-select" name="seqPartnerCoach" data-event="coach">
					<option value="">담당강사 선택</option>
					<option value="" selected>전체</option>
				</select>
				<div class="keyword">
					<input name="keyword" type="text" placeholder="검색어 입력 (최소 2자 이상)" autocomplete="off" data-event="keyword">
					<a data-event="reset"></a>
				</div>
			</div>
			<div class="right">
				<button class="ui-button white" data-event="sms" disabled>일괄 문자 발송</button>
				<button class="ui-button green" data-event="add" disabled>그룹 회원 추가</button>
			</div>
		</div>
		<div class="middle">
			<div class="left" data-id="groupList">
				<div class="top">
					그룹 목록
				</div>
				<div class="middle">
					<ul class="groupList"></ul>
				</div>
				<div class="bottom">
					<button data-event="create"><span></span>새로운 그룹 등록</button>
				</div>
			</div>
			<div class="right" data-id="memberList">
				<table class="ui-table dark even checkbox">
					<thead>
						<tr>
							<th data-order="false">
								<label class="ui-input-checkbox">
									<input name="seqMember" type="checkbox">
									<span></span>
								</label>
							</th>
							<td>회원명</td>
							<td>휴대폰 번호</td>
							<td>성별</td>
							<td>나이</td>
							<td>기타</td>
						</tr>
					</thead>
					<tbody>
						<tr><td class="empty" colspan="10">선택된 그룹이 없습니다.</td></tr>
					</tbody>
				</table>
			</div>
		</div>
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
		commonController.coachList().then(data => {
			this.data.coachList = data || [];
			this.data.search = {};
			this.render();
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	render : function() {
		const container = this.container = document.querySelector("main");
		const self = this.event.self = this;
		const setGroupList = () => {
			const div = container.querySelector("[data-id='groupList']");
			const button = div.querySelector("[data-event='create']");
			button.addEventListener("click", () => {this.event.createGroup()});
			this.groupList.open(this);
		};
		const setMemberList = () => {
			this.memberList.open(this);
		};
		const setSearch = () => {
			const div = container.querySelector("[data-id='search']");
			const select = div.querySelector("[name='seqPartnerCoach']");
			select.innerHTML += this.event.getCoachList();
			uiEvent(div, {
				change : {
					coach : function() {self.event.changeFilter();},
				},
				input : {
					keyword : function() {self.event.changeFilter();},
				},
				click : {
					sms : function() {self.event.sendSms();},
					add : function() {self.event.addMember();},
					reset : function() {
						this.parentNode.querySelector("input").value = "";
						self.event.changeFilter();
					}
				}
			});
		};
		setSearch();
		setGroupList();
		setMemberList();
	},
	event : {
		changeFilter : function() {
			const div = this.self.container.querySelector("[data-id='search']");
			const seqPartnerCoach = div.getValue("seqPartnerCoach", true);
			const input = div.querySelector("[name='keyword']");
			const keyword = input.value.trim();
			if(keyword)
				input.parentNode.classList.add("focus");
			else
				input.parentNode.classList.remove("focus");
			this.self.data.search = {
				seqPartnerCoach : seqPartnerCoach,
				keyword : (keyword.length < 2) ? "" : keyword
			}
			doPage.groupList.update();
			doPage.memberList.update();
		},
		getCoachList : function(isFilter) {
			const groupList = this.self.data.groupList || [];
			const option = this.self.data.coachList.filter(item => {
				if(isFilter) {
					const seqPartnerCoach = item.seqPartnerCoach;
					return groupList.some(item => {
						return (item.seqPartnerCoach == seqPartnerCoach);
					});
				} else {
					return true;
				}
			}).map(item => {
				return `<option value="${item.seqPartnerCoach}">${item.coachName}</option>`;
			});
			return option.join("");
		},
		createGroup : function() {
			this.self.popup.group.open();
		},
		setButton : function(isActive) {
			const div = this.self.container.querySelector("[data-id='search']");
			div.querySelectorAll("button[data-event]").forEach(item => {
				item.disabled = (isActive) ? false : true;
			});
		},
		addMember : function() {
			doPage.popup.member.open(this.self);
		},
		sendSms : function() {
			const div = this.self.container.querySelector("[data-id='memberList']");
			const inputList = div.querySelectorAll("tbody [name='seqMember']:checked");
			const memberList = this.self.data.memberList;

			const checkList = Array.from(inputList).map(item => {
				const seqMember = Number(item.value);
				const memberInfo = memberList.filter(item => {
					return (item.seqMember == seqMember);
				})[0];
				return {
					seqMember : memberInfo.seqMember,
					receiveNumber : memberInfo.mobile,
					memberName : memberInfo.name,
					sendRoute : "MEMBER",
					reservationYn : "N",
				};
			});
			if(checkList.length == 0) {
				alert("선택된 회원이 없습니다.");
				return;
			}
			popupSmsSend.open({
				smsMemberList : checkList
			});
		}
	},

	groupList : {
		container : undefined,
		data : {},
		open : function(context, seqGroup) {
			partnerController.group.search().then(data => {
				if(context) this.data = context.data;
				this.data.seqGroup = (seqGroup) ? seqGroup : 0;
				this.data.groupList = data || [];
				this.render();
			}).catch(error => {
				console.log(error);
				alert("데이터를 가져오는데 실패하였습니다.");
			});
		},
		update : function() {
			this.render(true);
		},
		filter : function(data) {
			const seqPartnerCoach = this.data.search.seqPartnerCoach;
			const keyword = this.data.search.keyword;
			return data.filter(item => {
				let result = true;
				if(seqPartnerCoach && item.seqPartnerCoach != seqPartnerCoach) result = false;
				if(keyword && item.name.indexOf(keyword) == -1 && item.coachName.indexOf(keyword) == -1) result = false;
				return result;
			});
		},
		render : function(isUpdate) {
			this.container = document.querySelector("main [data-id='groupList']");
			const keyword = this.data.search.keyword;
			const ul = this.container.querySelector("ul");
			const li = this.filter(this.data.groupList).map(item => {
				const thumbnail = (item.coachImgUrl) ? item.coachImgUrl : "/static/img/login/" + ((item.coachGender == "F") ? "female.jpg" : "male.jpg");
				const period = uiDate(item.startDt) + " ~ " + uiDate(item.endDt);
				const isFocus = (this.data.seqGroup == item.seqGroup) ? "focus" : "";
				let memberName = item.name;
				let coachName = item.coachName;
				if(keyword) {
					if(memberName.indexOf(keyword) > -1)
						memberName = memberName.replaceAll(keyword, `<i class="red">${keyword}</i>`);
					if(coachName.indexOf(keyword) > -1)
						coachName = coachName.replaceAll(keyword, `<i class="red">${keyword}</i>`);
				}
				const description = uiSafeValue(item.contents);
				return `
					<li data-sequence="${item.seqGroup}">
						<a class="${isFocus}" data-event="focus">
							<img src="${thumbnail}"/>
							<h4>${memberName}</h4>
							<h5>${item.employeeTypeName || ""} ${coachName}</h5>
							<p>${period} · ${getComma(item.memberCount)}명</p>
						</a>
						<span class="ui-tip none" data-tip-color="gray" data-tip="${description}">설명</span>
						<button class="ui-button medium white" data-event="update">수정</button>
					</li>
				`;
			});
			ul.innerHTML = (li.length == 0 && isUpdate) ? `<li class="empty">검색 결과가 없습니다.</li>` : li.join("");
			const self = this.event.self = this;
			uiEvent(ul, {
				click : {
					focus : function() {self.event.changeFocus(this)},
					update: function() {self.event.updateGroup(this)}
				}
			});
			uiTip(ul);
			doPage.event.setButton((this.data.seqGroup));
		},
		event : {
			changeFocus : function(object) {
				const container = this.self.container;
				const a = container.querySelectorAll("a");
				a.forEach(item => {
					if(item != object)
						item.className = "";
				});
				const isFocus = (object.classList.toggle("focus"));
				const seqGroup = (isFocus) ? Number(object.parentNode.getAttribute("data-sequence")) : 0;
				doPage.memberList.update(seqGroup);
				doPage.event.setButton(isFocus);
			},
			updateGroup : function(object) {
				const seqGroup = Number(object.parentNode.getAttribute("data-sequence"));
				doPage.popup.group.open(this.self, seqGroup);
			}
		}
	},
	memberList : {
		container : undefined,
		data : {},
		open : function(context) {
			if(context) this.data = context.data;
			this.data.memberList = [];
			this.render();
		},
		update : function(seqGroup) {
			if(seqGroup) {
				partnerController.group.member.info(seqGroup).then(data => {
					this.data.memberList = data.memberList || [];
					this.data.groupInfo = data.groupInfo || {};
					this.data.seqGroup = seqGroup;
					this.render(true);
				}).catch(error => {
					console.log(error);
				});
			} else {
				this.data.memberList = [];
				this.data.groupInfo = {};
				this.data.seqGroup = 0;
				this.render(true);
			}
		},
		render : function() {
			this.container = document.querySelector("main [data-id='memberList']");
			const tbody = this.container.querySelector("tbody");
			const tr = this.data.memberList.map(item => {
				return `
					<tr>
						<th>
							<label class="ui-input-checkbox">
								<input name="seqMember" type="checkbox" value="${item.seqMember}">
								<span></span>
							</label>
						</th>
						<td>${item.name}</td>
						<td>${item.mobile}</td>
						<td>${(item.gender == "남") ? "남성" : "여성"}</td>
						<td>${item.age}세</td>
						<td>
							<a href="/member/${item.seqMember}/home">
								<button class="ui-button medium white">상세</button>
							</a>
							<button class="ui-button medium white" data-sequence="${item.seqMember}" data-event="remove">삭제</button>
						</td>
					</tr>
				`;
			});
			const isFocus = (this.data.seqGroup);
			const isEmpty = (tr.length == 0);
			tbody.innerHTML = (isEmpty && isFocus) ? `<tr><td class="empty" colspan="10">등록된 회원이 없습니다.</td></tr>` : tr.join("");
			if(!isFocus && isEmpty)
				this.container.classList.add("empty");
			else
				this.container.classList.remove("empty");

			uiTable(this.container);
			const self = this.event.self = this;
			uiEvent(this.container, {
				click : {
					remove : function() {self.event.removeMember(this)}
				}
			});
		},
		event : {
			removeMember : function(object) {
				const seqMember = Number(object.getAttribute("data-sequence"));
				const seqGroup = this.self.data.groupInfo.seqGroup;
				if(seqMember && seqGroup) {
					if(!confirm("정말로 삭제하시겠습니까?")) return;
					partnerController.group.member.del(seqGroup, seqMember).then(data => {
						alert("삭제되었습니다.");
						this.self.update(seqGroup);
					}).catch(error => {
						console.log(error);
						alert("삭제에 실패하였습니다.");
					});
				}
			}
		}
	},
	popup : {
		group : {
			popup : undefined,
			mode : "create",
			data : {},
			open : function(context, seqGroup) {
				if(this.popup) return;
				this.mode = (seqGroup) ? "update" : "create";
				if(seqGroup) {
					this.data = context.data.groupList.filter(item => {
						return (item.seqGroup == seqGroup);
					})[0];
				} else {
					this.data = {};
				}
				this.render();
			},
			close : function(isUpdate, isRemove) {
				this.popup = undefined;
				uiPopup();
				if(isUpdate) {
					const seqGroup = doPage.data.seqGroup;
					doPage.groupList.open(undefined, (isRemove) ? 0 : seqGroup);
					if(isRemove) doPage.memberList.update();
				}
			},
			render : function() {
				const self = this.event.self = this;
				this.popup = uiPopup({
					template : this.template(),
					event : {
						click : {
							close : function() {self.close()},
							remove : function() {self.event.remove()},
							update : function() {self.event.update()},
							create : function() {self.event.create()},
						}
					}
				});
				uiCalendar(this.popup);
				if(this.mode == "update") {
					this.popup.putValue("name", this.data.name);
					this.popup.putValue("startDt", new Date(this.data.startDt).format("yyyy-mm-dd"));
					this.popup.putValue("endDt", new Date(this.data.endDt).format("yyyy-mm-dd"));
					this.popup.putValue("seqPartnerCoach", this.data.seqPartnerCoach);
					this.popup.putValue("contents", this.data.contents);
				}
			},
			event : {
				check : function(data) {
					for(let name in data) {
						let value = data[name];
						if(typeof(value) == "string") value = value.trim();
						const isEmpty = (!value);
						let error = "";
						switch(name) {
							case "name" :
								if(!value) error = "이름을 입력해 주세요.";
								else if(value.length < 2) error = "이름을 최소 2자 이상 입력해 주세요.";
								break;
							case "startDt" :
								if(isEmpty) error = "시작날짜를 입력해 주세요.";
								break;
							case "endDt" :
								if(isEmpty) error = "종료날짜를 입력해 주세요.";
								else if(getPeriod(data.startDt, data.endDt) < 0) error = "종료 날짜를 시작 날짜 보다 크게 설정해 주세요.";
								break;
							case "seqPartnerCoach" : if(isEmpty) error = "담당 강사를 선택해 주세요."; break;
							case "contents" :
								if(!value) error = "내용을 입력해 주세요.";
								else if(value.length < 10) error = "내용을 최소 10자 이상 입력해 주세요.";
								break;
						}
						if(error) {
							alert(error);
							const input = this.self.popup.querySelector("[name='" + name + "'");
							if(input) input.focus();
							return false;
						}
					}
					return true;
				},
				remove : function() {
					if(!confirm("정말로 삭제하시겠습니까?")) return;
					const seqGroup = this.self.data.seqGroup;
					partnerController.group.remove(seqGroup).then(data => {
						alert("삭제되었습니다.");
						this.self.close(true, true);
					}).catch(error => {
						console.log(error);
						alert("삭제에 실패하였습니다.");
					});
				},
				update : function() {
					const seqGroup = this.self.data.seqGroup;
					const popup = this.self.popup;
					const data = {
						name : popup.getValue("name"),
						startDt : popup.getValue("startDt"),
						endDt : popup.getValue("endDt"),
						seqPartnerCoach : popup.getValue("seqPartnerCoach", true),
						contents : popup.getValue("contents")
					};
					if(seqGroup) data.seqGroup = seqGroup;
					if(!this.check(data)) return;
					const name = (seqGroup) ? "수정" : "등록";
					partnerController.group[(seqGroup) ? "update" : "create"](data).then(data => {
						alert(name + "되었습니다.");
						this.self.close(true);
					}).catch(error => {
						console.log(error);
						alert(name + "에 실패하였습니다.");
					});
				},
			},
			template : function() {
				const title = (this.mode == "update") ? "그룹 수정" : "그룹 등록";
				const getBottom = () => {
					return (this.mode == "update") ? `
						<button class="ui-button red" data-event="remove">삭제</button>
						<button class="ui-button green" data-event="update">수정</button>
					` : `
						<button class="ui-button" data-event="update">등록</button>
					`;
				};
				return `
					<style type="text/css">
						.popupGroup	{}
						.popupGroup .name	{width:100% !important; max-width:100% !important}
					</style>
					<div class="popupGroup tiny">
						<div class="top">
							<h2>
								${title}
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle ui-form">
							<form autocomplete="off">
								<table>
									<tr>
										<th>그룹주제</th>
										<td><input class="name" name="name" type="text" maxlength="32" placeholder="주제를 입력해 주세요. (최소 2자 이상)"></td>
									</tr>
									<tr>
										<th>시작날짜</th>
										<td><input name="startDt" type="calendar" value="today"></td>
									</tr>
									<tr>
										<th>종료날짜</th>
										<td><input name="endDt" type="calendar" value="today"></td>
									</tr>
									<tr>
										<th>담당강사</th>
										<td>
											<select class="ui-select" name="seqPartnerCoach">
												<option value="">담당강사 선택</option>
												${doPage.event.getCoachList()}
											</select>
										</td>
									</tr>
									<tr>
										<th>그룹설명</th>
										<td><textarea class="ui-textarea" name="contents" maxlength="200" placeholder="내용을 입력해 주세요. (최소 10자 이상)"></textarea></td>
									</tr>
								</table>
							</form>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">취소</button>
							${getBottom()}
						</div>
					</div>
				`;
			}
		},
		member : {
			popup : undefined,
			data : {},
			open : function() {
				if(this.popup) return;
				this.data.seqGroup = doPage.data.seqGroup;
				this.render();
			},
			close : function(isUpdate) {
				this.popup = undefined;
				uiPopup();
				if(isUpdate) {
					const seqGroup = this.data.seqGroup;
					doPage.groupList.open(undefined, seqGroup);
					doPage.memberList.update(seqGroup);
				}
			},
			submit : function() {
				const memberList = Array.from(this.popup.querySelectorAll("[name='seqMember']:checked")).map(item => item.value);
				if(memberList.length == 0) {
					alert("검색 후 등록하실 회원을 선택해 주세요.");
					return;
				}
				partnerController.group.member.add({
					seqGroup : this.data.seqGroup,
					checkedSeqMember : memberList.join(",")
				}).then(data => {
					alert("등록되었습니다.");
					this.close(true);
				}).catch(error => {
					alert("등록에 실패하였습니다.");
				});
			},
			render : function() {
				const self = this.event.self = this;
				this.popup = uiPopup({
					template : this.template(),
					event : {
						click : {
							close : function() {self.close();},
							search : function() {self.event.search();},
							submit : function() {self.submit();}
						},
						keydown : {
							searchWord : function(event) {
								if(event.keyCode == 13)
									self.event.search();
							}
						}
					}
				});
			},
			event : {
				search : function(event) {
					const searchWord = this.self.popup.getValue("searchWord").trim();
					if(!searchWord) {
						alert("검색어를 입력해 주세요.");
						return;
					};
					partnerController.group.member.search({
						memberSearchWord : searchWord
					}).then(data => {
						this.self.data.memberList = data || [];
						this.updateMemberList();
					}).catch(error => {
						console.log(error);
					});
				},
				updateMemberList : function() {
					const memberList = this.self.data.memberList;
					const li = memberList.map(item => {
						const thumbnail = (item.imgUrl) ? item.imgUrl : "/static/img/login/" + ((item.sex == "M") ? "male.jpg" : "female.jpg");
						return `
							<li>
								<label>
									<input name="seqMember" type="checkbox" value="${item.seqMember}">
									<span></span>
									<img src="${thumbnail}" />
									<h4>${item.name}</h4>
									<p>${item.age}세 / ${item.gender} / ${item.mobile}</p>
								</label>
							</li>
							`;
						});
					const ul = this.self.popup.querySelector("[data-id='memberList']");
					ul.innerHTML = (li.length == 0) ? `<li class="empty">검색 결과가 없습니다.</li>` : li.join("");
				}
			},
			template : function() {
				return `
					<style type="text/css">
						.popupMember									{}
						.popupMember .ui-input-search					{display:block}
						.popupMember .ui-input-search input				{width:100% !important; max-width:100%; box-sizing:border-box}
						.popupMember .box								{margin-top:15px; height:300px; background-color:#ccc; border:1px solid #ccc; overflow-y:auto}
						.popupMember .box li							{background-color:white}
						.popupMember .box li + li						{border-top:1px solid #ccc}
						.popupMember .box li label						{position:relative; display:block; padding:12px; padding-left:60px; overflow:hidden}
						.popupMember .box li label h4					{line-height:1.3; font-size:14px}
						.popupMember .box li label p					{color:#555}
						.popupMember .box li label img					{position:absolute; left:10px; top:50%; margin-top:-20px; width:40px; height:40px; background-color:#f0f0f0; border-radius:100%; border:1px solid #ccc; object-fit:cover}
						.popupMember .box li label input				{position:absolute; left:-999px; width:0; height:0}
						.popupMember .box li label input:checked + span	{position:absolute; left:10px; top:50%; margin-top:-20px; width:40px; height:40px; border-radius:100%; background:rgba(55,183,114,0.66) url(/static/img/icon/icon_check_white.png) no-repeat center center / 19px; border:1px solid #37b772; z-index:2}
						.popupMember .box li.empty						{padding:8px; text-align:center}
					</style>
					<div class="popupMember tiny">
						<div class="top">
							<h2>
								회원 추가
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle">
							<label class="ui-input-search">
								<input name="searchWord" type="text" placeholder="이름 또는 휴대폰 번호" autocomplete="off" data-event="searchWord">
								<button class="ui-button" data-event="search">회원 검색</button>
							</label>
							<div class="box">
								<ul data-id="memberList">
									<li class="empty">검색 결과가 없습니다.</li>
								</ul>
							</div>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">취소</button>
							<button class="ui-button" data-event="submit">추가</button>
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
