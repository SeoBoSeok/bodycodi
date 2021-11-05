const PermissionController = {
	select : function(dataParam, cbFunc) {
		$.ajax({
			type : 'GET',
			contentType : 'application/json;charset=UTF-8',
			url : '/permission/ajax/select',
			data : dataParam,
			dataType : 'json',
			beforeSend : function(xhr) {
				$.blockUI({
					message : '<h5 style="padding-top: 15px">로딩중입니다...</h5>',
					css : {
						'height' : '50px',
						'z-index' : 2010
					}
				});
			},
			success : function(returnData) {
				if (typeof cbFunc === 'function') {
					cbFunc(returnData);
				}
			},
			error : function(data) {
				alert('작업 중 에러가 발생하였습니다.');
				console.trace(data);
			},
			complete : function(xhr, textStatus) {
				$.unblockUI();
			}
		})
	},


	get : function(dataParam, cbFunc) {
		var returnData = {"permissionSchedule":{"cancelAppointment":true,"readClassCoachPay":true,"modifyClassPast":false,"changeAppointmentScheduleState":true,"modifyAppointmentTime":true,"reserveAppointmentOtherCoach":true,"cancelClass":true,"addPastAppointmentScheduleState":true,"naverSchedule":true,"updateClassGoingAhead":false,"addClass":true},"permissionAccounting":{"readExpenditure":true,"configStaffPay":true,"readStaffPay":true,"accessAccounting":true,"readSales":true,"readAccount":true,"registExpenditure":true},"permissionMember":{"updateCounseling":true,"autoSms":false,"sendSms":true,"batchExtension":true,"readOtherCoachCounseling":true,"pauseUsage":true,"excelDownload":true,"del":true,"updateUsage":true,"locker":true,"transferUsage":true,"regist":true},"permissionStatistics":{"classes":true,"member":true,"appointment":true,"sales":true},"permissionProduct":{"registPublicProduct":true,"accessProductPage":true,"updateDiscountCoupon":true,"registDiscountCoupon":true,"registProduct":true,"modifyProduct":true,"registUsage":true,"modifyUsage":true},"permissionPayment":{"customSales":true,"changePaymentDate":true,"updateRefund":true,"updatePayment":true,"upgradePayment":true,"updatePricePolicyInSales":true,"changeSalesClassification":true,"exchangePassInfo":true,"receivables":true,"payment":true,"deletePayment":true,"customEarnMileage":true,"customDiscountPrice":true,"refund":true},"permissionOperation":{"reservationSetting":true,"holiday":true,"addSpace":true,"mileage":true}};
		cbFunc(returnData);
		// $.ajax({
		// 	type : 'POST',
		// 	contentType : 'application/json;charset=UTF-8',
		// 	url : '/permission/ajax/get',
		// 	data : JSON.stringify(dataParam),
		// 	dataType : 'json',
		// 	beforeSend : function(xhr) {
		// 		$.blockUI({
		// 			message : '<h5 style="padding-top: 15px">로딩중입니다...</h5>',
		// 			css : {
		// 				'height' : '50px',
		// 				'z-index' : 2010
		// 			}
		// 		});
		// 	},
		// 	success : function(returnData) {
		// 		if (typeof cbFunc === 'function') {
		// 			cbFunc(returnData);
		// 		}
		// 	},
		// 	error : function(data) {
		// 		alert('작업 중 에러가 발생하였습니다.');
		// 		console.trace(data);
		// 	},
		// 	complete : function(xhr, textStatus) {
		// 		$.unblockUI();
		// 	}
		// })
	},


	update : function(dataParam, cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			url : '/permission/ajax/update',
			data : JSON.stringify(dataParam),
			dataType : 'json',
			beforeSend : function(xhr) {
				$.blockUI({
					message : '<h5 style="padding-top: 15px">로딩중입니다...</h5>',
					css : {
						'height' : '50px',
						'z-index' : 2010
					}
				});
			},
			success : function() {
				if (typeof cbFunc === 'function') {
					cbFunc();
				}
			},
			error : function(data) {
				alert('작업 중 에러가 발생하였습니다.');
				console.trace(data);
			},
			complete : function(xhr, textStatus) {
				$.unblockUI();
			}
		})
	}

};
