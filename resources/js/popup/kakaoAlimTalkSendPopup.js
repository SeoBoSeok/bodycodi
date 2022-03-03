const kakaoAlimTalkSendPopup = {
	$templateSelector : '',
	data : {
		smsMemberList : [],
		sender : '',
		templateList : [],
		senderList : []
	},

	open(data, type) {
		Promise.all([
			kakaoAlimTalkController.findSender(),
			kakaoAlimTalkController.findTemplates({type}),
			SmsController.senderList({verifyYn : 'Y'})
		]).then(([sender, templtList, senderList]) => {
			this.data.smsMemberList = data.smsMemberList;
			this.data.sender = sender;
			this.data.templateList = templtList;
			this.data.senderList = senderList;
			this.template.setData(this.data);

			const $popupLocation = $('[data-popup-location="팝업 위치"]');

			$popupLocation.append(this.template.render(
				this.data.smsMemberList.length, this._sendTargetMemberList().length));
			this.$templateSelector = $(this.template.getSelectorSource());

			this.$templateSelector.fadeIn(300);
			this._bindEvent();
			popHeight();
		});
	},


	send() {
		const data = this._buildRequestData();
		if (!this._checkValidateBeforeSend(data)) {
			return false;
		}

		kakaoAlimTalkController.send(data).then(res => {
			alert('발송하였습니다.');
			$('.sms_residual').find('span').text($.number(res) + '건');
			this.close();
		});
	},


	close() {
		this.$templateSelector.fadeOut(300, () => {
			this.$templateSelector.remove();
		});
	},


	_bindEvent() {
		this.$templateSelector.find('[data-action="close"]').click(() => {
			this.close();
		});

		this.$templateSelector.find('[data-action="send"]').click(() => {
			this.send();
		});

		this.$templateSelector.find('[name="seqKakaoAlimTalkTemplate"]').on({
			change : (event) => {
				const seqKakaoAlimTalkTemplate = event.currentTarget.value;
				this._previewTemplate(parseInt(seqKakaoAlimTalkTemplate));
			}
		});
	},


	_previewTemplate(seqKakaoAlimTalkTemplate) {
		const template = this.data.templateList.filter(template =>
			template.seqKakaoAlimTalkTemplate === seqKakaoAlimTalkTemplate
		)[0];

		let dataHtml = '';
		if (template === undefined) {
			dataHtml = '';

		} else {
			dataHtml = `<textarea style="width: 75%; background-color: #ddd;" readonly="readonly">${template.template.templtContent}</textarea>`;
		}

		this.$templateSelector.find('[data-template="preViewTemplateArea"]').empty().append(dataHtml);
		popHeight();
	},


	_buildRequestData() {
		return {
			senderkey : this.$templateSelector.find('[name="senderkey"]').val(),
			seqKakaoAlimTalkTemplate : this.$templateSelector.find('[name="seqKakaoAlimTalkTemplate"]').val(),
			sender : this.$templateSelector.find('[name="sender"]').val(),
			receivers : this._buildRequestDataReceivers()
		}
	},


	_buildRequestDataReceivers() {
		const sendTargetMemberList = this._sendTargetMemberList();
		return sendTargetMemberList.map(member => {
			return {seqMember : member.seqMember};
		});
	},


	_checkValidateBeforeSend(data) {
		if (data.senderkey.length === 0) {
			alert('플러스친구ID 를 선택해주세요.');
			return false;
		}

		if (data.seqKakaoAlimTalkTemplate.length === 0) {
			alert('템플릿을 선택해주세요.');
			return false;
		}

		if (data.sender.length === 0) {
			alert('발신번호를 선택해주세요.');
			return false;
		}

		if (data.receivers.length === 0) {
			alert('선택된 회원이 없습니다.');
			return false;
		}

		return true;
	},


	_sendTargetMemberList() {
		const mobileReg = /^(01)\d-\d{3,4}-\d{4}$/;
		return this.data.smsMemberList.filter(member => {
			if (!member.hasOwnProperty('smsAgreeYn')) {
				console.log('fail smsAtreeYn', member.name, member.memberName);
				return false;
			}

			if (!member.hasOwnProperty('receiveNumber') || !mobileReg.test(member.receiveNumber)) {
				return false;
			}

			return member.smsAgreeYn === 'Y';
		});
	},


	template : {
		_templateValue : 'kakaoAlimTalkPopup',
		data : {},


		setData(data) {
			this.data = data;
		},

		getSelectorSource() {
			return `[data-popup="${this._templateValue}"]`;
		},

		render(totalCnt, sendTargetCnt) {
			const targetCountText = '선택한 ' + totalCnt + '명 중 ' + sendTargetCnt + '명에게 발송합니다.';

			let limitSendablePerOnce = '';
			if (sendTargetCnt > 500) {
				limitSendablePerOnce = '알림톡 발송은 한번에 500명까지 할 수 있습니다. ' +
					Math.ceil(sendTargetCnt / 500) + '번에 나눠서 발송합니다.';
			}
			return `
				<div class="popup" data-popup="${this._templateValue}">
					<div class="box">
						<h2>알림톡 보내기</h2>
						<div class="pop_con">
							<div class="sms_form">
								<form>
									<fieldset>
										<p>
											<span>${targetCountText}</span>
										</p>
										<p>
											<span>${limitSendablePerOnce}</span>
										</p>
										<p>
											<span class="label" style="width: 100px;">플러스친구ID</span>
											<select name="senderkey" style="width: 200px;">
												<option value="">선택하세요</option>
												${this._renderProfileHtml()}
											</select>
										</p>

										<p>
											<span class="label" style="width: 100px;">템플릿 선택</span>
											<select name="seqKakaoAlimTalkTemplate" style="width: 200px;">
												<option value="">선택하세요</option>
												${this._renderTemplateListHtml()}
											</select>
										</p>
										
										<p>
											<span class="label" style="width: 100px;">템플릿 미리보기</span>
											<span data-template="preViewTemplateArea"></span>
										</p>
										
										<p>
											<span class="label" style="width: 100px;">발신번호</span>
											<select name="sender" style="width: 200px;">
												<option value="">선택하세요</option>
												${this._renderSenderListHtml()}
											</select>
										</p>
									</fieldset>
								</form>
							</div>
						</div>
						<div class="pop_btn">
							<button type="button" class="btn green" data-action="send">전송</button>
						</div>
						<a class="close" data-action="close">팝업 닫기</a>
					</div>
				</div>`;
		},


		_renderProfileHtml() {
			if ((this.data.sender === undefined) ||
					!(this.data.sender.profile.profileStat === 'A' && this.data.sender.profile.status === 'A')) {
				return `
					<option value="">발신 가능한 플러스친구ID 가 없습니다</option>
				`;
			}

			return `
				<option value="${this.data.sender.profile.senderKey}">${this.data.sender.profile.name}</option>
			`;
		},


		_renderTemplateListHtml() {
			if (this.data.templateList === undefined) {
				return `
					<option value="">사용 가능한 템플릿이 없습니다</option>
				`;
			}

			const templateOnApproved = this.data.templateList.filter(templt => templt.template.inspStatus === 'APR');
			if (templateOnApproved.length === 0) {
				return `
					<option value="">사용 가능한 템플릿이 없습니다</option>
				`;
			}

			return templateOnApproved.map(template => {
				return `
					<option value="${template.seqKakaoAlimTalkTemplate}">${template.templtName}</option>
				`;
			}).join('');
		},


		_renderSenderListHtml() {
			if (this.data.senderList.length === 0) {
				return `
					<option value="">등록된 발신번호가 없습니다</option>
				`;
			}

			return this.data.senderList.map(sender => {
				return `
					<option value="${sender.phone}">${sender.phone}(${sender.sender_name})</option>
				`;
			}).join('');
		}
	}
};