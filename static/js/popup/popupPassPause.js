const popupPassPause = {
	popup : undefined,
	seqMember : 0,
	seqPassInfo : 0,
	seqPassInfoPause : 0,
	data : {
		passInfo : {},
		pauseList : [],
		coachList : []
	},
	open : function(seqMember, seqPassInfo) {
		if(this.popup) return;
		Promise.all([
			memberController.passInfo(seqMember, seqPassInfo),
			memberController.pause.list(seqMember, seqPassInfo),
			commonController.coachList(),
		]).then(([passInfo, pauseList, coachList]) => {
			this.seqMember = seqMember;
			this.seqPassInfo = seqPassInfo;
			this.data = {
				passInfo : passInfo.passInfo || {},
				pauseList : pauseList || [],
				coachList : coachList || []
			};
			if(!componentMember.data.coachList)
				componentMember.data.coachList = this.data.coachList;
			this.render();
		}).catch(error => {
			uiError(error);
		});
	},
	close : function() {
		this.popup = undefined;
		uiPopup();
	},
	update : function() {
		const seqMember = this.seqMember;
		const seqPassInfo = this.seqPassInfo;
		Promise.all([
			memberController.passInfo(seqMember, seqPassInfo),
			memberController.pause.list(seqMember, seqPassInfo)
		]).then(([passInfo, pauseList]) => {
			this.data.passInfo = passInfo.passInfo || {},
			this.data.pauseList = pauseList;
			this.event.reset();
			this.render(true);
		}).catch(error => {
			uiError(error);
		});
	},
	render : function(isUpdate) {
		const self = this.event.self = this.template.self = this;
		const setPassInfo = () => {
			const tbody = this.popup.querySelector("[data-event='passInfo']");
			tbody.innerHTML = this.template.passInfo();
		};
		const setPauseList = () => {
			const tbody = this.popup.querySelector("[data-event='pauseList']");
			tbody.innerHTML = this.template.pauseList();
			uiTable(tbody.parentNode.parentNode);
			tbody.querySelectorAll("[name='sequence']").forEach(item => {
				item.addEventListener("change", function() {
					self.event.pauseInfo(this);
				});
			});
		};
		const setPopup = () => {
			this.popup = uiPopup({
				template : this.template.popup(),
				event : {
					click : {
						close : function() {self.close();},
						delete : function() {self.event.delete();},
						modify : function() {self.event.modify();},
						register : function() {self.event.register();}
					},
					change : {
						changePeriod : function() {self.event.changePeriod();},
					}
				}
			});
			uiInput(this.popup);
			uiCalendar(this.popup);
		};

		if(!isUpdate) setPopup();
		setPassInfo();
		setPauseList();
	},
	event : {
		check : function(data) {
			if(!data) {
				alert("중지 기간을 설정해 주세요.");
				return false;
			}
			const seqPassInfoPause = this.self.seqPassInfoPause;
			const passInfo = this.self.data.passInfo;
			const pauseList = this.self.data.pauseList;
			const checkList = ["date", "period", "remain", "duplicate"];

			for(let i in checkList) {
				const name = checkList[i];
				let error = "";
				switch(name) {
					case "date" :
						if(!(isDate(data.pauseStartDate) && isDate(data.pauseEndDate))) error = "잘못된 날짜 형식 입니다.";
						break;

					case "remain" :
						if(passInfo.pausePeriod > -1) {
							if(this.mode == "create") {
								if(data.pausePeriod > passInfo.remainPausePeriod) error = "중지 가능 일수를 초과하였습니다.";
							} else {
								if(data.pausePeriod > (passInfo.remainPausePeriod + passInfo.pausePeriod)) error = "중지 가능 일수를 초과하였습니다.";
							}
						}
						break;

					case "period" :
						if(isLessDate(passInfo.useStartDate, data.pauseStartDate))
							error = "중지 시작 날짜를 이용권 시작 날짜 보다 크게 설정해 주세요.";
						if(isMoreDate(passInfo.useEndDate, data.pauseEndDate))
							error = "중지 종료 날짜를 이용권 종료 날짜 보다 작게 설정해 주세요.";
						break;

					case "duplicate" :
						console.log("검사 : 중복검사", pauseList, seqPassInfoPause);
						const newStartDate = new Date(data.pauseStartDate).getTime();
						const newEndDate = new Date(data.pauseEndDate).getTime();
						for(let i = 0; i < pauseList.length; i++) {
							const item = pauseList[i];
							if(item.seqPassInfoPause != seqPassInfoPause) {
								const oldStartDate = new Date(item.pauseStartDate).getTime();
								const oldEndDate = new Date(item.pauseEndDate).getTime();
								if((oldStartDate <= newStartDate && newStartDate <= oldEndDate) || (oldStartDate <= newEndDate && newEndDate <= oldEndDate)) {
									error = "중복되는 중지 구간이 있습니다.";
									break;
								}
							}
						}
						break;
				}
				if(error) {
					alert(error);
					return false;
				}
			}
			return true;
		},
		register : function() {
			const seqMember = this.self.seqMember;
			const seqPassInfo = this.self.seqPassInfo;
			const data = this.changePeriod();
			if(!this.check(data)) return;
			memberController.pause.create(seqMember, seqPassInfo, data).then(data => {
				alert("등록되었습니다.");
				this.self.update();
			}).catch(error => {
				uiError(error);
			});
		},
		modify : function() {
			const seqMember = this.self.seqMember;
			const seqPassInfo = this.self.seqPassInfo;
			const seqPassInfoPause = this.self.seqPassInfoPause;
			const data = this.changePeriod();
			if(!this.check(data)) return;
			memberController.pause.update(seqMember, seqPassInfo, seqPassInfoPause, data).then(data => {
				alert("수정되었습니다.");
				this.self.update();
			}).catch(error => {
				uiError(error);
			});
		},
		delete : function() {
			const seqMember = this.self.seqMember;
			const seqPassInfo = this.self.seqPassInfo;
			const seqPassInfoPause = this.self.seqPassInfoPause;
			if(!confirm("정말로 삭제하시겠습니까?")) return;
			memberController.pause.remove(seqMember, seqPassInfo, seqPassInfoPause).then(data => {
				alert("삭제되었습니다.");
				this.self.update();
			}).catch(error => {
				uiError(error);
			});
		},
		reset : function() {
			this.self.seqPassInfoPause = 0;
			const popup = this.self.popup;
			const bottom = popup.querySelector(".bottom");
			bottom.classList.remove("update");
			bottom.classList.add("create");
			popup.querySelector("[name='type']").checked = true;
			popup.putValue("startDate", getCalendar());
			popup.putValue("endDate", "");
			popup.putValue("period", "");
			popup.putValue("pauseEndDate", "설정을 입력해 주세요.");
		},
		changePeriod : function() {
			const popup = this.self.popup;
			const input = popup.querySelector("[name='type']:checked");
			const type = input.value;
			const label = input.parentNode;
			const startDate = label.getValue("startDate");
			let endDate = label.getValue("endDate");
			let pausePeriod = label.getValue("period");

			popup.putValue("pauseEndDate", "설정을 입력해 주세요.");

			if(startDate === "" || !isDate(startDate)) return;
			if(type == "period") {
				if(pausePeriod === "") return;
				endDate = componentMember.getUseEndDate(startDate, Number(pausePeriod), "D");
			} else {
				if(endDate === "" || !isDate(endDate)) return;
				if(!isLessDate(endDate, startDate)) {
					endDate = startDate;
					label.putValue("endDate", startDate);
				}
				pausePeriod = getPeriod(startDate, endDate) + 1;
			}
			popup.putValue("pauseEndDate", uiDate(endDate) + " (" + pausePeriod + "일)");

			return {
				pauseStartDate : startDate,
				pauseEndDate : endDate,
				pausePeriod : pausePeriod
			};
		},
		pauseInfo : function(object) {
			const popup = this.self.popup;
			const bottom = popup.querySelector(".bottom");
			const input = popup.querySelectorAll("[name='sequence']");
			input.forEach(item => {
				if(item != object) {
					item.parentNode.parentNode.parentNode.className = "";
					item.checked = false;
				}
			});
			bottom.classList.remove("create");
			bottom.classList.remove("update");
			bottom.classList.add((object.checked) ? "update" : "create");

			if(object.checked) {
				const sequence = Number(object.value);
				const data = this.self.data.pauseList.filter(item => {
					return (item.seqPassInfoPause == sequence)
				})[0];
				if(!data) return;
				this.self.seqPassInfoPause = data.seqPassInfoPause;
				popup.putValue("startDate", data.pauseStartDate);
				popup.putValue("endDate", data.pauseEndDate);
				popup.putValue("period",data.pausePeriod);
			} else {
				this.reset();
			}
			this.changePeriod();
		},
	},
	template : {
		passInfo : function() {
			const passInfo = this.self.data.passInfo;
			const getPausePeriod = () => {
				if(passInfo.pausePeriod < 0) return "무제한";
				return `${passInfo.remainPausePeriod}일 / ${passInfo.pausePeriod}일`;
			};
			const getPauseNumber = () => {
				if(passInfo.pauseNumber < 0) return "무제한";
				return `${passInfo.remainPauseNumber}회 / ${passInfo.pauseNumber}회`;
			};
			return `
				<tr>
					<td>${passInfo.serviceName}</td>
					<td>${componentMember.getUsePeriod(passInfo)}</td>
					<td>${componentMember.getUseNumber(passInfo)}</td>
					<td>${getPausePeriod()}</td>
					<td>${getPauseNumber()}</td>
				</tr>
			`;
		},
		pauseList : function() {
			const pauseList = this.self.data.pauseList;
			const tr = pauseList.map(item => {
				const sequence = item.seqPassInfoPause;
				const pausePeriod = componentMember.getPeriod(item.pauseStartDate, item.pauseEndDate);
				const coachName = componentMember.getCoachName(item.regId);
				return `
					<tr>
						<th><label class="ui-input-checkbox"><input name="sequence" type="checkbox" value="${sequence}" data-event="pauseInfo"><span></span></label></th>
						<td>${uiDate(item.regDt, "time")}</td>
						<td>${pausePeriod}</td>
						<td>${item.pausePeriod}일</td>
						<td>${coachName}</td>
					</tr>
				`;
			});
			return (tr.length == 0) ? `<tr><td colspan="5">중지 내역이 없습니다.</td></tr>` : tr.join("");
		},
		popup : function() {
			const passInfo = this.self.data.passInfo;
			return `
				<style type="text/css">
					.popupPassPause .bottom.create .update,
					.popupPassPause .bottom.update .create	{display:none}
					.popupPassPause .middle					{max-height:640px; overflow-y:auto}
					.popupPassPause h4						{margin-bottom:10px; font-size:15px}
					.popupPassPause li + li					{margin-top:30px}
					.popupPassPause input					{margin:0 5px}
					.popupPassPause input[type=number]		{width:75px; text-align:center}
					.popupPassPause .ui-note				{margin-top:15px}
				</style>
				<div class="popupPassPause small">
					<div class="top">
						<h2>
							이용권 중지 : ${componentMember.getPassName(passInfo)}
							<a data-event="close"></a>
						</h2>
					</div>
					<div class="middle">
						<ul>
							<li>
								<h4 class="ui-sub-title">이용권 정보</h4>
								<table class="ui-table">
									<thead>
										<tr><td>서비스명</td><td>기간</td><td>횟수</td><td>중지일수</td><td>중지횟수</td></tr>
									</thead>
									<tbody data-event="passInfo"></tbody>
								</table>
							</li>
							<li class="date">
								<h4 class="ui-sub-title">기간 설정</h4>
								<label class="ui-input-radio more">
									날짜 설정
									<input name="type" type="radio" value="date" data-event="changePeriod" checked>
									<span></span>
									<span>
										<input name="startDate" type="calendar" value="today" data-event="changePeriod">부터
										<input name="endDate" type="calendar" data-event="changePeriod">까지
									</span>
								</label>
								<label class="ui-input-radio more">
									기간 설정
									<input name="type" type="radio" value="period" data-event="changePeriod">
									<span></span>
									<span>
										<input name="startDate" type="calendar" value="today" data-event="changePeriod">부터
										<input name="period" type="number" min="1" data-event="changePeriod">일
									</span>
								</label>
								<p class="ui-note">
									중지 종료 예정일 :	<var data-msg="pauseEndDate">설정을 입력해 주세요.</var>
								</p>
							</li>
							<li class="list">
								<h4 class="ui-sub-title">중지 내역</h4>
								<table class="ui-table checkbox">
									<thead>
										<tr><th></th><td>중지 신청일</td><td>중지 기간</td><td>중지 일수</td><td>담당자</td></tr>
									</thead>
									<tbody data-event="pauseList"></tbody>
								</table>
							</li>
						</ul>
					</div>
					<div class="bottom create">
						<button class="ui-button gray" data-event="close">닫기</button>
						<button class="ui-button red update" data-event="delete">삭제</button>
						<button class="ui-button green update" data-event="modify">수정</button>
						<button class="ui-button blue create" data-event="register">등록</button>
					</div>
				</div>
			`;
		}
	}
};

