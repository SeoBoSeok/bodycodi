$(function() {
	// 컨텍스트 메뉴 클릭
	contextMenu = new ContextMenu();
	$(document).on('click', '#scheduler_here .context_menu [data-function]', function() {
		contextMenu.onClick(this);
	});

	// 컨텍스트 메뉴 영역이 아닌 곳을 클릭(컨텍스트 메뉴 닫기)
	$(document).mouseup(function(e) {
		const activeContextMenu = $('#scheduler_here .context_menu');
		if (activeContextMenu.has(e.target).length === 0) {
			contextMenu._clear();
		}
	});
});


const ContextMenu = function() {
	this.schedulerData,
	this.native_event_object,
	this.location,

	this.init = function(schedulerData, native_event_object, location) {
		this.schedulerData = schedulerData;
		this.native_event_object = native_event_object;
		this.location = location;
	},

	this._clear = function() {
		$('#scheduler_here .context_menu[data-end-schedule=true]').remove();
		$('#scheduler_here .context_menu[data-end-schedule=false]').remove();
	},

	this.open = function() {
		this._clear();

		if (this.schedulerData.isEndSchedule) {
			$('div[data-template] .context_menu[data-end-schedule=true]')
				.clone()
				.removeClass('popup')
				.appendTo('#scheduler_here').css({
					top : (this.location.posY) + 'px',
					left : this.location.posX + 'px'
				});

		} else {
			$('div[data-template] .context_menu[data-end-schedule=false]')
				.clone()
				.removeClass('popup')
				.appendTo('#scheduler_here').css({
					top : (this.location.posY) + 'px',
					left : this.location.posX + 'px'
				});
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
			const eventId = this.schedulerData.id;

			const div = document.querySelector("[event_id='" + eventId + "']");
			if(!div) return;
			let offsetY = div.offsetTop + div.offsetHeight + 2;

			const overflow = scheduler.offsetHeight + scheduler.scrollTop - (offsetY + popupHeight);
			if(overflow < 0) {
				if(overflow * -1 > (popupHeight / 2))
					offsetY = div.offsetTop - popupHeight - 2;
				else
					offsetY = div.offsetTop + (div.offsetHeight / 2) - (popupHeight / 2);
			}
			popup.style.top = offsetY + scheduler.offsetTop - scheduler.scrollTop + "px";
		};
		setPosition(this.native_event_object);
	},

	this.onClick = function(event) {
		const eventFuncName = $(event).attr('data-function');
		if (eventFuncName === 'detail_class') {
			scheduleList.classScheduleOffChk(this.schedulerData.id, this.native_event_object, function() {
				classReservationPopup.setEventSchedulerData(contextMenu.schedulerData);
				classReservationPopup.open();
			});

		} else if (eventFuncName === 'info_class') {
			scheduleList.classScheduleOffChk(this.schedulerData.id, this.native_event_object, function() {
				batchReservationPopup.open(contextMenu.schedulerData);
			});

		} else if (eventFuncName === 'end_schedule_detail_class') {
			scheduleList.classScheduleOffChk(this.schedulerData.id, this.native_event_object, function() {
				classCompletePopup.setEventSchedulerData(contextMenu.schedulerData);
				classCompletePopup.open();
			});

		} else if (eventFuncName === 'modify_class') {
			ClassScheduleController.findOne(contextMenu.schedulerData.id, function(scheduleInfo) {
				if (scheduleInfo.start_dt !== scheduleInfo.end_dt) {
					alert('해당 수업은 수정할 수 없습니다.');
					return false;
				}

				addClassPopup.setDate({
					startDate : new Date(contextMenu.schedulerData.start_date),
					endDate : new Date(contextMenu.schedulerData.end_date)
				});
				addClassPopup.setScheduleInfo(scheduleInfo);
				addClassPopup.modifyOpen();
			});

		} else if (eventFuncName === '수업 정보 보기') {
			ClassScheduleController.findOne(contextMenu.schedulerData.id, function(scheduleInfo) {
				classSchedulePopup.setScheduleInfo(scheduleInfo);
				classSchedulePopup.open();
			});

		} else if (eventFuncName === 'cancel_class') {
			if (loginCoachData.permission.permissionSchedule.cancelClass === false) {
				alert('수업 취소는 권한이 필요합니다.');
				return false;
			}

			ClassScheduleController.findOne(contextMenu.schedulerData.id, function(scheduleInfo) {
				cancelClassPopup.setEventSchedulerData(contextMenu.schedulerData);
				cancelClassPopup.setMode(scheduleInfo.start_dt !== scheduleInfo.end_dt ? 'multi' : 'single');
				cancelClassPopup.setScheduleData(scheduleInfo);
				cancelClassPopup.open();
			});
		}
		this._clear();
	}
};
