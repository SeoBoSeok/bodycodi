
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
	<script type="text/javascript" src="/static/js/controller/batchController.js?v=20200104"></script>
	<script type="text/javascript" src="/static/js/common/jquery/jquery.dataTables.min.js"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/jquery/jquery.dataTables.css" />
	<style type="text/css">
.extensionList table td button:disabled		{opacity:0.33}
	</style>
</head>
<body>



<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="고객관리">
	<div class="right">
		<a href="/member">회원 검색</a>
		<a class="focus" href="/member-counseling/index">회원 관리</a>
		<a href="/sales/member-prospective">잠재고객 관리</a>
		<a href="/member/notice/getNotice">커뮤니티 관리</a>
		<a href="/sales/analysis">세일즈 성과 분석</a>
	</div>
</nav>
<aside class="ui-side">
	<div class="menu">
		<h4>회원 관리</h4>
		<ul>
			
				<li><a href="/member/app/approve">회원앱 연동신청 관리</a></li>
			
			<li><a href="/member-counseling/index">고객 상담</a></li>
			<li><a href="/batch-extension/history">만료일 연장 내역</a></li>
		</ul>
	</div>
	<script type="text/javascript">
		(function() {
			const pathname = window.location.pathname;
			const a = document.querySelector(".ui-side").querySelectorAll("a");
			a.forEach(item => {
				if(pathname == item.getAttribute("href")) {
					item.parentNode.classList.add("focus");
				}
			});
		})();
	</script>
</aside>


