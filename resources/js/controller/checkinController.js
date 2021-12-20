const CheckinController = {
	isProcess : false,
	checkin : function(data, cbFunc) {
		if (this.isProcess) return;
		this.isProcess = true;

		const url = "/checkin/" + data.checkinType.toLowerCase();

		$.ajax({
			type : 'POST',
			contentType : 'application/json;charset=UTF-8',
			url : url,
			data : JSON.stringify(data),
			dataType : 'json',
			success : function(returnData) {
				if (typeof cbFunc === 'function') {
					try{
						cbFunc(returnData);
					} catch (e) {
						console.trace(e);
						alert("결과 처리 중 오류가 발생 하였습니다. 데스크에 문의 해주세요.");
					}
				}
			},
			error : function(data) {
				alert('작업 중 에러가 발생하였습니다.');
				console.trace(data);
			},
			beforeSend : function(xhr) {
				$.blockUI({
					message : '<h5 style="padding-top: 15px">입장처리 중 입니다.</h5>',
					css : {
						'height' : '50px',
						'z-index' : 2010
					}
				});
			},
			complete : function(xhr, textStatus) {
				CheckinController.isProcess = false;
				$.unblockUI();
			}
		});
	},
	selectPass : function(data, cbFunc) {
		console.log(data);
	},
	entrance : function(data, dbFunc) {
		console.log(data);
	}
};
