const popupTodo = {
	popup : undefined,
	data : {
		date : "",
		seqPartner : 0,
		todoList : [],
		coachList : []
	},
	open : function() {
		if(this.popup) return;
		const seqPartner = partnerInfo.partner.id;
		const seqPartnerCoach = partnerInfo.employee.id;
		Promise.all([
			commonController.todo.list(seqPartner),
			commonController.coachList(),
		]).then(([todoList, coachList]) => {
			this.data = {
				date : getCalendar(),
				seqPartner : seqPartner,
				seqPartnerCoach : seqPartnerCoach,
				todoList : todoList || [],
				coachList : coachList || []
			};
			popupTodoUpdate.data = this.data;
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
		commonController.todo.list(this.data.seqPartner, this.data.date).then(todoList => {
			this.data.todoList = todoList || [];
			this.render(true);
		}).catch(error => {
			console.log(error);
		});
	},
	render : function(isUpdate) {
		const self = this.event.self = this;
		const uiDate = (date) => {
			date = new Date(date);
			const year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			if(month < 10) month = " " + month;
			if(day < 10) day = " " + day;
			const week = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
			return `${year}.${month}.${day} (${week})`;
		};
		const setPopup = () => {
			this.popup = uiPopup({
				template : this.template(),
				beforeEvent : function(popup) {
					uiCalendar(popup);
				},
				event : {
					click : {
						close : function() {self.close();},
						update : function() {popupTodoUpdate.open();},
						date : function() {self.event.changeDate(this);}
					},
					change : {
						calendar : function() {self.event.changeDate(this);},
						filter : function() {self.render(true)}
					}
				}
			});
		};
		const setTodoList = () => {
			const getCoachName = (seqPartnerCoach) => {
				const data = this.data.coachList.filter(item => {
					return (item.seqPartnerCoach == seqPartnerCoach);
				})[0];
				return (data) ? data.coachName : "-";
			};
			const tbody = this.popup.querySelector("[data-id='todoList']");
			const isComplete = this.popup.getValue("filter-complete");
			const isCoach = this.popup.getValue("filter-coach");
			const seqPartnerCoach = this.data.seqPartnerCoach;

			const tr = this.data.todoList.filter(item => {
				if(isComplete == "Y" && item.isCompleted) return false;
				if(isCoach == "Y" && item.seqPartnerCoach != seqPartnerCoach) return false;
				return true;
			}).map((item, index) => {
				const isComplete = (item.isCompleted) ? "checked" : "";
				const startDate = uiDate(item.startAt);
				const endDate = uiDate(item.endAt);
				const period = (startDate == endDate) ? startDate : startDate + " ~ " + endDate;
				return `
					<tr data-sequence="${item.seqTodo}">
						<td>${period}</td>
						<td class="left">${item.message || "-"}</td>
						<td>${item.comment || "-"}</td>
						<td>${getCoachName(item.seqPartnerCoach)}</td>
						<td>
							<label class="ui-input-switch">
								<input type="checkbox" ${isComplete} data-sequence="${item.seqTodo}" data-event="complete">
								<span></span>
							</label>
						</td>
					</tr>
				`;
			});
			tbody.innerHTML = (tr.length == 0) ? `<tr><td class="empty" colspan="5">업무 정보가 없습니다.</td></tr>` : tr.join("");
			tbody.querySelectorAll("td:not(:last-child)").forEach(item => {
				item.onclick = function() {
					const seqTodo = Number(this.parentNode.getAttribute("data-sequence"));
					popupTodoUpdate.open(seqTodo);
				};
			});
			tbody.querySelectorAll("[data-event='complete']").forEach(item => {
				item.onchange = function() {
					self.event.changeComplete(this);
				};
			});
		};
		if(!isUpdate) setPopup();
		setTodoList();
		this.event.updateHeader();
	},
	event : {
		changeComplete : function(object) {
			const seqTodo = Number(object.getAttribute("data-sequence"));
			const seqPartner = this.self.data.seqPartner;
			const data = this.self.data.todoList.filter(item => {
				return (item.seqTodo == seqTodo);
			})[0];
			if(!data) return;
			data.isCompleted = (object.checked);
			commonController.todo.update(seqPartner, seqTodo, data).then(data => {
				this.updateHeader();
				console.log("update");
			}).catch(error => {
				uiError(error);
			});
		},
		changeDate : function(object) {
			const value = object.getAttribute("data-value");
			let date = new Date(this.self.data.date);
			switch(value) {
				case "prev" : date.setDate(date.getDate() - 1); break;
				case "next" : date.setDate(date.getDate() + 1); break;
				case "today" : date = new Date(); break;
				case "calendar" : date = new Date(this.self.popup.getValue("date")); break;
			}
			this.self.data.date = date = getCalendar(date);
			this.self.popup.putValue("date", date);
			this.self.update();
		},
		updateHeader : function() {
			let count = 0;
			this.self.data.todoList.forEach(item => {
				if(item.isCompleted == false) count++;
			});
			const span = document.querySelector(".ui-header [data-msg='todo']");
			if(span) span.innerHTML = getComma(count);
		}
	},
	template : function() {
		return  `
			<div class="popupTodo">
				<div class="top">
					<h2>
						업무 목록
						<a data-event="close"></a>
					</h2>
				</div>
				<div class="middle">
					<nav>
						<div class="left">
							<button class="ui-button white prev" data-value="prev" data-event="date">◀</button>
							<input name="date" type="calendar" value="today" data-value="calendar" data-event="calendar">
							<button class="ui-button white today" data-value="today" data-event="date">오늘</button>
							<button class="ui-button white next" data-value="next" data-event="date">▶</button>
						</div>
						<div class="right">
							<!--
							<select class="ui-select" name="filter" data-event="filter">
								<option value="">선택</option>
								<option value="all" selected>모두</option>
								<option value="complete">완료</option>
								<option value="incomplete">미완료</option>
							</select>
							-->
							<label class="ui-input-checkbox">
								<input name="filter-coach" type="checkbox" data-event="filter">
								<span></span>
								내 업무만 보기
							</label>
							<label class="ui-input-checkbox">
								<input name="filter-complete" type="checkbox" data-event="filter">
								<span></span>
								미완료만 보기
							</label>
						</div>
					</nav>
					<table class="ui-table">
						<colgroup><col width="27.5%"><col width="35%"><col width="15%"><col width="15%"><col width="7.5%"></colgroup>
						<thead>
							<tr><td>업무 기간</td><td>업무 내용</td><td>업무 결과</td><td>담당자</td><td>완료</td></tr>
						</thead>
						<tbody data-id="todoList"></tbody>
					</table>
				</div>
				<div class="bottom">
					<button class="ui-button gray" data-event="close">닫기</button>
					<button class="ui-button" data-event="update">업무 등록</button>
				</div>
			</div>
		`;
	}
};

const popupTodoUpdate = {
	popup : undefined,
	mode : "",
	data : {},
	callback : undefined,
	open : function(seqTodo, callback) {
		if(this.popup) return;
		this.mode = (seqTodo) ? "update" : "create";
		if(seqTodo) {
			const todoInfo = this.data.todoList.filter(item => {
				return (item.seqTodo == seqTodo);
			})[0];
			this.data.todoInfo = todoInfo || {};
		}
		this.data.seqTodo = seqTodo || 0;
		this.callback = callback;
		this.render();
	},
	close : function(isUpdate) {
		this.popup = undefined;
		uiPopup();
		if(isUpdate) {
			if(this.callback) this.callback();
			else popupTodo.update();
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
				},
				change : {
					periodType : function() {self.event.changePeriodType()}
				}
			}
		});
		if(this.mode == "update") {
			this.prepare();
		} else {
			this.popup.putValue("startDate", popupTodo.data.date);
			this.popup.putValue("endDate", popupTodo.data.date);
			this.popup.putValue("seqPartnerCoach", popupTodo.data.seqPartnerCoach);
		}
		uiCalendar(this.popup);
	},
	prepare : function() {
		const todoInfo = this.data.todoInfo;
		const startDate = getCalendar(new Date(todoInfo.startAt));
		const endDate = getCalendar(new Date(todoInfo.endAt));
		const periodType = (startDate == endDate) ? "today" : "period";
		this.popup.putValue("message", todoInfo.message);
		this.popup.putValue("comment", todoInfo.comment);
		this.popup.putValue("periodType", periodType);
		this.popup.putValue("startDate", startDate);
		this.popup.putValue("endDate", endDate);
		this.popup.putValue("seqPartnerCoach", todoInfo.seqPartnerCoach);
		this.event.changePeriodType();
	},
	event : {
		changePeriodType : function() {
			const popup = this.self.popup;
			const value = popup.getValue("periodType");
			const input = popup.querySelectorAll(".period input");
			input.forEach(item => {
				item.disabled = (value == "default") ? true : false;
			});
		},
		getData : function() {
			const mode = this.self.mode;
			const popup = this.self.popup;
			const todoInfo = this.self.data.todoInfo || {};
			const periodType = popup.getValue("periodType");
			const date = popupTodo.data.date;
			const startDate = (periodType == "period") ? popup.getValue("startDate") : date;
			const endDate = (periodType == "period") ? popup.getValue("endDate") : date;
			const data = {
				seqTodo : this.self.data.seqTodo,
				startAt: new Date(startDate).toISOString(),
				endAt: new Date(endDate).toISOString(),
				seqPartnerCoach: popup.getValue("seqPartnerCoach"),
				message: popup.getValue("message").trim(),
				comment: popup.getValue("comment").trim(),
				isCompleted: (mode == "update") ? todoInfo.isCompleted : false
			};
			return data;
		},
		check : function(data) {
			const startTime = new Date(data.startAt).getTime();
			const endTime = new Date(data.endAt).getTime();
			let error = "";
			if(!data.startAt || !data.endAt || startTime > endTime) error = "시작 날짜와 종료 날짜를 확인해 주세요.";
			else if(!data.seqPartnerCoach) error = "담당자를 선택해 주세요.";
			else if(data.message.length < 2) error = "업무 내용을 2자 이상 입력해 주세요.";
			if(error) {
				alert(error);
				return false;
			}
			return true;
		},
		remove : function() {
			const seqPartner = this.self.data.seqPartner;
			const seqTodo = this.self.data.seqTodo;
			if(!confirm("정말로 삭제하시겠습니까?")) return;
			commonController.todo.remove(seqPartner, seqTodo).then(data => {
				this.self.close(true);
			}).catch(error => {
				uiError(error);
			});
		},
		update : function() {
			const seqPartner = this.self.data.seqPartner;
			const seqTodo = this.self.data.seqTodo;
			const data = this.getData();
			if(!this.check(data)) return;
			commonController.todo.update(seqPartner, seqTodo, data).then(data => {
				this.self.close(true);
			}).catch(error => {
				uiError(error);
			});
		},
		create : function() {
			const seqPartner = this.self.data.seqPartner;
			const data = this.getData();
			if(!this.check(data)) return;
			commonController.todo.create(seqPartner, data).then(data => {
				this.self.close(true);
			}).catch(error => {
				uiError(error);
			});
		}
	},
	template : function() {
		const getCoachList = () => {
			const coachList = this.data.coachList;
			const option = coachList.map(item => {
				return `<option value="${item.seqPartnerCoach}">${item.coachName}</option>`;
			});
			return option.join("");
		};
		const getBottom = () => {
			return (this.mode == "create") ? `
				<button class="ui-button" data-event="create">등록</button>
			` : `
				<button class="ui-button red" data-event="remove">삭제</button>
				<button class="ui-button green" data-event="update">수정</button>
			`;
		};
		const displayYn = (this.mode == "create") ? "hidden" : "";
		return  `
			<div class="popupTodoUpdate">
				<div class="top">
					<h2>
						업무 등록
						<a data-event="close"></a>
					</h2>
				</div>
				<div class="middle ui-form">
					<form autocomplete="off">
						<table>
							<tr>
								<th>업무 기간</th>
								<td>
									<label class="ui-input-radio">
										<input name="periodType" type="radio" value="default" checked data-event="periodType">
										<span></span>
										해당일
									</label>
									<label class="ui-input-radio more">
										<input name="periodType" type="radio" value="period" data-event="periodType">
										<span></span>
										기간제
									</label>
									<div class="period">
										<input name="startDate" type="calendar" disabled>부터
										<input name="endDate" type="calendar" disabled>까지
									</div>
								</td>
							</tr>
							<tr>
								<th>업무 담당자</th>
								<td>
									<select class="ui-select" name="seqPartnerCoach">
										<option value="">업무 담당자 선택</option>
										${getCoachList()}
									</select>
								</td>
							</tr>
							<tr>
								<th>업무 내용</th>
								<td>
									<input class="message" name="message" type="text" maxlength="100" placeholder="업무 내용을 최대 100자 이하로 입력해 주세요.">
								</td>
							</tr>
							<tr class="${displayYn}">
								<th>업무 결과</th>
								<td>
									<input class="message" name="comment" type="text" maxlength="20" placeholder="업무 결과를 최대 20자 이하로 입력해 주세요">
								</td>
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
};

/*
const popupTodoCalendar = {
	popup : undefined,
	open : function() {
		if(this.popup) return;
		this.data = popupTodo.data;
		console.log(this.data);
		this.render();
	},
	close : function() {
		this.popup = undefined;
		uiPopup();
	},
	render : function() {
		const self = this;
		this.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					close : function() {self.close()}
				}
			}
		});
		uiCalendar(this.popup);
	},
	template : function() {
		return `
			<style type="text/css">
				.popupTodoCalendar						{max-width:800px}
				.popupTodoCalendar .middle .calendar	{position:relative; height:500px}
			</style>
			<div class="popupTodoCalendar">
				<div class="top">
					<h2>업무 달력</h2>
				</div>
				<div class="middle">
					<div class="calendar">
						<input name="calendar" type="calendar" non-popup multiple>
					</div>
				</div>
				<div class="bottom">
					<button class="ui-button gray" data-event="">닫기</button>
				</div>
			</div>
		`
	}
};
*/
