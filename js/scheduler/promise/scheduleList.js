var scheduleList = {
	/* modalShow : function (){
		$('#addModal').modal({backdrop: 'static', keyboard: false}) ;
		$('#addModal').modal('show');
	},	 */
	serviceType : "appointment",
	init : function() {
		let config = JSON.parse(window.localStorage.getItem("configScheduler") || "{}");
		config = (config.appointment) ? config.appointment : {};

		if(!config.hourSize) config.hourSize = 1;
		if(!config.hourHeight) config.hourHeight = 44;
		if(!config.unitCount) config.unitCount = 7;
		if(!config.separateYn) config.separateYn = "N";
		if(!config.titleType) config.titleType = 1;
		if(!config.titleAlign) config.titleAlign = "center";

		scheduler.config.multisection = true;

		/* start with monday */
	    scheduler.config.start_on_monday=true;
		/* common locale settings */
	    scheduler.config.default_date="%Y년 %M %j일 %l";
	    scheduler.config.month_date="%Y년 %M";
	    //scheduler.config.week_date="%l, %W";
	    scheduler.config.day_date = "%D, %F%j일";
	    scheduler.config.hour_date="%H:%i";

		scheduler.templates.event_class = function(start, end, event){
			var original = scheduler.getEvent(event.id);
			if(!scheduler.isMultisectionEvent(original))
				return "";
			return "multisection section_" + event.section_id;
		};

		scheduler.config.xml_date="%Y-%m-%d %H:%i";
		scheduler.locale.labels.timeline_tab = "타임라인";
		scheduler.locale.labels.unit_tab = "일"; //강사
		scheduler.locale.labels.section_custom = "섹션";

		//scheduler.xy.scale_height = 40; //height of x-scale
		scheduler.config.hour_size_px = config.hourHeight * config.hourSize;
	    scheduler.config.separate_short_events = (config.separateYn == "Y") ? true : false;
		const container = document.getElementById("scheduler_here");
		container.classList.add("size" + config.hourSize * 10);

		//scheduler.config.section_size_px = 200;
		//scheduler.config.min_grid_size = 310;

		scheduler.config.drag_create = false;
		//scheduler.config.drag_move = false;

		//################################################################ 입력용 #####################################
		scheduler.config.multi_day = true;
		scheduler.config.details_on_create = true;

		//tootltip
		scheduler.config.className = 'dhtmlXTooltip tooltip';
		scheduler.config.timeout_to_display = 50;
		scheduler.config.delta_x = 15;
		scheduler.config.delta_y = -20;

		/*
		scheduler.templates.event_date = function(date, event){
			console.log(date);
			const formatFunc = scheduler.date.date_to_str(scheduler.config.hour_date);
			return formatFunc(date);
		}
		 */

		scheduler.templates.event_header = function(start, end, event) {
			const startTime = scheduler.templates.event_date(start);
			const endTime = scheduler.templates.event_date(end);
			const textList = event.text.split(" / ");
			const nameList = [];
			if(config.titleType == 1 || config.titleType == 3)
				nameList.push(startTime + " - " + endTime);

			if(config.titleType == 2 || config.titleType == 3) {
				if(textList.length == 4) {
					nameList.push(textList[0]);
					if(config.titleType == 2) {
						nameList.push(textList[1]);
					}
				} else if(textList.length == 2) {
					nameList.push(textList[1].substr(0, 8));
				} else if(textList.length == 3) {
					nameList.push(textList[0]);
				}
			}
			return (nameList.length) ? `<div class="${config.titleAlign}">${nameList.join(" · ")}</div>` : `<div class="${config.titleAlign}">${startTime} - ${endTime}</div>`;
		};

		scheduler.templates.event_text = function(start, end, event){
			const startTime = scheduler.templates.event_date(start);
			const endTime = scheduler.templates.event_date(end);
			const textList = event.text.split(" / ");
			if(config.titleType > 1) {
				textList.splice(0, 1);
				if(config.titleType == 2) {
					textList.splice(0, 1);
					textList.unshift(startTime + " - " + endTime);
				}
				return textList.join(" / ");
			}
			return event.text;
		};

		scheduler.templates.tooltip_text = function(start,end,ev){
			var tempStr = ev.text.split(" / ");
			var rtnStr = "";
			//alert(tempStr.length);
			if (tempStr.length === 4) {
				rtnStr = "<b>이름:</b> " + tempStr[0] +
						"<br/><b>예약상태:</b> " + tempStr[1] +
						"<br/><b>전화번호:</b> " + tempStr[2] +
						"<br/><b>상품명:</b> " + tempStr[3] +
						"<br/><b>시작시간:</b> " + scheduler.templates.tooltip_date_format(start) +
						"<br/><b>종료시간:</b> " + scheduler.templates.tooltip_date_format(end) +
						addMemoToToolTip(ev.memo);
			} else if (tempStr.length === 1) {
				rtnStr = "<b>상태:</b> " + tempStr[0] +
						"<br/><b>사유:</b> " + tempStr[1] +
						"<br/><b>시작시간:</b> " + scheduler.templates.tooltip_date_format(start) +
						"<br/><b>종료시간:</b> " + scheduler.templates.tooltip_date_format(end) +
						addMemoToToolTip(ev.memo);
			} else if (tempStr.length === 3) {
				rtnStr = "<b>수업명:</b> " + tempStr[0] +
						"<br/><b>강사명:</b> " + tempStr[1] +
						"<br/><b>예약가능인원:</b> " + tempStr[2] +
						"<br/><b>시작시간:</b> " + scheduler.templates.tooltip_date_format(start) +
						"<br/><b>종료시간:</b> " + scheduler.templates.tooltip_date_format(end);
			} else {
				rtnStr = "<b>내용:</b> " + tempStr[0] +
						"<br/><b>시작시간:</b> " + scheduler.templates.tooltip_date_format(start) +
						"<br/><b>종료시간:</b> " + scheduler.templates.tooltip_date_format(end) +
						addMemoToToolTip(ev.memo);
			}

		    return rtnStr;
		};

		function addMemoToToolTip(memo) {
			if (memo === undefined || memo === null || memo.trim().length === 0) {
				return '';
			}
			return `<br/><b>메모:</b>${memo.replace(/\n/g, '<br>')}`
		}

		//금일 날짜 세팅
		var today = new Date();

		var year = today.getFullYear();
		var month = today.getMonth();
		var smonth = today.getMonth()+1;
		var emonth = today.getMonth()+2;
		var sday = today.getDate();
		var eday = today.getDate()+1;
		var week = today.getDay();

		var sDate = year + "-" + smonth + "-1";
		var eDate = year + "-" + emonth + "-1";
		var searchDate = year + "-" + smonth + "-" + sday;
		var searchSDate = year + "-" + smonth + "-" + sday;
		var searchEDate = year + "-" + smonth + "-" + eday;

		//########################## 강사 설정
		var sections = "";
		var arraySection = "";
		var idx= 0;
		var tempString = "";

	  	$.ajax({
            type: "POST",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
            url: "/manager/schedule/promise/json/coachlist.php",
            async:false,
            dataType: "json",
            success: function (returnData) {
            	if(returnData.length >= config.unitCount){

            		sections = returnData;

            	}else{
            		var testList = new Array() ;

            		$.each(returnData, function(k, v){

            			var data = new Object();
            			data.key = v.key;
                        data.label = v.label;

                        testList.push(data) ;
    	        	});

            		for(i=0;i<20-returnData.length;i++){

            			var data = new Object();
            			data.key = "E1"; //section_id
                        data.label = "미등록";

                        testList.push(data);
            		}

            		sections = testList;
            	}

               	scheduler.deleteMarkedTimespan();
               	scheduleList.getWeekCoachScheduleList(today);

            }
        });

	 	//########################## 강사 설정 끝

		scheduler.createTimelineView({
			name: "timeline",
			x_unit: "hour",
			x_date: "%H:%i",
			x_step: 8,
			x_size: 33,
			x_length:33,
			event_dy:60,
			resize_events:false,
			y_unit: sections,
			y_property: "section_id",
			render: "bar",
			second_scale:{
				x_unit: "day", // unit which should be used for second scale
				x_date: "%F %d" // date format which should be used for second scale, "July 01"
			}
		});
		scheduler.date.timeline_start = scheduler.date.day_start;
		scheduler.createUnitsView({
			name: "unit",
			property: "section_id",
			list: sections,
			size:config.unitCount,//the number of units that should be shown in the view
		    step:config.unitCount  //the number of units that will be scrolled at once
		});

		scheduler.config.lightbox.sections = [
			{ name: "description", height: 130, map_to: "text", type: "textarea", focus: true},
			{ name:"custom", height:22, map_to:"section_id", type:"multiselect", options: sections, vertical:"false" },
			{ name: "time", height: 72, type: "time", map_to: "auto"}
		];

		scheduler.attachEvent("onBeforeDrag", function (id, mode, e, event){
		    if(id.includes("C_")){
		    	return false;
		    }else{
		    	return true;
		    }
		});

		//Empty cell click
		scheduler.attachEvent("onTemplatesReady", function() {
			var fix_date = function(date) {  // 17:48:56 -> 17:30:00
				date = new Date(date);
				if (date.getMinutes() > 30)
					date.setMinutes(30);
				else
					date.setMinutes(0);
				date.setSeconds(0);
				return date;
			};



			scheduler.attachEvent("onBeforeEventChanged", function(ev, e, is_new, original) {
				if (loginCoachData.permission.permissionSchedule.modifyAppointmentTime === false) {
					alert('시간변경은 권한이 필요합니다.');
					return false;
				}

				const msg = '예약을 정말로 변경하시겠습니까?\n' +
						'예약시간 또는 담당자 변경 전에 반드시 회원과 상의해서 동의가 있어야 합니다.\n' +
						'예약이 변경되면 변경한 시간에는 새로운 예약을 할 수 있습니다.';
				return confirm(msg) !== false;
			});

			//drag 시간 변경 또는 update 버튼 클릭시
			scheduler.attachEvent("onEventChanged", function(id,ev){
				var formatFunc = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
				var sdate = formatFunc(ev.start_date);
				var edate = formatFunc(ev.end_date);
				var seqCoach = ev.section_id;

				schedulePopup.selectDetailPromiseSchedule(ev.seq_schedule, function(returnData) {
					if (Number(seqCoach) !== Number(returnData.seqCoach)) {
						alert('담당 강사를 변경할 수 없습니다.');
						schedulePopup.resetReload();
						return false;
					}

					var params = returnData;
					params.seqSchedule = returnData.seqSchedule;
					params.title = returnData.scheduleName;
					params.memberId = returnData.seqMember;
					params.productId = returnData.seqProduct;
					params.productPassId = returnData.seqProductPass;
					params.paymentId = returnData.seqPayment;
					params.status = returnData.scheduleState;
					params.nowState = returnData.scheduleState;
					params.beforeStartDate = returnData.startDate;
					params.seqCoach = seqCoach;
					params.startDate = sdate;
					params.endDate = edate;

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

					AppointmentTypeScheduleController.updatePromiseSchedule(params).then(returnData => {
						const resultData = new ResultData(returnData);
						if (resultData.isSuccess()) {
							schedulePopup.resetReload();
						} else {
							alert(resultData.getMsgForCustomer());
						}
					});
				});
			});

			var marked = null;
			var marked_date = null;
			var event_step = 1;  //hour
			scheduler.attachEvent("onEmptyClick", function(date, native_event) {
				scheduler.unmarkTimespan(marked);
				marked = null;

				const fixed_sdate = fix_date(date);
				const fixed_edate = scheduler.date.add(fixed_sdate, event_step, 'hour');

				// 스케줄러에서 선택한 시간과 현재 시간의 전후 관계에 따라 보이는 팝업의 내용을 다르게 한다.
				const now = new Date();
				let isFutureSchedule = true;
				if (now.getTime() > fixed_sdate.getTime()) {
					isFutureSchedule = false;

					if (loginCoachData.permission.permissionSchedule.addPastAppointmentScheduleState === false) {
						alert('출결내역 추가는 권한이 필요합니다.');
						return false;
					}
				}

				const formatFuncDate = scheduler.date.date_to_str("%Y-%m-%d");
				const thisDate = formatFuncDate(fixed_sdate);

				const action_data = scheduler.getActionData(native_event);
				const seq_coach = $('#schedule_mode').val() === 'week' ? $('#coachList').val() : action_data.section;

				if (loginCoachData.permission.permissionSchedule.reserveAppointmentOtherCoach === false &&
						loginCoachData.seqPartnerCoach !== seq_coach) {
					alert('다른 강사 예약은 권한이 필요합니다.');
					return false;
				}


				$.ajax({
					type : "POST",
					contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
					url : "/manager/schedule/promise/json/coachScheduleOffChk",
					async : false,
					data : {
						searchDate : thisDate,
						seqCoach : seq_coach
					},
					dataType : "json",
					success : function(returnData) {
						if (returnData != null) {
							if (returnData.offCount === 0) {
								//if section key = E1 일때  팝업이 안뜨도록 수정
								//var eventId = scheduler.addEventNow({
								const eventId = scheduler.addEvent({
									start_date : fixed_sdate,
									end_date : fixed_edate,
									section_id : action_data.section
								});
								//scheduler.hide_lightbox();

								const data = {
									inputMode : 'insert',
									eventState : 'R',
									thisDate : thisDate,
									start_date : fixed_sdate,
									end_date : fixed_edate,
									seq_coach : seq_coach,
									coachName : $('#coachList option[value=' + seq_coach + ']').text(),
									event_id : eventId
								};

								const display = {
									activePaneIndex : '0',
									membershipValue : 'member',
									isFutureSchedule : isFutureSchedule
								};

								schedulePopup.popOpen(data, display);

							} else {
								alert("강사 휴무일입니다. 예약 불가합니다.");
							}
						}
					}
				});
			});


			scheduler.attachEvent("onMouseMove", function(event_id, native_event) {
				var date = scheduler.getActionData(native_event).date;
				var fixed_date = fix_date(date);

				if (+fixed_date != +marked_date) {
					scheduler.unmarkTimespan(marked);

					marked_date = fixed_date;
					marked = scheduler.markTimespan({
						start_date: fixed_date,
						end_date: scheduler.date.add(fixed_date, event_step, "hour"),
						css: "highlighted_timespan"
					});
				}
			});
		});

		scheduler.attachEvent("onBeforeViewChange", function(old_mode,old_date,mode,date){
			var old_year = new Date(old_date).format("yyyy")
			var old_month = new Date(old_date).format("MM")
			var old_day = new Date(old_date).format("dd")
			var new_year = new Date(date).format("yyyy")
			var new_month = new Date(date).format("MM")
			var new_day = new Date(date).format("dd")
			var oldDate = new Date(old_date);
			var newDate = new Date(date);
			var next_year = "";
			var next_month = "";
			var next_date = new Date(newDate.setMonth(newDate.getMonth()+1));  ///1월이 2월로 나옴
			//console.log("ttttt newDate:" + newDate + " next_date:" + next_date);
			//매달 첫주와 마지막주의 일요일과 토요일 찾기
			var formatFuncYYMMDD = scheduler.date.date_to_str("%Y-%m-%d");
			var formatFuncYY = scheduler.date.date_to_str("%Y");
			var formatFuncMM = scheduler.date.date_to_str("%m");
			var formatFuncDD = scheduler.date.date_to_str("%d");

		/* 	var startWeekIdx = "";
			var endWeekIdx = "";
			var tempSDate = "";
			var tempEDate = "";
			var startWeekDate = "";
			var endWeekDate = "";
			var tempStartWeekDate = "";

			//console.log("SSSSSSSSSS new_month:" + new_month + " old_month:" + old_month);
			//###########################################################################
			sDate = new_year + "-" + new_month + "-01";

			var nexd = new Date(sDate);

			nexd.setMonth(nexd.getMonth()+2);
			next_month = nexd.getMonth();
			if(next_month<10 && String(next_month).length == 1){
				next_month = "0" + next_month;
	    	}else{
	    		next_month = next_month;
	    	}

			next_year = next_date.format("yyyy");

			eDate = next_year + "-" + next_month + "-01";
			//###########################################################################
			//console.log("EEEEEEEEEEE sDate:" + sDate + " eDate:" + eDate);

			tempSDate = new Date(sDate);
			startWeekIdx = tempSDate.getDay();
			tempEDate = new Date(eDate);
			endWeekIdx = tempEDate.getDay();

			//시작일이 일요일인지 / 마직막일이 토요일인지 체크
			if(startWeekIdx != 0){
				//1일이 포함된 주의 첫째날
				startWeekDate = formatFuncYYMMDD(scheduler.date.week_start(tempSDate));
				sDate = startWeekDate;
			}

			if(endWeekIdx != 0){
				//1일이 포함된 주의 마지막날
				tempStartWeekDate = scheduler.date.week_start(tempEDate);
				endWeekDate = formatFuncYYMMDD(scheduler.date.add(tempStartWeekDate, 6, 'day'));
				eDate = endWeekDate;
			}  */
			//console.log("startWeekIdx:" + startWeekIdx + " endWeekIdx:" + endWeekIdx);
			//console.log("startWeekDate:" + startWeekDate + " endWeekDate:" + endWeekDate);
			//console.log("sDate:" + sDate + " eDate:" + eDate);
			//###########################################################################

			//한달 단위로 데이터 다시 세팅
		    if(old_mode == "unit" && mode == "unit"){// 1달 단위로 가져오기
		    	if(old_date != date){
				    var startWeekDate = scheduler.date.week_start(old_date);//newdate.getDay();
					var endWeekDate = scheduler.date.add(startWeekDate, 6, 'day');
		    		if(!(date >= startWeekDate && date <= endWeekDate)){
		    			scheduler.deleteMarkedTimespan();
		    			scheduleList.getWeekCoachScheduleList(date);
		    			scheduleList.getWeekCoachPromiseScheduleList(date);
		    			scheduleList.getWeekClassList(date);
		    		}
		    	}
		    }else if(old_mode == "week" && mode == "week"){
		    	if(old_date != date){
				    var startWeekDate = scheduler.date.week_start(old_date);//newdate.getDay();
					var endWeekDate = scheduler.date.add(startWeekDate, 6, 'day');
		    		if(!(date >= startWeekDate && date <= endWeekDate)){
		    			scheduler.deleteMarkedTimespan();
		    			scheduleList.getWeekCoachScheduleList(date);
		    			scheduleList.getWeekCoachPromiseScheduleList(date);
		    			scheduleList.getWeekClassList(date);
		    		}
		    	}
		    }else if(old_mode == "week" && mode == "unit"){
		    	$("#coachList").val("")
		    	$("#schedule_mode").val("unit");

			    var startWeekDate = scheduler.date.week_start(old_date);//newdate.getDay();
				var endWeekDate = scheduler.date.add(startWeekDate, 6, 'day');
    			scheduler.deleteMarkedTimespan();
    			scheduleList.getWeekCoachScheduleList(date);
    			scheduleList.getWeekCoachPromiseScheduleList(date);
    			scheduleList.getWeekClassList(date);
		    }else if(old_mode == "unit" && mode == "week"){
				if($("#coachList").val() == ""){
					alert("강사를 선택하세요.");
					return false;
				}else{
					$("#schedule_mode").val("week");
					var coachId = $("#coachList").val();
					$("#coach_id").val(coachId);

				    var startWeekDate = scheduler.date.week_start(old_date);//newdate.getDay();
					var endWeekDate = scheduler.date.add(startWeekDate, 6, 'day');
					scheduler.deleteMarkedTimespan();
	    			scheduleList.getWeekCoachScheduleList(date);
	    			scheduleList.getWeekCoachPromiseScheduleList(date);
	    			scheduleList.getWeekClassList(date);

	    			//주간에도 뿌려야 하면 이거
					/* var startNextWeekDate = scheduler.date.add(startWeekDate, 7, 'day');
	    			var stateSDate = formatFuncYYMMDD(startWeekDate);
	    			var stateEDate = formatFuncYYMMDD(startNextWeekDate);

	    			schedulePopup.setScheduleStatCount(startWeekDate, startNextWeekDate); */
				}
		    }


		 	// 금일 스케줄 상태별 갯수 설정 //-당일 1루 예약 수 unit에서만 의미 있음
			var seqCoach = "";
			var searchSDate = "";
			var searchEDate = "";
			if((old_mode == "unit" && mode == "unit") || (old_mode == "week" && mode == "unit")){
				var tempDate = new Date(new_year + "-" + new_month + "-" + new_day);
				searchSDate = new_year + "-" + new_month + "-" + new_day;
				searchEDate = new Date(tempDate.setDate(tempDate.getDate() + 1)).format("yyyy-MM-dd");
				seqCoach = "";
				// console.log("searchSDate : " + searchSDate + ":" + searchEDate);
				schedulePopup.setScheduleStatCount(searchSDate, searchEDate, seqCoach);
			}else{
				seqCoach = $("#coachList").val();
				searchSDate = formatFuncYYMMDD(scheduler.date.week_start(date));
				searchEDate = formatFuncYYMMDD(scheduler.date.add(searchSDate, 7, 'day'));
				schedulePopup.setScheduleStatCount(searchSDate, searchEDate, seqCoach);
				//$("#schedule_state").html("");
			}

		    return true;
		});

		scheduler.attachEvent("onViewChange", function (new_mode , new_date){

		});

		scheduler.attachEvent("onContextMenu", function(event_id, native_event_object) {
			return false;
		});


		scheduler.attachEvent("onClick", function(event_id, native_event_object) {
			if (event_id) {
				if (event_id.indexOf('C_') === -1) {
					var posX = 0;
					var posY = 0;

					// 컨텍스트 메뉴 크기
					var contextMenuSize = {
						width : 150,
						height : 175
					};

					if (native_event_object.pageX || native_event_object.pageY) {
						posX = native_event_object.pageX;
						posY = native_event_object.pageY;

						// 현재 마우스 위치의 오른쪽 하단으로 컨텍스트 메뉴가 나오는데 화면 여백이 충분하지 않을 경우에는 위쪽, 왼쪽으로 컨텍스트 메뉴를 보여준다.
						// 가로여백 = 화면크기 - (현재 마우스 포인터 위치 + 콘텍스트 메뉴 크기 + 여백)
						var widthSpace = document.body.clientWidth - (native_event_object.pageX + contextMenuSize.width + 10);
						if (widthSpace < 0) {
							posX = native_event_object.pageX - contextMenuSize.width;
						}

						var heightSpace = document.body.clientHeight - (native_event_object.pageY + contextMenuSize.height + 10);
						if (heightSpace < 0) {
							posY = native_event_object.pageY - contextMenuSize.height - 30;
						}

					} else if (native_event_object.clientX || native_event_object.clientY) {
						posX = native_event_object.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
						posY = native_event_object.clientY + document.body.scrollTop + document.documentElement.scrollTop;
					}

					var event = scheduler.getEvent(event_id);
					event.clientY = native_event_object.clientY;
					var location = {
						'posX' : posX,
						'posY' : posY
					};
					contextMenu.init(event, location);
					contextMenu.open();

					return false; // prevent default action and propagation
				}
			}

			return false;
		});

		scheduler.attachEvent("onBeforeTooltip", function (id){
		    return true;
		});

		scheduler.scrollUnit(config.unitCount);
		///schedule view 초기화

		//각 센터의 시작 종료 근무시간 조회
		$.ajax({
	        type: "POST",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	        url: "/manager/schedule/promise/json/partnerServiceTime.php",
	        async:false,
	        dataType: "json",
	        success: function (returnData) {
	        	if (returnData.data == null) {
	        		//var strfh = 1;
	        		var strfh = 0;
	        		var strlh = 23;

	        	} else {
							var returnData = returnData.data;
	        		var arrfh = returnData.openTime.split(":");
	        		var strfh = arrfh[0].replace(/(^0+)/, "");
	        		var arrlh = returnData.closeTime.split(":");
	        		var strlh = arrlh[0].replace(/(^0+)/, "");
	        	}

	        	scheduler.config.first_hour = strfh;
	    		scheduler.config.last_hour = strlh;
	    		//console.log("*******************"+ strfh + ":" + strlh);

	    		scheduler.init('scheduler_here', new Date(year, month, sday), "unit");
	        }
	    });

		//왼쪽 미니 칼렌다 설정
	 	/* scheduler.templates.calendar_month = scheduler.date.date_to_str("%Y년, %M");
	    var calendar = scheduler.renderCalendar({
	        container:"cal_here",
	        navigation:true,
	        handler:function(date){
	            scheduler.setCurrentView(date, scheduler._mode);
	        }
	    });
	    scheduler.linkCalendar(calendar);
	    scheduler.setCurrentView(scheduler._date, scheduler._mode);  */

	    //DB에서 스케줄 데이터 가지고와서 전달
	    scheduleList.getWeekCoachPromiseScheduleList(today); //ID
	    scheduleList.getWeekClassList(today);

		// 금일 스케줄 상태별 갯수 설정
		schedulePopup.setScheduleStatCount(searchSDate, searchEDate, "");

	   /*  for(i=0;i<arraySection.length;i++){
	    	console.log("section test : " +arraySection[i]);
	    } */
	},

	resetView : function(){
		var selDate = new Date(scheduler.getState().date);
		scheduleList.getWeekCoachPromiseScheduleList(selDate);
		scheduleList.getWeekClassList(selDate);
	},

	getWeekCoachScheduleList : function(searchDate){
		//scheduler.clearAll();

		var formatFuncYYMMDD = scheduler.date.date_to_str("%Y-%m-%d");
		var formatFuncYY = scheduler.date.date_to_str("%Y");
		var formatFuncMM = scheduler.date.date_to_str("%m");
		var formatFuncDD = scheduler.date.date_to_str("%d");

		var startWeekDate = scheduler.date.week_start(searchDate);
		var endWeekDate = scheduler.date.add(startWeekDate, 6, 'day');
		var searchSDate = formatFuncYYMMDD(startWeekDate);
		//console.log("startWeekDate : " + startWeekDate + " / endWeekDate : " + endWeekDate);
		var seqCoach = "";
		if($("#schedule_mode").val()=="week"){
			seqCoach = $("#coachList").val();
		}else{
		}

		//strJson = "[";

		$.ajax({
	        type: "POST",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	        url: "/manager/schedule/promise/json/weekCoachScheduleList.php",
	        async:false,
	        data: {searchDate : searchSDate, seqCoach : seqCoach},
	        dataType: "json",
	        success: function (returnData) {
	        	$.each(returnData.data, function(k, v){ //현재기준 다음달 1일전에 등록된 모든 강의를 가지고 온다
	        		//off-day 체크 seqClass, start_date
	        		//console.log("searchDate : " + v.start_date + "seqCoach : " + v.seq_coach);
	        		//console.log("################## : " + v.off_day);
	        		var formatFuncYYMMDD = scheduler.date.date_to_str("%Y-%m-%d");
        			var formatFuncYY = scheduler.date.date_to_str("%Y");
        			var formatFuncMM = scheduler.date.date_to_str("%m");
        			var formatFuncDD = scheduler.date.date_to_str("%d");
        			var formatFuncHH = scheduler.date.date_to_str("%H");
        			var formatFuncII = scheduler.date.date_to_str("%i");
        			//calendar는 month가 한달전
        			var tempDate = v.start_date.substring(0, 8) + "01";
        			var prevDate = scheduler.date.add(new Date(tempDate), -1, 'month');
        			var year = formatFuncYY(prevDate);
        			var pmonth = formatFuncMM(prevDate);

        			var formatFuncStrToDate = scheduler.date.str_to_date("%Y-%m-%d %H:%i:%s");
        			var tempStartDt = formatFuncStrToDate(v.start_date);
        			var tempEndDt = formatFuncStrToDate(v.end_date);
        			var month = formatFuncMM(tempStartDt);
        			var day = formatFuncDD(tempStartDt);
        			var shour = formatFuncHH(tempStartDt);
        			var sminute = formatFuncII(tempStartDt);
        			var ehour = formatFuncHH(tempEndDt);
        			var eminute = formatFuncII(tempEndDt);

        			if (v.off_day == "" && v.close_day == "0") {
	        			//console.log("YYMMDDHHII %%%%%%% 강사 스케줄 %%%%%%% year :" + year + " / month : " + pmonth + " / day : " + day+ " / shour : " + shour+ " / sminute : " + sminute+ " / ehour : " + ehour+ " / eminute : " + eminute+ " / seq_coach : " + v.seq_coach);

	        			var timeColor = "green_section";

	        			if($("#schedule_mode").val() == "unit"){
		        			scheduler.addMarkedTimespan({
			    			 	start_date: new Date(year, pmonth, day, shour, sminute),
			    				end_date: new Date(year, pmonth, day, ehour, eminute),
			    				css: timeColor,
			    				sections: {
			    					unit: v.seq_coach
			    				}
			    			});
	        			}else{
		        			//console.log($("#schedule_mode").val());
		        			//console.log(year + "-" + smonth);
		        			scheduler.addMarkedTimespan({
		        				start_date: new Date(year, pmonth, day, shour, sminute),
			    				end_date: new Date(year, pmonth, day, ehour, eminute),
			    				css: timeColor
			    			});
		        		}
	        			//strJson += '{id:"' + v.seq_temp + '", start_date: "' + v.start_date + '", end_date: "' + v.end_date + '", text:"' + v.text + '", section_id:"' + v.seq_class + '"},';
	        		}else{
						//console.log("YYMMDDHHII %%%%%%%%%%%%%% 강사 스케줄 %%%%%%%%%%%% year :" + year + " / month : " + pmonth + " / day : " + day+ " / shour : " + shour+ " / sminute : " + sminute+ " / ehour : " + ehour+ " / eminute : " + eminute+ " / seq_coach : " + v.seq_coach);

	        			var timeColor = "offday_section";

	        			if($("#schedule_mode").val() == "unit"){
		        			scheduler.addMarkedTimespan({
			    			 	start_date: new Date(year, pmonth, day, shour, sminute),
			    				end_date: new Date(year, pmonth, day, ehour, eminute),
			    				css: timeColor,
			    				sections: {
			    					unit: v.seq_coach
			    				}
			    			});
	        			}else{
		        			//console.log($("#schedule_mode").val());
		        			//console.log(year + "-" + smonth);
		        			scheduler.addMarkedTimespan({
		        				start_date: new Date(year, pmonth, day, shour, sminute),
			    				end_date: new Date(year, pmonth, day, ehour, eminute),
			    				css: timeColor
			    			});
		        		}
	        		}

	        	});

	        	/* var lastJson = strJson.slice(0,-1);
	        	lastJson = lastJson + "]";
	        	//console.log(lastJson);
	        	scheduler.parse(lastJson,"json"); */
	        }
	    });
	},


	getWeekCoachPromiseScheduleList : function(searchDate) {
		scheduler.clearAll();

		let seqCoach = '';
		if ($('#schedule_mode').val() === 'week') {
			seqCoach = $('#coachList').val();
		}

		const formatFuncYYMMDD = scheduler.date.date_to_str('%Y-%m-%d');
		const startWeekDate = scheduler.date.week_start(searchDate);
		const searchSDate = formatFuncYYMMDD(startWeekDate);

		$.ajax({
			type : 'POST',
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			url : '/manager/schedule/promise/json/weekCoachPromiselist.php',
			async : false,
			data : {
				searchDate : searchSDate,
				seqCoach : seqCoach
			},
			dataType : 'json',
			success : function(returnData) {
				try {
					const promiseArr = [];

					$.each(returnData.data, function(k, v) { //현재기준 다음달 1일전에 등록된 모든 강의를 가지고 온다
						const getText = (item) => {
							try {
								const textList = [];
								if(item.now_state == "B") {
									textList[0] = "기타스케줄";
									textList[1] = (item.memo || "-").split("\n")[0];
								} else {
									const seqMember = Number(item.seq_member);
									const seqPassInfo = Number(item.seqPassInfo || item.seqProduct || 0);
									const scheduleState = uiParameter.schedule.state[item.now_state] || "-";
									const getPassName = () => {
										if(seqPassInfo < 0) {
											return (seqPassInfo == -100) ? "상담예약" : (seqPassInfo == -999) ? "OT상품" : "-";
										} else {
											const passName = [];
											passName.push(item.serviceName);
											if(item.serviceKind == "N")
												passName.push(item.useNumber + "회");
											passName.push(item.usePeriod + ((item.usePeriodType == "M") ? "개월" : "일"));
											return passName.join(" ");
										}
									};
									textList[0] = ((seqMember) ? item.memberName : item.noMemberName) || "-";
									textList[1] = scheduleState;
									textList[2] = ((seqMember) ? item.memberMobile : item.noMemberMobile) || "-";
									textList[3] = getPassName();
								}
								return textList.join(" / ");
							} catch(error) {
								const textList = (item.text || "").split("_");
								const scheduleState = uiParameter.schedule.state[item.now_state] || "-";
								const text = textList.join(" / ");
								const index = text.indexOf("\n");
								return (index > -1) ? text.substring(0, index - 1) : text;
							}
						};

						promiseArr.push({
							id : v.seq_schedule,
							seq_schedule : v.seq_schedule,
							start_date : v.start_date,
							end_date : v.end_date,
							text : getText(v),
							section_id : v.section_id,
							color : v.color,
							now_state : v.now_state,
							seq_member : v.seq_member,
							memo : v.memo
						});
					});
					scheduler.parse(promiseArr, 'json');

				} catch (ex) {
					alert('작업 중 에러가 발생하였습니다.');
					console.trace(ex);
					$.unblockUI();
				}
			}
		});
	},


	getWeekClassList : function(param_searchDate){
		let seqCoach = '';
		if ($("#schedule_mode").val() === 'week') {
			seqCoach = $("#coachList").val();
		}

		const formatFuncYYMMDD = scheduler.date.date_to_str('%Y-%m-%d');
		const startWeekDate = scheduler.date.week_start(param_searchDate);
		const searchDate = formatFuncYYMMDD(startWeekDate);


		$.ajax({
			type : "POST",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			url : "/manager/schedule/promise/json/weekClassSchedulelist.php",
			async : false,
			data : {
				searchDate : searchDate,
				seqCoach : seqCoach
			},
			dataType : "json",
			success : function(returnData) {
				if (returnData != null && returnData !== '') {
					const classSchedules = [];
					$.each(returnData.data, function(k, v) {
						if (returnData != null) {
							if (v.off_day !== '') {
								classSchedules.push({
									id : v.seq_temp,
									start_date : v.start_date,
									end_date : v.end_date,
									text : '휴업',
									section_id : v.seq_coach,
									color : '#f7d6d7'
								});

							} else if (v.off_time !== '') {
								// 취소된 수업. 스케줄러에 표시하지 않음

							} else {
								const formatFunc = scheduler.date.str_to_date("%Y-%m-%d %H:%i");
								const classDate = formatFunc(v.start_date);

								let tempText = '';
								if ($("#schedule_mode").val() === 'week') {
									tempText = v.coach_text.replace(/_/g, ' / ');
								} else {
									tempText = v.text.replace(/_/g, ' / ');
								}

								classSchedules.push({
									id : v.seq_temp,
									start_date : v.start_date,
									end_date : v.end_date,
									text : tempText,
									section_id : v.seq_coach,
									color : classDate >= new Date() ? '#3aab32' : '#799177'
								});
							}
						}

					});

					scheduler.parse(classSchedules, "json");
				}
			}
		});
	}
}
