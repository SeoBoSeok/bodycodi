const discountCouponController = {
	getAvailableList : function(seqMember, orderType, price) {
		if(!orderType) orderType = "pass";
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/sell/coupons/available?orderType=" + orderType + "&price=" + price,
				type		: "get",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
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
	list : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/coupon/discount/list",
				type		: "get",
				data		: data,
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
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
	detail : function(seqDiscountCoupon) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/coupon/discount/" + seqDiscountCoupon + "/detail",
				type		: "get",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
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
	create : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/coupon/discount/create",
				type		: "post",
				contentType : "application/json;charset=utf-8",
				data		: JSON.stringify(data),
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
	update : function(seqDiscountCoupon, data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/coupon/discount/" + seqDiscountCoupon,
				type		: "patch",
				contentType : "application/json;charset=utf-8",
				data		: JSON.stringify(data),
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
	remove : function(seqDiscountCoupon) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/coupon/discount/" + seqDiscountCoupon,
				type		: "delete",
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
	change : {
		discountYn : function(seqDiscountCoupon, discountYn) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/coupon/discount/" + seqDiscountCoupon + "/" + discountYn,
					type		: "patch",
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
		}
	},
	bpay : {
		list : function(page, count, data) {
			if(!page) page = 1;
			if(!count) count = 10;
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/b-pay/coupon/list?page=" + page + "&pageSize=" + count,
					type		: "post",
					contentType : "application/json;charset=utf-8",
					dataType	: "json",
					data		: JSON.stringify(data),
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
		availableList : function() {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/b-pay/coupon/policy/list",
					type		: "get",
					contentType : "application/json;charset=utf-8",
					dataType	: "json",
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
		info : function(id) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/b-pay/coupon/policy/" + id + "/info",
					type		: "get",
					contentType : "application/json;charset=utf-8",
					dataType	: "json",
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
		create : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/b-pay/coupon/create",
					type		: "post",
					contentType : "application/json;charset=utf-8",
					data		: JSON.stringify(data),
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
		change : {
			validYn : function(id, validYn) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/b-pay/coupon/" + id + "/change",
						type		: "patch",
						contentType : "application/json;charset=utf-8",
						data		: JSON.stringify({
							vldYn : validYn
						}),
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
		},
		publish : function(page, count, data, id) {
			if(!page) page = 1;
			if(!count) count = 10;
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/b-pay/coupon/publish/" + id + "/list?page=" + page + "&pageSize=" + count,
					type		: "post",
					contentType : "application/json;charset=utf-8",
					dataType	: "json",
					data		: JSON.stringify(data),
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
		sendPublish : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/b-pay/coupon/publish/send",
					type		: "post",
					contentType : "application/json;charset=utf-8",
					data		: JSON.stringify(data),
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