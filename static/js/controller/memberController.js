const memberController = {
	create : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/ajax/regist/advance.php",
				type		: "post",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				data 		: JSON.stringify(data),
				success 	: function(data) {
					if(data.result == "SUCCESS" || data.resultCode == "000")
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

	insertMemberProspective : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/sales/member-prospective/after-insert/" + data,
				type		: "post",
				contentType : "application/json;charset=utf-8",
				context 	: this,
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

	updateMemberProspective : function(seqMember, seqMemberProspective) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/sales/member-prospective/updateMember",
				type		: "post",
				contentType : "application/json;charset=utf-8",
				data	 	: JSON.stringify({
					seqMemberProspective : seqMemberProspective,
					seqMember : seqMember,
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
	},

	update : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/ajax/update",
				type		: "post",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				data 		: JSON.stringify(data),
				success 	: function(data) {
					if(data.result == "SUCCESS" || data.resultCode == "000")
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

	remove : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/manager/member/delete",
				type		: "post",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				data 		: JSON.stringify(data),
				success 	: function(data) {
					if(data.result == "SUCCESS" || data.resultCode == "000")
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

	getMember : function(seqMember) {
		let data = {
			searchParamMap : {
				seqMember : seqMember
			}
		};
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/ajax/select",
				type		: "post",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				data 		: JSON.stringify(data),
				success 	: function(data) {
					if(data.result == "SUCCESS" || data.resultCode == "100")
						resolve(data);
					else
						reject(data);
				},
				error		: function(data) {
					reject(data);
				}
			});
		});
	},

	// 회원통계 정보
	statistics : function(seqMember) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/statistics",
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

	createForm : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/ajax/regist/form",
				type		: "post",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				data 		: "{}",
				success 	: function(data) {
					if(data.result == "SUCCESS" || data.resultCode == "000")
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

	counselingForm : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/ajax/counseling",
				type		: "post",
				contentType : "application/json;charset=utf-8",
				data		: JSON.stringify(data),
				dataType	: "json",
				success 	: function(data) {
					if(data.result == "SUCCESS" || data.resultCode == "000")
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

	searchByName : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/ajax/search/name",
				type		: "post",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				data 		: JSON.stringify(data),
				success 	: function(data) {
					if(data.result == "SUCCESS" || data.resultCode == "000")
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

	searchByMobile : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/ajax/select/mobile",
				type		: "post",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				data 		: JSON.stringify(data),
				success 	: function(data) {
					if(data.result == "SUCCESS" || data.resultCode == "000")
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

	searchByNameOrMobile : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/ajax/search/name-or-mobile",
				type		: "post",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				data 		: JSON.stringify(data),
				success 	: function(data) {
					if(data.result == "SUCCESS" || data.resultCode == "000")
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

	checkMobile : function(data) {
		return new Promise(function(resolve, reject) {
			resolve({result: "SUCCESS", resultCode: "1100"});
			// $.ajax({
			// 	url			: "/member/ajax/is-usable-mobile",
			// 	type		: "post",
			// 	contentType : "application/json;charset=utf-8",
			// 	dataType	: "json",
			// 	data 		: JSON.stringify(data),
			// 	success 	: function(data) {
			// 		if(data.result == "SUCCESS" || data.resultCode == "100")
    	//                 resolve(data);
			// 		else
			// 			reject(data);
			// 	},
			// 	error		: function(data) {
			// 		reject(data);
			// 	}
			// });
		});
	},

	checkBarcode : function(data) {
		return new Promise(function(resolve, reject) {
			// $.ajax({
			// 	url			: "/member/ajax/is-usable-entrance-barcode",
			// 	type		: "post",
			// 	contentType : "application/json;charset=utf-8",
			// 	dataType	: "json",
			// 	data 		: JSON.stringify(data),
			// 	success 	: function(data) {
			// 		if(data.result == "SUCCESS" || data.resultCode == "100")
    	//                 resolve(data);
			// 		else
			// 			reject(data);
			// 	},
			// 	error		: function(data) {
			// 		reject(data);
			// 	}
			// });
			resolve(true);
		});
	},

	checkMemberNo : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/ajax/is-usable-membershipNo",
				type		: "post",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				data 		: JSON.stringify(data),
				success 	: function(data) {
					if(data.result == "SUCCESS" || data.resultCode == "000")
    	                resolve(data);
					else
						reject(data);
				},
				error		: function(data) {
					reject(data);
				}
			});
		});
	},

	generateMemberNo : function(data) {
		return new Promise(function(resolve, reject) {
			resolve({"data":{"member":{"age":0,"membershipNo":"11","memberInfoEditYn":"N","height":0,"weight":0,"rhr":0,"vo2max":0}},"result":"SUCCESS","resultCode":"000"});
			// $.ajax({
			// 	url			: "/member/ajax/generate-membershipNo",
			// 	type		: "post",
			// 	contentType : "application/json;charset=utf-8",
			// 	dataType	: "json",
			// 	data 		: JSON.stringify(data),
			// 	success 	: function(data) {
			// 		if(data.result == "SUCCESS" || data.resultCode == "000")
    	//                 resolve(data.data);
			// 		else
			// 			reject(data);
			// 	},
			// 	error		: function(data) {
			// 		reject(data);
			// 	}
			// });
		});
	},

	updatePoint : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/ajax/update/point",
				type		: "post",
				contentType : "application/json;charset=utf-8",
				dataType	: "json",
				data 		: JSON.stringify(data),
				success 	: function(data) {
					if(data.result == "SUCCESS" || data.resultCode == "000")
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

	putMemo : function(data) {
		const formData = new FormData();
		formData.append("editMemo", data.memo);

		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/manager/member/updateMemberMemo/" + data.seqMember,
				type		: "post",
				contentType : false,
				processData : false,
				dataType	: "json",
				data 		: formData,
				success 	: function(data) {
					if(data.result == "ok")
						resolve(data);
					else
						reject(data);
				},
				error		: function(error) {
					reject(error);
				}
			});
		});
	},

	passList : function(seqMember, query) {
		let url = "/member/" + seqMember + "/pass/list";
		const getQueryString = () => {
			if(!query) return "";
			const queryList = [];
			for(let name in query)
				queryList.push(name + "=" + query[name]);
			return "?" + queryList.join("&");
		};
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/pass/list" + getQueryString(),
				type		: "get",
				contentType : "application/json;charset=utf-8",
				success 	: function(data) {
					for(let name in data) {
						data[name] = data[name].sort(function(a, b) {
							const dateA = new Date(a.regDt).getTime();
							const dateB = new Date(b.regDt).getTime();
							return (dateA == dateB) ? 0 : (dateA < dateB) ? 1 : -1;
						});
					}
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

	passInfo : function(seqMember, seqPassInfo) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/pass/" + seqPassInfo + "/info",
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

	passListInfo : function(seqMember, seqOrderInfo) {
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

	changePassOption : function(seqMember, seqPassInfo, type, data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/pass/" + seqPassInfo + "/" + type,
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

	pause : {
		list : function(seqMember, seqPassInfo) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/member/" + seqMember + "/pass/" + seqPassInfo + "/pause/list",
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

		create : function(seqMember, seqPassInfo, data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/member/" + seqMember + "/pass/" + seqPassInfo + "/pause",
					type		: "post",
					contentType : "application/json;charset=utf-8",
					data 		: JSON.stringify(data),
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

		update : function(seqMember, seqPassInfo, seqPassInfoPause, data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/member/" + seqMember + "/pass/" + seqPassInfo + "/pause/" + seqPassInfoPause,
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

		resume : function(seqMember, seqPassInfo, seqPassInfoPause) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/member/" + seqMember + "/pass/" + seqPassInfo + "/pause/" + seqPassInfoPause + "/resume",
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

		remove : function(seqMember, seqPassInfo, seqPassInfoPause) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/member/" + seqMember + "/pass/" + seqPassInfo + "/pause/" + seqPassInfoPause,
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

	transfer : function(seqMember, seqOrderInfo, seqPassList, data) {
		if(typeof data == "number") {
			const seqMemberTransfer = data;
			data = {
				orderDate : getCalendar(),
				seqPartnerCoach : partnerInfo.employee.id,
				memo : "",
				price : 0,
				orderPassTransfers : seqPassList.map(item => {
					return {
						seqMember : seqMember,
						seqMemberTransfer : seqMemberTransfer,
						seqPassInfo : item
					};
				}),
				payments : []
			}
		}
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/member/" + seqMember + "/orderInfo/" + seqOrderInfo + "/transfer",
				type		: "post",
				contentType : "application/json;charset=utf-8",
				data 		: JSON.stringify(data),
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

	locker : {
		day : {
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
		period : {
			list : function(seqPartnerLocker) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/myset/lockerList.php",
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
			}
		}
	},
}
