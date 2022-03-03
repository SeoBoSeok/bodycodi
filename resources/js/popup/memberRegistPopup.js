const memberRegistPopupTemplate = {
	_templateName : 'data-popup',
	_templateValue : 'registMember',

	getCameraBtn : function() {
		if (cameraPopup.hasGetUserMedia()) {
			return `
				<button type="button" data-action="카메라 팝업 열기"
						class="btn dark" style="width: 95px;">
					촬영하기
				</button>
			`;
		}
	},


	getSelectorSource() {
		return `[${this._templateName}="${this._templateValue}"]`;
	},


	prepare : function(showCameraBtn) {
		return `
			<div class="popup add_advice_member" ${this._templateName}=${this._templateValue}>
				<div class="box" style="width: 700px !important;">
					<h2>회원 등록</h2>
					<div class="pop_con">
						<fieldset>
							<div class="photo" style="margin-bottom: 10px;">
								<p class="pic" style="margin-right: 74px;">
									<img src="/img/pic/female.jpg" id="memberImg" alt="여성">
								</p>
								<p style="margin-left:120px;">정면, 상반신 사진을 등록해주세요</p>
								<div class="file_fake">
									<form id="frmMemberImg" method="post" enctype="multipart/form-data" >
										<div style="display: inline-block;">
											<input type="text" value="" style="width: 200px !important">
											<button type="button" class="btn dark" style="width: 95px;">찾기</button>
											<input name="memberImg" type="file" style="width: 296px">
										</div>
										${showCameraBtn ? this.getCameraBtn() : ''}
										<input type="hidden" name="imgPathVariable" value="member"/>
										<input type="hidden" name="imgWidth" value="400"/>
									</form>
								</div>
							</div>
							<form id="memberInfoForm" method="post">
								<input type="hidden" name="seqMember"/>
								<input type="hidden" id="imgUrl" name="imgUrl"/>
								<p>
									<label for="name" style="margin-right: 25px;">
										<span style="color: #FF5722; font-size: 20px;">*</span>회원명
									</label>
									<input name="name" type="text" value="" id="name" placeholder="이름 입력"
											style="width: 200px; margin-right: 25px;">
			
									<input type="radio" name="sex" id="male" value="M" checked="checked">
									<label for="male">남성</label>
									<input type="radio" name="sex" id="female" value="F">
									<label for="female">여성</label>
								</p>
								<p>
									<span class="label" style="margin-right: 25px;">
									<span style="color: #FF5722; font-size: 20px;">*</span>휴대전화번호</span>
									<input class="re" name="mobile1" type="number" title="휴대전화번호" maxlength="3">
									<input name="mobile2" type="number" title="휴대전화번호" maxlength="4">
									<input name="mobile3" type="number" title="휴대전화번호" maxlength="4">
									
									<span style="margin-left: 30px; margin-right: 5px;">SMS 수신</span>
									<input type="checkbox" name="smsAgreeYn" id="smsAgreeYn_Y" value="Y" checked="checked">
									<label for="smsAgreeYn_Y">동의</label>
								</p>
								<div class="address" style="padding-left: 145px;">
									<p data-msg="inUsingMobile"
											style="line-height: 20px; color: #FF5722; display: none;">
										다른 회원이 사용 중인 휴대 전화번호입니다.
									</p>
									<p style="line-height: 20px;">
										회원의 휴대 전화번호는 회원용 APP과 연동되는 중요한 정보입니다.
									</p>
									<p style="line-height: 20px; margin-top: 0;">
										반드시 실제 사용하는 휴대전화번호를 입력하세요.
									</p>
								</div>
								<p>
									<label for="name" class="label" style="margin-right: 25px;">
										<span style="color: #FF5722; font-size: 20px;">*</span>회원 번호
									</label>
									<input name="membershipNo" type="number" value="" style="width: 200px;" title="회원번호">
								</p>
								<p>
									<label for="inputInsertBarcode" class="label" style="margin-right: 25px;">회원 바코드 번호	</label>
									<input id="inputInsertBarcode" type="text" value="" style="width: 200px;" title="입장바코드번호">
								</p>
								<p>
									<label for="inboundState_visit" class="label" style="margin-right: 25px;">
										<span style="color: #FF5722; font-size: 20px;">*</span>
										유입 상태
									</label>
									<input type="radio" name="inboundState" id="inboundState_visit"
											value="VISIT" checked="checked">
									<label for="inboundState_visit">방문</label>
									<input type="radio" name="inboundState" id="inboundState_recommend"
											value="RECOMMEND">
									<label for="inboundState_recommend">지인추천</label>
								</p>
								<div class="address" style="padding-left: 145px;">
									<p data-msg="inUsingMembershipNo"
											style="line-height: 20px; color: #FF5722; display: none;">
										다른 회원이 사용 중인 회원번호입니다.
									</p>
									<p data-msg="invalidMembershipNo"
											style="line-height: 20px; color: #FF5722; display: none;">
										회원 번호를 4자리 이상 입력해주세요.
									</p>
								</div>
								<hr style="border: 1px dashed #ccc; margin: 15px 0;"/>
								<p>
									<label for="regDt" style="margin-right: 25px;">첫 등록일</label>
									<input name="regDt" type="text" id="regDt" class="calendar" 
											style="width: 200px;" title="첫 등록일" readonly />
								</p>
								<p>
									<label for="name" style="margin-right: 25px;">고객관리 담당자</label>
									<select name="seqPartnerCoach" type="text" id="partnerCoach" style="width: 200px;"
											title="상담 담당자 선택">
										<option value="0">홍길동</option>
									</select>
								</p>
								<p>
									<span class="label" style="margin-right: 25px;">고객 유입 경로</span>
									<select name="inboundPathAttr" class="selectBox" title="고객 유입 경로">
										<option value="0">전단지</option>
									</select>
								</p>
								<p>
									<span class="label" style="margin-right: 25px;">추천회원</span>
									<input name="recommendMemberName" type="text" placeholder="이름 입력"
											data-function="추천 회원 검색"
											style="width: 200px;" title="추천회원"/>
									<input type="hidden" name="recommendMember"/>
									
									<button data-function="추천 회원 검색" class="btn dark">회원 검색</button>
			
									<div class="search_member_result" data-visual-target="추천회원 검색 결과 목록 컨테이너"
											style="display: none; position: absolute; background-color: white; border: 2px solid #ccc;
											padding: 15px; border-radius: 5px; overflow: hidden; overflow-y: auto;
											width: 340px; z-index: 10; left: 165px; margin-left: 0">
										<ul data-draw-target="추천회원 검색 결과 목록 컨테이너"></ul>
									</div>
								</p>
								<p class="birth">
									<span class="label" style="margin-right: 25px;">생년월일</span>
									<input name="birthday" type="text" class="calendar" readonly style="width: 200px !important;"
										   title="생년월일"/>
									<input name="age" type="number" placeholder="나이 입력" style="width: 95px !important;" title="나이"/>
								</p>
								<div class="address" style="padding-left: 145px;">
									<span class="label" style="margin-right: 25px;">주소</span>
									<p class="zip">
										<input name="zipCode" type="text" placeholder="우편번호"
											   style="width: 200px !important;">
										<button data-function="주소 검색" id="btnAddressSearch" class="btn dark">우편번호 찾기</button>
									</p>
									<p>
										<input name="address" type="text" placeholder="주소를 입력하세요."
											   style="width: 300px !important;">
									</p>
									<p>
										<input name="addressDetail" type="text" placeholder="상세 주소 입력"
											   style="width: 300px !important;">
									</p>
								</div>
								<p>
									<label for="email" class="label" style="margin-right: 25px;">이메일</label>
									<input type="text" name="memberId1" id="email" style="width: 200px;"/>
									<span>@</span>
									<input type="text" name="memberId2" style="width: 150px;"/>
								</p>
								<p>
									<span class="label" style="margin-right: 25px;">메모</span>
									<textarea name="memo" title="메모" style="width: 370px; height: 45px;"></textarea>
								</p>
							</form>
						</fieldset>
					</div>
					<div class="pop_btn" data-function-group="regist">
						<button data-function="close" type="button" class="btn gray">닫기</button>
						<button data-function="회원 가입" data-function-after-action="미결제 사유"
								type="button" class="btn green">잠재고객 등록</button>
						<button data-function="회원 가입" data-function-after-action="상품 판매"
								type="button" class="btn blue">등록 후 상품 판매</button>
					</div>
					<div class="pop_btn" data-function-group="update">
						<button data-function="close" type="button" class="btn gray">닫기</button>
						<button data-function="회원 정보 수정" type="button" class="btn green">수정</button>
						<button data-function="회원 정보 수정" data-function-after-action="상품 판매"
								type="button" class="btn blue">수정 후 상품 판매</button>
					</div>
					<a class="close" data-function="close">팝업 닫기</a>
				</div>
			</div>
		`;
	},


	isExist() {
		const $global = $(document).find(this.getSelectorSource());
		return $global.length > 0;
	}
};


