const memberNonPaymentReasonPopup = {
	template : '',
	memberRegistData : '',
	registCbFunc : '',
	
	setTemplate : function(template) {
		this.template = template
	},
	
	setMemberRegistData : function(memberRegistData) {
		this.memberRegistData = memberRegistData;
	},
	
	setRegistCbFunc : function(registCbFunc) {
		this.registCbFunc = registCbFunc
	},
	
	
	open : function($popupLocationSelector, memberRegistData, registCbFunc) {
		const data = {
			searchParamMap : {
				attrName : 'member_non_payment_reason.value'
			}
		};
		AttrController.selectList(data, function(resultData) {
			$popupLocationSelector.append(memberNonPaymentReasonPopupTemplate.prepare(resultData.data.attrValueList));
			memberNonPaymentReasonPopup.setTemplate($popupLocationSelector.find('[data-popup="미결제 사유"]'));
			memberNonPaymentReasonPopup.setMemberRegistData(memberRegistData);
			memberNonPaymentReasonPopup.setRegistCbFunc(registCbFunc);
			memberNonPaymentReasonPopup.template.fadeIn(300);
			popHeight();
		});
		
	},
	
	
	close : function() {
		this.template.fadeOut(300, function() {
			memberNonPaymentReasonPopup.template.remove();
		});
	},
	
	
	regist : function() {
		const $nonPaymentReasonOnChecked = this.template.find('[name="memberNonPaymentReason"]:checked');
		
		const nonPaymentReasonOnCheckedArr = [];
		$nonPaymentReasonOnChecked.each(function() {
			nonPaymentReasonOnCheckedArr.push({
				value : $(this).val()
			});
		});
		this.memberRegistData.memberNonPaymentReasonList = nonPaymentReasonOnCheckedArr;
		
		
		const description = this.template.find('[name="description"]').val().trim();
		if (description !== '') {
			this.memberRegistData.memberNonPaymentReasonEtc = {
				description : description
			};
		}
		
		
		if (typeof this.registCbFunc === 'function') {
			this.registCbFunc(this.memberRegistData);
			this.close();
		}
	}
};


const memberNonPaymentReasonPopupTemplate = {
	prepare : function(data) {
		const memberNonPaymentReasonArr = data.map(function(value) {
			return `
				<input type="checkbox" name="memberNonPaymentReason"
						id="nonPaymentReason_${value.seq_attr_value}" value="${value.seq_attr_value}"/>
				<label for="nonPaymentReason_${value.seq_attr_value}" style="margin-left: 0; width: 23%;">${value.attr_value}</label>
			`;
		});
		
		return `
			<div class="popup" data-popup="미결제 사유">
				<div class="box" style="width: 550px !important;">
					<h2>미결제 사유</h2>
					<div class="pop_con">
						<div class="partner_coach">
							${memberNonPaymentReasonArr.join('')}
							<div style="margin-top: 7px">
								<span class="label">기타</span>
								<input type="text" name="description" style="width: 60%; margin-left: 15px"/>
							</div>
						</div>
					</div>
					<div class="pop_btn">
						<button data-action="닫기" type="button" class="btn gray">닫기</button>
						<button data-action="등록" type="button" class="btn green">등록</button>
					</div>
					
					<a class="close" data-action="닫기">팝업 닫기</a>
				</div>
			</div>
		`;
	}
};


$(function() {
	$(document).on('click', '[data-popup="미결제 사유"] [data-action="등록"]', function() {
		memberNonPaymentReasonPopup.regist();
	});
	
	
	$(document).on('click', '[data-popup="미결제 사유"] [data-action="닫기"]', function() {
		memberNonPaymentReasonPopup.close();
	});
});