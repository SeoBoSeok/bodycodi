const lockerController = {
	assign : {
		update : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/myset/insert_locker_member",
					type		: "post",
					contentType : "application/x-www-form-urlencoded",
					dataType	: "json",
					data		: data,
					success 	: function(data) {
						if(data.result == "ok")
							resolve(data);
						else
							reject();
					},
					error		: function(data) {
						reject(data);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},
		exchange : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/myset/allocate-another",
					type		: "patch",
					contentType : "application/json;charset=utf-8",
					dataType	: "json",
					data		: JSON.stringify(data),
					success 	: function(data) {
						resolve();
					},
					error		: function(data) {
						reject();
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},
		remove : function(seqPartnerLockerList) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/myset/locker_use_delete?seq_partner_locker_list=" + seqPartnerLockerList,
					type		: "post",
					contentType : "application/x-www-form-urlencoded",
					dataType	: "json",
					success 	: function(data) {
						if(data.result == "ok")
							resolve();
						else
							reject();
					},
					error		: function(data) {
						reject();
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			});
		},
	},
	create : function(data) {
		data.seqPartnerLocker = "";
		return lockerController.update(data);
	},
	update : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/myset/locker_insert",
				type		: "post",
				contentType : "application/x-www-form-urlencoded",
				data		: {
					seqPartnerLocker : data.seqPartnerLocker,
					lockerType : data.lockerType,
					lockerName : data.lockerName,
					lockerCount : data.lockerCount,				// 蹂�寃� �� �쎌빱�섎웾
					nowLockerCount : data.nowLockerCount,		// 蹂�寃� �� �쎌빱�섎웾
				},
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
	remove : function(seqPartnerLocker) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/myset/locker_delete?cn=" + seqPartnerLocker,
				type		: "post",
				contentType : "application/x-www-form-urlencoded",
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
	active : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/myset/make_locker/",
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
	syncPass : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/myset/sync-pass",
				type		: "patch",
				contentType : "application/json;charset=utf-8",
				data		: JSON.stringify(data),
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
	change : {
		memo : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/myset/memo",
					type		: "patch",
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
		useState : function(seqPartnerLockerList, state) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/myset/locker_dontuse?seq_partner_locker_list=" + seqPartnerLockerList + "&use_status=" + state,
					type		: "post",
					contentType : "application/x-www-form-urlencoded",
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
		usePeriod : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/myset/changeUsePeriod",
					type		: "post",
					contentType : "application/x-www-form-urlencoded",
					dataType	: "json",
					data		: data,
					success 	: function(data) {
						if(data.result == "ok")
							resolve(data.data);
						else
							reject(data);
					},
					error		: function(data) {
						reject(data);
					},
					beforeSend	: uiBlock,
					complete	: uiUnblock
				});
			})
		}
	},
	list : function(seqPartnerLocker) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/myset/lockerList",
				type		: "post",
				contentType : "application/x-www-form-urlencoded",
				dataType	: "json",
				data		: {
					seqPartnerLocker : seqPartnerLocker
				},
				success 	: function(data) {
					if(data.result == "ok")
						resolve(data.data);
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
	checkin : {
		category : function() {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/manager/checkin/selectLockerTitle",
					type		: "get",
					contentType : "application/x-www-form-urlencoded",
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
		list : function(seqPartnerLocker) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/manager/checkin/selectLockerList/" + seqPartnerLocker,
					type		: "get",
					contentType : "application/x-www-form-urlencoded",
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
		assign : function(seqMember, seqPartnerLockerList) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/manager/checkin/selectLockerIndividual",
					type		: "post",
					contentType : "application/x-www-form-urlencoded",
					dataType	: "json",
					data		: {
						seqMember : seqMember,
						seqPartnerLockerList : seqPartnerLockerList
					},
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
		}
	},
	export : {
		excel : function() {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/exceldown?category=locker",
					type		: "get",
					contentType : "application/x-www-form-urlencoded",
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
		}
	}
}