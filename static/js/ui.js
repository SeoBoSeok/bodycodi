window.addEventListener("DOMContentLoaded", function() {
	uiCalendar();
	uiSelect();
	uiInput();
	uiTable();
	uiQuick();
	uiHelp();
	uiTip();
	uiBranch();
	if(typeof doReady == "function") doReady();
});

/*
window.addEventListener("load", function() {
	uiHistory.push();
})
window.addEventListener("pageshow", function(event) {
	event = event || window.event;
	const isCache = (event.persisted || (window.performance && window.performance.navigation.type == 2));
	uiConsole("note : this page is " + ((isCache) ? "cached" : "non-cache") + " by the browser", (isCache) ? "red" : "black");
});
*/


function uiBranch() {
	try {
		const isBranch = (partnerInfo && partnerInfo.partner && partnerInfo.partner.branchUseYn == "Y");
		if(isBranch) {
			const body = document.querySelector("body");
			if(body) body.classList.add("branch")
		}
	} catch(error) {
		console.warn("브런치 관련 오류가 있습니다.");
	}
}


// 좌측 사이드 드롭 메뉴 설정
function uiSide() {
	const aside = document.querySelector("aside.ui-side");
	if(!aside || uiSide.ready) return;
	uiSide.ready = true;

	const li = aside.querySelectorAll("li");
	li.forEach(item => {
		const a = item.querySelector("a");
		const div = item.querySelector("div");
		if(div) {
			item.classList.add("icon");
			a.addEventListener("click", function() {
				this.parentNode.classList.toggle("focus");
			});
		} else if(item.classList.contains("focus")) {
			item.parentNode.parentNode.parentNode.classList.add("focus");
		}
	});
}



// 화면 스크롤 탑 버튼 설정
function uiQuick() {
	const nav = document.querySelector("nav.ui-nav");
	const div = (nav && !nav.querySelector(".left")) ? document.createElement("div") : "";
	if(div) {
		div.className = "quick";
		div.innerHTML = `
			<a class="home" href="/"></a>
			<a class="back" href="javascript:uiHistory.back()" data-event="uiHistoryBack"></a>
			<a class="refresh" href="javascript:window.location.reload(true)"></a>
		`;
		nav.appendChild(div);
	}

	if(document.querySelector("ui-top")) return;

	const body = document.querySelector("body");
	const container = document.createElement("div");
	container.className = "ui-quick";

	const setTop = () => {
		const a = document.createElement("a");
		a.innerHTML = "TOP";
		a.addEventListener("click", function() {
			try {
				window.scroll({
					top : 0,
					behavior : "smooth"
				});
			} catch(error) {
				const body = document.querySelector("body");
				body.scrollTop = body.parentNode.scrollTop = 0;
			}
		});
		container.appendChild(a);

		window.addEventListener("scroll", function() {
//			const body = document.documentElement || document.body;
			const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
			div.className = (scrollTop > 112) ? "quick focus" : "quick";
			a.className = (scrollTop > 480) ? "focus" : "";
//			container.className = ((scrollTop + body.clientHeight) == body.scrollHeight) ? "ui-quick transparent" : "ui-quick";
		});
	};

	const setTips = () => {
		const aside = document.querySelector(".ui-tips");
		const div = document.querySelector("body > .contents");
		if(!aside || !div.classList.contains("tips")) return;

		const isTips = !(localStorage.getItem("isTips") == "false");
		if(!isTips) div.classList.add("hidden");

		const a = document.createElement("a");

		const changeDisplay = () => {
			div.classList.toggle("hidden");
			const isHidden = div.classList.contains("hidden");
			localStorage.setItem("isTips", !(isHidden));
			a.className = (isHidden) ? "white focus" : "hidden focus";
		};

		const setIcon = () => {
			a.className = (isTips) ? "hidden" : "white focus";
			a.innerHTML = "TIPS";
			a.addEventListener("click", changeDisplay);
			container.appendChild(a);
		};

		const setButton = () => {
			const a = document.createElement("a");
			a.innerHTML = "도움말 감추기";
			a.addEventListener("click", changeDisplay);
			const div = aside.querySelector(".box");
			div.appendChild(a);
		};

		setIcon();
		setButton();

		setTimeout(function() {
			const main = document.querySelector("main");
			main.style.transition = "margin 0.3s";
			aside.style.transition = "width 0.3s";
		}, 100);
	};

	setTop();
	setTips();
	body.appendChild(container);
}




// 팝업, 경고창, 확인창 등
function uiPopup(object) {
	const body = document.body || document.documentElement;

	if(!uiPopup.queue) uiPopup.queue = [];

	if(!object) {
		const popup = uiPopup.queue.pop();
		popup.classList.remove("focus");
		if(object == undefined) {
			setTimeout(function(){
				popup.parentNode.removeChild(popup);
			}, 300);
		} else {
			popup.parentNode.removeChild(popup);
		}
		body.parentNode.style.overflowY = "auto";
		return;
	}

	const div = (object.isRefresh) ? object.container : document.createElement("div");
	div.innerHTML = "<div><div>" + object.template + "</div></div>";
	if(object.scroll == false)
		body.parentNode.style.overflowY = "hidden";

	if(!object.isRefresh) {
		div.className = "ui-popup";
		body.appendChild(div);
		uiPopup.queue.push(div);

		setTimeout(function() {
			div.classList.add("focus");
		}, 100);
	}

	if(object.beforeEvent) {
		object.beforeEvent(div);
	}

	const events = object.event;
	for(const event in events) {
		const items = events[event];
		for(let item in items) {
			const node = div.querySelectorAll("[data-event='" + item + "']");
			const callback = items[item];
			node.forEach(function(item) {
				item.addEventListener(event, callback);
			});
		}
	}

	return div;
}

function uiConfirm(object) {
	if(!uiConfirm.queue) uiConfirm.queue = [];

	if(typeof object == "boolean") {
		const popup = uiConfirm.queue.pop();
//		if(object) {
		if(popup.callback) popup.callback(object);
//		}
		popup.container.parentNode.removeChild(popup.container);
		return;
	}

	const body = document.body || document.documentElement;
	const div = document.createElement("div");
	const data = {
		container	: div,
		title		: (object.title) ? "<h4>" + object.title + "</h4>" : "",
		contents	: (object.contents) ? object.contents : "",
		button		: {
			ok		: (object.ok) ? object.ok : "확인",
			cancel	: (object.cancel) ? object.cancel : "취소",
			color	: (object.color) ? object.color : ""
		},
		callback	: object.callback,
	};

	const template = `
		<span onclick="uiConfirm(false)"></span>
		<div>
			<div>
				<div class="box">
					<h4>${data.title}</h4>
					<p>${data.contents}</p>
					<button class="ui-button ${data.button.color}" onclick="uiConfirm(true)">${data.button.ok}</button>
					<button class="ui-button gray" onclick="uiConfirm(false)">${data.button.cancel}</button>
				</div>
			</div>
		</div>
	`;

	div.className = "ui-popup ui-confirm focus";
	div.innerHTML = template;
	body.appendChild(div);
//	div.querySelector("button").focus();
	uiConfirm.queue.push(data);
}

function uiAlert(object) {
	if(!uiAlert.queue) uiAlert.queue = [];
	if(typeof object == "string") object = {contents : object};

	if(typeof object == "boolean") {
		const popup = uiAlert.queue.pop();
		if(popup.focus) popup.focus.focus();
		popup.container.parentNode.removeChild(popup.container);
		return;
	}

	const body = document.body || document.documentElement;
	const div = document.createElement("div");
	const data = {
		container	: div,
		title		: (object.title) ? "<h4>" + object.title + "</h4>" : "",
		contents	: (object.contents) ? object.contents : "",
		button		: {
			ok		: (object.ok) ? object.ok : "확인",
			color	: (object.color) ? object.color : ""
		},
		focus		: object.focus,
	};

	const template = `
		<span onclick="uiAlert(false)"></span>
		<div>
			<div>
				<div class="box">
					<h4>${data.title}</h4>
					<p>${data.contents}</p>
					<button class="ui-button ${data.button.color}" onclick="uiAlert(false)">${data.button.ok}</button>
				</div>
			</div>
		</div>
	`;

	div.className = "ui-popup ui-alert focus";
	div.innerHTML = template;
	body.appendChild(div);
	div.querySelector("button").focus();
	uiAlert.queue.push(data);
}

function uiToast(message, option) {
	const body = document.body || document.documentElement;

	const div = document.createElement("div");
	div.className = "ui-toast";
	div.innerHTML = message;

	const close = function() {
		if(div) div.classList.remove("focus");
		setTimeout(() => {
			try {
				body.removeChild(div);
			} catch(error) {}
		}, 400)
	};

	if(option) {
		for(let name in option) {
			const value = option[name];
			if(typeof value == "number") {
				if(name == "top") div.style.bottom = "auto";
				else if(name == "bottom") div.style.top = "auto";
				div.style[name] = value + "px";
			} else {
				div.classList.add(option[name]);
			}
		}
		if(option.button) {
			const a = document.createElement("a");
			a.addEventListener("click", close);
			div.appendChild(a);
		}
	}

	body.appendChild(div);
	setTimeout(() => {
		if(div) div.classList.add("focus");
		setTimeout(close, 2000);
	}, 100);
}



