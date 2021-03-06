const componentOrderHistory = {
	mode : "",
	data : {},
	permission : {},
	open : function(seqMember) {
		this.mode = (seqMember) ? "member" : "report";
		this.combineList.parent = this.orderList.parent = this.refundList.parent = this.paymentList.parent = this.orderInfo.parent = this;

		Promise.all([
			(seqMember) ? orderController.orderInfo.summary(seqMember) : "",
			commonController.coachList(),
			commonController.cardList(),
			permissionController.getList()
		]).then(([orderSummary, coachList, cardList, permission]) => {
			if(seqMember) {
				this.data.orderSummary = orderSummary;
				this.setSummary();
			}
			this.data.coachList = coachList || [];
			this.data.cardList = cardList || [];
			this.permission = permission || {};
			componentMember.data = this.data;
			componentMember.permission = this.permission;
			this.render();
		}).catch(error => {
			uiError(error);
		});
	},
	render : function(isUpdate) {
		const setInfo = () => {
			const section = document.querySelector("[data-id='orderBox']");
			const div = document.querySelector("[data-id='orderInfo']").parentNode;
			const self = this;
			uiEvent(div, {
				click : {
					close : function() {
						section.classList.toggle("focus");
						if(!section.classList.contains("focus"))
							self.orderInfo.close();
					}
				}
			});
		};
		const setList = () => {
			this.combineList.open(this);
			this.orderInfo.data = this.data;
		};
		const setTab = () => {
			const tabIndex = Number(getParameter("tab"));
			const section = document.querySelector("[data-id='orderBox']");
			const tabList = section.querySelectorAll("[name='subTab']");
			tabList.forEach(item => {
				item.addEventListener("change", () => {
					const tab = section.getValue("subTab");
					if(!this.data[tab])
						componentOrderHistory[tab].open(this);
					section.classList.remove("focus");
				});
			});
			uiTab();
			if(tabIndex) tabList[tabIndex - 1].click();
			else tabList[0].click();
		};
		setInfo();
		setList();
		setTab();
	},
	update : function() {
		const section = document.querySelector("[data-id='orderBox']");
		const tab = section.getValue("subTab");
		componentOrderHistory[tab].open(this);
	},
	setSummary : function() {
		const section = document.querySelector("[data-id='order-summary']");
		if(this.mode == "member") {
			const data = this.data.orderSummary;
			section.putValue("totalOrderAmount", getComma(data.totalOrderAmount || 0));
			section.putValue("totalPaymentAmount", getComma(data.totalPaymentAmount || 0));
			section.putValue("totalReceivables", getComma(data.totalReceivables || 0));
			section.putValue("firstOrderDate", uiDate(data.firstOrderDate) || "??????");
			section.putValue("lastOrderDate", uiDate(data.lastOrderDate) || "??????");
		} else {
			const data = this.data.orderSummary.summary || {};

			if(!data.sumSalePrice) data.sumSalePrice = 0;
			if(!data.sumPaymentAmount) data.sumPaymentAmount = 0;
			if(!data.sumReceivables) data.sumReceivables = 0;
			if(!data.sumRefundAmount) data.sumRefundAmount = 0;
			if(!data.sumRefundPaymentAmount) data.sumRefundPaymentAmount = 0;
			const sumPaymentAmount = data.sumPaymentAmount;
			const sumDepositAmount = sumPaymentAmount + data.sumRefundPaymentAmount - data.sumRefundAmount;

			section.putValue("sumSaleAmount", getComma(data.sumSalePrice));
			section.putValue("sumReceivableAmount", getComma(data.sumReceivables));
			section.putValues("sumPaymentAmount", getComma(data.sumPaymentAmount));
			section.putValue("sumRefundAmount", getComma(data.sumRefundAmount));
			section.putValues("sumRefundPaymentAmount", getComma(data.sumRefundPaymentAmount));
			section.putValue("sumDepositAmount", getComma(sumDepositAmount));
		}
	},
	setExcelExport : function(container, categoryName, tabName) {
		const table = container.querySelector("table");
		let fileName = "";
		if(this.mode == "member") {
			const memberName = (uiProfile.data) ? uiProfile.data.memberName || "" : "";
			fileName = `${memberName}`;
		} else {
			const div = document.querySelector("main .ui-date-selector");
			const type = div.getAttribute("data-type");
			const startDate = div.getAttribute("data-start-date");
			const endDate = div.getAttribute("data-end-date");
			const date = div.getAttribute("data-date");

			switch(type) {
				case "day" : fileName = `??????????????????_${date}`; break;
				case "week" : fileName = `??????????????????_${startDate}??????_${endDate}??????`; break;
				case "month" : fileName = `??????????????????_${date.substr(0, 7)}`; break;
			}
		}
		fileName = `${categoryName}_${tabName}_${fileName}`;
		table.setAttribute("data-table-export-title", categoryName);
		table.setAttribute("data-table-export-filename", fileName);
	},

	/* ******** ?????? ??? ?????? ?????? ?????? ******** */
	combineList : {
		mode : "",
		data : {},
		permission : {},
		open : function(context) {
			try {
				this.mode = context.mode;
				this.data = context.data;
				this.permission = context.permission;
				if(!this.data.combineList) {
					Promise.all([
						(this.mode == "member") ?
							orderController.combineInfoList(seqMember) :
							reportController.sales.combineList(this.data.search.data)
					]).then(([data]) => {
						const orderInfoList = data.orderInfos || [];
						const combineList = data.rows || [];
						combineList.forEach(item => {
							item.orderInfo = orderInfoList[item.seqOrderInfo] || {};
						});
						this.data.orderInfoList = orderInfoList;
						this.data.combineList = combineList;
						this.render();
					}).catch(error => {
						console.log(error);
						alert("?????? ??? ?????? ?????? ????????? ??????????????? ?????????????????????.");
					});
				} else {
					this.render();
				}
			} catch(error) {
				console.log(error);
				alert("?????? ??? ?????? ?????? ????????? ??????????????? ?????????????????????.");
			}
		},
		update : function() {
			this.render(true);
		},
		filter : function(data) {
			const isCanceled = (this.container.querySelector("[data-event='canceledYn']:checked"));
			const isExpired = (this.container.querySelector("[data-event='expiredYn']:checked"));
			const isReceivable = (this.container.querySelector("[data-event='receivableYn']:checked"));
			return data.filter(item => {
				const orderInfo = item.orderInfo;
				const passStatus = (orderInfo.passInfos && orderInfo.passInfos[0]) ? orderInfo.passInfos[0].status : "";
				if(isReceivable)
					return (orderInfo.receivables) ? true : false;
				if(isCanceled) {
					if(orderInfo.orderState == "CANCELLED") return false;
				}
				if(isExpired) {
					if(passStatus != "AVAILABLE" && passStatus != "PAUSE") return false;
				}
				return true;
			});
		},
		render : function(isUpdate) {
			const div = document.querySelector("[data-id='combineList']");
			const container = this.container = div.parentNode.parentNode;
			const data = this.filter(this.data.combineList);
			div.innerHTML = this.template(data);

			const orderInfo = this.parent.orderInfo;
			const tr = container.querySelectorAll("table tbody tr");
			const section = document.querySelector("[data-id='orderBox']");
			tr.forEach(item => {
				const td = item.querySelector("td");
				if(td.className != "empty") {
					item.addEventListener("click", function() {
						tr.forEach(item => {
							item.classList.remove("focus");
						});
						const seqIndex = Number(this.getAttribute("data-index"));
						const seqOrderInfo = Number(this.getAttribute("data-sequence"));
						if(seqIndex == orderInfo.data.seqIndex) {
							orderInfo.data.object = undefined;
							orderInfo.data.seqIndex = undefined;
							section.classList.remove("focus");
							return;
						}
						section.classList.add("focus");
						this.classList.add("focus");
						orderInfo.open(this, seqOrderInfo, seqIndex);
					});
				}
			});


			if(!isUpdate) {
				const self = this;
				uiEvent(container, {
					change : {
						canceledYn : function() {self.update();},
						expiredYn : function() {self.update();},
						receivableYn : function() {self.update();}
					}
				});
			}
			uiTable(container);
			this.parent.setExcelExport(this.container, "????????????", "?????? ??? ?????? ????????????");
		},
		template : function(data) {
			const mode = this.parent.mode;
			const isHidden = (mode == "member") ? "hidden" : "";
			const tableLength = (mode == "member") ? "10" : "10";
			const isBranch = (partnerInfo.partner.branchUseYn == "Y") ? "" : "none";

			let tr = data.map((item, index) => {
				const paymentInfo = ((item.seqRefundInfo) ? item.refundPayment : item.orderPayment) || {};

				const orderInfo = item.orderInfo;
				const passList = (orderInfo.pricing && orderInfo.pricing[0] && orderInfo.pricing[0].passes) ? orderInfo.pricing[0].passes : [];

				const isRefunded = (item.seqRefundInfo);
				const isCanceled = (orderInfo.orderState == "CANCELLED");
				const isRePayment = (isRefunded && paymentInfo.refundPaymentType == "PAYMENT");
				const isTransfer = (orderInfo.orderType == "TRANSFER");

				// ????????????
				const getPaymentDateTime = () => {
					return componentMember.getDate(item.doDateTime);
				};

				// ????????????
				const seqOrderInfo = orderInfo.seqOrderInfo;

				// ????????????
				const getPricingName = () => {
					const getBeforePricingName = () => {
						if(orderType == "MERGE") {
							const mergeList = [];
							beforeOrderInfo.forEach(item => {
								(item.mergePasses || []).forEach(item => {
									mergeList.push(componentMember.getPassName(item.mergeOrderPass || {}));
								});
							});
							return mergeList.join(", ");
						} else {
							const pricingInfo = (orderType == "UPGRADE") ? beforeOrderInfo.upgradePricing : (orderType == "CROSS") ? beforeOrderInfo.pricing[0] : {};
							return (pricingInfo) ? pricingInfo.pricingName : "-";
						}
					};
					let nameList = [];
					const orderType = orderInfo.orderType;
					const pricingName = ((orderInfo.pricing && orderInfo.pricing[0]) ? orderInfo.pricing[0].pricingName : orderInfo.orderName) || "-";

					const beforeOrderInfo = (orderType == "UPGRADE") ? orderInfo.upgrade || {} : (orderType == "CROSS") ? orderInfo.cross || {} : (orderType == "MERGE") ? orderInfo.merge || [] : "";
					const beforePricingName = getBeforePricingName();

	//				if(isRefunded || paymentInfo.paymentKind == "REPAYMENT") nameList.push("?????? : ");
					nameList.push(pricingName);
					if(beforeOrderInfo) {
						const symbol = (orderType == "MERGE") ? "???" : "???";
						nameList.push(" (" + symbol + beforePricingName + ")" || "");
					}
					if(isTransfer) {
						const transferInfo = orderInfo.transfer || {};
						const fromMember = (transferInfo.member) ? transferInfo.member.name : "-";
						const toMember = (transferInfo.memberTransfer) ? transferInfo.memberTransfer.name : "-";
						nameList.push(` (${fromMember} ???? ${toMember})`);
					}
					const name = uiSafeValue(nameList.join(""));
//					return `<span title="${name}">${name}</span>`;
					return name;
				};

				// ???????????? : ?????? | ?????? ??? ????????? | ????????? | ?????? | ??????
				const getPaymentKind = () => {
					if(isCanceled) {
						return "??????";
					} else if(isRefunded) {
						return (isRePayment) ? "?????? ??? ?????????" : "??????";
					} else {
						switch(paymentInfo.paymentKind) {
							case "REPAYMENT" : return "?????? ??? ?????????";
							case "RECEIVABLES" : return "?????????";
						}
					}
					return "??????";
				};
				const getPaymentKindColor = () => {
					if(isCanceled) {
						return "red";
					} else if(isRefunded) {
						return "orange";
					} else {
						switch(paymentInfo.paymentKind) {
							case "REPAYMENT" : return "orange";
							case "RECEIVABLES" : return "red";
						}
					}
					return "green";
				};

				// ????????????
				const getPaymentType = () => {
					if(isRefunded && !isRePayment) return "-";
					const paymentInfo = item.orderPayment || {};
					const paymentType = uiParameter.payment.paymentType[paymentInfo.paymentType] || "??????";
					const paymentSummary = componentMember.getReceiptSummary(paymentInfo);
					return `<a class="underline" title="${paymentSummary}">${paymentType}</a>`;
				};

				// ????????????
				const getPaymentAmount = () => {
					if(isRefunded && !isRePayment) return "<td>-</td>";
					return `<td class="currency green won">${getComma(paymentInfo.paymentAmount)}</td>`;
				};

				// ????????????
				const getReceivableAmount = () => {
					if(isRefunded) return "<td>-</td>";
					const receivables = getComma(orderInfo.receivables);
					if(paymentInfo.paymentKind == "RECEIVABLES") {
						const paymentAmount = getComma(paymentInfo.paymentAmount * -1);

						return (paymentAmount) ? `
							<td class="currency red">
								${paymentAmount}???
								<div>(?????? : ${receivables}???)</div>
							</td>
						` : `
							<td class="currency red">
								<div>(?????? : ${receivables}???)</div>
							</td>
						`;
					} else {
						if(orderInfo.receivables) {
							return `
								<td class="currency red">
									<div>(?????? : ${receivables}???)</div>
								</td>
							`;
						}
						return "<td>-</td>";
					}
				};

				// ????????????
				const getRefundType = () => {
					const paymentType = paymentInfo.refundPaymentType;
					if(!isRefunded || isRePayment) return "<td>-</td>";
					const paymentTypeName = (paymentType == "REFUND") ? "?????? ??????" : (paymentType == "CANCEL") ? "?????? ??????" : (paymentType == "PAYMENT") ? "?????????" : "-";
					return `<td class="orange">${paymentTypeName}</td>`;
				};

				// ???????????????
				const getRefundAmount = () => {
					if(!isRefunded || isRePayment) return "<td>-</td>";
					const refundAmount = ((paymentInfo == "PAYMENT") ? paymentInfo.paymentAmount : paymentInfo.refundAmount) || 0;
					return `<td class="currency orange won">${getComma(refundAmount * -1)}</td>`;
				};

				// ?????? ?????????
				const getCoachName = () => {
					if(orderInfo.webAppDiv == "A") return `<span class="blue">??? ??????</span>`;
					let seqPartnerCoach = orderInfo.seqPartnerCoach || 0;
					if(isRefunded) {
						const refundInfo = orderInfo.refundInfo;
						if(refundInfo) seqPartnerCoach = refundInfo.seqPartnerCoach;
					}
					return componentMember.getCoachName(seqPartnerCoach);
				};

				// ??????
				const getMemo = () => {
					const memo = orderInfo.memo;
					if(!memo) return "-";
					return `<a class="underline" title="${uiSafeValue(memo)}">??????</a>`;
				};

				// ????????????
				const getOrderState = () => {
					const orderType = orderInfo.orderType;							// PASS | UPGRADE | CROSS |	TRANSFER || MERGE
					const orderState = orderInfo.orderState;						// COMPLETED || CANCELLED || REFUNDED || REFUNDED_PART
					const passState = componentMember.pass.getPassState(orderInfo);	// COMPLETED || UPGRADED || CROSSED || MERGED || TRANSFERRED
					const orderTypeName = uiParameter.order.type[orderType];
					const orderStateName = uiParameter.order.state[orderState];
					const passStateName = (passState == "UPGRADED") ? "???????????????" : (passState == "CROSSED") ? "??????" : (passState == "MERGED") ? "??????" : (passState == "MERGED_PART") ? "?????? ??????" : (passState == "REFUNDED") ? "??????" : (passState == "TRANSFERRED") ? "??????" : (passState == "EXTENSION") ? "(???)??????" : "";

					switch(orderState) {
						case "COMPLETED" :
							if(passState)
								return (passState == "COMPLETED") ? orderTypeName : passStateName + "??? ??????";
							return orderTypeName;
						case "CANCELLED" :
							return (orderType == "PASS") ? "??????" : orderTypeName + " " + orderStateName;
						case "REFUNDED" :
						case "REFUNDED_PART" :
							return (orderType == "PASS") ? "??????" : orderTypeName + "??? ??????";
							return "";
					}
				};

				const getClassName = () => {
					const className = [];
					if(isRefunded || paymentInfo.paymentKind == "REPAYMENT")
						className.push("reduce");
					if(isCanceled)
						className.push("cancel");
					return className.join(" ");
				}

				const orderStateName = getOrderState();

				return `
					<tr class="${getClassName()}" data-index="${index + 1}" data-state="${orderStateName}" data-sequence="${orderInfo.seqOrderInfo}">
						<td class="branchDisplay ${isBranch}">${componentMember.getBranchName(paymentInfo)}</td>	<!-- ????????? -->
						<td>${getPaymentDateTime()}</td>															<!-- ???????????? -->
						<td class="${isHidden}">${componentMember.getMemberInfo(orderInfo, "name")}</td>		<!-- ????????? -->
						<td class="${isHidden}">${componentMember.getMemberInfo(orderInfo, "mobile")}</td>	<!-- ????????? -->
						<td>${seqOrderInfo}</td>															<!-- ???????????? -->
						<td class="name">${getPricingName()}</td>											<!-- ???????????? -->
						<td>${orderStateName}</td>															<!-- ???????????? -->
						<td class="currency won">${getComma(orderInfo.salePrice)}</td>						<!-- ????????? -->
						<td class="${getPaymentKindColor()}">${getPaymentKind()}</td>						<!-- ???????????? -->
						<td>${getPaymentType()}</td>														<!-- ???????????? -->

						${getPaymentAmount()}																<!-- ???????????? -->
						${getReceivableAmount()}															<!-- ???????????? -->
						${getRefundType()}																	<!-- ???????????? -->
						${getRefundAmount()}																<!-- ??????????????? -->
						<td>${getCoachName()}</td>															<!-- ??????????????? -->

						<td data-id="memo">${getMemo()}</td>												<!-- ?????? -->
						<td class="currency point">${getComma(orderInfo.rewardPoint)}</td>					<!-- ????????? ?????? -->
					</tr>
				`;
			});
			const tableType = (tr.length == 0) ? "ui-table" : "ui-data-table";
			tr = (tr.length == 0) ? `<td class="empty" colspan="17">?????? ????????? ????????????.</td>` : tr.join("");
			return `
				<table class="${tableType} dark border combineList" data-table-export="true" data-table-ordering="true" data-table-length="${tableLength}" data-table-dom="fltp">
					<thead>
						<tr>
							<td class="branchDisplay">?????????</td><td>????????????</td><td class="${isHidden}">?????????</td><td class="${isHidden}">?????????</td><td>????????????</td><td>????????????</td><td>????????????</td><td>?????????</td>
							<td>????????????</td><td>????????????</td><td>????????????</td><td>????????????</td><td>????????????</td><td>???????????????</td><td>???????????????</td>
							<td>??????</td><td>????????? ??????</td>
						</tr>
					</thead>
					<tbody>
						${tr}
					</tbody>
				</table>
			`;
		},
	},

	/* ******** ?????? ??? ?????? ?????? ?????? ?????? ******** */
	orderInfo : {
		container : undefined,
		data : {},
		permission : {},
		open : function(object, seqOrderInfo, seqIndex) {
			if(!seqOrderInfo) return;
			try {
				const orderInfo = this.data.orderInfoList[seqOrderInfo];
				if(!orderInfo) return;

				this.data.object = object;
				this.data.seqIndex = seqIndex;
				this.data.orderInfo = orderInfo;
				this.data.seqOrderInfo = seqOrderInfo;
				this.render();
			} catch(error) {
				console.log(error);
			}
		},
		close : function() {
			const object = this.data.object;
			if(object)
				object.classList.remove("focus");
			this.data.object = this.data.seqIndex = this.data.orderInfo = this.data.seqOrderInfo = undefined;
		},
		render : function() {
			const setHeight = () => {
				const orderBox = document.querySelector("[data-id='orderBox']");
				const orderList = orderBox.querySelector(".orderList");
				const orderInfo = orderBox.querySelector(".orderInfo");
				orderInfo.style.height = orderList.offsetHeight + "px";
			};
			setHeight();
			this.container = document.querySelector("[data-id='orderInfo']");
			this.container.innerHTML = this.template();
			this.container.scrollTop = 0;
			const self = this.event.self = this;
			uiEvent(this.container, {
				click : {
					upgrade : function() {self.parent.orderList.event.upgrade(this);},
					cross : function() {self.parent.orderList.event.cross(this);},
					transfer : function() {self.parent.orderList.event.transfer(this);},
					refund : function() {self.parent.orderList.event.refund(this);},
					receivables : function() {self.parent.orderList.event.receivables(this);},
					orderCancel : function() {self.parent.orderList.event.cancel(this);},
					detail : function() {self.parent.orderList.event.detail(this);},
					refundModify : function() {self.parent.refundList.event.refundModify(this);},
					refundCancel : function() {self.parent.refundList.event.refundCancel(this);}
				},
				change : {
					memo : function() {
						self.event.updateMemo();
					}
				}
			});
			uiTip(this.container);
		},
		event : {
			updateMemo : function() {
				const form = this.self.container;
				const textarea = form.querySelector("[name='memo']");
				const span = textarea.parentNode.querySelector("span");

				const orderInfo = this.self.data.orderInfo;
				const seqMember = orderInfo.seqMember;
				const seqOrderInfo = orderInfo.seqOrderInfo;
				const memo = textarea.value;

				const data = {
					seqPartnerCoach : orderInfo.seqPartnerCoach,
					orderClassification : orderInfo.orderClassification,
					orderDate : orderInfo.orderDate,
					memo : memo,
				};
				orderController.orderInfo.update(seqMember, seqOrderInfo, data).then(data => {
					span.innerHTML = new Date().format("yyyy-mm-dd hh:MM");
					span.parentNode.className = "focus";
					textarea.disabled = false;
					orderInfo.memo = memo;
					const tr = this.self.data.object;
					if(tr) {
						const td = tr.querySelector("[data-id='memo']");
						if(td) {
							td.innerHTML = (memo) ? `<a class="underline" title="${uiSafeValue(memo)}">??????</a>` : `-`;
						}
					}
					clearTimeout(this.self.timer);
					this.self.timer = setTimeout(function() {
						span.parentNode.className = "";
					}, 2500);
				}).catch(error => {
					uiError(error);
				});
			}
		},
		template : function() {
			const item = this.data.orderInfo;

			const orderType = item.orderType.toLowerCase();
			const isRefunded = (item.orderState == "REFUNDED" || item.orderState == "REFUNDED_PART");
			const isCanceled = (item.orderState == "CANCELLED");
			const isBpay = (item.webAppDiv == "A");

			const getPassInfo = () => {
				const passList = componentMember.pass.getPassList(item);
				let tr = passList.map(item => {
					const passName = componentMember.getPassName(item);
					const useStartDate = uiDate(item.useStartDate);
					const useEndDate = uiDate(item.useEndDate);
					const useNumber = componentMember.getUseNumber(item);
					return `
						<tr>
							<td>${passName}</td>
							<td>${useStartDate}<br>~ ${useEndDate}</td>
							<td>${useNumber}</td>
						</tr>
					`;
				});
				const emptyMessage = (orderType == "transfer") ? "?????? ?????? ???????????????." : "????????? ????????? ????????????.";
				tr = (tr.length == 0) ? `<tr><td class="empty" colspan="3">${emptyMessage}</td></tr>` : tr.join("");
				return `
					<table class="ui-table fixed">
						<colgroup><col width="35%"><col width="40%"><col></colgroup>
						<thead>
							<tr><td>?????????</td><td>????????????</td><td>????????????</td></tr>
						</thead>
						<tbody>
							${tr}
						</tbody>
					</table>
				`;
			};

			const getPaymentInfo = () => {
				const orderType = item.orderType;
				const orderTypeName = uiParameter.order.type[orderType];
				const paymentName = (orderType == "PASS") ? "?????????" : orderTypeName + " ?????????";

				const getBeforePrice = () => {
					if(!(orderType == "UPGRADE" || orderType == "CROSS" || orderType == "MERGE")) return "";
					const beforePrice = item.price - ((orderType == "UPGRADE") ? item.upgradePrice : (orderType == "CROSS") ? item.crossPrice : (orderType == "MERGE") ? item.mergePrice : 0) || 0;
					const labelName = (orderType == "UPGRADE" || orderType == "MERGE") ? "??????" : "??????";
					return `<tr><th>?????? ????????? ${labelName}</th><td>${getComma(beforePrice)}???</td></tr>`;
				};

				return `
					<table class="ui-table fixed">
						<tr class="blue"><th>${paymentName}</th><td>${getComma(item.salePrice)}???</td></tr>
						<tr><th>??????</th><td>${getComma(item.price)}???</td></tr>
						${getBeforePrice()}
						<tr><th>??????</th><td>${getComma(item.discountAmount || 0)}???</td></tr>
						<tr><th>???????????? ??????</th><td>${getComma(item.usePoint || 0)}???</td></tr>
					</table>
				`;
			};
			const getRefundInfo = () => {
				if(!isRefunded) return "";
				return `
					<li>
						<h4 class="ui-sub-title">????????????</h4>
						<table class="ui-table fixed">
							<tr class="orange"><th>?????? ?????????</th><td>${getComma(item.refundAmount)}???</td></tr>
						</table>
					</li>
				`;
			};
			const getButtonInfo = () => {
				const orderInfo = item;
				const refundInfo = orderInfo.refundInfo;

				return (isRefunded) ? `
					<dl>
						<dd>${componentMember.getRefundButton(refundInfo, "?????? ??????", "refundModify", "updateRefund")}</dd>
						<dd>${componentMember.getRefundButton(refundInfo, "?????? ??????", "refundCancel", "updateRefund")}</dd>
						<dd></dd>
					</dl>
				` :	`
					<dl>
						<dd>${componentMember.getOrderButton(orderInfo, "???????????????", "upgrade", "permissionPayment", "upgradePayment")}</dd>
						<dd>${componentMember.getOrderButton(orderInfo, "??????", "cross", "permissionPayment", "exchangePassInfo")}</dd>
						<dd>${componentMember.getOrderButton(orderInfo, "??????", "transfer", "permissionMember", "transferUsage")}</dd>
					</dl>
					<dl>
						<dd>${componentMember.getOrderButton(orderInfo, "??????", "refund", "permissionPayment", "refund")}</dd>
						<dd>${componentMember.getOrderButton(orderInfo, "????????? ??????", "receivables", "permissionPayment", "receivables")}</dd>
						<dd>${componentMember.getOrderButton(orderInfo, "??????", "orderCancel", "permissionPayment", "deletePayment")}</dd>
					</dl>
				`;
			};
			const getNote = () => {
				if(isRefunded)
					return `<li><p class="ui-note red">????????? ?????????????????????. ???????????? ????????? ????????? ?????? ????????? ????????? ??? ????????????.</p></li>`;
				if(isCanceled)
					return `<li><p class="ui-note red">????????? ?????????????????????.</p></li>`;
				if(isBpay)
					return `<li><p class="ui-note red">????????? ????????? ???????????????.</p></li>`;
				return "";
			};
			const getOrderState = () => {
				return this.data.object.getAttribute("data-state") || "-";
			};
			const getButton = () => {
				return (isBpay) ? `` : `
					<button class="ui-button green" data-type="${orderType}" data-seq-member="${item.seqMember}" data-seq-order="${item.seqOrderInfo}" data-event="detail">???????????? ??? ??????</button>
				`;
			};
			return `
				<ul>
					${getNote()}
					<li>
						<h4 class="ui-sub-title">????????????</h4>
						<p class="ui-note">${getOrderState()}</p>
					</li>
					<li class="buttonInfo">
						<h4 class="ui-sub-title">????????? ??? ??????</h4>
						<div>
							${getButtonInfo()}
						</div>
					</li>
					<li class="memo">
						<h4 class="ui-sub-title">?????? ??????</h4>
						<textarea class="ui-textarea" name="memo" data-event="memo">${item.memo}</textarea>
						<p>???????????? : <span data-msg="memo"></span></p>
					</li>
					<li class="passInfo">
						<h4 class="ui-sub-title">?????? ????????? ??????</h4>
						${getPassInfo()}
					</li>
					<li>
						<h4 class="ui-sub-title">???????????? ??????</h4>
						${getPaymentInfo()}
					</li>
					<li>
						<h4 class="ui-sub-title">????????????</h4>
						<table class="ui-table fixed">
							<tr class="green"><th>?????? ??????</th><td>${getComma(item.paymentAmount)}???</td></tr>
							<tr class="red"><th>????????? ??????</th><td>${getComma(item.receivables)}???</td></tr>
						</table>
					</li>
					${getRefundInfo()}
					<li class="submit">
						${getButton()}
					</li>
				</ul>
			`;
		}
	},

	/* ******** ????????? ??? ???????????? ******** */
	refundList : {
		mode : "",
		data : {},
		permission : {},
		open : function(context) {
			try {
				this.mode = context.mode;
				this.data = context.data;
				this.permission = context.permission;
				if(!this.data.refundList) {
					Promise.all([
						(this.mode == "member") ?
							orderController.refundInfoList(seqMember) :
							reportController.sales.refundList(this.data.search.data)
					]).then(([refundList]) => {
						refundList.forEach(item => {
							const orderInfo = item.orderInfo;
							if(orderInfo) {
								orderInfo.pricing = [{passes : orderInfo.passInfos}];
								componentMember.setPassList([orderInfo]);
								const passList = componentMember.pass.getPassList(orderInfo);
								if(!item.passInfoList)
									item.passInfoList = orderInfo.passInfos || [];

								item.passInfoList.forEach(item => {
									const seqOrderPass = item.seqOrderPass;
									const data = passList.filter(item => {
										return (item.seqOrderPass == seqOrderPass);
									})[0];
									item.passStateName = (data) ? data.passStateName : "-";
								});
							} else {
								item.passStateName = "-";
							}
						});
						refundList = refundList.sort(function(a, b) {
							const dateA = new Date(a.refundDate).getTime();
							const dateB = new Date(b.refundDate).getTime();
							const sequence = (a.seqRefundInfo == b.seqRefundInfo) ? 0 : (a.seqRefundInfo < b.seqRefundInfo) ? 1 : -1;
							return (dateA == dateB) ? sequence : (dateA < dateB) ? 1 : -1;
						});
						this.data.refundList = refundList;
						this.render();
					}).catch(error => {
						console.log(error);
						alert("????????? ??? ??????????????? ??????????????? ?????????????????????.");
					});
				} else {
					this.render();
				}
			} catch(error) {
				console.log(error);
				alert("????????? ??? ??????????????? ??????????????? ?????????????????????.");
			}
		},
		filter : function(data) {
			const isCanceled = (this.container.querySelector("[data-event='canceledYn']:checked"));
			return data.filter(item => {
				if(isCanceled)
					if(item.refundStatus == "CANCELLED") return false;
				return true;
			});
		},
		update : function() {
			this.render(true);
		},
		render : function(isUpdate) {
			const div = document.querySelector("[data-event='refundList']");
			this.container = div.parentNode.parentNode;
			div.innerHTML = this.template();

			const self = this;
			uiEvent(div, {
				click : {
					refundModify : function() {
						self.event.refundModify(this);
					},
					refundCancel : function() {
						self.event.refundCancel(this);
					}
				}
			});
			if(!isUpdate) {
				uiEvent(this.container, {
					change : {
						canceledYn : function() {self.update();},
						receivableYn : function() {self.update();}
					}
				});
				this.parent.setExcelExport(this.container, "????????????", "????????? ??? ????????????");
			}
			uiTip(div);
			uiTable(div);
		},
		event : {
			refundModify : function(object) {
				const seqMember = object.getAttribute("data-seq-member");
				const seqOrderInfo = object.getAttribute("data-seq-order");
				const seqRefundInfo = object.getAttribute("data-seq-refund");
				window.location.href = `/member/${seqMember}/order/${seqOrderInfo}/refund/${seqRefundInfo}/payment`;
			},
			refundCancel : function(object) {
				const seqMember = object.getAttribute("data-seq-member");
				const seqOrderInfo = object.getAttribute("data-seq-order");
				const seqRefundInfo = object.getAttribute("data-seq-refund");
				if(confirm(`????????? ?????????????????????????`)) {
					orderController.refundCancel(seqMember, seqOrderInfo, seqRefundInfo).then(data => {
						alert("?????????????????????.");
						window.location.reload(true);
					}).catch(error => {
						uiError(error);
					});
				}
			}
		},
		template : function() {
			const permission = this.permission.permissionPayment || {};
			const mode = this.parent.mode;
			const isHidden = (mode == "member") ? "hidden" : "";
			const tableLength = (mode == "member") ? "10" : "10";

			// ?????? ??????
			const setBeforePaymentList = (item) => {
				const orderInfo = item.orderInfo || {};
				const beforeOrderInfo = (orderInfo.parentOrderInfos) ? orderInfo.parentOrderInfos[0] || {} : {};
				const beforePaymentList = beforeOrderInfo.payments || [];
				const paymentList = orderInfo.payments || [];
				orderInfo.payments = [].concat(paymentList, beforePaymentList);
			};

			const getRefundList = (item) => {
				const  refundPaymentList = item.refundPayments || [];
				const tr = refundPaymentList.filter(item => {
					return (item.refundPaymentType != "PAYMENT");
				}).reverse().map(item => {
					const date = uiDate(item.regDt, "time");
					let type = item.refundPaymentType;
					const amount = (type == "PAYMENT") ? item.paymentAmount : item.refundAmount;
					type = (type == "REFUND") ? "?????? ??????" : (type == "CANCEL") ? "?????? ??????" : (type == "PAYMENT") ? "?????????" : "-";
					return `
						<tr>
							<td>${date}</td>
							<td>${type}</td>
							<td>${getComma(amount)}???</td>
						</tr>
					`;
				});
				return (tr.length == 0) ? `<tr><td colspan="3">?????? ????????? ????????????.</td></tr>` : tr.join("");
			};

			let tr = this.filter(this.data.refundList).map(item => {
				setBeforePaymentList(item);

				const orderInfo = item.orderInfo;
				const refundDate = uiDate(item.refundDate);
				const refundDateTime = uiDate((item.refundDatetime || item.refundCompletedDatetime), "time");
				const coachName = componentMember.getCoachName(item.seqPartnerCoach);
				const orderType = componentMember.getOrderType(orderInfo, true);

				const refundList = item.refundPasses || [];

				const isCanceled = (item.refundStatus == "CANCELLED");
				const isExpired = componentMember.pass.isExpired(orderInfo);

				const className = [];
				if(isExpired) className.push("expired");
				if(isCanceled) className.push("canceled");

				let refundType = (orderInfo.orderType == "PASS") ? "??????" : orderType + " ??????";
				if(isCanceled) refundType += " ??????";

				const memo = uiSafeValue(item.memo);

				return `
					<tr class="${className.join(" ")}">
						<td class="branchDisplay">${componentMember.getBranchName(item)}</td>
						<td>${item.seqRefundInfo || "-"}</td>																				<!-- ???????????? -->
						<td>${refundDate}</td>																								<!-- ????????? -->
						<td class="${isHidden}">${componentMember.getMemberInfo(item, "name")}</td>									<!-- ???????????? -->
						<td class="${isHidden}">${componentMember.getMemberInfo(item, "mobile")}</td>									<!-- ????????? -->
						<td>${item.seqOrderInfo || "-"}</td>																				<!-- ???????????? -->
						<td>${refundType}</td>																								<!-- ???????????? -->
						<td class="multiple">${componentMember.getPassList(item, "passState")}</td>									<!-- ????????? ?????? -->
						<td class="name multiple">${componentMember.getPassList(item, "name")}</td>									<!-- ????????? ?????? -->

						<td class="currency multiple">${componentMember.getPassList(item, "salePrice", true)}</td>		<!-- ?????? ????????? -->
						<td class="currency multiple">${componentMember.getPassList(item, "paymentAmount", true)}</td>	<!-- ?????? ???????????? -->
						<td class="currency multiple">${componentMember.getPassList(item, "refundAmount")}</td>						<!-- ???????????? -->
						<td class="currency multiple">${componentMember.getPassList(item, "finalRefundPrice")}</td>					<!-- ?????????????????? -->

						<td class="currency">${getComma(item.refundPenalty)}???</td>															<!-- ????????? -->
						<td class="currency">${getComma(item.refundPayment)}???</td>															<!-- ?????? ????????? -->

						<td>${coachName}</td>																								<!-- ?????? ????????? -->
						<td class="memo" title="${memo}">${memo}</td>																		<!-- ???????????? -->
						<td>${refundDateTime}</td>																							<!-- ?????????????????? -->
					</tr>
					<tr>
						<td colspan="20">
							<div class="box">
								<h5 class="ui-sub-title">?????? ??????</h5>
								<div class="function">
									${componentMember.getRefundButton(item, "?????? ??????", "refundModify", "updateRefund")}
									${componentMember.getRefundButton(item, "?????? ??????", "refundCancel", "updateRefund")}
								</div>
								<h5 class="ui-sub-title">?????? ??????</h5>
								<table class="ui-table point fixed">
									<thead>
										<tr><td>????????????</td><td>????????????</td><td>????????????</td></tr>
									</thead>
									<tbody>
										${getRefundList(item)}
									</tbody>
								</table>
								<h5 class="ui-sub-title">?????? ??????</h5>
								${componentMember.getPaymentSummaryList(item.orderInfo)}
							</div>
						</td>
					</tr>
				`;
			});

			const tableType = (tr.length == 0) ? "ui-table" : "ui-data-table";
			tr = (tr.length == 0) ? `<tr><td class="empty" colspan="20">?????? ????????? ????????????.</td></tr>` : tr.join("");

			return `
				<table class="${tableType} dark drop" data-table-export="true" data-table-length="${tableLength}" data-table-dom="fltp">
					<thead>
						<tr><td class="branchDisplay">?????????</td><td>????????????</td><td>?????????</td><td class="${isHidden}">????????????</td><td class="${isHidden}">?????????</td><td>????????????</td><td>????????????</td><td>????????? ??????</td><td>????????? ??????</td><td>?????? ?????????</td><td>?????? ????????????</td><td>????????????</td><td>??????????????????</td><td>?????????</td><td>?????? ?????????</td><td>??????<br>?????????</td><td>????????????</td><td>??????????????????</td></tr>
					</thead>
					<tbody>
						${tr}
					</tbody>
				</table>
			`;
		}
	},

	/* ******** ????????? ??? ???????????? ******** */
	orderList : {
		mode : "",
		data : {},
		permission : {},
		open : function(context) {
			try {
				this.mode = context.mode;
				this.data = context.data;
				this.permission = context.permission;
				if(!this.data.orderList) {
					Promise.all([
						(this.mode == "member") ?
							orderController.orderInfo.list(seqMember) :
							reportController.sales.orderList(this.data.search.data)
					]).then(([orderList]) => {
						orderList = orderList.sort(function(a, b) {
							const dateA = new Date(a.orderDate).getTime();
							const dateB = new Date(b.orderDate).getTime();
							const sequence = (a.seqOrderInfo == b.seqOrderInfo) ? 0 : (a.seqOrderInfo < b.seqOrderInfo) ? 1 : -1;
							return (dateA == dateB) ? sequence : (dateA < dateB) ? 1 : -1;
						});
						orderList.forEach(item => {
							const paymentList = item.payments || [];
							item.payments = paymentList.sort(function(a, b) {
								const dateA = new Date(a.paymentDate).getTime();
								const dateB = new Date(b.paymentDate).getTime();
								return (dateA == dateB) ? 0 : (dateA < dateB) ? 1 : -1;
							});
						});
						componentMember.setPassList(orderList);
						this.data.orderList = orderList;
						this.render();
					}).catch(error => {
						console.log(error);
						alert("????????? ??? ??????????????? ??????????????? ?????????????????????.");
					});
				} else {
					this.render();
				}
			} catch(error) {
				console.log(error);
				alert("????????? ??? ??????????????? ??????????????? ?????????????????????.");
			}
		},
		update : function() {
			this.render(true);
		},
		filter : function(container, data) {
			const isCanceled = (container.querySelector("[data-event='canceledYn']:checked"));
			const isExpired = (container.querySelector("[data-event='expiredYn']:checked"));
			const isReceivable = (container.querySelector("[data-event='receivableYn']:checked"));

			return data.filter(item => {
				const passStatus = (item.passInfos && item.passInfos[0]) ? item.passInfos[0].status : "";
				if(isReceivable)
					return (item.receivables) ? true : false;
				if(isCanceled) {
					if(item.orderState == "CANCELLED") return false;
				}
				if(isExpired) {
					if(passStatus != "AVAILABLE" && passStatus != "PAUSE") return false;
				}
				return true;
			});
		},
		render : function(isUpdate) {
			const div = document.querySelector("[data-event='orderList']");
			const container = this.container = div.parentNode.parentNode;
			const data = this.filter(this.container, this.data.orderList);
			div.innerHTML = this.template(data);
			uiTip(container);

			const self = this.event.self = this;
			uiEvent(container, {
				click : {
					upgrade : function() {self.event.upgrade(this);},
					cross : function() {self.event.cross(this);},
					transfer : function() {self.event.transfer(this);},
					refund : function() {self.event.refund(this);},
					receivables : function() {self.event.receivables(this);},
					orderCancel : function() {self.event.cancel(this);},
					detail : function() {self.event.detail(this);}
				}
			});
			if(!isUpdate) {
				uiEvent(container, {
					change : {
						canceledYn : function() {self.update();},
						expiredYn : function() {self.update();},
						receivableYn : function() {self.update();}
					}
				});
				this.parent.setExcelExport(container, "????????????", "????????? ??? ????????????");
			}
			uiTable(container);
			uiTip(container);
		},
		event : {
			upgrade : function(object) {
				const seqMember = Number(object.getAttribute("data-seq-member"));
				const seqOrderInfo = Number(object.getAttribute("data-seq-order"));
				this.getPassInfo(seqMember, seqOrderInfo, function(data) {
					const seqPassInfo = data.seqPassInfo;
					const serviceType = data.serviceType.toLowerCase();
					const serviceCategory = (data.seqPackage) ? "package" : "normal";
					window.location.href = "/member/" + seqMember + "/sell/pass/?orderType=upgrade&seqPassInfo=" + seqPassInfo + "&serviceCategory=" + serviceCategory;
				});
			},
			cross : function(object) {
				const seqMember = Number(object.getAttribute("data-seq-member"));
				const seqOrderInfo = Number(object.getAttribute("data-seq-order"));
				this.getPassInfo(seqMember, seqOrderInfo, (passInfo, passList) => {
					const seqPassInfo = passList.map(item => {
						if(item.serviceKind != "P") isPeriod = false;
						return "seqPassInfo=" + item.seqPassInfo;
					}).join("&");
					window.location.href = "/member/" + seqMember + "/sell/pass?orderType=cross&crossType=normal&" + seqPassInfo;
					/*
					popupMemberPass.confirmReserveSchedule.open("cross", passList, 0, 0, () => {
						let isPeriod = true;
						const serviceCategory = (passInfo.seqPackage) ? "package" : "normal";

						// ????????? ????????? ?????? ?????? ??? if(isPeriod && !serviceCategory)
						const changeLocation = (crossType) => {
							window.location.href = "/member/" + seqMember + "/sell/pass?orderType=cross&crossType=" + crossType + "&" + seqPassInfo;
						};
						if(isPeriod && serviceCategory != "package") {
							componentOrderHistory.popupCross.open(seqMember, seqPassInfo, function(crossType) {
								changeLocation(crossType);
							});
						} else {
							changeLocation("normal");
						}
					});
					*/
				});
			},
			transfer : function(object) {
				const seqMember = Number(object.getAttribute("data-seq-member"));
				const seqOrderInfo = Number(object.getAttribute("data-seq-order"));
				this.getPassInfo(seqMember, seqOrderInfo, (passInfo, passList) => {
					popupMemberPass.confirmReserveSchedule.open("transfer", passList, 0, 0, () => {
						sessionStorage.removeItem("searchInfo");
						window.location.href = "/member/" + seqMember + "/orderInfo/" + seqOrderInfo + "/transfer";
					});
				});
			},
			refund : function(object) {
				const seqMember = Number(object.getAttribute("data-seq-member"));
				const seqOrderInfo = Number(object.getAttribute("data-seq-order"));
				this.getPassInfo(seqMember, seqOrderInfo, (passInfo, passList) => {
					const fromDate = new Date().format("yyyy-mm-dd");
					popupMemberPass.confirmReserveSchedule.open("refund", passList, fromDate, 0, () => {
						window.location.href = `/member/${seqMember}/order/${seqOrderInfo}/refund`;
					});
				});
			},
			receivables : function(object) {
				const seqMember = Number(object.getAttribute("data-seq-member"));
				const seqOrderInfo = Number(object.getAttribute("data-seq-order"));
				const orderType = object.getAttribute("data-type");
				uiHistory.store();
				window.location.href = `/member/${seqMember}/order/${seqOrderInfo}/receivable?orderType=${orderType}`;
			},
			cancel : function(object) {
				const orderType = object.getAttribute("data-type");
				const orderState = object.getAttribute("data-state");
				let orderTypeName = uiParameter.history[orderType.toUpperCase()];
				if(orderState == "REFUNDED" || orderState == "REFUNDED_PART") orderTypeName = "??????";
				if(orderTypeName == "??????") orderTypeName = "??????";

				const seqMember = Number(object.getAttribute("data-seq-member"));
				const seqOrderInfo = Number(object.getAttribute("data-seq-order"));
				if(confirm(`????????? ${orderTypeName}??? ?????????????????????????`)) {
					orderController.cancel(seqMember, seqOrderInfo).then(data => {
						alert("?????????????????????.");
						window.location.reload(true);
					}).catch(error => {
						uiError(error);
					});
				}
			},
			detail : function(object) {
				const orderType = object.getAttribute("data-type");
				const seqMember = Number(object.getAttribute("data-seq-member"));
				const seqOrderInfo = Number(object.getAttribute("data-seq-order"));
				window.location.href = `/member/${seqMember}/orderInfo/${seqOrderInfo}?orderType=${orderType}`;
			},
			getPassInfo : function(seqMember, seqOrderInfo, callback) {
				orderController.orderPassInfo(seqMember, seqOrderInfo).then(data => {
					if(!data[0]) {
						console.error("????????? ???????????? ????????????.");
						alert("????????? ????????? ????????? ??? ????????????.");
						return;
					} else {
						callback(data[0], data);
					}
				}).catch(error => {
					uiError(error);
				});
			},
			getPassInfoList : function(seqMember, seqOrderInfo, callback) {
				this.getPassInfo(seqMember, seqOrderInfo, (passInfo, passList) => {
					const seqPassInfoList = passList.map(item => {
						return item.seqPassInfo;
					});
					callback(seqPassInfoList);
				});
			}
		},
		template : function(data) {
			const permission = this.permission || {};
			const mode = this.parent.mode;
			const isHidden = (mode == "member") ? "hidden" : "";
			const tableLength = (mode == "member") ? "10" : "10";

			const getOrder = (item) => {
				const orderDate = componentMember.getDate(item.orderDate, true);
				const orderDateTime = componentMember.getDate(item.orderDatetime || item.orderCompletedDatetime);
				const orderName = item.orderName || "-";
				const coachName = (item.webAppDiv == "A") ? `<span class="blue">??? ??????</span>` : componentMember.getCoachName(item.seqPartnerCoach);
				const colorRed = (item.receivables == 0) ? "" : "red";
				const orderType = item.orderType.toLowerCase();

				const passState = componentMember.pass.getPassState(item);
				const passStatus = componentMember.pass.getPassStatus(item);

				const orderState = componentMember.getOrderState(item);
				const orderStateColor = ""; // componentMember.getOrderStateColor(item)

				const className = [];
				if(item.orderState == "CANCELLED") className.push("canceled");
				if(passStatus != "AVAILABLE" && passStatus != "PAUSE")
					className.push("expired");

				const isCanceled = (item.orderState == "CANCELLED");
				const isRefunded =  (item.orderState == "REFUNDED" || item.orderState == "REFUNDED_PART");

				const getDetail = () => {
					const isBpay = (item.webAppDiv == "A");
					const isDisabled = (item.webAppDiv == "A") ? "disabled" : "";
					const getNote = () => {
						if(isRefunded)
							return `<p class="ui-note red">????????? ?????????????????????. ???????????? ????????? ????????? ?????? ????????? ????????? ??? ????????????.</p>`
						if(isCanceled)
							return `<p class="ui-note red">????????? ?????????????????????.</p>`
						if(isBpay)
							return `<p class="ui-note red">????????? ????????? ???????????????.</p>`;
						return "";
					};
					const getButton = () => {
						return (isBpay) ? `` : `
							<button class="ui-button" data-type="${orderType}" data-seq-member="${item.seqMember}"
								data-seq-order="${item.seqOrderInfo}" data-event="detail" ${isDisabled}>???????????? ???
							??????</button>
						`;
					};
					return `
						<tr class="detail" data-sub-sequence="${item.seqOrderInfo}">
							<td colspan="20">
								<div class="box">
									<div class="top">
										${getNote()}
										<h5 class="ui-sub-title">?????? ??????</h5>
										<div class="function">
											${componentMember.getOrderButton(item, "???????????????", "upgrade", "permissionPayment", "upgradePayment")}
											${componentMember.getOrderButton(item, "??????", "cross", "permissionPayment", "exchangePassInfo")}
											${componentMember.getOrderButton(item, "??????", "transfer", "permissionMember", "transferUsage")}
											${componentMember.getOrderButton(item, "??????", "refund", "permissionPayment", "refund")}
											${componentMember.getOrderButton(item, "????????? ??????", "receivables", "permissionPayment", "receivables")}
											${componentMember.getOrderButton(item, "??????", "orderCancel", "permissionPayment", "deletePayment")}
										<h5 class="ui-sub-title">?????? ??????</h5>
										${componentMember.getPaymentSummaryList(item, true)}
									</div>
									<div class="bottom">
										<button class="ui-button gray" data-event="cancel">??????</button>
										${getButton()}
									</div>
								</div>
							</td>
						</tr>
					`;
				};

				const memo = uiSafeValue(item.memo);
				return `
					<tr class="${className.join(" ")}" data-main-sequence="${item.seqOrderInfo}">
						<td class="branchDisplay">${componentMember.getBranchName(item)}</td>
						<td>${item.seqOrderInfo || "-"}</td>
						<td>${orderDate}</td>
						<td class="${isHidden}">${componentMember.getMemberInfo(item, "name")}</td>
						<td class="${isHidden}">${componentMember.getMemberInfo(item, "mobile")}</td>
						<td>${componentMember.getOrderType(item)}</td>
						<td class="${orderStateColor}">${orderState}</td>
						<td class="multiple">${componentMember.getPassList(item, "passState")}</td>
						<td class="name multiple">${componentMember.getPassList(item, "name")}</td>
						<td class="currency multiple">${componentMember.getPassList(item, "price")}</td>
						<td class="currency multiple">${componentMember.getPassList(item, "discountAmount")}</td>
						<td class="currency multiple">${componentMember.getPassList(item, "beforeDiscount")}</td>
						<td class="currency multiple">${componentMember.getPassList(item, "salePrice")}</td>
						<td class="currency multiple green">${componentMember.getPassList(item, "paymentAmount")}</td>
						<td class="currency multiple">${componentMember.getPassList(item, "receivables")}</td>
						<td>${coachName}</td>
						<td class="memo" title="${memo}">${item.memo}</td>
						<td>${orderDateTime}</td>
					</tr>
					${getDetail()}
				`;
			};
			let tr = data.map(item => {
				return getOrder(item);
			});

			const tableType = (tr.length == 0) ? "ui-table" : "ui-data-table";
			tr = (tr.length == 0) ? `<td class="empty" colspan="20">?????? ????????? ????????????.</td>` : tr.join("");

			return `
				<table class="${tableType} drop dark" data-table-export="true" data-table-length="${tableLength}" data-table-dom="fltp">
					<thead>
						<tr>
							<td class="branchDisplay">?????????</td><td>????????????</td><td>?????????</td><td class="${isHidden}">????????????</td><td class="${isHidden}">?????????</td><td>????????????</td><td>????????????</td><td>????????? ??????</td><td>????????? ??????</td>
							<td>??????</td><td>??????</td><td>?????? ?????????</td><td>?????????</td><td>????????????</td><td>?????????</td>
							<td>????????????</td><td>????????????</td><td>??????????????????</td>
						</tr>
					</thead>
					<tbody>
						${tr}
					</tbody>
				</table>
			`;
		},
	},

	/* ******** ???????????? ******** */
	paymentList : {
		container : undefined,
		mode : "",
		data : {},
		permission : {},
		open : function(context) {
			try {
				this.mode = context.mode;
				this.data = context.data;
				this.permission = context.permission;
				if(!this.data.paymentList) {
					Promise.all([
						(this.mode == "member") ?
							orderController.paymentInfoList(seqMember) :
							reportController.sales.paymentList(this.data.search.data)
					]).then(([data]) => {
						const refundInfoList = data.refundInfos || {};
						const orderInfoList = data.orderInfos || {};
						let paymentList = data.payments || [];

						paymentList = paymentList.sort(function(a, b) {
							const dateA = new Date(a.paymentDate).getTime();
							const dateB = new Date(b.paymentDate).getTime();
							const sequence = (a.seqOrderPayment == b.seqOrderPayment) ? 0 : (a.seqOrderPayment < b.seqOrderPayment) ? 1 : -1;
							return (dateA == dateB) ? sequence : (dateA < dateB) ? 1 : -1;
						});
						paymentList.forEach(item => {
							const seqOrderInfo = item.seqOrderInfo;
							if(!item.orderInfo)
								item.orderInfo = orderInfoList[seqOrderInfo];
							const orderState = item.orderInfo.orderState;
							const isRefunded = (orderState == "REFUNDED" || orderState == "REFUNDED_PART");
							if(!item.refundInfo)
								item.refundInfo = (isRefunded) ? item.orderInfo.refundInfo : {};
						});
						this.data.paymentList = paymentList;
						this.render();
					}).catch(error => {
						console.log(error);
						alert("?????? ????????? ??????????????? ?????????????????????.");
					});
				} else {
					this.render();
				}
			} catch(error) {
				console.log(error);
				alert("?????? ????????? ??????????????? ?????????????????????.");
			}
		},
		filter : function(data) {
			const isCanceled = (this.container.querySelector("[data-event='canceledYn']:checked"));
			return data.filter(item => {
				return (!(isCanceled && item.orderState == "CANCELLED"));
			});
		},
		update : function() {
			this.render(true);
		},
		render : function(isUpdate) {
			const div = document.querySelector("[data-event='paymentList']");
			this.container = div.parentNode.parentNode;
			div.innerHTML = this.template();
			uiTable(div);
			if(!isUpdate) {
				const self = this;
				uiEvent(this.container, {
					change : {
						canceledYn : function() {self.update();},
					}
				});
				this.parent.setExcelExport(this.container, "????????????", "????????? ??? ????????????");
			}
		},
		template : function() {
			const mode = this.parent.mode;
			const isHidden = (mode == "member") ? "hidden" : "";
			const tableLength = (mode == "member") ? "10" : "10";

			let tr = this.filter(this.data.paymentList).map(item => {
				const orderInfo = item.orderInfo || {};
				const coachName = (orderInfo.webAppDiv == "A") ? `<span class="blue">??? ??????</span>` : componentMember.getCoachName(item.seqPartnerCoach);
				const paymentDate = uiDate(item.paymentDate);
				const paymentDateTime = uiDate((item.paymentDatetime || item.paymentCompletedDatetime), "time");
				const paymentKind = componentMember.getPaymentKind(item);
				const paymentType = uiParameter.payment.paymentType[item.paymentType];
				const className = (item.orderState == "CANCELLED") ? "cancel" : "";
				return `
					<tr class="${className}">
						<td class="branchDisplay">${componentMember.getBranchName(item)}</td>
						<td>${item.seqOrderPayment}</td>
						<td>${paymentDate}</td>
						<td class="${isHidden}">${componentMember.getMemberInfo(orderInfo, "name")}</td>								<!-- ???????????? -->
						<td class="${isHidden}">${componentMember.getMemberInfo(orderInfo, "mobile")}</td>
						<td>${item.seqOrderInfo}</td>
						<td class="name">${item.orderName || "-"}</td>
						<td>${paymentKind}</td>
						<td>${coachName}</td>
						<td>${paymentType}</td>
						<td class="currency">${getComma(item.paymentAmount)}???</td>
						<td class="memo">${componentMember.getReceiptSummary(item)}</td>
						<td>${paymentDateTime}</td>
					</tr>
				`;
			});
			const tableType = (tr.length == 0) ? "ui-table" : "ui-data-table";
			tr = (tr.length == 0) ? `<tr><td class="empty" colspan="13">?????? ????????? ????????????.</td></tr>` : tr.join("");
			return `
				<table class="${tableType} dark even" data-table-export="true" data-table-length="${tableLength}" data-table-dom="fltp">
					<thead>
						<tr><td class="branchDisplay">?????????</td><td>????????????</td><td>?????????</td><td class="${isHidden}">????????????</td><td class="${isHidden}">?????????</td><td>????????????</td><td>????????????</td><td>????????????</td><td>?????????</td><td>????????????</td><td>????????????</td><td>????????????</td><td>??????????????????</td></tr>
					</thead>
					<tbody>
						${tr}
					</tbody>
				</table>
			`;
		}
	},


	/* ******** ?????? ?????? ******** */
	popupCross : {
		popup : undefined,
		data : {
			seqMember : 0,
			seqPassInfo : 0
		},
		callback : undefined,
		open : function(seqMember, seqPassInfo, callback) {
			if(this.popup) return;
			this.data = {
				seqMember : seqMember,
				seqPassInfo : seqPassInfo
			};
			this.callback = callback;
			this.render();
		},
		close : function() {
			this.popup = undefined;
			uiPopup();
		},
		submit : function() {
			const crossType = this.popup.getValue("crossType");
			const seqMember = this.data.seqMember;
			const seqPassInfo = this.data.seqPassInfo;
			if(!crossType) {
				alert("?????? ????????? ????????? ?????????.");
				return;
			}
			if(this.callback)
				this.callback(crossType);
			this.close();
		},
		render : function() {
			const self = this;
			this.popup = uiPopup({
				template : this.template(),
				event : {
					click : {
						close : function() {self.close()},
						submit : function() {self.submit()}
					}
				}
			});
		},
		template : function() {
			return `
				<div class="small">
					<div class="top">
						<h2>?????? ?????? ??????<a data-event="close"></a></h2>
					</div>
					<div class="middle">
						<p class="ui-note" style="margin-bottom:15px">
							<b>?????? ?????? ????????? ?????? :</b> ????????? ?????? ???????????? ????????? ?????? ?????? ?????? ???????????? ???????????? ?????? ??????????????? ???????????? ???????????? ???????????????.<br>
							????????? ????????? ?????? ???????????? ???????????? ?????? ?????? ?????? ???????????????. ?????? ???????????? ?????? ????????? ???????????? ????????? ???????????? ??????????????? ?????? ???????????? ??? 2??? ??????????????? ??? 3??? ??????????????? ????????? ??? ?????? ???????????????.
							<br><br>
							<b>?????? ????????? ?????? :</b> ????????? ?????? ???????????? ????????????/????????? ?????? ?????? ????????? ?????? ????????? ????????? ???????????? ?????? ??? ???????????? ???????????? ???????????????.
						</p>
						<label class="ui-input-radio">
							<input name="crossType" type="radio" value="period">
							<span></span>
							?????? ?????? ????????? ??????
						</label>
						<label class="ui-input-radio">
							<input name="crossType" type="radio" value="normal">
							<span></span>
							?????? ????????? ??????
						</label>
					</div>
					<div class="bottom">
						<button class="ui-button gray" data-event="close">??????</button>
						<button class="ui-button" data-event="submit">??????</button>
					<div>
				</div>
			`;
		}
	},
};