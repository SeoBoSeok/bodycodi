const popupLoginCoach = {
	popup : undefined,
	data : {},
	open : function() {
		if(this.popup) return;
		const seqPartner = partnerInfo.partner.id;
		coachController.getList(seqPartner).then((coachList) => {
			coachList = coachList || [];
			/*
			coachList = coachList.map(item => {
				delete item.position;
				return item;
			});
			*/
			this.data.coachList = coachList.sort(function(a, b) {
				let typeCodeA = Number(a.employeeTypeCode);
				let typeCodeB = Number(b.employeeTypeCode);
				if(typeCodeA < 0) typeCodeA = 1;
				if(typeCodeB < 0) typeCodeB = 1;
				const positionA = (a.position) ? a.position.order : 99;
				const positionB = (b.position) ? b.position.order : 99;
				const sequence = (positionA < positionB) ? -1 : (positionA > positionB) ? 1 : 0;
				return (typeCodeA == typeCodeB) ? sequence : (typeCodeA < typeCodeB) ? -1 : (typeCodeA > typeCodeB) ? 1 : 0;
			});

			const groupList = {};
			this.data.coachList.forEach(item => {
				const typeCode = Number(item.employeeTypeCode || 4);
				const position = item.position || {};
				let order = Number(position.order) + 1;
				if(typeCode < 2) order = 0;
				if(!groupList[order]) {
					groupList[order] = {
						title : (order == 0) ? "대표 관리자 및 기본 관리자" : position.title || "기타 관리자",
						coachList : []
					};
				}
				groupList[order].coachList.push(item);
			});
			this.data.groupList = groupList;
			this.render();
		}).catch(error => {
			uiError(error);
		});
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
					confirmPassword : function() {
                        self.event.confirmPassword(this);
					},
					selectCoach : function() {
                        self.event.selectCoach(this);
					}
				}
			}
		});
	},

	event : {
        confirmPassword : function(object) {
            const id = object.getAttribute("data-id");
            popupCoachConfirmPassword.open({searchParamMap : {seqPartnerCoach : id}});
		},
        selectCoach : function(object) {
			const id = object.getAttribute("data-id");
			coachController.login({seqPartnerCoach : id}).then(function(data) {
				if(data == true) {
					if(typeof uiHistory == "object") {
						uiHistory.remove();
					}
					window.location.href = "/home";
					// window.location.reload(true);
				}
			});
		},
	},

	template : function() {
		const data = this.data.coachList || [];
		const groupList = this.data.groupList || {};

		const getCoachList = () => {
			const setThumbnail = function(source, sex) {
				if(source) return source;
				return "/static/img/login/" + ((sex == "F") ? "female.jpg" : "male.jpg");
			};
			const setLabel = function(data) {
				const label = [];
				switch(data.employeeTypeCode) {
					case "-1" : label.push("기본 관리자"); break;
					case "00" : label.push("대표 관리자"); break;
					default :
						if(data.position) label.push(data.position.title);
						if(data.teams && data.teams.length > 0)
							data.teams.forEach(function(item) {
								label.push(item.title);
							});
						break;
				}
				return label.join(" / ");
			};

			let list = "";
			for(let i in groupList) {
				const item = groupList[i];
				const coachList = item.coachList || [];
				if(item.title)
					list += `<li class="title">${item.title}</li>`;

				const li = coachList.map(function(item) {
					const thumbnail = setThumbnail(item.imgUrl, item.sex);
					const label = setLabel(item);
					const isPassword = (item.pwdActive == "Y") ? true : false;
					const isSelf = (item.seqPartnerCoach == partnerInfo.employee.id) ? true : false;
					const className = (isPassword) ? "lock" : "unlock";
					const buttonColor = (isSelf) ? "gray" : "white";
					const buttonEvent = (isSelf) ? "" : ((isPassword) ? "confirmPassword" : "selectCoach");
					const buttonDisabled = (isSelf) ? "disabled" : "";
					return `
						<li class="${className}">
							<img src="${thumbnail}" />
							<div>
								<h5>${label}</h5>
								<h4>${item.coachName}</h4>
								<p>${item.mobileNo}</p>
							</div>
							<button class="ui-button ${buttonColor}" ${buttonDisabled} data-id="${item.seqPartnerCoach}" data-event="${buttonEvent}">선택</button>
						</li>
					`;
				});
				list += li.join("");
			}
			return list;
		};

		return `
			<div class="popupLoginCoach">
				<div class="top">
					<h2>
						사용자를 선택해 주세요.
						<a data-event="close"></a>
					</h2>
				</div>
				<div class="middle">
					<ul>${getCoachList()}</ul>
				</div>
				<div class="bottom">
					<button class="darkblue ui-button" data-event="close">닫기</button>
				</div>
			</div>
		`;
	}
}



