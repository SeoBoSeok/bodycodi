const ScheduleController = {
	executedAppointmentBycoach : function(data, cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			url : '/schedule/ajax/executed-appointment/coach',
			data : JSON.stringify(data),
			dataType : 'json',
			success : function(returnData) {
				if (returnData.result !== 'SUCCESS' || returnData.resultCode !== '000') {
					alert('작업 중 오류가 발생하였습니다.');
					return;
				}


				if (typeof cbFunc === 'function') {
					try {
						cbFunc(returnData);

					} catch (ex) {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				}
			},
			error : function(data) {
				alert('작업 중 오류가 발생하였습니다.');
				console.trace(data);
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


	searchForAppointmentAvailableDateTime : function(data, cbFunc) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'POST',
				contentType : 'application/json;charset=UTF-8',
				url : '/schedule/ajax/search-for-appointment-available-date-time',
				data : JSON.stringify(data),
				dataType : 'json',
				success : function(returnData) {
					if (returnData.result !== 'SUCCESS' || returnData.resultCode !== '000') {
						alert('작업 중 오류가 발생하였습니다.');
						return;
					}


					try {
						resolve(returnData);

					} catch (ex) {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(ex);
						$.unblockUI();
					}

				},
				error : function(data) {
					alert('작업 중 오류가 발생하였습니다.');
					console.trace(data);
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
	},


	searchForClassAvailableDateTime : function(data, cbFunc) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'POST',
				contentType : 'application/json;charset=UTF-8',
				url : '/schedule/ajax/search-for-class-available-date-time',
				data : JSON.stringify(data),
				dataType : 'json',
				success : function(returnData) {
					if (returnData.result !== 'SUCCESS' || returnData.resultCode !== '000') {
						alert('작업 중 오류가 발생하였습니다.');
						return;
					}


					try {
						resolve(returnData);

					} catch (ex) {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				},
				error : function(data) {
					alert('작업 중 오류가 발생하였습니다.');
					console.trace(data);
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
	},


	findAllByPartnerClassSchedule(seqPartnerClassSchedule, seqPartner, options) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'POST',
				url : `/api/rest/partners/${seqPartner}/schedule/partnerClassSchedule/${seqPartnerClassSchedule}`,
				contentType : 'application/json;charset=UTF-8',
				data : JSON.stringify(options),
				dataType : "json",
				success : function(returnData) {
					try {
						resolve(returnData);
					} catch (ex) {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				},
				error : function(data) {
					alert('작업 중 오류가 발생하였습니다.');
					console.trace(data);
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
	},


	changeClassReservation(params) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'PATCH',
				contentType : 'application/json; charset=UTF-8',
				url : '/manager/schedule/class/change',
				data : JSON.stringify(params),
				dataType : 'json',
				beforeSend : function(xhr) {
					$.blockUI({
						message : '<h5 style="padding-top: 15px">처리중입니다...</h5>',
						css : {
							'height' : '50px',
							'z-index' : '2010',
						}
					});
				},
				success : function(returnData) {
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
				complete : function(xhr, textStatus) {
					$.unblockUI();
				}
			});
		});
	},


	changeClassReservationOutOfWeeklyLimit(params) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'PATCH',
				contentType : 'application/json; charset=UTF-8',
				url: '/manager/schedule/class/change/out-of-weekly-limit',
				data : JSON.stringify(params),
				dataType : 'json',
				beforeSend : function(xhr) {
					$.blockUI({
						message : '<h5 style="padding-top: 15px">처리중입니다...</h5>',
						css : {
							'height' : '50px',
							'z-index' : '2010',
						}
					});
				},
				success : function(returnData) {
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
				complete : function(xhr, textStatus) {
					$.unblockUI();
				}
			});
		});
	},


	insertWhatScheduleStateIsWaitAndScheduleTypeIsClass(params) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type: "POST",
				contentType : 'application/json; charset=UTF-8',
				url: '/manager/schedule/class/schedule-state/wait',
				data: JSON.stringify(params),
				dataType: "json",
				success: function (returnData) {
					const resultData = new ResultData(returnData);
					if (resultData.isSuccess()) {
						try {
							resolve();
						} catch (ex) {
							alert('작업 중 오류가 발생하였습니다.');
							console.trace(ex);
							$.unblockUI();
						}
					} else {
						alert(resultData.getMsgForCustomer());
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


	convertWhatScheduleStateFromWaitToReserve(params) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'PATCH',
				contentType : 'application/json;charset=UTF-8',
				url : '/manager/schedule/class/schedule-state/wait-to-reserve',
				data : JSON.stringify(params),
				dataType : 'json',
				beforeSend : function(xhr) {
					$.blockUI({
						message : '<h5 style="padding-top: 15px">처리중입니다...</h5>',
						css : {
							'height' : '50px',
							'z-index' : '2010',
						}
					});
				},
				success : function(returnData) {
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
				complete : function(xhr, textStatus) {
					$.unblockUI();
				}
			});
		});
	},


	convertWhatScheduleStateFromWaitToReserveOutOfWeeklyLimit(params) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'PATCH',
				contentType : 'application/json;charset=UTF-8',
				url : '/manager/schedule/class/schedule-state/wait-to-reserve/out-of-weekly-limit',
				data : JSON.stringify(params),
				dataType : 'json',
				beforeSend : function(xhr) {
					$.blockUI({
						message : '<h5 style="padding-top: 15px">처리중입니다...</h5>',
						css : {
							'height' : '50px',
							'z-index' : '2010',
						}
					});
				},
				success : function(returnData) {
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
				complete : function(xhr, textStatus) {
					$.unblockUI();
				}
			});
		});
	},


	saveClassReservation(params) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type: "POST",
				contentType : 'application/json; charset=UTF-8',
				url: '/manager/schedule/class/save',
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


	saveClassReservationOutOfWeeklyLimit(params) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type: "POST",
				contentType : 'application/json; charset=UTF-8',
				url: '/manager/schedule/class/save/out-of-weekly-limit',
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


	saveClassReservationPastSchedule(params) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'post',
				contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
				url: '/manager/schedule/class/json/insertPastSchedule',
				data : params,
				dataType : 'json',
				context : this,
				beforeSend : function(xhr) {
					$.blockUI({
						message: '<h5 style="padding-top: 15px">처리중입니다...</h5>',
						css: {
							'height' : '50px',
							'z-index' : '2010',
						}
					});
				},
				success : function(returnData) {
					try {
						resolve(returnData);
					} catch (ex) {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				},
				error : function(xhr, textStatus, error) {
					alert('오류가 발생하였습니다.');
					console.log(xhr);
					console.log(textStatus);
					console.log(error);
				},
				complete : function(xhr, textStatus) {
					$.unblockUI();
				}
			});
		});
	},


	savePastClassScheduleOutOfWeeklyLimit(params) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type: "POST",
				contentType : 'application/json; charset=UTF-8',
				url: '/manager/schedule/class/save/past/out-of-weekly-limit',
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


	changeClassReservationNaver : function(params) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/manager/schedule/class/change/naver/" + params.seqSchedule + "/" + params.status,
				type		: "PATCH",
				contentType	: "application/json;charset=utf-8",
				dataType	: "json",
				success		: function(data) {
					if(data.RESULT == "SUCCESS" || data.RESULT_CODE == "000")
						resolve(data);
					else
						reject(data);
				},
				error		: function(error) {
					reject(error);
				},
				beforeSend	: uiBlock,
				complete	: uiUnblock,
			});
		});
	}
};
