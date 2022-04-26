const componentProductSetting = {
	reservation : {
		container : undefined,
		data : {},
		open : function(seqService) {
			serviceController.class.reservationInfo(seqService).then(data => {
				this.data = data;
				if(!this.data.reservationSettingInfo)
					this.data.reservationSettingInfo = {};
				this.data.seqService = seqService;
				this.render();
			}).catch(error => {
				console.log(error);
				alert("예약 설정 정보를 가져오는데 실패하였습니다.");
			});
		},
		render : function() {
			const self = this.event.self = this;
			this.container = document.querySelector("[data-id='setting-reservation']");
			this.container.innerHTML = this.template();
			this.event.prepare();
			uiEvent(this.container, {
				click : {
					submit : function() {self.event.submit();},
				},
				change : {
					useYn : function() {self.event.useYn();}
				}
			});
		},
		event : {
			useYn : function() {
				const useYn = this.self.container.getValue("useYn");
				const nodeList = this.self.container.querySelectorAll(".display");
				nodeList.forEach(item => {
					if(useYn == "N")
						item.classList.add("hidden");
					else
						item.classList.remove("hidden");
				});
			},
			check : function(data) {
				if(data.reservationPossibleTimeType == "I") {
					if(data.reservationPossibleTimeDay === "" || data.reservationPossibleTimeHour === "" || data.reservationPossibleTimeminute === "") {
						alert("예약 가능 시간을 입력해 주세요.");
						return false;
					}
				} else {
					data.reservationPossibleTimeDay = data.reservationPossibleTimeHour = data.reservationPossibleTimeminute = 0;

				}
				if(data.reservationChangeTimeType == "I") {
					if(data.reservationChangeTimeDay === "" || data.reservationChangeTimeHour === "" || data.reservationChangeTimeMinute === "") {
						alert("예약 변경/취소 가능 시간을 입력해 주세요.");
						return false;
					}
				} else {
					data.reservationChangeTimeDay = data.reservationChangeTimeHour = data.reservationChangeTimeMinute = 0;
				}
				return true;
			},
			submit : function() {
				const form = this.self.container;
				const seqService = this.self.data.seqService;
				const data = {
					settingRoute					: "CLASS",
					seqPartnerClass					: this.self.data.seqPartnerClass,
					seqPartnerReservationSetting	: this.self.data.reservationSettingInfo.seqPartnerReservationSetting || "",
					useYn							: form.getValue("useYn"),
					reservationPossibleTimeType		: form.getValue("reservationPossibleTimeType"),
					reservationPossibleTimeDay		: form.getValue("reservationPossibleTimeDay"),
					reservationPossibleTimeHour		: form.getValue("reservationPossibleTimeHour"),
					reservationPossibleTimeminute	: form.getValue("reservationPossibleTimeminute"),
					reservationChangeTimeType		: form.getValue("reservationChangeTimeType"),
					reservationChangeTimeDay		: form.getValue("reservationChangeTimeDay"),
					reservationChangeTimeHour		: form.getValue("reservationChangeTimeHour"),
					reservationChangeTimeMinute		: form.getValue("reservationChangeTimeMinute"),
					autoAbsenceYn					: form.getValue("autoAbsenceYn") || "Y",
					voucherMinusYn					: form.getValue("voucherMinusYn"),
					mustValidSpendNumberToWait		: form.getValue("mustValidSpendNumberToWait"),
					mustValidMaxReservationToWait 	: form.getValue("mustValidMaxReservationToWait"),
					mustValidWeekReservationToWait 	: form.getValue("mustValidWeekReservationToWait"),
					mustValidDayReservationToWait 	: form.getValue("mustValidDayReservationToWait")
				};

				if(!this.check(data)) return;

				serviceController.class.updateReservation(data).then(data => {
					alert("수정되었습니다.");
					this.self.open(seqService);
				}).catch(error => {
					uiError(error);
				});
			},
			prepare : function() {
				const data = this.self.data.reservationSettingInfo;
				const form = this.self.container;

				if(data.mustValidSpendNumberToWait === undefined || data.mustValidSpendNumberToWait === null)
					data.mustValidSpendNumberToWait = true;

				form.putValue("useYn", data.useYn);
				form.putValue("reservationPossibleTimeType", data.reservationPossibleTimeType);
				form.putValue("reservationPossibleTimeDay", data.reservationPossibleTimeDay || 0);
				form.putValue("reservationPossibleTimeHour", data.reservationPossibleTimeHour);
				form.putValue("reservationPossibleTimeminute", data.reservationPossibleTimeminute);
				form.putValue("reservationChangeTimeType", data.reservationChangeTimeType);
				form.putValue("reservationChangeTimeDay", data.reservationChangeTimeDay || 0);
				form.putValue("reservationChangeTimeHour", data.reservationChangeTimeHour);
				form.putValue("reservationChangeTimeMinute", data.reservationChangeTimeMinute);
				form.putValue("autoAbsenceYn", data.autoAbsenceYn);
				form.putValue("voucherMinusYn", data.voucherMinusYn);
				form.putValue("mustValidSpendNumberToWait", data.mustValidSpendNumberToWait);
				form.putValue("mustValidMaxReservationToWait", data.mustValidMaxReservationToWait);
				form.putValue("mustValidWeekReservationToWait", data.mustValidWeekReservationToWait);
				form.putValue("mustValidDayReservationToWait", data.mustValidDayReservationToWait);

				this.useYn();
			}
		},
		template : function() {
			const getHour = () => {
				const option = [];
				option.push(`<option value="">시</option>`);
				for(let i = 0; i < 24; i++) {
					const value = i.zf(2);
					option.push(`<option value="${i}">${value}</option>`);
				}
				return option.join("");
			};
			const getMinute = () => {
				const option = [];
				option.push(`<option value="">분</option>`);
				for(let i = 0; i < 60; i++) {
					const value = i.zf(2);
					option.push(`<option value="${i}">${value}</option>`);
				}
				return option.join("");
			};
			return `
				<form class="ui-form" onsubmit="return false" autocomplete="off">
					<div class="top">
						<ul>
							<li>
								<h4>우선 순위 설정</h4>
								<div>
									<label class="ui-input-radio">
										<input name="useYn" type="radio" value="N" checked="checked" data-event="useYn">
										<span></span>
										센터의 통합 설정을 적용
									</label>
								</div>
								<div>
									<label class="ui-input-radio">
										<input name="useYn" type="radio" value="Y" data-event="useYn">
										<span></span>
										개별 그룹 수업 설정을 적용
									</label>
								</div>
							</li>
							<li class="display hidden">
								<h4>예약 시간 설정</h4>
								<ul>
									<li>
										<h5>예약 가능 시간</h5>
										<div>
											<label class="ui-input-radio">
												<input name="reservationPossibleTimeType" type="radio" value="F" checked="checked">
												<span></span>
												수업 시작 전 항상 가능
											</label>
										</div>
										<div>
											<label class="ui-input-radio time">
												<input name="reservationPossibleTimeType" type="radio" value="I">
												<span></span>
												<span>수업 예약 가능한 시간 설정</span>
												<span>
													수업 시작
													<input name="reservationPossibleTimeDay" type="integer" min="0" value="0">
													일
													<select class="ui-select" name="reservationPossibleTimeHour">
														<option value="">시</option>
														${getHour()}
													</select>
													시
													<select class="ui-select" name="reservationPossibleTimeminute">
														<option value="">분</option>
														${getMinute()}
													</select>
													분 전까지 <span class="red">예약</span> 가능
												</span>
											</label>
										</div>
									</li>
									<li>
										<h5>예약 변경/취소 가능 시간</h5>
										<div>
											<label class="ui-input-radio">
												<input name="reservationChangeTimeType" type="radio" value="F" checked="checked">
												<span></span>
												수업 시작 전 항상 가능
											</label>
											<label class="ui-input-radio">
												<input name="reservationChangeTimeType" type="radio" value="X">
												<span></span>
												예약 후 변경 및 취소 불가
											</label>
											<label class="ui-input-radio">
												<input name="reservationChangeTimeType" type="radio" value="T">
												<span></span>
												당일 취소 및 변경 불가
											</label>
										</div>
										<div>
											<label class="ui-input-radio time">
												<input name="reservationChangeTimeType" type="radio" value="I">
												<span></span>
												<span>수업 취소/변경 가능한 시간 설정</span>
												<span>
											수업 시작
											<input name="reservationChangeTimeDay" type="integer" min="0" value="0">
											일
											<select class="ui-select" name="reservationChangeTimeHour">
												<option value="">시</option>
												${getHour()}
											</select>
											시
											<select class="ui-select" name="reservationChangeTimeMinute">
												<option value="">분</option>
												${getMinute()}
											</select>
											분 전까지 <span class="red">변경/취소</span> 가능
										</span>
											</label>
										</div>
									</li>
								</ul>
							</li>
							<li class="display hidden">
								<h4>결석 처리 기준 설정</h4>
								<div>
									<label class="ui-input-radio">
										<input name="autoAbsenceYn" type="radio" value="Y" checked="checked">
										<span></span>
										수업종료 시 자동결석 처리
									</label>
								</div>
								<div style="display:none">
									<label class="ui-input-radio">
										<input name="autoAbsenceYn" type="radio" value="N">
										<span></span>
										수업종료 시 자동결석 미처리
									</label>
								</div>
							</li>
							<li class="display hidden">
								<h4>결석 시 이용권 차감 유무 설정</h4>
								<ul>
									<li>
										<h5>결석 시 이용권 차감 유무<br>(결석 처리 시, 이용권 차감 유무 설정은 회원이 예약했을 때 설정값이 적용됩니다.)</h5>
										<div>
											<label class="ui-input-radio">
												<input name="voucherMinusYn" type="radio" value="Y">
												<span></span>
												이용권 차감
											</label>
										</div>
										<div>
											<label class="ui-input-radio">
												<input name="voucherMinusYn" type="radio" value="N" checked="checked">
												<span></span>
												이용권 미차감
											</label>
										</div>
									</li>
								</ul>
							</li>
							<li class="display hidden">
								<h4>그룹수업 대기신청 옵션 설정</h4>
								<ul>
									<li>
										<h5 class="black">이용권의 예약  +출석 횟수가 주간 이용횟수를 초과 시 추가 대기신청</h5>
										<label class="ui-input-radio">
											<input name="mustValidWeekReservationToWait" type="radio" value="true">
											<span></span>
											가능
										</label>
										<label class="ui-input-radio">
											<input name="mustValidWeekReservationToWait" type="radio" value="false" checked>
											<span></span>
											불가능
										</label>
									</li>
									<li>
										<h5 class="black">이용권의 예약 + 출석 횟수가 1일 이용횟수를 초과 시 대기신청</h5>
										<label class="ui-input-radio">
											<input name="mustValidDayReservationToWait" type="radio" value="true">
											<span></span>
											가능
										</label>
										<label class="ui-input-radio">
											<input name="mustValidDayReservationToWait" type="radio" value="false" checked>
											<span></span>
											불가능
										</label>
									</li>
									<li>
										<h5 class="black">이용권의 예약 횟수가 최대예약횟수를 초과 시 대기신청</h5>
										<label class="ui-input-radio">
											<input name="mustValidMaxReservationToWait" type="radio" value="true">
											<span></span>
											가능
										</label>
										<label class="ui-input-radio">
											<input name="mustValidMaxReservationToWait" type="radio" value="false" checked>
											<span></span>
											불가능
										</label>
									</li>
									<li>
										<h5 class="black">이용권의 사용(출석/결석) + 예약 횟수가 전체횟수를 초과 시 대기신청</h5>
										<label class="ui-input-radio">
											<input name="mustValidSpendNumberToWait" type="radio" value="true" checked>
											<span></span>
											가능
										</label>
										<label class="ui-input-radio">
											<input name="mustValidSpendNumberToWait" type="radio" value="false">
											<span></span>
											불가능
										</label>
									</li>
								</ul>
							</li>
						</ul>
					</div>
					<div class="bottom">
						<button class="ui-button green" data-event="submit">수정</button>
					</div>
				</form>
			`;
		},
		description : function() {
			return `
				<ul>
					<li>
						<h4>예약설정</h4>
						<p>센터의 그룹수업 이용권 예약 설정 값과 다를 시에는 해당 서비스에 대해서는 아래 설정값이 적용 됩니다. 단, 센터의 그룹수업 이용권 예약 설정을 다시 변경하면 아래 설정 값도 자동으로 변경되게 됩니다.</p>
					</li>
					<li>
						<h4>우선 순위 설정</h4>
						<p>센터의 그룹 수업 통합 설정과 개별 그룹수업 설정에 대한 우선 순위를 결정 합니다.</p>
					</li>
					<li>
						<h4>예약 시간 설정</h4>
						<p>회원이 가맹점 전용 멤버스 앱을 통하여 그룹수업 이용권를 예약할 수 있는 조건을 설정합니다. 그룹수업 이용권의 예약 가능 시간은 서비스 시작 시간부터 설정한 시간 이전에만 예약이 가능합니다. 예약 변경/취소 가능 시간이 지나면 회원은 더 이상 예약을 취소하거나 변경할 수 없습니다.</p>
					</li>
					<li>
						<h4>결석 처리 기준 설정</h4>
						<p>회원이 예약한 서비스의 종료 전까지 센터에 배치된 입장 체커(터치 스크린)에서 예약한 서비스를 선택하고, 입장하지 않거나 서비스 제공자(강사)가 코치 앱을 통해 출결처리를 하지 않은 경우 익일 오전 4시에 자동 결석으로 처리됩니다.</p>
					</li>
					<li>
						<h4>결석 시 이용권 차감 유무 설정</h4>
						<p>회원이 결석처리가 되었을 경우 예약하기 위해 사용했던 이용권의 남은 횟수가 차감되거나 차감되지 않도록 설정할 수 있습니다. 이용권 차감으로 설정 시, 회원들에게 미리 예약하고 결석하면 남은 횟수가 차감된다는 사실을 알려주시기 바랍니다.</p>
					</li>
				</ul>
			`;
		}
	},

	schedule : {
		container : undefined,
		data : {},
		open : function(seqService) {
			serviceController.place.scheduleInfo(seqService).then(data => {
				this.data = {
					seqService : seqService,
					seqPartnerPlace : data.seqPartnerPlace,
					scheduleList : (data.placeMemberSchedule || []).map(item => {
						return {
							seqPartnerPlaceSchedule : item.seq_partner_place_schedule,
							week : item.week,
							startTime : item.start_time,
							endTime : item.end_time,
						};
					})
				};
				this.render();
			}).catch(error => {
				console.log(error);
				alert("스케줄 설정 정보를 가져오는데 실패하였습니다.");
			});
		},
		filter : function(data) {
			return data.map(item => {
				return {
					sequence : item.sequence,
					seqPartnerPlaceSchedule : item.seq_partner_place_schedule,
					week : item.week,
					startTime : item.start_time,
					endTime : item.end_time,
				};
			});
		},
		render : function() {
			this.container = document.querySelector("[data-id='setting-schedule']");
			this.container.innerHTML = this.template();
			this.prepare();

			const self = this.event.self = this;
			uiInput(this.container);
			uiEvent(this.container, {
				click : {
					create : function() {self.event.create();},
					submit : function() {self.event.submit();}
				}
			});
		},
		prepare : function() {
			const td = this.container.querySelectorAll("table tbody td");
			td.forEach(item => {item.innerHTML = ""});
			this.data.scheduleList.forEach(item => {
				const div = document.createElement("div");
				const week = (item.week == 0) ? 7 : item.week;
				td[week - 1].innerHTML += `
					<div>
						<a data-sequence="${item.seqPartnerPlaceSchedule || item.sequence}" data-event="remove"></a>
						<span>${item.startTime}</span>
						<span>${item.endTime}</span>
					</div>
				`;
			});
			const self = this;
			uiEvent(this.container, {
				click : {
					remove : function() {self.event.remove(this);},
				}
			});
		},
		update : function() {
			this.prepare();
			const input = this.container.querySelectorAll("input[type='number']");
			input.forEach(item => {
				item.value = "";
			});
		},
		event : {
			changeWeek : function() {
				const td = this.self.container.querySelectorAll("table tbody td");
				const input = this.self.container.querySelectorAll("[name='week']:checked");
				td.forEach(item => {
					item.classList.remove("active");
				});
				input.forEach(item => {
					const index = item.value;
					td[index].classList.add("active");
				});
			},
			create : function() {
				const container = this.self.container;
				const isHour = function(value) {
					if(value === "") return false;
					value = Number(value);
					return (0 <= value && value < 24) ? true : false;
				};
				const isMinute = function(value) {
					if(value === "") return false;
					value = Number(value);
					return (0 <= value && value < 60) ? true : false;
				}
				const weekList = container.querySelectorAll("[name='week']:checked");
				const startTimeHour = container.querySelector("[name='startTimeHour']").value;
				const startTimeMin = container.querySelector("[name='startTimeMin']").value;
				const endTimeHour = container.querySelector("[name='endTimeHour']").value;
				const endTimeMin = container.querySelector("[name='endTimeMin']").value;
				const startTime = startTimeHour.zf(2) + ":" + startTimeMin.zf(2);
				const endTime = endTimeHour.zf(2) + ":" + endTimeMin.zf(2);

				if(weekList.length == 0) {
					alert("이용 요일을 선택해 주세요.");
					return;
				}
				if(!(isHour(startTimeHour) && isMinute(startTimeMin) && isHour(endTimeHour) && isMinute(endTimeMin)) || getNumber(endTime) <= getNumber(startTime)) {
					alert("입력하신 시간을 확인해 주세요.");
					return;
				}
				const sequence = new Date().getTime();
				weekList.forEach((item, index) => {
					this.self.data.scheduleList.push({
						sequence : Number(index + "" + sequence),
						week : item.value,
						startTime : startTime,
						endTime : endTime,
					});
				});
				this.self.data.scheduleList = this.filter(this.self.data.scheduleList);
				this.self.update();
			},
			remove : function(object) {
				const div = object.parentNode;
				const sequence = Number(object.getAttribute("data-sequence"));
				this.self.data.scheduleList.forEach((item, index) => {
					if(item.seqPartnerPlaceSchedule == sequence || item.sequence == sequence) {
						div.parentNode.removeChild(div);
						this.self.data.scheduleList.splice(index, 1);
						this.self.update();
					}
				});
			},
			submit : function() {
				const seqService = this.self.data.seqService;
				const seqPartnerPlace = this.self.data.seqPartnerPlace;
				const data = this.self.data.scheduleList.map(item => {
					return {
						week : item.week,
						startTime : item.startTime,
						endTime : item.endTime
					};
				});
				serviceController.place.updateSchedule(seqPartnerPlace, data).then(data => {
					alert("수정되었습니다.");
					this.self.open(seqService);
				}).catch(error => {
					uiError(error);
				});
			},
			filter : function() {
				const data = this.self.data.scheduleList;
				const weekList = [];

				// 요일에 따라 배열을 분리시킨다.
				for(let i = 0; i < 7; i++) {
					weekList[i] = data.filter(item => {
						return (item.week == i) ? true : false;
					});
				}

				for(let i = 0; i < 7; i++) {
					/*
					// STEP 1. 시작시간 또는 종료시간 일부가 포함되는 경우 시간을 확장시킨다.
					weekList[i].forEach(itemA => {
						const startTimeA = getNumber(itemA.startTime);
						const endTimeA = getNumber(itemA.endTime);
						weekList[i].forEach(itemB => {
							const startTimeB = getNumber(itemB.startTime);
							const endTimeB = getNumber(itemB.endTime);
							if(!(startTimeA == startTimeB && endTimeA == endTimeB)) {
								if(startTimeA <= startTimeB && startTimeB <= endTimeA && endTimeA <= endTimeB) {
									itemA.endTime = itemB.endTime;
								} else if(startTimeB <= startTimeA && startTimeA <= endTimeB && endTimeB <= endTimeA) {
									itemA.startTime = itemB.startTime;
								}
							}
						});
					});

					// STEP 2. 시간이 겹쳐지는 경우 해당 내용을 제거한다.
					for(let j = 0; j < weekList[i].length; j++) {
						const itemA = weekList[i][j];
						if(itemA) {
							const startTimeA = getNumber(itemA.startTime);
							const endTimeA = getNumber(itemA.endTime);
							const indexA = j;
							weekList[i].forEach((itemB, indexB) => {
								const startTimeB = getNumber(itemB.startTime);
								const endTimeB = getNumber(itemB.endTime);
								if(indexA != indexB && startTimeB <= startTimeA && endTimeA <= endTimeB) {
									weekList[i].splice(indexA, 1);
									j--;
								}
							});
						}
					}
					*/
					// STEP 3. 시작 시간 순으로 정렬시킨다.
					weekList[i] = weekList[i].sort(function(a, b) {
						a = getNumber(a.startTime);
						b = getNumber(b.startTime);
						return (a == b) ? 0 : (a < b) ? -1 : 1;
					});
				}

				let result = [];
				for(let i = 0; i < 7; i++)
					result = result.concat(weekList[i]);
				return result;
			}
		},
		template : function() {
			const getHour = () => {
				const option = [];
				option.push(`<option value="">시</option>`);
				for(let i = 0; i < 24; i++) {
					const value = i.zf(2);
					option.push(`<option value="${value}">${value}</option>`);
				}
				return option.join("");
			};
			const getMinute = () => {
				const option = [];
				option.push(`<option value="">분</option>`);
				for(let i = 0; i < 60; i += 5) {
					const value = i.zf(2);
					option.push(`<option value="${value}">${value}</option>`);
				}
				return option.join("");
			};

			return `
				<form class="ui-form" onsubmit="return false" autocomplete="off">
					<div class="top">
						<ul>
							<li class="week">
								<h4>장소 이용 요일 선택</h4>
								<ul>
									<li><label><input name="week" type="checkbox" value="1" data-event="week"><span>월</span></label></li>
									<li><label><input name="week" type="checkbox" value="2" data-event="week"><span>화</span></label></li>
									<li><label><input name="week" type="checkbox" value="3" data-event="week"><span>수</span></label></li>
									<li><label><input name="week" type="checkbox" value="4" data-event="week"><span>목</span></label></li>
									<li><label><input name="week" type="checkbox" value="5" data-event="week"><span>금</span></label></li>
									<li><label><input name="week" type="checkbox" value="6" data-event="week"><span class="blue">토</span></label></li>
									<li><label><input name="week" type="checkbox" value="0" data-event="week"><span class="red">일</span></label></li>
								</ul>
							</li>
							<li class="time">
								<h4>장소 이용 시간 입력</h4>
								<dl>
									<dd><select class="ui-select" name="startTimeHour">${getHour()}</select></dd>
									<dd>:</dd>
									<dd><select class="ui-select" name="startTimeMin">${getMinute()}</select>
									<dd>-</dd>
									<dd><select class="ui-select" name="endTimeHour">${getHour()}</select></dd>
									<dd>:</dd>
									<dd><select class="ui-select" name="endTimeMin">${getMinute()}</select>
								</dl>
							</li>
							<li>
								<button class="ui-button" data-event="create" tabIndex>시간 배정</button>
							</li>
						</ul>
					</div>
					<div class="middle">
						<div class="ui-cutoff"><div></div></div>
						<table class="ui-table">
							<thead>
								<tr><td>월</td><td>화</td><td>수</td><td>목</td><td>금</td><td class="blue">토</td><td class="red">일</td></tr>
							</thead>
							<tbody>
								<tr>
									<td data-index="1"></td>
									<td data-index="2"></td>
									<td data-index="3"></td>
									<td data-index="4"></td>
									<td data-index="5"></td>
									<td data-index="6"></td>
									<td data-index="0"></td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="bottom">
						<button class="ui-button green" data-event="submit">수정</button>
					</div>
				</form>
			`;
		},
		description : function() {
			return `
			`;
		}
	},

	holiday : {
		container : undefined,
		data : {
			seqService : 0,
			serviceType : "",
			holidayList : []
		},
		open : function(serviceType, seqService) {
			serviceController[serviceType].holidayInfo(seqService).then(data => {
				this.data = {
					seqService : seqService,
					serviceType : serviceType,
					holidayList : (data.placeMemberHoliday || data.lessonMemberHoliday || []).map(item => {
						return new Date(item.off_day).format("yyyy-mm-dd");
					})
				};
				this.render();
			}).catch(error => {
				console.log(error);
				alert("휴일 정보를 가져오는데 실패하였습니다.");
			});
		},
		render : function() {
			const self = this.event.self = this;
			this.container = document.querySelector("[data-id='setting-holiday']");
			this.container.innerHTML = this.template();

			const calendar = this.event.calendar = uiCalendar(this.container);
			calendar.value = this.data.holidayList;
			calendar.callback = function(value) {
				self.event.update(value);
			}
			calendar.update();
			uiEvent(this.container, {
				click : {
					submit : function() {
						self.event.submit();
					}
				}
			});
		},
		event : {
			calendar : undefined,
			submit : function() {
				const seqService = this.self.data.seqService;
				const serviceType = this.self.data.serviceType;
				const data = this.self.data.holidayList.map(item => {
					return "holiday=" + new Date(item).format("yyyy.sm.sd").replace(/\s/g, "");
				});
				serviceController[serviceType].updateHoliday(seqService, data.join("&")).then(data => {
					alert("수정되었습니다.");
					this.self.open(serviceType, seqService);
				}).catch(error => {
					uiError(error);
				});
			},
			update : function(value) {
				this.self.container.putValue("count", value.length);
				const div = this.self.container.querySelector("[data-id='info']");
				const li = value.map(item => {
					return `<li><div>${uiDate(item)}<a data-date="${item}"></a></div></li>`;
				});
				div.innerHTML = (value.length) ? `<ul>${li.join("")}</ul>` : `<div class="empty">지정된 휴일이 없습니다.</div>`;

				const self = this;
				const a = div.querySelectorAll("a").forEach(item => {
					item.addEventListener("click", function() {
						self.calendar.remove(this.getAttribute("data-date"));
					});
				});
			}
		},
		template : function() {
			return `
				<form class="ui-form" onsubmit="return false" autocomplete="off">
					<div class="top">
						<ul>
							<li>
								<input name="calendar" type="calendar" non-popup multiple>
							</li>
							<li>
								<h4>지정된 휴일 <var class="blue" data-msg="count">0</var>일</h4>
								<div class="info" data-id="info">
									<ul></ul>
								</div>
							</li>
						</ul>
					</div>
					<div class="bottom">
						<button class="ui-button green" data-event="submit">수정</button>
					</div>
				</form>
			`;
		},
		description : function() {
			return `
				<ul>
					<li>
						<h4>휴일 설정</h4>
						<p>그룹수업의 휴강일을 설정할 수 있습니다. 센터의 휴일을 제외한 특정일의 수업을 휴강 처리 할 수 있습니다. (예시로 적어놓은겁니다.)</p>
					</li>
				</ul>
			`;
		}
	}
};

