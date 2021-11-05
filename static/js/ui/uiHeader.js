
uiHeader.data = [
	{
		icon : "schedule",
		name : "스케줄러",
		href : "/manager/schedule/class",
		menu : [{
			name : "개인레슨 스케줄",
			href : "/manager/schedule/promise"
		}, {
			name : "그룹수업 스케줄",
			href : "/manager/schedule/class"
		}, {
			name : "그룹수업 관리",
			href : "/manager/schedule/lesson"
		}, {
			name : "예약내역",
			href : "/manager/reservation/index"
		}]
	}, {
		icon : "entrance",
		name : "입장관리",
		href : "/manager/entrance-member?v=2"
	}, {
		icon : "member",
		name : "고객관리",
		href : "/member",
		menu : [{
			name : "회원검색",
			href : "/member"
		}, {
			name : "잠재고객",
			href : "/sales/member-prospective"
		}, {
			name : "고객상담",
			href : "/member-counseling/index"
		}, {
			name : "세일즈 성과분석",
			href : "/sales/analysis"
		}, {
			name : "공지사항",
			href : "/member/notice/getNotice"
		}, {
			name : "만료일 연장 내역",
			href : "/batch-extension/history"
		}]
	}, {
		icon : "member",
		name : "인사관리",
		href : "/coach",
		menu : [{
			name : "임직원 관리",
			href : "/coach",
		}, {
			name : "급여설정",
			href : "/coach/payroll/setting",
			permission : "permissionAccounting/configStaffPay"
		}, {
			name : "급여정산",
			href : "/settlement",
			permission : "permissionAccounting/readStaffPay"
		}]
	}, {
		icon : "calculate",
		name : "회계관리",
		href : "/summary/sales",
		permission : "permissionAccounting/readSales",
		menu : [{
			name : "이용권 매출조회",
			href : "/summary/sales",
			permission : "permissionAccounting/readSales"
		}, {
			name : "일반 상품 매출조회",
			href : "/manager/accounting/sales/salesList/productPublic",
			permission : "permissionAccounting/readSales"
		}, {
			name : "지출등록",
			href : "/manager/expenditure/index",
			permission : "permissionAccounting/registExpenditure"
		}, {
			name : "지출조회",
			href : "/manager/accounting/expenditure",
			permission : "permissionAccounting/readExpenditure"
		}]
	}, {
		icon : "report",
		name : "통계분석",
		href : "/statistics/appointment/index",
		permission : "permissionStatistics/appointment",
		menu : [{
			name : "개인레슨 통계",
			href : "/statistics/appointment/index",
			permission : "permissionStatistics/appointment"
		}, {
			name : "그룹수업 통계",
			href : "/statistics/class/index",
			permission : "permissionStatistics/classes"
		}]
	}, {
		icon : "member",
		name : "락커관리",
		href : "/locker"
	}, {
		icon : "center",
		name : "센터관리",
		href : "/sms/send",
		menu : [{
			name : "SMS/알림톡",
			href : "/sms/send"
		}, {
			name : "네이버 연동",
			href : "/partner/naver"
		}, {
			name : "센터설정",
			href : "/partner/operation"
		}, {
			name : "그룹 관리",
			href : "/manager/group"
		}, {
			name : "이용권 관리",
			href : "/services"
		}, {
			name : "일반 상품 관리",
			href : "/product/public"
		}, {
			name : "예약정책",
			href : "/reservationsetting/setting/appointment"
		}, {
			name : "입장내역",
			href : "/partner/use"
		}, {
			name : "히스토리",
			href : "/manager/history/index"
		}]
	}
];



