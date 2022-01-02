
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
	<script type="text/javascript" src="/static/js/controller/payrollController.js"></script>
	<script type="text/javascript" src="/static/js/component/componentPayroll.js"></script>
	<script type="text/javascript" src="/static/js/common/jquery/jquery.dataTables.min.js"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/jquery/jquery.dataTables.css">
	<style type="text/css">
.payrollList						{}
.payrollList .ui-search span		{margin:0; margin-right:4px}
.payrollList .ui-search li			{display:inline-block}
.payrollList .ui-search li + li		{margin-left:20px}
.payrollList .ui-search input,
.payrollList .ui-search select		{width:120px; min-width:120px}
.payrollList .ui-search button		{margin-left:25px}
.payrollList .ui-table				{margin-top:25px}
.payrollList .ui-table tbody a		{text-decoration:underline; color:#004fec}
	</style>
</head>
<body>
 <!-- 로컬 네비게이션 바 -->
 <nav class="ui-nav" data-index="인사관리">
	 <div class="right">
		 <a href="/coach">임직원 관리</a>
		 
			 <a class="focus" href="/coach/payroll/setting">급여설정</a>
		 
		 
			 <a href="/settlement">급여정산</a>
		 
	 </div>
 </nav>

<!-- 콘텐츠 -->
<div class="contents">
	<!-- 메인 -->
	<main>
		<section class="payrollList">
			<div class="top">
				<div class="ui-search" data-id="search">
					
					<div>
						<ul>
							
							<li>
								<span>재직구분</span>
								<select class="ui-select" name="retirementYn">
									<option value="">재직구분 선택</option>
									<option value="">재직구분 선택</option>
									<option value="N">재직중</option>
									<option value="Y">퇴사</option>
								</select>
							</li>
							<li>
								<span>직급</span>
								<select class="ui-select" name="seqPosition">
									<option value="">직급 선택</option>
									<option value="">직급 선택</option>
								</select>
							</li>
							<li>
								<span>팀/부서</span>
								<select class="ui-select" name="seqTeam">
									<option value="">팀/부서 선택</option>
									<option value="">팀/부서 선택</option>
								</select>
							</li>
							<li>
								<label class="ui-input-checkbox">
									<input name="salesYn" type="checkbox">
									<span></span>
									결제와 세일즈
								</label>
								<label class="ui-input-checkbox">
									<input name="appointmentYn" type="checkbox">
									<span></span>
									개인레슨
								</label>
								<label class="ui-input-checkbox">
									<input name="classYn" type="checkbox">
									<span></span>
									그룹수업
								</label>
								<button class="ui-button blue" type="button" data-event="search">검색</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="bottom" data-id="payrollList">
				<table id="payrollList" class="ui-data-table dark even hover" data-table-length="15" data-table-dom="tp">
					<thead>
						<tr>
							<td>임직원</td><td>직급</td><td>팀/부서</td><td>입사일</td><td>적용기간</td><td>기본급</td>
							<td>개인 커미션<br>신규 / 재등록</td><td>팀 커미션<br>신규 / 재등록</td><td>센터 커미션<br>신규 / 재등록</td>
							<td>개인 수당<br>신규 / 재등록</td><td>그룹 수당</td><td>자동 공제율</td>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</section>
	</main>
</div>
</body>
<script type="text/javascript">
function doReady() {
	payrollList.open();
}

const payrollList = {
	container : undefined,
	data : {},
	open : function() {
		Promise.all([
			payrollController.list(),
			commonController.positionList(),
			commonController.teamList()
		]).then(([payrollList, positionList, teamList]) => {
			this.data = {
				payrollList : payrollList || [],
				positionList : positionList || [],
				teamList : teamList || []
			};
			this.data.payrollList = this.data.payrollList.map(item => {
				const seqPosition = item.seqPosition;
				const seqTeam = item.seqTeam;
				const positionInfo = this.data.positionList.filter(item => {
					return (item.seqPosition == seqPosition);
				})[0];
				const teamInfo = this.data.teamList.filter(item => {
					return (item.seqTeam == seqTeam);
				})[0];
				item.teamInfo = teamInfo || {};
				item.positionInfo = positionInfo || {};
				return item;
			}).sort((a, b) => {
				let typeCodeA = Number(a.employeeTypeCode);
				let typeCodeB = Number(b.employeeTypeCode);
				if(typeCodeA < 0) typeCodeA = 1;
				if(typeCodeB < 0) typeCodeB = 1;
				const positionA = (a.positionInfo) ? a.positionInfo.order : 99;
				const positionB = (b.positionInfo) ? b.positionInfo.order : 99;
				const sequence = (positionA < positionB) ? -1 : (positionA > positionB) ? 1 : 0;
				return (typeCodeA == typeCodeB) ? sequence : (typeCodeA < typeCodeB) ? -1 : (typeCodeA > typeCodeB) ? 1 : 0;
			});
			this.render();
		}).catch(error => {
			uiError(error);
		});
	},
	filter : function(data) {
		const search = {
			retirementYn : this.container.getValue("retirementYn"),
			seqPosition : this.container.getValue("seqPosition"),
			seqTeam : this.container.getValue("seqTeam"),
			salesYn : this.container.getValue("salesYn"),
			appointmentYn : this.container.getValue("appointmentYn"),
			classYn : this.container.getValue("classYn")
		};
		return data.filter(item => {
			if(search.retirementYn && search.retirementYn != item.retirementYn) return false;
			if(search.seqPosition && search.seqPosition != item.seqPosition) return false;
			if(search.seqTeam && search.seqTeam != item.seqTeam) return false;
			if(search.salesYn == "Y" && item.salesYn != "Y") return false;
			if(search.appointmentYn == "Y" && item.appointmentYn != "Y") return false;
			if(search.classYn == "Y" && item.classYn != "Y") return false;
			return true;
		});
	},
	render : function(isUpdate) {
		this.container = document.querySelector("main");
		const self = this;
		const setSearch = () => {
			const div = this.container.querySelector("[data-id='search']");
			const setPosition = () => {
				const select = div.querySelector("[name='seqPosition']");
				const option = this.data.positionList.map(item => {
					return `<option value="${item.seqPosition}">${item.title}</option>`;
				});
				select.innerHTML += option.join("");
			};
			const setTeam = () => {
				const select = div.querySelector("[name='seqTeam']");
				const option = this.data.teamList.map(item => {
					return `<option value="${item.seqTeam}">${item.title}</option>`;
				});
				select.innerHTML += option.join("");
			};
			const setButton = () => {
				const button = this.container.querySelector("[data-event='search']");
				button.onclick = function() {
					self.render(true);
				};
			};
			setPosition();
			setTeam();
			setButton();
		};
		const setPayrollList = () => {
			const div = this.container.querySelector("[data-id='payrollList']");
			div.innerHTML = this.template();
			div.querySelectorAll("tr").forEach(item => {
				item.onclick = function() {
					const seqPartnerCoach = Number(this.getAttribute("data-sequence"));
					window.location.href = "/coach/" + seqPartnerCoach + "/payroll";
				};
			});
			uiTable(div);
		};
		if(!isUpdate) setSearch();
		setPayrollList();
	},
	template : function() {
		const tr = this.filter(this.data.payrollList).map(item => {
			const getCurrentIndex = function() {
				let index = 0;
				const data = item.payrollSettings;
				const today = getNumber(getCalendar(), true);
				for(let i = 0; i < data.length; i++) {
					const item = data[i];
					const startDate = getNumber(item.startDate, true);
					const endDate = getNumber(item.endDate, true);
					if(startDate <= today && (today < endDate || !endDate)) {
						index = i;
						break;
					}
				}
				return index;
			};
			const payroll = item.payrollSettings[getCurrentIndex()];
			const getCommission = function(sectionType) {
				if(!payroll) return "-";
				sectionType = sectionType.toUpperCase();
				const sectionList = payroll.payrollCommissionSections;
				const sectionInfo = sectionList.filter(item => {
					return (item.sectionType == sectionType);
				}).sort(function(a, b) {
					return (a.moreThan < b.moreThan) ? -1 : 1;
				})[0];
				if(!sectionInfo) return "미설정";
				const valueInuse = sectionInfo.valueInuse;
				const valueNew = sectionInfo.valueNew;
				return valueNew + "%" + " / " + valueInuse + "%";
			};
			const getAllowanceAppointment = function() {
				if(!payroll) return "-";
				const data = componentPayroll.getAllowance(payroll, "appointment");
				if(!data) return "-";
				const type = data.allowanceType;
				const unit = (type == "RATE") ? "%" : "원";
				const sectionInfo = data.payrollServiceSections.sort(function(a, b) {
					return (a.moreThan < b.moreThan) ? -1 : 1;
				})[0];
				if(!sectionInfo) return "미설정";
				const valueInuse = getComma(sectionInfo.valueInuse);
				const valueNew = getComma(sectionInfo.valueNew);
				return valueNew + unit + " / " + valueInuse + unit;
			};
			const getAllowanceClass = function() {
				if(!payroll) return "-";
				const data = componentPayroll.getAllowance(payroll, "class");
				if(!data) return "-";
				const type = data.allowanceType;
				if(type == "RATE") {
					const sectionInfo = data.payrollServiceSections.sort(function(a, b) {
						return (a.moreThan < b.moreThan) ? -1 : 1;
					})[0];
					if(!sectionInfo) return "미설정";
					return sectionInfo.value + "%";
				} else {
					return "수업별 정액제";
				}
			};
			const period = (payroll) ? componentPayroll.getPeriod(payroll) : "-";
			const basePay = (payroll) ? getComma(payroll.basePay) + "원" : "-";
			const deductionRate = (payroll) ? payroll.deductionRate + "%" : "-";
			return `
				<tr data-sequence="${item.seqPartnerCoach}">
					<td>${item.coachName || "-"}</td>				
					<td>${item.positionInfo.title || "-"}</td>		
					<td>${item.teamInfo.title || "-"}</td>			
					<td>${item.joinDate || "-"}</td>				
					<td>${period}</td>								
					<td>${basePay}</td>							
					<td>${getCommission("personal")}</td>			
					<td>${getCommission("team")}</td>				
					<td>${getCommission("partner")}</td>			
					<td>${getAllowanceAppointment()}</td>			
					<td>${getAllowanceClass()}</td>				
					<td>${deductionRate}</td>						
				</tr>
			`;
		});
		return `
			<table class="ui-data-table dark even hover" data-table-length="20" data-table-dom="tp">
				<thead>
					<tr>
						<td>임직원</td><td>직급</td><td>팀/부서</td><td>입사일</td><td>적용기간</td><td>기본급</td>
						<td>개인 커미션<br>신규 / 재등록</td><td>팀 커미션<br>신규 / 재등록</td><td>센터 커미션<br>신규 / 재등록</td>
						<td>개인 수당<br>신규 / 재등록</td><td>그룹 수당</td><td>자동 공제율</td>
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
