const modifyCoachPopup = {
	popup : undefined,
	spaces : [],
	classSchedules : [],
	selectedCoach : [],

	open(startDate, endDate, seqPartnerSpaces) {
		Promise.all([
			schedulePopup.setPlace()])
		.then(([spaces]) => {
			this.spaces = spaces;
			const container = document.querySelector("[data-popup-location='팝업 위치']");
			container.innerHTML = this.template();
			this.popup = container.querySelector("[data-popup='강사 일괄 변경']");
			this.setCalendar(startDate, endDate);
			this.setSelector(seqPartnerSpaces);
			this.setEvent();
			this.search(startDate, endDate, seqPartnerSpaces);
			$(this.popup).fadeIn(300);
		});
	},

	close() {
		$(this.popup).fadeOut(300, function() {
			modifyCoachPopup.popup.parentNode.innerHTML = "";
		});
	},

	search(startDate, endDate, seqPartnerSpaces, keyword) {
		if(!startDate) {
			startDate =  moment(this.popup.querySelector("[name=startDate]").value);
			endDate = moment(this.popup.querySelector("[name=endDate]").value);
			keyword = this.popup.querySelector("[name=keyword]").value;
			let spaceList = this.popup.querySelector("[name=spaceList]").querySelectorAll("option:checked");
			seqPartnerSpaces = [];
			spaceList.forEach(function(item) {
				seqPartnerSpaces.push(item.value);
			});

			let error = "";
			const day = endDate.diff(startDate, "days");
			if(day < 0) error = "시작날짜와 종료날짜를 다시 한 번 확인해 주세요.";
			else if(day > 90) error = "검색 기간은 최대 90일까지 가능합니다.";
			else if(seqPartnerSpaces.length == 0) error = "장소를 선택해 주세요.";

			if(error){
				alert(error);
				return;
			}
		}

		const classList = function(startDate, endDate, seqPartnerSpaces, keyword) {
			return ClassScheduleController.findAllByPartnerInRangeAndSpaces({
				classScheduleDto : {
					startDt : startDate,
					endDt : endDate
				},
				seqPartnerSpaces : seqPartnerSpaces,
				searchStr : keyword || ""
				// 수업 또는 강사 조건 추가
			});
		};

		Promise.all([
				classList(startDate, endDate, seqPartnerSpaces, keyword)])
			.then(([classSchedules]) => {
				this.classSchedules = classSchedules;
				this.render.classList();
				this.render.selectedCoachList();
				this.render.updateState();
			});
	},

	modify() {
		const checkedList = this.popup.querySelectorAll("[name=classList]:checked");
		if(checkedList.length == 0) {
			alert("선택된 수업이 없습니다.");
			return;
		}
		const oldCoachId = this.popup.querySelector("[name=oldCoach]").value;
		const newCoachId = this.popup.querySelector("[name=newCoach]").value;

		if(!oldCoachId || !newCoachId) {
			alert("변경하실 강사를 선택해 주세요.");
			return;
		}

		checkedList.forEach(function(item) {
			const coachId = item.getAttribute("data-value");
			if(coachId == oldCoachId || oldCoachId == "all") {
				item.value = newCoachId;
				const tr = item.parentNode.parentNode.parentNode;
				const option = tr.querySelectorAll("option");

				option.forEach(function(item) {
					tr.className = (coachId == newCoachId) ? "" : "focus";
					item.selected = (item.value == newCoachId) ? true : false;
				});
			}
		});

//		modifyCoachPopup.render.selectedCoachList();
	},

	submit() {
		const node = this.popup.querySelectorAll("[name=classList]");
		let modifyList = []
		node.forEach(function(item) {
			const classId = Number(item.getAttribute("data-class"));
			const oldCoachId = Number(item.getAttribute("data-value"));
			const newCoachId = Number(item.value);
			if(oldCoachId != newCoachId)
				modifyList.push({
					seqPartnerClassSchedule	: classId,
					seqPartnerCoach	: newCoachId
				});
		});

		const length = modifyList.length;
		if(length == 0){
			alert("변경된 내용이 없습니다.");
			return;
		}

		if(confirm(length + "개의 내용을 변경하시겠습니까?")) {
			ClassScheduleController.changeCoach(modifyList).then(function() {
				alert("변경되었습니다.");
				modifyCoachPopup.search();
				schedulePopup.resetReload();
			})
		};
	},

	render : {
		checkAll(object) {
			const node = modifyCoachPopup.popup.querySelectorAll("[name=classList]");
			const checked = object.checked;
			node.forEach(function(item){
				item.checked = checked;
			});
			this.updateState();
		},

		checkModify(object) {
			const oldCoachId = object.getAttribute("data-value");
			const newCoachId = object.value;
			const tr = object.parentNode.parentNode;
			const input = tr.querySelector("input");
			tr.className = (oldCoachId == newCoachId) ? "" : "focus";
			input.value = newCoachId;
		},

		updateState() {
			const popup = modifyCoachPopup.popup;
			const node = popup.getElementsByTagName("var");
			const list = popup.querySelectorAll("[name=classList]");
			const checkedList = popup.querySelectorAll("[name=classList]:checked");
			if(list.length == checkedList.length){
				document.getElementById("ui-popup-check").checked = (list.length == 0) ? false : true;
			}
			node[0].innerHTML = modifyCoachPopup.classSchedules.length;
			node[1].innerHTML = checkedList.length;
		},

		coachList(coachId) {
			const option = coachList.data.map(function(item) {
				const selected = (item.key && item.key == coachId) ? "selected" : "";
				return `<option value="${item.key}" ${selected}>${item.label}</option>`;
			});
			return `<option value="" selected>강사를 선택해 주세요.</option>` + option.join("");
		},

		selectedCoachList() {
			const popup = modifyCoachPopup.popup;
			const coachIdList = {};
			const optionList = {};
			coachList.data.forEach(function(item) {
				return coachIdList[item.key] = item.label;
			});

			let option = `<option value="" selected>강사를 선택해 주세요.</option>`;
			const checkedList = popup.querySelectorAll("[name=classList]:checked");
			if(checkedList.length > 0)
				option += `<option value="all">전체 선택</option>`;

			checkedList.forEach(function(item) {
//				const coachId = item.value;
				const coachId = item.getAttribute("data-value");
				const coachName = coachIdList[coachId];
				if(!optionList[coachId]) {
					option += `<option value="${coachId}">${coachName}</option>`;
					optionList[coachId] = coachName;
				}
			});
			popup.querySelector("[name=oldCoach]").innerHTML = option;
		},

		spaceList() {
			const option = 	modifyCoachPopup.spaces.map(function(item) {
				return `<option value="${item.key}">${item.label}</option>`;
			});
			return option.join("");
		},

		classList() {
			let tbody = modifyCoachPopup.classSchedules.map(function(item) {
				const lessonDate = moment(item.startDt).format("YYYY-MM-DD(ddd)");
				const lessonTime = moment(item.startTime, "hh:mm:ss").format("HH:mm");
				const lessonId = item.seqPartnerClassSchedule;
				const lessonSpace = (item.space) ? item.space.spaceName : "-";
				const coachName = (item.coach) ? item.coach.coachName : "-";
				const coachId = item.seqPartnerCoach;
				const coachList = modifyCoachPopup.render.coachList(coachId);
				return `
					<tr>
						<th><label><input name="classList" type="checkbox" data-class="${lessonId}" data-action="선택 수업" data-value="${coachId}" value="${coachId}"><span></span></label></th>
						<td>${lessonDate + " " + lessonTime}</td>
						<td>${item.lessonName}</td>
						<td>${lessonSpace}</td>
						<td>${coachName}</td>
						<td><select name="newCoach" data-value="${coachId}" data-action="강사 변경">${coachList}</select></td>
					</tr>
				`;
			});
			tbody = tbody.join("");
			if(!tbody) tbody = `<tr><td class="empty" colspan="6">검색 결과가 없습니다.</td></tr>`;
			document.getElementById("ui-popup-result").innerHTML = tbody;
		}
	},

	template() {
		return `
			<style type="text/css">
				.ui-popup > div											{min-width:1100px !important}
				.ui-popup .middle 										{padding:25px; line-height:35px; font-size:14px !important}
				.ui-popup .middle dl									{white-space:nowrap; table-layout:auto}
				.ui-popup .middle dl dd									{line-height:35px !important}
				.ui-popup .middle button								{width:125px}
				.ui-popup .middle input,
				.ui-popup .middle select,
				.ui-popup .middle .SumoSelect 							{margin:0 7.5px; width:200px; min-width:200px; text-align:center; text-align-last:center}
				.ui-popup .middle .SumoSelect 							{text-align:left}

				.ui-popup .middle .search								{padding:5px 0 30px 0}
				.ui-popup .middle .search input							{padding-right:35px; min-width:125px}
				.ui-popup .middle .search dd:last-child					{width:125px; text-align:right}
				.ui-popup .middle .search button						{margin-left:15px}

				.ui-popup .middle .modify								{padding-top:30px; padding-bottom:5px; border-top:1px dashed #bbb; text-align:right}
				.ui-popup .middle .modify p								{display:block; margin-top:5px; font-size:12px; color:black}
				.ui-popup .middle .modify button						{margin-left:25px}

				.ui-popup .middle .result h4							{margin-bottom:10px; line-height:35px; font-size:14px; font-weight:normal; color:inherit}
				.ui-popup .middle .result th							{width:35px}
				.ui-popup .middle .result thead label					{border-color:#686d7b}
				.ui-popup .middle .result > div							{position:relative; border:1px solid #bbb; overflow:hidden; box-sizing:border-box}
				.ui-popup .middle .result > div .head td:last-child		{width:10px; border:none !important}
				.ui-popup .middle .result > div .body					{max-height:210px; overflow-y:auto}

				.ui-popup .middle .result td							{width:25%}
				.ui-popup .middle .result th + td						{width:30%}
				.ui-popup .middle .result th + td + td					{width:30%}
				.ui-popup .middle .result th + td + td + td				{width:25%}
				.ui-popup .middle .result tr.focus						{background-color:rgba(33,150,243,0.2) !important}

				.ui-popup .middle .result label							{display:inline-block; padding-left:0; width:20px; height:35px}
				.ui-popup .middle .result td.empty						{border-left:none !important}

				.ui-popup .middle table thead td						{border-left:1px solid white}
				.ui-popup .middle table th,
				.ui-popup .middle table td								{background-color:transparent !important; border:none !important}
				.ui-popup .middle table tr + tr							{border-top:1px solid #bbb}
				.ui-popup .middle table thead td,
				.ui-popup .middle table tbody td						{border-left:1px solid #bbb !important}
				.ui-popup .middle table tbody td:first-child			{border-left:none !important}
				.ui-popup .middle table tbody th						{}
				.ui-popup .middle table tr:nth-child(odd)				{background-color:#f0f0f2}
				.ui-popup .middle table thead tr						{background-color:#686d7b !important; color:white}
				.ui-popup .middle table select							{margin:0 !important; width:100% !important; min-width:auto !important; background-color:transparent !important; border:none; font-size:inherit !important; color:inherit !important}

			</style>

			<div class="ui-popup ui-style focus" data-popup="강사 일괄 변경">
				<div>
					<div>
						<div>
							<div class="top">
								<h2>
									강사 일괄 변경
									<a data-action="취소"></a>
								</h2>
							</div>
							<div class="middle">
								<div class="search">
									<dl>
										<dd>
											수업 기간
											<input class="calendar" name="startDate" type="text">
											-
											<input class="calendar" name="endDate" type="text">
										</dd>
										<dd>
											장소
											<select name="spaceList" multiple>${this.render.spaceList()}</select>
										</dd>
										<dd>
											수업 또는 강사
											<input name="keyword" type="text">
										</dd>
										<dd>
											<button class="green" data-action="검색">검색</button>
										</dd>
									</dl>
								</div>

								<div class="modify">
									선택하신 수업 중
									<select name="oldCoach"></select>
									강사님으로 배정된 수업의 담당 강사를
									<select name="newCoach">${this.render.coachList()}</select>
									강사님으로 일괄 변경 합니다.
									<button data-action="변경">변경</button>
									<p>ⓘ 변경 처리 후 아래 저장까지 완료해야 변경사항이 적용됩니다.</p>
								</div>

								<div class="result ui-checkbox">
									<h4>검색결과 <var></var> / 선택 <var></var></h4>
									<div>
										<div class="head">
											<table>
												<thead>
													<tr><th><label><input id="ui-popup-check" type="checkbox" data-action="전체 선택"><span></span></label></th><td>수업 일시</td><td>수업 이름</td><td>장소</td><td>기존 강사</td><td>변경할 강사</td><td></td></tr>
												</thead>
											</table>
										</div>
										<div class="body">
											<table>
												<tbody id="ui-popup-result"></tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
							<div class="bottom">
								<button class="gray" data-action="취소">취소</button>
								<button class="blue" data-action="저장">저장</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	},

	setCalendar(startDate, endDate) {
		const node = this.popup.getElementsByClassName("calendar");
		if(node.length == 0) return;

		const today = new Date();
		$(".ui-popup .calendar").filter(function() {
			$(this).datepicker({
				yearSuffix: "년",
				monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
				dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
				dateFormat: "yy-mm-dd",
				firstDay: 1,
				setDate : today
			});
		});

		const dateFormat = scheduler.date.date_to_str('%Y-%m-%d');
		startDate = dateFormat(startDate);
		endDate = dateFormat(endDate);
		this.popup.querySelector("[name=startDate]").value = startDate;
		this.popup.querySelector("[name=endDate]").value = endDate;
	},

	setSelector(seqPartnerSpaces) {
		seqPartnerSpaces.map((item) => {
			this.popup.querySelector("option[value='" + item + "']").selected = true;
		});

		$(this.popup.querySelector("[name=spaceList]")).SumoSelect({
			placeholder : "장소를 선택해주세요",
			csvDispCount : 3,
			captionFormat : "{0}개 선택",
			captionFormatAllSelected : "모두 선택"
		});
	},

	setEvent() {
		const popup = $(this.popup);
		popup.on("click", "[data-action='취소']", function() {
			modifyCoachPopup.close();
		});
		popup.on("click", "[data-action='변경']", function() {
			modifyCoachPopup.modify();
		});
		popup.on("click", "[data-action='검색']", function() {
			modifyCoachPopup.search();
		});
		popup.on("click", "[data-action='저장']", function() {
			modifyCoachPopup.submit();
		});
		popup.on("click", "[data-action='선택 수업']", function() {
			modifyCoachPopup.render.selectedCoachList();
		});
		popup.on("change", "[data-action='선택 수업']", function() {
			modifyCoachPopup.render.updateState();
		});
		popup.on("change", "[data-action='전체 선택']", function() {
			modifyCoachPopup.render.checkAll(this);
			modifyCoachPopup.render.selectedCoachList();
		});
		popup.on("change", "[data-action='강사 변경']", function() {
			modifyCoachPopup.render.checkModify(this);
		});
	}
};

