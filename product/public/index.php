
<!DOCTYPE html>
<html lang="ko">
<head>
	<title>BODY CODI - 바디코디</title>

	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link rel="icon" href="/favicon.ico">
	<link type="text/css" rel="stylesheet" href="/static/css/common.css?v=20211110">
	<link type="text/css" rel="stylesheet" href="/static/css/ui.css?v=20211220">
	<link type="text/css" rel="stylesheet" href="/static/css/popup/popupHeader.css?v=20211116">
	<!--
	<link type="text/css" rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css">
	-->

	<script type="text/javascript" src="/static/js/common/jquery/jquery-1.11.3.min.js"></script>
	<script type="text/javascript" src="/static/js/common/jquery/jquery.blockUI.js"></script>
    <script type="text/javascript" src="/static/js/common/socketio/socket.io.1.7.3.js"></script>
	<script type="text/javascript" src="/static/js/common/printer_core.js"></script>
	<script type="text/javascript" src="/static/js/common/bootstrap/moment.js"></script>
	<script type="text/javascript" src="/static/js/common/bootstrap/moment-with-locales.min.js"></script>
	<script type="text/javascript" src="/static/js/common/barcode_core.js"></script>
	<script type="text/javascript" src="/static/js/common.js?v=2.5"></script>
	<script type="text/javascript" src="/static/js/ui.js?v=20211013"></script>
	<script type="text/javascript" src="/static/js/ui/uiHeader.js?v=20211222"></script>

	<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" async></script>
	<script src="https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.6.7/firebase-analytics.js"></script>

	<script type="text/javascript" src="/static/js/controller/commonController.js?v=20211108"></script>
	<script type="text/javascript" src="/static/js/controller/coachController.js?v=2.5"></script>
	<script type="text/javascript" src="/static/js/controller/memberController.js?v=2.5"></script>
	<script type="text/javascript" src="/static/js/controller/permissionController.js"></script>
	<script type="text/javascript" src="/static/js/controller/smsController.js?v=2.5"></script>

	<script type="text/javascript" src="/static/js/popup/popupCamera.js"></script>
	<script type="text/javascript" src="/static/js/popup/popupLoginCoach.js?v=2.5"></script>
	<script type="text/javascript" src="/static/js/popup/popupMember.js?v=20211116"></script>
	<script type="text/javascript" src="/static/js/popup/popupSendSms.js?v=2.5"></script>
	<script type="text/javascript" src="/static/js/popup/popupTodo.js"></script>
	<script type="text/javascript" src="/static/js/sitemap.js?v=2.5"></script>

	<style type="text/css">
		
			.branchDisplay 							{display:none !important}
		</style>
	<script type="text/javascript">
		const partnerId = Number("774");
		const branchId = Number("0");
		const printerCore = new PrinterCore();
		const socketAddress = {
			https	: "https://crm.bodycodi.com:8043",
			http	: "http://52.78.149.182:8081/"
		};

		const partnerInfo = {
			partner : {
				id			: Number("774"),
				name		: "바디코디",
				branchUseYn	: "N",
				headquartersYn : "N",
				partnerType : "",
				isHeadquarter : ("N" == "Y" && !(Number("0")))
			},
			branch : {
				id			: Number("0"),
				name        : ""
			},
			employee : {
				id			: Number("9807"),
				name		: "기본관리자",
				thumbnail	: "https://d27pagl1acwik5.cloudfront.net/upload/coach/774/2020/09/03/20200903151541",
				typeCode	: "-1",
				sex 		: "",
			},
			licence : {
				isPayment	: "Y",
				remainDate	: Number("635"),
				expireDate	: "2023-09-29 00:00:00"
			},
			state : {
				sms 		: "758"
			},
			scheduler : {
				default		: "class"
			},
			permission : {
				member : {
					create : ("true" == "true") ? true : false,
					update : ("true" == "true") ? true : false,
					remove : ("true" == "true") ? true : false,
					sms : ("true" == "true") ? true : false,
					locker : ("true" == "true") ? true : false,
					point : ("true" == "true") ? true : false,
				},
				payment : {
					payment : ("true" == "true") ? true : false,
					cross : ("true" == "true") ? true : false,
				},
				permissionPayment : {
				},
				permissionMember : {
					accessCommunityPage : "true",
				},
				permissionSchedule : {
				},
				permissionAccounting : {
					readSales : "true",
					readExpenditure : "true",
					readAccount : "false",
					registExpenditure : "true",
					accessAccounting : "true",
					configStaffPay : "true",
					readStaffPay : "true"
				},
				permissionStatistics : {
					sales : "true",
					member : "true",
					appointment : "true",
					classes : "true"
				},
				permissionProduct : {
				}
			}
		};

		window.addEventListener("DOMContentLoaded", function(){
			uiHeader();
		}, true);
	</script>
