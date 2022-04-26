const scheduleController = {
	searchClassByDate : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/schedule/ajax/search-for-class-available-date-time",
				type		: "post",
				contentType : "application/json; charset=utf-8",
				dataType	: "json",
				data 		: JSON.stringify(data),
				success 	: function(data) {
					if(data.result == "SUCCESS" || data.resultCode == "000")
						resolve(data.data);
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
	searchClassByDateAndPassInfo : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/schedule/ajax/search-for-class-available-date-time-pass-info",
				type		: "post",
				contentType : "application/json; charset=utf-8",
				dataType	: "json",
				data 		: JSON.stringify(data),
				success 	: function(data) {
					if(data.result == "SUCCESS" || data.resultCode == "000")
						resolve(data.data);
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
	reserveScheduleList : function(seqPassInfoList, fromDate, toDate) {
		const dateList = [];
		if(fromDate) dateList.push("&fromDate=" + fromDate);
		if(toDate) dateList.push("&toDate=" + toDate);

		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/schedules/status/reservation?seqPassInfo=" + seqPassInfoList.join(",") + dateList.join(""),
				type		: "get",
				contentType : "application/json;charset=utf-8",
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
	scheduleList : function(seqPassInfo, fromDate, toDate) {
		const dateList = [];
		if(fromDate) dateList.push("&fromDate=" + fromDate);
		if(toDate) dateList.push("&toDate=" + toDate);
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/schedules/status/all?seqPassInfo=" + seqPassInfo + dateList.join(""),
				type		: "get",
				contentType : "application/json;charset=utf-8",
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
	reservation : {
		// 예약내역
		search : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/manager/reservation/search",
					type		: "post",
					contentType : "application/x-www-form-urlencoded;charset=utf-8",
					dataType	: "json",
					data 		: data,
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
			info : function(seqMember, seqPassInfo) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/schedules/member/" + seqMember + "/pass/" + seqPassInfo + "/reservation/appointment",
						type		: "get",
						contentType : "application/json;charset=utf-8",
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
			search : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/schedules/reservation/batchAppointmentSearch",
						type		: "post",
						contentType : "application/json;charset=utf-8",
						dataType	: "json",
						data		: JSON.stringify(data),
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
			reserve : function(seqPassInfo, data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/schedules/pass/" + seqPassInfo + "/reservation/batchAppointmentInsert",
						type		: "post",
						contentType : "application/json;charset=utf-8",
						dataType	: "json",
						data		: JSON.stringify(data),
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
		}
	},
	coachList : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/manager/schedule/promise/json/coachlist",
				type		: "post",
				contentType : "application/x-www-form-urlencoded;charset=utf-8",
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
	spaceList : function() {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/manager/schedule/usage/json/placeList",
				type		: "post",
				contentType : "application/x-www-form-urlencoded;charset=utf-8",
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
	coachScheduleList : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/manager/schedule/promise/json/weekCoachScheduleList",
				type		: "post",
				contentType : "application/x-www-form-urlencoded;charset=utf-8",
				dataType	: "json",
				data		: data,
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
	voucherMinusYn : function(data) {
		return new Promise(function(resolve, reject) {
			$.ajax({
				url			: "/reservationsetting/json/selectSettingOfVoucherMinusYn",
				type		: "post",
				contentType : "application/x-www-form-urlencoded;charset=utf-8",
				dataType	: "json",
				data		: data,
				success 	: function(data) {
					resolve(data);
				},
				error		: function(error) {
					reject(error);
				}
			});
		});
	},
	setting : {
		info : function() {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/partner/selectScheduleSetting",
					type		: "post",
					contentType : "application/x-www-form-urlencoded;charset=utf-8",
					dataType	: "json",
					success 	: function(data) {
						resolve(data);
					},
					error		: function(error) {
						reject(error);
					}
				});
			});
		},
		update : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/partner/insertScheduleSetting",
					type		: "post",
					contentType : "application/x-www-form-urlencoded;charset=utf-8",
					data		: data,
					dataType	: "json",
					success 	: function(data) {
						if(data.RESULT == "SUCCESS")
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
	},
	appointment : {
		partnerInfo : function() {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/manager/schedule/promise/json/partnerServiceTime",
					type		: "post",
					contentType : "application/x-www-form-urlencoded;charset=utf-8",
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
		list : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/manager/schedule/promise/json/weekCoachPromiselist",
					type		: "post",
					contentType : "application/x-www-form-urlencoded;charset=utf-8",
					dataType	: "json",
					data		: data,
					success 	: function(data) {
						resolve(data);
					},
					error		: function(error) {
						reject(error);
					}
				});
			});
		},
		classList : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/manager/schedule/promise/json/weekClassSchedulelist",
					type		: "post",
					contentType : "application/x-www-form-urlencoded;charset=utf-8",
					dataType	: "json",
					data		: data,
					success 	: function(data) {
						resolve(data);
					},
					error		: function(error) {
						reject(error);
					}
				});
			});
		},
		state : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/manager/schedule/promise/json/scheduleCountList",
					type		: "get",
					contentType : "application/x-www-form-urlencoded;charset=utf-8",
					dataType	: "json",
					data		: data,
					success 	: function(data) {
						resolve(data);
					},
					error		: function(error) {
						reject(error);
					}
				});
			});
		},
		productList : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/manager/schedule/promise/json/productlist",
					type		: "post",
					contentType : "application/x-www-form-urlencoded;charset=utf-8",
					dataType	: "json",
					data		: data,
					success 	: function(data) {
						resolve(data);
					},
					error		: function(error) {
						reject(error);
					}
				});
			});
		},
		create : function(data, type) {
			let url = "/manager/schedule/promise/insertPromiseSchedule";
			if(type == "noLimit")
				url = "/manager/schedule/promise/save/reservation/out-of-weekly-limit";
			else if(type == "past")
				url = "/manager/schedule/promise/save/past-schedule";
			else if(type == "pastNoLimit")
				url = "/manager/schedule/promise/save/past-schedule/out-of-weekly-limit";
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: url,
					type		: "post",
					contentType : "application/json;charset=utf-8",
					dataType	: "json",
					data		: JSON.stringify(data),
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
		update : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/manager/schedule/promise/updatePromiseSchedule",
					type		: "patch",
					contentType : "application/json;charset=utf-8",
					dataType	: "json",
					data		: JSON.stringify(data),
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
		usageInfo : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/manager/schedule/promise/json/selectUsageInfo",
					type		: "post",
					contentType : "application/x-www-form-urlencoded;charset=utf-8",
					dataType	: "json",
					data		: data,
					success 	: function(data) {
						resolve(data);
					},
					error		: function(error) {
						reject(error);
					}
				});
			});
		},
		checkCoachState : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/manager/schedule/promise/json/coachScheduleOffChk",
					type		: "post",
					contentType : "application/x-www-form-urlencoded;charset=utf-8",
					dataType	: "json",
					data		: data,
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
		reservation : {
			search : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/manager/schedule/promise/json/memberlist",
						type		: "post",
						contentType : "application/x-www-form-urlencoded;charset=utf-8",
						dataType	: "json",
						data		: data,
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
			info : function(seqSchedule) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/manager/schedule/promise/json/detailPromiseSchedule?seqSchedule=" + seqSchedule,
						type		: "get",
						contentType : "application/x-www-form-urlencoded;charset=utf-8",
						dataType	: "json",
						success 	: function(data) {
							if(data.RESULT == "SUCCESS")
								resolve(data.DATA || {});
							else
								reject(data);
						},
						error		: function(error) {
							reject(error);
						}
					});
				});
			},
			change : function(data, type) {
				let url = "/manager/schedule/promise/updatePromiseSchedule";
				if(type == "noLimit")
					url = "/manager/schedule/promise/change/schedule-state/out-of-weekly-limit";
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
		pass : {
			info : function(data) {
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
			}
		}
	},
	class : {
		partnerInfo : function() {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/manager/schedule/class/json/partnerServiceTime",
					type		: "post",
					contentType : "application/x-www-form-urlencoded;charset=utf-8",
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
		scheduleListByPartner : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/api/rest/partners/" + data.seqPartner + "/schedule/partnerClassSchedule/" + data.seqPartnerClassSchedule,
					type		: "post",
					contentType : "application/json;charset=utf-8",
					dataType	: "json",
					data		: JSON.stringify(data),
					success 	: function(data) {
						if(!data) data = {};
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
		scheduleListByPartnerInRangeAndSpace : function(data) {
			if(!data.searchStr) data.searchStr = "";
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/class-schedule/ajax/findAllByPartnerInRangeAndSpaces",
					type		: "post",
					contentType : "application/json;charset=utf-8",
					dataType	: "json",
					data		: JSON.stringify(data),
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
		copyScheduleList(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/class-schedule/ajax/classScheduleCopyPaste",
					type		: "post",
					contentType : "application/json;charset=utf-8",
					data		: JSON.stringify(data),
					dataType	: "json",
					success		: function(data) {
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
		usageInfo : function(data) {
			return new Promise(function(resolve, reject) {
				$.ajax({
					url			: "/manager/schedule/class/json/selectUsageInfo",
					type		: "post",
					contentType : "application/x-www-form-urlencoded;charset=utf-8",
					dataType	: "json",
					data		: data,
					success 	: function(data) {
						resolve(data);
					},
					error		: function(error) {
						reject(error);
					}
				});
			});
		},
		change : {
			coach : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/class-schedule/ajax/changeCoach",
						type		: "put",
						contentType : "application/json;charset=utf-8",
						data		: JSON.stringify(data),
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
			open : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/class-schedule/ajax/open",
						type		: "patch",
						contentType : "application/json;charset=utf-8",
						data		: JSON.stringify(data),
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
		schedule : {
			check : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/manager/schedule/class/json/classScheduleOffChk",
						type		: "post",
						contentType : "application/x-www-form-urlencoded;charset=utf-8",
						dataType	: "json",
						data		: data,
						success 	: function(data) {
							if(!data) data = {};
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
			list : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/manager/schedule/class/json/weekClassSchedulelist",
						type		: "post",
						contentType : "application/x-www-form-urlencoded;charset=utf-8",
						dataType	: "json",
						data		: data,
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
					$.ajax({
						url			: "/class-schedule/ajax/insert",
						type		: "post",
						contentType : "application/json;charset=utf-8",
						dataType	: "json",
						data		: JSON.stringify(data),
						success 	: function(data) {
							if(data.result != "SUCCESS" || data.resultCode == 100)
								reject(data);
							else
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
			update : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/class-schedule/ajax/update",
						type		: "post",
						contentType : "application/json;charset=utf-8",
						dataType	: "json",
						data		: JSON.stringify(data),
						statusCode	: {
							200		: function(data) {
								resolve(data);
							},
							400		: function(error) {
								if(error.responseText == "1")
									alert("해당 수업의 정원을 수정 할 수 없습니다.\n예약중인 회원들이 있습니다.");
								else if (error.responseText == "4")
									alert("해당 수업의 좌석을 수정 할 수 없습니다.\n예약중인 회원들이 있습니다.");
								else
									alert("작업 중 에러가 발생하였습니다.");
								reject();
							},
							404		: function(error) {
								reject(error);
							}
						},
						beforeSend	: uiBlock,
						complete	: uiUnblock
					});
				});
			},
			remove : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/class-schedule/ajax/delete",
						type		: "post",
						contentType : "application/json;charset=utf-8",
						data		: JSON.stringify(data),
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
			cancel : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/class-schedule/ajax/cancel",
						type		: "patch",
						contentType : "application/json;charset=utf-8",
						data		: JSON.stringify(data),
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
			info : function(seqClassSchedule) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/manager/schedule/class/json/selectScheduleInfoByPk",
						type		: "post",
						contentType : "application/x-www-form-urlencoded;charset=utf-8",
						data		: {
							seqPartnerClassSchedule : seqClassSchedule
						},
						dataType	: "json",
						success 	: function(data) {
							if(data.RESULT == "SUCCESS") {
								data.DATA.cost = data.COST || {};
								if(data.NAVER) data.DATA.naver = data.NAVER;
								if(data.LESSONNAVER) data.DATA.naverLesson = data.LESSONNAVER;
								resolve(data.DATA || {});
							} else {
								reject(data);
							}
						},
						error		: function(error) {
							reject(error);
						}
					});
				});
			},
			detail : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/manager/schedule/class/json/detailSchedule",
						type		: "post",
						contentType : "application/x-www-form-urlencoded;charset=utf-8",
						dataType	: "json",
						data		: data,
						success 	: function(data) {
							data.startDate = (data.startDate || "").substr(0, 10) + " " + data.startTime + ":00";
							data.endDate = (data.endDate || "").substr(0, 10) + " " + data.endTime + ":00";
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
			stateInfo : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/manager/schedule/class/json/selectClassScheduleAttendantStatics",
						type		: "post",
						contentType : "application/x-www-form-urlencoded;charset=utf-8",
						dataType	: "json",
						data		: data,
						success 	: function(data) {
							if(data.RESULT == "SUCCESS")
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
			availableSeat : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/class-schedule/ajax/availableSeat",
						type		: "post",
						contentType : "application/json;charset=utf-8",
						data		: JSON.stringify(data),
						statusCode 	: {
							200 : function(data) {
								resolve(data);
							},
							204 : function() {
								resolve();
							},
							400 : function(error) {
								reject(error);
							}
						},
						beforeSend	: uiBlock,
						complete	: uiUnblock
					});
				});
			},
			complete : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/manager/schedule/class/json/insertGroupClassScheduleComplete",
						type		: "post",
						contentType : "application/x-www-form-urlencoded;charset=utf-8",
						data		: data,
						dataType	: "json",
						success 	: function(data) {
							if(data.RESULT == "SUCCESS")
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
			}
		},
		reservation : {
			search : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/manager/schedule/class/json/memberlist",
						type		: "post",
						contentType : "application/x-www-form-urlencoded;charset=utf-8",
						dataType	: "json",
						data		: data,
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
			list : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/manager/schedule/class/json/scheduleMemberlist",
						type		: "post",
						contentType : "application/x-www-form-urlencoded;charset=utf-8",
						dataType	: "json",
						data		: data,
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
			create : function(data, type) {
				let url = "/manager/schedule/class/save";
				if(type == "noLimit")
					url = "/manager/schedule/class/save/out-of-weekly-limit";
				else if(type == "wait")
					url = "/manager/schedule/class/schedule-state/wait";
				else if(type == "complete")
					url = "/manager/schedule/class/json/insertPastSchedule";
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: url,
						type		: "post",
						contentType : "application/json;charset=utf-8",
						dataType	: "json",
						data		: JSON.stringify(data),
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
			change : function(data, type) {
				let url = "/manager/schedule/class/change";
				if(type == "noLimit")
					url = "/manager/schedule/class/change/out-of-weekly-limit";
				else if(type == "wait")
					url = "/manager/schedule/class/schedule-state/wait-to-reserve";
				else if(type == "waitNoLimit")
					url = "/manager/schedule/class/schedule-state/wait-to-reserve/out-of-weekly-limit";
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: url,
						type		: "patch",
						contentType : "application/json;charset=utf-8",
						dataType	: "json",
						data		: JSON.stringify(data),
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
			changeForNaver : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/manager/schedule/class/change/naver/" + data.seqSchedule + "/" + data.status,
						type		: "patch",
						contentType : "application/json;charset=utf-8",
						dataType	: "json",
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
			changeForComplete : function(data, type) {
				let url = "/manager/schedule/class/json/insertPastSchedule";
				let contentType = "application/x-www-form-urlencoded;charset=utf-8";
				if(type == "noLimit") {
					url = "/manager/schedule/class/save/past/out-of-weekly-limit";
					contentType = "application/json;charset=utf-8";
					data = JSON.stringify(data);
				}
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: url,
						type		: "post",
						contentType : contentType,
						data		: data,
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
			checkChangeState : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						type		: "get",
						url			: "/manager/schedule/class/change-state",
						contentType	: "application/x-www-form-urlencoded;charset=utf-8",
						data		: data,
						success : function(data) {
							resolve(data);
						},
						error : function(error) {
							reject(error);
						},
						beforeSend	: uiBlock,
						complete	: uiUnblock
					});
				});
			},
			changeState : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						type		: "patch",
						url			: "/manager/schedule/class/change-state",
						contentType	: "application/json;charset=utf-8",
						data		: JSON.stringify(data),
						dataType	: "json",
						success : function(data) {
							resolve(data);
						},
						error : function(error) {
							reject(error);
						},
						beforeSend	: uiBlock,
						complete	: uiUnblock
					});
				});
			},
		},
		pass : {
			search : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/product-usage/ajax/searchForAvailableByMember",
						type		: "post",
						contentType : "application/x-www-form-urlencoded;charset=utf-8",
						dataType	: "json",
						data		: data,
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
			info : function(data) {
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
		},
		lesson : {
			list : function() {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/manager/schedule/lesson/list",
						type		: "get",
						contentType : "application/json;charset=utf-8",
						dataType	: "json",
						success		: function(data) {
							resolve(data);
						},
						error		: function(error) {
							reject();
						}
					});
				});
			},
			imageList() {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/partner/seat/selectSeatImageList",
						type		: "post",
						contentType : "application/json;charset=utf-8",
						dataType	: "json",
						success		: function(data) {
							resolve(data);
						},
						error		: function(error) {
							if(error.status == "406")
								resolve();
							else reject();
						}
					});
				});
			},
			attendanceList(callback) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/manager/schedule/lesson/attendanceType",
						type		: "get",
						contentType : "application/json;charset=utf-8",
						dataType	: "json",
						success		: function(data) {
							resolve(data);
						},
						error		: function(error) {
							reject();
						}
					});
				});
			},
			info(seqPartnerLesson) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/manager/schedule/lesson/" + seqPartnerLesson,
						type		: "get",
						contentType : "application/json;charset=utf-8",
						dataType	: "json",
						success		: function(data) {
							resolve(data);
						},
						error		: function(error) {
							reject();
						},
						beforeSend	: uiBlock,
						complete	: uiUnblock
					});
				});
			},
			create : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/manager/schedule/lesson",
						type		: "post",
						contentType : "application/json;charset=utf-8",
						data		: JSON.stringify(data),
						dataType	: "json",
						success		: function(data) {
							resolve(data);
						},
						error		: function(error) {
							reject();
						},
						beforeSend	: uiBlock,
						complete	: uiUnblock
					});
				});
			},
			update : function(data, sequence) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/manager/schedule/lesson/" + sequence,
						type		: "put",
						contentType : "application/json;charset=utf-8",
						data		: JSON.stringify(data),
						dataType	: "json",
						success		: function(data) {
							resolve(data);
						},
						error		: function(error) {
							reject();
						},
						beforeSend	: uiBlock,
						complete	: uiUnblock
					});
				});
			},
			remove : function(data) {
				return new Promise(function(resolve, reject) {
					$.ajax({
						url			: "/manager/schedule/lesson",
						type		: "delete",
						contentType : "application/json;charset=utf-8",
						dataType	: "json",
						data		: JSON.stringify(data),
						success		: function(data) {
							resolve(data);
						},
						error		: function(error) {
							reject();
						},
						beforeSend	: uiBlock,
						complete	: uiUnblock
					});
				});
			},
		}
	}
};

