const popupSchedulePrinting = {
	popup : undefined,
	data : {},
	open : function(scheduleInfo, seqPartnerSpace) {
		if(this.popup) return;

		const startDate = scheduler.getState().min_date;
		const endDate = scheduler.date.add(startDate, 6, "day");
		const data = {
			classScheduleDto : {
				startDt : moment(startDate),
				endDt : moment(endDate)
			},
			seqPartnerSpaces : [seqPartnerSpace],
			optIncludeSchedule : false
		};
		Promise.all([
			ClassScheduleController.findAllByPartnerInRangeAndSpaces(data),
			commonController.placeList()
		]).then(([scheduleList, spaceList]) => {
			this.data = {
				scheduleList : (scheduleList || []).filter(item => {
					return (item.seqPartnerPlace == seqPartnerSpace && item.useYn == "Y" && item.openYn == "Y");
				}),
				spaceList : spaceList || [],
				coachList : [],
				lessonList : [],
				scheduleInfo : {
					seqPartnerSpace : seqPartnerSpace,
					startDate : startDate,
					endDate : endDate,
					startTime : Number(scheduler.config.first_hour),
					endTime : Number(scheduler.config.last_hour)
				}
			};
			this.data.scheduleList.forEach(item => {
				const seqPartnerCoach = item.seqPartnerCoach;
				const coachName = (item.coach && item.coach.coachName) ? item.coach.coachName : "이름없음";
				const isCoach = this.data.coachList.some(item => {return (item.seqPartnerCoach == seqPartnerCoach)});
				if(!isCoach) {
					this.data.coachList.push({
						seqPartnerCoach : seqPartnerCoach,
						coachName : coachName
					});
				}
				const lessonName = item.lessonName;
				if(this.data.lessonList.indexOf(lessonName) == -1)
					this.data.lessonList.push(lessonName);
			});
//			console.log(this.data.scheduleList);
			this.render();
		});
	},
	close : function() {
		this.popup = undefined;
		uiPopup();
	},
	submit : function() {
		const mode = this.popup.querySelector("[name='tab']:checked").value;
		const preview = this.popup.querySelector("[data-id='" + mode + "']");
		const img = preview.querySelector("img");
		if(!img) return;

		const cloneImg = img.cloneNode();
		const popup = window.open("", "", "width=800,height=600");
		const head = popup.document.querySelector("head");
		const body = popup.document.querySelector("body");
		head.innerHTML = `
			<style type="text/css" media="print">
				@page {size:landscape; margin:10mm}
			</style>
		`;
		body.innerHTML = "";
		popup.document.title = "그룹수업 스케줄 출력";
		body.style.margin = body.style.padding = body.style.fontSize = "0";
		body.appendChild(cloneImg);
		setTimeout(function() {
			popup.focus();
			popup.print();
			popup.close();
		}, 200);
	},
	render : function() {
		const self = this.event.self = this;
		this.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					close : function() {self.close()},
					submit : function() {self.submit()},
					download : function() {self.event.download()},
					preview : function() {self.event.preview(true)},
				},
				change : {
					tab : function() {self.event.preview()},
				}
			}
		});
		uiTab(this.popup);
		uiSelect(this.popup);
		uiEvent(this.popup, {
			click : {
				select : function() {self.event.changeSelect(this)}
			}
		});
		this.event.preview();
	},
	event : {
		changeSelect : function(object) {
			const name = object.name;
			const optionList = this.self.popup.querySelectorAll("[name='" + name + "']");
			const value = object.value;
			if(value) {
				optionList[1].checked = false;
			} else {
				optionList.forEach(item => {
					if(item.value)
						item.checked = false;
				});
			}
		},
		download : function() {
			const popup = this.self.popup;
			const mode = popup.querySelector("[name='tab']:checked").value;
			const preview = popup.querySelector("[data-id='" + mode + "']");
			const img = preview.querySelector("img");
			if(!img) return;
			const getFileName = () => {
				const scheduleInfo = this.self.data.scheduleInfo;
				const startDate = scheduleInfo.startDate.format("yyyy-sM-sd");
				const endDate = scheduleInfo.endDate.format("yyyy-sM-sd");
				return `그룹수업 스케줄 출력(${startDate}부터 ${endDate}까지).png`;
			};
			const a = document.createElement("a");
			a.style = "display:none";
			a.href = img.src;
			a.download = getFileName();
			document.body.appendChild(a);
			a.click();
			setTimeout(() => {
				document.body.removeChild(a);
			}, 100);
		},
		preview : function(isUpdate) {
			const popup = this.self.popup;
			const mode = popup.querySelector("[name='tab']:checked").value;
			const preview = popup.querySelector("[data-id='" + mode + "']");
			const middle = popup.querySelector(".middle");
			if(isUpdate) {
				middle.querySelectorAll("img").forEach(item => {
					item.parentNode.removeChild(item);
				});
			}
			const isRender = (preview.querySelector("img"));
			if(isRender) return;

			const optionTitleList = popup.querySelector("[name='title']").getAttribute("data-value");
			const optionCoachList = popup.querySelector("[name='coach']").getAttribute("data-value");
			const optionContentsList = popup.querySelector("[name='contents']").getAttribute("data-value");
			const optionLessonList = popup.querySelector("[name='lesson']").getAttribute("data-value");

			const option = {
				lessonList : (optionLessonList) ? optionLessonList.split(",") : [],
				coachList : (optionCoachList) ? optionCoachList.split(",").map(item => Number(item)) : [],
				titleList : (optionTitleList) ? optionTitleList.split(",") : [],
				contentsList : (optionContentsList) ? optionContentsList.split(",") : [],
				colorMode : popup.querySelector("[name='color']").value
			};

			middle.classList.add("rendering");
			const scheduleInfo = this.self.data.scheduleInfo;
			const scheduleList = this.self.data.scheduleList.filter(item => {
				return (option.lessonList.length) ? (optionLessonList.indexOf(item.lessonName) > -1) : true;
//				return (option.lessonList.length) ? (optionLessonList.indexOf(item.seqPartnerClassSchedule) > -1) : true;
			});
			const spaceList = this.self.data.spaceList;

			const startDate = scheduleInfo.startDate;
			const getWeekList = () => {
				const td = [];
				for(let i = 0; i < 7; i++) {
					const date = scheduler.date.add(startDate, i, "day").format("yyyy-MM-dd (sE)");
					const color = (option.colorMode == "black") ? "" : (i == 6) ? "red" : (i == 5) ? "blue" : "";
					td.push(`<td class="${color}">${date}</td>`);
				}
				return td.join("");
			};
			const getTimeList = () => {
				const startTime = scheduleInfo.startTime;
				const endTime = scheduleInfo.endTime;
				const tr = [];
				for(let i = startTime; i <= endTime; i++) {
					const time = i.zf(2) + ":00";
					const td = [];
					let count = 0;
					for(let j = 0; j < 7; j++) {
						const date = getNumber(scheduler.date.add(startDate, j, "day").format("yyyy-MM-dd"));
						const scheduleList = getScheduleList(date, time);
						count += scheduleList.length;
						td.push(`<td>${scheduleList.join("")}</td>`);
					}
					if(count)
						tr.push(`<tr><th>${time}</th>${td.join("")}</tr>`);
				}
				return (tr.length) ? tr.join("") : `<tr><td class="empty" colspan="8">표시할 내용이 없습니다.</td></tr>`;
			};
			const getCoachList = () => {
				const coachList = this.self.data.coachList.filter(item => {
					const seqPartnerCoach = item.seqPartnerCoach;
					if(option.coachList.length) {
						return (option.coachList.indexOf(item.seqPartnerCoach) > -1);
					} else {
						return true;
					}
				});
				const tr = [];
				coachList.forEach(item => {
					const coachName = item.coachName;
					const td = [];
					for(let j = 0; j < 7; j++) {
						const date = getNumber(scheduler.date.add(startDate, j, "day").format("yyyy-MM-dd"));
						const scheduleList = getScheduleList(date, undefined, item.seqPartnerCoach);
						td.push(`<td>${scheduleList.join("")}</td>`);
					}
					tr.push(`<tr><th>${coachName}</th>${td.join("")}</tr>`);
				})
				return (tr.length) ? tr.join("") : `<tr><td class="empty" colspan="8">표시할 내용이 없습니다.</td></tr>`;
			};
			const getScheduleList = (date, time, seqPartnerCoach) => {
				const dateA = date;
				const timeA = getNumber(time);
				const color = (option.colorMode == "black") ? "" : "blue";
				const bgColor = (option.colorMode == "black") ? "" : "bg blue";
				return scheduleList.filter(item => {
					const dateB = getNumber(item.startDt.substr(0, 10));
					if(!seqPartnerCoach) {
						if(option.coachList.length)
							if(option.coachList.indexOf(item.seqPartnerCoach) == -1) return false;
						const timeB = (time) ? getNumber(item.startTime) : "";
						return (dateA == dateB && timeA <= timeB && timeB < (timeA + 100));
					} else {
						return (dateA == dateB && item.seqPartnerCoach == seqPartnerCoach);
					}
				}).map(item => {
					const coachName = (item.coach) ? item.coach.coachName : "강사 미정";
					const getSummaryInfo = () => {
						const summary = [];
						const array = option.contentsList;
						if(mode == "time" && array.indexOf("coach") > -1)
							summary.push(`강사 : ${coachName}`);
						if(array.indexOf("reservation") > -1)
							summary.push(`정원 : ${item.reservationLimitNo}명`);
						if(array.indexOf("wait") > -1)
							summary.push(`대기인원 : ${item.waitableLimitNo}명`);
						if(array.indexOf("memo") > -1) {
							const text = item.lessonDescription || "";
							let memo = text.substr(0, 16);
							if(text.length > 16) memo += "…";
							if(text) summary.push(`<span class="memo">${memo}</span>`);
						}
						return summary.join("<br>");
					};
					return `
						<div class="schedule">
							<div class="time ${bgColor}">${item.startTime} - ${item.endTime}</div>
							<div class="name ${color}">${item.lessonName}</div>
							<div class="summary">
								${getSummaryInfo()}
							</div>
						</div>
					`;
				});
			};
			const getTitle = () => {
				const title = [];
				if(option.titleList.indexOf("place") > -1) {
					const seqPartnerSpace = scheduleInfo.seqPartnerSpace;
					const spaceInfo = spaceList.filter(item => {
						return (item.seqPartnerSpace == seqPartnerSpace);
					})[0];
					const spaceName = spaceInfo.spaceName;
					title.push(spaceName);
				}
				if(option.titleList.indexOf("date") > -1) {
					const startDate = scheduleInfo.startDate.format("yyyy년 sM월 sd일");
					const endDate = scheduleInfo.endDate.format("yyyy년 sM월 sd일");
					title.push(startDate + " ~ " + endDate);
				}
				return (title.length) ? `<h2>${title.join(" : ")}</h2>` : ``;
			};
			const getWatermark = () => {
				const datetime = new Date().format("yyyy-MM-dd hh:mm");
				return `
					<div class="watermark">
						<span><b>PUBLISH ON</b></span>
						<img src="/static/img/brand/img_logotype_black.png"/>
					</div>
				`;
			};
			const div = document.createElement("div");
			div.innerHTML = `
				${getTitle()}
				<table>
					<thead>
					<tr>
						<th>${(mode == "time") ? "수업시간" : "담당강사"}</th>
						${getWeekList()}
					</tr>
					</thead>
					<tbody>
						${(mode == "time") ? getTimeList() : getCoachList()}
					</tbody>
				</table>
				${getWatermark()}
			`;
			preview.innerHTML = "";
			preview.appendChild(div);
			setTimeout(() => {
				html2canvas(div, {
					scale : 2,
				}).then(function(canvas) {
					const img = document.createElement("img");
					img.src =  canvas.toDataURL("image/png");
					img.style.width = "100%";
					preview.appendChild(img);
					middle.classList.remove("rendering");
				});
				preview.removeChild(div);
			}, 100);
		},
	},
	template : function() {
		const scheduleList = this.data.scheduleList;
		const getCoachList = () => {
			const option = this.data.coachList.map(item => {
				return `<option value="${item.seqPartnerCoach}" data-event="select">${item.coachName}</option>`;
			});
			return option.join("");
		};
		const getLessonList = () => {
			const lessonList = [];
			const option = this.data.lessonList.map(item => {
				return `<option value="${item}" data-event="select">${item}</option>`;
			});
			return option.join("");
		};
		/*
		const getLessonList = () => {
			const option = scheduleList.map(item => {
				const lessonName = item.lessonName;
				const startTime = item.startTime;
				const endTime = item.endTime;
//				const coachName = (item.coach) ? item.coach.coachName || "-" : "-";
				const name = `${lessonName} (${startTime} - ${endTime})`;
				return `<option value="${item.seqPartnerClassSchedule}" data-event="select">${name}</option>`;
			});
			return option.join("");
		};
		*/
		return `
			<style type="text/css">
				.popupSchedulePrinting										{width:1100px; max-width:1100px}
				.popupSchedulePrinting label								{cursor:pointer}
				.popupSchedulePrinting .ui-tab								{margin-bottom:15px}
				.popupSchedulePrinting .tab									{display:none}
				.popupSchedulePrinting .tab.focus							{display:block}

				.popupSchedulePrinting .tab									{position:relative; padding:15px; height:300px; background-color:#ccc; border:1px solid #ccc; overflow-y:auto}
				.popupSchedulePrinting .rendering .tab						{overflow:hidden}
				.popupSchedulePrinting .rendering .tab:before				{content:""; position:absolute; left:0; top:0; width:100%; height:100%; background-color:#ccc; z-index:2}
				.popupSchedulePrinting .rendering .tab:after				{content:"잠시만 기다려 주세요."; position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); font-size:18px; color:#999; z-index:2}

				.popupSchedulePrinting .tab > div							{padding:20px; background-color:white}
				.popupSchedulePrinting .tab > div > div						{width:1720px; min-height:1200px; background-color:white; font-family:Arial,sans-serif; box-sizing:border-box}
				.popupSchedulePrinting .tab h2								{margin-bottom:25px; text-align:center; font-size:42px; font-weight:bold; color:black}
				.popupSchedulePrinting .tab table							{border:none; /*border-bottom:2px solid black; border-right:2px solid black;*/ text-align:center; font-size:20px; font-weight:bold; color:black; table-layout:fixed}
				.popupSchedulePrinting .tab table tr > *					{position:relative; padding:8px; height:auto !important; background-color:transparent !important; border:none !important}
				.popupSchedulePrinting .tab table thead tr					{font-weight:bold}
				.popupSchedulePrinting .tab table tbody tr td				{vertical-align:top}
				.popupSchedulePrinting .tab table thead tr > *				{background-color:#e0e0e0 !important; border:none !important; font-size:120% !important}
				.popupSchedulePrinting .tab table tr th						{width:120px; background-color:#e0e0e0 !important; word-break:keep-all; white-space:normal; line-height:1.3; font-size:120% !important; font-weight:bold !important; color:inherit}
				.popupSchedulePrinting .tab table tr th,
				.popupSchedulePrinting .tab table tr td						{border-right:2px solid black !important; border-top:2px solid black !important}
				.popupSchedulePrinting .tab table tr > *:first-child		{border-left:2px solid black !important}
				.popupSchedulePrinting .tab table tbody tr:last-child > *	{border-bottom:2px solid black !important}
				.popupSchedulePrinting .tab table tr td.blue				{background-color:#d3e3f0 !important}
				.popupSchedulePrinting .tab table tr td.red					{background-color:#f3dbd4 !important}

				.popupSchedulePrinting .tab .schedule						{padding:5px 8px; padding-top:0; border-radius:5px; background-color:white; border:2px solid black; line-height:1.4; overflow:hidden}
				.popupSchedulePrinting .tab .schedule div					{word-break:keep-all; white-space:normal; line-height:1.3; /*text-overflow:ellipsis; white-space:nowrap; overflow:hidden*/}
				.popupSchedulePrinting .tab .schedule + .schedule			{margin-top:8px}
				.popupSchedulePrinting .tab .schedule .time					{margin:0 -8px 5px -8px; padding:2px 5px; background-color:#333; font-size:110%; color:white}
				.popupSchedulePrinting .tab .schedule .time.blue			{background-color:#004fec}
				.popupSchedulePrinting .tab .schedule .name					{margin:0 8px 2px 8px; font-size:110%}
				.popupSchedulePrinting .tab .schedule .summary				{opacity:0.85}
				.popupSchedulePrinting .tab .schedule .summary .memo		{padding:4px; background-color:#e0e0e0}

				.popupSchedulePrinting .tab .watermark						{margin-top:10px; padding:0 5px; text-align:right; font-size:0; opacity:0.33}
				.popupSchedulePrinting .tab .watermark img					{display:inline-block; vertical-align:middle; margin:0 5px; height:30px}
				.popupSchedulePrinting .tab .watermark span					{display:inline-block; vertical-align:middle; padding-right:0.5em; font-size:20px; font-weight:bold; color:black}
				.popupSchedulePrinting .tab .watermark img + span			{margin-left:0.5em}

				.popupSchedulePrinting .search								{margin-bottom:15px; padding:10px; height:35px; background-color:#f0f0f0; line-height:35px; text-align:center; box-sizing:initial}
				.popupSchedulePrinting .search > ul > li 					{display:inline-block; vertical-align:middle}
				.popupSchedulePrinting .search > ul > li + li				{margin-left:15px}
				.popupSchedulePrinting .search > ul > li:last-child			{margin-left:10px}
				.popupSchedulePrinting .search .ui-select					{margin-left:4px; width:105px; background-color:white; text-align-last:center; cursor:pointer}
				.popupSchedulePrinting .search .wide .ui-select				{width:135px}
				.popupSchedulePrinting .search .lesson .ui-select			{width:175px}

				.popupSchedulePrinting .search .ui-select .blank			{text-align:center; color:#333}
				.popupSchedulePrinting .search .ui-select ul				{box-sizing:initial}
				.popupSchedulePrinting .search .ui-select li				{text-align:left}
				.popupSchedulePrinting .search button						{vertical-align:top; width:125px}

				.popupSchedulePrinting .bottom button						{max-width:125px}
			</style>
			<div class="popupSchedulePrinting">
				<div class="top">
					<h2>
						그룹수업 스케줄 출력
						<a data-event="close"></a>
					</h2>
				</div>
				<div class="middle">
					<div class="ui-tab">
						<ul>
							<li><label><input name="tab" type="radio" value="time" checked data-event="tab"><div>시간별</div></label></li>
							<li><label><input name="tab" type="radio" value="coach" data-event="tab"><div>강사별</div></label></li>
						</ul>
					</div>
					<div class="search">
						<ul>
							<li class="wide">
								강사
								<select class="ui-select" name="coach" data-unit="명" multiple>
									<option>강사 선택</option>
									<option value="" data-event="select" selected>전체</option>
									${getCoachList()}
								</select>
							</li>
							<li class="lesson">
								수업
								<select class="ui-select" name="lesson" multiple>
									<option>수업 선택</option>
									<option value="" data-event="select" selected>전체</option>
									${getLessonList()}
								</select>
							</li>
							<li>
								제목
								<select class="ui-select" name="title" multiple>
									<option>제목 선택</option>
									<option value="place">장소</option>
									<option value="date" selected>날짜</option>
								</select>
							</li>
							<li class="wide">
								내용
								<select class="ui-select" name="contents" multiple>
									<option>스케줄 선택</option>
									<option value="coach" selected>강사</option>
									<option value="reservation" selected>정원</option>
									<option value="wait">대기인원</option>
								</select>
							</li>
							<li>
								색상
								<select class="ui-select" name="color">
									<option>색상 선택</option>
									<option value="color" selected>컬러</option>
									<option value="black">흑백</option>
								</select>
							</li>
							<li><button class="ui-button green" data-event="preview">적용</button></li>
						</ul>
					</div>
					<div class="tab tab-1 focus">
						<div data-id="time"></div>
					</div>
					<div class="tab tab-2">
						<div data-id="coach"></div>
					</div>
					<p class="ui-note red">
						브라우저 접속 시 팝업 허용 여부를 확인해 주세요.
					</p>
				</div>
				<div class="bottom">
					<button class="ui-button gray" data-event="close">취소</button>
					<button class="ui-button red" data-event="download">이미지 저장</button>
					<button class="ui-button blue" data-event="submit">출력</button>
				</div>
			</div>
		`;
	}
};
