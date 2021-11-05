const ClassScheduleController = {
	findOne : function(seqPartnerClassSchedule, cbFunc) {
		$.ajax({
			type : 'post',
			contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType : "json",
			url : '/manager/schedule/class/json/selectScheduleInfoByPk',
			data : {
				seqPartnerClassSchedule : seqPartnerClassSchedule
			},
			success : function(returnData) {
				if (returnData.RESULT === 'SUCCESS') {
					if (typeof cbFunc === 'function') {
						returnData.DATA.cost = returnData.COST;
						if(returnData.NAVER) returnData.DATA.naver = returnData.NAVER;
						if(returnData.LESSONNAVER) returnData.DATA.naverLesson = returnData.LESSONNAVER;
						cbFunc(returnData.DATA);
					}
				} else {
					alert('오류가 발생하였습니다.');
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


	insert : function(data, cbFunc) {
		$.ajax({
			type : 'post',
			contentType : 'application/json;charset=UTF-8',
			dataType : 'json',
			url : '/class-schedule/ajax/insert',
			data : JSON.stringify(data),
			success : function(resultData) {
				if (resultData.result !== 'SUCCESS' || resultData.resultCode === '100') {
					alert('작업 중 에러가 발생하였습니다.');
					return;
				}

				if (typeof cbFunc === 'function') {
					try {
						cbFunc(resultData);
					} catch (ex) {
						alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
						console.trace(ex);
						$.unblockUI();
					}
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


	update : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'post',
				contentType : 'application/json;charset=UTF-8',
				dataType : 'json',
				url : '/class-schedule/ajax/update',
				data : JSON.stringify(data),
				statusCode : {
					200 : function(data) {
						try {
							resolve(data);
						} catch (ex) {
							alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
							console.trace(ex);
							$.unblockUI();
						}
					},
					400 : function(errCode) {
						if (errCode.responseText == '1') {
							alert('해당 수업의 정원을 수정 할 수 없습니다.\r\n예약중인 회원들이 있습니다.');
						} else if (errCode.responseText == '4') {
							alert('해당 수업의 좌석을 수정 할 수 없습니다.\r\n예약중인 회원들이 있습니다.');
						} else {
							alert('작업 중 에러가 발생하였습니다.');
						}
						console.log('checkout Service, ErrCode : ' + errCode.responseText);
						reject();
					},
					404 : function() {
						alert('작업 중 오류가 발생하였습니다.');
					}
				},
				error : resolve,
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


	delete(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'post',
				url : '/class-schedule/ajax/delete',
				contentType : 'application/json;charset=UTF-8',
				dataType : 'json',
				data : JSON.stringify(data),
				statusCode : {
					200 : function() {
						try {
							resolve();
						} catch (ex) {
							alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
							console.trace(ex);
							$.unblockUI();
						}
					}, 404 : function(err) {
						alert('에러가 발생하였습니다.');
						console.log(err);
					}, 422 : function(err) {
						alert(err.responseJSON.reason);
						console.log(err);
					}, 500 : function(err) {
						alert('에러가 발생하였습니다.');
						console.log(err);
					}
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


	findAllByPartnerInRangeAndSpaces : function(data) {
		if(!data.searchStr) data.searchStr = "";			// 새롭게 검색어 기능 추가
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'post',
				contentType : 'application/json;charset=UTF-8',
				dataType : 'json',
				url : '/class-schedule/ajax/findAllByPartnerInRangeAndSpaces',
				data : JSON.stringify(data),
				success : function(resultData) {
					try {
						resolve(resultData);
					} catch (ex) {
						alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				},
				error : function(request, status, error) {
					if(request.status == 422) {
						const reason = request.responseJSON.reason || "에러가 발생하였습니다.";
						alert(reason);
					} else {
						alert('에러가 발생하였습니다.');
					}
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
		});
	},


	updatesOpen : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'PATCH',
				contentType : 'application/json;charset=UTF-8',
				dataType : 'json',
				url : '/class-schedule/ajax/open',
				data : JSON.stringify(data),
				success : function(resultData) {
					try {
						resolve(resultData);
					} catch (ex) {
						alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
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


	cancel(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'PATCH',
				url : '/class-schedule/ajax/cancel',
				contentType : 'application/json;charset=UTF-8',
				dataType : 'json',
				data : JSON.stringify(data),
				success : function(resultData) {
					try {
						resolve(resultData);
					} catch (ex) {
						alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				},
				error : function(request, status, error) {
					try {
						switch (request.status) {
							case 422:
								alert(request.responseJSON.reason);
								return;
							default:
								alert('오류가 발생하였습니다.');
								console.log(request);
								console.log(status);
								console.log(error);
						}
					} catch (ex) {
						alert('오류가 발생하였습니다.');
						console.trace(ex);
						$.unblockUI();
					}
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

	/*
	 * [강사 일괄 변경]
	 * 파라미터	: [{seqPartnerClassSchedule : 1234, seqPartnerCoach : 1234}, {...}]
	 */
	changeCoach : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type		: "put",
				url			: "/class-schedule/ajax/changeCoach",
				contentType	: "application/json;charset=ttf-8",
				data		: JSON.stringify(data),
				success : function(data) {
					resolve(data);
				},
				error : function(error) {
					reject();
				}
			});
		});
	},

	/*
	 * [수업 일괄 상태 변경]
	 */
	checkChangeState : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type		: "get",
				url			: "/manager/schedule/class/change-state",
				contentType	: "application/x-www-form-urlencoded;charset=utf-8",
				data		: data,
				success : function(data) {
					resolve(data);
				},
				error : function(error) {
					reject();
				},
				beforeSend	: uiBlock,
				complete	: uiUnblock
			});
		});
	},

	/*
	 * [수업 일괄 상태 변경]
	 */
	changeState : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type		: "patch",
				url			: "/manager/schedule/class/change-state",
				contentType	: "application/json;charset=utf-8",
				data		: JSON.stringify(data),
				dataType	: "json",
				success : function(data) {
					resolve(data);
				},
				error : function(error) {
					reject();
				},
				beforeSend	: uiBlock,
				complete	: uiUnblock
			});
		});
	},



	/*
	 * [그룹 수업 목록 데이터]
	 * 파라미터	: 없음
	 */
	lessonList(callback) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/manager/schedule/lesson/list",
				type		: "get",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				success		: function(data) {
					if(typeof callback == "function")
						callback(data);
					resolve(data);
				},
				error		: function(error) {
					reject();
				}
			});
		});
	},

	/*
	 * [수업 이미지 목록 데이터]
	 * 파라미터	: 없음
	 */
	imageList(callback) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/partner/seat/selectSeatImageList",
				type		: "post",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				success		: function(data) {
					if(typeof callback == "function")
						callback(data);
					resolve(data);
				},
				error		: function(error) {
					if(error.status == "406") {
						if(typeof callback == "function")
							callback("");
						resolve("");
					} else reject();
				}
			});
		});
	},

	/*
	 * [수업 이용권 목록 데이터]
	 * 파라미터	: 없음
	 */
	serviceList(callback) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/manager/schedule/class/json/selectGroupServiceList",
				type		: "post",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				success		: function(data) {
					if(typeof callback == "function")
						callback(data);
					resolve(data);
				},
				error		: function(error) {
					reject();
				}
			});
		});
	},

	/*
	 * [수업 참석자 기준 목록 데이터]
	 * 파라미터	: 없음
	 */
	attendanceList(callback) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/manager/schedule/lesson/attendanceType",
				type		: "get",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				success		: function(data) {
					if(typeof callback == "function")
						callback(data);
					resolve(data);
				},
				error		: function(error) {
					reject();
				}
			});
		});
	},

	/*
	 * [레슨 생성 및 수정]
	 * 파라미터	: (생략)
	 */
	lessonInsert(data, callback) {
		return this.lessonSubmit(data, undefined, callback);
	},

	lessonUpdate(data, id, callback) {
		return this.lessonSubmit(data, id, callback);
	},

	lessonSubmit(data, id, callback) {
		const url = "/manager/schedule/lesson" + ((id) ? "/" + id : "");
		const type = (id) ? "put" : "post";

		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: url,
				type		: type,
				contentType : "application/json;charset=utf-8",
				data		: JSON.stringify(data),
				dataType	: "json",
				success		: function(data) {
					if(typeof callback == "function")
						callback(data);
					resolve(data);
				},
				error		: function(error) {
					reject();
				},
				beforeSend	: uiBlock,
				complete	: uiUnblock
			});
		});
	},

	/*
	 * [레슨 상세 정보]
	 * 파라미터	: 레슨 고유 아이디
	 */
	lessonDetail(id, callback) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/manager/schedule/lesson/" + id,
				type		: "get",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				success		: function(data) {
					if(typeof callback == "function")
						callback(data);
					resolve(data);
				},
				error		: function(error) {
					reject();
				},
				beforeSend	: uiBlock,
				complete	: uiUnblock
			});
		});
	},

	/*
	 * [레슨 삭제]
	 * 파라미터	: [레슨 고유 아이디, ...]
	 */
	lessonDelete(data, callback) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/manager/schedule/lesson",
				type		: "delete",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				data		: JSON.stringify(data),
				success		: function(data) {
					if(typeof callback == "function")
						callback(data);
					resolve(data);
				},
				error		: function(error) {
					reject();
				},
				beforeSend	: uiBlock,
				complete	: uiUnblock
			});
		});
	},


	block() {
		$.blockUI({
			message : "잠시만 기다려 주세요.",
			css : {"left" : "50%", "top" : "50%", "padding" : "25px 50px", "width" : "auto", "border-radius" : "10px", "border" : "none", "font-size" : "14px", "transform" : "translate(-50%, -50%)"}
		});
	},

	unblock() {
		$.unblockUI();
	}
};
