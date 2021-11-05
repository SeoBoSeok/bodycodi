	var scheduleList = {
	popOpen : function (obj){
        obj.fadeIn(300);
        popHeight(); // 화면 정렬을 위한 팝업 사이즈 높이 값 계산
        return false;
    },

	/* modalShow : function (){
		$('#addModal').modal({backdrop: 'static', keyboard: false}) ;
		$('#addModal').modal('show');
	},	 */

	init : function(defaultGroupSpace) {
		scheduler.config.multisection = true;

		/* start with monday */
	    scheduler.config.start_on_monday=true;
		/* common locale settings */
	    scheduler.config.default_date="%Y년 %M %j일";
	    scheduler.config.month_date="%Y년 %M";
	    //scheduler.config.week_date="%l, %W";
	    scheduler.config.day_date = "%D, %F%j일";
	    scheduler.config.hour_date="%H:%i";

		scheduler.templates.event_class = function(start, end, event){
			var original = scheduler.getEvent(event.id);
			if(!scheduler.isMultisectionEvent(original))
				return event.cssClass;
			return "multisection section_" + event.section_id;
		};

		scheduler.config.xml_date="%Y-%m-%d %H:%i";
		scheduler.locale.labels.timeline_tab = "타임라인";
		scheduler.locale.labels.unit_tab = "일"; //강사
		scheduler.locale.labels.section_custom = "섹션";

		//scheduler.config.section_size_px = 200;
		//scheduler.config.min_grid_size = 310;

		scheduler.config.drag_create = false;
		scheduler.config.drag_move = false;

		//################################################################ 입력용 #####################################
		scheduler.config.multi_day = true;
		scheduler.config.details_on_create = true;

		//tootltip
		scheduler.config.className = 'dhtmlXTooltip tooltip';
		scheduler.config.timeout_to_display = 50;
		scheduler.config.delta_x = 15;
		scheduler.config.delta_y = -20;

		scheduler.templates.tooltip_text = function(start,end,ev){
			var tempStr = ev.text.split(" / ");
			var rtnStr = "";

			if(tempStr.length > 3){
				rtnStr = "<b>고객명:</b> "+tempStr[0]+"<br/><b>전화번호:</b> "+tempStr[3]+"<br/><b>상품명:</b> "+tempStr[1]+"<br/><b>예약상태:</b> "+tempStr[2]+"<br/><b>시작시간:</b> " +
			    	scheduler.templates.tooltip_date_format(start)+
			    	"<br/><b>종료시간:</b> "+scheduler.templates.tooltip_date_format(end);
			}else if(tempStr.length <2){
				rtnStr = ""+tempStr[0]+"<br/><b>시작시간:</b> " +
	    		scheduler.templates.tooltip_date_format(start)+
	    		"<br/><b>종료시간:</b> "+scheduler.templates.tooltip_date_format(end);
			}else{
				rtnStr = "<b>수업명:</b> "+tempStr[0]+"<br/><b>강사명:</b> "+tempStr[1]+"<br/><b>예약가능인원:</b> "+tempStr[2]+"<br/><b>시작시간:</b> " +
		    		scheduler.templates.tooltip_date_format(start)+
		    		"<br/><b>종료시간:</b> "+scheduler.templates.tooltip_date_format(end)+
		    		"<br><b>네이버 연동:</b> "+((ev.isNaverBooking) ? "연동" : "미연동");
			}

		    return rtnStr;
		};

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
		var arrayCoachIdx = [];
		var idx= 0;

		var returnData = [{"label":"퍼스트 강사 (테스트)","key":"13508"},{"label":"김반석","key":"9817"},{"label":"다짐 강사 (테스트)","key":"14510"},{"label":"수진 강사 (테스트)","key":"13112"},{"label":"주홍일","key":"9806"},{"label":"서보석","key":"9816"},{"label":"홍길동","key":"16343"},{"label":"dl 강사 (테스트)","key":"16371"},{"label":"OLIVIA","key":"16394"},{"label":"Rachel","key":"16395"},{"label":"고형주","key":"12733"},{"label":"Riyeon","key":"16397"},{"label":"Leah","key":"16396"},{"label":"박효성","key":"13536"},{"label":"변혜원","key":"15920"},{"label":"기본 관리자","key":"9807"},{"label":"민윤정","key":"14597"},{"label":"설현","key":"9826"}];

		coachList.setData(returnData);
		sections = returnData;

		$.each(returnData, function(k, v){
			arrayCoachIdx[idx] = v.key;
			//console.log("강사 IDX " + arrayCoachIdx[idx]);
		//	scheduleList.getMonthCoachScheduleData(year, smonth, v.key); //사람에 따라
			//scheduleList.getDayCoachScheduleData(searchDate, week,v.key); //사람에 따라
			idx++;
	 	});

	  	// $.ajax({
        //        type: "POST",
		// 		contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
        //        url: "/manager/schedule/promise/json/coachlist",
        //        async:false,
        //        dataType: "json",
        //        success: function (returnData) {
        //     	   coachList.setData(returnData);
        //        		sections = returnData;

        //        		$.each(returnData, function(k, v){
        //        			arrayCoachIdx[idx] = v.key;
        //        			//console.log("강사 IDX " + arrayCoachIdx[idx]);
        //        		//	scheduleList.getMonthCoachScheduleData(year, smonth, v.key); //사람에 따라
        //        			//scheduleList.getDayCoachScheduleData(searchDate, week,v.key); //사람에 따라
        //        			idx++;
	    //     		});
        //        }
        //    });

	 	//############################################### 강사 설정 끝

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
			size:7,//the number of units that should be shown in the view
		    step:7  //the number of units that will be scrolled at once
		});

		scheduler.config.lightbox.sections = [
			{ name: "description", height: 130, map_to: "text", type: "textarea", focus: true},
			{ name:"custom", height:22, map_to:"section_id", type:"multiselect", options: sections, vertical:"false" },
			{ name: "time", height: 72, type: "time", map_to: "auto"}
		];


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

			scheduler.attachEvent("onBeforeEventChanged", function(ev, e, is_new, original){
				/* if (confirm("예약을 정말로 변경하시겠습니까?\n예약시간 또는 담당자 변경 전에 반드시 회원과 상의해서 동의가 있어야 합니다.\n예약이 변경되면 변경한 시간에는 새로운 예약을 할 수 있습니다.") == false){    //확인
					return false;
				} */
			    return false;
			});

			//drag 시간 변경 또는 update 버튼 클릭시
			scheduler.attachEvent("onEventChanged", function(id,ev){
			    var formatFunc = scheduler.date.date_to_str("%Y-%m-%d %H:%i");
			    var sdate = formatFunc(ev.start_date);
			    var edate = formatFunc(ev.end_date);

			    var params = { "startDate": sdate, "endDate": edate, "sectionId": ev.section_id, "scheduleId": ev.id };

			    $.ajax({
	                type: "POST",
					contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	                url: "/manager/schedule/promise/json/changeschedule",
	                async:false,
	                data: params,
	                dataType: "json",
	                success: function (returnData) {
	                	//console.log("@@ + "+ returnData.RESULT);
	                	//console.log(returnData.RESULT_MSG);
	                	//alert(returnData.RESULT_MSG);
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
			});


			scheduler.attachEvent("onClick", function(event_id, native_event_object) {
				if (event_id) {
					if (event_id.indexOf('C_') === -1) {
						var posX = 0;
						var posY = 0;

						// 컨텍스트 메뉴 크기
						var contextMenuSize = {
							width : 155,
							height : 174
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
								posY = native_event_object.pageY - contextMenuSize.height + 35;
							}

						} else if (native_event_object.clientX || native_event_object.clientY) {
							posX = native_event_object.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
							posY = native_event_object.clientY + document.body.scrollTop + document.documentElement.scrollTop;
						}

						var location = {
							'posX' : posX,
							'posY' : posY
						};

						var schedulerData = scheduler.getEvent(event_id);
						contextMenu.init(schedulerData, native_event_object, location);
						contextMenu.open();
					}
				}
			});

			var marked = null;
			var marked_date = null;
			var event_step = 1;  //hour
			scheduler.attachEvent("onEmptyClick", function(date, native_event) {
				scheduler.unmarkTimespan(marked);
				marked = null;

				const fixed_sdate = fix_date(date);
				const fixed_edate = scheduler.date.add(fixed_sdate, event_step, 'hour');

				// 현재시간이 스케줄러에서 클릭한 날짜보다 크다면 스케줄을 만들 수 없다.
				const now = new Date();
				if (now.getTime() > fixed_sdate.getTime()) {
					// alert('과거 시간에는 수업을 개설할 수 없습니다.');
					// return false;
				}


				if (loginCoachData.permission.permissionSchedule.addClass === false) {
					alert('수업등록은 권한이 필요합니다.');
					return false;
				}

				if (!$("#placeList").val()) {
					alert('수업등록을 할 수 없습니다\n[홈 > 센터 설정] 메뉴에서 장소를 추가해주세요');
					return;
				}

				const action_data = scheduler.getActionData(native_event);
				const temp_memo = "신규 스케줄";

				const eventId = scheduler.addEvent({
					start_date : fixed_sdate,
					end_date : fixed_edate,
					section_id : action_data.section,
					text : temp_memo
				});
				//scheduler.addEventNow(fixed_date, scheduler.date.add(fixed_date, event_step, "minute"));
				//scheduler.hide_lightbox();

				const formatFuncDate = scheduler.date.date_to_str("%Y-%m-%d");
				const formatFuncTime = scheduler.date.date_to_str("%H:%i");
				const thisdate = formatFuncDate(fixed_sdate);
				const stime = formatFuncTime(fixed_sdate);
				const etime = formatFuncTime(fixed_edate);

				$("#event_id").val(eventId);
				$("#event_date").html(thisdate);
				$("#event_stime").val(stime);
				$("#event_etime").val(etime);
				$("#event_memo").val(temp_memo);

				if ($("#schedule_mode").val() === "unit") {
					$("#coach_id").val(action_data.section);
				}


				date = {
					startDate : fixed_sdate,
					endDate : fixed_edate
				};

				addClassPopup.setDate(date);
				addClassPopup.open();

//				$("#btnDelete").hide();
//				schedulePopup.initForm();
//				scheduleList.modalShow();
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
		    //any custom logic here
			var old_year = new Date(old_date).format("yyyy");
			var old_month = new Date(old_date).format("MM");
			var old_day = new Date(old_date).format("dd");
			var new_year = new Date(date).format("yyyy");
			var new_month = new Date(date).format("MM");
			var new_day = new Date(date).format("dd");
			var oldDate = new Date(old_date);
			var newDate = new Date(date);
			var next_month = "";

			if(oldDate.getTime() > newDate.getTime()) {
				sDate = new_year + "-" + new_month + "-01"; //new Date(date).format("yyyy-MM-dd")
				eDate = old_year + "-" + old_month + "-01";
			}else{
				next_month = new Date(newDate.setMonth(newDate.getMonth()+1)).format("MM");
				sDate = new_year + "-" + new_month + "-01"; //
				eDate = new_year + "-" + next_month + "-01"; //
			}

			// 금일 스케줄 상태별 갯수 설정
			if((old_mode == "unit" && mode == "unit") || (old_mode == "week" && mode == "unit")){
				var tempDate = new Date(new_year + "-" + new_month + "-" + new_day);
				var searchSDate = new_year + "-" + new_month + "-" + new_day;
				var searchEDate = new Date(tempDate.setDate(tempDate.getDate() + 1)).format("yyyy-MM-dd");
				 //console.log(searchSDate + ":" + searchEDate);
			//	schedulePopup.setScheduleStatCount(searchSDate, searchEDate);
			}else{
				$("#schedule_state").html("");
			}

			//한달 단위로 데이터 다시 세팅
		    if(old_mode == "unit" && mode == "unit"){// 1달 단위로 가져오기
		    	if(!(old_year == new_year && old_month == new_month)){

		    		scheduler.deleteMarkedTimespan();
			    	for(idx=0;idx<arrayCoachIdx.length;idx++){
			    //		scheduleList.getMonthCoachScheduleData(new_year, new_month, arrayCoachIdx[idx]);
			    	}
		    	//	scheduleList.getScheduleData(sDate, eDate, "");

		    	}
		    }else if(old_mode == "week" && mode == "week"){
		    	if(old_date != date){
				    var startWeekDate = scheduler.date.week_start(old_date);//newdate.getDay();
					var endWeekDate = scheduler.date.add(startWeekDate, 6, 'day');
					//console.log(startWeekDate);
		    		if(!(date >= startWeekDate && date <= endWeekDate)){
		    			//console.log(date);
		    			var seqPlace = $("#placeList").val();
		    			scheduleList.getWeekClassList(date, seqPlace);
		    		}
		    	}

		    }else if(old_mode == "week" && mode == "unit"){
		    	$("#coachList").val("");
		    	$("#schedule_mode").val("unit");

		    	scheduler.deleteMarkedTimespan();
		    	for(idx=0;idx<arrayCoachIdx.length;idx++){
		    	//	scheduleList.getMonthCoachScheduleData(new_year, new_month, arrayCoachIdx[idx]);
		    	}
		    	//scheduleList.getScheduleData(sDate, eDate, "");


		    }else if(old_mode == "unit" && mode == "week"){
				if($("#coachList").val() == ""){
					alert("강사를 선택하세요.");
					return false;
				}else{
					$("#schedule_mode").val("week");
					var coachId = $("#coachList").val();
					$("#coach_id").val(coachId);

					scheduler.deleteMarkedTimespan();
				//	scheduleList.getMonthCoachScheduleData(new_year, new_month, coachId);
				//	scheduleList.getScheduleData(sDate, eDate, coachId);
				}
		    }

		    return true;
		});

		scheduler.attachEvent("onViewChange", function (new_mode , new_date){
			//onViewChange
		});

		scheduler.attachEvent("onContextMenu", function (id, e){
			event.preventDefault();
			//alert(id);
			if (id != null) {
				scheduleList.classScheduleOffChk(id, e);
			}
			return true;
		});

		scheduler.attachEvent("onBeforeTooltip", function (id){
			//onBeforeTooltip
		    return true;
		});

		scheduler.scrollUnit(7);

		var returnData = {"seqPartner":0,"seqPartnerBranch":0,"openTime":"00:00","closeTime":"24:00"};

		if(returnData==null){
			scheduler.config.first_hour = "0";
			scheduler.config.last_hour = "24";
		}else{
			var arrfh = returnData.openTime.split(":");
			var strfh = arrfh[0].replace(/(^0+)/, "");
			var arrlh = returnData.closeTime.split(":");
			var strlh = arrlh[0].replace(/(^0+)/, "");
			scheduler.config.first_hour = strfh;
			scheduler.config.last_hour = strlh;
			//console.log("*******************"+ strfh + ":" + strlh);
		}

		scheduler.init('scheduler_here', new Date(year, month, sday), "week");

		//각 센터의 시작 종료 근무시간 조회
		// $.ajax({
	    //     type: "POST",
		// 	contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	    //     url: "/manager/schedule/class/json/partnerServiceTime",
	    //     async:false,
	    //     dataType: "json",
	    //     success: function (returnData) {

	    //     	if(returnData==null){
	    //     		scheduler.config.first_hour = "0";
		//     		scheduler.config.last_hour = "24";
	    //     	}else{
		//         	var arrfh = returnData.openTime.split(":");
		//         	var strfh = arrfh[0].replace(/(^0+)/, "");
		//         	var arrlh = returnData.closeTime.split(":");
		//         	var strlh = arrlh[0].replace(/(^0+)/, "");
		//         	scheduler.config.first_hour = strfh;
		//     		scheduler.config.last_hour = strlh;
		//     		//console.log("*******************"+ strfh + ":" + strlh);
	    //     	}

	    // 		scheduler.init('scheduler_here', new Date(year, month, sday), "week");
	    //     }
	    // });

		///schedule view 초기화
		//scheduler.init('scheduler_here', new Date(year, month, sday), "week");

		//왼쪽 미니 칼렌다 설정
		/*
		scheduler.templates.calendar_month = scheduler.date.date_to_str("%Y년, %M");
	    var calendar = scheduler.renderCalendar({
	        container:"cal_here",
	        navigation:true,
	        handler:function(date){
	            scheduler.setCurrentView(date, scheduler._mode);
	        }
	    });
	    scheduler.linkCalendar(calendar);
	    scheduler.setCurrentView(scheduler._date, scheduler._mode);
	    */

		schedulePopup.setPlace().then(function(data) {
			const dataHtml = data.map(value => {
				return `<option value="${value.key}">${value.label}</option>`;
			});
			const $placeList = $('#placeList');
			$placeList.prepend(dataHtml.join(''));
			$placeList.val(defaultGroupSpace);
		});

	    scheduleList.getWeekClassList(today, defaultGroupSpace);

	    //DB에서 스케줄 데이터 가지고와서 전달
		//scheduleList.getScheduleData(sDate, eDate, "");

		// 금일 스케줄 상태별 갯수 설정
		//schedulePopup.setScheduleStatCount(searchSDate, searchEDate);
	},

	classScheduleOffChk : function(id, e, cbFunc) {
		var action_data = scheduler.getActionData(e);
		var formatFuncYMDHI = scheduler.date.date_to_str("%Y-%m-%d");
		var search_date = formatFuncYMDHI(action_data.date);
		var seq_class_schedule = id;

		$.ajax({
	        type: "POST",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	        url: "/manager/schedule/class/json/classScheduleOffChk",
	        async:false,
	        data : {
				searchDate : search_date,
				seqClassSchedule : seq_class_schedule
			},
	        dataType: "json",
	        success: function (returnData) {
	        	if(returnData != null){
	        		if(returnData.offCount == 0){
	        			var action_data = scheduler.getActionData(e);
						var formatFunc = scheduler.date.date_to_str("%Y-%m-%d");
						var this_date = formatFunc(action_data.date);
						var week_idx = new Date(this_date).getDay();
						var view_name = "stateUpdate";
						schedulePopup.detailViewInit(view_name, id, this_date, week_idx);
//						scheduleList.popOpen($("#modModal"));
//						scheduleList.popOpen($(".info_class_before"));

						if (typeof cbFunc === 'function') {
							cbFunc();
						}
	        		}else{
	        			alert("휴강입니다. 예약 불가합니다.");
	        		}
	        	}
	        }
	    });
	},

	resetView : function(){
	    var formatFuncYY = scheduler.date.date_to_str("%Y");
		var formatFuncMM = scheduler.date.date_to_str("%m");
		var formatFuncDD = scheduler.date.date_to_str("%d");
	   	var year = formatFuncYY(scheduler.getState().date);
		var month = formatFuncMM(scheduler.getState().date);
		var day = formatFuncDD(scheduler.getState().date);
		var newDate = scheduler.date.add(new Date(scheduler.getState().date), 1, 'month');
		var new_year = formatFuncYY(newDate);
		var new_month = formatFuncMM(newDate);
		var new_day = formatFuncDD(newDate);

		//1달 단위로 다시 데이터 가져옴
		var sDate = year + "-" + month + "-01";
		var eDate = new_year + "-" + new_month + "-01";
		//console.log(sDate + ":" + eDate + "///" + $("#schedule_mode").val());

		if($("#schedule_mode").val() == "week"){
			scheduleList.getClassList();
			//scheduleList.getScheduleData(sDate, eDate, $("#coach_id").val());
		}else if ($("#schedule_mode").val() == "unit"){
			//scheduleList.getScheduleData(sDate, eDate, "");
		}
	},

	getWeekClassList : function(searchDate, seqPlace) {
		scheduler.clearAll();
		//console.log("param" + searchDate);

		/* var seqClass = "";
		if($("#schedule_mode").val()=="week"){
			seqClass = $("#classList").val();
		}else{
		} */

		/* var seqPlace = "";
		if ($("#schedule_mode").val() == "week") {
			seqPlace = $("#placeList").val();
		} else {
		} */

		var formatFuncYYMMDD = scheduler.date.date_to_str("%Y-%m-%d");
		var formatFuncYY = scheduler.date.date_to_str("%Y");
		var formatFuncMM = scheduler.date.date_to_str("%m");
		var formatFuncDD = scheduler.date.date_to_str("%d");

		var startWeekDate = scheduler.date.week_start(searchDate);//newdate.getDay();
		var endWeekDate = scheduler.date.add(startWeekDate, 6, 'day');
		var searchDate = formatFuncYYMMDD(startWeekDate);

//		console.log("seqPlace:" + seqPlace);
		if(!seqPlace || isNaN(seqPlace)) return;

		var returnData = [{"end_date":"2021-04-13 12:50","off_day":"","off_time":"","seq_temp":"3220319","text":"필라테스 기초 그룹레슨|서보석","reserveCnt":"1","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-13 12:00"},{"end_date":"2021-04-16 12:50","off_day":"","off_time":"","seq_temp":"3220322","text":"필라테스 기초 그룹레슨|서보석","reserveCnt":"1","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-16 12:00"},{"end_date":"2021-04-15 12:50","off_day":"","off_time":"","seq_temp":"3220321","text":"필라테스 기초 그룹레슨|서보석","reserveCnt":"1","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-15 12:00"},{"end_date":"2021-04-14 12:50","off_day":"","off_time":"","seq_temp":"3220320","text":"필라테스 기초 그룹레슨|김반석","reserveCnt":"0","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-14 12:00"},{"end_date":"2021-04-17 10:50","off_day":"","off_time":"","seq_temp":"3226713","text":"필라테스 기초 그룹레슨|설현","reserveCnt":"0","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-17 10:00"},{"end_date":"2021-04-14 10:50","off_day":"","off_time":"","seq_temp":"3275383","text":"필라테스 기초 그룹레슨|주홍일","reserveCnt":"1","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-14 10:00"},{"end_date":"2021-04-13 10:50","off_day":"","off_time":"","seq_temp":"3275382","text":"필라테스 기초 그룹레슨|주홍일","reserveCnt":"2","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-13 10:00"},{"end_date":"2021-04-12 10:50","off_day":"","off_time":"","seq_temp":"3275381","text":"필라테스 기초 그룹레슨|주홍일","reserveCnt":"1","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-12 10:00"},{"end_date":"2021-04-16 10:50","off_day":"","off_time":"","seq_temp":"3275385","text":"필라테스 기초 그룹레슨|주홍일","reserveCnt":"1","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-16 10:00"},{"end_date":"2021-04-15 10:50","off_day":"","off_time":"","seq_temp":"3275384","text":"필라테스 기초 그룹레슨|주홍일","reserveCnt":"2","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-15 10:00"},{"end_date":"2021-04-13 11:50","off_day":"","off_time":"","seq_temp":"3275428","text":"중급 그룹레슨|서보석","reserveCnt":"0","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-13 11:00"},{"end_date":"2021-04-16 11:50","off_day":"","off_time":"","seq_temp":"3275431","text":"중급 그룹레슨|서보석","reserveCnt":"0","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-16 11:00"},{"end_date":"2021-04-14 11:50","off_day":"","off_time":"","seq_temp":"3275429","text":"중급 그룹레슨|서보석","reserveCnt":"0","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-14 11:00"},{"end_date":"2021-04-12 11:50","off_day":"","off_time":"","seq_temp":"3275427","text":"중급 그룹레슨|서보석","reserveCnt":"0","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-12 11:00"},{"end_date":"2021-04-15 11:50","off_day":"","off_time":"","seq_temp":"3275430","text":"중급 그룹레슨|서보석","reserveCnt":"0","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-15 11:00"},{"end_date":"2021-04-13 19:50","off_day":"","off_time":"","seq_temp":"3275474","text":"기초 그룹레슨|서보석","reserveCnt":"4","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-13 19:00"},{"end_date":"2021-04-16 19:50","off_day":"","off_time":"","seq_temp":"3275477","text":"기초 그룹레슨|퍼스트 강사 (테스트)","reserveCnt":"4","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-16 19:00"},{"end_date":"2021-04-14 19:50","off_day":"","off_time":"","seq_temp":"3275475","text":"기초 그룹레슨|서보석","reserveCnt":"4","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-14 19:00"},{"end_date":"2021-04-12 19:50","off_day":"","off_time":"","seq_temp":"3275473","text":"기초 그룹레슨|다짐 강사 (테스트)","reserveCnt":"2","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-12 19:00"},{"end_date":"2021-04-15 19:50","off_day":"","off_time":"","seq_temp":"3275476","text":"기초 그룹레슨|다짐 강사 (테스트)","reserveCnt":"4","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-15 19:00"},{"end_date":"2021-04-13 20:50","off_day":"","off_time":"","seq_temp":"3275520","text":"중급 그룹레슨|퍼스트 강사 (테스트)","reserveCnt":"1","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-13 20:00"},{"end_date":"2021-04-16 20:50","off_day":"","off_time":"","seq_temp":"3275523","text":"중급 그룹레슨|주홍일","reserveCnt":"3","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-16 20:00"},{"end_date":"2021-04-14 20:50","off_day":"","off_time":"","seq_temp":"3275521","text":"중급 그룹레슨|수진 강사 (테스트)","reserveCnt":"1","reserveLimitNo":"12","openYn":"Y","seq_class":"19547","start_date":"2021-04-14 20:00"},{"end_date":"2021-04-12 20:50","off_day":"","off_time":"","seq_temp":"3275519","text":"중급 그룹레슨|퍼스트 강사 (테스트)","reserveCnt":"1","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-12 20:00"},{"end_date":"2021-04-15 20:50","off_day":"","off_time":"","seq_temp":"3275522","text":"중급 그룹레슨|주홍일","reserveCnt":"2","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-15 20:00"},{"end_date":"2021-04-13 21:50","off_day":"","off_time":"","seq_temp":"3275566","text":"그룹레슨|서보석","reserveCnt":"1","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-13 21:00"},{"end_date":"2021-04-16 21:50","off_day":"","off_time":"","seq_temp":"3275569","text":"그룹레슨|서보석","reserveCnt":"1","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-16 21:00"},{"end_date":"2021-04-14 21:50","off_day":"","off_time":"","seq_temp":"3275567","text":"그룹레슨|서보석","reserveCnt":"1","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-14 21:00"},{"end_date":"2021-04-12 21:50","off_day":"","off_time":"","seq_temp":"3275565","text":"그룹레슨 테스트|서보석","reserveCnt":"2","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-12 21:00"},{"end_date":"2021-04-15 21:50","off_day":"","off_time":"","seq_temp":"3275568","text":"그룹레슨|서보석","reserveCnt":"2","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-15 21:00"},{"end_date":"2021-04-17 10:20","off_day":"","off_time":"","seq_temp":"3306143","text":"필라테스 기초 그룹레슨|Riyeon","reserveCnt":"1","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-17 09:30"},{"end_date":"2021-04-17 11:20","off_day":"","off_time":"","seq_temp":"3306195","text":"필라테스 기초 그룹레슨|Riyeon","reserveCnt":"0","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-17 10:30"},{"end_date":"2021-04-17 12:20","off_day":"","off_time":"","seq_temp":"3306225","text":"필라테스 중급 그룹레슨|Riyeon","reserveCnt":"0","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-17 11:30"},{"end_date":"2021-04-17 19:40","off_day":"","off_time":"","seq_temp":"3306327","text":"필라테스 중급 그룹레슨|Riyeon","reserveCnt":"0","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-17 18:50"},{"end_date":"2021-04-17 20:50","off_day":"","off_time":"","seq_temp":"3306338","text":"필라테스 기초 그룹레슨|Riyeon","reserveCnt":"0","reserveLimitNo":"4","openYn":"Y","seq_class":"19547","start_date":"2021-04-17 20:00"}];
		returnData = [{"end_date":"2021-05-05 10:50","off_day":"","off_time":"","seq_temp":"3275398","text":"필라테스 기초 그룹레슨|이석훈","reserveCnt":"1","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-05 10:00"},{"end_date":"2021-05-03 10:50","off_day":"","off_time":"","seq_temp":"3275396","text":"필라테스 기초 그룹레슨|이석훈","reserveCnt":"1","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-03 10:00"},{"end_date":"2021-05-06 10:50","off_day":"","off_time":"","seq_temp":"3275399","text":"필라테스 기초 그룹레슨|이석훈","reserveCnt":"1","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-06 10:00"},{"end_date":"2021-05-04 10:50","off_day":"","off_time":"","seq_temp":"3275397","text":"필라테스 기초 그룹레슨|이석훈","reserveCnt":"2","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-04 10:00"},{"end_date":"2021-05-07 10:50","off_day":"","off_time":"","seq_temp":"3275400","text":"필라테스 기초 그룹레슨|이석훈","reserveCnt":"1","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-07 10:00"},{"end_date":"2021-05-05 11:50","off_day":"","off_time":"","seq_temp":"3275444","text":"중급 그룹레슨|홍준선","reserveCnt":"0","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-05 11:00"},{"end_date":"2021-05-03 11:50","off_day":"","off_time":"","seq_temp":"3275442","text":"중급 그룹레슨|홍준선","reserveCnt":"0","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-03 11:00"},{"end_date":"2021-05-06 11:50","off_day":"","off_time":"","seq_temp":"3275445","text":"중급 그룹레슨|홍준선","reserveCnt":"0","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-06 11:00"},{"end_date":"2021-05-04 11:50","off_day":"","off_time":"","seq_temp":"3275443","text":"중급 그룹레슨|홍준선","reserveCnt":"0","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-04 11:00"},{"end_date":"2021-05-07 11:50","off_day":"","off_time":"","seq_temp":"3275446","text":"중급 그룹레슨|홍준선","reserveCnt":"0","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-07 11:00"},{"end_date":"2021-05-05 19:50","off_day":"","off_time":"","seq_temp":"3275490","text":"기초 그룹레슨|홍준선","reserveCnt":"3","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-05 19:00"},{"end_date":"2021-05-03 19:50","off_day":"","off_time":"","seq_temp":"3275488","text":"기초 그룹레슨|홍준선","reserveCnt":"3","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-03 19:00"},{"end_date":"2021-05-06 19:50","off_day":"","off_time":"","seq_temp":"3275491","text":"기초 그룹레슨|홍준선","reserveCnt":"3","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-06 19:00"},{"end_date":"2021-05-04 19:50","off_day":"","off_time":"","seq_temp":"3275489","text":"기초 그룹레슨|홍준선","reserveCnt":"3","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-04 19:00"},{"end_date":"2021-05-07 19:50","off_day":"","off_time":"","seq_temp":"3275492","text":"기초 그룹레슨|홍준선","reserveCnt":"3","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-07 19:00"},{"end_date":"2021-05-07 20:50","off_day":"","off_time":"","seq_temp":"3275538","text":"중급 그룹레슨|이석훈","reserveCnt":"1","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-07 20:00"},{"end_date":"2021-05-05 20:50","off_day":"","off_time":"","seq_temp":"3275536","text":"중급 그룹레슨|이석훈","reserveCnt":"1","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-05 20:00"},{"end_date":"2021-05-03 20:50","off_day":"","off_time":"","seq_temp":"3275534","text":"중급 그룹레슨|이석훈","reserveCnt":"1","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-03 20:00"},{"end_date":"2021-05-06 20:50","off_day":"","off_time":"","seq_temp":"3275537","text":"중급 그룹레슨|이석훈","reserveCnt":"1","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-06 20:00"},{"end_date":"2021-05-04 20:50","off_day":"","off_time":"","seq_temp":"3275535","text":"중급 그룹레슨|이석훈","reserveCnt":"1","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-04 20:00"},{"end_date":"2021-05-05 21:50","off_day":"","off_time":"","seq_temp":"3275582","text":"그룹레슨|홍준선","reserveCnt":"1","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-05 21:00"},{"end_date":"2021-05-03 21:50","off_day":"","off_time":"","seq_temp":"3275580","text":"그룹레슨|홍준선","reserveCnt":"1","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-03 21:00"},{"end_date":"2021-05-04 21:50","off_day":"","off_time":"","seq_temp":"3275581","text":"그룹레슨|홍준선","reserveCnt":"1","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-04 21:00"},{"end_date":"2021-05-07 21:50","off_day":"","off_time":"","seq_temp":"3275584","text":"그룹레슨|홍준선","reserveCnt":"1","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-07 21:00"},{"end_date":"2021-05-06 21:50","off_day":"","off_time":"","seq_temp":"3275583","text":"그룹레슨|홍준선","reserveCnt":"1","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-06 21:00"},{"end_date":"2021-05-06 14:20","off_day":"","off_time":"","seq_temp":"3328848","text":"그룹레슨|The Hecabe 강사 (테스트)","reserveCnt":"0","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-06 13:30"},{"end_date":"2021-05-05 14:20","off_day":"","off_time":"","seq_temp":"3328847","text":"그룹레슨|The Hecabe 강사 (테스트)","reserveCnt":"0","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-05 13:30"},{"end_date":"2021-05-04 14:20","off_day":"","off_time":"","seq_temp":"3328846","text":"그룹레슨|The Hecabe 강사 (테스트)","reserveCnt":"0","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-04 13:30"},{"end_date":"2021-05-04 14:20","off_day":"","off_time":"","seq_temp":"3328868","text":"그룹레슨|The Hecabe 강사 (테스트)","reserveCnt":"0","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-04 13:30"},{"end_date":"2021-05-03 14:20","off_day":"","off_time":"","seq_temp":"3328867","text":"그룹레슨|The Hecabe 강사 (테스트)","reserveCnt":"0","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-03 13:30"},{"end_date":"2021-05-06 14:20","off_day":"","off_time":"","seq_temp":"3328870","text":"그룹레슨|The Hecabe 강사 (테스트)","reserveCnt":"0","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-06 13:30"},{"end_date":"2021-05-05 14:20","off_day":"","off_time":"","seq_temp":"3328869","text":"그룹레슨|The Hecabe 강사 (테스트)","reserveCnt":"0","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-05 13:30"},{"end_date":"2021-05-07 14:20","off_day":"","off_time":"","seq_temp":"3328871","text":"그룹레슨|The Hecabe 강사 (테스트)","reserveCnt":"0","reserveLimitNo":"4","openYn":"N","seq_class":"19547","start_date":"2021-05-07 13:30"},{"end_date":"2021-05-06 13:50","off_day":"","off_time":"","seq_temp":"3452721","text":"필라테스 L2그룹레슨|이석훈","reserveCnt":"0","reserveLimitNo":"8","openYn":"Y","seq_class":"19547","start_date":"2021-05-06 13:00"},{"end_date":"2021-05-04 13:50","off_day":"","off_time":"","seq_temp":"3452720","text":"필라테스 L2그룹레슨|이석훈","reserveCnt":"0","reserveLimitNo":"8","openYn":"Y","seq_class":"19547","start_date":"2021-05-04 13:00"},{"end_date":"2021-05-08 13:50","off_day":"","off_time":"","seq_temp":"3452722","text":"필라테스 L2그룹레슨|이석훈","reserveCnt":"0","reserveLimitNo":"8","openYn":"Y","seq_class":"19547","start_date":"2021-05-08 13:00"},{"end_date":"2021-05-04 13:50","off_day":"","off_time":"","seq_temp":"3453749","text":"바디프로필 그룹 수업|이밍주","reserveCnt":"0","reserveLimitNo":"8","openYn":"Y","seq_class":"21274","start_date":"2021-05-04 13:00"},{"end_date":"2021-05-07 13:50","off_day":"","off_time":"","seq_temp":"3453751","text":"바디프로필 그룹 수업|이밍주","reserveCnt":"0","reserveLimitNo":"8","openYn":"Y","seq_class":"21274","start_date":"2021-05-07 13:00"},{"end_date":"2021-05-06 13:50","off_day":"","off_time":"","seq_temp":"3453750","text":"바디프로필 그룹 수업|이밍주","reserveCnt":"0","reserveLimitNo":"8","openYn":"Y","seq_class":"21274","start_date":"2021-05-06 13:00"},{"end_date":"2021-05-06 17:20","off_day":"","off_time":"","seq_temp":"3454028","text":"리포머 수업|이밍주","reserveCnt":"0","reserveLimitNo":"8","openYn":"Y","seq_class":"21287","start_date":"2021-05-06 16:30"},{"end_date":"2021-05-07 15:50","off_day":"","off_time":"","seq_temp":"3462269","text":"L1 PILATES|이밍주","reserveCnt":"0","reserveLimitNo":"6","openYn":"Y","seq_class":"19547","start_date":"2021-05-07 15:00"},{"end_date":"2021-05-07 17:00","off_day":"","off_time":"","seq_temp":"3464610","text":"(test) 필라테스 기초 그룹레슨|이석훈","reserveCnt":"0","reserveLimitNo":"5","openYn":"Y","seq_class":"19547","start_date":"2021-05-07 16:00"},{"end_date":"2021-05-06 17:00","off_day":"","off_time":"","seq_temp":"3464609","text":"(test) 필라테스 기초 그룹레슨|이석훈","reserveCnt":"0","reserveLimitNo":"5","openYn":"Y","seq_class":"19547","start_date":"2021-05-06 16:00"},{"end_date":"2021-05-08 17:00","off_day":"","off_time":"","seq_temp":"3464611","text":"(test) 필라테스 기초 그룹레슨|이석훈","reserveCnt":"0","reserveLimitNo":"5","openYn":"Y","seq_class":"19547","start_date":"2021-05-08 16:00"}];
		if (returnData != null && returnData !== '') {
			const strJson = [];
			$.each(returnData, function(k, value) { //현재기준 다음달 1일전에 등록된 모든 강의를 가지고 온다
				//off-day 체크 seqClass, start_date
				//날짜 비교
				const formatFunc = scheduler.date.str_to_date('%Y-%m-%d %H:%i');
				const classDate = formatFunc(value.end_date);
				const isEndSchedule = classDate < new Date();

				let classColor = '';
				const rate = value.reserveCnt / value.reserveLimitNo;
				if (classDate < new Date()) {
					if (rate === 0) {
						classColor = '#BDBDBD';
					} else if (rate < 1) {
						classColor = '#757575';
					} else {
						classColor = '#212121';
					}

				} else {
					if (rate === 0) {
						classColor = '#81C784';
					} else if (rate < 1) {
						classColor = '#43A047';
					} else if (rate === 1) {
						classColor = '#1B5E20';
					} else {
						classColor = '#e62828';
					}
				}


				// var tempText = value.text.replace(/_/g, ' / ');
				const textArr = value.text.split('|');

				let tempText = '';
				tempText += textArr[0] + ' / ';
				tempText += textArr[1] + ' / ';
				tempText += value.reserveCnt + '명/' + value.reserveLimitNo + '명';

				if (value.off_day !== '') {
					classColor = '#f7d6d7';
					tempText = '휴업';
					strJson.push({
						id : parseInt(value.seq_temp),
						start_date : value.start_date,
						end_date : value.end_date,
						text : tempText,
						section_id : value.seq_class,
						color : classColor,
						isEndSchedule : isEndSchedule
					});

				} else if (value.off_time !== '') {
					// 취소된 수업. 스케줄러에 표시하지 않음
					/*
					classColor = '#f7d6d7';
					tempText = '수업 취소';
					strJson += '{id:"' + value.seq_temp + '", start_date: "' + value.start_date + '", end_date: "' + value.end_date + '", text:"' + tempText + '", section_id:"' + value.seq_class + '", color:"' + classColor + '"},';
					*/
				} else {
					const className = [];
					className.push((value.openYn == "Y") ? "openYn_y" : "openYn_n");
					className.push((value.naver_booking_yn == "Y") ? "naverBooking_y" : "naverBooking_n");
					strJson.push({
						id : parseInt(value.seq_temp),
						start_date : value.start_date,
						end_date : value.end_date,
						text : tempText,
						section_id : value.seq_class,
						color : classColor,
						isEndSchedule : isEndSchedule,
						isNaverBooking : (value.naver_booking_yn == "Y") ? true : false,
						cssClass : className.join(" ")
					});
				}
			});

			scheduler.parse(strJson, 'json');
		}

		//update 스케줄
		// const formatFuncYY = scheduler.date.date_to_str("%Y");
		// const formatFuncMM = scheduler.date.date_to_str("%m");
		// const formatFuncDD = scheduler.date.date_to_str("%d");

		const year = formatFuncYY(scheduler.getState().date);
		const day = formatFuncDD(scheduler.getState().date);

		const newDate = scheduler.date.add(new Date(scheduler.getState().date), 1, 'month');
		const now_date = new Date(scheduler.getState().date);
		now_date.setMonth(now_date.getMonth());
		const cal_month = formatFuncMM(now_date);

		scheduler.updateView(new Date(year, parseInt(cal_month) - 1, day), "week");
		scheduler.setCurrentView();

		// $.ajax({
		// 	type : 'POST',
		// 	contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		// 	url : '/manager/schedule/class/json/weekClassSchedulelist',
		// 	async : false,
		// 	data : {
		// 		searchDate : searchDate,
		// 		seqPlace : seqPlace
		// 	},
		// 	dataType : 'json',
		// 	success : function(returnData) {
		// 		if (returnData != null && returnData !== '') {
		// 			const strJson = [];
		// 			$.each(returnData, function(k, value) { //현재기준 다음달 1일전에 등록된 모든 강의를 가지고 온다
		// 				//off-day 체크 seqClass, start_date
		// 				//날짜 비교
		// 				const formatFunc = scheduler.date.str_to_date('%Y-%m-%d %H:%i');
		// 				const classDate = formatFunc(value.end_date);
		// 				const isEndSchedule = classDate < new Date();

		// 				let classColor = '';
		// 				const rate = value.reserveCnt / value.reserveLimitNo;
		// 				if (classDate < new Date()) {
		// 					if (rate === 0) {
		// 						classColor = '#BDBDBD';
		// 					} else if (rate < 1) {
		// 						classColor = '#757575';
		// 					} else {
		// 						classColor = '#212121';
		// 					}

		// 				} else {
		// 					if (rate === 0) {
		// 						classColor = '#81C784';
		// 					} else if (rate < 1) {
		// 						classColor = '#43A047';
		// 					} else if (rate === 1) {
		// 						classColor = '#1B5E20';
		// 					} else {
		// 						classColor = '#e62828';
		// 					}
		// 				}


		// 				// var tempText = value.text.replace(/_/g, ' / ');
		// 				const textArr = value.text.split('|');

		// 				let tempText = '';
		// 				tempText += textArr[0] + ' / ';
		// 				tempText += textArr[1] + ' / ';
		// 				tempText += value.reserveCnt + '명/' + value.reserveLimitNo + '명';

		// 				if (value.off_day !== '') {
		// 					classColor = '#f7d6d7';
		// 					tempText = '휴업';
		// 					strJson.push({
		// 						id : parseInt(value.seq_temp),
		// 						start_date : value.start_date,
		// 						end_date : value.end_date,
		// 						text : tempText,
		// 						section_id : value.seq_class,
		// 						color : classColor,
		// 						isEndSchedule : isEndSchedule
		// 					});

		// 				} else if (value.off_time !== '') {
		// 					// 취소된 수업. 스케줄러에 표시하지 않음
		// 					/*
		// 					classColor = '#f7d6d7';
		// 					tempText = '수업 취소';
		// 					strJson += '{id:"' + value.seq_temp + '", start_date: "' + value.start_date + '", end_date: "' + value.end_date + '", text:"' + tempText + '", section_id:"' + value.seq_class + '", color:"' + classColor + '"},';
		// 					*/
		// 				} else {
		// 					const className = [];
		// 					className.push((value.openYn == "Y") ? "openYn_y" : "openYn_n");
		// 					className.push((value.naver_booking_yn == "Y") ? "naverBooking_y" : "naverBooking_n");
		// 					strJson.push({
		// 						id : parseInt(value.seq_temp),
		// 						start_date : value.start_date,
		// 						end_date : value.end_date,
		// 						text : tempText,
		// 						section_id : value.seq_class,
		// 						color : classColor,
		// 						isEndSchedule : isEndSchedule,
		// 						isNaverBooking : (value.naver_booking_yn == "Y") ? true : false,
		// 						cssClass : className.join(" ")
		// 					});
		// 				}
		// 			});

		// 			scheduler.parse(strJson, 'json');
		// 		}

		// 		//update 스케줄
		// 		const formatFuncYY = scheduler.date.date_to_str("%Y");
		// 		const formatFuncMM = scheduler.date.date_to_str("%m");
		// 		const formatFuncDD = scheduler.date.date_to_str("%d");

		// 		const year = formatFuncYY(scheduler.getState().date);
		// 		const day = formatFuncDD(scheduler.getState().date);

		// 		const newDate = scheduler.date.add(new Date(scheduler.getState().date), 1, 'month');
		// 		const now_date = new Date(scheduler.getState().date);
		// 		now_date.setMonth(now_date.getMonth());
		// 		const cal_month = formatFuncMM(now_date);

		// 		scheduler.updateView(new Date(year, parseInt(cal_month) - 1, day), "week");
		// 		scheduler.setCurrentView();
		// 	},
		// 	error : function() {
		// 		alert('스케줄 목록을 가져오던 중 오류가 발생하였습니다.\n' +
		// 			'계속해서 오류가 발생할 경우 관리자에게 문의해주세요.');
		// 	}
		// });
	}
};
