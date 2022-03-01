$(function() {
	// 회원 검색 후 검색 결과 영역 밖을 선택(클릭)했을 때
	$(document).on('click', function(e) {
		var searchInput = $('.search_result, input[data-search="member"]');
		if (!searchInput.has(e.target).length) {
			$('.search_result').hide();
		}
	});


	// 개인레슨 이용권 추가하기-[출석처리], [결석처리] 버튼 클릭
	$(document).on('click', '[data-template="input_schedule"] [data-function="changeScheduleState"]', function() {
		// R(예약하기)는 기존 함수에서 처리
		const dataFunctionValue = $(this).data('value');
		if (dataFunctionValue === 'C') {

			// 기타 스케줄 삭제
			if (!confirm('삭제하시겠습니까?')) {
				return false;
			}

			const seqSchedule = $('#scheduleForm').find('[name="seq_schedule"]').val();
			schedulePopup.selectDetailPromiseSchedule(seqSchedule, function(returnData) {
				var params = {
					seqSchedule : returnData.seqSchedule,
					scheduleId : returnData.scheduleId,
					title : returnData.scheduleName,
					memberId : returnData.seqMember,
					productId : returnData.seqProduct,
					productPassId : returnData.seqProductPass,
					paymentId : returnData.seqPayment,
					beforeStartDate : returnData.startDate,
					status : dataFunctionValue,
					nowState : returnData.scheduleState,
					seqCoach : returnData.seqCoach,
					startDate : returnData.startDate,
					endDate : returnData.endDate,
					memo : returnData.memo
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
				});

				if(!params.startDate || !params.endDate) {
					alert("시작날짜와 종료날짜를 확인해 주세요.");
					return;
				}

				AppointmentTypeScheduleController.updatePromiseSchedule(params).then(returnData => {
					const resultData = new ResultData(returnData);
					if (resultData.isSuccess()) {
						schedulePopup.closePopup();
					} else {
						alert(resultData.getMsgForCustomer());
					}
				});
			});

		} else if (dataFunctionValue === 'E' || dataFunctionValue === 'A') {
			// 과거 시간에 개인레슨 출석/결석 처리
			schedulePopup.buildParamInsertPastSchedule(this, function(scheduleInfo) {
				schedulePopup.selectSettingOfVoucherMinusYn(scheduleInfo, function(scheduleInfo) {
					schedulePopup.selectUsageInfo(scheduleInfo, function(scheduleInfo, usageData) {
						var eventData = {
							start_date : new Date(scheduleInfo.startDate),
							end_date : new Date(scheduleInfo.endDate)
						};

						contextPopup._init(scheduleInfo, usageData, eventData, scheduleInfo.scheduleState);
						contextPopup._prepareTemplate();
						contextPopup._open();
					});
				});
			});
		}
	});


	// [회원 검색] 창에서 'enter' 키 누름
	$(document).on('keydown', '[data-template="input_schedule"] [name="member_name"]', function(event) {
		if (event.keyCode === 13) {
			var term = $(this).val().trim();
			if (term === '') {
				return false;
			}
			event.preventDefault();

			schedulePopup.searchMember(term, function(data) {
				schedulePopup.gridSearchMemberResult(data);
			});
		}
	});


	// '검색(돋보기)' 아이콘 클릭
	$(document).on('click', '[data-template="input_schedule"] [data-function="searchMember"]', function(event) {
		event.preventDefault();

		var searchWord = schedulePopup.template.find('[name="member_name"]').val();
		if (searchWord !== '') {
			schedulePopup.searchMember(searchWord, function(data) {
				schedulePopup.gridSearchMemberResult(data);
			});
		}
	});


	// 팝업 닫기
	$(document).on('click', '[data-template="input_schedule"] [data-function="close"]', function() {
		schedulePopup.closePopup();
	});


	$(document).on('change', '[data-template="input_schedule"] [name="productList"]', function() {
		schedulePopup.changeEndTime($(this).find('option:selected').data('class-time'));
	});
});


