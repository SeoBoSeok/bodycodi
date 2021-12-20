const CheckinPopup = {
	data : {},
	template : null,
	initializeCallback : null,
	popupLocation : null,
	checkinEntry : null,
	checkinCrm : false,
	historyBackParams : {},
	init : function(delay) {
		if (!delay) delay = 300;
		if(this.template){
			this.template.fadeOut(delay, function() {
				this.remove();
			});
		}

		this.data = {};
		this.template = null;

		if (!delay) {
			this.checkinEntry = null;
			this.historyBackParams = {};
		}
	},
	setPopupLocation : function($popupLocation) {
		this.popupLocation = $popupLocation;
	},
	open : function(data) {
		if (this.template != null) this.init(0);

		if (data.command === "RESULT" || data.command === "EXIT") {
			return this.entranceResult(data);
		}

		if (data.command === "PASS_CHECKIN") {
			return this.passEntrancePopup(data);
		}

		if (data.command === "PLACE_SCHEDULE" || data.command === "PLACE_PASS" || data.command === "PLACE_PAUSED_SCHEDULE" || data.command === "PLACE_PAUSED_PASS") {
			return this.placeRedirect(data);
		}

		if (data.command === "CUSTOM_MESSAGE") {
			return this.customMessage(data);
		}

		this.data = data;

		let popupData = {};
		popupData.seqMember = data.seqMember;
		popupData.seqMemberEntranceStandby = data.seqMemberEntranceStandby;

		if (data.command === "SCHEDULE_LIST" || data.command === "SCHEDULE_CHECKIN") {
			popupData.title = data.memberName + " 회원님 : 오늘의 예약";
			let popupTemplate = this.bindingData(CheckinPopuptemplate.preparePopupTemplate(), popupData);

			let reservationList = null;
			let attendanceList = null;
			let serviceList = null;

			if (data.reservationList.length > 0) {
				const reservations = data.reservationList.map( r => {
					const c = Object.assign({}, r);
					c.remaining = (c.remaining < 0) ? "무제한" : c.remaining + "회";
					return c;
				});
				reservationList = this.bindingListData(CheckinPopuptemplate.reserveListTemplate(), reservations);
				reservationList.find('.empty').remove();
			} else {
				reservationList = $(CheckinPopuptemplate.reserveListTemplate());
				reservationList.find('li.description').remove();
				reservationList.find('li.info').remove();
			}
			popupTemplate.find('div.content:first').append(reservationList);

			if (data.attendanceList.length > 0) {
				const attendances = data.attendanceList.map( r => {
					const c = Object.assign({}, r);
					c.remaining = (c.remaining < 0) ? "무제한" : c.remaining + "회";
					return c;
				});
				attendanceList = this.bindingListData(CheckinPopuptemplate.attendanceListTemplate(), attendances);
				popupTemplate.find('div.content:first').append(attendanceList);
			}

			if (data.passInfoList && data.passInfoList.length > 0) {
				const passInfos = data.passInfoList.map( r => {
					const c = Object.assign({}, r);
					c.remainNumber = (c.remainNumber < 0) ? "무제한" : c.remainNumber + "회";
					return c;
				});
				serviceList = this.bindingListData(CheckinPopuptemplate.scheduleNewTemplate(),passInfos);
				popupTemplate.find('div.content:first').append(serviceList);
			}

			this.template = popupTemplate;

			if (this.checkinEntry === "PASS") {
				this.historyBackParams = {
					checkinType : "PASS",
					command : "PASS_LIST",
					seqMember : data.seqMember,
				};
			} else {
				if (data.command === "SCHEDULE_LIST")
					this.hideBackButton();
			}

		} else if (data.command === "PASS_LIST" || data.command === "PLACE_LIST") {
			popupData.title = data.memberName + " 회원님 : 이용권 목록";
			let popupTemplate = this.bindingData(CheckinPopuptemplate.preparePopupTemplate(), popupData);
			let serviceList = null;

			if (data.passInfoList && data.passInfoList.length > 0) {

				const passInfos = data.passInfoList.map( r => {
					const c = Object.assign({}, r);
					c.remainNumber = (c.remainNumber < 0) ? "무제한" : c.remainNumber + "회";
					return c;
				});

				serviceList = this.bindingListData(CheckinPopuptemplate.serviceListTemplate(), passInfos);
				popupTemplate.find('div.content:first').append(serviceList);
			}

			this.template = popupTemplate;
			this.hideBackButton();
		} else if (data.command === "CLASS_LIST") {
			popupData.title = data.memberName + " 회원님 : 오늘의 그룹수업 선택";
			let popupTemplate = this.bindingData(CheckinPopuptemplate.preparePopupTemplate(), popupData);
			let classList =  null;

			if (data.classList.length > 0) {
				classList = this.bindingListData(CheckinPopuptemplate.classListTemplate(), data.classList);
				popupTemplate.find('div.content:first').append(classList);
			}

			this.template = popupTemplate;

			this.historyBackParams = {
				checkinType : "PASS",
				command : "PASS_LIST",
				seqMember : data.seqMember,
			};
		}

		this.popupLocation.append(this.template);

		this.template.find('.content ul li.info').each(function() {
			const data = $(this).data();
			let params = CheckinPopup.makeParam(data);
			params.checkinType = data.action.toUpperCase();

			if (data.action === "classEntrancePopup" ) {
				if (data.seqSchedule && data.seqSchedule > 0 && data.scheduleState !== "W") {
					$(this).find('div.overlay').show();
				} else if (parseInt(data.scheduleCount) >= parseInt(data.reservationLimitNo)) {
					$(this).find('div.overlay').show();
					return true;
				}
			}

			$(this).bind('click', function() {
				if (data.action === "passEntrancePopup" && CheckinPopup.checkinEntry === "PASS" && CheckinPopup.data.command === "SCHEDULE_LIST") {
					CheckinPopup.passEntrancePopup(CheckinPopup.data);
				} else {
					CheckinPopup[data.action](params, data.binding, data.bindingKey, data.totalSeat);
				}
			});
		});

		// this.template.find('.content ul li.info').bind('click', function() {
		// 	const data = $(this).data();
		// 	let params = CheckinPopup.makeParam(data);
		// 	params.checkinType = data.action.toUpperCase();
		//
		// 	console.log(data.action);
		// 	if (data.action === 'classEntrancePopup' ) {
		// 		if (data.seqSchedule && data.seqSchedule > 0) {
		// 			console.log($(this).find('div.overlay'));
		// 			$(this).find('div.overlay').show();
		// 		}
		// 		if (parseInt(data.scheduleCount) >= parseInt(data.reservationLimitNo)) {
		// 			$(this).find('div.overlay').show();
		// 			return true;
		// 		}
		// 	}
		// 	CheckinPopup[data.action](params, data.binding, data.bindingKey, data.totalSeat);
		// });

		this.setCloseEvent();
		this.template.css('z-index', 1050);
		this.template.fadeIn(300);

		if (data.command === "SCHEDULE_CHECKIN") {
			let node = this.template.find('.content ul[data-type="schedule"] li.info');
			if (node.length === 1 ) {
				$(node[0]).trigger('click');

				// this.historyBackParams = {
				// 	checkinType : "SCHEDULE",
				// 	command : "SCHEDULE_LIST",
				// 	seqMember : data.seqMember,
				// 	seqMemberEntranceStandby : data.seqMemberEntranceStandby,
				// 	seqPartnerProductUsage : data.reservationList[0].seqPartnerProductUsage
				// };
				//
				// if (this.checkinEntry === "PASS") {
				// 	this.historyBackParams.checkinType = "CLASS";
				// }
			}
		}
	},
	bindingListData : function(targetTemplate, list) {
		let $template = $(targetTemplate);
		let arrayTarget = targetTemplate.match(/{{\w+}}/g);
		let info = $template.find('li.info');
		$template.find('li.info').remove();

		if (list.length > 0) {
			list.forEach(function(item) {
				let infoCopy = info;
				if (!item.coachName) infoCopy.find('div.coach_info').remove();

				let html = infoCopy[0].outerHTML;

				if (!item.lessonName) item.lessonName = "";

				if (item.scheduleState) {
					if (item.scheduleState === "R") {
						item.state = "예약";
						item.engState = "reserve";
					} else if (item.scheduleState === "E") {
						item.state = "출석";
						item.engState = "attendance";
					} else if (item.scheduleState === "A") {
						item.state = "결석";
						item.engState = "absent";
					}
				}

				if (item.scheduleDate) {
					item.scheduleTime = item.scheduleDate.substring(11);
					item.scheduleDate = item.scheduleDate.substring(0,10);
				}

				if (item.serviceKind) {
					if (item.serviceKind === "P") {
						item.strUseNumber = "무제한";
					} else {
						item.strUseNumber = item.useNumber + "회";
					}
				}

				arrayTarget.forEach(function(target) {
					item.overlayText = "";
					if (item.scheduleCount >= item.reservationLimitNo) {
						item.overlayText = "예약인원 만료";
					}

					if (item.scheduleState === 'R')
						item.overlayText = "예약된 수업 입니다.";
					else if (item.scheduleState === 'E')
						item.overlayText = "이미 출석한 수업 입니다.";
					else if (item.scheduleState === 'A')
						item.overlayText = "결석한 수업 입니다. 선택 후 입장 시 출석 처리 됩니다.";

					let value = item[CheckinPopup.getDataName(target)] === "undefined" ? "" : item[CheckinPopup.getDataName(target)] ;
					html = html.split(target).join(value);
				});

				$template.append($(html));
			});
		}

		return $template;
	},
	bindingData : function(targetTemplate, data) {
		let arrayTarget = targetTemplate.match(/{{\w+}}/g);

		arrayTarget.forEach(function(target) {
			let value = data[CheckinPopup.getDataName(target)] === "undefined" ? "" : data[CheckinPopup.getDataName(target)] ;
			targetTemplate = targetTemplate.split(target).join(value);
		});
		return $(targetTemplate);
	},
	makeParam : function(data) {
		const form = this.template.find('form')[0];

		$(form).find('input[name="seqSchedule"]').val(data.seqSchedule);
		$(form).find('input[name="seqPassInfo"]').val(data.seqPassInfo);
		$(form).find('input[name="seqPartnerClassSchedule"]').val(data.seqPartnerClassSchedule);

		let params = {};
		$(form).find('input[type="hidden"]').each(function() {
			let name = $(this).prop('name');
			params[name] = $(this).val();
		});

		return params;
	},
	getDataName : function(str) {
		return str.split('{').join('').split('}').join('');
	},
	class : function(data) {
		CheckinController.checkin(data, CheckinCallback.openPopup);
	},
	scheduleEntrancePopup : function(params, dataType, dataKey) {
		console.log("called : scheduleEntrancePopup");
		let popupData = {};
		let list = this.data[dataType].filter(ele => ele[dataKey] === parseInt(params[dataKey]));

		if (list.length < 1) return;

		let item = list[0];

		if (item.scheduleState === 'E' ) {
			this.entrance(params);
		} else {
			let remaining = item.remaining;
			if (item.scheduleState === 'A') {
				if (item.voucherMinusYn === 'N') remaining = remaining - item.lessonAmount;
			} else {
				remaining = remaining === 0 ? remaining : remaining - item.lessonAmount;
			}

			if (item.seqPassInfo || item.seqPassInfo <= 0)  {
				popupData.entranceTitle = "[" + item.scheduleDate + "] " + item.serviceName;
			} else {
				popupData.entranceTitle = "[" + item.scheduleDate + "] " + (item.scheduleType === 'class' ? item.lessonName + " - " +item.lessonAmount +"회 차감"
						: item.productPassName + " - " + item.coachName );
			}

			popupData.remainDays = item.remainDays;
			popupData.coachName = item.coachName || "-";

			if(remaining < 0){
				popupData.remaining = '무제한';
			}else{
				popupData.remaining = remaining + "회";
			}

			let entranceTemplate = this.bindingData(CheckinPopuptemplate.entranceTemplate(), popupData);

			this.template.find('div.content:first').children().hide();
			this.template.find('div.content:first').append(entranceTemplate);

			this.template.find('div.entrance_btn button').bind('click', function() {
				if (item.seqPartnerProduct === -999)
					params.command = "OT";
				CheckinPopup.entrance(params);
			});

			this.showBackButton();
		}

		this.historyBackParams = {
			checkinType : "SCHEDULE",
			command : "SCHEDULE_LIST",
			seqMember : params.seqMember,
			seqMemberEntranceStandby : params.seqMemberEntranceStandby,
			seqPartnerProductUsage : params.seqPartnerProductUsage
		};

		if (this.checkinEntry === "PASS") {
			this.historyBackParams.checkinType = "CLASS";
		}

		console.log(this.historyBackParams);

	},
	passEntrancePopup : function(data) {
		console.log("called : passEntrancePopup");
		let popupData = {};

		let item = data.passInfoList[0];

		let remaining = item.serviceKind === "P" ? "무제한" : (item.remainNumber - 1) + "회";

		popupData.entranceTitle = item.serviceName + (item.coachName ? " - " + item.coachName : "");
		popupData.remainDays = item.remainDays;
		popupData.remaining = remaining;
		popupData.coachName = item.coachName || "-";

		if(popupData < 0){
			popupData.remaining = '무제한';
		}

		let entranceTemplate = this.bindingData(CheckinPopuptemplate.entranceTemplate(), popupData);

		let params = {};
		if (!this.template) {
			popupData.title = data.memberName + " 회원님 : 이용권 목록";
			popupData.seqMember = data.seqMember;
			popupData.seqMemberEntranceStandby = data.seqMemberEntranceStandby;
			this.template = this.bindingData(CheckinPopuptemplate.preparePopupTemplate(), popupData);
			this.popupLocation.append(this.template);
			this.setCloseEvent();

			this.template.css('z-index', 1050);
			this.template.fadeIn(300);
		} else {
			this.template.find('div.content:first').children().remove();
		}
		this.template.find('div.content:first').append(entranceTemplate);

		params = CheckinPopup.makeParam(item);
		this.template.find('div.entrance_btn button').bind('click', function() {
			CheckinPopup.entrance(params);
		});

		this.historyBackParams = {
			checkinType : "PASS",
			command : "PASS_LIST",
			seqMember : data.seqMember
		};
		this.showBackButton();
	},
	classEntrancePopup : function(params, dataType, dataKey, totalSeat) {
		console.log("called : classEntrancePopup");
		console.log(params, dataType, dataKey, totalSeat);
		let popupData = {};
		let list = this.data[dataType].filter(ele => ele[dataKey] === parseInt(params[dataKey]));

		if (list.length < 1) return;
		if (!this.data.passInfoList && this.data.passInfoList.length < 1) return;

		let item = list[0];
		let product = this.data.passInfoList[0];

		params.seqPassInfo = product.seqPassInfo;

		if (item.scheduleState === 'E' ) {
			this.entrance(params);
		} else {

			if (!item.scheduleState && totalSeat > 0 && totalSeat) {

				let title = this.data.memberName + " 회원님 : " + item.lessonName + " / 좌석을 선택해주세요";
				this.template.find('div.title:first').text(title);

				let seatTemplate = $(CheckinPopuptemplate.entranceSeatTemplate());
				this.seat(params);

				this.template.find('div.content:first').children().hide();
				this.template.find('div.content:first').append(seatTemplate);

				this.template.find('ul.seat_list').data("totalSeat", totalSeat);

			} else {
				let remaining = product.remainNumber;
				if (item.scheduleState === 'A') {
					if (item.voucherMinusYn === 'N') remaining = remaining - item.amount;
				} else {
					remaining = remaining - item.amount;
				}

				popupData.entranceTitle = "[" + item.classStartTime + "] " + item.lessonName + " - " + item.amount +"회 차감";
				popupData.remainDays = product.remainDays;
				popupData.coachName = item.coachName || "-";

				if(popupData < 0){
					popupData.remaining = '무제한';
				}else{
					popupData.remaining = remaining + "회";
				}

				let entranceTemplate = this.bindingData(CheckinPopuptemplate.entranceTemplate(), popupData);

				this.template.find('div.content:first').children().hide();
				this.template.find('div.content:first').append(entranceTemplate);
			}

			this.historyBackParams.checkinType = "CLASS";
			this.historyBackParams.command = "CLASS_LIST";
			this.historyBackParams.seqMember = this.data.seqMember;
			this.historyBackParams.seqMemberEntranceStandby = this.data.seqMemberEntranceStandby;
			this.historyBackParams.seqPassInfo = params.seqPassInfo;

			this.template.find('div.entrance_btn button').bind('click', function() {
				CheckinPopup.entrance(params);
			});
		}
	},
	seatResult : function(data) {
		const seatList = this.template.find('ul.seat_list');
		const totalSeat = seatList.data("totalSeat");
		let seat = seatList.find('li');
		seatList.find('li').remove();

		const scheduleSeatList = data.scheduleSeatList;

		for (let i=1; i<=totalSeat; i++) {
			let copy = seat[0].outerHTML;
			let ele = $(copy).data("seatNo",i).text(i);

			scheduleSeatList.forEach(function(item) {
				if (item.seatNo === i) {
					ele.addClass("reserve");
					return true;
				}
			});

			seatList.append(ele);
		}
	},
	placeRedirect : function(data) {
		this.template = $(CheckinPopuptemplate.preparePopupTemplate());
		this.template.find('div.title:first').css('visibility', 'hidden');

		let popupData = {};
		let msg = "이용가능한 시설이용권이 없습니다.";

		if (data.command === "PLACE_PAUSED_SCHEDULE" || data.command === "PLACE_PAUSED_PASS") {
			msg = "모든 시설이용권이 중지상태 입니다.";
		}

		popupData.resultTitle = msg;
		let placeRedirectTemplate = this.bindingData(CheckinPopuptemplate.placeRedirectTemplate(), popupData);

		this.popupLocation.append(this.template);
		this.template.find('div.content:first').append(placeRedirectTemplate);
		this.setCloseEvent();
		this.hideBackButton();

		this.template.css('z-index', 1050);
		this.template.fadeIn(300);

		let params = {
			checkinType : "SCHEDULE",
			seqMember : data.seqMember
		};

		setTimeout(function() {
			if (data.command === "PLACE_PASS" || data.command === "PLACE_PAUSED_PASS") {
				params.checkinType = "PASS";
			}

			CheckinController.checkin(params, CheckinCallback.openPopup);

		}, 1000);
	},
	entranceResult : function(data) {
		if (data.code >= 500) {
			return this.entranceFailed(data);
		}

		if (data.command === "RESULT" && !this.checkinCrm) {
			const socketId = data.seqPartner + "_" + data.seqPartnerBranch;
			console.log(data.value, socketId, data.seqMember);
			emitSocketEntranceSuccess(data.value, socketId, data.seqMember);
		}

		let resultTemplate = null;

		if (data.result) {
			const result = data.result;

			let resultTitle = result.serviceName;
			let memberName = result.memberName;
			let message = "";

			if (result.seqSchedule && result.scheduleType === 'class') {
				resultTitle = resultTitle + " - " + result.scheduleName;
			} else if (result.seqSchedule && result.scheduleType === 'appointment') {
				resultTitle = resultTitle + " - " + result.coachName;
			}

			if(result.serviceType == "PLACE") {
				const remainDay = result.remainDays;
				const color = (remainDay <= 7) ? "c_red" : (remainDay <= 15) ? "c_orange" : "c_green";
				const messageList = [];
				if(result.serviceKind == "N") messageList.push(`잔여횟수 : ${result.remainNumber}회`);
				messageList.push(`잔여기간 : ${remainDay}일`);
				message = `<h3 class="message ${color}">(${messageList.join(" / ")})</h3>`;
			}

			let popupData = {
				resultTitle : resultTitle,
				memberName : memberName,
				message : message
			};

			if (data.command === "RESULT") {
				resultTemplate = this.bindingData(CheckinPopuptemplate.resultTemplate(), popupData);
			} else {
				resultTemplate = this.bindingData(CheckinPopuptemplate.exitTemplate(), popupData);
			}
		} else {
			let memberName = data.memberName;
			let popupData = {
				memberName : memberName,
			};
			resultTemplate = this.bindingData(CheckinPopuptemplate.exitTemplate(), popupData);
			resultTemplate.find('li.title').css('visibility', 'hidden');
		}

		if (!this.template) {
			this.template = $(CheckinPopuptemplate.preparePopupTemplate());
			this.template.find('form').remove();
			this.popupLocation.append(this.template);
			// this.setCloseEvent();

			this.template.css('z-index', 1050);
			this.template.fadeIn(300);
		} else {
			this.template.find('div.content:first').children().remove();
		}

		if (data.lockerRemainDays){
			let title = "락커 만료 " + data.lockerRemainDays + "일 전";
			this.template.find('div.title:first').text(title);

		} else {
			this.template.find('div.title:first').css('visibility', 'hidden');
		}

		this.template.find('div.content:first').append(resultTemplate);
		this.setAutoCloseEvent();
		this.hideBackButton();
	},
	entranceFailed : function(data) {
		const socketId = data.seqPartner + "_" + data.seqPartnerBranch;
		emitSocketEntranceFailure(data.value, socketId, data.seqMember);

		let description = "안내 데스크에 문의 바랍니다.";
		if (data.code === 505) description = "예약 후 이용하실 수 있습니다.";
		else if (data.code === 524) description = "센터 관리자에게 문의해주세요.";

		let popupData = {
			resultTitle : data.message,
			description : description
		};

		let resultTemplate = this.bindingData(CheckinPopuptemplate.failedTemplate(), popupData);

		if (!this.template) {
			this.template = $(CheckinPopuptemplate.preparePopupTemplate());
			this.template.find('form').remove();
			this.popupLocation.append(this.template);
			this.setCloseEvent();

			this.template.css('z-index', 1050);
			this.template.fadeIn(300);
		} else {
			this.template.find('div.content:first').children().remove();
		}

		this.template.find('div.title:first').css('visibility', 'hidden');
		this.template.find('div.content:first').append(resultTemplate);

		this.setAutoCloseEvent();
		this.hideBackButton();
	},
	setCloseEvent : function() {
		this.template.find('div.footer button').bind('click', function() {
			if ($(this).data().action === 'close') {
				CheckinPopup.init();
				if (typeof CheckinPopup.initializeCallback === 'function') CheckinPopup.initializeCallback();
			} else {
				CheckinController.checkin(CheckinPopup.historyBackParams, CheckinCallback.openPopup);
			}
		});
	},
	setAutoCloseEvent : function() {
		if (this.checkinCrm) {
			setTimeout(function() {
				location.reload();
			}, 1000);
		} else {
			setTimeout(function() {
				CheckinPopup.init();
				if (typeof CheckinPopup.initializeCallback === 'function') CheckinPopup.initializeCallback();
			}, 1500);
		}
	},
	entrance : function(data) {
		if (this.template.find('div.seat').length > 0) {
			let seatNo = this.template.find('ul.seat_list li.active:first').data("seatNo");

			if (seatNo > 0) {
				data.seatNo = seatNo;
			} else {
				CheckinPopup.open({command:"CUSTOM_MESSAGE", title : "자리를 선택해 주세요.", contents : "입장 체크인 알림"});
				// alert("자리를 선택해 주세요.");
				return;
			}
		}
		data.checkinType = "ENTRANCE";
		CheckinController.checkin(data, CheckinCallback.openResult);
	},
	seat : function(data) {
		data.checkinType = "SEAT";
		CheckinController.checkin(data,CheckinCallback.seatResult);
	},
	hideBackButton : function() {
		this.template.find('[data-action="back"]').hide();
	},
	showBackButton : function() {
		this.template.find('[data-action="back"]').show();
	},
	customMessage : function(data) {
		const resultTemplate = this.bindingData(CheckinPopuptemplate.customMessage(), data);
		if(!this.template) {
			this.template = $(CheckinPopuptemplate.preparePopupTemplate());
			this.template.find('form').remove();
			this.popupLocation.append(this.template);
			this.setCloseEvent();
			this.template.css('z-index', 1050);
			this.template.fadeIn(300);
		} else {
			this.template.find('div.content:first').children().remove();
		}
		this.template.find('div.title:first').css('visibility', 'hidden');
		this.template.find('div.content:first').append(resultTemplate);
		this.setAutoCloseEvent();
		this.hideBackButton();
	},
};

