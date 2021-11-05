const MemberController = {
	registForm : function(cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			url : '/member/ajax/regist/form',
			data : JSON.stringify({}),
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
				if (returnData.result !== 'SUCCESS') {
					alert('작업 중 에러가 발생하였습니다.');
					return;
				}
				
				if (returnData.resultCode !== '000') {
					alert('작업 중 에러가 발생하였습니다.');
					return;
				}
				
				if (typeof cbFunc === 'function') {
					cbFunc(returnData.data);
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
	
	
	selectByPk : function(dataParam, cbFunc) {
		$.ajax({
			type : 'POST',
			url : '/member/ajax/select',
			data : JSON.stringify(dataParam),
			dataType : 'json',
			contentType : 'application/json;charset=UTF-8',
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
				if (returnData.result !== 'SUCCESS' || returnData.resultCode === '100') {
					alert('작업 중 에러가 발생하였습니다.');
					return;
				}
				
				if (typeof cbFunc === 'function') {
					try {
						cbFunc(returnData);
					} catch (ex) {
						alert('작업 중 에러가 발생하였습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				}
			},
			error : function(data) {
				alert('작업 중 에러가 발생하였습니다.');
				console.trace(data);
			},
			complete : function(xhr, textStatus) {
				$.unblockUI();
			}
		});
	},
	
	
	searchByNameOrMobile : function(searchWord, cbFunc) {
		$.ajax({
			type : 'POST',
			url : '/member/ajax/search/name-or-mobile',
			data : JSON.stringify({
				searchWord : searchWord
			}),
			dataType : 'json',
			contentType : 'application/json;charset=UTF-8',
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
				if (returnData.result !== 'SUCCESS') {
					alert('작업 중 에러가 발생하였습니다.');
					return;
				}
				
				if (returnData.resultCode !== '000') {
					alert('작업 중 에러가 발생하였습니다.');
					return;
				}
				
				
				if (typeof cbFunc === 'function') {
					try {
						cbFunc(returnData.data);
					} catch (error) {
						alert('작업 중 에러가 발생하였습니다.');
						console.trace(error);
						$.unblockUI();
					}
				}
			},
			error : function(data) {
				alert('작업 중 에러가 발생하였습니다.');
				console.trace(data);
			},
			complete : function(xhr, textStatus) {
				$.unblockUI();
			}
		});
	},
	
	
	searchByName : function(paramData, cbFunc) {
		$.ajax({
			type : 'POST',
			url : '/member/ajax/search/name',
			data : JSON.stringify(paramData),
			dataType : 'json',
			contentType : 'application/json;charset=UTF-8',
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
				if (returnData.result !== 'SUCCESS') {
					alert('작업 중 에러가 발생하였습니다.');
					return;
				}
				
				if (returnData.resultCode !== '000') {
					alert('작업 중 에러가 발생하였습니다.');
					return;
				}
				
				if (typeof cbFunc === 'function') {
					cbFunc(returnData.data);
				}
			},
			error : function(data) {
				alert('작업 중 에러가 발생하였습니다.');
				console.trace(data);
			},
			complete : function(xhr, textStatus) {
				$.unblockUI();
			}
		});
	},
	
	
	searchMobile : function(data, cbFunc) {
		$.ajax({
			type : 'POST',
			url : '/member/ajax/select/mobile',
			data : JSON.stringify(data),
			dataType : 'json',
			contentType : 'application/json;charset=UTF-8',
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
				if (returnData.result !== 'SUCCESS') {
					alert('작업 중 에러가 발생하였습니다.');
					return;
				}
				
				if (returnData.resultCode !== '000') {
					alert('작업 중 에러가 발생하였습니다.');
					return;
				}
				
				if (typeof cbFunc === 'function') {
					cbFunc(returnData.data);
				}
			},
			error : function(data) {
				alert('작업 중 에러가 발생하였습니다.');
				console.error(data);
			},
			complete : function(xhr, textStatus) {
				$.unblockUI();
			}
		});
	},
	
	
	checkUsableMobile : function(data, cbFunc) {
		$.ajax({
			type : 'POST',
			url : '/member/ajax/is-usable-mobile',
			data : JSON.stringify(data),
			dataType : 'json',
			contentType : 'application/json;charset=UTF-8',
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
				if (returnData.result !== 'SUCCESS' || returnData.resultCode === '100') {
					alert('작업 중 에러가 발생하였습니다.');
					return;
				}
				
				
				if (typeof cbFunc === 'function') {
					cbFunc(returnData);
				}
			},
			error : function(data) {
				alert('작업 중 에러가 발생하였습니다.');
				console.error(data);
			},
			complete : function(xhr, textStatus) {
				$.unblockUI();
			}
		});
	},
	checkUsableEntranceBarcode : function(data, cbFunc){
		$.ajax({
			type : 'POST',
			url : '/member/ajax/is-usable-entrance-barcode',
			data : JSON.stringify(data),
			dataType : 'json',
			contentType : 'application/json;charset=UTF-8',
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
				if (returnData.result !== 'SUCCESS' || returnData.resultCode === '100') {
					alert('작업 중 에러가 발생하였습니다.');
					return;
				}
				
				
				if (typeof cbFunc === 'function') {
					cbFunc(returnData);
				}
			},
			error : function(data) {
				alert('작업 중 에러가 발생하였습니다.');
				console.error(data);
			},
			complete : function(xhr, textStatus) {
				$.unblockUI();
			}
		});
	},
	
	generateMembershipNo : function(lastMobileNo, cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : "application/json; charset=UTF-8",
			url : '/member/ajax/generate-membershipNo',
			data : JSON.stringify({
				member : {
					membershipNo : lastMobileNo
				}
			}),
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
				if (returnData.result !== 'SUCCESS') {
					alert('작업 중 에러가 발생하였습니다.');
					return;
				}
				
				if (returnData.resultCode !== '000') {
					alert('작업 중 에러가 발생하였습니다.');
					return;
				}
				
				if (typeof cbFunc === 'function') {
					cbFunc(returnData.data);
				}
			},
			error : function(data) {
				alert('작업 중 에러가 발생하였습니다.');
				console.trace(data);
			},
			complete : function(xhr, textStatus) {
				$.unblockUI();
			}
		});
	},
	
	
	isUsableMembershipNo : function(data, cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			dataType : 'json',
			url : '/member/ajax/is-usable-membershipNo',
			data : JSON.stringify(data),
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
				if (returnData.result !== 'SUCCESS') {
					alert('작업 중 에러가 발생하였습니다.');
					return;
				}
				
				
				if (typeof cbFunc === 'function') {
					cbFunc(returnData);
				}
			},
			error : function(data) {
				console.error(data);
				alert('작업 중 오류가 발생하였습니다.\n관리자에게 문의하십시오.');
			},
			complete : function(xhr, textStatus) {
				$.unblockUI();
			}
		})
	},
	
	
	regist : function(data, cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			dataType : 'json',
			url : '/member/ajax/regist/advance',
			data : JSON.stringify(data),
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
				if (returnData.result !== 'SUCCESS' || returnData.resultCode !== '000') {
					alert('작업 중 에러가 발생하였습니다.');
					return;
				}
				
				
				if (typeof cbFunc === 'function') {
					cbFunc(returnData);
				}
			},
			error : function(data) {
				console.error(data);
				alert('저장 중 오류가 발생하였습니다.\n관리자에게 문의하십시오.');
			},
			complete : function(xhr, textStatus) {
				$.unblockUI();
			}
		});
	},
	
	
	update : function(data, cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			dataType : 'json',
			url : '/member/ajax/update',
			data : JSON.stringify(data),
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
				if (returnData.resultCode === '1101') {
					alert('회원 번호가 중복되어 사용할 수 없습니다.');
					return false;
				} else if (returnData.resultCode === '1102') {
					alert('휴대 번호가 중복되어 사용할 수 없습니다.');
					return false;
				}
				
				if (returnData.result !== 'SUCCESS' || returnData.resultCode !== '000') {
					alert('작업 중 에러가 발생하였습니다.');
					return false;
				}
				
				
				if (typeof cbFunc === 'function') {
					try {
						cbFunc(returnData);
					} catch (ex) {
						alert('작업 중 에러가 발생하였습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				}
			},
			error : function(data) {
				console.error(data);
				alert('저장 중 오류가 발생하였습니다.\n관리자에게 문의하십시오.');
			},
			complete : function(xhr, textStatus) {
				$.unblockUI();
			}
		});
	},
	
	
	updatePoint : function(data, cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			dataType : 'json',
			url : '/member/ajax/update/point',
			data : JSON.stringify(data),
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
				if (returnData.result !== 'SUCCESS' || returnData.resultCode !== '000') {
					alert('작업 중 에러가 발생하였습니다.');
					return false;
				}
				
				
				if (typeof cbFunc === 'function') {
					try {
						cbFunc(returnData);
					} catch (ex) {
						alert('작업 중 에러가 발생하였습니다.');
						console.trace(ex);
						$.unblockUI();
					}
				}
			},
			error : function(data) {
				console.error(data);
				alert('저장 중 오류가 발생하였습니다.\n관리자에게 문의하십시오.');
			},
			complete : function(xhr, textStatus) {
				$.unblockUI();
			}
		});
	},
	
	
	selectMemberForCounseling : function(data, cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			url : '/member/ajax/counseling',
			data : JSON.stringify(data),
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
				if (returnData.result !== 'SUCCESS') {
					alert('작업 중 에러가 발생하였습니다.');
					return;
				}
				
				if (returnData.resultCode !== '000') {
					alert('작업 중 에러가 발생하였습니다.');
					return;
				}
				
				if (typeof cbFunc === 'function') {
					cbFunc(returnData.data);
				}
			},
			error : function(data) {
				alert('작업 중 에러가 발생하였습니다.');
				console.trace(data);
			},
			complete : function(xhr, textStatus) {
				$.unblockUI();
			}
		});
	},
	selectMemberByPk : function(data,cbFunc){
		$.ajax({
			type : 'POST',
			contentType : 'application/json; charset=UTF-8',
			url : '/member/ajax/getEntranceBarcode',
			data : JSON.stringify(data),
			dataType : 'json',
			success : function(resultData) {
				if (typeof cbFunc === 'function') {
					try {
						cbFunc(resultData);
					} catch (ex) {
						alert('작업 중 에러가 발생하였습니다.');
						console.trace(ex);
						$.unblockUI();
					}
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
	},
	
	delete(data, cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : 'application/json; charset=UTF-8',
			url : '/manager/member/delete',
			data : JSON.stringify(data),
			dataType : 'json',
			success : function(resultData) {
				if (resultData.result !== 'SUCCESS') {
					alert('작업 중 에러가 발생하였습니다.');
					return;
				}
				
				
				if (typeof cbFunc === 'function') {
					try {
						cbFunc(resultData);
					} catch (ex) {
						alert('작업 중 에러가 발생하였습니다.');
						console.trace(ex);
						$.unblockUI();
					}
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
	}
	
};