const memberRegistPopup = {
	template : '',
	barcodeTemplate : '',
	data : {
		isUsableMobile : false,
		isUsableMembershipNo : false,
		isUsableEntranceBarcode : true,
		setIsUsableMobile : function(isUsableMobile) {
			this.isUsableMobile = isUsableMobile;
		},

		setIsUsableMembershipNo : function(isUsableMembershipNo) {
			this.isUsableMembershipNo = isUsableMembershipNo;
		},
		setIsUsableEntranceBarcode : function(isUsableEntranceBarcode) {
			this.isUsableEntranceBarcode = isUsableEntranceBarcode;
		}
	},


	setTemplate : function(templateSrc) {
		this.template = $(templateSrc);
	},

	setBarcodeTemplate : function(barcodeTemplate){
		this.barcodeTemplate = barcodeTemplate;
	},
	setData : function(data) {
		this.data = data;
	},


	open : function(action, $popupLocationSelector, seqMember) {
		navigator.mediaDevices.getUserMedia({
			video : true
		}).then(function(stream) {
			stream.getVideoTracks().forEach(track => track.stop());
			return Promise.resolve(true);

		}).catch(function(err) {
			return Promise.resolve(false);

		}).then((showCameraBtn) => {
			if (memberRegistPopupTemplate.isExist()) {
				return false;
			}

			$popupLocationSelector.append(memberRegistPopupTemplate.prepare(showCameraBtn));
			this.setTemplate(memberRegistPopupTemplate.getSelectorSource());
			this.setBarcodeTemplate(this.template.find('[id="inputInsertBarcode"]')[0]);


			MemberController.registForm(function(data) {
				memberRegistPopup.drawCoachList(data.coachList);
				memberRegistPopup.drawInboundPathList(data.inboundPathList);

				if (action === 'update') {
					const dataParam = {
						searchParamMap : {
							seqMember : seqMember
						}
					};
					MemberController.selectByPk(dataParam, function(resultData) {
						if (resultData.resultCode === '1102') {
							alert('해당 회원의 자료가 없습니다.');
							return;
						}

						memberRegistPopup.dataBindingForm(resultData.data.member);
						memberRegistPopup.data.setIsUsableMobile(true);
						memberRegistPopup.data.setIsUsableMembershipNo(true);
					});
				}
			});


			this.template.find('[data-function-group]').hide();
			this.template.find('[data-function-group=' + action + ']').show();

			this.template.fadeIn(300, function() {
				memberRegistPopup.template.find('[name="name"]').focus();

				memberRegistPopup.template.find('.calendar').removeClass('hasDatepicker').datepicker({
					dateFormat : 'yy-mm-dd',
					yearRange : '1930:' + new Date().getFullYear(),
					changeMonth : true,
					changeYear : true,
					firstDay : 1,
					defaultDate : new Date(),
					onSelect : function(dateText, inst) {
						const age = new Date().getFullYear() - inst.selectedYear + 1;
						memberRegistPopup.template.find('[name="age"]').val(age);
					}
				});
			});
			this.postCodeChecker();
			popHeight();
		});
	},
	postCodeChecker : function() {
		if (typeof daum !== 'undefined' && $('input[name=zipCode]')) {
			$('#btnAddressSearch').show();
		} else {
			$('#btnAddressSearch').hide();
		}
	},

	dataBindingForm : function(member) {
		this.template.find('[name="seqMember"]').val(member.seq_member);

		if (member.img_url) {
			this.template.find('#memberImg').prop('src', member.img_url);
			this.template.find('[name="imgUrl"]').val(member.img_url);
		}

		this.template.find('[name="name"]').val(member.name);
		this.template.find(`[name="sex"][value="${member.sex}"]`).prop('checked', true);

		const mobileArr = member.mobile.split('-');
		this.template.find('[name="mobile1"]').val(mobileArr[0]);
		this.template.find('[name="mobile2"]').val(mobileArr[1]);
		this.template.find('[name="mobile3"]').val(mobileArr[2]);

		if (member.sms_agree_yn !== 'Y') {
			this.template.find('[name="smsAgreeYn"]').prop('checked', false);
		}

		this.template.find('[name="membershipNo"]').val(member.membership_no);
		this.template.find(`[name="inboundState"][value="${member.inbound_state}"]`).prop('checked', true);

		this.template.find('[name="regDt"]').val(moment(member.reg_dt).format('YYYY-MM-DD'));
		this.template.find('[name="seqPartnerCoach"]').val(member.seq_partner_coach);
		this.template.find('[name="inboundPathAttr"]').val(member.inbound_path_attr);

		this.template.find('[name="recommendMember"]').val(member.recommend_member);
		this.template.find('[name="recommendMemberName"]').val(member.recommend_member_name);

		const birthday = new Date(member.birthday);
		this.template.find('[name="birthday"]').val(birthday.format('yyyy-MM-dd'));

		const age = new Date().getFullYear() - birthday.getFullYear() + 1;
		this.template.find('[name="age"]').val(age);

		this.template.find('[name="zipCode"]').val(member.zip_code);
		this.template.find('[name="address"]').val(member.address);
		this.template.find('[name="addressDetail"]').val(member.address_detail);

		if (member.member_id) {
			const memberIdArr = member.member_id.split('@');
			this.template.find('[name="memberId1"]').val(memberIdArr[0]);
			this.template.find('[name="memberId2"]').val(memberIdArr[1]);
		}

		this.template.find('[name="memo"]').val(member.memo);
	},


	close : function() {
		this.template.fadeOut(300, () => {
			this.template.remove();
		});
	},


	drawCoachList : function(coachList) {
		const defaultHtml = `<option value="">선택해주세요</option>`;
		const dataHtml = coachList.map(function(value) {
			return '<option value="' + value.seq_partner_coach + '">' + value.coach_name + '</option>';
		});

		const $seqPartnerCoachTemplate = this.template.find('[name="seqPartnerCoach"]');
		$seqPartnerCoachTemplate.empty();
		$seqPartnerCoachTemplate.append(defaultHtml + dataHtml.join(''));
	},


	drawInboundPathList : function(inboundPathList) {
		const defaultHtml = `<option value="">선택해주세요</option>`;
		const dataHtml = inboundPathList.map(function(value) {
			return `<option value="${value.seq_attr_value}">${value.attr_value}</option>`;
		});

		const $inboundPathAttrTemplate = this.template.find('[name="inboundPathAttr"]');
		$inboundPathAttrTemplate.empty();
		$inboundPathAttrTemplate.append(defaultHtml + dataHtml.join(''));
	},


	regist : function(afterAction) {
		const name = this.template.find('[name="name"]').val();
		const mobile1 = this.template.find('[name="mobile1"]').val();
		const mobile2 = this.template.find('[name="mobile2"]').val();
		const mobile3 = this.template.find('[name="mobile3"]').val();
		const membershipNo = this.template.find('[name="membershipNo"]').val();
		if (!this.checkValidate(name, mobile1, mobile2, mobile3, membershipNo)) {
			return;
		}

		const inboundState = this.template.find('[name="inboundState"]:checked').val();

		const memberId1 = this.template.find('[name="memberId1"]').val();
		const memberId2 = this.template.find('[name="memberId2"]').val();

		const birthdayInput = this.template.find('[name="birthday"]').val().trim();
		const birthday = birthdayInput !== '' ?
				birthdayInput : new Date(new Date().getFullYear(), 0, 1).format('yyyy-MM-dd');

		const regDtInput = this.template.find('[name="regDt"]').val().trim();
		const regDt = regDtInput !== '' ?
				moment(regDtInput).toISOString(true) : moment().toISOString(true);

		const paramData = {
			member : {
				// 필수사항
				name : name,
				sex : this.template.find('[name="sex"]:checked').val(),
				mobile : mobile1 + '-' + mobile2 + '-' + mobile3,
				smsAgreeYn : this.template.find('[name="smsAgreeYn"]:checked').val() === 'Y' ? 'Y' : 'N',
				membershipNo : membershipNo,
				inboundState : inboundState,
				// 선택사항
				regDt : regDt,
				imgUrl : this.template.find('[name="imgUrl"]').val(),
				seqPartnerCoach : this.template.find('[name="seqPartnerCoach"]').val(),
				inboundPathAttr : this.template.find('[name="inboundPathAttr"]').val(),
				recommendMember : this.template.find('[name="recommendMember"]').val(),
				birthday : birthday,
				zipCode : this.template.find('[name="zipCode"]').val(),
				address : this.template.find('[name="address"]').val(),
				addressDetail : this.template.find('[name="addressDetail"]').val(),
				memberId : (memberId1 !== '' && memberId2 !== '') ? memberId1 + '@' + memberId2 : undefined,
				memo : this.template.find('[name="memo"]').val(),
				entranceBarcode : this.barcodeTemplate.value === '' ? null : this.barcodeTemplate.value
			}
		};


		if (inboundState === 'VISIT' && afterAction === '미결제 사유') {
			memberNonPaymentReasonPopup.open($('[data-popup-location="memberRegistPopup"]'), paramData, this._regist);
		} else {
			this._regist(paramData, afterAction);
		}
	},


	_regist : function(paramData, afterAction) {
		MemberController.regist(paramData, function(resultData) {
			switch (resultData.resultCode) {
				case '1101' :
					alert('회원 번호가 중복되어 사용할 수 없습니다.');
					break;

				case '1102':
					alert('휴대 전화 번호가 중복되어 사용할 수 없습니다.');
					break;
				case '1104' :
					alert('바코드 번호가 중복되어 사용할 수 없습니다.');
					break;
			}

			MemberProspectiveController.memberCreateAfterInsert(resultData.data.member.seqMember, function(result) {
				alert('등록되었습니다');
				if (afterAction === '상품 판매') {
					location.href = '/manager/member/memberSelectProduct/' + result.seqMember;
				} else {
					memberRegistPopup.close();
					location.reload();
				}
			});
		});
	},


	update : function(afterAction) {
		const name = this.template.find('[name="name"]').val();
		const mobile1 = this.template.find('[name="mobile1"]').val();
		const mobile2 = this.template.find('[name="mobile2"]').val();
		const mobile3 = this.template.find('[name="mobile3"]').val();
		const membershipNo = this.template.find('[name="membershipNo"]').val();
		if (!this.checkValidate(name, mobile1, mobile2, mobile3, membershipNo)) {
			return;
		}


		const memberId1 = this.template.find('[name="memberId1"]').val();
		const memberId2 = this.template.find('[name="memberId2"]').val();

		const birthdayInput = this.template.find('[name="birthday"]').val().trim();
		const birthday = birthdayInput !== '' ?
				birthdayInput : new Date(new Date().getFullYear(), 0, 1).format('yyyy-MM-dd');

		const regDtInput = this.template.find('[name="regDt"]').val().trim();
		const regDt = regDtInput !== '' ?
				moment(regDtInput).toISOString(true) : moment().toISOString(true);

		const paramData = {
			member : {
				// 필수사항
				seqMember : this.template.find('[name="seqMember"]').val(),
				name : name,
				sex : this.template.find('[name="sex"]:checked').val(),
				mobile : mobile1 + '-' + mobile2 + '-' + mobile3,
				smsAgreeYn : this.template.find('[name="smsAgreeYn"]:checked').val() === 'Y' ? 'Y' : 'N',
				membershipNo : membershipNo,
				inboundState : this.template.find('[name="inboundState"]:checked').val(),

				// 선택사항
				regDt : regDt,
				imgUrl : this.template.find('[name="imgUrl"]').val(),
				seqPartnerCoach : this.template.find('[name="seqPartnerCoach"]').val(),
				inboundPathAttr : this.template.find('[name="inboundPathAttr"]').val(),
				recommendMember : this.template.find('[name="recommendMember"]').val(),
				birthday : birthday,
				zipCode : this.template.find('[name="zipCode"]').val(),
				address : this.template.find('[name="address"]').val(),
				addressDetail : this.template.find('[name="addressDetail"]').val(),
				memberId : (memberId1 !== '' && memberId2 !== '') ? memberId1 + '@' + memberId2 : undefined,
				memo : this.template.find('[name="memo"]').val()
			}
		};


		MemberController.update(paramData, function(resultData) {
			alert('수정 되었습니다');
			if (afterAction === '상품 판매') {
				location.href = '/manager/member/memberSelectProduct/' + resultData.data.member.seqMember;

			} else {
				memberRegistPopup.close();
				location.reload();
			}
		});
	},


	checkValidate : function(name, mobile1, mobile2, mobile3, membershipNo) {
		name = this.template.find('[name="name"]').val();
		if (name === '') {
			alert('회원명을 입력해주세요');
			return false;
		}


		mobile1 = this.template.find('[name="mobile1"]').val();
		mobile2 = this.template.find('[name="mobile2"]').val();
		mobile3 = this.template.find('[name="mobile3"]').val();
		if (mobile1 === '' || mobile2 === '' || mobile3 === '') {
			alert('휴대전화번호를 입력해주세요');
			return false;
		}


		membershipNo = this.template.find('[name="membershipNo"]').val();
		if (membershipNo === '') {
			alert('회원번호를 입력해주세요');
			return false;
		}


		if (!this.data.isUsableMobile) {
			alert('휴대전화번호를 확인해주세요');
			return false;
		}


		if (!this.data.isUsableMembershipNo) {
			alert('회원 번호를 확인해주세요');
			return false;
		}

		if (!this.data.isUsableEntranceBarcode) {
			alert('이미 등록된 바코드 번호입니다.');
			return false;
		}

		return true;
	},


	checkUsableMembershipNo : function(membershipNo) {
		this.data.setIsUsableMembershipNo(false);

		this.template.find('[data-msg="invalidMembershipNo"]').hide();
		if (membershipNo.length < 4) {
			this.template.find('[data-msg="invalidMembershipNo"]').show();
			popHeight();

			return;
		}


		const data = {
			member : {
				seqMember : this.template.find('[name="seqMember"]').val(),
				membershipNo : membershipNo
			}
		};

		MemberController.isUsableMembershipNo(data, function(returnData) {
			memberRegistPopup.template.find('[data-msg="inUsingMembershipNo"]').hide();
			if (returnData.resultCode === '1101') {
				memberRegistPopup.template.find('[data-msg="inUsingMembershipNo"]').show();
			} else if (returnData.resultCode === '000') {
				memberRegistPopup.data.setIsUsableMembershipNo(true);
			}
			popHeight();
		});
	},


	checkUsableMobile : function() {
		this.data.setIsUsableMobile(false);

		const mobile1 = this.template.find('[name="mobile1"]').val();
		const mobile2 = this.template.find('[name="mobile2"]').val();
		const mobile3 = this.template.find('[name="mobile3"]').val();

		if (mobile1 === '' || mobile2 === '' || mobile3 === '') {
			return null;
		}


		const data = {
			member : {
				seqMember : this.template.find('[name="seqMember"]').val(),
				mobile : mobile1 + '-' + mobile2 + '-' + mobile3
			}
		};
		MemberController.checkUsableMobile(data, function(resultData) {
			memberRegistPopup.template.find('[data-msg="inUsingMobile"]').hide();

			if (resultData.resultCode === '1102') {
				memberRegistPopup.template.find('[data-msg="inUsingMobile"]').show();

			} else {
				memberRegistPopup.data.setIsUsableMobile(true);

				if (!memberRegistPopup.template.find('[name="seqMember"]').val()) {
					memberRegistPopup.template.find('[name="membershipNo"]').val('');
					MemberController.generateMembershipNo(mobile3, function(data) {
						memberRegistPopup.data.setIsUsableMembershipNo(true);
						memberRegistPopup.template.find('[data-msg="inUsingMembershipNo"]').hide();
						memberRegistPopup.template.find('[name="membershipNo"]').val(data.member.membershipNo);
					});
				}
			}

			popHeight();
		});
	},


	checkUsableBarcode : function() {
		if (this.barcodeTemplate.value !== "") {
			const data = {
				member : {
					entranceBarcode : this.barcodeTemplate.value
				}
			};
			MemberController.checkUsableEntranceBarcode(data, function(resultData) {
				if (resultData.resultCode === '000') {
					memberRegistPopup.data.setIsUsableEntranceBarcode(true);
				} else if (resultData.resultCode === '1104') {
					memberRegistPopup.data.setIsUsableEntranceBarcode(false);
				}
			});
		} else {
			memberRegistPopup.data.setIsUsableEntranceBarcode(true);
		}
	},


	postCode : function() {
		const $zipCode = this.template.find('[name="zipCode"]');
		const $address = this.template.find('[name="address"]');

		searchAddress.execDaumPostcode($zipCode, $address);
	},


	computeAge : function(age) {
		const birthYear = (age !== '' ? new Date().getFullYear() - age + 1 : new Date().getFullYear());
		memberRegistPopup.template.find('[name="birthday"]').datepicker("setDate", new Date(birthYear, 0, 1));
	},


	searchRecommendMember : function(searchName) {
		const paramData = {
			member : {
				name : searchName
			}
		};

		MemberController.searchByName(paramData, function(data) {
			const memberListOnSearched = data.memberList.map(function(value, idx) {
				return `
					<li>
						<input type="radio" name="recommendMemberCandidate" id="${idx}" value="${value.seq_member}"/>
						<label for="${idx}">
							<strong>${value.name}</strong><span>${value.sex === 'M' ? '남자' : '여자'} / ${value.mobile}</span>
						</label>
					</li>
				`;
			});

			const dataHtml = memberListOnSearched.length > 0 ? memberListOnSearched.join('') : '<li>검색 결과가 없습니다.</li>';
			const $searchMemberResult = memberRegistPopup.template.find('[data-draw-target="추천회원 검색 결과 목록 컨테이너"]');
			$searchMemberResult.empty().html(dataHtml);

			memberRegistPopup.template.find('[data-visual-target="추천회원 검색 결과 목록 컨테이너"]').show(300);
		});
	},


	selectRecommendMember : function($selector) {
		const memberName = $selector.closest('li').find('strong').text();
		this.template.find('[name="recommendMember"]').val($selector.val());
		this.template.find('[name="recommendMemberName"]').val(memberName);
		this.template.find('[data-visual-target="추천회원 검색 결과 목록 컨테이너"]').hide(300);
	},


	uploadProfileImage : function() {
		if ($('input[name="memberImg"]').val().length === 0) {
			return;
		}


		const form = new FormData(document.getElementById('frmMemberImg'));
		CommonController.upload(form, function(data) {
			$('#memberImg').attr('src', data.imgUrl);
			$('#imgUrl').val(data.imgUrl);
		});
	}
};


