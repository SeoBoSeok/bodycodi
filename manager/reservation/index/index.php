<?php
include_once('../../../common.php');

define('_SUB_', true);
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

include_once(G5_THEME_PATH.'/head.php');
?>

<script src="<?php echo G5_URL; ?>/resources/js/popup/coachPwdConfirmPopup.js"></script>
<script src="<?php echo G5_URL; ?>/resources/js/controller/loginController.js"></script>

<!-- 버전 2.0 -->
<style type="text/css">
.branchDisplay 							{display:none !important}
</style>

<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="스케줄러">
	<div class="right">
		<a href="/manager/schedule/promise">개인레슨 스케줄</a>
		<a href="/manager/schedule/class">그룹수업 스케줄</a>
		<a href="/manager/schedule/lesson">그룹수업 관리</a>
		<a class="focus" href="/manager/reservation/index">예약내역</a>
	</div>
</nav>

<!-- 콘텐츠 -->
<div class="contents">
	<main>
		<section data-id="search">
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
					<button type="button" class="ui-button blue" data-event="search">검색</button>
				</div>
			</div>
		</section>
		<section data-id="list" style="margin-top:40px">
			<table class="ui-data-table dark even">
				<thead>
					<tr>
						<td>예약 날짜</td>
						<td>예약 시간</td>
						<td>예약 회원</td>
						<td>전화번호</td>
						<td>예약한 수업 또는 강사</td>
						<td>이용권 내역</td>
						<td>가격 정책</td>
						<td>이용 상태</td>
					</tr>
				</thead>
				<tbody></tbody>
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
		scheduleController.reservation.search().then(data => {
			this.data.reservationList = data.reservationList || [];
			this.render();
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	update : function() {
		const data = {
			fromDate : this.container.getValue("fromDate"),
			toDate : this.container.getValue("toDate")
		};
		const period = getPeriod(data.fromDate, data.toDate);
		if(period < 0) {
			alert("종료 날짜를 시작 날짜 보다 크게 설정해 주세요.");
			return;
		}
		if(period > 90) {
			alert("검색 기간을 90일 이내로 입력해 주세요.");
			return;
		}
		scheduleController.reservation.search(data).then(data => {
			this.data.reservationList = data.reservationList || [];
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
			button.addEventListener("click", () => {this.update()});
			uiSearch("오늘");
		};
		const setList = () => {
			const section = this.container.querySelector("[data-id='list']");
			section.innerHTML = this.template();
			uiTable(section);
		};
		if(!isUpdate) setSearch();
		setList();
	},
	template : function() {
		const tr = this.data.reservationList.map(item => {
			const reservationDate = new Date(item.start_date).format("yyyy-mm-dd");
			const reservationTime = new Date(item.start_date).format("hh:MM");
			const scheduleName = (item.schedule_type == "appointment") ? item.coach_name : item.lesson_name;
			const getProductName = () => {
				const name = [];
				name.push(item.product_name);
				name.push(item.use_period + ((item.use_period_type == "M") ? "개월" : "일"));
				if(item.service_kind == "N") name.push(item.use_number + "회");
				return name.join(" ");
			};
			const getScheduleState = () => {
				switch(item.schedule_state) {
					case "W" : return `<span class="gray">대기</span>`;
					case "R" : return `<span class="blue">예약</span>`;
					case "A" : return `<span class="red">결석</span>`;
					case "C" : return `<span>취소</span>`;
					case "E" : return `<span class="green">출석</span>`;
					case "S" : return `<span class="green">출석 요청</span>`;
				}
				return "-";
			};
			const getMemberName = () => {
				const isIcon = (item.safeCheckinFlag) ? `<span class="ui-icon safe-checkin"></span>` : ``;
				return `${isIcon}${item.name || "-"}`;
			};
			return `
				<tr>
					<td>${reservationDate}</td>
					<td>${reservationTime}</td>
					<td>${getMemberName()}</td>
					<td>${item.mobile}</td>
					<td>${scheduleName}</td>
					<td>${getProductName()}</td>
					<td>${item.option_name}</td>
					<td>${getScheduleState()}</td>
				</tr>
			`;
		});
		return `
			<table class="ui-data-table dark even" data-table-length="20">
				<thead>
					<tr>
						<td>예약 날짜</td>
						<td>예약 시간</td>
						<td>예약 회원</td>
						<td>전화번호</td>
						<td>예약한 수업 또는 강사</td>
						<td>이용권 내역</td>
						<td>가격 정책</td>
						<td>이용 상태</td>
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

<?php
include_once(G5_THEME_PATH.'/tail.php');