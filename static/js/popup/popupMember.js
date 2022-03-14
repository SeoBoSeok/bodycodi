/* ******** 회원 등록 ******** */
function daumAddress(zipCode, address) {
	new daum.Postcode({
		shorthand : false,
		oncomplete : function(data) {
			var fullRoadAddr = data.roadAddress;
			var extraRoadAddr = "";
			if(data.bname != "" && /[동|로|가]$/g.test(data.bname))
				extraRoadAddr += data.bname;
			if(data.buildingName != "" && data.apartment == "Y")
				extraRoadAddr += (extraRoadAddr != "") ? ", " + data.buildingName : data.buildingName;
			if(extraRoadAddr != "")
				extraRoadAddr = " (" + extraRoadAddr + ")";
			if(fullRoadAddr != "")
				fullRoadAddr += extraRoadAddr;
			zipCode.value = data.zonecode;
			address.value = fullRoadAddr;
		}
	}).open();
};



/* ******** 회원 등록 ******** */
const popupRegisterMember = {
	popup : undefined,
	barcode : undefined,
	seqMember : 0,
	isMobile : false,
	isBarcode : false,
	isMemberNo : false,
	isRefresh : false,
	isBranch : false,
	preset : {},
	callback : undefined,
	data : {},

	open : function(seqMember, preset, isRefresh, callback) {
		if(this.popup) return;
		this.template.self = this;

		Promise.all([
			memberController.createForm(),
			commonController.branch.list()
		]).then(([formData, branchList]) => {
			formData.branchList = branchList || [];
			this.template.data = formData;
			this.template.mode = (seqMember) ? "update" : "create";
			this.preset = preset || {};
			this.isRefresh = isRefresh || false;
			this.isBranch = this.template.isBranch = (partnerInfo && partnerInfo.partner.branchUseYn == "Y");
			this.callback = callback;
			this.render();
			popupSearchMember.init(this.popup);

			if(seqMember) {
				this.seqMember = seqMember;
				memberController.getMember(seqMember).then(data => {
					if(data.resultCode == "1102" || data.resultCode == "1103") {
						alert("회원 정보를 찾을 수 없습니다.");
						return;
					}
					this.data = (data.data) ? data.data.member || {} : {};
					this.setMobile(true);
					this.setMemberNo(true);
					if(this.data.entrance_barcode || this.data.barcode)
						this.setBarcode(true);
					this.putForm(this.data);
				}).catch(error => {
					console.log(error);
				});
			} else {
				this.seqMember = 0;
			}
		}).catch(error => {
			uiError(error);
		});
	},

	close : function() {
		this.popup = undefined;
		uiPopup();
	},

	putForm : function(data) {
		// 프로필 이미지
		const profileImage = data.img_url;
		if(profileImage) {
			this.popup.querySelector("#profileImage").src = profileImage;
			this.popup.putValue("imgUrl", profileImage);
		}

		// 이름과 성별
		this.popup.putValue("name", data.name);
		this.popup.putValue("sex", data.sex);

		// 휴대폰 번호 및 문자 수신 동의 여부
		const mobile = data.mobile.split("-");
		this.popup.putValue("mobile", data.mobile);
		mobile.forEach((item, index) => {
			const input = this.popup.querySelector("[name='mobile" + (index + 1) + "']");
			if(input) input.value = mobile[index];
		});
		this.popup.putValue("sms", data.sms_agree_yn);

		// 회원 번호, 바코드 번호, 유입 상태
		const memberNo = this.popup.querySelector("[name='memberNo']");
		if(memberNo) {
			memberNo.value = data.membership_no;
			memberNo.setAttribute("data-value", data.membership_no);
		}
		const barcode = this.popup.querySelector("[name='barcode']");
		if(barcode) {
			barcode.value = data.entrance_barcode;
			barcode.setAttribute("data-value", data.entrance_barcode);
			this.popup.putValue("fixBarcode", data.fix_barcode);
		}
		if(data.inbound_state) {
			const input = this.popup.querySelector("[name='inboundState'][value='" + data.inbound_state + "']");
			if(input) input.checked = true;
		}

		// 지점 정보
		this.popup.putValue("seqPartnerBranch", data.seq_partner_branch || 0);

		// 가입날짜
		const registerDate = moment(data.reg_dt).format("YYYY-MM-DD").split("-");
		registerDate.forEach((item, index) => {
			const input = this.popup.querySelectorAll("[name='registerDate']")[index];
			if(input) input.value = Number(registerDate[index]);
		});

		// 관리 담당자, 유입 경로
		this.popup.putValue("seqPartnerCoach", data.seq_partner_coach);
		this.popup.putValue("inboundPathAttr", data.inbound_path_attr);

		// 추천회원
		this.popup.putValue("searchMemberName", data.recommend_member_name);
		this.popup.putValue("searchMemberId", data.recommend_member);

		// 생년월일 및 나이
		const birthday = getCalendar(new Date(data.birthday)).split("-");
		birthday.forEach((item, index) => {
			const input = this.popup.querySelectorAll("[name='birthday']")[index];
			if(input) input.value = Number(birthday[index]);
		});
		let age = new Date().getFullYear() - Number(birthday[0]);
		if(age < 0) age = 0;
		this.popup.putValue("age", age);

		// 주소, 이메일, 메모
		this.popup.putValue("zipCode", data.zip_code);
		this.popup.putValue("address", data.address);
		this.popup.putValue("addressDetail", data.address_detail);
		this.popup.putValue("email", data.member_id);
		this.popup.putValue("memo", data.memo);
	},

	getForm : function() {
		const self = popupRegisterMember;
		const getDate = function(name) {
			let value = [];
			let isEmpty = false;
			self.popup.querySelectorAll("[name='" + name + "']").forEach((item, index) => {
				if(item.value)
					value.push((index > 0) ? item.value.zf(2) : item.value);
				else if(index < 1)
					isEmpty = true;
				else value.push(1);
			});
			return (isEmpty) ? "" : value.join("-");
		};

		const byName = function(name) {
			const node = self.popup.querySelector("[name='" + name + "']");
			return (node) ? node.value : "";
		};

		let birthday = getDate("birthday");
		birthday = getCalendar((birthday) ? new Date(birthday) : new Date());
		let registerDate = getDate("registerDate");

		if(registerDate) registerDate = getCalendar(new Date(registerDate));
		registerDate = (registerDate) ? moment(registerDate).toISOString(true) : moment().toISOString(true);



		const data = {
			member : {
				// 필수사항
				mb_name			: byName("mb_name"),
				sex				: this.popup.querySelector("[name='sex']:checked").value,
				mobile			: byName("mobile"),
				smsAgreeYn		: (this.popup.querySelector("[name='sms']:checked")) ? "Y" : "N",
				membershipNo	: byName("memberNo"),
				inboundState	: this.popup.querySelector("[name='inboundState']:checked").value,
				seqPartnerBranch: Number(byName("seqPartnerBranch")),

				// 선택사항
				regDt			: registerDate,
				imgUrl			: byName("imgUrl"),
				seqPartnerCoach	: byName("seqPartnerCoach"),
				inboundPathAttr : byName("inboundPathAttr"),
				recommendMember : byName("searchMemberId"),
				birthday		: birthday,
				zipCode			: byName("zipCode"),
				address			: byName("address"),
				addressDetail	: byName("addressDetail"),
				memberId		: byName("email"),
				memo			: byName("memo"),
				entranceBarcode	: byName("barcode"),
				fixBarcode		: this.popup.querySelector("[name='fixBarcode']:checked").value
			}
		};

		if(this.seqMember) {
			data.member.seqMember = this.seqMember;
//			delete data.member.entranceBarcode;
		}
		return data;
	},

	check : function(data) {
		data = data.member;
//		console.log(data);

		let error = "";
		const checkList = ["mb_name", "mobile", "membershipNo", "barcode", "entranceBarcode", "memberId"];
		for(let item of checkList) {
			const value = data[item];
			const isEmpty = (value) ? false : true;
			switch(item) {
				case "name"			: if(isEmpty) error = "이름을 입력해 주세요."; break;
				// case "mobile"		: if(isEmpty || !this.isMobile) error = "휴대폰 번호를 확인해 주세요."; break;
				// case "membershipNo"	: if(isEmpty || !this.isMemberNo) error = "회원 번호를 입력해 주세요."; break;
				case "entranceBarcode" :
				// case "barcode" 		: if(!isEmpty && !this.isBarcode) error = "바코드 번호를 확인해 주세요."; break;
				// case "memberId"		: if(!isEmpty && !isMail(value)) error = "올바르지 않은 이메일 주소입니다."; break;
			}
			if(error) {
				alert(error);
				return false;
			}
		}
		return true;
	},

	create : function(isSale) {
		const data = this.getForm();
		if(!this.check(data)) return;

		let error = "";
		memberController.create(data).then(data => {
			// switch(data.resultCode) {
			// 	case "1101" : error = "회원번호가 다른 회원과 중복되어 수정할 수 없습니다.\n지점 통합 시스템을 이용하는 경우, 전지점 기준 동일한 회원번호는 1개만 배정 가능합니다."; break;
			// 	case "1102" : error = "휴대폰 번호가 중복되어 사용할 수 없습니다."; break;
			// 	case "1104" : error = "바코드 번호가 중복되어 사용할 수 없습니다."; break;
			// }
			if(error)
				console.log(`uiError(error)`),
				uiError(error)
			else {
				console.log(`회원 등록`);
				// const seqMember = data.data.member.seqMember;
				// const seqMemberProspective = this.preset.seqMemberProspective;
				alert("등록되었습니다.");
				window.location.reload();
				// completeStep();
				// const completeStep = () => {
				// 	if(this.callback) this.callback();
				// 	if(isSale) {
				// 		window.location.href = "/member/" + seqMember + "/sell/pass";
				// 		return;
				// 	}
				// 	popupRegisterMember.close();
				// 	if(this.isRefresh)
				// 		window.location.reload(true);
				// };
				// if(seqMemberProspective) {
				// 	memberController.updateMemberProspective(seqMember, seqMemberProspective).then(data => {
				// 		alert("등록되었습니다.");
				// 		completeStep();
				// 	});
				// } else {
				// 	memberController.insertMemberProspective(seqMember).then(data => {
				// 		alert("등록되었습니다.");
				// 		completeStep();
				// 	});
				// }
			}
		}).catch(error => {
			uiError(error)
		});
	},

	update : function() {
		const data = this.getForm();
		if(!this.check(data)) return;

		let error = "";
		memberController.update(data).then(data => {
			switch(data.resultCode) {
				case "1101" : error = "회원번호가 다른 회원과 중복되어 수정할 수 없습니다.\n지점 통합 시스템을 이용하는 경우, 전지점 기준 동일한 회원번호는 1개만 배정 가능합니다."; break;
				case "1102" : error = "휴대폰 번호가 중복되어 사용할 수 없습니다."; break;
			}
			if(error)
				uiError(error)
			else {
				alert("수정되었습니다.");
				if(this.callback) this.callback();
				if(this.isRefresh != false)
					window.location.reload();
			}
			this.close();
		}).catch(error => {
			uiError(error)
		});
	},

	render : function(data) {
		const template = this.template.setTemplate(data);
		const self = popupRegisterMember;

		const popup = this.popup = self.event.popup = uiPopup({
			template : template,
			event : {
				"click" : {
					"create" : function() {
						self.create(false);
					},
					"createAndSale" : function() {
						self.create(true);
					},
					"update" : function() {
						self.update();
					},
					"close" : function() {
						self.close();
					},
					"tab" : function() {
						self.event.changeTab(this);
					},
					"searchAddress" : function() {
						self.event.searchAddress(this);
					},
					"camera" : function() {
						popupCamera.open(function(data) {
							self.popup.querySelector("#profileImage").src = data.imgUrl;
							self.popup.querySelector("[name='imgUrl']").value = data.imgUrl;
						});
					}
				},
				"change" : {
					"profileImage" : function() {
						self.event.uploadProfileImage(this);
					},
					"computeAge" : function() {
						self.event.computeAge(this);
					},
					"sex" : function() {
						self.event.defaultProfileImage(this);
					}
				},
				"blur" : {
					"checkMobile" : function() {
						self.event.checkMobile(this);
					},
					"checkBarcode" : function() {
						self.event.checkBarcode(this);
					},
					"checkMemberNo" : function() {
						self.event.checkMemberNo(this);
					}
				}
			}
		});
		this.barcode = this.popup.querySelector("[name='barcode']");

		if(this.preset) {
			popup.putValue("name", this.preset.name);
			if(this.preset.mobile) {
				const mobile = this.preset.mobile.split("-");
				const input = this.popup.querySelector("[name='mobile']");
				input.value = this.preset.mobile;
				mobile.forEach((item, index) => {
					this.popup.querySelector("[name='mobile" + (index + 1) + "']").value = mobile[index];
				});
				this.event.checkMobile(input);
			}
			if(this.preset.birthday) {
				const birthday = this.preset.birthday.split("-");
				const input = this.popup.querySelectorAll("[name='birthday']");
				input.forEach((item, index) => {
					item.value = Number(birthday[index]);
				});
				this.event.computeAge(input[0]);
			}

			popup.putValue("seqPartnerCoach", this.preset.seqPartnerCoach);
			popup.putValue("inboundPathAttr", this.preset.inboundPathAttr);
			popup.putValue("sex", this.preset.sex);
			popup.putValue("address", this.preset.address);
			popup.putValue("email", this.preset.email);
		}

		uiInput(this.popup);

		if(this.template.mode == "create") {
			const input = this.popup.querySelector("[name='seqPartnerBranch']");
			if(input) input.disabled = true;
		}

		this.popup.querySelectorAll("input").forEach(item => {
			item.autocomplete = "off";
		});

		if(window.location.protocol.indexOf("https") > -1) {
			this.setCamera().then(isCamera => {
				this.template.isCamera = isCamera;
				if(isCamera)
					this.popup.querySelector("[data-event='camera']").classList.add("focus");
			}).catch(error => {
				uiError(error);
			});
		}
	},

	setCamera : function() {
		return new Promise(function(resolve, reject) {
			navigator.mediaDevices.getUserMedia({
				video : true
			}).then(function(stream) {
				stream.getVideoTracks().forEach(function(track) {
					track.stop();
				});
				resolve(true);
			}).catch(function(error) {
				resolve(false);
			});
		});
	},

	setMobile : function(result) {
		const node = this.popup.querySelector("[data-msg='mobile']");
		node.classList.remove("focus");
		this.isMobile = (result) ? true : false;
		if(result == undefined) return;
		if(result == false)
			node.classList.add("focus");
	},

	setBarcode : function(result) {
		const node = this.popup.querySelector("[data-msg='barcode']");
		node.classList.remove("focus");
		this.isBarcode = (result) ? true : false;
		if(result == undefined) return;
		if(result == false)
			node.classList.add("focus");
	},

	setMemberNo : function(result, index) {
		const nodeList = this.popup.querySelectorAll("[data-msg='memberNo']");
		nodeList.forEach(item => {
			item.classList.remove("focus");
		});
		this.isMemberNo = (result) ? true : false;
		if(result == undefined) return;
		if(result == false)
			nodeList[index].classList.add("focus");
	},

	event : {
		changeTab : function(object) {
			const popup = popupRegisterMember.popup;
			const ul = object.parentNode.parentNode;
			const a = ul.querySelectorAll("a");
			const div = popup.querySelectorAll(".ui-tab-1, .ui-tab-2");
			a.forEach(function(item, index) {
				item.parentNode.className = (item == object) ? "focus" : "";
				div[index].classList.remove("focus");
				if(item == object) div[index].classList.add("focus");
			});
		},

		uploadProfileImage : function(object) {
			const value = object.value;
			if(!value) return;
			let form = document.getElementById("profileImageForm");
			const img = document.getElementById("profileImage");
			const input = this.popup.querySelector("[name=imgUrl]");

			const image = new Image();
			image.onload = function(data) {
				if(image.width < 400 && !confirm("이미지의 가로 사이즈가 400픽셀 이하인 경우 제대로 표시되지 않을 수 있습니다. 계속하시겠습니까?")) return;
				const span = object.parentNode.querySelector("span");
				const fileName = value.substr(value.lastIndexOf("\\") + 1);
				form = new FormData(form);
				commonController.imageUpload(form).then(data => {
					img.src = input.value = data.imgUrl;
					span.innerHTML = fileName;
				}).catch(error => {
					console.log(error);
				});
			};
			image.src = URL.createObjectURL(object.files[0]);
		},

		defaultProfileImage : function(object) {
			const input = this.popup.querySelector("[name=imgUrl]");
			if(input.value) return;
			const img = document.getElementById("profileImage");
			const fileName = (object.value == "M") ? "male" : "female";
			const source = "/static/img/login/" + fileName + ".jpg";
			img.src = source;
		},

		searchAddress : function(object) {
			object = object.parentNode.parentNode;
			const zipCode = object.querySelector("[name='zipCode']");
			const address = object.querySelector("[name='address']");
			daumAddress(zipCode, address);
		},

		getDate : function(date) {
			if(!date)
				date = new Date();
			else if(typeof date == "string")
				date = new Date(date);
			return new Date(date.getFullYear(), date.getMonth(), date.getDate());
		},

		getAge : function(birthday) {
			birthday = this.getDate(birthday);
			const today = new Date();
			const isPass = (Number((today.getMonth() + 1) + "" + today.getDate().zf(2)) < Number((birthday.getMonth() + 1) + "" + birthday.getDate().zf(2)));
			const age = today.getFullYear() - birthday.getFullYear() - ((isPass) ? 1 : 0);
			return (age < 0) ? 0 : age;
		},

		getBirthday : function() {
			const inputList = this.popup.querySelectorAll("[name='birthday']");
			const array = [];
			let error = false;
			inputList.forEach((item, index) => {
				let value = item.value.trim();
				if(value) {
					if(index > 0) value = value.zf(2);
				} else {
					if(index > 0) value = "01";
					else error = true;
				}
				array.push(value);
			});
			return (!error) ? array.join("-") : "";
		},

		computeAge : function(object) {
			const name = object.name;
			const input = this.popup.querySelectorAll("[name='birthday']");
			const value = object.value.trim();
			const today = new Date();
			if(name == "age") {
				let year = today.getFullYear();
				const month = (input[1].value) ? input[1].value : 1;
				const day = (input[2].value) ? input[2].value : 1;
				year = (value) ? year - Number(value) : year;
				const isPass = (Number((today.getMonth() + 1) + "" + today.getDate().zf(2)) > Number(month.zf(2) + "" + day.zf(2)));
				if(!isPass) year--;
				input[0].value = (value) ? year : "";
				input[1].value = (value) ? month : "";
				input[2].value = (value) ? day : "";
			} else {
				const birthday = this.getBirthday();
				let year = input[0].value;
				let age = "";
				if(year) {
					year = (year) ? Number(year) : today.getFullYear();
					const date = (birthday) ? new Date(birthday) : new Date(year, 0, 1);
					age = this.getAge(birthday);
				}
				this.popup.querySelector("[name='age']").value = age;
			}
		},

		checkMobile : function(object) {
			const self = popupRegisterMember;
			const mobile1 = this.popup.querySelector("[name='mobile1']").value.trim();
			const mobile2 = this.popup.querySelector("[name='mobile2']").value.trim();
			const mobile3 = this.popup.querySelector("[name='mobile3']").value.trim();
			const mobile = mobile1 + "-" + mobile2 + "-" + mobile3;
			if(mobile1 == "" || mobile2 == "" || mobile3 == "") return;

			// update
			if(self.seqMember) {
				if(mobile == self.data.mobile) {
					this.popup.querySelector("[name='mobile']").value = self.data.mobile;
					this.popup.querySelector("[name='memberNo']").value = self.data.membership_no;
					self.setMemberNo(true);
					self.setMobile(true);
					return;
				}
			}

			const data = {
				member : {
					seqMember : "",
					mobile : mobile
				}
			};

			memberController.checkMobile(data).then(data => {
				const td = object.parentNode.parentNode;
				const isPossible = (data.resultCode == "1102") ? false : true;
//				const seqMember = this.popup.querySelector("[name='seqMember']");

				self.setMobile();
				this.popup.querySelector("[name='mobile']").value = "";
				this.popup.querySelector("[name='memberNo']").value = "";

				if(data.resultCode == "1102") {
					self.setMobile(false);
				} else {
					const data = {
						member : {
							seqMember : "",
							membershipNo : mobile3
						}
					};
					memberController.generateMemberNo(data).then(data => {
						self.setMemberNo(true);
						self.setMobile(true);
						this.popup.querySelector("[name='mobile']").value = mobile;
						this.popup.querySelector("[name='memberNo']").value = data.member.membershipNo;
					});
				}
			}).catch(error => {
				uiError(error);
			});
		},

		checkBarcode : function(object) {
			const self = popupRegisterMember;
			const newValue = object.value = object.value.trim();
			const oldValue = object.getAttribute("data-value");
			if(!newValue || newValue == oldValue) return;
			self.setBarcode();
			const data = {
				member : {
					entranceBarcode : newValue
				}
			};
			memberController.checkBarcode(data).then(data => {
				if(data.resultCode == "1104") {
					self.setBarcode(false);
				} else if(data.resultCode == "000") {
					self.setBarcode(true);
				}
			});
		},

		checkMemberNo : function(object) {
			const self = popupRegisterMember;
			const newValue = object.value = object.value.trim();
			const oldValue = object.getAttribute("data-value");
			if(!newValue) return;
			if(newValue == oldValue) {
				self.setMemberNo(true);
				return;
			}

			self.setMemberNo();
			if(newValue.length < 4) {
				self.setMemberNo(false, 1);
				return;
			}

			const data = {
				member : {
					seqMember : "",
					membershipNo : newValue
				}
			};
			memberController.checkMemberNo(data).then(data => {
				if(data.resultCode == "1101") {
					self.setMemberNo(false, 0);
				} else if(data.resultCode == "000") {
					self.setMemberNo(true);
				}
			});
		}
	},

	template : {
		mode : undefined,
		isCamera : false,

		setTemplate : function() {
			const getBranchInfo = () => {
				if(partnerInfo.partner.branchUseYn != "Y") return "";
				const seqPartnerBranch = partnerInfo.branch.id;
				return `<input name="seqPartnerBranch" type="hidden" value="${seqPartnerBranch}">`;
			};
			return  `
				<div class="popupRegisterMember">
					<div class="top">
						<h2>
							${this.setTitle()}
							<a data-event="close"></a>
						</h2>
					</div>

					<div class="middle">
						<div class="ui-tab">
							<ul>
								<li class="focus"><a data-event="tab">기본 정보</a></li>
								<li><a data-event="tab">세부 정보</a></li>
							</ul>
						</div>

						<div class="ui-tab-1 focus">
							<table>
							<!--<tr class="thumbnail">
									<th>
										<div>
											<img id="profileImage" src="/static/img/login/male.jpg" />
										</div>
									</th>
									<td>
										<input type="hidden" name="seqMember" />
										<input type="hidden" name="imgUrl" />

										<form id="profileImageForm" method="post" enctype="multipart/form-data" onsubmit="return false">
											<input type="hidden" name="imgPathVariable" value="member" />
											<input type="hidden" name="imgWidth" value="400" />
											<label class="ui-input-file">
												<span>첨부된 파일이 없습니다.</span>
												<button class="ui-button" type="button">파일 찾기</button>
												<input name="profileImage" type="file" data-event="profileImage">
											</label>
											<button class="ui-button" type="button" data-event="camera">촬영하기</button>
											<p class="note">정면, 상반신 사진을 등록해 주세요.</p>
										</form>
									</td>
								</tr>-->
								<tr class="name">
									<th>이름</th>
									<td>
										<input name="mb_name" type="text" placeholder="이름" maxlength="30" tabIndex>
										<label class="ui-input-radio">
											<input name="sex" type="radio" value="M" data-event="sex" checked>
											<span></span>
											남성
										</label>
										<label class="ui-input-radio">
											<input name="sex" type="radio" value="F" data-event="sex">
											<span></span>
											여성
										</label>
									</td>
								</tr>
								<tr class="mobile">
									<th>휴대폰 번호</th>
									<td>
										<div>
											<input name="mobile1" type="number" placeholder="" maxlength="3" data-event="checkMobile" tabIndex>
											<span>-</span>
											<input name="mobile2" type="number" placeholder="" maxlength="4" data-event="checkMobile" tabIndex>
											<span>-</span>
											<input name="mobile3" type="number" placeholder="" maxlength="4" data-event="checkMobile" tabIndex>

											<input name="mobile" type="hidden">
											<p class="error" data-msg="mobile">등록된 휴대폰 번호입니다.</p>
										</div>
										<label class="ui-input-checkbox">
											<input name="sms" type="checkbox" checked>
											<span></span>
											SMS 수신에 동의합니다.
										</label>
										<p class="note">
											회원의 휴대폰 번호는 회원용 APP과 연동되는 중요한 정보입니다.<br>
											반드시 실제 사용하는 휴대폰 번호를 입력해 주세요.
										</p>
									</td>
								</tr>
								<tr>
									<th>회원 번호</th>
									<td>
										<input name="memberNo" type="number" placeholder="회원 번호" data-value="" data-event="checkMemberNo" tabIndex>
										<p class="error" data-msg="memberNo">등록된 회원 번호입니다.</p>
										<p class="error" data-msg="memberNo">회원 번호를 4자리 이상으로 입력해 주세요.</p>
									</td>
								</tr>
								<tr class="barcode">
									<th>바코드 번호<span>(선택)</span></th>
									<td>
										<input name="barcode" type="number" placeholder="바코드 번호" data-value="" data-event="checkBarcode" tabIndex>
										<label class="ui-input-radio">
											<input name="fixBarcode" type="radio" value="true" checked>
											<span></span>
											고정
										</label>
										<label class="ui-input-radio">
											<input name="fixBarcode" type="radio" value="false">
											<span></span>
											자동변경
										</label>
										<p class="error" data-msg="barcode">등록된 바코드 번호입니다.</p>
									</td>
								</tr>
								${this.getBranchInfo()}
								<tr>
									<th>유입 상태</th>
									<td>
										<label class="ui-input-radio">
											<input name="inboundState" type="radio" value="TEL">
											<span></span>
											전화
										</label>
										<label class="ui-input-radio">
											<input name="inboundState" type="radio" value="VISIT" checked>
											<span></span>
											방문
										</label>
										<label class="ui-input-radio">
											<input name="inboundState" type="radio" value="ONLINE">
											<span></span>
											온라인
										</label>
										<label class="ui-input-radio">
											<input name="inboundState" type="radio" value="RECOMMEND">
											<span></span>
											지인추천
										</label>
									</td>
								</tr>
							</table>
						</div>
						<div class="ui-tab-2">
							<table>
								<tr class="date">
									<th>회원 등록일</th>
									<td>
										<input name="registerDate" type="number" maxlength="4" placeholder="년도">
										<span>년</span>
										<input name="registerDate" type="number" maxlength="2" placeholder="월">
										<span>월</span>
										<input name="registerDate" type="number" maxlength="2" placeholder="일">
										<span>일</span>
									</td>
								</tr>
								<tr>
									<th>관리 담당자</th>
									<td>
										<select class="ui-select" name="seqPartnerCoach">
											<option value="">관리 담당자 선택</option>
											${this.setCoachList()}
										</select>
									</td>
								</tr>
								<tr>
									<th>유입 경로</th>
									<td>
										<select class="ui-select" name="inboundPathAttr">
											<option value="">유입 경로 선택</option>
											${this.setInboundPathList()}
										</select>
									</td>
								</tr>
								<tr class="recommend">
									<th>추천회원</th>
									<td>
										<label class="ui-input-search">
											<input name="searchMemberName" type="text" placeholder="이름 또는 휴대폰 번호" data-event="searchMember">
											<input name="searchMemberId" type="hidden">
											${getBranchInfo()}
											<button class="ui-button" data-event="searchMember">회원 검색</button>
											<div class="popupSearchMember"></div>
										</label>
									</td>
								</tr>
								<tr class="date">
									<th>생년월일</th>
									<td>
										<input name="birthday" type="number" maxlength="4" placeholder="년도" data-event="computeAge">
										<span>년</span>
										<input name="birthday" type="number" maxlength="2" placeholder="월" data-event="computeAge">
										<span>월</span>
										<input name="birthday" type="number" maxlength="2" placeholder="일" data-event="computeAge">
										<span>일</span>

										<span>만</span>
										<input name="age" type="number" maxlength="3" placeholder="나이" data-event="computeAge">
										<span>세</span>
									</td>
								</tr>
								<tr class="address">
									<th>주소</th>
									<td>
										<label class="ui-input-search">
											<input name="zipCode" type="number" placeholder="우편번호">
											<button class="ui-button" data-event="searchAddress">주소 검색</button>
										</label>
										<dl>
											<dt><input class="block" name="address" type="text" placeholder="검색 버튼을 클릭해 주세요."></dt>
											<dd><input class="block" name="addressDetail" type="text" placeholder="상세주소를 입력해 주세요."></dd>
										</dl>
									</td>
								</tr>
								<tr class="email">
									<th>이메일 주소</th>
									<td>
										<input class="block" name="email" type="text" placeholder="이메일 주소">
									</td>
								</tr>
								<tr class="memo">
									<th>메모</th>
									<td>
										<textarea class="block" name="memo" type="text" placeholder="메모 입력"></textarea>
									</td>
								</tr>
							</table>
						</div>
					</div>

					<div class="bottom">
						<button class="ui-button gray" data-event="close">취소</button>
						${this.setButton()}
					</div>
				</div>
			`;
		},

		setTitle : function() {
			return (this.mode == "update") ? "회원수정" : "회원등록";
		},

		setButton : function() {
			if(this.mode == "update") {
				return `<button class="ui-button green" data-event="update">수정</button>`;
			} else {
				return `
					<button class="ui-button green" data-event="createAndSale">등록 후 상품판매</button>
					<button class="ui-button blue" data-event="create">등록</button>
				`;
			}
		},

		setCoachList : function() {
			const dataList = this.data.coachList || [];
			const optionList = dataList.map(item => {
				return `<option value="${item.seq_partner_coach}">${item.coach_name}</option>`;
			});
			return optionList.join("");
		},

		setInboundPathList : function() {
			const dataList = this.data.inboundPathList || [];
			const optionList = dataList.map(item => {
				return `<option value="${item.seq_attr_value}">${item.attr_value}</option>`;
			});
			return optionList.join("");
		},

		setBranchList : function() {
			const seqPartnerBranch = (partnerInfo) ? partnerInfo.branch.id : 0;
			const dataList = this.data.branchList;
			const optionList = dataList.map(item => {
				const selected = (item.seqPartnerBranch == seqPartnerBranch) ? "selected" : "";
				return `<option value="${item.seqPartnerBranch}" ${selected}>${item.partnerName}</option>`;
			});
			return optionList.join("");
		},

		getBranchInfo : function() {
			const getNote = () => {
				if(this.mode == "create") return "";
				return `
					<p class="ui-note">
						등록지점을 변경하는 경우 개인레슨 이용권의 담당강사를<br>변경된 지점 강사로 변경하셔야 합니다.
					</p>
				`;
			};
			return (this.isBranch) ? `
				<tr>
					<th>지점선택</th>
					<td>
						<select class="ui-select" name="seqPartnerBranch">
							<option value="">지점선택</option>
							${this.setBranchList()}
						</select>
						${getNote()}
					</td>
				</tr>
			` : ``;
		}
	}
};



