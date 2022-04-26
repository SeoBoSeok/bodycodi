const componentProduct = {
	container : undefined,
	mode : "create",
	data : {},

	open : function(container, mode, seqService, seqPricing, isRemove) {
		Promise.all([
			(seqService) ? serviceController.normal.detail(seqService) : null,
			(seqService) ? null : serviceController.normal.list(),
			commonController.coachList(),
			commonController.placeList(),
			commonController.salesClassificationList(),
			commonController.branch.type.list(),
			commonController.branch.list(),
			permissionController.getList()
		]).then(([serviceInfo, serviceList, coachList, placeList, salesClassificationList, branchTypeList, branchList, permission]) => {
			this.mode = mode;
			this.container = container;
			this.event.self = this;
			this.data = {
				seqService : seqService,
				seqPricing : seqPricing,
				serviceInfo : serviceInfo,
				serviceList : (serviceList || []).filter(item => {
					return (item.saleYn == "Y");
				}),
				serviceType : (typeof serviceType != "undefined") ? serviceType : "",
				pricingList : [],
				coachList : coachList || [],
				placeList : placeList || [],
				salesClassificationList : salesClassificationList || [],
				branchTypeList : branchTypeList || [],
				branchList : branchList || [],
				isDescription : (mode != "popup"),
				isRemove : isRemove || false
			};
			componentMember.data = this.serviceInfo.data = this.pricingInfo.data = this.pricingList.data = this.data;
			uiPermission.data = permission;

			this.serviceInfo.open(seqService);
			if(seqService) {
				this.event.setAddButton();
				this.pricingList.open(seqPricing);
			}
			this.render();
		}).catch(error => {
			uiError(error);
		});
	},
	render : function() {
		const self = this.event.self = this;
		this.event.setDropEvent(this.container);
	},
	event : {
		setAddButton : function() {
			const button = this.self.container.querySelector("[data-event='add']");
			if(button) {
				button.addEventListener("click", () => {
					const li = this.self.container.querySelector(".pricingInfo li[data-sequence='0']");
					if(li) {
						const nav = document.querySelector("nav");
						li.classList.remove("hidden");
						const rect = li.getBoundingClientRect();
						window.scrollTo({
							top : document.body.parentNode.scrollTop + rect.top - nav.offsetHeight,
							behavior : "smooth"
						})
					}
				});
			}
		},
		setDropEvent : function(container) {
			const nodeList = container.querySelectorAll("[data-event='drop']");
			const self = this.self;
			nodeList.forEach(item => {
				item.onclick = function() {
					const type = this.parentNode.getAttribute("data-type");
					if(!self.data.seqService) {
						if(type == "pricing" && !self.data.serviceInfo) {
							alert("이용권 종류를 설정해 주세요.");
							return;
						} else {
							this.parentNode.classList.toggle("focus");
						}
					} else {
						this.parentNode.classList.toggle("focus");
					}
				};
			});
		},
		getDropList : function(type, sequence) {
			return this.self.container.querySelector("[data-type='" + type + "'][data-sequence='" + sequence + "']");
		},
		setDropList : function(type, sequence, state) {
			const li = this.getDropList(type, sequence);
			if(state) {
				li.classList.add("focus");
			} else {
				li.classList.remove("focus");
				window.scrollTo({
					top : 322,
					behavior : "smooth"
				});
			}
		}
	},

	// 서버스 정보
	serviceInfo : {
		container : undefined,
		mode : "create",
		seqService : 0,
		open : function(seqService) {
			this.seqService = seqService;
			this.mode = (seqService) ? "update" : "create";
			this.render();
		},
		close : function() {
			if(!this.data.seqService) {
				const seqPricing = this.data.seqPricing;
				const container = componentProduct.event.getDropList("pricing", seqPricing);
				componentProduct.pricingInfo.open(container, "create", this.data.serviceInfo);
				componentProduct.event.setDropList("service", 0, false);
				componentProduct.event.setDropList("pricing", 0, true);
			}
		},
		update : function(mode) {
			if(mode) this.mode = mode;
			if(mode == "update") {
				const seqService = this.data.serviceInfo.seqService;
				serviceController.normal.detail(seqService).then(data => {
					this.data.serviceInfo = data;
					this.render();
				});
			} else {
				this.render();
			}
		},
		render : function() {
			const self = this.event.self = this;
			this.container = componentProduct.event.getDropList("service", this.seqService);
			if(!this.container) return;

			const div = this.container.querySelector("div");
			div.innerHTML = this.template();
			this.prepare();

			uiTab(this.container);
			uiInput(this.container);
			uiEvent(this.container, {
				change : {
					searchType : () => {this.event.changeSearchType()},
					serviceInfo : () => {this.event.updateServiceInfo()},
					serviceType : () => {this.event.changeServiceType()},
					createTab : () => {this.event.changeCreateTab()},
					updateTab : () => {this.event.changeUpdateTab()},
				},
				click : {
					create : () => {this.event.create()},
					update : () => {this.event.update()},
					remove : () => {this.event.remove()},
					recover : () => {this.event.recover()},
					next : () => {this.event.next()}
				}
			});
			uiPermission(this.container);
		},
		prepare : function() {
			if(this.mode == "create") {
				const serviceType = this.data.serviceType;
				if(serviceType) {
					this.container.putValue("serviceType", serviceType.toUpperCase());
					this.event.changeServiceType();

					const searchTypeList = this.container.querySelectorAll("[name='searchType']");
					searchTypeList.forEach(item => {
						item.checked = (item.value == serviceType);
					});
					this.event.changeSearchType();
				}
			} else {
				const serviceInfo = this.data.serviceInfo;
				const seqService = serviceInfo.seqService;
				const serviceType = serviceInfo.serviceType.toLowerCase();
				const getServiceType = () => {
					const serviceType = serviceInfo.serviceType;
					let serviceTypeName = uiParameter.service.name[serviceType];
					if(serviceType == "OPTION") {
						if(serviceInfo.optionType == "LOCKER")
							serviceTypeName += "(락커)";
					}
					return serviceTypeName;
				};

				const form = this.container.querySelector("form");
				form.putValue("serviceKind", uiParameter.service.kind[serviceInfo.serviceKind]);
				form.putValue("serviceType", getServiceType());
				form.putValue("serviceName", serviceInfo.serviceName);
				form.putValue("seqPlace", serviceInfo.seqPlace);
				form.putValue("serviceTime", serviceInfo.serviceTime);
				form.putValue("serviceDesc", serviceInfo.serviceDesc || "");
				this.event.changeServiceType();

				switch(serviceType) {
					case "class" :
						componentProductSetting.reservation.open(seqService);
						componentProductSetting.holiday.open(serviceType, seqService);
						break;
					case "place" :
						componentProductSetting.schedule.open(seqService);
						componentProductSetting.holiday.open(serviceType, seqService);
						break;
				}
			}
		},
		event : {
			getForm : function() {
				const form = this.self.container.querySelector("form");
				const serviceInfo = this.self.data.serviceInfo;
				const serviceKind = (this.self.mode == "create") ? form.getValue("serviceKind") : serviceInfo.serviceKind;
				const serviceType = (this.self.mode == "create") ? form.getValue("serviceType") : serviceInfo.serviceType;
				const optionType = (this.self.mode == "create") ? (form.getValue("optionType") == "Y") ? "LOCKER" : "" : serviceInfo.optionType;

				const data = {
					serviceKind : serviceKind,
					serviceType : serviceType,
					optionType : optionType,
					serviceName : form.getValue("serviceName").trim(),
					seqServiceGenre : form.getValue("seqServiceGenre") || 0,
					seqPlace : form.getValue("seqPlace") || 0,
					serviceTime : form.getValue("serviceTime") || ((serviceType == "APPOINTMENT") ? "" : 0),
					saleYn : form.getValue("saleYn") || "Y",
					serviceDesc : form.getValue("serviceDesc"),
				};
				if((serviceType == "APPOINTMENT" || serviceType == "PLACE") && partnerInfo.partner.branchUseYn == "N") {
					if(!data.seqPlace) data.seqPlace = "";
				}
				return data;
			},
			check : function(data) {
				const form = this.self.container.querySelector("form");
				const serviceType = String(data.serviceType).toLowerCase();
				for(let name in data) {
					const value = data[name];
					const isEmpty = (value === "") ? true : false;
					let error = "";
					switch(name) {
						case "serviceKind"		: if(isEmpty) error = "이용권 속성을 선택해 주세요."; break;
						case "serviceType"		: if(isEmpty) error = "이용권 분류를 선택해 주세요."; break;
						case "serviceName"		:
							if(isEmpty) error = "이용권 종류명을 입력해 주세요.";
							else if(value.length < 2) error = "이용권 종류명을 2자 이상 입력해 주세요.";
							break;
//						case "seqPlace"			: if(isEmpty) error = "진행장소를 선택해 주세요."; break;
						case "serviceTime"		: if(isEmpty) error = "레슨시간을 입력해 주세요."; break;
						case "saleYn"			: if(isEmpty) error = "판매여부를 선택해 주세요."; break;
					}
					if(error) {
						alert(error);
						const input = form.querySelector("[name='" + name + "']");
						if(input) input.focus();
						return false;
					}
				}
				return true;
			},
			create : function() {
				const data = this.getForm();
				if(!this.check(data)) return;
				serviceController.normal.create(data).then(data => {
					console.log('data', data);
					this.self.data.serviceInfo = data;
					this.self.data.serviceList.push(data);
					alert("등록되었습니다.");
					this.self.close();
					this.self.update("update");
				}).catch(error => {
					uiError(error);
				});
			},
			update : function() {
				const data = this.getForm();
				const serviceInfo = this.self.data.serviceInfo;
				const seqService = serviceInfo.seqService;
				if(!seqService || !this.check(data)) return;

				const update = (isBatch) => {
					serviceController.normal.update(seqService, data, isBatch).then(() => {
						alert("수정되었습니다.");
						this.self.update("update");
					}).catch(error => {
						uiError(error);
					});
				};
				update();
				/*
				if(this.self.mode == "update") {
					const changeList = [];
					if(serviceInfo.dayLimit != data.dayLimit)
						changeList.push("일일 이용제한");
					if(serviceInfo.weekLimit != data.weekLimit)
						changeList.push("주간 이용제한");
					if(changeList.length > 0) {
						popupConfirmBatch.open("service", changeList, (isBatch) => {
							update(isBatch);
						});
					} else {
						update();
					}
				} else {
					update();
				}
				*/
			},
			remove : function() {
				const seqService = this.self.data.serviceInfo.seqService;
				if(!seqService) return;
				popupService.confirmRemove.open(seqService, () => {
					serviceController.normal.remove(seqService).then(data => {
						alert("판매 중지되었습니다.");
						window.location.reload(true);
						// this.self.update("update");
						// componentProduct.pricingList.update();
					}).catch(error => {
						uiError(error);
					});
				});
				// if(!seqService || !confirm("해당 이용권 종류에 속한 모든 현장판매 이용권,\n모바일 b.pay 이용권 상품이 모두 판매중지가 됩니다.\n그래도 판매 중지하시겠습니까?")) return;
			},
			recover : function() {
				const seqService = this.self.data.serviceInfo.seqService;
				serviceController.normal.recover(seqService).then(data => {
					alert("판매 복구되었습니다.");
					window.location.reload(true);
					// this.self.update("update");
				}).catch(error => {
					uiError(error);
				});
			},
			next : function() {
				const seqService = Number(this.self.container.getValue("seqService"));
				const serviceInfo = this.self.data.serviceList.filter(item => {
					return (item.seqService == seqService);
				})[0];
				if(!serviceInfo) return;
				this.self.data.serviceInfo = serviceInfo;
				this.self.close();
			},
			changeCreateTab : function() {
				const tabIndex = Number(this.self.container.getValue("tab"));
				if(tabIndex != 2) {
					this.self.data.serviceInfo = undefined;
					this.self.container.putValue("seqService", "");
					this.changeSearchType();
					this.updateServiceInfo();
				}
			},
			changeUpdateTab : function() {
				const tabIndex = Number(this.self.container.getValue("tab"));
				const nodeList = this.self.container.querySelectorAll(".right .tab");
				nodeList.forEach((item, index) => {
					item.classList.remove("focus");
					if(index + 1 == tabIndex)
						item.classList.add("focus");
				});
			},
			changeSearchType : function() {
				const form = this.self.container.querySelectorAll("form")[1];
				const searchType = form.getValue("searchType");
				const select = form.querySelector("[name='seqService']");
				select.className = "ui-select " + ((searchType == "all") ? "appointment class place option" : searchType);
				/*
				const searchTypeList = form.getValue("searchType");
				searchTypeList.forEach(item => {
					select.classList.add(item);
				});
			 	*/
			},
			updateServiceInfo : function() {
				const form = this.self.container.querySelectorAll("form")[1];
				const div = form.querySelector("[data-id='serviceInfo']");
				const button = form.querySelector("[data-event='next']");
				const seqService = Number(form.getValue("seqService"));
				div.className = (seqService) ? "" : "hidden";
				button.disabled = (!seqService);
				if(!seqService) return;

				const serviceInfo = this.self.data.serviceList.filter(item => {
					return (item.seqService == seqService);
				})[0];

				div.putValue("serviceKind", uiParameter.service.kind[serviceInfo.serviceKind]);
				div.putValue("serviceType", uiParameter.service.name[serviceInfo.serviceType]);
				div.putValue("serviceName", serviceInfo.serviceName);
				div.putValue("seqPlace", componentMember.getPlaceName(serviceInfo.seqPlace));
				div.putValue("serviceTime", serviceInfo.serviceTime + "분");
				div.putValue("dayLimit", componentMember.getLimitNumber(serviceInfo.dayLimit));
				div.putValue("weekLimit", componentMember.getLimitNumber(serviceInfo.weekLimit));
				div.putValue("serviceDesc", serviceInfo.serviceDesc || "");

				const li = div.querySelector("[data-id='placeAndTime']");
				this.getDisplayPlaceAndTime(li, serviceInfo.serviceType);

				if(componentProduct.mode == "create") {
					form.parentNode.parentNode.parentNode.scrollIntoView({
						behavior : "smooth",
						block : "end"
					});
				}
			},
			changeServiceType : function() {
				const li = this.self.container.querySelector("[data-id='placeAndTime']");
				const serviceType = (this.self.mode == "create") ?
					this.self.container.getValue("serviceType") :
					this.self.data.serviceInfo.serviceType;
				this.getDisplayPlaceAndTime(li, serviceType);
			},
			getDisplayPlaceAndTime : function(item, serviceType) {
				item.className = "hidden";
				if(serviceType == "APPOINTMENT") {
					item.className = "hidden-left";
					// if(partnerInfo.partner.branchUseYn == "N") item.className = "";
				} else if(serviceType == "CLASS" || serviceType == "OPTION") {
				} else if(serviceType == "PLACE") {
					if(partnerInfo.partner.branchUseYn == "N") item.className = "hidden-right";
				}
			}
		},
		template : function() {
			const saleYn = (this.mode == "update") ? this.data.serviceInfo.saleYn : "Y";
			const isReadonly = (saleYn == "N") ? "readonly" : "";

			const getPlaceList = () => {
				return this.data.placeList.map(item => {
					return `<option value="${item.seqPartnerSpace}">${item.spaceName}</option>`;
				});
			};
			const getServiceList = () => {
				const serviceTypeList = {
					APPOINTMENT :[],
					CLASS : [],
					PLACE : [],
					OPTION : []
				};
				this.data.serviceList.forEach(item => {
					serviceTypeList[item.serviceType].push(item);
				});
				const optGroup = [];
				for(const serviceType in serviceTypeList) {
					const serviceName = uiParameter.service.name[serviceType];
					const serviceColor = uiParameter.service.color[serviceType];
					const item = serviceTypeList[serviceType];
					const option = item.map(item => {
						return `<option value="${item.seqService}">${item.serviceName}</option>`;
					});
					optGroup.push(`
						<optgroup class="${serviceType.toLowerCase()} ${serviceColor}" label="${serviceName}">
							${option.join("")}
						</optgroup>
					`);
				}
				return optGroup.join("");
			};

			const getNote = () => {
				return (this.mode == "update") ? `
					<li class="note">
						ⓘ 모든 수정 내용은 변경 후 신규 예약 건 부터 적용됩니다.
					</li>
				` : ``;
			};

			const getButton = () => {
				return (saleYn == "N") ? `
					<button class="ui-button green" type="button" data-event="recover" data-permission="permissionProduct/modifyUsage">복구</button>
				` : `
					<button class="ui-button red" type="button" data-event="remove" data-permission="permissionProduct/modifyUsage">판매 중지</button>
					<button class="ui-button green" type="button" data-event="update" data-permission="permissionProduct/modifyUsage">수정</button>
				`;
			};

			const getTab = () => {
				const serviceType = this.data.serviceInfo.serviceType;
				switch(serviceType) {
					case "CLASS" :
						return `
							<div class="ui-tab">
								<ul>
									<li><label><input name="tab" type="radio" value="1" data-event="updateTab" checked><div>기본 설정</div></label></li>
									<li><label><input name="tab" type="radio" value="2" data-event="updateTab"><div>예약 설정</div></label></li>
									<li><label><input name="tab" type="radio" value="3" data-event="updateTab"><div>휴일 설정</div></label></li>
								</ul>
							</div>
						`;
					case "PLACE" :
						return `
							<div class="ui-tab">
								<ul>
									<li><label><input name="tab" type="radio" value="1" data-event="updateTab" checked><div>기본 설정</div></label></li>
									<li><label><input name="tab" type="radio" value="2" data-event="updateTab"><div>스케줄 설정</div></label></li>
									<li><label><input name="tab" type="radio" value="3" data-event="updateTab"><div>휴일 설정</div></label></li>
								</ul>
							</div>
						`;
				}
				return "";
			};

			const getTabName = (index) => {
				const serviceType = this.data.serviceInfo.serviceType;
				if(!(serviceType == "CLASS" || serviceType == "PLACE")) return "";
				if(index == 2) return (serviceType == "CLASS") ? "setting-reservation" : "setting-schedule";
				if(index == 3) return "setting-holiday";
				return "";
			};

			const getCommonList = () => {
				return `
					<li>
						<h4 class="required">이용권 종류명</h4>
						<input class="name" name="serviceName" maxlength="30" placeholder="이용권 종류명 입력">
					</li>
					<li class="hidden-left" data-id="placeAndTime">
						<dl>
							<dt>
								<h4 class="required">진행 장소</h4>
								<select class="ui-select" name="seqPlace" required>
									<option value="">진행 장소 선택</option>
									${getPlaceList()}
								</select>
							</dt>
							<dd>
								<h4 class="required">레슨 시간</h4>
								<div class="unit">
									<input name="serviceTime" type="integer" min="0" maxlength="4" placeholder="레슨 시간 입력">
									<span>분</span>
								</div>
							</dd>
						</dl>
					</li>
					<li>
						<h4>이용권 종류 설명</h4>
						<textarea class="ui-textarea" name="serviceDesc" maxlength="1000" placeholder="이용권 종류 설명"></textarea>
					</li>
					${getNote()}
				`;
			};

			return (this.mode == "create") ? `
				<div class="left">
					<div class="ui-tab custom">
						<ul>
							<li>
								<label>
									<input name="tab" type="radio" value="1" data-event="createTab" checked>
									<div>
										<h4>새로 만들기</h4>
										<p>이용권 종류 설정을<br>새롭게 생성할 수 있습니다.</p>
									</div>
								</label>
							</li>
							<li>
								<label>
									<input name="tab" type="radio" value="2" data-event="createTab">
									<div>
										<h4>기존 불러오기</h4>
										<p>기존에 설정했던 이용권 종류를<br>불러올 수 있습니다.</p>
									</div>
								</label>
							</li>
						</ul>
					</div>
					<div class="tab tab-1 focus">
						<form class="ui-form" onsubmit="return false" autocomplete="off">
							<div class="top">
								<ul>
									<li>
										<h4 class="required">이용권 분류</h4>
										<div>
											<label class="ui-input-radio"><input name="serviceType" type="radio" value="APPOINTMENT" data-event="serviceType"><span></span>개인레슨</label>
											<label class="ui-input-radio"><input name="serviceType" type="radio" value="CLASS" data-event="serviceType"><span></span>그룹수업</label>
											<label class="ui-input-radio"><input name="serviceType" type="radio" value="PLACE" data-event="serviceType"><span></span>시설이용</label>
											<label class="ui-input-radio more">
												<input name="serviceType" type="radio" value="OPTION" data-event="serviceType">
												<span></span>
												옵션이용
												<span style="margin-left:10px">
													<label class="ui-input-checkbox">
														<input name="optionType" type="checkbox" value="">
														<span></span>
														락커여부
													</label>
												</span>
											</label>
										</div>
									</li>
									<li>
										<h4 class="required">이용권 속성</h4>
										<div>
											<label class="ui-input-radio"><input name="serviceKind" type="radio" value="P"><span></span>기간제</label>
											<label class="ui-input-radio"><input name="serviceKind" type="radio" value="N"><span></span>횟수제</label>
										</div>
									</li>
									${getCommonList()}
								</ul>
							</div>
							<div class="bottom">
								<button class="ui-button blue" type="button" data-event="create" data-permission="permissionProduct/registUsage">저장</button>
							</div>
						</form>
					</div>
					<div class="tab tab-2">
						<form class="ui-form" onsubmit="return false" autocomplete="off">
							<div class="top">
								<ul>
									<li>
										<h4 class="required">기존 이용권 종류 선택</h4>
										<div class="ui-filter-box">
											<label class="ui-input-radio">
												<input name="searchType" type="radio" value="all" data-event="searchType" checked>
												<span></span>
												전체
											</label>
											<label class="ui-input-radio">
												<input name="searchType" type="radio" value="appointment" data-event="searchType">
												<span></span>
												개인레슨
											</label>
											<label class="ui-input-radio">
												<input name="searchType" type="radio" value="class" data-event="searchType">
												<span></span>
												그룹수업
											</label>
											<label class="ui-input-radio">
												<input name="searchType" type="radio" value="place" data-event="searchType">
												<span></span>
												시설이용
											</label>
											<label class="ui-input-radio">
												<input name="searchType" type="radio" value="option" data-event="searchType">
												<span></span>
												옵션이용
											</label>
										</div>
										<select class="ui-select appointment class place option" name="seqService" data-event="serviceInfo" required>
											<option value="">기존 이용권 종류 선택</option>
											${getServiceList()}
										</select>
									</li>
								</ul>
								<div class="hidden" data-id="serviceInfo">
									<div class="ui-cutoff"><div></div></div>
									<ul>
										<li>
											<dl>
												<dt>
													<h4>이용권 분류</h4>
													<input name="serviceType" type="text" readonly>
												</dt>
												<dd>
													<h4>이용권 속성</h4>
													<input name="serviceKind" type="text" readonly>
												</dd>
											</dl>
										</li>
										<li>
											<h4>이용권 종류명</h4>
											<input name="serviceName" type="text" readonly>
										</li>
										<li class="hidden-left" data-id="placeAndTime">
											<dl>
												<dt>
													<h4>진행 장소</h4>
													<input name="seqPlace" type="text" readonly>
												</dt>
												<dd>
													<h4>레슨 시간</h4>
													<input name="serviceTime" type="text" readonly>
												</dd>
											</dl>
										</li>
										<li>
											<h4>이용권 종류 설명</h4>
											<textarea class="ui-textarea" name="serviceDesc" type="text" readonly></textarea>
										</li>
									</ul>
								</div>
							</div>
							<div class="bottom">
								<button class="ui-button blue" type="button" data-event="next" disabled>다음</button>
							</div>
						</form>
					</div>
				</div>
				${this.description()}
			` : `
				<div class="left">
					${getTab()}
					<div class="tab tab-1 focus">
						<form class="ui-form" onsubmit="return false" autocomplete="off">
							<div class="top ${isReadonly}">
								<ul>
									<li>
										<dl>
											<dt>
												<h4>이용권 속성</h4>
												<input name="serviceKind" readonly>
											</dt>
											<dd>
												<h4>이용권 분류</h4>
												<input name="serviceType" readonly>
											</dd>
										</dl>
									</li>
									${getCommonList()}
								</ul>
							</div>
							<div class="bottom">
								${getButton()}
							</div>
						</form>
					</div>
					<div class="tab tab-2">
						<div class="${getTabName(2)}" data-id="${getTabName(2)}"></div>
					</div>
					<div class="tab tab-3">
						<div class="${getTabName(3)}" data-id="${getTabName(3)}"></div>
					</div>
				</div>
				${this.description()}
			`;
		},
		description : function() {
			return (this.data.isDescription) ? `
				<div class="right">
					<div class="tab tab-1 focus">
						<ul>
							<li>
								<h3><span>이용권 분류</span></h3>
								<ul>
									<li>
										<h4>개인레슨</h4>
										<p>개인레슨 이용권은 1:1 PT와 같이 강사(서비스 제공자)와 회원 간에 약속 시간을 정하고 이용할 수 있는 서비스입니다. 강사는 임직원 관리 메뉴에서 예약 가능 시간을 설정해 놓으면 회원은 레슨시간 이상 빈 일정에 바디코디 앱을 통해 예약할 수 있으며, 회원의 예약 가능 여부는 예약 정책에서 설정할 수 있고 예약과 이용 횟수의 제한, 예약 취소 정책은 각 이용권 별 설정이나 예약정책 메뉴에서 설정할 수 있습니다.</p>
									</li>
									<li>
										<h4>그룹수업</h4>
										<p>그룹수업 이용권은 6:1 필라테스 수업, 일반 GX 수업과 같이 개설된 수업에 1명 이상 예약하고 이용할 수 있는 서비스입니다. 수업별로 참석할 수 있는 그룹수업 이용권을 선택할 수 있으며, 선택된 이용권을 보유한 회원은 바디코디 앱에서 사전 예약할 수 있습니다. 스케줄러 메뉴에서 수업 개설, 이용권 선택, 수업료 설정을 할 수 있고 예약과 이용 횟수의 제한, 예약 취소 정책은 각 이용권 별 설정이나 예약정책 메뉴에서 설정할 수 있습니다.</p>
									</li>
									<li>
										<h4>시설이용</h4>
										<p>시설 이용권은 헬스장 이용, 자유수영 등 특정 시설을 이용할 수 있는 서비스입니다. 바디코디 앱의 사전 예약이 필요 없이 센터 방문 후 체크인을 통해 입장 후 이용 가능합니다. 전체, 주간 이용 횟수 및 기간의 제한은 각 이용권 별로 설정할 수 있습니다.</p>
									</li>
									<li>
										<h4>옵션이용</h4>
										<p>옵션 이용권은 락커 이용권, 운동복 대여권 등 주 서비스와 함께 추가할 수 있는 부가적 서비스입니다. 옵션 이용권 중 락커 판매 시, 배정할 락커 번호를 설정할 수 있고 락커관리 메뉴에서 회원 배정 현황을 관리할 수 있습니다.</p>
									</li>
								</ul>
							</li>
							<li>
								<h3><span>이용권 속성</span></h3>
								<ul>
									<li>
										<h4>기간제</h4>
										<p>기간제 이용권은 특정 기간 동안 이용할 수 있는 이용권을 의미합니다. 전체 이용횟수가 별도로 정해지지 않지만, 주간(월~일) 이용 가능 횟수, 1일(0~24) 이용 가능 횟수는 제한할 수 있습니다.</p>
									</li>
									<li>
										<h4>횟수제</h4>
										<p>횟수제 이용권은 특정 기간 동안 정해진 횟수만큼 이용할 수 있는 이용권을 의미합니다. 주간(월~일) 이용 가능 횟수, 1일(0~24) 이용 가능 횟수는 별도로 제한할 수 있으며, 정해진 전체횟수를 모두 소진된 경우 이용권은 사용기간이 남아 있더라도 자동으로 만료됩니다.</p>
									</li>
								</ul>
							</li>
						</ul>
					</div>
					<div class="tab tab-2">
						${componentProductSetting.reservation.description()}
					</div>
					<div class="tab tab-3">
						${componentProductSetting.schedule.description()}
					</div>
					<div class="tab tab-4">
						${componentProductSetting.holiday.description()}
					</div>
				</div>
			` : ``;
		}
	},

	// 가격정책 목록
	pricingList : {
		container : undefined,
		data : {},
		open : function() {
			pricingController.list({
				serviceCategory : serviceCategory,
				seqService : seqService
			}).then(pricingList => {
				const isRemove = (this.data.isRemove);
				const seqPricing = this.data.seqPricing;
				this.data.pricingList = (pricingList || []).filter(item => {
					return (seqPricing) ? (item.seqPricing == seqPricing) : true;
				});
				/*
				.filter(item => {
					return (isRemove) ? (item.saleYn == "N") : (item.saleYn == "Y");
				});
				*/
				if(!seqPricing) {
					if(this.data.serviceInfo.saleYn == "Y") {
						this.data.pricingList.push({
							seqPricing : 0,
							pricingName : "이용권 상품 추가",
							saleYn : "Y"
						});
					}
				}
				this.render();
			}).catch(error => {
				uiError(error);
			});
		},
		update : function() {
			this.open();
		},
		render : function() {
			this.container = document.querySelector("[data-id='pricingInfo']");
			if(!this.container) return;
			this.container.innerHTML = this.template();
			componentProduct.event.setDropEvent(this.container);

			const serviceInfo = this.data.serviceInfo;
			const saleYn = serviceInfo.saleYn;
			if(saleYn == "N") {
				const nodeList = this.container.querySelectorAll("[data-event='saleYn']");
				nodeList.forEach(item => {
					item.onclick = function() {
						event.preventDefault();
						event.stopPropagation();
						alert("판매 중지된 이용권 상태를 변경할 수 없습니다.");
					};
				});
			}

			const isRemove = (this.data.isRemove);
			this.data.pricingList.forEach(item => {
				const seqPricing = item.seqPricing;
				const container = componentProduct.event.getDropList("pricing", item.seqPricing);
				componentProduct.pricingInfo.open(container, (item.seqPricing ? "update" : "create"), serviceInfo, item);
				if(seqPricing) {
					const node = container.querySelector("[name='saleYn']");
					node.onchange = function() {
						const saleYn = (this.checked) ? "Y" : "N";
						this.checked = (!this.checked);
						pricingController.change.saleYn(seqPricing, saleYn).then(data => {
							this.checked = (saleYn == "Y");
							uiToast("판매 상태가 변경되었습니다.", {minWidth : 0});
						});
					};
				}
			});

			if(this.data.seqPricing) {
				componentProduct.event.setDropList("pricing", this.data.seqPricing, true);
			}

		},
		template : function() {
			const serviceInfo = this.data.serviceInfo;
			const serviceKind = serviceInfo.serviceKind;

			const getSummary = (item) => {
				if(!item.seqPricing) return `이용권 상품의 판매가 및 기간, 횟수를 설정하실 수 있습니다.`;
				const price = getComma(item.price) + "원";
				const usePeriod = item.details[0].usePeriod + ((item.details[0].usePeriodType == "M") ? "개월" : "일");
				const useNumber = item.details[0].useNumber + "회";
				return price + " / " + ((serviceKind == "P") ? usePeriod : usePeriod + " / " + useNumber);
			};

			const li = this.data.pricingList.map(item => {
				const isChecked = (item.saleYn == "Y") ? "checked" : "";
				const isHidden = (!item.seqPricing) ? "hidden focus" : "";
				return `
					<li class="${isHidden}" data-type="pricing" data-sequence="${item.seqPricing}">
						<a data-event="drop">
							<h3>
								${item.pricingName || "-"}
								<label class="ui-input-switch" data-event="saleYn">
									<input name="saleYn" type="checkbox" ${isChecked}>
									<span></span>
									<span>판매 중지</span>
									<span>판매 가능</span>
								</label>
							</h3>
							<p>${getSummary(item)}</p>
						</a>
						<div class="detail"></div>
					</li>
				`;
			});

			return `
				<div class="ui-drop-list">
					<ul>
						${li.join("")}
					</ul>
				</div>
			`;
		}
	},

	// 가격정책 정보
	pricingInfo : {
		container : undefined,
		mode : "create",
		data : {},
		open : function(container, mode, serviceInfo, pricingInfo) {
			this.container = container;
			this.mode = (mode) ? mode : (pricingInfo) ? "update" : "create";
			this.data.serviceInfo = serviceInfo;
			this.data.pricingInfo = pricingInfo || {};
			this.render();
		},
		update : function() {
			componentProduct.pricingList.update();
		},
		render : function() {
			const self = this.event.self = this;
			const div = this.container.querySelector("div");
			div.innerHTML = this.template();
			this.prepare();

			uiInput(this.container);
			uiSelect(this.container);
			uiEvent(this.container, {
				click : {
					create : function() {self.event.create(this);},
					update : function() {self.event.update(this);},
					remove : function() {self.event.remove(this);},
					branch : function() {
						const serviceType = this.getAttribute("data-type");
						if(serviceType != "APPOINTMENT")
							popupSearchBranch.open(self, this.parentNode);
						else
							popupAppointmentBranch.open(self, this.parentNode);
					},
					changeCoach : function() {self.event.changeCoach(this);},
				},
				change : {
					autoNaming : function() {
						self.event.autoNaming(this);
					},
					infinite : function() {
						self.event.changeInfiniteYn(this);
					}
				}
			});
			uiPermission(this.container);
		},
		prepare : function() {
			const isBranch = (partnerInfo.partner.branchUseYn == "Y");
			const serviceInfo = this.data.serviceInfo;

			if(this.mode == "create") {
				this.event.setDefault();
			} else {
				const pricingInfo = this.data.pricingInfo;

				const salesClassificationList = this.data.salesClassificationList || [];
				const branchType = this.data.branchTypeList || [];
				const seqPricing = pricingInfo.seqPricing;

				const form = this.container.querySelector("form");

				form.putValue("pricingName", pricingInfo.pricingName);
				form.putValue("price", getComma(pricingInfo.price));
				form.putValue("taxFreeYn", pricingInfo.taxFreeYn);
				this.container.putValue("saleYn", pricingInfo.saleYn);

				const detailInfo = (pricingInfo.details || [])[0];
				if(detailInfo) {
					form.putValue("seqPricingDetail", detailInfo.seqPricingDetail);

					form.putValue("usePeriod", detailInfo.usePeriod);
					form.putValue("usePeriodType", detailInfo.usePeriodType);
					form.putValue("useNumber", detailInfo.useNumber);

					form.putValue("dayLimit", detailInfo.dayLimit);
					form.putValue("weekLimit", detailInfo.weekLimit);

					form.putValue("cancelNumber", detailInfo.cancelNumber);
					form.putValue("forceCancelNumber", detailInfo.forceCancelNumber);
					form.putValue("pauseNumber", detailInfo.pauseNumber);
					form.putValue("pausePeriod", detailInfo.pausePeriod);
					form.putValue("maxBookingNumber", detailInfo.maxBookingNumber || 0);

					let seqSalesClassification = detailInfo.seqSalesClassification;
					seqSalesClassification = (salesClassificationList.some(item => {
						return (item.seqSalesClassification == seqSalesClassification);
					})) ? seqSalesClassification : 0;

					form.putValue("seqSalesClassification", seqSalesClassification);

					if(isBranch) {
						const branchTypeList = detailInfo.branchTypes || [];
						const coachAndSpaceList = detailInfo.coachAndSpaceList || [];
						branchTypeList.forEach(item => {
							form.putValue("seqPartnerBranchType", item.seqPartnerBranchType);
						});
						form.putValue("defaultBranchYn", detailInfo.defaultBranchYn);
						let branchList = (detailInfo.branches || []).map(item => item.seqPartnerBranch);
						if(serviceInfo.serviceType == "APPOINTMENT") {
							if(coachAndSpaceList.length) {
								branchList = coachAndSpaceList.map(item => item.seqPartnerBranch);
								form.putValue("coachAndSpaceList", JSON.stringify(detailInfo.coachAndSpaceList));
							} else {
								branchList = [];
							}
						}
						popupSearchBranch.update(this, form, branchList);
					} else {
						const info = (detailInfo.coachAndSpaceList || [])[0] || {};
						const select = form.querySelector("[name='coaches']");
						if((info.seqPartnerCoaches || []).length) {
							info.seqPartnerCoaches.forEach(item => {
								const option = select.querySelector("option[value='" + item + "']");
								if(option) option.setAttribute("selected", "");
							});
							select.options[1].removeAttribute("selected");
						}
						form.putValue("seqPartnerSpace", info.seqPartnerSpace);
					}
				}

				form.putValue("autoNameYn", "N");
				const pricingName = form.querySelector("[name='pricingName']");
				if(pricingName)
					pricingName.disabled = false;
				this.event.changeInfiniteYn();
			}
		},
		event : {
			setDefault : function() {
				const form = this.self.container.querySelector("form");
				const setValue = (name, value, isDisable) => {
					const input = form.querySelector("[name='" + name + "']");
					const inputYn = form.querySelector("[name='" + name + "Yn']");
					if(!input) return;
					input.value = value;
					input.disabled = isDisable;
					if(inputYn) inputYn.checked = isDisable;
				};
				setValue("cancelNumber", 0, true);
				setValue("forceCancelNumber", 0, false);
				setValue("pauseNumber", 0, true);
				setValue("pausePeriod", 0, true);
				setValue("maxBookingNumber", 0, true);
				form.putValue("defaultBranchYn", "Y");
				form.putValue("coachAndSpaceList", "");
			},
			getForm : function(form) {
				const isBranch = (partnerInfo.partner.branchUseYn == "Y");
				const li = form.parentTagName("li");
				const mode = this.self.mode;
				const serviceInfo = this.self.data.serviceInfo;
				const serviceType = serviceInfo.serviceType;
				const seqService = serviceInfo.seqService;
				const serviceCategory = (serviceInfo.seqPackage) ? "PACKAGE" : "NORMAL";

				const getBranchTypeList = () => {
					return Array.from(form.querySelectorAll("[name='seqPartnerBranchType']:checked")).map(item => {
						return {seqPartnerBranchType : Number(item.value)}
					});
				};
				const getBranchList = () => {
					if(serviceType == "APPOINTMENT") return [];
					let branchList = form.getValue("branchList");
					branchList = (branchList) ? branchList.split(",") : [];
					return branchList.map(item => {
						return {seqPartnerBranch : Number(item)}
					});
				};
				const getCoachAndSpaceList = () => {
					if(serviceType == "APPOINTMENT") {
						if(isBranch) {
							const coachAndSpaceList = form.getValue("coachAndSpaceList");
							return (coachAndSpaceList) ? JSON.parse(coachAndSpaceList) : [];
						} else {
							const getCoachList = () => {
								let value = form.querySelector("[name='coaches']").getAttribute("data-value");
								return (value) ? value.split(",").map(item => Number(item)).filter(item => (item)) : [];
							};
							return [{
								seqPartnerBranch : 0,
								seqPartnerCoaches : getCoachList(),
								seqPartnerSpace : form.getValue("seqPartnerSpace", true)
							}]
						}
					}
					return [];
				};

				const price = form.getValue("price");
				const detailList = [{
					seqService : seqService,
					seqPackage : 0,
					seqPricingDetail : form.getValue("seqPricingDetail"),
					price : (price) ? getNumber(price) : "",
					usePeriodType : form.getValue("usePeriodType"),
					usePeriod : form.getValue("usePeriod"),
					useNumber : form.getValue("useNumber") || -1,
					dayLimit : form.getValue("dayLimit"),
					weekLimit : form.getValue("weekLimit"),
					cancelNumber : (form.getValue("cancelNumberYn") == "Y") ? -1 : form.getValue("cancelNumber"),
					forceCancelNumber : (form.getValue("forceCancelNumberYn") == "Y") ? -1 : form.getValue("forceCancelNumber"),
					pauseNumber : (form.getValue("pauseNumberYn") == "Y") ? -1 : form.getValue("pauseNumber"),
					pausePeriod : (form.getValue("pauseNumberYn") == "Y") ? -1 : form.getValue("pausePeriod"),
					maxBookingNumber : (form.getValue("maxBookingNumberYn") == "Y") ? -1 : form.getValue("maxBookingNumber"),
					seqSalesClassification : form.getValue("seqSalesClassification"),
					defaultBranchYn : form.getValue("defaultBranchYn") || "Y",
					coachAndSpaceList : getCoachAndSpaceList(),
					branchTypes : getBranchTypeList(),
					branches : getBranchList()
				}];

				const isLimitNumber = (serviceType == "APPOINTMENT" || serviceType == "CLASS");
				let sumPrice = 0;

				detailList.forEach(item => {
					sumPrice += item.price;
					if(!isLimitNumber) {
						delete item.cancelNumber;
						delete item.forceCancelNumber;
						delete item.maxBookingNumber;
					}
				});

				const result = {
					seqService : seqService,
					serviceCategory : serviceCategory,
					pricingName : form.getValue("pricingName").trim(),
					normalPrice : sumPrice,
					price : sumPrice,
					taxFreeYn : form.getValue("taxFreeYn"),
					saleYn : (li) ? li.getValue("saleYn") : "Y",
					details : detailList
				};

				if(mode == "update") {
					delete result.seqService;
					delete result.serviceCategory;
				}
				result.details.forEach(item => {
					if(mode == "update") {
						delete item.seqService;
						delete item.seqPackage;
					} else {
						delete item.seqPricingDetail;
					}
				});
				return result;
			},
			check : function(data, form) {
				const isBranch = (partnerInfo.partner.branchUseYn == "Y");
				const serviceInfo = this.self.data.serviceInfo;
				const serviceKind = serviceInfo.serviceKind;
				const serviceType = serviceInfo.serviceType;
				for(let name in data) {
					if(typeof data[name] == "object")
						if(!this.check(data[name], form)) return false;

					const value = data[name];
					const isEmpty = (value === "") ? true : false;
					let error = "";
					switch(name) {
						case "pricingName"				: if(isEmpty) error = "상품명을 입력해 주세요."; break;
						case "price"					: if(isEmpty) error = "판매가를 입력해 주세요."; break;
						case "usePeriod"				: if(isEmpty || Number(value) < 1) error = "이용기간을 입력해 주세요."; break;
						case "useNumber"				: if(serviceKind == "N" && (isEmpty|| Number(value) < 1)) error = "이용횟수를 입력해 주세요."; break;
						case "dayLimit"					: if(isEmpty) error = "일일 이용제한을 선택해 주세요."; break;
						case "weekLimit"				: if(isEmpty) error = "주간 이용제한을 선택해 주세요."; break;
						case "cancelNumber"				: if(isEmpty) error = "취소권을 입력해 주세요."; break;
						case "forceCancelNumber"		: if(isEmpty) error = "특별 취소권을 입력해 주세요."; break;
						case "pauseNumber"				: if(isEmpty) error = "중지권 횟수를 입력해 주세요."; break;
						case "pausePeriod"				: if(isEmpty) error = "중지권 일수를 입력해 주세요."; break;
						case "maxBookingNumber"			: if(isEmpty) error = "최대예약횟수를 입력해 주세요."; break;
						case "branches"					:
							if(isBranch && (serviceType == "CLASS" || serviceType == "PLACE"))	{
								if(!data.branches.length && !data.branchTypes.length && data.defaultBranchYn == "N")
									error = "이용가능 지점 및 유형 중 하나를 선택해 주세요.";
							}
							break;
						case "coachAndSpaceList"	:
							if(!isBranch && serviceType == "APPOINTMENT") {
								const seqPartnerSpace = data.coachAndSpaceList[0].seqPartnerSpace;
								if(!seqPartnerSpace) {
									error = "수업 장소를 선택해 주세요.";
								}
							}
							break;
					}
					if(error) {
						alert(error);
						if(form) {
							const input = form.querySelector("[name='" + name + "']");
							if(input) input.focus();
						}
						return false;
					}
				}
				return true;
			},
			create : function(object) {
				const form = object.parentTagName("form");
				this.self.mode = "create";
				const data = this.getForm(form);
				if(!this.check(data.details, form) || !this.check(data, form)) return;

				pricingController.create(data).then(data => {
					this.self.data.pricingInfo = data;
					alert("등록되었습니다.");
					if(componentProduct.mode == "create") {
						window.location.href = "/services";
					} else {
						this.self.update();
					}
				}).catch(error => {
					uiError(error);
				});
			},
			update : function(object) {
				const seqPricing = Number(object.getAttribute("data-sequence"));
				this.self.mode = "update";

				const form = object.parentTagName("form");
				const data = this.getForm(form);
				if(!this.check(data.details, form) || !this.check(data, form)) return;

				const getChangeList = (data, seqPricing) => {
					const pricingList = this.self.data.pricingList;
					const pricingInfo = pricingList.filter(item => {
						return(item.seqPricing == seqPricing);
					})[0];

					const getOldPricingDetail = (seqPricingDetail) => {
						const detailList = pricingInfo.details || [];
						return detailList.filter(item => {
							return (item.seqPricingDetail == seqPricingDetail);
						})[0];
					};

					const isSpaceChanged = (oldItem, newItem) => {
						const before = oldItem.coachAndSpaceList || [];
						const after = newItem.coachAndSpaceList || [];
						if(before.length != after.length) return true;
						const isChanged = (a, b) => {
							return a.some(item => {
								const seqPartnerBranch = item.seqPartnerBranch || 0;
								const seqPartnerSpace = item.seqPartnerSpace;
								const branchInfo = b.filter(item => ((item.seqPartnerBranch || 0) == seqPartnerBranch))[0];
								if(!branchInfo) return true;
								if(seqPartnerSpace != branchInfo.seqPartnerSpace) return true;
								return false;
							});
						};
						return (isChanged(before, after) || isChanged(after, before));
					};

					const changeList = [];
					const orderChangeList = [];

					data.details.forEach(item => {
						const oldItem = getOldPricingDetail(item.seqPricingDetail);
						const newItem = item;
						if(newItem.coachAndSpaceList != undefined && isSpaceChanged(oldItem, newItem)) changeList.push("수업 장소 변경");
						if(newItem.weekLimit != undefined && oldItem.weekLimit != newItem.weekLimit) changeList.push("주간 이용제한");
						if(newItem.dayLimit != undefined && oldItem.dayLimit != newItem.dayLimit) changeList.push("일일 이용제한");
						if(newItem.cancelNumber != undefined && oldItem.cancelNumber != newItem.cancelNumber) changeList.push("예약 취소권");
						if(newItem.forceCancelNumber != undefined && oldItem.forceCancelNumber != newItem.forceCancelNumber) changeList.push("특별 취소권");
						if(newItem.pauseNumber != undefined && oldItem.pauseNumber != newItem.pauseNumber) changeList.push("중지권");
						if(newItem.pausePeriod != undefined && oldItem.pausePeriod != newItem.pausePeriod) changeList.push("중지권");
						if(newItem.maxBookingNumber != undefined && oldItem.maxBookingNumber != newItem.maxBookingNumber) changeList.push("최대 예약권");
					});

					["수업 장소 변경", "주간 이용제한", "일일 이용제한", "예약 취소권", "특별 취소권", "중지권", "최대 예약권"].forEach(item => {
						if(orderChangeList.indexOf(item) == -1 && changeList.indexOf(item) > -1)
							orderChangeList.push(item);
					});
					return orderChangeList;
				};

				const update = (isBatch) => {
					pricingController.update(seqPricing, data, isBatch).then(data => {
						alert("수정되었습니다.");
						if(componentProduct.data.seqPricing) {
							window.location.reload(true);
							// window.location.href = "/services";
						} else {
							this.self.update();
						}
					}).catch(error => {
						uiError(error);
					});
				};

				const changeList = getChangeList(data, seqPricing);
				if(changeList.length > 0) {
					popupConfirmBatch.open("pricing", changeList, (isBatch) => {
						update(isBatch);
					});
				} else {
					update();
				}
			},
			remove : function(object) {
				const seqPricing = Number(object.getAttribute("data-sequence"));
				if(!confirm("정말로 삭제하시겠습니까?")) return;
				pricingController.remove(seqPricing).then(data => {
					alert("삭제되었습니다.");
					this.self.update();
				}).catch(error => {
					uiError(error);
				});
			},
			autoNaming : function(object) {
				const serviceInfo = this.self.data.serviceInfo;
				const form = object.parentTagName("form");
				const isAutoNaming = (form.querySelector("[name='autoNameYn']:checked"));
				const input = form.querySelector("[name='pricingName']");
				if(input) input.disabled = (isAutoNaming);
				if(!isAutoNaming) return;

				const serviceName = serviceInfo.serviceName;
				const serviceKind = serviceInfo.serviceKind;
				const usePeriod = form.getValue("usePeriod");
				const usePeriodType = form.getValue("usePeriodType");
				const servicePeriod = usePeriod + ((usePeriodType == "M") ? "개월" : "일");
				const useNumber = Number(form.getValue("useNumber"));

				if(serviceKind == "P") {
					input.value = (usePeriod) ? `${serviceName} ${servicePeriod}` : ``;
				} else {
					input.value = (useNumber && usePeriod) ? `${serviceName} ${useNumber}회 ${servicePeriod}` : ``;
				}
			},
			changeInfiniteYn : function(object) {
				if(object) {
					const input = object.parentNode.parentNode.querySelectorAll("input");
					const isCheck = object.checked;
					for(let i = 0; i < input.length - 1; i++) {
						if(isCheck) input[i].value = 0;
						input[i].disabled = (isCheck);
					}
				} else {
					const input = this.self.container.querySelectorAll("[data-event='infinite']");
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
			changeCoach : function(object) {
				const name = object.name;
				const ul = object.parentNode.parentNode.parentNode.parentNode;
				const optionList = ul.querySelectorAll("[name='" + name + "']");
				const value = object.value;
				if(value) {
					optionList[1].checked = false;
				} else {
					optionList[1].checked = true;
					optionList.forEach(item => {
						if(item.value)
							item.checked = false;
					});
				}
			}
		},
		template : function() {
			const mode = this.mode;
			const isBranch = (partnerInfo.partner.branchUseYn == "Y");
			const serviceInfo = this.data.serviceInfo;
			const pricingInfo = this.data.pricingInfo;
			const serviceKind = serviceInfo.serviceKind;
			const serviceType = serviceInfo.serviceType;
			const saleYn = pricingInfo.saleYn;

			const getPricingName = () => {
				return (mode != "popup") ? `
					<li>
						<h4 class="required">이용권 상품명</h4>
						<dl class="option">
							<dt>
								<input class="name" name="pricingName" type="text" maxlength="30" placeholder="이용권 상품명 입력" disabled tabIndex>
							</dt>
							<dd>
								<label class="ui-input-checkbox">
									<input name="autoNameYn" type="checkbox" data-event="autoNaming" checked>
									<span></span>
									이름 자동 완성
								</label>
							</dd>
						</dl>
					</li>
				` : ``;
			};

			const getUseNumber = () => {
				return (serviceKind == "N") ? `
					<li>
						<h4 class="required">이용횟수</h4>
						<div class="unit">
							<input class="unit" name="useNumber" type="integer" min="0" max="10000" data-event="autoNaming" placeholder="이용권 횟수 입력" tabIndex>
							<span>회</span>
						</div>
					</li>
				` : ``;
			};

			const getLimitNumber = () => {
				return (serviceType == "APPOINTMENT" || serviceType == "CLASS") ? `
					<li>
						<h4 class="required">이용설정</h4>
						<ul class="limit">
							<li>
								<dl>
									<dt>
										<label>
											예약 취소권<input name="cancelNumber" type="integer" min="0" max="10000" tabIndex>회
										</label>
										<label class="ui-input-checkbox">
											<input name="cancelNumberYn" type="checkbox" data-event="infinite">
											<span></span>
											무제한
										</label>
									</dt>
									<dd>
										<label>
											특별 취소권<input name="forceCancelNumber" type="integer" min="0" max="10000" tabIndex>회
										</label>
										<label class="ui-input-checkbox">
											<input name="forceCancelNumberYn" type="checkbox" data-event="infinite">
											<span></span>
											무제한
										</label>
									</dd>
								</dl>
							</li>
							<li>
								<label>
									중지권<input name="pauseNumber" type="integer" min="0" max="10000" tabIndex>회
									<input name="pausePeriod" type="integer" min="0" max="10000" tabIndex>일
								</label>
								<label class="ui-input-checkbox">
									<input name="pauseNumberYn" type="checkbox" data-event="infinite">
									<span></span>
									무제한
								</label>
							</li>
							<li>
								<label>
									최대 예약권<input name="maxBookingNumber" type="integer" min="0" max="10000" tabIndex>회
								</label>
								<label class="ui-input-checkbox">
									<input name="maxBookingNumberYn" type="checkbox" data-event="infinite">
									<span></span>
									무제한
								</label>
							</li>
						</ul>
					</li>
				` : `
					<li>
						<h4 class="required">이용설정</h4>
						<div class="limit">
							<label>
								중지권<input name="pauseNumber" type="integer" min="0" max="10000" tabIndex>회
								<input name="pausePeriod" type="integer" min="0" max="10000" tabIndex>일
							</label>
							<label class="ui-input-checkbox">
								<input name="pauseNumberYn" type="checkbox" data-event="infinite">
								<span></span>
								무제한
							</label>
						</div>
					</li>
				`;
			};

			const getBranchInfo = () => {
				if(!(isBranch && (serviceType == "APPOINTMENT" || serviceType == "CLASS" || serviceType == "PLACE"))) return "";

				const getBranchTypeList = () => {
					if(!(serviceType == "CLASS" || serviceType == "PLACE")) return "";
					const isDisabled = (partnerInfo.partner.headquartersYn == "Y") ? "" : "disabled";
					const branchTypeList = this.data.branchTypeList.map(item => {
						return `
							<label class="ui-input-checkbox">
								<input name="seqPartnerBranchType" type="checkbox" value="${item.seqPartnerBranchType}" ${isDisabled}>
								<span></span>
								${item.name}
							</label>
						`;
					});
					return `
						<li>
							<h4>이용가능 지점의 유형</h4>
							<div>${branchTypeList.join("")}</div>
						</li>
					`;
				};
				const title = (serviceType == "APPOINTMENT") ? "판매 지점 및 레슨 강사" : "이용가능 지점";
				const isHidden = (serviceType == "APPOINTMENT") ? "hidden" : "";

				return `
					${getBranchTypeList()}
					<li>
						<h4>${title}</h4>
						<dl class="option">
							<dt>
								<label class="ui-input-search">
									<input placeholder="${title} 선택" readonly>
									<button class="ui-button" type="button" data-type="${serviceType}" data-event="branch">지점 선택</button>
									<input name="branchList" type="hidden">
									<input name="coachAndSpaceList" type="hidden">
								</label>
							</dt>
							<dd class="${isHidden}">
								<label class="ui-input-checkbox">
									<input name="defaultBranchYn" type="checkbox" data-event="defaultBranchYn" checked>
									<span></span>
									판매지점 추가
								</label>
							</dd>
						</dl>
					</li>
				`;
			};

			const getCoachSpaceInfo = () => {
				if(isBranch || serviceType != "APPOINTMENT") return "";
				const getCoachList = () => {
					const option = this.data.coachList.map(item => {
						return `<option value="${item.seqPartnerCoach}" data-event="changeCoach">${item.coachName}</option>`;
					});
					return option.join("");
				};
				const getSpaceList = () => {
					const option = this.data.placeList.map(item => {
						return `<option value="${item.seqPartnerSpace}">${item.spaceName}</option>`;
					});
					return option.join("");
				};
				return `
					<li>
						<h4 class="required">레슨 강사</h4>
						<select class="ui-select wide" name="coaches" data-unit="명" data-ellipsis="5" max="10" multiple>
							<option value="">레슨 강사 선택</option>
							<option value="" data-event="changeCoach" selected>미지정</option>
							${getCoachList()}
						</select>
					</li>
					<li>
						<h4 class="required">수업 장소</h4>
						<select class="ui-select wide" name="seqPartnerSpace">
							<option value="">수업 장소 선택</option>
							${getSpaceList()}
						</select>
					</li>
				`;
			};

			const getSalesClassification = () => {
				const option = this.data.salesClassificationList.map(item => {
					return `<option value="${item.seqSalesClassification}">${item.salesClassificationName}</option>`
				});
				return `
					<li>
						<h4>매출분류</h4>
						<select class="ui-select" name="seqSalesClassification" tabIndex>
							<option value="">선택해 주세요.</option>
							<option value="0" selected>선택안함</option>
							${option.join("")}
						</select>
					</li>
				`;
			};

			const getNote = () => {
				return (this.mode == "update") ? `
					<li class="note">
						ⓘ 모든 수정 내용은 변경 후 신규 예약 건 부터 적용됩니다.
					</li>
				` : ``;
			};

			const getLimitList = (min, max) => {
				const option = [];
				for(let i = min; i <= max; i++) {
					option.push(`<option value="${i}">${i}</option>`);
				}
				return option.join("");
			};

			const getBottom = () => {
				if(mode == "package") return "";
				if(serviceInfo.saleYn == "N") return "";
				const button = (mode == "update") ? `
					<!--<button class="ui-button red" type="button" data-event="remove" data-sequence="${pricingInfo.seqPricing}" data-permission="permissionProduct/modifyUsage">삭제하기</button>-->
					<button class="ui-button green" type="button" data-event="update" data-sequence="${pricingInfo.seqPricing}" data-permission="permissionProduct/modifyUsage">수정하기</button>
				` : `
					<button class="ui-button blue" type="button" data-event="create" data-permission="permissionProduct/registProduct">등록하기</button>
				`;
				return `
					<div class="bottom">
						${button}
					</div>
				`;
			};

			const isReadonly = (mode == "package") ? "" : (serviceInfo.saleYn == "N") ? "readonly" : "";
			const isHidden = (mode == "package") ? "hidden" : "";
			const isHiddenRight = (mode == "package") ? "hidden-right" : "";

			return `
				<div class="left">
					<form class="ui-form" onsubmit="return false" autocomplete="off">
						<div class="middle ${isReadonly}">
							<input type="hidden" name="seqPricingDetail">
							<ul>
								<li class="${isHidden}">
									<h4 class="required">이용권 상품명</h4>
									<dl class="option">
										<dt>
											<input class="name" name="pricingName" type="text" maxlength="30" placeholder="이용권 상품명 입력" disabled tabIndex>
										</dt>
										<dd>
											<label class="ui-input-checkbox">
												<input name="autoNameYn" type="checkbox" data-event="autoNaming" checked>
												<span></span>
												이름 자동 완성
											</label>
										</dd>
									</dl>
								</li>
								<li class="${isHiddenRight}">
									<h4 class="required">이용권 판매가</h4>
									<dl class="option">
										<dt>
											<div class="unit">
												<input class="unit" name="price" type="currency" min="0" max="100000000" placeholder="이용권 판매가 입력" data-event="price" tabIndex>
												<span>원</span>
											</div>
										</dt>
										<dd class="taxFreeYn">
											<label class="ui-input-checkbox">
												<input name="taxFreeYn" type="checkbox">
												<span></span>
												비과세 여부
											</label>
										</dd>
									</dl>
								</li>
								<li>
									<h4 class="required">이용기간</h4>
									<dl>
										<dt>
											<input name="usePeriod" type="integer" min="0" max="10000" data-event="autoNaming" placeholder="이용권 기간 입력" tabIndex>
										</dt>
										<dd>
											<select class="ui-select" name="usePeriodType" data-event="autoNaming">
												<option value=""></option>
												<option value="M" selected>개월</option>
												<option value="D">일</option>
											</select>
										</dd>
									</dl>
								</li>
								${getUseNumber()}
								${getCoachSpaceInfo()}
								<li>
									<dl>
										<dt>
											<h4 class="required">일일 이용제한</h4>
											<select class="ui-select unit" name="dayLimit" required>
												<option value="">일일 이용제한 선택</option>
												<option value="-1" selected>무제한</option>
												${getLimitList(1, 2)}
											</select>
										</dt>
										<dd>
											<h4 class="required">주간 이용제한</h4>
											<select class="ui-select unit" name="weekLimit" required>
												<option value="">주간 이용제한 선택</option>
												<option value="-1" selected>무제한</option>
												${getLimitList(1, 7)}
											</select>
										</dd>
									</dl>
								</li>
								${getLimitNumber()}
								${getBranchInfo()}
								${getSalesClassification()}
								<!--
									<li class="hidden">
										<h4>판매여부</h4>
										<label class="ui-input-switch">
											<input type="checkbox" name="saleYn" data-event="saleYn" checked>
											<span></span>
											<span>중지</span>
											<span>판매</span>
										</label>
									</li>
								-->
								${getNote()}
							</ul>
						</div>
						${getBottom()}
					</form>
				</div>
				${this.description()}
			`;
		},
		description : function() {
			const serviceInfo = this.data.serviceInfo;
			const serviceType = serviceInfo.serviceType;
			const getAppointment = () => {
				return (serviceType == "APPOINTMENT") ? `
					<li>
						<h4>레슨 강사</h4>
						<p>
							개인 레슨 이용권 생성시 수업 진행 강사를 설정할 수 있습니다.<br>
							강사는 총 10명까지 선택이 가능하며, 강사 미지정시 센터에 등록된 강사 전체를 최대 10명까지 자동으로 설정합니다.<br>
							회원이 개인레슨 이용권 구매시 앱 이용권 상세정보에 강사소개 글이 표시됩니다.<br>
							강사 소개글은 인사관리 → 임직원 관리 → 임직원 수정 페이지 강사님 한마디에 작성할 수 있습니다.<br>
							<a class="blue" href="/coach" target="_blank">강사님 한마디 설정 →</a>
						</p>
					</li>
					<li>
						<h4>수업 장소</h4>
						<p>
							센터관리 → 센터설정 → 운영관리 → 장소 정보 설정에 추가 해놓은 수업 장소를 설정할 수 있습니다.<br>
							이용권에 설정된 장소의 인원수에 따라서 회원이 동 시간대 예약할 수 있는 총 인원을 제한할 수 있습니다.<br>
							<a class="blue" href="/partner/operation" target="_blank">장소 정보 설정 →</a>
						</p>
					</li>
				` : ``;
			};
			return (this.data.isDescription) ? `
				<div class="right">
					<ul>
						<li>
							<ul>
								<li>
									<h4>이용권 상품명</h4>
									<p>센터 관리자가 이용권 상품명을 입력합니다. 이용권 상품명은 센터와 회원 별 판매(매출) 내역으로 기록됩니다. 이용권 상품명은 ‘이용권 종류명, 전체횟수, 이용기간’으로 자동으로 표기되며, 센터 관리자에 필요에 따라 수정할 수 있습니다.</p>
								</li>
								<li>
									<h4>판매가</h4>
									<p>
										이용권 상품의 정상 판매가격을 입력합니다.<br>
										이용권 상품의 현장 판매 시, 센터 관리자의 권한에 따라 판매가격 수정이나 할인권 적용이 가능하며, 판매가는 할인이 적용되지 않은 정상가격을 입력할 수 있습니다.<br>
										또한 비페이를 통한 이용권 판매 시, 회원 별로 발급된 쿠폰을 적용할 수 있습니다.
									</p>
								</li>
								${getAppointment()}
								<li>
									<h4>이용기간과 이용횟수</h4>
									<p>이용권의 전체 이용 가능한 기간과 횟수를 설정할 수 있습니다. 회원의 이용권의 이용기간이 경과되거나 이용횟수를 모두 소진하면 이용권은 자동으로 만료됩니다.</p>
								</li>
								<li>
									<h4>판매분류</h4>
									<p>이용권 상품의 판매 매출을 구분할 수 있습니다. 판매분류 설정은 센터 설정 메유에서 추가하거나 수정할 수 있습니다.</p>
								</li>
							</ul>
						</li>
						<li>
							<h3><span>이용 설정</span></h3>
							<ul>
								<li>
									<h4>예약 취소권(구 : 취소권)</h4>
									<p>무분별한 예약, 예약취소를 방지하기 위해 이용권 이용기간 동안 총 예약을 취소할 수 있는 최대 횟수를 제한할 수 있습니다. 예약취소는 예약정책에 설정된 예약취소 가능 시간에만 취소가 가능하며, 취소권을 모두 소진한 경우 예약취소 가능 시간에도 예약 취소가 불가능합니다. 단, 관리자는 취소권에 영향을 받지 않고 예약 취소가 가능합니다.</p>
								</li>
								<li>
									<h4>특별 취소권(구 : 휴회권)</h4>
									<p>예약취소는 예약정책에 설정된 예약취소 가능 시간에만 취소가 가능하지만, 특별 취소권이 있는 경우 예약 취소가 불가능한 시간에도 회원이 직접 취소할 수 있는 특별한 권한입니다. 기본 0회로 설정하며, 예약취소 가능 시간에 아직 익숙하지 않은 회원이나 특정 회원을 대상으로 특별 취소권을 부여할 수 있습니다.</p>
								</li>
								<li>
									<h4>중지권</h4>
									<p>회원이 이용권의 이용기간 내에 이용 중지할 수 있는 최대 일수와 횟수를 지정합니다. (중지기간 동안에는 해당 이용권으로 입장, 수업예약이 불가능 하며, 중지된 기간만큼 만료일을 자동 연장되게 됩니다.)</p>
								</li>
								<li>
									<h4>최대 예약권(구 : 최대 예약횟수)</h4>
									<p>무분별한 사전 예약을 방지하기 위해 이용권 이용기간 동안 동시에 총 예약할 수 있는 최대 횟수를 제한할 수 있습니다. 최대 예약횟수가 3회인 경우 동시에 3회 예약이 가능하고 예약된 일정이 취소되거나 출석이나 결석으로 변경된 후 추가 예약이 가능합니다.</p>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			` : ``;
		}
	},
};