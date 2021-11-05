const changeStatePopup = {
	popup : undefined,
	data : {},
	open : function(context, seqScheduleList, changeState) {
		if(this.popup) return;
		this.context = context;
		this.data = {
			scheduleInfo : context.eventSchedulerData || {},
			memberList : context.memberList || [],
			scheduleList : [],
			seqScheduleList : seqScheduleList || [],
			changeState : changeState,
			checkCount : seqScheduleList.length,
			filterCount : 0,
			seatList : context.availableSeat || [],
			reservationLimitNo : context.scheduleData.reservationLimitNo
		};
		this.data.seqScheduleList = this.filter(this.data.seqScheduleList.map(item => {
			const seqSchedule = item;
			const memberInfo = this.data.memberList.filter(item => {
				return (item.seqSchedule == seqSchedule);
			})[0] || {};
			return {
				seqSchedule : seqSchedule,
				memberInfo : memberInfo
			};
		}));

		this.data.filterCount = this.data.seqScheduleList.length;
		if(!this.data.filterCount) {
			alert("변경 가능한 회원이 없습니다.");
			return;
		}

		if(changeState == "E") {
			const maxCount = this.data.reservationLimitNo;
			const count = this.data.memberList.filter(item => {
				return (item.state == "E");
			}).length + this.data.seqScheduleList.length;
			if(count > maxCount) {
				if(!confirm("설정한 수업 정원 이상의 인원이 출석처리 됩니다. 그래도 수행하시겠습니까?")) return;
			}
		}

		let data = this.data.seqScheduleList.map(item => {
			return "seqSchedules=" + item.seqSchedule;
		});
		data.push("scheduleState=" + this.data.changeState);
		data = data.join("&");

		ClassScheduleController.checkChangeState(data).then(data => {
			this.data.scheduleList = data || [];
			this.render();
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	filter : function(data) {
		const changeState = this.data.changeState;
		const getRemainReservation = () => {
			const availableList = this.data.memberList.filter(member => {
				return (member.state == "R" || member.state == "E");
			});
			return this.data.reservationLimitNo - availableList.length;
		};
		const getRemainEntrance = () => {
			const availableList = this.data.memberList.filter(member => {
				return (member.state == "E");
			});
			return this.data.reservationLimitNo - availableList.length;
		};
		let remainReservation = getRemainReservation();
		let remainEntrance = getRemainEntrance();

		/*
		if(changeState == "R") {
			const availableList = this.data.memberList.filter(member => {
				return (member.state == "R" || member.state == "E");
			});
			const reservationLimitNo = this.data.reservationLimitNo;
			if(!(availableList.length < reservationLimitNo))
				return [];
		}
		return data.map(item => {
			const beforeState = item.memberInfo.state;
			item.isActive = false;
			switch(changeState) {
				case "E" : item.isActive = (beforeState == "R" || beforeState == "A"); break;
				case "A" : item.isActive = (beforeState == "R" || beforeState == "E"); break;
				case "R" : item.isActive = (beforeState == "W"); break;
				case "C" : item.isActive = true; break;
			}
			return item;
		});
		*/
		return data.filter((item, index) => {
			const beforeState = item.memberInfo.state;
			switch(changeState) {
				case "E" :
					/*
					if(beforeState == "R" || beforeState == "A") remainEntrance--;
					return ((beforeState == "R" || beforeState == "A") && remainEntrance >= 0);
					*/
					return (beforeState == "R" || beforeState == "A");
				case "A" : return (beforeState == "R" || beforeState == "E");
				case "R" :
					if(beforeState == "W") remainReservation--;
					return (beforeState == "W" && remainReservation >= 0);
				case "C" : return true;
			}
			return false;
		});
	},
	close : function(isUpdate) {
		this.popup.classList.remove("focus");
		setTimeout(() => {
			this.popup.parentNode.removeChild(this.popup);
			this.popup = undefined;
		}, 300);

		if(isUpdate) {
			schedulePopup.resetReload();
			schedulePopup.detailViewScheduleMemberList();
			this.context.open();
		}
	},
	submit : function() {
		const changeState = this.data.changeState;
		if(changeState == "R" && this.data.seatList.length > 0) {
			this.data.scheduleList.forEach(item => {
				const select = this.popup.querySelector("[name='seat'][data-sequence='" + item.seqSchedule + "']");
				item.seatNo = (select) ? select.value : "";
			});
			const hasNoSeat = this.data.scheduleList.some(item => (!item.seatNo));
			if(hasNoSeat) {
				if(!confirm("선택되지 않은 좌석이 있습니다. 계속하시겠습니까?")) return;
			}
		}
		const data = {
			scheduleState : changeState,
			seqSchedules : this.data.scheduleList.map(item => {
				return Number(item.seqSchedule);
			})
		};

		ClassScheduleController.changeState(data).then(data => {
			const success = getComma(data.successCount || 0);
			const failed = getComma(data.failCount || 0);
			alert(`일괄 변경이 완료되었습니다.\n(성공 : ${success} / 실패 : ${failed})`);
			this.close(true);
		}).catch(error => {
			console.log(error);
			alert("처리 중 오류가 발생하였습니다.");
		});
//		this.close(true);
	},
	render : function() {
		const container = document.querySelector("[data-popup-location='팝업 위치']");
		const self = this.event.self = this;
		const setPopup = () => {
			const div = document.createElement("div");
			div.innerHTML = this.template();
			container.appendChild(div);
			this.popup = div.querySelector("[data-id='changeStatePopup']");
			setTimeout(() => {
				this.popup.classList.add("focus");
			}, 100);
		};
		const setEvent = () => {
			const bindEvent = (eventName, eventType, callback) => {
				this.popup.querySelectorAll("[data-event='" + eventName + "']").forEach(item => {
					item.addEventListener(eventType, callback);
				});
			};
			bindEvent("close", "click", function() {self.close()});
			bindEvent("submit", "click", function() {self.submit()});
			bindEvent("seat", "change", function() {self.event.changeSeat(this)});
		};
		setPopup();
		setEvent();
	},
	event : {
		changeSeat : function(object) {
			const popup = this.self.popup;
			const selectList = popup.querySelectorAll("[name='seat']");
			const value = object.value;
			/*
			selectList.forEach(item => {
				if(object != item && item.value == value) {
					item.value = "";
				}
			});
			*/
			const selectedList = [];
			selectList.forEach(item => {
				if(item.value)
					selectedList.push(item.value);
			});
			selectList.forEach(item => {
				const option = item.querySelectorAll("option");
				option.forEach(item => {
					const value = item.value;
					const isSelected = selectedList.some(item => {
						return (item == value);
					});
					item.disabled = (isSelected);
//					item.style.display = (isSelected) ? "none" : "block";
				});
			});
		}
	},
	template : function() {
		const scheduleInfo = this.data.scheduleInfo;
		const getStateColor = (state, isButton) => {
			return (state == "E") ? "green" : (state == "A") ? "red" : (state == "R") ? "blue" : (state == "W") ? "gray" : (state == "C") ? (isButton) ? "darkgray" : "gray" : "";
		};
		const getLessonDate = () => {
			const startDate = new Date(scheduleInfo.start_date).format("yyyy년 MM월 dd일 a/p sh:mm");
			const endDate = new Date(scheduleInfo.end_date).format("a/p sh:mm");
			return startDate + " - " + endDate;
		};
		const changeState = this.data.changeState;
		const changeStateName = uiParameter.schedule.state[changeState];
		const changeStateColor = getStateColor(changeState);
		const checkCount = this.data.checkCount;
		const filterCount = this.data.filterCount;
//		let filterCount = 0;
		const isSeat = (changeState == "R" && this.data.seatList.length > 0);

		const lessonName = (scheduleInfo.lessonName) ? scheduleInfo.lessonName : scheduleInfo.text.split("/")[0].trim();
		const lessonDate = (scheduleInfo.lessonDate) ? scheduleInfo.lessonDate : getLessonDate();
		const buttonName = (changeState == "E") ? "일괄 출석" : (changeState == "A") ? "일괄 결석" : (changeState == "R") ? "일괄 예약" : (changeState == "C") ? "일괄 취소" : "";
		const buttonColor = getStateColor(changeState, true);

		const tr = this.data.scheduleList.map(item => {
			const isNaverBooking = (item.naverBookingYn == "Y") ? "네이버 예약" : "";
			const getBeforeState = () => {
				const state = item.scheduleState;
				const stateName = uiParameter.schedule.state[state];
				const stateColor = getStateColor(state);
				const remainNumber = item.remainNumberCurrent || item.useNumberCurrent;
				const remainNumberName = (item.serviceKind == "P") ? "무제한" : remainNumber + "회";
				return `<span class="${stateColor}">${stateName}</span><br>(잔여 : ${remainNumberName})`;
			};
			const getChangeState = () => {
				const state = changeState;
				const stateColor = getStateColor(state);
				const changeNumber = item.remainNumberAfter || item.useNumberAfter;
				const changeNumberName = (item.serviceKind == "P") ? "무제한" : changeNumber + "회";
				return `<span class="${stateColor}">${changeStateName}</span><br>(잔여 : ${changeNumberName})`;
			};
			const getSeatOption = () => {
				if(!isSeat) return "";
				const option = this.data.seatList.map(item => {
					return `<option value="${item}">${item}</option>`;
				});
				return `
					<select class="ui-select" name="seat" data-sequence="${item.seqSchedule}" data-event="seat">
						<option value="">좌석 선택</option>
						<option value="">좌석 선택</option>
						${option.join("")}
					</select>
				`;
			};
//			const isActive = (item.isActive) ? "active" : "deactive";
//			if(item.isActive) filterCount++;
			return `
				<tr class="">
					<td>${item.name}</td>
					<td>${getBeforeState()}</td>
					<td>${getChangeState()}</td>
					<td class="seat">${getSeatOption()}</td>
					<td>${isNaverBooking}</td>
				</tr>
			`
		});
		return `
			<style type="text/css">
				.changeStatePopup							{z-index:1004}
				.changeStatePopup > div > div > div			{width:580px}
				.changeStatePopup hgroup					{text-align:center}
				.changeStatePopup h4						{line-height:1; margin:10px 0 8px 0; font-size:21px}
				.changeStatePopup h5						{font-size:17px; color:#555}
				.changeStatePopup p							{margin-top:15px !important; line-height:1.4; text-align:center; font-size:13.5px}
				.changeStatePopup p b						{font-weight:400}
				.changeStatePopup p span					{display:block; color:#555}
				.changeStatePopup button					{max-width:125px}
				.changeStatePopup .middle .gray				{color:#999 !important}
				.changeStatePopup .middle button.darkgray	{background-color:#42485a !important}

				.changeStatePopup .box						{margin-top:20px; height:200px; background-color:#ccc; border:1px solid #ccc; overflow:auto}
				.changeStatePopup .box table				{background-color:white; font-size:13px}
				.changeStatePopup .box table tr > *			{vertical-align:middle; padding:8px; background-color:transparent !important; border:none !important}
				.changeStatePopup .box table tr > td		{position:relative; padding:4px 5px 6px 5px}
				.changeStatePopup .box table tr td + td		{border-left:1px solid #ccc !important}
				.changeStatePopup .box table tr td.name		{text-align:left}
				.changeStatePopup .box table tr td.empty	{border:none !important}
				.changeStatePopup .box thead tr > *			{position:sticky; position:-webkit-sticky; top:0; background-color:#686d7b !important; z-index:2}
				.changeStatePopup .box tbody td.name		{min-width:150px; max-width:250px; text-align:left}
				.changeStatePopup .box tbody tr + tr		{border-top:1px solid #ccc}
				.changeStatePopup .box table tr td.empty	{text-align:center}

				.changeStatePopup .box table td select					{position:absolute; left:0; top:0; width:100%; height:100% !important; background-color:transparent !important; border:none; text-align-last:center; cursor:pointer}
				.changeStatePopup .box table td select option:disabled	{color:#ccc !important}
				.changeStatePopup .box table td:nth-child(4)			{display:none}
				.changeStatePopup .box table.seat td:nth-child(4)		{display:table-cell}


				.changeStatePopup .bottom button			{font-size:13px}
			</style>
			<div class="changeStatePopup ui-popup ui-style" data-id="changeStatePopup">
				<div>
					<div>
						<div>
							<div class="top">
								<h2>
									일괄 상태 변경 : ${changeStateName}
									<a data-event="close"></a>
								</h2>
							</div>
							<div class="middle">
								<hgroup>
									<h4>${lessonName}</h4>
									<h5>${lessonDate}</h5>
									<p class="ui-note red">
										선택하신 예약회원 <b class="red">${checkCount}명</b> 중 <b class="red">${filterCount}명</b>의 수업 스케줄을<br>
										아래와 같이 <b class="${changeStateColor}">${changeStateName}</b> 상태로 일괄 변경합니다.
										<span>(예약한 이용권의 잔여횟수 변경사항을 확인할 수 있습니다.)</span>
									</p>
								</hgroup>
								<div class="box">
									<table class="ui-table dark even ${(isSeat) ? "seat" : ""}">
										<thead>
											<tr><td>이름</td><td>현재 상태</td><td>변경 후 상태</td><td class="seat">좌석 선택</td><td>비고</td></tr>
										</thead>
										<tbody>
											${tr.join("")}
										</tbody>
									</table>
								</div>
							</div>
							<div class="bottom">
								<button class="gray" data-event="close">취소</button>
								<button class="${buttonColor}" data-event="submit">${buttonName}</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	}
};