/* ******** 회원 검색 ******** */
const popupSearchMember = {
	isBranch : false,
	callback : [],
	render : function(data) {
		let dataList = data.memberList || [];
		const getBranchName = (seqPartnerBranch) => {
			if(typeof componentMember == "undefined") return "-";
			try {
				return componentMember.getBranchName({seqPartnerBranch : seqPartnerBranch}) || "-";
			} catch(error) {
				return "-";
			}
		};
		dataList = dataList.map(item => {
			const seqPartnerBranch = item.seq_partner_branch;
			const branchName = item.branch_name || getBranchName(seqPartnerBranch) || "-";
			const displayYn = (this.isBranch) ? "" : "hidden";
			return `
				<li>
					<label class="ui-input-radio">
						<input name="searchMemberList" type="radio" value="${item.seq_member}" data-name="${item.name}"><span></span>
						<dl>
							<dt class="branchDisplay ${displayYn}">${branchName}</dt>
							<dd>${item.name}</dd>
							<dd>${item.sex == "M" ? "남" : "여"}</dd>
							<dd> ${item.mobile}</dd>
						</dl>
					</label>
				</li>
			`;
		});
		if(dataList.length == 0)
			dataList = `
				<li>
					<label class="ui-input-radio">
						<input name="searchMemberList" type="radio" value="" data-name=""><span></span>
						검색 결과가 없습니다.
					</label>
				</li>
			`;
		else dataList = dataList.join("");
		return "<ul>" + dataList + "</ul>";
	},

	init : function(object, callback, isBranch) {
		const input = object.querySelector("input[data-event='searchMember']");
		const button = object.querySelector("button[data-event='searchMember']");
		if(callback)
			this.callback.push([input, callback]);
		this.isBranch = (isBranch);

		input.addEventListener("focus", function(event) {
			popupSearchMember.close();
		});
		input.addEventListener("keydown", function(event) {
			event = event || window.event;
			if(event.keyCode == 13)
				popupSearchMember.open(this);
		});
		button.addEventListener("click", function(event) {
			popupSearchMember.open(this);
		});
	},

	open : function(object) {
		object = object.parentNode;
		const searchMemberName = object.querySelector("input[type=text], input[type=search]");
		const searchMemberId = object.querySelector("input[type=hidden]");
		const searchBranch = object.parentNode.querySelector("[name='seqPartnerBranch']");
		const seqPartnerBranch = (searchBranch && searchBranch.value) ? Number(searchBranch.value) : -1;
		if(!searchMemberName.value) return;

		event = event || window.event;
		event.stopPropagation();

		const div = this.popup = object.querySelector("div");
//		const data = {member : {name : searchMemberName.value}};
		const data = {
			searchWord : searchMemberName.value
		};
		if(seqPartnerBranch > -1)
			data.seqPartnerBranch = seqPartnerBranch;

		memberController.searchByNameOrMobile(data).then(data => {
			div.innerHTML = this.render(data);
			const nodeList = div.querySelectorAll("input");
			nodeList.forEach(item => {
				item.addEventListener("change", function(){
					const seqMember = item.value;
					searchMemberName.value = this.getAttribute("data-name");
					searchMemberId.value = seqMember;
					popupSearchMember.callback.forEach(item => {
						if(item[0] == searchMemberName && item[1]) {
							const info = data.memberList.filter(item => {
								return (item.seq_member == seqMember);
							})[0];
							item[1](seqMember, info);
						}
					});
				});
			});
			div.classList.add("focus");
			window.addEventListener("click", function() {
				popupSearchMember.close();
			}, {once : true});
		});
	},

	close : function() {
		if(this.popup)
			this.popup.classList.remove("focus");
	}
};



