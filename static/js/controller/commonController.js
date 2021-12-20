const commonController = {
	// 서비스 종목 조회
	genreList : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/services/genres/list",
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

	// 장소 목록 조회
	placeList : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/place/list",
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

	// 매출 분류 목록 조회
	salesClassificationList : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/sales-classification/list",
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

	// 임직원 목록 조회
	coachList : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/api/coach/coachInfo/list.php",
				type		: "get",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				success 	: function(data) {
					data = data || [];
					resolve(data.sort(function (a, b) {
						return a.coachName < b.coachName ? -1 : a.coachName > b.coachName ? 1 : 0;
					}));
				},
				error		: function(data) {
					reject(data);
				},
				beforeSend	: uiBlock,
				complete	: uiUnblock
			});
		});
	},

	// 가맹점 정보 조회
	partnerInfo : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/partner/information",
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

	// 회원정보 조회
	memberInfo : function(seqMember, isSummary) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + ((isSummary) ? "/summary" : ""),
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

	// 입금은행 목록 조회
	bankAccountList : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/partner/bank-account/list",
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

	// 입금은행 목록 조회
	cardList : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/code/card",
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

	// 은행 목록 조회
	bankList : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/code/bank",
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

	// 이미지 업로드
	imageUpload : function(form) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/manager/common/imageUpload",
				type		: "post",
				contentType : false,
				processData : false,
				dataType	: "json",
				data 		: form,
				success 	: function(data) {
					if(data.result == "success")
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

	// 포지션 조회
	positionList : function(seqPartner) {
		return new Promise(function(resolve, reject) {
			if(!seqPartner)	seqPartner = partnerInfo.partner.id;
			$.ajax({
				url			: "/api/rest/partners/" + seqPartner + "/positions",
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

	teamList : function(seqPartner) {
		return new Promise(function(resolve, reject) {
			if(!seqPartner)	seqPartner = partnerInfo.partner.id;
			$.ajax({
				url			: "/api/rest/partners/" + seqPartner + "/teams",
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

	partner : {
		openTime : function() {
			return new Promise(function(resolve, reject) {
				const seqPartner = partnerInfo.partner.id;
				$.ajax({
					url			: "/api/rest/partners/" + seqPartner + "/openTime",
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
		}
	},

	todo : {
		list : function(seqPartner, date, isBlock) {
			if(!(date instanceof Date)) date = (date) ? new Date(date) : new Date();
			date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 0, 0);
			date = date.toISOString();

			return new Promise(function(resolve, reject) {
				// resolve([{"seqTodo":1242,"seqPartnerCoach":9806,"startAt":"2021-01-19T09:00:00+09:00","endAt":"2021-04-30T09:00:00+09:00","message":"22:00 / 센터 정리 (마감) 후 지점장님 공유","comment":"","isCompleted":false},{"seqTodo":1444,"seqPartnerCoach":9807,"startAt":"2021-02-01T09:00:00+09:00","endAt":"2021-04-30T09:00:00+09:00","message":"세일즈 업무 진행 (채널 안내)","comment":"","isCompleted":true},{"seqTodo":1445,"seqPartnerCoach":9807,"startAt":"2021-02-01T09:00:00+09:00","endAt":"2021-04-30T09:00:00+09:00","message":"잠재회원 전화 연락","comment":"","isCompleted":true},{"seqTodo":1446,"seqPartnerCoach":9807,"startAt":"2021-02-01T09:00:00+09:00","endAt":"2021-04-30T09:00:00+09:00","message":"신규 회원 등록 정보 확인","comment":"","isCompleted":true},{"seqTodo":2154,"seqPartnerCoach":13508,"startAt":"2021-04-08T09:00:00+09:00","endAt":"2021-04-30T09:00:00+09:00","message":"홍길동 회원 재등록 안내","comment":"","isCompleted":false}]);
				$.ajax({
					// url			: "/api/rest/partners/" + seqPartner + "/todos?targetDateTime=" + date,
					url			: "/api/partner/todos.php?targetDateTime=2021-04-15T00:00:00.000Z",
					type		: "get",
					contentType : "application/json;charset=utf-8",
					dataType	: "json",
					success 	: function(data) {
						resolve(data);
					},
					error		: function(data) {
						reject(data);
					},
					beforeSend	: function() {
						if(isBlock !== false) uiBlock();
					},
					complete	: function() {
						if(isBlock !== false) uiUnblock();
					}
				});
			});
		},
		create : function(seqPartner, data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/api/rest/partners/" + seqPartner + "/todos",
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
		update : function(seqPartner, seqTodo, data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/api/rest/partners/" + seqPartner + "/todos/" + seqTodo,
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
		remove : function(seqPartner, seqTodo) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/api/rest/partners/" + seqPartner + "/todos/" + seqTodo,
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

	statistics : {
		getISODate : function(date) {
			date = new Date(date);
			date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
			return date.toISOString();
		},
		appointment : function(date) {
			date = this.getISODate(date);
			return new Promise(function(resolve, reject) {
				const seqPartner = partnerInfo.partner.id;
				$.ajax({
					url			: "/api/rest/partners/" + seqPartner + "/statistics/appointment_status?targetDay=" + date,
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
		class : function(date) {
			date = this.getISODate(date);
			return new Promise(function(resolve, reject) {
				const seqPartner = partnerInfo.partner.id;
				$.ajax({
					url			: "/api/rest/partners/" + seqPartner + "/statistics/class_status?targetDay=" + date,
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
		place : function(date) {
			date = this.getISODate(date);
			return new Promise(function(resolve, reject) {
				const seqPartner = partnerInfo.partner.id;
				$.ajax({
					url			: "/api/rest/partners/" + seqPartner + "/statistics/place_status?targetDay=" + date,
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
		}
	},

	// 지점 관련
	branch : {
		list : function() {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/partner/branch/list.php",
					type		: "get",
					contentType : "application/json;charset=utf-8",
					dataType	: "json",
					success 	: function(data) {
						if(!data) data = [];
						data.unshift({
							seqPartnerBranch : 0,
							partnerName : "본사"
						});
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
		change : function(seqPartnerBranch) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/partner/branch/change/" + seqPartnerBranch,
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
		type : {
			list : function() {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/partner/branch/type/list",
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
			change : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/partner/branch/change/branchType",
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
			create : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/partner/branch/type",
						type		: "post",
						contentType : "application/json;charset=utf-8",
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
			update : function(seqPartnerBranchType, data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/partner/branch/type/" + seqPartnerBranchType,
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
			remove : function(seqPartnerBranchType) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/partner/branch/type/" + seqPartnerBranchType,
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
		classification : {
			list : function(type, parentSeqPartnerBranchClassification) {
				if(!type) type = "";
				if(!parentSeqPartnerBranchClassification) parentSeqPartnerBranchClassification = "";
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/partner/branch/classification/list?type=" + type + "&parentSeqPartnerBranchClassification=" + parentSeqPartnerBranchClassification,
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
			info : function(seqPartnerBranchClassification) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/partner/branch/classification/" + seqPartnerBranchClassification,
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
						url			: "/partner/branch/classification",
						type		: "post",
						contentType : "application/json;charset=utf-8",
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
			update : function(seqPartnerBranchClassification, data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/partner/branch/classification/" + seqPartnerBranchClassification,
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
			remove : function(seqPartnerBranchClassification) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/partner/branch/classification/" + seqPartnerBranchClassification,
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
			setting : function(seqPartnerBranchClassification, data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/partner/branch/classification/" + seqPartnerBranchClassification,
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
	}
}
