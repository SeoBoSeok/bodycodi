const smsSendPopup = {
	template : '',
	data : {
		smsMemberList : [],
		seqMemberProspectiveList : [],
		senderList : []
	},


	setTemplate : function(template) {
		this.template = template;
	},


	setData : function(data) {
		this.data = data;
	},


	setSendCbFunc : function(sendCbFunc) {
		this.sendCbFunc = sendCbFunc
	},


	open : function($popupLocationSelector, data, sendCbFunc) {
		this.setData(data);
		this.setSendCbFunc(sendCbFunc);

		const smsParam = {
			verifyYn : 'Y'
		};
		SmsController.senderList(smsParam).then(senderList => {
			this.data.senderList = senderList;

			$popupLocationSelector.append(smsSendPopupTemplate.prepareTemplate(
				senderList, this.data.smsMemberList.length, this._sendTargetMemberList().length));
			smsSendPopup.setTemplate($popupLocationSelector.find('[data-popup="SMS 보내기"]'));
			smsSendPopup.template.css('z-index', 1050);

			smsSendPopup.template.fadeIn(300);
			popHeight();

			this._bindEvent();

			this._setInitialize();
		});
	},


	_setInitialize() {
		if (this.data.senderList.length > 0) {
			const senderOnFirst = this.data.senderList[0];
			this.template.find('[name="adverticeSenderName"]').val(senderOnFirst.sender_name)
					.prop('selected', true);
			this._toggleAdverticeInputHtml(senderOnFirst.sender_name);
		}

		this.displayMsgType();
		this.displayTextByte();
		this.checkSpecialCharacter();
		this._refreshPreview();
	},


	_bindEvent() {
		this.template.find('[data-action="SMS 전송"]').on({
			click : () => {
				this.send();
			}
		});


		this.template.find('[data-action="close"]').on({
			click : () => {
				this.close();
			}
		});


		this.template.find('#smsTextArea').on({
			input : () => {
				this.displayMsgType();
				this.displayTextByte();
				this.checkSpecialCharacter();
				this._refreshPreview();
			}
		});


		this.template.find('[name="mmsImg"]').on({
			input : (event) => {
				const $mmsImgParentHtml = $(event.target).parent();
				if (event.target.value === '') {
					$mmsImgParentHtml.show();
				} else {
					$mmsImgParentHtml.hide();
				}

				this._previewMmsImg(event.target);

				this.displayMsgType();
				this.displayTextByte();
				this.checkSpecialCharacter();
				this._refreshPreview();

				popHeight();
			}
		});


		this.template.find('[name="sendMethod"]').on({
			input : (event) => {
				const $sendMethodHtml = this.template.find('[data-template="advertice"]');
				if (event.target.value === 'advertise') {
					$sendMethodHtml.show();
				} else {
					$sendMethodHtml.hide();
				}

				this.displayMsgType();
				this.displayTextByte();
				this.checkSpecialCharacter();
				this._refreshPreview();

				popHeight();
			}
		});


		this.template.find('[name="adverticeSenderName"]').on({
			change : (event) => {
				this._toggleAdverticeInputHtml(event.target.value);

				this.displayMsgType();
				this.displayTextByte();
				this.checkSpecialCharacter();
				this._refreshPreview();
			}
		});


		this.template.find('[name="adverticeSenderName-manual"]').on({
			keyup : () => {
				this.displayMsgType();
				this.displayTextByte();
				this.checkSpecialCharacter();
				this._refreshPreview();
			}
		});


		this.template.find('[data-action="openPopupAdvertiseGuide"]').on({
			click : () => {
				smsSendAdvertiseGuidePopup.open();
			}
		});

		$('[data-toggle="popover"]').popover();
	},


	_toggleAdverticeInputHtml(adverticeSenderName) {
		if (adverticeSenderName === '') {
			this.template.find('[name="adverticeSenderName-manual"]').show();
		} else {
			this.template.find('[name="adverticeSenderName-manual"]').hide();
		}
		popHeight();
	},


	_refreshPreview() {
		this.template.find('[data-display="preview"]').html(this.generateMsg().replace(/(\n|\r\n)/g, '<br>'));
	},


	displayMsgType() {
		const msgType = this.computeMsgType();
		const $smsType = this.template.find('#smsType');
		if (msgType === 'MMS') {
			$smsType.text('');
			$smsType.append('<i class=\"c_red\">MMS로 전송되며, 6회 차감됩니다.</i>');

		} else if (msgType === 'LMS') {
			$smsType.text('');
			$smsType.append('<i class=\"c_red\">LMS로 전송되며, 3회 차감됩니다.</i>');

		} else {
			$smsType.text('SMS');
		}
	},


	_previewMmsImg(target) {
		if (target.files && target.files[0]) {
			const reader = new FileReader();
			reader.readAsDataURL(target.files[0]);
			reader.onload = (event) => {
				const $mmsImgHtml = $(`<img src="${event.target.result}" alt="MMS 이미지"/>`);
				const $closeHtml = $(`<img src="/img/btn/delete_red.png" style="position: absolute; font-size: 25px; right: 7px; top: 7px; cursor: pointer; opacity: 0.5; width: 20px;" alt="삭제하기"/>`);

				const $rootHtml = $(`<div style="position: relative"></div>`);
				$rootHtml.append($mmsImgHtml);
				$rootHtml.append($closeHtml);

				$('[data-display="preview"]').before($rootHtml);

				$closeHtml.on({
					click: () => {
						if (confirm('이미지를 삭제하시겠습니까?')) {
							$rootHtml.remove();

							const $mmsImgInputHtml = $('[name="mmsImg"]');
							$mmsImgInputHtml.val('');
							$mmsImgInputHtml.trigger('input');
						}
					}
				});
			}
		}
	},


	displayTextByte() {
		const stringByteLength = this.textByte(this.generateMsg());
		this.template.find('#stringByteLength').text(stringByteLength);
	},


	checkSpecialCharacter() {
		const smsContent = this.template.find('#smsTextArea').val();

		const checkWord = /[^(ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"|\n|\s)]/;
		if (checkWord.test(smsContent)) {
			$('.specialNotice').show();
		} else {
			$('.specialNotice').hide();
		}
		popHeight();
	},


	computeMsgType() {
		if (this.template.find('[name="mmsImg"]').val() !== '') {
			return 'MMS';

		} else {
			const byteLength = this.textByte(this.generateMsg());
			return (parseInt(byteLength) <= 90) ? 'SMS' : 'LMS';
		}
	},


	textByte(content) {
		return (function(s, b, i, c) {
			for (b = i = 0; c = s.charCodeAt(i++); b += c >> 11 ? 2 : c >> 7 ? 2 : 1) ;
			return b
		})(content);
	},


	close : function() {
		this.template.fadeOut(300, function() {
			smsSendPopup.template.remove();
		});
	},


	smsDeductUnit() {
		switch (this.computeMsgType()) {
			case 'SMS':
				return 1;
			case 'LMS' :
				return 3;
			case 'MMS' :
				return 6;
			default :
				return false;
		}
	},


	send : function() {
		const fromNumberVal = this.template.find('[name="fromNumber"]').val();
		if (fromNumberVal === '') {
			alert('발신번호를 선택하여 주십시오');
			return;
		}

		const smsMsg = this.template.find('[name="smsTextArea"]').val();
		if (smsMsg === '') {
			alert('내용을 입력해주세요');
			return;
		}

		// 문자분류가 '광고' 이고 '직접입력' 일 때, 직접입력 값이 비어있으면 발송 불가
		if (this.template.find('[name="sendMethod"]:checked').val() === 'advertise'
				&& this.template.find('[name="adverticeSenderName"] option:selected').attr('data-method')) {
			const adverticeSenderName = this.template.find('[name="adverticeSenderName-manual"]').val();
			if (adverticeSenderName.length <= 0) {
				alert('발송자정보를 입력해주세요');
				return;
			}
		}


		SmsController.remainCnt().then(remainCount => {
			const memberListOnSendTarget = this._sendTargetMemberList();
			if (memberListOnSendTarget.length === 0) {
				alert('선택한 회원은 모두 SMS 수신을 \'미동의\'한 회원입니다.');
				return false;
			}

			if (remainCount.remain_count < memberListOnSendTarget.length * this.smsDeductUnit()) {
				alert('sms 를 발송할 수 없습니다. sms 잔여 건수가 부족합니다.');
				return false;
			}

			const smsMsg = this.generateMsg();
			const memberList = memberListOnSendTarget.map(member => {
				member.fromNumber = fromNumberVal;
				member.smsType = this.computeMsgType();
				member.content = smsMsg;
				member.sendByte = this.textByte(smsMsg);

				return member;
			});


			const data = new FormData();
			data.append('mmsImg', $('input[name="mmsImg"]')[0].files[0]);
			data.append('memberList', JSON.stringify(memberList));

			SmsController.sendSmsToMember(data).then(resultData => {
				if (resultData.result === 'ok') {
					alert('문자발송에 성공하였습니다.');
					$('.sms_residual').find('span').text($.number(resultData.remainCount) + '건');

					if (typeof smsSendPopup.sendCbFunc === 'function') {
						smsSendPopup.sendCbFunc(resultData, smsMsg);
					}

					this.close();
				} else {
					alert(resultData.result_code);
				}
			});
		});
	},


	generateMsg() {
		let msg = this.template.find('[name="smsTextArea"]').val();

		if (this.template.find('[name="sendMethod"]:checked').val() === 'advertise') {
			const adverticeSenderName =
					this.template.find('[name="adverticeSenderName"] option:selected').attr('data-method')
							? this.template.find('[name="adverticeSenderName-manual"]').val()
							: this.template.find('[name="adverticeSenderName"]').val();

			msg = `(광고)${adverticeSenderName}\n${msg}`;
		}

		return msg;
	},


	_sendTargetMemberList() {
		return this.data.smsMemberList.filter(member => {
			if (!member.hasOwnProperty('smsAgreeYn')) {
				return member;
			}
			return member.smsAgreeYn === 'Y';
		});
	}
};


const smsSendPopupTemplate = {
	prepareTemplate : function(senderList, totalCnt, sendTargetCnt) {
		const senderOptionHtmlList = senderList.map(function(value) {
			return `<option value="${value.phone}">${value.phone} (${value.sender_name})</option>`;
		});

		const senderListHtml = senderOptionHtmlList !== '' ?
			`<option value="">발신번호를 선택하여 주십시오</option>` + senderOptionHtmlList.join('') :
			`<option value="">발신번호 등록이 필요합니다.</option>`;

		const targetCountText = '선택한 ' + totalCnt + '명 중 ' + sendTargetCnt + '명에게 발송합니다.';

		let limitSendablePerOnce = '';
		if (sendTargetCnt > 1000) {
			limitSendablePerOnce = 'sms 발송은 한번에 1,000명까지 할 수 있습니다. ' +
				Math.ceil(sendTargetCnt / 1000) + '번에 나눠서 발송합니다.';
		}

		return `
			<div class="popup sms_send" data-popup="SMS 보내기">
				<div class="box" style="width: 700px !important;">
					<h2>SMS 보내기</h2>
					<div class="pop_con">
						<div class="sms_form" style="display: flex;">
							<form id="smsForm" style="flex: 1;">
								<fieldset>
									<legend>SMS 보내기</legend>
									<p class="state">
										<span id="smsType">SMS</span>
										<span>예상 <i id="stringByteLength">0</i>Byte</span>
									</p>
									<p>
										<span>${targetCountText}</span>
									</p>
									<p>
										<span>${limitSendablePerOnce}</span>
									</p>
									<div>
										<div>
											<span>[필독] 광고문자 전송가이드</span>
											<span data-action="openPopupAdvertiseGuide" class="btn small gray"
													style="font-size: 12px; margin-left: 5px;">자세히</span>
										</div>
										<div>
											<span class="label">문자분류</span>
											<input type="radio" name="sendMethod" value="advertise" id="smsSendAdvertise"
													checked>
											<label for="smsSendAdvertise">광고</label>
											<input type="radio" name="sendMethod" value="notice" id="smsSendNotice">
											<label for="smsSendNotice">단순 알림(공지)</label>
										</div>
										<div data-template="advertice" style="display: flex; line-height: initial;">
											<div style="flex: none; display: flex; align-items: center; border-radius: 5px; padding: 0 5px; background-color: lightgray;">
												<span>(광고)</span>
											</div>
											<div style="flex: 1; margin-left: 5px;">
												<select name="adverticeSenderName">
													<option value="" data-method="manual">+ 직접 입력하기</option>
													${this.advertiseSenderNameOptionHtml(senderList)}
												</select>
												<input type="text" name="adverticeSenderName-manual"
														placeholder="발송자정보 입력" style="width: calc(100% - 60px); margin-top: 3px;"/>
											</div>
										</div>
									</div>
									<div class="textarea">
										<textarea id="smsTextArea" name="smsTextArea" style="height: 300px; font-size: 16px;"
												placeholder="알림 내용을 입력해 주세요.&#13;&#10;&#13;&#10;[주의] 문자내용을 붙여넣기 하는 경우 실제 발송된 문자에 물음표(?)가 추가될 수 있으니 반드시 확인 하신 후 발송하시기 바랍니다.&#13;&#10;&#13;&#10;[주의] 광고문자 전송 시 하단에 무료수신거부번호를 추가해야합니다."></textarea>
									</div>
									<div class="writeNotice specialNotice" style="display: none; line-height: inherit">
										<p class="c_red" style="display: inline-block">*! 특수문자가 포함되어 있습니다.</p>
										<span style="font-size: 15px; vertical-align: baseline; margin-left: 5px;"
										 		data-toggle="popover"
												data-trigger="hover" data-placement="right"
												data-container="body"
												data-content="*키보드에서 입력할 수 없는 이모지 등의 특수문자는 발송과정에서 물음표(?)로 변경되어 발송될 수 있으니 반드시 통신3사(SK,KT,LGT) 핸드폰에 테스트문자를 발송하신 후 전체보내기를 하시기 바랍니다.">
											<i class="fas fa-question-circle"></i>
										</span>
									</div>
									<div>
										<button class="btn blue" style="width: 100px;">사진첨부</button>
										<input type="file" name="mmsImg" accept=".jpg,.png,.gif" title="Search files"
											   style="display:inline; font-size: 14px; position: absolute; left: 10px; opacity: 0; width: 86px; cursor: pointer;"/>
									</div>
									<p>
										<span class="label">발신번호</span>
										<select name="fromNumber">
											${senderListHtml}
										</select>
									</p>
									<input type="hidden" name="checkedSeqMember">
									<input type="hidden" name="checkedMemberName">
									<input type="hidden" name="checkedMembershipNo">
									<input type="hidden" name="checkedMobile">
								</fieldset>
							</form>
							<div style="margin-left: 15px;">
								<div style="display: inline-block; border: 1px solid #ccc; border-radius: 20px; width: 300px; height: 400px;">
									<div style="margin: 10px 0; font-size: initial; text-align: center;">
										<img src="/img/btn/search_dark.png" alt="미리보기"/> 미리보기
									</div>
									<div style="background-color: #eeeeee; width: 90%; margin: 0 auto; height: 340px; padding: 10px; border-radius: 5px; overflow-y: auto;">
										<div data-display="preview" style="position: relative; height: 300px; font-size: 16px; line-height: 1.4; overflow-wrap: break-word;"></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div class="pop_btn">
						<button type="button" class="btn gray"  data-action="close">닫기</button>
						<button type="button" class="btn green" data-action="SMS 전송">전송</button>
					</div>
					<a class="close" data-action="close">닫기</a>
				</div>
			</div>
		`;
	},


	advertiseSenderNameOptionHtml(senderList) {
		return senderList.map(sender => {
			return `
				<option value="${sender.sender_name}" data-id="${sender.seq_sms_sender}">
					${sender.sender_name}
				</option>
			`;
		}).join('');
	}
};
