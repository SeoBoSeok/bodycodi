// 일괄 예약 팝업
const popupScheduleReservation = {
	appointment : {
		search : {
			popup : undefined,
			data : {
				searchInfo : {},
				maxPeriod : 6,
				maxCount : 100,
				unitCount : 1,
			},
			callback : undefined,
			open : function(seqMember, seqPassInfo, callback) {
				if(this.popup) return;
				Promise.all([
					scheduleController.reservation.appointment.info(seqMember, seqPassInfo)
				]).then(([data]) => {
					this.data.passInfo = data.passInfo || {};
					this.data.passInfo.reserveCount = data.reservationCount || 0;
					this.render();
					this.callback = callback;
				}).catch(error => {
					console.log(error);
					alert("데이터를 가져오는데 실패하였습니다.");
				});
			},
			close : function(isUpdate) {
				this.popup = uiPopup();
				if(isUpdate) {
					if(this.callback)
						this.callback();
					else
						window.location.reload(true);
				}
			},
			check : function(data) {
				const passInfo = this.data.passInfo;
				for(let name in data) {
					const value = data[name];
					const isEmpty = (!value);
					let error = "";
					switch(name) {
						case "startDate" 	:
							if(isEmpty) {
								error = "시작 날짜를 입력해 주세요.";
							} else if(isLessDate(passInfo.useStartDate, value)) {
								error = "시작 날짜가 이용권 기간을 벗어났습니다.";
							} else if(isLessDate(new Date(), value)) {
								error = "지난 날짜에는 일괄 예약을 할 수 없습니다.";
							}
							break;
						case "endDate"		:
							const maxEndDate = new Date();
							maxEndDate.setMonth(new Date().getMonth() + this.data.maxPeriod);
							if(isEmpty) {
								error = "종료 날짜를 입력해 주세요.";
							} else if(isMoreDate(passInfo.useEndDate, value)) {
								error = "종료 날짜가 이용권 기간을 벗어났습니다.";
							} else if(getPeriod(data.startDate, data.endDate) < 0) {
								error = "종료 날짜를 시작 날짜 보다 크게 설정해 주세요.";
							} else if(isMoreDate(maxEndDate, value)) {
								error = "최대 검색 기간은 최대 " + this.data.maxPeriod + "개월 입니다.";
							}
							break;
						case "reservationCount"	: if(isEmpty) error = "예약 진행 횟수를 선택해 주세요."; break;
						case "weekInfoList"		:
							if(!value.length) {
								error = "예약 요일과 시간을 선택해 주세요.";
							} else {
								if(value.some(item => {
									return (!item.startTime);
								})) error = "선택하신 예약 요일의 시작 시간을 입력해 주세요.";
							}
							break;
					}
					if(error) {
						alert(error);
						const node = this.popup.querySelector(name);
						if(node) node.focus();
						return false;
					}
				}
				return true;
			},
			submit : function() {
				const getWeekList = () => {
					const weekList = this.popup.getValue("week");
					const hourList = this.popup.querySelectorAll("[name='hour']");
					const minuteList = this.popup.querySelectorAll("[name='minute']");
					return weekList.map(item => {
						let index = Number(item) - 1;
						if(index < 0) index = 6;
						const hour = hourList[index].value;
						const minute = minuteList[index].value;
						return {
							week : Number(item),
							startTime : (hour && minute) ? hour + ":" + minute : ""
						}
					});
				};
				const data = {
					seqPassInfo : this.data.passInfo.seqPassInfo,
					startDate : this.popup.getValue("startDate"),
					endDate : this.popup.getValue("endDate"),
					reservationCount : this.popup.getValue("reserveCount", true),
					weekInfoList : getWeekList()
				};
				if(!this.check(data)) return;
				this.data.searchInfo = data;
				popupScheduleReservation.appointment.searchResult.open(this);
			},
			render : function() {
				const self = this.event.self = this;
				this.popup = uiPopup({
					template : this.template(),
					beforeEvent : (popup) => {
						uiCalendar(popup);
					},
					event : {
						click : {
							close : function() {self.close();},
							submit : function() {self.submit();},
							preset : function() {self.event.preset(this);},
						},
						change : {
							changeHour : function() {self.event.changeHour(this);}
						}
					}
				});
			},
			event : {
				changeHour : function(object) {
					const selectList = object.parentNode.querySelectorAll("select");
					if(!selectList[1].value)
						selectList[1].value = "00";
				},
				preset : function(object) {
					const value = Number(object.getAttribute("data-value"));
					const tr = this.self.popup.querySelector("[data-id='weekInfo']");
					switch(value) {
						case 0 :
							tr.querySelectorAll("select").forEach(item => item.value = "");
							tr.querySelectorAll("input").forEach(item => item.checked = false);
							break;
						case 5 :
							tr.querySelectorAll("input").forEach((item, index) => item.checked = (index < 5));
							break;
						case 7 :
							tr.querySelectorAll("input").forEach(item => item.checked = true);
							break;

					}
				}
			},
			template : function() {
				const passInfo = this.data.passInfo;
				const usePeriod = componentMember.getUsePeriod(passInfo, true);
				const coachName = ((passInfo.passCoaches || [])[0].coachInfo || {}).coachName || "-";
				const getRemainNumber = () => {
					const remainNumber = (passInfo.serviceKind == "P" || passInfo.remainNumber < 0) ? "무제한" : passInfo.remainNumber + "회";
					const reserveCount = passInfo.reserveCount || 0;
					return `${remainNumber} (예약건수 : ${reserveCount}회)`;
				};
				const getCountList = () => {
					const maxCount = this.data.maxCount;
					const remainNumber = passInfo.remainNumber;
					const reserveCount = passInfo.reserveCount || 0;
					const j = (passInfo.serviceKind == "P") ? maxCount : Math.min(remainNumber - reserveCount, maxCount);
					const optionList = [];
					if(passInfo.serviceKind == "P")
						optionList.push(`<option value="-1" selected>무제한</option>`);
					for(let i = 1; i <= j; i++)
						optionList.push(`<option value=${i}>${i}</option>`);
					return optionList.join("");
				};
				const getWeekList = () => {
					const getHourList = () => {
						const option = [];
						for(let i = 0; i < 24; i++)
							option.push(`<option value="${i.zf(2)}">${i.zf(2)}</option>`);
						return option.join("");
					};
					const getMinuteList = () => {
						const option = [];
						for(let i = 0; i < 60; i += 5)
							option.push(`<option value="${i.zf(2)}">${i.zf(2)}</option>`);
						return option.join("");
					};
					const weekList = ["월", "화", "수", "목", "금", "토", "일"];
					const li = weekList.map((item, index) => {
						const value = (index == 6) ? 0 : index + 1;
						const color = (index == 6) ? "red" : (index == 5) ? "blue" : "";
						return `
							<li>
								<dl>
									<dt>
										<label class="ui-input-checkbox">
											<input name="week" type="checkbox" value="${value}">
											<span></span>
										</label>
									</dt>
									<dd class="${color}">${item}</dd>
									<dd>
										<select class="ui-select time" name="hour" data-event="changeHour">
											<option value="">시</option>
											${getHourList()}
										</select>
										:
										<select class="ui-select time" name="minute">
											<option value="">분</option>
											${getMinuteList()}
										</select>
									</dd>
								</dl>
							</li>
						`;
					});
					return li.join("");
				};
				/*
				const getWeekList = () => {
					const getHourList = () => {
						const option = [];
						for(let i = 0; i < 24; i++)
							option.push(`<option value="${i.zf(2)}">${i.zf(2)}</option>`);
						return option.join("");
					};
					const getMinuteList = () => {
						const option = [];
						for(let i = 0; i < 60; i += 5)
							option.push(`<option value="${i.zf(2)}">${i.zf(2)}</option>`);
						return option.join("");
					};
					const li = [1, 2].map((item, index) => {
						return `
							<li>
								<select class="ui-select time" name="week">
									<option value="">요일</option>
								</select>

								<select class="ui-select time" name="hour">
									<option value="">시</option>
									${getHourList()}
								</select>
								:
								<select class="ui-select time" name="minute">
									<option value="">분</option>
									${getMinuteList()}
								</select>
							</li>
						`;
					});
					return `
						<div class="box">
							<ul>
								${li.join("")}
							</ul>
							<div>
								<button class="ui-button white icon del">예약 시간 삭제</button>
								<button class="ui-button white icon add">예약 시간 추가</button>
							</div>
						</div>
					`;
				};
				*/
				return `
					<style type="text/css">
						.popupScheduleReservation .middle .ui-select				{max-width:125px; background-color:white; height:35px; text-align-last:center}

						.popupScheduleReservation .ui-form .ui-table				{text-align:center}
						.popupScheduleReservation .ui-form .ui-table tr > *			{padding:8px}
						.popupScheduleReservation .ui-form .ui-table th				{width:35px}

						.popupScheduleReservation .ui-form td p						{line-height:1.5}
						.popupScheduleReservation .ui-form td p:first-child			{margin-top:0}

						.popupScheduleReservation .weekInfo .box					{margin:0; padding:10px; background-color:#f0f0f0; height:auto; /*background-color:white;*/ border:none}
						.popupScheduleReservation .weekInfo li + li					{margin-top:8px}
						.popupScheduleReservation .weekInfo dl						{width:auto; line-height:35px}
						.popupScheduleReservation .weekInfo dl dt label				{vertical-align:middle; padding-left:0; width:20px}
						.popupScheduleReservation .weekInfo dl dt + dd				{padding:0 10px}
						.popupScheduleReservation .weekInfo dl button				{width:auto}

						.popupScheduleReservation .weekInfo th p					{margin-top:10px; line-height:1.3}
						.popupScheduleReservation .weekInfo th p button				{margin-top:5px}

						.popupScheduleReservation .weekInfo .preset					{margin-bottom:10px; padding-bottom:10px; border-bottom:1px dashed #ccc; line-height:1}
						.popupScheduleReservation .weekInfo .preset button			{width:75px; height:25px}

						.popupScheduleReservation .stateInfo						{text-align:center}
						.popupScheduleReservation .stateInfo span					{padding:0 10px}

						.popupScheduleReservation .box								{position:relative; margin-top:10px; height:300px; background-color:#ccc; border:1px solid #ccc; overflow-y:auto}
						.popupScheduleReservation .box table						{background-color:white; line-height:1.4; text-align:center}
						.popupScheduleReservation .box table tr > *					{border:none}
						.popupScheduleReservation .box table tr > td				{border-left:1px solid #ccc}
						.popupScheduleReservation .box table tr > td:first-child	{border-left:none}
						.popupScheduleReservation .box table thead tr > *			{position:sticky; position:-webkit-sticky; top:0px; background-color:#686d7b; z-index:2}
						.popupScheduleReservation .box table tbody tr > *			{position:relative; padding:8px; white-space:normal}
						.popupScheduleReservation .box table tr > * + *				{border-left:1px solid #ccc}
						.popupScheduleReservation .box table tbody tr + tr			{border-top:1px solid #ccc}

						.popupScheduleReservation .box table tr.disabled			{background-color:#ebebe4}
						.popupScheduleReservation .box table th						{width:35px; max-width:35px; vertical-align:middle !important; padding:0 !important; width:40px !important; overflow:hidden}
						.popupScheduleReservation .box table th label				{position:relative; margin:0; padding:0; width:18px; height:18px}
						.popupScheduleReservation .box table tbody th				{font-size:0}

						.popupScheduleReservation .box table .memo					{max-width:200px}
						.popupScheduleReservation .box table .memo p				{font-size:12px; color:#555}
						.popupScheduleReservation .box table .memo p span.empty		{display:inline-block; vertical-align:middle; font-size:inherit; color:transparent}
						.popupScheduleReservation .box table .result 				{max-width:200px}
						.popupScheduleReservation .box table .result p				{text-align:center; font-size:12px; color:#555}
					</style>
					<div class="popupScheduleReservation small">
						<div class="top">
							<h2>
								개인레슨 일괄 예약
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle ui-form">
							<form onsubmit="return false" autocomplete="off">
								<table>
									<tr>
										<th>이용권 기간</th>
										<td>${usePeriod}</td>
									</tr>
									<tr>
										<th>이용권 잔여 횟수</th>
										<td>${getRemainNumber()}</td>
									</tr>
									<tr>
										<th>예약 기간</th>
										<td>
											<input name="startDate" type="calendar" value="today">부터
											<input name="endDate" type="calendar">까지
										</td>
									</tr>
									<tr>
										<th>예약 진행 횟수</th>
										<td>
											<select class="ui-select" name="reserveCount">
												<option value="">횟수</option>
												${getCountList()}
											</select>
											회
										</td>
									</tr>
									<tr>
										<th>담당강사</th>
										<td>${coachName}</td>
									</tr>
									<tr class="weekInfo" data-id="weekInfo">
										<th>
											예약 요일과 시간
										</th>
										<td>
											<div class="box">
												<div class="preset">
													<button class="ui-button small white" type="button" data-value="0" data-event="preset">초기화</button>
													<button class="ui-button small white" type="button" data-value="7" data-event="preset">전체 선택</button>
													<button class="ui-button small white" type="button" data-value="5" data-event="preset">월-금 선택</button>
													<!-- <button class="ui-button small white" type="button" data-value="-1" data-event="preset">테스트</button> -->
												</div>
												<ul>${getWeekList()}</ul>

											</div>
										</td>
									</tr>
								</table>
								<p class="ui-note blue">
									수업 일괄 예약 기능을 통해 일정한 기간동안 선택한 요일과 시간에 시작하는 수업을 검색하여 일괄적으로 예약할 수 있습니다. 선택한 요일과 수업 시작 시간이 일치하는 경우에만 검색되는 만큼 정확하게 선택해 주세요.
								</p>
							</form>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">취소</button>
							<button class="ui-button" data-event="submit">스케줄 검색</button>
						</div>
					</div>
				`;
			}
		},
		searchResult : {
			popup : undefined,
			data : {},
			open : function(context) {
				if(this.popup) return;
				this.data = context.data;
				scheduleController.reservation.appointment.search(this.data.searchInfo).then(data => {
					this.data.scheduleList = data.totalSearchScheduleList || [];
					this.render();
				}).catch(error => {
					console.log(error);
					uiError(error);
					// alert("데이터를 가져오는데 실패하였습니다.");
				});
			},
			close : function() {
				this.popup = uiPopup();
			},
			submit : function() {
				const checkList = this.popup.querySelectorAll("[name='check']:checked");
				let reserveCount = this.data.searchInfo.reservationCount;
				if(reserveCount < 0) reserveCount = this.data.maxCount;

				if(checkList.length == 0) {
					alert("선택된 수업이 없습니다.");
					return;
				}
				if(checkList.length > reserveCount) {
					alert("예약 가능한 건수를 초과하였습니다.");
					return;
				}
				const scheduleList = this.data.scheduleList;
				const data = Array.from(checkList).map(item => {
					const index = Number(item.value);
					const scheduleInfo = scheduleList[index];
					return {
						startDate : scheduleInfo.startDate,
						endDate : scheduleInfo.endDate
					};
				});

				/*
				const unit = this.data.unitCount;
				const repeat = Math.ceil(data.length / unit);
				const ajaxList = [];
				const resultList = [];
				for(let i = 0; i < repeat; i++) {
					const sliceData = data.splice(0, unit);
					ajaxList.push(function() {
						return new Promise(function(resolve, reject) {
							// 에러 카운팅
							uiAjaxList.data.success++;
							// 리턴값을 반복 추가한다.
							resultList.push("pushed");
							resolve();
						});
					});
				}
				uiAjaxList.open(ajaxList, {
					complete : () => {
						this.close(true);
						console.log(resultList);
						popupScheduleReservation.appointment.reserveResult.open(this);
					}
				}, false);
				*/
				const seqPassInfo = this.data.searchInfo.seqPassInfo;
				scheduleController.reservation.appointment.reserve(seqPassInfo, data).then(data => {
					const a = data.perfectReservationCount || 0;
					const b = data.imperfectReservationCount || 0;
					const c = data.failReservationCount || 0;
					this.data.reservationInfo = {
						stateInfo : {
							total : a + b + c,
							success : a + b,
							successInfo : {
								normal : a,
								duplication : b
							},
							failed : c
						},
						scheduleList :  data.reservationScheduleList || [],
					};
					this.close();
					popupScheduleReservation.appointment.reserveResult.open(this);
				}).catch(error => {
					console.log(error);
					uiError(error);
//					alert("처리 중 오류가 발생하였습니다.");
				});
			},
			render : function() {
				const self = this.event.self = this;
				this.popup = uiPopup({
					template : this.template(),
					event : {
						click : {
							close : function() {self.close();},
							submit : function() {self.submit();}
						},
						change : {
							check : function() {self.event.changeCheck(this);}
						}
					}
				});
				this.event.updateCheck();
			},
			event : {
				changeCheck(object) {
					const checkCount = this.self.popup.querySelectorAll("[name='check']:checked").length;
					let reserveCount = this.self.data.searchInfo.reservationCount;
					if(reserveCount < 0) reserveCount = this.self.data.maxCount;
					if(reserveCount < checkCount) {
						object.checked = false;
						return;
					}
					const tr = object.parentNode.parentNode.parentNode;
					if(object.checked)
						tr.classList.add("focus");
					else
						tr.classList.remove("focus");
					this.updateCheck();
				},
				updateCheck() {
					const count = this.self.popup.querySelectorAll("[name='check']:checked").length;
					this.self.popup.putValue("reserveCount", count);
				},
			},
			template : function() {
				const passInfo = this.data.passInfo || {};
				const searchInfo = this.data.searchInfo;
				const searchCount = (searchInfo.reservationCount < 0) ? "무제한" : searchInfo.reservationCount + "회";
				const coachName = ((passInfo.passCoaches || [])[0].coachInfo || {}).coachName || "-";
				const dayLimit = componentMember.getLimitNumber(passInfo.dayLimit);
				const weekLimit = componentMember.getLimitNumber(passInfo.weekLimit);
				const getSearchPeriod = () => {
					const weekList = searchInfo.weekInfoList.map(item => {
						const weekName = ["일", "월", "화", "수", "목", "금", "토"][item.week];
						return `${weekName} : ${item.startTime}`;
					});
					return `<p>${searchInfo.startDate} ~ ${searchInfo.endDate} (${weekList.join(", ")})</p>`;
				};
				const getScheduleList = () => {
					let remainCount = searchInfo.reservationCount || 0;
					if(remainCount < 0) remainCount = this.data.maxCount;
					let tr = this.data.scheduleList.map((item, index) => {
						const getMemo = () => {
							const maxCount = 5;
							const arrayList = item.duplicateScheduleList || [];
							const getScheduleList = () => {
								const scheduleList = arrayList.sort((a, b) => {
									const timeA = new Date(a.startDate).getTime();
									const timeB = new Date(b.startDate).getTime();
									return (timeA == timeB) ? 0 : (timeA < timeB) ? -1 : 1;
								}).filter((item, index) => {
									return (index < maxCount);
								}).map(item => {
									const scheduleType = item.scheduleType;
									const startTime = (item.startDate || "").substr(11, 15);
									const endTime = (item.endDate || "").substr(11, 15);
									if(scheduleType == "class") {
										return `- 그룹수업 / ${startTime} ~ ${endTime} / ${item.scheduleName}`;
									} else {
										const scheduleInfo = (item.scheduleName || "").split("_");
										const memberName = (scheduleInfo.length == 4) ? scheduleInfo[0] : "-";
										const serviceName = (scheduleInfo.length == 4) ? scheduleInfo[3].split(" - ")[0] : "-";
										return `- 개인레슨 / ${startTime} ~ ${endTime} / ${serviceName} / ${memberName}`;
									}
								});
								const countInfo = (arrayList.length > maxCount) ?
									`<br><span class="empty">-</span> (이하 ${(arrayList.length - maxCount)}건 생략)` : ``;
								return (scheduleList.length) ? `
									해당 시간대에 중복된 스케줄이 있습니다.
									<p>${scheduleList.join("<br>")}${countInfo}</p>
								` : ``;
							};
							const scheduleInfo = getScheduleList();
							const errorInfo = popupScheduleReservation.appointment.getErrorInfo(item.remark);
							return errorInfo + ((scheduleInfo) ? ((errorInfo) ? "<br>" : "") + scheduleInfo : "");
						};
						const startDate = uiDate((item.startDate || "").substr(0, 10));
						const startTime = (item.startDate || "").substr(11, 15);
						const endTime = (item.endDate || "").substr(11, 15);
						const disabled = (item.remark > 2) ? "disabled" : "";
						const checked = (!disabled && remainCount > 0) ? "checked" : "";
						if(checked) remainCount--;

						return `
							<tr>
								<th>
									<label class="ui-input-checkbox">
										<input name="check" type="checkbox" value="${index}" ${checked} ${disabled} data-event="check">
										<span></span>
									</label>
								</th>
								<td>${startDate}</td>
								<td>${startTime} ~ ${endTime}</td>
								<td>${item.lessonAmount}회</td>
								<td class="memo red">${getMemo()}</td>
							</tr>
						`;
					});
					return (tr.length) ? tr.join("") : `<tr><td colspan="5">검색된 수업이 없습니다.</td></tr>`;
				};
				return `
					<div class="popupScheduleReservation medium">
						<div class="top">
							<h2>
								예약할 개인레슨 스케쥴 선택
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle ui-form">
							<table>
								<tr>
									<th>담당강사</th>
									<td>${coachName}</td>
								</tr>
								<tr>
									<th>예약 기간 및 시간</th>
									<td><p>${getSearchPeriod()}</p></td>
								</tr>
								<tr>
									<th>예약 진행 횟수</th>
									<td><var data-msg="reserveCount">0</var>회 / ${searchCount}</td>
								</tr>
								<tr>
									<th>이용 제한 횟수</th>
									<td>주간 이용 제한 : ${weekLimit} / 일일 이용 제한 : ${dayLimit}</td>
								</tr>
								<tr>
									<th>개인레슨 예약 선택</th>
									<td>
										<p class="ui-note red">
											<span class="red">
												일괄 수업 예약 시 <span class="red">주간 및 일일 이용 횟수 제한</span>이 적용되지 않습니다.<br>
												선택된 시간에 겹치는 <span class="red">일정이 있어도 중복으로 예약</span> 될 수 있으니 중복 스케줄을 반드시 확인해 주세요.
											</span>
										</p>
										<div class="box">
											<table class="ui-table dark">
												<thead>
													<tr>
														<th>선택</th>
														<td>수업날짜</td><td>수업시간</td><td>이용권 차감</td>
														<td>비고</td>
													</tr>
												</thead>
												<tbody>
													${getScheduleList()}
												</tbody>
											</table>
										</div>
									</td>
								</tr>
							</table>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">취소</button>
							<button class="ui-button green" data-event="submit">선택한 수업 예약</button>
						</div>
					</div>
				`;
			}
		},
		reserveResult : {
			popup : undefined,
			data : {},
			open : function(context) {
				if(this.popup) return;
				this.data = context.data;
				this.render();
			},
			close : function() {
				this.popup = uiPopup();
				popupScheduleReservation.appointment.search.close(true);
			},
			render : function() {
				this.popup = uiPopup({
					template : this.template(),
					event : {
						click : {
							close : () => {this.close()},
						}
					}
				});
			},
			template : function() {
				const passInfo = this.data.passInfo || {};
				const searchInfo = this.data.searchInfo;
				const reservationInfo = this.data.reservationInfo;
				const coachName = ((passInfo.passCoaches || [])[0].coachInfo || {}).coachName || "-";
				const getSearchPeriod = () => {
					const weekList = searchInfo.weekInfoList.map(item => {
						const weekName = ["일", "월", "화", "수", "목", "금", "토"][item.week];
						return `${weekName} : ${item.startTime}`;
					});
					return `<p>${searchInfo.startDate} ~ ${searchInfo.endDate} (${weekList.join(", ")})</p>`;
				};
				const getStateInfo = () => {
					const stateInfo = reservationInfo.stateInfo;
					return `<span class="blue">예약 요청 : ${stateInfo.total}건</span> · <span class="green">예약 성공 : ${stateInfo.successInfo.normal}건</span> · <span class="orange">중복 예약 성공 : ${stateInfo.successInfo.duplication}건</span> · <span class="red">예약 실패 : ${stateInfo.failed}건</span> `;
				};
				const getScheduleList = () => {
					let tr = reservationInfo.scheduleList.map((item, index) => {
						const errorInfo = popupScheduleReservation.appointment.getErrorInfo(item.remark);
						const resultName = (item.remark > 2) ? "예약실패<p>(" + errorInfo + ")</p>" : "예약성공";
						const resultColor = (item.remark > 2) ? "red" : "green";

						const startDate = uiDate((item.startDate || "").substr(0, 10));
						const startTime = (item.startDate || "").substr(11, 15);
						const endTime = (item.endDate || "").substr(11, 15);
						return `
							<tr>
								<td>${startDate}</td>
								<td>${startTime} ~ ${endTime}</td>
								<td>${item.lessonAmount}회</td>
								<td class="result ${resultColor}">${resultName}</td>
							</tr>
						`;
					});
					return (tr.length) ? tr.join("") : `<tr><td colspan="5">검색된 수업이 없습니다.</td></tr>`;
				};
				return `
					<div class="popupScheduleReservation" style="max-width:768px">
						<div class="top">
							<h2>
								개인레슨 예약 결과
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle ui-form">
							<table>
								<tr>
									<th>담당강사</th>
									<td>${coachName}</td>
								</tr>
								<tr>
									<th>예약 기간 및 시간</th>
									<td><p>${getSearchPeriod()}</p></td>
								</tr>
								<tr>
									<th>예약 결과 내역</th>
									<td>
										<p class="stateInfo ui-note blue">
											${getStateInfo()}
										</p>
										<div class="box">
											<table class="ui-table dark">
												<thead>
													<tr>
														<td>수업날짜</td><td>수업시간</td><td>이용권 차감</td><td>결과</td>
													</tr>
												</thead>
												<tbody>
													${getScheduleList()}
												</tbody>
											</table>
										</div>
									</td>
								</tr>
							</table>
						</div>
						<div class="bottom">
							<button class="ui-button" data-event="close">확인</button>
						</div>
					</div>
				`;
			}
		},
		getErrorInfo : function(value) {
			switch(value) {
				case 2 : return "예약장소 공간이 부족합니다.";
				case 3 : return "센터 또는 강사 휴무일 입니다.";
				case 4 : return "이미 동일 시간대에 예약되어 있습니다.";
				case 5 : return "이용권 중지 기간 입니다.";
			}
			return "";
		}
	},
	class : {
		search : {
			popup : undefined,
			data : {},
			open : function(data) {
				if(this.popup) return;
				this.data = data;
				Promise.all([
					ticketController.infoBatchReserve({
						searchParamMap : {
							seqPartnerProductUsage : data.seqPartnerProductUsage
						}
					}),
					commonController.branch.list()
				]).then(([data, branchList]) => {
					this.data.productUsage = (data.data) ? data.data.productUsage || {} : {};
					this.data.branchList = branchList || [];
					this.template.data = this.data;
					componentMember.data = {
						branchList : this.data.branchList
					}
					this.render();
				}).catch(error => {
					uiError(error);
				});
			},
			close : function() {
				this.popup = undefined;
				uiPopup();
			},
			submit : function() {
				const weekList = [];
				this.popup.querySelectorAll("[name='week']:checked").forEach(item => {
					weekList.push(item.value);
				});
				let seqPartnerBranch = this.popup.querySelector("[name='seqPartnerBranch']").value;
				seqPartnerBranch = (seqPartnerBranch) ? getNumber(seqPartnerBranch) : "";
				const submitData = {
					seqPartnerBranch : seqPartnerBranch,
					searchParamMap : {
						seqMember : this.data.seqMember,
						seqPartnerProductUsage : this.data.seqPartnerProductUsage,
						reserveStartDt : this.popup.querySelector("[name='startDate']").value,
						reserveEndDt : this.popup.querySelector("[name='endDate']").value,
						reservationCntToWant : this.popup.querySelector("[name='reserveCount']").value,
						reserveStartTime : this.popup.querySelector("[name='hour']").value + ":" + this.popup.querySelector("[name='min']").value,
					},
					searchParamListMap : {
						weekList : weekList || []
					}
				};
				if(!this.check(submitData)) return;
				scheduleController.searchClassByDateAndPassInfo(submitData).then(resultData => {
					resultData.searchData = submitData;
					if(!resultData.productUsage) {
						alert("선택하신 지점에서는 사용할 수 없는 이용권입니다.");
						return;
					}
					popupScheduleReservation.class.searchResult.open(resultData);
				}).catch(error => {
					console.log(error);
					uiError(error);
					// alert("오류가 발생하였습니다.");
				});
			},
			check : function(data) {
				const checkList = ["branch", "date", "count", "week", "time"];
				for(let i = 0; i < checkList.length; i++) {
					let error = "";
					switch(checkList[i]) {
						case "branch" :
							const isBranch = (partnerInfo.partner.branchUseYn == "Y");
							if(isBranch && !data.seqPartnerBranch) {
								error = "예약 지점을 선택해 주세요.";
							}
							break;
						case "date" :
							const today = new Date();
							const startDate = data.searchParamMap.reserveStartDt;
							const endDate = data.searchParamMap.reserveEndDt;
							if(startDate == "" || endDate == "" || getPeriod(startDate, endDate) < 0) error = "시작 및 종료 날짜를 다시 확인해 주세요.";
							else if(isLessDate(today, startDate)) error = "지난 날짜에는 일괄예약을 할 수 없습니다.";
							else if(isLessDate(this.data.productUsage.use_start_date, startDate)) error = "시작 날짜가 이용권 기간을 벗어났습니다.";
							else if(isMoreDate(this.data.productUsage.use_end_date, endDate)) error = "종료 날짜가 이용권 기간을 벗어났습니다.";
							break;
						case "count" :
							if(!data.searchParamMap.reservationCntToWant) error = "예약 진행 횟수를 선택해 주세요.";
							break;
						case "week" :
							if(data.searchParamListMap.weekList.length == 0) error = "일괄예약 요일을 선택해 주세요.";
							break;
						case "time" :
							const time = data.searchParamMap.reserveStartTime.split(":");
							if(time[0] == "" || time[1] == "") error = "수업 시작 시간을 입력해 주세요.";
							break;
					}
					if(error) {
						alert(error);
						return false;
					}
				}
				return true;
			},
			render : function() {
				const self = this;
				this.popup = this.template.popup = uiPopup({
					template : this.template.getTemplate(),
					event : {
						click : {
							submit : function() {
								self.submit();
							},
							close : function() {
								self.close();
							}
						}
					}
				});
				uiCalendar(this.popup);
			},
			template : {
				getTemplate : function() {
					const data = this.data.productUsage;
					const today = new Date().format("yyyy-mm-dd");
					const startDate = new Date(data.use_start_date).format("yyyy-mm-dd");
					const endDate = new Date(data.use_end_date).format("yyyy-mm-dd");
					const getBranchList = () => {
						const branchList = this.data.branchList || [];
						const seqPartnerBranch = partnerInfo.branch.id;
						const option = branchList.filter(item => {
							return (item.seqPartnerBranch);
						}).map(item => {
							const selected = (item.seqPartnerBranch == seqPartnerBranch) ? "selected" : "";
							return `<option value="${item.seqPartnerBranch}" ${selected}>${item.partnerName}</option>`;
						});
						return option.join("");
					};
					return `
					<style type="text/css">
						.popupBatchReserve select						{width:75px; text-align-last:center}
						.popupBatchReserve select.wide					{width:200px}
						.popupBatchReserve .week dl						{height:35px}
						.popupBatchReserve .week dd						{position:relative; overflow:hidden}
						.popupBatchReserve .week dd + dd				{}
						.popupBatchReserve .week dd input				{position:absolute; left:-9999px}
						.popupBatchReserve .week dd input + div			{position:absolute; left:0; top:0; width:100%; height:35px; background-color:#f2f2f2; text-align:center; box-sizing:border-box}
						.popupBatchReserve .week dd input:checked + div	{background-color:#004fec; border-right:1px solid rgba(255,255,255,0.4); color:white}
					</style>
					<div class="popupBatchReserve small">
						<div class="top">
							<h2>그룹수업 일괄 예약<a data-event="close"></a></h2>
						</div>
						<div class="middle ui-form">
							<form onsubmit="return false" autocomplete="off">
								<table>
									<tr>
										<th>이용권 기간</th>
										<td>${startDate} ~ ${endDate}</td>
									</tr>
									<tr>
										<th>이용권 잔여 횟수</th>
										<td>${this.getRemainCount()}</td>
									</tr>
									<tr class="branchDisplay">
										<th>예약 지점</th>
										<td>
											<select class="ui-select wide" name="seqPartnerBranch">
												<option value="">지점 선택</option>
												${getBranchList()}
											</select>
										</td>
									</tr>
									<tr>
										<th>예약 기간</th>
										<td>
											<input name="startDate" type="calendar" value="${today}">부터
											<input name="endDate" type="calendar">까지
										</td>
									</tr>
									<tr>
										<th>예약 진행 횟수</th>
										<td>
											<select name="reserveCount" class="ui-select">
												${this.getReserveCount()}
											</select>
											회
										</td>
									</tr>
									<tr>
										<th>예약 요일</th>
										<td class="week">
											<dl>
												${this.getWeek()}
											</dl>
										</td>
									</tr>
									<tr>
										<th>수업 시작 시간</th>
										<td>
											<select class="ui-select" name="hour">
												${this.getHour()}
											</select>
											:
											<select class="ui-select" name="min">
												${this.getMinute()}
											</select>
										</td>
									</tr>
								</table>
								<p class="ui-note">
									수업 일괄 예약 기능을 통해 일정한 기간동안 선택한 요일과 시간에 시작하는 수업을 검색하여 일괄적으로 예약할 수 있습니다. 선택한 요일과 수업 시작 시간이 일치하는 경우에만 검색되는 만큼 정확하게 선택해 주세요.
								</p>
							</form>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">취소</button>
							<button class="ui-button" data-event="submit">수업 검색</button>
						</div>
					</div>
				`;
				},
				getHour() {
					const option = [`<option value="">시</option>`];
					for(let i = 0; i < 24; i++)
						option.push(`<option value="${i.zf(2)}">${i.zf(2)}</option>`);
					return option.join("");
				},
				getMinute() {
					const option = [`<option value="">분</option>`];
					for(let i = 0; i < 60; i += 5)
						option.push(`<option value="${i.zf(2)}">${i.zf(2)}</option>`);
					return option.join("");
				},
				getReserveCount() {
					const data = this.data.productUsage;
					const isInfinite = (data.service_kind == "P") ? true : false;
					let useNumber = data.remain_number || 0;
					const reserveCount = data.current_reserve_cnt || 0;
					const maxCount = (isInfinite) ? 50 : Math.min(useNumber - reserveCount, 50);
					const option = [`<option value="">횟수</option>`];
					for(let i = 1; i <= maxCount; i++)
						option.push(`<option value="${i}">${i}</option>`);
					if(isInfinite)
						option.push(`<option value="-1" selected>무제한</option>`);
					return option.join("");
				},
				getRemainCount() {
					const data = this.data.productUsage;
					const isInfinite = (data.service_kind == "P") ? true : false;
					const reserveCount = data.current_reserve_cnt || 0;
					const remainCount = data.remain_number || 0;
					const prefix = (isInfinite) ? "무제한" : remainCount + "회";
					const suffix = (reserveCount > 0) ? " (예약건수 : " + reserveCount + "회)" : "";
					return prefix + suffix;
				},
				getWeek() {
					const week = ["월", "화", "수", "목", "금", "토", "일"];
					const dd = week.map((item, index) => {
						const value = (index == 6) ? 0 : index + 1
						return `
						<dd>
							<label>
								<input name="week" type="checkbox" value="${value}">
								<div>${item}</div>
							</label>
						</dd>
					`;
					});
					return dd.join("");
				},
			}
		},
		searchResult : {
			popup : undefined,
			data : {},
			open : function(data) {
				if(this.popup) return;
				this.data = data;
				this.render();
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
							close : function() {
								self.close();
							},
							submit : function() {
								self.submit();
							}
						},
						change : {
							check : function() {
								self.event.changeCheck(this);
							}
						}
					}
				});
				uiTable(this.popup);
				this.event.updateCheck();
			},
			submit : function() {
				const checkList = this.popup.querySelectorAll("[name='check']:checked");
				if(checkList.length == 0) {
					alert("선택된 수업이 없습니다.");
					return;
				}
				const seqMember = this.data.searchData.searchParamMap.seqMember;

				const scheduleList = Array.from(checkList).map(item => {
					const sequence = item.value;
					const tr = item.parentNode.parentNode.parentNode;
					const select = tr.querySelector("select");
					const seatNumber = (select) ? Number(select.value) : "";
					const data = this.data.reserveCandidateList.filter(item => {
						return (item.seq_class_schedule == sequence) ? true : false;
					})[0];
					data.seatNumber = seatNumber;
					return data;
				}).map(item => {
					return {
						scheduleName			: item.schedule_name,
						scheduleType			: item.schedule_type,
						seqCoach				: item.seq_coach,
						seqMember				: seqMember,
						seqPassInfo				: item.seq_pass_info,
						scheduleState			: item.schedule_state,
						seqClassSchedule		: item.seq_class_schedule,
						seqClass				: item.seq_class,
						startDate				: item.reserveCandidateDate + " " + item.start_time + ":00",
						endDate					: item.reserveCandidateDate + " " + item.end_time + ":00",
						seatNo					: item.seatNumber
					};
				});
				const data = {
					scheduleList : scheduleList
				};
				ticketController.class.ticketReserve(data).then(data => {
					this.close();
					popupScheduleReservation.class.reserveResult.open(data.data.scheduleList);
				}).catch(error => {
					console.log(error);
					alert("오류가 발생하였습니다.");
				});
			},
			event : {
				changeCheck(object) {
					const checkCount = this.self.popup.querySelectorAll("[name='check']:checked").length;
					const maxCount = this.self.data.maxCount;
					if(maxCount < checkCount) {
						object.checked = false;
						return;
					}
					const tr = object.parentNode.parentNode.parentNode;
					if(object.checked)
						tr.classList.add("focus");
					else
						tr.classList.remove("focus");
					this.updateCheck();
				},
				updateCheck() {
					const count = this.self.popup.querySelectorAll("[name='check']:checked").length;
					this.self.popup.putValue("reserveCount", count);
				}
			},
			template : function() {
				const searchInfo = this.data.searchData.searchParamMap;
				const reserveCount = Number(searchInfo.reservationCntToWant);
				const searchPeriod = searchInfo.reserveStartDt + " ~ " + searchInfo.reserveEndDt;
				const searchCount = (reserveCount < 0) ? "무제한" : reserveCount + "회";
				const passInfo = this.data.productUsage;
				const useStartDate = new Date(passInfo.use_start_date);
				const useEndDate = new Date(passInfo.use_end_date);
				const weekLimit = passInfo.week_limit;
				const dayLimit = passInfo.day_limit;

				let count = this.data.maxCount = (reserveCount < 0 || reserveCount > 1000) ? 1000 : reserveCount;

				const getList = () => {
					const limitInfo = {};
					const getStartDateOfWeek = (date) => {
						date = new Date(date);
						let weekIndex = date.getDay();
						if(weekIndex == 0) weekIndex == 7;
						date.setDate(date.getDate() - (weekIndex - 1));
						return date.format("yyyy-mm-dd");
					};
					const setLimitInfo = (date) => {
						const weekDate = getStartDateOfWeek(date);
						const weekIndex = new Date(date).getDay();
						if(!limitInfo[weekDate]) {
							limitInfo[weekDate] = {
								day : Array(7).fill(0),
								week : 0
							}
						}
						const weekInfo = limitInfo[weekDate];
						weekInfo.day[weekIndex]++;
						weekInfo.week++;
						return {week : weekInfo.week, day : weekInfo.day[weekIndex]};
					};

					(this.data.scheduleList || []).forEach(item => {
						if(item.schedule_state == "R" || item.schedule_state == "E")
							setLimitInfo(item.start_date);
					});

					let beforeDateWeek = "";
					const tr = [];
					(this.data.reserveCandidateList || []).forEach(item => {
						const reserveDate = new Date(item.reserveCandidateDate).format("yyyy-mm-dd");
						const dateWeek = getStartDateOfWeek(reserveDate);
						let isBreak = false;
						if(beforeDateWeek != dateWeek) {
							beforeDateWeek = dateWeek;
							isBreak = true;
						}
						const limitInfo = setLimitInfo(reserveDate);

						const getErrorInfo = () => {
							const isWeekLimit = (weekLimit > 0 && weekLimit < limitInfo.week);
							const isDayLimit = (dayLimit > 0 && dayLimit < limitInfo.day);
							if(item.reservation_limit_no - item.current_reserve_count < 1) return "예약 가능한 자리가 없습니다."
							if(item.already_reserved_schedule) return "이미 예약된 수업입니다.";
							if(item.pass_pause_period) return "중지 기간에 속한 수업입니다.";
							if(item.none_open_date) return "정기 휴일에 속한 수업입니다.";
							if(item.holiday) return "지정 휴일에 속한 수업입니다.";
							if(item.schedule_on_overlab) return "해당 시간에 다른 예약이 있습니다.";
							if(isLessDate(useStartDate, reserveDate) || isMoreDate(useEndDate, reserveDate)) return "이용권 사용 기간이 아닙니다.";
	//						if(isWeekLimit) return "weekLimit";
	//						if(isDayLimit) return "dayLimit";
							return "";
						};

						const lessonSequence = item.seq_class_schedule;
						const remainCount = item.reservation_limit_no - item.current_reserve_count;
						const getSeatList = (disabled) => {
							if(item.scheduleAvailableSeat && item.scheduleAvailableSeat.length > 0) {
								const option = item.scheduleAvailableSeat.map((item, index) => {
									const selected = (index == 0) ? "selected" : "";
									return `<option value="${item}" ${selected}>${item}</option>`;
								});
								return `
									<select class="ui-select" ${disabled}>
										<option value="">좌석 선택</option>
										${option.join("")}
									</select>
								`;
							} else {
								return "-";
							}
						};
						let errorInfo = getErrorInfo();
						const isError = (errorInfo && errorInfo != "weekLimit" && errorInfo != "dayLimit");
	//					if(errorInfo == "weekLimit") errorInfo = "주간 이용 횟수를 초과하게 됩니다.";
	//					else if(errorInfo == "dayLimit") errorInfo = "일일 이용 횟수를 초과하게 됩니다.";
						const disabled = (isError) ? "disabled" : "";
						let checked = (!isError && count > 0) ? "checked" : "";
						if(checked) count--;
						let className = (checked) ? "focus" : disabled;
						if(isBreak) className += " break";

						tr.push(`
							<tr class="${className}">
								<th>
									<label class="ui-input-checkbox">
										<input name="check" type="checkbox" value="${lessonSequence}" ${checked} ${disabled} data-event="check"><span></span>
									</label>
								</th>
								<td class="branchDisplay">${item.branchName || "-"}</td>
								<td>${item.reserveCandidateDate}</td>
								<td class="left">${item.schedule_name}</td>
								<td>${item.coach_name}</td>
								<td>${remainCount} / ${item.reservation_limit_no}명</td>
								<td>${item.amount}회</td>
								<td>${getSeatList(disabled)}</td>
								<td class="left">${errorInfo}</td>
							</tr>
						`);
					});
					return (tr.length) ? tr.join("") : `<tr><td colspan="9">검색된 수업이 없습니다.</td></tr>`;
				};

				return `
					<style type="text/css">
						.batchReserveList							{}
						.batchReserveList .ui-note					{margin-top:0}
						.batchReserveList .box						{margin-top:10px; height:300px; background-color:#ccc; border:1px solid #ccc; overflow-y:auto}
						.batchReserveList .box table				{background-color:white; line-height:1.4; text-align:center}
						.batchReserveList .box table tr > *			{padding:8px; border:none}
						.batchReserveList .box table tr > td		{border-left:1px solid #ccc}
						.batchReserveList .box table thead tr > *	{position:sticky; position:-webkit-sticky; top:0px; background-color:#686d7b; z-index:2}
						.batchReserveList .box table tbody tr > *	{position:relative; padding:8px; white-space:normal}
						.batchReserveList .box table tr > * + *		{border-left:1px solid #ccc}
						.batchReserveList .box table tbody tr + tr	{border-top:1px solid #ccc}

						.batchReserveList .box table tr.disabled	{background-color:#ebebe4}
						.batchReserveList .box table th				{width:35px; max-width:35px; vertical-align:middle !important; padding:0 !important; width:40px !important; overflow:hidden}
						.batchReserveList .box table th label		{position:relative; margin:0; padding:0; width:18px; height:18px}
						.batchReserveList .box table tbody th		{font-size:0}
						.batchReserveList .box table select			{position:absolute; left:0; top:0; width:100%; height:100%; border:none; text-align-last:center}
						.batchReserveList .box table .left			{max-width:150px}
					</style>
					<div class="batchReserveList medium">
						<div class="top">
							<h2>
								예약할 그룹수업 선택
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle ui-form">
							<table>
								<tr>
									<th>예약 기간 및 시간</th>
									<td>${searchPeriod} (${searchInfo.reserveStartTime})</td>
								</tr>
								<tr>
									<th>예약 진행 횟수</th>
									<td><var data-msg="reserveCount">0</var>회 / ${searchCount}</td>
								</tr>
								<tr>
									<th>이용 제한 횟수</th>
									<td>주간 이용 제한 : ${(weekLimit < 0) ? "무제한" : weekLimit + "회"} / 일일 이용 제한 : ${(dayLimit < 0) ? "무제한" : dayLimit + "회"}</td>
								</tr>
								<tr>
									<th>그룹수업 선택</th>
									<td>
										<p class="ui-note red">
											<span class="red">
												일괄 수업 예약 시 주간 및 일일 이용 횟수 제한이 적용되지 않습니다.
											</span>
										</p>
										<div class="box">
											<table class="ui-table dark">
												<thead>
													<tr>
														<th>선택</th>
														<td class="branchDisplay">지점명</td>
														<td>수업날짜</td>
														<td>수업명</td><td>담당강사</td><td>예약가능인원</td>
														<td>이용권차감</td><td>좌석선택</td><td>비고</td>
													</tr>
												</thead>
												<tbody>
													${getList()}
												</tbody>
											</table>
										</div>
									</td>
							</table>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">취소</button>
							<button class="ui-button green" data-event="submit">선택한 수업 예약</button>
						</div>
					</div>
				`;
			}
		},
		reserveResult : {
			popup : undefined,
			data : {},
			open : function(data) {
				if(this.popup) return;
				this.data = this.template.data = data;
				this.render();
			},
			close : function() {
				this.popup = undefined;
				popupScheduleReservation.class.search.close();
				uiPopup();
			},
			render : function() {
				const self = this;
				this.popup = uiPopup({
					template : this.template(),
					event : {
						click : {
							close : function() {
								self.close();
							}
						}
					}
				});
			},
			template : function() {
				const self = this;
				const resultList = function() {
					const tr = self.data.map(item => {
						const lessonName = item.scheduleName;
						const lessonDate = uiDate(item.startDate, "time", "yyyy-mm-dd hh:MM");
						const resultColor = (item.result == "success") ? "green" : "red";
						const resultName = (item.result == "success") ? "예약성공" : "예약실패";
						return `
						<tr>
							<td>${lessonDate}</td>
							<td>${lessonName}</td>
							<td class="${resultColor}">${resultName}</td>
						</tr>
					`;
					});
					return tr.join("");
				};
				return `
				<div class="tiny">
					<div class="top">
						<h2>그룹수업 일괄예약 결과<a data-event="close"></a></h2>
					</div>
					<div class="middle">
						<table class="ui-table fix">
							<colgroup><col width="35%"><col width="40%"><col width="25%"></colgroup>
							<thead>
								<tr><td>수업일시</td><td>수업명</td><td>예약결과</td></tr>
							</thead>
							<tbody>
								${resultList()}
							</tbody>
						</table>
					</div>
					<div class="bottom">
						<button class="ui-button" data-event="close">확인</button>
					</div>
				</div>
			`;
			}
		}
	}
};