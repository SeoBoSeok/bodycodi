const componentMember = {
	permission : {},
	data : {},

	setMainTab : function(index) {
		const sequence = (typeof seqMember == "undefined") ? uiProfile.seqMember : seqMember;
		const tabList = [{
			name : "홈",
			href : "/member/" + sequence + "/home"
		}, {
			name : "이용권",
			href : "/member/" + sequence + "/pass"
		}, {
			name : "판매내역",
			href : "/member/" + sequence + "/orderInfo"
		}, {
			name : "변경내역",
			href : "/member/" + sequence + "/history/pass"
		}, {
			name : "상담내역",
			href : "javascript:location.href = '/member-counseling/index?seqMember=' + uiProfile.data.seqMember + '&isMember=true'"
		}];

		const div = document.querySelector("main .ui-tab.block");
		if(!div) return;

		const ul = tabList.map((item, i) => {
			const isChecked = (index == i) ? "checked" : "";
			return `<li><label><a href="${item.href}"><input name="mainTab" type="radio" ${isChecked}><div>${item.name}</div></a></label></li>`;
		});
		div.innerHTML = "<ul>" + ul.join("") + "</ul>";
	},

	getBranchName : function(item) {
		if(!item) return "-";
		if(item.branch && item.branch.partnerName)
			return item.branch.partnerName;
		const seqPartnerBranch = item.seqPartnerBranch;
		if(seqPartnerBranch === undefined || seqPartnerBranch === null) return "-";
		if(seqPartnerBranch === 0) return "본사";
		if(item.partnerBranch) {
			return item.partnerBranch.partnerName || "-";
		} else if(this.data.branchList) {
			const data = this.data.branchList.filter(item => {
				return (item.seqPartnerBranch == seqPartnerBranch);
			})[0];
			return (data) ? data.partnerName : "-";
		}
	},

	getHour : function() {
		const optionList = [];
		for(let i = 0; i < 24; i++) {
			const value = i.zf(2);
			optionList.push(`<option value="${value}">${value}</option>`);
		}
		return optionList.join("")
	},

	getMinute : function() {
		const optionList = [];
		for(let i = 0; i < 60; i++) {
			const value = i.zf(2);
			optionList.push(`<option value="${value}">${value}</option>`);
		}
		return optionList.join("")
	},

	getServiceTime : function(item) {
		return (item.serviceTime != undefined && item.serviceTime != null) ? item.serviceTime + "분" : "-";
	},

	getServiceTypeName : function(item) {
		if(!item.serviceType) return "-";
		return uiParameter.service.name[item.serviceType] + ((item.optionType == "LOCKER") ? "(락커)" : "");
	},

	getServiceKindName : function(item) {
		if(!item.serviceKind) return "-";
		return uiParameter.service.kind[item.serviceKind];
	},

	getServiceGenreName : function(seqServiceGenre) {
		if(!this.data.genreList) return "-";
		const data = this.data.genreList.filter(item => {
			return (item.seqServiceGenre == seqServiceGenre);
		})[0];
		return (data) ? data.serviceGenreName : "-";
	},

	getPlaceName : function(seqPlace) {
		if(!this.data.placeList) return "-";
		const data = this.data.placeList.filter(item => {
			return (item.seqPartnerSpace == seqPlace);
		})[0];
		return (data) ? data.spaceName : "-";
	},

	getSummary : function(item, hasLimit) {
		const summary = [];
		summary.push(uiParameter.service.kind[item.serviceKind]);
		summary.push(uiParameter.service.name[item.serviceType]);
//		summary.push(this.getServiceGenreName(item.seqServiceGenre));
		if(item.serviceTime)
			summary.push(item.serviceTime + "분");
		if(item.seqPlace)
			summary.push(this.getPlaceName(item.seqPlace));
		if(hasLimit) {
			const dayLimit = this.getDayLimit(item);
			const weekLimit = this.getWeekLimit(item);
			summary.push(`일일 : ${dayLimit} · 주간 : ${weekLimit}`);
		}
		return summary.join(" / ");
	},

	setCoachList : function(object) {
		object = (object) ? object : document;
		const select = object.querySelector("[name='seqPartnerCoach']");
		const option = this.data.coachList.sort(function(a) {
			return (a.employeeTypeCode == "-1") ? -1 : 0;
		}).map(item => {
			return `<option value="${item.seqPartnerCoach}">${item.coachName}</option>`;
		});
		if(select) {
			select.innerHTML += option.join("");
			const employeeId = partnerInfo.employee.id;
			const isCoach = this.data.coachList.some(item => {
				return (item.seqPartnerCoach == employeeId);
			});
			if(isCoach)
				select.value = employeeId;
			else {
				select.options[1].selected = true;
			}
		}
	},

	getCoachList : function(seqPartnerCoach) {
		const coachList = this.data.coachList || [];
		const optionList = coachList.sort(function(a) {
			return (a.employeeTypeCode == "-1") ? -1 : 0;
		}).map(item => {
			const selected = (item.seqPartnerCoach == seqPartnerCoach) ? "selected" : "";
			return `<option value="${item.seqPartnerCoach}" ${selected}>${item.coachName}</option>`;
		});
		return optionList.join("");
	},

	getSalesList : function() {
		const salesList = this.data.salesList || [];
		const optionList = salesList.map(item => {
			return `<option value="${item.seqSalesClassification}">${item.salesClassificationName}</option>`;
		});
		return optionList.join("");
	},

	getCardList : function() {
		const cardList = this.data.cardList || [];
		const optionList = cardList.map(item => {
			return `<option value="${item.value}">${item.title}</option>`;
		});
		return optionList.join("");
	},

	getBankList : function() {
		const bankList = this.data.bankList || [];
		const optionList = bankList.map(item => {
			return `<option value="${item.value}">${item.title}</option>`;
		});
		return optionList.join("");
	},

	getBankAccountList : function() {
		const bankAccountList = this.data.bankAccountList || [];
		const optionList = bankAccountList.map(item => {
			return `<option value="${item.seqBankAccount}">${item.bankName} / ${item.accountNumber} / ${item.accountHolder}</option>`;
		});
		return optionList.join("");
	},

	getPassName : function(item) {
		const passName = [];
		passName.push(item.serviceName);
		if(item.serviceKind == "N")
			passName.push(item.useNumber + "회");
		passName.push(item.usePeriod + ((item.usePeriodType == "M") ? "개월" : "일"));
		return passName.join(" ");
	},

	getColor : function(item) {
		return uiParameter.service.color[item.serviceType] || "";
	},

	getServiceColor : function(item) {
		const serviceType = (item.serviceCategory == "PACKAGE") ? "PACKAGE" : item.serviceType || item.passes[0].serviceType;
		if(serviceType == "PACKAGE") return "green";
		const serviceColor = uiParameter.service.color[serviceType];
		const isPackage = (item.pricing && item.pricing.serviceCategory == "PACKAGE");
		return serviceColor + ((isPackage) ? " package" : "");
	},

	getCoachDisplay : function(item) {
		const passList = item.passes || [];
		return (passList.some(item => {
			return (item.serviceType == "APPOINTMENT");
		})) ? "" : "hidden";
	},

	getSex : function(sex) {
		return (sex == "M") ? "남성" : "여성";
	},

	getDate : function(date, isDate) {
		if(!date) return "-";
		return uiDate(date, (isDate) ? "" : "time");
	},

	getMemberInfo : function(item, name) {
		item = (item.member) ? item.member : item;
		if(name == "name")
			return `<a class="underline" href="/member/${item.seqMember}/home">${item.name || "-"}</a>`;
		return item[name] || "-";
	},

	getCoachName : function(seqPartnerCoach) {
		if(!seqPartnerCoach) return "-";
		if(typeof seqPartnerCoach == "object") {
			const orderInfo = seqPartnerCoach;
			if(orderInfo.coach && orderInfo.coach.coachName) {
				return orderInfo.coach.coachName;
			} else {
				seqPartnerCoach = orderInfo.seqPartnerCoach || 0;
			}
		}
		const data = this.data.coachList.filter(item => {
			return (item.seqPartnerCoach == seqPartnerCoach);
		})[0];
		return (data) ? data.coachName : "-";
	},

	getInboundPathName : function(seqInboundPath) {
		if(!seqInboundPath) return "-";
		const data = this.data.inboundPathList.filter(item => {
			return (item.seq_attr_value == seqInboundPath);
		})[0];
		return (data) ? data.attr_value : "-";
	},

	getCardName : function(cardCode) {
		const data = this.data.cardList.filter(item => {
			return (item.value == cardCode);
		})[0];
		return (data) ? data.title : "카드결제";
	},

	getCardNumber : function(cardNumber) {
		if(!cardNumber) return "";
		return cardNumber.substr(cardNumber.length - 4, 4);
	},

	getPeriod : function(startDate, endDate) {
		return uiDate(startDate) + " ~ " + uiDate(endDate);
	},

	getUsePeriod : function(item, isRange) {
		if(isRange == false) {
			return item.usePeriod + ((item.usePeriodType == "M") ? "개월" : "일");
		} else {
			const useStartDate = uiDate(item.useStartDate);
			const useEndDate = uiDate(item.useEndDate);
			return useStartDate + " ~ " + useEndDate;
		}
	},

	getRemainPeriod : function(item, isDay) {
		const usePeriod = this.getUsePeriodDay(item);
		let spendPeriod = getPeriod(item.useStartDate, getDate()) + 1;
		if(spendPeriod > usePeriod) spendPeriod = usePeriod;
		else if(spendPeriod < 0) spendPeriod = 0;
		const remainPeriod = usePeriod - spendPeriod;
		return (isDay) ? remainPeriod : `${remainDay}일 / ${usePeriod}일`;
	},

	getRemainNumber : function(item) {
		if(item.serviceKind == "P" || item.useNumber < 0) return "무제한";
		return `${item.remainNumber}회 / ${item.useNumber}회`;
	},

	getUsePeriodDay : function(item) {
		return getPeriod(item.useStartDate, item.useEndDate) + 1;
	},

	getAutoFixDate : function(name, value, useStartDate, useEndDate, isIgnore) {
		const isCorrect = /^(\d{4})-(\d{2})-(\d{2})$/.test(value);
		name = name.toLowerCase();
		if(name.indexOf("date") == -1) return value;
		const isEnd = (name.indexOf("end") > -1);
		const a = getNumber((isEnd ? useStartDate : value), true);
		const b = getNumber((isEnd ? value : useEndDate), true);
		if(!isCorrect || (isIgnore != true && (a > b || b < a)))
			return isEnd ? useEndDate : useStartDate;
		return value;
	},

	getConvertToMonth : function(startDate, endDate) {
		const a = new Date(startDate);
		const b = new Date(endDate);
		const month = ((b.getFullYear() - a.getFullYear()) * 12) + (b.getMonth() - a.getMonth());
		return (month > 0 && endDate == getElapse(startDate, 0, month, -1)) ? month : 0;
	},

	getUsePeriodType : function(useStartDate, useEndDate, isPeriod) {
		const month = this.getConvertToMonth(useStartDate, useEndDate);
		if(isPeriod)
			return (month) ? month : getPeriod(useStartDate, useEndDate) + 1;
		else
			return (month) ? "M" : "D";
	},

	getUseStartDate : function(useEndDate, usePeriod, usePeriodType) {
		const date = new Date(useEndDate);
		if(usePeriodType == "M") {
			let year = date.getFullYear();
			let month = date.getMonth() + 1 - usePeriod;
			let day = date.getDate();
			if(month < 1) {
				year = year - 1;
				month = month + 12;
			}
			const lastDay = new Date(year, month, 0).getDate();
			if(lastDay < day)
				date.setDate(lastDay - 1);
			date.setMonth(date.getMonth() - usePeriod);
			date.setDate(date.getDate() + 1);
		} else {
			date.setDate(date.getDate() + 1 - usePeriod);
		}
		return getCalendar(date);
	},

	getUseEndDate : function(useStartDate, usePeriod, usePeriodType) {
		const date = new Date(useStartDate);
		if(usePeriodType == "M") {
			let year = date.getFullYear();
			let month = date.getMonth() + 1 + usePeriod;
			let day = date.getDate();
			if(month > 12) {
				year = year + 1;
				month = month - 12;
			}
			const febDay = new Date(year, 2, 0).getDate();
			if(month == 2 && day > febDay)
				date.setDate(febDay + 1);
			date.setMonth(date.getMonth() + usePeriod);
		} else {
			date.setDate(date.getDate() + usePeriod);
		}
		date.setDate(date.getDate() - 1);
		return getCalendar(date);
	},

	getUseNumber : function(item) {
		return (item.serviceKind == "P" || item.useNumber < 0) ? "무제한" : item.useNumber + "회";
	},

	getLimit : function(item) {
		const dayLimit = this.getDayLimit(item);
		const weekLimit = this.getWeekLimit(item);
		return `일일 ${dayLimit} / 주간 ${weekLimit}`;
	},

	getLimitNumber : function(value, unit) {
		if(!unit) unit = "회";
		return (value < 0) ? "무제한" : getComma(value) + unit;
	},

	getLimitSpendNumber : function(remain, number, unit) {
		if(!unit) unit = "회";
		let spend = (remain < 0) ? Math.abs(remain) - 1 : number - remain;
		if(spend < 0) spend = 0;
		return getComma(spend) + unit;
	},

	getLimitState : function(remain, number, unit) {
		return this.getLimitSpendNumber(remain, number, unit) + " / " +  this.getLimitNumber(number, unit);
	},

	getDayLimit : function(item) {
		return (item.dayLimit < 0) ? "무제한" : getComma(item.dayLimit) + "회";
	},

	getUseDayLimit : function(item, style) {
		if(item.dayLimit < 0) return "무제한";
		return `${item.dayLimit}일 중 0일 사용`;
	},

	getWeekLimit : function(item) {
		return (item.weekLimit < 0) ? "무제한" : getComma(item.weekLimit) + "회";
	},

	getUseWeekLimit : function(item) {
		if(item.weekLimit < 0) return "무제한";
		return `${item.weekLimit}일 중 0일 사용`;
	},

	getPauseNumber : function(item) {
		const pauseNumber = (item.pauseNumber < 0) ? "무제한" : item.pauseNumber + "회";
		const pausePeriod = (item.pausePeriod < 0) ? "무제한" : item.pausePeriod + "일";
		if(item.pauseNumber < 0 && item.pausePeriod < 0) return "무제한";
		return `${pauseNumber} / ${pausePeriod}`;
	},

	changedPassName : function(item) {
		if(item.transferType == "RECEIVE") return "양수";
		if(item.transferType == "TRANSFER") return "양도";
		if(item.orderType == "CROSS") return "교체";
		if(item.orderType == "UPGRADE") return "업그레이드";
		if(item.orderType == "TRANSFER") return "양도";
		if(item.orderType == "MERGE") return "결합";
		if(item.crossPrice) return "교체";
		if(item.upgradePrice) return "업그레이드";
		if(item.mergePrice) return "결합";
		return "-";
	},

	getPassState : function(item) {
		if(item.status == "EXPIRATION") return "expired";
		else if(item.status == "PAUSE") return "pause";

		const today = getDate().getTime();
		const useStartDate = getDate(new Date(item.useStartDate)).getTime();
		const useEndDate = new Date(item.useEndDate).getTime();
		const isStart = (useStartDate <= today);
		const isEnd = (useEndDate < today);
		if(isEnd) return "expired";
		else if(!isStart) return "standby";
		else if(item.useYn == "N") return "pause";
		else return "using";
	},

	getPassStateName : function(state) {
		switch(state) {
			case "using" : return "이용중";
			case "pause" : return "중지중";
			case "standby" : return "이용예정";
			case "expired" : return "만료";
		}
		return "";
	},

	getPassStateColor : function(state) {
		switch(state) {
			case "using" : return "green";
			case "pause" : return "red";
			case "standby" : return "gray";
			case "expired" : return "black";
		}
		return "";
	},

	getPassTag : function(item) {
		const passState = this.getPassState(item);
		const passStateColor = this.getPassStateColor(passState);
		const passStateName = this.getPassStateName(passState);

		const isChanged = this.pass.isChanged(item, true);
		const tagList = [];
		tagList.push(`<em class="bg ${passStateColor}">${passStateName}</em>`);
		if(item.seqPackage)
			tagList.push(`<em class="bg other">패키지</em>`);
		if(isChanged) {
			const changedPassName = this.changedPassName(item);
			tagList.push(`<em class="bg other">${changedPassName}</em>`);
		}
		return tagList.join("");
	},

	getRemainDate : function(item, passState) {
		if(passState == "expired") return "";
		else if(passState == "standby") return "<span>(이용예정)</span>";
		const period = getPeriod(getDate(), getDate(item.useEndDate));
		const color = (period < 7) ? "red" : "green";
		const day = "D-" + period;
		return `<span class="${color}">(${day})</span>`;
	},

	getRemainDay : function(item, passState) {
		return getPeriod(getDate(), getDate(item.useEndDate));
	},

	getSalesClassificationName : function(item) {
		const seqSalesClassification = item.seqSalesClassification;
		const data = this.data.salesList.filter(item => {
			return (item.seqSalesClassification == seqSalesClassification);
		})[0];
		return (data) ? data.salesClassificationName : "-";
	},

	getReceiptSummary : function(item) {
		const approvalNumber = item.approvalNumber || "미입력";
		if(item.paymentType == "CARD") {
			const cardName = (item.cardCode) ? this.getCardName(item.cardCode) : "카드결제";
			const cardNumber = item.cardNumber || "미입력";
			return `${cardName}(${cardNumber}) / 승인번호 : ${approvalNumber}`;
		} else {
			const cashReceiptType = uiParameter.payment.cashReceiptType[item.cashReceiptType];
			let cashReceiptNumber = (item.cashReceiptNumber || "").split("-");
			cashReceiptNumber = cashReceiptNumber[cashReceiptNumber.length - 1];
			if(cashReceiptNumber.length >= 4)
				cashReceiptNumber = cashReceiptNumber.substr(cashReceiptNumber.length - 4);
			const cashReceiptYn = (item.cashReceiptYn == "Y") ? `${cashReceiptType}(${cashReceiptNumber})` : `미발행`;
			return `현금영수증 : ${cashReceiptYn} / 승인번호 : ${approvalNumber}`;
		}
	},

	getPaymentDate : function(item) {
		let date = item.paymentDatetime;
		if(item.paymentDate) {
			const time = item.paymentDatetime.split("T")[1];
			date = item.paymentDate + "T" + time;
		}
		return uiDate(date, "time");
	},

	getPaymentKind : function(item) {
		return (item.orderClassification == "TRANSFER") ? "양도" : uiParameter.payment.paymentKind[item.paymentKind];
	},

	getPaymentList : function(isModify, isList) {
		const paymentList = [];
		this.data.orderList.filter(item => {
			return (item.orderStatus == "COMPLETED");
		}).forEach(item => {
			const paymentName = item.orderName || "-";
			const orderType = item.orderType.toLowerCase();
			const orderClassification = item.orderClassification;
			const seqPartnerCoach = item.seqPartnerCoach;
			item.payments.forEach(item => {
				item.orderType = orderType;
				item.paymentName = paymentName;
				item.orderClassification = orderClassification;
				if(!item.seqPartnerCoach)
					item.seqPartnerCoach = seqPartnerCoach;
				if(item.useYn != "N") paymentList.push(item);
			});
		});

		const tr = paymentList.sort(function(a, b) {
			const dateA = new Date(a.paymentDate).getTime();
			const dateB = new Date(b.paymentDate).getTime();
			const sequence = (a.seqOrderPayment == b.seqOrderPayment) ? 0 : (a.seqOrderPayment < b.seqOrderPayment) ? 1 : -1;
			return (dateA == dateB) ? sequence : (dateA < dateB) ? 1 : -1;
		}).map(item => {
			const coachName = this.getCoachName(item.seqPartnerCoach);
			const paymentDate = uiDate(item.paymentDate);
			const paymentType = uiParameter.payment.paymentType[item.paymentType];
			const paymentKind = this.getPaymentKind(item);
			const getModifyButton = () => {
				if(!isModify) return "";
				const type = (isList) ? item.orderType : item.paymentType.toLowerCase();
				const sequence = (isList) ? item.seqOrderInfo : item.seqOrderPayment;
				const buttonName = (isList) ? "결제 수정" : "수정";
				const buttonColor = (isList) ? "white" : "white";
				let disabled = (item.orderClassification == "TRANSFER") ? "disabled" : "";

				if(this.permission.permissionPayment && !this.permission.permissionPayment.updatePayment) disabled = "disabled";
				return `
					<td>
						<button class="ui-button medium ${buttonColor}" data-type="${type}" data-sequence="${sequence}" data-event="update" ${disabled}>${buttonName}</button>
					</td>
				`;
			};
			const getPaymentName = () => {
				if(!isList) return "";
				return `<td class="name">${item.paymentName}</td>`;
			};
			const getPaymentType = () => {
				return "";
				if(!isList) return "";
				return `<td>${uiParameter.history[item.orderType.toUpperCase()]}</td>`;
			};
			return `
				<tr>
					<td>${paymentDate}</td>
					<!--<td>-</td>-->
					${getPaymentType()}
					${getPaymentName()}
					<td>${paymentKind}</td>
					<td>${coachName}</td>
					<td>${paymentType}</td>
					<td class="currency" data-amount="${item.paymentAmount}">
						${getComma(item.paymentAmount)}원
						<span></span>
					</td>
					<td class="memo">${componentMember.getReceiptSummary(item)}</td>
					${getModifyButton()}
				</tr>
			`;
		});

		return (tr.length == 0) ? `<tr><td class="empty" colspan="10">결제 정보가 없습니다.</td></tr>` : tr.join("");
	},

	getPaymentSummaryList : function(data, isDetail, isUpdate) {
		isUpdate = (isUpdate) ? "" : "hidden";

		let paymentList = data.payments || [];
		paymentList.sort(function(a, b) {
			const dateA = new Date(a.paymentDate).getTime();
			const dateB = new Date(b.paymentDate).getTime();
			return (dateA == dateB) ? 0 : (dateA < dateB) ? 1 : -1;
		});

		const getRowspan = function(date) {
			return paymentList.filter(item => {
				return (item.paymentDate == date);
			}).length;
		};
		let beforeDate = "";
		const tr = paymentList.filter(item => {
			if(!isUpdate && item.paymentKind == "REPAYMENT") return false;
			return (item.useYn != "N");
		}).map(item => {
			const date = item.paymentDate;
			const paymentDate = uiDate(item.paymentDate);
			const paymentDateTime = uiDate(item.paymentDatetime, "time");
			const paymentType = uiParameter.payment.paymentType[item.paymentType];
			const paymentKind = uiParameter.payment.paymentKind[item.paymentKind];
			const amount = getComma(item.paymentAmount);
			const coachName = (item.seqPartnerBranch !== undefined) ? ((item.coach) ? item.coach.coachName || "-" : "-") : this.getCoachName(item.seqPartnerCoach);
			const paymentStatus = uiParameter.payment.paymentStatus[item.paymentStatus];
			const common = `
				<td>${paymentKind}</td>
				<td>${paymentStatus}</td>
				<td>${coachName}</td>
				<td>${paymentType}</td>
				<td>${amount}원</td>
				<td class="memo">${this.getReceiptSummary(item)}</td>
				<td>${paymentDateTime}</td>
				<td class="${isUpdate}">
					<button class="ui-button medium green" data-state="" data-sequence="${item.seqOrderPayment}" data-event="update">수정</button>
				</td>
			`;

			if(beforeDate != date) {
				beforeDate = date;
				const length = getRowspan(date);
				const rowspan = (length > 1) ? "rowspan=" + length : "";
				return `
					<tr>
						<td ${rowspan}>${paymentDate}</td>
						${common}
					</tr>
				`;
			} else {
				return `<tr>${common}</tr>`;
			}
		});

		return `
			<table class="ui-table">
				<thead>
					<tr><td>결제일</td><td>결제구분</td><td>결제상태</td><td>결제담당</td><td>결제수단</td><td>결제금액</td><td>결제상세</td><td>결제처리일시</td><td class="${isUpdate}">기타</td></tr>
				</thead>
				<tbody>
					${(tr.length == 0) ? `<tr><td class="empty" colspan="9">결제 정보가 없습니다.</td></tr>` : tr.join("")}
				</tbody>
			</table>
		`;
	},

	getPlaceList : function(data) {
		const option = data.map(item => {
			return `<option value="${item.seqPartnerSpace}">${item.spaceName}</option>`;
		});
		return option.join("");
	},

	getBranchTypeName : function(seqPartnerBranchType) {
		const dataList = this.data.branchTypeList || [];
		const data = dataList.filter(item => {
			return (item.seqPartnerBranchType == seqPartnerBranchType);
		})[0];
		return (data) ? data.name : "-";
	},

	getBranchTypeNameList : function(data) {
		if(!data) data = [];
		return data.map(item => {
			return this.getBranchTypeName(item.seqPartnerBranchType);
		}).join(", ") || "소속지점";
	},

	getBranchList : function(seqPartnerBranch) {
		const branchList = this.data.branchList || [];
		const option = branchList.map(item => {
			const selected = (item.seqPartnerBranch == seqPartnerBranch) ? "selected" : "";
			return `<option value="${item.seqPartnerBranch}" ${selected}>${item.partnerName}</option>`;
		});
		return option.join("");
	},

	getBranchTypeList : function() {
		const dataList = this.data.branchTypeList || [];
		const inputList = dataList.map(item => {
			return `
				<label class="ui-input-checkbox">
					<input name="seqPartnerBranchType" type="checkbox" value="${item.seqPartnerBranchType}">
					<span></span>
					${item.name}
				</label>
			`;
		});
		return inputList.join("");
	},

	getOrderType : function(item) {
		return (item.orderType) ? uiParameter.order.type[item.orderType] : "-";
	},

	getOrderState : function(item) {
		const orderType = item.orderType;					// PASS || UPGRADE || CROSS || TRANSFER
		const orderState = item.orderState;					// COMPLETED || CANCELLED || MERGED || REFUNDED || REFUNDED_PART
		const passState = this.pass.getPassState(item);		// COMPLETED || UPGRADED || CROSSED || MERGED || TRANSFERRED

		const orderTypeName = this.getOrderType(item);
		const orderStateName = this.getOrderStateName(item);
		const passStateName = (passState == "UPGRADED") ? "업그레이드" : (passState == "CROSSED") ? "교체" : (passState == "MERGED") ? "결합" : (passState == "MERGED_PART") ? "부분 결합" : (passState == "REFUNDED") ? "환불" : (passState == "TRANSFERRED") ? "양도" : (passState == "EXTENSION") ? "(구)결합" : "";

		if(!orderState || orderState == "COMPLETED") {
			return (passState == "COMPLETED") ? "완료" : (passState) ? passStateName : "완료";
		}
		return orderStateName;
	},

	getOrderStateName : function(item) {
		return uiParameter.order.state[item.orderState] || "기타";
	},

	getOrderStateColor : function(item) {
		const passStatus = (item.passInfos && item.passInfos[0]) ? item.passInfos[0].status : "";
		if(item.orderState == "CANCELLED") return "red";
//		if(item.orderState == "REFUNDED" || item.orderState == "REFUNDED_PART" || item.orderState == "CANCELLED") return "red";
//		if(passStatus == "AVAILABLE" || passStatus == "PAUSE") return "green";
		return "";
	},

	getRefundStateName : function(item) {
		if(item.serviceKind == "P") {
			const refundBaseDate = item.refundBaseDate;
			const today = getCalendar();
		} else {
			const refundNumber = item.refundNumber;
			const useNumber = item.useNumber;
		}
		return "-";
	},

	getOrderList : function(data, beforeData, passInfo) {
		if(!data) data = [];
		if(beforeData)
			data = data.concat(beforeData.filter(item => {
				return (item.orderState == "COMPLETED");
			}));

		data = data.sort(function(a, b) {
			const dateA = new Date(a.orderDate).getTime();
			const dateB = new Date(b.orderDate).getTime();
			const sequence = (a.seqOrderInfo == b.seqOrderInfo) ? 0 : (a.seqOrderInfo < b.seqOrderInfo) ? 1 : -1;
			return (dateA == dateB) ? sequence : (dateA < dateB) ? 1 : -1;
		});

		const isBefore = (beforeData);
//		const seqPricingDetail = (passInfo) ? passInfo.seqPricingDetail : 0;

		const tr = data.map((item, index) => {
			const orderDate = uiDate(item.orderDate);
			const orderDateTime = uiDate(item.orderCompletedDatetime, "time");
			const orderName = item.orderName || "-";
			const coachName = componentMember.getCoachName(item.seqPartnerCoach);
			const colorRed = (item.receivables == 0) ? "" : "red";
			const memo = uiSafeValue(item.memo);
			/*
			let subItem = undefined;
			if(passInfo) {
				const passList = (item.pricing || [])[0].passes || [];
				if(passList.length > 1) {
					subItem = passList.filter(item => {
						return (item.seqPricingDetail == seqPricingDetail);
					})[0];
				}
			}
			const getSubItem = (name, color) => {
				return "";
				if(!subItem) return "";
				let value = subItem[name];
				if(name == "beforePrice")
					value = (subItem.upgradePrice || subItem.mergePrice || 0) ? subItem.price - (subItem.upgradePrice || subItem.mergePrice || 0) : 0;
				else if(name == "name")
					return `<h6>(${subItem.serviceName})</h6>`;
				return `<h6 class=${color || ""}>(${getComma(value)}원)</h6>`;
			};
			*/
			const beforePrice = (item.upgradePrice || item.mergePrice || 0) ? item.price - (item.upgradePrice || item.mergePrice || 0) : 0;
			const isHidden = (isBefore) ? "" : "hidden";
//			const isHistory = (index > 0) ? "history" : "";
			return `
				<tr>
					<td>${orderDate}</td>
					<!--<td>-</td>-->
					<td>${this.getOrderType(item)}</td>
					<td>${this.getOrderState(item)}</td>
					<td class="name">${orderName}</td>
					<td class="currency">${getComma(item.price)}원</td>
					<td class="currency beforeAmount ${isHidden}">${getComma(beforePrice)}원</td>
					<td class="currency">${getComma(item.discountAmount)}원</td>
					<td class="currency">${getComma(item.salePrice)}원</td>
					<td class="currency green">${getComma(item.paymentAmount)}원</td>
					<td class="currency ${colorRed}">${getComma(item.receivables)}원</td>
					<td class="amount">${getComma(item.usePoint)}원</td>
					<td class="amount">${getComma(item.rewardPoint)}원</td>
					<td>${coachName}</td>
					<td class="memo" title="${memo}">${memo}</td>
					<td>${orderDateTime}</td>
				</tr>
				<tr>
					<td colspan="15">
						<div class="box">
							<div class="top">
								<h5 class="ui-sub-title">결제 내역</h5>
								${this.getPaymentSummaryList(item, true)}
							</div>
						</div>
					</td>
				</tr>
			`;
		});
		return (tr.length == 0) ? `<td class="empty" colspan="14">판매 정보가 없습니다.</td>` : tr.join("");
	},

	getOrderInfo : function(item) {
		this.getPricingList.self = this.getPricingList.upgrade.self = this.getPricingList.cross.self = this.getPricingList.merge.self = this;

		const orderDate = uiDate(item.orderDate);
		const orderDateTime = uiDate(item.orderCompletedDatetime, "time");
		const orderName = item.orderName || "-";
		const coachName = this.getCoachName(item.seqPartnerCoach);
		const getPassCoach = (type) => {
			if(item.pricing.length == 0) return "";
			const passInfo = item.pricing[0].passes[0];
			const serviceType = passInfo.serviceType;
			const coachName = this.getCoachName(passInfo.seqPartnerCoach);
			if(serviceType == "APPOINTMENT")
				return (type == "head") ? "<td>담당강사</td>" : "<td>" + coachName + "</td>";
			return "";
		};
		return `
			<table class="ui-table center">
				<thead>
					<tr>
						<td>판매일</td><!--<td>판매지점</td>--><td>판매분류</td><td>판매상태</td><td>판매내역</td>
						<td>정가</td><td>할인</td><td>마일리지</td><td>판매가</td>
						<td>결제금액</td><td>미수금</td><td>판매담당</td>
						${getPassCoach("head")}
						<td>판매처리일시</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>${orderDate}</td>
						<!--<td>-</td>-->
						<td>${uiParameter.order.type[item.orderType]}</td>
						<td>${uiParameter.order.state[item.orderState] || "완료"}</td>
						<td class="name">${orderName}</td>
						<td class="currency">${getComma(item.price)}원</td>
						<td class="currency">${getComma(item.discountAmount)}원</td>
						<td class="amount">${getComma(item.usePoint)}원</td>
						<td class="currency">${getComma(item.salePrice)}원</td>
						<td class="currency green">${getComma(item.paymentAmount)}원</td>
						<td class="currency red">${getComma(item.receivables)}원</td>
						<td>${coachName}</td>
						${getPassCoach("body")}
						<td>${orderDateTime}</td>
					</tr>
				</tbody>
			</table>
		`;
	},

	getPricingList : {
		pass : function(data) {
			const pricingList = [];
			data.pricing.forEach(item => {
				const seqOrderPricing = item.seqOrderPricing;
				const pricingName = item.pricingName;
				const serviceCategory = item.serviceCategory;
				const passLength = item.passes.length;
				item.passes.forEach(item => {
					item.pricingName = pricingName;
					item.serviceCategory = serviceCategory;
					item.passLength = passLength;
					pricingList.push(item);
				});
			});

			let beforeSequence = 0;
			let tr = pricingList.map(item => {
				const getPrefix = function() {
					const isPackage = (item.serviceCategory == "PACKAGE");
					if(!isPackage) return "<td>단일</td>";
					if(beforeSequence == item.seqOrderPricing) return "";
					beforeSequence = item.seqOrderPricing;
					return `<td rowspan=${item.passLength}">패키지</td>`;
				};

				return `
					<tr>
						${getPrefix()}
						<td>${item.serviceName}</td>
						<td>${item.pricingName}</td>
						<td>${this.self.getUsePeriod(item)}</td>
						<td>${this.self.getUseNumber(item)}</td>
						<td>${this.self.getLimit(item)}</td>
						<td>${getComma(item.salePrice)}원</td>
						<td class="green">${getComma(item.paymentAmount)}원</td>
						<td class="red">${getComma(item.receivables)}원</td>
						<td>${this.self.getSalesClassificationName(item)}</td>
					</tr>
				`;
			});
			tr = (tr.length == 0) ? `<tr><td colspan="11">이용권 정보가 없습니다.</td></tr>` : tr.join("");
			return `
				<table class="ui-table">
					<thead>
						<tr><td>구분</td><td>서비스</td><td>가격정책</td><td>기간</td><td>횟수</td><td>이용제한</td><td>판매가</td><td>결제금액</td><td>미수금</td><td>매출분류</td></tr>
					</thead>
					<tbody>
						${tr}
					</tbody>
				</table>
			`;
		},
		upgrade : {
			beforeInfo : function(data) {
				const upgradeList = [];
				(data.upgradeInfo || []).forEach(item => {
					item.upgradePasses.forEach(item => {
						upgradeList.push(item.upgradePassBefore);
					});
				});
				let tr = upgradeList.map(item => {
					return `
						<tr>
							<td class="name">${item.serviceName}</td>				<!-- 서비스명 -->
							<td>${this.self.getUsePeriod(item)}</td>				<!-- 기간 -->
							<td>${this.self.getUseNumber(item)}</td>				<!-- 횟수 -->
							<td>${getComma(item.price)}원</td>						<!-- 정가 -->
							<td>${getComma(item.discountAmount)}원</td>				<!-- 할인 -->
							<td>${getComma(item.usePoint)}P</td>					<!-- 마일리지 -->
							<td>${getComma(item.salePrice)}원</td>					<!-- 판매가 -->
							<td class="green">${getComma(item.paymentAmount)}원</td><!-- 결제완료 -->
							<td class="red">${getComma(item.receivables)}원</td>	<!-- 미수금 -->
							<td>${this.self.getSalesClassificationName(item)}</td>	<!-- 매출분류 -->
						</tr>
					`;
				});
				tr = (tr.length) ? tr.join("") : `<tr><td class="empty" colspan="10">변경 전 이용권 정보가 없습니다.</td></tr>`;
				return `
					<table class="ui-table">
						<thead>
							<tr><td>서비스명</td><td>기간</td><td>횟수</td><td>정가</td><td>할인</td><td>마일리지</td><td>판매가</td><td>결제완료</td><td>미수금</td><td>매출분류</td></tr>
						</thead>
						<tbody>
							${tr}
						</tbody>
					</table>
				`;
			},
			afterInfo : function(data) {
				const pricingList = [];
				data.pricing.forEach(item => {
					item.passes.forEach(item => {
						pricingList.push(item);
					});
				});
				let tr = pricingList.map(item => {
					return `
						<tr>
							<td class="name">${item.serviceName}</td>						<!-- 서비스명 -->
							<td>${this.self.getUsePeriod(item)}</td>						<!-- 기간 -->
							<td>${this.self.getUseNumber(item)}</td>						<!-- 횟수 -->
							<td>${getComma(item.price)}원</td>								<!-- 현재 이용권 정가 -->
							<td>${getComma(item.price - (item.upgradePrice || 0))}원</td>	<!-- 이전 이용권 정가 -->
							<td>${getComma(item.discountAmount)}원</td>						<!-- 할인 -->
							<td>${getComma(item.usePoint)}P</td>							<!-- 마일리지 -->
							<td>${getComma(item.salePrice)}원</td>							<!-- 판매가 -->
							<td class="green">${getComma(item.paymentAmount)}원</td>		<!-- 결제완료 -->
							<td class="red">${getComma(item.receivables)}원</td>			<!-- 미수금 -->
							<td>${this.self.getSalesClassificationName(item)}</td>			<!-- 매출분류 -->
						</tr>
					`;
				});
				tr = (tr.length) ? tr.join("") : `<tr><td class="empty" colspan="10">변경 후 이용권 정보가 없습니다.</td></tr>`;
				return `
					<table class="ui-table">
						<thead>
							<tr><td>서비스명</td><td>기간</td><td>횟수</td><td>현재 이용권<br>정가</td><td>이전 이용권<br>정가</td><td>할인</td><td>마일리지</td><td>판매가</td><td>결제완료</td><td>미수금</td><td>매출분류</td></tr>
						</thead>
						<tbody>
							${tr}
						</tbody>
					</table>
				`;
			}
		},
		cross : {
			beforeInfo : function(data) {
				const crossList = [];
				(data.crossInfo || []).forEach(item => {
					item.crossPasses.forEach(item => {
						crossList.push(item.crossPass);
					});
				});

				let tr = crossList.map(item => {
					const serviceKind = item.serviceKind;
					const remainNumber = (serviceKind == "P") ? "무제한" : item.remainNumber + "회";
					const spendNumber = (serviceKind == "P") ? "무제한" : item.spendNumber + "회";
					const usePeriod = getPeriod(getDate(item.useStartDate), getDate(item.useEndDate)) + 1;
					let spendPeriod = usePeriod - getPeriod(getDate(), getDate(item.useEndDate));
					if(spendPeriod < 0) spendPeriod = 0;
					else if(usePeriod < spendPeriod) spendPeriod = usePeriod;
					const remainPeriod = usePeriod - spendPeriod;
					const remainPrice = item.salePrice - item.spendPrice;

					return `
						<tr>
							<td class="name">${item.serviceName}</td>				<!-- 서비스명 -->
							<td>${this.self.getUsePeriod(item)}</td>				<!-- 기간 -->
							<td>${this.self.getUseNumber(item)}</td>				<!-- 횟수 -->
							<td>${getComma(item.price)}원</td>						<!-- 정가 -->
							<td>${getComma(item.paymentAmount)}원</td>				<!-- 결제완료 -->
							<td>${getComma(item.receivables)}원</td>				<!-- 미수금 -->
							<td>${remainPeriod}일 / ${remainNumber}</td>			<!-- 잔여일수/횟수 -->
							<td class="green">${getComma(remainPrice)}원</td>		<!-- 잔여금액 -->
							<td>${spendPeriod}일 / ${spendNumber}</td>				<!-- 소진일수/횟수 -->
							<td class="red">${getComma(item.spendPrice)}원</td>		<!-- 소진금액 -->
						</tr>
					`;
				});
				tr = (tr.length) ? tr.join("") : `<tr><td class="empty" colspan="10">변경 전 이용권 정보가 없습니다.</td></tr>`;

				return `
					<table class="ui-table">
						<thead>
							<tr><td>서비스명</td><td>기간</td><td>횟수</td><td>정가</td><td>결제완료</td><td>미수금</td><td>잔여일수/횟수</td><td>잔여금액</td><td>소진일수/횟수</td><td>소진금액</td></tr>
						</thead>
						<tbody>
							${tr}
						</tbody>
					</table>
				`;
			},
			afterInfo : function(data) {
				const pricingList = [];
				data.pricing.forEach(item => {
					item.passes.forEach(item => {
						pricingList.push(item);
					});
				});
				let tr = pricingList.map(item => {
					return `
						<tr>
							<td class="name">${item.serviceName}</td>				<!-- 서비스명 -->
							<td>${this.self.getUsePeriod(item)}</td>				<!-- 기간 -->
							<td>${this.self.getUseNumber(item)}</td>				<!-- 횟수 -->
							<td>${getComma(item.price)}원</td>						<!-- 현재 이용권 정가 -->
							<td>${getComma(item.price - item.crossPrice)}원</td>	<!-- 이전 이용권 잔액 -->
							<td>${getComma(item.discountAmount)}원</td>				<!-- 할인 -->
							<td>${getComma(item.usePoint)}P</td>					<!-- 마일리지 -->
							<td>${getComma(item.salePrice)}원</td>					<!-- 판매가 -->
							<td class="green">${getComma(item.paymentAmount)}원</td><!-- 결제완료 -->
							<td class="red">${getComma(item.receivables)}원</td>	<!-- 미수금 -->
							<td>${this.self.getSalesClassificationName(item)}</td>	<!-- 매출분류 -->
						</tr>
					`;
				});
				tr = (tr.length) ? tr.join("") : `<tr><td class="empty" colspan="10">변경 후 이용권 정보가 없습니다.</td></tr>`;
				return `
					<table class="ui-table">
						<thead>
							<tr><td>서비스명</td><td>기간</td><td>횟수</td><td>현재 이용권<br>정가</td><td>이전 이용권<br>잔액</td><td>할인</td><td>마일리지</td><td>판매가</td><td>결제완료</td><td>미수금</td><td>매출분류</td></tr>
						</thead>
						<tbody>
							${tr}
						</tbody>
					</table>
				`;
			}
		},
		merge : {
			beforeInfo : function(data) {
				const mergeList = [];
				(data.mergeInfo || []).forEach(item => {
					item.mergePasses.forEach(item => {
						mergeList.push(item.mergePassBefore);
					});
				});
				let tr = mergeList.map(item => {
					return `
						<tr>
							<td class="name">${item.serviceName}</td>				<!-- 서비스명 -->
							<td>${this.self.getUsePeriod(item)}</td>				<!-- 기간 -->
							<td>${this.self.getUseNumber(item)}</td>				<!-- 횟수 -->
							<td>${getComma(item.price)}원</td>						<!-- 정가 -->
							<td>${getComma(item.discountAmount)}원</td>				<!-- 할인 -->
							<td>${getComma(item.usePoint)}P</td>					<!-- 마일리지 -->
							<td>${getComma(item.salePrice)}원</td>					<!-- 판매가 -->
							<td class="green">${getComma(item.paymentAmount)}원</td><!-- 결제완료 -->
							<td class="red">${getComma(item.receivables)}원</td>	<!-- 미수금 -->
							<td>${this.self.getSalesClassificationName(item)}</td>	<!-- 매출분류 -->
						</tr>
					`;
				});
				tr = (tr.length) ? tr.join("") : `<tr><td class="empty" colspan="10">변경 전 이용권 정보가 없습니다.</td></tr>`;
				return `
					<table class="ui-table">
						<thead>
							<tr><td>서비스명</td><td>기간</td><td>횟수</td><td>정가</td><td>할인</td><td>마일리지</td><td>판매가</td><td>결제완료</td><td>미수금</td><td>매출분류</td></tr>
						</thead>
						<tbody>
							${tr}
						</tbody>
					</table>
				`;
			},
			afterInfo : function(data) {
				const pricingList = [];
				data.pricing.forEach(item => {
					item.passes.forEach(item => {
						pricingList.push(item);
					});
				});
				let tr = pricingList.map(item => {
					return `
						<tr>
							<td class="name">${item.serviceName}</td>					<!-- 서비스명 -->
							<td>${this.self.getUsePeriod(item)}</td>					<!-- 기간 -->
							<td>${this.self.getUseNumber(item)}</td>					<!-- 횟수 -->
							<td>${getComma(item.price)}원</td>							<!-- 현재 이용권 정가 -->
							<td>${getComma(item.price - (item.mergePrice || 0))}원</td>	<!-- 이전 이용권 정가 -->
							<td>${getComma(item.discountAmount)}원</td>					<!-- 할인 -->
							<td>${getComma(item.usePoint)}P</td>						<!-- 마일리지 -->
							<td>${getComma(item.salePrice)}원</td>						<!-- 판매가 -->
							<td class="green">${getComma(item.paymentAmount)}원</td>	<!-- 결제완료 -->
							<td class="red">${getComma(item.receivables)}원</td>		<!-- 미수금 -->
							<td>${this.self.getSalesClassificationName(item)}</td>		<!-- 매출분류 -->
						</tr>
					`;
				});
				tr = (tr.length) ? tr.join("") : `<tr><td class="empty" colspan="10">변경 후 이용권 정보가 없습니다.</td></tr>`;
				return `
					<table class="ui-table">
						<thead>
							<tr><td>서비스명</td><td>기간</td><td>횟수</td><td>현재 이용권<br>정가</td><td>이전 이용권<br>정가</td><td>할인</td><td>마일리지</td><td>판매가</td><td>결제완료</td><td>미수금</td><td>매출분류</td></tr>
						</thead>
						<tbody>
							${tr}
						</tbody>
					</table>
				`;
			}
		},
		transfer : function(data) {
			return this.pass(data);
		}
	},

	getHistoryList : function() {
		const data = this.data.historyList || [];
		const tr = data.filter(item => {
			return (item.historyKind == "OPTION");
		}).reverse().map(item => {
			const date = this.getDate(item.historyDatetime);
			const historyType = uiParameter.history[item.historyType] || "";
			const coachName = (item.coach) ? item.coach.coachName || "-" : "-";
			return `
				<tr>
					<td>${date}</td>
					<td>${historyType}</td>
					<td>${this.getHistoryInfo("before", item)}</td>
					<td>${this.getHistoryInfo("current", item)}</td>
					<td>${coachName}</td>
				</tr>
			`;
		});
		return tr.join("");
	},

	getRefundList : function() {
		const data = this.data.refundList || [];

		const tr = data.map(item => {
			const orderInfo = item.orderInfo;
			const refundInfo = item.refundInfo;
			const refundDate = uiDate(item.refundDate);
			const refundDateTime = uiDate(item.refundDatetime, "time");
			const coachName = this.getCoachName(item.seqPartnerCoach);
			const orderType = this.getOrderType(orderInfo, true);
			let refundType = (orderInfo.orderType == "PASS") ? "환불" : orderType + " 환불";
			if(item.refundStatus == "CANCELLED") refundType += " 취소";

			let refundPayment = 0;
			const paymentList = item.refundPayments || [];
			paymentList.forEach(item => {
				if(item.refundPaymentType == "PAYMENT")
					refundPayment += item.paymentAmount;
			});
			const memo = uiSafeValue(item.memo);
			return `
				<tr>
					<td>${refundDate}</td>											<!-- 환불일 -->
					<td>${refundType}</td>											<!-- 환불분류 -->
					<td class="name">${orderInfo.orderName}</td>					<!-- 환불이용권 -->
					<td>${getComma(refundInfo.refundPeriod)}일</td>					<!-- 환불기간 -->
					<td>${getComma(refundInfo.refundNumber)}회</td>					<!-- 환불횟수 -->
					<td>${getComma(orderInfo.salePrice)}원</td>						<!-- 이전 판매가 -->
					<td>${getComma(orderInfo.paymentAmount)}원</td>					<!-- 이전 결제금액 -->
					<td>${getComma(item.refundAmount)}원</td>						<!-- 환불금액 -->
					<td>${getComma(refundPayment)}원</td>							<!-- 재결제금액 -->
					<td>${getComma(orderInfo.salePrice - item.refundAmount)}원</td>	<!-- 최종판매금액 -->
					<td>${coachName}</td>											<!-- 환불 담당자 -->
					<td class="memo" title="memo">${memo}</td>						<!-- 환불메모 -->
					<td>${refundDateTime}</td>										<!-- 환불처리일시 -->
				</tr>
			`;
		});
		return (tr.length == 0) ? `<tr><td colspan="15">정보가 없습니다.</td></tr>` : tr.join("");
	},

	getTransferList : function() {
		const data = this.data.transferList || [];
		const tr = data.map(item => {
			const orderInfo = item.orderInfo || {};
			const transferInfo = item.member || {};
			const receiverInfo = item.memberTransfer || {};
			const transferDate = uiDate(orderInfo.orderDate);
			const transferAmount = getComma(orderInfo.paymentAmount);
			const coachName = this.getCoachName(orderInfo.seqPartnerCoach);
			return `
				<tr>
					<td>${transferDate}</td>		<!-- 양도일 -->
					<td>							<!-- 양도회원 -->
						<a class="hover" href="/member/${transferInfo.seqMember}/home">
							${transferInfo.name} / ${this.getSex(transferInfo.sex)} / ${transferInfo.mobile}
						</a>
					</td>
					<td>							<!-- 양수회원 -->
						<a class="hover" href="/member/${receiverInfo.seqMember}/home">
							${receiverInfo.name} / ${this.getSex(receiverInfo.sex)} / ${receiverInfo.mobile}
						</a>
					</td>
					<td>${transferAmount}원</td>	<!-- 양도 수수료 -->
					<td>${coachName}</td>			<!-- 결제 담당자 -->
				</tr>
			`;
		});
		return (tr.length == 0) ? `<tr><td colspan="5">정보가 없습니다.</td></tr>` : tr.join("");
	},

	getHistoryInfo : function(name, item) {
		const empty = `<div class="empty">-</div>`;
		const historyType = item.historyType;
		const historyTypeName = uiParameter.history[historyType] || "변경 내역";
		const beforeItem = item.before || {};
		const currentItem = item.current || {};
		const isBeforeEmpty = (item.before) ? false : true;
		item = item[name];
		if(!item) return empty;

		const usePeriod = item.useStartDate + " ~ " + item.useEndDate;
		const useNumber = componentMember.getUseNumber(item);
		const usePeriodDay = componentMember.getUsePeriodDay(item);

		switch(historyType) {
			// 판매 및 취소
			case "UPGRADE" :
			case "UPGRADE_CANCEL" :
			case "CROSS_CANCEL" :

			case "PASS" :
			case "ORDER" :
			case "TRANSFER" :
			case "ORDER_CANCEL" :
			case "TRANSFER_RECEIVE" :

			case "MERGE" :
			case "MERGE_CANCEL" :
				return `${this.getPassName(item)}<p class="${name}">${usePeriod} · ${useNumber}</p>`;

			case "CROSS" :
				if((historyType == "CROSS" && name == "current" && !isBeforeEmpty))
					return `${this.getPassName(item)}<p class="${name}">교체 만료</p>`;
				else
					return `${this.getPassName(item)}<p class="${name}">${usePeriod} · ${useNumber}</p>`;

			case "REFUND" :
			case "REFUND_CANCEL" :
				return `${this.getPassName(item)}<p class="${name}">${usePeriod} · ${useNumber}</p>`;

			case "REFUND_MODIFY" :
			case "ORDER_MODIFY" :
			case "MERGE_MODIFY" :
				return `결제 금액<p class="${name}">${getComma(item.paymentAmount)}원`;

			// 옵션 변경
			case "WEEK_LIMIT" :
			case "DAY_LIMIT" :
			case "PAUSE_NUMBER" :
			case "CANCEL_NUMBER" :
			case "FORCE_CANCEL_NUMBER" :
			case "PAUSE_PERIOD" :
			case "MAX_BOOKING_NUMBER" :
				const historyName = toCamelCase(historyType);
				const unit = (historyType.indexOf("PERIOD") > -1) ? "일" : "회";
				const number = componentMember.getLimitNumber(item[historyName], unit);
				return `${historyTypeName}<p class="${name}">${number}</p>`;

			case "BATCH_EXTENSION" :
			case "BATCH_EXTENSION_RB" :
				return `이용기간 및 일수<p class="${name}">${usePeriod} · ${usePeriodDay}일</p>`;

			case "USE_NUMBER_PERIOD" :
				return `이용기간 및 횟수<p class="${name}">${usePeriodDay}일 · ${useNumber}</p>`;

			// 중지
			case "PAUSE" :
			case "PAUSE_CANCEL" :
				return `이용권 기간<p class="${name}">${usePeriod}</p>`;

			// 스케줄 취소
			case "SCHEDULE_CANCEL" :
			case "SCHEDULE_ENTRANCE" :
			case "SCHEDULE_ABSENCE" :
				const remainNumber = componentMember.getLimitNumber(item.remainNumber || 0);
				return `이용횟수<p class="${name}">${remainNumber}</p>`;

			// 미수금
			case "RECEIVABLE" :
				return `미수금<p class="${name}">${getComma(item.receivables)}원</p>`;

			// 담당강사
			case "CHANGE_COACH" :
				const coachName = (item.coach && item.coach.coachName) ? item.coach.coachName || "-" : "-";
				return `담당강사<p class="${name}">${coachName}</p>`;

			case "SERVICE_INFO" :
				const weekLimit = componentMember.getLimitNumber(item.weekLimit);
				const dayLimit = componentMember.getLimitNumber(item.dayLimit);
				return `서비스 정보<p class="${name}">일일 : ${dayLimit} · 주간 : ${weekLimit}</p>`;

			case "SERVICE_PLACE" :
				const spaceName = (item.space && item.space.spaceName) ? item.space.spaceName || "-" : "-";
				return `서비스 장소<p class="${name}">${spaceName}</p>`;

			case "SERVICE_TIME" :
				return `서비스 시간<p class="${name}">${getComma(item.serviceTime)}분</p>`;

			case "LOCKER_SYNC" :
			case "BATCH_LOCKER_SYNC" :
				return `이용기간<p class="${name}">${usePeriod}</p>`;

			case "PRICING_DETAIL_INFO" :
				const getOption = (item) => {
					const pauseNumber = componentMember.getLimitNumber(item.pauseNumber, "회");
					const pausePeriod = componentMember.getLimitNumber(item.pausePeriod, "일");
					return {
						"취소권" : componentMember.getLimitNumber(item.cancelNumber, "회"),
						"휴회권" : componentMember.getLimitNumber(item.forceCancelNumber, "회"),
						"중지권" : pauseNumber + " · " + pausePeriod,
						"최대예약횟수" : componentMember.getLimitNumber(item.maxBookingNumber, "회")
					}
				};
				const getChangeList = () => {
					const beforeInfo = getOption(beforeItem);
					const currentInfo = getOption(currentItem);
					const changeList = [];
					for(let i in beforeInfo) {
						if(beforeInfo[i] != currentInfo[i]) {
							changeList.push({
								title : i,
								value : (name == "before") ? beforeInfo[i] : currentInfo[i]
							})
						}
					}
					return changeList;
				};
				const changeList = getChangeList().map(item => {
					return `${item.title} : ${item.value}`;
				});
				return `
					가격정책 설정
					<p class="${name}">
						${changeList.join("<br>")}
					</p>
				`;

			default :
				return `${this.getPassName(item)}<p class="${name}">${usePeriod} · ${useNumber}</p>`;
		}
		return empty;
	},

	setPassList : function(data) {
		const today = getCalendar();
		data.forEach(item => {
			const passList = this.pass.getPassList(item);
			const passStateList = item.passInfos || [];
			const orderType = item.orderType;
			const orderState = item.orderState;
			passList.forEach(item => {
				let passStateName = "-";
				const seqOrderPass = item.seqOrderPass;
				const data = passStateList.filter(item => {
					return (item.seqOrderPass == seqOrderPass);
				})[0];
				if(data) {
					switch(data.status) {
						case "AVAILABLE" :
							passStateName = (getPeriod(today, data.useStartDate) > 0) ? "사용 전" : "사용 중";
							if(data.serviceKind == "P") {
								if(getPeriod(today, data.useEndDate) < 0) passStateName = "기간 만료";
							} else {
								if(data.useNumber < 0) passStateName = "횟수 만료";
							}
							break;
						case "PAUSE" :
							passStateName = "중지";
							break;
						case "EXPIRATION" :
							passStateName = uiParameter.pass.expirationReason[data.expirationReason] || "만료";
							item.isExpiration = true;
							item.expirationReason = data.expirationReason;
							break;
						case "CANCELLED" :
						case "CROSS_CANCELLED" :
						case "TRANSFER_CANCELLED" :
						case "REFUND_CANCELLED" :
							passStateName = "취소";
							break;
						/*
							passStateName = "교체 취소";
							break;
							passStateName = "양도 취소";
							break;
						*/
					}
					if(!item.passStatus) item.passStatus = data.status;
					data.passStateName = passStateName || "-";
				} else {
					passStateName = uiParameter.pass.state[item.passState];
					if(orderState == "CANCELLED") passStateName = "취소";
				}
				item.passStateName = passStateName || "-";
			});
		});
	},

	getPassList : function(item, name, isBeforeDiscount) {
		let passList = [];
		const orderType = item.orderType;
		const orderState = item.orderState;

		if(item.passInfoList) {
			passList = item.passInfoList;
		} else {
			passList = (item.pricing && item.pricing[0] && item.pricing[0].passes) ? item.pricing[0].passes : [];
		}

		const empty = `<ul><li class="empty">-</li></ul>`;

		if(passList.length == 0) {
			let value = "";
			if(name == "name") {
				value = item.orderName || "-";
			} else if(name == "passState") {
				value = item.passStateName || "-";
				if(orderType == "TRANSFER") value = "양도 만료";
				if(orderState == "CANCELLED") value = "취소";
			} else if(name == "beforeDiscount") {
				value = getComma((item.discountUpgrade || 0) || (item.discountCross || 0) || (item.discountMerge || 0)) + "원";
			} else {
				if(item[name] == undefined) return empty;
				if(name == "discountAmount") {
					value = getComma((item.discountAmount || 0) + (item.usePoint || 0)) + "원";
				} else {
					const discountAmount = (item.discountUpgrade || 0) || (item.discountCross || 0) || (item.discountMerge || 0);
					let amount = item[name];
					if(isBeforeDiscount) amount += discountAmount;
					value = getComma(amount) + "원";
				}
			}
			return `<ul><li>${value}</li></ul>`;
		} else {
			const li = passList.map((item, index) => {
				let className = (name == "receivables" && item.receivables) ? "red" : "";
				let value = "";
				const coachName = (item.serviceType == "APPOINTMENT") ? " (담당강사 : " + componentMember.getCoachName(item.seqPartnerCoach) + ")" : "";

				if(name == "name") {
					value = componentMember.getPassName(item) + coachName;
					value = `<span title="${value}">${value}</span>`;
				} else if(name == "passState") {
					value = item.passStateName || "-";
					if(orderState == "CANCELLED") value = "취소";
					if(orderState == "REFUNDED" && value.indexOf("만료") != -1) value = "환불 만료";
					className = (value == "사용 중") ? "green" : (value == "사용 전") ? "orange" : (value == "중지") ? "red" : "";
				} else if(name == "finalRefundPrice") {
//					const discountAmount = (item.discountUpgrade || 0) || (item.discountCross || 0) || (item.discountMerge || 0);
//					value = getComma(item.salePrice + discountAmount - item.refundAmount) + "원";
					value = getComma(item.salePrice - item.refundAmount) + "원";
				} else if(name == "beforeDiscount") {
					value = getComma((item.discountUpgrade || 0) || (item.discountCross || 0) || (item.discountMerge || 0)) + "원";
				} else if(name == "sumDiscountAmount") {
					const discountAmount = (item.discountUpgrade || 0) || (item.discountCross || 0) || (item.discountMerge || 0);
					let amount = (item.discountAmount || 0) + (item.usePoint || 0) + (discountAmount || 0);
					if(amount > 0) amount = amount * -1;
					value = getComma(amount) + "원";
				} else {
					if(item[name] == undefined) {
						className = "empty";
						value = "-";
					} else {
						if(name == "discountAmount") {
							value = getComma((item.discountAmount || 0) + (item.usePoint || 0)) + "원";
						} else {
							const discountAmount = (item.discountUpgrade || 0) || (item.discountCross || 0) || (item.discountMerge || 0);
							let amount = item[name];
//							if(isBeforeDiscount) amount += discountAmount;
							value = getComma(amount) + "원";
						}
					}
				}
				return `<li class="${className}">${value}</li>`;
			});
			return (li.length == 0) ? empty : "<ul>" + li.join("") + "</ul>";
		}
	},

	pass : {
		getPassState : function(orderInfo) {
			const passList = this.getPassList(orderInfo);
			let mergeCount = 0;
			passList.forEach(item => {
				if(item.passState == "MERGED") mergeCount++;
			});
			if(mergeCount && mergeCount < passList.length) {
				return "MERGED_PART";
			} else {
				if(passList[0])
					return passList[0].passState;
			}
			return "";
		},
		getPassStatus : function(orderInfo) {
			const passList = this.getPassList(orderInfo);
			if(passList[0]) {
				return passList[0].passStatus;
			}
			return "";
		},
		getPassList : function(orderInfo) {
			return (orderInfo.pricing && orderInfo.pricing[0] && orderInfo.pricing[0].passes) ? orderInfo.pricing[0].passes : [];
		},
		isNotComplete : function(orderInfo) {
			const passList = this.getPassList(orderInfo);
			return passList.some(item => {
				return (item.passState != "COMPLETED");
			});
		},
		isCancelable : function(orderInfo) {
			if(this.isNotComplete(orderInfo)) return false;
			const passList = orderInfo.passInfos || [];
			const today = getCalendar();
			for(let i = 0; i < passList.length; i++) {
				const item = passList[i];
				if(item.serviceKind == "P") {
					if(item.spendNumber > 0) return false;
					if(getPeriod(today, item.useStartDate) < 0) return false;
				} else {
					if(item.spendNumber > 0) return false;
				}
			}
			return true;
		},
		isExpired : function(orderInfo) {
			const passList = (orderInfo.passInfos) ? orderInfo.passInfos : [];
			return passList.some(item => {
				return (item.status == "EXPIRATION");
			});
		},
		isChanged : function(item, isPass) {
			if(item.transferType == "RECEIVE" || item.transferType == "TRANSFER") return true;
			if(isPass) {
				// 이용권 목록의 경우 업그레이드, 교체결합의 경우가 해당된다.
				if(item.crossPrice || item.upgradePrice || item.mergePrice) return true;
			} else {
				// 결합의 경우 업그레이드 및 환불 등 가능한 만큼 활성화 시킨다. (&& item.orderType != "MERGE")
				// console.log(item);
				if(item.orderType != "PASS") return true;
			}
			return false;
		},
	},

	permission : {
		counselingList : function(permission, data) {
			const seqPartnerCoach = partnerInfo.employee.id;
			if(!permission || !permission.permissionMember || !seqPartnerCoach) {
				console.error("권한 설정에 필요한 데이터가 없습니다.");
				return;
			}
			if(permission.permissionMember.readOtherCoachCounseling) return data;
			return data.filter(item => {
				return (item.seq_partner_coach == seqPartnerCoach);
			});
			/*
			return data.map(item => {
				if(item.seq_partner_coach != seqPartnerCoach)
					item.memo = `<span class="gray">다른 임직원의 상담내역 조회 권한이 없습니다.</span>`;
				return item;
			}).filter(item => {
				if(item.seq_partner_coach != seqPartnerCoach)
					return false;
			});
			 */
		}
	},

	getOrderButton : function(orderInfo, buttonName, eventName, permissionGroup, permissionName) {
		const item = orderInfo;
		const permission = this.permission;
		if(!orderInfo || !permission) {
			console.warn("이용권 정보 또는 권한 정보가 없습니다.");
			return;
		}
		let tipMessage = "";

		const isPermission = (permissionGroup && permissionName && permission[permissionGroup]) ? permission[permissionGroup][permissionName] : true;

		const isTransfer = (orderInfo.orderType == "TRANSFER");
		const isCanceled = (orderInfo.orderState == "CANCELLED");
		const isRefunded =  (orderInfo.orderState == "REFUNDED" || orderInfo.orderState == "REFUNDED_PART");

		const passState = this.pass.getPassState(item);
		const isExpired = this.pass.isExpired(item);
		const isChanged = this.pass.isChanged(item);
		const isCancelable = this.pass.isCancelable(item);
		const isModified = (passState != "COMPLETED" || isExpired) ? true : false;
		let orderTypeName = uiParameter.order.type[item.orderType];
		if(orderTypeName == "결합") orderTypeName = "판매";

		const tipButton = () => {
			if(eventName == "orderCancel") {
				buttonName = (orderTypeName) ? orderTypeName + " 취소" : "취소";
			}
			return `
				<button class="ui-button white" disabled>
					<div class="ui-tip none" data-tip="${tipMessage}">
						${buttonName}
					</div>
				</button>
			`;
		};
		/*
		if(buttonName == "환불") {
			console.log(orderInfo);
			console.log(`
				orderType : ${item.orderType}
				passState : ${passState}
				isExpired : ${isExpired}
				isCanceled : ${isCanceled}
				isTransfer : ${isTransfer}
				isRefunded : ${isRefunded}
				isModified : ${isModified}
			`);
		}
		*/
		if(isCanceled) tipMessage = "취소된 이용권 입니다.";
		else if(isTransfer && eventName != "orderCancel") tipMessage = "양도된 이용권 입니다.";
		else if(isRefunded) tipMessage = "환불된 이용권 입니다.";
		else if(isModified && eventName != "receivables" && item.orderType != "TRANSFER" && !(eventName == "refund" && passState == "MERGED_PART")) tipMessage = "만료된 이용권 입니다.";
		else if(!isPermission) tipMessage = buttonName + " 권한이 없습니다";

		switch(buttonName) {
			case "업그레이드" :
			case "교체" :
				const beforeName = this.changedPassName(item);
				const afterName = (eventName == "upgrade") ? "업그레이드" : (eventName == "cross") ? "교체" : "양도";
				if(isChanged)
					tipMessage = `${beforeName}된 이용권은<br>${(beforeName == afterName) ? "다시" : ""} ${afterName} 할 수 없습니다.`;
				/*
				if(beforeName == "결합" && afterName == "교체") {
					console.log("called");
				} else if(isChanged) {
					tipMessage = `${beforeName}된 이용권은<br>${(beforeName == afterName) ? "다시" : ""} ${afterName} 할 수 없습니다.`;
				}
				*/
				break;
			case "양도" :
				break;
			case "환불" :
				if(item.orderType == "TRANSFER") tipMessage = "양도 이용권은<br>환불할 수 없습니다.";
				break;
			case "미수금 결제" :
				if(!item.receivables) tipMessage = "잔여 미수금이 없습니다.";
				break;
			case "취소" :
				if(item.orderState == "REFUNDED" || item.orderState == "REFUNDED_PART") orderTypeName = "환불";
				buttonName = (orderTypeName) ? orderTypeName + " 취소" : "취소";
				if(item.orderType != "UPGRADE" && item.orderType != "MERGE" && !isCancelable)
					tipMessage = "사용한 이력이 있는 이용권은<br>판매 취소가 불가능 하며,<br>환불이 필요한 경우 환불을 진행해 주세요.";
				break;
		}
		if(tipMessage) {
			return tipButton();
		} else {
			const orderType = item.orderType.toLowerCase();
			return `<button class="ui-button white" data-type="${orderType}" data-state="${item.orderState}" data-seq-member="${item.seqMember}" data-seq-order="${item.seqOrderInfo}" data-event="${eventName}">${buttonName}</button>`;
		}
	},

	getRefundButton : function(refundInfo, buttonName, eventName, permissionName) {
		const item = refundInfo;
		const permission = this.permission;
		if(!refundInfo || !permission) {
			console.warn("환불 정보 또는 권한 정보가 없습니다.");
			return;
		}
		let tipMessage = "";

		const isPermission = (permissionName && permission.permissionPayment) ? permission.permissionPayment[permissionName] : true;
		const isCanceled = (item.refundStatus == "CANCELLED");

		const tipButton = () => {
			return `
				<button class="ui-button white" disabled>
					<div class="ui-tip none" data-tip="${tipMessage}">
						${buttonName}
					</div>
				</button>
			`;
		};

		if(isCanceled) tipMessage = "취소된 이용권 입니다.";
		else if(!isPermission) tipMessage = buttonName + " 권한이 없습니다.";
		if(tipMessage)
			return tipButton();
		else
			return `<button class="ui-button white" data-seq-member="${item.seqMember}" data-seq-order="${item.seqOrderInfo}" data-seq-refund="${item.seqRefundInfo}" data-event="${eventName}" >${buttonName}</button>`;

	},

	setOrderDatetime : function(container, orderInfo) {
		try {
			const orderDate = orderInfo.orderDate;
			const orderDatetime = orderInfo.orderDatetime || orderInfo.orderCompletedDatetime || orderDate + "T12:00:00";
			const orderTimeHour = orderDatetime.substr(11, 2);
			const orderTimeMinute = orderDatetime.substr(14, 2);
			container.putValue("orderDate", orderDate);
			container.putValue("orderTimeHour", orderTimeHour);
			container.putValue("orderTimeMinute", orderTimeMinute);
		} catch(error) {
			console.log(error);
		}
	},

	getOrderDatetime : function(container) {
		const orderDate = container.getValue("orderDate");
		const orderTimeHour = container.getValue("orderTimeHour");
		const orderTimeMinute = container.getValue("orderTimeMinute");
		if(!orderTimeHour || !orderTimeMinute) return "";
		return orderDate + "T" + orderTimeHour + ":" + orderTimeMinute + ":00";
	},

	setRefundDatetime : function(container, refundInfo) {
		if(!refundInfo) {
			const today = new Date();
			refundInfo = {
				refundDate : today.format("yyyy-mm-dd"),
				refundDatetime : today.format("yyyy-mm-ddThh-MM-ss")
			};
		}
		try {
			const refundDate = refundInfo.refundDate;
			const refundDatetime = refundInfo.refundDatetime || refundInfo.refundCompletedDatetime || refundDate + "T12:00:00";
			const refundTimeHour = refundDatetime.substr(11, 2);
			const refundTimeMinute = refundDatetime.substr(14, 2);
			container.putValue("refundDate", refundDate);
			container.putValue("refundTimeHour", refundTimeHour);
			container.putValue("refundTimeMinute", refundTimeMinute);
		} catch(error) {
			console.log(error);
		}
	},

	getRefundDatetime : function(container) {
		const refundDate = container.getValue("refundDate");
		const refundTimeHour = container.getValue("refundTimeHour");
		const refundTimeMinute = container.getValue("refundTimeMinute");
		if(!refundTimeHour || !refundTimeMinute) return "";
		return refundDate + "T" + refundTimeHour + ":" + refundTimeMinute + ":00";
	},

	getMergeList : function(data) {
		if(!data) data = [];
		data = data.sort(function(a, b) {
			const dateA = new Date(a.orderDate).getTime();
			const dateB = new Date(b.orderDate).getTime();
			const sequence = (a.seqOrderInfo == b.seqOrderInfo) ? 0 : (a.seqOrderInfo < b.seqOrderInfo) ? 1 : -1;
			return (dateA == dateB) ? sequence : (dateA < dateB) ? 1 : -1;
		});

		const tr = data.map(item => {
			const orderDate = uiDate(item.orderDate);
			const orderDateTime = uiDate(item.orderCompletedDatetime, "time");
			const orderName = item.orderName || "-";
			const coachName = componentMember.getCoachName(item.seqPartnerCoach);
			const colorRed = (item.receivables == 0) ? "" : "red";
			const memo = uiSafeValue(item.memo);

			return `
				<tr>
					<td>${orderDate}</td>
					<!--<td>-</td>-->
					<td>${this.getOrderType(item)}</td>
					<td>${this.getOrderState(item)}</td>
					<td class="name">${orderName}</td>
					<td class="currency">${getComma(item.price)}원</td>
					<td class="currency">${getComma(item.price - item.mergePrice || 0)}원</td>
					<td class="currency">${getComma(item.discountAmount)}원</td>
					<td class="currency">${getComma(item.salePrice)}원</td>
					<td class="currency green">${getComma(item.paymentAmount)}원</td>
					<td class="currency ${colorRed}">${getComma(item.receivables)}원</td>
					<td class="amount">${getComma(item.usePoint)}원</td>
					<td class="amount">${getComma(item.rewardPoint)}원</td>
					<td>${coachName}</td>
					<td class="memo" title="${memo}">${memo}</td>
					<td>${orderDateTime}</td>
				</tr>
				<tr>
					<td colspan="15">
						<div class="box">
							<div class="top">
								<h5 class="ui-sub-title">결제 내역</h5>
								${this.getPaymentSummaryList(item, true)}
							</div>
						</div>
					</td>
				</tr>
			`;
		});
		return (tr.length == 0) ? `<td class="empty" colspan="14">판매 정보가 없습니다.</td>` : tr.join("");
	},
};



