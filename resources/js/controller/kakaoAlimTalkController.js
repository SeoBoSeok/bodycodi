const kakaoAlimTalkController = {
	send : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'POST',
				contentType : 'application/json;charset=UTF-8',
				url : `/kakao-alim-talk/send`,
				dataType : 'json',
				data : JSON.stringify(data),
				statusCode : {
					200 : (responseData) => {
						try {
							resolve(responseData);
						} catch (ex) {
							alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
							console.trace(ex);
							$.unblockUI();
						}
					}
				},
				error : function(request, status, error) {
					if (request.status === 409) {
						alert(request.responseText);
					} else {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(data);
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
			})
		})
	},


	authProfile : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'GET',
				contentType : 'application/x-www-form-urlencoded',
				url : `/kakao-alim-talk/authProfile`,
				dataType : 'json',
				data : data,
				statusCode : {
					200 : function() {
						try {
							resolve();
						} catch (ex) {
							alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
							console.trace(ex);
							$.unblockUI();
						}
					}
				},
				error : function(request) {
					if (request.status === 409) {
						alert(request.responseText);
					} else {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(data);
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
			})
		})
	},


	addProfile : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'POST',
				contentType : 'application/json;charset=UTF-8',
				url : `/kakao-alim-talk/addProfile`,
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
					}
				},
				error : function(request) {
					if (request.status === 409) {
						alert(request.responseText);
					} else {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(data);
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
			})
		})
	},


	findSender : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'GET',
				contentType : 'application/json;charset=UTF-8',
				url : `/kakao-alim-talk/findSender`,
				dataType : 'json',
				statusCode : {
					200 : function(responseData) {
						try {
							resolve(responseData);
						} catch (ex) {
							alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
							console.trace(ex);
							$.unblockUI();
						}
					},
					204 : () => {
						try {
							resolve();
						} catch (ex) {
							alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
							console.trace(ex);
							$.unblockUI();
						}
					}
				},
				error : function(request, status, error) {
					if (request.status === 409) {
						alert(request.responseText);
					} else {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(data);
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
			})
		})
	},


	addTemplate : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'POST',
				contentType : 'application/json;charset=UTF-8',
				url : `/kakao-alim-talk/addTemplate`,
				dataType : 'json',
				data : JSON.stringify(data),
				statusCode : {
					200 : (responseData) => {
						try {
							resolve(responseData);
						} catch (ex) {
							alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
							console.trace(ex);
							$.unblockUI();
						}
					}
				},
				error : function(request) {
					if (request.status === 409) {
						alert(request.responseText);
					} else {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(request);
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
			})
		})
	},


	requestTemplate : function(seqKakaoAlimTalkTemplate) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'GET',
				contentType : 'application/x-www-form-urlencoded',
				url : `/kakao-alim-talk/requestTemplate/${seqKakaoAlimTalkTemplate}`,
				dataType : 'json',
				statusCode : {
					204 : () => {
						try {
							resolve();
						} catch (ex) {
							alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
							console.trace(ex);
							$.unblockUI();
						}
					}
				},
				error : function(request) {
					if (request.status === 409) {
						alert(request.responseText);
					} else {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(request);
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
			})
		})
	},


	findTemplates : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'GET',
				contentType : 'application/json;charset=UTF-8',
				url : `/kakao-alim-talk/templates`,
				dataType : 'json',
				data : data,
				statusCode : {
					200 : (responseData) => {
						try {
							resolve(responseData);
						} catch (ex) {
							alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
							console.trace(ex);
							$.unblockUI();
						}
					},
					204 : () => {
						try {
							resolve();
						} catch (ex) {
							alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
							console.trace(ex);
							$.unblockUI();
						}
					}
				},
				error : function(request) {
					if (request.status === 409) {
						alert(request.responseText);
					} else {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(data);
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
			})
		})
	},


	findTemplateByKakaoAlimTalkTemplate : function(seqKakaoAlimTalkTemplate) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'GET',
				contentType : 'application/json;charset=UTF-8',
				url : `/kakao-alim-talk/template/${seqKakaoAlimTalkTemplate}`,
				dataType : 'json',
				statusCode : {
					200 : (returnData) => {
						try {
							resolve(returnData);
						} catch (ex) {
							alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
							console.trace(ex);
							$.unblockUI();
						}
					}
				},
				error : function(request) {
					if (request.status === 409) {
						alert(request.responseText);
					} else {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(data);
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
			})
		})
	},


	modifyTemplate : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'PATCH',
				contentType : 'application/json;charset=UTF-8',
				url : `/kakao-alim-talk/template/modify`,
				dataType : 'json',
				data : JSON.stringify(data),
				statusCode : {
					204 : () => {
						try {
							resolve();
						} catch (ex) {
							alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
							console.trace(ex);
							$.unblockUI();
						}
					}
				},
				error : function(request) {
					if (request.status === 409) {
						alert(request.responseText);
					} else {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(data);
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
			})
		})
	},


	deleteTemplate : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'PATCH',
				contentType : 'application/json;charset=UTF-8',
				url : `/kakao-alim-talk/template/delete`,
				dataType : 'json',
				data : JSON.stringify(data),
				statusCode : {
					204 : () => {
						try {
							resolve();
						} catch (ex) {
							alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
							console.trace(ex);
							$.unblockUI();
						}
					}
				},
				error : function(request) {
					if (request.status === 409) {
						alert(request.responseText);
					} else {
						alert('작업 중 오류가 발생하였습니다.');
						console.trace(data);
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
			})
		})
	},


	category : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'GET',
				contentType : 'application/json;charset=UTF-8',
				url : `/kakao-alim-talk/category`,
				dataType : 'json',
				statusCode : {
					200 : function(returnData) {
						try {
							resolve(returnData);
						} catch (ex) {
							alert('작업을 완료했으나 스크립트에 오류가 있습니다.');
							console.trace(ex);
							$.unblockUI();
						}
					}
				},
				error : function(request) {
					if (request.status === 409) {
						alert(request.responseText);
					} else {
						alert('작업 중 오류가 발생하였습니다.');
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
			})
		})
	}
};