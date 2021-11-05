const popupSmsSend = {
	popup : undefined,
	callback : undefined,
	data : {
		isManager : false,
		coachList : [],
		senderList : [],
		smsMemberList : [],
		smsUnit : {
			sms : 1,
			lms : 3,
			mms : 6
		},
	},
	open : function(data, callback) {
		if(this.popup) return;
		this.data.isManager = data.isManager || false;
		this.data.smsMemberList = data.smsMemberList || [];
		this.callback = callback;
		Promise.all([
			smsController.getSender({verifyYn : "Y"}),
			(data.isManager) ? commonController.coachList() : []
		]).then(([senderList, coachList]) => {
			this.data.senderList = senderList;
			this.data.coachList = coachList || [];
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
		const self = this;
		this.popup = this.event.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					close : function() {
						self.close();
					},
					submit : function() {
						self.submit();
					},
					attachButton : function() {
						self.event.attachButton(this);
					},
					guidelines : function() {
						popupSendAdGuide.open();
					}
				},
				change : {
					attachImage : function() {
						self.event.attachImage(this);
					},
					senderName : function() {
						self.event.changeSenderName();
					},
					messageType : function() {
						self.event.changeMessageType();
					}
				},
				keyup : {
					message : function() {
						self.event.updateState();
						self.event.updatePreview("message");
					},
					senderCustomName : function() {
						self.event.updatePreview("type");
					}
				},
				paste : {
					message : function() {
						self.event.updateState();
					}
				},
			}
		});
		this.popup.putValue("seqPartnerCoach", partnerInfo.employee.id);
		this.event.updatePreview("type");
		this.event.updateState();
	},
	filter : function(data) {
		const sendList = [];
		data.forEach(item => {
			const receiveNumber = item.receiveNumber;
			const isDuplicate = sendList.some(item => (receiveNumber == item.receiveNumber));
			if(!isDuplicate)
				sendList.push(item);
		});
		return sendList.filter(item => {
			return (item.smsAgreeYn != "N");
		});
	},
	submit : function() {
		const sender = this.popup.getValue("sender");
		let message = this.popup.getValue("message").trim();
		const seqPartnerCoach = this.popup.getValue("seqPartnerCoach");
		const messageType = this.popup.getValue("messageType");
		const previewType = this.popup.querySelector("[data-event='previewType']").innerHTML;

		if(this.popup.getValue("senderName") == "custom" && this.popup.getValue("senderCustomName") == "") {
			alert("발신자 정보를 입력해 주세요.");
			return;
		}
		if(!message) {
			alert("문자 내용을 입력해 주세요.");
			return;
		}
		if(!sender) {
			alert("발신번호를 선택해 주세요.");
			return;
		}
		if(messageType == "ad")
			message = previewType + "\r\n" + message;

		if(!this.event.checkCharacter(message)) {
			if(!confirm("키보드에서 입력할 수 없는 이모지 등의 특수문자가 포함되어 있습니다. 해당 문자는 물음표 등으로 표시될 수 있습니다.\n계속하시겠습니까?")) return;
		}
		smsController.getRemainCount().then(data => {
			const remainCount = data.remain_count;
			const type = this.event.getMessageType();
			const byte = this.event.getMessageByte();
			const unit = this.data.smsUnit[type];
			const attach = this.popup.querySelector("[name='attach']").files[0];

			const sendList = this.filter(this.data.smsMemberList).map(item => {
				item.fromNumber = sender;
				item.smsType = type;
				item.content = message;
				item.sendByte = byte;
				return item;
			});

			if(sendList.length == 0) {
				alert("선택한 회원은 모두 문자 수신을 미동의하였습니다.");
				return;
			}

			const count = sendList.length * unit;
			if(remainCount < count) {
				alert("잔여 건수가 부족해 발송할 수 없습니다.");
				return;
			}

			const form = new FormData();
			form.append("mmsImg", attach);
			form.append("memberList", JSON.stringify(sendList));

			smsController.sendSms(form).then(data => {
				if(data.result == "ok") {
					alert("문자가 발송되었습니다.");
					const span = document.querySelector("header [data-msg='sms-remain-count']");
					if(span) span.innerHTML = getComma(data.remainCount) + "건";
					this.close();
					if(this.callback)
						this.callback({
							message : message,
							seqPartnerCoach : seqPartnerCoach
						});
				} else {
					alert(data.result_code);
					this.close();
				}
			}).catch(error => {
				alert("문자 발송에 실패하였습니다.");
				console.log(error);
			});
		}).catch(error => {
			uiError(error);
		});

	},
	event : {
		checkCharacter : function(value) {
			const regExp = /[^(ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"|\n|\s)]/;
			const test = regExp.test(value);
			return (regExp.test(value)) ? false : true;
		},
		updatePreview : function(command) {
			if(command == "image") {
				const div = this.popup.querySelector("[data-event='previewImage']");
				div.innerHTML = "";
				const input = this.popup.querySelector("[name='attach']");
				if(input.value) {
					const img = document.createElement("img");
					const source = window.URL.createObjectURL(input.files[0]);
					if(source) {
						img.src = source;
						img.onload = function() {
							div.appendChild(img);
						};
					}
				}
			} else if(command == "type") {
				const messageType = this.popup.getValue("messageType");
				const senderName = this.popup.getValue("senderName");
				const senderCustomName = this.popup.getValue("senderCustomName");
				const div = this.popup.querySelector("[data-event='previewType']");
				if(messageType == "ad") {
					const text = [];
					text.push("(광고)");
					text.push((senderName == "custom") ? senderCustomName : senderName);
					div.innerHTML = text.join(" ");
				} else {
					div.innerHTML = "";
				}
			} else if(command == "message") {
				const div = this.popup.querySelector("[data-event='previewMessage']");
				const message = this.popup.getValue("message");
				div.innerHTML = message.replace(/\r/g, "").replace(/\n/g, "<br>");
			}
		},
		changeMessageType : function() {
			const value = this.popup.getValue("messageType");
			const tr = this.popup.querySelector("[data-event='senderInfo']");
			if(value == "ad")
				tr.classList.remove("hidden");
			else
				tr.classList.add("hidden");
			this.updatePreview("type");
			this.updateState();
		},
		changeSenderName : function() {
			const value = this.popup.getValue("senderName");
			const input = this.popup.querySelector("[name='senderCustomName']");
			if(value == "custom")
				input.classList.remove("hidden");
			else
				input.classList.add("hidden");
			this.updatePreview("type");
		},
		attachImage : function(object) {
			const value = object.value;
			const isAttach = (value) ? true : false;
			const span = object.parentNode.querySelector("span");
			const button = object.parentNode.querySelector("button");
			const fileName = (isAttach) ? value.substr(value.lastIndexOf("\\") + 1) : "첨부된 사진이 없습니다.";
			span.innerHTML = fileName;
			this.setAttachButton((isAttach) ? false : true);
			this.updateState();
		},
		attachButton : function(object) {
			const isRemove = (object.classList.contains("red")) ? true : false;
			const input = object.parentNode.querySelector("input");
			if(isRemove) {
				input.value = "";
				this.attachImage(input);
			} else {
				input.click();
			}
		},
		setAttachButton : function(isActive) {
			const button = this.popup.querySelector("[data-event='attachButton']");
			button.innerHTML = (isActive) ? "사진 첨부" : "첨부 삭제";
			button.className = (isActive) ? "ui-button" : "ui-button red";
			this.updatePreview("image");
		},
		updateState : function() {
			const type = this.getMessageType();
			const length = this.getMessageByte();
			const unit = popupSmsSend.data.smsUnit[type];
			const message = (type == "sms") ? "" : type.toUpperCase() + "로 전송되며, " + unit + "회 차감됩니다.";
			this.popup.querySelector("[data-msg='length']").innerHTML = getComma(length);
			this.popup.querySelector("[data-msg='type']").innerHTML = message;
		},
		getMessageType : function() {
			if(this.popup.querySelector("[name='attach']").value) return "mms";
			const byte = this.getMessageByte();
			return (byte <= 90) ? "sms" : "lms";
		},
		getMessageByte : function() {
			let message = this.popup.getValue("message");
			const messageType = this.popup.getValue("messageType");
			const previewType = this.popup.querySelector("[data-event='previewType']").innerHTML;
			if(messageType == "ad")
				message = previewType + "\r\n" + message;
			return (function(s, b, i, c) {
				for (b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 2 : c >> 7 ? 2 : 1) ;
				return b
			})(message);
		},
	},
	template : function() {
		const getSenderList = () => {
			const data = this.data.senderList;
			if(!data || data.length == 0)
				return "<option selected>발신번호 등록이 필요합니다.</option>";
			const option = data.map(item => {
				const senderName = (item.sender_name) ? "(" + item.sender_name + ")" : "";
				return `<option value="${item.phone}">${item.phone} ${senderName}</option>`;
			});
			return option.join("");
		};

		const getSenderNameList = () => {
			const data = this.data.senderList;
			if(!data || data.length == 0) return "";
			const option = data.map((item, index) => {
				const selected = (index == 0) ? "selected" : "";
				return `<option value="${item.sender_name}" ${selected}>${item.sender_name}</option>`;
			});
			return option.join("");
		};

		const getReceiverList = () => {
			const data = this.data.smsMemberList;
			if(!data || data.length == 0)
				return "<option selected>선택된 수신자가 없습니다.</option>";

			const sendList = [];
			const duplicateList = [];
			const optionY = [];
			const optionN = [];

			const option = data.forEach(item => {
				const receiveNumber = item.receiveNumber;
				const isDuplicate = sendList.some(item => (receiveNumber == item.receiveNumber));
				if(!isDuplicate) {
					sendList.push(item);
					const memberName = (item.memberName) ? "(" + item.memberName + ")" : "";
					const text = `<option value="${item.receiveNumber}" disabled>${item.receiveNumber} ${memberName}</option>`
					if(item.smsAgreeYn == "N")
						optionN.push(text);
					else
						optionY.push(text);
				} else {
					duplicateList.push(item);
				}
			});

			const getDuplicateList = () => {
				const count = duplicateList.length;
				return (count) ? `<optgroup label="수신 중복 ${count}건 제외"></optgroup>` : ``;
			};
			return `
				<optgroup label="수신 동의">
					${optionY.join("")}
				</optgroup>
				<optgroup label="수신 미동의">
					${optionN.join("")}
				</optgroup>
				${getDuplicateList()}
			`;
		};

		const coachList = () => {
			const option = this.data.coachList.map(item => {
				return `<option value="${item.seqPartnerCoach}">${item.coachName}</option>`;
			});
			return option.join("");
		};

		const getManager = () => {
			if(!this.data.isManager) return "";
			return `
				<tr>
					<th>담당자 선택</th>
					<td>
						<select class="ui-select" name="seqPartnerCoach">
							<option value="">담당자 선택</option>
							${coachList()}
						</select>
					</td>
				</tr>
			`;
		};

		const totalCount = getComma(popupSmsSend.data.smsMemberList.length);
		const targetCount = getComma(this.filter(this.data.smsMemberList).length);

		return `
			<div class="popupSendSms">
				<div class="top">
					<h2>문자 보내기<a data-event="close"></a></h2>
				</div>
				<div class="middle ui-form">
					<form onsubmit="return false" autocomplete="off">
						<dl>
							<dt>
								<table>
									${getManager()}
									<tr>
										<th>수신번호</th>
										<td>
											<select class="ui-select" name="receiver">
												<option value="" selected">선택한 ${totalCount}명 중 ${targetCount}명에게 문자 발송</option>
												${getReceiverList()}
											</select>
										</td>
									</tr>
									<tr class="type">
										<th>문자 분류</th>
										<td>
											<label class="ui-input-radio">
												<input name="messageType" type="radio" value="ad" checked data-event="messageType">
												<span></span>
												광고
											</label>
											<label class="ui-input-radio">
												<input name="messageType" type="radio" value="normal" data-event="messageType">
												<span></span>
												단순 알림(공지)
											</label>
											<p class="ui-note">
												발송 전 광고문자 전송 가이드를 반드시 읽어 주세요.
												<button class="ui-button medium white" data-event="guidelines">보기</button>
											</p>
										</td>
									</tr>
									<tr class="info" data-event="senderInfo">
										<th>발신자 정보</th>
										<td>
											<dl>
												<dt>(광고)</dt>
												<dd>
													<select class="ui-select" name="senderName" data-event="senderName">
														<option value="">발신자 이름을 선택해 주세요.</option>
														<option value="custom">직접 입력하기</option>
														${getSenderNameList()}
													</select>
													<input class="ui-input hidden" name="senderCustomName" placeholder="발신자 정보 입력" data-event="senderCustomName">
												</dd>
											</dl>
										</td>
									</tr>
									<tr class="message">
										<th>문자 내용</th>
										<td>
											<textarea class="ui-textarea" name="message" maxlength="1000" data-event="message" placeholder="문자 내용을 여기에 입력해 주세요."></textarea>
											<div class="state">
												<div class="left"><span data-msg="type"></span></div>
												<div class="right"><span data-msg="length">0</span> 바이트</div>
											</div>
										</td>
									</tr>
									<tr>
										<th>사진 첨부</th>
										<td>
											<label class="ui-input-file">
												<input name="attach" type="file" accept="image/jpeg, image/jpg, image/png, image/gif" data-event="attachImage">
												<span>첨부된 사진이 없습니다.</span>
												<button class="ui-button" data-event="attachButton">사진 첨부</button>
											</label>
										</td>
									</tr>
									<tr class="sender">
										<th>발신번호</th>
										<td>
											<select class="ui-select" name="sender">
												<option value="">발신번호를 선택해 주세요.</option>
												${getSenderList()}
											</select>
										</td>
									</tr>
								</table>
							</dt>
							<dd>
								<div class="preview">
									<h4>미리보기</h4>
									<div data-event="preview">
										<div data-event="previewImage"></div>
										<div data-event="previewType"></div>
										<div data-event="previewMessage"></div>
									</div>
									<p class="ui-note red">
										<em class="bg red">주의</em>문자 내용을 붙여넣기 하는 경우 실제 발송된 문자에 물음표(?)가 추가될 수 있으니 반드시 확인 하신 후 발송하시기 바랍니다.<br>
										<br>
										<em class="bg red">주의</em>광고문자 전송 시 하단에 무료수신거부 번호를 추가해 주세요.
									</p>
								</div>
							</dd>
						</dl>
					</form>
				</div>
				<div class="bottom">
					<button class="ui-button gray" data-event="close">취소</button>
					<button class="ui-button" data-event="submit">보내기</button>
				</div>
			</div>
		`;
	}
};

const popupSendAdGuide = {
	popup : undefined,
	open : function() {
		if(this.popup) return;
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
					close : function() {
						self.close();
					}
				}
			}
		});
	},
	template : function() {
		return `
			<div class="popupSendAdGuide">
				<div class="top">
					<h2>광고문자 전송 가이드<a data-event="close"></a></h2>
				</div>
				<div class="middle">
					<h3><span class="blue">광고문자</span>를 전송하실 경우에는 <span class="blue">반드시 아래 내용이 포함</span>되어야 합니다.</h3>
					<div class="example">
						<dl>
							<dt>
								<div class="phone">
									<h4>12월 31일 (목) 오전 12:00</h4>
									<div>
										① (광고) + ② 발송자정보
										<p>문자내용</p>
									</div>
								</div>
							</dt>
							<dd>
								<ul>
									<li>
										<h4>1. 광고임을 표시</h4>
										<h5>[광고], <광고>, 광고 및 기타 특수기호 사용 (<span class="red">Ｘ</span>)</h5>
									</li>
									<li>
										<h4>2. 어떤 제품 / 서비스인지 표시</h4>
										<ul>
											<li>
												<h5>① 회사명, 브랜드명, 서비스명 등 입력</h5>
												<p class="ui-note">
													- 홍길동 (<span class="red">Ｘ</span>)<br>
													- 삼성카드 홍길동 (<span class="green">Ｏ</span>)<br>
													※ 개인의 경우 회사명 또는 판매하는 제품의 브랜드 입력
												</p>
											</li>
											<li>
												<h5>② '(광고)' 뒤에 발송자정보 바로 나와야 함</h5>
												<p class="ui-note">
													- (광고) 안녕하세요? 스타벅스성수점입니다. (<span class="red">Ｘ</span>)<br>
													- (광고) 스타벅스성수점 안녕하세요? (<span class="green">Ｏ</span>)<br>
												</p>
											</li>
											<li>
												<h5>③ 하나의 발송자정보를 다양하게 표현할 경우 전부 등록</h5>
												<p class="ui-note">
													- 스타벅스성수점, 성수역스타벅스, 스타벅스코리아 등
												</p>
											</li>
										</ul>
									</li>
								</ul>
							</dd>
						</dl>
					</div>
					<div>
						<ul>
							<li>
								<h3 class="blue">어떤 피해가 발생하나요?</h3>
								<p>
									광고 표기 미준수 시 수신자에게 전달되지 않고 발송실패됩니다.<br>
									가이드 미준수로 발송 실패 및 제한되는 피해가 발생하고 있으니 반드시 해당 문구를 입력하신 후 보내시기 바랍니다.<br>
									<span>
										※ 불법스팸 문자는 가이드 준수와 상관없이 발송제한 됩니다.<br>
										※ 발송제한된 전화번호는 향후에도 사용하실 수 없습니다.
									</span>
								</p>
							</li>
							<li>
								<h3 class="blue">광고문자란?</h3>
								<p>매장 또는 웹사이트 등 업체의 방문을 유도하는 모든 문자를 광고문자라고 합니다.</p>
							</li>
						</ul>
					</div>
				</div>
				<div class="bottom">
					<button class="ui-button" data-event="close">닫기</button>
				</div>
			</div>
		`
	}
};

