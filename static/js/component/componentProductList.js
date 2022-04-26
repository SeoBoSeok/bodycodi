const componentProductList = {
	container : undefined,
	data : {
		permission : {},
		serviceList : [],
		pricingList : [],
		filterServiceList : [],
		filter : {
			isFilter : false,
			serviceCategory : "",
			serviceType : [],
			serviceKind : [],
			searchWord : "",
			sort : "name"
		},
	},
	open : function(mode) {
		Promise.all([
			serviceController.normal.list(),		// 서비스(단일)
			serviceController.package.list(),		// 서비스(패키지)
			pricingController.list(),				// 가격정책
			commonController.branch.type.list(),	// 지점 타입 목록
			// permissionController.getList()			// 권한
		]).then(([serviceList, packageServiceList, pricingList, branchTypeList, permission]) => {
			if(!serviceList) serviceList = [];
			if(!packageServiceList) packageServiceList = [];
			if(!pricingList) pricingList = [];
			if(!branchTypeList) branchTypeList = [];

			const setOrderList = (data) => {
				const orderList = {
					PACKAGE : [],
					APPOINTMENT :[],
					CLASS : [],
					PLACE : [],
					OPTION : []
				};
				data.forEach(item => {
					const serviceType = item.serviceType || (item.serviceInfo && item.serviceInfo.serviceType);
					if(serviceType) orderList[serviceType].push(item);
				});
				let orderData = [];
				for(const item in orderList)
					orderData = orderData.concat(orderList[item]);
				return orderData;
			};

			const saleYn = (mode == "remove") ? "N" : "Y";

			// 서비스 목록
			this.data.serviceList = setOrderList(packageServiceList.map(item => {
				item.serviceCategory = item.serviceType = "PACKAGE";
				return item;
			}).concat(serviceList.map(item => {
				item.serviceCategory = "NORMAL";
				return item;
			})).filter(item => {
				// 판매 이용권 : 서비스 판매 상태가 Y이고, 가격정책의 판매 상태가 Y인 경우
				// 중지 이용권 : 서비스 판매 상태가 N이거나 가격정책의 판매 상태가 N을 포함하는 경우
				return (saleYn == "Y") ? item.saleYn == saleYn : true;
			}));

			// 가격정책 목록
			this.data.pricingList = pricingList;

			console.log('pricingList', pricingList);

			// 서비스 + 가격정책 목록
			this.data.serviceList.forEach(serviceInfo => {
				const pricingList = this.data.pricingList.filter(item => {
					return (item.serviceCategory == serviceInfo.serviceCategory &&
							(item.seqService == serviceInfo.seqService || item.seqService == serviceInfo.seqPackage));
				});
				serviceInfo.pricingList = (pricingList || []).filter(item => {
					return (item.saleYn == saleYn);
				});
			});

			// 서비스 판매 상태가 Y인데, 가격정책 판매 상태가 N을 포함하고 있지 않을 경우 해당 서비스는 제외 시킨다.
			if(saleYn == "N") {
				this.data.serviceList = this.data.serviceList.filter(item => {
					if(item.saleYn == "Y") {
						return (item.pricingList.length);
					} else {
						return true;
					}
				});
			}

			// 지점 유형 정보
			const branchTypeInfo = {};
			branchTypeList.forEach(item => {
				branchTypeInfo[item.seqPartnerBranchType] = item.name;
			});
			this.data.branchTypeInfo = branchTypeInfo;
			this.data.saleYn = saleYn;

			// 권한 정보
			this.data.permission = uiPermission.data = permission;

			this.serviceList.data = this.pricingList.data = this.data;
			this.render();
		}).catch(error => {
			uiError(error);
		});
	},
	update : function() {
		const nodeList = this.container.querySelectorAll("[name='filter']:checked");
		const checkList = Array.from(nodeList).filter(item => {
			return (item.value);
		}).map(item => {
			return item.value;
		});

		const getCheckBox = (name) => {
			const nodeList = this.container.querySelectorAll("[name='filter'][data-category='" + name + "']:checked");
			return Array.from(nodeList).map(item => {
				return item.value;
			});
		};

		const searchWord = this.container.getValue("searchWord").trim();
		this.data.filter = {
			isFilter : (checkList.length != 0),
			serviceCategory : getCheckBox("serviceCategory")[0],
			serviceType : getCheckBox("serviceType"),
			serviceKind : getCheckBox("serviceKind"),
			searchWord : (searchWord.length > 1) ? searchWord : "",
			sortType : this.container.getValue("sortType"),
			emptyYn : (this.container.getValue("emptyYn") == "Y") ? "N" : "Y",
		};
		this.serviceList.open();
		this.pricingList.open();
	},
	render : function() {
		this.container = document.querySelector("main");
		const self = this;
		const setFilter = () => {
			const container = this.container.querySelector("[data-id='filter']");
			const nodeList = container.querySelectorAll("[data-event='filter']");
			const j = nodeList.length;
			nodeList.forEach((item, index) => {
				const setCheck = function(start, end, value) {
					for(let i = start; i < end; i++)
						nodeList[i].checked = value;
				};

				item.addEventListener("change", function() {
					// 서비스 타입에 맞게 변경
					if(0 < index && index < 8) {
						nodeList[7].checked = true;
						nodeList[8].checked = false;
					}

					// '패키지 서비스'가 체크된 경우 단일 서비스 관련 체크 취소
					if(nodeList[8].checked)
						setCheck(1, 8, false);

					// '전체'가 체크된 경우 나머지 체크 전부 취소
					if(index == 0 && item.checked) {
						setCheck(1, j, false);
					} else {
						// '전체' 체크 여부
						let count = 0;
						for(let i = 1; i < j; i++)
							if(nodeList[i].checked) count++;
						if(index > 0 && item.checked)
							nodeList[0].checked = false;
						if(count == 0 || count == j - 1) {
							nodeList[0].checked = true;
							setCheck(1, j, false);
						}
					}
					self.update();
				});
			});
		};
		const setSort = () => {
			const container = this.container.querySelector("[data-id='filter']");
			const nodeList = container.querySelectorAll("[data-event='display']");
			nodeList.forEach(item => {
				item.addEventListener("change", () => {this.update()});
			});
		};
		const setSearch = () => {
			const container = this.container.querySelector("[data-id='search']");
			const input = container.querySelector("[name='searchWord']");
			const doSearch = () => {
				const value = container.getValue("searchWord");
				if(this.data.filter.searchWord == value) return;
				this.update();
			};
			uiEvent(container, {
				click : {
					submit : function() {
						doSearch();
					},
					reset : function() {
						input.value = "";
						container.classList.remove("focus");
						doSearch();
					}
				},
				input : {
					searchWord : function() {
						const value = this.value.trim();
						if(value) container.classList.add("focus");
						else container.classList.remove("focus");
						doSearch();
					}
				}
			});
		};
		const setTitle = () => {
			const container = this.container.querySelector("[data-id='title']");
			uiEvent(container, {
				click : {
					create : function() {
						const serviceType = this.getAttribute("data-type") || "";
						const serviceCategory = this.getAttribute("data-category");
						if(serviceCategory == "package") {
							window.location.href = "/services/package/create";
						} else {
							window.location.href = "/services/create" + ((serviceType ? "?serviceType=" + serviceType : ""));
						}
						return;
					}
				}
			});
			uiPermission(container);
		};
		setFilter();
		setSort();
		setSearch();
		setTitle();
		this.update();
	},

	serviceList : {
		container : undefined,
		data : {},
		open : function() {
			this.render();
		},
		filter : function(data) {
			const filter = this.data.filter;
			if(filter.isFilter) {
				data = data.filter(item => {
					if(filter.serviceCategory != item.serviceCategory) return false;
					if(filter.serviceType.length > 0) {
						if(filter.serviceType.indexOf(item.serviceType) == -1) return false;
					}
					if(filter.serviceKind.length > 0) {
						if(filter.serviceKind.indexOf(item.serviceKind) == -1) return false;
					}
					return true;
				});
			}
			if(filter.searchWord.length > 1) {
				data = data.filter(item => {
					let result = false;
					const serviceName = item.serviceName || item.packageName || "";
					if(serviceName.indexOf(filter.searchWord) > -1) return true;
					if((item.pricingList || []).some(item => {
						return ((item.pricingName || "").indexOf(filter.searchWord) > -1);
					})) return true;
					return false;
				});
			}

			const sortType = filter.sortType;
			data = data.sort((a, b) => {
				let itemA, itemB;
				switch(sortType) {
					case "name" :
					case "price" :
						itemA = a.serviceName || a.packageName;
						itemB = b.serviceName || b.packageName;
						break;
					case "date" :
						itemA = new Date(a.regDt).getTime();
						itemB = new Date(b.regDt).getTime();
						break;
				}
				return (a.serviceType == b.serviceType) ? (itemA < itemB) ? -1 : (itemA > itemB) ? 1 : 0 : 0;
			});

			if(filter.emptyYn == "N") {
				data = data.filter(item => {
					return (item.pricingList.length);
				});
			}

			/*
			data.forEach(item => {
				item.pricingList = item.pricingList.sort((a, b) => {
					let itemA, itemB;
					switch(sortType) {
						case "name" :
							itemA = a.pricingName;
							itemB = b.pricingName;
							break;
						case "date" :
							itemA = new Date(a.regDt).getTime();
							itemB = new Date(b.regDt).getTime();
							break;
						case "price" :
							itemA = a.price;
							itemB = b.price;
							break;
					}
					return (itemA < itemB) ? -1 : (itemA > itemB) ? 1 : 0;
				});
			});
			*/
			return data;
		},
		render : function() {
			this.container = document.querySelector("[data-id='serviceList']");
			this.container.innerHTML = this.template();
			const self = this.event.self = this;
			uiEvent(this.container, {
				click : {
					changeFocus : function() {
						self.event.changeFocus(this);
					}
				}
			});
			const setDrop = () => {
				const aList = this.container.querySelectorAll("[data-event='drop']");
				aList.forEach(item => {
					const li = item.parentNode;
					const ul = li.querySelector("ul");
					ul.parentNode.style.height = ul.offsetHeight + "px";
					item.addEventListener("click", () => {
						li.classList.toggle("close");
					});
				});
			};
			setDrop();
		},
		event : {
			changeFocus : function(object) {
				const a = this.self.container.querySelectorAll("[data-event='changeFocus']");
				a.forEach(item => {
					if(item == object) {
						item.classList.toggle("focus");
						const isFocus = (item.classList.contains("focus"));
						const seqService = (isFocus) ? Number(object.getAttribute("data-sequence")) : 0;
						const serviceCategory = (isFocus) ? object.getAttribute("data-category") : "";
						componentProductList.pricingList.open(seqService, serviceCategory);
					} else {
						item.classList.remove("focus");
					}
				});
			},
		},
		template : function() {
			const serviceList = this.data.filterServiceList = this.filter(this.data.serviceList);
			const searchWord = this.data.filter.searchWord;

			const getServiceList = (serviceType) => {
				let li = serviceList.filter(item => {
					console.log(item.serviceType);
					console.log(item.seqService);
					return (serviceType == item.serviceType);
				}).map(item => {
					const isPackage = (item.serviceCategory == "PACKAGE");
					const seqService = (isPackage) ? item.seqPackage : item.seqService;
					const serviceType = (isPackage) ? "package" : item.serviceType.toLowerCase();
					const serviceCategory = (isPackage) ? "package" : "normal";
					const getServiceName = () => {
						let serviceName = (isPackage) ? item.packageName : item.serviceName;
						if(searchWord) {
							serviceName = serviceName.replaceAll(searchWord, "<i class='red'>" + searchWord + "</i>");
						}
						return serviceName;
					};
					return `<li><a data-type="${serviceType}" data-category="${serviceCategory}" data-sequence="${seqService}" data-event="changeFocus">${getServiceName()}</a></li>`;
				});
				li = (li.length) ? li.join("") : `<li class="empty">등록된 이용권 종류가 없습니다.</li>`;
				return `<ul>${li}</ul>`;
			};
			let li = [{
				serviceName : "패키지 이용권",
				serviceType : "PACKAGE",
			}, {
				serviceName : "개인레슨 이용권",
				serviceType : "APPOINTMENT"
			}, {
				serviceName : "그룹수업 이용권",
				serviceType : "CLASS"
			}, {
				serviceName : "시설 이용권",
				serviceType : "PLACE"
			}, {
				serviceName : "옵션 이용권",
				serviceType : "OPTION"
			}].filter(item => {
				const serviceType = item.serviceType;
				return serviceList.some(item => item.serviceType == serviceType);
			}).map(item => {
				const serviceColor = uiParameter.service.color[item.serviceType];
				const serviceInitial = item.serviceType.substr(0, 1);
				return `
					<li>
						<a class="${serviceColor}" data-event="drop">
							<em class="icon bg ${serviceColor}">${serviceInitial}</em>
							${item.serviceName}
						</a>
						<div>${getServiceList(item.serviceType)}</div>
					</li>
				`;
			});
			li = (li.length) ? li.join("") : `<li class="empty">검색 결과가 없습니다.</li>`;
			return `<ul>${li}</ul>`;
		}
	},

	pricingList : {
		container : undefined,
		data : {},
		open : function(seqService, serviceCategory) {
			this.data.serviceInfo = {
				seqService : seqService,
				serviceCategory : (serviceCategory || "").toUpperCase()
			};
			this.render();
		},
		/*
		filter : function(data) {
			const filter = this.data.filter;
			const serviceInfo = this.data.serviceInfo;
			console.log(serviceInfo);

			if(serviceInfo.seqService) {
				const serviceCategory = serviceInfo.serviceCategory.toUpperCase();
				const seqService = serviceInfo.seqService;
				data = data.filter(item => {
					return (item.serviceCategory == serviceCategory && item.seqService == seqService);
				});
				return data;
			}

			if(filter.isFilter) {
				data = data.filter(item => {
					if(filter.serviceCategory != item.serviceCategory.toUpperCase()) return false;
					if(item.serviceCategory == "NORMAL") {
						if(filter.serviceType.length > 0) {
							if(filter.serviceType.indexOf(item.serviceInfo.serviceType) == -1) return false;
						}
						if(filter.serviceKind.length > 0) {
							if(filter.serviceKind.indexOf(item.serviceInfo.serviceKind) == -1) return false;
						}
					}
					return true;
				});
			}

			if(filter.searchWord.length > 1) {
				data = data.filter(item => {
					let result = false;
					const pricingName = item.pricingName || "";
					if(pricingName.indexOf(filter.searchWord) > -1) return true;
					if(item.details.some(item => {
						const serviceName = (item.serviceInfo && item.serviceInfo.serviceName) ? item.serviceInfo.serviceName : "";
						return (serviceName.indexOf(filter.searchWord) > -1);
					})) return true;
					return false;
				});
			}
			return data;
		},
		*/
		render : function() {
			this.container = document.querySelector("[data-id='pricingList']");
			const li = [];
			const serviceInfo = this.data.serviceInfo;
			const searchWord = this.data.filter.searchWord;
			this.data.filterServiceList.filter(item => {
				return (serviceInfo.seqService) ? (item.serviceCategory == serviceInfo.serviceCategory &&
						(item.seqService == serviceInfo.seqService || item.seqPackage == serviceInfo.seqService)) : true;
			}).forEach(item => {
				if(item.serviceCategory == "PACKAGE") {
					item.pricingList.filter(item => {
						return (searchWord) ? ((item.pricingName || "").indexOf(searchWord) > -1) : true;
					}).forEach(item => {
						li.push(this.template(item));
					});
				} else {
					li.push(this.template(item));
				}
			});
			this.container.innerHTML = "<ul>" + ((li.length) ? li.join("") : `<li class="empty">검색 결과가 없습니다.</li>`) + "</ul>";

			const self = this;
			uiEvent(this.container, {
				click : {
					modify : function() {
						const isRemove = (self.data.saleYn == "N");
						const serviceCategory = this.getAttribute("data-category");
						const seqService = this.getAttribute("data-service") || "";
						const seqPricing = this.getAttribute("data-pricing") || "";
						let suffix = [];
						if(seqPricing) suffix.push("seqPricing=" + seqPricing);
						if(isRemove) suffix.push("isRemove=true");
						suffix = (suffix.length) ? "?" + suffix.join("&") : "";
						window.location.href = `/services/${serviceCategory}/${seqService}${suffix}`;
					}
				}
			});
			uiPermission(this.container);
		},
		template : function(item) {
			const isPackage = (item.serviceCategory == "PACKAGE");
			const isBranch = (partnerInfo.partner.branchUseYn == "Y");
			const branchTypeInfo = this.data.branchTypeInfo;
			const searchWord = this.data.filter.searchWord;

			const getState = (saleYn) => {
				return (saleYn == "Y") ?
					`<div class="green">판매중</div>` :
					`<div class="red">판매 중지</div>`;
			};

			const getName = function(name) {
				if(searchWord)
					name = name.replaceAll(searchWord, "<i class='red'>" + searchWord + "</i>");
				return name;
			};

			const getServiceInfo = (serviceInfo, pricingInfo) => {
				const getServiceType = () => {
					const serviceType = serviceInfo.serviceType;
					let serviceTypeName = uiParameter.service.name[serviceType];
					if(serviceType == "OPTION") {
						if(serviceInfo.optionType == "LOCKER")
							serviceTypeName += "(락커)";
					}
					return serviceTypeName;
				};
				const summary = [];
				summary.push(uiParameter.service.kind[serviceInfo.serviceKind]);
				summary.push(getServiceType());
				if(serviceInfo.serviceGenre)
					summary.push(serviceInfo.serviceGenre.serviceGenreName);
				if(serviceInfo.serviceTime)
					summary.push(serviceInfo.serviceTime + "분");
				if(serviceInfo.place)
					summary.push(serviceInfo.place.spaceName);
				if(isPackage) {
					const dayLimit = (pricingInfo.dayLimit < 0) ? "무제한" : (pricingInfo.dayLimit || "-") + "회";
					const weekLimit = (pricingInfo.weekLimit < 0) ? "무제한" : (pricingInfo.weekLimit || "-") + "회";
					summary.push("일일 : " + dayLimit + " · " + "주간 : " + weekLimit);
				}
				return summary.join(" / ");
			};

			const getPricingInfo = (item) => {
				const summary = [];
				if(isPackage) {
					summary.push(item.serviceInfo.serviceName);
				}
				if(item.serviceInfo.serviceKind == "N")
					summary.push(item.useNumber + "회");
				summary.push(item.usePeriod + ((item.usePeriodType == "M") ? "개월" : "일"));
				if(!isPackage) {
					const dayLimit = (item.dayLimit < 0) ? "무제한" : (item.dayLimit || "-") + "회";
					const weekLimit = (item.weekLimit < 0) ? "무제한" : (item.weekLimit || "-") + "회";
					summary.push("일일 : " + dayLimit + " · " + "주간 : " + weekLimit);
				}
				return (isPackage) ? summary.join(" ") : summary.join(" / ");
			};

			const getBranchTypeInfo = (item) => {
				if(!isBranch) return "";
				const serviceType = item.serviceInfo.serviceType;
				// if(!(serviceType == "APPOINTMENT" || serviceType == "CLASS" || serviceType == "PLACE")) return "";
				if(!(serviceType == "CLASS" || serviceType == "PLACE")) return "";
				const nameList = [];
				const branchTypeList = item.branchTypes || [];
				branchTypeList.forEach(item => {
					const name = branchTypeInfo[item.seqPartnerBranchType];
					if(name && nameList.indexOf(name) == -1)
						nameList.push(name);
				});
				const length = nameList.length;
				let text = "";
				if(length < 1) {
					text = "소속지점";
				} else if(length < 3) {
					text = nameList.join(", ");
				} else {
					text = nameList[0] + ", " + nameList[1] + " 외 " + (length - 2) + "건";
				}
				return `<i class="blue">${text}</i> / `;
			};

			const getDetailList = (item) => {
				return (item.details || []).map(item => {
					const branchTypeInfo = getBranchTypeInfo(item);
					if(isPackage) {
						const serviceInfo = item.serviceInfo || {};
						const serviceInitial = serviceInfo.serviceType.substr(0, 1);
						const serviceColor = uiParameter.service.color[serviceInfo.serviceType];
						const icon = `<em class="icon bg ${serviceColor}">${serviceInitial}</em>`;
						return `<h5>${icon}${branchTypeInfo}${getPricingInfo(item)} (${getServiceInfo(serviceInfo, item)})</h5>`;
					} else {
						return `<h5>${branchTypeInfo}${getPricingInfo(item)}</h5>`;
					}
				}).join("");
			};

			if(isPackage) {
				return `
					<li class="package">
						<div class="service">
							<a data-category="package" data-service="${item.seqService}" data-pricing="${item.seqPricing}" data-event="modify">
								<dl>
									<dt>
										<h3 class="green">${getName(item.pricingName)}</h3>
										${getDetailList(item)}
									</dt>
									<dd class="price">
										<var>${getComma(item.price)}원</var>
										${getState(item.saleYn)}
									</dd>
									<dd class="modify"><button data-event="modify">수정</button></dd>
								</dl>
							</a>
						</div>
					</li>
				`;
			} else {
				const serviceColor = uiParameter.service.color[item.serviceType];
				const serviceName = item.serviceName;
				const getPricingInfo = () => {
					const li = item.pricingList.filter(item => {
						return (searchWord) ? ((item.pricingName || "").indexOf(searchWord) > -1) : true;
					}).map(item => {
						return `
							<li>
								<a data-category="normal" data-service="${item.seqService}" data-pricing="${item.seqPricing}" data-event="modify">
									<dl>
										<dt>
											<h4>${getName(item.pricingName)}</h4>
											<h5>${getDetailList(item)}</h5>
										</dt>
										<dd class="price">
											<var>${getComma(item.price)}원</var>
											${getState(item.saleYn)}
										</dd>
										<dd class="modify"><button>수정</button></dd>
									</dl>
								</a>
							</li>
						`;
					});
					return (li.length) ? `
						<div class="pricing">
							<ul>
								${li.join("")}
							</ul>
						</div>
					` : ``;
				};
				return `
					<li>
						<div class="service">
							<a data-category="normal" data-service="${item.seqService}" data-event="modify">
								<dl>
									<dt>
										<h3 class="${serviceColor}">${getName(serviceName)}</h3>
										<h5>${getServiceInfo(item)}</h5>
									</dt>
									<dd class="modify"><button>수정</button></dd>
								</dl>
							</a>
						</div>
						${getPricingInfo()}
					</li>
				`;
			}
		}
	}
};

