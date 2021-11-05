$(function() {
	classReservationPopup = new ClassReservationPopup();

	// '예약상태변경(예약취소/결석처리/출석처리)' 버튼 클릭
	$(document).on('click', '.info_class_before .pop_btn [data-function="changeState"]', function() {
		const naverBookingYn = classReservationPopup.template.find("[name='seqSchedule']:checked").attr("data-naverBookingYn");
		if(naverBookingYn == "Y") {
			classReservationPopup.onClick(this);
			return;
		}

		const params2 = {
			seqPartnerClassSchedule: classReservationPopup.scheduleData.seqClassSchedule
		};

		schedulePopup.searchClassScheduleIsAvailableSeat(params2)
			.then( function(returnedData){
				classReservationPopup.setAvailableSeat(returnedData);
			})
			.catch( _ =>{
				classReservationPopup.setAvailableSeat(null);
			})
			.then( _ =>{
				//classReservationPopup.setIsSeatRdy(true);
				classReservationPopup.drawAvailableSeat('ticket');
				classReservationPopup.onClick(this);
			});
	});

	// '수업 예약자 목록'의 회원 선택
	$(document).on('click', '.info_class_before input[name="seqSchedule"]', function() {
		classReservationPopup.onClickSeqSchedule(this);
	});


	// '예약하기' 버튼 클릭
	$(document).on('click', '.info_class_before [data-function="save"]', function() {
		event.preventDefault();

		const $seqMember = classReservationPopup.template.find('input:radio[name="seqMember"]:checked');
		if ($seqMember.val() === undefined) {
			alert('회원을 선택해주세요.');
			return false;
		}
		const $productUsage = classReservationPopup.template.find('select[name="productUsage"] option:selected');
		classReservationPopup.insertSchedule($seqMember, $productUsage);
	});


	// '예약대기' 버튼 클릭
	$(document).on('click', '.info_class_before [data-function="wait"]', function() {
		event.preventDefault();

		const $seqMember = classReservationPopup.template.find('input:radio[name="seqMember"]:checked');
		if ($seqMember.val() === undefined) {
			alert('회원을 선택해주세요.');
			return false;
		}
		const $productUsage = classReservationPopup.template.find('select[name="productUsage"] option:selected');
		classReservationPopup.saveWaitSchedule($seqMember, $productUsage);
	});


	// 팝업 닫기
	$(document).on('click', '.info_class_before [data-function="close"]', function() {
		classReservationPopup.close();
	});


	// [회원 검색] 창에서 'enter' 키 누름
	$(document).on('keydown', '.info_class_before form [name="member_name"]', function(event) {
		if (event.keyCode === 13) {
			const searchWord = $(this).val().trim();
			if (searchWord === '') {
				return false;
			}
			event.preventDefault();

			searchMember(searchWord);
		} else {
			// 회원 검색란의 값을 변경하면 회원 체크 취소
			classReservationPopup.template.find('input:radio[name="seqMember"]').prop('checked', false);
			classReservationPopup.loadBatchTemplate();
		}
	});


	// // [회원 검색] 창에서 '검색(돋보기)' 아이콘 클릭
	$(document).on('click', '.info_class_before [data-function="searchMember"]', function(event) {
		event.preventDefault();

		const searchWord = classReservationPopup.template.find('[name="member_name"]').val();
		if (searchWord !== '') {
			searchMember(searchWord);
		}
	});


	function searchMember(searchWord) {
		const params = {
			searchWord: searchWord,
			seqPartnerClassSchedule: classReservationPopup.scheduleData.seqClassSchedule,
			startDate: classReservationPopup.convertDateTimeSqlFormat(classReservationPopup.eventSchedulerData.start_date),
			endDate: classReservationPopup.convertDateTimeSqlFormat(classReservationPopup.eventSchedulerData.end_date)
		};

		schedulePopup.searchMember(params, function (searchedMemberList) {
			classReservationPopup.gridSearchMemberResult(searchedMemberList);
		});
	}


	// 검색된 회원의 라디오 버튼 클릭
	$(document).on('change', '.info_class_before [data-grid="searchMemberResult"] [name=seqMember]', function() {
		const memberName = $(this).data('memberName');
		classReservationPopup.template.find('[name="member_name"]').val(memberName);


		const params = {
			seqMember : $(this).val(),
			seqPartnerClassSchedule: classReservationPopup.scheduleData.seqClassSchedule,
			startDate: classReservationPopup.convertDateTimeSqlFormat(classReservationPopup.eventSchedulerData.start_date),
			endDate: classReservationPopup.convertDateTimeSqlFormat(classReservationPopup.eventSchedulerData.end_date)
		};
		const params2 = {
			seqPartnerClassSchedule: classReservationPopup.scheduleData.seqClassSchedule
		};

		schedulePopup.searchProductUsageForAvailableByMember(params, function(resultData) {
			classReservationPopup.gridProducts(resultData);
			classReservationPopup.template.find('[data-design="searchMemberContainer"]').fadeOut();
		});
		schedulePopup.searchClassScheduleIsAvailableSeat(params2)
				.then( function(returnedData){
					classReservationPopup.setAvailableSeat(returnedData);
				})
				.catch( _ =>{
					classReservationPopup.setAvailableSeat(null);
				})
				.then( _ =>{
					//classReservationPopup.setIsSeatRdy(true);
					classReservationPopup.drawAvailableSeat(null);
					popHeight();
				});
		//추가중 기능
		classReservationPopup.loadBatchTemplate();
	});


	// '단일 예약/일괄 예약' 라디오 버튼 클릭
	$(document).on('change', '.info_class_before [name="reserveMode"]', function() {
		classReservationPopup.loadBatchTemplate();
	});
});


