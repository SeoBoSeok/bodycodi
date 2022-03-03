const MemberProspectiveController = {
	delete : function(data, cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			url : '/sales/member-prospective/delete',
			data : JSON.stringify(data),
			context : this,
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
				} else {
					location.reload();
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
	selectInfo : function(data, cbFunc) {
		$.ajax({
			type : 'GET',
			url : '/sales/member-prospective/info/' + data,
			context : this,
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
		});
	},
	select : function (data, cbFunc) {
		$.ajax({
			type : 'GET',
			url : '/sales/member-prospective/' + data,
			context : this,
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
		});
	},
	save : function (data, cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			url : '/sales/member-prospective/save',
			data : JSON.stringify(data),
			context : this,
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
				} else {
					alert("저장되었습니다.");
					location.reload();
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
	updateManagerAssignment : function(data, cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			url : '/sales/member-prospective/updateManagerAssignment',
			data : JSON.stringify(data),
			context : this,
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
				console.log(data);
				if (typeof cbFunc === 'function') {
					cbFunc(data);
				} else {
					alert("저장되었습니다.");
					location.reload();
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

	updateMember : function(data, cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			url : '/sales/member-prospective/updateMember',
			data : JSON.stringify(data),
			context : this,
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
					cbFunc(data);
				} else {
					alert("저장되었습니다.");
					location.reload();
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

	memberCreateAfterInsert : function(data, cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			url : '/sales/member-prospective/after-insert/' + data,
			context : this,
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
				} else {
					alert("저장되었습니다.");
					location.reload();
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

	memberSelectByMobile : function(data, cbFunc) {
		$.ajax({
			type : 'GET',
			contentType : 'application/json;charset=UTF-8',
			url : '/sales/member-prospective/memberSelectByMobile/' + data,
			context : this,
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
		});
	},

	inbound : function(data, cbFunc) {
		$.ajax({
			type : 'GET',
			contentType : 'application/json;charset=UTF-8',
			url : '/sales/member-prospective/inbound/' + data.seqMemberProspective + '/' + data.inboundState,
			context : this,
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
		});
	},

	checkValidate : function(data) {
		if (data.find('input[name="inboundState"]:checked').length < 1) {
			alert("유입상태를 체크해 주세요.");
			return false;
		}

		if (data.find('input[name="name"]').val() === '') {
			alert('회원명을 입력해주세요');
			return false;
		}


		const mobile1 = data.find('input[name="mobile1"]').val();
		const mobile2 = data.find('input[name="mobile2"]').val();
		const mobile3 = data.find('input[name="mobile3"]').val();
		if (mobile1 === '' || mobile2 === '' || mobile3 === '') {
			alert('휴대전화번호를 입력해주세요');
			return false;
		}

		return true;
	},
};
