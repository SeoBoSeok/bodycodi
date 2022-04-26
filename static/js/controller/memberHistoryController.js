const memberHistoryController = {
	passHistoryList : function(seqMember) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/passHistory/search",
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
	booking : {
		reservation : function(seqMember, count) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/member/booking/reservation?count=" + count + "&seqMember=" + seqMember,
					type		: "get",
					contentType : "application/json;charset=utf-8",
					success 	: function(data) {
            console.log('memberHistoryController.booking.reservation', data);
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
		entrance : function(seqMember, count) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/member/booking/entrance?count=" + count + "&seqMember=" + seqMember,
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
		entrancePlace : function(seqMember, count) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/member/" + seqMember + "/booking/place?count=" + count,
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
	},
};