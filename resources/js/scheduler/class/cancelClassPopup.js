$(function() {
	$(document).on('click', '.cancel_class [data-function="close"]', function() {
		cancelClassPopup.close();
	});

	$(document).on('click', '.cancel_class [data-function="cancelClass"]', function() {
		cancelClassPopup.cancel();
	});
});


const cancelClassPopup = {
	$template : '',
	eventSchedulerData : '',
	scheduleData : '',
	mode : '',


	setMode(mode) {
		this.mode = mode;
	},

	setTemplate($template) {
		this.$template = $template;
	},

	setEventSchedulerData(eventSchedulerData) {
		this.eventSchedulerData = eventSchedulerData;
	},

	setScheduleData(scheduleData) {
		this.scheduleData = scheduleData;
	},


	open() {
		const $popupLocation = $('[data-popup-location="팝업 위치"]');

		this.template.setMode(this.mode);
		this.template.setEventDate(this.eventSchedulerData.start_date);

		$popupLocation.append(this.template.prepare());
		this.setTemplate($popupLocation.find(this.template.getSelectorSource()));

		this.$template.fadeIn(300);
		popHeight();
	},

	close() {
		this.$template.fadeOut(300, function() {
			cancelClassPopup.$template.remove();
			schedulePopup.resetReload();
		});
	},

	cancel() {
		if (this.mode === 'multi') {
			const radioValue = this.$template.find('input:radio[name="cancelOption"]:checked').val();
			if (radioValue === undefined) {
				alert('옵션을 선택해주세요');
				return false;
			}

			if (radioValue === 'today') {
				this.cancelToday(function() {
					cancelClassPopup.close();
					schedulePopup.resetReload();
				});

			} else if (radioValue === 'all') {
				this.cancelAll(function() {
					cancelClassPopup.close();
					schedulePopup.resetReload();
				});
			}

		} else if (this.mode === 'single') {
			this.delete();
		}
	},

	cancelToday(cbFunc) {
		const seqPartnerClassSchedule = this.scheduleData.seq_partner_class_schedule;
		const seqPartner = this.scheduleData.seq_partner;
		const options = {
			startDate : moment(this.eventSchedulerData.start_date).toISOString(true),
			endDate : moment(this.eventSchedulerData.end_date).toISOString(true)
		};

		ScheduleController.findAllByPartnerClassSchedule(seqPartnerClassSchedule, seqPartner, options).then(memberList => {
			const membersOnFiltered = memberList.filter(member => {
				return member.scheduleState !== 'C';
			});
			if (membersOnFiltered.length > 0) {
				alert('예약자가 있습니다. 취소할 수 없습니다.');
				return false;
			}

			const formatFuncYYMMDD = scheduler.date.date_to_str("%Y-%m-%d");
			const selectDate = formatFuncYYMMDD(this.eventSchedulerData.start_date);

			const params = {
				seqClassSchedule : this.scheduleData.seq_partner_class_schedule,
				selectDate : selectDate,
				startDate : moment(new Date(this.scheduleData.start_dt)).format('YYYY-MM-DD'),
				endDate : moment(new Date(this.scheduleData.end_dt)).format('YYYY-MM-DD'),
				startTime : this.scheduleData.start_time,
				endTime : this.scheduleData.end_time,
				weekIdx : this.scheduleData.week,
				lessonName : this.scheduleData.lesson_name,
				seqPlace : this.scheduleData.seq_partner_place
			};


			$.ajax({
				type : 'post',
				contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
				dataType : 'json',
				url : '/lesson/insertOffTimeClassSchedule',
				data : params,
				context : this,
				beforeSend : function(xhr) {
					$.blockUI({
						message : '<h5 style="padding-top: 15px">처리중입니다...</h5>',
						css : {
							'height' : '50px',
							'z-index' : 2010
						}
					});
				},
				success : function(returnData) {
					if (returnData.RESULT === 'SUCCESS') {
						alert('수업이 취소되었습니다.');

						if (typeof cbFunc === 'function') {
							cbFunc();
						}

					} else {
						alert('오류가 발생하였습니다.');
					}
				},
				error : function(request, status, error) {
					alert('오류가 발생하였습니다.');
					console.log(request);
					console.log(status);
					console.log(error);
				},
				complete : function(xhr, textStatus) {
					$.unblockUI();
				}
			});
		});
	},

	cancelAll(cbFunc) {
		const formatFuncYYMMDD = scheduler.date.date_to_str("%Y-%m-%d");
		const selectDate = formatFuncYYMMDD(this.eventSchedulerData.start_date);

		const params = {
			seqClassSchedule : this.scheduleData.seq_partner_class_schedule,
			selectDate : selectDate,
			startDate : moment(new Date(this.scheduleData.start_dt)).format('YYYY-MM-DD'),
			endDate : moment(new Date(this.scheduleData.end_dt)).format('YYYY-MM-DD'),
			weekIdx : this.scheduleData.week,
			lessonName : this.scheduleData.lesson_name,
			seqPlace : this.scheduleData.seq_partner_place
		};

		$.ajax({
			type : 'post',
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType : 'json',
			url : '/lesson/reduceClassSchedule',
			data : params,
			context: this,
			beforeSend : function(xhr){
				$.blockUI({
					message: '<h5 style="padding-top: 15px">처리중입니다...</h5>',
					css: {
						'height' : '50px',
						'z-index' : 2010
					}
				});
			},
			success : function(returnData) {
				if (returnData.RESULT === 'SUCCESS') {
					if (returnData.RESULT_MSG === 'complete') {
						alert('이 후 모든 수업이 취소되었습니다.');

						if (typeof cbFunc === 'function') {
							cbFunc();
						}

					} else {
						let alertMsg = '';
						console.log(returnData.data);
						returnData.data.forEach(function(item, index, array) {
							alertMsg += item.startDate + ' : ' + item.reserveCnt + '명\n'
						});
						alert('수업을 예약한 회원이 있습니다.\n' + alertMsg);
					}

				} else {
					alert('오류가 발생하였습니다.');
				}
			},
			error : function(request, status, error) {
				alert('오류가 발생하였습니다.');
				console.log(request);
				console.log(status);
				console.log(error);
			},
			complete : function(xhr, textStatus) {
				$.unblockUI();
			}
		});
	},


	delete() {
		const seqPartnerClassSchedule = this.scheduleData.seq_partner_class_schedule;
		const seqPartner = this.scheduleData.seq_partner;
		const options = {
			startDate : moment(this.eventSchedulerData.start_date).toISOString(true),
			endDate : moment(this.eventSchedulerData.end_date).toISOString(true)
		};

		ScheduleController.findAllByPartnerClassSchedule(seqPartnerClassSchedule, seqPartner, options).then(memberList => {
			const membersOnFiltered = memberList.filter(member => {
				return member.scheduleState !== 'C';
			});
			if (membersOnFiltered.length > 0) {
				alert('예약자가 있습니다. 취소할 수 없습니다.');
				return false;
			}

			const data = {
				seqPartnerClassSchedule : this.scheduleData.seq_partner_class_schedule
			};
			ClassScheduleController.delete(data).then(() => {
				this.close();
			});
		});
	},


	template : {
		selectorValue : 'cancel_class',
		mode : '',
		eventDate : '',

		getSelectorSource() {
			return `[data-template="${this.selectorValue}"]`;
		},

		setMode(mode) {
			this.mode = mode;
		},

		setEventDate(eventDate) {
			this.eventDate = eventDate;
		},


		prepare() {
			return `
				<div class="popup pop_white cancel_class" data-template="${this.selectorValue}">
					<div class="box">
						<h2>수업 취소하기</h2>
						<div class="pop_con">
							<div class="state_box">
								<p class="tit" style="margin-top:20px">
									${this._eventDateText()}
									<strong class="c_red">아래 '수업 취소' 버튼을 누르면, 해당 수업이 취소됩니다.</strong>
								</p>
								${this._guidText()}
							</div>
							${this._option()}
						</div>
						<div class="pop_btn">
							<button type="button" class="btn gray" data-function="close">취소</button>
							<button type="button" class="btn red" data-function="cancelClass">수업 취소</button>
						</div>

						<a href="#" class="close" data-function="close">팝업 닫기</a>
					</div>
				</div>`;
		},

		_eventDateText() {
			const formatFuncYYMMDD = scheduler.date.date_to_str("%Y-%m-%d %H:%i %l");
			return formatFuncYYMMDD(this.eventDate);
		},


		_guidText() {
			if (this.mode === 'multi') {
				return `
				<div class="pop_txt_list">
					<ul>
						<li>당일 취소 시, 선택한 날짜의 수업만 취소할 수 있으며, 취소된 수업은 회원이 예약할 수 없습니다. 단, 예약자가 있는 경우에는 취소가 불가능 합니다.</li>
						<li>전체 취소 시, 선택한 날짜 이후로 배정된 기간까지 해당요일의 수업 전체가 취소 됩니다. 단, 예약자가 있는 경우에는 취소가 불가능 합니다.</li>
					</ul>
				</div>`;

			} else if (this.mode === 'single') {
				return ``;
			}

			return ``;
		},


		_option() {
			if (this.mode === 'multi') {
				return `
				<fieldset>
					<p>
						<span class="label">스케줄 변경</span>
						<span class="line-block">
							<input name="cancelOption" id="pop_cancel_today" type="radio" value="today">
							<label for="pop_cancel_today">선택한 날짜에 해당 수업만 취소</label>
							<input name="cancelOption" id="pop_cancel_all_day" type="radio" value="all">
							<label for="pop_cancel_all_day">선택한 날짜 이후 모든 해당 수업 취소</label>
						</span>
					</p>
				</fieldset>`;

			} else if (this.mode === 'single') {
				return ``;
			}

			return ``;
		}
	}
};