/* ******** 락커 배정 ******** */
const popupMemberLocker = {
	popup : undefined,
	data : {},
	callback : undefined,
	open : function(seqMember, callback) {
		if(this.popup) return;
		Promise.all([
			memberController.locker.day.category()
		]).then(([categoryList]) => {
			this.data = {
				seqMember : seqMember,
				categoryList : categoryList,
				lockerList : []
			};
			this.callback = callback;
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
		const seqMember = this.data.seqMember;
		const seqPartnerLockerList = this.popup.getValue("seqPartnerLockerList");
		if(!seqPartnerLockerList) {
			alert("락커를 선택해 주세요.");
			return;
		}
		memberController.locker.day.assign(seqMember, seqPartnerLockerList).then(data => {
			alert("락커 배정 완료 되었습니다.");
			this.close();
			if(this.callback) this.callback();
		}).catch(error => {
			alert("락커 배정 중 오류가 발생 하였습니다.");
		});
	},
	render : function() {
		const self = this.event.self = this;
		this.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					close : function() {self.close();},
					submit : function() {self.submit();},
				},
				change : {
					changeLocker : function() {self.event.changeLocker();}
				}
			}
		});
	},
	event : {
		changeLocker : function() {
			const seqPartnerLocker = this.self.popup.getValue("seqPartnerLocker");
			memberController.locker.day.list(seqPartnerLocker).then(data => {
				this.self.data.lockerList = data;
				this.setLockerList();
			}).catch(error => {
				alert("락카 정보를 가져오는 중 오류가 발생하였습니다.");
				console.log(error);
			});
		},
		setLockerList : function() {
			const ul = this.self.popup.querySelector("[data-event='lockerList']");
			const li = this.self.data.lockerList.map(item => {
				return `<li><label><input name="seqPartnerLockerList" type="radio" value="${item.SEQ_PARTNER_LOCKER_LIST}" data-event="locker"><span>${item.LOCKER_NO}</span></label></li>`;
			});
			ul.innerHTML = li.join("");
		}
	},
	template : function() {
		const getLockerList = () => {
			const option = this.data.categoryList.map(item => {
				return `<option value="${item.SEQ_PARTNER_LOCKER}">${item.LOCKER_NAME}</option>`;
			});
			return option.join("");
		};
		return `
			<style type="text/css">
				.popupLocker								{max-width:695px}
				.popupLocker .box							{padding:5px; height:300px; background-color:#f0f0f0; border:1px solid #ccc; white-space:normal; box-sizing:border-box; overflow-y:auto}
				.popupLocker .box li						{position:relative; display:inline-block; vertical-align:top; margin:5px; width:calc((100% - 80px) / 8); height:75px; background-color:white; line-height:75px; text-align:center; overflow:hidden}
				.popupLocker .box li label					{display:block; cursor:pointer}
				.popupLocker .box li input					{position:absolute; left:-9999px; width:0; height:0}
				.popupLocker .box li input + span			{position:absolute; left:0; top:0; width:100%; height:100%; border:1px solid #ccc; box-sizing:border-box}
				.popupLocker .box li input:checked + span	{background-color:#004fec; border-color:#004fec; color:white}
			</style>
			<div class="popupLocker">
				<div class="top">
					<h2>락커 배정<a data-event="close"></a></h2>
				</div>
				<div class="middle ui-form">
					<table>
						<tr>
							<th>카테고리 선택</th>
							<td>
								<select class="ui-select" name="seqPartnerLocker" data-event="changeLocker">
									<option value="">카테고리 선택</option>
									${getLockerList()}
								</select>
							</td>
						</tr>
						<tr>
							<th>번호 선택</th>
							<td>
								<div class="box">
									<ul data-event="lockerList"></ul>
								</div>
							</td>
						</tr>
					</table>
				</div>
				<div class="bottom">
					<button class="ui-button gray" data-event="close">취소</button>
					<button class="ui-button" data-event="submit">배정 완료</button>
				</div>
			</div>
		`;
	}
};




