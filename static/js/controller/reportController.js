const reportController = {
	sales : {
		summaryInfo : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/summary/sales/report/detail",
					type		: "get",
					contentType : "application/json;charset=utf-8",
					data		: data,
					success 	: function(data) {
						resolve(data);
					},
					error		: function(data) {
						reject(data);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},
		combineList : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/summary/sales/report/combines",
					type		: "get",
					contentType : "application/json;charset=utf-8",
					data		: data,
					success 	: function(data) {
						resolve(data);
					},
					error		: function(data) {
						reject(data);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},
		orderList : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/summary/sales/report/orders",
					type		: "get",
					contentType : "application/json;charset=utf-8",
					data		: data,
					success 	: function(data) {
						resolve(data);
					},
					error		: function(data) {
						reject(data);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},
		refundList : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/summary/sales/report/refunds",
					type		: "get",
					contentType : "application/json;charset=utf-8",
					data		: data,
					success 	: function(data) {
						resolve(data);
					},
					error		: function(data) {
						reject(data);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},
		paymentList : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/summary/sales/report/payments",
					type		: "get",
					contentType : "application/json;charset=utf-8",
					data		: data,
					success 	: function(data) {
						resolve(data);
					},
					error		: function(data) {
						reject(data);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},
		summary : function(fromDate, toDate) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/summary/sales/report?fromDate=" + fromDate + "&toDate=" + toDate,
					type		: "get",
					contentType : "application/json;charset=utf-8",
					success 	: function(data) {
						resolve(data);
					},
					error		: function(data) {
						reject(data);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},
		detail : function(data) {
			// fromDate, toDate, seqPartnerCoaches, orderType, orderClassification, paymentType, orderName, memberName
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/summary/sales/report/detail",
					type		: "get",
					contentType : "application/json;charset=utf-8",
					data		: data,
					success 	: function(data) {
						resolve(data);
					},
					error		: function(data) {
						reject(data);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},
		receivableList : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/summary/sales/report/receivables",
					type		: "get",
					contentType : "application/json;charset=utf-8",
					data		: data,
					success 	: function(data) {
						resolve(data);
					},
					error		: function(data) {
						reject(data);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		}
	}
};