</head>




<html>
<head>
	<script type="text/javascript" src="/static/js/controller/partnerController.js"></script>
	<script type="text/javascript" src="/static/js/common/jquery/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="/static/js/popup/popupPublicOrderPayment.js?v=20210115"></script>
	<link type="text/css" rel="stylesheet" href="/static/css/jquery/jquery.dataTables.css">
	<link type="text/css" rel="stylesheet" href="/static/css/uiList.css?v=20210120">
	<style type="text/css">
		main > .middle .left li a						{background:white url("/static/img/icon/icon_next_black.png") no-repeat right 8px center / 8px}
		main > .middle .left li button					{right:25px}
	</style>
</head>
<body>


	


<!-- 로컬 네비게이션 바 -->
<nav class="ui-nav" data-index="센터관리">
	<div class="right">
		<a href="/sms/send">SMS/알림톡</a>
		<a href="/partner/naver">네이버 연동</a>
		<a href="/partner/keepfit">키핏 연동</a>
		<a href="/partner/operation">센터 설정</a>
		<a href="/manager/group">그룹 관리</a>
		<a href="/locker">락커 관리</a>
		<a href="/product/public">일반 상품 관리</a>
		<a href="/reservationsetting/setting/appointment">예약정책</a>
		<a href="/partner/use">입장 내역</a>
		<a href="/manager/history/index">히스토리</a>
	</div>
	<script type="text/javascript">
		(function() {
			const pathname = window.location.pathname;
			const a = document.querySelector(".ui-nav").querySelectorAll("a");
			a.forEach(item => {
				if(pathname == item.getAttribute("href"))
					item.classList.add("focus");
			});
		})();
	</script>
</nav>




<!-- 콘텐츠 -->
<div class="contents">
	<main>
		<div class="top">
			<div class="left">
				
			</div>
			<div class="right">
				<div class="keyword">
					<input type="text" placeholder="검색어 입력 (최소 2자 이상)" autocomplete="off" data-event="search">
					<a data-event="reset"></a>
				</div>
				
					<button class="ui-button green" data-event="create" data-permission="permissionProduct/registPublicProduct">일반 상품 등록</button>
				
			</div>
		</div>
		<div class="middle">
			<div class="left" data-id="groupList"></div>
			<div class="right" data-id="productList"></div>
		</div>
		<div clsas="bottom">
		</div>
	</main>
</div>
</body>
<script type="text/javascript">
const seqMember = Number("");

