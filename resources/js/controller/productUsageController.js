const productUsageController = {
	infoForBatchReserve : function(data, cbFunc) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				type : 'POST',
				contentType : 'application/json;charset=UTF-8',
				url : '/product-usage/ajax/info-for-batch-reserve',
				data : JSON.stringify(data),
				dataType : 'json',
				success : function(returnData) {
					if (returnData.result !== 'SUCCESS' || returnData.resultCode !== '000') {
						alert('작업 중 에러가 발생하였습니다.');
						return;
					}


					try {
						resolve(returnData);

					} catch (ex) {
						alert('작업 중 에러가 발생하였습니다.');
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


	selectListByPayment : function(data, cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			url : '/product-usage/ajax/list/payment',
			data : JSON.stringify(data),
			dataType : 'json',
			success : function(returnData) {
				if (returnData.result !== 'SUCCESS' || returnData.resultCode !== '000') {
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


	updatePause : function(data, cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			url : '/product-usage/ajax/updatePause',
			data : JSON.stringify(data),
			dataType : 'json',
			success : function(returnData) {
				if (returnData.result !== 'SUCCESS' || returnData.resultCode !== '000') {
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
	}
};
