const ticketController = {
	usageList : {
		appointment : function(seqPassInfo) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/manager/member/appointment-schedule/pass/" + seqPassInfo,
					type		: "get",
					contentType : "application/x-www-form-urlencoded; charset=utf-8",
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
		class : function(seqPassInfo) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/manager/member/class-schedule/pass/" + seqPassInfo,
					type		: "get",
					contentType : "application/x-www-form-urlencoded; charset=utf-8",
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
		}
	},
	changePeriod : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/manager/member/changeNumDate",
				type		: "post",
				contentType : "application/x-www-form-urlencoded; charset=utf-8",
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
	reserveList : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/manager/member/selectPaymentPassReserveList",
				type		: "post",
				contentType : "application/x-www-form-urlencoded; charset=utf-8",
				dataType	: "json",
				data 		: data,
				success 	: function(data) {
					if(data.RESULT == "SUCCESS" || data.RESULT_CODE == "000")
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
	infoBatchReserve : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/product-usage/ajax/info-for-batch-reserve-pass-info",
				type		: "post",
				contentType : "application/json; charset=utf-8",
				dataType	: "json",
				data 		: JSON.stringify(data),
				success 	: function(data) {
					if(data.result == "SUCCESS" || data.resultCode == "000")
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
	checkin : function(data) {
		const url = "/checkin/" + data.checkinType.toLowerCase();
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: url,
				type		: "post",
				contentType : "application/json; charset=utf-8",
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
	appointment : {
		// params : seqPartnerPaymentPass
		coachList : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/manager/payment-pass/changeAppointmentCoach/form",
					type		: "post",
					contentType : "application/x-www-form-urlencoded; charset=utf-8",
					dataType	: "json",
					data 		: JSON.stringify(data),
					success 	: function(data) {
						if(data.RESULT == "SUCCESS" || data.RESULT_CODE == "000")
							resolve(data.DATA);
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

		// params : seqPartnerPaymentPass, seqPartnerCoach
		coachChange : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/member/" + data.seqMember + "/pass/" + data.seqPassInfo + "/changeCoach",
					type		: "PATCH",
					contentType : "application/json; charset=utf-8",
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

		/*
			params = {
				seqSchedule, seqPartner, seqMember, seqCoach, seqPayment,
				startDate(yyyy-mm-dd hh:mm), endDate(yyyy-mm-dd hh:mm),
				scheduleId, nowState, scheduleState, voucherMinusYn
			}
		*/
		ticketInfo : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/manager/schedule/promise/json/detailPromiseScheduleTicket",
					type		: "post",
					contentType : "application/x-www-form-urlencoded; charset=utf-8",
					dataType	: "json",
					data 		: data,
					success 	: function(data) {
						if(data.usageProductInfo)
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
		ticketUpdate : function(data, isLimit) {
			const url = (isLimit != false) ? "/manager/schedule/promise/updatePromiseSchedule" :
				"/manager/schedule/promise/change/schedule-state/out-of-weekly-limit";
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: url,
					type		: "patch",
					contentType : "application/json; charset=utf-8",
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
	},
	class : {
		ticketInfo : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/manager/schedule/class/json/selectTicketInfo",
					type		: "post",
					contentType : "application/x-www-form-urlencoded; charset=utf-8",
					dataType	: "json",
					data 		: data,
					success 	: function(data) {
						if(data.usageProductInfo)
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
		ticketUpdate : function(data, isLimit) {
			const url = (isLimit != false) ? "/manager/schedule/class/change" :
				"/manager/schedule/class/change/out-of-weekly-limit";
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: url,
					type		: "patch",
					contentType : "application/json; charset=utf-8",
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
		ticketReserve : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/schedule/ajax/bulk-class-schedule-reservation",
					type		: "post",
					contentType : "application/json; charset=utf-8",
					dataType	: "json",
					data 		: JSON.stringify(data),
					success 	: function(data) {
						if(data.result == "SUCCESS" || data.resultCode == "000")
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
		ticketReserveByPassInfo : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/schedule/ajax/bulk-class-schedule-reservation-pass-info",
					type		: "post",
					contentType : "application/json; charset=utf-8",
					dataType	: "json",
					data 		: JSON.stringify(data),
					success 	: function(data) {
						if(data.result == "SUCCESS" || data.resultCode == "000")
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
};
