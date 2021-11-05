$(function() {
	classCompletePopup = new ClassCompletePopup();
	$(document).on('click', '.info_class_after .pop_btn [data-function=changeState]', function() {
		//classCompletePopup.onClick(this);
		const params2 = {
			seqPartnerClassSchedule: classCompletePopup.scheduleData.seqClassSchedule
		};
		schedulePopup.searchClassScheduleIsAvailableSeat(params2)
				.then( function(returnedData){
					classCompletePopup.setAvailableSeat(returnedData);
				})
				.catch( _ =>{
					classCompletePopup.setAvailableSeat(null);
				})
				.then( _ =>{
					//classReservationPopup.setIsSeatRdy(true);
					classCompletePopup.drawAvailableSeat('complete');
					classCompletePopup.onClick(this);
				});
	});

	$(document).on('click', '.info_class_after [data-function=close]', function() {
		classCompletePopup.close();
	});

	$(document).on('click', '.info_class_after input[name=seqSchedule]', function() {
		classCompletePopup.onClickMember(this);
	});

	$(document).on('click', '.info_class_after [data-function=insertGroupClassSchedule]', function() {
		classCompletePopup.insertGroupClassSchedule();
	});

	// 회원 검색 및 검색 결과 보여주기
	$(document).on('keydown', '.info_class_after [name=member_name]', function(event) {
		if (event.keyCode === 13) {
			const searchWord = $(this).val().trim();
			if (searchWord === '') {
				return false;
			}
			event.preventDefault();

			searchMember(searchWord);
		} else {
			// 회원 검색란의 값을 변경하면 회원 체크 취소
			classCompletePopup.template.find('input:radio[name="seqMember"]').prop('checked', false);
		}
	});


	// '검색(돋보기)' 아이콘 클릭
	$(document).on('click', '.info_class_after [data-function="searchMember"]', function(event) {
		event.preventDefault();

		const searchWord = classCompletePopup.template.find('[name="member_name"]').val();
		if (searchWord !== '') {
			searchMember(searchWord);
		}
	});

	// 검색된 회원의 라디오 버튼 클릭
	$(document).on('change', '.info_class_after [data-grid="searchMemberResult"] [name=seqMember]', function() {
		const memberName = $(this).data('memberName');
		classCompletePopup.template.find('[name="member_name"]').val(memberName);


		const params = {
			seqMember : $(this).val(),
			seqPartnerClassSchedule: classCompletePopup.scheduleData.seqClassSchedule,
			startDate: classCompletePopup.convertDateTimeSqlFormat(classCompletePopup.eventSchedulerData.start_date),
			endDate: classCompletePopup.convertDateTimeSqlFormat(classCompletePopup.eventSchedulerData.end_date)
		};
		const params2 = {
			seqPartnerClassSchedule: classReservationPopup.scheduleData.seqClassSchedule
		};

		schedulePopup.searchProductUsageForAvailableByMember(params, function(resultData) {
			classCompletePopup.gridProducts(resultData);
			classCompletePopup.template.find('[data-design="searchMemberContainer"]').fadeOut();
		});
		schedulePopup.searchClassScheduleIsAvailableSeat(params2)
				.then( function(returnedData){
					classCompletePopup.setAvailableSeat(returnedData);
				})
				.catch( _ =>{
					classCompletePopup.setAvailableSeat(null);
				})
				.then( _ =>{
					//classReservationPopup.setIsSeatRdy(true);
					classCompletePopup.drawAvailableSeat('complete');
				});
		//추가중 기능
	});


	function searchMember(searchWord) {
		const params = {
			searchWord : searchWord,
			seqPartnerClassSchedule : classCompletePopup.scheduleData.seqClassSchedule,
			startDate : classCompletePopup.convertDateTimeSqlFormat(classCompletePopup.eventSchedulerData.start_date),
			endDate: classReservationPopup.convertDateTimeSqlFormat(classCompletePopup.eventSchedulerData.end_date)
		};

		schedulePopup.searchMember(params, function(searchedMemberList) {
			classCompletePopup.gridSearchMemberResult(searchedMemberList);
		});
	}


	// 회원 [출석하기]/[결석하기] 버튼 클릭
	$(document).on('click', '.info_class_after [data-function="insertPastSchedule"]', function() {
		const scheduleInfo = classCompletePopup.buildParamInsertPastSchedule($(this).data('value'));
		classCompletePopup.selectSettingOfVoucherMinusYn(scheduleInfo, function(scheduleInfo) {
			classCompletePopup.selectUsageInfo(scheduleInfo, function(scheduleInfo, usageData) {
				ticketPopup.setClassPopup(classCompletePopup);
				ticketPopup._init(usageData, scheduleInfo.scheduleState, scheduleInfo);
				ticketPopup._prepareTemplate();
				ticketPopup.open();
			});
		});
	});
});