function uiHeader() {
	if(uiHeader.ready) return;
	if(typeof partnerInfo == "undefined") return;
	uiHeader.ready = true;

	const setPermission = () => {
		const data = uiHeader.data;
		/*
			고투의 경우
			{
				name : "배너광고",
				href : "/member/bannerad/getBannerAd"
			}
		*/
		if(partnerInfo.employee.typeCode == "00") {
			data[7].menu.push({
				name : "권한관리",
				href : "/permission/index"
			});
		}
		const permissionList = partnerInfo.permission;
		if(!permissionList) return;

		const isPermission = (permission) => {
			if(permission) {
				const array = permission.split("/");
				const isPermission = (permissionList[array[0]] && permissionList[array[0]][array[1]] == "true") ? true : false;
				if(!isPermission) return false;
			}
			return true;
		}

		data.forEach(item => {
			if(!isPermission(item.permission)) item.href = "";
			if(item.menu) {
				item.menu.forEach(item => {
					if(!isPermission(item.permission)) {
						item.href = "javascript:alert('해당 메뉴에 대한 권한이 없습니다.')";
						item.display = false;
					}
				});
			}
			if(!item.href && item.menu.length > 0)
				item.href = item.menu[0].href;
		});

		/*
		data.forEach(item => {
			if(!isPermission(item.permission)) item.href = "";
			if(item.menu) {
				item.menu = item.menu.filter(item => {
					return isPermission(item.permission);
				});
			}
			if(!item.href && item.menu.length > 0)
				item.href = item.menu[0].href;
		});
		 */
	};
	const setScheduler = () => {
		const entry = partnerInfo.scheduler.default;
		if(entry) uiHeader.data[0].href = "/manager/schedule/" + entry;
	};
	setScheduler();
	setPermission();

    const body = document.querySelector("body");
    const header = document.createElement("header");
    header.className = "ui-header";

	const getComma = function(value) {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	const checkNavigator = () => {
		const array = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
		let version = (array && array[2]) ? Number(array[2]) || 0 : 0;
		if(version == 0) {
			return `<li class="none"><a href="https://www.google.com/chrome"><em class="bg red">크롬 브라우저 사용을 권장합니다.</em></a></li>`;
		} else if(version < 75) {
			return `<li class="none"><a href="http://www.bodycodi.com/doc/sub_03.html" target="_blank"><em class="bg red">최신 프로그램으로 업데이트 해주세요.</em></a></li>`;
		}
		return "";
	};

	const setTemplate = function() {
		const getPartnerInfo = () => {
			const isHeadquarters = (partnerInfo.partner.headquartersYn == "Y");
			const isBranch = (partnerInfo.branch.id) ? true : false;
			const partnerName = partnerInfo.partner.name;
			const branchName = (partnerInfo.branch.id) ? partnerInfo.branch.name : "본사";
			if(isHeadquarters) {
				return `
					<li class="partnerBranch">
						<div class="select">가맹점 <span>${partnerName} : ${branchName}</span></div>
						<div class="list" data-id="partnerBranchList"></div>
					</li>
				`;
			} else {
				if (isBranch)
					return `<li>가맹점<span>${partnerName} : ${branchName}</span></li>`;
				return `<li>가맹점<span>${partnerName}</span></li>`;
			}
		};

		const employeeName = partnerInfo.employee.name;

		const expireDate = function() {
			const date = new Date(partnerInfo.licence.expireDate);
			if(isNaN(date.getTime())) return "";
			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const day = date.getDate();
			return year + "년 " + month + "월 " + day + "일 까지 유료 전환해 주세요.";
		};

		const remainSms = getComma(partnerInfo.state.sms);
		const licenceRemainDay = getComma(partnerInfo.licence.remainDate || 0);

		const isNotice = (partnerInfo.licence.isPayment == "N") ? "focus" : "";
		const menuList = function() {
			const mainMenu = [];
			uiHeader.data.forEach(item => {
				const subMenu = [];
				const isSubmenu = (item.menu) ? true : false;
				let display = true;
				if(isSubmenu) {
					subMenu.push('<div class="submenu"><ul>');
					item.menu.forEach(item => {
						const display = (item.display == false) ? "denied" : "";
						subMenu.push('<li class="' + display + '"><a href="' + item.href + '">' + item.name + '</a></li>');
					});
					subMenu.push('</ul></div>');
					if(item.menu.length == 0)
						display = false;
				}
				if(display) {
					mainMenu.push(`
						<li>
							<a class="${isSubmenu}" href="${item.href}"><span class="icon-${item.icon}"></span>${item.name}</a>
							${subMenu.join("")}
						</li>
					`);
				}
			});
			return mainMenu.join("");
		};

		const registerMember = function() {
			if(partnerInfo.permission.member.create != true) return "";
			return `
				<li><a data-event="registerMember">회원등록<span class="icon"></span></a></li>
			`;
		};

		const template = `
			<div class="notice ${isNotice}">
				<p>
					현재 바디코디 체험판을 이용하고 있습니다. ${expireDate()}
					<a href="/partner/payment">유료전환 하기</a>
				</p>
			</div>

			<div class="state">
				<div class="left">
					<ul>
						${getPartnerInfo()}
						<li>남은 이용기간 <span>${licenceRemainDay}일</span></li>
						<li><label onclick="popupTodo.open()">업무 알림 <span data-msg="todo">0</span>건</label></li>
						${checkNavigator()}
					</ul>
				</div>
				<div class="right">
					<ul>
						${registerMember()}
						<li><a href="/sales/member-prospective">잠재고객<span class="icon"></span></a></li>
						<li>문자 잔여 건 수 <span data-msg="sms-remain-count">${remainSms}건</span> <a href="/sms/charge?popup=charge"><button>충전</button></a></li>
						<li>센터관리자 <span>${employeeName}</span> <a onclick="popupLoginCoach.open()"><button>변경</button></a></li>
						<li><a href="/common/logout">로그아웃</a></li>
					</ul>
				</div>
			</div>

			<div class="bar">
				<div class="search">
					<div class="quick">
						<a class="home" href="/"></a>
						<a class="back" href="javascript:uiHistory.back()" data-event="uiHistoryBack"></a>
						<a class="refresh" href="javascript:window.location.reload(true)"></a>
					</div>
					<form method="post" onsubmit="return false" autocomplete="off">
						<label>
							<input name="searchWord" type="text" maxlength="32" placeholder="회원명 또는 연락처 검색" data-event="searchEnter">
							<button type="button" data-event="searchSubmit"><span class="icon-zoom"></span></button>
						</label>
					</form>
				</div>
				<div class="menu">
					<ul>
						${menuList()}
					</ul>
				</div>
			</div>
		`;
		header.innerHTML = template;
	};

	const setEvent = () => {
		const doSearch = () => {
			const toMobile = (value) => {
				value = value.toString().replace(/-/g, "");
				if(!value) return "";
				return value.substr(0, 3) + "-" + value.substr(3, (value.length - 7)) + "-" + value.substr((value.length - 4), 4);
			};
			let searchWord = header.getValue("searchWord").trim();
			const isNumber = (searchWord == getNumber(searchWord));
			if(isNumber && searchWord.length >= 10) {
				searchWord = toMobile(searchWord);
			}
			if(!searchWord) return;
			window.location.href = "/member?searchWord=" + encodeURIComponent(searchWord);
		};

		uiEvent(header, {
			click : {
				registerMember : function() {
					popupRegisterMember.open();
				},
				searchSubmit : function() {
					doSearch();
				}
			},
			keypress : {
				searchEnter : function(event) {
					event = event || window.event;
					if(event.keyCode != 13) return;
					doSearch();
				}
			}
		});
	};

    const setIndex = () => {
        const nav = document.querySelector(".ui-nav");
        const focusIndex = (nav) ? Number(nav.getAttribute("data-index")) : 0;
        if(focusIndex) {
            const li = header.querySelectorAll(".menu > ul > li");
            li.forEach(function(item, index) {
                if(index == focusIndex - 1)
                    item.className = "focus";
            });
        }
    };

	const setRender = () => {
		const contents = document.getElementById("contents");
		if(contents)
			contents.parentNode.insertBefore(header, contents);
		else
			body.insertBefore(header, body.firstChild);


	};

	const setAlarm = () => {
		const seqPartner = partnerInfo.partner.id;
		commonController.todo.list(seqPartner, undefined, false).then(data => {
			if(!data) data = [];
			let count = 0;
			data.data.forEach(item => {
				if(item.isCompleted == false) count++;
			});
			const span = header.querySelector("[data-msg='todo']");
			if(span) span.innerHTML = getComma(count);
		});
	};

	setTemplate();
	setEvent();

	window.addEventListener("load", function() {
		setIndex();
		setTimeout(setAlarm, 1000);
	});
	setRender();

	if(partnerInfo.partner.branchUseYn == "Y")
		uiPartnerBranch.open();
};

const uiPartnerBranch = {
	container : undefined,
	seqPartnerBranch : 0,
	data : undefined,
	open : function() {
		if(!this.data) {
			commonController.branch.list().then(branchList => {
				this.data = branchList;
				if(!this.seqPartnerBranch)
					this.seqPartnerBranch = partnerInfo.branch.id;
				this.render();
			}).catch(error => {
				console.log(error);
				alert("정보를 가져오는데 실패하였습니다.");
			});
		} else {
			this.render();
		}
	},
	update : function() {
		const getKeyword = () => {
			const input = this.container.querySelector("input");
			const value = input.value.trim();
			return (value.length < 2) ? "" : value;
		};
		const keyword = getKeyword();
		const seqPartnerBranch = this.seqPartnerBranch;

		const li = this.container.querySelectorAll("li");
		const length = li.length - 1;
		let count = 0;

		this.data.forEach((item, index) => {
			if(String(item.partnerName).indexOf(keyword) > -1) {
				count++;
				li[index].className = "";
			} else {
				li[index].className = "hidden";
			}
			if(item.seqPartnerBranch == seqPartnerBranch)
				li[index].classList.add("focus");
		});
		li[length].className = (count == 0) ? "empty" : "empty hidden";

		const total = getComma(this.data.length);
		const partnerInfo = (keyword) ? `전체 ${total}개 중 ${count}개 검색` : `전체 ${total}개`;
		this.container.querySelector("[data-msg='partnerInfo']").innerHTML = partnerInfo;
	},
	render : function() {
		const container = this.container = document.querySelector(".ui-header [data-id='partnerBranchList']");
		if(!container) return;
		container.innerHTML = this.template();
		const self = this.event.self = this;

		const setInput = () => {
			const input = container.querySelector("input");
			input.value = "";
			input.addEventListener("keyup", function() {
				self.update();
			});
		};
		const setSelect = () => {
			const input = container.querySelector("input");
			const select = container.parentNode.querySelector("div");
			select.addEventListener("click", function(event) {
				event = event || window.event;
				event.preventDefault();
				event.stopPropagation();

				if(container.classList.contains("focus")) {
					container.classList.remove("focus");
					return;
				}
				input.value = "";
				container.classList.add("focus");
				self.update();

				const bindEvent = function(event) {
					event = event || window.event;
					const isList = event.path.some(item => {
						return (item == container);
					});
					if(isList) {
						const tagName = (event.target) ? event.target.tagName.toLowerCase() : "";
						if(tagName != "a") return;
					}
					container.classList.remove("focus");
					window.removeEventListener("click", bindEvent);
				};
				window.addEventListener("click", bindEvent);
			});
		};
		const setList = () => {
			const a = container.querySelectorAll("[data-event='seqPartnerBranch']");
			a.forEach(item => {
				item.addEventListener("click", function() {
					self.event.changePartner(this);
				});
			});
		};

		setInput();
		setSelect();
		setList();
	},
	event : {
		changePartner : function(object) {
			const seqPartnerBranch = Number(object.getAttribute("data-sequence"));
			commonController.branch.change(seqPartnerBranch).then(data => {
				this.self.seqPartnerBranch = seqPartnerBranch;
				window.location.reload(true);
			}).catch(error => {
				console.log(error);
				alert("지점 변경에 실패하였습니다.");
			});
		}
	},
	template : function() {
		const getBranchList = () => {
			const li = this.data.map(item => {
				return `<li><a data-name="${item.partnerName}" data-sequence="${item.seqPartnerBranch}" data-event="seqPartnerBranch">${item.partnerName}</a>`;
			});
			return li.join("");
		};

		return `
				<div class="top">
					<input type="text" placeholder="검색어 입력">
				</div>
				<div class="middle">
					<ul>
						${getBranchList()}
						<li class="empty hidden">검색된 지점이 없습니다.</li>
					</ul>
				</div>
				<div class="bottom" data-msg="partnerInfo">
					전체 ${this.data.length}개
				</div>
		`;
	},
	getComma : function(value) {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
};
