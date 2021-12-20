const popupMemberCounseling = {
	popup : undefined,
	mode : "create",
	data : {},
	callback : undefined,
	open : function(seqMember, seqMemberCounseling, callback) {
		if(this.popup) return;
		this.mode = (seqMemberCounseling) ? "update" : "create";
		this.callback = callback;
		Promise.all([
			memberController.counselingForm({
				member : {
					seqMember : seqMember
				}
			}),
			(seqMemberCounseling) ? memberCounselingController.select({
				searchParamMap : {
					seqMemberCounseling : seqMemberCounseling,
				}
			}) : {}
		]).then(([formData, counselingInfo]) => {
			this.data = formData;
			this.data.counselingInfo = (counselingInfo.data) ? counselingInfo.data.memberCounseling : {};
			this.data.seqMember = seqMember;
			this.data.seqMemberCounseling = seqMemberCounseling;
			this.render();
		}).catch(error => {
			uiError(error);
		});
	},
	close : function() {
		this.popup = undefined;
		uiPopup();
		if(this.callback) this.callback();
	},
	render : function() {
		const self = this.event.self = this;
		this.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					cancel : function() {self.event.cancel();},
					remove : function() {self.event.remove();},
					update : function() {self.event.update();},
					create : function() {self.event.create();},
				}
			}
		});
		uiCalendar(this.popup);
		this.popup.putValue("seqPartnerCoach", partnerInfo.employee.id);
		if(this.mode == "update") this.prepare();
	},
	prepare : function() {
		const data = this.data.counselingInfo;
		this.popup.putValue("counselingDate", getCalendar(new Date(data.counseling_date)));
		this.popup.putValue("counselingMeansAttr", data.counseling_means_attr);
		this.popup.putValue("seqPartnerCoach", data.seqPartnerCoach);
		this.popup.putValue("counselingPurpose", data.counseling_purpose);
		this.popup.putValue("memo", data.memo);
	},
	event : {
		cancel : function() {
			this.self.close();
		},
		remove : function() {
			if(!confirm("정말로 삭제하시겠습니까?")) return;
			memberCounselingController.delete({
				memberCounseling : {
					seqMemberCounseling : this.self.data.seqMemberCounseling,
				}
			}).then(data => {
				alert("삭제되었습니다.");
				this.self.close();
			}).catch(error => {
				uiError(error);
			});
		},
		update : function() {
			const memo = uiSafeValue(this.self.popup.getValue("memo"));
			const seqMemberCounseling = this.self.data.seqMemberCounseling;
			memberCounselingController.update({
				memberCounseling : {
					seqMemberCounseling : seqMemberCounseling,
					memo : memo
				}
			}).then(data => {
				alert("수정되었습니다.");
				this.self.close();
			}).catch(error => {
				uiError(error);
			});
		},
		create : function() {
			const popup = this.self.popup;
			const data = {
				memberCounseling : {
					seqMember : this.self.data.seqMember,
					counselingDate : new Date(popup.getValue("counselingDate")).toISOString(),
					seqPartnerCoach : popup.getValue("seqPartnerCoach"),
					counselingMeansAttr : popup.querySelector("[name='counselingMeansAttr']").value,
					counselingPurpose : popup.querySelector("[name='counselingPurpose']").value,
					memo : uiSafeValue(popup.querySelector("[name='memo']").value)
				}
			};
			if(!this.check(data)) return;

			memberCounselingController.insert(data).then(data => {
				alert("등록되었습니다.");
				this.self.close();
			}).catch(error => {
				uiError(error);
			});
		},
		check : function(data) {
			data = data.memberCounseling;
			const checkList = ["seqMember", "counselingDate", "seqPartnerCoach", "counselingMeansAttr", "memo"];
			let error = "";
			for(let i = 0; i < checkList.length; i++) {
				const name = checkList[i];
				const value = data[name];
				switch(name) {
					case "seqMember" : if(!value) error = "회원 검색 후 회원을 선택해 주세요."; break;
					case "counselingDate" : if(!value) error = "상담 날짜를 입력해 주세요."; break;
					case "seqPartnerCoach" : if(!value) error = "상담 담당자를 선택해 주세요."; break;
					case "counselingMeansAttr" : if(!value) error = "상담 수단을 선택해 주세요."; break;
					case "memo" : if(!value) error = "상담 내용을 입력해 주세요."; break;
				}
				if(error) {
					alert(error);
					return false;
				}
			}
			return true;
		}
	},
	template : function() {
		const isDisable = (this.mode == "update") ? "disabled" : "";
		const getOptionList = (name) => {
			const data = this.data[name] || [];
			const option = data.map(item => {
				return `<option value="${item.seq_attr_value}">${item.attr_value}</option>`
			});
			return option.join("");
		};
		const getCoachList = () => {
			const data = this.data.coachList || [];
			const option = data.map(item => {
				return `<option value="${item.seq_partner_coach}">${item.coach_name}</option>`
			});
			return option.join("");
		};
		const getButton = () => {
			return (this.mode == "update") ? `
				<button class="ui-button gray" data-event="cancel">취소</button>
				<button class="ui-button red" data-event="remove">삭제</button>
				<button class="ui-button green" data-event="update">수정</button>
			` : `
				<button class="ui-button gray" data-event="cancel">취소</button>
				<button class="ui-button" data-event="create">등록</button>
			`;
		};
		return `
			<style type="text/css">
				.popupMemberCounseling input,
				.popupMemberCounseling select		{vertical-align:middle; width:147.5px !important; font-size:13px}
				.popupMemberCounseling textarea		{font-size:13px}
				.popupMemberCounseling table		{line-height:auto}
				.popupMemberCounseling table td		{font-size:0}
			</style>
			<div class="popupMemberCounseling tiny">
				<div class="top">
					<h2>고객 상담<a data-event="cancel"></a></h2>
				</div>
				<div class="middle ui-form">
					<table>
						<tr>
							<th>상담 날짜</th>
							<td><input name="counselingDate" type="calendar" value="today" ${isDisable}></td>
						</tr>
						<tr>
							<th>상담 담당자</th>
							<td>
								<!--
								<select class="ui-select" name="center" ${isDisable}>
									<option value="">지점 선택</option>
								</select>
								-->
								<select class="ui-select" name="seqPartnerCoach" ${isDisable}>
									<option value="">담당자 선택</option>
									${getCoachList()}
								</select>
							</td>
						</tr>
						<tr>
							<th>상담 수단 및 목적</th>
							<td>
								<select class="ui-select" name="counselingMeansAttr" ${isDisable}>
									<option value="">상담 수단</option>
									${getOptionList("counselingMeansList")}
								</select>
								<select class="ui-select" name="counselingPurpose" ${isDisable}>
									<option value="">상담 목적</option>
									${getOptionList("counselingPurposeList")}
								</select>
							</td>
						</tr>
						<tr>
							<th>상담 내용</th>
							<td>
								<textarea class="ui-textarea" name="memo" maxlength="1000" placeholder="상담 내용을 입력해 주세요."></textarea>
							</td>
						</tr>
					</table>
				</div>
				<div class="bottom">
					${getButton()}
				</div>
			</div>
		`;
	}
}