const ClassCompletePopup = function() {
	this.template = $('.info_class_after'),
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
		this.memberList = memberList;
	},

	this.setGroupClassCompleteInfo = function(groupClassCompleteInfo) {
		this.groupClassCompleteInfo = groupClassCompleteInfo;
	},
	this.setAvailableSeat = function(availableSeat){
		this.availableSeat = availableSeat;
	},
	this.open = function() {
		classCompletePopup.template.find('[data-template="productUsage"]').hide();

		this.selectClassScheduleAttendantStatics(function(groupClassCompleteInfo, context) {
			context.setGroupClassCompleteInfo(groupClassCompleteInfo);

			context._initFuncBtn();
			context._prepareTemplate();

			const inputList = context.template[0].querySelectorAll("table input[type='checkbox']");
			inputList.forEach(item => item.checked = false);
			context.template.fadeIn(300);
			popHeight();
		});
	},

	this.close = function() {
		this.template.fadeOut(300, function() {
			classCompletePopup.template.find('[name="member_name"]').val('');
			classCompletePopup.template.find('[data-grid="searchMemberResult"]').empty();
			classCompletePopup.template.find('[name=attendantCnt]').val('');
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

	this.insertGroupClassSchedule = function() {
		const attendantCnt = this.template.find('[name=attendantCnt]').val();
		if (attendantCnt === '') {
			alert('참석 인원수를 입력해주세요');
			return false;
		}


		const params = {
			seqGroupClassComplete : this.groupClassCompleteInfo !== undefined ?
					this.groupClassCompleteInfo.seqGroupClassComplete : 0,
			attendantCnt : attendantCnt,
			seqPartner : this.scheduleData.seqPartner,
			seqCoach : this.scheduleData.seqCoach,
			seqPartnerClass : this.scheduleData.seqClass,
			seqPartnerClassSchedule : this.scheduleData.seqClassSchedule,
			startDate : this.convertDateTimeSqlFormat(this.eventSchedulerData.start_date),
			endDate : this.convertDateTimeSqlFormat(this.eventSchedulerData.end_date)
		};

		$.ajax({
           	type: 'post',
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
           	url: '/manager/schedule/class/json/insertGroupClassScheduleComplete',
           	data: params,
           	dataType: 'json',
           	context : this,
           	success: function(returnData) {
           		if (returnData.RESULT === 'SUCCESS') {
           			alert('입력하였습니다.');
           			this.close();
           			this.open();
           		} else {
           			alert('오류가 발생했습니다.');
           		}

           	},
           	error : function(request, status, error) {
				console.log(request);
				console.log(status);
				console.log(error);
			},
			beforeSend : function(xhr) {
				$.blockUI({
					message : '<h5 style="padding-top: 15px">로딩중입니다...</h5>',
					css : {
						'height' : '50px',
						'z-index' : 2010
					}
				});
			},
			complete : function(xhr, textStatus) {
				$.unblockUI();
			}
		});

	},


	this.hideProductUsageStatus = function($context) {
		$context.siblings('[data-template="productUsageBySchedule"]').fadeOut(300, function() {
			$(this).remove();
		});
	},

	this.onClick = function(event) {
		const changeState = $(event).data('value');
		const seqScheduleList = Array.from(this.template[0].querySelectorAll("tbody input[name='seqSchedule']:checked")).map(item => item.value);
		if(!seqScheduleList.length) {
			alert("회원을 선택해 주세요.");
			return false;
		}
		changeStatePopup.open(this, seqScheduleList, changeState);
	},

	this.onClickMember = function(object) {
		const popup = this.template[0];
		const inputList = popup.querySelectorAll("tbody [name='seqSchedule']");
		let checkedInputList = popup.querySelectorAll("tbody [name='seqSchedule']:checked");
		let scheduleState = object.getAttribute("data-state");
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
		const cancelButton = this.template.find(".pop_btn [data-function='changeState'][data-value='C']");
		const closeButton = this.template.find(".pop_btn [data-function='close']");
		const entranceButton = this.template.find(".pop_btn [data-function='changeState'][data-value='E']");
		const absentButton = this.template.find(".pop_btn [data-function='changeState'][data-value='A']");
		const changeStateButton = this.template.find(".pop_btn [data-function='changeState']");
		popup.querySelector("[data-msg='memberCount']").innerHTML = length;

		if(length > 1) {
			// 1. 복수로 선택된 경우
			const stateType = {A : 0, E : 0, R : 0};
			checkedInputList.forEach(item => {
				const state = item.getAttribute("data-state");
				if(stateType[state] != undefined)
					stateType[state]++;
			});
			cancelButton.text("내역취소");
			changeStateButton.attr("disabled", false);
			if(stateType.R == 0 && stateType.A == 0) entranceButton.attr("disabled", true);
			if(stateType.R == 0 && stateType.E == 0) absentButton.attr("disabled", true);
		} else if(length == 1) {
			// 2. 단수로 선택된 경우
			scheduleState = checkedInputList[0].getAttribute("data-state");
			const selfButton = changeStateButton.filter("[data-value='" + scheduleState + "']");
			cancelButton.text((scheduleState != "R") ? "내역취소" : "예약취소");
			if(scheduleState != "W")
				changeStateButton.attr("disabled", false);
			else
				cancelButton.attr("disabled", false);
			selfButton.attr("disabled", true);
		} else {
			// 3. 선택이 되지 않는 경우
			cancelButton.text("내역취소");
			changeStateButton.attr("disabled", true);
		}
	},

	this._initFuncBtn = function() {
		this.template.find("[data-msg='memberCount']").text("0");
		this.template.find('.pop_btn [data-function="changeState"][data-value="C"]').text('내역취소');
		this.template.find('.pop_btn [type=button][data-function=close]').hide();
		const changeStateButton = this.template.find('.pop_btn [data-function="changeState"]');
		changeStateButton.attr("disabled", true);
		changeStateButton.show();
	},

	this._prepareTemplate = function() {
		let completeStatusHtml = '';
		if (this.groupClassCompleteInfo === undefined) {
			completeStatusHtml =
				'<ul style="margin-top:0;" class="c_red">' +
					'<li>현재는 수업완료 상태가 아닙니다.</li>' +
					'<li>수업 완료를 선택하지 않으면 그룹수업 이용권 진행에 대한 수당 정산이 추가되지 않습니다.</li>' +
				'</ul>';

		} else {
			completeStatusHtml =
				'<ul style="margin-top:0;" class="c_red">' +
					'<li>수업완료 상태입니다.</li>' +
				'</ul>';
		}
		this.template.find('div[data-msg=complete-status]').html(completeStatusHtml);


		if (this.groupClassCompleteInfo !== undefined) {
			this.template.find('[name="attendantCnt"]').val(this.groupClassCompleteInfo.attendantCnt);
		}


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

		// this.template.find('custom-data-cancel').text(this.attendantStatics.cancelCount + '명');


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
			const html =
				'<tr>' +
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
									value="${v.seqSchedule}" data-state="${v.state}">
							<label for="booking_user_list_${v.seqSchedule}">&nbsp;</label>
						</td>
						<td>${name}</td>
						<td>${v.mobile}</td>
						<td>${v.regDt}</td>
						<td>${scheduleStateText}</td>
						<td>${ typeof v.seatNo=='undefined' ? '' : v.seatNo}</td>
						<td>${v.naverBookingYn == "Y" ? "네이버 예약" : ""}</td>
					</tr>`;
				classCompletePopup.template.find('.table_area tbody').append(html);
			});
		}
	},

	this.numberFormat = function(n, width) {
		n = n + '';
		return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
	},

	this.convertDateTimeHumanFormat = function(dateTime) {
		var formatFuncYYMMDD = scheduler.date.date_to_str('%Y년 %m월 %d일');
		var formatFuncHHII = scheduler.date.date_to_str('%g:%i');
		var formatFuncAmPm = scheduler.date.date_to_str('%A');

		var sDate = formatFuncYYMMDD(dateTime);
		var sAmPm = formatFuncAmPm(dateTime);
		var sAmPmText = (sAmPm === 'AM') ? '오전' : '오후';
		var sTime = formatFuncHHII(dateTime);

		return sDate + ' ' + sAmPmText + ' ' + sTime;
	},

	this.convertDateTimeSqlFormat = function(dateTime) {
		var formatFuncYYMMDDHHDD = scheduler.date.date_to_str('%Y-%m-%d %H:%i:%s');
		return formatFuncYYMMDDHHDD(dateTime);
	},

	this.clearAutoComplete = function() {
		$('#search_container').hide();
		$('#search_memberlist').html('');
		$('#search_memberlist').hide();
		$('#title_memberlist').empty();
		$('#title_memberlist').hide();
	},

	this.gridSearchMemberResult = function(searchedMemberList) {
		this.template.find('[data-grid="searchMemberResult"]').empty();
		if (searchedMemberList.length > 0) {
			//데이터 검색 있을때
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
		//if( $('#btnWaitSchedule').css("display") ==  "inline-block" ) {
		//	return $('#classScheduleSeatField')[0].classList.add("hidden");
		//}
		const targetSelect = isTicket != null ? $('#completeClassScheduleSeatNo') : $('#classScheduleSeatNo') ;
		const targetField  = isTicket != null ? $('#completeClassScheduleSeatField')[0] : $('#classScheduleSeatField')[0] ;
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
	}

	this.buildParamInsertPastSchedule = function(scheduleState) {
		const $seqMember = this.template.find('input:radio[name=seqMember]:checked');
		if ($seqMember.val() === undefined) {
			alert('회원을 선택해주세요');
			return false;
		}

		const $productUsage = this.template.find('select[name="productUsage"] option:selected');

		const scheduleInfo = {
			nowState : 'R',
			scheduleState : scheduleState,
			scheduleType : 'class',
			startDate : this.convertDateTimeSqlFormat(this.eventSchedulerData.start_date),
			endDate : this.convertDateTimeSqlFormat(this.eventSchedulerData.end_date),
			seqCoach : this.scheduleData.seqCoach,
			seqClassSchedule : this.scheduleData.seqClassSchedule,
			seqClass : this.scheduleData.seqClass,
			seqPlace : this.scheduleData.seqPlace,
			scheduleName : this.scheduleData.className,
			lessonName : this.scheduleData.lessonName,
			seqMember : $seqMember.val(),
			memberName : $seqMember.data('memberName'),
			seqPartnerProduct : $productUsage.data('seqPartnerProduct'),
			seqPartnerProductPass : $productUsage.data('seqPartnerProductPass'),
			seqPartnerPayment : $productUsage.data('seqPartnerPayment'),
			seqPassInfo : $productUsage.val()
		};

		// 이용권 가감 팝업에서 사용할 값. 현재 예약 상태
		scheduleInfo.state = 'R';
		// 이용권 가감 팝업에서 사용할 값. [확인] 버튼 클릭 시 실행할 함수 구분
		scheduleInfo.method = 'insertPastSchedule';

		return scheduleInfo
	},


	// 이용권의 결석 시 차감 유무 설정값 가져오기
	this.selectSettingOfVoucherMinusYn = function(scheduleInfo, cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			url : '/reservationsetting/json/selectSettingOfVoucherMinusYn',
			data : {
				settingRoute : 'class',
				seqPartnerClass : scheduleInfo.seqClass
			},
			dataType : 'json',
			context : this,
			success : function(returnData) {
				if (returnData.result === 'ok') {
					scheduleInfo.voucherMinusYn = returnData.DATA;

					if (typeof cbFunc === 'function') {
						cbFunc(scheduleInfo);
					}
				} else {
					alert('오류가 발생하였습니다.');
				}
			},
			error : function() {
				alert('오류가 발생하였습니다.');
			}
		});
	},


	this.selectUsageInfo = function(scheduleInfo, cbFunc) {
		$.ajax({
			type : 'post',
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			url : '/manager/schedule/class/json/selectUsageInfo',
			data : scheduleInfo,
			dataType : 'json',
			context : this,
			success : function(returnData) {
				if (typeof cbFunc === 'function') {
					cbFunc(scheduleInfo, returnData);
				}
			},
			error : function(xhr, textStatus, error) {
				alert('오류가 발생하였습니다.');
				console.log(xhr);
				console.log(textStatus);
				console.log(error);
			}
		});
	}
};
