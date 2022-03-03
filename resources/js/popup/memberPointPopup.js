const memberPointPopup = {
	data : {
		member : ''
	},
	template : '',
	changeCbFunc : '',
	
	setData : function(data) {
		this.data = data;
	},
	
	setTemplate : function(template) {
		this.template = template;
	},
	
	setChangeCbFunc : function(changeCbFunc) {
		this.changeCbFunc = changeCbFunc;
	},
	
	
	open : function(data, changeCbFunc) {
		const $popupLocation = $('[data-popup-location="팝업 위치"]');
		$popupLocation.append(memberPointPopupTemplate.prepare(data));
		
		this.setData(data);
		this.setTemplate($popupLocation.find('[data-popup="회원 포인트"]'));
		this.setChangeCbFunc(changeCbFunc);
		this.template.fadeIn(300);
		popHeight();
	},
	
	
	close : function() {
		this.template.fadeOut(300, function() {
			memberPointPopup.template.remove();
		});
	},
	
	
	changePoint : function(change, point) {
		const memberPointOnSaved = Number(this.data.member.point);
		const pointOnNumber = Number(point);
		switch (change) {
			case '적립' :
				this.data.member.point = memberPointOnSaved + pointOnNumber;
				break;
			case '차감' :
				this.data.member.point = memberPointOnSaved - pointOnNumber;
				break;
			case '수정' :
				this.data.member.point = pointOnNumber;
				break;
			default :
				return false;
		}
		
		const memberData = {
			searchParamMap : {
				seqMember : this.data.member.seq_member
			},
			member : {
				point : this.data.member.point
			}
		};
		MemberController.updatePoint(memberData, function(resultData) {
			if (resultData.resultCode === '000') {
				alert('수정되었습니다.');
				
				memberPointPopup.template.find('[data-msg="현재 포인트"]').text(numberWithCommas(resultData.data.member.point));
				memberPointPopup.template.find('[name="point"]').val('');
				if (typeof memberPointPopup.changeCbFunc === 'function') {
					memberPointPopup.changeCbFunc(resultData.data.member);
				}
			}
		});
	}
};


const memberPointPopupTemplate = {
	prepare : function(data) {
		const member = data.member;
		return `
			<div class="popup" data-popup="회원 포인트">
				<div class="box" style="width: 470px !important;">
					<h2>회원 포인트</h2>
					<div class="pop_con">
						<fieldset>
							<p>
								<span class="label">현재 포인트</span>
								<span class="label"><span data-msg="현재 포인트">${numberWithCommas(member.point)}</span> point</span>
							</p>
							<p>
								<span class="label">적립</span>
								<input name="point" type="number" placeholder="적립 포인트" style="width: 150px;" title="적립 포인트">
								<button class="btn green" data-action="포인트 변경" data-change="적립">적립</button>
							</p>
							<p>
								<span class="label">차감</span>
								<input name="point" type="number" placeholder="차감 포인트" style="width: 150px;" title="차감 포인트">
								<button class="btn red" data-action="포인트 변경" data-change="차감">차감</button>
							</p>
							<p>
								<span class="label">수정</span>
								<input name="point" type="number" placeholder="수정 포인트" style="width: 150px;" title="수정 포인트">
								<button class="btn blue" data-action="포인트 변경" data-change="수정">수정</button>
							</p>
						</fieldset>
					</div>
					
					<div class="pop_btn">
						<button data-action="팝업 닫기" class="btn gray">닫기</button>
					</div>
					<a class="close" data-action="팝업 닫기">팝업 닫기</a>
				</div>
			</div>
		`;
	}
};


$(function() {
	$(document).on('click', '[data-popup="회원 포인트"] [data-action="팝업 닫기"]', function(event) {
		event.preventDefault();
		memberPointPopup.close();
	});
	
	
	$(document).on('click', '[data-popup="회원 포인트"] [data-action="포인트 변경"]', function(event) {
		event.preventDefault();
		
		const point = $(this).siblings('[name="point"]').val();
		if (point === '') {
			alert('포인트를 입력해주세요.');
			return false;
		}
		
		
		if (!Number.isInteger(Number(point)) || Number(point) < 1) {
			alert('1 이상의 정수값을 입력해주세요.');
			return false;
		}
		
		memberPointPopup.changePoint($(this).data('change'), point);
	});
});