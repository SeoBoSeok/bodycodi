window.addEventListener("DOMContentLoaded", function() {
	uiProfile.open((typeof seqMember != "undefined") ? seqMember : 0);
}, true);

const uiProfile = {
	self : undefined,
	seqMember : undefined,
	data : undefined,
	timer : undefined,
	open : function(seqMember) {
		if(seqMember) {
			this.seqMember = seqMember;
			sessionStorage.setItem("seqMember", seqMember);
		} else {
			this.seqMember = sessionStorage.getItem("seqMember");
			if(!this.seqMember) {
				uiError(405);
			}
			if(!this.seqMember) return;
		}
		commonController.memberInfo(this.seqMember, true).then(memberInfo => {
			this.data = memberInfo;
			const getBranchPermission = () => {
				if(partnerInfo.partner.branchUseYn != "Y") return true;
				const seqPartnerBranch = partnerInfo.branch.id;
				return (this.data.seqPartnerBranches || []).some(item => {
					return (item == seqPartnerBranch);
				});
			};
			this.data.isBranchPermission = getBranchPermission();
			this.render();
		}).catch(error => {
			console.log(error);
			this.data = {};
			this.render();
			alert("회원 정보가 없습니다.");
		});
	},
	close : function() {
		this.self.parentNode.removeChild(this.self);
	},
	update : function() {
		commonController.memberInfo(this.seqMember, true).then(memberInfo => {
			this.data = memberInfo;
			this.render(true);
		}).catch(error => {
			console.log(error);
			console.log("업데이트 실패하였습니다.");
		});
	},
	render : function(isUpdate) {
		if(!isUpdate) {
			const nav = document.querySelector("nav");
			const newAside = document.createElement("aside");
			newAside.className = "ui-side ui-profile";
			newAside.innerHTML = this.template();

			const oldAside = document.querySelector(".ui-profile");
			if(oldAside) {
				oldAside.parentNode.replaceChild(newAside, oldAside);
			} else {
				nav.parentNode.insertBefore(newAside, nav.nextSibling);
			}
			this.self = newAside;
		} else {
			this.self.innerHTML = this.template();
		}

		const self = this.event.self = this;
		uiEvent(this.self, {
			click : {
				pass : function() {self.event.orderPass(this)},
				product : function() {self.event.orderProduct()},
				cross : function() {self.event.orderCross()},
				update : function() {self.event.updateMember()},
				remove : function() {self.event.removeMember()},
				sms : function() {self.event.sendSMS()},
				locker : function() {self.event.assignLocker()},
				point : function() {self.event.changePoint()},
				barcode : function() {self.event.updateBarcode()},
				clipboard : function() {self.event.clipboard(this)},
				popupMemo : function() {popupMemo.open(self)},
				popupBranchMemo : function() {popupBranchMemo.open(self)},
				thumbnail : function() {popupThumbnail.open(self)},
				branch : function() {popupMemberBranch.open(self)}
			},
			change : {
				memo : function() {
					if(self.self.querySelector("[name='memo']").disable) {
						alert("메모 정보가 업데이트 중 입니다.\n잠시 후 다시 시도해 주세요.");
					} else
						self.event.changeMemo()
				}
			}
		});
		uiTip(this.self);
	},
	event : {
		orderPass : function(object) {
			if(!partnerInfo.permission.payment.payment) {
				alert("이용권 판매 권한이 없습니다.");
				return;
			}
			const value = object.getAttribute("data-value");
			if(value == "new") {
				window.location.href = `/member/${this.self.seqMember}/sell/pass`;
			} else {
				window.location.href = `/member/${this.self.seqMember}/order`;
			}
		},
		orderProduct : function() {
			if(!partnerInfo.permission.payment.payment) {
				alert("일반 상품 판매 권한이 없습니다.");
				return;
			}
//			window.location.href = `/manager/member/memberSelectProduct/${this.self.seqMember}?productType=PUBLIC`;
			window.location.href = `/product/public/${this.self.seqMember}`;
		},
		orderCross : function() {
			if(!partnerInfo.permission.payment.cross) {
				alert("이용권 교체 권한이 없습니다.");
				return;
			}
			window.location.href = `/member/${this.self.seqMember}/order/cross/select`;
		},
		updateMember : function() {
			if(!partnerInfo.permission.member.update) {
				alert("회원 수정 권한이 없습니다.");
				return;
			}
			popupRegisterMember.open(this.self.seqMember, "", true);
		},
		removeMember : function() {
			if(!partnerInfo.permission.member.remove) {
				alert("회원 삭제 권한이 없습니다.");
				return;
			}
			if(confirm("회원 삭제 후 복구가 불가능합니다.\n그래도 삭제하시겠습니까?\n(※ 회원을 삭제해도 관련 결제 내역은 삭제되지 않습니다.)")) {
				const data = {
					members : [{
						seqMember : this.self.seqMember
					}]
				};
				memberController.remove(data).then(data => {
					window.location = "/home";
				}).catch(error => {
					alert("회원 삭제에 실패하였습니다.");
					console.log(error);
				});
			}
		},
		changeMemo : function() {
			const textarea = uiProfile.self.querySelector("[name='memo']");
			const span = textarea.parentNode.querySelector("span");
			textarea.disabled = true;
			const value = textarea.value;
			const updateMemo = () => {
				const data = {
					seqMember	: this.self.data.seqMember,
					memo		: value
				};
				memberController.putMemo(data).then(data => {
					span.innerHTML = new Date().format("yyyy-mm-dd hh:MM");
					span.parentNode.className = "focus";
					textarea.disabled = false;
					this.self.data.memo = textarea.value;
					clearTimeout(uiProfile.timer);
					uiProfile.timer = setTimeout(function() {
						span.parentNode.className = "";
					}, 2500);
				}).catch(error => {
					alert("메모 수정에 실패하였습니다.");
					console.log(error);
				});
			};
			if(value.length == 0) {
				if(confirm("환불 메모를 저장하시겠습니까?"))
					updateMemo();
				else
					textarea.disabled = false;
			} else {
				updateMemo();
			}
		},
		sendSMS : function() {
			if(!partnerInfo.permission.member.sms) {
				alert("문자 보내기 권한이 없습니다.");
				return;
			}
			const smsAgreeYn = uiProfile.data.smsAgreeYn;
			if(smsAgreeYn == "N" && !confirm("문자 수신에 동의하지 않은 회원입니다. 계속하시겠습니까?")) return;
			const data = {
				smsMemberList : [
					{
						seqMember : uiProfile.data.seqMember,
						receiveNumber : uiProfile.data.mobile,
						memberName : uiProfile.data.memberName,
						membershipNo : uiProfile.data.membershipNo,
						sendRoute : "MEMBER",
						reservationYn : "N",
					}
				]
			};
			popupSmsSend.open(data);
		},
		assignLocker : function() {
			if(!partnerInfo.permission.member.locker) {
				alert("락커 배정 권한이 없습니다.");
				return;
			}
			popupMemberLocker.open(this.self.data.seqMember, () => {
				window.location.reload(true);
			});
		},
		changePoint : function() {
			if(!partnerInfo.permission.member.point) {
				alert("포인트 수정 권한이 없습니다.");
				return;
			}
			popupMemberPoint.open(this.self.data.seqMember, this.self.data, (point) => {
				this.self.data.point = point;
				this.self.self.putValue("point", getComma(point));
			});
		},
		updateBarcode : function() {popupBarcode.open(this.self.seqMember, this.self.data)},
	},
	template : function() {
		const data = this.data || {};

		const isPass = (partnerInfo.permission.payment.payment) ? "" : "disabled";
		const isCross = (partnerInfo.permission.payment.cross) ? "" : "disabled";
		const isRemove = (partnerInfo.permission.member.remove) ? "" : "disabled";
		const isUpdate = (partnerInfo.permission.member.update) ? "" : "disabled";
		const isSms = (partnerInfo.permission.member.sms) ? "" : "disabled";
		const isLocker = (partnerInfo.permission.member.locker) ? "" : "disabled";		// 또는 이미 락커가 배정되어 있는 경우
		const isPoint = (partnerInfo.permission.member.point) ? "" : "disabled";
		const isMemo = (data.isBranchPermission) ? "" : "disabled";

		const getLockerList = (name) => {
			const lockerList = data.lockerList || [];
			const li = lockerList.map(item => {
				const message = uiSafeValue(`${item.lockerName} · ${item.lockerNo}번`) + `<br>(만료 : ${new Date(item.endDt).format("yyyy.sm.sd")})`;
				return `<li class="ui-tip none" data-tip="${message}" data-tip-color="gray">${message}</li>`;
			});
			return (li.length > 0) ? "<ul>" + li.join("") + "</ul>" : "-";
		};
		const getGroupList = () => {
			const groupList = this.data.memberGroupList || [];
			const li = groupList.map(item => {
				return `<li>${item.groupName}</li>`;
			});
			return (li.length > 0) ? "<ul>" + li.join("") + "</ul>" : "-";
		};
		const getAppId = () => {
			const id = data.mobileMemberEmail || "";
			return (id) ? `<input class="ui-tip none " data-tip-color="gray" data-tip="${id}" value="${id}">` : `-`;
		};
		const getThumbnail = () => {
			const isImage = (data.imgUrl);
			const source = (isImage) ? data.imgUrl : "/static/img/login/" + ((data.sex == "M") ? "male.jpg" : "female.jpg");
			return (isImage) ? `<a class="zoom" data-event="thumbnail"><img src="${source}"/></a>` : `<img src="${source}"/>`;
		};
		const getAppointCoachInfo = () => {
			const appointmentCoachList = data.appointmentCoachNames || [];
			const length = appointmentCoachList.length;
			const li = appointmentCoachList.splice(0, 2).map((item, index) => {
				const name = (index == 1 && length > 2) ? `${item} 외 ${length - 2}명` : item;
				return `<li>${name}</li>`;
			});
			return (li.length > 0) ? "<ul>" + li.join("") + "</ul>" : "-";
		};
		const getBranchInfo = () => {
			const isBranch = (partnerInfo.partner.branchUseYn == "Y");
			if(!isBranch) return "";
			// const branchNameList = (Array.isArray(data.branchName)) ? data.branchName : [data.branchName || "-"];
			// const branchNameList = ["군자점", "송파나루역점", "구의점", "성남이마트점", "정릉점"]; //, "구로디지털역점"
			const branchNameList = data.branchNames || [];
			const th = `
				관리 지점
				<button class="ui-button small white" data-event="branch">수정</button>
			`;
			if(branchNameList.length <= 5) {
				const li = branchNameList.map(item => `<li>${item}</li>`);
				return `
					<tr class="multiple">
						<th>${th}</th>
						<td>
							<ul>${(li.length) ? "<ul>" + li.join("") + "</ul>" : "-"}</ul>
						</td>
					</tr>
				`;
			} else {
				const summary = branchNameList.length + "개 지점";
				const option = branchNameList.map(item => `<option>${item}</option>`);
				return `
					<tr class="select">
						<th>${th}</th>
						<td>
							<select class="ui-select" readonly>
								<option value="">${summary}</option>
								${option.join("")}
							</select>
						</td>
					</tr>
				`;
			}
		};
		const getMemoButton = () => {
			const isGoto = (partnerInfo.partner.partnerType == "GOTO");
			return `
				<table>
					<tr>
						<td><a data-event="popupMemo">메모 크게 보기</a></td>
						${(isGoto) ? `<td><a data-event="popupBranchMemo">타지점 메모 보기</a></td>` : ``}
					</tr>
				</table>
			`;
		};

		return `
			<div class="profile">
				<div class="about">
					<div class="thumbnail">
						${getThumbnail()}
						<a class="home" href="/member/${data.seqMember}/home">H</a>
					</div>
					<!--<em class="bg gold">GOLD</em>-->
					<span>${data.memberName || "찾을 수 없습니다."}</span>
					${(data.safeCheckinFlag) ? "<span class='safe-checkin'></span>" : ""}
					<div>${data.mobile || ""}</div>
				</div>
				<div class="summary">
					<table class="ui-table sharp fixed">
						${getBranchInfo()}
						<tr class="multiple">
							<th>그룹 정보</th>
							<td>${getGroupList()}</td>
						</tr>
						<tr><th>관리 담당자</th><td>${data.coachName || "-"}</td></tr>
						<tr><th>개인레슨 담당</th><td>${getAppointCoachInfo()}</td></tr>
						<tr><td colspan="2"></td></tr>
						<tr><th>회원 등록일</th><td>${uiDate(data.regDt) || "-"}</td></tr>
						<tr><th>최종 만료일</th><td>${uiDate(data.finalExpirationDate) || "-"}</td></tr>
						<tr><th>최근 방문일</th><td>${uiDate(data.latestVisitDate) || "-"}</td></tr>
						<tr><td colspan="2"></td></tr>
						<tr class="multiple">
							<th>락커 정보</th>
							<td>${getLockerList()}</td>
						</tr>
						<tr><th>적립 포인트</th><td><var data-msg="point">${getComma(data.point || 0)}</var>P</td></tr>
						<tr><td colspan="2"></td></tr>
						<tr><th>회원 번호</th><td>${data.membershipNo || "-"}</td></tr>
						<tr>
							<th>
								바코드 번호
								<button class="ui-button small white" data-event="barcode">수정</button>
							</th>
							<td class="barcode">
								<span title="${data.entranceBarcode || ""}">${data.entranceBarcode || "바코드 미입력"}</span>
							</td>
						</tr>
						<tr>
							<th>앱 아이디</th>
							<td>${getAppId()}</td>
						</tr>
					</table>
				</div>
			</div>

			<div class="quick">
				<table>
					<tr>
						<td colspan="2"><a class="${isPass} bg blue" data-value="new" data-event="pass">이용권 판매</a></td>
					</tr>
					<tr>
						<td><a class="${isPass}" data-event="product">일반 상품 판매</a></td>
						<td><a class="${isPoint}" data-event="point">포인트 수정</a></td>
					</tr>
					<tr>
						<td><a class="${isSms}" data-event="sms">문자 보내기</a></td>
						<td><a href="/member-counseling/index?seqMember=${data.seqMember}&isMember=true">상담 내역</a></td>
					</tr>
					<!--
						<tr>
							<td><a class="${isPoint}" data-event="point">포인트 수정</a></td>
							<td><a class="${isLocker}" data-event="locker">락커 배정</a></td>
						</tr>
					-->
					<tr>
						<td><a class="${isUpdate}" data-event="update">회원 수정</a></td>
						<td><a class="${isRemove}" data-event="remove">회원 삭제</a></td>
					</tr>
				</table>
			</div>

			<div class="memo">
				${getMemoButton()}
				<textarea class="ui-textarea" name="memo" maxlength="3000" placeholder="여기에 메모를 입력해 주세요." data-event="memo" ${isMemo}>${data.memo || ""}</textarea>
				<p>업데이트 : <span></span></p>
			</div>
		`;
	}
};


