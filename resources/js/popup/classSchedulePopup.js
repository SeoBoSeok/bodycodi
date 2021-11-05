const classSchedulePopup = {
	popup : undefined,
	data : {},

	setScheduleInfo(scheduleInfo) {
		this.data = this.render.data = scheduleInfo;
	},

	setEvent() {
		this.popup.find("[data-action='팝업 닫기']").on("click", function() {
			classSchedulePopup.close();
		});
	},

	setPermission() {
		this.render.isPermission = loginCoachData.permission.permissionSchedule.readClassCoachPay;
	},

	open() {
		const container = $("[data-popup-location='팝업 위치']");
		this.setPermission();
		container.append(this.template());
		const popup = container.find("[data-popup='수업 정보']");
		this.popup = popup;
		this.setEvent();
		popup.fadeIn(300);
	},

	close() {
		this.popup.fadeOut(300, function() {
			classSchedulePopup.popup.remove();
		});
	},

	template() {
		return `
			<div class="ui-popup ui-schedule ui-style focus" data-popup="수업 정보">
				<style type="text/css">
					.ui-popup > div > div					{max-width:1100px !important}
					.ui-popup table th						{width:140px; vertical-align:top}
					.ui-popup table th,
					.ui-popup table td						{padding:7.5px 0 !important; border:none !important; line-height:35px; text-align:left}				
					.ui-popup table p						{margin-top:7.5px; line-height:1.5}
					.ui-popup table ul						{margin-top:5px; line-height:2}
					.ui-popup table img						{margin-top:7.5px; width:70px; height:70px; border:1px solid #ddd; object-fit:cover}
				</style>			
				<div>
					<div>
						<div>
							<div class="top">
								<h2>
									수업 정보
									<a data-action="팝업 닫기"></a>						
								</h2>
							</div>
							<div class="middle">
								<div class="left">
									<table>
										<tr><th>수업 이름</th><td>${this.data.lesson_name}</td></tr>
										<tr><th>참석 가능한 이용권</th><td><p>${this.data.class_name.split("||").join(", ")}</p></td></tr>
										<tr><th>이용권 차감 횟수</th><td>${this.data.amount}회</td></tr>
										<tr><th>예약 가능 인원</th><td>${this.data.lesson_maximum_no}명</td></tr>
										<tr><th>대기 가능 인원</th><td>${this.data.waitable_limit_no}명</td></tr>
										<tr>
											<th>수업 기간</th>
											<td>
												${new Date(this.data.start_dt).format("yyyy-MM-dd")}
												-
												${new Date(this.data.end_dt).format("yyyy-MM-dd")}
											</td>
										</tr>
										<tr>
											<th>반복 요일</th>
											<td>${this.render.weekList()}</td>
										</tr>
										<tr>
											<th>수업 시간</th>
											<td>
												${this.data.start_time}
												:
												${this.data.end_time}
											</td>
										</tr>
										<tr><th>강사 정보</th><td>${this.data.coach_name}</td></tr>
										<tr>
											<th>예약 수업 메모</th>
											<td>
												<p>${this.data.lesson_description.replace(/(\n|\r\n)/g, "<br>")}</p>
											</td>
										</tr>
									</table>
								</div>
								<div class="right">
									<table>
										${this.render.attendanceType()}
										${this.render.zeroAttendanceYn()}
										${this.render.costList()}
										<tr>
											<th>자리 예약 기능</th>
											<td>${(this.data.totalSeat) ? this.data.totalSeat + "석" : "사용 안함"}</td>
										</tr>
										<tr>
											<th>수업이미지</th>
											<td>${(this.data.seatImage) ? `<img src="${this.data.seatImage}"/>` : "사용 안함"}</td>
										</tr>
									</table>
								</div>
							</div>
							<div class="bottom">
								<button class="ui-button" data-action="팝업 닫기">닫기</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		`;
	},

	render : {
		weekList() {
			let weekList = this.data.week;
			weekList = (Array.isArray(weekList)) ? weekList : [weekList];
			weekList = weekList.map(item => {
				return item.weekName();
			});
			return weekList.join(", ");
		},

		attendanceType() {
			const type = {"ALL" : "모든 출석과 결석", "ATTENDANCE" : "출석", "ABSENT" : "출석 + 차감된 결석"};
			if(this.isPermission) {
				return `
					<tr>
						<th>수업 참석자 기준</th>
						<td>${type[this.data.cost.attendanceType]}</td>
					</tr>
				`;
			}
			return "";
		},

		zeroAttendanceYn() {
			if(this.isPermission) {
				return `
					<tr>
						<th>0명 참석시 정산 여부</th>
						<td>${(this.data.cost.zeroAttendanceYn == "Y") ? "정산" : "미정산"}</td>
					</tr>
				`;
			}
			return "";
		},

		costList() {
			if(this.isPermission) {
				const costList = this.data.cost.costList.map(item => {
					return `<li>${item.minimumAttendance}명 ~ ${item.maximumAttendance}명 참석시 ${numberWithCommas(item.lessonCost)}원</li>`;
				});
				return `
					<tr>
						<th>구간 별 수당</th>
						<td><ul>${costList.join("")}</ul></td>
					</tr>
				`;
			}
			return "";
		}
	}
};