$(function() {
	$(document).on('click', '[data-popup="registMember"] [data-function="close"]', function(event) {
		event.preventDefault();
		memberRegistPopup.close();
	});


	// [우편번호 찾기] 버튼 클릭
	$(document).on('click', '[data-popup="registMember"] [data-function="주소 검색"]', function(event) {
		event.preventDefault();
		memberRegistPopup.postCode();
	});


	// [등록 완료] 버튼 클릭
	$(document).on('click', '[data-popup="registMember"] [data-function="회원 가입"]', function() {
		const afterAction = $(this).data('function-after-action');
		memberRegistPopup.regist(afterAction);
	});


	// [수정 완료] 버튼 클릭
	$(document).on('click', '[data-popup="registMember"] [data-function="회원 정보 수정"]', function() {
		const afterAction = $(this).data('function-after-action');
		memberRegistPopup.update(afterAction);
	});


	// [추천회원] 키 입력 후 [엔터]
	$(document).on('keydown', '[data-popup="registMember"] input[data-function="추천 회원 검색"]', function(event) {
		if (event.keyCode !== 13) {
			return;
		}


		let searchName = $(this).val().trim();
		if (searchName === '') {
			return false;
		}
		event.preventDefault();

		memberRegistPopup.searchRecommendMember(searchName);
	});


	// [추천회원::회원 검색] 버튼 클릭
	$(document).on('click', '[data-popup="registMember"] button[data-function="추천 회원 검색"]', function(event) {
		event.preventDefault();

		const searchName = $('input[name="recommendMemberName"]').val().trim();
		if (searchName === '') {
			return false;
		}

		memberRegistPopup.searchRecommendMember(searchName);
	});


	// [휴대전화번호] 에서 포커스 잃을 시 중복휴대번호 검색
	$(document).on('focusout', '[data-popup="registMember"] [name=mobile1], [data-popup="registMember"] [name=mobile2], [data-popup="registMember"] [name=mobile3]', function() {
		memberRegistPopup.checkUsableMobile();
	});
	// [바코드번호] 에서 포커스 잃을 시 중복휴대번호 검색
	$(document).on('focusout', '[id="inputInsertBarcode"]', function() {
		memberRegistPopup.checkUsableBarcode();
	});

	// [회원 번호] 에서 포커스 잃을 시 회원 번호 유효성, 중복 체크
	$(document).on('focusout', '[data-popup="registMember"] [name="membershipNo"]', function() {
		memberRegistPopup.checkUsableMembershipNo($(this).val().trim());
	});


	// [나이] 항목에 값 입력
	$(document).on('focusout', '[data-popup="registMember"] [name="age"]', function() {
		memberRegistPopup.computeAge($(this).val().trim());
	});


	// [추천 회원] 검색 후 검색 결과 영역 밖을 선택(클릭)했을 때
	$(document).on('click', function(e) {
		let $searchInput = $('[data-visual-target="추천회원 검색 결과 목록 컨테이너"]');
		if (!$searchInput.has(e.target).length) {
			$($searchInput).hide(300);
		}
	});


	// [추천 회원] 후 회원 선택
	$(document).on('change', '[data-popup="registMember"] [name="recommendMemberCandidate"]', function() {
		memberRegistPopup.selectRecommendMember($(this));
	});


	$(document).on('change', '[data-popup="registMember"] [name="memberImg"]', function() {
		memberRegistPopup.uploadProfileImage();
	});


	$(document).on('click', '[data-popup="registMember"] [data-action="카메라 팝업 열기"]', function() {
		cameraPopup.open(function(data) {
			$('#memberImg').attr('src', data.imgUrl);
			$('#imgUrl').val(data.imgUrl);
		});
	});
});