// 입력창 설정
function uiInput(object) {
	if(!object) object = document;

	// 엔터 시 다음 입력창으로 이동
	const setEnter = function() {
		const target = "[tabIndex], [tabindex]";
		const nodeList = object.querySelectorAll(target);
		const nextItem = function(event) {
			event = event || window.event;
			if(event.keyCode != 13) return;

			const nodeList = object.querySelectorAll(target);
			const length = nodeList.length;
			for(var i = 0; i < length; i++)
				if(nodeList[i] == event.target) break;
			for(var j = i; j < length; j++) {
				if(nodeList[j + 1] && !nodeList[j + 1].disabled) {
					nodeList[j + 1].focus();
					break;
				}
			}
		};
		for(let i = 0; i < nodeList.length; i++) {
			const item = nodeList[i];
			if(nodeList[i + 1])
				item.addEventListener("keypress", nextItem);
		}
	};

	// 최소값 최대값 설정
	const setMinMax = function(item, isComma) {
		const maxlength = item.getAttribute("maxlength");
		const min = item.getAttribute("min");
		const max = item.getAttribute("max");
		const preventMinus = (item) => {
			item.addEventListener("keydown", function(event) {
				event = event || window.event;
				const keyCode = event.keyCode || event.which;
				if(keyCode == 109 || keyCode == 189) {
					event.preventDefault();
					event.returnValue = false;
					return false;
				}
			});
		};
		if(maxlength != null) {
			item.addEventListener("keyup", function(event) {
				event = event || window.event;
				const maxlength = Number(this.getAttribute("maxlength"));
				if(this.value.length >= maxlength)
					this.value = this.value.substr(0, maxlength);
			});
		}
		if(min != null || max != null) {
			if(min == 0)
				preventMinus(item);
			item.addEventListener("change", function(event) {
				event = event || window.event;
				let value = (this.value == "") ? "" : getNumber(this.value);
				if(value == "") return;
				const min = this.getAttribute("min");
				const max = this.getAttribute("max");
				if(min != null && value <= Number(min))
					value = min;
				if(max != null && Number(max) <= value)
					value = max;
				this.value = (isComma) ? getComma(value) : value;
			});
		}
	};

	// 통화 타입인 경우
	const setCurrency = function() {
		const target = "input[type=currency]";
		const nodeList = object.querySelectorAll(target);
		nodeList.forEach(item => {
			item.addEventListener("keydown", function(event) {
				const keyCode = event.keyCode || event.which;
				const isCommand = event.ctrlKey || event.altKey || event.shiftKey;
				const isControl = ((keyCode < 48 && keyCode != 32)) ? true : false;
				const isNumber = ((48 <= keyCode && keyCode <= 57) || (96 <= keyCode && keyCode <= 105)) ? true : false;
				const selectionLength = getNumber(this.selectionEnd) - getNumber(this.selectionStart);
				const isMinus = ((this.selectionEnd == 0 || selectionLength == this.value.length) && (keyCode == 109 || keyCode == 189));

				uiInput.data = {
					keyCode : keyCode,
					isNumber : isNumber,
					isCommand : isCommand,
					isControl : isControl,
					selectionEnd : this.selectionEnd,
					length : item.value.length,
					numberLength : item.value.replace(/[^0-9]/g, "").length,
					commaLength : item.value.replace(/[^\,-]/g, "").length
				};

				if(!isMinus && !isNumber && !isControl && !isCommand) {
					event.returnValue = (isMinus || isControl || isNumber) ? true : false;
					event.preventDefault();
					return event;
				}
			});
			item.addEventListener("keyup", function(event) {
				const data = uiInput.data;
				if(!data) return;
				const newValue = (this.value == "-") ? "-" : getComma(getNumber(this.value));
				const diffNumber = newValue.replace(/[^0-9]/g, "").length - data.numberLength;
				const diffComma = newValue.replace(/[^\,-]/g, "").length - data.commaLength;
				if(!this.value || newValue.substr(0, 1) == "0") return;
				if(data.isControl && data.length == this.value.length) return;
				this.value = newValue;
				const number = diffNumber + diffComma + ((data.keyCode == 46) ? 1 : 0);
				this.setSelectionRange(data.selectionEnd + number, data.selectionEnd + number);
			});
			item.addEventListener("paste", function() {
				if(this.value) this.value = getComma(getNumber(this.value) || 0);
			});
			item.addEventListener("change", function() {
				if(this.value) this.value = getComma(getNumber(this.value) || 0);
			});
			item.type = "text";
			item.value = getComma(item.value);
			setMinMax(item, true);
			setPaste(item);
		});
	};

	// 정수 체크
	const checkInteger = (item) => {
		const min = item.getAttribute("min");
		item.addEventListener("keydown", function(event) {
			event = event || window.event;
			const keyCode = event.keyCode || event.which;
			const isCommand = event.ctrlKey || event.altKey || event.shiftKey;
			const isControl = ((keyCode < 48 && keyCode != 32)) ? true : false;
			const isNumber = ((48 <= keyCode && keyCode <= 57) || (96 <= keyCode && keyCode <= 105)) ? true : false;
			const isMinus = ((keyCode == 109 || keyCode == 189));
			if(!(isCommand || isControl || isNumber || (min != "0" && isMinus))) {
				event.returnValue = false;
				event.preventDefault();
				return false;
			}
		});
		item.addEventListener("blur", function(event) {
			this.value = (this.value) ? getNumber(this.value) : "";
		});
	};

	const setPaste = (item) => {
		item.addEventListener("paste", function(event) {
			event = event || window.event;
			let text = "";
			if(window.clipboardData && window.clipboardData.getData) {
				text = window.clipboardData.getData("Text");
			} else if (event.clipboardData && event.clipboardData.getData) {
				text = event.clipboardData.getData("text/plain");
			}
			const min = item.getAttribute("min");
			const number = text.toString().replace(/[^-+.,0-9]/gi,"");
			if(text != number || isNaN(getNumber(number)) || min && (Number(number) < Number(min))) {
				event.returnValue = false;
				event.preventDefault();
				return false;
			}
		});
	};

	// 정수 타입인 경우
	const setInteger = function() {
		const nodeList = object.querySelectorAll("input[type='integer']");
		nodeList.forEach(item => {
			item.setAttribute("type", "number");
			checkInteger(item);
		});
	};

	// 숫자 타입인 경우
	const setNumber = function() {
		const nodeList = object.querySelectorAll("input[type='number']");
		nodeList.forEach(item => {
			setPaste(item);
			setMinMax(item);
			const isInteger = (item.getAttribute("isInteger") == "true");
			if(isInteger)
				checkInteger(item);
		});
	};

	// 계좌 타입인 경우
	const setAccount = function() {
		const nodeList = object.querySelectorAll("input[type='account']");
		nodeList.forEach(item => {
			item.setAttribute("type", "text");
			item.addEventListener("keydown", function(event) {
				event = event || window.event;
				const keyCode = event.keyCode || event.which;
				const isCommand = event.ctrlKey || event.altKey || event.shiftKey;
				const isControl = ((keyCode < 48 && keyCode != 32)) ? true : false;
				const isNumber = ((48 <= keyCode && keyCode <= 57) || (96 <= keyCode && keyCode <= 105)) ? true : false;
				const isMinus = ((keyCode == 109 || keyCode == 189));
				if(!(isCommand || isControl || isNumber || isMinus)) {
					event.returnValue = false;
					event.preventDefault();
					return false;
				}
			});
			item.addEventListener("change", function(event) {
				const value = this.value.split("-");
				const valueList = [];
				value.forEach(item => {
					if(item && isNumber(item))
						valueList.push(item);
				});
				this.value = valueList.join("-");
			});
		});
	};

	// 검색 타입인 경우
	const setSearch = function() {
		const target = ".ui-input-search input";
		const nodeList = object.querySelectorAll(target);

		nodeList.forEach(item => {
			item.addEventListener("keypress", function(event) {
				event = event || window.event;
				if(event.keyCode != 13 || !item.value) return;
				item.blur();
				item.parentNode.querySelector("button").click();
			});
		});
	};

	setEnter();
	setCurrency();
	setInteger();
	setNumber();
	setAccount();
	setSearch();
}




// 셀렉트 박스 설정
function uiSelect(object, option) {
	const prepareRender = function(oldNode) {
		const div = document.createElement("div");
		div.innerHTML = '<label class="ui-select"><select></select><div></div><ul></ul></label>';
		const cloneNode = oldNode.cloneNode(true);
		cloneNode.removeAttribute("multiple");
		cloneNode.removeAttribute("custom");
		const select = div.querySelector("select");
		select.parentNode.replaceChild(cloneNode, select);
		const newNode = div.children[0];
		oldNode.parentNode.replaceChild(newNode, oldNode);
		return newNode;
	};

	const render = function(oldNode) {
		const isMultiple = oldNode.multiple;

		const container = prepareRender(oldNode);
		const select = container.querySelector("select");
		const div = container.querySelector("div");
		const ul = container.querySelector("ul");

		const optionList = select.querySelectorAll("option");
		const optionName = select.name + "-option";
		const li = [];

		optionList.forEach((item, index) => {
			const isSelected = (item.getAttribute("selected") != null) ? true : false
//			const isChecked = (item.value && isSelected) ? "checked" : "";
			const isChecked = (isSelected) ? "checked" : "";
			let isEvent = item.getAttribute("data-event");
			isEvent = (isEvent) ? ' data-event="' + isEvent + '"' : '';
			let text = item.getAttribute("text");
			text = (text) ? text : item.innerHTML;
			if(isMultiple)
				li.push('<li><label class="ui-input-checkbox"><input name="' + optionName + '" type="checkbox" value="' + item.value + '" ' + isChecked + isEvent + '><span></span>' + text + '</label></li>');
			else
				li.push('<li><label class="ui-input-hidden"><input name="' + optionName + '" type="radio" value="' + item.value + '" ' + isChecked + isEvent + '>' + text + '</label></li>');
		});
		ul.innerHTML = li.join("");

		// 목록 클릭 시 이벤트 취소
		if(isMultiple) {
			ul.addEventListener("click", function(event) {
				event = event || window.event;
				event.stopPropagation();
			});
		}

		// 가상 셀렉터 클릭 시
		div.addEventListener("click", function(event) {
			event = event || window.event;
			event.preventDefault();
			event.stopPropagation();

			if(select.disabled) return;

			if(container.classList.contains("focus")){
				container.classList.remove("focus");
				return;
			}
			if(uiSelect.container)
				uiSelect.container.classList.remove("focus");
			uiSelect.container = container;

			container.classList.add("focus");
			window.addEventListener("click", function() {
				container.classList.remove("focus");
			}, {once : true});
		});

		// 실제 셀렉터와 가상 셀렉터 동기화
		const synchronize = function(isEvent) {
			const itemList = [];
			const valueList = [];
			const max = select.getAttribute("max");
			const input = ul.querySelectorAll("input:checked");
			if(max && input.length > Number(max)) {
				this.checked = false;
				return;
			}

			select.querySelectorAll("option").forEach(function(item, index) {
				if(index < 1) return;
				const checkItem = ul.querySelector("input[value='" + item.value + "']:checked");
				item.selected = (checkItem) ? true : false;
				if(checkItem) {
					item.setAttribute("selected", "");
					const text = item.getAttribute("text");
					if(checkItem) itemList.push((text) ? text : item.innerHTML);
					valueList.push(item.value);
				} else {
					item.removeAttribute("selected");
				}
			});
			select.setAttribute("data-value", valueList.join(","));
			/*
						if(isEvent == true) {
							const event = new Event("change");
							select.dispatchEvent(event);
						}
			*/
			const unit = select.getAttribute("data-unit") || "개";
			const length = itemList.length;
			const title = (length > 0) ? ((length > 2) ? length + unit + " 선택" : itemList.join(", ")) : optionList[0].innerHTML;
			div.className = (length) ? "" : "blank";
			div.innerHTML = title;
		};

		ul.querySelectorAll("input").forEach(function(item, index) {
			item.addEventListener("change", function() {
				synchronize((index == 0) ? false : true);
			});
		});
		synchronize(false);
	};

	if(!object) object = document;

	if(option == "reset") {
		const label = object.querySelectorAll("label.ui-select");
		label.forEach(item => {
			const select = item.querySelector("select");
			const option = item.querySelectorAll("option");
			option.forEach(item => {
				item.removeAttribute("selected");
			});
			const div = item.querySelector("div");
			select.value = "";
			select.setAttribute("data-value", "");
			div.className = "blank";
			div.innerHTML = select.options[0].innerHTML;
		});
	} else if(option == "update") {
		const label = object.querySelectorAll("label.ui-select");
		label.forEach(item => {
			const input = item.querySelector("input");
			const event = new Event("change");
			input.dispatchEvent(event);
		});
	} else {
		const nodeList = object.querySelectorAll("select[multiple], select[custom]");
		for(let node of nodeList)
			render(node);
	}
}



const uiForm = {
	reset : function(form) {
		const selectList = form.querySelectorAll("select");
		selectList.forEach(item => {
			item.selectedIndex = 0;
			const option = item.querySelectorAll("option");
			option.forEach(item => {
				item.removeAttribute("selected");
			});
		});

		uiSelect(form, "reset");
		form.reset();
	},
	update : function(form) {
		uiSelect(form, "update");
	}
}