function doReady() {
	doPage.open();
}
const doPage = {
	container : undefined,
	data : {},
	permission : {},
	open : function(isUpdate) {
		Promise.all([
			partnerController.product.public.list(),
			permissionController.getList()
		]).then(([data, permission]) => {
			this.data = {
				groupList : data.groupList || [],
				productList : data.productList || [],
				seqPartnerProductGroup : 0
			};
			this.permission = uiPermission.data = permission;
			this.render();
		}).catch(error => {
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	update : function() {
		this.open(true);
	},
	render : function(isUpdate) {
		this.container = document.querySelector("main");
		const isHidden = (seqMember) ? "hidden" : "";
		const self = this.event.self = this;
		const setButton = () => {
			const button = this.container.querySelector("[data-event='create']");
			if(!button) return;
			button.onclick = function() {
				self.popup.product.open(self);
			};
			uiPermission(this.container);
		};
		const setSearch = () => {
			const input = this.container.querySelector("[data-event='search']");
			const a = input.parentNode.querySelector("a");
			const table = this.container.querySelector("table");
			const dataTable = $(table).DataTable();
			const search = () => {
				const value = input.value.trim();
				dataTable.search(value).draw();
				if(value)
					input.parentNode.classList.add("focus");
				else
					input.parentNode.classList.remove("focus");
			};
			input.onkeyup = function() {search();};
			a.onclick = function() {input.value = ""; search();};
		};
		const setGroupList = () => {
			const div = this.container.querySelector("[data-id='groupList']");
			const ul = div.querySelector("ul");
			const li = this.data.groupList.map(item => {
				const getButton = () => {
					return (seqMember) ? `` : `<button class="ui-button medium white" data-event="update" data-permission="permissionProduct/registPublicProduct">수정</button>`;
				};
				return `
					<li data-sequence="${item.seq_partner_product_group}">
						<a data-event="filter">
							${item.group_name}
						</a>
						${getButton()}
					</li>
				`;
			});
			div.innerHTML = `
				<div class="top">
					일반 상품 분류
				</div>
				<div class="middle">
					<ul>
						<li data-sequence="0">
							<a data-event="filter">전체</a>
						</li>
						${li.join("")}
					</ul>
				</div>
				<div class="bottom ${isHidden}">
					<button data-event="create"><span></span>새로운 분류 등록</button>
				</div>
			`;
			uiEvent(div, {
				click : {
					filter : function() {
						self.event.changeGroup(this);
					},
					update : function() {
						self.event.updateGroup(this);
					},
					create : function() {
						self.event.updateGroup(this);
					}
				}
			});
			uiPermission(div);
		};
		const setProductList = () => {
			const div = this.container.querySelector("[data-id='productList']");
			const table = div.querySelector("table");
			const seqPartnerProductGroup = this.data.seqPartnerProductGroup;
			const tr = this.data.productList.filter(item => {
				return (seqPartnerProductGroup) ? (item.seq_partner_product_group == seqPartnerProductGroup) : true;
			}).map(item => {
				const updateDate = new Date(item.update_dt).format("yyyy-mm-dd hh:MM");
				const getMemo = () => {
					const memo = uiSafeValue(item.memo);
					return (memo) ? `<a>보기<div><span>${memo}</span></div></a>` : ``;
				};
				const getButton = () => {
					return (seqMember) ? `
						<button class="ui-button small green" data-event="order">판매</button>
					` : `
						<button class="ui-button small white" data-event="update" data-permission="permissionProduct/registPublicProduct">수정</button>
						<button class="ui-button small white" data-event="remove" data-permission="permissionProduct/registPublicProduct">삭제</button>
					`;
				};
				return `
					<tr data-sequence="${item.seq_partner_product_public}">
						<td>${item.group_name}</td>
						<td class="name">${item.product_name}</td>
						<td>${item.product_size || "-"}</td>
						<td>${getComma(item.product_cost)}원</td>
						<td>${getComma(item.present_stock)}</td>
						<td class="memo tip">${getMemo()}</td>
						<td>${updateDate}</td>
						<td>${getButton()}</td>
					</tr>
				`;
			});
			div.innerHTML = `
				<table class="ui-data-table dark even" data-table-dom="t" data-ordering="true">
					<thead>
						<tr>
							<td>분류</td>
							<td>상품명</td>
							<td>규격</td>
							<td>가격</td>
							<td>재고</td>
							<td>메모</td>
							<td>최근 수정일</td>
							<td>기타</td>
						</tr>
					</thead>
					<tbody>
						${tr.join("")}
					</tbody>
				</table>
			`;
			uiEvent(div, {
				click : {
					update : function() {self.event.updateProduct(this);},
					remove : function() {self.event.removeProduct(this);},
					order : function() {self.event.orderProduct(this);}
				}
			});
			uiTable(div);
			uiPermission(div);
			setSearch();
		};
		if(!isUpdate) {
			setButton();
			setGroupList();
		}
		setProductList();
	},
	event : {
		orderProduct : function(object) {
			const seqPartnerProductPublic = Number(object.parentNode.parentNode.getAttribute("data-sequence"));
			popupPublicOrderPayment.open(seqMember, seqPartnerProductPublic, false, () => {
				this.self.update();
			});
		},
		changeGroup : function(object) {
			const seqPartnerProductGroup = Number(object.parentNode.getAttribute("data-sequence"));
			const div = this.self.container.querySelector("[data-id='groupList']");
			const a = div.querySelectorAll("a");
			a.forEach(item => {
				if(item != object)
					item.className = "";
			});
			if(seqPartnerProductGroup)
				object.classList.toggle("focus");
			else
				object.classList.remove("focus");
			this.self.data.seqPartnerProductGroup = (object.classList.contains("focus")) ? seqPartnerProductGroup : 0;
			this.self.render(true);
		},
		updateGroup : function(object) {
			const seqPartnerProductGroup = Number(object.parentNode.getAttribute("data-sequence"));
			this.self.popup.group.open(this.self, seqPartnerProductGroup);
		},
		updateProduct : function(object) {
			const seqPartnerProductPublic = Number(object.parentNode.parentNode.getAttribute("data-sequence"));
			this.self.popup.product.open(this.self, seqPartnerProductPublic);
		},
		removeProduct : function(object) {
			const seqPartnerProductPublic = Number(object.parentNode.parentNode.getAttribute("data-sequence"));
			if(!confirm("정말로 삭제하시겠습니까?")) return;
			partnerController.product.public.remove(seqPartnerProductPublic).then(data => {
				alert("삭제되었습니다.");
				doPage.open();
			}).catch(error => {
				console.log(error);
				alert("실패하였습니다.");
			});
		},
	},
	popup : {
		group : {
			popup : undefined,
			mode : "create",
			data : {},
			open : function(context, sequence) {
				if(this.popup) return;
				this.data = context.data;
				this.data.seqPartnerProductGroup = sequence;
				this.mode = (sequence) ? "update" : "create";
				if(this.mode == "update") {
					this.data.groupInfo = this.data.groupList.filter(item => {
						return (item.seq_partner_product_group == sequence);
					})[0];
				}
				this.render();
			},
			close : function(isUpdate) {
				this.popup = undefined;
				uiPopup();
				if(isUpdate)
					doPage.open();
			},
			render : function() {
				const self = this.event.self = this;
				this.popup = uiPopup({
					template : this.template(),
					event : {
						click : {
							close : function() {self.close()},
							remove : function() {self.event.remove()},
							update : function() {self.event.update()},
							create : function() {self.event.create()}
						}
					}
				});
				if(this.mode == "update")
					this.popup.putValue("name", this.data.groupInfo.group_name);
			},
			event : {
				remove : function() {
					if(!confirm("정말로 삭제하시겠습니까?")) return;
					partnerController.product.group.remove({
						seqPartnerProductGroup : this.self.data.seqPartnerProductGroup
					}).then(data => {
						alert("삭제되었습니다.");
						this.self.close(true);
					}).catch(error => {
						console.log(error);
						alert("실패하였습니다.");
					});
				},
				update : function() {
					const name = this.self.popup.getValue("name").trim();
					if(!name) {
						alert("분류 이름을 입력해 주세요.");
						return;
					}
					partnerController.product.group.update({
						seqPartnerProductGroup : this.self.data.seqPartnerProductGroup,
						groupName : name
					}).then(data => {
						alert("수정되었습니다.");
						this.self.close(true);
					}).catch(error => {
						console.log(error);
						alert("실패하였습니다.");
					});
				},
				create : function() {
					const name = this.self.popup.getValue("name").trim();
					if(!name) {
						alert("분류 이름을 입력해 주세요.");
						return;
					}
					partnerController.product.group.create({
						groupName : name,
						productType : "PUBLIC"
					}).then(data => {
						alert("등록되었습니다.");
						this.self.close(true);
					}).catch(error => {
						console.log(error);
						alert("실패하였습니다.");
					});
				}
			},
			template : function() {
				const name = (this.mode == "create") ? "등록" : "수정";
				const getButton = () => {
					return (this.mode == "create") ? `
						<button class="ui-button" data-event="create">등록</button>
					` : `
						<button class="ui-button red" data-event="remove">삭제</button>
						<button class="ui-button green" data-event="update">수정</button>
					`;
				};
				return `
					<style type="text/css">
						.popupGroup			{}
						.popupGroup input	{width:100% !important; max-width:100% !important}
						.popupGroup button	{width:125px !important}
					</style>
					<div class="popupGroup tiny">
						<div class="top">
							<h2>
								일반 상품 분류 ${name}
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle ui-form">
							<table>
								<tr>
									<th>분류명</th>
									<td><input name="name" maxlength="32" placeholder="분류명 입력" autocomplete="off"></td>
								</tr>
							</table>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">취소</button>
							${getButton()}
						</div>
					</div>
				`;
			}
		},
		product : {
			popup : undefined,
			mode : "create",
			data : {},
			open : function(context, sequence) {
				if(this.popup) return;
				Promise.all([
					partnerController.product.public.form(),
					(sequence) ? partnerController.product.public.info(sequence) : ""
				]).then(([formData, productInfo]) => {
					this.mode = (sequence) ? "update" : "create";
					this.data = context.data;
					this.data.seqPartnerProductPublic = sequence;
					this.data.groupList = formData.groupList || [];
					this.data.customerList = formData.customerList || [];
					this.data.productInfo = productInfo || {};
					this.render();
				}).catch(error => {
					console.log(error);
					alert("데이터를 가져오는데 실패하였습니다.");
				});
			},
			close : function(isUpdate) {
				this.popup = undefined;
				uiPopup();
				if(isUpdate)
					doPage.open();
			},
			check : function(data) {
				for(let name in data) {
					let error = "";
					const isEmpty = (data[name] === "");
					switch(name) {
						case "productName"				: if(isEmpty) error = "상품명을 입력해 주세요."; break;
						case "seqPartnerProductGroup"	: if(isEmpty) error = "서비스 분류를 선택해 주세요."; break;
						case "seqPartnerCustomer"		: if(isEmpty) error = "거래처를 선택해 주세요."; break;
						case "productCost"				: if(isEmpty) error = "판매 단가를 입력해 주세요."; break;
						case "productSurtaxYn"			: if(isEmpty) error = "부가세 설정 여부를 선택해 주세요."; break;
					}
					if(error) {
						alert(error);
						const node = this.popup.querySelector("[name='" + name + "']");
						if(node) node.focus();
						return false;
					}
				}
				return true;
			},
			submit : function() {
				const data = {
					productName : this.popup.getValue("productName"),
					seqPartnerProductGroup : this.popup.getValue("seqPartnerProductGroup"),
					seqPartnerCustomer : this.popup.getValue("seqPartnerCustomer"),
					productSize : this.popup.getValue("productSize"),
					productCost : this.popup.getValue("productCost").replace(/\,/g, ""),
					productValueSupply : this.popup.getValue("productValueSupply").replace(/\,/g, ""),
					productSurtax : this.popup.getValue("productSurtax").replace(/\,/g, ""),
					productSurtaxYn : this.popup.getValue("productSurtaxYn"),
					vatYn : this.popup.getValue("vatYn"),
					baseStock : this.popup.getValue("baseStock", true),
					safeStock : this.popup.getValue("safeStock", true),
					presentStock : this.popup.getValue("presentStock", true),
					description : this.popup.getValue("description"),
					memo : this.popup.getValue("memo"),
				};
				if(this.mode == "update")
					data.seqPartnerProductPublic = this.data.seqPartnerProductPublic;

				if(!this.check(data)) return;

				partnerController.product.public.update(data).then(data => {
					alert((this.mode == "update") ? "수정되었습니다." : "등록되었습니다.");
						this.close(true);
				}).catch(error => {
					console.log(error);
					alert("실패하였습니다.");
				});
			},
			render : function() {
				const self = this.event.self = this;
				this.popup = uiPopup({
					template : this.template(),
					event : {
						click : {
							close : function() {self.close()},
							submit : function() {self.submit()}
						},
						change : {
							changePrice : function() {self.event.changePrice()},
							changeTax : function() {self.event.changeTax()},
							changeBaseStock : function() {self.event.changeBaseStock()}
						}
					}
				});
				uiInput(this.popup);
				if(this.mode == "update")
					this.prepare();
			},
			prepare : function() {
				const data = this.data.productInfo;
				this.popup.putValue("productName", data.productName);
				this.popup.putValue("seqPartnerProductGroup", data.seqPartnerProductGroup);
				this.popup.putValue("seqPartnerCustomer", data.seqPartnerCustomer);
				this.popup.putValue("productSize", data.productSize);
				this.popup.putValue("productCost", getComma(data.productCost));
				this.popup.putValue("productValueSupply", getComma(data.productValueSupply));
				this.popup.putValue("productSurtax", getComma(data.productSurtax));
				this.popup.putValue("productSurtaxYn", data.productSurtaxYn);
				this.popup.putValue("vatYn", data.vatYn);

				this.popup.putValue("baseStock", getComma(data.baseStock));
				this.popup.putValue("safeStock", getComma(data.safeStock));
				this.popup.putValue("presentStock", getComma(data.presentStock));

				this.popup.putValue("description", data.description);
				this.popup.putValue("memo", data.memo);
			},
			event : {
				changePrice : function() {
					const popup = this.self.popup;
					const isTax = (popup.getValue("productSurtaxYn") == "Y");
					const price = popup.getValue("productCost", true);
					const supplyPrice = (isTax) ? (price / parseFloat(1.1)).toFixed(1) : price;
					const taxPrice = (isTax) ? (price - supplyPrice).toFixed(1) : 0;
					popup.putValue("productValueSupply", getComma(supplyPrice));
					popup.putValue("productSurtax", getComma(taxPrice));
				},
				changeTax : function() {
					this.changePrice();
				},
				changeBaseStock : function() {
					const popup = this.self.popup;
					const baseStock = popup.getValue("baseStock", true);
					popup.putValue("presentStock", getComma(baseStock));
				}
			},
			template : function() {
				const buttonName = (this.mode == "create") ? "등록" : "수정";
				const buttonColor = (this.mode == "create") ? "" : "green";
				const getGroupList = () => {
					const groupList = this.data.groupList;
					const option = groupList.map(item => {
						return `<option value="${item.seq_partner_product_group}">${item.group_name}</option>`
					});
					return option.join("");
				};
				const getCustomerList = () => {
					const customerList = this.data.customerList;
					const option = customerList.map(item => {
						return `<option value="${item.seq_partner_customer}">${item.customer_name}</option>`
					});
					return option.join("");
				};
				return `
					<style type="text/css">
						.popupProduct .box			{margin-left:-10px; margin-right:-10px}
						.popupProduct .box dl > *	{padding:0 10px; vertical-align:top}
					</style>
					<div class="popupProduct medium">
						<div class="top">
							<h2>
								일반 상품 ${buttonName}
								<a data-event="close"></a>
							</h2>
						</div>
						<div class="middle ui-form">
							<form class="box" autocomplete="off">
								<dl>
									<dt>
										<table>
											<tr>
												<th>상품 이름</th>
												<td>
													<input class="name" name="productName" type="text" maxlength="32" placeholder="상품 이름 입력">
												</td>
											</tr>
											<tr>
												<th>상품 분류</th>
												<td>
													<select class="ui-select" name="seqPartnerProductGroup">
														<option value="">상품 분류 선택</option>
														${getGroupList()}
													</select>
												</td>
											</tr>
											<tr>
												<th>거래처 선택</th>
												<td>
													<select class="ui-select" name="seqPartnerCustomer">
														<option value="">거래처 선택</option>
														${getCustomerList()}
													</select>
												</td>
											</tr>
											<tr>
												<th>상품규격</th>
												<td>
													<input class="name" name="productSize" type="text" maxlength="32" placeholder="상품 규격 입력">
												</td>
											</tr>
											<tr>
												<th>판매단가</th>
												<td>
													<input class="currency" name="productCost" type="currency" min="0" max="100000000" data-event="changePrice">원
												</td>
											</tr>
											<tr>
												<th>공급가액</th>
												<td>
													<input class="currency" name="productValueSupply" type="currency" min="0">원
												</td>
											</tr>
											<tr>
												<th>부가세</th>
												<td>
													<input class="currency" name="productSurtax" type="currency" min="0">원
												</td>
											</tr>
											<tr>
												<th>부가세 설정</th>
												<td>
													<label class="ui-input-radio">
														<input name="productSurtaxYn" type="radio" value="Y" data-event="changeTax" checked>
														<span></span>
														과세
													</label>
													<label class="ui-input-radio">
														<input name="productSurtaxYn" type="radio" value="N" data-event="changeTax">
														<span></span>
														비과세
													</label>
													<label class="ui-input-checkbox">
														<input name="vatYn" type="checkbox">
														<span></span>
														VAT 포함
													</label>
												</td>
											</tr>
										</table>
									</dt>
									<dd>
										<table>
											<tr>
												<th>기초재고</th>
												<td>
													<input class="currency" name="baseStock" type="currency" min="0" data-event="changeBaseStock">
												</td>
											</tr>
											<tr>
												<th>안전재고</th>
												<td>
													<input class="currency" name="safeStock" type="currency" min="0">
												</td>
											</tr>
											<tr>
												<th>현재 재고량</th>
												<td>
													<input class="currency" name="presentStock" type="currency" min="0">
												</td>
											</tr>
											<tr>
												<th>상품설명</th>
												<td>
													<textarea class="ui-textarea" name="description" maxlength="200"></textarea>
												</td>
											</tr>
											<tr>
												<th>메모</th>
												<td>
													<textarea class="ui-textarea" name="memo" maxlength="200"></textarea>
												</td>
											</tr>
										</table>
									</dd>
								</dl>
							</form>
						</div>
						<div class="bottom">
							<button class="ui-button gray" data-event="close">취소</button>
							<button class="ui-button ${buttonColor}" data-event="submit">${buttonName}</button>
						</div>
					</div>
				`;
			}
		}
	}
};
</script>
</html>
</html>