/* ********* 임직원 변경 비밀번호 확인 ******** */
const popupCoachConfirmPassword = {
	popup : undefined,
	data : "",
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
                    cancel : function() {
                        self.close();
                    },
                    ok : function() {
                        self.event.submit(this);
                    },
                },
                keypress : {
                	check : function(event) {
                		event = event || window.event;
                		if(event.keyCode == 13)
							self.event.submit(this);
					}
				}
            }
        });
	},
	event : {
		submit : function(object) {
			const popup = this.self.popup;
			const input = popup.querySelector("[name='password']");
			const password = input.value.trim();
			if(!password) {
				uiAlert({
					contents : "비밀번호를 입력해 주세요.",
					focus	: input
				});
				return;
			}
			const data = this.self.data;
            const id = data.seqPartnerCoach;
			data.searchParamMap.pwd = password;

			coachController.confirmPassword(data).then(data => {
				if(data.resultCode == "1301") {
					uiAlert("비밀번호가 일치하지 않습니다.");
					return;
				} else {
					const id = this.self.data.searchParamMap.seqPartnerCoach;
					coachController.login({seqPartnerCoach : id}).then(data => {
						if(data) location.reload(true);
					});
				}
			});
		}
	},
	template : function() {
		return `
			<div class="popupLoginCoach-confirm">
				<div class="top">
					<h2>
						비밀번호 확인
						<a data-event="cancel"></a>
					</h2>
				</div>
				<div class="middle">
					<p>선택한 사용자의 비밀번호를 입력해 주세요.</p>
					<input class="ui-input" name="password" type="password" placeholder="비밀번호 입력" data-event="check">
				</div>
				<div class="bottom">
					<button class="ui-button gray" data-event="cancel">취소</button>
					<button class="ui-button" data-event="ok">확인</button>
				</div>
			</div>
		`;
	}
}



