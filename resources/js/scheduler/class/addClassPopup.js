$(function() {
	$(document).on('click', '[data-popup="그룹 수업 등록하기"] [data-action="팝업 닫기"]', function() {
		addClassPopup.close();
	});

	$(document).on('click', '[data-popup="그룹 수업 등록하기"] [data-action="수업 등록"]', function() {
		addClassPopup.register();
	});

	$(document).on('click', '[data-popup="그룹 수업 등록하기"] [data-action="다음 수업"]', function() {
		addClassPopup.nextRegister();
	});

	$(document).on('click', '[data-popup="그룹 수업 등록하기"] [data-action="수업 수정"]', function() {
		addClassPopup.update();
	});

	$(document).on('change', '[data-popup="그룹 수업 등록하기"] [data-action="수업 선택"]', function() {
		addClassPopup.selectLesson(this);
	});



	$(document).on('click', '[data-popup="그룹 수업 등록하기"] [data-action="자세히 보기"]', function() {
		addClassPopup.detail("open", this);
	});

	$(document).on('click', '[data-popup="그룹 수업 등록하기"] [data-action="자세히 보기 취소"]', function() {
		addClassPopup.detail("cancel", this);
	});

	$(document).on('click', '[data-popup="그룹 수업 등록하기"] [data-action="자세히 보기 저장"]', function() {
		addClassPopup.detail("save", this);
	});

	$(document).on('change', '[data-popup="그룹 수업 등록하기"] [data-action="동기화"]', function() {
		addClassPopup.detail("sync", this);
	});



	$(document).on('click', '[data-popup="그룹 수업 등록하기"] [data-action="구간 추가"]', function() {
		addClassPopup.payment("insert", this);
	});

	$(document).on('click', '[data-popup="그룹 수업 등록하기"] [data-action="구간 삭제"]', function() {
		addClassPopup.payment("delete", this);
	});

	$(document).on('change', '[data-popup="그룹 수업 등록하기"] [data-action="구간 수정"]', function() {
		addClassPopup.payment("auto", this);
	});



	$(document).on('change', '[data-popup="그룹 수업 등록하기"] [data-action="이용권 카운팅"]', function() {
		addClassPopup._countTicket(this)
	});

	$(document).on('change','[data-popup="그룹 수업 등록하기"] [data-action="입력 활성화"]', function() {
		addClassPopup._activate(this);
	});

	$(document).on('click', '[data-popup="그룹 수업 등록하기"] [data-action="이미지 선택 취소"]', function() {
		addClassPopup._cancelSelect(this);
	});

	$(document).on('change', '[data-popup="그룹 수업 등록하기"] [data-action="수업 공개 여부"]', function() {
		addClassPopup._autoOpenYn();
	});

	$(document).on('change', '[data-popup="그룹 수업 등록하기"] [data-action="수업 자동 공개 설정"]', function() {
		addClassPopup._autoOpenYn(this);
	});

	$(document).on('change', '[data-popup="그룹 수업 등록하기"] [data-action="수업 자동 공개 날짜 검사"]', function() {
		addClassPopup._autoOpenDateCheck(this);
	});

	$(document).on('change', '[data-popup="그룹 수업 등록하기"] [data-action="수업 자동 공개 시간 검사"]', function() {
		addClassPopup._autoOpenTimeCheck(this);
	});


	$(document).on('change', '[data-popup="그룹 수업 등록하기"] [data-action="네이버 할인비율"]', function() {
		addClassPopup._naverDiscontRatio(this);
	});


	// 셀렉트 박스 버그 픽스
	$(document).on('change', '[data-popup="그룹 수업 등록하기"] [data-action="네이버 노출시간"]', function() {
		addClassPopup._setSelect(this);
	});

	$(document).on('change', '[data-popup="그룹 수업 등록하기"] [data-action="수업 참석자 기준"]', function() {
		addClassPopup._setSelect(this);
	});

	// 네이버 도움말
	$(document).on('mouseover', '[data-popup="그룹 수업 등록하기"] [data-action="네이버 도움말"]', function() {
		addClassPopup._setNaverTip.open(this);
	});

	$(document).on('mouseout', '[data-popup="그룹 수업 등록하기"] [data-action="네이버 도움말"]', function() {
		addClassPopup._setNaverTip.close(this);
	});
});



