
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
	<script type="text/javascript" src="/static/js/common/chart/chart.min.js"></script>
	<script type="text/javascript" src="/static/js/common/chart/chartjs-plugin-labels.js"></script>
	<script type="text/javascript" src="/static/js/controller/statisticsController.js"></script>
	<script type="text/javascript" src="/static/js/common/jquery/jquery.dataTables.min.js"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/jquery/jquery.dataTables.css">
	<link type="text/css" rel="stylesheet" href="/static/css/statistics.css?v=20210201">
	<style type="text/css"></style>
</head>
<body>



<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="통계분석">
	<div class="right">
		
			<a href="/statistics/appointment/index">개인레슨 통계</a>
		
		
			<a href="/statistics/class/index">그룹수업 통계</a>
		
	</div>
</nav>
<script type="text/javascript">
	(function() {
		const pathname = window.location.pathname;
		const a = document.querySelector(".ui-nav").querySelectorAll("a");
		a.forEach(item => {
			const href = item.getAttribute("href");
			if(pathname == href)
				item.classList.add("focus");
		});
	})();
</script>




<!-- 콘텐츠 -->
<div class="contents">
	<main>
		<!-- 검색 -->
		<section data-id="search">
			<form name="search" action="" method="post" autocomplete="off" onsubmit="return false">
				<div class="ui-search">
					<div class="date">
						<input name="fromDate" type="calendar" value="today">
						<span>부터</span>
						<input name="toDate" type="calendar" value="today">
						<span>까지</span>
						<div class="quick">
							<ul>
								<li><a>당해</a></li>
								<li><a>3개월</a></li>
								<li><a>당월</a></li>
								<li><a>전월</a></li>
								<li><a>오늘</a></li>
								<li><a>어제</a></li>
								<li><a>1주</a></li>
								<li><a>2주</a></li>
							</ul>
						</div>
					</div>
					<div>
						<select class="ui-select" name="orderCondition">
							<option value="">정렬방법 선택</option>
							<option value="recentDate">최근 날짜 순</option>
							<option value="oldDate">지난 날짜 순</option>
							<option value="attendCnt">참석인원 순</option>
						</select>
						<select class="ui-select" name="searchCondition">
							<option value="">검색조건 선택</option>
							<option value="coachName">강사명</option>
							<option value="className">수업명</option>
						</select>
						<input class="ui-input" name="inputSearch" maxlength="16" placeholder="검색어 입력">
						<button class="ui-button blue" type="button" data-event="submit">조회</button>
					</div>
				</div>
			</form>
		</section>
		<!-- 요약 -->
		<section>
			<div class="ui-state" data-id="state">
				<div>
					<dl>
						<dd><div><h2><var data-msg="lessonSum">0</var>회</h2><h4>수업 진행 횟수</h4></div></dd>
						<dd class="green"><div><h2><var data-msg="entranceSum">0</var>건</h2><h4>전체 수업 출석 횟수</h4></div></dd>
						<dd class="red"><div><h2><var data-msg="absentSum">0</var>건</h2><h4>전체 수업 결석 횟수</h4></div></dd>
						<dd><div><h2><var data-msg="participateAver">0</var>명</h2><h4>평균 수업별 출석 + 결석 인원 수</h4></div></dd>
						<dd><div><h2><var data-msg="entranceAver">0</var>명</h2><h4>평균 수업별 출석 인원 수</h4></div></dd>
					</dl>
				</div>
			</div>
			<div class="ui-state" data-id="analysis">
				<div>
					<dl>
						<dd>
							<div class="box">
								<div class="chart">
									<canvas class="dummy"></canvas>
									<canvas data-id="week"></canvas>
								</div>
								<h4>출석회원 요일별 통계</h4>
							</div>
						</dd>
						<dd>
							<div class="box">
								<div class="chart">
									<canvas class="dummy"></canvas>
									<canvas data-id="time"></canvas>
								</div>
								<h4>출석회원 시간대별 통계</h4>
							</div>
						</dd>
					</dl>
				</div>
			</div>
			<p class="ui-note blue">
				목록에서 '출석 + 결석' 버튼을 클릭하시면, 참석한 회원을 확인하고 문자를 전송할 수 있습니다.
			</p>
		</section>
		<!-- 검색 -->
		<section data-id="list">
			<table class="ui-table dark even">
				<colgroup><col width="12.5%"><col width="12.5%"><col width="30%"><col width="15%"></colgroup>
				<thead>
					<td>수업일시</td><td>강사명</td><td>수업명</td><td>출석 + 결석</td>
					<td>출석</td><td>결석</td><td>예약</td><td>수기입력</td>
				</thead>
				<tbody>
					<td class="empty" colspan="20">데이터를 불러오는 중 입니다.</td>
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
		Promise.all([
			statisticsController.class.search(),
			permissionController.getList()
		]).then(([data, permission]) => {
			if(!permission || !permission.permissionStatistics.classes) {
				alert("그룹수업 통계 권한이 없습니다.");
				window.location.href = "/home";
				return;
			}
			this.data = data;
			this.render();
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	update : function() {
		const form = this.container.querySelector("[data-id='search']");
		const data = {
			fromDate : form.getValue("fromDate"),
			toDate : form.getValue("toDate"),
			searchCondition : form.getValue("searchCondition"),
			orderCondition : form.getValue("orderCondition"),
			inputSearch : form.getValue("inputSearch")
		};
		if(getPeriod(data.fromDate, data.toDate) < 0) {
			alert("종료 날짜를 시작 날짜 보다 크게 설정해 주세요.");
			return;
		}
		statisticsController.class.search(data).then(data => {
			this.data = data;
			this.render(true);
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	render : function(isUpdate) {
		this.container = document.querySelector("main");
		this.self = this.event.self = this;
		const setState = () => {
			const data = this.data.state;
			const section = this.container.querySelector("[data-id='state']");
			const summaryInfo = this.data.summaryInfo || {};
			const scheduleList = this.data.scheduleList || [];
			section.putValue("lessonSum", getComma(scheduleList.length));
			section.putValue("entranceSum", getComma(summaryInfo.entranceSum));
			section.putValue("absentSum", getComma(summaryInfo.absentSum));
			section.putValue("participateAver", getComma(summaryInfo.participateAver));
			section.putValue("entranceAver", getComma(summaryInfo.entranceAver));
		};
		const setSearch = () => {
			const searchInfo = this.data.searchInfo;
			const section = this.container.querySelector("[data-id='search']");
			section.putValue("fromDate", searchInfo.fromDate);
			section.putValue("toDate", searchInfo.toDate);
			if(!isUpdate) {
				const button = section.querySelector("[data-event='submit']");
				button.addEventListener("click", () => {
					this.update();
				});
				uiSearch("오늘");
			}
		};
		const setList = () => {
			const section = this.container.querySelector("[data-id='list']");
			section.innerHTML = this.template();
			const self = this;
			uiEvent(section, {
				click : {
					detail : function() {
						self.popup.open(self, this)
					}
				}
			});
			uiTable(section);
		};
		const setAnalysis = () => {
			this.event.analysis();
			const section = this.container.querySelector("[data-id='analysis']");
			const chartList = ["week", "time"];
			const options = {
				circumference : Math.PI,
				rotation: 1.0 * Math.PI,
				cutoutPercentage : 60,
				responsive : true,
				maintainAspectRatio : false,
				animation : false,
				layout : {
					padding : 0,
				},
				legend : {
					display : false
				},
				plugins: {
					labels: {
						render : "value",
						showZero : true,
						fontColor : "#fff",
						render : function(item) {
							if(!item.value || item.value == -1) return "";
							return `${item.label}\n${item.percentage}%`;
						},
					}
				}
			};
			if(!isUpdate) {
				chartList.forEach(item => {
					const canvas = section.querySelector("[data-id='" + item + "']");
					const box = canvas.parentNode.parentNode;
					const dummy = box.querySelector("canvas");
					const data = this.data.analysis[item];

					const ctx = dummy.getContext("2d")
					new Chart(ctx, {
						type : "doughnut",
						data : {
							datasets : [{data : [-1], backgroundColor : ["#ccc"]}]
						},
						options : options
					});

					const div = document.createElement("div");
					div.className = "label";
					const li = data.label.map((item, index) => {
						const color = data.color[index];
						return `<li><span style="background-color:${color}"></span>${item}</li>`;
					});
					div.innerHTML = `<ul>${li.join("")}</ul>`;
					box.appendChild(div);
				});
			}

			chartList.forEach(item => {
				const canvas = section.querySelector("[data-id='" + item + "']");
				const cloneNode = canvas.cloneNode(true);
				canvas.parentNode.replaceChild(cloneNode, canvas);
				const ctx = cloneNode.getContext("2d");
				const data = this.data.analysis[item];
				const chart = new Chart(ctx, {
					type : "doughnut",
					data : {
						labels : data.label,
						datasets : [{
							label : item,
							data : data.data,
							backgroundColor : data.color
						}]
					},
					options : options
				});
			});
		};
		setSearch();
		setState();
		setList();
		setAnalysis();
	},
	event : {
		analysis : function() {
			const data = this.self.data;
			const scheduleList = data.scheduleList || [];
			const getArray = (length) => {
				const array = new Array(length);
				for(let i = 0; i < length + 1; i++)
					array[i] = 0;
				return array;
			};
			const sexList = getArray(1);
			const weekList = getArray(6);
			const timeList = getArray(7);

			scheduleList.forEach(item => {
				const datetime = item.START_DATE_TIME.split(" ");
				const date = new Date(datetime[0]);
				const time = datetime[1] || "";
				if(date && time) {
					const count = item.ENTRANCE_CNT;
					const timeIndex = parseInt(Number(time.substr(0, 2)) / 3);
					let weekIndex = date.getDay() - 1;
					if(weekIndex < 0) weekIndex = 6;
					weekList[weekIndex] += count;
					timeList[timeIndex] += count;
				}
			});
			data.analysis = {
				week : {
					label : ["월", "화", "수", "목", "금", "토", "일"],
					data : weekList,
					color : ["#ffdd99", "#30b0d7", "#f08a85", "#8ec63f", "#28a8b5", "#36a2eb", "#ff6384"]
				},
				time : {
					label : ["00-03", "03-06", "06-09", "09-12", "12-15", "15-18", "18-21", "21-24"],
					color : ["#3f51b5", "#9b6689", "#ba7373", "#ffdd99", "#4ed7d9", "#36a2eb", "#ff6384", "#3f51b5"],
					data : timeList,
				},
			};
		}
	},
	template : function() {
		const scheduleList = this.data.scheduleList || [];
		const tr = scheduleList.map((item, index) => {
			const lessonDate = item.START_DATE_TIME;
			const attendantCount = (item.ATTENDANT_CNT) ? getComma(item.ATTENDANT_CNT) + "명" : "";
			const detailButton = () => {
				const count = item.ENTRANCE_CNT + item.ABSENT_CNT;
				const detailCount = item.ENTRANCE_CNT + item.ABSENT_CNT + item.RESERVE_CNT;
				const color = (count) ? "green" : "gray";
				const disabled = (detailCount) ? "" : "disabled";
				return `<button class="ui-button medium ${color}" data-index="${index}" data-event="detail" ${disabled}>${getComma(count)}명</button>`;
			};
			return `
				<tr>
					<td>${lessonDate}</td>											
					<td>${item.COACH_NAME}</td>									
					<td class="name">${item.LESSON_NAME}</td>						
					<td>${detailButton()}</td>										
					<td class="green">${getComma(item.ENTRANCE_CNT)}명</td>		
					<td class="red">${getComma(item.ABSENT_CNT)}명</td>			
					<td class="blue">${getComma(item.RESERVE_CNT)}명</td>			
					<td>${attendantCount}</td>										
				</tr>
			`;
		});
		return `
			<table class="ui-data-table dark even fixed" data-table-dom="fltp" data-table-length="10">
				<colgroup>
					<col width="12.5%"><col width="12.5%"><col width="30%"><col width="15%">
					<col width="7.5%"><col width="7.5%"><col width="7.5%"><col width="7.5%">
				</colgroup>
				<thead>
					<td>수업일시</td><td>강사명</td><td>수업명</td><td>출석 + 결석</td>
					<td>출석</td><td>결석</td><td>예약</td><td>수기입력</td>
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
		open : function(context, object) {
			if(this.popup) return;
			const index = Number(object.getAttribute("data-index"));
			const data = context.data.scheduleList[index];
			if(!data) return;
			statisticsController.class.detail({
				targetDate : data.START_DATE_TIME,
				seqPartnerClassSchedule : data.SEQ_PARTNER_CLASS_SCHEDULE,
				lessonName : data.LESSON_NAME
			}).then(data => {
				this.data = data;
				this.render();
			}).catch(error => {
				console.log(error);
				alert("상세 정보를 가져오는데 실패하였습니다.");
			});
		},
		close : function() {
			this.popup = undefined;
			uiPopup();
		},
		render : function() {
			const self = this.event.self = this;
			this.popup = uiPopup({
				template : this.template(),
				event : {
					click : {
						close : function() {self.close();},
						sendSms : function() {self.event.sendSms();}
					}
				}
			});
			this.popup.putValue("entrance", this.data.summaryInfo.entranceCnt);
			this.popup.putValue("absent", this.data.summaryInfo.absentCnt);
			this.popup.putValue("reserve", this.data.summaryInfo.reserveCnt);
			uiTable(this.popup);
		},
		event : {
			sendSms : function() {
				const checkList = this.self.popup.querySelectorAll("tbody [name='member']:checked");
				const scheduleList = this.self.data.scheduleList || [];
				const memberList = [];
				checkList.forEach(item => {
					const index = Number(item.value);
					const data = scheduleList[index];
					memberList.push({
						seqMember : Number(data.SEQ_MEMBER),
						memberName : data.NAME,
						receiveNumber : data.MOBILE,
						membershipNo : Number(data.MEMBERSHIP_NO),
						sendRoute : "MEMBER",
						reservationYn : "N",
					});
				});
				const data = {
					smsMemberList : memberList
				};
				if(memberList.length == 0) {
					alert("문자를 발송할 회원을 선택해 주세요.");
					return;
				}
				popupSmsSend.open(data);
			}
		},
		template : function() {
			const scheduleList = this.data.scheduleList || [];
			const tr = scheduleList.map((item, index) => {
				const smsAgree = (item.SMS_AGREE_YN == "Y") ? "동의" : "미동의";
				const smsDisable = (item.SMS_AGREE_YN == "Y") ? "" : "disabled";
				const smsColor = (smsDisable) ? "red" : "green";
				const stateColor = (item.SCHEDULE_STATE == "E") ? "green" : (item.SCHEDULE_STATE == "A") ? "red" : (item.SCHEDULE_STATE == "R") ? "blue" : "gray";
				const stateName = uiParameter.schedule.state[item.SCHEDULE_STATE];
				const sex = (item.SEX == "M") ? "남성" : "여성";
				return `
					<tr>
						<th>
							<label class="ui-input-checkbox">
								<input name="member" type="checkbox" value="${index}" ${smsDisable}>
								<span></span>
							</label>
						</th>
						<td class="${smsColor}">${smsAgree}</td>
						<td>${item.NAME} (${sex})</td>
						<td>${item.MOBILE}</td>
						<td class="${stateColor}">${stateName}</td>
					</tr>
				`;
			});
			return `
				<div class="popupSchedule medium">
					<div class="top">
						<h2>
							그룹수업 스케줄 상세내역
							<a data-event="close"></a>
						</h2>
					</div>
					<div class="middle">
						<div class="ui-state">
							<div>
								<dl>
									<dd class="green"><div><h2><var data-msg="entrance">0</var>건</h2><h4>출석 건수</h4></div></dd>
									<dd class="red"><div><h2><var data-msg="absent">0</var>건</h2><h4>결석 건수</h4></div></dd>
									<dd><div><h2><var data-msg="reserve">0</var>건</h2><h4>예약 건수</h4></div></dd>
								</dl>
							</div>
						</div>
						<div>
							<table class="ui-table checkbox">
								<colgroup><col width="35px"></colgroup>
								<thead>
									<th>
										<label class="ui-input-checkbox">
											<input name="member" type="checkbox" value="">
											<span></span>
										</label>
									</th>
									<td>문자수신 여부</td>
									<td>회원 정보</td>
									<td>휴대폰 번호</td>
									<td>상태</td>
								</thead>
								<tbody>
									${tr.join("")}
								</tbody>
							</table>
						</div>
					</div>
					<div class="bottom">
						<button class="ui-button gray" data-event="close">닫기</button>
						<button class="ui-button green" data-event="sendSms">문자 보내기</button>
					</div>
				</div>
			`;
		}
	}
};
</script>
</html>
</html>
