$(function() {
	ticketPopup = new TicketPopup();
	$(document).on('click', '.state_change [data-function="close"]', function() {
		ticketPopup.close();
	});

	$(document).on('click', '.state_change [data-function="updateSchedule"]', function() {
		const seatNo = $('#ticketClassScheduleSeatNo').val();
		seatNo != null ? ticketPopup.setSeatNo(seatNo) : ticketPopup.setSeatNo(null);
		if (ticketPopup.member.method === 'insertPastSchedule') {
			ticketPopup.insertPastSchedule();
		} else {
			ticketPopup.updateClassSchedule();
		}
	});

	$(document).on('click', '.state_change_naver [data-function="close"]', function() {
		ticketPopup.close();
	});

	$(document).on('click', '.state_change_naver [data-function="updateSchedule"]', function() {
		ticketPopup.updateClassScheduleForNaver();
	});
});

var TicketPopup = function() {
	this.template = $('.state_change'),
	this.ticketData,
	this.eventFuncName,
	this.member,
	this.classPopup,

	this.setClassPopup = function(classPopup) {
		this.classPopup = classPopup;
	},
	this.setSeatNo = function(seatNo) {
		this.member.seatNo = seatNo;
	},
	this.clickAction = function(eventFuncName, chkSeqSchedule) {
		const member = this._selectMemberInfo(eventFuncName, chkSeqSchedule);

		if(member.naverBookingYn == "Y") {
			ticketPopup.template = $(".state_change_naver");
			ticketPopup._init(undefined, eventFuncName, member);
			ticketPopup._prepareTemplateForNaver();	//
			ticketPopup.open();
		} else {
			ticketPopup.template = $(".state_change");
			this._selectTicketInfo(eventFuncName, chkSeqSchedule, function(returnData, member) {
				ticketPopup._init(returnData, eventFuncName, member);
				ticketPopup._prepareTemplate(eventFuncName);
				ticketPopup.open();
			});
		}
	},

	this.open = function() {
		this.template.fadeIn(300).css('z-index', 1010);
		popHeight();
	},

	this.close = function(cbFunc) {
		this.template.fadeOut(300);
	},

	this._init = function(ticketData, eventFuncName, member) {
		this.ticketData = ticketData;
		this.eventFuncName = eventFuncName;
		this.member = member;
	},


	// 미예약된 회원 추가하기
	this.insertPastSchedule = function() {
		const $ticketClassScheduleSeatNo = $('#ticketClassScheduleSeatNo');
		this.member.seatNo = $ticketClassScheduleSeatNo.val() == null ? "" : $ticketClassScheduleSeatNo.val();
		var params = Object.assign({}, this.member, {
			startDate: moment(this.member.startDate).toISOString(true),
			endDate: moment(this.member.endDate).toISOString(true),
			seqPartnerCoach: Number.parseInt(this.member.seqCoach, 10) || 0,
			seqPartnerClassSchedule: Number.parseInt(this.member.seqClassSchedule, 10) || 0,
			seqPartnerClass: Number.parseInt(this.member.seqClass, 10) || 0,
		});


		ScheduleController.saveClassReservationPastSchedule(params).then(returnData => {
			const resultData = new ResultData(returnData);
			if (resultData.isSuccess()) {
				reloadSchedulerAndOpenClassSchedulePopup.call(this);
				return;
			}

			if (resultData.isErrOfUseWeekOver()) {
				if (confirm('주간 횟수 제한에 도달했습니다. 그래도 수행하시겠습니까?')) {
					ScheduleController.savePastClassScheduleOutOfWeeklyLimit(params).then(returnData => {
						const resultData = new ResultData(returnData);
						if (resultData.isSuccess()) {
							reloadSchedulerAndOpenClassSchedulePopup.call(this);
							return;
						}

						alert(resultData.getMsgForCustomer());
					});
				}
			} else {
				alert(resultData.getMsgForCustomer());
			}


			function reloadSchedulerAndOpenClassSchedulePopup() {
				ticketPopup.close();
				schedulePopup.resetReload();
				schedulePopup.detailViewScheduleMemberList();
				this.classPopup.open();
				this.classPopup.template.find('input:radio[name="employeeId"]').prop('checked', false);
				this.classPopup.template.find('[name="member_name"]').val('');
			}
		});
	},


	this.updateClassSchedule = function(cbFunc) {
		if (this.member.state === 'W' && this.eventFuncName === 'R') {
			let params = {
				seqSchedule : this.member.seqSchedule
			};

			if (this.member.seatNo !== null) {
				params.scheduleSeat = {
					seatNo : this.member.seatNo
				};
			}

			ScheduleController.convertWhatScheduleStateFromWaitToReserve(params).then(returnData => {
				const resultData = new ResultData(returnData);
				if (resultData.isSuccess()) {
					reloadSchedulerAndOpenClassSchedulePopup.call(this);
					return;
				}

				if (resultData.isErrOfUseWeekOver()) {
					if (confirm('주간 횟수 제한에 도달했습니다. 그래도 수행하시겠습니까?')) {
						ScheduleController.convertWhatScheduleStateFromWaitToReserveOutOfWeeklyLimit(params).then(returnData => {
							const resultData = new ResultData(returnData);
							if (resultData.isSuccess()) {
								reloadSchedulerAndOpenClassSchedulePopup.call(this);
								return;
							}

							alert(resultData.getMsgForCustomer());
						});
					}
				} else {
					alert(resultData.getMsgForCustomer());
				}
			});


			function reloadSchedulerAndOpenClassSchedulePopup() {
				this.close();
				schedulePopup.resetReload();
				schedulePopup.detailViewScheduleMemberList();
				this.classPopup.open();
			}

		} else {
			let params = {
				startDate : this.classPopup.convertDateTimeSqlFormat(this.classPopup.eventSchedulerData.start_date),
				endDate : this.classPopup.convertDateTimeSqlFormat(this.classPopup.eventSchedulerData.end_date),
				seqClass : this.classPopup.scheduleData.seqClass,
				seqClassSchedule : this.classPopup.scheduleData.seqClassSchedule,
				seqPlace : this.classPopup.scheduleData.seqPlace,
				className : this.classPopup.scheduleData.className,
				lessonName : this.classPopup.scheduleData.lessonName,
				seqCoach : this.classPopup.scheduleData.seqCoach,
				nowState : this.member.state,
				status : this.eventFuncName,
				seqMember : this.member.seq,
				seqPartnerPayment : this.member.seqPayment,
				seqPartnerProductPass : this.member.seqPass,
				seqPartnerProduct : this.member.seqProduct,
				seqSchedule : this.member.seqSchedule,
				memberName : this.member.name,
				voucherMinusYn : this.member.voucherMinusYn,
				seqPartner : schedulePopup.scheduleData.seqPartner
			};

			params = Object.assign({}, params, {
				startDate: moment(params.startDate).toISOString(true),
				endDate: moment(params.endDate).toISOString(true),
				seqPartnerCoach: Number.parseInt(params.seqCoach, 10) || 0,
				seqPartnerClass: Number.parseInt(params.seqClass, 10) || 0,
				seqPartnerClassSchedule: Number.parseInt(params.seqClass, 10) || 0,
				scheduleState: params.status,
			});


			ScheduleController.changeClassReservation(params).then(returnData => {
				const resultData = new ResultData(returnData);

				if (resultData.isSuccess()) {
					resetReload.call(this);
					return;
				}

				if (resultData.isErrOfUseWeekOver()) {
					if (confirm('주간 횟수 제한에 도달했습니다. 그래도 수행하시겠습니까?')) {
						ScheduleController.changeClassReservationOutOfWeeklyLimit(params).then(returnData => {
							const resultData = new ResultData(returnData);
							if (resultData.isSuccess()) {
								resetReload.call(this);
								return;
							}

							alert(resultData.getMsgForCustomer());
						});
					}
				} else {
					alert(resultData.getMsgForCustomer());
				}


				function resetReload() {
					this.close();
					schedulePopup.resetReload();
					schedulePopup.detailViewScheduleMemberList();
					this.classPopup.open();
				}
			});
		}

	},

	// 네이버 연동
	this.updateClassScheduleForNaver = function() {
		const params = {
			seqSchedule	: ticketPopup.member.seqSchedule,
			status	 	: ticketPopup.eventFuncName
		};

		ScheduleController.changeClassReservationNaver(params).then(data => {
			this.close();
			if(typeof schedulePopup == "undefined") {
				if(this.classPopup.callback)
					this.classPopup.callback(true);
				return;
			}
			schedulePopup.resetReload();
			schedulePopup.detailViewScheduleMemberList();
			this.classPopup.open();
		}).catch(error => {
			alert("변경에 실패하였습니다.");
			if(this.classPopup.callback)
				this.classPopup.callback(false);
			console.log(error);
		});
	},

	this._prepareTemplate = function(type) {
		var beforeStateText = this._convertScheduleState(this.member.state);
		var changeSteteText = this._convertScheduleState(this.eventFuncName);

		var usageText = '';

		if (this.ticketData.changeTicketCnt > 0)
			usageText = this.ticketData.changeTicketCnt + '회 복구';
		else if (this.ticketData.changeTicketCnt < 0)
			usageText = (this.ticketData.changeTicketCnt * -1) + '회 차감';
		else
			usageText = '유지';

		this.template.find('custom-before-state').text(beforeStateText);
		this.template.find('custom-change-state').text(changeSteteText);
		this.template.find('custom-start-end-period').text(this._convertDateFormat());

		this.template.find('custom-member-name').text(this.ticketData.usageProductInfo.name);

		this.template.find('custom-product-name').text(this.ticketData.usageProductInfo.passName);
		this.template.find('custom-appointment-info').text(this.ticketData.usageProductInfo.lessonName);
		this.template.find('custom-change-usage').text(usageText);

		this.template.find('custom-remain-date').text(this.ticketData.usageProductInfo.remainDate);

		if (this.ticketData.usageProductInfo.useNumberType === 'F') {		// 무제한
			this.template.find('.after_change').css({ display: 'none' });
			this.template.find('.fl').css({ width: '100%' });
			this.template.find('.fr').css({ display: 'none' });
			this.template.find('custom-now-ticket-number').text(this.ticketData.usageProductInfo.remainNumber);

		} else {
			this.template.find('custom-now-ticket-number').text(this.ticketData.usageProductInfo.remainNumber + '회');

			var changeCnt = parseInt(this.ticketData.usageProductInfo.remainNumber) + parseInt(this.ticketData.changeTicketCnt);
			this.template.find('custom-change-ticket-number').text(changeCnt + '회');
		}
		if ( type == "R" && typeof classReservationPopup.availableSeat != 'undefined') {
			if(  classReservationPopup.availableSeat != null && classReservationPopup.availableSeat.length > 0 )
				$('#ticketClassScheduleSeatField')[0].classList.contains("hidden")==true ? $('#ticketClassScheduleSeatField')[0].classList.remove("hidden") : "";
			else
				$('#ticketClassScheduleSeatField')[0].classList.contains("hidden")==true ? "" : $('#ticketClassScheduleSeatField')[0].classList.add("hidden");
		} else {
			$('#ticketClassScheduleSeatField')[0].classList.contains("hidden")==true ? "" : $('#ticketClassScheduleSeatField')[0].classList.add("hidden");
		}
	},

	this._prepareTemplateForNaver = function(type) {
		const data = this.classPopup.eventSchedulerData;
		const lessonName = (data.lessonName) ? data.lessonName : data.text.split("/")[0].trim();
		const lessonDate = (data.lessonDate) ? data.lessonDate : this._convertDateFormat();
		const beforeState = this._convertScheduleState(this.member.state);
		const changeState = this._convertScheduleState(this.eventFuncName);

		this.template.find("custom-before-state").text(beforeState);
		this.template.find("custom-change-state").text(changeState);
		this.template.find("custom-start-end-period").text(lessonDate);
		this.template.find("custom-member-name").text(this.member.name);
		this.template.find("custom-appointment-info").text(lessonName);
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

	this._selectMemberInfo = function(eventFuncName, chkSeqSchedule) {
		const memberList = this.classPopup.memberList.filter(function(item) {
			return item.seqSchedule == chkSeqSchedule;
		});
		const member = memberList[0];
		if(eventFuncName == member.state) {
			alert("이미 " + member.stateName + " 처리된 회원입니다.");
			return false;
		}
		return member;
	},

	this._selectTicketInfo = function(eventFuncName, chkSeqSchedule, cbFunc) {
		const member = this._selectMemberInfo(eventFuncName, chkSeqSchedule);
		if(!member) return;

		const params = {
			seqPartner : this.classPopup.scheduleData.seqPartner,
			seqClass : this.classPopup.scheduleData.seqClass,
			startDate : this.classPopup.convertDateTimeSqlFormat(this.classPopup.eventSchedulerData.start_date),
			endDate : this.classPopup.convertDateTimeSqlFormat(this.classPopup.eventSchedulerData.end_date),
			seqCoach : this.classPopup.scheduleData.seqCoach,
			voucherMinusYn : member.voucherMinusYn,
			scheduleState : eventFuncName,
			seqSchedule : member.seqSchedule,
			nowState : member.state,
			seqMember : member.seq,
			seqPartnerPayment : member.seqPayment,
			seqPartnerProductPass : member.seqPass,
			seqPassInfo : member.seqPassInfo
		};

		$.ajax({
			type : 'post',
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType : 'json',
			url : '/manager/schedule/class/json/selectTicketInfo',
			data : params,
			success : function(returnData) {
				if (returnData.usageProductInfo === undefined) {
					alert('이용권 내역을 불러올 수 없습니다. 이용권을 확인해주세요.');
					return;
				}

				if (typeof cbFunc === 'function') {
					cbFunc(returnData, member);
				}
			},
			error : function(request, status, error) {
				alert('오류가 발생하였습니다.');
				console.log(request);
				console.log(status);
				console.log(error);
			}
		});
	},

	this._convertDateFormat = function() {
		var formatFuncYYMMDD = scheduler.date.date_to_str('%Y년 %m월 %d일');
		var formatFuncHHII = scheduler.date.date_to_str('%g:%i');
		var formatFuncAmPm = scheduler.date.date_to_str('%A');

		var sDate = formatFuncYYMMDD(this.classPopup.eventSchedulerData.start_date);

		var sAmPm = formatFuncAmPm(this.classPopup.eventSchedulerData.start_date);
		var sTime = formatFuncHHII(this.classPopup.eventSchedulerData.start_date);

		var eAmPm = formatFuncAmPm(this.classPopup.eventSchedulerData.end_date);
		var eTime = formatFuncHHII(this.classPopup.eventSchedulerData.end_date);

		var sAmPmText = (sAmPm === 'AM') ? '오전' : '오후';
		var eAmPmText = (eAmPm === 'AM') ? '오전' : '오후';

		return sDate + ' ' + sAmPmText + sTime + '~' + eAmPmText + eTime;
	}
};
