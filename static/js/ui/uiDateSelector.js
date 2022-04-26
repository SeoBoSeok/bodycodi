window.addEventListener("DOMContentLoaded", function() {
	uiDateSelector.ready();
});

// 주간 수 결정법은 '주간 수 결정법 표준(분류번호 : KS A 5402)'에 따른다.
const uiDateSelector = {
	ready : function(object) {
		if(!object) object = document;
		this.render(object);
	},
	render : function(object) {
		const nodeList = object.querySelectorAll(".ui-date-selector");
		nodeList.forEach(item => {
			const type = item.getAttribute("data-type") || "month";
			const event = item.getAttribute("data-event");

			let date = item.getAttribute("data-date");
			date = (date) ? new Date(date) : new Date();
			if(type == "month")	date.setDate(1);

			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const day = date.getDate();

			const thisYear = new Date().getFullYear();

			let minDate = item.getAttribute("data-min-date");
			minDate = (minDate) ? new Date(minDate) : new Date(thisYear - 4, 0, 1);
			let maxDate = item.getAttribute("data-max-date");
			maxDate = (maxDate) ? new Date(maxDate) : new Date(thisYear, 11, 31);

			this.template.date = date;
			this.template.minDate = minDate;
			this.template.maxDate = maxDate;

			const self = this.event.self = this.template.self = this;

			const div = document.createElement("div");
			div.className = "ui-date-selector " + type + " focus";
			div.setAttribute("data-type", type);
			div.setAttribute("data-date", getCalendar(date));
			div.setAttribute("data-min-date", getCalendar(minDate));
			div.setAttribute("data-max-date", getCalendar(maxDate));
			div.setAttribute("data-partner", item.getAttribute("data-partner"));
			div.setAttribute("data-event", item.getAttribute("data-event"));
			div.innerHTML = this.template.getTemplate(div);
			item.parentNode.replaceChild(div, item);

			this.event.checkDate(div);
			if(type == "day") this.event.updateDay(div);
			else if(type == "week") this.event.updateWeek(div);

			const isReady = (item.getAttribute("data-ready") == "true");
			if(isReady) this.event.updateEvent(div, isReady);

			uiEvent(div, {
				click : {
					button : function() {
						self.event.clickButton(this);
					}
				},
				change : {
					date : function() {
						self.event.changeDate(this);
					},
					partner : function() {
						div.setAttribute("data-seq-partner", this.value);
						self.event.updateEvent(div);
					}
				}
			});
		});
	},
	event : {
		updateEvent : function(div, isReady) {
			if(!isReady) isReady = false;
			let event = div.getAttribute("data-event");
			if(event) {
				try {
					event = eval(event);
				} catch(error) {
					uiConsole("no function");
					return;
				}
				if(typeof event == "function") {
					const type = div.getAttribute("data-type");
					const date = new Date(div.getAttribute("data-date"));
					const thisDate = getCalendar(date);
					const thisLastDate = getCalendar(new Date(date.getFullYear(), date.getMonth() + 1, 0));
					let startDate = div.getAttribute("data-start-date") || "";
					let endDate = div.getAttribute("data-end-date") || "";
					const seqPartner = div.getAttribute("data-seq-partner");
					if(type == "month") {
						startDate = thisDate;
						endDate = thisLastDate;
					} else if(type == "day") {
						startDate = endDate = thisDate;
					}
					event({
						date : div.getAttribute("data-date"),
						startDate : startDate,
						endDate : endDate,
						isReady : isReady
					});
				}
			}
		},
		checkDate : function(div) {
			const type = div.getAttribute("type");
			const select = div.querySelectorAll(".date select");
			let date = new Date(div.getAttribute("data-date"));
			const minDate = new Date(div.getAttribute("data-min-date"));
			const maxDate = new Date(div.getAttribute("data-max-date"));
			if(date.getTime() < minDate.getTime()) date = minDate;
			if(date.getTime() > maxDate.getTime()) date = maxDate;
			div.setAttribute("data-date", getCalendar(date));
			select[0].value = date.getFullYear();
			select[1].value = date.getMonth() + 1;
			if(type == "day") select[2].value = date.getDate();
		},
		changeDate : function(object) {
			const div = object.parentNode.parentNode.parentNode;
			let date = new Date(div.getAttribute("data-date"));
			const select = div.querySelectorAll(".date select");
			const type = div.getAttribute("data-type");
			const name = object.name;
			const value = object.value;

			switch(name) {
				case "year"		: date.setFullYear(value); break;
				case "month"	:
					date.setMonth(value - 1);
					if(type == "week") {
						date = new Date(select[0].value, value - 1, 1);
						date = this.self.function.getStartDateOfWeek(date);
					}
					break;
				case "day" 		: date.setDate(value); break;
				case "week"		:
					date = new Date(select[0].value, select[1].value - 1, 1);
					date = this.self.function.getStartDateOfWeek(date);
					date.setDate(date.getDate() + ((value - 1) * 7));
					break;
			}
			div.setAttribute("data-date", getCalendar(date));
			this.checkDate(div);
			if(type == "day") this.updateDay(div);
			if(type == "week") this.updateWeek(div);
			this.updateEvent(div);
		},

		clickButton : function(object) {
			const div = object.parentNode.parentNode;
			const isNext = object.classList.contains("next") ? true : false;
			const type = div.getAttribute("data-type");
			const event = div.getAttribute("data-event");
			const date = new Date(div.getAttribute("data-date"));
			switch(type) {
				case "day"	: date.setDate(date.getDate() + ((isNext) ? 1 : -1)); break;
				case "week"	: date.setDate(date.getDate() + ((isNext) ? 1 : -1) * 7); break;
				default		: date.setMonth(date.getMonth() + ((isNext) ? 1 : -1)); break;
			}
			const select = div.querySelectorAll(".date select");
			const minTime = new Date(div.getAttribute("data-min-date")).getTime();
			const maxTime = new Date(div.getAttribute("data-max-date")).getTime();
			const thisTime = date.getTime();

			if(minTime <= thisTime && thisTime <= maxTime) {
				div.setAttribute("data-date", getCalendar(date));
				select[0].value = date.getFullYear();
				select[1].value = date.getMonth() + 1;
				if(type == "day") {
					select[2].value = date.getDate();
					this.updateDay(div);
				} else if(type == "week") {
					this.updateWeek(div);
				}
			}
			this.updateEvent(div);
		},
		updateDay : function(div) {
			const select = div.querySelectorAll(".date select");
			const option = select[2].querySelectorAll("option");
			const date = new Date(div.getAttribute("data-date"));
			const thisLastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
			if(option.length - 1 != thisLastDay)
				select[2].innerHTML = this.self.template.getDay(date);
		},
		updateWeek : function(div) {
			const date = new Date(div.getAttribute("data-date"));
			const week = (date.getDay() == 0) ? 7 : date.getDay();
			if(week != 1) {
				date.setDate(date.getDate() - week + 1);
				div.setAttribute("data-date", getCalendar(date));
			}
			const select = div.querySelectorAll(".date select");
			const option = select[2].querySelectorAll("option");
			let weekInMonth = this.self.function.getWeekInMonth(date);
			let thisLastWeek = this.self.function.getLastOfWeekInMonth(date);
			const isUpdate = (typeof weekInMonth == "string") ? true : false;

			if(isUpdate || option.length - 1 != thisLastWeek) {
				const correctionValue = ((weekInMonth == "next") ? 1 : (weekInMonth == "prev") ? -1 : 0);
				const renderDate = new Date(date.getFullYear(), date.getMonth() + correctionValue, 1);
				thisLastWeek = this.self.function.getLastOfWeekInMonth(renderDate);
				if(weekInMonth == "next") weekInMonth = 1;
				else if(weekInMonth == "prev") weekInMonth = thisLastWeek;

				select[0].value = renderDate.getFullYear();
				select[1].value = renderDate.getMonth() + 1;
				select[2].innerHTML = this.self.template.getWeek(renderDate);
			}
			select[2].value = weekInMonth;

			const startDate = date;
			const endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6);
			const dateFormat = "yyyy.sm.sd (sw)";
			div.setAttribute("data-start-date", getCalendar(startDate));
			div.setAttribute("data-end-date", getCalendar(endDate));
			div.querySelector("[data-msg='period']").innerHTML = "" + startDate.format(dateFormat) + " ~ " + endDate.format(dateFormat) + "";
		}
	},
	template : {
		getDay : function(date, isOption) {
			const thisDay = date.getDate();
			const thisLastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
			let option = [];
			for(let i = 1; i <= thisLastDay; i++) {
				const selected = (i == thisDay) ? "selected" : "";
				option.push(`<option value="${i}" ${selected}>${i}일</option>`);
			}
			option = "<option>일 선택</option>" + option.join("");
			return (isOption) ? option : `
				<select class="ui-select" name="day" data-event="date">
					${option}
				</select>
			`;
		},

		getWeek : function(date, isOption) {
			const thisWeek = this.self.function.getWeekInMonth(date);
			const thisLastWeek = this.self.function.getLastOfWeekInMonth(date);
			let option = [];
			for(let i = 1; i <= thisLastWeek; i++) {
				const selected = (i == thisWeek) ? "selected" : "";
				option.push(`<option value="${i}" ${selected}>${i}주</option>`);
			}
			option = "<option>주 선택</option>" + option.join("");
			return (isOption) ? option : `
				<select class="ui-select" name="week" data-event="date">
					${option}
				</select>
			`;
		},

		getTemplate : function(div) {
			const date = new Date(div.getAttribute("data-date"));
			const minDate = new Date(div.getAttribute("data-min-date"));
			const maxDate = new Date(div.getAttribute("data-max-date"));
			const type = div.getAttribute("data-type");
			const getYear = function() {
				const minYear = minDate.getFullYear() - 1;
//				const thisYear = date.getFullYear();
				const thisYear = new Date().getFullYear();
				const option = [];
				for(let i = thisYear; i > minYear; i--) {
					const selected = (i == thisYear) ? "selected" : "";
					option.push(`<option value="${i}" ${selected}>${i}년</option>`);
				}
				return option.join("");
			};
			const getMonth = function() {
				const thisMonth = date.getMonth() + 1;
				const option = [];
				for(let i = 1; i <= 12; i++) {
					const selected = (i == thisMonth) ? "selected" : "";
					option.push(`<option value="${i}" ${selected}>${i}월</option>`);
				}
				return option.join("");
			};
			const getCenter = function() {
				if(div.getAttribute("data-partner") != "true") return "";
				return `
					<div class="partner" style="display:none">
						<select class="ui-select" name="partner" data-event="partner">
							<option value="">지점 선택</option>
							<option value="1">본점</option>
						</select>
					</div>
				`;
			};
			return `
				${getCenter()}
				<div class="left">
					<button class="ui-button prev" data-event="button">◀</button>
				</div>
				<div class="center">
					<div class="date">
						<select class="ui-select" name="year" data-event="date">
							<option value="">년도 선택</option>
							${getYear()}
						</select>
						<select class="ui-select" name="month" data-event="date">
							<option>월 선택</option>
							${getMonth()}
						</select>
						${(type == "day") ? this.getDay(date) : ""}
						${(type == "week") ? this.getWeek(date) : ""}
					</div>
					${(type == "week") ? `<div class="period" data-msg="period"></div>` : ``}
				</div>
				<div class="right">
					<button class="ui-button next" data-event="button">▶</button>
				</div>
			`;
		}
	},
	function : {
		getStartDayOfWeek : function(date) {
			const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
			const week = startDate.getDay();
			let day = date.getDate();
			if(week > 4) day = 7 - week + 1 + 1;
			else day = 1 - week + 1;
			return day;
		},
		getEndDayOfWeek : function(date) {
			const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
			const week = endDate.getDay();
			let day = endDate.getDate();
			if(week >= 4) day = day + (7 - week);
			else day = day - week;
			return day;
		},
		getStartDateOfWeek : function(date, week) {
			week = (week) ? (week - 1) * 7 : 0;
			return new Date(date.getFullYear(), date.getMonth(), this.getStartDayOfWeek(date) + week);
		},
		getEndDateOfWeek : function(date, week) {
			week = (week) ? (week - 1) * 7 : 0;
			return new Date(date.getFullYear(), date.getMonth(), this.getEndDayOfWeek(date));
		},
		getLastOfWeekInMonth : function(date) {
			const startTime = this.getStartDateOfWeek(date).getTime();
			const endTime = this.getEndDateOfWeek(date).getTime();
			return parseInt((((endTime - startTime) / (1000 * 60 * 60 * 24)) + 1) / 7);
		},
		getWeekInMonth : function(date) {
			const startTime = this.getStartDateOfWeek(date).getTime();
			const endTime = this.getEndDateOfWeek(date).getTime();
			const time = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
			if(time < startTime) return "prev";
			if(time > endTime) return "next";
			return Math.ceil((parseInt((time - startTime) / (1000 * 60 * 60 * 24)) + 1) / 7);
		}
	}
}