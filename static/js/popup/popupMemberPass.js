const popupMemberPass = {
	permission : undefined,
	getStateName : function(state) {
		switch(state) {
			case "C" : return "취소";
			case "E" : return "출석";
			case "A" : return "결석";
			case "R" : return "예약";
			case "S" : return "출석요청";
			case "W" : return "예약대기";
			case "modify_schedule" : return "예약변경";
		}
		return "";
	},
	getStateColor : function(state, color) {
		switch(state) {
			case "C" : return (color) ? color : "gray";
			case "E" : return "green";
			case "R" : return "blue";
			case "S" : return "blue";
			case "A" : return "red";
		}
		return "";
	},
	getPermission : function(callback) {
		if(popupMemberPass.permission == undefined) {
			permissionController.getList().then(data => {
				popupMemberPass.permission = data;
				callback();
			}).catch(error => {
				popupMemberPass.permission = false;
				console.log(error);
			});
		} else {
			callback();
		}
	},

	// 개인레슨 강사변경
	changeCoach : {
		popup : undefined,
		data : {},
		callback : undefined,
		open : function(data, callback) {
			if(this.popup) return;
			this.data = data;
			this.callback = callback;
			this.render();
		},
		close : function() {
			this.popup = undefined;
			uiPopup();
		},
		submit : function() {
			const data = {
				seqMember : this.data.passInfo.seqMember,
				seqPassInfo : this.data.passInfo.seqPassInfo,
				seqPartnerCoach : Number(this.popup.querySelector("[name='seqPartnerCoach']").value)
			};
			ticketController.appointment.coachChange(data).then(data => {
				alert("변경되었습니다.");
				this.close();
				if(this.callback) this.callback();
				else window.location.reload();
			}).catch(error => {
				alert("강사 변경에 실패하였습니다.");
				console.log(error);
				this.close();
			});
		},
		render : function() {
			const self = this;
			self.popup = uiPopup({
				template : this.template(),
				event : {
					click : {
						close : function() {
							self.close();
						},
						submit : function() {
							self.submit();
						}
					}
				}
			});
		},
		template : function() {
			const seqPartnerCoach = this.data.passInfo.seqPartnerCoach;
			const getCoachList = () => {
				const option = this.data.coachList.map(item => {
					const selected = (item.seqPartnerCoach == seqPartnerCoach) ? "selected" : "";
					return `<option value="${item.seqPartnerCoach}" ${selected}>${item.coachName}</option>`
				});
				return option.join("");
			};
			const getCoachName = () => {
				const coach = this.data.coachList.filter(item => {
					return (item.seqPartnerCoach == seqPartnerCoach);
				})[0];
				return (coach) ? coach.coachName : "";
			};
			return `
				<div class="popup micro">
					<div class="top">
						<h2>개인레슨 강사변경<a data-event="close"></a></h2>
					</div>
					<div class="middle ui-form">
						<table>
							<tr>
								<th>현재 강사</th>
								<td>${getCoachName()}</td>
							</tr>
							<tr>
								<th>변경 강사</th>
								<td>
									<select class="ui-select" name="seqPartnerCoach">
										<option value="">선택해 주세요.</option>
										${getCoachList()}
									</select>
								</td>
							</tr>
						</table>
					</div>
					<div class="bottom">
						<button class="ui-button gray" data-event="close">취소</button>
						<button class="ui-button" data-event="submit">변경</button>
					</div>
				</div>
			`;
		}
	},

	// 사용(예약)내역
	usageList : {
		popup : undefined,
		data : {
			seqPassInfo : 0,
			serviceType : "",
			usageList : [],
		},
		callback : undefined,
		isUpdate: false,
		open : function(passName, serviceType, seqPassInfo, callback) {
			if(this.popup) return;
			ticketController.usageList[serviceType](seqPassInfo).then(data => {
				this.data = {
					passName : passName,
					seqPassInfo : seqPassInfo,
					serviceType : serviceType,
					usageList : data
				};
				this.callback = callback;
				this.render();
			}).catch(error => {
				uiError(error);
			});
		},
		close : function() {
			this.popup = undefined;
			uiPopup();
			if(this.callback) this.callback(this.isUpdate);
		},
		refresh : function() {
			this.isUpdate = true;
			const serviceType = this.data.serviceType;
			const seqPassInfo = this.data.seqPassInfo;
			ticketController.usageList[serviceType](seqPassInfo).then(data => {
				this.data.usageList = data;
				const self = this;
				const tbody = this.popup.querySelector("tbody");
				tbody.innerHTML = this.template.getBody();
				const input = this.popup.querySelectorAll("[data-event='check']");
				input.forEach(item => {
					item.addEventListener("click", function() {self.event.cancelChangeState(this);});
					item.addEventListener("change", function() {self.event.changeCheck(this);})
				});
				this.event.changeCheck();
			});
		},
		render : function() {
			const self = this.event.self = this;
			this.template.data = this.event.data = this.data;
			this.popup = this.event.popup = uiPopup({
				template : this.template.getTemplate(),
				event : {
					click : {
						close : function() {self.close();},
						submit : function() {self.submit();},
						state : function() {self.event.changeState(this);},
						check : function() {self.event.cancelChangeState(this);}
					},
					change : {
						check : function() {self.event.changeCheck(this);}
					}
				}
			})
		},
		event : {
			getData : function(seqSchedule) {
				const data = this.data.usageList.filter(item => {
					return (item.seq_schedule == seqSchedule) ? true : false;
				});
				return (data.length > 0) ? data[0] : undefined;
			},
			changeCheck : function(object) {
				this.data.seqSchedule = (object) ? object.value : 0;

				const button = this.popup.querySelectorAll(".bottom button");
				button.forEach(item => {
					item.classList.add("hidden");
				});
				if(object && object.checked) {
					const state = object.getAttribute("data-state");
					button[(state == "R" || state == "S") ? 0 : 1].classList.remove("hidden");
					button[(state == "E") ? 2 : 3].classList.remove("hidden");
					if(state == "R" || state == "S") button[2].classList.remove("hidden");
				} else {
					button[4].classList.remove("hidden");
				}
			},
			changeState : function(object) {
				const input = this.popup.querySelector("[name='seqSchedule']:checked");
				const seqSchedule = input.value;
				const beforeState = input.getAttribute("data-state");
				const changeState = object.getAttribute("data-state");
				const scheduleData = this.getData(seqSchedule);
				popupMemberPass.changeState.open(scheduleData, changeState);
			},
			cancelChangeState : function(object) {
				if(this.data.seqSchedule == object.value) {
					object.checked = false;
					this.changeCheck();
				}
			},
		},
		template : {
			getTitle : function() {
				return (this.data.passName) ? " : " + this.data.passName : "";
			},
			getData : function() {
				// 취소가 아닌 사용내역만 보여진다.
				return this.data.usageList.filter(item => {
					return (item.schedule_state != "C") ? true : false;
				});
			},
			getCheck : function(item) {
				// 해당 권한이 있는 경우에만 보여진다.
				const permission = popupMemberPass.permission;
				const type = item.schedule_type;
				const state = item.schedule_state;
				const checkbox = `
					<label class="ui-input-radio only">
						<input name="seqSchedule" type="radio" value="${item.seq_schedule}" data-state="${state}" data-event="check">
						<span></span>
					</label>
				`;
				switch(type) {
					case "appointment" :
						if((state == "E" || state == "A") &&
							permission.permissionSchedule.changeAppointmentScheduleState) return checkbox;
						else if((state == "R" || state == "S") &&
							permission.permissionSchedule.cancelAppointment) return checkbox;
						break;
					case "class" :
						if(state != "W") return checkbox;
						break;
				}
				return "";
			},
			getHead : function() {
				const type = this.data.serviceType;
				if(type == "appointment")
					return `<tr><td></td><td>이용 또는 예약 일시</td><td>상태</td><td>담당강사</td><td>차감횟수</td></tr>`;
				else
					return `<tr><td>구분</td><td>이용 또는 예약 일시</td><td>상태</td><td>수업이름</td><td>차감횟수</td></tr>`;
			},
			getBody : function() {
				const type = this.data.serviceType;
				const tr = this.getData().map(item => {
					const date = new Date(item.start_date).format("yyyy-mm-dd hh:MM");
					const state = item.schedule_state;
					const stateName = popupMemberPass.getStateName(state);
					const stateColor = popupMemberPass.getStateColor(state);
					const amount = (state == "A" && item.voucher_minus_yn == "N") ? 0 : item.lesson_amount;

					const getColumn = function() {
						if(type == "appointment") {
							return `<td>${item.coach_name}</td><td>${amount}</td>`;
						} else {
							return `<td class="left">${item.lesson_name}</td><td>${amount}</td>`
						}
					};
					return `
						<tr>
							<td>${this.getCheck(item)}</td>
							<td>${date}</td>
							<td class="${stateColor}">${stateName}</td>
							${getColumn()}
						</tr>
					`;
				});
				return (tr.length == 0) ? `<tr><td colspan="9">사용(예약)내역이 없습니다.</td></tr>` : tr.join("");
			},
			getSummary : function() {
				const countInfo = {E : 0, A : 0, R : 0};
				const amountInfo = {E : 0, A : 0, R : 0};
				this.getData().forEach(item => {
					const state = item.schedule_state;
					if(state == "E" || state == "A" || state == "R") {
						countInfo[state]++;
						amountInfo[state] += (state == "A" && item.voucher_minus_yn == "N") ? 0 : item.lesson_amount;
					}
				});
				return `
					<ul>
						<li><span class="green">출석</span> : ${getComma(countInfo.E)}건</li>
						<li><span class="red">결석</span> : ${getComma(countInfo.A)}건</li>
						<li><span class="blue">예약</span> : ${getComma(countInfo.R)}건</li>
						<li>/</li>
						<li>차감횟수(<span class="green">출석</span> + <span class="red">결석</span>) 합계 : ${getComma(amountInfo.E + amountInfo.A)}회</li>
					</ul>
				`;
			},
			getTemplate : function() {
				return `
					<style type="text/css">
						.popupUsageList .middle						{max-height:400px; overflow-y:auto}
						.popupUsageList .middle h4					{margin-bottom:10px; font-size:15px}
						.popupUsageList .middle > ul > li + li		{margin-top:25px}
						.popupUsageList .middle .ui-note			{margin:0; text-align:center}
						.popupUsageList .middle .ui-note li			{display:inline-block}
						.popupUsageList .middle .ui-note li + li	{margin-left:15px}
						.popupUsageList table td:first-child		{padding:0; width:35px}
						.popupUsageList table td[colspan]			{padding:8px 10px}
					</style>
					<div class="popupUsageList small">
						<div class="top">
							<h2>이용권 사용(예약)내역${this.getTitle()}<a data-event="close"></a></h2>
						</div>
						<div class="middle">
							<ul>
								<li>
									<h4 class="ui-sub-title">내역 개요</h4>
									<div class="ui-note blue">
										${this.getSummary()}
									</div>
								</li>
								<li>
									<h4 class="ui-sub-title">상세 내역</h4>
									<table class="ui-table dark even">
										<thead>
											${this.getHead()}
										</thead>
										<tbody>
											${this.getBody()}
										</tbody>
									</table>
								</li>
							</ul>
						</div>
						<div class="bottom">
							<button class="ui-button hidden gray" data-state="C" data-event="state">예약취소</button>
							<button class="ui-button hidden gray" data-state="C" data-event="state">내역취소</button>
							<button class="ui-button hidden red" data-state="A" data-event="state">결석처리</button>
							<button class="ui-button hidden green" data-state="E" data-event="state">출석처리</button>
							<button class="ui-button" data-event="close">닫기</button>
						</div>
					</div>
				`
			}
		}
	},

	// 출석처리 변경
	changeState : {
		popup : undefined,
		data : {},
		open : function(scheduleData, changeState) {
			if(this.popup) return;
			const type = scheduleData.schedule_type.toLowerCase();
			let data = {
				default : {
					seqPassInfo : scheduleData.seq_pass_info,
					seqPartner : scheduleData.seq_partner,
					seqMember : scheduleData.seq_member,
					seqCoach : scheduleData.seq_coach,
					startDate : new Date(scheduleData.start_date).format("yyyy-mm-dd hh:MM:ss"),
					endDate : new Date(scheduleData.end_date).format("yyyy-mm-dd hh:MM:ss"),
					nowState : scheduleData.schedule_state,
					scheduleState : changeState,
					voucherMinusYn : scheduleData.voucher_minus_yn
				},
				appointment : {
					seqSchedule : scheduleData.seq_schedule,
					seqPayment : scheduleData.seq_partner_payment,
					scheduleId : scheduleData.schedule_id,
				},
				class : {
					seqClass : scheduleData.seq_class,
					seqSchedule : scheduleData.seq_schedule,
					seqPartnerPayment : scheduleData.seq_partner_payment,
					seqPartnerProductPass : scheduleData.seq_partner_product_pass,
				}
			};
			data = Object.assign({}, data.default, data[type]);
			ticketController[type].ticketInfo(data).then(productData => {
				this.data = this.template.data = {
					beforeState : scheduleData.schedule_state,
					changeState : changeState,
					schedule : scheduleData,
					product : productData
				};
				this.render();
			}).catch(error => {
				alert("이용권 정보를 가져오는데 실패하였습니다.");
				console.log(error);
			});
		},
		close : function() {
			this.popup = undefined;
			uiPopup();
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
					}
				}
			});
		},
		submit : function() {
			const type = this.data.schedule.schedule_type;
			const beforeStateName = popupMemberPass.getStateName(this.data.beforeState);
			const changeStateName = popupMemberPass.getStateName(this.data.changeState);
			let data = {};
			if(type == "appointment") {
				data = {
					status					: this.data.changeState,
					nowState				: this.data.schedule.schedule_state,
					seqSchedule				: this.data.schedule.seq_schedule,
					scheduleId				: this.data.schedule.schedule_id,
					startDate				: new Date(this.data.schedule.start_date).format("yyyy-mm-dd hh:MM:ss"),
					endDate					: new Date(this.data.schedule.end_date).format("yyyy-mm-dd hh:MM:ss"),
					seqCoach				: this.data.schedule.seq_coach,
					title					: this.data.schedule.schedule_name.replace(beforeStateName, changeStateName),
					memberId				: this.data.schedule.seq_member,
					productId				: this.data.schedule.seq_product,
					productPassId			: this.data.schedule.seq_partner_product_pass,
					paymentId				: this.data.schedule.seq_partner_payment,
					memo					: this.data.schedule.memo,
					nonmemberName			: this.data.schedule.nonmember_name,
					nonmemberMobile			: this.data.schedule.nonmember_mobile,
					coachName				: this.data.product.usageProductInfo.coachName,
					memberName				: this.data.product.usageProductInfo.name,
					productName				: this.data.product.usageProductInfo.productName,
					classTime				: this.data.product.usageProductInfo.serviceTime,
					appointmentName			: this.data.product.usageProductInfo.lessonName,
					voucherMinusYn			: this.data.schedule.voucher_minus_yn,
				};
				data = Object.assign({}, data, {
					startDate				: moment(data.startDate).toISOString(true),
					endDate					: moment(data.endDate).toISOString(true),
					scheduleState			: data.status,
					seqPartnerCoach			: getNumber(data.seqCoach),
					seqMember				: getNumber(data.memberId),
					seqPartnerProduct		: getNumber(data.productId),
					seqPartnerProductPass	: getNumber(data.productPassId),
					seqPartnerPayment		: getNumber(data.paymentId),
				});
			} else if(type == "class") {
				data = {
					startDate				: new Date(this.data.schedule.start_date).format("yyyy-mm-dd hh:MM:ss"),
					endDate					: new Date(this.data.schedule.end_date).format("yyyy-mm-dd hh:MM:ss"),
					seqClass				: this.data.schedule.seq_class,
					seqClassSchedule		: this.data.schedule.seq_class_schedule,
					seqPlace				: this.data.schedule.seq_partner_place,
					lessonName				: this.data.schedule.lesson_name,
					seqCoach				: this.data.schedule.seq_coach,
					nowState				: this.data.schedule.schedule_state,
					status					: this.data.changeState,
					seqMember				: this.data.schedule.seq_member,
					seqPartnerPayment		: this.data.schedule.seq_partner_payment,
					seqPartnerProductPass	: this.data.schedule.seq_partner_product_pass,
					seqPartnerProduct		: this.data.schedule.seq_product,
					seqSchedule				: this.data.schedule.seq_schedule,
					seqPartner				: this.data.schedule.seq_partner,
					memberName				: this.data.schedule.name,
					className				: this.data.schedule.class_name,
					voucherMinusYn			: this.data.schedule.voucher_minus_yn,
				};
				data = Object.assign({}, data, {
					startDate				: moment(data.startDate).toISOString(true),
					endDate					: moment(data.endDate).toISOString(true),
					seqPartnerCoach			: getNumber(data.seqCoach),
					seqPartnerClass			: getNumber(data.seqClass),
					seqPartnerClassSchedule	: getNumber(data.seqClass),
					scheduleState			: data.status,
				});
			}

			ticketController[type].ticketUpdate(data).then(returnData => {
				const resultData = new uiResult(returnData);
				if(resultData.isSuccess()) {
					popupMemberPass.usageList.refresh();
					this.close();
				}
				if(resultData.isErrOfUseLimitOver()) {
					const message = resultData.getMsgForCustomer();
					if(confirm(message + ' 그래도 수행하시겠습니까?')) {
						ticketController[type].ticketUpdate(data, false).then(returnData => {
							const resultData = new uiResult(returnData);
							if (resultData.isSuccess()) {
								popupMemberPass.usageList.refresh();
								this.close();
							} else {
								alert(resultData.getMsgForCustomer());
							}
						});
					}
				} else {
					alert(resultData.getMsgForCustomer());
				}
			}).catch(error => {
				console.log(error);
				alert("변경에 실패하였습니다.");
			});
		},
		template : function() {
			const data = this.data;
			const scheduleData = data.schedule;
			const productData = data.product.usageProductInfo;
			const startDate = new Date(scheduleData.start_date).format("yyyy년 sm월 sd일");
			const startTime = new Date(scheduleData.start_date).format("ap sh시 MM분");
			const endTime = new Date(scheduleData.end_date).format("ap sh시 MM분");
			const lessonDate = startDate + " " + startTime + " ~ " + endTime;

			const memberName = productData.name;
			const lessonName = productData.lessonName;
			const productName = productData.passName;

			const beforeStateName = popupMemberPass.getStateName(data.beforeState);
			const changeStateName = popupMemberPass.getStateName(data.changeState);
			const beforeStateColor = popupMemberPass.getStateColor(data.beforeState, "blue");
			const changeStateColor = popupMemberPass.getStateColor(data.changeState, "blue");

			const beforeCount = function() {
				const count = productData.remainNumber;
				return (productData.useNumberType != "F") ? count + "회" : count;

			};
			const changeCount = function() {
				let count = getNumber(productData.remainNumber);
				count += data.product.changeTicketCnt;
				/*
				if(data.changeState == "E") count -= data.product.changeTicketCnt;
				else count += data.product.changeTicketCnt;
				*/
				return (productData.useNumberType != "F") ? `<dd>변경 후<h3><span class="red">${count}회</span></h3></dd>` : ``;
			};

			const buttonColor = popupMemberPass.getStateColor(data.changeState, "red");
			const buttonName = function() {
				switch(data.changeState) {
					case "A" : return "결석처리";
					case "E" : return "출석처리";
					case "C" : return "취소처리";
				}
				return "";
			};

			return `
				<style type="text/css">
					.popupChangeState .middle				{padding:0 25px !important; text-align:center; font-size:14px; color:#646464}
					.popupChangeState .middle h3			{margin:2px 0}
					.popupChangeState .middle h4			{margin:2px 0; line-height:1.4; font-size:16px; color:#333}
					.popupChangeState .middle > div			{padding:25px 0}
					.popupChangeState .middle > div + div	{border-top:1px dashed #ccc}
					.popupChangeState .middle span			{font-weight:500}
					.popupChangeState .middle .name			{margin-top:25px}
					.popupChangeState .middle .state		{margin-top:15px; padding:10px; background-color:#f2f2f2}
					.popupChangeState .middle dl dd			{position:relative}
					.popupChangeState .middle dl dd:before	{content:""; position:absolute; left:-15px; top:50%; margin-top:-15px; width:30px; height:30px; background:url(/static/img/icon/icon_arrow_down_green.png) no-repeat center center / 30px; transform:rotate(-90deg)}
				</style>
				<div class="popupChangeState tiny">
					<div class="top">
						<h2>이용권 상태 변경<a data-event="close"></a></h2>
					</div>
					<div class="middle">
						<div class="lesson">
							<div class="name">
								${memberName} 회원님의
								<h3><span class="black">${lessonName}</span></h3>
								${lessonDate}
							</div>
							<div class="state">
								<span class="${beforeStateColor}">${beforeStateName}처리</span> 상태를
								<span class="${changeStateColor}">${changeStateName}처리</span> 상태로
								변경 하시겠습니까?
							</div>
						</div>
						<div class="product">
							<h4>${productName}</span>의<br>남은 횟수가 아래와 같이 변경됩니다.</h4>
							<div class="state">
								<dl>
									<dt>현재<h3><span class="red">${beforeCount()}</span></h3></dt>
									${changeCount()}
								</dl>
							</div>
						</div>
					</div>
					<div class="bottom">
						<button class="ui-button gray" data-event="close">취소</button>
						<button class="ui-button" data-event="submit">${buttonName()}</button>
					</div>
				</div>
			`;
		}
	},

	// 기간 및 횟수 변경
	changePeriod : {
		popup : undefined,
		callback : undefined,
		data : {},
		open : function(passInfo, callback) {
			if(this.popup) return;
			this.data.passInfo = passInfo;
			this.callback = callback;
			this.render();
		},
		close : function(isUpdate) {
			this.popup = undefined;
			uiPopup();
			if(isUpdate) {
				if(this.callback) this.callback();
				else window.location.reload(true);
			}
		},
		render : function() {
			const self = this.event.self = this;
			this.popup = uiPopup({
				template : this.template(),
				beforeEvent : (popup) => {
					uiInput(popup);
					uiCalendar(popup);
				},
				event : {
					click : {
						close : function() {
							self.close();
						},
						submit : function() {
							self.submit();
						},
						period : function() {
							self.event.changeDate();
						}
					},
					change : {
						changeNumber : function() {
							self.event.changeNumber(this);
						},
						changeDate : function() {
							self.event.changeDate(this);
						}
					}
				}
			});
		},
		submit : function() {
			const passInfo = this.data.passInfo;
			const isPeriod = (passInfo.serviceKind == "P");
			const data = {
				useNumber : (isPeriod) ? "" : Number(this.popup.getValue("useNumber")),
				remainNumber : (isPeriod) ? "" : Number(this.popup.getValue("remainNumber")),
				useStartDate : this.popup.getValue("useStartDate"),
				useEndDate : this.popup.getValue("useEndDate")
			};
			if(!this.check(data)) return;

			popupMemberPass.confirmPause.open(passInfo.seqMember, passInfo.seqPassInfo, data.useStartDate, data.useEndDate, () => {
				popupMemberPass.confirmSchedule.open(passInfo.serviceKind, passInfo.seqPassInfo, passInfo.useStartDate, passInfo.useEndDate, data.useStartDate, data.useEndDate, data.remainNumber, () => {
					const passList = [passInfo];
					const fromDate = getElapse(data.useEndDate, 0, 0, 1);
					popupMemberPass.confirmReserveSchedule.open("period", passList, fromDate, 0, () => {
						memberController.changePassOption(passInfo.seqMember, passInfo.seqPassInfo, "usage", data).then(data => {
							alert("수정되었습니다.");
							this.close(true);
						}).catch(error => {
							uiError(error);
						});
					});
				});
			});
		},
		check : function(data) {
			const passInfo = this.data.passInfo;

			const useStartDateA = passInfo.useStartDate;	// 이용권 시작날짜
			const useEndDateA = passInfo.useEndDate;		// 이용권 종료날짜
			const useStartDateB = data.useStartDate;		// 변경 시작날짜
			const useEndDateB = data.useEndDate;			// 변경 종료날짜

			const useNumberA = passInfo.useNumber;
			const remainNumberA = passInfo.remainNumber;
			const useNumberB = data.useNumber;
			const remainNumberB = data.remainNumber;

			const isChangeDate = (useStartDateA != useStartDateB || useEndDateA != useEndDateB);
			const isChangeCount = (useNumberA != useNumberB || remainNumberA != remainNumberB);

			let error = "";
			if(useNumberB < 0 || remainNumberB < 0 || useNumberB < remainNumberB) error = "횟수를 다시 한 번 확인해 주세요.";
			else if(!(isDate(useStartDateB) && isDate(useEndDateB))) error = "날짜를 다시 한 번 확인해 주세요.";
			else if(getPeriod(useStartDateB, useEndDateB) < 0) error = "종료 날짜를 시작 날짜 보다 크게 설정해 주세요.";
			else if(useNumberB > 10000 || remainNumberB > 10000) error = "전체 또는 남은 횟수를 10,000회 이하로 입력해 주세요.";
			else if(!isChangeDate && !isChangeCount) {
				alert("변경된 내용이 없습니다.");
				this.close();
				return false;
			}
			if(error) {
				alert(error);
				return false;
			}
			return true;
		},
		event : {
			changeNumber : function(object) {
				let value = Number(object.value);
				const min = spendNumber = this.self.data.passInfo.spendNumber || 0;
				const max = Number(object.getAttribute("max")) || 10000;
				// if(value > max) value = object.value = max;
				if(object.name == "useNumber") {
					if(value < min)	value = object.value = min;
					this.self.popup.putValue("remainNumber", value - spendNumber);
				} else {
					this.self.popup.putValue("useNumber", value + spendNumber);
				}
			},
			changeDate : function(object) {
				const isChecked = (this.self.popup.getValue("period") == "Y");
				if(isChecked) {
					const passInfo = this.self.data.passInfo;
					const day = getPeriod(passInfo.useStartDate, passInfo.useEndDate);
					const useStartDate = this.self.popup.getValue("useStartDate");
					const useEndDate = this.self.popup.getValue("useEndDate");
					if(!object || object.name == "useStartDate")
						this.self.popup.putValue("useEndDate", getElapse(useStartDate, 0, 0, day));
					else
						this.self.popup.putValue("useStartDate", getElapse(useEndDate, 0, 0, day * -1));
				}
			}
		},
		template : function() {
			const passInfo = this.data.passInfo;
			const isPeriod = (passInfo.serviceKind == "P");
			const useStartDate = passInfo.useStartDate;
			const useEndDate = passInfo.useEndDate;
			const useNumber = (isPeriod) ? "" : passInfo.useNumber;
			const remainNumber = (isPeriod) ? "" : passInfo.remainNumber;
			return `
				<style type="text/css">
					.popupChangePeriod											{width:790px !important}
					.popupChangePeriod h4										{margin-bottom:15px}
					.popupChangePeriod input									{max-width:125px !important}
					.popupChangePeriod dl										{table-layout:auto}
					.popupChangePeriod dl > *									{vertical-align:top; width:auto}
					.popupChangePeriod dl dt									{position:relative; width:285px; padding-right:30px}
					.popupChangePeriod dl dt:after								{content:""; position:absolute; right:0; top:50%; margin-top:-15px; width:30px; height:30px; background:url(/static/img/icon/icon_arrow_down_green.png) no-repeat center center / 30px; transform:rotate(-90deg)}
					.popupChangePeriod dl dd									{padding-left:30px}
					.popupChangePeriod th										{width:105px !important}
					.popupChangePeriod dl.period tr:nth-child(n+2)				{display:none}
					.popupChangePeriod .ui-input-calendar + .ui-input-calendar	{margin-left:5px !important}
				</style>
				<div class="popupChangePeriod">
					<div class="top">
						<h2>기간 및 횟수 변경<a data-event="close"></a></h2>
					</div>
					<div class="middle ui-form">
						<dl class="${(isPeriod) ? "period" : ""}">
							<dt>
								<h4>현재 이용권</h4>
								<table>
									<tr>
										<th>기간</th>
										<td>${useStartDate} ~ ${useEndDate}</td>
									</tr>
									<tr>
										<th>전체횟수</th>
										<td class="green">${useNumber}회</td>
									</tr>
									<tr>
										<th>남은횟수</th>
										<td class="green">${remainNumber}회</td>
									</tr>
								</table>
							</dt>
							<dd>
								<h4>변경 후 이용권</h4>
								<table>
									<tr>
										<th>기간</th>
										<td>
											<input name="useStartDate" type="calendar" value="${useStartDate}" data-event="changeDate">
											~
											<input name="useEndDate" type="calendar" value="${useEndDate}" data-event="changeDate">
											<div>
												<label class="ui-input-checkbox">
													<input name="period" type="checkbox" data-event="period">
													<span></span>
													이용일수 유지
												</label>
											</div>
										</td>
									</tr>
									<tr>
										<th>전체횟수</th>
										<td>
											<input name="useNumber" type="integer" min="0" value="${useNumber}" data-event="changeNumber">회
										</td>
									</tr>
									<tr>
										<th>남은횟수</th>
										<td>
											<input name="remainNumber" type="integer" min="0" value="${remainNumber}" data-event="changeNumber">회
										</td>
									</tr>
								</table>
							</dd>
						</dl>
					</div>
					<div class="bottom">
						<button class="ui-button gray" data-event="close">취소</button>
						<button class="ui-button" data-event="submit">변경</button>
					</div>
				</div>
			`;
		}
	},

	// 그룹수업 일괄예약
	batchReserve : {
		popup : undefined,
		data : {},
		open : function(data) {
			if(this.popup) return;
			this.data = data;
			Promise.all([
				ticketController.infoBatchReserve({
					searchParamMap : {
						seqPartnerProductUsage : data.seqPartnerProductUsage
					}
				}),
				commonController.branch.list()
			]).then(([data, branchList]) => {
				this.data.productUsage = (data.data) ? data.data.productUsage || {} : {};
				this.data.branchList = branchList || [];
				this.template.data = this.data;
				componentMember.data = {
					branchList : this.data.branchList
				}
				this.render();
			}).catch(error => {
				uiError(error);
			});
		},
		close : function() {
			this.popup = undefined;
			uiPopup();
		},
		submit : function() {
			const weekList = [];
			this.popup.querySelectorAll("[name='week']:checked").forEach(item => {
				weekList.push(item.value);
			});
			let seqPartnerBranch = this.popup.querySelector("[name='seqPartnerBranch']").value;
			seqPartnerBranch = (seqPartnerBranch) ? getNumber(seqPartnerBranch) : "";
			const submitData = {
				seqPartnerBranch : seqPartnerBranch,
				searchParamMap : {
					seqMember : this.data.seqMember,
					seqPartnerProductUsage : this.data.seqPartnerProductUsage,
					reserveStartDt : this.popup.querySelector("[name='startDate']").value,
					reserveEndDt : this.popup.querySelector("[name='endDate']").value,
					reservationCntToWant : this.popup.querySelector("[name='reserveCount']").value,
					reserveStartTime : this.popup.querySelector("[name='hour']").value + ":" + this.popup.querySelector("[name='min']").value,
				},
				searchParamListMap : {
					weekList : weekList || []
				}
			};
			if(!this.check(submitData)) return;
			scheduleController.searchClassByDateAndPassInfo(submitData).then(resultData => {
				resultData.searchData = submitData;
				popupMemberPass.batchReserveList.open(resultData);
			}).catch(error => {
				console.log(error);
				alert("오류가 발생하였습니다.");
			});
		},
		check : function(data) {
			const checkList = ["branch", "date", "count", "week", "time"];
			for(let i = 0; i < checkList.length; i++) {
				let error = "";
				switch(checkList[i]) {
					case "branch" :
						const isBranch = (partnerInfo.partner.branchUseYn == "Y");
						if(isBranch && !data.seqPartnerBranch) {
							error = "예약 지점을 선택해 주세요.";
						}
						break;
					case "date" :
						const today = new Date();
						const startDate = data.searchParamMap.reserveStartDt;
						const endDate = data.searchParamMap.reserveEndDt;
						if(startDate == "" || endDate == "" || getPeriod(startDate, endDate) < 0) error = "시작 및 종료 날짜를 다시 확인해 주세요.";
						else if(isLessDate(today, startDate)) error = "지난 날짜에는 일괄예약을 할 수 없습니다.";
						else if(isLessDate(this.data.productUsage.use_start_date, startDate)) error = "시작 날짜가 이용권 기간을 벗어났습니다.";
						else if(isMoreDate(this.data.productUsage.use_end_date, endDate)) error = "종료 날짜가 이용권 기간을 벗어났습니다.";
						break;
					case "count" :
						if(!data.searchParamMap.reservationCntToWant) error = "예약 진행 횟수를 선택해 주세요.";
						break;
					case "week" :
						if(data.searchParamListMap.weekList.length == 0) error = "일괄예약 요일을 선택해 주세요.";
						break;
					case "time" :
						const time = data.searchParamMap.reserveStartTime.split(":");
						if(time[0] == "" || time[1] == "") error = "수업 시작 시간을 입력해 주세요.";
						break;
				}
				if(error) {
					alert(error);
					return false;
				}
			}
			return true;
		},
		render : function() {
			const self = this;
			this.popup = this.template.popup = uiPopup({
				template : this.template.getTemplate(),
				event : {
					click : {
						submit : function() {
							self.submit();
						},
						close : function() {
							self.close();
						}
					}
				}
			});
			uiCalendar(this.popup);
		},
		template : {
			getTemplate : function() {
				const data = this.data.productUsage;
				const today = new Date().format("yyyy-mm-dd");
				const startDate = new Date(data.use_start_date).format("yyyy-mm-dd");
				const endDate = new Date(data.use_end_date).format("yyyy-mm-dd");
				const getBranchList = () => {
					const branchList = this.data.branchList || [];
					const seqPartnerBranch = partnerInfo.branch.id;
					const option = branchList.filter(item => {
						return (item.seqPartnerBranch);
					}).map(item => {
						const selected = (item.seqPartnerBranch == seqPartnerBranch) ? "selected" : "";
						return `<option value="${item.seqPartnerBranch}" ${selected}>${item.partnerName}</option>`;
					});
					return option.join("");
				};
				return `
					<style type="text/css">
						.popupBatchReserve select						{width:75px; text-align-last:center}
						.popupBatchReserve select.wide					{width:200px}
						.popupBatchReserve .week dl						{height:35px}
						.popupBatchReserve .week dd						{position:relative; overflow:hidden}
						.popupBatchReserve .week dd + dd				{}
						.popupBatchReserve .week dd input				{position:absolute; left:-9999px}
						.popupBatchReserve .week dd input + div			{position:absolute; left:0; top:0; width:100%; height:35px; background-color:#f2f2f2; text-align:center; box-sizing:border-box}
						.popupBatchReserve .week dd input:checked + div	{background-color:#004fec; border-right:1px solid rgba(255,255,255,0.4); color:white}
					</style>
					<div class="popupBatchReserve small">
						<div class="top">
							<h2>그룹수업 일괄 예약<a data-event="close"></a></h2>
						</div>
						<div class="middle ui-form">
							<form onsubmit="return false" autocomplete="off">
								<table>
									<tr>
										<th>이용권 기간</th>
										<td>${startDate} ~ ${endDate}</td>
									</tr>
									<tr>
										<th>이용권 잔여 횟수</th>
										<td>${this.getRemainCount()}</td>
									</tr>
									<tr class="branchDisplay">
										<th>예약 지점</th>
										<td>
											<select class="ui-select wide" name="seqPartnerBranch">
												<option value="">지점 선택</option>
												${getBranchList()}
											</select>
										</td>
									</tr>
									<tr>
										<th>예약 기간</th>
										<td>
											<input name="startDate" type="calendar" value="${today}">부터
											<input name="endDate" type="calendar">까지
										</td>
									</tr>
									<tr>
										<th>예약 진행 횟수</th>
										<td>
											<select name="reserveCount" class="ui-select">
												${this.getReserveCount()}
											</select>
											회
										</td>
									</tr>
									<tr>
										<th>예약 요일</th>
										<td class="week">
											<dl>
												${this.getWeek()}
											</dl>
										</td>
									</tr>
									<tr>
										<th>수업 시작 시간</th>
										<td>
											<select class="ui-select" name="hour">
												${this.getHour()}
											</select>
											:
											<select class="ui-select" name="min">
												${this.getMinute()}
											</select>
										</td>
									</tr>
								</table>
								<p class="ui-note">
									수업 일괄 예약 기능을 통해 일정한 기간동안 선택한 요일과 시간에 시작하는 수업을 검색하여 일괄적으로 예약할 수 있습니다. 선택한 요일과 수업 시작 시간이 일치하는 경우에만 검색되는 만큼 정확하게 선택해 주세요.
								</p>
							</form>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">취소</button>
							<button class="ui-button" data-event="submit">수업 검색</button>
						</div>
					</div>
				`;
			},
			getHour() {
				const option = [`<option value="">시</option>`];
				for(let i = 0; i < 24; i++)
					option.push(`<option value="${i.zf(2)}">${i.zf(2)}</option>`);
				return option.join("");
			},
			getMinute() {
				const option = [`<option value="">분</option>`];
				for(let i = 0; i < 60; i += 5)
					option.push(`<option value="${i.zf(2)}">${i.zf(2)}</option>`);
				return option.join("");
			},
			getReserveCount() {
				const data = this.data.productUsage;
				const isInfinite = (data.service_kind == "P") ? true : false;
				let useNumber = data.remain_number || 0;
				const reserveCount = data.current_reserve_cnt || 0;
				const maxCount = (isInfinite) ? 50 : Math.min(useNumber - reserveCount, 50);
				const option = [`<option value="">횟수</option>`];
				for(let i = 1; i <= maxCount; i++)
					option.push(`<option value="${i}">${i}</option>`);
				if(isInfinite)
					option.push(`<option value="-1" selected>무제한</option>`);
				return option.join("");
			},
			getRemainCount() {
				const data = this.data.productUsage;
				const isInfinite = (data.service_kind == "P") ? true : false;
				const reserveCount = data.current_reserve_cnt || 0;
				const remainCount = data.remain_number || 0;
				const prefix = (isInfinite) ? "무제한" : remainCount + "회";
				const suffix = (reserveCount > 0) ? " (예약건수 : " + reserveCount + "회)" : "";
				return prefix + suffix;
			},
			getWeek() {
				const week = ["월", "화", "수", "목", "금", "토", "일"];
				const dd = week.map((item, index) => {
					const value = (index == 6) ? 0 : index + 1
					return `
						<dd>
							<label>
								<input name="week" type="checkbox" value="${value}">
								<div>${item}</div>
							</label>
						</dd>
					`;
				});
				return dd.join("");
			},
		}
	},

	// 그룹수업 일괄예약 검색 목록
	batchReserveList : {
		popup : undefined,
		data : {},
		open : function(data) {
			if(this.popup) return;
			this.data = data;
			this.render();
		},
		close : function() {
			this.popup = undefined;
			uiPopup();
		},
		render : function() {
			const self = this.event.self = this;
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
					change : {
						check : function() {
							self.event.changeCheck(this);
						}
					}
				}
			});
			uiTable(this.popup);
			this.event.updateCheck();
		},
		submit : function() {
			const checkList = this.popup.querySelectorAll("[name='check']:checked");
			if(checkList.length == 0) {
				alert("선택된 수업이 없습니다.");
				return;
			}
			const seqMember = this.data.searchData.searchParamMap.seqMember;

			const scheduleList = Array.from(checkList).map(item => {
				const sequence = item.value;
				const tr = item.parentNode.parentNode.parentNode;
				const select = tr.querySelector("select");
				const seatNumber = (select) ? Number(select.value) : "";
				const data = this.data.reserveCandidateList.filter(item => {
					return (item.seq_class_schedule == sequence) ? true : false;
				})[0];
				data.seatNumber = seatNumber;
				return data;
			}).map(item => {
				return {
					scheduleName			: item.schedule_name,
					scheduleType			: item.schedule_type,
					seqCoach				: item.seq_coach,
					seqMember				: seqMember,
					seqPassInfo				: item.seq_pass_info,
					scheduleState			: item.schedule_state,
					seqClassSchedule		: item.seq_class_schedule,
					seqClass				: item.seq_class,
					startDate				: item.reserveCandidateDate + " " + item.start_time + ":00",
					endDate					: item.reserveCandidateDate + " " + item.end_time + ":00",
					seatNo					: item.seatNumber
				};
			});
			const data = {
				scheduleList : scheduleList
			};
			ticketController.class.ticketReserve(data).then(data => {
				this.close();
				popupMemberPass.batchReserveResult.open(data.data.scheduleList);
			}).catch(error => {
				console.log(error);
				alert("오류가 발생하였습니다.");
			});
		},
		event : {
			changeCheck(object) {
				const checkCount = this.self.popup.querySelectorAll("[name='check']:checked").length;
				const maxCount = this.self.data.maxCount;
				if(maxCount < checkCount) {
					object.checked = false;
					return;
				}
				const tr = object.parentNode.parentNode.parentNode;
				if(object.checked)
					tr.classList.add("focus");
				else
					tr.classList.remove("focus");
				this.updateCheck();
			},
			updateCheck() {
				const count = this.self.popup.querySelectorAll("[name='check']:checked").length;
				this.self.popup.putValue("reserveCount", count);
			}
		},
		template : function() {
			const searchInfo = this.data.searchData.searchParamMap;
			const reserveCount = Number(searchInfo.reservationCntToWant);
			const searchPeriod = searchInfo.reserveStartDt + " ~ " + searchInfo.reserveEndDt;
			const searchCount = (reserveCount < 0) ? "무제한" : reserveCount + "회";
			const passInfo = this.data.productUsage;
			const useStartDate = new Date(passInfo.use_start_date);
			const useEndDate = new Date(passInfo.use_end_date);
			const weekLimit = passInfo.week_limit;
			const dayLimit = passInfo.day_limit;

			let count = this.data.maxCount = (reserveCount < 0 || reserveCount > 1000) ? 1000 : reserveCount;

			const getList = () => {
				const limitInfo = {};
				const getStartDateOfWeek = (date) => {
					date = new Date(date);
					let weekIndex = date.getDay();
					if(weekIndex == 0) weekIndex == 7;
					date.setDate(date.getDate() - (weekIndex - 1));
					return date.format("yyyy-mm-dd");
				};
				const setLimitInfo = (date) => {
					const weekDate = getStartDateOfWeek(date);
					const weekIndex = new Date(date).getDay();
					if(!limitInfo[weekDate]) {
						limitInfo[weekDate] = {
							day : Array(7).fill(0),
							week : 0
						}
					}
					const weekInfo = limitInfo[weekDate];
					weekInfo.day[weekIndex]++;
					weekInfo.week++;
					return {week : weekInfo.week, day : weekInfo.day[weekIndex]};
				};

				(this.data.scheduleList || []).forEach(item => {
					if(item.schedule_state == "R" || item.schedule_state == "E")
						setLimitInfo(item.start_date);
				});

				let beforeDateWeek = "";
				const tr = [];
				(this.data.reserveCandidateList || []).forEach(item => {
					const reserveDate = new Date(item.reserveCandidateDate).format("yyyy-mm-dd");
					const dateWeek = getStartDateOfWeek(reserveDate);
					let isBreak = false;
					if(beforeDateWeek != dateWeek) {
						beforeDateWeek = dateWeek;
						isBreak = true;
					}
					const limitInfo = setLimitInfo(reserveDate);

					const getErrorInfo = () => {
						const isWeekLimit = (weekLimit > 0 && weekLimit < limitInfo.week);
						const isDayLimit = (dayLimit > 0 && dayLimit < limitInfo.day);
						if(item.reservation_limit_no - item.current_reserve_count < 1) return "예약 가능한 자리가 없습니다."
						if(item.already_reserved_schedule) return "이미 예약된 수업입니다.";
						if(item.pass_pause_period) return "중지 기간에 속한 수업입니다.";
						if(item.none_open_date) return "정기 휴일에 속한 수업입니다.";
						if(item.holiday) return "지정 휴일에 속한 수업입니다.";
						if(item.schedule_on_overlab) return "해당 시간에 다른 예약이 있습니다.";
						if(isLessDate(useStartDate, reserveDate) || isMoreDate(useEndDate, reserveDate)) return "이용권 사용 기간이 아닙니다.";
//						if(isWeekLimit) return "weekLimit";
//						if(isDayLimit) return "dayLimit";
						return "";
					};

					const lessonSequence = item.seq_class_schedule;
					const remainCount = item.reservation_limit_no - item.current_reserve_count;
					const getSeatList = (disabled) => {
						if(item.scheduleAvailableSeat && item.scheduleAvailableSeat.length > 0) {
							const option = item.scheduleAvailableSeat.map((item, index) => {
								const selected = (index == 0) ? "selected" : "";
								return `<option value="${item}" ${selected}>${item}</option>`;
							});
							return `
								<select class="ui-select" ${disabled}>
									<option value="">좌석 선택</option>
									${option.join("")}
								</select>
							`;
						} else {
							return "-";
						}
					};
					let errorInfo = getErrorInfo();
					const isError = (errorInfo && errorInfo != "weekLimit" && errorInfo != "dayLimit");
//					if(errorInfo == "weekLimit") errorInfo = "주간 이용 횟수를 초과하게 됩니다.";
//					else if(errorInfo == "dayLimit") errorInfo = "일일 이용 횟수를 초과하게 됩니다.";
					const disabled = (isError) ? "disabled" : "";
					let checked = (!isError && count > 0) ? "checked" : "";
					if(checked) count--;
					let className = (checked) ? "focus" : disabled;
					if(isBreak) className += " break";

					tr.push(`
						<tr class="${className}">
							<th>
								<label class="ui-input-checkbox">
									<input name="check" type="checkbox" value="${lessonSequence}" ${checked} ${disabled} data-event="check"><span></span>
								</label>
							</th>
							<td class="branchDisplay">${item.branchName || "-"}</td>
							<td>${item.reserveCandidateDate}</td>
							<td class="left">${item.schedule_name}</td>
							<td>${item.coach_name}</td>
							<td>${remainCount} / ${item.reservation_limit_no}명</td>
							<td>${item.amount}회</td>
							<td>${getSeatList(disabled)}</td>
							<td class="left">${errorInfo}</td>
						</tr>
					`);
				});
				return (tr.length) ? tr.join("") : `<tr><td colspan="9">검색된 수업이 없습니다.</td></tr>`;
			};

			return `
				<style type="text/css">
					.batchReserveList							{}
					.batchReserveList .ui-note					{margin-top:0}
					.batchReserveList .box						{margin-top:10px; height:300px; background-color:#ccc; border:1px solid #ccc; overflow-y:auto}
					.batchReserveList .box table				{background-color:white; line-height:1.4; text-align:center}
					.batchReserveList .box table tr > *			{padding:8px; border:none}
					.batchReserveList .box table tr > td		{border-left:1px solid #ccc}
					.batchReserveList .box table thead tr > *	{position:sticky; position:-webkit-sticky; top:0px; background-color:#686d7b; z-index:2}
					.batchReserveList .box table tbody tr > *	{position:relative; padding:8px; white-space:normal}
					.batchReserveList .box table tr > * + *		{border-left:1px solid #ccc}
					.batchReserveList .box table tbody tr + tr	{border-top:1px solid #ccc}

					.batchReserveList .box table tr.disabled	{background-color:#ebebe4}
					.batchReserveList .box table th				{width:35px; max-width:35px; vertical-align:middle !important; padding:0 !important; width:40px !important; overflow:hidden}
					.batchReserveList .box table th label		{position:relative; margin:0; padding:0; width:18px; height:18px}
					.batchReserveList .box table tbody th		{font-size:0}
					.batchReserveList .box table select			{position:absolute; left:0; top:0; width:100%; height:100%; border:none; text-align-last:center}
					.batchReserveList .box table .left			{max-width:150px}
				</style>
				<div class="batchReserveList medium">
					<div class="top">
						<h2>
							예약할 그룹수업 선택
							<a data-event="close"></a>
						</h2>
					</div>
					<div class="middle ui-form">
						<table>
							<tr>
								<th>예약 기간 및 시간</th>
								<td>${searchPeriod} (${searchInfo.reserveStartTime})</td>
							</tr>
							<tr>
								<th>예약 진행 횟수</th>
								<td><var data-msg="reserveCount">0</var>회 / ${searchCount}</td>
							</tr>
							<tr>
								<th>이용 제한 횟수</th>
								<td>주간 이용 제한 : ${(weekLimit < 0) ? "무제한" : weekLimit + "회"} / 일일 이용 제한 : ${(dayLimit < 0) ? "무제한" : dayLimit + "회"}</td>
							</tr>
							<tr>
								<th>그룹수업 선택</th>
								<td>
									<p class="ui-note red">
										<span class="red">
											일괄 수업 예약 시 주간 및 일일 이용 횟수 제한이 적용되지 않습니다.
										</span>
									</p>
									<div class="box">
										<table class="ui-table dark">
											<thead>
												<tr>
													<th>선택</th>
													<td class="branchDisplay">지점명</td>
													<td>수업날짜</td>
													<td>수업명</td><td>담당강사</td><td>예약가능인원</td>
													<td>이용권차감</td><td>좌석선택</td><td>비고</td>
												</tr>
											</thead>
											<tbody>
												${getList()}
											</tbody>
										</table>
									</div>
								</td>
						</table>
					</div>
					<div class="bottom">
						<button class="ui-button gray" data-event="close">취소</button>
						<button class="ui-button green" data-event="submit">선택한 수업 예약</button>
					</div>
				</div>
			`;
		}
	},

	batchReserveResult : {
		popup : undefined,
		data : {},
		open : function(data) {
			if(this.popup) return;
			this.data = this.template.data = data;
			this.render();
		},
		close : function() {
			this.popup = undefined;
			popupMemberPass.batchReserve.close();
			uiPopup();
		},
		render : function() {
			const self = this;
			this.popup = uiPopup({
				template : this.template(),
				event : {
					click : {
						close : function() {
							self.close();
						}
					}
				}
			});
		},
		template : function() {
			const self = this;
			const resultList = function() {
				const tr = self.data.map(item => {
					const lessonName = item.scheduleName;
					const lessonDate = uiDate(item.startDate, "time", "yyyy-mm-dd hh:MM");
					const resultColor = (item.result == "success") ? "green" : "red";
					const resultName = (item.result == "success") ? "예약성공" : "예약실패";
					return `
						<tr>
							<td>${lessonDate}</td>
							<td>${lessonName}</td>
							<td class="${resultColor}">${resultName}</td>
						</tr>
					`;
				});
				return tr.join("");
			};
			return `
				<div class="tiny">
					<div class="top">
						<h2>그룹수업 일괄예약 결과<a data-event="close"></a></h2>
					</div>
					<div class="middle">
						<table class="ui-table fix">
							<colgroup><col width="35%"><col width="40%"><col width="25%"></colgroup>
							<thead>
								<tr><td>수업일시</td><td>수업명</td><td>예약결과</td></tr>
							</thead>
							<tbody>
								${resultList()}
							</tbody>
						</table>
					</div>
					<div class="bottom">
						<button class="ui-button" data-event="close">확인</button>
					</div>
				</div>
			`;
		}
	},

	// 체크인
	checkin : {
		popup : undefined,
		data : {},
		open : function(serviceType, seqPassInfo) {
			if(this.popup) return;
			if(typeof uiProfile == "undefined") return;
			this.data = {
				seqMember : uiProfile.data.seqMember,
				membershipNo : uiProfile.data.membershipNo,
			};
			ticketController.checkin({
				membershipNo : this.data.membershipNo,
				checkinType : "PASS"
			}).then(data => {
				this.data.parameter = {
					seqMember : this.data.seqMember,
					seqSchedule : "",
					seqMemberEntranceStandby : data.seqMemberEntranceStandby,
					seqPartnerClassSchedule : "",
					seqPartnerProductUsage : this.data.seqPartnerProductUsage,
					checkinType : serviceType
				};
				ticketController.checkin(this.data.parameter).then(data => {
					this.data.result = data;
					this.template.data = this.event.data = this.data;
					const command = data.command;
					if(command == "RESULT") {
						popupMemberPass.checkinResult.open(data);
						return;
					} else if(command == "PASS_CHECKIN") {
						this.event.confirm();
					} else
						this.render();
				});
			}).catch(error => {
				console.log(error);
				uiError(error);
			});
		},
		close : function() {
			this.popup = undefined;
			uiPopup();
		},
		render : function(isRefresh) {
			const self = this.event.self = this;
			this.popup = this.event.popup = uiPopup({
				container : this.popup,
				template : this.template.getTemplate(),
				event : {
					click : {
						close : function() {
							self.close();
						},
						entrance : function() {
							self.event.entrance(this);
						}
					}
				},
				isRefresh: isRefresh
			});
		},
		event : {
			confirm : function(type, data) {
				if(type == "seat") return true;
				let message = "출석 처리 하시겠습니까?";
				if(type == "class") {
					const line1 = data.lessonName + "\n";
					const line2 = "(수업시간 : " + data.classStartTime + " / 차감횟수 : " + data.amount + "회)\n";
					message = line1 + line2 + message;
				} else {
					const line1 = data.productPassName + "\n";
					const scheduleTime = data.scheduleDate.substr(data.scheduleDate.indexOf(" ") + 1);
					const line2 = "(수업시간 : " + scheduleTime + " / 차감횟수 : " + data.lessonAmount + "회)\n";
					message = line1 + line2 + message;
				}
				return confirm(message);
			},
			entrance : function(object) {
				const type = object.getAttribute("data-type");
				const seqSchedule = object.getAttribute("data-sequence");
				const seqPartnerClassSchedule = object.getAttribute("data-class-sequence");
				if(type != "seat") {
					this.data.parameter.seqSchedule = seqSchedule;
					this.data.parameter.seqPartnerClassSchedule = seqPartnerClassSchedule;
				}
				this.data.parameter.checkinType = "ENTRANCE";

				let data = {};
				switch(type) {
					case "class" :
						data = this.data.result.classList.filter(item => {
							return (item.seqPartnerClassSchedule == seqPartnerClassSchedule) ? true : false;
						})[0];

						if(!data.scheduleState && data.totalSeat && data.totalSeat > 0) {
							this.data.parameter.checkinType = "SEAT";
							this.data.maxSeat = data.totalSeat;
							ticketController.checkin(this.data.parameter).then(data => {
								this.data.seatList = data.scheduleSeatList;
								this.data.result.command = "SEAT";
								this.self.render(true);
							}).catch(error => {
								console.log(error);
							});
							return;
						}
						break;

					case "appointment" :
						const reservationList = this.data.result.reservationList;
						const attendanceList = this.data.result.attendanceList;
						data = reservationList.concat(attendanceList);
						data = data.filter(item => {
							return (item.seqSchedule == seqSchedule) ? true : false;
						})[0];
						break;

					case "seat" :
						const seatNo = getNumber(this.popup.querySelector("[name='seatNo']").value);
						if(seatNo < 1) {
							alert("좌석을 선택해 주세요.");
							return;
						}
						this.data.parameter.seatNo = seatNo;
						break;
				}
				if(this.confirm(type, data)) {
					ticketController.checkin(this.data.parameter).then(data => {
						alert(data.message);
						this.self.close();
					}).catch(error => {
						console.log(error);
						alert("오류가 발생하였습니다.");
					});
				}
			}
		},
		template : {
			getTemplate : function() {
				const command = this.data.result.command;
				let title = "";
				let contents = "";
				let size = "small";
				switch(command) {
					case "SCHEDULE_LIST" :
						title = "스케줄 체크인";
						contents = this.scheduleList();
						break;
					case "CLASS_LIST" :
						title = "그룹수업 체크인";
						contents = this.classList();
						break;
					case "SEAT" :
						title = "그룹수업 자리 선택";
						contents = this.seatList();
						size = "tiny";
						break;
				}
				const buttons = function() {
					if(command == "SEAT")
						return `
							<button class="ui-button gray" data-event="close">취소</button>
							<button class="ui-button" data-type="seat" data-event="entrance">출석</button>
						`;
					else
						return `<button class="ui-button" data-event="close">닫기</button>`;
				};
				return `
					<style type="text/css">
						.popupCheckin .middle				{max-height:400px; overflow-y:auto}
						.popupCheckin .middle h4			{font-size:16px; color:#333}

						.popupCheckin .list li + li			{margin-top:15px}
						.popupCheckin .list li a			{display:block; padding:10px 15px; border:1px solid #ccc}
						.popupCheckin .list li:hover a		{border-color:#004fec}
						.popupCheckin .list li.green a		{border-color:#37b772}
						.popupCheckin .list li.blue a		{border-color:#004fec}
						.popupCheckin .list li.red a		{border-color:#ff5722}
						.popupCheckin .list li h4 em		{position:relative; top:-1px}
					</style>
					<div class="popupCheckin ${size}">
						<div class="top">
							<h2>${title}</h2>
						</div>
						<div class="middle">
							${contents}
						</div>
						<div class="bottom">
							${buttons()}
						</div>
					</div>
				`;
			},
			// 그룹 수업 목록
			classList : function() {
				const data = this.data.result.classList;
				let li = "<li>선택 가능한 수업이 없습니다.</li>";
				if(data.length > 0) {
					li = data.map(item => {
						const reserved = (item.scheduleState == "E") ? "reserved" : "";
						const stateName = popupMemberPass.getStateName(item.scheduleState);
						const stateColor = popupMemberPass.getStateColor(item.scheduleState);
						const state = (stateName) ? `<em class="bg ${stateColor}">금일${stateName}</em>` : ``;
						return `
							<li class="${stateColor}">
								<a data-type="class" data-sequence="${item.seqSchedule || ''}" data-class-sequence="${item.seqPartnerClassSchedule}" data-event="entrance">
									<h4>${state}${item.classStartTime}</h4>
									<p class="ui-note">
										${item.lessonName} / 강사 : ${item.coachName} / 차감 횟수 : ${item.amount}
									</p>
								</a>
							</li>
						`;
					});
					li = li.join("");
				}
				return `
					<ul class="list">
						${li}
					</ul>
				`;
			},
			// 개인 수업 목록
			scheduleList : function() {
				const self = this;
				const getList = function(command) {
					const data = self.data.result[command + "List"];
					if(data.length == 0) return "";
					const li = data.map(item => {
						const stateName = popupMemberPass.getStateName(item.scheduleState);
						const stateColor = popupMemberPass.getStateColor(item.scheduleState);
						const state = (stateName) ? `<em class="bg ${stateColor}">금일${stateName}</em>` : ``;
						const scheduleTime = item.scheduleDate.substr(item.scheduleDate.indexOf(" ") + 1);
						const remainCount = (item.useNumberType == "F" || item.remaining > 999999) ? "무제한" : item.remaining;
						return `
							<li class="${stateColor}">
								<a data-type="appointment" data-sequence="${item.seqSchedule}" data-event="entrance">
									<h4>${state}${scheduleTime}</h4>
									<p class="ui-note">
										${item.productPassName} / 만료일 : ${item.useEndDate.replace(/\./g, "-")} / 잔여 횟수 : ${remainCount} / 강사 : ${item.coachName}
									</p>
								</a>
							</li>
						`;
					});
					return li.join("");
				};
				return `
					<ul class="list">
						${getList("reservation")}
						${getList("attendance")}
						${this.newScheduleList()}
					</ul>
				`;
			},
			// 자리 선택
			seatList : function() {
				console.log(this.data);

				const option = [];
				const seatList = this.data.seatList || [];
				const maxSeat = this.data.maxSeat;
				const length = seatList.length;
				for(let i = 1; i <= maxSeat; i++) {
					for(var j = 0; j < length; j++)
						if(i == seatList[j].seatNo) break;
					if(j == length)
						option.push(`<option value="${i}">${i}</option>`);
				}
				return `
					<div class="ui-form">
						<table>
							<th>좌석선택</th>
							<td>
								<select class="ui-select" name="seatNo">
									<option value="">좌석선택</option>
									${option.join("")}
								</select>
							</td>
						</table>
					</div>
				`;
			},

			newScheduleList : function() {
				const item = this.data.result.productList[0];
				const remainCount = (item.useNumberType == "F") ? "무제한" : item.useNumber;
				return `
					<li>
						<a data-type="appointment" data-sequence="" data-event="entrance">
							<h4>현재 시간으로 출석하기</h4>
							<p class="ui-note">
								${item.productPassName} / 만료일 : ${item.useEndDate} / 잔여 횟수 : ${remainCount} / 강사 : ${item.coachName}
							</p>
						</a>
					</li>
				`;
			}
		}
	},

	checkinResult : {
		popup : undefined,
		data : {},
		open : function(data) {
			if(this.popup) return;
			this.data = data;
			this.render();
		},
		close : function() {
			this.popup = undefined;
			uiPopup();
		},
		render : function() {
			const self = this;
			this.popup = uiPopup({
				template : this.template(),
				event : {
					click : {
						close : function() {
							self.close();
						}
					}
				}
			});
		},
		template : function() {
			return `
				<div class="tiny">
					<div class="top">
						<h2>체크인 결과<a data-event="close"></a></h2>
					</div>
					<div class="middle">
						<h4 style="text-align:center; font-size:15px; font-weight:400">${this.data.message}</h4>
					</div>
					<div class="bottom">
						<button class="ui-button" data-event="close">닫기</button>
					</div>
				</div>
			`;
		}
	},

	confirmUpgrade : {
		popup : undefined,
		callback : undefined,
		open : function(callback) {
			if(this.popup) return;
			this.callback = callback;
			this.render();
		},
		close : function() {
			this.popup = undefined;
			uiPopup();
		},
		submit : function(object) {
			const value = object.getAttribute("data-value");
			this.callback(value);
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
							self.submit(this);
						},
					}
				}
			});
		},
		template : function() {
			return `
				<div class="tiny">
					<div class="top">
						<h2>업그레이드 확인<a data-event="close"></a></h2>
					</div>
					<div class="middle">
						해당 이용권은 패키지 이용권에 포함되어 있습니다.<br>
						패키지에 포함된 모든 이용권을 같이 업그레이드 하시겠습니까?
					</div>
					<div class="bottom">
						<button class="ui-button gray" data-event="close">취소</button>
						<button class="ui-button green" data-value="normal" data-event="submit">해당 이용권만</button>
						<button class="ui-button blue" data-value="package" data-event="submit">패키지 전체</button>
					</div>
				</div>
			`;
		}
	},

	// 기간 및 횟수 변경 시 예약 스케줄 체크
	confirmReserveSchedule : {
		popup : undefined,
		command : "",
		data : [],
		callback : undefined,
		cancelCallback : undefined,
		open : function(command, passList, fromDate, toDate, callback, cancelCallback) {
			if(this.popup) return;
			let isConfirm = false;
			const seqPassInfoList = passList.map(item => {
				if(item.serviceType == "APPOINTMENT" || item.serviceType == "CLASS")
					isConfirm = true;
				return item.seqPassInfo;
			});
			this.cancelCallback = cancelCallback;
			if(isConfirm) {
				scheduleController.reserveScheduleList(seqPassInfoList, fromDate, toDate).then(reserveList => {
					this.data = reserveList || [];
					this.command = command;
					this.callback = callback;
					if(this.data.length > 0)
						this.render();
					else
						callback();
				}).catch(error => {
					uiError(error);
				});
			} else {
				callback();
			}
		},
		close : function() {
			this.popup = undefined;
			uiPopup();
			if(this.cancelCallback)
				this.cancelCallback()
		},
		submit : function() {
			this.close();
			this.callback();
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
						},
					}
				}
			});
		},
		template : function() {
			const getMessage = () => {
				const message = "기존의 예약, 예약대기, 완료요청 스케줄은 취소됩니다.";
				switch(this.command) {
					case "period" : return "기간 변경 시, " + message;
					case "cross" : return "교체 시, " + message;
					case "refund" : return "환불 후 만료일 이후의 예약, 예약대기, 완료요청 스케줄은 취소됩니다.";
					case "transfer" : return "양도 시, " + message;
					case "pause" : return "중지 시, " + message;
				}
				return message;
			};

			const getCancelList = () => {
				const tr = this.data.map(item => {
					const startDate = uiDate(item.startDate, "time");
					const scheduleName = (item.classSchedule) ? item.classSchedule.lessonName : (item.passInfo) ? item.passInfo.serviceName : item.scheduleName;
					const scheduleState = uiParameter.schedule.state[item.scheduleState];
					const scheduleType = (item.scheduleType == "appointment") ? "개인" : "그룹";
					return `
						<tr>
							<td>${scheduleType}</td>
							<td>${startDate}</td>
							<td>${scheduleName}</td>
							<td>${scheduleState}</td>
						</tr>
					`;
				});
				return (tr.length == 0) ? `<tr><td class="empty" colspan="4">스케줄 내역이 없습니다.</td></tr>` : tr.join("");
			};
			return `
				<style type="text/css">
					.popupConfirm .ui-note	{margin-top:0}
					.popupConfirm .box		{margin-top:15px; max-length:300px; overflow-y:auto}
				</style>
				<div class="popupConfirm tiny">
					<div class="top">
						<h2>스케줄 취소 내역<a data-event="close"></a></h2>
					</div>
					<div class="middle">
						<p class="ui-note red">
							${getMessage()}
						</p>
						<div class="box">
							<table class="ui-table">
								<thead>
									<tr><td>구분</td><td>수업일시</td><td>수업명</td><td>상태</td></tr>
								</thead>
								<tbody>
									${getCancelList()}
								</tbody>
							</table>
						</div>
					</div>
					<div class="bottom">
						<button class="ui-button gray" data-event="close">취소</button>
						<button class="ui-button red" data-event="submit">계속</button>
					</div>
				</div>
			`;
		}
	},

	// 기간 및 횟수 변경 시 스케줄 체크
	confirmSchedule : {
		popup : undefined,
		command : "",
		data : [],
		callback : undefined,
		open : function(serviceKind, seqPassInfo, beforeStartDate, beforeEndDate, afterStartDate, afterEndDate, remainCount, callback) {
			if(this.popup) return;
			const fromTime = new Date(afterStartDate).getTime();
			const toTime = new Date(afterEndDate).getTime();

			scheduleController.scheduleList(seqPassInfo).then(scheduleList => {
				if(!scheduleList) scheduleList = [];

				// 기간 내 예약과 대기 내역
				this.data.reserveList = scheduleList.filter(item => {
					if(item.startDate && item.endDate) {
						const startTime = new Date(item.startDate.substr(0, 10)).getTime();
						const endTime = new Date(item.endDate.substr(0, 10)).getTime();
						if(item.scheduleState == "R" || item.scheduleState == "S")
							return (fromTime <= startTime && endTime <= toTime);
					}
					return false;
				}).reverse().filter((item, index) => {
					return (index >= remainCount);
				});

				// 기간 외 출석과 결석 내역
				const ignoreDate = new Date("2000-01-01").getTime();
				this.data.cancelList = scheduleList.filter(item => {
					if(item.startDate && item.endDate) {
						const startTime = new Date(item.startDate.substr(0, 10)).getTime();
						const endTime = new Date(item.endDate.substr(0, 10)).getTime();
						if(startTime < ignoreDate) return false;
//						if(item.scheduleState == "E" || item.scheduleState == "A" || item.scheduleState == "R")
						if(item.scheduleState == "R" || item.scheduleState == "W" || item.scheduleState == "S")
							return (fromTime <= startTime && endTime <= toTime) ? false : true;
					}
					return false;
				});
				this.callback = callback;
				const isPeriod = (this.data.cancelList.length > 0);
				const isNumber = (serviceKind == "N" && this.data.reserveList.length  > 0);
				this.error = (isNumber) ? "number" : (isPeriod) ? "period" : "";
				this.maxNumber = remainCount - 1;

				if(this.error)
					this.render();
				else
					this.callback();
			}).catch(error => {
				alert("예약 내역 확인 중 오류가 발생하였습니다.");
				uiError(error);
			});
		},
		close : function() {
			this.popup = undefined;
			uiPopup();
		},
		submit : function() {
			this.callback();
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
						},
					}
				}
			});
		},
		template : function() {
			const getScheduleList = () => {
				const useNumber = this.useNumber;
				const dataList = (this.error == "period") ? this.data.cancelList : this.data.reserveList;
				const tr = dataList.map((item, index) => {
					const startDate = uiDate(item.startDate, "time");
					const scheduleName = (item.classSchedule) ? item.classSchedule.lessonName : (item.passInfo) ? item.passInfo.serviceName : item.scheduleName;
					const scheduleState = uiParameter.schedule.state[item.scheduleState];
					const scheduleType = (item.scheduleType == "appointment") ? "개인" : "그룹";
//					const className = (this.error == "number") ? (this.maxNumber < index) ? "bad" : "good" : "";
					return `
						<tr>
							<td>${scheduleType}</td>
							<td>${startDate}</td>
							<td>${scheduleName}</td>
							<td>${scheduleState}</td>
						</tr>
					`;
				});
				return (tr.length == 0) ? `<tr><td class="empty" colspan="4">스케줄 내역이 없습니다.</td></tr>` : tr.join("");
			};

			const getTitle = () => {
				return (this.error == "period") ? "스케줄 취소 내역" : "예약 및 대기 내역";
			};

			const getNote = () => {
				return (this.error == "period") ? `
					아래 스케줄이 이용권 기간에 포함되지 않습니다.<br>
					수정하실 기간을 다시 확인해 주세요.
				` : `
					예약 및 대기 스케줄 중 초과되는 내역이 있습니다.<br>
					해당 내역을 취소 후 다시 변경해 주세요.
				`
			};

			return `
				<style type="text/css">
					.popupConfirm .box		{margin-top:15px; max-length:300px; overflow-y:auto}
					.popupConfirm .ui-note	{margin-top:0}
					.popupConfirm .good		{background-color:rgba(55,183,114,0.1)}
					.popupConfirm .bad		{background-color:rgba(255,87,34,0.1)}
				</style>
				<div class="popupConfirm tiny">
					<div class="top">
						<h2>${getTitle()}<a data-event="close"></a></h2>
					</div>
					<div class="middle">
						<p class="ui-note red">
							${getNote()}
						</p>
						<div class="box">
							<table class="ui-table">
								<thead>
									<tr><td>구분</td><td>수업일시</td><td>수업명</td><td>상태</td></tr>
								</thead>
								<tbody>
									${getScheduleList()}
								</tbody>
							</table>
						</div>
					</div>
					<div class="bottom">
						<button class="ui-button" data-event="close">확인</button>
					</div>
				</div>
			`;
		}
	},

	// 기간 및 횟수 변경 시 중지 기간 체크
	confirmPause : {
		popup : undefined,
		data : {},
		open : function(seqMember, seqPassInfo, useStartDate, useEndDate, callback) {
			if(this.popup) return;
			memberController.pause.list(seqMember, seqPassInfo).then(pauseList => {
				this.data =  {
					searchInfo : {
						seqMember : seqMember,
						seqPassInfo : seqPassInfo,
						useStartDate : useStartDate,
						useEndDate : useEndDate
					},
					pauseList : (pauseList || []).filter(item => {
						return (item.useYn == "Y");
					}),
				};
				if(this.check())
					callback();
				else
					this.render();
			}).catch(error => {
				console.log(error);
				alert("중지 기간 확인 중 오류가 발생하였습니다.");
			});
		},
		close : function() {
			this.popup = uiPopup();
		},
		check : function() {
			const searchInfo = this.data.searchInfo;
			const errorList = this.data.pauseList.filter(item => {
				const isRange = (date) => {
					return !(isLessDate(searchInfo.useStartDate, date) || isMoreDate(searchInfo.useEndDate, date));
				};
				const isError = item.isError = !(isRange(item.pauseStartDate) && isRange(item.pauseEndDate));
				return (isError);
			});
			return !(errorList.length);
		},
		render : function() {
			const self = this;
			this.popup = uiPopup({
				template : this.template(),
				event : {
					click : {
						close : function() {self.close()},
					}
				}
			});
		},
		template : function() {
			const searchInfo = this.data.searchInfo;
			const changePeriod = componentMember.getPeriod(searchInfo.useStartDate, searchInfo.useEndDate);
			const tr = this.data.pauseList.filter(item => {
				return (item.isError);
			}).map(item => {
				const pausePeriod = componentMember.getPeriod(item.pauseStartDate, item.pauseEndDate);
				const coachName = componentMember.getCoachName(item.regId);
				return `
					<tr>
						<td>${uiDate(item.regDt, "time")}</td>
						<td>${pausePeriod}</td>
						<td>${item.pausePeriod}일</td>
						<td>${coachName}</td>
					</tr>
				`;
			});
			return `
				<style type="text/css">
					.popupConfirm 					{max-width:720px}
					.popupConfirm .box				{max-length:300px; overflow-y:auto}
					.popupConfirm .box table		{line-height:1.4; text-align:center}
					.popupConfirm .box table tr > *	{padding:8px !important}
				</style>
				<div class="popupConfirm">
					<div class="top">
						<h2>
							중지 기간 오류
							<a data-event="close"></a>
						</h2>
					</div>
					<div class="middle ui-form">
						<table>
							<tr>
								<th>변경 기간</th>
								<td>${changePeriod}</td>
							</tr>
							<tr>
								<th>중지 기간 내역</th>
								<td>
									<div class="box">
										<table class="ui-table">
											<thead>
												<tr><td>중지 신청일</td><td>중지 기간</td><td>중지 일수</td><td>담당자</td></tr>
											</thead>
											<tbody>
												${tr.join("")}
											</tbody>
										</table>
									</div>
									<p class="ui-note red">
										변경 기간 내에 <span class="red">포함되지 않는 중지 내역이 있습니다.</span>
										해당 중지 내역을 <span class="red">삭제 또는 변경 후 기간 변경</span>을 다시 시도해 주세요.
									</p>
								</td>
							</tr>
						</table>
					</div>
					<div class="bottom">
						<button class="ui-button" data-event="close">확인</button>
					</div>
				</div>
			`;
		}
	}
}
