const componentOrder = {
	beforeOrderInfo : {
		container : undefined,
		data : {},
		open : function(context, callback) {
			try {
				if(orderType == "upgrade" || orderType == "cross") {
					if(!context) {
						Promise.all([
							(orderType == "upgrade") ? orderController.upgradeInfo(seqMember, seqPassInfo, serviceCategory) :
							(orderType == "cross") ? orderController.crossInfo(seqMember, seqPassInfo, crossType) : {},
							commonController.coachList(),
							commonController.salesClassificationList()
						]).then(([beforeOrderInfo, coachList, salesList]) => {
							this.data = {
								beforeOrderInfo : beforeOrderInfo || {},
								coachList : coachList || [],
								salesList : salesList || []
							};
							if(callback) callback(beforeOrderInfo);
							componentMember.data = this.data;
							this.render();
						}).catch(error => {
							console.log(error);
							alert("이전 이용권 정보를 가져오는데 실패 하였습니다.");
						});
					} else {
						this.data = context.data
						if(callback) callback();
						this.render();
					}
				} else {
					if(callback) callback();
				}
			} catch(error) {
				alert("이전 이용권 정보를 설정하는데 실패하였습니다.");
			}
		},
		render : function() {
			this.container = document.querySelector("[data-id='beforeOrderInfo']");
			if(!this.container) return;
			this.container.innerHTML = this.template();
		},
		template : function() {
			const item = this.data.beforeOrderInfo;

			const getUpgradeList = () => {
				const isCoach = componentMember.getCoachDisplay(item);
				const serviceColor = componentMember.getServiceColor(item);

				const passList = item.passes || [];
				const tr = passList.map(item => {
					return `
						<tr>
							<td>${item.serviceName}</td>														<!-- 서비스명 -->
							<td>${componentMember.getUsePeriod(item)}</td>										<!-- 기간 -->
							<td>${componentMember.getUseNumber(item)}</td>										<!-- 횟수 -->
							<td>${getComma(item.price)}원</td>													<!-- 정가 -->
							<td class="red">${getComma(item.receivables)}원</td>								<!-- 미수금 -->
							<td class="${isCoach}">${componentMember.getCoachName(item.seqPartnerCoach)}</td>	<!-- 담당강사 -->
							<td>${componentMember.getLimit(item)}</td>											<!-- 이용제한 -->
							<td>${componentMember.getPauseNumber(item)}</td>									<!-- 중지권 -->
							<td>${componentMember.getSalesClassificationName(item)}</td>						<!-- 매출분류 -->
						</tr>
					`;
				});
				const getPricingName = () => {
					if(item.pricing && item.serviceCategory != item.pricing.serviceCategory)
						return item.pricing.pricingName + " : " + item.passes[0].serviceName;
					return item.pricingName || ((item.pricing) ? item.pricing.pricingName : item.passes[0].serviceName);
				};
				return `
					<li>
						<h4>${getPricingName()}</h4>
						<div class="bg ${serviceColor}"></div>
						<table class="ui-table">
							<thead>
								<tr>
									<td class="name">서비스명</td><td>기간</td><td>횟수</td>
									<td>정가</td><td>미수금</td><td class="${isCoach}">담당강사</td>
									<td>이용제한</td><td>중지권</td><td>매출분류</td>
								</tr>
							</thead>
							<tbody>
								${tr.join("")}
							</tbody>
						</table>
					</li>
				`;
			};
			const getCrossList = () => {
				const passList = item.passes || [];

				const tr = passList.map(item => {
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
							<td>${item.serviceName}</td>							<!-- 서비스명 -->
							<td>${componentMember.getUsePeriod(item)}</td>			<!-- 기간 -->
							<td>${componentMember.getUseNumber(item)}</td>			<!-- 횟수 -->
							<td>${getComma(item.paymentAmount)}원</td>				<!-- 결제금액 -->
							<td class="red">${getComma(item.receivables)}원</td>	<!-- 미수금 -->
							<td>${remainPeriod}일 / ${remainNumber}</td>			<!-- 잔여일수/횟수 -->
							<td class="green">${getComma(remainPrice)}원</td>		<!-- 잔여금액 -->
							<td>${spendPeriod}일 / ${spendNumber}</td>				<!-- 소진일수/횟수 -->
							<td class="red">${getComma(item.spendPrice)}원</td>		<!-- 소진금액 -->
						</tr>
					`;
				});
				const getName = () => {
					const length = passList.length;
					let serviceName = passList[0].serviceName || "";
					return serviceName + ((length == 1) ? "" : " 외 " + (length - 1) + "건");
				};
				const getColor = () => {
					const length = passList.length;
					return (length < 2) ? componentMember.getServiceColor(passList[0]) : "green";
				};
				return `
					<li>
						<h4>${getName()}</h4>
						<div class="bg ${getColor()}"></div>
						<table class="ui-table">
							<thead>
								<tr>
									<td class="name">서비스명</td><td>기간</td><td>횟수</td>
									<td>결제완료</td><td>미수금</td>
									<td>잔여일수/횟수</td><td>잔여금액</td><td>소진일수/횟수</td><td>소진금액</td>
								</tr>
							</thead>
							<tbody>
								${tr.join("")}
							</tbody>
						</table>
					</li>
				`;
			};
			let li = "";

			switch(orderType) {
				case "upgrade" :
					li = getUpgradeList();
					break;
				case "cross" :
					li = getCrossList();
					break;
			}
			return `
				<div class="ui-list-result">
					<div class="list">
						<ul>${li}</ul>
					</div>
				</div>
			`;
		}
	},
	orderInfo : {
		container : undefined,
		data : {},
		open : function(context) {
			try {
				this.data = this.template.data = context.data;
				this.render();
			} catch(error) {
				console.log(error);
				alert("이용권 정보를 설정하는데 실패하였습니다.");
			}
		},
		render : function() {
			this.container = document.querySelector("[data-id='orderInfo']");
			if(!this.container) return;
			this.container.innerHTML = this.template();
		},
		template : function() {
			const getServiceColor = (item) => {
				const serviceType = (item.serviceCategory == "PACKAGE") ? "PACKAGE" : item.serviceType || item.detailList[0].serviceType;
				if(serviceType == "PACKAGE") return "green";
				const color = uiParameter.service.color[serviceType];
				const isPackage = (item.pricing && item.pricing.serviceCategory == "PACKAGE");
				return color + ((isPackage) ? " package" : "");
			};
			const getPriceHead = () => {
				switch(orderType) {
					case "merge" :
					case "upgrade" : return "<td>현재 이용권<br>정가</td><td>이전 이용권<br>정가</td>";
					case "cross" : return "<td>현재 이용권<br>정가</td><td>이전 이용권<br>잔액</td>";
				}
				return "<td>정가</td>";
			};
			const getPriceBody = (item) => {
				const beforeAmount = ((orderType == "upgrade") ? item.discountUpgrade : (orderType == "cross") ? item.discountCross : (orderType == "merge") ? item.discountMerge : 0) || 0;
				return (orderType == "upgrade" || orderType == "cross" || orderType == "merge") ? `
					<td>${getComma(item.price)}원</td>
					<td>${getComma(beforeAmount)}원</td>
				` : `
					<td>${getComma(item.price)}원</td>
				`;
			};

			const pricingInfo = this.data.pricingInfo;
			const detailList = pricingInfo.detailList;
			const tr = detailList.map(item => {
				return `
					<tr>
						<td>${item.serviceName}</td>									<!-- 서비스명 -->
						<td>${componentMember.getUsePeriod(item)}</td>					<!-- 기간 -->
						<td>${componentMember.getUseNumber(item)}</td>					<!-- 횟수 -->
						${getPriceBody(item)}											<!-- 정가 -->
						<td>${getComma(item.discountAmount)}원</td>						<!-- 할인가 -->
						<td>${getComma(item.usePoint)}P</td>							<!-- 포인트 -->
						<td>${getComma(item.salePrice)}원</td>							<!-- 판매가 -->
						<td class="green">${getComma(item.paymentAmount)}원</td>		<!-- 결제금액 -->
						<td class="red">${getComma(item.receivables)}원</td>			<!-- 미수금 -->
						<td>${componentMember.getSalesClassificationName(item)}</td>	<!-- 매출분류 -->
					</tr>
				`;
			});
			const li = `
				<li>
					<h4>${pricingInfo.pricingName}</h4>
					<div class="bg ${getServiceColor(pricingInfo)}"></div>
					<table class="ui-table">
						<thead>
							<tr>
								<td class="name">서비스명</td><td>기간</td><td>횟수</td>
								${getPriceHead()}
								<td>할인가</td><td>사용 포인트</td><td>판매가</td>
								<td>결제완료</td><td>미수금</td><td>매출분류</td>
							</tr>
						</thead>
						<tbody>
							${tr.join("")}
						</tbody>
					</table>
				</li>
			`;
			return `
				<div class="ui-list-result">
					<div class="list">
						<ul>${li}</ul>
					</div>
				</div>
			`;

		}
	}
};