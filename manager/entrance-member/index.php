<?php
include_once('../../common.php');

define('_SUB_', true);
//if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

include_once(G5_THEME_PATH.'/head.php');
?>

<script src="<?php echo G5_URL; ?>/resources/js/popup/coachPwdConfirmPopup.js"></script>
<script src="<?php echo G5_URL; ?>/resources/js/controller/loginController.js"></script>
<script type="text/javascript" src="/resources/js/popup/checkinPopup.js?v=20210216"></script>
<script type="text/javascript" src="/resources/js/controller/checkinController.js?v=20210216"></script>

<script type="text/javascript" src="/static/js/popup/popupPassPause.js"></script>
<script type="text/javascript" src="/static/js/popup/popupMemberPass.js?v=20210820"></script>
<script type="text/javascript" src="/static/js/popup/popupMemberCounseling.js"></script>
<script type="text/javascript" src="/static/js/controller/ticketController.js"></script>
<script type="text/javascript" src="/static/js/ui/uiResult.js"></script>

<script type="text/javascript" src="/static/js/controller/memberEntranceController.js"></script>
<script type="text/javascript" src="<?php echo G5_URL; ?>/static/js/component/componentMember.js?v=20210601"></script>
<script type="text/javascript" src="/static/js/common/jquery/jquery.dataTables.min.js"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/jquery/jquery.dataTables.css">
<!-- 버전 2.0 -->
<style type="text/css">

.branchDisplay 							{display:none !important}


