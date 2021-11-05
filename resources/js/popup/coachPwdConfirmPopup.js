const coachPwdConfirmPopup = {
	template : '',
	data : '',
	
	
	setTemplate : function(template) {
		this.template = template;
	},
	
	
	setData : function(data) {
		this.data = data;
	},
	
	
	open : function($popupLocationSelector, data) {
		$popupLocationSelector.append(coachPwdConfirmPopupTemplate.prepareTemplate());
		this.setTemplate($popupLocationSelector.find('[data-popup="강사 비밀번호 확인"]'));
		this.template.css('z-index', 1050);
		this.setData(data);
		
		this.template.fadeIn(300);
		this.template.find('[name="pwd"]').focus();
		popHeight();
	},
	
	
	close : function() {
		this.template.fadeOut(300, function() {
			coachPwdConfirmPopup.template.remove();
		});
	},
	
	
	confirmPwd : function() {
		const inputPwd = this.template.find('[name="pwd"]').val();
		if (inputPwd === '') {
			alert('비밀번호를 입력해주세요');
			return;
		}
		
		this.data.searchParamMap.pwd = inputPwd;
		
		CoachController.confirmPwd(this.data, function(resultData) {
			if (resultData.resultCode === '1301') {
				alert('로그인에 실패하였습니다. \n비밀번호가 일치하지 않습니다.');
				coachPwdConfirmPopup.template.find('[name="pwd"]').val('');
				
			} else {
				const dataParam = {
					seqPartnerCoach : resultData.data.coach.seq_partner_coach,
					type : 'COACH'
				};
				LoginController.changeLogin(dataParam);
			}
		});
	}
};


const coachPwdConfirmPopupTemplate = {
	prepareTemplate : function() {
		return this._build();
	},
	
	
	_build : function() {
		return `
		<div class="popup" data-popup="강사 비밀번호 확인">
			<div class="box" style="width: 400px !important;">
				<h2>로그인 비밀번호 입력</h2>
				<div class="pop_con">
					<p style="margin: 10px 0; font-size: 15px;">
						선택한 사용자의 비밀번호를 입력해 주세요.
					</p>
					<p>
						<input name="pwd" type="password" placeholder="비밀번호 입력"
							   style="width: 250px; margin-right: 25px;">
					</p>
				</div>
				<div class="pop_btn">
					<button data-action="팝업 닫기" class="btn gray">취소</button>
					<button data-action="로그인 시도" class="btn green">확인</button>
				</div>
				<a class="close" data-action="팝업 닫기">팝업 닫기</a>
			</div>
		</div>`;
	}
};


$(function() {
	$(document).on('click', '[data-popup="강사 비밀번호 확인"] [data-action="팝업 닫기"]', function(event) {
		event.preventDefault();
		coachPwdConfirmPopup.close();
	});
	
	
	$(document).on('click', '[data-popup="강사 비밀번호 확인"] [data-action="로그인 시도"]', function(event) {
		event.preventDefault();
		coachPwdConfirmPopup.confirmPwd();
	});
	
	
	// 비밀번호 입력 후 엔터
	$(document).on('keydown', '[data-popup="강사 비밀번호 확인"] input[name="pwd"]', function(event) {
		if (event.keyCode !== 13) {
			return;
		}
		event.preventDefault();
		
		const inputPwd = $(this).val().trim();
		if (inputPwd === '') {
			return false;
		}
		
		coachPwdConfirmPopup.confirmPwd();
	});
});