// 개인레슨 이용권 예약 팝업
var schedulePopup = {
    template : $('[data-template="input_schedule"]'),
	thisDate : '',
	data : '',

	popOpen : function(data, display) {
		this.thisDate = data.thisDate;
		this.data = data;
		schedulePopup.initForm(data, display);

        this.template.fadeIn(300);
		popHeight(); // 화면 정렬을 위한 팝업 사이즈 높이 값 계산
		return false;
	},

	setField : function (seq, name, mobile, seqemp, empname){
		$("#member_id").val(seq);
		$("#employee_id").val(seqemp);
		$("#member_name").val(name);
		$("#mobile").val(mobile);

		//해당 멤버의 상품을 가지고옴
		schedulePopup.setProduct(this.thisDate, this._productListTemplate);
		schedulePopup.template.find('[name="productList"]').trigger('change');

		$("#employee_name").val(empname);
		$('.search_result').hide();
	},


	_productListTemplate : function(productList) {
		const productListHtml = productList.map(product => {
			const usedNumber = product.basic_number - product.available_number;
			const useCntHtml = product.use_number_type === 'I' ?
				`이용 : ${usedNumber} / 잔여 : ${product.available_number} / 예약 : ${product.reserve_schedule_cnt}` :
				`이용 : ${usedNumber} / 잔여 : 무제한, 예약 : ${product.reserve_schedule_cnt}`
			;

			return `
				<option value="${product.seq_pass_info}" attr-product-pass="0"
						attr-payment="0"
						attr-pass-name="${product.product_name} - ${product.pass_name}"
						data-class-time="${product.class_time}">
					${product.pass_name} ${product.class_time}분
					(담당: ${product.coach_name} /
					만료: ${moment(product.use_end_dt).format('YYYY.MM.DD')} /
					${useCntHtml})
				</option>
			`;
		});

		$('#productList').append(productListHtml.join(''));
		$('#productList').append(`
			<option value="-100" attr-product-pass="0" attr-payment="0"
					attr-pass-name="상담예약" data-class-time="50">상담예약</option>
			<option value="-999" attr-product-pass="-999" attr-payment="0"
					attr-pass-name="OT상품" data-class-time="50">OT상품</option>
		`);
	},

	setScheduleStatCount : function(startDate, endDate, seqCoach){
		//ScheduleStatCount init
		var params = { "startDate": startDate, "endDate": endDate, "seqCoach": seqCoach };
		var stateRCnt = "0";
		var stateACnt = "0";
		var stateECnt = "0";
		var stateCCnt = "0";

		$.ajax({
	        type: "GET",
					contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	        url: "/manager/schedule/promise/json/scheduleCountList.php",
	        async:false,
	        data: params,
	        dataType: "json",
	        success: function (returnData) {
	        	var htmlStr = '';
	        	$.each(returnData, function(k, v){
	        		if(v.state == "A")
	        			stateACnt = v.cnt;
	        		if(v.state == "C")
	        			stateCCnt = v.cnt;
	        		if(v.state == "E")
	        			stateECnt = v.cnt;
	        		if(v.state == "R")
	        			stateRCnt = v.cnt;
	        	});

	        	htmlStr += "<li class='c_01'> 예약 <span>" + stateRCnt + "</span> </li>";
	        	htmlStr += "<li class='c_02'> 출석 <span>" + stateECnt + "</span> </li>";
	        	htmlStr += "<li class='c_03'> 결석 <span>" + stateACnt + "</span> </li>";
	        	htmlStr += "<li class='c_04'> 취소 <span>" + stateCCnt + "</span> </li>";
	        	htmlStr += "<li class='c_05'> 휴일 </li>";

	        	$("#schedule_state").html(htmlStr);
	        }
	    });
	},

	setProduct : function(thisDate, cbFunc) {
		//popup product init
		var seqMember = $("#member_id").val();
    	var htmlStr = '';

		$("#productList").empty();

		var params = {
			seqMember : seqMember,
			seqPartnerCoach : $('#coach_id').val(),
			useStartDt : thisDate,
			useEndDt : thisDate
		};

		$.ajax({
	        type: "POST",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	        url: "/manager/schedule/promise/json/productlist",
	        async:false,
	        data: params,
	        dataType: "json",
	        success: function(resultData) {
				if (typeof cbFunc === 'function') {
					cbFunc(resultData);
				}
			}
	    });
	},


	changeEndTime : function(classTime) {
		const startDt = this.template.find('[data-event-date]').eq(0).text();
		const startHour = this.template.find('[name="event_stime_hour"]').val();
		const startMinute = this.template.find('[name="event_stime_minute"]').val();

		const endDateTime = new Date(startDt + 'T' + startHour + ':' + startMinute + "+09:00");
		endDateTime.setMinutes(endDateTime.getMinutes() + (classTime || 0));

		this.template.find('[name="event_etime_hour"]').val(endDateTime.getHours().zf(2));
		this.template.find('[name="event_etime_minute"]').val(endDateTime.getMinutes().zf(2));
	},

	setCoach : function(){
		//popup coach init
		$.ajax({
	        type: "POST",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	        url: "/manager/schedule/promise/json/coachlist.php",
	        async:false,
	        dataType: "json",
	        success: function (returnData) {
	        	var htmlStr = '';
	        	htmlStr = "<option value=''>강사 선택</option>";
	        	$.each(returnData, function(k, v){
	        		htmlStr += "<option value='" + v.key + "'>" + v.label + "</option>";
	        	});
	        	$("#coachList").prepend(htmlStr);
	        }
	    });
	},

	//상품
	setEvent : function(){
		$('#event_state').change(function(){
	        if($('#event_state option:selected').val() == "B"){
	        	//if($("#input_mode").val() == "insert"){
	        	schedulePopup.resetField();
	        	jQuery('#member_container').hide();
	        	jQuery('#mobile_container').hide();
	        	jQuery('#employee_container').hide();
	        	jQuery('#product_container').hide();
	        	/* }else{
	        		alert("이미 등록된 예약은 '차단'상태로 변경할 수 없습니다.");
	        		return false;
	        	} */
	        }else{
	        	if($("#input_mode").val() == "update" && $("#before_state").val() == "B"){ //업데이트일때 상태가 B일때만
	    			$("#before_productList_id").val($("#before_productList_id").val());
	    			$("#employee_id").val($("#before_employee_id").val());
	    			$("#member_id").val($("#before_member_id").val());
	    			$("#product_id").val($("#before_product_id").val());
	    			$("#product_pass_id").val($("#before_product_pass_id").val());
	    			$("#payment_id").val($("#before_payment_id").val());
	    			$("#employee_name").val($("#before_employee_name").val());
	    			$("#member_name").val($("#before_member_name").val());
	    			$("#mobile").val($("#before_mobile").val());
	    			$("#productList").val($("#before_productList_id").val());
	    		}

	        	jQuery('#member_container').show();
	        	jQuery('#mobile_container').show();
	        	jQuery('#employee_container').show();
	        	jQuery('#product_container').show();
	        }

	        $("#before_state").val($('#event_state option:selected').val());
	    });
	},

	resetField : function(){
		if($("#input_mode").val() == "update"){ //업데이트일때 상태가 B일때만
			$("#before_productList_id").val($('#productList option:selected').val());
			$("#before_employee_id").val($("#employee_id").val());
			$("#before_member_id").val($("#member_id").val());
			$("#before_product_id").val($("#product_id").val());
			$("#before_product_pass_id").val($("#product_pass_id").val());
			$("#before_payment_id").val($("#payment_id").val());
			$("#before_employee_name").val($("#employee_name").val());
			$("#before_member_name").val($("#member_name").val());
			$("#before_mobile").val($("#mobile").val());
		}

		$("#product_init_id").val("");
    	$("#employee_id").val("");
    	$("#member_id").val("");
    	$("#product_id").val("");
    	$("#product_pass_id").val("");
    	$("#payment_id").val("");
    	$("#employee_name").val("");
    	$("#member_name").val("");
    	$("#mobile").val("");
    	$("#productList").val($("#product_init_id").val());
	},

	initForm : function(data, display) {
		$('#input_mode').val(data.inputMode);
		$('#event_state').val(data.eventState);
		$('#now_state').val(data.eventState);
		$('#coach_name').val(data.coachName);

		const formatFuncStrToDate = scheduler.date.str_to_date('%Y-%m-%d %H:%i:%s');
		const formatFuncDate = scheduler.date.date_to_str('%Y-%m-%d');
		const formatFuncTime = scheduler.date.date_to_str('%H:%i');
		const formatFuncHour = scheduler.date.date_to_str('%H');
		const formatFuncMinute = scheduler.date.date_to_str('%i');

		/* ******** 스케줄 변경 권한 설정 ******** */
		const setPermission = () => {
			const template = this.template[0];
			const p = template.querySelector("[name='event_stime_hour']").parentNode;
			const span = p.querySelector("[data-id='note']");
			const selectList = p.querySelectorAll("select");
			const isPermission = (data.inputMode == "insert" || loginCoachData.permission.permissionSchedule.modifyAppointmentTime);
			selectList.forEach(item => {
				if(isPermission) {
					item.disabled = false;
					span.style.display = "none";
				} else {
					item.disabled = true;
					span.style.display = "block";
				}
			});
		};
		setPermission();

		if (data.inputMode === 'insert') {
			$('#btnDelete').hide();

			$('[name=member_name]').attr('readonly', false);
			$('select[name=productList]').attr('disabled', false);

			$('input:radio[name=membership]').attr('disabled', false);

			$('[name=member_name]').attr('disabled', false);
			$('button[data-function=searchMember]').show();

			// 상황에 따른 예약/출석/결석 버튼, 상단 탭 노출 유무
			this.template.find('[data-function="changeScheduleState"]').hide();
			if (display.isFutureSchedule) {
				this.template.find('[data-msg="todo"]').text('예약하기');
				this.template.find('[data-function="changeScheduleState"]')
					.filter('[data-value="R"]').text('예약하기').show();
			} else {
				this.template.find('[data-msg="todo"]').text('추가하기');
				this.template.find('[data-function="changeScheduleState"]').hide();
				this.template.find('[data-function="changeScheduleState"]')
					.filter('[data-value="E"], [data-value="A"]').show();

				this.template.find('[data-design="reservationTab"]').hide();
			}

		} else if (data.inputMode === 'update') {
			$('input[name=before_start_date]').val(data.start_date);

			var formatThisDate = formatFuncStrToDate(data.start_date);
			data.thisDate = formatFuncDate(formatThisDate);
			data.start_date = formatFuncStrToDate(data.start_date);
			data.end_date = formatFuncStrToDate(data.end_date);

			$('[name=member_name]').attr('readonly', true);
			$('[name=membership]').attr('disabled', true);
			$('select[name=productList]').attr('disabled', true);

			$('[name=member_name]').attr('disabled', true);
			$('button[data-function=searchMember]').hide();

			$('input:radio[name=membership]').not('[value=' + display.membershipValue + ']').attr('disabled', true);

			$('#btnDelete').show();

			this.template.find('[data-msg="todo"]').text('수정하기');
			this.template.find('[data-function="changeScheduleState"]').hide();
			this.template.find('[data-function="changeScheduleState"]').filter('[data-value="R"]').text('수정하기').show();

			if (data.eventState === 'B') {
				this.template.find('[data-function="changeScheduleState"]').filter('[data-value="C"]').show();
			}
		}

		const thisDate = data.thisDate;
		const stime = formatFuncTime(data.start_date);
		const stimeHour = formatFuncHour(data.start_date);
		const stimeMinute = formatFuncMinute(data.start_date);

		const etime = formatFuncTime(data.end_date);
		const etimeHour = formatFuncHour(data.end_date);
		const etimeMinute = formatFuncMinute(data.end_date);


		$('#seq_schedule').val(data.seqSchedule);
	    $("#event_id").val(data.event_id);

	    $("[data-event-date]").html(thisDate);

	    $("select[name=event_stime_hour]").val(stimeHour);
	    $("select[name=event_stime_minute]").val(stimeMinute);

		$("select[name=event_etime_hour]").val(etimeHour);
		$("select[name=event_etime_minute]").val(etimeMinute);

		$('#coach_id').val(data.seq_coach);
		$('[data-coach-name]').html($('#coachList option[value=' + data.seq_coach + ']').text());


		$('#member_id').val(data.seqMember);
		$('#mobile').val(data.mobile);
		$('#member_name').val(data.memberName);

		$('#nonmember_name').val(data.nonmemberName);
		$('#nonmember_mobile').val(data.nonmemberMobile);

		$('[name=event_memo]').val(data.memo);

		$('#payment_id').val(data.seqPayment);
		$('#product_id').val(data.seqProduct);
		$('#product_pass_id').val(data.seqProductPass);

		if (data.inputMode === 'update' && data.eventState !== 'B') {
			schedulePopup.setProduct(thisDate, this._productListTemplate);
			this.template.find('[name="productList"]')
				.find(`[value="${data.seqProduct}"][attr-product-pass="${data.seqProductPass}"][attr-payment="${data.seqPayment}"]`)
				.prop('selected', true);
		}

		var $tabList = $('[data-template="input_schedule"]').find('[data-design="reservationTab"]');
//		var $tabList = $('.tab_area.pop_tab > ul > li > button');
		$($tabList[display.activePaneIndex]).trigger('click');

		$(':input:radio[name=membership][value=' + display.membershipValue + ']').prop('checked', true);
		if (data.inputMode === 'update') {		// 업데이트 시에는 예약/기타 탭 변경 불가
			$('.tab_area.pop_tab > ul > li > button').not('.active').css({display: 'none'});
		}
	},


	// 회원 검색(enter 키 입력해야 검색)
	searchMember : function(searchWord, cbFunc) {
		$.ajax({
			type : "POST",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			url : "/manager/schedule/promise/json/memberlist",
			data : {
				term : searchWord
			},
			dataType : "json",
			success : function(data) {
				if (typeof cbFunc === 'function') {
					cbFunc(data);
				}
			}
		});
	},

	//저장
	setPopupBtn : function() {
		$("#btnSave").on("click", function(){
	     	event.preventDefault();

	     	var form = $("#scheduleForm");

	     	var event_id = form.find("input[name=event_id]");
	     	var member_id = form.find("input[name=member_id]");
	     	var member_name = form.find("input[name=member_name]");
	     	var coach_id = form.find("input[name=coach_id]");
	     	var coach_name = form.find("input[name=coach_name]");
	     	var event_state = form.find("input[name=event_state]");
	     	var member_mobile = form.find("input[name=mobile]");
	     	var now_state = form.find("input[name=now_state]");
	     	var nonmember_name = form.find("input[name=nonmember_name]");
	     	var nonmember_mobile = form.find("input[name=nonmember_mobile]");

	     	var selectedProductUsage = form.find("select[name=productList] option:selected");
	     	var product_id = $(selectedProductUsage).val();
	     	var product_pass_id = $(selectedProductUsage).attr("attr-product-pass");
	     	var payment_id = $(selectedProductUsage).attr("attr-payment");
	     	var product_name = $(selectedProductUsage).text();
	     	var pass_name = $(selectedProductUsage).attr('attr-pass-name');
	     	var pass_info_id = $(selectedProductUsage).val();

	     	var use_yn = "";

	     	var activePane;
	     	$(form).find('[class^=pop_tab_]').each(function(k, v) {
	     		if ($(v).is(':visible')) {
	     			activePane = $(v);
	     		}
	     	});

	     	var event_date = activePane.find('[data-event-date]').text();

	     	var event_stime_hour = activePane.find("select[name=event_stime_hour] option:selected");
	     	var event_stime_minute = activePane.find("select[name=event_stime_minute] option:selected");
	     	var event_sdate = event_date + " " + event_stime_hour.val() + ':' + event_stime_minute.val();

	     	var event_etime_hour = activePane.find("select[name=event_etime_hour] option:selected");
	     	var event_etime_minute = activePane.find("select[name=event_etime_minute] option:selected");
	     	var event_edate = event_date + " " + event_etime_hour.val() + ':' + event_etime_minute.val();

			const eventStartHour = Number(event_stime_hour.val());
			const eventEndHour = Number(event_etime_hour.val());
			const centerStartHour = Number(scheduler.config.first_hour);
	     	const centerEndHour = Number(scheduler.config.last_hour);
	     	const addDay = (endDate) => {
				const date = new Date(endDate.replace(" ", "T"));
				date.setDate(date.getDate() + 1);
				return date.format("yyyy-MM-dd HH:mm");
			};

			// 24시간일 경우에만 적용한다.
			if(centerStartHour == 0 && centerEndHour == 24) {
				if(eventStartHour > eventEndHour)
					event_edate = addDay(event_edate);
			} else {
				if(eventStartHour > eventEndHour && eventEndHour == 0)
					event_edate = addDay(event_edate);
			}

			// 시작 시간 종료 시간 체크
			const checkDate = (startDate, endDate) => {
				startDate = new Date(startDate.replace(" ", "T"));
				endDate = new Date(endDate.replace(" ", "T"));
				const startTime = startDate.getTime();
				const endTime = endDate.getTime();
				return (startTime < endTime);
			};

			if(!checkDate(event_sdate, event_edate)) {
				alert("수업 시작/종료 시간이 유효하지 않습니다.");
				return;
			}

	     	var event_memo = activePane.find("textarea[name=event_memo]");
	     	var event_title = "";

	     	//validation check
	     	if (event_state.val() !== 'B') {
	     		if (nonmember_name.val() != "" && nonmember_mobile.val() != "") { //미등록 회원여부
	     			member_id.val("0");
	     			if (product_id ==="") return alert(product_name.parent().attr("title") + "을(를) 선택해주세요.");
	     		} else {
	     			if (member_id.val() ==="") return alert(member_name.attr("title") + "을(를) 선택해주세요.");
	     			if (product_id ==="") return alert(product_name.parent().attr("title") + "을(를) 선택해주세요.");
	     		}
	     	}


	     	if (event_state.val() !== 'B') {
	     		let event_state_text = '';
	     		if (event_state.val() === 'R') {
	     			event_state_text = '예약';

	     		} else  if (event_state.val()=== 'E') {
	     			event_state_text = '출석';

	     		} else  if (event_state.val() === 'A') {
	     			event_state_text = '결석';

	     		} else  if (event_state.val() === 'C') {
	     			event_state_text = '취소';
	     		}

				const passName = $('#scheduleForm').find('select[name=productList] option:selected').attr('attr-pass-name');
	     		if (nonmember_name.val() !== '' && nonmember_mobile.val() !== '') {
					event_title = nonmember_name.val() + '_' + event_state_text + '_' +
						nonmember_mobile.val() + '_' + passName;

				} else {
					event_title = member_name.val() + '_' + event_state_text + '_' +
						member_mobile.val() + '_' + passName;
				}

			} else {
				const indexOfLineFeed = event_memo.val().indexOf('\n');
				event_title = indexOfLineFeed > 0 ?
					'기타스케줄_' +  event_memo.val().substring(0, indexOfLineFeed) :
					'기타스케줄_' +  event_memo.val();

				product_id = 0;
				product_pass_id = 0;

				if ($(this).data('value') === 'A')
					use_yn = 'N';
			}

			//schedule insert & update
			if ($('#input_mode').val() === 'insert') {
				let params = {
					startDate : event_sdate,
					endDate : event_edate,
					seqCoach : coach_id.val(),
					title : event_title,
					memo : event_memo.val(),
					coachName : $('#coachList option[value="' + coach_id.val() + '"]').text(),
					memberName : member_name.val(),
					appointmentName : $('#scheduleForm').find('select[name=productList] option:selected').attr('attr-pass-name'),
					nonmemberName : nonmember_name.val(),
					status : event_state.val(),
					scheduleId : event_id.val(),
					memberId : member_id.val(),
					productId : product_id,
					productPassId : product_pass_id,
					paymentId : payment_id,
					nonmemberMobile : nonmember_mobile.val(),
					nowState : now_state.val(),
					passInfoId : pass_info_id
				};

				params = Object.assign({}, params, {
					startDate: moment(params.startDate, 'YYYY-MM-DD HH:mm').toISOString(true),
					endDate: moment(params.endDate, 'YYYY-MM-DD HH:mm').toISOString(true),
					seqPartnerCoach: Number.parseInt(params.seqCoach, 10) || 0,
					seqMember: Number.parseInt(params.memberId, 10) || 0,
					seqPartnerProduct: Number.parseInt(params.productId, 10) || 0,
					seqPartnerProductPass: Number.parseInt(params.productPassId, 10) || 0,
					seqPartnerPayment: Number.parseInt(params.paymentId, 10) || 0,
					seqPassInfo: Number.parseInt(params.passInfoId, 10) || 0,
					scheduleState : params.status,
					scheduleName : params.title
				});

				AppointmentTypeScheduleController.insertPromiseSchedule(params).then(returnData => {
					const resultData = new ResultData(returnData);
					if (resultData.isSuccess()) {
						schedulePopup.closePopup();
						return;
					}

					if (resultData.isErrOfUseLimitOver()) {
						const message = resultData.getMsgForCustomer();
						if (confirm(message + ' 그래도 수행하시겠습니까?')) {
							AppointmentTypeScheduleController.saveReservationOutOfWeeklyLimit(params).then(returnData => {
								const resultData = new ResultData(returnData);
								if (resultData.isSuccess()) {
									schedulePopup.closePopup();
									return;
								}

								alert(resultData.getMsgForCustomer());
							});
						}
					} else if (resultData.isErrOfSpace()) {
						if (confirm('예약장소 공간이 부족합니다.그래도 수행하시겠습니까?')) {
							AppointmentTypeScheduleController.saveReservationOutOfWeeklyLimit(params).then(returnData => {
								const resultData = new ResultData(returnData);
								if (resultData.isSuccess()) {
									schedulePopup.closePopup();
									return;
								}

								alert(resultData.getMsgForCustomer());
							});
						}
					} else {
						alert(resultData.getMsgForCustomer());
					}

				});

			} else {
				let uptState = '';
				if (event_state.val() === '') {
					uptState = $('#before_state').val();
				} else {
					uptState = event_state.val();
				}

				let params = {
					seqSchedule : schedulePopup.data.seqSchedule,
					'startDate' : event_sdate,
					'endDate' : event_edate,
					'seqCoach' : coach_id.val(),
					'coachName' : coach_name.val(),
					'title' : event_title,
					'memo' : event_memo.val(),
					'appointmentName' : $('#scheduleForm').find('select[name=productList] option:selected').attr('attr-pass-name'),
					'memberName' : member_name.val(),
					'nonmemberName' : nonmember_name.val(),
					'status' : uptState,
					'scheduleId' : event_id.val(),
					'memberId' : member_id.val(),
					'productId' : product_id,
					'productPassId' : product_pass_id,
					'paymentId' : payment_id,
					'nonmemberMobile' : nonmember_mobile.val(),
					'nowState' : now_state.val(),
					'beforeStartDate' : $('input[name=before_start_date]').val(),
					'productName' : schedulePopup.data.productName,
					'voucherMinusYn' : schedulePopup.data.voucherMinusYn,
					'useYn' : use_yn
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
					scheduleName : params.title
				});


				AppointmentTypeScheduleController.updatePromiseSchedule(params).then(returnData => {
					const resultData = new ResultData(returnData);
					if (resultData.isSuccess()) {
						schedulePopup.closePopup();
					} else {
						alert(resultData.getMsgForCustomer());
					}
				});
			}
	    });

		$("#btnDelete").on("click", function(){
	     	event.preventDefault(); //브라우저 커서가 최상단으로 올라가는것을 막아줌
	     	var form = $("#scheduleForm");
	     	var event_id = form.find("input[name=event_id]");

	     	if (event_id.val() =="") return alert("선택된 스케줄이 없습니다. 다시 선택해주세요.");
	     	if (confirm("정말 삭제하시겠습니까??") == true){

				var params = { "scheduleId": event_id.val() };

				var targetUrl = "";
			    targetUrl = "/manager/schedule/promise/json/deletePromiseSchedule";

			    $.ajax({
	               	type: "POST",
					contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	               	url: targetUrl,
	               	data: params,
	               	dataType: "json",
	               	success: function (returnData) {
	               	//	scheduler.clearAll();
	               		//console.log("@@ + "+ returnData.RESULT);
	               		//alert(returnData.RESULT_MSG);
	               		schedulePopup.closePopup();
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


			    //schedulePopup.resetReload();
	     	}else{

			}
	    });


		$( "#coachList").change(function() {
			//if($("#schedule_mode").val() == "week"){
			if($("#coachList").val() != ""){
				$("#coach_id").val($("#coachList").val());

				$("#schedule_mode").val("week");
				schedulePopup.resetReload();

				var selDate = new Date(scheduler.getState().date);

				var formatFuncYY = scheduler.date.date_to_str("%Y");
				var formatFuncMM = scheduler.date.date_to_str("%m");
				var formatFuncDD = scheduler.date.date_to_str("%d");

				var newDate = scheduler.date.add(new Date(scheduler.getState().date), 1, 'month');
				var now_date = new Date(scheduler.getState().date);
				now_date.setMonth(now_date.getMonth() - 1);

				var year = formatFuncYY(now_date);
				var cal_month = formatFuncMM(now_date);
				var day = formatFuncDD(now_date);

				//console.log("selDate" + selDate);
				scheduler.deleteMarkedTimespan();
				scheduleList.getWeekCoachScheduleList(selDate);
    			scheduleList.getWeekCoachPromiseScheduleList(selDate);
    			scheduleList.getWeekClassList(selDate);

		    	scheduler.updateView(new Date(year,cal_month,day), "week");
				scheduler.setCurrentView();

				//$("#schedule_state").html("");	여기 수정
			}else{
				$("#schedule_mode").val("unit");
				schedulePopup.resetReload();

				var selDate = new Date(scheduler.getState().date);

				var formatFuncYY = scheduler.date.date_to_str("%Y");
				var formatFuncMM = scheduler.date.date_to_str("%m");
				var formatFuncDD = scheduler.date.date_to_str("%d");

				var newDate = scheduler.date.add(new Date(scheduler.getState().date), 1, 'month');
				var now_date = new Date(scheduler.getState().date);
				now_date.setMonth(now_date.getMonth() - 1);

				var year = formatFuncYY(now_date);
				var cal_month = formatFuncMM(now_date);
				var day = formatFuncDD(now_date);

				//console.log("selDate" + selDate);
				scheduler.deleteMarkedTimespan();
				scheduleList.getWeekCoachScheduleList(selDate);
    			scheduleList.getWeekCoachPromiseScheduleList(selDate);
    			scheduleList.getWeekClassList(selDate);

		    	scheduler.updateView(new Date(year,cal_month,day), "unit");
				scheduler.setCurrentView();
			}
			//}
		});


		// event::탭 버튼 클릭
		var $tabList = $('.tab_area.pop_tab > ul > li > button');
		$tabList.on('click', function() {
			var clickIndex = $tabList.index(this);
			var contentList = $('[class^=pop_tab_]');

			if ($('#input_mode').val() === 'insert') {
				if (clickIndex === 0) {
					$('#event_state').val('R');
				} else {
					$('#event_state').val('B');
				}

			}

			$tabList.each(function(k, v) {
				if (clickIndex === k) {
					$(v).addClass('active');
					$(contentList[k]).show();
				} else {
					$(v).removeClass('active');
					$(contentList[k]).hide();
				}
			});

			popHeight();
		});


		// event::라디오 버튼 클릭 [등록 회원 예약하기] / [미등록 회원 예약하기]
		$('input:radio[name="membership"]').on('click', function() {
			const resetProductList = () => {
				try {
					schedulePopup.resetField();
					const form = document.querySelector("[name='scheduleForm']");
					const select = form.querySelector("[name='productList']");
					if(select) {
						const optionList = Array.from(select.options);
						optionList.forEach(item => {
							if(Number(item.value) > 0) {
								item.parentNode.removeChild(item);
							}
						});
						if(select.options[0])
							select.options[0].selected = true;
					}
				} catch(error) {
					console.log(error);
				}
			};
			resetProductList();
			popHeight();
		});
	},

	closePopup : function(){
		this.template.fadeOut(300, function() {
			schedulePopup.resetReload();

			$('#search_container').hide();
			$("#search_memberlist").hide("");
			$("#title_memberlist").hide("");
		});
	},

	resetReload : function(){
		scheduler.clearAll();

		var tempMode = $("#schedule_mode").val();
		var tempCoachId = $("#coach_id").val();

//		$("#scheduleForm")[0].reset();
		$('#scheduleForm').clearForm();
		$('#scheduleForm').find('#productList').empty();
		$('#scheduleForm').find('#productList').prepend('<option value="-100" attr-product-pass="0" attr-payment="0" attr-pass-name="상담예약" data-class-time="50">상담예약</option>');
		$('#scheduleForm').find('#productList').prepend('<option value="-999" attr-product-pass="-999" attr-payment="0" attr-pass-name="OT상품">OT상품</option>');

		$('#scheduleForm').find('#productList option:eq(0)').prop('selected', true);
		$('#addModal').modal('hide');
		$("#schedule_mode").val(tempMode);
		$("#coach_id").val(tempCoachId);

		$('.tab_area.pop_tab > ul > li > button').attr('style', '');

		setTimeout("scheduleList.resetView()",200);

		var formatFuncYYMMDD = scheduler.date.date_to_str("%Y-%m-%d");
		var searchSDate = "";
		var nextDate = "";
		var searchEDate = "";
		let seqCoach;
		if($("#schedule_mode").val() == "unit"){
			//상태 리로드
			searchSDate = formatFuncYYMMDD(scheduler.getState().date);
		 	nextDate = scheduler.date.add(new Date(scheduler.getState().date), 1, 'day');
			searchEDate = formatFuncYYMMDD(nextDate);
			seqCoach = "";
		}else{
			searchSDate = formatFuncYYMMDD(scheduler.date.week_start(scheduler.getState().date));
			searchEDate = formatFuncYYMMDD(scheduler.date.add(searchSDate, 7, 'day'));
			seqCoach = $("#coachList").val();
		}
		schedulePopup.setScheduleStatCount(searchSDate, searchEDate, seqCoach);
	},

	//해당 약속의 상태체크
	chkPromiseState : function(eventData){
		$.ajax({
	        type: "GET",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	        url: "/manager/schedule/promise/json/detailPromiseSchedule",
	        async:false,
			data : {
				seqSchedule : eventData.seq_schedule
			},
	        dataType: "json",
	        success: function (returnData) {
	        	if (returnData.RESULT !== 'SUCCESS') {
	        		return alert('오류가 발생하였습니다.');
	        	}

	        	returnData = returnData.DATA;

    			var scheduleState = returnData.scheduleState;
    			var activePaneIndex = (scheduleState === 'B') ? 1 : 0;
    			var membershipValue = (returnData.seqMember) ? 'member' : 'nonmember';

				var data = {
					inputMode :'update',
					eventState : scheduleState,
					seq_coach : returnData.seqCoach,
					coachName : returnData.coachName,
					this_date : returnData.startDate,
					start_date : returnData.startDate,
					end_date : returnData.endDate,
					event_id : returnData.scheduleId,
					seqSchedule : returnData.seqSchedule,
					memo : returnData.memo,
					seqMember : returnData.seqMember,
					memberName : returnData.memberName,
					nonmemberName : returnData.nonmemberName,
					nonmemberMobile : returnData.nonmemberMobile,
					seqPayment : returnData.seqPayment,
					seqProduct : returnData.seqProduct,
					seqProductPass : returnData.seqProductPass,
					mobile : returnData.mobile,
					productName : returnData.productName,
					voucherMinusYn : returnData.voucherMinusYn
				};

				var display = {
					activePaneIndex: activePaneIndex,
					membershipValue: membershipValue
				};

				schedulePopup.popOpen(data, display);
	        }
	    });
	},


	// schedule_id로 스케줄 조회
	selectDetailPromiseSchedule : function(seqSchedule, cbFunc) {
		$.ajax({
			type: "GET",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			url: "/manager/schedule/promise/json/detailPromiseSchedule",
			data : {
				seqSchedule : seqSchedule
			},
			dataType: "json",
			success: function (returnData) {
				if (returnData.RESULT !== 'SUCCESS') {
					return alert('오류가 발생하였습니다.');
				}

				if (returnData.DATA === undefined || returnData.length === 0) {
					alert('데이터가 없습니다.');
					return false;
				}

				if (typeof cbFunc === 'function') {
					cbFunc(returnData.DATA);
				}
			}
		});
	},


	// 개인레슨 이용권 추가하기-[출석처리], [결석처리] 버튼 클릭 시 유효성 검증 및 params 생성
	buildParamInsertPastSchedule : function(context, cbFunc) {
		var form = $("#scheduleForm");

		var params = {
			scheduleId : form.find("input[name=event_id]").val(),
			seqCoach : form.find("input[name=coach_id]").val(),
			coachName : form.find("input[name=coach_name]").val(),
			scheduleType : 'appointment'
		};

		// 이용권 가감 팝업에서 사용할 값. [확인] 버튼 클릭 시 실행할 함수 구분
		params.method = 'insertPastSchedule';


		// 추가하기에는 두번째 탭이 없음. activePane 고정값 사용
		var activePane = $(form).find('[class=pop_tab_01]');
		var event_date = activePane.find('[data-event-date]').text();

     	var event_stime_hour = activePane.find("select[name=event_stime_hour] option:selected");
     	var event_stime_minute = activePane.find("select[name=event_stime_minute] option:selected");
     	var startDate = event_date + " " + event_stime_hour.val() + ':' + event_stime_minute.val();

     	var event_etime_hour = activePane.find("select[name=event_etime_hour] option:selected");
     	var event_etime_minute = activePane.find("select[name=event_etime_minute] option:selected");
     	var endDate = event_date + " " + event_etime_hour.val() + ':' + event_etime_minute.val();

		if (new Date(endDate).getTime() - new Date(startDate).getTime() <= 0) {
			alert('수업 시작/종료 시간이 유효하지 않습니다.');
			return false;
		}

		const checkStartDate = moment(startDate).toISOString(true);
		const checkEndDate = moment(endDate).toISOString(true);
		if(!checkStartDate || !checkEndDate) {
			alert("시작날짜와 종료날짜를 확인해 주세요.");
			return false;
		}

		params.startDate = startDate;
		params.endDate = endDate;
		params.memo = activePane.find('textarea[name="event_memo"]').val();


		var membership = form.find('input[name="membership"]:checked').val();
     	if (membership === 'member') {
     		var member_id = form.find("input[name=member_id]").val();
     		var member_name = form.find("input[name=member_name]").val();
     		var member_mobile = form.find("input[name=mobile]").val();

     		if (member_id === '' || member_name === '' || member_mobile === '') {
     			alert('회원을 선택해 주세요');
     			return false;
     		}

     		params.seqMember = member_id;
     		params.memberName = member_name;
     		params.memberMobile = member_mobile;

     	} else if (membership === 'nonmember') {
     		var nonmember_name = form.find("input[name=nonmember_name]").val();
     		var nonmember_mobile = form.find("input[name=nonmember_mobile]").val();

     		if (nonmember_name === '' || nonmember_mobile === '') {
     			alert('미등록회원 정보를 입력해 주세요');
     			return false;
     		}

     		params.nonmemberName = nonmember_name;
     		params.nonmemberMobile = nonmember_mobile;
     	} else {
     		alert('잘못된 선택입니다.');
     		return false;
     	}


        var selectedProductUsage = form.find("select[name=productList] option:selected");
        var seqPayment = $(selectedProductUsage).attr("attr-payment");
        var seqProduct = $(selectedProductUsage).val();
        var seqProductPass = $(selectedProductUsage).attr("attr-product-pass");
        var productName = $(selectedProductUsage).text();
        var passName = $(selectedProductUsage).attr('attr-pass-name');
        var seqPassInfo = $(selectedProductUsage).val();

     	if (seqPayment === '' || seqProduct === '' || seqProductPass === '' || productName === '' || passName === '') {
     		alert('이용권을 선택해주세요');
     		return false;
     	}

     	params.seqPayment = seqPayment;
     	params.seqProduct = seqProduct;
     	params.seqProductPass = seqProductPass;
     	params.productName = productName;
     	params.appointmentName = passName;
     	params.seqPassInfo = seqPassInfo;


     	params.nowState = 'R';
     	params.scheduleState = $(context).data('value');

     	var scheduleStateText = '';
 		if (params.scheduleState === 'E') {
 			scheduleStateText = '출석';

 		} else if (params.scheduleState === 'A') {
 			scheduleStateText = '결석';

 		} else {
 			alert('잘못된 선택입니다.');
 			return false;
 		}


 		if (membership === 'member') {
     		params.scheduleName = params.memberName  + "_" +
     			scheduleStateText + "_" +
     			params.memberMobile + "_" +
     			$('#productList option:selected').text().trim();

     	} else if (membership === 'nonmember') {
	 		params.scheduleName = params.nonmemberName + "_" +
	 			scheduleStateText + "_" +
	     		params.nonmemberMobile + "_" +
	     		$('#productList option:selected').text().trim();
     	}


     	if (typeof cbFunc === 'function') {
     		cbFunc(params);
     	}
	},


	// 미예약 이용권의 이용내역, 출결처리 시 이용권 가감 결과 불러오기
	selectUsageInfo : function(scheduleInfo, cbFunc) {
		if (scheduleInfo.seqProduct === '0' || scheduleInfo.seqProduct === '-999') {
			scheduleInfo.productName = 'OT 상품';
			scheduleInfo.appointmentName = '';

			const ticketInfo = {
				usageProductInfo : {
					useNumberType : 'F',
					remainNumber : '무제한',
					remainDate : '제한없음',
					passName : '1회권 상품',
					lessonName : '1회권 상품'
				},
				changeTicketCnt : 0
			};

			if (typeof cbFunc === 'function') {
				cbFunc(scheduleInfo, ticketInfo);
			}

		} else if (scheduleInfo.seqProduct === '-100') {
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
				cbFunc(scheduleInfo, ticketInfo);
			}

		} else {
			$.ajax({
				type : 'post',
				contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
				url : '/manager/schedule/promise/json/selectUsageInfo',
				data : scheduleInfo,
				dataType : 'json',
				context: this,
				success : function(returnData) {
					if (returnData.usageProductInfo === undefined) {
						alert('이용권 내역을 불러올 수 없습니다. 이용권을 확인해주세요.');
						return;
					}

					if (typeof cbFunc === 'function') {
						cbFunc(scheduleInfo, returnData);
					}
				},
				error : function() {
					console.log('오류가 발생했습니다.');
				}
			});
		}
	},


	// 이용권 가감 팝업에 넘겨줄 데이터 bind
	popupForInsertPastSchedule : function(scheduleInfo, cbFunc) {
		if (scheduleInfo.seqProduct == 0 || scheduleInfo.seqProduct == -999) {
			scheduleInfo.productName = 'OT 상품';
			scheduleInfo.appointmentName = '';

			var ticketInfo = {
				usageProductInfo : {
					useNumberType : 'F',
					remainNumber : '무제한',
					remainDate : '제한없음'
				},
				changeTicketCnt : 0
			};

			if (typeof cbFunc === 'function') {
				contextPopup._init(scheduleInfo, ticketInfo, scheduleInfo, scheduleInfo.scheduleState);
				cbFunc();
			}

		} else {
			contextPopup._selectDetailPromiseScheduleTicket(scheduleInfo, function(ticketInfo, context) {
				context._init(scheduleInfo, ticketInfo, scheduleInfo, scheduleInfo.scheduleState);

				if (typeof cbFunc === 'function') {
					cbFunc();
				}
			});
		}
	},


	// 이용권의 결석 시 차감 유무 설정값 가져오기
	selectSettingOfVoucherMinusYn : function(scheduleInfo, cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			url : '/reservationsetting/json/selectSettingOfVoucherMinusYn/index.php',
			data : {
				settingRoute : 'coach',
				seqPartnerCoach : scheduleInfo.seqCoach
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
		})
	},


	// 회원 검색 결과 만들기
	gridSearchMemberResult : function(memberList) {
		$("#memberListResult").empty();

		var dataHtml = '';
		if (memberList !== '' && memberList !== null && memberList.length > 0) {
			memberList.forEach(function(v, i) {
				var html = "<li>" +
						"<a href='#' onclick='schedulePopup.setField(\"" + v.seq + "\",\"" + v.name + "\",\"" + v.mobile + "\",\"" + v.seqEmployee + "\",\"" + v.employeeName + "\");'>" +
							'<strong>' + v.name + '</strong>' +
							'<span>' + v.mobile + '</span>' +
						"</a>" +
					"</li>";

				dataHtml += html;
			});

		} else {
			dataHtml = '<li>검색 결과가 없습니다.</li>';
		}

		$("#memberListResult").html(dataHtml);
		$('.search_result').show();
	}
};