html									{position:relative; margin:0 auto !important; background-color:#f0f0f0; min-width:1280px; max-width:1920px}
body									{height:auto; /*min-width:1600px*/}
var, time								{font-style:normal}

#using									{position:relative}
#contents								{display:table; margin-top:0; padding-top:0; width:100%; height:calc(100% - 160px)}
.page_top								{display:none !important}

.bar_area								{position:sticky; position:-webkit-sticky; top:0; padding:5px 50px}
.bar_area.fix_sc						{position:sticky; position:-webkit-sticky; z-index:4}
.bar_area								{height:45px; line-height:34px}
.bar_area .fl a							{vertical-align:initial}
.bar_area .fr.nav ul					{margin-top:-6px}
.bar_area .fr.nav ul li a				{height:46px; line-height:46px}
.bar_area .fr.nav ul li a.active		{background-color:#004fec}

.ui-popup								{font-size:13px; color:#333}
.ui-popup em							{position:relative; display:inline-block; vertical-align:middle; top:0; margin-right:0.5em; padding:0px 5px; background-color:#42485a; border-radius:1px; line-height:1.65; font-size:11px; font-weight:300; font-style:normal; color:white}
.ui-popup em.white						{border:1px solid #ccc; font-weight:400}

.ui-popup > div							{line-height:1.5}
.ui-popup > div > div > div				{opacity:1 !important; transform:none !important}

.ui-popup input[type=text],
.ui-popup input[type=number],
.ui-popup select						{height:36px !important; border-color:#ccc}

.ui-popup .tab							{flex:auto; bottom:auto}
.ui-popup table tbody tr > th,
.ui-popup table tbody tr > td			{height:auto; text-align:inherit; background-color:white; border:none !important}
.ui-popup table tbody tr > td input		{width:100%; text-align:inherit}
.ui-popup .thumbnail					{display:table-row; margin:0; padding:0; border:none; border-radius:0; transition:none}

.ui-popup dl							{display:table; width:100%; margin-bottom:0}
.ui-popup dl dt,
.ui-popup dl dd							{display:table-cell; font-weight:normal}

.ui-block.focus							{z-index:9999}

.ui-popup img,
.ui-input-radio *,
.ui-input-search *,
.ui-input-checkbox *					{box-sizing:initial}
.ui-input-search input					{width:350px !important; max-width:350px !important}
.ui-input-search button					{box-sizing:border-box}

.ui-side + div							{margin-left:275px; height:100%; border-left:1px solid #ccc}
.ui-side + div > div					{max-width:100%; margin:0 10px}

.btn									{height:35px; line-height:33px; font-size:12.5px}
.btn + .btn,
select + .btn							{margin-left:5px}
button.btn								{height:34px; line-height:32px}
.btn.white								{background-color:white; border:1px solid #ccc; color:#333}

@media(min-width:1920px) {
html									{outline:1px solid #ddd}
}
</style>
<style type="text/css">

body												{display:block}
body > .contents									{height:calc(100% - 115px)}

main												{min-width:1520px; height:100%; font-size:13px}
main input,
main .ui-button										{font-size:13px; box-sizing:border-box}
main .ui-tab										{margin-bottom:18px}
main .ui-tab ul										{line-height:35px; font-weight:normal}
main table thead tr > *								{outline:none !important}
/*
main .ui-table tr > *								{padding:0 8px !important; line-height:35px}
*/
main .ui-search										{margin-bottom:20px; padding:0; background-color:white; font-size:0}
main .ui-search:after								{content:""; display:table; clear:both}
main .ui-search input								{width:125px}
main .ui-search .date								{margin:0; float:left; text-align:left}
main .ui-search .date input							{margin-right:8px}
main .ui-search .date button						{margin:0; margin-right:8px; width:35px; height:35px; line-height:33px; font-size:12px}
main .ui-search .date button.today					{width:75px; line-height:33px; font-size:13px}
main .ui-search .date button:last-child				{margin-right:0}
main .ui-search .filter								{margin:0; float:right}
main .ui-search .filter input						{width:128px; text-align:center}


main												{position:absolute; left:0; top:0; padding:0; width:100%; height:100%; letter-spacing:-0.1px}
main .container										{}
main .container > div								{position:absolute; top:0; height:100%; padding:40px; box-sizing:border-box; overflow:auto}
main .container > .left								{padding-right:0; left:0; width:470px}
main .container > .right							{left:470px; right:0}
/*
main .container 									{display:table; width:100%; height:100%}
main .container > div								{display:table-cell; vertical-align:top}
main .container > .left								{width:25%; min-width:430px}
main .container > .right							{padding-left:40px}
main .container > .right > .bottom					{height:300px; margin-top:25px}
 */
/*
main .container > .right > .bottom					{display:table; margin-top:20px; height:calc(100% - 465px); min-height:100px}
main .container > .right > .bottom .tab				{height:calc(100% - 55px); min-height:100px}
main .container > .right > .bottom .ui-table-box	{height:100%}
*/
main .container > .right > .bottom					{display:table; margin-top:20px; height:calc(100% - 465px); min-height:150px}
main .container > .right > .bottom .tab				{height:calc(100% - 55px)}
main .container > .right > .bottom .ui-table-box	{height:100%}


main .ui-table-box									{position:relative; background-color:#ccc; /*border:1px solid #ccc;*/ overflow-x:hidden; overflow-y:auto}
main .ui-table-box table thead tr td				{padding:8px 16px 8px 12px}
main .ui-table-box .dataTables_wrapper				{position:absolute; left:0; top:0; width:100%; height:100%; margin:0}
main .ui-table-box .dataTable.no-footer				{border:none}

main .ui-table-box table							{background-color:white}
main .ui-table-box table thead tr,
main .ui-table-box table thead tr > *				{position:sticky; position:-webkit-sticky; top:0px; background-color:#686d7b; border-color:#686d7b; overflow:visible; z-index:2}
main .ui-table-box table thead tr > *:before		{content:""; position:absolute; left:0; top:0; width:100%; height:100%; outline:1px solid #686d7b}
main .ui-table-box table tbody tr:last-child		{border-bottom:0}



/* ******* 입장 내역 ******* */

.entranceList										{height:100%}
.entranceList h2 a.refresh							{display:inline-block; vertical-align:top; margin-left:2px; width:21px; height:21px; background:url(/static/img/icon/icon_refresh_black.png) no-repeat center center / 90%; border:1px solid #ccc; line-height:20px; text-align:center}
.entranceList table									{letter-spacing:-0.4px; table-layout:fixed}
.entranceList table tbody tr.error					{background-color:rgba(255,87,34,0.15) !important}

.entranceList table tbody tr.focus 					{background-color:rgba(33,150,243,0.15) !important}
.entranceList table tbody tr.focus td				{position:relative; border-bottom-color:#004fec}
.entranceList table tbody tr.focus td:before		{content:""; position:absolute; left:0; top:0; width:100%; height:100%; border-top:1px solid #004fec}
.entranceList table tbody tr.focus td:first-child	{border-left-color:#004fec}
.entranceList table tbody tr.focus td:last-child	{border-right-color:#004fec}

.entranceList table tbody tr:hover					{background-color:rgba(33,150,243,0.15) !important; cursor:pointer}
.entranceList table tbody tr td						{padding:8px 4px}
.entranceList .ui-table-box							{height:calc(100% - 112px)}



/* ******* 입장 상세 ******* */

.memberInfo											{display:table; width:100%; height:375px}
.memberInfo > div									{display:table-cell; vertical-align:top}



/* ******* 입장 상세 : 회원 ******* */

.memberInfo .left > dl > *							{position:relative; vertical-align:top}
.memberInfo .left > dl > dt							{width:175px}
.memberInfo .left > dl > dt .thumbnail				{position:relative; width:175px; padding-bottom:175px; background-color:#f0f0f0; border:1px solid #ccc}
.memberInfo .left > dl > dt .thumbnail img			{position:absolute; left:0; top:0; width:100%; height:100%; object-fit:cover}
.memberInfo .left > dl > dt ul li					{margin-top:8px}
.memberInfo .left > dl > dt ul li button			{width:100%}
.memberInfo .left dl dl dt							{padding-right:4px}
.memberInfo .left dl dl dd							{padding-left:4px}

.memberInfo .left > dl > dd							{padding:0 20px}
.memberInfo .left > dl > dd table					{/*white-space:normal;*/ table-layout:fixed}
.memberInfo .left > dl > dd table th				{width:95px; background-color:#f0f0f0}
.memberInfo .left > dl > dd table td.memo			{position:relative; height:38px !important; text-overflow:initial; overflow:auto}
.memberInfo .left > dl > dd table td.multiple		{position:relative; padding:0}
.memberInfo .left > dl > dd table td.multiple ul	{padding:8px; max-height:3.5em; overflow-y:auto}
.memberInfo .left > dl > dd table td.multiple ul li	{white-space:nowrap; text-overflow:ellipsis; overflow:hidden}
.memberInfo .left > dl > dd table td.multiple .right{text-align:right}
.memberInfo .left > dl > dd a.underline				{margin-left:8px}

/*
.memberInfo .left > dl > dd table td.select			{padding:0; font-size:0}
.memberInfo .left > dl > dd table td.select select	{width:100%; max-width:100%; height:100%; border:none; font-size:13px}
*/
.memberInfo .left .menu								{position:absolute; padding:10px; left:10px; top:225px; width:calc(100% - 20px); background-color:white; border:1px solid #ccc; box-sizing:border-box; visibility:hidden; opacity:0; transition:visibility 0.4s, opacity 0.4s}
.memberInfo .left .menu.focus						{visibility:visible; opacity:1}
.memberInfo .left .menu:before						{content:""; position:absolute; left:50%; margin-left:-5px; top:-7px; width:10px; height:10px; background-color:white; border-left:1px solid #ccc; border-top:1px solid #ccc; transform:rotate(45deg)}
.memberInfo .left .menu li:first-child				{margin-top:0}
.memberInfo .left .menu button						{line-height:33px}

.memberInfo .left > dl.branch > dt					{width:188px}
.memberInfo .left > dl.branch > dt .thumbnail		{width:188px; padding-bottom:188px}
.memberInfo .left > dl.branch > dd table td.memo	{height:auto !important; text-overflow:ellipsis; overflow:hidden}


	/* ******* 입장 상세 : 이용권 ******* */

.memberInfo > .right								{position:relative; width:35%; height:100%; min-width:400px}
/*
.memberInfo > .right > div.tab						{height:calc(100% - 55px); overflow-y:auto}
*/
.memberInfo > .right > div.tab						{position:absolute; left:0; top:55px; right:0; bottom:0; overflow-y:auto}
.memberInfo > .right > div.tab						{background-color:#f0f0f0; border:1px solid #ccc; box-sizing:border-box}

.memberInfo .passList								{padding:10px}
.memberInfo .passList li							{position:relative; padding:10px 10px 10px 14px; background-color:white; border:1px solid #ccc}
.memberInfo .passList li + li						{margin-top:8px}
.memberInfo .passList li .top h4					{line-height:1; font-size:14px}
.memberInfo .passList li .top div					{position:absolute; left:0; top:0; width:4px; height:100%}
.memberInfo .passList li .middle					{margin:10px 0; padding:8px; background-color:#f0f0f0; font-size:12.5px; color:#555}
.memberInfo .passList li .bottom					{font-size:0}
.memberInfo .passList li .bottom button				{padding:0 5px; line-height:25px; font-size:12px}
.memberInfo .passList li .bottom button + button	{margin-left:8px}


/* ******* 입장 상세 : 판매내역 ******* */

.orderList tr.hidden								{background-color:#f0f0f0}
.orderList td.name									{max-width:300px}
.orderList td.multiple								{padding:0}
.orderList td.multiple ul							{line-height:35px}
.orderList td.multiple ul li						{position:relative; padding:0 10px}
.orderList td.multiple ul li						{text-overflow:ellipsis; overflow:hidden}
.orderList td.multiple ul li + li					{border-top:1px dashed #bbb}
.orderList td.multiple ul li.empty					{text-align:center; text-decoration:none}

	</style>
<!-- 팝업위치 -->
<div data-popup-location="팝업 위치"></div>
<!-- 팝업위치 -->
<!-- 콘텐츠 -->
<div class="contents">
	<!-- 메인 -->
	<main>
		<div class="container">
			<div class="left">
				<section class="entranceList" data-event="entranceList">
					<h2 class="ui-title">
						입장 내역
						<a class="refresh" onclick="doRefresh()"></a>
						<span class="right">
							전체 : <var data-msg="countAll">0</var>건 ·
							입장 : <var data-msg="countEntrance">0</var>건 ·
							거절 : <var data-msg="countRefused">0</var>건 ·
							대기 : <var data-msg="countStandby">0</var>건
						</span>
					</h2>
					<div class="ui-search">
						<form autocomplete="off">
							<div class="date">
								<button class="ui-button white" type="button" data-event="prev">◀</button>
								<input name="entranceDate" type="calendar" value="" data-event="date">
								<button class="ui-button white today" type="button" data-event="today">오늘</button>
								<button class="ui-button white" type="button" data-event="next">▶</button>
							</div>
							<div class="filter">
								<input name="filter" data-event="filter" placeholder="검색어">
							</div>
						</form>
					</div>
					<div class="ui-table-box">
						<table class="ui-table dark even" data-table-ordering="true" data-table-dom="t">
							<colgroup><col width="16%"><col width="20%"><col width="20%"><col width="20%"><col width="12%"><col width="12%"></colgroup>
							<thead>
								<tr><td>이름</td><td>상태</td><td>장소만료</td><td>최종만료</td><td>입장</td><td>퇴장</td></tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
				</section>
			</div>
			<div class="right">
				<section class="top" data-event="memberInfo">
					<h2 class="ui-title">
						<var data-msg="entranceStatus">입장 회원 정보</var>
						<span class="right"><var data-msg="entranceDate"></var></span>
					</h2>
					<div class="memberInfo">
						<div class="left">
							<dl>
								<dt>
									<div class="thumbnail"><img src="/static/img/brand/symbol_gray.png" /></div>
									<ul></ul>
								</dt>
								<dd>
									<table class="ui-table">
										<tr><th>이름</th><td></td><th>휴대폰 번호</th><td></td></tr>
										<tr><th>생년월일</th><td></td><th>회원번호</th><td></td></tr>
										<tr><th>주소</th><td colspan="3"></td></tr>
										<tr><th>장소이용 만료</th><td></td><th>최초 등록일</th><td></td></tr>
										<tr><th>개인레슨 만료</th><td></td><th>최근 결제일</th><td></td></tr>
										<tr><th>그룹수업 만료</th><td></td><th></th><td></td></tr>
										<tr><th>락커정보</th><td colspan="3"></td></tr>
										<tr><th>중지기간</th><td colspan="3"></td></tr>
										<tr><th>누적 이용횟수</th><td></td><th>회원그룹</th><td></td></tr>
										<tr><th>회원 앱</th><td></td><th>담당자</th><td></td></tr>
										<tr><th>메모</th><td class="memo" colspan="3"></td></tr>
									</table>
								</dd>
							</dl>
						</div>
						<div class="right" data-event="passList">
							<div class="ui-tab">
								<ul>
									<li><label><input name="rightTab" type="radio" value="1" data-event="tab" checked><div>유효 이용권 목록</div></label></li>
									<li><label><input name="rightTab" type="radio" value="2" data-event="tab"><div>만료 이용권 목록</div></label></li>
								</ul>
							</div>
							<div class="tab tab-1 focus">
								<div class="passList">
									<ul data-event="passAvailableList"></ul>
								</div>
							</div>
							<div class="tab tab-2">
								<div class="passList">
									<ul data-event="passExpirationList"></ul>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section class="bottom">
					<div class="ui-tab">
						<ul>
							<li><label><input name="bottomTab" type="radio" value="1" data-event="tab" checked><div>판매내역</div></label></li>
							<li><label><input name="bottomTab" type="radio" value="2" data-event="tab"><div>상담내역</div></label></li>
							<li class="dummy"></li>
							<li class="dummy"></li>
							<li class="dummy"></li>
							<li class="dummy"></li>
						</ul>
					</div>
					<div class="tab tab-1 focus">
						<div class="ui-table-box scroll orderList">
							<table class="ui-data-table dark" data-table-dom="t" data-event="orderList">
								<thead>
									<tr>
										<td class="branchDisplay">지점명</td><td>판매일시</td><td>판매번호</td><td>판매분류</td><td>판매상태</td><td>이용권 상태</td><td>이용권 내역</td>
										<td>정가</td><td>할인</td><td>판매가</td><td>결제금액</td><td>미수금</td>
										<td>판매담당</td><td>판매메모</td>
									</tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
					<div class="tab tab-2">
						<div class="ui-table-box">
							<table class="ui-data-table dark even" data-table-dom="t" data-event="counselingList">
								<thead>
									<tr><td>상담일시</td><!--<td>상담지점</td>--><td>담당자</td><td>상담수단</td><td>상담목적</td><td>상담내용</td><td>수정</td></tr>
								</thead>
								<tbody></tbody>
							</table>
						</div>
					</div>
				</section>
			</div>
		</div>
		<div data-event="popupLocation"></div>
	</main>
</div>
</body>
<script type="text/javascript">

function doReady() {
	uiTab();
	doPage.open();
}

function doRefresh() {
	uiConsole("현재 페이지를 새로고침 합니다.", "green");
	doPage.memberInfo.update(true, true);
	/*
	const section = document.querySelector("[data-event='entranceList']");
	const dataTable = section.querySelector("table");
	const sequence = doPage.memberInfo.sequence;
	$(dataTable).DataTable().destroy();
	doPage.entranceList.open(0, function() {
		doPage.memberInfo.update(true, true);
	});
	*/
}

const doPage = {
	container : undefined,
	permission : {},
	data : {},
	open : function() {
		this.container = document.querySelector("main");
		this.entranceList.parent = this.memberInfo.parent = this;
		this.entranceList.container = this.memberInfo.container = this.container;

		Promise.all([
			commonController.coachList(),
			commonController.branch.list(),
			permissionController.getList()
		]).then(([coachList, branchList, permission]) => {
			this.data = {
				coachList : coachList || [],
				branchList : branchList || []
			};
			this.permission = uiPermission.data = permission;
			componentMember.data = this.data;
			this.entranceList.permission = this.memberInfo.permission = popupMemberPass.permission = this.permission;
			this.entranceList.open();
		}).catch(error => {
			uiError(error);
		});
	},
	getStatusName : function(data, isError) {
		let statusName = {
			entrance : "입장",
			refused : "거절",
			standby : "대기"
		}[data.status] || "";
		if(isError && data.error) statusName = data.error;
		else if(data.status == "entrance" && data.endDate) statusName = "퇴장";
		return statusName;
	},
	getStatusColor : function(data, isError) {
		if(isError) return (data.error) ? "red" : "";
		return (data.status == "entrance") ? (data.endDate) ? "" : "green" : (data.status == "standby") ? "orange" : "red";
	},
	entranceList : {
		data : {},
		callback : undefined,
		open : function(entranceDate, callback) {
			if(!entranceDate && this.data.entranceDate)
				entranceDate = this.data.entranceDate;
			Promise.all([
				memberEntranceController.list(entranceDate),
			]).then(([entranceInfo]) => {
				this.data = {
					entranceDate : entranceInfo.entranceDate || "",
					counselingMeansList : entranceInfo.counselingMeansList || [],
					counselingPurposeList : entranceInfo.counselingPurposeList || [],
					entranceList : entranceInfo.list || [],
					refusedList : entranceInfo.refusedList || [],
					standByList :  entranceInfo.standByList || [],
					senderList : entranceInfo.senderList || []
				};
				const convert = (status, data) => {
					if(!data) return [];
					data.map(item => {
						if(item.status) item.error = item.status;
						item.status = status;
						item.startDate = item.entrance_start_datetime || item.refused_datetime || item.entrance_request_datetime;
						item.endDate = item.entrance_end_datetime;
						if(status == "entrance") item.sequence = item.seq_member_entrance;
						else if(status == "refused") item.sequence = item.seq_member_entrance_refused;
						else if(status = "standby") item.sequence = item.seq_member_entrance_standby;
						return item;
					});
					return data;
				};
				this.data.entranceList = convert("entrance", this.data.entranceList);
				this.data.refusedList = convert("refused", this.data.refusedList);
				this.data.standbyList = convert("standby", this.data.standbyList);
				this.data.entranceDate = this.data.entranceDate;
				this.callback = callback;
				const isUpdate = (entranceDate) ? true : false;
				this.render(isUpdate);
				if(callback) callback();
			}).catch(error => {
				uiError(error);
			});
		},
		render : function(isUpdate) {
			const self = this.event.self = this.template.self =	this;
			const section = this.container.querySelector("[data-event='entranceList']");

			const setEntranceList = () => {
				const table = section.querySelector("table");
				uiDataTable(table, this.template());
				table.querySelectorAll("tbody tr").forEach(item => {
					item.onclick = function() {
						self.event.changeMemberInfo(this);
					};
				});
				if(!isUpdate) {
					const input = section.querySelector("[data-event='filter']");
					input.onkeyup = function() {
						$(table).DataTable().search(this.value).draw();
					}
					section.putValue("entranceDate", this.data.entranceDate || getCalendar());
					uiEvent(section, {
						click : {
							prev : function() {self.event.changeEntranceDate(-1)},
							today : function() {self.event.changeEntranceDate(0)},
							next : function() {self.event.changeEntranceDate(1)},
						},
						change : {
							date : function() {self.event.changeEntranceDate()},
						}
					});
				}
			};
			const setSummary = () => {
				const count = {
					entrance : this.data.entranceList.length,
					refused : this.data.refusedList.length,
					standby : this.data.standbyList.length
				};
				section.putValue("countEntrance", getComma(count.entrance));
				section.putValue("countRefused", getComma(count.refused));
				section.putValue("countStandby", getComma(count.standby));
				section.putValue("countAll", getComma(count.entrance + count.refused + count.standby));
			};
			const setIndex = () => {
				const tr = section.querySelector("table tbody tr");
				if(tr) tr.click();
			};
			setEntranceList();
			setSummary();
			if(!this.callback) setIndex();
		},
		event : {
			changeEntranceDate : function(value) {
				const section = this.self.container.querySelector("[data-event='entranceList']");
				const input = section.querySelector("[name='entranceDate']");
				const date = (value == undefined) ? new Date(input.value) : (value) ? new Date(this.self.data.entranceDate) : new Date();
				if(value) date.setDate(date.getDate() + value);
				const newDate = date.format("yyyy-mm-dd");
				input.value = newDate;
				this.self.parent.memberInfo.reset();
				this.self.open(newDate);
			},
			changeMemberInfo : function(object) {
				if(!object) return;
				const status = object.getAttribute("data-status");
				const sequence = object.getAttribute("data-sequence");

				object.parentNode.querySelectorAll("tr").forEach(item => {
					item.classList.remove("focus");
				});
				object.classList.add("focus");
				this.self.parent.memberInfo.open(status, sequence);
			}
		},
		template : function() {
			const dataList = [].concat(this.data.entranceList, this.data.refusedList, this.data.standbyList);
			const tr = dataList.map(item => {
				let statusName = this.parent.getStatusName(item);
				if(item.error) statusName += ` · ${item.error}`;
				const statusColor = this.parent.getStatusColor(item);
				const passEndDate = (item.end_date) ? new Date(item.end_date).format("yyyy-mm-dd") : "-";
				const placeEndDate = (item.place_end_date) ? new Date(item.place_end_date).format("yyyy-mm-dd") : "-";
				const startTime = (item.startDate) ? new Date(item.startDate).format("hh:MM") : "-";
				const endTime = (item.endDate) ? new Date(item.endDate).format("hh:MM") : "-";
				return `
					<tr class="${statusColor}" data-status="${item.status}" data-sequence="${item.sequence}">
						<td>${item.name}</td>
						<td>${statusName}</td>
						<td>${placeEndDate}</td>
						<td>${passEndDate}</td>
						<td>${startTime}</td>
						<td>${endTime}</td>
					</tr>
				`;
			});
			return tr.join("");
		},
	},
	memberInfo : {
		seqMember : 0,
		data : {},
		open : function(status, sequence) {
			const data = this.parent.entranceList.data;
			const dataList = [].concat(data.entranceList, data.refusedList, data.standbyList);
			const entranceInfo = (status && sequence) ? dataList.filter(item => {
				return (item.status == status && item.sequence == sequence);
			})[0] : this.data.entranceInfo;
			if(!entranceInfo) return;

			const seqMember = entranceInfo.seq_member;
			commonController.memberInfo(seqMember, true).then(memberInfo => {
				Promise.all([
					memberController.passList(seqMember),
					orderController.orderInfo.list(seqMember),
					memberCounselingController.selectMore({
						searchParamMap : {
							seqMember : seqMember
						}
					})
				]).then(([passList, orderList, counselingList]) => {
					this.seqMember = seqMember;
					this.sequence = sequence;
					this.data = {
						entranceInfo : entranceInfo || {},
						memberInfo : memberInfo || {},
						passList : passList || {},
						orderList : orderList.sort(function(a, b) {
							return (a.seqOrderInfo == b.seqOrderInfo) ? 0 : (a.seqOrderInfo < b.seqOrderInfo) ? 1 : -1;
						}),
						counselingList : (counselingList.data) ? counselingList.data.memberCounselingList || [] : []
					};
					this.data.counselingList = componentMember.permission.counselingList(this.permission, this.data.counselingList);
					this.render();
				}).catch(error => {
					uiError(error);
				});
			}).catch(error => {
				if(error.status == 422) {
					alert("회원 정보를 찾을 수 없습니다.");
					this.reset();
				} else uiError(error);
			});
		},
		update : function(isRefresh, isList) {
			if(!isRefresh) {
				this.open();
				return;
			}
			const data = this.data.entranceInfo;
			if(!data) return;
			const status = data.status;
			const sequence = data.sequence;
			this.parent.entranceList.open(0, () => {
				const trList = this.container.querySelectorAll("[data-event='entranceList'] table tbody tr");
				const tr = Array.from(trList).filter(item => {
					return (item.getAttribute("data-status") == status && item.getAttribute("data-sequence") == sequence);
				})[0];
				if(tr) {
					if(isList)
						tr.classList.add("focus");
					else
						this.parent.entranceList.event.changeMemberInfo(tr);
				} else {
					this.reset();
				}
			});
		},
		reset : function() {
			this.seqMember = 0;
			this.data = {
				entranceInfo : {},
				memberInfo : {},
				passList : {},
				orderList : [],
				counselingList : []
			};
			this.render(true);
		},
		render : function(isReset) {
			const self = this.event.self = this.template.self = this;
			const setMemberInfo = () => {
				const section = this.container.querySelector("[data-event='memberInfo']");
				const item = this.data.entranceInfo;
				const statusName = this.parent.getStatusName(item);
				const statusReason = (item.status == "refused" && item.refused_code) ? {
					501 : "일일중복이용",
					502 : "주간이용횟수",
					503 : "이용권 중지 중",
					504 : "유효 이용권 없음",
					505 : "예약내역 없음"
				}[item.refused_code] || "" : "";
				const statusColor = (statusReason) ? "red" : "";

				const date = uiDate(item.startDate, "time");
				let status = (statusName) ? `${date} · <span class="${statusColor}">${statusName}${(statusReason) ? "(" + statusReason + ")" : ""}</span>` : "입장 회원 정보";
				if(item.error) status += ` · <span class="red">${item.error}</span>`;
				section.putValue("entranceStatus", status);

				const div = section.querySelector(".memberInfo .left");
				div.innerHTML = this.template.memberInfo(isReset);

				const setBottomHeight = () => {
					const container = section.parentNode;
					const bottom = container.querySelector("section.bottom");
					const height = container.offsetHeight - section.offsetHeight - 100;	// margin + padding = 100
					bottom.style.maxHeight = ((height < 100) ? 100 : height) + "px";
				};
				setBottomHeight();
				window.onresize = setBottomHeight;

				uiEvent(div, {
					click : {
						assignLocker : function() {self.event.assignLocker()},
						checkout : function() {self.event.checkout()},
						orderPass : function() {self.event.orderPass()},
						updateMember : function() {self.event.updateMember()},
						sendSms : function() {self.event.sendSms()},
						updateMemo : function() {self.event.updateMemo()},
						createCounseling : function() {self.event.popupCounseling(this)},
						cancelStandby : function() {self.event.cancelStandby()},
						enterEntrance : function() {self.event.enterEntrance(this)},
					}
				});

				uiPermission(div);
			};
			const setPassList = () => {
				const div = this.container.querySelector("[data-event='passList']");
				const passAvailableList = div.querySelector("[data-event='passAvailableList']");
				passAvailableList.innerHTML = this.template.passList(this.data.passList.availableList);
				const passExpirationList = div.querySelector("[data-event='passExpirationList']");
				passExpirationList.innerHTML = this.template.passList(this.data.passList.expirationList);

				uiEvent(div, {
					click : {
						changePeriod : function() {self.event.changePeriod(this)},
						changeCoach : function() {self.event.changeCoach(this)},
						usageList : function() {self.event.usageList(this)},
						passPause : function() {self.event.passPause(this)},
					}
				});
				uiPermission(div);
			};
			const setOrderList = () => {
				const table = this.container.querySelector("[data-event='orderList']");
				uiDataTable(table, this.template.orderList());
			};
			const setCounselingList = () => {
				const table = this.container.querySelector("[data-event='counselingList']");
				uiDataTable(table, this.template.counselingList());
				uiEvent(table, {
					click : {
						update : function() {self.event.popupCounseling(this)},
					}
				});
				uiPermission(table);
			};
			const resetTab = () => {
				const input = this.container.querySelectorAll(".ui-tab input[value='1']");
				const div = this.container.querySelectorAll("div.tab");
				input.forEach(item => {
					item.checked = true;
				});
				div.forEach(item => {
					item.classList.remove("focus");
					if(item.classList.contains("tab-1"))
						item.classList.add("focus");
				});
			};

			resetTab();
			setMemberInfo();
			setPassList();
			setOrderList();
			setCounselingList();
		},
		event : {
			assignLocker : function() {
				popupMemberLocker.open(this.self.seqMember, () => {
					this.self.update(true);
				});
			},
			cancelStandby : function() {
				const data = this.self.data.entranceInfo;
				const seqMemberEntranceStandby = data.seq_member_entrance_standby;
				memberEntranceController.cancelStandby(seqMemberEntranceStandby).then(data => {
					alert("해당 입장 대기자를 삭제 하였습니다.");
					this.self.update(true);
				}).catch(error => {
					alert("입장 대기자를 삭제 처리 중 오류가 발생 하였습니다.");
					console.log(error);
				});
			},
			enterEntrance : function(object) {
				const data = this.self.data.entranceInfo;
				const type = (object) ? object.getAttribute("data-type") : "";
				const div = this.self.container.querySelector("[data-event='enterEntranceMenu']");
				if(!type) {
					div.classList.toggle("focus");
					return;
				}
				if(type != "close") {
					if(data.status != "standby") return;
					memberEntranceController.checkin(type, {
						command : undefined,
						seqMember : data.seq_member,
						seqMemberEntranceStandby : data.seq_member_entrance_standby,
						checkinType : type.toUpperCase()
					}).then(data => {
						CheckinPopup.popupLocation = $(this.self.container.querySelector("[data-event='popupLocation']"));
						CheckinPopup.checkinCrm = true;
						CheckinPopup.checkinEntry = type.toUpperCase();
						CheckinCallback.openPopup(data);
					}).catch(error => {
						console.log(error);
						alert("입장처리 중 오류가 발생하였습니다.");
					});
				}
				div.classList.remove("focus");
			},
			checkout : function() {
				const data = this.self.data.entranceInfo;
				const seqMemberEntrance = data.seq_member_entrance;
				const seqLockerNo = data.seq_partner_locker_list;
				const tr = this.self.container.querySelector("[data-event='entranceList']").querySelector("[data-status='entrance'], [data-sequence='" + seqMemberEntrance + " ']");
				memberEntranceController.checkout(seqMemberEntrance, seqLockerNo).then(data => {
					alert("퇴장 처리 되었습니다.");
					this.self.update(true);
				}).catch(error => {
					alert("퇴장 처리 중 오류가 발생 하였습니다.");
					console.log(error);
				});
			},
			orderPass : function() {
				window.location.href = "/member/" + this.self.seqMember + "/sell/pass";
			},
			updateMember : function() {
				popupRegisterMember.open(this.self.seqMember, {}, false, () => {
					this.self.update();
				});
			},
			updateMemo : function() {
				popupMemberMemo.open(this.self.seqMember, this.self.data.memberInfo.memo, () => {
					alert("수정되었습니다.");
					this.self.update();
				});
			},
			popupCounseling : function(object) {
				const seqMemberCounseling = Number(object.getAttribute("data-sequence"));
				popupMemberCounseling.open(this.self.seqMember, seqMemberCounseling, () => {
					this.updateCounselingList();
				});
			},
			updateCounselingList : function() {
				const self = this.self;
				memberCounselingController.selectMore({
					searchParamMap : {
						seqMember : this.self.seqMember
					}
				}).then(counselingList => {
					counselingList = (counselingList.data) ? counselingList.data.memberCounselingList || [] : [];
					this.self.data.counselingList = componentMember.permission.counselingList(this.self.permission, counselingList);
					const table = self.container.querySelector("[data-event='counselingList']");
					uiDataTable(table, self.template.counselingList());
					uiEvent(table, {
						click : {
							update : function() {self.event.popupCounseling(this)},
						}
					});
					uiPermission(table)
				}).catch(error => {
					console.log(error);
				});
			},
			sendSms : function() {
				const data = this.self.data.memberInfo;
				popupSmsSend.open({
					smsMemberList : [{
						seqMember : data.seqMember,
						receiveNumber: data.mobile.replace(/-/g, ""),
						memberName : data.memberName || data.name,
						membershipNo : data.membershipNo,
						sendRoute : "MEMBER",
						reservationYn : "N",
					}]
				});
			},
			changePeriod : function(object) {
				popupMemberPass.changePeriod.open(this.getPassInfo(object), () => {
					this.self.update();
				});
			},
			changeCoach : function(object) {
				popupMemberPass.changeCoach.open({
					passInfo : this.getPassInfo(object),
					coachList : this.self.parent.data.coachList
				}, () => {
					this.self.update();
				});
			},
			usageList : function(object) {
				const passInfo = this.getPassInfo(object);
				const passName = componentMember.getPassName(passInfo);
				const serviceType = passInfo.serviceType.toLowerCase();
				const seqPassInfo = passInfo.seqPassInfo;
				popupMemberPass.usageList.open(passName, serviceType, seqPassInfo);
			},
			passPause : function(object) {
				const seqPassInfo = Number(object.parentTagName("li").getAttribute("data-sequence"));
				// popupPassPause.open(this.self.seqMember, seqPassInfo);
				window.location.href = "/member/" + this.self.seqMember + "/pass/" + seqPassInfo + "/pause";
			},
			getPassInfo : function(object) {
				const seqPassInfo = Number(object.parentTagName("li").getAttribute("data-sequence"));
				const passList = [].concat(this.self.data.passList.availableList, this.self.data.passList.expirationList);
				const data = passList.filter(item => {
					return (item.seqPassInfo == seqPassInfo);
				})[0];
				return (data) ? data : {};
			}
		},
		template : {
			memberInfo : function(isReset) {
				const item = this.self.data.memberInfo;
				const name = (item.memberName) ? item.memberName + " (" + ((item.sex == "M") ? "남" : "여") + ")" : "-";
				const birthday = (item.birthday) ? uiDate(item.birthday) : "-";
				const address = (item.address) ? item.address + ((item.addressDetail) ? " " + item.addressDetail : "") : "-";
				const coachName = componentMember.getCoachName(item.seqPartnerCoach) || "-";
				const thumbnail = (item.imgUrl) ? item.imgUrl : "/static/img/brand/symbol_gray.png";
				const memberApp = (isReset) ? "-" : (item.mobileMemberEmail) ? "사용" : "미사용";
				const useCount = (isReset) ? "-" : getComma(item.cumulativeUseCount || 0) + "회";
				const branchName = componentMember.getBranchName(item);
				const isBranch = (partnerInfo.partner.branchUseYn == "Y") ? "branch" : "";
				const memberLink = (item.seqMember) ? `<a class="underline" href="/member/${item.seqMember}/home">회원상세</a>` : "";
				const getThumbnail = () => {
					const div = `<div class="thumbnail"><img src="${thumbnail}" /></div>`;
					return (item.seqMember) ? `<a href="/member/${item.seqMember}/home">${div}</a>` : div;
				};

				const getExpireDate = (serviceType) => {
					const expireList = item.expirationDateList || [];
					if(expireList.length == 0) return "-";
					serviceType = serviceType.toUpperCase();
					const data = expireList.filter(item => {
						return (item.serviceType == serviceType);
					})[0];
					return (data) ? data.endDate : "-";
				};
				const getLockerList = () => {
					const lockerList = item.lockerList || [];
					if(lockerList.length == 0) return "-";
					const li = lockerList.map(item => {
						return `<li>${item.lockerName} / ${item.lockerNo}번 / 만료 : ${item.endDt}</li>`;
					});
					const className = (lockerList.length < 2) ? "" : "";
					return `<ul class="${className}">${li.join("")}</ul>`;
				};
				const getGroupList = () => {
					const groupList = item.memberGroupList || [];
					const li = groupList.map(item => {
						return item.groupName || "-";
					});
					return (li.length > 0) ? li.join(", ") : "-";
				};
				const getPauseList = () => {
					const pauseList = item.passInfoPauseList || [];
					if(pauseList.length == 0) return "-";

					const passList = this.self.data.passList.availableList || [];
					const li = pauseList.map(item => {
						const seqPassInfo = item.seqPassInfo;
						const data = passList.filter(item => {
							return (item.seqPassInfo == seqPassInfo);
						})[0];
						const passName = (data) ? componentMember.getPassName(data) : "기타";
						return `<li>${passName} / ${item.pauseStartDate} ~ ${item.pauseEndDate}</li>`;
					});
					const className = (pauseList.length < 2) ? "" : "";
					return `<ul class="${className}">${li.join("")}</ul>`;
				};
				const getButtonList = () => {
					const item = this.self.data.entranceInfo;
					const li = [];
					if(!item.status) return "";
					switch(item.status) {
						case "standby" :
							li.push(`<li><button class="ui-button blue" data-event="enterEntrance">입장 처리</button></li>`);
							li.push(`<li><button class="ui-button red" data-event="cancelStandby">대기 삭제</button></li>`);
							break;
						case "entrance" :
							if(!item.endDate) {
								if(!item.seq_partner_locker_list)
									li.push(`<li><button class="ui-button blue" data-event="assignLocker" data-permission="permissionMember/locker">락커 배정</button></li>`);
								li.push(`<li><button class="ui-button red" data-event="checkout">퇴장 처리</button></li>`);
							}
							break;
					}
					return li.join("") + `
						<li><button class="ui-button green" data-event="orderPass" data-permission="permissionPayment/payment">이용권 판매</button></li>
						<li>
							<dl>
								<dt><button class="ui-button white" data-event="updateMember" data-permission="permissionMember/regist">회원 수정</button></dt>
								<dd><button class="ui-button white" data-event="sendSms" data-permission="permissionMember/sendSms">문자 발송</button></dd>
							</dl>
						</li>
						<li>
							<dl>
								<dt><button class="ui-button white" data-event="updateMemo" data-permission="permissionMember/regist">메모 수정</button></dt>
								<dd><button class="ui-button white" data-event="createCounseling" data-permission="permissionMember/updateCounseling">상담 등록</button></dd>
							</dl>
						</li>
					`;
				};
				return `
					<dl class="${isBranch}">
						<dt>
							${getThumbnail()}
							<ul>${getButtonList()}</ul>
							<div class="menu" data-event="enterEntranceMenu">
								<ul>
									<li><button class="ui-button white" data-type="schedule" data-event="enterEntrance">예약 입장</button></li>
									<li><button class="ui-button white" data-type="place" data-event="enterEntrance">시설 이용</button></li>
									<li><button class="ui-button white" data-type="pass" data-event="enterEntrance">이용권 조회</button></li>
									<li><button class="ui-button" data-type="close" data-event="enterEntrance">닫기</button></li>
								</ul>
							</div>
						</dt>
						<dd>
							<table class="ui-table">
								<tr class="branchDisplay"><th>지점명</th><td colspan="3">${branchName}</td></tr>
								<tr><th>이름</th><td>${name}${memberLink}</td><th>휴대폰 번호</th><td>${item.mobile || "-"}</td></tr>
								<!--<tr><th><span class="branchDisplay">[지점명]</span> 이름</th><td><span class="branchDisplay">[${branchName}]</span> ${name}</td><th>휴대폰 번호</th><td>${item.mobile || "-"}</td></tr>-->
								<tr><th>생년월일</th><td>${birthday}</td><th>회원번호</th><td>${item.membershipNo || "-"}</td></tr>
								<tr><th>주소</th><td colspan="3">${address}</td></tr>
								<tr><th>장소이용 만료</th><td>${getExpireDate("place")}</td><th>최초 등록일</th><td>${item.firstPaymentDate || "-"}</td></tr>
								<tr><th>개인레슨 만료</th><td>${getExpireDate("appointment")}</td><th>최근 결제일</th><td>${item.latestPaymentDate || "-"}</td></tr>
								<tr><th>그룹수업 만료</th><td>${getExpireDate("class")}</td><th></th><td></td></tr>
								<tr><th>락커정보</th><td class="multiple" colspan="3">${getLockerList()}</td></tr>
								<tr><th>중지기간</th><td class="multiple" colspan="3">${getPauseList()}</td></tr>
								<tr><th>누적 이용횟수</th><td>${useCount}</td><th>회원그룹</th><td>${getGroupList()}</td></tr>
								<tr><th>회원 앱</th><td>${memberApp}</td><th>담당자</th><td>${coachName}</td></tr>
								<tr><th>메모</th><td class="memo" colspan="3">${item.memo || "-"}</td></tr>
							</table>
						</dd>
					</dl>
				`;
			},
			passList : function(data) {
				if(!data) data = [];
				const getRemainPeriod = (item) => {
					const usePeriod =componentMember.getUsePeriodDay(item);
					let spendPeriod = getPeriod(item.useStartDate, getDate()) + 1;
					if(spendPeriod > usePeriod) spendPeriod = usePeriod;
					else if(spendPeriod < 0) spendPeriod = 0;
					return `${usePeriod - spendPeriod}일 / ${usePeriod}일`;
				};
				const getRemainNumber = (item) => {
					if(item.serviceKind == "P" || item.useNumber < 0) return "무제한";
					return `${item.remainNumber}회 / ${item.useNumber}회`;
				};
				const getButtonList = (item) => {
					const serviceType = item.serviceType.toLowerCase();
					const buttonList = [];
					buttonList.push(`<button class="ui-button white" data-event="changePeriod" data-permission="permissionMember/updateUsage">기간/횟수 변경</button>`);
					buttonList.push(`<button class="ui-button white" data-event="passPause">이용권 중지</button>`);

					switch (serviceType) {
						case "appointment" :
							buttonList.push(`<button class="ui-button white" data-event="changeCoach">담당강사 변경</button>`);
						case "class" :
							buttonList.push(`<button class="ui-button white" data-event="usageList">사용내역 보기</button>`);
							break;
					}
					return buttonList.join();
				};

				const li = data.map(item => {
					const serviceType = item.serviceType;
					const serviceColor = uiParameter.service.color[serviceType];
					let passName = componentMember.getPassName(item);
					const coachName = componentMember.getCoachName(item.seqPartnerCoach);
					if(serviceType == "APPOINTMENT") passName += " (강사 : " + coachName + ")";
					const reservationNumber = getComma((item.schedules || []).length);
					return `
						<li data-sequence="${item.seqPassInfo}">
							<div class="top">
								<h4>${passName}</h4>
								<div class="category bg ${serviceColor}"></div>
							</div>
							<div class="middle">
								이용기간 : ${item.useStartDate} ~ ${item.useEndDate} · 예약 중 : ${reservationNumber}건<br>
								잔여기간 : ${getRemainPeriod(item)} · 잔여횟수 : ${getRemainNumber(item)}
							</div>
							<div class="bottom">
								${getButtonList(item)}
							</div>
						</li>
					`;
				});
				return li.join("");
			},
			orderList : function() {
				let data = this.self.data.orderList;
				componentMember.setPassList(data);
				/*
				data = data.filter(item => {
					const passStatus = componentMember.pass.getPassStatus(item);
					if(item.orderState == "CANCELLED") return false;
					if(passStatus != "AVAILABLE" && passStatus != "PAUSE") return false;
					return true;
				});
				*/
				const tr = data.filter(item => {
					return (item.orderState != "CANCELLED");
				}).map(item => {
					const orderDate = componentMember.getDate(item.orderDatetime || item.orderCompletedDatetime);
					const coachName = componentMember.getCoachName(item.seqPartnerCoach);
					const orderStateColor = componentMember.getOrderStateColor(item);

					const passStatus = componentMember.pass.getPassStatus(item);
					const trColor = (item.orderState == "CANCELLED" || (passStatus != "AVAILABLE" && passStatus != "PAUSE")) ? "hidden" : "";
//					const trColor = "";
					return `
						<tr class="${trColor}">
							<td class="branchDisplay">${componentMember.getBranchName(item)}</td>
							<td>${orderDate}</td>
							<td>${item.seqOrderInfo || "-"}</td>
							<td>${componentMember.getOrderType(item)}</td>
							<td>${componentMember.getOrderState(item)}</td>
							<td class="multiple">${componentMember.getPassList(item, "passState")}</td>
							<td class="name multiple">${componentMember.getPassList(item, "name")}</td>
							<td class="currency multiple">${componentMember.getPassList(item, "price")}</td>
							<td class="currency multiple">${componentMember.getPassList(item, "discountAmount")}</td>
							<td class="currency multiple">${componentMember.getPassList(item, "salePrice")}</td>
							<td class="currency multiple">${componentMember.getPassList(item, "paymentAmount")}</td>
							<td class="currency multiple">${componentMember.getPassList(item, "receivables")}</td>
							<td>${coachName}</td>
							<td class="memo">${item.memo}</td>
						</tr>
					`;
				});
				return tr.join("");
			},
			counselingList : function() {
				const data = this.self.data.counselingList;
				const tr = data.map(item => {
					const coachName = componentMember.getCoachName(item.seq_partner_coach);
					return `
						<tr>
							<td>${uiDate(item.reg_dt, "time")}</td>
							<!--<td>-</td>-->
							<td>${coachName}</td>
							<td>${item.counseling_means_value || "-"}</td>
							<td>${item.counseling_purpose_value || "-"}</td>
							<td class="memo">${item.memo}</td>
							<td><button class="ui-button small white" type="button" data-sequence="${item.seq_member_counseling}" data-event="update" data-permission="permissionMember/updateCounseling">수정</button></td>
						</tr>
					`;
				});
				return tr.join("");
			}
		}
	}
};
</script>
<?php
include_once(G5_THEME_PATH.'/tail.php');