const addClassPopup = {
	template : "",				// 템플릿
	date : {},					// 날짜 기간
	data : {},					// 기본 데이터
	scheduleInfo : "",			// 수정 시 스케줄 데이터
	detailInfo : {},			// 상세화면 정보

	// 기본 데이터 셋팅
	setData() {
		$.blockUI({
			message : "잠시만 기다려 주세요.",
			css : {"left" : "50%", "top" : "50%", "padding" : "25px 50px", "width" : "auto", "border-radius" : "10px", "border" : "none", "font-size" : "14px", "transform" : "translate(-50%, -50%)"}
			});

		return new Promise(function(resolve, reject) {
			Promise.all([
				ClassScheduleController.lessonList(),				// 수업 목록
				ClassScheduleController.imageList(),				// 수업 이미지 목록
//				ClassScheduleController.serviceList(),				// 수업 이용권 목록
				serviceController.normal.list({serviceType : "CLASS"}, true),
				ClassScheduleController.attendanceList(),			// 수업 참여자 기준 목록
				naverController.getInfo()							// 네이버 연동 정보
			]).then(([lessonList, imageList, serviceList, attendanceList, naverInfo]) => {
				addClassPopup.data.lessonList = lessonList;
				addClassPopup.data.imageList = imageList;
				addClassPopup.data.serviceList = serviceList;
				addClassPopup.data.attendanceList = attendanceList;
				addClassPopup.data.naverInfo = naverInfo;
				resolve();
				$.unblockUI();
			}).catch(([]) => {
				reject();
				$.unblockUI();
			});
		});
	},

	// 팝업 기본 셋팅
	setPopup(mode) {
		addClassPopupTemplate.setMode(mode);
		const container = $("[data-popup-location='팝업 위치']");
		const template = addClassPopupTemplate.prepare();
		container.append(template);
		const popup = container.find("[data-popup='그룹 수업 등록하기']");
		this.template = popup;
		popup.find("[name='startDt'], [name='endDt'], [name='autoOpenDate']").datepicker({
			dateFormat : "yy-mm-dd",
			firstDay : 1,
			defaultDate : new Date()
		});
		return popup;
	},

	// 수업 등록하기
	open() {
		if(this.template) {
			console.log("warning : suppress duplicate")
			return;
		}
		this.setData().then(function() {
			const popup = addClassPopup.setPopup("create");
			addClassPopup.prepareTemplate();
			uiInput(popup[0]);
			popup.fadeIn(300);
		}).catch(error => {
			alert("오류가 발생하였습니다.\n그룹 수업 정보를 가져오는데 실패하였습니다.");
			console.log(error);
		});
	},

	// 수업 수정하기
	modifyOpen() {
		if(this.template) {
			console.log("warning : suppress duplicate")
			return;
		}
		this.setData().then(function() {
			const popup = addClassPopup.setPopup("update");
			addClassPopup.modifyPrepareTemplate();
			uiInput(popup[0]);
			popup.fadeIn(300);
		}).catch(error => {
			alert("오류가 발생하였습니다.\n그룹 수업 정보를 가져오는데 실패하였습니다.");
			console.log(error);
		});
	},

	// 팝업 닫기
	close() {
		this.template.fadeOut(300, function() {
			addClassPopup.template.remove();
			addClassPopup.template = "";
			schedulePopup.resetReload();
		});
	},

	// 날짜 설정
	setDate : function(date) {
		this.date = date;
	},

	// 수정 시 해당 스케줄 정보 설정
	setScheduleInfo : function(scheduleInfo) {
		this.scheduleInfo = scheduleInfo;
	},

	// 등록 시 템블릿 데이터 셋팅
	prepareTemplate : function() {
		const formatDate = scheduler.date.date_to_str("%Y-%m-%d");
		const startDate = formatDate(this.date.startDate);
		this.template.find("[name=startDt]").val(startDate);

		// 등록기간 종료 날짜는 한 달로 기본 셋팅
		let endDate = scheduler.date.add(this.date.startDate, 1, "month");
		endDate = formatDate(endDate);
		this.template.find("[name=endDt]").val(endDate);

		// 스케줄러에서 선택한 요일과 시간 설정
		this.template.find(`[name="week"][value="${this.date.startDate.getDay()}"]`).prop("checked", true);

		let formatTime = scheduler.date.date_to_str("%H");
		const startHour = formatTime(this.date.startDate);
		this.template.find("[name=startHour]").val(startHour);

		formatTime = scheduler.date.date_to_str("%i");
		const startMinute = formatTime(this.date.startDate);
		this.template.find("[name=startMinute]").val(startMinute);

		// 수업 공지사항 캐쉬 삭제
		this.template.find("[name=lessonDescription]").empty();

		this.setNaverButton();
	},

	// 수정 시 템블릿 데이터 셋팅
	modifyPrepareTemplate : function() {
		const template = this.template;
		const scheduleInfo = this.scheduleInfo;

		// 참석 가능한 이용권 카운팅, 선택한 수업 목록
		let serviceList = [];
		template.find("[name=seqPartnerClass]:checked").each(function() {
			serviceList.push(this.parentNode.textContent);
		});
		document.getElementById("selectedTicket").innerHTML = serviceList.join(", ");
		document.getElementById("seqPartnerClass-count").innerHTML = serviceList.length;

		// 수업 기간 및 시간 설정
		const formatDate = scheduler.date.date_to_str("%Y-%m-%d");
		let startDate = new Date(scheduleInfo.start_dt);
		startDate = formatDate(startDate);
		template.find("[data-msg=scheduleDate]").text(startDate);
		template.find("[data-msg=classTime]").text(scheduleInfo.start_time + " ~ " + scheduleInfo.end_time);

		let lessonMaxNo = (scheduleInfo.lesson_maximum_no || scheduleInfo.reservation_limit_no);
		template.find("[name=seqPartnerLesson]").val(scheduleInfo.seq_partner_lesson);				// 그룹 수업
		template.find("[name=lessonName]").val(scheduleInfo.lesson_name);							// 수업 이름
		template.find("[name=openYn]").prop("checked", (scheduleInfo.open_yn == "Y"));				// 수업 공개 여부
		template.find("[name=seqPartnerCoach]").val(scheduleInfo.seq_partner_coach);				// 담당 강사
		template.find("[name=lessonMaximumNo]").val(lessonMaxNo);									// 수업 정원 인원
		template.find("[name=amount]").val(scheduleInfo.amount);									// 이용권 차감
		template.find("[name=amount]").prop("disabled", true);										// 이용권 차감(불가)
		template.find("[name=waitableLimitNo]").val(scheduleInfo.waitable_limit_no);				// 대기 가능 인원
		template.find("[name=lessonDescription]").val(scheduleInfo.lesson_description);				// 수업 공지사항

		if(scheduleInfo.auto_open_yn == "Y") {
			template.find("[name=autoOpenYn]").prop("checked", true);
			let autoOpenDate = new Date(scheduleInfo.auto_open_date);
			autoOpenDate = formatDate(autoOpenDate);
			template.find("[name=autoOpenDate]").val(autoOpenDate);
			let autoOpenTime = scheduleInfo.auto_open_time;
			autoOpenTime = (autoOpenTime < 10) ? "0" + autoOpenTime : "" + autoOpenTime;
			template.find("[name=autoOpenTime]").val(autoOpenTime);
			this._autoOpenYn();
		}

		// 수업 이미지 선택
		const seqPartnerSeatImage = scheduleInfo.seqPartnerSeatImage;
		if(seqPartnerSeatImage) {
			template.find("[name=seqPartnerSeatImage]").each(function() {
				if(this.value == seqPartnerSeatImage) this.checked = true;
			});
		}

		// 자리 예약 기능
		const totalSeat = scheduleInfo.totalSeat;
		const isActive = (totalSeat) ? true : false;
		template.find("[name=seatUseYn]").prop("checked", isActive);
		template.find("[name=totalSeat]").prop("disabled", isActive);
		template.find("[name=totalSeat]").val((Number(totalSeat) > 0) ? totalSeat : "");

		// 수업 정산
		if(scheduleInfo.cost) {
			const value = scheduleInfo.cost.zeroAttendanceYn;
			template.find("[name=zeroAttendanceYn][value=" + value + "]").prop("checked", true);
		}

		// 네이버 연동
		if(scheduleInfo.seq_partner_lesson) {
			ClassScheduleController.lessonDetail(scheduleInfo.seq_partner_lesson).then(data => {
				// 그룹수업 관리에서 네이버 연동 설정이 되지 않는 경우 데이터가 없다.
				if(!data.naver) return;

				// 그룹수업 팝업에서 네이버 연동을 한번도 설정하지 않은 경우 데이터가 없다.
				if(!scheduleInfo.naver) {
					scheduleInfo.naver = {};
					scheduleInfo.naver.seqPartnerLessonNaver = data.naver.seqPartnerLessonNaver;
					scheduleInfo.naver.bookingYn = "N";
					scheduleInfo.naver.stock = "";
					scheduleInfo.naver.openHoursAgo = 0;
				}

				// 해당 그룹수업의 네이버 연동 관련 데이터를 보관한다.
				scheduleInfo.naverLesson = data.naver;
				const isButton = (scheduleInfo.naverLesson.bookingYn == "Y") ? true : false;
				this.setNaverData(scheduleInfo);
				this.setNaverButton(isButton);
			}).catch(error => {
				console.log(error);
				alert("삭제된 그룹 수업 또는 오류로 인해\n그룹 수업 정보를 가져오는데 실패하였습니다.");
				template.find("[name=seqPartnerLesson]").val("");
			});
		} else {
			this.setNaverButton();
		}
	},

	// 그룹 수업 선택 시 프리셋 시킨다. (수업 수정 시와는 기능 구현과 파라미터 명에 차이가 있다.)
	presetTemplate : function(data) {
		const template = this.template;

		// 참석 가능한 이용권 카운팅, 선택한 수업 목록
		let serviceList = [];
		template.find("[name=seqPartnerClass]").each(function() {
			this.checked = false;
			data.serviceList.forEach(item => {
				if(item.seqPartnerService == this.value) {
					this.checked = true;
					serviceList.push( this.parentNode.textContent);
				}
			});
		});
		document.getElementById("selectedTicket").innerHTML = serviceList.join(", ");
		document.getElementById("seqPartnerClass-count").innerHTML = serviceList.length;

		template.find("[name=lessonName]").val(data.lessonName);							// 수업 이름
		template.find("[name=lessonMaximumNo]").val(data.lessonMaximumNo);					// 수업 정원 인원
		template.find("[name=amount]").val(data.amount);									// 이용권 차감
		template.find("[name=waitableLimitNo]").val(data.waitableLimitNo);					// 대기 가능 인원

		// 시간 프리셋
		let serviceTime = data.lessonTime;
		serviceTime = Math.ceil(serviceTime / 5) * 5;

		const startDate = this.template.find("[name=startDt]").val();
		const startHour = this.template.find("[name=startHour]").val();
		const startMinute = this.template.find("[name=startMinute]").val();

		const startTime = new Date(startDate + " " + startHour + ":" + startMinute);
		const endTime = scheduler.date.add(startTime, serviceTime, "minute");

		let formatTime = scheduler.date.date_to_str("%H");
		const endHour = formatTime(endTime);
		this.template.find("[name=endHour]").val(endHour);

		formatTime = scheduler.date.date_to_str("%i");
		const endMinute = formatTime(endTime);
		this.template.find("[name=endMinute]").val(endMinute);

		// 수업 이미지 선택
		const seqPartnerSeatImage = (data.image && data.image.seqPartnerSeatImage) ? data.image.seqPartnerSeatImage : "";
		template.find("[name=seqPartnerSeatImage]").each(function() {
			this.checked = (this.value == seqPartnerSeatImage) ? true : false;
		});

		// 자리 예약 기능
		const totalSeat = (data.seat && data.seat.totalSeat) ? data.seat.totalSeat : "";
		const isActive = (totalSeat) ? true : false;
		template.find("[name=seatUseYn]").prop("checked", isActive);
		template.find("[name=totalSeat]").prop("disabled", isActive);
		template.find("[name=totalSeat]").val((Number(totalSeat) > 0) ? totalSeat : "");

		// 수업 정산
		if(data.cost) {
			const value = data.cost.zeroAttendanceYn;
			template.find("[name=attendanceType]").find("option[value=" + data.cost.attendanceType + "]")[0].setAttribute("selected", true);
			template.find("[name=zeroAttendanceYn][value=" + value + "]").prop("checked", true);
			addClassPopupTemplate._paymentList(data.cost.costList);
		}

		// 네이버 연동
		if(!data.naver) {
			data.naver = {
				bookingYn : "N"
			}
		}
		const bookingYn = data.naver.bookingYn;
		data.naver.bookingYn = "N";
		data.naver.stock = "";
		data.naver.openHoursAgo = 0;
		data.naverLesson = data.naver;
		this.setNaverButton((bookingYn == "Y") ? true : false);
		this.setNaverData(data);
	},

	setNaverData : function(data) {
		const template = this.template;
		const price = (data.naverLesson.freeYn == "Y") ? 0 : data.naverLesson.price;
		template.find("[name=seqPartnerLessonNaver]").val(data.naverLesson.seqPartnerLessonNaver);
		template.find("[name=bookingYn]").prop("checked", ((data.naver.bookingYn == "Y") ? true : false));
		template.find("[name=naverLessonName]").val(data.naverLesson.naverLessonName);
		template.find("[name=normalPrice]").val(data.naverLesson.normalPrice);
		template.find("[name=price]").val(price);
		const select = template.find("[name=openHoursAgo]")[0];
		select.value = data.naver.openHoursAgo;
		select.options[select.selectedIndex].setAttribute("selected", "");

		template.find("[name=stock]").val(data.naver.stock);
		template.find("[name=description]").val(data.naverLesson.description);
		addClassPopupTemplate._naverDiscountRate(data.naverLesson.normalPrice, price);
		addClassPopupTemplate._naverImageList(data.naverLesson.imageList);
	},

	// 네이버 버튼 설정
	setNaverButton : function(isActive) {
		const self = addClassPopup;
		self.naverButton = undefined;

		let color = (isActive) ? "black" : "gray";
		let disabled = (isActive) ? false : true;
		let name = (isActive) ? "설정하기" : "설정하기 : 미사용";
		let display = "block";
		let href = "/partner/naver";
		let text = "<u>네이버 예약 서비스 기본 설정 바로가기</u>";

		let isNaver = (!this.data.naverInfo || !this.data.naverInfo.info) ? false : true;
		if(isNaver) {
			// 연동하지 않은 경우
			if(!this.data.naverInfo.info.naverBusinessId) isNaver = false;
			// 비활성화된 경우
			if(this.data.naverInfo.info.naverUseYn != "Y") {
				isNaver = false;
				text = "기능이 비활성화되었습니다. 고객센터에 문의해 주세요.";
				href = "";
			}
		}

		if(!isNaver) {
			disabled = true;
			color = "gray disabled";
			name = "설정불가";
			display = "none";

			const a = self.template.find("#naverButton button + a")[0];
			if(!href) {
				a.removeAttribute("href");
			}
			else a.setAttribute("href", href);
			a.innerHTML = text;
		}

		const button = self.template.find("#naverButton button");
		button.prop("class", color);
		button.prop("disabled", disabled);
		button.css("display", display);
		button.html(name);

		self.detail("cancel", this);
	},

	// 셀렉트 박스
	_setSelect : function(object) {
		object.querySelectorAll("option").forEach(item => {
			item.removeAttribute("selected");
		});
		object.options[object.selectedIndex].setAttribute("selected", "");
	},

	// 네이버 도움말
	_setNaverTip : {
		open : function(object) {
			const table = document.querySelector(".ui-popup #popup-detail-3 table");
			const div = object.querySelector("div");
			div.style.width = table.offsetWidth + "px";
			object.classList.add("focus");
		},
		close : function(object) {
			object.classList.remove("focus");
		}
	},

	// 수업 등록
	register : function() {
		const formData = this.formData();

		const isContinue = this.checkData(formData);
		if(!isContinue) return false;

//		console.log(formData);
		ClassScheduleController.insert(formData, function(resultData) {
			if (resultData.resultCode !== '000') {
				alert("제약사항에 의해 작업을 완료하지 못했습니다.");
				return false;
			}
			alert("수업이 등록되었습니다.");
			addClassPopup.close();
		});
	},

	// 다음 수업 등록
	nextRegister : function() {
		const formData = this.formData();

		const isContinue = this.checkData(formData);
		if(!isContinue) return false;
		const template = this.template;

		ClassScheduleController.insert(formData, function(resultData) {
			if (resultData.resultCode !== "000") {
				alert("제약사항에 의해 작업을 완료하지 못했습니다.");
				return false;
			}
			alert("수업이 등록되었습니다.\n다음 수업 팝업을 준비합니다.");
			schedulePopup.resetReload();

			template.find("[name=week]").prop("checked", false);
			template.find("[name=seqPartnerCoach] option").eq(0).prop("selected", true);
			template.find("[name=startHour] option").eq(0).prop("selected", true);
			template.find("[name=startMinute] option").eq(0).prop("selected", true);
			template.find("[name=endHour] option").eq(0).prop("selected", true);
			template.find("[name=endMinute] option").eq(0).prop("selected", true);
		});
	},

	// 수업 수정
	update() {
		const scheduleInfo = this.scheduleInfo;
		const formData = this.formData();
		const submitData = {
			seqPartnerClassSchedule				: (scheduleInfo.seq_partner_class_schedule) ? scheduleInfo.seq_partner_class_schedule : "",

			openYn								: formData.lesson.openYn,
			seqPartnerCoach						: formData.lesson.seqPartnerCoach,
			lessonDescription					: formData.lesson.lessonDescription,

			lessonName							: formData.lesson.lessonName,
			coachPay							: formData.lesson.coachPay,
			amount								: formData.lesson.amount,							// 새롭게 추가
			lessonMaximumNo						: formData.lesson.lessonMaximumNo,					// 새롭게 추가
			reservationLimitNo					: formData.lesson.reservationLimitNo,
			waitableLimitNo						: formData.lesson.waitableLimitNo,

			classScheduleImage	: {
				seqPartnerClassScheduleImage	: (scheduleInfo.seqPartnerClassScheduleImage) ? scheduleInfo.seqPartnerClassScheduleImage : "",
				seqPartnerSeatImage 			: formData.lesson.seqPartnerSeatImage
			},

			classScheduleSeat	: {
				seqPartnerClassScheduleSeat		: (scheduleInfo.seqPartnerClassScheduleSeat) ? scheduleInfo.seqPartnerClassScheduleSeat : "",
				totalSeat						: formData.lesson.totalSeat
			},

			classScheduleCost	: {				// 새롭게 추가
				attendanceType					: formData.cost.attendanceType,
				zeroAttendanceYn				: formData.cost.zeroAttendanceYn,
				classScheduleCostList			: formData.cost.costList
			},

			seqPartnerClassList					: formData.searchParamListMap.seqPartnerClass,		// 새롭게 추가

			autoOpenYn							: (this.template.find("[name=autoOpenYn]").is((":checked")) ? "Y" : "N"),
			autoOpenDate						: this.template.find("[name=autoOpenDate]").val(),
			autoOpenTime						: this.template.find("[name=autoOpenTime]").val(),
		};

		if(formData.naver) {
			submitData.classScheduleNaver = {
				seqPartnerLessonNaver	: formData.naver.seqPartnerLessonNaver,
				bookingYn				: formData.naver.bookingYn,
				openHoursAgo			: formData.naver.openHoursAgo,
				stock					: formData.naver.stock
			}
		}

		const checkList = [
			"autoOpenYn", "seqPartnerCoach", "lessonMaximumNo", "attendanceType", "zeroAttendanceYn", "classScheduleCostList",
			"lessonName", "seqPartnerClass", "amount", "naver"
		];

		if(!this.checkData(submitData, checkList)) return;

//		console.log(submitData);
		ClassScheduleController.update(submitData).then(function() {
			alert("수업이 수정되었습니다.");
			addClassPopup.close();
		}).catch(error => {
			alert("오류가 발생하였습니다.");
			console.log(error);
		});
	},

	// 수업 선택 시 그룹 수업 저장된 정보
	selectLesson(object) {
		const id = Number(object.value);
		if(!id) {
			this.setNaverButton(false);
			return;
		}

		ClassScheduleController.lessonDetail(id).then(function(data) {
			addClassPopup.presetTemplate(data);
		}).catch(error => {
			alert("오류가 발생하였습니다.\n그룹 수업 정보를 가져오는데 실패하였습니다.");
			console.log(error);
		});
	},

	// 입력한 폼 데이터 리턴
	formData() {
		let weekList = [];
		this.template.find("[name=week]:checked").each(function() {
			weekList.push($(this).val());
		});

		let serviceList = [];
		this.template.find("[name=seqPartnerClass]:checked").each(function() {
			const value = this.value;
			if(value) serviceList.push(value);
		});

		const startTime = this.template.find("[name=startHour]").val() + ":" + this.template.find("[name=startMinute]").val();
		const endHour = this.template.find("[name=endHour]").val();
		const endMinute = this.template.find("[name=endMinute]").val();
		const endTime = (endHour && endMinute) ? endHour + ":" + endMinute : "";

		if(!this.template.find("[name=seatUseYn]").is(":checked"))
			this.template.find("[name=totalSeat]").value = "";

		const costList = this.payment("list");
		const coachPay = (costList[0]) ? costList[0].lessonCost : 0;

		const data = {
			lesson : {
				seqPartnerLesson		: this.template.find("[name=seqPartnerLesson]").val(),
				startDt					: this.template.find("[name=startDt]").val(),
				endDt					: this.template.find("[name=endDt]").val(),
				startTime				: startTime,
				endTime					: endTime,
				openYn					: (this.template.find("[name=openYn]").is((":checked")) ? "Y" : "N"),
				coachName				: this.template.find("[name=seqPartnerCoach] option:selected").text(),
				seqPartnerCoach			: this.template.find("[name=seqPartnerCoach]").val(),
				seatUseYn				: (this.template.find("[name=seatUseYn]").is((":checked")) ? true : false),
				totalSeat				: this.template.find("[name=totalSeat]").val(),

				lessonDescription		: this.template.find("[name=lessonDescription]").val(),
				lessonName				: this.template.find("[name=lessonName]").val(),
				amount					: this.template.find("[name=amount]").val(),
				lessonMaximumNo			: this.template.find("[name=lessonMaximumNo]").val(),
				reservationLimitNo		: this.template.find("[name=lessonMaximumNo]").val(),
				waitableLimitNo			: this.template.find("[name=waitableLimitNo]").val(),
				seqPartnerSeatImage		: this.template.find("[name=seqPartnerSeatImage]:checked").val(),

				className				: "",							// 사용하지 않음
				classTime				: 0,							// 사용하지 않음
				coachPay				: coachPay,						// 사용하지 않음(구간 별 수당 첫번째 구간 가격으로 설정)
				spaceName				: $("#placeList option:selected").text(),
				seqPartnerSpace			: $("#placeList").val(),

				autoOpenYn				: (this.template.find("[name=autoOpenYn]").is((":checked")) ? "Y" : "N"),
				autoOpenDate			: this.template.find("[name=autoOpenDate]").val(),
				autoOpenTime			: this.template.find("[name=autoOpenTime]").val()
			},

			searchParamListMap : {
				week					: weekList,						// 선택한 반복 요일 설정
				seqPartnerClass			: serviceList,					// 선택한 수업 이용권 목록
			},

			cost 						: {
				attendanceType			: this.template.find("[name=attendanceType]").val(),
				zeroAttendanceYn		: this.template.find("[name=zeroAttendanceYn]:checked").val(),
				costList				: costList
			},

			naver						: {
				seqPartnerLessonNaver	: this.template.find("[name=seqPartnerLessonNaver]").val(),
				bookingYn				: (this.template.find("[name=bookingYn]").is((":checked")) ? "Y" : "N"),
				openHoursAgo			: this.template.find("[name=openHoursAgo]").val(),
				stock					: this.template.find("[name=stock]").val(),
			}
		};

		// 네이버 예약 저장 버튼을 클릭하지 않은 경우
		if(this.naverButton == undefined) {
			delete data.naver;
		}
		return data;
	},

	// 입력한 폼 데이터 체크
	checkData(formData, checkList) {
		const mode = addClassPopupTemplate.mode;
		const isSerialize = function(array, min, max) {
			for(let i = 0; i < array.length; i++) {
				let start = array[i].minimumAttendance;
				let end = array[i].maximumAttendance;
				if(i == 0 && start != min) return false;
				if(array[i + 1]) {
					let nextStart = array[i + 1].minimumAttendance;
					if(end + 1 != nextStart) return false;
				} else {
					if(end != max) return false;
				}
			}
			return true;
		}

		const getObject = function(object, name) {
			for(let i in object) {
				let value = object[i];
				if(typeof value == "object" && !Array.isArray(value)) {
					value = getObject(value, name);
					if(value != undefined) return value;
				} else if(i == name) {
					return value;
				}
			}
		};

		if(!checkList) checkList = [
			"seqPartnerLesson", "startDt", "endDt", "week", "startTime", "endTime", "autoOpenYn", "seqPartnerCoach",
			"lessonMaximumNo",	"attendanceType", "zeroAttendanceYn", "costList",
			"lessonName", "seqPartnerClass", "amount", "naver"
		];

		let error = "";

		for(let name of checkList) {
			let value = getObject(formData, name);
			let isArray = Array.isArray(value);
			let isEmpty = (isArray) ? (value.length == 0) : (value == "");
			switch(name) {
				case "seqPartnerLesson"		: if(value == "") error = "그룹 수업을 선택해 주세요."; break;
				case "startDt"				: if(isEmpty) error = "수업 시작 날짜를 설정해 주세요."; break;
				case "endDt"				:
					if(isEmpty) error = "수업 종료 날짜를 설정해 주세요.";
					else {
						const startDate = Number(getObject(formData, "startDt").replace(/-/g, ""));
						const endDate = Number(getObject(formData, "endDt").replace(/-/g, ""));
						if(endDate < startDate) error = "수업 종료 날짜를 수업 시작 날짜 보다 크게 설정해 주세요.";
					}
					break;
				case "startTime"			: if(isEmpty) error = "수업 시작 시간을 선택해 주세요."; break;
				case "endTime"				:
					if(isEmpty) error = "수업 종료 시간을 선택해 주세요.";
					else {
						const startTime = Number(getObject(formData, "startTime").replace(":", ""));
						const endTime = Number(getObject(formData, "endTime").replace(":", ""));
						if(endTime <= startTime) error = "수업 종료 시간를 수업 시작 시간 보다 크게 선택해 주세요.";
					}
					break;
				case "week"					: if(isEmpty) error = "등록할 요일을 선택하여 주십시오."; break;
				case "seqPartnerCoach"		: if(isEmpty) error = "강사를 선택해 주세요."; break;
				case "lessonName"			: if(isEmpty) error = "수업 이름을 입력해 주세요."; break;
				case "classScheduleService" :
				case "seqPartnerClass"		: if(isEmpty) error = "참석 가능한 이용권을 선택해 주세요."; break;
				case "amount"				: if(isEmpty) error = "이용권 차감횟수를 입력해 주세요."; break;
				case "lessonMaximumNo"		: if(value == "") error = "수업 정원 인원을 입력해 주세요."; break;
				case "attendanceType"		: if(isEmpty) error = "수업 참석자 기준을 입력해 주세요."; break;
				case "zeroAttendanceYn"		: if(isEmpty) error = "0명 참석시 정산 여부를 입력해 주세요."; break;
				case "autoOpenYn"			:
					const autoOpenYn = getObject(formData, "autoOpenYn");
					const autoOpenDate = getObject(formData, "autoOpenDate");
					const autoOpenTime = getObject(formData, "autoOpenTime");

					if(autoOpenYn == "Y") {
						if(!this._autoOpenDateCheck() || !this._autoOpenTimeCheck() || !(autoOpenDate && autoOpenTime)) {
							error = "수업 자동 공개 날짜와 시간을 설정해 주세요.";
						}
					}
					break;
				case "classScheduleCostList":
				case "costList"				:
					if(isEmpty) error = "구간 별 수당을 입력해 주세요.";

					// 사용자가 수업 정원 인원만 수정 후 바로 수정 버튼을 클릭할 수 있다.
					let min = (getObject(formData, "zeroAttendanceYn") == "Y") ? 0 : 1;
					let max = Number(getObject(formData, "lessonMaximumNo"));
					if(!isSerialize(value, min, max)) error = "수업 정산 버튼을 클릭해 구간 별 수당을 확인해 주세요.";
					break;
				case "naver"				:
					// 등록과 수정일 때 데이터 형식이 다르다.
					if(mode == "update") {
						if(!formData.classScheduleNaver) break;
					} else {
						if(!formData.naver || !formData.naver.seqPartnerLessonNaver) break;
						if(this.scheduleInfo.naverLesson && this.scheduleInfo.naverLesson.bookingYn != "Y") break;
					}
					const bookingYn = getObject(formData, "bookingYn");
					const openHoursAgo = getObject(formData, "openHoursAgo");
					const stock = getObject(formData, "stock");
					const stockMax = getObject(formData, "lessonMaximumNo");
					if(!(openHoursAgo && stock)) error = "수업 노출 시간 및 모집 인원을 설정해 주세요.";
					if(bookingYn == "Y" && (Number(stock) > Number(stockMax)))
						error = "네이버 모집 인원을 수업 정원(" + stockMax + "명)에 맞게 설정해 주세요.";
					break;
			}
			if(error) {
				alert(error);
				return false;
			}
		}
		return true;
	},

	// 상세 화면 관련 제어
	detail : function(command, button) {
		switch(command) {
			case "open" :
				var index = button.getAttribute("data-index");
				var input = document.querySelector("[name=lessonMaximumNo]");
				var value = input.value;

				if(index <= 3) {
					if(value == "") {
						alert("수업 정원 인원을 먼저 입력해 주세요.");
						return;
					}
				}

				if(index == 1) {
					if(addClassPopupTemplate.mode == "update") {
						if (loginCoachData.permission.permissionSchedule.readClassCoachPay != true) {
							alert("수업 정산 조회 권한이 없습니다.");
							return;
						}
					}

					var input = document.querySelectorAll("[name=zeroAttendanceYn]");
					if(value == "0") {
						input[0].checked = true;
						document.getElementById("ui-payment").querySelector("input").value = 0;
					}
					input.forEach(function(item, index) {
						item.disabled = (Number(value) == 0) ? true : false;
					});
				}

				//네이버 권한 체크 추가.
				if (index == 3) {
					if (loginCoachData.permission.permissionSchedule.naverSchedule != true) {
						alert("네이버 예약 설정 권한이 없습니다.");
						return;
					}
				}

				var div = document.getElementById("popup-detail-" + index);

				var isFocus = (div.classList.contains("focus")) ? true : false;

				var oldIndex = addClassPopup.detailInfo.index;
				if(oldIndex) this.detail("cancel");

				if(!isFocus) {
					div.classList.add("focus");
					var node = div.children[0];
					var cloneNode = node.cloneNode(true);
					this.detailInfo = {
						parentNode : div,
						node : node,
						cloneNode : cloneNode,
						index : index,
						button : button,
						buttonColor : button.className
						};
					button.className = "green";
				}
				break;

			case "close" :
				var button = addClassPopup.detailInfo.button;
				var buttonColor = addClassPopup.detailInfo.buttonColor;
				var div = addClassPopup.detailInfo.parentNode;
				div.classList.remove("focus");
				if(!button.disabled)
					button.className = buttonColor;
				this.detailInfo = {};
				break;

			case "cancel" :
				var node = addClassPopup.detailInfo.node;
				if(!node) return;
				var cloneNode = addClassPopup.detailInfo.cloneNode;
				node.parentNode.replaceChild(cloneNode, node);
				uiInput(cloneNode);
				this.detail("close");
				break;

			case "save" :
				var index = addClassPopup.detailInfo.index;
				var button = addClassPopup.detailInfo.button;
				var node = addClassPopup.detailInfo.node;

				switch (index) {
					case "1" :
						// 수업 참석자 기준, 미참석 여부, 구간 별 수당
						var isContinue = this.payment("check");
						if(!isContinue) return;
						break;

					case "2" :
						// 자리 예약 기능
						var isChecked = (document.querySelector("[name='seatUseYn']").checked) ? true : false;
						if(isChecked) {
							let seat = document.querySelector("[name='totalSeat']").value;
							let seatMax = document.querySelector("[name='lessonMaximumNo']").value;
							if(seat == "") {
								alert("룸 예약 자리 수를 입력해 주세요.");
								return;
							} else if(Number(seat) < Number(seatMax)) {
								alert("룸 예약 자리 수는 수업 정원 인원 보다 작을 수 없습니다.");
								return;
							}
						}
						break;

					case "3" :
						// 네이버 예약 기능
						let seatMax = document.querySelector("[name='lessonMaximumNo']").value;
						const openHoursAgo = Number(document.querySelector("[name='openHoursAgo']").value);
						const stock = document.querySelector("[name='stock']").value;
						if(!openHoursAgo) {
							alert("수업 노출 시간을 선택해 주세요.");
							return;
						} else if(!stock) {
							alert("네이버 모집 인원을 설정해 주세요.");
							return;
						} else if(Number(stock) < 1) {
							alert("네이버 모집 인원을 최소 1명 이상 설정해 주세요.");
							return;
						} else if(Number(stock) > Number(seatMax)) {
							alert("네이버 모집 인원을 수업 정원 인원(" + seatMax + "명)에 맞게 설정해 주세요.");
							return;
						}
						this.naverButton = true;
						break;

					case "4" :
						// 참석 가능한 이용권
						var checkedList = [];
						document.querySelectorAll("[name=seqPartnerClass]:checked").forEach(function(object) {
							if(object.value)
								checkedList.push(object.parentNode.lastChild.textContent);
						});
						if(!checkedList.length) {
							alert("참석 가능한 이용권을 선택해 주세요.");
							return;
						} else {
							document.getElementById("selectedTicket").innerHTML = checkedList.join(", ");
						}
						break;
				}
				this.detail("close");
				break;

			case "sync" :
				var value = document.querySelector("[name='lessonMaximumNo']").value;
				if(!document.querySelector("[name='seatUseYn']:checked")) value = "";
				document.querySelector("[name='totalSeat']").value = value;
				break;
		}
	},

	// 구간 별 수당 제어
	payment : function(command, object) {
		var max = Number(document.querySelector("[name='lessonMaximumNo']").value);
		var input = document.getElementById("ui-payment").getElementsByTagName("input");
		var isPreset  = function() {
			const node = document.querySelector("[name='zeroAttendanceYn']:checked");
			return (node) ? node.value : false;
		}

		switch(command) {
			case "insert" :
				var ul = object.parentNode.parentNode;
				var li = ul.getElementsByTagName("li");
				var clone = li[li.length - 2].cloneNode(true);
				var input = clone.getElementsByTagName("input");
				var end = Number(input[1].value);
				var isEnd = (input[1].value) ? true : false;
				var start = Number(end) + 1;

				for(let i = 0; i < input.length; i++)
					input[i].value = input[i].className = "";

				var error = "";
				if(start > max) error = "수업 정원 인원을 초과할 수 없습니다.";
				else if(!isPreset()) error = "미참석 시 정산 여부를 먼저 선택해 주세요.";
				else if(!isEnd) error = "입력하지 않은 구간이 있습니다.";
				if(error) {
					alert(error);
					return;
				}

				if(end < start) input[0].value = start;
				if(start == max) input[1].value = start;
				if(end == max) return;
				uiInput(clone);
				ul.insertBefore(clone, li[li.length - 1]);
				break;

			case "delete" :
				var li = object.parentNode.parentNode.parentNode;
				li.parentNode.removeChild(li);
				this.payment("auto");
				break;

			case "check" :
				var value1 = document.querySelector("[name='attendanceType']").value;
				var value2 = isPreset();
				var value3  = (input[input.length - 2].value == max) ? true : false;

				var error = "";
				if(!value1) error = "수업 참석자 기준를 선택해 주세요.";
				else if(!value2) error = "미참석 시 정산 여부를 선택해 주세요.";
				else if(!value3) error = "입력하신 수업 정원 인원(" + max + "명)에 맞게 구간 별 수당을 설정해 주세요.";

				if(!error) {
					var value4 = this.payment("list", true).length;
					if(value4 == 0) error = "구간 별 수당을 확인해 주세요.";
				}

				if(error) alert(error);
				return (error) ? false : true;

			case "list" :
				var array = [];
				var isError = false;

				for(let i = 0; i < input.length; i += 3){
					var start = input[i].value;
					var end = input[i + 1].value;
					var amount = input[i + 2].value;
					var isCorrect = (Number(start) <= Number(end)) ? true : false;

					if(object) {
						input[i].className = (start != "") ? "" : "error";
						input[i + 1].className = (end != "" && isCorrect) ? "" : "error";
						input[i + 2].className = (amount != "") ? "" : "error";
					}
					if(start != "" && end != "" && amount != "" && isCorrect)
						array.push({
							minimumAttendance : Number(start),
							maximumAttendance : Number(end),
							lessonCost : Number(amount)
						});
					else {
						isError = true;
						break;
					}
				}
				return (isError) ? [] : array;

			case "auto" :
				const preset = isPreset();
				input[0].value = (preset == "Y") ?  0 : 1;
				if(!max) return;

				for(let i = 0; i < input.length; i += 3) {
					let start = Number(input[i].value);
					let end = Number(input[i + 1].value);
					let isEnd = (input[i + 1].value) ? true : false;
					if(!isEnd) break;

					if(start > max) start = max;
					if(end > max) end = max;
					if(start > end) end = start;
					let nextStart = end + 1;
					if(nextStart > max) nextStart = max;

					input[i].value = start;
					input[i + 1].value = end;
					if(input[i + 3]) {
						input[i + 3].value = nextStart;
						if(end == max) {
							for(let j = i + 3; j < input.length; j += 3) {
								const li = input[j].parentNode.parentNode.parentNode;
								li.parentNode.removeChild(li);
							}
						}
					}
				}
				break;
		}
	},

	// 이용권 선택 카운팅
	_countTicket : function(object) {
		let name = object.name;
		let node = document.getElementsByName(name);
		if(!object.value) {
			let value = object.checked;
			for(let i = 1; i < node.length; i++)
				if(!node[i].disabled) node[i].checked = value;
		}
		let count = -1;
		for(let i = 1; i < node.length; i++) {
			if(!node[i].disabled)
				node[i].parentNode.parentNode.className = (node[i].checked) ? "focus" : "";
			if(node[i].checked) count++;
		}
		count = count + 1;
		let element = document.getElementById(name + "-count");
		if(element) element.innerHTML = count;
		return count;
	},

	// 입력 활성화 설정
	_activate : function(object) {
		const isDisable = (object.checked) ? false : true;
		let table = object;
		for(let i = 0; i < 10; i++){
			table = table.parentNode;
			if(table.tagName.toLowerCase() == "table") break;
		}
		const array = ["input", "select", "textarea"];
		for(let i = 0; i < array.length; i++) {
			const node = table.getElementsByTagName(array[i]);
			for(let j = 0; j < node.length; j++) {
				const isActive = (node[j].getAttribute("data-active") == "true") ? true : false;
				if(isActive && node[j].type != "checkbox") {
					node[j].disabled = (isDisable) ? true : false;
					if(isDisable) node[j].value = "";
				}
			}
		}
	},

	// 체크 박스 선택 취소
	_cancelSelect(object) {
		const name = object.name;
		const node = document.getElementsByName(name);
		node.forEach(function(item) {
			if(item != object) item.checked = false;
		});
	},

	// 자동수업공개
	_autoOpenYn(object) {
		let isActive = (document.querySelector("[name='openYn']:checked"));
		if(isActive) {
			if(object) {
				object.checked = false;
				alert("현재 수업을 공개로 설정하셨습니다.");
				return;
			}
			document.querySelector("[name='autoOpenYn']").checked = false;
		}

		isActive = (document.querySelector("[name='autoOpenYn']:checked"));
		const autoOpenDate = document.querySelector("[name='autoOpenDate']");
		const autoOpenTime = document.querySelector("[name='autoOpenTime']");
		autoOpenDate.disabled = autoOpenTime.disabled = (isActive) ? false : true;
		if(!isActive) autoOpenDate.value = autoOpenTime.value = "";
	},

	// 수업 자동 공개 날짜 검사
	_autoOpenDateCheck(object) {
		if(!object) object = document.querySelector("[name='autoOpenDate']");
		else document.querySelector("[name='autoOpenTime']").value = "";

		const value = object.value;
		if(!value) return false;

		const formatDate = scheduler.date.date_to_str("%Y%m%d");
		const today = Number(formatDate(new Date()));
		const day = Number(formatDate(new Date(object.value)));

		if(today > day) {
			alert("수업 자동 공개 일시를 확인해 주세요.");
			object.value = "";
			return false;
		}
		return true;
	},

	// 수업 자동 공개 시간 검사
	_autoOpenTimeCheck(object) {
		if(!object) object = document.querySelector("[name='autoOpenTime']");
		const value = object.value;
		if(value == "") return false;

		const isToday = function() {
			const formatDate = scheduler.date.date_to_str("%Y%m%d");
			const today = Number(formatDate(new Date()));
			let day = document.querySelector("[name='autoOpenDate']").value;
			day = Number(formatDate(new Date(day)));
			return (today == day) ? true : false;
		}

		const date = new Date();
		const currentHour = date.getHours();
		const selectHour = Number(value);
		if(isToday() && selectHour <= currentHour) {
			alert("수업 자동 공개 일시를 확인해 주세요.");
			object.value = "";
			return false;
		}

		return true;
	},
};





