$(function() {
	// 컨텍스트 메뉴 클릭
	contextMenu = new ContextMenu();
	$(document).on('click', '#scheduler_here .context_menu [data-function]', function() {
		contextMenu.onClick(this);
	});

	// 컨텍스트 메뉴 영역이 아닌 곳을 클릭했을 때, 컨텍스트 메뉴 닫음
	$(document).mouseup(function(e) {
		const activeContextMenu = $('#scheduler_here .context_menu');
		if (activeContextMenu.has(e.target).length === 0) {
			contextMenu._clear();
		}
	});
});


const ContextMenu = function() {
	this.location,
	this.eventData,

	this.init = function(event, location) {
		this.eventData = event;
		this.location = location;
	},

	this._clear = function() {
		$('#scheduler_here .context_menu').remove();
	},

	this.open = function() {
		this._clear();

		const li = document.querySelector(".context_menu li[data-function='sendSms']");
		if(li) li.style.display = (this.eventData.now_state == "B" && this.eventData.seq_member == "0") ? "none" : "block";

		if (this.eventData.now_state === 'B') {		// 기타 스케줄
			$('div[data-template] .context_menu')
				.clone()
				.removeClass('popup')
				.find('[data-function=E], [data-function=A], [data-function=C], [data-function=pass]').remove().end()
				.appendTo('#scheduler_here').css({
					top : (this.location.posY) + 'px',
					left : this.location.posX + 'px'
				});

		} else if (this.eventData.seq_member === '0') {		// 미등록 회원 예약
			$('div[data-template] .context_menu')
				.clone()
				.removeClass('popup')
				.find('[data-function=pass]').remove().end()
				.appendTo('#scheduler_here').css({
					top : (this.location.posY) + 'px',
					left : this.location.posX + 'px'
			});

		} else {
			const $tempPopup = $('div[data-template] .context_menu')
				.clone()
				.removeClass('popup')
				.find('[data-function=' + this.eventData.now_state + ']').remove().end()
				.appendTo('#scheduler_here').css({
					top : (this.location.posY) + 'px',
					left : this.location.posX + 'px'
				});


			if (loginCoachData.permission.permissionSchedule.changeAppointmentScheduleState === false) {
				$tempPopup.find('[data-function="E"], [data-function="A"]').remove();
			}

			if (loginCoachData.permission.permissionSchedule.cancelAppointment === false) {
				$tempPopup.find('[data-function="C"]').remove();
			}

			if (loginCoachData.permission.permissionMember.sendSms === false) {
				$tempPopup.find('[data-function="sendSms"]').remove();
			}
		}

		const setPosition = (event) => {
			if(!event) return;
			const container = document.querySelector(".dhx_cal_container");
			if(!container) return;
			const scheduler = container.querySelector(".dhx_cal_data");
			if(!scheduler) return;
			const popup = container.querySelector(".context_menu");
			if(!popup) return;

			const screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
			const schedulerHeight = scheduler.scrollHeight;
			const clientY = event.clientY;
			const popupHeight = popup.offsetHeight;
			const eventId = event.id;

			const div = document.querySelector("[event_id='" + eventId + "']");
			if(!div) return;
			let offsetY = div.offsetTop + div.offsetHeight + 2;

			const overflow = scheduler.offsetHeight + scheduler.scrollTop - (offsetY + popupHeight);
			if(overflow < 0) {
				if(overflow < 0) {
					if(overflow * -1 > (popupHeight / 2))
						offsetY = div.offsetTop - popupHeight - 2;
					else
						offsetY = div.offsetTop + (div.offsetHeight / 2) - (popupHeight / 2);
				}
			}
			popup.style.top = offsetY + scheduler.offsetTop - scheduler.scrollTop + "px";
		};
		setPosition(this.eventData);
	},

	this.onClick = function(event) {
		const eventFuncName = $(event).attr('data-function');
		if (eventFuncName === 'pass') {
			location.href = "/member/" + this.eventData.seq_member + "/home";
			// location.href = '/manager/member/memberInfo/' + this.eventData.seq_member;

		} else if (eventFuncName === 'sendSms') {
			contextPopup.selectDetailPromiseSchedule(this.eventData, eventFuncName, function(resultData) {
				if(!resultData.seqMember) {
					popupSmsSend.open({
						smsMemberList : [{
							receiveNumber : resultData.nonmemberMobile,
							memberName : resultData.nonmemberName,
							sendRoute : 'MEMBER',
							reservationYn : 'N'
						}]
					});
					return;
				}

				const dataParam = {
					searchParamMap : {
						seqMember : resultData.seqMember
					}
				};

				MemberController.selectByPk(dataParam, function(resultData) {
					const data = {
						smsMemberList : [
							{
								seqMember : resultData.data.member.seq_member,
								receiveNumber : resultData.data.member.mobile,
								memberName : resultData.data.member.name,
								membershipNo : resultData.data.member.membership_no,
								sendRoute : 'MEMBER',
								reservationYn : 'N'
							}
						]
					};

					popupSmsSend.open(data);
					// smsSendPopup.open($('[data-popup-location="팝업 위치"]'), data, {});
				});
			});

		} else {
			switch (eventFuncName) {
				case 'E' :
				case 'A' :
					if (loginCoachData.permission.permissionSchedule.changeAppointmentScheduleState === false) {
						alert('상태 변경은 권한이 필요합니다.');
						return false;
					}
					break;
				case 'C' :
					if (loginCoachData.permission.permissionSchedule.cancelAppointment === false) {
						alert('예약 취소는 권한이 필요합니다.');
						return false;
					}
					break;
			}

			contextPopup.selectDetailPromiseSchedule(this.eventData, eventFuncName, function() {
				contextPopup.clickAction();
			});
		}
		this._clear();
	}
};