const popupConfirmBatch = {
	popup : undefined,
	callback : undefined,
	open : function(type, changeList, callback) {
		this.type = type;
		this.callback = callback;
		this.changeList = changeList || [];
		if(this.popup) return;
		this.render();
	},
	close : function() {
		this.popup = undefined;
		uiPopup();
	},
	submit : function() {
		const batchYn = this.popup.getValue("batchYn");
		if(!batchYn) {
			alert("일괄 변경 적용 여부를 선택해 주세요.");
			return;
		}
		if(this.callback)
			this.callback((batchYn == "Y"));
		this.close();
	},
	render : function() {
		const self = this;
		this.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					close : function() {
						self.close();
					},
					submit : function() {
						self.submit();
					}
				},
			}
		});
	},
	template : function() {
		const name = (this.type == "service") ? "서비스" : "가격정책";
		const getChangeList = () => {
			return (this.changeList.length == 0) ? "-" : this.changeList.join(", ");
		};
		return `
			<div class="tiny">
				<div class="top">
					<h2>
						일괄 변경 적용 여부
						<a data-event="close"></a>
					</h2>
				</div>
				<div class="middle">
					기존에 구매했던 모든 회원의 설정을 일괄 변경하시겠습니까?
					<p class="ui-note">
						변경된 내용 : ${getChangeList()}
					</p>
					<ul>
						<li style="margin-top:15px">
							<label class="ui-input-radio">
								<input name="batchYn" type="radio" value="Y">
								<span></span>
								네, 기존에 구매했던 모든 ${name}에 변경 내용을 일괄 변경합니다.
							</label>
						</li>
						<li style="margin-top:10px">
							<label class="ui-input-radio">
								<input name="batchYn" type="radio" value="N">
								<span></span>
								아니요, 현재 ${name}만 변경 내용을 적용합니다.
							</label>
						</li>
					</ul>
				</div>
				<div class="bottom">
					<button class="ui-button gray" data-event="close">취소</button>
					<button class="ui-button green" data-event="submit">수정</button>
				</div>
			</div>
		`;
	}
};