// 템플릿 랜더링 관련

const addClassPopupTemplate = {
	mode : undefined,

	setMode(mode) {
		this.mode = mode;
	},

	prepare : function() {
		return `
			<div class="ui-popup ui-schedule ui-style focus" data-popup="그룹 수업 등록하기">
				<div>
					<div>
						<div>
							<div class="top">
								<h2>
									${this.mode === 'create' ? '수업 등록하기' : '수업 수정하기'}
									<a data-action="팝업 닫기"></a>
								</h2>
							</div>

							<div class="middle">
								<div class="left">
									<table>
										<tr>
											<th>그룹수업 선택</th>
											<td>
												${this._lessonList()}
											</td>
										</tr>
										<tr class="period">
											<th>등록기간 설정</th>
											<td>${this._scheduleDate()}</td>
										</tr>
										${this._dayOfWeek()}
										<tr class="period">
											<th>수업 시간 설정</th>
											<td>${this._classTime()}</td>
										</tr>
										<tr>
											<td colspan="2">
												<p class="note">
													설정된 수업 등록기간 내에 선택한 요일과 시간에 수업이 반복적으로 자동 등록됩니다.
												</p>
											</td>
										</tr>
										<tr>
											<th>수업 공개 여부</th>
											<td class="ui-switch">
												<label><input name="openYn" type="checkbox" checked data-action="수업 공개 여부"><span></span><span>미공개</span><span>공개</span></label>
											</td>
										</tr>
										<tr>
											<th>수업 자동 공개 설정</th>
											<td class="autoOpen ui-checkbox">
												<label><input name="autoOpenYn" type="checkbox" data-action="수업 자동 공개 설정"><span></span>사용</label>
												<input class="calendar" type="text" name="autoOpenDate" data-action="수업 자동 공개 날짜 검사" disabled>
												<select name="autoOpenTime" data-action="수업 자동 공개 시간 검사" disabled>
													<option value="">시</option>
													${this.makeHourOptionHtml().join('')}
												</select>
											</td>
										</tr>
										<tr>
											<th>담당강사 설정</th>
											<td>
												${this._coachList()}
											</td>
										</tr>
										<tr>
											<th>수업 공지사항</th>
											<td>
												<textarea name="lessonDescription" maxlength="1000" placeholder="수업 공지사항은 해당 수업을 예약할 때 회원에게 노출됩니다."></textarea>
											</td>
										</tr>
									</table>
								</div>

								<div class="right">
									<table>
										<tr>
											<th>수업이름</th>
											<td><input id="lessonName" name="lessonName" type="text" maxlength="30"></td>
										</tr>
										<tr>
											<th>참석 가능한 이용권</th>
											<td>
												<button class="black" data-index="4" data-action="자세히 보기">설정하기</button>
												<div id="selectedTicket" class="ellipsis">선택한 수업이 없습니다.</div>
											</td>
										</tr>
										<tr>
											<th>이용권 차감횟수</th>
											<td class="unit"><input name="amount" type="integer" value="1" min="0"><span>회</span></td>
										</tr>
										<tr>
											<th>수업 정원 인원</th>
											<td class="unit"><input name="lessonMaximumNo" type="integer" min="0" data-action="동기화"><span>명</span></td>
										</tr>
										<tr>
											<th>대기가능 인원</th>
											<td class="unit"><input name="waitableLimitNo" type="integer" min="0"><span>명</span></td>
										</tr>
										<tr>
											<td colspan="2">
												<p class="note">
													예약 대기 인원을 설정하면 예약이 꽉 찼을 때 대기 신청을 받을 수 있고 예약 대기회원들은
													빈자리가 생기면 실시간으로 알람을 받을 수 있습니다.
												</p>
											</td>
										</tr>
										<tr>
											<th>수업이미지 선택</th>
											<td class="ui-image-list">
												<dl>${this._imageList()}</dl>
											</td>
										</tr>
										<tr>
											<td colspan="2">
												<p class="note">
													회원이 그룹수업 예약시, 수업이 진행되는 룸(장소)의 도면 이미지나 사진을 확인 할 수 있습니다.
													회원은 어플에서 등록된 이미지를 보고 수업 내 특정 자리를 선택해서 예약할 수 있습니다.
												</p>
											</td>
										</tr>
										<tr>
											<th>수업 정산</th>
											<td>
												<button class="black" data-index="1" data-action="자세히 보기">설정하기</button>
											</td>
										</tr>
										<tr>
											<th>자리 예약 기능</th>
											<td><button class="black" data-index="2" data-action="자세히 보기">설정하기</button></td>
										</tr>
										<tr id="naverButton" class="naverButton">
											<th class="naver"><img src="/resources/img/icon/icon_naver.png" /> 예약</th>
											<td>
												<button class="gray" data-index="3" data-action="자세히 보기" disabled>설정하기</button>
												<a href="/partner/naver"><u>네이버 예약 서비스 기본 설정 바로가기</u></a>
											</td>
										</tr>
									</table>

									<div id="popup-detail" class="detail">
										<div id="popup-detail-1">
											<table>
												<tbody>
													<tr>
														<th>수업 참석자 기준</th>
														<td>
															<select name="attendanceType" data-action="수업 참석자 기준">
																<option value="">수업 참석자 기준을 선택해 주세요.</option>
																${this._attendanceList()}
															</select>
														</td>
													</tr>
													<tr class="ui-radio">
														<th>0명 참석 시 정산 여부</th>
														<td>
															<label><input name="zeroAttendanceYn" type="radio" value="Y" data-action="구간 수정"><span></span>정산</label>
															<label><input name="zeroAttendanceYn" type="radio" value="N" data-action="구간 수정"><span></span>미정산</label>
														</td>
													</tr>
													<tr id="ui-payment" class="ui-payment">
														<th>구간 별 수당</th>
														<td>
															<ul>
																${this._paymentList()}
																<li><button class="white" data-action="구간 추가">+ 구간 추가</button></li>
															</ul>
														</td>
													</tr>
												</tbody>
												<tfoot>
													<tr>
														<td colspan="2">
															<button class="gray" data-action="자세히 보기 취소">취소</button>
															<button class="blue" data-action="자세히 보기 저장">저장</button>
														</td>
													</tr>
												</tfoot>
											</table>
										</div>

										<div id="popup-detail-2">
											<table>
												<tbody>
													<tr>
														<th>자리 예약 기능</th>
														<td class="ui-switch">
															<label><input name="seatUseYn" type="checkbox" data-action="입력 활성화"><span></span><span>미사용</span><span>사용</span></label>
														</td>
													</tr>
													<tr>
														<th>룸 예약 자리 수</th>
														<td class="unit"><input name="totalSeat" type="integer" min="0" data-active="true" disabled><span>명</span></td>
													</tr>
													<tr>
														<td colspan="2">
															<p class="note">
																등록한 자리는 1번부터 개수에 맞게 표기되며,<br>회원 예약 시 이미 예약된 자리와 예약 가능한 자리가 구분됩니다.
															</p>
														</td>
													</tr>
												</tbody>
												<tfoot>
													<tr>
														<td colspan="2">
															<button class="gray" data-action="자세히 보기 취소">취소</button>
															<button class="blue" data-action="자세히 보기 저장">저장</button>
														</td>
													</tr>
												</tfoot>
											</table>
										</div>
										<div id="popup-detail-3">
											<table>
												<colgroup><col/><col/></colgroup>
												<tbody>
													<tr class="ui-switch">
														<th>네이버 예약 기능</th>
														<td class="naver">
															<input type="hidden" name="seqPartnerLessonNaver">
															<label><input name="bookingYn" type="checkbox"><span></span><span>미사용</span><span>사용</span></label>
															<a href="/partner/naver">네이버 예약 서비스 기본 설정 바로가기</a>
														</td>
													</tr>
													<tr>
														<td colspan="2">
															<p class="note">해당 그룹수업을 네이버 예약 서비스를 통해 회원이 아닌 일반인에게도 노출할 수 있습니다.</p>
														</td>
													</tr>
													<tr>
														<th class="tip-naver">
															수업 노출 시간
															<a data-action="네이버 도움말">
																ⓘ
																<div>
																	<h5>네이버에서 해당 스케줄의 수업을 예약할 수 있도록 노출(공개)할 시간을 설정합니다.</h5>
																	네이버에서 스케줄을 노출하는 시간은 수업 시작시간 기준으로 설정할 수 있으며,
																	기존	회원이 예약할 수 있는 수업 공개 시간과 별도로 설정하게 됩니다.
																	즉, 기존회원은 2주 전부터 예약할 수 있고 수업 시작 24시간 전까지 예약완료가 안된 경우,
																	네이버에 스케줄을 자동 등록하고 수업의 남은 자리를 추가적으로 판매할 수 있습니다.
																</div>
															</a>
														</th>
														<td class="unit">
															<select name="openHoursAgo" value="" data-active="true" data-action="네이버 노출시간">
																<option class="dummy" value="">수업 노출 시간 선택</option>
																<option value="48">48시간 전</option>
																<option value="36">36시간 전</option>
																<option value="24">24시간 전</option>
																<option value="12">12시간 전</option>
																<option value="6">6시간 전</option>
																<option value="3">3시간 전</option>
																<option value="-1">즉시노출</option>
																<option value="0" style="display:none">미선택</option>
															</select>
														</td>
													</tr>
													<tr>
														<th class="tip-naver">
															네이버 모집 인원
															<a data-action="네이버 도움말">
																ⓘ
																<div>
																	<h5>해당 스케줄 수업에 네이버를 통해 모집할 최대 인원수를 설정합니다.</h5>
																	네이버 모집인원은 수업의 정원 이하로 설정해야 해야 합니다.
																	6명 정원 수업에 네이버 모집인원을 3명으로 설정할 경우, 최대 6명까지 기존 회원은 0~6명 예약할 수 있고 네이버에서는 0~3명 예약할 수 있습니다.
																</div>
															</a>
														</th>
														<td class="unit">
															<input name="stock" type="integer" min="0" data-active="true">
															<span>명</span>
														</td>
													</tr>
													<tr>
														<th>수업 이름</th>
														<td class="unit">
															<input name="naverLessonName" type="text" disabled>
														</td>
													</tr>
													<tr>
														<th>수업 회당 정상가</th>
														<td class="unit">
															<input name="normalPrice" type="integer" min="0" disabled data-action="네이버 할인비율"><span>원</span>
														</td>
													</tr>
													<tr>
														<th>수업 회당 할인가</th>
														<td class="unit">
															<input name="price" type="number" disabled data-action="네이버 할인비율"><span>원<span id="naverPriceRatio"></span></span>
														</td>
													</tr>
													<!--
														<tr>
															<th></th>
															<td class="naver">
																<p>정산시 네이버 수수료가 차감되며,<br>해당 수업의 수수료는 <b>3,500원(판매가격의 12%)</b> 입니다.</p>
																<a href="">네이버 정산 관리화면 바로가기</a>
															</td>
														</tr>
													-->
													<tr class="ui-upload">
														<th>네이버 등록 이미지</th>
														<td>
															<!--<label><input name="" type="file" accept="image/*" disabled><span>900px × 900px 이미지 사용 권장</span><button class="black">찾기</button></label>-->
															<div class="ui-attachment">
																<dl id="naverImageList"></dl>
															</div>
														</td>
													</tr>
													<tr>
														<th class="two">네이버 예약수업<br>공지사항</th>
														<td>
															<textarea name="description" maxlength="200" placeholder="해당 공지사항은 네이버 예약을 통해 수업을 등록하는 분들에게 노출됩니다 (200자 이내)" disabled></textarea>
														</td>
													</tr>
												</tbody>
												<tfoot>
													<tr>
														<td colspan="2">
															<button class="gray" data-action="자세히 보기 취소">취소</button>
															<button class="blue" data-action="자세히 보기 저장">저장</button>
														</td>
													</tr>
												</tfoot>
											</table>
										</div>

										<div id="popup-detail-4" class="ui-list ui-checkbox">
											<table>
												<thead>
													<tr>
														<td>
															<h5>참석 가능한 이용권</h5>
															<label>
																<input name="seqPartnerClass" type="checkbox" value="" data-action="이용권 카운팅">
																<span></span>
																<div>전체 선택<span>(복수 선택 가능)</span></div>
															</label>
															<div class="state">총 <var id="seqPartnerClass-count">0</var>개의 수업을 선택하였습니다.</div>
														</td>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td>
															<ul style="max-height:350px">${this._serviceList()}</ul>
														</td>
													</tr>
												</tbody>
												<tfoot>
													<tr>
														<td colspan="2">
															<button class="gray" data-action="자세히 보기 취소">취소</button>
															<button class="blue" data-action="자세히 보기 저장">저장</button>
														</td>
													</tr>
												</tfoot>
											</table>
										</div>
									</div>
								</div>
							</div>
							<div class="bottom">
								${this._funcBtn()}
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	},

	// 그룹 수업 목록
	_lessonList() {
		let data = addClassPopup.data.lessonList;
		data = data.map(function(item) {
			return `<option value="${item.seqPartnerLesson}">${item.lessonName} / ${item.lessonTime}분 / ${item.lessonMaximumNo}명</option>`;
		});

		data = data.join("");
		const isDisabled = (this.mode == "update") ? "disabled" : "";
		return `
			<select name="seqPartnerLesson" data-action="수업 선택" ${isDisabled}>
				<option value="">그룹수업을 선택해 주세요.</option>
				<option value="0">미선택</option>
				${data}
			</select>
		`;
	},

	// 참석 가능한 이용권 목록
	_serviceList() {
		const mode = this.mode;
		let selectedList = addClassPopup.scheduleInfo.seq_partner_class;
		selectedList = (mode == "update") ? (selectedList) ? selectedList.split("||") : [] : [];

		let data = addClassPopup.data.serviceList || [];

		let maxLength = 1;
		const groupList = {
			saleList : [],
			pauseList : [],
			removeList : [],
		};
		data.forEach(item => {
			const seqService = String(item.seqService || 0);
			const length = seqService.length;
			if(length > maxLength)
				maxLength = length;
			if(item.displayYn == "N")
				groupList.removeList.push(item);
			else if(item.saleYn == "N")
				groupList.pauseList.push(item);
			else
				groupList.saleList.push(item);
		});
		const li = [];
		for(let name in groupList) {
			const dataList = groupList[name];
//			const groupName = (name == "saleList") ? "판매 중인 서비스" : (name == "pauseList") ? "중지 중인 서비스" : "삭제된 서비스";
//			li.push(`<li class="group">${groupName}</li>`);
			dataList.forEach(item => {
				const isSelected = (mode == "update" && selectedList.indexOf((item.seqService).toString()) > -1) ? true : false;
				const isDisabled = (isSelected) ? "disabled" : "";
				const isChecked = (isSelected) ? "checked" : "";
				const isFocus = (isSelected) ? "focus" : "";
				const dayLimit = (item.dayLimit < 0) ? "무제한" : item.dayLimit + "회";
				const weekLimit = (item.weekLimit < 0) ? "무제한" : item.weekLimit + "회";
				const stateColor = (item.displayYn == "N") ? "red" : (item.saleYn == "N") ? "orange" : "green";
				const stateName = (item.displayYn == "N") ? "삭제" : (item.saleYn == "N") ? "중지" : "판매";
				li.push(`
					<li class="${isFocus} ${isDisabled}">
						<label>
							<input name="seqPartnerClass" type="checkbox" value="${item.seqService}" data-action="이용권 카운팅" ${isChecked} ${isDisabled}>
							<span></span>
							${item.serviceName} (일일 : ${dayLimit}, 주간 : ${weekLimit})
						</label>
						<span class="state ${stateColor}">${stateName}</span>
						<span class="sequence">#${item.seqService.zf(maxLength)}</span>
					</li>
				`);
			});
		}
		return li.join("");
	},

	// 수업 참석자 기준 목록
	_attendanceList() {
		const selected = (this.mode == "update") ? addClassPopup.scheduleInfo.cost.attendanceType : "";
		let data = addClassPopup.data.attendanceList;
		data = data.map(function(item) {
			const isSelected = (item.value == selected) ? "selected" : "";
			return `<option value="${item.value}" ${isSelected}>${item.title}</option>`;
		});
		return data.join("");
	},

	// 등록기간 설정
	_scheduleDate() {
		if(this.mode == "update") {
			return `
				<p class="block">
					<span class="date_set" data-msg="scheduleDate">YYYY-MM-DD</span>
				</p>
			`;
		} else {
			return `
				<p>
					<span class="date_set">
						<input class="calendar" type="text" name="startDt">
						<span>-</span>
						<input class="calendar" type="text" name="endDt">
					</span>
				</p>
			`;
		}
	},

	// 반복등록 요일 설정
	_dayOfWeek() {
		if (this.mode === 'create') {
			return `
				<tr>
					<th>반복등록 요일 설정</th>
					<td>
						<p class="schedule_set">
							<span style="display: inline-block; width: 100%;">
								<span class="week">
									<span>
										<input type="checkbox" name="week" value="1" id="week_01">
										<label for="week_01">월</label>
									</span>
									<span>
										<input type="checkbox" name="week" value="2" id="week_02">
										<label for="week_02">화</label>
									</span>
									<span>
										<input type="checkbox" name="week" value="3" id="week_03">
										<label for="week_03">수</label>
									</span>
									<span>
										<input type="checkbox" name="week" value="4" id="week_04">
										<label for="week_04">목</label>
									</span>
									<span>
										<input type="checkbox" name="week" value="5" id="week_05">
										<label for="week_05">금</label>
									</span>
									<span>
										<input type="checkbox" name="week" value="6" id="week_06">
										<label for="week_06">토</label>
									</span>
									<span>
										<input type="checkbox" name="week" value="0" id="week_00">
										<label for="week_00">일</label>
									</span>
								</span>
							</span>
						</p>
					</td>
				</tr>
			`;
		} else {
			return "";
		}
	},

	// 담당강사 설정
	_coachList() {
		let data = coachList.data;
		data = data.map(function(item) {
			return `<option value="${item.key}">${item.label}</option>`;
		});
		return `
			<p class="pop_set_cost">
				<select name="seqPartnerCoach">
					<option value="">강사를 선택해 주세요.</option>
					${data.join('')}
				</select>
			</p>
		`;
	},

	// 수업 시간 설정
	_classTime() {
		if (this.mode == "update") {
			return `
				<p class="block">
					<span class="time" data-msg="classTime"></span>
				</p>
			`;
		} else {
			return `
				<p>
					<span class="time">
						<select name="startHour">
							<option value="">시</option>
							${this.makeHourOptionHtml().join('')}
						</select>
						<span>:</span>
						<select name="startMinute">
							<option value="">분</option>
							${this.makeMinuteOptionHtml().join('')}
						</select>

						<span><i>~</i></span>

						<select name="endHour">
							<option value="">시</option>
							${this.makeHourOptionHtml().join('')}
						</select>
						<span>:</span>
						<select name="endMinute">
							<option value="">분</option>
							${this.makeMinuteOptionHtml().join('')}
						</select>
					</span>
				</p>
			`;
		}
	},

	// 수업 이미지 목록
	_imageList() {
		let data = addClassPopup.data.imageList;
		if(data.length == 0)
			return `<dd>센터에 등록된 룸 이미지가 없습니다.</dd>`;
		let result = [];
		for(let i = 0; i < 5; i++) {
			if(data[i]) {
				result.push(`<dd><label><input name="seqPartnerSeatImage" type="checkbox" value="${data[i].seqPartnerSeatImage}" data-action="이미지 선택 취소"><div><img src="${data[i].imageUrl}"/></div></label></dd>`);
			} else {
				result.push(`<dd></dd>`);
			}
		}
		return result.join("");
	},

	// 하단 기능 버튼
	_funcBtn() {
		if(this.mode === 'update') {
			return `
				<button type="button" class="ui-button gray" data-action="팝업 닫기">취소</button>
				<button type="button" class="ui-button blue" data-action="수업 수정">수업 수정</button>
			`;
		} else {
			return `
				<button type="button" class="ui-button gray" data-action="팝업 닫기">취소</button>
				<button type="button" class="ui-button blue" data-action="수업 등록">수업 저장</button>
				<button type="button" class="ui-button green" data-action="다음 수업">다음 수업</button>
			`;
		}
	},

	// 구간 별 수당
	_paymentList(data) {
		const scheduleInfo = addClassPopup.scheduleInfo;
		let mode = (data) ? "preset" : this.mode;

		let dataList = [null];
		if(mode == "update")
			dataList = scheduleInfo.cost.costList;
		else if(mode == "preset")
			dataList = data;

		let li = "";
		const template = function(item) {
			const start = (mode == "create") ? "" : item.minimumAttendance;
			const finish = (mode == "create") ? "" : item.maximumAttendance;
			const amount =  (mode == "create") ? "" : item.lessonCost;
			return `
				<li>
					<dl>
						<dd class="person"><input type="integer" min="0" value="${start}" disabled></dd>
						<dd>명 부터</dd>
						<dd class="person"><input type="integer" min="0" value="${finish}" data-action="구간 수정"></dd>
						<dd>명 까지</dd>
						<dd class="currency"><input type="integer" min="0" value="${amount}" data-action="구간 수정"></dd>
						<dd>원</dd>
						<dd><a data-action="구간 삭제">삭제</a></dd>
					</dl>
				</li>
			`
		};

		dataList.forEach(function(item) {
			li += template(item);
		});

		if(mode != "preset") return li;
		li += `<li><button class="white" data-action="구간 추가">+ 구간 추가</button></li>`;
		const ul = document.getElementById("ui-payment").getElementsByTagName("ul")[0];
		ul.innerHTML = li;
	},

	// 네이버 할인비율 표시
	_naverDiscountRate : function(normalPrice, price) {
		const div = document.getElementById("naverPriceRatio");
		if(!normalPrice || !price || normalPrice == price) {
			div.innerHTML = "";
			return
		}
		const ratio = 100 - parseInt(price * 100 / normalPrice);
		if(ratio > 0)
			div.innerHTML = "(정가대비 " + ratio + "% 할인)";
	},

	// 네이버 이미지 목록
	_naverImageList : function(data) {
		const dl = document.getElementById("naverImageList");
		let imageList = "";
		if(data && data.length > 0) {
			for(let i = 0; i < 3; i++) {
				if(data[i]) {
					imageList += `<dd><div><img src='${data[i].imageUrl}' /></div></dd>`;
				} else {
					imageList += "<dd></dd>";
				}
			}
		} else {
			imageList = `<dd style="padding-bottom:0; font-size:14px">등록된 이미지 없습니다.</dd>`;
		}
		dl.innerHTML = imageList;
	},

	// 수업 시간 설정의 시간 옵션
	makeHourOptionHtml : function() {
		const hourList = [];
		for (let i = 0; i <= 23; i++) {
			hourList.push(`<option value="${i.zf(2)}">${i.zf(2)} 시</option>`);
		}
		return hourList;
	},

	makeMinuteOptionHtml : function() {
		const minuteList = [];
		for (let i = 0; i <= 55;) {
			minuteList.push(`<option value="${i.zf(2)}">${i.zf(2)} 분</option>`);
			i += 5;
		}
		return minuteList;
	}
};