// [package]
// displayYn: "Y"
// packageName: "ddd"
// packageServiceList: [{seqPackageService: 12957, seqPartner: 774, seqPackage: 11319, seqService: 1,…},…]
// 0: {seqPackageService: 12957, seqPartner: 774, seqPackage: 11319, seqService: 1,…}
// regDt: "2020-09-11T17:58:29"
// regId: 9807
// seqPackage: 11319
// seqPackageService: 12957
// seqPartner: 774
// seqService: 1
// serviceInfo: {seqService: 1, seqPartner: 774, serviceKind: "N", serviceType: "APPOINTMENT", optionType: null,…}
// updateDt: "2020-09-11T17:58:29"
// updateId: 9807
// 1: {seqPackageService: 12958, seqPartner: 774, seqPackage: 11319, seqService: 4,…}
// regDt: "2020-09-11T17:58:29"
// regId: 9807
// saleYn: "N"
// seqPackage: 11319
// seqPartner: 774
// updateDt: "2021-08-25T21:55:17"
// updateId: 9807
// useYn: "Y"

// [pricing]
// details: [,…]
// 0: {seqPricingDetail: 1, seqPricing: 1, seqPartner: 774, seqPackage: 0, seqService: 1, usePeriodType: "M",…}
// branchTypes: []
// branches: []
// cancelNumber: -1
// coachAndSpaceList: []
// dayLimit: 1
// defaultBranchYn: "Y"
// displayYn: "Y"
// forceCancelNumber: 1
// maxBookingNumber: -1
// nonTaxableAmount: 0
// pauseNumber: -1
// pausePeriod: -1
// price: 500000
// pricingDetailCoaches: null
// pricingDetailSpace: null
// regDt: "2020-02-27T18:19:13"
// regId: 9807
// salesClassification: null
// seqPackage: 0
// seqPartner: 774
// seqPricing: 1
// seqPricingDetail: 1
// seqSalesClassification: 0
// seqService: 1
// serviceInfo: {seqService: 1, seqPartner: 774, serviceKind: "N", serviceType: "APPOINTMENT", optionType: null,…}
// taxableAmount: 454546
// updateDt: "2020-10-06T15:48:58"
// updateId: 9807
// useNumber: 10
// usePeriod: 2
// usePeriodType: "M"
// useYn: "Y"
// vat: 45454
// weekLimit: -1
// disMemo: null
// displayYn: "Y"
// hDealDiscountPrice: 0
// hDealSaleEndDt: null
// hDealSaleStartDt: null
// hDealYn: null
// hashTagNameList: null
// nonTaxableAmount: 0
// normalPrice: 500000
// passExplain: null
// passPolicyId: null
// passRepresentImage: null
// price: 500000
// pricingName: "PT (헬스) 10회 2개월"
// pricingPolicyApproveDivCode: null
// regDt: "2020-02-27T18:19:13"
// regId: 9807
// saleEndDateYn: null
// saleEndDt: null
// saleStartDt: null
// saleStopYn: null
// saleYn: "Y"
// seqPartner: 774
// seqPricing: 1
// seqService: 1
// serviceCategory: "NORMAL"
// taxFreeYn: "N"
// taxableAmount: 454546
// updateDt: "2020-10-06T15:48:58"
// updateId: 9807
// useYn: "Y"
// vat: 45454
// webAppDiv: null