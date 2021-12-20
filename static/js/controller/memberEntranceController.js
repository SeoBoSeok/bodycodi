const memberEntranceController = {
	list : function(date) {
		if(!date) date = "";
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/manager/entrance-member/list.php?entranceDate=" + date,
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
	info : function(seqMember) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/manager/entrance-member/" + seqMember,
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
	checkin : function(type, data) {
		/*
		data = {
			command : undefined,
			seqMember : data.seqMember,
			seqMemberEntranceStandby : data.seqMemberEntranceStandby,
			checkinType : "SCHEDULE" || "PLACE" || "PASS"
		}
	 	*/
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/checkin/" + type,
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
	checkout : function(seqMemberEntrance, seqLockerNo) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/manager/checkin/updateUserExit",
				type		: "post",
				contentType : "application/x-www-form-urlencoded",
				dataType	: "json",
				data 		: {
					seqMemberEntrance : seqMemberEntrance,
					seqLockerNo : seqLockerNo || 0
				},
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
	cancelStandby : function(seqMemberEntranceStandby) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/manager/checkin/updateEntranceStandbyInfoUseYn/" + seqMemberEntranceStandby,
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
	},
	lockerCategory : function() {
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
	lockerList : function(seqPartnerLocker) {
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
	assignLocker : function(seqMember, seqPartnerLockerList) {
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
};
