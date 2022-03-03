const AttrController = {
	selectList : function(data, cbFunc) {
		$.ajax({
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			url : '/attr/ajax/selectList',
			data : JSON.stringify(data),
			dataType : 'json',
			success : function(returnData) {
				if (returnData.result !== 'SUCCESS' || returnData.resultCode === '100') {
					alert('작업 중 오류가 발생하였습니다.\n관리자에게 문의하십시오.');
					return;
				}
				
				if (typeof cbFunc === 'function') {
					cbFunc(returnData);
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