const popupThumbnail = {
	popup : undefined,
	container : undefined,
	data : {},
	open : function(data) {
		if(this.popup) return;
		this.container = data.self;
		this.data = data.data || {};
		this.render();
	},
	close : function() {
		this.popup = undefined;
		uiPopup();
	},
	render : function() {
		const self = this;
		this.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					close : function() {self.close();},
				}
			}
		});
	},
	template : function() {
		let source = this.data.imgUrl;
		if(!source) source = "/static/img/brand/symbol_gray.png";
		return `
			<div class="tiny">
				<div class="top">
					<h2>프로필 이미지<a data-event="close"></a></h2>
				</div>
				<div class="middle" style="max-height:640px; overflow:auto">
					<img src="${source}" width="100%" />
				</div>
				<div class="bottom">
					<button class="ui-button" data-event="close">닫기</button>
				</div>
			</div>
		`;
	}
};


const popupMemo = {
	container : undefined,
	popup : undefined,
	data : {},
	open : function(data) {
		if(this.popup) return;
		this.data = data.data || {};
		this.container = data.self;
		this.render();
	},
	close : function() {
		this.popup = undefined;
		uiPopup();
	},
	submit : function() {
		const memo = this.popup.getValue("memo");
		const data = {
			seqMember	: this.data.seqMember,
			memo		: memo
		};
		memberController.putMemo(data).then(data => {
			alert("수정되었습니다.");
			this.data.memo = memo;
			if(this.container) {
				this.container.putValue("memo", memo);
			}
			this.close();
		}).catch(error => {
			alert("메모 수정에 실패하였습니다.");
			console.log(error);
		});
	},
	render : function() {
		const self = this;
		this.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					close : function() {self.close();},
					submit : function() {self.submit();}
				}
			}
		});
		uiTab(this.popup);
		this.popup.putValue("memo", this.data.memo);
	},
	template : function() {
		const isDisabled = (this.data.isBranchPermission) ? "" : "disabled";
		return `
			<style type="text/css">
				.popupMemo .middle					{}
				.popupMemo .middle textarea			{padding:15px; width:100%; max-width:100%; height:250px; border:1px solid #ccc; box-sizing:border-box; overflow-y:auto}
				.popupMemo .middle textarea:focus	{background-color:white}
			</style>
			<div class="popupMemo small">
				<div class="top">
					<h2>메모 수정<a data-event="close"></a></h2>
				</div>
				<div class="middle">
					<textarea class="ui-textarea" name="memo" maxlength="3000" placeholder="여기에 메모를 입력해 주세요." ${isDisabled}></textarea>
				</div>
				<div class="bottom">
					<button class="ui-button gray" data-event="close">취소</button>
					<button class="ui-button green" ${isDisabled} data-event="submit">수정</button>
				</div>
			</div>
		`;
	}
};

