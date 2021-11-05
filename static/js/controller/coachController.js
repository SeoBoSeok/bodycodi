const coachController = {
	common : function(url, type, contentType, data, isBoolean) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url			: url,
                type		: type,
                contentType : contentType,
                dataType	: "json",
                data 		: data,
                success 	: function(data) {
                	if(isBoolean) {
	                	const isSuccess = (data.result == "ok" || data.result == "success" || data.resultCode == "100") ? true : false;
    	                resolve((isSuccess) ? true : false);
					} else resolve(data);
                },
                error		: function(data) {reject(data)}
            });
        });
	},

	changePassword : function(data) {
		return this.common("/coach/ajax/update-pwd", "post", "application/json;charset=utf-8", data);
	},

	confirmPassword : function(data) {
		data = JSON.stringify(data);
        return this.common("/coach/ajax/confirm-pwd", "post", "application/json;charset=utf-8", data);
	},

	login : function(data) {
        return this.common("/common/login_change", "post", "application/x-www-form-urlencoded", data, true);
	},

	getList : function(partnerId) {
		const data = {
			includePosition : true,
			includeTeams : true
		};
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/api/rest/partners/" + partnerId + "/coaches/switch-user",
				type		: "get",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				data 		: data,
				success 	: function(data) {
					data = data || [];
					resolve(data.sort(function (a, b) {
						return a.coachName < b.coachName ? -1 : a.coachName > b.coachName ? 1 : 0;
					}));
				},
				error		: function(data) {
					reject(data)
				}
			});
		});
	},

	coachList : function() {
		const seqPartner = partnerInfo.partner.id;
		const data = {
			includePosition : true,
			includeTeams : true
		};
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/api/rest/partners/" + seqPartner + "/coaches",
				type		: "get",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				data 		: data,
				success 	: function(data) {
					data = data || [];
					resolve(data.sort(function (a, b) {
						return a.coachName < b.coachName ? -1 : a.coachName > b.coachName ? 1 : 0;
					}));
				},
				error		: function(data) {
					reject(data)
				}
			});
		});
	},

	list : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/coachInfo/list",
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

	// 코치 프로필 업로드
	profileUpload : function(form) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/coach/profile/upload",
				type		: "post",
				contentType : false,
				processData : false,
				dataType	: "json",
				data 		: form,
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
			const seqPartner = partnerInfo.partner.id;
			$.ajax({
				url			: "/api/rest/partners/" + seqPartner + "/coaches",
				type		: "post",
				data		: data,
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

	update : function(seqPartnerCoach, data) {
		return new Promise(function(resolve, reject) {
			const seqPartner = partnerInfo.partner.id;
			$.ajax({
				url			: "/api/rest/partners/" + seqPartner + "/coaches/" + seqPartnerCoach,
				type		: "patch",
				data		: data,
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

	info : function(seqPartnerCoach) {
		const seqPartner = partnerInfo.partner.id;
		if(!(seqPartner && seqPartnerCoach)) return;
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/api/rest/partners/" + seqPartner + "/coaches/" + seqPartnerCoach,
				type		: "get",
				contentType : "application/json;charset=utf-8",
				data		: {includePosition : true, includeTeams : true},
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

	remove : function(seqPartnerCoach) {
		const data = {
			searchParamMap : {
				seqPartnerCoach : seqPartnerCoach
			},
			coach : {
				seqPartnerCoach : seqPartnerCoach,
				useYn : "N"
			}
		};
		return new Promise(function(resolve, reject) {
			const seqPartner = partnerInfo.partner.id;
			$.ajax({
				url			: "/coach/ajax/delete",
				type		: "post",
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
	overview : function(seqPartnerCoach) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/coach/" + seqPartnerCoach + "/overview/info",
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
	setting : {
		info : function(seqPartnerCoach) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/coach/" + seqPartnerCoach + "/setting/info",
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
		schedule : {
			info : function(seqPartnerCoach) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/coach/" + seqPartnerCoach + "/setting/schedule/info",
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
			update : function(seqPartnerCoach, data, breakTime) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/coach/schedule_insert?cn=" + seqPartnerCoach + "&breakTime=" + breakTime,
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
			}
		},
		holiday : {
			info : function(seqPartnerCoach) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/coach/" + seqPartnerCoach + "/setting/holiday/info",
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
			update : function(seqPartnerCoach, data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/coach/holiday_insert?cn=" + seqPartnerCoach,
						type		: "post",
						contentType : "application/x-www-form-urlencoded;charset=utf-8",
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
			}
		},
		reservation : {
			info : function(seqPartnerCoach) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/coach/" + seqPartnerCoach + "/setting/reservation/info",
						type		: "get",
						contentType : "application/json;charset=utf-8;charset=utf-8",
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
			update : function(data) {
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
			}
		}
	},
	position : {
		order : function(data) {
			return new Promise(function(resolve, reject) {
				const seqPartner = partnerInfo.partner.id;
				$.ajax({
					url			: "/api/rest/partners/" + seqPartner + "/positions",
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
		create : function(data) {
			return new Promise(function(resolve, reject) {
				const seqPartner = partnerInfo.partner.id;
				$.ajax({
					url			: "/api/rest/partners/" + seqPartner + "/positions",
					type		: "post",
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
		update : function(data) {
			return new Promise(function(resolve, reject) {
				const seqPartner = partnerInfo.partner.id;
				$.ajax({
					url			: "/api/rest/partners/" + seqPartner + "/positions/" + data.seqPosition,
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
		remove : function(seqPosition) {
			return new Promise(function(resolve, reject) {
				const seqPartner = partnerInfo.partner.id;
				$.ajax({
					url			: "/api/rest/partners/" + seqPartner + "/positions/" + seqPosition,
					type		: "delete",
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
	team : {
		order : function(data) {
			return new Promise(function(resolve, reject) {
				const seqPartner = partnerInfo.partner.id;
				$.ajax({
					url			: "/api/rest/partners/" + seqPartner + "/teams",
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
		create : function(data) {
			return new Promise(function(resolve, reject) {
				const seqPartner = partnerInfo.partner.id;
				$.ajax({
					url			: "/api/rest/partners/" + seqPartner + "/teams",
					type		: "post",
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
		update : function(data) {
			return new Promise(function(resolve, reject) {
				const seqPartner = partnerInfo.partner.id;
				$.ajax({
					url			: "/api/rest/partners/" + seqPartner + "/teams/" + data.seqTeam,
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
		remove : function(seqTeam) {
			return new Promise(function(resolve, reject) {
				const seqPartner = partnerInfo.partner.id;
				$.ajax({
					url			: "/api/rest/partners/" + seqPartner + "/teams/" + seqTeam,
					type		: "delete",
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
};