<!-- 콘텐츠 -->
<main>
	<section class="extensionList">
		<h2 class="ui-title">만료일 연장 내역</h2>
		<div data-id="extensionList">
			<table class="ui-data-table dark even">
				<thead>
					<tr>
						<td>번호</td><td>실행일시</td><td>기준일</td>
						<td>중지기간 제외 여부</td><td>연장일수</td><td>연장된 회원 수</td><td>연장된 이용권 수</td><td>복구된 이용권 수</td>
						<td>상태</td><td>복구일시</td><td>연장 담당자</td><td>복구 담당자</td><td>기타</td>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
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
	data : {},
	permission : {},
	open : function() {
		Promise.all([
			batchController.pass.extension.list(),
			permissionController.getList()
		]).then(([data, permission]) => {
			this.data.extensionList = data || [];
			this.permission = uiPermission.data = permission;
			this.render();
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	update : function() {
		batchController.pass.extension.list().then(data => {
			this.data.extensionList = data || [];
			this.render();
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	render : function() {
		this.container = document.querySelector("[data-id='extensionList']");
		const self = this.event.self = this;
		this.container.innerHTML = this.template();
		uiEvent(this.container, {
			click : {
				rollback : function() {self.event.rollback(this)},
				info : function() {self.event.info(this)}
			}
		});
		uiTable(this.container);
		uiPermission(this.container);
	},
	event : {
		rollback : function(object) {
			const seqBatchExtensionHistory = Number(object.parentNode.parentNode.getAttribute("data-sequence"));
			if(!confirm("정말로 복구하시겠습니까?")) return;
			batchController.pass.extension.rollback(seqBatchExtensionHistory).then(data => {
				alert("복구되었습니다.");
				doPage.update();
			}).catch(error => {
				console.log(error);
				alert("처리 중 오류가 발생하였습니다.");
			});
		},
		info : function(object) {
			const seqBatchExtensionHistory = Number(object.parentNode.parentNode.getAttribute("data-sequence"));
			this.self.popup.open(seqBatchExtensionHistory, this.self.permission);
		}
	},
	template : function() {
		const tr = this.data.extensionList.map(item => {
			const extensionType = (item.extensionType == "ALL") ? "포함" : "미포함";
			const stateName = (item.state == "EXTENSION") ? "연장" : (item.state == "FULL_ROLLBACK") ? "전체 복구" : (item.state == "UNIT_ROLLBACK") ? "부분 복구" : "-";
			const stateColor = (item.state == "EXTENSION") ? "green" : (item.state == "FULL_ROLLBACK") ? "red" : (item.state == "UNIT_ROLLBACK") ? "orange" : "-";
			const rollbackDate = (item.state != "EXTENSION") ? uiDate(item.rollbackDateTime, "time") : "-";
			const rollbackEvent = (item.state == "FULL_ROLLBACK") ? "" : "rollback";
			const rollbackDisabled = (item.state == "FULL_ROLLBACK") ? "disabled" : "";
			const extensionCoachName = (item.executeCoach) ? item.executeCoach.coachName : "-";
			const rollbackCoachName = (item.rollbackCoach) ? item.rollbackCoach.coachName : "-";
			return `
				<tr data-sequence="${item.seqBatchExtensionHistory}">
					<td>${item.seqBatchExtensionHistory}</td>					
					<td>${uiDate(item.executeDateTime, "time")}</td>			
					<td>${uiDate(item.extensionDate)}</td>						
					<td>${extensionType}</td>									
					<td>${getComma(item.extensionDay || 0)}일</td>				
					<td>${getComma(item.extensionMemberCount || 0)}명</td>		
					<td>${getComma(item.extensionPassInfoCount || 0)}건</td>	
					<td>${getComma(item.rollbackPassInfoCount || 0)}건</td>	
					<td class="${stateColor}">${stateName}</td>				
					<td>${rollbackDate}</td>									
					<td>${extensionCoachName}</td>								
					<td>${rollbackCoachName}</td>								
					<td>														
						<button class="ui-button small white" data-event="info">상세</button>
						<button class="ui-button small white ${rollbackDisabled}" data-event="${rollbackEvent}" data-permission="permissionMember/batchExtension">복구</button>
					</td>
				</tr>
			`;
		});
		return `
			<table class="ui-data-table dark even">
				<thead>
					<tr>
						<td>번호</td><td>실행일시</td><td>기준일</td>
						<td>중지기간 제외 여부</td><td>연장일수</td><td>연장된 회원 수</td><td>연장된 이용권 수</td><td>복구된 이용권 수</td>
						<td>상태</td><td>복구일시</td><td>연장 담당자</td><td>복구 담당자</td><td>기타</td>
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
		data : {},
		permission : {},
		open : function(seqBatchExtensionHistory) {
			if(this.popup) return;
			batchController.pass.extension.info(seqBatchExtensionHistory).then(data => {
				this.data.extensionInfo = data || {}
				this.data.search = {keyword : ""};
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
		update : function() {
			const seqBatchExtensionHistory = this.data.extensionInfo.seqBatchExtensionHistory;
			batchController.pass.extension.info(seqBatchExtensionHistory).then(data => {
				this.data.extensionInfo = data || {}
				this.render(true);
			}).catch(error => {
				console.log(error);
				alert("데이터를 가져오는데 실패하였습니다.");
			});
		},
		filter : function(data) {
			const keyword = this.data.search.keyword;
			return data.filter(item => {
				const serviceType = uiParameter.service.name[item.serviceType];
				return (keyword && item.serviceName.indexOf(keyword) == -1 && serviceType.indexOf(keyword) == -1 && item.memberName.indexOf(keyword) == -1) ? false : true;
			});
		},
		render : function(isUpdate) {
			const self = this.event.self = this;
			if(!isUpdate) {
				this.popup = uiPopup({
					template : this.template(),
					event : {
						click : {
							close : function() {self.close()},
							reset : function() {
								this.parentNode.querySelector("input").value = "";
								self.event.changeFilter();
							},
							rollback : function() {self.event.rollback()}
						},
						input : {
							keyword : function() {self.event.changeFilter()}
						}
					}
				});
				uiTable(this.popup);
			}
			this.event.updateList();
			uiPermission(this.popup);
		},
		event : {
			rollback : function() {
				const seqBatchExtensionHistory = this.self.data.extensionInfo.seqBatchExtensionHistory;
				let sequenceList = this.self.popup.querySelectorAll("tbody [name='seqBatchExtensionHistoryPassInfo']:checked");
				sequenceList = Array.from(sequenceList).map(item => {
					return Number(item.value);
				});
				if(sequenceList.length == 0) {
					alert("선택된 내역이 없습니다.");
					return;
				}
				if(!confirm("선택한 내역을 복구하시겠습니까?")) return;
				batchController.pass.extension.rollback(seqBatchExtensionHistory, sequenceList).then(data => {
					alert("선택한 내역이 복구되었습니다.");
					this.self.update();
					doPage.update();
				}).catch(error => {
					console.log(error);
					alert("처리 중 오류가 발생하였습니다.");
				});
			},
			changeFilter : function() {
				const input = this.self.popup.querySelector("[name='keyword']");
				const keyword = input.value.trim();
				const table = this.self.popup.querySelector("table");
				const dataTable = $(table).DataTable();
				if(keyword)
					input.parentNode.classList.add("focus");
				else
					input.parentNode.classList.remove("focus");
				dataTable.search(keyword).draw();
			},
			updateList : function() {
				const div = this.self.popup.querySelector("[data-id='list']");
				const table = div.querySelector("table");
				const extensionInfo = this.self.data.extensionInfo;
				const dataList = extensionInfo.batchExtensionHistoryPassInfos || [];
				const data = dataList.map(item => {
					let memberName = item.memberName;
					let serviceName = item.serviceName;
					let serviceType = uiParameter.service.name[item.serviceType];
					let seqPassInfo = String(item.seqPassInfo);
					const stateName = (item.state == "EXTENSION") ? "연장" : "복구";
					const stateColor = (item.state == "EXTENSION") ? "green" : "red";
					const rollbackDate = (item.state != "EXTENSION") ? uiDate(item.rollbackDateTime, "time") : "-";
					const rollbackCoachName = (item.rollbackCoach) ? item.rollbackCoach.coachName : "-";
					const getCheckBox = () => {
						return (item.state == "EXTENSION") ? `
							<label class="ui-input-checkbox">
								<input name="seqBatchExtensionHistoryPassInfo" type="checkbox" value="${item.seqBatchExtensionHistoryPassInfo}">
								<span></span>
							</label>
						` : ``;
					};
					return [
						getCheckBox(),
						item.seqBatchExtensionHistoryPassInfo,
						memberName,
						seqPassInfo,
						serviceType,
						serviceName,
						item.extensionDay + "일",
						uiDate(item.useStartDate),
						uiDate(item.useEndDateBefore),
						uiDate(item.useEndDateAfter),
						`<span class="${stateColor}">${stateName}</span>`,
						rollbackDate,
						rollbackCoachName
					];
				});
				uiDataTable(table, data);
			}
		},
		template : function() {
			return `
				<style type="text/css">
					.popupExtension	 									{max-width:1024px}
					.popupExtension .dataTables_wrapper					{margin-top:0}

					.popupExtension .search								{margin-bottom:10px; height:35px; font-size:0}
					.popupExtension .search .left						{float:left}
					.popupExtension .search .right						{float:right}
					.popupExtension .search input						{text-align:center; font-size:13px}
					.popupExtension .search button						{vertical-align:top; margin-left:8px; width:135px; height:35px; line-height:35px; font-size:13px; color:white}

					.popupExtension .list								{position:relative; height:300px; background-color:white; border:1px solid #ccc; overflow-y:auto}
					.popupExtension .list table							{background-color:white; border:none !important}
					.popupExtension .list table i						{font-style:normal}
					.popupExtension .list table thead tr > *			{position:sticky; position:-webkit-sticky; top:0px; background-color:#686d7b; border-color:#686d7b; overflow:visible; z-index:2}
					.popupExtension .list table tbody tr				{border-bottom:1px solid #ccc}
					.popupExtension .list table tr > *					{border:none}
					.popupExtension .list table tr > td + td			{border-left:1px solid #ccc}
					.popupExtension .list table tr > td.empty			{border:none}
					.popupExtension .list table tr td:first-child		{padding:0; width:35px; min-width:35px; font-size:0}
					.popupExtension .list table tr td:first-child label	{vertical-align:middle; padding-left:0; width:20px; height:20px}
					.popupExtension .list table + div					{margin:0; padding:20px 0}
					.popupExtension .list table tbody td[colspan]		{padding:8px 0 !important}

				</style>
				<div class="popupExtension">
					<div class="top">
						<h2>
							일괄 연장 내역 상세
							<a data-event="close"></a>
						</h2>
					</div>
					<div class="middle">
						<div class="search" data-id="search">
							<div class="left"></div>
							<div class="right">
								<div class="ui-search-keyword">
									<input name="keyword" type="text" placeholder="검색어 입력 (최소 2자 이상)" autocomplete="off" data-event="keyword">
									<a data-event="reset"></a>
								</div>
								<button class="ui-button red" data-event="rollback" data-permission="permissionMember/batchExtension">선택 내역 복구</button>
							</div>
						</div>
						<div class="list" data-id="list">
							<table class="ui-data-table checkbox dark even" data-table-length="200" data-table-dom="tp">
								<thead>
									<tr>
										<td>
											<!--
												<label class="ui-input-checkbox">
													<input name="seqBatchExtensionHistoryPassInfo" type="checkbox">
													<span></span>
												</label>
											-->
										</td>
										<td>번호</td><td>회원명</td><td>이용권 번호</td><td>서비스 타입</td><td>이용권명</td>
										<td>연장일수</td><td>이용권 시작일</td>
										<td>변경 전 이용권 종료일</td><td>변경 후 이용권 종료일</td>
										<td>상태</td><td>복구일시</td><td>복구 담당자</td>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
					<div class="bottom">
						<button class="ui-button gray" data-event="close">닫기</button>
					</div>
				</div>
			`;
		}
	}
};
</script>
</html>
</html>