const popupBarcode = {
	popup : undefined,
	mode : "",
	seqMember : 0,
	barcode : undefined,
	data : {},
	open : function(seqMember, data) {
		if(this.popup) return;
		this.seqMember = seqMember;
		if(data) {
			this.data = data;
			this.mode = (data.entranceBarcode) ? "update" : "create";
			this.render();
		} else {
			memberController.getMember(seqMember).then(data => {
				this.data = data;
				this.mode = (data.entranceBarcode) ? "update" : "create";
				this.render();
			}).catch(error => {
				uiError(error);
			});
		}
	},
	close : function() {
		this.popup = undefined;
		uiPopup();
	},
	render : function() {
		const self = this.event.self = this;
		this.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					create : function() {self.event.update()},
					update : function() {self.event.update()},
					remove : function() {self.event.remove()},
					close : function() {self.close()},
				}
			}
		});
		popupBarcode.barcode = this.popup.querySelector("[name='barcode']");
	},
	event : {
		update : function() {
			const seqMember = this.self.data.seqMember;
			const barcode = this.self.popup.getValue("barcode");
			if(!barcode) {
				alert("바코드 정보가 없습니다.");
				return;
			}
			barcodeCore.updateMemberSetEntranceBarcode(barcode, seqMember,(error, response) => {
				if(error) {
					alert(error);
				} else {
					alert("바코드 정보가 등록되었습니다.");
					this.self.close();
					window.location.reload(true);
				}
			});
		},
		remove : function() {
			const seqMember = this.self.data.seqMember;
			const barcode = this.self.popup.getValue("barcode");
			if(!barcode) {
				alert("바코드 정보가 없습니다.");
				return;
			}
			barcodeCore.deleteMemberSetEntranceBarcode(seqMember,(error, response) => {
				if(error) {
					alert(error);
				} else {
					alert("바코드 정보가 삭제되었습니다.");
					this.self.close();
					window.location.reload(true);
				}
			});
		},
	},
	template : function() {
		const getBottom = () => {
			return (this.mode == "create") ? `
				<button class="ui-button create" data-event="create">등록</button>
			` : `
				<button class="ui-button red update" data-event="remove">삭제</button>
				<button class="ui-button green update" data-event="update">수정</button>
			`;
		};
		return `
			<style type="text/css">
				.popupBarcode .middle input				{width:100%; max-width:100%; text-align:center}
				.popupBarcode .bottom .ui-button		{width:125px}
			</style>
			<div class="popupBarcode tiny">
				<div class="top">
					<h2>
						회원 바코드
						<a data-event="close"></a>
					</h2>
				</div>
				<div class="middle">
					<input name="barcode" type="text" value="${this.data.entranceBarcode}" placeholder="바코드 리더기로 입력해 주세요.">
				</div>
				<div class="bottom">
					<button class="ui-button gray" data-event="close">닫기</button>
					${getBottom()}
				</div>
			</div>
		`;
	}
};

