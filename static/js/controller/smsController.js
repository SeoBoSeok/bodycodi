const smsController = {
	send : {
		list : function(data) {
			if(data) {
				data.startDate = data.startDate.replace(/-/g, ".");
				data.endDate = data.endDate.replace(/-/g, ".");
			}
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/sms/send/list",
					type		: "get",
					contentType : "application/json;charset=utf-8",
					dataType	: "json",
					data 		: data,
					success 	: function(data) {
						resolve(data);
					},
					error		: function(error) {
						reject(error);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},
	},
	charge : {
		info : function() {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/sms/charge/info",
					type		: "get",
					contentType : "application/json;charset=utf-8",
					dataType	: "json",
					success 	: function(data) {
						resolve(data);
					},
					error		: function(error) {
						reject(error);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},
		list : function() {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/sms/charge/list",
					type		: "get",
					contentType : "application/json;charset=utf-8",
					dataType	: "json",
					success 	: function(data) {
						resolve(data);
					},
					error		: function(error) {
						reject(error);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},
		payment : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/sms/payment_insert",
					type		: "post",
					contentType : "application/x-www-form-urlencoded",
					dataType	: "json",
					data 		: data,
					success 	: function(data) {
						if(data.result == "ok")
							resolve(data);
						else
							reject(data);
					},
					error		: function(error) {
						reject(error);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		}
	},
	auto : {
		list : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/sms/auto-send",
					type		: "get",
					contentType : "application/json;charset=utf-8",
					dataType	: "json",
					data 		: JSON.stringify(data),
					success 	: function(data) {
						resolve(data);
					},
					error		: function(error) {
						reject(error);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},
		update : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/sms/auto_insert",
					type		: "post",
					contentType : "application/json;charset=utf-8",
					dataType	: "json",
					data		: JSON.stringify(data),
					success 	: function(data) {
						if(data.result == "ok")
							resolve(data);
						else
							reject(error);
					},
					error		: function(error) {
						reject(error);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		}
	},
	sender : {
		list : function() {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/sms/sender/list",
					type		: "get",
					contentType : "application/json;charset=utf-8",
					dataType	: "json",
					success 	: function(data) {
						resolve(data);
					},
					error		: function(error) {
						reject(error);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},
		create : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/sms/sender_insert",
					type		: "post",
					contentType : "application/x-www-form-urlencoded",
					dataType	: "json",
					data 		: data,
					success 	: function(data) {
						if(data.code == "ok" || data.code == "AlreadyExists")
							resolve(data);
						else
							reject(data);
					},
					error		: function(error) {
						reject(error);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},
		remove : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/sms/deleteSmsSender",
					type		: "post",
					contentType : "application/x-www-form-urlencoded",
					dataType	: "json",
					data 		: data,
					success 	: function(data) {
						if(data.result == "ok")
							resolve(data);
						else
							reject(data);
					},
					error		: function(error) {
						reject(error);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},
	},
	history : {
		list : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/sms/history/list",
					type		: "get",
					contentType : "application/json;charset=utf-8",
					dataType	: "json",
					data		: data,
					success 	: function(data) {
						resolve(data);
					},
					error		: function(error) {
						reject(error);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},
	},
	getReceiver : function(seqSmsHistory) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/sms/receivers/" + seqSmsHistory,
				type		: "get",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				success 	: function(data) {
					resolve(data);
				},
				error		: function(error) {
					reject(error);
				},
				beforeSend	: uiBlock,
				complete	: uiUnblock
			});
		});
	},
	getSender : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/sms/ajax/sender",
				type		: "post",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				data 		: JSON.stringify(data),
				success 	: function(data) {
					resolve(data);
				},
				error		: function(error) {
					reject(error);
				},
				beforeSend	: uiBlock,
				complete	: uiUnblock
			});
		});
	},

	sendSms : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/sms/send-to-member",
				type		: "post",
				contentType : false,
				processData : false,
				dataType	: "json",
				data 		: data,
				success 	: function(data) {
					resolve(data);
				},
				error		: function(error) {
					reject(error);
				},
				beforeSend	: uiBlock,
				complete	: uiUnblock
			});
		});
	},

	getRemainCount : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/sms/remain-cnt",
				type		: "get",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				data 		: JSON.stringify(data),
				success 	: function(data) {
					resolve(data);
				},
				error		: function(error) {
					reject(error);
				},
				beforeSend	: uiBlock,
				complete	: uiUnblock
			});
		});
	}
};