// 테이블 관련
function uiTable(object) {
	if(!object) object = document;

	const setTable = function(object, value) {
		const nodeList = object.querySelectorAll(".ui-table");
		nodeList.forEach(item => {
			if(item.classList.contains("drop")) {
				const tbody = item.querySelector("tbody");
//				const tr = tbody.querySelectorAll(":scope > tr");
				const tr = Array.from(item.querySelectorAll("tbody > tr")).filter(item => {
					return (item.parentNode == tbody);
				});
				if(tr.length < 2) return;
				const active = function(index) {
					tr[index].classList.toggle("focus");
					tr[index + 1].classList.toggle("focus");
				};

				if(item.getAttribute("data-drop-event") != "false") {
					for(let i = 0; i < tr.length; i += 2) {
						if(value == "init" || tr[i].getAttribute("data-event") != "true") {
							tr[i].setAttribute("data-event", "true");
							tr[i].addEventListener("click", function(event) {
								event = event || window.event;
								const target = event.target;
								let node = target;
								for(let j = 0; j < 5; j++) {
									const tagName = node.tagName.toLowerCase();
									if(tagName == "th" || tagName == "td")
										if(node.classList.contains("prevent")) return;
									node = (node) ? node.parentNode : node;
								}
								const tagName =	target.tagName.toLowerCase();
								if(tagName == "th" || tagName == "a" || tagName == "button") return;
								active(i);
							}, true);

							const button = tr[i + 1].querySelectorAll("button[data-event=cancel]");
							button.forEach(item => {
								item.addEventListener("click", function() {
									active(i);
								});
							});
						}
					}
				}
			}

			if(item.classList.contains("checkbox")) {
				const container = item;
				const nodeList = container.querySelectorAll("tr");
				const inputList = container.querySelectorAll("th input");
				const length = nodeList.length - 1;
				const isCheckAll = (container.querySelector("thead th input"));
				nodeList.forEach((item, index) => {
					const input = item.querySelector("input");
					if(!input) return;

					const active = function(item) {
						const tr = item.parentNode.parentNode.parentNode;
						if(item.checked) tr.classList.add("focus");
						else tr.classList.remove("focus");
					};

					if(index > 0) {
						item.addEventListener("click", function(event) {
							event = event || window.event;
							const tagName =	event.target.tagName.toLowerCase();
							if(!(tagName == "th" || tagName == "td")) return;
							input.click();
						});
					} else {
						input.checked = false;
					}

					input.onchange = function() {
						if(index == 0) {
							const value = inputList[0].checked;
							inputList.forEach(item => {
								if(!item.disabled) {
									item.checked = value;
									active(item);
								}
							});
						}
						active(input);
						if(isCheckAll) {
							const tbody = container.querySelector("tbody");
							const checkList = tbody.querySelectorAll("th input:not([disabled])");
							const checkedList = tbody.querySelectorAll("th input:checked:not([disabled])");
							inputList[0].checked = (checkedList.length && checkList.length == checkedList.length) ? true : false;
						}
					};
				});
			}
		});
	};

	const setDataTable = function() {
		const nodeList = object.querySelectorAll(".ui-data-table");
		try {
			nodeList.forEach(item => {
				const td = item.querySelector("tbody tr td");
				if(td && getNumber(td.getAttribute("colspan")) > 0) {
					item.classList.remove("ui-data-table");
					item.classList.add("ui-table");
					return;
				}

				/* ******* DROP ******** */
				const removedTr = [];
				if(item.classList.contains("drop")) {
					const tbody = item.querySelector("tbody");
					const tr = tbody.querySelectorAll("tr");
					if(tr.length == 0) return;
					//	const nodeList = item.querySelectorAll(":scope > tbody > tr:nth-child(even)");
					const nodeList = Array.from(item.parentNode.querySelectorAll("tbody > tr:nth-child(even)")).filter(item => {
						return (item.parentNode == tbody);
					});
					nodeList.forEach((item, index) => {
						item.seqIndex = index;
						removedTr.push(item);
						item.parentNode.removeChild(item);
					});
				}

				/* ******* OPTION ******** */
				const option = {
					length : Number(item.getAttribute("data-table-length")) || 20,
					dom : item.getAttribute("data-table-dom") || "fltp",
					ordering : (item.getAttribute("data-table-ordering") == "true"),
					orderingIndex : item.getAttribute("data-table-ordering-index") || "",
					orderingType : item.getAttribute("data-table-ordering-type") || "",
					fixed : (item.getAttribute("data-table-header") == "fixed"),
					scrollX : item.getAttribute("data-table-scrollX"),
					scrollY : item.getAttribute("data-table-scrollY"),
					callback : item.getAttribute("data-table-callback"),
					export :  (item.getAttribute("data-table-export") == "true")
				};

				const disableList = [];
				item.querySelectorAll("thead th, thead td").forEach((item, index) => {
					const order = item.getAttribute("data-order");
					const isDisabled = (order && order == "false") ? true : false;
					if(isDisabled)
						disableList.push(index);
				});

				/* ******* AUTO ******** */
				if(item.classList.contains("auto")) {
					const pageLength = option.length;
					const dataLength = item.querySelectorAll("tbody tr").length;
					item.setAttribute("data-table-data-length", dataLength);
					if(pageLength && dataLength) {
						const td = Array.from(item.querySelector("thead tr").querySelectorAll("td")).map(item => {
							const className = (item.className) ? " class=\"" + item.className + "\"" : "";
							return "<td" + className + ">&nbsp;</td>";
						}).join("");
						const repeat = (dataLength % pageLength) ? pageLength - (dataLength % pageLength) : 0;
						const tr = [];
						for(let i = 0; i < repeat; i++)
							tr.push("<tr>" + td + "</tr>");
						item.querySelector("tbody").innerHTML += tr.join("");
					}
				}

				const orderList = [];
				if(option.orderingIndex) {
					const indexList = option.orderingIndex.split(",");
					const typeList = option.orderingType.split(",");
					indexList.forEach((item, index) => {
						const type = typeList[index] || "desc";
						orderList.push([Number(item), type]);
					});
				}

				/* ******* INIT ******** */
				const setting = {
					language: {
						url: "/static/json/jquery/datatables.default.json"
					},
					order : orderList,
					displayLength : option.length,
					lengthMenu : [10, 20, 30, 40, 50, 100],
					ordering : option.ordering,
					//				lengthChange : false,
					//				searching : fasle,
					paging : (option.dom.indexOf("p") == -1) ? false : true,
					//				info : false,
					//				scrollY :  scrollY,

					columnDefs : [{
						orderable : false,
						targets : disableList
					}],
					fixedHeader : {
						header : option.fixed,
						footer : option.fixed
					},
					dom : option.dom,
					createdRow : function(row, data, dataIndex) {
						row.setAttribute("data-index", dataIndex);
					},
					drawCallback : function() {
						if(!option.callback) return;
						try {
							eval(option.callback + "()");
						} catch(error) {
							console.log("not found function");
						}
					},
					callback : undefined
				};

				if(option.scrollX) setting.scrollX = option.scrollX;
				if(option.scrollY) setting.scrollY = option.scrollY;

				const setExportExcel = (dataTable, table) => {
					const div = table.parentNode.querySelector(".dataTables_filter");
					if(!div) return;
					const button = document.createElement("button");
					button.className = "ui-button excel green";
					button.innerHTML = "다운로드";
					div.appendChild(button);
					button.onclick = () => {
						try {
							/*
							const colList = [];
							Array.from(table.tHead.rows[0].cells).forEach(item => {
								const cellWidth = item.offsetWidth;
								if(!item.classList.contains("hidden"))
									colList.push({
										wpx : cellWidth
									});
							});
							const sheetStyle = {
								"!cols" : colList
							};
							 */
							const sheetName = table.getAttribute("data-table-export-title") || "";
							const fileName = table.getAttribute("data-table-export-filename") || "다운로드";
							const exportTable = table.cloneTable;
							uiExport.excel(table, table.cloneTable, sheetName, fileName);
							// uiExport.excel(sheetName, fileName, exportTable, sheetStyle);
						} catch(error) {
							alert("다운로드에 실패하였습니다.");
							console.log(error);
						}
					};
				};

				const cloneTable = item.cloneNode(true);
				const dataTable = $(item).DataTable(setting).on("init", function() {
					this.style.width = "100%";
					this.parentNode.querySelectorAll("select").forEach(item => {
						item.classList.add("ui-select");
					});
					dataTable.removedTr = removedTr;
					if(option.export)	{
						item.cloneTable = cloneTable;
						setExportExcel(dataTable, item);
					}

					if(item.classList.contains("sum")) {
						const dataLength = Number(this.getAttribute("data-table-data-length"));
						const dataList = dataTable.rows().data();

						const tdList = this.querySelectorAll("tfoot [data-index]");
						const yLength = dataList.length;
						const xLength = (dataList[0]) ? dataList[0].length : 0;
						const sumList = Array.from({length : xLength}, () => 0);
						if(yLength > 0 && tdList.length > 0) {
							for(let y = 0; y < yLength; y++) {
								for(let x = 0; x < xLength; x++) {
									const value = getNumber(dataList[y][x]);
									if(!isNaN(value)) sumList[x] += value;
								}
							}
							tdList.forEach(item => {
								const index = Number(item.getAttribute("data-index"));
								const type = item.getAttribute("data-type");
								if(type == "%") {
									const value = parseInt(sumList[index] / dataLength);
									item.innerHTML = value + type;
								} else {
									item.innerHTML = getComma(sumList[index]) + type;
								}
							});
						}
					}

					item.classList.add("ui-table");
					item.classList.remove("ui-data-table");

					setTable(this.parentNode, "init");
				}).on("draw", function() {
					const nodeList = this.parentNode.querySelectorAll("span .paginate_button");
					const paginate = this.parentNode.querySelector(".dataTables_paginate");
					if(paginate)
						paginate.style.display = (nodeList.length < 2) ? "none" : "block";
					const addTr = (dataTable.removedTr) ? dataTable.removedTr : removedTr;
					if(addTr.length > 0) {
						const page = dataTable.page.info();
						const tbody = this.querySelector("tbody");
						const tr = Array.from(this.querySelectorAll("tbody > tr")).filter(item => {
							return (item.parentNode == tbody);
						});
						tr.forEach((item, index) => {
							const seqIndex = Number(item.getAttribute("data-index"));
							// console.log("seqIndex : " + seqIndex, "pageIndex : " + (page.start + index));
							// page.start + index;
							const td = addTr.filter(item => {
								return (item.seqIndex == seqIndex);
							})[0] || addTr[seqIndex];
							item.parentNode.insertBefore(td, item.nextSibling);
						});
					}
					setTable(this.parentNode, "draw");

					Array.from(this.querySelectorAll("tbody > tr")).forEach(item => {
						const td = item.querySelector("td");
						if(td.innerHTML == "&nbsp;")
							item.classList.add("none");
					});
				});
			});
		} catch(e) {
			console.log(e);
		}
	};

	setTable(object);
	setDataTable(object);
}




