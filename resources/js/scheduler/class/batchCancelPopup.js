const batchCancelPopup = {
	popup : undefined,
	data : {
		spaceList : [],
		scheduleList : [],
		search : {
			startDate : "",
			endDate : "",
			seqPartnerSpaceList : [],
			maxPeriod : 32,
			maxLimit : 20,
			unit : 1
		}
	},
	open : function(startDate, endDate, seqPartnerSpace) {
		if(this.popup) return;
		Promise.all([
			commonController.placeList()
		]).then(([spaceList]) => {
			this.data.spaceList = spaceList || [];
			this.data.search = {
				startDate : startDate,
				endDate : endDate,
				seqPartnerSpaceList : [seqPartnerSpace],
				maxPeriod : this.data.search.maxPeriod,
				maxLimit : this.data.search.maxLimit,
				unit : this.data.search.unit
			}
			this.render();
			$(this.popup).fadeIn(300);
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	close : function(isUpdate) {
		$(this.popup).fadeOut(300, () => {
			this.popup.parentNode.innerHTML = "";
			this.popup = undefined;
		});
		if(isUpdate)
			schedulePopup.resetReload();
	},
	search : function() {
		const startDate = this.popup.querySelector("[name='startDate']");
		const endDate = this.popup.querySelector("[name='endDate']");
		const momentStartDate = moment(startDate.value);
		const momentEndDate = moment(endDate.value);
		const maxEndDate = new Date(startDate.value);
		maxEndDate.setMonth(maxEndDate.getMonth() + 3);
		if(new Date(startDate).getTime() > maxEndDate.getTime()) {
			return;
		}
		const seqPartnerSpaceList = Array.from(this.popup.querySelector("[name=spaceList]").querySelectorAll("option:checked")).map(item => {
			return item.value;
		});
		let error = "";
		const maxPeriod = this.data.search.maxPeriod;
		const day = momentEndDate.diff(momentStartDate, "days");

		if(day < 0) error = "시작날짜와 종료날짜를 다시 한 번 확인해 주세요.";
		else if(new Date(endDate.value).getTime() > maxEndDate.getTime()) error = "검색 기간은 최대 3달까지 가능합니다.";
//		else if(day > maxPeriod) error = "검색 기간은 최대 " + maxPeriod + "일까지 가능합니다.";
		else if(seqPartnerSpaceList.length == 0) error = "장소를 선택해 주세요.";
		if(error){
			alert(error);
			if(error.indexOf("장소") == -1) {
				startDate.value = this.data.search.startDate.format("yyyy-MM-dd");
				endDate.value = this.data.search.endDate.format("yyyy-MM-dd");
			}
			return;
		}
		const data = {
			classScheduleDto : {
				startDt : momentStartDate,
				endDt : momentEndDate
			},
			seqPartnerSpaces : seqPartnerSpaceList,
			optIncludeSchedule : true,
//			searchPurpose : "cancel"
		};

		ClassScheduleController.findAllByPartnerInRangeAndSpaces(data).then(data => {
			this.data.scheduleList = data || [];
			this.event.updateList();
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	submit : function() {
		const scheduleList = Array.from(this.popup.querySelectorAll("tbody [name='seqPartnerClassSchedule']:checked")).map(item => Number(item.value));
		if(scheduleList.length == 0) {
			alert("취소할 수업을 선택해 주세요.");
			return;
		}
		const cancelScheduleList = [];
		scheduleList.forEach(item => {
			const seqPartnerClassSchedule = item;
			const scheduleInfo = this.data.scheduleList.filter(item => {
				return (item.seqPartnerClassSchedule == seqPartnerClassSchedule);
			})[0];
			if(scheduleInfo) cancelScheduleList.push(scheduleInfo);
		});
		this.data.cancelScheduleList = cancelScheduleList;
		batchCancelClassConfirmPopup.open(this, () => {
			const data = scheduleList.map(item => {
				return {
					seqPartnerClassSchedule : item,
					useYn : "N"
				}
			});
			const unit = this.data.search.unit;
			const repeat = Math.ceil(data.length / unit);
			const ajaxList = [];
			for(let i = 0; i < repeat; i++) {
				const sliceData = data.splice(0, unit);
				ajaxList.push(function() {
					return ClassScheduleController.cancel(sliceData).then(data => {
						uiAjaxList.data.success += Number(data.successCount || 0);
						uiAjaxList.data.failed += Number(data.failCount || 0);
						return data;
					}).catch(error => {
						console.log(error);
						return false;
					});
				});
			}
			uiAjaxList.open(ajaxList, {
				complete : () => {
					schedulePopup.resetReload();
					this.search();
					// this.close(true);
				}
			}, true);
			/*
			ClassScheduleController.cancel(data).then(data => {
				const success = getComma(data.successCount || 0);
				const failed = getComma(data.failCount || 0);
				alert(`수업 일괄취소 작업이 완료되었습니다.\n - 성공 : ${success}\n - 실패 : ${failed}`);
				schedulePopup.resetReload();
				this.search();
				// this.close(true);
			}).catch(error => {
				console.log(error);
				alert("처리 중 오류가 발생하였습니다.");
			});
			*/
		})
	},
	render : function() {
		const container = document.querySelector("[data-popup-location='팝업 위치']");
		container.innerHTML = this.template();
		this.popup = container.querySelector("[data-id='강사 일괄 변경']");
		const self = this.event.self = this;

		const setCalendar = () => {
			const today = new Date();
			$(this.popup).find(".calendar").filter(function() {
				$(this).datepicker({
					yearSuffix : "년",
					monthNames : ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
					dayNamesMin : ["일", "월", "화", "수", "목", "금", "토"],
					dateFormat : "yy-mm-dd",
					firstDay : 1,
					setDate : today
				});
			});
			const dateFormat = scheduler.date.date_to_str('%Y-%m-%d');
			const startDate = dateFormat(this.data.search.startDate);
			const endDate = dateFormat(this.data.search.endDate);
			this.popup.querySelector("[name='startDate']").value = startDate;
			this.popup.querySelector("[name='endDate']").value = endDate;
		};
		const setSelector = () => {
			this.data.search.seqPartnerSpaceList.forEach(item => {
				this.popup.querySelector("option[value='" + item + "']").selected = true;
			});
			$(this.popup.querySelector("[name=spaceList]")).SumoSelect({
				placeholder : "장소 선택",
				csvDispCount : 3,
				captionFormat : "{0}개 선택",
			});
		};
		const setEvent = () => {
			const popup = $(this.popup);
			popup.on("click", "[data-event='close']", function() {
				self.close();
			});
			popup.on("click", "[data-event='search']", function() {
				self.search();
			});
			popup.on("click", "[data-event='submit']", function() {
				self.submit();
			});
			popup.on("change", "[data-event='checkbox']", function() {
				self.event.changeCheckBox(this);
			});
			popup.on("change", "[data-event='checkPeriod']", function() {
//				self.event.checkPeriod();
			});
		};
		setCalendar();
		setSelector();
		setEvent();
		this.search();
	},
	event : {
		checkPeriod : function() {
			const startDate = moment(this.self.popup.querySelector("[name='startDate']").value);
			const endDate = moment(this.self.popup.querySelector("[name='endDate']").value);
			const maxPeriod = this.self.data.search.maxPeriod;
			const day = endDate.diff(startDate, "days");
			if(day >= maxPeriod) {
				alert("검색 기간은 최대 " + maxPeriod + "일까지 가능합니다.");
				const fixDate = scheduler.date.add(startDate, 6, "day").format("yyyy-MM-dd");
				this.self.popup.querySelector("[name='endDate']").value = fixDate;
			} else if(day < 0) {
				const fixDate = this.self.popup.querySelector("[name='startDate']").value;
				this.self.popup.querySelector("[name='endDate']").value = fixDate;
			}
		},
		changeCheckBox : function(object) {
			const value = Number(object.value);
			const inputList = this.self.popup.querySelectorAll("tbody [name='seqPartnerClassSchedule']:not([disabled])");
			const maxLimit = this.self.data.search.maxLimit;
			if(value) {
				const checkedInputList = this.self.popup.querySelectorAll("tbody [name='seqPartnerClassSchedule']:checked");
				if(checkedInputList.length > maxLimit)
					object.checked = false;
				const input = this.self.popup.querySelector("thead [name='seqPartnerClassSchedule']");
				input.checked = (inputList.length > 0 && inputList.length == checkedInputList.length);
			} else {
				const checked = (object.checked);
				inputList.forEach((item, index) => {
					item.checked = (checked && index < maxLimit);
				});
			}
		},
		updateList : function() {
			const div = this.self.popup.querySelector("[data-id='list']");
			let tr = this.self.data.scheduleList.map(item => {
				const count = {entrance : 0, absent : 0, reserve : 0, waiting : 0};
				const scheduleList = (item.schedules || []).filter(item => {
					return (item.scheduleState != "C");
				});
				scheduleList.forEach(item => {
					const state = item.scheduleState;
					if(state == "E") count.entrance++;
					else if(state == "A") count.absent++;
					else if(state == "R") count.reserve++;
					else if(state == "W") count.waiting++;
				});
				const startDate = new Date(item.startDt).format("yyyy-MM-dd (sE)");
				const startTime = (item.startTime || "").substr(0, 5);
				const isDisabled = (count.entrance > 0 || count.absent > 0) ? "disabled" : "";
				return `
					<tr>
						<th>
							<label class="ui-input-checkbox">
								<input name="seqPartnerClassSchedule" type="checkbox" value="${item.seqPartnerClassSchedule}" data-event="checkbox" ${isDisabled}>
								<span></span>
							</label>
						</th>
						<td>${startDate} ${startTime}</td>
						<td class="name">${item.lessonName}</td>
						<td>${(item.coach) ? item.coach.coachName : "-"}</td>
						<td>${(item.space) ? item.space.spaceName : "-"}</td>
						<td class="green">${count.entrance}명</td>
						<td class="red">${count.absent}명</td>
						<td class="blue">${count.reserve}명</td>
						<td class="gray">${count.waiting}명</td>
					</tr>
				`;
			});
			tr = (tr.length == 0) ? tr = `<tr><td class="empty" colspan="10">수업 내역이 없습니다.</td></tr>` : tr.join("");
			div.innerHTML = `
				<table class="ui-table dark even">
					<thead>
						<tr>
							<th>
								<label class="ui-input-checkbox">
									<input name="seqPartnerClassSchedule" type="checkbox" value="0" data-event="checkbox">
									<span></span>
								</label>
							</th>
							<td>수업일시</td>
							<td>수업명</td>
							<td>담당강사</td>
							<td>장소</td>
							<td>출석</td>
							<td>결석</td>
							<td>예약</td>
							<td>대기</td>
						</tr>
					</thead>
					<tbody>
						${tr}
					</tbody>
				</table>
			`;
		}
	},
	template : function() {
		const maxLimit = this.data.search.maxLimit;
		const getSpaceList = () => {
			const option = this.data.spaceList.map(item => {
				return `<option value="${item.seqPartnerSpace}">${item.spaceName}</option>`;
			});
			return option.join("");
		};
		return `
			<style type="text/css">
.batchCancelPopup										{display:none; visibility:visible; opacity:1; transition:none}
.batchCancelPopup > div > div > div						{width:820px}
.batchCancelPopup .middle button						{width:125px}
.batchCancelPopup .middle input,
.batchCancelPopup .middle select,
.batchCancelPopup .middle .SumoSelect 					{margin:0 5px; width:175px; min-width:175px; background-color:white; text-align:center; text-align-last:center}
.batchCancelPopup .middle .SumoSelect 					{text-align:left !important}

.batchCancelPopup .middle .search						{padding:10px; background-color:#f0f0f0; line-height:35px; text-align:center}
.batchCancelPopup .middle .search > ul > li				{display:inline-block}
.batchCancelPopup .middle .search > ul > li + li		{margin-left:10px}
.batchCancelPopup .middle .search input					{padding-right:35px; min-width:125px}

.batchCancelPopup .middle .list							{position:relative; margin-top:20px; height:400px; background-color:#ccc; border:1px solid #ccc; overflow:auto}
.batchCancelPopup .middle .list th						{width:35px; font-size:0}
.batchCancelPopup .middle .list th label				{display:inline-block; padding:0; width:20px; height:20px}
.batchCancelPopup .middle .list input:disabled + span	{background-color:rgba(255,87,34,0.3); border-color:#ff5722; opacity:0.33}
.batchCancelPopup .middle .list table					{background-color:white; table-layout:auto}
.batchCancelPopup .middle .list table tr > *			{vertical-align:middle; padding:8px; background-color:transparent !important; border:none !important}
.batchCancelPopup .middle .list table tr td				{border-left:1px solid #ccc !important}
.batchCancelPopup .middle .list table tr td.empty		{border:none !important}
.batchCancelPopup .middle .list thead tr > *			{position:sticky; position:-webkit-sticky; top:0; background-color:#686d7b !important; z-index:2}
.batchCancelPopup .middle .list tbody td.name			{min-width:150px; max-width:250px; text-align:left}
.batchCancelPopup .middle .list tbody tr + tr			{border-top:1px solid #ccc}
.batchCancelPopup .middle .list .gray					{color:#999}
			</style>
			<div class="batchCancelPopup ui-popup ui-style" data-id="강사 일괄 변경">
				<div>
					<div>
						<div>
							<div class="top">
								<h2>
									수업 일괄 삭제
									<a data-event="close"></a>
								</h2>
							</div>
							<div class="middle">
								<div class="search">
									<ul>
										<li>
											수업 기간
											<input class="calendar" name="startDate" type="text" data-event="checkPeriod">
											-
											<input class="calendar" name="endDate" type="text" data-event="checkPeriod">
										</li>
										<li>
											장소
											<select name="spaceList" multiple>
												${getSpaceList()}
											</select>
										</li>
										<li>
											<button class="green" data-event="search">검색</button>
										</li>
									</ul>
								</div>
								<p class="ui-note red">
									한 번에 일괄 취소할 수 있는 개수는 최대 ${maxLimit}개 까지입니다.
								</p>
								<div class="list" data-id="list">
								</div>
							</div>
							<div class="bottom">
								<button class="gray" data-event="close">취소</button>
								<button class="red" data-event="submit">수업 일괄 취소</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
};

const batchCancelClassConfirmPopup = {
	popup : undefined,
	data : {},
	callback : undefined,
	open : function(context, callback) {
		if(this.popup) return;
		this.data = context.data;
		this.callback = callback;
		this.render();
	},
	close : function() {
		this.popup.classList.remove("focus");
		setTimeout(() => {
			this.popup.parentNode.removeChild(this.popup);
			this.popup = undefined;
		}, 300);
	},
	submit : function() {
		this.close();
		this.callback();
	},
	render : function() {
		const container = document.querySelector("[data-popup-location='팝업 위치']");
		const self = this;
		const setPopup = () => {
			const div = document.createElement("div");
			div.innerHTML = this.template();
			container.appendChild(div);
			this.popup = div.querySelector("[data-id='강사 일괄 변경 알림']");
			setTimeout(() => {
				this.popup.classList.add("focus");
			}, 100);
		};
		const setEvent = () => {
			const popup = $(this.popup);
			popup.on("click", "[data-event='close']", function() {
				self.close();
			});
			popup.on("click", "[data-event='submit']", function() {
				self.submit();
			});
		};
		setPopup();
		setEvent();
	},
	template : function() {
		const cancelScheduleList = this.data.cancelScheduleList;
		const cancelScheduleCount = cancelScheduleList.length;
		let cancelReserveCount = 0;
		cancelScheduleList.forEach(item => {
			(item.schedules || []).forEach(item => {
				if(item.scheduleState == "R") cancelReserveCount++;
			});
		});
		return `
			<style type="text/css">
				.batchCancelClassConfirmPopup > div > div > div		{width:480px; font-size:13.5px}
				.batchCancelClassConfirmPopup .middle h4			{line-height:1.3; font-size:17px}
				.batchCancelClassConfirmPopup .middle p				{color:#222}
			</style>
			<div class="batchCancelClassConfirmPopup ui-popup ui-style" data-id="강사 일괄 변경 알림">
				<div>
					<div>
						<div>
							<div class="top">
								<h2>
									주의! 수업 일괄 취소
									<a data-event="close"></a>
								</h2>
							</div>
							<div class="middle">
								<h4 class="red">
									수업 일괄 취소할 경우<br>수업은 삭제되며 복구는 불가능 합니다.
								</h4>
								<br>
								<p>
									예약이 있는 수업도 모두 예약이 취소되고 수업은 삭제됩니다. 예약 취소에 대한 푸시 알림은 전송되지만, 휴대폰 상황에 따라 회원에게 전달되지 않거나 확인 못할 수도 있으니 개별 안내는 반드시 필요합니다.
								</p>
								<br>
								<p class="ui-note red">
									- 일괄 삭제할 수업 수 : <var class="red">${getComma(cancelScheduleCount)}개</var><br>
									- 일괄 예약 취소되는 예약 수 : <var class="red">${getComma(cancelReserveCount)}개</var>
								</p>
								<br>
								선택한 수업을 모두 일괄취소 하시겠습니까?
							</div>
							<div class="bottom">
								<button class="gray" data-event="close">취소</button>
								<button class="red" data-event="submit">수업 일괄 취소</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
};