/* 메모 팝업 */
const popupMemberMemo = {
	popup : undefined,
	seqMember : 0,
	memo : undefined,
	callback : undefined,
	open : function(seqMember, memo, callback) {
		if(this.popup) return;
		this.seqMember = seqMember;
		this.memo = memo;
		this.callback = callback;
		this.render();
	},
	close : function() {
		this.popup = undefined;
		uiPopup();
	},
	update : function() {
		const data = {
			seqMember	: this.seqMember,
			memo		: this.popup.getValue("memo")
		};
		memberController.putMemo(data).then(data => {
			if(this.callback) this.callback();
		}).catch(error => {
			console.log(error);
			alert("메모 수정에 실패하였습니다.");
		}).finally(() => {
			this.close();
		});
	},
	render : function() {
		const self = this;
		this.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					update : function() {self.update();},
					close : function() {self.close();}
				}
			}
		});
		if(this.memo) this.popup.putValue("memo", this.memo);
	},
	template : function() {
		return `
			<div class="popup tiny">
				<div class="top">
					<h2>메모 수정<a data-event="close"></a></h2>
				</div>
				<div class="middle">
					<textarea class="ui-textarea" name="memo"></textarea>
				</div>
				<div class="bottom">
					<button class="ui-button gray" data-event="close">취소</button>
					<button class="ui-button green" data-event="update">수정</button>
				</div>
			</div>
		`;
	}
};