const popupMemberBranch = {
	container : undefined,
	context : undefined,
	popup : undefined,
	mode : "",
	data : {},
	open : function(context, mode) {
		if(this.popup) return;
		const seqMember = context.data.seqMember;
		Promise.all([
			commonController.branch.list(),
		]).then(([branchList]) => {
			this.mode = (mode) ? mode : (partnerInfo.partner.headquartersYn == "Y") ? "all" : "self";
			this.context = context;
			this.data = {
				seqPartnerBranch : partnerInfo.branch.id,
				memberInfo : context.data,
				branchList : branchList || [],
				memberBranchList : [],
				isUpdate : false
			};
			this.render();
			this.update();
		}).catch(error => {
			console.log(error);
			alert("데이터를 가져오는데 실패하였습니다.");
		});
	},
	close : function(isUpdate) {
		this.popup = undefined;
		uiPopup();
		if(this.data.isUpdate)
			this.context.update();
	},
	update : function(isUpdate) {
		const seqMember = this.data.memberInfo.seqMember;
		memberController.getBranch({seqMember : seqMember}).then(data => {
			this.data.memberBranchList = data || [];
			this.event.updateList();
			this.event.updateButton();
			if(isUpdate)
				this.data.isUpdate = true;
		}).catch(error => {
			console.log(error);
		});
	},
	create : function() {
		const seqMember = this.data.memberInfo.seqMember;
		const seqPartnerBranch = this.popup.getValue("seqPartnerBranch");
		const data = {
			seqMember : seqMember
		};
		if(this.mode == "all") {
			if(!seqPartnerBranch) {
				alert("관리 지점을 선택해 주세요.");
				return;
			}
			data.seqPartnerBranch = Number(seqPartnerBranch);
		}
		memberController.createBranch(data).then(data => {
			alert("등록되었습니다.");
			this.update(true);
		}).catch(error => {
			console.log(error);
			alert("처리 중 오류가 발생하였습니다.");
		});
	},
	remove : function(object) {
		if(!confirm("정말로 삭제하시겠습니까?")) return;
		const seqPartnerBranch = (this.mode == "self") ? this.data.seqPartnerBranch : Number(object.getAttribute("data-sequence"));
		const memberBranchInfo = this.data.memberBranchList.filter(item => {
			return (item.seqPartnerBranch == seqPartnerBranch);
		})[0];
		if(!memberBranchInfo) return;
		memberController.removeBranch({intlReqDtlId : memberBranchInfo.intlReqDtlId}).then(data => {
			alert("삭제되었습니다.");
			this.update(true);
		}).catch(error => {
			alert("처리 중 오류가 발생하였습니다.");
		});
	},
	render : function() {
		const self = this.event.self = this;
		this.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					close : function() {self.close();},
					remove : function() {self.remove();},
					create : function() {self.create();},
					mode : function() {self.event.changeMode();}
				}
			}
		});
	},
	event : {
		changeMode : function() {
			const mode = (this.self.mode == "self") ? "all" : "self";
			this.self.close();
			this.self.open(this.self.context, mode);
		},
		updateList : function() {
			const branchList = this.self.data.branchList;
			const memberBranchList = this.self.data.memberBranchList;
			const setTable = () => {
				const tbody = this.self.popup.querySelector("tbody");
				const tr = memberBranchList.map(item => {
					const seqPartnerBranch = item.seqPartnerBranch;
					const branchInfo = branchList.filter(item => {
						return (item.seqPartnerBranch == seqPartnerBranch);
					})[0];
					return `
						<tr>
							<td>${item.branchName || branchInfo.partnerName || "-"}</td>
							<td>${branchInfo.representName || "-"}</td>
							<td>${branchInfo.telephone || "-"}</td>
							<td><button class="ui-button small red" data-sequence="${branchInfo.seqPartnerBranch}" data-event="remove">삭제</button></td>
						</tr>
					`;
				});
				tbody.innerHTML = tr.join("");
				const self = this.self;
				uiEvent(tbody, {
					click : {
						remove : function() {self.remove(this);},
					}
				});
			};
			const setSelect = () => {
				const select = this.self.popup.querySelector("[name='seqPartnerBranch']");
				const option = branchList.filter(item => {
					const seqPartnerBranch = item.seqPartnerBranch;
					if(!seqPartnerBranch) return false;
					return !(memberBranchList.some(item => {
						return (item.seqPartnerBranch == seqPartnerBranch);
					}));
				}).map(item => {
					return `<option value="${item.seqPartnerBranch}">${item.partnerName}</option>`;
				});
				select.innerHTML = `
					<option value="">관리 지점 선택</option>
					${option.join("")}
				`;
			};
			setTable();
			if(this.self.mode != "self") setSelect();
		},
		updateButton : function() {
			if(this.self.mode != "self") return;
			const div = this.self.popup.querySelector("[data-id='bottom']");
			const getButton = () => {
				const seqPartnerBranch = this.self.data.seqPartnerBranch;
				if(!seqPartnerBranch) return "";
				const isSome = this.self.data.memberBranchList.some(item => {
					return (seqPartnerBranch == item.seqPartnerBranch);
				});
				return (isSome) ?
					`<button class="ui-button red" data-event="remove">관리 지점 삭제</button>` :
					`<button class="ui-button blue" data-event="create">관리 지점 등록</button>`;
			};
			div.innerHTML = `
				<button class="ui-button gray" data-event="close">닫기</button>
				${getButton()}
			`;
			const self = this.self;
			uiEvent(div, {
				click : {
					close : function() {self.close();},
					remove : function() {self.remove();},
					create : function() {self.create();},
				}
			});
		}
	},
	template : function() {
		const getTop = () => {
			return (this.mode == "self") ? `` : `
				<dl>
					<dt>
						<select class="ui-select" name="seqPartnerBranch">
							<option value="">관리 지점 선택</option>
						</select>
					</dt>
					<dd>
						<button class="ui-button green" data-event="create">관리 지점 추가</button>
					</dd>
				</dl>
				<hr>
			`;
		};
		const className = (this.mode == "self") ? "self" : "";
		return `
			<style type="text/css">
				.popupMemberBranch .top button						{height:auto; background-color:transparent; border:none}
				.popupMemberBranch .middle							{}
				.popupMemberBranch .middle dl > * > *				{width:100%; max-width:100%}
				.popupMemberBranch .middle dl dd					{padding-left:10px; width:125px}
				.popupMemberBranch .middle hr						{margin:15px 0; border-bottom:1px dashed #ccc}
				.popupMemberBranch .middle .box						{height:200px; background-color:#ccc; border:1px solid #ccc; overflow-y:auto}
				.popupMemberBranch .middle .box table				{background-color:white}
				.popupMemberBranch .middle .box table tr > *		{border:none !important}
				.popupMemberBranch .middle .box thead tr > * 		{position:sticky; position:-webkit-sticky; top:0; background-color:#686d7b; z-index:4}
				.popupMemberBranch .middle .box thead tr > td		{border-left:1px solid #bbb !important}
				.popupMemberBranch .middle .box tbody td + td		{border-left:1px solid #ccc !important}
				.popupMemberBranch .middle .box tbody tr + tr		{border-top:1px solid #ccc}
				.popupMemberBranch .middle.self .box td:last-child	{display:none}
			</style>
			<div class="popupMemberBranch tiny">
				<div class="top">
					<h2>
						관리 지점 관리
						<a data-event="close"></a>
					</h2>
				</div>
				<div class="middle ${className}">
					${getTop()}
					<div class="box">
						<table class="ui-table dark even">
							<thead>
								<tr>
									<td>지점명</td>
									<td>관리자</td>
									<td>연락처</td>
									<td>기능</td>
								</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
				</div>
				<div class="bottom" data-id="bottom">
					<button class="ui-button gray" data-event="close">닫기</button>
				</div>
			</div>
		`;
	}
};

