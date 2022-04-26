const popupSearchBranch = {
	popup : undefined,
	data : {},
	callback : undefined,
	open : function(context, container, isSelf, callback, option) {
		if(this.popup) return;
		this.data = {
			container : container,
			branchList : (context.data.branchList || []).filter(item => item.seqPartnerBranch),
			isSelf : isSelf,
			option : option || {}
		};
		this.callback = callback;
		this.render();
	},
	close : function(isUpdate) {
		this.popup = uiPopup();
		if(isUpdate) {
			if(this.callback) this.callback();
		}
	},
	update : function(context, container, branchList, isSelf, option) {
		if(!branchList) return;
		if(!Array.isArray(branchList)) branchList = [branchList];
		branchList = branchList.map(item => {
			return (item && typeof item == "object") ? item.seqPartnerBranch : item;
		});
		if(isSelf) {
			const seqPartnerBranch = partnerInfo.branch.id;
			if(branchList.indexOf(seqPartnerBranch) == -1)
				branchList.splice(0, 0, seqPartnerBranch);
		}
		const input = container.querySelector("[name='branchList']");
		if(!input) return;
		container = input.parentNode;
	 	container.putValue("branchList", branchList.join(","));
		this.event.self = this;
		this.data = {
			container : container,
			branchList : context.data.branchList || [],
			isSelf : isSelf,
			option : option || {}
		}
		this.event.setBranchInfo();
	},
	submit : function() {
		const checkedList = Array.from(this.popup.querySelectorAll("[name='seqPartnerBranch']:checked"));
		const input = this.data.container.querySelector("input[type='hidden']");
		input.value = checkedList.map(item => Number(item.value)).join(",");
		this.event.setBranchInfo();
		this.close(true);
	},
	render : function() {
		const self = this.event.self = this;
		this.popup = uiPopup({
			template : this.template(),
			beforeEvent : (popup) => {
				const input = this.data.container.querySelector("input[type='hidden']");
				popup.putValue("seqPartnerBranch", input.value.split(","));
			},
			event : {
				click : {
					close : () => {this.close()},
					submit : () => {this.submit()}
				}
			}
		});
		this.event.setBranchInfo();
	},

	event : {
		setBranchInfo : function() {
			const container = this.self.data.container;
			const input1 = container.querySelector("input[readonly]");
			const input2 = container.querySelector("input[type='hidden']");
			const checkedList = input2.value.split(",");
			const branchNameList = [];
			checkedList.forEach(item => {
				const seqPartnerBranch = Number(item);
				if(seqPartnerBranch) {
					const branchInfo = this.self.data.branchList.filter(item => {
						return (item.seqPartnerBranch == seqPartnerBranch);
					})[0] || {};
					branchNameList.push(branchInfo.partnerName || "-");
				}
			});
			const length = branchNameList.length;
			const empty = this.self.data.option.empty || "";
			input1.value = (length) ? (length == 1) ? branchNameList[0] : branchNameList[0] + " 외 " + (length - 1) + "개" : empty;
		}
	},
	template : function() {
		const getBranchList = () => {
			const isHeadquarter = (partnerInfo.partner.headquartersYn == "Y");
			const seqPartnerBranch = partnerInfo.branch.id ;
			const li = this.data.branchList.map((item, index) => {
				const branchName = item.partnerName || "-";
				const isSelf = (this.data.self) ? (item.seqPartnerBranch == seqPartnerBranch) : false;
				const isPermission = (isHeadquarter) ? true : (item.seqPartnerBranch == seqPartnerBranch);
				const isDisabled = (isSelf || !isPermission) ? "disabled" : "";
				const isChecked = (isSelf) ? "checked" : "";
				return `
					<li>
						<label class="ui-input-checkbox">
							<input name="seqPartnerBranch" type="checkbox" value="${item.seqPartnerBranch}" ${isChecked} ${isDisabled}>
							<span></span>
							${branchName}
						</label>
					</li>
				`;
			});
			return li.join("");
		};
		return `
			<style type="text/css">
				.popupSearchBranch						{max-width:800px}
				.popupSearchBranch .branchList			{font-size:0; line-height:35px}
				.popupSearchBranch .branchList:after	{content:""; display:table; clear:both}
				.popupSearchBranch .branchList li		{float:left; display:inline-block; vertical-align:top; width:25%; font-size:13px; box-sizing:border-box}
				.popupSearchBranch .branchList li label	{display:block; text-overflow:ellipsis; white-space:nowrap; overflow:hidden}
			</style>
			<div class="popupSearchBranch">
				<div class="top">
					<h2>
						지점 선택
						<a data-event="close"></a>
					</h2>
				</div>
				<div class="middle">
					<div class="groupList"></div>
					<div class="branchList">
						<ul>${getBranchList()}</ul>
					</div>
				</div>
				<div class="bottom">
					<button class="ui-button gray" data-event="close">취소</button>
					<button class="ui-button" data-event="submit">선택 완료</button>
				</div>
			</div>
		`;
	}
};