const ClassReservationPopup = function() {
	this.template = $('.info_class_before'),
	this.batchTemplate = this.template.find('[data-template="insertBatchSchedule"]'),
	this.eventSchedulerData,
	this.scheduleData,
	this.memberList,
	this.groupClassCompleteInfo,
	this.availableSeat,

	this.setEventSchedulerData = function(eventSchedulerData) {
		this.eventSchedulerData = eventSchedulerData;
	},

	this.setScheduleData = function(scheduleData) {
		this.scheduleData = scheduleData;
	},

	this.setScheduleMemberList = function(memberList) {
		this.memberList = memberList || [];
	},

	this.setGroupClassCompleteInfo = function(groupClassCompleteInfo) {
		this.groupClassCompleteInfo = groupClassCompleteInfo;
	},
	this.setAvailableSeat = function(availableSeat){
		this.availableSeat = availableSeat;
	},
	this.open = function() {
		$('#classScheduleForm').clearForm();
		this.template.find('[name="reserveMode"]:first').prop('checked', true);
		this.template.find('[name="member_name"]').val('');
		this.template.find("[data-msg='memberCount']").text("0");
		this.template.find('[data-grid="searchMemberResult"]').empty();
		this.template.find('[data-template="productUsage"]').hide();

		this.selectClassScheduleAttendantStatics(function(groupClassCompleteInfo, context) {
			context.setGroupClassCompleteInfo(groupClassCompleteInfo);

			context._initFuncBtn();

			context._prepareTemplate();
			context.template.fadeIn(300);
			popHeight();
		});
	},

	this.onClick = function(event) {
		const changeState = $(event).data('value');
		const seqScheduleList = Array.from(this.template[0].querySelectorAll("tbody input[name='seqSchedule']:checked")).map(item => item.value);
		if(!seqScheduleList.length) {
			alert("회원을 선택해 주세요.");
			return false;
		}
		if(seqScheduleList.length == 1 && changeState == "R") {
			ticketPopup.setClassPopup(this);
			ticketPopup.clickAction(changeState, seqScheduleList);
		} else {
			changeStatePopup.open(this, seqScheduleList, changeState);
		}
	},

	this.onClickSeqSchedule = function(object) {
		const popup = this.template[0];
		const inputList = popup.querySelectorAll("tbody [name='seqSchedule']");
		let scheduleState = object.getAttribute("data-state");
		let checkedInputList = popup.querySelectorAll("tbody [name='seqSchedule']:checked");
		if(scheduleState) {
			const input = popup.querySelector("thead [name='seqSchedule']");
			input.checked = (inputList.length > 0 && inputList.length == checkedInputList.length);
		} else {
			inputList.forEach(item => {
				item.checked = (object.checked);
			});
			checkedInputList = (object.checked) ? inputList : [];
		}
		const length = checkedInputList.length;
		const closeButton = this.template.find(".pop_btn [data-function='close']");
		const entranceButton = this.template.find(".pop_btn [data-function='changeState'][data-value='E']");
		const absentButton = this.template.find(".pop_btn [data-function='changeState'][data-value='A']");
		const reserveButton = this.template.find(".pop_btn [data-function='changeState'][data-value='R']");
		const cancelButton = this.template.find(".pop_btn [data-function='changeState'][data-value='C']");
		const changeStateButton = this.template.find(".pop_btn [data-function='changeState']");
		popup.querySelector("[data-msg='memberCount']").innerHTML = length;
		const availableList = this.memberList.filter(member => {
			return (member.state == "R" || member.state == "E");
		});
		reservationLimitNo = this.scheduleData.reservationLimitNo;
		const stateType = {A : 0, E : 0, R : 0};
		checkedInputList.forEach(item => {
			const state = item.getAttribute("data-state");
			if(stateType[state] != undefined)
				stateType[state]++;
		});
		const isCanReserve = (stateType.E < reservationLimitNo);

		if(length > 1) {
			// 1. 복수로 선택된 경우
			cancelButton.text("내역취소");
			changeStateButton.attr("disabled", false);
			reserveButton.attr("disabled", true);
			if(stateType.R == 0 && stateType.A == 0) entranceButton.attr("disabled", true);
			if(stateType.R == 0 && stateType.E == 0) absentButton.attr("disabled", true);
			/*
			if(!hasWaiting || !(availableList.length < reservationLimitNo))
				reserveButton.hide();
			*/
		} else if(length == 1) {
			// 2. 단수로 선택된 경우
			scheduleState = checkedInputList[0].getAttribute("data-state");
			const selfButton = changeStateButton.filter("[data-value='" + scheduleState + "']");
			changeStateButton.attr("disabled", true);
			if(scheduleState == "W") {
				// 대기 상태인 경우
				cancelButton.text("대기취소");
				if(availableList.length < reservationLimitNo)
					reserveButton.attr("disabled", false);
				cancelButton.attr("disabled", false);
			} else {
				// 출석, 결석, 예약
				cancelButton.text((scheduleState == "R") ? "예약취소" : "내역취소");
				changeStateButton.attr("disabled", false);
				reserveButton.attr("disabled", true);
				selfButton.attr("disabled", true);
			}
		} else {
			// 3. 선택이 되지 않는 경우
			cancelButton.text("내역취소");
			changeStateButton.attr("disabled", true);
		}
		/*
		if(!isCanReserve)
			entranceButton.attr("disabled", true);
		*/
	},

	this._initFuncBtn = function() {
		const membersOfReserveOrEntrance = this.memberList.filter(member => {
			return (member.state === 'R' || member.state === 'E');
		});


		this.template.find('[data-function="save"]').hide();
		this.template.find('[data-function="wait"]').hide();

		if (membersOfReserveOrEntrance.length < this.scheduleData.reservationLimitNo) {
			this.template.find('[data-function="save"]').show();

		} else {
			const membersOfWait = this.memberList.filter(member => member.state === 'W');
			if (membersOfWait.length < this.scheduleData.waitableLimitNo) {
				this.template.find('[data-function="wait"]').show();
			}
		}

		this.template.find("[data-msg='memberCount']").text("0");
		this.template.find('.pop_btn [data-function="changeState"][data-value="C"]').text('내역취소');
		this.template.find('.pop_btn [type=button]').hide();

		const changeStateButton = this.template.find('.pop_btn [data-function="changeState"]');
		changeStateButton.attr("disabled", true);
		changeStateButton.show();
		// this.template.find('.pop_btn [type=button][data-function=close]').show();
	},

	this.close = function() {
		this.template.fadeOut(300, function() {
			$('#classScheduleForm').clearForm();
			classReservationPopup.template.find('[name="reserveMode"]:first').prop('checked', true);
			classReservationPopup.template.find('[name="member_name"]').val('');
			classReservationPopup.template.find('[data-grid="searchMemberResult"]').empty();
		});
	},

	this.selectClassScheduleAttendantStatics = function(cbFunc) {
		const params = {
			seqPartner : this.scheduleData.seqPartner,
			seqCoach : this.scheduleData.seqCoach,
			seqPartnerClass : this.scheduleData.seqClass,
			seqClassSchedule : this.scheduleData.seqClassSchedule,
			startDate : this.convertDateTimeSqlFormat(this.eventSchedulerData.start_date),
			endDate : this.convertDateTimeSqlFormat(this.eventSchedulerData.end_date)
		};

		$.ajax({
           	type: 'post',
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
           	url: '/manager/schedule/class/json/selectClassScheduleAttendantStatics',
           	data: params,
           	dataType: 'json',
           	context: this,
           	success: function(returnData) {
           		if (returnData.RESULT === 'SUCCESS') {
           			if (typeof cbFunc === 'function') {
           				cbFunc(returnData.DATA.groupClassCompleteInfo, this);
           			}

           		} else {
           			alert('오류가 발생했습니다.');
           		}

           	},
           	error : function(request, status, error) {
				console.log(request);
				console.log(status);
				console.log(error);
			}
		});
	},

	this._prepareTemplate = function() {
		this.hideBatchTemplate();

		const entranceMembers = this.memberList.filter(member => {
			if (member.state === 'E') {
				return member;
			}
		});
		this.template.find('custom-data-reserve-attendant').text(entranceMembers.length + '명');

		const absentMembers = this.memberList.filter(member => {
			if (member.state === 'A') {
				return member;
			}
		});
		this.template.find('custom-data-absent').text(absentMembers.length + '명');

		let attendantCnt;
		if (this.groupClassCompleteInfo !== undefined) {
			attendantCnt = this.groupClassCompleteInfo.attendantCnt;
		} else {
			attendantCnt = entranceMembers.length;
		}
		this.template.find('custom-data-attendant').text(attendantCnt + '명');


		const dateTime = this.convertDateTimeHumanFormat(this.eventSchedulerData.start_date);
		this.template.find('custom-schedule-date-time').text(dateTime);
		this.template.find('custom-class-name').text(this.scheduleData.lessonName);


		const nonCancelMemberList = this.memberList.filter(member => {
			if (member.state !== 'C') {
				return member;
			}
		});

		this.template.find('.table_area tbody').empty();
		if (nonCancelMemberList.length === 0) {
			const html = '<tr>' +
				'<td colspan="7">해당 수업에 예약등록된 회원이 없습니다. </td>' +
			'</tr>';
			this.template.find('.table_area tbody').append(html);

		} else {
			nonCancelMemberList.forEach(function(v, i) {
				if (v.state === 'C') {
					return;
				}

				let trHeaderCssClass;
				switch (v.state) {
					case 'R':
						trHeaderCssClass = 'c_blue';
						break;
					case 'W':
						trHeaderCssClass = 'c_gray';
						break;
					case 'E':
						trHeaderCssClass = 'c_green';
						break;
					case 'A':
						trHeaderCssClass = 'c_red';
						break;
					case 'C':
						trHeaderCssClass = 'c_gray';
						break;
				}


				let scheduleStateText = '';
				switch (v.state) {
					case 'R':
						scheduleStateText = '예약';
						break;
					case 'W':
						scheduleStateText = '대기';
						break;
					case 'E':
						scheduleStateText = '출석';
						break;
					case 'A':
						scheduleStateText = '결석';
						break;
					case 'C':
						scheduleStateText = '취소';
						break;
				}


				const remainText = v.serviceKind === 'N' ?
						v.remainNumber + '회' :
						'무제한';

				const name = v.naverBookingYn === 'Y' ?
						v.name :
						`<a href="/member/${v.seqMember}/home" style="position: relative">
							<span class="product_usage_info">${v.name}</span>
							<div data-template="product_usage_info">
								<span>
									${v.passName} ${v.useStartDt} ~ ${v.useEndDt}
									<br>
									이용 : ${v.usedCount}회, 잔여 : ${remainText}, 예약 중 ${v.reserveCount}회
								</span>
							</div>
						</a>`;

				const html = `
					<tr class="${trHeaderCssClass}">
						<td>
							<input id="booking_user_list_${v.seqSchedule}" type="checkbox" name="seqSchedule"
									value="${v.seqSchedule}" data-state="${v.state}" data-naverBookingYn="${v.naverBookingYn}">
							<label for="booking_user_list_${v.seqSchedule}">&nbsp;</label>
						</td>
						<td>${name}</td>
						<td>${v.mobile}</td>
						<td>${v.regDt}</td>
						<td>${scheduleStateText}</td>
						<td>${ typeof v.seatNo=='undefined' ? '' : v.seatNo}</td>
						<td>${v.naverBookingYn == "Y" ? "네이버 예약" : ""}</td>
					</tr>`;
				classReservationPopup.template.find('.table_area tbody').append(html);
			});
		}
	},

	this.numberFormat = function(n, width) {
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
	},

	this.convertDateTimeHumanFormat = function(dateTime) {
		const formatFuncYYMMDD = scheduler.date.date_to_str('%Y년 %m월 %d일');
		const formatFuncHHII = scheduler.date.date_to_str('%g:%i');
		const formatFuncAmPm = scheduler.date.date_to_str('%A');

		const sDate = formatFuncYYMMDD(dateTime);
		const sAmPm = formatFuncAmPm(dateTime);
		const sAmPmText = (sAmPm === 'AM') ? '오전' : '오후';
		const sTime = formatFuncHHII(dateTime);

		return sDate + ' ' + sAmPmText + ' ' + sTime;
	},

	this.convertDateTimeSqlFormat = function(dateTime) {
		const formatFuncYYMMDDHHDD = scheduler.date.date_to_str('%Y-%m-%d %H:%i:%s');
		return formatFuncYYMMDDHHDD(dateTime);
	},

	this.gridSearchMemberResult = function(searchedMemberList) {
		this.template.find('[data-grid="searchMemberResult"]').empty();

		if (searchedMemberList.length > 0) {
			$('#title_memberlist').html('');
			const membersOnSearch = searchedMemberList.map(member => {
				return `
					<li>
						<input type="radio" name="seqMember" id="seqMember_${member.seqMember}"
								value="${member.seqMember}" data-member-name="${member.name}">
						<label for="seqMember_${member.seqMember}">
							<strong>${member.name}</strong>
							<span>${member.sex === 'M' ? '남' : '여'} / ${member.mobile}</span>
						</label>
					</li>`;
			});
			this.template.find('[data-grid="searchMemberResult"]').append(membersOnSearch.join(''));

		} else {
			this.template.find('[data-grid="searchMemberResult"]').append(`<li><label>검색된 회원이 없습니다.</label><li>`);
		}

		this.template.find('[data-design="searchMemberContainer"]').fadeIn();
	},


	this.gridProducts = function(products) {
		const productsHtml = products.map(product => {
			const usedNumber = product.total_use_number - product.use_number;
			const useCntHtml = product.use_number_type === 'I' ?
					`이용 : ${usedNumber}, 잔여 : ${product.use_number}, 예약 중 : ${product.reserve_count}` :
					`이용 : ${usedNumber}, 잔여 : 무제한, 예약 중 : ${product.reserve_count}`
			;

			return `
				<option value="${product.seq_pass_info}"
						data-seq-partner-product="0"
						data-seq-partner-product-pass="0"
						data-seq-partner-payment="0"
						data-seq-partner-pass="${product.seq_service}">
					${product.pass_name}
					(${new Date(product.use_start_dt).format('sM월 sd일')} ~ ${new Date(product.use_end_dt).format('sM월 sd일')} /
					${useCntHtml})
				</option>
			`;
		});

		this.template.find('[name="productUsage"]').empty().append(productsHtml.join(''));
		this.template.find('[data-template="productUsage"]').fadeIn();
		popHeight();
	},
	this.drawAvailableSeat = function(isTicket){
		if( $('#btnWaitSchedule').css("display") ==  "inline-block" ) {
			return $('#classScheduleSeatField')[0].classList.add("hidden");
		}
		const targetSelect = isTicket != null ? $('#ticketClassScheduleSeatNo') : $('#classScheduleSeatNo') ;
		const targetField  = isTicket != null ? $('#ticketClassScheduleSeatField')[0] : $('#classScheduleSeatField')[0] ;
		targetSelect.children().remove()
		if ( this.availableSeat == null ) {
			targetField.classList.add("hidden");
		}else {
			for ( let i in this.availableSeat ) {
				targetSelect.append(new Option(this.availableSeat[i],this.availableSeat[i]));
			}

			targetField.classList.remove("hidden");
		}
		//this.template.find('[name="classScheduleSeatNo"]').empty().append(productsHtml.join(''));

	},

	// 회원 예약
	this.insertSchedule = function($seqMember, $productUsage) {
		event.preventDefault(); //브라우저 커서가 최상단으로 올라가는것을 막아줌

		let params = {
			startDate : moment(classReservationPopup.eventSchedulerData.start_date).toISOString(true),
			endDate : moment(classReservationPopup.eventSchedulerData.end_date).toISOString(true),
			seqPartnerCoach : classReservationPopup.scheduleData.seqCoach,
			scheduleName : classReservationPopup.scheduleData.lessonName,
			seqPartnerClassSchedule : classReservationPopup.scheduleData.seqClassSchedule,
			seqPartnerClass : classReservationPopup.scheduleData.seqClass,
			lessonName : classReservationPopup.scheduleData.lessonName,
			seqPlace : classReservationPopup.scheduleData.seqPlace,
			memo : classReservationPopup.scheduleData.description,
			weekIdx : classReservationPopup.scheduleData.weekIdx,
			seqMember : $seqMember.val(),
			memberName : $seqMember.data('memberName'),
			seqPartnerProduct : $productUsage.data('seqPartnerProduct'),
			seqPartnerProductPass : $productUsage.data('seqPartnerProductPass'),
			seqPartnerPayment : $productUsage.data('seqPartnerPayment'),
			seqPassInfo : $productUsage.val()
		};

		const $classScheduleSeatNo = $('#classScheduleSeatNo');
		if ($classScheduleSeatNo.val() != null) {
			params = Object.assign(params, {
				scheduleSeat : {
					seatNo : $classScheduleSeatNo.val()
				}
			});
		}


		ScheduleController.saveClassReservation(params).then(returnData => {
			const resultData = new ResultData(returnData);
			if (resultData.isSuccess()) {
				reloadSchedulerAndOpenClassSchedulePopup();
				return;
			}

			if (resultData.isErrOfUseWeekOver()) {
				if (confirm('주간 횟수 제한에 도달했습니다. 그래도 수행하시겠습니까?')) {
					ScheduleController.saveClassReservationOutOfWeeklyLimit(params).then(returnData => {
						const resultData = new ResultData(returnData);
						if (resultData.isSuccess()) {
							reloadSchedulerAndOpenClassSchedulePopup();
						} else {
							alert(resultData.getMsgForCustomer());
						}
					});
				}
			} else {
				alert(resultData.getMsgForCustomer());
			}


			function reloadSchedulerAndOpenClassSchedulePopup() {
				schedulePopup.resetReload();
				schedulePopup.detailViewScheduleMemberList();
				classReservationPopup.open();
			}
		});
	},


	this.saveWaitSchedule = function($seqMember, $productUsage) {
		event.preventDefault();

		const params = {
			seqPassInfo : $productUsage.val(),
			seqPartnerPayment : $productUsage.data('seqPartnerPayment'),
			seqPartnerProduct : $productUsage.data('seqPartnerProduct'),
			seqPartnerProductPass : $productUsage.data('seqPartnerProductPass'),
			seqPartnerClass : classReservationPopup.scheduleData.seqClass,
			seqPartnerClassSchedule : classReservationPopup.scheduleData.seqClassSchedule,
			startDate : moment(classReservationPopup.eventSchedulerData.start_date).toISOString(true),
			endDate : moment(classReservationPopup.eventSchedulerData.end_date).toISOString(true),
			seqPartnerCoach : classReservationPopup.scheduleData.seqCoach,
			seqMember : $seqMember.val(),
			scheduleName : classReservationPopup.scheduleData.lessonName,
			memo : classReservationPopup.scheduleData.description,
		};


		ScheduleController.insertWhatScheduleStateIsWaitAndScheduleTypeIsClass(params).then(() => {
			schedulePopup.resetReload();
			schedulePopup.detailViewScheduleMemberList();
			classReservationPopup.open();
		});
	},


	this.hideProductUsageStatus = function($context) {
		$context.siblings('[data-template="productUsageBySchedule"]').fadeOut(300, function() {
			$(this).remove();
		});
	},


	// 일괄 예약 관련 템플릿 보이기
	this.showBatchTemplate = function () {
		this.batchTemplate.show();
		popHeight();
	},


	// 일괄 예약 관련 템플릿 숨기기
	this.hideBatchTemplate = function () {
		this.batchTemplate.hide();
		popHeight();
	},


	this.loadBatchTemplate = function() {
		if (this.canLoadBatchTemplate()) {
			this.prepareBatchTemplate();
			this.showBatchTemplate();

		} else {
			this.hideBatchTemplate();
		}
	},


	this.canLoadBatchTemplate = function() {
		var isCheckRadio = (this.template.find('[name="reserveMode"]:checked').val() === 'multiple');
		var isSearchMember = (this.template.find('input:radio[name="employeeId"]:checked').val() !== undefined);

		return isCheckRadio && isSearchMember;
	},


	// 일괄 예약 관련 템플릿 만들기
	this.prepareBatchTemplate = function(cbFunc) {
		var seqMember = this.template.find('[name="employeeId"]:checked').val();
		var useNumberType = this.template.find('[id="useNumberType_' + seqMember + '"]').val();
		var reservableCnt = this.template.find('[id="reservableCnt_' + seqMember + '"]').val();
		var reserveCnt = this.template.find('[id="reserveCnt_' + seqMember + '"]').val();


		if (useNumberType === 'F') {
			this.template.find('[data-msg="cntUsablePass"]').text('무제한');
			reservableCnt = 50;

		} else if (useNumberType === 'I') {
			this.template.find('[data-msg="cntUsablePass"]').text(reservableCnt + ' 회');
		}


		var dataHtml = '';
		for (var i = 1; i <= Number(reservableCnt); i++) {
			dataHtml += '<option value="' + i + '">' + i + '회</option>';
		}
		this.template.find('[name="batchReserveCnt"]').empty();
		this.template.find('[name="batchReserveCnt"]').append(dataHtml);

		if (typeof cbFunc === 'function') {
			cbFunc();
		}
	}
};
