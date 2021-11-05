const permissionController = {
	getList : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/permission/ajax/get",
				type		: "post",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				success 	: function(data) {
   	                resolve(data);
				},
				error		: function(data) {
					reject(data)
				}
			});
		});
	},
	info : function(seqPartnerCoach) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/permission/ajax/select?seqPartnerCoach=" + seqPartnerCoach,
				type		: "get",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				success 	: function(data) {
					resolve(data);
				},
				error		: function(data) {
					reject(data)
				}
			});
		});
	},
	update : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/permission/ajax/update",
				type		: "post",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				data		: JSON.stringify(data),
				success 	: function(data) {
					resolve(data);
				},
				error		: function(data) {
					reject(data)
				}
			});
		});
	}
}