const popupSmsCharge = {
	popup : undefined,
	data : {},
	open : function() {
		if(this.popup) return;
		smsController.charge.info().then(data => {
			this.data.remainCount = data.remain_count || 0;
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
	check : function(data) {
		for(let name in data) {
			const value = data[name];
			const isEmpty = (!value);
			let error = "";
			switch(name) {
				case "price"		: if(isEmpty) error = "충전금액을 선택해 주세요."; break;
				case "accountPerson": if(isEmpty) error = "입금자명을 입력해 주세요."; break;
				case "phone"		: if(isEmpty) error = "연락처를 입력해 주세요."; break;
			}
			if(error) {
				alert(error);
				const input = document.querySelector("[name='" + name + "']");
				if(input) input.focus();
				return false;
			}
		}
		return true;
	},
	submit : function() {
		const data = {
			remainCount : this.data.remainCount,
			price : this.popup.getValue("price"),
			accountPerson : this.popup.getValue("accountPerson"),
			phone : this.popup.getValue("phone")
		};
		if(!this.check(data)) return;
		smsController.charge.payment(data).then(data => {
			alert("등록되었습니다.");
			window.location.href = "/sms/charge";
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
					changePhone : function() {self.event.changePhone(this)}
				}
			}
		});
	},
	event : {
		changePhone : function(object) {
			object.value = getPhoneNumber(object.value);
		},
		createButton : function(section) {
			const dataTable = $(section.querySelector("table")).DataTable();
			dataTable.on("init", () => {
				const div = section.querySelector(".dataTables_filter");
				if(!div) return;
				const button = document.createElement("button");
				button.className = "ui-button green";
				button.innerHTML = "SMS 충전 신청";
				button.addEventListener("click", function(){
					popupSmsCharge.open()
				});
				div.appendChild(button);
			});
		}
	},
	template : function() {
		return `
			<div class="small">
				<div class="top">
					<h2>
						SMS 충전 신청
						<a data-event="close"></a>
					</h2>
				</div>
				<div class="middle ui-form">
					<form autocomplete="off">
						<table>
							<tr>
								<th>업체명</th>
								<td>
									${partnerInfo.partner.name}
								</td>
							</tr>
							<tr>
								<th>잔여건수</th>
								<td>
									<span>${getComma(this.data.remainCount)}건<span>
								</td>
							</tr>
							<tr>
								<th>충전금액(건수)</th>
								<td>
									<select class="ui-select" name="price" style="text-align-last:center">
										<option value="">충전금액(건수) 선택</option>
										<option value="">충전금액(건수) 선택</option>
										<option value="7000">400건: 7,000원 (정가 9,000원에서 23%할인)</option>
										<option value="14000">800건: 14,000원 (정가 18,000원에서 23%할인)</option>
										<option value="35000">2,000건: 35,000원 (정가 45,000원에서 23%할인)</option>
										<option value="69000">5,000건: 69,000원 (정가 112,500원에서 40% 할인)</option>
									</select>
								</td>
							</tr>
							<tr>
								<th>입금자명</th>
								<td>
									<input class="wide" name="accountPerson" maxlength="16" placeholder="입금자명 입력">
								</td>
							</tr>
							<tr>
								<th>연락처</th>
								<td>
									<input class="wide" name="phone" maxlength="13" placeholder="연락처 입력" data-event="changePhone">
								</td>
							</tr>
							<tr>
								<th>입금계좌</th>
								<td>
									국민은행 : 019601-04-298396 (예금주 : 레드블루)
									<p class="ui-note red" style="margin-top:0">
										 <span class="red"><em class="bg red">주의</em>입금계좌 이체 시 입금자명을 반드시 센터명을 기입해 주세요.</span>
									</p>
								</td>
							</tr>
						</table>
					</form>
				</div>
				<div class="bottom">
					<button class="ui-button gray" data-event="close">취소</button>
					<button class="ui-button" data-event="submit">등록</button>
				</div>
			</div>
		`;
	}
};