/* ********* 강사 비밀번호 변경 ******** */
const popupChangePassword = {
	popup : undefined,
	data : {},
	open : function(seqPartnerCoach) {
		if(this.popup) return;
		coachController.info(seqPartnerCoach).then(data => {
			this.data = data;
			this.render();
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	close : function() {
		this.popup = undefined;
		uiPopup();
	},
	submit : function() {
		const seqPartnerCoach = this.data.seqPartnerCoach;
		const passwordYn = this.popup.getValue("passwordYn");
		const oldPassword = this.popup.getValue("oldPassword");
		const newPassword = this.popup.getValue("newPassword");
		const newRePassword = this.popup.getValue("newRePassword");
		const getState = () => {
			const state = this.data.pwdActive;
			if(state == "Y") {
				return (passwordYn == "Y") ? "changePwd" : "nonActivePwd";
			} else {
				return (passwordYn == "Y") ? "activePwd" : "";
			}
		};
		const state = getState();
		let error = "";
		if(this.data.pwdActive == "Y" && !oldPassword)
			error = "현재 비밀번호를 입력해 주세요.";
		if(!error && passwordYn == "Y") {
			if(!newPassword) error = "변경할 비밀번호를 입력해 주세요.";
			else if(newPassword.length < 6) error = "변경할 비밀번호를 6자리 이상 입력해 주세요.";
			else if(newPassword != newRePassword) error = "변경할 비밀번호가 서로 일치하지가 않습니다.";
		}
		if(error) {
			alert(error);
			return;
		}
		const data = {
			searchParamMap : {
				purpose : state,
				seqPartnerCoach : seqPartnerCoach,
				pwd : oldPassword
			},
			coach : {
				seqPartnerCoach : seqPartnerCoach,
				pwd : newPassword,
				pwdActive : passwordYn
			}
		};
		coachController.changePassword(JSON.stringify(data)).then(data => {
			if(data.resultCode == "1301") {
				alert("입력하신 비밀번호가 일치하지 않습니다.");
				return;
			} else {
				alert("변경되었습니다.");
				this.close();
			}
		}).catch(error => {
			console.log(error);
			alert("처리 중 오류가 발생하였습니다.");
		});
	},
	render : function() {
		const self = this.event.self = this;
		this.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					close : function() {self.close()},
					submit : function() {self.submit()}
				},
				change : {
					active : function() {self.event.changeActive()}
				}
			}
		});
		this.popup.putValue("passwordYn", this.data.pwdActive || "N");
		this.event.changeActive();
	},
	event : {
		changeActive : function() {
			const passwordYn = this.self.popup.getValue("passwordYn");
			const inputList = this.self.popup.querySelectorAll("input[type='password']");
			const isPassword = (passwordYn == "Y");
			const isActive = (this.self.data.pwdActive == "Y");
			inputList.forEach((item, index) => {
				if(!(index == 0 && isActive))
					item.disabled = !isPassword;
			});
		}
	},
	template : function() {
		const isActive = (this.data.pwdActive == "Y");
		const isHidden = (isActive) ? "" : "hidden";
		return `
			<style type="text/css">
				.popupChangePassword								{}
				.popupChangePassword .middle tr.hidden				{display:none}
				.popupChangePassword .middle li + li				{margin-top:10px}
				.popupChangePassword .middle input[type='password']	{width:100% !important; max-width:100% !important; text-align:left}
			</style>
			<div class="popupChangePassword tiny">
				<div class="top">
					<h2>
						강사 비밀번호 변경
						<a data-event="close"></a>
					</h2>
				</div>
				<div class="middle ui-form">
					<table>
						<tr>
							<th>비밀번호 설정</th>
							<td>
								<label class="ui-input-radio">
									<input name="passwordYn" type="radio" value="Y" data-event="active">
									<span></span>
									설정
								</label>
								<label class="ui-input-radio">
									<input name="passwordYn" type="radio" value="N" data-event="active">
									<span></span>
									미설정
								</label>
								<p class="ui-note red">
									비밀번호 미설정 시 다른 사용자가 해당 사용자로 접근 가능한 만큼 사용에 유의해 주세요.
								</p>
							</td>
						</tr>
						<tr class="${isHidden}">
							<th>현재 비밀번호</th>
							<td>
								<input name="oldPassword" type="password" maxLength="32" placeholder="현재 비밀번호 입력">
							</td>
						</tr>
						<tr>
							<th>변경할 비밀번호</th>
							<td>
								<ul>
									<li><input name="newPassword" type="password" maxLength="32" placeholder="변경할 비밀번호 입력 (최소 6자리 이상)"></li>
									<li><input name="newRePassword" type="password" maxLength="32" placeholder="변경할 비밀번호 재입력"></li>
								</ul>
							</td>
						</tr>
					</table>
				</div>
				<div class="bottom">
					<button class="ui-button gray" data-event="close">취소</button>
					<button class="ui-button" data-event="submit">변경</button>
				</div>
			</div>
		`;
	}
};