const popupAppointmentBranch = {
	popup : undefined,
	data : {},
	open : function(context, container, callback) {
		if(this.popup) return;
		const coachAndSpaceList = container.getValue("coachAndSpaceList");
		Promise.all([
			commonController.coachAllList(),
			commonController.placeAllList()
		]).then(([coachList, placeList]) => {
			this.data = {
				container : container,
				branchList : (context.data.branchList || []).filter(item => item.seqPartnerBranch),
				coachList : coachList || [],
				placeList : placeList || [],
				coachAndSpaceList : (coachAndSpaceList) ? JSON.parse(coachAndSpaceList) : [{}],
				isHeadquarter : (partnerInfo.partner.headquartersYn == "Y"),
				seqPartnerBranch : partnerInfo.branch.id || 0
			};
			if(!this.data.coachAndSpaceList.length) {
				this.data.coachAndSpaceList = [{}];
			}
			this.callback = callback;
			this.render();
		}).catch(error => {
			uiError(error);
		});
	},
	close : function(isUpdate) {
		this.popup = uiPopup();
		if(isUpdate) {
			if(this.callback) this.callback();
		}
	},
	submit : function() {
		const dataList = Array.from(this.popup.querySelectorAll("tbody tr")).map(item => {
			const seqPartnerBranch = item.getValue("seqPartnerBranch", true);
			let coachList = item.getValue("coaches-option");
			if(coachList == "N") coachList = [];
			else coachList = coachList.map(item => Number(item)).filter(item => (item));
			const seqPartnerSpace = item.getValue("seqPartnerSpace", true);
			return {
				seqPartnerBranch : seqPartnerBranch,
				seqPartnerCoaches : coachList,
				seqPartnerSpace : seqPartnerSpace
			};
		}).filter(item => {
			return (item.seqPartnerBranch);
		});
		if(!this.event.check(dataList)) return;

		const input = this.data.container.querySelector("[name='coachAndSpaceList']");
		if(input) input.value = (dataList.length) ? JSON.stringify(dataList) : "";
		const branchList = dataList.map(item => item.seqPartnerBranch);
		popupSearchBranch.update(this, this.data.container, branchList);
		this.close(true);
	},
	render : function() {
		const self = this.event.self = this;
		this.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					close : () => {this.close();},
					submit : () => {this.submit();}
				}
			}
		});
		this.event.updateList();
	},
	event : {
		check : function(data) {
			const tr = Array.from(this.self.popup.querySelectorAll("tbody tr")).filter(item => {
				return (item.getValue("seqPartnerBranch"));
			});
			for(let i = 0; i < data.length; i++) {
				for(let name in data[i]) {
					const value = data[i][name];
					const isEmpty = (Array.isArray(value)) ? !value.length : !value;
					let error = "";
					switch(name) {
						case "seqPartnerBranch"			: if(isEmpty) error = "판매 가능 지점을 선택해 주세요."; break;
//						case "seqPartnerCoaches"		: if(isEmpty) error = "레슨 강사를 선택해 주세요."; break;
						case "seqPartnerSpace"			: if(isEmpty) error = "수업 장소를 선택해 주세요."; break;
					}
					if(error) {
						alert(error);
						const index = (name == "seqPartnerCoaches") ? 1 : (name == "seqPartnerSpace") ? 2 : 0;
						const select = tr[i].querySelectorAll("select")[index];
						if(select) select.focus();
						return false;
					}
				}
			}
			return true;
		},
		changeBranch : function(object) {
			const checkedBranchList = Array.from(this.self.popup.querySelectorAll("[name='seqPartnerBranch']")).filter(item => {
				return (item != object);
			}).map(item => Number(item.value));
			const tr = object.parentNode.parentNode;
			const seqPartnerBranch = Number(object.value);
			if(seqPartnerBranch && checkedBranchList.indexOf(seqPartnerBranch) > -1) {
				alert("지점을 중복해서 설정할 수 없습니다.");
				object.value = "";
				return;
			}
			tr.setAttribute("data-sequence", seqPartnerBranch);
			const select1 = tr.querySelector("[name='coaches']").parentNode.parentNode;
			const select2 = tr.querySelector("[name='seqPartnerSpace']");
			select1.innerHTML = this.getCoachList(seqPartnerBranch);
			select2.innerHTML = this.getPlaceList(seqPartnerBranch, null, true);
			uiSelect(select1);
		},
		getCoachList : function(seqPartnerBranch, coachList) {
			const isHeadquarter = this.self.data.isHeadquarter;
			const centerSeqPartnerBranch = this.self.data.seqPartnerBranch;
			const disabled = (seqPartnerBranch) ? (isHeadquarter) ? "" : (centerSeqPartnerBranch != seqPartnerBranch) ? "disabled" : "" : "";

			if(!coachList) coachList = [];
			const option = (seqPartnerBranch) ? this.self.data.coachList.filter(item => {
				return (item.seqPartnerBranch == seqPartnerBranch);
			}).map(item => {
				const selected = (coachList.indexOf(item.seqPartnerCoach) > -1) ? "selected" : "";
				return `<option value="${item.seqPartnerCoach}" ${selected} data-event="changeCoach">${item.coachName}</option>`;
			}) : [];
			const defaultSelected = (coachList.length) ? "" : "selected";
			return `
				<select class="ui-select" name="coaches" max="30" data-unit="명" data-ellipsis="3" multiple ${disabled}>
					<option value="">강사 선택</option>
					<option value="" data-event="changeCoach" selected>미지정</option>
					${option.join("")}
				</select>
			`;
		},
		getPlaceList : function(seqPartnerBranch, seqPartnerSpace, isAlert) {
			const isHeadquarter = this.self.data.isHeadquarter;
			const centerSeqPartnerBranch = this.self.data.seqPartnerBranch;
			const option = (seqPartnerBranch) ? this.self.data.placeList.filter(item => {
				return (item.seqPartnerBranch == seqPartnerBranch);
			}).map(item => {
				const selected = (seqPartnerBranch && item.seqPartnerSpace == seqPartnerSpace) ? "selected" : "";
				return `<option value="${item.seqPartnerSpace}" ${selected}>${item.spaceName}</option>`;
			}) : [];
			if(isAlert && !option.length) {
				alert("등록된 장소가 없습니다.\n'센터관리 > 센터설정'에서 장소 정보를 입력 후\n지정하실 수 있습니다.");
			}
			return `
				<option value="">장소 선택</option>
				${option.join("")}
			`;
		},
		getBranchList : function(seqPartnerBranch) {
			const isHeadquarter = this.self.data.isHeadquarter;
			const centerSeqPartnerBranch = this.self.data.seqPartnerBranch;

			const option = this.self.data.branchList.filter(item => {
				return (item.seqPartnerBranch);
			}).map(item => {
				const selected = (item.seqPartnerBranch == seqPartnerBranch) ? "selected" : "";
				const disabled = (isHeadquarter) ? "" : (item.seqPartnerBranch != centerSeqPartnerBranch) ? "disabled" : "";
				return `<option value="${item.seqPartnerBranch}" ${disabled} ${selected}>${item.partnerName}</option>`;
			});
			return `
				<option value="">지점 선택</option>
				${option.join("")}
			`;
		},
		addItem : function() {
			const table = this.self.popup.querySelector("table");
			const tbody = table.querySelector("tbody");
			const isDuplicate = () => {
				const isHeadquarter = this.self.data.isHeadquarter;
				const seqPartnerBranch = this.self.data.seqPartnerBranch;
				return (!isHeadquarter) ? Array.from(table.querySelectorAll("[name='seqPartnerBranch']")).some(item => {
					return (Number(item.value) == seqPartnerBranch);
				}) : false;
			};
			if(isDuplicate()) {
				alert("지점을 중복해서 설정할 수 없습니다.");
				return;
			}
			const tr = document.createElement("tr");
			tr.innerHTML = this.getTemplate({});
			tbody.appendChild(tr);
			this.updateListEvent(tr);
			table.className = "";
		},
		delItem : function(object) {
			const table = this.self.popup.querySelector("table");
			const node = object.parentNode.parentNode;
			const nodeList = node.parentNode.querySelectorAll("tr");
			for(let i = 0; i < nodeList.length; i++) {
				if(nodeList[i] == node) {
					node.parentNode.removeChild(node);
					break;
				}
			}
			table.className = (nodeList.length - 1 == 1) ? "empty" : "";
		},
		getTemplate : function(item) {
			const seqPartnerBranch = item.seqPartnerBranch || 0;
			const coachList = item.seqPartnerCoaches || [];
			const seqPartnerSpace = item.seqPartnerSpace || 0;

			const isHeadquarter = this.self.data.isHeadquarter;
			const centerSeqPartnerBranch = this.self.data.seqPartnerBranch;
			const disabled = (seqPartnerBranch) ? (isHeadquarter) ? "" : (centerSeqPartnerBranch != seqPartnerBranch) ? "disabled" : "" : "";

			return `
				<td>
					<select class="ui-select" name="seqPartnerBranch" data-event="changeBranch" ${disabled} required>
						${this.getBranchList(seqPartnerBranch)}
					</select>
				</td>
				<td>
					${this.getCoachList(seqPartnerBranch, coachList)}
				</td>
				<td>
					<select class="ui-select" name="seqPartnerSpace" ${disabled} required>
						${this.getPlaceList(seqPartnerBranch, seqPartnerSpace)}
					</select>
				</td>
				<td>
					<button class="del" data-event="del" ${disabled}></button>
					<button class="add" data-event="add"></button>
				</td>
			`;
		},
		updateListEvent : function(object) {
			const self = this.self;
			uiSelect(object);
			uiEvent(object, {
				click : {
					add : function() {
						self.event.addItem();
					},
					del : function() {
						self.event.delItem(this);
					},
					changeCoach : function() {
						self.event.changeCoach(this);
					},
				},
				change : {
					changeBranch : function() {
						self.event.changeBranch(this);
					}
				}
			});
		},
		updateList : function(isEvent) {
			const table = this.self.popup.querySelector("table");
			const tbody = table.querySelector("tbody");
			const tr = this.self.data.coachAndSpaceList.map((item, index) => {
				return `
					<tr>
						${this.getTemplate(item)}
					</tr>
				`;
			});
			tbody.innerHTML = tr.join("");
			table.className = (tr.length == 1) ? "empty" : "";
			this.updateListEvent(tbody);
		},
		changeCoach : function(object) {
			const name = object.name;
			const ul = object.parentNode.parentNode.parentNode.parentNode;
			const optionList = ul.querySelectorAll("[name='" + name + "']");
			const value = object.value;
			if(value) {
				optionList[1].checked = false;
			} else {
				optionList[1].checked = true;
				optionList.forEach(item => {
					if(item.value)
						item.checked = false;
				});
			}
		}
	},
	template : function() {
		return `
			<style type="text/css">
				.popupAppointmentBranch											{max-width:820px; overflow:visible !important}
				.popupAppointmentBranch .middle									{max-height:400px; overflow:visible}
				.popupAppointmentBranch table									{width:100%; line-height:1.3; text-align:left; color:#454545}
				.popupAppointmentBranch table thead tr							{font-size:15px; font-weight:500}
				.popupAppointmentBranch table thead tr td						{padding-bottom:5px}
				.popupAppointmentBranch table tbody tr + tr td					{padding-top:8px}

				.popupAppointmentBranch table td								{position:relative; padding-right:8px}
				.popupAppointmentBranch table td .ui-select						{display:block; width:100%}
				.popupAppointmentBranch table td:last-child						{font-size:0}

				.popupAppointmentBranch table td button							{width:36px; height:36px; color:inherit !important}
				.popupAppointmentBranch table td button:focus					{box-shadow:0 0 0 3px rgba(0,0,0,0.1)}
				.popupAppointmentBranch table td button.add:focus				{box-shadow:0 0 0 3px rgba(182,196,224,0.5)}
				.popupAppointmentBranch table td button.add						{display:none; background:#b6c4e0 url(/static/img/icon/icon_plus_thin_white.png) no-repeat center center / 18px; border:1px solid #b6c4e0}
				.popupAppointmentBranch table td button.del						{margin-right:8px; background:white url(/static/img/icon/icon_close_thin_gray.png) no-repeat center center / 18px; border:1px solid #ccc}
				.popupAppointmentBranch table.empty tbody button.del			{display:none}
				.popupAppointmentBranch table tbody tr:last-child button.add	{display:inline-block}

				.popupAppointmentBranch	.required:after							{content:""; display:inline-block; vertical-align:middle; margin:-15px 0 0 5px; width:4px; height:4px; background-color:#004fec; border-radius:100%}

				.popupAppointmentBranch .ui-select li							{margin:0; line-height:27px}
				.popupAppointmentBranch .ui-select li label						{padding-left:24px; border-top:none}
				.popupAppointmentBranch .ui-select li input + span				{width:15px; height:15px}

				.popupAppointmentBranch .ui-select option[disabled]				{color:#ccc !important}
				.popupAppointmentBranch .ui-select select:disabled + div		{color:#aaa !important}
			</style>
			<div class="popupAppointmentBranch">
				<div class="top">
					<h2>
						판매 지점 및 레슨 강사 선택
						<a data-event="close"></a>
					</h2>
				</div>
				<div class="middle">
					<div class="itemList" data-id="itemList">
						<table>
							<colgroup>
								<col width="175px"><col width="275px"><col width="175px"><col width="85px">
							</colgroup>
							<thead>
								<tr>
									<td class="required">판매 가능 지점</td>
									<td class="required">레슨 강사</td>
									<td class="required">수업 장소</td>
									<td></td>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
				</div>
				<div class="bottom">
					<button class="ui-button gray" data-event="close">취소</button>
					<button class="ui-button" data-event="submit">적용</button>
				</div>
			</div>
		`;
	}
};
