const CommonController = {
	upload : function(form, cbFunc) {
		$.ajax({
			url : '/manager/common/imageUpload',
			data : form,
			dataType : 'json',
			processData : false,
			contentType : false,
			type : 'POST',
			success : function(data) {
				if (data.result === 'success') {
					if (typeof cbFunc === 'function') {
						cbFunc(data);
					}
					
				} else {
					alert('파일 업로드중 오류가 발생하였습니다.');
				}
			},
			error : function(response) {
				alert('파일 업로드 실패');
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
	}
};