/* ******** UI-CALENDAR ******** */
function uiCalendar(object) {
	// 사용된 공통 함수 : getCalendar, isDate
	const popup = {
		container : undefined,
		popup : undefined,
		timer : undefined,
		value : undefined,
		isPopup : undefined,
		isMultiple : undefined,
		callback : undefined,
		date : undefined,
		minDate : undefined,
		maxDate : undefined,
		mode : undefined,

		open : function(isPopup) {
			if(isPopup == false) {
				const div = document.createElement("div");
				div.className = "ui-calendar focus";
				this.popup = div;
				this.isPopup = false;
				if(this.isMultiple == true) {
					const input = this.container.querySelector("input");
					let value = input.getAttribute("data-value");
					value = (value) ? value.split(",") : [];
					value.filter(item => {
						return isDate(item);
					}).map(item => {
						return getCalendar(new Date(item));
					});
					this.value = value;
				}
				return this.render();
			};

			const self = popup;
			const container = this.parentNode;
			self.value = this.value;
			self.isPopup = true;
			self.isMultiple = (this.getAttribute("multiple") != null) ? true : false;
			self.mode = this.getAttribute("mode");
			self.minDate = this.getAttribute("minDate") || "1900-01-01";
			self.maxDate = this.getAttribute("maxDate") || "2040-12-31";

			if(self.popup) {
				clearTimeout(self.timer);
				self.container.classList.remove("focus");
				self.popup.parentNode.removeChild(self.popup);
				self.popup = undefined;
			}

			const rect = this.getBoundingClientRect();

			const body = document.querySelector("body");
			const screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
			const screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
			const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
			const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
			const scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
			// const scrollTop = 0;

			const div = document.createElement("div");
			div.className = "ui-calendar";
			div.style.left = (scrollLeft + rect.left) + "px";
			div.style.top = (scrollTop + rect.top + rect.height) + "px";
			// console.log((scrollLeft + rect.x), (scrollTop + rect.y + rect.height));

			div.addEventListener("click", function(event) {
				event = event || window.event;
				event.stopPropagation();
			});

			body.appendChild(div);

			setTimeout(function() {
				div.classList.add("focus");
				div.parentNode.classList.add("focus");
				window.addEventListener("click", self.close, {once : true});
			}, 100);

			self.popup = div;
			self.container = container;
			self.render();

			if((rect.top + div.offsetHeight + 10) > screenHeight) {
				div.style.marginTop = (rect.height + div.offsetHeight + 1) * -1 + "px";
//				div.style.top = "auto";
//				div.style.bottom = (scrollHeight) - (scrollTop + rect.top + rect.height - 36) + "px";
			}
			if((rect.left + div.offsetWidth + 10) > screenWidth)
				div.style.marginLeft = (rect.width - div.offsetWidth) + "px";
		},
		close : function(isEvent) {
			const self = popup;
			if(!self.popup) return;
			self.popup.classList.remove("focus");
			self.container.classList.remove("focus");
			event.preventDefault();
			window.removeEventListener("click", self.close);
			const input = self.container.querySelector("input");
			const value = input.value;
			input.value = (value && isDate(value)) ? getCalendar(new Date(value)) : (self.value) ? self.value : "";

			if(isEvent != false && self.value != input.value) {
				const event = new Event("change");
				input.dispatchEvent(event);
			}
			self.timer = setTimeout(function() {
				self.popup.parentNode.removeChild(self.popup);
				self.popup = undefined;
				self.value = "";
			}, 400);
		},
		render : function(date) {
			const div = this.popup;
			const input = this.container.querySelector("input");
			const value = input.value;
			date = this.date = (date) ? date : ((value) ? new Date(value) : new Date());
			let year = date.getFullYear();
			let month = date.getMonth();
			let day = date.getDate();

			const today = getCalendar();														// 오늘 날짜
			const selectDay = (value) ? getCalendar(new Date(value)) : "";						// 입력된 날짜

			let thisMonthStart = new Date(year, month, 1).getDay() - 1;					// 이번 달 시작 요일
			if(thisMonthStart < 0) thisMonthStart = 6;
			const thisMonthEnd = new Date(year, month + 1, 0).getDate();				// 이번 달 마지막 날짜
			const lastMonth = new Date(year, month, 0).getMonth();
			const lastMonthEnd = new Date(year, month, 0).getDate();						// 저번 달 마지막 날짜
			const lastMonthStart = lastMonthEnd - thisMonthStart + 1;							// 저번 달 시작 날짜

			let title = year + "년 " + (month + 1) + "월";

			if(this.mode == "selector") {
				const getYear = () => {
					const maxDate = (this.maxDate) ? new Date(this.maxDate) : new Date(new Date().getFullYear(), 11, 31);
					const maxYear = maxDate.getFullYear();
					const minDate = (this.minDate) ? new Date(this.minDate) : new Date(new Date().getFullYear() - 4, 0, 1);
					const minYear = minDate.getFullYear();
					if(!this.maxDate) this.maxDate = getCalendar(maxDate);
					if(!this.minDate) this.minDate = getCalendar(minDate);

					const option = [];
					for(let i = maxYear; i >= minYear; i--)
						option.push(`<option value="${i}">${i}년</option>`);
					return option.join("");
				};
				const getMonth = () => {
					const option = [];
					for(let i = 1; i < 13; i++)
						option.push(`<option value="${i}">${i}월</option>`);
					return option.join("");
				};

				title = `
					<select class="ui-select" name="year" data-event="selector">
						<option value="">년도</option>
						${getYear()}
					</select>
					<select class="ui-select" name="month" data-event="selector">
						<option value="">월</option>
						${getMonth()}
					</select>
				`;
			}

			title = "<h4><button class='prev'></button>" + title +"<button class='next'></button></h4>";
//			const thead = "<thead><tr><td>일</td><td>월</td><td>화</td><td>수</td><td>목</td><td>금</td><td>토</td></tr></thead>";
			const thead = "<thead><tr><td>월</td><td>화</td><td>수</td><td>목</td><td>금</td><td>토</td><td>일</td></tr></thead>";
			let tbody = ""

			const thisYear = year;
			const thisMonth = month;
			const thisDay = date.getDate();

			day = lastMonthStart;
			let defaultClassName = "none";

			if(lastMonth == 11) {
				year--;
				month = 12;
			}

			const n = Math.ceil((thisMonthStart + thisMonthEnd) / 7);
			for(let i = 0; i < n; i++) {
				let tr = "";
				for(let j = 0; j < 7; j++) {
					if((i == 0 && day > lastMonthEnd) || (i > 0 && day > thisMonthEnd)) {
						day = 1;
						month++;
						if(month > 12) {
							year++;
							month = 1;
						}
						defaultClassName = (i == 0) ? "" : "none";
					}
					let className = (defaultClassName) ? [defaultClassName] : [];
					let date = getCalendar(new Date(year, month - 1, day));
					if(date == today) className.push("today");
					if(selectDay && date == selectDay) className.push("selected");
					if(this.isMultiple == true && this.value.indexOf(date) > -1) className.push("selected");
					let holidayName = this.isHoliday(new Date(year, month - 1, day));
					if(holidayName && holidayName != "일요일")
						className.push("holiday");
					else holidayName = "";

					className = className.join(" ");
					tr += '<td class="' + className + '"><a data-date="' + date + '" title="' + holidayName + '">' + day + '</a></td>';
					day++;
				}
				tbody += "<tr>" + tr + "</tr>";
			}

			div.innerHTML = title + "<table>" + thead + "<tbody>" + tbody + "</tbody></table>";

			const isMultiple = popup.isMultiple;
			const isPopup = popup.isPopup;
			div.querySelectorAll("a").forEach(item => {
				item.onclick = function() {
					const value = this.getAttribute("data-date");
					if(this.parentNode.classList.contains("none")) {
						popup.render(new Date(value));
						return;
					}

					if(isMultiple) {
						this.parentNode.classList.toggle("selected");
						const index = popup.value.indexOf(value);
						if(this.parentNode.classList.contains("selected")) {
							if(index == -1) popup.value.push(value);
						} else {
							if(index > -1) popup.value.splice(index, 1);
						}
						input.setAttribute("data-value", popup.value.join(","));
						if(popup.callback) popup.callback(popup.value);
					} else {
						if(isPopup == true) {
							input.value = value;
							input.setAttribute("value", value);
						} else {
							this.parentNode.classList.toggle("selected");
							if(!this.parentNode.classList.contains("selected")) {
								input.value = "";
								input.setAttribute("value", "");
							}
						}
					}
					if(isPopup == true)	popup.close();
				}
			});
			div.querySelectorAll("button").forEach((item, index) => {
				item.onclick = function() {
					const newMonth = thisMonth + ((index == 0) ? -1 : 1);
					let date = new Date(thisYear, newMonth, 1);
					const minDate = (popup.minDate) ? new Date(popup.minDate) : "";
					const maxDate = (popup.maxDate) ? new Date(popup.maxDate) : "";
					if(minDate && date.getFullYear() < minDate.getFullYear())
						date = minDate;
					if(maxDate && date.getFullYear() > maxDate.getFullYear())
						date = maxDate;
					popup.render(date, isPopup);
				}
			});

			if(this.mode == "selector") {
				const year = div.querySelector("[name='year']");
				const month = div.querySelector("[name='month']");
				year.value = thisYear;
				month.value = thisMonth + 1;
				div.querySelectorAll("[data-event='selector']").forEach(item => {
					item.onchange = function() {
						const newYear = year.value;
						const newMonth = month.value - 1;
						popup.render(new Date(newYear, newMonth, thisDay), isPopup);
					}
				});
			}

			if(this.isPopup == false)
				return div;
		},
		update : function(date) {
			this.render(date);
			if(this.callback) this.callback(this.value);
		},
		remove : function(date) {
			const index = this.value.indexOf(date);
			if(index > -1) this.value.splice(index, 1);
			this.update(this.date);
		},

		// 해당 양력 날짜의 휴일 여부를 리턴한다.
		isHoliday(date) {
			if(!date) return "";
			const self = popup;

			const year = date.getFullYear();
			const month = date.getMonth() + 1;
			const day = date.getDate();
			const week = date.getDay();

			const setHoliday = function(name, year, month, day, type) {
				let newDate = {year : year, month : month, day : day};
				if(type == "음력")
					newDate = self.convertDate(year, month, day);
				return {
					name : name,
					year : newDate.year,
					month : newDate.month,
					day : newDate.day
				};
			};

			if(self.isHoliday.year != year) {
				const holiday = [
					setHoliday("신정", year, 1, 1, "양력"),
					setHoliday("설날", year - 1, 12, 31, "음력"),
					setHoliday("설날", year, 1, 1, "음력"),
					setHoliday("설날", year, 1, 2, "음력"),
					setHoliday("삼일절", year, 3, 1, "양력"),
					setHoliday("부처님 오신 날", year, 4, 8, "음력"),
					setHoliday("어린이날", year, 5, 5, "양력"),
					setHoliday("현충일", year, 6, 6, "양력"),
					setHoliday("광복절", year, 8, 15, "양력"),
					setHoliday("추석", year, 8, 14, "음력"),
					setHoliday("추석", year, 8, 15, "음력"),
					setHoliday("추석", year, 8, 16, "음력"),
					setHoliday("개천절", year, 10, 3, "양력"),
					setHoliday("한글날", year, 10, 9, "양력"),
					setHoliday("성탄절", year, 12, 25, "양력"),
				];

				// 기타 휴일 설정
				const customHoliday = [
					setHoliday("21대 국회의원 선거", 2020, 4, 15, "양력"),
					setHoliday("임시공휴일", 2020, 8, 17, "양력"),
					setHoliday("지방선거", 2022, 6, 1, "양력")
				];

				// 대체 공휴일 설정
				// - 설날, 추석 연휴가 다른 공휴일(일요일, 개천절, 한글날 등)과 겹치는 경우
				// - 어린이 날이 토요일 또는 다른 공휴일(일요일, 부처님 오신 날 등)과 겹치는 경우
				let itemName = "";
				let itemCount = 1;
				for(let item of holiday) {
					itemCount = (itemName == item.name)  ? itemCount + 1 : 1;
					itemName = item.name;
					switch(itemName) {
						case "설날" :
						case "추석" :
						case "어린이날" :
							let date = new Date(item.year, item.month - 1, item.day);
							const dateWeek = date.getDay();
							date = date.getTime();
							let date1 = self.convertDate(item.year, 4, 8);						// 부처님 오신 날
							date1 = new Date(date1.year, date1.month - 1, date1.day).getTime();
							const date2 = new Date(item.year, 10 - 1, 3).getTime();				// 개천절
							const date3 = new Date(item.year, 10 - 1, 9).getTime();				// 한글날
							if(dateWeek == 0 || date == date1 || date == date2 || date == date3) {
								const day = (itemName == "어린이날") ? 2 : 4;
								date = new Date(item.year, item.month - 1, item.day + (day - itemCount));
								holiday.push({name : itemName + "(대체 공휴일)", year : date.getFullYear(), month : date.getMonth() + 1, day : date.getDate()});
							}
							break;
					}
				}
				self.isHoliday.holiday = holiday.concat(customHoliday);
				self.isHoliday.year = year;
			}

			const holiday = self.isHoliday.holiday;
			for(let item of holiday)
				if(item.year == year && item.month == month && item.day == day) return item.name;
			if(week == 0) return "일요일";
			return "";
		},

		// 음력 날짜를 양력 날짜로 변환 한다.
		convertDate(year, month, day) {
			const table = [
				[1, 2, 4, 1, 1, 2, 1, 2, 1, 2, 2, 1],	// 1841
				[2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1],
				[2, 2, 2, 1, 2, 1, 4, 1, 2, 1, 2, 1],
				[2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
				[1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
				[2, 1, 2, 1, 5, 2, 1, 2, 2, 1, 2, 1],
				[2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
				[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
				[2, 1, 2, 3, 2, 1, 2, 1, 2, 1, 2, 2],
				[2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
				[2, 2, 1, 2, 1, 1, 2, 3, 2, 1, 2, 2],	// 1851
				[2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 2],
				[2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
				[1, 2, 1, 2, 1, 2, 5, 2, 1, 2, 1, 2],
				[1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
				[2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
				[1, 2, 1, 1, 5, 2, 1, 2, 1, 2, 2, 2],
				[1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
				[2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
				[2, 1, 6, 1, 1, 2, 1, 1, 2, 1, 2, 2],
				[1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2],	// 1861
				[2, 1, 2, 1, 2, 2, 1, 5, 2, 1, 1, 2],
				[1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
				[1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
				[2, 1, 1, 2, 4, 1, 2, 2, 1, 2, 2, 1],
				[2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2],
				[1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
				[1, 2, 2, 3, 2, 1, 1, 2, 1, 2, 2, 1],
				[2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1],
				[2, 2, 2, 1, 2, 1, 2, 1, 1, 5, 2, 1],
				[2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2],	// 1871
				[1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
				[1, 1, 2, 1, 2, 4, 2, 1, 2, 2, 1, 2],
				[1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 1],
				[2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
				[2, 2, 1, 1, 5, 1, 2, 1, 2, 2, 1, 2],
				[2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
				[2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
				[2, 2, 4, 2, 1, 2, 1, 1, 2, 1, 2, 1],
				[2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2],
				[1, 2, 1, 2, 1, 2, 5, 2, 2, 1, 2, 1],	// 1881
				[1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
				[1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
				[2, 1, 1, 2, 3, 2, 1, 2, 2, 1, 2, 2],
				[2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
				[2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
				[2, 2, 1, 5, 2, 1, 1, 2, 1, 2, 1, 2],
				[2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
				[2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
				[1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
				[1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],	// 1891
				[1, 1, 2, 1, 1, 5, 2, 2, 1, 2, 2, 2],
				[1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
				[1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
				[2, 1, 2, 1, 5, 1, 2, 1, 2, 1, 2, 1],
				[2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
				[1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
				[2, 1, 5, 2, 2, 1, 2, 1, 2, 1, 2, 1],
				[2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
				[1, 2, 1, 1, 2, 1, 2, 5, 2, 2, 1, 2],
				[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],	// 1901
				[2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
				[1, 2, 1, 2, 3, 2, 1, 1, 2, 2, 1, 2],
				[2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
				[2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
				[1, 2, 2, 4, 1, 2, 1, 2, 1, 2, 1, 2],
				[1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
				[2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
				[1, 5, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
				[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
				[2, 1, 2, 1, 1, 5, 1, 2, 2, 1, 2, 2],	// 1911
				[2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
				[2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
				[2, 2, 1, 2, 5, 1, 2, 1, 2, 1, 1, 2],
				[2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
				[1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
				[2, 3, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
				[2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
				[1, 2, 1, 1, 2, 1, 5, 2, 1, 2, 2, 2],
				[1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
				[2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],   // 1921
				[2, 1, 2, 2, 3, 2, 1, 1, 2, 1, 2, 2],
				[1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
				[2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
				[2, 1, 2, 5, 2, 1, 2, 2, 1, 2, 1, 2],
				[1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
				[2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
				[1, 5, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2],
				[1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
				[1, 2, 2, 1, 1, 5, 1, 2, 1, 2, 2, 1],
				[2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],   // 1931
				[2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
				[1, 2, 2, 1, 6, 1, 2, 1, 2, 1, 1, 2],
				[1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
				[1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
				[2, 1, 4, 1, 1, 2, 2, 1, 2, 2, 2, 1],
				[2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
				[2, 2, 1, 1, 2, 1, 4, 1, 2, 2, 1, 2],
				[2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
				[2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
				[2, 2, 1, 2, 2, 4, 1, 1, 2, 1, 2, 1],   // 1941
				[2, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 2],
				[1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
				[2, 1, 2, 4, 1, 2, 1, 2, 2, 1, 2, 2],
				[1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
				[2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
				[2, 5, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
				[2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
				[2, 1, 2, 2, 1, 2, 3, 2, 1, 2, 1, 2],
				[1, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
				[2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],   // 1951
				[1, 2, 1, 2, 4, 1, 2, 2, 1, 2, 1, 2],
				[1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2],
				[1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
				[2, 1, 4, 1, 1, 2, 1, 2, 1, 2, 2, 2],
				[1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
				[2, 1, 2, 1, 2, 1, 1, 5, 2, 1, 2, 2],
				[1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
				[1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
				[2, 1, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1],
				[2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],   // 1961
				[1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
				[2, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2, 1],
				[2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
				[1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2],
				[1, 2, 5, 2, 1, 1, 2, 1, 1, 2, 2, 1],
				[2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
				[1, 2, 1, 2, 2, 1, 5, 2, 1, 2, 1, 2],
				[1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
				[2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
				[1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1, 2],   // 1971
				[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
				[2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
				[2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1, 2],
				[2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
				[2, 2, 1, 2, 1, 2, 1, 5, 1, 2, 1, 2],
				[2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1],
				[2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1],
				[2, 1, 1, 2, 1, 6, 1, 2, 2, 1, 2, 1],
				[2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
				[1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],   // 1981
				[2, 1, 2, 3, 2, 1, 1, 2, 1, 2, 2, 2],
				[2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
				[2, 1, 2, 2, 1, 1, 2, 1, 1, 5, 2, 2],
				[1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
				[1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
				[2, 1, 2, 1, 2, 5, 2, 2, 1, 2, 1, 2],
				[1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
				[2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2],
				[1, 2, 1, 1, 5, 1, 2, 2, 1, 2, 2, 2],
				[1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],   // 1991
				[1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
				[1, 2, 5, 2, 1, 2, 1, 1, 2, 1, 2, 1],
				[2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
				[1, 2, 2, 1, 2, 1, 2, 5, 2, 1, 1, 2],
				[1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 1],
				[2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
				[2, 1, 1, 2, 3, 2, 2, 1, 2, 2, 2, 1],
				[2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
				[2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1],
				[2, 2, 1, 5, 2, 1, 1, 2, 1, 2, 1, 2],   // 2001
				[2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
				[2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2],
				[1, 5, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
				[1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
				[2, 1, 2, 1, 2, 1, 5, 2, 2, 1, 2, 2],
				[1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
				[2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
				[2, 2, 1, 1, 5, 1, 2, 1, 2, 1, 2, 2],
				[2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
				[2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],   // 2011
				[2, 1, 2, 5, 2, 2, 1, 1, 2, 1, 2, 1],
				[2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
				[1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 1, 2],
				[1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1],
				[2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
				[1, 2, 1, 2, 1, 4, 1, 2, 1, 2, 2, 2],
				[1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
				[2, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2],
				[2, 1, 2, 5, 2, 1, 1, 2, 1, 2, 1, 2],
				[1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],   // 2021
				[2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
				[1, 5, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
				[1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
				[2, 1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1],
				[2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
				[1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
				[2, 2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1],
				[2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2],
				[1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
				[2, 1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1],   // 2031
				[2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
				[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 5, 2],
				[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2],
				[2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
				[2, 2, 1, 2, 1, 4, 1, 1, 2, 2, 1, 2],
				[2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
				[2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
				[2, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 1],
				[2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1],
				[2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],   // 2041
			];
			const solMonthDay = new Array(31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
			const isLeapYear = function(year) {return ((year % 400 == 0) || ((year % 100 != 0) && (year % 4 == 0)))};
			solMonthDay[1] = (isLeapYear(year)) ? 29 : 28;
			const lunaMonthDay = function(value) {
				switch(value) {
					case 1 : return 29;
					case 2 : return 30;
					case 3 : return 29 + 29;
					case 4 : return 29 + 30;
					case 5 : return 30 + 29;
					case 6 : return 30 + 30;
				}
			};

			let lunaYear, lunaMonth, lunaDay, yd, td;

			// 해당 년도의 음력 마지막 날짜
			if(month == 12 && day == 31)
				day = lunaMonthDay(table[year - 1841][11]);

			// 1841년부터 현재까지 음력 날짜 수 (음력 1840년 1월 1일은 양력 1841년 1월 23일)
			td = 0;
			for(let i = 0; i < year - 1841; i++)
				for(let j = 0; j < 12; j++)
					td += lunaMonthDay(table[i][j]);
			for(let j = 0; j < month - 1; j++)
				td += lunaMonthDay(table[year - 1841][j]);
			td = td + day + 22;

			lunaYear = 1840;
			do {
				lunaYear = lunaYear + 1;
				yd = (isLeapYear(lunaYear)) ? 366 : 365;
				if(td <= yd) break;
				td = td - yd;
			} while(1);

			lunaMonth = 0;
			do {
				lunaMonth = lunaMonth + 1;
				if(td <= solMonthDay[lunaMonth - 1]) break;
				td = td - solMonthDay[lunaMonth - 1];
			} while(1);

			lunaDay = td;

			const date = new Date(lunaYear, lunaMonth - 1, lunaDay);
			lunaYear = date.getFullYear();
			lunaMonth = date.getMonth() + 1;
			lunaDay = date.getDate();
			return {year: lunaYear, month : lunaMonth, day : lunaDay};
		}
	};

	const render = function(node, isPopup) {
		const div = document.createElement("div");
		const className = "ui-input-calendar" + ((isPopup) ? "" : " non-popup");
		div.setAttribute("class", className);
		const cloneNode = node.cloneNode(true);
		const type = (isPopup) ? "text" : "hidden";
		cloneNode.setAttribute("type", type);
		cloneNode.removeAttribute("non-popup");
		cloneNode.autocomplete = "off";

		if(cloneNode.value != "" && !isDate(cloneNode.value))
			cloneNode.value = getCalendar();

		const validateDate = (object) => {
			const value = object.value;
			const isFormat = /^(\d{4}-\d{2}-\d{2})$/.test(value);
			let date = (value && isFormat) ? new Date(value) : "";
			if(date) {
				if(isDate(date)) {
					const year = date.getFullYear();
					if(year < 1900) date.setFullYear("1900");
					else if(year > 2040) date.setFullYear("2040");
				} else {
					date = new Date();
				}
			}
			object.value = (date) ? getCalendar(date) : "";
		};
		cloneNode.addEventListener("focus", popup.open);
		cloneNode.addEventListener("blur", function(){validateDate(this)});
		cloneNode.addEventListener("change", function(){validateDate(this)});
		cloneNode.addEventListener("input", function() {
			const value = this.value;
			const isFormat = /^(\d{4}-\d{2}-\d{2})$/.test(value);
			if(value && isFormat) {
				validateDate(this);
				const date = new Date(this.value);
				if(date instanceof Date && popup.popup)
					popup.render(date);
			}
		});
		cloneNode.addEventListener("keydown", function(event) {
			event = event || window.event;
			const keyCode = event.keyCode || evnet.which;
			const isNumber = ((48 <= keyCode && keyCode <= 57) || (96 <= keyCode && keyCode <= 105)) ? true : false;
			const isCommand = event.ctrlKey || event.altKey || event.shiftKey;
			const isControl = ((keyCode < 48 && keyCode != 32)) ? true : false;

			if(keyCode == 13) {
				popup.close(false);
				this.blur();
			}
			if(!isNumber && !isCommand && !isControl) {
				event.preventDefault();
				event.returnValue = false;
				return false;
			}
		});
		cloneNode.addEventListener("click", function(event) {
			event = event || window.event;
			event.stopPropagation();
		});
		div.appendChild(cloneNode);
		node.parentNode.replaceChild(div, node);

		if(!isPopup) {
			const isMultiple = (cloneNode.getAttribute("multiple") != null) ? true : false;
			popup.container = div;
			popup.isMultiple = isMultiple;
			div.appendChild(popup.open(false));
			return popup;
		}
	};

	// 초기화
	if(!object)	object = document;
	const nodeList = object.querySelectorAll("input[type='calendar']");

	for(let node of nodeList) {
		const isPopup = (node.getAttribute("non-popup") != null) ? false : true;
		if(!isPopup) {
			if(object != document)
				return new render(node, false);
		} else {
			render(node, true);
		}
	}
}





function uiSearch(command) {
	const div = document.querySelector(".ui-search .date");
	if(!div) return;

	const setPeriod = function(command) {
		const today = new Date();
		const year = today.getFullYear();
		const month = today.getMonth();
		const day = today.getDate();
		const week = (today.getDay() == 0) ? 7 : today.getDay();
		const startDay = day - (week - 1);
		const endDay = startDay + 6;

		let startDate = new Date(year, month, day);
		let endDate = new Date(year, month, day);

		switch(command) {
			case "전체" :
				startDate = "";
				endDate = "";
				break;
			case "당해" :
			case "올해" :
				startDate = new Date(year, 0, 1);
				endDate = new Date(year, 12, 0);
				break;
			case "3개월" :
				startDate = new Date(year, month - 2, 1);
				endDate = new Date(year, month + 1, 0);
				break;
			case "당월" :
			case "이번달" :
				startDate = new Date(year, month, 1);
				endDate = new Date(year, month + 1, 0);
				break;
			case "전월" :
			case "지난달" :
				startDate = new Date(year, month - 1, 1);
				endDate = new Date(year, month, 0);
				break;
			case "이번주" :
				startDate = new Date(year, month, startDay);
				endDate = new Date(year, month, endDay);
				break;
			case "지난주" :
				startDate = new Date(year, month, startDay - 7);
				endDate = new Date(year, month, endDay - 7);
				break;
			case "어제" :
				startDate = endDate = new Date(year, month, day - 1);
				break;
			case "3일" :
			case "1주" :
			case "2주" :
				let addDay = getNumber(command);
				addDay = (command.indexOf("일") > -1) ? addDay : addDay * 7;
				startDate = new Date(year, month, day - addDay);
				break;
		}
		const input = div.querySelectorAll("input");
		input[0].value = (startDate) ? getCalendar(startDate) : "";
		input[1].value = (endDate) ? getCalendar(endDate) : "";

		const nodeList = div.querySelectorAll("a");
		nodeList.forEach(item => {
			if(item.innerHTML == command)
				item.parentNode.classList.add("focus");
		});
	};

	const aList = div.querySelectorAll("a");
	const setUnfocus = () => {
		aList.forEach(item => {
			item.parentNode.classList.remove("focus");
		});
	};

	aList.forEach(item => {
		item.addEventListener("click", function() {
			setUnfocus();
			setPeriod(this.innerHTML);
		});
	});

	const inputList = div.querySelectorAll(".ui-input-calendar input");
	inputList.forEach(item => {
		item.addEventListener("focus", function() {
			this.beforeValue = this.value;
		});
		item.addEventListener("change", function() {
			/*
			const startDate = div.querySelector("[name='startDate'],[name='fromDate']");
			const endDate = div.querySelector("[name='endDate'],[name='endDate']");
			if(startDate && endDate) {
				const startTime = new Date(startDate.value).getTime();
				const endTime = new Date(endDate.value).getTime();
				if(startTime > endTime) {
					this.value = (this.beforeValue) ? this.beforeValue : "";
				}
			}
			*/
			setUnfocus();
		});
	});

	if(command) setPeriod(command);
}





function uiBlock(message) {
	if(!uiBlock.count) uiBlock.count = 0;
	uiBlock.count++;
	if(uiBlock.count == 1) {
		const body = document.querySelector("body");
		const div = document.createElement("div");
		div.className = "ui-popup ui-block";
		div.innerHTML = '<div><div><div class="box">잠시만 기다려 주세요.<span></span></div></div></div>';
		body.appendChild(div);
		uiBlock.popup = div;
		uiBlock.span = div.querySelector("span");
		setTimeout(function() {
			div.classList.add("focus");
		}, 300);
	} else {
		uiBlock.span.innerHTML = "(현재 " + uiBlock.count + "건을 처리 중 입니다.)";
	}
}

function uiUnblock() {
	if(!uiBlock.popup) return;
	uiBlock.count--;

	const popup = uiBlock.popup;
	const count = uiBlock.count;

	if(count < 1) {
		uiBlock.count = uiBlock.popup = undefined;
		popup.classList.remove("focus");
		setTimeout(function(){
			popup.parentNode.removeChild(popup);
		}, 300);
	} else {
		uiBlock.span.innerHTML = (uiBlock.count > 1) ? " (현재 " + uiBlock.count + "건을 처리 중 입니다.)" : "";
	}
}





function uiTip(object) {
	if(!object) object = document;

	const popup = {
		self : undefined,
		timer : undefined,
		open : function() {
			const tipColor = this.getAttribute("data-tip-color") || "red";
			const tipAlign = this.getAttribute("data-tip-align") || "center";

			const rect = this.getBoundingClientRect();
			const screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
			const screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
			const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
			const scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);

			const body = document.querySelector("body");
			const div = document.createElement("div");
			const p = document.createElement("p");
			div.className = "ui-tip-popup" + " " + tipColor + " " + tipAlign;

			let left = 0;
			let top = 0;

			if(tipAlign == "right") {
				left = (scrollLeft + rect.left + rect.width + 12);
				top = scrollTop + rect.top;
			} else {
				left = scrollLeft + rect.left + (rect.width / 2);
				top = scrollTop + rect.top;
			}
			div.style.left = left + "px";
			div.style.top = top + "px";
			p.innerHTML = this.getAttribute("data-tip");
			div.appendChild(p);
			body.appendChild(div);

			div.style.width = p.offsetWidth + 2 + "px";
			if(tipAlign == "right") {
				div.style.marginTop = (div.offsetHeight / 2) * -1 + (rect.height / 2) + 1 + "px";
			} else {
				div.style.marginTop = (((div.offsetHeight) * -1) - 5) + "px";
				div.style.marginLeft = ((div.offsetWidth / 2) * -1) + "px";
			}

			if((rect.left + scrollLeft) > screenWidth) {
				div.classList.add("reverse");
				div.style.marginLeft = (div.offsetWidth * -1 - rect.width - 24) + "px";
			}
			setTimeout(function() {
				div.classList.add("focus");
			}, 100)

			popup.self = div;
		},
		close : function(isForce) {
			const div = popup.self;
			if(!div) return;
			div.classList.remove("focus");
			popup.self = undefined;
			setTimeout(function() {
				div.parentNode.removeChild(div);
			}, 100);
		}
	};

	const nodeList = object.querySelectorAll(".ui-tip[data-tip]");
	nodeList.forEach(item => {
		item.addEventListener("mouseover", popup.open);
		item.addEventListener("mouseout", popup.close);
	});
}





function uiHelp() {
	const nav = document.querySelector(".ui-nav");
	const header = document.querySelector(".ui-header");
	const div = document.querySelector(".ui-tips > div");
	if(!div) return;

	const headerHeight = (header) ? header.offsetHeight : 0;
	const navHeight = (nav) ? nav.offsetHeight : 0;

	const setMaxHeight = () => {
		const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
		const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		const remain = (scrollTop > headerHeight) ? 0 : headerHeight - scrollTop;
		div.style.maxHeight = windowHeight - remain - navHeight + "px";
	};

	setMaxHeight();
	window.addEventListener("scroll", setMaxHeight);
}





function uiColor(type) {
	type = type.toLowerCase();
	switch(type) {
		case "appointment" : return "purple";
		case "class" : return "orange";
		case "place" : return "blue";
		case "option" : return "gray";
		case "package" : return "green";
	}
	return "";
}





const uiParameter = {
	color : {
		red : "#ff5722",
		blue : "#004fec",
		green : "#37b772",
		yellow : "#ffcd56",
		purple : "#7a52cc",
		orange : "#f39800",
		gray : "#bababa"
	},
	service : {
		kind : {
			P : "기간제",
			N : "횟수제"
		},
		name : {
			APPOINTMENT : "개인레슨",
			CLASS : "그룹수업",
			PLACE : "시설이용",
			OPTION : "옵션",
			PACKAGE : "패키지"
		},
		color : {
			APPOINTMENT : "purple",
			CLASS : "orange",
			PLACE : "blue",
			OPTION : "gray",
			PACKAGE : "green"
		},
		saleYn : {
			Y : "판매",
			N : "중지"
		}
	},
	schedule : {
		state : {
			C : "취소",
			E : "출석",
			A : "결석",
			R : "예약",
			W : "예약 대기",
			S : "완료 요청",
			modify_schedule : "예약 변경"
		}
	},
	customer : {
		condition : {
			ALL : "모든고객",
			NEW : "신규등록",
			INUSE : "만료 전 재등록",
			CHURN : "만료 후 재등록",
			UPGRADE : "이용권 업그레이드",
			CROSS : "이용권 교체",
		}
	},
	coupon : {
		discount : {
			type : {
				PRICE : "할인가격",
				RATE : "할인율"
			}
		}
	},
	payment : {
		paymentType : {
			CASH : "현금",
			CARD : "카드",
			TRANSFER : "이체"
		},
		cashReceiptType : {
			MOBILE : "휴대전화",
			BUSINESS_NUMBER : "사업자번호",
			CASH_RECEIPT_CARD : "현금영수증카드"
		},
		paymentKind : {
			NEW : "판매",
			ORDER : "일반",
			RECEIVABLES : "미수금",
			TRANSFER : "양도",
			PASS : "판매",
			UPGRADE : "업그레이드",
			CROSS : "교체",
			REFUND : "환불",
			REPAYMENT : "재결제",
			MERGE : "이용권 결합"
		},
		paymentStatus : {
			PARTIAL_CANCELLED : "분할 취소",
			PAYMENT_CANCELLED : "취소",
			PAYMENT_COMPLETED : "완료",
		}
	},
	pass : {
		state : {
			COMPLETED : "완료",
			CANCELLED : "취소",
			REFUNDED : "환불",
			UPGRADED : "재판매 후 만료",
			CROSSED : "교체 완료",
			MERGED : "재판매 후 만료",
			TRANSFERRED : "양도 완료"
		},
		status : {
			AVAILABLE : "이용 가능",
			PAUSE : "중지 중",
			EXPIRATION : "만료",
			CROSS_CANCELLED : "교체 취소",
			TRANSFER_CANCELLED : "양도 취소",
			CANCELLED : "취소"
		},
		statusColor : {
			AVAILABLE : "green",
			PAUSE : "red",
			EXPIRATION : "gray"
		},
		expirationReason : {
			PERIOD : "기간 만료",
			COUNT : "횟수 만료",
			UPGRADE : "업그레이드 만료",
			CROSS : "재판매 후 만료",
			TRANSFER : "양도 만료",
			MERGE : "재판매 후 만료",
			ADMIN : "관리자 만료처리"
		},
	},
	history : {
		PASS : "이용권 판매",
		ORDER : "이용권 결제",
		UPGRADE : "업그레이드",
		CROSS : "교체",
		REFUND : "환불",
		TRANSFER : "양도",
		TRANSFER_RECEIVE : "양수",
		MERGE : "결합",

		ORDER_MODIFY : "결제 수정",
		UPGRADE_MODIFY : "업그레이드 수정",
		CROSS_MODIFY : "교체 수정",
		REFUND_MODIFY : "환불 수정",
		MERGE_MODIFY : "결합 수정",

		ORDER_CANCEL : "판매 취소",
		UPGRADE_CANCEL : "업그레이드 취소",
		CROSS_CANCEL : "교체 취소",
		REFUND_CANCEL : "환불 취소",
		TRANSFER_CANCEL : "양도 취소",
		MERGE_CANCEL : "결합 취소",

		WEEK_LIMIT : "주간 이용 제한",
		DAY_LIMIT : "일일 이용 제한",
		USE_NUMBER_PERIOD : "사용횟수/기간",
		CANCEL_NUMBER : " 취소권",
		FORCE_CANCEL_NUMBER : "휴회권",
		PAUSE : "중지",
		PAUSE_NUMBER : "중지 횟수",
		PAUSE_PERIOD : "중지 기간",
		MAX_BOOKING_NUMBER : "최대 예약 횟수",

		RECEIVABLE : "미수금 결제",

		SCHEDULE_CANCEL : "출석/결석 취소",
		SCHEDULE_ENTRANCE : "출석",
		SCHEDULE_ABSENCE : "결석",

		CHANGE_COACH : "담당강사",
		CHECKIN : "입장",

		SERVICE_INFO : "서비스 정보",
		SERVICE_TIME : "서비스 시간",
		SERVICE_PLACE : "서비스 장소",
		LESSON_PLACE : "수업 장소",

		//회계관리-매출조회 화면
		RECEIVABLES : "일반 이용권 결제",
		REPAYMENT : "재결제",

		BATCH_EXTENSION : "이용권 일괄 연장",
		BATCH_EXTENSION_RB : "이용권 일괄 연장 복구",
		PRICING_DETAIL_INFO : "가격정책 일괄 변경",

		LOCKER_SYNC : "락커 기간 변경",
		BATCH_LOCKER_SYNC : "락커 일괄 연동"
	},
	employee : {
		code : {
			"-1" : "기본 관리자",
			"00" : "대표 관리자",
			"01" : "대표자",
			"02" : "팀장",
			"03" : "매니저",
			"04" : "일반"
		}
	},
	order : {
		type : {
			PASS : "판매",
			UPGRADE : "업그레이드",
			CROSS : "교체",
			TRANSFER : "양도",
			MERGE : "결합"
		},
		state : {
			COMPLETED : "완료",
			CANCELLED : "취소",
			REFUNDED : "환불",
			REFUNDED_PART : "부분 환불",
			MERGED_PART : "부분 결합"
		}
	},
	notice : {
		receiveMemberType : {
			ALL : "전체회원",
			AVAILABLE : "이용회원",
			EXPIRATION : "만료회원"
		}
	}
}





function uiError(error) {
	let message = "작업 중 에러가 발생하였습니다.";
	switch(typeof error) {
		case "object" :
			let errorList = error.responseJSON;
			const messageList = [];
			message = "";
			if(errorList) {
				if(!Array.isArray(errorList)) errorList = [errorList];
				errorList.forEach(item => {
					messageList.push(item.reason);
				});
				message += messageList.join("\n");
			}
			console.error(error);
			break;

		case "number" :
			switch(error) {
				case 403 : message = "페이지 접근 권한이 없습니다."; break;
				case 405 : message = "비정상적인 접근 입니다.";	break;
				case 419 : message = "만료된 페이지 입니다."; break;
			}
			break;

		case "string" :
			message = error;
			break;
	}
	alert(message);
}




function uiConsole(message, color) {
	if(!color) color = "blue";
	color = uiParameter.color[color];
	console.log("%c" + message, "font-style:italic; color:" + color);
}




// ******** BINDING EVENTS ********
function uiEvent(object, events) {
	for(const event in events) {
		const items = events[event];
		for(let item in items) {
			const node = object.querySelectorAll("[data-event='" + item + "']");
			const callback = items[item];
			node.forEach(function(item) {
				item.addEventListener(event, callback);
			});
		}
	}
}





const uiHistory = {
	maxLength : 20,
	getUri : function() {
		return window.location.pathname + window.location.search;
	},
	getMeta : function(name) {
		const meta = document.querySelector("meta[name='bodycodi']");
		const content = (meta) ? meta.getAttribute("content") : "";
		const contentList = content.split(",");
		for(let i = 0; i < contentList.length; i++) {
			const item = (contentList[i] || "").replace(/\s/g, "").split("=");
			if(item[0] == name) return item[1];
		}
	},
	setButton : function(array) {
		const length = array.length;
		const a = document.querySelectorAll("[data-event='uiHistoryBack']");
		a.forEach(item => {
			item.classList.remove("empty");
			if(length < 2)
				item.classList.add("empty");
		});
	},
	back : function() {
		window.history.back();
		/*
		const backUri = this.pop();
		if(!backUri) return;
		window.location.href = backUri;
		if(document.referrer) {
			window.location.href = document.referrer;
		} else {
			window.history.back();
		}
		*/
	},
	push : function() {
		try {
			const backHistory = JSON.parse(sessionStorage.getItem("backHistory")) || [];
			const currentUri = this.getUri();
			const data = backHistory[backHistory.length - 1] || {};
			if((this.getMeta("backHistory") == "false") || (currentUri == data.backUri)) {
				this.setButton(backHistory);
				return;
			}
			backHistory.push({
				backUri : currentUri
			});
			if(backHistory.length == this.maxLength) backHistory.shift();
			sessionStorage.setItem("backHistory", JSON.stringify(backHistory));
			this.setButton(backHistory);
		} catch(error) {
			console.log(error);
		}
	},
	pop : function() {
		try {
			const backHistory = JSON.parse(sessionStorage.getItem("backHistory")) || [];
			let data = backHistory.pop();
			if(this.getUri() == data.backUri)
				data = backHistory.pop() || {};
			if(!data.backUri) return;
			sessionStorage.setItem("backHistory", JSON.stringify(backHistory));
			this.setButton(backHistory);
			return data.backUri;
		} catch(error) {
			console.log(error);
		}
	},
	remove : function() {
		sessionStorage.removeItem("backHistory");
	},
	store : function() {
		sessionStorage.setItem("backUri", this.getUri());
	},
	restore : function(isRedirect) {
		const backUri = sessionStorage.getItem("backUri");
		if(isRedirect == false)
			return (backUri) ? backUri : (document.referrer) ? document.referrer : "/home";
		if(!backUri)
			window.history.back();
		else
			window.location.href = backUri;
	}
}





function uiTab(object) {
	if(!object) object = document;
	const nodeList = object.querySelectorAll(".ui-tab");
	nodeList.forEach(item => {
		const input = item.querySelectorAll("input");
//		const div = item.parentNode.querySelectorAll(":scope > .tab");
		const parent = item.parentNode;
		const div = Array.from(item.parentNode.querySelectorAll(".tab")).filter(item => {
			return (item.parentNode == parent);
		});

		if(input.length <= div.length) {
			input.forEach((item, index) => {
				item.addEventListener("change", function() {
					input.forEach((item, index) => {
						div[index].classList.remove("focus");
					});
					div[index].classList.add("focus");
				});
			});
		}
	});
}





function uiDataTable(table, data, callback, option) {
	const dataTable = $(table).DataTable();

	if(typeof data == "string") {
		dataTable.destroy();
		table.classList.remove("ui-table");
		table.classList.add("ui-data-table");
		const tbody = table.querySelector("tbody");
		tbody.innerHTML = data;
		uiTable(table.parentNode);
	} else {
		if(option == "empty") {
			const pageLength = Number(table.getAttribute("data-table-length"));
			const dataLength = data.length;
			if(pageLength && dataLength && pageLength < dataLength) {
				const td = Array.from(table.querySelector("tr").querySelectorAll("td")).map(item => {
					return "&nbsp;";
				});
				const repeat =  (dataLength % pageLength) ? pageLength - (dataLength % pageLength) : 0;
				for(let i = 0; i < repeat; i++)
					data.push(td);
			}
		}
		dataTable.rows().remove().draw();
		dataTable.rows.add(data).draw();
	}
	if(callback) {
		if(option == "once")
			dataTable.one("draw", callback);
		else {
			callback();
			dataTable.on("draw", callback);
		}
	}
}



function uiDate(date, type, format) {
	if(!date) return "";
	const isDate = (!type || type == "date");
	if(isNumber(date)) {
		date = new Date(date).format("yyyy-mm-ddThh:MM:ss");
	}
	date = String(date);
	if(date.substr(10, 1) == " ")
		date = date.replace(" ", "T");
	if(date.indexOf(":") > - 1)
		date += "+09:00";
	if(format) return new Date(date).format(format);
	return new Date(date).format("yyyy.sm.sd (sw)" + ((isDate) ? "" : " ap sh:MM"));
}




function uiObjectDate(item, name) {
	const data = item[name];
	if(!(data && data.dateTime)) return "-";
	const date = data.dateTime.date;
	const time = data.dateTime.time;
	const datetime = new Date(date.year, date.month - 1, date.day, time.hour, time.minute, time.second);
	return uiDate(datetime.format("yyyy-mm-ddThh:MM:ss"), "time");
}




const uiPermission = function(object) {
	const data = uiPermission.data;
	if(!data) {
		console.error("권한 설정에 필요한 데이터가 없습니다.")
		return;
	}
	if(!object) object = document;
	const nodeList = object.querySelectorAll("[data-permission]");

	nodeList.forEach(item => {
		const permission = item.getAttribute("data-permission").split("/");
		const group = permission[0];
		const name = permission[1];
//		console.log("group : " + group + ", name : " + name + ", isPermission : " + data[group][name]);
		if(!group || !name || !data[group]) return;
		const isPermission = data[group][name];
		if(!isPermission) {
			const tagName = item.tagName.toLowerCase();
			if(tagName == "a")
				item.removeAttribute("href");
			else if(tagName == "button")
				item.classList.add("disabled");
			else if(tagName == "input" || tagName == "select")
				item.disabled = true;
			const cloneNode = item.cloneNode(true);
			item.parentNode.replaceChild(cloneNode, item);
			cloneNode.addEventListener("click", function() {
				alert("해당 기능에 대한 권한이 설정되어 있지 않습니다. 사용자 변환을 하거나 사용자 권한을 설정해 주세요.");
			});
		}
	});
}



const uiSafeValue = function(value) {
	if(!value) return "";
	return String(value).replace(/\</g, "&#60;").replace(/\>/g, "&#62;").replace(/\"/g, "&#34;").replace(/\'/g, "&#39;");
};



const uiExport = {
	/*
	excel : function(sheetName, fileName, exportTable, sheetStyle, isBlob) {
		const workBook = XLSX.utils.book_new();
		const workSheet = XLSX.utils.table_to_sheet(this.exportTable(exportTable));
		for(let name in sheetStyle)
			workSheet[name] = sheetStyle[name];
		XLSX.utils.book_append_sheet(workBook, workSheet, sheetName);
		const workBookBinary = XLSX.write(workBook, {bookType : "xlsx",  type : "binary"});
		const blob = new Blob([this.binaryToHex(workBookBinary)], {type:"application/octet-stream"})
		return (isBlob) ? blob : saveAs(blob, fileName + ".xlsx");
	},
	 */
	excel : function(table, cloneTable, sheetName, fileName, callback) {
		const workBook = new ExcelJS.Workbook();
		const workSheet = workBook.addWorksheet(sheetName);
		const exportTable = uiExport.exportTable(cloneTable);

		const trList = Array.from(exportTable.rows);
		const dataList = [];
		const mergeList = [];

		const getCoord = (x, y) => {
			const col = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")[x];
			return col + (y + 1);
		};

		const setColumnSize = () => {
			const sizeList = [];
			Array.from(table.rows[0].cells).forEach(item => {
				if(!item.classList.contains("hidden")) {
					const width = item.offsetWidth || 150;
					sizeList.push({width : width / 7.5});
				}
			});
			workSheet.columns = sizeList;
		};

		const setDataList = () => {
			const getClassName = (element, nameList) => {
				for(let i = 0; i < nameList.length; i++) {
					let name = nameList[i];
					if(element.classList.contains(name)) {
						if(name == "currency") name = "right";
						else if(name == "name" || name == "memo") name = "left";
						return name;
					}
				}
				return "";
			};
			trList.forEach((item, index) => {
				const tdList = Array.from(item.cells).map(item => {
					let align = getClassName(item, ["currency", "name"]);
					const color = getClassName(item, ["green", "red"]);
					return {
						text : item.innerText,
						align : align,
						color : color,
						rowspan : false
					};
				});
				dataList.push(tdList);
			});
			return dataList;
		};

		const setMergeList = () => {
			trList.forEach((item, y) => {
				Array.from(item.cells).forEach((item, x) => {
					const colspan = item.colSpan - 1;
					const rowspan = item.rowSpan - 1;
					if(colspan || rowspan) {
						const start = getCoord(x, y);
						const end = getCoord(x + colspan, y + rowspan);
						mergeList.push(start + ":" + end);
						if(colspan) {
							dataList[y][x].colspan = true;
							for(let i = 1; i <= colspan; i++)
								dataList[y].splice(x + i, 0, {text : "", colspan : (i < colspan)});
						}
						if(rowspan) {
							dataList[y][x].rowspan = true;
							for(let i = 1; i <= rowspan; i++)
								dataList[y + i].splice(x, 0, {text : "", rowspan : (i < rowspan)});
						}
					}
				});
			});
		};

		const setCellStyle = () => {
			const yLength = dataList.length;
			const xLength = dataList[0].length;

			let rowCount = 0;
			for(let y = 0; y < yLength; y++) {
				workSheet.getRow(y + 1).height = 18;
				const isEven = (rowCount > 0 && (rowCount % 2) == 0);
				let isRowCount = true;
				for(let x = 0; x < xLength; x++) {
					const item = dataList[y][x];
					if(isRowCount && item.rowspan)
						isRowCount = false;
					const cell = workSheet.getCell(getCoord(x, y));
					cell.border = {top : {style : "thin"}, left : {style : "thin"}, right : {style : "thin"}, bottom : {style : "thin"}};
					cell.font = {name : "맑은 고딕", size : 10};
					if(y == 0) {
						cell.alignment = {vertical : "middle", horizontal : "center"};
						cell.font.bold = true;
						cell.font.color = {argb : "FFFFFF"};
						cell.fill = {type : "pattern", pattern : "solid", fgColor : {argb : "686D7B"}};
					} else {
						const align = item.align || "center";
						cell.alignment = {vertical : "middle", horizontal : align};
						if(isEven) {
							cell.font.color = {argb : "000000"};
							cell.fill = {type : "pattern", pattern : "solid", fgColor : {argb : "E0E0E0"}};
						}
					}
				}
				if(isRowCount) rowCount++;
			}
		};

		const setData = () => {
			const data = dataList.map(item => {
				return item.map(item => {
					return (item) ? item.text : "";
				});
			});
			workSheet.addRows(data);
		};

		const setMergeData = () => {
			mergeList.forEach(item => {
				workSheet.mergeCells(item);
			});
		};

		const saveFile = () => {
			const buffer = workBook.xlsx.writeBuffer().then(data => {
				const blob = new Blob([data], {type : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
				saveAs(blob, fileName + ".xlsx");
				if(callback) callback();
			});
		};

		setColumnSize();
		setDataList();
		setMergeList();
		setData();
		setCellStyle();
		setMergeData();
		saveFile();
	},
	binaryToHex : function(value) {
		const buffer = new ArrayBuffer(value.length);
		const view = new Uint8Array(buffer);
		for(let i = 0; i < value.length; i++)
			view[i] = value.charCodeAt(i) & 0xFF;
		return buffer;
	},
	exportTable : function(table) {
		table = table.cloneNode(true);

		const checkDisplay = () => {
			const trList = Array.from(table.rows);
			trList.forEach((item, index) => {
				const tdList = Array.from(item.cells);
				const td = item.querySelector("td");
				const isHidden = item.classList.contains("hidden");
				if(isHidden || tdList.length < 2) {
					item.parentNode.removeChild(item);
				} else {
					tdList.forEach(item => {
						const isHidden = item.classList.contains("hidden");
						if(isHidden)
							item.parentNode.removeChild(item);
					});
				}
			});
		};

		const checkMultiple = () => {
			const trList = Array.from(table.rows);
			trList.forEach(item => {
				const tdList = Array.from(item.cells);
				let rowspan = 0;
				const isMultiple = tdList.some(item => {
					const isMultiple = item.classList.contains("multiple");
					if(isMultiple) {
						rowspan = item.querySelectorAll("li").length;
						return true;
					}
				});
				if(isMultiple) {
					const oldTr = item;
					for(let i = 0; i < rowspan; i++) {
						const newTr = document.createElement("tr");
						tdList.forEach(item => {
							const isMultiple = item.classList.contains("multiple");
							if(!isMultiple) {
								if(i == 0) {
									item.setAttribute("rowspan", rowspan);
									newTr.appendChild(item);
								}
							} else {
								const liList = item.querySelectorAll("li");
								const td = document.createElement("td");
								td.className = item.className;
								td.innerHTML = liList[i].innerHTML;
								newTr.appendChild(td);
							}
						});
						oldTr.parentNode.insertBefore(newTr, oldTr);
					}
					oldTr.parentNode.removeChild(oldTr);
				}
			});
		};
		checkDisplay();
		checkMultiple();
		return table;
	}
};


const uiImageUpload = function(container, minWidth, controller, callback) {
	const input = container.querySelectorAll("[data-event='uploadImage']");
	input.forEach(item => {
		const form = item.parentNode;
		const input = form.querySelector("input[type=file]");
		const img = form.querySelector("img");
		const a = form.querySelector("a");
		input.onchange = () => {
			if(!input.value) return;
			const image = new Image();
			image.onload = function(data) {
				if(image.width < minWidth && !confirm("이미지의 가로 사이즈가 " + minWidth + "픽셀 이하인 경우 제대로 표시되지 않을 수 있습니다. 계속하시겠습니까?")) return;
				const type = input.getAttribute("data-type");
				controller(type, form).then(data => {
					if(data) {
						this.value = img.src = data;
						img.setAttribute("data-source", data);
						form.classList.remove("empty");
					} else {
						this.value = img.src = "";
						img.setAttribute("data-source", "");
						form.classList.add("empty");
					}
					if(callback)
						callback({
							type : type,
							source : data
						})
				}).catch(error => {
					console.log(error);
					alert("이미지 업로드에 실패하였습니다.");
				});
			};
			image.src = URL.createObjectURL(input.files[0]);
		};
		a.onclick = () => {
			this.value = img.src = "";
			img.setAttribute("data-source", "");
			form.classList.add("empty");
		};
	});
};



const uiAjaxList = {
	popup : undefined,
	data : {},
	callback : {
		before : undefined,
		complete : undefined
	},
	isActive : false,
	isButton : false,
	open : function(data, callback, isButton) {
		if(this.popup) return;
		try {
			this.data = {
				data : data || [],
				repeat : data.length,
				success : 0,
				failed : 0,
			};
			this.isButton = (isButton);
			this.callback = (callback) ? callback : {};
			if(!data) return;
			this.render();
		} catch(error) {
			console.log(error);
		}
	},
	close : function() {
		this.popup = undefined;
		if(this.isActive) return;
		uiPopup();
		if(this.callback.complete)
			this.callback.complete();
	},
	render : function() {
		const self = this;
		const update = () => {
			const repeat = this.data.repeat;
			const length = this.data.data.length;
			const percent = Math.ceil((repeat - length) * 100 / repeat);

			const span = this.popup.querySelector("[data-id='bar']");
			span.innerHTML = span.style.width = percent + "%";
			this.popup.putValue("success", getComma(this.data.success));
			this.popup.putValue("failed", getComma(this.data.failed));

			const button = this.popup.querySelector("button[data-event='close']");
			if(!length) {
				this.isActive = false;
				span.classList.add("complete");
				this.popup.putValue("state", "처리가 완료되었습니다.");

				if(button) {
					button.disabled = false;
					button.innerHTML = "처리 완료";
				} else {
					setTimeout(function() {
						self.close();
					}, 1000);
				}
			}
		};
		const repeat = () => {
			if(this.callback.before)
				this.callback.before();
			const data = this.data.data.pop();
			if(data) {
				this.isActive = true;
				return data().then(data => {
					if(this.callback.after)
						this.callback.after(data);
					update();
					setTimeout(() => {
						repeat();
					}, 200);
				}).catch(error => {
					console.log(error);
				});
			}
		};
		this.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					close : function() {self.close()}
				}
			}
		});
		setTimeout(() => {
			repeat();
		}, 100);
	},
	template : function() {
		const getButton = () => {
			return (this.isButton) ? `
				<button class="ui-button green" data-event="close" disabled>처리 중</button>
			` : ``;
		};
		return `
			<style type="text/css">
				.blockUI,
				.ui-block							{display:none !important}
				.popupAjax							{max-width:400px}
				.popupAjax .box						{padding:27.5px; padding-bottom:25px}
				.popupAjax .progress				{position:relative; margin:0; padding:0; height:35px; background-color:#f0f0f0; border-radius:0; box-shadow:inset 0 1px 1px rgba(0,0,0,0.2); line-height:35px; text-align:center; white-space:nowrap}
				.popupAjax .progress .bar			{position:absolute; left:0; top:0; width:0; height:100%; background-color:#37b772; text-align:center; color:white; overflow:hidden; transition:width 0.2s, background 0.2s; animation:progress-bar 4s linear infinite}
				.popupAjax .progress .bar			{background:#004fec linear-gradient(-45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%) left / 35px 35px}
				.popupAjax .progress .bar.complete	{background:#004fec}
				.popupAjax .state					{margin-top:5px}
				.popupAjax .state dl				{table-layout:auto}
				.popupAjax .state dl dt				{text-align:left}
				.popupAjax .state dl dd				{text-align:right}
				.popupAjax button					{display:block; margin:0 auto; margin-top:10px; width:135px}
				@keyframes progress-bar {
		  			0%		{background-position:0 0}
				    100%	{background-position:35px 35px}
				}
			</style>
			<div class="popupAjax">
				<div class="box">
					<div class="progress"><span class="bar" data-id="bar">0%</span></div>
					<div class="state">
						<dl>
							<dt data-msg="state">
								요청을 처리 중 입니다.
							</dt>
							<dd>
								성공 : <var class="green" data-msg="success">0</var> ·
								실패 : <var class="red" data-msg="failed">0</var>
							</dd>
						</dl>
					</div>
					${getButton()}
				</div>
			</div>
		`;
	}
};



function uiAjaxTable(container, request, response, option) {
	if(!(container && request && response)) {
		console.log("incorrect parameter");
		return;
	}

	const setOption = () => {
		let paginationLength = (option) ? option.paginationLength || 7 : 7;
		if(paginationLength % 2 == 0) paginationLength++;
		this.paginationLength = paginationLength;
	};

	const setContainer = () => {
		const tagName = container.tagName.toLowerCase();
		if(tagName == "table") {
			const div = document.createElement("div");
			div.className = "ui-table-box";
			div.appendChild(container.cloneNode(true));
			container.parentNode.replaceChild(div, container);
			this.container = div;
		} else {
			this.container = container;
		}
		if(!this.container.querySelector("nav")) {
			const nav = document.createElement("nav");
			nav.className = "hidden";
			this.container.appendChild(nav);
		}
	};

	const getPagination = (pageIndex, pageLength, paginationLength) => {
		const navList = [];
		if(pageLength < paginationLength) {
			for(let i = 1; i <= pageLength; i++)
				navList.push(i);
		} else {
			const j = parseInt(paginationLength / 2);
			navList.push(1);
			let start = pageIndex - j + 1;
			if(start < 2) start = 2;
			let end = pageIndex + j - 1;
			if(end > pageLength - 1) end = pageLength - 1;

			const minEnd = paginationLength;
			const minStart = pageLength - paginationLength + 1;
			if(end < minEnd)
				end = minEnd - 1;
			if(minStart < start)
				start = minStart + 1;

			for(let i = start; i <= end; i++) {
				let number = i;
				if(i == start && i != 2) number = "···";
				if(i == end && i != pageLength - 1) number = "···";
				navList.push(number);
			}
			navList.push(pageLength);
		}

		const nav = document.createElement("nav");

		navList.forEach(item => {
			const a = document.createElement("a");
			if(item == pageIndex) a.className = "focus";
			if(item == "···")
				a.disabled = true;
			else
				a.setAttribute("data-index", item);
			a.innerHTML = item;
			nav.appendChild(a);
		});
		return nav;
	};

	const setPagination = (pageIndex) => {
		const oldNav = this.container.querySelector("nav");
		const newNav = getPagination(pageIndex, this.pageLength, this.paginationLength);
		newNav.querySelectorAll("a").forEach(item => {
			item.onclick = function() {
				const pageIndex = Number(this.getAttribute("data-index"));
				if(pageIndex)
					getPage(pageIndex);
			};
		});
		if(this.pageLength < 2)	newNav.className = "hidden";
		this.container.replaceChild(newNav, oldNav);
	};

	uiAjaxTable.prototype.getInfo = () => {
		return {
			container : this.container,
			page : {
				index : this.pageIndex,
				length : this.pageLength
			},
			option : {
				paginationLength : this.paginationLength
			},
			data : this.data
		}
	};

	const getPage = (pageIndex) => {
		request(pageIndex, this.offset).then(data => {
			// 페이지 수를 다시 계산한다.
			// 데이터 오프셋를 기록한다.
			this.pageIndex = pageIndex;
			this.pageLength = data.pageLength || 0;
			this.offset = data.offset || 0;
			this.data = data;
			response(data);
			setPagination(pageIndex);
		}).catch(error => {
			console.log(error);
		});
	};

	setOption();
	setContainer();
	getPage(1);
};
