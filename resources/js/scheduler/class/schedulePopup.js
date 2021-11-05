$(function() {
	// 회원 검색 후 검색 결과 영역 밖을 선택(클릭)했을 때
	$(document).on('click', function(e) {
		const searchInput = $('.search_result, input[data-search="member"]');
		if (!searchInput.has(e.target).length) {
			$('.search_result').hide();
		}
	});
});


var schedulePopup = {
	scheduleData : '',
	memberList : '',

	setField : function (seq, name, mobile, seqemp, empname){
		$("#member_id").val(seq);
		$("#employee_id").val(seqemp);
		$("#member_name").val(name);
		$("#mobile").val(mobile);
		$("#employee_name").val(empname);
		//jQuery('#search_container').hide();
	},

	setScheduleStatCount : function(startDate, endDate){
		//ScheduleStatCount init
		var params = { "startDate": startDate, "endDate": endDate };

		$.ajax({
	        type: "POST",
					contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	        url: "/manager/schedule/promise/json/scheduleCountList",
	        async:false,
	        data: params,
	        dataType: "json",
	        success: function (returnData) {
	        	var htmlStr = '';
	        	$.each(returnData, function(k, v){
	        		if(v.state == "A")
	        			htmlStr += "결석 : " + v.cnt + "</br>";
	        		if(v.state == "C")
	        			htmlStr += "취소 : " + v.cnt + "</br>";
	        		if(v.state == "E")
	        			htmlStr += "출석 : " + v.cnt + "</br>";
	        		if(v.state == "R")
	        			htmlStr += "예약 : " + v.cnt + "</br>";
	        	});
	        	$("#schedule_state").html(htmlStr);
	        }
	    });
	},

	setProduct : function(){
		//popup product init
		$.ajax({
	        type: "POST",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	        url: "/manager/schedule/promise/json/productlist",
	        async:false,
	        dataType: "json",
	        success: function (returnData) {
	        	var htmlStr = '';
	        	htmlStr = "<option value=''>상품을 선택하세요.</option>";
	        	$.each(returnData, function(k, v){
	        		htmlStr += "<option value='" + v.seq_product + "'>" + v.product_name + ' - ' + v.pass_name + "</option>";
	        	});
	        	$("#productList").prepend(htmlStr);
	        	$("#product_id").val("");
    			$("#product_init_id").val("");
	        }
	    });
	},

	setClass : function(){
		//popup class init
		$.ajax({
	        type: "POST",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	        url: "/manager/schedule/class/json/classlist",
	        async:false,
	        dataType: "json",
	        success: function (returnData) {
	        	var htmlStr = '';
	        	//htmlStr = "<option value=''>수업을 선택하세요.</option>";
	        	htmlStr = "";
	        	$.each(returnData, function(k, v){
	        		htmlStr += "<option value='" + v.key + "'>" + v.label + "</option>";
	        	});
	        	$("#classList").prepend(htmlStr);
	        }
	    });
	},


	setPlace : function(cbFunc) {
		var returnData = [{"label":".","key":"2034"},{"label":".","key":"1930"},{"label":".","key":"1956"},{"label":".","key":"2115"},{"label":".","key":"1990"},{"label":".","key":"2114"},{"label":"A룸","key":"1929"},{"label":"골프 타석","key":"1980"},{"label":"그룹레슨 룸","key":"2116"},{"label":"상담예약","key":"2113"}];
		cbFunc(returnData)
		// $.ajax({
		// 	type : "POST",
		// 	contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
		// 	url : "/manager/schedule/usage/json/placeList",
		// 	async : false,
		// 	dataType : "json",
		// 	success : function(returnData) {
		// 		cbFunc(returnData);
		// 	}
		// });
	},


	setPlace : function() {
		return new Promise(function(resolve, reject) {
			var returnData = [{"label":".","key":"2034"},{"label":".","key":"1930"},{"label":".","key":"1956"},{"label":".","key":"2115"},{"label":".","key":"1990"},{"label":".","key":"2114"},{"label":"A룸","key":"1929"},{"label":"골프 타석","key":"1980"},{"label":"그룹레슨 룸","key":"2116"},{"label":"상담예약","key":"2113"}];
			resolve(returnData);
			// $.ajax({
			// 	type : "POST",
			// 	contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			// 	url : "/manager/schedule/usage/json/placeList",
			// 	async : false,
			// 	dataType : "json",
			// 	success : function(resultData) {
			// 		try {
			// 			resolve(resultData);
			// 		} catch (ex) {
			// 			alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
			// 			console.trace(ex);
			// 			$.unblockUI();
			// 		}
			// 	}
			// });
		});
	},

	//상품 change
	setEvent : function(){
		$('#productList').change(function(){
	        $("#product_id").val($('#productList option:selected').val());
	    });

		$('#event_state').change(function(){
	        if($('#event_state option:selected').val() == "B"){
	        	schedulePopup.resetField();
	        	jQuery('#member_container').hide();
	        	jQuery('#mobile_container').hide();
	        	jQuery('#employee_container').hide();
	        	jQuery('#product_container').hide();
	        }else{
	        	jQuery('#member_container').show();
	        	jQuery('#mobile_container').show();
	        	jQuery('#employee_container').show();
	        	jQuery('#product_container').show();
	        }
	    });
	},

	resetField : function(){
		$("#product_init_id").val("");
    	$("#employee_id").val("");
    	$("#member_id").val("");
    	$("#product_id").val("");

    	$("#employee_name").val("");
    	$("#member_name").val("");
    	$("#mobile").val("");
    	$("#productList").val($("#product_init_id").val());
	},

	initForm : function(){
		$("#event_state").val("R");
		$("#productList").val($("#product_init_id").val());
		$("#product_id").val($("#product_init_id").val());
		jQuery('#member_container').show();
    	jQuery('#mobile_container').show();
    	jQuery('#employee_container').show();
    	jQuery('#product_container').show();
	},

	//상세 class_schedule 정보
	detailViewInit : function(view_name, event_id, click_date, week_idx){
		try {
			const empty = [];
			classReservationPopup.setScheduleMemberList(empty);
			classCompletePopup.setScheduleMemberList(empty);
			cancelClassPopup.setScheduleData(empty);
		} catch(error) {
			console.log(error);
		}

		$.ajax({
	        type: "POST",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	        url: "/manager/schedule/class/json/detailSchedule",
	        async:false,
			data : {
	        	seqClassSchedule : event_id,
				weekIdx : week_idx
			},
	        dataType: "json",
	        context: this,
	        success: function (returnData) {
	        	this.scheduleData = returnData;
	        	classReservationPopup.setScheduleData(returnData);
	        	classCompletePopup.setScheduleData(returnData);
	        	cancelClassPopup.setScheduleData(returnData);

	        	if(view_name == "memberInsert"){
		        	$("#input_mode").val("insert");
					$("#schedule_id").val(event_id); //seq_class_schedule
		        	$("#schedule_sdate").val(click_date + " " + returnData.startTime); //start_date
		        	$("#schedule_edate").val(click_date + " " + returnData.endTime); //end_date
		        	$("#class_id").val(returnData.seqClass); //seq_class
		        	$("#class_name").val(returnData.className); //class_name
		        	$("#class_memo").val(returnData.description); //description
	    			$("#coach_id").val(returnData.seqCoach);
	        	}else{
	        		$("#mod_input_mode").val("insert");
					$("#mod_schedule_id").val(event_id); //seq_class_schedule
		        	$("#mod_schedule_sdate").val(click_date + " " + returnData.startTime); //start_date
		        	$("#mod_schedule_edate").val(click_date + " " + returnData.endTime); //end_date
		        	$("#mod_class_id").val(returnData.seqClass); //seq_class
		        	$("#mod_class_name").val(returnData.className); //class_name
		        	$("#mod_lesson_name").val(returnData.lessonName); //lesson_name	***
		        	$("#mod_class_memo").val(returnData.description); //description
	    			$("#mod_coach_id").val(returnData.seqCoach);

		        	//해당 스케줄에 등록된 스케줄 멤버 리스트 조회
	    			schedulePopup.detailViewScheduleMemberList();
	        	}
	        },
	        error : function(error) {
				alert("에러가 발생하였습니다.");
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


	//상세 class_schedule 정보
	detailViewScheduleMemberList : function(){
		const empty = [];
		classReservationPopup.setScheduleMemberList(empty);
		classCompletePopup.setScheduleMemberList(empty);

		var searchText = "";
		$.ajax({
			url: "/manager/schedule/class/json/scheduleMemberlist",
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			type: "POST",
			async:false,
			data: {
				term : searchText,
				seqClassSchedule : $("#mod_schedule_id").val(),
				seqClass : $("#mod_class_id").val(),
				startDate : $("#mod_schedule_sdate").val() + ":00",
				endDate : $("#mod_schedule_edate").val() + ":00"
			},
			dataType: "json",
			context: this,
			success: function(returnData) {
				classReservationPopup.setScheduleMemberList(returnData);
				classCompletePopup.setScheduleMemberList(returnData);

				this.memberList = returnData;

				if(returnData != "" && returnData != null){
					//데이터 검색 있을때
					$("#mod_search_memberlist").html("");
					var temptext ="<ul>";
					$.each(returnData, function(k, v){

						temptext = temptext //$("#mod_search_memberlist").html()
						+
							"<li>" +
								"<input type='checkbox' name='mod_employeeId' id='mod_employeeId_"+ v.seq + "'  value='"+ v.seq + "'><label for='mod_employeeId_"+ v.seq + "'>선택하기</label>" +
								"<input type='hidden' id='mod_employeeName_"+ v.seq + "' value='"+ v.name + "' />" +
								"<input type='hidden' id='seqSchedule"+ v.seq + "' value='"+ v.seqSchedule + "' />" +
								"<input type='hidden' id='seqPartnerPayment"+ v.seq + "' value='"+ v.seqPayment + "' />" +
								"<input type='hidden' id='seqPartnerProductPass"+ v.seq + "' value='"+ v.seqPass + "' />" +
								"<input type='hidden' id='seqPartnerProduct"+ v.seq + "' value='"+ v.seqProduct + "' />" +
								"<input type='hidden' id='now_state"+ v.seq + "' value='"+ v.state + "' />" +
								"<input type='hidden' id='seqPassInfo"+ v.seq + "' value='"+ v.seqPassInfo + "' />" +
								"<div class='profile'>" +
								"<p class='name'>" + v.name + "</p>" +
					            "<p class='info'>" + v.sex + " / " +  v.mobile + " / " + v.state + " / " + v.startDate + "</p>" +
								"</div>" +
							"</li>";
					});
					temptext = temptext + "</ul>";
					$("#mod_search_memberlist").html(temptext);
				}else{
					//데이터 검색 없을때
					var strNoData = "<div class='no_data' style='text-align:center;'><p>해당 수업에 예약등록된 회원이 없습니다. </p></div>";
					$("#mod_search_memberlist").html(strNoData);
					//jQuery('#mod_search_container').hide();
				}

			},
			error : function() {
				alert("회원 조회 중 오류가 발생하였습니다.");
			}
		});
	},

	// 회원 검색
	searchMember : function(params, cbFunc) {
		$.ajax({
			type : 'post',
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			url : '/manager/schedule/class/json/memberlist',
			data : params,
			dataType : 'json',
			context : this,
			success: function(returnData) {
				if (typeof cbFunc === 'function') {
					cbFunc(returnData);
				}
			},
			error : function(request, status, error) {
           		alert('에러가 발생하였습니다.');
           		console.log(request);
           		console.log(status);
           		console.log(error);

           	}
		});
	},


	searchProductUsageForAvailableByMember : function(params, cbFunc) {
		$.ajax({
			type : 'post',
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			url : '/product-usage/ajax/searchForAvailableByMember',
			data : params,
			dataType : 'json',
			context : this,
			success: function(returnData) {
				if (typeof cbFunc === 'function') {
					cbFunc(returnData);
				}
			},
			error : function(request, status, error) {
				alert('에러가 발생하였습니다.');
				console.log(request);
				console.log(status);
				console.log(error);
			}
		});
	},
	searchClassScheduleIsAvailableSeat : function(params) {
		return new Promise( (resolve,reject)=>{
			//$('#btnSaveSchedule').css("display") == "none" ? reject() : '';
			$.ajax({
				type : 'POST',
				contentType : 'application/json; charset=UTF-8',
				url : '/class-schedule/ajax/availableSeat',
				data : JSON.stringify(params),
				dataType : 'json',
				context : this,
				statusCode : {
					200 : function ( data ) {
						resolve(data);
					},
					204 : function( err ) {
						resolve();
					},
					400 : function ( err ) {
						reject();
					}
				}
			});
		});
	},

	findProductUsageStatusBySchedule : function(params, cbFunc) {
		$.ajax({
			type : 'post',
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			url : '/product-usage/ajax/findProductUsageStatusBySchedule',
			data : params,
			dataType : 'json',
			context : this,
			success: function(returnData) {
				if (typeof cbFunc === 'function') {
					cbFunc(returnData);
				}
			},
			error : function(request, status, error) {
				alert('에러가 발생하였습니다.');
				console.log(request);
				console.log(status);
				console.log(error);
			}
		});
	},

	//저장
	setPopupBtn : function(){
		$("#addModal").find(".close").click(function(){
			schedulePopup.closeAddPopup();
		});

		$("#modModal").find(".close").click(function(){
			schedulePopup.closeModPopup();
		});

		$("#btnClose").on("click", function(){
			event.preventDefault();
			schedulePopup.resetReload("memberInsert");
		});

		$("#btnCancel").on("click", function(){
			event.preventDefault();
			schedulePopup.resetReload("stateUpdate");
		});

		$( "#classList" ).change(function() {
			if($("#schedule_mode").val() == "week"){
				$("#class_id").val($("#classList").val());
				$("#mod_class_id").val($("#classList").val());

				var selDate = new Date(scheduler.getState().date);

				var seqPlace = $("#placeList").val();
				scheduleList.getWeekClassList(selDate, seqPlace);
			}
		});


		$( "#placeList" ).change(function() {
			if($("#schedule_mode").val() == "week"){
				$("#place_id").val($("#placeList").val());
				$("#mod_place_id").val($("#placeList").val());

				var selDate = new Date(scheduler.getState().date);
				var seqPlace = $("#placeList").val();
				scheduleList.getWeekClassList(selDate, seqPlace);
			}
		});
	},

	closeAddPopup : function(){
		$("#addModal").fadeOut(300);
		schedulePopup.resetReload("memberInsert");
	},

	closeModPopup : function(){
		$("#modModal").fadeOut(300);
		schedulePopup.resetReload("memberUpdate");
	},

	resetReload : function(view_name){
		scheduler.clearAll();
		var selDate = new Date(scheduler.getState().date);
		var seqPlace = $("#placeList").val();
		scheduleList.getWeekClassList(selDate, seqPlace);

		//var tempMode = $("#schedule_mode").val();
		if(view_name == "memberInsert"){
			$("#scheduleForm")[0].reset();
			$("#search_memberlist").html("");
			//$('#addModal').modal('hide');
		}else{
			$("#scheduleModForm")[0].reset();
			$("#mod_search_memberlist").html("");
		}
	}
};
