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
			section.putValue("firstOrderDate", uiDate(data.firstOrderDate) || "없음");
			section.putValue("lastOrderDate", uiDate(data.lastOrderDate) || "없음");
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
				case "day" : fileName = `일일매출보고_${date}`; break;
				case "week" : fileName = `주간매출보고_${startDate}부터_${endDate}까지`; break;
				case "month" : fileName = `월간매출보고_${date.substr(0, 7)}`; break;
			}
		}
		fileName = `${categoryName}_${tabName}_${fileName}`;
		table.setAttribute("data-table-export-title", categoryName);
		table.setAttribute("data-table-export-filename", fileName);
	},

	/* ******** 결제 및 환불 통합 내역 ******** */
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
						alert("결제 및 환불 통합 내역을 가져오는데 실패하였습니다.");
					});
				} else {
					this.render();
				}
			} catch(error) {
				console.log(error);
				alert("결제 및 환불 통합 내역을 가져오는데 실패하였습니다.");
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
			this.parent.setExcelExport(this.container, "판매내역", "결제 및 환불 통합내역");
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

				// 결제일시
				const getPaymentDateTime = () => {
					return componentMember.getDate(item.doDateTime);
				};

				// 판매번호
				const seqOrderInfo = orderInfo.seqOrderInfo;

				// 판매상품
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

	//				if(isRefunded || paymentInfo.paymentKind == "REPAYMENT") nameList.push("환불 : ");
					nameList.push(pricingName);
					if(beforeOrderInfo) {
						const symbol = (orderType == "MERGE") ? "＋" : "←";
						nameList.push(" (" + symbol + beforePricingName + ")" || "");
					}
					if(isTransfer) {
						const transferInfo = orderInfo.transfer || {};
						const fromMember = (transferInfo.member) ? transferInfo.member.name : "-";
						const toMember = (transferInfo.memberTransfer) ? transferInfo.memberTransfer.name : "-";
						nameList.push(` (${fromMember} 🡢 ${toMember})`);
					}
					const name = uiSafeValue(nameList.join(""));
//					return `<span title="${name}">${name}</span>`;
					return name;
				};

				// 결제분류 : 결제 | 환불 시 재결제 | 미수금 | 환불 | 취소
				const getPaymentKind = () => {
					if(isCanceled) {
						return "취소";
					} else if(isRefunded) {
						return (isRePayment) ? "환불 시 재결제" : "환불";
					} else {
						switch(paymentInfo.paymentKind) {
							case "REPAYMENT" : return "환불 시 재결제";
							case "RECEIVABLES" : return "미수금";
						}
					}
					return "결제";
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

				// 결제수단
				const getPaymentType = () => {
					if(isRefunded && !isRePayment) return "-";
					const paymentInfo = item.orderPayment || {};
					const paymentType = uiParameter.payment.paymentType[paymentInfo.paymentType] || "기타";
					const paymentSummary = componentMember.getReceiptSummary(paymentInfo);
					return `<a class="underline" title="${paymentSummary}">${paymentType}</a>`;
				};

				// 결제금액
				const getPaymentAmount = () => {
					if(isRefunded && !isRePayment) return "<td>-</td>";
					return `<td class="currency green won">${getComma(paymentInfo.paymentAmount)}</td>`;
				};

				// 미수잔액
				const getReceivableAmount = () => {
					if(isRefunded) return "<td>-</td>";
					const receivables = getComma(orderInfo.receivables);
					if(paymentInfo.paymentKind == "RECEIVABLES") {
						const paymentAmount = getComma(paymentInfo.paymentAmount * -1);

						return (paymentAmount) ? `
							<td class="currency red">
								${paymentAmount}원
								<div>(잔액 : ${receivables}원)</div>
							</td>
						` : `
							<td class="currency red">
								<div>(잔액 : ${receivables}원)</div>
							</td>
						`;
					} else {
						if(orderInfo.receivables) {
							return `
								<td class="currency red">
									<div>(잔액 : ${receivables}원)</div>
								</td>
							`;
						}
						return "<td>-</td>";
					}
				};

				// 환불수단
				const getRefundType = () => {
					const paymentType = paymentInfo.refundPaymentType;
					if(!isRefunded || isRePayment) return "<td>-</td>";
					const paymentTypeName = (paymentType == "REFUND") ? "현금 환불" : (paymentType == "CANCEL") ? "결제 취소" : (paymentType == "PAYMENT") ? "재결제" : "-";
					return `<td class="orange">${paymentTypeName}</td>`;
				};

				// 환불지급액
				const getRefundAmount = () => {
					if(!isRefunded || isRePayment) return "<td>-</td>";
					const refundAmount = ((paymentInfo == "PAYMENT") ? paymentInfo.paymentAmount : paymentInfo.refundAmount) || 0;
					return `<td class="currency orange won">${getComma(refundAmount * -1)}</td>`;
				};

				// 판매 담당자
				const getCoachName = () => {
					if(orderInfo.webAppDiv == "A") return `<span class="blue">앱 결제</span>`;
					let seqPartnerCoach = orderInfo.seqPartnerCoach || 0;
					if(isRefunded) {
						const refundInfo = orderInfo.refundInfo;
						if(refundInfo) seqPartnerCoach = refundInfo.seqPartnerCoach;
					}
					return componentMember.getCoachName(seqPartnerCoach);
				};

				// 메모
				const getMemo = () => {
					const memo = orderInfo.memo;
					if(!memo) return "-";
					return `<a class="underline" title="${uiSafeValue(memo)}">보기</a>`;
				};

				// 판매상태
				const getOrderState = () => {
					const orderType = orderInfo.orderType;							// PASS | UPGRADE | CROSS |	TRANSFER || MERGE
					const orderState = orderInfo.orderState;						// COMPLETED || CANCELLED || REFUNDED || REFUNDED_PART
					const passState = componentMember.pass.getPassState(orderInfo);	// COMPLETED || UPGRADED || CROSSED || MERGED || TRANSFERRED
					const orderTypeName = uiParameter.order.type[orderType];
					const orderStateName = uiParameter.order.state[orderState];
					const passStateName = (passState == "UPGRADED") ? "업그레이드" : (passState == "CROSSED") ? "교체" : (passState == "MERGED") ? "결합" : (passState == "MERGED_PART") ? "부분 결합" : (passState == "REFUNDED") ? "환불" : (passState == "TRANSFERRED") ? "양도" : (passState == "EXTENSION") ? "(구)결합" : "";

					switch(orderState) {
						case "COMPLETED" :
							if(passState)
								return (passState == "COMPLETED") ? orderTypeName : passStateName + "된 판매";
							return orderTypeName;
						case "CANCELLED" :
							return (orderType == "PASS") ? "취소" : orderTypeName + " " + orderStateName;
						case "REFUNDED" :
						case "REFUNDED_PART" :
							return (orderType == "PASS") ? "환불" : orderTypeName + "후 환불";
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
						<td class="branchDisplay ${isBranch}">${componentMember.getBranchName(paymentInfo)}</td>	<!-- 지점명 -->
						<td>${getPaymentDateTime()}</td>															<!-- 결제일시 -->
						<td class="${isHidden}">${componentMember.getMemberInfo(orderInfo, "name")}</td>		<!-- 회원명 -->
						<td class="${isHidden}">${componentMember.getMemberInfo(orderInfo, "mobile")}</td>	<!-- 연락처 -->
						<td>${seqOrderInfo}</td>															<!-- 판매번호 -->
						<td class="name">${getPricingName()}</td>											<!-- 판매상품 -->
						<td>${orderStateName}</td>															<!-- 판매상태 -->
						<td class="currency won">${getComma(orderInfo.salePrice)}</td>						<!-- 판매가 -->
						<td class="${getPaymentKindColor()}">${getPaymentKind()}</td>						<!-- 결제분류 -->
						<td>${getPaymentType()}</td>														<!-- 결제수단 -->

						${getPaymentAmount()}																<!-- 결제금액 -->
						${getReceivableAmount()}															<!-- 미수잔액 -->
						${getRefundType()}																	<!-- 환불수단 -->
						${getRefundAmount()}																<!-- 환불지급액 -->
						<td>${getCoachName()}</td>															<!-- 판매담당자 -->

						<td data-id="memo">${getMemo()}</td>												<!-- 메모 -->
						<td class="currency point">${getComma(orderInfo.rewardPoint)}</td>					<!-- 포인트 적립 -->
					</tr>
				`;
			});
			const tableType = (tr.length == 0) ? "ui-table" : "ui-data-table";
			tr = (tr.length == 0) ? `<td class="empty" colspan="17">내역 정보가 없습니다.</td>` : tr.join("");
			return `
				<table class="${tableType} dark border combineList" data-table-export="true" data-table-ordering="true" data-table-length="${tableLength}" data-table-dom="fltp">
					<thead>
						<tr>
							<td class="branchDisplay">지점명</td><td>결제일시</td><td class="${isHidden}">회원명</td><td class="${isHidden}">연락처</td><td>판매번호</td><td>판매상품</td><td>판매상태</td><td>판매가</td>
							<td>결제분류</td><td>결제수단</td><td>결제금액</td><td>미수결제</td><td>환불수단</td><td>환불지급액</td><td>판매담당자</td>
							<td>메모</td><td>포인트 적립</td>
						</tr>
					</thead>
					<tbody>
						${tr}
					</tbody>
				</table>
			`;
		},
	},

	/* ******** 결제 및 환불 통합 내역 상세 ******** */
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
							td.innerHTML = (memo) ? `<a class="underline" title="${uiSafeValue(memo)}">보기</a>` : `-`;
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
				const emptyMessage = (orderType == "transfer") ? "양도 처리 되었습니다." : "이용권 정보가 없습니다.";
				tr = (tr.length == 0) ? `<tr><td class="empty" colspan="3">${emptyMessage}</td></tr>` : tr.join("");
				return `
					<table class="ui-table fixed">
						<colgroup><col width="35%"><col width="40%"><col></colgroup>
						<thead>
							<tr><td>이용권</td><td>판매기간</td><td>판매횟수</td></tr>
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
				const paymentName = (orderType == "PASS") ? "판매가" : orderTypeName + " 판매가";

				const getBeforePrice = () => {
					if(!(orderType == "UPGRADE" || orderType == "CROSS" || orderType == "MERGE")) return "";
					const beforePrice = item.price - ((orderType == "UPGRADE") ? item.upgradePrice : (orderType == "CROSS") ? item.crossPrice : (orderType == "MERGE") ? item.mergePrice : 0) || 0;
					const labelName = (orderType == "UPGRADE" || orderType == "MERGE") ? "정가" : "잔액";
					return `<tr><th>이전 이용권 ${labelName}</th><td>${getComma(beforePrice)}원</td></tr>`;
				};

				return `
					<table class="ui-table fixed">
						<tr class="blue"><th>${paymentName}</th><td>${getComma(item.salePrice)}원</td></tr>
						<tr><th>정가</th><td>${getComma(item.price)}원</td></tr>
						${getBeforePrice()}
						<tr><th>할인</th><td>${getComma(item.discountAmount || 0)}원</td></tr>
						<tr><th>마일리지 사용</th><td>${getComma(item.usePoint || 0)}원</td></tr>
					</table>
				`;
			};
			const getRefundInfo = () => {
				if(!isRefunded) return "";
				return `
					<li>
						<h4 class="ui-sub-title">환불정보</h4>
						<table class="ui-table fixed">
							<tr class="orange"><th>환불 지급액</th><td>${getComma(item.refundAmount)}원</td></tr>
						</table>
					</li>
				`;
			};
			const getButtonInfo = () => {
				const orderInfo = item;
				const refundInfo = orderInfo.refundInfo;

				return (isRefunded) ? `
					<dl>
						<dd>${componentMember.getRefundButton(refundInfo, "환불 수정", "refundModify", "updateRefund")}</dd>
						<dd>${componentMember.getRefundButton(refundInfo, "환불 취소", "refundCancel", "updateRefund")}</dd>
						<dd></dd>
					</dl>
				` :	`
					<dl>
						<dd>${componentMember.getOrderButton(orderInfo, "업그레이드", "upgrade", "permissionPayment", "upgradePayment")}</dd>
						<dd>${componentMember.getOrderButton(orderInfo, "교체", "cross", "permissionPayment", "exchangePassInfo")}</dd>
						<dd>${componentMember.getOrderButton(orderInfo, "양도", "transfer", "permissionMember", "transferUsage")}</dd>
					</dl>
					<dl>
						<dd>${componentMember.getOrderButton(orderInfo, "환불", "refund", "permissionPayment", "refund")}</dd>
						<dd>${componentMember.getOrderButton(orderInfo, "미수금 결제", "receivables", "permissionPayment", "receivables")}</dd>
						<dd>${componentMember.getOrderButton(orderInfo, "취소", "orderCancel", "permissionPayment", "deletePayment")}</dd>
					</dl>
				`;
			};
			const getNote = () => {
				if(isRefunded)
					return `<li><p class="ui-note red">환불된 판매내역입니다. 환불내역 탭에서 상세한 환불 정보를 확인할 수 있습니다.</p></li>`;
				if(isCanceled)
					return `<li><p class="ui-note red">취소된 판매내역입니다.</p></li>`;
				if(isBpay)
					return `<li><p class="ui-note red">앱에서 판매된 내역입니다.</p></li>`;
				return "";
			};
			const getOrderState = () => {
				return this.data.object.getAttribute("data-state") || "-";
			};
			const getButton = () => {
				return (isBpay) ? `` : `
					<button class="ui-button green" data-type="${orderType}" data-seq-member="${item.seqMember}" data-seq-order="${item.seqOrderInfo}" data-event="detail">상세정보 및 수정</button>
				`;
			};
			return `
				<ul>
					${getNote()}
					<li>
						<h4 class="ui-sub-title">판매상태</h4>
						<p class="ui-note">${getOrderState()}</p>
					</li>
					<li class="buttonInfo">
						<h4 class="ui-sub-title">재판매 및 환불</h4>
						<div>
							${getButtonInfo()}
						</div>
					</li>
					<li class="memo">
						<h4 class="ui-sub-title">판매 메모</h4>
						<textarea class="ui-textarea" name="memo" data-event="memo">${item.memo}</textarea>
						<p>업데이트 : <span data-msg="memo"></span></p>
					</li>
					<li class="passInfo">
						<h4 class="ui-sub-title">판매 이용권 정보</h4>
						${getPassInfo()}
					</li>
					<li>
						<h4 class="ui-sub-title">판매가격 정보</h4>
						${getPaymentInfo()}
					</li>
					<li>
						<h4 class="ui-sub-title">결제정보</h4>
						<table class="ui-table fixed">
							<tr class="green"><th>결제 완료</th><td>${getComma(item.paymentAmount)}원</td></tr>
							<tr class="red"><th>미수금 잔액</th><td>${getComma(item.receivables)}원</td></tr>
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

	/* ******** 이용권 별 환불내역 ******** */
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
						alert("이용권 별 환불내역을 가져오는데 실패하였습니다.");
					});
				} else {
					this.render();
				}
			} catch(error) {
				console.log(error);
				alert("이용권 별 환불내역을 가져오는데 실패하였습니다.");
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
				this.parent.setExcelExport(this.container, "판매내역", "이용권 별 환불내역");
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
				if(confirm(`정말로 취소하시겠습니까?`)) {
					orderController.refundCancel(seqMember, seqOrderInfo, seqRefundInfo).then(data => {
						alert("취소되었습니다.");
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

			// 체크 필요
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
					type = (type == "REFUND") ? "현금 환불" : (type == "CANCEL") ? "결제 취소" : (type == "PAYMENT") ? "재결제" : "-";
					return `
						<tr>
							<td>${date}</td>
							<td>${type}</td>
							<td>${getComma(amount)}원</td>
						</tr>
					`;
				});
				return (tr.length == 0) ? `<tr><td colspan="3">환불 내역이 없습니다.</td></tr>` : tr.join("");
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

				let refundType = (orderInfo.orderType == "PASS") ? "환불" : orderType + " 환불";
				if(isCanceled) refundType += " 취소";

				const memo = uiSafeValue(item.memo);

				return `
					<tr class="${className.join(" ")}">
						<td class="branchDisplay">${componentMember.getBranchName(item)}</td>
						<td>${item.seqRefundInfo || "-"}</td>																				<!-- 환불번호 -->
						<td>${refundDate}</td>																								<!-- 환불일 -->
						<td class="${isHidden}">${componentMember.getMemberInfo(item, "name")}</td>									<!-- 환불회원 -->
						<td class="${isHidden}">${componentMember.getMemberInfo(item, "mobile")}</td>									<!-- 연락처 -->
						<td>${item.seqOrderInfo || "-"}</td>																				<!-- 판매번호 -->
						<td>${refundType}</td>																								<!-- 환불분류 -->
						<td class="multiple">${componentMember.getPassList(item, "passState")}</td>									<!-- 이용권 상태 -->
						<td class="name multiple">${componentMember.getPassList(item, "name")}</td>									<!-- 이용권 내역 -->

						<td class="currency multiple">${componentMember.getPassList(item, "salePrice", true)}</td>		<!-- 이전 판매가 -->
						<td class="currency multiple">${componentMember.getPassList(item, "paymentAmount", true)}</td>	<!-- 이전 결제금액 -->
						<td class="currency multiple">${componentMember.getPassList(item, "refundAmount")}</td>						<!-- 환불금액 -->
						<td class="currency multiple">${componentMember.getPassList(item, "finalRefundPrice")}</td>					<!-- 최종판매금액 -->

						<td class="currency">${getComma(item.refundPenalty)}원</td>															<!-- 위약금 -->
						<td class="currency">${getComma(item.refundPayment)}원</td>															<!-- 환불 지급액 -->

						<td>${coachName}</td>																								<!-- 환불 담당자 -->
						<td class="memo" title="${memo}">${memo}</td>																		<!-- 환불메모 -->
						<td>${refundDateTime}</td>																							<!-- 환불처리일시 -->
					</tr>
					<tr>
						<td colspan="20">
							<div class="box">
								<h5 class="ui-sub-title">상태 변경</h5>
								<div class="function">
									${componentMember.getRefundButton(item, "환불 수정", "refundModify", "updateRefund")}
									${componentMember.getRefundButton(item, "환불 취소", "refundCancel", "updateRefund")}
								</div>
								<h5 class="ui-sub-title">환불 정보</h5>
								<table class="ui-table point fixed">
									<thead>
										<tr><td>환불일시</td><td>환불구분</td><td>환불금액</td></tr>
									</thead>
									<tbody>
										${getRefundList(item)}
									</tbody>
								</table>
								<h5 class="ui-sub-title">결제 정보</h5>
								${componentMember.getPaymentSummaryList(item.orderInfo)}
							</div>
						</td>
					</tr>
				`;
			});

			const tableType = (tr.length == 0) ? "ui-table" : "ui-data-table";
			tr = (tr.length == 0) ? `<tr><td class="empty" colspan="20">환불 정보가 없습니다.</td></tr>` : tr.join("");

			return `
				<table class="${tableType} dark drop" data-table-export="true" data-table-length="${tableLength}" data-table-dom="fltp">
					<thead>
						<tr><td class="branchDisplay">지점명</td><td>환불번호</td><td>환불일</td><td class="${isHidden}">환불회원</td><td class="${isHidden}">연락처</td><td>판매번호</td><td>환불분류</td><td>이용권 상태</td><td>이용권 내역</td><td>이전 판매가</td><td>이전 결제금액</td><td>환불금액</td><td>최종판매금액</td><td>위약금</td><td>환불 지급액</td><td>환불<br>담당자</td><td>환불메모</td><td>환불처리일시</td></tr>
					</thead>
					<tbody>
						${tr}
					</tbody>
				</table>
			`;
		}
	},

	/* ******** 이용권 별 판매내역 ******** */
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
						alert("이용권 별 판매내역을 가져오는데 실패하였습니다.");
					});
				} else {
					this.render();
				}
			} catch(error) {
				console.log(error);
				alert("이용권 별 판매내역을 가져오는데 실패하였습니다.");
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
				this.parent.setExcelExport(container, "판매내역", "이용권 별 판매내역");
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

						// 기간제 패키지 교체 제외 시 if(isPeriod && !serviceCategory)
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
				if(orderState == "REFUNDED" || orderState == "REFUNDED_PART") orderTypeName = "환불";
				if(orderTypeName == "결합") orderTypeName = "판매";

				const seqMember = Number(object.getAttribute("data-seq-member"));
				const seqOrderInfo = Number(object.getAttribute("data-seq-order"));
				if(confirm(`정말로 ${orderTypeName}를 취소하시겠습니까?`)) {
					orderController.cancel(seqMember, seqOrderInfo).then(data => {
						alert("취소되었습니다.");
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
						console.error("필요한 데이터가 없습니다.");
						alert("이용권 정보를 불러올 수 없습니다.");
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
				const coachName = (item.webAppDiv == "A") ? `<span class="blue">앱 결제</span>` : componentMember.getCoachName(item.seqPartnerCoach);
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
							return `<p class="ui-note red">환불된 판매내역입니다. 환불내역 탭에서 상세한 환불 정보를 확인할 수 있습니다.</p>`
						if(isCanceled)
							return `<p class="ui-note red">취소된 판매내역입니다.</p>`
						if(isBpay)
							return `<p class="ui-note red">앱에서 판매된 내역입니다.</p>`;
						return "";
					};
					const getButton = () => {
						return (isBpay) ? `` : `
							<button class="ui-button" data-type="${orderType}" data-seq-member="${item.seqMember}"
								data-seq-order="${item.seqOrderInfo}" data-event="detail" ${isDisabled}>상세정보 및
							수정</button>
						`;
					};
					return `
						<tr class="detail" data-sub-sequence="${item.seqOrderInfo}">
							<td colspan="20">
								<div class="box">
									<div class="top">
										${getNote()}
										<h5 class="ui-sub-title">상태 변경</h5>
										<div class="function">
											${componentMember.getOrderButton(item, "업그레이드", "upgrade", "permissionPayment", "upgradePayment")}
											${componentMember.getOrderButton(item, "교체", "cross", "permissionPayment", "exchangePassInfo")}
											${componentMember.getOrderButton(item, "양도", "transfer", "permissionMember", "transferUsage")}
											${componentMember.getOrderButton(item, "환불", "refund", "permissionPayment", "refund")}
											${componentMember.getOrderButton(item, "미수금 결제", "receivables", "permissionPayment", "receivables")}
											${componentMember.getOrderButton(item, "취소", "orderCancel", "permissionPayment", "deletePayment")}
										<h5 class="ui-sub-title">결제 내역</h5>
										${componentMember.getPaymentSummaryList(item, true)}
									</div>
									<div class="bottom">
										<button class="ui-button gray" data-event="cancel">닫기</button>
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
			tr = (tr.length == 0) ? `<td class="empty" colspan="20">판매 정보가 없습니다.</td>` : tr.join("");

			return `
				<table class="${tableType} drop dark" data-table-export="true" data-table-length="${tableLength}" data-table-dom="fltp">
					<thead>
						<tr>
							<td class="branchDisplay">지점명</td><td>판매번호</td><td>판매일</td><td class="${isHidden}">판매회원</td><td class="${isHidden}">연락처</td><td>판매분류</td><td>판매상태</td><td>이용권 상태</td><td>이용권 내역</td>
							<td>정가</td><td>할인</td><td>이전 판매가</td><td>판매가</td><td>결제금액</td><td>미수금</td>
							<td>판매담당</td><td>판매메모</td><td>판매처리일시</td>
						</tr>
					</thead>
					<tbody>
						${tr}
					</tbody>
				</table>
			`;
		},
	},

	/* ******** 결제내역 ******** */
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
						alert("결제 내역을 가져오는데 실패하였습니다.");
					});
				} else {
					this.render();
				}
			} catch(error) {
				console.log(error);
				alert("결제 내역을 가져오는데 실패하였습니다.");
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
				this.parent.setExcelExport(this.container, "판매내역", "이용권 별 결제내역");
			}
		},
		template : function() {
			const mode = this.parent.mode;
			const isHidden = (mode == "member") ? "hidden" : "";
			const tableLength = (mode == "member") ? "10" : "10";

			let tr = this.filter(this.data.paymentList).map(item => {
				const orderInfo = item.orderInfo || {};
				const coachName = (orderInfo.webAppDiv == "A") ? `<span class="blue">앱 결제</span>` : componentMember.getCoachName(item.seqPartnerCoach);
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
						<td class="${isHidden}">${componentMember.getMemberInfo(orderInfo, "name")}</td>								<!-- 환불회원 -->
						<td class="${isHidden}">${componentMember.getMemberInfo(orderInfo, "mobile")}</td>
						<td>${item.seqOrderInfo}</td>
						<td class="name">${item.orderName || "-"}</td>
						<td>${paymentKind}</td>
						<td>${coachName}</td>
						<td>${paymentType}</td>
						<td class="currency">${getComma(item.paymentAmount)}원</td>
						<td class="memo">${componentMember.getReceiptSummary(item)}</td>
						<td>${paymentDateTime}</td>
					</tr>
				`;
			});
			const tableType = (tr.length == 0) ? "ui-table" : "ui-data-table";
			tr = (tr.length == 0) ? `<tr><td class="empty" colspan="13">결제 정보가 없습니다.</td></tr>` : tr.join("");
			return `
				<table class="${tableType} dark even" data-table-export="true" data-table-length="${tableLength}" data-table-dom="fltp">
					<thead>
						<tr><td class="branchDisplay">지점명</td><td>결제번호</td><td>결제일</td><td class="${isHidden}">결제회원</td><td class="${isHidden}">연락처</td><td>판매번호</td><td>판매내역</td><td>결제종류</td><td>담당자</td><td>결제수단</td><td>결제금액</td><td>결제정보</td><td>결제처리일시</td></tr>
					</thead>
					<tbody>
						${tr}
					</tbody>
				</table>
			`;
		}
	},


	/* ******** 교체 팝업 ******** */
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
				alert("교체 조건을 선택해 주세요.");
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
						<h2>교체 조건 선택<a data-event="close"></a></h2>
					</div>
					<div class="middle">
						<p class="ui-note" style="margin-bottom:15px">
							<b>기간 고정 이용권 교체 :</b> 교체할 이전 이용권의 사용한 기간 만큼 새로 교체하는 이용권의 정상 이용기간이 자동으로 줄어들어 적용됩니다.<br>
							이용권 정가도 실제 줄어들어 적용되는 기간 만큼 일할 계산됩니다. 기존 이용권의 남은 기간은 유지하고 새로운 이용권을 추가하거나 남은 기간동안 주 2회 이용권에서 주 3회 이용권으로 변경할 때 주로 사용됩니다.
							<br><br>
							<b>일반 이용권 교체 :</b> 교체할 이전 이용권의 잔여기간/횟수에 대한 잔여 금액을 새로 교체할 이용권 가격에서 할인 후 결제하여 이용권을 교체합니다.
						</p>
						<label class="ui-input-radio">
							<input name="crossType" type="radio" value="period">
							<span></span>
							기간 고정 이용권 교체
						</label>
						<label class="ui-input-radio">
							<input name="crossType" type="radio" value="normal">
							<span></span>
							일반 이용권 교체
						</label>
					</div>
					<div class="bottom">
						<button class="ui-button gray" data-event="close">취소</button>
						<button class="ui-button" data-event="submit">완료</button>
					<div>
				</div>
			`;
		}
	},
};