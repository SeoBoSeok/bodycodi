const AppointmentTypeScheduleController = {
	insertPromiseSchedule(params) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type: "POST",
				contentType : 'application/json; charset=UTF-8',
				url: '/manager/schedule/promise/insertPromiseSchedule',
				data: JSON.stringify(params),
				dataType: "json",
				success: function (returnData) {
					try {
						resolve(returnData);
					} catch (ex) {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				},
				error : function(request, status, error) {
					alert('에러가 발생하였습니다.');
					console.log(request);
					console.log(status);
					console.log(error);
				},
				beforeSend : function(xhr) {
					$.blockUI({
						message : '<h5 style="padding-top: 15px">처리중입니다...</h5>',
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
	},


	saveReservationOutOfWeeklyLimit(params) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type: "POST",
				contentType : 'application/json; charset=UTF-8',
				url: '/manager/schedule/promise/save/reservation/out-of-weekly-limit',
				data: JSON.stringify(params),
				dataType: "json",
				success: function (returnData) {
					try {
						resolve(returnData);
					} catch (ex) {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				},
				error : function(request, status, error) {
					alert('에러가 발생하였습니다.');
					console.log(request);
					console.log(status);
					console.log(error);
				},
				beforeSend : function(xhr) {
					$.blockUI({
						message : '<h5 style="padding-top: 15px">처리중입니다...</h5>',
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
	},


	updatePromiseSchedule(params) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type: "PATCH",
				contentType : 'application/json; charset=UTF-8',
				url: '/manager/schedule/promise/updatePromiseSchedule',
				data: JSON.stringify(params),
				dataType: "json",
				success: function (returnData) {
					try {
						resolve(returnData);
					} catch (ex) {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				},
				error : function(request, status, error) {
					alert('오류가 발생하였습니다.');
					console.log(request);
					console.log(status);
					console.log(error);
				},
				beforeSend : function(xhr) {
					$.blockUI({
						message : '<h5 style="padding-top: 15px">처리중입니다...</h5>',
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
	},


	changeScheduleStateOutOfWeeklyLimit(params) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type: "PATCH",
				contentType : 'application/json; charset=UTF-8',
				url: '/manager/schedule/promise/change/schedule-state/out-of-weekly-limit',
				data: JSON.stringify(params),
				dataType: "json",
				success: function (returnData) {
					try {
						resolve(returnData);
					} catch (ex) {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				},
				error : function(request, status, error) {
					alert('오류가 발생하였습니다.');
					console.log(request);
					console.log(status);
					console.log(error);
				},
				beforeSend : function(xhr) {
					$.blockUI({
						message : '<h5 style="padding-top: 15px">처리중입니다...</h5>',
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
	},


	savePastSchedule(params) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type: "POST",
				contentType : 'application/json; charset=UTF-8',
				url: '/manager/schedule/promise/save/past-schedule',
				data: JSON.stringify(params),
				dataType: "json",
				success: function (returnData) {
					try {
						resolve(returnData);
					} catch (ex) {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				},
				error : function(request, status, error) {
					alert('오류가 발생하였습니다.');
					console.log(request);
					console.log(status);
					console.log(error);
				},
				beforeSend : function(xhr) {
					$.blockUI({
						message : '<h5 style="padding-top: 15px">처리중입니다...</h5>',
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
	},


	savePastScheduleOutOfWeeklyLimit(params) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type: "POST",
				contentType : 'application/json; charset=UTF-8',
				url: '/manager/schedule/promise/save/past-schedule/out-of-weekly-limit',
				data: JSON.stringify(params),
				dataType: "json",
				success: function (returnData) {
					try {
						resolve(returnData);
					} catch (ex) {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				},
				error : function(request, status, error) {
					alert('오류가 발생하였습니다.');
					console.log(request);
					console.log(status);
					console.log(error);
				},
				beforeSend : function(xhr) {
					$.blockUI({
						message : '<h5 style="padding-top: 15px">처리중입니다...</h5>',
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
	}
};
