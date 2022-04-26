const serviceController = {
	normal : {
		list : function(data, isDisplay) {
			if(isDisplay) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/services/available/list",
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
			} else {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/services/normal/list.php",
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
			}
		},
		detail : function(seqService) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: `/services/normal/detail.php?seqService=${seqService}`,
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
					url			: "/services/normal/create.php",
					type		: "post",
					contentType : "application/json;charset=utf-8",
					data		: JSON.stringify(data),
					async: true,
					dataType: "json",
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
		update : function(seqService, data, isBatch) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/services/normal/" + seqService + ((isBatch) ? "?isBatch=true" : ""),
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
		remove : function(seqService) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/services/normal/" + seqService,
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
		}
	},
	package : {
		list : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/services/package/list.php",
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
		detail : function(seqPackage) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/services/package/" + seqPackage + "/detail",
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
					url			: "/services/package/create",
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
		update : function(seqPackage, data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/services/package/" + seqPackage,
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
		remove : function(seqPackage) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/services/package/" + seqPackage,
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
	},

	// 아래는 테스트를 위한 임시 코드 (getList, getDetail)
	getList : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/tickets/all",
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

	// 서비스 상세 정보를 가져온다.
	getDetail : function(type, sequence) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/tickets/" + sequence + "/types/" + type.toUpperCase(),
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

	place : {
		// 장소 스케줄 데이터를 수정한다.
		updateSchedule : function(seqPartnerPlace, data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/place/schedule_insert/?cn=" + seqPartnerPlace,
					type		: "post",
					contentType : "application/json;charset=utf-8",
					data		: JSON.stringify(data),
					dataType	: "json",
					success 	: function(data) {
						if(data.result == "ok")
							resolve(data);
						else
							reject(data);
					},
					error		: function(data) {
						reject(data);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},

		// 장소 스케줄 데이터를 삭제한다.
		removeSchedule : function(seqPartnerPlaceSchedule) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/place/schedule_delete/?seqPartnerPlaceSchedule=" + seqPartnerPlaceSchedule,
					type		: "post",
					contentType : "application/json;charset=utf-8",
					success 	: function(data) {
						if(data.result == "ok")
							resolve(data);
						else
							reject(data);
					},
					error		: function(data) {
						reject(data);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},

		// 장소 휴일 데이터를 수정한다.
		updateHoliday : function(seqPartnerPlace, data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/place/holiday_insert?cn=" + seqPartnerPlace,
					type		: "post",
					contentType : "application/x-www-form-urlencoded",
					data		: data + ",",
					success 	: function(data) {
						if(data.result == "ok")
							resolve(data);
						else
							reject(data);
					},
					error		: function(data) {
						reject(data);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},
	},

	class : {
		// 그룹수업 휴일 데이터를 수정한다.
		updateHoliday : function(seqPartnerClass, data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/lesson/holiday_insert?cn=" + seqPartnerClass,
					type		: "post",
					contentType : "application/x-www-form-urlencoded",
					data		: data + ",",
					dataType	: "json",
					success 	: function(data) {
						if(data.result == "ok")
							resolve(data);
						else
							reject(data);
					},
					error		: function(data) {
						reject(data);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},

		updateReservation : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/reservationsetting/insert",
					type		: "post",
					contentType : "application/x-www-form-urlencoded",
					data		: data,
					dataType	: "json",
					success 	: function(data) {
						if(data.result == "ok")
							resolve(data);
						else
							reject(data);
					},
					error		: function(data) {
						reject(data);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},
	}
};

const pricingController = {
	list : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/services/pricing/list.php",
				type		: "get",
				contentType : "application/json;charset=utf-8",
				data		: data,
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
	detail : function(seqPricing) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/services/pricing/" + seqPricing,
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
				url			: "/services/pricing/create.php",
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
	update : function(seqPricing, data, isBatch) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/services/pricing/" + seqPricing + ((isBatch) ? "?isBatch=true" : ""),
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
	remove : function(seqPricing) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/services/pricing/" + seqPricing,
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

	// 아래는 테스트를 위한 임시 코드
	getList : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/products/all",
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

	getDetail : function(id) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/products/" + id,
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
};

const orderController = {
	passList : function(seqMember, isCoupon) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/order/pass/list" + ((isCoupon) ? "?type=coupon" : ""),
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
	passAdd : function(seqMember, data, orderType, passType, passList) {
		let url = "/member/" + seqMember + "/order/pass/add?orderType=" + (orderType || "");
		if(orderType == "upgrade") url += "&upgradeType=" + passType;
		else if(orderType == "cross") {
			// if(!Array.isArray(passList)) passList = [passList];
			// passList = passList.map(item => {
			// 	return "&seqPassInfo=" + item;
			// }).join("");
			// url += "&crossType=" + passType + passList;
			url += "&crossType=" + passType;
		}

		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: url,
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
	discountApply : function(seqMember, data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/order/discount/apply",
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
	discountModifyApply : function(seqMember, seqOrderInfo, data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/order/" + seqOrderInfo + "/discount/modify",
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
	payment : function(seqMember, data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/order/payment",
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

	refundApply : function(seqMember, seqOrderInfo, data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/order/" + seqOrderInfo + "/refund/pass",
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
	refundModifyApply : function(seqMember, seqOrderInfo, seqRefundInfo, data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/order/" + seqOrderInfo + "/refund/" + seqRefundInfo + "/pass",
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

	orderInfo : function(seqMember, seqOrderInfo) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/order/" + seqOrderInfo,
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
	orderPassInfo : function(seqMember, seqOrderInfo) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/orderInfo/" + seqOrderInfo + "/pass",
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
	modifyInfo : function(seqMember, seqOrderInfo, isCoupon) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/order/" + seqOrderInfo + "/modify/info" + ((isCoupon) ? "?type=coupon" : ""),
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
	upgradeInfo : function(seqMember, passList, serviceCategory) {
		if(!Array.isArray(passList)) passList = [passList];
		passList = passList.map(item => {
			return "&seqPassInfo=" + item;
		}).join("");
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/order/upgrade/pass?serviceCategory=" + serviceCategory + passList,
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
	crossInfo : function(seqMember, passList, crossType) {
		if(!Array.isArray(passList)) passList = [passList];
		passList = passList.map(item => {
			return "&seqPassInfo=" + item;
		}).join("");
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/order/cross/pass?crossType=" + crossType + passList,
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
	receivableInfo : function(seqMember, seqOrderInfo) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/order/" + seqOrderInfo + "/receivable/info",
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
	refundInfo : function(seqMember, seqOrderInfo) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/order/" + seqOrderInfo + "/refund/info",
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
	refundModifyInfo : function(seqMember, seqOrderInfo, seqRefundInfo) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/order/" + seqOrderInfo + "/refund/" + seqRefundInfo + "/modify/info",
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
	receivablePayment : function(seqMember, seqOrderInfo, data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/order/" + seqOrderInfo + "/receivable",
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
	cancel : function(seqMember, seqOrderInfo) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/order/" + seqOrderInfo + "/cancel",
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
	},
	modifyPayment : function(seqMember, seqOrderInfo, data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/order/" + seqOrderInfo + "/modify",
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
	modifyOrderPayment : function(seqMember, seqOrderPayment, data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/payment/" + seqOrderPayment,
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
	refundPayment : function(seqMember, seqOrderInfo, data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/order/" + seqOrderInfo + "/refund/payment",
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
	refundModifyPayment : function(seqMember, seqOrderInfo, seqRefundInfo, data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/order/" + seqOrderInfo + "/refund/" + seqRefundInfo + "/payment",
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
	refundCancel : function(seqMember, seqOrderInfo, seqRefundInfo) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/order/" + seqOrderInfo + "/refund/" + seqRefundInfo + "/cancel",
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
	},
	oldOrderList : function(seqMember) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/order/list",
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
	oldPaymentList : function(seqMember) {
		return new Promise(function(resolve, reject) {
			orderController.oldOrderList(seqMember).then(orderList => {
				const paymentList = [];
				orderList.filter(item => {
					return (item.useYn != "N" && item.orderStatus == "COMPLETED");
				}).forEach(item => {
					const paymentName = item.orderName || "-";
					const orderType = item.orderType.toLowerCase();
					const orderClassification = item.orderClassification;
					const seqPartnerCoach = item.seqPartnerCoach;
					item.payments.forEach(item => {
						item.orderType = orderType;
						item.paymentName = paymentName;
						item.orderClassification = orderClassification;
						if(!item.seqPartnerCoach)
							item.seqPartnerCoach = seqPartnerCoach;
						paymentList.push(item);
					});
				});
				paymentList.sort(function(a, b) {
					const dateA = new Date(a.paymentDatetime).getTime();
					const dateB = new Date(b.paymentDatetime).getTime();
					return (dateA == dateB) ? 0 : (dateA < dateB) ? 1 : -1;
				});
				resolve(paymentList);
			}).catch(error => {
				reject(error);
			});
		});
	},

	transferInfo : function(seqMember, seqPassInfo) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/pass/" + seqPassInfo + "/transfer/summary",
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




	/* ---------------------------------------------------- */
	orderInfo : {
		list : function(seqMember) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/member/" + seqMember + "/orderInfo/list",
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
		summary : function(seqMember) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/member/" + seqMember + "/orderInfo/summary",
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
		info : function(seqMember, seqOrderInfo) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/member/orderInfo/info/?" + `seqMember=${seqMember}&seqOrderInfo=${seqOrderInfo}`,
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
		update : function(seqMember, seqOrderInfo, data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/member/" + seqMember + "/order/" + seqOrderInfo,
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
		}
	},
	paymentInfoList : function(seqMember) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/paymentInfo/list" + `?seqMember=${seqMember}`,
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

	refundInfoList : function(seqMember, seqPassInfo) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/refundInfo/list" + ((seqPassInfo) ? "?seqPassInfo=" + seqPassInfo : ""),
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

	combineInfoList : function(seqMember, fromDate, toDate) {
		const query = (seqMember) ? "seqMember=" + seqMember : "paymentFromDate=" + fromDate + "&paymentToDate=" + toDate;
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/summary/payments?" + query,
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


	sell : {
		payment : {
			create : function(seqMember, data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/member/sell/payment/insert.php"+`?seqMember=${seqMember}`,
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
			update : function(seqMember, seqOrderInfo, data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/member/" + seqMember + "/sell/payment/" + seqOrderInfo,
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
		}
	}
};
