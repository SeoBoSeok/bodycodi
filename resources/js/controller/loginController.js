const LoginController = {
	changeLogin : function(dataParam) {
		$.ajax({
			type : 'POST',
			contentType: "application/x-www-form-urlencoded",
			dataType : 'json',
			url : '/common/login_change',
			data : dataParam,
			success : function(data) {
				if (data.result === 'ok') {
					$("#loginId").html(data.employeeName);
					$("#user_img").attr("src", imageVal(data.imageFile, data.sex));
					$(".user").fadeOut(300);
					
					location.href = '/home';
				}
			},
			error : function(data) {
				alert('작업 중 에러가 발생하였습니다.');
				console.log(data);
			}
		});
	}
};