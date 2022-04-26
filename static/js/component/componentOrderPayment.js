const componentOrderPayment = {
	container : undefined,
	mode : "create",
	data : {},
	permission : {},
	open : function(mode, seqPricing, seqOrderInfo) {
		this.mode = mode;
		seqPricing = (mode == "create") ? seqPricing : 0;
		Promise.all([
			commonController.memberInfo(seqMember),
			commonController.partnerInfo(),
			commonController.coachList(),
			commonController.placeList(),
			commonController.salesClassificationList(),
			commonController.cardList(),
			commonController.bankList(),
			commonController.bankAccountList(),
			commonController.branch.list(),
			commonController.branch.type.list(),
			permissionController.getList()
		]).then(([memberInfo, partnerInfo, coachList, placeList, salesList, cardList, bankList, bankAccountList, branchList, branchTypeList, permission]) => {
			this.data = {
				paymentSummaryInfo : {},
				pricingInfo : {},
				beforeOrderInfo : {},
				orderInfo : {},
				pricingList : [],
				paymentList : [],
				memberInfo : memberInfo || {},
				partnerInfo : partnerInfo || {},
				lockerInfo : {},
				couponList : [],
				coachList : coachList || [],
				placeList : placeList || [],
				salesList : salesList || [],
				bankList : bankList || [],
				bankAccountList : bankAccountList || [],
				cardList : cardList || [],
				branchList : branchList || [],
				branchTypeList : branchTypeList || []
			};
			this.permission = uiPermission.data = permission;
			this.event.self = this;
			componentMember.data = this.data;

			if(mode == "create") {
				Promise.all([
					pricingController.list(),
					(orderType == "upgrade") ? orderController.upgradeInfo(seqMember, seqPassInfo, serviceCategory) :
					(orderType == "cross") ? orderController.crossInfo(seqMember, seqPassInfo, crossType) : "",
					memberController.passList(seqMember, {
						orderState : "completed",
						orderType : "merge"
					}),
				]).then(([pricingList, beforeOrderInfo, passList]) => {
          console.log(pricingList);
          console.log(seqPricing);
					this.data.pricingList = pricingList || [];
					this.data.passList = (passList && passList.availableList) ? passList.availableList : [];
					const pricingInfo = this.data.pricingList.filter(item => {
						return (item.seqPricing == seqPricing);
					})[0];
					if(!pricingInfo) {
						alert("가격정책 정보를 찾을 수 없습니다.");
						return;
					}

					if(orderType == "upgrade") {
						if(beforeOrderInfo && beforeOrderInfo.pricing && pricingInfo.seqPricing == beforeOrderInfo.pricing.seqPricing) {
							alert("만료된 페이지 입니다.");
							window.location.href = "/member/" + seqMember + "/home";
							return;
						}
					} else if(orderType == "cross") {
						if(beforeOrderInfo && beforeOrderInfo.passes[0]) {
							const status = beforeOrderInfo.passes[0].status;
							const error = (status == "PAUSE") ? "중지된 이용권 입니다." : (status != "AVAILABLE") ? "만료된 페이지 입니다." : "";
							if(error) {
								alert(error);
								window.location.href = "/member/" + seqMember + "/home";
								return;
							}
						}
					}

					pricingInfo.seqOrderInfo = seqOrderInfo;
					pricingInfo.detailList = pricingInfo.details || [];

					// 가격정책 데이터 초기화
					let sumPrice = 0;
					let sumRemain = beforeOrderInfo.amount || 0;
					const beforePassList = beforeOrderInfo.passes || [];
					const detailList = pricingInfo.detailList;

					if(orderType == "cross" && crossType == "period") {
						detailList.forEach(item => {
							const seqService = item.seqService;
							const passInfo = beforePassList.filter(item => {
								return (item.seqService == seqService);
							})[0] || {};
							item.beforePassInfo = passInfo;
							this.event.setPeriodPrice(item);
						});
					}
					detailList.forEach(item => {
						sumPrice += item.price;
						item.salePrice = item.receivables = item.price;
						item.beforeAmount = item.paymentAmount = 0;
						item.discountAmount = item.usePoint = 0;
						item.useStartDate = getCalendar();
						item.useEndDate = componentMember.getUseEndDate(item.useStartDate, item.usePeriod, item.usePeriodType);
						item.beforeBranchYn = "Y";		// 기본값 : 이전 이용권 설정 유지
						item.beforeDefaultBranchYn = item.defaultBranchYn;
						// 결합 및 업그레이드 시에는 이전 이용권 설정 유지가 기본값이기 때문에 판매지점 추가는 미체크되어야 한다.
						item.changedPeriod = 0;			// 사용자가 변경한 날짜

						if(orderType == "upgrade") {
							const seqService = item.seqService;
							const passInfo = beforePassList.filter(item => {
								return (item.seqService == seqService);
							})[0];
							item.defaultBranchYn = "N";
							item.defaultBranches = item.branches;
							item.defaultBranchTypes = item.branchTypes;

							if(passInfo) {
								item.beforeAmount = passInfo.price || 0;
								item.useStartDate = passInfo.useStartDate;
								item.useEndDate = componentMember.getUseEndDate(passInfo.useStartDate, item.usePeriod, item.usePeriodType);
								item.changedPeriod = componentMember.getChangedPeriod(passInfo);
								item.branchTypes = item.beforeBranchTypes = passInfo.branchTypes || [];
								item.branches = item.beforeBranches = passInfo.branches || [];
							} else {
								alert("이전 이용권 정보가 없습니다.");
							}
						}
						if(orderType == "" || orderType == "pass") {
							// 보유한 이용권 중 결합 가능한 이용권 목록을 가져온다.
							const seqService = (item.serviceInfo) ? item.serviceInfo.seqService : 0;
							item.mergeList = this.data.passList.filter(item => {
								return (item.seqService == seqService);
							}).slice(0, 5);
						} else {
							item.mergeList = [];
						}
					});

					if(orderType == "cross") {
						const getRemainPrice = (price, index) => {
							const amount = parseInt(price * sumRemain / sumPrice);
							if(index == detailList.length - 1)
								return sumRemain;
							sumRemain -= amount;
							return amount;
						};
						detailList.forEach((item, index) => {
							item.beforeAmount = getRemainPrice(item.price, index);
						});
					}
					beforeOrderInfo.beforeAmount = beforeOrderInfo.amount;
					this.data.beforeOrderInfo = beforeOrderInfo;

					pricingInfo.restoreDetailList = JSON.parse(JSON.stringify(pricingInfo.detailList));
					this.data.pricingInfo = JSON.parse(JSON.stringify(pricingInfo));

					this.render();
				});
			} else {
				Promise.all([
					orderController.modifyInfo(seqMember, seqOrderInfo)
				]).then(([orderInfo]) => {
					if(!orderInfo) {
						alert("이용권 정보를 가져오는데 실패하였습니다.");
						window.history.back();
						return;
					}
					if(orderInfo.webAppDiv == "A") {
						alert("비-페이로 판매된 내역은 수정할 수 없습니다.");
						window.history.back();
						return;
					}
					const pricingInfo = orderInfo.pricing[0] || {};
					const detailList = pricingInfo.detailList = pricingInfo.passes || [];
					this.data.orderInfo = orderInfo;
					this.data.pricingInfo = pricingInfo;
					this.data.paymentList = this.event.getPaymentList(orderInfo.payments);
					let sumBeforeAmount = 0;
					detailList.forEach(item => {
						const beforeAmount = ((orderType == "upgrade") ? item.discountUpgrade : (orderType == "cross") ? item.discountCross : (orderType == "merge") ? item.discountMerge : 0) || 0;
						item.beforeAmount = beforeAmount;
						sumBeforeAmount += beforeAmount;
						item.beforeReceivables = item.receivables;
						if(item.discount && item.discount.seqDiscountCoupon)
							item.seqDiscountCoupon = item.discount.seqDiscountCoupon;
					});
					orderInfo.beforeAmount = sumBeforeAmount;
					this.render();
				});
			}
		}).catch(error => {
			console.log(error);
			alert("정보를 가져오는데 실패하였습니다.");
		});
	},
	check : function(data) {
		const mode = this.mode;

		for(let name in data) {
			const value = data[name];
			const isEmpty = (!value);
			let error = "";
			switch(name) {
				case "orderClassification"	: if(isEmpty) error = "판매 분류를 선택해 주세요."; break;
				case "seqPartnerCoach"		: if(isEmpty) error = "판매 담당자를 선택해 주세요."; break;
				case "orderDate"			: if(isEmpty) error = "결제일를 입력해 주세요."; break;
				case "orderDatetime"		: if(isEmpty || value.length != 19) error = "결제일시를 입력해 주세요."; break;
			}
			if(error) {
				alert(error);
				const input = document.querySelector("[name='" + name + "']");
				if(input) input.focus();
				return false;
			}
		}

		if(mode == "create") {
			const pricingList = data.pricing[0].passes;
			for(let i = 0; i < pricingList.length; i++) {
				if(pricingList[i].serviceType == "APPOINTMENT" && !(pricingList[i].seqPartnerCoach && pricingList[i].seqPartnerSpace)) {
					alert("담당강사 및 장소를 선택해 주세요.");
					const section = document.querySelector("[data-id='passInfo']");
					if(section) {
						const tr = section.querySelectorAll("table tbody tr");
						const name = (pricingList[i].seqPartnerCoach) ? "seqPartnerSpace" : "seqPartnerCoach";
						const input = tr[i].querySelector("[name='" + name + "']");
						if(input) input.focus();
					}
					return false;
				}
			}
		}
		return true;
	},
	submit : function() {
		const isBranch = (partnerInfo.partner.branchUseYn == "Y");
		const pricingInfo = this.data.pricingInfo;
		const orderInfo = this.data.orderInfo;
		const detailList = pricingInfo.detailList;

		const paymentSummaryInfo = this.data.paymentSummaryInfo;
		const lockerInfo = this.data.lockerInfo || {};

		let sumPrice = 0;
		let sumSalePrice = 0;
		let sumReceivable = 0;
		let sumBeforeAmount = 0;
		const pricingList = detailList.map((item, index) => {
			sumPrice += item.price;
			sumSalePrice += item.price - item.beforeAmount - item.usePoint - item.discountAmount;
			sumReceivable += item.receivables;
			sumBeforeAmount += item.beforeAmount;
			const passCoaches = (item.seqPartnerCoach) ? [{
				seqPartnerCoach : item.seqPartnerCoach
			}] : [];
			const isMerge = (item.seqPassInfo);

			const data = {
				seqOrderPass : item.seqOrderPass,
				seqPassInfo : item.seqPassInfo || "",

				seqPackage : item.seqPackage,
				seqService : item.seqService,
				seqPricing : item.seqPricing,
				seqPricingDetail : item.seqPricingDetail,
				serviceKind : (item.serviceInfo) ? item.serviceInfo.serviceKind : item.serviceKind,
				serviceType : (item.serviceInfo) ? item.serviceInfo.serviceType : item.serviceType,
				serviceName : (item.serviceInfo) ? item.serviceInfo.serviceName : item.serviceName,
				dayLimit : (item.serviceInfo) ? item.serviceInfo.dayLimit : item.dayLimit,
				weekLimit : (item.serviceInfo) ? item.serviceInfo.weekLimit : item.weekLimit,

				price : item.price,

				useStartDate : item.useStartDate,
				useEndDate : item.useEndDate,
				usePeriod : item.usePeriod,
				usePeriodType : item.usePeriodType,
				useNumber : item.useNumber,

				seqPartnerCoach : item.seqPartnerCoach || 0,
				seqPartnerSpace : item.seqPartnerSpace || item.seqPlace || 0,
				passCoaches : passCoaches,

				cancelNumber : item.cancelNumber,
				forceCancelNumber : item.forceCancelNumber,
				pauseNumber : item.pauseNumber,
				pausePeriod : item.pausePeriod,
				maxBookingNumber : item.maxBookingNumber,

				seqSalesClassification : item.seqSalesClassification,
				receivables : item.receivables,

				discount : {
					seqDiscountCoupon : item.seqDiscountCoupon || 0,
					discountUpgrade : (orderType == "upgrade") ? item.beforeAmount : 0,
					discountCross : (orderType == "cross") ? item.beforeAmount : 0,
					discountMerge : (orderType == "merge" || isMerge) ? item.beforeAmount : 0,
					discountAmount : item.discountAmount || 0,
					discountRate : item.discountRate || 0,
					usePoint : item.usePoint,
				}
			};
			if(this.mode == "create") {
				const serviceType = (item.serviceInfo || {}).serviceType;
				if(isBranch && (serviceType == "CLASS" || serviceType == "PLACE")) {
					data.branchTypes = (item.branchTypes || []).map(item => {return {seqPartnerBranchType : item.seqPartnerBranchType}});
					data.branches = (item.branches || []).map(item => {return {seqPartnerBranch : item.seqPartnerBranch}});

					// 아래 코드는 사실상 의미가 없다.
					if(!item.defaultBranchYn || item.defaultBranchYn == "Y") {
						const seqPartnerBranch = partnerInfo.branch.id;
						if(!data.branches.some(item => {
							return (item.seqPartnerBranch == seqPartnerBranch);
						})) {
							data.branches.push({seqPartnerBranch : seqPartnerBranch});
						}
					}
				}
			}

			if(this.mode == "create" && orderType == "") {
				delete data.seqOrderPass;
				const locker = lockerInfo[index];
				if(locker) {
					data.locker = {
						seqPartnerLockerList : locker.seqPartnerLockerList
					};
				}
			}
			return data;
		});
		if(sumPrice != paymentSummaryInfo.price || sumSalePrice != paymentSummaryInfo.salePrice || sumReceivable != paymentSummaryInfo.receivables) {
			alert("데이터에 오류가 있습니다.");
			return false;
		}

		const paymentList = this.data.paymentList;
		const oldPaymentList = this.data.orderInfo.payments || [];
		oldPaymentList.forEach(item => {
			const seqOrderPayment = item.seqOrderPayment;
			const data = paymentList.filter(item => {
				return (item.seqOrderPayment == seqOrderPayment);
			})[0];
			if(!data) {
				item.useYn = "N";
				delete item.bankAccount;
				paymentList.push(item);
			}
		});

		const section = document.querySelector("[data-id='otherInfo']");
		const getOrderDateTime = () => {
			const date = section.getValue("orderDate");
			const hour = section.getValue("orderTimeHour");
			const minute = section.getValue("orderTimeMinute");
			return `${date}T${hour}:${minute}:00`;
		};

		const isMerge = (orderType == "" || orderType == "pass") ? detailList.some(item => {return (item.seqPassInfo);}) : false;
		const data = {
			orderType : (orderType == "upgrade" || orderType == "cross") ? orderType.toUpperCase() : (isMerge) ? "MERGE" : "PASS",
			orderClassification : section.getValue("orderClassification"),
			seqPartnerCoach : section.getValue("seqPartnerCoach", true),
			orderDate : section.getValue("orderDate"),
			orderDatetime : getOrderDateTime(),
			memo : section.getValue("memo"),
			rewardPoint : this.data.paymentSummaryInfo.rewardPoint,
			pricing : [{
				price : sumPrice,
				normalPrice : sumPrice,
				pricingName : pricingInfo.pricingName,
				seqPartner : pricingInfo.seqPartner,
				seqService : pricingInfo.seqService,
				seqPricing : pricingInfo.seqPricing,
				serviceCategory : pricingInfo.serviceCategory,
				taxFreeYn : pricingInfo.taxFreeYn,
				customYn : "N",
				passes : pricingList,
			}],
			payments : paymentList
		};
		if(orderType && orderType != "pass" || isMerge) {
			delete data.orderClassification;
		}

		if(this.mode == "create") {
			const beforeOrderInfo = this.data.beforeOrderInfo || {};
			const passList = beforeOrderInfo.passes || [];
			const seqPassInfoList = [];
			const seqOrderInfoList = [];
			const seqOrderPricingList = [];
			passList.forEach(item => {
				seqPassInfoList.push(item.seqPassInfo);
				seqOrderInfoList.push(item.seqOrderInfo);
			});
			switch(orderType) {
				case "upgrade" :
					data.upgradeType = serviceCategory;
					data.seqPassInfo = seqPassInfoList;
//					data.seqOrderPricing = (beforeOrderInfo.pricing) ? beforeOrderInfo.pricing.seqOrderPricing : 0;
					data.seqOrderPricing = [(beforeOrderInfo.pricing) ? beforeOrderInfo.pricing.seqOrderPricing : 0];
					data.parentSeqOrderInfos = seqOrderInfoList;
					break;
				case "cross" :
					data.crossType = crossType;
					data.seqPassInfo = seqPassInfoList;
					data.parentSeqOrderInfos = seqOrderInfoList;
					break;
			}
			data.seqOrderInfo = pricingInfo.seqOrderInfo;
			if(isMerge) {
				const serviceCategory = pricingInfo.serviceCategory.toLowerCase();
				detailList.forEach(item => {
					const seqPassInfo = item.seqPassInfo;
					if(seqPassInfo) {
						const mergeInfo = item.mergeList.filter(item => {
							return (item.seqPassInfo == seqPassInfo);
						})[0];
						seqPassInfoList.push(mergeInfo.seqPassInfo);
						seqOrderInfoList.push(mergeInfo.seqOrderInfo);
						seqOrderPricingList.push(mergeInfo.seqOrderPricing);
					} else {
						seqPassInfoList.push(null);
						seqOrderInfoList.push(null);
						seqOrderPricingList.push(null);
					}
				});
				data.mergeType = serviceCategory;
				data.seqPassInfo = seqPassInfoList;
//				data.seqOrderPricing = (serviceCategory == "normal") ? seqOrderPricingList[0] : seqOrderPricingList;
				data.seqOrderPricing = seqOrderPricingList;
				data.parentSeqOrderInfos = seqOrderInfoList;
			}

			const checkBranch = () => {
				const passList = data.pricing[0].passes || [];
				for(let i = 0; i < passList.length; i++) {
					const serviceType = passList[i].serviceType;
					if(serviceType == "CLASS" || serviceType == "PLACE") {
						if(!passList[i].branches.length && !passList[i].branchTypes.length)
							return false;
					}
				}
				return true;
			};
			if(isBranch && !checkBranch()) {
				alert("이용가능 지점 및 유형 중 하나를 선택해 주세요.");
				return false;
			}
		} else {
			data.pricing[0].seqOrderPricing = pricingInfo.seqOrderPricing,
			data.seqOrderInfo = this.data.orderInfo.seqOrderInfo;
			if(orderType == "upgrade") {
				const seqUpgradeOrderPricing = (orderInfo.upgradeInfo) ? orderInfo.upgradeInfo[0].seqUpgradeOrderPricing : 0;
				data.pricing[0].seqUpgradeOrderPricing = seqUpgradeOrderPricing;
			} else if(orderType == "merge") {
				const seqMergeOrderPricing = (orderInfo.mergeInfo) ? orderInfo.mergeInfo[0].seqMergeOrderPricing : 0;
				data.pricing[0].seqMergeOrderPricing = seqMergeOrderPricing;
			}
		}

		let error = "";
		const summaryInfo = this.data.paymentSummaryInfo;
		if(summaryInfo.salePrice != summaryInfo.paidAmount + summaryInfo.receivables)
			error = "설정된 결제금액과 입력된 결제금액이 서로 일치해야만 저장할 수 있습니다.";
		else if(summaryInfo.beforeAmount != sumBeforeAmount)
			error = "변경 전 이용권의 잔액을 모두 분배해 주세요.";
		else if(summaryInfo.receivables < 0)
			error = "미수금을 확인해 주세요.";

		if(error) {
			alert(error);
			const section = this.container.querySelector("[data-id='paymentInfo']");
			section.scrollIntoView({behavior : "smooth", block : "center"});
			return false;
		}

		if(!this.check(data)) return false;

		if(sumReceivable) {
			if(!confirm("미수금 " + getComma(sumReceivable) + "원이 남아 있습니다. 계속하시겠습니까?")) return false;
		}

		if(this.mode == "create") {
			orderController.sell.payment.create(seqMember, data).then(data => {
				// alert("판매되었습니다.");
				// window.location.href = "/member/" + seqMember + "/orderInfo";
				componentOrderPayment.popup.complete.open(this);
			}).catch(error => {
				console.log(error);
				uiError(error);
			});
		} else {
			orderController.sell.payment.update(seqMember, seqOrderInfo, data).then(data => {
				alert("수정되었습니다.");
				window.location.href = "/member/" + seqMember + "/orderInfo";
			}).catch(error => {
				console.log(error);
				uiError(error);
			});
		}

		return true;
	},
	render : function() {
		const self = this.event.self = this;
		this.container = document.querySelector("main");
		componentOrder.beforeOrderInfo.open(this);		// 이전 이용권 정보
		componentOrder.orderInfo.open(this);			// 이용권 정보
		this.passInfo.open(this);						// 이용권 정보 설정
		this.paymentInfo.open(this);					// 결제 정보 설정
		this.paymentList.open(this);					// 결제 정보 입력
		this.paymentSummaryInfo.open(this);				// 결제 개요 정보
		this.otherInfo.open(this);						// 기타 정보 입력

		this.event.toast();
	},
	event : {
		toast : function() {
			let isMerge = false;
			this.self.data.pricingInfo.detailList.forEach(item => {
				if(item.mergeList && item.mergeList.length) isMerge = true;
			});
			if(isMerge) {
				uiToast("보유하신 이용권 중, 결합 가능한 이용권이 있습니다.", {top : 52, minWidth : 600, button : true});
			}
		},
		getUnitPrice : function(item) {
			const useStartDate = getCalendar();
			const useEndDate = componentMember.getUseEndDate(useStartDate, item.usePeriod, item.usePeriodType);
			const usePeriod = getPeriod(useStartDate, useEndDate) + 1;
			return parseInt(item.price / usePeriod);
		},
		setPeriodPrice : function(item) {
			const today = getCalendar();
			const getSpendPeriod = (item) => {
				const useStartDate = item.useStartDate;
				const useEndDate = item.useEndDate;
				const usePeriod = getPeriod(useStartDate, useEndDate) + 1;
				let spendPeriod = usePeriod - getPeriod(today, useEndDate) - 1;
				if(spendPeriod < 0) spendPeriod = 0;
				else if(usePeriod < spendPeriod) spendPeriod = usePeriod;
				return spendPeriod;
			};

			const useStartDate = (!item.useStartDate) ? today : item.useStartDate;
			const usePeriod = item.usePeriod;
			const usePeriodType = item.usePeriodType;
			let useEndDate = componentMember.getUseEndDate(useStartDate, usePeriod, usePeriodType);
			const spendPeriod = getSpendPeriod(item.beforePassInfo);

			if(!item.useStartDate) {
				let remainPeriod = getPeriod(useStartDate, useEndDate) + 1 - spendPeriod;
				if(remainPeriod < 0) remainPeriod = 0;
				useEndDate = componentMember.getUseEndDate(useStartDate, remainPeriod, "D");
				item.unitPrice = this.getUnitPrice(item);

				item.useStartDate = useStartDate;
				item.useEndDate = useEndDate;
				item.usePeriod = remainPeriod;
				item.usePeriodType = "D";
			}
			const unitPrice = item.unitPrice;
			const period = getPeriod(item.useStartDate, item.useEndDate) + 1;
			if(spendPeriod)
				item.price = period * unitPrice;
		},
		getPaymentList : function(data) {
			const paymentList = [];
			data.forEach(item => {
				const paymentType = item.paymentType.toLowerCase();
				if(item.useYn != "N") {
					switch(paymentType) {
						case "card" :
							paymentList.push({
								seqOrderPayment : item.seqOrderPayment,
								approvalNumber : item.approvalNumber,
								cardCode : item.cardCode,
								cardNumber : item.cardNumber,
								installmentPeriod : item.installmentPeriod,
								paymentAmount : item.paymentAmount,
								paymentType : item.paymentType,
								paymentDate : item.paymentDate,
								paymentDatetime : item.paymentDatetime,
								seqPartnerCoach : item.seqPartnerCoach,
								memo : item.memo,
								useYn : "Y"
							});
							break;

						case "cash" :
							paymentList.push({
								seqOrderPayment : item.seqOrderPayment,
								approvalNumber : item.approvalNumber,
								cashReceiptNumber : item.cashReceiptNumber,
								cashReceiptType : item.cashReceiptType,
								cashReceiptYn : item.cashReceiptYn,
								paymentAmount : item.paymentAmount,
								paymentType : item.paymentType,
								paymentDate : item.paymentDate,
								paymentDatetime : item.paymentDatetime,
								seqPartnerCoach : item.seqPartnerCoach,
								memo : item.memo,
								useYn : "Y"
							});
							break;

						case "transfer" :
							paymentList.push({
								seqOrderPayment : item.seqOrderPayment,
								approvalNumber : item.approvalNumber,
								cashReceiptNumber : item.cashReceiptNumber,
								cashReceiptType : item.cashReceiptType,
								cashReceiptYn : item.cashReceiptYn,
								depositorName : item.depositorName,
								paymentAmount : item.paymentAmount,
								paymentType : item.paymentType,
								seqBankAccount : item.seqBankAccount,
								paymentDate : item.paymentDate,
								paymentDatetime : item.paymentDatetime,
								seqPartnerCoach : item.seqPartnerCoach,
								memo : item.memo,
								useYn : "Y"
							});
							break;
					}
				}
			});
			return paymentList;
		},
		getCoachList : function(item, seqPartnerCoach) {
			const coachAndSpaceInfo = this.getCoachAndSpaceInfo(item);
			const coachList = coachAndSpaceInfo.seqPartnerCoaches || [];
			const option = this.self.data.coachList.filter(item => {
				return (coachList.length) ? (coachList.indexOf(item.seqPartnerCoach) > -1) : true;
			}).map(item => {
				const selected = (item.seqPartnerCoach == seqPartnerCoach) ? "selected" : "";
				return `<option value="${item.seqPartnerCoach}" ${selected}>${item.coachName}</option>`;
			});
			return option.join("");
		},
		getSpaceList : function(item, seqPartnerSpace) {
			const coachAndSpaceInfo = this.getCoachAndSpaceInfo(item);
			if(!seqPartnerSpace) {
				item.seqPartnerSpace = seqPartnerSpace = coachAndSpaceInfo.seqPartnerSpace;
			}
			const option = this.self.data.placeList.map(item => {
				const selected = (item.seqPartnerSpace == seqPartnerSpace) ? "selected" : "";
				return `<option value="${item.seqPartnerSpace}" ${selected}>${item.spaceName}</option>`;
			});
			return option.join("");
		},
		getCoachAndSpaceInfo : function(item) {
			const coachAndSpaceList = item.coachAndSpaceList || [];
			const isBranch = (partnerInfo.partner.branchUseYn == "Y");
			const seqPartnerBranch = (isBranch) ? partnerInfo.branch.id : 0;
			return coachAndSpaceList.filter(item => {
				return (item.seqPartnerBranch == seqPartnerBranch);
			})[0] || {};
		}
	},
	// 이용권 정보 설정
	passInfo : {
		container : undefined,
		data : {},
		permission : {},
		open : function(context) {
			try {
				this.data = context.data;
				this.permission = context.permission;
				this.render();
			} catch(error) {
				console.log(error);
				alert("이용권 정보 설정란을 설정하는데 실패하였습니다.");
			}
		},
		update : function() {
			this.render();
		},
		render : function() {
			this.container = document.querySelector("[data-id='passInfo']");
			if(!this.container) return;
			const ul = this.container.querySelector("ul");
			ul.innerHTML = this.template();
			const self = this.event.self = this;
			uiCalendar(ul);
			uiEvent(ul, {
				click : {
					setting : function() {self.event.setting(this);},
					locker : function() {self.event.assignLocker(this);},
					changePopup : function() {self.event.changePopup(this);},
				},
				change : {
					changeValue : function() {self.event.changeValue(this);},
					changeMerge : function() {self.event.changeMerge(this);},
				}
			});
			this.event.updateSummary();
			if(orderType == "upgrade") {
				const beforePassList = this.data.beforeOrderInfo.passes || [];
				const detailList = this.data.pricingInfo.detailList;
				const tr = ul.querySelectorAll("tbody tr");
				detailList.forEach((item, index) => {
					const seqService = item.seqService;
					const detailInfo = item;
					beforePassList.forEach(item => {
						if(item.seqService == seqService) {
							const select = tr[index].querySelectorAll("select");
							if(item.seqPartnerCoach) {
								if(select[0]) select[0].value = item.seqPartnerCoach;
								detailInfo.seqPartnerCoach = item.seqPartnerCoach;
							}
							const seqPartnerSpace = item.seqPlace || item.seqPartnerSpace;
							if(seqPartnerSpace) {
								if(select[1]) select[1].value = seqPartnerSpace;
								detailInfo.seqPlace = detailInfo.seqPartnerSpace = seqPartnerSpace;
							}
						}
					});
				});
			}
			this.data.pricingInfo.detailList.forEach((item, index) => {
				if(item.seqPassInfo)
					this.container.putValue("merge-" + index, item.seqPassInfo);
			});
			uiPermission(ul);
		},
		event : {
			assignLocker : function(object) {
				const index = Number(object.getAttribute("data-index"));
				const detailInfo = this.self.data.pricingInfo.detailList[index];
				const lockerInfo = this.self.data.lockerInfo;
				const seqPricingDetail = detailInfo.seqPricingDetail;
				const updateInfo = () => {
					const p = this.self.container.querySelector("[data-id='lockerInfo']");
					if(!p) return;
					const textList = [];
					for(let name in lockerInfo) {
						const item = lockerInfo[name];
						const period = uiDate(item.startDate) + " ~ " + uiDate(item.endDate);
						textList.push(`${item.lockerName} · ${item.lockerNo}번 · ${period}`);
					}
					p.innerHTML = textList.join(" / ");
					if(textList.length > 0) {
						p.classList.remove("hidden");
					} else {
						p.classList.add("hidden");
					}
				};
				detailInfo.seqMember = seqMember;
				popupMemberLockerPeriod.open(detailInfo, lockerInfo, index, seqMember, false, function(data) {
					if(data.isRemove) {
						object.className = "ui-button medium white";
						object.innerHTML = "락커 배정";
						delete lockerInfo[data.index];
					} else {
						object.className = "ui-button medium green";
						object.innerHTML = "배정 수정";
						lockerInfo[data.index] = data;
					}
					updateInfo();
				});
			},
			updateSummary : function() {
				const container = this.self.container.querySelector("[data-id='summary']");
				let price = 0;
				let beforeAmount = this.self.data.beforeOrderInfo.amount || 0;
				const detailList = this.self.data.pricingInfo.detailList;
				detailList.forEach(item => {
					if(orderType == "" || orderType == "pass")
						beforeAmount += item.beforeAmount || 0;
					price += item.price || 0;
				});
				if(!container) return;
				if(orderType == "upgrade" || orderType == "cross" || beforeAmount)
					container.classList.remove("hidden");
				else
					container.classList.add("hidden");
				container.putValue("price", getComma(price));
				container.putValue("beforeAmount", getComma(beforeAmount));
				container.putValue("salePrice", getComma(price - beforeAmount));
			},
			setting : function(object) {
				const index = Number(object.getAttribute("data-index"));
				componentOrderPayment.popup.pricingInfo.open(this.self, index);
			},
			changePopup : function(object) {
				const index = Number(object.getAttribute("data-index"));
				const detailInfo = this.self.data.pricingInfo.detailList[index];
				componentOrderPayment.popup.changePricing.open(detailInfo, "useNumber", "number");
			},
			changeValue : function(object) {
				const index = Number(object.getAttribute("data-index"));
				const detailInfo = this.self.data.pricingInfo.detailList[index];
				const name = object.name;
				const value = object.value;
				switch(name) {
					case "useStartDate" :
					case "useEndDate" :
						const restoreInfo = {
							useStartDate : detailInfo.useStartDate,
							useEndDate : detailInfo.useEndDate,
							usePeriod : detailInfo.usePeriod,
							usePeriodType : detailInfo.usePeriodType
						};
						if(name == "useEndDate") {
							detailInfo[name] = getElapse(value, 0, 0, detailInfo.changedPeriod * -1);
						} else {
							detailInfo[name] = object.value;
						}

						const isMerge = detailInfo.seqPassInfo;
						if(name == "useStartDate") {
							detailInfo.useEndDate = componentMember.getUseEndDate(detailInfo.useStartDate, detailInfo.usePeriod, detailInfo.usePeriodType);
						} else {
							if(isMerge || orderType == "upgrade") {
								if(isLessDate(detailInfo.useStartDate, detailInfo.useEndDate))
									detailInfo.useEndDate = detailInfo.useStartDate;
								const useStartDate = detailInfo.useStartDate;
								const useEndDate = detailInfo.useEndDate;
								detailInfo.usePeriod = componentMember.getUsePeriodType(useStartDate, useEndDate, true);
								detailInfo.usePeriodType = componentMember.getUsePeriodType(useStartDate, useEndDate, false);
							} else {
								detailInfo.useStartDate = componentMember.getUseStartDate(detailInfo.useEndDate, detailInfo.usePeriod, detailInfo.usePeriodType);
							}
						}

						if(orderType == "cross" && crossType == "period") {
							const period = getPeriod(detailInfo.useStartDate, detailInfo.useEndDate) + 1;
							const unitPrice = detailInfo.unitPrice;
							const beforeAmount = detailInfo.beforeAmount;
							const price = period * unitPrice;
							if(price < beforeAmount) {
								alert("변경 이후 정가는 변경 이전 정가 보다 작을 수 없습니다.");
								Object.assign(detailInfo, restoreInfo);
								object.value = detailInfo[name];
								return;
							}
							detailInfo.price = price;
							this.self.update();
							componentOrderPayment.paymentInfo.update();
							componentOrderPayment.paymentList.update();
						} else {
							this.self.update();
						}
						break;
					case "seqPartnerCoach" :
						detailInfo[name] = Number(value);
						break;
					case "seqPartnerSpace" :
						detailInfo[name] = Number(value);
						break;
				}
			},
			changeMerge : function(object) {
				const seqPassInfo = Number(object.value);
				const index = Number(object.getAttribute("data-index"));

				// 결제내역과 락커정보는 삭제한다.
				this.self.data.lockerInfo = {};
				this.self.data.paymentList = [];
				componentOrderPayment.paymentInfo.event.resetDiscount();

				const pricingInfo = this.self.data.pricingInfo;
				const lockerInfo = this.self.data.lockerInfo;
				const detailList = pricingInfo.detailList;
				const restoreDetailInfo = pricingInfo.restoreDetailList[index];
				const detailInfo = detailList[index] = JSON.parse(JSON.stringify(restoreDetailInfo));

				if(seqPassInfo) {
					const mergeInfo = detailInfo.mergeList.filter(item => {return (item.seqPassInfo == seqPassInfo)})[0];
					detailInfo.mergeInfo = mergeInfo || {};

					detailInfo.price += mergeInfo.price;
					detailInfo.beforeAmount = mergeInfo.price;

					const useStartDate = detailInfo.useStartDate = mergeInfo.useStartDate;
					const reStartDate = getElapse(mergeInfo.useEndDate, 0, 0, 1);
					const useEndDate = componentMember.getUseEndDate(reStartDate, detailInfo.usePeriod, detailInfo.usePeriodType);

					detailInfo.useEndDate = useEndDate;
					detailInfo.usePeriod = componentMember.getUsePeriodType(useStartDate, useEndDate, true);
					detailInfo.usePeriodType = componentMember.getUsePeriodType(useStartDate, useEndDate, false);

					detailInfo.remainNumber = (detailInfo.useNumber < 0) ? detailInfo.useNumber : detailInfo.useNumber + mergeInfo.remainNumber;
					detailInfo.useNumber = (detailInfo.useNumber < 0) ? detailInfo.useNumber : detailInfo.useNumber + mergeInfo.useNumber;
					detailInfo.seqPassInfo = seqPassInfo;

					// 락커정보가 있는 경우
					const isLocker = (mergeInfo.lockerList && mergeInfo.lockerList.seqPartnerLocker);
					if(isLocker) {
						const data = mergeInfo.lockerList;
						lockerInfo[index] = {
							index : index,
							lockerNo : data.lockerNo,
							seqPartnerLocker : data.seqPartnerLocker,
							seqPartnerLockerList : data.seqPartnerLockerList,
							startDate: detailInfo.useStartDate,
							endDate: detailInfo.useEndDate
						}
					}

					// 지점정보가 있는 경우
					if(mergeInfo.branchTypes) {
						detailInfo.defaultBranchYn = "N";
						detailInfo.defaultBranchTypes = detailInfo.branchTypes;
						detailInfo.defaultBranches = detailInfo.branches;
						detailInfo.branchTypes = detailInfo.beforeBranchTypes = mergeInfo.branchTypes;
						detailInfo.branches = detailInfo.beforeBranches = (mergeInfo.branches || []).map(item => {
							return {seqPartnerBranch : item.seqPartnerBranch};
						});
					}

					// 담당강사는 기존 이용권에서 가져온다.
					// 중지권, 취소권, 특별 취소권은 기존 이용권과 합산한다.
					const copyList = ["seqPartnerCoach", "seqPlace", "seqPartnerSpace", "cancelNumber", "forceCancelNumber", "pauseNumber", "pausePeriod"];
					copyList.forEach(item => {
						const oldValue = mergeInfo[item];
						const newValue = detailInfo[item];
						if(item.indexOf("Number") > -1 || item.indexOf("Period") > -1)
							detailInfo[item] = (newValue == -1 || oldValue == -1) ? -1 : newValue + oldValue;
						else
							detailInfo[item] = mergeInfo[item];
					});
				}

				const isMerge = detailList.some(item => {
					return (item.seqPassInfo);
				});
				const tr = document.querySelector("tr[data-id='orderClassification']");
				if(isMerge)
					tr.classList.add("hidden");
				else
					tr.classList.remove("hidden");

				this.self.update();
				componentOrderPayment.paymentInfo.update();
				componentOrderPayment.paymentList.update();
			}
		},
		template : function() {
			const pricingInfo = this.data.pricingInfo;
			const lockerInfo = this.data.lockerInfo;
			const isPackage = (pricingInfo.serviceCategory == "PACKAGE");
			const detailList = pricingInfo.detailList;

			let serviceColor = (isPackage) ? "green" : "";

			const tr = detailList.map((item, index) => {
				const serviceInfo = item.serviceInfo || {};
				const serviceType = serviceInfo.serviceType;
				if(!isPackage) serviceColor = uiParameter.service.color[serviceInfo.serviceType];
				const isMerge = (item.seqPassInfo) ? true : false;
				const useStartDate = (item.useStartDate) ? item.useStartDate : getCalendar();

				let useEndDate = componentMember.getUseEndDate(useStartDate, item.usePeriod, item.usePeriodType);
				useEndDate = getElapse(useEndDate, 0, 0, item.changedPeriod);

				const getLockerButton = () => {
					const optionType = serviceInfo.optionType;
					if(!(serviceType == "OPTION" && optionType == "LOCKER")) return "";
					if(orderType == "upgrade") return "";
					const isLocker = (lockerInfo[index]);
					if(isLocker && isMerge) return `<button class="ui-button medium gray" disabled>배정 완료</button>`;
					const buttonName = (isLocker) ? "배정 수정" : "락커 설정";
					const buttonColor = (isLocker) ? "green" : "white";
					return `<button class="ui-button medium ${buttonColor}" data-index="${index}" data-event="locker" data-permission="permissionMember/locker">${buttonName}</button>`;
				};
				const getCoachAndSpaceList = () => {
					if(serviceType != "APPOINTMENT") return "-";
					return `
						<select class="ui-select" name="seqPartnerCoach" data-index="${index}" data-event="changeValue">
							<option value="">담당강사 선택</option>
							${componentOrderPayment.event.getCoachList(item, item.seqPartnerCoach)}
						</select>
						<select class="ui-select" name="seqPartnerSpace" data-index="${index}" data-event="changeValue">
							<option value="">수업장소 선택</option>
							${componentOrderPayment.event.getSpaceList(item, item.seqPartnerSpace)}
						</select>
					`;
				};
				const getUseNumberButton = () => {
					const serviceKind = serviceInfo.serviceKind;
					if(serviceKind == "P") return "무제한";
					const useNumber = item.useNumber + "회";
					const remainNumber = item.remainNumber + "회";
					const displayNumber = (item.seqPassInfo) ? `${remainNumber} / ${useNumber}` : `${useNumber}`;
					return `<button class="ui-button white pencil" data-index="${index}" data-event="changePopup" data-permission="permissionPayment/updatePricePolicyInSales">${displayNumber}</button>`;
				};
				const getMergeInfo = () => {
					if(!item.mergeList.length) return "";
					const li = item.mergeList.map(item => {
						const usePeriod = componentMember.getUsePeriodDay(item);
						const passName = componentMember.getPassName(item);
//						const passPeriod = componentMember.getUsePeriod(item, true);
//						const period = componentMember.getUsePeriod(item, false);
						const spendNumber = (item.serviceKind == "P") ? "무제한" : componentMember.getLimitNumber(item.spendNumber);
						const remainNumber = (item.serviceKind == "P") ? "무제한" : componentMember.getLimitNumber(item.remainNumber);
						const remainPeriod = componentMember.getRemainPeriod(item, true);
						const spendPeriod = usePeriod - remainPeriod;
						const paymentAmount = getComma(item.paymentAmount);
						const receivableAmount = getComma(item.receivables);
//						const isPause = (item.status == "PAUSE") ? ` - <i class="red">중지 상태</i>`: ``;
						const getSummary = () => {
							const expiredDate = item.useEndDate;
							return `(만료 : ${expiredDate}, 소진 : ${spendNumber} / 잔여 : ${remainNumber}, 소진 : ${spendPeriod}일 / 잔여 : ${remainPeriod}일, 결제 : ${paymentAmount}원 / 미수 : ${receivableAmount}원)`;
//							return `이용기간 : ${passPeriod} (${period}) / 이용횟수 : ${spendNumber} / 정가 : ${getComma(item.price)}원 ${isPause}`;
						};
						return `
							<li>
								<label class="ui-input-radio">
									<input name="merge-${index}" type="radio" value="${item.seqPassInfo}" data-index="${index}" data-event="changeMerge">
									<span></span>
									<span class="name">
										${passName}
									</span>
									<span class="summary">
										${getSummary()}
									</span>
								</label>
							</li>
						`;
					});
					return `
						<tr class="merge">
							<td colspan="7">
								<div class="box">
									<dl>
										<dt>
											<h4>이용권 결합</h4>
										</dt>
										<dd>
											<ul>
												<li>
													<label class="ui-input-radio">
														<input name="merge-${index}" type="radio" value="" checked data-index="${index}" data-event="changeMerge">
														<span></span>
														<span class="name">결합하지 않음</span>
													</label>
												</li>
												${li.join("")}
											</ul>
										</dd>
									</dl>
								</div>
							</td>
						</tr>
					`;
				};
				const mergeIcon = (item.mergeList.length) ? `<span class="icon"></span>` : ``;
				const isCoachAndSpace = (serviceType == "APPOINTMENT") ? "wide" : "";
				const isPermission = (item.seqPassInfo) ? `data-permission=permissionPayment/updatePricePolicyInSales` : ``;
				const isDisable = (item.seqPassInfo || orderType == "upgrade") ? "disabled" : "";

				return `
					<tr>
						<td>
							${serviceInfo.serviceName}
							${mergeIcon}
						</td>
						<td><input name="useStartDate" type="calendar" value="${useStartDate}" data-index="${index}" data-event="changeValue" ${isDisable}></td>
						<td><input name="useEndDate" type="calendar" value="${useEndDate}" data-index="${index}" data-event="changeValue" ${isPermission}></td>
						<td>${getUseNumberButton()}</td>
						<td><var data-msg="price">${getComma(item.price)}</var>원</td>
						<td class="${isCoachAndSpace}">${getCoachAndSpaceList()}</td>
						<td>
							<button class="ui-button medium" data-index="${index}" data-event="setting" data-permission="permissionPayment/updatePricePolicyInSales">상세 설정</button>
							${getLockerButton()}
						</td>
					</tr>
					${getMergeInfo()}
				`;
			});

			return `
				<li>
					<h4>${pricingInfo.pricingName}</h4>
					<div class="bg ${serviceColor}"></div>
					<table class="ui-table">
						<thead>
							<tr>
								<td>서비스명</td><td>시작날짜</td><td>종료날짜</td><td>횟수</td>
								<td>정가</td><td>담당강사 및 장소</td><td>기타</td>
							</tr>
						</thead>
						<tbody>
							${tr.join("")}
						</tbody>
					</table>
				</li>
			`;
		}
	},
	// 결제 정보 설정
	paymentInfo : {
		container : undefined,
		mode : "create",
		data : {},
		permission : {},
		open : function(context) {
			try {
				this.mode = context.mode;
				this.data = context.data;
				this.permission = context.permission;
				this.render();
			} catch(error) {
				console.log(error);
				alert("결제 정보 설정을 설정하는데 실패하였습니다.");
			}
		},
		update : function(isRender, isPayment) {
			const trList = this.container.querySelectorAll("table tbody tr");

			let sumCompletePaymentAmount = sumExpectedPaymentAmount = sumReceivableAmount = 0;
			this.data.paymentList.forEach(item => {
				sumCompletePaymentAmount += item.paymentAmount || 0;
			});

			const detailList = this.data.pricingInfo.detailList;
			detailList.forEach(item => {
				item.salePrice = item.price - item.beforeAmount - item.discountAmount - item.usePoint;
				if(this.mode == "update") {
					if(item.salePrice > item.paymentAmount + item.receivables)
						item.receivables += item.salePrice - (item.paymentAmount + item.receivables);
				}
				item.receivables = item.salePrice - item.paymentAmount;
				if(item.paymentAmount < 0) {
					item.receivables -= item.paymentAmount;
					item.paymentAmount = 0;
				}
				sumExpectedPaymentAmount += item.paymentAmount;
				sumReceivableAmount += item.receivables;
			});

			// 결제 등록, 수정, 삭제 시 결제(예상)금액 보다 결제(완료)금액이 같이 않은 경우
			if(isPayment && sumCompletePaymentAmount != sumExpectedPaymentAmount) {
				sumExpectedPaymentAmount = sumReceivableAmount = 0;
				detailList.forEach(item => {
					if(item.receivables < 0) item.receivables = 0;
					if(item.paymentAmount > item.salePrice) item.paymentAmount = item.salePrice;
					sumExpectedPaymentAmount += item.paymentAmount;
					sumReceivableAmount += item.receivables;
				});
				let sumRedistributionAmount = sumCompletePaymentAmount - sumExpectedPaymentAmount;
				sumExpectedPaymentAmount = 0;
				if(sumRedistributionAmount > 0) {
					// 큰 경우에는 결제금액을 증가 시킨다.
					detailList.forEach(item => {
						if(sumRedistributionAmount) {
							const redistributionAmount = (sumRedistributionAmount >= item.receivables) ? item.receivables : sumRedistributionAmount;
							sumRedistributionAmount -= redistributionAmount;
							item.paymentAmount = (item.paymentAmount + redistributionAmount <= item.salePrice) ? item.paymentAmount + redistributionAmount : redistributionAmount;
							item.receivables = item.salePrice - item.paymentAmount;
						}
						sumExpectedPaymentAmount += item.paymentAmount;
					});
				} else {
					sumRedistributionAmount *= -1;
					// 작은 경우에는 결제금액을 감소 시킨다.
					for(let i = detailList.length - 1; i > -1; i--) {
						const item = detailList[i];
						if(item.paymentAmount > 0 && sumRedistributionAmount) {
							const redistributionAmount = (sumRedistributionAmount >= item.paymentAmount) ? item.paymentAmount : sumRedistributionAmount;
							sumRedistributionAmount -= redistributionAmount;
							item.paymentAmount = (item.paymentAmount - redistributionAmount > 0) ? item.paymentAmount - redistributionAmount : 0;
							item.receivables = item.salePrice - item.paymentAmount;
						}
						sumExpectedPaymentAmount += item.paymentAmount;
					};
				}
			}

			// 값을 새로고침 한다.
			const check = () => {
//				console.log(`sumCompletePaymentAmount : ${sumCompletePaymentAmount}, sumExpectedPaymentAmount : ${sumExpectedPaymentAmount}`);
				const checkPayment = () => {
					const amount = sumCompletePaymentAmount - sumExpectedPaymentAmount;
					let message = "";
					if(amount < 0) {
						message = "미결제";
					} else if(amount > 0) {
						message = "미분배";
					} else if(sumReceivableAmount < 0) {
						message = "미수금액";
					}
					const p = document.querySelector("main [data-id='checkPayment']");
					if(!p) return;
					if(message) p.classList.add("focus");
					else p.classList.remove("focus");
					p.putValue("message", message);
				};
				const checkBeforeAmount = () => {
					if(orderType != "cross") return;
					const beforeAmount = this.data.beforeOrderInfo.amount;
					let sumBeforeAmount = 0;
					detailList.forEach(item => {
						sumBeforeAmount += item.beforeAmount;
					});
					const remainBeforeAmount = beforeAmount - sumBeforeAmount;
					const p = document.querySelector("main [data-id='checkBeforeAmount']");
					if(!p) return;
					if(remainBeforeAmount) p.classList.add("focus");
					else p.classList.remove("focus");
					p.putValue("remainBeforeAmount", getComma(remainBeforeAmount));
				};
				checkPayment();
				checkBeforeAmount();
			};
			check();

			let isBeforeAmount = false;
			detailList.forEach((item, index) => {
				const array = ["price", "beforeAmount", "discountAmount", "usePoint", "salePrice", "paymentAmount", "receivables"];
				if(item.beforeAmount) isBeforeAmount = true;
				array.forEach(name => {
					trList[index].putValue(name, getComma(item[name]));
				});
			});

			const table = this.container.querySelector("table");
			if(orderType == "upgrade" || orderType == "cross" || isBeforeAmount)
				table.classList.add("focus");
			else
				table.classList.remove("focus");

			if(!isRender)
				componentOrderPayment.paymentSummaryInfo.update();
		},
		render : function() {
			const container = this.container = document.querySelector("[data-id='paymentInfo']");
			const table = container.querySelector("[data-id='table']");
			table.innerHTML = this.template();
			const inputList = table.querySelectorAll("input");
			inputList.forEach(item => {
				item.autocomplete = "off";
			});
			const self = this.event.self = this;
			uiInput(container);
			uiEvent(container, {
				click : {
					coupon : function() {
						self.event.changeCoupon(this);
					},
					roundDown : function() {
						self.event.roundDown(this);
					}
				},
				change : {
					changeAmount : function() {
						self.event.changeAmount(this);
					},
					changeType : function() {
						self.event.changeType();
					},
					customAmount : function() {
						self.event.changeCustomAmount();
					}
				}
			});
			uiPermission(container);
			this.update(true);
		},
		event : {
			roundDown : function(object) {
				const unit = object.getAttribute("data-value");
				const detailList = this.self.data.pricingInfo.detailList;
				const button = this.self.container.querySelectorAll("table button");
				detailList.forEach(item => {
					if(unit) {
						const isCoupon = (item.seqDiscountCoupon);
						if(isCoupon) {
							uiToast("쿠폰이 적용된 경우 절삭할 수 없습니다.");
							return;
						} else {
							const price = item.salePrice;
							const roundPrice = parseInt(price * ((unit == 100) ? 0.01 : 0.001)) * ((unit == 100) ? 100 : 1000);
							const roundAmount = price - roundPrice;
							if(roundAmount > 0)
								item.discountAmount += roundAmount;
						}
					} else {
						item.discountAmount = item.usePoint = 0;
						item.salePrice = item.price - item.beforeAmount - item.discountAmount - item.usePoint;
						this.resetDiscount();
					}
				});
				this.self.update();
			},
			changeCoupon : function(object) {
				const command = object.getAttribute("data-value");
				const td = object.parentNode.parentNode;
				const tr = td.parentNode;
				const input1 = tr.querySelector("[name='discountAmount']");
				const input2 = tr.querySelector("[name='salePrice']");
				const index = Number(tr.getAttribute("data-index"));
				switch(command) {
					case "create" :
					case "update" :
						componentOrderPayment.popup.discountCoupon.open(this.self, index, () => {
							td.className = "coupon update";
							input1.disabled = input2.disabled = true;
							this.self.update();
						});
						break;
					case "remove" :
						this.resetDiscount(index);
						this.self.update();
						break;
				}
			},
			resetDiscount : function(removeIndex) {
				const isPermission = this.self.permission.permissionPayment.customDiscountPrice;
				const tr = this.self.container.querySelectorAll("table tbody tr");
				tr.forEach((item, index) => {
					const remove = () => {
						const input1 = item.querySelector("[name='discountAmount']");
						const input2 = item.querySelector("[name='salePrice']");
						const td = item.querySelector("td.coupon");
						input1.disabled = input2.disabled = (isPermission) ? false : true;
						td.className = "coupon create";
						const detailInfo = this.self.data.pricingInfo.detailList[index];
						detailInfo.seqDiscountCoupon = detailInfo.discountAmount = 0;
					};
					if(removeIndex) {
						if(removeIndex == index) remove();
					} else {
						remove();
					}
				});
			},
			changeAmount : function(object) {
				const mode = this.self.mode;
				const type = this.self.container.getValue("distributionType");
				const tr = object.parentNode.parentNode;
				const index = Number(tr.getAttribute("data-index"));
				const pricingInfo = this.self.data.pricingInfo;
				const item = pricingInfo.detailList[index];
				const name = object.name;
				const oldValue = item[name];
				let value = getNumber(object.value);
				let minValue = 0, maxValue = 0;

				switch(name) {
					case "discountAmount" :
						// 할인 변경 시
						maxValue = item.price - item.beforeAmount - item.usePoint;
						break;
					case "usePoint" :
						// 마일리지 변경 시
						const beforeUsePoint = this.self.data.orderInfo.usePoint || 0;
						const memberPoint = this.self.data.memberInfo.point || 0;
						const sumUsePoint = this.self.data.paymentSummaryInfo.usePoint || 0;
						const rewardPoint = this.self.data.orderInfo.rewardPoint || 0;
						const maxUsePoint = memberPoint + beforeUsePoint - (sumUsePoint - oldValue) - rewardPoint;
						maxValue = Math.min(maxUsePoint, item.price - item.beforeAmount - item.discountAmount);
						break;
					case "salePrice" :
						// 판매가 변경 시
						const isCoupon = (item.seqDiscountCoupon);
						const paymentAmount = this.self.data.paymentSummaryInfo.paymentAmount;
						maxValue = item.price - item.beforeAmount - item.usePoint;
						if(!isCoupon) {
							if(value > maxValue) value = maxValue;
							item.discountAmount = maxValue - value;
						}
						break;
					case "receivables" :
						maxValue = item.salePrice;
						break;
					case "paymentAmount" :
						maxValue = item.salePrice;
						break;
					case "beforeAmount" :
						maxValue = this.self.data.beforeOrderInfo.amount;
						break;
				}
				if(value > maxValue) value = maxValue;
				if(value < minValue) value = minValue;
				item[name] = value;
				object.setAttribute("data-value", value);

				if(name == "paymentAmount") {
					item.receivables = item.salePrice - item.paymentAmount;
				} else if(name == "receivables") {
					item.paymentAmount = item.salePrice - item.receivables;
				}
				this.self.update(false);
			},
			changeCustomAmount : function() {
				const container = this.self.container;
				const isCustomAmount = (container.getValue("customAmount") == "N") ? "disabled" : "";
				const nodeList = container.querySelectorAll("[name='paymentAmount'], [name='receivables']");
				nodeList.forEach(item => {
					item.disabled = (isCustomAmount);
				});
			}
		},
		template : function() {
			const detailList = this.data.pricingInfo.detailList;
			let tr = detailList.map((item, index) => {
				const serviceName = (item.serviceInfo) ? item.serviceInfo.serviceName : item.serviceName || "-";
				const price = item.price;
				const getBeforeAmount = () => {
					return (orderType == "cross") ?
						`<td><input name="beforeAmount" type="currency" value="0" data-value="0" data-event="changeAmount" tabIndex>원</td>` :
						`<td class="currency"><var data-msg="beforeAmount">0</var>원</td>`;
				};
				const isCustomAmount = (this.container.getValue("customAmount") == "N") ? "disabled" : "";
				const isCoupon = (item.seqDiscountCoupon);
				const isDiscountAmount = (isCoupon) ? "disabled" : "";
				const isCreate = (isCoupon) ? "update" : "create";
				return `
					<tr data-index="${index}" data-sequence="${item.seqPricingDetail}">
						<td>${serviceName}</td>
						<td class="currency"><var data-msg="price">0</var>원</td>
						${getBeforeAmount()}
						<td><input name="discountAmount" type="currency" min="0" value="0" data-value="0" data-event="changeAmount" ${isDiscountAmount} data-permission="permissionPayment/customDiscountPrice" tabIndex>원</td>
						<td><input name="usePoint" type="currency" min="0" value="0" data-value="0" data-event="changeAmount" tabIndex>원</td>
						<td><input name="salePrice" type="currency" min="0" value="0" data-value="${price}" data-event="changeAmount" ${isDiscountAmount} data-permission="permissionPayment/customDiscountPrice" tabIndex>원</td>
						<td><input class="green" name="paymentAmount" type="currency" min="0" value="0" data-value="0" data-event="changeAmount" ${isCustomAmount} tabIndex>원</td>
						<td><input class="red" name="receivables" type="currency" value="0" data-value="0" data-event="changeAmount" ${isCustomAmount} tabIndex>원</td>
						<td class="coupon ${isCreate}">
							<span class="create">
								<button class="ui-button medium" data-value="create" data-event="coupon">쿠폰 적용</button>
							</span>
							<span class="update">
								<button class="ui-button medium green" data-value="update" data-event="coupon">쿠폰 수정</button>
								<button class="ui-button medium red" data-value="remove" data-event="coupon">쿠폰 삭제</button>
							</span>
						</td>
					</tr>
				`;
			});
			tr = (tr.length == 0) ? `<tr><td colspan="9">결제 정보가 없습니다.</td></tr>` : tr.join("");
			const getBeforeAmount = () => {
				return (orderType == "cross") ? `<td>이전 이용권 잔액</td>` : `<td>이전 이용권 정가</td>`;
			};
			const isBeforeAmount = (orderType == "upgrade" || orderType == "cross" || orderType == "merge") ? "focus" : "";
			return `
				<table class="ui-table ${isBeforeAmount}">
					<thead>
						<tr>
							<td>서비스명</td><td>정가</td>
							${getBeforeAmount()}
							<td>할인가</td><td>사용 포인트</td><td>판매가</td><td>결제금액</td><td>미수금액</td><td>기타</td>
						</tr>
					</thead>
					<tbody>
						${tr}
					</tbody>
				</table>
			`;
		}
	},
	// 결제 정보 입력
	paymentList : {
		container : undefined,
		mode : "create",
		data : {},
		permission : {},
		open : function(context) {
			try {
				this.mode = context.mode;
				this.data = context.data;
				this.permission = context.permission;
				this.render();
			} catch(error) {
				console.log(error);
				alert("결제 정보 입력란을 설정하는데 실패하였습니다.");
			}
		},
		update : function() {
			if(!this.container) return;
			this.render(true);
		},
		render : function(isUpdate) {
			const self = this.event.self = this;
			this.container = document.querySelector("[data-id='paymentList']");
			const tbody = this.container.querySelector("[data-id='detail']");
			tbody.innerHTML = this.template();
			uiEvent(tbody, {
				click : {
					update : function() {self.event.update(this);},
					remove : function() {self.event.remove(this);}
				}
			});
			if(this.mode == "update") {
				const getAutoRewardPoint = () => {
					const paymentAmount = this.data.orderInfo.paymentAmount || 0;
					const beforePaymentAmount = this.data.pricingInfo.paymentAmount || 0;
					const rate = this.data.partnerInfo.mileage || 0;
					return parseInt((paymentAmount - beforePaymentAmount) * (rate * 0.01));
				};
				const rewardPoint = this.data.orderInfo.rewardPoint;
				this.container.putValue("rewardPoint", getComma(rewardPoint));
				if(rewardPoint == getAutoRewardPoint()) {
					this.container.putValue("autoRewardPointYn" , "Y");
				}
			}
			if(!isUpdate) {
				const rate = this.data.partnerInfo.mileage || 0;
				this.container.putValue("rewardPointRate", rate);
				uiEvent(this.container, {
					click : {
						create : function() {self.event.update(this);},
					},
					change : {
						rewardPoint : function() {self.event.autoRewardPointYn()},
						autoRewardPointYn : function() {self.event.autoRewardPointYn()}
					}
				});
				uiPermission(this.container);
			}
		},
		event : {
			update : function(object) {
				const self = this.self;
				componentOrderPayment.popup.paymentInfo.open(this.self, object, function() {
					componentOrderPayment.paymentInfo.update(false, true);
					componentOrderPayment.paymentList.update();
				});
			},
			remove : function(object) {
				const index = Number(object.getAttribute("data-index"));
				this.self.data.paymentList.splice(index, 1);
				componentOrderPayment.paymentInfo.update(false, true);
				componentOrderPayment.paymentList.update();
			},
			autoRewardPointYn : function() {
				const container = this.self.container;
				const isAuto = (container.querySelector("[name='autoRewardPointYn']:checked"));
				const input = container.querySelector("[name='rewardPoint']");
				if(!input) return;
				input.disabled = isAuto;

				const data = this.self.data;
				const paymentAmount = data.paymentSummaryInfo.paymentAmount || 0;
				const beforePaymentAmount = data.pricingInfo.paymentAmount || 0;
				const rate = data.partnerInfo.mileage || 0;
				const rewardPoint = (isAuto) ? parseInt((paymentAmount - beforePaymentAmount) * (rate * 0.01)) : getNumber(input.value);
				input.value = getComma(rewardPoint);
				data.paymentSummaryInfo.rewardPoint = rewardPoint;
			}
		},
		template : function() {
			// 삭제 내역이 필요한 경우 결합 시킨다.
			const paymentList = this.data.paymentList;

			const tr = paymentList.map((item, index) => {
				const paymentType = uiParameter.payment.paymentType[item.paymentType];
				const paymentAmount = getComma(item.paymentAmount);
				const paymentSummary = componentMember.getReceiptSummary(item);
				const type = item.paymentType.toLowerCase();
				const seqOrderPayment = item.seqOrderPayment || "";
				const getPaymentDate = () => {
					if(this.mode == "create") return "";
					if(!item.paymentDatetime) return "<td>-</td>";
					return `<td>${uiDate(item.paymentDatetime)}</td>`;
				};
				const getPaymentCoach = () => {
					if(this.mode == "create") return "";
					return `<td>${componentMember.getCoachName(item.seqPartnerCoach)}</td>`;
				};
				const isUpdate = (this.mode == "update" && !item.seqOrderPayment) ? "update" : "";
				return `
					<tr class="${isUpdate}">
						${getPaymentDate()}							<!-- 결제일(수정) -->
						<td>${paymentType}</td>						<!-- 결제수단 -->
						<td>${paymentAmount}원</td>					<!-- 결제금액 -->
						${getPaymentCoach()}						<!-- 결제담당자(수정) -->
						<td class="memo">${paymentSummary}</td>		<!-- 결제정보 -->
						<td>										<!-- 기타 -->
							<button class="ui-button medium green" data-type="${type}" data-index="${index}" data-sequence="${seqOrderPayment}" data-event="update">수정</button>
							<button class="ui-button medium red" data-type="${type}" data-index="${index}" data-sequence="${seqOrderPayment}" data-event="remove">삭제</button>
						</td>
					</tr>
				`;
			});
			return (tr.length == 0) ? `<tr><td colspan="6">결제 내역이 없습니다.</td></tr>` : tr.join("");
		}
	},
	/* ******** 결제 정보 개요 ******** */
	paymentSummaryInfo : {
		mode : "create",
		data : {},
		open : function(context) {
			try {
				this.mode = context.mode;
				this.data = context.data;
				this.render();
			} catch(error) {
				console.log(error);
				alert("결제 정보 개요를 설정하는데 실패하였습니다.");
			}
		},
		update : function() {
			const data = {price : 0, beforeAmount : 0, discountAmount : 0, usePoint : 0, salePrice : 0, paymentAmount : 0, receivables : 0};
			const detailList = this.data.pricingInfo.detailList;
			detailList.forEach(item => {
				for(let name in data)
					data[name] += item[name] || 0;
			});

			let paidAmount = 0;
			const paymentList = this.data.paymentList;
			paymentList.forEach(item => {
				paidAmount += item.paymentAmount;
			});

			data.paidAmount = paidAmount;
			data.remainAmount = data.salePrice - data.paidAmount;
			if(data.remainAmount < 0) data.remainAmount = 0;
			/*
			console.log(`
				판매가 : ${data.salePrice}
				결제금액 : ${data.paidAmount}
				남은금액 : ${data.remainAmount}
			`);
			*/
			this.data.paymentSummaryInfo = data;
			componentOrderPayment.paymentList.event.autoRewardPointYn();

			const sumBeforeAmount = data.beforeAmount;
			if(this.mode == "create")
				data.beforeAmount = ((orderType == "upgrade" || orderType == "cross") ? this.data.beforeOrderInfo.beforeAmount : data.beforeAmount) || 0;
			else
				data.beforeAmount = this.data.orderInfo.beforeAmount || 0;

			for(let name in data)
				this.container.putValue(name, getComma(data[name]));

			const tr = this.container.querySelector("[data-id='beforeAmount']");

			if(orderType == "upgrade" || orderType == "cross" || orderType == "merge" || data.beforeAmount)
				tr.classList.remove("hidden");
			else
				tr.classList.add("hidden");

			const rewardPoint = this.data.orderInfo.rewardPoint || 0;
			const memberPoint = this.data.memberInfo.point || 0;
			const sumUsePoint = memberPoint + (this.data.orderInfo.usePoint || 0);
			let remainPoint = sumUsePoint - rewardPoint - data.usePoint;
			if(remainPoint < 0) remainPoint = 0;

			const section = document.querySelector("[data-id='paymentInfo']");
			section.putValue("memberPoint", getComma(sumUsePoint));
			section.putValue("rewardPoint", getComma(rewardPoint));
			section.putValue("usedPoint", getComma(data.usePoint));
			section.putValue("remainPoint", getComma(remainPoint));
		},
		render : function() {
			this.container = document.querySelector("[data-id='paymentSummaryInfo']");
			this.update();
		}
	},
	/* ******** 기타 정보 입력 ******** */
	otherInfo : {
		container : undefined,
		mode : "create",
		data : {},
		open : function(context) {
			try {
				this.mode = context.mode;
				this.data = context.data;
				this.render();
			} catch(error) {
				console.log(error);
				alert("기타 정보 입력을 설정하는데 실패하였습니다.");
			}
		},
		render : function() {
			const container = this.container = document.querySelector("[data-id='otherInfo']");
			componentMember.setCoachList(container);
			const self = this;
			uiEvent(container, {
				click : {
					submit : function() {
						this.disabled = true;
						const result = componentOrderPayment.submit();
						if(!result) this.disabled = false;
					}
				}
			});
			uiPermission(container);
			if(this.mode == "update") {
				const orderInfo = this.data.orderInfo;
				const orderDateTime = new Date(orderInfo.orderDatetime || orderInfo.orderCompletedDatetime);
				container.putValue("orderClassification", orderInfo.orderClassification);
				container.putValue("seqPartnerCoach", orderInfo.seqPartnerCoach);
				container.putValue("orderDate", orderInfo.orderDate);
				container.putValue("orderTimeHour", orderDateTime.getHours().zf(2));
				container.putValue("orderTimeMinute", orderDateTime.getMinutes().zf(2));
				container.putValue("memo", orderInfo.memo);
			} else {
				const orderDateTime = new Date();
				container.putValue("orderTimeHour", orderDateTime.getHours().zf(2));
				container.putValue("orderTimeMinute", orderDateTime.getMinutes().zf(2));
				container.putValue("orderClassification", orderClassification);
			}
		},
	},
	popup : {
		pricingInfo : {
			popup : undefined,
			data : {},
			index : 0,
			permission : {},
			open : function(context, index) {
				if(this.popup) return;
				this.data = context.data;
				this.index = index;
				this.permission = context.permission;
				this.data.detailInfo = this.data.pricingInfo.detailList[this.index];
				this.render();
			},
			close : function() {
				this.popup = undefined;
				uiPopup();
			},
			submit : function() {
				if(orderType == "upgrade" || orderType == "cross") {
					const detailInfo = this.data.detailInfo;
					const newPrice = this.popup.getValue("price", true);
					const beforeAmount = detailInfo.beforeAmount;
					const oldPrice = detailInfo.price;
					if(newPrice < beforeAmount) {
						alert("변경 이후 정가는 변경 이전 정가 보다 작을 수 없습니다.");
						return;
					}
				}

				const checkList = {
					useStartDate : "시작날짜를", useEndDate : "종료날짜를", usePeriod : "이용기간을", useNumber : "이용횟수를", price : "정가를",
					cancelNumber : "취소횟수를", forceCancelNumber : "특별 취소횟수를", pauseNumber : "중지횟수를", pausePeriod : "중지일수를", maxBookingNumber : "최대예약횟수를"
				};

				for(let name in checkList) {
					const value = checkList[name];
					const input = this.popup.querySelector("[name='" + name + "']");
					if(input && input.value.trim() == "") {
						alert(value + " 입력해 주세요.");
						input.focus();
						return;
					}
				}

				const startDate = this.popup.getValue("useStartDate");
				const endDate = this.popup.getValue("useEndDate");
				if(isLessDate(startDate, endDate)) {
					alert("종료 날짜를 시작 날짜 보다 크게 설정해 주세요.");
					return;
				}

				const pricingInfo = this.data.pricingInfo;
				const isBranch = (partnerInfo.partner.branchUseYn == "Y");
				const item = this.data.detailInfo;
				const serviceInfo = item.serviceInfo;
				const serviceType = serviceInfo.serviceType;

				let branchList = [];
				let branchTypeList = [];

				if(isBranch) {
					if(serviceType == "CLASS" || serviceType == "PLACE") {
						branchList = this.popup.getValue("branchList");
						branchList = (branchList) ? branchList.split(",").map(item => {return {seqPartnerBranch : Number(item)}}) : [];
						branchTypeList = this.popup.querySelectorAll("[name='seqPartnerBranchType']:checked");
						branchTypeList = Array.from(branchTypeList).map(item => {return {seqPartnerBranchType : item.value}});
						if(!branchList.length && !branchTypeList.length) {
							alert("이용가능 지점 및 유형 중 하나를 선택해 주세요.");
							return;
						}
					}
				}

				const price = item.price;
				item.useStartDate = startDate;
				item.useEndDate = endDate;

				item.usePeriod = this.popup.getValue("usePeriod", true);
				item.usePeriodType = this.popup.getValue("usePeriodType");
				item.useNumber = this.popup.getValue("useNumber", true);
				if(item.seqPassInfo)
					item.remainNumber = this.popup.getValue("remainNumber", true);
				item.price = this.popup.getValue("price", true);
				pricingInfo.taxFreeYn = this.popup.getValue("taxFreeYn");

				item.seqPartnerCoach = this.popup.getValue("seqPartnerCoach", true);
				item.seqPartnerSpace = this.popup.getValue("seqPartnerSpace", true);

				// item.dayLimit = this.popup.getValue("dayLimit", true);
				// item.weekLimit = this.popup.getValue("weekLimit", true);

				item.cancelNumber = (this.popup.getValue("cancelNumberYn") == "Y") ? -1 : this.popup.getValue("cancelNumber", true);
				item.forceCancelNumber = (this.popup.getValue("forceCancelNumberYn") == "Y") ? -1 : this.popup.getValue("forceCancelNumber", true);
				item.pauseNumber = (this.popup.getValue("pauseNumberYn") == "Y") ? -1 : this.popup.getValue("pauseNumber", true);
				item.pausePeriod = (this.popup.getValue("pauseNumberYn") == "Y") ? -1 : this.popup.getValue("pausePeriod", true);
				item.maxBookingNumber = (this.popup.getValue("maxBookingNumberYn") == "Y") ? -1 : this.popup.getValue("maxBookingNumber", true);

				item.seqSalesClassification = this.popup.getValue("seqSalesClassification", true);

				if(isBranch) {
					if(serviceType == "CLASS" || serviceType == "PLACE") {
						item.beforeBranchYn = this.popup.getValue("beforeBranchYn");
						item.defaultBranchYn = this.popup.getValue("defaultBranchYn");
						item.branches = branchList;
						item.branchTypes = branchTypeList;
					}
				}
				this.close();

				componentOrderPayment.passInfo.update();
				if(price != item.price) {
					componentOrderPayment.paymentInfo.update();
					componentOrderPayment.paymentList.update();
				}
			},
			render : function() {
				const self = this.event.self = this;
				this.popup = uiPopup({
					template : this.template(),
					scroll : false,
					event : {
						click : {
							close : function() {self.close();},
							submit : function() {self.submit();},
							branch : function() {
								popupSearchBranch.open(self, this.parentNode, false, () => {
									self.event.changeDefaultBranchYn(true);
								});
							}
						},
						change : {
							price : function() {
								self.event.changePrice(this);
							},
							infinite : function() {
								self.event.changeInfinite(this);
							},
							taxFree : function() {
								self.event.changeTaxFree(this);
							},
							value : function() {
								self.event.changeValue(this);
							},
							beforeBranchYn : function() {
								self.event.changeBeforeBranchYn();
							}
						}
					}
				});
				uiInput(this.popup);
				uiCalendar(this.popup);
				this.prepare();

				uiEvent(this.popup, {
					change : {
						period : function() {self.event.changePeriod(this);},
						taxFreeYn : function() {self.event.changeTaxFreeYn(this);},
						defaultBranchYn : function() {self.event.changeDefaultBranchYn();}
					}
				});

				if(!this.permission.permissionPayment.updatePricePolicyInSales) {
					const nodeList = this.popup.querySelectorAll("input, select");
					nodeList.forEach(item => {
						if(item.name != "seqPartnerCoach" && item.name != "useStartDate")
							item.disabled = true;
					});
				}
			},
			prepare : function() {
				const isBranch = (partnerInfo.partner.branchUseYn == "Y");
				const item = this.data.detailInfo;

				const getUseStartDate = () => {
					if(item.useStartDate) return item.useStartDate;
					return getCalendar();
				};
				const getUseEndDate = () => {
					const useStartDate = (item.useStartDate) ? item.useStartDate : getCalendar();
					const useEndDate = componentMember.getUseEndDate(item.useStartDate, item.usePeriod, item.usePeriodType);
					return getElapse(useEndDate, 0, 0, item.changedPeriod);
				};
				this.popup.putValue("useStartDate", getUseStartDate());
				this.popup.putValue("useEndDate", getUseEndDate());
				this.popup.putValue("changedPeriod", item.changedPeriod);

				this.popup.putValue("usePeriod", item.usePeriod);
				this.popup.putValue("usePeriodType", item.usePeriodType);
				this.popup.putValue("useNumber", item.useNumber);
				this.popup.putValue("remainNumber", item.remainNumber);
				const price = this.popup.querySelector("[name='price']");
				price.setAttribute("data-value", item.price);
				price.value = getComma(item.price);
				this.popup.putValue("taxFreeYn", this.data.pricingInfo.taxFreeYn);

				this.popup.putValue("seqPartnerCoach", item.seqPartnerCoach);
				this.popup.putValue("seqPartnerSpace", item.seqPartnerSpace);

				// this.popup.putValue("dayLimit", item.dayLimit);
				// this.popup.putValue("weekLimit", item.weekLimit);

				this.popup.putValue("cancelNumber", item.cancelNumber);
				this.popup.putValue("forceCancelNumber", item.forceCancelNumber);
				this.popup.putValue("pauseNumber", item.pauseNumber);
				this.popup.putValue("pausePeriod", item.pausePeriod);
				this.popup.putValue("maxBookingNumber", item.maxBookingNumber);

				let seqSalesClassification = item.seqSalesClassification;

				seqSalesClassification = (this.data.salesList.some(item => {
					return (item.seqSalesClassification == seqSalesClassification);
				})) ? seqSalesClassification : 0;
				this.popup.putValue("seqSalesClassification", seqSalesClassification);

				if(isBranch) {
					(item.branchTypes || []).forEach(item => {
						this.popup.putValue("seqPartnerBranchType", item.seqPartnerBranchType);
					});
					const branchList = (item.branches || []).map(item => {
						return item.seqPartnerBranch;
					});
					this.popup.putValue("branchList", branchList.join(","));
					this.popup.putValue("beforeBranchYn", item.beforeBranchYn || "Y");
					this.popup.putValue("defaultBranchYn", item.defaultBranchYn || "Y");
					this.event.changeDefaultBranchYn();
				}
				this.event.changeInfinite();
			},
			event : {
				// 결합 이전 설정 유지 여부 설정
				changeBeforeBranchYn : function(isPreset) {
					const item = this.self.data.detailInfo;
					const beforeBranchYn = this.self.popup.getValue("beforeBranchYn");
					if(!beforeBranchYn) return;

					this.self.popup.putValue("defaultBranchYn", (beforeBranchYn == "Y") ? "N" : item.beforeDefaultBranchYn);

					const setBeforeBranchYn = () => {
						const arrayList = (beforeBranchYn == "Y") ? item.beforeBranches : item.defaultBranches;
						const branchList = (arrayList || []).map(item => {
							return item.seqPartnerBranch;
						});
						this.self.popup.putValue("branchList", branchList.join(","));
//						popupSearchBranch.update(this.self, this.self.popup, branchList);
						this.changeDefaultBranchYn();
					};
					const setBeforeBranchTypeYn = () => {
						const arrayList = (beforeBranchYn == "Y") ? item.beforeBranchTypes : item.defaultBranchTypes;
						const inputList = this.self.popup.querySelectorAll("[name='seqPartnerBranchType']");
						inputList.forEach(item => item.checked = false);
						(arrayList || []).forEach(item => {
							this.self.popup.putValue("seqPartnerBranchType", item.seqPartnerBranchType);
						});
					};

					setBeforeBranchYn();
					setBeforeBranchTypeYn();
				},
				// 판매지점 추가 버튼
				changeDefaultBranchYn : function(isCallback) {
					const defaultBranchYn = this.self.popup.getValue("defaultBranchYn");
					let branchList = this.self.popup.getValue("branchList");
					branchList = ((branchList) ? branchList.split(",") : []).map(item => Number(item));
					const seqPartnerBranch = partnerInfo.branch.id;
					if(defaultBranchYn == "Y") {
						if(!seqPartnerBranch) return;
						if(branchList.indexOf(seqPartnerBranch) == -1) {
							if(isCallback) {
								// 지점 선택을 통해 판매지점을 제외시킨 경우
								this.self.popup.putValue("defaultBranchYn", "N");
							} else {
								branchList.push(seqPartnerBranch);
							}
						}
					}
					popupSearchBranch.update(this.self, this.self.popup, branchList);
				},
				changeTaxFree : function() {
					const pricingInfo = this.self.data.pricingInfo;
					const taxFreeYn = this.self.popup.getValue("taxFreeYn");
					pricingInfo.taxFreeYn = taxFreeYn;
				},
				changePrice : function(object) {
					// 정가 변경 시 결제 정보 설정과 결제 정보 입력을 초기화 시킨다.
					const detailInfo = this.self.data.detailInfo;
					const newPrice = getNumber(object.value);
					if(orderType == "upgrade" || orderType == "cross") {
						const beforeAmount = detailInfo.beforeAmount;
						const oldPrice = detailInfo.price;
						if(newPrice < beforeAmount) {
							object.value = getComma(oldPrice);
							alert("변경 이후 정가는 변경 이전 정가 보다 작을 수 없습니다.");
							return;
						}
					}
					/*
					const oldPrice = detailInfo.price;
					const paymentAmount = detailInfo.paymentAmount;
					const discountAmount = detailInfo.discountAmount;
					const usePoint = detailInfo.usePoint;
					if(newPrice < paymentAmount + discountAmount + usePoint) {
						object.value = getComma(oldPrice);
						alert("정가는 설정된 할인 및 마일리지과 결제금액 합계 보다 작을 수 없습니다.");
						return;
					}
					*/
					this.self.data.paymentList = [];
					detailInfo.paymentAmount = detailInfo.receivables = 0;
					componentOrderPayment.paymentList.update();
					return;
				},
				changePeriod : function(object) {
					const detailInfo = this.self.data.detailInfo;
					const popup = this.self.popup;
					const fixPeriodYn = popup.getValue("fixPeriodYn");
					const isIgnore = (fixPeriodYn == "Y");

					// object.value = componentMember.getAutoFixDate(object.name, object.value, detailInfo.useStartDate, getElapse(detailInfo.useEndDate, 0, 0, detailInfo.changedPeriod), true);

					const useStartDate = popup.getValue("useStartDate");
					let useEndDate = popup.getValue("useEndDate");
					useEndDate = getElapse(useEndDate, 0, 0, detailInfo.changedPeriod * -1);

					let usePeriod = popup.getValue("usePeriod");
					let usePeriodType = popup.getValue("usePeriodType");

					if(object.name == "useStartDate" || object.name == "useEndDate") {
						if(fixPeriodYn == "Y") {
							if(object.name == "useStartDate") {
								const useEndDate = componentMember.getUseEndDate(useStartDate, usePeriod, usePeriodType);
								popup.putValue("useEndDate", useEndDate);
							} else {
								const useStartDate = componentMember.getUseStartDate(useEndDate, usePeriod, usePeriodType);
								popup.putValue("useStartDate", useStartDate);
								// 시작날짜에 맞게 종료날짜를 다시 계산한다.
								let reUseEndDate = componentMember.getUseEndDate(useStartDate, usePeriod, usePeriodType);
								reUseEndDate = getElapse(reUseEndDate, 0, 0, detailInfo.changedPeriod);
								popup.putValue("useEndDate", reUseEndDate);
							}
						} else {
							usePeriod = componentMember.getUsePeriodType(useStartDate, useEndDate, true);
							usePeriodType = componentMember.getUsePeriodType(useStartDate, useEndDate, false);
							if(usePeriod > -1) {
								popup.putValue("usePeriod", usePeriod);
								popup.putValue("usePeriodType", usePeriodType);
							}
						}
					} else if(object.name == "usePeriod" || object.name == "usePeriodType") {
						useEndDate = componentMember.getUseEndDate(useStartDate, usePeriod, usePeriodType);
						useEndDate = getElapse(useEndDate, 0, 0, detailInfo.changedPeriod);
						if(isMoreDate("2040-01-01", useEndDate)) {
							object.value = detailInfo.usePeriod;
							alert("설정 범위를 초과하였습니다.");
							return;
						}
						popup.putValue("useEndDate", useEndDate);
					}
					if(orderType == "cross" && crossType == "period") {
						const unitPrice = detailInfo.unitPrice;
						const period = getPeriod(useStartDate, useEndDate) + 1;
						const price = period * unitPrice;
						popup.putValue("price", getComma(price));
					}
				},
				changeInfinite : function(object) {
					if(object) {
						const input = object.parentNode.parentNode.querySelectorAll("input");
						const isCheck = object.checked;
						for(let i = 0; i < input.length - 1; i++) {
							if(isCheck) input[i].value = 0;
							input[i].disabled = (isCheck);
						}
					} else {
						const input = this.self.popup.querySelectorAll("[data-event='infinite']");
						input.forEach(item => {
							const input = item.parentNode.parentNode.querySelectorAll("input");
							const j = input.length - 1;
							const value = input[0].value;
							if(value == "-1") {
								input[j].checked = true;
								for(let i = 0; i < input.length - 1; i++) {
									input[i].value = 0;
									input[i].disabled = true;
								}
							}
						});
					}
				},
				changeValue : function(object) {
					const name = object.name;
					const value = object.value;
					const maxNumber = Number(object.getAttribute("max") || 10000);
					const detailInfo = this.self.data.detailInfo;
					if(detailInfo.seqPassInfo && (name == "useNumber" || name == "remainNumber")) {
						const beforeSpendNumber = detailInfo.mergeInfo.spendNumber || 0;
						const beforeRemainNumber = detailInfo.mergeInfo.remainNumber || 0;
						let useNumber = this.self.popup.getValue("useNumber", true);
						let remainNumber = this.self.popup.getValue("remainNumber", true);
						if(useNumber > maxNumber) useNumber = maxNumber;
						if(remainNumber > maxNumber) remainValue = maxNumber;
						if(name == "useNumber") {
							remainNumber = useNumber - beforeSpendNumber;
						} else {
							useNumber = remainNumber + beforeSpendNumber;
						}
						if(remainNumber < beforeRemainNumber) remainNumber = beforeRemainNumber;
						if(useNumber < remainNumber + beforeSpendNumber) useNumber = remainNumber + beforeSpendNumber;
						else if(remainNumber > useNumber) remainNumber = useNumber;
						if(useNumber > maxNumber) {
							remainNumber = remainNumber + (maxNumber - useNumber);
							useNumber = maxNumber;
						}
						this.self.popup.putValue("useNumber", useNumber);
						this.self.popup.putValue("remainNumber", remainNumber);
					}
				},
				/*
				getBranchTypeNameList : function(data) {
					return (data || []).map(item => {
						const seqPartnerBranchType = item.seqPartnerBranchType;
						const branchTypeInfo = this.self.data.branchTypeList.filter(item => {
							return (item.seqPartnerBranchType == seqPartnerBranchType);
						})[0];
						return branchTypeInfo.name || "-";
					}).join(", ");
				},
				getBranchNameList : function(data) {
					return (data || []).map(item => {
						const seqPartnerBranch = item.seqPartnerBranch;
						const branchInfo = this.self.data.branchList.filter(item => {
							return (item.seqPartnerBranch == seqPartnerBranch);
						})[0];
						return branchInfo.partnerName || "-";
					}).join(", ");
				},
				*/
			},
			template : function() {
				const data = this.data.detailInfo;
				const branchList = this.data.branchList;
				const branchTypeList = this.data.branchTypeList;
				const serviceInfo = data.serviceInfo;
				const serviceKind = serviceInfo.serviceKind;
				const serviceType = serviceInfo.serviceType;
				const isBranch = (partnerInfo.partner.branchUseYn == "Y");
				const isMerge = (data.seqPassInfo);
				const isDisabled = (isMerge || orderType == "upgrade") ? "disabled" : "";
				const orderTypeName = (orderType == "upgrade") ? "업그레이드" : (isMerge) ? "결합" : "";
				const mode = (isBranch && (isMerge || orderType == "upgrade") && (serviceType == "CLASS" || serviceType == "PLACE")) ? "branch" : "";

				const getCoachSpaceInfo = () => {
					if(serviceType != "APPOINTMENT") return "";
					return `
						<tr class="inline">
							<th>담당강사 및 장소</th>
							<td>
								<div>
									<select class="ui-select" name="seqPartnerCoach">
										<option value="">담당강사 선택</option>
										${componentOrderPayment.event.getCoachList(data)}
									</select>
								</div>
								<div>
									<select class="ui-select" name="seqPartnerSpace">
										<option value="">수업장소 선택</option>
										${componentMember.getPlaceList()}
									</select>
								</div>
							</td>
						</tr>
					`;
				};
				const getLimitInfo = () => {
					const optionInfo = (serviceType == "APPOINTMENT" || serviceType == "CLASS") ? `
						<tr>
							<th>옵션정보</th>
							<td class="option">
								<div>
									<label>
										예약 취소권
										<input name="cancelNumber" type="integer" min="0" max="10000" tabIndex>회
									</label>
									<label class="ui-input-checkbox"><input name="cancelNumberYn" type="checkbox" data-event="infinite"><span></span>무제한</label>
								</div>
								<div>
									<label>
										특별 취소권
										<input name="forceCancelNumber" type="integer" min="0" max="10000" tabIndex>회
									</label>
									<label class="ui-input-checkbox"><input name="forceCancelNumberYn" type="checkbox" data-event="infinite"><span></span>무제한</label>
								</div>
								<div>
									<label>
										중지권
										<input name="pauseNumber" type="integer" min="0" max="10000" tabIndex>회
										<input name="pausePeriod" type="integer" min="0" max="10000" tabIndex>일
									</label>
									<label class="ui-input-checkbox"><input name="pauseNumberYn" type="checkbox" data-event="infinite"><span></span>무제한</label>
								</div>
								<div>
									<label>
										최대 예약권
										<input name="maxBookingNumber" type="integer" min="0" max="10000" tabIndex>회
									</label>
									<label class="ui-input-checkbox"><input name="maxBookingNumberYn" type="checkbox" data-event="infinite"><span></span>무제한</label>
								</div>
							</td>
						</tr>
					` : `
						<tr>
							<th>옵션정보</th>
							<td class="option">
								<div>
									<label>
										중지권
										<input name="pauseNumber" type="integer" min="0" max="10000" tabIndex>회
										<input name="pausePeriod" type="integer" min="0" max="10000" tabIndex>일
									</label>
									<label class="ui-input-checkbox"><input name="pauseNumberYn" type="checkbox" data-event="infinite"><span></span>무제한</label>
								</div>
							</td>
						</tr>
					`;
					const getLimitList = (min, max) => {
						const option = [];
						for(let i = min; i <= max; i++) {
							option.push(`<option value="${i}">${i}</option>`);
						}
						return option.join("");
					};
					return `
						<!--
						<tr class="inline">
							<th>이용제한</th>
							<td>
								<div>
									일일 이용제한
									<select class="ui-select narrow" name="dayLimit">
										<option value="">선택</option>
										<option value="-1">무제한</option>
										${getLimitList(1, 2)}
									</select>
								</div>
								<div>
									주간 이용제한
									<select class="ui-select narrow" name="weekLimit">
										<option value="">선택</option>
										<option value="-1">무제한</option>
										${getLimitList(1, 7)}
									</select>
								</div>
							</td>
						</tr>
						-->
						${optionInfo}
					`;
				};
				const getUseNumberInfo = () => {
					const isHidden = (serviceKind == "P") ? "hidden" : "";
					const value = (serviceKind == "P") ? "-1" : "";
					return (data.seqPassInfo) ? `
						<tr class="${isHidden}">
							<th>잔여/전체 횟수</th>
							<td class="remainNumber">
								<input type="integer" name="remainNumber" min="0" max="10000" data-event="value" tabIndex>회
								<span> / </span>
								<input type="integer" name="useNumber" min="0" max="10000" value="${value}" data-event="value" tabIndex>회
							</td>
						</tr>
					` : `
						<tr class="${isHidden}">
							<th>이용횟수</th>
							<td><input name="useNumber" type="integer" min="0" max="10000" value="${value}" tabIndex>회</td>
						</tr>
					`;
				};
				const getServiceInfo = () => {
					const serviceName = serviceInfo.serviceName;
					const serviceColor = componentMember.getServiceColor(serviceInfo);
					const summaryInfo = componentMember.getSummary(serviceInfo);
					const getMergeInfo = () => {
						if(!data.seqPassInfo) return "";
						const mergeInfo = data.mergeList.filter(item => {
							return (data.seqPassInfo == item.seqPassInfo);
						})[0];
						const passName = componentMember.getPassName(mergeInfo);
						return `<div><b>＋</b> 결합한 이용권 : ${passName}</div>`;
					};
					return `
						<div class="service">
							<div class="bg ${serviceColor}"></div>
							<h4>${serviceName}</h4>
							<h5>${summaryInfo}</h5>
							${getMergeInfo()}
						</div>
					`;
				};
				const getBranchInfo = () => {
					if(!isBranch) return "";
					if(!(serviceType == "CLASS" || serviceType == "PLACE")) return "";

					const getBranchTypeList = () => {
						let inputList = branchTypeList.map(item => {
							return `
								<label class="ui-input-checkbox">
									<input name="seqPartnerBranchType" type="checkbox" value="${item.seqPartnerBranchType}">
									<span></span>
									${item.name}
								</label>
							`;
						});
						inputList = (inputList.length) ? inputList.join("") : "설정된 지점 타입이 없습니다.";
						return `
							<div class="box">
								${inputList}
							</div>
						`;
					}
					const getBranchList = () => {
						return `
							<div class="box">
								<label class="ui-input-search">
									<input placeholder="이용가능 지점 선택" readonly>
									<button class="ui-button" type="button" data-event="branch">지점 선택</button>
									<input name="branchList" type="hidden">
								</label>
								<label class="ui-input-checkbox">
									<input name="defaultBranchYn" type="checkbox" data-event="defaultBranchYn">
									<span></span>
									판매지점 추가
								</label>
							</div>
						`;
					};
					const getBeforeInfo = () => {
						if(!(isMerge || orderType == "upgrade")) return "";
						return `
							<label class="ui-input-radio">
								<input name="beforeBranchYn" type="radio" value="Y" data-event="beforeBranchYn">
								<span></span>
								${orderTypeName} 이전 설정 유지
							</label>
							<label class="ui-input-radio">
								<input name="beforeBranchYn" type="radio" value="N" data-event="beforeBranchYn">
								<span></span>
								${orderTypeName}할 이용권의 설정 값으로 변경
							</label>
						`;
					};
					return `
						<tr>
							<th><p>이용가능<br>지점 및 유형</p></th>
							<td>
								${getBeforeInfo()}
								${getBranchTypeList()}
								${getBranchList()}
							</td>
						</tr>
					`;
				};
				const getFixPeriodYn = () => {
					if(isMerge || orderType == "upgrade") return "";
					return `
						<label class="ui-input-checkbox" style="margin-top:2px">
							<input name="fixPeriodYn" type="checkbox" checked>
							<span></span>
							이용기간에 비례해 시작날짜 및 종료날짜 설정
						</label>
					`;
				};
				const getChangedPeriod = () => {
					return (data.changedPeriod) ? `<p class="ui-note">중지 및 이용기간 변경 등 기간 변동일 수 : <var data-msg="changedPeriod">0</var>일</p>` : ``;
				};

				return `
					<style type="text/css">
						.popupPricing								{margin:0 !important; max-width:640px}
						.popupPricing .middle						{padding:20px 22px 15px 22px !important; max-height:75vh; overflow-y:auto}
						.popupPricing.branch .middle				{max-height:575px; overflow-y:auto}

						.popupPricing form table					{line-height:35px; text-align:left; table-layout:fixed}
						.popupPricing form table tr > *				{padding:5px 0}
						.popupPricing form table tr.hidden			{display:none}

						.popupPricing form table th					{vertical-align:top; width:135px; font-weight:500}
						.popupPricing form table th p				{margin-top:4px; line-height:1.3}
						.popupPricing form table td p				{line-height:1.45; white-space:normal; text-align:justify}
						.popupPricing form hr						{margin:10px 0; border-bottom:1px dashed #ddd}
						.popupPricing form .wide					{width:200px; max-width:200px}
						.popupPricing form .narrow					{width:85px; max-width:85px}

						.popupPricing form input					{margin-right:5px; width:135px !important; background-color:white; text-align:center}
						.popupPricing form select					{background-color:white; width:135px; height:35px; text-align-last:center}
						.popupPricing form input + select			{width:90px}
						.popupPricing form input + label,
						.popupPricing form input + select + label	{margin-left:20px}
						.popupPricing form input:focus,
						.popupPricing form select:focus				{background-color:#e8f4fe}
						.popupPricing form input[disabled]			{background-color:#ebebe4}
						.popupPricing form .remainNumber input		{max-width:80px}
						.popupPricing form .remainNumber span		{padding:0 15px 0 10px}
						.popupPricing form label + p				{margin-top:0}


						.popupPricing form .ui-input-search input	{margin:0; width:300px !important; max-width:300px; padding-right:110px !important}
						.popupPricing form .ui-input-search button	{width:100px}

						.popupPricing form label + .box				{margin-top:2px}
						.popupPricing form .box + .box				{margin:8px 0 4px}

						.popupPricing form .option input			{margin:0 5px; width:80px; max-width:80px}
						.popupPricing form .option div + div		{margin-top:10px}
						.popupPricing form .option label + label	{margin-left:20px}
						.popupPricing form .inline div				{display:inline-block}
						.popupPricing form .inline div + div:before	{content:"/"; margin:0 10px}
						.popupPricing form .inline .narrow			{margin-left:5px; max-width:85px}

						.popupPricing .service						{position:relative; margin-bottom:10px; padding:10px 20px; border:1px solid #ccc}
						.popupPricing .service h4					{font-size:15px}
						.popupPricing .service div:first-child		{position:absolute; left:-1px; top:-1px; width:5px; bottom:-1px}
						.popupPricing .service h5					{font-size:13px; font-weight:normal; color:#888}
						.popupPricing .service h5 + div				{position:relative; margin-top:7px; padding:0 10px; background-color:#f2f2f2; line-height:32px; color:#37b772}
					</style>
					<div class="popupPricing">
						<div class="top">
							<h2>
								이용권 상세 설정
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle">
							<form autocomplete="off">
								${getServiceInfo()}
								<table>
									<tr>
										<th>기간설정</th>
										<td>
											<input name="useStartDate" type="calendar" value="" data-event="period" ${isDisabled}> 부터
											<input name="useEndDate" type="calendar" value="" data-event="period"> 까지
											${getFixPeriodYn()}
											${getChangedPeriod()}
										</td>
									</tr>
									<tr>
										<th>이용기간</th>
										<td>
											<input name="usePeriod" type="integer" min="0" max="9999" data-event="period" tabIndex>
											<select name="usePeriodType" class="ui-select" data-event="period">
												<option value=""></option>
												<option value="M" selected>개월</option>
												<option value="D">일</option>
											</select>
										</td>
									</tr>
									${getUseNumberInfo()}
									<tr>
										<th>정가</th>
										<td>
											<input name="price" type="currency" min="0" max="100000000" data-event="price" tabIndex>원
											<label class="ui-input-checkbox">
												<input name="taxFreeYn" type="checkbox" data-event="taxFree">
												<span></span>
												비과세 여부
											</label>
										</td>
									</tr>
									${getCoachSpaceInfo()}
								</table>
								<hr>
								<table>
									${getLimitInfo()}
								</table>
								<hr>
								<table>
									${getBranchInfo()}
									<tr>
										<th>매출분류</th>
										<td>
											<select class="ui-select wide" name="seqSalesClassification" tabIndex>
												<option value="">매출분류 선택</option>
												<option value="0" selected>선택안함</option>
												${componentMember.getSalesList()}
											</select>
										</td>
									</tr>
								</table>
							</form>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">취소</button>
							<button class="ui-button" data-event="submit">저장</button>
						</div>
					</div>
				`;
			}
		},
		changePricing : {
			popup : undefined,
			type : "",
			name : "",
			data : {},
			open : function(data, name, type) {
				if(this.popup) return;
				this.data = data;
				this.name = name;
				this.type = type;
				this.render();
			},
			close : function() {
				this.popup = undefined;
				uiPopup();
			},
			submit : function() {
				const value = this.popup.getValue("value", (this.type == "number"));
				if(!value) {
					alert("이용 횟수를 입력해 주세요.");
					return;
				}
				const isInfinite = this.popup.getValue("infinite");
				if(this.name == "useNumber" && this.data.seqPassInfo) {
					const remainValue = this.popup.getValue("remainValue", true);
					const minValue = this.data.mergeInfo.remainNumber || 0;
					if(remainValue > value || remainValue < minValue || value < minValue) return;
					this.data.remainNumber = remainValue;
				}
				this.data[this.name] = (isInfinite == "Y") ? -1 : (value < 0) ? 0 : value;
				this.close();
				componentOrderPayment.passInfo.update();
			},
			render : function() {
				const self = this;
				this.popup = uiPopup({
					template : this.template(),
					event : {
						click : {
							close : function() {self.close();},
							submit : function() {self.submit();}
						},
						change : {
							infinite : function() {
								componentOrderPayment.popup.pricingInfo.event.changeInfinite(this);
							},
							value : function() {
								if(self.name == "useNumber" && self.data.seqPassInfo) {
									const name = this.name;
									const maxValue = Number(this.getAttribute("max") || 10000);
									const beforeSpendNumber = self.data.mergeInfo.spendNumber || 0;
									const beforeRemainNumber = self.data.mergeInfo.remainNumber || 0;

									let value = self.popup.getValue("value", true);
									let remainValue = self.popup.getValue("remainValue", true);
									if(value > maxValue) value = maxValue;
									if(remainValue > maxValue) remainValue = maxValue;
									if(name == "value") {
										remainValue = value - beforeSpendNumber;
									} else {
										value = remainValue + beforeSpendNumber;
									}
									if(remainValue < beforeRemainNumber) remainValue = beforeRemainNumber;
									if(value < remainValue + beforeSpendNumber) value = remainValue +  beforeSpendNumber;
									else if(remainValue > value) remainValue = value;
									if(value > maxValue) {
										remainValue = remainValue + (maxValue - value);
										value = maxValue;
									}
									self.popup.putValue("value", value);
									self.popup.putValue("remainValue", remainValue);
								}
							}
						}
					}
				});
				uiInput(this.popup);
				const value = this.data[this.name];
				if(value < 0) {
					const input = this.popup.querySelector("[name='value']");
					input.disabled = true;
					input.value = 0;
					this.popup.putValue("infinite", "Y");
				}
				this.popup.putValue("value", value);
				if(this.data.seqPassInfo) {
					if(this.name == "useNumber") {
						const input = this.popup.querySelector("[name='remainValue']");
						input.value = this.data.remainNumber || 0;
					}
				}

				setTimeout(() => {
					const input = this.popup.querySelector("input, select");
					if(input) input.focus();
				}, 200);
			},
			template : function() {
				const name = this.name;
				const type = this.type;
				const getName = () => {
					switch(name) {
						case "useNumber" : return (this.data.seqPassInfo) ? "잔여/전체 횟수" : "이용 횟수";
					}
					return "-";
				};
				const getForm = () => {
					switch(type) {
						case "number" :
							if(name == "useNumber" && this.data.seqPassInfo) {
								return `
									<div>
										<input type="integer" name="remainValue" min="0" max="10000" data-event="value">회
										<span> / </span>
										<input type="integer" name="value" min="0" max="10000" data-event="value">회
									</div>

								`;
							} else {
								return `<input type="integer" name="value" min="0" max="10000">회`;
							}
					}
					return "-";
				};
				const getNote = () => {
					if(name == "useNumber" && this.data.seqPassInfo) {
						const remainNumber = this.data.mergeInfo.remainNumber || 0;
						const spendNumber = this.data.mergeInfo.spendNumber || 0;
						return `<p class="ui-note">잔여/전체 횟수는 결합 이전 이용권의 잔여/전체 횟수(${remainNumber}회 / ${remainNumber + spendNumber}회) 보다 작게 설정할 수 없습니다.</p>`;
					} else {
						return "";
					}
				};
				return `
					<style type="text/css">
						.popupChangePricing td div input	{max-width:85px}
						.popupChangePricing td div span		{margin:0 10px}
					</style>
					<div class="popupChangePricing micro">
						<div class="top">
							<h2>
								${getName()} 수정
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle ui-form">
							<table>
								<tr>
									<th>${getName()}</th>
									<td>${getForm()}</td>
								</tr>
							</table>
							${getNote()}
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">취소</button>
							<button class="ui-button green" data-event="submit">수정</button>
						</div>
					</div>
				`;
			}
		},
		paymentInfo : {
			popup : undefined,
			mode : "create",
			index : 0,
			paymentType : "",
			seqOrderPayment : 0,
			isUpdate : false,
			data : {
				paymentSummaryInfo : {},	// 결제개요 정보
				pricingList : [],			// 가격정책 목록
				paymentList : [],			// 결제정보 목록
				paymentInfo : {},			// 결제정보
				bankAccountList : [],		// 입금은행 목록
				cardList : [],				// 카드사 목록
				bankList : [],				// 은행 목록
				coachList : []				// 강사 목록
			},
			callback : undefined,
			open : function(context, object, callback) {
				if(this.popup) return;
				const index = object.getAttribute("data-index");
				this.index = (index) ? Number(index) : "";
				this.paymentType = object.getAttribute("data-type");
				this.seqOrderPayment = Number(object.getAttribute("data-sequence"));
				this.mode = (index) ? "update" : "create";
				this.data = context.data;
				this.isUpdate = (this.data.orderInfo.seqOrderInfo) ? true : false;
				this.data.paymentInfo = this.data.paymentList[this.index] || {};
				this.callback = callback;
				const remainAmount = this.data.paymentSummaryInfo.remainAmount;
				if(this.mode == "create" && remainAmount == 0) {
					alert("결제 가능한 금액이 없습니다.");
					return;
				}
				this.render();
			},
			close : function() {
				this.popup = undefined;
				uiPopup();
			},
			submit : function() {
				const popup = this.popup;
				const data = {}
				data.seqOrderPayment = this.seqOrderPayment || null;
				data.paymentAmount = popup.getValue("paymentAmount", true),
				data.approvalNumber = popup.getValue("approvalNumber");
				switch(this.paymentType) {
					case "card" :
						const installmentPeriodYn = this.popup.getValue("installmentPeriodYn");
						const installmentPeriod = this.popup.getValue("installmentPeriod", true);
						data.installmentPeriod = (installmentPeriodYn == "Y") ? 1 : installmentPeriod;
						data.cardCode = this.popup.getValue("cardCode");
						data.cardNumber = this.popup.getValue("cardNumber");
						break;
					case "cash" :
					case "transfer" :
						const cashReceiptYn = this.popup.getValue("cashReceiptYn");
						const isCashReceipt = (cashReceiptYn == "Y");
						const receiptTab = this.popup.getValue("receiptTab");
						const cashReceiptType = (receiptTab == "2") ? "BUSINESS_NUMBER" : this.popup.getValue("cashReceiptType");
						const cashReceiptNumber = this.popup.querySelector("[name='cashReceiptNumber'][data-type='" + cashReceiptType + "']").value;
						data.cashReceiptYn = cashReceiptYn;
						data.cashReceiptType = (isCashReceipt) ? cashReceiptType : "";
						data.cashReceiptNumber = (isCashReceipt) ? cashReceiptNumber : "";
						if(this.paymentType == "transfer") {
							data.seqBankAccount = this.popup.getValue("seqBankAccount");
							data.depositorName = this.popup.getValue("depositorName");
						}
						break;
				}
				if(!this.check(data)) return;

				const setAppendix = () => {
					const paymentDate = this.popup.getValue("paymentDate");
					const paymentTimeHour = this.popup.getValue("paymentTimeHour") || "00";
					const paymentTimeMinute = this.popup.getValue("paymentTimeMinute") || "00";
					const paymentDatetime = `${paymentDate}T${paymentTimeHour}:${paymentTimeMinute}:00`;
					data.paymentDate = paymentDate;
					data.paymentDatetime = paymentDatetime;
					data.seqPartnerCoach = this.popup.getValue("seqPartnerCoach", true);
					data.memo = this.popup.getValue("memo").trim();
				};
				if(this.mode == "update") {
					if(this.isUpdate || this.seqOrderPayment) setAppendix();
					this.data.paymentInfo = Object.assign(this.data.paymentInfo, data);
				} else {
					if(this.isUpdate) setAppendix();
					data.paymentType = this.paymentType.toUpperCase();
					this.data.paymentList.push(data);
				}
				if(this.callback)
					this.callback("update");
				this.close();
			},
			remove : function() {
				this.data.paymentList.splice(this.index, 1);
				this.close();
				if(this.callback)
					this.callback("remove");
			},
			check : function(data) {
				for(let name in data) {
					const value = data[name];
					const isEmpty = (!value);
					let error = "";
					switch(name) {
						case "paymentAmount" 		:
							const paymentAmount = value;
							const oldPaymentAmount = this.data.paymentInfo.paymentAmount;
							const remainAmount = this.data.paymentSummaryInfo.remainAmount + oldPaymentAmount;
							const exceedAmount = remainAmount - paymentAmount;
							if(isEmpty) error = "결제금액을 입력해 주세요.";
							else if(exceedAmount < 0) error = "결제금액을 다시 한 번 확인해 주세요.\n(초과 금액 : " + getComma(exceedAmount * -1) + "원)";
							break;
						case "installmentPeriod"	: if(isEmpty) error = "할부기간을 선택해 주세요."; break;
						case "cashReceiptNumber"	: if((data.cashReceiptYn == "Y") && isEmpty) error = "현금영수증 발행 요청 번호를 입력해 주세요."; break;
						case "seqPartnerCoach"		: if(isEmpty) error = "결제 담당자를 선택해 주세요."; break;
						case "cardNumber"			: if(!isEmpty && !isNumber(value)) error = "카드번호를 확인해 주세요."; break;
						case "approvalNumber"		: if(!isEmpty && !isNumber(value)) error = "승인번호를 확인해 주세요."; break;
					}
					if(error) {
						alert(error);
						const node = this.popup.querySelector(name);
						if(node) node.focus();
						return false;
					}
				}
				return true;
			},
			render : function() {
				const self = this.event.self = this.template.self = this;
				this.popup = uiPopup({
					template : this.template[this.paymentType](),
					event : {
						click : {
							submit : function() {self.submit()},
							remove : function() {self.remove()},
							close : function() {self.close()}
						},
						change : {
							receiptYn : function() {self.event.changeReceiptYn(this);},
							receiptTab : function() {self.event.changeReceiptTab(this);},
							receiptType : function() {self.event.changeReceiptType(this);},
							remainYn : function() {self.event.changeRemainYn(this);},
							installmentPeriodYn : function() {self.event.changeInstallmentPeriodYn();},
						}
					}
				});
				uiInput(this.popup);
				uiCalendar(this.popup);

				if(this.mode == "update") {
					this.prepare();
				} else {
					this.popup.putValue("remainYn", "Y");				// 잔액 전체 여부
					this.popup.putValue("installmentPeriodYn", "Y");	// 카드할부 일시불 여부
					this.popup.putValue("cashReceiptYn", "N");			// 현금영수증 여부
					this.event.changeRemainYn();
					if(this.isUpdate) {
						const today = new Date();
						this.popup.putValue("seqPartnerCoach", this.data.orderInfo.seqPartnerCoach);
						this.popup.putValue("paymentTimeHour", today.getHours().zf(2));
						this.popup.putValue("paymentTimeMinute", today.getMinutes().zf(2));
					}
				}
				if(this.paymentType == "cash" || this.paymentType == "transfer") {
					this.event.changeReceiptYn();
					this.event.changeReceiptTab();
					this.event.changeReceiptType();
				}
				if(this.paymentType == "card") {
					this.event.changeInstallmentPeriodYn();
				}
			},
			prepare : function() {
				const popup = this.popup;
				const item = this.data.paymentInfo;

				popup.putValue("paymentAmount", getComma(item.paymentAmount));
				popup.putValue("approvalNumber", item.approvalNumber);
				switch(this.paymentType) {
					case "card" :
						popup.putValue("installmentPeriod", item.installmentPeriod);
						if(item.installmentPeriod == 1)
							popup.putValue("installmentPeriodYn", "Y");
						popup.putValue("cardCode", item.cardCode);
						popup.putValue("cardNumber", item.cardNumber);
						break;
					case "cash" :
					case "transfer" :
						popup.putValue("cashReceiptYn", item.cashReceiptYn);
						if(item.cashReceiptYn == "Y") {
							const cashReceiptType = item.cashReceiptType;
							if(cashReceiptType == "BUSINESS_NUMBER")
								popup.putValue("receiptTab", "2");
							else
								popup.putValue("cashReceiptType", cashReceiptType);
							popup.querySelector("[name='cashReceiptNumber'][data-type='" + cashReceiptType + "']").value = item.cashReceiptNumber;
						}
						if(this.paymentType == "transfer") {
							popup.putValue("seqBankAccount", item.seqBankAccount);
							popup.putValue("depositorName", item.depositorName);
						}
						break;
				}
				const paymentDatetime = new Date(item.paymentDatetime);
				this.popup.putValue("seqPartnerCoach", item.seqPartnerCoach);
				this.popup.putValue("paymentDate", item.paymentDate);
				this.popup.putValue("paymentTimeHour", paymentDatetime.getHours().zf(2));
				this.popup.putValue("paymentTimeMinute", paymentDatetime.getMinutes().zf(2));
				this.popup.putValue("memo", item.memo);
			},
			event : {
				changeReceiptYn : function() {
					const input = this.self.popup.querySelector("[name='cashReceiptYn']:checked");
					const div = this.self.popup.querySelector(".ui-tab");
					if(input.value == "N")
						div.classList.remove("focus");
					else
						div.classList.add("focus");
					const approvalNumber = this.self.popup.querySelector("[name='approvalNumber']");
					if(approvalNumber) approvalNumber.disabled = (input.value == "N");
				},
				changeReceiptTab : function() {
					const input = this.self.popup.querySelectorAll("[name='receiptTab']");
					const div = this.self.popup.querySelectorAll(".tab");
					input.forEach((item, index) => {
						div[index].classList.remove("focus");
						if(item.checked) div[index].classList.add("focus");
					})
				},
				changeReceiptType: function() {
					const select = this.self.popup.querySelector("[name='cashReceiptType']");
					const index = select.selectedIndex;
					if(index < 1) return;
					const input = this.self.popup.querySelectorAll(".tab-1 input");
					input.forEach(item => {
						item.classList.remove("focus");
					});
					input[index - 1].classList.add("focus");
				},
				changeRemainYn : function() {
					const summaryInfo = this.self.data.paymentSummaryInfo;
					let paymentAmount = this.self.data.paymentInfo.paymentAmount || 0;
					if(paymentAmount > summaryInfo.salePrice)
						paymentAmount = summaryInfo.salePrice;
					const remainAmount = summaryInfo.remainAmount || 0;
					const input1 = this.self.popup.querySelector("[name='paymentAmount']");
					const input2 = this.self.popup.querySelector("[name='remainYn']");
					if(!input2) return;
					input1.value = getComma(paymentAmount + remainAmount);
					input1.disabled = (input2.checked) ? true : false;
				},
				changeInstallmentPeriodYn : function() {
					const input1 = this.self.popup.querySelector("[name='installmentPeriod']");
					const input2 = this.self.popup.querySelector("[name='installmentPeriodYn']");
					if(input2.checked) input1.value = 1;
					input1.disabled = (input2.checked) ? true : false;
				}
			},
			template : {
				getAmountInfo : function() {
					return `
						<input name="paymentAmount" type="currency" min="0" tabIndex> 원
						<label class="ui-input-checkbox">
							<input name="remainYn" type="checkbox" data-event="remainYn">
							<span></span>잔액 전체
						</label>
					`;
				},
				getPaymentInfo : function() {
					if(!this.self.isUpdate) return "";
					return `
						<hr>
						<table>
							<tr>
								<th>결제 담당자</th>
								<td>
									<select class="ui-select" name="seqPartnerCoach">
										<option value="">선택해 주세요.</option>
										${componentMember.getCoachList()}
									</select>
								</td>
							</tr>
							<tr>
								<th>결제일시</th>
								<td>
									<input name="paymentDate" type="calendar" value="today">
									<select name="paymentTimeHour" class="ui-select date">
										<option value="">시</option>
										${componentMember.getHour()}
									</select>
									:
									<select name="paymentTimeMinute" class="ui-select date">
										<option value="">분</option>
										${componentMember.getMinute()}
									</select>
								</td>
							</tr>
							<tr>
								<th>결제 메모</th>
								<td><textarea class="ui-textarea" name="memo" maxlength="1000"></textarea></td>
							</tr>
						</table>
					`;
				},
				getReceiptInfo : function() {
					const receiptNumber = (typeof uiProfile != "undefined" && uiProfile.data.mobile) ? uiProfile.data.mobile : "";
					return `
						<label class="ui-input-radio">
							<input name="cashReceiptYn" type="radio" value="Y" checked data-event="receiptYn">
							<span></span>
							발행
						</label>
						<label class="ui-input-radio">
							<input name="cashReceiptYn" type="radio" value="N" data-event="receiptYn">
							<span></span>
							미발행
						</label>
						<div class="receipt-detail ui-tab block">
							<ul>
								<li><label><input name="receiptTab" type="radio" value="1" data-event="receiptTab" checked><div>개인소득공제</div></label></li>
								<li><label><input name="receiptTab" type="radio" value="2" data-event="receiptTab"><div>사업자지출증빙</div></label></li>
							</ul>
							<div class="tab tab-1 focus">
								<dl>
									<dt>
										<select class="ui-select" name="cashReceiptType" data-event="receiptType">
											<option value="">선택해 주세요.</option>
											<option value="MOBILE" selected>휴대전화</option>
											<option value="CASH_RECEIPT_CARD">현금영수증카드</option>
										</select>
									</dt>
									<dd>
										<input class="focus" name="cashReceiptNumber" type="text" maxlength="13" data-type="MOBILE" value="${receiptNumber}" placeholder="휴대전화 번호를 입력해 주세요.">
										<input name="cashReceiptNumber" type="text" maxlength="20" data-type="CASH_RECEIPT_CARD" placeholder="현금영수증카드 번호를 입력해 주세요.">
									</dd>
								</dl>
							</div>
							<div class="tab tab-2">
								<dl>
									<dd>
										<input name="cashReceiptNumber" type="text" maxlength="20" data-type="BUSINESS_NUMBER" placeholder="사업자 번호를 입력해 주세요.">
									</dd>
								</dl>
							</div>
						</div>
					`;
				},
				getBottomButton : function() {
					return (this.self.mode == "update") ? `
						<button class="ui-button gray" data-event="close">취소</button>
						<button class="ui-button green" data-event="submit">수정</button>
					` : `
						<button class="ui-button gray" data-event="close">취소</button>
						<button class="ui-button" data-event="submit">등록</button>
					`;
				},
				card : function() {
					return `
						<div class="ui-receipt-popup tiny">
							<div class="top">
								<h2>
									신용카드
									<a data-event="close"></a>
								</h2>
							</div>
							<div class="middle">
								<table>
									<tr>
										<th>결제금액</th>
										<td>${this.getAmountInfo()}</td>
									</tr>
									<tr>
										<th>할부기간</th>
										<td>
											<input name="installmentPeriod" type="integer" min="0" max="100" tabIndex> 개월
											<label class="ui-input-checkbox">
												<input name="installmentPeriodYn" type="checkbox" data-event="installmentPeriodYn">
												<span></span>일시불
											</label>
										</td>
									</tr>
									<tr>
										<th>카드사</th>
										<td>
											<select class="ui-select" name="cardCode" tabIndex>
												<option value="">카드사(선택)</option>
												<option value="">선택안함</option>
												${componentMember.getCardList()}
											</select>
										</td>
									</tr>
									<tr>
										<th>카드번호</th>
										<td>
											<input name="cardNumber" type="text" maxlength="4" placeholder="뒷자리 4자리(선택)" tabIndex></dd>
										</td>
									</tr>
									<tr>
										<th>승인번호</th>
										<td><input name="approvalNumber" type="text" maxlength="32" placeholder="승인번호(선택)" tabIndex></td>
									</tr>
								</table>
								${this.getPaymentInfo()}
							</div>
							<div class="bottom">
								${this.getBottomButton()}
							</div>
						</div>
					`;
				},
				cash : function() {
					return `
						<div class="ui-receipt-popup tiny">
							<div class="top">
								<h2>
									현금
									<a data-event="close"></a>
								</h2>
							</div>
							<div class="middle">
								<table>
									<tr>
										<th>결제금액</th>
										<td>${this.getAmountInfo()}</td>
									</tr>
									<tr>
										<th class="top">현금영수증</th>
										<td>
											${this.getReceiptInfo()}
										</td>
									</tr>
									<tr>
										<th>승인번호</th>
										<td><input name="approvalNumber" type="text" maxlength="32" placeholder="승인번호(선택)" tabIndex></td>
									</tr>
								</table>
								${this.getPaymentInfo()}
							</div>
							<div class="bottom">
								${this.getBottomButton()}
							</div>
						</div>
					`;
				},
				transfer : function() {
					return `
						<div class="ui-receipt-popup tiny">
							<div class="top">
								<h2>
									이체
									<a data-event="close"></a>
								</h2>
							</div>
							<div class="middle">
								<table>
									<tr>
										<th>결제금액</th>
										<td>${this.getAmountInfo()}</td>
									</tr>
									<tr>
										<th class="top">현금영수증</th>
										<td>
											${this.getReceiptInfo()}
										</td>
									</tr>
									<tr>
										<th>승인번호</th>
										<td><input name="approvalNumber" type="text" maxlength="32" placeholder="승인번호(선택)" tabIndex></td>
									</tr>
									<tr>
										<th>입금정보</th>
										<td>
											<select class="ui-select block left" name="seqBankAccount" tabIndex>
												<option value="">입금은행(선택)</option>
												<option value="">선택안함</option>
												${componentMember.getBankAccountList()}
											</select>
										</td>
									</tr>
									<tr>
										<th>입금자명</th>
										<td><input name="depositorName" type="text" maxlength="16" placeHolder="입금자명(선택)" tabIndex></td>
									</tr>
								</table>
								${this.getPaymentInfo()}
							</div>
							<div class="bottom">
								${this.getBottomButton()}
							</div>
						</div>
					`;
				}
			}
		},
		discountCoupon : {
			popup : undefined,
			index : 0,
			data : {},
			callback : undefined,
			open : function(context, index, callback) {
				if(this.popup) return;
				this.data = context.data;
				this.index = index;
				this.data.detailInfo = this.data.pricingInfo.detailList[this.index];
				const price = this.data.detailInfo.price || 0;
				const isMerge = (this.data.detailInfo.seqPassInfo);
				const reOrderType = ((orderType == "" || orderType == "pass") && isMerge) ? "merge" : orderType;
				discountCouponController.getAvailableList(seqMember, reOrderType, price).then(item => {
					this.data.couponList = (item || []).filter(item => {
						return (item.useYn == "Y" && item.displayYn == "Y" && item.discountYn == "Y");
					});
					this.callback = callback;
					this.render();
				}).catch(error => {
					console.log(error);
					alert("쿠폰 정보를 가져오는데 실패하였습니다.");
				});
			},
			close : function() {
				this.popup = undefined;
				uiPopup();
			},
			submit : function() {
				const input = this.popup.querySelector("[name='seqDiscountCoupon']:checked");
				if(!input) {
					alert("쿠폰을 선택해 주세요.");
					return;
				}
				const seqDiscountCoupon = Number(input.value);
				const discountAmount = Number(input.getAttribute("data-value"));
				const discountRate = Number(input.getAttribute("data-rate"));
				const detailInfo = this.data.detailInfo;
				const remainAmount = detailInfo.price - detailInfo.discountAmount - detailInfo.usePoint;
				if(remainAmount < discountAmount)
					detailInfo.usePoint = detailInfo.price - discountAmount;
				detailInfo.seqDiscountCoupon = seqDiscountCoupon;
				detailInfo.discountRate = discountRate;
				detailInfo.discountAmount = discountAmount;
				this.close();
				if(this.callback) this.callback();
			},
			render : function() {
				const self = this;
				this.popup = uiPopup({
					template : this.template(),
					event : {
						click : {
							close : function() {self.close();},
							submit : function() {self.submit(this);}
						}
					}
				});
				const seqDiscountCoupon = this.data.detailInfo.seqDiscountCoupon;
				if(seqDiscountCoupon)
					this.popup.putValue("seqDiscountCoupon", seqDiscountCoupon);
			},
			template : function() {
				const detailInfo = this.data.detailInfo;
				const price = detailInfo.price || 0;				// 정가
				const beforePrice = detailInfo.beforePrice || 0;	// 업그레이드, 교체

				const li = this.data.couponList.map(item => {
					const getDiscount = function() {
						if(item.discountType == "PRICE") {
							return "할인가 " + getComma(item.discountPrice) + "원";
						} else {
							const max = item.maximumDiscountPrice;
							return "할인율 " + item.discountRate + "%" + ((max) ? " (최대 : " + getComma(max) + "원 까지)" : "");
						}
					};
					const getDiscountCondition = function() {
						const min = getComma(item.minimumSalesPrice);
						const max = getComma(item.maximumSalesPrice);
						if(max == 0) {
							return  min + "원 이상 결제 시";
						} else {
							return  min + "원 이상 " + max + "원 이하 결제 시";
						}
					};
					const type = item.discountType;
					const discountRate = (type == "RATE") ? item.discountRate : 0;
					const maxDiscountPrice = item.maximumDiscountPrice;
//					let discountAmount = (type == "RATE") ? parseInt((price - beforePrice) * item.discountRate * 0.01) : item.discountPrice;
					let discountAmount = (type == "RATE") ? Math.round((price - beforePrice) * item.discountRate * 0.01) : item.discountPrice;
					if(type == "RATE" && maxDiscountPrice && discountAmount > maxDiscountPrice)
						discountAmount = maxDiscountPrice;
					return `
						<li>
							<label class="ui-input-radio">
								<input name="seqDiscountCoupon" type="radio" value="${item.seqDiscountCoupon}" data-rate="${item.discountRate}" data-value="${discountAmount}" data-event="coupon">
								<span></span>
								<h4>${item.discountCouponName}</h4>
								<p>${getDiscount()} / ${getDiscountCondition()}</p>
								<var class="green">적용할인금액 : ${getComma(discountAmount)}원</var>
							</label>
						</li>
					`;
				});

				const buttonHidden = (li.length == 0) ? "hidden" : "";
				const couponList = (li.length == 0) ? `<li class="empty">사용 가능한 쿠폰이 없습니다.</li>` : li.join("");

				return `
					<style type="text/css">
						.popupDiscountCoupon					{}
						.popupDiscountCoupon .middle			{padding:0 25px !important; max-height:400px; overflow-y:auto}
						.popupDiscountCoupon .middle li + li	{border-top:1px solid #ccc}
						.popupDiscountCoupon li label			{position:relative; display:block; padding:15px 0; padding-left:40px; overflow:hidden}
						.popupDiscountCoupon li label + label	{border-top:1px solid #ccc}
						.popupDiscountCoupon li label span		{position:absolute; left:0; top:50%; margin-top:-10px}
						.popupDiscountCoupon li label h4		{font-size:15px}
						.popupDiscountCoupon li label p			{display:block; margin:4px 0; padding:8px; background-color:#f0f0f0; color:#555}
						.popupDiscountCoupon li label var		{font-size:13.5px}
						.popupDiscountCoupon li.empty			{padding:25px; text-align:center; font-size:16px; color:#bbb}
						.popupDiscountCoupon button.hidden		{display:none}
					</style>
					<div class="popupDiscountCoupon small">
						<div class="top">
							<h2>
								쿠폰 선택
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle">
							<ul>
								${couponList}
							</ul>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">취소하기</button>
							<button class="ui-button ${buttonHidden}" data-event="submit">선택하기</button>
						</div>
					</div>
				`;
			}
		},
		complete : {
			popup : undefined,
			data : {},
			open : function(context) {
				Promise.all([
					orderController.orderInfo.info(seqMember, seqOrderInfo, true),
				]).then(([orderInfo]) => {
//					this.data.orderInfo = orderList.filter(item => {
//						return (item.seqOrderInfo == seqOrderInfo);
//					})[0];
          console.log(orderInfo);
          // console.log(context.data.coachList);
					this.data.orderInfo = JSON.parse(orderInfo);
					this.data.coachList = context.data.coachList;
					this.render();
				}).catch(error => {
					console.log(error);
					alert("데이터를 가져오는데 실패하였습니다.");
				});
			},
			close : function() {
				this.popup = uiPopup();
				window.location.href = "/member/" + seqMember + "/orderInfo";
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
							reservation : function() {
								const serviceType = this.getAttribute("data-type");
								const seqPassInfo = Number(this.getAttribute("data-sequence"));
								if(serviceType == "class") {
									popupScheduleReservation.class.search.open({
										seqMember : seqMember,
										seqPartnerProductUsage : seqPassInfo
									});
								} else if(serviceType == "appointment") {
									popupScheduleReservation.appointment.search.open(seqMember, seqPassInfo, () => {
										console.log("update");
									});
								}
							}
						}
					}
				});
			},
			template : function() {
				const orderInfo = this.data.orderInfo;
        console.log(orderInfo.pricing);
				const pricingInfo = orderInfo.pricing[0];
				const passList = (orderInfo.passInfos || []);
				const getOrderType = () => {
					switch(orderType) {
						case "upgrade" : return "업그레이드";
						case "cross" : return "교체";
					}
					return "판매";
				};
				const getServiceColor = () => {
					const isPackage = (pricingInfo.serviceCategory == "PACKAGE");
					if(isPackage) return "green";
					const serviceType = passList[0].serviceType;
					const serviceColor = uiParameter.service.color[serviceType];
					return serviceColor;
				};
				const tr = passList.map(item => {
					const serviceType = item.serviceType.toLowerCase();
					const seqPassInfo = item.seqPassInfo;
					const coachName = componentMember.getCoachName(item.seqPartnerCoach);
					const getButton = () => {
						return (serviceType == "appointment" || serviceType == "class") ?
							`<button class="ui-button medium green" data-type="${serviceType}" data-sequence="${seqPassInfo}" data-event="reservation">일괄예약</button>` :
							``;
					};
					return `
						<tr>
							<td>${item.serviceName}</td>
							<td>${componentMember.getUsePeriod(item)}</td>
							<td>${componentMember.getUseNumber(item)}</td>
							<td>${getComma(item.salePrice)}원</td>
							<td class="green">${getComma(item.paymentAmount)}원</td>
							<td class="red">${getComma(item.receivables)}원</td>
							<td>${coachName}</td>
							<td>${getButton()}</td>
						</tr>
					`;
				});

				return `
					<style type="text/css">
						.popupComplete										{max-width:1024px}
						.popupComplete .middle								{}
						.popupComplete .middle .box							{margin-bottom:20px}
						.popupComplete .middle .box .icon					{position:relative; margin:0 auto; width:50px; height:50px; border-radius:100%; border:3px solid #37b772}
						.popupComplete .middle .box .icon:before			{content:""; position:absolute; left:27%; top:48%; width:18px; height:25px; border-right:3px solid #37b772; border-bottom:3px solid #37b772; transform:rotate(45deg) translate(-50%, -50%)}
						.popupComplete .middle .box h3						{margin:5px 0 10px 0; text-align:center}
						.popupComplete .middle .box p						{margin-top:10px; text-align:center}
						.popupComplete .middle .ui-list-result .list		{padding:1px; max-height:300px; border:1px solid #ccc; overflow-y:auto}
						.popupComplete .middle .ui-list-result .list li		{border:none}
						.popupComplete .bottom a + a						{margin-left:10px}
					</style>
					<div class="popupComplete">
						<div class="top">
							<h2>
								이용권 ${getOrderType()} 완료
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle">
							<div class="box">
								<div class="icon"></div>
								<h3 class="green">이용권 ${getOrderType()}가 완료되었습니다.</h3>
								<p class="ui-note blue">
									아래 목록에서 '일괄예약' 버튼을 클릭해 구매한 이용권의 수업을 바로 일괄 예약할 수 있습니다.
									스케줄러 또는 이용권 목록에서도 수업을 일괄 예약할 수 있습니다.
								</p>
							</div>
							<div class="orderInfo">
								<div class="ui-list-result">
									<div class="list">
										<ul>
											<li>
												<h4>${pricingInfo.pricingName}</h4>
												<div class="bg ${getServiceColor(pricingInfo)}"></div>
												<table class="ui-table">
													<thead>
														<tr>
															<td class="name">서비스명</td><td>기간</td><td>횟수</td><td>판매가</td>
															<td>결제완료</td><td>미수금</td><td>담당강사</td><td>기타</td>
														</tr>
													</thead>
													<tbody>
														${tr.join("")}
													</tbody>
												</table>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div class="bottom">
							<a href="/member/${seqMember}/pass"><button class="ui-button">이용권 바로가기</button></a>
							<a href="/member/${seqMember}/orderInfo"><button class="ui-button">판매내역 바로가기</button></a>
						</div>
					</div>
				`;
			}
		}
	}
};