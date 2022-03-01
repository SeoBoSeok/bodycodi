const componentCoach = {
	info : {
		container : undefined,
		data : {
			coachInfo : {},
			positionList : [],
			teamList : []
		},
		open : function(seqPartnerCoach) {
			this.container = document.querySelector("main");
			Promise.all([
				coachController.info(seqPartnerCoach),
				commonController.positionList(),
				commonController.teamList()
			]).then(([coachInfo, positionList, teamList]) => {
				this.data = {
					coachInfo : coachInfo || {},
					positionList : positionList || [],
					teamList : teamList || []
				};
				this.render();
			}).catch(error => {
				uiError(error);
			});
		},
		render : function() {
			const form = this.container;
			const data = this.data.coachInfo;

			const getPositionName = (seqPosition) => {
				const data = this.data.positionList.filter(item => {
					return (item.seqPosition == seqPosition);
				});
				return (data.length > 0) ? data[0].title : "-";
			};
			const getTeamName = (seqTeam) => {
				const data = this.data.teamList.filter(item => {
					return (item.seqTeam == seqTeam);
				});
				return (data.length > 0) ? data[0].title : "-";
			};
			const getWorkingPeriod = () => {
				const period = [];
				period.push((data.joinDate) ? data.joinDate : "미입력");
				period.push((data.retirementYn == "Y") ? (data.retirementDate) ? data.retirementDate : "미입력" : "재직 중");
				return period.join(" ~ ");

			};
			const getWorkingDuty = () => {
				const dutyList = [];
				if(data.salesYn == "Y") dutyList.push("결제와 세일즈");
				if(data.appointmentYn == "Y") dutyList.push("개인레슨");
				if(data.classYn == "Y") dutyList.push("그룹수업");
				return dutyList.join(", ") || "-";
			};
			form.putValue("seqPosition", getPositionName(data.seqPosition));
			if(data.teams && data.teams.length > 0)
				form.putValue("seqTeam", getTeamName(data.teams[0].seqTeam));
			form.putValue("workingPeriod", getWorkingPeriod());
			form.putValue("workingDuty", getWorkingDuty());
			form.putValue("retirementYn", ((data.retirementYn == "Y") ? "퇴사" : "재직 중"));


		},
	},
	update : {
		container : undefined,
		seqPartnerCoach : 0,
		mode : "create",
		data : {
			coachInfo : {},
			positionList : [],
			teamList : []
		},
		open : function(seqPartnerCoach) {
			this.container = document.querySelector("main form");
			this.seqPartnerCoach = seqPartnerCoach || 0;
			if(seqPartnerCoach) this.mode = "update";

			Promise.all([
				coachController.info(seqPartnerCoach),
				commonController.positionList(),
				commonController.teamList(),
				commonController.branch.list()
			]).then(([coachInfo, positionList, teamList, branchList]) => {
				this.data = {
					coachInfo : coachInfo || {},
					positionList : positionList || [],
					teamList : teamList || [],
					branchList : branchList || []
				};
				this.render();
			}).catch(error => {
				uiError(error);
			});
		},
		render : function() {
			const self = this.event.self = this;

			const setPositionList = () => {
				if(!this.data.positionList) return;
				const option = this.data.positionList.map(item => {
					return `<option value="${item.seqPosition}">${item.title}</option>`;
				});
				const select = this.container.querySelector("[name='seqPosition']");
				select.innerHTML += option.join("");
			};
			const setTeamList = () => {
				if(!this.data.teamList) return;
				const option = this.data.teamList.map(item => {
					return `<option value="${item.seqTeam}">${item.title}</option>`;
				});
				const select = this.container.querySelector("[name='seqTeam']");
				select.innerHTML += option.join("");
			};
			const setBranchList = () => {
				const isBranch = (partnerInfo.partner.branchUseYn == "Y");
				const seqPartnerBranch = partnerInfo.branch.id || 0;
				const option = this.data.branchList.map(item => {
					const selected = (item.seqPartnerBranch == seqPartnerBranch) ? "selected" : "";
					return `<option value="${item.seqPartnerBranch}" ${selected}>${item.partnerName}</option>`;
				});
				const select = this.container.querySelector("[name='seqPartnerBranch']");
				if(select) select.innerHTML += option.join("");
				if(isBranch) {
					const tr = document.querySelector("main [data-id='branch']");
					if(tr) tr.className = "";
					const div = this.container.querySelector("[data-msg='seqPartnerBranch']");
					if(div) div.innerHTML = (partnerInfo.branch.id === 0) ? "본사" : partnerInfo.branch.name || "-";
				}
			};
			setPositionList();
			setTeamList();
			setBranchList();

			if(this.mode == "update") this.prepare();

			uiEvent(this.container, {
				click : {
					submit : function() {
						self.event.submit(this);
					}
				},
				change : {
					profileImage : function() {
						self.event.changeProfileImage(this);
					},
					retirementYn : function() {
						self.event.changeRetirementYn();
					},
					preview : function() {
						self.event.changePreview();
					}
				},
				keyup : {
					coachName : function() {
						self.event.changePreview();
					},
					preview : function() {
						self.event.changePreview();
					}
				}
			});
		},
		prepare : function() {
			const form = this.container;
			const data = this.data.coachInfo;
			const putValues = (name, array) => {
				const node = form.querySelectorAll("[name='" + name + "']");
				array.forEach((item, index) => {
					if(node[index]) node[index].value = item;
				});
			};
			if(data.imgUrl) {
				document.getElementById("profileImage").src = data.imgUrl;
				form.putValue("imgUrl", data.imgUrl);
			}

			form.putValue("coachName", data.coachName);
			form.putValue("sex", data.sex || "F");
			putValues("mobileNo", (data.mobileNo) ? data.mobileNo.split("-") : []);
			form.putValue("email", data.email);
			putValues("birthday", (data.birthday) ? data.birthday.split(".") : []);
			form.putValue("profile", data.profile);
			form.putValue("bpayComment", data.bpayComment);
			form.putValue("breakTime", data.breakTime);

//			if(data.seqPartnerBranch != undefined)
			form.putValue("seqPartnerBranch", data.seqPartnerBranch);

			form.putValue("seqPosition", data.seqPosition);
			form.putValue("seqTeam", (data.teams.length > 0) ? data.teams[0].seqTeam : "");
			form.putValue("retirementYn", data.retirementYn);
			form.putValue("salesYn", data.salesYn);
			form.putValue("appointmentYn", data.appointmentYn);
			form.putValue("classYn", data.classYn);

			putValues("joinDate", (data.joinDate) ? data.joinDate.split(".") : []);
			putValues("retirementDate", (data.retirementDate) ? data.retirementDate.split(".") : []);

			this.event.changeRetirementYn();
			this.event.changePreview();
		},
		event : {
			changePreview : function() {
				const container = this.self.container;
				const div = container.querySelector("[data-id='preview']");

				const coachName = container.getValue("coachName").trim() || "바디코디";
				div.putValue("previewName", coachName);

				const coachThumbnail = container.getValue("imgUrl") || "/static/img/brand/symbol_gray.png";
				div.querySelector("[data-id='previewThumbnail']").src = coachThumbnail;

				const bpayComment = (container.getValue("bpayComment") || "").trim().replace(/\n/g, "<br>");
				const p = div.querySelector("[data-id='previewDescription']");
				p.className = `description ${(bpayComment) ? "" : "empty"}`;
				p.innerHTML = bpayComment || `안녕하세요! ${coachName} 강사입니다.`;
			},
			changeRetirementYn : function() {
				const inputYn = this.self.container.querySelector("[name='retirementYn']:checked");
				const inputDate = this.self.container.querySelector("[name='retirementDate']");
				if(!inputYn) return;
				inputDate.disabled = inputYn.value !== "Y";
			},
			checkData : function(data) {
				let error = "";
				for(let name in data) {
					const value = data[name];
					const isEmpty = (data[name] === "");
					switch (name) {
						case "coachName" : if(isEmpty) error = "이름을 입력해 주세요."; break;
						case "sex" : if(isEmpty) error = "성별을 선택해 주세요."; break;
						case "mobileNo" : if(!value.replace(/-/g, "")) error = "휴대폰 번호를 확인해 주세요."; break;
						case "email" : if(!isEmpty && !isMail(value)) error = "잘못된 이메일 주소입니다."; break;
//						case "birthday" : if(!isDate(value)) error = "생년월일을 확인해 주세요."; break;
						case "seqPosition" : if(isEmpty) error = "직급을 선택해 주세요."; break;
						case "seqPartnerBranch" : if(isEmpty) error = "지점을 선택해 주세요."; break;
						case "retirementDate" :
							if(data.joinDate && data.retirementDate) {
								if(getPeriod(data.joinDate, data.retirementDate) < 0) {
									error = "퇴사일을 입사일 보다 크게 설정해 주세요.";
									break;
								}
							}
					}
					if(error) {
						alert(error);
						this.self.container.querySelector("[name='" + name + "']").focus();
						return false;
					}
				}
				return true;
			},
			getFormData : function() {
				const form = this.self.container;
				const mobile = Array.from(form.querySelectorAll("[name='mobileNo']")).map(item => {
					return item.value;
				}).join("-");

				const birthday = Array.from(form.querySelectorAll("[name='birthday']")).map(item => {
					return item.value;
				}).join(".");

				const seqTeam = form.getValue("seqTeam");
				const retirementYn = form.getValue("retirementYn");
				const data = {
					seqPartner : partnerInfo.partner.id,
					seqPartnerCoach : this.seqPartnerCoach,
					employeeTypeCode : "04", //partnerInfo.employee.typeCode

					useYn : "Y",
					pwd : "",
					pwdActive : "N",
					schedulerDisplayOrder : 0,

					imgUrl : form.getValue("imgUrl"),
					coachName : form.getValue("coachName").trim(),
					sex : form.getValue("sex"),
					mobileNo : mobile,
					email : form.getValue("email"),
					birthday : birthday,
					profile : form.getValue("profile").trim(),
					bpayComment : form.getValue("bpayComment").trim(),
					breakTime : form.getValue("breakTime"),

					seqPartnerBranch : form.getValue("seqPartnerBranch", true) || 0,
					seqPosition : form.getValue("seqPosition", true),
					teams : (seqTeam) ? [{seqTeam : seqTeam}] : [],

					basePay : 0,
					personalCommissionRate : 0,
					personalCommissionExcludeVat : 0,
					teamCommissionRate : 0,
					teamCommissionExcludeVat : 0,

					appointmentBenefitType : "FLAT_SUM",
					appointmentBenefitFlatSum : 0,
					appointmentBenefitRate : 0,
					appointmentBenefitExcludeVat : 0,
					appointmentAbsenceBenefitType : "EQUAL",
					appointmentAbsenceBenefitRate : 0,

					classBenefitType : "RATE",
					classBenefitFlatSum : 0,
					classBenefitRate : 0,
					classBenefitExcludeVat : 0,
					classAbsenceBenefitType : "NONE",
					classAbsenceBenefitRate : 0,

					deductionType : "MANUAL",
					deductionRate : 0,

					retirementYn : retirementYn,
					joinDate : form.getValue("joinDate"),
					retirementDate : (retirementYn == "Y") ? form.getValue("retirementDate") : "",

					salesYn : form.getValue("salesYn"),
					appointmentYn : form.getValue("appointmentYn"),
					classYn : form.getValue("classYn")
				};
				return data;
			},
			submit : function(object) {
				const data = this.getFormData();
				if(!this.checkData(data)) return;

				const seqPartnerCoach = this.self.seqPartnerCoach;
				const mode = this.self.mode;

				if(mode == "create") {
					coachController.create(data).then(data => {
						alert("등록되었습니다.");
						window.location.href = "/coach";
					}).catch(error => {
						uiError(error);
					});
				} else {
					coachController.update(seqPartnerCoach, data).then(data => {
						alert("수정되었습니다.");
						if(document.referrer) {
							window.location.href = document.referrer;
						} else {
							window.location.href = "/coach/view?cn=" + seqPartnerCoach;
						}
					}).catch(error => {
						uiError(error);
					});
				}
			},
			changeProfileImage : function(object) {
				const value = object.value;
				if(!value) return;
				const img = document.getElementById("profileImage");
				const input = this.self.container.querySelector("[name='imgUrl']");
				const span = object.parentNode.querySelector("span");
				const fileName = value.substr(value.lastIndexOf("\\") + 1);
				const file = object.files[0];
				const formData = new FormData();
				formData.append(file.name, file);
				coachController.profileUpload(formData).then(data => {
					img.src = input.value = data.resultObject.uploadResult;
					span.innerHTML = fileName;
					this.changePreview();
				}).catch(error => {
					console.log(error);
				});
			}
		}
	}
};