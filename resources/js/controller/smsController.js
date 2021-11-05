const SmsController = {
	senderList : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'POST',
				contentType : 'application/json;charset=UTF-8',
				url : '/sms/ajax/sender',
				data : JSON.stringify(data),
				dataType : 'json',
				success : function(returnData) {
					try {
						resolve(returnData);
					} catch (ex) {
						alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				},
				error : function(data) {
					alert('작업 중 에러가 발생하였습니다.');
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


	findAutoSend : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'GET',
				contentType : 'application/x-www-form-urlencoded',
				url : '/sms/auto-send',
				data : JSON.stringify(data),
				dataType : 'json',
				success : function(returnData) {
					try {
						resolve(returnData);
					} catch (ex) {
						alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				},
				error : function(data) {
					alert('작업 중 에러가 발생하였습니다.');
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

	
	sendSmsToMember : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url : '/sms/send-to-member',
				type : 'POST',
				contentType : false,
				processData : false,
				data : data,
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
					try {
						resolve(returnData);

					} catch (ex) {
						alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				},
				error : function(data) {
					alert('작업 중 오류가 발생하였습니다.');
					console.trace(data);
				},
				complete : function(xhr, textStatus) {
					$.unblockUI();
				}
			});
		});
	},


	remainCnt : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'GET',
				contentType : 'application/json;charset=UTF-8',
				url : '/sms/remain-cnt',
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
					try {
						resolve(returnData);

					} catch (ex) {
						alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				},
				error : function(data) {
					alert('작업 중 오류가 발생하였습니다.');
					console.trace(data);
				},
				complete : function(xhr, textStatus) {
					$.unblockUI();
				}
			});
		});
	},


	findReceivers : function(seqSmsHistory) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'GET',
				contentType : 'application/json;charset=UTF-8',
				url : `/sms/receivers/${seqSmsHistory}`,
				dataType : 'json',
				success : function(returnData) {
					try {
						resolve(returnData);
					} catch (ex) {
						alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				},
				error : function(data) {
					alert('작업 중 에러가 발생하였습니다.');
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
			})
		})
	}
};