const popupBranchMemo = {
	container : undefined,
	popup : undefined,
	data : {},
	open : function(context) {
		if(this.popup) return;
		this.data = context.data || {};
		this.container = context.self;
		this.render();
	},
	close : function() {
		this.popup = undefined;
		uiPopup();
	},
	render : function() {
		const self = this;
		this.popup = uiPopup({
			template : this.template(),
			event : {
				click : {
					close : function() {self.close();},
				}
			}
		});
	},
	template : function() {
		const seqPartnerBranch = partnerInfo.branch.id;
		let tr = (this.data.memberPartnerBranchMemoList || []).filter(item => {
			return (item.seqPartnerBranch != seqPartnerBranch);
		}).map(item => {
			return `
				<tr>
					<td>${item.branchName}</td>
					<td class="memo">${item.memo || "-"}</td>
					<td>
						${item.coachName}<br>
						${uiDate(item.updateDate, "time")}
					</td>
				</tr>
			`;
		});
		tr = (tr.length) ? tr.join("") : `<tr><td colspan="3">작성된 메모가 없습니다.</td></tr>`;
		return `
			<style type="text/css">
				.popupMemo .middle .box				{height:250px; background-color:#ccc; border:1px solid #ccc; overflow-y:auto}
				.popupMemo .middle table tbody tr:last-child,
				.popupMemo .middle table tr > *,
				.popupMemo .middle table			{border:none}
				.popupMemo .middle table			{background-color:white}
				.popupMemo .middle table tr			{border-bottom:1px solid #ccc}
				.popupMemo .middle table td + td	{border-left:1px solid #ccc}
				.popupMemo .middle td.memo			{white-space:normal; text-align:justify !important}
			</style>
			<div class="popupMemo small">
				<div class="top">
					<h2>타지점 메모 보기<a data-event="close"></a></h2>
				</div>
				<div class="middle">
					<div class="box">
						<table class="ui-table fixed">
							<colgroup>
								<col width="20%"><col><col width="30%">
							</colgroup>
							<thead>
								<tr><td>지점명</td><td>메모</td><td>마지막 수정</td></tr>
							</thead>
							<tbody>
								${tr}
							</tbody>
						</table>
					</div>
				</div>
				<div class="bottom">
					<button class="ui-button" data-event="close">닫기</button>
				</div>
			</div>
		`;
	}
};