const CheckinPopuptemplate = {
	preparePopupTemplate : function() {
		return  `
			<div class="checkin_popup" data-popup="체크인 팝업">
				<div class="box">
					<form name="checkinForm">
						<input type="hidden" name="seqMember" value="{{seqMember}}" />
						<input type="hidden" name="seqSchedule" value="" />
						<input type="hidden" name="seqMemberEntranceStandby" value="{{seqMemberEntranceStandby}}" />
						<input type="hidden" name="seqPartnerClassSchedule" value="" />
						<input type="hidden" name="seqPassInfo" value="" />
					</form>
					<div class="title">{{title}}</div>
					<div class="content">
					</div>
					<div class="footer">
						<button type="button" class="btn gray"  data-action="back">뒤로가기</button>
						<button type="button" class="btn gray"  data-action="close">체크인 닫기</button>
					</div>
				</div>
			</div>
		`;
	},
	reserveListTemplate : function() {
		return  `
			<ul class="schedule_list" data-type="schedule">
				<li class="description">금일 예약된 건 입니다. 선택 후 입장하시면 출석처리가 완료됩니다.</li>
				<li class="info" data-seq-schedule="{{seqSchedule}}" data-seq-partner-product-usage="{{seqPartnerProductUsage}}"
					data-action="scheduleEntrancePopup" data-binding="reservationList" data-binding-key="seqSchedule">
					<div class="schedule">
						<span class="{{engState}}">[금일{{state}}]</span>&nbsp;&nbsp;<span>{{scheduleTime}}&nbsp;&nbsp;{{lessonName}}</span><i class="fr">{{scheduleDate}}</i>
					</div>
					<div class="title">{{productPassName}} / 만료일 : {{useEndDate}}&nbsp;&nbsp;잔여횟수 : {{remaining}}</div>
					<div class="coach_info">강사 {{coachName}}&nbsp;&nbsp;</div>
				</li>
				<li class="empty">금일 예약 내역이 없습니다.</li>
			</ul>
		`;
	},
	attendanceListTemplate : function() {
		return  `
			<ul class="schedule_list" data-type="attendance">
				<li class="description">금일 이미 출석이나 결석처리가 된 건 입니다. 아래 내역을 선택 후 입장하시면 출석처리가 완료됩니다.</li>
				<li class="info" data-seq-schedule="{{seqSchedule}}" data-seq-partner-product-usage="{{seqPartnerProductUsage}}"
					data-action="scheduleEntrancePopup" data-binding="attendanceList" data-binding-key="seqSchedule">
					<div class="schedule">
						<span class="{{engState}}">[금일{{state}}]</span>&nbsp;&nbsp;<span>{{scheduleTime}}&nbsp;&nbsp;{{lessonName}}</span><i class="fr">{{scheduleDate}}</i>
					</div>
					<div class="title">{{productPassName}} / 만료일 : {{useEndDate}}&nbsp;&nbsp;잔여횟수 : {{remaining}}</div>
					<div class="coach_info">강사 {{coachName}}&nbsp;&nbsp;</div>
				</li>
			</ul>
		`;
	},
	scheduleNewTemplate : function() {
		return  `
			<ul class="schedule_list" data-type="product">
				<li class="description">현재 시간으로 새롭게 출석합니다. 기존 예약이나 결석 내역은 출석되지 않습니다.</li>
				<li class="info"
					data-action="passEntrancePopup" data-binding="passInfoList" data-binding-key="seqPartnerProductUsage">
					<div class="schedule">
						<span>현재 시간으로 출석하기</span>
					</div>
					<div class="title">{{serviceName}} / 만료일 : {{useEndDate}}&nbsp;&nbsp;잔여횟수 : {{remainNumber}}</div>
					<div class="coach_info">강사 {{coachName}}&nbsp;&nbsp;</div>
				</li>
			</ul>
		`;
	},
	serviceListTemplate : function() {
		return `
			<ul class="pass_list">
				<li class="info" data-seq-pass-info="{{seqPassInfo}}"
					data-action="class" data-binding="passInfoList" data-binding-key="seqPassInfo">
					<div class="title">{{serviceName}}</div>
					<div class="expire"><span>{{remainDays}}일</span> 동안 <span>{{remainNumber}}</span> 이용가능</div>
					<div class="period">유효기간 : {{startDate}} ~ {{endDate}}</div>
					<div class="coach_info">강사 {{coachName}}&nbsp;&nbsp;</div>
				</li>
			</ul>
		`;
	},
	classListTemplate : function() {
		return `
			<ul class="class_list">
				<li class="info" data-seq-partner-class-schedule="{{seqPartnerClassSchedule}}" data-seq-partner-product-usage="{{seqPartnerProductUsage}}" data-seq-schedule="{{seqSchedule}}"
					data-schedule-state="{{scheduleState}}" data-action="classEntrancePopup" data-binding="classList" data-binding-key="seqPartnerClassSchedule"
					data-total-seat="{{totalSeat}}" data-reservation-limit-no="{{reservationLimitNo}}" data-schedule-count="{{scheduleCount}}">
					<div class="time">{{classStartTime}}</div>
					<div class="title">{{lessonName}} (이용권 차감 횟수 : {{amount}}회)</div>
					<div class="coach_info">강사 {{coachName}}</div>
					<div class="overlay {{engState}}">{{overlayText}}</div>
				</li>
			</ul>
		`;
	},
	entranceTemplate : function() {
		return `
			<ul class="entrance_message">
				<li class="title">{{entranceTitle}}</li>
				<li class="info">잔여기간 : <span>{{remainDays}}일</span> / 출석 후 잔여횟수 : <span>{{remaining}}</span></li>
				<li class="info">담당강사 : <span>{{coachName}}</span></li>
			</ul>
			<div class="entrance_btn">
				<button type="button" class="btn"  data-action="entrance">출석하기</button>
			</div>
		`;
	},
	entranceSeatTemplate : function() {
		return `
			<div class="paging prev"> < </div>
			<div class="paging next"> > </div>
			<div class="seat">
				<ul class="seat_list">
					<li></li>
				</ul>
			</div>
			<div class="entrance_btn">
				<button type="button" class="btn"  data-action="entrance">출석하기</button>
			</div>
		`
	},
	placeRedirectTemplate : function() {
		return `
			<ul class="entrance_result">
				<li class="title">"{{resultTitle}}"</li>
			</ul>
		`;
	},
	resultTemplate : function() {
		return `
			<ul class="entrance_result">
				<li class="title">"{{resultTitle}}"</li>
				<li class="info">
					{{memberName}} 회원님, <span class="c_blue">정상 출석</span> 되었습니다.
					<br>
					{{message}}
				</li>
				<li class="welcome">행복한 하루 되세요!</li>
			</ul>
		`;
	},
	failedTemplate : function() {
		return `
			<ul class="entrance_result">
				<li class="title">{{resultTitle}}</li>
				<li class="info">{{description}}</li>
			</ul>
		`;
	},
	exitTemplate : function() {
		return `
			<ul class="entrance_result">
				<li class="title">"{{resultTitle}}"</li>
				<li class="info">{{memberName}} 회원님, 퇴장 하셨습니다.</li>
				<li class="welcome">행복한 하루 되세요!</li>
			</ul>
		`;
	},
	customMessage : function() {
		return `
			<ul class="entrance_result">
				<li class="title">{{title}}</li>
				<li class="info">{{contents}}</li>
			</ul>
		`;
	}
};

const CheckinCallback = {
	openPopup : function(data) {
		CheckinPopup.open(data);
	},
	openResult : function(data) {
		CheckinPopup.entranceResult(data);
	},
	seatResult : function(data) {
		CheckinPopup.seatResult(data);
	}
};