/* ******** 락커 배정 ******** */
const popupMemberLockerPeriod = {
	popup : undefined,
	mode : "create",
	data : {},
	callback : undefined,
	open : function(passInfo, lockerInfo, index, seqMember, isRemove, callback) {
		if(this.popup) return;
		const seqPartnerLocker = (lockerInfo[index]) ? lockerInfo[index].seqPartnerLocker : "";
		delete lockerInfo.temp;
		Promise.all([
			memberController.locker.period.list(seqPartnerLocker)
		]).then(([data]) => {
			this.data = {
				index : index,
				passInfo : passInfo || {},
				lockerInfo : lockerInfo || {},
				seqMember : seqMember,
				seqPartnerLocker : Number(data.lockerOnSelect),
				categoryList : data.lockerGroup || [],
				lockerList : data.lockerList || [],
				startDate : passInfo.useStartDate,
				endDate : passInfo.useEndDate,
				isRemove : isRemove
			};
			this.callback = callback;
			this.render();
		}).catch(error => {
			uiError(error);
		});
	},
	close : function() {
		this.popup = undefined;
		uiPopup();
	},
	remove : function() {
		if(this.callback) {
			this.callback({
				index : this.data.index,
				isRemove : true
			});
		}
		this.close();
	},
	submit : function() {
		const seqPartnerLockerList = this.data.seqPartnerLockerList;
		if(!seqPartnerLockerList) {
			alert("락커를 선택하지 않았습니다.");
			return;
		}
		const lockerInfo = this.data.lockerList.filter(item => {
			return (item.seq_partner_locker_list == seqPartnerLockerList);
		})[0];

		if(this.data.lockerInfo.temp)
			delete this.data.lockerInfo.temp;

		if(this.callback) {
			this.callback({
				index : this.data.index,
				passInfo : this.data.passInfo,
				seqPartnerLocker : lockerInfo.seq_partner_locker,
				seqPartnerLockerList : seqPartnerLockerList,
				lockerName : lockerInfo.locker_name,
				lockerNo : lockerInfo.locker_no,
				startDate : this.data.startDate,
				endDate : this.data.endDate
			});
		}
		this.close();
	},
	render : function() {
		const self = this.event.self = this;
		this.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					close : function() {self.close();},
					remove : function() {self.remove();},
					submit : function() {self.submit();},
				},
				change : {
					changeCategory : function() {self.event.changeCategory();},
				}
			}
		});
		this.popup.putValue("seqPartnerLocker", this.data.seqPartnerLocker);
		this.event.setLockerList();
	},
	event : {
		changeCategory : function() {
			const seqPartnerLocker = this.self.popup.getValue("seqPartnerLocker");
			memberController.locker.period.list(seqPartnerLocker).then(data => {
				this.self.data.lockerList =  data.lockerList || [];
				this.self.data.seqPartnerLocker = seqPartnerLocker;
				this.setLockerList();
			}).catch(error => {
				alert("락카 정보를 가져오는 중 오류가 발생하였습니다.");
				console.log(error);
			});
		},
		changeLocker : function(object) {
			const seqPartnerLockerList = this.self.data.seqPartnerLockerList = Number(object.value);
			const passInfo = this.self.data.passInfo;
			const lockerInfo = this.self.data.lockerInfo;
			const data = this.self.data.lockerList.filter(item => {
				return (item.seq_partner_locker_list == seqPartnerLockerList);
			})[0] || {};

			if(passInfo.seqMember == data.seq_member) {
				if(data.seq_pass_info && passInfo.seqPassInfo != data.seq_pass_info) {
					alert("배정된 이용권을 해제 후 배정해 주세요.");
					object.checked = false;
					return;
				}
			}

			data.seqPartnerLockerList = seqPartnerLockerList;
			data.startDate = this.self.data.startDate;
			data.endDate = this.self.data.endDate;
			data.isBefore = true;
			lockerInfo.temp = data;
			this.setLockerList();
			return;

			const popup = uiPopup({
				template : `
					<div class="popupLockerPeriod tiny">
						<div class="top">
							<h2>
								락커 기간 설정
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle ui-form">
							<table>
								<tr>
									<th>기간 설정</th>
									<td>
										<input name="startDate" type="calendar" value="${startDate}">
										~
										<input name="endDate" type="calendar" value="${endDate}">
									</td>
								</tr>
							</table>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">취소</button>
							<button class="ui-button" data-event="submit">배정</button>
						</div>
					</div>
				`,
				event : {
					click : {
						close : function() {
							const input = self.popup.querySelector("[name='seqPartnerLockerList']:checked");
							if(input) input.checked = false;
							uiPopup();
						},
						submit : function() {
							self.data.startDate = popup.getValue("startDate");
							self.data.endDate = popup.getValue("endDate");
							self.submit();
							uiPopup();
						}
					}
				}
			});
			uiCalendar(popup);
		},
		setLockerList : function() {
			const self = this;
			const lockerInfo = this.self.data.lockerInfo;
			const seqMember = this.self.data.seqMember;
			const selectedLockerInfo = lockerInfo[this.self.data.index];
			const seqPartnerLockerList = (selectedLockerInfo) ? selectedLockerInfo.seqPartnerLockerList : 0;
			const isChanged = (lockerInfo.temp);
			const lockerInfoList = {};
			for(let i in lockerInfo) {
				const item = lockerInfo[i];
				if(!(isChanged && !item.isBefore && item.seqPartnerLockerList == seqPartnerLockerList))
					lockerInfoList[item.seqPartnerLockerList] = item;
			}
			const ul = this.self.popup.querySelector("[data-event='lockerList']");
			const li = this.self.data.lockerList.map(item => {
				let useStatus = "empty";
				switch(item.use_status) {
					case "Y" :
					case "S" : useStatus = "use"; break;
					case "E" : useStatus = "use expired"; break;
					case "N" : useStatus = "none"; break;
				}
				let isDisable = (item.use_status != "U") ? "disabled" : "";
				const lockerInfo = lockerInfoList[item.seq_partner_locker_list];
				if(lockerInfo) {
					return `
						<li class="use reserve">
							<label>
								<input name="seqPartnerLockerList" type="radio" value="${item.seq_partner_locker_list}" data-event="changeLocker" disabled>
								<div class="locker">
									<div>
										<span>${lockerInfo.locker_no || lockerInfo.lockerNo}</span>
										<div class="info">
											배정 예정<br>
											${lockerInfo.startDate}<br>
											${lockerInfo.endDate}
										</div>
									</div>
								</div>
							</label>
						</li>
					`;
				} else {
					if(item.seq_member == seqMember) {
						isDisable = "";
						useStatus += " mine";
					}
					return `
						<li class="${useStatus}">
							<label>
								<input name="seqPartnerLockerList" type="radio" value="${item.seq_partner_locker_list}" data-event="changeLocker" ${isDisable}>
								<div class="locker">
									<div>
										<span>${item.locker_no}</span>
										<div class="info">
											${item.name || item.no_member_name || "-"}<br>
											${item.start_dt}<br>
											${item.end_dt}
										</div>
									</div>
								</div>
							</label>
						</li>
					`;
				}
			});
			ul.innerHTML = li.join("");
			ul.querySelectorAll("input").forEach(item => {
				item.addEventListener("click", function() {
					self.changeLocker(this);
				});
			});
		}
	},
	template : function() {
		const getLockerList = () => {
			const option = this.data.categoryList.filter(item => {
				return (item.locker_type == "P");
			}).map(item => {
				return `<option value="${item.seq_partner_locker}">${item.locker_name}</option>`;
			});
			return option.join("");
		};
		const getButton = () => {
			const lockerInfo = this.data.lockerInfo;
			const index = this.data.index;
			return (lockerInfo[index] || this.data.isRemove) ? `<button class="ui-button red" data-event="remove">배정 삭제</button>` : ``;
		};
		const getPassName = () => {
			const item = this.data.passInfo;
			const passName = [];
			passName.push(item.serviceName);
			passName.push(item.usePeriod + ((item.usePeriodType == "M") ? "개월" : "일"));
			if(item.serviceKind == "N")
				passName.push(item.useNumber + "회");
			return passName.join(" ");
		};
		return `
			<style type="text/css">
				.popupLocker									{max-width:1024px}
				.popupLocker .title								{height:35px; line-height:35px}
				.popupLocker .title ul							{float:left}
				.popupLocker .title li							{display:inline-block}
				.popupLocker .title li + li						{margin-left:15px}
				.popupLocker .title span						{position:relative; display:inline-block; vertical-align:text-bottom; margin-right:2px; width:1.2em; height:1.2em; border:1px solid #ccc; overflow:hidden}
				.popupLocker .title select						{float:right}

				.popupLocker .box								{margin-top:15px; padding:5px; height:500px; background-color:#f0f0f0; border:1px solid #ccc; white-space:normal; font-size:0; box-sizing:border-box; overflow-y:auto}
				.popupLocker .box ul							{line-height:1.5; text-align:left}
				.popupLocker .box li							{position:relative; display:inline-block; vertical-align:top; margin:5px; width:calc((100% - 80px) / 8); height:110px; background-color:white; border:1px solid #ccc; box-sizing:border-box; overflow:hidden}
				.popupLocker .box li:hover						{border-color:#004fec}
				.popupLocker .box li span						{position:relative}
				.popupLocker .box li label						{display:block; height:100%; cursor:pointer; overflow:hidden}
				.popupLocker .box li input						{position:absolute; left:-999px; width:0; height:0}
				.popupLocker .box li .locker					{display:table; width:100%; height:100%; table-layout:fixed}
				.popupLocker .box li .locker > div				{display:table-cell; width:100%; height:100%; vertical-align:middle; text-align:center; font-size:13px}

				.popupLocker .box li.use						{padding-top:20px}
				.popupLocker .box li.use .locker span			{position:absolute; left:0; top:0; width:100%; height:20px; line-height:20px; background-color:#111; color:white; opacity:0.85}
				.popupLocker .box li .locker .info				{display:none; padding:10px; text-overflow:ellipsis; white-space:nowrap; overflow:hidden}
				.popupLocker .box li.use .locker .info			{display:block}
				.popupLocker .box li.use:hover,
				.popupLocker .box li.none:hover					{border-color:#ccc}
				.popupLocker .box li input:checked + div		{background-color:#dcbb77}

				.popupLocker .use								{background-color:#8ac97b !important}
				.popupLocker .reserve							{background-color:#e0dc9a !important}
				.popupLocker .expired							{background-color:#f1656a !important}
				.popupLocker .reserve							{background-color:#dcbb77 !important}
				.popupLocker .select							{background-color:#e2e2e2 !important}
				.popupLocker .mine								{background-color:#67a9dc !important}
				.popupLocker .none:before						{content:""; position:absolute; left:50%; margin-left:-1px; top:-50%; margin-top:-1px; width:2px; height:200%; background-color:#f1656a; transform:rotate(45deg)}

				.popupLockerPeriod th							{width:100px !important}
			</style>
			<div class="popupLocker">
				<div class="top">
					<h2>
						락커 배정 : ${getPassName()}
						<a data-event="close"></a>
					</h2>
				</div>
				<div class="middle">
					<div class="title">
						<ul>
							<li><span class="mine"></span> 사용 중(해당 회원)</li>
							<li><span class="use"></span> 사용 중</li>
							<li><span class="reserve"></span> 배정 예정</li>
							<li><span class="expired"></span> 사용기간 만료</li>
							<li><span class="none"></span> 사용 불가</li>
						</ul>
						<select class="ui-select" name="seqPartnerLocker" data-event="changeCategory">
							<option value="">카테고리 선택</option>
							${getLockerList()}
						</select>
					</div>
					<div class="box">
						<ul data-event="lockerList"></ul>
					</div>
				</div>
				<div class="bottom">
					<button class="ui-button gray" data-event="close">취소</button>
					${getButton()}
					<button class="ui-button" data-event="submit">배정</button>
				</div>
			</div>
		`;
	}
};



