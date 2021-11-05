$(function() {
	contextPopup = new ContextPopup();
	$(document).on('click', '.state_change [data-function=close]', function() {
		contextPopup.close();
	});

	// [확인] 버튼 클릭
	$(document).on('click', '.state_change [data-function=updateSchedule]', function() {
		if (contextPopup.scheduleData.method === 'insertPastSchedule') {
			contextPopup.insertPastSchedule(function(context) {
				context.close();
				schedulePopup.closePopup();
			});

		} else {
			contextPopup.updatePromiseSchedule();
		}
	});
});


// 이용권 가감 팝업
var ContextPopup = function() {
	this.popupObj = $('.state_change'),
	this.scheduleData,
	this.eventData,
	this.eventFuncName,
	this.usageProductInfo,
	this.changeTicketCnt,

	this._init = function(scheduleData, ticketInfo, eventData, eventFuncName) {
		this.scheduleData = scheduleData;
		this.usageProductInfo = ticketInfo.usageProductInfo;
		this.changeTicketCnt = ticketInfo.changeTicketCnt;

		this.eventData = eventData;
		this.eventFuncName = eventFuncName;
	},

	this._open = function() {
		this.popupObj.fadeIn(300);
		popHeight(); // 화면 정렬을 위한 팝업 사이즈 높이 값 계산
	},

	this.close = function() {
		$(this.popupObj).fadeOut(300, function() {
			$(this).find('.fl, .fr, .after_change').attr('style', '')
		});
	},

	this.selectDetailPromiseSchedule = function(eventData, funcName, cbFunc) {
		$.ajax({
			type : 'GET',
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			url : '/manager/schedule/promise/json/detailPromiseSchedule',
			data : {
				seqSchedule : eventData.seq_schedule,
				scheduleId : eventData.id,
				seqCoach : eventData.section_id
			},
			context: this,
			dataType : 'json',
			success : function(returnData) {
				if (returnData.RESULT !== 'SUCCESS') {
					alert('에러가 발생하였습니다.');
					return;
				}

				let scheduleInfo = returnData.DATA;
				if (funcName === 'modify_schedule') {
					if (typeof cbFunc === 'function') {
						this._init(scheduleInfo, '', eventData, funcName);
						cbFunc();
					}

				} else if (funcName === 'sendSms') {
					if (typeof cbFunc === 'function') {
						cbFunc(scheduleInfo);
					}

				} else {
					scheduleInfo.scheduleState = funcName;
					scheduleInfo.nowState = eventData.now_state;

					if (scheduleInfo.seqPassInfo === 0 || scheduleInfo.seqPassInfo === -999) {
						scheduleInfo.productName = 'OT 상품';
						scheduleInfo.appointmentName = '';

						const ticketInfo = {
							usageProductInfo : {
								useNumberType : 'F',
								remainNumber : '1회권 상품입니다.',
								remainDate : '제한없음',
								passName : '1회권 상품',
								lessonName : '1회권 상품'
							},
							changeTicketCnt : 0
						};

						if (typeof cbFunc === 'function') {
							this._init(scheduleInfo, ticketInfo, eventData, funcName);
							cbFunc();
						}

					} else if (scheduleInfo.seqPassInfo === -100) {
						scheduleInfo.productName = '상담 예약';
						scheduleInfo.appointmentName = '';

						const ticketInfo = {
							usageProductInfo : {
								useNumberType : 'F',
								remainNumber : '상담 예약',
								remainDate : '제한없음',
								passName : '상담 예약',
								lessonName : '상담 예약'
							},
							changeTicketCnt : 0
						};

						if (typeof cbFunc === 'function') {
							this._init(scheduleInfo, ticketInfo, eventData, funcName);
							cbFunc();
						}

					} else {
						this._selectDetailPromiseScheduleTicket(scheduleInfo, function(ticketInfo, context) {
							context._init(scheduleInfo, ticketInfo, eventData, funcName);

							if (typeof cbFunc === 'function') {
								cbFunc();
							}
						});
					}
				}
			}
		});
	},

	this._selectDetailPromiseScheduleTicket = function(params, cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			url : '/manager/schedule/promise/json/detailPromiseScheduleTicket',
			data : params,
			context: this,
			dataType : 'json',
			success : function(returnData) {
				if (returnData.usageProductInfo === undefined) {
					alert('이용권 내역을 불러올 수 없습니다. 이용권을 확인해주세요.');
					return;
				}
				if (typeof cbFunc === 'function') {
					cbFunc(returnData, this);
				}
			},
			error : function() {
				alert('오류가 발생하였습니다.');
			}
		});
	},

	this.updatePromiseSchedule = function() {
//		if (this.scheduleData.nonmemberName !== '' && this.scheduleData.nonmemberMobile !== '') { //미등록 회원여부
		if (this.scheduleData.seqMember == 0) { //미등록 회원여부
			var title = this.scheduleData.nonmemberName + '_'
				+ this._convertScheduleState(this.eventFuncName) + '_'
				+ this.scheduleData.nonmemberMobile + '_'
				+ this.scheduleData.productName + ' - '
				+ this.scheduleData.appointmentName;

		} else {
			var title = this.scheduleData.memberName + '_'
				+ this._convertScheduleState(this.eventFuncName) + '_'
				+ this.scheduleData.mobile + '_'
				+ this.scheduleData.productName + ' - '
				+ this.scheduleData.appointmentName;
		}

		let params = {
			status: this.eventFuncName,
			nowState: this.scheduleData.nowState,
			seqSchedule: this.scheduleData.seqSchedule,
			scheduleId: this.scheduleData.scheduleId,
			startDate: this.scheduleData.startDate,
			endDate: this.scheduleData.endDate,
			seqCoach: this.scheduleData.seqCoach,
			title: title,
			memberId: this.scheduleData.seqMember,
			productId: this.scheduleData.seqProduct,
			productPassId: this.scheduleData.seqProductPass,
			paymentId: this.scheduleData.seqPayment,
			voucherMinusYn : this.scheduleData.voucherMinusYn,
			memo: this.scheduleData.memo,
			nonmemberName: this.scheduleData.nonmemberName,
			nonmemberMobile: this.scheduleData.nonmemberMobile,
			coachName: this.scheduleData.coachName,
			memberName: this.scheduleData.memberName,
			productName: this.scheduleData.productName,
			classTime: this.scheduleData.classTime,
			appointmentName: this.scheduleData.appointmentName,
			seqPassInfo: this.scheduleData.seqPassInfo
		};

		params = Object.assign({}, params, {
			startDate: moment(params.startDate).toISOString(true),
			endDate: moment(params.endDate).toISOString(true),
			scheduleState: params.status,
			seqPartnerCoach: Number.parseInt(params.seqCoach, 10) || 0,
			seqMember: Number.parseInt(params.memberId, 10) || 0,
			seqPartnerProduct: Number.parseInt(params.productId, 10) || 0,
			seqPartnerProductPass: Number.parseInt(params.productPassId, 10) || 0,
			seqPartnerPayment: Number.parseInt(params.paymentId, 10) || 0,
			seqPassInfo: Number.parseInt(params.seqPassInfo, 10) || 0,
		});

		if(!params.startDate || !params.endDate) {
			alert("시작날짜와 종료날짜를 확인해 주세요.");
			return;
		} else {
//			console.log("startDate : " + params.startDate + ", endDate : " + params.endDate);
		}

		AppointmentTypeScheduleController.updatePromiseSchedule(params).then(returnData => {
			const resultData = new ResultData(returnData);
			if (resultData.isSuccess()) {
				this.close();
				schedulePopup.resetReload();
				return;
			}

			if (resultData.isErrOfUseLimitOver()) {
				const message = resultData.getMsgForCustomer();
				if (confirm(message + ' 그래도 수행하시겠습니까?')) {
					AppointmentTypeScheduleController.changeScheduleStateOutOfWeeklyLimit(params).then(returnData => {
						const resultData = new ResultData(returnData);
						if (resultData.isSuccess()) {
							this.close();
							schedulePopup.resetReload();
						} else {
							alert(resultData.getMsgForCustomer());
						}
					});
				}
			} else {
				alert(resultData.getMsgForCustomer());
			}
		});
	},


	// 지난 개인레슨 이용권에 출석회원 추가하기
	this.insertPastSchedule = function(cbFunc) {
		const params = Object.assign({}, this.scheduleData, {
			startDate : moment(this.scheduleData.startDate).toISOString(true),
			endDate : moment(this.scheduleData.endDate).toISOString(true),
			seqPartnerCoach : Number.parseInt(this.scheduleData.seqCoach, 10) || 0,
			seqPartnerPayment : Number.parseInt(this.scheduleData.seqPayment, 10) || 0,
			seqPartnerProduct : Number.parseInt(this.scheduleData.seqProduct, 10) || 0,
			seqPartnerProductPass : Number.parseInt(this.scheduleData.seqProductPass, 10) || 0,
		});

		if(!params.startDate || !params.endDate) {
			alert("시작날짜와 종료날짜를 확인해 주세요.");
			return;
		} else {
//			console.log("startDate : " + params.startDate + ", endDate : " + params.endDate);
		}

		AppointmentTypeScheduleController.savePastSchedule(params).then(returnData => {
			const resultData = new ResultData(returnData);
			if (resultData.isSuccess()) {
				this.close();
				schedulePopup.closePopup();
				return;
			}

			if (resultData.isErrOfUseLimitOver()) {
				const message = resultData.getMsgForCustomer();
				if (confirm(message + ' 그래도 수행하시겠습니까?')) {
					AppointmentTypeScheduleController.savePastScheduleOutOfWeeklyLimit(params).then(returnData => {
						const resultData = new ResultData(returnData);
						if (resultData.isSuccess()) {
							this.close();
							schedulePopup.closePopup();
						} else {
							alert(resultData.getMsgForCustomer());
						}
					});
				}
			} else {
				alert(resultData.getMsgForCustomer());
			}
		});
	},


	this.clickAction = function() {
		if (this.eventFuncName === 'modify_schedule') {
			schedulePopup.chkPromiseState(this.eventData);

		} else {
			this._prepareTemplate();
			this._open();
		}
	},

	this._prepareTemplate = function() {
		var beforeStateText = this._convertScheduleState(this.scheduleData.nowState);
		var changeSteteText = this._convertScheduleState(this.eventFuncName);

		var usageText = '';
		switch (this.changeTicketCnt) {
		case -1 : usageText = '1회 차감'; break;
		case 1 : usageText = '1회 복구'; break;
		case 0 : usageText = '유지'; break;
		}

		this.popupObj.find('custom-before-state').text(beforeStateText);
		this.popupObj.find('custom-change-state').text(changeSteteText);
		this.popupObj.find('custom-start-end-period').text(this._convertDateFormat());

		if (this.scheduleData.seqMember === 0) {
			this.popupObj.find('custom-member-name').text(this.scheduleData.nonmemberName);
		} else {
			this.popupObj.find('custom-member-name').text(this.scheduleData.memberName);
		}

		this.popupObj.find('custom-product-name').text(this.usageProductInfo.passName);
		this.popupObj.find('custom-appointment-info').text(this.usageProductInfo.lessonName);
		this.popupObj.find('custom-change-usage').text(usageText);

		this.popupObj.find('custom-remain-date').text(this.usageProductInfo.remainDate);

		if (this.usageProductInfo.useNumberType === 'F') {		// 무제한
			this.popupObj.find('.after_change').css({ display: 'none' });
			this.popupObj.find('.fl').css({ width: '100%' });
			this.popupObj.find('.fr').css({ display: 'none' });
			this.popupObj.find('custom-now-ticket-number').text(this.usageProductInfo.remainNumber);

		} else {
			this.popupObj.find('custom-now-ticket-number').text(this.usageProductInfo.remainNumber + '회');

			var changeCnt = parseInt(this.usageProductInfo.remainNumber) + parseInt(this.changeTicketCnt);
			this.popupObj.find('custom-change-ticket-number').text(changeCnt + '회');
		}
	},

	this._convertScheduleState = function(scheduleState) {
		var scheduleStateText = '';
		switch (scheduleState) {
		case 'R' : scheduleStateText = '예약'; break;
		case 'E' : scheduleStateText = '출석'; break;
		case 'A' : scheduleStateText = '결석'; break;
		case 'C' : scheduleStateText = '취소'; break;
		case 'W' : scheduleStateText = '예약대기'; break;
		case 'S' : scheduleStateText = '출석요청'; break;
		case 'modify_schedule' : scheduleStateText = '예약 변경'; break;
		default : scheduleStateText = '오류 상태값 없음';
		}

		return scheduleStateText;
	},

	this._convertDateFormat = function() {
		var formatFuncYYMMDD = scheduler.date.date_to_str('%Y년 %m월 %d일');
		var formatFuncHHII = scheduler.date.date_to_str('%g:%i');
		var formatFuncAmPm = scheduler.date.date_to_str('%A');

		var sDate = formatFuncYYMMDD(this.eventData.start_date);

		var sAmPm = formatFuncAmPm(this.eventData.start_date);
		var sTime = formatFuncHHII(this.eventData.start_date);

		var eAmPm = formatFuncAmPm(this.eventData.end_date);
		var eTime = formatFuncHHII(this.eventData.end_date);

		var sAmPmText = (sAmPm === 'AM') ? '오전' : '오후';
		var eAmPmText = (eAmPm === 'AM') ? '오전' : '오후';

		return sDate + ' ' + sAmPmText + sTime + '~' + eAmPmText + eTime;
	}
};

