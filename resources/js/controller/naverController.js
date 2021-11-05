const naverController = {
	getInfo : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/partner/naver/business",
				type		: "get",
				contentType : "application/json;charset=utf-8",
				success 	: function(data) {
                    resolve(data);
				},
				error		: function(data) {
					reject(data)
				},
				beforeSend : uiBlock,
				complete : uiUnblock
			});
		});
	},

	putInfo : function(data, id) {
		data = JSON.stringify(data);
		let url = "/partner/naver/business";
		if(id) url += "/" + id;
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: url,
				type		: "post",
				contentType : "application/json;charset=utf-8",
				data		: data,
				success 	: function(data) {
                    resolve(data);
				},
				error		: function(data) {
					reject(data)
				},
				beforeSend : uiBlock,
				complete : uiUnblock
			});
		});
	},

	imageUpload : function(formData) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url : "/naver/imageUpload",
				type : "post",
				enctype: "multipart/form-data",
				contentType: false,
				processData : false,
				data : formData,
				success 	: function(data) {
                    resolve(data);
				},
				error		: function(data) {
					reject(data)
				},
				beforeSend : uiBlock,
				complete : uiUnblock
			});
		});
	},

	/*
	 * fromDate : YYYY-MM-DD
	 * toDate : YYYY-MM-DDD
	 * searchType : SCHEDULE | CONFIRMED | CANCELLED
	 */
	getBookingList : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/partner/naver/booking/list",
				type		: "get",
				contentType : "application/json;charset=utf-8",
				data		: data,
				dataType	: "json",
				success 	: function(data) {
					resolve(data);
				},
				error		: function(data) {
					reject(data)
				},
				beforeSend : uiBlock,
				complete : uiUnblock
			});
		});
	},

	/*
	 * fromDate : YYYY-MM-DD
	 * toDate : YYYY-MM-DDD
	 * searchType : PAYCOMPLETED | COMPLETED
	 */
	getAccountingList : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/partner/naver/accounting/list",
				type		: "get",
				contentType : "application/json;charset=utf-8",
				data		: data,
				dataType	: "json",
				success 	: function(data) {
					resolve(data);
				},
				error		: function(data) {
					reject(data)
				},
				beforeSend : uiBlock,
				complete : uiUnblock
			});
		});
	},

	setAgree : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/partner/naver/agree",
				type		: "patch",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				success 	: function(data) {
					resolve(data);
				},
				error		: function(data) {
					reject(data)
				},
				beforeSend : uiBlock,
				complete : uiUnblock
			});
		});
	}
}