/* ******** 적립 포인트 수정 ******** */
const popupMemberPoint = {
	popup : undefined,
	data : {},
	callback : undefined,
	open : function(seqMember, data, callback) {
		if(this.popup) return;
		this.callback = callback;
		if(data) {
			this.data = data;
			this.render();
		} else {
			commonController.memberInfo(seqMember).then(data => {
				this.data = data;
				this.render();
			}).catch(error => {
				uiError(error);
			});
		}
	},
	close : function() {
		this.popup = undefined;
		uiPopup();
	},
	submit : function(object) {
		const input = object.parentNode.querySelector("input");
		const value = getNumber(input.value);
		let point = getNumber(this.data.point);
		const type = object.getAttribute("data-type");
		switch(type) {
			case "add" : point += value; break;
			case "sub" : point -= value; break;
			case "edit" : point = value; break;
		}
		if(point < 0) point = 0;

		memberController.updatePoint({
			searchParamMap : {
				seqMember : this.data.seqMember
			},
			member : {
				point : point
			}
		}).then(data => {
			this.data.point = point;
			this.popup.putValue("point", getComma(point));
			alert("적립 포인트가 수정 되었습니다.");
			if(this.callback) this.callback(point);
		}).catch(error => {
			uiError(error);
		}).finally(() => {
			input.value = "";
		});
	},
	render : function() {
		const self = this;
		this.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					close : function() {self.close()},
					submit : function() {self.submit(this)}
				}
			}
		});
		uiInput(this.popup);
	},
	template : function() {
		const point = getComma(this.data.point || 0);
		return `
			<style type="text/css">
				.popupMemberPoint .middle button	{vertical-align:top; width:100px}
			</style>
			<div class="popupMemberPoint tiny">
				<div class="top">
					<h2>
						적립 포인트 수정
						<a data-event="close"></a>
					</h2>
				</div>
				<div class="middle ui-form">
					<form autocomplete="off">
						<table>
							<tr><th>현재 포인트</th><td><var data-msg="point">${point}</var>P</td>
							<tr>
								<th>적립</th>
								<td>
									<input type="currency" min="0" placeholder="적립 포인트">
									<button class="ui-button blue" type="button" data-type="add" data-event="submit">적립</button>
								</td>
							</tr>
							<tr>
								<th>차감</th>
								<td>
									<input type="currency" min="0" placeholder="차감 포인트">
									<button class="ui-button red" type="button" data-type="sub" data-event="submit">차감</button>
								</td>
							</tr>
							<tr>
								<th>수정</th>
								<td>
									<input type="currency" min="0" placeholder="수정 포인트">
									<button class="ui-button green" type="button" data-type="edit" data-event="submit">수정</button>
								</td>
							</tr>
						</table>
					</form>
				</div>
				<div class="bottom">
					<button class="ui-button gray" data-event="close">닫기</button>
				</div>
			</div>
		`;
	}
};
